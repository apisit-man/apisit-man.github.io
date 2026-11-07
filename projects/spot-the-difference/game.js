/**
 * Spot The Difference Game - Main Game Engine
 * Built for GitHub Pages (100% Client-Side, Zero Dependencies)
 */

// ==========================================================================
// Level Database
// ==========================================================================
const LEVELS = [
  {
    id: 1,
    title: "หมาป่าเจ้าเล่ห์กับเจ้าตูบ",
    image: "assets/images/card_1.jpg",
    pct_x: 59.0,
    pct_y_top: 15.1,
    pct_y_bot: 58.6,
    hint: "ลองเพ่งมองดูแถวๆ ด้านบนสุดของภาพสิ!"
  },
  {
    id: 2,
    title: "งานเลี้ยงในป่าหรรษา",
    image: "assets/images/card_2.jpg",
    pct_x: 61.1,
    pct_y_top: 33.8,
    pct_y_bot: 77.3,
    hint: "สังเกตรายละเอียดบริเวณกลาง-ขวาของภาพ"
  },
  {
    id: 3,
    title: "สวนสัตว์แสนสนุก",
    image: "assets/images/card_3.jpg",
    pct_x: 85.2,
    pct_y_top: 41.4,
    pct_y_bot: 78.8,
    hint: "ลองกวาดสายตาไปทางด้านขวามือดูหน่อยนะ"
  },
  {
    id: 4,
    title: "การผจญภัยของแก๊งสัตว์น้อย",
    image: "assets/images/card_4.jpg",
    pct_x: 84.1,
    pct_y_top: 19.2,
    pct_y_bot: 61.0,
    hint: "สังเกตมุมบนขวาของภาพให้ละเอียด"
  },
  {
    id: 5,
    title: "วันสดใสริมทุ่งหญ้า",
    image: "assets/images/card_5.jpg",
    pct_x: 75.5,
    pct_y_top: 44.9,
    pct_y_bot: 87.2,
    hint: "ลองสังเกตบริเวณฝั่งขวาของภาพดูนะ"
  },
  {
    id: 6,
    title: "บ้านน้อยในป่าใหญ่",
    image: "assets/images/card_6.jpg",
    pct_x: 72.3,
    pct_y_top: 31.7,
    pct_y_bot: 75.1,
    hint: "ดูบริเวณกึ่งกลางเยื้องไปทางขวา"
  },
  {
    id: 7,
    title: "ปิคนิคสุขสันต์",
    image: "assets/images/card_7.jpg",
    pct_x: 74.4,
    pct_y_top: 39.5,
    pct_y_bot: 82.1,
    hint: "สังเกตสิ่งของทางฝั่งขวามือ"
  },
  {
    id: 8,
    title: "เพื่อนรักในฟาร์ม",
    image: "assets/images/card_8.jpg",
    pct_x: 46.8,
    pct_y_top: 40.1,
    pct_y_bot: 83.0,
    hint: "สังเกตตรงจุดกึ่งกลางของภาพให้ดี"
  },
  {
    id: 9,
    title: "ตลาดนัดสัตว์ป่า",
    image: "assets/images/card_9.jpg",
    pct_x: 35.1,
    pct_y_top: 48.4,
    pct_y_bot: 91.2,
    hint: "ลองดูแถวด้านล่างซ้ายของภาพนะ"
  },
  {
    id: 10,
    title: "ภารกิจพิชิตยอดนักสืบ",
    image: "assets/images/card_10.jpg",
    pct_x: 48.9,
    pct_y_top: 15.6,
    pct_y_bot: 58.3,
    hint: "ลองเพ่งมองแถวด้านบนตรงกลางให้ดีๆ"
  }
];

