#!/usr/bin/env python3
"""
Bespoke 3D Papercraft / Claymation Scene Art Generator for Thai Free Collage Director.
Generates high-resolution topic-specific illustrations via Google AI Studio (Gemini Image Gen)
and performs clean edge-connected alpha cutout so assets float seamlessly in 3D parallax.
"""

from __future__ import annotations
import argparse
import io
import json
import os
import sys
from collections import deque
from pathlib import Path
import numpy as np
from PIL import Image, ImageFilter

DEFAULT_STYLE_PROMPT = (
    "3D papercraft and miniature claymation diorama style, tactile layered paper textures, "
    "corrugated cardboard base details, soft studio rim lighting, rich 3D depth and shadows. "
    "ONLY ONE single standalone centered diorama on a 1:1 square composition with generous clean margin on a completely flat "
    "uniform pure white #FFFFFF background, NO multiple panels, NO side-by-side duplicates, "
    "NO floor shadows outside the base, NO background scenery, "
    "clean crisp outer contour, NO text, NO words, NO letters, NO numbers, NO watermarks anywhere."
)

def remove_background_cutout(img: Image.Image, tolerance: float = 40.0, add_sticker_border: bool = False) -> Image.Image:
    """
    Edge-connected flood-fill background removal.
    Safely removes solid outer background while preserving bright/white details inside the subject.
    """
    rgba = img.convert("RGBA")
    arr = np.array(rgba)
    h, w = arr.shape[:2]

    # Sample corners to determine exact background tone
    corners = np.array([
        arr[0, 0, :3],
        arr[0, w - 1, :3],
        arr[h - 1, 0, :3],
        arr[h - 1, w - 1, :3],
    ], dtype=float)
    bg = np.median(corners, axis=0)
    dist = np.linalg.norm(arr[:, :, :3].astype(float) - bg, axis=2)

    visited = np.zeros((h, w), dtype=bool)
    bg_mask = np.zeros((h, w), dtype=bool)
    q = deque()

    # Seed flood-fill from all 4 image edges
    for x in range(w):
        for y in (0, h - 1):
            if dist[y, x] < tolerance:
                q.append((y, x))
                visited[y, x] = True
    for y in range(h):
        for x in (0, w - 1):
            if not visited[y, x] and dist[y, x] < tolerance:
                q.append((y, x))
                visited[y, x] = True

    while q:
        cy, cx = q.popleft()
        bg_mask[cy, cx] = True
        for dy, dx in ((-1, 0), (1, 0), (0, -1), (0, 1)):
            ny, nx = cy + dy, cx + dx
            if 0 <= ny < h and 0 <= nx < w and not visited[ny, nx]:
                visited[ny, nx] = True
                if dist[ny, nx] < tolerance:
                    q.append((ny, nx))

    # Build smooth anti-aliased alpha mask
    alpha_arr = np.where(bg_mask, 0, 255).astype(np.uint8)
    alpha_img = Image.fromarray(alpha_arr, mode="L")
    # Slightly erode 1px to remove any faint gray fringe, then soften edge
    alpha_img = alpha_img.filter(ImageFilter.MinFilter(3))
    alpha_img = alpha_img.filter(ImageFilter.GaussianBlur(0.9))

    arr[:, :, 3] = np.array(alpha_img)
    out = Image.fromarray(arr, mode="RGBA")

    # Crop tightly around visible subject
    bbox = out.getbbox()
    if bbox:
        pad = 12
        x0 = max(0, bbox[0] - pad)
        y0 = max(0, bbox[1] - pad)
        x1 = min(w, bbox[2] + pad)
        y1 = min(h, bbox[3] + pad)
        out = out.crop((x0, y0, x1, y1))

    if add_sticker_border:
        # Optional crisp white paper die-cut border around cutout
        border_px = max(8, int(min(out.size) * 0.02))
        padded = Image.new("RGBA", (out.width + border_px * 4, out.height + border_px * 4), (0, 0, 0, 0))
        padded.alpha_composite(out, (border_px * 2, border_px * 2))
        alpha_ch = padded.getchannel("A")
        dilated = alpha_ch.filter(ImageFilter.MaxFilter(border_px * 2 + 1))
        dilated = dilated.filter(ImageFilter.GaussianBlur(1.0))
        sticker = Image.new("RGBA", padded.size, (255, 253, 247, 0))
        sticker.paste((255, 253, 247, 255), (0, 0, padded.width, padded.height), dilated)
        sticker.alpha_composite(padded)
        out = sticker
        bbox2 = out.getbbox()
        if bbox2:
            out = out.crop(bbox2)

    return out

