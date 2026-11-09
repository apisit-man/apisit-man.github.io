# GitHub Pages deployment without disturbing the existing site

The candidate destination from the user's public-site context is `apisit-man/apisit-man.github.io`, under `projects/arduino-lab/`. This pack has not inspected or modified that repository. Verify repository identity, default branch, Pages source and any custom domain before using it. A URL assembled from a username is only a proposed address, not proof of deployment.

## Recommended: add a directory to the current website

1. Inspect the remote and working tree. Use the existing authorized GitHub connector or GitHub CLI (`gh auth status`, `gh repo view`, `gh api repos/OWNER/REPO/pages`) as appropriate. Do not expose tokens. Read the active deployment workflow and any build configuration.
2. Build `app/` and pass the production acceptance gates. Relative Vite base is required.
3. Select the verified route below. Never change the entire website's source setting just to add one app.

| Existing publish method | Integrate here | Preserve |
|---|---|---|
| Branch root, static/Jekyll | `<checkout>/projects/arduino-lab/` | Root index, CNAME, Jekyll config and other projects |
| Branch `/docs` | `<checkout>/docs/projects/arduino-lab/` | Existing docs tree and branch/Pages setting |
| Existing Actions build | Its actual source/public folder that survives the whole-site build | Existing workflow, framework routes and full output artifact |
| Generated deployment branch | The canonical source/build pipeline; do not hand-edit generated branch unless that is explicitly its workflow | Build provenance and other generated files |

For branch-published static trees only, run from this kit root after build:

```sh
# Dry run (no files changed):
node scripts/stage-pages.mjs --dist app/dist --repo ../apisit-man.github.io --publish-root .

# After verifying the printed repository, target and diff:
node scripts/stage-pages.mjs --dist app/dist --repo ../apisit-man.github.io --publish-root . --apply

# If the actual publish root is docs, use --publish-root docs in both calls.
```

This helper does not select a repository, change Pages settings, commit, push, delete old files or verify a live site. It refuses unknown pre-existing target content and locally modified target files. It creates an ownership manifest for future updates. Old hashed assets remain until a deliberate cleanup; do not recursively delete a target containing user files. If a new build no longer needs an old file, remove only a prior manifest-owned, unchanged file after confirming it is not shared.

4. Inspect `git diff` and `git status`; stage only the app subtree and a justified minimal integration change. Do not commit unrelated staged files. Commit normally and push to the verified source branch; use a PR when branch protection requires it.
5. Wait for the existing Pages/Actions result. Keep the prior commit for rollback. A push is not proof that Pages succeeded.
6. Obtain the actual live URL from Pages settings/deployment output. Test app entry, Thai button deep link, English project deep link, refresh and asset loading. Check an unrelated existing site page. Record the verified address and workflow result.

For Jekyll, a Vite build generally uses `assets/` and can be copied without a separate build. Do not assume an app-local `.nojekyll` changes how a root Jekyll build behaves. Inspect existing configuration/exclusions; preserve root Jekyll behavior. A `.nojekyll` file at the publishing root is relevant only when the whole site's workflow is intentionally plain static output.

## Separate repository alternative

Use this only if the user chooses an independent project repository. Put the application source at that repository's root, commit the lockfile, and copy `templates/pages-standalone.yml` to `.github/workflows/pages.yml`. Check current official action versions before committing; the supplied major versions are a starting template. Set Pages source to GitHub Actions for this new repository. Do not reuse this app-only artifact workflow in the existing whole-site repository.

For a separate project repo, the default URL is generally `<owner>.github.io/<repository>/`, subject to actual Pages/custom-domain configuration. `base:'./'` and hash routes support the repository prefix without per-domain source edits.

## Production checks

- Browser Network: all JS/CSS/assets return successfully below the app's path; no requests to the reference or a private API.
- Direct links: `index.html?lang=th#button` and `index.html?lang=en#project`; verify refresh/back/forward.
- Settings/local progress still work on the published origin; communicate that progress is local to that browser, not shared across devices.
- Both renderers work; HTML controls usable on touch and keyboard; no unexpected external audio/font/model requests.
- Existing home page and one existing project still load.
- Rollback uses a normal revert of the app deployment commit and the existing publish pipeline, never a force-push.

## Why no backend

GitHub Pages serves static files. Browser-side models, Three.js, Web Audio and local storage fit that model. Compiling arbitrary C++ would need an explicitly implemented browser toolchain or a separate service; do not insert an API key or assume Pages provides a compiler endpoint.
