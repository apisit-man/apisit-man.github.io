import * as THREE from 'three';
import { RNG } from './rng.js';
import { CFG, ZONES, zoneIndexAt, gateColors, gateHex } from './config.js';

const UP = new THREE.Vector3(0, 1, 0);

/** ความสูงของตลิ่งสองข้างทาง (ให้ป่าดูมีมิติ) */
export function bankHeight(offset) {
  return Math.max(0, Math.abs(offset) - 6) * 0.075;
}

const smoothstep = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

const LEAF_PALETTE = [
  [0x2f8a54, 0x67bd77, 0x3f9a5a, 0x79c96f, 0x55a866],
  [0x2f8371, 0x74c9ab, 0x3f9d7e, 0x8fd8b4, 0x56b394],
  [0x8a6ade, 0x4cc9f0, 0xb388ff, 0x6fd8ff, 0x9b7bf0],
];

/* --------------------------- shared assets --------------------------- */

let GEO = null;
let M = null;
let GLOW_TEX = null;

function glowTexture() {
  if (GLOW_TEX) return GLOW_TEX;
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.35, 'rgba(255,255,255,0.6)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  GLOW_TEX = new THREE.CanvasTexture(c);
  GLOW_TEX.colorSpace = THREE.SRGBColorSpace;
  return GLOW_TEX;
}

function assets() {
  if (GEO) return;
  GEO = {
    trunk: new THREE.CylinderGeometry(0.2, 0.34, 1, 6, 1),
    trunkThin: new THREE.CylinderGeometry(0.12, 0.2, 1, 5, 1),
    canopy: new THREE.IcosahedronGeometry(1, 0),
    bush: new THREE.IcosahedronGeometry(1, 0),
    rock: new THREE.DodecahedronGeometry(1, 0),
    cone: new THREE.ConeGeometry(0.55, 1, 5, 1),
    shard: new THREE.ConeGeometry(0.22, 1, 4, 1),
    log: (() => {
      const g = new THREE.CylinderGeometry(0.4, 0.42, 2.5, 7, 1);
      g.rotateZ(Math.PI / 2);
      return g;
    })(),
    branch: new THREE.BoxGeometry(2.5, 0.32, 0.55),
    crystal: new THREE.OctahedronGeometry(0.3, 0),
    puddle: new THREE.CircleGeometry(1.15, 14),
  };

  M = {
    ground: new THREE.MeshLambertMaterial({ vertexColors: true }),
    log: new THREE.MeshLambertMaterial({ color: 0x7b5a3d }),
    branch: new THREE.MeshLambertMaterial({ color: 0x5c4630 }),
    crystal: new THREE.MeshStandardMaterial({
      color: 0xffe27a, emissive: 0xffc633, emissiveIntensity: 0.85,
      roughness: 0.2, metalness: 0.25, flatShading: true,
    }),
    puddle: new THREE.MeshBasicMaterial({ color: 0x7fe8dc, transparent: true, opacity: 0.45, depthWrite: false }),
    leafFlat: new THREE.MeshLambertMaterial({ color: 0xffffff, flatShading: true }),
    glow: new THREE.MeshBasicMaterial({ color: 0xffffff }),
    waterFlat: new THREE.MeshBasicMaterial({
      color: 0x2f8f96, transparent: true, opacity: 0.5, depthWrite: false, side: THREE.DoubleSide,
    }),
    lily: new THREE.MeshBasicMaterial({
      color: 0x3f9a5a, transparent: true, opacity: 0.95, depthWrite: false, side: THREE.DoubleSide,
    }),
  };
}

const ZMATS = [];
function zoneMats(zi) {
  if (ZMATS[zi]) return ZMATS[zi];
  const z = ZONES[zi];
  ZMATS[zi] = {
    trunk: new THREE.MeshLambertMaterial({ color: z.trunk }),
    rock: new THREE.MeshLambertMaterial({ color: z.rock, flatShading: true }),
    crystal: new THREE.MeshStandardMaterial({
      color: z.crystal, emissive: z.crystal, emissiveIntensity: 0.3,
      roughness: 0.12, metalness: 0.25, flatShading: true, transparent: true, opacity: 0.94,
    }),
    crystalInst: new THREE.MeshStandardMaterial({
      color: 0xffffff, emissive: 0x4a2f8f, emissiveIntensity: 0.5,
      roughness: 0.14, metalness: 0.3, flatShading: true, transparent: true, opacity: 0.92,
    }),
    glow: new THREE.MeshBasicMaterial({ color: z.accent }),
  };
  return ZMATS[zi];
}

