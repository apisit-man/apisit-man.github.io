# Workflow and stage gates

This is a prompt workflow, runnable without installing a skill or using a slash command. Start with `00_MASTER_BUILD.md`; use individual files to resume or repair one stage. Never replace evidence with a statement that the agent has reviewed its own output.

| Stage | Prompt | Required work | Exit evidence |
|---|---|---|---|
| 1 | `01_FOUNDATION.md` | Inspect workspace, check seed, scaffold app, install exact dependencies, choose file interfaces | Seed tests pass; typecheck/build work; plan and status saved |
| 2 | `02_CONTENT_AND_MODEL.md` | Port catalog and models, controls, code generation, canonical netlists | 16 complete bilingual lessons; model/normalization tests; no inconsistent pins |
| 3 | `03_INTERFACE_AND_I18N.md` | Complete responsive shell, navigation, tabs, state, localization, storage | Both languages render; deep links/back/forward and persistence tested |
| 4 | `04_3D_AND_SCHEMATIC.md` | Original board/components, wires, picking, camera and fully working SVG mode | All 16 distinct circuits; fallback and context loss tested; lifecycle checked |
| 5 | `05_INTERACTION_AND_LEARNING.md` | Live controls, code/serial, audio, learning prompts, progress, print/share | At least one meaningful input/output scenario per lesson in both modes |
| 6 | `06_QA_AND_REPAIR.md` | Run automated and browser acceptance, fix failures | Production build, test reports, screenshots and honest release report |
| 7 | `07_RELEASE_PREP.md` | Nested-path test, audit distributable, integration plan and preview | Clean `dist/`; no root asset paths; publish method identified or deferred |
| Review | `08_REVIEW_AND_REPAIR.md` | Recheck after user feedback or with fresh context | Findings fixed; affected checks rerun |
| Deploy | `09_DEPLOY_GITHUB.md` | Inspect actual repository/Pages setup, integrate only app, publish and verify | Live URL, successful workflow/deployment, deep-link and surrounding-site checks |
| Resume | `10_RESUME.md` | Read saved status and source, reproduce next failing gate | Continue from evidence, without restarting completed work |

## Working rule

The default master prompt authorizes stages 1–7. The optional build-to-deploy launch block in START_HERE also authorizes stage09 in the same run after all release gates pass. Neither permits changing an unknown repository or replacing an existing hosting workflow. Otherwise deployment follows the user's deployment prompt after local review. Ask only for a missing repository/path or an external authentication step that cannot be inferred from verified configuration. Do not ask permission for routine repairs.

## Status file format

Maintain `app/BUILD_STATUS.md`:

```markdown
# Build status
Current stage:
Last verified commit/checkpoint:
Completed gates:
Commands and actual results:
Remaining failures and affected files:
Known limitations:
Next exact action:
Deployment method, repository and target (only after verification):
```

If a terminal install or test fails, diagnose the failure and retry with a material correction. Do not continue through a failed gate and mark the stage complete. If the agent loses context, read the status before editing. Keep local commits/checkpoints where a repository exists; do not publish those checkpoints automatically.

## Practical run sequence

1. Run `node scripts/verify-kit.mjs` and `node --test tests/seed.test.mjs` from kit root.
2. Generate `app/` from `templates/`, install dependencies using exact resolved versions, then lock them.
3. Complete every stage, testing bounded units before integrating all 16 lessons.
4. Run typecheck, model/content/integration tests, production build and browser tests against a production preview.
5. Serve the exact `dist/` at `/projects/arduino-lab/` in a temporary local parent. Test query/hash refresh and every asset request. A Vite development server alone is not sufficient evidence.
6. Before publication, inspect the real site's branch, root/docs/source tree and Actions workflow. Choose the matching integration route in `DEPLOYMENT.md`.
7. Deploy, then verify the live home page, `?lang=th#button`, `?lang=en#project`, back/forward, asset requests, and an unrelated existing site page.

## Scope control

Do not cut lessons to meet a single response budget. Work in batches of four until all 16 are complete. Do not add accounts, external compilation or AI chat to compensate for unfinished guided lessons. If time expires, preserve a checkpoint and report unfinished gates rather than labeling a partial build ready.
