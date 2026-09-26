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

## [Iteration #6] - 2026-09-26
**Theme:** Multi-Layer Planetary GIS (MRO / HiRISE), Interactive Topographic Cross-Section Transects, and RFC 7946 Standard GeoJSON Export (Inspired by GeoLibre / OpenGeos)

### Reviewer Critique & Sprint Ticket Summary
- **Planetary Remote Sensing & Cloud-Native GIS Integration (GeoLibre Inspiration):**
  - Planetary exploration rovers rely heavily on orbital reconnaissance data from satellite orbiters (such as MRO / HiRISE and Mars Express) to evaluate terrain traverse hazards, identify paleohydrology channels, and locate hydrated mineral targets prior to roving.
  - Inspired by Dr. Qiusheng Wu's [GeoLibre](https://github.com/opengeos/GeoLibre) (an open-source geospatial platform combining Leaflet, Deck.gl, and MapLibre for cloud-native planetary GIS), we architected a zero-dependency, high-performance in-browser Planetary GIS engine (`orbital-gis.js`):
    - **5 Procedural Raster Layers:**
      1. *DEM Hypsometric Tint:* Multi-stop color ramp (-2.5m navy to +4.5m alpine white) visualizing crater depth and plateau ridges.
      2. *HiRISE True-Color Orthomosaic:* Authentic terracotta basalt regolith with sand dunes and boulder fields.
      3. *Slope Hazard Heatmap:* Dynamic color coding (<10° green/safe, 10°-18° yellow/traction warning, >18° red/critical rollover hazard) directly aligned with hexapod tripod slip mechanics.
      4. *Paleochannel Hydrology:* Flow accumulation traces identifying ancient Noachian/Hesperian alluvial fans and sedimentation basins.
      5. *CRISM Mineral Hydration Index (BD1900):* Simulated infrared spectrometry mapping hydration absorption bands (clay smectites, magnesium sulfates, and olivine).
    - **Interactive Topographic Cross-Section Transect Graph:**
      - Real-time 2D elevation profile sampling 120 elevation points along active transect vectors.
      - Includes preset transects: Chryse Impact Crater Rim-to-Floor transect, MAV Lander to Sample Beta transect, Rover-to-Target dynamic line-of-sight, and Custom Click-and-Drag transect on the orbital canvas.
      - Displays total distance, relief $\Delta h$, maximum slope grade, average slope grade, and live rover cursor position.
    - **RFC 7946 Standard GeoJSON Spatial Data Export:**
      - One-click export of `ARES6_ChrysePlanitia_MissionData.geojson` mapping local coordinates $(x, z)$ into IAU 2000 Mars Areographic Coordinates (Datum: Chryse Planitia $22.45^\circ\text{ N}, 49.97^\circ\text{ W}$, Mars mean radius $R = 3,389.5\text{ km}$).
      - Features include:
        - `LineString`: Complete rover exploration trajectory breadcrumbs.
        - `Point` features: MAV Lander extraction base and 4 mineralogical sample targets with full CRISM spectral band data and collection status.
        - `Polygon` feature: Meteorite impact crater boundary rim.
      - Ready for immediate drag-and-drop into GeoLibre, QGIS, ArcGIS, or Google Earth.

### Implemented Changes & Code Diffs

#### 1. `orbital-gis.js` (NEW)
- Built `OrbitalGIS` class:
  - High-DPI canvas engine rendering five $260\times 260$ offscreen raster caches at startup (<20ms initialization overhead).
  - Mars Areographic coordinate conversion algorithms (`localToMarsCoords`, `worldToCanvas`, `canvasToWorld`).
  - Topographic elevation transect sampler calculating relief $\Delta h$, grade percentage, and slope angles.
  - Interactive transect selector and custom path drag handler.
  - Live cursor tooltip inspector showing planetary Lat/Lon, local metric coordinates, elevation, and terrain slope hazard rating.
  - RFC 7946 GeoJSON exporter generating downloadable spatial datasets.

#### 2. `index.html` & `style.css`
- Added `#orbital-gis-modal` containing:
  - GIS toolbar with layer switcher buttons (DEM, HiRISE, Slope, Hydrology, CRISM) and GeoJSON export button.
  - Active layer legend bar with color ramp gradient indicator.
  - Main orbital map canvas (`#orbital-gis-canvas`) and live cursor readout pill (`#gis-cursor-readout`).
  - Topographic transect card with preset buttons and high-res elevation canvas (`#gis-transect-canvas`).
- Added `#btn-orbital-gis` to navigation bar and `#btn-toggle-gis` to bottom action dock.
- Added keyboard shortcut pill indicator: `O: แผนที่ดาวเทียม GIS`.
- Added CSS styling for GIS toolbar, layer pills, legends, canvas wrappers, and transect cards.

#### 3. `app.js`
- Imported and instantiated `OrbitalGIS` in `initEntities()`.
- Added keyboard shortcut `KeyO` to toggle GIS modal.
- Connected navbar and dock buttons to `toggleOrbitalGIS()`.
- Connected `this.orbitalGis.update(this.hexapod.position, this.hexapod.rotation.y)` into main animation loop.

### Verification
- `node build.js`: Bundle compiled cleanly in 187ms (748.6kb) with zero warnings or errors.
- Verified all 5 GIS layers, transect graph sampling, interactive click inspection, and RFC 7946 GeoJSON export.
- Verified compliance with `author-branding-rules` (Dr. Apisit Tongchai personal branding; strictly zero institutional mentions).





