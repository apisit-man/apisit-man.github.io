/**
 * Brain Atlas 3D - Interactive EEG Brainwave Oscilloscope & Cortical Oscillations Lab
 * Grounded in Electrophysiology, International 10-20 System, and Secondary Biology Curricula
 * Developed for Dr. Apisit Tongchai - Biology Educational Media
 */

import { sound } from './audio.js';

export const EEG_BANDS = {
  delta: {
    nameTh: 'คลื่นเดลตา (Delta, δ)',
    rangeHz: '0.5 – 4 Hz',
    dominantFreq: 2.0,
    amplitudeUv: 90,
    stateTh: 'การนอนหลับลึกไร้ความฝัน (Deep Slow-Wave Sleep N3), ทารกแรกเกิด',
    originTh: 'การทำงานร่วมกันระหว่าง Thalamus และทั้งเปลือกสมอง (Thalamocortical loops)',
    color: '#818cf8' // Indigo
  },
  theta: {
    nameTh: 'คลื่นทีตา (Theta, θ)',
    rangeHz: '4 – 8 Hz',
    dominantFreq: 6.0,
    amplitudeUv: 50,
    stateTh: 'สภาวะสะลึมสะลือ เหม่อลอย สมาธิลึก และการนอนหลับช่วง REM (ฝัน)',
    originTh: 'วงจรฮิปโปแคมปัส (Hippocampus) และสมองกลีบขมับ',
    color: '#38bdf8' // Cyan
  },
  alpha: {
    nameTh: 'คลื่นแอลฟา (Alpha, α)',
    rangeHz: '8 – 13 Hz',
    dominantFreq: 10.0,
    amplitudeUv: 45,
    stateTh: 'ตื่นตัวแต่ผ่อนคลายขณะหลับตา (Relaxed Wakefulness), จิตใจสงบ',
    originTh: 'สมองกลีบท้ายทอย (Occipital Pole) และ Parietal (ปรากฏการณ์ Berger Effect)',
    color: '#34d399' // Emerald
  },
  beta: {
    nameTh: 'คลื่นบีตา (Beta, β)',
    rangeHz: '13 – 30 Hz',
    dominantFreq: 20.0,
    amplitudeUv: 25,
    stateTh: 'การใช้ความคิด จดจ่อแก้โจทย์ วางแผน หรือสั่งการเคลื่อนไหว (Active Thinking)',
    originTh: 'สมองกลีบหน้า (Frontal Lobe) และ Motor Cortex',
    color: '#fbbf24' // Amber
  },
  gamma: {
    nameTh: 'คลื่นแกมมา (Gamma, γ)',
    rangeHz: '30 – 80 Hz',
    dominantFreq: 42.0,
    amplitudeUv: 15,
    stateTh: 'การประมวลผลข้อมูลระดับสูง การเชื่อมโยงประสาทสัมผัสหลายด้านพร้อมกัน (Multimodal Binding)',
    originTh: 'เครือข่ายประสาทเชื่อมต่อระหว่างกลีบสมองทั่วทั้งผืน (Cortico-cortical synchrony)',
    color: '#f43f5e' // Rose
  }
};

