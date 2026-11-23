import * as THREE from 'three';
import {
  CFG, ZONES, MODES, DEFAULT_MODE, RUN, setRun, zoneIndexAt, zoneMix, zoneLen,
  gatePositions, laneOffset, SKINS, skinById, DEFAULT_SETTINGS, A11Y,
} from './config.js';
import { TrackPath } from './path.js';
import { World } from './world.js';
import { Player } from './player.js';
import { UI } from './ui.js';
import { GameAudio } from './audio.js';
import {
  assignQuestions, setCustomQuestions, loadSavedCustomQuestions,
  getActiveQuestions, isUsingCustomQuestions, QUESTIONS
} from './questions.js';
import { parseCSV, downloadSampleCSV, generateSampleCSV } from './csv.js';
import { submitScore, fetchBoard, cloudBoardEnabled } from './cloud.js';
import { RNG } from './rng.js';
import { tts } from './tts.js';

const STATE = {
  LOADING: 'loading',
  MENU: 'menu',
  COUNT: 'count',
  PLAY: 'play',
  PAUSE: 'pause',
  ZONE: 'zone',
  END: 'end',
};

const KEYS = {
  best: 'jungle-science-run-best-v1',
  sound: 'jungle-science-run-sound-v1',
  wallet: 'jsr-wallet-v1',
  skins: 'jsr-skins-v1',
  equipped: 'jsr-equipped-v1',
  board: 'jsr-board-v1',
  settings: 'jsr-settings-v1',
  telemetry: 'jsr-telemetry-v1',
  daily: 'jsr-daily-v1',
  mode: 'jsr-mode-v1',
};

const UP = new THREE.Vector3(0, 1, 0);

const readJSON = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (e) {
    return fallback;
  }
};

const writeJSON = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) { /* ignore */ }
};

