# Deployment Guide: Electronics Learning Lab

## Target Path
- **Subdirectory**: `projects/electronics-lab/` on the GitHub Pages website (`https://apisit-man.github.io/projects/electronics-lab/`)
- **Safety Guarantee**: Does not overwrite or conflict with `projects/arduino-lab/` or any other project.

---

## 1. Development & Local Testing
To run the local development server:
```bash
npm run dev
```
To run the automated numerical test suite:
```bash
npm test
```
To test the production build:
```bash
npm run build
npm run preview
```

---

## 2. Deploying to Personal Website (When Requested)
When ready to publish to the personal website repository:
1. Build the production bundle:
   ```bash
   npm run build
   ```
2. Copy the contents of `dist/` to `c:\Users\atong\Documents\antigravity\personal website\projects\electronics-lab\`:
   ```powershell
   $target = "c:\Users\atong\Documents\antigravity\personal website\projects\electronics-lab"
   New-Item -ItemType Directory -Force -Path $target | Out-Null
   Copy-Item -Path "dist\*" -Destination $target -Recurse -Force
   ```
3. Commit and push to GitHub:
   ```bash
   cd "c:\Users\atong\Documents\antigravity\personal website"
   git add projects/electronics-lab
   git commit -m "feat(projects): add Electronics Learning Lab (LED Polarity P0)"
   git push origin main
   ```
*(Note: As per project guidelines, automated deployment is deferred until explicitly requested by the user.)*
