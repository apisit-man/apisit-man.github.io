/**
 * app.js - Main Application Controller for Roller Coaster Energy Tycoon
 * Developed by Dr. Apisit Tongchai (Independent Educator & Researcher)
 */

import { CoasterPhysics } from './physics.js';
import { TrackRenderer } from './track-renderer.js';
import { soundManager } from './audio.js';
import { CAMPAIGN_LEVELS } from './levels.js';
import { socraticCoach } from './socratic-ai.js';

class CoasterApp {
  constructor() {
    this.canvas = document.getElementById('coasterCanvas');
    this.renderer = new TrackRenderer(this.canvas);
    this.physics = new CoasterPhysics();

    this.currentMode = 'campaign'; // 'campaign' or 'sandbox'
    this.currentLevelIdx = 0;
    this.lang = 'th'; // 'th' or 'en'

    // Editable track control points
    this.controlPoints = [];
    this.draggingNodeIdx = -1;
    this.lastTime = performance.now();
    this.animationFrameId = null;

    // Default Sandbox Template
    this.sandboxPoints = [
      { x: 50, y: 120 },
      { x: 220, y: 480 },
      { x: 380, y: 220 },
      { x: 520, y: 480 },
      { x: 720, y: 340 },
      { x: 920, y: 380 }
    ];

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupAIModal();
    this.loadLevel(0);
    this.startLoop();

    // Initial resize
    window.addEventListener('resize', () => {
      this.renderer.resize();
      this.physics.buildTrack(this.controlPoints, this.renderer.baselineY, this.renderer.pixelsPerMeter);
    });
  }

  loadLevel(levelIdx) {
    this.currentLevelIdx = levelIdx;
    const lvl = CAMPAIGN_LEVELS[levelIdx];
    if (!lvl) return;

    // Deep copy points so user can drag them
    this.controlPoints = JSON.parse(JSON.stringify(lvl.controlPoints));
    this.physics.setGravity(lvl.gravity);
    this.physics.setFrictionMode(lvl.frictionMode);

    // Update UI elements
    const lvlSelect = document.getElementById('levelSelect');
    if (lvlSelect) lvlSelect.value = levelIdx;

    const gravitySelect = document.getElementById('gravitySelect');
    if (gravitySelect) gravitySelect.value = lvl.gravity.toString();

    const frictionCheckbox = document.getElementById('frictionToggle');
    if (frictionCheckbox) frictionCheckbox.checked = lvl.frictionMode;

    const lvlTitle = document.getElementById('levelTitle');
    if (lvlTitle) lvlTitle.textContent = this.lang === 'th' ? lvl.titleTh : lvl.titleEn;

    const lvlBadge = document.getElementById('levelBadge');
    if (lvlBadge) lvlBadge.textContent = lvl.gradeBadge;

    const lvlDesc = document.getElementById('levelDesc');
    if (lvlDesc) lvlDesc.textContent = this.lang === 'th' ? lvl.descriptionTh : lvl.descriptionEn;

    const lvlGoal = document.getElementById('levelGoal');
    if (lvlGoal) lvlGoal.textContent = this.lang === 'th' ? lvl.targetGoalTh : lvl.targetGoalEn;

    const feedbackBox = document.getElementById('feedbackBox');
    if (feedbackBox) {
      feedbackBox.classList.add('hidden');
      feedbackBox.textContent = '';
    }

    // Rebuild track & reset simulation
    this.physics.buildTrack(this.controlPoints, this.renderer.baselineY, this.renderer.pixelsPerMeter);
    this.updateHUD();
  }

  switchMode(mode) {
    this.currentMode = mode;
    const campaignPanel = document.getElementById('campaignPanel');
    const sandboxPanel = document.getElementById('sandboxPanel');
    const tabCampaign = document.getElementById('tabCampaign');
    const tabSandbox = document.getElementById('tabSandbox');

    if (mode === 'campaign') {
      if (campaignPanel) campaignPanel.classList.remove('hidden');
      if (sandboxPanel) sandboxPanel.classList.add('hidden');
      if (tabCampaign) {
        tabCampaign.classList.add('bg-brand-600', 'text-white');
        tabCampaign.classList.remove('text-slate-400');
      }
      if (tabSandbox) {
        tabSandbox.classList.remove('bg-brand-600', 'text-white');
        tabSandbox.classList.add('text-slate-400');
      }
      this.loadLevel(this.currentLevelIdx);
    } else {
      if (campaignPanel) campaignPanel.classList.add('hidden');
      if (sandboxPanel) sandboxPanel.classList.remove('hidden');
      if (tabSandbox) {
        tabSandbox.classList.add('bg-brand-600', 'text-white');
        tabSandbox.classList.remove('text-slate-400');
      }
      if (tabCampaign) {
        tabCampaign.classList.remove('bg-brand-600', 'text-white');
        tabCampaign.classList.add('text-slate-400');
      }
      this.controlPoints = JSON.parse(JSON.stringify(this.sandboxPoints));
      this.physics.buildTrack(this.controlPoints, this.renderer.baselineY, this.renderer.pixelsPerMeter);
    }
  }

