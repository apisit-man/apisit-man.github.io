/* ============================================================================
   Circuit Lab — Wire routing (pure functions, no DOM)
   - Terminals sit on an 8 px lattice, so every wire can be routed on the same grid.
   - Wires leave a terminal straight along its outward direction (a short "stub"),
     then use A* with a bend penalty to find a clean orthogonal path that avoids
     component bodies and labels and prefers not to overlap other wires.
   - Corners are rounded for a professional schematic look.
   ============================================================================ */

export const GRID = 8;
export const STUB = 24;
export const TERM = 56;
const MARGIN = 136;
const TURN_COST = 5;
const OVERLAP_COST = 6;
const DIRS = [[1, 0], [0, 1], [-1, 0], [0, -1]];

const snap = v => Math.round(v / GRID) * GRID;
const dirIndex = (dx, dy) => DIRS.findIndex(d => d[0] === dx && d[1] === dy);

/** Outward unit direction of terminal 'a' or 'b' for a component. */
export function exitDir(c, t) {
  const sign = t === 'a' ? -1 : 1;
  const th = (c.rotation || 0) * Math.PI / 180;
  return { dx: Math.round(sign * Math.cos(th)), dy: Math.round(sign * Math.sin(th)) };
}

/** Terminal position plus its outward direction. */
export function terminalInfo(c, t) {
  const { dx, dy } = exitDir(c, t);
  return { x: c.x + dx * TERM, y: c.y + dy * TERM, dx, dy };
}

export function isVertical(c) {
  const r = ((c.rotation || 0) % 180 + 180) % 180;
  return r === 90;
}

/** Where a component's text labels sit, relative to the component centre (never rotated). */
export function labelLayout(c) {
  return isVertical(c)
    ? { vertical: true, x: 46, nameY: -3, readY: 14, anchor: 'start' }
    : { vertical: false, x: 0, nameY: 56, readY: 73, anchor: 'middle' };
}

/** Axis-aligned keep-out rectangles for component bodies and their labels. */
export function obstacleRects(components, pad = GRID) {
  const rects = [];
  for (const c of components) {
    const v = isVertical(c);
    const hw = v ? 32 : 48, hh = v ? 48 : 32;
    rects.push({ id: c.id, x1: c.x - hw - pad, y1: c.y - hh - pad, x2: c.x + hw + pad, y2: c.y + hh + pad });
    if (v) rects.push({ id: c.id, x1: c.x + 40, y1: c.y - 20, x2: c.x + 170, y2: c.y + 28 });
    else rects.push({ id: c.id, x1: c.x - 76, y1: c.y + hh, x2: c.x + 76, y2: c.y + hh + 68 });
  }
  return rects;
}

class MinHeap {
  constructor() { this.a = []; }
  get size() { return this.a.length; }
  push(item) {
    const a = this.a; a.push(item);
    let i = a.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (a[p].f <= a[i].f) break;
      [a[p], a[i]] = [a[i], a[p]]; i = p;
    }
  }
  pop() {
    const a = this.a, top = a[0], last = a.pop();
    if (a.length) {
      a[0] = last;
      let i = 0;
      for (;;) {
        const l = i * 2 + 1, r = l + 1;
        let m = i;
        if (l < a.length && a[l].f < a[m].f) m = l;
        if (r < a.length && a[r].f < a[m].f) m = r;
        if (m === i) break;
        [a[m], a[i]] = [a[i], a[m]]; i = m;
      }
    }
    return top;
  }
}

function simplify(pts) {
  const out = [];
  for (const p of pts) {
    const n = out.length;
    if (n && out[n - 1].x === p.x && out[n - 1].y === p.y) continue;
    if (n >= 2) {
      const a = out[n - 2], b = out[n - 1];
      if ((a.x === b.x && b.x === p.x) || (a.y === b.y && b.y === p.y)) { out[n - 1] = p; continue; }
    }
    out.push(p);
  }
  return out;
}

/**
 * Route a wire between two terminals.
 * @param a,b       terminalInfo() results
 * @param obstacles obstacleRects() result
 * @param usage     Map<string, number> of grid cells already used by other wires (optional)
 * @returns {{points:{x,y}[], cells:string[]}}
 */
