# Master prompt — build every stage

You are implementing my complete Arduino Lab TH–EN application in this workspace. Read `AGENTS.md`, `docs/PRODUCT_SPEC.md`, `docs/CONTENT_GUIDE.md`, `docs/WORKFLOW.md`, `docs/ACCEPTANCE.md` and `docs/DEPLOYMENT.md`. Use the original catalog and seed code. Build inside `app/`; preserve the rest of the kit. Treat the research report as evidence and architectural advice, not as application source.

Complete stages 01–07 sequentially. Read the corresponding prompt immediately before each stage. Do the work rather than merely returning a plan. Make reasonable implementation choices within the fixed requirements. Do not ask me repeatedly whether to continue. Preserve a runnable checkpoint and `app/BUILD_STATUS.md` after each gate. If interrupted, the status must identify the next concrete action.

Fixed target:

- A complete original16-lesson guided electronics course inspired by the reference concept; Thai default and English only.
- Desktop and mobile responsive workspace with procedural interactive 3D, correct circuit SVG, lesson tabs, component inspector, supported controls, generated read-only Arduino examples, copy/download, bounded serial output, audio, local progress, print and share.
- All control/model/code/scene/schematic data synchronized through canonical normalized parameters and a terminal-complete netlist.
- Vite + TypeScript + Three.js, client-only static build, `base:'./'`, hash lesson routes and `?lang=th|en`, no backend or runtime API key.
- Original visuals and prose. Do not download or copy the reference application's scripts, CSS, models, translations or screenshots into the product.
- Honest simulation labeling. No fake compilation/upload status, arbitrary C++ interpreter or code execution via eval/Function.
- Working non-WebGL fallback and accessible HTML control alternatives; every lesson usable in fallback mode.

Begin by running the two Node checks in START_HERE. Use the templates as inputs rather than overwriting an existing project blindly. Resolve exact compatible dependency versions, install and commit a lockfile. Keep the seeded mathematical contract stable; test any TypeScript port against the seed fixtures. Complete lessons in batches of four if necessary, then test across all 16. Do not stop at an attractive shell or a three-lesson prototype.

During QA, serve the production build under a nested `/projects/arduino-lab/` path. Use real browser interactions for run/stop, pointer cancellation, audio, language, deep links, local persistence, SVG fallback and mobile. If a tool is unavailable, document the gate as blocked; do not fabricate results.

At the end, provide the local preview, actual command results, completed lesson count, unresolved limitations, C++ compilation status and path to the clean `dist/`. By default prepare the verified deployment plan and finish for local review. If my launch message explicitly authorizes deployment after passing the release gates, execute prompt09 in the same run without another routine confirmation. Otherwise publish when I invoke the deployment prompt later. Perform deployment through verified GitHub credentials/configuration and check the live result; do not give me only commands.
