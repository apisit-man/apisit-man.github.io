"""
Batch Schedule Week 1 (14 Episodes: Morning 07:30 & Evening 19:30) to YouTube Shorts
Allows automated verification (dry-run) and scheduling upload of all 14 episodes.
"""

import os
import sys
import json
import argparse
from datetime import datetime, timedelta, timezone
from pathlib import Path

# Add script directory to sys.path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from youtube_uploader import get_authenticated_service, upload_short, DEFAULT_CLIENT_SECRETS, DEFAULT_TOKEN_FILE
from generate_week1_episodes import EPISODES

VIDEO_DIR = r"C:\Users\atong\Downloads\video stickman\week1"


def run_14episodes_schedule(start_date=None, dry_run=True):
    bkk_tz = timezone(timedelta(hours=7))
    now_bkk = datetime.now(bkk_tz)

    if start_date is None:
        # Start tomorrow
        start_date = (now_bkk + timedelta(days=1)).date()
    elif isinstance(start_date, str):
        start_date = datetime.strptime(start_date, "%Y-%m-%d").date()

    print("=" * 65)
    print("🎬 Batch Schedule: Week 1 (14 Episodes: Morning 07:30 / Evening 19:30)")
    print(f"📅 Start Date: {start_date.strftime('%Y-%m-%d')} (ICT / GMT+7)")
    print(f"🔍 Mode: {'DRY RUN (Verification Only)' if dry_run else 'LIVE UPLOAD & SCHEDULE'}")
    print("=" * 65)

    youtube = None
    if not dry_run:
        youtube = get_authenticated_service(DEFAULT_CLIENT_SECRETS, DEFAULT_TOKEN_FILE)

    results = []

    # Map episodes to dates
    # EPISODES are ordered: Day 1 M, Day 1 E, Day 2 M, Day 2 E ... Day 7 E
    for idx, ep in enumerate(EPISODES):
        day_offset = idx // 2
        target_day = start_date + timedelta(days=day_offset)

        if ep["slot"] == "morning":
            h, m = 7, 30
        else:
            h, m = 19, 30

        target_dt_bkk = datetime(
            target_day.year, target_day.month, target_day.day,
            h, m, 0,
            tzinfo=bkk_tz
        )
        target_utc = target_dt_bkk.astimezone(timezone.utc)
        publish_at_rfc3339 = target_utc.strftime("%Y-%m-%dT%H:%M:%S.000Z")

        video_filename = f"{ep['title']}.mp4"
        file_path = os.path.join(VIDEO_DIR, video_filename)
        file_exists = os.path.exists(file_path)
        file_size_mb = (os.path.getsize(file_path) / (1024 * 1024)) if file_exists else 0.0

        print(f"\n[{idx+1}/14] {ep['day']} ({ep['target_time']}): {ep['display_title']}")
        print(f"   📆 Scheduled Time: {target_dt_bkk.strftime('%Y-%m-%d %H:%M')} (BKK) -> UTC: {publish_at_rfc3339}")
        print(f"   📁 File: {video_filename} ({'✅ Exists - ' + f'{file_size_mb:.2f} MB' if file_exists else '⏳ Pending Render'})")
        print(f"   🎙️ Voice: {ep['voice']} ({'Male Riko' if ep['slot'] == 'morning' else 'Female Aoede'})")

        item_result = {
            "episode_id": ep["id"],
            "title": ep["display_title"],
            "slot": ep["slot"],
            "scheduled_bkk": target_dt_bkk.strftime('%Y-%m-%d %H:%M'),
            "scheduled_utc": publish_at_rfc3339,
            "voice": ep["voice"],
            "file": file_path,
            "file_exists": file_exists
        }

        if dry_run:
            item_result["status"] = "VERIFIED_READY" if file_exists else "VERIFIED_PENDING_FILE"
            results.append(item_result)
            continue

        if not file_exists:
            print(f"   ❌ Skipped: File does not exist yet ({file_path})")
            item_result["status"] = "FILE_NOT_FOUND"
            results.append(item_result)
            continue

        try:
            res = upload_short(
                file_path=file_path,
                title=ep["display_title"],
                description=ep["desc"],
                tags=ep["tags"],
                privacy_status="private",
                publish_at=publish_at_rfc3339,
                client_secrets_path=DEFAULT_CLIENT_SECRETS,
                token_path=DEFAULT_TOKEN_FILE
            )
            vid = res.get("id")
            item_result["video_id"] = vid
            item_result["url"] = f"https://youtube.com/shorts/{vid}"
            item_result["status"] = "SCHEDULED"
            print(f"   ✅ Successfully Scheduled! Short URL: {item_result['url']}")
        except Exception as e:
            print(f"   ❌ Upload Error: {e}")
            item_result["status"] = "ERROR"
            item_result["error"] = str(e)

        results.append(item_result)

    report_path = r"C:\Users\atong\Downloads\video stickman\week1_schedule_report.json"
    with open(report_path, "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)

    print("\n" + "=" * 65)
    print("✨ Schedule Plan Processed!")
    print(f"📄 Report written to: {report_path}")
    print("=" * 65)
    return results


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Schedule Week 1 (14 episodes) to YouTube Shorts")
    parser.add_argument("--start-date", type=str, help="Start date (YYYY-MM-DD), default tomorrow")
    parser.add_argument("--upload", action="store_true", help="Perform real upload (default: dry-run only)")
    args = parser.parse_args()

    run_14episodes_schedule(start_date=args.start_date, dry_run=not args.upload)
