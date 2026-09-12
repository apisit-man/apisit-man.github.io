/**
 * ==========================================================================
 * Professional Circuit Racing - High-Fidelity Web Audio & Acoustic Engine
 * Multi-layer procedural synthesis & physical acoustic modeling:
 *  - Flat-plane V8 (4 pulses/rev) vs 65° V12 (6 pulses/rev) harmonic tracking
 *  - Dynamic intake manifold load modeling (growl resonator 160–380 Hz)
 *  - Wave-shaper asymmetric saturation for exhaust pipe rasp
 *  - Procedural lift-off overrun exhaust crackles, pops & backfires
 *  - Twin-turbo spool whine & pneumatic blow-off valve (BOV) flutter
 *  - Straight-cut dog-box transmission gear whine
 *  - Uneven camshaft idle lope LFO (8.5 Hz mechanical vibration)
 *  - Decoded authentic Ferrari sample blending
 *  - Smooth starter motor crank & click-free 0.35s ignition cut
 * ==========================================================================
 */

export class RacingAudio {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.initialized = false;
    this.isEngineRunning = false;

    // Car profile configuration
    this.currentModelId = 'sf90_gt';
    this.soundType = 'v8'; // 'v8' or 'v12'
    this.hasTurbo = true;

    // Master bus
    this.masterGain = null;
    this.engineMasterGain = null;

    // Primary combustion firing order oscillators
    this.oscFund = null;
    this.osc2nd = null;
    this.osc3rd = null;
    this.oscSub = null;

    // Harmonic balance gains
    this.gainFund = null;
    this.gain2nd = null;
    this.gain3rd = null;
    this.gainSub = null;

    // Saturation and Formant Shaping
    this.distortion = null;
    this.exhaustFilter = null;
    this.intakeFilter = null;
    this.intakeGain = null;
    this.intakeOsc = null;

    // Turbocharger simulation
    this.turboOsc = null;
    this.turboGain = null;
    this.turboBoost = 0; // 0.0 - 1.0

    // Straight-cut gear whine
    this.gearWhineOsc = null;
    this.gearWhineGain = null;

    // Camshaft Idle Lope LFO
    this.idleLfo = null;
    this.idleLfoGain = null;

    // Tire squeal nodes
    this.skidGain = null;
    this.skidSource = null;
    this.skidFilter = null;

    // Telemetry memory for lift-off and overrun crackles
    this.prevThrottle = 0;
    this.lastOverrunTime = 0;
    this.lastBovTime = 0;
    this.smoothedLoad = 0;
    this.smoothedRpm = 1000;

    // Authentic Real Ferrari Race Audio Engine (Monza 488 GT3 Evo & FXX-K Pure Race Onboard)
    this.samples = {};
    this.raceMasterGain = null;
    this.raceIdleNode = null;
    this.raceIdleGain = null;
    this.raceMidNode = null;
    this.raceMidGain = null;
    this.raceScreamNode = null;
    this.raceScreamGain = null;
    this.raceDecelNode = null;
    this.raceDecelGain = null;
    this.activeSampleType = null;
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

      // Master output bus with soft compression/limiting
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0.0 : 0.85, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Dedicated engine sub-mix bus
      this.engineMasterGain = this.ctx.createGain();
      this.engineMasterGain.gain.setValueAtTime(0.00001, this.ctx.currentTime);
      this.engineMasterGain.connect(this.masterGain);

      // Real Ferrari Race Sub-Mix Bus (Monza 488 GT3 Evo & FXX-K Onboard)
      this.raceMasterGain = this.ctx.createGain();
      this.raceMasterGain.gain.setValueAtTime(1.15, this.ctx.currentTime);
      this.raceMasterGain.connect(this.engineMasterGain);

      this.raceIdleGain = this.ctx.createGain();
      this.raceIdleGain.gain.setValueAtTime(0.00001, this.ctx.currentTime);
      this.raceIdleGain.connect(this.raceMasterGain);

      this.raceMidGain = this.ctx.createGain();
      this.raceMidGain.gain.setValueAtTime(0.00001, this.ctx.currentTime);
      this.raceMidGain.connect(this.raceMasterGain);

      this.raceScreamGain = this.ctx.createGain();
      this.raceScreamGain.gain.setValueAtTime(0.00001, this.ctx.currentTime);
      this.raceScreamGain.connect(this.raceMasterGain);

      this.raceDecelGain = this.ctx.createGain();
      this.raceDecelGain.gain.setValueAtTime(0.00001, this.ctx.currentTime);
      this.raceDecelGain.connect(this.raceMasterGain);

      this.setupEngineSynth();
      this.setupTurboAndTransmission();
      this.setupSkidSynth();
      this.preloadAuthenticSamples();

