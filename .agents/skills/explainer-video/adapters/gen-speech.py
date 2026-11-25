#!/usr/bin/env python3
"""Generate speech. Reference adapter for the explainer-video skill.

    pip install edge-tts elevenlabs
    export ELEVENLABS_API_KEY=...      # only for the elevenlabs-* models

    gen-speech.py "Hello, this is a test." out.mp3 --model edge-tts --voice en-GB-SoniaNeural
    gen-speech.py "Hello." out.mp3 --model elevenlabs-v4 --voice <voice_id> \
        --stability 0.3 --similarity 0.8 --style 0.45 --speed 1.0 --previous-text "Earlier line."

Models
    edge-tts          Free, keyless Microsoft voices. Plain reading, no acting. Use it for
                      every preview and the first full cut. Voice names: edge-tts --list-voices.
    elevenlabs-v4     ElevenLabs v3 (expressive, audio tags). Set all four knobs.
    elevenlabs-tts    ElevenLabs v2 (multilingual_v2). No audio tags: it can speak them aloud.
    elevenlabs-flash  ElevenLabs flash v2.5. The cheapest paid model; use it for tests.

--voice is an edge voice name for edge-tts and an ElevenLabs voice id for the paid models.
Never clone a real person's voice without that person's written consent.
"""
import argparse
import asyncio
import inspect
import os
import subprocess
import sys
from pathlib import Path

MODELS = ("edge-tts", "elevenlabs-v4", "elevenlabs-tts", "elevenlabs-flash")
API_MODEL = {"elevenlabs-v4": "eleven_v3", "elevenlabs-tts": "eleven_multilingual_v2",
             "elevenlabs-flash": "eleven_flash_v2_5"}
DEFAULT_EDGE_VOICE = "en-GB-SoniaNeural"


def run_edge(args, text, out):
    try:
        import edge_tts
    except ImportError:
        sys.exit("install the adapter dependencies: pip install edge-tts")
    voice = args.voice or DEFAULT_EDGE_VOICE
    if args.speed:
        rate = f"{round((args.speed - 1) * 100):+d}%"
    else:
        rate = "+0%"
    comm = edge_tts.Communicate(text, voice, rate=rate)
    asyncio.run(comm.save(str(out)))


def run_elevenlabs(args, text, out):
    try:
        from elevenlabs import ElevenLabs, VoiceSettings
    except ImportError:
        sys.exit("install the adapter dependencies: pip install elevenlabs")
    if not os.environ.get("ELEVENLABS_API_KEY"):
        sys.exit("set ELEVENLABS_API_KEY")
    if not args.voice:
        sys.exit("--voice is required for the elevenlabs-* models (an ElevenLabs voice id)")

    settings = None
    if any(v is not None for v in (args.stability, args.similarity, args.style, args.speed)):
        knobs = {
            "stability": args.stability if args.stability is not None else 0.5,
            "similarity_boost": args.similarity if args.similarity is not None else 0.75,
            "style": args.style if args.style is not None else 0.0,
            "speed": args.speed if args.speed is not None else 1.0,
            "use_speaker_boost": True,
        }
        known = inspect.signature(VoiceSettings.__init__).parameters
        settings = VoiceSettings(**{k: v for k, v in knobs.items() if k in known})
    client = ElevenLabs()
    kwargs = {
        "voice_id": args.voice,
        "text": text,
        "model_id": API_MODEL[args.model],
        "output_format": "mp3_44100_128",
        "voice_settings": settings,
        "language_code": args.language,
        "previous_text": args.previous_text,
        "next_text": args.next_text,
    }
    # drop unset options and anything this SDK version does not take
    params = inspect.signature(client.text_to_speech.convert).parameters
    kwargs = {k: v for k, v in kwargs.items() if v is not None and k in params}
    audio = client.text_to_speech.convert(**kwargs)
    out.write_bytes(b"".join(audio))


def to_mp3(src, out):
    """edge-tts writes a 24 kHz stream; bring every take to 44.1 kHz mp3."""
    subprocess.run(["ffmpeg", "-nostdin", "-y", "-v", "error", "-i", str(src),
                    "-ar", "44100", "-codec:a", "libmp3lame", "-b:a", "192k", str(out)], check=True)


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("text", nargs="?", help="text to speak (omit with --list-voices)")
    ap.add_argument("output", nargs="?", help="output .mp3")
    ap.add_argument("--model", default="edge-tts", choices=MODELS)
    ap.add_argument("--voice", help=f"edge voice name, or an ElevenLabs voice id "
                                    f"(edge default {DEFAULT_EDGE_VOICE})")
    ap.add_argument("--stability", type=float)
    ap.add_argument("--similarity", type=float)
    ap.add_argument("--style", type=float)
    ap.add_argument("--speed", type=float)
    ap.add_argument("--language", metavar="CODE", help="ISO code, e.g. sk (ElevenLabs only)")
    ap.add_argument("--previous-text", metavar="TEXT", help="ElevenLabs only")
    ap.add_argument("--next-text", metavar="TEXT", help="ElevenLabs only")
    ap.add_argument("--list-voices", action="store_true", help="edge-tts voice names, then exit")
    args = ap.parse_args()

    if args.list_voices:
        import edge_tts
        voices = asyncio.run(edge_tts.list_voices())
        for v in sorted(voices, key=lambda v: v["ShortName"]):
            print(f"{v['ShortName']:40s} {v['Gender']}")
        return 0
    if not args.text or not args.output:
        ap.error("text and output are required")
    text = args.text

    out = Path(args.output)
    if not out.parent.is_dir():
        sys.exit(f"output directory does not exist: {out.parent}")

    if args.model == "edge-tts":
        for flag in ("stability", "similarity", "style", "language", "previous_text", "next_text"):
            if getattr(args, flag) is not None:
                sys.exit(f"--{flag.replace('_', '-')} works only with the elevenlabs-* models")
        tmp = out.with_suffix(".edge.mp3")
        run_edge(args, text, tmp)
        to_mp3(tmp, out)
        tmp.unlink()
    else:
        run_elevenlabs(args, text, out)
    print(f"{out} ({out.stat().st_size} B), model {args.model}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
