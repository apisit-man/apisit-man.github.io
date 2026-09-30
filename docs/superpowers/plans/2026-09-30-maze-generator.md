# Maze Generator Suite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a high-performance, client-side, bilingual (Thai/English) Maze Generator Suite featuring both an interactive playable game and a classroom-ready printable worksheet generator with solution keys for Dr. Apisit's personal website.

**Architecture:** A modular vanilla JavaScript engine (`maze-engine.js`) decoupled from DOM rendering, executing procedural graph carving algorithms (Recursive Backtracker with directional bias, braid loops) across multiple topological masks (Rectangle, Cut-Out, Circle, Diamond, Escape) and BFS path solving. A responsive front-end (`index.html`, `style.css`) renders crisp vectors and high-DPI canvas graphics with dual-mode controls (interactive touch/keyboard game vs. `@media print` clean worksheet).

**Tech Stack:** Vanilla JavaScript (ES6+ with UMD module export for Node.js unit tests and browser execution), HTML5 Canvas, modern CSS with CSS variables and Print Media Queries, Node.js native test runner (`node:test`, `node:assert/strict`).

**Spec:** `docs/superpowers/specs/2026-09-30-maze-generator-spec.md`

## Global Constraints

- **Client-Side Exclusivity:** 100% static HTML/JS/CSS executable on GitHub Pages with zero server-side dependencies.
- **Strict Personal Branding:** Branded exclusively for Dr. Apisit Tongchai (Independent Educator & Researcher). Zero references to prohibited institutional terms (`สสวท.`, `IPST`, etc.).
- **Top Navigation:** Must include `🏠 กลับหน้าหลัก` button linking back to `../../index.html` or `../index.html`.
- **Footer Credit:** Standardized independent scholar copyright: `© 2024-2026 Dr. Apisit Tongchai - STEM Education & AI`.
- **Bilingual Interface:** Full toggleable support for Thai and English across all buttons, instructions, and worksheet headings.

## Review Focus

1. **Grid Mask Boundary Leak:** Cells outside of non-rectangular shapes (Circle, Cutout, Diamond) must never have walls carved into unmasked void areas.
2. **Always Solvable (Guaranteed Path):** The solver must always find an unbroken corridor path from start cell to goal cell across all generated seeds and shapes.
3. **Wall Collision Rigidity in Game Mode:** The player avatar must never be able to phase, jump, or clip through maze walls via rapid keypresses or diagonal inputs.
4. **Clean Print Output:** `@media print` must completely hide all UI controls, navigation headers, buttons, timers, and footers, leaving only the clean worksheet graphic and title.
5. **High-DPI / Retina Blur Prevention:** Canvas rendering must adjust scale for `window.devicePixelRatio` so lines and player graphics remain razor sharp on 4K/Retina displays.

---

### Task 1: Core Maze Grid & Topology Masking Engine

**Files:**
- Create: `projects/maze-generator/maze-engine.js`
- Test: `tests/maze-generator.test.js`

**Interfaces:**
- Produces: `MazeEngine.MazeGrid(width, height, shape)`
  - Methods: `isValid(x, y)`, `getCell(x, y)`, `getNeighbors(x, y)`
  - Shapes: `'rectangle'`, `'cutout'`, `'circle'`, `'diamond'`, `'escape'`

- [ ] **Step 1: Write the failing unit tests for Grid and Topology Masking**

Create `tests/maze-generator.test.js` testing `MazeGrid` instantiation and masking rules:
```javascript
const test = require("node:test");
const assert = require("node:assert/strict");
const MazeEngine = require("../projects/maze-generator/maze-engine.js");

test("MazeGrid creates correct dimensions and applies masks", () => {
  const grid = new MazeEngine.MazeGrid(20, 20, "rectangle");
  assert.equal(grid.width, 20);
  assert.equal(grid.height, 20);
  assert.equal(grid.isValid(0, 0), true);
  assert.equal(grid.isValid(19, 19), true);
  assert.equal(grid.isValid(-1, 0), false);
  assert.equal(grid.isValid(20, 20), false);

  // Cut-out shape should mask corners
  const cutout = new MazeEngine.MazeGrid(20, 20, "cutout");
  assert.equal(cutout.isValid(0, 0), false, "Top-left corner should be masked out");
  assert.equal(cutout.isValid(19, 0), false, "Top-right corner should be masked out");
  assert.equal(cutout.isValid(10, 10), true, "Center should be valid");

  // Circle shape should mask outside radius
  const circle = new MazeEngine.MazeGrid(21, 21, "circle");
  assert.equal(circle.isValid(0, 0), false, "Corner outside circle radius must be invalid");
  assert.equal(circle.isValid(10, 10), true, "Center cell inside circle must be valid");
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/maze-generator.test.js`  
Expected: FAIL with `Cannot find module '../projects/maze-generator/maze-engine.js'`

