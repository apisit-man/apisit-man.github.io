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

## 1.2 Top-Center Author Branding Watermark (`─── © AT ───`)
Rendered at the top-center safe zone:
* Center coordinate: $(540, 115)$
* Text: `"© AT"` with `font = "500 26px 'Prompt', sans-serif"`
* Hairlines: `lineWidth = 1.8`, length $= 38\text{px}$, gap $= 16\text{px}$ from text bounds
* Adaptive Opacity: `ctx.globalAlpha = 0.42` with `state.textColor`

---

## 2. 2-Bone Analytic Inverse Kinematics & Gravity-Aligned Posture

### 2.1 Critical Anatomy Rules (Avoiding Upside-Down & Head-Line Overlap Bugs)
1. **Gravity-Aligned Posture (`UP = (0, -1)`)**:
   * Never align the stickman's spine to `-normal` of the clock hand across $360^\circ$; on the left half of the clock ($\pi < \theta < 2\pi$, 6 to 12 o'clock), `-normal` points **downward**, flipping the stickman upside-down!
   * Instead, compute the anchor contact point $\mathbf{H}(f) = f L \hat{\mathbf{R}}(\theta)$ on the rotating clock hand, and pose the stickman's pelvis, spine, and head upright against gravity ($-Y$).
2. **Skull-Base Neck Termination & Opaque Head Fill**:
   * Never draw the spine line to `(head.x, head.y + 18)`. Terminate the neck at `skullBase = head - normalize(head - shoulder) * HEAD_R`, and fill the head circle with `state.bgTop` before stroking so no background limb or clock shaft ever cuts across the inside of the head circle.
3. **2-Bone Analytic Inverse Kinematics (`solveTwoBoneIK`)**:
   * Keep fixed bone lengths (`UPPER_ARM = 38`, `LOWER_ARM = 36`, `THIGH = 48`, `SHIN = 48`) and solve for exact Elbow and Knee coordinates using the Law of Cosines:
   $$\cos\alpha = \frac{L_1^2 + D^2 - L_2^2}{2 L_1 D}, \quad \mathbf{J}_{\text{mid}} = \mathbf{A} + \hat{\mathbf{u}}(L_1\cos\alpha) + \hat{\mathbf{p}}(L_1\sin\alpha)$$
4. **Perpendicular Shaft Clearance**:
   * In Beat 2 (3–5 o'clock sitting), offset `hip.x = seat.x - 24` so the clock hand passes cleanly under the mid-thighs.
   * In Beat 3 (6 o'clock hanging), grip at `frac = 0.42` with `shoulder` at `(grip.x + 36, grip.y + 56)` so arms reach cleanly overhead without crossing the head, and swinging feet stay well inside `CLOCK_RADIUS`.
   * In Beat 4 (8–9 o'clock pushing), place the stickman in the lower-left interior (`shoulder = hc + (64, 14)`) facing left ($-X$) pushing against the ascending hand—never out on the tip upside-down.
   * In Beat 6 (11–12 o'clock sitting), offset `hip.x = seat.x + 28` to the right of the nearly-vertical hand with legs dangling to the left (`seat.x - 22`) so the vertical shaft never skewers the spine or head.

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
