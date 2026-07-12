// Web Audio API Synthesizer for self-contained sound effects
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

function playTone(freq, type, duration, vol = 0.1) {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
    
    gainNode.gain.setValueAtTime(vol, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + duration);
}

function playPop() {
    playTone(400, 'sine', 0.1, 0.2);
}

function playUndo() {
    playTone(200, 'triangle', 0.1, 0.1);
}

function playError() {
    playTone(150, 'sawtooth', 0.2, 0.1);
}

function playWin() {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    // Simple arpeggio
    const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5
    notes.forEach((freq, i) => {
        setTimeout(() => playTone(freq, 'square', 0.3, 0.1), i * 100);
    });
}

// Confetti Effect
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
let confettiParticles = [];
let confettiAnimationId;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function createConfetti() {
    const colors = ['#00ffcc', '#ff007f', '#ffd700', '#ffffff'];
    for (let i = 0; i < 100; i++) {
        confettiParticles.push({
            x: canvas.width / 2,
            y: canvas.height / 2 + 50,
            r: Math.random() * 6 + 2,
            dx: Math.random() * 10 - 5,
            dy: Math.random() * -10 - 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            tilt: Math.floor(Math.random() * 10) - 10,
            tiltAngle: 0,
            tiltAngleInc: (Math.random() * 0.07) + 0.05
        });
    }
}

