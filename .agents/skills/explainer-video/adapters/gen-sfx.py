#!/usr/bin/env python3
"""Generate a sound effect with ElevenLabs. Reference adapter for the explainer-video skill.

    pip install elevenlabs
    export ELEVENLABS_API_KEY=...

    gen-sfx.py "soft user interface tick click" tick.wav --seconds 2 --seed 7

The explainer scripts ask for whole seconds and trim the take themselves: short or fractional
lengths come back unreliable from sound models. A seed gives a repeatable take.
"""
import argparse
import inspect
import os
import subprocess
import sys
from pathlib import Path


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("prompt", help="what the sound is, in English")
    ap.add_argument("output", help="output .wav")
    ap.add_argument("--seconds", type=float, default=2.0, help="clip length, 1-22 s (default 2)")
    ap.add_argument("--seed", type=int, default=None, help="fixed seed for a repeatable result")
    args = ap.parse_args()
    if not 1 <= args.seconds <= 22:
        ap.error("--seconds must be between 1 and 22")

    try:
        from elevenlabs import ElevenLabs
    except ImportError:
        sys.exit("install the adapter dependencies: pip install elevenlabs")
    if not os.environ.get("ELEVENLABS_API_KEY"):
        sys.exit("set ELEVENLABS_API_KEY")

    out = Path(args.output)
    if not out.parent.is_dir():
        sys.exit(f"output directory does not exist: {out.parent}")
    client = ElevenLabs()
    kwargs = {"text": args.prompt, "duration_seconds": args.seconds, "loop": False}
    if args.seed is not None:
        kwargs["seed"] = args.seed
    # older SDKs do not take every optional field; drop what this one does not know
    params = inspect.signature(client.text_to_sound_effects.convert).parameters
    dropped = sorted(set(kwargs) - set(params))
    if dropped:
        print(f"note: this SDK ignores {', '.join(dropped)}", file=sys.stderr)
        kwargs = {k: v for k, v in kwargs.items() if k in params}
    audio = client.text_to_sound_effects.convert(**kwargs)
    raw = out.with_suffix(".mp3")
    raw.write_bytes(b"".join(audio))
    subprocess.run(["ffmpeg", "-nostdin", "-y", "-v", "error", "-i", str(raw),
                    "-ar", "44100", "-ac", "1", "-c:a", "pcm_s16le", str(out)], check=True)
    raw.unlink()
    print(f"{out} ({out.stat().st_size} B)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
