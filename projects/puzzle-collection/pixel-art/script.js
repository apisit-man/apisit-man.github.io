// Game State
let currentLevel = 1;
let currentPuzzle = null;
let currentGrid = [];
let gridSize = 5;
let audioCtx = null;

// Level Data with multiple puzzles per level
// 0 = White, 1 = Black
const levels = {
    1: { size: 5, puzzles: [
        { name: "รูปหัวใจ ❤️", target: [ [0,1,0,1,0], [1,1,1,1,1], [1,1,1,1,1], [0,1,1,1,0], [0,0,1,0,0] ] },
        { name: "รูปเรือใบ ⛵", target: [ [0,0,1,0,0], [0,1,1,0,0], [1,1,1,0,0], [1,1,1,1,1], [0,1,1,1,0] ] },
        { name: "รูปแอปเปิ้ล 🍎", target: [ [0,0,1,0,0], [0,1,1,1,0], [1,1,1,1,1], [1,1,1,1,1], [0,1,1,1,0] ] }
    ]},
    2: { size: 5, puzzles: [
        { name: "รูปน้องหมา 🐶", target: [ [0,1,1,0,0], [1,1,1,1,0], [0,1,1,1,1], [0,1,1,1,0], [1,1,0,1,1] ] },
        { name: "รูปบ้าน 🏠", target: [ [0,0,1,0,0], [0,1,1,1,0], [1,1,1,1,1], [0,1,1,1,0], [0,1,0,1,0] ] },
        { name: "เอเลี่ยน 👾", target: [ [1,0,1,0,1], [0,1,1,1,0], [1,1,1,1,1], [1,0,1,0,1], [1,0,0,0,1] ] }
    ]},
    3: { size: 8, puzzles: [
        { name: "รูปต้นไม้ 🌳", target: [ [0,0,0,1,1,0,0,0], [0,0,1,1,1,1,0,0], [0,1,1,1,1,1,1,0], [1,1,1,1,1,1,1,1], [0,1,1,1,1,1,1,0], [0,0,0,1,1,0,0,0], [0,0,0,1,1,0,0,0], [0,0,0,1,1,0,0,0] ] },
        { name: "รูปเห็ด 🍄", target: [ [0,0,1,1,1,1,0,0], [0,1,1,1,1,1,1,0], [1,1,1,1,1,1,1,1], [1,1,1,1,1,1,1,1], [0,0,1,1,1,1,0,0], [0,0,1,1,1,1,0,0], [0,0,1,1,1,1,0,0], [0,0,0,0,0,0,0,0] ] },
        { name: "ดาบอัศวิน 🗡️", target: [ [0,0,0,0,0,0,0,1], [0,0,0,0,0,0,1,1], [0,0,0,0,0,1,1,0], [0,0,0,0,1,1,0,0], [0,0,1,1,1,0,0,0], [0,1,1,1,0,0,0,0], [0,1,0,0,0,0,0,0], [1,0,0,0,0,0,0,0] ] }
    ]},
    4: { size: 8, puzzles: [
        { name: "รูปหน้ายิ้ม 😃", target: [ [0,0,1,1,1,1,0,0], [0,1,0,0,0,0,1,0], [1,0,1,0,0,1,0,1], [1,0,0,0,0,0,0,1], [1,0,1,0,0,1,0,1], [1,0,0,1,1,0,0,1], [0,1,0,0,0,0,1,0], [0,0,1,1,1,1,0,0] ] },
        { name: "ผีน้อย 👻", target: [ [0,0,1,1,1,1,0,0], [0,1,1,1,1,1,1,0], [1,1,0,1,1,0,1,1], [1,1,1,1,1,1,1,1], [1,1,1,1,1,1,1,1], [1,1,1,1,1,1,1,1], [1,0,1,1,1,1,0,1], [1,0,0,1,1,0,0,1] ] }
    ]},
    5: { size: 10, puzzles: [
        { name: "รูปจรวด 🚀", target: [ [0,0,0,0,1,1,0,0,0,0], [0,0,0,1,1,1,1,0,0,0], [0,0,0,1,1,1,1,0,0,0], [0,0,1,1,0,0,1,1,0,0], [0,0,1,1,0,0,1,1,0,0], [0,0,1,1,1,1,1,1,0,0], [0,1,1,1,1,1,1,1,1,0], [1,1,0,1,1,1,1,0,1,1], [1,0,0,1,0,0,1,0,0,1], [0,0,0,1,0,0,1,0,0,0] ] },
        { name: "รูปเรือรบ 🚢", target: [ [0,0,0,0,0,1,0,0,0,0], [0,0,0,0,0,1,0,0,0,0], [0,0,0,0,1,1,1,0,0,0], [0,0,0,1,1,1,1,0,0,0], [0,0,1,1,1,1,1,0,0,0], [1,1,1,1,1,1,1,1,1,1], [1,1,1,1,1,1,1,1,1,1], [0,1,1,1,1,1,1,1,1,0], [0,0,1,1,1,1,1,1,0,0], [0,0,0,0,0,0,0,0,0,0] ] }
    ]},
    6: { size: 10, puzzles: [
        { name: "หุ่นยนต์ 🤖", target: [ [0,0,1,1,1,1,1,1,0,0], [0,1,0,1,1,1,1,0,1,0], [0,1,1,1,1,1,1,1,1,0], [0,1,0,0,0,0,0,0,1,0], [0,1,1,1,1,1,1,1,1,0], [0,0,1,1,1,1,1,1,0,0], [0,0,0,1,1,1,1,0,0,0], [0,1,1,1,1,1,1,1,1,0], [0,1,0,1,1,1,1,0,1,0], [0,1,0,1,1,1,1,0,1,0] ] },
        { name: "จอยเกม 🎮", target: [ [0,0,0,0,0,0,0,0,0,0], [0,0,1,1,1,1,1,1,0,0], [0,1,1,1,1,1,1,1,1,0], [1,1,1,1,1,1,1,1,1,1], [1,1,0,1,1,1,1,0,1,1], [1,1,1,1,1,1,1,1,1,1], [1,1,1,0,0,0,0,1,1,1], [0,1,1,0,0,0,0,1,1,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0] ] }
    ]},
    7: { size: 10, puzzles: [
        { name: "ดอกไม้ 🌸", target: [ [0,0,0,1,1,1,0,0,0,0], [0,0,1,1,1,1,1,0,0,0], [0,1,1,0,0,0,1,1,0,0], [0,1,1,0,0,0,1,1,0,0], [0,1,1,0,0,0,1,1,0,0], [0,0,1,1,1,1,1,0,0,0], [0,0,0,1,1,1,0,0,0,0], [0,0,0,0,1,0,0,0,0,0], [0,0,0,1,1,0,0,0,0,0], [0,0,0,0,1,0,0,0,0,0] ] },
        { name: "พระอาทิตย์ ☀️", target: [ [0,0,1,0,0,0,1,0,0,0], [0,0,0,1,0,1,0,0,0,0], [1,0,0,0,1,0,0,0,1,0], [0,1,0,1,1,1,0,1,0,0], [0,0,1,1,1,1,1,0,0,0], [0,1,0,1,1,1,0,1,0,0], [1,0,0,0,1,0,0,0,1,0], [0,0,0,1,0,1,0,0,0,0], [0,0,1,0,0,0,1,0,0,0], [0,0,0,0,0,0,0,0,0,0] ] }
    ]},
    8: { size: 10, puzzles: [
        { name: "น้องแมว 🐱", target: [ [1,1,0,0,0,0,0,1,1,0], [1,1,1,0,0,0,1,1,1,0], [1,1,1,1,1,1,1,1,1,0], [1,1,0,1,1,1,0,1,1,0], [1,1,1,1,1,1,1,1,1,0], [1,1,1,0,0,0,1,1,1,0], [0,1,1,1,1,1,1,1,0,0], [0,0,1,1,1,1,1,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0] ] },
        { name: "ปลาปักเป้า 🐡", target: [ [0,0,0,1,0,1,0,0,0,0], [0,0,1,1,1,1,1,0,0,0], [0,1,1,1,1,1,1,1,0,0], [1,1,0,1,1,1,1,1,1,0], [0,1,1,1,1,1,1,1,1,1], [1,1,1,1,1,1,1,1,1,0], [0,1,1,1,1,1,1,1,0,0], [0,0,1,1,1,1,1,0,0,0], [0,0,0,1,0,1,0,0,0,0], [0,0,0,0,0,0,0,0,0,0] ] }
    ]},
    9: { size: 10, puzzles: [
        { name: "โล่ป้องกัน 🛡️", target: [ [0,1,1,1,1,1,1,1,1,0], [1,1,1,1,1,1,1,1,1,1], [1,1,0,0,1,1,0,0,1,1], [1,1,0,0,1,1,0,0,1,1], [1,1,1,1,1,1,1,1,1,1], [0,1,1,1,1,1,1,1,1,0], [0,0,1,1,0,0,1,1,0,0], [0,0,0,1,1,1,1,0,0,0], [0,0,0,0,1,1,0,0,0,0], [0,0,0,0,0,0,0,0,0,0] ] },
        { name: "ถ้วยรางวัล 🏆", target: [ [0,1,1,1,1,1,1,1,1,0], [1,1,1,1,1,1,1,1,1,1], [1,0,1,1,1,1,1,1,0,1], [1,1,1,1,1,1,1,1,1,1], [0,1,1,1,1,1,1,1,1,0], [0,0,0,1,1,1,1,0,0,0], [0,0,0,0,1,1,0,0,0,0], [0,0,0,0,1,1,0,0,0,0], [0,0,1,1,1,1,1,1,0,0], [0,1,1,1,1,1,1,1,1,0] ] }
    ]},
    10: { size: 10, puzzles: [
        { name: "เพชรเม็ดงาม 💎", target: [ [0,0,1,1,1,1,1,1,0,0], [0,1,1,1,1,1,1,1,1,0], [1,1,0,1,1,1,1,1,1,1], [1,1,1,1,1,1,1,1,1,1], [0,1,1,1,1,1,1,1,1,0], [0,0,1,1,1,1,1,1,0,0], [0,0,0,1,1,1,1,0,0,0], [0,0,0,0,1,1,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0] ] },
        { name: "มงกุฎราชา 👑", target: [ [1,0,0,0,1,1,0,0,0,1], [1,1,0,0,1,1,0,0,1,1], [1,1,1,0,1,1,0,1,1,1], [1,1,1,1,1,1,1,1,1,1], [1,1,1,1,1,1,1,1,1,1], [0,1,1,1,1,1,1,1,1,0], [0,1,1,1,1,1,1,1,1,0], [0,0,1,1,1,1,1,1,0,0], [0,0,0,1,1,1,1,0,0,0], [0,0,0,0,0,0,0,0,0,0] ] }
    ]}
};

