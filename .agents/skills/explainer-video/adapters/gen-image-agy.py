#!/usr/bin/env python3
"""Generate an image through the agy CLI (Antigravity) on a Google subscription, no API key.

    gen-image-agy.py "a red paper rocket on a plain cream background" out.png
    gen-image-agy.py "make the rocket tilt left" out.png --input out.png --size 1536x1024

The same contract as gen-image.py. Use it when GEMINI_API_KEY is not set.

agy is an agent, not a model call: it can rewrite a prompt. This adapter reads the transcript
of the agy image tool and accepts the image only if the tool got the prompt character for
character, with the requested aspect ratio and input images. Otherwise it fails, and writes
no output file.

agy picks its own image model, so --model is ignored. agy uses the Google account that is
logged in to it (look in ~/.gemini/google_accounts.json). Do not send employer material
through a personal account.
"""
import argparse
import json
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

ASPECTS = {"1024x1024": "1:1", "1536x1024": "3:2", "1024x1536": "2:3", "1920x1080": "16:9",
           "1080x1920": "9:16", "1344x768": "16:9", "768x1344": "9:16"}
MAX_ATTEMPTS = 2          # a rewritten prompt is retried once, then the call fails
AGY_TIMEOUT_S = 600       # one agy run: an image takes about 30 to 90 s
MAX_INPUTS = 3


class Mismatch(Exception):
    """The agy run did not make exactly the image that was requested."""


def aspect_for(size: str) -> str:
    if size not in ASPECTS:
        raise ValueError(f"unknown --size {size}; use one of {', '.join(sorted(ASPECTS))}")
    return ASPECTS[size]


def build_instruction(prompt: str, aspect: str, inputs: list[str]) -> str:
    """The message to agy. Values are JSON literals, so quotes in the prompt survive."""
    lines = [
        "Call the generate_image tool exactly once, with these argument values, unchanged:",
        f"Prompt: {json.dumps(prompt)}",
        f"AspectRatio: {json.dumps(aspect)}",
    ]
    if inputs:
        lines.append(f"ImagePaths: {json.dumps(inputs)}")
    lines.append("Do not change, shorten or extend the prompt. Do not save, copy, move or "
                 "convert any file. Do nothing else.")
    return "\n".join(lines)


def _tool_arg(args: dict, key: str):
    """agy logs each argument value as a JSON string. An absent argument returns None."""
    raw = args.get(key)
    return None if raw is None else json.loads(raw)


def _check_call(args: dict, prompt: str, aspect: str, inputs: list[str]) -> None:
    got_prompt = _tool_arg(args, "Prompt")
    if got_prompt != prompt:
        raise Mismatch(f"agy changed the prompt to {got_prompt!r}")
    got_aspect = _tool_arg(args, "AspectRatio")
    if got_aspect != aspect:
        raise Mismatch(f"agy asked for aspect {got_aspect!r}, not {aspect!r}")
    got_inputs = _tool_arg(args, "ImagePaths") or []
    if got_inputs != inputs:
        raise Mismatch(f"agy sent input images {got_inputs}, not {inputs}")


def _media_path(step: dict) -> Path | None:
    for m in step.get("media") or []:
        uri = m.get("uri", "")
        if uri.startswith("file://"):
            return Path(uri.removeprefix("file://"))
    return None


def find_generated(lines: list[str], prompt: str, aspect: str, inputs: list[str]) -> Path:
    """The file of the one generate_image call in the transcript lines, after the checks."""
    steps = []
    for line in lines:
        try:
            steps.append(json.loads(line))
        except json.JSONDecodeError:
            continue   # agy log lines that are not JSON carry no tool calls
    calls = [(i, c) for i, s in enumerate(steps)
             for c in s.get("tool_calls") or [] if c.get("name") == "generate_image"]
    if not calls:
        raise Mismatch("agy made no generate_image call")
    if len(calls) > 1:
        raise Mismatch(f"agy made {len(calls)} generate_image calls, not 1")
    index, call = calls[0]
    _check_call(call.get("args", {}), prompt, aspect, inputs)
    for step in steps[index + 1:]:
        path = _media_path(step)
        if path is not None:
            return path
    raise Mismatch("the generate_image call returned no image")


