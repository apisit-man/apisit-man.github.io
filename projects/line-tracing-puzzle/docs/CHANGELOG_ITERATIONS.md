# Neon Path (Line Tracing Puzzle) — Iterations Changelog

---

## [Iteration #7] - Euler's Bridges of Königsberg Lab (1736), Classroom Fullscreen Mode & Multi-Speed Replay Controller

### Reviewer Critique & Sprint Ticket Summary
- **Historical Grounding in the Genesis of Graph Theory (Leonhard Euler, 1736):**
  - High school students studying discrete mathematics need to understand *where* graph theory originated.
  - While Neon Path's core puzzles focus on **Hamiltonian Paths** (visiting every vertex/cell once without repetition), students often conflate this with one-stroke edge drawing.
  - Implemented the **"Euler's Bridges Lab" (ห้องทดลองสะพานโคนิกส์แบร์ก)** (`#euler-modal`, accessible via `#euler-btn` or hotkey `[E]`):
    - **Seven Bridges of Königsberg (1736):** Renders the 4 landmasses ($A, B, C, D$) and 7 river bridges over the Pregel river in dynamic SVG. Calculates each vertex's degree ($A:3, B:3, C:5, D:3$) and explains Euler's Theorem in real-time: because all 4 vertices have odd degrees ($\text{Odd} > 2$), traversing every bridge exactly once is **mathematically impossible**.
    - **Interactive 8th Bridge Modification:** Students can tap `"➕ เพิ่มสะพานที่ 8 (Make Solvable)"` to add a direct bridge between banks $A$ and $B$. This raises $\deg(A)$ and $\deg(B)$ to $4$ (even), leaving **exactly 2 odd vertices** ($C:5, D:3$). The status banner immediately turns green, demonstrating how modifying parity satisfies Euler's Theorem!
    - **Automated Trail Simulation:** Tapping `"▶ ลากเส้นวิถีออยเลอร์"` animates the complete 8-step Eulerian path with glowing gold edge highlights and harmonious pentatonic sound chimes.
    - **House of Euler (Envelope Puzzle):** Interactive mode featuring the classic 5-vertex, 8-edge envelope graph with exactly 2 odd-degree vertices ($V_3:3, V_4:3$), validating Euler's one-stroke drawing theorem.
- **Classroom Interactive Whiteboard & Projector Mode (`[F]`):**
  - Added dedicated Fullscreen API integration (`#fullscreen-btn`, hotkey `[F]`) with dynamic SVG state icons (`#fullscreen-enter-icon`, `#fullscreen-exit-icon`), allowing teachers to present puzzles and graph labs cleanly on classroom smartboards and tablets without browser UI clutter.
- **Multi-Speed Solution Replay Controller (`1×`, `2×`, `0.5×`):**
  - Added `#replay-speed-btn` into the victory action bar. Students and educators can toggle playback speeds ($0.5\times$ slow-motion for step-by-step cognitive analysis of Cut Vertices, $1\times$ standard, $2\times$ fast demonstration).

### Implemented Changes & Code Diffs

#### 1. `index.html`
- Added `#euler-btn` to left header navigation.
- Added `#fullscreen-btn` (with enter/exit SVG icons) to right header controls.
- Added `#replay-speed-btn` inside `.victory-actions`.
- Injected `#euler-modal` dialog with mode tabs (`#euler-tab-konigsberg`, `#euler-tab-house`), SVG visualizer (`#euler-svg`), status display (`#euler-status-box`), and action buttons (`#euler-toggle-bridge-btn`, `#euler-simulate-btn`, `#euler-reset-btn`).
- Updated keyboard hint bar to include `E = Euler Lab` and `F = Fullscreen`.
- Bumped cache buster versions to `style.css?v=8` and `script.js?v=11`.

#### 2. `style.css`
- Added styles for `#euler-modal`, `.euler-modal-box`, and `.euler-mode-tabs`.
- Styled `.euler-canvas-wrapper` and SVG graph elements: `.euler-edge`, `.euler-edge.active`, `.euler-edge.bridge8`, `.euler-node-circle`, `.euler-node.odd`, `.euler-node.even`, `.euler-degree-text`.
- Added reactive states for `.euler-status-box.impossible` (crimson warning) and `.euler-status-box.solvable` (neon teal success).
- Styled `.replay-speed-btn` with amber gold highlight.

