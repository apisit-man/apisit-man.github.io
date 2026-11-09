# Stage06 — verify and repair

Read ACCEPTANCE.md. Run seed checks again if seed files changed; otherwise reuse their recorded evidence. Run application typecheck, model/content/integration tests and production build. Add browser tests with Playwright where available; use the browser for manual Thai typography, real pointer/touch/keyboard, audio and3D inspection. No stubbed renderer is sufficient for the actual 3D gate.

Run all acceptance scenarios. Focus on boundary semantics, code/model agreement, language URL/state preservation, failed/corrupt storage, keyboard navigation, no-echo handling, stopped-time behavior, sound cleanup, pointer release outside scene, fallback/context loss, repeated lesson changes and print. Validate output under a real nested production path, not only a development server.

Optionally install official Arduino CLI and compile all generated default sketches for arduino:avr:uno with recorded core/library versions. Generate sketches using the module rather than copying a second manual version. This is a developer verification step, not a runtime compiler feature. If unavailable, record not compiler-verified; never label examples as hardware-tested.

Repair failures and rerun the affected checks until they pass or a specific tool/environment blocker remains. Save local screenshots and a RELEASE_REPORT.md with exact commands, results, device/browser, build size, dependency/license inventory, remaining issues and C++ verification status. Never mark a blocked gate passed. Continue to 07 only with an honest gate status.
