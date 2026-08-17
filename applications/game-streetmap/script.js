// ================================================================
//  1. ตัวแปรสถานะเกม
// ================================================================
const state = {
    streetList: [],
    currentIndex: 0,
    currentRound: 0,
    maxRounds: 10,
    correctAnswers: 0,
    currentWord: '',
    currentHighway: '',
    currentGeometry: null,
    guessedLetters: [],
    wrongGuesses: 0,
    maxWrong: 6,
    timeLeft: 20,
    timerInterval: null,
    score: 0,
    isGameActive: false,
    isFinished: false,
    polyline: null
};

const map = L.map('map', {
    zoomControl: true,
    fadeAnimation: true,
}).setView([13.736717, 100.523186], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19,
}).addTo(map);

// ================================================================
//  3. ฟังก์ชันหลักของเกม
// ================================================================

function buildKeyboard(word) {
    const container = document.getElementById('keyboardContainer');
    container.innerHTML = '';
    if (!word) return;
    
    let keys = [];
    const isThai = /[ก-ฮะ-์]/.test(word);
    
    if (isThai) {
        const correctChars = [...new Set(word.replace(/\s/g, '').split(''))];
        const allThaiChars = "กขคฆงจฉชซญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรลวศษสหฬอฮะาิีึืุูเแโใไ่้๊๋์";
        let distractors = [];
        while(distractors.length < 15) {
            let char = allThaiChars[Math.floor(Math.random() * allThaiChars.length)];
            if (!correctChars.includes(char) && !distractors.includes(char)) {
                distractors.push(char);
            }
        }
        keys = [...correctChars, ...distractors];
        keys = shuffleArray(keys);
    } else {
        for (let i = 65; i <= 90; i++) {
            keys.push(String.fromCharCode(i));
        }
    }
    
    keys.forEach(char => {
        const btn = document.createElement('button');
        btn.className = 'key';
        btn.textContent = char;
        btn.dataset.letter = char;
        btn.addEventListener('click', () => handleGuess(char));
        container.appendChild(btn);
    });
}

function updateKeyboard() {
    const keys = document.querySelectorAll('.key');
    keys.forEach(btn => {
        const letter = btn.dataset.letter;
        btn.disabled = false;
        btn.className = 'key';
        if (state.guessedLetters.includes(letter)) {
            btn.disabled = true;
            if (state.currentWord.includes(letter)) {
                btn.classList.add('correct');
            } else {
                btn.classList.add('wrong');
            }
        }
    });
}

function renderWordDisplay() {
    const display = document.getElementById('wordDisplay');
    if (!state.currentWord) {
        display.textContent = '🔍 เลือกพื้นที่ก่อน';
        return;
    }
    let html = '';
    for (let char of state.currentWord) {
        if (char === ' ') {
            html += '  ';
        } else if (state.guessedLetters.includes(char)) {
            html += char + ' ';
        } else {
            html += '_ ';
        }
    }
    display.textContent = html.trimEnd();
}

function updateStats() {
    document.getElementById('scoreDisplay').textContent = state.score;
    document.getElementById('timerDisplay').textContent = state.timeLeft;
    document.getElementById('wrongCount').textContent = state.wrongGuesses;
    document.getElementById('progressDisplay').textContent = 
        state.isGameActive ? `${state.currentRound} / ${state.maxRounds}` : '0 / 0';
    document.getElementById('categoryDisplay').textContent =
        state.currentHighway ? `🏷️ ${state.currentHighway}` : '🏷️ —';
}

function startTimer() {
    clearInterval(state.timerInterval);
    state.timeLeft = 20;
    document.getElementById('timerDisplay').textContent = state.timeLeft;

    state.timerInterval = setInterval(() => {
        state.timeLeft -= 1;
        document.getElementById('timerDisplay').textContent = state.timeLeft;

        const timerEl = document.querySelector('.timer-box .time');
        if (state.timeLeft <= 5) timerEl.style.color = '#ff4444';
        else timerEl.style.color = '#ff6b6b';

        if (state.timeLeft <= 0) {
            clearInterval(state.timerInterval);
            document.getElementById('hintMessage').innerHTML = '⏰ หมดเวลา! ข้ามไปข้อถัดไป';
            setTimeout(() => {
                loadNextStreet();
            }, 800);
        }
    }, 1000);
}

function drawStreetOnMap(geom) {
    if (state.polyline) {
        map.removeLayer(state.polyline);
    }
    if (!geom) return;
    
    const latlngs = geom.map(p => [p.lat, p.lon]);
    state.polyline = L.polyline(latlngs, {
        color: '#ff4d4d',
        weight: 6,
        opacity: 0.9,
        className: 'path-glow',
        dashArray: '10, 10'
    }).addTo(map);
    
    map.fitBounds(state.polyline.getBounds(), { padding: [50, 50], maxZoom: 17 });
}

