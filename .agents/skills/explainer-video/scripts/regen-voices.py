"""Generate the beats' voices with one speech model (ElevenLabs or edge-tts) and refresh the timings.

Usage (run from the project root):
    python3 scripts/regen-voices.py <model>                              # only what changed
    python3 scripts/regen-voices.py <model> --fresh b07 [b09 | <speaker>]  # reroll on purpose
    python3 scripts/regen-voices.py <model> --restore assets/voice/takes/b07-<key>-1.mp3
    python3 scripts/regen-voices.py <model> --adopt    # audio made before the cache: keep it

The model is a name the speech tool understands: "edge-tts" for the free preview voice,
"elevenlabs-v4", "elevenlabs-tts" or "elevenlabs-flash" for the paid pass.

Cache: each beat's request is the exact gen-speech arguments (text, voice, model and, for
ElevenLabs only, settings, language and the same speaker's neighbouring lines). Its hash is stored as voice_key in the
storyboard beat. A beat is generated only when that key changed, so a fixed line regenerates
itself and its same-speaker neighbours, and every other approved take stays. A beat with no
voice_key is generated, unless --adopt marks its current audio as matching. Every take is
also kept in assets/voice/takes/<id>-<key>-<n>.mp3; --restore puts one back.

Per beat: gen-speech -> assets/voice/<id>.mp3
-> peak-normalised to -7 dB, 44.1 kHz mono s16 -> assets/voice-norm + public/voice-norm
-> loudness envelope (RMS per 1/30 s frame / max) -> public/mouth/<id>.json
-> storyboard beat: voice_s, frames = ceil(voice_s * 30), gain_db, start_s, start_frame.
Then scripts/gen-envelopes.mjs bundles the envelopes for the renderer.
"""
import argparse
import hashlib
import json
import math
import os
import shlex
import shutil
import subprocess
import sys
from pathlib import Path

import numpy as np

FPS = 30
PEAK_DB = -7.0
TAKES = Path("assets/voice/takes")


def gen_cmd():
    """The speech command: GEN_SPEECH, or the adapter that ships with the skill."""
    env = os.environ.get("GEN_SPEECH")
    if not env:
        return [sys.executable, str(Path(__file__).resolve().parent.parent / "adapters" / "gen-speech.py")]
    if os.name == "nt":
        return [s.strip('"') for s in shlex.split(env, posix=False)]
    return shlex.split(env)


def run(cmd, binary=False):
    r = subprocess.run(cmd, capture_output=True, text=not binary, check=False)
    if r.returncode != 0:
        err = r.stderr if not binary else r.stderr.decode(errors="replace")
        raise SystemExit(f"failed: {' '.join(map(str, cmd[:3]))}\n{err[-800:]}")
    return r


def speak(cmd, mp3):
    run([*gen_cmd(), cmd[0], str(mp3), *cmd[1:]])


def peak_db(path):
    out = run(["ffmpeg", "-hide_banner", "-i", str(path), "-af", "volumedetect", "-f", "null", "-"]).stderr
    return float(out.split("max_volume:")[1].split("dB")[0])


def neighbour(beats, i, step):
    j = i + step
    if 0 <= j < len(beats) and beats[j]["speaker"] == beats[i]["speaker"]:
        return beats[j]["line"]
    return None


def request(sb, i, model):
    """gen-speech arguments for beat i, without the output path: text first, then flags.

    The language, the knobs and the neighbours are ElevenLabs-only: the free edge-tts model
    refuses them. Keep the ElevenLabs order as it is, because its hash is the stored voice_key.
    """
    b = sb["beats"][i]  # storyboard is the source of truth
    cmd = [b["line"], "--voice", sb["voices"][b["speaker"]]["voice_id"], "--model", model]
    if not model.startswith("elevenlabs-"):
        return cmd
    if model == "elevenlabs-v4" and b.get("tag"):
        cmd[0] = f"[{b['tag']}] {b['line']}"
    cmd += ["--language", sb.get("language", "en")]
    if model == "elevenlabs-v4":  # an expressive model needs its knobs set, or the line sounds flat
        knobs = sb.get("voice_settings", {})
        cmd += ["--stability", str(knobs.get("stability", 0.3)),
                "--similarity", str(knobs.get("similarity", 0.8)),
                "--style", str(knobs.get("style", 0.45)),
                "--speed", str(knobs.get("speed", 1.0))]
    for flag, step in (("--previous-text", -1), ("--next-text", 1)):
        n = neighbour(sb["beats"], i, step)
        if n:
            cmd += [flag, n]
    return cmd


def request_key(cmd):
    return hashlib.sha256(json.dumps(cmd, ensure_ascii=False).encode()).hexdigest()[:12]


