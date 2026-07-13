import { generatePuzzle, symbolSvg, LEVELS } from './puzzle.js';
import { dist, pointToSegmentDistance, segmentDistance, polylineToPath, simplifyPoints } from './math.js';
import { playSuccess, playError, playLevelComplete, playStartDrawing, playUndo, playHint, isSoundOn, toggleSound } from './audio.js';

const NS = "http://www.w3.org/2000/svg";

// DOM Elements
const board = document.getElementById("board");
const nodeLayer = document.getElementById("nodeLayer");
const savedPathsGroup = document.getElementById("savedPaths");
const draftPath = document.getElementById("draftPath");
const hintPath = document.getElementById("hintPath");
const levelText = document.getElementById("levelText");
const progressText = document.getElementById("progressText");
const timeText = document.getElementById("timeText");
const messageBox = document.getElementById("message");
const undoBtn = document.getElementById("undoBtn");
const hintBtn = document.getElementById("hintBtn");
const startOverBtn = document.getElementById("startOverBtn");
const resetBtn = document.getElementById("resetBtn");
const nextBtn = document.getElementById("nextBtn");
const soundBtn = document.getElementById("soundBtn");
const rulesBtn = document.getElementById("rulesBtn");
const rulesModal = document.getElementById("rulesModal");
const closeRulesBtn = document.getElementById("closeRulesBtn");
const winModal = document.getElementById("winModal");
const replayBtn = document.getElementById("replayBtn");
const modalNextBtn = document.getElementById("modalNextBtn");
const confettiCanvas = document.getElementById("confettiCanvas");

// State
let currentLevel = 1;
let puzzle = null;
let connections = [];
let drawing = null;
let timerId = null;
let startedAt = 0;
let hintsUsed = 0;
let mistakes = 0;
let maxUnlockedLevel = 1;

function initSaveData() {
  const saved = localStorage.getItem('connectNoCrossSave');
  if (saved) {
    try {
      const data = JSON.parse(saved);
      maxUnlockedLevel = data.maxUnlockedLevel || 1;
      currentLevel = data.currentLevel || 1;
    } catch (e) {
      console.error("Failed to parse save data", e);
    }
  }
}

function saveData() {
  localStorage.setItem('connectNoCrossSave', JSON.stringify({
    maxUnlockedLevel,
    currentLevel
  }));
}

function rand(min, max) { return Math.random() * (max - min) + min; }

// Core render
function renderPuzzle() {
  nodeLayer.innerHTML = "";
  savedPathsGroup.innerHTML = "";
  draftPath.setAttribute("d", "");
  hintPath.setAttribute("d", "");
  connections = [];
  drawing = null;
  hintsUsed = 0;
  mistakes = 0;

  for (const node of puzzle.nodes) {
    const el = document.createElement("button");
    el.type = "button";
    el.className = "node group";
    el.dataset.nodeId = node.id;
    el.style.left = `${node.x / 10}%`;
    el.style.top = `${node.y / 10}%`;
    el.style.color = node.color;
    el.innerHTML = symbolSvg(node.symbol);
    el.setAttribute("aria-label", `สัญลักษณ์ ${node.symbol}`);
    el.addEventListener("pointerdown", startDrawing);
    nodeLayer.appendChild(el);
    node.el = el;
  }

  updateHud();
  restartTimer();
}

function restartTimer() {
  clearInterval(timerId);
  startedAt = Date.now();
  timeText.textContent = "00:00";
  timerId = setInterval(() => {
    const sec = Math.floor((Date.now() - startedAt) / 1000);
    const mm = String(Math.floor(sec / 60)).padStart(2, "0");
    const ss = String(sec % 60).padStart(2, "0");
    timeText.textContent = `${mm}:${ss}`;
  }, 500);
}

function getSvgPoint(evt) {
  const rect = board.getBoundingClientRect();
  return {
    x: (evt.clientX - rect.left) / rect.width * 1000,
    y: (evt.clientY - rect.top) / rect.height * 1000
  };
}

