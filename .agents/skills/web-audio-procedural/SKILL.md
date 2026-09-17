---
name: web-audio-procedural
description: >-
  Synthesize game sound effects, vehicle engine RPM audio, aerodynamic wind noise,
  and comical/educational SFX using the Web Audio API without relying on external audio files.
  Use when adding game sounds, procedural audio synthesis, car engine audio, comical game reactions,
  or resolving browser autoplay and AudioContext unlock policies on iOS and Android.
---

# Procedural Web Audio API Sound Guide

This skill provides code patterns for generating real-time, procedural sound effects and audio synthesizers entirely via JavaScript and the Web Audio API.

---

## 1. Universal AudioContext Singleton & Gesture Unlocker

Modern browsers (especially iOS Safari and Chrome) mute `AudioContext` until the user interacts with the page. Always use this unlock pattern:

```javascript
let audioCtx = null;

export function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }

  // Resume context if suspended
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  return audioCtx;
}

// Attach one-time unlock listeners
function unlockAudio() {
  const ctx = getAudioContext();
  if (ctx && ctx.state === 'suspended') {
    ctx.resume();
  }
}
window.addEventListener('click', unlockAudio, { once: true });
window.addEventListener('touchstart', unlockAudio, { once: true });
```

---

## 2. Procedural Aerodynamic Wind Tunnel Noise

Generates realistic rushing air sound effects modulated by speed (km/h):

```javascript
export function createWindNoiseNode(ctx) {
  // Generate 2 seconds of white noise buffer
  const bufferSize = ctx.sampleRate * 2;
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }

  const whiteNoise = ctx.createBufferSource();
  whiteNoise.buffer = noiseBuffer;
  whiteNoise.loop = true;

  // Bandpass filter to shape air rush
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(320, ctx.currentTime);
  filter.Q.setValueAtTime(1.8, ctx.currentTime);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.001, ctx.currentTime);

  whiteNoise.connect(filter);
  filter.connect(gain);
  whiteNoise.start();

  return {
    node: gain,
    setAirspeed: (kmh) => {
      const now = ctx.currentTime;
      // Frequency rises with speed: 200 Hz to 1800 Hz
      const targetFreq = 200 + (kmh / 350) * 1600;
      const targetGain = Math.min(0.35, (kmh / 350) * 0.35);

      filter.frequency.linearRampToValueAtTime(targetFreq, now + 0.1);
      gain.gain.linearRampToValueAtTime(targetGain, now + 0.1);
    },
    stop: () => {
      whiteNoise.stop();
    }
  };
}
```

---

## 3. Comical & Educational Sound FX Presets

### A. Cartoon Slide Whistle & Boing
```javascript
export function playCartoonBoing(ctx) {
  if (!ctx) return;
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.connect(gain);
  gain.connect(ctx.destination);

  // Pitch envelope
  osc.frequency.setValueAtTime(180, now);
  osc.frequency.linearRampToValueAtTime(380, now + 0.1);
  osc.frequency.linearRampToValueAtTime(160, now + 0.22);
  osc.frequency.linearRampToValueAtTime(300, now + 0.32);
  osc.frequency.exponentialRampToValueAtTime(80, now + 0.52);

  // Gain envelope (prevent click)
  gain.gain.setValueAtTime(0.25, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.52);

  osc.start(now);
  osc.stop(now + 0.54);
}
```

### B. Sad Trombone (Fail SFX)
```javascript
export function playSadTrombone(ctx) {
  if (!ctx) return;
  const now = ctx.currentTime;
  // D3, C#3, C3, B2 (with final downward slide)
  const notes = [293.66, 277.18, 261.63, 246.94];

  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';

    // Soften harsh sawtooth edges with lowpass
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(900, now);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    const t = now + idx * 0.28;
    osc.frequency.setValueAtTime(freq, t);
    if (idx === 3) {
      // Final slide down
      osc.frequency.linearRampToValueAtTime(190, t + 0.7);
    }

    gain.gain.setValueAtTime(0.18, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + (idx === 3 ? 0.75 : 0.26));

    osc.start(t);
    osc.stop(t + (idx === 3 ? 0.78 : 0.27));
  });
}
```

---

## 4. Avoiding Audio Popping / Clicks

Always use `exponentialRampToValueAtTime` or `linearRampToValueAtTime` when adjusting volume or stopping notes. Setting `gain.value = 0` instantly cuts the waveform abruptly, creating an audible crackle.