def generate_cutout_image(prompt: str, output_png: str | Path, style_prompt: str = DEFAULT_STYLE_PROMPT, sticker_border: bool = False) -> Path:
    """Generate a single transparent 3D papercraft cutout PNG via Google AI Studio."""
    from google import genai
    from google.genai import types

    api_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
    if not api_key:
        raise RuntimeError("Missing GEMINI_API_KEY or GOOGLE_API_KEY for scene art generation.")

    client = genai.Client()
    full_prompt = f"{prompt.strip()} {style_prompt.strip()}"
    models_to_try = ["gemini-3.1-flash-image", "gemini-2.5-flash-image"]

    output_png = Path(output_png)
    output_png.parent.mkdir(parents=True, exist_ok=True)

    last_err = None
    for model_name in models_to_try:
        try:
            print(f"🎨 [Scene Art] Generating with {model_name}: '{prompt[:60]}...'")
            try:
                cfg = types.GenerateContentConfig(image_config=types.ImageConfig(aspect_ratio="1:1"))
                res = client.models.generate_content(model=model_name, contents=full_prompt, config=cfg)
            except Exception:
                res = client.models.generate_content(model=model_name, contents=full_prompt)
            for part in res.candidates[0].content.parts:
                if part.inline_data:
                    raw = Image.open(io.BytesIO(part.inline_data.data)).convert("RGBA")
                    cutout = remove_background_cutout(raw, add_sticker_border=sticker_border)
                    # Normalize max dimension to 1024px for crisp HD rendering
                    cutout.thumbnail((1024, 1024), Image.Resampling.LANCZOS)
                    cutout.save(output_png, "PNG")
                    print(f"✨ [Scene Art] Saved transparent cutout ({cutout.size}) -> {output_png}")
                    return output_png
        except Exception as e:
            last_err = e
            print(f"⚠️ [Scene Art] {model_name} error: {e}")

    raise RuntimeError(f"Failed to generate scene art: {last_err}")

def generate_storyboard_art(storyboard_path: str | Path, force: bool = False, sticker_border: bool = False) -> Path:
    """Generate bespoke transparent PNG cutouts for all shots in a storyboard JSON."""
    sb_path = Path(storyboard_path)
    sb = json.loads(sb_path.read_text(encoding="utf-8-sig"))
    shots = sb.get("shots", [])
    art_dir = sb_path.parent / "art"
    art_dir.mkdir(parents=True, exist_ok=True)

    changed = False
    for i, shot in enumerate(shots):
        rel_art = shot.get("art") or f"art/scene_{i + 1}.png"
        target = (sb_path.parent / rel_art).resolve()
        if target.is_file() and not force:
            print(f"⏭️ [Scene Art] Shot {i + 1} already exists: {rel_art}")
            if not shot.get("art"):
                shot["art"] = rel_art
                changed = True
            continue

        scene_prompt = shot.get("art_prompt")
        if not scene_prompt:
            headline = shot.get("headline", "")
            caption = shot.get("caption", "")
            motif = shot.get("motif", "")
            scene_prompt = (
                f"Conceptual 3D papercraft claymation illustration representing: {headline} - {caption}. "
                f"Theme motif: {motif}."
            )

        generate_cutout_image(scene_prompt, target, sticker_border=sticker_border)
        shot["art"] = rel_art
        changed = True

    if changed:
        sb_path.write_text(json.dumps(sb, ensure_ascii=False, indent=2), encoding="utf-8")
        print(f"💾 Updated storyboard with bespoke art paths: {sb_path}")

    return sb_path

def main():
    parser = argparse.ArgumentParser(description="Generate 3D papercraft/claymation transparent PNG cutouts for storyboard shots.")
    parser.add_argument("--storyboard", help="Path to storyboard.json")
    parser.add_argument("--prompt", help="Single image prompt (standalone mode)")
    parser.add_argument("--out", default="art/cutout.png", help="Output PNG path for standalone mode")
    parser.add_argument("--force", action="store_true", help="Regenerate existing art files")
    parser.add_argument("--sticker-border", action="store_true", help="Add a crisp white paper die-cut border")
    args = parser.parse_args()

    if args.storyboard:
        generate_storyboard_art(args.storyboard, force=args.force, sticker_border=args.sticker_border)
    elif args.prompt:
        generate_cutout_image(args.prompt, args.out, sticker_border=args.sticker_border)
    else:
        parser.print_help()

if __name__ == "__main__":
    main()
