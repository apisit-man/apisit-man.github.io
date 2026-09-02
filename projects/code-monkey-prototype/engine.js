/**
 * CodeQuest Engine 3.0 (Phase 2 / Sprint B)
 * Enhancements:
 * - New Entities: Water (🌊), Turtle (🐢), Lever (🕹️), Gate (🚪)
 * - 8 Progressive Curriculum Levels
 * - Interactive Level Builder (Maker Mode) with Tile Palette & Paint/Erase
 * - JSON Level Export & Import
 * - Particle System & Screen Shake
 * - Magnetic Snap Ruler 2.0
 */

class ParticleSystem {
  constructor() {
    this.particles = [];
  }

  burst(x, y, count = 20, colors = ['#f59e0b', '#fbbf24', '#fef08a', '#38bdf8']) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 2;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        size: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1.0,
        decay: Math.random() * 0.03 + 0.02,
        isStar: Math.random() > 0.4
      });
    }
  }

  update() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.12;
      p.life -= p.decay;
      if (p.life <= 0) {
        this.particles.splice(i, 1);
      }
    }
  }

  draw(ctx) {
    ctx.save();
    for (const p of this.particles) {
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle = p.color;

      if (p.isStar) {
        const s = p.size * (0.5 + p.life * 0.5);
        ctx.beginPath();
        ctx.moveTo(p.x, p.y - s);
        ctx.lineTo(p.x + s * 0.3, p.y - s * 0.3);
        ctx.lineTo(p.x + s, p.y);
        ctx.lineTo(p.x + s * 0.3, p.y + s * 0.3);
        ctx.lineTo(p.x, p.y + s);
        ctx.lineTo(p.x - s * 0.3, p.y + s * 0.3);
        ctx.lineTo(p.x - s, p.y);
        ctx.lineTo(p.x - s * 0.3, p.y - s * 0.3);
        ctx.closePath();
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  }
}

class SoundEffects {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  playStep() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(160, now + 0.08);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  }

  playTurn() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(580, now + 0.1);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.1);
  }

  playEat() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime + idx * 0.06;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.15);
    });
  }

  playLever() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'square';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.setValueAtTime(440, now + 0.08);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.18);
  }

  playHit() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(50, now + 0.2);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.2);
  }

  playWin() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const chords = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    chords.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime + idx * 0.08;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.45);
    });
  }
}

