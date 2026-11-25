"""Level every voice line to the same speech loudness. Run after regen-voices.py.

Usage: python3 scripts/level-voices.py          (run from the project root)

regen-voices.py normalises by peak (-7 dB). Peak says nothing about how loud a line sounds:
measured lines spread over 6 dB against the median, an audible
jump between the two speakers. This sets the active speech level (400 ms windows within
20 dB of the loudest) of each line to TARGET_DB and caps the peak at PEAK_CAP_DB.
Rewrites assets/voice-norm and public/voice-norm in place; the mouth envelopes are
normalised per line, so they stay valid.
"""
import json
import shutil
import subprocess
import tempfile
from pathlib import Path

import numpy as np

TARGET_DB = -24.5
PEAK_CAP_DB = -2.0
SR = 44100


def level_db(x):
    w, h = int(0.4 * SR), int(0.1 * SR)
    r = np.array([np.sqrt(np.mean(x[i:i + w] ** 2)) for i in range(0, len(x) - w, h)])
    db = 20 * np.log10(r + 1e-9)
    act = db[db > db.max() - 20]
    return 10 * np.log10(np.mean(10 ** (act / 10)))


sb = json.load(open("storyboard.json", encoding="utf-8"))
for b in sb["beats"]:
    path = f"assets/voice-norm/{b['id']}.wav"
    x = np.frombuffer(subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-i", path, "-f", "f32le", "-ac", "1", "-ar", str(SR), "-"],
                                     capture_output=True, check=True).stdout, np.float32)
    gain = TARGET_DB - level_db(x)
    peak = 20 * np.log10(np.abs(x).max()) + gain
    if peak > PEAK_CAP_DB:
        raise SystemExit(f"{b['id']}: peak would reach {peak:.1f} dB; lower TARGET_DB")
    tmp = str(Path(tempfile.gettempdir()) / f"level-{b['id']}.wav")
    subprocess.run(["ffmpeg", "-nostdin", "-y", "-v", "error", "-i", path, "-af", f"volume={gain:.2f}dB",
                    "-ar", str(SR), "-ac", "1", "-sample_fmt", "s16", tmp], check=True)
    shutil.move(tmp, path)
    shutil.copy(path, f"public/voice-norm/{b['id']}.wav")
    print(f"{b['id']} {gain:+.1f} dB, peak {peak:.1f} dB")
