#!/usr/bin/env python3
"""
Dual-Engine Thai Speech Generator for Thai Free Collage Director
1. Primary: Google AI Studio Gemini TTS (gemini-3.8-flash-tts / gemini-3.1-flash-tts-preview)
   - Single-pass continuous synthesis guarantees 100% consistent speaker identity, pitch, and tone across all shots.
   - Numpy RMS silence-valley alignment automatically snaps scene cuts into natural breath pauses between sentences.
   - Voices: 'Puck' (lively/friendly male narrator), 'Aoede' (warm/breezy female), 'Zephyr' (bright/clear), 'Kore' (calm), 'Fenrir' (energetic).
2. Fallback: Edge TTS (th-TH-NiwatNeural / th-TH-PremwadeeNeural)
   - Fast, reliable offline fallback when network is unavailable.
"""

from __future__ import annotations
import argparse
import asyncio
import base64
import json
import math
import os
import re
import shutil
import subprocess
import sys
import tempfile
import wave
from pathlib import Path

try:
    import numpy as np
except ImportError:
    np = None

DEFAULT_VOICE = "Puck"
DEFAULT_NARRATOR_STYLE = (
    "Consistent single Thai documentary narrator throughout the entire recording, "
    "engaging, confident, clear articulation, natural studio microphone tone, steady energetic pacing."
)

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

def _clean_text_weight(text: str) -> int:
    """Compute speech-duration weight based on Thai/alphanumeric syllable characters."""
    cleaned = re.sub(r'[\s\.\,\!\?\-\:\;\(\)\"“”\'*]+', '', str(text))
    # Give slightly more weight to numbers/Latin acronyms that take multiple Thai syllables to read (e.g. 126, mg/dL, AI)
    nums = re.findall(r'[0-9]+|[A-Za-z]+', cleaned)
    extra = sum(len(n) * 2 for n in nums)
    return max(8, len(cleaned) + extra)