- [ ] **Step 3: Implement minimal MazeGrid and mask functions in `maze-engine.js`**

Implement `MazeGrid` with cell structures, wall flags (`top`, `right`, `bottom`, `left`), and shape mask functions (`rectangle`, `cutout`, `circle`, `diamond`, `escape`) and CommonJS/UMD export.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/maze-generator.test.js`  
Expected: PASS

- [ ] **Step 5: Commit changes**

```bash
git add projects/maze-generator/maze-engine.js tests/maze-generator.test.js
git commit -m "feat(maze): add MazeGrid and topology masking engine"
```

---

### Task 2: Procedural Generation Algorithms & Directional Biases

**Files:**
- Modify: `projects/maze-generator/maze-engine.js`
- Test: `tests/maze-generator.test.js`

**Interfaces:**
- Produces: `MazeEngine.generate(options)`
  - Parameters: `{ width, height, shape, bias, braidFactor, seed }`
  - Biases: `'random'`, `'horizontal'`, `'vertical'`, `'checkerboard'`
  - Returns: `{ grid, start: {x, y}, goal: {x, y} }`

- [ ] **Step 1: Write failing tests for maze generation & connectivity**

Add test cases in `tests/maze-generator.test.js`:
```javascript
test("MazeEngine.generate produces a connected, solvable maze", () => {
  const result = MazeEngine.generate({ width: 15, height: 15, shape: "rectangle", bias: "random" });
  assert.ok(result.grid);
  assert.ok(result.start);
  assert.ok(result.goal);
  assert.notDeepEqual(result.start, result.goal);
  assert.equal(result.grid.isValid(result.start.x, result.start.y), true);
  assert.equal(result.grid.isValid(result.goal.x, result.goal.y), true);

  // Test with horizontal bias
  const horiz = MazeEngine.generate({ width: 15, height: 15, shape: "rectangle", bias: "horizontal" });
  assert.ok(horiz.grid);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/maze-generator.test.js`  
Expected: FAIL with `MazeEngine.generate is not a function`

- [ ] **Step 3: Implement Recursive Backtracker with directional bias and loop braid**

Implement `generate(options)` in `maze-engine.js`:
- Select start position (e.g. entry boundary).
- Carve passages using stack-based recursive backtracking.
- Skew neighbor selection probability based on `bias` (`horizontal`, `vertical`, etc.).
- Remove walls between connected cells.
- Determine farthest reachable cell as the `goal`.
- Support optional `braidFactor` to convert dead-ends into loops.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/maze-generator.test.js`  
Expected: PASS

- [ ] **Step 5: Commit changes**

```bash
git add projects/maze-generator/maze-engine.js tests/maze-generator.test.js
git commit -m "feat(maze): implement procedural maze generation with directional biases"
```

---

### Task 3: BFS / A* Pathfinding Solver Engine

**Files:**
- Modify: `projects/maze-generator/maze-engine.js`
- Test: `tests/maze-generator.test.js`

**Interfaces:**
- Produces: `MazeEngine.solve(grid, start, goal)`
  - Returns: Array of coordinates `[{x, y}, ...]` representing the exact solution path.

- [ ] **Step 1: Write failing tests for MazeEngine.solve**

Add test case in `tests/maze-generator.test.js`:
```javascript
test("MazeEngine.solve finds contiguous path from start to goal", () => {
  const shapes = ["rectangle", "cutout", "circle", "diamond", "escape"];
  for (const shape of shapes) {
    const maze = MazeEngine.generate({ width: 12, height: 12, shape });
    const path = MazeEngine.solve(maze.grid, maze.start, maze.goal);
    
    assert.ok(Array.isArray(path), `Path should be an array for ${shape}`);
    assert.ok(path.length >= 2, `Path should have at least start and end for ${shape}`);
    assert.deepEqual(path[0], maze.start, "Path must begin at start");
    assert.deepEqual(path[path.length - 1], maze.goal, "Path must terminate at goal");

    // Verify step contiguity and wall clearance
    for (let i = 0; i < path.length - 1; i++) {
      const curr = path[i];
      const next = path[i + 1];
      const dx = next.x - curr.x;
      const dy = next.y - curr.y;
      assert.equal(Math.abs(dx) + Math.abs(dy), 1, "Steps must be Manhattan adjacent");
      assert.equal(maze.grid.canMove(curr.x, curr.y, next.x, next.y), true, "Move must not cross a wall");
    }
  }
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/maze-generator.test.js`  
Expected: FAIL with `MazeEngine.solve is not a function`

- [ ] **Step 3: Implement BFS / shortest-path solver in `maze-engine.js`**

Implement `solve(grid, start, goal)` using queue-based Breadth-First Search checking cell wall passages (`canMove`). Return reconstructed coordinate path.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/maze-generator.test.js`  
Expected: PASS

- [ ] **Step 5: Commit changes**

```bash
git add projects/maze-generator/maze-engine.js tests/maze-generator.test.js
git commit -m "feat(maze): add BFS shortest path solver"
```

---

### Task 4: Interactive Canvas Renderer, Game Engine, Touch/Keyboard Controls & Audio

**Files:**
- Create: `projects/maze-generator/index.html`
- Create: `projects/maze-generator/style.css`

**Interfaces:**
- Canvas Game Viewport:
  - Renders maze grid, walls, start point, goal flag, visited breadcrumb path, and player avatar.
  - Controls: Arrow keys, WASD, touch swipe, and on-screen Virtual D-Pad (`Up`, `Down`, `Left`, `Right`).
  - Web Audio API procedural sound feedback: move tick, wall collision bump, and victory melody.
  - HUD: Live stopwatch timer, step counter, reset button, and celebration modal.

- [ ] **Step 1: Write HTML markup and control structure**

Create `projects/maze-generator/index.html` with:
- Top-right `🏠 กลับหน้าหลัก` Home navigation button.
- Mode switcher: `🎮 เล่นเกม (Play Mode)` vs `📄 ใบงานพิมพ์ (Worksheet Mode)`.
- Configuration panel (Shape selector, Dimension sliders, Bias options).
- Canvas container with Retina scaling.
- Virtual D-pad for mobile touch controls.
- HUD with timer, step counter, sound toggle, and bilingual toggle (TH/EN).
- Web Audio procedural audio synthesizer for zero external asset dependencies.

- [ ] **Step 2: Write styling in `style.css`**

Add responsive styling, dark/light theme support via CSS variables, sleek glassmorphism panels, touch action locking (`touch-action: none` on canvas/dpad to prevent pull-to-refresh on mobile), and victory modal styling.

- [ ] **Step 3: Implement canvas rendering, movement collision, and celebration**

Wire `index.html` script to:
- Instantiate `MazeEngine.generate()`.
- Scale Canvas to `devicePixelRatio`.
- Handle keyboard (`keydown`) and D-pad click/touch inputs with wall collision checks via `grid.canMove()`.
- Record breadcrumb coordinates and render smooth path trails.
- Trigger victory modal and procedural celebratory audio chime upon reaching `goal`.

- [ ] **Step 4: Test in browser / node test**

Verify file exists, syntax is valid, and no console errors.

- [ ] **Step 5: Commit changes**

```bash
git add projects/maze-generator/index.html projects/maze-generator/style.css
git commit -m "feat(maze): build interactive playable canvas game and responsive touch controls"
```

---

### Task 5: Printable Worksheet Generator, Solution Key Overlay & Bilingual Localization

**Files:**
- Modify: `projects/maze-generator/index.html`
- Modify: `projects/maze-generator/style.css`
- Create: `tests/maze-generator-ui.test.js`

**Interfaces:**
- Worksheet / Print Controls:
  - Custom worksheet title, student name line, date line, and grade line.
  - `Show Answer / Solution Key` toggle (overlays solution line).
  - `Print Worksheet` button calling `window.print()`.
  - `Download PNG` button exporting high-resolution image via `canvas.toDataURL()`.
  - `@media print` style sheet: hides all UI chrome, navigation bars, buttons, and settings, presenting an A4/Letter-optimized clean printable page.
  - Full TH / EN bilingual translation dictionary.

- [ ] **Step 1: Write tests for UI markup, branding compliance, and print rules**

Create `tests/maze-generator-ui.test.js`:
```javascript
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const htmlPath = path.join(__dirname, "../projects/maze-generator/index.html");
const cssPath = path.join(__dirname, "../projects/maze-generator/style.css");

test("Maze Generator Suite: Branding, Navigation, and Print Structure", () => {
  const html = fs.readFileSync(htmlPath, "utf8");
  const css = fs.readFileSync(cssPath, "utf8");

  // Branding checks
  assert.ok(!html.includes("สสวท"), "Must not contain 'สสวท'");
  assert.ok(!html.includes("IPST"), "Must not contain 'IPST'");
  assert.ok(html.includes("อภิสิทธิ์ ธงไชย") || html.includes("Apisit Tongchai"), "Must contain author credit");
  
  // Navigation
  assert.ok(html.includes("กลับหน้าหลัก"), "Must contain home link");
  assert.ok(html.includes('id="btn-print"'), "Must contain print button");
  assert.ok(html.includes('id="btn-solution"'), "Must contain solution toggle button");
  assert.ok(html.includes('id="lang-toggle"'), "Must contain language toggle");

  // Print CSS
  assert.ok(css.includes("@media print"), "Must contain @media print CSS rules");
  assert.ok(css.includes(".no-print"), "Must contain .no-print helper class");
});
```

- [ ] **Step 2: Run test to verify it passes or fails**

Run: `node --test tests/maze-generator-ui.test.js`

- [ ] **Step 3: Implement Worksheet Mode, Solution Key rendering, PNG export, and bilingual dictionary**

Implement in `index.html` and `style.css`:
- Print header (Title, Name: ____, Date: ____).
- Solution Key toggle: draws clear colored solution line connecting path cells returned by `MazeEngine.solve()`.
- High-res PNG export using offscreen canvas.
- Comprehensive `i18n` dictionary with instant switching between Thai and English.
- Complete `@media print` CSS optimization.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/maze-generator-ui.test.js`  
Expected: PASS

- [ ] **Step 5: Commit changes**

```bash
git add projects/maze-generator/index.html projects/maze-generator/style.css tests/maze-generator-ui.test.js
git commit -m "feat(maze): add worksheet print mode, solution key overlay, and bilingual localization"
```

---

### Task 6: Project Index Integration & Full Verification

**Files:**
- Modify: `projects/index.html`
- Create: `learning games/maze-generator/index.html` (smooth redirect to `../../projects/maze-generator/index.html`)
- Test: Full test suite (`npm test`)

**Interfaces:**
- Add card/link in `projects/index.html` showcase.
- Ensure all automated unit tests pass.

- [ ] **Step 1: Add project showcase card to `projects/index.html`**

Add bilingual card entry for Maze Generator Suite with thumbnail, tags (`STEM & Logic`, `Printable Worksheet`, `Interactive Game`), and direct link.

- [ ] **Step 2: Create redirect in `learning games/maze-generator/index.html`**

Ensure users navigating from `/learning games/maze-generator/` get cleanly redirected to `../../projects/maze-generator/index.html`.

- [ ] **Step 3: Run complete test suite**

Run: `npm test` and `node --test "tests/*.test.js"`  
Expected: All tests pass with zero errors.

- [ ] **Step 4: Perform author branding and accessibility check**

Verify no prohibited strings in any modified file, all links are relative and operational.

- [ ] **Step 5: Final commit**

```bash
git add projects/index.html "learning games/maze-generator"
git commit -m "feat(maze): integrate maze generator into project showcase and redirects"
```
