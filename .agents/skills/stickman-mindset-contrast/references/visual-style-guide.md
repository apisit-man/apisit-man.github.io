# Visual Style Guide: Stickman Mindset Split-Screen Animation

This guide details the exact visual aesthetics, coordinate layouts, color palettes, and animation kinematics required to produce the signature **"@the_stickman_mindset" dual-screen contrast videos**.

---

## 1. Canvas Geometry & Coordinate System

* **Resolution**: Vertical 9:16 (`1080 x 1920` logical pixels).
* **Split Layout**:
  * **Top Panel (Struggle / Labor)**: $Y \in [0, 960]$
  * **Dividing Line**: $Y = 960$, hand-drawn ink stroke, width `3.5px`, color `#2B2B2B` with a subtle natural organic wobble.
  * **Bottom Panel (Asset / Abundance)**: $Y \in [960, 1920]$
* **Safe Margins**: Keep key visual text and props within horizontal $X \in [80, 1000]$.

---

## 2. Color Palette & Watercolor Paper Aesthetics

The hallmark of this style is a **warm, tactile storybook doodle on textured cream paper** paired with soft watercolor washes:

| Element | Hex Color | Role / Description |
| :--- | :--- | :--- |
| **Canvas Background** | `#FDFBF7` / `#F8F5EE` | Warm paper parchment with subtle paper grain texture. |
| **Ink Outlines** | `#1E1E1E` / `#2D2D2D` | Charcoal/black ink pen strokes (width 3–4px) with slight hand-drawn jitter. |
| **Top Warning Pill** | `rgba(248, 113, 113, 0.45)` | Soft coral/red watercolor marker stroke behind the negative headline. |
| **Bottom Success Pill** | `rgba(74, 222, 128, 0.45)` | Soft mint/green watercolor marker stroke behind the positive headline. |
| **Water / Fluid** | `#38BDF8` / `#60A5FA` | Crisp animated cyan-blue water with white reflection highlights. |
| **Foliage / Grass** | `#86EFAC` / `#4ADE80` | Soft pastel spring green with darker ink blades and dots. |
| **Wood / Barrel** | `#D97706` / `#92400E` | Warm cedar/oak wood grain with slate grey iron hoops (`#475569`). |
| **Sun / Warmth** | `rgba(253, 224, 71, 0.35)` | Gentle radial sun glow in the upper-right corner of the bottom scene. |

---

## 3. Typography & Highlight Banners

Both panels feature a centered top title highlighted with a hand-drawn marker stroke:

1. **Top Title (Negative / Trap)**:
   * **Text**: e.g., *"Working for Money"* (or Thai: *"ทำงานแลกเงิน"*).
   * **Position**: Centered at $(X = 540, Y = 130)$.
   * **Font**: Bold handwritten or clean modern sans with organic charm (e.g. `Patrick Hand`, `Gaegu`, `Chakra Petch`, or `Prompt SemiBold`). Font size: `48 - 54px`.
   * **Underlying Pill**: Rounded rectangle or organic brush stroke $(W \approx 420\text{px}, H \approx 64\text{px})$, filled with coral red watercolor wash.

2. **Bottom Title (Positive / Freedom)**:
   * **Text**: e.g., *"Building Assets"* (or Thai: *"สร้างทรัพย์สิน"*).
   * **Position**: Centered at $(X = 540, Y = 1090)$.
   * **Font**: Same font family and weight.
   * **Underlying Pill**: Rounded rectangle $(W \approx 400\text{px}, H \approx 64\text{px})$, filled with pastel mint green watercolor wash.

---

## 4. Character Anatomy & Kinetic Choreography

### 4.1 Top Scene: The Burden & Collapse
* **Stage 1 — The Heavy Trudge ($t = 0.0\text{s} - 2.5\text{s}$)**:
  * Torso leans sharply forward at $30^\circ - 40^\circ$.
  * Shoulder yoke / carrying pole bends in a downward arc under two heavy buckets labeled `"9-TO-5"` (or `"DEBT"`, `"LABOR"`).
  * Shaking knees, heavy footsteps (`step_cycle`), sweat droplets spraying backwards.
  * Ground beneath feet shows expanding stress cracks.
* **Stage 2 — The Stumble & Collapse ($t = 2.5\text{s} - 3.8\text{s}$)**:
  * Front foot catches, stickman loses balance.
  * Heavy drop: head and torso slam flat to the ground ($Y \approx 820$).
  * The shoulder pole snaps off; buckets tip sideways, spewing a wave of water with dynamic splash particles.
* **Stage 3 — Defeat & Exhaustion ($t = 3.8\text{s} - 8.0\text{s}$)**:
  * Stickman lies flat, face pressed into ground, crying or gasping.
  * Periodic sigh bubbles / sweat marks rising.
  * Flocks of silhouette birds fly away into the horizon.

---

### 4.2 Bottom Scene: The Passive Pipeline & Peace
* **Continuous System ($t = 0.0\text{s} - 8.0\text{s}$)**:
  * A sturdy horizontal conduit / pipe mounted on support beams labeled `"ASSETS"` (or `"INVESTMENTS"`).
  * A continuous, glistening water stream arcs downward from the nozzle into an open wooden barrel.
  * Inside the barrel, surface ripples and small splash droplets continuously animate.
* **Stickman Reclining in Ease**:
  * Comfortably propped against a lush grassy knoll, legs stretched or crossed casually.
  * Holding an open book or tablet, eyes reading with content smile.
  * Chest subtly breathes up and down ($\sin(2\pi \cdot 0.5 t)$).
* **Atmosphere**:
  * Radiant sun shining warm rays.
  * Gentle breeze swaying grassy clover tufts.
  * Peaceful soaring birds in the sky.
