# Technical Architecture Decisions (ADR)
Focus: `projects/home-sort-game` & Personal Website

## ADR-001: Native Node.js Test Runner for Zero-Dependency Testing
- **Context**: The repository is a static site hosted on GitHub Pages with minimal dependencies. Adding heavy testing frameworks (e.g. Jest, Vitest) would introduce hundreds of `node_modules` packages.
- **Decision**: Use Node.js built-in `node:test` and `node:assert/strict` via `node --test` specified in `package.json`.
- **Consequences**:
  - Zero external devDependencies required.
  - Lightning-fast test execution (< 500ms).
  - Supported natively in Node 18+ and Node 24.

## ADR-002: Dual-Environment Universal Module Pattern
- **Context**: `home-sort-game` is loaded in standard browser environments via `<script>` tags without a bundler (Webpack/Vite), but unit tests run in Node.js CommonJS environment.
- **Decision**: Keep global declarations for the browser (`const GameLogic = ...`) while checking `if (typeof module !== "undefined" && module.exports) { module.exports = ...; }`.
- **Consequences**:
  - No build step required for GitHub Pages.
  - Immediate compatibility with Node.js `require()` for automated testing.

## ADR-003: Separation of Pure Game Logic from DOM
- **Context**: `game.js` mixed DOM event handling, Web Audio, CSS transitions, and core business logic (queue shuffling, scoring, difficulty mapping). This made headless testing impossible without mocking DOM.
- **Decision**: Extract stateless / pure computation logic into `projects/home-sort-game/js/logic.js` (`GameLogic`).
- **Consequences**:
  - Core game mechanics (queue generation, scoring, star calculation, category level mapping) can be tested deterministically in CI/CLI.
  - UI controller (`game.js`) consumes `GameLogic` with backward-compatible inline fallbacks.

## ADR-004: Infinite Loop Defense in Queue Generation
- **Context**: `buildQueue()` previously contained a `while (result.length < state.rounds)` loop that skipped elements matching `result[result.length - 1].id`. If pool items or active category filters had 1 item, the condition looped indefinitely, locking up browser tabs.
- **Decision**: Added a safety counter (`maxSafety = rounds * 25`), a condition checking `filtered.length > 1` before skipping consecutive items, and an iterative modulo fallback.
- **Consequences**:
  - Eliminates infinite loop crash risks regardless of input data.