// ==========================================================================
// Web Audio Sound Synthesizer (Zero External Dependencies)
// ==========================================================================
class SoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTone(freq, type, duration, startTime = 0, gainLevel = 0.15) {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + startTime);
      gain.gain.setValueAtTime(gainLevel, this.ctx.currentTime + startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + startTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(this.ctx.currentTime + startTime);
      osc.stop(this.ctx.currentTime + startTime + duration);
    } catch (e) {
      // Audio fallback fail silently
    }
  }

  correct() {
    this.init();
    // Cheerful 3-tone arpeggio (C5 -> E5 -> G5)
    this.playTone(523.25, 'sine', 0.18, 0.0, 0.2);
    this.playTone(659.25, 'sine', 0.22, 0.1, 0.2);
    this.playTone(783.99, 'sine', 0.35, 0.2, 0.25);
  }

  wrong() {
    this.init();
    // Gentle buzz
    this.playTone(140, 'triangle', 0.25, 0.0, 0.18);
  }

  hint() {
    this.init();
    this.playTone(440, 'sine', 0.1, 0.0, 0.15);
    this.playTone(880, 'sine', 0.25, 0.08, 0.15);
  }

  fanfare() {
    this.init();
    const melody = [523, 659, 784, 1046];
    melody.forEach((f, i) => {
      this.playTone(f, 'triangle', 0.3, i * 0.12, 0.2);
    });
  }
}

const sfx = new SoundFX();

// ==========================================================================
// Confetti Animation Engine
// ==========================================================================
class ConfettiEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.running = false;
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  fire(count = 80) {
    const colors = ['#F59E0B', '#10B981', '#3B82F6', '#EC4899', '#8B5CF6', '#EF4444'];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: this.canvas.width / 2 + (Math.random() - 0.5) * 200,
        y: this.canvas.height / 2 + (Math.random() - 0.5) * 100,
        vx: (Math.random() - 0.5) * 14,
        vy: -Math.random() * 12 - 4,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 10,
        life: 1.0,
        decay: Math.random() * 0.015 + 0.01
      });
    }
    if (!this.running) {
      this.running = true;
      this.loop();
    }
  }

  loop() {
    if (!this.running) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.28; // gravity
      p.rotation += p.vRot;
      p.life -= p.decay;

      if (p.life <= 0 || p.y > this.canvas.height) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = Math.max(0, p.life);
      this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      this.ctx.restore();
    }

    if (this.particles.length > 0) {
      requestAnimationFrame(() => this.loop());
    } else {
      this.running = false;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
}

// ==========================================================================
// Game Controller State
// ==========================================================================
class GameApp {
  constructor() {
    this.currentLevelIdx = 0;
    this.mode = 'casual'; // 'casual' | 'challenge'
    this.hintsLeft = 3;
    this.timerSeconds = 60;
    this.timerInterval = null;
    this.lives = 3;
    this.levelStartTime = Date.now();
    this.isLevelFinished = false;

    // Load saved progress from LocalStorage
    this.savedData = this.loadStorage();

    this.confetti = new ConfettiEngine('confetti-canvas');
    this.initDOM();
    this.bindEvents();
    this.loadLevel(this.currentLevelIdx);
    this.updateStatsUI();
  }

