---
name: thai-free-collage-director
description: Make Thai 9:16 3D papercraft & modern paper-collage motion-graphics MP4 videos from researched stories and prompts for TikTok, YouTube Shorts, and educational explainers, featuring Kanit modern Thai typography with inline keyword highlights, bespoke 3D papercraft/claymation cutouts, Single-Pass consistent Google AI Studio TTS voiceover (Gemini 3.8 Flash TTS / Puck / Zephyr / Aoede) with Silence-Valley sync, Edge TTS fallback, source citation tags, and offline BGM. Use when asked for Thai shorts, viral explainers, motion graphics, story-to-video, or collage animation with voiceover.
---

# Thai Free Collage Director

Produce a finished, studio-grade 9:16 animation rather than a storyboard-only response. This engine combines **Modern Paper Collage + Bespoke 3D Papercraft/Claymation Cutouts**, **`Kanit` Modern Thai Typography**, **Single-Pass Continuous Google AI Studio TTS** (with Numpy Silence-Valley Alignment & Edge TTS fallback), and **FFmpeg** mastering.

## 1. Prepare & Research

Read `README_TH.md`, `references/storyboard-schema.md`, `references/production-playbook.md`, and `references/google-ai-studio-tts-guide.md` as needed.

- Verify `python --version`, `ffmpeg -version`, `ffprobe -version`, and `GEMINI_API_KEY`.
- **API Key Security:** Keep `GEMINI_API_KEY` strictly in local PC environment variables; never hardcode or commit keys into `storyboard.json`, scripts, outputs, or GitHub repos.
- Fonts: Auto-prioritizes `Kanit-Bold.ttf` & `Kanit-Medium.ttf` (`%LOCALAPPDATA%\Microsoft\Windows\Fonts`), falling back to `Leelawadee UI`, `Noto Sans Thai`, or `Tahoma`.
- **Fact-Check Topics:** For health, science, finance, or social topics, always research verified facts/reports first (`search_web`) and record citations in `source`.

## 2. Author Storyboard & Narration

Build `production/storyboard.json` (typically 6 shots, ~35–55s) following **Hook → Concept → Mechanism/Comparison → Consequence → Actionable Rule → Empowering Takeaway**:

- `headline`: concise punchline (~18–26 chars so it never leaves orphan words); highlight power words/numbers with `**keyword**`
- `badge`: floating 3D stat pill (e.g., `"คนไทยใช้มือถือ 6–8 ชม./วัน"`, `"เกณฑ์ WHO ไม่เกิน 6 ช้อนชา/วัน"`)
- `caption`: readable 2–3 line subtitle with `**keyword**` highlights
- `narration`: natural spoken Thai script — **spell out numbers, units, and English loanwords phonetically in Thai** (e.g., `"หนึ่งร้อยยี่สิบหก มิลลิกรัมต่อเดซิลิตร"`, `"เบรนรอต"`, `"ดีปโฟกัส"`) so TTS pronounces everything smoothly
- `source`: short factual citation shown in footer pill (e.g., `"ที่มา: กรมสุขภาพจิต & สสส."`)
- `art_prompt`: detailed English prompt for ONE standalone 1:1 3D papercraft/claymation diorama matching contemporary context, explicitly specifying `zero text, zero letters, blank shirts/cups/screens`

See `references/storyboard-schema.md` and `references/production-playbook.md`. Save source story at `production/story.txt`.

## 3. Generate 3D Papercraft Cutouts & Inspect Visually

Generate bespoke 1:1 transparent PNG cutouts for every shot:

```powershell
python scripts/validate.py production/storyboard.json
python scripts/generate_scene_art.py --storyboard production/storyboard.json --sticker-border
```

**Mandatory Visual QA:** Inspect EVERY generated `production/art/scene_*.png` via `read_file` before rendering video. If any image shows duplicate side-by-side panels or stray AI text, refine its `art_prompt`, delete that PNG, and rerun `generate_scene_art.py`.

## 4. Render Full HD with Single-Speaker Voice Sync

`render.py` uses **Single-Pass Continuous Narration** (`single_pass=True`) by default — synthesizing the entire script in ONE API call to guarantee 100% identical speaker identity, then snapping scene cuts and `.srt` subtitles to natural breath silence valleys via Numpy RMS energy analysis:

```powershell
# High-Resolution Render (1080x1920, 24fps) with Ken Burns zoom, Spring physics, Kanit highlights & Lo-Fi BGM
python scripts/render.py --storyboard production/storyboard.json --output out/final.mp4 --width 1080 --fps 24 --tts auto --voice Zephyr --music auto --style assets/style-profile.json
```

### Voice Selection Guide (`--voice`):
- `Puck`: Lively, energetic, dramatic male (viral hooks, warnings, lifestyle)
- `Zephyr`: Bright, crisp, clear explainer (science, health literacy, tech/AI)
- `Aoede`: Warm, empathetic female (education, stories, parenting)
- `Kore`: Calm, firm, reflective (philosophy, finance)
- `Fenrir`: High-energy dynamic narrator

If you tweak text/captions after TTS is already generated, re-render cleanly with `--audio out/final-narration.wav` (using the aligned shot durations) to preserve the exact voiceover track in ~15 seconds.

## 5. Final QA & Handoff

1. Inspect `out/<name>-contact-sheet.jpg` AND extract frames from later shots (Shots 5–6) via `ffmpeg` to confirm zero text overflow, balanced line breaks, centered badges, and visible source citations.
2. Confirm `out/<name>.qa.json` (`1080x1920`, `24/1 fps`, `h264 + aac`, exact duration) and clean `.srt` captions.
3. Deliver clickable links to the `.mp4`, `.srt`, `.wav` narration, contact sheet, and `storyboard.json`.