function showSummary() {
    state.isGameActive = false;
    clearInterval(state.timerInterval);
    document.getElementById('summaryModal').classList.add('active');
    document.getElementById('finalScore').textContent = state.score;
    document.getElementById('finalCorrect').textContent = `${state.correctAnswers} / ${state.maxRounds}`;
    
    let grade = 'F';
    let msg = 'ลองใหม่อีกครั้งนะ!';
    if (state.score >= 400) { grade = 'S'; msg = 'ระดับเทพ! คุณคือ GPS เดินได้ 🌟'; }
    else if (state.score >= 300) { grade = 'A'; msg = 'ยอดเยี่ยม! รู้จักพื้นที่ดีมาก 🔥'; }
    else if (state.score >= 200) { grade = 'B'; msg = 'เก่งมาก! คุ้นเคยกับแถวนี้ดีเลย 👍'; }
    else if (state.score >= 100) { grade = 'C'; msg = 'พอใช้ได้ พยายามอีกนิดนะ 🙂'; }
    
    document.getElementById('finalGrade').textContent = grade;
    document.getElementById('gradeMessage').textContent = msg;
}

function loadNextStreet() {
    clearInterval(state.timerInterval);

    if (state.streetList.length === 0) {
        document.getElementById('wordDisplay').textContent = '❌ ไม่พบชื่อถนน';
        document.getElementById('hintMessage').textContent = 'ลองเลือกพื้นที่อื่นที่มีถนนเยอะๆ';
        state.isGameActive = false;
        updateStats();
        return;
    }

    if (state.currentRound >= state.maxRounds) {
        showSummary();
        return;
    }

    if (state.currentIndex >= state.streetList.length) {
        state.currentIndex = 0;
        state.streetList = shuffleArray(state.streetList);
    }

    const item = state.streetList[state.currentIndex];
    state.currentWord = item.name.toUpperCase();
    state.currentHighway = item.highway || 'unknown';
    state.currentGeometry = item.geometry;
    
    state.guessedLetters = [];
    state.wrongGuesses = 0;
    state.isGameActive = true;
    state.isFinished = false;
    state.currentRound += 1;

    drawStreetOnMap(state.currentGeometry);
    buildKeyboard(state.currentWord);
    renderWordDisplay();
    updateStats();
    updateKeyboard();
    document.getElementById('hintMessage').innerHTML =
        `💡 ทายตัวอักษรทีละตัว (ผิด <span class="wrong-count">0</span>/6)`;

    startTimer();
    state.currentIndex += 1;
}

function handleGuess(letter) {
    if (!state.isGameActive || state.isFinished) return;
    if (state.guessedLetters.includes(letter)) return;

    state.guessedLetters.push(letter);

    const isCorrect = state.currentWord.includes(letter);
    if (!isCorrect) {
        state.wrongGuesses += 1;
        document.getElementById('hintMessage').innerHTML =
            `❌ ผิด! (${state.wrongGuesses}/${state.maxWrong})`;
    } else {
        document.getElementById('hintMessage').innerHTML = '✅ ถูกต้อง!';
    }

    renderWordDisplay();
    updateKeyboard();
    updateStats();

    const allLetters = state.currentWord.replace(/\s/g, '').split('');
    const uniqueLetters = [...new Set(allLetters)];
    const guessedCorrect = uniqueLetters.every(ch => state.guessedLetters.includes(ch));

    if (guessedCorrect && state.currentWord.length > 0) {
        state.isFinished = true;
        state.correctAnswers += 1;
        clearInterval(state.timerInterval);
        const bonus = Math.max(0, Math.min(100, state.timeLeft * 3));
        const earned = 20 + bonus;
        state.score += Math.floor(earned);
        document.getElementById('hintMessage').innerHTML =
            `🎉 เก่งมาก! +${Math.floor(earned)} คะแนน`;
        updateStats();
        setTimeout(() => { loadNextStreet(); }, 1500);
        return;
    }

    if (state.wrongGuesses >= state.maxWrong) {
        state.isFinished = true;
        clearInterval(state.timerInterval);
        document.getElementById('hintMessage').innerHTML =
            `💀 คำตอบคือ "${state.currentWord}"`;
        state.score = Math.max(0, state.score - 5);
        updateStats();
        setTimeout(() => { loadNextStreet(); }, 2000);
        return;
    }
}

