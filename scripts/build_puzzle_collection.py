# -*- coding: utf-8 -*-
"""
Builder script for CYBER LOGIC platform (projects/puzzle-collection/index.html)
Upgrades screen ergonomics, responsive layout, unified game HUD, mobile-first touch UX,
real-time binary calculators, Sudoku number highlights, and category filter tabs.
Strictly adheres to Author Branding Rules (Dr. Apisit Thongchai / ดร.อภิสิทธิ์ ธงไชย).
"""

import os

HTML_CONTENT = '''<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
    <meta name="description" content="CYBER LOGIC - แพลตฟอร์มเกมปริศนาตรรกะและวิทยาการคำนวณ 6 สไตล์ (Sudoku, Takuzu, Nonogram, Code Path, Binary, Logic Gates) 10 ระดับความยาก โดย ดร.อภิสิทธิ์ ธงไชย">
    <meta name="author" content="ดร.อภิสิทธิ์ ธงไชย">
    <meta name="keywords" content="Cyber Logic, Sudoku, Takuzu, Nonogram, Picross, Code Path, Binary Decoder, Logic Gate, วิทยาการคำนวณ, เกมตรรกะ, ดร.อภิสิทธิ์ ธงไชย">
    <title>CYBER LOGIC - ศูนย์รวมเกมตรรกะและวิทยาการคำนวณ โดย ดร.อภิสิทธิ์ ธงไชย</title>

    <!-- Open Graph / Social Sharing -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="CYBER LOGIC - เกมปริศนาตรรกะและวิทยาการคำนวณ">
    <meta property="og:description" content="ฝึกการคิดเชิงคำนวณและตรรกศาสตร์ผ่าน 6 เกมปริศนาสุดท้าทาย 10 ระดับความยาก โดย ดร.อภิสิทธิ์ ธงไชย">
    <meta property="og:url" content="https://apisit-man.github.io/projects/puzzle-collection/index.html">

    <!-- Schema.org JSON-LD -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "CYBER LOGIC - AAA Brain Puzzle Platform",
      "url": "https://apisit-man.github.io/projects/puzzle-collection/index.html",
      "description": "แพลตฟอร์มเกมปริศนาตรรกะและวิทยาการคำนวณ 6 สไตล์ พร้อมระดับความยาก 10 ด่าน โดย ดร.อภิสิทธิ์ ธงไชย",
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
            --glass-bg: rgba(30, 41, 59, 0.75);
            --glass-border: rgba(255, 255, 255, 0.12);
            --text-main: #f8fafc;
            --text-muted: #94a3b8;
            --accent-cyan: #06b6d4;
            --accent-purple: #8b5cf6;
            --accent-pink: #ec4899;
            --accent-green: #10b981;
            --accent-yellow: #f59e0b;
            --accent-red: #ef4444;
            --shadow-lg: 0 10px 25px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3);
            --font-main: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Prompt', sans-serif;
            
            /* Responsive Cell Defaults */
            --sudoku-cell-size: 54px;
            --takuzu-cell-size: 60px;
            --nono-cell-size: 44px;
            --codepath-cell-size: 56px;
            --bin-cell-size: 64px;
        }

        body.light-theme {
            --bg-primary: #f1f5f9;
            --bg-secondary: #e2e8f0;
            --glass-bg: rgba(255, 255, 255, 0.88);
            --glass-border: rgba(0, 0, 0, 0.1);
            --text-main: #0f172a;
            --text-muted: #64748b;
            --shadow-lg: 0 10px 25px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04);
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            user-select: none;
            -webkit-user-select: none;
        }

        body {
            font-family: var(--font-main);
            background: var(--bg-primary);
            color: var(--text-main);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            overflow-x: hidden;
            transition: background 0.3s ease, color 0.3s ease;
            position: relative;
            touch-action: manipulation;
        }

        /* Background Animated Mesh */
        .bg-mesh {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: 0;
            overflow: hidden;
            pointer-events: none;
        }
        .orb {
            position: absolute;
            border-radius: 50%;
            filter: blur(80px);
            opacity: 0.35;
            animation: float 20s infinite alternate ease-in-out;
        }
        .orb-1 { top: -10%; left: -10%; width: 50vw; height: 50vw; background: var(--accent-purple); }
        .orb-2 { bottom: -10%; right: -10%; width: 45vw; height: 45vw; background: var(--accent-cyan); animation-duration: 25s; }
        .orb-3 { top: 40%; left: 30%; width: 35vw; height: 35vw; background: var(--accent-pink); animation-duration: 18s; }

        @keyframes float {
            0% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(8%, 12%) scale(1.08); }
            100% { transform: translate(-6%, 8%) scale(0.96); }
        }

        /* Canvas Overlay for FX */
        #fx-canvas {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1000;
            pointer-events: none;
        }

        /* Header */
        header {
            position: relative;
            z-index: 20;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.65rem 1.25rem;
            background: var(--glass-bg);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border-bottom: 1px solid var(--glass-border);
        }
        .logo {
            font-size: 1.3rem;
            font-weight: 900;
            letter-spacing: 1.2px;
            background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple), var(--accent-pink));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            cursor: pointer;
        }
        .header-controls {
            display: flex;
            gap: 0.45rem;
            align-items: center;
        }
        .btn-header {
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
            color: var(--text-main);
            padding: 0.42rem 0.8rem;
            border-radius: 12px;
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            cursor: pointer;
            font-size: 0.86rem;
            font-weight: 600;
            transition: all 0.2s ease;
            box-shadow: var(--shadow-lg);
            text-decoration: none;
        }
        .btn-header:hover {
            transform: translateY(-2px);
            border-color: var(--accent-cyan);
            box-shadow: 0 0 12px rgba(6, 182, 212, 0.35);
        }
        .btn-icon {
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
            color: var(--text-main);
            width: 36px;
            height: 36px;
            border-radius: 11px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 1rem;
            transition: all 0.2s ease;
            box-shadow: var(--shadow-lg);
        }
        .btn-icon:hover {
            transform: translateY(-2px);
            border-color: var(--accent-cyan);
            box-shadow: 0 0 12px rgba(6, 182, 212, 0.4);
        }
        .btn-icon:active, .btn-header:active { transform: scale(0.96); }

        /* Main Container */
        main {
            position: relative;
            z-index: 10;
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            padding: 0.85rem 0.75rem;
            max-width: 1200px;
            margin: 0 auto;
            width: 100%;
        }

        /* View Sections */
        .view {
            display: none;
            width: 100%;
            animation: fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .view.active {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* ========================================================
           HOME VIEW (HUB OF PUZZLES)
           ======================================================== */
        .hero-title {
            font-size: 2.1rem;
            font-weight: 900;
            text-align: center;
            margin-top: 0.5rem;
            margin-bottom: 0.35rem;
            background: linear-gradient(to right, #fff, var(--text-muted));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        body.light-theme .hero-title {
            background: linear-gradient(to right, #0f172a, #475569);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .hero-subtitle {
            color: var(--text-muted);
            font-size: 0.98rem;
            text-align: center;
            margin-bottom: 1.25rem;
            max-width: 660px;
            line-height: 1.5;
        }

        /* Filter Tabs */
        .filter-tabs {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 1.25rem;
            flex-wrap: wrap;
            justify-content: center;
        }
        .filter-tab {
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
            color: var(--text-muted);
            padding: 0.45rem 1rem;
            border-radius: 20px;
            font-size: 0.88rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .filter-tab.active, .filter-tab:hover {
            color: #fff;
            background: var(--accent-cyan);
            border-color: var(--accent-cyan);
            box-shadow: 0 0 12px rgba(6, 182, 212, 0.4);
            transform: translateY(-2px);
        }

        .section-heading {
            font-size: 1.2rem;
            font-weight: 800;
            color: var(--text-main);
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            margin-top: 1.25rem;
            margin-bottom: 1rem;
            background: var(--glass-bg);
            padding: 0.4rem 0.95rem;
            border-radius: 12px;
            border: 1px solid var(--glass-border);
            width: fit-content;
        }

        .game-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1.15rem;
            width: 100%;
            max-width: 1080px;
            margin-bottom: 1.5rem;
        }

        .game-card {
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
            border-radius: 20px;
            padding: 1.4rem 1.3rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            cursor: pointer;
            transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            position: relative;
            overflow: hidden;
            backdrop-filter: blur(14px);
            box-shadow: var(--shadow-lg);
        }
        .game-card:hover {
            transform: translateY(-6px) scale(1.02);
            border-color: var(--accent);
            box-shadow: 0 14px 26px -8px var(--accent-glow);
        }
        .game-card:active { transform: scale(0.98); }

        .card-icon {
            font-size: 3rem;
            margin-bottom: 0.85rem;
            filter: drop-shadow(0 6px 10px rgba(0,0,0,0.3));
            transition: transform 0.25s ease;
        }
        .game-card:hover .card-icon {
            transform: scale(1.12) rotate(4deg);
        }
        .card-title {
            font-size: 1.3rem;
            font-weight: 800;
            margin-bottom: 0.45rem;
            color: var(--text-main);
        }
        .card-desc {
            color: var(--text-muted);
            font-size: 0.88rem;
            line-height: 1.5;
            margin-bottom: 1.1rem;
            flex-grow: 1;
        }
        .card-footer-meta {
            display: flex;
            gap: 0.5rem;
            align-items: center;
            justify-content: center;
            width: 100%;
            margin-top: auto;
        }
        .card-badge {
            padding: 0.3rem 0.8rem;
            border-radius: 16px;
            font-size: 0.75rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.6px;
            background: rgba(255, 255, 255, 0.06);
            border: 1px solid var(--glass-border);
            color: var(--accent);
        }
        .card-play-btn {
            padding: 0.32rem 0.85rem;
            border-radius: 16px;
            font-size: 0.78rem;
            font-weight: 800;
            background: var(--accent);
            color: #fff;
            border: none;
            display: inline-flex;
            align-items: center;
            gap: 0.25rem;
            box-shadow: 0 2px 8px rgba(0,0,0,0.25);
        }

        /* ========================================================
           GAME VIEW - UNIFIED SLEEK COCKPIT & DIFFICULTY STEPPER
           ======================================================== */
        .game-hud {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            max-width: 900px;
            margin-bottom: 0.55rem;
            background: var(--glass-bg);
            padding: 0.55rem 1rem;
            border-radius: 16px;
            border: 1px solid var(--glass-border);
            backdrop-filter: blur(14px);
            box-shadow: var(--shadow-lg);
            gap: 0.6rem;
            flex-wrap: wrap;
        }
        .hud-left {
            display: flex;
            align-items: center;
            gap: 0.65rem;
        }
        .btn-back-home {
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid var(--glass-border);
            color: var(--text-main);
            padding: 0.38rem 0.75rem;
            border-radius: 10px;
            font-weight: 800;
            font-size: 0.82rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.35rem;
            transition: all 0.2s ease;
        }
        .btn-back-home:hover {
            background: rgba(255, 255, 255, 0.15);
            border-color: var(--accent-cyan);
            transform: translateX(-2px);
        }
        .game-current-title {
            font-size: 1.15rem;
            font-weight: 900;
            color: var(--text-main);
            white-space: nowrap;
        }
        
        /* Integrated Stepper Bar (Preserving exact IDs for tests) */
        .stepper-wrap {
            display: flex;
            align-items: center;
            gap: 0.45rem;
            background: rgba(0, 0, 0, 0.22);
            padding: 0.25rem 0.5rem;
            border-radius: 12px;
            border: 1px solid var(--glass-border);
        }
        .diff-counter {
            display: flex;
            align-items: center;
            gap: 0.45rem;
        }
        .diff-icon { font-size: 1.05rem; }
        .diff-label {
            font-size: 0.8rem;
            color: var(--text-muted);
            font-weight: 700;
            text-transform: uppercase;
        }
        .diff-val {
            font-size: 1rem;
            font-weight: 900;
            color: var(--accent-cyan);
            font-variant-numeric: tabular-nums;
            background: rgba(6, 182, 212, 0.16);
            padding: 0.18rem 0.6rem;
            border-radius: 7px;
            border: 1px solid rgba(6, 182, 212, 0.35);
        }
        .diff-pill {
            padding: 0.18rem 0.55rem;
            border-radius: 12px;
            font-size: 0.72rem;
            font-weight: 800;
            text-transform: uppercase;
            background: rgba(16, 185, 129, 0.16);
            color: var(--accent-green);
            border: 1px solid rgba(16, 185, 129, 0.32);
        }
        .diff-pill.diff-medium {
            background: rgba(245, 158, 11, 0.16);
            color: var(--accent-yellow);
            border-color: rgba(245, 158, 11, 0.32);
        }
        .diff-pill.diff-hard {
            background: rgba(239, 68, 68, 0.16);
            color: var(--accent-red);
            border-color: rgba(239, 68, 68, 0.32);
        }
        .nav-btn {
            width: 30px;
            height: 30px;
            border-radius: 8px;
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid var(--glass-border);
            color: var(--text-main);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.15rem;
            font-weight: 800;
            cursor: pointer;
            transition: all 0.18s ease;
        }
        .nav-btn:hover:not(:disabled) {
            background: var(--accent-cyan);
            color: #fff;
            border-color: var(--accent-cyan);
            transform: scale(1.08);
        }
        .nav-btn:disabled { opacity: 0.25; cursor: not-allowed; pointer-events: none; }

        .hud-right {
            display: flex;
            align-items: center;
            gap: 0.4rem;
        }
        .timer-badge {
            font-size: 0.9rem;
            font-weight: 800;
            font-variant-numeric: tabular-nums;
            background: rgba(0, 0, 0, 0.28);
            padding: 0.3rem 0.65rem;
            border-radius: 8px;
            border: 1px solid var(--glass-border);
            color: var(--accent-yellow);
            display: flex;
            align-items: center;
            gap: 0.3rem;
        }

        /* Compact Instruction Ribbon */
        .instruction-box {
            background: rgba(0, 0, 0, 0.2);
            border: 1px solid var(--glass-border);
            border-radius: 10px;
            padding: 0.45rem 0.9rem;
            margin-bottom: 0.65rem;
            font-size: 0.85rem;
            color: var(--text-main);
            max-width: 900px;
            width: 100%;
            text-align: center;
            line-height: 1.45;
        }

        /* ========================================================
           ERGONOMIC GAMEPLAY STAGE (BOARD + DOCKED CONTROLS)
           ======================================================== */
        .game-stage {
            display: flex;
            gap: 1.15rem;
            align-items: center;
            justify-content: center;
            width: 100%;
            max-width: 900px;
            flex-wrap: wrap;
        }

        /* Board Container (Fitted to viewport height to eliminate vertical scroll) */
        .board-container {
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
            border-radius: 20px;
            padding: 1.25rem 1.4rem;
            box-shadow: var(--shadow-lg);
            display: flex;
            justify-content: center;
            align-items: center;
            max-width: 100%;
            min-height: 340px;
            max-height: calc(100vh - 230px);
            overflow: auto;
            position: relative;
        }

        /* Game Cockpit Controls Panel (Docked alongside or right below board) */
        .cockpit-panel {
            display: flex;
            flex-direction: column;
            gap: 0.65rem;
            align-items: center;
            justify-content: center;
            min-width: 260px;
        }

        /* ========================================================
           GAME 1: SUDOKU (ADAPTIVE WITH NUMBER HIGHLIGHTS)
           ======================================================== */
        .sudoku-grid {
            display: grid;
            gap: 2px;
            background: var(--text-muted);
            border: 3px solid var(--text-main);
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 8px 20px rgba(0,0,0,0.35);
        }
        .sudoku-cell {
            width: var(--sudoku-cell-size, 54px);
            height: var(--sudoku-cell-size, 54px);
            background: var(--bg-secondary);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            font-weight: 800;
            color: var(--text-main);
            cursor: pointer;
            transition: background 0.15s, transform 0.1s;
        }
        body.light-theme .sudoku-cell { background: #fff; }
        .sudoku-cell:hover:not(.fixed) { background: rgba(6, 182, 212, 0.25); }
        .sudoku-cell.fixed { color: var(--text-muted); cursor: not-allowed; background: rgba(0,0,0,0.2); }
        .sudoku-cell.selected {
            background: var(--accent-cyan) !important;
            color: #ffffff !important;
            box-shadow: inset 0 0 0 3px rgba(255,255,255,0.7);
            font-weight: 900;
        }
        .sudoku-cell.error {
            color: var(--accent-red) !important;
            animation: shake 0.4s;
            background: rgba(239, 68, 68, 0.25) !important;
        }
        .sudoku-cell.highlight { background: rgba(6, 182, 212, 0.18); }
        .sudoku-cell.same-number {
            background: rgba(245, 158, 11, 0.3) !important;
            color: var(--accent-yellow) !important;
            font-weight: 900;
        }

        /* Sudoku Numpad (Ergonomic 2-row layout) */
        .numpad {
            display: none;
            grid-template-columns: repeat(5, 1fr);
            gap: 0.5rem;
            width: 100%;
            max-width: 320px;
        }
        .num-btn {
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
            color: var(--text-main);
            padding: 0.65rem 0;
            border-radius: 12px;
            font-size: 1.15rem;
            font-weight: 800;
            cursor: pointer;
            text-align: center;
            transition: all 0.15s ease;
        }
        .num-btn:hover { background: var(--accent-cyan); color: #fff; transform: scale(1.05); }

        /* ========================================================
           GAME 2: TAKUZU (ENLARGED SUN & MOON)
           ======================================================== */
        .takuzu-grid {
            display: grid;
            gap: 8px;
            padding: 8px;
        }
        .takuzu-cell {
            width: var(--takuzu-cell-size, 60px);
            height: var(--takuzu-cell-size, 60px);
            background: var(--bg-secondary);
            border: 2px solid var(--glass-border);
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            cursor: pointer;
            transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }
        body.light-theme .takuzu-cell { background: #fff; }
        .takuzu-cell:hover:not(.fixed) { transform: scale(1.08); border-color: var(--accent-purple); }
        .takuzu-cell.fixed { opacity: 0.75; cursor: not-allowed; border-color: transparent; background: rgba(0,0,0,0.22); }
        .takuzu-cell.error { animation: shake 0.4s; border-color: var(--accent-red); background: rgba(239, 68, 68, 0.25); }
        .takuzu-cell.val-0 { color: var(--accent-cyan); text-shadow: 0 0 10px rgba(6,182,212,0.6); }
        .takuzu-cell.val-1 { color: var(--accent-pink); text-shadow: 0 0 10px rgba(236,72,153,0.6); }

        /* ========================================================
           GAME 3: NONOGRAM (WITH TOUCH TOOL SELECTOR)
           ======================================================== */
        .nonogram-wrapper {
            display: flex;
            flex-direction: column;
        }
        .nono-top {
            display: flex;
            margin-left: 80px;
        }
        .nono-col-hint {
            width: var(--nono-cell-size, 44px);
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: center;
            padding-bottom: 6px;
            font-size: 0.82rem;
            font-weight: 800;
            color: var(--text-muted);
            line-height: 1.25;
        }
        .nono-bottom { display: flex; }
        .nono-left-hints {
            width: 80px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            padding-right: 8px;
        }
        .nono-row-hint {
            height: var(--nono-cell-size, 44px);
            display: flex;
            justify-content: flex-end;
            align-items: center;
            gap: 4px;
            font-size: 0.82rem;
            font-weight: 800;
            color: var(--text-muted);
        }
        .nonogram-grid {
            display: grid;
            gap: 2px;
            background: var(--text-muted);
            border: 3px solid var(--text-main);
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 8px 18px rgba(0,0,0,0.3);
        }
        .nono-cell {
            width: var(--nono-cell-size, 44px);
            height: var(--nono-cell-size, 44px);
            background: var(--bg-secondary);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.3rem;
            cursor: pointer;
            transition: background 0.15s;
        }
        body.light-theme .nono-cell { background: #fff; }
        .nono-cell:hover { background: rgba(255,255,255,0.15); }
        .nono-cell.filled { background: var(--accent-cyan) !important; box-shadow: inset 0 0 8px rgba(0,0,0,0.35); }
        .nono-cell.marked::after { content: '✕'; color: var(--accent-pink); font-weight: 900; font-size: 1.4rem; }
        .nono-cell.error { animation: shake 0.4s; background: var(--accent-red) !important; }

        .nono-tool-bar {
            display: none;
            gap: 0.5rem;
            margin-bottom: 0.5rem;
            justify-content: center;
            width: 100%;
        }
        .nono-tool-btn {
            padding: 0.4rem 0.85rem;
            border-radius: 10px;
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
            color: var(--text-main);
            font-size: 0.85rem;
            font-weight: 800;
            cursor: pointer;
        }
        .nono-tool-btn.active {
            background: var(--accent-cyan);
            color: #fff;
            border-color: var(--accent-cyan);
            box-shadow: 0 0 10px rgba(6, 182, 212, 0.4);
        }

        /* ========================================================
           GAME 4: CODE PATH (LARGE CELLS & ANIMATED ROVER)
           ======================================================== */
        .codepath-grid {
            display: grid;
            gap: 2px;
            background: var(--text-muted);
            border: 3px solid var(--text-main);
            border-radius: 8px;
            overflow: hidden;
            position: relative;
            box-shadow: 0 8px 18px rgba(0,0,0,0.3);
        }
        .codepath-cell {
            width: var(--codepath-cell-size, 56px);
            height: var(--codepath-cell-size, 56px);
            background: var(--bg-secondary);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.6rem;
        }
        body.light-theme .codepath-cell { background: #fff; }
        .codepath-cell.wall { background: rgba(0,0,0,0.55); font-size: 1.35rem; }
        .codepath-cell.start { background: rgba(16, 185, 129, 0.25); }
        .codepath-cell.target { background: rgba(245, 158, 11, 0.25); }
        
        #robot {
            position: absolute;
            width: var(--codepath-cell-size, 56px);
            height: var(--codepath-cell-size, 56px);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            z-index: 10;
        }
        
        .code-sequence-bar {
            display: flex;
            gap: 5px;
            padding: 8px;
            background: rgba(0,0,0,0.25);
            border-radius: 12px;
            min-height: 52px;
            width: 100%;
            overflow-x: auto;
            align-items: center;
            border: 1px solid var(--glass-border);
        }
        .code-block {
            background: var(--accent-cyan);
            color: white;
            padding: 6px 10px;
            border-radius: 8px;
            font-weight: bold;
            font-size: 1.15rem;
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 36px;
            cursor: pointer;
            box-shadow: 0 3px 6px rgba(0,0,0,0.25);
            transition: all 0.15s;
        }
        .code-block.active {
            box-shadow: 0 0 12px white;
            transform: scale(1.12);
        }

        /* ========================================================
           GAME 5: BINARY DECODER (WITH REAL-TIME RUNNING SUMS)
           ======================================================== */
        .binary-grid-wrapper {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            gap: 0.65rem;
        }
        .binary-left-hints {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
        }
        .binary-row-hint-box {
            height: var(--bin-cell-size, 64px);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-end;
            padding-right: 6px;
        }
        .binary-row-target {
            font-size: 1.45rem;
            font-weight: 900;
            color: var(--accent-yellow);
            font-family: monospace;
            line-height: 1;
        }
        .binary-row-current {
            font-size: 0.75rem;
            font-weight: 800;
            color: var(--text-muted);
            margin-top: 3px;
        }
        .binary-row-current.match { color: var(--accent-green); }
        .binary-row-current.over { color: var(--accent-red); }

        .binary-col-hint {
            width: var(--bin-cell-size, 64px);
            display: flex;
            justify-content: center;
            font-size: 1.15rem;
            color: var(--text-muted);
            font-weight: 800;
            font-family: monospace;
            padding-bottom: 8px;
        }
        .binary-grid {
            display: grid;
            gap: 6px;
            background: rgba(0, 0, 0, 0.3);
            border: 3px solid var(--text-main);
            border-radius: 16px;
            padding: 6px;
            box-shadow: 0 8px 20px rgba(0,0,0,0.35);
        }
        .binary-cell {
            width: var(--bin-cell-size, 64px);
            height: var(--bin-cell-size, 64px);
            background: var(--bg-secondary);
            border: 2px solid var(--glass-border);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.85rem;
            cursor: pointer;
            color: var(--text-muted);
            font-family: monospace;
            font-weight: 900;
            transition: all 0.16s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            box-shadow: 0 3px 6px rgba(0,0,0,0.2);
        }
        body.light-theme .binary-cell { background: #fff; }
        .binary-cell:hover { transform: scale(1.06); border-color: var(--accent-cyan); }
        .binary-cell.on {
            background: linear-gradient(135deg, var(--accent-cyan), #0284c7);
            color: white;
            border-color: var(--accent-cyan);
            box-shadow: 0 0 16px rgba(6, 182, 212, 0.6);
            transform: scale(1.04);
        }
        .binary-cell.error {
            animation: shake 0.4s;
            background: var(--accent-red) !important;
            color: white;
        }

        /* ========================================================
           GAME 6: LOGIC GATE CIRCUIT (CLEAN DYNAMIC SCHEMATIC)
           ======================================================== */
        .logic-grid {
            display: grid;
            gap: 14px;
            background: transparent;
            position: relative;
            margin-top: 0.5rem;
        }
        .logic-node {
            width: 64px;
            height: 64px;
            background: var(--bg-secondary);
            border: 2px solid var(--glass-border);
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1rem;
            font-weight: 900;
            position: relative;
            z-index: 2;
            transition: all 0.2s;
            box-shadow: var(--shadow-lg);
        }
        .logic-node.input-node {
            border-radius: 50%;
            background: #334155;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
        }
        .logic-node.input-node.on { background: var(--accent-green); box-shadow: 0 0 16px var(--accent-green); }
        .logic-node.gate-node {
            background: #475569;
            color: white;
            border-style: dashed;
            cursor: pointer;
        }
        .logic-node.gate-node.filled {
            border-style: solid;
            background: var(--accent-purple);
        }
        .logic-node.gate-node.error { animation: shake 0.4s; border-color: var(--accent-red); box-shadow: 0 0 14px var(--accent-red); }
        .logic-node.output-node {
            border-radius: 14px;
            background: #334155;
            color: white;
            font-size: 1.5rem;
        }
        .logic-node.output-node.on {
            background: var(--accent-yellow);
            color: black;
            box-shadow: 0 0 20px var(--accent-yellow);
        }
        .logic-wire {
            position: absolute;
            background: var(--glass-border);
            z-index: 1;
            transform-origin: left center;
            height: 4px;
            border-radius: 2px;
            transition: background 0.3s, box-shadow 0.3s;
        }
        .logic-wire.on { background: var(--accent-green); box-shadow: 0 0 10px var(--accent-green); }

        /* General Game Action Controls Bar */
        .game-controls {
            display: flex;
            gap: 0.6rem;
            flex-wrap: wrap;
            justify-content: center;
            width: 100%;
            max-width: 900px;
            margin-top: 0.65rem;
        }
        .btn-action {
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
            color: var(--text-main);
            padding: 0.75rem 1.4rem;
            border-radius: 14px;
            font-weight: 800;
            font-size: 0.95rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.45rem;
            transition: all 0.2s;
            box-shadow: var(--shadow-lg);
            flex: 1;
            min-width: 120px;
            justify-content: center;
        }
        .btn-action:hover {
            transform: translateY(-2px);
            border-color: var(--accent-cyan);
            background: rgba(255,255,255,0.1);
        }
        .btn-action:active { transform: scale(0.96); }
        .btn-action.primary {
            background: linear-gradient(135deg, var(--accent-cyan), #0284c7);
            color: #fff;
            border: none;
            box-shadow: 0 4px 15px rgba(6, 182, 212, 0.4);
        }
        .btn-action.primary:hover { box-shadow: 0 6px 20px rgba(6, 182, 212, 0.6); }

        /* Modals & Overlays */
        .modal-overlay {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(15, 23, 42, 0.85);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            z-index: 500;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
            padding: 1rem;
        }
        .modal-overlay.active {
            opacity: 1;
            pointer-events: auto;
        }
        .modal-box {
            background: var(--bg-secondary);
            border: 1px solid var(--glass-border);
            border-radius: 24px;
            padding: 2rem;
            max-width: 460px;
            width: 100%;
            text-align: center;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
            transform: scale(0.88) translateY(15px);
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            position: relative;
        }
        .modal-overlay.active .modal-box {
            transform: scale(1) translateY(0);
        }
        .modal-icon { font-size: 3.8rem; margin-bottom: 0.65rem; }
        .modal-title { font-size: 1.65rem; font-weight: 900; margin-bottom: 0.45rem; color: var(--text-main); }
        .modal-desc { color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.5rem; line-height: 1.55; }
        .modal-btn {
            width: 100%;
            padding: 0.85rem;
            border-radius: 14px;
            border: none;
            background: linear-gradient(135deg, var(--accent-green), #059669);
            color: white;
            font-size: 1.05rem;
            font-weight: 800;
            cursor: pointer;
            box-shadow: 0 8px 18px -4px rgba(16, 185, 129, 0.5);
            transition: all 0.2s;
        }
        .modal-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 22px -4px rgba(16, 185, 129, 0.7); }

        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-6px); }
            40%, 80% { transform: translateX(6px); }
        }

        /* Responsive Breakpoints */
        @media (max-width: 768px) {
            .hero-title { font-size: 1.65rem; }
            .hero-subtitle { font-size: 0.88rem; margin-bottom: 1rem; }
            .game-hud { padding: 0.5rem 0.75rem; gap: 0.4rem; }
            .game-current-title { font-size: 1rem; }
            .diff-label { display: none; }
            .board-container { padding: 0.85rem 0.5rem; min-height: 280px; }
            .nono-tool-bar { display: flex; }
            
            :root {
                --bin-cell-size: 50px;
                --sudoku-cell-size: 36px;
                --takuzu-cell-size: 44px;
                --nono-cell-size: 32px;
                --codepath-cell-size: 42px;
            }
            .binary-row-target { font-size: 1.15rem; }
            .binary-col-hint { font-size: 0.95rem; }
            .binary-cell { font-size: 1.4rem; border-radius: 10px; }
            .logic-grid { transform: scale(0.74); transform-origin: top center; margin-bottom: -50px; }
            .hide-mobile { display: none; }
        }
    </style>
</head>
<body>
    <div class="bg-mesh">
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
        <div class="orb orb-3"></div>
    </div>

    <canvas id="fx-canvas"></canvas>

    <header>
        <div class="logo" onclick="switchView('home')" title="กลับหน้าแรก Cyber Logic">
            <span>🧩 CYBER LOGIC</span>
        </div>
        <div class="header-controls">
            <a href="../../index.html" class="btn-header" title="กลับหน้าหลักพอร์ตโฟลิโอ">
                <span>🏠</span>
                <span class="hide-mobile" data-i18n="navHome">หน้าแรก</span>
            </a>
            <button class="btn-header" id="btn-lang" onclick="toggleLanguage()" title="เปลี่ยนภาษา / Switch Language">
                <span>🌐</span>
                <span id="lang-label">EN</span>
            </button>
            <button class="btn-icon" id="btn-fullscreen" onclick="toggleFullscreen()" title="โหมดเต็มจอ / Fullscreen">⛶</button>
            <button class="btn-icon" id="btn-sound" onclick="toggleSound()" title="เปิด/ปิดเสียง">🔊</button>
            <button class="btn-icon" id="btn-theme" onclick="toggleTheme()" title="เปลี่ยนธีม">🌙</button>
        </div>
    </header>

    <main>
        <!-- HOME VIEW (HUB) -->
        <div id="view-home" class="view active">
            <h1 class="hero-title" data-i18n="heroTitle">⚡ Cyber Logic: ถอดรหัสความคิด พิชิตทุกปริศนา</h1>
            <p class="hero-subtitle" data-i18n="heroSubtitle">เจาะระบบความคิดด้วย 6 เกมฝึกสมองสายวิทยาการคำนวณ ไต่เต้าจากมือใหม่สู่ผู้เชี่ยวชาญ 10 ด่านสุดท้าทายรอคุณอยู่!</p>

            <!-- Category Filter Tabs -->
            <div class="filter-tabs">
                <button class="filter-tab active" onclick="filterGames('all')" data-i18n="tabAll">🌟 ทั้งหมด (All 9 Games)</button>
                <button class="filter-tab" onclick="filterGames('classic')" data-i18n="tabClassic">🧩 ปริศนาตรรกะคลาสสิก (Classic)</button>
                <button class="filter-tab" onclick="filterGames('cs')" data-i18n="tabCS">💻 วิทยาการคำนวณ (Computing)</button>
            </div>

            <!-- Section 1: Classic Puzzles -->
            <div class="section-heading" data-category="classic">
                <span>🧩</span>
                <span data-i18n="sectionClassic">เกมปริศนาตรรกะคลาสสิก (Classic Logic Puzzles)</span>
            </div>

            <div class="game-grid" data-category="classic">
                <!-- Card 1: Sudoku -->
                <div class="game-card" style="--accent: var(--accent-cyan); --accent-glow: rgba(6, 182, 212, 0.25);" onclick="selectGame('sudoku')">
                    <div class="card-icon">🔢</div>
                    <h2 class="card-title" data-i18n="cardSudokuTitle">ซูโดกุ (Sudoku)</h2>
                    <p class="card-desc" data-i18n="cardSudokuDesc">จัดวางตัวเลขลงในตารางโดยไม่ให้ซ้ำกันในแนวนอน แนวตั้ง และตารางย่อย ท้าทายกับขนาด 4x4, 6x6 ไปจนถึง 9x9</p>
                    <div class="card-footer-meta">
                        <span class="card-badge" data-i18n="badge10Levels">10 ระดับความยาก</span>
                        <span class="card-play-btn">เล่นเลย ➔</span>
                    </div>
                </div>

                <!-- Card 2: Takuzu -->
                <div class="game-card" style="--accent: var(--accent-purple); --accent-glow: rgba(139, 92, 246, 0.25);" onclick="selectGame('takuzu')">
                    <div class="card-icon">☀️</div>
                    <h2 class="card-title" data-i18n="cardTakuzuTitle">ตารางทาคูซุ (Takuzu Grid)</h2>
                    <p class="card-desc" data-i18n="cardTakuzuDesc">เติมดวงอาทิตย์และดวงจันทร์ ห้ามเรียงติดกันเกิน 2 ตัว และจำนวนของทั้งสองสิ่งต้องเท่ากันในทุกแถวและคอลัมน์</p>
                    <div class="card-footer-meta">
                        <span class="card-badge" data-i18n="badge10Levels">10 ระดับความยาก</span>
                        <span class="card-play-btn">เล่นเลย ➔</span>
                    </div>
                </div>

                <!-- Card 3: Nonogram -->
                <div class="game-card" style="--accent: var(--accent-pink); --accent-glow: rgba(236, 72, 153, 0.25);" onclick="selectGame('nonogram')">
                    <div class="card-icon">🎨</div>
                    <h2 class="card-title" data-i18n="cardNonogramTitle">โนโนแกรม (Picross)</h2>
                    <p class="card-desc" data-i18n="cardNonogramDesc">ถอดรหัสตัวเลขใบ้ริมตารางเพื่อระบายสีลงในช่องว่าง เผยให้เห็นภาพศิลปะพิกเซลที่ซ่อนอยู่จากขนาด 5x5 ถึง 10x10</p>
                    <div class="card-footer-meta">
                        <span class="card-badge" data-i18n="badge10Levels">10 ระดับความยาก</span>
                        <span class="card-play-btn">เล่นเลย ➔</span>
                    </div>
                </div>
            </div>

            <!-- Section 2: Computing Science Games -->
            <div class="section-heading" data-category="cs">
                <span>💻</span>
                <span data-i18n="sectionCS">วิทยาการคำนวณและอัลกอริทึม (Computing Science & Algorithms)</span>
            </div>
            
            <div class="game-grid" data-category="cs">
                <!-- Card 4: Code Path -->
                <div class="game-card" style="--accent: var(--accent-green); --accent-glow: rgba(16, 185, 129, 0.25);" onclick="selectGame('codepath')">
                    <div class="card-icon">🤖</div>
                    <h2 class="card-title" data-i18n="cardCodePathTitle">เส้นทางโค้ด (Code Path)</h2>
                    <p class="card-desc" data-i18n="cardCodePathDesc">ฝึกอัลกอริทึม! เรียงลำดับคำสั่งลูกศรเพื่อนำทางหุ่นยนต์ไปยังเป้าหมาย โดยหลบหลีกสิ่งกีดขวาง (ระวังบั๊ก!)</p>
                    <div class="card-footer-meta">
                        <span class="card-badge" data-i18n="badge10Levels">10 ระดับความยาก</span>
                        <span class="card-play-btn">เล่นเลย ➔</span>
                    </div>
                </div>

                <!-- Card 5: Binary Decoder -->
                <div class="game-card" style="--accent: var(--accent-yellow); --accent-glow: rgba(245, 158, 11, 0.25);" onclick="selectGame('binary')">
                    <div class="card-icon">01</div>
                    <h2 class="card-title" data-i18n="cardBinaryTitle">ถอดรหัสฐานสอง (Binary)</h2>
                    <p class="card-desc" data-i18n="cardBinaryDesc">เรียนรู้การแทนข้อมูลด้วยเลขฐานสอง แปลงรหัสจาก 0 และ 1 เป็นค่าตัวเลขฐานสิบ เพื่อปลดล็อกรูปภาพลับ</p>
                    <div class="card-footer-meta">
                        <span class="card-badge" data-i18n="badge10Levels">10 ระดับความยาก</span>
                        <span class="card-play-btn">เล่นเลย ➔</span>
                    </div>
                </div>

                <!-- Card 6: Logic Gate -->
                <div class="game-card" style="--accent: var(--accent-red); --accent-glow: rgba(239, 68, 68, 0.25);" onclick="selectGame('logic')">
                    <div class="card-icon">🔌</div>
                    <h2 class="card-title" data-i18n="cardLogicTitle">วงจรตรรกะ (Logic Gate)</h2>
                    <p class="card-desc" data-i18n="cardLogicDesc">เรียนรู้ตรรกศาสตร์บูลีน! เลือกตัวเชื่อม AND, OR หรือ XOR มาต่อวงจรให้กระแสไฟไหลไปจนถึงปลายทางเป็น 1</p>
                    <div class="card-footer-meta">
                        <span class="card-badge" data-i18n="badge10Levels">10 ระดับความยาก</span>
                        <span class="card-play-btn">เล่นเลย ➔</span>
                    </div>
                </div>

                <!-- Card 7: Cyber Rover (External Link) -->
                <div class="game-card" style="--accent: var(--accent-cyan); --accent-glow: rgba(6, 182, 212, 0.25);" onclick="window.location.href='algorithmlogic.html'">
                    <div class="card-icon">🚀</div>
                    <h2 class="card-title" data-i18n="cardRoverTitle">ไซเบอร์โรเวอร์ (Cyber Rover)</h2>
                    <p class="card-desc" data-i18n="cardRoverDesc">เรียนรู้การใช้ Loop และเงื่อนไข IF-ELSE เพื่อลดการใช้ Memory สั่งหุ่นยนต์ทะลวงด่านสุดท้าทาย</p>
                    <div class="card-footer-meta">
                        <span class="card-badge" data-i18n="badge10Levels">10 ระดับความยาก</span>
                        <span class="card-play-btn">เล่นเลย ➔</span>
                    </div>
                </div>

                <!-- Card 8: Pixel Decoder (External Link) -->
                <div class="game-card" style="--accent: var(--accent-pink); --accent-glow: rgba(236, 72, 153, 0.25);" onclick="window.location.href='pixeldecoder.html'">
                    <div class="card-icon">👾</div>
                    <h2 class="card-title" data-i18n="cardPixelTitle">ถอดรหัสพิกเซล (Pixel Decoder)</h2>
                    <p class="card-desc" data-i18n="cardPixelDesc">สวมบทบาทแฮกเกอร์! อ่านรหัสลับ (Run-Length Encoding) แล้วลากระบายสีลงในตารางเพื่อกู้คืนภาพพิกเซล</p>
                    <div class="card-footer-meta">
                        <span class="card-badge" data-i18n="badge10Levels">10 ระดับความยาก</span>
                        <span class="card-play-btn">เล่นเลย ➔</span>
                    </div>
                </div>

                <!-- Card 9: Pixel Art Coding (External Link) -->
                <div class="game-card" style="--accent: #3B82F6; --accent-glow: rgba(59, 130, 246, 0.25);" onclick="window.location.href='pixel-art/index.html'">
                    <div class="card-icon">🎨</div>
                    <h2 class="card-title" data-i18n="cardPixelArtTitle">Pixel Art Coding</h2>
                    <p class="card-desc" data-i18n="cardPixelArtDesc">ฝึกอ่านโค้ดลับตัวเลข (Run-Length) แล้วลากระบายสีพิกเซลตามคำสั่ง เพื่อเปิดเผยภาพปริศนาสุดน่ารักทั้ง 10 รูป!</p>
                    <div class="card-footer-meta">
                        <span class="card-badge" data-i18n="badge10Levels">10 ระดับความยาก</span>
                        <span class="card-play-btn">เล่นเลย ➔</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- GAME VIEW (STREAMLINED SCREEN) -->
        <div id="view-game" class="view">
            <!-- UNIFIED GAME HUD: Back, Title, Stepper, Timer, Restart, Help in ONE sleek bar! -->
            <div class="game-hud">
                <div class="hud-left">
                    <button class="btn-back-home" onclick="switchView('home')" title="กลับหน้าเลือกเกม">
                        <span>←</span>
                        <span data-i18n="btnBackHome">หน้าหลัก</span>
                    </button>
                    <span class="game-current-title" id="game-title-display">ซูโดกุ (Sudoku)</span>
                </div>

                <!-- Difficulty Stepper -->
                <div class="stepper-wrap">
                    <button class="nav-btn" id="btn-prev-level" onclick="changeLevel(-1)" title="ด่านก่อนหน้า">‹</button>
                    <div class="diff-counter">
                        <span class="diff-icon">🎯</span>
                        <span class="diff-label" data-i18n="levelLabel">ระดับความยาก</span>
                        <span class="diff-val" id="difficulty-count">1 / 10</span>
                        <span class="diff-pill" id="difficulty-name">ง่าย</span>
                    </div>
                    <button class="nav-btn" id="btn-next-level" onclick="changeLevel(1)" title="ด่านถัดไป">›</button>
                </div>

                <div class="hud-right">
                    <div class="timer-badge" id="timer-badge">
                        <span>⏱️</span>
                        <span id="timer-display">00:00</span>
                    </div>
                    <button class="btn-icon" onclick="showHowToPlay()" title="วิธีเล่น / How to Play">❓</button>
                    <button class="btn-icon" onclick="resetCurrentGame()" title="เริ่มด่านนี้ใหม่ / Restart">🔄</button>
                </div>
            </div>

            <!-- Contextual Instructions Ribbon -->
            <div class="instruction-box" id="game-instructions">
                <!-- Instructions injected via JS -->
            </div>

            <!-- Nonogram Mobile Tool Switcher -->
            <div class="nono-tool-bar" id="nono-tools">
                <button class="nono-tool-btn active" id="tool-fill" onclick="setNonoTool(1)">✏️ ระบายสี (Fill)</button>
                <button class="nono-tool-btn" id="tool-mark" onclick="setNonoTool(2)">✕ กากบาท (Mark)</button>
            </div>

            <!-- GAME STAGE: Board Area and Docked Controls -->
            <div class="game-stage">
                <div class="board-container" id="board-area">
                    <!-- Game board injected via JS -->
                </div>

                <div class="cockpit-panel" id="cockpit-panel">
                    <!-- Numpad for Sudoku -->
                    <div class="numpad" id="sudoku-numpad">
                        <button class="num-btn" onclick="inputSudoku(1)">1</button>
                        <button class="num-btn" onclick="inputSudoku(2)">2</button>
                        <button class="num-btn" onclick="inputSudoku(3)">3</button>
                        <button class="num-btn" onclick="inputSudoku(4)">4</button>
                        <button class="num-btn" onclick="inputSudoku(5)">5</button>
                        <button class="num-btn" onclick="inputSudoku(6)">6</button>
                        <button class="num-btn" onclick="inputSudoku(7)">7</button>
                        <button class="num-btn" onclick="inputSudoku(8)">8</button>
                        <button class="num-btn" onclick="inputSudoku(9)">9</button>
                        <button class="num-btn" style="background: rgba(239,68,68,0.22); color: var(--accent-red);" onclick="inputSudoku(0)" data-i18n="btnErase">ลบ</button>
                    </div>

                    <!-- Controls for Code Path -->
                    <div class="game-controls" id="codepath-controls" style="display: none; width: 100%; max-width: 380px; flex-direction: column; margin-top: 0;">
                        <div class="code-sequence-bar" id="code-sequence">
                            <!-- Blocks injected here -->
                        </div>
                        <div style="display: flex; gap: 0.45rem; justify-content: center; flex-wrap: wrap;">
                            <button class="btn-action" style="flex: 0; min-width: 54px; padding: 0.75rem 0.95rem;" onclick="addCodeBlock('UP')" title="เดินขึ้น (Up Arrow)">⬆️</button>
                            <button class="btn-action" style="flex: 0; min-width: 54px; padding: 0.75rem 0.95rem;" onclick="addCodeBlock('DOWN')" title="เดินลง (Down Arrow)">⬇️</button>
                            <button class="btn-action" style="flex: 0; min-width: 54px; padding: 0.75rem 0.95rem;" onclick="addCodeBlock('LEFT')" title="เดินซ้าย (Left Arrow)">⬅️</button>
                            <button class="btn-action" style="flex: 0; min-width: 54px; padding: 0.75rem 0.95rem;" onclick="addCodeBlock('RIGHT')" title="เดินขวา (Right Arrow)">➡️</button>
                            <button class="btn-action" style="flex: 0; min-width: 54px; padding: 0.75rem 0.95rem; background: rgba(239,68,68,0.22); color: var(--accent-red);" onclick="removeCodeBlock()" title="ลบคำสั่งล่าสุด (Backspace)">⌫</button>
                        </div>
                        <div style="display: flex; justify-content: center; width: 100%; margin-top: 0.45rem;">
                            <button class="btn-action primary" style="width: 100%;" onclick="runCodePath()">▶️ RUN CODE</button>
                        </div>
                    </div>

                    <!-- Controls for Logic Gate -->
                    <div class="game-controls" id="logic-controls" style="display: none; width: 100%; justify-content: center; gap: 0.65rem; margin-top: 0;">
                        <button class="btn-action" style="flex: 1;" onclick="selectLogicGate('AND')">AND (และ)</button>
                        <button class="btn-action" style="flex: 1;" onclick="selectLogicGate('OR')">OR (หรือ)</button>
                        <button class="btn-action" style="flex: 1;" onclick="selectLogicGate('XOR')">XOR (ต่าง)</button>
                    </div>

                    <!-- General Action Controls -->
                    <div class="game-controls" id="general-controls" style="margin-top: 0; width: 100%;">
                        <button class="btn-action" onclick="useHint()">
                            <span>💡</span>
                            <span data-i18n="btnHint">คำใบ้</span>
                            <span>(<span id="hint-count">3</span>)</span>
                        </button>
                        <button class="btn-action primary" onclick="checkSolution()">
                            <span>✨</span>
                            <span data-i18n="btnCheck">ตรวจคำตอบ</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Author Credit Footer (Personal Branding: Dr. Apisit Thongchai) -->
        <footer class="site-footer" style="text-align: center; padding: 24px 16px 32px; margin-top: auto; font-family: 'Prompt', system-ui, sans-serif; width: 100%;">
            <div class="footer-container" style="max-width: 1200px; margin: 0 auto; text-align: center;">
                <p class="copyright" style="margin: 0; font-size: 0.88rem; font-weight: 500; opacity: 0.85; line-height: 1.6;">
                    © 2026 <a href="../../index.html" class="footer-author-link" style="color: inherit; text-decoration: underline; font-weight: 600;" data-i18n="footerAuthor">ดร.อภิสิทธิ์ ธงไชย</a> • <span data-i18n="footerTitle">สื่อการเรียนรู้เชิงปฏิสัมพันธ์ (Interactive EdTech)</span>
                </p>
                <p class="links" style="margin: 6px auto 0; font-size: 0.75rem; opacity: 0.8;">
                    <a href="../../index.html" style="color: inherit; text-decoration: underline;" data-i18n="footerHome">หน้าแรก</a> • 
                    <a href="../../about.html" style="color: inherit; text-decoration: underline;" data-i18n="footerAbout">เกี่ยวกับผู้จัดทำ</a> • 
                    <a href="../../sitemap.html" style="color: inherit; text-decoration: underline;" data-i18n="footerSitemap">แผนผังเว็บไซต์</a>
                </p>
                <p class="sub-text" style="margin: 4px auto 0; font-size: 0.72rem; opacity: 0.65; letter-spacing: 0.02em;" data-i18n="footerSubtext">
                    พัฒนาเพื่อส่งเสริมการสืบเสาะและความเข้าใจมโนมติทางวิทยาศาสตร์และเทคโนโลยี
                </p>
            </div>
        </footer>
    </main>

    <!-- MODAL CELEBRATION (Win / Grand Win) -->
    <div class="modal-overlay" id="modal-win">
        <div class="modal-box">
            <div class="modal-icon" id="modal-icon">🎉</div>
            <h3 class="modal-title" id="modal-title">ผ่านด่านแล้ว!</h3>
            <p class="modal-desc" id="modal-desc">คุณแก้ปริศนาได้อย่างยอดเยี่ยม ใช้เวลาไป 01:23</p>
            <button class="modal-btn" id="modal-next-btn" onclick="nextLevel()">ด่านต่อไป ➔</button>
        </div>
    </div>

    <!-- MODAL HOW TO PLAY -->
    <div class="modal-overlay" id="modal-howto">
        <div class="modal-box" style="text-align: left; max-width: 520px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <h3 class="modal-title" style="margin-bottom: 0; font-size: 1.4rem;">
                    <span data-i18n="modalHowtoHeader">วิธีเล่น</span> <span id="howto-title-game"></span>
                </h3>
                <button class="btn-icon" onclick="closeHowToPlay()" style="width: 32px; height: 32px; font-size: 0.9rem; border: none; box-shadow: none; background: transparent;">❌</button>
            </div>
            <div class="modal-desc" id="howto-desc" style="font-size: 0.92rem; line-height: 1.6; text-align: left; margin-bottom: 1.4rem; color: var(--text-main);">
                <!-- Content injected via JS -->
            </div>
            <button class="modal-btn" onclick="closeHowToPlay()" data-i18n="modalHowtoConfirm">เข้าใจแล้ว พร้อมลุย!</button>
        </div>
    </div>

    <script>
        /* =========================================================================
           BILINGUAL i18n SYSTEM (Thai & English)
           ========================================================================= */
        const i18n = {
            th: {
                navHome: "หน้าแรก",
                heroTitle: "⚡ Cyber Logic: ถอดรหัสความคิด พิชิตทุกปริศนา",
                heroSubtitle: "เจาะระบบความคิดด้วย 6 เกมฝึกสมองสายวิทยาการคำนวณ ไต่เต้าจากมือใหม่สู่ผู้เชี่ยวชาญ 10 ด่านสุดท้าทายรอคุณอยู่!",
                tabAll: "🌟 ทั้งหมด (All 9 Games)",
                tabClassic: "🧩 ปริศนาตรรกะคลาสสิก (Classic)",
                tabCS: "💻 วิทยาการคำนวณ (Computing)",
                sectionClassic: "เกมปริศนาตรรกะคลาสสิก (Classic Logic Puzzles)",
                sectionCS: "วิทยาการคำนวณและอัลกอริทึม (Computing Science & Algorithms)",
                cardSudokuTitle: "ซูโดกุ (Sudoku)",
                cardSudokuDesc: "จัดวางตัวเลขลงในตารางโดยไม่ให้ซ้ำกันในแนวนอน แนวตั้ง และตารางย่อย ท้าทายกับขนาด 4x4, 6x6 ไปจนถึง 9x9",
                cardTakuzuTitle: "ตารางทาคูซุ (Takuzu Grid)",
                cardTakuzuDesc: "เติมดวงอาทิตย์และดวงจันทร์ ห้ามเรียงติดกันเกิน 2 ตัว และจำนวนของทั้งสองสิ่งต้องเท่ากันในทุกแถวและคอลัมน์",
                cardNonogramTitle: "โนโนแกรม (Picross)",
                cardNonogramDesc: "ถอดรหัสตัวเลขใบ้ริมตารางเพื่อระบายสีลงในช่องว่าง เผยให้เห็นภาพศิลปะพิกเซลที่ซ่อนอยู่จากขนาด 5x5 ถึง 10x10",
                cardCodePathTitle: "เส้นทางโค้ด (Code Path)",
                cardCodePathDesc: "ฝึกอัลกอริทึม! เรียงลำดับคำสั่งลูกศรเพื่อนำทางหุ่นยนต์ไปยังเป้าหมาย โดยหลบหลีกสิ่งกีดขวาง (ระวังบั๊ก!)",
                cardBinaryTitle: "ถอดรหัสฐานสอง (Binary)",
                cardBinaryDesc: "เรียนรู้การแทนข้อมูลด้วยเลขฐานสอง แปลงรหัสจาก 0 และ 1 เป็นค่าตัวเลขฐานสิบ เพื่อปลดล็อกรูปภาพลับ",
                cardLogicTitle: "วงจรตรรกะ (Logic Gate)",
                cardLogicDesc: "เรียนรู้ตรรกศาสตร์บูลีน! เลือกตัวเชื่อม AND, OR หรือ XOR มาต่อวงจรให้กระแสไฟไหลไปจนถึงปลายทางเป็น 1",
                cardRoverTitle: "ไซเบอร์โรเวอร์ (Cyber Rover)",
                cardRoverDesc: "เรียนรู้การใช้ Loop และเงื่อนไข IF-ELSE เพื่อลดการใช้ Memory สั่งหุ่นยนต์ทะลวงด่านสุดท้าทาย",
                cardPixelTitle: "ถอดรหัสพิกเซล (Pixel Decoder)",
                cardPixelDesc: "สวมบทบาทแฮกเกอร์! อ่านรหัสลับ (Run-Length Encoding) แล้วลากระบายสีลงในตารางเพื่อกู้คืนภาพพิกเซล",
                cardPixelArtTitle: "Pixel Art Coding",
                cardPixelArtDesc: "ฝึกอ่านโค้ดลับตัวเลข (Run-Length) แล้วลากระบายสีพิกเซลตามคำสั่ง เพื่อเปิดเผยภาพปริศนาสุดน่ารักทั้ง 10 รูป!",
                badge10Levels: "10 ระดับความยาก",
                btnBackHome: "หน้าหลัก",
                levelLabel: "ระดับความยาก",
                diffEasy: "ง่าย",
                diffMedium: "ปานกลาง",
                diffHard: "ยากมาก",
                btnErase: "ลบ",
                btnHint: "คำใบ้",
                btnCheck: "ตรวจคำตอบ",
                footerAuthor: "ดร.อภิสิทธิ์ ธงไชย",
                footerTitle: "สื่อการเรียนรู้เชิงปฏิสัมพันธ์ (Interactive EdTech)",
                footerHome: "หน้าแรก",
                footerAbout: "เกี่ยวกับผู้จัดทำ",
                footerSitemap: "แผนผังเว็บไซต์",
                footerSubtext: "พัฒนาเพื่อส่งเสริมการสืบเสาะและความเข้าใจมโนมติทางวิทยาศาสตร์และเทคโนโลยี",
                modalHowtoHeader: "วิธีเล่น",
                modalHowtoConfirm: "เข้าใจแล้ว พร้อมลุย!",
                winTitleRegular: "ผ่านด่านแล้ว!",
                winDescRegular: "คุณแก้ปริศนาได้อย่างยอดเยี่ยมในด่านที่ {level} ใช้เวลาไป {time}",
                winNextBtn: "ด่านต่อไป ➔",
                winTitleGrand: "👑 สุดยอดปรมาจารย์แห่งตรรกะ!",
                winDescGrand: "มหัศจรรย์มาก! คุณพิชิตครบทั้ง 10 ด่านของเกมนี้แล้ว ใช้เวลาในด่านสุดท้าย {time}",
                winHomeBtn: "กลับสู่หน้าหลัก 🏠",
                instrSudoku: "💡 คลิกเลือกช่องว่าง แล้วกดปุ่มตัวเลขด้านล่างหรือกดเลขบนแป้นพิมพ์เพื่อเติมตัวเลขไม่ให้ซ้ำกัน",
                instrTakuzu: "💡 คลิกที่ช่องเพื่อสลับ ☀️ และ 🌙 โดยห้ามติดกันเกิน 2 ตัว และจำนวนต้องเท่ากันในทุกแถว/คอลัมน์",
                instrNonogram: "💡 ดูตัวเลขใบ้เพื่อระบายสีภาพพิกเซล (คลิกซ้ายระบายสี, คลิกขวาทำเครื่องหมาย ✕ หรือใช้ปุ่มสลับเครื่องมือ)",
                instrCodePath: "💡 วางบล็อกลูกศรนำทาง 🤖 ไปยังเป้าหมาย ⭐ โดยไม่ชนกำแพง (สามารถใช้ปุ่มลูกศรบนแป้นพิมพ์ได้)",
                instrBinary: "💡 เปิด-ปิด บิตเลขฐานสอง (0/1) เพื่อให้ผลรวมของแต่ละแถวตรงกับตัวเลขเป้าหมายสีเหลือง",
                instrLogic: "💡 เลือกตัวเชื่อม AND, OR หรือ XOR วางลงในช่องว่างเพื่อให้สัญญาณไฟไหลไปถึงเอาต์พุตเป็น 1"
            },
            en: {
                navHome: "Home",
                heroTitle: "⚡ Cyber Logic: Decode Your Mind, Master Every Puzzle",
                heroSubtitle: "Level up your computational thinking with 6 brain-teasing puzzle games from novice to master across 10 difficulty stages!",
                tabAll: "🌟 All (9 Games)",
                tabClassic: "🧩 Classic Logic",
                tabCS: "💻 Computing Science",
                sectionClassic: "Classic Logic Puzzles",
                sectionCS: "Computing Science & Algorithms",
                cardSudokuTitle: "Sudoku",
                cardSudokuDesc: "Fill the grid so that every row, column, and subgrid contains unique numbers from 4x4, 6x6 up to 9x9.",
                cardTakuzuTitle: "Takuzu Grid",
                cardTakuzuDesc: "Fill with Suns and Moons. No more than two identical symbols adjacent, equal counts per row & column.",
                cardNonogramTitle: "Nonogram (Picross)",
                cardNonogramDesc: "Decode numerical clues along grid edges to reveal pixel art illustrations from 5x5 to 10x10.",
                cardCodePathTitle: "Code Path",
                cardCodePathDesc: "Algorithm training! Sequence directional arrow commands to navigate the robot to the star goal without hitting walls.",
                cardBinaryTitle: "Binary Decoder",
                cardBinaryDesc: "Learn data representation with binary digits. Toggle bits 0 and 1 so horizontal weights sum to decimal targets.",
                cardLogicTitle: "Logic Gate Circuit",
                cardLogicDesc: "Explore Boolean logic! Select AND, OR, or XOR gate chips to ensure electrical signals yield output 1.",
                cardRoverTitle: "Cyber Rover",
                cardRoverDesc: "Learn Loops and IF-ELSE conditionals to minimize memory consumption while conquering firewall obstacles.",
                cardPixelTitle: "Pixel Decoder",
                cardPixelDesc: "Play as a hacker! Read Run-Length Encoded clues to paint pixel grids and recover encrypted visual files.",
                cardPixelArtTitle: "Pixel Art Coding",
                cardPixelArtDesc: "Practice reading numeric run-length sequences to reveal 10 charming hidden pixel art artworks!",
                badge10Levels: "10 Levels",
                btnBackHome: "Hub",
                levelLabel: "Difficulty",
                diffEasy: "Easy",
                diffMedium: "Medium",
                diffHard: "Hard",
                btnErase: "Erase",
                btnHint: "Hint",
                btnCheck: "Check Solution",
                footerAuthor: "Dr. Apisit Thongchai",
                footerTitle: "Interactive Educational Technology",
                footerHome: "Home",
                footerAbout: "About Author",
                footerSitemap: "Sitemap",
                footerSubtext: "Designed to advance inquiry-based learning and computational thinking.",
                modalHowtoHeader: "How to Play",
                modalHowtoConfirm: "Got it! Let's play",
                winTitleRegular: "Stage Complete!",
                winDescRegular: "Excellent solving in level {level}! Cleared in {time}",
                winNextBtn: "Next Level ➔",
                winTitleGrand: "👑 Master of Logic!",
                winDescGrand: "Incredible! You conquered all 10 difficulty stages of this game! Final stage time: {time}",
                winHomeBtn: "Return to Hub 🏠",
                instrSudoku: "💡 Select an empty cell, then click a number below or use keyboard 1-9 to fill unique digits.",
                instrTakuzu: "💡 Click cells to cycle ☀️ and 🌙. Max 2 adjacent, equal counts per row & column.",
                instrNonogram: "💡 Read edge clues to paint pixel art (Left-click fill, right-click mark ✕, or toggle tool).",
                instrCodePath: "💡 Arrange arrow commands to navigate 🤖 to ⭐ without hitting walls (Keyboard arrows supported).",
                instrBinary: "💡 Toggle bits (0/1) so row weights sum up to the yellow decimal target on the left.",
                instrLogic: "💡 Insert AND, OR, or XOR logic gates to yield a final output of 1 (True)."
            }
        };

        let currentLang = localStorage.getItem('cyber_logic_lang') || 'th';

        function setLanguage(lang) {
            currentLang = lang;
            localStorage.setItem('cyber_logic_lang', lang);
            document.documentElement.lang = lang;
            document.getElementById('lang-label').textContent = (lang === 'th') ? 'EN' : 'TH';

            const dict = i18n[lang];
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (dict[key]) el.textContent = dict[key];
            });

            if (currentGame) {
                updateLevelDisplay();
                updateInstructions();
            }
        }

        function toggleLanguage() {
            AudioSys.play('click');
            setLanguage(currentLang === 'th' ? 'en' : 'th');
        }

        /* --- CATEGORY FILTER TABS --- */
        function filterGames(category) {
            AudioSys.play('click');
            document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
            event.target.classList.add('active');

            const sections = document.querySelectorAll('[data-category]');
            sections.forEach(sec => {
                if (category === 'all' || sec.getAttribute('data-category') === category) {
                    sec.style.display = '';
                } else {
                    sec.style.display = 'none';
                }
            });
        }

        /* =========================================================================
           WEB AUDIO API PROCEDURAL AUDIO SYNTHESIZER
           ========================================================================= */
        const AudioSys = {
            ctx: null,
            enabled: localStorage.getItem('cyber_logic_sound') !== 'false',
            init() {
                if (!this.ctx) {
                    const AudioContext = window.AudioContext || window.webkitAudioContext;
                    this.ctx = new AudioContext();
                }
            },
            play(type) {
                if (!this.enabled) return;
                this.init();
                if (this.ctx.state === 'suspended') this.ctx.resume();

                const now = this.ctx.currentTime;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.connect(gain);
                gain.connect(this.ctx.destination);

                if (type === 'click') {
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(440, now);
                    osc.frequency.exponentialRampToValueAtTime(220, now + 0.05);
                    gain.gain.setValueAtTime(0.08, now);
                    gain.gain.linearRampToValueAtTime(0.001, now + 0.05);
                    osc.start(now);
                    osc.stop(now + 0.05);
                } else if (type === 'place') {
                    osc.type = 'triangle';
                    osc.frequency.setValueAtTime(523.25, now);
                    gain.gain.setValueAtTime(0.12, now);
                    gain.gain.linearRampToValueAtTime(0.001, now + 0.08);
                    osc.start(now);
                    osc.stop(now + 0.08);
                } else if (type === 'erase') {
                    osc.type = 'sawtooth';
                    osc.frequency.setValueAtTime(260, now);
                    osc.frequency.linearRampToValueAtTime(140, now + 0.08);
                    gain.gain.setValueAtTime(0.08, now);
                    gain.gain.linearRampToValueAtTime(0.001, now + 0.08);
                    osc.start(now);
                    osc.stop(now + 0.08);
                } else if (type === 'error') {
                    osc.type = 'sawtooth';
                    osc.frequency.setValueAtTime(160, now);
                    osc.frequency.setValueAtTime(110, now + 0.1);
                    gain.gain.setValueAtTime(0.16, now);
                    gain.gain.linearRampToValueAtTime(0.001, now + 0.25);
                    osc.start(now);
                    osc.stop(now + 0.25);
                } else if (type === 'hint') {
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(659.25, now);
                    osc.frequency.setValueAtTime(880.00, now + 0.08);
                    gain.gain.setValueAtTime(0.12, now);
                    gain.gain.linearRampToValueAtTime(0.001, now + 0.25);
                    osc.start(now);
                    osc.stop(now + 0.25);
                } else if (type === 'win') {
                    const notes = [523.25, 659.25, 783.99, 1046.50];
                    notes.forEach((freq, idx) => {
                        const o = this.ctx.createOscillator();
                        const g = this.ctx.createGain();
                        o.type = 'triangle';
                        o.frequency.setValueAtTime(freq, now + idx * 0.09);
                        g.gain.setValueAtTime(0.14, now + idx * 0.09);
                        g.gain.linearRampToValueAtTime(0.001, now + idx * 0.09 + 0.25);
                        o.connect(g);
                        g.connect(this.ctx.destination);
                        o.start(now + idx * 0.09);
                        o.stop(now + idx * 0.09 + 0.25);
                    });
                } else if (type === 'grandwin') {
                    const notes = [440, 554.37, 659.25, 880, 659.25, 880, 1108.73];
                    notes.forEach((freq, idx) => {
                        const o = this.ctx.createOscillator();
                        const g = this.ctx.createGain();
                        o.type = 'sine';
                        o.frequency.setValueAtTime(freq, now + idx * 0.11);
                        g.gain.setValueAtTime(0.18, now + idx * 0.11);
                        g.gain.linearRampToValueAtTime(0.001, now + idx * 0.11 + 0.35);
                        o.connect(g);
                        g.connect(this.ctx.destination);
                        o.start(now + idx * 0.11);
                        o.stop(now + idx * 0.11 + 0.35);
                    });
                }
            }
        };

        function toggleSound() {
            AudioSys.enabled = !AudioSys.enabled;
            localStorage.setItem('cyber_logic_sound', AudioSys.enabled);
            document.getElementById('btn-sound').textContent = AudioSys.enabled ? '🔊' : '🔇';
            AudioSys.play('click');
        }

        /* --- THEME TOGGLE --- */
        let isLight = localStorage.getItem('cyber_logic_theme') === 'light';
        if (isLight) document.body.classList.add('light-theme');

        function toggleTheme() {
            isLight = !isLight;
            document.body.classList.toggle('light-theme', isLight);
            localStorage.setItem('cyber_logic_theme', isLight ? 'light' : 'dark');
            document.getElementById('btn-theme').textContent = isLight ? '☀️' : '🌙';
            AudioSys.play('click');
        }

        /* --- FULLSCREEN TOGGLE --- */
        function toggleFullscreen() {
            AudioSys.play('click');
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(() => {});
            } else {
                if (document.exitFullscreen) document.exitFullscreen();
            }
        }

        /* --- CARD MOUSE TRACK GLOW EFFECT --- */
        document.querySelectorAll('.game-card').forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
            });
        });

        /* --- PARTICLE CANVAS FX (Confetti & Fireworks) --- */
        const canvas = document.getElementById('fx-canvas');
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animId = null;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Particle {
            constructor(x, y, color, type='confetti') {
                this.x = x; this.y = y; this.color = color; this.type = type;
                if (type === 'confetti') {
                    this.vx = (Math.random() - 0.5) * 12;
                    this.vy = (Math.random() - 0.8) * 15 - 5;
                    this.size = Math.random() * 8 + 6;
                    this.gravity = 0.3;
                    this.rot = Math.random() * 360;
                    this.vRot = (Math.random() - 0.5) * 10;
                } else {
                    const angle = Math.random() * Math.PI * 2;
                    const speed = Math.random() * 8 + 2;
                    this.vx = Math.cos(angle) * speed;
                    this.vy = Math.sin(angle) * speed;
                    this.size = Math.random() * 4 + 2;
                    this.gravity = 0.1;
                    this.alpha = 1;
                    this.decay = Math.random() * 0.02 + 0.015;
                }
            }
            update() {
                this.x += this.vx; this.y += this.vy; this.vy += this.gravity;
                if (this.type === 'confetti') {
                    this.rot += this.vRot; this.vx *= 0.98;
                } else {
                    this.vx *= 0.96; this.vy *= 0.96; this.alpha -= this.decay;
                }
            }
            draw() {
                ctx.save();
                if (this.type === 'confetti') {
                    ctx.translate(this.x, this.y);
                    ctx.rotate(this.rot * Math.PI / 180);
                    ctx.fillStyle = this.color;
                    ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size * 0.6);
                } else {
                    ctx.globalAlpha = Math.max(0, this.alpha);
                    ctx.fillStyle = this.color;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.restore();
            }
        }

        function triggerConfetti() {
            const colors = ['#06b6d4', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#ef4444'];
            for (let i = 0; i < 110; i++) {
                particles.push(new Particle(canvas.width / 2, canvas.height / 2 + 100, colors[Math.floor(Math.random() * colors.length)], 'confetti'));
            }
            if (!animId) loopFX();
        }

        function triggerFireworks() {
            const colors = ['#06b6d4', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#ffffff'];
            let count = 0;
            const interval = setInterval(() => {
                const fx = Math.random() * canvas.width * 0.8 + canvas.width * 0.1;
                const fy = Math.random() * canvas.height * 0.5 + canvas.height * 0.1;
                const color = colors[Math.floor(Math.random() * colors.length)];
                for (let i = 0; i < 55; i++) {
                    particles.push(new Particle(fx, fy, color, 'firework'));
                }
                if (!animId) loopFX();
                count++;
                if (count > 6) clearInterval(interval);
            }, 350);
        }

        function loopFX() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p, index) => {
                p.update(); p.draw();
                if (p.y > canvas.height + 50 || (p.type === 'firework' && p.alpha <= 0)) {
                    particles.splice(index, 1);
                }
            });
            if (particles.length > 0) animId = requestAnimationFrame(loopFX);
            else { cancelAnimationFrame(animId); animId = null; }
        }

        /* =========================================================================
           GAME STATE & STORAGE
           ========================================================================= */
        let currentGame = null;
        let currentLevel = 1;
        let hintsLeft = 3;
        let timerSeconds = 0;
        let timerInterval = null;
        let currentNonoTool = 1; // 1: fill, 2: mark

        const progress = JSON.parse(localStorage.getItem('cyber_logic_progress')) || {};
        ['sudoku', 'takuzu', 'nonogram', 'codepath', 'binary', 'logic'].forEach(g => {
            if (!progress[g]) progress[g] = [];
        });

        function saveProgress(game, level) {
            if (!progress[game]) progress[game] = [];
            if (!progress[game].includes(level)) {
                progress[game].push(level);
                localStorage.setItem('cyber_logic_progress', JSON.stringify(progress));
            }
        }

        /* --- VIEW CONTROLLER --- */
        function switchView(viewId) {
            AudioSys.play('click');
            document.querySelectorAll('.view').forEach(el => el.classList.remove('active'));
            const target = document.getElementById(`view-${viewId}`);
            if (target) target.classList.add('active');
            if (viewId === 'home') {
                stopTimer();
                currentGame = null;
            }
        }

        function selectGame(gameType, level = 1) {
            currentGame = gameType;
            startLevel(level);
        }

        function changeLevel(delta) {
            AudioSys.play('click');
            const target = currentLevel + delta;
            if (target >= 1 && target <= 10) {
                startLevel(target);
            }
        }

        /* =========================================================================
           ON-PAGE DIFFICULTY DISPLAY & STEPPER
           ========================================================================= */
        function updateLevelDisplay() {
            const dict = i18n[currentLang];
            const gameNames = {
                sudoku: dict.cardSudokuTitle,
                takuzu: dict.cardTakuzuTitle,
                nonogram: dict.cardNonogramTitle,
                codepath: dict.cardCodePathTitle,
                binary: dict.cardBinaryTitle,
                logic: dict.cardLogicTitle
            };

            const titleEl = document.getElementById('game-title-display');
            if (titleEl) titleEl.textContent = gameNames[currentGame] || '';

            // Update Level Count Display: "1 / 10"
            const countEl = document.getElementById('difficulty-count');
            if (countEl) countEl.textContent = `${currentLevel} / 10`;

            // Update Difficulty Tier Tag
            const diffEl = document.getElementById('difficulty-name');
            if (diffEl) {
                diffEl.classList.remove('diff-medium', 'diff-hard');
                if (currentLevel <= 3) {
                    diffEl.textContent = dict.diffEasy;
                } else if (currentLevel <= 7) {
                    diffEl.textContent = dict.diffMedium;
                    diffEl.classList.add('diff-medium');
                } else {
                    diffEl.textContent = dict.diffHard;
                    diffEl.classList.add('diff-hard');
                }
            }

            // Update Prev/Next buttons
            const prevBtn = document.getElementById('btn-prev-level');
            const nextBtn = document.getElementById('btn-next-level');
            if (prevBtn) prevBtn.disabled = (currentLevel <= 1);
            if (nextBtn) nextBtn.disabled = (currentLevel >= 10);
        }

        function updateInstructions() {
            const dict = i18n[currentLang];
            const box = document.getElementById('game-instructions');
            if (!box) return;

            const instrs = {
                sudoku: dict.instrSudoku,
                takuzu: dict.instrTakuzu,
                nonogram: dict.instrNonogram,
                codepath: dict.instrCodePath,
                binary: dict.instrBinary,
                logic: dict.instrLogic
            };
            box.textContent = instrs[currentGame] || '';
        }

        function startLevel(level) {
            currentLevel = level;
            hintsLeft = Math.max(1, 4 - Math.floor((level - 1) / 3));
            const hintCountEl = document.getElementById('hint-count');
            if (hintCountEl) hintCountEl.textContent = hintsLeft;

            updateLevelDisplay();
            updateInstructions();

            // Toggle Cockpit Panels
            document.getElementById('sudoku-numpad').style.display = (currentGame === 'sudoku') ? 'grid' : 'none';
            document.getElementById('codepath-controls').style.display = (currentGame === 'codepath') ? 'flex' : 'none';
            document.getElementById('logic-controls').style.display = (currentGame === 'logic') ? 'flex' : 'none';
            document.getElementById('general-controls').style.display = (currentGame === 'codepath') ? 'none' : 'flex';
            document.getElementById('nono-tools').style.display = (currentGame === 'nonogram') ? 'flex' : 'none';

            switchView('game');
            startTimer();

            // Generate & Render Game with Responsive Dimensions
            if (currentGame === 'sudoku') initSudoku(level);
            else if (currentGame === 'takuzu') initTakuzu(level);
            else if (currentGame === 'nonogram') initNonogram(level);
            else if (currentGame === 'codepath') initCodePath(level);
            else if (currentGame === 'binary') initBinary(level);
            else if (currentGame === 'logic') initLogic(level);
        }

        function resetCurrentGame() {
            AudioSys.play('click');
            startLevel(currentLevel);
        }

        function nextLevel() {
            document.getElementById('modal-win').classList.remove('active');
            AudioSys.play('click');
            if (currentLevel < 10) {
                startLevel(currentLevel + 1);
            } else {
                switchView('home');
            }
        }

        function startTimer() {
            stopTimer();
            timerSeconds = 0;
            updateTimerDisplay();
            timerInterval = setInterval(() => {
                timerSeconds++;
                updateTimerDisplay();
            }, 1000);
        }

        function stopTimer() {
            if (timerInterval) clearInterval(timerInterval);
        }

        function updateTimerDisplay() {
            const mins = String(Math.floor(timerSeconds / 60)).padStart(2, '0');
            const secs = String(timerSeconds % 60).padStart(2, '0');
            document.getElementById('timer-display').textContent = `${mins}:${secs}`;
        }

        function triggerWinModal(isGrand = false) {
            stopTimer();
            saveProgress(currentGame, currentLevel);
            
            const mins = String(Math.floor(timerSeconds / 60)).padStart(2, '0');
            const secs = String(timerSeconds % 60).padStart(2, '0');
            const timeStr = `${mins}:${secs}`;
            const dict = i18n[currentLang];

            const modal = document.getElementById('modal-win');
            const title = document.getElementById('modal-title');
            const desc = document.getElementById('modal-desc');
            const btn = document.getElementById('modal-next-btn');
            const icon = document.getElementById('modal-icon');

            if (isGrand) {
                AudioSys.play('grandwin');
                triggerFireworks();
                icon.textContent = '👑';
                title.textContent = dict.winTitleGrand;
                desc.textContent = dict.winDescGrand.replace('{time}', timeStr);
                btn.textContent = dict.winHomeBtn;
                btn.onclick = () => { modal.classList.remove('active'); switchView('home'); };
            } else {
                AudioSys.play('win');
                triggerConfetti();
                icon.textContent = '🎉';
                title.textContent = dict.winTitleRegular;
                desc.textContent = dict.winDescRegular.replace('{level}', currentLevel).replace('{time}', timeStr);
                btn.textContent = dict.winNextBtn;
                btn.onclick = nextLevel;
            }

            setTimeout(() => {
                modal.classList.add('active');
            }, 450);
        }

        /* --- HOW TO PLAY MODAL --- */
        function showHowToPlay() {
            const title = document.getElementById('howto-title-game');
            const desc = document.getElementById('howto-desc');
            const isTh = (currentLang === 'th');

            if (currentGame === 'sudoku') {
                title.textContent = isTh ? '(ซูโดกุ)' : '(Sudoku)';
                desc.innerHTML = isTh ? `
                    <ul style="padding-left: 1.5rem; margin-bottom: 1rem;">
                        <li>เติมตัวเลขลงในช่องว่าง (4x4, 6x6 หรือ 9x9 ตามระดับความยาก)</li>
                        <li>ตัวเลขในแต่ละ <strong>แถวแนวนอน</strong> ห้ามซ้ำกัน</li>
                        <li>ตัวเลขในแต่ละ <strong>แถวแนวตั้ง</strong> ห้ามซ้ำกัน</li>
                        <li>ตัวเลขในแต่ละ <strong>บล็อกย่อย</strong> ห้ามซ้ำกัน</li>
                    </ul>
                    <p style="color: var(--text-muted);">💡 วิธีการเล่น: แตะช่องที่ต้องการเติม จากนั้นแตะตัวเลขที่อยู่ด้านล่าง หรือกดเลข 1-9 บนแป้นพิมพ์</p>
                ` : `
                    <ul style="padding-left: 1.5rem; margin-bottom: 1rem;">
                        <li>Fill empty squares with digits (4x4, 6x6, or 9x9 based on difficulty).</li>
                        <li>Every <strong>row</strong> must contain unique digits.</li>
                        <li>Every <strong>column</strong> must contain unique digits.</li>
                        <li>Every <strong>subgrid</strong> must contain unique digits.</li>
                    </ul>
                    <p style="color: var(--text-muted);">💡 Controls: Tap a square, then tap a number below or press keys 1-9.</p>
                `;
            } else if (currentGame === 'takuzu') {
                title.textContent = isTh ? '(ตารางทาคูซุ)' : '(Takuzu Grid)';
                desc.innerHTML = isTh ? `
                    <ul style="padding-left: 1.5rem; margin-bottom: 1rem;">
                        <li>เติมสัญลักษณ์ ☀️ (พระอาทิตย์) หรือ 🌙 (พระจันทร์) ลงในช่องว่างให้ครบ</li>
                        <li><strong>ห้าม</strong> มีสัญลักษณ์เดียวกันเรียงติดกันเกิน 2 ตัว (เช่น ☀️☀️☀️ ไม่ได้)</li>
                        <li>จำนวนของ ☀️ และ 🌙 ในแต่ละแถวและคอลัมน์ต้อง <strong>เท่ากัน</strong> เสมอ</li>
                    </ul>
                    <p style="color: var(--text-muted);">💡 วิธีการเล่น: แตะที่ช่องว่างเพื่อสลับสัญลักษณ์ระหว่าง ☀️, 🌙 และช่องว่าง (หรือกด 0, 1 บนแป้นพิมพ์)</p>
                ` : `
                    <ul style="padding-left: 1.5rem; margin-bottom: 1rem;">
                        <li>Fill empty cells with ☀️ (Sun) or 🌙 (Moon).</li>
                        <li><strong>No more than 2</strong> identical symbols may be adjacent.</li>
                        <li>Each row and column must contain an <strong>equal number</strong> of ☀️ and 🌙.</li>
                    </ul>
                    <p style="color: var(--text-muted);">💡 Controls: Tap any cell to cycle through ☀️, 🌙, and empty (or press keys 0 and 1).</p>
                `;
            } else if (currentGame === 'nonogram') {
                title.textContent = isTh ? '(โนโนแกรม)' : '(Nonogram)';
                desc.innerHTML = isTh ? `
                    <ul style="padding-left: 1.5rem; margin-bottom: 1rem;">
                        <li>ระบายสีช่องเพื่อสร้างภาพที่ซ่อนอยู่ โดยใช้ <strong>ตัวเลขใบ้</strong> ที่อยู่ด้านบนและด้านซ้าย</li>
                        <li>ตัวเลขใบ้บอกถึง <strong>จำนวนช่องที่ต้องระบายสีติดกัน</strong> ในแถวหรือคอลัมน์นั้น</li>
                        <li>ถ้ามีตัวเลขหลายตัว เช่น "2 1" หมายความว่ามี 2 ช่องติดกัน และ 1 ช่อง โดยต้องมี <strong>ช่องว่างกั้นอย่างน้อย 1 ช่อง</strong></li>
                    </ul>
                    <p style="color: var(--text-muted);">💡 วิธีการเล่น: <br>- คลิกซ้าย/แตะ เพื่อระบายสี<br>- คลิกขวาเพื่อกากบาท ✕ หรือเลือกเครื่องมือ ✕ ด้านบนกระดานสำหรับมือถือ</p>
                ` : `
                    <ul style="padding-left: 1.5rem; margin-bottom: 1rem;">
                        <li>Shade grid cells to reveal a mystery pixel illustration.</li>
                        <li>Clue numbers on edges denote <strong>consecutive shaded runs</strong> in that row or column.</li>
                        <li>Multiple numbers (e.g. "2 1") must be separated by at least one space.</li>
                    </ul>
                    <p style="color: var(--text-muted);">💡 Controls: Left-click/tap to paint; right-click or use tool selector above board to mark ✕.</p>
                `;
            } else if (currentGame === 'codepath') {
                title.textContent = isTh ? '(เส้นทางโค้ด)' : '(Code Path)';
                desc.innerHTML = isTh ? `
                    <ul style="padding-left: 1.5rem; margin-bottom: 1rem;">
                        <li>นำทางน้องหุ่นยนต์ 🤖 จากจุดเริ่มต้น 🏠 ไปยังเป้าหมาย ⭐ โดยไม่ชนกำแพง 🧱</li>
                        <li>เรียงคำสั่งลูกศรเพื่อกำหนดทิศทางการเดิน</li>
                        <li>ถ้าสั่งเดินออกนอกกรอบหรือชนกำแพง ถือว่าเป็นบั๊ก! ต้องวางคำสั่งใหม่</li>
                    </ul>
                    <p style="color: var(--text-muted);">💡 วิธีการเล่น: กดเลือกลูกศรด้านล่าง หรือใช้ปุ่มลูกศรบนแป้นพิมพ์ จากนั้นกดปุ่ม <strong>▶️ RUN</strong></p>
                ` : `
                    <ul style="padding-left: 1.5rem; margin-bottom: 1rem;">
                        <li>Guide the robot 🤖 from start 🏠 to star goal ⭐ without hitting walls 🧱.</li>
                        <li>Build a sequence of directional commands.</li>
                        <li>Hitting a wall or boundary causes a runtime bug!</li>
                    </ul>
                    <p style="color: var(--text-muted);">💡 Controls: Tap direction arrows or use keyboard arrows to queue actions, then press <strong>▶️ RUN</strong>.</p>
                `;
            } else if (currentGame === 'binary') {
                title.textContent = isTh ? '(ถอดรหัสฐานสอง)' : '(Binary Decoder)';
                desc.innerHTML = isTh ? `
                    <ul style="padding-left: 1.5rem; margin-bottom: 1rem;">
                        <li>แปลงเลขฐานสองเป็นฐานสิบ! แต่ละช่องจากขวาไปซ้ายมีค่าน้ำหนัก 1, 2, 4, 8, 16...</li>
                        <li>เปิดไฟช่องบิต (1) เพื่อให้ผลรวมในแต่ละแถวเท่ากับตัวเลขเป้าหมายสีเหลืองทางซ้าย</li>
                        <li>ระบบจะแสดงผลรวมปัจจุบันแบบเรียลไทม์เพื่อช่วยให้คำนวณง่ายขึ้น</li>
                    </ul>
                    <p style="color: var(--text-muted);">💡 วิธีการเล่น: แตะที่ช่องเพื่อสลับ 0 และ 1 เมื่อครบแล้วกด "✨ ตรวจคำตอบ"</p>
                ` : `
                    <ul style="padding-left: 1.5rem; margin-bottom: 1rem;">
                        <li>Convert binary to decimal numbers! Column weights are 1, 2, 4, 8, 16...</li>
                        <li>Activate bits (1) so the horizontal sum equals the yellow target on the left.</li>
                        <li>Real-time sum indicators guide your calculations!</li>
                    </ul>
                    <p style="color: var(--text-muted);">💡 Controls: Tap cells to toggle 0 / 1, then press "✨ Check Solution".</p>
                `;
            } else if (currentGame === 'logic') {
                title.textContent = isTh ? '(วงจรตรรกะ)' : '(Logic Gates)';
                desc.innerHTML = isTh ? `
                    <ul style="padding-left: 1.5rem; margin-bottom: 1rem;">
                        <li>ออกแบบวงจรเกตตรรกะเพื่อให้สัญญาณวิ่งไปถึงปลายทางเป็น <strong>1 (True)</strong> เสมอ</li>
                        <li><strong>AND:</strong> ต้องเป็น 1 ทั้งสองเส้นถึงจะออกเป็น 1</li>
                        <li><strong>OR:</strong> เส้นใดเส้นหนึ่งเป็น 1 ก็ออกเป็น 1</li>
                        <li><strong>XOR:</strong> ทั้งสองเส้นต้องมีค่าต่างกันถึงจะออกเป็น 1</li>
                    </ul>
                    <p style="color: var(--text-muted);">💡 วิธีการเล่น: แตะที่กล่องเกตที่ว่างเปล่า แล้วเลือกชนิดเกตด้านล่าง</p>
                ` : `
                    <ul style="padding-left: 1.5rem; margin-bottom: 1rem;">
                        <li>Wire logic gates to produce a final output of <strong>1 (True)</strong>.</li>
                        <li><strong>AND:</strong> Outputs 1 only if both inputs are 1.</li>
                        <li><strong>OR:</strong> Outputs 1 if at least one input is 1.</li>
                        <li><strong>XOR:</strong> Outputs 1 if the two inputs are different.</li>
                    </ul>
                    <p style="color: var(--text-muted);">💡 Controls: Tap an empty gate node, then pick AND, OR, or XOR below.</p>
                `;
            }
            
            document.getElementById('modal-howto').classList.add('active');
            AudioSys.play('click');
        }

        function closeHowToPlay() {
            document.getElementById('modal-howto').classList.remove('active');
            AudioSys.play('click');
        }

        /* =========================================================================
           GAME 1: SUDOKU (ADAPTIVE WITH HIGHLIGHTS & KEYBOARD INPUT)
           ========================================================================= */
        let sudokuState = {
            size: 4,
            boxW: 2,
            boxH: 2,
            solution: [],
            grid: [],
            initial: [],
            selectedCell: null
        };

        function initSudoku(level) {
            let size = 4, boxW = 2, boxH = 2, emptyCells = 8;
            if (level >= 4 && level <= 7) { size = 6; boxW = 3; boxH = 2; emptyCells = 18 + (level - 4) * 2; }
            if (level >= 8) { size = 9; boxW = 3; boxH = 3; emptyCells = 38 + (level - 8) * 4; }

            sudokuState.size = size;
            sudokuState.boxW = boxW;
            sudokuState.boxH = boxH;
            sudokuState.selectedCell = null;

            const baseGrid = Array.from({length: size}, () => Array(size).fill(0));
            const nums = Array.from({length: size}, (_, i) => i + 1).sort(() => Math.random() - 0.5);
            
            for (let r = 0; r < size; r++) {
                for (let c = 0; c < size; c++) {
                    const shift = (r % boxH) * boxW + Math.floor(r / boxH);
                    baseGrid[r][c] = nums[(c + shift) % size];
                }
            }

            for (let b = 0; b < size; b += boxH) {
                if (Math.random() > 0.5 && boxH > 1) {
                    const temp = baseGrid[b];
                    baseGrid[b] = baseGrid[b+1];
                    baseGrid[b+1] = temp;
                }
            }

            sudokuState.solution = baseGrid.map(row => [...row]);
            sudokuState.grid = baseGrid.map(row => [...row]);

            let removed = 0;
            while (removed < emptyCells) {
                const r = Math.floor(Math.random() * size);
                const c = Math.floor(Math.random() * size);
                if (sudokuState.grid[r][c] !== 0) {
                    sudokuState.grid[r][c] = 0;
                    removed++;
                }
            }
            sudokuState.initial = sudokuState.grid.map(row => [...row]);

            const numpad = document.getElementById('sudoku-numpad');
            numpad.style.gridTemplateColumns = `repeat(${Math.min(5, size + 1)}, 1fr)`;
            const btns = numpad.querySelectorAll('.num-btn');
            btns.forEach((btn, idx) => {
                if (idx < size) { btn.style.display = 'block'; btn.textContent = idx + 1; }
                else if (idx === 9) { btn.style.display = 'block'; }
                else { btn.style.display = 'none'; }
            });

            renderSudokuBoard();
        }

        function renderSudokuBoard() {
            const board = document.getElementById('board-area');
            board.innerHTML = '';
            const gridEl = document.createElement('div');
            gridEl.className = 'sudoku-grid';
            const size = sudokuState.size;
            gridEl.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

            const cellSize = size === 4 ? 72 : (size === 6 ? 56 : 42);
            gridEl.style.setProperty('--sudoku-cell-size', `${cellSize}px`);

            for (let r = 0; r < size; r++) {
                for (let c = 0; c < size; c++) {
                    const cell = document.createElement('div');
                    cell.className = 'sudoku-cell';
                    const val = sudokuState.grid[r][c];
                    if (val !== 0) cell.textContent = val;
                    if (sudokuState.initial[r][c] !== 0) cell.classList.add('fixed');

                    if ((c + 1) % sudokuState.boxW === 0 && c !== size - 1) cell.style.borderRight = '3px solid var(--text-main)';
                    if ((r + 1) % sudokuState.boxH === 0 && r !== size - 1) cell.style.borderBottom = '3px solid var(--text-main)';

                    cell.onclick = () => selectSudokuCell(r, c, cell);
                    gridEl.appendChild(cell);
                }
            }
            board.appendChild(gridEl);
        }

        function selectSudokuCell(r, c, el) {
            AudioSys.play('click');
            document.querySelectorAll('.sudoku-cell').forEach(cellEl => {
                cellEl.classList.remove('selected', 'highlight', 'same-number');
            });
            sudokuState.selectedCell = { r, c, el };
            el.classList.add('selected');

            const selectedVal = sudokuState.grid[r][c];
            const cells = document.querySelectorAll('.sudoku-cell');
            cells.forEach((cellEl, idx) => {
                const cr = Math.floor(idx / sudokuState.size);
                const cc = idx % sudokuState.size;
                if (cr === r || cc === c) cellEl.classList.add('highlight');
                if (selectedVal !== 0 && sudokuState.grid[cr][cc] === selectedVal) {
                    cellEl.classList.add('same-number');
                }
            });
        }

        function inputSudoku(num) {
            if (!sudokuState.selectedCell) return;
            const { r, c, el } = sudokuState.selectedCell;
            if (sudokuState.initial[r][c] !== 0) return;

            sudokuState.grid[r][c] = num;
            el.textContent = num === 0 ? '' : num;
            el.classList.remove('error');
            AudioSys.play(num === 0 ? 'erase' : 'place');

            // Re-highlight matching numbers
            selectSudokuCell(r, c, el);
        }

        /* =========================================================================
           GAME 2: TAKUZU (ADAPTIVE SUN & MOON)
           ========================================================================= */
        let takuzuState = {
            size: 4,
            grid: [],
            initial: [],
            solution: []
        };

        function initTakuzu(level) {
            let size = 4;
            if (level >= 4 && level <= 7) size = 6;
            if (level >= 8) size = 8;
            takuzuState.size = size;

            const sol = Array.from({length: size}, () => Array(size).fill(-1));
            solveTakuzu(sol, 0, 0, size);
            takuzuState.solution = sol.map(row => [...row]);
            takuzuState.grid = sol.map(row => [...row]);

            let cluesToRemove = Math.floor(size * size * (0.45 + (level % 3) * 0.08));
            while (cluesToRemove > 0) {
                const r = Math.floor(Math.random() * size);
                const c = Math.floor(Math.random() * size);
                if (takuzuState.grid[r][c] !== -1) {
                    takuzuState.grid[r][c] = -1;
                    cluesToRemove--;
                }
            }
            takuzuState.initial = takuzuState.grid.map(row => [...row]);
            renderTakuzuBoard();
        }

        function solveTakuzu(grid, r, c, size) {
            if (r === size) return true;
            const nextR = c === size - 1 ? r + 1 : r;
            const nextC = c === size - 1 ? 0 : c + 1;

            const vals = [0, 1].sort(() => Math.random() - 0.5);
            for (let v of vals) {
                if (isValidTakuzuMove(grid, r, c, v, size)) {
                    grid[r][c] = v;
                    if (solveTakuzu(grid, nextR, nextC, size)) return true;
                    grid[r][c] = -1;
                }
            }
            return false;
        }

        function isValidTakuzuMove(grid, r, c, v, size) {
            if (c >= 2 && grid[r][c-1] === v && grid[r][c-2] === v) return false;
            if (r >= 2 && grid[r-1][c] === v && grid[r-2][c] === v) return false;
            let countRow = 0, countCol = 0;
            for (let i = 0; i < c; i++) if (grid[r][i] === v) countRow++;
            for (let i = 0; i < r; i++) if (grid[i][c] === v) countCol++;
            if (countRow >= size / 2 || countCol >= size / 2) return false;
            return true;
        }

        function renderTakuzuBoard() {
            const board = document.getElementById('board-area');
            board.innerHTML = '';
            const gridEl = document.createElement('div');
            gridEl.className = 'takuzu-grid';
            const size = takuzuState.size;
            gridEl.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

            const cellSize = size === 4 ? 78 : (size === 6 ? 58 : 46);
            gridEl.style.setProperty('--takuzu-cell-size', `${cellSize}px`);

            for (let r = 0; r < size; r++) {
                for (let c = 0; c < size; c++) {
                    const cell = document.createElement('div');
                    cell.className = 'takuzu-cell';
                    const val = takuzuState.grid[r][c];
                    updateTakuzuCellUI(cell, val);

                    if (takuzuState.initial[r][c] !== -1) {
                        cell.classList.add('fixed');
                    } else {
                        cell.onclick = () => {
                            let nextVal = takuzuState.grid[r][c] === -1 ? 0 : (takuzuState.grid[r][c] === 0 ? 1 : -1);
                            takuzuState.grid[r][c] = nextVal;
                            updateTakuzuCellUI(cell, nextVal);
                            cell.classList.remove('error');
                            AudioSys.play(nextVal === -1 ? 'erase' : 'place');
                        };
                    }
                    gridEl.appendChild(cell);
                }
            }
            board.appendChild(gridEl);
        }

        function updateTakuzuCellUI(cell, val) {
            cell.classList.remove('val-0', 'val-1');
            if (val === 0) { cell.textContent = '☀️'; cell.classList.add('val-0'); }
            else if (val === 1) { cell.textContent = '🌙'; cell.classList.add('val-1'); }
            else { cell.textContent = ''; }
        }

        /* =========================================================================
           GAME 3: NONOGRAM (TOUCH-OPTIMIZED TOOL SWITCHER)
           ========================================================================= */
        let nonoState = {
            size: 5,
            solution: [],
            grid: [],
            rowHints: [],
            colHints: []
        };

        function setNonoTool(tool) {
            currentNonoTool = tool;
            AudioSys.play('click');
            document.querySelectorAll('.nono-tool-btn').forEach(btn => btn.classList.remove('active'));
            if (tool === 1) document.getElementById('tool-fill').classList.add('active');
            else document.getElementById('tool-mark').classList.add('active');
        }

        function initNonogram(level) {
            let size = 5;
            if (level >= 4 && level <= 7) size = 7;
            if (level >= 8) size = 10;
            nonoState.size = size;

            let valid = false;
            while (!valid) {
                nonoState.solution = Array.from({length: size}, () => Array.from({length: size}, () => Math.random() > 0.4 ? 1 : 0));
                valid = nonoState.solution.every(row => row.some(x => x === 1)) &&
                        Array.from({length: size}, (_, c) => nonoState.solution.some(row => row[c] === 1)).every(Boolean);
            }

            nonoState.grid = Array.from({length: size}, () => Array(size).fill(0));
            nonoState.rowHints = nonoState.solution.map(row => getLineHints(row));
            nonoState.colHints = Array.from({length: size}, (_, c) => getLineHints(nonoState.solution.map(r => r[c])));

            renderNonogramBoard();
        }

        function getLineHints(line) {
            let hints = [], count = 0;
            for (let x of line) {
                if (x === 1) count++;
                else if (count > 0) { hints.push(count); count = 0; }
            }
            if (count > 0 || hints.length === 0) hints.push(count || 0);
            return hints;
        }

        function renderNonogramBoard() {
            const board = document.getElementById('board-area');
            board.innerHTML = '';
            const size = nonoState.size;

            const cellSize = size === 5 ? 56 : (size === 7 ? 44 : 34);
            const leftWidth = size === 5 ? 75 : (size === 7 ? 90 : 105);

            const wrapper = document.createElement('div');
            wrapper.className = 'nonogram-wrapper';
            wrapper.style.setProperty('--nono-cell-size', `${cellSize}px`);

            const topEl = document.createElement('div');
            topEl.className = 'nono-top';
            topEl.style.marginLeft = `${leftWidth}px`;

            for (let c = 0; c < size; c++) {
                const hintEl = document.createElement('div');
                hintEl.className = 'nono-col-hint';
                hintEl.style.width = `${cellSize}px`;
                hintEl.innerHTML = nonoState.colHints[c].join('<br>');
                topEl.appendChild(hintEl);
            }
            wrapper.appendChild(topEl);

            const btmEl = document.createElement('div');
            btmEl.className = 'nono-bottom';

            const leftEl = document.createElement('div');
            leftEl.className = 'nono-left-hints';
            leftEl.style.width = `${leftWidth}px`;

            for (let r = 0; r < size; r++) {
                const hintEl = document.createElement('div');
                hintEl.className = 'nono-row-hint';
                hintEl.style.height = `${cellSize}px`;
                hintEl.textContent = nonoState.rowHints[r].join(' ');
                leftEl.appendChild(hintEl);
            }
            btmEl.appendChild(leftEl);

            const gridEl = document.createElement('div');
            gridEl.className = 'nonogram-grid';
            gridEl.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
            gridEl.oncontextmenu = (e) => e.preventDefault();

            for (let r = 0; r < size; r++) {
                for (let c = 0; c < size; c++) {
                    const cell = document.createElement('div');
                    cell.className = 'nono-cell';
                    if ((c + 1) % 5 === 0 && c !== size - 1) cell.style.borderRight = '2px solid var(--accent-cyan)';
                    if ((r + 1) % 5 === 0 && r !== size - 1) cell.style.borderBottom = '2px solid var(--accent-cyan)';

                    cell.onclick = () => {
                        if (currentNonoTool === 1) {
                            nonoState.grid[r][c] = nonoState.grid[r][c] === 1 ? 0 : 1;
                            AudioSys.play(nonoState.grid[r][c] === 0 ? 'erase' : 'place');
                        } else {
                            nonoState.grid[r][c] = nonoState.grid[r][c] === 2 ? 0 : 2;
                            AudioSys.play('click');
                        }
                        updateNonoCellUI(cell, nonoState.grid[r][c]);
                    };
                    cell.oncontextmenu = (e) => {
                        e.preventDefault();
                        nonoState.grid[r][c] = nonoState.grid[r][c] === 2 ? 0 : 2;
                        updateNonoCellUI(cell, nonoState.grid[r][c]);
                        AudioSys.play('click');
                    };

                    gridEl.appendChild(cell);
                }
            }
            btmEl.appendChild(gridEl);
            wrapper.appendChild(btmEl);
            board.appendChild(wrapper);
        }

        function updateNonoCellUI(cell, val) {
            cell.classList.remove('filled', 'marked', 'error');
            if (val === 1) cell.classList.add('filled');
            if (val === 2) cell.classList.add('marked');
        }

        /* =========================================================================
           GLOBAL GAME ACTIONS (HINT & CHECK SOLUTION)
           ========================================================================= */
        function useHint() {
            if (hintsLeft <= 0) {
                AudioSys.play('error');
                return;
            }

            let applied = false;
            if (currentGame === 'sudoku') {
                for (let r = 0; r < sudokuState.size && !applied; r++) {
                    for (let c = 0; c < sudokuState.size && !applied; c++) {
                        if (sudokuState.grid[r][c] === 0 || sudokuState.grid[r][c] !== sudokuState.solution[r][c]) {
                            sudokuState.grid[r][c] = sudokuState.solution[r][c];
                            sudokuState.initial[r][c] = sudokuState.solution[r][c];
                            applied = true;
                        }
                    }
                }
                if (applied) renderSudokuBoard();
            } else if (currentGame === 'takuzu') {
                for (let r = 0; r < takuzuState.size && !applied; r++) {
                    for (let c = 0; c < takuzuState.size && !applied; c++) {
                        if (takuzuState.grid[r][c] === -1 || takuzuState.grid[r][c] !== takuzuState.solution[r][c]) {
                            takuzuState.grid[r][c] = takuzuState.solution[r][c];
                            takuzuState.initial[r][c] = takuzuState.solution[r][c];
                            applied = true;
                        }
                    }
                }
                if (applied) renderTakuzuBoard();
            } else if (currentGame === 'nonogram') {
                for (let r = 0; r < nonoState.size && !applied; r++) {
                    for (let c = 0; c < nonoState.size && !applied; c++) {
                        const target = nonoState.solution[r][c];
                        const current = nonoState.grid[r][c] === 1 ? 1 : 0;
                        if (current !== target) {
                            nonoState.grid[r][c] = target === 1 ? 1 : 2;
                            applied = true;
                        }
                    }
                }
                if (applied) {
                    const cells = document.querySelectorAll('.nono-cell');
                    cells.forEach((cell, idx) => {
                        const r = Math.floor(idx / nonoState.size);
                        const c = idx % nonoState.size;
                        updateNonoCellUI(cell, nonoState.grid[r][c]);
                    });
                }
            }

            if (applied) {
                hintsLeft--;
                document.getElementById('hint-count').textContent = hintsLeft;
                AudioSys.play('hint');
                setTimeout(checkSolution, 300);
            }
        }

        /* =========================================================================
           GAME 4: CODE PATH (KEYBOARD SUPPORT & SMOOTH RUNNER)
           ========================================================================= */
        let codepathState = { size: 5, grid: [], start: {r:0, c:0}, target: {r:4, c:4}, robot: {r:0, c:0}, sequence: [], maxBlocks: 5 };

        function getCodePathDist(grid, size, start, target) {
            let queue = [{r: start.r, c: start.c, dist: 0}];
            let visited = Array.from({length: size}, () => Array(size).fill(false));
            visited[start.r][start.c] = true;
            let head = 0;
            while (head < queue.length) {
                let curr = queue[head++];
                if (curr.r === target.r && curr.c === target.c) return curr.dist;
                const dirs = [[-1,0],[1,0],[0,-1],[0,1]];
                for (let d of dirs) {
                    let nr = curr.r + d[0]; let nc = curr.c + d[1];
                    if (nr >= 0 && nr < size && nc >= 0 && nc < size && grid[nr][nc] === 0 && !visited[nr][nc]) {
                        visited[nr][nc] = true;
                        queue.push({r: nr, c: nc, dist: curr.dist + 1});
                    }
                }
            }
            return -1;
        }

        function initCodePath(level) {
            let size = 5; let maxBlocks = 12;
            if (level >= 4 && level <= 7) { size = 7; maxBlocks = 18; }
            if (level >= 8) { size = 9; maxBlocks = 26; }
            codepathState.size = size; codepathState.maxBlocks = maxBlocks; codepathState.sequence = [];
            codepathState.start = {r: 0, c: 0}; codepathState.target = {r: size - 1, c: size - 1};
            codepathState.robot = {r: 0, c: 0};
            
            let valid = false;
            while (!valid) {
                codepathState.grid = Array.from({length: size}, () => Array(size).fill(0));
                let numWalls = Math.floor(size * size * 0.25);
                while (numWalls > 0) {
                    const r = Math.floor(Math.random() * size); const c = Math.floor(Math.random() * size);
                    if ((r === 0 && c === 0) || (r === size - 1 && c === size - 1) || codepathState.grid[r][c] === 1) continue;
                    codepathState.grid[r][c] = 1; numWalls--;
                }
                
                let dist = getCodePathDist(codepathState.grid, size, codepathState.start, codepathState.target);
                if (dist !== -1 && dist <= maxBlocks) {
                    valid = true;
                }
            }
            renderCodePathBoard(); renderCodeSequence();
        }

        function renderCodePathBoard() {
            const board = document.getElementById('board-area'); board.innerHTML = '';
            const gridEl = document.createElement('div'); gridEl.className = 'codepath-grid';
            const size = codepathState.size;

            const cellSize = size === 5 ? 68 : (size === 7 ? 52 : 40);
            gridEl.style.setProperty('--codepath-cell-size', `${cellSize}px`);
            gridEl.style.gridTemplateColumns = `repeat(${size}, max-content)`;
            gridEl.style.gridTemplateRows = `repeat(${size}, max-content)`;

            for (let r = 0; r < size; r++) {
                for (let c = 0; c < size; c++) {
                    const cell = document.createElement('div'); cell.className = 'codepath-cell';
                    if (r === codepathState.start.r && c === codepathState.start.c) { cell.classList.add('start'); cell.innerHTML = '🏠'; }
                    else if (r === codepathState.target.r && c === codepathState.target.c) { cell.classList.add('target'); cell.innerHTML = '★'; cell.style.color = '#f59e0b'; }
                    else if (codepathState.grid[r][c] === 1) { cell.classList.add('wall'); cell.innerHTML = '🧱'; }
                    gridEl.appendChild(cell);
                }
            }
            const robot = document.createElement('div'); robot.id = 'robot'; robot.innerHTML = '🤖';
            gridEl.appendChild(robot); board.appendChild(gridEl);
            updateRobotPosition();
        }

        function updateRobotPosition() {
            const robot = document.getElementById('robot'); if (!robot) return;
            const cells = document.querySelectorAll('.codepath-cell');
            if (cells.length === 0) return;
            const cellIndex = codepathState.robot.r * codepathState.size + codepathState.robot.c;
            const cell = cells[cellIndex];
            if (cell) {
                robot.style.width = cell.offsetWidth + 'px';
                robot.style.height = cell.offsetHeight + 'px';
                robot.style.left = cell.offsetLeft + 'px';
                robot.style.top = cell.offsetTop + 'px';
            }
        }

        function addCodeBlock(dir) {
            AudioSys.play('click');
            if (codepathState.sequence.length >= codepathState.maxBlocks) return;
            codepathState.sequence.push(dir); renderCodeSequence();
        }

        function removeCodeBlock(index = -1) {
            if (codepathState.sequence.length === 0) return;
            AudioSys.play('erase');
            if (index >= 0) codepathState.sequence.splice(index, 1);
            else codepathState.sequence.pop();
            renderCodeSequence();
        }

        function renderCodeSequence() {
            const container = document.getElementById('code-sequence'); container.innerHTML = '';
            const icons = { 'UP': '⬆️', 'DOWN': '⬇️', 'LEFT': '⬅️', 'RIGHT': '➡️' };
            codepathState.sequence.forEach((dir, idx) => {
                const el = document.createElement('div'); el.className = 'code-block';
                el.textContent = icons[dir];
                el.title = `คลิกเพื่อลบบล็อกที่ ${idx + 1}`;
                el.onclick = () => removeCodeBlock(idx);
                container.appendChild(el);
            });
            for (let i = codepathState.sequence.length; i < codepathState.maxBlocks; i++) {
                const el = document.createElement('div'); el.className = 'code-block';
                el.style.background = 'transparent'; el.style.border = '2px dashed var(--glass-border)';
                el.style.boxShadow = 'none'; container.appendChild(el);
            }
        }

        function runCodePath() {
            AudioSys.play('click');
            let r = codepathState.start.r; let c = codepathState.start.c;
            codepathState.robot = {r, c}; updateRobotPosition();
            let step = 0; const blocks = document.querySelectorAll('.code-block');
            
            function nextStep() {
                if (step > 0 && step <= codepathState.sequence.length) blocks[step-1].classList.remove('active');
                if (step < codepathState.sequence.length) {
                    blocks[step].classList.add('active');
                    const dir = codepathState.sequence[step];
                    if (dir === 'UP') r--; if (dir === 'DOWN') r++; if (dir === 'LEFT') c--; if (dir === 'RIGHT') c++;
                    if (r < 0 || r >= codepathState.size || c < 0 || c >= codepathState.size || codepathState.grid[r][c] === 1) {
                        AudioSys.play('error');
                        setTimeout(() => {
                            if (blocks[step]) blocks[step].classList.remove('active');
                            codepathState.robot = {r: codepathState.start.r, c: codepathState.start.c};
                            updateRobotPosition();
                        }, 450); return;
                    }
                    codepathState.robot = {r, c}; updateRobotPosition(); AudioSys.play('place'); step++;
                    setTimeout(nextStep, 380);
                } else {
                    if (r === codepathState.target.r && c === codepathState.target.c) triggerWinModal(currentLevel === 10);
                    else {
                        AudioSys.play('error');
                        setTimeout(() => {
                            codepathState.robot = {r: codepathState.start.r, c: codepathState.start.c};
                            updateRobotPosition();
                        }, 450);
                    }
                }
            }
            setTimeout(nextStep, 380);
        }

        /* =========================================================================
           GAME 5: BINARY DECODER (WITH REAL-TIME RUNNING SUM CALCULATOR)
           ========================================================================= */
        let binaryState = { size: 4, grid: [], solution: [], rowHints: [] };
        function initBinary(level) {
            let size = 4; if (level >= 4 && level <= 7) size = 5; if (level >= 8) size = 6;
            binaryState.size = size;
            binaryState.solution = Array.from({length: size}, () => Array.from({length: size}, () => Math.random() > 0.5 ? 1 : 0));
            binaryState.grid = Array.from({length: size}, () => Array(size).fill(0));
            binaryState.rowHints = [];
            for (let r = 0; r < size; r++) {
                let sum = 0;
                for (let c = 0; c < size; c++) if (binaryState.solution[r][c] === 1) sum += Math.pow(2, size - 1 - c);
                binaryState.rowHints.push(sum);
            }
            renderBinaryBoard();
        }

        function renderBinaryBoard() {
            const board = document.getElementById('board-area'); board.innerHTML = '';
            const size = binaryState.size;

            const cellSize = size === 4 ? 72 : (size === 5 ? 60 : 50);

            const wrapper = document.createElement('div');
            wrapper.className = 'binary-grid-wrapper';
            wrapper.style.setProperty('--bin-cell-size', `${cellSize}px`);

            const leftHints = document.createElement('div');
            leftHints.className = 'binary-left-hints';

            for (let r = 0; r < size; r++) {
                const box = document.createElement('div');
                box.className = 'binary-row-hint-box';
                box.style.height = `${cellSize}px`;
                box.innerHTML = `
                    <div class="binary-row-target">${binaryState.rowHints[r]}</div>
                    <div class="binary-row-current" id="bin-sum-${r}">(รวม: 0)</div>
                `;
                leftHints.appendChild(box);
            }

            const rightPart = document.createElement('div');
            const topHints = document.createElement('div');
            topHints.style.display = 'flex';
            topHints.style.flexDirection = 'row';

            for (let c = 0; c < size; c++) {
                const val = Math.pow(2, size - 1 - c);
                const h = document.createElement('div');
                h.className = 'binary-col-hint';
                h.style.width = `${cellSize}px`;
                h.textContent = val;
                topHints.appendChild(h);
            }

            const gridEl = document.createElement('div');
            gridEl.className = 'binary-grid';
            gridEl.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

            for (let r = 0; r < size; r++) {
                for (let c = 0; c < size; c++) {
                    const cell = document.createElement('div');
                    cell.className = 'binary-cell';
                    cell.style.width = `${cellSize}px`;
                    cell.style.height = `${cellSize}px`;
                    cell.textContent = '0';
                    cell.onclick = () => toggleBinaryCell(r, c, cell);
                    gridEl.appendChild(cell);
                }
            }
            rightPart.appendChild(topHints);
            rightPart.appendChild(gridEl);
            wrapper.appendChild(leftHints);
            wrapper.appendChild(rightPart);
            board.appendChild(wrapper);
            updateBinarySums();
        }

        function toggleBinaryCell(r, c, el) {
            AudioSys.play('click');
            if (binaryState.grid[r][c] === 0) {
                binaryState.grid[r][c] = 1;
                el.classList.add('on');
                el.textContent = '1';
                AudioSys.play('place');
            } else {
                binaryState.grid[r][c] = 0;
                el.classList.remove('on');
                el.textContent = '0';
                AudioSys.play('erase');
            }
            updateBinarySums();
        }

        function updateBinarySums() {
            const size = binaryState.size;
            for (let r = 0; r < size; r++) {
                let currentSum = 0;
                for (let c = 0; c < size; c++) {
                    if (binaryState.grid[r][c] === 1) currentSum += Math.pow(2, size - 1 - c);
                }
                const sumEl = document.getElementById(`bin-sum-${r}`);
                if (sumEl) {
                    const target = binaryState.rowHints[r];
                    sumEl.classList.remove('match', 'over');
                    if (currentSum === target) {
                        sumEl.textContent = `(รวม: ${currentSum} ✅)`;
                        sumEl.classList.add('match');
                    } else if (currentSum > target) {
                        sumEl.textContent = `(รวม: ${currentSum} ⚠️)`;
                        sumEl.classList.add('over');
                    } else {
                        sumEl.textContent = `(รวม: ${currentSum})`;
                    }
                }
            }
        }

        /* =========================================================================
           GAME 6: LOGIC GATE CIRCUIT (INTERACTIVE & CLEAN WIRES)
           ========================================================================= */
        let logicState = { level: 1, gates: [], selectedNode: null };
        function initLogic(level) {
            logicState.level = level; logicState.gates = []; logicState.selectedNode = null;
            const board = document.getElementById('board-area'); board.innerHTML = '';
            const gridEl = document.createElement('div'); gridEl.className = 'logic-grid';
            let nodes = [];
            
            if (level <= 4) {
                gridEl.style.width = '420px'; gridEl.style.height = '170px';
                let i1 = Math.random() > 0.5 ? 1 : 0;
                let i2 = Math.random() > 0.5 ? 1 : 0;
                if (i1 === 0 && i2 === 0) i1 = 1;
                nodes.push({ id: 0, type: 'IN', val: i1, x: 0, y: 0.1 });
                nodes.push({ id: 1, type: 'IN', val: i2, x: 0, y: 1.1 });
                nodes.push({ id: 2, type: 'GATE', val: null, x: 1.6, y: 0.6, inputs: [0, 1] });
                nodes.push({ id: 3, type: 'OUT', val: null, x: 3.2, y: 0.6, inputs: [2] });
            } else if (level <= 7) {
                gridEl.style.width = '420px'; gridEl.style.height = '250px';
                let i1 = Math.random() > 0.5 ? 1 : 0;
                let i2 = Math.random() > 0.5 ? 1 : 0;
                let i3 = Math.random() > 0.5 ? 1 : 0;
                if (i1 === 0 && i2 === 0 && i3 === 0) i2 = 1;
                nodes.push({ id: 0, type: 'IN', val: i1, x: 0, y: 0 });
                nodes.push({ id: 1, type: 'IN', val: i2, x: 0, y: 1 });
                nodes.push({ id: 2, type: 'IN', val: i3, x: 0, y: 2 });
                nodes.push({ id: 3, type: 'GATE', val: null, x: 1.6, y: 0.5, inputs: [0, 1] });
                nodes.push({ id: 4, type: 'GATE', val: null, x: 1.6, y: 1.5, inputs: [1, 2] });
                nodes.push({ id: 5, type: 'OUT', val: null, x: 3.2, y: 1, inputs: [3, 4] });
            } else {
                gridEl.style.width = '520px'; gridEl.style.height = '330px';
                let i1 = Math.random() > 0.5 ? 1 : 0, i2 = Math.random() > 0.5 ? 1 : 0;
                let i3 = Math.random() > 0.5 ? 1 : 0, i4 = Math.random() > 0.5 ? 1 : 0;
                if (i1 === 0 && i2 === 0 && i3 === 0 && i4 === 0) { i1 = 1; i3 = 1; }
                nodes.push({ id: 0, type: 'IN', val: i1, x: 0, y: 0 });
                nodes.push({ id: 1, type: 'IN', val: i2, x: 0, y: 1 });
                nodes.push({ id: 2, type: 'IN', val: i3, x: 0, y: 2 });
                nodes.push({ id: 3, type: 'IN', val: i4, x: 0, y: 3 });
                nodes.push({ id: 4, type: 'GATE', val: null, x: 1.3, y: 0.5, inputs: [0, 1] });
                nodes.push({ id: 5, type: 'GATE', val: null, x: 1.3, y: 2.5, inputs: [2, 3] });
                nodes.push({ id: 6, type: 'GATE', val: null, x: 2.8, y: 1.5, inputs: [4, 5] });
                nodes.push({ id: 7, type: 'OUT', val: null, x: 4.1, y: 1.5, inputs: [6] });
            }
            logicState.gates = nodes;
            
            nodes.forEach(n => {
                if (n.inputs) {
                    n.inputs.forEach(inId => {
                        const wire = document.createElement('div'); wire.className = 'logic-wire';
                        wire.id = `wire-${inId}-${n.id}`; gridEl.appendChild(wire);
                    });
                }
            });

            nodes.forEach(n => {
                const el = document.createElement('div'); el.className = 'logic-node'; el.id = `node-${n.id}`;
                el.style.position = 'absolute'; el.style.left = (n.x * 105) + 'px'; el.style.top = (n.y * 78) + 'px';
                if (n.type === 'IN') {
                    el.classList.add('input-node'); if (n.val === 1) el.classList.add('on'); el.textContent = n.val;
                    el.title = "แตะเพื่อสลับ 0 / 1";
                    el.onclick = () => {
                        n.val = n.val === 1 ? 0 : 1;
                        el.textContent = n.val;
                        el.classList.toggle('on', n.val === 1);
                        AudioSys.play('click');
                        evaluateLogic();
                    };
                } else if (n.type === 'OUT') {
                    el.classList.add('output-node'); el.textContent = '?';
                } else {
                    el.classList.add('gate-node');
                    el.onclick = () => {
                        document.querySelectorAll('.gate-node').forEach(g => g.style.borderColor = 'var(--glass-border)');
                        el.style.borderColor = 'var(--accent-cyan)'; logicState.selectedNode = n.id; AudioSys.play('click');
                    };
                }
                gridEl.appendChild(el);
            });
            board.appendChild(gridEl);
            
            setTimeout(() => {
                nodes.forEach(n => {
                    if (n.inputs) {
                        n.inputs.forEach(inId => {
                            const wire = document.getElementById(`wire-${inId}-${n.id}`);
                            const outEl = document.getElementById(`node-${inId}`); const inEl = document.getElementById(`node-${n.id}`);
                            if (!wire || !outEl || !inEl) return;
                            const x1 = outEl.offsetLeft + 64; const y1 = outEl.offsetTop + 32;
                            const x2 = inEl.offsetLeft; const y2 = inEl.offsetTop + 32;
                            const length = Math.sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1));
                            const angle = Math.atan2(y2-y1, x2-x1) * 180 / Math.PI;
                            wire.style.left = x1 + 'px'; wire.style.top = y1 + 'px';
                            wire.style.width = length + 'px'; wire.style.transform = `rotate(${angle}deg)`;
                        });
                    }
                });
                evaluateLogic();
            }, 100);
        }

        function selectLogicGate(gateType) {
            if (logicState.selectedNode === null) return;
            const n = logicState.gates.find(x => x.id === logicState.selectedNode);
            if (n && n.type === 'GATE') {
                n.val = gateType;
                const el = document.getElementById(`node-${n.id}`);
                el.textContent = gateType; el.classList.add('filled');
                AudioSys.play('place'); evaluateLogic();
            }
        }
        
        function evaluateLogic() {
            logicState.gates.forEach(n => {
                if (n.type === 'IN') n.outVal = n.val;
                else if (n.type === 'GATE' && n.val) {
                    const in1 = logicState.gates.find(x => x.id === n.inputs[0]); const in2 = logicState.gates.find(x => x.id === n.inputs[1]);
                    if (in1 && in2 && in1.outVal !== undefined && in2.outVal !== undefined) {
                        if (n.val === 'AND') n.outVal = (in1.outVal === 1 && in2.outVal === 1) ? 1 : 0;
                        if (n.val === 'OR') n.outVal = (in1.outVal === 1 || in2.outVal === 1) ? 1 : 0;
                        if (n.val === 'XOR') n.outVal = (in1.outVal !== in2.outVal) ? 1 : 0;
                    } else n.outVal = undefined;
                }
            });
            logicState.gates.forEach(n => {
                if (n.inputs) {
                    n.inputs.forEach(inId => {
                        const inNode = logicState.gates.find(x => x.id === inId);
                        const wire = document.getElementById(`wire-${inId}-${n.id}`);
                        if (wire && inNode && inNode.outVal !== undefined) wire.classList.toggle('on', inNode.outVal === 1);
                    });
                }
            });
            const outNode = logicState.gates.find(x => x.type === 'OUT');
            if (outNode) {
                const inNode = logicState.gates.find(x => x.id === outNode.inputs[0]);
                if (inNode && inNode.outVal !== undefined) {
                    outNode.outVal = inNode.outVal;
                    const el = document.getElementById(`node-${outNode.id}`);
                    el.textContent = outNode.outVal; el.classList.toggle('on', outNode.outVal === 1);
                }
            }
        }

        /* =========================================================================
           CHECK SOLUTION VALIDATOR
           ========================================================================= */
        function checkSolution() {
            let isWin = false;
            let errorCells = [];

            if (currentGame === 'sudoku') {
                isWin = true;
                const cells = document.querySelectorAll('.sudoku-cell');
                cells.forEach((cell, idx) => {
                    const r = Math.floor(idx / sudokuState.size);
                    const c = idx % sudokuState.size;
                    if (sudokuState.grid[r][c] !== sudokuState.solution[r][c]) {
                        isWin = false;
                        if (sudokuState.grid[r][c] !== 0) {
                            cell.classList.add('error');
                            errorCells.push(cell);
                        }
                    }
                });
            } else if (currentGame === 'takuzu') {
                isWin = true;
                const cells = document.querySelectorAll('.takuzu-cell');
                cells.forEach((cell, idx) => {
                    const r = Math.floor(idx / takuzuState.size);
                    const c = idx % takuzuState.size;
                    if (takuzuState.grid[r][c] !== takuzuState.solution[r][c]) {
                        isWin = false;
                        if (takuzuState.grid[r][c] !== -1) {
                            cell.classList.add('error');
                            errorCells.push(cell);
                        }
                    }
                });
            } else if (currentGame === 'nonogram') {
                isWin = true;
                const cells = document.querySelectorAll('.nono-cell');
                cells.forEach((cell, idx) => {
                    const r = Math.floor(idx / nonoState.size);
                    const c = idx % nonoState.size;
                    const val = nonoState.grid[r][c] === 1 ? 1 : 0;
                    if (val !== nonoState.solution[r][c]) {
                        isWin = false;
                        cell.classList.add('error');
                        errorCells.push(cell);
                    }
                });
            } else if (currentGame === 'binary') {
                isWin = true;
                const cells = document.querySelectorAll('.binary-cell');
                cells.forEach((cell, idx) => {
                    const r = Math.floor(idx / binaryState.size);
                    const c = idx % binaryState.size;
                    const val = binaryState.grid[r][c];
                    if (val !== binaryState.solution[r][c]) {
                        isWin = false;
                        if (val === 1) {
                            cell.classList.add('error');
                            errorCells.push(cell);
                        }
                    }
                });
                if (!isWin && errorCells.length === 0) {
                    cells.forEach(cell => {
                        cell.classList.add('error');
                        errorCells.push(cell);
                    });
                }
            } else if (currentGame === 'logic') {
                const outNode = logicState.gates.find(x => x.type === 'OUT');
                if (outNode && outNode.outVal === 1) {
                    isWin = true;
                } else {
                    isWin = false;
                    logicState.gates.filter(x => x.type === 'GATE').forEach(g => {
                        const el = document.getElementById(`node-${g.id}`);
                        if (el) { el.classList.add('error'); errorCells.push(el); }
                    });
                }
            }

            if (isWin) {
                triggerWinModal(currentLevel === 10);
            } else {
                AudioSys.play('error');
                setTimeout(() => {
                    errorCells.forEach(cell => cell.classList.remove('error'));
                }, 800);
            }
        }

        /* --- GLOBAL KEYBOARD ACCESSIBILITY CONTROLS --- */
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeHowToPlay();
                document.getElementById('modal-win').classList.remove('active');
                return;
            }

            if (currentGame === 'sudoku' && sudokuState.selectedCell) {
                if (e.key >= '1' && e.key <= String(sudokuState.size)) {
                    inputSudoku(parseInt(e.key, 10));
                } else if (e.key === '0' || e.key === 'Backspace' || e.key === 'Delete') {
                    inputSudoku(0);
                }
            } else if (currentGame === 'codepath') {
                if (e.key === 'ArrowUp') { e.preventDefault(); addCodeBlock('UP'); }
                else if (e.key === 'ArrowDown') { e.preventDefault(); addCodeBlock('DOWN'); }
                else if (e.key === 'ArrowLeft') { e.preventDefault(); addCodeBlock('LEFT'); }
                else if (e.key === 'ArrowRight') { e.preventDefault(); addCodeBlock('RIGHT'); }
                else if (e.key === 'Backspace') { e.preventDefault(); removeCodeBlock(); }
                else if (e.key === 'Enter') { e.preventDefault(); runCodePath(); }
            }
        });

        /* --- DEEP LINKING & INITIALIZATION --- */
        document.addEventListener('DOMContentLoaded', () => {
            setLanguage(currentLang);
            document.getElementById('btn-sound').textContent = AudioSys.enabled ? '🔊' : '🔇';
            document.getElementById('btn-theme').textContent = isLight ? '☀️' : '🌙';

            const params = new URLSearchParams(window.location.search);
            const game = params.get('game');
            const levelParam = parseInt(params.get('level'), 10);
            const level = (!isNaN(levelParam) && levelParam >= 1 && levelParam <= 10) ? levelParam : 1;
            if (game) {
                setTimeout(() => selectGame(game, level), 120);
            }
        });
    </script>
</body>
</html>
'''

def main():
    target_path = os.path.join(os.path.dirname(__file__), "..", "projects", "puzzle-collection", "index.html")
    with open(target_path, "w", encoding="utf-8") as f:
        f.write(HTML_CONTENT)

    print(f"Successfully written upgraded index.html to {os.path.abspath(target_path)}")
    print(f"Total lines: {len(HTML_CONTENT.splitlines())}")
    print(f"Contains 'ดร.อภิสิทธิ์ ธงไชย': {'ดร.อภิสิทธิ์ ธงไชย' in HTML_CONTENT}")
    print(f"Contains 'สสวท': {'สสวท' in HTML_CONTENT}")
    print(f"Contains 'IPST': {'IPST' in HTML_CONTENT}")
    print(f"Contains 'difficulty-count': {'difficulty-count' in HTML_CONTENT}")
    print(f"Contains 'AudioContext': {'AudioContext' in HTML_CONTENT}")
    print(f"Contains 'i18n': {'const i18n =' in HTML_CONTENT}")

if __name__ == "__main__":
    main()
