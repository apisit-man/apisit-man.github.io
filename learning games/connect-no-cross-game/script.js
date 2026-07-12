"use strict";

const NS = "http://www.w3.org/2000/svg";
const board = document.getElementById("board");
const nodeLayer = document.getElementById("nodeLayer");
const savedPathsGroup = document.getElementById("savedPaths");
const draftPath = document.getElementById("draftPath");
const hintPath = document.getElementById("hintPath");
const levelText = document.getElementById("levelText");
const progressText = document.getElementById("progressText");
const timeText = document.getElementById("timeText");
const toast = document.getElementById("toast");
const undoBtn = document.getElementById("undoBtn");
const hintBtn = document.getElementById("hintBtn");
const newBtn = document.getElementById("newBtn");
const soundBtn = document.getElementById("soundBtn");
const helpBtn = document.getElementById("helpBtn");
const helpModal = document.getElementById("helpModal");
const closeHelpBtn = document.getElementById("closeHelpBtn");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalMessage = document.getElementById("modalMessage");
const replayBtn = document.getElementById("replayBtn");
const nextBtn = document.getElementById("nextBtn");
const celebration = document.getElementById("celebration");

const LEVELS = {
  1: { pairs: 3, minLength: 180, nodeClearance: 78, pathClearance: 24 },
  2: { pairs: 4, minLength: 220, nodeClearance: 74, pathClearance: 22 },
  3: { pairs: 6, minLength: 260, nodeClearance: 70, pathClearance: 20 },
  4: { pairs: 8, minLength: 290, nodeClearance: 66, pathClearance: 18 },
  5: { pairs: 10, minLength: 320, nodeClearance: 62, pathClearance: 16 }
};

const SYMBOLS = ["circle", "triangle", "square", "diamond", "crossCircle", "star", "hexagon", "plus", "pentagon", "heart"];
const COLORS = ["#4f7cff", "#ed6a5a", "#18a97a", "#9b59e6", "#f59f00", "#008fbf", "#d9468b", "#5d6d7e", "#c62828", "#2e7d32"];

let currentLevel = 1;
let puzzle = null;
let connections = [];
let drawing = null;
let timerId = null;
let startedAt = 0;
let soundOn = true;
let audioCtx = null;
let hintsUsed = 0;
let mistakes = 0;

function rand(min, max) { return Math.random() * (max - min) + min; }
function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
function dist(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }
function lerp(a, b, t) { return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t }; }
function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