function insideCircle(p, margin = 0) { return dist(p, { x: 500, y: 500 }) <= 470 - margin; }

function nodeAtPoint(evt) {
  const el = document.elementFromPoint(evt.clientX, evt.clientY)?.closest(".node");
  return el ? puzzle.nodes[Number(el.dataset.nodeId)] : null;
}

function startDrawing(evt) {
  const node = puzzle.nodes[Number(evt.currentTarget.dataset.nodeId)];
  if (node.connected) return;
  evt.preventDefault();
  
  if (navigator.vibrate) navigator.vibrate(20);
  playStartDrawing();
  
  drawing = { startNode: node, points: [{ x: node.x, y: node.y }], invalid: false };
  node.el.classList.add("active");
  board.setPointerCapture(evt.pointerId);
  board.addEventListener("pointermove", moveDrawing);
  board.addEventListener("pointerup", endDrawing, { once: true });
  board.addEventListener("pointercancel", cancelDrawing, { once: true });
}

function moveDrawing(evt) {
  if (!drawing) return;
  const p = getSvgPoint(evt);
  const last = drawing.points[drawing.points.length - 1];
  if (dist(p, last) < 7) return;
  drawing.points.push(p);
  const pts = simplifyPoints(drawing.points, 6);
  draftPath.setAttribute("d", polylineToPath(pts));
  const targetNode = nodeAtPoint(evt);
  drawing.invalid = !validateLivePath(pts, drawing.startNode.id, targetNode?.id);
  draftPath.classList.toggle("invalid", drawing.invalid);
}

function validateLivePath(points, startNodeId, targetNodeId) {
  if (points.some(p => !insideCircle(p, 8))) return false;
  const startNode = puzzle.nodes[startNodeId];
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1], b = points[i];
    for (const c of connections) {
      for (let j = 1; j < c.points.length; j++) {
        if (segmentDistance(a, b, c.points[j - 1], c.points[j]) < 14) return false;
      }
    }
    for (const node of puzzle.nodes) {
      if (node.id === startNodeId || node.connected || node.id === targetNodeId) continue;
      if (pointToSegmentDistance(node, a, b) < 38) return false;
    }
  }
  return true;
}

function endDrawing(evt) {
  board.removeEventListener("pointermove", moveDrawing);
  if (!drawing) return;
  const target = nodeAtPoint(evt);
  const start = drawing.startNode;
  const points = simplifyPoints([...drawing.points], 8);
  draftPath.setAttribute("d", "");
  draftPath.classList.remove("invalid");
  start.el.classList.remove("active");

  if (!target || target.id === start.id) {
    drawing = null;
    return;
  }
  points.push({ x: target.x, y: target.y });
  if (target.connected) return reject("รูปนี้เชื่อมไปแล้ว", "soft");
  if (target.pairId !== start.pairId) return reject("ยังไม่ใช่คู่เดียวกัน", "error");
  if (!validateFinalPath(points, start.id, target.id)) return reject("เส้นชน ออกนอกวงกลม หรือผ่านรูปอื่น", "error");

  acceptConnection(start, target, points);
  drawing = null;
}

function validateFinalPath(points, startId, endId) {
  if (points.some(p => !insideCircle(p, 8))) return false;
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1], b = points[i];
    for (const c of connections) {
      for (let j = 1; j < c.points.length; j++) {
        if (segmentDistance(a, b, c.points[j - 1], c.points[j]) < 14) return false;
      }
    }
    for (const node of puzzle.nodes) {
      if (node.id === startId || node.id === endId) continue;
      if (pointToSegmentDistance(node, a, b) < 38) return false;
    }
  }
  return true;
}

