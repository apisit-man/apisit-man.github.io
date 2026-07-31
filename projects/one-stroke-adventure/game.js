const NS = "http://www.w3.org/2000/svg";

let levels = [];

function generateRandomLevel(targetEdges) {
  const GRID_W = 3;
  const GRID_H = 3;

  for (let attempt = 0; attempt < 1000; attempt++) {
    let visitedEdges = new Set();
    let path = [];
    let curr = Math.floor(Math.random() * (GRID_W * GRID_H));
    path.push(curr);

    let stuck = false;
    for (let i = 0; i < targetEdges; i++) {
      let cx = curr % GRID_W;
      let cy = Math.floor(curr / GRID_W);

      let neighbors = [];
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          if (dx === 0 && dy === 0) continue;
          let nx = cx + dx;
          let ny = cy + dy;
          if (nx >= 0 && nx < GRID_W && ny >= 0 && ny < GRID_H) {
            let nId = ny * GRID_W + nx;
            let edgeId = curr < nId ? `${curr}-${nId}` : `${nId}-${curr}`;
            if (!visitedEdges.has(edgeId)) {
              neighbors.push({ id: nId, edgeId: edgeId });
            }
          }
        }
      }

      if (neighbors.length === 0) {
        stuck = true;
        break;
      }

      let next = neighbors[Math.floor(Math.random() * neighbors.length)];
      visitedEdges.add(next.edgeId);
      path.push(next.id);
      curr = next.id;
    }

    if (!stuck) {
      let uniqueNodes = [...new Set(path)];
      uniqueNodes.sort((a,b)=>a-b);
      let nodeMap = {};
      let nodes = uniqueNodes.map((nId, idx) => {
        nodeMap[nId] = idx;
        return {
          x: (nId % GRID_W) * 240 + 160,
          y: Math.floor(nId / GRID_W) * 240 + 160
        };
      });

      let edges = Array.from(visitedEdges).map(eStr => {
        let parts = eStr.split('-');
        return {
          a: nodeMap[parseInt(parts[0])],
          b: nodeMap[parseInt(parts[1])]
        };
      });

      return {
        title: `ปริศนา (${targetEdges} เส้น)`,
        nodes: nodes,
        edges: edges
      };
    }
  }
  return null;
}

function generateSessionLevels() {
  const edgeTargets = [5, 7, 9, 11, 14];
  levels = edgeTargets.map(edges => generateRandomLevel(edges));
}

let currentLevel = 0;
let usedEdges = new Set();
let currentNode = null;
let dragging = false;
let attempts = 1;
let soundOn = true;
let completed = JSON.parse(localStorage.getItem("oneStrokeCompleted") || "[]");

let currentTransformedLevel = null;

const board = document.getElementById("board");
const guideLayer = document.getElementById("guideLayer");
const traceLayer = document.getElementById("traceLayer");
const nodeLayer = document.getElementById("nodeLayer");
const pointerGlow = document.getElementById("pointerGlow");
const message = document.getElementById("message");
const nextBtn = document.getElementById("nextBtn");
const winModal = document.getElementById("winModal");
const boardWrap = document.getElementById("boardWrap");
const confettiCanvas = document.getElementById("confettiCanvas");
const ctx = confettiCanvas.getContext("2d");

function edgePath(edge) {
  const l = currentTransformedLevel, p1 = l.nodes[edge.a], p2 = l.nodes[edge.b];
  return edge.c
    ? `M ${p1.x} ${p1.y} Q ${edge.c[0]} ${edge.c[1]} ${p2.x} ${p2.y}`
    : `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`;
}

function svgEl(tag, attrs={}) {
  const el = document.createElementNS(NS, tag);
  Object.entries(attrs).forEach(([k,v]) => el.setAttribute(k,v));
  return el;
}

