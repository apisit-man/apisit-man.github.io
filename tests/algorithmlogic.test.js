const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const htmlPath = path.join(__dirname, "../projects/puzzle-collection/algorithmlogic.html");
const html = fs.readFileSync(htmlPath, "utf8");

test("Cyber Rover HTML: direct gameplay, structure, SEO, and branding", () => {
  // Title & Heading
  assert.ok(html.includes("Cyber Rover") || html.includes("CYBER ROVER"), "Should have title Cyber Rover");
  
  // No separate intermediate landing screen
  assert.ok(!html.includes('id="level-select"'), "Must NOT contain old intermediate level-select landing screen");
  assert.ok(!html.includes('initLevelSelect'), "Must not use old initLevelSelect screen switcher");

  // Stepper bar elements on the active game screen
  assert.ok(html.includes('id="difficulty-count"'), "Should contain difficulty-count element");
  assert.ok(html.includes('id="difficulty-name"'), "Should contain difficulty-name element");
  assert.ok(html.includes('id="btn-prev-level"'), "Should contain prev level button");
  assert.ok(html.includes('id="btn-next-level"'), "Should contain next level button");
  assert.ok(html.includes('id="level-title-display"'), "Should contain level title display");

  // Header controls
  assert.ok(html.includes('id="btn-lang"'), "Should contain language toggle button");
  assert.ok(html.includes('id="btn-sound"'), "Should contain sound toggle button");
  assert.ok(html.includes('id="btn-fullscreen"'), "Should contain fullscreen button");
  assert.ok(html.includes('id="btn-help"'), "Should contain help button");
  assert.ok(html.includes('id="btn-reset"'), "Should contain reset level button");

  // Game controls
  assert.ok(html.includes('id="btn-run"'), "Should contain Run button");
  assert.ok(html.includes('id="btn-clear"'), "Should contain Clear button");

  // Modals
  assert.ok(html.includes('id="modal-howto"'), "Should contain how-to modal");
  assert.ok(html.includes('id="modal-overlay"'), "Should contain win modal");

  // SEO & Branding
  assert.ok(html.includes("schema.org"), "Should include Schema.org JSON-LD");
  assert.ok(html.includes("ดร.อภิสิทธิ์ ธงไชย"), "Should contain author credit ดร.อภิสิทธิ์ ธงไชย");
  assert.ok(!html.includes("สสวท"), "Must strictly not contain 'สสวท'");
  assert.ok(!html.includes("IPST"), "Must strictly not contain 'IPST'");
});

test("Cyber Rover Logic: levels data structure and reachability", () => {
  // Extract levels definition
  const levelsMatch = html.match(/const levels\s*=\s*(\[[\s\S]*?\]);\s*\/\/\s*={10,}/) ||
                      html.match(/const levels\s*=\s*(\[[\s\S]*?\n\s*\];)/);
  assert.ok(levelsMatch, "Should extract levels definition from script");

  // Evaluate the extracted array string safely
  const levelsStr = levelsMatch[1].replace(/;\s*$/, '');
  const levels = eval(levelsStr);
  assert.equal(levels.length, 10, "Should contain exactly 10 levels");

  levels.forEach((lvl, idx) => {
    assert.equal(lvl.id, idx + 1, `Level index ${idx} should have id ${idx + 1}`);
    assert.ok(lvl.titleTh, `Level ${lvl.id} should have titleTh`);
    assert.ok(lvl.titleEn, `Level ${lvl.id} should have titleEn`);
    assert.ok(typeof lvl.size === 'number' && lvl.size >= 4, `Level ${lvl.id} should have valid grid size`);
    assert.ok(typeof lvl.mem === 'number' && lvl.mem > 0, `Level ${lvl.id} should have valid memory limit`);
    assert.ok(typeof lvl.unlockLogic === 'boolean', `Level ${lvl.id} should have unlockLogic boolean`);
    assert.ok(Array.isArray(lvl.grid), `Level ${lvl.id} should have 2D grid array`);
    assert.equal(lvl.grid.length, lvl.size, `Level ${lvl.id} grid height should match size`);

    assert.ok(lvl.start && typeof lvl.start.r === 'number' && typeof lvl.start.c === 'number', `Level ${lvl.id} valid start`);
    assert.ok(lvl.target && typeof lvl.target.r === 'number' && typeof lvl.target.c === 'number', `Level ${lvl.id} valid target`);
    assert.ok([0, 1, 2, 3].includes(lvl.start.dir), `Level ${lvl.id} valid start direction (0:UP, 1:RIGHT, 2:DOWN, 3:LEFT)`);

    assert.ok(lvl.start.r >= 0 && lvl.start.r < lvl.size && lvl.start.c >= 0 && lvl.start.c < lvl.size, `Level ${lvl.id} start in bounds`);
    assert.ok(lvl.target.r >= 0 && lvl.target.r < lvl.size && lvl.target.c >= 0 && lvl.target.c < lvl.size, `Level ${lvl.id} target in bounds`);
    assert.ok(!(lvl.start.r === lvl.target.r && lvl.start.c === lvl.target.c), `Level ${lvl.id} start cannot be target`);
  });
});

test("Cyber Rover i18n: bilingual dictionary parity", () => {
  const i18nMatch = html.match(/const i18n\s*=\s*(\{[\s\S]*?\n\s*\};\s*let currentLang)/) ||
                    html.match(/const i18n\s*=\s*(\{[\s\S]*?\n\s*\};)/);
  assert.ok(i18nMatch, "Should extract i18n dictionary");

  let jsonStr = i18nMatch[1];
  if (jsonStr.endsWith('let currentLang')) {
    jsonStr = jsonStr.replace(/let currentLang$/, '').trim();
  }
  jsonStr = jsonStr.replace(/;\s*$/, '');
  const i18n = eval(`(${jsonStr})`);

  assert.ok(i18n.th, "Should have th dictionary");
  assert.ok(i18n.en, "Should have en dictionary");

  const thKeys = Object.keys(i18n.th).sort();
  const enKeys = Object.keys(i18n.en).sort();

  assert.deepEqual(thKeys, enKeys, "TH and EN dictionaries must have identical keys");
});

test("Cyber Rover Web Audio: sound effects engine definition", () => {
  assert.ok(html.includes("const AudioSys") || html.includes("class AudioSys"), "Should contain AudioSys definition");
  assert.ok(html.includes("AudioContext") || html.includes("webkitAudioContext"), "Should instantiate AudioContext");
  
  // Key sound triggers
  assert.ok(html.includes("click"), "Should support click sound");
  assert.ok(html.includes("step"), "Should support step sound");
  assert.ok(html.includes("turn"), "Should support turn sound");
  assert.ok(html.includes("crash"), "Should support crash sound");
  assert.ok(html.includes("win"), "Should support win sound");
});
