# Mars Hexapod 3D (ARES-6 Mission) — Iterations Changelog

---

## [Iteration #1] - Scientific Spectrometer Fix, 3D Tactical Waypoints & Slope Gait Mechanics

### Reviewer Critique & Sprint Ticket Summary
- **Pedagogical Efficacy:** Fixed fatal runtime crash when discovering mineral samples due to data model mismatch in `terrain.js`; students can now successfully examine VNIR absorption curves at 1.4 µm (OH), 1.9 µm ($H_2O$), and 2.2–2.5 µm (Metal-OH) and select evidence-backed conclusions.
- **Kinematics & STEM Feel:** Introduced active slope-traction physics for Tripod vs. Wave gait. Climbing slopes $>13^\circ$ with Tripod gait (3-leg polygon) causes physical slippage, micro-shudder, stability loss, and acoustic slip alert, directly teaching students why multi-legged rovers engage Wave gait (5-leg polygon) for maximum static stability margin.
- **Wayfinding & UX:** Added interactive 3D in-world screen-space projected waypoint pins and an aerospace HUD Tactical Waypoint Bar displaying real-time distance in meters to all 4 mineral sites and the MAV Lander base.
- **Code Integrity:** All modal close buttons (`.modal-close`) unified with proper event binding.

### Implemented Changes & Code Diffs

#### 1. `terrain.js`
- Enriched all 4 science sample configurations (`alpha`, `beta`, `gamma`, `delta`) with authentic `spectralData` (hydration index %, absorption coefficients, and spectrometer reading strings) and `inquiryQuestion` (NGSS-aligned prompts, 3 multiple-choice options with structured `{ text }`, correct indices, and pedagogical rationale).
- Mapped `spectralData`, `inquiryQuestion`, and `waterEvidencePoints` onto the runtime `this.samples` objects, completely eliminating the `TypeError` crash in `app.js`.

#### 2. `app.js`
- **Slope-Aware Kinematics:** Integrated real-time surface normal calculation via `this.terrain.getNormal(x, z)`. When terrain inclination $>13^\circ$:
  - Tripod mode experiences dynamic slip penalty ($targetSpeed \times (1 - slip \times 0.85)$), chassis micro-jitter, stability index penalty, slip warning toast, and Web Audio friction sound.
  - Wave mode provides rock-solid grip and static stability boost.
- **3D Floating Waypoints & HUD Target Bar:**
  - Implemented `updateWaypointMarkers()`: projects 3D beacon coordinates to 2D screen space using `camera.project()`.
  - In-screen pins show glowing dot, site title, and live distance; off-screen beacons clamp to screen edge with directional arrows.
  - HUD Target Bar displays live distance chips (`[ALPHA 42m]`, etc.) and turns to green checkmark when analyzed.
  - MAV Lander chip pulses in gold (`[🚀 MAV EXTRACTION]`) once all 4 samples are collected.
- **Audio Feedback:** Added `playTractionSlip()` procedural oscillator bandpass filter in `SoundEngine`.
- **UI Responsiveness:** Bound `.modal-close` buttons and added `showWaveEngagedToast()`.

#### 3. `index.html` & `style.css`
- Added `#waypoint-markers-layer` and `#waypoint-hud-bar` with sleek sci-fi chips.
- Added responsive styling for in-screen floating pins, screen-edge perimeter compass arrows, and extraction gold pulse animations.

### Verification
- `node build.js`: Bundle compiled cleanly in 69ms without errors.
- WebGL rendering, IK calculations, and sound effects verified.

---

## [Iteration #2] - Solar Irradiance Law (cos θ) Gauge, Active Leveler Live Empirical Sampling & Martian Dust Particle System

### Reviewer Critique & Sprint Ticket Summary
- **Pedagogical Efficacy (Solar Physics $\cos\theta$):**
  - Previously, the solar cosine model was represented as a static text string in the HUD.
  - Now, students observe a live interactive mini-gauge showing the physical solar incidence angle $\theta = \arccos(\vec{n}_{panel} \cdot \vec{L}_{sun})$ in degrees, along with real-time irradiance efficiency percentage and dynamic state badges (Optimal / Moderate / Low Irradiance).
  - The segmented photovoltaic solar deck on the 3D rover model dynamically modulates its emissive glow in response to chassis orientation, giving direct visual feedback of Lambert's Cosine Law: $P = P_{max} \cos\theta (1 - \tau_{dust})$.