function acceptConnection(start, target, points) {
  const pair = puzzle.pairs[start.pairId];
  const pathEl = document.createElementNS(NS, "path");
  pathEl.setAttribute("class", "saved-path");
  pathEl.setAttribute("stroke", pair.color);
  pathEl.setAttribute("d", polylineToPath(points));
  savedPathsGroup.appendChild(pathEl);
  start.connected = true;
  target.connected = true;
  start.el.classList.add("connected");
  target.el.classList.add("connected");
  connections.push({ pairId: pair.id, startId: start.id, endId: target.id, points, pathEl });
  
  if (navigator.vibrate) navigator.vibrate(30);
  playSuccess();
  showMessage("เชื่อมถูกต้อง!", "good");
  updateHud();
  if (connections.length === puzzle.pairs.length) setTimeout(completeLevel, 450);
}

function reject(message, type) {
  mistakes++;
  drawing = null;
  if (navigator.vibrate) navigator.vibrate([50, 50, 50]);
  playError();
  showMessage(message, type === "error" ? "bad" : "");
}

function cancelDrawing() {
  board.removeEventListener("pointermove", moveDrawing);
  if (drawing?.startNode?.el) drawing.startNode.el.classList.remove("active");
  draftPath.setAttribute("d", "");
  drawing = null;
}

function undoLast() {
  const c = connections.pop();
  if (!c) return;
  c.pathEl.remove();
  for (const id of [c.startId, c.endId]) {
    puzzle.nodes[id].connected = false;
    puzzle.nodes[id].el.classList.remove("connected");
  }
  updateHud();
  playUndo();
}

function showHint() {
  const pair = puzzle.pairs.find(p => !puzzle.nodes[p.a].connected);
  if (!pair) return;
  hintsUsed++;
  const a = puzzle.nodes[pair.a], b = puzzle.nodes[pair.b];
  hintPath.setAttribute("d", `M ${a.x} ${a.y} L ${b.x} ${b.y}`);
  hintPath.classList.remove("show");
  void hintPath.getBoundingClientRect();
  hintPath.classList.add("show");
  playHint();
}

function updateHud() {
  levelText.textContent = `ระดับ ${currentLevel}`;
  progressText.textContent = `${connections.length}`;
  document.getElementById("progressTotal").textContent = `${puzzle?.pairs.length ?? LEVELS[currentLevel].pairs}`;
  
  undoBtn.disabled = connections.length === 0;
  
  if (connections.length === (puzzle?.pairs.length ?? LEVELS[currentLevel].pairs)) {
     nextBtn.disabled = false;
  } else {
     nextBtn.disabled = true;
  }

  // Update level pills
  document.querySelectorAll(".level-pill").forEach(btn => {
    const lvl = Number(btn.dataset.level);
    btn.className = "level-pill w-12 h-12 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 font-bold transition-all";
    if (lvl === currentLevel) {
      btn.classList.add("active");
    } else if (lvl < maxUnlockedLevel) {
      btn.classList.add("completed");
    } else if (lvl > maxUnlockedLevel) {
      btn.classList.add("locked");
    }
  });
}

function showMessage(msg, kind = "") {
  messageBox.textContent = msg;
  messageBox.className = `message rounded-xl py-2 px-3 text-center text-xs md:text-sm font-medium mb-4 transition-colors shake ${kind}`;
  clearTimeout(showMessage._t);
  showMessage._t = setTimeout(() => {
    messageBox.className = "message bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 rounded-xl py-2 px-3 text-center text-xs md:text-sm font-medium mb-4 transition-colors";
    messageBox.textContent = "แตะที่รูป แล้วลากไปยังรูปคู่เดียวกัน";
  }, 2000);
}

function newPuzzle(level = currentLevel) {
  if (level > maxUnlockedLevel && level > 1) return; // Prevent skipping
  currentLevel = level;
  saveData();
  puzzle = generatePuzzle(level);
  renderPuzzle();
  winModal.hidden = true;
}

function starsEarned() {
  if (hintsUsed === 0 && mistakes <= 1) return 3;
  if (hintsUsed <= 1 && mistakes <= 4) return 2;
  return 1;
}

