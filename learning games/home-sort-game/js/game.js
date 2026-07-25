(() => {
  const $ = (id) => document.getElementById(id);
  const startScreen = $("startScreen");
  const gameScreen = $("gameScreen");
  const endScreen = $("endScreen");
  const card = $("fallingCard");
  const lane = $("gameLane");
  const feedback = $("feedbackBubble");
  const hintText = $("hintText");
  const categoryButtons = $("categoryButtons");
  const pauseOverlay = $("pauseOverlay");

  const state = {
    mode: "child",
    level: 3,
    rounds: 10,
    speed: "normal",
    activeCategories: [],
    queue: [],
    index: 0,
    score: 0,
    correct: 0,
    attempts: 0,
    current: null,
    paused: false,
    accepting: false,
    timer: null,
    remainingMs: 0,
    startedAt: 0,
    review: []
  };

  const speedMs = { slow: 15000, normal: 12000, fast: 9000 };

  function spawnConfetti() {
    const emojis = ["⭐", "🌟", "✨", "🎉", "🎊"];
    for (let i = 0; i < 8; i++) {
      const el = document.createElement("div");
      el.className = "confetti";
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      el.style.left = (40 + Math.random() * 20) + "%";
      el.style.top = "40%";
      el.style.setProperty('--tx', `${(Math.random() - 0.5) * 300}px`);
      el.style.setProperty('--ty', `${(Math.random() - 0.5) * 300}px`);
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 800);
    }
  }

  function resetToStartScreen() {
    clearTimeout(state.timer);
    state.paused = false;
    state.accepting = false;
    pauseOverlay.hidden = true;
    $("pauseBtn").disabled = true;
    showScreen(startScreen);
  }

  function showScreen(screen) {
    [startScreen, gameScreen, endScreen].forEach(s => s.classList.remove("active"));
    screen.classList.add("active");
  }

  function shuffle(items) {
    const a = [...items];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function buildQueue() {
    const filtered = GAME_ITEMS.filter(item => state.activeCategories.includes(item.category));
    const result = [];
    while (result.length < state.rounds) {
      for (const item of shuffle(filtered)) {
        if (result.length >= state.rounds) break;
        if (result.length && result[result.length - 1].id === item.id) continue;
        result.push(item);
      }
    }
    return result;
  }

  function setCategories() {
    const all = ["bedroom", "kitchen", "bathroom", "classroom", "livingroom"];
    state.activeCategories = all.slice(0, Math.min(5, state.level + 1));
    categoryButtons.innerHTML = "";
    state.activeCategories.forEach(cat => {
      const info = CATEGORIES[cat];
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "category-btn";
      btn.dataset.cat = cat;
      btn.innerHTML = `<span class="cat-icon">${info.icon}</span>${info.name}`;
      btn.addEventListener("click", () => chooseCategory(cat));
      categoryButtons.appendChild(btn);
    });
  }

  function startGame() {
    state.mode = "child";
    state.level = 4;
    state.rounds = 10;
    state.speed = "normal";
    state.index = 0;
    state.score = 0;
    state.correct = 0;
    state.review = [];
    state.paused = false;
    setCategories();
    state.queue = buildQueue();
    updateStatus();
    $("pauseBtn").disabled = false;
    showScreen(gameScreen);
    nextCard();
  }

  function nextCard() {
    clearTimeout(state.timer);
    if (state.index >= state.queue.length) return endGame();

    state.current = state.queue[state.index];
    state.attempts = 0;
    state.accepting = true;
    hintText.textContent = "";
    feedback.textContent = "ดูภาพแล้วเลือกห้องนะ";
    card.classList.remove("correct", "wrong");
    card.style.transitionDuration = "0s";
    card.style.top = "76px";
    card.style.opacity = "1";
    $("cardEmoji").textContent = state.current.emoji;
    $("cardWord").textContent = state.current.word;
    updateStatus();
    requestAnimationFrame(() => requestAnimationFrame(startDrop));
    setTimeout(() => AudioHelper.speak(state.current.word), 260);
  }

  function startDrop() {
    if (state.speed === "zen") {
      card.style.transitionDuration = "0s";
      card.style.top = "min(200px, 30vh)";
      return;
    }
    const duration = state.mode === "classroom" ? speedMs[state.speed] * 1.35 : speedMs[state.speed];
    const targetTop = Math.max(220, lane.clientHeight - card.offsetHeight - 22);
    state.remainingMs = duration;
    state.startedAt = performance.now();
    card.style.transitionDuration = `${duration}ms`;
    card.style.top = `${targetTop}px`;
    state.timer = setTimeout(handleMiss, duration);
  }

  function handleMiss() {
    if (!state.accepting || state.paused) return;
    state.accepting = false;
    state.review.push(state.current);
    feedback.textContent = `มาดูกันนะ ${state.current.word} อยู่ใน${CATEGORIES[state.current.category].name}`;
    hintText.textContent = state.current.hint;
    AudioHelper.wrong();
    AudioHelper.speak(`${state.current.word} อยู่ใน ${CATEGORIES[state.current.category].name}`);
    state.index += 1;
    setTimeout(nextCard, 1900);
  }

  function chooseCategory(cat) {
    if (!state.accepting || state.paused) return;
    if (cat === state.current.category) handleCorrect();
    else handleWrong();
  }

  function handleCorrect() {
    clearTimeout(state.timer);
    state.accepting = false;
    const points = state.attempts === 0 ? 10 : state.attempts === 1 ? 7 : 5;
    state.score += points;
    state.correct += 1;
    card.classList.add("correct");
    spawnConfetti();
    feedback.textContent = `เก่งมาก! ${state.current.word} อยู่ใน${CATEGORIES[state.current.category].name}`;
    AudioHelper.correct();
    AudioHelper.speak(`เก่งมาก ${state.current.word} อยู่ใน ${CATEGORIES[state.current.category].name}`);
    updateStatus();
    state.index += 1;
    setTimeout(nextCard, 1250);
  }

  function handleWrong() {
    state.attempts += 1;
    card.classList.remove("wrong");
    void card.offsetWidth;
    card.classList.add("wrong");
    AudioHelper.wrong();

    if (state.attempts === 1) {
      feedback.textContent = "ลองอีกครั้งนะ";
      AudioHelper.speak("ลองอีกครั้งนะ");
    } else if (state.attempts === 2) {
      feedback.textContent = "มีคำใบ้ให้แล้วนะ";
      hintText.textContent = `💡 ${state.current.hint}`;
      AudioHelper.speak(state.current.hint);
    } else {
      feedback.textContent = `คำตอบคือ ${CATEGORIES[state.current.category].name}`;
      hintText.textContent = `✅ ${state.current.word} อยู่ใน${CATEGORIES[state.current.category].name}`;
      AudioHelper.speak(`${state.current.word} อยู่ใน ${CATEGORIES[state.current.category].name}`);
    }
  }

  function updateStatus() {
    $("scoreValue").textContent = state.score;
    $("progressValue").textContent = `${Math.min(state.index + 1, state.rounds)}/${state.rounds}`;
    $("highScoreValue").textContent = Number(localStorage.getItem("homeSortHighScore") || 0);
  }

  function endGame() {
    clearTimeout(state.timer);
    $("pauseBtn").disabled = true;
    const oldHigh = Number(localStorage.getItem("homeSortHighScore") || 0);
    if (state.score > oldHigh) localStorage.setItem("homeSortHighScore", String(state.score));
    $("correctResult").textContent = state.correct;
    $("totalResult").textContent = state.rounds;
    $("scoreResult").textContent = state.score;
    const ratio = state.correct / state.rounds;
    $("starResult").textContent = ratio >= .85 ? "⭐⭐⭐" : ratio >= .6 ? "⭐⭐" : "⭐";
    renderReview();
    showScreen(endScreen);
    AudioHelper.speak(`เยี่ยมมาก ตอบถูก ${state.correct} จาก ${state.rounds} ข้อ`);
  }

  function renderReview() {
    const reviewBox = $("reviewBox");
    const unique = [...new Map(state.review.map(item => [item.id, item])).values()];
    if (!unique.length) {
      reviewBox.innerHTML = `<h3>เก่งมาก ตอบได้ครบทุกข้อเลย 🎉</h3>`;
      return;
    }
    reviewBox.innerHTML = `<h3>ลองทบทวนอีกครั้ง</h3><div class="review-list">${unique.map(item => `
      <div class="review-item">
        <span class="emoji">${item.emoji}</span>
        <span><strong>${item.word}</strong> → ${CATEGORIES[item.category].icon} ${CATEGORIES[item.category].name}</span>
      </div>`).join("")}</div>`;
  }

  function togglePause(force) {
    if (!gameScreen.classList.contains("active")) return;
    state.paused = typeof force === "boolean" ? force : !state.paused;
    pauseOverlay.hidden = !state.paused;
    if (state.paused) {
      clearTimeout(state.timer);
      const elapsed = performance.now() - state.startedAt;
      state.remainingMs = Math.max(300, state.remainingMs - elapsed);
      const currentTop = getComputedStyle(card).top;
      card.style.transitionDuration = "0s";
      card.style.top = currentTop;
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    } else {
      if (state.speed === "zen") return;
      const targetTop = Math.max(220, lane.clientHeight - card.offsetHeight - 22);
      state.startedAt = performance.now();
      card.style.transitionDuration = `${state.remainingMs}ms`;
      requestAnimationFrame(() => { card.style.top = `${targetTop}px`; });
      state.timer = setTimeout(handleMiss, state.remainingMs);
    }
  }

  $("startBtn").addEventListener("click", startGame);
  $("playAgainBtn").addEventListener("click", startGame);
  $("homeBtn").addEventListener("click", resetToStartScreen);
  $("repeatWordBtn").addEventListener("click", () => AudioHelper.speak(state.current?.word || ""));
  $("soundBtn").addEventListener("click", () => {
    AudioHelper.setEnabled(!AudioHelper.isEnabled());
    $("soundBtn").textContent = AudioHelper.isEnabled() ? "🔊" : "🔇";
  });
  $("pauseBtn").addEventListener("click", () => togglePause());
  $("resumeBtn").addEventListener("click", () => togglePause(false));
  $("howBtn").addEventListener("click", () => $("howDialog").showModal());
  $("closeHowBtn").addEventListener("click", () => $("howDialog").close());
  window.addEventListener("keydown", (event) => {
    if (!gameScreen.classList.contains("active")) return;
    if (event.key === " ") { event.preventDefault(); togglePause(); }
    const n = Number(event.key);
    if (n >= 1 && n <= state.activeCategories.length) chooseCategory(state.activeCategories[n - 1]);
  });

  resetToStartScreen();
})();