      this.initialized = true;
    } catch (e) {
      console.warn('[Audio] Web Audio API init error:', e);
    }
  }

  setCarProfile(modelId, soundType = 'v8', hasTurbo = false) {
    const oldType = this.soundType;
    this.currentModelId = modelId;
    this.soundType = soundType || (modelId && (modelId.includes('v12') || modelId.includes('laferrari') || modelId.includes('enzo') || modelId.includes('daytona')) ? 'v12' : 'v8');
    this.hasTurbo = (hasTurbo !== undefined) ? hasTurbo : (modelId === 'sf90_gt' || modelId === 'f40_lm');
    
    // Switch sample loops if engine profile changed while running
    if (this.isEngineRunning && oldType !== this.soundType) {
      this.startSampleLoops();
    }

    // Adjust harmonic balance based on engine configuration
    if (this.gainFund && this.gain2nd && this.gain3rd && this.ctx) {
      const t = this.ctx.currentTime;
      if (this.soundType === 'v12') {
        // V12: Screaming F1 high harmonics, sharp metallic upper registers
        this.gainFund.gain.setTargetAtTime(0.24, t, 0.05);
        this.gain2nd.gain.setTargetAtTime(0.32, t, 0.05);
        this.gain3rd.gain.setTargetAtTime(0.28, t, 0.05);
        this.gainSub.gain.setTargetAtTime(0.16, t, 0.05);
      } else {
        // V8: Flat-plane crossplane throaty bass, strong fundamental punch
        this.gainFund.gain.setTargetAtTime(0.35, t, 0.05);
        this.gain2nd.gain.setTargetAtTime(0.26, t, 0.05);
        this.gain3rd.gain.setTargetAtTime(0.18, t, 0.05);
        this.gainSub.gain.setTargetAtTime(0.25, t, 0.05);
      }
    }
  }

  setupEngineSynth() {
    if (!this.ctx) return;
    try {
      const t = this.ctx.currentTime;

      // 1. Asymmetric WaveShaper Saturation (Manifold Exhaust Pipe Compression)
      this.distortion = this.ctx.createWaveShaper();
      this.distortion.curve = this.makeDistortionCurve(18);
      this.distortion.oversample = '2x';

      // 2. Tuned Exhaust Resonant Formant Filter
      this.exhaustFilter = this.ctx.createBiquadFilter();
      this.exhaustFilter.type = 'lowpass';
      this.exhaustFilter.frequency.setValueAtTime(420, t);
      this.exhaustFilter.Q.setValueAtTime(2.8, t);

      // 3. Dynamic Intake Manifold Resonator (Throaty Growl under Full Throttle)
      this.intakeFilter = this.ctx.createBiquadFilter();
      this.intakeFilter.type = 'bandpass';
      this.intakeFilter.frequency.setValueAtTime(220, t);
      this.intakeFilter.Q.setValueAtTime(3.2, t);

      this.intakeGain = this.ctx.createGain();
      this.intakeGain.gain.setValueAtTime(0.001, t);

      this.intakeOsc = this.ctx.createOscillator();
      this.intakeOsc.type = 'sawtooth';
      this.intakeOsc.frequency.setValueAtTime(55, t);
      this.intakeOsc.connect(this.intakeFilter);
      this.intakeFilter.connect(this.intakeGain);
      this.intakeGain.connect(this.engineMasterGain);
      this.intakeOsc.start();

      // 4. Primary Firing Pulse Oscillator Bank
      // Fundamental pulse:
      this.oscFund = this.ctx.createOscillator();
      this.oscFund.type = 'sawtooth';
      this.oscFund.frequency.setValueAtTime(60, t);
      this.gainFund = this.ctx.createGain();
      this.gainFund.gain.setValueAtTime(0.35, t);
      this.oscFund.connect(this.gainFund);

      // 2nd Harmonic (Octave):
      this.osc2nd = this.ctx.createOscillator();
      this.osc2nd.type = 'sawtooth';
      this.osc2nd.frequency.setValueAtTime(120, t);
      this.gain2nd = this.ctx.createGain();
      this.gain2nd.gain.setValueAtTime(0.28, t);
      this.osc2nd.connect(this.gain2nd);

      // 3rd Harmonic (Fifth above octave - visceral metallic howl):
      this.osc3rd = this.ctx.createOscillator();
      this.osc3rd.type = 'sawtooth';
      this.osc3rd.frequency.setValueAtTime(180, t);
      this.gain3rd = this.ctx.createGain();
      this.gain3rd.gain.setValueAtTime(0.20, t);
      this.osc3rd.connect(this.gain3rd);

      // Sub-Bass Octave (Under-chassis rumble):
      this.oscSub = this.ctx.createOscillator();
      this.oscSub.type = 'triangle';
      this.oscSub.frequency.setValueAtTime(30, t);
      this.gainSub = this.ctx.createGain();
      this.gainSub.gain.setValueAtTime(0.22, t);
      this.oscSub.connect(this.gainSub);

      // Mix oscillators into distortion -> exhaust filter (Muted to 0 to eliminate fake synth buzz!)
      const combustionMix = this.ctx.createGain();
      combustionMix.gain.setValueAtTime(0.00001, t);
      this.gainFund.connect(combustionMix);
      this.gain2nd.connect(combustionMix);
      this.gain3rd.connect(combustionMix);
      this.gainSub.connect(combustionMix);

      combustionMix.connect(this.distortion);
      this.distortion.connect(this.exhaustFilter);
      this.exhaustFilter.connect(this.engineMasterGain);

      // 5. Camshaft Idle Lope LFO (8.5 Hz uneven mechanical pulse at idle)
      this.idleLfo = this.ctx.createOscillator();
      this.idleLfo.frequency.setValueAtTime(8.5, t);
      this.idleLfoGain = this.ctx.createGain();
      this.idleLfoGain.gain.setValueAtTime(0.0, t); // Only activates at idle

      this.idleLfo.connect(this.idleLfoGain);
      this.idleLfoGain.connect(combustionMix.gain);

      this.oscFund.start();
      this.osc2nd.start();
      this.osc3rd.start();
      this.oscSub.start();
      this.idleLfo.start();
    } catch (e) {
      console.warn('[Audio] Synth setup error:', e);
    }
  }

  setupTurboAndTransmission() {
    if (!this.ctx) return;
    try {
      const t = this.ctx.currentTime;

      // 1. Turbocharger High-Pitch Spool Whine (1.2 kHz - 4.5 kHz)
      this.turboOsc = this.ctx.createOscillator();
      this.turboOsc.type = 'sine';
      this.turboOsc.frequency.setValueAtTime(1400, t);

      this.turboGain = this.ctx.createGain();
      this.turboGain.gain.setValueAtTime(0.00001, t);

      // Add a subtle bandpass filter to give realistic turbo compressor casing resonance
      const turboFilter = this.ctx.createBiquadFilter();
      turboFilter.type = 'bandpass';
      turboFilter.frequency.setValueAtTime(2600, t);
      turboFilter.Q.setValueAtTime(6.0, t);

      this.turboOsc.connect(turboFilter);
      turboFilter.connect(this.turboGain);
      this.turboGain.connect(this.engineMasterGain);
      this.turboOsc.start();

      // 2. Straight-Cut Dog-Box Transmission Gear Whine
      this.gearWhineOsc = this.ctx.createOscillator();
      this.gearWhineOsc.type = 'triangle';
      this.gearWhineOsc.frequency.setValueAtTime(220, t);

      this.gearWhineGain = this.ctx.createGain();
      this.gearWhineGain.gain.setValueAtTime(0.00001, t);

      const gearFilter = this.ctx.createBiquadFilter();
      gearFilter.type = 'bandpass';
      gearFilter.frequency.setValueAtTime(900, t);
      gearFilter.Q.setValueAtTime(3.5, t);

      this.gearWhineOsc.connect(gearFilter);
      gearFilter.connect(this.gearWhineGain);
      this.gearWhineGain.connect(this.engineMasterGain);
      this.gearWhineOsc.start();
    } catch (e) {
      console.warn('[Audio] Turbo/Trans setup error:', e);
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
      this.skidGain.gain.setValueAtTime(0.00001, this.ctx.currentTime);

      this.skidSource.connect(this.skidFilter);
      this.skidFilter.connect(this.skidGain);
      this.skidGain.connect(this.masterGain);

      this.skidSource.start();
    } catch (e) {
      console.warn('[Audio] Skid setup error:', e);
    }
  }

  makeDistortionCurve(amount) {
    const k = typeof amount === 'number' ? amount : 25;
    const n_samples = 44100;
    const curve = new Float32Array(n_samples);
    const deg = Math.PI / 180;
    for (let i = 0; i < n_samples; ++i) {
      const x = (i * 2) / n_samples - 1;
      // Asymmetric saturation curve for rich combustion harmonic generation
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x)) + (x > 0 ? 0.08 * x * x : 0);
    }
    return curve;
  }

  async preloadAuthenticSamples() {
    const files = {
      gt3_idle: './sounds/ferrari_real_gt3_idle.wav',
      gt3_mid: './sounds/ferrari_real_gt3_mid.wav',
      gt3_roar: './sounds/ferrari_real_gt3_roar.wav',
      gt3_shift: './sounds/ferrari_real_gt3_shift.wav',
      gt3_decel: './sounds/ferrari_real_gt3_decel.wav',
      fxxk_idle: './sounds/ferrari_real_fxxk_idle.wav',
      fxxk_roar: './sounds/ferrari_real_fxxk_roar.wav',
      fxxk_scream: './sounds/ferrari_real_fxxk_scream.wav',
      fxxk_shift: './sounds/ferrari_real_fxxk_shift.wav'
    };

    for (const [key, path] of Object.entries(files)) {
      try {
        const resp = await fetch(path);
        if (resp.ok) {
          const ab = await resp.arrayBuffer();
          this.ctx.decodeAudioData(ab, (decoded) => {
            this.samples[key] = decoded;
            // If engine is already running, engage real race loops immediately
            if (this.isEngineRunning) {
              this.startSampleLoops();
            }
          });
        }
      } catch (e) {
        // Fallback resilience
      }
    }
  }

  /**
   * Starts pure real Ferrari race audio loops
   * (Monza Ferrari 488 GT3 Evo Onboard vs Monza Ferrari FXX K EVO Pure Race)
   */
  startSampleLoops() {
    if (!this.ctx || !this.isEngineRunning) return;

    const t = this.ctx.currentTime;
    const isV12 = this.soundType === 'v12';
    const targetType = isV12 ? 'v12' : 'v8';

    if (this.activeSampleType && this.activeSampleType !== targetType) {
      this.stopSampleLoops(0.05);
    }

    const idleBuf = isV12 ? this.samples['fxxk_idle'] : this.samples['gt3_idle'];
    const midBuf = isV12 ? this.samples['fxxk_roar'] : this.samples['gt3_mid'];
    const screamBuf = isV12 ? this.samples['fxxk_scream'] : this.samples['gt3_roar'];
    const decelBuf = this.samples['gt3_decel'];

    const createLoop = (existingNode, buffer, gainNode) => {
      if (existingNode || !buffer || !gainNode) return existingNode;
      try {
        const node = this.ctx.createBufferSource();
        node.buffer = buffer;
        node.loop = true;
        node.connect(gainNode);
        node.start(t);
        return node;
      } catch (e) {
        return null;
      }
    };

    this.raceIdleNode = createLoop(this.raceIdleNode, idleBuf, this.raceIdleGain);
    this.raceMidNode = createLoop(this.raceMidNode, midBuf, this.raceMidGain);
    this.raceScreamNode = createLoop(this.raceScreamNode, screamBuf, this.raceScreamGain);
    this.raceDecelNode = createLoop(this.raceDecelNode, decelBuf, this.raceDecelGain);

    this.activeSampleType = targetType;
  }

  /**
   * Stops real race audio loops with smooth exponential fade to prevent clicks
   */
  stopSampleLoops(fadeDuration = 0.2) {
    const t = this.ctx ? this.ctx.currentTime : 0;
    const fadeGain = (gainNode) => {
      if (gainNode && this.ctx) {
        gainNode.gain.cancelScheduledValues(t);
        gainNode.gain.setValueAtTime(Math.max(0.00001, gainNode.gain.value), t);
        gainNode.gain.exponentialRampToValueAtTime(0.00001, t + fadeDuration);
      }
    };

    fadeGain(this.raceIdleGain);
    fadeGain(this.raceMidGain);
    fadeGain(this.raceScreamGain);
    fadeGain(this.raceDecelGain);

    const idleNode = this.raceIdleNode;
    const midNode = this.raceMidNode;
    const screamNode = this.raceScreamNode;
    const decelNode = this.raceDecelNode;

    this.raceIdleNode = null;
    this.raceMidNode = null;
    this.raceScreamNode = null;
    this.raceDecelNode = null;
    this.activeSampleType = null;

    if (idleNode || midNode || screamNode || decelNode) {
      setTimeout(() => {
        try { if (idleNode) idleNode.stop(); } catch (e) {}
        try { if (midNode) midNode.stop(); } catch (e) {}
        try { if (screamNode) screamNode.stop(); } catch (e) {}
        try { if (decelNode) decelNode.stop(); } catch (e) {}
      }, fadeDuration * 1000 + 40);
    }
  }

  startEngine() {
    this.isEngineRunning = true;
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    if (this.engineMasterGain && this.ctx) {
      const t = this.ctx.currentTime;
      this.engineMasterGain.gain.cancelScheduledValues(t);
      this.engineMasterGain.gain.setValueAtTime(0.001, t);
      this.engineMasterGain.gain.linearRampToValueAtTime(0.38, t + 0.3);
    }
    if (this.raceMasterGain && this.ctx) {
      const t = this.ctx.currentTime;
      this.raceMasterGain.gain.cancelScheduledValues(t);
      this.raceMasterGain.gain.setValueAtTime(0.001, t);
      this.raceMasterGain.gain.linearRampToValueAtTime(1.15, t + 0.3);
    }
    this.startSampleLoops();
    this.playStarterCrank();
  }

  playStarterCrank() {
    if (!this.ctx || this.isMuted) return;
    try {
      const t = this.ctx.currentTime;
      // Starter motor whine: high-speed electric motor spinning up flywheel
      const starterOsc = this.ctx.createOscillator();
      const starterGain = this.ctx.createGain();
      starterOsc.type = 'sawtooth';
      starterOsc.frequency.setValueAtTime(120, t);
      starterOsc.frequency.exponentialRampToValueAtTime(320, t + 0.22);

      starterGain.gain.setValueAtTime(0.18, t);
      starterGain.gain.linearRampToValueAtTime(0.001, t + 0.3);

      starterOsc.connect(starterGain);
      starterGain.connect(this.masterGain);
      starterOsc.start(t);
      starterOsc.stop(t + 0.32);
    } catch (e) {}
  }

  /**
   * Comprehensive Multi-Dimensional Engine Acoustics Update
   * @param {number} rpm - Current engine RPM (800 - 9200)
   * @param {number} speedKmh - Current vehicle speed in km/h
   * @param {boolean|number} throttleInput - Throttle amount (0.0 - 1.0 or boolean)
   * @param {boolean} isAccelerating - Whether net longitudinal acceleration is positive
   * @param {Object} telemetry - Optional extended telemetry { soundType, hasTurbo, brake, dt, gear }
   */
  updateEngine(rpm, speedKmh, throttleInput, isAccelerating, telemetry = {}) {
    if (!this.initialized || this.isMuted || !this.ctx || !this.oscFund || !this.isEngineRunning) return;

    try {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }

      const t = this.ctx.currentTime;
      const throttle = typeof throttleInput === 'number' ? throttleInput : (throttleInput ? 1.0 : 0.0);
      const brake = telemetry.brake || 0.0;
      const dt = telemetry.dt || 0.016;

      // Update sound profile if provided
      if (telemetry.soundType && telemetry.soundType !== this.soundType) {
        this.setCarProfile(this.currentModelId, telemetry.soundType, telemetry.hasTurbo);
      }

      // Smooth RPM and Engine Load tracking
      this.smoothedRpm = this.smoothedRpm + (rpm - this.smoothedRpm) * Math.min(1.0, dt * 14);
      this.smoothedLoad = this.smoothedLoad + (throttle - this.smoothedLoad) * Math.min(1.0, dt * 12);

      const normRpm = Math.max(0.08, Math.min(1.0, this.smoothedRpm / 9000));
      const isV12 = this.soundType === 'v12';

      // -------------------------------------------------------------
      // 1. Real Internal Combustion Firing Order Order Tracking
      // V8 Flat-plane: 4 combustion strokes per crankshaft rotation
      // V12: 6 combustion strokes per crankshaft rotation
      // Fundamental firing frequency f0 = (RPM / 60) * (cylinders / 2)
      // -------------------------------------------------------------
      const firingFactor = isV12 ? 6.0 : 4.0;
      const fundamentalFreq = Math.max(24, (this.smoothedRpm / 60) * (firingFactor * 0.5));

      // Pitch updates with low-latency target ramping
      this.oscFund.frequency.setTargetAtTime(fundamentalFreq, t, 0.025);
      this.osc2nd.frequency.setTargetAtTime(fundamentalFreq * 2.0, t, 0.025);
      this.osc3rd.frequency.setTargetAtTime(fundamentalFreq * 3.0, t, 0.025);
      this.oscSub.frequency.setTargetAtTime(fundamentalFreq * 0.5, t, 0.025);
      if (this.intakeOsc) {
        this.intakeOsc.frequency.setTargetAtTime(fundamentalFreq * 1.5, t, 0.03);
      }

      // -------------------------------------------------------------
      // 2. Dynamic Intake Manifold Growl & Exhaust Pipe Formant Filter
      // Under high throttle load, intake plenum opens, generating guttural 180-380 Hz growl.
      // Exhaust formant opens up to 4,800 Hz at screaming high RPM.
      // -------------------------------------------------------------
      const baseExhaustCutoff = isV12 ? 480 : 380;
      const maxExhaustCutoff = isV12 ? 5800 : 4200;
      const exhaustFreq = baseExhaustCutoff + normRpm * (maxExhaustCutoff - baseExhaustCutoff) + (this.smoothedLoad * 900);
      this.exhaustFilter.frequency.setTargetAtTime(Math.min(18000, exhaustFreq), t, 0.035);

      if (this.intakeFilter && this.intakeGain) {
        const intakeCenterFreq = 160 + normRpm * 220;
        this.intakeFilter.frequency.setTargetAtTime(intakeCenterFreq, t, 0.04);
        // Zero synthetic oscillator gain to ensure 100% pure real race track acoustic timbre
        this.intakeGain.gain.setTargetAtTime(0.00001, t, 0.04);
      }

      // -------------------------------------------------------------
      // 3. Camshaft Idle Lope (8.5 Hz mechanical shake under 1250 RPM)
      // -------------------------------------------------------------
      const isIdling = speedKmh < 3 && throttle < 0.05 && this.smoothedRpm < 1350;
      if (this.idleLfoGain) {
        const lopeIntensity = isIdling ? 0.16 : 0.0;
        this.idleLfoGain.gain.setTargetAtTime(lopeIntensity, t, 0.1);
      }

      // -------------------------------------------------------------
      // 4. Deceleration Overrun: Exhaust Crackles, Pops & Backfire
      // Triggered when throttle drops abruptly from high load at RPM > 3800
      // -------------------------------------------------------------
      const throttleDelta = (throttle - this.prevThrottle) / Math.max(0.001, dt);
      const isSuddenLiftOff = (this.prevThrottle > 0.4 && throttle < 0.1) || throttleDelta < -4.0;

      if (isSuddenLiftOff && this.smoothedRpm > 3600 && (t - this.lastOverrunTime > 0.45)) {
        this.lastOverrunTime = t;
        this.triggerOverrunCrackles(this.smoothedRpm);

        // Blow-off valve on turbo engines
        if (this.hasTurbo && this.turboBoost > 0.35 && (t - this.lastBovTime > 0.6)) {
          this.lastBovTime = t;
          this.playBlowOffValve(this.turboBoost);
        }
      }
      this.prevThrottle = throttle;

      // -------------------------------------------------------------
      // 5. Turbocharger Compressor Spool Dynamics
      // -------------------------------------------------------------
      if (this.hasTurbo && this.turboOsc && this.turboGain) {
        const targetBoost = throttle * normRpm;
        this.turboBoost += (targetBoost - this.turboBoost) * Math.min(1.0, dt * 4.5);

        const spoolFreq = 1200 + this.turboBoost * 3200;
        this.turboOsc.frequency.setTargetAtTime(spoolFreq, t, 0.06);

        const spoolVol = Math.max(0.00001, this.turboBoost * 0.04);
        this.turboGain.gain.setTargetAtTime(spoolVol, t, 0.06);
      } else if (this.turboGain) {
        this.turboGain.gain.setTargetAtTime(0.00001, t, 0.05);
      }

      // -------------------------------------------------------------
      // 6. Straight-Cut Transmission Gear Whine
      // Dog-box straight-cut spur gears emit speed-proportional whine
      // -------------------------------------------------------------
      if (this.gearWhineOsc && this.gearWhineGain) {
        const gearFreq = 160 + Math.abs(speedKmh) * 14.5;
        this.gearWhineOsc.frequency.setTargetAtTime(gearFreq, t, 0.04);

        const gearVol = Math.min(0.06, Math.max(0.00001, (Math.abs(speedKmh) / 280) * 0.06));
        this.gearWhineGain.gain.setTargetAtTime(gearVol, t, 0.05);
      }

      // -------------------------------------------------------------
      // 7. Dynamic Engine Master Gain & Harmonic Balance
      // High volume on acceleration, visceral tone, controlled deceleration drone
      // -------------------------------------------------------------
      let baseEngineVol = 0.22 + normRpm * 0.32;
      if (throttle > 0.05) {
        baseEngineVol += 0.25 * this.smoothedLoad; // Full throttle roar
      } else {
        baseEngineVol *= 0.68; // Deceleration off-throttle engine braking drone
      }

      // -------------------------------------------------------------
      // 8. Pure Authentic Real Ferrari Race Track Audio Engine (4 Layers)
      // Genuine Monza Onboard Race Audio: Ferrari 488 GT3 Evo & Ferrari FXX-K EVO
      // Layers:
      //  - raceIdleNode: Real grid/pit idle mechanical rumble
      //  - raceMidNode: Real mid-RPM throttle roll-on powerband
      //  - raceScreamNode: Real screaming high-RPM full-throttle roaring howl
      //  - raceDecelNode: Real off-throttle engine braking & transmission overrun rumble
      // -------------------------------------------------------------
      const expectedType = isV12 ? 'v12' : 'v8';
      if (this.isEngineRunning && (!this.raceScreamNode || !this.raceIdleNode || !this.raceMidNode || !this.raceDecelNode || this.activeSampleType !== expectedType)) {
        this.startSampleLoops();
      }

      // Dynamic pitch modulation across RPM range
      const idleRate = Math.max(0.75, Math.min(1.45, 0.85 + (this.smoothedRpm / 1500) * 0.35));
      const midRate = Math.max(0.65, Math.min(1.55, 0.65 + (this.smoothedRpm / 4800) * 0.55));
      const screamRate = Math.max(0.60, Math.min(1.50, 0.60 + (this.smoothedRpm / 7000) * 0.65));
      const decelRate = Math.max(0.70, Math.min(1.45, 0.70 + (this.smoothedRpm / 4500) * 0.50));

      if (this.raceIdleNode) {
        this.raceIdleNode.playbackRate.setTargetAtTime(idleRate, t, 0.035);
      }
      if (this.raceMidNode) {
        this.raceMidNode.playbackRate.setTargetAtTime(midRate, t, 0.035);
      }
      if (this.raceScreamNode) {
        this.raceScreamNode.playbackRate.setTargetAtTime(screamRate, t, 0.035);
      }
      if (this.raceDecelNode) {
        this.raceDecelNode.playbackRate.setTargetAtTime(decelRate, t, 0.035);
      }

      // Multi-layer dynamic crossfading
      // (a) Idle: Dominant at standstill and low RPM
      let idleGain = 0.00001;
      if (isIdling) {
        idleGain = 0.82;
      } else if (this.smoothedRpm < 2200) {
        const idleFade = Math.max(0, (2200 - this.smoothedRpm) / 1200);
        idleGain = idleFade * (0.80 - this.smoothedLoad * 0.45);
      }

      // (b) Decel / Engine Braking (active when off throttle at high RPM/speed)
      let decelGain = 0.00001;
      if (throttle < 0.20 && this.smoothedRpm > 2200) {
        const decelFactor = Math.min(1.0, (this.smoothedRpm - 2000) / 3200);
        decelGain = decelFactor * Math.max(0, 0.72 - throttle * 2.5);
      }

      // (c) Mid-range powerband roll-on (1500 - 6800 RPM)
      let midGain = 0.00001;
      if (this.smoothedRpm > 1500 && this.smoothedRpm < 6800) {
        let midCurve = 0;
        if (this.smoothedRpm < 4200) {
          midCurve = (this.smoothedRpm - 1500) / 2700;
        } else {
          midCurve = (6800 - this.smoothedRpm) / 2600;
        }
        midGain = Math.max(0.00001, midCurve * (0.28 + this.smoothedLoad * 0.62));
      }

      // (d) Screaming top-end roar (Dominates 4200 to 9200 RPM)
      let screamGain = 0.00001;
      if (this.smoothedRpm > 4200) {
        const screamCurve = Math.min(1.25, (this.smoothedRpm - 4200) / 3600);
        screamGain = Math.max(0.00001, screamCurve * (0.35 + this.smoothedLoad * 0.65));
      }

      if (this.raceIdleGain) this.raceIdleGain.gain.setTargetAtTime(Math.max(0.00001, idleGain), t, 0.04);
      if (this.raceMidGain) this.raceMidGain.gain.setTargetAtTime(Math.max(0.00001, midGain), t, 0.04);
      if (this.raceScreamGain) this.raceScreamGain.gain.setTargetAtTime(Math.max(0.00001, screamGain), t, 0.04);
      if (this.raceDecelGain) this.raceDecelGain.gain.setTargetAtTime(Math.max(0.00001, decelGain), t, 0.04);

      this.engineMasterGain.gain.setTargetAtTime(baseEngineVol, t, 0.045);

    } catch (e) {
      // Audio parameter safety
    }
  }

  /**
   * Procedural Exhaust Overrun Pops & Crackles
   * Simulates unburnt high-octane racing fuel detonating in red-hot exhaust headers
   */
  triggerOverrunCrackles(rpm) {
    if (!this.ctx || this.isMuted) return;
    try {
      const popCount = Math.floor(Math.random() * 3) + 2; // 2 to 4 distinct explosive snaps
      const baseDelay = 0.06;

      for (let i = 0; i < popCount; i++) {
        const delay = baseDelay + i * (0.07 + Math.random() * 0.10);
        setTimeout(() => {
          if (!this.ctx || !this.isEngineRunning) return;
          this.playExhaustPopImpulse(rpm);
        }, delay * 1000);
      }
    } catch (e) {}
  }

  playExhaustPopImpulse(rpm) {
    if (!this.ctx || this.isMuted) return;
    try {
      const t = this.ctx.currentTime;

      // Authentic Ferrari recorded race shift/pop sample (Monza race paddock/pit exit)
      const isV12 = this.soundType === 'v12';
      const sampleKey = isV12 ? 'fxxk_shift' : 'gt3_shift';
      const sampleBuf = this.samples[sampleKey];
      if (sampleBuf) {
        try {
          const sampleSource = this.ctx.createBufferSource();
          sampleSource.buffer = sampleBuf;
          sampleSource.playbackRate.setValueAtTime(isV12 ? 0.95 + Math.random() * 0.12 : 0.92 + Math.random() * 0.15, t);

          const sampleGain = this.ctx.createGain();
          sampleGain.gain.setValueAtTime(isV12 ? 0.48 : 0.55, t);
          sampleGain.gain.exponentialRampToValueAtTime(0.001, t + (isV12 ? 0.40 : 0.32));

          sampleSource.connect(sampleGain);
          sampleGain.connect(this.masterGain);
          sampleSource.start(t);
        } catch (e) {}
      }

      // 1. Sub-Bass Header Detonation Thump (90 Hz -> 35 Hz fast sweep)
      const thumpOsc = this.ctx.createOscillator();
      const thumpGain = this.ctx.createGain();
      thumpOsc.type = 'sine';
      thumpOsc.frequency.setValueAtTime(110 + Math.random() * 30, t);
      thumpOsc.frequency.exponentialRampToValueAtTime(32, t + 0.08);

      thumpGain.gain.setValueAtTime(0.32, t);
      thumpGain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

      thumpOsc.connect(thumpGain);
      thumpGain.connect(this.masterGain);
      thumpOsc.start(t);
      thumpOsc.stop(t + 0.10);

      // 2. High-Frequency Tailpipe Crackle / Snap (Filtered noise burst)
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.07);
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let j = 0; j < bufferSize; j++) {
        data[j] = (Math.random() * 2 - 1) * Math.exp(-j / (bufferSize * 0.2));
      }

      const snapSource = this.ctx.createBufferSource();
      snapSource.buffer = noiseBuffer;

      const snapFilter = this.ctx.createBiquadFilter();
      snapFilter.type = 'bandpass';
      snapFilter.frequency.setValueAtTime(2200 + Math.random() * 1200, t);
      snapFilter.Q.setValueAtTime(3.8, t);

      const snapGain = this.ctx.createGain();
      snapGain.gain.setValueAtTime(0.35 + Math.random() * 0.15, t);
      snapGain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);

      snapSource.connect(snapFilter);
      snapFilter.connect(snapGain);
      snapGain.connect(this.masterGain);

      snapSource.start(t);
      snapSource.stop(t + 0.08);
    } catch (e) {}
  }

  /**
   * Pneumatic Turbo Blow-Off Valve (BOV) Flutter ("pssshh-tu-tu-tu!")
   * Occurs when high-pressure boost hits a snapped-shut throttle plate
   */
  playBlowOffValve(boostLevel = 0.8) {
    if (!this.ctx || this.isMuted) return;
    try {
      const t = this.ctx.currentTime;
      const duration = 0.45;
      const bufferSize = Math.floor(this.ctx.sampleRate * duration);
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);

      // Procedural flutter modulation envelope (15 Hz compressor surge)
      for (let i = 0; i < bufferSize; i++) {
        const timeSec = i / this.ctx.sampleRate;
        const decay = Math.exp(-timeSec * 6.5);
        const flutter = 0.6 + 0.4 * Math.sin(timeSec * 2 * Math.PI * 16.0);
        data[i] = (Math.random() * 2 - 1) * decay * flutter;
      }

      const bovSource = this.ctx.createBufferSource();
      bovSource.buffer = noiseBuffer;

      const bovFilter = this.ctx.createBiquadFilter();
      bovFilter.type = 'highpass';
      bovFilter.frequency.setValueAtTime(2200, t);
      bovFilter.frequency.linearRampToValueAtTime(1400, t + duration);

      const bovGain = this.ctx.createGain();
      const intensity = Math.min(0.28, Math.max(0.08, boostLevel * 0.28));
      bovGain.gain.setValueAtTime(intensity, t);
      bovGain.gain.exponentialRampToValueAtTime(0.001, t + duration);

      bovSource.connect(bovFilter);
      bovFilter.connect(bovGain);
      bovGain.connect(this.masterGain);

      bovSource.start(t);
      bovSource.stop(t + duration);
    } catch (e) {}
  }

  updateTireSkid(slipIntensity) {
    if (!this.initialized || this.isMuted || !this.skidGain || !this.ctx || !this.isEngineRunning) return;
    try {
      const t = this.ctx.currentTime;
      const vol = Math.min(0.42, Math.max(0.00001, (slipIntensity - 0.22) * 0.75));
      this.skidGain.gain.setTargetAtTime(vol, t, 0.03);

      const freq = 750 + slipIntensity * 650;
      this.skidFilter.frequency.setTargetAtTime(freq, t, 0.05);
    } catch (e) {}
  }

  /**
   * Stop Engine & Clean Acoustic Cutoff
   * Prevents any lingering background oscillator hums or pops
   */
  stopEngine(fadeDuration = 0.35) {
    this.isEngineRunning = false;
    this.turboBoost = 0;
    this.smoothedLoad = 0;
    if (!this.ctx) return;

    this.stopSampleLoops(fadeDuration);

    try {
      const t = this.ctx.currentTime;
      const fadeEnd = t + Math.max(0.05, fadeDuration);

      if (this.engineMasterGain) {
        this.engineMasterGain.gain.cancelScheduledValues(t);
        this.engineMasterGain.gain.setValueAtTime(this.engineMasterGain.gain.value, t);
        this.engineMasterGain.gain.exponentialRampToValueAtTime(0.00001, fadeEnd);
      }

      if (this.raceMasterGain) {
        this.raceMasterGain.gain.cancelScheduledValues(t);
        this.raceMasterGain.gain.setValueAtTime(Math.max(0.00001, this.raceMasterGain.gain.value), t);
        this.raceMasterGain.gain.exponentialRampToValueAtTime(0.00001, fadeEnd);
      }

      if (this.skidGain) {
        this.skidGain.gain.cancelScheduledValues(t);
        this.skidGain.gain.setValueAtTime(0.00001, t);
      }

      if (this.gearWhineGain) {
        this.gearWhineGain.gain.cancelScheduledValues(t);
        this.gearWhineGain.gain.setValueAtTime(0.00001, t);
      }

      if (this.turboGain) {
        this.turboGain.gain.cancelScheduledValues(t);
        this.turboGain.gain.setValueAtTime(0.00001, t);
      }

      if (this.intakeGain) {
        this.intakeGain.gain.cancelScheduledValues(t);
        this.intakeGain.gain.setValueAtTime(0.00001, t);
      }

      // Hard clamp to zero after fade duration to guarantee absolute silence
      setTimeout(() => {
        if (!this.isEngineRunning && this.engineMasterGain && this.ctx) {
          try {
            this.engineMasterGain.gain.value = 0.00001;
          } catch (e) {}
        }
      }, fadeDuration * 1000 + 50);
    } catch (e) {
      console.warn('[Audio] Error stopping engine:', e);
    }
  }

  stopAll() {
    this.stopEngine(0.1);
  }

  /**
   * Realistic Pneumatic Dog-Ring Gear Shift Thump & Ignition Cut
   */
  playGearShift() {
    if (!this.initialized || this.isMuted || !this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      const isV12 = this.soundType === 'v12';
      const shiftBuffer = isV12 ? this.samples['fxxk_shift'] : this.samples['gt3_shift'];
      if (shiftBuffer && this.smoothedRpm > 3000) {
        try {
          const src = this.ctx.createBufferSource();
          src.buffer = shiftBuffer;
          src.playbackRate.setValueAtTime(isV12 ? 1.02 : 0.98, t);
          const shiftGain = this.ctx.createGain();
          shiftGain.gain.setValueAtTime(0.52, t);
          src.connect(shiftGain);
          shiftGain.connect(this.masterGain);
          src.start(t);
        } catch (e) {}
      }

      // 1. Mechanical Dog-Ring Engagement Clunk
      const clunkOsc = this.ctx.createOscillator();
      const clunkGain = this.ctx.createGain();
      const clunkFilter = this.ctx.createBiquadFilter();

      clunkOsc.type = 'sawtooth';
      clunkOsc.frequency.setValueAtTime(140, t);
      clunkOsc.frequency.exponentialRampToValueAtTime(28, t + 0.10);

      clunkFilter.type = 'lowpass';
      clunkFilter.frequency.setValueAtTime(450, t);

      clunkGain.gain.setValueAtTime(0.38, t);
      clunkGain.gain.linearRampToValueAtTime(0.001, t + 0.12);

      clunkOsc.connect(clunkFilter);
      clunkFilter.connect(clunkGain);
      clunkGain.connect(this.masterGain);

      clunkOsc.start(t);
      clunkOsc.stop(t + 0.13);

      // 2. High-RPM Ignition Cut "Pop" on Upshift
      if (this.smoothedRpm > 5200) {
        this.playExhaustPopImpulse(this.smoothedRpm);
      }
    } catch (e) {}
  }

  playCollision(impactSpeed = 1.0) {
    if (!this.initialized || this.isMuted || !this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      const intensity = Math.min(1.0, Math.max(0.2, impactSpeed));

      // 1. Heavy Chassis Impact Thud
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(160, t);
      osc.frequency.linearRampToValueAtTime(24, t + 0.22);

      gain.gain.setValueAtTime(0.45 * intensity, t);
      gain.gain.linearRampToValueAtTime(0.001, t + 0.26);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t);
      osc.stop(t + 0.28);

      // 2. Carbon-Fiber / Barrier Scraping Crunch
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.18);
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.35));
      }

      const crunchSource = this.ctx.createBufferSource();
      crunchSource.buffer = noiseBuffer;

      const crunchFilter = this.ctx.createBiquadFilter();
      crunchFilter.type = 'bandpass';
      crunchFilter.frequency.setValueAtTime(1400, t);
      crunchFilter.Q.setValueAtTime(2.2, t);

      const crunchGain = this.ctx.createGain();
      crunchGain.gain.setValueAtTime(0.35 * intensity, t);
      crunchGain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

      crunchSource.connect(crunchFilter);
      crunchFilter.connect(crunchGain);
      crunchGain.connect(this.masterGain);

      crunchSource.start(t);
      crunchSource.stop(t + 0.19);
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
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0.0 : 0.85, this.ctx.currentTime);
    }
    return this.isMuted;
  }
}