function renderLevel() {
  usedEdges.clear();
  currentNode = null;
  dragging = false;
  attempts = 1;
  pointerGlow.setAttribute("cx", -100);
  pointerGlow.setAttribute("cy", -100);
  guideLayer.innerHTML = "";
  traceLayer.innerHTML = "";
  nodeLayer.innerHTML = "";
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  nextBtn.disabled = true;
  winModal.hidden = true;
  message.className = "message";
  message.textContent = "แตะที่จุดเริ่มต้น แล้วลากต่อเนื่องไปตามเส้น";
  currentTransformedLevel = levels[currentLevel];
  const l = currentTransformedLevel;
  document.getElementById("levelTitle").textContent = `ด่านที่ ${currentLevel + 1} ${l.title}`;
  document.getElementById("movesDone").textContent = "0";
  document.getElementById("movesTotal").textContent = l.edges.length;
  document.getElementById("attempts").textContent = attempts;

  l.edges.forEach((e,i)=>{
    const path = svgEl("path",{d:edgePath(e),class:"guide","data-edge":i});
    guideLayer.appendChild(path);
  });
  l.nodes.forEach((n,i)=>{
    const c=svgEl("circle",{cx:n.x,cy:n.y,r:32,class:"node available","data-node":i});
    nodeLayer.appendChild(c);
  });
  updateLevelButtons();
}

function getSvgPoint(evt){
  const pt=board.createSVGPoint();
  const t=evt.touches?.[0] ?? evt;
  pt.x=t.clientX; pt.y=t.clientY;
  return pt.matrixTransform(board.getScreenCTM().inverse());
}
function dist(a,b){return Math.hypot(a.x-b.x,a.y-b.y)}
function nearestNode(p, radius=60){
  let best=-1,bestD=Infinity;
  currentTransformedLevel.nodes.forEach((n,i)=>{
    const d=dist(p,n); if(d<radius && d<bestD){best=i;bestD=d}
  });
  return best;
}
function findEdge(a,b){
  return currentTransformedLevel.edges.findIndex(e=>(e.a===a&&e.b===b)||(e.a===b&&e.b===a));
}
function beginAt(node){
  currentNode=node; dragging=true;
  nodeLayer.querySelectorAll(".node").forEach(n=>n.classList.remove("current"));
  nodeLayer.querySelector(`[data-node="${node}"]`)?.classList.add("current");
  message.textContent="ลากต่อไปตามเส้นที่เชื่อมกัน";
  playTone(420,.07);
}
function useEdge(edgeIndex,toNode){
  if(edgeIndex<0 || usedEdges.has(edgeIndex)) return false;
  usedEdges.add(edgeIndex);
  const edge=currentTransformedLevel.edges[edgeIndex];
  guideLayer.querySelector(`[data-edge="${edgeIndex}"]`)?.classList.add("used");
  const path=svgEl("path",{d:edgePath(edge),class:"trace"});
  traceLayer.appendChild(path);
  currentNode=toNode;
  nodeLayer.querySelectorAll(".node").forEach(n=>n.classList.remove("current"));
  nodeLayer.querySelector(`[data-node="${toNode}"]`)?.classList.add("current");
  document.getElementById("movesDone").textContent=usedEdges.size;
  playTone(520+usedEdges.size*35,.045);
  if(usedEdges.size===currentTransformedLevel.edges.length) win();
  return true;
}

function pointerDown(evt){
  evt.preventDefault();
  const p=getSvgPoint(evt), n=nearestNode(p);
  if(n>=0){
    if(usedEdges.size) {
      if(currentNode!==n) return;
      else {
        fail("คุณยกมือไปแล้ว ต้องลากให้จบในครั้งเดียว (คลิกเริ่มใหม่)");
        return;
      }
    }
    beginAt(n);
    board.setPointerCapture?.(evt.pointerId);
  }
}
function pointerMove(evt){
  if(!dragging) return;
  evt.preventDefault();
  const p=getSvgPoint(evt);
  pointerGlow.setAttribute("cx",p.x); pointerGlow.setAttribute("cy",p.y);
  const n=nearestNode(p,80);
  if(n>=0 && n!==currentNode){
    const ei=findEdge(currentNode,n);
    if(ei>=0 && !usedEdges.has(ei)){
      useEdge(ei,n);
    } else if(ei>=0 && usedEdges.has(ei)){
      fail("เส้นนี้ถูกใช้แล้ว ลองเริ่มใหม่อีกครั้ง");
    }
  }
}
function pointerUp(evt){
  if(!dragging) return;
  dragging=false;
  pointerGlow.setAttribute("cx",-100);
  if(usedEdges.size && usedEdges.size<currentTransformedLevel.edges.length){
    fail("ยกมือแล้ว! ต้องลากต่อเนื่องโดยไม่ยกมือ");
  }
}

