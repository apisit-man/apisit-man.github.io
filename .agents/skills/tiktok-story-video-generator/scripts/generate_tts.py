"""
Fast Thai TTS Generator using edge-tts.
Generates warm, friendly, natural voice clips for TikTok/Shorts stories.
"""

import os
import sys
import json
import asyncio
import edge_tts

DEFAULT_VOICE = "th-TH-NiwatNeural"  # Male friendly / warm
FEMALE_VOICE = "th-TH-PremwadeeNeural"  # Female friendly / positive

async def generate_single_audio(text, output_file, voice=DEFAULT_VOICE, rate="+10%", pitch="+0Hz"):
    """Generate a single mp3 audio file using edge-tts."""
    communicator = edge_tts.Communicate(text=text, voice=voice, rate=rate, pitch=pitch)
    await communicator.save(output_file)
    print(f"🎙️ Generated audio: {output_file} -> '{text[:30]}...'")

async def generate_all_audio(scenes, voice=DEFAULT_VOICE, rate="+10%"):
    """Generate audio for all scenes asynchronously in parallel."""
    tasks = []
    for scene in scenes:
        text = scene.get("voiceover", "")
        audio_file = scene.get("audio", f"audio_{scene['id']:02d}.mp3")
        tasks.append(generate_single_audio(text, audio_file, voice=voice, rate=rate))
    await asyncio.gather(*tasks)
    print("✅ All voiceover files generated successfully!")

def run_tts(scenes, voice=DEFAULT_VOICE, rate="+10%"):
    asyncio.run(generate_all_audio(scenes, voice=voice, rate=rate))

if __name__ == "__main__":
    if len(sys.argv) > 1 and os.path.exists(sys.argv[1]):
        with open(sys.argv[1], "r", encoding="utf-8") as f:
            data = json.load(f)
            scenes = data.get("scenes", [])
            voice = data.get("voice", DEFAULT_VOICE)
            rate = data.get("rate", "+10%")
            run_tts(scenes, voice=voice, rate=rate)
    else:
        print("Usage: python generate_tts.py <scenes.json>")
