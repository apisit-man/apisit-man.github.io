(() => {
  const $ = (id) => document.getElementById(id);
  const startScreen = $("startScreen");
  const gameScreen  = $("gameScreen");
  const endScreen   = $("endScreen");
  const card        = $("fallingCard");
  const lane        = $("gameLane");
  const feedback    = $("feedbackBubble");
  const hintText    = $("hintText");
  const categoryButtons = $("categoryButtons");
  const pauseOverlay    = $("pauseOverlay");

  // ระดับความยาก: ง่าย=2 ห้อง / กลาง=3 ห้อง / ยาก=4 ห้อง (index-based → level+1 categories)
  const DIFF_LEVELS = { easy: 2, medium: 3, hard: 4 };

  const state = {
    difficulty: "easy",   // "easy" | "medium" | "hard"
    level: 2,             // ถูกอัปเดตจาก difficulty
    rounds: 10,
    speed: "normal",
    activeCategories: [],
    queue: [],
    index: 0,
    score: 0,
    correct: 0,
    streak: 0,
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

  /* ─── Confetti ─── */
  function spawnConfetti(count = 8, spread = 300) {
    const emojis = ["⭐", "🌟", "✨", "🎉", "🎊"];
    for (let i = 0; i < count; i++) {
      const delay = count > 8 ? i * 60 : 0;
      setTimeout(() => {
        const el = document.createElement("div");
        el.className = "confetti";
        el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        el.style.left = (30 + Math.random() * 40) + "%";
        el.style.top  = (30 + Math.random() * 30) + "%";
        el.style.setProperty("--tx", `${(Math.random() - 0.5) * spread}px`);
        el.style.setProperty("--ty", `${(Math.random() - 0.5) * spread}px`);
        if (count > 8) el.style.fontSize = (1.2 + Math.random() * 1.8) + "rem";
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 900);
      }, delay);
    }
  }

  function spawnBigConfetti() {
    const emojis = ["⭐", "🌟", "✨", "🎉", "🎊", "🏆", "👑"];
    for (let i = 0; i < 28; i++) {
      setTimeout(() => {
        const el = document.createElement("div");
        el.className = "confetti";
        el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        el.style.left = (Math.random() * 100) + "%";
        el.style.top  = (10 + Math.random() * 70) + "%";
        el.style.setProperty("--tx", `${(Math.random() - 0.5) * 420}px`);
        el.style.setProperty("--ty", `${(Math.random() - 0.5) * 420}px`);
        el.style.fontSize = (1.4 + Math.random() * 2) + "rem";
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 1000);
      }, i * 70);
    }
  }

  /* ─── Navigation ─── */
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

  /* ─── Utility ─── */
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

  /* ─── Difficulty Selector ─── */
  function initDifficultyButtons() {
    document.querySelectorAll(".diff-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".diff-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        state.difficulty = btn.dataset.diff;
      });
    });
  }

  /* ─── Categories ─── */
  function setCategories() {
    state.level = DIFF_LEVELS[state.difficulty] ?? 2;
    const all = ["bedroom", "kitchen", "bathroom", "classroom", "livingroom"];
    state.activeCategories = all.slice(0, state.level + 1);
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

  /* ─── Game Flow ─── */
  function startGame() {
    state.level    = DIFF_LEVELS[state.difficulty] ?? 2;
    state.rounds   = 10;
    state.speed    = "normal";
    state.index    = 0;
    state.score    = 0;
    state.correct  = 0;
    state.streak   = 0;
    state.review   = [];
    state.paused   = false;
    setCategories();
    state.queue = buildQueue();
    updateStatus();
    updateStreak();
    $("pauseBtn").disabled = false;
    showScreen(gameScreen);
    nextCard();
  }

  function nextCard() {
    clearTimeout(state.timer);
    if (state.index >= state.queue.length) return endGame();

    state.current  = state.queue[state.index];
    state.attempts = 0;
    state.accepting = true;
    hintText.textContent = "";
    feedback.textContent = "ดูภาพแล้วเลือกห้องนะ";
    card.classList.remove("correct", "wrong");
    card.style.transitionDuration = "0s";
    card.style.top = "76px";
    card.style.opacity = "1";
    $("cardEmoji").textContent = state.current.emoji;
    $("cardWord").textContent  = state.current.word;
    updateStatus();
    updateProgress();
    requestAnimationFrame(() => requestAnimationFrame(startDrop));
    setTimeout(() => AudioHelper.speak(state.current.word), 260);
  }

  function startDrop() {
    const duration  = speedMs[state.speed] || 12000;
    const targetTop = Math.max(220, lane.clientHeight - card.offsetHeight - 22);
    state.remainingMs = duration;
    state.startedAt   = performance.now();
    card.style.transitionDuration = `${duration}ms`;
    card.style.top = `${targetTop}px`;
    state.timer = setTimeout(handleMiss, duration);
  }

  function handleMiss() {
    if (!state.accepting || state.paused) return;
    state.accepting = false;
    state.streak = 0;
    updateStreak();
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

    // คะแนนตาม attempt
    const points = state.attempts === 0 ? 10 : state.attempts === 1 ? 7 : 5;
    state.score  += points;
    state.correct += 1;
    state.streak  += 1;

    card.classList.add("correct");
    spawnConfetti();

    // Streak feedback
    if (state.streak >= 3) {
      AudioHelper.streakSound(Math.min(state.streak, 6));
      feedback.textContent = `🔥 ${state.streak} ข้อติดต่อกัน! ${state.current.word} อยู่ใน${CATEGORIES[state.current.category].name}`;
    } else {
      AudioHelper.correct();
      feedback.textContent = `เก่งมาก! ${state.current.word} อยู่ใน${CATEGORIES[state.current.category].name}`;
    }
    AudioHelper.speak(`เก่งมาก ${state.current.word} อยู่ใน ${CATEGORIES[state.current.category].name}`);

    updateStatus();
    updateStreak();
    state.index += 1;
    setTimeout(nextCard, 1250);
  }

  function handleWrong() {
    state.attempts += 1;
    state.streak = 0;
    updateStreak();
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

  /* ─── UI Updates ─── */
  function updateStatus() {
    $("scoreValue").textContent    = state.score;
    $("progressValue").textContent = `${Math.min(state.index + 1, state.rounds)}/${state.rounds}`;
    $("highScoreValue").textContent = Number(localStorage.getItem("homeSortHighScore") || 0);
  }

  function updateProgress() {
    const pct = (state.index / state.rounds) * 100;
    $("progressBar").style.width = pct + "%";
  }

  function updateStreak() {
    const chip = $("streakChip");
    if (state.streak >= 2) {
      $("streakValue").textContent = state.streak;
      chip.hidden = false;
      // re-trigger animation
      chip.classList.remove("streak-chip");
      void chip.offsetWidth;
      chip.classList.add("streak-chip");
    } else {
      chip.hidden = true;
    }
  }

  /* ─── End Game ─── */
  function endGame() {
    clearTimeout(state.timer);
    $("pauseBtn").disabled = true;
    $("progressBar").style.width = "100%";

    const oldHigh = Number(localStorage.getItem("homeSortHighScore") || 0);
    if (state.score > oldHigh) localStorage.setItem("homeSortHighScore", String(state.score));

    $("correctResult").textContent = state.correct;
    $("totalResult").textContent   = state.rounds;
    $("scoreResult").textContent   = state.score;

    const ratio = state.correct / state.rounds;
    const stars = ratio >= 0.85 ? "⭐⭐⭐" : ratio >= 0.6 ? "⭐⭐" : "⭐";
    $("starResult").textContent = stars;

    // Dynamic heading
    const heading = ratio >= 0.85
      ? "เยี่ยมมากเลย! 🎉"
      : ratio >= 0.6
        ? "ทำได้ดีมาก! 👍"
        : "ยังดีนะ! ลองอีกครั้ง 💪";
    $("endHeading").textContent = heading;

    renderReview();
    showScreen(endScreen);

    if (ratio >= 0.85) {
      AudioHelper.fanfare();
      setTimeout(spawnBigConfetti, 300);
    }
    AudioHelper.speak(`${heading.replace(/[^ก-๙a-z\s]/gi, "")} ตอบถูก ${state.correct} จาก ${state.rounds} ข้อ`);
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

  /* ─── Pause ─── */
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
      const targetTop = Math.max(220, lane.clientHeight - card.offsetHeight - 22);
      state.startedAt = performance.now();
      card.style.transitionDuration = `${state.remainingMs}ms`;
      requestAnimationFrame(() => { card.style.top = `${targetTop}px`; });
      state.timer = setTimeout(handleMiss, state.remainingMs);
    }
  }

  /* ─── Event Listeners ─── */
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
    // Game screen shortcuts
    if (gameScreen.classList.contains("active")) {
      if (event.key === " ") { event.preventDefault(); togglePause(); return; }
      const n = Number(event.key);
      if (n >= 1 && n <= state.activeCategories.length) chooseCategory(state.activeCategories[n - 1]);
      return;
    }
    // End screen: Enter/Space → play again
    if (endScreen.classList.contains("active")) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        startGame();
      }
    }
  });

  initDifficultyButtons();
  resetToStartScreen();
})();