- **Active Chassis Leveler A/B Test (Live Empirical Telemetry):**
  - Previously, the leveler experiment modal instantly populated static pre-calculated numbers when clicking Trial A or Trial B.
  - Now, students execute an authentic 3.5-second live telemetry sampling session with audible telemetry beeps, progress bar updates, real-time variance/RMS jitter computation, and dynamic empirical conclusion formulation confirming Hypothesis 1.
- **Atmospheric Regolith Dust Particle System ($g_{mars} = 3.72\text{ m/s}^2$):**
  - Implemented high-performance procedural particle system `MarsDustSystem` simulating fine iron-oxide dust clouds kicked up by titanium grouser footpads upon stance impact.
  - Features procedural canvas radial textures (zero external assets), float32 typed buffers, and realistic Mars ballistic trajectories under low Mars gravity ($3.72\text{ m/s}^2$).

### Implemented Changes & Code Diffs

#### 1. `dust.js` (NEW)
- Created `MarsDustSystem` class managing 140 typed buffer particle instances.
- Procedural circular Gaussian radial gradient texture created via off-screen HTML5 Canvas.
- Ballistic update loop factoring Mars gravity ($3.72\text{ m/s}^2$), upward/lateral dispersion velocity, and linear opacity decay over particle lifetime.
- Recycles particles via index ring buffer to guarantee zero garbage collection pauses.

#### 2. `robot.js`
- Added `updateSolarGlow(cosTheta)` to `HexapodRobot` dynamically adjusting `emissiveIntensity` of the solar deck mesh.
- Wired `dust` instance into `HexapodGait` constructor and triggered `this.dust.emitFootstepPuff(leg.worldFootPos, 6)` upon every swing-to-stance transition.

#### 3. `app.js`
- Imported `MarsDustSystem` and initialized in `initEntities()`.
- Added `this.hexapod.updateSolarGlow(this.solarCosTheta)` in `updateRoverPhysics()`.
- Updated `updateHUD()` with dynamic solar incidence angle $\theta^\circ$, $\cos\theta$ equation, efficiency progress bar, and charging status badge.
- Replaced instant static trial with `runLevelerTrial(trial)`, `updateLevelerTrial(dt)`, and `finishLevelerTrial()`:
  - Real-time 3.5s sampling session with live progress bar and acoustic telemetry beeps.
  - Computes empirical mean tilt angle, RMS jitter ($\sigma = \sqrt{\frac{1}{N}\sum (\theta_i - \bar{\theta})^2}$), and mean stability index.
  - Generates dynamic empirical conclusion HTML directly linking physical data to hypothesis verification.
- Integrated `this.dust.update(dt)` and `this.updateLevelerTrial(dt)` in `animate()`.

#### 4. `index.html` & `style.css`
- Added solar incidence mini-gauge `#hud-solar-angle`, `#hud-solar-eff-bar`, `#hud-solar-status`.
- Added empirical sampling progress bar `#exp-telemetry-progress`, `#exp-progress-text`, `#exp-progress-pct`, and `#exp-empirical-conclusion`.
- Added styling for live telemetry sampling badges and solar efficiency gradient bars.

### Verification
- `node build.js`: Bundle compiled in 65ms (690.0kb) with zero errors.
- Visual inspection of procedural dust puff mechanics, solar deck shading, and live A/B experiment telemetry.

---

## [Iteration #3] - Interactive Martian Water P-T Phase Diagram, Dynamic CER Synthesis & Velocity-Responsive FOV

