const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const htmlPath = path.join(__dirname, "../projects/puzzle-collection/pixeldecoder.html");
const html = fs.readFileSync(htmlPath, "utf8");

test("Pixel Decoder HTML: structure and branding checks", () => {
  assert.ok(html.includes("PIXEL DECODER"), "Should have title PIXEL DECODER");
  assert.ok(html.includes('id="difficulty-count"'), "Should contain difficulty-count badge element");
  assert.ok(html.includes('id="level-pills"'), "Should contain level-pills container");
  assert.ok(html.includes('id="btn-prev-level"'), "Should contain prev level button");
  assert.ok(html.includes('id="btn-next-level"'), "Should contain next level button");
  assert.ok(html.includes('id="help-modal"'), "Should contain help modal");
  assert.ok(!html.includes("สสวท"), "Must not contain 'สสวท'");
  assert.ok(!html.includes("IPST"), "Must not contain 'IPST'");
});

test("Pixel Decoder Logic: levels data and RLE integrity", () => {
  // Extract levels array from HTML
  const levelsMatch = html.match(/const levels\s*=\s*(\[[\s\S]*?\]);\s*let currentLevel/);
  assert.ok(levelsMatch, "Should be able to extract levels definition from script");
  
  const levels = eval(levelsMatch[1]);
  assert.equal(levels.length, 10, "Should contain exactly 10 levels");

  levels.forEach((lvl, idx) => {
    assert.equal(lvl.id, idx + 1, `Level index ${idx} should have id ${idx + 1}`);
    assert.ok(lvl.title, `Level ${lvl.id} should have a title`);
    assert.ok(lvl.size, `Level ${lvl.id} should have size label`);
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
