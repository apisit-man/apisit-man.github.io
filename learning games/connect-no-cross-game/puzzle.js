import { rand, shuffle, dist, pointToSegmentDistance, segmentDistance } from './math.js';

export const LEVELS = {
  1: { pairs: 3, minLength: 500, nodeClearance: 140, pathClearance: 30 },
  2: { pairs: 4, minLength: 480, nodeClearance: 130, pathClearance: 26 },
  3: { pairs: 6, minLength: 450, nodeClearance: 120, pathClearance: 22 },
  4: { pairs: 8, minLength: 400, nodeClearance: 110, pathClearance: 20 },
  5: { pairs: 10, minLength: 350, nodeClearance: 105, pathClearance: 18 }
};

export const SYMBOLS = ["circle", "triangle", "square", "diamond", "crossCircle", "star", "hexagon", "plus", "pentagon", "heart"];
// Use brand-aligned colors for a professional look (indigo, teal, purple, etc.) or vibrant distinct colors
export const COLORS = ["#4f46e5", "#ec4899", "#10b981", "#8b5cf6", "#f59e0b", "#06b6d4", "#ef4444", "#64748b", "#c026d3", "#16a34a"];

export function symbolSvg(type) {
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

export function generatePuzzle(level) {
  for (let attempt = 0; attempt < 100; attempt++) {
    const candidate = buildCandidate(level);
    if (candidate) return candidate;
  }
  return fallbackPuzzle(level);
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

function fallbackPuzzle(level) {
  const pairsCount = LEVELS[level].pairs;
  const nodes = [];
  const pairs = [];
  const symbols = shuffle(SYMBOLS).slice(0, pairsCount);
  const colors = shuffle(COLORS).slice(0, pairsCount);
  
  const totalNodes = pairsCount * 2;
  const baseRadius = 360;
  
  // Randomize the angle assignments but guarantee pairs are on opposite sides
  const angleOffsets = shuffle(Array.from({length: pairsCount}, (_, i) => i));

  for (let i = 0; i < pairsCount; i++) {
    const angleIndex1 = angleOffsets[i];
    const angleIndex2 = angleIndex1 + pairsCount; // exactly opposite
    
    // No random jitter. Perfectly deterministic spacing to guarantee 100% no overlaps.
    const angle1 = (angleIndex1 / totalNodes) * Math.PI * 2;
    const angle2 = (angleIndex2 / totalNodes) * Math.PI * 2;
    
    // Alternate radius slightly to make it look less like a perfect uniform ring
    const r1 = baseRadius + (angleIndex1 % 2 === 0 ? 30 : -30);
    const r2 = baseRadius + (angleIndex2 % 2 === 0 ? 30 : -30);

    const a = nodes.length;
    nodes.push({ 
        id: a, 
        x: 500 + Math.cos(angle1) * r1, 
        y: 500 + Math.sin(angle1) * r1, 
        pairId: i, symbol: symbols[i], color: colors[i], connected: false 
    });
    
    const b = nodes.length;
    nodes.push({ 
        id: b, 
        x: 500 + Math.cos(angle2) * r2, 
        y: 500 + Math.sin(angle2) * r2, 
        pairId: i, symbol: symbols[i], color: colors[i], connected: false 
    });
    
    pairs.push({ id: i, a, b, symbol: symbols[i], color: colors[i] });
  }
  return { level, nodes, pairs };
}
