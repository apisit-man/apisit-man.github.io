# Neon Path (Line Tracing Puzzle) — Architecture & Codebase Baseline

**Project Path:** `projects/line-tracing-puzzle/`  
**Live URL:** `https://apisit-man.github.io/projects/line-tracing-puzzle/index.html`  
**Target Audience:** Secondary / High School Students (Ages 13–18)  
**Pedagogical Pillars:** Computational Thinking (Decomposition, Pattern Recognition, Abstraction, Algorithms), Discrete Mathematics & Graph Theory (Grid Graphs, Hamiltonian Paths, Vertex Degrees, Bridges/Cut Vertices, Bipartite Parity), Spatial Logic.

---

## 1. Graph & Puzzle Mathematical Representation

### 1.1 Mathematical Formulation
The puzzle is modeled as a **Hamiltonian Path problem on an Induced Subgraph of a Grid Graph**:
- Let $G = (V, E)$ be a 2D square grid graph of dimension $N \times N$, where vertices $v = (x, y) \in \{0, \dots, N-1\}^2$.
- Let $O \subset V$ denote the set of blocked cells (obstacles).
- The playable graph is the induced subgraph $G' = G[V \setminus O]$.
- An edge $(u, v) \in E'$ exists if and only if $\|u - v\|_1 = |u_x - v_x| + |u_y - v_y| = 1$ (Manhattan distance of 1).
- The puzzle objective is to find an ordered sequence of vertices $P = (v_1, v_2, \dots, v_K)$ such that:
  1. $v_1 = s$ (the designated `startCell`).
  2. $K = |V \setminus O| = N^2 - |O|$ (visits every valid cell).
  3. $\forall i \in \{1, \dots, K-1\}, (v_i, v_{i+1}) \in E'$ (consecutive steps are orthogonally adjacent).
  4. $\forall i \neq j, v_i \neq v_j$ (simple path, each vertex visited exactly once without self-intersection).

### 1.2 In-Memory Data Structures
| Variable | Type | Role |
| :--- | :--- | :--- |
| `gridSize` ($N$) | `number` | Dimension of the $N \times N$ matrix (3 to 6). |
| `totalCells` | `number` | Total coordinate slots ($N^2$). |
| `startCell` | `number` | 1D index ($y \times N + x$) of the starting vertex. |
| `obstacles` | `number[]` | List of 1D indices for obstacles/forbidden vertices. |
| `path` | `number[]` | Current ordered sequence of visited vertex indices. |
| `isDrawing` | `boolean` | Flag indicating active pointer drag session. |
| `currentPointerPos` | `{x, y} \| null`| Real-time viewport coordinates of pointer for dynamic rubberband line. |

---

## 2. Core Interaction Loop & State Machine

```
              ┌─────────────────────────────────────────────────┐
              │                   IDLE STATE                    │
              │  (Wait for pointer down on startCell or tip)    │
              └───────────────────────┬─────────────────────────┘
                                      │ PointerDown (Start / Tip)
                                      ▼
              ┌─────────────────────────────────────────────────┐
              │                 DRAWING STATE                   │
              │  - Tracks pointer movement (mouse / touch)      │
              │  - Renders dynamic active SVG rubberband line   │
              └───────┬───────────────────────────────▲─────────┘
                      │                               │
         PointerEnter │ Adjacent & Unvisited          │ PointerEnter Adjacent & Previous Cell
         (Step Ahead) │                               │ (Step Back / Undo)
                      ▼                               │
         ┌─────────────────────────┐     ┌────────────┴────────────┐
         │   path.push(target)     │     │       path.pop()        │
         │   playPop() audio       │     │    playUndo() audio     │
         │   updateCellVisuals()   │     │   updateCellVisuals()   │
         └────────────┬────────────┘     └─────────────────────────┘
                      │
                      ▼
               path.length == targetLength?
                 ├── YES ──► [WIN STATE: playWin(), confetti, modal]
                 └── NO  ──► Continue DRAWING
```

### 2.1 Event Handling Architecture
- **Desktop (Mouse):**
  - `mousedown` on `.cell`: triggers `handlePointerDown(e)`.
  - `mouseenter` on `.cell`: triggers `handlePointerEnter(e)` to push new cell or pop on backtrace.
  - `mousemove` on `document`: updates `currentPointerPos` and calls `drawPathLines()` for sub-pixel elastic line tracking.
  - `mouseup` on `document`: cancels `isDrawing` and snaps back to vertex center.
