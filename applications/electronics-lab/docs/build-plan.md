# Build Plan: Electronics Learning Lab

## Project Goals
Deliver an original, bilingual (Thai/English), browser-based interactive Electronics Learning Lab optimized for Thai school classrooms (projectors/desktops) and student mobile phones (responsive down to 360px), deployed as a static application at `projects/electronics-lab/`.

## Milestones & Gated Slices

### P0: Vertical Slice — Single Complete LED Polarity Lesson (Current Focus)
- [ ] **Architecture Setup**:
  - Vite + TypeScript + Vitest setup.
  - Subdirectory-compatible base path (`./`) and Hash Router (`index.html?lang=th#/led-polarity`).
  - Strict separation of concerns: `src/domain/`, `src/state/`, `src/i18n/`, `src/views/`, `src/ui/`.
- [ ] **Domain Model & Physics (`src/domain/`)**:
  - Pure, deterministic calculation functions for LED circuits ($I = \max(0, (V_s - V_f) / R)$).
  - Validation: reject $R \le 0$, negative voltage, non-finite values (NaN/Infinity).
  - Power off / Open circuit state: actual current = 0; separate preview prediction.
  - Reverse bias modeling: $I \approx 0$ with reverse-bias explanation.
  - Overcurrent detection ($I > 20\text{ mA}$) and classroom target comparison ($10\text{ mA}$).
  - Comprehensive unit test suite with 10 required fixtures passing in Vitest.
- [ ] **Bilingual Dictionaries (`src/i18n/`)**:
  - Complete Thai (default) and English translations for all UI, units, equations, feedback, and error strings.
- [ ] **2D Interactive SVG Schematic (`src/views/schematic/`)**:
  - Crisp, accessible SVG schematic showing Battery, Resistor, and LED with terminal markings (+ / - / Anode / Cathode).
  - Interactive switches: Power Toggle, Polarity Flip, Component Inspection.
  - Dynamic current flow animation (arrows or dot pulses) scaling with simulated current.
  - LED glow visualization reacting to conduction state.
- [ ] **3D Bench View (Lazy-Loaded Three.js)**:
  - Procedural Three.js 3D workbench rendering the battery, breadboard/resistor, and LED.
  - Synchronized state with 2D schematic.
  - Automatic graceful degradation / fallback when WebGL is absent or context is lost.
- [ ] **Pedagogical Inquiry Loop (`src/ui/`)**:
  - Predict $\to$ Experiment $\to$ Observe $\to$ Explain stages.
  - Teacher controls: Reset experiment, reveal answers, toggle fullscreen, print activity sheet.
  - Local progress tracking via `localStorage` with error fallback.
- [ ] **Responsive Design & Quality Gates**:
  - Verification at 360px, 390px, 768px, 1366px, 1920px. Touch targets $\ge 44\text{ px}$.

### P1: Classroom Pilot (6 Lessons)
1. Open and Closed Circuits (วงจรเปิดและวงจรปิด)
2. Conductors and Insulators (ตัวนำและฉนวนไฟฟ้า)
3. Ohm's Law with Resistors (กฎของโอห์ม)
4. LED Polarity (ขั้วของ LED)
5. Current-Limiting Resistor (ตัวต้านทานจำกัดกระแส)
6. Breadboard Connectivity (การต่อวงจรบนเบรดบอร์ด)

### P2: Richer Visual Experience (3D refinement, camera controls, breadboard nets)
### P3: Curriculum Expansion (Capacitors, Transistors, Sensors)
### P4: Static Build, Verification & Documentation Handoff
