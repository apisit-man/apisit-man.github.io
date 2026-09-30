# Specification: Interactive & Printable Maze Generator Suite

**Date:** 2026-09-30  
**Target Path:** `projects/maze-generator/`  
**Author:** Dr. Apisit Tongchai (Independent Educator & Researcher)  

---

## 1. Executive Summary & Purpose

The **Maze Generator Suite** is a modern, client-side, bilingual (Thai/English) web application designed for Dr. Apisit's personal educational platform (`apisit-man.github.io`). It combines:
1. **Interactive Game Mode:** Real-time, playable labyrinth with responsive touch, swipe, keyboard controls, movement animations, breadcrumb paths, live timer, and auto-solver animations.
2. **Worksheet / Classroom Print Mode:** A tool for educators and parents to generate customizable printable worksheets with clean vector printing (`@media print`), student header details, customizable difficulty/shapes, and an on-demand Solution Key.

---

## 2. Global Constraints & Branding Guidelines

* **100% Client-Side:** No backend server or Node runtime required for execution; runs purely in modern browsers on GitHub Pages.
* **Strict Author Branding:**
  - Author descriptor: `ดร.อภิสิทธิ์ ธงไชย` / `Dr. Apisit Tongchai (Independent Educator & Researcher)`.
  - **Zero prohibited organizational affiliations:** No mention of `สสวท.`, `IPST`, or workplace titles anywhere in code, metadata, or UI.
* **Top Navigation:** Top-right Home button `🏠 กลับหน้าหลัก` linking back to `../../index.html` or `../index.html`.
* **Footer:** Clean personal copyright credit: `© 2024-2026 Dr. Apisit Tongchai - STEM Education & AI`.
* **Bilingual Support (TH / EN):** Interactive toggle instantly switching interface labels, instructions, and worksheet headings.

---

## 3. Architecture & Functional Components

### A. Core Engine (`maze-engine.js`)
* **Grid Topologies:**
  - `Rectangle`: Standard $W \times H$ orthogonal grid.
  - `Cut-Out`: Grid with notched/clipped corners.
  - `Circle`: Concentric rings with radial angular subdivisions.
  - `Diamond`: Rhombus/diamond grid shape.
  - `Escape`: Enclosed central sanctum with a single escape breach to outer perimeter.
* **Generation Algorithms & Biases:**
  - Recursive Backtracker with adjustable directional weights (`Random`, `Mostly Horizontal`, `Mostly Vertical`).
  - Braid / Loop option (removes dead-ends for alternative paths).
* **Solver Engine:**
  - Breadth-First Search (BFS) / A* providing the unique or optimal solution path from `start` to `goal`.

### B. Viewport & Rendering (`HTML5 Canvas` + Vector Print)
* **High-DPI / Retina Calibration:** Sharp rendering on mobile and Retina screens (`devicePixelRatio`).
* **Game Mode Viewport:**
  - Player token with smooth interpolation.
  - Particle / confetti celebration upon reaching the goal.
  - Breadcrumb trails showing visited paths.
* **Print Mode Viewport:**
  - High-contrast pure black and white linework.
  - Dynamic page title, student name, and date fields.
  - `@media print` rules hiding all UI chrome, controls, and buttons.

### C. Controls & Interaction
* **Desktop:** Arrow keys, `WASD`, mouse drag.
* **Mobile / Tablet:** Touch swipe gestures and on-screen Virtual D-Pad buttons.
* **Actions:**
  - `New Maze / Generate`
  - `Play / Worksheet Mode Switcher`
  - `Show / Hide Solution Key`
  - `Print Worksheet` (`window.print()`)
  - `Download PNG / SVG`
  - `TH / EN Language Toggle`
  - `Dark / Light Theme Toggle`

---

## 4. Verification & Testing Standards

* Node.js native test suite (`node --test tests/maze-generator.test.js`) verifying:
  1. Engine graph integrity (every valid cell is reachable; no cycles in perfect maze mode).
  2. Solution solvability (BFS finds valid continuous path from start to end for all shapes).
  3. Shape masks (cells outside mask bounds remain unvisited/blocked).
  4. Branding compliance (no prohibited terms).
  5. HTML structure and accessibility standards.
