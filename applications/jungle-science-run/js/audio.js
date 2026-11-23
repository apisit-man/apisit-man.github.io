// เสียงสังเคราะห์ด้วย WebAudio (ไม่ต้องโหลดไฟล์เสียง)
// ตามแนวทางของ web-audio-procedural: Universal AudioContext Singleton, Gesture Unlocker & Procedural Noise

export class GameAudio {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.enabled = true;
    this.ambientNodes = null;
    this.windNoise = null;
    this.setupGestureUnlocker();
  }

  setupGestureUnlocker() {
    if (typeof window === 'undefined') return;
    const unlock = () => {
      this.resume();
    };
    window.addEventListener('click', unlock, { once: true, passive: true });
    window.addEventListener('touchstart', unlock, { once: true, passive: true });
  }

  init() {
    if (this.ctx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) {
      this.enabled = false;
      return;
    }
    this.ctx = new AC();
    const comp = this.ctx.createDynamicsCompressor();
    comp.threshold.value = -18;
    comp.knee.value = 20;
    comp.ratio.value = 6;
    this.master = this.ctx.createGain();
    this.master.gain.value = this.enabled ? 0.55 : 0;
    this.master.connect(comp);
    comp.connect(this.ctx.destination);
  }

  resume() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  setEnabled(v) {
    this.enabled = v;
    if (this.master) {
      this.master.gain.cancelScheduledValues(this.ctx.currentTime);
      this.master.gain.setTargetAtTime(v ? 0.55 : 0, this.ctx.currentTime, 0.03);
    }
    if (!v) {
      this.stopAmbient();
      this.stopWind();
    }
  }

  get t() {
    return this.ctx ? this.ctx.currentTime : 0;
  }

  tone({ freq = 440, to = null, dur = 0.2, type = 'sine', gain = 0.2, delay = 0, curve = 'exp' }) {
    if (!this.ctx || !this.enabled) return;
    const t0 = this.t + delay;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (to !== null) {
      if (curve === 'exp') osc.frequency.exponentialRampToValueAtTime(Math.max(20, to), t0 + dur);
      else osc.frequency.linearRampToValueAtTime(Math.max(20, to), t0 + dur);
    }
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(gain, t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g);
    g.connect(this.master);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  }

  noise({ dur = 0.2, gain = 0.15, type = 'lowpass', freq = 800, to = null, delay = 0 }) {
    if (!this.ctx || !this.enabled) return;
    const t0 = this.t + delay;
    const len = Math.max(1, Math.floor(this.ctx.sampleRate * dur));
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    const filter = this.ctx.createBiquadFilter();
    filter.type = type;
    filter.frequency.setValueAtTime(freq, t0);
    if (to !== null) filter.frequency.exponentialRampToValueAtTime(Math.max(40, to), t0 + dur);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(gain, t0);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    src.connect(filter);
    filter.connect(g);
    g.connect(this.master);
    src.start(t0);
  }

  collect(step = 0) {
    this.tone({ freq: 720 * Math.pow(1.06, Math.min(8, step)), dur: 0.12, type: 'triangle', gain: 0.14 });
    this.tone({ freq: 1440 * Math.pow(1.06, Math.min(8, step)), dur: 0.08, type: 'sine', gain: 0.06, delay: 0.01 });
  }

  correct() {
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
      this.tone({ freq: f, dur: 0.28, type: 'sine', gain: 0.14, delay: i * 0.075 });
    });
    this.tone({ freq: 261.6, dur: 0.5, type: 'triangle', gain: 0.08, delay: 0.05 });
  }

  wrong() {
    this.tone({ freq: 220, to: 92, dur: 0.42, type: 'sawtooth', gain: 0.11 });
    this.tone({ freq: 160, to: 70, dur: 0.5, type: 'square', gain: 0.05, delay: 0.02 });
    this.noise({ dur: 0.25, gain: 0.06, freq: 500, to: 120 });
  }

  jump() {
    this.tone({ freq: 320, to: 720, dur: 0.16, type: 'sine', gain: 0.11 });
    this.noise({ dur: 0.12, gain: 0.04, freq: 1600, to: 500 });
  }

  land() {
    this.tone({ freq: 130, to: 60, dur: 0.14, type: 'sine', gain: 0.1 });
    this.noise({ dur: 0.1, gain: 0.05, freq: 420, to: 160 });
  }

  hit() {
    this.noise({ dur: 0.3, gain: 0.14, freq: 900, to: 90 });
    this.tone({ freq: 150, to: 55, dur: 0.35, type: 'square', gain: 0.12 });
  }

  splash() {
    this.noise({ dur: 0.35, gain: 0.1, freq: 2200, to: 400, type: 'bandpass' });
  }

  gatePass() {
    this.noise({ dur: 0.4, gain: 0.05, freq: 300, to: 2400, type: 'bandpass' });
  }

  tick() {
    this.tone({ freq: 880, dur: 0.07, type: 'sine', gain: 0.09 });
  }

  go() {
    this.tone({ freq: 523.25, dur: 0.18, type: 'sine', gain: 0.14 });
    this.tone({ freq: 1046.5, dur: 0.32, type: 'sine', gain: 0.12, delay: 0.1 });
  }

  click() {
    this.tone({ freq: 660, dur: 0.06, type: 'square', gain: 0.05 });
  }

  step() {
    this.tone({ freq: 96 + Math.random() * 18, dur: 0.075, type: 'sine', gain: 0.045 });
    this.noise({ dur: 0.05, gain: 0.018, freq: 520, to: 220 });
  }

  nearMiss() {
    this.noise({ dur: 0.16, gain: 0.05, freq: 2600, to: 700, type: 'bandpass' });
    this.tone({ freq: 1180, to: 1620, dur: 0.1, type: 'sine', gain: 0.05 });
  }

  warn() {
    this.tone({ freq: 520, dur: 0.05, type: 'square', gain: 0.035 });
  }

  boss() {
    [220, 277.18, 329.63, 440].forEach((f, i) => {
      this.tone({ freq: f, dur: 0.5, type: 'triangle', gain: 0.1, delay: i * 0.09 });
    });
    this.noise({ dur: 0.5, gain: 0.05, freq: 200, to: 1400, type: 'bandpass' });
  }

  zoneClear() {
    [392, 523.25, 659.25, 783.99].forEach((f, i) => {
      this.tone({ freq: f, dur: 0.42, type: 'sine', gain: 0.1, delay: i * 0.11 });
    });
  }

  unlock() {
    [659.25, 987.77, 1318.5].forEach((f, i) => {
      this.tone({ freq: f, dur: 0.28, type: 'triangle', gain: 0.09, delay: i * 0.08 });
    });
  }

  finish() {
    [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((f, i) => {
      this.tone({ freq: f, dur: 0.9, type: i < 2 ? 'triangle' : 'sine', gain: 0.1, delay: i * 0.1 });
    });
  }

  startAmbient() {
    if (!this.ctx || !this.enabled || this.ambientNodes) return;
    const t0 = this.t;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.linearRampToValueAtTime(0.05, t0 + 3);
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 420;
    const o1 = this.ctx.createOscillator();
    o1.type = 'sine';
    o1.frequency.value = 110;
    const o2 = this.ctx.createOscillator();
    o2.type = 'sine';
    o2.frequency.value = 164.8;
    const lfo = this.ctx.createOscillator();
    lfo.frequency.value = 0.08;
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 26;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    o1.connect(filter);
    o2.connect(filter);
    filter.connect(g);
    g.connect(this.master);
    o1.start(t0);
    o2.start(t0);
    lfo.start(t0);
    this.ambientNodes = { g, o1, o2, lfo };
  }

  stopAmbient() {
    if (!this.ambientNodes) return;
    const { g, o1, o2, lfo } = this.ambientNodes;
    const t0 = this.t;
    g.gain.cancelScheduledValues(t0);
    g.gain.setTargetAtTime(0.0001, t0, 0.3);
    try {
      o1.stop(t0 + 1.2);
      o2.stop(t0 + 1.2);
      lfo.stop(t0 + 1.2);
    } catch (e) { /* ignore */ }
    this.ambientNodes = null;
  }

  /* ---------------------- ลมปะทะความเร็ว (Wind Noise) ---------------------- */

  startWind() {
    if (!this.ctx || !this.enabled || this.windNoise) return;
    try {
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(320, this.ctx.currentTime);
      filter.Q.setValueAtTime(1.8, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.master);
      whiteNoise.start();

      this.windNoise = { whiteNoise, filter, gain };
    } catch (e) { /* ignore */ }
  }

  updateSpeed(speed, maxSpeed = 18) {
    if (!this.windNoise || !this.ctx || !this.enabled) return;
    const now = this.ctx.currentTime;
    const norm = Math.max(0, Math.min(1, (speed - 8) / (maxSpeed - 8)));
    const targetFreq = 220 + norm * 1100;
    const targetGain = norm * 0.12;
    this.windNoise.filter.frequency.setTargetAtTime(targetFreq, now, 0.1);
    this.windNoise.gain.gain.setTargetAtTime(targetGain, now, 0.1);
  }

  stopWind() {
    if (!this.windNoise) return;
    try {
      this.windNoise.whiteNoise.stop();
    } catch (e) { /* ignore */ }
    this.windNoise = null;
  }
}
