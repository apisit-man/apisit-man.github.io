// ค่าคงที่และธีมของแต่ละโซน (เวอร์ชัน v2 — รองรับหลายโหมดความยาว)

export const MODES = {
  short: { id: 'short', label: '3 นาที', sub: 'เล่นเร็ว', finish: 1800, duration: 210, gates: 8 },
  normal: { id: 'normal', label: '6 นาที', sub: 'กำลังดี', finish: 3400, duration: 390, gates: 15 },
  long: { id: 'long', label: '10 นาที', sub: 'เต็มทริป', finish: 5200, duration: 600, gates: 22 },
};

export const DEFAULT_MODE = 'long';

/** สถานะการวิ่งของรอบปัจจุบัน (ตั้งค่าตอนเริ่มรอบ) */
export const RUN = {
  finish: MODES.long.finish,
  duration: MODES.long.duration,
  mode: 'long',
  teacher: false,
  daily: false,
  seed: 1,
};

export function setRun({ mode, teacher = false, daily = false, seed = 1 }) {
  const m = MODES[mode] || MODES.long;
  RUN.finish = m.finish;
  RUN.duration = m.duration;
  RUN.mode = m.id;
  RUN.teacher = teacher;
  RUN.daily = daily;
  RUN.seed = seed;
  return RUN;
}

export const CFG = {
  start: 26,
  hearts: 3,
  laneWidth: 2.4,
  chunk: 40,

  gate: { first: 140, lastGap: 80 },

  speed: { base: 8.0, zone: 0.85, progress: 5.6, max: 18 },

  score: {
    correct: 100,        // คะแนนความรู้ (ไม่คูณคอมโบ)
    comboBonus: 50,      // โบนัสวิ่งต่อระดับคอมโบ
    crystal: 25,
    wrong: 50,
    finishPerSec: 10,
    bossMult: 2,
  },
  time: { correct: 5, wrong: 8 },

  slowMo: 0.68,
  postSlowGood: 0.8,
  postSlowBad: 0.78,
  focusFov: 60,
  questionLead: 46,

  // ระยะปลอดอุปสรรคก่อนถึงประตู (แก้ปัญหา "โดนของที่มองไม่เห็น")
  corridor: 62,
  corridorAfter: 12,
};

export const GATE_COLORS = [0xff6b6b, 0xffd166, 0x63d8ff];
export const GATE_HEX = ['#ff6b6b', '#ffd166', '#63d8ff'];

/** ชุดสีสำหรับผู้เล่นตาบอดสี (แดง–เขียว) — ใช้ฟ้า/ส้ม/ม่วง ที่แยกง่ายกว่า */
export const GATE_COLORS_CB = [0x4a90e2, 0xf5a524, 0xb07cff];
export const GATE_HEX_CB = ['#4a90e2', '#f5a524', '#b07cff'];
export const A11Y = { colorBlind: false };
export function gateColors() { return A11Y.colorBlind ? GATE_COLORS_CB : GATE_COLORS; }
export function gateHex() { return A11Y.colorBlind ? GATE_HEX_CB : GATE_HEX; }

/* ------------------------------- โซน -------------------------------- */

export const ZONES = [
  {
    name: 'ป่าดิบคริสตัล',
    tag: 'โซน 1',
    fog: 0xa8e2c2, fogNear: 42, fogFar: 205, sky: 0x6fbf9b,
    dirt: 0x9d7d54, ground: 0x4a8457, moss: 0x2f6a41,
    trunk: 0x5f4630, leafA: 0x2f8a54, leafB: 0x67bd77,
    rock: 0x93a08d,
    sun: 0xfff3d4, sunI: 2.1,
    hemiSky: 0xe3fff0, hemiGround: 0x33503b, hemiI: 1.15,
    accent: 0xd6ff8a, crystal: 0xffe066,
  },
  {
    name: 'หนองน้ำเรืองแสง',
    tag: 'โซน 2',
    fog: 0x86cfc6, fogNear: 24, fogFar: 152, sky: 0x4f9c9b,
    dirt: 0x6f6a48, ground: 0x40695c, moss: 0x2e5a50,
    trunk: 0x4f5240, leafA: 0x2f8371, leafB: 0x74c9ab,
    rock: 0x82908a,
    sun: 0xe9fff4, sunI: 1.7,
    hemiSky: 0xd9fff0, hemiGround: 0x2a463f, hemiI: 1.25,
    accent: 0x86ffe6, crystal: 0x9df7ff,
  },
  {
    name: 'ถ้ำคริสตัล',
    tag: 'โซน 3',
    fog: 0x2a2046, fogNear: 22, fogFar: 150, sky: 0x140e28,
    dirt: 0x6f5d9e, ground: 0x403463, moss: 0x2f2650,
    trunk: 0x352b52, leafA: 0x8a6ade, leafB: 0x4cc9f0,
    rock: 0x5b527f,
    sun: 0xc9b8ff, sunI: 1.75,
    hemiSky: 0xa896f0, hemiGround: 0x1a1430, hemiI: 1.35,
    accent: 0xa98bff, crystal: 0x8ff0ff,
  },
];

