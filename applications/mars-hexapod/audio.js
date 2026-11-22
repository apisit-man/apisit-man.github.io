/**
 * Mars Hexapod Audio Engine (Web Audio API)
 * 100% Procedural synthesis for zero asset loading delays and high performance.
 */
export class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.motorOsc = null;
    this.motorGain = null;
    this.windNode = null;
    this.windGain = null;
    this.initialized = false;
  }

  init() {
    if (this.initialized) {
      if (this.ctx && this.ctx.state === 'suspended' && !this.isMuted) {
        this.ctx.resume();
      }
      return;
    }
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();

      // Setup continuous motor whine oscillator
      this.motorOsc = this.ctx.createOscillator();
      this.motorOsc.type = 'sawtooth';
      this.motorOsc.frequency.setValueAtTime(45, this.ctx.currentTime);

      const motorFilter = this.ctx.createBiquadFilter();
      motorFilter.type = 'lowpass';
      motorFilter.frequency.setValueAtTime(220, this.ctx.currentTime);

      this.motorGain = this.ctx.createGain();
      this.motorGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);

      this.motorOsc.connect(motorFilter);
      motorFilter.connect(this.motorGain);
      this.motorGain.connect(this.ctx.destination);
      this.motorOsc.start();

      // Setup subtle ambient Martian wind generator
      this.initWind();

      this.initialized = true;
    } catch (e) {
      console.warn('Web Audio API not supported or blocked:', e);
    }
  }

  initWind() {
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

    const windFilter = this.ctx.createBiquadFilter();
    windFilter.type = 'bandpass';
    windFilter.frequency.setValueAtTime(260, this.ctx.currentTime);
    windFilter.Q.setValueAtTime(3.0, this.ctx.currentTime);

    this.windGain = this.ctx.createGain();
    this.windGain.gain.setValueAtTime(0.015, this.ctx.currentTime);

    whiteNoise.connect(windFilter);
    windFilter.connect(this.windGain);
    this.windGain.connect(this.ctx.destination);
    whiteNoise.start();
  }

  updateMotor(speed) {
    if (!this.initialized || this.isMuted || !this.ctx) return;
    const targetFreq = 45 + speed * 120;
    const targetVol = speed > 0.05 ? Math.min(0.08, speed * 0.08) : 0.0001;

    this.motorOsc.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 0.05);
    this.motorGain.gain.setTargetAtTime(targetVol, this.ctx.currentTime, 0.05);
  }

  playFootstep() {
    if (!this.initialized || this.isMuted || !this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.06);

    gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.06);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.07);
  }

  playScan() {
    if (!this.initialized || this.isMuted || !this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 arpeggio
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + idx * 0.08 + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime + idx * 0.08);
      osc.stop(this.ctx.currentTime + idx * 0.08 + 0.35);
    });
  }

  playAlert() {
    if (!this.initialized || this.isMuted || !this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(880, this.ctx.currentTime);
    osc.frequency.setValueAtTime(440, this.ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.18);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.2);
  }

  playDamageAlert() {
    this.init();
    if (!this.initialized || this.isMuted || !this.ctx) return;
    const now = this.ctx.currentTime;

    // 1. Heavy Plasma / Impact Sub-Bass Shockwave
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'sawtooth';
    subOsc.frequency.setValueAtTime(160, now);
    subOsc.frequency.exponentialRampToValueAtTime(32, now + 0.25);

    const subFilter = this.ctx.createBiquadFilter();
    subFilter.type = 'lowpass';
    subFilter.frequency.setValueAtTime(450, now);
    subFilter.frequency.exponentialRampToValueAtTime(90, now + 0.25);

    subGain.gain.setValueAtTime(0.28, now);
    subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.26);

    subOsc.connect(subFilter);
    subFilter.connect(subGain);
    subGain.connect(this.ctx.destination);
    subOsc.start(now);
    subOsc.stop(now + 0.28);

    // 2. Electric Arc Crackling Burst
    const bufLen = Math.floor(this.ctx.sampleRate * 0.18);
    const noiseBuf = this.ctx.createBuffer(1, bufLen, this.ctx.sampleRate);
    const data = noiseBuf.getChannelData(0);
    for (let i = 0; i < bufLen; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufLen * 0.4));
    }
    const noiseSrc = this.ctx.createBufferSource();
    noiseSrc.buffer = noiseBuf;

    const bpFilter = this.ctx.createBiquadFilter();
    bpFilter.type = 'bandpass';
    bpFilter.frequency.setValueAtTime(1850, now);
    bpFilter.Q.setValueAtTime(2.5, now);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.18, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

    noiseSrc.connect(bpFilter);
    bpFilter.connect(noiseGain);
    noiseGain.connect(this.ctx.destination);
    noiseSrc.start(now);

    // 3. Urgent Two-Tone Cockpit Hull Breach Siren
    [0, 0.11].forEach((offset, idx) => {
      const sirenOsc = this.ctx.createOscillator();
      const sirenGain = this.ctx.createGain();
      sirenOsc.type = 'square';
      sirenOsc.frequency.setValueAtTime(idx === 0 ? 960 : 620, now + offset);
      sirenGain.gain.setValueAtTime(0.08, now + offset);
      sirenGain.gain.exponentialRampToValueAtTime(0.0001, now + offset + 0.09);
      sirenOsc.connect(sirenGain);
      sirenGain.connect(this.ctx.destination);
      sirenOsc.start(now + offset);
      sirenOsc.stop(now + offset + 0.1);
    });
  }

  playWrongAnswer() {
    this.init();
    if (!this.initialized || this.isMuted || !this.ctx) return;
    const now = this.ctx.currentTime;

    // Multi-layered arcade error buzz
    const buzz1 = this.ctx.createOscillator();
    const buzzGain1 = this.ctx.createGain();
    buzz1.type = 'sawtooth';
    buzz1.frequency.setValueAtTime(210, now);
    buzz1.frequency.exponentialRampToValueAtTime(110, now + 0.25);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(850, now);
    filter.frequency.exponentialRampToValueAtTime(300, now + 0.25);

    buzzGain1.gain.setValueAtTime(0.18, now);
    buzzGain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.26);

    buzz1.connect(filter);
    filter.connect(buzzGain1);
    buzzGain1.connect(this.ctx.destination);
    buzz1.start(now);
    buzz1.stop(now + 0.27);
  }

  playGameOver() {
    this.init();
    if (!this.initialized || this.isMuted || !this.ctx) return;
    const now = this.ctx.currentTime;

    // Descending dramatic power-down & sad trombone motif (D4 -> C#4 -> C4 -> B3 slide down)
    const notes = [293.66, 277.18, 261.63, 246.94];
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(920, now);

      const t = now + idx * 0.26;
      osc.frequency.setValueAtTime(freq, t);
      if (idx === 3) {
        osc.frequency.exponentialRampToValueAtTime(95, t + 0.75);
      }

      gain.gain.setValueAtTime(0.16, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + (idx === 3 ? 0.8 : 0.24));

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + (idx === 3 ? 0.85 : 0.25));
    });
  }

  playTractionSlip() {
    if (!this.initialized || this.isMuted || !this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(110, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(55, this.ctx.currentTime + 0.22);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(320, this.ctx.currentTime);
    filter.Q.setValueAtTime(4.0, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.25);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.26);
  }

  playVictory() {
    this.init();
    if (!this.initialized || this.isMuted || !this.ctx) return;
    const chords = [523.25, 659.25, 783.99, 1046.5];
    chords.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.09);

      gain.gain.setValueAtTime(0.14, this.ctx.currentTime + idx * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + idx * 0.09 + 0.55);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime + idx * 0.09);
      osc.stop(this.ctx.currentTime + idx * 0.09 + 0.6);
    });
  }

  /**
   * Grand Celebratory Cheering & Victory Fanfare SFX
   * Triggered when all 10 AI Ethics & Literacy questions are completed!
   */
  playGrandCelebration() {
    this.init();
    if (!this.initialized || this.isMuted || !this.ctx) return;
    const now = this.ctx.currentTime;

    // 1. Triumphant Brass / Synth Fanfare Melody (C5 -> E5 -> G5 -> C6 -> G5 -> C6!)
    const fanfareNotes = [
      { freq: 523.25, harmony: 261.63, start: 0.00, dur: 0.16 }, // C5
      { freq: 659.25, harmony: 329.63, start: 0.16, dur: 0.16 }, // E5
      { freq: 783.99, harmony: 392.00, start: 0.32, dur: 0.16 }, // G5
      { freq: 1046.50, harmony: 523.25, start: 0.48, dur: 0.34 }, // C6
      { freq: 783.99, harmony: 392.00, start: 0.84, dur: 0.16 }, // G5
      { freq: 1046.50, harmony: 523.25, start: 1.02, dur: 1.15 }  // Grand C6 Finale!
    ];

    fanfareNotes.forEach((n) => {
      // Lead Trumpet Synth
      const lead = this.ctx.createOscillator();
      const leadGain = this.ctx.createGain();
      const leadFilter = this.ctx.createBiquadFilter();

      lead.type = 'sawtooth';
      lead.frequency.setValueAtTime(n.freq, now + n.start);

      leadFilter.type = 'lowpass';
      leadFilter.frequency.setValueAtTime(2400, now + n.start);

      leadGain.gain.setValueAtTime(0.001, now + n.start);
      leadGain.gain.linearRampToValueAtTime(0.18, now + n.start + 0.02);
      leadGain.gain.exponentialRampToValueAtTime(0.0001, now + n.start + n.dur);

      lead.connect(leadFilter);
      leadFilter.connect(leadGain);
      leadGain.connect(this.ctx.destination);
      lead.start(now + n.start);
      lead.stop(now + n.start + n.dur + 0.04);

      // Warm Harmony Octave / Fifth
      const harm = this.ctx.createOscillator();
      const harmGain = this.ctx.createGain();
      harm.type = 'triangle';
      harm.frequency.setValueAtTime(n.harmony, now + n.start);

      harmGain.gain.setValueAtTime(0.14, now + n.start);
      harmGain.gain.exponentialRampToValueAtTime(0.0001, now + n.start + n.dur);

      harm.connect(harmGain);
      harmGain.connect(this.ctx.destination);
      harm.start(now + n.start);
      harm.stop(now + n.start + n.dur + 0.04);
    });

    // 2. Joyful Sparkle Chime Arpeggio Fireworks (1.05s to 2.2s)
    const sparkleFreqs = [1046.5, 1318.5, 1567.98, 2093.0, 1567.98, 2093.0, 2637.02];
    sparkleFreqs.forEach((f, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = now + 1.05 + i * 0.11;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, t);

      gain.gain.setValueAtTime(0.11, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.48);
    });

    // 3. Procedural Cheering Crowd & Joyful Applause Claps (0.45s to 2.6s)
    const clapCount = 26;
    for (let i = 0; i < clapCount; i++) {
      const clapTime = now + 0.45 + i * 0.075 + (Math.random() * 0.03);
      const bufSize = Math.floor(this.ctx.sampleRate * 0.09);
      const buf = this.ctx.createBuffer(1, bufSize, this.ctx.sampleRate);
      const out = buf.getChannelData(0);
      for (let j = 0; j < bufSize; j++) {
        out[j] = (Math.random() * 2 - 1) * Math.exp(-j / (bufSize * 0.28));
      }

      const src = this.ctx.createBufferSource();
      src.buffer = buf;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1100 + Math.random() * 750, clapTime);
      filter.Q.setValueAtTime(1.8, clapTime);

      const gain = this.ctx.createGain();
      const fadeEnvelope = Math.sin((i / clapCount) * Math.PI);
      gain.gain.setValueAtTime(0.09 * Math.max(0.25, fadeEnvelope), clapTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, clapTime + 0.085);

      src.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      src.start(clapTime);
    }

    // 4. Joyful "Yay!" Rising Formant Cheer Synth Chord
    const cheerFreqs = [440, 554.37, 659.25];
    cheerFreqs.forEach((cf) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(cf * 0.92, now + 0.5);
      osc.frequency.exponentialRampToValueAtTime(cf * 1.15, now + 0.85);
      osc.frequency.linearRampToValueAtTime(cf * 1.08, now + 1.9);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(800, now + 0.5);
      filter.frequency.linearRampToValueAtTime(1450, now + 0.9);
      filter.Q.setValueAtTime(3.2, now + 0.5);

      gain.gain.setValueAtTime(0.001, now + 0.5);
      gain.gain.linearRampToValueAtTime(0.06, now + 0.75);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + 0.5);
      osc.stop(now + 2.05);
    });
  }

  playCollision() {
    if (!this.initialized || this.isMuted || !this.ctx) return;
    const now = this.ctx.currentTime;

    // Low-frequency structural bumper thump (body contact shock)
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(110, now);
    osc.frequency.exponentialRampToValueAtTime(32, now + 0.14);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(380, now);
    filter.frequency.exponentialRampToValueAtTime(80, now + 0.14);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.16);

    // High-frequency metallic clink / titanium rebound
    const clinkOsc = this.ctx.createOscillator();
    const clinkGain = this.ctx.createGain();
    clinkOsc.type = 'sine';
    clinkOsc.frequency.setValueAtTime(680, now);
    clinkOsc.frequency.exponentialRampToValueAtTime(220, now + 0.08);

    clinkGain.gain.setValueAtTime(0.06, now);
    clinkGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

    clinkOsc.connect(clinkGain);
    clinkGain.connect(this.ctx.destination);

    clinkOsc.start(now);
    clinkOsc.stop(now + 0.09);
  }

  playGaitShift() {
    if (!this.initialized || this.isMuted || !this.ctx) return;
    const now = this.ctx.currentTime;

    // 1. High-pressure pneumatic solenoid valve hiss
    const bufferSize = Math.floor(this.ctx.sampleRate * 0.18);
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400, now);
    filter.frequency.exponentialRampToValueAtTime(320, now + 0.17);
    filter.Q.setValueAtTime(4.0, now);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.09, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.17);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.ctx.destination);
    noise.start(now);

    // 2. Heavy mechanical relay latch click
    const clickOsc = this.ctx.createOscillator();
    const clickGain = this.ctx.createGain();
    clickOsc.type = 'square';
    clickOsc.frequency.setValueAtTime(540, now);
    clickOsc.frequency.exponentialRampToValueAtTime(110, now + 0.06);

    clickGain.gain.setValueAtTime(0.08, now);
    clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

    clickOsc.connect(clickGain);
    clickGain.connect(this.ctx.destination);
    clickOsc.start(now);
    clickOsc.stop(now + 0.07);
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.ctx) {
      if (this.isMuted) {
        this.ctx.suspend();
      } else {
        this.ctx.resume();
      }
    }
    return this.isMuted;
  }
}
