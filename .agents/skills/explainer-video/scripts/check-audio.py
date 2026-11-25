"""Fail a mix that has a jump in loudness, or a music bed that has turned into noise. Run it on
the audio-only render BEFORE the video render, and on the finished video AFTER it.

Usage: python3 scripts/check-audio.py <file.wav|file.mp4> [b02,b04] [--offset SECONDS]   exit 0 = pass, 1 = fail
       The optional list checks a sample render that holds only those beats.
       --offset: the time before the first beat starts. Give it for a video with a silent opening
       title card (the frame), e.g. --offset 3 for a 90-frame card. Default 0. Without it, the voice
       track is placed 3 s too early, and rules B and C report the voice as music.
       (run from the project root: it rebuilds the voice-only track from storyboard.json)

A bare loudness threshold cannot tell a loud effect from a stressed word, so the mix is
compared with the voice track alone (public/voice-norm/<beat>.wav placed exactly as the
composition places it, volume 1). Windows: 400 ms, hop 100 ms. L = median speech level.

  A  voices: each beat's speech level within +-3 dB of the median beat   (speaker jumps)
  B  music + effects (mix minus voice) stay under L - 3 dB in every window
  C  no effect jumps more than 10 dB within 100 ms to above L - 4 dB    (a startle)
  D  sample peak under -1 dBFS                                             (no clipping)
  E  public/music.mp3 has no noise run: spectral flatness (100 Hz-12 kHz, 2 s windows, 1 s hop)
     stays under 0.02, or exceeds it for less than 4 s                     (a broken music take)
Rule E reads the music file, not the mix: whooshes and shimmers are noise by design.
STORYBOARD, MUSIC and VOICE_DIR override storyboard.json, public/music.mp3 and public/voice-norm/ (a second
composition or a second language in the same project).
A generated music take can turn into flat hiss after a minute and still pass A to D, because
the hiss is quiet. Calibration from real projects: that hiss 0.03-0.06, clean takes <= 0.012.
Check every animation for a jump in loudness, and check the sound effects when they are made,
not only at the end.
"""
import argparse
import os
import json
import math
import subprocess
import sys

import numpy as np

SR = 48000
FPS = 30


def channels(path):
    out = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "a:0", "-show_entries", "stream=channels",
                          "-of", "csv=p=0", path], capture_output=True, text=True, check=True).stdout.strip()
    return int(out or 1)


def decode(path):
    # Remotion puts a mono voice into both channels at -3 dB, so the mono of the mix is (L + R) / sqrt(2).
    # ffmpeg does that for an unknown layout (a Remotion WAV) but averages a stereo mp4: 3 dB apart.
    # Do it explicitly, so the mp4 and the WAV of the same mix decode to the level of the voice track.
    mono = ["-af", "pan=mono|c0=0.70710678*c0+0.70710678*c1"] if channels(path) == 2 else ["-ac", "1"]
    raw = subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-i", path, "-vn", *mono, "-ar", str(SR),
                          "-f", "f32le", "-"], capture_output=True, check=True).stdout
    return np.frombuffer(raw, dtype=np.float32)


