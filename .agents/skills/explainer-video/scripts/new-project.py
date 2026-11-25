#!/usr/bin/env python3
"""Create an empty explainer project that follows SCHEMA.md (layout schema v1).

Cross-platform equivalent of new-project.sh (works on Windows PowerShell, macOS, and Linux):
    python scripts/new-project.py <name> ["<one-line description>"]
"""
import datetime
import json
import os
import re
import shutil
import subprocess
import sys
from pathlib import Path


def main() -> int:
    if len(sys.argv) < 2:
        print('usage: new-project.py <name> ["description"]', file=sys.stderr)
        return 2
    name = sys.argv[1]
    desc = sys.argv[2] if len(sys.argv) > 2 else "new explainer"
    if not re.fullmatch(r"[a-z0-9][a-z0-9-]*", name):
        print("name: lowercase letters, digits, hyphens only", file=sys.stderr)
        return 2

    root = Path(os.environ.get("EXPLAINER_ROOT", "~/explainer")).expanduser()
    skill = Path(__file__).resolve().parent.parent
    proj = root / name
    if proj.exists():
        print(f"{proj} exists; not touched", file=sys.stderr)
        return 1

    for sub in ("in/storyboards", "in/ref", "assets/voice", "assets/voice-norm", "assets/music",
                "src", "scripts", "work", "out",
                "public/voice-norm", "public/mouth", "public/sfx", "public/brand",
                "public/fonts", "public/characters", "public/backgrounds", "public/props",
                "public/screens", "public/faces"):
        (proj / sub).mkdir(parents=True, exist_ok=True)

    shutil.copytree(skill / "starter", proj, dirs_exist_ok=True)
    pkg_path = proj / "package.json"
    pkg_path.write_text(
        pkg_path.read_text(encoding="utf-8").replace('"name": "explainer-starter"', f'"name": "{name}"'),
        encoding="utf-8",
    )
    (proj / "storyboard.json").write_text(
        json.dumps({"gap_s": 0.4, "voices": {}, "beats": []}, indent=1) + "\n",
        encoding="utf-8",
    )
    subprocess.run(
        ["ffmpeg", "-nostdin", "-y", "-v", "error", "-f", "lavfi",
         "-i", "anullsrc=r=44100:cl=mono", "-t", "1", "-b:a", "128k",
         str(proj / "public" / "music.mp3")],
        check=True,
    )

    skip = {"check-layout.py", "new-project.sh", "new-project.py", "__pycache__"}
    for f in (skill / "scripts").iterdir():
        if f.name not in skip and f.is_file():
            shutil.copy2(f, proj / "scripts" / f.name)

    today = datetime.date.today().isoformat()
    card = f"""<!-- router: {desc} — status: started {today}, no video yet -->
# {name} — {desc}

## What it is

Topic, language, voices, brand, length. (Fill in.)

## Compositions

| Id | Storyboard | Output |
|---|---|---|
| `Full` | `storyboard.json` | `out/{name}-full.mp4` |

## Status

- {today}: project created with `new-project.py`.

## Render

```bash
cd "{proj}"
npm install
npx remotion still src/index.ts Full work/stills/f45.png --frame=45
npx remotion render src/index.ts Full out/{name}-full.mp4
```

## Layout

Follows `SCHEMA.md` of the explainer-video skill (layout schema v1).
Check it: `python "{skill / 'scripts' / 'check-layout.py'}" "{proj}"`.

Deviations: none.

## Decisions

(Choices that the user made, with the date and the reason.)
"""
    (proj / "CLAUDE.md").write_text(card, encoding="utf-8")
    print(f"created {proj}")
    subprocess.run([sys.executable, "-I", str(skill / "scripts" / "check-layout.py"), str(proj)], check=True)
    print(f"next:\n  cd \"{proj}\" && npm install\n  write in/brief.md, then the storyboard (SKILL.md step 1)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