export function zoneLen() {
  return RUN.finish / 3;
}

export function zoneIndexAt(s) {
  const L = zoneLen();
  if (s < L) return 0;
  if (s < L * 2) return 1;
  return 2;
}

const smoothstep = (t) => t * t * (3 - 2 * t);

/** ค่าน้ำหนักการผสมสีระหว่างโซน ตรงรอยต่อ */
export function zoneMix(s) {
  const W = 95;
  const L = zoneLen();
  for (let i = 0; i < 2; i++) {
    const b = L * (i + 1);
    if (Math.abs(s - b) < W) {
      const t = smoothstep(Math.min(1, Math.max(0, (s - (b - W)) / (W * 2))));
      return { a: i, b: i + 1, t };
    }
  }
  const z = zoneIndexAt(s);
  return { a: z, b: z, t: 0 };
}

export function modeInfo(modeId) {
  return MODES[modeId] || MODES.long;
}

/** ตำแหน่งประตูคำถาม: กระจายเท่ากันตั้งแต่ต้นจนเกือบถึงเส้นชัย */
export function gatePositions(modeId = RUN.mode) {
  const m = modeInfo(modeId);
  const first = CFG.gate.first;
  const last = m.finish - CFG.gate.lastGap;
  const n = m.gates;
  const gap = n > 1 ? (last - first) / (n - 1) : 0;
  const list = [];
  for (let i = 0; i < n; i++) list.push(first + gap * i);
  return list;
}

export function laneOffset(lane) {
  return (lane - 1) * CFG.laneWidth;
}

/* ------------------------------ สกิน -------------------------------- */

export const SKINS = [
  { id: 'default', name: 'นักสำรวจ', emoji: '🧢', hat: 0xff7a45, bag: 0xffc14d, cost: 0, desc: 'ชุดเริ่มต้นของนักวิทยาศาสตร์จิ๋ว' },
  { id: 'ocean', name: 'หมวกนักดำน้ำ', emoji: '🤿', hat: 0x4cc9f0, bag: 0x2b6c8f, cost: 80, desc: 'สีฟ้าใสเหมือนน้ำทะเล' },
  { id: 'blossom', name: 'หมวกนักพฤกษา', emoji: '🌸', hat: 0xff5da2, bag: 0x8a5cf6, cost: 120, desc: 'ชมพูสดใส للนักสำรวจป่า' },
  { id: 'gold', name: 'หมวกนักสำรวจทอง', emoji: '👑', hat: 0xffd166, bag: 0x24d8a8, cost: 180, desc: 'ทองอร่าม ใครเห็นก็รู้ว่ามาไกล' },
  { id: 'shadow', name: 'หมวกเงามืด', emoji: '🕶️', hat: 0x27303f, bag: 0x00e5b0, cost: 260, desc: 'ลึกลับแต่เจิดจ้าในถ้ำคริสตัล' },
];

export function skinById(id) {
  return SKINS.find((s) => s.id === id) || SKINS[0];
}

/* --------------------------- ตั้งค่าเริ่มต้น -------------------------- */

export const DEFAULT_SETTINGS = {
  sound: true,
  tts: true,
  textScale: 1,
  reduceMotion: false,
  colorBlind: false,
  name: '',
};