function orientation(a, b, c) {
  const v = (b.y - a.y) * (c.x - b.x) - (b.x - a.x) * (c.y - b.y);
  if (Math.abs(v) < 1e-7) return 0;
  return v > 0 ? 1 : 2;
}
function onSegment(a, b, c) {
  return b.x <= Math.max(a.x, c.x) + 1e-7 && b.x >= Math.min(a.x, c.x) - 1e-7 &&
         b.y <= Math.max(a.y, c.y) + 1e-7 && b.y >= Math.min(a.y, c.y) - 1e-7;
}
function segmentsIntersect(p1, q1, p2, q2) {
  const o1 = orientation(p1, q1, p2);
  const o2 = orientation(p1, q1, q2);
  const o3 = orientation(p2, q2, p1);
  const o4 = orientation(p2, q2, q1);
  if (o1 !== o2 && o3 !== o4) return true;
  if (o1 === 0 && onSegment(p1, p2, q1)) return true;
  if (o2 === 0 && onSegment(p1, q2, q1)) return true;
  if (o3 === 0 && onSegment(p2, p1, q2)) return true;
  if (o4 === 0 && onSegment(p2, q1, q2)) return true;
  return false;
}
function pointToSegmentDistance(p, a, b) {
  const abx = b.x - a.x, aby = b.y - a.y;
  const len2 = abx * abx + aby * aby;
  if (len2 === 0) return dist(p, a);
  const t = clamp(((p.x - a.x) * abx + (p.y - a.y) * aby) / len2, 0, 1);
  return dist(p, { x: a.x + t * abx, y: a.y + t * aby });
}
function segmentDistance(a, b, c, d) {
  if (segmentsIntersect(a, b, c, d)) return 0;
  return Math.min(
    pointToSegmentDistance(a, c, d),
    pointToSegmentDistance(b, c, d),
    pointToSegmentDistance(c, a, b),
    pointToSegmentDistance(d, a, b)
  );
}
function polylineToPath(points) {
  if (!points.length) return "";
  return `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)} ` +
    points.slice(1).map(p => `L ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
}
function simplifyPoints(points, minStep = 9) {
  if (points.length < 3) return points;
  const out = [points[0]];
  for (let i = 1; i < points.length - 1; i++) {
    if (dist(points[i], out[out.length - 1]) >= minStep) out.push(points[i]);
  }
  out.push(points[points.length - 1]);
  return out;
}

function buildCandidate(level) {
  const cfg = LEVELS[level];
  const count = cfg.pairs;
  const nodes = [];
  const pairs = [];
  
  let attempts = 0;
  while (pairs.length < count && attempts < 15000) {
    attempts++;
    const r1 = Math.sqrt(rand(0, 1)) * 400;
    const a1 = rand(0, Math.PI * 2);
    const p1 = { x: 500 + Math.cos(a1) * r1, y: 500 + Math.sin(a1) * r1 };
    
    const r2 = Math.sqrt(rand(0, 1)) * 400;
    const a2 = rand(0, Math.PI * 2);
    const p2 = { x: 500 + Math.cos(a2) * r2, y: 500 + Math.sin(a2) * r2 };
    
    if (dist(p1, p2) < cfg.minLength) continue; 
    
    let valid = true;
    for (const pair of pairs) {
      const q1 = nodes[pair.a];
      const q2 = nodes[pair.b];
      
      if (segmentDistance(p1, p2, q1, q2) < cfg.pathClearance) { valid = false; break; }
      if (pointToSegmentDistance(q1, p1, p2) < cfg.nodeClearance * 0.72) { valid = false; break; }
      if (pointToSegmentDistance(q2, p1, p2) < cfg.nodeClearance * 0.72) { valid = false; break; }
      if (pointToSegmentDistance(p1, q1, q2) < cfg.nodeClearance * 0.72) { valid = false; break; }
      if (pointToSegmentDistance(p2, q1, q2) < cfg.nodeClearance * 0.72) { valid = false; break; }
      if (dist(p1, q1) < cfg.nodeClearance || dist(p1, q2) < cfg.nodeClearance || dist(p2, q1) < cfg.nodeClearance || dist(p2, q2) < cfg.nodeClearance) {
          valid = false; break;
      }
    }
    
    if (valid) {
      const idA = nodes.length;
      nodes.push({ id: idA, x: p1.x, y: p1.y, connected: false });
      const idB = nodes.length;
      nodes.push({ id: idB, x: p2.x, y: p2.y, connected: false });
      pairs.push({ id: pairs.length, a: idA, b: idB });
    }
  }
  
  if (pairs.length < count) return null;

  const symbolOrder = shuffle(SYMBOLS).slice(0, cfg.pairs);
  const colorOrder = shuffle(COLORS).slice(0, cfg.pairs);
  for (const pair of pairs) {
    pair.symbol = symbolOrder[pair.id];
    pair.color = colorOrder[pair.id];
    nodes[pair.a].pairId = pair.id;
    nodes[pair.b].pairId = pair.id;
    nodes[pair.a].symbol = pair.symbol;
    nodes[pair.b].symbol = pair.symbol;
    nodes[pair.a].color = pair.color;
    nodes[pair.b].color = pair.color;
  }
  
  return { level, nodes, pairs };
}

function generatePuzzle(level) {
  for (let attempt = 0; attempt < 100; attempt++) {
    const candidate = buildCandidate(level);
    if (candidate) return candidate;
  }
  return fallbackPuzzle(level);
}

function fallbackPuzzle(level) {
  const pairsCount = LEVELS[level].pairs;
  const nodes = [];
  const pairs = [];
  const symbols = shuffle(SYMBOLS).slice(0, pairsCount);
  const colors = shuffle(COLORS).slice(0, pairsCount);
  for (let i = 0; i < pairsCount; i++) {
    const y = 250 + i * (500 / Math.max(1, pairsCount - 1));
    const a = nodes.length;
    nodes.push({ id: a, x: 245, y, pairId: i, symbol: symbols[i], color: colors[i], connected: false });
    const b = nodes.length;
    nodes.push({ id: b, x: 755, y, pairId: i, symbol: symbols[i], color: colors[i], connected: false });
    pairs.push({ id: i, a, b, symbol: symbols[i], color: colors[i] });
  }
  return { level, nodes, pairs };
}

function symbolSvg(type) {
  const common = 'viewBox="0 0 100 100" aria-hidden="true"';
  switch (type) {
    case "circle": return `<svg ${common}><circle class="symbol-stroke" cx="50" cy="50" r="31"/></svg>`;
    case "triangle": return `<svg ${common}><path class="symbol-stroke" d="M50 16 L84 80 L16 80 Z"/></svg>`;
    case "square": return `<svg ${common}><rect class="symbol-stroke" x="20" y="20" width="60" height="60" rx="5"/></svg>`;
    case "diamond": return `<svg ${common}><path class="symbol-stroke" d="M50 12 L88 50 L50 88 L12 50 Z"/></svg>`;
    case "crossCircle": return `<svg ${common}><circle class="symbol-stroke" cx="50" cy="50" r="32"/><path class="symbol-stroke" d="M30 30 L70 70 M70 30 L30 70"/></svg>`;
    case "star": return `<svg ${common}><path class="symbol-stroke" d="M50 13 L61 37 L87 40 L68 58 L73 84 L50 71 L27 84 L32 58 L13 40 L39 37 Z"/></svg>`;
    case "hexagon": return `<svg ${common}><path class="symbol-stroke" d="M28 18 L72 18 L91 50 L72 82 L28 82 L9 50 Z"/></svg>`;
    case "plus": return `<svg ${common}><path class="symbol-stroke" d="M50 18 V82 M18 50 H82"/></svg>`;
    case "pentagon": return `<svg ${common}><path class="symbol-stroke" d="M50 12 L88 40 L74 85 L26 85 L12 40 Z"/></svg>`;
    case "heart": return `<svg ${common}><path class="symbol-stroke" d="M50 82 C50 82 14 56 14 34 C14 20 28 12 38 18 C46 23 50 32 50 32 C50 32 54 23 62 18 C72 12 86 20 86 34 C86 56 50 82 50 82 Z"/></svg>`;
    default: return "";
  }
}

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
    el.className = "node";
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
  ensureAudio();
  playTone(420, .05, "sine", .035);
  drawing = { startNode: node, points: [{ x: node.x, y: node.y }], invalid: false };
  node.el.classList.add("active");
  board.setPointerCapture?.(evt.pointerId);
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
  playSuccess();
  showToast("เชื่อมถูกต้อง!", "success");
  updateHud();
  if (connections.length === puzzle.pairs.length) setTimeout(completeLevel, 450);
}

function reject(message, type) {
  mistakes++;
  drawing = null;
  playError();
  showToast(message, type === "error" ? "error" : "");
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
  playTone(300, .06, "triangle", .03);
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
  playTone(650, .08, "sine", .03);
}

function updateHud() {
  levelText.textContent = `${currentLevel} / 5`;
  progressText.textContent = `${connections.length} / ${puzzle?.pairs.length ?? LEVELS[currentLevel].pairs}`;
  undoBtn.disabled = connections.length === 0;
}

function showToast(message, kind = "") {
  toast.textContent = message;
  toast.className = `toast show ${kind}`;
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.className = "toast", 1500);
}

function newPuzzle(level = currentLevel) {
  currentLevel = level;
  document.querySelectorAll(".level-pill").forEach(btn => btn.classList.toggle("active", Number(btn.dataset.level) === level));
  puzzle = generatePuzzle(level);
  renderPuzzle();
  modal.classList.add("hidden");
}

function starsEarned() {
  if (hintsUsed === 0 && mistakes <= 1) return 3;
  if (hintsUsed <= 1 && mistakes <= 4) return 2;
  return 1;
}
function completeLevel() {
  clearInterval(timerId);
  const stars = starsEarned();
  modalTitle.textContent = currentLevel === 5 ? "เก่งมาก! ผ่านครบทั้ง 5 ด่านแล้ว" : `ผ่านระดับ ${currentLevel} แล้ว!`;
  modalMessage.textContent = currentLevel === 5
    ? "คุณวางแผนเส้นทางได้ยอดเยี่ยมมาก"
    : "ยอดเยี่ยม พร้อมไปด่านต่อไปแล้ว";
  document.getElementById("stars").textContent = "⭐".repeat(stars) + "☆".repeat(3 - stars);
  nextBtn.textContent = currentLevel === 5 ? "เล่นใหม่ตั้งแต่ด่าน 1" : "ด่านต่อไป";
  makeConfetti(currentLevel === 5 ? 55 : 28);
  modal.classList.remove("hidden");
  playLevelComplete(currentLevel === 5);
}

function makeConfetti(count) {
  celebration.innerHTML = "";
  const palette = ["#4f7cff", "#7b5cff", "#ffb300", "#20b486", "#ef5350"];
  for (let i = 0; i < count; i++) {
    const c = document.createElement("span");
    c.className = "confetti";
    c.style.left = `${rand(0, 100)}%`;
    c.style.top = `${rand(-20, 8)}%`;
    c.style.background = palette[i % palette.length];
    c.style.animationDelay = `${rand(0, .55)}s`;
    c.style.transform = `rotate(${rand(0, 360)}deg)`;
    celebration.appendChild(c);
  }
}

function ensureAudio() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === "suspended") audioCtx.resume();
}
function playTone(freq, duration, type = "sine", volume = .04, delay = 0) {
  if (!soundOn) return;
  ensureAudio();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.0001, audioCtx.currentTime + delay);
  gain.gain.exponentialRampToValueAtTime(volume, audioCtx.currentTime + delay + .01);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + delay + duration);
  osc.connect(gain).connect(audioCtx.destination);
  osc.start(audioCtx.currentTime + delay);
  osc.stop(audioCtx.currentTime + delay + duration + .03);
}
function playSuccess() {
  playTone(520, .09, "sine", .04);
  playTone(720, .11, "sine", .035, .07);
}
function playError() {
  playTone(180, .12, "sawtooth", .025);
}
function playLevelComplete(finalLevel) {
  const notes = finalLevel ? [523, 659, 784, 1047] : [523, 659, 784];
  notes.forEach((n, i) => playTone(n, .18, "triangle", .045, i * .12));
}

soundBtn.addEventListener("click", () => {
  soundOn = !soundOn;
  soundBtn.textContent = soundOn ? "🔊" : "🔇";
  if (soundOn) playTone(620, .08, "sine", .03);
});
undoBtn.addEventListener("click", undoLast);
hintBtn.addEventListener("click", showHint);
newBtn.addEventListener("click", () => newPuzzle(currentLevel));
replayBtn.addEventListener("click", () => newPuzzle(currentLevel));
nextBtn.addEventListener("click", () => newPuzzle(currentLevel === 5 ? 1 : currentLevel + 1));
document.querySelectorAll(".level-pill").forEach(btn => btn.addEventListener("click", () => newPuzzle(Number(btn.dataset.level))));

helpBtn.addEventListener("click", () => helpModal.classList.remove("hidden"));
closeHelpBtn.addEventListener("click", () => helpModal.classList.add("hidden"));

window.addEventListener("resize", cancelDrawing);
newPuzzle(1);