  loadStorage() {
    try {
      const raw = localStorage.getItem('spot_diff_save');
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return {
      unlockedLevel: 0, // 0-indexed (Level 1)
      stars: Array(LEVELS.length).fill(0),
      totalScore: 0
    };
  }

  saveStorage() {
    try {
      localStorage.setItem('spot_diff_save', JSON.stringify(this.savedData));
    } catch (e) {}
  }

  initDOM() {
    this.dom = {
      cardImage: document.getElementById('card-image'),
      imageWrapper: document.getElementById('image-wrapper'),
      cardStage: document.getElementById('card-stage'),
      levelNumTag: document.getElementById('level-number-tag'),
      levelTitle: document.getElementById('level-title-display'),
      markerTop: document.getElementById('marker-top'),
      markerBot: document.getElementById('marker-bot'),
      hintTop: document.getElementById('hint-indicator-top'),
      hintBot: document.getElementById('hint-indicator-bot'),
      hintBox: document.getElementById('hint-box'),
      hintText: document.getElementById('hint-text'),
      hintCount: document.getElementById('hint-count'),
      btnCloseHint: document.getElementById('btn-close-hint'),
      btnHint: document.getElementById('btn-hint'),
      modeBadge: document.getElementById('mode-badge'),
      btnSwitchMode: document.getElementById('btn-switch-mode'),
      totalStars: document.getElementById('total-stars'),
      timerContainer: document.getElementById('timer-container'),
      timerDisplay: document.getElementById('timer-display'),
      livesContainer: document.getElementById('lives-container'),
      livesDisplay: document.getElementById('lives-display'),
      btnSound: document.getElementById('btn-sound'),
      btnLevels: document.getElementById('btn-levels'),
      btnHelp: document.getElementById('btn-help'),
      btnHome: document.getElementById('btn-home'),
      btnPrevLevel: document.getElementById('btn-prev-level'),
      btnNextLevel: document.getElementById('btn-next-level'),
      clickLayer: document.getElementById('click-feedback-layer'),
      // Modals
      modalSuccess: document.getElementById('modal-success'),
      modalGameOver: document.getElementById('modal-gameover'),
      modalLevels: document.getElementById('modal-levels'),
      modalHelp: document.getElementById('modal-help'),
      modalCert: document.getElementById('modal-certificate'),
      levelsGrid: document.getElementById('levels-grid'),
      summaryTime: document.getElementById('summary-time'),
      summaryScore: document.getElementById('summary-score'),
      modalStars: document.getElementById('modal-stars'),
      btnReplay: document.getElementById('btn-replay'),
      btnNext: document.getElementById('btn-next'),
      btnRetry: document.getElementById('btn-retry'),
      btnCloseLevels: document.getElementById('btn-close-levels'),
      btnCloseHelp: document.getElementById('btn-close-help'),
      btnGotIt: document.getElementById('btn-got-it'),
      certCanvas: document.getElementById('cert-canvas'),
      playerNameInput: document.getElementById('player-name-input'),
      btnRenderCert: document.getElementById('btn-render-cert'),
      btnDownloadCert: document.getElementById('btn-download-cert'),
      btnCloseCert: document.getElementById('btn-close-cert')
    };
  }

  bindEvents() {
    // Click on Card Image
    this.dom.imageWrapper.addEventListener('click', (e) => this.handleCardClick(e));

    // Nav buttons
    this.dom.btnPrevLevel.addEventListener('click', () => {
      if (this.currentLevelIdx > 0) this.loadLevel(this.currentLevelIdx - 1);
    });
    this.dom.btnNextLevel.addEventListener('click', () => {
      if (this.currentLevelIdx < LEVELS.length - 1) this.loadLevel(this.currentLevelIdx + 1);
    });

    // Hint
    this.dom.btnHint.addEventListener('click', () => this.useHint());
    this.dom.btnCloseHint.addEventListener('click', () => {
      this.dom.hintBox.style.display = 'none';
    });

    // Mode Toggle
    this.dom.btnSwitchMode.addEventListener('click', () => this.toggleMode());

    // Sound Toggle
    this.dom.btnSound.addEventListener('click', () => {
      sfx.enabled = !sfx.enabled;
      this.dom.btnSound.textContent = sfx.enabled ? '🔊' : '🔇';
    });

    // Modal Triggers
    this.dom.btnLevels.addEventListener('click', () => this.openLevelsModal());
    this.dom.btnCloseLevels.addEventListener('click', () => this.dom.modalLevels.style.display = 'none');
    this.dom.btnHelp.addEventListener('click', () => this.dom.modalHelp.style.display = 'flex');
    this.dom.btnCloseHelp.addEventListener('click', () => this.dom.modalHelp.style.display = 'none');
    this.dom.btnGotIt.addEventListener('click', () => this.dom.modalHelp.style.display = 'none');
    this.dom.btnHome.addEventListener('click', () => this.openLevelsModal());

    // Modal Actions
    this.dom.btnReplay.addEventListener('click', () => {
      this.dom.modalSuccess.style.display = 'none';
      this.loadLevel(this.currentLevelIdx);
    });
    this.dom.btnNext.addEventListener('click', () => {
      this.dom.modalSuccess.style.display = 'none';
      if (this.currentLevelIdx < LEVELS.length - 1) {
        this.loadLevel(this.currentLevelIdx + 1);
      } else {
        this.openCertificateModal();
      }
    });
    this.dom.btnRetry.addEventListener('click', () => {
      this.dom.modalGameOver.style.display = 'none';
      this.loadLevel(this.currentLevelIdx);
    });

    // Certificate
    this.dom.btnRenderCert.addEventListener('click', () => this.renderCertificate());
    this.dom.btnDownloadCert.addEventListener('click', () => this.downloadCertificate());
    this.dom.btnCloseCert.addEventListener('click', () => this.dom.modalCert.style.display = 'none');
  }

  loadLevel(idx) {
    clearInterval(this.timerInterval);
    this.currentLevelIdx = idx;
    this.isLevelFinished = false;
    const lvl = LEVELS[idx];

    // Reset Markers & Hint Box
    this.dom.markerTop.style.display = 'none';
    this.dom.markerBot.style.display = 'none';
    this.dom.hintTop.style.display = 'none';
    this.dom.hintBot.style.display = 'none';
    this.dom.hintBox.style.display = 'none';

    // Position Markers
    this.dom.markerTop.style.left = `${lvl.pct_x}%`;
    this.dom.markerTop.style.top = `${lvl.pct_y_top}%`;
    this.dom.markerBot.style.left = `${lvl.pct_x}%`;
    this.dom.markerBot.style.top = `${lvl.pct_y_bot}%`;

    this.dom.hintTop.style.left = `${lvl.pct_x}%`;
    this.dom.hintTop.style.top = `${lvl.pct_y_top}%`;
    this.dom.hintBot.style.left = `${lvl.pct_x}%`;
    this.dom.hintBot.style.top = `${lvl.pct_y_bot}%`;

    // Set Text & Image
    this.dom.levelNumTag.textContent = `ด่านที่ ${idx + 1} จาก ${LEVELS.length}`;
    this.dom.levelTitle.textContent = lvl.title;
    this.dom.cardImage.src = lvl.image;

    // Nav Arrows state
    this.dom.btnPrevLevel.disabled = (idx === 0);
    this.dom.btnNextLevel.disabled = (idx >= LEVELS.length - 1);

    // Reset Hints
    this.hintsLeft = (this.mode === 'casual') ? 5 : 2;
    this.dom.hintCount.textContent = this.hintsLeft;
    this.dom.btnHint.disabled = false;

    // Reset Timers & Lives
    this.levelStartTime = Date.now();
    if (this.mode === 'challenge') {
      this.timerSeconds = 60;
      this.lives = 3;
      this.updateLivesUI();
      this.startTimer();
    }
  }

  startTimer() {
    this.updateTimerDisplay();
    this.timerInterval = setInterval(() => {
      this.timerSeconds--;
      this.updateTimerDisplay();

      if (this.timerSeconds <= 0) {
        clearInterval(this.timerInterval);
        this.triggerGameOver();
      }
    }, 1000);
  }

  updateTimerDisplay() {
    this.dom.timerDisplay.textContent = `${this.timerSeconds}s`;
    if (this.timerSeconds <= 10) {
      this.dom.timerContainer.classList.add('urgent');
    } else {
      this.dom.timerContainer.classList.remove('urgent');
    }
  }

  updateLivesUI() {
    let hearts = '';
    for (let i = 0; i < 3; i++) {
      hearts += (i < this.lives) ? '❤️' : '🖤';
    }
    this.dom.livesDisplay.textContent = hearts;
  }

  toggleMode() {
    if (this.mode === 'casual') {
      this.mode = 'challenge';
      this.dom.modeBadge.textContent = 'โหมดท้าทาย (Challenge)';
      this.dom.modeBadge.style.background = '#FEE2E2';
      this.dom.modeBadge.style.color = '#DC2626';
      this.dom.btnSwitchMode.innerHTML = '<span class="btn-emoji">🌱</span><span class="btn-text">โหมดฝึกหัด</span>';
      this.dom.timerContainer.style.display = 'flex';
      this.dom.livesContainer.style.display = 'flex';
    } else {
      this.mode = 'casual';
      this.dom.modeBadge.textContent = 'โหมดฝึกหัด (Casual)';
      this.dom.modeBadge.style.background = '#E0E7FF';
      this.dom.modeBadge.style.color = '#4F46E5';
      this.dom.btnSwitchMode.innerHTML = '<span class="btn-emoji">⚡</span><span class="btn-text">โหมดท้าทาย</span>';
      this.dom.timerContainer.style.display = 'none';
      this.dom.livesContainer.style.display = 'none';
    }
    this.loadLevel(this.currentLevelIdx);
  }

  handleCardClick(e) {
    if (this.isLevelFinished) return;

    const rect = this.dom.cardImage.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    const lvl = LEVELS[this.currentLevelIdx];
    const aspect = rect.height / rect.width; // account for vertical elongation

    // Calculate distance to Top Target and Bottom Target
    const distTop = Math.hypot(clickX - lvl.pct_x, (clickY - lvl.pct_y_top) / aspect);
    const distBot = Math.hypot(clickX - lvl.pct_x, (clickY - lvl.pct_y_bot) / aspect);

    // Generous touch tolerance (6.5% radius)
    const tolerance = 6.5;

    if (distTop <= tolerance || distBot <= tolerance) {
      // SUCCESS!
      this.onDifferenceFound();
    } else {
      // MISS!
      this.onWrongClick(clickX, clickY);
    }
  }

  onDifferenceFound() {
    this.isLevelFinished = true;
    clearInterval(this.timerInterval);

    // Sound
    sfx.correct();

    // Show Markers on Both Halves
    this.dom.markerTop.style.display = 'block';
    this.dom.markerBot.style.display = 'block';

    // Confetti
    this.confetti.fire(70);

    // Calculate Stars & Score
    const elapsedSec = Math.round((Date.now() - this.levelStartTime) / 1000);
    let starsEarned = 3;
    if (this.mode === 'challenge') {
      if (elapsedSec > 35) starsEarned = 1;
      else if (elapsedSec > 20) starsEarned = 2;
    }
    const scoreEarned = starsEarned * 100 + Math.max(0, 60 - elapsedSec) * 5;

    // Update Storage
    if (starsEarned > this.savedData.stars[this.currentLevelIdx]) {
      this.savedData.stars[this.currentLevelIdx] = starsEarned;
    }
    if (this.currentLevelIdx + 1 > this.savedData.unlockedLevel) {
      this.savedData.unlockedLevel = Math.min(LEVELS.length - 1, this.currentLevelIdx + 1);
    }
    this.savedData.totalScore += scoreEarned;
    this.saveStorage();
    this.updateStatsUI();

    // Show Success Modal after short animation delay
    setTimeout(() => {
      this.dom.summaryTime.textContent = `${elapsedSec} วินาที`;
      this.dom.summaryScore.textContent = `+${scoreEarned} แต้ม`;

      let starsHtml = '';
      for (let s = 0; s < 3; s++) {
        starsHtml += `<span class="star-icon ${s < starsEarned ? 'glow' : ''}">${s < starsEarned ? '⭐' : '☆'}</span>`;
      }
      this.dom.modalStars.innerHTML = starsHtml;

      if (this.currentLevelIdx === LEVELS.length - 1) {
        this.dom.btnNext.textContent = '🏆 รับเกียรติบัตร!';
      } else {
        this.dom.btnNext.textContent = 'ด่านต่อไป ➡️';
      }

      this.dom.modalSuccess.style.display = 'flex';
    }, 700);
  }

  onWrongClick(pctX, pctY) {
    sfx.wrong();

    // Visual Feedback (floating cross)
    const feedback = document.createElement('div');
    feedback.className = 'wrong-feedback';
    feedback.textContent = '❌';
    feedback.style.left = `${pctX}%`;
    feedback.style.top = `${pctY}%`;
    this.dom.clickLayer.appendChild(feedback);
    setTimeout(() => feedback.remove(), 600);

    // Shake Stage
    this.dom.cardStage.classList.add('shake-stage');
    setTimeout(() => this.dom.cardStage.classList.remove('shake-stage'), 400);

    // Penalty in Challenge Mode
    if (this.mode === 'challenge') {
      this.lives--;
      this.updateLivesUI();
      if (this.lives <= 0) {
        clearInterval(this.timerInterval);
        this.triggerGameOver();
      }
    }
  }

  useHint() {
    if (this.hintsLeft <= 0 || this.isLevelFinished) return;
    this.hintsLeft--;
    this.dom.hintCount.textContent = this.hintsLeft;
    if (this.hintsLeft === 0) this.dom.btnHint.disabled = true;

    sfx.hint();

    const lvl = LEVELS[this.currentLevelIdx];
    this.dom.hintText.textContent = lvl.hint;
    this.dom.hintBox.style.display = 'flex';

    // Show pulsing hint indicator for 3 seconds
    this.dom.hintTop.style.display = 'block';
    this.dom.hintBot.style.display = 'block';
    setTimeout(() => {
      this.dom.hintTop.style.display = 'none';
      this.dom.hintBot.style.display = 'none';
    }, 3500);
  }

  triggerGameOver() {
    sfx.wrong();
    this.dom.modalGameOver.style.display = 'flex';
  }

  updateStatsUI() {
    const totalStars = this.savedData.stars.reduce((a, b) => a + b, 0);
    this.dom.totalStars.textContent = `${totalStars} / ${LEVELS.length * 3}`;
  }

  openLevelsModal() {
    this.dom.levelsGrid.innerHTML = '';
    LEVELS.forEach((lvl, idx) => {
      const item = document.createElement('div');
      const isLocked = idx > this.savedData.unlockedLevel;
      const isActive = idx === this.currentLevelIdx;
      const starsCount = this.savedData.stars[idx];

      item.className = `level-select-item ${isActive ? 'active' : ''} ${isLocked ? 'locked' : ''}`;
      item.innerHTML = `
        <span class="item-num">${isLocked ? '🔒' : idx + 1}</span>
        <span class="item-stars">${'⭐'.repeat(starsCount)}${'☆'.repeat(3 - starsCount)}</span>
      `;

      if (!isLocked) {
        item.addEventListener('click', () => {
          this.dom.modalLevels.style.display = 'none';
          this.loadLevel(idx);
        });
      }
      this.dom.levelsGrid.appendChild(item);
    });
    this.dom.modalLevels.style.display = 'flex';
  }

  openCertificateModal() {
    sfx.fanfare();
    this.confetti.fire(120);
    this.dom.modalCert.style.display = 'flex';
    this.renderCertificate();
  }

  renderCertificate() {
    const canvas = this.dom.certCanvas;
    const ctx = canvas.getContext('2d');
    const name = this.dom.playerNameInput.value.trim() || 'ยอดนักสืบสายตาเหยี่ยว';

    // Background Parchment
    ctx.fillStyle = '#FCFBF7';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Decorative Borders
    ctx.strokeStyle = '#D4AF37'; // Gold
    ctx.lineWidth = 10;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    ctx.strokeStyle = '#312E81'; // Navy Accent
    ctx.lineWidth = 2;
    ctx.strokeRect(28, 28, canvas.width - 56, canvas.height - 56);

    // Header Badge
    ctx.textAlign = 'center';
    ctx.fillStyle = '#312E81';
    ctx.font = 'bold 36px "Mali", cursive, sans-serif';
    ctx.fillText('เกียรติบัตรเชิดชูเกียรติ', canvas.width / 2, 110);

    ctx.fillStyle = '#D97706';
    ctx.font = 'bold 20px "Sarabun", sans-serif';
    ctx.fillText('★ ผู้พิชิตภารกิจเกมจับผิดภาพออนไลน์ ★', canvas.width / 2, 148);

    // Recipient Line
    ctx.fillStyle = '#64748B';
    ctx.font = '16px "Sarabun", sans-serif';
    ctx.fillText('ขอมอบเกียรติบัตรฉบับนี้ให้แก่', canvas.width / 2, 210);

    // Player Name
    ctx.fillStyle = '#1E1B4B';
    ctx.font = 'bold 38px "Sarabun", sans-serif';
    ctx.fillText(name, canvas.width / 2, 270);

    // Underline
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 200, 285);
    ctx.lineTo(canvas.width / 2 + 200, 285);
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Achievement Description
    ctx.fillStyle = '#334155';
    ctx.font = '18px "Sarabun", sans-serif';
    ctx.fillText('ที่สามารถใช้ไหวพริบ ความละเอียดรอบคอบ และสายตาอันเฉียบคม', canvas.width / 2, 340);
    ctx.fillText('ค้นหาจุดแตกต่างครบทั้ง 10 ด่าน ได้อย่างยอดเยี่ยมสมบูรณ์แบบ', canvas.width / 2, 372);

    // Gold Seal Medal
    ctx.save();
    ctx.translate(canvas.width / 2, 455);
    ctx.beginPath();
    ctx.arc(0, 0, 42, 0, Math.PI * 2);
    ctx.fillStyle = '#F59E0B';
    ctx.fill();
    ctx.strokeStyle = '#D97706';
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '24px sans-serif';
    ctx.fillText('🦅', 0, 8);
    ctx.restore();

    // Date
    const today = new Date().toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    ctx.fillStyle = '#64748B';
    ctx.font = '14px "Sarabun", sans-serif';
    ctx.fillText(`วันที่ ${today}`, canvas.width / 2, 525);
  }

  downloadCertificate() {
    const link = document.createElement('a');
    link.download = 'ใบประกาศนียบัตรยอดนักสืบ.png';
    link.href = this.dom.certCanvas.toDataURL('image/png');
    link.click();
  }
}

// Start the game when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
  new GameApp();
});
