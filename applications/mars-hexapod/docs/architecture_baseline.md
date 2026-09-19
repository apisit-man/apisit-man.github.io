# Mars Hexapod 3D (ARES-6 Mission) — Architecture & Codebase Baseline

**Document Version:** 1.0.0  
**Target Audience:** Secondary / High School Students (Ages 13–18)  
**Educational Focus:** STEM Robotics Kinematics, Planetary Science (Chryse Planitia, Paleomagnetism, Clay/Sulfate Mineralogy), Solar Energy Physics ($\cos \theta$), Claim-Evidence-Reasoning (CER).

---

## 1. Executive Summary

"Mars Hexapod 3D: Chryse Planitia" is a high-fidelity WebGL simulation and gamified scientific inquiry platform developed by Dr. Apisit Tongchai. Players pilot **ARES-6**, an autonomous six-legged bio-inspired robotic rover, across the terrain of Mars to collect and analyze 4 mineral samples using reflectance spectrometry, evaluate the historical presence of liquid water, test robotic chassis leveling algorithms, and synthesize findings via the CER framework before returning to the Mars Ascent Vehicle (MAV).

---

## 2. Technical Stack & Codebase Topology

| Module | Source File | Responsibilities |
|---|---|---|
| **Simulation Core** | `app.js` | Main game controller, Three.js render loop, input routing (WASD / Joystick / D-Pad), camera management, collision handling, mission progression, HUD updating. |
| **Robotics Kinematics** | `robot.js` | 3D procedural Hexapod mesh generation, 6 articulated limbs (Coxa, Femur, Tibia), analytical 3-DOF Inverse Kinematics (Law of Cosines), Tripod & Wave gait coordination. |
| **Chassis Stabilization** | `leveler.js` | `BodyLeveler` controller: computes plane equation of grounded stance feet, transforms world normal to rover heading frame, applies low-pass damped pitch/roll orientation. |
| **Martian Environment** | `terrain.js` | Procedural heightmap of Chryse Planitia (crater basin, ridges, dunes), basalt boulder scatter, science extraction beacons (Alpha, Beta, Gamma, Delta), MAV Lander base. |
| **Audio Synthesis** | `audio.js` | 100% procedural Web Audio API engine (motor whine oscillator, bandpass Martian wind, footsteps, scan arpeggio, collision impact, victory chord). |
| **PBR Materials** | `materials.js` | Procedural HDR Mars environment map, anodized metals, titanium armor, gold thermal foil, carbon fiber, translucent camera lenses. |
| **Markup & Styles** | `index.html`, `style.css` | Aerospace HUD, minimap canvas, mobile control sheet, modal dialogs (Spectrometer, Leveler A/B test, CER Report, STEM Inspector). |
| **Bundler** | `build.js` | Standalone zero-dependency esbuild configuration compiling ES modules into an optimized IIFE `bundle.js`. |

---

## 3. Core 3D Render & Kinematics Loop

### 3.1 Frame Execution Pipeline (`animate()` in `app.js`)
```
[User Input: Keyboard / Touch / Virtual Joystick / D-Pad]
                          ↓
          [1. updateRoverPhysics(dt)]
     - Resolve Camera-relative or Rover-centric heading
     - Smooth acceleration and yaw turning rate
     - Obstacle collision detection & sliding tangential deflection
     - Calculate Solar Irradiance: P = P_max * max(0, n_panel · L_sun) * (1 - tau_dust)
                          ↓
             [2. Gait & Kinematics]
     - HexapodGait.update(dt, speed, yawRate)
     - Evaluate duty cycle (Tripod 50% stance vs Wave 83% stance)
     - Analytical 3-DOF IK: Coxa yaw + Femur/Tibia Law of Cosines
     - Query terrain height for grounded feet: terrain.getHeight(x, z)
     - BodyLeveler.update(groundedContacts, nominalHeight)
                          ↓
         [3. Environment & Mission Triggers]
     - terrain.update(time) (beacon spinning / hovering)
     - checkMissions() (proximity detection within 4.8m trigger radius)
                          ↓
           [4. Camera & HUD Telemetry]
     - updateCamera(): Damped spherical coordinates (orbit-follow, top-down, mast-cam, inspect)
     - updateHUD(): Artificial horizon, pitch/roll, stability gauge, battery, minimap radar
                          ↓
               [5. WebGLRenderer.render]
```

