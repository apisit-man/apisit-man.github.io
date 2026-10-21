/**
 * audio.js - Procedural Web Audio API Sound Synthesizer for Roller Coaster
 * Developed by Dr. Apisit Tongchai (Independent Educator & Researcher)
 * 
 * Synthesizes:
 * 1. Ratchet Lift Hill Chain (คลิก-แก็ก-แก็ก)
 * 2. Aerodynamic Wind Noise (เสียงลมปะทะแปรผันตามความเร็ว)
 * 3. Metal Rail Rumble & Brake Squeal (เสียงเหล็กสั่นสะเทือนและเบรก)
 * 4. Passenger Thrill Scream & Cheer (เสียงหวีดร้องและเฮเมื่อพุ่งลงเนิน)
 * 5. Failure / Derail Impact Clatter (เสียงตกราง)
 */

class CoasterAudio {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.windNode = null;
    this.windGain = null;
    this.windFilter = null;
    this.rumbleNode = null;
    this.rumbleGain = null;
    this.liftTimer = null;
    this.isInitialized = false;
  }

  init() {
    if (this.isInitialized) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    this.ctx = new AudioContextClass();
    this.setupContinuousWind();
    this.setupContinuousRumble();
    this.isInitialized = true;
  }

  ensureContext() {
    if (!this.ctx) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      if (this.windGain) this.windGain.gain.setValueAtTime(0, this.ctx.currentTime);
      if (this.rumbleGain) this.rumbleGain.gain.setValueAtTime(0, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  setupContinuousWind() {
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    this.windFilter = this.ctx.createBiquadFilter();
    this.windFilter.type = 'bandpass';
    this.windFilter.frequency.setValueAtTime(250, this.ctx.currentTime);
    this.windFilter.Q.setValueAtTime(1.5, this.ctx.currentTime);

    this.windGain = this.ctx.createGain();
    this.windGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);

    whiteNoise.connect(this.windFilter);
    this.windFilter.connect(this.windGain);
    this.windGain.connect(this.ctx.destination);
    whiteNoise.start(0);
  }

  setupContinuousRumble() {
    if (!this.ctx) return;
    // Low frequency rumble for wheels on steel tubular rails
    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(45, this.ctx.currentTime);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(90, this.ctx.currentTime);

    this.rumbleGain = this.ctx.createGain();
    this.rumbleGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);

    osc.connect(filter);
    filter.connect(this.rumbleGain);
    this.rumbleGain.connect(this.ctx.destination);
    osc.start(0);
  }

  /**
   * Modulates sound continuous loops in real-time based on coaster speed (km/h)
   */
  updateDynamicAudio(speedKmh, gForce, isRunning) {
    if (!this.ctx || this.isMuted || !isRunning) {
      if (this.windGain) this.windGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.1);
      if (this.rumbleGain) this.rumbleGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.1);
      return;
    }

    const normSpeed = Math.min(1.0, Math.max(0, speedKmh / 120)); // 0 to 1

    // Wind noise pitch & volume
    if (this.windFilter && this.windGain) {
      const freq = 200 + normSpeed * 1200; // 200Hz to 1400Hz
      const vol = normSpeed * 0.28;
      this.windFilter.frequency.setTargetAtTime(freq, this.ctx.currentTime, 0.05);
      this.windGain.gain.setTargetAtTime(vol, this.ctx.currentTime, 0.05);
    }

    // Rail rumble
    if (this.rumbleGain) {
      const rumbleVol = normSpeed * 0.15;
      this.rumbleGain.gain.setTargetAtTime(rumbleVol, this.ctx.currentTime, 0.05);
    }
  }

  /**
   * Ratchet lift click
   */
  playLiftClick() {
    if (!this.ctx || this.isMuted) return;
    this.ensureContext();

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(980, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.035);

    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.035);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.04);
  }

  /**
   * Passenger thrill cheer / scream
   */
  playScream() {
    if (!this.ctx || this.isMuted) return;
    this.ensureContext();

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    // Frequency sweep imitating playful scream
    osc.frequency.setValueAtTime(650, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(880, this.ctx.currentTime + 0.15);
    osc.frequency.linearRampToValueAtTime(520, this.ctx.currentTime + 0.4);

    gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.45);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.5);
  }

  /**
   * Metal brake screech when pulling into station
   */
  playBrakeSound() {
    if (!this.ctx || this.isMuted) return;
    this.ensureContext();

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(2400, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1600, this.ctx.currentTime + 0.35);

    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.36);
  }

  /**
   * Crash / derailment sound
   */
  playCrashSound() {
    if (!this.ctx || this.isMuted) return;
    this.ensureContext();

    // Noise burst + low thud
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(35, this.ctx.currentTime + 0.4);

    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.45);
  }

  /**
   * UI Click / Snap node feedback
   */
  playNodeSnap() {
    if (!this.ctx || this.isMuted) return;
    this.ensureContext();

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.06);
  }
}

export const soundManager = new CoasterAudio();
