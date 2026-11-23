// ตัวสร้างเลขสุ่มแบบกำหนด seed ได้ + noise 1 มิติ

export function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export class RNG {
  constructor(seed = 1) {
    this._f = mulberry32(seed);
  }
  next() { return this._f(); }
  range(a, b) { return a + (b - a) * this._f(); }
  int(a, b) { return Math.floor(a + (b - a + 1) * this._f()); }
  pick(arr) { return arr[Math.min(arr.length - 1, Math.floor(this._f() * arr.length))]; }
  chance(p) { return this._f() < p; }
  sign() { return this._f() < 0.5 ? -1 : 1; }
}

export function makeNoise1D(seed = 1) {
  const rng = mulberry32(seed);
  const N = 512;
  const table = new Float32Array(N);
  for (let i = 0; i < N; i++) table[i] = rng();
  const smooth = (t) => t * t * (3 - 2 * t);
  return function (x) {
    const xi = Math.floor(x);
    const tf = x - xi;
    const a = table[((xi % N) + N) % N];
    const b = table[(((xi + 1) % N) + N) % N];
    return a + (b - a) * smooth(tf);
  };
}
