"""
Batch Render Week 1 Episodes (w01d01 to w01d07)
Renders all pending MP4 videos for Week 1 using render_stickman_video pipeline.
"""

import os
import sys
import json
import asyncio
from pathlib import Path

# Add script directory to sys.path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from render_stickman_video import render_pipeline, DEFAULT_BRAND
from generate_week1_episodes import EPISODES

VIDEO_DIR = r"C:\Users\atong\Downloads\video stickman\week1"


async def main():
    os.makedirs(VIDEO_DIR, exist_ok=True)
    print("=" * 65)
    print("🎬 Starting Automated Batch Rendering for Week 1 (14 Episodes)")
    print(f"📁 Target Output Directory: {VIDEO_DIR}")
    print("=" * 65)

    rendered_count = 0
    skipped_count = 0

    for idx, ep in enumerate(EPISODES):
        out_mp4 = os.path.join(VIDEO_DIR, f"{ep['title']}.mp4")
        if os.path.exists(out_mp4) and os.path.getsize(out_mp4) > 100_000:
            print(f"[{idx+1}/14] ⏭️ Skipping {ep['id']} (Already exists: {os.path.basename(out_mp4)})")
            skipped_count += 1
            continue

        print(f"\n[{idx+1}/14] 🚀 Rendering {ep['day']} ({ep['target_time']}): {ep['display_title']}")
        print(f"   🎙️ Voice: {ep['voice']} | Style: {ep['style'][:40]}...")

        try:
            await render_pipeline(
                beats=ep["beats"],
                output_mp4=out_mp4,
                voice=ep["voice"],
                style=ep["style"],
                brand_text=DEFAULT_BRAND,
                fps=30
            )
            rendered_count += 1
            print(f"   ✅ Finished {ep['id']} -> {os.path.basename(out_mp4)}")
        except Exception as e:
            print(f"   ❌ Error rendering {ep['id']}: {e}")

    print("\n" + "=" * 65)
    print(f"✨ Batch Rendering Completed! (Rendered: {rendered_count}, Skipped: {skipped_count})")
    print(f"📁 All videos located in: {VIDEO_DIR}")
    print("=" * 65)


if __name__ == "__main__":
    asyncio.run(main())