function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettiParticles.forEach((p, index) => {
        p.tiltAngle += p.tiltAngleInc;
        p.y += (Math.cos(p.tiltAngle) + 1 + p.r / 2) / 2;
        p.x += Math.sin(p.tiltAngle) * 2;
        p.dy += 0.1; // gravity
        p.x += p.dx;
        p.y += p.dy;

        ctx.beginPath();
        ctx.lineWidth = p.r;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r);
        ctx.stroke();

        if (p.y > canvas.height) {
            confettiParticles.splice(index, 1);
        }
    });

    if (confettiParticles.length > 0) {
        confettiAnimationId = requestAnimationFrame(drawConfetti);
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

function fireConfetti() {
    confettiParticles = [];
    createConfetti();
    if (confettiAnimationId) cancelAnimationFrame(confettiAnimationId);
    drawConfetti();
}


// Game Logic
const levelConfigs = [
    { size: 3, numObstacles: 0 }, // Level 1
    { size: 3, numObstacles: 1 }, // Level 2
    { size: 4, numObstacles: 1 }, // Level 3
    { size: 4, numObstacles: 2 }, // Level 4
    { size: 5, numObstacles: 2 }, // Level 5
    { size: 5, numObstacles: 3 }, // Level 6
    { size: 6, numObstacles: 4 }  // Level 7
];

function generateSolvableLevel(size, numObstacles) {
    const totalCells = size * size;
    const targetLength = totalCells - numObstacles;
    
    function checkSolvable(start, obs) {
        let iterations = 0;
        function dfs(path) {
            if (path.length === targetLength) return true;
            iterations++;
            if (iterations > 3000) return false; 
            const lastCell = path[path.length - 1];
            const x = lastCell % size;
            const y = Math.floor(lastCell / size);
            const deltas = [{x:0, y:-1}, {x:0, y:1}, {x:-1, y:0}, {x:1, y:0}];
            for (let d of deltas) {
                const nx = x + d.x;
                const ny = y + d.y;
                if (nx >= 0 && nx < size && ny >= 0 && ny < size) {
                    const idx = ny * size + nx;
                    if (!obs.includes(idx) && !path.includes(idx)) {
                        if (dfs([...path, idx])) return true;
                    }
                }
            }
            return false;
        }
        return dfs([start]);
    }

    while (true) {
        const start = Math.floor(Math.random() * totalCells);
        const obs = [];
        while (obs.length < numObstacles) {
            const r = Math.floor(Math.random() * totalCells);
            if (r !== start && !obs.includes(r)) obs.push(r);
        }
        if (checkSolvable(start, obs)) {
            return { startCell: start, obstacles: obs };
        }
    }
}

let currentLevelIndex = 0;
let gridSize = 3;
let totalCells = 9;
let startCell = 0;
let obstacles = [];
let path = [];
let isDrawing = false;
let gameWon = false;
let currentPointerPos = null;

const gridContainer = document.getElementById('grid');
const levelDisplay = document.getElementById('level-display');
const hintBtn = document.getElementById('hint-btn');
const restartBtn = document.getElementById('restart-btn');
const overlay = document.getElementById('message-overlay');
const nextLevelBtn = document.getElementById('next-level-btn');
const msgText = document.getElementById('message-text');
const timerDisplay = document.getElementById('timer-display');
const timeTakenText = document.getElementById('time-taken-text');
const infoBtn = document.getElementById('info-btn');
const infoOverlay = document.getElementById('info-overlay');
const closeInfoBtn = document.getElementById('close-info-btn');

// Timer Logic
let timerInterval;
let startTime;
let elapsedTime = 0;

function startTimer() {
    clearInterval(timerInterval);
    startTime = Date.now();
    elapsedTime = 0;
    updateTimerDisplay();
    timerInterval = setInterval(() => {
        elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        updateTimerDisplay();
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function updateTimerDisplay() {
    const minutes = Math.floor(elapsedTime / 60).toString().padStart(2, '0');
    const seconds = (elapsedTime % 60).toString().padStart(2, '0');
    timerDisplay.textContent = `${minutes}:${seconds}`;
}

function initLevel() {
    if (currentLevelIndex >= levelConfigs.length) {
        // Game completed
        overlay.classList.remove('hidden');
        msgText.textContent = "You Beat All Levels!";
        nextLevelBtn.textContent = "Play Again";
        nextLevelBtn.onclick = () => {
            currentLevelIndex = 0;
            initLevel();
        };
        fireConfetti();
        playWin();
        
        const cheerAudio = new Audio('../projectile-game/cheer.wav');
        cheerAudio.play().catch(e => console.log('Cheer audio error:', e));
        
        return;
    }

    const config = levelConfigs[currentLevelIndex];
    gridSize = config.size;
    totalCells = gridSize * gridSize;
    
    // Procedurally generate a solvable layout for this difficulty
    const generated = generateSolvableLevel(gridSize, config.numObstacles);
    startCell = generated.startCell;
    obstacles = generated.obstacles;
    
    path = [];
    isDrawing = false;
    gameWon = false;
    overlay.classList.add('hidden');
    infoOverlay.classList.add('hidden');
    
    levelDisplay.textContent = `Level ${currentLevelIndex + 1}`;
    
    startTimer();
    
    // Setup Grid CSS
    gridContainer.style.setProperty('--grid-size', gridSize);
    gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    
    renderGrid();
}

function renderGrid() {
    gridContainer.innerHTML = '';
    
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("id", "path-svg");
    gridContainer.appendChild(svg);
    
    for (let i = 0; i < totalCells; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        
        if (obstacles.includes(i)) {
            cell.classList.add('obstacle');
        } else if (i === startCell) {
            cell.classList.add('start');
        }
        
        // Desktop Events
        cell.addEventListener('mousedown', handlePointerDown);
        cell.addEventListener('mouseenter', handlePointerEnter);
        
        gridContainer.appendChild(cell);
    }
}

// Coordinate utilities
function getCoords(index) {
    return { x: index % gridSize, y: Math.floor(index / gridSize) };
}

function areAdjacent(idx1, idx2) {
    const c1 = getCoords(idx1);
    const c2 = getCoords(idx2);
    const dx = Math.abs(c1.x - c2.x);
    const dy = Math.abs(c1.y - c2.y);
    return (dx === 1 && dy === 0) || (dx === 0 && dy === 1);
}

function updateCellVisuals() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, idx) => {
        // Reset classes except start and obstacle
        cell.classList.remove('path');
        if (path.includes(idx)) {
            cell.classList.add('path');
        }
    });
    drawPathLines();
}

function drawPathLines() {
    const svg = document.getElementById('path-svg');
    if (!svg) return;
    
    while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
    }
    
    if (path.length === 0) return;
    
    const gridRect = svg.getBoundingClientRect();
    
    const points = path.map(idx => {
        const cell = document.querySelector(`.cell[data-index="${idx}"]`);
        if (!cell) return null;
        const rect = cell.getBoundingClientRect();
        const cx = rect.left + rect.width / 2 - gridRect.left;
        const cy = rect.top + rect.height / 2 - gridRect.top;
        return {x: cx, y: cy};
    }).filter(p => p !== null);
    
    if (points.length >= 2) {
        const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
        polyline.setAttribute("points", points.map(p => `${p.x},${p.y}`).join(" "));
        polyline.setAttribute("class", "path-line");
        svg.appendChild(polyline);
    }
    
    if (isDrawing && currentPointerPos && points.length > 0 && !gameWon) {
        const lastPoint = points[points.length - 1];
        const pointerX = currentPointerPos.x - gridRect.left;
        const pointerY = currentPointerPos.y - gridRect.top;
        
        if (pointerX >= -50 && pointerX <= gridRect.width + 50 && pointerY >= -50 && pointerY <= gridRect.height + 50) {
            const activeLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
            activeLine.setAttribute("x1", lastPoint.x);
            activeLine.setAttribute("y1", lastPoint.y);
            activeLine.setAttribute("x2", pointerX);
            activeLine.setAttribute("y2", pointerY);
            activeLine.setAttribute("class", "path-line active-line");
            svg.appendChild(activeLine);
        }
    }
}

