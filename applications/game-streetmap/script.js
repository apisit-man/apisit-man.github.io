// ================================================================
//  1. ตัวแปรสถานะเกม
// ================================================================
const state = {
    streetList: [],
    currentIndex: 0,
    currentWord: '',
    currentHighway: '',
    guessedLetters: [],
    wrongGuesses: 0,
    maxWrong: 6,
    timeLeft: 20,
    timerInterval: null,
    score: 0,
    totalQuestions: 0,
    isGameActive: false,
    isFinished: false,
};

// ================================================================
//  2. ตั้งค่าแผนที่ + Area Select
// ================================================================
const map = L.map('map', {
    zoomControl: true,
    fadeAnimation: true,
}).setView([13.736717, 100.523186], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19,
}).addTo(map);

map.selectArea.setControlKey(true);

// ================================================================
//  3. ฟังก์ชันหลักของเกม
// ================================================================

function buildKeyboard() {
    const container = document.getElementById('keyboardContainer');
    container.innerHTML = '';
    for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i);
        const btn = document.createElement('button');
        btn.className = 'key';
        btn.textContent = letter;
        btn.dataset.letter = letter;
        btn.addEventListener('click', () => handleGuess(letter));
        container.appendChild(btn);
    }
}
buildKeyboard();

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
        `${state.currentIndex + 1} / ${state.streetList.length}`;
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

function loadNextStreet() {
    clearInterval(state.timerInterval);

    if (state.streetList.length === 0) {
        document.getElementById('wordDisplay').textContent = '❌ ไม่พบชื่อถนน';
        document.getElementById('hintMessage').textContent = 'ลองเลือกพื้นที่อื่นที่มีถนนเยอะๆ';
        state.isGameActive = false;
        updateStats();
        return;
    }

    if (state.currentIndex >= state.streetList.length) {
        state.currentIndex = 0;
        state.streetList = shuffleArray(state.streetList);
    }

    const item = state.streetList[state.currentIndex];
    state.currentWord = item.name.toUpperCase();
    state.currentHighway = item.highway || 'unknown';
    state.guessedLetters = [];
    state.wrongGuesses = 0;
    state.isGameActive = true;
    state.isFinished = false;
    state.totalQuestions += 1;

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
        clearInterval(state.timerInterval);
        const bonus = Math.max(0, Math.min(100, state.timeLeft * 5));
        const earned = 50 + bonus;
        state.score += Math.floor(earned);
        document.getElementById('hintMessage').innerHTML =
            `🎉 เก่งมาก! +${Math.floor(earned)} คะแนน (เหลือเวลา ${state.timeLeft}s)`;
        updateStats();
        setTimeout(() => {
            loadNextStreet();
        }, 1500);
        return;
    }

    if (state.wrongGuesses >= state.maxWrong) {
        state.isFinished = true;
        clearInterval(state.timerInterval);
        document.getElementById('hintMessage').innerHTML =
            `💀 ผิดครบ ${state.maxWrong} ครั้ง! คำตอบคือ "${state.currentWord}"`;
        state.score = Math.max(0, state.score - 10);
        updateStats();
        setTimeout(() => {
            loadNextStreet();
        }, 2000);
        return;
    }
}

document.addEventListener('keydown', (e) => {
    const key = e.key.toUpperCase();
    if (key >= 'A' && key <= 'Z') {
        handleGuess(key);
    }
});

// ================================================================
//  4. ดึงข้อมูลชื่อถนนจาก Overpass API
// ================================================================
async function fetchStreetNames(bounds) {
    const bbox =
        `${bounds._southWest.lat},${bounds._southWest.lng},${bounds._northEast.lat},${bounds._northEast.lng}`;
    const query = `
        [out:json][timeout:25];
        (
            way["highway"]["name"](${bbox});
            relation["highway"]["name"](${bbox});
        );
        out body;
    `;
    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const mapObj = new Map();
        data.elements.forEach(el => {
            if (el.tags && el.tags.name) {
                const name = el.tags.name.trim();
                if (name.length > 2 && !mapObj.has(name)) {
                    mapObj.set(name, {
                        name: name,
                        highway: el.tags.highway || 'unknown'
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
//  5. Event: เมื่อผู้ใช้เลือกพื้นที่บนแผนที่
// ================================================================
map.on('selectarea:selected', async function(e) {
    const bounds = e.bounds;

    clearInterval(state.timerInterval);
    state.streetList = [];
    state.currentIndex = 0;
    state.score = 0;
    state.totalQuestions = 0;
    state.isGameActive = false;

    document.getElementById('wordDisplay').textContent = '⏳ กำลังโหลดถนน...';
    document.getElementById('hintMessage').textContent = 'กรุณารอสักครู่ (Overpass API)';
    updateStats();

    const streets = await fetchStreetNames(bounds);

    if (streets.length === 0) {
        document.getElementById('wordDisplay').textContent = '😅 ไม่พบถนนในพื้นที่นี้';
        document.getElementById('hintMessage').textContent = 'ลองเลือกพื้นที่ในเมืองหรือเขตชุมชน';
        return;
    }

    state.streetList = streets;
    state.currentIndex = 0;
    document.getElementById('hintMessage').textContent =
        `✅ พบ ${streets.length} ชื่อถนน! เริ่มเกมเลย`;
    loadNextStreet();
});

// ================================================================
//  6. ปุ่มควบคุม
// ================================================================
document.getElementById('nextRoundBtn').addEventListener('click', () => {
    if (state.streetList.length === 0) {
        alert('กรุณาเลือกพื้นที่บนแผนที่ก่อน');
        return;
    }
    clearInterval(state.timerInterval);
    state.score = Math.max(0, state.score - 5);
    loadNextStreet();
});

document.getElementById('resetGameBtn').addEventListener('click', () => {
    clearInterval(state.timerInterval);
    state.streetList = [];
    state.currentIndex = 0;
    state.score = 0;
    state.isGameActive = false;
    document.getElementById('wordDisplay').textContent = '🗺️ ลากกรอบบนแผนที่';
    document.getElementById('hintMessage').textContent = 'กด Ctrl ค้าง + ลากเพื่อเลือกพื้นที่';
    document.getElementById('progressDisplay').textContent = '0 / 0';
    document.getElementById('categoryDisplay').textContent = '🏷️ —';
    document.getElementById('timerDisplay').textContent = '20';
    document.getElementById('scoreDisplay').textContent = '0';
    document.getElementById('wrongCount').textContent = '0';
    document.querySelectorAll('.key').forEach(btn => {
        btn.disabled = false;
        btn.className = 'key';
    });
    map.selectArea.clearSelection();
});

// ================================================================
//  7. เริ่มต้นครั้งแรก
// ================================================================
document.getElementById('wordDisplay').textContent = '🗺️ ลากกรอบบนแผนที่';
document.getElementById('hintMessage').textContent = 'กด Ctrl ค้าง + ลากเพื่อเลือกพื้นที่';
updateStats();

console.log('🎯 เกมทายชื่อถนนพร้อมใช้งาน!');
console.log('💡 กด Ctrl + ลากบนแผนที่เพื่อเริ่ม');