def noise_runs(sig, limit=0.02, min_s=4):
    """Return (start_s, end_s, max_flatness) for each run of noise-like windows of >= min_s."""
    n = 2048
    freqs = np.fft.rfftfreq(n, 1 / SR)
    band = (freqs >= 100) & (freqs <= 12000)
    win = np.hanning(n)
    flat = []
    for a in range(0, len(sig) - 2 * SR, SR):
        seg = sig[a:a + 2 * SR]
        if np.sqrt(np.mean(seg ** 2)) < 1e-3:  # silence is not noise
            flat.append(0.0)
            continue
        frames = np.lib.stride_tricks.sliding_window_view(seg, n)[::n // 2] * win
        p = np.abs(np.fft.rfft(frames, axis=1))[:, band] ** 2 + 1e-12
        flat.append(float(np.median(np.exp(np.mean(np.log(p), axis=1)) / np.mean(p, axis=1))))
    runs, start = [], None
    for k, v in enumerate(flat + [0.0]):
        if v > limit and start is None:
            start = k
        if v <= limit and start is not None:
            if k - start + 1 >= min_s:  # windows k0..k-1 cover k-k0+1 seconds
                runs.append((start, k + 1, max(flat[start:k])))
            start = None
    return runs


def db(sig, a, b):
    seg = sig[max(0, a):max(0, b)]
    return 20 * np.log10(np.sqrt(np.mean(seg ** 2)) + 1e-12) if len(seg) else -120.0


def main(argv=None):
    ap = argparse.ArgumentParser(description="Check a mix for loudness jumps and a noisy music bed.")
    ap.add_argument("file", help="the audio-only render or the finished video")
    ap.add_argument("beats", nargs="?", help="comma-separated beat ids of a sample render, e.g. b02,b04")
    ap.add_argument("--offset", type=float, default=0.0, metavar="SECONDS",
                    help="time before the first beat, e.g. 3 for a silent opening title card")
    args = ap.parse_args(argv)
    if args.offset < 0:
        sys.exit("--offset must be 0 or more")

    mix = decode(args.file)
    sb = json.load(open(os.environ.get("STORYBOARD", "storyboard.json"), encoding="utf-8"))
    gap = math.floor(sb["gap_s"] * FPS + 0.5)
    voice = np.zeros_like(mix)
    spans = []
    t = round(args.offset * FPS)  # frames
    ONLY = args.beats.split(",") if args.beats else None
    beats = [b for b in sb["beats"] if not ONLY or b["id"] in ONLY]
    for b in beats:
        v = decode(os.path.join(os.environ.get("VOICE_DIR", "public/voice-norm"), f"{b['id']}.wav"))
        # a storyboard can give each beat an absolute "start" frame; it then wins over the running sum
        s0 = int((round(args.offset * FPS) + b["start"] if "start" in b else t) / FPS * SR)
        n = min(len(v), len(mix) - s0 - 200)
        # the renderer places audio a fraction of a millisecond off the frame grid; align each
        # beat by cross-correlation (+-200 samples) or the subtraction below leaves the voice in
        s = max(range(max(0, s0 - 200), s0 + 201), key=lambda c: float(np.dot(mix[c:c + n], v[:n])))
        voice[s:s + n] += v[:n]
        spans.append((b["id"], b["speaker"], s, s + int(b["frames"] / FPS * SR)))
        t += b["frames"] + gap + b.get("tail_frames", 0)

    W, H = int(0.4 * SR), int(0.1 * SR)
    idx = range(0, len(mix) - W, H)
    voc_l = np.array([db(voice, i, i + W) for i in idx])
    speaking = voc_l > voc_l.max() - 25
    L = float(np.median(voc_l[speaking]))
    fails = []

    beat_levels = []
    for bid, spk, a, z in spans:
        w = np.array([db(voice, i, i + W) for i in range(a, z - W, H)])
        w = w[w > w.max() - 20] if len(w) else np.array([-120.0])
        beat_levels.append((bid, spk, float(np.median(w))))
    med = float(np.median([x[2] for x in beat_levels]))
    for bid, spk, lv in beat_levels:
        if abs(lv - med) > 3:
            fails.append(f"A  {bid} {spk}: speech {lv - med:+.1f} dB from the median beat")

    res = mix - voice  # music + effects
    res_l = np.array([db(res, i, i + W) for i in idx])
    for k in np.where(res_l > L - 3)[0]:
        fails.append(f"B  {k * 0.1:6.2f}s  music+effects at L{res_l[k] - L:+.1f} dB (limit L-3)")

    S = int(0.05 * SR)
    short = np.array([db(res, i, i + S) for i in range(0, len(res) - S, S // 2)])
    for i in range(4, len(short)):
        if short[i] - short[i - 4] > 10 and short[i] > L - 4:
            fails.append(f"C  {i * 0.025:6.2f}s  effects jump +{short[i] - short[i - 4]:.1f} dB in 100 ms to L{short[i] - L:+.1f}")

    peak = 20 * np.log10(np.abs(mix).max() + 1e-12)
    if peak > -1:
        fails.append(f"D  peak {peak:.1f} dBFS")

    print(f"{args.file}: {len(mix) / SR:.1f} s, offset {args.offset:g} s, speech L = {L:.1f} dB, peak {peak:.1f} dBFS")
    print("beat speech levels vs median: " + " ".join(f"{b}{lv - med:+.1f}" for b, _, lv in beat_levels))
    k = int(np.argmax(res_l))
    print(f"loudest music+effects: {k * 0.1:.1f}s at L{res_l[k] - L:+.1f} dB")
    for a, z, mx in noise_runs(decode(os.environ.get("MUSIC", "public/music.mp3"))):
        fails.append(f"E  music.mp3 {a}-{z} s is noise (flatness up to {mx:.3f}, limit 0.02): regenerate the music")

    if fails:
        print(f"FAIL ({len(fails)})")
        for f in fails[:12]:
            print("  " + f)
        return 1
    print("PASS")
    return 0


if __name__ == "__main__":
    sys.exit(main())