### 3.2 Key Mathematical Foundations
1. **Analytical 3-DOF Inverse Kinematics (`HexapodLeg.prototype.solveIK`):**
   $$\theta_{coxa} = -\text{atan2}(z_{local}, x_{local})$$
   $$D = \sqrt{(\sqrt{x^2 + z^2} - L_{coxa})^2 + y^2}$$
   $$\cos(\theta_{tibia}) = \frac{L_{femur}^2 + L_{tibia}^2 - D^2}{2 L_{femur} L_{tibia}}$$
   $$\theta_{tibia} = \pi - \arccos(\text{clamp}(\cos(\theta_{tibia}), -1, 1))$$

2. **Chassis Plane Stabilization (`BodyLeveler.prototype.update`):**
   $$\mathbf{n}_{support} = \frac{(\mathbf{p}_2 - \mathbf{p}_1) \times (\mathbf{p}_3 - \mathbf{p}_1)}{\|(\mathbf{p}_2 - \mathbf{p}_1) \times (\mathbf{p}_3 - \mathbf{p}_1)\|}$$
   $$\mathbf{n}_{local} = R_y(-\psi_{rover}) \cdot \mathbf{n}_{support}$$
   $$\theta_{pitch\_target} = \text{atan2}(n_{local.z}, n_{local.y}), \quad \theta_{roll\_target} = -\text{atan2}(n_{local.x}, n_{local.y})$$
   Smoothed with low-pass filter: $\theta_{current} \leftarrow \theta_{current} + (\theta_{target} - \theta_{current}) \times \alpha_{damping}$.

3. **Solar Panel Power Absorption:**
   $$P_{solar} = P_{max} \cdot \max(0, \mathbf{n}_{panel} \cdot \mathbf{L}_{sun}) \cdot (1 - \tau_{dust})$$

---

## 4. Current Gameplay Flow & Scientific Inquiry

1. **Launch Phase:** Student reads mission parameters in the launch modal (exploring Chryse Planitia, finding water evidence).
2. **Exploration Phase:** Driving ARES-6 using smooth camera-relative controls or traditional rover heading controls.
3. **Investigation Phase (In-situ Spectrometry):**
   - Rover approaches a glowing beacon (Alpha, Beta, Gamma, Delta).
   - Spectrometer UI activates, presenting VNIR absorption peaks (1.4 µm OH, 1.9 µm $H_2O$, 2.2–2.5 µm metal-OH).
   - Student answers a scientifically rigorous Claim inquiry question based on spectral peaks.
4. **Extraction & CER Synthesis Phase:**
   - Rover returns to the MAV Lander base at $(0, y, -16)$.
   - Final Mission Report triggers, displaying Evidence Score (max 12 pts), accuracy %, and complete CER framework synthesis.

---

## 5. Identified Pain Points & Pedagogical Friction

### Critical Bugs & Schema Mismatches
1. **Spectrometer Data Model Crash:**
   `app.js` line 1367 references `sample.spectralData.hydrationIndex`, `keyAbsorption`, and `sample.inquiryQuestion`, while `terrain.js` initialized sample objects with a legacy `spectrometer` and flat `options` array. Approaching any beacon triggers a fatal runtime `TypeError: Cannot read properties of undefined` in `openSpectrometerModal`.

### Gameplay Pacing & Navigation Friction
2. **Lack of In-World HUD Nav Waypoints / Compass:**
   The play area is $260\text{ m} \times 260\text{ m}$. Students frequently lose orientation or must look away from the 3D rover to squint at the small 2D minimap. There are no 3D screen-space projected target pins, distance readouts, or compass bearings towards unexplored sites.

### Pedagogical Efficacy Gaps
3. **Tripod vs. Wave Gait Mechanical Contrast:**
   Currently, switching between Tripod and Wave gait only modifies linear speed factor ($1.0$ vs $0.65$). On steep slopes ($>15^\circ$), Tripod gait should exhibit realistic foot slipping, body shudder, or stability degradation due to fewer support points (3 legs), whereas Wave gait (5 legs grounded) should provide rock-solid stability and climbing traction.
4. **Abstract Solar Angle Visualization:**
   The solar panel calculation $\cos \theta$ is displayed as text numbers in the HUD (`cos θ: 0.88`, `+0.44 kW`), but students cannot see the 3D solar incidence vector or the angle between the rover's panel normal and the sun direction. Adding an interactive visual indicator makes the physics concept instantly intuitive.

### Audio & Game Feel
5. **Acoustic Monotony:**
   Footstep audio uses a single frequency ramp. Adding subtle servo hum, gait-speed dependent acoustic pitch, and distinct audio cues for mineral scanning will significantly enhance immersion.

---

## 6. Baseline Verification
- Bundle compilation: `node build.js` executes in ~320ms, producing `bundle.js` cleanly.
- Codebase is ready for Phase 1 iterative cycles.
