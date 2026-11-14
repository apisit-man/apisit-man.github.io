// Procedural Web Audio Sound Engine for Interactive Quiz
// Zero external audio assets, works offline, 100% synthesized via Web Audio API
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.QuizSound = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  let audioCtx = null;
  let isMuted = false;

  // Restore mute preference from localStorage
  try {
    const saved = localStorage.getItem('quiz_sound_muted');
    if (saved !== null) {
      isMuted = saved === 'true';
    }
  } catch (e) {}

  function getContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
    return audioCtx;
  }

  // Automatic user gesture unlock listener
  function unlockAudio() {
    const ctx = getContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
  }

  if (typeof window !== 'undefined') {
    ['click', 'touchstart', 'keydown'].forEach(evt => {
      window.addEventListener(evt, unlockAudio, { passive: true, once: false });
    });
  }

  function setMuted(muted) {
    isMuted = !!muted;
    try {
      localStorage.setItem('quiz_sound_muted', isMuted ? 'true' : 'false');
    } catch (e) {}
    return isMuted;
  }

  function toggleMute() {
    return setMuted(!isMuted);
  }

  function getMuted() {
    return isMuted;
  }

  // Sound 1: Question Released / New Question Starts (Dynamic Fanfare Chime)
  // Upbeat ascending 3-note arpeggio (C5 -> E5 -> G5 + shimmer)
  function playQuestionStart() {
    if (isMuted) return;
    const ctx = getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const notes = [
        { f: 523.25, t: 0.00, d: 0.22, type: 'triangle' }, // C5
        { f: 659.25, t: 0.12, d: 0.24, type: 'triangle' }, // E5
        { f: 783.99, t: 0.24, d: 0.45, type: 'sine' },     // G5
        { f: 1046.50, t: 0.30, d: 0.50, type: 'sine' }    // C6 shimmer
      ];

      notes.forEach(n => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = n.type;
        osc.frequency.setValueAtTime(n.f, now + n.t);

        gain.gain.setValueAtTime(0.001, now + n.t);
        gain.gain.linearRampToValueAtTime(0.20, now + n.t + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + n.t + n.d);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + n.t);
        osc.stop(now + n.t + n.d);
      });
    } catch (e) {
      console.warn('Sound play error:', e);
    }
  }

  // Sound 2: Countdown Tick (Warning pulse for last 5 seconds)
  function playTick(isUrgent = false) {
    if (isMuted) return;
    const ctx = getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = isUrgent ? 'sawtooth' : 'sine';
      osc.frequency.setValueAtTime(isUrgent ? 880 : 660, now);
      if (isUrgent) {
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.08);
      }

      gain.gain.setValueAtTime(isUrgent ? 0.15 : 0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch (e) {}
  }

  // Sound 3: Answer Confirmed / Click Feedback (Soft crisp tap)
  function playSelect() {
    if (isMuted) return;
    const ctx = getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.06);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.07);
    } catch (e) {}
  }

  // Sound 4: Question Review / Answer Revealed (Celebration or Gong)
  function playReviewReveal() {
    if (isMuted) return;
    const ctx = getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // Majestic chord: F4 -> A4 -> C5
      const freqs = [349.23, 440.0, 523.25, 698.46];
      freqs.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + i * 0.05);

        gain.gain.setValueAtTime(0.001, now + i * 0.05);
        gain.gain.linearRampToValueAtTime(0.15, now + i * 0.05 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.05);
        osc.stop(now + 0.65);
      });
    } catch (e) {}
  }

  // Sound 5: Quiz Finish / Grand Champion Fanfare
  // Majestic brass/synth victory fanfare with trumpeting chords and celebration fireworks
  function playFinishGrandFanfare() {
    if (isMuted) return;
    const ctx = getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      // Part A: Triumphant Fanfare Arpeggio
      // C5 -> G5 -> C6 -> E6 -> G6 with harmonic brass depth
      const fanfare = [
        { f: 523.25, t: 0.00, d: 0.18, vol: 0.22 }, // C5
        { f: 659.25, t: 0.15, d: 0.18, vol: 0.22 }, // E5
        { f: 783.99, t: 0.30, d: 0.22, vol: 0.24 }, // G5
        { f: 1046.50, t: 0.48, d: 0.65, vol: 0.28 }, // C6 (long)
        
        // Final flourishing triad
        { f: 783.99, t: 1.10, d: 0.20, vol: 0.20 },
        { f: 1046.50, t: 1.25, d: 0.20, vol: 0.24 },
        { f: 1318.51, t: 1.45, d: 1.10, vol: 0.30 }  // High E6 sustained
      ];

      fanfare.forEach(item => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(item.f, now + item.t);

        gain.gain.setValueAtTime(0.001, now + item.t);
        gain.gain.linearRampToValueAtTime(item.vol, now + item.t + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + item.t + item.d);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + item.t);
        osc.stop(now + item.t + item.d);
      });

      // Part B: Deep rich bass root for grand celebration
      const bass = ctx.createOscillator();
      const bassGain = ctx.createGain();
      bass.type = 'sine';
      bass.frequency.setValueAtTime(130.81, now + 1.45); // C3 deep root
      bassGain.gain.setValueAtTime(0.25, now + 1.45);
      bassGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

      bass.connect(bassGain);
      bassGain.connect(ctx.destination);
      bass.start(now + 1.45);
      bass.stop(now + 2.6);
    } catch (e) {
      console.warn('Grand fanfare sound error:', e);
    }
  }

  return {
    getContext,
    unlockAudio,
    setMuted,
    toggleMute,
    getMuted,
    playQuestionStart,
    playTick,
    playSelect,
    playReviewReveal,
    playFinishGrandFanfare
  };
});
