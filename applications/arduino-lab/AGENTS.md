# Project instructions

Read `START_HERE.md`, `docs/PRODUCT_SPEC.md`, `docs/CONTENT_GUIDE.md`, and the active stage prompt before implementing. The build is authorized; routine design and repair decisions do not need repeated questions.

## Deliverable

Generate the complete original Thai–English Arduino educational application in `app/`. Preserve all kit documents, seeds and tests. The reference is inspiration, not a source to copy. Use the research evidence already supplied; additional browsing is needed only to resolve a missing technical detail.

## Hard requirements

- Exactly `th` and `en`; Thai default; every visible label, accessible name, error, export and lesson field localized. Keep code keywords and technical identifiers unchanged.
- 16 lesson IDs from `content/lessons.json`; all must work in both visual modes. No placeholder lessons, generic repeated scenes, dead buttons or claimed future features in release scope.
- Guided lesson simulation. Never run user-entered source with `eval`, `Function`, dynamic script injection or an invented C++ interpreter. Do not show fake compiler/upload success.
- Single canonical normalized parameters drive the model, generated C++ example, values, pinout and both renderers. Environmental inputs (button press, distance, sensor value) do not necessarily alter C++ source; document that distinction.
- Vite + TypeScript + Three.js; build-time dependencies only; no hosted backend, API key, login, telemetry, external compiler, remote model/font dependency or service worker in release one.
- `base: './'`; relative assets; preserve `?lang=th|en` and `#lesson-id`; test real production assets under a nested path.
- Keyboard/touch alternatives for every 3D gesture. Release held buttons and piano notes on pointer cancellation, window blur and lesson change. Stop audio when hidden, stopped or changing lesson.
- Always offer an SVG circuit view using the same state and netlist; automatically use it when WebGL2 is unavailable or context is lost. Rendering failure must not disable simulation.
- Do not collect personal data. Guard localStorage reads/writes; corrupted or blocked storage must not crash the app.
- Keep existing site publishing configuration and unrelated repository files intact. Never force-push, globally change Git settings, paste tokens, or deploy the entire build kit.

## Execution

Use the stage order in `docs/WORKFLOW.md`. Keep `app/BUILD_STATUS.md` current with actual commands, results and uncompleted gates. Resolve version compatibility during install, save exact dependency versions and commit the lockfile. Use supplied seed tests without weakening assertions; add tests for app integration and the acceptance criteria.

Do not claim full application completion based on seed tests. Do not claim real hardware equivalence, firmware compilation, WebGL verification or deployment without the corresponding evidence. If browser access is missing, record the exact unverified gates and leave the release blocked until they are tested.
