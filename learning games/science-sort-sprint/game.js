const laneEl = document.getElementById('lane');
const startMenuOverlay = document.getElementById('startMenuOverlay');
const gameOverOverlay = document.getElementById('gameOverOverlay');
const overlayMsg = document.getElementById('overlayMsg');
const overlaySub = document.getElementById('overlaySub');
const scoreEl = document.getElementById('score');
const bestEl = document.getElementById('best');
const levelEl = document.getElementById('level');
const livesEl = document.getElementById('lives');
const quitGameBtn = document.getElementById('quitGameBtn');
const catButtons = Array.from(document.querySelectorAll('.cat-btn'));
const reviewList = document.getElementById('reviewList');
const themeToggle = document.getElementById('themeToggle');

let score = 0, best = 0, lives = 3, level = 1, streak = 0, correctCount = 0;
let running = false;
let activeCards = [];
let recentIdx = [];
let mistakes = [];
let spawnIntervalId = null;
let freezeActive = false;

function init() {
    best = parseInt(localStorage.getItem('scienceSortBest') || '0', 10);
    bestEl.textContent = best;
    
    document.getElementById('startMenuBtn').addEventListener('click', startGame);
    document.getElementById('tryAgainBtn').addEventListener('click', startGame);
    quitGameBtn.addEventListener('click', showStartMenu);
    
    catButtons.forEach(btn => btn.addEventListener('click', () => handleAnswer(btn.dataset.cat)));
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        sfx.playCorrect();
    });

    setButtonsEnabled(false);
}

function showStartMenu() {
    stopGame();
    clearCards();
    gameOverOverlay.classList.remove('show');
    startMenuOverlay.classList.add('show');
    quitGameBtn.style.display = 'none';
    setButtonsEnabled(false);
}

function stopGame() {
    running = false;
    if (spawnIntervalId) clearInterval(spawnIntervalId);
}

function startGame() {
    sfx.init();
    score = 0; lives = 3; level = 1; streak = 0; correctCount = 0; 
    mistakes = [];
    activeCards = [];
    running = true;
    freezeActive = false;
    
    updateHud();
    startMenuOverlay.classList.remove('show');
    gameOverOverlay.classList.remove('show');
    quitGameBtn.style.display = 'block';
    setButtonsEnabled(true);
    clearCards();
    
    scheduleNextSpawn();
}

function scheduleNextSpawn() {
    if (!running) return;
    spawnCard();
    // Faster spawn at higher levels
    const delay = Math.max(1200, 3500 - (level * 300));
    spawnIntervalId = setTimeout(scheduleNextSpawn, delay);
}

function updateHud() {
    scoreEl.textContent = score;
    levelEl.textContent = level;
    let hearts = '';
    for (let i = 0; i < 3; i++) hearts += (i < lives) ? '❤️' : '<span class="lost">❤️</span>';
    livesEl.innerHTML = hearts;
    if (score > best) {
        best = score;
        bestEl.textContent = best;
        localStorage.setItem('scienceSortBest', best);
    }
}

function getFallDuration() {
    if (freezeActive) return 8; // Slow down if freeze is active
    const d = 8 - (level * 0.5);
    return Math.max(d, 3.0);
}

function pickFact() {
    // 15% chance for a trick card at level >= 3
    if (level >= 3 && Math.random() < 0.15) {
        return gameData.trickCards[Math.floor(Math.random() * gameData.trickCards.length)];
    }

    let idx;
    do {
        idx = Math.floor(Math.random() * gameData.facts.length);
    } while (recentIdx.includes(idx) && recentIdx.length < gameData.facts.length - 2);
    
    recentIdx.push(idx);
    if (recentIdx.length > 10) recentIdx.shift();
    
    let fact = { ...gameData.facts[idx] };
    
    // Powerups (10% double, 5% freeze)
    if (Math.random() < 0.1) fact.powerup = 'DOUBLE';
    else if (Math.random() < 0.05) fact.powerup = 'FREEZE';
    
    return fact;
}

