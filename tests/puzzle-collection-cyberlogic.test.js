const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const htmlPath = path.join(__dirname, "../projects/puzzle-collection/index.html");
const html = fs.readFileSync(htmlPath, "utf8");

test("Cyber Logic Platform: HTML structure, SEO, and Author Branding", () => {
  assert.ok(html.includes("CYBER LOGIC"), "Should contain title CYBER LOGIC");
  assert.ok(html.includes("ดร.อภิสิทธิ์ ธงไชย"), "Should contain author credit ดร.อภิสิทธิ์ ธงไชย");
  assert.ok(!html.includes("สสวท"), "Must not contain forbidden keyword 'สสวท'");
  assert.ok(!html.includes("IPST"), "Must not contain forbidden keyword 'IPST'");
  assert.ok(html.includes('schema.org'), "Should include Schema.org JSON-LD");
  assert.ok(html.includes('"@type": "WebApplication"'), "Schema.org should declare WebApplication");
  assert.ok(html.includes('"author"'), "Schema.org should declare author");
});

test("Cyber Logic Platform: Unified On-Page Difficulty Stepper and Controls", () => {
  assert.ok(html.includes('id="difficulty-count"'), "Should contain difficulty-count badge element");
  assert.ok(!html.includes('id="level-pills"'), "Redundant level-pills row should be removed for cleaner, larger gameplay area");
  assert.ok(html.includes('id="difficulty-name"'), "Should contain difficulty-name pill element");
  assert.ok(html.includes('id="btn-prev-level"'), "Should contain prev level button");
  assert.ok(html.includes('id="btn-next-level"'), "Should contain next level button");
  assert.ok(html.includes('id="btn-lang"'), "Should contain language toggle button");
  assert.ok(html.includes('id="btn-sound"'), "Should contain sound toggle button");
  assert.ok(html.includes('id="btn-fullscreen"'), "Should contain fullscreen toggle button");
  assert.ok(html.includes('id="btn-theme"'), "Should contain theme toggle button");
  assert.ok(html.includes('id="timer-badge"'), "Should contain timer badge");
  assert.ok(html.includes('id="modal-win"'), "Should contain win celebration modal");
  assert.ok(html.includes('id="modal-howto"'), "Should contain how to play modal");
});

test("Cyber Logic Platform: 6 Interactive Games Engine Presence", () => {
  // Game 1: Sudoku
  assert.ok(html.includes("initSudoku"), "Should define initSudoku");
  assert.ok(html.includes("renderSudokuBoard"), "Should define renderSudokuBoard");
  assert.ok(html.includes("inputSudoku"), "Should define inputSudoku");

  // Game 2: Takuzu
  assert.ok(html.includes("initTakuzu"), "Should define initTakuzu");
  assert.ok(html.includes("solveTakuzu"), "Should define solveTakuzu");
  assert.ok(html.includes("renderTakuzuBoard"), "Should define renderTakuzuBoard");

  // Game 3: Nonogram
  assert.ok(html.includes("initNonogram"), "Should define initNonogram");
  assert.ok(html.includes("getLineHints"), "Should define getLineHints");
  assert.ok(html.includes("renderNonogramBoard"), "Should define renderNonogramBoard");

  // Game 4: Code Path
  assert.ok(html.includes("initCodePath"), "Should define initCodePath");
  assert.ok(html.includes("getCodePathDist"), "Should define getCodePathDist BFS solver");
  assert.ok(html.includes("runCodePath"), "Should define runCodePath");

  // Game 5: Binary Decoder
  assert.ok(html.includes("initBinary"), "Should define initBinary");
  assert.ok(html.includes("renderBinaryBoard"), "Should define renderBinaryBoard");
  assert.ok(html.includes("toggleBinaryCell"), "Should define toggleBinaryCell");

  // Game 6: Logic Gate
  assert.ok(html.includes("initLogic"), "Should define initLogic");
  assert.ok(html.includes("selectLogicGate"), "Should define selectLogicGate");
  assert.ok(html.includes("evaluateLogic"), "Should define evaluateLogic");

  // Global actions
  assert.ok(html.includes("checkSolution"), "Should define checkSolution");
  assert.ok(html.includes("useHint"), "Should define useHint");
});

test("Cyber Logic Platform: Bilingual i18n Parity and Audio Synthesis", () => {
  // Extract i18n object from HTML script
  const i18nMatch = html.match(/const i18n\s*=\s*(\{[\s\S]*?\});\s*let currentLang/);
  assert.ok(i18nMatch, "Should be able to extract i18n dictionary from script");

  const i18n = eval(`(${i18nMatch[1]})`);
  assert.ok(i18n.th, "i18n must contain 'th' dictionary");
  assert.ok(i18n.en, "i18n must contain 'en' dictionary");

  const thKeys = Object.keys(i18n.th).sort();
  const enKeys = Object.keys(i18n.en).sort();
  assert.deepEqual(thKeys, enKeys, "Thai and English dictionaries must have matching keys");

  // Check key translation items
  const requiredKeys = [
    "navHome", "heroTitle", "heroSubtitle", "levelLabel",
    "diffEasy", "diffMedium", "diffHard",
    "btnHint", "btnCheck", "btnErase", "btnBackHome",
    "winTitleRegular", "winDescRegular", "winTitleGrand", "winDescGrand"
  ];
  requiredKeys.forEach(key => {
    assert.ok(i18n.th[key], `Thai dictionary missing key: ${key}`);
    assert.ok(i18n.en[key], `English dictionary missing key: ${key}`);
  });

  // Verify AudioSys Web Audio API presence
  assert.ok(html.includes("AudioContext"), "Should instantiate AudioContext");
  assert.ok(html.includes("createOscillator"), "Should create procedural oscillator");
  assert.ok(html.includes("createGain"), "Should create procedural gain node");
});
