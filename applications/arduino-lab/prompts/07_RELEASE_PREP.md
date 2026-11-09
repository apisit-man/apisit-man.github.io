# Stage07 — production package and existing-site plan

Inspect dist/ and network requests. Include only runtime application files and required license notices; exclude prompts, research, node_modules, local test outputs, credentials and development scripts. Confirm all 16 lessons and both locales work without the reference domain. Run the build audit and nested production browser tests.

Read DEPLOYMENT.md. If an existing site checkout is available, inspect its remote, branch, dirty status, Pages source and deployment workflow read-only. Default candidate from the brief is apisit-man/apisit-man.github.io, target projects/arduino-lab; treat it as a proposed destination until verified. Do not overwrite root index.html or replace its workflow. If there is no checkout/credential, record the exact missing deployment context and keep the local build complete.

Prepare an integration plan for the actual publish source: root, docs, or existing build pipeline. Test stage-pages.mjs in dry-run mode if appropriate. Do not run an alternative whole-site workflow on the current website. The standalone pages.yml template is for a separate repository only.

Record preview address, test status, complete lesson count, limitations and local dist path. If the launch message explicitly authorized build-to-deploy, continue directly to09_DEPLOY_GITHUB after all release gates pass. Otherwise finish with deployment prepared, not completed; the user can invoke09_DEPLOY_GITHUB after local review.