function addInstanced(group, geometry, material, items) {
  if (!items.length) return null;
  const mesh = new THREE.InstancedMesh(geometry, material, items.length);
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const e = new THREE.Euler();
  const v = new THREE.Vector3();
  const sc = new THREE.Vector3();
  const col = new THREE.Color();
  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    e.set(it.tilt || 0, it.rotY || 0, 0, 'YXZ');
    q.setFromEuler(e);
    v.set(it.x, it.y, it.z);
    sc.set(it.sx, it.sy, it.sz);
    m.compose(v, q, sc);
    mesh.setMatrixAt(i, m);
    if (it.color !== undefined) {
      col.setHex(it.color);
      mesh.setColorAt(i, col);
    }
  }
  mesh.instanceMatrix.needsUpdate = true;
  if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  group.add(mesh);
  return mesh;
}

/* ------------------------------- world ------------------------------- */

export class World {
  constructor(scene, path, seed, gates) {
    assets();
    this.scene = scene;
    this.path = path;
    this.seed = seed;
    this.chunks = new Map();
    this.gates = gates;
    this.gateS = gates.map((g) => g.s).sort((a, b) => a - b);
    this.fireflyTex = glowTexture();
    this.ahead = 420;
    this.behind = 60;
    this.elapsed = 0;

    this.gateChunks = new Map();
    for (const g of gates) {
      const ci = Math.floor(g.s / CFG.chunk);
      if (!this.gateChunks.has(ci)) this.gateChunks.set(ci, []);
      this.gateChunks.get(ci).push(g);
    }
    this.numMats = null;
  }

  reset() {
    for (const ch of this.chunks.values()) this._disposeChunk(ch);
    this.chunks.clear();
    if (this.numMats) {
      for (const m of this.numMats) {
        if (m.map) m.map.dispose();
        m.dispose();
      }
      this.numMats = null;
    }
    if (this.bossBoard) {
      if (this.bossBoard.map) this.bossBoard.map.dispose();
      this.bossBoard.dispose();
      this.bossBoard = null;
    }
  }

