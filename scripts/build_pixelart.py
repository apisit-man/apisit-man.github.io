# -*- coding: utf-8 -*-
"""
Builder script to upgrade projects/puzzle-collection/pixel-art/index.html
Enhancements:
- Direct gameplay on load (no start modal / intermediate screen)
- Unified Game HUD bar: back btn + title + level stepper 1/10 + diff pill + help + reset
- Full bilingual Thai/English (i18n) with localStorage persistence
- Web Audio API procedural SFX (paint, erase, success, fanfare) — no external files
- Mobile-first responsive layout with thumb-friendly grid
- Dark cyber aesthetic matching algorithmlogic.html and puzzle hub
- Schema.org JSON-LD for SEO
- Author branding: strictly 'ดร.อภิสิทธิ์ ธงไชย' / 'Dr. Apisit Thongchai', no IPST/สสวท
"""

import os

html_content = '''<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
  <meta name="description" content="Pixel Art Coding - ถอดรหัส Run-Length Encoding และระบายสีเพื่อค้นหาภาพซ่อน 10 ระดับความยาก โดย ดร.อภิสิทธิ์ ธงไชย">
  <meta name="author" content="ดร.อภิสิทธิ์ ธงไชย">
  <meta name="keywords" content="Pixel Art Coding, Run-Length Encoding, RLE, วิทยาการคำนวณ, ดร.อภิสิทธิ์ ธงไชย, เกมการศึกษา">
  <title>Pixel Art Coding - ถอดรหัส RLE โดย ดร.อภิสิทธิ์ ธงไชย</title>

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="Pixel Art Coding - ถอดรหัส RLE">
  <meta property="og:description" content="ถอดรหัส Run-Length Encoding และระบายสีเพื่อค้นหาภาพซ่อน 10 ระดับความยาก โดย ดร.อภิสิทธิ์ ธงไชย">
  <meta property="og:url" content="https://apisit-man.github.io/projects/puzzle-collection/pixel-art/index.html">

  <!-- Schema.org JSON-LD -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Pixel Art Coding - RLE Puzzle Game",
    "url": "https://apisit-man.github.io/projects/puzzle-collection/pixel-art/index.html",
    "description": "ถอดรหัส Run-Length Encoding และระบายสีเพื่อค้นหาภาพซ่อน 10 ระดับความยาก โดย ดร.อภิสิทธิ์ ธงไชย",
    "applicationCategory": "EducationalGame",
    "operatingSystem": "All",
    "inLanguage": ["th", "en"],
    "author": {
      "@type": "Person",
      "name": "ดร.อภิสิทธิ์ ธงไชย",
      "url": "https://apisit-man.github.io/"
    }
  }
  </script>

  <style>
    :root {
      --bg-primary: #0f172a;
      --bg-secondary: #1e293b;
      --glass-bg: rgba(30, 41, 59, 0.80);
      --glass-border: rgba(255, 255, 255, 0.12);
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --accent-cyan: #06b6d4;
      --accent-purple: #8b5cf6;
      --accent-pink: #ec4899;
      --accent-green: #10b981;
      --accent-yellow: #f59e0b;
      --accent-red: #ef4444;
      --accent-blue: #3b82f6;
      --grid-filled: #3b82f6;
      --grid-empty: rgba(255,255,255,0.06);
      --grid-border: rgba(255,255,255,0.10);
      --shadow-lg: 0 10px 25px -3px rgba(0,0,0,0.5), 0 4px 6px -2px rgba(0,0,0,0.3);
      --font-main: system-ui, -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, \'Kanit\', \'Prompt\', sans-serif;
    }
    body.light-theme {
      --bg-primary: #f1f5f9;
      --bg-secondary: #e2e8f0;
      --glass-bg: rgba(255, 255, 255, 0.88);
      --glass-border: rgba(0, 0, 0, 0.10);
      --text-main: #0f172a;
      --text-muted: #64748b;
      --grid-filled: #3b82f6;
      --grid-empty: #ffffff;
      --grid-border: #dfe6e9;
      --shadow-lg: 0 10px 25px -3px rgba(0,0,0,0.08), 0 4px 6px -2px rgba(0,0,0,0.04);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; user-select: none; }
    body {
      font-family: var(--font-main);
      background: var(--bg-primary);
      color: var(--text-main);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      overflow-x: hidden;
      touch-action: manipulation;
      transition: background 0.3s, color 0.3s;
    }

    /* Animated BG orbs */
    .bg-mesh { position: fixed; inset: 0; z-index: 0; overflow: hidden; pointer-events: none; }
    .orb { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.28; animation: orbFloat 20s infinite alternate ease-in-out; }
    .orb-1 { top: -10%; left: -10%; width: 50vw; height: 50vw; background: var(--accent-purple); }
    .orb-2 { bottom: -10%; right: -10%; width: 45vw; height: 45vw; background: var(--accent-cyan); animation-duration: 25s; }
    @keyframes orbFloat { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(-5%,10%) scale(0.95); } }

    /* FX Canvas */
    #fx-canvas { position: fixed; inset: 0; z-index: 999; pointer-events: none; }

    /* ── HEADER ── */
    header {
      position: relative; z-index: 20;
      display: flex; justify-content: space-between; align-items: center;
      padding: 0.6rem 1.25rem;
      background: var(--glass-bg);
      backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--glass-border);
    }
    .logo {
      font-size: 1.2rem; font-weight: 900; letter-spacing: 1.5px;
      background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      display: flex; align-items: center; gap: 0.4rem; text-decoration: none;
    }
    .header-controls { display: flex; gap: 0.4rem; align-items: center; }
    .btn-icon {
      background: var(--glass-bg); border: 1px solid var(--glass-border);
      color: var(--text-main); width: 36px; height: 36px; border-radius: 10px;
      display: flex; align-items: center; justify-content: center; cursor: pointer;
      font-size: 1rem; transition: all 0.2s; text-decoration: none;
    }
    .btn-icon:hover { transform: translateY(-2px); border-color: var(--accent-cyan); box-shadow: 0 0 10px rgba(6,182,212,0.4); }
    .lang-btn { font-size: 0.78rem; font-weight: 800; padding: 0 6px; letter-spacing: 0.3px; }

    /* ── MAIN ── */
    main {
      position: relative; z-index: 10; flex: 1;
      display: flex; flex-direction: column;
      padding: 0.85rem 0.75rem; max-width: 1200px; margin: 0 auto; width: 100%;
      gap: 0.7rem;
    }

    /* ── TOP BAR (Back + Title + Controls) ── */
    .top-bar {
      display: flex; justify-content: space-between; align-items: center;
      background: var(--glass-bg); padding: 0.55rem 1rem;
      border-radius: 14px; border: 1px solid var(--glass-border);
      backdrop-filter: blur(12px); box-shadow: var(--shadow-lg); gap: 0.6rem;
      flex-wrap: wrap;
    }
    .bar-left { display: flex; align-items: center; gap: 0.6rem; }
    .btn-back {
      background: rgba(255,255,255,0.06); border: 1px solid var(--glass-border);
      color: var(--text-main); padding: 0.4rem 0.75rem; border-radius: 10px;
      font-weight: 700; font-size: 0.82rem; cursor: pointer;
      display: flex; align-items: center; gap: 0.35rem; transition: all 0.2s; text-decoration: none;
    }
    .btn-back:hover { background: rgba(255,255,255,0.12); border-color: var(--accent-cyan); transform: translateX(-2px); }
    .bar-title { font-size: 1.05rem; font-weight: 800; color: var(--text-main); }
    .bar-right { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
    .action-btn {
      background: rgba(255,255,255,0.06); border: 1px solid var(--glass-border);
      color: var(--text-main); padding: 0.38rem 0.75rem; border-radius: 10px;
      font-size: 0.82rem; font-weight: 700; cursor: pointer; transition: all 0.2s;
      display: flex; align-items: center; gap: 0.3rem;
    }
    .action-btn:hover { background: rgba(255,255,255,0.14); border-color: var(--accent-purple); }
    .action-btn.btn-check-ans {
      background: rgba(16,185,129,0.15); border-color: rgba(16,185,129,0.35); color: var(--accent-green);
    }
    .action-btn.btn-check-ans:hover { background: rgba(16,185,129,0.28); }
    .action-btn.btn-reset-brd {
      background: rgba(239,68,68,0.12); border-color: rgba(239,68,68,0.3); color: var(--accent-red);
    }
    .action-btn.btn-reset-brd:hover { background: rgba(239,68,68,0.25); }

    /* ── STEPPER BAR ── */
    .stepper-wrap {
      display: flex; align-items: center; justify-content: space-between;
      background: var(--glass-bg); padding: 0.5rem 1rem; border-radius: 14px;
      border: 1px solid var(--glass-border); backdrop-filter: blur(12px); box-shadow: var(--shadow-lg);
      gap: 0.5rem; flex-wrap: wrap;
    }
    .diff-counter { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
    .diff-icon { font-size: 1.1rem; }
    .diff-label { font-size: 0.78rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px; }
    .diff-val {
      font-size: 1.05rem; font-weight: 900; color: var(--accent-cyan);
      background: rgba(6,182,212,0.14); padding: 0.18rem 0.65rem; border-radius: 8px;
      border: 1px solid rgba(6,182,212,0.3); font-variant-numeric: tabular-nums;
    }
    .diff-pill {
      padding: 0.18rem 0.6rem; border-radius: 20px; font-size: 0.72rem;
      font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px;
      background: rgba(16,185,129,0.16); color: var(--accent-green); border: 1px solid rgba(16,185,129,0.32);
    }
    .diff-pill.diff-medium { background: rgba(245,158,11,0.16); color: var(--accent-yellow); border-color: rgba(245,158,11,0.32); }
    .diff-pill.diff-hard { background: rgba(239,68,68,0.16); color: var(--accent-red); border-color: rgba(239,68,68,0.32); }
    .puzzle-name-tag { font-size: 0.88rem; font-weight: 700; color: var(--text-main); }
    .stepper-nav { display: flex; gap: 0.35rem; align-items: center; }
    .nav-btn {
      width: 34px; height: 34px; border-radius: 10px;
      background: rgba(255,255,255,0.08); border: 1px solid var(--glass-border);
      color: var(--text-main); display: flex; align-items: center; justify-content: center;
      font-size: 1.15rem; font-weight: 900; cursor: pointer; transition: all 0.2s;
    }
    .nav-btn:hover:not(:disabled) { background: var(--accent-cyan); color: #fff; border-color: var(--accent-cyan); transform: scale(1.08); box-shadow: 0 0 10px rgba(6,182,212,0.5); }
    .nav-btn:disabled { opacity: 0.25; cursor: not-allowed; pointer-events: none; }

    /* ── INSTRUCTION BOX ── */
    .instruction-box {
      background: rgba(0,0,0,0.2); border: 1px solid var(--glass-border);
      border-radius: 12px; padding: 0.55rem 0.9rem; font-size: 0.84rem; color: var(--text-muted);
    }
    .instruction-box strong { color: var(--accent-cyan); }

    /* ── GAME STAGE ── */
    .game-stage {
      display: flex; gap: 0.75rem; flex: 1; min-height: 0;
      align-items: flex-start; flex-wrap: wrap;
    }

    /* RLE Panel (instructions) */
    .rle-panel {
      flex: 0 0 auto; min-width: 200px; max-width: 320px;
      background: var(--glass-bg); border: 1px solid var(--glass-border);
      border-radius: 16px; padding: 1rem; backdrop-filter: blur(12px);
      box-shadow: var(--shadow-lg); overflow-y: auto; max-height: 75vh;
    }
    .rle-panel-title {
      font-size: 0.82rem; font-weight: 800; text-transform: uppercase;
      letter-spacing: 0.5px; color: var(--text-muted); margin-bottom: 0.75rem;
      display: flex; align-items: center; gap: 0.35rem;
    }
    .rle-panel-title::after { content: \'\'; flex: 1; height: 1px; background: var(--glass-border); }

    .rle-list { display: flex; flex-direction: column; gap: 0.45rem; }
    .rle-row {
      display: flex; align-items: center; gap: 0.45rem;
      background: rgba(255,255,255,0.04); padding: 0.45rem 0.6rem;
      border-radius: 10px; border: 1px solid var(--glass-border); transition: background 0.15s;
    }
    .rle-row:hover { background: rgba(255,255,255,0.08); }
    .rle-row-label { font-size: 0.75rem; font-weight: 700; color: var(--text-muted); min-width: 42px; }
    .rle-blocks { display: flex; gap: 0.3rem; flex-wrap: wrap; }
    .rle-block {
      display: flex; align-items: center; justify-content: center;
      min-width: 26px; height: 26px; padding: 0 5px;
      border-radius: 6px; font-weight: 800; font-size: 0.88rem;
    }
    .rle-block.blk-white {
      background: rgba(255,255,255,0.08); border: 1.5px solid var(--glass-border);
      color: var(--text-muted);
    }
    .rle-block.blk-filled {
      background: var(--accent-blue); border: 1.5px solid var(--accent-blue);
      color: #fff; box-shadow: 0 0 8px rgba(59,130,246,0.4);
    }

    /* Pixel Grid board */
    .board-wrap {
      flex: 1 1 280px; display: flex; flex-direction: column;
      align-items: center; gap: 0.65rem;
    }
    .grid-container {
      display: grid;
      gap: 2px;
      background: var(--glass-border);
      border: 4px solid var(--glass-border);
      border-radius: 12px;
      overflow: hidden;
      user-select: none;
      width: 100%;
      max-width: min(480px, 90vw);
      aspect-ratio: 1;
      box-shadow: var(--shadow-lg), inset 0 0 12px rgba(0,0,0,0.25);
    }
    .grid-row-label {
      display: flex; align-items: center; justify-content: flex-end;
      padding-right: 8px; font-weight: 700; font-size: 0.7rem;
      color: var(--accent-green); background: rgba(16,185,129,0.08); border-radius: 3px;
    }
    .grid-cell {
      background: var(--grid-empty);
      cursor: pointer;
      border-radius: 3px;
      transition: background 0.1s, transform 0.08s;
      touch-action: none;
    }
    .grid-cell:hover { transform: scale(0.9); background: rgba(59,130,246,0.2); }
    .grid-cell.filled {
      background: var(--grid-filled);
      box-shadow: 0 0 6px rgba(59,130,246,0.6);
      transform: scale(1);
      animation: cellPop 0.2s cubic-bezier(0.175,0.885,0.32,1.275);
    }
    @keyframes cellPop { 0%{transform:scale(1)} 50%{transform:scale(1.18)} 100%{transform:scale(1)} }

    /* ── SUCCESS OVERLAY ── */
    .modal {
      position: fixed; inset: 0; background: rgba(0,0,0,0.5);
      display: flex; justify-content: center; align-items: center;
      z-index: 500; opacity: 1; transition: opacity 0.3s; backdrop-filter: blur(6px);
    }
    .modal.hidden { opacity: 0; pointer-events: none; }
    .modal-box {
      background: var(--bg-secondary); border: 1px solid var(--glass-border);
      border-radius: 20px; padding: 2rem 2.2rem; max-width: 420px; width: 90%;
      text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,0.5);
      transform: scale(1); transition: transform 0.3s cubic-bezier(0.175,0.885,0.32,1.275);
    }
    .modal.hidden .modal-box { transform: scale(0.8); }
    .modal-box h2 { font-size: 2rem; margin-bottom: 0.75rem; color: var(--accent-cyan); }
    .modal-box p { font-size: 1.1rem; color: var(--text-muted); margin-bottom: 1.5rem; line-height: 1.6; }
    .modal-actions { display: flex; flex-direction: column; gap: 0.7rem; }
    .modal-btn {
      display: flex; align-items: center; justify-content: center; gap: 0.45rem;
      padding: 0.85rem 1.5rem; border-radius: 50px; border: none; cursor: pointer;
      font-size: 1rem; font-weight: 800; font-family: var(--font-main); transition: all 0.2s;
      width: 100%;
    }
    .modal-btn.primary { background: var(--accent-cyan); color: #0f172a; box-shadow: 0 6px 20px rgba(6,182,212,0.4); }
    .modal-btn.primary:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(6,182,212,0.6); }
    .modal-btn.secondary { background: rgba(255,255,255,0.07); border: 1px solid var(--glass-border); color: var(--text-muted); }
    .modal-btn.secondary:hover { background: rgba(255,255,255,0.14); color: var(--text-main); }

    /* ── FOOTER ── */
    footer {
      position: relative; z-index: 10;
      text-align: center; padding: 1.2rem 1rem 1.6rem;
      font-size: 0.75rem; color: var(--text-muted); border-top: 1px solid var(--glass-border);
    }
    footer a { color: var(--text-muted); text-decoration: underline; }
    footer a:hover { color: var(--accent-cyan); }

    /* ── RESPONSIVE ── */
    @media (max-width: 680px) {
      main { padding: 0.6rem 0.5rem; gap: 0.5rem; }
      .game-stage { flex-direction: column; }
      .rle-panel { min-width: 100%; max-width: 100%; max-height: 38vh; flex: none; }
      .board-wrap { width: 100%; }
      .grid-container { max-width: min(380px, 94vw); }
      .bar-title { display: none; }
      .top-bar { padding: 0.45rem 0.65rem; gap: 0.4rem; }
    }
    @media (max-width: 420px) {
      .rle-panel { max-height: 32vh; }
      .action-btn span.label-text { display: none; }
    }
  </style>
</head>
<body>
  <!-- Animated BG -->
  <div class="bg-mesh">
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
  </div>
  <canvas id="fx-canvas"></canvas>

  <!-- ── HEADER ── -->
  <header>
    <a href="../../../index.html" class="logo" title="กลับหน้าแรก">🎨 CYBER LOGIC</a>
    <div class="header-controls">
      <button class="btn-icon lang-btn" id="btn-lang" title="เปลี่ยนภาษา / Change Language">TH</button>
      <button class="btn-icon" id="btn-sound" title="เปิด/ปิดเสียง">🔊</button>
      <button class="btn-icon" id="btn-theme" title="เปลี่ยนธีม">🌙</button>
    </div>
  </header>

  <!-- ── MAIN ── -->
  <main>

    <!-- TOP BAR: Back + Title + Check + Reset -->
    <div class="top-bar">
      <div class="bar-left">
        <a href="../index.html" class="btn-back" id="btn-back">← <span data-i18n="back">กลับ</span></a>
        <span class="bar-title">🎨 Pixel Art Coding</span>
      </div>
      <div class="bar-right">
        <button class="action-btn btn-check-ans" id="btn-check">✨ <span class="label-text" data-i18n="check">ตรวจคำตอบ</span></button>
        <button class="action-btn btn-reset-brd" id="btn-clear">🗑 <span class="label-text" data-i18n="clear">ล้างกระดาน</span></button>
      </div>
    </div>

    <!-- STEPPER BAR: Level X/10 + Difficulty Pill + Puzzle Name + Prev/Next -->
    <div class="stepper-wrap">
      <div class="diff-counter">
        <span class="diff-icon">🖼</span>
        <span class="diff-label" data-i18n="level">ระดับ</span>
        <span class="diff-val" id="diff-val">1 / 10</span>
        <span class="diff-pill" id="diff-pill">Easy</span>
        <span class="puzzle-name-tag" id="puzzle-name"></span>
      </div>
      <div class="stepper-nav">
        <button class="nav-btn" id="btn-prev" title="ระดับก่อนหน้า" disabled>‹</button>
        <button class="nav-btn" id="btn-next" title="ระดับถัดไป">›</button>
      </div>
    </div>

    <!-- INSTRUCTION BOX -->
    <div class="instruction-box" id="instruction-box">
      <strong data-i18n="howto_title">วิธีเล่น:</strong>
      <span data-i18n="howto_body">ดูรหัส RLE แต่ละแถว แล้วคลิก/ลากบนกริดเพื่อระบายสีช่องที่ต้องการ เมื่อระบายครบ กดตรวจคำตอบ!</span>
    </div>

    <!-- GAME STAGE -->
    <div class="game-stage">
      <!-- RLE Instructions Panel -->
      <div class="rle-panel">
        <div class="rle-panel-title">📜 <span data-i18n="instructions">คำสั่ง (RLE)</span></div>
        <div class="rle-list" id="rle-list"></div>
      </div>

      <!-- Pixel Grid Board -->
      <div class="board-wrap">
        <div class="grid-container" id="grid-container"></div>
      </div>
    </div>

  </main>

  <!-- ── SUCCESS MODAL ── -->
  <div class="modal hidden" id="success-modal">
    <div class="modal-box">
      <h2 id="modal-title">🎉</h2>
      <p id="modal-message"></p>
      <div class="modal-actions">
        <button class="modal-btn primary" id="btn-next-level">➡️ <span data-i18n="next_level">ไปด่านต่อไป</span></button>
        <button class="modal-btn secondary" id="btn-close-modal" data-i18n="replay">เล่นด่านเดิมอีกครั้ง</button>
      </div>
    </div>
  </div>

  <!-- ── FOOTER ── -->
  <footer>
    <p>© 2026 <a href="../../../index.html">ดร.อภิสิทธิ์ ธงไชย</a> · Dr. Apisit Thongchai · สื่อการเรียนรู้เชิงปฏิสัมพันธ์</p>
    <p style="margin-top:4px"><a href="../../../index.html">หน้าแรก</a> · <a href="../../../about.html">เกี่ยวกับผู้จัดทำ</a> · <a href="../../../sitemap.html">แผนผังเว็บไซต์</a></p>
  </footer>

<script>
// ════════════════════════════════════════════════
// i18n Dictionary
// ════════════════════════════════════════════════
const i18n = {
  th: {
    back: 'กลับ',
    level: 'ระดับ',
    check: 'ตรวจคำตอบ',
    clear: 'ล้างกระดาน',
    instructions: 'คำสั่ง (RLE)',
    howto_title: 'วิธีเล่น:',
    howto_body: 'ดูรหัส RLE แต่ละแถว แล้วคลิก/ลากบนกริดเพื่อระบายสีช่องที่ต้องการ เมื่อระบายครบ กดตรวจคำตอบ!',
    row_label: 'แถว',
    next_level: 'ไปด่านต่อไป',
    restart: 'เริ่มเล่นใหม่ตั้งแต่ด่าน 1',
    replay: 'เล่นด่านเดิมอีกครั้ง',
    correct_title: '🎉 ยอดเยี่ยม!',
    correct_msg: 'นี่คือ',
    final_title: '🏆 ยินดีด้วย!',
    final_msg: 'คุณผ่านครบทั้ง 10 ด่านแล้ว! ภาพสุดท้ายคือ',
    diff_easy: 'ง่าย',
    diff_medium: 'ปานกลาง',
    diff_hard: 'ยาก',
  },
  en: {
    back: 'Back',
    level: 'Level',
    check: 'Check Answer',
    clear: 'Clear Board',
    instructions: 'Instructions (RLE)',
    howto_title: 'How to play:',
    howto_body: 'Read the RLE code for each row, then click/drag on the grid to fill cells. When done, press Check Answer!',
    row_label: 'Row',
    next_level: 'Next Level',
    restart: 'Restart from Level 1',
    replay: 'Play this level again',
    correct_title: '🎉 Excellent!',
    correct_msg: 'That was',
    final_title: '🏆 Congratulations!',
    final_msg: 'You completed all 10 levels! The last image was',
    diff_easy: 'Easy',
    diff_medium: 'Medium',
    diff_hard: 'Hard',
  }
};
let lang = localStorage.getItem('cyber_logic_lang') || 'th';

function applyLang() {
  document.documentElement.lang = lang;
  document.getElementById('btn-lang').textContent = lang === 'th' ? 'EN' : 'TH';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (i18n[lang][key]) el.textContent = i18n[lang][key];
  });
  // Regenerate instructions (row labels change language)
  if (currentPuzzle) generateInstructions();
}

// ════════════════════════════════════════════════
// Audio System
// ════════════════════════════════════════════════
const AudioSys = {
  ctx: null, enabled: true,
  init() {
    if (this.ctx) { if (this.ctx.state === 'suspended') this.ctx.resume(); return; }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (AC) this.ctx = new AC();
  },
  play(type) {
    if (!this.enabled || !this.ctx || this.ctx.state !== 'running') return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    const note = (freq, start, dur, wave = 'sine', vol = 0.18) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = wave;
      o.frequency.setValueAtTime(freq, t + start);
      g.gain.setValueAtTime(0, t + start);
      g.gain.linearRampToValueAtTime(vol, t + start + 0.015);
      g.gain.exponentialRampToValueAtTime(0.001, t + start + dur);
      o.connect(g); g.connect(ctx.destination);
      o.start(t + start); o.stop(t + start + dur);
    };
    if (type === 'fill')   note(600, 0, 0.08);
    if (type === 'erase')  note(320, 0, 0.08);
    if (type === 'wrong') {
      note(220, 0, 0.12, 'sawtooth', 0.15);
      note(180, 0.1, 0.18, 'sawtooth', 0.12);
    }
    if (type === 'success') {
      note(261.63, 0, 0.15);
      note(329.63, 0.14, 0.15);
      note(392.00, 0.28, 0.15);
      note(523.25, 0.42, 0.4, 'sine', 0.25);
    }
    if (type === 'fanfare') {
      ['square','square','square','square'].forEach((w,i) => {
        [392,392,392,523.25].forEach((f, j) => {
          if (i === j) note(f, j * 0.2, 0.22, w, 0.18);
        });
      });
      // applause noise
      const bufSize = ctx.sampleRate * 2.5;
      const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
      const ns = ctx.createBufferSource(); ns.buffer = buf;
      const flt = ctx.createBiquadFilter(); flt.type = 'lowpass'; flt.frequency.value = 1000;
      const ng = ctx.createGain();
      ng.gain.setValueAtTime(0, t + 0.5);
      ng.gain.linearRampToValueAtTime(0.22, t + 0.7);
      ng.gain.exponentialRampToValueAtTime(0.01, t + 3.0);
      ns.connect(flt); flt.connect(ng); ng.connect(ctx.destination);
      ns.start(t + 0.5);
    }
  }
};

// ════════════════════════════════════════════════
// Level Data — 0=white/empty  1=filled/black
// ════════════════════════════════════════════════
const levels = {
  1: { size: 5, puzzles: [
    { name: "รูปหัวใจ ❤️",   target: [[0,1,0,1,0],[1,1,1,1,1],[1,1,1,1,1],[0,1,1,1,0],[0,0,1,0,0]] },
    { name: "รูปเรือใบ ⛵",  target: [[0,0,1,0,0],[0,1,1,0,0],[1,1,1,0,0],[1,1,1,1,1],[0,1,1,1,0]] },
    { name: "รูปแอปเปิ้ล 🍎",target: [[0,0,1,0,0],[0,1,1,1,0],[1,1,1,1,1],[1,1,1,1,1],[0,1,1,1,0]] }
  ]},
  2: { size: 5, puzzles: [
    { name: "รูปน้องหมา 🐶", target: [[0,1,1,0,0],[1,1,1,1,0],[0,1,1,1,1],[0,1,1,1,0],[1,1,0,1,1]] },
    { name: "รูปบ้าน 🏠",    target: [[0,0,1,0,0],[0,1,1,1,0],[1,1,1,1,1],[0,1,1,1,0],[0,1,0,1,0]] },
    { name: "เอเลี่ยน 👾",   target: [[1,0,1,0,1],[0,1,1,1,0],[1,1,1,1,1],[1,0,1,0,1],[1,0,0,0,1]] }
  ]},
  3: { size: 8, puzzles: [
    { name: "รูปต้นไม้ 🌳",  target: [[0,0,0,1,1,0,0,0],[0,0,1,1,1,1,0,0],[0,1,1,1,1,1,1,0],[1,1,1,1,1,1,1,1],[0,1,1,1,1,1,1,0],[0,0,0,1,1,0,0,0],[0,0,0,1,1,0,0,0],[0,0,0,1,1,0,0,0]] },
    { name: "รูปเห็ด 🍄",    target: [[0,0,1,1,1,1,0,0],[0,1,1,1,1,1,1,0],[1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1],[0,0,1,1,1,1,0,0],[0,0,1,1,1,1,0,0],[0,0,1,1,1,1,0,0],[0,0,0,0,0,0,0,0]] },
    { name: "ดาบอัศวิน 🗡️", target: [[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,1,1],[0,0,0,0,0,1,1,0],[0,0,0,0,1,1,0,0],[0,0,1,1,1,0,0,0],[0,1,1,1,0,0,0,0],[0,1,0,0,0,0,0,0],[1,0,0,0,0,0,0,0]] }
  ]},
  4: { size: 8, puzzles: [
    { name: "รูปหน้ายิ้ม 😃", target: [[0,0,1,1,1,1,0,0],[0,1,0,0,0,0,1,0],[1,0,1,0,0,1,0,1],[1,0,0,0,0,0,0,1],[1,0,1,0,0,1,0,1],[1,0,0,1,1,0,0,1],[0,1,0,0,0,0,1,0],[0,0,1,1,1,1,0,0]] },
    { name: "ผีน้อย 👻",     target: [[0,0,1,1,1,1,0,0],[0,1,1,1,1,1,1,0],[1,1,0,1,1,0,1,1],[1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1],[1,0,1,1,1,1,0,1],[1,0,0,1,1,0,0,1]] }
  ]},
  5: { size: 10, puzzles: [
    { name: "รูปจรวด 🚀",   target: [[0,0,0,0,1,1,0,0,0,0],[0,0,0,1,1,1,1,0,0,0],[0,0,0,1,1,1,1,0,0,0],[0,0,1,1,0,0,1,1,0,0],[0,0,1,1,0,0,1,1,0,0],[0,0,1,1,1,1,1,1,0,0],[0,1,1,1,1,1,1,1,1,0],[1,1,0,1,1,1,1,0,1,1],[1,0,0,1,0,0,1,0,0,1],[0,0,0,1,0,0,1,0,0,0]] },
    { name: "รูปเรือรบ 🚢", target: [[0,0,0,0,0,1,0,0,0,0],[0,0,0,0,0,1,0,0,0,0],[0,0,0,0,1,1,1,0,0,0],[0,0,0,1,1,1,1,0,0,0],[0,0,1,1,1,1,1,0,0,0],[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1],[0,1,1,1,1,1,1,1,1,0],[0,0,1,1,1,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0]] }
  ]},
  6: { size: 10, puzzles: [
    { name: "หุ่นยนต์ 🤖",  target: [[0,0,1,1,1,1,1,1,0,0],[0,1,0,1,1,1,1,0,1,0],[0,1,1,1,1,1,1,1,1,0],[0,1,0,0,0,0,0,0,1,0],[0,1,1,1,1,1,1,1,1,0],[0,0,1,1,1,1,1,1,0,0],[0,0,0,1,1,1,1,0,0,0],[0,1,1,1,1,1,1,1,1,0],[0,1,0,1,1,1,1,0,1,0],[0,1,0,1,1,1,1,0,1,0]] },
    { name: "จอยเกม 🎮",   target: [[0,0,0,0,0,0,0,0,0,0],[0,0,1,1,1,1,1,1,0,0],[0,1,1,1,1,1,1,1,1,0],[1,1,1,1,1,1,1,1,1,1],[1,1,0,1,1,1,1,0,1,1],[1,1,1,1,1,1,1,1,1,1],[1,1,1,0,0,0,0,1,1,1],[0,1,1,0,0,0,0,1,1,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]] }
  ]},
  7: { size: 10, puzzles: [
    { name: "ดอกไม้ 🌸",    target: [[0,0,0,1,1,1,0,0,0,0],[0,0,1,1,1,1,1,0,0,0],[0,1,1,0,0,0,1,1,0,0],[0,1,1,0,0,0,1,1,0,0],[0,1,1,0,0,0,1,1,0,0],[0,0,1,1,1,1,1,0,0,0],[0,0,0,1,1,1,0,0,0,0],[0,0,0,0,1,0,0,0,0,0],[0,0,0,1,1,0,0,0,0,0],[0,0,0,0,1,0,0,0,0,0]] },
    { name: "พระอาทิตย์ ☀️",target: [[0,0,1,0,0,0,1,0,0,0],[0,0,0,1,0,1,0,0,0,0],[1,0,0,0,1,0,0,0,1,0],[0,1,0,1,1,1,0,1,0,0],[0,0,1,1,1,1,1,0,0,0],[0,1,0,1,1,1,0,1,0,0],[1,0,0,0,1,0,0,0,1,0],[0,0,0,1,0,1,0,0,0,0],[0,0,1,0,0,0,1,0,0,0],[0,0,0,0,0,0,0,0,0,0]] }
  ]},
  8: { size: 10, puzzles: [
    { name: "น้องแมว 🐱",   target: [[1,1,0,0,0,0,0,1,1,0],[1,1,1,0,0,0,1,1,1,0],[1,1,1,1,1,1,1,1,1,0],[1,1,0,1,1,1,0,1,1,0],[1,1,1,1,1,1,1,1,1,0],[1,1,1,0,0,0,1,1,1,0],[0,1,1,1,1,1,1,1,0,0],[0,0,1,1,1,1,1,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]] },
    { name: "ปลาปักเป้า 🐡",target: [[0,0,0,1,0,1,0,0,0,0],[0,0,1,1,1,1,1,0,0,0],[0,1,1,1,1,1,1,1,0,0],[1,1,0,1,1,1,1,1,1,0],[0,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,0],[0,1,1,1,1,1,1,1,0,0],[0,0,1,1,1,1,1,0,0,0],[0,0,0,1,0,1,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]] }
  ]},
  9: { size: 10, puzzles: [
    { name: "โล่ป้องกัน 🛡️", target: [[0,1,1,1,1,1,1,1,1,0],[1,1,1,1,1,1,1,1,1,1],[1,1,0,0,1,1,0,0,1,1],[1,1,0,0,1,1,0,0,1,1],[1,1,1,1,1,1,1,1,1,1],[0,1,1,1,1,1,1,1,1,0],[0,0,1,1,0,0,1,1,0,0],[0,0,0,1,1,1,1,0,0,0],[0,0,0,0,1,1,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]] },
    { name: "ถ้วยรางวัล 🏆",  target: [[0,1,1,1,1,1,1,1,1,0],[1,1,1,1,1,1,1,1,1,1],[1,0,1,1,1,1,1,1,0,1],[1,1,1,1,1,1,1,1,1,1],[0,1,1,1,1,1,1,1,1,0],[0,0,0,1,1,1,1,0,0,0],[0,0,0,0,1,1,0,0,0,0],[0,0,0,0,1,1,0,0,0,0],[0,0,1,1,1,1,1,1,0,0],[0,1,1,1,1,1,1,1,1,0]] }
  ]},
  10: { size: 10, puzzles: [
    { name: "เพชรเม็ดงาม 💎", target: [[0,0,1,1,1,1,1,1,0,0],[0,1,1,1,1,1,1,1,1,0],[1,1,0,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1],[0,1,1,1,1,1,1,1,1,0],[0,0,1,1,1,1,1,1,0,0],[0,0,0,1,1,1,1,0,0,0],[0,0,0,0,1,1,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]] },
    { name: "มงกุฎราชา 👑",   target: [[1,0,0,0,1,1,0,0,0,1],[1,1,0,0,1,1,0,0,1,1],[1,1,1,0,1,1,0,1,1,1],[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1],[0,1,1,1,1,1,1,1,1,0],[0,1,1,1,1,1,1,1,1,0],[0,0,1,1,1,1,1,1,0,0],[0,0,0,1,1,1,1,0,0,0],[0,0,0,0,0,0,0,0,0,0]] }
  ]}
};

const TOTAL_LEVELS = Object.keys(levels).length;
const DIFF_MAP = {
  1:'easy',2:'easy',3:'medium',4:'medium',5:'medium',
  6:'hard',7:'hard',8:'hard',9:'hard',10:'hard'
};

// ════════════════════════════════════════════════
// Game State
// ════════════════════════════════════════════════
let currentLevel = 1;
let currentPuzzle = null;
let currentGrid   = [];
let gridSize      = 5;
let isDrawing     = false;
let paintMode     = 1;

// DOM refs
const gridContainer  = document.getElementById('grid-container');
const rleList        = document.getElementById('rle-list');
const btnCheck       = document.getElementById('btn-check');
const btnClear       = document.getElementById('btn-clear');
const diffVal        = document.getElementById('diff-val');
const diffPill       = document.getElementById('diff-pill');
const puzzleName     = document.getElementById('puzzle-name');
const btnPrev        = document.getElementById('btn-prev');
const btnNext        = document.getElementById('btn-next');
const successModal   = document.getElementById('success-modal');
const modalTitle     = document.getElementById('modal-title');
const modalMessage   = document.getElementById('modal-message');
const btnNextLevel   = document.getElementById('btn-next-level');
const btnCloseModal  = document.getElementById('btn-close-modal');

// ════════════════════════════════════════════════
// Load Level
// ════════════════════════════════════════════════
function loadLevel(num) {
  currentLevel = num;
  const data = levels[num];
  gridSize = data.size;
  const idx = Math.floor(Math.random() * data.puzzles.length);
  currentPuzzle = data.puzzles[idx];
  currentGrid = Array.from({length: gridSize}, () => Array(gridSize).fill(0));
  successModal.classList.add('hidden');

  // Update stepper
  diffVal.textContent = `${num} / ${TOTAL_LEVELS}`;
  const diff = DIFF_MAP[num];
  const diffKey = diff === 'easy' ? 'diff_easy' : diff === 'medium' ? 'diff_medium' : 'diff_hard';
  diffPill.textContent = i18n[lang][diffKey];
  diffPill.className = 'diff-pill' + (diff === 'medium' ? ' diff-medium' : diff === 'hard' ? ' diff-hard' : '');
  puzzleName.textContent = currentPuzzle.name;
  btnPrev.disabled = (num <= 1);
  btnNext.disabled = (num >= TOTAL_LEVELS);

  renderGrid();
  generateInstructions();
}

// ════════════════════════════════════════════════
// Render Grid
// ════════════════════════════════════════════════
function renderGrid() {
  gridContainer.style.gridTemplateColumns = `auto repeat(${gridSize}, 1fr)`;
  gridContainer.innerHTML = '';

  for (let r = 0; r < gridSize; r++) {
    const rowLabel = document.createElement('div');
    rowLabel.className = 'grid-row-label';
    rowLabel.textContent = r + 1;
    gridContainer.appendChild(rowLabel);

    for (let c = 0; c < gridSize; c++) {
      const cell = document.createElement('div');
      cell.className = 'grid-cell';
      cell.dataset.row = r;
      cell.dataset.col = c;

      cell.addEventListener('mousedown', e => { AudioSys.init(); handleDrawStart(e.target); });
      cell.addEventListener('mouseenter', e => handleDrawMove(e.target));
      cell.addEventListener('touchstart', e => {
        e.preventDefault();
        AudioSys.init();
        handleDrawStart(e.target);
      }, { passive: false });

      gridContainer.appendChild(cell);
    }
  }
}

// ════════════════════════════════════════════════
// Draw Handlers
// ════════════════════════════════════════════════
function handleDrawStart(cell) {
  isDrawing = true;
  const r = +cell.dataset.row, c = +cell.dataset.col;
  paintMode = currentGrid[r][c] === 0 ? 1 : 0;
  applyPaint(cell, r, c);
}
function handleDrawMove(cell) {
  if (!isDrawing) return;
  const r = +cell.dataset.row, c = +cell.dataset.col;
  applyPaint(cell, r, c);
}
function applyPaint(cell, r, c) {
  if (currentGrid[r][c] !== paintMode) {
    currentGrid[r][c] = paintMode;
    if (paintMode === 1) { cell.classList.add('filled'); AudioSys.play('fill'); }
    else { cell.classList.remove('filled'); AudioSys.play('erase'); }
  }
}

document.addEventListener('mouseup',   () => { isDrawing = false; });
document.addEventListener('touchend',  () => { isDrawing = false; });

gridContainer.addEventListener('touchmove', e => {
  if (!isDrawing) return;
  e.preventDefault();
  const touch = e.touches[0];
  const el = document.elementFromPoint(touch.clientX, touch.clientY);
  if (el && el.classList.contains('grid-cell')) handleDrawMove(el);
}, { passive: false });

// ════════════════════════════════════════════════
// Generate RLE Instructions
// ════════════════════════════════════════════════
function generateInstructions() {
  rleList.innerHTML = '';
  const target = currentPuzzle.target;
  const rowLabel = i18n[lang].row_label;

  for (let r = 0; r < gridSize; r++) {
    const row = target[r];
    const runs = [];
    let count = 1, color = row[0];
    for (let c = 1; c < gridSize; c++) {
      if (row[c] === color) count++;
      else { runs.push({color, count}); color = row[c]; count = 1; }
    }
    runs.push({color, count});

    const rowEl = document.createElement('div');
    rowEl.className = 'rle-row';

    const lbl = document.createElement('span');
    lbl.className = 'rle-row-label';
    lbl.textContent = `${rowLabel} ${r+1}:`;
    rowEl.appendChild(lbl);

    const blocks = document.createElement('div');
    blocks.className = 'rle-blocks';
    runs.forEach(run => {
      const b = document.createElement('div');
      b.className = 'rle-block ' + (run.color === 1 ? 'blk-filled' : 'blk-white');
      b.textContent = run.count;
      blocks.appendChild(b);
    });
    rowEl.appendChild(blocks);
    rleList.appendChild(rowEl);
  }
}

// ════════════════════════════════════════════════
// Check Answer
// ════════════════════════════════════════════════
function checkAnswer() {
  const target = currentPuzzle.target;
  let ok = true;
  outer: for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      if (currentGrid[r][c] !== target[r][c]) { ok = false; break outer; }
    }
  }
  if (ok) celebrate();
  else {
    AudioSys.play('wrong');
    gridContainer.animate([
      {transform:'translateX(0)'},{transform:'translateX(-8px)'},
      {transform:'translateX(8px)'},{transform:'translateX(-8px)'},
      {transform:'translateX(0)'}
    ], {duration: 350, iterations: 1});
  }
}

function clearBoard() {
  currentGrid = Array.from({length: gridSize}, () => Array(gridSize).fill(0));
  document.querySelectorAll('.grid-cell').forEach(c => c.classList.remove('filled'));
}

// ════════════════════════════════════════════════
// Celebrate + Confetti (CSS particles)
// ════════════════════════════════════════════════
function celebrate() {
  const isLast = !levels[currentLevel + 1];
  if (isLast) AudioSys.play('fanfare'); else AudioSys.play('success');
  triggerConfetti();

  setTimeout(() => {
    const t = i18n[lang];
    if (!isLast) {
      modalTitle.innerHTML   = t.correct_title;
      modalMessage.innerHTML = `${t.correct_msg} <strong>${currentPuzzle.name}</strong>`;
      btnNextLevel.innerHTML = `➡️ ${t.next_level}`;
      btnNextLevel.dataset.action = '';
    } else {
      modalTitle.innerHTML   = t.final_title;
      modalMessage.innerHTML = `${t.final_msg} <strong>${currentPuzzle.name}</strong>`;
      btnNextLevel.innerHTML = `🔄 ${t.restart}`;
      btnNextLevel.dataset.action = 'restart';
    }
    btnCloseModal.textContent = t.replay;
    successModal.classList.remove('hidden');
  }, 1200);
}

// CSS-canvas confetti (no external library needed)
function triggerConfetti() {
  const canvas = document.getElementById('fx-canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');
  const pieces = Array.from({length: 120}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height * 0.4 - canvas.height * 0.1,
    vx: (Math.random() - 0.5) * 6,
    vy: Math.random() * 3 + 2,
    color: ['#06b6d4','#8b5cf6','#f59e0b','#10b981','#ec4899','#3b82f6'][Math.floor(Math.random()*6)],
    size: Math.random() * 8 + 4,
    rotation: Math.random() * 360,
    spin: (Math.random() - 0.5) * 8
  }));
  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation * Math.PI / 180);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(0, 1 - frame / 90);
      ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size * 0.5);
      ctx.restore();
      p.x += p.vx; p.y += p.vy; p.vy += 0.12; p.rotation += p.spin;
    });
    frame++;
    if (frame < 90) requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  draw();
}

// ════════════════════════════════════════════════
// Events
// ════════════════════════════════════════════════
btnCheck.addEventListener('click', checkAnswer);
btnClear.addEventListener('click', clearBoard);

btnPrev.addEventListener('click', () => {
  if (currentLevel > 1) loadLevel(currentLevel - 1);
});
btnNext.addEventListener('click', () => {
  if (levels[currentLevel + 1]) loadLevel(currentLevel + 1);
});

btnNextLevel.addEventListener('click', () => {
  successModal.classList.add('hidden');
  if (btnNextLevel.dataset.action === 'restart') loadLevel(1);
  else if (levels[currentLevel + 1]) loadLevel(currentLevel + 1);
});
btnCloseModal.addEventListener('click', () => {
  successModal.classList.add('hidden');
  clearBoard();
});

// Lang toggle
document.getElementById('btn-lang').addEventListener('click', () => {
  lang = lang === 'th' ? 'en' : 'th';
  localStorage.setItem('cyber_logic_lang', lang);
  applyLang();
});

// Sound toggle
let soundOn = true;
document.getElementById('btn-sound').addEventListener('click', () => {
  soundOn = !soundOn;
  AudioSys.enabled = soundOn;
  document.getElementById('btn-sound').textContent = soundOn ? '🔊' : '🔇';
});

// Theme toggle
let darkMode = true;
document.getElementById('btn-theme').addEventListener('click', () => {
  darkMode = !darkMode;
  document.body.classList.toggle('light-theme', !darkMode);
  document.getElementById('btn-theme').textContent = darkMode ? '🌙' : '☀️';
});

// Keyboard
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight' || e.key === ']') { if (levels[currentLevel+1]) loadLevel(currentLevel+1); }
  if (e.key === 'ArrowLeft'  || e.key === '[') { if (currentLevel > 1) loadLevel(currentLevel-1); }
  if (e.key === 'Enter') checkAnswer();
  if (e.key === 'r' || e.key === 'R') clearBoard();
});

// ════════════════════════════════════════════════
// INIT
// ════════════════════════════════════════════════
function init() {
  applyLang();
  loadLevel(1);
}
document.addEventListener('DOMContentLoaded', init);
</script>
</body>
</html>'''

# Write output
out_path = os.path.join(
    os.path.dirname(__file__), '..', 'projects', 'puzzle-collection', 'pixel-art', 'index.html'
)
out_path = os.path.normpath(out_path)
with open(out_path, 'w', encoding='utf-8') as f:
    f.write(html_content)

print(f"✅ Written: {out_path}")
print(f"   Size: {len(html_content):,} bytes")
