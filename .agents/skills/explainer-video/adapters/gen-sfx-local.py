#!/usr/bin/env python3
"""Keyless procedural sound-effect adapter obeying the ADAPTERS.md gen-sfx contract.

    gen-sfx-local.py "<prompt>" <out.wav> --seconds <n> --seed <n>

Synthesises clean, high-crest (>18 dB) studio UI and foley effects with numpy + ffmpeg
when ELEVENLABS_API_KEY is not set.
"""
import argparse
import subprocess
import sys
from pathlib import Path

import numpy as np

SR = 44100


def synth(prompt: str, seconds: float, seed: int) -> np.ndarray:
    rng = np.random.default_rng(seed)
    n = max(SR, int(round(seconds * SR)))
    t = np.arange(n, dtype=np.float64) / SR
    p = prompt.lower()
    out = np.zeros(n, dtype=np.float64)

    if "tick" in p or "click" in p:
        f0 = 1550.0 + rng.uniform(-80, 80)
        env = np.exp(-t * 95.0)
        out = (0.75 * np.sin(2 * np.pi * f0 * t) + 0.35 * np.sin(2 * np.pi * f0 * 2.4 * t)) * env
    elif "pop" in p or "stamp" in p:
        f_sweep = 160.0 + 360.0 * np.exp(-t * 38.0)
        phase = 2 * np.pi * np.cumsum(f_sweep) / SR
        env = np.exp(-t * 28.0) * (1 - np.exp(-t * 400.0))
        out = 0.85 * np.sin(phase) * env
    elif "chime" in p or "ding" in p or "bell" in p:
        freqs = [880.0, 1318.5, 1760.0, 2637.0]
        amps = [0.65, 0.30, 0.22, 0.10]
        decays = [3.6, 5.0, 6.8, 9.5]
        atk = 1.0 - np.exp(-t * 260.0)
        for f, a, d in zip(freqs, amps, decays):
            out += a * np.sin(2 * np.pi * f * t) * np.exp(-t * d) * atk
    elif "spark" in p or "shimmer" in p:
        notes = [(0.00, 659.25), (0.07, 830.61), (0.14, 987.77), (0.21, 1318.51)]
        for t0, f in notes:
            idx = t >= t0
            dt = t[idx] - t0
            env = (1.0 - np.exp(-dt * 180.0)) * np.exp(-dt * 5.2)
            out[idx] += 0.38 * (np.sin(2 * np.pi * f * dt) + 0.25 * np.sin(2 * np.pi * 2 * f * dt)) * env
    elif "swell" in p:
        dur = min(seconds, 2.2)
        env = np.where(t < dur, np.sin(np.pi * np.clip(t / dur, 0, 1)) ** 2.4, 0.0)
        for f, a in ((261.63, 0.35), (329.63, 0.28), (392.00, 0.28), (523.25, 0.20)):
            out += a * np.sin(2 * np.pi * f * t + rng.uniform(0, 0.5)) * env
    else:  # airy tonal whoosh with high crest factor (smooth pitched breeze + resonant sweep)
        center = 0.22 + rng.uniform(-0.02, 0.03)
        env = np.exp(-((t - center) / 0.11) ** 2)
        f_sweep = 240.0 + 520.0 * np.clip(t / 0.55, 0, 1)
        phase = 2 * np.pi * np.cumsum(f_sweep) / SR
        harmonics = np.sin(phase) + 0.5 * np.sin(1.5 * phase + 0.4) + 0.25 * np.sin(2.0 * phase + 1.1)
        breeze = rng.normal(0, 0.06, n)
        kernel = np.hanning(36)
        kernel /= kernel.sum()
        breeze = np.convolve(breeze, kernel, mode="same")
        out = (0.55 * harmonics + breeze) * env

    peak = np.abs(out).max() + 1e-12
    out = out / peak * 0.85
    return out


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("prompt")
    ap.add_argument("output")
    ap.add_argument("--seconds", type=float, default=2.0)
    ap.add_argument("--seed", type=int, default=7)
    args = ap.parse_args()

    out = Path(args.output)
    if not out.parent.is_dir():
        sys.exit(f"output directory does not exist: {out.parent}")
    samples = synth(args.prompt, args.seconds, args.seed)
    pcm = (np.clip(samples, -1.0, 1.0) * 32767).astype("<i2").tobytes()
    subprocess.run(
        ["ffmpeg", "-nostdin", "-y", "-v", "error", "-f", "s16le", "-ar", str(SR), "-ac", "1", "-i", "-", str(out)],
        input=pcm,
        check=True,
    )
    print(f"{out} ({out.stat().st_size} B), local synth")
    return 0


if __name__ == "__main__":
    sys.exit(main())
