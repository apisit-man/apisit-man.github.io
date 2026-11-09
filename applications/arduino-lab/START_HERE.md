# Arduino Lab TH–EN — Antigravity build kit

Prepared for Dr. Apisit Thongchai · researched 9 November 2026

This is a complete **generation workflow and implementation seed**, not a finished or deployed website. Antigravity will build the interface and 3D scenes, integrate the supplied original curriculum/models, test the application, and publish it into your GitHub site. No source code or artwork from the reference application is redistributed.

## Start in five steps

1. Extract this archive. On Windows 11, use Extract All if available, or run `tar -xzf Arduino_Lab_Antigravity_Kit.tar.gz` in PowerShell. Keep the whole folder together.
2. Open **Arduino_Lab_Antigravity_Kit** as the workspace folder in Antigravity. Install Node.js LTS and Git from their official sites if missing. GitHub CLI is useful for deployment; authenticate using its normal sign-in flow.
3. Paste the prompt below. It explicitly loads the project instructions, so it also works if your Antigravity version does not automatically discover `AGENTS.md`.
4. Review the working application in Antigravity's browser. Use `prompts/08_REVIEW_AND_REPAIR.md` for a further review if needed. Ordinary stage checks run without repeated confirmations.
5. Paste `prompts/09_DEPLOY_GITHUB.md` when ready to publish. It detects how your existing site is published before changing files. The proposed destination is `projects/arduino-lab/` in your existing website; it must verify that repository and its publishing source first.

## Paste this first

```text
Build my complete Arduino Lab Thai–English website from this workspace.
Read AGENTS.md, prompts/00_MASTER_BUILD.md and docs/WORKFLOW.md first.
Execute all build stages sequentially through a tested local production build;
do not stop after writing a plan or after completing only a few lessons.
Use the supplied original 16-lesson catalog, simulation model seed, and fixtures.
Create the application inside app/ and preserve the build-kit files.
Default to Thai, offer English, and support no other display languages.
Create original procedural 3D components with Three.js and an SVG schematic fallback.
This is a guided educational simulator, so do not claim to compile or run arbitrary C++.
Keep code generation, the model, wiring, explanations and displayed values consistent.
Record evidence for each acceptance gate in app/BUILD_STATUS.md.
Keep working through repairable failures. Stop only for a real blocker, and record
the exact command, error, completed stages and next action so I can resume.
Finish with the preview address, test results and any remaining limitations.
Prepare GitHub Pages output; I will invoke the deployment prompt after reviewing it.
```

For a single build-to-deploy run, append this to the same message:

```text
I also authorize deployment after every application release gate passes.
Execute prompts/09_DEPLOY_GITHUB.md in this run. Verify the candidate repository
apisit-man/apisit-man.github.io and its actual publishing source first, preserve
the existing website, and deploy only projects/arduino-lab/. Stop only for a real
authentication, destination or protected-branch blocker; do not request another
routine publication confirmation. Verify the live result before reporting success.
```

## What is included

| Location | Purpose |
|---|---|
| `RESEARCH_REPORT.html` | Readable research, conclusions and source links |
| `docs/PRODUCT_SPEC.md` | Functional scope, architecture, interface and accuracy rules |
| `docs/WORKFLOW.md` | Stage order, entry/exit gates and resuming work |
| `docs/ACCEPTANCE.md` | Release criteria and browser scenarios |
| `docs/DEPLOYMENT.md` | Existing-site integration and separate-repository alternative |
| `docs/CONTENT_GUIDE.md` | Language rules, pin plan, terminology and model limitations |
| `prompts/00_MASTER_BUILD.md` | One prompt orchestrating the entire build |
| `prompts/01_…07_…` | Bounded prompts to build or resume individual stages |
| `prompts/08_REVIEW_AND_REPAIR.md` | Independent review checklist and repairs |
| `prompts/09_DEPLOY_GITHUB.md` | Publish only the requested app to the verified GitHub site |
| `prompts/10_RESUME.md` | Continue after interruption or context loss |
| `content/lessons.json` | Original bilingual objectives, explanations, pinouts, controls and challenges |
| `seed/model.mjs` | Pure, deterministic model for all 16 lessons |
| `seed/sketches.mjs` | Original C++ example generator for all 16 lessons |
| `seed/ui-strings.json` | Thai/English interface vocabulary |
| `tests/seed.test.mjs` | Executable tests for supplied seed and content |
| `scripts/verify-kit.mjs` | Check the package before generation |
| `scripts/stage-pages.mjs` | Dry-run-first copy of a static build into an existing site |
| `templates/` | Package, Vite, TypeScript and deployment templates |

## Check the supplied seed now

```sh
node scripts/verify-kit.mjs
node --test tests/seed.test.mjs
```

These checks need Node.js only. They do not test a future 3D interface, compile Arduino sketches, or confirm a live GitHub deployment. Those are separate gates assigned to Antigravity.

## Choices already made

- Name: **Arduino Lab · ห้องทดลองอาร์ดูอิโน**. Author credit: Dr. Apisit Thongchai / ดร.อภิสิทธิ์ ธงไชย. No IPST logo or institutional endorsement is assumed.
- Audience: beginners and teacher-led secondary activities; younger learners can use teacher guidance.
- First release: 16 lessons, guided parameters, linked code, serial display, 3D + 2D, local progress, printable lesson notes, share links, no accounts or backend.
- Framework: Vite + TypeScript + Three.js; static `dist/`; relative asset URLs; hash navigation.
- Deployment: add a project directory to the current GitHub Pages site after detecting its publishing method. Do not replace the site's root or its deployment workflow.
- Version two, optional: AVR emulation with precompiled firmware, or a separately hosted compilation service. Neither is required for release one.

This pack uses ordinary prompts rather than requiring a new installed skill or a version-specific slash command. Google currently documents Agent Skills and deprecates legacy workflows; the prompts remain usable by directly attaching their files. If you later want reusable skills, convert only the proven stages after the first successful build.