#### 3. `script.js`
- **Fullscreen System (`toggleFullscreen`, `updateFullscreenUI`):** Handles `document.documentElement.requestFullscreen()` and `document.exitFullscreen()` with `fullscreenchange` event synchronization.
- **Replay Speed Controller:** Integrated `REPLAY_SPEEDS = [1, 2, 0.5]` array and `toggleReplaySpeed()`, dynamically adjusting the replay timer interval.
- **Euler Lab Topology & Renderer (`renderEulerLab`):** Defined topological coordinate models for Königsberg (`KONIGSBERG_NODES`, `KONIGSBERG_BRIDGES`) and House of Euler (`HOUSE_NODES`, `HOUSE_EDGES`). Computes degrees, parity states, renders SVG elements, and renders educational explanations.
- **Eulerian Trail Animator (`simulateEulerianTrail`):** Steps through valid Eulerian paths, activating glow states, haptic ticks, and musical audio tones.
- **Keyboard & Click Event Listeners:** Bound `E` / `e` to open Euler Lab, `F` / `f` to toggle Fullscreen, and wired modal tabs and action buttons.

### Verification
- `node -c script.js`: 0 syntax errors.
- Automated verification suite (`scratch/test_iteration7.js`):
  - Verified all 61 static and dynamic DOM IDs exist in `index.html` (100% PASS).
  - Validated mathematical degree parity: Königsberg 7 bridges (4 odd -> impossible), Königsberg 8 bridges (2 odd -> solvable), House of Euler (2 odd -> solvable) (100% PASS).
  - Validated Eulerian trail traversal uniqueness (each edge visited exactly once) (100% PASS).
  - Verified all new CSS selectors (100% PASS).

---

## [Iteration #6] - Classroom Sound Ergonomics, Mobile Haptics, Telemetry HUD & Eulerian vs. Hamiltonian Concept Card

### Reviewer Critique & Sprint Ticket Summary
- **School Classroom Ergonomics & Sound Management:**
  - In secondary school computer laboratories and classroom environments, having sound unmuted by default without an easy toggle disrupts neighboring students and teachers.
  - Added a dedicated, high-visibility **Audio Mute/Unmute Toggle (`#sound-toggle-btn`)** in the header with custom SVG icons (`#sound-icon-on`, `#sound-icon-off`).
  - Persisted user mute preferences via `localStorage('neonpath_muted')`.
  - Bound keyboard hotkey `[V]` for fast toggling.
  - Procedural sound synthesis bypasses execution when muted, saving CPU cycles.
- **Tactile Immersion via Web Vibration API:**
  - Integrated multi-pattern tactile haptic feedback (`triggerHaptic`) for mobile touch devices:
    - `snap`: Single crisp 12ms impulse upon valid grid progression.
    - `error`: Double-pulse buzz (`[25ms, 30ms, 25ms]`) upon invalid path moves or constraint violations.
    - `undo`: Distinct 18ms notch vibration on backtrack.
    - `win`: Rich rhythmic victory cadence (`[40ms, 50ms, 40ms, 50ms, 80ms]`) on level clearance.
- **Problem-Solving Telemetry & Metacognitive Awareness:**
  - Added `#telemetry-counter` (`Moves: X • Undos: Y`) into the Hamiltonian Progress HUD.
  - Encourages students to reflect on their trial-and-error ratio versus deliberate algorithmic planning (backtracking metric).
- **Eulerian vs. Hamiltonian Discrete Mathematics Concept Inspector:**
  - Added a pedagogical comparative breakdown card inside `#info-overlay`:
    - **Eulerian Path:** Traverses all *edges* once, $O(E)$ polynomial time (P-problem), verified by Euler's degree parity theorem.
    - **Hamiltonian Path:** Traverses all *vertices* once, NP-Complete problem, requiring heuristics (e.g. Warnsdorff), decomposition, and systematic backtracking.

### Implemented Changes & Code Diffs

