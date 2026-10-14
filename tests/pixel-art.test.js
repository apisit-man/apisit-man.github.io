// tests/pixel-art.test.js
// node:test based — run with: node --test tests/pixel-art.test.js

const { test } = require('node:test');
const assert   = require('node:assert/strict');
const fs       = require('fs');
const path     = require('path');

const HTML_PATH = path.resolve(__dirname, '../projects/puzzle-collection/pixel-art/index.html');
const html      = fs.readFileSync(HTML_PATH, 'utf-8');

// ── 1. HTML structure & SEO ──────────────────────────────────────────────────
test('Has correct <title> with author name', () => {
  assert.match(html, /ดร\.อภิสิทธิ์ ธงไชย/);
  assert.match(html, /<title>.*Pixel Art Coding.*<\/title>/);
});

test('Has meta description', () => {
  assert.match(html, /<meta name="description"/);
});

test('Has Open Graph meta tags', () => {
  assert.match(html, /og:title/);
  assert.match(html, /og:description/);
  assert.match(html, /og:url/);
});

test('Has Schema.org JSON-LD WebApplication', () => {
  assert.match(html, /"@type": "WebApplication"/);
  assert.match(html, /"applicationCategory": "EducationalGame"/);
  assert.match(html, /"inLanguage": \["th", "en"\]/);
});

// ── 2. Branding rules ────────────────────────────────────────────────────────
test('Author credit is ดร.อภิสิทธิ์ ธงไชย / Dr. Apisit Thongchai', () => {
  assert.match(html, /ดร\.อภิสิทธิ์ ธงไชย/);
  assert.match(html, /Dr\. Apisit Thongchai/);
});

test('NO สสวท or IPST branding anywhere', () => {
  assert.doesNotMatch(html, /สสวท/);
  assert.doesNotMatch(html, /IPST/);
});

// ── 3. Direct gameplay (no start modal blocking the game) ────────────────────
test('No blocking start-modal shown on load', () => {
  // The old start-modal (id="start-modal") should NOT be present
  // (or if present must be permanently hidden — we just removed it)
  assert.doesNotMatch(html, /id="start-modal"/);
});

// ── 4. On-page difficulty stepper ────────────────────────────────────────────
test('Has stepper elements: diff-val, diff-pill, nav-btn prev/next', () => {
  assert.match(html, /id="diff-val"/);
  assert.match(html, /id="diff-pill"/);
  assert.match(html, /id="btn-prev"/);
  assert.match(html, /id="btn-next"/);
});

test('Stepper shows X / 10 format in JS (TOTAL_LEVELS = 10)', () => {
  assert.match(html, /TOTAL_LEVELS/);
  // Check the JS has 10 level keys
  const levelMatches = html.match(/^\s+\d+: \{ size:/gm);
  assert.ok(levelMatches && levelMatches.length === 10, `Expected 10 level entries, got ${levelMatches ? levelMatches.length : 0}`);
});

// ── 5. i18n bilingual dictionary ─────────────────────────────────────────────
test('i18n dictionary has identical keys for th and en', () => {
  // Extract the entire i18n const block
  const i18nBlock = html.match(/const i18n\s*=\s*\{([\s\S]*?)\};\s*let lang/);
  assert.ok(i18nBlock, 'i18n block not found');

  // Extract th and en sub-blocks within the i18n block
  const thBlock = i18nBlock[1].match(/th:\s*\{([^}]+)\}/s);
  const enBlock = i18nBlock[1].match(/en:\s*\{([^}]+)\}/s);
  assert.ok(thBlock, 'th block not found');
  assert.ok(enBlock, 'en block not found');

  // Only match identifier keys (word chars followed by colon + whitespace/quote, anchored to line start)
  const getKeys = block => [...block[1].matchAll(/^\s+(\w+):\s*['"]/gm)].map(m => m[1]).sort();
  const thKeys = getKeys(thBlock);
  const enKeys = getKeys(enBlock);

  assert.deepEqual(thKeys, enKeys, `i18n key mismatch:\n  th: ${thKeys}\n  en: ${enKeys}`);
});

test('Key i18n strings present for both languages', () => {
  const required = ['back','level','check','clear','instructions','next_level','replay','correct_title','final_title','diff_easy','diff_medium','diff_hard'];
  required.forEach(k => {
    assert.match(html, new RegExp(k + ':'), `Missing i18n key: ${k}`);
  });
});

// ── 6. Web Audio (no external audio files) ───────────────────────────────────
test('Has procedural Web Audio System (AudioSys)', () => {
  assert.match(html, /AudioSys/);
  assert.match(html, /AudioContext/);
  assert.match(html, /createOscillator/);
});

test('No external audio src files referenced', () => {
  assert.doesNotMatch(html, /<audio.*src=/);
  assert.doesNotMatch(html, /\.mp3|\.wav|\.ogg/);
});

// ── 7. Confetti uses canvas (no external confetti library) ───────────────────
test('Confetti is self-contained (canvas-based, no cdn.jsdelivr confetti)', () => {
  assert.doesNotMatch(html, /canvas-confetti/);
  assert.match(html, /triggerConfetti/);
  assert.match(html, /id="fx-canvas"/);
});

// ── 8. Game controls & UI elements ───────────────────────────────────────────
test('Has check answer and clear board buttons', () => {
  assert.match(html, /id="btn-check"/);
  assert.match(html, /id="btn-clear"/);
});

test('Has RLE instruction panel', () => {
  assert.match(html, /id="rle-list"/);
  assert.match(html, /class="rle-panel"/);
});

test('Has pixel grid container', () => {
  assert.match(html, /id="grid-container"/);
});

test('Has success modal with next-level and close buttons', () => {
  assert.match(html, /id="success-modal"/);
  assert.match(html, /id="btn-next-level"/);
  assert.match(html, /id="btn-close-modal"/);
});

// ── 9. Footer links ──────────────────────────────────────────────────────────
test('Footer has links to home, about, sitemap', () => {
  assert.match(html, /index\.html/);
  assert.match(html, /about\.html/);
  assert.match(html, /sitemap\.html/);
});

// ── 10. Back navigation goes to puzzle collection hub ────────────────────────
test('Back button links to puzzle-collection hub', () => {
  assert.match(html, /href="\.\.\/index\.html"/);
});

// ── 11. Level data integrity ─────────────────────────────────────────────────
test('All 10 levels have valid size and puzzle data', () => {
  // Extract the levels object as a string and validate key presence
  const VALID_SIZES = [5, 8, 10];
  for (let lvl = 1; lvl <= 10; lvl++) {
    assert.match(html, new RegExp(`${lvl}: \\{ size:`), `Level ${lvl} missing`);
  }
  VALID_SIZES.forEach(s => {
    assert.match(html, new RegExp(`size: ${s}`), `Size ${s} not found`);
  });
});

// ── 12. Keyboard shortcuts ───────────────────────────────────────────────────
test('Has keyboard event listener for navigation', () => {
  assert.match(html, /addEventListener\('keydown'/);
  assert.match(html, /ArrowRight/);
  assert.match(html, /ArrowLeft/);
});

// ── 13. Mobile responsive & touch support ────────────────────────────────────
test('Has touch event listeners for mobile drawing', () => {
  assert.match(html, /touchstart/);
  assert.match(html, /touchmove/);
  assert.match(html, /touchend/);
});

test('Has responsive media queries', () => {
  assert.match(html, /@media.*max-width.*680px/);
  assert.match(html, /@media.*max-width.*420px/);
});
