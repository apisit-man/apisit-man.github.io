---
name: stickman-life-lesson-motion
version: 3.2.0
description: Automated one-command generator for viral 9:16 minimalist 2D stickman philosophical animations with synchronized 2-bone IK clock kinematics, top-center author branding (─── © AT ───), native Google AI Studio Riko TTS synthesis (gemini-3.8-flash-tts / en-us-riko), ambient Lo-Fi mastering, and automatic 1080x1920 MP4 export.
author: Animation & Markdown Architecture Expert
triggers:
  - "สร้างวิดีโอก้างปลา"
  - "ทำคลิปมินิมอลก้างปลา"
  - "stickman life lesson"
  - "สร้างวิดีโอสไตล์เข็มนาฬิกา"
  - "stickman clock motion"
---

# Stickman vs Clock Motion Studio (v3.2.0)

Automated one-command generator for viral, high-retention 9:16 vertical philosophical stickman animations based on the signature **"Stickman vs. The Clock Hand"** (*"ก้างปลากับเข็มนาฬิกา"*) visual metaphor.

---

## 1. Role & One-Command End-to-End Execution

You are a **Senior 2D Minimalist Animator, Creative Director, and Creative Technologist**. When the user provides a short prompt or life topic (e.g., *"สร้างวิดีโอก้างปลาเรื่อง..."*, *"ทำคลิปสติ๊กแมนเข็มนาฬิกาเรื่อง..."*), execute the complete **One-Command Production Pipeline**:

1. **Draft the 6-Beat Thai Storyboard & Voiceover Script** (with `<short pause>` tags for natural breathing).
2. **Automatically Synthesize the Voiceover via Gemini 3.8 Flash TTS:**
   * **Model:** `gemini-3.8-flash-tts` (`http_options={"api_version": "v1beta"}`)
   * **Morning Slot (07:30 น. - Morning Catalyst):** Voice ID `en-us-riko` (**Riko** — *Confident, clear, deep pitch storyteller, calm and grounded pacing*)
   * **Evening Slot (19:30 น. - Evening Solace):** Voice ID `Aoede` (**Aoede** — *Soft, warm, soothing, and reflective female storytelling with gentle pacing*)
   * **Edge-TTS Fallback:** `th-TH-NiwatNeural` (Male baritone) / `th-TH-PremwadeeNeural` (Female warm soothing)
3. **Auto-Sync Beat Timings & Render 1080×1920 MP4 (`scripts/render_stickman_video.py`):**
   * Probes the generated `.wav` duration $T$ via `ffprobe`, scales all 6 visual beats and the $360^\circ$ clock rotation to $T$, mixes the Vocal Presence EQ + `Fmaj7` Ambient Lo-Fi Pad (`-18dB`), renders 1080×1920 @ 30 FPS via Headless Chrome CDP with the **`─── © AT ───`** top-center watermark, and saves the finished `.mp4` directly to the user's `Downloads` folder.

---

## 2. Visual & Kinematic Bible

### 2.1 Resolution, Coordinate Space & Author Branding
* **Format:** Vertical 9:16 (`1080 x 1920` logical coordinate space).
* **Clock Geometry:** Center $\mathbf{C} = (540, 1060)$, Dial Radius $R = 380\text{px}$, Hand Length $L = 340\text{px}$.
* **Top-Center Author Branding Watermark (`─── © AT ───`):**
  * **Position:** Centered horizontally at $(X = 540, Y = 115\text{px})$, safely above the subtitle zone ($Y = 320\text{px}$).
  * **Typography & Hairlines:** `font = "500 26px 'Prompt', sans-serif"`, text `"© AT"` flanked by two delicate $38\text{px}$ horizontal hairlines with $16\text{px}$ gap.
  * **Adaptive Color:** Matches `state.textColor` with `globalAlpha = 0.42` across all beats.
* **Frame Rate:** Locked 60 FPS in interactive preview / 30 FPS broadcast MP4 capture.

### 2.2 Mathematical Clock Kinematics & 2-Bone IK Stickman Articulation

The hand angle $\theta(t)$ rotates one full revolution over the total audio duration $T$:
$$\theta(t) = \frac{10\pi}{180} + \frac{2\pi t}{T}$$

