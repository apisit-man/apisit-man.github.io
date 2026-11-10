"""
Dual-Engine Speech Generator for TikTok Cartoon Stories:
1. Primary: Google AI Studio TTS (Gemini 3.1 Flash TTS via Interactions API)
   - Studio-grade, natural human expression, emotional cadence, zero robotic tone.
   - Prebuilt cartoon voices: 'Puck' (lively/friendly male), 'Aoede' (breezy/warm female), 'Zephyr' (bright).
2. Fallback: Edge TTS (th-TH-NiwatNeural / th-TH-PremwadeeNeural)
   - Reliable, fast, works offline without API key.
"""

import os
import sys
import json
import base64
import asyncio
import tempfile
import subprocess
from pathlib import Path

DEFAULT_GEMINI_VOICE = "Puck"      # Upbeat, lively, warm
FEMALE_GEMINI_VOICE = "Aoede"      # Warm, breezy, youthful

def generate_gemini_tts(text, output_mp3, voice=DEFAULT_GEMINI_VOICE):
    """Generate audio using Google AI Studio Gemini TTS (gemini-3.1-flash-tts-preview)."""
    from google import genai
    
    api_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
    if not api_key:
        raise ValueError("No GEMINI_API_KEY or GOOGLE_API_KEY found.")

    client = genai.Client(http_options={"api_version": "v1beta"})
    
    print(f"🎙️ [Google AI Studio TTS] Synthesizing with voice '{voice}': '{text[:35]}...'")
    interaction = client.interactions.create(
        model="gemini-3.1-flash-tts-preview",
        input=[{
            "type": "user_input",
            "content": [{
                "type": "text",
                "text": text
            }]
        }],
        response_format={"type": "audio"},
        generation_config={
            "speech_config": [
                {"voice": voice}
            ]
        }
    )

    if not interaction.output_audio or not interaction.output_audio.data:
        raise RuntimeError("No audio data returned from Gemini TTS API.")

    pcm_data = base64.b64decode(interaction.output_audio.data)

    # Save to temp raw PCM file and convert to high-quality MP3 (24kHz s16le mono)
    with tempfile.NamedTemporaryFile(suffix=".pcm", delete=False) as tmp_pcm:
        tmp_pcm_path = tmp_pcm.name
        tmp_pcm.write(pcm_data)

    try:
        cmd = [
            "ffmpeg", "-y",
            "-f", "s16le", "-ar", "24000", "-ac", "1",
            "-i", tmp_pcm_path,
            "-c:a", "libmp3lame", "-b:a", "192k",
            output_mp3
        ]
        subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        print(f"✨ [Google AI Studio TTS] Saved: {output_mp3}")
        return True
    finally:
        if os.path.exists(tmp_pcm_path):
            try:
                os.remove(tmp_pcm_path)
            except Exception:
                pass

async def generate_edge_tts(text, output_mp3, voice="th-TH-NiwatNeural", rate="+10%"):
    """Fallback generator using edge-tts."""
    import edge_tts
    print(f"🎙️ [Edge TTS Fallback] Generating with voice '{voice}': '{text[:35]}...'")
    communicator = edge_tts.Communicate(text=text, voice=voice, rate=rate)
    await communicator.save(output_mp3)
    print(f"✅ [Edge TTS] Saved: {output_mp3}")
    return True

def generate_voice_clip(text, output_mp3, prefer_gemini=True, gemini_voice=DEFAULT_GEMINI_VOICE):
    """Robust voice generation with automatic fallback."""
    if prefer_gemini:
        try:
            return generate_gemini_tts(text, output_mp3, voice=gemini_voice)
        except Exception as e:
            print(f"⚠️ Google AI Studio TTS unavailable ({e}). Falling back to Edge TTS...")
    
    # Fallback
    asyncio.run(generate_edge_tts(text, output_mp3))
    return True

def generate_all_audio(scenes, prefer_gemini=True, gemini_voice=DEFAULT_GEMINI_VOICE):
    """Generate audio for all scenes sequentially/safely."""
    for s in scenes:
        text = s.get("voiceover", "")
        out = s.get("audio", f"audio_{s['id']:02d}.mp3")
        generate_voice_clip(text, out, prefer_gemini=prefer_gemini, gemini_voice=gemini_voice)
    print("🎉 All voiceover tracks completed!")

if __name__ == "__main__":
    if len(sys.argv) > 1 and os.path.exists(sys.argv[1]):
        with open(sys.argv[1], "r", encoding="utf-8") as f:
            data = json.load(f)
            scenes = data.get("scenes", [])
            voice = data.get("gemini_voice", DEFAULT_GEMINI_VOICE)
            generate_all_audio(scenes, prefer_gemini=True, gemini_voice=voice)
    else:
        print("Usage: python generate_tts.py <scenes.json>")
