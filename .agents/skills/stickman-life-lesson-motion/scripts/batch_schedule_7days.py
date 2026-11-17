"""
Batch Schedule 7 Days of Stickman Shorts to YouTube
Uploads all 7 episodes and schedules them to be published daily at 15:45 (+07:00).
"""

import os
import sys
import json
from datetime import datetime, timedelta, timezone
from pathlib import Path

# Add script directory to sys.path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from youtube_uploader import get_authenticated_service, upload_short, DEFAULT_CLIENT_SECRETS, DEFAULT_TOKEN_FILE

EPISODES = [
    {
        "day": "Day 1 (Wednesday)",
        "file": r"C:\Users\atong\Downloads\stickman-first-step-1080x1920.mp4",
        "title": "ก้าวแรกยากที่สุดเสมอ แต่ต้องเริ่ม ⏳ #Shorts",
        "desc": "ก้าวแรกอาจสั่นไหวและไม่สมบูรณ์แบบ แต่ทุกการเดินทางหมื่นลี้ล้วนเริ่มต้นจากก้าวแรกเสมอ\n─── © AT ───\n\n#Shorts #ข้อคิดเตือนใจ #พัฒนาตนเอง #mindset #แรงบันดาลใจ #สติ๊กแมน",
        "tags": ["Shorts", "ก้าวแรก", "ข้อคิดเตือนใจ", "พัฒนาตนเอง", "แรงบันดาลใจ", "สติ๊กแมน", "mindset"]
    },
    {
        "day": "Day 2 (Thursday)",
        "file": r"C:\Users\atong\Downloads\stickman-busy-vs-progress-1080x1920.mp4",
        "title": "ทำงานหนัก... ไม่ได้แปลว่าก้าวหน้า 💼 #Shorts",
        "desc": "เรามัวแต่วิ่งดันงานทั้งวันจนคิดว่าความยุ่งคือความสำเร็จ แต่คนที่ไปได้ไกลที่สุด คือคนที่กล้าหยุดพักถอยมามองภาพใหญ่\n─── © AT ───\n\n#Shorts #ข้อคิดการทำงาน #การทำงาน #พัฒนาตนเอง #mindset #แรงบันดาลใจ",
        "tags": ["Shorts", "การทำงาน", "ทำงานหนัก", "พัฒนาตนเอง", "mindset", "แรงบันดาลใจ", "สติ๊กแมน"]
    },
    {
        "day": "Day 3 (Friday)",
        "file": r"C:\Users\atong\Downloads\stickman-consistency-power-1080x1920.mp4",
        "title": "นาฬิกาไม่เคยวิ่ง แต่มันไม่เคยหยุดเดิน 🚶 #Shorts",
        "desc": "เรามักคิดว่าต้องก้าวกระโดดถึงจะสำเร็จ แต่การวิ่งสุดแรงมักทำให้หมดแรงกลางทาง ดูเข็มนาฬิกา มันไม่เคยวิ่งแต่มันไม่เคยหยุดเดิน\n─── © AT ───\n\n#Shorts #ความสม่ำเสมอ #ปรัชญาชีวิต #ข้อคิดเตือนใจ #พัฒนาตนเอง #สติ๊กแมน",
        "tags": ["Shorts", "ความสม่ำเสมอ", "ปรัชญาชีวิต", "ข้อคิดเตือนใจ", "พัฒนาตนเอง", "mindset"]
    },
    {
        "day": "Day 4 (Saturday)",
        "file": r"C:\Users\atong\Downloads\stickman-own-season-1080x1920.mp4",
        "title": "อย่าเอาชีวิตเรา ไปเทียบกับเวลาของใคร 🌸 #Shorts",
        "desc": "นาฬิกาแต่ละเรือนหมุนในเวลาของตัวเอง ดอกไม้แต่ละดอกผลิบานในคนละฤดู ไม่ต้องแข่งกับใคร ถึงเวลาก็งดงามในแบบเราเสมอ\n─── © AT ───\n\n#Shorts #อย่าเปรียบเทียบ #ปรัชญาชีวิต #ข้อคิดเตือนใจ #ความสุข #mindset",
        "tags": ["Shorts", "อย่าเปรียบเทียบ", "ปรัชญาชีวิต", "ความสุข", "พัฒนาตนเอง", "mindset"]
    },
    {
        "day": "Day 5 (Sunday)",
        "file": r"C:\Users\atong\Downloads\stickman-letting-go-burden-1080x1920.mp4",
        "title": "พอเรายอมวางลง โลกก็ยังหมุนต่อได้ 🍃 #Shorts",
        "desc": "เราแบกความคาดหวังของทุกคนไว้คนเดียวจนหมดแรง แต่พอเรายอมวางลง โลกก็ยังหมุนต่อได้เป็นปกติ ความสงบเกิดจากการเบามือ\n─── © AT ───\n\n#Shorts #ปล่อยวาง #ฮีลใจ #ความสุข #ปรัชญาชีวิต #ข้อคิดเตือนใจ",
        "tags": ["Shorts", "ปล่อยวาง", "ฮีลใจ", "ความสุข", "ปรัชญาชีวิต", "ข้อคิดเตือนใจ"]
    },
    {
        "day": "Day 6 (Monday)",
        "file": r"C:\Users\atong\Downloads\stickman-slowing-down-life-1080x1920.mp4",
        "title": "การช้าลงบ้าง คือความสุขที่แท้จริง ☕ #Shorts",
        "desc": "เราเร่งรีบจนชินชาจนลืมมองสิ่งรอบตัว แต่เมื่อกล้าก้าวช้าลง โลกจะเริ่มเปิดเผยความสุขข้างทาง เพราะชีวิตไม่ใช่การแข่งวิ่ง\n─── © AT ───\n\n#Shorts #ชีวิตช้าลง #SlowLife #ความสุข #ฮีลใจ #ข้อคิดเตือนใจ #ปรัชญาชีวิต",
        "tags": ["Shorts", "ชีวิตช้าลง", "SlowLife", "ความสุข", "ฮีลใจ", "ข้อคิดเตือนใจ"]
    },
    {
        "day": "Day 7 (Tuesday)",
        "file": r"C:\Users\atong\Downloads\stickman-rest-is-progress-1080x1920.mp4",
        "title": "การพักผ่อน ไม่ใช่การถอยหลัง 🛋️ #Shorts",
        "desc": "ในโลกที่บอกให้ขยัน เรามักรู้สึกผิดเวลาหยุดพัก แต่ไม่มีใครวิ่งสปริ้นท์ได้ตลอดเวลา การพักผ่อนไม่ใช่การยอมแพ้ แต่คือการเติมพลังเพื่อก้าวต่อ\n─── © AT ───\n\n#Shorts #การพักผ่อน #สุขภาพจิต #ฮีลใจ #พัฒนาตนเอง #ข้อคิดสอนใจ #แรงบันดาลใจ",
        "tags": ["Shorts", "การพักผ่อน", "ฮีลใจ", "สุขภาพจิต", "พัฒนาตนเอง", "แรงบันดาลใจ"]
    }
]