// DOM Elements
const gridContainer = document.getElementById('grid-container');
const instructionsList = document.getElementById('instructions-list');
const btnCheck = document.getElementById('btn-check');
const btnClear = document.getElementById('btn-clear');
const currentLevelBadge = document.getElementById('current-level-badge');

// Modal Elements
const successModal = document.getElementById('success-modal');
const modalTitle = document.getElementById('modal-title');
const modalMessage = document.getElementById('modal-message');
const btnNextLevel = document.getElementById('btn-next-level');
const btnCloseModal = document.getElementById('btn-close-modal');

let isDrawing = false;
let paintMode = 1; // 1 for fill, 0 for erase

// Initialize Game
function initGame() {
    loadLevel(1);
    
    btnCheck.addEventListener('click', checkAnswer);
    btnClear.addEventListener('click', clearBoard);

    document.addEventListener('mouseup', () => { isDrawing = false; });
    document.addEventListener('touchend', () => { isDrawing = false; });
    document.addEventListener('mousedown', initAudio, { once: true });
    document.addEventListener('touchstart', initAudio, { once: true });
    
    // Global touchmove to handle dragging across cells on mobile
    gridContainer.addEventListener('touchmove', (e) => {
        if (!isDrawing) return;
        e.preventDefault(); // Prevent scrolling while drawing
        const touch = e.touches[0];
        const element = document.elementFromPoint(touch.clientX, touch.clientY);
        if (element && element.classList.contains('grid-cell')) {
            handleDrawMove(element);
        }
    }, { passive: false });
    
    const btnStartGame = document.getElementById('btn-start-game');
    const startModal = document.getElementById('start-modal');
    
    if (btnStartGame && startModal) {
        btnStartGame.addEventListener('click', () => {
            startModal.classList.add('hidden');
        });
    }

    // Modal Event Listeners
    btnNextLevel.addEventListener('click', () => {
        successModal.classList.add('hidden');
        if (btnNextLevel.dataset.action === "restart") {
            btnNextLevel.dataset.action = "";
            loadLevel(1);
        } else {
            const nextLevel = currentLevel + 1;
            if (levels[nextLevel]) {
                loadLevel(nextLevel);
            }
        }
    });

    btnCloseModal.addEventListener('click', () => {
        successModal.classList.add('hidden');
    });
}

