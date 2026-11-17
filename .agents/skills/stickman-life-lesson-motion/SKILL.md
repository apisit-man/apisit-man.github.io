---
name: stickman-life-lesson-motion
version: 3.0.0
description: Automated generator for viral 9:16 minimalist 2D stickman philosophical animations with mathematically synchronized clock kinematics, Thai typography, procedural Web Audio SFX (clock ticks, gear strain, chime, lo-fi pads), Google AI Studio TTS integration, and turnkey HTML5 Canvas MP4/WebM video studio.
author: Animation & Markdown Architecture Expert
triggers:
  - "สร้างวิดีโอก้างปลา"
  - "ทำคลิปมินิมอลก้างปลา"
  - "stickman life lesson"
  - "สร้างวิดีโอสไตล์เข็มนาฬิกา"
  - "stickman clock motion"
---

# Stickman vs Clock Motion Studio (v3.0.0)

Automated generator for viral, high-retention 9:16 vertical philosophical stickman animations based on the signature **"Stickman vs. The Clock Hand"** (*"ก้างปลากับเข็มนาฬิกา"*) visual metaphor.

---

## 1. Role & Core Objective

You are a **Senior 2D Minimalist Animator, Creative Director, and Creative Technologist**. When the user provides a short prompt or life topic (e.g., *"เวลาเดินไปข้างหน้า"*, *"การแบกความคาดหวัง"*, *"ไม่ต้องแข่งกับใคร"*), you must immediately generate a complete, self-contained **3-Part Production Package**:

1. **6-Beat Thai Storyboard & Timing Table** (Synchronized to the 38-second clock rotation).
2. **Google AI Studio TTS Prompt & Script** (Using `gemini-2.5-flash-preview-tts` / Gemini Voice with `Puck`, `Charon`, or `Aoede`).
3. **Turnkey HTML5 Studio Engine** (Or customized adaptation of `templates/clock-canvas-engine.html` with real-time Web Audio SFX and 1-click 1080×1920 MP4/WebM export).

---

## 2. Visual & Kinematic Bible

### 2.1 Resolution & Coordinate Space
* **Format:** Vertical 9:16 (`1080 x 1920` logical coordinate space).
* **Clock Geometry:** Center $\mathbf{C} = (540, 1060)$, Dial Radius $R = 380\text{px}$, Hand Length $L = 340\text{px}$.
* **Frame Rate:** Locked 60 FPS using `requestAnimationFrame` with delta-time ($\Delta t$) normalization.

### 2.2 Mathematical Clock Kinematics & Stickman Articulation

The hand angle $\theta(t)$ rotates clockwise:
$$\theta(t) = \frac{2\pi t}{38.0}$$

Any point along the hand at distance $r$ is:
$$\mathbf{P}(r, t) = \begin{bmatrix} 540 + r \sin\theta(t) \\ 1060 - r \cos\theta(t) \end{bmatrix}$$

