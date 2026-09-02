const AudioHelper = (() => {
  let enabled = true;
  let thaiVoice = null;
  let _ctx = null;

  // ใช้ AudioContext ร่วมกัน — สร้างครั้งเดียว ไม่ leak
  function sharedCtx() {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    if (!_ctx || _ctx.state === "closed") _ctx = new Ctx();
    if (_ctx.state === "suspended") _ctx.resume();
    return _ctx;
  }

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

  function playNotes(notes) {
    // notes: [{ f: frequency, t: timeOffset }]
    if (!enabled) return;
    const ctx = sharedCtx();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      notes.forEach(({ f, t, vol = 0.08 }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(f, now + t);
        gain.gain.setValueAtTime(vol, now + t);
        gain.gain.exponentialRampToValueAtTime(0.001, now + t + 0.24);
        osc.start(now + t);
        osc.stop(now + t + 0.25);
      });
    } catch (_) {}
  }

  // เสียง streak — โน้ตขึ้นตามจำนวน streak
  function streakSound(count) {
    const scale = [523, 587, 659, 784, 880, 1047]; // C5 D5 E5 G5 A5 C6
    const n = Math.min(count, scale.length);
    playNotes(scale.slice(0, n).map((f, i) => ({ f, t: i * 0.1 })));
  }

  // เสียงจบเกม 3 ดาว
  function fanfare() {
    playNotes([
      { f: 523, t: 0 }, { f: 659, t: 0.12 }, { f: 784, t: 0.24 },
      { f: 784, t: 0.36, vol: 0.06 }, { f: 1047, t: 0.5, vol: 0.1 }
    ]);
  }

  return {
    speak,
    correct() {
      playNotes([{ f: 523, t: 0 }, { f: 659, t: 0.1 }, { f: 784, t: 0.2 }]);
    },
    wrong() {
      playNotes([{ f: 260, t: 0 }, { f: 210, t: 0.14 }]);
    },
    streakSound,
    fanfare,
    setEnabled(value) {
      enabled = Boolean(value);
      if (!enabled && "speechSynthesis" in window) window.speechSynthesis.cancel();
    },
    isEnabled() { return enabled; }
  };
})();