function initAudio() {
    if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
            audioCtx = new AudioContext();
        }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

// Load a specific level and pick a random puzzle
function loadLevel(levelNum) {
    currentLevel = levelNum;
    const levelData = levels[levelNum];
    gridSize = levelData.size;
    
    const randomIndex = Math.floor(Math.random() * levelData.puzzles.length);
    currentPuzzle = levelData.puzzles[randomIndex];
    
    currentGrid = Array(gridSize).fill().map(() => Array(gridSize).fill(0));
    successModal.classList.add('hidden');
    
    if (currentLevelBadge) {
        currentLevelBadge.textContent = `⭐ ด่านที่ ${levelNum} / 10`;
    }
    
    renderGrid();
    generateInstructions();
    
    btnCheck.innerHTML = "✨ ตรวจคำตอบ!";
    btnCheck.style.backgroundColor = "";
}

// Render the playable grid
function renderGrid() {
    gridContainer.style.gridTemplateColumns = `auto repeat(${gridSize}, 1fr)`;
    gridContainer.innerHTML = '';
    
    for (let r = 0; r < gridSize; r++) {
        // Row Label
        const rowLabel = document.createElement('div');
        rowLabel.className = 'grid-row-label';
        rowLabel.textContent = `แถว ${r + 1}`;
        gridContainer.appendChild(rowLabel);

        for (let c = 0; c < gridSize; c++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            cell.dataset.row = r;
            cell.dataset.col = c;
            
            cell.addEventListener('mousedown', (e) => {
                handleDrawStart(e.target);
            });
            
            cell.addEventListener('mouseenter', (e) => {
                handleDrawMove(e.target);
            });

            cell.addEventListener('touchstart', (e) => {
                e.preventDefault();
                handleDrawStart(e.target);
            }, { passive: false });
            
            gridContainer.appendChild(cell);
        }
    }
}

