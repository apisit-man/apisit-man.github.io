const PACKS = {
  warmup: {
    name: "คำพูดในชีวิตประจำวัน",
    items: [
      { text: "Good morning", phonetic: "/ɡʊd ˈmɔːrnɪŋ/", thai: "สวัสดีตอนเช้า", tip: "เชื่อมเสียงท้ายคำว่า good เข้ากับ morning เบา ๆ" },
      { text: "Thank you", phonetic: "/θæŋk juː/", thai: "ขอบคุณ", tip: "เสียง th ให้วางปลายลิ้นแตะระหว่างฟันเบา ๆ แล้วเป่าลมออก" },
      { text: "How are you today?", phonetic: "/haʊ ɑːr juː təˈdeɪ/", thai: "วันนี้คุณเป็นอย่างไรบ้าง", tip: "พูดให้ลื่นไหล ไม่ต้องหยุดหลังทุกคำ" },
      { text: "Nice to meet you", phonetic: "/naɪs tə miːt juː/", thai: "ยินดีที่ได้รู้จัก", tip: "คำว่า to ในประโยคนี้พูดสั้นและเบาได้" },
      { text: "See you tomorrow", phonetic: "/siː juː təˈmɒroʊ/", thai: "เจอกันพรุ่งนี้", tip: "เน้นพยางค์ที่สองของคำว่า tomorrow" },
      { text: "Have a great day", phonetic: "/hæv ə ɡreɪt deɪ/", thai: "ขอให้เป็นวันที่ดี", tip: "อ้าปากกว้างขึ้นเล็กน้อยเมื่อออกเสียงคำว่า great" }
    ]
  },
  sounds: {
    name: "เสียงที่คนไทยมักสับสน",
    items: [
      { text: "Three", phonetic: "/θriː/", thai: "สาม", tip: "เสียง th ให้ลมผ่านปลายลิ้นเล็กน้อย อย่าออกเสียงเป็น ต หรือ ซ" },
      { text: "Sheep", phonetic: "/ʃiːp/", thai: "แกะ", tip: "ลากเสียง ee ให้ยาว แล้วปิดริมฝีปากที่เสียง p" },
      { text: "Very well", phonetic: "/ˈveri wel/", thai: "ดีมาก", tip: "เสียง v ใช้ฟันบนแตะริมฝีปากล่างเบา ๆ" },
      { text: "Turn right", phonetic: "/tɜːrn raɪt/", thai: "เลี้ยวขวา", tip: "เสียง r ภาษาอังกฤษให้ลิ้นอยู่ด้านหลังและไม่แตะเพดานปาก" },
      { text: "Fresh fruit", phonetic: "/freʃ fruːt/", thai: "ผลไม้สด", tip: "ลองออกเสียงควบ fr ช้า ๆ ก่อน แล้วจึงพูดทั้งวลี" },
      { text: "World", phonetic: "/wɜːrld/", thai: "โลก", tip: "เริ่มด้วยริมฝีปากกลม แล้วจบด้วยการยกปลายลิ้น" }
    ]
  },
  sentences: {
    name: "พูดเป็นประโยค",
    items: [
      { text: "I would like a glass of water", phonetic: "/aɪ wʊd laɪk ə ɡlɑːs əv ˈwɔːtər/", thai: "ฉันต้องการน้ำหนึ่งแก้ว", tip: "เน้นคำสำคัญ ได้แก่ like, glass และ water" },
      { text: "Could you please speak more slowly?", phonetic: "/kʊd juː pliːz spiːk mɔːr ˈsloʊli/", thai: "ช่วยพูดช้าลงหน่อยได้ไหม", tip: "ยกเสียงสูงขึ้นเล็กน้อยตอนท้ายประโยคคำถาม" },
      { text: "The weather is beautiful today", phonetic: "/ðə ˈweðər ɪz ˈbjuːtəfəl təˈdeɪ/", thai: "วันนี้อากาศดีมาก", tip: "พูด the weather is ให้เชื่อมต่อกันอย่างลื่นไหล" },
      { text: "My favourite subject is science", phonetic: "/maɪ ˈfeɪvərɪt ˈsʌbdʒekt ɪz ˈsaɪəns/", thai: "วิชาโปรดของฉันคือวิทยาศาสตร์", tip: "เน้นคำว่า favourite, subject และ science" },
      { text: "We are learning something new", phonetic: "/wiː ɑːr ˈlɜːrnɪŋ ˈsʌmθɪŋ nuː/", thai: "เรากำลังเรียนรู้สิ่งใหม่", tip: "ออกเสียงท้ายคำว่า something ให้ชัด ไม่ต้องรีบ" },
      { text: "Practice helps me feel confident", phonetic: "/ˈpræktɪs helps miː fiːl ˈkɒnfɪdənt/", thai: "การฝึกฝนช่วยให้ฉันมั่นใจ", tip: "รักษาจังหวะให้สม่ำเสมอและพูดคำว่า confident ให้ครบ" }
    ]
  }
};

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const state = {
  selectedPack: "warmup",
  items: [],
  index: 0,
  attempt: 1,
  score: 0,
  streak: 0,
  topStreak: 0,
  results: [],
  listening: false,
  sound: true,
  recognition: null,
  dialect: "en-US"
};

