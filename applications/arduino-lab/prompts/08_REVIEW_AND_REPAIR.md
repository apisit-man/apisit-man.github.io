# Review prompt — use after feedback or with fresh context

Review the actual generated application, not only the build report. Read the product/content/acceptance specifications and inspect source, tests and a running production preview. Identify concrete mismatches, reproduce them, then fix them without weakening the requirements.

Check all 16 lessons rather than sampling only the polished first lesson. Compare connection table, netlist,3D wires, SVG, sketch and output for each. Verify Thai/English completeness and readability, independent low/mid/high model fixtures, no fake compilation, nested asset paths, storage failure handling, hidden-tab audio cleanup and WebGL fallback.

For each finding record severity, reproduction, expected/actual, affected files and validation after repair. Check the externally visible result after code changes. Run only the affected checks unless a shared module changed. Update BUILD_STATUS and RELEASE_REPORT with real evidence. Do not claim that a browser/rendering/hardware test occurred if it did not.

If every gate passes, say so with evidence. If anything remains blocked, list the exact blocker and next action. Do not publish or change the website's hosting configuration as part of this review.
