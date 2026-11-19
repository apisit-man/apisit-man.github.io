#!/usr/bin/env python3
"""
Dual-Engine Thai Speech Generator for Thai Free Collage Director
1. Primary: Google AI Studio Gemini TTS (gemini-3.8-flash-tts / gemini-3.1-flash-tts-preview)
   - Studio-grade, natural human expression, authentic Thai cadence, zero robotic artifacts.
   - Powered by GEMINI_API_KEY or GOOGLE_API_KEY from environment.
   - Voices: 'Puck' (lively/friendly male narrator), 'Aoede' (warm/breezy female), 'Zephyr' (bright/clear), 'Kore' (calm), 'Fenrir' (energetic).
2. Fallback: Edge TTS (th-TH-NiwatNeural / th-TH-PremwadeeNeural)
   - Fast, reliable offline fallback when network is unavailable.
"""

from __future__ import annotations
import argparse
import asyncio
import base64
import json
import os
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

DEFAULT_VOICE = "Puck"
VOICE_MAP_EDGE = {
    "Puck": "th-TH-NiwatNeural",
    "Fenrir": "th-TH-NiwatNeural",
    "Aoede": "th-TH-PremwadeeNeural",
    "Zephyr": "th-TH-PremwadeeNeural",
    "Kore": "th-TH-PremwadeeNeural",
    "male": "th-TH-NiwatNeural",
    "female": "th-TH-PremwadeeNeural",
}

def get_audio_duration(file_path: str | Path) -> float:
    """Accurately probe audio file duration in seconds."""
    cmd = [
        "ffprobe", "-v", "error",
        "-show_entries", "format=duration",
        "-of", "default=noprint_wrappers=1:nokey=1",
        str(file_path)
    ]
    res = subprocess.run(cmd, capture_output=True, text=True, check=True)
    return float(res.stdout.strip())

def synthesize_gemini_tts(text: str, output_wav: str | Path, voice: str = DEFAULT_VOICE) -> bool:
    """Synthesize voice using Google AI Studio Gemini TTS API."""
    try:
        from google import genai
    except ImportError:
        print("⚠️ [TTS] google-genai library not found.")
        return False

    api_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
    if not api_key:
        print("⚠️ [TTS] No GEMINI_API_KEY or GOOGLE_API_KEY found in environment.")
        return False

    client = genai.Client(http_options={"api_version": "v1beta"})
    models_to_try = ["gemini-3.8-flash-tts", "gemini-3.1-flash-tts-preview", "gemini-3.8-flash-lite-tts"]

    for model_name in models_to_try:
        try:
            print(f"🎙️ [Google AI Studio TTS] Synthesizing ({model_name}, voice '{voice}'): '{text[:35]}...'")
            interaction = client.interactions.create(
                model=model_name,
                input=[{
                    "type": "user_input",
                    "content": [{
                        "type": "text",
                        "text": text
                    }]
                }],
                response_format={"type": "audio", "mime_type": "audio/wav"},
                generation_config={
                    "speech_config": [
                        {"voice": voice}
                    ]
                }
            )

            if interaction.output_audio and interaction.output_audio.data:
                data = base64.b64decode(interaction.output_audio.data)
                Path(output_wav).write_bytes(data)
                print(f"✨ [Google AI Studio TTS] Saved ({len(data):,} bytes) -> {output_wav}")
                return True
        except Exception as e:
            print(f"⚠️ [Google AI Studio TTS] {model_name} attempt error: {e}")

    return False

async def synthesize_edge_tts_async(text: str, output_wav: str | Path, voice: str = "th-TH-NiwatNeural") -> bool:
    """Synthesize voice using Microsoft Edge TTS (offline / no API key required)."""
    import edge_tts
    print(f"🎙️ [Edge TTS Fallback] Synthesizing (voice '{voice}'): '{text[:35]}...'")
    tmp_mp3 = Path(output_wav).with_suffix(".tmp.mp3")
    communicator = edge_tts.Communicate(text=text, voice=voice)
    await communicator.save(str(tmp_mp3))

    # Convert to 24000Hz 16-bit mono WAV for uniform playback
    subprocess.run([
        "ffmpeg", "-hide_banner", "-loglevel", "error", "-y",
        "-i", str(tmp_mp3),
        "-ar", "24000", "-ac", "1",
        str(output_wav)
    ], check=True)

    tmp_mp3.unlink(missing_ok=True)
    print(f"✅ [Edge TTS Fallback] Saved -> {output_wav}")
    return True

def synthesize_clip(text: str, output_wav: str | Path, voice: str = DEFAULT_VOICE, prefer_gemini: bool = True) -> bool:
    """Generate audio clip with primary Google AI Studio TTS and automatic Edge TTS fallback."""
    if prefer_gemini:
        ok = synthesize_gemini_tts(text, output_wav, voice=voice)
        if ok:
            return True
        print("🔄 [TTS] Switching to Edge TTS fallback...")

    edge_voice = VOICE_MAP_EDGE.get(voice, voice if voice.startswith("th-TH-") else "th-TH-NiwatNeural")
    try:
        asyncio.run(synthesize_edge_tts_async(text, output_wav, voice=edge_voice))
        return True
    except Exception as e:
        print(f"❌ [TTS Error] Edge TTS also failed: {e}")
        return False