function fail(text){
  dragging=false;
  pointerGlow.setAttribute("cx", -100);
  pointerGlow.setAttribute("cy", -100);
  message.className="message bad";
  message.textContent=text;
  boardWrap.classList.remove("shake"); void boardWrap.offsetWidth; boardWrap.classList.add("shake");
  playFail();
}
function resetLevel(){
  attempts++;
  const keepAttempts=attempts;
  renderLevel();
  attempts=keepAttempts;
  document.getElementById("attempts").textContent=attempts;
}
function win(){
  dragging=false;
  pointerGlow.setAttribute("cx", -100);
  pointerGlow.setAttribute("cy", -100);
  message.className="message good";
  message.textContent="สำเร็จ! คุณใช้ครบทุกเส้นโดยไม่ลากซ้ำ";
  const isFinalLevel = currentLevel===levels.length-1;
  nextBtn.disabled=isFinalLevel;
  if(!completed.includes(currentLevel)){
    completed.push(currentLevel);
    localStorage.setItem("oneStrokeCompleted",JSON.stringify(completed));
  }
  updateLevelButtons();
  playWin();
  if (isFinalLevel && soundOn) {
    const cheer = new Audio('../projectile-game/cheer.wav');
    cheer.volume = 0.6;
    cheer.play().catch(e=>console.log(e));
  }
  launchConfetti();
  setTimeout(()=>{
    document.getElementById("winTitle").textContent=isFinalLevel?"🎉 Game Cleared! 🎉":"ยอดเยี่ยมมาก!";
    document.getElementById("winText").textContent=isFinalLevel?"สุดยอด! คุณพิชิตครบทุกด่านแล้ว":`ผ่านด่าน ${currentLevel+1} ด้วยการลาก ${usedEdges.size} เส้น`;
    document.getElementById("modalNextBtn").style.display=isFinalLevel?"none":"inline-block";
    document.getElementById("replayBtn").textContent=isFinalLevel?"Play Again":"เล่นอีกครั้ง";
    winModal.hidden=false;
  },700);
}
function nextLevel(){
  if(currentLevel<levels.length-1){currentLevel++;renderLevel()}
}
function updateLevelButtons(){
  document.querySelectorAll(".level-pill").forEach((b,i)=>{
    b.classList.toggle("active",i===currentLevel);
    b.classList.toggle("completed",completed.includes(i));
    b.classList.remove("locked");
  });
}
function showHint(){
  const l=currentTransformedLevel;
  const degree=l.nodes.map(()=>0);
  l.edges.forEach(e=>{degree[e.a]++;degree[e.b]++});
  const odd=degree.map((d,i)=>d%2?i:-1).filter(i=>i>=0);
  const suggested=(currentNode===null ? (odd[0] ?? 0) : currentNode);
  nodeLayer.querySelector(`[data-node="${suggested}"]`)?.classList.add("available");
  const nextEdge=l.edges.findIndex((e,i)=>!usedEdges.has(i)&&(e.a===suggested||e.b===suggested));
  if(nextEdge>=0){
    const el=guideLayer.querySelector(`[data-edge="${nextEdge}"]`);
    el?.classList.add("hint-edge");
    setTimeout(()=>el?.classList.remove("hint-edge"),2100);
  }
  message.className="message";
  message.textContent=odd.length===2
    ? "คำใบ้: รูปนี้ควรเริ่มจากหนึ่งในจุดที่มีจำนวนเส้นเชื่อมเป็นเลขคี่"
    : "คำใบ้: รูปนี้เริ่มที่จุดใดก็ได้ แต่ต้องวางแผนเส้นทางให้กลับมาครบ";
  playTone(760,.09);
}