#### 1. `index.html`
- Added `#sound-toggle-btn` to header controls.
- Added `#telemetry-counter` to `.progress-stats` in the Hamiltonian Progress HUD.
- Added `.euler-hamilton-comparison` card inside `#info-overlay` highlighting $O(E)$ vs. NP-Complete computational complexity.
- Updated keyboard hint bar to display `• V = Sound`.
- Bumped asset versions to `style.css?v=7` and `script.js?v=10`.

#### 2. `style.css`
- Added styles for `#sound-toggle-btn` and `#sound-toggle-btn.muted` with crimson warning tint.
- Added `.stat-telemetry` monospace badge styling for the telemetry counter.
- Styled `.euler-hamilton-comparison`, `.comp-cards`, `.comp-card.eulerian`, and `.comp-card.hamiltonian` with dual-color visual identity.

#### 3. `script.js`
- **Audio State & Persistence:** Added `MUTE_STORAGE_KEY`, `isMuted` initialized from `localStorage`, and `updateSoundUI()` / `toggleSound()`.
- **Audio Guards:** Added early-return bypass `if (isMuted) return;` across all synthesizer methods (`playStepTone`, `playUndoTone`, `playErrorTone`, `playWinChime`).
- **Tactile Engine (`triggerHaptic`):** Implemented pattern-based `navigator.vibrate` calls for `'snap'`, `'error'`, `'undo'`, and `'win'`.
- **Telemetry State:** Added `moveCount` and `undoCount` variables, resetting on `initLevel()` and incrementing on step and undo transitions.
- **Keyboard Handling:** Bound `V` / `v` key to `toggleSound()`.
- **Event Listeners:** Bound `#sound-toggle-btn` click and initialized sound UI on `DOMContentLoaded`.

### Verification
- `node -c script.js`: 0 syntax errors.
- Automated verification script (`scratch/test_iteration6.js`):
  - Verified all 47 DOM IDs in `script.js` exist in `index.html` (100% PASS).
  - Verified audio mute, haptic patterns, and telemetry tracking logic (100% PASS).
  - Verified CSS coverage for new elements (100% PASS).

---

## [Iteration #5] - "Graph Architect" Level Sandbox, Solvability Verifier & Zero-Server Peer URL Sharing

### Reviewer Critique & Sprint Ticket Summary
- **Constructionist Learning & Peer Problem Posing (Seymour Papert):**
  - The highest level of computational understanding occurs when students transition from puzzle *consumers* into puzzle *designers*. Creating solvable grid graphs requires students to actively reason about degree parities, cut vertices, directed flow cycles, and sequential waypoint checkpoints.
  - Implemented **"Graph Architect" (โหมดสถาปนิกกราฟ)**: an interactive level creator modal allowing secondary students and STEM educators to author custom Hamiltonian graph puzzles.
- **Interactive Tool Palette & Grid Sizing:**
  - Dynamic grid sizing: `3×3`, `4×4`, `5×5`.
  - Tool palette:
    - `🟢 จุดเริ่ม (Start)`: Repositions the starting vertex with real-time validation.
    - `✕ กำแพง (Obstacle)`: Places/removes graph barriers.
    - `➡️ ทางเดียว (One-Way)`: Configures directed digraph arrows (cycles `↑ → ↓ ← → remove`).
    - `① จุดตรวจ (Waypoint)`: Places ordered topological checkpoints (1, 2, 3...).
    - `🧹 ลบ (Clear)`: Resets individual cell constraints.
- **Automated Mathematical Solvability Validator:**
  - Integrated the Warnsdorff DFS solver directly into the builder (`#verify-custom-btn`). Students can click to verify their puzzle's solvability in milliseconds.
  - If solvable: Awards green confirmation banner displaying the verified Hamiltonian step count and unlocks the "Play" and "Share" buttons.
  - If unsolvable: Provides pedagogical feedback explaining why no Hamiltonian path exists (e.g. isolated corner cell, impossible directed cycle, or severed components).
- **Zero-Server Peer URL Hash Sharing:**
  - Custom puzzle configurations are encoded into a compact Base64 URL fragment (`#custom=<base64>`).
  - Clicking "🔗 แชร์ลิงก์ (Share)" copies the link to the clipboard. Students can paste it directly into LINE, Discord, or Google Classroom.
  - When peers open the link, the game decodes the configuration on load, displays a special "Custom Puzzle by Classmate" badge, and launches the peer-created puzzle immediately without requiring any database or backend server.

