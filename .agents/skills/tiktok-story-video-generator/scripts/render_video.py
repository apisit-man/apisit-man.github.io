"""
Upgraded TikTok / Reels / Shorts 9:16 Cartoon Video Assembly Engine.
Features:
- Professional Cartoon Dialogue Cards & Colored Badges (via cartoon_graphics.py)
- Dynamic audio-sync (speech duration auto-detected via ffprobe)
- Animated Ken Burns slow zoom
- Concat assembly & Lo-Fi BGM ducking at -20dB
"""

import os
import sys
import json
import subprocess
from pathlib import Path

# Add current scripts directory to path to import cartoon_graphics
current_dir = Path(__file__).resolve().parent
if str(current_dir) not in sys.path:
    sys.path.insert(0, str(current_dir))

from cartoon_graphics import create_cartoon_overlay

def get_media_duration(file_path):
    """Retrieve precise duration of an audio or video file using ffprobe."""
    if not os.path.exists(file_path):
        return 5.0
    try:
        cmd = [
            "ffprobe", "-v", "error",
            "-show_entries", "format=duration",
            "-of", "default=noprint_wrappers=1:nokey=1",
            file_path
        ]
        res = subprocess.run(cmd, capture_output=True, text=True, check=True)
        dur = float(res.stdout.strip())
        return max(dur, 2.0)
    except Exception:
        return 5.0

def build_scene_clip(scene, fps=30):
    """Render a scene image with Ken Burns zoom, overlay cartoon graphics, and sync audio."""
    cut_id = scene["id"]
    out_scene = f"temp_cut_{cut_id}.mp4"
    overlay_png = f"temp_overlay_{cut_id}.png"
    img = scene["image"]
    audio = scene["audio"]

    # 1. Generate High-DPI Cartoon Comic Overlay
    create_cartoon_overlay(scene, overlay_png)

    # 2. Measure speech duration (+0.4s breathing room)
    audio_dur = get_media_duration(audio)
    clip_dur = max(audio_dur + 0.4, 4.0)
    total_frames = int(clip_dur * fps)
    zoom_step = 0.08 / max(total_frames, 1)

    # 3. Filter Graph:
    # [0:v] -> scale/crop to 1080x1920 -> Ken Burns zoompan -> [bg]
    # [bg][1:v] -> overlay=0:0 -> [v]
    vf_filter = (
        f"[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,"
        f"zoompan=z='min(zoom+{zoom_step:.6f},1.08)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d={total_frames}:s=1080x1920:fps={fps}[bg];"
        f"[bg][1:v]overlay=0:0[v]"
    )

    cmd = [
        "ffmpeg", "-y",
        "-loop", "1", "-i", img,
        "-i", overlay_png,
        "-i", audio,
        "-filter_complex", vf_filter,
        "-map", "[v]",
        "-map", "2:a",
        "-c:v", "libx264", "-preset", "medium", "-tune", "stillimage",
        "-c:a", "aac", "-b:a", "192k",
        "-t", f"{clip_dur:.2f}",
        "-pix_fmt", "yuv420p",
        out_scene
    ]

    print(f"🎬 Processing Cartoon Cut {cut_id} (Duration: {clip_dur:.2f}s)...")
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    
    # Cleanup overlay PNG
    if os.path.exists(overlay_png):
        try:
            os.remove(overlay_png)
        except Exception:
            pass

    return out_scene, clip_dur

def assemble_video(scenes, bgm_file="bgm.mp3", output_file="tiktok_video_final.mp4"):
    """Assemble all cut clips, mix background music at -20dB, and produce final video."""
    temp_clips = []
    total_duration = 0.0

    try:
        for scene in scenes:
            clip_path, dur = build_scene_clip(scene)
            temp_clips.append(clip_path)
            total_duration += dur

        # Create concat manifest
        with open("concat_list.txt", "w", encoding="utf-8") as f:
            for clip in temp_clips:
                f.write(f"file '{clip}'\n")

        print(f"🔗 Concatenating {len(temp_clips)} scenes (Total Duration: {total_duration:.2f}s)...")

        # Concat + Mix BGM
        if os.path.exists(bgm_file):
            print(f"🎵 Mixing background music ({bgm_file}) at volume=0.10 (-20dB)...")
            final_cmd = [
                "ffmpeg", "-y",
                "-f", "concat", "-safe", "0", "-i", "concat_list.txt",
                "-stream_loop", "-1", "-i", bgm_file,
                "-filter_complex",
                f"[1:a]volume=0.10,afade=t=out:st={max(0, total_duration - 1.5):.2f}:d=1.5[bgm];"
                f"[0:a][bgm]amix=inputs=2:duration=first:dropout_transition=2[aout]",
                "-map", "0:v", "-map", "[aout]",
                "-c:v", "copy", "-c:a", "aac", "-b:a", "192k",
                "-t", f"{total_duration:.2f}",
                output_file
            ]
        else:
            print("⚠️ No BGM file found, exporting with voice audio only...")
            final_cmd = [
                "ffmpeg", "-y",
                "-f", "concat", "-safe", "0", "-i", "concat_list.txt",
                "-c", "copy",
                output_file
            ]

        subprocess.run(final_cmd, check=True)
        print(f"\n✨ Cartoon Video assembled successfully: {output_file}")
        return output_file

    finally:
        # Cleanup temporary cut files
        for clip in temp_clips:
            if os.path.exists(clip):
                try:
                    os.remove(clip)
                except Exception:
                    pass
        if os.path.exists("concat_list.txt"):
            try:
                os.remove("concat_list.txt")
            except Exception:
                pass

if __name__ == "__main__":
    manifest = "scenes.json"
    if os.path.exists(manifest):
        with open(manifest, "r", encoding="utf-8") as f:
            data = json.load(f)
            scenes = data.get("scenes", [])
            bgm = data.get("bgm", "bgm.mp3")
            out = data.get("output", "tiktok_video_final.mp4")
            assemble_video(scenes, bgm_file=bgm, output_file=out)
    else:
        print("Please provide scenes.json or import assemble_video in your workflow.")
