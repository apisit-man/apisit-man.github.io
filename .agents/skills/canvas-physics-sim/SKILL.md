---
name: canvas-physics-sim
description: >-
  Techniques and formulas for building 2D HTML5 Canvas physics simulations,
  educational science games, trajectory predictors, pendulum/motion models, and KaTeX math synchronization.
  Use when developing Canvas games, physics simulations (projectile, friction, oscillations),
  Retina/High-DPI display calibration, or connecting mathematical formulas to interactive visualizations.
---

# 2D Canvas Physics Simulation & EdTech Guide

This skill provides mathematical formulas, rendering optimizations, and physics loops for educational simulations (such as Projectile Game, Friction Explorer, and Pendulum).

---

## 1. High-DPI (Retina) Canvas Calibration

To prevent blurred lines and fuzzy text on high-resolution smartphone screens and Retina displays, always scale the canvas backing store:

```javascript
export function setupHighDpiCanvas(canvas) {
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;

  // Get display size in CSS pixels
  const rect = canvas.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;

  // Set internal resolution multiplied by DPR
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);

  // Maintain CSS display dimensions
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  // Scale drawing context so all coordinates use logical CSS pixels
  ctx.scale(dpr, dpr);

  return { ctx, width, height, dpr };
}
```

---

## 2. Robust Physics Loop with Delta Time Clamping

Never update physics with fixed increments per frame, as different devices run at 60Hz, 90Hz, or 120Hz. Always calculate delta time (`dt`) and clamp it to avoid physics explosions when switching tabs:

```javascript
let lastTime = performance.now();

function gameLoop(currentTime) {
  let dt = (currentTime - lastTime) / 1000; // seconds
  lastTime = currentTime;

  // Clamp dt to a maximum of 50ms (0.05s) to prevent tunneling when tab resumes
  dt = Math.min(dt, 0.05);

  updatePhysics(dt);
  renderCanvas();

  requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);
```

---

## 3. Core Physics Integrators

### A. Projectile Motion with Drag & Gravity
```javascript
// State: x, y (meters or pixels), vx, vy (m/s), g (m/s^2), drag (k/m)
export function updateProjectile(particle, dt) {
  const speed = Math.hypot(particle.vx, particle.vy);
  const dragForce = 0.5 * particle.dragCoeff * speed * speed;

  const ax = -(dragForce * (particle.vx / (speed || 1)));
  const ay = particle.gravity - (dragForce * (particle.vy / (speed || 1)));

  particle.vx += ax * dt;
  particle.vy += ay * dt;

  particle.x += particle.vx * dt;
  particle.y += particle.vy * dt;
}
```

### B. Analytical Trajectory Predictor Dots
```javascript
export function drawTrajectoryPrediction(ctx, startX, startY, v0, angleDeg, g, steps = 30) {
  const angleRad = (angleDeg * Math.PI) / 180;
  const vx = v0 * Math.cos(angleRad);
  const vy = -v0 * Math.sin(angleRad); // negative because canvas Y is inverted

  ctx.save();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';

  for (let i = 1; i <= steps; i++) {
    const t = i * 0.08;
    const px = startX + vx * t;
    const py = startY + vy * t + 0.5 * g * t * t;

    ctx.beginPath();
    ctx.arc(px, py, 2.5, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}
```

---

## 4. KaTeX Math Formula Synchronization

When displaying live calculations alongside the simulation:

```javascript
// Dynamically render updated variables into KaTeX
export function updateFormulaDisplay(containerId, values) {
  const el = document.getElementById(containerId);
  if (!el || typeof katex === 'undefined') return;

  const latex = `R = \\frac{v_0^2 \\sin(2\\theta)}{g} = \\frac{(${values.v0})^2 \\sin(${2 * values.theta}^\\circ)}{${values.g}} = ${values.range.toFixed(2)}\\text{ m}`;

  katex.render(latex, el, {
    throwOnError: false,
    displayMode: true
  });
}
```
