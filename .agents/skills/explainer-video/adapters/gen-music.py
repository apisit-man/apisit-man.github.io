#!/usr/bin/env python3
"""Generate a music bed with ElevenLabs music. Reference adapter for the explainer-video skill.

    pip install elevenlabs
    export ELEVENLABS_API_KEY=...

    gen-music.py in/music-plan.json assets/music/score.mp3

The input is a JSON file with a free "prompt" and either "length_ms" or a "composition_plan"
with timed sections. Send a composition plan: a free prompt does not hold the length. Write
the arc into the prompt (instruments, the turn points in seconds, the ending) and always add
"No vocals". Ask for a few seconds more than the picture, so the music can end cleanly.

Generate the take at the cut's length instead of stretching it afterwards. Then fit it with
scripts/fit-music.py, which only trims, tames the peaks and fades.

{
  "prompt": "Gentle marimba and soft strings, curious and light. Quiet opening, a lift at 20 s, a soft resolved ending. No vocals.",
  "length_ms": 65000
}
"""
import argparse
import inspect
import json
import os
import sys
from pathlib import Path


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("plan", help="JSON: prompt + length_ms, or prompt + composition_plan")
    ap.add_argument("output", help="output .mp3")
    args = ap.parse_args()

    try:
        from elevenlabs import ElevenLabs
    except ImportError:
        sys.exit("install the adapter dependencies: pip install elevenlabs")
    if not os.environ.get("ELEVENLABS_API_KEY"):
        sys.exit("set ELEVENLABS_API_KEY")

    plan = json.loads(Path(args.plan).read_text(encoding="utf-8"))
    if "length_ms" in plan:
        plan["music_length_ms"] = plan.pop("length_ms")  # the SDK's name for the same thing
    if "music_length_ms" not in plan and "composition_plan" not in plan:
        sys.exit("the plan needs length_ms or composition_plan")
    out = Path(args.output)
    if not out.parent.is_dir():
        sys.exit(f"output directory does not exist: {out.parent}")

    client = ElevenLabs()
    params = inspect.signature(client.music.compose).parameters
    unknown = sorted(set(plan) - set(params))
    if unknown:
        sys.exit(f"this SDK's music.compose does not take: {', '.join(unknown)}")
    audio = client.music.compose(**plan)
    out.write_bytes(b"".join(audio))
    print(f"{out} ({out.stat().st_size} B)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