export function routeWire(a, b, obstacles = [], usage = null) {
  const s = { x: a.x + a.dx * STUB, y: a.y + a.dy * STUB };
  const e = { x: b.x + b.dx * STUB, y: b.y + b.dy * STUB };
  const fallback = () => ({
    points: simplify(
      a.dx !== 0
        ? [a, s, { x: s.x, y: e.y }, e, b]
        : [a, s, { x: e.x, y: s.y }, e, b]
    ),
    cells: []
  });

  const minX = snap(Math.min(s.x, e.x)) - MARGIN, maxX = snap(Math.max(s.x, e.x)) + MARGIN;
  const minY = snap(Math.min(s.y, e.y)) - MARGIN, maxY = snap(Math.max(s.y, e.y)) + MARGIN;
  const W = Math.round((maxX - minX) / GRID) + 1, H = Math.round((maxY - minY) / GRID) + 1;
  const toIx = x => Math.round((x - minX) / GRID), toIy = y => Math.round((y - minY) / GRID);
  const sx = toIx(s.x), sy = toIy(s.y), ex = toIx(e.x), ey = toIy(e.y);
  if (sx < 0 || sy < 0 || ex < 0 || ey < 0 || sx >= W || sy >= H || ex >= W || ey >= H) return fallback();

  const blockedCache = new Map();
  const blocked = (ix, iy) => {
    if ((ix === sx && iy === sy) || (ix === ex && iy === ey)) return false;
    const key = iy * W + ix;
    let v = blockedCache.get(key);
    if (v === undefined) {
      const x = minX + ix * GRID, y = minY + iy * GRID;
      v = obstacles.some(r => x >= r.x1 && x <= r.x2 && y >= r.y1 && y <= r.y2);
      blockedCache.set(key, v);
    }
    return v;
  };

  const startDir = dirIndex(a.dx, a.dy);
  const endExit = dirIndex(b.dx, b.dy);
  const idx = (ix, iy, d) => (iy * W + ix) * 4 + d;
  const g = new Map(), from = new Map();
  const heap = new MinHeap();
  const h = (ix, iy) => Math.abs(ix - ex) + Math.abs(iy - ey);
  const startKey = idx(sx, sy, startDir);
  g.set(startKey, 0);
  heap.push({ f: h(sx, sy), ix: sx, iy: sy, d: startDir, k: startKey });

  let goalKey = -1, guard = 0;
  while (heap.size && guard++ < 60000) {
    const cur = heap.pop();
    const cg = g.get(cur.k);
    if (cur.f - h(cur.ix, cur.iy) > cg + 1e-9) continue; // stale entry
    if (cur.ix === ex && cur.iy === ey && (cur.k === startKey || cur.d !== endExit)) { goalKey = cur.k; break; }
    for (let nd = 0; nd < 4; nd++) {
      if (nd === (cur.d + 2) % 4) continue; // never reverse
      const nx = cur.ix + DIRS[nd][0], ny = cur.iy + DIRS[nd][1];
      if (nx < 0 || ny < 0 || nx >= W || ny >= H || blocked(nx, ny)) continue;
      let cost = 1 + (nd !== cur.d ? TURN_COST : 0);
      if (usage && usage.has(`${minX + nx * GRID},${minY + ny * GRID}`)) cost += OVERLAP_COST;
      const nk = idx(nx, ny, nd), ng = cg + cost;
      if (ng < (g.get(nk) ?? Infinity)) {
        g.set(nk, ng); from.set(nk, cur.k);
        heap.push({ f: ng + h(nx, ny), ix: nx, iy: ny, d: nd, k: nk });
      }
    }
  }
  if (goalKey < 0) return fallback();

  const cellsRev = [];
  for (let k = goalKey; k !== undefined; k = from.get(k)) {
    const cell = Math.floor(k / 4);
    cellsRev.push({ x: minX + (cell % W) * GRID, y: minY + Math.floor(cell / W) * GRID });
  }
  const route = cellsRev.reverse();
  return {
    points: simplify([{ x: a.x, y: a.y }, ...route, { x: b.x, y: b.y }]),
    cells: route.map(p => `${p.x},${p.y}`)
  };
}

/** Free-hand preview while the cursor is not over a terminal. */
export function routeToPoint(a, p) {
  const s = { x: a.x + a.dx * STUB, y: a.y + a.dy * STUB };
  const mid = a.dx !== 0 ? { x: s.x, y: p.y } : { x: p.x, y: s.y };
  return simplify([{ x: a.x, y: a.y }, s, mid, { x: p.x, y: p.y }]);
}

/** SVG path string with rounded corners. */
export function pointsToPath(pts, radius = 9) {
  if (!pts.length) return '';
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const p0 = pts[i - 1], p = pts[i], p1 = pts[i + 1];
    const l1 = Math.hypot(p.x - p0.x, p.y - p0.y), l2 = Math.hypot(p1.x - p.x, p1.y - p.y);
    const r = Math.min(radius, l1 / 2, l2 / 2);
    const a = { x: p.x - (p.x - p0.x) / l1 * r, y: p.y - (p.y - p0.y) / l1 * r };
    const b = { x: p.x + (p1.x - p.x) / l2 * r, y: p.y + (p1.y - p.y) / l2 * r };
    d += ` L ${a.x} ${a.y} Q ${p.x} ${p.y} ${b.x} ${b.y}`;
  }
  const last = pts[pts.length - 1];
  return d + ` L ${last.x} ${last.y}`;
}

/** Nearest terminal to a point within `radius`, optionally excluding one id. */
export function nearestTerminal(components, p, radius = 26, excludeId = null) {
  let best = null, bestD = radius;
  for (const c of components) {
    for (const t of ['a', 'b']) {
      const id = `${c.id}:${t}`;
      if (id === excludeId) continue;
      const q = terminalInfo(c, t);
      const dist = Math.hypot(q.x - p.x, q.y - p.y);
      if (dist <= bestD) { best = id; bestD = dist; }
    }
  }
  return best;
}

/** Route every wire, spreading wires apart where possible. Returns Map<wireId, points[]>. */
export function routeAll(components, wires) {
  const byId = new Map(components.map(c => [c.id, c]));
  const obstacles = obstacleRects(components);
  const usage = new Map();
  const out = new Map();
  for (const w of wires) {
    const [fa, ft] = w.from.split(':'), [ta, tt] = w.to.split(':');
    const ca = byId.get(fa), cb = byId.get(ta);
    if (!ca || !cb) continue;
    const { points, cells } = routeWire(terminalInfo(ca, ft), terminalInfo(cb, tt), obstacles, usage);
    out.set(w.id, points);
    for (const cell of cells) usage.set(cell, (usage.get(cell) || 0) + 1);
  }
  return out;
}