document.addEventListener('keydown', (e) => {
    if (!state.isGameActive) return;
    const key = e.key.toUpperCase();
    if (key.length === 1) { // Accept any single character typing (Thai/English)
        handleGuess(key);
    }
});

// Hint Button
document.getElementById('hintBtn').addEventListener('click', () => {
    if (!state.isGameActive || state.isFinished) return;
    if (state.score < 10) {
        alert('คะแนนไม่พอใช้ตัวช่วย (ต้องการ 10 คะแนน)');
        return;
    }
    
    const unrevealed = [...new Set(state.currentWord.replace(/\s/g, '').split(''))]
                        .filter(ch => !state.guessedLetters.includes(ch));
    
    if (unrevealed.length > 0) {
        state.score -= 10;
        const randomChar = unrevealed[Math.floor(Math.random() * unrevealed.length)];
        handleGuess(randomChar);
    }
});

// ================================================================
//  4. ดึงข้อมูลชื่อถนนจาก Overpass API
// ================================================================
async function fetchStreetNames(bounds) {
    const bbox = `${bounds._southWest.lat},${bounds._southWest.lng},${bounds._northEast.lat},${bounds._northEast.lng}`;
    const query = `
        [out:json][timeout:25];
        way["highway"]["name"](${bbox});
        out geom;
    `;
    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const mapObj = new Map();
        data.elements.forEach(el => {
            if (el.tags && el.tags.name && el.geometry) {
                const name = el.tags.name.trim();
                if (name.length > 2 && !mapObj.has(name)) {
                    mapObj.set(name, {
                        name: name,
                        highway: el.tags.highway || 'unknown',
                        geometry: el.geometry
                    });
                }
            }
        });
        return shuffleArray(Array.from(mapObj.values()));
    } catch (error) {
        console.error('Overpass Error:', error);
        return [];
    }
}

function shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// ================================================================
//  5. Event: เมื่อผู้ใช้เลือกพื้นที่บนแผนที่ (ใช้ Shift + ลาก)
// ================================================================
map.on('boxzoomend', async function(e) {
    const bounds = e.boxZoomBounds;

    clearInterval(state.timerInterval);
    state.streetList = [];
    state.currentIndex = 0;
    state.currentRound = 0;
    state.correctAnswers = 0;
    state.score = 0;
    state.isGameActive = false;

    document.getElementById('wordDisplay').textContent = '⏳ กำลังโหลดถนน...';
    document.getElementById('hintMessage').textContent = 'กรุณารอสักครู่ (Overpass API)';
    updateStats();

    const streets = await fetchStreetNames(bounds);

    if (streets.length === 0) {
        document.getElementById('wordDisplay').textContent = '😅 ไม่พบถนนในพื้นที่นี้';
        document.getElementById('hintMessage').textContent = 'ลองเลือกพื้นที่ในเมืองกว้างๆ';
        return;
    }

    state.streetList = streets;
    state.currentIndex = 0;
    document.getElementById('hintMessage').textContent = `✅ พบ ${streets.length} ชื่อถนน! เริ่มเกมเลย`;
    
    // Zoom to area
    map.fitBounds(bounds);
    
    setTimeout(() => { loadNextStreet(); }, 1000);
});

// ================================================================
//  6. ปุ่มควบคุม
// ================================================================
document.getElementById('nextRoundBtn').addEventListener('click', () => {
    if (!state.isGameActive) return;
    clearInterval(state.timerInterval);
    state.score = Math.max(0, state.score - 5);
    loadNextStreet();
});

document.getElementById('resetGameBtn').addEventListener('click', () => {
    location.reload(); // Hard reset for map state
});

document.getElementById('playAgainBtn').addEventListener('click', () => {
    document.getElementById('summaryModal').classList.remove('active');
    state.currentRound = 0;
    state.score = 0;
    state.correctAnswers = 0;
    if (state.polyline) map.removeLayer(state.polyline);
    
    if (state.streetList.length > 0) {
        state.streetList = shuffleArray(state.streetList);
        state.currentIndex = 0;
        loadNextStreet();
    } else {
        location.reload();
    }
});

// ================================================================
//  7. เริ่มต้นครั้งแรก
// ================================================================
document.getElementById('wordDisplay').textContent = '🗺️ ลากกรอบบนแผนที่';
document.getElementById('hintMessage').textContent = 'กด Shift ค้าง + ลากเมาส์ เพื่อเลือกพื้นที่';
updateStats();

console.log('🎯 เกมทายชื่อถนนพร้อมใช้งาน!');
console.log('💡 กด Shift + ลากบนแผนที่เพื่อเริ่ม');
