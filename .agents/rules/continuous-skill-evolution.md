---
trigger: always_on
description: Automatically learn from user feedback during tasks to continuously improve skills and keep both local PC (~/.gemini/config/skills) and cloud workspace (.agents/skills) synchronized.
---

# Continuous Skill Self-Improvement & Dual-Sync Rule

You must continuously evolve and improve your installed skills based on the user's feedback, corrections, and preferences during every task:

1. **Capture User Feedback into Skills**:
   - Whenever the user corrects behavior, states a preference, refines a layout/theme, or solves a recurring bug/troubleshooting issue related to an existing skill, **proactively update that skill's `SKILL.md`** (and any supporting `references/` or `scripts/`) before finishing the task.
   - If the user introduces a new repeatable workflow not covered by an existing skill, create a new skill for it.

2. **Mandatory Dual-Sync (Global PC + Cloud Repo)**:
   - Every time you create or update a skill, you **MUST** update both locations so the PC global config and the cloud repository never drift apart:
     - **Global PC Skills**: `C:\Users\atong\.gemini\config\skills\<skill-name>\` (`~/.gemini/config/skills/<skill-name>/`)
     - **Cloud Workspace Skills**: `c:\Users\atong\Documents\antigravity\personal website\.agents\skills\<skill-name>\`
   - Run `c:\Users\atong\Documents\antigravity\personal website\.agents\sync-skills.ps1 -Mode Both` whenever skills or rules are modified.

3. **Cloud Repository Sync**:
   - Commit and push updated `.agents/` files to `origin` (`https://github.com/apisit-man/apisit-man.github.io.git`) so cloud environments always have the newest version of every skill.
