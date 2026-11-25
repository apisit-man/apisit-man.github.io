#!/usr/bin/env python3
"""Keyless warm acoustic-marimba & felt-piano score generator obeying ADAPTERS.md gen-music.

    gen-music-local.py <plan.json> <out.mp3>

Produces a clean, tonal instrumental bed (spectral flatness < 0.005, zero hiss, controlled crest)
at the exact requested length_ms when ELEVENLABS_API_KEY is not set.
"""
import argparse
import json
import subprocess
import sys
from pathlib import Path

import numpy as np

SR = 44100


def midi_hz(m: float) -> float:
    return 440.0 * (2.0 ** ((m - 69.0) / 12.0))


def add_note(buf: np.ndarray, start_s: float, dur_s: float, midi: int, amp: float, brightness: float = 0.25) -> None:
    i0 = int(round(start_s * SR))
    if i0 >= len(buf):
        return
    n = min(int(round(dur_s * SR)), len(buf) - i0)
    if n <= 16:
        return
    t = np.arange(n, dtype=np.float64) / SR
    f = midi_hz(midi)
    atk = 1.0 - np.exp(-t * 85.0)
    env = atk * np.exp(-t * (2.6 / max(0.35, dur_s * 0.55)))
    # Smooth fade at tail to prevent clicks
    tail = min(512, n // 4)
    if tail > 0:
        env[-tail:] *= np.linspace(1.0, 0.0, tail)
    tone = (
        np.sin(2 * np.pi * f * t)
        + brightness * np.sin(2 * np.pi * 2.0 * f * t) * np.exp(-t * 5.0)
        + (brightness * 0.35) * np.sin(2 * np.pi * 3.0 * f * t) * np.exp(-t * 9.0)
    )
    pan_l = 0.52 + 0.14 * np.sin(midi * 0.7)
    pan_r = 1.0 - pan_l + 0.2
    sig = amp * tone * env
    buf[i0:i0 + n, 0] += sig * pan_l
    buf[i0:i0 + n, 1] += sig * pan_r


def compose(length_s: float) -> np.ndarray:
    total = int(round(length_s * SR))
    buf = np.zeros((total, 2), dtype=np.float64)
    bpm = 96.0
    beat_s = 60.0 / bpm
    bar_s = 4.0 * beat_s

    # Warm uplifting progression in C major / F lydian: Cmaj9 -> Am9 -> Fmaj7 -> G6
    chords = [
        (48, [60, 64, 67, 71, 74]),  # Cmaj9
        (45, [57, 60, 64, 67, 71]),  # Am9
        (41, [53, 57, 60, 64, 69]),  # Fmaj13
        (43, [55, 59, 62, 64, 67]),  # G6
    ]
    arp_idx = [0, 2, 1, 3, 4, 2, 3, 1]

    n_bars = int(np.ceil(length_s / bar_s))
    for bar in range(n_bars):
        t_bar = bar * bar_s
        if t_bar >= length_s - 0.8:
            break
        bass, notes = chords[bar % len(chords)]
        # Gentle lift in middle section
        progress = t_bar / max(1.0, length_s)
        lift = 0.85 + 0.25 * np.sin(np.pi * np.clip(progress, 0, 1))

        # Warm sustained pad/cello root + fifth
        add_note(buf, t_bar, bar_s * 1.05, bass, 0.16 * lift, brightness=0.12)
        add_note(buf, t_bar, bar_s * 1.02, bass + 7, 0.09 * lift, brightness=0.10)

        # Felt piano soft chord on beat 1 and beat 3
        for half in (0, 2):
            for k, m in enumerate(notes[:4]):
                add_note(buf, t_bar + half * beat_s + k * 0.018, beat_s * 1.9, m, 0.075 * lift, brightness=0.18)

        # Gentle marimba eighth-note arpeggio
        eighth = beat_s * 0.5
        for step, idx in enumerate(arp_idx):
            t_note = t_bar + step * eighth
            if t_note >= length_s - 0.5:
                break
            vel = (0.095 if step % 2 == 0 else 0.068) * lift
            octave = 12 if (bar % 2 == 1 and step in (4, 6)) else 0
            add_note(buf, t_note, eighth * 1.6, notes[idx] + octave, vel, brightness=0.32)

    # Smooth fade-in (1.2 s) and resolved fade-out (2.5 s)
    fi = min(int(1.2 * SR), total // 4)
    fo = min(int(2.5 * SR), total // 3)
    buf[:fi] *= np.linspace(0.0, 1.0, fi)[:, None]
    buf[-fo:] *= np.linspace(1.0, 0.0, fo)[:, None]

    peak = np.abs(buf).max() + 1e-12
    buf = buf / peak * 0.45  # comfortable headroom (~ -7 dBFS before fit-music.py)
    return buf


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("plan")
    ap.add_argument("output")
    args = ap.parse_args()

    plan = json.loads(Path(args.plan).read_text(encoding="utf-8"))
    ms = plan.get("length_ms") or plan.get("music_length_ms") or 65000
    out = Path(args.output)
    if not out.parent.is_dir():
        sys.exit(f"output directory does not exist: {out.parent}")

    audio = compose(float(ms) / 1000.0)
    pcm = (np.clip(audio, -1.0, 1.0) * 32767).astype("<i2").tobytes()
    subprocess.run(
        ["ffmpeg", "-nostdin", "-y", "-v", "error", "-f", "s16le", "-ar", str(SR), "-ac", "2",
         "-i", "-", "-codec:a", "libmp3lame", "-b:a", "192k", str(out)],
        input=pcm,
        check=True,
    )
    print(f"{out} ({out.stat().st_size} B), local marimba-piano score ({ms / 1000:.1f} s)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