function handleDrawStart(cell) {
    isDrawing = true;
    const r = parseInt(cell.dataset.row);
    const c = parseInt(cell.dataset.col);
    paintMode = currentGrid[r][c] === 0 ? 1 : 0;
    applyPaint(cell, r, c);
}

function handleDrawMove(cell) {
    if (!isDrawing) return;
    const r = parseInt(cell.dataset.row);
    const c = parseInt(cell.dataset.col);
    applyPaint(cell, r, c);
}

function applyPaint(cell, r, c) {
    if (currentGrid[r][c] !== paintMode) {
        currentGrid[r][c] = paintMode;
        if (paintMode === 1) {
            cell.classList.add('filled');
            playPaintSound(true);
        } else {
            cell.classList.remove('filled');
            playPaintSound(false);
        }
    }
}

// Generate Run-Length Encoded instructions based on the target
function generateInstructions() {
    instructionsList.innerHTML = '';
    const target = currentPuzzle.target;
    
    for (let r = 0; r < gridSize; r++) {
        const row = target[r];
        const runLengths = [];
        let count = 0;
        let currentColor = row[0];
        
        for (let c = 0; c < gridSize; c++) {
            if (row[c] === currentColor) {
                count++;
            } else {
                runLengths.push({ color: currentColor, count: count });
                currentColor = row[c];
                count = 1;
            }
        }
        runLengths.push({ color: currentColor, count: count });
        
        const rowEl = document.createElement('div');
        rowEl.className = 'instruction-row';
        
        const label = document.createElement('span');
        label.className = 'row-label';
        label.textContent = `แถว ${r + 1}:`;
        rowEl.appendChild(label);
        
        const blocks = document.createElement('div');
        blocks.className = 'blocks';
        
        runLengths.forEach(run => {
            const block = document.createElement('div');
            const colorClass = run.color === 1 ? 'black' : 'white';
            
            block.className = `block ${colorClass}`;
            block.textContent = run.count;
            blocks.appendChild(block);
        });
        
        rowEl.appendChild(blocks);
        instructionsList.appendChild(rowEl);
    }
}

// Check if user's grid matches the target
function checkAnswer() {
    const target = currentPuzzle.target;
    let isCorrect = true;
    
    for (let r = 0; r < gridSize; r++) {
        for (let c = 0; c < gridSize; c++) {
            if (currentGrid[r][c] !== target[r][c]) {
                isCorrect = false;
                break;
            }
        }
        if (!isCorrect) break;
    }
    
    if (isCorrect) {
        celebrate();
    } else {
        gridContainer.animate([
            { transform: 'translateX(0)' },
            { transform: 'translateX(-10px)' },
            { transform: 'translateX(10px)' },
            { transform: 'translateX(-10px)' },
            { transform: 'translateX(10px)' },
            { transform: 'translateX(0)' }
        ], { duration: 400, iterations: 1 });
    }
}

