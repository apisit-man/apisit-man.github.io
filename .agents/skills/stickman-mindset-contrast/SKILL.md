---
name: stickman-mindset-contrast
description: Create viral 9:16 split-screen stickman mindset contrast animations (inspired by @the_stickman_mindset). Features top-vs-bottom visual storytelling (e.g. "Working for Money" vs. "Building Assets"), warm watercolor sketchbook aesthetics, procedural Web Audio foley SFX (creak, crash, water splash, continuous passive stream), and instant Canvas video export. Use whenever the user asks to create stickman mindset videos, split-screen contrast animations, "Working for Money vs Building Assets" videos, top-and-bottom comparison clips, or viral financial/life-philosophy Shorts/Reels.
---

# Stickman Mindset Split-Screen Contrast Engine

Create viral, high-converting 9:16 vertical split-screen stickman animations following the signature **`@the_stickman_mindset`** visual story format.

```
+------------------------------------------+
|  [ Working for Money ] (Red Marker Pill)  |
|                                          |
|      (Tired Stickman carrying 9-to-5     |
|       buckets -> Trips, Crashes, Spills) |
+==========================================+  <- Hand-drawn Divider (Y = 960)
|  [ Building Assets ] (Green Marker Pill)  |
|                                          |
|   (Stickman reclined reading a book,     |
|    pipe continuously fills water barrel) |
+------------------------------------------+
```

---

## 1. Visual & Anatomical Standards

### 1.1 Resolution & Split Geometry
* **Format**: Vertical 9:16 (`1080 x 1920` logical canvas).
* **Top Half ($Y \in [0, 960]$)**: The struggle, active labor, burnout, or liability mindset.
* **Dividing Line ($Y = 960$)**: Hand-drawn charcoal ink line (`#222222`, width 3.5–4px).
* **Bottom Half ($Y \in [960, 1920]$)**: The asset, automated system, passive flow, or freedom mindset.

### 1.2 Signature Art Style (Watercolor Sketchbook)
* **Canvas Paper**: Warm off-white / parchment texture (`#FDFBF7` to `#F8F5EE`).
* **Inking**: Organic black ink linework with slight pressure jitter (`#1E1E1E`).
* **Header Banners**:
  * **Top**: Rounded watercolor highlighter pill in soft coral red (`rgba(252, 165, 165, 0.5)`).
  * **Bottom**: Rounded watercolor highlighter pill in soft mint green (`rgba(134, 239, 172, 0.5)`).
* **Foliage & Props**:
  * Water: Animated sky blue (`#38BDF8` with `#BAE6FD` highlights).
  * Wood: Rustic oak (`#D97706` / `#78350F`) with slate bands.
  * Sun: Soft radial glow in bottom right (`#FDE047`).

---

## 2. Kinetic Choreography & Audio Foley

### 2.1 Top Panel Sequence (The Trap & Collapse)
1. **$0.0\text{s} - 2.5\text{s}$ (The Strain)**:
   * Stickman bent forward $35^\circ$ carrying a flexing shoulder pole with two heavy buckets labeled e.g. `"9-TO-5"`.
   * Straining steps, sweat beads flying, ground cracks spreading.
   * *SFX*: Creaking wood (`sawtooth ramp`), labored footsteps.
2. **$2.5\text{s} - 3.2\text{s}$ (The Stumble)**:
   * Front foot trips, stickman loses balance and plunges forward.
3. **$3.2\text{s} - 4.5\text{s}$ (The Crash & Spill)**:
   * Stickman hits the ground flat on stomach, arms splayed.
   * Buckets slam onto their sides; water bursts out into a wide blue puddle with flying splash particles.
   * *SFX*: Heavy low-end impact thud (`120Hz -> 30Hz`) + bucket clatter + water splash.
4. **$4.5\text{s} - 6.5\text{s}$ (Defeat)**:
   * Head down crying, tear drops, steam/sigh bubble rising.

### 2.2 Bottom Panel Sequence (The Continuous Asset)
* **$0.0\text{s} - 6.5\text{s}$ (Continuous Passive Abundance)**:
  * Mounted pipeline labeled `"ASSETS"` pours a steady, parabolic water stream into an open barrel.
  * Barrel water ripples with spray mist.
  * Stickman comfortably reclines against a grassy hill, smiling, reading a book, chest gently breathing.
  * *SFX*: Constant soothing water trickle loop + distant birds chirping.
* **Music Tone**: Slowed + Reverb dramatic/lo-fi track (e.g. *Revenge Super Slowed* or melancholic ambient piano).

---

## 3. Production Workflows

### Mode A: All-in-One HTML5 Canvas Studio (Immediate 60fps WebM/MP4)
Copy or adapt the engine at `templates/split-screen-canvas-engine.html`:
1. Provides full dual-panel physics, particle splashes, and typography.
2. Built-in Web Audio API procedural sound synthesizer (requires zero external audio files).
3. Live input fields for custom titles (e.g., Thai/English pairs).
4. One-click **"⏺ Record MP4/WebM"** button rendering real-time 1080x1920 video via `MediaRecorder`.

### Mode B: Generative AI Video Prompts (Gemini Omni Flash / Runway / Kling)
When prompting AI video generators, maintain strict prompt consistency:

```text
[TOP HALF]: Hand-drawn stickman in watercolor storybook sketch style on textured cream paper. 
A tired stickman carrying a heavy wooden shoulder yoke with two buckets labeled "9-TO-5". 
The stickman sweats, stumbles, collapses face down onto the ground, and both buckets spill water everywhere.
[BOTTOM HALF]: A peaceful sunny green hill with an industrial pipe labeled "ASSETS" pouring fresh water 
continuously into a wooden barrel. A happy stickman sits comfortably against the hill reading a book.
[DIVIDER]: Clean horizontal black pencil line dividing top and bottom.
[STYLE]: 9:16 vertical, minimalist 2D cartoon, black ink linework, soft watercolor tint, warm paper background.
```

---

## 4. Proven Contrast Metaphors

Consult `references/metaphor-catalog.md` for ready-to-use pairs:
* **"ทำงานแลกเงิน"** (Working for Money / Buckets) vs. **"สร้างทรัพย์สิน"** (Building Assets / Pipe)
* **"ติดหล่มโซเชียล"** (Doomscrolling / Trapped) vs. **"โฟกัสลึก 2 ชั่วโมง"** (Deep Work / Mastery)
* **"ซื้อหนี้สินอวดคน"** (Buying Liabilities) vs. **"ปลูกต้นไม้การเงิน"** (Investing Compounding)
* **"ทำลายสุขภาพแลกเงิน"** (Burnout & Fast Food) vs. **"ดูแลสุขภาพระยะยาว"** (Vitality & Longevity)

---

## 5. Bundled Resources

* `templates/split-screen-canvas-engine.html`: Full production-ready interactive Canvas studio and video recorder.
* `references/visual-style-guide.md`: Detailed color codes, coordinate rules, and font guidelines.
* `references/audio-foley-design.md`: Web Audio API synthesizer source code and timeline cues.
* `references/metaphor-catalog.md`: Exhaustive list of high-converting topic pairs.
