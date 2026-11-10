---
name: tiktok-story-video-generator
description: Generates ready-to-post 9:16 vertical TikTok/Shorts/Reels cartoon story videos complete with storyboard breakdown, consistent character visuals, high-quality Thai neural voiceover (TTS), background music, animated Ken Burns zoom, centered burned-in captions, and post metadata from a single user topic.
---

# TikTok Cartoon Story Video Generator

Transform any user topic (e.g. self-improvement, procrastination, study tips, burnout, financial habits) into a fully assembled, verified, ready-to-post **9:16 vertical video (`.mp4`)** with high-retention Thai storytelling, neural voiceover, background music, and TikTok-optimized captions.

---

## ⚡ The Production Pipeline (Single-Topic Workflow)

When the user asks for a video on **one topic**, follow this end-to-end execution loop:

```
[User Topic] 
   ⬇️
1. Script & Storyboard (6 Cuts, ~30s: Hook ➔ Struggle ➔ Twist ➔ Empathy ➔ Action ➔ CTA)
   ⬇️
2. Character Consistency & Visual Prompts (Bobby & Mr. Marsh / 9:16 Pastel Flat Vector)
   ⬇️
3. Image Generation (Generate cut_1.png to cut_6.png via image-generator or composite)
   ⬇️
4. Neural Voiceover TTS (Generate audio_01.mp3 to audio_06.mp3 via edge-tts th-TH-NiwatNeural)
   ⬇️
5. Background Audio (Ensure chill lo-fi acoustic track bgm.mp3 exists or generate procedurally)
   ⬇️
6. Video Assembly (Execute render_video.py: Ken Burns zoom + Thai drawtext subtitles + amix BGM)
   ⬇️
[Final Deliverable: .mp4 video file + TikTok caption + viral hashtags]
```

---

## 1. 🎬 Storyboard & 6-Cut Narrative Structure

Every video must strictly follow the **6-Cut High-Retention Framework** (approx. 4.5–5.5s per cut, 28–34s total):

| Cut | Timestamp | Beat | Objective |
| :--- | :--- | :--- | :--- |
| **Cut 1** | `00:00 - 00:05` | **Hook** | Hit the viewer's exact secret habit or guilt with an exaggerated relatable scene. |
| **Cut 2** | `00:05 - 00:10` | **Struggle** | The inevitable panic or comedic consequence of the habit. |
| **Cut 3** | `00:10 - 00:15` | **Twist / Denial** | The funny coping mechanism (watching cat videos, scrolling phone, tidying room). |
| **Cut 4** | `00:15 - 00:20` | **Empathy & Re-framing** | Companion (Mr. Marsh) appears: Reassure the viewer ("You're not lazy, it's just overwhelmed"). |
| **Cut 5** | `00:20 - 00:25` | **Actionable Micro-Shift** | Give 1 concrete, ultra-low barrier action (e.g. 2-minute rule, 1 sentence, 1 glass of water). |
| **Cut 6** | `00:25 - 00:30` | **Outro & CTA** | Warm conclusion, characters wave/smile, viral question asking viewers to comment. |

---

## 2. 🎨 Character Consistency & Image Generation

Maintain visual identity across all 6 scene prompts using the character bible in `references/character-bible.md`:
* **Bobby:** `chibi boy Bobby with round head and messy dark brown hair, wearing oversized cozy mint-green hoodie, cute 2D minimal flat pastel aesthetic, clean soft line art, warm ambient lighting --ar 9:16`
* **Mr. Marsh:** `small cute floating white marshmallow creature Mr. Marsh with tiny dot eyes and warm blushing cheeks, comforting and empathetic vibe, pastel color palette, soft ambient glow --ar 9:16`

### Generating the Images:
* Use the subagent `image-generator` or available image creation tools to generate `cut_1.png` through `cut_6.png` in the project directory.
* Target format: `1080x1920` (or `9:16` ratio).

---

## 3. 🎙️ High-Quality Thai Neural TTS Generation

Use the bundled script in `scripts/generate_tts.py` or run `edge_tts` directly:
* **Voice Profiles:**
  * Male: `th-TH-NiwatNeural` (Default, warm, friendly, positive)
  * Female: `th-TH-PremwadeeNeural` (Alternative)
* **Speed:** `rate="+10%"` (keeps dialogue punchy and dynamic, fitting ~4–5 seconds per cut).

Example execution via Python:
```python
from generate_tts import generate_single_audio
await generate_single_audio("ข้อความบทพากย์ภาษาไทย...", "audio_01.mp3", rate="+10%")
```

---

## 4. 🎵 Background Music (BGM)

* Style: *Lo-Fi Acoustic Chill Hop* / Gentle piano ambient pad.
* If a custom `bgm.mp3` is not present in the folder, automatically invoke:
  ```powershell
  python <skill_path>/scripts/generate_lofi_bgm.py
  ```
  This creates a soothing major-7th ambient pad with soft warmth in `0.5 seconds`.
* In the final mix, the BGM volume is ducked to `-20 dB` (`volume=0.10`) so spoken dialogue is crystal clear.

---

## 5. ⚡ Automated Assembly & Rendering (`render_video.py`)

Run the assembly engine located at `<skill_path>/scripts/render_video.py`.
The engine automatically:
1. Detects Windows Thai fonts (`LeelawUI.ttf`, `tahomabd.ttf`, `tahoma.ttf`) so subtitles never render with broken vowels or missing glyphs.
2. Measures precise audio length for each cut dynamically using `ffprobe` and synchronizes the scene frames to match speech perfectly.
3. Applies smooth Ken Burns slow zoom (`zoompan` 1.0 ➔ 1.08).
4. Centers high-contrast subtitles in the TikTok safe zone (`y = h - th - 320`) with a semi-transparent dark pill background (`box=1:boxcolor=black@0.55:boxborderw=20`).
5. Concatenates all cuts and mixes ducked background music with soft end fade.
6. Exports `tiktok_video_final.mp4` ready for immediate upload.

---

## 6. 📱 Social Metadata Delivery

Every generated video response must provide:
1. The path to the rendered video: `tiktok_video_final.mp4`.
2. A viral Thai TikTok caption with emotional hook.
3. High-engagement hashtags (e.g. `#พัฒนาตัวเอง #ฮีลใจ #การ์ตูนสั้น #บ๊อบบี้กับมาร์ช`).
4. An interactive CTA question to drive comments (e.g. *"ใครเป็นแบบนี้บ้าง เมนต์สารภาพมาด้านล่างเลย! 👇"*).
