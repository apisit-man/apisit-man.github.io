const AudioHelper = (() => {
  let enabled = true;
  let thaiVoice = null;

  function loadVoices() {
    const voices = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
    thaiVoice = voices.find(v => v.lang && v.lang.toLowerCase().startsWith("th")) || null;
  }

  if ("speechSynthesis" in window) {
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }

  function speak(text, rate = 0.88) {
    if (!enabled || !text || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "th-TH";
    utter.rate = rate;
    utter.pitch = 1.08;
    if (thaiVoice) utter.voice = thaiVoice;
    window.speechSynthesis.speak(utter);
  }

  function tone(type) {
    if (!enabled) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      const now = ctx.currentTime;
      if (type === "correct") {
        osc.frequency.setValueAtTime(523, now);
        osc.frequency.setValueAtTime(659, now + .1);
        osc.frequency.setValueAtTime(784, now + .2);
      } else {
        osc.frequency.setValueAtTime(260, now);
        osc.frequency.setValueAtTime(210, now + .14);
      }
      gain.gain.setValueAtTime(.08, now);
      gain.gain.exponentialRampToValueAtTime(.001, now + .34);
      osc.start(now); osc.stop(now + .35);
    } catch (_) {}
  }

  return {
    speak,
    correct() { tone("correct"); },
    wrong() { tone("wrong"); },
    setEnabled(value) {
      enabled = Boolean(value);
      if (!enabled && "speechSynthesis" in window) window.speechSynthesis.cancel();
    },
    isEnabled() { return enabled; }
  };
})();