  setupEventListeners() {
    // 1. Run / Pause / Reset Buttons
    const playBtn = document.getElementById('playBtn');
    if (playBtn) {
      playBtn.addEventListener('click', () => {
        soundManager.ensureContext();
        if (this.physics.isFinished || this.physics.isDerailing || this.physics.isRollback) {
          this.physics.resetSimulation();
        }
        this.physics.isRunning = true;
        soundManager.playLiftClick();
      });
    }

    const pauseBtn = document.getElementById('pauseBtn');
    if (pauseBtn) {
      pauseBtn.addEventListener('click', () => {
        this.physics.isRunning = !this.physics.isRunning;
      });
    }

    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.physics.resetSimulation();
        const feedbackBox = document.getElementById('feedbackBox');
        if (feedbackBox) feedbackBox.classList.add('hidden');
      });
    }

    // 2. Mode Switches
    const tabCampaign = document.getElementById('tabCampaign');
    const tabSandbox = document.getElementById('tabSandbox');
    if (tabCampaign) tabCampaign.addEventListener('click', () => this.switchMode('campaign'));
    if (tabSandbox) tabSandbox.addEventListener('click', () => this.switchMode('sandbox'));

    // 3. Level Select Dropdown
    const levelSelect = document.getElementById('levelSelect');
    if (levelSelect) {
      levelSelect.addEventListener('change', (e) => {
        this.loadLevel(parseInt(e.target.value, 10));
      });
    }

    // 4. Gravity & Friction Options
    const gravitySelect = document.getElementById('gravitySelect');
    if (gravitySelect) {
      gravitySelect.addEventListener('change', (e) => {
        this.physics.setGravity(parseFloat(e.target.value));
        this.physics.resetSimulation();
      });
    }

    const frictionToggle = document.getElementById('frictionToggle');
    if (frictionToggle) {
      frictionToggle.addEventListener('change', (e) => {
        this.physics.setFrictionMode(e.target.checked);
        this.physics.resetSimulation();
      });
    }

    // 5. Vectors & Audio Toggles
    const vectorToggle = document.getElementById('vectorToggle');
    if (vectorToggle) {
      vectorToggle.addEventListener('change', (e) => {
        this.renderer.showVectors = e.target.checked;
      });
    }

    const muteBtn = document.getElementById('muteBtn');
    if (muteBtn) {
      muteBtn.addEventListener('click', () => {
        const isMuted = soundManager.toggleMute();
        muteBtn.textContent = isMuted ? '🔇 เสียง: ปิด' : '🔊 เสียง: เปิด';
      });
    }

    // 6. Socratic AI Coach Button (Ask AI Tutor)
    const askCoachBtn = document.getElementById('askCoachBtn');
    if (askCoachBtn) {
      askCoachBtn.addEventListener('click', () => this.triggerSocraticCoach());
    }

    // 7. Sandbox Track Controls (Add/Remove Node)
    const addNodeBtn = document.getElementById('addNodeBtn');
    if (addNodeBtn) {
      addNodeBtn.addEventListener('click', () => {
        const n = this.controlPoints.length;
        if (n >= 12) {
          alert('จำนวนจุดดัดรางสูงสุด 12 จุด');
          return;
        }
        const lastP = this.controlPoints[n - 1];
        const newX = Math.min(this.canvas.width - 40, lastP.x + 80);
        const newY = lastP.y;
        this.controlPoints.push({ x: newX, y: newY });
        this.physics.buildTrack(this.controlPoints, this.renderer.baselineY, this.renderer.pixelsPerMeter);
        soundManager.playNodeSnap();
      });
    }

    const removeNodeBtn = document.getElementById('removeNodeBtn');
    if (removeNodeBtn) {
      removeNodeBtn.addEventListener('click', () => {
        if (this.controlPoints.length <= 3) {
          alert('ต้องมีจุดดัดรางอย่างน้อย 3 จุด');
          return;
        }
        this.controlPoints.pop();
        this.physics.buildTrack(this.controlPoints, this.renderer.baselineY, this.renderer.pixelsPerMeter);
        soundManager.playNodeSnap();
      });
    }

    // 8. Preset Loops & Hills for Sandbox
    const presetLoopBtn = document.getElementById('presetLoopBtn');
    if (presetLoopBtn) {
      presetLoopBtn.addEventListener('click', () => {
        this.controlPoints = [
          { x: 50, y: 100 },
          { x: 220, y: 480 },
          { x: 340, y: 220 }, // loop apex
          { x: 460, y: 480 },
          { x: 700, y: 380 },
          { x: 920, y: 380 }
        ];
        this.physics.buildTrack(this.controlPoints, this.renderer.baselineY, this.renderer.pixelsPerMeter);
        soundManager.playNodeSnap();
      });
    }

    const presetDoubleHillBtn = document.getElementById('presetDoubleHillBtn');
    if (presetDoubleHillBtn) {
      presetDoubleHillBtn.addEventListener('click', () => {
        this.controlPoints = [
          { x: 50, y: 120 },
          { x: 220, y: 480 },
          { x: 400, y: 220 }, // Hill 1
          { x: 580, y: 480 },
          { x: 740, y: 280 }, // Hill 2
          { x: 920, y: 420 }
        ];
        this.physics.buildTrack(this.controlPoints, this.renderer.baselineY, this.renderer.pixelsPerMeter);
        soundManager.playNodeSnap();
      });
    }

    // 9. Interactive Drag & Drop on Canvas (Touch & Mouse)
    this.setupPointerDrag();
  }

  /**
   * Gemini API Key Management Modal Setup
   */
  setupAIModal() {
    const configKeyBtn = document.getElementById('configKeyBtn');
    const keyModal = document.getElementById('keyModal');
    const saveKeyBtn = document.getElementById('saveKeyBtn');
    const closeKeyBtn = document.getElementById('closeKeyBtn');
    const apiKeyInput = document.getElementById('apiKeyInput');
    const keyStatus = document.getElementById('keyStatus');

    if (configKeyBtn && keyModal) {
      configKeyBtn.addEventListener('click', () => {
        if (apiKeyInput) apiKeyInput.value = socraticCoach.getApiKey();
        keyModal.classList.remove('hidden');
      });
    }

    if (closeKeyBtn && keyModal) {
      closeKeyBtn.addEventListener('click', () => keyModal.classList.add('hidden'));
    }

    if (saveKeyBtn && apiKeyInput && keyModal) {
      saveKeyBtn.addEventListener('click', () => {
        const key = apiKeyInput.value.trim();
        socraticCoach.setApiKey(key);
        if (keyStatus) {
          keyStatus.textContent = key ? '✅ บันทึก Gemini API Key เรียบร้อยแล้ว!' : 'ℹ️ ล้าง API Key แล้ว (ใช้คำใบ้ออฟไลน์)';
          keyStatus.className = 'text-xs text-emerald-400 mt-2';
        }
        setTimeout(() => {
          keyModal.classList.add('hidden');
        }, 1200);
      });
    }
  }

  /**
   * Triggers the Socratic AI Coach with live physical context
   */
  async triggerSocraticCoach() {
    const hintModal = document.getElementById('hintModal');
    const hintText = document.getElementById('hintText');
    const hintBadge = document.getElementById('hintSourceBadge');
    const closeHintBtn = document.getElementById('closeHintBtn');

    if (!hintModal || !hintText) return;

    hintModal.classList.remove('hidden');
    hintText.innerHTML = '<span class="inline-flex items-center gap-2"><svg class="animate-spin h-4 w-4 text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg> โค้ช AI กำลังวิเคราะห์สถานะฟิสิกส์ของรถไฟเหาะ...</span>';
    if (hintBadge) hintBadge.textContent = 'วิเคราะห์...';

    if (closeHintBtn) {
      closeHintBtn.onclick = () => hintModal.classList.add('hidden');
    }

    const lvl = CAMPAIGN_LEVELS[this.currentLevelIdx] || {};
    const sample = this.physics.getSampleAtDistance(this.physics.s) || {};

    let issueDescription = 'รถไฟเหาะกำลังวิ่งหรือทดสอบอยู่ตามปกติ';
    if (this.physics.isDerailing) {
      issueDescription = 'รถร่วงหลุดตกจากรางที่ยอด Loop คว่ำหัว เพราะความเร็วเหวี่ยงหนีศูนย์ไม่เพียงพอต้านแรงโน้มถ่วง';
    } else if (this.physics.isRollback) {
      issueDescription = 'รถวิ่งขึ้นเนินไม่พ้นและหมดแรงจนไหลถอยหลัง (Rollback) เพราะ Ek ไม่พอเปลี่ยนเป็น Ep';
    } else if (this.physics.gForce > 4.2) {
      issueDescription = 'แรง G พุ่งสูงเกิน 4.2g ทำให้ผู้โดยสารเสี่ยงหมดสติ (Blackout)';
    }

    const context = {
      levelNumber: this.currentLevelIdx + 1,
      levelTitle: lvl.titleTh || 'โหมดสร้างอิสระ',
      levelGoal: lvl.targetGoalTh || 'ทดสอบออกแบบรางให้ปลอดภัย',
      issueDescription,
      initialHeight: this.physics.initialHeight.toFixed(1),
      currentHeight: (sample.h || 0).toFixed(1),
      speedKmh: Math.round(Math.abs(this.physics.v) * 3.6),
      speedMs: Math.abs(this.physics.v).toFixed(1),
      gForce: this.physics.gForce.toFixed(2),
      gravity: this.physics.gravity,
      epKj: (this.physics.currentEp / 1000).toFixed(1),
      ekKj: (this.physics.currentEk / 1000).toFixed(1),
      fallbackHint: lvl.socraticHintTh
    };

    const result = await socraticCoach.askCoach(context);
    hintText.textContent = result.message;

    if (hintBadge) {
      if (result.source === 'gemini') {
        hintBadge.textContent = '🤖 Gemini 2.5 Flash';
        hintBadge.className = 'text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30';
      } else {
        hintBadge.textContent = '💡 คำใบ้ฟิสิกส์มาตรฐาน (ออฟไลน์)';
        hintBadge.className = 'text-[10px] font-bold px-2 py-0.5 rounded bg-slate-700 text-slate-300 border border-slate-600';
      }
    }
  }

  /**
   * Pointer Drag Setup for Canvas Control Points
   */
  setupPointerDrag() {
    const canvas = this.canvas;

    const getCanvasPos = (evt) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = evt.touches ? evt.touches[0].clientX : evt.clientX;
      const clientY = evt.touches ? evt.touches[0].clientY : evt.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    };

    const onPointerDown = (evt) => {
      const pos = getCanvasPos(evt);
      const hitRadius = 22;

      // Find if clicking any control node
      for (let i = 0; i < this.controlPoints.length; i++) {
        const p = this.controlPoints[i];
        if (Math.hypot(p.x - pos.x, p.y - pos.y) <= hitRadius) {
          this.draggingNodeIdx = i;
          this.renderer.selectedNodeIndex = i;
          soundManager.ensureContext();
          soundManager.playNodeSnap();
          if (evt.cancelable) evt.preventDefault();
          break;
        }
      }
    };

    const onPointerMove = (evt) => {
      if (this.draggingNodeIdx === -1) return;
      const pos = getCanvasPos(evt);

      // Clamp coordinates to safe canvas zone
      const clampedX = Math.max(30, Math.min(canvas.width / this.renderer.dpr - 30, pos.x));
      const clampedY = Math.max(40, Math.min(this.renderer.baselineY, pos.y));

      this.controlPoints[this.draggingNodeIdx].x = clampedX;
      this.controlPoints[this.draggingNodeIdx].y = clampedY;

      // Rebuild track dynamically
      this.physics.buildTrack(this.controlPoints, this.renderer.baselineY, this.renderer.pixelsPerMeter);
      if (evt.cancelable) evt.preventDefault();
    };

    const onPointerUp = () => {
      if (this.draggingNodeIdx !== -1) {
        this.draggingNodeIdx = -1;
        this.renderer.selectedNodeIndex = -1;
      }
    };

    canvas.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    canvas.addEventListener('touchstart', onPointerDown, { passive: false });
    window.addEventListener('touchmove', onPointerMove, { passive: false });
    window.addEventListener('touchend', onPointerUp);
  }

  startLoop() {
    const loop = (currentTime) => {
      let dt = (currentTime - this.lastTime) / 1000;
      this.lastTime = currentTime;

      // Clamp dt to 0.04s (25 fps floor) to avoid tunnelling
      dt = Math.min(dt, 0.04);

      // Update Physics
      this.physics.update(dt);

      // Update Procedural Sound
      const speedKmh = Math.abs(this.physics.v) * 3.6;
      soundManager.updateDynamicAudio(speedKmh, this.physics.gForce, this.physics.isRunning);

      // Render Canvas
      this.renderer.render(this.physics, this.controlPoints, true);

      // Update HUD
      this.updateHUD();

      // Check level validation when run ends
      if (this.currentMode === 'campaign' && (this.physics.isFinished || this.physics.isDerailing || this.physics.isRollback)) {
        this.checkCampaignObjective();
      }

      this.animationFrameId = requestAnimationFrame(loop);
    };

    this.animationFrameId = requestAnimationFrame(loop);
  }

  updateHUD() {
    const speedKmh = Math.round(Math.abs(this.physics.v) * 3.6);
    const sample = this.physics.getSampleAtDistance(this.physics.s);
    const heightM = sample ? sample.h.toFixed(1) : '0.0';
    const gVal = this.physics.gForce.toFixed(2);

    const speedEl = document.getElementById('hudSpeed');
    if (speedEl) speedEl.textContent = `${speedKmh} km/h`;

    const heightEl = document.getElementById('hudHeight');
    if (heightEl) heightEl.textContent = `${heightM} m`;

    const gForceEl = document.getElementById('hudGForce');
    if (gForceEl) {
      gForceEl.textContent = `${gVal} g`;
      if (this.physics.gForce > 4.2 || this.physics.gForce < -1.2) {
        gForceEl.className = 'text-base font-extrabold text-rose-500';
      } else if (this.physics.gForce < 0.2) {
        gForceEl.className = 'text-base font-extrabold text-cyan-400';
      } else {
        gForceEl.className = 'text-base font-extrabold text-emerald-400';
      }
    }

    const epEl = document.getElementById('hudEp');
    if (epEl) epEl.textContent = `${(this.physics.currentEp / 1000).toFixed(1)} kJ`;

    const ekEl = document.getElementById('hudEk');
    if (ekEl) ekEl.textContent = `${(this.physics.currentEk / 1000).toFixed(1)} kJ`;

    // Tycoon ratings
    const ratings = this.physics.getTycoonRatings();
    const excitementEl = document.getElementById('tycoonExcitement');
    if (excitementEl) excitementEl.textContent = `${ratings.excitement}/100`;

    const safetyEl = document.getElementById('tycoonSafety');
    if (safetyEl) {
      safetyEl.textContent = ratings.safetyStatus;
      safetyEl.className = `text-xs font-bold px-2 py-0.5 rounded text-white bg-${ratings.safetyColor}-600`;
    }

    // KaTeX Formula Synchronization
    this.updateKaTeXFormula(heightM, speedKmh, gVal);
  }

  updateKaTeXFormula(heightM, speedKmh, gVal) {
    const formulaContainer = document.getElementById('katexFormula');
    if (!formulaContainer || typeof katex === 'undefined') return;

    const vMs = (parseFloat(speedKmh) / 3.6).toFixed(1);
    const latex = `E_{\\text{tot}} = mgh + \\frac{1}{2}mv^2 \\implies v = ${vMs}\\text{ m/s},\\quad G = ${gVal}\\text{g}`;

    try {
      katex.render(latex, formulaContainer, {
        throwOnError: false,
        displayMode: false
      });
    } catch (e) {
      // Ignore KaTeX render errors during rapid updates
    }
  }

  checkCampaignObjective() {
    const lvl = CAMPAIGN_LEVELS[this.currentLevelIdx];
    if (!lvl) return;

    const ratings = this.physics.getTycoonRatings();
    const result = lvl.validate(this.physics, ratings);

    const feedbackBox = document.getElementById('feedbackBox');
    if (feedbackBox) {
      feedbackBox.classList.remove('hidden');
      if (result.success) {
        feedbackBox.className = 'p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/60 text-emerald-300 text-xs sm:text-sm font-semibold shadow-md';
        feedbackBox.innerHTML = `${result.message} <button id="nextLevelBtn" class="ml-2 px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors">ด่านถัดไป ➔</button>`;
        const nextBtn = document.getElementById('nextLevelBtn');
        if (nextBtn) {
          nextBtn.addEventListener('click', () => {
            if (this.currentLevelIdx < CAMPAIGN_LEVELS.length - 1) {
              this.loadLevel(this.currentLevelIdx + 1);
            } else {
              alert('ยินดีด้วย! คุณพิชิตครบทั้ง 10 ด่านของ Roller Coaster Energy Tycoon แล้ว!');
            }
          });
        }
      } else {
        feedbackBox.className = 'p-3 rounded-xl bg-rose-950/70 border border-rose-500/60 text-rose-300 text-xs sm:text-sm font-semibold shadow-md';
        feedbackBox.textContent = result.message;
      }
    }
  }
}

// Instantiate on DOM load
window.addEventListener('DOMContentLoaded', () => {
  window.coasterApp = new CoasterApp();
});
