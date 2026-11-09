# Build Status — Arduino Lab TH–EN

Current stage: Stage 07 & Integration Complete
Date: 2026-11-09

## Completed gates
- [x] Stage 01: Foundation (Vite + TypeScript + Three.js installed with exact versions, typecheck passing)
- [x] Stage 02: Content and domain logic (16 bilingual lessons, pure simulation model, C++ sketch generator, seed tests passing 25/25)
- [x] Stage 03: Interface, design system & i18n (Tailwind CSS, Prompt / Plus Jakarta Sans typography, Theme dark/light toggle, KaTeX formulas, Single-window scroll)
- [x] Stage 04: Procedural 3D & 2D Schematic (Three.js Arduino Uno R3 board + electronic components, interactive SVG circuit fallback)
- [x] Stage 05: Interaction, Web Audio & learning controls (Debounced button, 8-key piano synthesizer, tone buzzer, timestamped serial monitor, copy/download .ino)
- [x] Stage 06: Quality assurance & Vitest unit testing (10/10 Vitest tests passing, 25/25 seed tests passing)
- [x] Stage 07: Production build & staging (Vite build with relative `./` base, staged to `projects/arduino-lab/` via `stage-pages.mjs`)

## Commands and actual results
- `npm run typecheck`: Passed with 0 errors
- `npm test`: Passed (10/10 tests in `app.test.ts`)
- `npm run build`: Success (`dist/index.html` 4.70 kB, `dist/assets/index-DyBkVo3q.js` 652.61 kB)
- `node scripts/audit-build.mjs app/dist`: PASS (2 files, 657,317 bytes)
- `node scripts/stage-pages.mjs --dist app/dist --repo ... --publish-root . --apply`: Applied to `projects/arduino-lab/`

## Deployment details
- Target: `projects/arduino-lab/`
- Production URL: `https://apisit-man.github.io/projects/arduino-lab/`
- Deep-link examples:
  - `https://apisit-man.github.io/projects/arduino-lab/?lang=th#button`
  - `https://apisit-man.github.io/projects/arduino-lab/?lang=en#project`