function clearCards() {
    const existing = laneEl.querySelectorAll('.card');
    existing.forEach(el => el.remove());
    activeCards = [];
}

function spawnCard() {
    if (!running) return;
    const fact = pickFact();
    const card = document.createElement('div');
    card.className = 'card';
    
    let text = fact.text;
    if (fact.cat === 'TRICK') {
        card.classList.add('trick-card');
        text = '⚠️ ' + text;
    } else if (fact.powerup === 'DOUBLE') {
        text = '🌟 ' + text;
        card.style.borderColor = '#f59e0b';
    } else if (fact.powerup === 'FREEZE') {
        text = '❄️ ' + text;
        card.style.borderColor = '#3b82f6';
    }
    
    card.textContent = text;
    laneEl.appendChild(card);

    card.getBoundingClientRect(); // Trigger reflow

    const duration = getFallDuration();
    const laneHeight = laneEl.clientHeight;
    const cardHeight = card.offsetHeight;
    
    const cardObj = { 
        el: card, 
        cat: fact.cat, 
        text: fact.text,
        powerup: fact.powerup,
        answered: false,
        y: -120,
        targetY: laneHeight - cardHeight - 8
    };
    activeCards.push(cardObj);
    
    setTimeout(() => {
        if(!cardObj || cardObj.answered || !running) return;
        card.style.transition = `top ${duration}s linear`;
        card.style.top = cardObj.targetY + 'px';
    }, 50);

    card.addEventListener('transitionend', (e) => onMiss(e, cardObj));
}

function onMiss(e, cardObj) {
    if (e.propertyName !== 'top' || !running || cardObj.answered) return;
    cardObj.answered = true;
    
    if (cardObj.cat === 'TRICK') {
        // Successfully ignored the trick card
        sfx.playCorrect();
        streak += 1;
        score += 10;
        cardObj.el.classList.add('correct-anim');
        setTimeout(() => removeCard(cardObj), 600);
    } else {
        // Missed a real fact
        sfx.playWrong();
        streak = 0;
        mistakes.push({ text: cardObj.text, ans: cardObj.cat });
        laneEl.classList.add('shake');
        setTimeout(() => laneEl.classList.remove('shake'), 400);
        removeCard(cardObj);
        loseLife();
    }
    updateHud();
}

function handleAnswer(chosenCat) {
    if (!running) return;
    
    // Find the lowest unanswered card that is NOT a trick card
    // Wait, if player clicks, and lowest is trick card, they should get penalized
    let targetCard = null;
    let maxTop = -9999;
    
    activeCards.forEach(c => {
        if (c.answered) return;
        const rect = c.el.getBoundingClientRect();
        if (rect.top > maxTop) {
            maxTop = rect.top;
            targetCard = c;
        }
    });

    if (!targetCard) return;

    targetCard.answered = true;
    
    // Stop falling
    const currentTop = window.getComputedStyle(targetCard.el).getPropertyValue('top');
    targetCard.el.style.transition = 'none';
    targetCard.el.style.top = currentTop;

    if (targetCard.cat === 'TRICK') {
        // Player fell for the trick
        sfx.playWrong();
        targetCard.el.classList.add('wrong');
        streak = 0;
        laneEl.classList.add('shake');
        setTimeout(() => {
            laneEl.classList.remove('shake');
            removeCard(targetCard);
            loseLife();
        }, 500);
        return;
    }

    const isCorrect = chosenCat === targetCard.cat;
    targetCard.el.classList.add(isCorrect ? 'correct' : 'wrong');

    if (isCorrect) {
        targetCard.el.classList.add('correct-anim');
        streak += 1;
        correctCount += 1;
        
        let multiplier = 1;
        if (targetCard.powerup === 'DOUBLE') multiplier = 2;
        
        const bonus = (10 + Math.min(streak - 1, 5) * 5) * multiplier;
        score += bonus;
        
        // Powerups execution
        if (targetCard.powerup === 'FREEZE') {
            freezeActive = true;
            laneEl.style.backgroundColor = 'rgba(191, 219, 254, 0.4)';
            setTimeout(() => {
                freezeActive = false;
                laneEl.style.backgroundColor = '';
            }, 5000);
        }

        if (streak >= 3) {
            sfx.playCombo();
            createParticles(targetCard.el);
        } else {
            sfx.playCorrect();
        }
        
        showFloatingScore(bonus, currentTop, streak, multiplier);

        if (correctCount % 8 === 0) level += 1;
        
        setTimeout(() => removeCard(targetCard), 600);
    } else {
        sfx.playWrong();
        streak = 0;
        mistakes.push({ text: targetCard.text, ans: targetCard.cat });
        laneEl.classList.add('shake');
        setTimeout(() => {
            laneEl.classList.remove('shake');
            removeCard(targetCard);
            loseLife();
        }, 500);
    }
    updateHud();
}