def align_shots_to_single_wav(wav_path: str | Path, shots: list[dict]) -> list[dict]:
    """
    Analyze RMS energy of a single continuous narration WAV file to find natural silence valleys
    between sentences, and update each shot's visual duration so cuts align cleanly with pauses.
    """
    total_dur = get_audio_duration(wav_path)
    n_shots = len(shots)
    if n_shots <= 1:
        if shots:
            shots[0]["duration"] = round(total_dur, 3)
        return shots

    weights = [_clean_text_weight(s.get("narration") or s.get("caption") or s.get("headline") or "") for s in shots]
    total_w = sum(weights)

    # Expected proportional cut timestamps
    expected_cuts = [0.0]
    acc = 0.0
    for w in weights[:-1]:
        acc += (w / total_w) * total_dur
        expected_cuts.append(acc)
    expected_cuts.append(total_dur)

    if np is None:
        for i, s in enumerate(shots):
            s["duration"] = round(expected_cuts[i + 1] - expected_cuts[i], 3)
        return shots

    # Read WAV samples for RMS silence-valley detection
    with wave.open(str(wav_path), "rb") as wf:
        sr = wf.getframerate()
        ch = wf.getnchannels()
        sw = wf.getsampwidth()
        raw = wf.readframes(wf.getnframes())

    if sw != 2:
        for i, s in enumerate(shots):
            s["duration"] = round(expected_cuts[i + 1] - expected_cuts[i], 3)
        return shots

    samples = np.frombuffer(raw, dtype=np.int16).astype(np.float32) / 32768.0
    if ch > 1:
        samples = samples.reshape(-1, ch).mean(axis=1)

    hop = max(1, int(sr * 0.010))   # 10ms hop
    win = max(1, int(sr * 0.025))   # 25ms window
    n_frames = max(1, (len(samples) - win) // hop)
    rms = np.empty(n_frames, dtype=np.float32)
    for idx in range(n_frames):
        seg = samples[idx * hop : idx * hop + win]
        rms[idx] = float(np.sqrt(np.mean(seg * seg)))

    peak_rms = float(np.percentile(rms, 95)) if len(rms) else 0.1
    noise_floor = float(np.percentile(rms, 10)) if len(rms) else 0.005
    silence_thresh = max(noise_floor * 2.2, peak_rms * 0.045, 0.012)

    is_silent = rms < silence_thresh
    # Collect contiguous silence intervals (start_t, end_t, mid_t, dur_t)
    valleys = []
    in_val = False
    v_start = 0
    for idx, sil in enumerate(is_silent):
        if sil and not in_val:
            in_val = True
            v_start = idx
        elif not sil and in_val:
            in_val = False
            dur_s = (idx - v_start) * 0.010
            if dur_s >= 0.14:
                s_t = v_start * 0.010
                e_t = idx * 0.010
                valleys.append((s_t, e_t, 0.5 * (s_t + e_t), dur_s))
    if in_val:
        dur_s = (len(is_silent) - v_start) * 0.010
        if dur_s >= 0.14:
            s_t = v_start * 0.010
            e_t = len(is_silent) * 0.010
            valleys.append((s_t, e_t, 0.5 * (s_t + e_t), dur_s))

    # Snap each internal boundary to the best silence valley near expected_cuts[i]
    snapped = [0.0]
    avg_shot = total_dur / n_shots
    search_radius = max(1.8, avg_shot * 0.45)

    for i in range(1, n_shots):
        t_exp = expected_cuts[i]
        min_t = snapped[-1] + 2.0
        max_t = total_dur - (n_shots - i) * 2.0
        best_t = max(min_t, min(max_t, t_exp))
        best_score = -1.0

        for _, _, mid_t, dur_s in valleys:
            if mid_t < min_t or mid_t > max_t:
                continue
            dist = abs(mid_t - t_exp)
            if dist > search_radius:
                continue
            # Prefer longer silence pauses closer to proportional estimate
            proximity = math.exp(-((dist / (search_radius * 0.55)) ** 2))
            score = min(dur_s, 1.2) * proximity
            if score > best_score:
                best_score = score
                best_t = mid_t

        snapped.append(round(best_t, 3))
    snapped.append(round(total_dur, 3))

    for i, s in enumerate(shots):
        s["duration"] = round(snapped[i + 1] - snapped[i], 3)
        print(f"  🎬 Shot {i+1}: [{snapped[i]:.2f}s -> {snapped[i+1]:.2f}s] (duration={s['duration']:.2f}s)")

    return shots

def synthesize_gemini_tts(text: str, output_wav: str | Path, voice: str = DEFAULT_VOICE, style: str | None = None) -> bool:
    """Synthesize voice using Google AI Studio Gemini TTS API with optional emotional/pacing style."""
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

    content_item: dict = {"type": "text", "text": text}
    effective_style = style or DEFAULT_NARRATOR_STYLE
    if effective_style:
        content_item["annotations"] = [{"type": "speech_metadata", "style": effective_style}]

    for model_name in models_to_try:
        try:
            print(f"🎙️ [Google AI Studio TTS] Synthesizing ({model_name}, voice '{voice}'): '{text[:45]}...'")
            interaction = client.interactions.create(
                model=model_name,
                input=[{
                    "type": "user_input",
                    "content": [content_item]
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
    print(f"🎙️ [Edge TTS Fallback] Synthesizing (voice '{voice}'): '{text[:40]}...'")
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

def synthesize_clip(text: str, output_wav: str | Path, voice: str = DEFAULT_VOICE, prefer_gemini: bool = True, style: str | None = None) -> bool:
    """Generate audio clip with primary Google AI Studio TTS and automatic Edge TTS fallback."""
    if prefer_gemini:
        ok = synthesize_gemini_tts(text, output_wav, voice=voice, style=style)
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
    pause_after_shot: float = 0.35,
    style: str | None = None,
    single_pass: bool = True
) -> tuple[Path, list[dict]]:
    """
    Synthesize complete synchronized narration for all shots in a storyboard.
    - single_pass=True (default): Synthesizes the entire script in ONE API call with ONE speaker voice & style,
      guaranteeing 100% consistent speaker identity, then aligns shot cuts into natural silence valleys.
    - single_pass=False: Legacy per-shot synthesis mode.
    """
    output_wav = Path(output_wav)
    output_wav.parent.mkdir(parents=True, exist_ok=True)

    if single_pass and sync_duration:
        lines = []
        for shot in shots:
            t = str(shot.get("narration") or shot.get("caption") or shot.get("headline") or "").strip()
            # Clean any markdown **highlight** markers before speaking
            t = t.replace("**", "")
            lines.append(t)

        # Join sentences with explicit medium pause tag so Gemini TTS naturally separates shots
        full_transcript = " ... <short pause> ".join(lines)
        raw_master = output_wav.with_name(output_wav.stem + ".raw.wav")
        unified_style = style or DEFAULT_NARRATOR_STYLE

        ok = synthesize_clip(full_transcript, raw_master, voice=voice, prefer_gemini=prefer_gemini, style=unified_style)
        if not ok or not raw_master.is_file():
            raise RuntimeError("Single-pass narration synthesis failed.")

        # Apply clean broadcast vocal presence & normalize to 24kHz mono WAV
        subprocess.run([
            "ffmpeg", "-hide_banner", "-loglevel", "error", "-y",
            "-i", str(raw_master),
            "-af", "highpass=f=80,acompressor=threshold=-18dB:ratio=3:attack=10:release=100,loudnorm=I=-16:TP=-1.5:LRA=8",
            "-ar", "24000", "-ac", "1",
            str(output_wav)
        ], check=True)
        raw_master.unlink(missing_ok=True)

        print("🔍 Aligning shot cuts to natural silence valleys in single-speaker master track...")
        align_shots_to_single_wav(output_wav, shots)
        total_len = get_audio_duration(output_wav)
        print(f"🎉 Single-speaker master narration ready: {output_wav} (Total: {total_len:.2f}s)")
        return output_wav, shots

    # Legacy per-shot mode (when sync_duration=False or single_pass=False)
    temp_dir = Path(tempfile.mkdtemp(prefix="collage_tts_"))
    padded_wavs = []

    try:
        for i, shot in enumerate(shots):
            text = str(shot.get("narration") or shot.get("caption") or "").strip().replace("**", "")
            if not text:
                text = str(shot.get("headline") or "").strip().replace("**", "")

            shot_style = style or DEFAULT_NARRATOR_STYLE
            raw_wav = temp_dir / f"shot_{i}_raw.wav"
            padded_wav = temp_dir / f"shot_{i}_padded.wav"

            ok = synthesize_clip(text, raw_wav, voice=voice, prefer_gemini=prefer_gemini, style=shot_style)
            if not ok or not raw_wav.is_file():
                raise RuntimeError(f"Failed to synthesize voice for shot {i+1}: {text}")

            audio_len = get_audio_duration(raw_wav)
            if sync_duration:
                current_dur = float(shot.get("duration", 3.0))
                target_dur = max(current_dur, audio_len + pause_after_shot)
                shot["duration"] = round(target_dur, 2)

            print(f"  🎬 Shot {i+1}: Voice length={audio_len:.2f}s | Visual scene duration={shot['duration']:.2f}s")

            subprocess.run([
                "ffmpeg", "-hide_banner", "-loglevel", "error", "-y",
                "-i", str(raw_wav),
                "-af", f"apad,atrim=0:{shot['duration']:.3f}",
                "-ar", "24000", "-ac", "1",
                str(padded_wav)
            ], check=True)
            padded_wavs.append(padded_wav)

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
    parser.add_argument("--style", default=None, help="Consistent voice style prompt")
    parser.add_argument("--engine", choices=["gemini", "edge", "auto"], default="auto", help="TTS engine")
    parser.add_argument("--per-shot", action="store_true", help="Synthesize per-shot instead of single-pass continuous voice")
    parser.add_argument("--no-sync", action="store_true", help="Do not adjust shot duration in storyboard")
    args = parser.parse_args()

    prefer_gemini = args.engine != "edge"
    if args.text:
        ok = synthesize_clip(args.text, args.out, voice=args.voice, prefer_gemini=prefer_gemini, style=args.style)
        if ok:
            print(f"Generated audio: {args.out} ({get_audio_duration(args.out):.2f}s)")
        else:
            sys.exit(1)
    elif args.storyboard:
        sb = json.loads(Path(args.storyboard).read_text(encoding="utf-8-sig"))
        shots = sb.get("shots", [])
        out_wav, updated_shots = generate_storyboard_narration(
            shots, args.out, voice=args.voice, prefer_gemini=prefer_gemini,
            sync_duration=not args.no_sync, style=args.style, single_pass=not args.per_shot
        )
        print(f"Completed: {out_wav} with {len(updated_shots)} shots.")
    else:
        parser.print_help()

if __name__ == "__main__":
    main()
