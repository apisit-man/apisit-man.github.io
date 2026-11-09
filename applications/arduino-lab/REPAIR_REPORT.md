# Arduino Lab TH–EN — Repair & Verification Report
Date: 9 November 2026
Author: Dr. Apisit Tongchai (ดร.อภิสิทธิ์ ธงไชย)
Repository Target: `apisit-man.github.io/projects/arduino-lab/`

---

## 1. Summary of Resolved Issues (Audit Findings F01 – F15)

### F01 – Centralized Dispatch & Immediate Derived Output (dt=0 when paused)
- **Problem**: Changing parameters (sliders), inputs, or resetting while paused did not immediately reflect in live readouts, generated code, or 2D/3D visualizations.
- **Resolution**: Implemented a central `dispatch(action)` in `src/main.ts`. Every state modification triggers `stepSimulation(0)` immediately, calculating derived outputs and updating readouts, slider value badges, generated C++ sketches, and 2D/3D views instantaneously without waiting for clock ticks.
- **Verification**: `tests/integration.test.ts` (Blink onMs 500->50, Paused Servo 180->Reset).

### F02 – DOM Focus Stability & Elimination of Full innerHTML Re-renders
- **Problem**: Previous code was calling `appEl.innerHTML = ...` on state changes, destroying user focus, interrupting slider dragging, and re-mounting the Three.js canvas.
- **Resolution**: Shell structure (`header`, `nav`, `main`, `#three-viewport`, `#controls-container`, `#tab-content`, `footer`) is rendered only once at initialization. All subsequent actions perform surgical DOM patching (updating text nodes, slider badges, tab contents, SVG attributes). The Three.js WebGL canvas stays permanently mounted and connected (`canvas.isConnected`).

### F03 – Button & Piano Interaction with Pointer Capture & Keyboard Support
- **Problem**: Button and piano keys used naive mouse/touch listeners, which could get stuck when dragging outside or during window blur.
- **Resolution**: Converted to Pointer Events with `setPointerCapture` and `releasePointerCapture`. Added global listeners for `window.blur` and `document.visibilitychange` to automatically release pressed states and stop active audio. Added keyboard Space/Enter handling with `event.repeat` protection.

### F04 – Complete Controls & Semantic Readouts for all 16 Lessons
- **Problem**: Motor, Stepper, Plant, Force, Project, Piano were missing specialized controls or fell back to generic placeholders.
- **Resolution**: Created `src/controls.ts` providing full, accessible semantic controls for every single lesson:
  - **Motor**: PWM (0–255), live duty cycle (%) and relative speed (strictly NO RPM claim).
  - **Stepper**: Steps/Rev (200–4096), Speed (1–15 RPM), Direction (+1/-1 CW/CCW). Commanded steps and angle display.
  - **Plant**: Moisture Raw ADC (0–1023), Dry/Wet calibration sliders with `dryRaw >= wetRaw + 50` validation. Displays relative percent (0–100%) and condition (DRY / OK / WET).
  - **Force**: FSR ADC (0–1023), threshold (1–1023). Displays needle angle and alarm bell state (uncalibrated qualitative pressure).
  - **Project**: Target distance, Near/Far threshold sliders, No-Echo simulation retaining previous distance. Traffic light state with color name.
  - **Piano**: Octave 4/5 selector, 8 piano keys (C, D, E, F, G, A, B, C) with note names and exact frequencies.
  - **Sensor**: Target distance, Timeout (1000–30000 µs), and No-Echo toggle.
  - **Button**: Switch mode (Hold / Toggle) and Debounce (10–100 ms). Separate readouts for raw D2, debounced state, and LED state.

### F05 – Terminal-Complete Netlist in 2D SVG Schematic
- **Problem**: Circuit diagram only showed disconnected row lines.
- **Resolution**: `src/schematic.ts` now renders true electrical netlists with named terminals (`R1.1`, `R1.2`, `LED.A`, `LED.K`, `SW.1`, `SW.2`, `RGB.R/G/B/K`, `5V`, `GND`, etc.), glowing active signal lines, and dynamic component status cards with full bilingual support.

### F06 & F07 – Procedural 3D Scene Completeness & ResizeObserver
- **Problem**: 3D scene only covered basic LED circuits and lacked components for several lessons.
- **Resolution**: `src/scene.ts` includes custom procedural 3D models for all 16 lessons (Uno R3 board, Breadboard, LEDs, Resistors, Buttons, Potentiometer, RGB LED, HC-SR04 ultrasonic sensor, Piezo buzzer, 8-key tactile keyboard, DC motor with gold shaft, TMP36 TO-92 package, SG90 servo, 28BYJ-48 stepper motor, OLED display, FSR pressure pad with gauge needle, and traffic light LEDs). Included `ResizeObserver` for responsive canvas resizing.

### F08 & F13 – Web Audio Synthesizer & Resource Lifecycle
- **Problem**: Oscillators were re-instantiated continuously, risking memory/audio node leaks.
- **Resolution**: `src/audio.ts` manages a single voice with smooth attack/decay exponential ramps. Tone updates pitch in-place without creating new oscillators. Voice stops on key release, pause, reset, lesson switch, window blur, and tab hidden state.

### F09 – F15 – Localization, Routing, and Persistence
- **Problem**: Missing translations, hardcoded Thai tokens in certain templates, and pushState duplicate history.
- **Resolution**: Fully bilingual UI strings (`th` default, `en` optional). Initial route uses `history.replaceState`; user-initiated lesson selections use `history.pushState`. `localStorage` operations are safe-wrapped with fallback to in-memory store.

---

## 2. Test & Verification Evidence

1. **Vitest Unit & Integration Tests**:
   - `npm test`: **19 passed (19/19)** across `app.test.ts` and `integration.test.ts`.
2. **Seed Deterministic Mathematical Tests**:
   - `node --test tests/seed.test.mjs`: **25 passed (25/25)**.
3. **TypeScript Typecheck**:
   - `npm run typecheck`: **0 errors**.
4. **Vite Production Build**:
   - Bundle output: `dist/index.html` (4.70 kB) and `dist/assets/index-BDknCsIy.js` (695.14 kB).
   - Relative base `./` verified.
5. **Static Audit**:
   - `node scripts/audit-build.mjs`: **PASS static audit** (zero root path dependencies).
6. **Deployment Staging**:
   - Staged to `projects/arduino-lab/` via `scripts/stage-pages.mjs --apply`.
