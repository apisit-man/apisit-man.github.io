"""
Procedural Lo-Fi / Ambient Background Music Generator using FFmpeg.
Synthesizes a soothing, gentle chill chord progression with low-pass warmth.
"""

import os
import subprocess

def generate_lofi_bgm(output_file="bgm.mp3", duration=40):
    """Generate a gentle ambient lo-fi chord pad for background narration."""
    # Synthesize major 7th ambient harmony (Cmaj7 / Am / F / G) with soft tremolo and low-pass filter
    # Frequencies: C4 (261.63), E4 (329.63), G4 (392.00), B4 (493.88)
    filter_expr = (
        "aevalsrc=exprs='0.08*sin(2*PI*261.63*t)*cos(2*PI*0.2*t) + "
        "0.06*sin(2*PI*329.63*t)*cos(2*PI*0.25*t) + "
        "0.06*sin(2*PI*392.00*t)*cos(2*PI*0.15*t) + "
        "0.04*sin(2*PI*493.88*t)':s=44100:d={dur},"
        "lowpass=f=800,afade=t=in:st=0:d=2.0,afade=t=out:st={fade_start}:d=2.0"
    ).format(dur=duration, fade_start=max(0, duration - 2.0))

    cmd = [
        "ffmpeg", "-y",
        "-f", "lavfi", "-i", filter_expr,
        "-c:a", "libmp3lame", "-b:a", "192k",
        output_file
    ]
    print(f"🎵 Synthesizing procedural chill background track ({duration}s)...")
    subprocess.run(cmd, check=True)
    print(f"✅ Generated BGM: {output_file}")
    return output_file

if __name__ == "__main__":
    generate_lofi_bgm()