The stickman limbs and torso are procedurally articulated to prevent detachment:
* **Beat 1 ($0.0\text{s} - 6.0\text{s}$ - ฝืนต้านเวลา):** Feet anchored on the dial rim at $\theta_{\text{rim}} = \theta(t) + 0.28\text{ rad}$ with high-frequency micro-jitter ($\pm 1.5\text{px}$). Arms pressing against the hand at $r \approx 0.72 L$. Emits friction dust particles.
* **Beat 2 ($6.0\text{s} - 16.0\text{s}$ - ปล่อยวาง/นั่งลงบนเข็ม):** Stickman ceases resistance, climbs onto the clock hand, and sits comfortably at $r \approx 0.55 L$. Gentle breathing oscillation $\sin(3t)$ applied to the chest.
* **Beat 3 ($16.0\text{s} - 22.0\text{s}$ - โหนแกว่งตามแรงโน้มถ่วง):** As the hand sweeps downwards past 6 o'clock, stickman hangs by two hands from the hand tip. Legs swing with damped harmonic motion $\phi(t) = \phi_0 \cos(4t)$.
* **Beat 4 ($22.0\text{s} - 29.0\text{s}$ - พลาดพลั้งสะดุดต้านอีกครั้ง):** Hand slips; stickman drops to the bottom rim ($Y \approx 1060 + R$), instinctively trying to push back as the hand approaches.
* **Beat 5 ($29.0\text{s} - 34.0\text{s}$ - มีสติและก้าวกลับขึ้นใหม่):** Stickman pauses, steps back onto the rising hand ($8 \rightarrow 11$ o'clock). Background color interpolates smoothly to warm golden cream.
* **Beat 6 ($34.0\text{s} - 38.0\text{s}$ - ลูปนิรันดร์):** Relaxing on top of the hand as it sweeps to 12 o'clock, smoothly looping back to Beat 1.

---

## 3. Dynamic Color Psychology

| Emotional State | Background Gradient (Top $\rightarrow$ Bottom) | Stickman & Dial Color | Highlighted Word Pill |
| :--- | :--- | :--- | :--- |
| **Beat 1 & 4 (Struggle / Dark Green)** | `#17261E` $\rightarrow$ `#0E1813` | `#F8FAFC` (Clean White) | `#4ADE80` (Muted Leaf Green) |
| **Beat 2 & 3 (Acceptance / Warm Sage)** | `#F4F2EA` $\rightarrow$ `#C5D6C8` | `#0F172A` (Slate Navy) | `#15803D` (Deep Green) |
| **Beat 5 & 6 (Resolution / Golden Cream)** | `#F7F5EE` $\rightarrow$ `#E2D4BA` | `#0F172A` (Slate Navy) | `#166534` (Emerald Green) |

---

## 4. Built-in Procedural Web Audio Foley (Zero MP3 Dependencies)

All sound effects are synthesized via native `AudioContext`:
1. **Clock Tick-Tock:** Dual resonant bandpass filter ($1900\text{Hz}$ / $2500\text{Hz}$, $Q=14$) triggered every 1.0 second.
2. **Pushing Friction / Tension:** Bandpass filtered white noise ($600\text{Hz}$, $Q=4.0$) triggering when pushing during Beats 1 & 4.
3. **Awakening Bell / Chime:** Triple harmonic sine wave ($880\text{Hz}, 1320\text{Hz}, 1760\text{Hz}$) decaying exponentially over $1.6\text{s}$ when entering Beat 2 and Beat 5.
4. **Lo-Fi Ambient Pad:** Polyphonic sine/triangle chord cluster (Fmaj7 $\rightarrow$ Cmaj7) crossfading under the dialogue.

---

## 5. Turnkey Production Templates & References

* **Interactive Studio File:** [clock-canvas-engine.html](file:///C:/Users/atong/.gemini/config/skills/stickman-life-lesson-motion/templates/clock-canvas-engine.html)
  * Real-time 60 FPS Canvas with live controls.
  * Timeline scrubbing and script presets.
  * One-click **"⏺ Record MP4/WebM"** button with automated download.
* **Kinematics & Web Audio Reference:** [clock-kinematics-and-audio.md](file:///C:/Users/atong/.gemini/config/skills/stickman-life-lesson-motion/references/clock-kinematics-and-audio.md)
* **Curated Script Catalog:** [philosophical-script-catalog.md](file:///C:/Users/atong/.gemini/config/skills/stickman-life-lesson-motion/references/philosophical-script-catalog.md)

---

## 6. Required Generation Output

Whenever the user prompts for a new stickman animation, output:
1. **38-Second 6-Beat Storyboard Table:** Timestamps, On-screen Thai text with highlight pill, spoken voiceover, kinematics state.
2. **Google AI Studio TTS Script:** Ready-to-copy prompt with voice inflection cues and timing.
3. **Canvas Engine Customization Guide:** Exact changes to inject the new script into `clock-canvas-engine.html`.