function checkWin() {
    const targetLength = totalCells - obstacles.length;
    if (path.length === targetLength) {
        gameWon = true;
        isDrawing = false;
        stopTimer();
        playWin();
        fireConfetti();
        
        const minutes = Math.floor(elapsedTime / 60).toString().padStart(2, '0');
        const seconds = (elapsedTime % 60).toString().padStart(2, '0');
        timeTakenText.textContent = `Time: ${minutes}:${seconds}`;
        
        setTimeout(() => {
            overlay.classList.remove('hidden');
            msgText.textContent = "Level Cleared!";
            nextLevelBtn.onclick = () => {
                currentLevelIndex++;
                initLevel();
            };
        }, 1000);
    }
}

// DFS Solver for Hints
let searchIterations = 0;

function findSolution(currentPath) {
    const targetLength = totalCells - obstacles.length;
    if (currentPath.length === targetLength) return currentPath;

    searchIterations++;
    if (searchIterations > 100000) return null; // Safe guard

    const lastCell = currentPath[currentPath.length - 1];
    const neighbors = [];
    const c = getCoords(lastCell);
    const deltas = [{x:0, y:-1}, {x:0, y:1}, {x:-1, y:0}, {x:1, y:0}];
    
    for (let d of deltas) {
        const nx = c.x + d.x;
        const ny = c.y + d.y;
        if (nx >= 0 && nx < gridSize && ny >= 0 && ny < gridSize) {
            const idx = ny * gridSize + nx;
            if (!obstacles.includes(idx) && !currentPath.includes(idx)) {
                neighbors.push(idx);
            }
        }
    }

    for (let n of neighbors) {
        const sol = findSolution([...currentPath, n]);
        if (sol) return sol;
    }
    
    return null;
}

function showHint() {
    if (gameWon) return;
    if (audioCtx.state === 'suspended') audioCtx.resume();
    
    // Clear any previous hint visual
    document.querySelectorAll('.hint-flash').forEach(el => el.classList.remove('hint-flash'));
    document.querySelectorAll('.error-flash').forEach(el => el.classList.remove('error-flash'));

    searchIterations = 0;
    const pathToCheck = path.length > 0 ? path : [startCell];
    const sol = findSolution(pathToCheck);

    if (sol) {
        // Solution found, highlight next step
        const nextIdx = sol[pathToCheck.length];
        if (nextIdx !== undefined) {
            const cell = document.querySelector(`.cell[data-index="${nextIdx}"]`);
            if (cell) {
                cell.classList.add('hint-flash');
                playTone(600, 'sine', 0.1, 0.1);
                
                cell.addEventListener('mouseenter', function onHover() {
                    cell.classList.remove('hint-flash');
                    cell.removeEventListener('mouseenter', onHover);
                }, {once: true});

                setTimeout(() => {
                    if (cell.classList.contains('hint-flash')) {
                        cell.classList.remove('hint-flash');
                    }
                }, 3000);
            }
        }
    } else {
        // Dead end
        playError();
        // Flash current path red
        if (path.length > 0) {
            path.forEach(idx => {
                const cell = document.querySelector(`.cell[data-index="${idx}"]`);
                if(cell) {
                    cell.classList.add('error-flash');
                    setTimeout(() => cell.classList.remove('error-flash'), 1000);
                }
            });
        } else {
             const cell = document.querySelector(`.cell[data-index="${startCell}"]`);
             if(cell) {
                 cell.classList.add('error-flash');
                 setTimeout(() => cell.classList.remove('error-flash'), 1000);
             }
        }
    }
}