### Reviewer Critique & Sprint Ticket Summary
- **Thermodynamics & Planetary Science ($P\text{-}T$ Phase Equilibria):**
  - Upgraded `#atmo-modal` from static explanatory text to an interactive High-DPI HTML5 Canvas $P\text{-}T$ Phase Diagram simulator (`phase-diagram.js`).
  - Graphically renders Sublimation, Melting, and Boiling equilibrium curves with shaded regions for Solid Ice ($I_h$), Liquid Water, and Water Vapor on a logarithmic pressure scale ($0.01\text{ kPa}$ to $200\text{ kPa}$) and temperature range ($-100^\circ\text{C}$ to $+80^\circ\text{C}$).
  - Features real-time state evaluation with interactive canvas dragging/touch scrubbing, dynamic temperature/pressure sliders, and 4 preset buttons (Chryse Planitia present conditions, Water Triple Point, Noachian paleoclimate, and Perchlorate eutectic brine with freezing-point depression to $-68^\circ\text{C}$).
- **Claim-Evidence-Reasoning (CER) Framework & Assessment:**
  - Upgraded `#cer-report-modal` from static placeholder text to a personalized, dynamic scientific synthesis generated directly from the student's in-situ spectrometry choices.
  - Generates personalized breakdown for all 4 mineral beacons (Alpha, Beta, Gamma, Delta) detailing identified VNIR absorption peaks (1.4, 1.9, 2.2 µm), structural hydration index %, student first-attempt accuracy badges, and geochemical takeaway.
  - Added an "Export CER Report" button (`#btn-export-cer`) that formats an academic Markdown report and copies it to the student's clipboard with confirmation toast (`#cer-export-toast`) for seamless classroom assignment submission.
- **Kinematics & Camera Juice:**
  - Integrated velocity-responsive dynamic FOV breathing in `updateCamera()`, widening lens angle from $55^\circ$ to $58.8^\circ$ smoothly under acceleration.
  - Added automatic uphill crest pitch elevation to maintain clear visual line of sight when scaling steep dunes.

### Implemented Changes & Code Diffs

#### 1. `phase-diagram.js` (NEW)
- Implemented `WaterPhaseDiagram` class featuring:
  - Clausius-Clapeyron sublimation curve approximation ($P_{subl}(T)$) and Tetens formula for boiling vaporization curve ($P_{boil}(T)$).
  - Triple Point landmark $(0.01^\circ\text{C}, 0.6116\text{ kPa})$, Earth standard atmosphere $(20^\circ\text{C}, 101.3\text{ kPa})$, and Mars Chryse Planitia $(-55^\circ\text{C}, 0.63\text{ kPa})$.
  - Perchlorate eutectic brine mode depressing freezing threshold to $-68^\circ\text{C}$, illustrating how salts permit metastable liquid water on Mars.
  - High-DPI canvas rendering with crosshairs, touch/mouse dragging, logarithmic Y interpolation, and animated state diagnostics.

#### 2. `index.html` & `style.css`
- Replaced `#atmo-modal` static text with `<canvas id="atmo-phase-canvas">`, preset scenario buttons, temperature/pressure range sliders, live phase badge (`#atmo-phase-state`), and Perchlorate brine toggle (`#atmo-toggle-brine`).
- Added `#btn-export-cer` and `#cer-export-toast` to `#cer-report-modal`.
- Added custom styling for range input thumbs, touch manipulation, and canvas hover states in `style.css`.

#### 3. `app.js`
- Imported `WaterPhaseDiagram` from `./phase-diagram.js` and wired into `openAtmoModal()`.
- Bound `#btn-export-cer` click handler calling `exportCERReport()`.
- Enhanced `completeMission()`:
  - Generates dynamic, evidence-grounded `#cer-claim-text` and `#cer-reasoning-text`.
  - Builds rich HTML `#cer-evidence-list` cards reflecting the student's actual spectrometry survey.
- Implemented `exportCERReport()` copying structured Markdown summary to `navigator.clipboard`.
- Added velocity-responsive FOV breathing and dune crest clearance in `updateCamera()`.

### Verification
- `node build.js`: Bundle compiled cleanly in 63ms (713.2kb) with zero errors.
- Verified interactive phase diagram drag controls, preset buttons, CER synthesis card generation, clipboard export, and dynamic camera FOV.


