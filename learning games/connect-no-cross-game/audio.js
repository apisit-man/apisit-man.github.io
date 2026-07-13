let soundOn = true;
let audioCtx = null;

export function isSoundOn() {
  return soundOn;
}

export function toggleSound() {
  soundOn = !soundOn;
  if (soundOn) playTone(620, .08, "sine", .03);
  return soundOn;
}

function ensureAudio() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === "suspended") audioCtx.resume();
}

export function playTone(freq, duration, type = "sine", volume = .04, delay = 0) {
  if (!soundOn) return;
  try {
    ensureAudio();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, audioCtx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(volume, audioCtx.currentTime + delay + .01);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + delay + duration);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start(audioCtx.currentTime + delay);
    osc.stop(audioCtx.currentTime + delay + duration + .03);
  } catch (e) {
    console.error("Audio error", e);
  }
}

export function playSuccess() {
  playTone(520, .09, "sine", .04);
  playTone(720, .11, "sine", .035, .07);
}

export function playError() {
  playTone(180, .12, "sawtooth", .025);
}

export function playLevelComplete(finalLevel) {
  const notes = finalLevel ? [523, 659, 784, 1047] : [523, 659, 784];
  notes.forEach((n, i) => playTone(n, .18, "triangle", .045, i * .12));
}

export function playStartDrawing() {
  playTone(420, .05, "sine", .035);
}

export function playUndo() {
  playTone(300, .06, "triangle", .03);
}

export function playHint() {
  playTone(650, .08, "sine", .03);
}