// Interaction Handlers
function handlePointerDown(e) {
    if (gameWon) return;
    
    const targetIdx = parseInt(e.target.dataset.index);
    if (isNaN(targetIdx) || obstacles.includes(targetIdx)) return;

    if (path.length === 0 && targetIdx === startCell) {
        isDrawing = true;
        path.push(targetIdx);
        playPop();
        updateCellVisuals();
        checkWin(); // Just in case a 1x1 level exists
    } else if (path.length > 0 && targetIdx === path[path.length - 1]) {
        isDrawing = true; // Resume drawing from end of path
    } else if (path.length > 0 && targetIdx === startCell) {
        // Reset path if clicking start again
        path = [startCell];
        isDrawing = true;
        playPop();
        updateCellVisuals();
    }
}

function handlePointerEnter(e) {
    if (!isDrawing || gameWon) return;
    
    const targetIdx = parseInt(e.target.dataset.index);
    if (isNaN(targetIdx) || obstacles.includes(targetIdx)) return;

    const lastIdx = path[path.length - 1];
    
    // Check if moving to an adjacent cell
    if (areAdjacent(lastIdx, targetIdx)) {
        // Are we moving forward to a new cell?
        if (!path.includes(targetIdx)) {
            path.push(targetIdx);
            playPop();
            updateCellVisuals();
            checkWin();
        } 
        // Are we moving backwards to undo?
        else if (path.length > 1 && targetIdx === path[path.length - 2]) {
            path.pop();
            playUndo();
            updateCellVisuals();
        }
    }
}

// Global Up Event
document.addEventListener('mouseup', () => {
    isDrawing = false;
    currentPointerPos = null;
    drawPathLines();
});
document.addEventListener('touchend', () => {
    isDrawing = false;
    currentPointerPos = null;
    drawPathLines();
});

document.addEventListener('mousemove', (e) => {
    if (isDrawing && !gameWon) {
        currentPointerPos = { x: e.clientX, y: e.clientY };
        drawPathLines();
    }
});

// Mobile Touch Support
gridContainer.addEventListener('touchmove', (e) => {
    if (!isDrawing || gameWon) return;
    e.preventDefault(); // Prevent scrolling
    
    const touch = e.touches[0];
    currentPointerPos = { x: touch.clientX, y: touch.clientY };
    drawPathLines();
    
    const targetElement = document.elementFromPoint(touch.clientX, touch.clientY);
    
    if (targetElement && targetElement.classList.contains('cell')) {
        // Fake a mouseenter event
        handlePointerEnter({ target: targetElement });
    }
}, { passive: false });

gridContainer.addEventListener('touchstart', (e) => {
    if (gameWon) return;
    const targetElement = e.target;
    if (targetElement.classList.contains('cell')) {
        // Fake a mousedown event
        handlePointerDown({ target: targetElement });
    }
});

restartBtn.addEventListener('click', () => {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    initLevel();
});

hintBtn.addEventListener('click', showHint);

infoBtn.addEventListener('click', () => {
    infoOverlay.classList.remove('hidden');
});

closeInfoBtn.addEventListener('click', () => {
    infoOverlay.classList.add('hidden');
});

// Initialize game on load
document.addEventListener('DOMContentLoaded', () => {
    // Need user interaction to unlock audio in browsers, so we resume context on first click anywhere
    document.body.addEventListener('click', () => {
        if (audioCtx.state === 'suspended') audioCtx.resume();
    }, { once: true });
    
    initLevel();
});


// Share Functions
const gameUrl = "https://apisittongchai.github.io/learning%20games/line-tracing-puzzle/";
const shareText = "มาฝึกสมอง ประลองปัญญากับเกมลากเส้น Neon Path! เกมที่ช่วยฝึก Logical Thinking และแก้ปัญหา ไปลองเล่นกันเลย!";

function copyLink(msg = "คัดลอกลิงก์สำเร็จ!") {
    navigator.clipboard.writeText(gameUrl).then(() => {
        const toast = document.getElementById("copy-toast");
        toast.textContent = msg;
        toast.style.display = "block";
        setTimeout(() => toast.style.display = "none", 3000);
    });
}

function shareLine() {
    window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(gameUrl)}&text=${encodeURIComponent(shareText)}`, "_blank");
}

function shareFB() {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(gameUrl)}`, "_blank");
}

function shareIG() {
    if (navigator.share) {
        navigator.share({
            title: 'Neon Path',
            text: shareText,
            url: gameUrl
        }).catch(console.error);
    } else {
        copyLink("คัดลอกลิงก์แล้ว! นำไปวางใน IG ได้เลยครับ");
    }
}

