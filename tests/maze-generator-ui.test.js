const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const htmlPath = path.join(__dirname, "../projects/maze-generator/index.html");
const cssPath = path.join(__dirname, "../projects/maze-generator/style.css");

test("Maze Generator Suite: Branding, Navigation, and Print Structure", () => {
  assert.ok(fs.existsSync(htmlPath), "index.html must exist");
  assert.ok(fs.existsSync(cssPath), "style.css must exist");

  const html = fs.readFileSync(htmlPath, "utf8");
  const css = fs.readFileSync(cssPath, "utf8");

  // Strict Institutional Independence Branding checks
  assert.ok(!html.includes("สสวท"), "Must not contain 'สสวท'");
  assert.ok(!html.includes("IPST"), "Must not contain 'IPST'");
  assert.ok(html.includes("อภิสิทธิ์ ธงไชย") || html.includes("Apisit Tongchai"), "Must contain author credit");

  // Navigation
  assert.ok(html.includes("กลับหน้าหลัก"), "Must contain home link");
  assert.ok(html.includes('id="btn-print"'), "Must contain print button");
  assert.ok(html.includes('id="btn-solution"'), "Must contain solution toggle button");
  assert.ok(html.includes('id="lang-toggle"'), "Must contain language toggle");
  assert.ok(html.includes('id="mode-play"'), "Must contain mode-play button");
  assert.ok(html.includes('id="mode-worksheet"'), "Must contain mode-worksheet button");
  assert.ok(html.includes('id="maze-canvas"'), "Must contain maze-canvas");
  assert.ok(html.includes('id="dpad"'), "Must contain mobile dpad");

  // Print CSS & No-Print Rules
  assert.ok(css.includes("@media print"), "Must contain @media print CSS rules");
  assert.ok(css.includes(".no-print"), "Must contain .no-print helper class");
});