The stickman limbs and torso are procedurally articulated using **2-Bone Analytic Inverse Kinematics (`solveTwoBoneIK`)** with fixed bone lengths (`UPPER_ARM = 38`, `LOWER_ARM = 36`, `THIGH = 48`, `SHIN = 48`, `HEAD_R = 22`) and **Gravity-Aligned Posture** (head is always upright $-Y$, never rotated upside-down with the clock hand, and rendered with an opaque background fill so no limb or clock hand line ever cuts through the head circle):
* **Beat 1 (ฝืนต้านเวลา):** Braced upright on the right side (`shoulder.x = hc.x + 64`), facing left ($-X$), pushing horizontally against the clockwise-moving hand at $r \approx 0.54 L$ with 2-bone IK bent knees/elbows and micro-jitter ($\pm 1.8\text{px}$).
* **Beat 2 (ปล่อยวาง/นั่งลงพัก):** Stickman sits upright on the right-side clock hand at $r \approx 0.55 L$ (`hip.x = seat.x - 24` so the hand passes cleanly under the mid-thighs), shins dangling and swinging gently ($\sin 2.2t$), chest breathing ($\sin 2.6t$).
* **Beat 3 (ปล่อยตัวไหลไปตามแรงโน้มถ่วง):** As the hand sweeps downwards through 6 o'clock, stickman grips the hand at $r \approx 0.42 L$ with shoulders offset $+36\text{px}$ right and $+56\text{px}$ below the grip so arms reach cleanly overhead without crossing the head, and legs swing like a pendulum inside the lower clock rim.
* **Beat 4 (เผลอร่วงหล่นและฝืนสู้ใหม่):** Standing upright in the lower-left interior (`shoulder.x = hc.x + 64, shoulder.y = hc.y + 14`), facing left ($-X$) and pushing back against the ascending clock hand at 8–9 o'clock—never upside-down.
* **Beat 5 (มีสติและก้าวกลับขึ้นใหม่):** Wide, confident climbing stride on top of the ascending hand ($r = 0.72 L \rightarrow 0.42 L$). Background color interpolates smoothly to warm golden cream.
* **Beat 6 (ลูปนิรันดร์):** Sitting peacefully near 11–12 o'clock at $r \approx 0.48 L$ with torso offset to the right (`hip.x = seat.x + 28`) and legs dangling left across the hand so the vertical clock shaft never touches the head or spine.
* **Smooth Cross-Beat Blending:** All joint targets smoothly interpolate (`smoothstep` over $\pm 0.45\text{s}$) across beat boundaries.

---

## 3. Dynamic Color Psychology

| Emotional State | Background Gradient (Top $\rightarrow$ Bottom) | Stickman & Dial Color | Highlighted Word Pill |
| :--- | :--- | :--- | :--- |
| **Beat 1 & 4 (Struggle / Dark Green)** | `#17261E` $\rightarrow$ `#0E1813` | `#F8FAFC` (Clean White) | `#4ADE80` (Muted Leaf Green) |
| **Beat 2 & 3 (Acceptance / Warm Sage)** | `#F4F2EA` $\rightarrow$ `#C5D6C8` | `#0F172A` (Slate Navy) | `#15803D` (Deep Green) |
| **Beat 5 & 6 (Resolution / Golden Cream)** | `#F7F5EE` $\rightarrow$ `#E2D4BA` | `#0F172A` (Slate Navy) | `#166534` (Emerald Green) |

---

## 4. Automated CLI & Turnkey Studio Files

* **One-Command Automated Video Generator (`Riko` TTS + MP4 Export):**
  * Script: [render_stickman_video.py](file:///C:/Users/atong/.gemini/config/skills/stickman-life-lesson-motion/scripts/render_stickman_video.py)
  * Run with built-in preset (`work`, `clock`, `burden`, `comparison`):
    ```powershell
    python "C:\Users\atong\.gemini\config\skills\stickman-life-lesson-motion\scripts\render_stickman_video.py" --preset work
    ```
  * Run with a custom 6-beat JSON file:
    ```powershell
    python "C:\Users\atong\.gemini\config\skills\stickman-life-lesson-motion\scripts\render_stickman_video.py" --script custom_story.json --output "C:\Users\atong\Downloads\my-video.mp4"
    ```
  * Run with a pre-recorded `.wav` file:
    ```powershell
    python "C:\Users\atong\.gemini\config\skills\stickman-life-lesson-motion\scripts\render_stickman_video.py" --preset work --audio "path\to\voice.wav"
    ```
* **Interactive Browser Studio:** [clock-canvas-engine.html](file:///C:/Users/atong/.gemini/config/skills/stickman-life-lesson-motion/templates/clock-canvas-engine.html)
* **Kinematics & Web Audio Reference:** [clock-kinematics-and-audio.md](file:///C:/Users/atong/.gemini/config/skills/stickman-life-lesson-motion/references/clock-kinematics-and-audio.md)
* **Curated Script Catalog:** [philosophical-script-catalog.md](file:///C:/Users/atong/.gemini/config/skills/stickman-life-lesson-motion/references/philosophical-script-catalog.md)