def generate_storyboard_narration(
    shots: list[dict],
    output_wav: str | Path,
    voice: str = DEFAULT_VOICE,
    prefer_gemini: bool = True,
    sync_duration: bool = True,
    pause_after_shot: float = 0.35
) -> tuple[Path, list[dict]]:
    """
    Synthesize complete synchronized narration for all shots in a storyboard.
    Pads each shot's audio with silence to exactly match the shot's visual duration,
    ensuring 100% synchronization between scene animation and spoken voice.
    """
    output_wav = Path(output_wav)
    output_wav.parent.mkdir(parents=True, exist_ok=True)
    temp_dir = Path(tempfile.mkdtemp(prefix="collage_tts_"))
    padded_wavs = []

    try:
        for i, shot in enumerate(shots):
            text = str(shot.get("narration") or shot.get("caption") or "").strip()
            if not text:
                text = str(shot.get("headline") or "").strip()

            raw_wav = temp_dir / f"shot_{i}_raw.wav"
            padded_wav = temp_dir / f"shot_{i}_padded.wav"

            ok = synthesize_clip(text, raw_wav, voice=voice, prefer_gemini=prefer_gemini)
            if not ok or not raw_wav.is_file():
                raise RuntimeError(f"Failed to synthesize voice for shot {i+1}: {text}")

            audio_len = get_audio_duration(raw_wav)
            if sync_duration:
                current_dur = float(shot.get("duration", 3.0))
                target_dur = max(current_dur, audio_len + pause_after_shot)
                shot["duration"] = round(target_dur, 2)
            else:
                target_dur = float(shot.get("duration", 3.0))

            print(f"  🎬 Shot {i+1}: Voice length={audio_len:.2f}s | Visual scene duration={shot['duration']:.2f}s")

            # Pad with silence so audio duration precisely equals shot duration
            subprocess.run([
                "ffmpeg", "-hide_banner", "-loglevel", "error", "-y",
                "-i", str(raw_wav),
                "-af", f"apad,atrim=0:{shot['duration']:.3f}",
                "-ar", "24000", "-ac", "1",
                str(padded_wav)
            ], check=True)
            padded_wavs.append(padded_wav)

        # Concatenate all shot audios into one seamless master narration track
        inputs = []
        filter_inputs = []
        for i, p in enumerate(padded_wavs):
            inputs.extend(["-i", str(p)])
            filter_inputs.append(f"[{i}:a]")
        filter_complex = "".join(filter_inputs) + f"concat=n={len(padded_wavs)}:v=0:a=1[outa]"

        cmd = [
            "ffmpeg", "-hide_banner", "-loglevel", "error", "-y",
            *inputs,
            "-filter_complex", filter_complex,
            "-map", "[outa]",
            "-ar", "24000", "-ac", "1",
            str(output_wav)
        ]
        subprocess.run(cmd, check=True)
        total_len = get_audio_duration(output_wav)
        print(f"🎉 Master narration generated: {output_wav} (Total: {total_len:.2f}s)")
        return output_wav, shots

    finally:
        shutil.rmtree(temp_dir, ignore_errors=True)

def main():
    parser = argparse.ArgumentParser(description="Thai TTS generator via Google AI Studio Gemini API with Edge TTS fallback.")
    parser.add_argument("--text", help="Single text sentence to synthesize")
    parser.add_argument("--storyboard", help="Path to storyboard JSON file")
    parser.add_argument("--out", default="out/narration.wav", help="Output WAV path")
    parser.add_argument("--voice", default=DEFAULT_VOICE, help="Voice name (Puck, Aoede, Zephyr, Kore, Fenrir, th-TH-NiwatNeural, etc.)")
    parser.add_argument("--engine", choices=["gemini", "edge", "auto"], default="auto", help="TTS engine")
    parser.add_argument("--no-sync", action="store_true", help="Do not adjust shot duration in storyboard")
    args = parser.parse_args()

    prefer_gemini = args.engine != "edge"
    if args.text:
        ok = synthesize_clip(args.text, args.out, voice=args.voice, prefer_gemini=prefer_gemini)
        if ok:
            print(f"Generated audio: {args.out} ({get_audio_duration(args.out):.2f}s)")
        else:
            sys.exit(1)
    elif args.storyboard:
        sb = json.loads(Path(args.storyboard).read_text(encoding="utf-8-sig"))
        shots = sb.get("shots", [])
        out_wav, updated_shots = generate_storyboard_narration(
            shots, args.out, voice=args.voice, prefer_gemini=prefer_gemini, sync_duration=not args.no_sync
        )
        print(f"Completed: {out_wav} with {len(updated_shots)} shots.")
    else:
        parser.print_help()

if __name__ == "__main__":
    main()
