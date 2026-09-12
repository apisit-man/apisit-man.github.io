/**
 * ==========================================================================
 * Professional Circuit Racing - Web Audio API & Sound Engine
 * Provides dynamic engine synthesis, gear pops, tire squeals, collisions,
 * and authentic Ferrari exhaust samples.
 * ==========================================================================
 */

export class RacingAudio {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.initialized = false;
    
    // Engine synthesizer nodes
    this.engineGain = null;
    this.osc1 = null;
    this.osc2 = null;
    this.oscSub = null;
    this.engineFilter = null;
    this.distortion = null;

    // Tire squeal nodes
    this.skidGain = null;
    this.skidSource = null;
    this.skidFilter = null;

    // Authentic audio buffers
    this.samples = {};
    this.masterGain = null;
  }

  init() {
    if (this.initialized && this.ctx) {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      return;
    }
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.8, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.setupEngineSynth();
      this.setupSkidSynth();
      this.preloadAuthenticSamples();

      this.initialized = true;
    } catch (e) {
      console.warn('[Audio] Failed to initialize Web Audio API:', e);
    }
  }

  setupEngineSynth() {
    if (!this.ctx) return;
    try {
      const t = this.ctx.currentTime;

      this.engineFilter = this.ctx.createBiquadFilter();
      this.engineFilter.type = 'lowpass';
      this.engineFilter.frequency.setValueAtTime(350, t);
      this.engineFilter.Q.setValueAtTime(3.5, t);

      this.distortion = this.ctx.createWaveShaper();
      this.distortion.curve = this.makeDistortionCurve(25);
      this.distortion.oversample = '2x';

      this.engineGain = this.ctx.createGain();
      this.engineGain.gain.setValueAtTime(0.01, t);

      this.osc1 = this.ctx.createOscillator();
      this.osc1.type = 'sawtooth';
      this.osc1.frequency.setValueAtTime(48, t);

      this.osc2 = this.ctx.createOscillator();
      this.osc2.type = 'triangle';
      this.osc2.frequency.setValueAtTime(96, t);

      this.oscSub = this.ctx.createOscillator();
      this.oscSub.type = 'sawtooth';
      this.oscSub.frequency.setValueAtTime(24, t);

      this.osc1.connect(this.distortion);
      this.osc2.connect(this.distortion);
      this.oscSub.connect(this.distortion);
      this.distortion.connect(this.engineFilter);
      this.engineFilter.connect(this.engineGain);
      this.engineGain.connect(this.masterGain);

      this.osc1.start();
      this.osc2.start();
      this.oscSub.start();
    } catch (e) {
      console.warn('[Audio] Synth setup error:', e);
    }
  }

  setupSkidSynth() {
    if (!this.ctx) return;
    try {
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      this.skidSource = this.ctx.createBufferSource();
      this.skidSource.buffer = noiseBuffer;
      this.skidSource.loop = true;

      this.skidFilter = this.ctx.createBiquadFilter();
      this.skidFilter.type = 'bandpass';
      this.skidFilter.frequency.setValueAtTime(950, this.ctx.currentTime);
      this.skidFilter.Q.setValueAtTime(4.0, this.ctx.currentTime);

      this.skidGain = this.ctx.createGain();
      this.skidGain.gain.setValueAtTime(0.001, this.ctx.currentTime);

      this.skidSource.connect(this.skidFilter);
      this.skidFilter.connect(this.skidGain);
      this.skidGain.connect(this.masterGain);

      this.skidSource.start();
    } catch (e) {
      console.warn('[Audio] Skid setup error:', e);
    }
  }

  makeDistortionCurve(amount) {
    const k = typeof amount === 'number' ? amount : 50;
    const n_samples = 44100;
    const curve = new Float32Array(n_samples);
    const deg = Math.PI / 180;
    for (let i = 0; i < n_samples; ++i) {
      const x = (i * 2) / n_samples - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }

  async preloadAuthenticSamples() {
    const files = {
      v8: './sounds/ferrari_v8_launch.mp3',
      v12: './sounds/ferrari_v12_f1_launch.mp3',
      gto: './sounds/ferrari_250gto_v12.mp3'
    };

    for (const [key, path] of Object.entries(files)) {
      try {
        const resp = await fetch(path);
        if (resp.ok) {
          const ab = await resp.arrayBuffer();
          this.ctx.decodeAudioData(ab, (decoded) => {
            this.samples[key] = decoded;
          });
        }
      } catch (e) {
        // Fallback to procedural synth smoothly
      }
    }
  }

  updateEngine(rpm, speedKmh, throttle, isAccelerating) {
    if (!this.initialized || this.isMuted || !this.ctx || !this.osc1) return;
    try {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }

      const t = this.ctx.currentTime;
      const normRpm = Math.max(0.1, Math.min(1.0, rpm / 9000));

      const baseFreq = 40 + normRpm * 180;
      this.osc1.frequency.setTargetAtTime(baseFreq, t, 0.04);
      this.osc2.frequency.setTargetAtTime(baseFreq * 2.0, t, 0.04);
      this.oscSub.frequency.setTargetAtTime(baseFreq * 0.5, t, 0.04);

      const filterFreq = 300 + normRpm * 3200 + (throttle ? 1200 : 0);
      this.engineFilter.frequency.setTargetAtTime(filterFreq, t, 0.05);

      let targetVol = 0.15 + (throttle ? 0.28 : 0.08) + normRpm * 0.22;
      if (speedKmh < 1 && !throttle) targetVol = 0.12;
      this.engineGain.gain.setTargetAtTime(targetVol, t, 0.06);
    } catch (e) {
      // Audio parameter safety
    }
  }

  updateTireSkid(slipIntensity) {
    if (!this.initialized || this.isMuted || !this.skidGain || !this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      const vol = Math.min(0.45, Math.max(0.001, (slipIntensity - 0.25) * 0.8));
      this.skidGain.gain.setTargetAtTime(vol, t, 0.03);

      const freq = 800 + slipIntensity * 600;
      this.skidFilter.frequency.setTargetAtTime(freq, t, 0.05);
    } catch (e) {}
  }

  playGearShift() {
    if (!this.initialized || this.isMuted || !this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(90, t);
      osc.frequency.linearRampToValueAtTime(30, t + 0.12);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, t);

      gain.gain.setValueAtTime(0.35, t);
      gain.gain.linearRampToValueAtTime(0.001, t + 0.14);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t);
      osc.stop(t + 0.15);
    } catch (e) {}
  }

  playCollision(impactSpeed = 1.0) {
    if (!this.initialized || this.isMuted || !this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, t);
      osc.frequency.linearRampToValueAtTime(25, t + 0.25);

      const intensity = Math.min(1.0, Math.max(0.2, impactSpeed));
      gain.gain.setValueAtTime(0.4 * intensity, t);
      gain.gain.linearRampToValueAtTime(0.001, t + 0.28);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t);
      osc.stop(t + 0.3);
    } catch (e) {}
  }

  playCountdownBeep(isGo = false) {
    try {
      this.init();
      if (this.isMuted || !this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = isGo ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(isGo ? 880 : 440, t);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(isGo ? 0.35 : 0.25, t + 0.02);
      gain.gain.linearRampToValueAtTime(0.001, t + (isGo ? 0.45 : 0.22));

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t);
      osc.stop(t + (isGo ? 0.5 : 0.25));
    } catch (e) {
      console.warn('[Audio] Countdown beep error:', e);
    }
  }

  playCheckeredFlag() {
    if (this.isMuted || !this.ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          if (!this.ctx) return;
          try {
            const t = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, t);
            gain.gain.setValueAtTime(0.28, t);
            gain.gain.linearRampToValueAtTime(0.001, t + 0.45);
            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start(t);
            osc.stop(t + 0.5);
          } catch (err) {}
        }, idx * 120);
      });
    } catch (e) {}
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.8, this.ctx.currentTime);
    }
    return this.isMuted;
  }
}