  _nearGate(s, r) {
    const gs = this.gateS;
    let lo = 0;
    let hi = gs.length - 1;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      const v = gs[mid];
      if (v < s - r) lo = mid + 1;
      else if (v > s + r) hi = mid - 1;
      else return true;
    }
    return false;
  }

  /** อยู่ใน "ทางเดินปลอดภัย" ก่อนถึงประตูคำถามหรือไม่ (แก้ปัญหาโดนของที่มองไม่เห็น) */
  _inCorridor(s) {
    const lo = s - CFG.corridorAfter;
    const hi = s + CFG.corridor;
    let a = 0;
    let b = this.gateS.length - 1;
    let idx = this.gateS.length;
    while (a <= b) {
      const m = (a + b) >> 1;
      if (this.gateS[m] >= lo) {
        idx = m;
        b = m - 1;
      } else {
        a = m + 1;
      }
    }
    return idx < this.gateS.length && this.gateS[idx] <= hi;
  }

  update(playerS, dt) {
    this.elapsed += dt;
    const c0 = Math.max(0, Math.floor((playerS - this.behind) / CFG.chunk));
    const c1 = Math.floor((playerS + this.ahead) / CFG.chunk);

    for (let c = c0; c <= c1; c++) {
      if (!this.chunks.has(c)) this.buildChunk(c);
    }
    for (const [c, ch] of this.chunks) {
      if (c < c0 || c > c1) {
        this._disposeChunk(ch);
        this.chunks.delete(c);
      }
    }

    // animate nearby props
    for (let c = c0; c <= c1 + 1; c++) {
      const ch = this.chunks.get(c);
      if (!ch) continue;
      for (const e of ch.entities) {
        if (!e.alive) continue;
        if (e.kind === 'crystal') {
          e.mesh.rotation.y += dt * 2.3;
          e.mesh.position.y = 1.02 + Math.sin(this.elapsed * 2.2 + e.phase) * 0.13;
          continue;
        }
        // เตือนล่วงหน้า: อุปสรรคที่กำลังจะถึงจะเต้นเป็นจังหวะเบา ๆ
        if (e.kind === 'obstacle') {
          if (!e.baseScale) e.baseScale = e.mesh.scale.clone();
          const d = e.s - playerS;
          const near = d > -4 && d < 24;
          const pulse = near ? 1 + 0.055 * Math.sin(this.elapsed * 9 + e.s * 0.7) : 1;
          e.mesh.scale.copy(e.baseScale).multiplyScalar(pulse);
        }
      }
    }

    // gate fade-out animation
    for (const g of this.gates) {
      const vis = g.visual;
      if (!vis || !vis.active) continue;
      vis.fade = Math.min(1, vis.fade + dt * 1.8);
      const k = 1 - vis.fade;
      vis.root.scale.setScalar(1 + vis.fade * 0.35);
      vis.root.position.y = -vis.fade * 1.2;
      vis.curtains.forEach((cm, i) => {
        cm.opacity = cm.userData.base * k * (i === vis.choice ? 1.4 : 0.3);
      });
      if (vis.fade >= 1) vis.root.visible = false;
    }
  }

  buildChunk(ci) {
    const s0 = ci * CFG.chunk;
    this.path.ensure(s0 + CFG.chunk + 80);
    const group = new THREE.Group();
    const entities = [];
    const disposables = [];
    const rng = new RNG((ci + 3) * 7919 + this.seed * 131);

    this._buildGround(group, s0, disposables);
    this._buildFlora(group, s0, rng, disposables);
    this._buildObstacles(group, s0, rng, entities, disposables);

    const gates = this.gateChunks.get(ci);
    if (gates) {
      for (const g of gates) {
        if (!g.visual) this._buildGate(g, group, disposables);
        else group.add(g.visual.root);
      }
    }

    this.scene.add(group);
    this.chunks.set(ci, { ci, s0, group, entities, disposables, gates: gates || [] });
  }

  _disposeChunk(ch) {
    this.scene.remove(ch.group);
    for (const g of ch.gates) {
      if (g.visual) {
        for (const d of g.visual.disposables) d.dispose && d.dispose();
        g.visual = null;
      }
    }
    for (const d of ch.disposables) d.dispose && d.dispose();
    ch.group.traverse((o) => {
      if (o.isInstancedMesh) o.dispose();
    });
    ch.entities.length = 0;
  }

  entitiesNear(s, r) {
    const c0 = Math.floor((s - r) / CFG.chunk);
    const c1 = Math.floor((s + r) / CFG.chunk);
    let out = null;
    for (let c = c0; c <= c1; c++) {
      const ch = this.chunks.get(c);
      if (!ch) continue;
      if (!out) out = [];
      for (const e of ch.entities) if (e.alive) out.push(e);
    }
    return out;
  }

  /* ----------------------------- ground ----------------------------- */

  _buildGround(group, s0, disposables) {
    const OFFS = [-34, -26, -19, -14, -10, -6.5, -3.4, -1.2, 1.2, 3.4, 6.5, 10, 14, 19, 26, 34];
    const ROWS = 9;
    const nO = OFFS.length;
    const pos = new Float32Array(ROWS * nO * 3);
    const col = new Float32Array(ROWS * nO * 3);
    const idx = [];
    const c = new THREE.Color();
    const cEdge = new THREE.Color();
    const step = CFG.chunk / (ROWS - 1);

    for (let r = 0; r < ROWS; r++) {
      const s = s0 + r * step;
      const f = this.path.frame(s);
      const zi = zoneIndexAt(s);
      const z = ZONES[zi];
      for (let j = 0; j < nO; j++) {
        const o = OFFS[j];
        const x = f.pos.x + f.right.x * o;
        const zz = f.pos.z + f.right.z * o;
        const y = bankHeight(o);
        const k = (r * nO + j) * 3;
        pos[k] = x;
        pos[k + 1] = y;
        pos[k + 2] = zz;

        const tEdge = smoothstep(2.0, 4.6, Math.abs(o));
        c.setHex(z.dirt).lerp(cEdge.setHex(z.ground), tEdge);
        const patch = 0.5 + 0.5 * Math.sin(s * 0.85 + o * 2.1) * Math.sin(s * 0.27 - o * 0.9);
        const n = 0.9 + 0.18 * patch + 0.05 * (0.5 + 0.5 * Math.sin(s * 1.9 + o * 0.7));
        c.multiplyScalar(n * (1 - smoothstep(18, 34, Math.abs(o)) * 0.35));
        col[k] = c.r;
        col[k + 1] = c.g;
        col[k + 2] = c.b;
      }
    }

    for (let r = 0; r < ROWS - 1; r++) {
      for (let j = 0; j < nO - 1; j++) {
        const a = r * nO + j;
        const b = a + 1;
        const cc = a + nO;
        const d = cc + 1;
        idx.push(a, b, cc, b, d, cc);
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    geo.setIndex(idx);
    geo.computeVertexNormals();

    const mesh = new THREE.Mesh(geo, M.ground);
    group.add(mesh);
    disposables.push(geo);
  }

  /* ------------------------------ flora ------------------------------ */

  _buildFlora(group, s0, rng, disposables) {
    const zone = zoneIndexAt(s0 + CFG.chunk / 2);
    const z = ZONES[zone];
    const mats = zoneMats(zone);

    const trunks = [];
    const canopies = [];
    const bushes = [];
    const rocks = [];
    const glows = [];
    const spires = [];
    const puddles = [];
    const lilies = [];

    const push = (arr, x, y, zz, rotY, sx, sy, sz, tilt, color) =>
      arr.push({ x, y, z: zz, rotY, sx, sy, sz, tilt: tilt || 0, color });

    for (const side of [-1, 1]) {
      for (let s = s0; s < s0 + CFG.chunk; s += rng.range(2.0, 3.7)) {
        if (this._nearGate(s, 8)) continue;
        const off = side * rng.range(6.6, 27);
        const f = this.path.frame(s);
        const px = f.pos.x + f.right.x * off;
        const pz = f.pos.z + f.right.z * off;
        const py = bankHeight(off) - 0.05;
        const rotY = rng.range(0, Math.PI * 2);

        if (zone === 0) {
          const h = rng.range(3.6, 7.4);
          const w = rng.range(0.55, 1.0);
          push(trunks, px, py + h * 0.5, pz, rotY, w, h, w, rng.range(-0.06, 0.06));
          const cr = rng.range(1.9, 3.1);
          push(canopies, px, py + h * 0.88, pz, rotY, cr, cr * rng.range(0.75, 1.05), cr, 0,
            rng.pick(LEAF_PALETTE[zone]));
          if (rng.chance(0.75)) {
            const cr2 = cr * rng.range(0.45, 0.7);
            push(canopies, px + rng.range(-1.4, 1.4), py + h * rng.range(0.6, 0.78), pz + rng.range(-1.4, 1.4),
              rotY, cr2, cr2, cr2, 0, rng.pick(LEAF_PALETTE[zone]));
          }
        } else if (zone === 1) {
          const h = rng.range(3.2, 6.2);
          const w = rng.range(0.5, 0.9);
          push(trunks, px, py + h * 0.5, pz, rotY, w, h, w, rng.range(-0.14, 0.14));
          const cr = rng.range(2.2, 3.4);
          push(canopies, px + rng.range(-0.6, 0.6), py + h * 0.82, pz + rng.range(-0.6, 0.6),
            rotY, cr, cr * rng.range(0.42, 0.6), cr, 0, rng.pick(LEAF_PALETTE[zone]));
          // กอหญ้า/กก ริมหางน้ำ
          if (rng.chance(0.55)) {
            const ro = side * rng.range(4.6, 9);
            const rr = this.path.frame(s + rng.range(-1, 1));
            const rx = rr.pos.x + rr.right.x * ro;
            const rz = rr.pos.z + rr.right.z * ro;
            for (let k = 0; k < 4; k++) {
              push(bushes, rx + rng.range(-0.7, 0.7), bankHeight(ro), rz + rng.range(-0.7, 0.7),
                rng.range(0, 6.28), 0.1, rng.range(1.1, 2.4), 0.1, rng.range(-0.2, 0.2), z.leafB);
            }
          }
          // เห็ดเรืองแสง
          if (rng.chance(0.22)) {
            const go = side * rng.range(4.4, 7.5);
            const grx = f.pos.x + f.right.x * go;
            const grz = f.pos.z + f.right.z * go;
            push(glows, grx, bankHeight(go) + rng.range(0.25, 0.6), grz, 0,
              rng.range(0.16, 0.3), rng.range(0.16, 0.34), rng.range(0.16, 0.3), 0);
          }
          // แอ่งน้ำและใบบัว
          if (rng.chance(0.4)) {
            const po = side * rng.range(4.2, 13);
            const rr = this.path.frame(s + rng.range(-2, 2));
            const wsc = rng.range(1.3, 3.1);
            push(puddles, rr.pos.x + rr.right.x * po, bankHeight(po) + 0.05, rr.pos.z + rr.right.z * po,
              rng.range(0, 6.28), wsc, wsc, wsc, -Math.PI / 2);
            const ln = rng.int(1, 3);
            for (let k = 0; k < ln; k++) {
              push(lilies, rr.pos.x + rr.right.x * po + rng.range(-1.4, 1.4),
                bankHeight(po) + 0.07, rr.pos.z + rr.right.z * po + rng.range(-1.4, 1.4),
                rng.range(0, 6.28), rng.range(0.35, 0.6), rng.range(0.35, 0.6), rng.range(0.35, 0.6), -Math.PI / 2);
            }
          }
        } else {
          const h = rng.range(3.4, 8.6);
          const w = rng.range(0.6, 1.7);
          push(spires, px, py + h * 0.5, pz, rng.range(0, 6.28), w, h, w, rng.range(-0.2, 0.2),
            rng.pick(LEAF_PALETTE[2]));
          if (rng.chance(0.5)) {
            const sh = rng.range(1.0, 2.6);
            push(canopies, px + rng.range(-1.6, 1.6), py + sh * 0.5, pz + rng.range(-1.6, 1.6),
              rng.range(0, 6.28), 0.35, sh, 0.35, rng.range(-0.35, 0.35), rng.pick(LEAF_PALETTE[2]));
          }
          if (rng.chance(0.3)) {
            const go = side * rng.range(4.2, 8.5);
            const grx = f.pos.x + f.right.x * go;
            const grz = f.pos.z + f.right.z * go;
            const gh = rng.range(1.0, 2.6);
            push(glows, grx, bankHeight(go) + gh * 0.5, grz, rng.range(0, 6.28),
              rng.range(0.2, 0.42), gh, rng.range(0.2, 0.42), rng.range(-0.3, 0.3));
          }
        }

        // หิน/โขดหิน ประปราย
        if (rng.chance(0.35)) {
          const ro = side * rng.range(4.8, 13);
          const rr = this.path.frame(s + rng.range(-1.5, 1.5));
          push(rocks, rr.pos.x + rr.right.x * ro, bankHeight(ro) + rng.range(0.05, 0.2), rr.pos.z + rr.right.z * ro,
            rng.range(0, 6.28), rng.range(0.3, 0.95), rng.range(0.25, 0.8), rng.range(0.3, 0.95), 0);
        }
      }

      // พุ่มไม้ใกล้ทาง
      for (let s = s0; s < s0 + CFG.chunk; s += rng.range(4.5, 8)) {
        if (this._nearGate(s, 9)) continue;
        const off = side * rng.range(4.4, 6.6);
        const f = this.path.frame(s);
        const px = f.pos.x + f.right.x * off;
        const pz = f.pos.z + f.right.z * off;
        const py = bankHeight(off);
        const sc = rng.range(0.5, 1.15);
        push(bushes, px, py + sc * 0.55, pz, rng.range(0, 6.28), sc, sc * rng.range(0.7, 1.1), sc, 0,
          rng.pick(LEAF_PALETTE[zone]));
      }
    }

    const crystalMat = mats.crystalInst || mats.crystal;
    if (trunks.length) addInstanced(group, zone === 0 ? GEO.trunk : GEO.trunkThin, mats.trunk, trunks);
    if (canopies.length) {
      addInstanced(group, GEO.canopy, zone === 2 ? crystalMat : M.leafFlat, canopies);
    }
    if (spires.length) addInstanced(group, GEO.cone, crystalMat, spires);
    if (bushes.length) addInstanced(group, zone === 2 ? GEO.shard : GEO.bush, zone === 2 ? crystalMat : M.leafFlat, bushes);
    if (rocks.length) addInstanced(group, GEO.rock, mats.rock, rocks);
    if (glows.length) addInstanced(group, zone === 2 ? GEO.shard : GEO.bush, mats.glow, glows);
    if (puddles.length) addInstanced(group, GEO.puddle, M.waterFlat, puddles);
    if (lilies.length) addInstanced(group, GEO.puddle, M.lily, lilies);

    this._buildFireflies(group, s0, rng, zone, disposables);
  }

  _buildFireflies(group, s0, rng, zone, disposables) {
    const count = 42;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const s = s0 + rng.range(0, CFG.chunk);
      const off = (rng.chance(0.5) ? 1 : -1) * rng.range(7, 20);
      const f = this.path.frame(s);
      positions[i * 3] = f.pos.x + f.right.x * off;
      positions[i * 3 + 1] = bankHeight(off) + rng.range(0.5, 3.8);
      positions[i * 3 + 2] = f.pos.z + f.right.z * off;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      size: zone === 2 ? 0.42 : 0.24,
      map: this.fireflyTex,
      color: ZONES[zone].accent,
      transparent: true,
      opacity: zone === 2 ? 0.9 : 0.75,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    group.add(new THREE.Points(geo, mat));
    disposables.push(geo, mat);
  }

  /* --------------------------- obstacles --------------------------- */

  _obstacleKind(zone, rng) {
    const r = rng.next();
    if (zone === 1) {
      if (r < 0.3) return 'log';
      if (r < 0.52) return 'rock';
      if (r < 0.76) return 'branch';
      return 'puddle';
    }
    if (r < 0.36) return 'log';
    if (r < 0.64) return 'rock';
    return 'branch';
  }

  _buildObstacles(group, s0, rng, entities, disposables) {
    for (let s = s0 + 4; s < s0 + CFG.chunk - 3; s += rng.range(11, 17)) {
      if (this._inCorridor(s)) continue;
      if (rng.chance(0.22)) continue;
      const zone = zoneIndexAt(s);
      const f = this.path.frame(s);
      const lane = rng.int(0, 2);
      const lanes = [lane];
      if (rng.chance(0.24)) lanes.push((lane + 1 + rng.int(0, 1)) % 3);
      for (const li of lanes) {
        const kind = this._obstacleKind(zone, rng);
        const e = this._makeObstacle(group, f, s, li, kind, rng, disposables);
        if (e) entities.push(e);
      }
    }

    // ผลึกความรู้
    for (let s = s0 + 2; s < s0 + CFG.chunk; s += rng.range(9, 16)) {
      if (this._nearGate(s, 12)) continue;
      if (rng.chance(0.45)) continue;
      const lane = rng.int(0, 2);
      const n = rng.int(2, 4);
      for (let k = 0; k < n; k++) {
        const cs = s + k * 2.3;
        const f = this.path.frame(cs);
        const laneX = (lane - 1) * CFG.laneWidth;
        const mesh = new THREE.Mesh(GEO.crystal, M.crystal);
        mesh.position.set(f.pos.x + f.right.x * laneX, 1.02, f.pos.z + f.right.z * laneX);
        mesh.rotation.y = rng.range(0, 6.28);
        group.add(mesh);
        entities.push({
          kind: 'crystal', s: cs, laneX, mesh, alive: true,
          phase: rng.range(0, 6.28),
        });
      }
    }
  }

  _makeObstacle(group, f, s, lane, kind, rng, disposables) {
    const laneX = (lane - 1) * CFG.laneWidth;
    const px = f.pos.x + f.right.x * laneX;
    const pz = f.pos.z + f.right.z * laneX;
    const py = bankHeight(laneX);
    const quat = new THREE.Quaternion().setFromRotationMatrix(
      new THREE.Matrix4().makeBasis(f.right.clone(), UP.clone(), f.tangent.clone().negate())
    );

    let mesh = null;
    let height = 0;

    if (kind === 'log') {
      mesh = new THREE.Mesh(GEO.log, M.log);
      mesh.position.set(px, py + 0.42, pz);
      height = 0.84;
    } else if (kind === 'rock') {
      mesh = new THREE.Mesh(GEO.rock, zoneMats(zoneIndexAt(s)).rock);
      const sc = rng.range(0.65, 1.0);
      mesh.scale.set(sc, sc * rng.range(0.8, 1.05), sc);
      mesh.position.set(px, py + 0.55 * sc, pz);
      mesh.rotation.y = rng.range(0, 6.28);
      height = 1.1;
    } else if (kind === 'branch') {
      mesh = new THREE.Mesh(GEO.branch, M.branch);
      mesh.position.set(px, py + 1.45, pz);
      mesh.quaternion.copy(quat);
      const postGeo = new THREE.BoxGeometry(0.16, 2.4, 0.16);
      disposables.push(postGeo);
      for (const sx of [-1.1, 1.1]) {
        const post = new THREE.Mesh(postGeo, M.branch);
        post.position.set(px + f.right.x * sx, py + 1.2, pz + f.right.z * sx);
        group.add(post);
      }
      height = 2.0;
    } else {
      mesh = new THREE.Mesh(GEO.puddle, M.puddle);
      mesh.rotation.x = -Math.PI / 2;
      mesh.rotation.z = rng.range(0, 6.28);
      mesh.position.set(px, py + 0.04, pz);
      mesh.scale.set(rng.range(0.9, 1.4), rng.range(0.7, 1.2), 1);
      height = 0.1;
    }

    if (!mesh) return null;
    group.add(mesh);
    return {
      kind: 'obstacle', type: kind, s, lane, laneX, mesh, alive: true,
      height,
      taken: false,
    };
  }

  /* ------------------------------ gates ------------------------------ */

  _bossBoardMat() {
    if (this.bossBoard) return this.bossBoard;
    const c = document.createElement('canvas');
    c.width = 512;
    c.height = 144;
    const ctx = c.getContext('2d');
    ctx.fillStyle = 'rgba(12,8,2,0.86)';
    ctx.fillRect(0, 0, 512, 144);
    ctx.strokeStyle = '#ffd166';
    ctx.lineWidth = 8;
    ctx.strokeRect(8, 8, 496, 128);
    ctx.fillStyle = '#ffd166';
    ctx.font = '900 64px "Prompt", "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('BOSS GATE  x2', 256, 76);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    this.bossBoard = new THREE.MeshBasicMaterial({ map: tex, transparent: true, side: THREE.DoubleSide });
    return this.bossBoard;
  }

  _numberMats() {
    if (this.numMats) return this.numMats;
    this.numMats = gateHex().map((hex, i) => {
      const c = document.createElement('canvas');
      c.width = c.height = 256;
      const ctx = c.getContext('2d');
      const r = 44;
      ctx.beginPath();
      ctx.moveTo(10 + r, 10);
      ctx.arcTo(246, 10, 246, 246, r);
      ctx.arcTo(246, 246, 10, 246, r);
      ctx.arcTo(10, 246, 10, 10, r);
      ctx.arcTo(10, 10, 246, 10, r);
      ctx.closePath();
      ctx.fillStyle = hex;
      ctx.fill();
      ctx.lineWidth = 9;
      ctx.strokeStyle = 'rgba(255,255,255,0.92)';
      ctx.stroke();
      ctx.fillStyle = '#07130d';
      ctx.font = '900 148px "Prompt", "Segoe UI", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(i + 1), 128, 138);
      const tex = new THREE.CanvasTexture(c);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 4;
      return new THREE.MeshBasicMaterial({ map: tex, transparent: true, side: THREE.DoubleSide });
    });
    return this.numMats;
  }

  _buildGate(g, group, disposables) {
    const f = this.path.frame(g.s);
    const root = new THREE.Group();
    root.position.copy(f.pos);
    root.quaternion.setFromRotationMatrix(
      new THREE.Matrix4().makeBasis(f.right.clone(), UP.clone(), f.tangent.clone().negate())
    );

    const numMats = this._numberMats();
    const vis = { root, curtains: [], nums: [], choice: -1, fade: 0, active: false, disposables: [] };

    for (let i = 0; i < 3; i++) {
      const color = gateColors()[i];
      const lane = new THREE.Group();
      lane.position.x = (i - 1) * CFG.laneWidth;

      const mat = new THREE.MeshStandardMaterial({
        color, emissive: color, emissiveIntensity: 0.5, roughness: 0.35, metalness: 0.25,
      });
      const pillarGeo = new THREE.BoxGeometry(0.15, 3.7, 0.15);
      const p1 = new THREE.Mesh(pillarGeo, mat);
      p1.position.set(-1.08, 1.85, 0);
      const p2 = new THREE.Mesh(pillarGeo, mat);
      p2.position.set(1.08, 1.85, 0);

      const beamGeo = new THREE.BoxGeometry(2.3, 0.16, 0.16);
      const beam = new THREE.Mesh(beamGeo, mat);
      beam.position.y = 3.7;

      const curtainGeo = new THREE.PlaneGeometry(2.0, 3.3);
      const curtainMat = new THREE.MeshBasicMaterial({
        color, transparent: true, opacity: 0.24, side: THREE.DoubleSide,
        depthWrite: false, blending: THREE.AdditiveBlending,
      });
      curtainMat.userData.base = 0.24;
      const curtain = new THREE.Mesh(curtainGeo, curtainMat);
      curtain.position.y = 1.72;

      const boardGeo = new THREE.PlaneGeometry(1.15, 1.15);
      const board = new THREE.Mesh(boardGeo, numMats[i]);
      board.position.y = 4.55;

      lane.add(p1, p2, beam, curtain, board);
      root.add(lane);

      vis.curtains.push(curtainMat);
      vis.nums.push(board);
      vis.disposables.push(pillarGeo, beamGeo, curtainGeo, boardGeo, mat, curtainMat);
    }

    if (g.boss) {
      // ประตูบอส: ขยายกรอบ + คาดทอง + ป้าย BOSS GATE
      const gold = new THREE.MeshStandardMaterial({
        color: 0xffd166, emissive: 0xffb300, emissiveIntensity: 0.55, roughness: 0.28, metalness: 0.45,
      });
      const barGeo = new THREE.BoxGeometry(CFG.laneWidth * 3 + 0.9, 0.22, 0.22);
      const bar = new THREE.Mesh(barGeo, gold);
      bar.position.y = 5.0;
      const postGeo = new THREE.BoxGeometry(0.16, 1.5, 0.16);
      for (const px of [-1, 1]) {
        const post = new THREE.Mesh(postGeo, gold);
        post.position.set(px * (CFG.laneWidth * 1.5 + 0.35), 4.2, 0);
        root.add(post);
      }
      const boardGeo = new THREE.PlaneGeometry(4.6, 1.3);
      const board = new THREE.Mesh(boardGeo, this._bossBoardMat());
      board.position.y = 5.75;
      root.add(bar, board);
      vis.disposables.push(barGeo, postGeo, boardGeo, gold);
      root.scale.setScalar(1.1);
    }

    root.visible = !g.resolved;
    group.add(root);
    g.visual = vis;
  }

  resolveGate(g, choice) {
    const vis = g.visual;
    if (!vis) return;
    vis.choice = choice;
    vis.fade = 0.001;
    vis.active = true;
    const good = g.correctLane === choice;
    vis.curtains.forEach((cm, i) => {
      if (i === choice) cm.color.setHex(good ? 0x4dffa6 : 0xff4d4d);
      cm.userData.base = i === choice ? 0.42 : 0.18;
    });
    vis.nums.forEach((n) => { n.visible = false; });
  }
}
