import * as THREE from 'three';
import { makeNoise1D } from './rng.js';

const UP = new THREE.Vector3(0, 1, 0);

/**
 * เส้นทางกลางป่า สร้างต่อเนื่องแบบไม่จำกัดความยาว
 * ใช้ Catmull-Rom interpolate ให้เส้นทางโค้งนุ่มนวล
 */
export class TrackPath {
  constructor(seed = 11) {
    this.step = 2;
    this.seed = seed;
    this.noiseA = makeNoise1D(seed * 7 + 3);
    this.noiseB = makeNoise1D(seed * 13 + 91);
    this.pts = [new THREE.Vector3(0, 0, 0)];
    this.length = 0;
    this.heading = 0;
  }

  ensure(s) {
    const need = Math.max(0, s + 80);
    while (this.length < need) this._grow();
    return this;
  }

  _grow() {
    const d = this.length;
    const a = this.noiseA(d * 0.0021) - 0.5;
    const b = this.noiseB(d * 0.0068) - 0.5;
    const target = a * 2.15 + b * 0.55;
    this.heading += (target - this.heading) * 0.35;
    const last = this.pts[this.pts.length - 1];
    this.pts.push(
      new THREE.Vector3(
        last.x + Math.sin(this.heading) * this.step,
        0,
        last.z + Math.cos(this.heading) * this.step
      )
    );
    this.length += this.step;
  }

  sample(s, out = new THREE.Vector3()) {
    this.ensure(s + 20);
    const f = Math.max(1, s / this.step);
    let i = Math.floor(f);
    const maxI = this.pts.length - 3;
    if (i > maxI) i = maxI;
    if (i < 1) i = 1;
    const t = Math.min(1, Math.max(0, f - i));

    const p0 = this.pts[i - 1];
    const p1 = this.pts[i];
    const p2 = this.pts[i + 1];
    const p3 = this.pts[i + 2];
    const t2 = t * t;
    const t3 = t2 * t;

    const x =
      0.5 *
      (2 * p1.x +
        (-p0.x + p2.x) * t +
        (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
        (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3);
    const z =
      0.5 *
      (2 * p1.z +
        (-p0.z + p2.z) * t +
        (2 * p0.z - 5 * p1.z + 4 * p2.z - p3.z) * t2 +
        (-p0.z + 3 * p1.z - 3 * p2.z + p3.z) * t3);

    return out.set(x, 0, z);
  }

  frame(s) {
    const pos = this.sample(s);
    const a = this.sample(s - 1.5);
    const b = this.sample(s + 1.5);
    const tangent = b.sub(a).normalize();
    // ขวาของผู้เล่น (มองจากกล้องด้านหลัง) = tangent × up
    const right = new THREE.Vector3().crossVectors(tangent, UP).normalize();
    return { pos, tangent, right };
  }

  pointAt(s, lateral = 0, out = new THREE.Vector3()) {
    const f = this.frame(s);
    return out.copy(f.pos).addScaledVector(f.right, lateral);
  }
}
