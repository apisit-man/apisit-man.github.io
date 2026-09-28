---
name: topological-puzzle-engine
description: >-
  Architecture, mathematics, and SVG rendering techniques for building topological maze puzzles,
  dependency-graph escape games, interlocking multi-turn arrow engines, deadlock-free procedural level generation,
  and mobile-responsive vector game UX. Use when building grid logic puzzles, arrow escape games,
  topological sorting mechanics, raycast collision detection for bent paths, or debugging SVG cross-device stroke/marker scaling.
---

# Topological Puzzle Engine & Arrow Escape Architecture Guide

This skill captures the end-to-end design patterns, mathematical formulas, and cross-device SVG rendering techniques for topological logic maze games (such as Arrow Escape, dependency sorting puzzles, and train/snake path escape games).

---

## 1. Core Mechanics & Solvable Level Generation

Topological puzzle games challenge players to untangle interlocking items (e.g. multi-turn arrows) by identifying items with zero dependencies (in-degree = 0) and releasing them in topological order.

### A. Backward Solvable Generation (Guaranteed 100% Deadlock-Free)
Never generate random arrows and hope they are solvable. Instead, generate the puzzle **backwards from a cleared board**:

```javascript
// Step 1: Start with an empty board.
// Step 2: In reverse order (from last escape to first escape), place arrows.
// For each arrow placed:
//   - Choose an exit boundary edge.
//   - Shoot an arrow path into the board backwards with right-angle turns.
//   - Ensure the backward path does not cross existing arrow shafts.
// Step 3: By construction, solving forward in reverse placement order is guaranteed deadlock-free!
```

### B. Forward DAG Topological Verification
Always verify solvable states using Kahn's Algorithm / Dependency Graph:
```javascript
export function verifySolvability(arrows, width, height) {
  const remaining = new Set(arrows.map(a => a.id));
  const escapeOrder = [];

  while (remaining.size > 0) {
    let freedThisRound = false;
    for (const arr of arrows) {
      if (!remaining.has(arr.id)) continue;
      if (checkArrowObstruction(arr, arrows, remaining).clear) {
        remaining.delete(arr.id);
        escapeOrder.push(arr.id);
        freedThisRound = true;
        break; // Greedily free one unblocked arrow
      }
    }
    if (!freedThisRound) {
      // Deadlock detected! Circular dependency exists.
      return { solvable: false, escapeOrder: [] };
    }
  }
  return { solvable: true, escapeOrder };
}
```

---

## 2. Raycast Collision Detection & Bent Arrow Math

An arrow consists of multiple orthogonal vertices `[P0, P1, P2, ..., P_head]`.

### A. Direction and Raycast
The arrow's motion vector `dir` is determined solely by its last segment:
$$\vec{dir} = \left(\text{sgn}(P_{\text{head}}.x - P_{\text{prev}}.x),\, \text{sgn}(P_{\text{head}}.y - P_{\text{prev}}.y)\right)$$

To test if the arrow can escape:
1. Cast a ray from $P_{\text{head}}$ along $\vec{dir}$ out to the grid boundary.
2. Check intersection against all active segments of **other** arrows.
3. Calculate distance to obstacle:
   $$\text{dist} = |P_{\text{hit}} - P_{\text{head}}|$$

### B. Crucial Edge Case: Self-Collision Avoidance
When an arrow has multiple bends, its own body curves behind its head.
- **Rule**: An arrow's head moving forward must **NOT** register a collision with its own shaft segment that immediately connects to it.
- **Check**: Only consider intersection with the arrow's own segments if an earlier segment loops around directly in FRONT of the head trajectory along $\vec{dir}$.

### C. Distance-Clamped Elastic Bump Animation
When blocked, the arrow should nudge forward toward the obstacle and bounce back without ever penetrating through the blocking arrow:
```javascript
// Clamp max bump proportional to distance to nearest obstacle
const maxBump = Math.min(0.32, Math.max(0.12, (dist - 0.25) * 0.55));

function nudgeFrame(elapsed, duration) {
  const progress = Math.min(1, elapsed / duration);
  // Sine curve: smooth out and bounce back
  const offset = Math.sin(progress * Math.PI) * maxBump;
  return getSlidingPoints(originalPoints, dir, offset);
}
```

---

## 3. High-DPI & Cross-Device SVG Rendering (The `vector-effect` Trap)

### A. The Pitfall: `vector-effect: non-scaling-stroke`
When rendering arrows using SVG:
* `vector-effect: non-scaling-stroke` forces polyline strokes to stay at a fixed physical screen thickness (e.g. 7.2px) regardless of viewBox scaling.
* SVG `<polygon>` arrowheads, however, scale proportionally with the `viewBox` (e.g. `0 0 1000 1000`).
* **The Failure Mode on Mobile**: On small smartphone screens (~320px wide), the SVG viewBox scales down by $\approx 0.32$. An arrowhead of size 15 units shrinks to $15 \times 0.32 = 4.8\text{px}$. Because the stroke remains 7.2px, the arrowhead is narrower than the line and completely buried by the line's rounded end cap (`stroke-linecap: round`), making direction invisible!