def run_batch_schedule(start_date=None, target_hour=15, target_minute=45):
    """
    Schedule 7 episodes starting from start_date (default: tomorrow) at target_hour:target_minute (+07:00).
    """
    bkk_tz = timezone(timedelta(hours=7))
    now_bkk = datetime.now(bkk_tz)

    if start_date is None:
        # Start tomorrow
        start_date = (now_bkk + timedelta(days=1)).date()

    print("=" * 60)
    print("🎬 Starting 7-Day Batch Scheduled Upload to YouTube Shorts")
    print(f"⏰ Daily Scheduled Release Time: {target_hour:02d}:{target_minute:02d} (ICT / GMT+7)")
    print(f"📅 Start Date: {start_date.strftime('%Y-%m-%d')}")
    print("=" * 60)

    # 1. Authenticate first
    youtube = get_authenticated_service(DEFAULT_CLIENT_SECRETS, DEFAULT_TOKEN_FILE)

    results = []

    for idx, ep in enumerate(EPISODES):
        target_day = start_date + timedelta(days=idx)
        # Construct target datetime in BKK timezone (+07:00)
        target_dt_bkk = datetime(
            target_day.year, target_day.month, target_day.day,
            target_hour, target_minute, 0,
            tzinfo=bkk_tz
        )
        # Convert to UTC ISO 8601 for YouTube API (RFC 3339)
        target_utc = target_dt_bkk.astimezone(timezone.utc)
        publish_at_rfc3339 = target_utc.strftime("%Y-%m-%dT%H:%M:%S.000Z")

        print(f"\n[{idx+1}/7] Processing: {ep['title']}")
        print(f"   📆 Scheduled Time: {target_dt_bkk.strftime('%Y-%m-%d %H:%M')} (BKK) -> {publish_at_rfc3339}")

        file_path = ep["file"]
        if not os.path.exists(file_path):
            print(f"❌ File not found: {file_path}")
            continue

        try:
            res = upload_short(
                file_path=file_path,
                title=ep["title"],
                description=ep["desc"],
                tags=ep["tags"],
                privacy_status="private",
                publish_at=publish_at_rfc3339,
                client_secrets_path=DEFAULT_CLIENT_SECRETS,
                token_path=DEFAULT_TOKEN_FILE
            )
            vid = res.get("id")
            results.append({
                "episode": ep["title"],
                "scheduled_bkk": target_dt_bkk.strftime('%Y-%m-%d %H:%M'),
                "video_id": vid,
                "url": f"https://youtube.com/shorts/{vid}",
                "status": "SCHEDULED"
            })
        except Exception as e:
            print(f"❌ Failed to upload '{ep['title']}': {e}")
            results.append({
                "episode": ep["title"],
                "error": str(e),
                "status": "FAILED"
            })

    report_path = r"C:\Users\atong\Documents\antigravity\youtube_scheduled_7days.json"
    with open(report_path, "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)

    print("\n" + "=" * 60)
    print("✨ Batch Scheduling Completed!")
    print(f"📄 Summary Report saved to: {report_path}")
    print("=" * 60)
    for r in results:
        if r.get("status") == "SCHEDULED":
            print(f"✅ {r['scheduled_bkk']} -> {r['episode']} ({r['url']})")
        else:
            print(f"❌ {r['episode']} -> {r.get('error')}")


if __name__ == "__main__":
    run_batch_schedule(target_hour=15, target_minute=45)
