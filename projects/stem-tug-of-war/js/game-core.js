/* STEM Tug of War: reusable, deterministic game rules. No third-party dependencies. */
(function (global) {
  'use strict';
  const LIMIT = 12; // integer half-steps: -12 = blue wins, +12 = red wins
  const ROUND_SECONDS = 60;
  const ANSWER_MOVE = { correct: 2, incorrect: 1 };
  function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }
  function moveForAnswer(position, team, correct) {
    if (team !== 'blue' && team !== 'red') throw new Error('Invalid team');
    const sign = team === 'red' ? 1 : -1;
    // Wrong answers tug toward the opponent.
    const delta = sign * (correct ? ANSWER_MOVE.correct : -ANSWER_MOVE.incorrect);
    return clamp(position + delta, -LIMIT, LIMIT);
  }
  function classifyRound(position) {
    if (position < 0) return 'blue';
    if (position > 0) return 'red';
    return 'tie';
  }
  function hasReachedGoal(position) { return Math.abs(position) >= LIMIT; }
  function isMatchOver(wins) { return wins.blue >= 2 || wins.red >= 2; }
  function validateQuestion(q) {
    if (!q || typeof q !== 'object') return 'คำถามต้องเป็น object';
    if (typeof q.question !== 'string' || q.question.trim().length < 8) return 'ข้อความโจทย์สั้นเกินไป';
    if (!Array.isArray(q.choices) || q.choices.length !== 4 || q.choices.some(c => typeof c !== 'string' || !c.trim())) return 'ต้องมีตัวเลือกครบ 4 ข้อ';
    if (!Number.isInteger(q.correctIndex) || q.correctIndex < 0 || q.correctIndex > 3) return 'เฉลยต้องเป็นเลข 0–3';
    if (!['systems', 'design', 'materials', 'mechanics', 'data'].includes(q.category)) return 'หมวดคำถามไม่ถูกต้อง';
    if (!['easy', 'medium', 'hard'].includes(q.difficulty)) return 'ระดับความยากไม่ถูกต้อง';
    if (typeof q.explanation !== 'string' || !q.explanation.trim()) return 'ต้องมีคำอธิบายคำตอบ';
    return null;
  }
  function seededShuffle(arr, rng) {
    const result = arr.slice();
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }
  function createRoundQueues(questions, categories, difficulty, rng) {
    rng = rng || Math.random;
    const pool = questions.filter(q => categories.includes(q.category) && (difficulty === 'mixed' || q.difficulty === difficulty));
    if (pool.length < 2) throw new Error('จำเป็นต้องมีคำถามอย่างน้อย 2 ข้อ');
    // Pair category and difficulty to keep both teams similarly challenged.
    const groups = new Map();
    for (const q of pool) {
      const key = `${q.category}:${q.difficulty}`;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(q);
    }
    const pairBuckets = [];
    const leftovers = [];
    for (const group of groups.values()) {
      const shuffled = seededShuffle(group, rng);
      for (let i = 0; i + 1 < shuffled.length; i += 2) {
        pairBuckets.push([shuffled[i], shuffled[i + 1]]);
      }
      if (shuffled.length % 2) leftovers.push(shuffled[shuffled.length - 1]);
    }
    const allPairs = seededShuffle(pairBuckets, rng);
    const residual = seededShuffle(leftovers, rng);
    while (residual.length >= 2) allPairs.push([residual.pop(), residual.pop()]);
    if (allPairs.length === 0) throw new Error('ชุดคำถามที่เลือกมีข้อมูลไม่เพียงพอ');
    const blue = [], red = [];
    for (const [one, two] of allPairs) {
      if (rng() < 0.5) { blue.push(one); red.push(two); }
      else { blue.push(two); red.push(one); }
    }
    // Cycling question queues only after exhausting the available selection.
    return {blue, red};
  }
  const API = { LIMIT, ROUND_SECONDS, ANSWER_MOVE, moveForAnswer, classifyRound, hasReachedGoal, isMatchOver, validateQuestion, seededShuffle, createRoundQueues };
  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  global.TugCore = API;
})(typeof window !== 'undefined' ? window : globalThis);
