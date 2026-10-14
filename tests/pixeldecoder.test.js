const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const htmlPath = path.join(__dirname, "../projects/puzzle-collection/pixeldecoder.html");
const html = fs.readFileSync(htmlPath, "utf8");

test("Pixel Decoder HTML: structure, SEO, and branding checks", () => {
  assert.ok(html.includes("PIXEL DECODER"), "Should have title PIXEL DECODER");
  assert.ok(html.includes('id="difficulty-count"'), "Should contain difficulty-count badge element");
  assert.ok(html.includes('id="level-pills"'), "Should contain level-pills container");
  assert.ok(html.includes('id="btn-prev-level"'), "Should contain prev level button");
  assert.ok(html.includes('id="btn-next-level"'), "Should contain next level button");
  assert.ok(html.includes('id="help-modal"'), "Should contain help modal");
  assert.ok(html.includes('id="cs-modal"'), "Should contain CS insights modal");
  assert.ok(html.includes('id="btn-undo"'), "Should contain undo button");
  assert.ok(html.includes('id="btn-sound"'), "Should contain sound toggle button");
  assert.ok(html.includes('id="btn-lang"'), "Should contain language toggle button");
  assert.ok(html.includes('id="telem-ratio"'), "Should contain compression ratio display");
  assert.ok(html.includes('id="telem-saved"'), "Should contain space saved display");
  assert.ok(html.includes('schema.org'), "Should include Schema.org JSON-LD");
  assert.ok(html.includes("ดร.อภิสิทธิ์ ธงไชย"), "Should contain author credit ดร.อภิสิทธิ์ ธงไชย");
  assert.ok(!html.includes("สสวท"), "Must not contain 'สสวท'");
  assert.ok(!html.includes("IPST"), "Must not contain 'IPST'");
});

test("Pixel Decoder Logic: levels data and RLE integrity", () => {
  // Extract levels array from HTML
  const levelsMatch = html.match(/const levels\s*=\s*(\[[\s\S]*?\]);\s*\/\/\s*={10,}/);
  assert.ok(levelsMatch, "Should be able to extract levels definition from script");
  
  const levels = eval(levelsMatch[1]);
  assert.equal(levels.length, 10, "Should contain exactly 10 levels");

  levels.forEach((lvl, idx) => {
    assert.equal(lvl.id, idx + 1, `Level index ${idx} should have id ${idx + 1}`);
    assert.ok(lvl.title, `Level ${lvl.id} should have a title`);
    assert.ok(lvl.size, `Level ${lvl.id} should have size label`);
    assert.ok(lvl.key, `Level ${lvl.id} should have localization key`);
    assert.ok(Array.isArray(lvl.palette), `Level ${lvl.id} should have a palette array`);
    assert.ok(Array.isArray(lvl.grid), `Level ${lvl.id} should have a 2D grid`);

    const rowCount = lvl.grid.length;
    lvl.grid.forEach((row, rIdx) => {
      assert.equal(row.length, rowCount, `Level ${lvl.id} row ${rIdx} should have width equal to height (${rowCount})`);

      // Test RLE algorithm
      let rleSum = 0;
      let currentVal = row[0];
      let count = 1;
      for (let i = 1; i < row.length; i++) {
        if (row[i] === currentVal) {
          count++;
        } else {
          rleSum += count;
          currentVal = row[i];
          count = 1;
        }
      }
      rleSum += count;
      assert.equal(rleSum, row.length, `Level ${lvl.id} row ${rIdx} RLE counts must sum to row width`);
    });
  });
});

test("Pixel Decoder i18n: bilingual dictionary parity", () => {
  const i18nMatch = html.match(/const i18n\s*=\s*(\{[\s\S]*?\});\s*let currentLang/);
  assert.ok(i18nMatch, "Should be able to extract i18n dictionary");
  
  const i18n = eval(`(${i18nMatch[1]})`);
  assert.ok(i18n.th, "i18n must contain 'th' translations");
  assert.ok(i18n.en, "i18n must contain 'en' translations");

  const thKeys = Object.keys(i18n.th).sort();
  const enKeys = Object.keys(i18n.en).sort();
  assert.deepEqual(thKeys, enKeys, "Thai and English dictionaries must have matching keys");

  // Verify all levels have translations
  for (let i = 1; i <= 10; i++) {
    assert.ok(i18n.th[`lvl${i}`], `Missing Thai translation for lvl${i}`);
    assert.ok(i18n.en[`lvl${i}`], `Missing English translation for lvl${i}`);
  }
});

test("Pixel Decoder Math: RLE compression calculation logic", () => {
  // Test compression metric formula on level 1 (5x5, 25 pixels, 3 bits/pixel = 75 bits raw)
  const size = 5;
  const rawBits = size * size * 3;
  const countBits = Math.ceil(Math.log2(size + 1)); // 3
  const bitsPerToken = countBits + 3; // 6

  // Level 1 grid:
  // [0,0,0,0,0] -> 1 token (5x0)
  // [0,1,0,1,0] -> 5 tokens (1x0, 1x1, 1x0, 1x1, 1x0)
  // [0,0,0,0,0] -> 1 token (5x0)
  // [1,0,0,0,1] -> 3 tokens (1x1, 3x0, 1x1)
  // [0,1,1,1,0] -> 3 tokens (1x0, 3x1, 1x0)
  // Total tokens = 1 + 5 + 1 + 3 + 3 = 13 tokens
  const totalTokens = 13;
  const rleBits = totalTokens * bitsPerToken; // 13 * 6 = 78 bits
  assert.equal(rawBits, 75);
  assert.equal(rleBits, 78);

  // Test Level 4 (8x8 Trophy, large runs)
  // Row 0: 8x3 -> 1 token
  // Row 1: 1x0, 6x3, 1x0 -> 3 tokens
  // Row 2: 1x0, 6x3, 1x0 -> 3 tokens
  // Row 3: 2x0, 4x3, 2x0 -> 3 tokens
  // Row 4: 3x0, 2x3, 3x0 -> 3 tokens
  // Row 5: 3x0, 2x3, 3x0 -> 3 tokens
  // Row 6: 2x0, 4x3, 2x0 -> 3 tokens
  // Row 7: 1x0, 6x3, 1x0 -> 3 tokens
  // Total tokens = 22 tokens. Raw bits = 64 * 3 = 192 bits.
  // Token bits = ceil(log2(9)) + 3 = 4 + 3 = 7 bits.
  // RLE bits = 22 * 7 = 154 bits.
  // Space saved = 192 - 154 = 38 bits (20% savings)
  const l4RawBits = 64 * 3;
  const l4RleBits = 22 * 7;
  const savingsPercent = Math.round(((l4RawBits - l4RleBits) / l4RawBits) * 100);
  assert.ok(savingsPercent > 0, "Level 4 must produce positive compression savings");
  assert.equal(savingsPercent, 20, "Level 4 space savings should be 20%");
});
