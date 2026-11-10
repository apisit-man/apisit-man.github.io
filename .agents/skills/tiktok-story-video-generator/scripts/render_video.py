"""
TikTok / Reels / Shorts 9:16 Video Assembly Script
Combines 6 scene images, 6 TTS voiceover files, animated Ken Burns zoom,
high-contrast Thai subtitles, and background music into a polished MP4.
"""

import os
import sys
import json
import subprocess
from pathlib import Path

def get_thai_font():
    """Find the best available Thai font on Windows."""
    candidates = [
        r"C:\Windows\Fonts\LeelawUI.ttf",
        r"C:\Windows\Fonts\leelawdb.ttf",
        r"C:\Windows\Fonts\tahomabd.ttf",
        r"C:\Windows\Fonts\tahoma.ttf",
        r"C:\Windows\Fonts\THSarabunNew.ttf"
    ]
    for font in candidates:
        if os.path.exists(font):
            # Escape for FFmpeg drawtext: colon -> \:, backslash -> /
            escaped = font.replace("\\", "/").replace(":", r"\:")
            return escaped
    return None

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

def build_scene_clip(scene, font_path, fps=30):
    """Render a single scene image into an animated MP4 with audio and captions."""
    cut_id = scene["id"]
    out_scene = f"temp_cut_{cut_id}.mp4"
    img = scene["image"]
    audio = scene["audio"]
    text = scene.get("caption", "").replace("'", r"\'").replace(":", r"\:")

    # Determine duration from voiceover (+0.4s breathing room)
    audio_dur = get_media_duration(audio)
    clip_dur = max(audio_dur + 0.4, 4.0)
    total_frames = int(clip_dur * fps)

    # Filter graph:
    # 1. Scale and crop to 1080x1920 (9:16)
    # 2. Ken Burns slow zoom (1.0 -> 1.08)
    # 3. Draw high-contrast subtitle pill in TikTok safe zone (y = h - th - 320)
    zoom_step = 0.08 / max(total_frames, 1)
    
    font_clause = f"fontfile='{font_path}':" if font_path else ""
    
    vf_filter = (
        f"scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,"
        f"zoompan=z='min(zoom+{zoom_step:.6f},1.08)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d={total_frames}:s=1080x1920:fps={fps},"
        f"drawtext={font_clause}text='{text}':fontcolor=white:fontsize=46:box=1:boxcolor=black@0.55:boxborderw=20:"
        f"x=(w-text_w)/2:y=h-th-320"
    )

    cmd = [
        "ffmpeg", "-y",
        "-loop", "1", "-i", img,
        "-i", audio,
        "-vf", vf_filter,
        "-c:v", "libx264", "-preset", "medium", "-tune", "stillimage",
        "-c:a", "aac", "-b:a", "192k",
        "-t", f"{clip_dur:.2f}",
        "-pix_fmt", "yuv420p",
        out_scene
    ]
    
    print(f"🎬 Processing Cut {cut_id} (Duration: {clip_dur:.2f}s)...")
    subprocess.run(cmd, check=True)
    return out_scene, clip_dur

def assemble_video(scenes, bgm_file="bgm.mp3", output_file="tiktok_video_final.mp4"):
    """Assemble all cut clips, mix background music at -20dB, and produce final video."""
    font_path = get_thai_font()
    print(f"Using Thai font: {font_path}")

    temp_clips = []
    total_duration = 0.0

    try:
        for scene in scenes:
            clip_path, dur = build_scene_clip(scene, font_path)
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
        print(f"\n✨ Video assembled successfully: {output_file}")
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
    # If scenes.json is present, load it, otherwise use default config
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
