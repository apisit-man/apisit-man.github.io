---
trigger: always_on
description: Keep all private API keys (e.g., GEMINI_API_KEY), tokens, and credentials strictly on the local PC and prevent exposure on GitHub, GitHub Pages, or any public platform.
---

# Local-Only API Key & Secret Protection Rule

All private API keys, tokens, and credentials (especially `GEMINI_API_KEY`, `GOOGLE_API_KEY`, OAuth secrets, `.env` values, and personal access tokens) must remain **strictly local to the user's PC** and must **never** be shared or published to any public platform:

1. **Never Hardcode or Embed Secrets:**
   - Never write real API key literals into source code, HTML/JS client bundles, Markdown documentation, skills, `storyboard.json`, logs, or chat/artifact examples.
   - Always read keys dynamically at runtime from local environment variables (e.g., `os.getenv("GEMINI_API_KEY")`) or git-ignored local secret stores.
   - Static websites (such as GitHub Pages) must never embed private server/AI API keys; any privileged AI call belongs on a protected backend or runs locally on the user's PC.

2. **Mandatory Pre-Commit / Pre-Push Secret Check:**
   - Before running `git add`, `git commit`, `git push`, or `sync-skills.ps1`, inspect staged files to ensure no real key values, `.env` files, or unexpected credential strings are included.
   - Never print raw API key values to terminal output, logs, or final responses (confirm presence via boolean or masked length only).

3. **Missing Key Handling:**
   - If a script or workflow requires a key that is missing locally, instruct the user to set the environment variable privately on their PC—never ask the user to paste raw secrets into tracked project files.
