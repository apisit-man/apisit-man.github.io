# Clock Kinematics & Procedural Web Audio Reference

This document provides mathematical formulations for clock-hand synchronization and Web Audio synthesis recipes for the `stickman-life-lesson-motion` engine.

---

## 1. Clock Kinematics & Coordinate Transformation

The clock hand rotates clockwise in a 2D coordinate space where the clock center is $\mathbf{C} = (x_c, y_c)$ and clock dial radius is $R$.

### 1.1 Angular Position Mapping
At time $t \in [0, T]$ (where $T = 38\text{s}$ by default), the hand angle $\theta(t)$ measured clockwise from 12 o'clock ($0\text{ rad}$) is defined as:

$$\theta(t) = \frac{2\pi t}{T}$$

Any point $\mathbf{P}$ located along the clock hand at radial distance $r$ from the center is:

$$\mathbf{P}(r, t) = \begin{bmatrix} x_c + r \sin\theta(t) \\ y_c - r \cos\theta(t) \end{bmatrix}$$

The unit tangent vector perpendicular to the hand (in the clockwise direction of motion) is:

$$\hat{\mathbf{T}}(\theta) = \begin{bmatrix} \cos\theta(t) \\ \sin\theta(t) \end{bmatrix}$$

The unit radial vector along the hand is:

$$\hat{\mathbf{R}}(\theta) = \begin{bmatrix} \sin\theta(t) \\ -\cos\theta(t) \end{bmatrix}$$

---

## 2. Dynamic Stickman Kinematics by Narrative Beat

### Beat 1: The Futile Struggle ($t \in [0, 6\text{s}]$)
* **Status**: Stickman stands on the outer clock dial at angle $\theta_{\text{rim}} \approx \theta(t) + 0.28\text{ rad}$.
* **Feet Position**: Fixed on the outer rim $r = R$ with high-frequency micro-jitter ($\pm 1.5\text{px}$) representing muscle tremor and slipping friction:
  $$\mathbf{P}_{\text{feet}} = \mathbf{C} + R \begin{bmatrix} \sin\theta_{\text{rim}} \\ -\cos\theta_{\text{rim}} \end{bmatrix} + \boldsymbol{\epsilon}_{\text{jitter}}(t)$$
* **Hands Position**: Bracing against the sweeping clock hand at $r_{\text{contact}} \approx 0.75 R$:
  $$\mathbf{P}_{\text{hands}} = \mathbf{C} + r_{\text{contact}} \hat{\mathbf{R}}(\theta)$$
* **Spine Curve**: Bent forward into a convex arc ($C$-shape) resisting angular torque:
  $$\mathbf{P}_{\text{torso}} = \mathbf{P}_{\text{feet}} + 0.5 (\mathbf{P}_{\text{hands}} - \mathbf{P}_{\text{feet}}) + 12 \hat{\mathbf{T}}(\theta)$$
* **Particle Emission**: 3–5 tiny dust/friction particles emitted per frame at $\mathbf{P}_{\text{feet}}$.

---

### Beat 2: The Shift in Perspective & Riding ($t \in [7, 16\text{s}]$)
* **Status**: Stickman ceases resistance, climbs onto the clock hand, and sits comfortably at $r_{\text{seat}} \approx 0.65 R$.
* **Center of Mass**: Located directly on the rotating hand:
  $$\mathbf{P}_{\text{hip}} = \mathbf{C} + r_{\text{seat}} \hat{\mathbf{R}}(\theta)$$
* **Orientation**: The spine aligns roughly perpendicular to the hand, tilting relaxedly backwards.
* **Secondary Breathing Motion**:
  $$\Delta y_{\text{breath}}(t) = 2.5 \sin(2.5 t)$$
  applied along the local normal vector.

---