function clearBoard() {
    currentGrid = Array(gridSize).fill().map(() => Array(gridSize).fill(0));
    const cells = document.querySelectorAll('.grid-cell');
    cells.forEach(cell => cell.classList.remove('filled'));
}

// Sound Effects
function playPaintSound(isFilled) {
    if (!audioCtx || audioCtx.state !== 'running') return;
    
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(isFilled ? 600 : 350, audioCtx.currentTime);
    
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.15, audioCtx.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + 0.1);
}

function playSuccessSound() {
    if (!audioCtx || audioCtx.state !== 'running') return;
    
    const playNote = (frequency, startTime, duration) => {
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(frequency, audioCtx.currentTime + startTime);
        
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime + startTime);
        gainNode.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + startTime + 0.05);
        gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + startTime + duration);
        
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        osc.start(audioCtx.currentTime + startTime);
        osc.stop(audioCtx.currentTime + startTime + duration);
    };

    // Play a happy arpeggio
    playNote(261.63, 0, 0.15); // C4
    playNote(329.63, 0.15, 0.15); // E4
    playNote(392.00, 0.3, 0.15); // G4
    playNote(523.25, 0.45, 0.4); // C5
}

function playApplauseSound() {
    if (!audioCtx || audioCtx.state !== 'running') return;
    
    // Play Fanfare
    const playNote = (frequency, startTime, duration) => {
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.type = 'square';
        osc.frequency.value = frequency;
        
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime + startTime);
        gainNode.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + startTime + 0.05);
        gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + startTime + duration);
        
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        osc.start(audioCtx.currentTime + startTime);
        osc.stop(audioCtx.currentTime + startTime + duration);
    };

    // Grand Fanfare melody
    playNote(392.00, 0, 0.2); // G4
    playNote(392.00, 0.2, 0.2); // G4
    playNote(392.00, 0.4, 0.2); // G4
    playNote(523.25, 0.6, 0.8); // C5

    // Simulate Applause/Cheering with filtered noise
    const bufferSize = audioCtx.sampleRate * 2.5; 
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }
    const noiseSource = audioCtx.createBufferSource();
    noiseSource.buffer = buffer;
    
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1000;

    const noiseGain = audioCtx.createGain();
    noiseGain.gain.setValueAtTime(0, audioCtx.currentTime + 0.6);
    noiseGain.gain.linearRampToValueAtTime(0.25, audioCtx.currentTime + 0.8);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 3.0);

    noiseSource.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(audioCtx.destination);
    
    noiseSource.start(audioCtx.currentTime + 0.6);
}

function celebrate() {
    const levelName = currentPuzzle.name;
    const isLastLevel = !levels[currentLevel + 1];
    
    if (isLastLevel) {
        playApplauseSound();
        confetti({
            particleCount: 300,
            spread: 120,
            origin: { y: 0.6 },
            colors: ['#8A2BE2', '#00C9A7', '#ffe66d', '#ff6b6b', '#3B82F6']
        });
    } else {
        playSuccessSound();
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#8A2BE2', '#00C9A7', '#ffe66d', '#ff6b6b']
        });
    }
    
    btnCheck.innerHTML = `🎉 ถูกต้อง!`;
    btnCheck.style.backgroundColor = "var(--primary-color)";
    
    setTimeout(() => {
        if (!isLastLevel) {
            modalTitle.innerHTML = "🎉 ยอดเยี่ยม!";
            modalMessage.innerHTML = `นี่คือ <strong>${levelName}</strong>`;
            btnNextLevel.style.display = 'flex';
            btnNextLevel.innerHTML = "ไปด่านต่อไปเลย! ➡️";
        } else {
            modalTitle.innerHTML = "🏆 ยินดีด้วย!";
            modalMessage.innerHTML = `เก่งมากๆ! คุณผ่านครบทั้ง 10 ด่านแล้ว!<br>ภาพสุดท้ายคือ <strong>${levelName}</strong>`;
            btnNextLevel.style.display = 'flex';
            btnNextLevel.innerHTML = "🔄 เริ่มเล่นใหม่ตั้งแต่ด่าน 1";
            btnNextLevel.dataset.action = "restart";
        }
        successModal.classList.remove('hidden');
    }, 1500);
}

// Start
document.addEventListener('DOMContentLoaded', initGame);
