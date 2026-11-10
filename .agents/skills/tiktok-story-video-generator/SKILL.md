---
name: tiktok-story-video-generator
description: Generates ready-to-post 9:16 vertical TikTok/Shorts/Reels cartoon story videos complete with storyboard breakdown, consistent character visuals, high-quality Thai neural voiceover (TTS), background music, animated Ken Burns zoom, centered burned-in captions, and post metadata from a single user topic.
---

# Professional TikTok Cartoon Story Video Generator

Transform any user topic (e.g. self-improvement, procrastination, study tips, burnout, financial habits) into a fully assembled, verified, ready-to-post **9:16 vertical cartoon video (`.mp4`)** featuring:
* **Studio-Grade Voiceover:** Google AI Studio TTS (`gemini-3.1-flash-tts-preview` with `Puck` / `Aoede` voice) for natural, expressive human prosody with automatic Edge TTS fallback.
* **Professional Cartoon Graphics:** Bubbly comic speech cards, colored speaker badges (`[บ๊อบบี้]`, `[คุณมาร์ช]`, `[ข้อคิด]`), 3D cartoon drop shadows, and decorative sparkle/stress accents.
* **Cinematic Animation:** Smooth Ken Burns slow zoom, Lo-Fi acoustic background music ducked at -20 dB, and strict TikTok UI safe zone margins.

---

## ⚡ The Full Production Pipeline

```
[User Topic] 
   ⬇️
1. Script & Storyboard (6 Cuts, ~30s: Hook ➔ Struggle ➔ Twist ➔ Empathy ➔ Action ➔ CTA)
   ⬇️
2. Character Consistency & Visual Prompts (Bobby & Mr. Marsh / 9:16 Pastel Flat Vector)
   ⬇️
3. Image Generation (Generate cut_1.png to cut_6.png via image-generator or composite)
   ⬇️
4. Google AI Studio TTS (Gemini 3.1 Flash TTS via Interactions API; fallback to Edge TTS)
   ⬇️
5. Background Audio (Ensure chill lo-fi acoustic track bgm.mp3 exists or generate procedurally)
   ⬇️
6. Cartoon Video Assembly (render_video.py with cartoon_graphics.py overlays + amix BGM)
   ⬇️
[Final Deliverable: .mp4 video file + TikTok caption + viral hashtags]
```

---

## 1. 🎬 Storyboard & 6-Cut Narrative Structure

Every video strictly follows the **6-Cut High-Retention Framework** (approx. 4.5–6.0s per cut, 28–38s total):

| Cut | Timestamp | Beat | Objective | Badge Type |
| :--- | :--- | :--- | :--- | :--- |
| **Cut 1** | `00:00 - 00:06` | **Hook** | Hit the viewer's exact secret habit or guilt with an exaggerated relatable scene. | `alert` (⚠️ อาการของคนทำงาน) |
| **Cut 2** | `00:06 - 00:12` | **Struggle** | The inevitable panic or comedic consequence of the habit. | `alert` (🏃 วิ่งวุ่นทั้งวัน) |
| **Cut 3** | `00:12 - 00:18` | **Twist / Denial** | The funny coping mechanism (watching cat videos, scrolling phone, tidying room). | `bobby` (😅 สภาพตอนเช็คงาน) |
| **Cut 4** | `00:18 - 00:24` | **Empathy & Re-framing** | Companion (Mr. Marsh) appears: Reassure the viewer ("You're not lazy, it's just overwhelmed"). | `marsh` (💡 คุณมาร์ชเตือนสติ) |
| **Cut 5** | `00:24 - 00:30` | **Actionable Micro-Shift** | Give 1 concrete, ultra-low barrier action (e.g. 2-minute rule, 30-minute block). | `focus` (🎯 กฎ 30 นาทีแรก) |
| **Cut 6** | `00:30 - 00:36` | **Outro & CTA** | Warm conclusion, characters wave/smile, viral question asking viewers to comment. | `tip` (❤️ ชนะใจตัวเอง) |

---

## 2. 🎨 Character Consistency & Visual Prompts

Maintain visual identity across all 6 scene prompts using the character bible in `references/character-bible.md`:
* **Bobby:** `chibi boy Bobby with round head and messy dark brown hair, wearing oversized cozy mint-green hoodie, cute 2D minimal flat pastel aesthetic, clean soft line art, warm ambient lighting --ar 9:16`
* **Mr. Marsh:** `small cute floating white marshmallow creature Mr. Marsh with tiny dot eyes and warm blushing cheeks, comforting and empathetic vibe, pastel color palette, soft ambient glow --ar 9:16`

---

## 3. 🎙️ Google AI Studio TTS Generation (`generate_tts.py`)

Run voice synthesis with Google AI Studio's Gemini TTS model:
* **Engine:** `gemini-3.1-flash-tts-preview` via `client.interactions.create(..., response_format={"type": "audio"}, generation_config={"speech_config": [{"voice": "Puck"}]})`.
* **Voices:**
  * `Puck`: Upbeat, playful, expressive cartoon storyteller (Recommended).
  * `Aoede`: Warm, breezy, gentle feminine narrator.
* **Automatic Fallback:** If API key is absent or quota is limited, automatically switches to `edge-tts` (`th-TH-NiwatNeural` / `th-TH-PremwadeeNeural`).

---

## 4. 🎨 Cartoon Graphic Overlay Engine (`cartoon_graphics.py`)

Subtitles are rendered as high-DPI transparent cartoon graphic overlays:
* **Bubbly Speech Bubble:** Warm cream fill `#FFFEFA` with a `4px` dark slate cel-shading outline (`#1E293B`) and soft drop shadow.
* **Speaker / Topic Badges:** Solid colored capsules with white bold text docked to the top edge of the speech bubble.
* **Comic Accents:** Episode tags and floating glowing stars (`✨`) on positive breakthrough cuts.
* **Safe Zone:** Card top docked at `y = 1380`, keeping dialogue completely clear of TikTok bottom buttons and description text.

---

## 5. ⚡ Automated Assembly & Rendering (`render_video.py`)

Run the assembly engine:
```powershell
python <skill_path>/scripts/render_video.py
```
The engine automatically:
1. Generates the custom cartoon graphic overlay for each cut.
2. Measures precise audio length for each cut dynamically using `ffprobe` and synchronizes the scene frames to match speech perfectly.
3. Applies smooth Ken Burns slow zoom (`zoompan` 1.0 ➔ 1.08).
4. Composites the cartoon overlay onto the animated background via FFmpeg filter graph.
5. Concatenates all cuts and mixes ducked background music with soft end fade.
6. Exports `tiktok_video_final.mp4` ready for immediate upload.

---

## 6. 📱 Social Metadata Delivery

Every generated video response provides:
1. Clickable file link to the rendered video: `tiktok_video_final.mp4`.
2. A viral Thai TikTok caption with emotional hook.
3. High-engagement hashtags.
4. An interactive CTA question to drive comments.