function dateKey(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function hashSeed(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

class Game {
  constructor() {
    this.ui = new UI();
    this.audio = new GameAudio();
    this.state = STATE.LOADING;

    this._lastT = performance.now();
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.player = null;
    this.world = null;
    this.path = null;
    this.gates = [];

    this.camGoal = new THREE.Vector3();
    this.lookGoal = new THREE.Vector3();
    this.camLook = new THREE.Vector3();
    this._basis = new THREE.Matrix4();
    this._negRight = new THREE.Vector3();

    // meta
    this.settings = { ...DEFAULT_SETTINGS, ...readJSON(KEYS.settings, {}) };
    this.best = this.loadBest();
    this.wallet = Number(readJSON(KEYS.wallet, 0)) || 0;
    this.ownedSkins = new Set(readJSON(KEYS.skins, ['default']));
    this.ownedSkins.add('default');
    this.equipped = readJSON(KEYS.equipped, 'default');
    this.mode = readJSON(KEYS.mode, DEFAULT_MODE);
    if (!MODES[this.mode]) this.mode = DEFAULT_MODE;
    this.teacher = false;
    this.daily = false;

    this.soundOn = this.settings.sound !== false;
    this.audio.enabled = this.soundOn;
    this.stagedCustomQuestions = null;

    this._loop = this.loop.bind(this);
    this._hudAcc = 0;
  }

  /* ------------------------------ boot ------------------------------ */

  init() {
    const canvas = document.getElementById('scene');
    try {
      this.renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: window.devicePixelRatio < 2,
        powerPreference: 'high-performance',
      });
    } catch (err) {
      this.ui.fatal('เบราว์เซอร์ของคุณไม่สามารถสร้าง WebGL ได้');
      throw err;
    }

    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight, false);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;

    this.scene = new THREE.Scene();
    this.fogColor = new THREE.Color(ZONES[0].fog);
    this.scene.background = this.fogColor;
    this.scene.fog = new THREE.Fog(this.fogColor.getHex(), 42, 205);

    this.camera = new THREE.PerspectiveCamera(66, window.innerWidth / window.innerHeight, 0.1, 700);

    this.hemi = new THREE.HemisphereLight(ZONES[0].hemiSky, ZONES[0].hemiGround, 1.15);
    this.sun = new THREE.DirectionalLight(ZONES[0].sun, 2.1);
    this.sun.position.set(-40, 80, -30);
    this.scene.add(this.hemi, this.sun);

    this._c1 = new THREE.Color();
    this._c2 = new THREE.Color();

    this.skyMat = new THREE.ShaderMaterial({
      uniforms: {
        topColor: { value: new THREE.Color(ZONES[0].sky) },
        bottomColor: { value: new THREE.Color(ZONES[0].fog) },
      },
      vertexShader: `
        varying vec3 vPos;
        void main() {
          vPos = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
      fragmentShader: `
        uniform vec3 topColor;
        uniform vec3 bottomColor;
        varying vec3 vPos;
        void main() {
          float h = normalize(vPos).y;
          float t = clamp(pow(max(h, 0.0), 0.72), 0.0, 1.0);
          gl_FragColor = vec4(mix(bottomColor, topColor, t), 1.0);
        }`,
      side: THREE.BackSide,
      depthWrite: false,
      fog: false,
    });
    this.sky = new THREE.Mesh(new THREE.SphereGeometry(380, 20, 14), this.skyMat);
    this.sky.frustumCulled = false;
    this.sky.renderOrder = -1;
    this.scene.add(this.sky);

    this.player = new Player();
    this.player.setSkin(skinById(this.equipped));
    this.scene.add(this.player.group);
    this.scene.add(this.player.shadow);

    this.applySettings();
    this.ui.setMode(this.mode);
    this.ui.setTeacher(false);
    this.ui.setDaily(false);
    this.ui.setBest(this.best);
    this.ui.setWallet(this.wallet);
    this.ui.setSound(this.soundOn);
    this.updateCustomQuestionBadge();
    this.ui.showScreen('menu');

    this.bindEvents();
    this.buildRun();
    this.enterMenu();
    this.ui.hideLoader();

    window.addEventListener('resize', () => this.onResize());
    requestAnimationFrame(this._loop);

    window.__JUNGLE__ = this;
  }

  onResize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h, false);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  }

  applySettings() {
    this.ui.textLarge(this.settings.textScale > 1);
    this.ui.reduceMotion(!!this.settings.reduceMotion);
    A11Y.colorBlind = !!this.settings.colorBlind;
    document.body.classList.toggle('cb-safe', A11Y.colorBlind);
    this.audio.setEnabled(this.soundOn);
    this.ui.setSound(this.soundOn);
    tts.setEnabled(this.settings.tts !== false);
    const ttsBtn = document.getElementById('setTts');
    if (ttsBtn) ttsBtn.setAttribute('aria-pressed', String(this.settings.tts !== false));
  }

  /* ----------------------------- storage ---------------------------- */

  loadBest() {
    try {
      const raw = localStorage.getItem(KEYS.best);
      if (!raw) return 0;
      const v = JSON.parse(raw);
      return typeof v === 'number' ? v : Number(v.score) || 0;
    } catch (e) {
      return 0;
    }
  }

  saveBest(score, accuracy) {
    writeJSON(KEYS.best, { score, accuracy, date: new Date().toISOString() });
  }

  saveProgress() {
    writeJSON(KEYS.wallet, this.wallet);
    writeJSON(KEYS.skins, [...this.ownedSkins]);
    writeJSON(KEYS.equipped, this.equipped);
    writeJSON(KEYS.mode, this.mode);
    writeJSON(KEYS.settings, this.settings);
  }

  /* ------------------------------ setup ----------------------------- */

  buildRun() {
    if (this.world) this.world.reset();

    setRun({ mode: this.mode, teacher: this.teacher, daily: this.daily, seed: 1 });

    let seed;
    if (this.daily) {
      seed = hashSeed(`daily:${dateKey()}:${this.mode}`);
    } else {
      seed = (Date.now() ^ Math.floor(Math.random() * 1e9)) >>> 0;
    }
    RUN.seed = seed;

    this.path = new TrackPath(seed);
    const rng = new RNG(seed ^ 0x5f3759df);

    const gates = gatePositions(this.mode).map((s, i) => ({
      s,
      index: i,
      zone: zoneIndexAt(s),
      q: null,
      boss: false,
      correctLane: 0,
      triggered: false,
      resolved: false,
      shownAt: 0,
      visual: null,
    }));

    // ประตูบอส = ประตูสุดท้ายของแต่ละโซน
    const bounds = [zoneLen(), zoneLen() * 2, RUN.finish];
    for (const b of bounds) {
      let pick = null;
      for (const g of gates) {
        if (g.s < b - 8 && (!pick || g.s > pick.s)) pick = g;
      }
      if (pick) pick.boss = true;
    }

    const map = assignQuestions(gates, rng);
    for (const g of gates) g.q = map.get(g.index);

    this.gates = gates;
    this.world = new World(this.scene, this.path, seed, gates);
    this.gateCursor = 0;
    this.resetPlayerState();
  }

  resetPlayerState() {
    this.playerS = CFG.start;
    this.laneTarget = 1;
    this.lanePos = 1;
    this.y = 0;
    this.vy = 0;
    this.grounded = true;
    this.sliding = false;
    this.slideT = 0;

    this.speed = CFG.speed.base;
    this.timeLeft = RUN.duration;
    this.timeUsed = 0;
    this.runTime = 0;

    this.knowledgeScore = 0;
    this.runnerScore = 0;
    this.bonusScore = 0;
    this.combo = 1;
    this.crystals = 0;
    this.hearts = CFG.hearts;

    this.answered = 0;
    this.correctCount = 0;
    this.missed = [];
    this.topicStats = new Map();

    this.zoneStats = [0, 1, 2].map(() => ({ answered: 0, correct: 0, points: 0 }));
    this.zoneStartScore = 0;
    this.zoneCleared = 0;
    this.zoneT = 0;

    this.shake = 0;
    this.invuln = 0;
    this.speedDip = 0;
    this.slowMo = 1;
    this.postSlow = 0;
    this.hitStop = 0;

    this.quizActive = false;
    this.activeGate = null;
    this.zoneShown = -1;
    this.tipIndex = 0;
    this.runTelemetry = [];

    this.buffered = null;
    this.stepTimer = 0;
    this.warnTimer = 0;
    this.timeWarned = false;

    this.ui.hideQuiz();
    this.ui.bossBanner(false);
    this.ui.warn(false);
    this.ui.setHearts(this.hearts, 3);
    this.ui.d.feedback.hidden = true;
    this.audio.stopAmbient();
  }

  get score() {
    return this.knowledgeScore + this.runnerScore;
  }

  snapCamera() {
    const f = this.path.frame(this.playerS);
    const lx = laneOffset(this.lanePos);
    const px = f.pos.x + f.right.x * lx;
    const pz = f.pos.z + f.right.z * lx;
    this.camera.position.set(px - f.tangent.x * 9, this.y + 4.2, pz - f.tangent.z * 9);
    this.camLook.set(px + f.tangent.x * 9, 1.2, pz + f.tangent.z * 9);
    this.camera.lookAt(this.camLook);
  }

  enterMenu() {
    this.bankCrystals();
    this.state = STATE.MENU;
    this.ui.showScreen('menu');
    this.ui.showTouchControls(false);
    this.ui.setBest(this.best);
    this.ui.setWallet(this.wallet);
    this.ui.setMode(this.mode);
    this.ui.setTeacher(this.teacher);
    this.ui.setDaily(this.daily);
    this.ui.closeModals();
    this.menuS = CFG.start;
    this.playerS = CFG.start;
    this.lanePos = 1;
    this.laneTarget = 1;
    this.y = 0;
    this.vy = 0;
    this.sliding = false;
    this.quizActive = false;
    this.ui.hideQuiz();
    this.audio.stopAmbient();
    this.audio.stopWind();
    tts.stop();
    this.ui.setSpeaking(false);
    this.world.update(CFG.start, 0);
    this.updateEnv();
    this.snapCamera();
    this.player.setSkin(skinById(this.equipped));
  }

  progress() {
    return Math.min(1, Math.max(0, (this.playerS - CFG.start) / (RUN.finish - CFG.start)));
  }

  startRun() {
    this.audio.resume();
    this.audio.stopAmbient();
    this.ui.closeModals();
    this.bankCrystals();
    this.buildRun();
    this.ui.showScreen(null);
    this.ui.showTouchControls(this.ui.hasTouch());
    this.ui.setHearts(CFG.hearts, 3);
    this.ui.setHUD({
      score: 0, combo: 1, timeLeft: RUN.duration, crystals: 0,
      progress: 0, zoneName: ZONES[0].name, hearts: CFG.hearts,
    });
    this.world.update(CFG.start, 0);
    this.updateEnv();
    this.snapCamera();
    this.state = STATE.COUNT;
    this.countT = 3.6;
    this.countShown = 4;
    this.goShown = false;
    const badge = document.getElementById('modeBadge');
    if (badge) {
      badge.hidden = !(this.teacher || this.daily);
      badge.textContent = this.teacher ? '🎓 โหมดครู' : '📅 โหมดวันนี้';
    }
    this.ui.countdown(3);
    this.audio.tick();
  }

  /* ------------------------------ input ----------------------------- */

  bindEvents() {
    window.addEventListener('keydown', (e) => this.onKey(e));

    document.getElementById('btnStart').addEventListener('click', () => {
      this.audio.click();
      this.startRun();
    });
    document.getElementById('btnAgain').addEventListener('click', () => {
      this.audio.click();
      this.startRun();
    });
    document.getElementById('btnHome').addEventListener('click', () => {
      this.audio.click();
      this.enterMenu();
    });
    document.getElementById('btnResume').addEventListener('click', () => this.resume());
    document.getElementById('btnRestart').addEventListener('click', () => {
      this.audio.click();
      this.startRun();
    });
    document.getElementById('btnQuit').addEventListener('click', () => this.enterMenu());
    document.getElementById('btnPause').addEventListener('click', () => this.pause());
    document.getElementById('btnSound').addEventListener('click', () => this.toggleSound());

    // ปุ่มเต็มหน้าจอ (Fullscreen)
    const btnFs = document.getElementById('btnFullscreen');
    if (btnFs) {
      btnFs.addEventListener('click', () => this.toggleFullscreen());
      const updateFsIcons = () => {
        const isFs = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement);
        const enterIco = document.getElementById('fsEnterIcon');
        const exitIco = document.getElementById('fsExitIcon');
        if (enterIco && exitIco) {
          enterIco.style.display = isFs ? 'none' : 'block';
          exitIco.style.display = isFs ? 'block' : 'none';
        }
      };
      document.addEventListener('fullscreenchange', updateFsIcons);
      document.addEventListener('webkitfullscreenchange', updateFsIcons);
    }

    // ปุ่มอ่านโจทย์ออกเสียง (TTS) บนการ์ดคำถาม
    const btnSpeak = document.getElementById('btnSpeakQuiz');
    if (btnSpeak) {
      btnSpeak.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.ui.currentQuiz) {
          this.ui.setSpeaking(true);
          tts.speakQuestion(this.ui.currentQuiz, false);
          // ฟังจบให้ถอนสถานะ
          setTimeout(() => {
            if (!tts.currentUtterance) this.ui.setSpeaking(false);
          }, 2500);
        }
      });
    }

    // โหมด
    for (const b of this.ui.d.modeRow.querySelectorAll('.mode-btn')) {
      b.addEventListener('click', () => this.setMode(b.dataset.mode));
    }
    this.ui.d.teacherToggle.addEventListener('click', () => this.toggleTeacher());
    this.ui.d.dailyToggle.addEventListener('click', () => this.toggleDaily());

    // ร้านค้า / อันดับ / ตั้งค่า
    document.getElementById('btnShop').addEventListener('click', () => this.openShop());
    document.getElementById('btnBoard').addEventListener('click', () => this.openBoard());
    document.getElementById('btnSettings').addEventListener('click', () => this.openSettings());
    for (const b of document.querySelectorAll('[data-close]')) {
      b.addEventListener('click', () => this.ui.hideModal(b.dataset.close));
    }
    document.getElementById('btnClearBoard').addEventListener('click', () => this.clearBoard());

    // ตั้งค่า
    document.getElementById('setSound').addEventListener('click', () => this.toggleSound());
    const ttsToggle = document.getElementById('setTts');
    if (ttsToggle) {
      ttsToggle.addEventListener('click', () => {
        this.settings.tts = !(this.settings.tts !== false);
        ttsToggle.setAttribute('aria-pressed', String(this.settings.tts));
        tts.setEnabled(this.settings.tts);
        this.saveProgress();
        this.ui.tip(this.settings.tts ? 'เปิดเสียงอ่านโจทย์ (TTS)' : 'ปิดเสียงอ่านโจทย์ (TTS)', 2000);
      });
    }
    document.getElementById('setMotion').addEventListener('click', () => {
      this.settings.reduceMotion = !this.settings.reduceMotion;
      document.getElementById('setMotion').setAttribute('aria-pressed', String(this.settings.reduceMotion));
      this.saveProgress();
      this.ui.reduceMotion(this.settings.reduceMotion);
    });
    document.getElementById('setColorBlind').addEventListener('click', () => {
      this.settings.colorBlind = !this.settings.colorBlind;
      document.getElementById('setColorBlind').setAttribute('aria-pressed', String(this.settings.colorBlind));
      A11Y.colorBlind = this.settings.colorBlind;
      document.body.classList.toggle('cb-safe', this.settings.colorBlind);
      this.saveProgress();
      this.ui.tip(this.settings.colorBlind ? 'เปิดโหมดตาบอดสี — จะมีผลกับประตูรอบถัดไป' : 'ปิดโหมดตาบอดสี', 2400);
    });
    for (const b of document.querySelectorAll('#setText button')) {
      b.addEventListener('click', () => {
        this.settings.textScale = Number(b.dataset.text);
        for (const x of document.querySelectorAll('#setText button')) {
          x.classList.toggle('is-active', x === b);
        }
        this.ui.textLarge(this.settings.textScale > 1);
        this.saveProgress();
      });
    }
    document.getElementById('btnExport').addEventListener('click', () => this.exportTelemetry());

    // คลังโจทย์ CSV (Custom Questions)
    const btnCustom = document.getElementById('btnCustomQuestions');
    if (btnCustom) btnCustom.addEventListener('click', () => this.openCustomQuestions());

    const btnBadgeReset = document.getElementById('btnBadgeReset');
    if (btnBadgeReset) {
      btnBadgeReset.addEventListener('click', (e) => {
        e.stopPropagation();
        setCustomQuestions(null);
        this.updateCustomQuestionBadge();
        this.buildRun();
        this.ui.tip('คืนค่าใช้โจทย์มาตรฐาน 78 ข้อแล้ว', 2200);
        this.audio.click();
      });
    }

    const btnResetDefault = document.getElementById('btnResetDefaultQuestions');
    if (btnResetDefault) {
      btnResetDefault.addEventListener('click', () => {
        setCustomQuestions(null);
        this.updateCustomQuestionBadge();
        this.buildRun();
        const previewSection = document.getElementById('csvPreviewSection');
        if (previewSection) previewSection.classList.add('is-hidden');
        const saveBtn = document.getElementById('btnSaveCustomQuestions');
        if (saveBtn) saveBtn.disabled = true;
        this.ui.tip('คืนค่าใช้โจทย์มาตรฐาน 78 ข้อแล้ว', 2200);
        this.audio.click();
      });
    }

    const btnDl = document.getElementById('btnDownloadTemplate');
    if (btnDl) {
      btnDl.addEventListener('click', () => {
        downloadSampleCSV();
        this.ui.tip('ดาวน์โหลดแม่แบบ CSV เรียบร้อยแล้ว', 2200);
      });
    }

    // Drop zone & File Input
    const dropZone = document.getElementById('csvDropZone');
    const fileInput = document.getElementById('csvFileInput');
    if (dropZone && fileInput) {
      dropZone.addEventListener('click', () => fileInput.click());
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (evt) => {
          this.processCSVText(evt.target.result);
          fileInput.value = '';
        };
        reader.readAsText(file, 'UTF-8');
      });

      ['dragenter', 'dragover'].forEach((eventName) => {
        dropZone.addEventListener(eventName, (e) => {
          e.preventDefault();
          dropZone.classList.add('dragover');
        });
      });
      ['dragleave', 'drop'].forEach((eventName) => {
        dropZone.addEventListener(eventName, (e) => {
          e.preventDefault();
          dropZone.classList.remove('dragover');
        });
      });
      dropZone.addEventListener('drop', (e) => {
        const file = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (evt) => {
          this.processCSVText(evt.target.result);
        };
        reader.readAsText(file, 'UTF-8');
      });
    }

    // Paste toggle & parse
    const togglePasteBtn = document.getElementById('btnTogglePaste');
    const pasteBox = document.getElementById('csvPasteBox');
    if (togglePasteBtn && pasteBox) {
      togglePasteBtn.addEventListener('click', () => {
        pasteBox.classList.toggle('is-hidden');
      });
    }
    const fillSampleBtn = document.getElementById('btnFillSampleText');
    if (fillSampleBtn) {
      fillSampleBtn.addEventListener('click', () => {
        document.getElementById('csvTextarea').value = generateSampleCSV().replace(/^\uFEFF/, '');
      });
    }
    const parseTextBtn = document.getElementById('btnParseTextarea');
    if (parseTextBtn) {
      parseTextBtn.addEventListener('click', () => {
        const val = document.getElementById('csvTextarea').value;
        this.processCSVText(val);
      });
    }

    // Save custom questions
    const saveCustomBtn = document.getElementById('btnSaveCustomQuestions');
    if (saveCustomBtn) {
      saveCustomBtn.addEventListener('click', () => {
        if (!this.stagedCustomQuestions || !this.stagedCustomQuestions.length) return;
        setCustomQuestions(this.stagedCustomQuestions);
        this.updateCustomQuestionBadge();
        this.buildRun();
        this.ui.hideModal('modalCustomQuestions');
        this.ui.tip(`บันทึกโจทย์กำหนดเอง ${this.stagedCustomQuestions.length} ข้อแล้ว! พร้อมลุย`, 2600);
        this.audio.collect();
      });
    }

    // board tabs
    for (const b of this.ui.d.boardTabs.querySelectorAll('.board-tab')) {
      b.addEventListener('click', () => this.openBoard(b.dataset.tab));
    }
    document.getElementById('boardTabClass').hidden = !cloudBoardEnabled();

    document.getElementById('setName').addEventListener('change', (e) => {
      this.settings.name = e.target.value.trim().slice(0, 12);
      this.saveProgress();
    });

    for (const btn of document.querySelectorAll('.touch-btn')) {
      const act = btn.dataset.act;
      btn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        this.action(act);
      });
    }

    // ปัดหน้าจอ
    const canvas = this.renderer.domElement;
    let sx = 0;
    let sy = 0;
    let st = 0;
    canvas.addEventListener('pointerdown', (e) => {
      sx = e.clientX; sy = e.clientY; st = performance.now();
    });
    canvas.addEventListener('pointerup', (e) => {
      const dx = e.clientX - sx;
      const dy = e.clientY - sy;
      const dt = performance.now() - st;
      if (dt > 700) return;
      if (Math.abs(dx) > 42 && Math.abs(dx) > Math.abs(dy)) {
        this.action(dx > 0 ? 'right' : 'left');
      } else if (Math.abs(dy) > 48) {
        this.action(dy < 0 ? 'jump' : 'slide');
      }
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden && this.state === STATE.PLAY) this.pause();
    });
  }

  onKey(e) {
    const code = e.code;
    if (code === 'Escape') {
      if (this.ui.anyModalOpen()) {
        this.ui.closeModals();
        return;
      }
    }
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Space'].includes(code)) {
      if (this.state === STATE.PLAY || this.state === STATE.PAUSE) e.preventDefault();
    }
    if (code === 'Enter' && (this.state === STATE.MENU || this.state === STATE.END) && !this.ui.anyModalOpen()) {
      this.startRun();
      return;
    }
    if (code === 'Escape' || code === 'KeyP') {
      if (this.state === STATE.PLAY) this.pause();
      else if (this.state === STATE.PAUSE) this.resume();
      return;
    }
    if (this.state !== STATE.PLAY) return;

    if (code === 'ArrowLeft' || code === 'KeyA') this.action('left');
    else if (code === 'ArrowRight' || code === 'KeyD') this.action('right');
    else if (code === 'Space' || code === 'ArrowUp' || code === 'KeyW') this.action('jump');
    else if (code === 'ArrowDown' || code === 'KeyS') this.action('slide');
  }

  /** input buffer: กดกระโดด/สไลด์ก่อนลงพื้นเล็กน้อยจะถูกเก็บไว้ทำทันทีที่แตะพื้น */
  action(act) {
    if (this.state === STATE.MENU && act === 'jump') {
      this.startRun();
      return;
    }
    if (this.state !== STATE.PLAY) return;

    if (act === 'left') {
      if (this.laneTarget > 0) {
        this.laneTarget -= 1;
        this.audio.click();
      }
    } else if (act === 'right') {
      if (this.laneTarget < 2) {
        this.laneTarget += 1;
        this.audio.click();
      }
    } else if (act === 'jump') {
      if (this.grounded && !this.sliding) this.doJump();
      else this.buffered = { act, until: performance.now() + 160 };
    } else if (act === 'slide') {
      if (this.grounded && !this.sliding) this.doSlide();
      else this.buffered = { act, until: performance.now() + 160 };
    }
  }

  doJump() {
    this.vy = 6.6;
    this.grounded = false;
    this.buffered = null;
    this.audio.jump();
  }

  doSlide() {
    this.sliding = true;
    this.slideT = 0.68;
    this.buffered = null;
    this.audio.land();
  }

  toggleSound() {
    this.soundOn = !this.soundOn;
    this.settings.sound = this.soundOn;
    this.audio.setEnabled(this.soundOn);
    this.ui.setSound(this.soundOn);
    document.getElementById('setSound').setAttribute('aria-pressed', String(this.soundOn));
    if (this.soundOn && this.state === STATE.PLAY) this.audio.startAmbient();
    this.saveProgress();
  }

  setMode(modeId) {
    if (!MODES[modeId]) return;
    this.mode = modeId;
    this.ui.setMode(modeId);
    this.saveProgress();
    this.audio.click();
  }

  toggleTeacher() {
    this.teacher = !this.teacher;
    this.ui.setTeacher(this.teacher);
    this.audio.click();
    this.ui.tip(this.teacher ? 'โหมดครู: ไม่เสียหัวใจและไม่จบเพราะหมดเวลา' : 'โหมดปกติ: มี 3 หัวใจและจับเวลา', 2200);
  }

  toggleDaily() {
    this.daily = !this.daily;
    this.ui.setDaily(this.daily);
    this.audio.click();
    this.ui.tip(this.daily ? 'โหมดวันนี้: ทุกคนได้คำถามและเส้นทางชุดเดียวกันทั้งวัน' : 'โหมดปกติ: ป่าสุ่มใหม่ทุกรอบ', 2400);
  }

  toggleFullscreen() {
    const isFs = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement;
    const el = document.documentElement;
    if (!isFs) {
      if (el.requestFullscreen) {
        el.requestFullscreen().catch(() => {});
      } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen();
      } else {
        el.classList.add('ios-fake-fullscreen');
        window.scrollTo(0, 1);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
      el.classList.remove('ios-fake-fullscreen');
    }
  }

  pause() {
    if (this.state !== STATE.PLAY) return;
    this.state = STATE.PAUSE;
    const m = MODES[this.mode];
    this.ui.setPauseInfo(`${m.label} · คะแนน ${this.score.toLocaleString('en-US')} · ตอบถูก ${this.correctCount}/${this.answered}`);
    this.ui.showScreen('pause');
    this.audio.stopAmbient();
    this.audio.stopWind();
    tts.stop();
    this.ui.setSpeaking(false);
  }

  resume() {
    if (this.state !== STATE.PAUSE) return;
    this.state = STATE.PLAY;
    this.ui.showScreen(null);
    this._lastT = performance.now();
    if (this.soundOn) {
      this.audio.startAmbient();
      this.audio.startWind();
    }
  }

  /* ------------------------------ update ---------------------------- */

  loop() {
    requestAnimationFrame(this._loop);
    const now = performance.now();
    const real = Math.min(0.25, Math.max(0, (now - this._lastT) / 1000));
    this._lastT = now;
    const raw = Math.min(0.05, real);

    if (this.state === STATE.PLAY) this.updatePlay(real, raw);
    else if (this.state === STATE.ZONE) this.updateZone(real, raw);
    else if (this.state === STATE.MENU) this.updateMenu(raw);
    else if (this.state === STATE.COUNT) this.updateCountdown(real);

    this.renderer.render(this.scene, this.camera);
  }

  updateMenu(dt) {
    this.menuS += dt * 3.4;
    this.playerS = this.menuS;
    this.speed = 6;
    this.world.update(this.playerS, dt);
    this.updatePlayerVisual(dt);
    this.updateCamera(dt);
    this.updateEnv();
  }

  updateCountdown(dt) {
    this.countT -= dt;
    const n = Math.ceil(this.countT - 0.6);
    if (n > 0 && n !== this.countShown) {
      this.countShown = n;
      this.ui.countdown(n);
      this.audio.tick();
    }
    if (this.countT <= 0.6 && !this.goShown) {
      this.goShown = true;
      this.ui.countdown('GO!');
      this.audio.go();
    }
    this.player.update(dt, { speed: 3, airborne: false, sliding: false });
    this.world.update(CFG.start, dt);
    this.updatePlayerVisual(dt);
    this.updateCamera(dt);
    this.updateEnv();
    if (this.countT <= 0) {
      this.ui.hideCountdown();
      this.state = STATE.PLAY;
      this.speed = CFG.speed.base;
      this._lastT = performance.now();
      if (this.soundOn) {
        this.audio.startAmbient();
        this.audio.startWind();
      }
      this.ui.tip('ใช้ ← → เปลี่ยนเลน', 2200);
    }
  }

  /** หน้า "โซนเคลียร์" ระหว่างเปลี่ยนโซน */
  updateZone(real, raw) {
    this.zoneT -= real;
    this.player.update(raw, { speed: 3, airborne: false, sliding: false });
    this.updateCamera(raw);
    this.world.update(this.playerS, raw * 0.4);
    this.updateEnv();
    if (this.zoneT <= 0) {
      this.ui.hideZoneClear();
      this.state = STATE.PLAY;
      this._lastT = performance.now();
      this.ui.tip(`เข้าสู่ ${ZONES[Math.min(2, this.zoneCleared + 1)].name}`, 2400);
    }
  }

  updatePlay(real, raw) {
    this.runTime += real;
    this.timeUsed += real;
    this.timeLeft = Math.max(0, this.timeLeft - real);

    // hit-stop ตอนชน
    if (this.hitStop > 0) {
      this.hitStop -= real;
      this.updateCamera(raw);
      this.updatePlayerVisual(raw);
      return;
    }

    // tutorial tips
    const tips = [
      [3.2, 'กด Space เพื่อกระโดดข้ามขอนไม้'],
      [6.8, 'กด ↓ เพื่อสไลด์ลอดกิ่งไม้'],
      [10.5, 'เก็บผลึกสีทองเพื่อสะสมไว้ปลดล็อกหมวก'],
    ];
    while (this.tipIndex < tips.length && this.runTime > tips[this.tipIndex][0]) {
      this.ui.tip(tips[this.tipIndex][1], 2200);
      this.tipIndex++;
    }

    if (this.timeLeft <= 0 && !this.timeWarned) {
      this.timeWarned = true;
      if (this.teacher) {
        this.ui.tip('หมดเวลาแล้ว — โหมดครูจะเล่นต่อได้เรื่อย ๆ', 2600);
      } else {
        this.endRun('timeup');
        return;
      }
    }

    // slow motion ก่อนถึงประตูคำถาม + ช่วงอ่านเฉลย
    const slowGoal = this.quizActive ? CFG.slowMo : (this.postSlow > 0 ? 0.84 : 1);
    this.slowMo += (slowGoal - this.slowMo) * (1 - Math.exp(-raw * 7));
    this.postSlow = Math.max(0, this.postSlow - raw);

    const zone = zoneIndexAt(this.playerS);
    const baseSpeed = CFG.speed.base + zone * CFG.speed.zone
      + (this.playerS / RUN.finish) * CFG.speed.progress;
    const speedGoal = Math.min(CFG.speed.max, baseSpeed);
    this.speed += (speedGoal - this.speed) * (1 - Math.exp(-raw * 1.1));

    const dip = this.speedDip > 0 ? 0.6 : 1;
    this.speedDip = Math.max(0, this.speedDip - raw);

    if (this.soundOn) {
      this.audio.updateSpeed(this.speed, CFG.speed.max);
    }

    const dt = raw * this.slowMo * dip;
    this.playerS += this.speed * dt;

    // เลน
    this.lanePos += (this.laneTarget - this.lanePos) * (1 - Math.exp(-raw * 9));

    // กระโดด
    if (!this.grounded) {
      this.vy -= 18 * (raw * 0.9);
      this.y += this.vy * raw * 0.9;
      if (this.y <= 0) {
        this.y = 0;
        this.vy = 0;
        this.grounded = true;
        this.player.land();
        this.audio.land();
        if (this.buffered && performance.now() < this.buffered.until) {
          const act = this.buffered.act;
          this.buffered = null;
          if (act === 'jump') this.doJump();
          else this.doSlide();
        }
      }
    }

    // สไลด์
    if (this.sliding) {
      this.slideT -= raw;
      if (this.slideT <= 0) this.sliding = false;
    }

    this.invuln = Math.max(0, this.invuln - raw);

    // เสียงฝีเท้า
    if (this.grounded && !this.sliding) {
      this.stepTimer += raw;
      const interval = Math.max(0.22, 0.46 - this.speed * 0.012);
      if (this.stepTimer > interval) {
        this.stepTimer = 0;
        this.audio.step();
      }
    }

    this.world.update(this.playerS, dt);
    this.updateGates();
    this.checkCollisions();
    this.updateWarnings(raw);
    this.updatePlayerVisual(raw);
    this.updateCamera(raw);
    this.updateEnv();

    this._hudAcc += raw;
    this.ui.setHUD({
      score: this.score,
      combo: this.combo,
      timeLeft: this.timeLeft,
      crystals: this.crystals,
      progress: this.progress(),
      zoneName: ZONES[zone].name,
      hearts: this.hearts,
    });
    if (this._hudAcc > 0.15) {
      this._hudAcc = 0;
      this.ui.setTrackLabel(Math.min(RUN.finish, this.playerS), RUN.finish);
    }

    if (zone !== this.zoneShown) {
      if (this.zoneShown !== -1) this.ui.tip(ZONES[zone].name, 2000);
      this.zoneShown = zone;
    }

    // ถึงรอยต่อโซน → โซนเคลียร์
    const boundary = zoneLen() * (this.zoneCleared + 1);
    if (this.zoneCleared < 2 && this.playerS >= boundary) {
      this.enterZoneClear();
      return;
    }

    if (this.playerS >= RUN.finish) this.endRun('finish');
  }

  enterZoneClear() {
    const zi = this.zoneCleared;
    const st = this.zoneStats[zi];
    const pts = this.score - this.zoneStartScore;
    this.zoneStartScore = this.score;
    const acc = st.answered > 0 ? st.correct / st.answered : 1;
    this.zoneCleared += 1;
    this.state = STATE.ZONE;
    this.zoneT = 2.6;
    this.quizActive = false;
    this.ui.hideQuiz();
    this.ui.bossBanner(false);
    this.ui.warn(false);
    this.audio.zoneClear();
    this.ui.showZoneClear({
      title: `${ZONES[zi].name} — เคลียร์!`,
      answered: st.answered,
      correct: st.correct,
      score: pts,
      progress: Math.min(1, Math.max(0.12, acc)),
    });
  }

  updatePlayerVisual(dt) {
    const f = this.path.frame(this.playerS);
    const lx = laneOffset(this.lanePos);
    const px = f.pos.x + f.right.x * lx;
    const pz = f.pos.z + f.right.z * lx;

    this.player.group.position.set(px, this.y, pz);
    this._negRight.copy(f.right).negate();
    this._basis.makeBasis(this._negRight, UP, f.tangent);
    this.player.group.quaternion.setFromRotationMatrix(this._basis);
    this.player.group.rotateZ(-(this.laneTarget - this.lanePos) * 0.16);

    this.player.update(dt, {
      speed: this.speed,
      airborne: !this.grounded,
      sliding: this.sliding,
    });

    this.player.shadow.position.set(px, 0.03, pz);
    this.player.setShadow(this.y);
    this.player.setInvulnerable(this.invuln > 0, this.invuln);
  }

  updateCamera(raw) {
    const f = this.path.frame(this.playerS);
    const lx = laneOffset(this.lanePos);
    const px = f.pos.x + f.right.x * lx;
    const pz = f.pos.z + f.right.z * lx;

    const focus = this.quizActive ? 1 : 0;
    const portrait = Math.min(1, Math.max(0, (1.1 - this.camera.aspect) / 0.5));
    const back = 7.9 + Math.min(2.2, this.speed * 0.05) + focus * 1.0;
    const up = 3.7 + focus * 0.5 + portrait * 0.3;

    this.camGoal.set(px - f.tangent.x * back, this.y * 0.3 + up, pz - f.tangent.z * back);
    this.lookGoal.set(
      px + f.tangent.x * 10,
      this.y * 0.45 + 1.05 - portrait * 1.9,
      pz + f.tangent.z * 10
    );

    const k = 1 - Math.exp(-raw * 7);
    this.camera.position.lerp(this.camGoal, k);
    this.camLook.lerp(this.lookGoal, Math.min(1, k * 1.3));
    this.camera.lookAt(this.camLook);

    const shakeScale = this.settings.reduceMotion ? 0.15 : 1;
    if (this.shake > 0.002) {
      const s = this.shake * 0.28 * shakeScale;
      this.camera.position.x += (Math.random() - 0.5) * s;
      this.camera.position.y += (Math.random() - 0.5) * s;
      this.camera.position.z += (Math.random() - 0.5) * s;
      this.shake *= Math.exp(-raw * 5);
    }

    const fovGoal = (this.quizActive ? CFG.focusFov : 64)
      + Math.min(6, this.speed * 0.28)
      + portrait * 6;
    this.camera.fov += (fovGoal - this.camera.fov) * k * 0.6;
    this.camera.updateProjectionMatrix();
  }

  updateEnv() {
    const mix = zoneMix(this.playerS);
    const a = ZONES[mix.a];
    const b = ZONES[mix.b];
    const t = mix.t;
    const c1 = this._c1;
    const c2 = this._c2;

    this.fogColor.copy(c1.setHex(a.fog)).lerp(c2.setHex(b.fog), t);
    this.scene.fog.color.copy(this.fogColor);
    this.scene.fog.near = a.fogNear + (b.fogNear - a.fogNear) * t;
    this.scene.fog.far = a.fogFar + (b.fogFar - a.fogFar) * t;

    this.hemi.color.copy(c1.setHex(a.hemiSky)).lerp(c2.setHex(b.hemiSky), t);
    this.hemi.groundColor.copy(c1.setHex(a.hemiGround)).lerp(c2.setHex(b.hemiGround), t);
    this.hemi.intensity = a.hemiI + (b.hemiI - a.hemiI) * t;
    this.sun.color.copy(c1.setHex(a.sun)).lerp(c2.setHex(b.sun), t);
    this.sun.intensity = a.sunI + (b.sunI - a.sunI) * t;

    this.skyMat.uniforms.bottomColor.value.copy(this.fogColor);
    this.skyMat.uniforms.topColor.value.copy(c1.setHex(a.sky)).lerp(c2.setHex(b.sky), t);
    this.sky.position.copy(this.camera.position);
  }

  /* --------------------------- warnings ----------------------------- */

  updateWarnings(raw) {
    this.warnTimer -= raw;
    if (this.warnTimer > 0) return;
    this.warnTimer = 0.1;
    const list = this.world.entitiesNear(this.playerS + 8, 10);
    let danger = false;
    if (list) {
      const laneX = laneOffset(this.lanePos);
      for (const e of list) {
        if (e.kind !== 'obstacle' || !e.alive) continue;
        const ds = e.s - this.playerS;
        if (ds < 1 || ds > 16) continue;
        if (Math.abs(e.laneX - laneX) > 1.1) continue;
        if (e.type === 'log' && !this.grounded) continue;
        if (e.type === 'branch' && this.sliding) continue;
        danger = true;
        break;
      }
    }
    this.ui.warn(danger);
  }

  /* ------------------------------ gates ----------------------------- */

  updateGates() {
    const g = this.gates[this.gateCursor];
    if (!g) return;

    if (!g.triggered && this.playerS >= g.s - CFG.questionLead) {
      g.triggered = true;
      g.shownAt = performance.now();
      g.correctLane = this.ui.showQuiz(g.q, { boss: g.boss });
      this.quizActive = true;
      this.activeGate = g;
      this.audio.gatePass();
      if (this.settings.tts !== false) {
        this.ui.setSpeaking(true);
        tts.speakQuestion(g.q, false);
      }
      if (g.boss) {
        this.ui.bossBanner(true);
        this.audio.boss();
        this.shake = 0.18;
      }
    }

    if (g.triggered && this.playerS >= g.s) this.resolveGate(g);
  }

  resolveGate(g) {
    if (this.state === STATE.END) return;
    const lane = Math.max(0, Math.min(2, Math.round(this.lanePos)));
    const good = lane === g.correctLane;
    const boss = !!g.boss;
    const mult = boss ? CFG.score.bossMult : 1;

    g.resolved = true;
    this.answered += 1;
    this.quizActive = false;
    this.activeGate = null;
    this.gateCursor += 1;
    this.world.resolveGate(g, lane);
    this.ui.hideQuiz();
    this.ui.bossBanner(false);
    tts.stop();
    this.ui.setSpeaking(false);
    this.postSlow = good ? 1.4 : 1.8;

    const q = g.q;
    const answerText = q.a[q.correct];
    const topic = q.topic || 'ทั่วไป';
    if (!this.topicStats.has(topic)) this.topicStats.set(topic, { correct: 0, total: 0 });
    const ts = this.topicStats.get(topic);
    ts.total += 1;

    const zs = this.zoneStats[g.zone];
    zs.answered += 1;

    const gain = good
      ? CFG.score.correct * mult + (this.combo - 1) * CFG.score.comboBonus * mult
      : 0;

    if (good) {
      const kp = CFG.score.correct * mult;
      this.knowledgeScore += kp;
      this.runnerScore += (this.combo - 1) * CFG.score.comboBonus * mult;
      this.combo = Math.min(5, this.combo + 1);
      this.correctCount += 1;
      ts.correct += 1;
      zs.correct += 1;
      this.timeLeft = Math.min(RUN.duration, this.timeLeft + CFG.time.correct * (boss ? 2 : 1));
      this.audio.correct();

      if (boss) {
        this.hearts = Math.min(3, this.hearts + 1);
        this.ui.setHearts(this.hearts, 3);
        this.ui.floater('หัวใจ +1', '');
      }
      this.ui.feedback(true, `${boss ? 'บอสพ่าย! ' : ''}ถูกต้อง! +${gain}`, q.why, 2400);
      this.ui.floater(`+${gain}`, '');
      this.shake = 0.12;
    } else {
      this.combo = 1;
      this.runnerScore = Math.max(0, this.runnerScore - CFG.score.wrong);
      this.missed.push({ q: q.q, answer: answerText, why: q.why });
      if (!this.teacher) this.hearts = Math.max(0, this.hearts - 1);
      this.timeLeft = Math.max(0, this.timeLeft - CFG.time.wrong);
      this.audio.wrong();
      if (!this.settings.reduceMotion) this.ui.flash();
      this.ui.setHearts(this.hearts, 3);
      this.ui.feedback(false, boss ? 'ยังไม่ถูก…' : 'ยังไม่ถูก…', `เฉลย: ${answerText} — ${q.why}`, 3200);
      this.shake = 0.65;
    }

    this.runTelemetry.push({
      q: q.id,
      topic,
      zone: g.zone,
      boss,
      correct: good,
      ms: Math.round(performance.now() - (g.shownAt || performance.now())),
      at: Math.round(this.playerS),
      mode: this.mode,
    });

    this.ui.setHUD({
      score: this.score, combo: this.combo, timeLeft: this.timeLeft,
      crystals: this.crystals, progress: this.progress(),
      zoneName: ZONES[zoneIndexAt(this.playerS)].name, hearts: this.hearts,
    });

    if (this.hearts <= 0 && !this.teacher) this.endRun('out');
  }

  /* ---------------------------- collisions --------------------------- */

  checkCollisions() {
    if (this.debugNoCollide) return;
    const list = this.world.entitiesNear(this.playerS, 3);
    if (!list) return;
    const laneX = laneOffset(this.lanePos);

    for (const e of list) {
      if (!e.alive) continue;
      const ds = e.s - this.playerS;

      if (e.kind === 'crystal') {
        if (Math.abs(ds) < 1.5 && Math.abs(e.laneX - laneX) < 1.05) {
          e.alive = false;
          e.mesh.visible = false;
          this.crystals += 1;
          this.runnerScore += CFG.score.crystal;
          this.audio.collect(this.combo + Math.floor(this.runTime * 0.5));
          this.ui.floater(`+${CFG.score.crystal}`, 'gold');
        }
        continue;
      }

      // near miss: ผ่านอุปสรรคเลนข้าง ๆ อย่างหวุดหวิด
      if (!e.nearMiss && Math.abs(ds) < 1.1) {
        const lateral = Math.abs(e.laneX - laneX);
        if (lateral > 1.15 && lateral < 3.4) {
          e.nearMiss = true;
          this.runnerScore += 10;
          this.audio.nearMiss();
          this.ui.floater('หวุดหวิด! +10', '');
        }
      }

      if (this.invuln > 0) continue;
      if (Math.abs(ds) > 1.3) continue;
      if (Math.abs(e.laneX - laneX) > 1.15) continue;

      if (e.type === 'log') {
        if (this.y > 0.78) continue;
        this.hitObstacle(e);
      } else if (e.type === 'branch') {
        if (this.sliding) continue;
        this.hitObstacle(e);
      } else if (e.type === 'puddle') {
        if (this.y > 0.22) continue;
        e.alive = false;
        e.mesh.visible = false;
        this.speedDip = 0.6;
        this.audio.splash();
        this.ui.tip('พื้นเปียก! กระโดดข้ามด้วย Space', 1600);
      } else if (e.type === 'rock') {
        if (this.y > 0.95) continue;
        this.hitObstacle(e);
      }
    }
  }

  hitObstacle(e) {
    if (this.state === STATE.END) return;
    e.alive = false;
    e.mesh.visible = false;
    if (!this.teacher) this.hearts = Math.max(0, this.hearts - 1);
    this.combo = 1;
    this.invuln = 1.35;
    this.speedDip = 1.0;
    this.shake = 0.8;
    this.hitStop = 0.07;
    this.audio.hit();
    if (!this.settings.reduceMotion) this.ui.flash();
    this.ui.setHearts(this.hearts, 3);
    if (this.hearts <= 0 && !this.teacher) this.endRun('out');
  }

  /* ------------------------------- end ------------------------------- */

  endRun(reason) {
    if (this.state === STATE.END) return;
    this.state = STATE.END;
    this.ui.hideQuiz();
    this.ui.bossBanner(false);
    this.ui.warn(false);
    this.ui.d.feedback.hidden = true;
    this.audio.stopAmbient();
    this.audio.stopWind();
    tts.stop();
    this.ui.setSpeaking(false);

    const accuracy = this.answered > 0 ? this.correctCount / this.answered : 0;
    this.bonusScore = reason === 'finish' ? Math.round(this.timeLeft) * CFG.score.finishPerSec : 0;
    const total = this.knowledgeScore + this.runnerScore + this.bonusScore;

    let stars = 1;
    if (accuracy >= 0.8 && this.hearts >= 2 && reason !== 'out') stars = 3;
    else if (accuracy >= 0.55 || reason === 'finish') stars = 2;
    if (reason === 'out') stars = 1;

    const prevBest = this.best;
    const newBest = total > prevBest;
    if (newBest) {
      this.best = total;
      this.saveBest(total, accuracy);
      this.ui.setBest(this.best);
      this.audio.finish();
    }

    // ผลึกเข้ากระเป๋า
    const crystalsCollected = this.crystals;
    this.bankCrystals();

    // บันทึกอันดับ
    const entry = {
      score: total,
      accuracy,
      mode: this.mode,
      daily: this.daily,
      date: new Date().toISOString(),
      dateLabel: new Date().toLocaleDateString('th-TH', { day: 'numeric', month: 'short' }),
      name: (this.settings.name || '').trim() || 'นักสำรวจ',
    };
    const board = readJSON(KEYS.board, []);
    board.push(entry);
    board.sort((a, b) => b.score - a.score);
    writeJSON(KEYS.board, board.slice(0, 30));
    submitScore(entry);

    // telemetry
    const tel = readJSON(KEYS.telemetry, []);
    const merged = tel.concat(this.runTelemetry).slice(-400);
    writeJSON(KEYS.telemetry, merged);

    const titles = {
      finish: 'จบการผจญภัย!',
      timeup: 'หมดเวลาพอดี!',
      out: 'พลังหมดแล้ว…',
    };

    // สรุปตามหัวข้อ
    const topics = [...this.topicStats.entries()]
      .map(([topic, v]) => ({ topic, correct: v.correct, total: v.total, pct: v.total ? v.correct / v.total : 0 }))
      .sort((a, b) => a.pct - b.pct);

    const weak = topics.find((t) => t.pct < 0.6);
    let nextGoal;
    if (newBest) {
      nextGoal = weak
        ? `สถิติใหม่! ลองทบทวนหัวข้อ "${weak.topic}" เพื่อความแม่นยำที่สูงขึ้น`
        : 'สถิติใหม่! ลองเพิ่มความเร็วหรือเล่นโหมด 10 นาทีเพื่อคะแนนที่สูงขึ้น';
    } else {
      const diff = Math.max(1, prevBest - total);
      nextGoal = `อีก ${diff.toLocaleString('en-US')} คะแนนจะทำลายสถิติเดิม`
        + (weak ? ` · จุดที่ควรทบทวน: ${weak.topic}` : '');
    }

    this.ui.showSummary({
      title: titles[reason] || 'จบเกม',
      score: total,
      stars,
      correct: this.correctCount,
      total: this.answered,
      accuracy,
      crystals: crystalsCollected,
      timeUsed: this.timeUsed,
      missed: this.missed.slice(0, 5),
      newBest,
      knowledge: this.knowledgeScore,
      runner: this.runnerScore,
      bonus: this.bonusScore,
      topics: topics.slice(0, 8),
      nextGoal,
    });
  }

  /* ------------------------------ meta UI ---------------------------- */

  /** เก็บผลึกที่วิ่งได้เข้ากระเป๋า (เรียกตอนจบรอบ/ออกเกม) */
  bankCrystals() {
    if (!this.crystals) return;
    this.wallet += this.crystals;
    this.crystals = 0;
    this.saveProgress();
    this.ui.setWallet(this.wallet);
  }

  openShop() {
    this.audio.click();
    this.renderShop();
    this.ui.showModal('modalShop');
  }

  renderShop() {
    const items = SKINS.map((s) => ({
      id: s.id,
      name: s.name,
      emoji: s.emoji,
      desc: s.desc,
      cost: s.cost,
      hat: `#${s.hat.toString(16).padStart(6, '0')}`,
      bag: `#${s.bag.toString(16).padStart(6, '0')}`,
      owned: this.ownedSkins.has(s.id),
      equipped: this.equipped === s.id,
    }));
    this.ui.renderShop({
      items,
      wallet: this.wallet,
      onBuy: (id) => this.buySkin(id),
      onEquip: (id) => this.equipSkin(id),
    });
  }

  buySkin(id) {
    const skin = SKINS.find((s) => s.id === id);
    if (!skin || this.ownedSkins.has(id)) return;
    if (this.wallet < skin.cost) {
      this.ui.tip('ผลึกไม่พอ — วิ่งเก็บผลึกเพิ่มก่อนนะ', 2000);
      return;
    }
    this.wallet -= skin.cost;
    this.ownedSkins.add(id);
    this.equipped = id;
    this.player.setSkin(skin);
    this.audio.unlock();
    this.saveProgress();
    this.ui.setWallet(this.wallet);
    this.renderShop();
    this.ui.tip(`ปลดล็อก ${skin.name} แล้ว!`, 2000);
  }

  equipSkin(id) {
    if (!this.ownedSkins.has(id)) return;
    this.equipped = id;
    this.player.setSkin(skinById(id));
    this.audio.click();
    this.saveProgress();
    this.renderShop();
  }

  openBoard(tab = 'all') {
    this.audio.click();
    this.boardTab = tab;
    this.ui.showModal('modalBoard');
    if (tab === 'class' && cloudBoardEnabled()) {
      this.ui.boardLoading('กำลังโหลดอันดับห้องเรียน…');
      fetchBoard(10).then((rows) => {
        this.ui.renderBoard(rows || [], 'class');
      });
      return;
    }
    this.renderBoard();
  }

  renderBoard() {
    const all = readJSON(KEYS.board, []).sort((a, b) => b.score - a.score);
    const today = dateKey();
    let list = all;
    if (this.boardTab === 'today') list = all.filter((e) => (e.date || '').slice(0, 10) === today);
    else if (this.boardTab === 'daily') list = all.filter((e) => e.daily);
    this.ui.renderBoard(list.slice(0, 10), this.boardTab || 'all');
  }

  clearBoard() {
    if (!window.confirm('ล้างอันดับทั้งหมดในเครื่องนี้?')) return;
    writeJSON(KEYS.board, []);
    writeJSON(KEYS.telemetry, []);
    this.renderBoard();
    this.ui.tip('ล้างอันดับและข้อมูลการเล่นแล้ว', 2000);
  }

  openSettings() {
    this.audio.click();
    document.getElementById('setSound').setAttribute('aria-pressed', String(this.soundOn));
    document.getElementById('setMotion').setAttribute('aria-pressed', String(!!this.settings.reduceMotion));
    document.getElementById('setColorBlind').setAttribute('aria-pressed', String(!!this.settings.colorBlind));
    document.getElementById('setName').value = this.settings.name || '';
    for (const b of document.querySelectorAll('#setText button')) {
      b.classList.toggle('is-active', Number(b.dataset.text) === Number(this.settings.textScale));
    }
    this.ui.showModal('modalSettings');
  }

  exportTelemetry() {
    const data = {
      exportedAt: new Date().toISOString(),
      game: 'jungle-science-run',
      version: 2,
      settings: this.settings,
      best: this.best,
      wallet: this.wallet,
      board: readJSON(KEYS.board, []),
      telemetry: readJSON(KEYS.telemetry, []),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jungle-science-run-${dateKey()}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    this.ui.tip('ส่งออกข้อมูลการเล่นแล้ว', 2000);
  }

  /* ---------------------- custom questions (CSV) ---------------------- */

  updateCustomQuestionBadge() {
    const isCustom = isUsingCustomQuestions();
    const active = getActiveQuestions();
    const count = isCustom ? active.length : 0;

    const badge = document.getElementById('customBadge');
    const badgeCount = document.getElementById('customCount');
    if (badge && badgeCount) {
      badge.hidden = !isCustom;
      badgeCount.textContent = count;
    }

    const dot = document.getElementById('csvStatusDot');
    const text = document.getElementById('csvStatusText');
    const resetBtn = document.getElementById('btnResetDefaultQuestions');
    if (dot && text) {
      dot.classList.toggle('active', isCustom);
      text.textContent = isCustom
        ? `กำลังใช้: โจทย์กำหนดเอง (${count} ข้อ)`
        : `กำลังใช้: คลังโจทย์มาตรฐาน (78 ข้อ)`;
    }
    if (resetBtn) {
      resetBtn.style.display = isCustom ? 'inline-flex' : 'none';
    }
  }

  openCustomQuestions() {
    this.audio.click();
    this.updateCustomQuestionBadge();
    this.stagedCustomQuestions = null;

    const previewSection = document.getElementById('csvPreviewSection');
    const saveBtn = document.getElementById('btnSaveCustomQuestions');
    if (previewSection) previewSection.classList.add('is-hidden');
    if (saveBtn) saveBtn.disabled = true;

    // ถ้าใช้ custom อยู่แล้ว แสดงรายการที่มีอยู่ใน preview ให้ดู
    if (isUsingCustomQuestions()) {
      const active = getActiveQuestions();
      this.renderCustomPreview(active, false);
    }

    this.ui.showModal('modalCustomQuestions');
  }

  renderCustomPreview(questions, enableSave = true) {
    const previewSection = document.getElementById('csvPreviewSection');
    const title = document.getElementById('csvPreviewTitle');
    const list = document.getElementById('csvPreviewList');
    const saveBtn = document.getElementById('btnSaveCustomQuestions');

    if (!previewSection || !title || !list) return;

    previewSection.classList.remove('is-hidden');
    title.textContent = `ตัวอย่างโจทย์ที่ตรวจพบ (${questions.length} ข้อ)`;
    if (saveBtn && enableSave) saveBtn.disabled = false;

    list.innerHTML = '';
    questions.slice(0, 50).forEach((q, i) => {
      const item = document.createElement('div');
      item.className = 'preview-item';
      const zoneName = `โซน ${q.zone + 1}`;
      item.innerHTML = `
        <div class="preview-meta">
          <span class="preview-zone">${zoneName}</span>
          <span class="preview-topic">${q.topic || 'ทั่วไป'}</span>
        </div>
        <div class="preview-q">${i + 1}. ${q.q}</div>
        <div class="preview-choices">
          <span class="preview-choice ${q.correct === 0 ? 'is-correct' : ''}">1: ${q.a[0]}</span>
          <span class="preview-choice ${q.correct === 1 ? 'is-correct' : ''}">2: ${q.a[1]}</span>
          <span class="preview-choice ${q.correct === 2 ? 'is-correct' : ''}">3: ${q.a[2]}</span>
        </div>
        ${q.why ? `<div class="preview-why">💡 ${q.why}</div>` : ''}
      `;
      list.appendChild(item);
    });

    if (questions.length > 50) {
      const more = document.createElement('div');
      more.className = 'upload-hint';
      more.style.textAlign = 'center';
      more.style.marginTop = '6px';
      more.textContent = `... และอีก ${questions.length - 50} ข้อ`;
      list.appendChild(more);
    }
  }

  processCSVText(text) {
    const res = parseCSV(text);
    if (!res.valid) {
      const err = res.errors.length ? res.errors[0] : 'รูปแบบไฟล์ CSV ไม่ถูกต้อง';
      this.ui.tip(`⚠️ ${err}`, 3500);
      return false;
    }
    this.stagedCustomQuestions = res.questions;
    this.renderCustomPreview(res.questions, true);
    this.ui.tip(`ตรวจพบคำถามสมบูรณ์ ${res.questions.length} ข้อ คลิก "ใช้ชุดคำถามนี้" เพื่อบันทึก`, 3000);
    this.audio.click();
    return true;
  }

  /* ------------------------------ debug ------------------------------ */

  teleport(s) {
    this.playerS = s;
    this.gateCursor = this.gates.findIndex((g) => g.s > s);
    if (this.gateCursor < 0) this.gateCursor = this.gates.length;
    for (const g of this.gates) {
      if (g.s <= s) {
        g.resolved = true;
        g.triggered = true;
      } else if (!g.resolved) {
        g.triggered = false;
      }
    }
    this.quizActive = false;
    this.ui.hideQuiz();
    this.ui.bossBanner(false);
    this.ui.warn(false);
    this.world.reset();
    this.world.update(s, 0);
    this.updateEnv();
    this.updatePlayerVisual(0.016);
    this.updateCamera(0.9);
  }

  debugGate(i) {
    const g = this.gates[i];
    if (!g) return;
    this.teleport(g.s - 38);
    this.gateCursor = i;
    g.triggered = false;
    g.resolved = false;
    this.lanePos = 1;
    this.laneTarget = 1;
  }
}

/* ------------------------------- boot -------------------------------- */

function boot() {
  const game = new Game();
  try {
    game.init();
  } catch (err) {
    console.error(err);
    game.ui.fatal('เกิดข้อผิดพลาดระหว่างเริ่มเกม');
  }
}

boot();

export { Game };