### Beat 3: Adapting to Gravity & Pendulum Swing ($t \in [17, 22\text{s}]$)
* **Status**: As the hand sweeps downwards past the bottom ($Y > y_c$), stickman hangs by two hands from the hand tip.
* **Hands Contact**: $\mathbf{P}_{\text{hands}} = \mathbf{C} + (R - 20) \hat{\mathbf{R}}(\theta)$.
* **Leg Swing (Damped Harmonic Motion)**:
  $$\phi(t) = \phi_0 \cos(\omega_{\text{swing}} t) e^{-\gamma t}$$
  Legs sway organically with gravity rather than sticking stiffly to the hand.

---

### Beat 4: Slipping & Stumbling ($t \in [23, 29\text{s}]$)
* **Status**: Hands slip; stickman falls to the bottom clock rim ($Y \approx y_c + R$).
* **Friction Contact**: Landing on the bottom curve, instinctively trying to push back as the hand approaches from behind.

---

### Beat 5: Mindful Choice & Climbing ($t \in [30, 34\text{s}]$)
* **Status**: Stickman pauses, straightens spine, and steps back onto the rising hand ($8 \rightarrow 11$ o'clock).
* **Color Interpolation**: Background smoothly shifts from dark green to warm golden cream.

---

### Beat 6: The Eternal Loop ($t \in [35, 38\text{s}]$)
* **Status**: Relaxing on top of the hand as it reaches 12 o'clock, smoothly transitioning state back to $t = 0$.

---

## 3. Procedural Web Audio Synthesizer Recipes

All audio effects are generated in real time using the native HTML5 `AudioContext` without external sound files.

### 3.1 Crisp Clock Tick-Tock (Dual Resonant Bandpass)
```javascript
function playClockTick(audioCtx, isTock = false) {
  const osc = audioCtx.createOscillator();
  const filter = audioCtx.createBiquadFilter();
  const gain = audioCtx.createGain();

  const freq = isTock ? 1800 : 2400; // Tick vs Tock frequency
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(freq, audioCtx.currentTime);
  filter.Q.setValueAtTime(12, audioCtx.currentTime);

  gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.025);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + 0.03);
}
```

---

### 3.2 Pushing Friction & Mechanical Tension (Filtered Noise Burst)
```javascript
function playFrictionNoise(audioCtx, intensity = 0.5) {
  const bufferSize = audioCtx.sampleRate * 0.08;
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.4));
  }

  const noise = audioCtx.createBufferSource();
  noise.buffer = buffer;

  const filter = audioCtx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(650, audioCtx.currentTime);
  filter.Q.setValueAtTime(3.5, audioCtx.currentTime);

  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0.25 * intensity, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(audioCtx.destination);

  noise.start();
}
```

---

### 3.3 Perspective Shift Chime / Bell (Harmonic Shimmer)
```javascript
function playAwakeningChime(audioCtx) {
  const freqs = [880, 1320, 1760]; // A5, E6, A6 harmonics
  freqs.forEach((f, idx) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(f, audioCtx.currentTime);

    const initialGain = 0.15 / (idx + 1);
    gain.gain.setValueAtTime(initialGain, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.8);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 1.8);
  });
}
```

---

### 3.4 Lo-Fi Calming Ambient Chord Pad (Fmaj7 $\rightarrow$ Cmaj7)
```javascript
function playAmbientPadChord(audioCtx, chordType = 'Fmaj7') {
  // Fmaj7: F3 (174.61), A3 (220.0), C4 (261.63), E4 (329.63)
  // Cmaj7: C3 (130.81), G3 (196.0), B3 (246.94), E4 (329.63)
  const notes = chordType === 'Fmaj7' 
    ? [174.61, 220.0, 261.63, 329.63] 
    : [130.81, 196.0, 246.94, 329.63];

  notes.forEach(freq => {
    const osc = audioCtx.createOscillator();
    const filter = audioCtx.createBiquadFilter();
    const gain = audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, audioCtx.currentTime);

    gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + 1.2);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 6.0);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 6.0);
  });
}
```
