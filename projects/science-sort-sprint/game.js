// Science Sort Sprint - Professional Educational Web Game Engine
// Version: 2.5 (Mastery Edition)
// Features: State Machine, Multi-mode (Sprint/Practice/Blitz), Curriculum Level Selector,
// Active Target Reticle, Keyboard Controls, Mobile Swipe Gestures, Diagnostic Report Card,
// Study Deck Flashcard Library, Teacher Custom Quiz Importer, and Screen Reader (a11y) Support.

(function () {
    'use strict';

    // ========================================================
    // DOM Elements Selection
    // ========================================================
    const laneEl = document.getElementById('lane');
    const startMenuOverlay = document.getElementById('startMenuOverlay');
    const pauseOverlay = document.getElementById('pauseOverlay');
    const gameOverOverlay = document.getElementById('gameOverOverlay');
    const practiceModal = document.getElementById('practiceModal');
    const practiceModalText = document.getElementById('practiceModalText');
    const practiceModalExp = document.getElementById('practiceModalExp');
    const practiceNextBtn = document.getElementById('practiceNextBtn');

    // Accessibility Announcer
    const a11yAnnouncer = document.getElementById('a11yAnnouncer');

    // Study Deck & Custom Quiz DOM
    const openStudyDeckBtn = document.getElementById('openStudyDeckBtn');
    const closeStudyDeckBtn = document.getElementById('closeStudyDeckBtn');
    const studyDeckOverlay = document.getElementById('studyDeckOverlay');
    const deckSearchInput = document.getElementById('deckSearchInput');
    const deckSubjectFilter = document.getElementById('deckSubjectFilter');
    const deckCardsContainer = document.getElementById('deckCardsContainer');

    const openCustomQuizBtn = document.getElementById('openCustomQuizBtn');
    const closeCustomQuizBtn = document.getElementById('closeCustomQuizBtn');
    const customQuizOverlay = document.getElementById('customQuizOverlay');
    const customQuizJson = document.getElementById('customQuizJson');
    const loadTemplateQuizBtn = document.getElementById('loadTemplateQuizBtn');
    const saveCustomQuizBtn = document.getElementById('saveCustomQuizBtn');
    const customQuizStatus = document.getElementById('customQuizStatus');

    // HUD & Controls
    const overlayMsg = document.getElementById('overlayMsg');
    const overlaySub = document.getElementById('overlaySub');
    const scoreEl = document.getElementById('score');
    const bestEl = document.getElementById('best');
    const levelEl = document.getElementById('level');
    const livesEl = document.getElementById('lives');
    const blitzTimerRow = document.getElementById('blitzTimerRow');
    const blitzTimeEl = document.getElementById('blitzTime');
    const gameStatusRow = document.getElementById('gameStatusRow');
    const levelProgressFill = document.getElementById('levelProgressFill');

    const soundToggle = document.getElementById('soundToggle');
    const pauseToggle = document.getElementById('pauseToggle');
    const themeToggle = document.getElementById('themeToggle');
    const quitGameBtn = document.getElementById('quitGameBtn');
    const resumeBtn = document.getElementById('resumeBtn');
    const pauseQuitBtn = document.getElementById('pauseQuitBtn');
    const tryAgainBtn = document.getElementById('tryAgainBtn');
    const mainMenuBtn = document.getElementById('mainMenuBtn');
    const shareReportBtn = document.getElementById('shareReportBtn');

    const catButtons = Array.from(document.querySelectorAll('.cat-btn'));
    const gradePills = Array.from(document.querySelectorAll('#gradePillGroup .pill-btn'));
    const modeCards = Array.from(document.querySelectorAll('#modeGroup .mode-card'));

    // Desktop Sidebar DOM
    const sidebarStreak = document.getElementById('sidebarStreak');
    const sidebarAccuracy = document.getElementById('sidebarAccuracy');
    const sidebarTipText = document.getElementById('sidebarTipText');

    // Diagnostic DOM
    const diagAccuracy = document.getElementById('diagAccuracy');
    const diagCorrectRatio = document.getElementById('diagCorrectRatio');
    const diagMaxStreak = document.getElementById('diagMaxStreak');
    const barPhy = document.getElementById('barPhy');
    const barChem = document.getElementById('barChem');
    const barBio = document.getElementById('barBio');
    const barEarth = document.getElementById('barEarth');
    const statPhy = document.getElementById('statPhy');
    const statChem = document.getElementById('statChem');
    const statBio = document.getElementById('statBio');
    const statEarth = document.getElementById('statEarth');
    const reviewSection = document.getElementById('reviewSection');
    const reviewList = document.getElementById('reviewList');

    // ========================================================
    // State Variables
    // ========================================================
    let gameState = 'IDLE'; // 'IDLE' | 'PLAYING' | 'PAUSED' | 'GAMEOVER'
    let selectedGrade = 'all'; // 'all' | '1' | '2' | '3'
    let selectedMode = 'sprint'; // 'sprint' | 'practice' | 'blitz'

    let score = 0, best = 0, lives = 3, level = 1, streak = 0, maxStreak = 0, correctCount = 0;
    let activeCards = [];
    let recentIdx = [];
    let mistakes = [];
    let spawnTimeoutId = null;
    let blitzIntervalId = null;
    let blitzSecondsLeft = 60;
    let freezeActive = false;

    // Custom teacher questions if loaded
    let customQuestions = null;

    // Detailed Stats Tracking for Diagnostic Report
    let stats = {
        total: 0,
        correct: 0,
        byCat: {
            'ฟิสิกส์': { total: 0, correct: 0 },
            'เคมี': { total: 0, correct: 0 },
            'ชีววิทยา': { total: 0, correct: 0 },
            'โลกและอวกาศ': { total: 0, correct: 0 }
        }
    };

    const scienceTips = [
        "แสงเดินทางเร็วกว่าเสียงเสมอ ทำให้เราเห็นฟ้าแลบก่อนได้ยินเสียงฟ้าร้อง ⚡",
        "น้ำมีความจุความร้อนจำเพาะสูงมาก ทำให้มหาสมุทรช่วยปรับสมดุลอุณหภูมิของโลก 🌊",
        "เซลล์ทุกชนิดในร่างกายเรามีสารพันธุกรรมดีเอ็นเอ (DNA) เหมือนกันทุกประการ 🧬",
        "ดาวพฤหัสบดีมีจุดแดงใหญ่ ซึ่งเป็นพายุหมุนขนาดยักษ์ที่พัดมานานกว่า 300 ปี 🪐",
        "การเกิดสนิมเหล็กต้องการทั้งน้ำและออกซิเจน หากขาดสิ่งใดสิ่งหนึ่งสนิมจะไม่เกิด ⚙️",
        "การสังเคราะห์ด้วยแสงของพืชเป็นแหล่งกำเนิดออกซิเจนส่วนใหญ่ในบรรยากาศโลก 🌿",
        "หินแกรนิตแปรสภาพเป็นหินไนส์ด้วยความร้อนและความดันมหาศาลใต้ผิวโลก ⛰️",
        "โอโซนในชั้นสตราโตสเฟียร์ทำหน้าที่เสมือนแว่นกันแดดของโลกช่วยกรองรังสี UV ☀️"
    ];

    // ========================================================
    // High Score Separation by Mode
    // ========================================================
    function getBestScore(mode) {
        return parseInt(localStorage.getItem(`scienceSortBest_${mode}`) || '0', 10);
    }

    function setBestScore(mode, val) {
        localStorage.setItem(`scienceSortBest_${mode}`, val.toString());
    }

    function refreshBestDisplay() {
        best = getBestScore(selectedMode);
        bestEl.textContent = best;
    }

    // ========================================================
    // Audio Context Auto-Unlock on any first interaction
    // ========================================================
    function unlockAudioContext() {
        if (typeof sfx !== 'undefined' && sfx.init) {
            sfx.init();
        }
        window.removeEventListener('pointerdown', unlockAudioContext);
        window.removeEventListener('keydown', unlockAudioContext);
    }
    window.addEventListener('pointerdown', unlockAudioContext, { once: true });
    window.addEventListener('keydown', unlockAudioContext, { once: true });

    // ========================================================
    // Initialization
    // ========================================================
    function init() {
        // Load custom quiz if saved
        try {
            const savedCustom = localStorage.getItem('scienceSortCustomQuiz');
            if (savedCustom) {
                customQuestions = JSON.parse(savedCustom);
            }
        } catch (e) {
            console.warn("Could not parse saved custom quiz", e);
        }

        refreshBestDisplay();
        updateSoundButtonUI();

        // Button Event Listeners
        document.getElementById('startMenuBtn').addEventListener('click', startGame);
        tryAgainBtn.addEventListener('click', startGame);
        mainMenuBtn.addEventListener('click', showStartMenu);
        quitGameBtn.addEventListener('click', showStartMenu);
        pauseQuitBtn.addEventListener('click', showStartMenu);
        resumeBtn.addEventListener('click', resumeGame);
        pauseToggle.addEventListener('click', togglePause);
        soundToggle.addEventListener('click', handleSoundToggle);
        practiceNextBtn.addEventListener('click', closePracticeModal);
        shareReportBtn.addEventListener('click', copyDiagnosticReport);

        // Study Deck & Custom Quiz Modals
        if (openStudyDeckBtn) openStudyDeckBtn.addEventListener('click', openStudyDeck);
        if (closeStudyDeckBtn) closeStudyDeckBtn.addEventListener('click', closeStudyDeck);
        if (openCustomQuizBtn) openCustomQuizBtn.addEventListener('click', openCustomQuiz);
        if (closeCustomQuizBtn) closeCustomQuizBtn.addEventListener('click', closeCustomQuiz);
        if (loadTemplateQuizBtn) loadTemplateQuizBtn.addEventListener('click', loadQuizTemplate);
        if (saveCustomQuizBtn) saveCustomQuizBtn.addEventListener('click', saveCustomQuiz);

        // Study Deck search & filter
        if (deckSearchInput) deckSearchInput.addEventListener('input', filterStudyDeck);
        if (deckSubjectFilter) {
            deckSubjectFilter.querySelectorAll('.pill-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    deckSubjectFilter.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    filterStudyDeck();
                });
            });
        }

        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            sfx.playCorrect();
        });

        // Grade Selectors
        gradePills.forEach(pill => {
            pill.addEventListener('click', () => {
                gradePills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                selectedGrade = pill.dataset.grade;
                sfx.playCorrect();
            });
        });

        // Mode Selectors
        modeCards.forEach(card => {
            card.addEventListener('click', () => {
                modeCards.forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                selectedMode = card.dataset.mode;
                refreshBestDisplay();
                sfx.playCorrect();
            });
        });

        // Category Action Buttons (Click / Tap)
        catButtons.forEach(btn => {
            btn.addEventListener('click', () => handleAnswer(btn.dataset.cat));
        });

        // Keyboard Controls
        window.addEventListener('keydown', handleKeyboardInput);

        // Mobile Touch Swipe Controls on Lane
        setupSwipeGestures();

        // Window Resize Guard
        window.addEventListener('resize', handleWindowResize);

        setButtonsEnabled(false);
        rotateScienceTip();
    }

    function updateSoundButtonUI() {
        if (sfx.isMuted()) {
            soundToggle.textContent = '🔇 ปิดเสียง';
            soundToggle.style.opacity = '0.7';
        } else {
            soundToggle.textContent = '🔊 เสียง';
            soundToggle.style.opacity = '1';
        }
    }

    function handleSoundToggle() {
        sfx.toggleMute();
        updateSoundButtonUI();
        if (!sfx.isMuted()) sfx.playCorrect();
    }

    function rotateScienceTip() {
        if (!sidebarTipText) return;
        const randomTip = scienceTips[Math.floor(Math.random() * scienceTips.length)];
        sidebarTipText.textContent = randomTip;
    }

    // ========================================================
    // Window Resize Guard
    // ========================================================
    function handleWindowResize() {
        if (gameState !== 'PLAYING') return;
        const laneHeight = laneEl.clientHeight;

        activeCards.forEach(c => {
            if (!c.answered && c.el) {
                const cardHeight = c.el.offsetHeight;
                c.targetY = laneHeight - cardHeight - 8;
                // Readjust target transition
                const currentTop = parseFloat(window.getComputedStyle(c.el).getPropertyValue('top')) || 0;
                const remainingDistance = Math.max(0, c.targetY - currentTop);
                const totalDistance = c.targetY + 120;
                const totalDuration = getFallDuration();
                const remainingDuration = (remainingDistance / totalDistance) * totalDuration;

                c.el.style.transition = `top ${Math.max(remainingDuration, 0.4)}s linear`;
                c.el.style.top = c.targetY + 'px';
            }
        });
    }

    // ========================================================
    // Mobile Touch Swipe Gestures
    // ========================================================
    function setupSwipeGestures() {
        let startX = 0, startY = 0;
        let startTime = 0;

        laneEl.addEventListener('touchstart', (e) => {
            if (gameState !== 'PLAYING') return;
            const touch = e.changedTouches[0];
            startX = touch.clientX;
            startY = touch.clientY;
            startTime = Date.now();
        }, { passive: true });

        laneEl.addEventListener('touchend', (e) => {
            if (gameState !== 'PLAYING') return;
            const touch = e.changedTouches[0];
            const deltaX = touch.clientX - startX;
            const deltaY = touch.clientY - startY;
            const elapsed = Date.now() - startTime;

            // Must be a quick swipe (< 500ms) with at least 35px threshold
            if (elapsed < 500) {
                const absX = Math.abs(deltaX);
                const absY = Math.abs(deltaY);

                if (absX > 35 || absY > 35) {
                    if (absX > absY) {
                        // Horizontal Swipe
                        if (deltaX < 0) {
                            // Swipe Left -> Physics
                            handleAnswer('ฟิสิกส์');
                        } else {
                            // Swipe Right -> Chemistry
                            handleAnswer('เคมี');
                        }
                    } else {
                        // Vertical Swipe
                        if (deltaY < 0) {
                            // Swipe Up -> Biology
                            handleAnswer('ชีววิทยา');
                        } else {
                            // Swipe Down -> Earth & Space
                            handleAnswer('โลกและอวกาศ');
                        }
                    }
                }
            }
        }, { passive: true });
    }

    // ========================================================
    // Game Lifecycle
    // ========================================================
    function startGame() {
        sfx.init();
        gameState = 'PLAYING';
        score = 0;
        level = 1;
        streak = 0;
        maxStreak = 0;
        correctCount = 0;
        mistakes = [];
        activeCards = [];
        freezeActive = false;

        refreshBestDisplay();

        // Reset detailed diagnostic stats
        stats = {
            total: 0,
            correct: 0,
            byCat: {
                'ฟิสิกส์': { total: 0, correct: 0 },
                'เคมี': { total: 0, correct: 0 },
                'ชีววิทยา': { total: 0, correct: 0 },
                'โลกและอวกาศ': { total: 0, correct: 0 }
            }
        };

        // Mode specific setup
        if (selectedMode === 'practice') {
            lives = 999;
            gameStatusRow.innerHTML = `🧘 <b>โหมดฝึกฝน</b> &nbsp;·&nbsp; ข้อที่ <span id="level">1</span>`;
            blitzTimerRow.style.display = 'none';
        } else if (selectedMode === 'blitz') {
            lives = 999;
            blitzSecondsLeft = 60;
            blitzTimeEl.textContent = blitzSecondsLeft;
            blitzTimeEl.style.color = 'var(--brand-600)';
            blitzTimerRow.style.display = 'block';
            gameStatusRow.style.display = 'none';
            startBlitzTimer();
        } else {
            // Sprint Mode
            lives = 3;
            gameStatusRow.style.display = 'block';
            blitzTimerRow.style.display = 'none';
            gameStatusRow.innerHTML = `ด่าน <span id="level">1</span> &nbsp;·&nbsp; <span class="lives" id="lives">❤️❤️❤️</span>`;
        }

        updateHud();
        startMenuOverlay.classList.remove('show');
        pauseOverlay.classList.remove('show');
        gameOverOverlay.classList.remove('show');
        practiceModal.classList.remove('show');

        quitGameBtn.style.display = 'inline-block';
        pauseToggle.style.display = 'inline-flex';
        setButtonsEnabled(true);
        clearCards();
        rotateScienceTip();

        scheduleNextSpawn();
    }

    function showStartMenu() {
        stopGame();
        gameState = 'IDLE';
        clearCards();
        gameOverOverlay.classList.remove('show');
        pauseOverlay.classList.remove('show');
        practiceModal.classList.remove('show');
        startMenuOverlay.classList.add('show');
        quitGameBtn.style.display = 'none';
        pauseToggle.style.display = 'none';
        setButtonsEnabled(false);
        refreshBestDisplay();
    }

    function stopGame() {
        gameState = 'IDLE';
        if (spawnTimeoutId) clearTimeout(spawnTimeoutId);
        if (blitzIntervalId) clearInterval(blitzIntervalId);
    }

    function togglePause() {
        if (gameState === 'PLAYING') {
            pauseGame();
        } else if (gameState === 'PAUSED') {
            resumeGame();
        }
    }

    function pauseGame() {
        if (gameState !== 'PLAYING') return;
        gameState = 'PAUSED';
        sfx.playPause();

        if (spawnTimeoutId) clearTimeout(spawnTimeoutId);
        if (blitzIntervalId) clearInterval(blitzIntervalId);

        // Freeze all falling cards at current position
        activeCards.forEach(c => {
            if (!c.answered) {
                const computedTop = window.getComputedStyle(c.el).getPropertyValue('top');
                c.el.style.transition = 'none';
                c.el.style.top = computedTop;
            }
        });

        pauseOverlay.classList.add('show');
        setButtonsEnabled(false);
    }

    function resumeGame() {
        if (gameState !== 'PAUSED') return;
        gameState = 'PLAYING';
        sfx.playPause();
        pauseOverlay.classList.remove('show');
        setButtonsEnabled(true);

        const laneHeight = laneEl.clientHeight;

        activeCards.forEach(c => {
            if (!c.answered) {
                const currentTop = parseFloat(window.getComputedStyle(c.el).getPropertyValue('top')) || 0;
                const remainingDistance = Math.max(0, c.targetY - currentTop);
                const totalDistance = c.targetY + 120;
                const totalDuration = getFallDuration();
                const remainingDuration = (remainingDistance / totalDistance) * totalDuration;

                c.el.style.transition = `top ${Math.max(remainingDuration, 0.4)}s linear`;
                c.el.style.top = c.targetY + 'px';
            }
        });

        if (selectedMode === 'blitz') {
            startBlitzTimer();
        }

        scheduleNextSpawn();
    }

    function startBlitzTimer() {
        if (blitzIntervalId) clearInterval(blitzIntervalId);
        blitzIntervalId = setInterval(() => {
            if (gameState !== 'PLAYING') return;
            blitzSecondsLeft--;
            blitzTimeEl.textContent = blitzSecondsLeft;
            if (blitzSecondsLeft <= 10) {
                blitzTimeEl.style.color = '#ef4444';
                sfx.playTick();
            }
            if (blitzSecondsLeft <= 0) {
                clearInterval(blitzIntervalId);
                endGame("หมดเวลาการทดสอบ ⏱️");
            }
        }, 1000);
    }

    // ========================================================
    // Spawning & Card Engine
    // ========================================================
    function scheduleNextSpawn() {
        if (gameState !== 'PLAYING') return;

        spawnCard();

        let delay;
        if (selectedMode === 'practice') {
            delay = 4200;
        } else if (selectedMode === 'blitz') {
            delay = 2300;
        } else {
            delay = Math.max(1300, 3600 - (level * 280));
        }

        spawnTimeoutId = setTimeout(scheduleNextSpawn, delay);
    }

    function getFallDuration() {
        if (freezeActive) return 8.0;
        if (selectedMode === 'practice') return 7.5;
        if (selectedMode === 'blitz') return 4.5;
        const d = 7.5 - (level * 0.45);
        return Math.max(d, 2.7);
    }

    function getFilteredFacts() {
        if (customQuestions && customQuestions.length > 0) {
            return customQuestions;
        }

        if (selectedGrade === 'all') {
            return gameData.facts;
        }
        const g = parseInt(selectedGrade, 10);
        const filtered = gameData.facts.filter(f => f.grade === g);
        return filtered.length > 0 ? filtered : gameData.facts;
    }

    function pickFact() {
        // Trick cards only in standard database
        if (!customQuestions && ((selectedMode === 'sprint' && level >= 2) || selectedMode === 'blitz') && Math.random() < 0.12) {
            return gameData.trickCards[Math.floor(Math.random() * gameData.trickCards.length)];
        }

        const pool = getFilteredFacts();
        let idx;
        let attempts = 0;
        do {
            idx = Math.floor(Math.random() * pool.length);
            attempts++;
        } while (recentIdx.includes(pool[idx].id) && recentIdx.length < pool.length - 2 && attempts < 20);

        recentIdx.push(pool[idx].id);
        if (recentIdx.length > 15) recentIdx.shift();

        const fact = { ...pool[idx] };

        if (selectedMode === 'sprint') {
            const rand = Math.random();
            if (rand < 0.09) fact.powerup = 'DOUBLE';
            else if (rand < 0.14) fact.powerup = 'FREEZE';
        }

        return fact;
    }

    function clearCards() {
        const existing = laneEl.querySelectorAll('.card');
        existing.forEach(el => el.remove());
        activeCards = [];
    }

    function spawnCard() {
        if (gameState !== 'PLAYING') return;

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

        // Accessibility announcement for screen readers
        if (a11yAnnouncer) {
            a11yAnnouncer.textContent = `ข้อความใหม่: ${fact.text}`;
        }

        card.getBoundingClientRect();

        const duration = getFallDuration();
        const laneHeight = laneEl.clientHeight;
        const cardHeight = card.offsetHeight;

        const cardObj = {
            el: card,
            cat: fact.cat,
            text: fact.text,
            explanation: fact.explanation || "เป็นความรู้ทางวิทยาศาสตร์ตามหลักสูตรแกนกลาง",
            powerup: fact.powerup,
            answered: false,
            targetY: laneHeight - cardHeight - 8
        };
        activeCards.push(cardObj);

        updateActiveTargetReticle();

        setTimeout(() => {
            if (!cardObj || cardObj.answered || gameState !== 'PLAYING') return;
            card.style.transition = `top ${duration}s linear`;
            card.style.top = cardObj.targetY + 'px';
        }, 40);

        card.addEventListener('transitionend', (e) => onCardReachBottom(e, cardObj));
    }

    // ========================================================
    // Target Reticle (Fixes Ambiguity & Trick Card Conflicts)
    // ========================================================
    function getTargetCard() {
        let targetReal = null;
        let maxTopReal = -9999;

        let targetTrick = null;
        let maxTopTrick = -9999;

        activeCards.forEach(c => {
            if (c.answered) return;
            const rect = c.el.getBoundingClientRect();
            if (c.cat !== 'TRICK') {
                if (rect.top > maxTopReal) {
                    maxTopReal = rect.top;
                    targetReal = c;
                }
            } else {
                if (rect.top > maxTopTrick) {
                    maxTopTrick = rect.top;
                    targetTrick = c;
                }
            }
        });

        return targetReal || targetTrick;
    }

    function updateActiveTargetReticle() {
        activeCards.forEach(c => {
            if (c.el) c.el.classList.remove('active-target');
        });

        const target = getTargetCard();
        if (target && target.el && !target.answered) {
            target.el.classList.add('active-target');
        }
    }

    // ========================================================
    // Answer Handling
    // ========================================================
    function handleKeyboardInput(e) {
        // Ignore if user is typing in custom quiz textarea or search input
        if (document.activeElement === customQuizJson || document.activeElement === deckSearchInput) {
            return;
        }

        if (gameState !== 'PLAYING' && gameState !== 'PAUSED') return;

        if (e.code === 'Space') {
            e.preventDefault();
            togglePause();
            return;
        }

        if (gameState !== 'PLAYING') return;

        const key = e.key.toLowerCase();
        if (key === '1' || key === 'q' || key === 'a') {
            e.preventDefault();
            handleAnswer('ฟิสิกส์');
        } else if (key === '2' || key === 'w' || key === 's') {
            e.preventDefault();
            handleAnswer('เคมี');
        } else if (key === '3' || key === 'e' || key === 'd') {
            e.preventDefault();
            handleAnswer('ชีววิทยา');
        } else if (key === '4' || key === 'r' || key === 'f') {
            e.preventDefault();
            handleAnswer('โลกและอวกาศ');
        }
    }

    function handleAnswer(chosenCat) {
        if (gameState !== 'PLAYING') return;

        const targetCard = getTargetCard();
        if (!targetCard) return;

        targetCard.answered = true;

        const currentTop = window.getComputedStyle(targetCard.el).getPropertyValue('top');
        targetCard.el.style.transition = 'none';
        targetCard.el.style.top = currentTop;
        targetCard.el.classList.remove('active-target');

        if (targetCard.cat === 'TRICK') {
            sfx.playWrong();
            targetCard.el.classList.add('wrong');
            streak = 0;
            laneEl.classList.add('shake');

            mistakes.push({
                text: targetCard.text,
                ans: "การ์ดหลอก (ไม่ควรตอบ)",
                explanation: targetCard.explanation
            });

            setTimeout(() => {
                laneEl.classList.remove('shake');
                removeCard(targetCard);
                if (selectedMode === 'sprint') loseLife();
                updateActiveTargetReticle();
            }, 450);

            updateHud();
            return;
        }

        const isCorrect = (chosenCat === targetCard.cat);

        stats.total++;
        if (stats.byCat[targetCard.cat]) {
            stats.byCat[targetCard.cat].total++;
        }

        if (isCorrect) {
            stats.correct++;
            if (stats.byCat[targetCard.cat]) {
                stats.byCat[targetCard.cat].correct++;
            }

            targetCard.el.classList.add('correct', 'correct-anim');
            streak++;
            if (streak > maxStreak) maxStreak = streak;
            correctCount++;

            let multiplier = 1;
            if (targetCard.powerup === 'DOUBLE') multiplier = 2;

            const bonus = (10 + Math.min(streak - 1, 6) * 5) * multiplier;
            score += bonus;

            if (targetCard.powerup === 'FREEZE') {
                freezeActive = true;
                sfx.playFreeze();
                laneEl.style.backgroundColor = 'rgba(191, 219, 254, 0.4)';
                setTimeout(() => {
                    freezeActive = false;
                    laneEl.style.backgroundColor = '';
                }, 5000);
            }

            if (streak >= 3) {
                sfx.playCombo(streak);
                createParticles(targetCard.el);
            } else {
                sfx.playCorrect();
            }

            showFloatingScore(bonus, currentTop, streak, multiplier);

            if (selectedMode === 'sprint') {
                const progressInLevel = (correctCount % 6) / 6;
                levelProgressFill.style.width = `${progressInLevel * 100}%`;

                if (correctCount % 6 === 0) {
                    level++;
                    sfx.playLevelUp();
                    rotateScienceTip();
                }
            }

            setTimeout(() => {
                removeCard(targetCard);
                updateActiveTargetReticle();
            }, 550);
        } else {
            sfx.playWrong();
            streak = 0;
            targetCard.el.classList.add('wrong');
            mistakes.push({
                text: targetCard.text,
                ans: targetCard.cat,
                explanation: targetCard.explanation
            });

            laneEl.classList.add('shake');

            if (selectedMode === 'practice') {
                pauseGame();
                showPracticeExplanation(targetCard, chosenCat);
            }

            setTimeout(() => {
                laneEl.classList.remove('shake');
                removeCard(targetCard);
                if (selectedMode === 'sprint') loseLife();
                updateActiveTargetReticle();
            }, 500);
        }

        updateHud();
    }

    function onCardReachBottom(e, cardObj) {
        if (e.propertyName !== 'top' || gameState !== 'PLAYING' || cardObj.answered) return;
        cardObj.answered = true;

        if (cardObj.cat === 'TRICK') {
            sfx.playCorrect();
            streak++;
            if (streak > maxStreak) maxStreak = streak;
            score += 15;
            cardObj.el.classList.add('correct', 'correct-anim');
            showFloatingScore(15, cardObj.targetY + 'px', streak, 1);
            setTimeout(() => {
                removeCard(cardObj);
                updateActiveTargetReticle();
            }, 500);
        } else {
            sfx.playWrong();
            streak = 0;
            stats.total++;
            if (stats.byCat[cardObj.cat]) stats.byCat[cardObj.cat].total++;

            mistakes.push({
                text: cardObj.text,
                ans: cardObj.cat,
                explanation: cardObj.explanation
            });

            laneEl.classList.add('shake');

            if (selectedMode === 'practice') {
                pauseGame();
                showPracticeExplanation(cardObj, 'ตอบไม่ทัน');
            }

            setTimeout(() => {
                laneEl.classList.remove('shake');
                removeCard(cardObj);
                if (selectedMode === 'sprint') loseLife();
                updateActiveTargetReticle();
            }, 400);
        }

        updateHud();
    }

    function removeCard(cardObj) {
        if (cardObj.el && cardObj.el.parentNode === laneEl) {
            laneEl.removeChild(cardObj.el);
        }
        activeCards = activeCards.filter(c => c !== cardObj);
    }

    function showPracticeExplanation(cardObj, chosen) {
        practiceModalText.textContent = `ข้อความ: "${cardObj.text}"`;
        practiceModalExp.innerHTML = `✅ หมวดหมู่ที่ถูกต้องคือ <b>${cardObj.cat}</b> <br>💡 <b>คำอธิบาย:</b> ${cardObj.explanation}`;
        practiceModal.classList.add('show');
    }

    function closePracticeModal() {
        practiceModal.classList.remove('show');
        resumeGame();
    }

    // ========================================================
    // Visual Polish & Particle Effects
    // ========================================================
    function showFloatingScore(bonus, top, currentStreak, multiplier) {
        const floatScore = document.createElement('div');
        floatScore.className = 'floating-score';
        floatScore.style.left = '50%';
        floatScore.style.top = top;

        let html = `+${bonus}`;
        if (multiplier > 1) html += ` <span style="font-size:13px;color:#f59e0b;">(x${multiplier}!)</span>`;
        if (currentStreak >= 3) html += ` <span style="font-size:13px;color:#ef4444;">(🔥 ${currentStreak}x)</span>`;

        floatScore.innerHTML = html;
        laneEl.appendChild(floatScore);
        setTimeout(() => floatScore.remove(), 800);
    }

    function createParticles(element) {
        const rect = element.getBoundingClientRect();
        const laneRect = laneEl.getBoundingClientRect();
        const centerX = rect.left - laneRect.left + rect.width / 2;
        const centerY = rect.top - laneRect.top + rect.height / 2;

        const colors = ['#f59e0b', '#ef4444', '#10b981', '#3b82f6', '#8b5cf6'];
        for (let i = 0; i < 14; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            p.style.left = centerX + 'px';
            p.style.top = centerY + 'px';

            const angle = Math.random() * Math.PI * 2;
            const radius = 40 + Math.random() * 55;
            p.style.setProperty('--tx', Math.cos(angle) * radius + 'px');
            p.style.setProperty('--ty', Math.sin(angle) * radius + 'px');

            laneEl.appendChild(p);
            setTimeout(() => p.remove(), 750);
        }
    }

    // ========================================================
    // HUD & State Synchronization
    // ========================================================
    function updateHud() {
        scoreEl.textContent = score;
        if (document.getElementById('level')) {
            document.getElementById('level').textContent = level;
        }

        if (livesEl && selectedMode === 'sprint') {
            let hearts = '';
            for (let i = 0; i < 3; i++) {
                hearts += (i < lives) ? '❤️' : '<span class="lost">❤️</span>';
            }
            livesEl.innerHTML = hearts;
        }

        if (score > best) {
            best = score;
            bestEl.textContent = best;
            setBestScore(selectedMode, best);
        }

        if (sidebarStreak) sidebarStreak.textContent = `${streak} 🔥`;
        if (sidebarAccuracy) {
            const acc = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 100;
            sidebarAccuracy.textContent = `${acc}%`;
        }
    }

    function loseLife() {
        lives--;
        updateHud();
        if (lives <= 0) {
            endGame("หัวใจหมดแล้ว! จบเกม");
        }
    }

    function setButtonsEnabled(enabled) {
        catButtons.forEach(b => b.disabled = !enabled);
    }

    // ========================================================
    // Post-Game Diagnostic Assessment
    // ========================================================
    function endGame(customMsg) {
        stopGame();
        gameState = 'GAMEOVER';
        sfx.playGameOver();
        setButtonsEnabled(false);
        quitGameBtn.style.display = 'none';
        pauseToggle.style.display = 'none';

        overlayMsg.textContent = customMsg || 'สรุปผลการประเมิน';

        let gradeLabel = selectedGrade === 'all' ? 'ม.ต้น (ม.1-ม.3)' : `ชั้น ม.${selectedGrade}`;
        let modeLabel = selectedMode === 'sprint' ? '⚡ Sprint' : (selectedMode === 'practice' ? '🧘 ฝึกฝน' : '⏱️ Blitz 60s');
        overlaySub.innerHTML = `โหมด: <b>${modeLabel}</b> &nbsp;|&nbsp; ระดับ: <b>${gradeLabel}</b><br>คะแนนของคุณ: <span style="color:var(--brand-600);font-size:18px;font-weight:800;">${score}</span> (สูงสุดโหมดนี้: ${best})`;

        const accuracyPct = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
        diagAccuracy.textContent = `${accuracyPct}%`;
        diagCorrectRatio.textContent = `${stats.correct}/${stats.total}`;
        diagMaxStreak.textContent = `${maxStreak}🔥`;

        updateSubjectBar(barPhy, statPhy, stats.byCat['ฟิสิกส์']);
        updateSubjectBar(barChem, statChem, stats.byCat['เคมี']);
        updateSubjectBar(barBio, statBio, stats.byCat['ชีววิทยา']);
        updateSubjectBar(barEarth, statEarth, stats.byCat['โลกและอวกาศ']);

        reviewList.innerHTML = '';
        if (mistakes.length > 0) {
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
                div.innerHTML = `
                    <div class="review-text">${m.text}</div>
                    <div style="margin-top:2px;">หมวดหมู่ที่ถูกต้อง: <span class="review-ans">${m.ans}</span></div>
                    <div class="review-explanation">💡 <b>เหตุผล:</b> ${m.explanation}</div>
                `;
                reviewList.appendChild(div);
            });
            reviewSection.style.display = 'block';
        } else {
            reviewSection.style.display = 'none';
        }

        gameOverOverlay.classList.add('show');
    }

    function updateSubjectBar(barEl, textEl, catStat) {
        if (!catStat || catStat.total === 0) {
            barEl.style.width = '0%';
            textEl.textContent = '-';
            return;
        }
        const pct = Math.round((catStat.correct / catStat.total) * 100);
        barEl.style.width = `${pct}%`;
        textEl.textContent = `${pct}% (${catStat.correct}/${catStat.total})`;
    }

    function copyDiagnosticReport() {
        const accuracyPct = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
        let gradeLabel = selectedGrade === 'all' ? 'ม.1 - ม.3' : `ม.${selectedGrade}`;
        let modeLabel = selectedMode === 'sprint' ? 'Sprint' : (selectedMode === 'practice' ? 'ฝึกฝน (Practice)' : 'Exam Blitz 60s');

        const getCatStat = (cat) => {
            const c = stats.byCat[cat];
            if (!c || c.total === 0) return 'ยังไม่มีข้อสอบ';
            return `${Math.round((c.correct / c.total) * 100)}% (${c.correct}/${c.total})`;
        };

        const reportText = `🧪 Science Sort Sprint - รายงานผลการทดสอบ
👤 ผู้เรียน: นักเรียน
📚 ระดับชั้น: ${gradeLabel} | โหมด: ${modeLabel}
🎯 คะแนนที่ได้: ${score} คะแนน (สถิติสูงสุดโหมดนี้: ${best})
✅ ความแม่นยำรวม: ${accuracyPct}% (${stats.correct}/${stats.total} ข้อ)
🔥 คอมโบต่อเนื่องสูงสุด: ${maxStreak} ครั้ง
--- รายละเอียดคะแนนแยก 4 สาระวิชา ---
⚛️ ฟิสิกส์: ${getCatStat('ฟิสิกส์')}
🧫 เคมี: ${getCatStat('เคมี')}
🧬 ชีววิทยา: ${getCatStat('ชีววิทยา')}
🌍 โลกและอวกาศ: ${getCatStat('โลกและอวกาศ')}
🔗 เล่นเกมได้ที่: https://apisit-man.github.io/projects/science-sort-sprint/science-sort-sprint.html`;

        navigator.clipboard.writeText(reportText).then(() => {
            const originalText = shareReportBtn.textContent;
            shareReportBtn.textContent = '✅ คัดลอกเรียบร้อย!';
            shareReportBtn.style.backgroundColor = '#059669';
            setTimeout(() => {
                shareReportBtn.textContent = originalText;
                shareReportBtn.style.backgroundColor = '';
            }, 2500);
        }).catch(() => {
            alert("ไม่สามารถคัดลอกได้อัตโนมัติ กรุณาคัดลอกด้วยตนเอง");
        });
    }

    // ========================================================
    // Study Deck (Flashcards Library) Functions
    // ========================================================
    function openStudyDeck() {
        if (!studyDeckOverlay) return;
        studyDeckOverlay.classList.add('show');
        renderStudyDeckCards(gameData.facts);
        sfx.playCorrect();
    }

    function closeStudyDeck() {
        if (!studyDeckOverlay) return;
        studyDeckOverlay.classList.remove('show');
    }

    function filterStudyDeck() {
        const query = (deckSearchInput ? deckSearchInput.value.toLowerCase().trim() : '');
        const activeFilterBtn = deckSubjectFilter ? deckSubjectFilter.querySelector('.pill-btn.active') : null;
        const selectedCat = activeFilterBtn ? activeFilterBtn.dataset.deckCat : 'all';

        const filtered = gameData.facts.filter(f => {
            const matchesCat = (selectedCat === 'all' || f.cat === selectedCat);
            const matchesQuery = (!query || 
                f.text.toLowerCase().includes(query) || 
                (f.topic && f.topic.toLowerCase().includes(query)) ||
                (f.explanation && f.explanation.toLowerCase().includes(query))
            );
            return matchesCat && matchesQuery;
        });

        renderStudyDeckCards(filtered);
    }

    function renderStudyDeckCards(cards) {
        if (!deckCardsContainer) return;
        deckCardsContainer.innerHTML = '';

        if (cards.length === 0) {
            deckCardsContainer.innerHTML = `<div style="text-align:center; padding:20px; color:var(--muted); font-size:13px;">ไม่พบบทเรียนที่ตรงกับคำค้นหา</div>`;
            return;
        }

        const catClassMap = {
            'ฟิสิกส์': 'physics',
            'เคมี': 'chemistry',
            'ชีววิทยา': 'biology',
            'โลกและอวกาศ': 'earth'
        };

        cards.forEach(c => {
            const item = document.createElement('div');
            item.className = 'deck-card-item';
            const catCls = catClassMap[c.cat] || 'physics';
            item.innerHTML = `
                <div class="deck-card-meta">
                    <span class="badge-cat ${catCls}">${c.cat}</span>
                    <span class="badge-grade">ม.${c.grade}</span>
                    <span style="color:var(--muted); font-weight:600;">${c.topic || ''}</span>
                </div>
                <div class="deck-card-text">${c.text}</div>
                <div class="deck-card-exp">💡 <b>คำอธิบาย:</b> ${c.explanation}</div>
            `;
            deckCardsContainer.appendChild(item);
        });
    }

    // ========================================================
    // Teacher Custom Quiz Functions
    // ========================================================
    function openCustomQuiz() {
        if (!customQuizOverlay) return;
        customQuizOverlay.classList.add('show');
        if (customQuestions && customQuestions.length > 0) {
            customQuizJson.value = JSON.stringify(customQuestions, null, 2);
            customQuizStatus.textContent = `กำลังใช้งานชุดข้อสอบครู (${customQuestions.length} ข้อ)`;
            customQuizStatus.style.color = 'var(--brand-600)';
        }
        sfx.playCorrect();
    }

    function closeCustomQuiz() {
        if (!customQuizOverlay) return;
        customQuizOverlay.classList.remove('show');
    }

    function loadQuizTemplate() {
        const template = [
            {
                "text": "ตัวอย่าง: เสียงเดินทางผ่านของแข็งได้เร็วกว่าในอากาศ",
                "cat": "ฟิสิกส์",
                "grade": 2,
                "topic": "คลื่นเสียง",
                "explanation": "เพราะอนุภาคของของแข็งเรียงตัวชิดกันมากกว่า ทำให้ส่งถ่ายพลังงานคลื่นกลได้รวดเร็วกว่า"
            },
            {
                "text": "ตัวอย่าง: กรดทำปฏิกิริยากับหินปูนเกิดแก๊สคาร์บอนไดออกไซด์",
                "cat": "เคมี",
                "grade": 2,
                "topic": "กรด-เบส",
                "explanation": "กรด + แคลเซียมคาร์บอเนต (หินปูน) ได้เกลือ แคลเซียมคลอไรด์ น้ำ และแก๊ส CO₂"
            },
            {
                "text": "ตัวอย่าง: เซลล์เม็ดเลือดแดงไม่มีนิวเคลียสเพื่อเพิ่มพื้นที่ลำเลียงออกซิเจน",
                "cat": "ชีววิทยา",
                "grade": 2,
                "topic": "ระบบหมุนเวียนเลือด",
                "explanation": "เซลล์เม็ดเลือดแดงที่โตเต็มที่จะสลายนิวเคลียสออกไปเพื่อบรรจุฮีโมโกลบินให้ได้มากที่สุด"
            },
            {
                "text": "ตัวอย่าง: หินออบซิเดียนเป็นหินอัคนีพุเนื้อแก้วที่เกิดจากการเย็นตัวอย่างรวดเร็วของลาวา",
                "cat": "โลกและอวกาศ",
                "grade": 2,
                "topic": "วัฏจักรหิน",
                "explanation": "ลาวาที่มีซิลิกาสูงไหลออกมาสัมผัสอากาศเย็นตัวเฉียบพลัน ผลึกแร่จึงไม่มีเวลาเจริญกลายเป็นเนื้อแก้ว"
            }
        ];
        customQuizJson.value = JSON.stringify(template, null, 2);
        customQuizStatus.textContent = "โหลดเทมเพลตตัวอย่างเรียบร้อยแล้ว";
        customQuizStatus.style.color = 'var(--brand-600)';
    }

    function saveCustomQuiz() {
        const text = customQuizJson.value.trim();
        if (!text) {
            // Clear custom quiz
            customQuestions = null;
            localStorage.removeItem('scienceSortCustomQuiz');
            customQuizStatus.textContent = "ล้างข้อสอบครูแล้ว - กลับไปใช้คลังข้อสอบมาตรฐาน";
            customQuizStatus.style.color = 'var(--muted)';
            setTimeout(closeCustomQuiz, 1200);
            return;
        }

        try {
            const parsed = JSON.parse(text);
            if (!Array.isArray(parsed) || parsed.length === 0) {
                throw new Error("ข้อสอบต้องเป็น Array ของโจทย์");
            }

            // Validate format
            const validCats = ['ฟิสิกส์', 'เคมี', 'ชีววิทยา', 'โลกและอวกาศ'];
            const validItems = parsed.map((item, idx) => {
                if (!item.text || !item.cat) {
                    throw new Error(`ข้อที่ ${idx + 1} ขาด text หรือ cat`);
                }
                if (!validCats.includes(item.cat)) {
                    throw new Error(`ข้อที่ ${idx + 1} cat ต้องเป็น: ${validCats.join(', ')}`);
                }
                return {
                    id: item.id || `custom-${idx + 1}`,
                    text: item.text,
                    cat: item.cat,
                    grade: item.grade || 2,
                    topic: item.topic || "บทเรียนของคุณครู",
                    explanation: item.explanation || "เป็นคำตอบที่ถูกต้องตามหลักวิชาการ"
                };
            });

            customQuestions = validItems;
            localStorage.setItem('scienceSortCustomQuiz', JSON.stringify(validItems));
            customQuizStatus.textContent = `✅ บันทึกสำเร็จ! พร้อมใช้งาน ${validItems.length} ข้อ`;
            customQuizStatus.style.color = 'var(--success)';
            sfx.playLevelUp();

            setTimeout(closeCustomQuiz, 1200);
        } catch (err) {
            customQuizStatus.textContent = `❌ รูปแบบไม่ถูกต้อง: ${err.message}`;
            customQuizStatus.style.color = 'var(--danger)';
            sfx.playWrong();
        }
    }

    // Run Engine Initialization
    init();

})();
