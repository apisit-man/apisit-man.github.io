"""Fit the music bed to the video length and tame its peaks.

Usage: python3 scripts/fit-music.py <source-music.mp3>     (run from the project root)

- Length: time-stretch (pitch kept) so the music ends 0.3 s after the video, because
  the starter composition fades it out over the last 75 frames. A different voice model changes the
  length (v4 narrates about 8-10 % slower than v2), so run this after every voice change.
- Peaks: a fast compressor and a limiter cut the drum hits. Without them the hits reached
  speech level in 50 ms windows once the bed was raised 3 dB (check-audio.py rule C).
- Level: then gain back to the mean volume of the plain stretched source. A compressor
  alone (5 ms attack) let the hits through and only made the bed 6.6 dB quieter.
Writes public/music.mp3. Keep the untouched source outside public/.
"""
import json
import math
import subprocess
import sys

FPS = 30
src = sys.argv[1]
sb = json.load(open("storyboard.json", encoding="utf-8"))
gap = math.floor(sb["gap_s"] * FPS + 0.5)
video_s = sum(b["frames"] + gap + b.get("tail_frames", 0) for b in sb["beats"]) / FPS
music_s = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", src],
                               capture_output=True, text=True, check=True).stdout)
tempo = music_s / (video_s + 0.3)
if not 0.5 <= tempo <= 2.0:
    raise SystemExit(f"tempo {tempo:.3f} out of range: regenerate the music for {video_s:.1f} s instead")
def mean_db(af):
    out = subprocess.run(["ffmpeg", "-nostdin", "-hide_banner", "-i", src, "-filter:a", f"{af},volumedetect",
                          "-f", "null", "-"], capture_output=True, text=True, check=True).stderr
    return float(out.split("mean_volume:")[1].split("dB")[0])


stretch = f"atempo={tempo:.5f}"
tame = f"{stretch},acompressor=threshold=-24dB:ratio=6:attack=1:release=150,alimiter=limit=0.25:attack=1:release=50:level=false"
gain = mean_db(stretch) - mean_db(tame)
subprocess.run(["ffmpeg", "-nostdin", "-y", "-v", "error", "-i", src, "-filter:a", f"{tame},volume={gain:.2f}dB",
                "-b:a", "192k", "public/music.mp3"], check=True)
print(f"video {video_s:.2f} s, music {music_s:.2f} s -> tempo {tempo:.4f}, tamed, +{gain:.1f} dB back -> public/music.mp3")