const $ = (id) => document.getElementById(id);
const screens = [$("introScreen"), $("gameScreen"), $("summaryScreen")];
let toastTimer = null;

function showScreen(target) {
  screens.forEach((screen) => screen.classList.toggle("is-active", screen === target));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function normalize(text) {
  return text.toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function levenshtein(a, b) {
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i += 1) {
    let previous = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j += 1) {
      const old = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, previous + (a[i - 1] === b[j - 1] ? 0 : 1));
      previous = old;
    }
  }
  return row[b.length];
}

function alignWords(target, spoken) {
  const a = normalize(target).split(" ").filter(Boolean);
  const b = normalize(spoken).split(" ").filter(Boolean);
  const table = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));

  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      table[i][j] = a[i - 1] === b[j - 1]
        ? table[i - 1][j - 1] + 1
        : Math.max(table[i - 1][j], table[i][j - 1]);
    }
  }

  const matched = Array(a.length).fill(false);
  let i = a.length;
  let j = b.length;
  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) {
      matched[i - 1] = true;
      i -= 1;
      j -= 1;
    } else if (table[i - 1][j] >= table[i][j - 1]) {
      i -= 1;
    } else {
      j -= 1;
    }
  }
  return { words: a, matched, exactCount: table[a.length][b.length] };
}

function calculateMatch(target, spoken) {
  const cleanTarget = normalize(target);
  const cleanSpoken = normalize(spoken);
  if (!cleanSpoken) return { score: 0, ...alignWords(target, spoken) };

  const alignment = alignWords(target, spoken);
  const wordCoverage = alignment.exactCount / Math.max(alignment.words.length, 1);
  const charSimilarity = 1 - (levenshtein(cleanTarget, cleanSpoken) / Math.max(cleanTarget.length, cleanSpoken.length, 1));
  const lengthPenalty = Math.min(cleanTarget.split(" ").length, cleanSpoken.split(" ").length) /
    Math.max(cleanTarget.split(" ").length, cleanSpoken.split(" ").length, 1);
  const score = Math.round(Math.max(0, Math.min(1, wordCoverage * .7 + charSimilarity * .2 + lengthPenalty * .1)) * 100);
  return { score, ...alignment };
}

function showToast(message) {
  $("toast").textContent = message;
  $("toast").classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $("toast").classList.remove("is-visible"), 3500);
}

function getBest() {
  return Number(localStorage.getItem("speakQuestBest") || 0);
}