### B. The Solution: Dynamic Cell-Proportional Scaling
1. **Remove `vector-effect: non-scaling-stroke`**.
2. Scale both the shaft stroke width and arrowhead polygon in SVG units directly from the grid cell scale:
```javascript
const cellScale = (1000 - padding * 2) / Math.max(gridW, gridH);
const trackWidth = Math.max(12, Math.round(cellScale * 0.16));
```

### C. Authentic Barbed Chevron Arrowhead Geometry
To ensure unmistakable directionality on high-DPI and mobile displays, use a 4-point **Barbed Chevron** polygon with flared wings and an inner notch:

```
                  tip (1)
                  /     \
                 /   *   \
                /  (p1)   \
        left (2)\         / right (4)
                 \   _   /
                  notch (3)
                     |
                     |  (shaft)
```

**Mathematical Formula:**
```javascript
function calculateArrowTriangle(head, prev, w, h) {
  const p1 = worldToSvg(head, w, h);
  const p0 = worldToSvg(prev, w, h);
  const dx = p1.x - p0.x;
  const dy = p1.y - p0.y;
  const len = Math.hypot(dx, dy) || 1;
  const ndx = dx / len;
  const ndy = dy / len;
  const px = -ndy; // Perpendicular normal
  const py = ndx;

  const cellScale = p1.scale || 100;
  const headLen = Math.max(42, Math.round(cellScale * 0.48));
  const halfWidth = Math.max(19, Math.round(cellScale * 0.24));
  const notchDepth = Math.round(headLen * 0.32);

  // 1. Tip extends slightly ahead of grid point p1
  const tip = [p1.x + ndx * (headLen * 0.16), p1.y + ndy * (headLen * 0.16)];
  // 2. Left flared wing (sweeps backwards past the notch)
  const left = [tip[0] - ndx * headLen + px * halfWidth, tip[1] - ndy * headLen + py * halfWidth];
  // 3. Inner notch (shaft enters cleanly into this indentation)
  const notch = [tip[0] - ndx * (headLen - notchDepth), tip[1] - ndy * (headLen - notchDepth)];
  // 4. Right flared wing
  const right = [tip[0] - ndx * headLen - px * halfWidth, tip[1] - ndy * headLen - py * halfWidth];

  return `${tip[0].toFixed(1)},${tip[1].toFixed(1)} ${left[0].toFixed(1)},${left[1].toFixed(1)} ${notch[0].toFixed(1)},${notch[1].toFixed(1)} ${right[0].toFixed(1)},${right[1].toFixed(1)}`;
}
```

### D. CSS Styling for Crisp Retina Rendering
```css
.arrow-track {
  fill: none;
  stroke: var(--arrow-color);
  stroke-linecap: round;
  stroke-linejoin: round;
  pointer-events: none;
}
.arrow-head {
  fill: var(--arrow-color);
  stroke: var(--arrow-color);
  stroke-width: 1.5;
  stroke-linejoin: round;
  pointer-events: fill;
  cursor: pointer;
}
```

---

## 4. Mobile Ergonomics & Thumb Hitboxes

Finger taps on high-density grids are imprecise compared to mouse cursors.
Always overlay an invisible, thick `<polyline>` dedicated exclusively to pointer and touch events:
```javascript
const touchHit = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
touchHit.setAttribute('class', 'arrow-touch-hit');
touchHit.setAttribute('points', ptsStr);
// Dynamic touch buffer: wider on sparse grids, minimum 36 units on dense grids
const touchWidth = Math.max(36, Math.min(72, 600 / Math.max(w, h)));
touchHit.setAttribute('stroke-width', String(touchWidth));
```

```css
.arrow-touch-hit {
  fill: none;
  stroke: transparent;
  pointer-events: stroke;
  cursor: pointer;
  touch-action: manipulation;
}
```

---

## 5. Procedural Web Audio (Zero Audio Asset Latency)

Never load external MP3 files for click, bump, or escape SFX. Synthesize procedural sound with Web Audio API:
```javascript
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function getAudioCtx() {
  if (!audioCtx) audioCtx = new AudioContext();
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}

export const Sound = {
  // Arrow release whoosh
  escape() {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(840, ctx.currentTime + 0.16);
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.16);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.16);
  },

  // Blocked bump
  blocked() {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(70, ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.12);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.12);
  }
};
```

---

## 6. Site Integration & GitHub Pages Clean URL Pattern

1. **Clean URL Directory Convention**:
   - Install projects into kebab-case directory paths without spaces or `%20` (e.g. `projects/arrow-puzzle/index.html`).
2. **Backward-Compatibility Redirect**:
   - When migrating from prototype folders (e.g. `learning games/arrow_puzzle/index.html`), create a zero-second meta refresh:
   ```html
   <meta http-equiv="refresh" content="0; url=../../projects/arrow-puzzle/index.html" />
   <script>window.location.replace("../../projects/arrow-puzzle/index.html");</script>
   ```
3. **Institutional Independence**:
   - Always adhere to `author-branding-rules`: Dr. Apisit Tongchai, Independent Educator & Researcher.
4. **GitHub Pages Deployment Verification**:
   - Push to `origin main` and monitor GitHub Actions:
   ```powershell
   git push origin main
   gh run watch (gh run list -L 1 --json databaseId -q ".[0].databaseId")
   curl -I https://apisit-man.github.io/projects/arrow-puzzle/index.html
   ```