function removeCard(cardObj) {
    if(cardObj.el.parentNode === laneEl) laneEl.removeChild(cardObj.el);
    activeCards = activeCards.filter(c => c !== cardObj);
}

function showFloatingScore(bonus, top, currentStreak, multiplier) {
    const floatScore = document.createElement('div');
    floatScore.className = 'floating-score';
    floatScore.style.left = '50%';
    floatScore.style.top = top;
    
    let html = `+${bonus}`;
    if (multiplier > 1) html += ` <span style="font-size:14px;color:#f59e0b;">(x${multiplier}!)</span>`;
    if (currentStreak >= 3) html += ` <span style="font-size:14px;color:#ef4444;">(🔥 ${currentStreak}x)</span>`;
    
    floatScore.innerHTML = html;
    laneEl.appendChild(floatScore);
    setTimeout(() => floatScore.remove(), 800);
}

function createParticles(element) {
    const rect = element.getBoundingClientRect();
    const laneRect = laneEl.getBoundingClientRect();
    const centerX = rect.left - laneRect.left + rect.width / 2;
    const centerY = rect.top - laneRect.top + rect.height / 2;

    const colors = ['#f59e0b', '#ef4444', '#10b981', '#3b82f6'];
    for (let i = 0; i < 12; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        p.style.left = centerX + 'px';
        p.style.top = centerY + 'px';
        
        const angle = Math.random() * Math.PI * 2;
        const radius = 50 + Math.random() * 50;
        p.style.setProperty('--tx', Math.cos(angle) * radius + 'px');
        p.style.setProperty('--ty', Math.sin(angle) * radius + 'px');
        
        laneEl.appendChild(p);
        setTimeout(() => p.remove(), 800);
    }
}

function loseLife() {
    lives -= 1;
    updateHud();
    if (lives <= 0) {
        endGame();
    }
}

function setButtonsEnabled(enabled) {
    catButtons.forEach(b => b.disabled = !enabled);
}

function endGame() {
    stopGame();
    sfx.playGameOver();
    setButtonsEnabled(false);
    quitGameBtn.style.display = 'none';
    
    overlayMsg.textContent = 'จบเกม';
    overlaySub.innerHTML = `คะแนนของคุณ: <span style="color:var(--brand-600)">${score}</span><br>สูงสุด: ${best}`;
    
    // Render mistakes
    reviewList.innerHTML = '';
    if (mistakes.length > 0) {
        // Deduplicate mistakes
        const uniqueMistakes = [];
        const seen = new Set();
        mistakes.forEach(m => {
            if (!seen.has(m.text)) {
                seen.add(m.text);
                uniqueMistakes.push(m);
            }
        });

        uniqueMistakes.forEach(m => {
            const div = document.createElement('div');
            div.className = 'review-item';
            div.innerHTML = `<span class="review-text">${m.text}</span> <br> 💡 หมวดหมู่: <span class="review-ans">${m.ans}</span>`;
            reviewList.appendChild(div);
        });
        document.getElementById('reviewSection').style.display = 'block';
    } else {
        document.getElementById('reviewSection').style.display = 'none';
    }
    
    gameOverOverlay.classList.add('show');
}

init();