let audioCtx;
function ensureAudio(){
  if(!audioCtx) audioCtx=new (window.AudioContext||window.webkitAudioContext)();
}
function playTone(freq,dur,type="sine",delay=0){
  if(!soundOn) return;
  ensureAudio();
  const o=audioCtx.createOscillator(),g=audioCtx.createGain();
  o.type=type;o.frequency.value=freq;g.gain.setValueAtTime(.0001,audioCtx.currentTime+delay);
  g.gain.exponentialRampToValueAtTime(.14,audioCtx.currentTime+delay+.01);
  g.gain.exponentialRampToValueAtTime(.0001,audioCtx.currentTime+delay+dur);
  o.connect(g).connect(audioCtx.destination);o.start(audioCtx.currentTime+delay);o.stop(audioCtx.currentTime+delay+dur+.02);
}
function playWin(){[523,659,784,1047].forEach((f,i)=>playTone(f,.18,"triangle",i*.11))}
function playFail(){playTone(180,.2,"sawtooth");setTimeout(()=>playTone(120,.25,"sawtooth"),90)}

function launchConfetti(){
  confettiCanvas.width=boardWrap.clientWidth*devicePixelRatio;
  confettiCanvas.height=boardWrap.clientHeight*devicePixelRatio;
  ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
  const colors=["#5ef0d0","#7c5cff","#ffd66b","#ff6b86","#ffffff"];
  const pieces=Array.from({length:110},()=>({
    x:boardWrap.clientWidth/2,y:boardWrap.clientHeight*.35,
    vx:(Math.random()-.5)*8,vy:-Math.random()*7-2,
    g:.16+Math.random()*.08,r:3+Math.random()*5,a:Math.random()*Math.PI,
    c:colors[Math.floor(Math.random()*colors.length)],life:80+Math.random()*40
  }));
  function tick(){
    ctx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);
    let active = false;
    pieces.forEach(p=>{
      if (p.life > 0) {
        active = true;
        p.x+=p.vx;p.y+=p.vy;p.vy+=p.g;p.a+=.12;p.life--;
        ctx.save();
        ctx.globalAlpha = Math.min(1, p.life / 20);
        ctx.translate(p.x,p.y);ctx.rotate(p.a);ctx.fillStyle=p.c;
        ctx.fillRect(-p.r,-p.r/2,p.r*2,p.r);
        ctx.restore();
      }
    });
    if(active) requestAnimationFrame(tick);
    else ctx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);
  } tick();
}

board.addEventListener("pointerdown",pointerDown);
board.addEventListener("pointermove",pointerMove);
board.addEventListener("pointerup",pointerUp);
board.addEventListener("pointercancel",pointerUp);
document.getElementById("startOverBtn").onclick=()=>{
  if(confirm("ต้องการเริ่มเล่นใหม่ตั้งแต่ด่าน 1 ใช่หรือไม่?")) {
    currentLevel=0;
    completed=[];
    localStorage.removeItem("oneStrokeCompleted");
    generateSessionLevels();
    renderLevel();
  }
};
document.getElementById("resetBtn").onclick=resetLevel;
document.getElementById("hintBtn").onclick=showHint;
document.getElementById("nextBtn").onclick=nextLevel;
document.getElementById("replayBtn").onclick=()=>{
  winModal.hidden=true;
  if(currentLevel === levels.length - 1) {
    currentLevel = 0;
    generateSessionLevels();
  }
  renderLevel();
};
document.getElementById("modalNextBtn").onclick=()=>{winModal.hidden=true;nextLevel()};
document.getElementById("soundBtn").onclick=(e)=>{soundOn=!soundOn;e.currentTarget.textContent=soundOn?"🔊":"🔇"};
document.querySelectorAll(".level-pill").forEach(btn=>btn.onclick=()=>{currentLevel=Number(btn.dataset.level);renderLevel()});
winModal.addEventListener("click",e=>{if(e.target===winModal)winModal.hidden=true});

const rulesModal = document.getElementById("rulesModal");
document.getElementById("rulesBtn").onclick = () => { rulesModal.hidden = false; };
document.getElementById("closeRulesBtn").onclick = () => { rulesModal.hidden = true; };
rulesModal.addEventListener("click", e => { if(e.target === rulesModal) rulesModal.hidden = true; });

generateSessionLevels();
renderLevel();
