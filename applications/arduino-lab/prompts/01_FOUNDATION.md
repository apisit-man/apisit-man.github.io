# Stage01 — foundation

Read AGENTS.md and product/workflow specifications. Inspect the workspace before writing. Run `node scripts/verify-kit.mjs` and `node --test tests/seed.test.mjs`. If either fails, investigate and fix the root cause without weakening assertions.

Create `app/` as a separate Vite TypeScript project. Use `templates/package.json`, `vite.config.ts`, `tsconfig.json` and `.gitignore` as guidance. Install compatible dependencies with exact versions: runtime `three`; development `vite`, `typescript`, `@types/three`, `vitest`, `@playwright/test`. Use `npm install --save-exact` / `--save-dev --save-exact`, save the lockfile, and record versions. Do not use runtime CDN imports.

Create a brief implementation plan assigning modules to data/model/state/render/UI responsibilities. Implement the minimal shell and reusable typed interfaces so typecheck and build pass. The starter screen must identify itself as incomplete until later stages finish; do not claim course readiness.

Set `base:'./'`. Prepare component IDs, action names and stable test IDs. Use external module scripts, no secrets or browser source execution. Create `BUILD_STATUS.md` with commands/results and next stage. Continue to 02 when the foundation gate passes.