// 8 Progressive Levels
const GAME_LEVELS = [
  {
    id: 1,
    title: "ก้าวแรกของเจ้าจ๋อ (First Step)",
    desc: "สั่งให้น้องลิงเดินหน้าตรงไปเก็บกล้วยแสนอร่อย",
    parLines: 1,
    gridSize: { cols: 8, rows: 8 },
    monkey: { x: 1, y: 4, dir: 0 },
    bananas: [{ x: 4, y: 4 }],
    obstacles: [{ x: 4, y: 2 }, { x: 4, y: 6 }],
    water: [],
    turtles: [],
    levers: [],
    gates: [],
    initialCode: "// ด่านที่ 1: ก้าวไปข้างหน้า\nstep(3);",
    hints: {
      tier1: "💡 แนวคิด: น้องลิงหันหน้าไปทางขวาอยู่แล้ว เพียงแค่สั่งให้ก้าวตรงไปข้างหน้า",
      tier2: "🔍 ชี้ทาง: ลองใช้ไม้บรรทัด 📏 ลากจากตัวลิงไปหากล้วย จะเห็นว่าห่างกัน 3 ช่องพอดี",
      tier3: "💻 โค้ดช่วย: พิมพ์ `step(3);` แล้วกดปุ่มรันโค้ดได้เลย!"
    }
  },
  {
    id: 2,
    title: "เลี้ยวซ้ายเลี้ยวขวา (Turn & Walk)",
    desc: "เดินหน้า 2 ก้าว เลี้ยวซ้าย แล้วเดินต่ออีก 2 ก้าวไปเก็บกล้วย",
    parLines: 3,
    gridSize: { cols: 8, rows: 8 },
    monkey: { x: 2, y: 5, dir: 0 },
    bananas: [{ x: 4, y: 3 }],
    obstacles: [{ x: 5, y: 5 }, { x: 4, y: 6 }],
    water: [],
    turtles: [],
    levers: [],
    gates: [],
    initialCode: "// ด่านที่ 2: เดินแล้วเลี้ยว\nstep(2);\nturnLeft();\nstep(2);",
    hints: {
      tier1: "💡 แนวคิด: กล้วยอยู่ด้านบนขวา ไม่สามารถเดินเป็นเส้นตรงได้ ต้องเดินแล้วเลี้ยว",
      tier2: "🔍 ชี้ทาง: เดินหน้า 2 ก้าว -> หันซ้ายด้วย turnLeft() -> แล้วก้าวต่ออีก 2 ก้าว",
      tier3: "💻 โค้ดช่วย: ใส่โค้ด 3 บรรทัดนี้:\nstep(2);\nturnLeft();\nstep(2);"
    }
  },
  {
    id: 3,
    title: "ทางตันหินขวาง (Obstacle Avoidance)",
    desc: "มีก้อนหินยักษ์ขวางทางตรง! ต้องเดินเลี้ยวอ้อมเพื่อไปเก็บกล้วย",
    parLines: 7,
    gridSize: { cols: 8, rows: 8 },
    monkey: { x: 1, y: 4, dir: 0 },
    bananas: [{ x: 5, y: 4 }],
    obstacles: [{ x: 3, y: 4 }, { x: 3, y: 5 }, { x: 3, y: 6 }],
    water: [],
    turtles: [],
    levers: [],
    gates: [],
    initialCode: "// ด่านที่ 3: วางแผนหลบสิ่งกีดขวาง\nstep(1);\nturnLeft();\nstep(2);\nturnRight();\nstep(3);\nturnRight();\nstep(2);",
    hints: {
      tier1: "💡 แนวคิด: ทางตรงมีหินขวาง 3 ก้อน ให้เดินเลี้ยวขึ้นด้านบนเพื่ออ้อมผ่านหินไป",
      tier2: "🔍 ชี้ทาง: ก้าว 1 -> เลี้ยวซ้าย -> ก้าว 2 -> เลี้ยวขวา -> ก้าว 3 -> เลี้ยวขวา -> ก้าว 2",
      tier3: "💻 โค้ดช่วย: อ้อมขึ้นบน: `step(1); turnLeft(); step(2); turnRight(); step(3); turnRight(); step(2);`"
    }
  },
  {
    id: 4,
    title: "พลังแห่งการวนซ้ำ (Looping Magic)",
    desc: "มีกล้วย 3 ลูกเรียงกันเป็นระยะเท่าๆ กัน ใช้คำสั่ง repeat เพื่อเก็บทั้งหมด!",
    parLines: 3,
    gridSize: { cols: 8, rows: 8 },
    monkey: { x: 0, y: 3, dir: 0 },
    bananas: [{ x: 2, y: 3 }, { x: 4, y: 3 }, { x: 6, y: 3 }],
    obstacles: [
      { x: 0, y: 2 }, { x: 2, y: 2 }, { x: 4, y: 2 }, { x: 6, y: 2 },
      { x: 0, y: 4 }, { x: 2, y: 4 }, { x: 4, y: 4 }, { x: 6, y: 4 }
    ],
    water: [],
    turtles: [],
    levers: [],
    gates: [],
    initialCode: "// ด่านที่ 4: การวนซ้ำ (Loop)\nrepeat(3) {\n  step(2);\n}",
    hints: {
      tier1: "💡 แนวคิด: ระยะระหว่างกล้วยแต่ละลูกเท่ากับ 2 ก้าวสม่ำเสมอ ใช้การทำซ้ำ 3 ครั้ง",
      tier2: "🔍 ชี้ทาง: แทนที่จะพิมพ์ step(2) สามครั้ง ให้ครอบด้วย `repeat(3) { ... }`",
      tier3: "💻 โค้ดช่วย: ใช้โค้ดนี้เพื่อคะแนน 3 ดาว:\nrepeat(3) {\n  step(2);\n}"
    }
  },
  {
    id: 5,
    title: "เพื่อนเต่าพาข้ามน้ำ (Turtle Ride)",
    desc: "มีแม่น้ำขวางอยู่! สั่งน้องเต่าด้วยคำสั่ง turtle.step(2) ให้ว่ายมาเป็นสะพาน แล้วก้าวข้ามไปหากล้วย",
    parLines: 2,
    gridSize: { cols: 8, rows: 8 },
    monkey: { x: 1, y: 4, dir: 0 },
    bananas: [{ x: 5, y: 4 }],
    obstacles: [],
    water: [
      { x: 3, y: 1 }, { x: 3, y: 2 }, { x: 3, y: 3 }, { x: 3, y: 4 }, { x: 3, y: 5 }, { x: 3, y: 6 }
    ],
    turtles: [{ x: 3, y: 2, dir: 1 }], // Facing down (1)
    levers: [],
    gates: [],
    initialCode: "// ด่านที่ 5: การสั่งออบเจกต์ (Object Method)\nturtle.step(2);\nstep(4);",
    hints: {
      tier1: "💡 แนวคิด: ลิงเดินลงน้ำไม่ได้ แต่สามารถเดินเหยียบบนหลังเต่าเพื่อข้ามน้ำได้",
      tier2: "🔍 ชี้ทาง: สั่งให้เต่าว่ายลงมา 2 ช่องที่ (3, 4) แล้วสั่งลิงเดินหน้า 4 ก้าว",
      tier3: "💻 โค้ดช่วย: `turtle.step(2);` ตามด้วย `step(4);`"
    }
  },
  {
    id: 6,
    title: "สวิตช์และประตูกล (Switch & Gate)",
    desc: "ประตูกลปิดกั้นทางอยู่! สั่งลิงเดินไปโยกคันโยกด้วย pullLever() เพื่อเปิดประตูแล้วเดินไปกินกล้วย",
    parLines: 5,
    gridSize: { cols: 8, rows: 8 },
    monkey: { x: 1, y: 4, dir: 0 },
    bananas: [{ x: 6, y: 4 }],
    obstacles: [{ x: 4, y: 2 }, { x: 4, y: 3 }, { x: 4, y: 5 }, { x: 4, y: 6 }],
    water: [],
    turtles: [],
    levers: [{ x: 2, y: 2, pulled: false }],
    gates: [{ x: 4, y: 4, open: false }],
    initialCode: "// ด่านที่ 6: เหตุการณ์และเงื่อนไข (Trigger Event)\nstep(1);\nturnLeft();\nstep(2);\npullLever();\nturnLeft();\nturnLeft();\nstep(2);\nturnLeft();\nstep(5);",
    hints: {
      tier1: "💡 แนวคิด: สับคันโยกที่อยู่ด้านบน ประตูรั้วที่ขวางทางจะเปิดออกอัตโนมัติ",
      tier2: "🔍 ชี้ทาง: เดินไปที่สวิตช์คันโยก (2, 2) เรียก `pullLever();` แล้วเดินกลับมาเข้าประตู",
      tier3: "💻 โค้ดช่วย: ก้าวไปสับคันโยก -> หันกลับ -> เดินทะลุประตูที่เปิดแล้วไปหากล้วย"
    }
  },
  {
    id: 7,
    title: "ระบบเซนเซอร์ตรวจจับ (Conditionals: if-else)",
    desc: "ใช้คำสั่ง if (obstacleAhead()) ตรวจสอบว่าข้างหน้ามีหินขวางหรือไม่ ถ้ามีให้เลี้ยวหลบ!",
    parLines: 7,
    gridSize: { cols: 8, rows: 8 },
    monkey: { x: 1, y: 4, dir: 0 },
    bananas: [{ x: 5, y: 4 }],
    obstacles: [{ x: 3, y: 4 }],
    water: [],
    turtles: [],
    levers: [],
    gates: [],
    initialCode: "// ด่านที่ 7: การตัดสินใจเชิงตรรกะ (if-else)\nstep(1);\nif (obstacleAhead()) {\n  turnLeft();\n  step(2);\n  turnRight();\n  step(3);\n  turnRight();\n  step(2);\n}",
    hints: {
      tier1: "💡 แนวคิด: คำสั่ง if (obstacleAhead()) จะตรวจสอบช่องตรงหน้าของน้องลิงทันที",
      tier2: "🔍 ชี้ทาง: เดินหน้า 1 ก้าวแล้วใช้ if เพื่อตรวจสอบว่ามีหินขวางอยู่หรือไม่",
      tier3: "💻 โค้ดช่วย: ตรวจสอบหิน แล้วสั่งให้อ้อมขึ้นด้านบนผ่านหินไปหากล้วย"
    }
  },
  {
    id: 8,
    title: "ภารกิจผสมผสาน (The Grand Finale 🏆)",
    desc: "บูรณาการทุกทักษะ: ข้ามแม่น้ำด้วยเพื่อนเต่า และเปิดประตูกลเพื่อคว้ากล้วยทองคำ!",
    parLines: 8,
    gridSize: { cols: 8, rows: 8 },
    monkey: { x: 0, y: 4, dir: 0 },
    bananas: [{ x: 7, y: 4 }],
    obstacles: [{ x: 5, y: 2 }, { x: 5, y: 3 }, { x: 5, y: 5 }, { x: 5, y: 6 }],
    water: [{ x: 2, y: 2 }, { x: 2, y: 3 }, { x: 2, y: 4 }, { x: 2, y: 5 }, { x: 2, y: 6 }],
    turtles: [{ x: 2, y: 2, dir: 1 }],
    levers: [{ x: 3, y: 2, pulled: false }],
    gates: [{ x: 5, y: 4, open: false }],
    initialCode: "// ด่านที่ 8: ภารกิจรวมพลัง\nturtle.step(2);\nstep(3);\nturnLeft();\nstep(2);\npullLever();\nturnLeft();\nturnLeft();\nstep(2);\nturnLeft();\nstep(4);",
    hints: {
      tier1: "💡 แนวคิด: 1. ให้เต่าว่ายน้ำมาเป็นสะพาน 2. เดินไปโยกคันโยก 3. เดินผ่านประตูไปเอากล้วย",
      tier2: "🔍 ชี้ทาง: turtle.step(2); -> ลิงเดินข้ามน้ำ -> เลี้ยวขึ้นไปสับคันโยก -> เดินทะลุประตู",
      tier3: "💻 โค้ดช่วย: วางแผนเป็น 3 ขั้นตอน: เต่าว่ายน้ำ -> สับคันโยก -> เก็บกล้วยทองคำ!"
    }
  }
];