def archive(mp3, bid, key):
    TAKES.mkdir(parents=True, exist_ok=True)
    n = len(list(TAKES.glob(f"{bid}-{key}-*.mp3"))) + 1
    shutil.copyfile(mp3, TAKES / f"{bid}-{key}-{n}.mp3")


def restore(sb, take, model):
    """Put an archived take back. Only a take made for the beat's current request fits."""
    bid, key, _ = Path(take).stem.rsplit("-", 2)
    i = next((i for i, b in enumerate(sb["beats"]) if b["id"] == bid), None)
    if i is None:
        raise SystemExit(f"--restore: no beat {bid} in the storyboard")
    if request_key(request(sb, i, model)) != key:
        raise SystemExit(f"--restore: {take} was made for another request (text, neighbours, voice or model)")
    shutil.copyfile(take, f"assets/voice/{bid}.mp3")
    sb["beats"][i]["voice_key"] = key


def normalise(bid):
    """Level the take, write the mouth envelope, and return (voice_s, frames, gain_db)."""
    mp3 = Path("assets/voice") / f"{bid}.mp3"
    gain = round(PEAK_DB - peak_db(mp3), 1)
    wav = Path("assets/voice-norm") / f"{bid}.wav"
    run(["ffmpeg", "-y", "-v", "error", "-i", str(mp3), "-af", f"volume={gain}dB",
         "-ar", "44100", "-ac", "1", "-c:a", "pcm_s16le", str(wav)])
    shutil.copy(wav, Path("public/voice-norm") / wav.name)

    raw = run(["ffmpeg", "-v", "error", "-i", str(wav), "-ac", "1", "-ar", "48000", "-f", "f32le", "-"], binary=True).stdout
    x = np.frombuffer(raw, dtype=np.float32)
    voice_s = len(x) / 48000
    frames = math.ceil(voice_s * FPS)
    n = 48000 // FPS
    rms = np.array([np.sqrt(np.mean(x[k * n:(k + 1) * n] ** 2)) if len(x[k * n:(k + 1) * n]) else 0.0
                    for k in range(frames)])
    env = np.clip(rms / rms.max(), 0, 1).round(4).tolist()
    (Path("public/mouth") / f"{bid}.json").write_text(json.dumps({"fps": FPS, "frames": frames, "env": env}))
    return voice_s, frames, gain


def main(argv, speak=speak):
    ap = argparse.ArgumentParser(description="Generate the beats' voices; only changed requests reach the API.")
    ap.add_argument("model", help="speech model, e.g. edge-tts or elevenlabs-v4")
    ap.add_argument("--fresh", nargs="+", default=[], metavar="BEAT|SPEAKER", help="reroll these beats or speakers")
    ap.add_argument("--restore", metavar="TAKE", help="put an archived take back, then refresh the timings")
    ap.add_argument("--adopt", action="store_true", help="mark beats without voice_key as matching their audio")
    args = ap.parse_args(argv)

    sb_path = Path("storyboard.json")
    sb = json.loads(sb_path.read_text(encoding="utf-8"))
    beats = sb["beats"]
    known = {b["id"] for b in beats} | {b["speaker"] for b in beats}
    unknown = [f for f in args.fresh if f not in known]
    if unknown:
        raise SystemExit(f"--fresh: no beat or speaker {', '.join(unknown)}")
    if args.restore:
        restore(sb, args.restore, args.model)
    gap = math.floor(sb["gap_s"] * FPS + 0.5)  # same rounding as the starter composition

    start = 0
    for i, b in enumerate(beats):
        bid = b["id"]
        cmd = request(sb, i, args.model)
        key = request_key(cmd)
        mp3 = Path("assets/voice") / f"{bid}.mp3"
        if args.adopt and "voice_key" not in b and mp3.exists():
            b["voice_key"] = key
        stale = b.get("voice_key") != key or not mp3.exists()
        if stale or bid in args.fresh or b["speaker"] in args.fresh:
            speak(cmd, mp3)
            archive(mp3, bid, key)
            b["voice_key"] = key
            # save now: a failure on a later beat must not make this paid take look stale
            sb_path.write_text(json.dumps(sb, ensure_ascii=False, indent=1), encoding="utf-8")
            state = "new"
        else:
            state = "kept"

        voice_s, frames, gain = normalise(bid)
        b.update(voice_file=f"assets/voice-norm/{bid}.wav", voice_s=round(voice_s, 3), frames=frames,
                 gain_db=gain, start_frame=start, start_s=round(start / FPS, 3))
        print(f"{bid} {b['speaker']:9s} {state:4s} {voice_s:6.2f}s  gain {gain:+.1f} dB", flush=True)
        start += frames + gap

    sb["total_s"] = round(start / FPS, 2)
    sb["voice_model"] = args.model
    sb_path.write_text(json.dumps(sb, ensure_ascii=False, indent=1), encoding="utf-8")
    print("total", sb["total_s"], "s")


if __name__ == "__main__":
    main(sys.argv[1:])