export const EEG_STATES = [
  {
    id: 'state_relaxed_alpha',
    nameTh: '1. ผ่อนคลายหลับตา (Berger Effect - Alpha)',
    nameEn: 'Relaxed Wakefulness / Eyes Closed (Alpha Burst)',
    band: 'alpha',
    channels: {
      frontal: { freq: 16, amp: 20, noise: 4 },
      central: { freq: 11, amp: 25, noise: 5 },
      temporal: { freq: 10, amp: 30, noise: 6 },
      occipital: { freq: 10.2, amp: 75, noise: 8 } // Prominent Occipital Alpha!
    },
    socraticTh: 'สังเกตช่อง O1-O2 (ท้ายทอย): คลื่นแอลฟา 10 Hz จะมีแอมพลิจูดสูงเด่นชัดเจนที่สุดในขณะที่คนเราพักผ่อนและ "หลับตา" (Berger Effect ค.ศ. 1924)',
    activeLobe: 'occipital-lobe'
  },
  {
    id: 'state_mental_math',
    nameTh: '2. ตื่นตัวใช้ความคิด/คำนวณ (Active Beta)',
    nameEn: 'Active Mental Math & Problem Solving (Beta Desynchronization)',
    band: 'beta',
    channels: {
      frontal: { freq: 22, amp: 38, noise: 12 }, // Frontal Beta Activation
      central: { freq: 18, amp: 25, noise: 9 },
      temporal: { freq: 15, amp: 20, noise: 7 },
      occipital: { freq: 21, amp: 18, noise: 8 } // Alpha blocked / desynchronized!
    },
    socraticTh: 'เมื่อ "ลืมตา" หรือเริ่มคิดเลขในใจ คลื่นแอลฟาสูงๆ ในท้ายทอยจะหายไปทันที และถูกแทนที่ด้วยคลื่นบีตาความถี่สูงแอมพลิจูดต่ำ (Desynchronization)',
    activeLobe: 'frontal-lobe'
  },
  {
    id: 'state_deep_sleep',
    nameTh: '3. หลับลึกชะลอคลื่น (Stage N3 Slow-Wave / Delta)',
    nameEn: 'Deep Non-REM Sleep N3 (High-Voltage Delta Waves)',
    band: 'delta',
    channels: {
      frontal: { freq: 1.5, amp: 85, noise: 14 },
      central: { freq: 1.8, amp: 80, noise: 12 },
      temporal: { freq: 1.6, amp: 75, noise: 10 },
      occipital: { freq: 1.7, amp: 70, noise: 10 }
    },
    socraticTh: 'คลื่นเดลตามีความถี่ต่ำมาก (1-2 Hz) แต่มีขนาดแอมพลิจูดสูงที่สุด เกิดจากเซลล์ประสาทนับล้านตัวในเปลือกสมองเข้าสู่จังหวะพักพร้อมเพรียงกันเพื่อฟื้นฟูเซลล์',
    activeLobe: 'thalamus'
  },
  {
    id: 'state_rem_dreaming',
    nameTh: '4. สภาวะฝันหลับตากระตุก (REM Sleep / Theta)',
    nameEn: 'REM Sleep & Vivid Dreaming (Sawtooth Theta Waves)',
    band: 'theta',
    channels: {
      frontal: { freq: 6.2, amp: 40, noise: 12 },
      central: { freq: 5.8, amp: 45, noise: 10 },
      temporal: { freq: 6.0, amp: 55, noise: 11 }, // Hippocampal theta ripples
      occipital: { freq: 7.0, amp: 35, noise: 10 }
    },
    socraticTh: 'ในการนอนหลับช่วงฝัน (REM Sleep) คลื่นสมองจะมีความตื่นตัวใกล้เคียงกับตอนตื่นนอน (Paradoxical Sleep) โดยมีคลื่นทีตาและฟันเลื่อยร่วมกับการกลอกตาอย่างรวดเร็ว',
    activeLobe: 'temporal-lobe'
  },
  {
    id: 'state_absence_seizure',
    nameTh: '5. คลื่นลมชักเหม่อลอย (3-Hz Spike-and-Wave)',
    nameEn: 'Absence Seizure (Generalized 3-Hz Spike-and-Wave Discharge)',
    band: 'delta',
    channels: {
      frontal: { freq: 3.0, amp: 140, isSpikeWave: true },
      central: { freq: 3.0, amp: 140, isSpikeWave: true },
      temporal: { freq: 3.0, amp: 140, isSpikeWave: true },
      occipital: { freq: 3.0, amp: 140, isSpikeWave: true }
    },
    socraticTh: '⚠️ สภาวะลมชักชนิดเหม่อลอย (Absence Seizure): เซลล์ประสาททั้งสมองเกิดการสปาร์กพร้อมกันเป็นจังหวะ 3 รอบต่อวินาที (Spike-and-Wave) ทำให้ผู้ป่วยหยุดนิ่งไม่รู้สึกตัวชั่วคราว',
    activeLobe: 'all'
  }
];

