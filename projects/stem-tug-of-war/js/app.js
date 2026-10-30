/* STEM Tug of War — Browser UI for apisit-man.github.io.
   Designed for Dr. Apisit Tongchai's Personal Learning & Research Website.
   Supports Tailwind CSS, Dark/Light Themes, Lucide Icons, and Web Audio.
*/
(function () {
'use strict';
const Core = window.TugCore;
const CATEGORIES = window.STEM_CATEGORIES;
const BUILTINS = window.STEM_BUILTIN_QUESTIONS;
const byId = id => document.getElementById(id);
const TEAM_NAMES = {blue:'ทีมสีน้ำเงิน', red:'ทีมสีแดง'};
const DIFFICULTY = {easy:'พื้นฐาน', medium:'ปานกลาง', hard:'ท้าทาย'};
const STORAGE = 'stem-tug-of-war-questions-v2';
const AUDIO_STORAGE = 'stem-tug-of-war-audio-v1';
const ANSWER_LOCK_MS = 560;

let questions = loadQuestions();
let muted = safeStorageGet(AUDIO_STORAGE) === 'off';
let activeScreen = 'home';
let audioContext = null;
let dialogEditingId = null;
let countdown = null;
let resultDelay = null;
let game = null;

function safeStorageGet(k) { try { return localStorage.getItem(k); } catch (_) { return null; } }
function safeStorageSet(k,v) { try { localStorage.setItem(k,v); return true; } catch (_) { return false; } }

function loadQuestions() {
  try {
    const raw = JSON.parse(safeStorageGet(STORAGE) || 'null');
    if (Array.isArray(raw) && raw.length && raw.every(q => !Core.validateQuestion(q))) return raw;
  } catch (_) {}
  return BUILTINS.map(q => ({...q, choices: q.choices.slice()}));
}

function saveQuestions() {
  if (!safeStorageSet(STORAGE, JSON.stringify(questions))) {
    toast('ไม่สามารถบันทึกข้อมูลในเบราว์เซอร์ กรุณาส่งออก JSON เพื่อเก็บไว้', true);
  }
}

function esc(v) {
  return String(v ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

function $all(sel, scope = document) {
  return Array.from(scope.querySelectorAll(sel));
}

function categoryInfo(id) {
  return CATEGORIES.find(c => c.id === id) || CATEGORIES[0];
}

function toast(msg, error = false) {
  const el = document.createElement('div');
  el.className = 'toast' + (error ? ' error' : '');
  el.textContent = msg;
  byId('toast-container').appendChild(el);
  setTimeout(() => el.remove(), 3400);
}

function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function updateThemeIcons() {
  const isDark = document.documentElement.classList.contains('dark');
  const lightIcon = byId('theme-toggle-light-icon');
  const darkIcon = byId('theme-toggle-dark-icon');
  if (lightIcon && darkIcon) {
    lightIcon.classList.toggle('hidden', !isDark);
    darkIcon.classList.toggle('hidden', isDark);
  }
}

function toggleTheme() {
  const isDark = document.documentElement.classList.toggle('dark');
  safeStorageSet('theme', isDark ? 'dark' : 'light');
  updateThemeIcons();
  toast(isDark ? 'เปิดโหมดมืด (Dark Mode)' : 'เปิดโหมดสว่าง (Light Mode)');
}

function showScreen(name) {
  for (const s of $all('.screen')) {
    const active = s.id === 'screen-' + name;
    s.classList.toggle('is-active', active);
    s.classList.toggle('hidden', !active);
    s.hidden = !active;
  }
  activeScreen = name;
  window.scrollTo(0, 0);
  if (name === 'studio') renderStudio();
  if (name === 'setup') updateSetupQuestionCount();
  refreshIcons();
}

function initControls() {
  byId('hero-illustration').innerHTML = drawScene('home');
  byId('arena-illustration').innerHTML = drawScene('arena');
  
  byId('home-play').addEventListener('click', () => showScreen('setup'));
  byId('home-studio').addEventListener('click', () => showScreen('studio'));
  byId('go-home').addEventListener('click', () => {
    if (activeScreen === 'battle' && game?.phase === 'playing' && !confirm('ต้องการออกจากการแข่งขันหรือไม่? ผลรอบปัจจุบันจะไม่ถูกบันทึก')) return;
    stopCountdown();
    showScreen('home');
  });
  byId('setup-back').addEventListener('click', () => showScreen('home'));
  byId('studio-back').addEventListener('click', () => showScreen('home'));
  
  byId('header-sound').addEventListener('click', toggleSound);
  byId('header-fullscreen').addEventListener('click', toggleFullscreen);
  
  const themeToggle = byId('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  byId('setup-categories').innerHTML = CATEGORIES.map(c => `
    <label class="category-option p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 flex items-center gap-3 cursor-pointer select-none transition-all hover:border-brand-500">
      <input type="checkbox" value="${c.id}" checked class="accent-brand-600 w-4 h-4 rounded">
      <span class="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
        <span>${c.icon}</span> <span>${esc(c.name)}</span>
      </span>
    </label>
  `).join('');

  $all('#setup-categories input').forEach(el => el.addEventListener('change', updateSetupQuestionCount));
  byId('setup-difficulty').addEventListener('change', updateSetupQuestionCount);
  byId('setup-start').addEventListener('click', startMatch);
  
  byId('battle-pause').addEventListener('click', () => {
    if (game?.phase === 'paused') resumeGame(); else pauseGame();
  });
  byId('battle-resume').addEventListener('click', resumeGame);
  byId('battle-exit').addEventListener('click', () => {
    if (!confirm('ออกจากเกมและกลับหน้าแรก? ผลการแข่งขันปัจจุบันจะหายไป')) return;
    stopCountdown();
    game = null;
    showScreen('home');
  });

  byId('result-next').addEventListener('click', () => {
    if (!game) return;
    if (Core.isMatchOver(game.wins)) {
      startMatchWithConfig(game.config);
    } else {
      startRound();
    }
  });
  byId('result-home').addEventListener('click', () => {
    game = null;
    showScreen('home');
  });

  for (const team of ['blue', 'red']) {
    byId(team + '-answers').addEventListener('click', e => {
      const btn = e.target.closest('button[data-choice]');
      if (btn) submitAnswer(team, Number(btn.dataset.choice));
    });
  }

  initStudioControls();
  updateSoundIcon();
  updateThemeIcons();
  updateSetupQuestionCount();
  refreshIcons();
}

function toggleSound() {
  muted = !muted;
  safeStorageSet(AUDIO_STORAGE, muted ? 'off' : 'on');
  updateSoundIcon();
  toast(muted ? 'ปิดเสียงเกมแล้ว' : 'เปิดเสียงเกมแล้ว');
}

function updateSoundIcon() {
  const btn = byId('header-sound');
  if (!btn) return;
  btn.innerHTML = muted 
    ? '<i data-lucide="volume-x" class="w-4 h-4 sm:w-5 sm:h-5"></i>' 
    : '<i data-lucide="volume-2" class="w-4 h-4 sm:w-5 sm:h-5"></i>';
  btn.title = muted ? 'เปิดเสียง' : 'ปิดเสียง';
  refreshIcons();
}

async function toggleFullscreen() {
  try {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await document.documentElement.requestFullscreen();
    }
  } catch (_) {
    toast('เบราว์เซอร์นี้ไม่รองรับการเปิดเต็มหน้าจอ', true);
  }
}

function beep(type) {
  if (muted) return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    if (!audioContext) audioContext = new AudioCtx();
    if (audioContext.state === 'suspended') audioContext.resume();
    
    const now = audioContext.currentTime;
    const notes = type === 'correct' ? [540, 760] :
                  type === 'wrong' ? [270, 215] :
                  type === 'win' ? [420, 560, 700, 940] :
                  type === 'tick' ? [600] : [420, 520];
                  
    notes.forEach((freq, i) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      const start = now + i * (type === 'win' ? 0.11 : 0.07);
      osc.type = type === 'wrong' ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.06, start + 0.016);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.13);
      osc.connect(gain).connect(audioContext.destination);
      osc.start(start);
      osc.stop(start + 0.14);
    });
  } catch (_) {}
}

function chosenCategories() {
  return $all('#setup-categories input:checked').map(el => el.value);
}

function updateSetupQuestionCount() {
  const cats = chosenCategories();
  const diff = byId('setup-difficulty').value;
  const count = questions.filter(q => cats.includes(q.category) && (diff === 'mixed' || q.difficulty === diff)).length;
  byId('setup-question-count').textContent = `📚 มีโจทย์ที่เลือก ${count} ข้อ · ${cats.length} หมวด`;
  byId('setup-start').disabled = count < 2;
}

function startMatch() {
  const cats = chosenCategories();
  if (!cats.length) {
    toast('กรุณาเลือกอย่างน้อยหนึ่งหมวด', true);
    return;
  }
  const difficulty = byId('setup-difficulty').value;
  const available = questions.filter(q => cats.includes(q.category) && (difficulty === 'mixed' || q.difficulty === difficulty));
  if (available.length < 2) {
    toast('ต้องมีอย่างน้อย 2 คำถามในหมวดที่เลือก', true);
    return;
  }
  const config = {
    categories: cats,
    difficulty,
    names: {
      blue: byId('team-blue-name').value.trim() || TEAM_NAMES.blue,
      red: byId('team-red-name').value.trim() || TEAM_NAMES.red
    }
  };
  startMatchWithConfig(config);
}

function startMatchWithConfig(config) {
  stopCountdown();
  game = {
    config,
    wins: { blue: 0, red: 0 },
    round: 0,
    position: 0,
    phase: 'idle',
    side: {},
    roundResult: null
  };
  startRound();
}

function createSide(qs) {
  return { queue: qs, index: 0, question: null, locked: false, correct: 0, incorrect: 0, history: [] };
}

function nextQuestion(team) {
  if (!game || game.phase !== 'playing') return;
  const side = game.side[team];
  if (side.index >= side.queue.length) {
    const additional = Core.createRoundQueues(questions, game.config.categories, game.config.difficulty, Math.random);
    side.queue.push(...additional[team]);
  }
  side.question = side.queue[side.index++];
  side.locked = false;
  renderQuestion(team);
}

function startRound() {
  stopCountdown();
  if (!game) return;
  let decks;
  try {
    decks = Core.createRoundQueues(questions, game.config.categories, game.config.difficulty, Math.random);
  } catch (e) {
    toast(e.message, true);
    showScreen('setup');
    return;
  }
  game.round++;
  game.position = 0;
  game.phase = 'playing';
  game.timeLeftMs = 60000;
  game.deadline = performance.now() + 60000;
  game.side = {
    blue: createSide(decks.blue),
    red: createSide(decks.red)
  };
  
  byId('hud-blue-name').textContent = game.config.names.blue;
  byId('hud-red-name').textContent = game.config.names.red;
  byId('blue-team-label').textContent = game.config.names.blue;
  byId('red-team-label').textContent = game.config.names.red;
  byId('battle-round').textContent = `ROUND ${game.round}`;
  
  updateWinSymbols();
  updatePosition(0);
  updateTimer();
  
  const shade = byId('battle-shade');
  shade.hidden = true;
  shade.classList.add('hidden');
  byId('battle-pause').innerHTML = '<i data-lucide="pause" class="w-3.5 h-3.5"></i><span>หยุดชั่วคราว</span>';
  
  showScreen('battle');
  nextQuestion('blue');
  nextQuestion('red');
  countdown = setInterval(tick, 80);
  beep('start');
  refreshIcons();
}

function tick() {
  if (!game || game.phase !== 'playing') return;
  game.timeLeftMs = Math.max(0, game.deadline - performance.now());
  updateTimer();
  if (game.timeLeftMs <= 0) finishRound('time');
}

function updateTimer() {
  const whole = Math.ceil(Math.max(0, game?.timeLeftMs ?? 60000) / 1000);
  byId('battle-timer').textContent = `${String(Math.floor(whole / 60)).padStart(2, '0')}:${String(whole % 60).padStart(2, '0')}`;
  const warning = whole <= 10 && game?.phase === 'playing';
  byId('battle-timer').closest('.timer-box').classList.toggle('danger', warning);
}

function stopCountdown() {
  if (countdown) { clearInterval(countdown); countdown = null; }
  if (resultDelay) { clearTimeout(resultDelay); resultDelay = null; }
}

function updateWinSymbols() {
  for (const team of ['blue', 'red']) {
    byId(`hud-${team}-wins`).textContent = Array.from({length: 2}, (_, i) => i < game.wins[team] ? '★' : '☆').join(' ');
  }
}

function updatePosition(position) {
  if (!game) return;
  game.position = position;
  byId('meter-marker').style.left = `${(position + Core.LIMIT) / (2 * Core.LIMIT) * 100}%`;
  const moving = byId('arena-moving');
  if (moving) moving.style.transform = `translateX(${position / Core.LIMIT * 78}px)`;
  
  const arena = byId('arena');
  arena.classList.toggle('rope-blue', position < 0);
  arena.classList.toggle('rope-red', position > 0);
  
  const msg = position === 0 
    ? 'เสมอกัน! เชือกอยู่กึ่งกลาง' 
    : `ทีม${game.config.names[position < 0 ? 'blue' : 'red']} กำลังนำ ${(Math.abs(position) / 2).toFixed(1).replace('.0', '')} ระดับ`;
  byId('rope-message').textContent = msg;
}

function renderQuestion(team) {
  const side = game.side[team], q = side.question;
  const cat = categoryInfo(q.category);
  byId(team + '-category').textContent = `${cat.icon} ${cat.name}`;
  byId(team + '-difficulty').textContent = DIFFICULTY[q.difficulty];
  byId(team + '-question').textContent = q.question;
  
  const order = Core.seededShuffle([0, 1, 2, 3], Math.random);
  byId(team + '-answers').innerHTML = order.map((i, k) => `
    <button type="button" class="answer-btn p-3 rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-100 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 text-center active:scale-95 transition-all cursor-pointer shadow-sm min-h-[75px]" data-choice="${i}" aria-label="ตัวเลือก ${'ABCD'[k]}: ${esc(q.choices[i])}">
      <span class="font-mono text-xs opacity-60 font-bold">${'ABCD'[k]}.</span>
      <span>${esc(q.choices[i])}</span>
    </button>
  `).join('');
  
  byId(team + '-feedback').className = 'quiz-feedback py-2 px-3 rounded-xl text-center text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100/70 dark:bg-slate-800/70';
  byId(team + '-feedback').textContent = 'แตะคำตอบเพื่อดึงเชือก!';
  byId('quiz-' + team).classList.remove('is-locked');
  updateTeamStats(team);
}

function updateTeamStats(team) {
  const s = game.side[team];
  byId(team + '-stats').textContent = `✓ ${s.correct} · × ${s.incorrect}`;
}

function submitAnswer(team, index) {
  if (!game || game.phase !== 'playing') return;
  if (performance.now() >= game.deadline) {
    game.timeLeftMs = 0;
    finishRound('time');
    return;
  }
  const s = game.side[team];
  if (!s || s.locked || !s.question) return;
  s.locked = true;
  
  const q = s.question, correct = index === q.correctIndex;
  if (correct) s.correct++; else s.incorrect++;
  
  s.history.push({
    id: q.id,
    question: q.question,
    chosenIndex: index,
    correctIndex: q.correctIndex,
    choices: q.choices.slice(),
    explanation: q.explanation,
    category: q.category,
    correct
  });
  
  const old = game.position;
  const newPos = Core.moveForAnswer(old, team, correct);
  updatePosition(newPos);
  updateTeamStats(team);
  
  byId('quiz-' + team).classList.add('is-locked');
  const chosen = byId(team + '-answers').querySelector(`[data-choice="${index}"]`);
  if (chosen) chosen.classList.add(correct ? 'right' : 'wrong');
  
  const info = byId(team + '-feedback');
  info.className = 'quiz-feedback py-2 px-3 rounded-xl text-center text-xs font-bold ' + (correct ? 'good' : 'bad');
  info.textContent = correct ? '✓ ถูกต้อง! ดึงเชือก +1 ระดับ' : '× ยังไม่ถูก เสียแรงดึง 0.5 ระดับ';
  beep(correct ? 'correct' : 'wrong');
  
  if (Core.hasReachedGoal(newPos)) {
    finishRound('goal');
    return;
  }
  setTimeout(() => {
    if (game && game.phase === 'playing' && game.side[team] === s) nextQuestion(team);
  }, ANSWER_LOCK_MS);
}

function finishRound(reason) {
  if (!game || game.phase !== 'playing') return;
  stopCountdown();
  game.phase = 'result';
  game.timeLeftMs = Math.max(0, game.timeLeftMs);
  const winner = Core.classifyRound(game.position);
  if (winner !== 'tie') game.wins[winner]++;
  
  game.roundResult = {
    winner,
    reason,
    position: game.position,
    round: game.round,
    sides: {
      blue: { ...game.side.blue, history: game.side.blue.history.slice() },
      red: { ...game.side.red, history: game.side.red.history.slice() }
    }
  };
  
  renderResults();
  showScreen('result');
  beep(winner !== 'tie' ? 'win' : 'start');
}

function pauseGame() {
  if (!game || game.phase !== 'playing') return;
  game.timeLeftMs = Math.max(0, game.deadline - performance.now());
  game.phase = 'paused';
  stopCountdown();
  const shade = byId('battle-shade');
  shade.hidden = false;
  shade.classList.remove('hidden');
  byId('battle-pause').innerHTML = '<i data-lucide="play" class="w-3.5 h-3.5"></i><span>เล่นต่อ</span>';
  updateTimer();
  refreshIcons();
}

function resumeGame() {
  const shadeEl = byId('battle-shade');
  shadeEl.hidden = true;
  shadeEl.classList.add('hidden');
  if (!game || game.phase !== 'paused') return;
  game.phase = 'playing';
  game.deadline = performance.now() + game.timeLeftMs;
  const shade = byId('battle-shade');
  shade.hidden = true;
  shade.classList.add('hidden');
  byId('battle-pause').innerHTML = '<i data-lucide="pause" class="w-3.5 h-3.5"></i><span>หยุดชั่วคราว</span>';
  countdown = setInterval(tick, 80);
  refreshIcons();
}

function renderResults() {
  const result = game.roundResult, over = Core.isMatchOver(game.wins), winner = result.winner;
  byId('result-round-label').textContent = `ROUND ${result.round} / ${over ? 'MATCH COMPLETE' : 'MATCH CONTINUES'}`;
  byId('result-emoji').textContent = winner === 'tie' ? '🤝' : '🏆';
  byId('result-caption').textContent = over ? 'MATCH WINNER' : winner === 'tie' ? 'ROUND DRAW' : 'ROUND WINNER';
  byId('result-title').textContent = winner === 'tie' 
    ? 'เสมอกัน! รอบนี้ยังไม่มีผู้ชนะ' 
    : `${game.config.names[winner]}${over ? ' คว้าชัยทั้งเกม!' : ' ชนะรอบนี้!'}`;
  byId('result-subtitle').textContent = over 
    ? 'ชนะครบ 2 รอบแล้ว! ยอดเยี่ยมมาก ทบทวนข้อที่น่าสนใจกัน' 
    : 'ดูผลการแข่งขันและทบทวนข้อผิดพลาดเพื่อเตรียมพร้อมสำหรับรอบต่อไป';
    
  for (const team of ['blue', 'red']) {
    const s = result.sides[team];
    byId('result-' + team + '-name').textContent = game.config.names[team];
    byId('result-' + team + '-correct').textContent = s.correct;
    const n = s.correct + s.incorrect;
    byId('result-' + team + '-details').textContent = `ผิด ${s.incorrect} ข้อ · แม่นยำ ${n ? Math.round(s.correct / n * 100) : 0}% · ชนะ ${game.wins[team]}/2 รอบ`;
  }
  
  byId('result-center-tug').textContent = (result.position / 2 > 0 ? '+' : '') + (result.position / 2).toFixed(1);
  byId('result-next').innerHTML = over 
    ? '<span>↻ แข่งขันใหม่อีกครั้ง</span>' 
    : '<span>เริ่มรอบถัดไป</span><i data-lucide="arrow-right" class="w-4 h-4"></i>';
    
  const wrongs = ['blue', 'red'].flatMap(team => result.sides[team].history.filter(x => !x.correct).map(x => ({ ...x, team }))).slice(0, 40);
  byId('review-count').textContent = `${wrongs.length} ข้อ`;
  
  byId('review-list').innerHTML = wrongs.length ? wrongs.map(x => `
    <div class="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 space-y-2">
      <div class="flex items-center justify-between text-xs">
        <span class="font-bold ${x.team === 'blue' ? 'text-sky-600 dark:text-sky-400' : 'text-rose-600 dark:text-rose-400'}">
          ${esc(game.config.names[x.team])}
        </span>
        <span class="text-slate-400 font-medium">${esc(categoryInfo(x.category).name)}</span>
      </div>
      <p class="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-100 m-0">${esc(x.question)}</p>
      <div class="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">✓ เฉลย: ${esc(x.choices[x.correctIndex])}</div>
      <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pt-1 border-t border-slate-100 dark:border-slate-800 m-0">${esc(x.explanation)}</p>
    </div>
  `).join('') : '<div class="col-span-2 text-center text-sm text-slate-500 dark:text-slate-400 py-6">✨ ยอดเยี่ยมมาก! ทั้งสองทีมไม่มีคำตอบผิดในรอบนี้</div>';
  
  refreshIcons();
}

// ------- Teacher Studio -------
function initStudioControls() {
  for (const c of CATEGORIES) {
    const opt = document.createElement('option');
    opt.value = c.id;
    opt.textContent = `${c.icon} ${c.name}`;
    byId('studio-category-filter').append(opt);
    const opt2 = opt.cloneNode(true);
    byId('q-category').append(opt2);
  }
  
  byId('studio-search').addEventListener('input', renderStudio);
  byId('studio-category-filter').addEventListener('change', renderStudio);
  byId('studio-difficulty-filter').addEventListener('change', renderStudio);
  byId('studio-add').addEventListener('click', () => openQuestionDialog());
  byId('studio-export').addEventListener('click', exportQuestions);
  byId('studio-import').addEventListener('click', () => byId('studio-import-file').click());
  byId('studio-import-file').addEventListener('change', importQuestions);
  
  byId('studio-reset').addEventListener('click', () => {
    if (!confirm('คืนค่าคลังคำถามเริ่มต้นทั้งหมด 100 ข้อ? คำถามที่แก้ไขหรือเพิ่มไว้จะถูกลบออกจากเครื่องนี้')) return;
    questions = BUILTINS.map(q => ({ ...q, choices: q.choices.slice() }));
    saveQuestions();
    renderStudio();
    toast('คืนค่าคลังคำถามเริ่มต้นแล้ว');
  });
  
  byId('studio-list').addEventListener('click', e => {
    const b = e.target.closest('button[data-action]');
    if (!b) return;
    const id = b.dataset.id;
    const action = b.dataset.action;
    if (action === 'edit') openQuestionDialog(id);
    if (action === 'delete') {
      if (!confirm('ลบคำถามนี้ออกจากคลังในเบราว์เซอร์?')) return;
      questions = questions.filter(q => q.id !== id);
      saveQuestions();
      renderStudio();
      toast('ลบคำถามแล้ว');
    }
  });

  byId('dialog-close').addEventListener('click', () => byId('question-dialog').close());
  byId('dialog-cancel').addEventListener('click', () => byId('question-dialog').close());
  byId('question-form').addEventListener('submit', saveQuestionForm);
}

function renderStudio() {
  byId('studio-total').textContent = questions.length;
  const search = byId('studio-search').value.toLocaleLowerCase('th').trim();
  const cat = byId('studio-category-filter').value;
  const diff = byId('studio-difficulty-filter').value;
  
  const found = questions.filter(q => 
    (cat === 'all' || q.category === cat) && 
    (diff === 'all' || q.difficulty === diff) && 
    (!search || `${q.id} ${q.question} ${q.choices.join(' ')}`.toLocaleLowerCase('th').includes(search))
  );
  
  byId('studio-list').innerHTML = found.length ? found.map(q => `
    <article class="question-tile p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 shadow-sm flex flex-col justify-between gap-3">
      <div>
        <div class="flex items-center justify-between text-xs mb-2">
          <span class="font-mono font-bold text-brand-600 dark:text-brand-400">${esc(q.id)}</span>
          <span class="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold text-[10px]">
            ${categoryInfo(q.category).icon} ${esc(categoryInfo(q.category).name)} · ${DIFFICULTY[q.difficulty]}
          </span>
        </div>
        <h4 class="font-bold text-sm text-slate-900 dark:text-white m-0 min-h-[40px] leading-snug">${esc(q.question)}</h4>
        <p class="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-2 mb-0">✓ ${esc(q.choices[q.correctIndex])}</p>
      </div>
      <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
        <button type="button" data-action="edit" data-id="${esc(q.id)}" class="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border-0 cursor-pointer">
          ✎ แก้ไข
        </button>
        <button type="button" data-action="delete" data-id="${esc(q.id)}" class="px-3 py-1.5 rounded-lg text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors border border-rose-200 dark:border-rose-900/50 cursor-pointer bg-transparent">
          × ลบ
        </button>
      </div>
    </article>
  `).join('') : '<div class="col-span-2 text-center py-12 text-sm text-slate-400 border border-dashed border-slate-300 dark:border-slate-800 rounded-3xl">ไม่พบคำถามที่ตรงกับเงื่อนไขการค้นหา</div>';
  
  refreshIcons();
}

function openQuestionDialog(id) {
  dialogEditingId = id || null;
  const q = id ? questions.find(x => x.id === id) : null;
  if (id && !q) {
    toast('ไม่พบคำถาม', true);
    return;
  }
  byId('dialog-title').textContent = q ? 'แก้ไขคำถาม' : 'เพิ่มคำถามใหม่';
  byId('q-text').value = q?.question || '';
  byId('q-category').value = q?.category || 'systems';
  byId('q-difficulty').value = q?.difficulty || 'easy';
  for (let i = 0; i < 4; i++) byId('q-choice-' + i).value = q?.choices[i] || '';
  byId('q-correct').value = String(q?.correctIndex ?? 0);
  byId('q-explanation').value = q?.explanation || '';
  byId('question-dialog').showModal();
  refreshIcons();
}

function saveQuestionForm(e) {
  e.preventDefault();
  const existing = questions.find(q => q.id === dialogEditingId);
  const q = {
    id: existing?.id || `CUSTOM-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    category: byId('q-category').value,
    difficulty: byId('q-difficulty').value,
    question: byId('q-text').value.trim(),
    choices: [0, 1, 2, 3].map(i => byId('q-choice-' + i).value.trim()),
    correctIndex: Number(byId('q-correct').value),
    explanation: byId('q-explanation').value.trim()
  };
  const err = Core.validateQuestion(q);
  if (err) {
    toast(err, true);
    return;
  }
  if (existing) {
    questions = questions.map(item => item.id === existing.id ? q : item);
  } else {
    questions.push(q);
  }
  saveQuestions();
  byId('question-dialog').close();
  renderStudio();
  toast(existing ? 'บันทึกการแก้ไขแล้ว' : 'เพิ่มคำถามใหม่แล้ว');
}

function exportQuestions() {
  const blob = new Blob([JSON.stringify({ format: 'STEM-TUG-QUESTION-BANK', version: 1, questions }, null, 2)], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'stem-tug-questions.json';
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  toast(`ส่งออกคำถาม ${questions.length} ข้อแล้ว`);
}

async function importQuestions(e) {
  const file = e.target.files?.[0];
  e.target.value = '';
  if (!file) return;
  try {
    if (file.size > 3 * 1024 * 1024) throw new Error('ไฟล์ JSON ใหญ่เกิน 3 MB');
    const data = JSON.parse(await file.text());
    const batch = Array.isArray(data) ? data : data?.questions;
    if (!Array.isArray(batch) || !batch.length) throw new Error('ไม่พบรายการคำถามในไฟล์');
    const seen = new Set();
    const cleaned = batch.map((q, i) => {
      const out = {
        id: String(q.id || `IMPORT-${Date.now()}-${i}`),
        question: q.question,
        category: q.category,
        difficulty: q.difficulty,
        choices: q.choices,
        correctIndex: Number(q.correctIndex ?? q.correctAnswer),
        explanation: q.explanation
      };
      const err = Core.validateQuestion(out);
      if (err) throw new Error(`ข้อที่ ${i + 1}: ${err}`);
      if (seen.has(out.id)) throw new Error(`พบรหัสคำถามซ้ำกันในไฟล์: ${out.id}`);
      seen.add(out.id);
      return out;
    });
    const incoming = new Set(cleaned.map(q => q.id));
    questions = [...questions.filter(q => !incoming.has(q.id)), ...cleaned];
    saveQuestions();
    renderStudio();
    toast(`นำเข้าสำเร็จ ${cleaned.length} ข้อ (รหัสซ้ำจะอัปเดตคำถามเดิม)`);
  } catch (err) {
    toast(`นำเข้าไม่สำเร็จ: ${err.message}`, true);
  }
}

// ------- SVG Tug Characters Visuals -------
function person(x, y, color, direction, scale = 1, variant = 0) {
  const skin = variant % 2 ? '#DB9B66' : '#F2BD88';
  const hair = variant % 3 === 0 ? '#172B40' : '#49302D';
  const armX = direction * 29;
  return `
    <g class="tug-person" transform="translate(${x} ${y}) scale(${scale})">
      <ellipse cx="0" cy="72" rx="31" ry="7" fill="#071d30" opacity=".24"/>
      <path d="M-7 40 L-21 66 M8 40 L21 65" fill="none" stroke="#203d60" stroke-width="12" stroke-linecap="round"/>
      <path d="M-21 66 L-30 67 M21 65 L29 68" fill="none" stroke="#faf4e9" stroke-width="8" stroke-linecap="round"/>
      <path d="M-17 3 Q0 -5 18 5 L17 42 Q0 48 -15 40 Z" fill="${color}" stroke="#163c59" stroke-width="2.3"/>
      <path d="M-10 8 L11 33" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".23"/>
      <path d="M${direction === 1 ? 12 : -12} 13 Q${armX} 11 ${armX} 28" stroke="${skin}" stroke-width="10" stroke-linecap="round" fill="none"/>
      <circle cx="${armX}" cy="28" r="6.1" fill="${skin}"/>
      <path d="M${direction === 1 ? -14 : 14} 14 L${direction === 1 ? -22 : 22} 33" stroke="${skin}" stroke-width="9" stroke-linecap="round"/>
      <circle cx="0" cy="-18" r="22" fill="${skin}" stroke="#854e38" stroke-width="1.3"/>
      <path d="M-22 -23 Q-20 -47 3 -42 Q26 -40 23 -19 L17 -29 Q7 -23 0 -33 Q-9 -20 -22 -23Z" fill="${hair}"/>
      <path d="M-17 -23 Q0 -30 17 -23" stroke="${color}" stroke-width="8" stroke-linecap="round" fill="none"/>
      <circle cx="${direction * 7}" cy="-17" r="2.4" fill="#26303b"/>
      <path d="M${direction * 5} -7 q${direction * 7} 6 ${direction * 14} 0" stroke="#91543d" stroke-width="2.1" stroke-linecap="round" fill="none"/>
    </g>
  `;
}

function drawScene(id) {
  const isHome = id === 'home';
  const pscale = isHome ? 1.0 : 1.03;
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 365" role="img" aria-label="ตัวละครสองทีมแข่งขันชักเย่อ">
      <defs>
        <linearGradient id="sky-${id}" x1="0" x2="1">
          <stop stop-color="#369ace"/>
          <stop offset="1" stop-color="#3b657c"/>
        </linearGradient>
        <linearGradient id="floor-${id}" x1="0" x2="1">
          <stop stop-color="#6db3ca"/>
          <stop offset="1" stop-color="#e6ae84"/>
        </linearGradient>
      </defs>
      <circle cx="320" cy="158" r="139" fill="#7c3aed" opacity=".08"/>
      <circle cx="320" cy="158" r="98" fill="none" stroke="#7c3aed" stroke-width="2" opacity=".18" stroke-dasharray="5 8"/>
      <path d="M28 284Q319 258 612 284" fill="none" stroke="#a1ccce" opacity=".3" stroke-width="2"/>
      <ellipse cx="322" cy="300" rx="281" ry="36" fill="url(#floor-${id})" opacity=".20"/>
      <path d="M320 48V315" stroke="#7c3aed" stroke-width="2" opacity=".3" stroke-dasharray="7 8"/>
      <path d="M314 53 L326 53 L320 68 Z" fill="#efc06d"/>
      <g id="${id}-moving" style="transition:transform .34s cubic-bezier(.18,.77,.2,1.15)">
        <path d="M104 207 Q210 202 320 209 T541 206" fill="none" stroke="#4b3833" stroke-width="12" stroke-linecap="round" opacity=".24"/>
        <path d="M104 200 Q210 195 320 202 T541 199" fill="none" stroke="#e0b17c" stroke-width="7" stroke-linecap="round"/>
        <path d="M105 198Q210 193 320 200 T541 197" fill="none" stroke="#f9d5a1" stroke-width="2" stroke-dasharray="5 8" opacity=".8"/>
        ${person(167, 199, '#0284c7', 1, pscale, 0)}
        ${person(231, 201, '#38bdf8', 1, pscale * 0.91, 1)}
        ${person(410, 201, '#fb7185', -1, pscale * 0.93, 2)}
        ${person(475, 198, '#e11d48', -1, pscale, 3)}
        <path d="M319 199L320 243L344 232L321 221Z" fill="#f59e0b" stroke="#ffffff" stroke-width="2"/>
        <circle cx="320" cy="200" r="7" fill="#f59e0b" stroke="#ffffff" stroke-width="2.5"/>
      </g>
      <g font-family="Plus Jakarta Sans, sans-serif" font-weight="900" font-size="18" text-anchor="middle" opacity=".85">
        <text x="112" y="335" fill="#0284c7">BLUE TEAM</text>
        <text x="526" y="335" fill="#e11d48">RED TEAM</text>
      </g>
    </svg>
  `;
}

initControls();
showScreen('home');
})();