### Implemented Changes & Code Diffs

#### 1. `index.html`
- Added `#architect-btn` to header controls with tool icon and shortcut `[M]`.
- Added `#architect-modal` containing size selectors, palette tools, `#architect-grid`, status banner (`#architect-status`), and action buttons (`#verify-custom-btn`, `#play-custom-btn`, `#share-custom-btn`).
- Updated keyboard hint bar to include `M = Architect`.
- Bumped asset versions to `style.css?v=6` and `script.js?v=9`.

#### 2. `style.css`
- Added styling for `#architect-modal`, `.architect-modal-box`, and `.architect-header`.
- Styled `.architect-palette` and `.palette-btn` with active tool glowing borders.
- Styled `#architect-grid` and `.arch-cell` with states for start (`.arch-start`), obstacles (`.arch-obstacle`), one-way arrows (`.arch-oneway-*`), and waypoints (`.arch-waypoint`).
- Styled status banner (`.architect-status.solvable`, `.architect-status.unsolvable`) and action buttons.

#### 3. `script.js`
- **Builder State Engine:** Added `archSize`, `archTool`, `archStartCell`, `archObstacles`, `archOneWay`, and `archWaypoints`.
- **Builder Renderer (`renderArchitectGrid`):** Generates interactive cells matching chosen grid size and visual constraints.
- **Cell Mutation Handler (`handleArchCellClick`):** Dynamically applies tool actions and invalidates verification on edit.
- **Custom Solvability Checker (`verifyArchitectLevel`):** Employs degree-greedy DFS to certify mathematical solvability.
- **Instant Play & URL Serialization (`playCustomLevel`, `shareCustomLevel`):** Encodes payload into URL fragment and switches game state.
- **Deep-Link URL Decoder (`loadCustomLevelFromHash`):** Detects `#custom=` on `DOMContentLoaded` and launches custom puzzle seamlessly.
- **Keyboard Handling:** Bound key `M` / `m` to toggle the Architect modal.

### Verification
- `node -c script.js`: 0 syntax errors.
- All 43 unique DOM element IDs verified present in `index.html`.
- Automated test script validated custom level serialization, Base64 decoding, and DFS solvability with one-way arrows and waypoints (100% PASS).

---

## [Iteration #4] - Socratic Concept Reflection Cards, Path Step Order Numbers & Algorithmic Replay

