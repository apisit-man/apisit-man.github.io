#!/usr/bin/env python3
"""Cut a subject out of a drawing or a photo. Reference adapter for the explainer-video skill.

    pip install "rembg[cpu]" pillow
    cutout.py pose.png pose-cut.png                 # isnet-anime, for drawings
    cutout.py face.png face-cut.png --model u2net   # u2net, for photos

The model downloads once into ~/.u2net. Writes a transparent PNG on the same canvas as the
input. Put every pose on the same canvas size afterwards, so a pose swap needs no offset.
"""
import argparse
import sys
from pathlib import Path


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("input")
    ap.add_argument("output", help="output .png with an alpha channel")
    ap.add_argument("--model", default="isnet-anime", choices=["isnet-anime", "u2net", "isnet-general-use"])
    args = ap.parse_args()

    try:
        from rembg import new_session, remove
        from PIL import Image
    except ImportError:
        sys.exit('install the adapter dependencies: pip install "rembg[cpu]" pillow')

    out = Path(args.output)
    if not out.parent.is_dir():
        sys.exit(f"output directory does not exist: {out.parent}")
    session = new_session(args.model)
    with Image.open(args.input) as img:
        result = remove(img, session=session)
        result.save(out)
    print(f"{out} ({out.stat().st_size} B), model {args.model}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
