# Projects Iterations Changelog

---

## Brain Atlas 3D (Medical & Neuroanatomy Suite) — Iterations Changelog
*Full dedicated project changelog: [applications/brain-atlas/docs/CHANGELOG_ITERATIONS.md](../applications/brain-atlas/docs/CHANGELOG_ITERATIONS.md)*

### [Iteration #7] — Synaptic Biophysics & Neurotransmitter Studio + PWA Offline Classroom
- **Interactive Synaptic Transmission Studio (`synapse-lab.js`):** 2D Canvas biophysics simulation (action potential wave, Ca2+ influx, SNARE vesicle exocytosis into 20 nm cleft, Brownian diffusion, postsynaptic receptor binding, EPSP/IPSP summation, Vm oscilloscope from -90 mV to +40 mV).
- **5 Major Neurotransmitters:** Glutamate (AMPA/NMDA, Na+), GABA (GABA_A, Cl-), Acetylcholine (AChR, AChE degradation), Dopamine (D1/D2, DAT reuptake), Serotonin (5-HT, SERT reuptake).
- **Pharmacology & Neurotoxin Challenges:** Botox (cleaves SNARE), Curare (blocks AChR), SSRI (inhibits SERT), Benzodiazepine (allosteric GABA), Organophosphates (inhibits AChE).
- **PWA Offline Classroom:** Service Worker (`sw.js`) with Cache-First strategy for 3D GLTF models, Web App Manifest (`manifest.json`), install button (`#btn-pwa-install`), offline ready badge (`#pwa-offline-badge`).