function speak(text) {
  if (!state.sound || !("speechSynthesis" in window)) {
    showToast(state.sound ? "เบราว์เซอร์นี้ไม่สามารถเล่นเสียงตัวอย่างได้" : "กรุณาเปิดเสียงก่อนฟังเสียงตัวอย่าง");
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = state.dialect;
  utterance.rate = .82;
  utterance.pitch = 1;
  const voices = window.speechSynthesis.getVoices();
  const exactVoice = voices.find((voice) => voice.lang === state.dialect);
  const englishVoice = voices.find((voice) => voice.lang.startsWith(state.dialect.slice(0, 2)));
  utterance.voice = exactVoice || englishVoice || null;
  window.speechSynthesis.speak(utterance);
}

function setupRecognition() {
  if (!SpeechRecognition) return null;
  const recognition = new SpeechRecognition();
  recognition.lang = state.dialect;
  recognition.interimResults = false;
  recognition.continuous = false;
  recognition.maxAlternatives = 5;

  recognition.onstart = () => setListening(true);
  recognition.onspeechend = () => recognition.stop();
  recognition.onresult = (event) => {
    const target = state.items[state.index].text;
    const alternatives = Array.from(event.results[0], (result) => result.transcript);
    const best = alternatives
      .map((transcript) => ({ transcript, match: calculateMatch(target, transcript) }))
      .sort((a, b) => b.match.score - a.match.score)[0];
    renderFeedback(best.transcript, best.match);
  };
  recognition.onerror = (event) => {
    setListening(false);
    const messages = {
      "not-allowed": "ไมโครโฟนถูกปิดกั้น กรุณาอนุญาตใช้ไมโครโฟนในการตั้งค่าเบราว์เซอร์",
      "audio-capture": "ไม่พบไมโครโฟนที่พร้อมใช้งาน",
      "no-speech": "ยังไม่ได้ยินเสียงพูด ลองขยับเข้าใกล้ไมโครโฟนแล้วพูดอีกครั้ง",
      network: "การตรวจจับเสียงของเบราว์เซอร์นี้ต้องเชื่อมต่ออินเทอร์เน็ต"
    };
    showToast(messages[event.error] || "ระบบยังฟังไม่เข้าใจ ลองพูดอีกครั้งนะ");
  };
  recognition.onend = () => setListening(false);
  return recognition;
}

function setListening(isListening) {
  state.listening = isListening;
  $("gameScreen").classList.toggle("is-listening", isListening);
  $("micTitle").textContent = isListening ? "กำลังฟัง... พูดได้เลย" : "กดไมโครโฟนแล้วพูดตาม";
  $("micHelp").textContent = isListening ? "พูดด้วยเสียงปกติ ระบบจะหยุดฟังอัตโนมัติ" : "เมื่อเบราว์เซอร์ถาม กรุณากดอนุญาตใช้ไมโครโฟน";
  $("micButton").setAttribute("aria-label", isListening ? "หยุดฟังเสียง" : "กดเพื่อเริ่มพูด");
}

function startListening() {
  if (!SpeechRecognition) {
    showToast("เบราว์เซอร์นี้ยังไม่รองรับการตรวจจับเสียง แนะนำให้ใช้ Chrome หรือ Edge รุ่นล่าสุด");
    return;
  }
  if (state.listening) {
    state.recognition?.stop();
    return;
  }
  window.speechSynthesis?.cancel();
  $("feedbackPanel").hidden = true;
  $("roundActions").hidden = true;
  state.recognition = setupRecognition();
  try {
    state.recognition.start();
  } catch {
    showToast("ไมโครโฟนกำลังเริ่มทำงาน กรุณารอสักครู่");
  }
}

function feedbackFor(score) {
  if (score >= 90) return ["ยอดเยี่ยมมาก!", "ระบบได้ยินตรงกับข้อความตัวอย่างเกือบทั้งหมด"];
  if (score >= 75) return ["ทำได้ดีมาก!", "คำส่วนใหญ่ตรงแล้ว ลองอีกครั้งให้ลื่นไหลขึ้นได้เลย"];
  if (score >= 55) return ["กำลังพัฒนาได้ดี!", "ระบบได้ยินตรงบางคำ ลองฟังอีกครั้งแล้วเน้นคำที่มีสีแดง"];
  return ["ลองใหม่ได้เสมอ!", "ค่อย ๆ พูดให้ช้าลงและชัดขึ้น แล้วลองฟังเสียงตัวอย่างอีกครั้ง"];
}

function renderFeedback(transcript, match) {
  const [title, message] = feedbackFor(match.score);
  $("matchScore").textContent = match.score;
  $("scoreRing").style.setProperty("--score", `${match.score * 3.6}deg`);
  $("feedbackTitle").textContent = title;
  $("feedbackMessage").textContent = message;
  $("heardText").textContent = `“${transcript}”`;
  $("wordFeedback").replaceChildren(...match.words.map((word, index) => {
    const span = document.createElement("span");
    span.textContent = word;
    if (!match.matched[index]) span.className = "missed";
    return span;
  }));

  const points = Math.round(match.score * (state.attempt === 1 ? 1.2 : 1));
  state.score += points;
  if (match.score >= 75) state.streak += 1;
  else state.streak = 0;
  state.topStreak = Math.max(state.topStreak, state.streak);
  state.results.push({ round: state.index, attempt: state.attempt, score: match.score });
  $("scoreValue").textContent = state.score;
  $("streakValue").textContent = `${state.streak} 🔥`;
  $("feedbackPanel").hidden = false;
  $("roundActions").hidden = false;
  $("retryButton").hidden = state.attempt >= 3 || match.score >= 95;
  $("nextButton").textContent = state.index === state.items.length - 1 ? "ดูผลการฝึก →" : "ไปข้อต่อไป →";
}

function renderRound() {
  const item = state.items[state.index];
  $("missionName").textContent = PACKS[state.selectedPack].name;
  $("roundNumber").textContent = state.index + 1;
  $("roundTotal").textContent = state.items.length;
  $("progressFill").style.width = `${((state.index + 1) / state.items.length) * 100}%`;
  $("attemptNumber").textContent = state.attempt;
  $("targetPhrase").textContent = item.text;
  $("phoneticText").textContent = item.phonetic;
  $("thaiMeaning").textContent = item.thai;
  $("coachTip").textContent = item.tip;
  $("feedbackPanel").hidden = true;
  $("roundActions").hidden = true;
  $("retryButton").hidden = false;
  $("micButton").disabled = !SpeechRecognition;
  $("micTitle").textContent = SpeechRecognition ? "กดไมโครโฟนแล้วพูดตาม" : "เบราว์เซอร์นี้ยังไม่รองรับ";
  $("micHelp").textContent = SpeechRecognition
    ? "เมื่อเบราว์เซอร์ถาม กรุณากดอนุญาตใช้ไมโครโฟน"
    : "กรุณาเปิดหน้านี้ด้วย Chrome หรือ Edge รุ่นล่าสุด";
}

function startGame() {
  state.items = [...PACKS[state.selectedPack].items];
  state.index = 0;
  state.attempt = 1;
  state.score = 0;
  state.streak = 0;
  state.topStreak = 0;
  state.results = [];
  $("scoreValue").textContent = "0";
  $("streakValue").textContent = "0 🔥";
  showScreen($("gameScreen"));
  renderRound();
  setTimeout(() => speak(state.items[0].text), 450);
}

function retryRound() {
  if (state.attempt >= 3) return;
  state.attempt += 1;
  $("attemptNumber").textContent = state.attempt;
  $("feedbackPanel").hidden = true;
  $("roundActions").hidden = true;
  speak(state.items[state.index].text);
}

function nextRound() {
  state.recognition?.abort();
  if (state.index >= state.items.length - 1) {
    showSummary();
    return;
  }
  state.index += 1;
  state.attempt = 1;
  renderRound();
  speak(state.items[state.index].text);
}

function showSummary() {
  const roundBestScores = state.items.map((_, round) => {
    const scores = state.results.filter((result) => result.round === round).map((result) => result.score);
    return scores.length ? Math.max(...scores) : 0;
  });
  const bestMatch = Math.max(...roundBestScores, 0);
  const best = Math.max(getBest(), state.score);
  localStorage.setItem("speakQuestBest", best);
  $("finalScore").textContent = state.score;
  $("bestMatch").textContent = `${bestMatch}%`;
  $("topStreak").textContent = state.topStreak;
  $("summaryMessage").textContent = bestMatch >= 90
    ? "ชัดเจนมาก! ครั้งที่ดีที่สุดของเราจับคู่ได้เกือบครบทุกคำ"
    : "ทุกครั้งที่ลองพูดช่วยเพิ่มความมั่นใจ ฟัง สังเกต แล้วลองต่อไปนะ";
  showScreen($("summaryScreen"));
}

function showIntro() {
  state.recognition?.abort();
  window.speechSynthesis?.cancel();
  $("introBest").textContent = getBest();
  showScreen($("introScreen"));
}

document.querySelectorAll(".mission-option").forEach((button) => {
  button.addEventListener("click", () => {
    state.selectedPack = button.dataset.pack;
    document.querySelectorAll(".mission-option").forEach((option) => {
      const selected = option === button;
      option.classList.toggle("is-selected", selected);
      option.setAttribute("aria-pressed", String(selected));
    });
  });
});

$("startButton").addEventListener("click", startGame);
$("listenButton").addEventListener("click", () => speak(state.items[state.index].text));
$("micButton").addEventListener("click", startListening);
$("retryButton").addEventListener("click", retryRound);
$("nextButton").addEventListener("click", nextRound);
$("playAgainButton").addEventListener("click", startGame);
$("homeButton").addEventListener("click", showIntro);
$("soundToggle").addEventListener("click", () => {
  state.sound = !state.sound;
  $("soundToggle").textContent = state.sound ? "🔊" : "🔇";
  $("soundToggle").setAttribute("aria-pressed", String(state.sound));
  if (!state.sound) window.speechSynthesis?.cancel();
});
function updateThemeButton() {
  const isDark = document.documentElement.classList.contains("dark");
  $("themeToggle").textContent = isDark ? "🌙" : "☀️";
  $("themeToggle").setAttribute("aria-label", isDark ? "เปลี่ยนเป็นโหมดสว่าง" : "เปลี่ยนเป็นโหมดมืด");
}
$("themeToggle").addEventListener("click", () => {
  const isDark = document.documentElement.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  updateThemeButton();
});
$("dialectSelect").addEventListener("change", (event) => {
  state.dialect = event.target.value;
  if (state.recognition) state.recognition.lang = state.dialect;
});

document.addEventListener("keydown", (event) => {
  if (event.key.toLowerCase() === "m" && $("gameScreen").classList.contains("is-active") && !event.repeat) {
    event.preventDefault();
    startListening();
  }
});

if (!SpeechRecognition) {
  $("supportNote").textContent = "การตรวจจับเสียงทำงานได้ดีที่สุดใน Chrome หรือ Edge รุ่นล่าสุด";
}
updateThemeButton();
$("introBest").textContent = getBest();