export class EEGLaboratory {
  constructor(options = {}) {
    this.canvasId = options.canvasId || 'eeg-oscilloscope-canvas';
    this.onStateChange = options.onStateChange || (() => {});
    this.onDipoleUpdate = options.onDipoleUpdate || (() => {});

    this.currentStateIndex = 0;
    this.isActive = false;
    this.isSonificationOn = false;
    this.sweepSpeed = 2.2; // pixels per frame
    this.gain = 1.0; // amplitude multiplier
    this.time = 0;

    this.canvas = null;
    this.ctx = null;
    this.animationId = null;

    // Rolling waveform buffer for 4 channels
    this.bufferLength = 520;
    this.buffers = {
      frontal: new Float32Array(this.bufferLength),
      central: new Float32Array(this.bufferLength),
      temporal: new Float32Array(this.bufferLength),
      occipital: new Float32Array(this.bufferLength)
    };
    this.bufferIndex = 0;
  }

  init() {
    this.canvas = document.getElementById(this.canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.startLoop();
  }

  getCurrentState() {
    return EEG_STATES[this.currentStateIndex];
  }

  setState(index) {
    if (index >= 0 && index < EEG_STATES.length) {
      this.currentStateIndex = index;
      sound.playSelectChime();

      const st = this.getCurrentState();
      if (st.id === 'state_absence_seizure') {
        sound.playLesionWarning();
      }

      this.onStateChange(st);
    }
  }

  toggleLab() {
    this.isActive = !this.isActive;
    if (this.isActive) {
      sound.playSelectChime();
      if (!this.animationId) this.startLoop();
    } else {
      sound.playHoverTick();
      if (this.isSonificationOn) {
        this.toggleSonification(false);
      }
    }
    return this.isActive;
  }

  toggleSonification(forceState = null) {
    this.isSonificationOn = forceState !== null ? forceState : !this.isSonificationOn;
    const st = this.getCurrentState();
    const band = EEG_BANDS[st.band];

    if (this.isSonificationOn) {
      sound.startEEGSonification(band.dominantFreq);
    } else {
      sound.stopEEGSonification();
    }
    return this.isSonificationOn;
  }

  setGain(val) {
    this.gain = Math.max(0.2, Math.min(3.0, parseFloat(val)));
  }

  startLoop() {
    const render = () => {
      if (this.isActive && this.canvas && this.ctx) {
        this.updateSignals();
        this.drawOscilloscope();
      }
      this.animationId = requestAnimationFrame(render);
    };
    this.animationId = requestAnimationFrame(render);
  }

  stopLoop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  /**
   * Synthesize physiological EEG voltage potentials using Fourier components
   */
  updateSignals() {
    const st = this.getCurrentState();
    this.time += 0.022;

    const channels = ['frontal', 'central', 'temporal', 'occipital'];

    channels.forEach(ch => {
      const cfg = st.channels[ch];
      let v = 0;

      if (cfg.isSpikeWave) {
        // Absence 3-Hz Spike-and-Wave synthesis
        const phase = (this.time * cfg.freq * 2 * Math.PI) % (2 * Math.PI);
        // Sharp positive spike
        const spike = Math.exp(-Math.pow((phase - 1.2) * 5.5, 2)) * 1.5;
        // Slow negative dome wave
        const dome = -Math.sin(phase) * 0.7;
        v = (spike + dome) * cfg.amp * 0.45;
        // Random micro-jitter
        v += (Math.random() - 0.5) * 6;
      } else {
        // Harmonic summation + physiological 1/f pinkish noise
        const w1 = Math.sin(this.time * cfg.freq * 2 * Math.PI);
        const w2 = 0.35 * Math.sin(this.time * (cfg.freq * 1.8) * 2 * Math.PI + 0.8);
        const w3 = 0.2 * Math.sin(this.time * (cfg.freq * 0.5) * 2 * Math.PI + 2.1);
        const noise = (Math.random() - 0.5) * (cfg.noise || 6);

        v = (w1 + w2 + w3) * (cfg.amp * 0.5) + noise;
      }

      this.buffers[ch][this.bufferIndex] = v * this.gain;
    });

    this.bufferIndex = (this.bufferIndex + 1) % this.bufferLength;

    // Send dipole ripple amplitude to 3D cortex
    const activeBand = EEG_BANDS[st.band];
    this.onDipoleUpdate({
      band: st.band,
      dominantFreq: activeBand.dominantFreq,
      amplitude: activeBand.amplitudeUv * this.gain,
      activeLobe: st.activeLobe,
      time: this.time
    });
  }

  /**
   * High-DPI Medical Oscilloscope Canvas Rendering
   */
  drawOscilloscope() {
    const cvs = this.canvas;
    const ctx = this.ctx;
    const w = cvs.width;
    const h = cvs.height;

    // 1. Dark CRT Oscilloscope Background
    ctx.fillStyle = '#050811';
    ctx.fillRect(0, 0, w, h);

    // 2. Medical Grid Lines (1 sec / 50 uV divisions)
    ctx.strokeStyle = 'rgba(30, 58, 138, 0.22)';
    ctx.lineWidth = 1;

    const gridX = 35;
    const gridY = 25;
    ctx.beginPath();
    for (let x = 0; x < w; x += gridX) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
    }
    for (let y = 0; y < h; y += gridY) {
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
    }
    ctx.stroke();

    // 3. Render 4 Channels
    const channelConfigs = [
      { id: 'frontal', name: 'F3-F4 (Frontal)', baseColor: '#38bdf8', yCenter: h * 0.16 },
      { id: 'central', name: 'C3-C4 (Central)', baseColor: '#a78bfa', yCenter: h * 0.38 },
      { id: 'temporal', name: 'T3-T4 (Temporal)', baseColor: '#34d399', yCenter: h * 0.62 },
      { id: 'occipital', name: 'O1-O2 (Occipital)', baseColor: '#f59e0b', yCenter: h * 0.84 }
    ];

    channelConfigs.forEach(cfg => {
      const buf = this.buffers[cfg.id];
      const yCenter = cfg.yCenter;

      // Channel Baseline
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.setLineDash([2, 4]);
      ctx.beginPath();
      ctx.moveTo(90, yCenter);
      ctx.lineTo(w - 10, yCenter);
      ctx.stroke();
      ctx.setLineDash([]);

      // Channel Label
      ctx.fillStyle = cfg.baseColor;
      ctx.font = 'bold 10px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(cfg.name, 10, yCenter + 3);

      // Lead Trace Line
      ctx.strokeStyle = cfg.baseColor;
      ctx.lineWidth = 1.6;
      ctx.beginPath();

      const startIdx = this.bufferIndex;
      const plotWidth = w - 100;

      for (let i = 0; i < this.bufferLength; i++) {
        const ringIdx = (startIdx + i) % this.bufferLength;
        const val = buf[ringIdx];
        const x = 95 + (i / (this.bufferLength - 1)) * plotWidth;
        const y = yCenter - val * 0.55;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Glowing scanhead cursor
      const cursorX = 95 + plotWidth;
      const lastVal = buf[(startIdx + this.bufferLength - 1) % this.bufferLength];
      const cursorY = yCenter - lastVal * 0.55;

      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(cursorX, cursorY, 2.5, 0, Math.PI * 2);
      ctx.fill();
    });

    // 4. Calibration Bar (50 uV / 0.5 sec) in corner
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    const calX = w - 45;
    const calY = h - 22;
    ctx.beginPath();
    ctx.moveTo(calX, calY);
    ctx.lineTo(calX + 25, calY); // 0.5 sec horizontal
    ctx.moveTo(calX, calY);
    ctx.lineTo(calX, calY - 18); // 50 uV vertical
    ctx.stroke();

    ctx.fillStyle = '#94a3b8';
    ctx.font = '8px monospace';
    ctx.textAlign = 'right';
    ctx.fillText('50 µV', calX - 3, calY - 7);
  }
}
