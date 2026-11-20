---
name: thai-free-collage-director
description: Make Thai 9:16 cartoon paper-collage motion-graphics MP4 videos from short stories and prompts for TikTok, YouTube Shorts, and educational explainers in Google Antigravity, with editable scene JSON, Thai captions, original vector characters, studio-grade Google AI Studio TTS Thai voiceover (Gemini 3.8 Flash TTS / Puck / Aoede), Edge TTS fallback, and offline instrumental background music. Use when asked for Thai cartoon shorts, motion graphics, story-to-video, collage animation, or animated explainers with voiceover.
---

# Thai Free Collage Director

Produce a finished animation rather than a storyboard-only response. This tool generates 9:16 vertical 2D paper-collage motion graphics using Python/Pillow + FFmpeg + Google AI Studio TTS (Gemini 3.8 Flash TTS via `GEMINI_API_KEY`) with an automatic offline Edge TTS fallback.

## 1. Prepare

Read `README_TH.md`, `references/storyboard-schema.md`, and `references/google-ai-studio-tts-guide.md` if needed. Before rendering:

- Check `python --version`, `python -c "from PIL import Image;print('Pillow OK')"`, `ffmpeg -version`, and `ffprobe -version`.
- Check Thai text font (automatically detects `C:\Windows\Fonts\tahomabd.ttf` on Windows).
- Check `GEMINI_API_KEY` (or `GOOGLE_API_KEY`) for Google AI Studio TTS narration (`Puck` for male, `Aoede` for female). If unavailable, it falls back to Edge TTS automatically.

## 2. Convert story to directed shots

Given a Thai story, **use agent reasoning** to produce a faithful `production/storyboard.json` of 4–8 short shots rather than relying only on naive sentence splitting. Preserve the user's factual claims; for education verify factual claims with reliable sources when tools permit. Aim for 30–60s or user-requested duration. Use hook → question/problem → attempt → insight → takeaway.

Each shot in `storyboard.json`:
- `headline`: concise catchy punchline (1-5 words)
- `badge`: (optional) high-contrast floating stat pill (e.g., `"1 ใน 10 คนไทย"`, `"40% ไม่รู้ตัว"`)
- `caption`: subtitle shown on screen
- `narration`: (optional) full spoken voiceover script for this shot; if omitted, `caption` will be spoken
- `voice_style`: (optional) emotional tone directive for Google AI Studio TTS
- `art_prompt`: detailed English visual description for 3D papercraft/claymation cutout art generation (always craft rich scene-specific prompts matching the topic rather than relying on fallback motifs!)
- `art`: relative path to custom transparent PNG/WebP illustration (e.g. `art/scene_1.png`), automatically populated when running `scripts/generate_scene_art.py` or `--art auto`
- `motif`: fallback icon (`student`, `teacher`, `robot`, `ai`, `book`, `bulb`, `school`, `plant`, `earth`, `phone`, `recycle`, `heart`)

See JSON structure in `references/storyboard-schema.md`. Save source story at `production/story.txt`.

## 3. Generate Bespoke 3D Papercraft Scene Art & Render

**Always generate bespoke 3D papercraft/claymation cutouts (`--art auto` or `scripts/generate_scene_art.py`) for storytelling and health/educational topics** rather than relying on primitive vector shapes.

From inside the skill directory, validate, generate cutouts, and render:

```powershell
python scripts/validate.py production/storyboard.json

# Generate bespoke 3D papercraft transparent PNG cutouts for all shots
python scripts/generate_scene_art.py --storyboard production/storyboard.json --sticker-border

# Fast Preview with Google AI Studio Thai TTS + Procedural BGM (540x960, 12fps)
python scripts/render.py --storyboard production/storyboard.json --output out/demo.mp4 --preview --art auto --tts auto --voice Puck --music auto

# Publication High-Resolution (1080x1920, 24fps) with Ken Burns zoom, Spring physics & Parallax
python scripts/render.py --storyboard production/storyboard.json --output out/final.mp4 --width 1080 --fps 24 --art auto --tts auto --voice Puck --music auto
```

### Voice options:
- `--voice Puck`: Lively, friendly male narrator (default)
- `--voice Aoede`: Warm, breezy, comforting female narrator
- `--voice Zephyr`: Bright, curious educational narrator
- `--voice Kore`: Calm, reflective, stoic narrator
- `--voice Fenrir`: Energetic, dynamic narrator
- `--audio path/to/voice.wav`: Optional custom user-recorded audio file instead of TTS

The `--sync-duration` flag (default True when `--tts` is used) dynamically measures the spoken duration of each shot via `ffprobe` and pads/syncs each scene's visual duration to match speech, ensuring audio and visual scene cuts align.

Render a low-resolution preview first, examine contact sheet, repair text overflow and composition, then render full size. Export MP4, SRT, contact sheet and QA JSON. Confirm ffprobe output, the actual file, dimensions and duration.

## 4. Production quality and limitations

- The bundled renderer animates paper textures, sticker entrance zoom, gentle idle tilt/bobbing, kinetic headline cards, floating decorative stars/halftones, and seamless crossfades.
- For custom cartoon characters, place transparent PNGs in `art/` and reference them with `"art": "art/character.png"`.
- Narration is mastered at volume `1.0` while background music is balanced at volume `0.24`.
- Never claim audio exists without generating it. Always verify with `ffprobe`.

## 5. Handoff

Return exact file links/paths for the produced MP4, source storyboard, SRT, and contact sheet. Include the real render command.
