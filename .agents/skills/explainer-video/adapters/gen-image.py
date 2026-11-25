#!/usr/bin/env python3
"""Generate an image with the Gemini API. Reference adapter for the explainer-video skill.

    pip install google-genai pillow
    export GEMINI_API_KEY=...          # AI Studio key

    gen-image.py "a red paper rocket on a plain cream background" out.png
    gen-image.py "make the rocket tilt left" out.png --input out.png --size 1536x1024

Model: --model gemini-2.5-flash-image (default, fast) or gemini-3-pro-image-preview (better
text and detail). --input turns the call into an edit: send the base drawing and ask for the
change. Only the long side of --size is passed as the aspect ratio; the API picks the pixels.

Set GEN_IMAGE_MODEL to change the default model. Keys are read from the environment, never
from a file that this script prints.
"""
import argparse
import base64
import io
import os
import sys
from pathlib import Path

MODELS = {"gemini-2.5-flash-image", "gemini-3-pro-image-preview", "gemini-3-pro-image"}
ASPECTS = {"1024x1024": "1:1", "1536x1024": "3:2", "1024x1536": "2:3", "1920x1080": "16:9",
           "1080x1920": "9:16", "1344x768": "16:9", "768x1344": "9:16"}


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("prompt")
    ap.add_argument("output", help="output .png")
    ap.add_argument("--size", default="1024x1024", choices=sorted(ASPECTS))
    ap.add_argument("--model", default=os.environ.get("GEN_IMAGE_MODEL", "gemini-2.5-flash-image"),
                    choices=sorted(MODELS))
    ap.add_argument("--input", action="append", default=[], metavar="FILE",
                    help="source image for an edit (repeatable, max 3)")
    args = ap.parse_args()
    if len(args.input) > 3:
        ap.error("at most 3 --input images")

    try:
        from google import genai
        from google.genai import types
        from PIL import Image
    except ImportError:
        sys.exit("install the adapter dependencies: pip install google-genai pillow")
    if not os.environ.get("GEMINI_API_KEY"):
        sys.exit("set GEMINI_API_KEY (AI Studio), or use gen-image-agy.py on a subscription")

    parts = [types.Part.from_text(text=args.prompt)]
    for f in args.input:
        img = Image.open(f)
        img.thumbnail((1536, 1536))
        buf = io.BytesIO()
        img.save(buf, format="PNG")
        parts.append(types.Part.from_bytes(data=buf.getvalue(), mime_type="image/png"))

    client = genai.Client()
    resp = client.models.generate_content(
        model=args.model,
        contents=[types.Content(role="user", parts=parts)],
        config=types.GenerateContentConfig(
            response_modalities=["IMAGE"],
            image_config=types.ImageConfig(aspect_ratio=ASPECTS[args.size]),
        ),
    )
    out = Path(args.output)
    if not out.parent.is_dir():
        sys.exit(f"output directory does not exist: {out.parent}")
    for cand in resp.candidates or []:
        for part in cand.content.parts:
            if part.inline_data and part.inline_data.data:
                data = part.inline_data.data
                raw = base64.b64decode(data) if isinstance(data, str) else data
                out.write_bytes(raw)
                print(f"{out} ({len(raw)} B), model {args.model}")
                return 0
    text = getattr(resp, "text", "") or ""
    sys.exit(f"no image in the response. {text[:400]}")


if __name__ == "__main__":
    sys.exit(main())