### [Iteration #6] — Socratic AI Clinical Preceptor & 3D White Matter Tractography
- **Socratic Clinical Preceptor (`socratic-tutor.js`):** Posner conceptual change model diagnosing misconceptions across 6 cases (Broca vs Wernicke, Phineas Gage, Patient H.M., Ataxia, Hemianopsia, Locked-in).
- **3D White Matter Tractography (`white-matter-tracts.js`):** Corticospinal Tract (CST), Arcuate Fasciculus, Optic Radiations (Meyer's loop), Corpus Callosum with pulsing axonal action potential glow.

### [Iteration #5] — Bilingual Localization (TH/EN) & 3D Stereotaxic MNI Coordinate Probe
- **Bilingual Manager (`i18n.js`):** One-click TH/EN toggle with localStorage persistence.
- **3D Stereotaxic MNI Probe (`stereotaxic-probe.js`):** Orthogonal 3D crosshairs, Euclidean distance math, landmark target lock.

### [Iteration #4] — Interactive EEG Brainwave Studio & Cortical Oscillations Lab
- **EEG Oscilloscope (`eeg-lab.js`):** 5 bands ($\delta, \theta, \alpha, \beta, \gamma$), 4-channel CRT display, Berger effect, absence seizures, 3D cortical ripple shader.

### [Iteration #3] — Clinical Detective Case Study Mode
- **Diagnostic Terminal (`case-studies.js`):** 6 historical cases, 3-step diagnostic flow, Claim-Evidence-Reasoning (CER) generator with Markdown clipboard export.

### [Iteration #2] — Virtual Clinical Lesion & Stroke Simulator
- **Pathology Profiles (`lesion-simulator.js`):** 10+ stroke/TBI profiles, homunculus perimetry, synced 2D MPR infarct/edema overlays.

### [Iteration #1] — Gamified Quest System & Procedural Audio Engine
- **Pinpoint Quest (`quest.js`):** 12 gamified missions, 3D pulsing beacon, zero-dependency procedural Web Audio (`audio.js`).

---

## Neon Path (Line Tracing Puzzle) — Iterations Changelog
*Full dedicated project changelog: [projects/line-tracing-puzzle/docs/CHANGELOG_ITERATIONS.md](../projects/line-tracing-puzzle/docs/CHANGELOG_ITERATIONS.md)*

### [Iteration #7] - Euler's Bridges of Königsberg Lab (1736), Classroom Fullscreen & Replay Speed
- **Historical Discrete Mathematics Lab:** Integrated interactive Euler's Bridges Lab (`[E]`) demonstrating Leonhard Euler's 1736 theorem on the 7 Bridges of Königsberg, interactive 8th bridge parity modification, automated trail simulation, and the House of Euler envelope puzzle.
- **Classroom Presentation & Ergonomics:** Added Fullscreen mode (`[F]`) for classroom smartboards and multi-speed (`0.5×`, `1×`, `2×`) solution replay.

### [Iteration #6] - Classroom Sound Ergonomics, Mobile Haptics & Telemetry HUD
- **Ergonomics & Accessibility:** Audio mute toggle (`#sound-toggle-btn` / `[V]`) for shared computer labs; multi-pattern mobile haptic feedback (`navigator.vibrate`); live telemetry tracker (`Moves: X • Undos: Y`). Added Eulerian vs. Hamiltonian comparative card in help modal.

### [Iteration #5] - "Graph Architect" Level Sandbox, Solvability Verifier & Peer URL Sharing
- **Constructionist Problem Posing:** Interactive level creator (`[M]`) with tool palette (Start, Obstacles, One-Way Digraph arrows, Sequential Waypoints). Automated degree-greedy DFS solvability validator and zero-server Base64 URL hash sharing.

### [Iteration #4] - Socratic Concept Reflection Cards & Algorithmic Solution Replay
- **Metacognitive Reflection:** Formative Socratic reflection card inside victory modal awarding +100 Concept XP; automated step-by-step Hamiltonian path replay with ascending pentatonic scale and chronological step order badges.

### [Iteration #3] - Curated Curriculum (3 Chapters, 9 Levels), Directed Digraphs & Waypoints
- **Curriculum & Flow:** 9-level pedagogical curriculum introducing Degree Heuristics, Boundary Traversal, Cut Vertices, Directed Digraphs, Rotary Deadlocks, and Sequential Waypoint Checkpoints. Persistent level drawer (`[L]`) and best-time tracking.

### [Iteration #2] - Graph Theory Topological Analyzer, Socratic Hints & Vertex Degree Mode
- **Pedagogical Efficacy & Graph Theory:** Replaced opaque hints with a Socratic Diagnostic Engine modeling the puzzle as an induced grid subgraph. Diagnoses cut vertices, disconnected components, trapped cells ($\deg = 0$), dead-end bottlenecks ($\deg \le 1$), and bipartite parity imbalances.
- **Interactive Graph Mode:** Added toggleable Vertex Degree Mode (`🔍 Graph Mode` / Key G) showing real-time degrees on unvisited cells and highlighting critical cells with amber badges to teach Warnsdorff's heuristic.
- **Game Feel & UX:** Built sleek glassmorphism Socratic Diagnostic drawer and pulsing crimson culprit node highlights. Verified with automated Node unit tests.

### [Iteration #1] - Tactile Magnetic Snapping, Pentatonic Harmonizer & Keyboard Accessibility
- **Pedagogical Efficacy & Cognitive Load:** Added real-time Hamiltonian Progress HUD (`Visited: X / Total (Y%)` with glowing neon meter) and full keyboard navigation (Arrow keys/WASD, Z/Backspace for Undo, R for Restart, H for Hint) for Chromebooks and school laptops.
- **Player Experience & Game Feel:** Implemented Continuous Euclidean Magnetic Snapping Engine eliminating missed cells on fast touchscreen swipes. Built a procedural pentatonic harmonic synthesizer (C4–C7) that ascends melodically with each visited vertex and chimes downwards on undo. Added dedicated Undo button.
- **Verification:** Node syntax verified; all 16 DOM elements validated.

---

# Mars Hexapod 3D (ARES-6 Mission) — Iterations Changelog

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

---

## [Iteration #4] - 2026-09-19
**Theme:** Dynamic Support Polygon Visualizer, Static Stability Margin ($S$), Gait Pneumatic Audio Juice, and Telemetry CSV Data Export

### Reviewer Critique & Sprint Ticket Summary
- **STEM Robotics Kinematics (Convex Hull & Static Stability):**
  - Stance gait transitions (Tripod $\beta = 0.5$ vs Wave $\beta = 0.83$) were previously numbers in modal text. High school robotics curricula require understanding the *Support Polygon* (convex hull formed by stance feet contacts) and the *Static Stability Margin* ($S$, the shortest distance from CoM to polygon edge).
  - Implemented real-time 3D Support Polygon visualizer (`support-polygon.js`) rendering the ground contact polygon with glowing outline, CoM plumb-line beacon, and instant tipping hazard alert ($S < 0.28\text{ m}$).
- **Procedural Sound Design & Tactile Feedback:**
  - Added procedural `playGaitShift()` to `audio.js` simulating high-pressure pneumatic solenoid valve air release hiss combined with titanium latch relay clicks.
- **Empirical Telemetry CSV Export:**
  - Added `#btn-export-trials-csv` to `#leveler-experiment-modal`, allowing students to download multi-trial telemetry CSV datasets for classroom data analysis (Google Sheets / Excel / Python pandas).

### Implemented Changes & Code Diffs

#### 1. `support-polygon.js` (NEW)
- Created `SupportPolygonVisualizer` class featuring:
  - Dynamic `THREE.BufferGeometry` triangle fan ground fill mesh (35mm above terrain to prevent z-fighting).
  - Glowing perimeter line geometry (`THREE.Line`) tracking sorted stance foot coordinates.
  - Radial angular sorting around contact centroid $(\bar{x}, \bar{z})$ ensuring valid convex polygon topology.
  - Dynamic polygon area calculation via Gauss's shoelace formula:
    $$A = \frac{1}{2} \left| \sum_{i=1}^n (x_i z_{i+1} - x_{i+1} z_i) \right|$$
  - Static Stability Margin calculation:
    $$S = \min_{i} \text{dist}(\mathbf{r}_{\text{CoM}}, \mathbf{e}_i)$$
  - Center of Mass (CoM) ground projection beacon cylinder and vertical plumb-line.
  - Adaptive hazard thresholding: shifts color from Cyan/Amber to pulsating Rose/Red when $S < 0.28\text{ m}$ or slope $> 22^\circ$.

#### 2. `audio.js`
- Added `playGaitShift()`:
  - Bandpass-filtered white noise buffer burst (30ms attack, 110ms exponential decay) simulating pneumatic solenoid vent.
  - Dual sine wave resonator clicks at 880Hz and 1420Hz simulating mechanical gear and joint locks.

#### 3. `index.html` & `style.css`
- Added `#btn-toggle-polygon` to the primary HUD dock and updated shortcut pill (`P: ระนาบค้ำยัน 3D`).
- Added live Support Polygon telemetry card to `#gait-experiment-modal` (`#gait-telemetry-contacts`, `#gait-telemetry-area`, `#gait-telemetry-margin`).
- Added `#btn-export-trials-csv` to `#leveler-experiment-modal`.

#### 4. `app.js`
- Imported `SupportPolygonVisualizer` and initialized in constructor.
- Bound keyboard shortcut `KeyP` and modal/dock toggle buttons.
- Added `toggleSupportPolygon()` and `exportTrialsCSV()` methods.
- Wired live polygon update and modal HUD synchronization inside `animate()` loop.
- Replaced basic scan audio with `playGaitShift()` during gait switches.

### Verification
- `node build.js`: Bundle compiled cleanly in 70ms (719.6kb) with zero errors.
- Verified 3D polygon rendering in Three.js scene, dynamic area & margin calculations, CSV download blob generation, and procedural Web Audio playback.

---

## [Iteration #5] - 2026-09-19
**Theme:** STEM Robotics Kinematics Inspector & 3-DOF Interactive IK Lab, Chryse Impact Crater Topography, and Atmospheric Dust Opacity ($\tau$) Physics

### Reviewer Critique & Sprint Ticket Summary
- **Robotics Kinematics Laboratory (3-DOF Geometric IK & Singularity):**
  - Previously, `#inspector-modal` only displayed static text regarding plane fitting. Secondary STEM students learning robotics need to visualize articulated joint angles, reach workspace envelopes, and singularity conditions.
  - Implemented an interactive 3-tab Kinematics Inspector (`kinematics-inspector.js`):
    - Tab 1: Live 6-leg telemetry grid updating at 60 FPS displaying Coxa ($\theta_1$), Femur ($\theta_2$), Tibia ($\theta_3$) angles, stance state (`GROUNDED` vs `SWING`), and workspace reach distance $D$.
    - Tab 2: Interactive 2D sagittal plane IK laboratory canvas (`#ik-lab-canvas`) solving joint angles live via the Law of Cosines, with adjustable reach/elevation sliders and singularity detection ($D > 2.10\text{ m}$).
    - Tab 3: Detailed geometric kinematics derivation and trigonometric formulas.
- **Planetary Science & Topography (Chryse Meteorite Impact Crater):**
  - Synthesized a textbook Martian impact crater at $(x=8, z=60)$ with a $14\text{ m}$ radius excavated bowl ($-2.2\text{ m}$ depth), an uplifted ejecta rim ($+1.65\text{ m}$ elevation), and 12 basalt impact breccia boulders. This offers students an authentic planetary feature to test rover climbing traction and the BodyLeveler.
- **Atmospheric Physics & Solar Energy Attenuation ($\tau$, Tau):**
  - Added an Atmospheric Dust Opacity slider ($\tau \in [0.05, 0.60]$) to `#atmo-modal` connecting Martian dust storms with solar charging attenuation:
    $$P_{solar} = P_{max} \cdot \cos\theta \cdot (1 - \tau)$$
  - Dynamically modulates Three.js volumetric fog density in real time to simulate Martian dust haze.

### Implemented Changes & Code Diffs

#### 1. `robot.js`
- Stored calculated joint angles (`coxaAngle`, `femurAngle`, `tibiaAngle`) and workspace reach distance `reachDist` on each `HexapodLeg` instance in `solveIK()`.

#### 2. `terrain.js`
- Added mathematical impact crater elevation function into `getHeight(x, z)`:
  $$h_{bowl} = -2.2 \cdot \left(1 - (r_c / 14)^2\right), \quad h_{rim} = 1.65 \cdot \exp\left(-\frac{(r_c - 14)^2}{20.48}\right)$$
- Spawned 12 basalt impact breccia boulders along the crater rim circumference in `initRocks()`.

#### 3. `kinematics-inspector.js` (NEW)
- Created `KinematicsInspector` class:
  - 2D canvas rendering of the robotic limb (Coxa $L_1 = 0.45\text{m}$, Femur $L_2 = 0.92\text{m}$, Tibia $L_3 = 1.22\text{m}$).
  - Analytical Law-of-Cosines inverse kinematics solver with real-time singularity warning.
  - 6-leg live telemetry updater syncing DOM cards at 60 FPS.
  - Interactive preset buttons (Nominal Stance, Crouch, High Step, Singularity Test).

#### 4. `index.html` & `style.css`
- Redesigned `#inspector-modal` with a 3-tab layout: Live Telemetry Grid, 3-DOF IK Lab, and Theory.
- Added `#atmo-slider-tau` Atmospheric Dust Opacity control to `#atmo-modal`.
- Added CSS styling for tab buttons, telemetry cards, stance status badges, and reach progress bars.

#### 5. `app.js`
- Imported and instantiated `KinematicsInspector`.
- Wired live telemetry refresh in `animate()` loop when inspector modal is open.
- Bound `#atmo-slider-tau` to update `this.dustTau` and `this.scene.fog.density`.
- Linked `this.dustTau` to the solar panel battery charging physics calculation.

### Verification
- `node build.js`: Bundle compiled cleanly in 74ms (729.5kb) with zero errors.
- Verified 6-leg live joint telemetry, 2D IK canvas interactive rendering, impact crater geometry in 3D terrain, and dust tau attenuation on solar power.

---

# Brain Atlas 3D (Medical & Neuroanatomy Suite) — Iterations Changelog

## [Iteration #1] - 2026-09-20
**Theme:** Interactive Neuro-Pinpoint Quest System, Procedural Web Audio Engine & 3D Pulsing Centroid Pinpoint Marker

### Reviewer Critique & Sprint Ticket Summary
- **Pedagogical Efficacy & Scaffolding:**
  - High school students previously browsed the 3D atlas passively with no guided inquiry, mission goals, or immediate feedback.
  - Implemented the **Neuro-Pinpoint Quest Engine** (`quest.js`) offering a 12-mission inquiry pathway spanning Cerebrum (Broca's speech area, V1 visual cortex), Limbic System (Hippocampus memory consolidation, Amygdala threat evaluation, Thalamus sensory relay), Brainstem & Cerebellum (Medulla vital center, Pons respiratory bridge, Cerebellar balance), and Cerebral Vasculature (Circle of Willis bypass ring, MCA ischemic stroke territory).
  - Every quest challenge features authentic clinical vignettes (e.g., Broca's aphasia, Phineas Gage's personality shift, patient H.M., locked-in syndrome), multi-tier hints, and celebratory takeaway micro-insights.
- **Game Feel & Procedural Sound Design:**
  - Built `audio.js`: a 100% offline, zero-asset Web Audio synthesizer adhering to browser autoplay policies.
  - Generates delicate glass hover micro-ticks (1400Hz to 700Hz), crystal harmonic selection chimes (C5 + E5), mechanical slice plane scrub ticks, ascending 4-note major chord fanfare (C5-E5-G5-C6) upon correct pinpointing, and gentle minor exploration cues. Includes localStorage-backed mute toggle.
- **3D Visual Targeting:**
  - Designed an animated 3D Pinpoint Target Beacon (`THREE.RingGeometry` + inner core sphere + plumb needle) hovering over the FreeSurfer/MNI centroid coordinates of the active structure, dynamically pulsating at 60 FPS.

### Implemented Changes & Code Diffs

#### 1. `audio.js` (NEW)
- Created `SoundEngine` class with Web Audio API singleton and gesture unlock listeners (`click`, `touchstart`).
- Implemented `playHoverTick()`, `playSelectChime()`, `playSliceTick()`, `playCorrectChord()`, `playTryAgainTone()`, and `playModePulse()`.
- Added `toggleMute()` and persistent `brain_atlas_muted` in `localStorage`.

#### 2. `quest.js` (NEW)
- Created `QuestManager` class with 12 curriculum-aligned neuroscience inquiry quests.
- Tracks score (XP), consecutive correct streak, best streak, and question attempts.
- Added `autoAssistScaffold()` to automatically peel cortex when searching for subcortical nuclei.

#### 3. `app.js`
- Initialized `setupPinpointMarker()`: glowing targeting ring and center core beacon placed in Three.js scene.
- Integrated `questManager` inside `bootstrap()`, `onCanvasClick()`, and `animate()`.
- Wired audio triggers into canvas hover (`playHoverTick`), structure select (`playSelectChime`), cutting plane scrub (`playSliceTick`), and preset tour switches.
- Added `updateQuestHUD()` handling level badges, progress counters, streak icons, and celebratory toast animations.

#### 4. `index.html` & `style.css`
- Added `#btn-toggle-sound` and `#btn-toggle-quest` with animated pulse dot in header.
- Added `#quest-hud-card` glassmorphic drawer and `#quest-celebrate-toast` celebratory overlay.
- Added responsive styles and animations (`questCardSlide`, `toastPop`).

### Verification
- `node build.js`: Bundle compiled cleanly in 185ms (760.2kb) with zero errors.
- `node test_dom.js`: All 61 unique DOM IDs referenced across JavaScript modules validated with 100% match in `index.html`.
- Sound synthesis, 3D centroid marker animation, and quest progression verified.## [Iteration #2] - 2026-09-20
**Theme:** Virtual Clinical Lesion & Stroke Simulator ("Cause-and-Effect Lab"), Contralateral Homunculus & Visual Field Deficit Perimetry, Synced 2D MPR Pathology Overlays

### Reviewer Critique & Sprint Ticket Summary
- **Clinical & Sensory Correlation (Neurology Cause-and-Effect):**
  - High school biology and neuroscience curricula emphasize how localized neural trauma impacts whole-body physiology (e.g., contralateral stroke deficits, homunculus distribution, expressive vs. receptive aphasia). Previously, students could only see healthy anatomy in isolation.
  - Implemented the **Virtual Clinical Lesion & Stroke Simulator** (`lesion-simulator.js`). Students can induce simulated focal ischemic infarcts or structural lesions on any chosen brain structure directly from the Inspector drawer (`#btn-inspector-lesion`).
  - Comprehensive clinical pathology profiles are mapped across cortical lobes, limbic nuclei, brainstem centers, and major vascular territories (MCA, ACA, Basilar, PCA).
- **Contralateral Somatotopic & Perimetry Visualizations:**
  - Designed interactive functional deficit telemetry cards showing immediate clinical symptoms:
    - Motor Homunculus deficits (contralateral faciobrachial or crural paresis).
    - Speech & Language impairments (Broca's expressive non-fluent aphasia vs. Wernicke's fluent word salad vs. global aphasia).
    - Sensory & Cranial nerve signs (hemianesthesia, ataxia, vertigo, vital instability).
  - Built an animated **Visual Field Deficit Perimetry Canvas** (`#visual-field-canvas`) rendering dual-eye field of view plots (Left Eye OS, Right Eye OD) showing direct retinotopic consequences: Homonymous Hemianopsia, Bitemporal Heteronymous Hemianopsia (Chiasm compression), or complete anopsia.
- **Synced 3D Ischemic Necrosis & 2D MPR Radiologic Pathology:**
  - 3D FreeSurfer meshes afflicted by an active lesion exhibit ischemic necrosis discoloration (dark necrotic gray `0x2a1a1f`) and high-tension warning pulse animation in the Three.js viewport.
  - Sliced 2D MPR canvases (Axial, Coronal, Sagittal) dynamically render radiologic cross-sectional pathology: an acute hypodense/cytotoxic edema core with a glowing penumbra risk border projected at the lesion centroid when within slicing proximity ($\le 24\text{ mm}$).
- **Acoustic & Restorative Feedback:**
  - Added procedural Web Audio alarms: `playLesionWarning()` (dual dissonant alert pulse) and `playHealChime()` (ascending restorative harp arpeggio) when restoring tissue with `#btn-lesion-restore`.

### Implemented Changes & Code Diffs

#### 1. `lesion-simulator.js` (NEW)
- Created `LesionSimulator` class managing active lesion states, clinical syndrome profiles, and symptom derivations.
- Maps 10+ core neuropathology profiles (Broca Expressive Aphasia, Wernicke Receptive Aphasia, Primary Motor Contralateral Hemiplegia, V1 Homonymous Hemianopsia, Hippocampus Anterograde Amnesia, Cerebellar Ataxia & Dysmetria, Medullary Respiratory Failure, MCA Superior Division Stroke, ACA Crural Infarct, Basilar Artery Locked-in Syndrome).
- Computes vascular territory distribution (MCA, ACA, PCA, Basilar, Vertebral).

#### 2. `audio.js`
- Added `playLesionWarning()`: dual square and sawtooth oscillators configured with sharp decay simulating medical monitor alert pulse.
- Added `playHealChime()`: four-stage arpeggio with high resonance filter simulating cellular reperfusion and structural recovery.

#### 3. `app.js`
- Integrated `LesionSimulator` instance and wired `#btn-inspector-lesion` and `#btn-lesion-restore`.
- Added dynamic 3D ischemic pulse shader modulation in `animate()` loop.
- Added `renderVisualFieldPerimetry()` drawing dual-eye visual field quadrants and blind spots (scotoma) with retinal crosshairs.
- Added `renderMPRLesionOverlay()` to 2D Axial, Coronal, and Sagittal slice rendering loops with radial gradient hypodensity and cytotoxic penumbra.

#### 4. `index.html` & `style.css`
- Added `#btn-inspector-lesion` in structure inspector actions.
- Added `#inspector-lesion-panel` containing lesion syndrome badge, clinical deficits summary, visual field perimetry canvas, and restore button.
- Styled necrotic pulses, warning badges, and perimetry display.

### Verification
- `node build.js`: Bundle compiled in 265ms (796.4kb) with zero errors.
- `node test_dom.js`: 71 unique DOM IDs referenced across JavaScript modules validated with 100% match.
- Verified 3D necrotic pulse, 2D MPR pathology overlays, perimetry canvas rendering, and procedural audio feedback.

## [Iteration #3] - 2026-09-20
**Theme:** Clinical Detective Case Study Mode & Diagnostic Evidence Report (CER Framework)

### Reviewer Critique & Sprint Ticket Summary
- **Pedagogical Inquiry & Claim-Evidence-Reasoning (CER):**
  - Moving beyond passive anatomy memorization, secondary school students (ages 13–18) and pre-med learners require structured problem-solving experiences simulating real clinical neurology consultations.
  - Implemented the **Clinical Detective Case Studies Suite** (`case-studies.js`) providing 6 benchmark clinical scenarios:
    1. *Case 1: "The Boardroom Executive with Sudden Mutism"* (Acute Left Broca's Area Ischemic Stroke & Contralateral Hemiparesis).
    2. *Case 2: "The Railroad Foreman's Tamping Iron"* (Phineas Gage historical trauma, Prefrontal & Orbitofrontal Disinhibition Syndrome).
    3. *Case 3: "The Patient Who Cannot Form Tomorrow"* (Patient H.M., Bilateral Hippocampal Anterograde Declarative Amnesia with spared Procedural Memory).
    4. *Case 4: "The Stumbling Tightrope Gymnast"* (Acute Post-Viral Cerebellar Ataxia, Kinetic Intention Tremor & Scanning Speech).
    5. *Case 5: "The Sudden Loss of the Right World"* (Left Occipital Lobe / V1 Infarct producing Right Homonymous Hemianopsia).
    6. *Case 6: "The Frightening Silent Paralysis"* (Basilar Artery Thrombosis, Ventral Pontine Infarction / Locked-in Syndrome with preserved vertical oculomotor signaling).
- **Interactive Multi-Step Diagnostic Workflow:**
  - Designed the **Clinical Detective Terminal** (`#case-modal`) with 3 specialized investigation stages:
    - **Tab 1: แฟ้มประวัติและตรวจร่างกาย (Intake):** Patient profile, vital signs with clinical alert flags, Chief Complaint, HPI, and structured Neurological Physical Exam checklist (Motor, Speech, Cranial Nerves, Sensory, Coordination).
    - **Tab 2: สืบสวนรอยโรค 3D & ภาพ MRI (Investigation):** One-click integration with 3D atlas camera alignment (`#btn-case-align-3d`), automated 3-plane MPR MRI slicing (`#btn-case-align-mpr` auto-setting Axial, Coronal, Sagittal mm coordinates to the lesion centroid), and live cross-linking with the Virtual Lesion Simulator (`#btn-case-simulate-lesion`).
    - **Tab 3: วินิจฉัย & รายงาน CER (Verdict & CER Synthesis):** Diagnostic formulation choosing Differential Diagnosis, Pathophysiological Mechanism/Vascular Supply, and Suspected Anatomical Locus.
- **Dynamic CER Synthesis & Classroom Homework Export:**
  - Upon submission, evaluates student diagnostic accuracy (Diagnostic XP scoring and solved case tracking).
  - Dynamically synthesizes an evidence-grounded **Claim-Evidence-Reasoning (CER)** report linking patient symptoms directly to MNI coordinate radiologic findings and neuroanatomical pathway principles.
  - Added an **Export CER Report** button (`#btn-export-case-cer`) copying formatted Markdown directly to the clipboard with an animated confirmation toast (`#case-export-toast`) for seamless homework submission to teachers (Google Classroom, Canvas, etc.).
- **Procedural Sound Design:**
  - Added `playDiagnosticSuccess()`: triumphant 5-note harmonic chord sequence (C4-G4-C5-E5-G5).
  - Added `playDiagnosticPulse()`: acoustic dual-beat stethoscope pulse (Lub-Dub frequency ramp from 70Hz to 45Hz).

### Implemented Changes & Code Diffs

#### 1. `case-studies.js` (NEW)
- Created `CLINICAL_CASES` dataset with 6 comprehensive clinical neurology cases.
- Implemented `CaseStudyManager` class handling state machine, local storage persistence (`brain_atlas_cases`), 3D/MPR camera synchronization, diagnosis evaluation, and CER Markdown generation.

#### 2. `audio.js`
- Added `playDiagnosticSuccess()`: harmonic arpeggio with high resonance filter.
- Added `playDiagnosticPulse()`: procedural dual-oscillator acoustic stethoscope pulse.

#### 3. `app.js`
- Imported `CaseStudyManager` and initialized in `bootstrap()`.
- Created `initCaseStudies()`, `populateCaseStructureDropdown()`, and `updateCaseModalUI()`.
- Bound modal controls, case selector pills, tab switcher, investigation action buttons, verdict submission, and CER clipboard export in `setupEventListeners()`.
- Synchronized structure selection in 3D atlas directly with the suspected structure dropdown in the case study form.

#### 4. `index.html` & `style.css`
- Added `#btn-toggle-cases` in top header actions.
- Added `#case-modal` backdrop, card, and tab panes (Intake, Imaging, Verdict).
- Added `#case-export-toast` overlay.
- Added full responsive styling, vitals cards, telemetry grids, and CER block formatting.

#### 5. `test_cases.js` (NEW) & `test_dom.js`
- Built automated unit test suite verifying all 6 clinical cases, submission evaluation, and CER report formatting.
- Updated `test_dom.js` validating all 109 unique DOM IDs with 100% match.

### Verification
- `node test_cases.js`: All 6 clinical cases and CaseStudyManager logic passed with 100% assertions.
- `node test_dom.js`: All 109 DOM IDs referenced in JS verified successfully in `index.html`.
- `node build.js`: Bundle compiled in 175ms (882.1kb) with zero errors.

## [Iteration #4] - 2026-09-20
**Theme:** Interactive EEG Brainwave Oscilloscope & Cortical Neural Oscillations Lab ("The Electric Brain")

### Reviewer Critique & Sprint Ticket Summary
- **Electrophysiology & Neural Synchronization:**
  - High school biology and pre-med neuroscience curricula cover action potentials and synaptic transmission, but students struggle to understand how millions of synchronized post-synaptic potentials summate into extracellular voltage oscillations recorded at the scalp by Electroencephalography (EEG).
  - Implemented the **Interactive EEG Brainwave Studio & Oscilloscope Laboratory** (`eeg-lab.js`). Students explore the 5 canonical EEG rhythms ($\delta, \theta, \alpha, \beta, \gamma$), their frequency ranges, voltage amplitudes ($\mu\text{V}$), behavioral states, and thalamocortical origins.
- **4-Channel Clinical Oscilloscope & International 10-20 System:**
  - Designed a high-DPI medical CRT oscilloscope canvas (`#eeg-oscilloscope-canvas`) rendering 4 clinical montages updating at 60 FPS:
    - **Channel 1: F3-F4 (Frontal)** - Executive concentration & high-frequency beta activity.
    - **Channel 2: C3-C4 (Central)** - Sensorimotor rhythm and mu rhythm.
    - **Channel 3: T3-T4 (Temporal)** - Hippocampal theta ripples and auditory processing.
    - **Channel 4: O1-O2 (Occipital)** - Visual cortex alpha rhythm.
  - Interactive physiological state presets demonstrating real neuroscience phenomena:
    1. *Relaxed Wakefulness / Eyes Closed (Alpha Burst):* Massive synchronized 10 Hz alpha oscillations in Occipital channels, directly demonstrating Hans Berger's historic 1924 discovery (The "Berger Effect").
    2. *Active Mental Math & Problem Solving (Beta Desynchronization):* Alpha block where high-amplitude occipital rhythm collapses into low-voltage fast beta rhythms (20 Hz) upon opening eyes or mental effort.
    3. *Deep Non-REM Sleep N3 (High-Voltage Delta Waves):* Slow 1.5 Hz high-voltage swells ($>75\,\mu\text{V}$) indicating cortical recovery.
    4. *REM Sleep & Vivid Dreaming:* Paradoxical low-voltage mixed theta and sawtooth waves.
    5. *Absence Seizure (Generalized 3-Hz Spike-and-Wave):* Paroxysmal hypersynchronous electrical discharge spreading across all 4 channels simultaneously.
- **3D Cortical Electrical Dipole Ripples:**
  - Sychronized with the active EEG state, traveling electrical dipole wave rings propagate across the 3D FreeSurfer cortex in the Three.js viewport matching the dominant rhythm frequency (e.g. 10 Hz alpha wave ripples over occipital/parietal cortex or paroxysmal amber surges during seizure states).
- **Procedural Brainwave Sonification:**
  - Added real-time Web Audio frequency sonification in `audio.js` (`startEEGSonification` / `stopEEGSonification`): modulates an audible carrier tone with an LFO matching the brainwave frequency ($f = 1/T$), allowing students to hear the difference between a 1.5 Hz delta swell and a 20 Hz beta buzz.

### Implemented Changes & Code Diffs

#### 1. `eeg-lab.js` (NEW)
- Created `EEG_BANDS` and `EEG_STATES` electrophysiological specifications.
- Implemented `EEGLaboratory` class managing rolling ring buffers, harmonic Fourier synthesis, CRT grid plotting, gain scaling, and 3D dipole update event dispatching.

#### 2. `audio.js`
- Added `startEEGSonification(frequency)`: carrier tone (220 Hz A3) with dynamic low-frequency FM modulation matching EEG rhythm.
- Added `stopEEGSonification()`: cleanly stops and disconnects Web Audio nodes.

#### 3. `app.js`
- Imported `EEGLaboratory`, `EEG_BANDS`, and `EEG_STATES`.
- Added `initEEGLab()` and `updateEEGUI(st)`.
- Bound `#btn-toggle-eeg`, `#btn-eeg-close`, `#btn-eeg-sound`, `#eeg-gain-slider`, and preset state buttons in `setupEventListeners()`.
- Integrated 3D cortical electrical ripple shader modulation in `animate()` loop.

#### 4. `index.html` & `style.css`
- Added `#btn-toggle-eeg` with yellow pulse dot in top header actions.
- Added `#eeg-modal` backdrop, card, 4-channel CRT canvas, gain slider, band telemetry chips, and Socratic reflection card.
- Added styling for medical CRT grid, scanhead indicators, and EEG badges.

#### 5. `test_eeg.js` (NEW) & `test_dom.js`
- Built automated unit test verifying all 5 EEG frequency bands, state transitions, Fourier signal synthesis, and dipole event generation.
- Updated `test_dom.js` validating all 121 unique DOM IDs with 100% match.

### Verification
- `node test_eeg.js`: All EEG bands, states, and signal synthesis verified with 100% pass.
- `node test_dom.js`: All 121 DOM IDs referenced in JS verified successfully in `index.html`.
- `node build.js`: Bundle compiled in 194ms (899.0kb) with zero errors.

## [Iteration #5] - 2026-09-20
**Theme:** Bilingual Language Localization (Thai / English) & 3D Stereotaxic MNI Coordinate Probe (Surgical Targeting Mode)

### Reviewer Critique & Sprint Ticket Summary
- **Bilingual Neuroscience Education (Thai / English):**
  - High school biology programs (EP/MEP), bilingual curricula, and pre-med neuroanatomy students require dual Thai-English nomenclature to correlate national curriculum terms (e.g. สมองส่วนหน้า, สมองน้อย, ก้านสมอง, โพรงสมอง) with international neurosurgical literature (Frontal Lobe, Cerebellum, Brainstem, Ventricular System).
  - Implemented the zero-dependency **Bilingual Internationalization (i18n) Engine** (`i18n.js`). Features one-click language toggle (`#btn-toggle-lang`) with `localStorage` persistence, automatic DOM translation via `data-i18n` attributes, and dynamic updates to the Inspector Card, 3D hover tooltips, and search placeholders.
- **3D Stereotaxic MNI Coordinate Probe (Surgical Navigation):**
  - Transformed the static view into an interactive neurosurgical planning workstation. Introduced the **Stereotaxic Probe & MNI Coordinate Measurement Engine** (`stereotaxic-probe.js`) operating in the FreeSurfer MNI152 coordinate space:
    - Sagittal X (Left (-) to Right (+) mm)
    - Coronal Y (Posterior (-) to Anterior (+) mm)
    - Axial Z (Inferior (-) to Superior (+) mm)
  - Features 3D orthogonal coordinate crosshair lines (Red X, Green Y, Blue Z) with a glowing cursor tip in the 3D scene.
  - Real-time Euclidean distance calculation $d = \sqrt{(\Delta x)^2 + (\Delta y)^2 + (\Delta z)^2}$ to all 20+ brain structures, displaying the nearest anatomical landmark and distance in millimeters.
  - Interactive coordinate steppers ($-5, -1, +1, +5\text{ mm}$) and one-click "Lock Anatomical Target" (`#btn-probe-lock`) which snaps the probe and inspection camera directly to the landmark.
- **Audio Feedback:**
  - Added procedural dual crystal sine chirp in `audio.js` (`playStereotaxicLock()`, 1760 Hz -> 2093 Hz) when locking onto anatomical targets or entering proximity ($\le 12\text{ mm}$).

### Implemented Changes & Code Diffs

#### 1. `i18n.js` (NEW)
- Built `TRANSLATIONS` dictionary covering all primary UI strings in Thai and English.
- Implemented `I18nManager` class with `loadStorage()`, `saveStorage()`, `toggleLanguage()`, and `applyTranslations()`.

#### 2. `stereotaxic-probe.js` (NEW)
- Implemented `StereotaxicProbe` class with 3D cursor mesh, orthogonal crosshair lines, coordinate stepping, dynamic Euclidean distance calculation, and proximity alert callbacks.

#### 3. `audio.js`
- Added `playStereotaxicLock()`: dual high-pitch surgical telemetry ping (1760 Hz, A6 -> 2093 Hz, C7) with fast exponential decay.

#### 4. `index.html` & `style.css`
- Added `#btn-toggle-lang` to header actions.
- Added `#btn-toggle-probe` to floating island toolbar.
- Added `#probe-dock-card` floating drawer with coordinate readouts (`#probe-coord-x`, `#probe-coord-y`, `#probe-coord-z`), steppers, nearest landmark badge (`#probe-nearest-dist`, `#probe-nearest-name`), and target lock button (`#btn-probe-lock`).
- Added responsive glassmorphic styles for `.nav-pill-lang`, `.probe-dock-card`, axis tags, and stepper buttons.

#### 5. `app.js`
- Imported `I18nManager` and `StereotaxicProbe`.
- Added `initI18n()`, `initStereotaxicProbe()`, and `updateProbeUI(data)`.
- Refactored `updateInspectorUI(struct)` and `onCanvasMouseMove` tooltip to dynamically adapt to active language.
- Bound `#btn-toggle-lang`, `#btn-toggle-probe`, steppers, and lock buttons.

#### 6. `test_i18n_probe.js` (NEW) & `test_dom.js`
- Created unit test verifying `I18nManager` translations/toggling and `StereotaxicProbe` math/stepping/locking (100% pass).
- Updated `test_dom.js` verifying all 132 unique DOM IDs with 100% match.
- Built production bundle with `node build.js` (909.3kb).

### Verification
- `node test_i18n_probe.js`: All i18n translations and stereotaxic probe math verified with 100% pass.
- `node test_dom.js`: All 132 DOM IDs referenced in JS verified successfully in `index.html`.
- `node build.js`: Bundle compiled in 176ms (909.3kb) with zero errors.