def _transcripts(stream: str) -> list[Path]:
    """The transcript of the agy conversation and of each subagent it started."""
    found = []
    brain = Path.home() / ".gemini/antigravity-cli/brain"
    for line in stream.splitlines():
        try:
            event = json.loads(line)
        except json.JSONDecodeError:
            continue   # agy prints progress text between the JSON events
        if event.get("event") == "init" and event.get("conversation_id"):
            found.append(brain / event["conversation_id"] / ".system_generated/logs/transcript.jsonl")
        for sub in (event.get("step_update") or {}).get("subagent_info", {}).get("subagents", []):
            uri = sub.get("log_uri", "")
            if uri.startswith("file://"):
                found.append(Path(uri.removeprefix("file://")))
    return list(dict.fromkeys(p for p in found if p.is_file()))


def run_agy(prompt: str, aspect: str, inputs: list[Path]) -> Path:
    """One agy run in a fresh folder, in sandbox mode. Returns the generated image file."""
    with tempfile.TemporaryDirectory(prefix="gen-image-agy-") as tmp:
        work = Path(tmp)
        copies = []
        for n, src in enumerate(inputs):
            dst = work / f"in-{n}{src.suffix.lower()}"
            shutil.copyfile(src, dst)
            copies.append(str(dst.resolve()))
        instruction = build_instruction(prompt, aspect, copies)
        proc = subprocess.run(
            ["agy", "-p", instruction, "--sandbox", "--dangerously-skip-permissions",
             "--output-format", "stream-json"],
            cwd=work, capture_output=True, text=True, timeout=AGY_TIMEOUT_S, check=False)
        if proc.returncode != 0:
            raise RuntimeError(f"agy exited {proc.returncode}: {proc.stderr.strip()[-500:]}")
        lines = []
        for t in _transcripts(proc.stdout):
            lines += t.read_text(encoding="utf-8").splitlines()
        return find_generated(lines, prompt, aspect, copies)


def save_png(src: Path, out: Path) -> None:
    """Write src as a real PNG to out. agy returns a JPEG; the skill expects PNG."""
    from PIL import Image
    part = out.with_name(out.name + ".part")
    with Image.open(src) as img:
        img.convert("RGBA" if img.mode in ("RGBA", "LA", "P") else "RGB").save(part, format="PNG")
    part.replace(out)


def main() -> int:
    ap = argparse.ArgumentParser(description="Generate an image through the agy CLI, no API key.")
    ap.add_argument("prompt")
    ap.add_argument("output", help="output .png")
    ap.add_argument("--size", default="1024x1024", choices=sorted(ASPECTS))
    ap.add_argument("--model", help="ignored: agy picks its own image model")
    ap.add_argument("--input", action="append", default=[], metavar="FILE",
                    help=f"source image for an edit (repeatable, max {MAX_INPUTS})")
    args = ap.parse_args()
    if len(args.input) > MAX_INPUTS:
        ap.error(f"at most {MAX_INPUTS} --input images")
    if args.model:
        print(f"note: --model {args.model} ignored, agy picks its own image model", file=sys.stderr)
    if shutil.which("agy") is None:
        sys.exit("agy is not on PATH: install Antigravity, or set GEMINI_API_KEY and use gen-image.py")

    out = Path(args.output)
    if not out.parent.is_dir():
        sys.exit(f"output directory does not exist: {out.parent}")
    inputs = [Path(f) for f in args.input]
    for f in inputs:
        if not f.is_file():
            sys.exit(f"input image does not exist: {f}")
    aspect = aspect_for(args.size)

    for attempt in range(1, MAX_ATTEMPTS + 1):
        try:
            src = run_agy(args.prompt, aspect, inputs)
        except Mismatch as e:
            print(f"attempt {attempt}/{MAX_ATTEMPTS}: {e}", file=sys.stderr)
            continue
        save_png(src, out)
        print(f"{out} ({out.stat().st_size} B), via agy")
        return 0
    sys.exit(f"agy did not make the requested image in {MAX_ATTEMPTS} attempts; no file written")


if __name__ == "__main__":
    sys.exit(main())
