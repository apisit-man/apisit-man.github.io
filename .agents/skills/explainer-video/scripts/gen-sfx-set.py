"""Generate the sound-effect set into public/sfx, with a quality gate and loudness levelling.

Usage: python3 scripts/gen-sfx-set.py     (run from the project root)

The set comes from sfx.json in the project root: {"name": [seconds kept, "prompt"], ...}.
Without sfx.json the script uses DEFAULT_SET. Do not copy this script to edit the set.

Shared library: every take is kept in SFX_LIBRARY (default ~/.cache/explainer/sfx-library),
indexed in index.json. The key is the prompt, the length and the recipe constants below, so a
request that matches an earlier one gets that exact take with no new generation.
The same name with another prompt is a different sound and gets its own entry.
The same request with other bytes is kept as an alternate; projects get the primary take.

Facts this script is built on (measured against a sound-generation service):
- A clip shorter than 1 s can come back as full-scale white noise, and fractional lengths are
  unreliable. Whole seconds >= 1 work. So every sound is generated at GEN_S seconds and trimmed
  here to the length it needs.
- Noise is recognisable by its crest factor: about 7 dB for noise, 20-27 dB for a real effect.
  A take under MIN_CREST_DB is rejected and the next seed is tried, up to len(SEEDS) times.

Levelling is by loudness, not by peak: the active part (windows within 20 dB of the loudest)
is set to TARGET_RMS_DB, and the peak is capped at PEAK_CAP_DB. Peak levelling made a 2.5 s
noisy sound far louder than a 0.3 s tick at the same peak.
"""
import datetime
try:
    import fcntl
except ImportError:
    fcntl = None
import hashlib
import json
import os
import shlex
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

import numpy as np

LIBRARY = str(Path.home() / ".cache" / "explainer" / "sfx-library")
OUT = Path("public/sfx")
GEN_S = 2
SEEDS = (7, 11, 23, 42)
MIN_CREST_DB = 12.0
TARGET_RMS_DB = -30.0
PEAK_CAP_DB = -3.0
SR = 44100


def gen_cmd():
    """The sound-effect command: GEN_SFX, or the adapter that ships with the skill."""
    env = os.environ.get("GEN_SFX")
    if not env:
        return [sys.executable, str(Path(__file__).resolve().parent.parent / "adapters" / "gen-sfx.py")]
    if os.name == "nt":
        return [s.strip('"') for s in shlex.split(env, posix=False)]
    return shlex.split(env)

# name: (seconds kept, prompt)
DEFAULT_SET = {
    "pop": (0.4, "soft cartoon pop, short and clean"),
    "whoosh_in": (1.0, "soft cinematic whoosh"),
    "typing": (2.0, "light fast keyboard typing ticks"),
    "stamp": (0.6, "rubber stamp thud on a paper sheet on a wooden desk"),
    "tick": (0.3, "soft user interface tick click"),
    "rustle": (1.0, "short paper rustle"),
    "whoosh": (0.8, "quick airy whoosh"),
    "click": (0.3, "soft mechanical click"),
    "swell": (4.0, "soft airy rising musical swell"),
    "chime": (1.2, "gentle bright single chime ding"),
    "swap": (0.6, "soft swoosh, user interface transition"),
    "whoosh_out": (1.2, "soft whoosh fading away"),
}


def load_set(root):
    path = Path(root) / "sfx.json"
    if not path.exists():
        return DEFAULT_SET
    return {name: (float(s), str(p)) for name, (s, p) in json.loads(path.read_text()).items()}


def recipe_key(prompt, keep_s):
    """Everything that shapes the final file. Change a constant and old takes stop matching."""
    recipe = [prompt, keep_s, GEN_S, SEEDS, MIN_CREST_DB, TARGET_RMS_DB, PEAK_CAP_DB, SR]
    return hashlib.sha256(json.dumps(recipe).encode()).hexdigest()[:12]


def decode(path):
    raw = subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-i", str(path), "-ac", "1", "-ar", str(SR),
                          "-f", "f32le", "-"], capture_output=True, check=True).stdout
    return np.frombuffer(raw, dtype=np.float32).copy()


def crest_db(x):
    return 20 * np.log10(np.abs(x).max() / (np.sqrt(np.mean(x ** 2)) + 1e-12) + 1e-12)