### Reviewer Critique & Sprint Ticket Summary
- **Metacognitive Reflection & Concept Solidification (Kolb's Experiential Cycle):**
  - Solving puzzles through trial-and-error often leaves students unaware of the discrete mathematics principles that governed their success.
  - Deployed an interactive **Socratic Computational Thinking Reflection Engine** inside the victory modal (`#reflection-container`). After clearing each curated level (Levels 1–9), students are presented with a targeted multiple-choice inquiry question testing the key concept introduced in that level:
    - Level 1: Why corner cells ($\deg=2$) require early prioritization.
    - Level 2: Why traversing the center vertex prematurely creates disconnected components.
    - Level 3: Identifying the Cut Vertex (Articulation Point) bottleneck.
    - Level 4: Asymmetric state transitions in Directed Digraphs ($\text{In-degree} \ne \text{Out-degree}$).
    - Level 5: Directed cycles and avoiding Deadlock Traps in the rotary junction.
    - Level 6: State space reduction via Decomposition and Algorithm Design.
    - Level 7: Topological Sorting for dependency resolution (e.g. Build pipelines).
    - Level 8: Divide and Conquer strategies with checkpoints.
    - Level 9: Multi-Constraint Optimization across degrees, digraphs, and waypoints.
  - Answering correctly rewards +100 Concept XP, plays an uplifting tone, and reveals a high-clarity academic breakdown. Incorrect answers give constructive formative feedback and encourage re-trying without penalty.
- **Algorithmic Path Replay (`▶ Replay`):**
  - Integrated an automated step-by-step playback engine (`playSolutionReplay`). Students can watch their Hamiltonian path re-trace itself at 170ms intervals accompanied by the ascending pentatonic chime scale, visually demonstrating algorithmic execution order.
- **Chronological Path Step Badges:**
  - Upon clearing a level or during replay, visited cells render glowing numerical step indicators (`1, 2, 3 ... N`) in the upper-left corner, enabling students to analyze the complete sequence of their Hamiltonian tour.

### Implemented Changes & Code Diffs

#### 1. `index.html`
- Replaced simple victory overlay with structured `.victory-modal-box`.
- Added `.victory-header`, `#reflection-container` (tag, question, options, feedback), and `.victory-actions` (`#replay-path-btn` and `#next-level-btn`).
- Bumped asset cache busters to `style.css?v=5` and `script.js?v=8`.

#### 2. `style.css`
- Added glassmorphic victory card styling (`.victory-modal-box`) with animated bouncing trophy.
- Added responsive styling for `.reflection-container`, `.reflection-tag`, `.reflection-opt-btn` (with hover, `.correct`, and `.incorrect` transitions), and `.reflection-feedback`.
- Styled `.replay-btn` with gold neon border and glow.
- Styled `.step-order-badge` positioned inside visited path cells.

#### 3. `script.js`
- **Reflection Database (`levelReflections`):** Curated 9 rich pedagogical questions in Thai with discrete math concepts.
- **Reflection Renderer (`renderReflectionCard`):** Dynamically mounts questions, manages button states, audio feedback, and unlocks explanatory notes.
- **Algorithmic Replay (`playSolutionReplay`):** Sequentially animates the completed path with synchronized audio tones.
- **Visual Chronology:** Updated `updateCellVisuals()` to render `.step-order-badge` inside `.cell.path` upon victory.
- **Event Binding:** Wired `#replay-path-btn` to replay and reset timers on level transitions.

### Verification
- `node -c script.js`: 0 syntax errors.
- All 35 unique element IDs verified present in `index.html`.
- Automated test script validated all 9 reflections (question format, options count, answer bounds, explanations) and confirmed 100% solvability of all curated levels.

---

## [Iteration #3] - Curated Pedagogical Curriculum, Directed Digraphs (One-Way Paths), Sequential Waypoints & Progress Drawer

### Reviewer Critique & Sprint Ticket Summary
- **Pedagogical Efficacy & Curriculum Progression:**
  - Transitioned the game from purely random puzzle generation into a structured 3-Chapter, 9-Level pedagogical curriculum + Level 10 Infinite Procedural Mode:
    - **Chapter 1 (Levels 1–3) — Degrees & Hamiltonian Foundations:** Teaches corner traps ($\deg(v)=2$), perimeter paths, and cut-vertex bridges.
    - **Chapter 2 (Levels 4–6) — Directed Digraphs & Network Flow:** Introduces directional one-way arrows ($\vec{e} = (u \to v)$) demonstrating directed graph invariants and irreversible network flow.
    - **Chapter 3 (Levels 7–9) — Topological Sort & Sequential Waypoints:** Introduces ordered checkpoints (①, ②, ③) requiring students to decompose the route into sub-goals and execute topological planning.
- **Puzzle Mechanics & Constraint Engine:**
  - Designed, verified, and implemented `isStepAllowed(fromIdx, toIdx, currentPath)` constraint engine enforcing directional exits and strictly ascending checkpoint acquisition.
  - Rejection feedback: Invalid moves trigger a distinct detuned deflection tone, error flash, and instructional toast in Thai explaining the exact rule violation.
  - Seamless integration with the Warnsdorff DFS solver and candidate magnetic snapping.
- **Player Experience & Persistence:**
  - Added an interactive **Level Select Modal (Drawer)** displaying level cards with grid sizes, title, pedagogical concept, clear status (⭐), and player's personal best completion times (`mm:ss`).
  - Progress is persisted locally via `localStorage` under `line_tracing_puzzle_progress_v1`.
  - Accessible via the `#level-display` header trigger or keyboard shortcut `L`.

### Implemented Changes & Code Diffs

#### 1. `index.html`
- Upgraded `#level-display` into an interactive `.level-select-trigger` with dropdown glyph.
- Added `#level-modal` and `#level-grid-list` with close button `#close-level-modal-btn`.
- Added `#level-meta-bar` displaying `#level-title-display` and `#concept-badge-display`.
- Updated desktop shortcut hint to include `L = Levels`.
- Bumped asset cache busters to `style.css?v=4` and `script.js?v=7`.

#### 2. `style.css`
- Added `.level-select-trigger` and `.level-meta-bar` badge styling.
- Styled `.cell.oneway-tile` with animated directional arrow indicators (`↑`, `↓`, `←`, `→`).
- Styled `.cell.waypoint-node` with glowing gold circular badges and `.waypoint-collected` neon teal transitions.
- Added responsive layout and card styles for `.level-modal-box`, `.level-grid-list`, and `.level-card` (with active and completed states).

#### 3. `script.js`
- **Curated Levels Schema:** Defined 9 verified solvable configurations with sizes, obstacles, one-way vectors, and waypoints.
- **Persistence Engine:** Added `getProgress()`, `saveLevelClear(levelId, timeSeconds)`, and `formatSeconds(sec)`.
- **Constraint Checker (`isStepAllowed`):** Enforces one-way orientation and prerequisite waypoint visits before accepting a move.
- **Dynamic Level Drawer (`renderLevelModal`):** Populates level cards with completion stars, time records, and instant level switching.
- **Keyboard Listener:** Added `L` / `l` shortcut to toggle the Level Select drawer; updated Escape and Enter handlers.
- **Integrated Solvability:** Updated `getValidCandidates()`, `stepForward()`, and `findSolution()` with the constraint engine.

### Verification
- Headless automated solver verified 100% solvability of all 9 curated levels.
- DOM validation confirmed all 30 unique element IDs present in `index.html`.
- Constraint engine unit tests passed 5/5 assertions for directional flow and ordered waypoints.

---

## [Iteration #2] - Graph Theory Topological Analyzer, Socratic Hints & Vertex Degree Mode

### Reviewer Critique & Sprint Ticket Summary
- **Pedagogical Efficacy (Graph Theory & Computational Thinking):**
  - Replaced opaque "black-box" hints with an authentic **Socratic Diagnostic Engine**. Rather than merely flashing cells red, the engine models the puzzle as an induced grid subgraph $G' = G[V \setminus (O \cup P)]$, evaluates remaining vertex degrees, runs BFS flood fill to detect disconnected components, and computes bipartite checkerboard parity invariants.
  - When students get trapped, the engine diagnoses the exact graph-theoretical root cause:
    - `DISCONNECTED_ISLANDS`: The path severed the remaining grid into $\ge 2$ mutually unreachable components (Cut Vertex / Articulation Point violation).
    - `ISOLATED_CELL`: An unvisited cell has remaining $\deg(v) = 0$.
    - `MULTIPLE_DEAD_ENDS`: Two or more unvisited cells have $\deg(v) \le 1$.
    - `PARITY_IMBALANCE`: Bipartite alternating reachability is mathematically violated.
- **Puzzle Design & Progression:**
  - Introduced an interactive **Graph Theory Mode (`🔍 Graph Mode` / Key G)**. When enabled, live vertex degrees are overlaid directly on each unvisited cell. Cells with $\deg(v) = 1$ dynamically highlight with amber alert badges, visually demonstrating **Warnsdorff's Heuristic** (degree-greedy priority) to students.
- **Player Experience & Game Feel:**
  - Designed the **Socratic Graph Insight Panel** (glassmorphism card with real-time computational guidance, Warnsdorff heuristics, and actionable backtracking prompts).
  - Highlighted root-cause culprit nodes with pulsing crimson borders (`.cell.culprit-node`).

### Implemented Changes & Code Diffs

#### 1. `index.html`
- Added `#graph-mode-btn` to `.header-side.left` with interactive graph nodes SVG icon and shortcut `[G]`.
- Added `#diagnostic-panel` featuring glassmorphism card, status badges, and Socratic advice.
- Updated desktop keyboard shortcuts hint to include `G = Graph Mode`.

#### 2. `style.css`
- Added styles for `.degree-badge`, `.cell.critical-degree` (amber), `.cell.trapped-degree` (red), and `.cell.culprit-node` (pulsing crimson glow).
- Added `.diagnostic-panel` styling with status badges (`.diag-badge.solvable`, `.diag-badge.deadend`), typography, and `.socratic-tip`.
- Added active state glow for `#graph-mode-btn.active`.

#### 3. `script.js`
- **Topological Analyzer (`analyzeGraphTopology`):** Calculates induced vertex degrees, runs BFS for component partitioning, assesses bipartite parity invariants, and diagnoses specific mathematical failure reasons.
- **Warnsdorff DFS Solver:** Optimized `findSolution` using degree-greedy neighbor ordering.
- **Socratic Hint System (`showHint`):** Formulates contextual Thai & English pedagogical explanations tailored to the exact failure mode.
- **Event Listeners:** Bound `#graph-mode-btn`, `#close-diagnostic-btn`, and keypress `G` / `g`.

### Verification
- `node -c script.js`: 0 syntax errors.
- All 21 required DOM element IDs verified present in `index.html`.
- Headless Node unit tests verified BFS disconnection detection (e.g. middle column bisection $[1, 4, 7]$ accurately flagged as `DISCONNECTED_ISLANDS` with 2 components).

---

## [Iteration #1] - Tactile Magnetic Snapping, Pentatonic Harmonizer & Keyboard Accessibility

### Reviewer Critique & Sprint Ticket Summary
- **Pedagogical Efficacy & Cognitive Load:**
  - Reduced extraneous physical interaction friction so students can focus on mental decomposition and graph exploration.
  - Added real-time Hamiltonian Progress HUD (`Visited: X / Total (Y%)` with glowing neon meter) to give quantitative feedback on path completion.
  - Implemented full keyboard navigation (Arrow keys / WASD, Z / Backspace for Undo, R for Restart, H for Hint) specifically optimized for secondary school students working on Chromebooks and laptops with trackpads.
- **Player Experience & Game Feel:**
  - Designed and deployed a **Magnetic Snapping Engine** that calculates continuous Euclidean distance from the pointer to valid adjacent graph candidates. Eliminates missed cells and corner stutter during fast swipes on mobile touchscreens and desktop mice.
  - Integrated a **Procedural Pentatonic Harmonic Synthesizer** (C4 to C7 scale). Node connections ascend melodically through harmonic intervals ($C_4 \to D_4 \to E_4 \dots$), creating dopamine-rich tactile progression. Backtracking triggers a gentle descending chime, while dead ends trigger a soft, non-abrasive detuned dissonance.
  - Added dedicated **Undo** button in the header alongside Hint and Restart.

### Implemented Changes & Code Diffs

#### 1. `index.html`
- Added `#undo-btn` button with SVG back-arrow and title shortcut `(Z)`.
- Added `.progress-bar-container` with `#node-counter`, `#progress-percent`, and `#path-progress-fill`.
- Added `.desktop-kbd-hint` displaying keyboard shortcut instructions.
- Enriched info modal with mathematical concepts: Hamiltonian Paths, Graph Decomposition, Dead-end Lookahead, and Backtracking Algorithms.
- Bumped asset cache busters to `style.css?v=3` and `script.js?v=6`.

#### 2. `style.css`
- Added styles for `.progress-bar-container`, `.progress-bar-track`, `.progress-bar-fill` with multi-color gradient (`#00ffcc` $\to$ `#00bfff` $\to$ `#ff007f`).
- Added `#undo-btn` styling with sky blue neon palette and disabled state.
- Added `.cell.target-candidate` and `.cell.snap-active` for visual affordance of valid next steps during active drag.
- Added responsive media queries for `.desktop-kbd-hint` and `.header-bottom-row`.

#### 3. `script.js`
- **Audio Synthesis:** Built dual-oscillator procedural synthesizer (fundamental sine + octave overtone + lowpass filter) scaling across 15 pentatonic notes (`PENTATONIC_SCALE`).
- **State & Action Engine:** Modularized `stepForward(targetIdx)` and `undoStep()` with bound audio and visual updates.
- **Magnetic Snapping Engine:** Implemented `checkMagneticSnap(clientX, clientY)` with dynamic candidate Euclidean proximity checking ($r < 0.58 \times \text{cellWidth}$).
- **Keyboard Listener:** Added global keyboard handler mapping Arrow Keys, WASD, Z/Backspace, R, and H.

### Verification
- Syntax verified with `node -c script.js` (exit code 0).
- All 16 required DOM elements verified present in `index.html` via automated Node assertion test.
