(() => {
  "use strict";

  const STORAGE_KEY = "team-spotlight-state-v2";

  // Bilingual Localization Dictionary (i18n)
  const translations = {
    th: {
      docTitle: "Team Spotlight | สุ่มลำดับทีมนำเสนอสำหรับชั้นเรียน — ดร.อภิสิทธิ์ ธงไชย",
      nav: {
        home: "หน้าแรก",
        library: "คลังสื่อนวัตกรรม"
      },
      actions: {
        themeProjector: "โปรเจกเตอร์",
        themeDark: "โหมดมืด",
        speedNormal: "ปกติ",
        speedFast: "ด่วน",
        sound: "เสียง",
        fullscreen: "เต็มจอ"
      },
      setup: {
        eyebrow: "พร้อมขึ้นเวทีหรือยัง?",
        title1: "สุ่มลำดับการนำเสนอ",
        title2: "ให้ทุกทีมได้เฉิดฉาย",
        description: "วางรายชื่อทีมหนึ่งทีมต่อหนึ่งบรรทัด แล้วให้ Team Spotlight สร้างลำดับการนำเสนอที่ยุติธรรม สนุก และน่าตื่นเต้นสำหรับชั้นเรียน",
        feat1: "✓ ไม่สุ่มซ้ำ",
        feat2: "✓ เสียงและเอฟเฟกต์จัดเต็ม",
        feat3: "✓ ใช้ได้ทันที ไม่ต้องต่อเน็ต",
        feat4: "✓ บันทึกไฟล์ลำดับได้",
        cardTitle: "รายชื่อทีม",
        presetsTitle: "ชุดด่วน:",
        sampleBtn: "ทีมตัวอย่าง",
        numbers10Btn: "เลขที่ 1-10",
        numbers20Btn: "เลขที่ 1-20",
        numbers30Btn: "เลขที่ 1-30",
        numbers40Btn: "เลขที่ 1-40",
        groups6Btn: "กลุ่ม 1-6",
        groups8Btn: "กลุ่ม 1-8",
        cleanBtn: "🧹 จัดระเบียบข้อความ",
        clearBtn: "ล้างข้อมูล",
        inputLabel: "รายชื่อทีม หนึ่งทีมต่อหนึ่งบรรทัด",
        placeholder: "ทีมดาวเหนือ\nทีมพลังสร้างสรรค์\nทีมอนาคตไกล\nทีมก้าวใหม่\nทีมสายรุ้ง\nทีมผู้พิชิต",
        inputHint: "พิมพ์หรือวางรายชื่อ หนึ่งทีมต่อหนึ่งบรรทัด",
        startButton: "เปิดเวทีสุ่มทีม",
        privacyNote: "รายชื่อจะจัดเก็บอย่างปลอดภัยในเบราว์เซอร์ของอุปกรณ์นี้เท่านั้น",
        readyCount: "{n} ทีม",
        readyMsg: "พร้อมสุ่ม {n} ทีม",
        duplicateMsg: "พบชื่อซ้ำ {n} รายการ — ระบบจะตัดให้เหลือเพียงชื่อเดียว"
      },
      stage: {
        liveLabel: "PRESENTATION ORDER",
        title: "ทีมต่อไปคือ...",
        remainingLabel: "ทีมที่เหลือ",
        presentedLabel: "นำเสนอแล้ว",
        remainingTitle: "ทีมที่รอขึ้นเวที",
        historyTitle: "ลำดับการนำเสนอ",
        readyPrompt: "กดปุ่มเพื่อเริ่มสุ่ม",
        fairHint: "ทุกทีมมีโอกาสได้รับเลือกเท่ากัน",
        selectingKicker: "SELECTING THE NEXT TEAM",
        selectingHint: "กำลังค้นหาทีมที่จะเปล่งประกาย...",
        winnerKicker: "THE SPOTLIGHT IS YOURS",
        winnerHint: "เตรียมตัวนำเสนอผลงานได้เลย!",
        finalKicker: "FINAL TEAM · THE STAGE IS YOURS",
        finalHint: "ครบทุกทีมแล้ว — ยอดเยี่ยมมาก!",
        spinFirst: "สุ่มทีมแรก",
        spinNext: "สุ่มทีมถัดไป",
        spinDone: "สุ่มครบทุกทีมแล้ว",
        keyboardHint: "กด <kbd>Space</kbd> หรือ <kbd>Enter</kbd> เพื่อสุ่มทีมถัดไป",
        copyMini: "คัดลอก",
        downloadMini: "บันทึก",
        emptyHistory: "ผลการสุ่มจะปรากฏที่นี่",
        editTeams: "← แก้ไขรายชื่อ",
        copyOrder: "📋 คัดลอกลำดับ",
        downloadOrder: "📥 ดาวน์โหลดไฟล์",
        undo: "↶ ย้อนผลล่าสุด",
        restart: "↻ เริ่มรอบใหม่",
        fullTimer: "จับเวลากิจกรรม ↗"
      },
      timer: {
        start: "เริ่ม",
        pause: "หยุด",
        reset: "↻ รีเซ็ต",
        expiredToast: "หมดเวลาการนำเสนอของทีมนี้แล้ว! ⏱️"
      },
      footer: {
        role: "นักวิจัยและนักการศึกษา",
        tagline: "สื่อการเรียนรู้เชิงปฏิสัมพันธ์ (Interactive EdTech)",
        home: "หน้าแรก",
        innovations: "คลังสื่อนวัตกรรม",
        about: "เกี่ยวกับผู้จัดทำ",
        sitemap: "แผนผังเว็บไซต์",
        subtext: "พัฒนาเพื่อส่งเสริมการสืบเสาะ การมีส่วนร่วม และการจัดการเรียนรู้สะเต็มศึกษาในชั้นเรียน"
      },
      toast: {
        requireTeam: "กรุณาใส่ชื่อทีมอย่างน้อย 1 ทีม",
        sampleLoaded: "ใส่รายชื่อทีมตัวอย่างแล้ว",
        numbersLoaded: "สร้างรายชื่อ {n} รายการแล้ว",
        groupsLoaded: "สร้างรายชื่อกลุ่ม 1 ถึง {n} แล้ว",
        cleaned: "จัดระเบียบรายชื่อเรียบร้อย (ตัดเลขหน้าและบรรทัดว่าง)",
        cleared: "ล้างรายชื่อแล้ว",
        confirmClear: "ต้องการล้างรายชื่อทั้งหมดใช่หรือไม่?",
        copied: "คัดลอกลำดับการนำเสนอเรียบร้อยแล้ว 📋",
        copyFailed: "ไม่สามารถคัดลอกข้อความได้",
        downloaded: "ดาวน์โหลดไฟล์ลำดับการนำเสนอเรียบร้อย 📥",
        newRound: "เริ่มรอบใหม่แล้ว",
        undoSuccess: "ย้อนผลล่าสุดเรียบร้อย",
        undoRestored: "นำ “{name}” กลับเข้าสู่การสุ่มแล้ว",
        fullscreenUnsupported: "อุปกรณ์นี้ไม่รองรับโหมดเต็มจอจากเบราว์เซอร์",
        themeProjector: "เปิดโหมดโปรเจกเตอร์ (สว่าง/คอนทราสต์สูง) 💡",
        themeDark: "เปิดโหมดมืด (Spotlight แสงสีนีออน) 🌙",
        speedFast: "ความเร็วการสุ่ม: โหมดด่วน (1 วินาที) 🚀",
        speedNormal: "ความเร็วการสุ่ม: โหมดปกติ (3 วินาที) ⚡"
      }
    },
    en: {
      docTitle: "Team Spotlight | Classroom Presentation Order Randomizer — Dr. Apisit Tongchai",
      nav: {
        home: "Home",
        library: "Innovations"
      },
      actions: {
        themeProjector: "Projector",
        themeDark: "Dark Mode",
        speedNormal: "Normal",
        speedFast: "Fast",
        sound: "Sound",
        fullscreen: "Fullscreen"
      },
      setup: {
        eyebrow: "READY FOR THE STAGE?",
        title1: "Presentation Order",
        title2: "Let Every Team Shine",
        description: "Paste your team names one per line, and let Team Spotlight generate a fair, fun, and suspenseful presentation sequence for your classroom.",
        feat1: "✓ Zero Repeats",
        feat2: "✓ Dynamic Audio & Visuals",
        feat3: "✓ 100% Offline Ready",
        feat4: "✓ Exportable Order",
        cardTitle: "Team Roster",
        presetsTitle: "Presets:",
        sampleBtn: "Sample Teams",
        numbers10Btn: "Nos. 1-10",
        numbers20Btn: "Nos. 1-20",
        numbers30Btn: "Nos. 1-30",
        numbers40Btn: "Nos. 1-40",
        groups6Btn: "Groups 1-6",
        groups8Btn: "Groups 1-8",
        cleanBtn: "🧹 Clean Up Text",
        clearBtn: "Clear",
        inputLabel: "Team roster, one team per line",
        placeholder: "Polaris Team\nCreative Spark\nFuture Frontiers\nNext Step\nRainbow Squad\nThe Conquerors",
        inputHint: "Type or paste team names, one per line",
        startButton: "Open Presentation Stage",
        privacyNote: "Rosters stay securely on your device's browser only",
        readyCount: "{n} Teams",
        readyMsg: "Ready to spin {n} teams",
        duplicateMsg: "Found {n} duplicate names — each team will appear once"
      },
      stage: {
        liveLabel: "LIVE PRESENTATION ORDER",
        title: "The Next Team Is...",
        remainingLabel: "Remaining",
        presentedLabel: "Presented",
        remainingTitle: "Teams on Deck",
        historyTitle: "Presentation Order",
        readyPrompt: "Press Spin to Start",
        fairHint: "Every team has an equal opportunity to be chosen",
        selectingKicker: "SELECTING THE NEXT TEAM",
        selectingHint: "Finding the next team to shine...",
        winnerKicker: "THE SPOTLIGHT IS YOURS",
        winnerHint: "Get ready to present your work!",
        finalKicker: "FINAL TEAM · THE STAGE IS YOURS",
        finalHint: "All teams have presented — Fantastic job!",
        spinFirst: "Spin First Team",
        spinNext: "Spin Next Team",
        spinDone: "All Teams Chosen!",
        keyboardHint: "Press <kbd>Space</kbd> or <kbd>Enter</kbd> to spin next team",
        copyMini: "Copy",
        downloadMini: "Export",
        emptyHistory: "Presentation results will appear here",
        editTeams: "← Edit Roster",
        copyOrder: "📋 Copy Order",
        downloadOrder: "📥 Export File",
        undo: "↶ Undo Last",
        restart: "↻ New Round",
        fullTimer: "Full Activity Timer ↗"
      },
      timer: {
        start: "Start",
        pause: "Pause",
        reset: "↻ Reset",
        expiredToast: "Presentation time has concluded for this team! ⏱️"
      },
      footer: {
        role: "Educator & Researcher",
        tagline: "Interactive Educational Technology (EdTech)",
        home: "Home",
        innovations: "Innovations",
        about: "About Author",
        sitemap: "Sitemap",
        subtext: "Developed to promote scientific inquiry, collaborative learning, and STEM education."
      },
      toast: {
        requireTeam: "Please enter at least 1 team name",
        sampleLoaded: "Sample teams loaded",
        numbersLoaded: "Generated {n} student numbers",
        groupsLoaded: "Generated Groups 1 to {n}",
        cleaned: "Text cleaned (stripped numbers and blank lines)",
        cleared: "Roster cleared",
        confirmClear: "Clear all team names?",
        copied: "Presentation order copied to clipboard 📋",
        copyFailed: "Could not copy text to clipboard",
        downloaded: "Presentation order file exported 📥",
        newRound: "New round started",
        undoSuccess: "Last result undone",
        undoRestored: "Restored “{name}” back to the active pool",
        fullscreenUnsupported: "Fullscreen mode is not supported on this device",
        themeProjector: "Switched to Projector Mode (High Contrast) 💡",
        themeDark: "Switched to Dark Spotlight Mode 🌙",
        speedFast: "Spin speed: Fast mode (1 second) 🚀",
        speedNormal: "Spin speed: Normal mode (3 seconds) ⚡"
      }
    }
  };

  const SAMPLE_TEAMS_TH = ["ทีมดาวเหนือ", "ทีมพลังสร้างสรรค์", "ทีมอนาคตไกล", "ทีมก้าวใหม่", "ทีมสายรุ้ง", "ทีมผู้พิชิต"];
  const SAMPLE_TEAMS_EN = ["Team Polaris", "Creative Sparks", "Future Horizons", "Next Step", "Rainbow Explorers", "The Conquerors"];

  const elements = {
    setupView: document.getElementById("setupView"),
    stageView: document.getElementById("stageView"),
    teamInput: document.getElementById("teamInput"),
    teamCount: document.getElementById("teamCount"),
    inputMessage: document.getElementById("inputMessage"),
    sampleButton: document.getElementById("sampleButton"),
    numbers10Button: document.getElementById("numbers10Button"),
    numbers20Button: document.getElementById("numbers20Button"),
    numbers30Button: document.getElementById("numbers30Button"),
    numbers40Button: document.getElementById("numbers40Button"),
    groups6Button: document.getElementById("groups6Button"),
    groups8Button: document.getElementById("groups8Button"),
    cleanButton: document.getElementById("cleanButton"),
    clearButton: document.getElementById("clearButton"),
    startButton: document.getElementById("startButton"),
    langButton: document.getElementById("langButton"),
    langLabel: document.getElementById("langLabel"),
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
    downloadHistoryBtn: document.getElementById("downloadHistoryBtn"),
    copyOrderButton: document.getElementById("copyOrderButton"),
    downloadOrderButton: document.getElementById("downloadOrderButton"),
    confetti: document.getElementById("confetti"),
    toast: document.getElementById("toast"),
    // In-Stage Presentation Timer Elements
    stageTimerBar: document.getElementById("stageTimerBar"),
    timerDisplay: document.getElementById("timerDisplay"),
    timerToggleBtn: document.getElementById("timerToggleBtn"),
    timerToggleIcon: document.getElementById("timerToggleIcon"),
    timerToggleText: document.getElementById("timerToggleText"),
    timerResetBtn: document.getElementById("timerResetBtn")
  };

  let state = {
    teams: [],
    remaining: [],
    history: [],
    sound: true,
    speed: "normal",
    theme: "dark",
    lang: "th",
    timerDuration: 180, // 3 minutes default
    timerRemaining: 180,
    timerRunning: false
  };

  let isSpinning = false;
  let audioContext = null;
  let toastTimer = null;
  let countdownTimer = null;

  // --- PROCEDURAL WEB AUDIO ENGINE (Singleton + Touch Unlocker) ---
  function getAudioContext() {
    if (!audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) audioContext = new AudioCtx();
    }
    if (audioContext && audioContext.state === "suspended") {
      audioContext.resume().catch(() => {});
    }
    return audioContext;
  }

  function unlockAudio() {
    try {
      const ctx = getAudioContext();
      if (ctx && ctx.state === "suspended") {
        ctx.resume();
      }
    } catch (_) {}
    window.removeEventListener("pointerdown", unlockAudio);
    window.removeEventListener("touchstart", unlockAudio);
    window.removeEventListener("click", unlockAudio);
  }
  window.addEventListener("pointerdown", unlockAudio, { passive: true, once: true });
  window.addEventListener("touchstart", unlockAudio, { passive: true, once: true });
  window.addEventListener("click", unlockAudio, { passive: true, once: true });

  function tone(frequency, start, duration, type = "sine", volume = 0.06) {
    if (!state.sound) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime + start);
      gain.gain.setValueAtTime(0.0001, ctx.currentTime + start);
      gain.gain.exponentialRampToValueAtTime(volume, ctx.currentTime + start + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + duration);
      osc.connect(gain).connect(ctx.destination);
      osc.start(ctx.currentTime + start);
      osc.stop(ctx.currentTime + start + duration + 0.02);
    } catch (_) {}
  }

  function playClick() {
    tone(750, 0, 0.04, "triangle", 0.025);
  }

  function playTick(pitch) {
    tone(580 + pitch * 880, 0, 0.032, "square", 0.016);
  }

  function playReveal(isFinal) {
    if (!state.sound) return;
    // Harmonic celebratory chord arpeggio (C5, E5, G5, C6)
    const chord = [523.25, 659.25, 783.99, 1046.50];
    chord.forEach((note, index) => {
      tone(note, index * 0.075, 0.45, index % 2 === 0 ? "triangle" : "sine", 0.07);
    });

    if (isFinal) {
      // Grand celebration fanfare chord progression
      const victoryNotes = [1318.51, 1567.98, 2093.00];
      victoryNotes.forEach((note, idx) => {
        tone(note, 0.38 + idx * 0.09, 0.65, "sine", 0.06);
      });
    }
  }

  function playUndo() {
    tone(620, 0, 0.08, "sine", 0.035);
    tone(460, 0.08, 0.12, "sine", 0.035);
  }

  function playTimerAlert() {
    if (!state.sound) return;
    // Double high chime
    tone(880, 0, 0.16, "triangle", 0.08);
    tone(1046.5, 0.18, 0.28, "sine", 0.08);
  }

  // --- I18N LOCALIZATION ENGINE ---
  function t(path, vars = {}) {
    const lang = state.lang || "th";
    const keys = path.split(".");
    let val = translations[lang];
    for (const k of keys) {
      val = val?.[k];
    }
    if (!val) {
      // Fallback to Thai
      val = translations.th;
      for (const k of keys) {
        val = val?.[k];
      }
    }
    if (typeof val === "string") {
      let str = val;
      for (const [vKey, vVal] of Object.entries(vars)) {
        str = str.replace(new RegExp(`\\{${vKey}\\}`, "g"), vVal);
      }
      return str;
    }
    return path;
  }

  function applyLanguage(lang) {
    state.lang = lang === "en" ? "en" : "th";
    document.documentElement.lang = state.lang;
    document.title = t("docTitle");

    // Update data-i18n elements
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      const text = t(key);
      if (text) {
        if (text.includes("<") && text.includes(">")) el.innerHTML = text;
        else el.textContent = text;
      }
    });

    // Update data-i18n-placeholder elements
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
      const key = el.getAttribute("data-i18n-placeholder");
      const text = t(key);
      if (text) el.placeholder = text;
    });

    // Update switcher labels
    if (elements.langLabel) elements.langLabel.textContent = state.lang === "th" ? "EN" : "TH";
    if (elements.langButton) elements.langButton.title = state.lang === "th" ? "สลับภาษา / Toggle to English" : "Switch to Thai (ภาษาไทย)";

    updateThemeButton();
    updateSpeedButton();
    updateInputStatus();
    renderState();
    updateTimerDisplay();
    saveState();
  }

  function toggleLanguage() {
    playClick();
    const nextLang = state.lang === "th" ? "en" : "th";
    applyLanguage(nextLang);
    showToast(nextLang === "en" ? "Switched to English 🌐" : "เปลี่ยนเป็นภาษาไทย 🌐");
  }

  // --- INPUT & ROSTER PARSER ---
  function parseTeams(value) {
    const seen = new Set();
    const unique = [];
    let duplicates = 0;
    value.split(/\r?\n/).map(name => name.trim()).filter(Boolean).forEach(name => {
      const key = name.toLocaleLowerCase(state.lang === "th" ? "th" : "en");
      if (seen.has(key)) duplicates += 1;
      else { seen.add(key); unique.push(name); }
    });
    return { teams: unique, duplicates };
  }

  function updateInputStatus() {
    const parsed = parseTeams(elements.teamInput.value);
    elements.teamCount.textContent = t("setup.readyCount", { n: parsed.teams.length });
    elements.inputMessage.parentElement.classList.toggle("has-error", parsed.duplicates > 0);
    elements.inputMessage.textContent = parsed.duplicates
      ? t("setup.duplicateMsg", { n: parsed.duplicates })
      : parsed.teams.length ? t("setup.readyMsg", { n: parsed.teams.length }) : t("setup.inputHint");
  }

  // --- STATE STORAGE ---
  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        teams: state.teams,
        remaining: state.remaining,
        history: state.history,
        sound: state.sound,
        speed: state.speed,
        theme: state.theme,
        lang: state.lang,
        timerDuration: state.timerDuration
      }));
      localStorage.setItem("site_lang", state.lang);
    } catch (_) {}
  }

  function loadState() {
    const urlParams = new URLSearchParams(window.location.search);
    const paramLang = urlParams.get("lang");
    const savedLang = localStorage.getItem("site_lang");

    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (saved && Array.isArray(saved.teams)) {
        state = {
          teams: saved.teams.filter(name => typeof name === "string"),
          remaining: Array.isArray(saved.remaining) ? saved.remaining : [],
          history: Array.isArray(saved.history) ? saved.history : [],
          sound: saved.sound !== false,
          speed: saved.speed === "fast" ? "fast" : "normal",
          theme: saved.theme || (localStorage.getItem("theme") === "light" ? "light" : "dark"),
          lang: paramLang || saved.lang || savedLang || "th",
          timerDuration: typeof saved.timerDuration === "number" ? saved.timerDuration : 180,
          timerRemaining: typeof saved.timerDuration === "number" ? saved.timerDuration : 180,
          timerRunning: false
        };
      } else {
        state.lang = paramLang || savedLang || "th";
      }
    } catch (_) {
      state.lang = paramLang || savedLang || "th";
    }

    applyTheme(state.theme);
    applyLanguage(state.lang);
    elements.teamInput.value = state.teams.join("\n");
    updateSoundButton();
    updateInputStatus();
    initTimerPills();
  }

  // --- THEME (Dark Spotlight / Light Projector) ---
  function applyTheme(theme) {
    state.theme = theme === "light" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", state.theme);
    updateThemeButton();
    saveState();
  }

  function updateThemeButton() {
    const isLight = state.theme === "light";
    if (elements.themeIcon) elements.themeIcon.textContent = isLight ? "🌙" : "💡";
    if (elements.themeLabel) elements.themeLabel.textContent = isLight ? t("actions.themeDark") : t("actions.themeProjector");
  }

  function toggleTheme() {
    playClick();
    const nextTheme = state.theme === "light" ? "dark" : "light";
    applyTheme(nextTheme);
    showToast(nextTheme === "light" ? t("toast.themeProjector") : t("toast.themeDark"));
  }

  // --- SPEED (Normal 3s / Fast 1s) ---
  function updateSpeedButton() {
    const isFast = state.speed === "fast";
    if (elements.speedIcon) elements.speedIcon.textContent = isFast ? "🚀" : "⚡";
    if (elements.speedLabel) elements.speedLabel.textContent = isFast ? t("actions.speedFast") : t("actions.speedNormal");
  }

  function toggleSpeed() {
    playClick();
    state.speed = state.speed === "fast" ? "normal" : "fast";
    updateSpeedButton();
    saveState();
    showToast(state.speed === "fast" ? t("toast.speedFast") : t("toast.speedNormal"));
  }

  // --- VIEW SWITCHING ---
  function showView(name) {
    const showStage = name === "stage";
    elements.setupView.classList.toggle("is-active", !showStage);
    elements.stageView.classList.toggle("is-active", showStage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function startStage() {
    playClick();
    const parsed = parseTeams(elements.teamInput.value);
    if (!parsed.teams.length) {
      elements.teamInput.focus();
      showToast(t("toast.requireTeam"));
      return;
    }
    state.teams = parsed.teams;
    state.remaining = [...parsed.teams];
    state.history = [];
    resetResult();
    renderState();
    resetPresentationTimer();
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
    elements.spinButtonText.textContent = remaining === 0
      ? t("stage.spinDone")
      : presented === 0 ? t("stage.spinFirst") : t("stage.spinNext");

    if (elements.copyHistoryBtn) elements.copyHistoryBtn.disabled = !hasHistory || isSpinning;
    if (elements.downloadHistoryBtn) elements.downloadHistoryBtn.disabled = !hasHistory || isSpinning;
    if (elements.copyOrderButton) elements.copyOrderButton.disabled = !hasHistory || isSpinning;
    if (elements.downloadOrderButton) elements.downloadOrderButton.disabled = !hasHistory || isSpinning;
  }

  // --- CRYPTO SECURE RANDOM ---
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

  // --- SPIN ACTION ---
  async function spin() {
    if (isSpinning || state.remaining.length === 0) return;
    isSpinning = true;
    unlockAudio();
    elements.spinButton.classList.add("is-spinning");
    elements.resultCard.classList.remove("is-winner");
    elements.resultCard.classList.add("is-spinning");
    elements.resultKicker.textContent = t("stage.selectingKicker");
    elements.resultHint.textContent = t("stage.selectingHint");
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
        playTick(0.09 + progress * 0.09);
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
    elements.resultKicker.textContent = state.remaining.length ? t("stage.winnerKicker") : t("stage.finalKicker");
    elements.resultHint.textContent = state.remaining.length ? t("stage.winnerHint") : t("stage.finalHint");
    elements.resultCard.classList.remove("is-spinning");
    void elements.resultCard.offsetWidth; // re-trigger animation
    elements.resultCard.classList.add("is-winner");

    playReveal(state.remaining.length === 0);
    burstConfetti(state.remaining.length === 0 ? 130 : 70);

    // Auto-reset presentation timer for the new team
    resetPresentationTimer();

    saveState();
    renderState();
  }

  function resetResult() {
    elements.resultCard.classList.remove("is-spinning", "is-winner");
    elements.resultKicker.textContent = "READY TO SHINE";
    elements.resultName.textContent = t("stage.readyPrompt");
    elements.resultHint.textContent = t("stage.fairHint");
  }

  function restart() {
    if (isSpinning) return;
    playClick();
    state.remaining = [...state.teams];
    state.history = [];
    resetResult();
    resetPresentationTimer();
    saveState();
    renderState();
    showToast(t("toast.newRound"));
  }

  function undo() {
    if (isSpinning || !state.history.length) return;
    playUndo();
    const restored = state.history.pop();
    state.remaining.push(restored);
    resetResult();
    elements.resultHint.textContent = t("toast.undoRestored", { name: restored });
    saveState();
    renderState();
    showToast(t("toast.undoSuccess"));
  }

  function editTeams() {
    if (isSpinning) return;
    playClick();
    elements.teamInput.value = state.teams.join("\n");
    updateInputStatus();
    showView("setup");
  }

  // --- IN-STAGE PRESENTATION TIMER ---
  function formatTime(totalSeconds) {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  function updateTimerDisplay() {
    if (elements.timerDisplay) {
      elements.timerDisplay.textContent = formatTime(state.timerRemaining);
    }
    if (elements.stageTimerBar) {
      elements.stageTimerBar.classList.toggle("is-warning", state.timerRemaining <= 30 && state.timerRemaining > 0);
      elements.stageTimerBar.classList.toggle("is-expired", state.timerRemaining === 0);
    }
    if (elements.timerToggleText) {
      elements.timerToggleText.textContent = state.timerRunning ? t("timer.pause") : t("timer.start");
    }
    if (elements.timerToggleIcon) {
      elements.timerToggleIcon.textContent = state.timerRunning ? "⏸" : "▶";
    }
  }

  function togglePresentationTimer() {
    playClick();
    if (state.timerRunning) {
      pausePresentationTimer();
    } else {
      startPresentationTimer();
    }
  }

  function startPresentationTimer() {
    if (state.timerRemaining <= 0) {
      state.timerRemaining = state.timerDuration;
    }
    state.timerRunning = true;
    updateTimerDisplay();
    clearInterval(countdownTimer);
    countdownTimer = setInterval(() => {
      if (state.timerRemaining > 0) {
        state.timerRemaining -= 1;
        updateTimerDisplay();
        if (state.timerRemaining === 0) {
          pausePresentationTimer();
          playTimerAlert();
          showToast(t("timer.expiredToast"));
        }
      } else {
        pausePresentationTimer();
      }
    }, 1000);
  }

  function pausePresentationTimer() {
    state.timerRunning = false;
    clearInterval(countdownTimer);
    updateTimerDisplay();
  }

  function resetPresentationTimer() {
    pausePresentationTimer();
    state.timerRemaining = state.timerDuration;
    updateTimerDisplay();
  }

  function setTimerDuration(seconds) {
    playClick();
    state.timerDuration = seconds;
    state.timerRemaining = seconds;
    saveState();
    resetPresentationTimer();
    document.querySelectorAll(".timer-pill").forEach(pill => {
      pill.classList.toggle("is-active", Number(pill.getAttribute("data-time")) === seconds);
    });
  }

  function initTimerPills() {
    document.querySelectorAll(".timer-pill").forEach(pill => {
      pill.addEventListener("click", () => {
        const secs = Number(pill.getAttribute("data-time"));
        if (secs) setTimerDuration(secs);
      });
      pill.classList.toggle("is-active", Number(pill.getAttribute("data-time")) === state.timerDuration);
    });
  }

  // --- COPY & EXPORT ---
  function getFormattedOrderText() {
    const isThai = state.lang === "th";
    const now = new Date();
    const dateStr = now.toLocaleDateString(isThai ? "th-TH" : "en-US", { year: "numeric", month: "short", day: "numeric" });
    const timeStr = now.toLocaleTimeString(isThai ? "th-TH" : "en-US", { hour: "2-digit", minute: "2-digit" });

    return [
      `📋 ${isThai ? "ลำดับการนำเสนอ (Team Spotlight)" : "Presentation Order (Team Spotlight)"}`,
      `${isThai ? "วันที่บันทึก" : "Date"}: ${dateStr} ${timeStr}`,
      `${isThai ? "จำนวนทั้งหมด" : "Total Teams"}: ${state.history.length} ${isThai ? "ทีม" : "teams"}`,
      "----------------------------------------",
      ...state.history.map((name, idx) => `${String(idx + 1).padStart(2, " ")}. ${name}`),
      "----------------------------------------",
      "Created by Team Spotlight | apisit-man.github.io"
    ].join("\n");
  }

  function copyHistory() {
    if (!state.history.length) return;
    playClick();
    const text = getFormattedOrderText();
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text)
        .then(() => showToast(t("toast.copied")))
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
      showToast(t("toast.copied"));
    } catch (_) {
      showToast(t("toast.copyFailed"));
    }
    document.body.removeChild(ta);
  }

  function downloadHistory() {
    if (!state.history.length) return;
    playClick();
    const text = getFormattedOrderText();
    // Add UTF-8 BOM so Excel opens Thai characters seamlessly
    const blob = new Blob(["\uFEFF" + text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const dateTag = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `presentation-order-${dateTag}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(t("toast.downloaded"));
  }

  // --- PRESETS & HELPERS ---
  function setSampleTeams() {
    playClick();
    const samples = state.lang === "th" ? SAMPLE_TEAMS_TH : SAMPLE_TEAMS_EN;
    elements.teamInput.value = samples.join("\n");
    updateInputStatus();
    elements.teamInput.focus();
    showToast(t("toast.sampleLoaded"));
  }

  function setNumbers(count) {
    playClick();
    const isThai = state.lang === "th";
    const items = Array.from({ length: count }, (_, i) =>
      isThai ? `เลขที่ ${String(i + 1).padStart(2, "0")}` : `No. ${String(i + 1).padStart(2, "0")}`
    );
    elements.teamInput.value = items.join("\n");
    updateInputStatus();
    elements.teamInput.focus();
    showToast(t("toast.numbersLoaded", { n: count }));
  }

  function setGroups(count) {
    playClick();
    const isThai = state.lang === "th";
    const items = Array.from({ length: count }, (_, i) =>
      isThai ? `กลุ่มที่ ${i + 1}` : `Group ${i + 1}`
    );
    elements.teamInput.value = items.join("\n");
    updateInputStatus();
    elements.teamInput.focus();
    showToast(t("toast.groupsLoaded", { n: count }));
  }

  function cleanTeamsText() {
    playClick();
    const raw = elements.teamInput.value;
    if (!raw.trim()) return;

    const cleanedLines = raw
      .split(/\r?\n/)
      .map(line => {
        // Strip common prefixes: "1. ", "1) ", "1 - ", "• ", "- ", "* ", tabs
        return line
          .replace(/^[\s\t]*[\d]+[\.\)\-\:\s]+/g, "")
          .replace(/^[\s\t]*[•\-\*\+]\s*/g, "")
          .trim();
      })
      .filter(Boolean);

    elements.teamInput.value = cleanedLines.join("\n");
    updateInputStatus();
    elements.teamInput.focus();
    showToast(t("toast.cleaned"));
  }

  function clearTeams() {
    playClick();
    if (!elements.teamInput.value.trim() || confirm(t("toast.confirmClear"))) {
      elements.teamInput.value = "";
      updateInputStatus();
      elements.teamInput.focus();
      showToast(t("toast.cleared"));
    }
  }

  function toggleSound() {
    state.sound = !state.sound;
    updateSoundButton();
    saveState();
    if (state.sound) {
      unlockAudio();
      tone(660, 0, 0.12, "sine", 0.035);
    }
  }

  function updateSoundButton() {
    elements.soundButton.setAttribute("aria-pressed", String(state.sound));
    elements.soundIcon.textContent = state.sound ? "🔊" : "🔇";
  }

  function burstConfetti(amount) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const colors = ["#ffd166", "#54e9ff", "#bc8cff", "#ff5fa2", "#34d399", "#ffffff"];
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < amount; i += 1) {
      const piece = document.createElement("i");
      piece.className = "confetti-piece";
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.width = `${5 + Math.random() * 7}px`;
      piece.style.height = `${8 + Math.random() * 13}px`;
      piece.style.background = colors[i % colors.length];
      piece.style.setProperty("--duration", `${2.2 + Math.random() * 2}s`);
      piece.style.setProperty("--drift", `${-100 + Math.random() * 200}px`);
      piece.style.setProperty("--turn", `${360 + Math.random() * 900}deg`);
      piece.style.animationDelay = `${Math.random() * 0.3}s`;
      fragment.appendChild(piece);
    }
    elements.confetti.appendChild(fragment);
    window.setTimeout(() => { elements.confetti.innerHTML = ""; }, 4800);
  }

  function toggleFullscreen() {
    playClick();
    if (!document.fullscreenElement) {
      if (document.documentElement.requestFullscreen) {
        const request = document.documentElement.requestFullscreen();
        if (request?.catch) request.catch(() => showToast(t("toast.fullscreenUnsupported")));
      } else {
        showToast(t("toast.fullscreenUnsupported"));
      }
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  function showToast(message) {
    elements.toast.textContent = message;
    elements.toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => elements.toast.classList.remove("is-visible"), 2400);
  }

  function escapeHtml(value) {
    return value.replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
  }

  // --- EVENT LISTENERS ---
  elements.teamInput.addEventListener("input", updateInputStatus);
  if (elements.sampleButton) elements.sampleButton.addEventListener("click", setSampleTeams);
  if (elements.numbers10Button) elements.numbers10Button.addEventListener("click", () => setNumbers(10));
  if (elements.numbers20Button) elements.numbers20Button.addEventListener("click", () => setNumbers(20));
  if (elements.numbers30Button) elements.numbers30Button.addEventListener("click", () => setNumbers(30));
  if (elements.numbers40Button) elements.numbers40Button.addEventListener("click", () => setNumbers(40));
  if (elements.groups6Button) elements.groups6Button.addEventListener("click", () => setGroups(6));
  if (elements.groups8Button) elements.groups8Button.addEventListener("click", () => setGroups(8));
  if (elements.cleanButton) elements.cleanButton.addEventListener("click", cleanTeamsText);
  if (elements.clearButton) elements.clearButton.addEventListener("click", clearTeams);

  elements.startButton.addEventListener("click", startStage);
  elements.spinButton.addEventListener("click", spin);
  elements.undoButton.addEventListener("click", undo);
  elements.restartButton.addEventListener("click", restart);
  elements.editButton.addEventListener("click", editTeams);
  elements.soundButton.addEventListener("click", toggleSound);
  elements.fullscreenButton.addEventListener("click", toggleFullscreen);
  if (elements.langButton) elements.langButton.addEventListener("click", toggleLanguage);
  if (elements.themeButton) elements.themeButton.addEventListener("click", toggleTheme);
  if (elements.speedButton) elements.speedButton.addEventListener("click", toggleSpeed);

  if (elements.copyHistoryBtn) elements.copyHistoryBtn.addEventListener("click", copyHistory);
  if (elements.downloadHistoryBtn) elements.downloadHistoryBtn.addEventListener("click", downloadHistory);
  if (elements.copyOrderButton) elements.copyOrderButton.addEventListener("click", copyHistory);
  if (elements.downloadOrderButton) elements.downloadOrderButton.addEventListener("click", downloadHistory);

  // In-Stage Presentation Timer Listeners
  if (elements.timerToggleBtn) elements.timerToggleBtn.addEventListener("click", togglePresentationTimer);
  if (elements.timerResetBtn) elements.timerResetBtn.addEventListener("click", () => {
    playClick();
    resetPresentationTimer();
  });

  // Global Keyboard Shortcuts
  document.addEventListener("keydown", event => {
    const target = event.target;
    const isTyping = target instanceof HTMLTextAreaElement || target instanceof HTMLInputElement || target instanceof HTMLButtonElement;
    if (!isTyping && elements.stageView.classList.contains("is-active")) {
      if (event.code === "Space" || event.code === "Enter") {
        event.preventDefault();
        spin();
      }
    }
  });

  // Initialize App
  loadState();
})();
