// Web Audio API Procedural Synthesizer for Arduino Lab
// Safe, leak-free voice management with clean attack/decay envelopes.

let audioCtx: AudioContext | null = null;
let currentOsc: OscillatorNode | null = null;
let currentGain: GainNode | null = null;
let currentHz = 0;
let toneTimeoutId: any = null;
let isMuted = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function setMuted(muted: boolean): void {
  isMuted = muted;
  if (isMuted) stopTone();
}

export function isAudioMuted(): boolean {
  return isMuted;
}

export function playTone(hz: number, durationMs?: number): void {
  if (isMuted || hz <= 0 || !Number.isFinite(hz)) {
    stopTone();
    return;
  }
  const ctx = getAudioContext();
  if (!ctx) return;

  // If already playing the exact same frequency, keep the voice playing
  if (currentOsc && currentGain && Math.abs(currentHz - hz) < 0.5) {
    return;
  }

  // If already playing a tone but frequency changed (e.g. sliding piano key), modulate pitch smoothly
  if (currentOsc && currentGain && currentHz > 0) {
    try {
      currentOsc.frequency.setValueAtTime(hz, ctx.currentTime);
      currentHz = hz;
      return;
    } catch {}
  }

  // Otherwise stop previous voice cleanly
  stopTone();

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle'; // Smooth, piezo-like timbre without harsh harmonics
    osc.frequency.setValueAtTime(hz, now);

    // Click-free exponential envelope
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.2, now + 0.02);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);

    currentOsc = osc;
    currentGain = gain;
    currentHz = hz;

    if (durationMs && durationMs > 0) {
      const stopAt = now + durationMs / 1000;
      gain.gain.setValueAtTime(0.2, stopAt);
      gain.gain.exponentialRampToValueAtTime(0.0001, stopAt + 0.03);

      toneTimeoutId = setTimeout(() => {
        if (currentOsc === osc) {
          stopTone();
        }
      }, durationMs + 40);
    }
  } catch (err) {
    console.warn('Audio playback error:', err);
    currentOsc = null;
    currentGain = null;
    currentHz = 0;
  }
}

export function stopTone(): void {
  if (toneTimeoutId) {
    clearTimeout(toneTimeoutId);
    toneTimeoutId = null;
  }

  if (currentGain && audioCtx) {
    const gain = currentGain;
    const osc = currentOsc;
    currentGain = null;
    currentOsc = null;
    currentHz = 0;

    try {
      const now = audioCtx.currentTime;
      gain.gain.setValueAtTime(gain.gain.value, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);
      setTimeout(() => {
        try {
          if (osc) {
            osc.stop();
            osc.disconnect();
          }
          gain.disconnect();
        } catch {}
      }, 30);
    } catch {
      try {
        if (osc) osc.disconnect();
        gain.disconnect();
      } catch {}
    }
  } else {
    currentOsc = null;
    currentGain = null;
    currentHz = 0;
  }
}

// Global browser listeners for lifecycle safety
if (typeof window !== 'undefined') {
  window.addEventListener('blur', () => stopTone());
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopTone();
  });
}
