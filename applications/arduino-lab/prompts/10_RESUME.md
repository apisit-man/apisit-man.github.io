# Resume prompt

Continue the Arduino Lab build from the existing workspace. Read AGENTS.md, docs/WORKFLOW.md, app/BUILD_STATUS.md and app/RELEASE_REPORT.md if present. Inspect current files and Git status before editing. Treat recorded successful checks as evidence only if their relevant inputs are unchanged.

Find the earliest incomplete or failed gate, reproduce it, read its stage prompt, and continue through the remaining authorized stages. Preserve completed working features and user edits. Do not restart the project, regenerate completed content blindly, lower the lesson count or replace tests with easier assertions. Keep a precise checkpoint after every stage.

If the previous task was deployment, verify repository identity and whether a push/deployment already occurred before retrying. Do not create duplicate commits/PRs or a second hosting workflow. Finish with actual progress, verification and any concrete remaining blocker.