class GameStage {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.sound = new SoundEffects();
    this.particles = new ParticleSystem();

    this.cols = 8;
    this.rows = 8;
    this.tileSize = 60;

    this.currentLevelIndex = 0;
    this.levelData = null;

    // Actors & Entities
    this.monkey = { x: 0, y: 0, dir: 0, animX: 0, animY: 0, angle: 0 };
    this.bananas = [];
    this.obstacles = [];
    this.water = [];
    this.turtles = [];
    this.levers = [];
    this.gates = [];
    this.trail = [];

    // Screen Shake state
    this.shakeIntensity = 0;
    this.shakeDecay = 0.88;

    // Magnetic Ruler state
    this.rulerActive = false;
    this.isDraggingRuler = false;
    this.rulerStart = null;
    this.rulerCurrent = null;
    this.snappedTarget = null;

    // Level Builder (Maker Mode)
    this.isBuilderMode = false;
    this.currentBrush = 'banana'; // monkey, banana, rock, water, turtle, lever, gate, erase
    this.customLevel = null;

    // Animation control
    this.animating = false;
    this.animationSpeed = 1;

    this.initCanvasSize();
    this.setupEvents();
    this.loadLevel(0);
    this.startRenderLoop();
  }

  initCanvasSize() {
    const size = Math.min(520, window.innerWidth - 48);
    this.canvas.width = size;
    this.canvas.height = size;
    this.tileSize = size / this.cols;
  }

  triggerScreenShake(intensity = 8) {
    this.shakeIntensity = intensity;
  }

  setupEvents() {
    window.addEventListener('resize', () => {
      this.initCanvasSize();
      this.render();
    });

    const getCanvasPos = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const pixelX = clientX - rect.left;
      const pixelY = clientY - rect.top;
      const gridX = Math.floor(pixelX / this.tileSize);
      const gridY = Math.floor(pixelY / this.tileSize);

      let finalGridX = Math.max(0, Math.min(this.cols - 1, gridX));
      let finalGridY = Math.max(0, Math.min(this.rows - 1, gridY));
      let snapped = null;

      const candidates = [
        { x: this.monkey.x, y: this.monkey.y, type: 'monkey' },
        ...this.bananas.filter(b => !b.collected).map(b => ({ x: b.x, y: b.y, type: 'banana' })),
        ...this.turtles.map(t => ({ x: t.x, y: t.y, type: 'turtle' }))
      ];

      for (const cand of candidates) {
        const cx = (cand.x + 0.5) * this.tileSize;
        const cy = (cand.y + 0.5) * this.tileSize;
        const dist = Math.hypot(pixelX - cx, pixelY - cy);
        if (dist < this.tileSize * 0.45) {
          finalGridX = cand.x;
          finalGridY = cand.y;
          snapped = cand;
          break;
        }
      }

      return { x: finalGridX, y: finalGridY, pixelX, pixelY, snapped };
    };

    const handlePointerAction = (e) => {
      const pos = getCanvasPos(e);

      // In Builder Mode, click paints or erases tiles!
      if (this.isBuilderMode) {
        this.paintTile(pos.x, pos.y);
        return;
      }

      // In Play Mode with Ruler Active
      if (this.rulerActive) {
        this.isDraggingRuler = true;
        this.rulerStart = pos.snapped && pos.snapped.type === 'monkey' ? { x: this.monkey.x, y: this.monkey.y } : { x: pos.x, y: pos.y };
        this.rulerCurrent = this.rulerStart;
        this.snappedTarget = pos.snapped;
        this.updateRulerHud();
      }
    };

    const onPointerMove = (e) => {
      if (this.isBuilderMode) return;
      if (!this.rulerActive || !this.isDraggingRuler) return;
      const pos = getCanvasPos(e);
      this.rulerCurrent = { x: pos.x, y: pos.y };
      this.snappedTarget = pos.snapped;
      this.updateRulerHud();
    };

    const onPointerUp = () => {
      if (this.rulerActive) {
        this.isDraggingRuler = false;
      }
    };

    this.canvas.addEventListener('mousedown', handlePointerAction);
    this.canvas.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    this.canvas.addEventListener('touchstart', handlePointerAction, { passive: true });
    this.canvas.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);
  }

  /* Level Builder Painting Logic */
  paintTile(gx, gy) {
    const brush = this.currentBrush;

    // Erase anything existing at this coordinate
    this.bananas = this.bananas.filter(b => !(b.x === gx && b.y === gy));
    this.obstacles = this.obstacles.filter(o => !(o.x === gx && o.y === gy));
    this.water = this.water.filter(w => !(w.x === gx && w.y === gy));
    this.turtles = this.turtles.filter(t => !(t.x === gx && t.y === gy));
    this.levers = this.levers.filter(l => !(l.x === gx && l.y === gy));
    this.gates = this.gates.filter(g => !(g.x === gx && g.y === gy));

    if (brush === 'erase') {
      // already cleared above
    } else if (brush === 'monkey') {
      this.monkey.x = gx;
      this.monkey.y = gy;
      this.monkey.animX = gx;
      this.monkey.animY = gy;
      this.trail = [{ x: gx, y: gy }];
    } else if (brush === 'banana') {
      this.bananas.push({ x: gx, y: gy, collected: false });
    } else if (brush === 'rock') {
      this.obstacles.push({ x: gx, y: gy });
    } else if (brush === 'water') {
      this.water.push({ x: gx, y: gy });
    } else if (brush === 'turtle') {
      this.turtles.push({ x: gx, y: gy, dir: 1, animX: gx, animY: gy });
    } else if (brush === 'lever') {
      this.levers.push({ x: gx, y: gy, pulled: false });
    } else if (brush === 'gate') {
      this.gates.push({ x: gx, y: gy, open: false });
    }

    this.sound.playStep();
  }

  clearCustomLevel() {
    this.bananas = [];
    this.obstacles = [];
    this.water = [];
    this.turtles = [];
    this.levers = [];
    this.gates = [];
    this.trail = [{ x: this.monkey.x, y: this.monkey.y }];
  }

  exportLevelJSON() {
    const data = {
      title: "ด่านที่สร้างเอง (Custom Level)",
      desc: "เก็บกล้วยให้ครบเพื่อชนะภารกิจ!",
      parLines: 4,
      gridSize: { cols: this.cols, rows: this.rows },
      monkey: { x: this.monkey.x, y: this.monkey.y, dir: this.monkey.dir },
      bananas: this.bananas.map(b => ({ x: b.x, y: b.y })),
      obstacles: this.obstacles.map(o => ({ x: o.x, y: o.y })),
      water: this.water.map(w => ({ x: w.x, y: w.y })),
      turtles: this.turtles.map(t => ({ x: t.x, y: t.y, dir: t.dir })),
      levers: this.levers.map(l => ({ x: l.x, y: l.y })),
      gates: this.gates.map(g => ({ x: g.x, y: g.y })),
      initialCode: "// โค้ดสำหรับด่านของคุณ\nstep(1);",
      hints: {
        tier1: "💡 ดูตำแหน่งของเป้าหมายแล้วเขียนคำสั่ง",
        tier2: "🔍 ใช้เครื่องมือวัดระยะช่วยนับจำนวนก้าว",
        tier3: "💻 วางแผนเส้นทางทีละขั้นตอน"
      }
    };
    return JSON.stringify(data, null, 2);
  }

  importLevelJSON(jsonStr) {
    try {
      const data = typeof jsonStr === 'string' ? JSON.parse(jsonStr) : jsonStr;
      this.levelData = data;
      this.cols = data.gridSize ? data.gridSize.cols : 8;
      this.rows = data.gridSize ? data.gridSize.rows : 8;
      this.tileSize = this.canvas.width / this.cols;
      this.resetLevelState();
      return true;
    } catch (err) {
      alert('รูปแบบรหัสด่าน JSON ไม่ถูกต้อง: ' + err.message);
      return false;
    }
  }

  toggleRuler(forceState) {
    this.rulerActive = forceState !== undefined ? forceState : !this.rulerActive;
    this.canvas.classList.toggle('measuring', this.rulerActive);
    const hud = document.getElementById('rulerHud');
    if (!this.rulerActive) {
      this.rulerStart = null;
      this.rulerCurrent = null;
      this.snappedTarget = null;
      if (hud) hud.classList.remove('visible');
    } else {
      this.rulerStart = { x: this.monkey.x, y: this.monkey.y };
      const nearestBanana = this.bananas.find(b => !b.collected);
      if (nearestBanana) {
        this.rulerCurrent = { x: nearestBanana.x, y: nearestBanana.y };
        this.snappedTarget = { x: nearestBanana.x, y: nearestBanana.y, type: 'banana' };
      } else {
        this.rulerCurrent = { x: this.monkey.x, y: this.monkey.y };
      }
      this.updateRulerHud();
    }
    return this.rulerActive;
  }

  updateRulerHud() {
    const hud = document.getElementById('rulerHud');
    if (!hud || !this.rulerStart || !this.rulerCurrent) return;

    const dx = Math.abs(this.rulerCurrent.x - this.rulerStart.x);
    const dy = Math.abs(this.rulerCurrent.y - this.rulerStart.y);
    const dist = dx + dy;

    hud.innerHTML = `
      <span>📏 ระยะทาง: <strong>${dist}</strong> ก้าว</span>
      <button id="btnInsertStep" class="ruler-insert-btn" title="คลิกเพื่อแทรกคำสั่ง step(${dist}) ในโค้ด">
        + แทรก step(${dist})
      </button>
    `;
    hud.classList.add('visible');

    const insertBtn = document.getElementById('btnInsertStep');
    if (insertBtn) {
      insertBtn.onclick = (e) => {
        e.stopPropagation();
        if (window.onQuickInsertStep) {
          window.onQuickInsertStep(dist);
        }
      };
    }
  }

  loadLevel(index) {
    this.currentLevelIndex = index;
    const level = GAME_LEVELS[index];
    this.levelData = level;
    this.cols = level.gridSize.cols;
    this.rows = level.gridSize.rows;
    this.tileSize = this.canvas.width / this.cols;

    this.resetLevelState();
  }

  resetLevelState() {
    const level = this.levelData;
    this.monkey = {
      x: level.monkey.x,
      y: level.monkey.y,
      dir: level.monkey.dir,
      animX: level.monkey.x,
      animY: level.monkey.y,
      angle: level.monkey.dir * (Math.PI / 2)
    };

    this.bananas = (level.bananas || []).map(b => ({ ...b, collected: false }));
    this.obstacles = (level.obstacles || []).map(o => ({ ...o }));
    this.water = (level.water || []).map(w => ({ ...w }));
    this.turtles = (level.turtles || []).map(t => ({
      ...t,
      animX: t.x,
      animY: t.y,
      angle: (t.dir || 0) * (Math.PI / 2)
    }));
    this.levers = (level.levers || []).map(l => ({ ...l, pulled: false }));
    this.gates = (level.gates || []).map(g => ({ ...g, open: false }));

    this.trail = [{ x: level.monkey.x, y: level.monkey.y }];
    this.animating = false;
    this.particles.particles = [];

    if (this.rulerActive) {
      this.rulerStart = { x: this.monkey.x, y: this.monkey.y };
      const nearestBanana = this.bananas.find(b => !b.collected);
      if (nearestBanana) {
        this.rulerCurrent = { x: nearestBanana.x, y: nearestBanana.y };
      }
      this.updateRulerHud();
    }
  }

  startRenderLoop() {
    const tick = () => {
      this.update();
      this.render();
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  update() {
    this.particles.update();

    if (this.shakeIntensity > 0.1) {
      this.shakeIntensity *= this.shakeDecay;
    } else {
      this.shakeIntensity = 0;
    }
  }

  render() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    const ts = this.tileSize;

    ctx.save();

    if (this.shakeIntensity > 0) {
      const offsetX = (Math.random() - 0.5) * this.shakeIntensity * 2;
      const offsetY = (Math.random() - 0.5) * this.shakeIntensity * 2;
      ctx.translate(offsetX, offsetY);
    }

    // 1. Background Grass/Grid
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, w, h);

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const isEven = (r + c) % 2 === 0;
        ctx.fillStyle = isEven ? '#131e33' : '#0f172a';
        ctx.fillRect(c * ts, r * ts, ts, ts);

        ctx.fillStyle = 'rgba(148, 163, 184, 0.15)';
        ctx.font = '10px monospace';
        ctx.fillText(`${c},${r}`, c * ts + 4, r * ts + 12);
      }
    }

    // Grid Borders
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    for (let i = 0; i <= this.cols; i++) {
      ctx.beginPath();
      ctx.moveTo(i * ts, 0);
      ctx.lineTo(i * ts, h);
      ctx.stroke();
    }
    for (let j = 0; j <= this.rows; j++) {
      ctx.beginPath();
      ctx.moveTo(0, j * ts);
      ctx.lineTo(w, j * ts);
      ctx.stroke();
    }

    // 2. Water Tiles 🌊
    const time = Date.now() * 0.003;
    this.water.forEach(wt => {
      this.drawWater(ctx, wt.x * ts, wt.y * ts, ts, time);
    });

    // 3. Trail (Footprints)
    for (let i = 0; i < this.trail.length; i++) {
      const p = this.trail[i];
      ctx.fillStyle = 'rgba(56, 189, 248, 0.22)';
      ctx.beginPath();
      ctx.arc((p.x + 0.5) * ts, (p.y + 0.5) * ts, ts * 0.16, 0, Math.PI * 2);
      ctx.fill();
    }

    // 4. Gates 🚪
    this.gates.forEach(g => {
      this.drawGate(ctx, g.x * ts, g.y * ts, ts, g.open);
    });

    // 5. Levers 🕹️
    this.levers.forEach(l => {
      this.drawLever(ctx, l.x * ts, l.y * ts, ts, l.pulled);
    });

    // 6. Obstacles (Rocks) 🪨
    this.obstacles.forEach(obs => {
      this.drawRock(ctx, obs.x * ts, obs.y * ts, ts);
    });

    // 7. Turtles 🐢 (Swims in water / serves as bridge)
    this.turtles.forEach(t => {
      this.drawTurtle(ctx, t.animX * ts, t.animY * ts, ts, t.angle);
    });

    // 8. Bananas 🍌
    this.bananas.forEach(b => {
      if (!b.collected) {
        const bounce = Math.sin(time + b.x) * 4;
        this.drawBanana(ctx, b.x * ts, b.y * ts + bounce, ts);
      }
    });

    // 9. Monkey Sprite 🐒
    this.drawMonkey(ctx, this.monkey.animX * ts, this.monkey.animY * ts, ts, this.monkey.angle);

    // 10. Particle Effects ✨
    this.particles.draw(ctx);

    // 11. Magnetic Ruler Overlay (if active)
    if (this.rulerActive && this.rulerStart && this.rulerCurrent) {
      this.drawRuler(ctx, ts);
    }

    // 12. Builder Mode Indicator Badge
    if (this.isBuilderMode) {
      ctx.fillStyle = 'rgba(245, 158, 11, 0.9)';
      ctx.fillRect(10, 10, 120, 24);
      ctx.fillStyle = '#000';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🛠️ โหมดสร้างด่าน', 70, 22);
    }

    ctx.restore();
  }

  drawWater(ctx, x, y, size, time) {
    ctx.save();
    ctx.fillStyle = '#0369a1';
    ctx.fillRect(x, y, size, size);

    // Animated water waves
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
    ctx.lineWidth = 2;
    const waveOffset = Math.sin(time + x) * 4;

    ctx.beginPath();
    ctx.moveTo(x + 5, y + size * 0.4 + waveOffset);
    ctx.quadraticCurveTo(x + size * 0.5, y + size * 0.2 + waveOffset, x + size - 5, y + size * 0.4 + waveOffset);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x + 5, y + size * 0.7 - waveOffset);
    ctx.quadraticCurveTo(x + size * 0.5, y + size * 0.9 - waveOffset, x + size - 5, y + size * 0.7 - waveOffset);
    ctx.stroke();

    ctx.restore();
  }

  drawTurtle(ctx, x, y, size, angle) {
    ctx.save();
    ctx.translate(x + size * 0.5, y + size * 0.5);
    ctx.rotate(angle);

    // Shell
    ctx.fillStyle = '#15803d'; // Dark green
    ctx.strokeStyle = '#14532d';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(0, 0, size * 0.35, size * 0.28, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Shell pattern
    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.ellipse(0, 0, size * 0.2, size * 0.16, 0, 0, Math.PI * 2);
    ctx.fill();

    // Head
    ctx.fillStyle = '#4ade80';
    ctx.beginPath();
    ctx.arc(size * 0.38, 0, size * 0.12, 0, Math.PI * 2);
    ctx.fill();

    // Flippers
    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.ellipse(size * 0.15, -size * 0.32, size * 0.12, size * 0.08, Math.PI * 0.2, 0, Math.PI * 2);
    ctx.ellipse(size * 0.15, size * 0.32, size * 0.12, size * 0.08, -Math.PI * 0.2, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  drawGate(ctx, x, y, size, isOpen) {
    ctx.save();
    ctx.translate(x + size * 0.5, y + size * 0.5);

    if (isOpen) {
      // Open Gate (passable)
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 3;
      ctx.strokeRect(-size * 0.38, -size * 0.38, size * 0.76, size * 0.76);

      ctx.fillStyle = 'rgba(16, 185, 129, 0.2)';
      ctx.fillRect(-size * 0.38, -size * 0.38, size * 0.76, size * 0.76);

      ctx.font = `${size * 0.4}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🔓', 0, 0);
    } else {
      // Closed Gate (obstacle)
      ctx.fillStyle = '#7f1d1d';
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 3;
      ctx.fillRect(-size * 0.38, -size * 0.38, size * 0.76, size * 0.76);
      ctx.strokeRect(-size * 0.38, -size * 0.38, size * 0.76, size * 0.76);

      ctx.font = `${size * 0.4}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🚪', 0, 0);
    }

    ctx.restore();
  }

  drawLever(ctx, x, y, size, isPulled) {
    ctx.save();
    ctx.translate(x + size * 0.5, y + size * 0.5);

    // Lever Base
    ctx.fillStyle = '#475569';
    ctx.fillRect(-size * 0.25, size * 0.15, size * 0.5, size * 0.18);

    // Lever Stick
    ctx.strokeStyle = isPulled ? '#10b981' : '#f59e0b';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(0, size * 0.15);
    if (isPulled) {
      ctx.lineTo(size * 0.22, -size * 0.2);
    } else {
      ctx.lineTo(-size * 0.22, -size * 0.2);
    }
    ctx.stroke();

    // Knob
    ctx.fillStyle = isPulled ? '#34d399' : '#ef4444';
    ctx.beginPath();
    ctx.arc(isPulled ? size * 0.22 : -size * 0.22, -size * 0.2, 7, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  drawRock(ctx, x, y, size) {
    ctx.save();
    ctx.translate(x + size * 0.5, y + size * 0.5);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.beginPath();
    ctx.ellipse(0, size * 0.35, size * 0.38, size * 0.15, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#64748b';
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-size * 0.35, size * 0.2);
    ctx.lineTo(-size * 0.3, -size * 0.25);
    ctx.lineTo(size * 0.05, -size * 0.35);
    ctx.lineTo(size * 0.35, -size * 0.1);
    ctx.lineTo(size * 0.3, size * 0.25);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#94a3b8';
    ctx.beginPath();
    ctx.moveTo(-size * 0.2, -size * 0.2);
    ctx.lineTo(size * 0.02, -size * 0.28);
    ctx.lineTo(size * 0.08, -size * 0.1);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  drawBanana(ctx, x, y, size) {
    ctx.save();
    ctx.translate(x + size * 0.5, y + size * 0.5);

    const gradient = ctx.createRadialGradient(0, 0, 4, 0, 0, size * 0.46);
    gradient.addColorStop(0, 'rgba(251, 191, 36, 0.5)');
    gradient.addColorStop(1, 'rgba(251, 191, 36, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.46, 0, Math.PI * 2);
    ctx.fill();

    ctx.font = `${size * 0.55}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🍌', 0, 0);

    ctx.restore();
  }

  drawMonkey(ctx, x, y, size, angle) {
    ctx.save();
    ctx.translate(x + size * 0.5, y + size * 0.5);
    ctx.rotate(angle);

    const now = Date.now();
    const isBlinking = (now % 3500) < 160;
    const earWiggle = Math.sin(now * 0.003) * 1.5;

    ctx.strokeStyle = 'rgba(6, 182, 212, 0.45)';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.42, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#06b6d4';
    ctx.beginPath();
    ctx.moveTo(size * 0.43, 0);
    ctx.lineTo(size * 0.32, -size * 0.09);
    ctx.lineTo(size * 0.32, size * 0.09);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#854d0e';
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.28, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#713f12';
    ctx.beginPath();
    ctx.arc(-size * 0.22, -size * 0.18 + earWiggle, size * 0.1, 0, Math.PI * 2);
    ctx.arc(-size * 0.22, size * 0.18 - earWiggle, size * 0.1, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#fde047';
    ctx.beginPath();
    ctx.ellipse(size * 0.04, 0, size * 0.18, size * 0.22, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#0f172a';
    if (isBlinking) {
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#0f172a';
      ctx.beginPath();
      ctx.moveTo(size * 0.06, -size * 0.08);
      ctx.lineTo(size * 0.14, -size * 0.08);
      ctx.moveTo(size * 0.06, size * 0.08);
      ctx.lineTo(size * 0.14, size * 0.08);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(size * 0.1, -size * 0.08, size * 0.038, 0, Math.PI * 2);
      ctx.arc(size * 0.1, size * 0.08, size * 0.038, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.strokeStyle = '#713f12';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(size * 0.14, 0, size * 0.05, -Math.PI * 0.4, Math.PI * 0.4);
    ctx.stroke();

    ctx.restore();
  }

  drawRuler(ctx, ts) {
    const sx = (this.rulerStart.x + 0.5) * ts;
    const sy = (this.rulerStart.y + 0.5) * ts;
    const ex = (this.rulerCurrent.x + 0.5) * ts;
    const ey = (this.rulerCurrent.y + 0.5) * ts;

    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(ex, ey);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#0284c7';
    ctx.beginPath();
    ctx.arc(sx, sy, 7, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(ex, ey, 9, 0, Math.PI * 2);
    ctx.fill();

    if (this.snappedTarget) {
      const pulse = (Date.now() * 0.008) % (Math.PI * 2);
      const ringSize = ts * 0.4 + Math.sin(pulse) * 4;
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(ex, ey, ringSize, 0, Math.PI * 2);
      ctx.stroke();
    }

    const mx = (sx + ex) * 0.5;
    const my = (sy + ey) * 0.5;
    const dx = Math.abs(this.rulerCurrent.x - this.rulerStart.x);
    const dy = Math.abs(this.rulerCurrent.y - this.rulerStart.y);
    const steps = dx + dy;

    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.fillRect(mx - 28, my - 14, 56, 28);
    ctx.strokeRect(mx - 28, my - 14, 56, 28);

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 13px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${steps} ก้าว`, mx, my);
  }
}
