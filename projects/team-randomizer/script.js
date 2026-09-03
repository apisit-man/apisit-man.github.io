(() => {
  "use strict";

  const STORAGE_KEY = "team-spotlight-state-v1";
  const SAMPLE_TEAMS = ["ทีมดาวเหนือ", "ทีมพลังสร้างสรรค์", "ทีมอนาคตไกล", "ทีมก้าวใหม่", "ทีมสายรุ้ง", "ทีมผู้พิชิต"];

  const elements = {
    setupView: document.getElementById("setupView"),
    stageView: document.getElementById("stageView"),
    teamInput: document.getElementById("teamInput"),
    teamCount: document.getElementById("teamCount"),
    inputMessage: document.getElementById("inputMessage"),
    sampleButton: document.getElementById("sampleButton"),
    numbers20Button: document.getElementById("numbers20Button"),
    numbers30Button: document.getElementById("numbers30Button"),
    clearButton: document.getElementById("clearButton"),
    startButton: document.getElementById("startButton"),
    themeButton: document.getElementById("themeButton"),
    themeIcon: document.getElementById("themeIcon"),
    themeLabel: document.getElementById("themeLabel"),
    speedButton: document.getElementById("speedButton"),
    speedIcon: document.getElementById("speedIcon"),
    speedLabel: document.getElementById("speedLabel"),
    soundButton: document.getElementById("soundButton"),
    soundIcon: document.getElementById("soundIcon"),
    fullscreenButton: document.getElementById("fullscreenButton"),
    remainingCount: document.getElementById("remainingCount"),
    presentedCount: document.getElementById("presentedCount"),
    remainingBadge: document.getElementById("remainingBadge"),
    historyBadge: document.getElementById("historyBadge"),
    remainingList: document.getElementById("remainingList"),
    historyList: document.getElementById("historyList"),
    emptyHistory: document.getElementById("emptyHistory"),
    resultCard: document.getElementById("resultCard"),
    resultKicker: document.getElementById("resultKicker"),
    resultName: document.getElementById("resultName"),
    resultHint: document.getElementById("resultHint"),
    spinButton: document.getElementById("spinButton"),
    spinButtonText: document.getElementById("spinButtonText"),
    editButton: document.getElementById("editButton"),
    undoButton: document.getElementById("undoButton"),
    restartButton: document.getElementById("restartButton"),
    copyHistoryBtn: document.getElementById("copyHistoryBtn"),
    copyOrderButton: document.getElementById("copyOrderButton"),
    confetti: document.getElementById("confetti"),
    toast: document.getElementById("toast")
  };

  let state = {
    teams: [],
    remaining: [],
    history: [],
    sound: true,
    speed: "normal",
    theme: "dark"
  };
  let isSpinning = false;
  let audioContext = null;
  let toastTimer = null;

  function parseTeams(value) {
    const seen = new Set();
    const unique = [];
    let duplicates = 0;
    value.split(/\r?\n/).map(name => name.trim()).filter(Boolean).forEach(name => {
      const key = name.toLocaleLowerCase("th");
      if (seen.has(key)) duplicates += 1;
      else { seen.add(key); unique.push(name); }
    });
    return { teams: unique, duplicates };
  }

  function updateInputStatus() {
    const parsed = parseTeams(elements.teamInput.value);
    elements.teamCount.textContent = `${parsed.teams.length} ทีม`;
    elements.inputMessage.parentElement.classList.toggle("has-error", parsed.duplicates > 0);
    elements.inputMessage.textContent = parsed.duplicates
      ? `พบชื่อซ้ำ ${parsed.duplicates} รายการ — ระบบจะใช้เพียงชื่อเดียว`
      : parsed.teams.length ? `พร้อมสุ่ม ${parsed.teams.length} ทีม` : "พิมพ์หรือวางรายชื่อ หนึ่งทีมต่อหนึ่งบรรทัด";
  }

  function saveState() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (_) { /* storage is optional */ }
  }

  function applyTheme(theme) {
    state.theme = theme === "light" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", state.theme);
    if (elements.themeIcon) elements.themeIcon.textContent = state.theme === "light" ? "🌙" : "💡";
    if (elements.themeLabel) elements.themeLabel.textContent = state.theme === "light" ? "โหมดมืด" : "โปรเจกเตอร์";
    saveState();
  }

  function toggleTheme() {
    const nextTheme = state.theme === "light" ? "dark" : "light";
    applyTheme(nextTheme);
    showToast(nextTheme === "light" ? "เปิดโหมดโปรเจกเตอร์ (สว่าง)" : "เปิดโหมดมืด (Spotlight)");
  }

  function updateSpeedButton() {
    const isFast = state.speed === "fast";
    if (elements.speedIcon) elements.speedIcon.textContent = isFast ? "🚀" : "⚡";
    if (elements.speedLabel) elements.speedLabel.textContent = isFast ? "ด่วน" : "ปกติ";
  }

  function toggleSpeed() {
    state.speed = state.speed === "fast" ? "normal" : "fast";
    updateSpeedButton();
    saveState();
    showToast(state.speed === "fast" ? "ความเร็วการสุ่ม: โหมดด่วน (1 วินาที) 🚀" : "ความเร็วการสุ่ม: โหมดปกติ (3 วินาที) ⚡");
  }

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (saved && Array.isArray(saved.teams)) {
        state = {
          teams: saved.teams.filter(name => typeof name === "string"),
          remaining: Array.isArray(saved.remaining) ? saved.remaining : [],
          history: Array.isArray(saved.history) ? saved.history : [],
          sound: saved.sound !== false,
          speed: saved.speed === "fast" ? "fast" : "normal",
          theme: saved.theme || (localStorage.getItem("theme") === "dark" ? "dark" : (localStorage.getItem("theme") === "light" ? "light" : "dark"))
        };
      }
    } catch (_) { /* start fresh */ }

    applyTheme(state.theme);
    updateSpeedButton();
    elements.teamInput.value = state.teams.join("\n");
    updateSoundButton();
    updateInputStatus();
  }

  function showView(name) {
    const showStage = name === "stage";
    elements.setupView.classList.toggle("is-active", !showStage);
    elements.stageView.classList.toggle("is-active", showStage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function startStage() {
    const parsed = parseTeams(elements.teamInput.value);
    if (!parsed.teams.length) {
      elements.teamInput.focus();
      showToast("กรุณาใส่ชื่อทีมอย่างน้อย 1 ทีม");
      return;
    }
    state.teams = parsed.teams;
    state.remaining = [...parsed.teams];
    state.history = [];
    saveState();
    resetResult();
    renderState();
    showView("stage");
  }

  function renderState() {
    const remaining = state.remaining.length;
    const presented = state.history.length;
    const hasHistory = presented > 0;

    elements.remainingCount.textContent = remaining;
    elements.presentedCount.textContent = presented;
    elements.remainingBadge.textContent = remaining;
    elements.historyBadge.textContent = presented;

    elements.remainingList.innerHTML = state.remaining.map((name, index) =>
      `<div class="team-chip" style="animation-delay:${Math.min(index * 25, 250)}ms"><i></i><span>${escapeHtml(name)}</span></div>`
    ).join("");

    elements.historyList.innerHTML = state.history.map(name =>
      `<li class="history-item"><span>${escapeHtml(name)}</span></li>`
    ).join("");

    elements.emptyHistory.hidden = hasHistory;
    elements.undoButton.disabled = !hasHistory || isSpinning;
    elements.spinButton.disabled = remaining === 0 || isSpinning;
    elements.spinButtonText.textContent = remaining === 0 ? "สุ่มครบทุกทีมแล้ว" : presented === 0 ? "สุ่มทีมแรก" : "สุ่มทีมถัดไป";

    if (elements.copyHistoryBtn) elements.copyHistoryBtn.disabled = !hasHistory || isSpinning;
    if (elements.copyOrderButton) elements.copyOrderButton.disabled = !hasHistory || isSpinning;
  }

  function secureRandomIndex(max) {
    if (window.crypto?.getRandomValues) {
      const range = 0x100000000;
      const limit = range - (range % max);
      const buffer = new Uint32Array(1);
      do { window.crypto.getRandomValues(buffer); } while (buffer[0] >= limit);
      return buffer[0] % max;
    }
    return Math.floor(Math.random() * max);
  }

  function randomPreview() {
    return state.remaining[secureRandomIndex(state.remaining.length)];
  }

  async function spin() {
    if (isSpinning || state.remaining.length === 0) return;
    isSpinning = true;
    ensureAudio();
    elements.spinButton.classList.add("is-spinning");
    elements.resultCard.classList.remove("is-winner");
    elements.resultCard.classList.add("is-spinning");
    elements.resultKicker.textContent = "SELECTING THE NEXT TEAM";
    elements.resultHint.textContent = "กำลังค้นหาทีมที่จะเปล่งประกาย...";
    renderState();

    const winnerIndex = secureRandomIndex(state.remaining.length);
    const winner = state.remaining[winnerIndex];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isFast = state.speed === "fast";
    const duration = reducedMotion ? 400 : (isFast ? 1000 : 3000);
    const startedAt = performance.now();

    await new Promise(resolve => {
      function cycle() {
        const progress = Math.min((performance.now() - startedAt) / duration, 1);
        elements.resultName.textContent = randomPreview();
        playTick(0.09 + progress * 0.08);
        if (progress >= 1) { resolve(); return; }
        const delay = reducedMotion ? 120 : (isFast ? 35 + Math.pow(progress, 2.5) * 160 : 45 + Math.pow(progress, 3.4) * 350);
        window.setTimeout(cycle, delay);
      }
      cycle();
    });

    state.remaining.splice(winnerIndex, 1);
    state.history.push(winner);
    isSpinning = false;
    elements.spinButton.classList.remove("is-spinning");
    elements.resultName.textContent = winner;
    elements.resultKicker.textContent = state.remaining.length ? "THE SPOTLIGHT IS YOURS" : "FINAL TEAM · THE STAGE IS YOURS";
    elements.resultHint.textContent = state.remaining.length ? "เตรียมตัวนำเสนอผลงานได้เลย!" : "ครบทุกทีมแล้ว — ยอดเยี่ยมมาก!";
    elements.resultCard.classList.remove("is-spinning");
    void elements.resultCard.offsetWidth;
    elements.resultCard.classList.add("is-winner");
    playReveal(state.remaining.length === 0);
    burstConfetti(state.remaining.length === 0 ? 120 : 70);
    saveState();
    renderState();
  }

  function resetResult() {
    elements.resultCard.classList.remove("is-spinning", "is-winner");
    elements.resultKicker.textContent = "READY TO SHINE";
    elements.resultName.textContent = "กดปุ่มเพื่อเริ่มสุ่ม";
    elements.resultHint.textContent = "ทุกทีมมีโอกาสได้รับเลือกเท่ากัน";
  }

  function restart() {
    if (isSpinning) return;
    state.remaining = [...state.teams];
    state.history = [];
    resetResult();
    saveState();
    renderState();
    showToast("เริ่มรอบใหม่แล้ว");
  }

  function undo() {
    if (isSpinning || !state.history.length) return;
    const restored = state.history.pop();
    state.remaining.push(restored);
    resetResult();
    elements.resultHint.textContent = `นำ “${restored}” กลับเข้าสู่การสุ่มแล้ว`;
    saveState();
    renderState();
    showToast("ย้อนผลล่าสุดเรียบร้อย");
  }

  function editTeams() {
    if (isSpinning) return;
    elements.teamInput.value = state.teams.join("\n");
    updateInputStatus();
    showView("setup");
  }

  function copyHistory() {
    if (!state.history.length) {
      showToast("ยังไม่มีลำดับการนำเสนอ");
      return;
    }
    const lines = [
      "📋 ลำดับการนำเสนอ (Team Spotlight)",
      `จำนวนทั้งหมด: ${state.history.length} ทีม`,
      "------------------------",
      ...state.history.map((name, idx) => `${idx + 1}. ${name}`),
      "------------------------",
      "สร้างโดย Team Spotlight | apisit-man.github.io"
    ];
    const text = lines.join("\n");
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text)
        .then(() => showToast("คัดลอกลำดับการนำเสนอเรียบร้อยแล้ว 📋"))
        .catch(() => fallbackCopy(text));
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      showToast("คัดลอกลำดับการนำเสนอเรียบร้อยแล้ว 📋");
    } catch (_) {
      showToast("ไม่สามารถคัดลอกข้อความได้");
    }
    document.body.removeChild(ta);
  }

  function setSampleTeams() {
    elements.teamInput.value = SAMPLE_TEAMS.join("\n");
    updateInputStatus();
    elements.teamInput.focus();
    showToast("ใส่รายชื่อทีมตัวอย่างแล้ว");
  }

  function setNumbers(count) {
    const items = Array.from({ length: count }, (_, i) => `เลขที่ ${String(i + 1).padStart(2, "0")}`);
    elements.teamInput.value = items.join("\n");
    updateInputStatus();
    elements.teamInput.focus();
    showToast(`สร้างรายชื่อเลขที่ 1 ถึง ${count} แล้ว`);
  }

  function clearTeams() {
    if (!elements.teamInput.value.trim() || confirm("ต้องการล้างรายชื่อทั้งหมดใช่หรือไม่?")) {
      elements.teamInput.value = "";
      updateInputStatus();
      elements.teamInput.focus();
      showToast("ล้างรายชื่อแล้ว");
    }
  }

  function ensureAudio() {
    if (!state.sound) return null;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    if (!audioContext) audioContext = new AudioCtx();
    if (audioContext.state === "suspended") audioContext.resume();
    return audioContext;
  }

  function tone(frequency, start, duration, type = "sine", volume = 0.06) {
    const ctx = ensureAudio();
    if (!ctx) return;
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime + start);
    gain.gain.setValueAtTime(0.0001, ctx.currentTime + start);
    gain.gain.exponentialRampToValueAtTime(volume, ctx.currentTime + start + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + duration);
    oscillator.connect(gain).connect(ctx.destination);
    oscillator.start(ctx.currentTime + start);
    oscillator.stop(ctx.currentTime + start + duration + 0.02);
  }

  function playTick(pitch) { tone(620 + pitch * 900, 0, 0.035, "square", 0.018); }
  function playReveal(isFinal) {
    [523, 659, 784, 1047].forEach((note, index) => tone(note, index * 0.08, 0.42, index % 2 ? "triangle" : "sine", 0.065));
    if (isFinal) [1319, 1568].forEach((note, index) => tone(note, 0.38 + index * 0.1, 0.55, "sine", 0.045));
  }

  function toggleSound() {
    state.sound = !state.sound;
    updateSoundButton();
    saveState();
    if (state.sound) { ensureAudio(); tone(660, 0, 0.12, "sine", 0.035); }
  }

  function updateSoundButton() {
    elements.soundButton.setAttribute("aria-pressed", String(state.sound));
    elements.soundIcon.textContent = state.sound ? "🔊" : "🔇";
  }

  function burstConfetti(amount) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const colors = ["#ffd166", "#54e9ff", "#bc8cff", "#ff5fa2", "#ffffff"];
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < amount; i += 1) {
      const piece = document.createElement("i");
      piece.className = "confetti-piece";
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.width = `${5 + Math.random() * 7}px`;
      piece.style.height = `${8 + Math.random() * 13}px`;
      piece.style.background = colors[i % colors.length];
      piece.style.setProperty("--duration", `${2.3 + Math.random() * 2}s`);
      piece.style.setProperty("--drift", `${-100 + Math.random() * 200}px`);
      piece.style.setProperty("--turn", `${360 + Math.random() * 900}deg`);
      piece.style.animationDelay = `${Math.random() * 0.3}s`;
      fragment.appendChild(piece);
    }
    elements.confetti.appendChild(fragment);
    window.setTimeout(() => { elements.confetti.innerHTML = ""; }, 4800);
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      if (document.documentElement.requestFullscreen) {
        const request = document.documentElement.requestFullscreen();
        if (request?.catch) request.catch(() => showToast("ไม่สามารถเปิดโหมดเต็มจอได้บนอุปกรณ์นี้"));
      }
      else showToast("อุปกรณ์นี้ไม่รองรับโหมดเต็มจอจากเบราว์เซอร์");
    } else if (document.exitFullscreen) document.exitFullscreen();
  }

  function showToast(message) {
    elements.toast.textContent = message;
    elements.toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => elements.toast.classList.remove("is-visible"), 2200);
  }

  function escapeHtml(value) {
    return value.replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
  }

  elements.teamInput.addEventListener("input", updateInputStatus);
  if (elements.sampleButton) elements.sampleButton.addEventListener("click", setSampleTeams);
  if (elements.numbers20Button) elements.numbers20Button.addEventListener("click", () => setNumbers(20));
  if (elements.numbers30Button) elements.numbers30Button.addEventListener("click", () => setNumbers(30));
  if (elements.clearButton) elements.clearButton.addEventListener("click", clearTeams);
  elements.startButton.addEventListener("click", startStage);
  elements.spinButton.addEventListener("click", spin);
  elements.undoButton.addEventListener("click", undo);
  elements.restartButton.addEventListener("click", restart);
  elements.editButton.addEventListener("click", editTeams);
  elements.soundButton.addEventListener("click", toggleSound);
  elements.fullscreenButton.addEventListener("click", toggleFullscreen);
  if (elements.themeButton) elements.themeButton.addEventListener("click", toggleTheme);
  if (elements.speedButton) elements.speedButton.addEventListener("click", toggleSpeed);
  if (elements.copyHistoryBtn) elements.copyHistoryBtn.addEventListener("click", copyHistory);
  if (elements.copyOrderButton) elements.copyOrderButton.addEventListener("click", copyHistory);

  document.addEventListener("keydown", event => {
    const target = event.target;
    const isTyping = target instanceof HTMLTextAreaElement || target instanceof HTMLInputElement || target instanceof HTMLButtonElement;
    if (!isTyping && elements.stageView.classList.contains("is-active") && (event.code === "Space" || event.code === "Enter")) {
      event.preventDefault();
      spin();
    }
  });

  loadState();
})();
