# Cloud-Synced Gemini & Antigravity Skills Catalog

This directory contains **all 36 custom standalone skills** and **6 installed plugins (14 plugin skills)** synchronized across local PC and cloud environments (`https://github.com/apisit-man/apisit-man.github.io`).

---

## How to Use in the Cloud or on Another Machine

### 1. Automatic Workspace Loading (Zero Setup)
Whenever you open this repository in **GitHub Codespaces**, **Firebase Studio / Project IDX**, **Antigravity IDE**, **Antigravity 2.0**, or the **`agy` CLI**, all **36 skills** inside `.agents/skills/` are **automatically discovered and active** immediately.

### 2. Install Globally on Any Cloud VM / New PC (`~/.gemini/config/`)
To make all 36 skills and 6 plugins available **globally across all projects** on a new machine or cloud container:

- **Windows (PowerShell)**:
  ```powershell
  .\.agents\sync-skills.ps1 -Mode InstallToGlobal
  ```
- **Linux / macOS / Cloud Shell / Codespaces (Bash)**:
  ```bash
  bash .agents/sync-skills.sh
  ```

### 3. Backup New Local Skills to Cloud
After creating or updating any skill in `~/.gemini/config/skills/` on your PC, run:
```powershell
.\.agents\sync-skills.ps1 -Mode Both
git add .agents/
git commit -m "chore(skills): sync skills to cloud"
git push origin main
```

---

## Installed Skills Inventory (36 Standalone Skills)

### Personal Website, STEM Simulations & EdTech (14 Skills)
1. `author-branding-rules` — Editorial guidelines, personal branding standards, and strict institutional independence rules.
2. `personal-website-simulations` — Standard design system, visual identity, layout architecture, and physics visualization guidelines for `apisit-man.github.io`.
3. `canvas-physics-sim` — 2D HTML5 Canvas physics simulations, trajectory predictors, pendulum/motion models, and KaTeX math sync.
4. `edtech-socratic-ai` — Socratic AI tutoring, guided inquiry, and conceptual misconception diagnosis using the Gemini API.
5. `gas-classroom-sync` — Google Sheets & Google Apps Script (GAS) classroom score/experiment sync bridge.
6. `i18n-interactive-sim` — Zero-dependency bilingual (Thai/English) localization for web apps, Canvas 2D, and Three.js.
7. `leaflet-webmap-troubleshooting` — Resilient basemap architecture, live radar/GIS integration, and cache-busting for Leaflet web maps.
8. `mobile-web-game-ux` — Mobile browser gaming UX, virtual joysticks/touch controls, viewport locking, and Fullscreen API.
9. `pages-vercel-pipeline` — Dual GitHub Pages (frontend) and Vercel (serverless APIs) deployment and CORS pipeline.
10. `pwa-offline-classroom` — Offline-ready Progressive Web App (PWA) Service Workers and asset caching for school tablets/Chromebooks.
11. `threejs-webgl-optimization` — Three.js & WebGL 3D optimization, particle systems, GLTF/Draco loading, and 60 FPS mobile tuning.
12. `topological-puzzle-engine` — Topological maze puzzles, dependency-graph escape games, and deadlock-free procedural generation.
13. `web-audio-procedural` — Procedural sound synthesis (engine RPM, wind noise, educational SFX) via Web Audio API.
14. `extract-video-from-link` — Extract and download videos/audio from web links to the local Downloads folder using `yt-dlp`.

### Academic Documents & Presentation Slide Themes (6 Skills)
15. `ipst-academic-doc-theme` — Formal Thai academic Word (`.docx`) and PDF generation with TH SarabunPSK and IPST color palette.
16. `ipst-creative-workshop-theme` — Eye-friendly academic-creative workshop PowerPoint (`.pptx`) slides with Noto Sans Thai.
17. `ipst-presentation-slides` — Standard IPST PowerPoint & Google Slides presentations with academic card layouts.
18. `modern-academic-slide-theme` — Modern academic and AI Literacy policy framework PowerPoint (`.pptx`) slide layouts.
19. `pedagogical-editorial-slide-theme` — Editorial pedagogical blueprint presentation slides ("Critical AI Literacy for Educators" style).
20. `google-slides-generator` — 16:9 Widescreen presentation slides using `python-pptx` with structured card layouts.

### Video Production & Media (4 Skills)
21. `hyperframes` — Render HTML animations, explainers, charts, and kinetic typography to video.
22. `hyperframes-cli` — HyperFrames CLI workflow for scaffolding, frame inspection, and rendering.
23. `hyperframes-registry` — 450+ ready-made HyperFrames visual blocks, transitions, and overlays.
24. `media-use` — Audio mixing, SFX, voiceover, cutouts, and color grading for video production.

### Software Engineering, Architecture & Agent Workflows (12 Skills)
25. `brainstorming` — Interactive requirement discovery and design exploration before implementation.
26. `writing-plans` — Step-by-step architectural and implementation planning.
27. `executing-plans` — Structured inline execution of multi-step implementation plans.
28. `test-driven-development` — Test-driven implementation workflow.
29. `systematic-debugging` — Root-cause analysis and systematic debugging workflow.
30. `verification-before-completion` — Verification checks and evidence gathering before marking tasks complete.
31. `requesting-code-review` — Code review checklist and quality verification.
32. `finishing-a-development-branch` — Branch integration and cleanup workflow.
33. `frontend-design` — Distinctive, intentional UI/UX visual design guidance.
34. `webapp-testing` — Local web application testing and browser verification with Playwright.
35. `reverse-engineer-anything` — Binary, bundle, and runtime analysis with REA.
36. `skill-creator` — Authoring, benchmarking, and optimizing custom agent skills.

---

## Bundled Plugins (`.agents/plugins-bundle/` — 6 Plugins / 14 Skills)

1. **`gemini-api`**: `gemini-api-dev`, `gemini-interactions-api`, `gemini-live-api-dev`, `gemini-omni-flash-api` + Gemini Docs MCP config.
2. **`google-antigravity-sdk`**: `google-antigravity-sdk` (Python SDK orchestration & local/hosted agent guide).
3. **`chrome-devtools-plugin`**: `a11y-debugging`, `chrome-devtools`, `debug-optimize-lcp`, `memory-leak-debugging`, `troubleshooting`.
4. **`modern-web-guidance-plugin`**: `modern-web-guidance`, `chrome-extensions`.
5. **`google_maps_platform`**: `google-maps-platform`.
6. **`android-cli-plugin`**: `android-cli`.
