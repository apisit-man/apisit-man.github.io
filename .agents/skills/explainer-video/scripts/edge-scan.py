"""Find frames where an edge of the picture shows the page ground instead of the scene.

Usage: python3 scripts/edge-scan.py <file.mp4> [--fps 4]   exit 0 = no run, 1 = runs to eyeball

A camera move over a parallax layer (depth < 1) moves the layer less than the camera, so a pull-out
or a pan that ends off-centre uncovers the frame edge: a strip of the composition's ground shows
for a second or two. A still rarely lands on it and a quick video review can miss it. This scan catches it.

Per edge (left, right, top, bottom) it compares the mean luma of the outer 8 px strip (the middle
90 % of the edge) with the 8 px strip 40 px inside. A hit = the outer strip is near a flat ground
(>= 238 light, <= 22 dark) and differs from the inner strip by more than 15. Each run of hits is
printed. Eyeball every run: a dark title bar or a bright surface at the edge is a legitimate run.
"""
import argparse
import json
import subprocess
import sys

import numpy as np


def frame_size(src: str) -> tuple[int, int]:
    probe = subprocess.run(
        ["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries",
         "stream=width,height", "-of", "json", src],
        capture_output=True, check=True, text=True,
    )
    stream = json.loads(probe.stdout)["streams"][0]
    return int(stream["width"]), int(stream["height"])


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("src")
    ap.add_argument("--fps", type=float, default=4.0)
    args = ap.parse_args()

    w, h = frame_size(args.src)
    raw = subprocess.run(
        ["ffmpeg", "-nostdin", "-v", "error", "-i", args.src, "-vf",
         f"fps={args.fps},format=gray", "-f", "rawvideo", "-"],
        capture_output=True, check=True,
    ).stdout
    frames = np.frombuffer(raw, np.uint8).reshape(-1, h, w)
    y0, y1, x0, x1 = int(h * 0.05), int(h * 0.95), int(w * 0.05), int(w * 0.95)
    strips = {  # edge: (outer 8 px, the 8 px strip 40 px inside)
        "L": (np.s_[y0:y1, 0:8], np.s_[y0:y1, 40:48]),
        "R": (np.s_[y0:y1, w - 8:w], np.s_[y0:y1, w - 48:w - 40]),
        "T": (np.s_[0:8, x0:x1], np.s_[40:48, x0:x1]),
        "B": (np.s_[h - 8:h, x0:x1], np.s_[h - 48:h - 40, x0:x1]),
    }
    step = 1 / args.fps
    runs: list[list] = []
    for i, fr in enumerate(frames):
        t = i * step
        for edge, (outer, inner) in strips.items():
            out, inn = float(fr[outer].mean()), float(fr[inner].mean())
            if (out >= 238 or out <= 22) and abs(out - inn) > 15:
                if runs and runs[-1][0] == edge and t - runs[-1][2] <= step + 1e-6:
                    runs[-1][2] = t
                else:
                    runs.append([edge, t, t, round(out), round(inn)])
    print(f"{args.src}: {len(frames)} frames at {args.fps:g} fps, {len(runs)} run(s)")
    for edge, a, b, out, inn in runs:
        print(f"  {edge}  {a:6.2f}–{b:6.2f} s  edge {out}  inside {inn}")
    return 1 if runs else 0


if __name__ == "__main__":
    sys.exit(main())