def active_rms_db(x):
    n = SR // 20
    w = np.array([np.sqrt(np.mean(x[i * n:(i + 1) * n] ** 2)) for i in range(max(1, len(x) // n))])
    db = 20 * np.log10(w + 1e-12)
    return float(np.median(db[db > db.max() - 20]))


def service_take(prompt, keep_s):
    """Call the sound generator until a seed passes the noise gate. Returns (seed, samples)."""
    gen_s = max(GEN_S, int(np.ceil(keep_s)))
    with tempfile.TemporaryDirectory() as tmp:
        raw = Path(tmp) / "raw.wav"
        for seed in SEEDS:
            subprocess.run([*gen_cmd(), prompt, str(raw), "--seconds", str(gen_s), "--seed", str(seed)],
                           stdin=subprocess.DEVNULL, capture_output=True, check=True)
            # keep the start of the take; the sound is placed by its start
            x = decode(raw)[: int(keep_s * SR)]
            c = crest_db(x)
            if c >= MIN_CREST_DB and np.abs(x).max() > 1e-3:
                return seed, x
            print(f"  seed {seed} rejected (crest {c:.1f} dB): {prompt}")
    raise SystemExit(f"no usable take in {len(SEEDS)} seeds: {prompt}")


def level_and_write(x, dest):
    fade = min(int(0.08 * SR), len(x) // 3)
    x = x.copy()
    x[-fade:] *= np.linspace(1, 0, fade)
    x = x * 10 ** ((TARGET_RMS_DB - active_rms_db(x)) / 20)
    cap = 10 ** (PEAK_CAP_DB / 20)
    if np.abs(x).max() > cap:
        x = x * cap / np.abs(x).max()
    pcm = (np.clip(x, -1, 1) * 32767).astype("<i2").tobytes()
    subprocess.run(["ffmpeg", "-nostdin", "-y", "-v", "error", "-f", "s16le", "-ar", str(SR), "-ac", "1", "-i", "-",
                    str(dest)], input=pcm, check=True)
    return x


def write_json_atomic(path, data):
    tmp = path.with_name(path.name + ".tmp")
    tmp.write_text(json.dumps(data, indent=1, ensure_ascii=False) + "\n")
    tmp.replace(path)


def same_bytes(a, b):
    return Path(a).read_bytes() == Path(b).read_bytes()


def library_add(lib, key, entry, wav):
    """Store the take and its index entry; return the primary entry for the key.

    A key that already has a take with other bytes keeps both: the first stays primary and is
    what projects get, the new one is listed under "alternates". The lock serialises projects.
    """
    with open(lib / ".lock", "w") as lock:
        if fcntl is not None:
            fcntl.flock(lock, fcntl.LOCK_EX)
        index_path = lib / "index.json"
        index = json.loads(index_path.read_text()) if index_path.exists() else {}
        if key not in index:
            shutil.copyfile(wav, lib / entry["file"])
            index[key] = entry
            write_json_atomic(index_path, index)
            return entry
        primary = index[key]
        alternates = primary.setdefault("alternates", [])
        if any(same_bytes(wav, lib / e["file"]) for e in [primary, *alternates]):
            return primary
        alt = {f: entry[f] for f in ("seed", "origin", "created")}
        alt["file"] = f"{primary['name']}-{key}-alt{len(alternates) + 1}.wav"
        shutil.copyfile(wav, lib / alt["file"])
        alternates.append(alt)
        write_json_atomic(index_path, index)
        return primary


def main(argv, take=service_take):
    lib = Path(os.environ.get("SFX_LIBRARY", LIBRARY)).expanduser()
    lib.mkdir(parents=True, exist_ok=True)
    index_path = lib / "index.json"
    index = json.loads(index_path.read_text()) if index_path.exists() else {}
    OUT.mkdir(parents=True, exist_ok=True)
    origin = Path.cwd().name
    report = {}
    for name, (keep_s, prompt) in load_set(Path.cwd()).items():
        key = recipe_key(prompt, keep_s)
        dest = OUT / f"{name}.wav"
        if key in index:
            entry = index[key]
            shutil.copyfile(lib / entry["file"], dest)
            source = "library"
        else:
            seed, x = take(prompt, keep_s)
            level_and_write(x, dest)
            entry = {"name": name, "prompt": prompt, "seconds": keep_s, "seed": seed,
                     "file": f"{name}-{key}.wav", "origin": origin,
                     "created": datetime.date.today().isoformat()}
            entry = library_add(lib, key, entry, dest)
            # a parallel run may have stored this key first; the library take wins
            shutil.copyfile(lib / entry["file"], dest)
            source = "generated"
        y = decode(dest)
        report[name] = {"source": source, "library_key": key, "prompt": prompt, "seed": entry["seed"],
                        "seconds": keep_s, "crest_db": round(float(crest_db(y)), 1),
                        "active_rms_db": round(active_rms_db(y), 1),
                        "peak_db": round(float(20 * np.log10(np.abs(y).max())), 1)}
        r = report[name]
        print(f"{name:11s} {source:9s} seed {r['seed']:2d}  crest {r['crest_db']:4.1f} dB"
              f"  rms {r['active_rms_db']:6.1f}  peak {r['peak_db']:5.1f}")
    write_json_atomic(OUT / "sfx-report.json", report)


if __name__ == "__main__":
    main(sys.argv[1:])