- **Mobile (Touch):**
  - `touchstart` on `#grid`: delegates to `handlePointerDown`.
  - `touchmove` on `#grid`: intercepts default scrolling (`e.preventDefault()`), queries `document.elementFromPoint(x, y)` to emulate `mouseenter`.
  - `touchend` on `document`: cancels drawing state.
- **Undo / Reset:**
  - Dynamic backtrack: moving the finger back to `path[path.length - 2]` pops the last node.
  - Clicking `startCell` while drawing resets the entire path back to `[startCell]`.
  - Explicit UI restart button reinitializes the level.

---

## 3. Level Progression & Difficulty Scaling

The baseline progression is defined in `levelConfigs`:
```javascript
const levelConfigs = [
    { size: 3, numObstacles: 0 }, // Level 1 (9 cells)
    { size: 3, numObstacles: 1 }, // Level 2 (8 cells)
    { size: 4, numObstacles: 1 }, // Level 3 (15 cells)
    { size: 4, numObstacles: 2 }, // Level 4 (14 cells)
    { size: 5, numObstacles: 2 }, // Level 5 (23 cells)
    { size: 5, numObstacles: 3 }, // Level 6 (22 cells)
    { size: 6, numObstacles: 4 }  // Level 7 (32 cells)
];
```
- **Procedural Level Generator:** Runs a Monte Carlo start/obstacle placement loop combined with a brute-force DFS validator capped at 3,000 recursive steps to guarantee solvability.
- **Hint Engine:** Brute-force DFS solver capped at 100,000 steps. If the current player path can be extended into a complete Hamiltonian path, it highlights the immediate next step in shimmering gold (`hint-flash`). If the current path is trapped in a topological dead end, it flashes red (`error-flash`).

---

## 4. Identified Pain Points & Pedagogical Opportunities

### 4.1 Pedagogical & Computational Thinking Gaps
1. **Opaque "Black Box" Hints:** When a student creates an unsolvable configuration, the game only flashes red or tells them the next move blindly. It misses the opportunity to teach:
   - **Vertex Degree & Dead Ends:** If any unvisited vertex in $G' \setminus P$ has degree $\le 1$ (and is not the end of the path), it can never be entered and exited. It is an immediate dead end!
   - **Graph Disconnection & Articulation Points:** If the player's path bisects the remaining unvisited grid into two disconnected components, completing the path is topologically impossible.
   - **Bipartite Parity (Checkerboard Invariant):** Grid graphs are 2-colorable bipartite graphs $V = V_{black} \cup V_{white}$. Every step alternates color. If $|V_{white}| - |V_{black}| > 1$, no Hamiltonian path can exist!
2. **Lack of Conceptual Scaffolding:** Procedural generation generates random shapes without pedagogical intention (e.g. Level 1 could teach bottleneck nodes; Level 2 could teach corner forced moves; Level 3 could introduce one-way or mandatory nodes).
3. **Missing Metacognitive Prompts:** No post-level reflection on algorithms, Hamiltonian complexity ($NP$-complete in general planar graphs, solvable via backtracking and heuristics), or decomposition.

### 4.2 Game Feel & UX Friction Points
1. **Touch Drag Snapping & Boundary Precision:** `document.elementFromPoint` in high-speed touch moves can miss cell transitions if the finger skims across corners. A proximity/distance-to-center snapping algorithm is significantly smoother.
2. **Audio Scaling:** Audio feedback uses flat sine frequencies (`400Hz` on pop). Introducing **ascending pentatonic frequencies** ($f_k = f_0 \times 2^{k/12}$) as the player connects more nodes creates dopamine-rich acoustic progression.
3. **Visual Feedback & HUD:**
   - Missing live progress indicator (e.g., `12 / 16 Nodes (75%)`).
   - Missing explicit visual cues for "Forced Moves" (vertices with degree 1 in the remaining subgraph).
   - Missing keyboard accessibility (Arrow keys / WASD to step, `Z` / `U` for undo, `R` for restart).
   - Missing responsive landscape / tablet optimization.

---

*Baseline established on 2026-09-19 by EdTech & Game Engineering Team.*
