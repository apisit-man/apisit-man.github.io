#!/usr/bin/env python3
"""Check explainer projects against SCHEMA.md (layout schema v1).

    check-layout.py                 check every project under the explainer root
    check-layout.py <project> ...   check the named projects (a name or a path)
    check-layout.py --root DIR      use another explainer root

The root is EXPLAINER_ROOT, or ~/explainer.
Exit code 0: no error. 1: at least one error. A warning does not change the exit code.
Read-only: the script never changes a file.
"""
import os
import re
import sys
from pathlib import Path

ROOT = Path(os.environ.get("EXPLAINER_ROOT", "~/explainer")).expanduser()
KINDS = {"voice", "voice-norm", "mouth", "music", "sfx", "brand", "fonts",
         "characters", "backgrounds", "props", "screens", "faces"}
TOP_FILES = {"CLAUDE.md", "AGENTS.md", "sfx.json", "package.json", "package-lock.json",
             "tsconfig.json", ".gitignore", "README.md"}
TOP_DIRS = {"in", "assets", "public", "src", "scripts", "work", "out", "node_modules"}
IN_FILES = {"brief.md", "script.md", "characters.md", "music-plan.json"}
IN_DIRS = {"storyboards", "ref"}
WORK_KINDS = {"logs", "stills", "sheets", "mix", "review", "takes", "drafts", "old"}
JUNK = {"__pycache__", ".ruff_cache", ".pytest_cache", ".DS_Store"}
FINALS = {".mp4", ".srt", ".vtt"}
STATIC = re.compile(r"""staticFile\(\s*(?:`|'|")([^`'"$)]*)""")


class Report:
    def __init__(self, name):
        self.name, self.errors, self.warns = name, [], []

    def err(self, msg):
        self.errors.append(msg)

    def warn(self, msg):
        self.warns.append(msg)


def check_top(p, r):
    for e in sorted(p.iterdir()):
        n = e.name
        if e.is_dir() and not e.is_symlink():
            if n not in TOP_DIRS:
                r.err(f"unknown folder in the root: {n}/")
        elif n == "node_modules":
            if not e.is_symlink():
                r.warn("node_modules is a real folder; link it to a shared copy to save space")
        elif re.fullmatch(r"storyboard(-[A-Za-z0-9_]+)?\.json", n) or n in TOP_FILES:
            pass
        else:
            r.err(f"unknown file in the root: {n}")
    for need in ("CLAUDE.md", "storyboard.json", "package.json", "in", "public", "src", "out"):
        if not (p / need).exists():
            r.err(f"missing: {need}")
    if (p / "src").exists() and not (p / "src/index.ts").exists():
        r.err("missing: src/index.ts")


def check_in(p, r):
    d = p / "in"
    if not d.is_dir():
        return
    for e in sorted(d.iterdir()):
        ok = (e.is_file() and (e.name in IN_FILES or re.fullmatch(r"brief[-\w.]*\.md", e.name)
                               or e.name.endswith((".md", ".json")))) or (e.is_dir() and e.name in IN_DIRS)
        if not ok:
            r.err(f"in/{e.name}: not an input file (allowed: *.md, *.json, storyboards/, ref/)")


def check_kinds(p, zone, r, loose_ok):
    d = p / zone
    if not d.is_dir():
        return
    for e in sorted(d.iterdir()):
        if e.is_dir():
            if e.name not in KINDS:
                r.err(f"{zone}/{e.name}/: not a standard kind ({', '.join(sorted(KINDS))})")
        elif not loose_ok(e.name):
            r.err(f"{zone}/{e.name}: loose file; put it in a kind folder")
    chars = d / "characters"
    if chars.is_dir():
        for e in chars.iterdir():
            if e.is_file():
                r.err(f"{zone}/characters/{e.name}: a character has its own folder characters/<name>/")


def check_out(p, r):
    d = p / "out"
    if not d.is_dir():
        return
    for e in sorted(d.iterdir()):
        if e.suffix not in FINALS:
            r.err(f"out/{e.name}: out/ holds finals only ({', '.join(sorted(FINALS))})")
        elif re.search(r"(sample|draft|tmp|test)", e.name):
            r.warn(f"out/{e.name}: looks like a sample; delete it at delivery")


def check_work(p, r):
    d = p / "work"
    if not d.is_dir():
        return
    loose = [e.name for e in d.iterdir() if e.is_file()]
    if len(loose) > 12:
        r.warn(f"work/ has {len(loose)} loose files; sort them into {', '.join(sorted(WORK_KINDS))}")


def check_junk(p, r):
    for e in p.rglob("*"):
        if "node_modules" in e.parts:
            continue
        if e.name in JUNK:
            r.err(f"cache folder: {e.relative_to(p)}")


def check_static(p, r):
    """Every literal staticFile() path in src/ must exist in public/."""
    src = p / "src"
    if not src.is_dir():
        return
    seen = set()
    for f in list(src.rglob("*.ts")) + list(src.rglob("*.tsx")):
        for m in STATIC.finditer(f.read_text(encoding="utf-8", errors="replace")):
            ref = m.group(1).rstrip("/")
            if not ref or ref in seen:
                continue
            seen.add(ref)
            if not (p / "public" / ref).exists() and not any((p / "public").glob(ref + "*")):
                r.err(f"{f.relative_to(p)}: staticFile('{ref}') is not in public/")
    for f in list(src.rglob("*.ts")) + list(src.rglob("*.tsx")):
        if re.search(r"""['"`][^'"`]*\bwork/""", f.read_text(encoding="utf-8", errors="replace")):
            r.warn(f"{f.relative_to(p)}: src/ names work/; nothing in work/ may be a render input")


def check_card(p, r):
    c = p / "CLAUDE.md"
    if not c.exists():
        return
    t = c.read_text(encoding="utf-8", errors="replace")
    if not t.lstrip().startswith("<!-- router:"):
        r.warn("CLAUDE.md: the first line is not the <!-- router: ... --> marker")
    if not re.search(r"^## Layout\b", t, re.MULTILINE):
        r.warn("CLAUDE.md: no '## Layout' section (follows ../SCHEMA.md / deviations)")


def check(p):
    r = Report(p.name)
    check_top(p, r)
    check_in(p, r)
    check_kinds(p, "assets", r, lambda n: False)
    check_kinds(p, "public", r, lambda n: bool(re.fullmatch(r"music(-[\w]+)?\.mp3", n)))
    check_out(p, r)
    check_work(p, r)
    check_junk(p, r)
    check_static(p, r)
    check_card(p, r)
    return r


def main(argv):
    root, names = ROOT, []
    it = iter(argv)
    for a in it:
        if a == "--root":
            root = Path(next(it))
        elif a in ("-h", "--help"):
            print(__doc__)
            return 0
        else:
            names.append(a)
    if names:
        projects = [Path(n) if ("/" in n or "\\" in n or Path(n).exists()) else root / n for n in names]
    else:
        projects = sorted(d for d in root.iterdir()
                          if d.is_dir() and not d.name.startswith(("_", ".")) and (d / "src").exists())
    bad = 0
    for p in projects:
        if not p.is_dir():
            print(f"{p}: not a folder")
            bad += 1
            continue
        r = check(p)
        mark = "FAIL" if r.errors else ("warn" if r.warns else "ok  ")
        print(f"{mark}  {r.name}")
        for m in r.errors:
            print(f"        error: {m}")
        for m in r.warns:
            print(f"        warn:  {m}")
        bad += bool(r.errors)
    print(f"\n{len(projects)} projects, {bad} with errors")
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