function completeLevel() {
  clearInterval(timerId);
  const stars = starsEarned();
  
  if (currentLevel === maxUnlockedLevel && currentLevel < 5) {
      maxUnlockedLevel = currentLevel + 1;
      saveData();
  }

  document.getElementById("winTitle").textContent = currentLevel === 5 ? "เก่งมาก! ผ่านครบทุกด่าน" : "ยอดเยี่ยม!";
  document.getElementById("winText").textContent = currentLevel === 5 
    ? "คุณคือปรมาจารย์ด้านการจับคู่!" 
    : `ผ่านด่าน ${currentLevel} เรียบร้อยแล้ว`;
    
  document.getElementById("starsContainer").innerHTML = "⭐".repeat(stars) + '<span style="opacity:0.3">⭐</span>'.repeat(3 - stars);
  modalNextBtn.textContent = currentLevel === 5 ? "เริ่มเล่นใหม่ทั้งหมด" : "ไปด่านถัดไป";
  
  winModal.hidden = false;
  playLevelComplete(currentLevel === 5);
  shootConfetti(currentLevel === 5 ? 100 : 50);
}

// Confetti System
function shootConfetti(particleCount = 50) {
  const ctx = confettiCanvas.getContext('2d');
  confettiCanvas.width = confettiCanvas.offsetWidth;
  confettiCanvas.height = confettiCanvas.offsetHeight;
  
  const particles = [];
  const colors = ["#4f46e5", "#ec4899", "#10b981", "#f59e0b", "#06b6d4"];
  
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: confettiCanvas.width / 2,
      y: confettiCanvas.height / 2,
      r: rand(4, 8),
      dx: rand(-10, 10),
      dy: rand(-10, -2),
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.floor(rand(-10, 10)),
      tiltAngle: 0,
      tiltAngleInc: (rand(0.07, 0.12))
    });
  }

  let animationId;
  function render() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    let active = false;
    particles.forEach(p => {
      p.tiltAngle += p.tiltAngleInc;
      p.y += (Math.cos(p.tiltAngle) + 1 + p.r / 2) / 2;
      p.x += Math.sin(p.tiltAngle) * 2;
      p.dx *= 0.99;
      p.x += p.dx;
      p.dy += 0.1; // gravity
      p.y += p.dy;
      
      if (p.y <= confettiCanvas.height) active = true;

      ctx.beginPath();
      ctx.lineWidth = p.r;
      ctx.strokeStyle = p.color;
      ctx.moveTo(p.x + p.tilt + p.r, p.y);
      ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r);
      ctx.stroke();
    });
    if (active) {
      animationId = requestAnimationFrame(render);
    }
  }
  render();
  setTimeout(() => cancelAnimationFrame(animationId), 4000);
}

// Event Listeners
soundBtn.addEventListener("click", () => {
  const on = toggleSound();
  soundBtn.textContent = on ? "🔊" : "🔇";
});

undoBtn.addEventListener("click", undoLast);
hintBtn.addEventListener("click", showHint);
startOverBtn.addEventListener("click", () => newPuzzle(1));
resetBtn.addEventListener("click", () => newPuzzle(currentLevel));
nextBtn.addEventListener("click", () => newPuzzle(currentLevel === 5 ? 1 : currentLevel + 1));
replayBtn.addEventListener("click", () => newPuzzle(currentLevel));
modalNextBtn.addEventListener("click", () => newPuzzle(currentLevel === 5 ? 1 : currentLevel + 1));

document.querySelectorAll(".level-pill").forEach(btn => {
  btn.addEventListener("click", () => {
      const lvl = Number(btn.dataset.level);
      if (lvl <= maxUnlockedLevel) newPuzzle(lvl);
  });
});

rulesBtn.addEventListener("click", () => rulesModal.hidden = false);
closeRulesBtn.addEventListener("click", () => rulesModal.hidden = true);
window.addEventListener("resize", cancelDrawing);

// Init
initSaveData();
newPuzzle(currentLevel);
