// จัดการ DOM/HUD ทั้งหมดของเกม (v2)

const $ = (id) => document.getElementById(id);
const fmt = (n) => Math.round(n).toLocaleString('en-US');

export function mmss(sec) {
  const s = Math.max(0, Math.ceil(sec));
  const m = Math.floor(s / 60);
  return `${m}:${String(s % 60).padStart(2, '0')}`;
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export class UI {
  constructor() {
    this.d = {
      hud: $('hud'),
      score: $('scoreValue'),
      combo: $('comboChip'),
      crystals: $('crystalCount'),
      timer: $('timerValue'),
      zone: $('zoneChip'),
      hearts: $('hearts'),
      trackFill: $('trackFill'),
      trackLabel: $('trackLabel'),
      quizCard: $('quizCard'),
      quizTag: $('quizTag'),
      btnSpeakQuiz: $('btnSpeakQuiz'),
      quizQuestion: $('quizQuestion'),
      quizOptions: $('quizOptions'),
      feedback: $('feedback'),
      feedbackTitle: $('feedbackTitle'),
      feedbackWhy: $('feedbackWhy'),
      floaters: $('floaters'),
      tip: $('tipStrip'),
      bossBanner: $('bossBanner'),
      warn: $('warnGlow'),
      menu: $('screenMenu'),
      pause: $('screenPause'),
      pauseInfo: $('pauseInfo'),
      summary: $('screenSummary'),
      countdown: $('countdown'),
      cdNum: $('cdNum'),
      stars: $('summaryStars'),
      summaryTitle: $('summaryTitle'),
      summaryScore: $('summaryScore'),
      newBest: $('newBest'),
      statCorrect: $('statCorrect'),
      statAccuracy: $('statAccuracy'),
      statCrystals: $('statCrystals'),
      statTime: $('statTime'),
      knowledgePct: $('knowledgePct'),
      knowledgeBar: $('knowledgeBar'),
      kdKnowledge: $('kdKnowledge'),
      kdRunner: $('kdRunner'),
      kdBonus: $('kdBonus'),
      topicList: $('topicList'),
      reviewList: $('reviewList'),
      nextGoal: $('nextGoal'),
      bestMenu: $('bestScoreMenu'),
      walletMenu: $('walletMenu'),
      shopWallet: $('shopWallet'),
      shopGrid: $('shopGrid'),
      boardList: $('boardList'),
      boardTabs: $('boardTabs'),
      loader: $('loader'),
      fatal: $('fatal'),
      fatalMsg: $('fatalMsg'),
      touch: $('touchControls'),
      flash: $('flash'),
      btnSound: $('btnSound'),
      zoneClear: $('zoneClear'),
      zcTitle: $('zcTitle'),
      zcStats: $('zcStats'),
      zcBar: $('zcBar'),
      modeRow: $('modeRow'),
      teacherToggle: $('teacherToggle'),
      dailyToggle: $('dailyToggle'),
    };
    this._last = {};
    this._fbTimer = null;
    this._tipTimer = null;
    this.setHearts(3, 3);
  }

  hasTouch() {
    return window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
  }

  showTouchControls(v) {
    this.d.touch.hidden = !v;
  }

  setHearts(n, max = 3) {
    const html = [];
    for (let i = 0; i < max; i++) html.push(`<span class="heart ${i < n ? '' : 'lost'}">❤</span>`);
    this.d.hearts.innerHTML = html.join('');
  }

  setMode(modeId) {
    for (const b of this.d.modeRow.querySelectorAll('.mode-btn')) {
      b.classList.toggle('is-active', b.dataset.mode === modeId);
    }
  }

  setTeacher(on) {
    this.d.teacherToggle.setAttribute('aria-pressed', String(!!on));
  }

  setDaily(on) {
    this.d.dailyToggle.setAttribute('aria-pressed', String(!!on));
  }

  setBest(score) {
    this.d.bestMenu.textContent = score ? fmt(score) : '—';
  }

  setWallet(n) {
    this.d.walletMenu.textContent = fmt(n);
    this.d.shopWallet.textContent = fmt(n);
  }

  setSound(on) {
    this.d.btnSound.textContent = on ? '🔊' : '🔇';
  }

  textLarge(on) {
    document.body.classList.toggle('text-large', !!on);
  }

  reduceMotion(on) {
    document.body.classList.toggle('reduce-motion', !!on);
  }

  setHUD({ score, combo, timeLeft, crystals, progress, zoneName, hearts }) {
    if (score !== this._last.score) {
      this.d.score.textContent = fmt(score);
      this.d.score.classList.add('bump');
      clearTimeout(this._bumpTimer);
      this._bumpTimer = setTimeout(() => this.d.score.classList.remove('bump'), 130);
      this._last.score = score;
    }
    if (combo !== this._last.combo) {
      this.d.combo.textContent = `x${combo}`;
      this.d.combo.classList.remove('dim', 'pop');
      if (combo > 1) {
        this.d.combo.classList.add('pop');
        clearTimeout(this._comboTimer);
        this._comboTimer = setTimeout(() => this.d.combo.classList.remove('pop'), 220);
      } else {
        this.d.combo.classList.add('dim');
      }
      this._last.combo = combo;
    }
    if (crystals !== this._last.crystals) {
      this.d.crystals.textContent = String(crystals);
      this._last.crystals = crystals;
    }
    const tSec = Math.ceil(timeLeft);
    if (tSec !== this._last.time) {
      this.d.timer.textContent = mmss(timeLeft);
      this.d.timer.classList.toggle('low', timeLeft <= 60);
      this._last.time = tSec;
    }
    if (zoneName !== this._last.zone) {
      this.d.zone.textContent = zoneName;
      this._last.zone = zoneName;
    }
    if (hearts !== undefined && hearts !== this._last.hearts) {
      this.setHearts(hearts, 3);
      this._last.hearts = hearts;
    }
    const pct = Math.max(0, Math.min(100, progress * 100));
    this.d.trackFill.style.width = `${pct.toFixed(2)}%`;
  }

  setTrackLabel(meters, total) {
    this.d.trackLabel.textContent = `${fmt(meters)} / ${fmt(total)} ม.`;
  }

  /* ------------------------------ quiz ------------------------------ */

  showQuiz(q, { boss = false } = {}) {
    this.currentQuiz = q;
    const opts = q.a.map((text, i) => ({ text, ok: i === q.correct }));
    shuffle(opts);
    this.d.quizTag.textContent = q.topic || 'วิทยาศาสตร์';
    this.d.quizCard.classList.toggle('boss', boss);
    this.d.quizQuestion.textContent = q.q;
    if (this.d.btnSpeakQuiz) this.d.btnSpeakQuiz.classList.remove('speaking');
    this.d.quizOptions.innerHTML = '';
    opts.forEach((o, i) => {
      const div = document.createElement('div');
      div.className = `opt opt-${i}`;
      div.innerHTML = `<span class="opt-badge">${i + 1}</span><span>${o.text}</span>`;
      this.d.quizOptions.appendChild(div);
    });
    this.d.quizCard.hidden = false;
    this.d.quizCard.style.animation = 'none';
    void this.d.quizCard.offsetWidth;
    this.d.quizCard.style.animation = '';
    return opts.findIndex((o) => o.ok);
  }

  hideQuiz() {
    this.currentQuiz = null;
    this.d.quizCard.hidden = true;
    this.d.quizCard.classList.remove('boss');
    if (this.d.btnSpeakQuiz) this.d.btnSpeakQuiz.classList.remove('speaking');
  }

  setSpeaking(isSpeaking) {
    if (this.d.btnSpeakQuiz) {
      this.d.btnSpeakQuiz.classList.toggle('speaking', !!isSpeaking);
    }
  }

  bossBanner(on) {
    this.d.bossBanner.hidden = !on;
  }

  warn(on) {
    this.d.warn.classList.toggle('on', !!on);
  }

  feedback(good, title, why, ms = 2400) {
    const f = this.d.feedback;
    f.hidden = false;
    f.classList.toggle('good', good);
    f.classList.toggle('bad', !good);
    this.d.feedbackTitle.textContent = title;
    this.d.feedbackWhy.textContent = why || '';
    this.d.feedbackWhy.hidden = !why;
    f.style.animation = 'none';
    void f.offsetWidth;
    f.style.animation = '';
    clearTimeout(this._fbTimer);
    this._fbTimer = setTimeout(() => { f.hidden = true; }, ms);
  }

  floater(text, cls = '') {
    const el = document.createElement('div');
    el.className = `floater ${cls}`;
    el.textContent = text;
    el.style.left = `${5 + Math.random() * 9}%`;
    el.style.top = `${12 + Math.random() * 5}%`;
    this.d.floaters.appendChild(el);
    setTimeout(() => el.remove(), 950);
  }

  flash() {
    const f = this.d.flash;
    f.classList.add('on');
    setTimeout(() => f.classList.remove('on'), 90);
  }

  tip(text, ms = 2600) {
    const t = this.d.tip;
    t.textContent = text;
    t.classList.add('show');
    clearTimeout(this._tipTimer);
    this._tipTimer = setTimeout(() => t.classList.remove('show'), ms);
  }

  countdown(n) {
    const cd = this.d.countdown;
    cd.classList.remove('is-hidden');
    this.d.cdNum.textContent = n;
    this.d.cdNum.style.animation = 'none';
    void this.d.cdNum.offsetWidth;
    this.d.cdNum.style.animation = '';
  }

  hideCountdown() {
    this.d.countdown.classList.add('is-hidden');
  }

  /* ----------------------------- screens ---------------------------- */

  showScreen(name) {
    this.d.menu.classList.toggle('is-hidden', name !== 'menu');
    this.d.pause.classList.toggle('is-hidden', name !== 'pause');
    this.d.summary.classList.toggle('is-hidden', name !== 'summary');
    this.d.hud.classList.toggle('is-hidden', name === 'menu' || name === 'summary');
  }

  showModal(id) {
    document.getElementById(id)?.classList.remove('is-hidden');
  }

  hideModal(id) {
    document.getElementById(id)?.classList.add('is-hidden');
  }

  closeModals() {
    for (const id of ['modalShop', 'modalBoard', 'modalSettings', 'modalCustomQuestions']) this.hideModal(id);
  }

  anyModalOpen() {
    return ['modalShop', 'modalBoard', 'modalSettings', 'modalCustomQuestions']
      .some((id) => !document.getElementById(id)?.classList.contains('is-hidden'));
  }

  /* --------------------------- zone clear --------------------------- */

  showZoneClear({ title, answered, correct, score, progress }) {
    this.d.zcTitle.textContent = title;
    this.d.zcStats.textContent = `ตอบถูก ${correct}/${answered} · คะแนนโซน ${fmt(score)}`;
    this.d.zoneClear.classList.remove('is-hidden');
    this.d.zcBar.style.width = '0%';
    requestAnimationFrame(() => {
      this.d.zcBar.style.width = `${Math.round(Math.max(0.04, progress) * 100)}%`;
    });
  }

  hideZoneClear() {
    this.d.zoneClear.classList.add('is-hidden');
  }

  /* ---------------------------- summary ----------------------------- */

  showSummary(data) {
    const full = data.stars;
    const offCount = 3 - full;
    this.d.stars.innerHTML =
      '★'.repeat(full) + (offCount > 0 ? `<span class="off">${'★'.repeat(offCount)}</span>` : '');
    this.d.summaryTitle.textContent = data.title;
    this.d.summaryScore.textContent = fmt(data.score);
    this.d.newBest.classList.toggle('is-hidden', !data.newBest);
    this.d.statCorrect.textContent = `${data.correct}/${data.total}`;
    this.d.statAccuracy.textContent = `${Math.round(data.accuracy * 100)}%`;
    this.d.statCrystals.textContent = fmt(data.crystals);
    this.d.statTime.textContent = mmss(data.timeUsed);

    this.d.knowledgePct.textContent = `${Math.round(data.accuracy * 100)}%`;
    this.d.knowledgeBar.style.width = '0%';
    requestAnimationFrame(() => {
      this.d.knowledgeBar.style.width = `${Math.round(data.accuracy * 100)}%`;
    });
    this.d.kdKnowledge.textContent = fmt(data.knowledge);
    this.d.kdRunner.textContent = fmt(data.runner);
    this.d.kdBonus.textContent = fmt(data.bonus);

    // topics
    this.d.topicList.innerHTML = '';
    for (const t of data.topics) {
      const li = document.createElement('li');
      if (t.pct < 0.6) li.classList.add('weak');
      li.innerHTML = `${t.topic}<span>${t.correct}/${t.total}</span>`;
      this.d.topicList.appendChild(li);
    }
    this.d.topicList.parentElement.classList.toggle('is-hidden', data.topics.length === 0);

    // missed
    this.d.reviewList.innerHTML = '';
    if (!data.missed.length) {
      const li = document.createElement('li');
      li.className = 'review-empty';
      li.textContent = 'ยอดเยี่ยม! ตอบถูกทุกข้อ 🎉';
      li.style.borderLeftColor = '#7dfab4';
      this.d.reviewList.appendChild(li);
    } else {
      for (const m of data.missed) {
        const li = document.createElement('li');
        li.innerHTML = `${m.q}<b>เฉลย: ${m.answer}</b><span>${m.why}</span>`;
        this.d.reviewList.appendChild(li);
      }
    }

    this.d.nextGoal.textContent = data.nextGoal || '';
    this.d.nextGoal.classList.toggle('is-hidden', !data.nextGoal);

    this.showScreen('summary');
  }

  /* ------------------------------ shop ------------------------------ */

  renderShop({ items, wallet, onBuy, onEquip }) {
    this.d.shopWallet.textContent = fmt(wallet);
    this.d.shopGrid.innerHTML = '';
    for (const it of items) {
      const el = document.createElement('div');
      el.className = `shop-item ${it.owned ? 'owned' : ''} ${it.equipped ? 'equipped' : ''}`;
      const label = it.equipped
        ? 'ใช้อยู่'
        : it.owned
          ? 'สวมใส่'
          : `💎 ${fmt(it.cost)} ปลดล็อก`;
      el.innerHTML = `
        <div class="si-top">
          <span class="si-emoji">${it.emoji}</span><span class="si-name">${it.name}</span>
          <span class="si-swatches"><i style="background:${it.hat}"></i><i style="background:${it.bag}"></i></span>
        </div>
        <div class="si-desc">${it.desc}</div>
        <button class="si-btn" ${it.equipped ? 'disabled' : ''}>${label}</button>`;
      const btn = el.querySelector('button');
      btn.addEventListener('click', () => {
        if (it.equipped) return;
        if (it.owned) onEquip(it.id);
        else onBuy(it.id);
      });
      this.d.shopGrid.appendChild(el);
    }
  }

  /* ------------------------------ board ----------------------------- */

  renderBoard(entries, tab) {
    for (const b of this.d.boardTabs.querySelectorAll('.board-tab')) {
      b.classList.toggle('is-active', b.dataset.tab === tab);
    }
    this.d.boardList.innerHTML = '';
    if (!entries.length) {
      const li = document.createElement('li');
      li.className = 'board-empty';
      li.textContent = 'ยังไม่มีคะแนน — ออกไปวิ่งกันเลย!';
      this.d.boardList.appendChild(li);
      return;
    }
    entries.forEach((e, i) => {
      const li = document.createElement('li');
      const modeLabel = e.mode === 'short' ? '3 นาที' : e.mode === 'normal' ? '6 นาที' : '10 นาที';
      li.innerHTML = `
        <span class="rank">${i + 1}</span>
        <span>${e.name || 'นักสำรวจ'}
          <span class="bmeta">${modeLabel}${e.daily ? ' · โหมดวันนี้' : ''} · ถูก ${Math.round((e.accuracy || 0) * 100)}% · ${e.dateLabel || ''}</span>
        </span>
        <span class="bscore">${fmt(e.score)}</span>`;
      this.d.boardList.appendChild(li);
    });
  }

  setBoardTab(tab) {
    for (const b of this.d.boardTabs.querySelectorAll('.board-tab')) {
      b.classList.toggle('is-active', b.dataset.tab === tab);
    }
  }

  boardLoading(text = 'กำลังโหลด…') {
    this.d.boardList.innerHTML = `<li class="board-empty">${text}</li>`;
  }

  setPauseInfo(text) {
    this.d.pauseInfo.textContent = text;
  }

  hideLoader() {
    this.d.loader.classList.add('done');
    setTimeout(() => this.d.loader.classList.add('is-hidden'), 500);
  }

  fatal(msg) {
    this.d.loader.classList.add('is-hidden');
    this.d.fatal.classList.remove('is-hidden');
    if (msg) this.d.fatalMsg.textContent = msg;
  }
}
