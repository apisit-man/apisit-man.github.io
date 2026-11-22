"""
Automated End-to-End 9:16 Stickman vs. Clock Video Generator (v3.2.0)
- Primary TTS: Google AI Studio Gemini 3.8 Flash TTS (`gemini-3.8-flash-tts`)
  - Default Voice: `en-us-riko` (Riko — Confident and clear. Deep pitch storyteller)
- Fallback TTS: `edge-tts` (`th-TH-NiwatNeural` with Deep-Pitch Storyteller baritone mastering)
- Visual Engine: 1080x1920 30 FPS HTML5 Canvas via Headless Chrome CDP
  - 2-Bone Analytic Inverse Kinematics (IK) & Gravity-Aligned Posture
  - Top-Center Adaptive Author Branding Watermark (`─── © AT ───`)
- Audio Mastering: Vocal Presence EQ + Synthesized Fmaj7 Ambient Lo-Fi Pad (-18dB)
"""

import os
import sys
import json
import time
import base64
import shutil
import asyncio
import argparse
import tempfile
import subprocess
import urllib.request
from pathlib import Path
import websockets

DEFAULT_VOICE = "en-us-riko"
DEFAULT_STYLE = "Confident and clear. Deep pitch storyteller, calm, warm, and reflective pacing."
DEFAULT_BRAND = "© AT"
CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
if not os.path.exists(CHROME_PATH):
    CHROME_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

PRESETS = {
    "clock": {
        "title": "stickman-clock-time",
        "beats": [
            {"line1": "เรามัวแต่ใช้ทั้งชีวิต", "highlight": "พยายามดัน", "line2": "ให้ทุกอย่างทันใจ",
             "vo": "เรามัวแต่ใช้ทั้งชีวิต <short pause> พยายามดันเข็มนาฬิกา ให้หมุนไปข้างหน้าเร็วขึ้น"},
            {"line1": "จนลืมไปว่า", "highlight": "แค่นั่งลงพัก", "line2": "เพราะเวลาไม่เคยรอใคร",
             "vo": "จนกระทั่งเหนื่อยล้า <short pause> และเพิ่งเข้าใจว่า เวลาไม่เคยรอใคร และไม่เคยเดินเร็วขึ้นเพื่อเรา"},
            {"line1": "เมื่อหยุดต้าน", "highlight": "ปล่อยตัวไหลไป", "line2": "ตามจังหวะของมัน",
             "vo": "เมื่อเราหยุดต้าน <short pause> แล้วเลือกที่จะปล่อยให้จังหวะของมันพาเราไป"},
            {"line1": "บางวันอาจ", "highlight": "เผลอร่วงหล่น", "line2": "และฝืนสู้กับโลกอีกครั้ง",
             "vo": "บางวันเราอาจเผลอหล่นลงมา <short pause> รู้สึกเหมือนกำลังวิ่งตามโลกไม่ทันอีกครั้ง"},
            {"line1": "แต่แค่มีสติ", "highlight": "ก้าวกลับขึ้นมา", "line2": "บนจังหวะของตัวเอง",
             "vo": "แต่แค่มีสติ <short pause> แล้วก้าวเท้ากลับขึ้นมาบนจังหวะเดิม"},
            {"line1": "เพราะสุดท้าย", "highlight": "ชีวิตมีเวลาของมัน", "line2": "เสมอ",
             "vo": "เพราะสุดท้ายแล้ว <short pause> ทุกสิ่งในชีวิต ล้วนมีฤดูกาลของมันเสมอ"}
        ]
    },
    "burden": {
        "title": "stickman-letting-go-burden",
        "beats": [
            {"line1": "เราแบก", "highlight": "ความคาดหวังทุกคน", "line2": "ไว้คนเดียวจนหมดแรง",
             "vo": "เรามักคิดว่า ถ้าเราหยุดแบก <short pause> โลกทั้งใบจะพังทลายลงมา"},
            {"line1": "แต่พอเรา", "highlight": "ยอมวางลง", "line2": "โลกก็ยังหมุนต่อได้เป็นปกติ",
             "vo": "แต่ในวันที่เรายอมปล่อยมือ <short pause> โลกก็ยังคงหมุนต่อไป โดยไม่มีอะไรบุบสลาย"},
            {"line1": "ความสงบเกิดจาก", "highlight": "การเบามือ", "line2": "ไม่ใช่ควบคุมทุกสิ่ง",
             "vo": "ความสงบในใจ ไม่ได้เกิดจากการควบคุมทุกอย่าง <short pause> แต่เกิดจากการเบามือ"},
            {"line1": "เสียงรอบข้างอาจเรียก", "highlight": "ให้กลับไปแบก", "line2": "อีกครั้งเพื่อคนอื่น",
             "vo": "เสียงรอบข้างอาจเรียกให้เรากลับไปแบกอีกครั้ง <short pause> เพื่อให้เป็นคนที่สมบูรณ์แบบ"},
            {"line1": "แต่เราเลือก", "highlight": "ความสบายใจตัวเอง", "line2": "ได้เสมอ",
             "vo": "แต่เรามีสิทธิ์เสมอ <short pause> ที่จะเลือกความสบายใจของตัวเองก่อน"},
            {"line1": "เพราะคนที่วางก่อน", "highlight": "คือคนที่มีสุขก่อน", "line2": "เสมอ",
             "vo": "เพราะคนที่วางก่อน <short pause> คือคนที่มีความสุขก่อนเสมอ"}
        ]
    },
    "comparison": {
        "title": "stickman-own-season",
        "beats": [
            {"line1": "เราชอบเอา", "highlight": "นาฬิกาคนอื่น", "line2": "มาตัดสินชีวิตตัวเอง",
             "vo": "เราชอบเอานาฬิกาของคนอื่น <short pause> มาตัดสินว่าตัวเองกำลังช้าเกินไป"},
            {"line1": "แต่ดอกไม้แต่ละดอก", "highlight": "ผลิบานคนละฤดู", "line2": "ไม่ต้องแข่งกัน",
             "vo": "แต่ดอกไม้แต่ละชนิด ผลิบานในคนละฤดู <short pause> พระอาทิตย์กับพระจันทร์ ก็ไม่เคยแข่งกันขึ้น"},
            {"line1": "เดินใน", "highlight": "จังหวะของตัวเอง", "line2": "จะเห็นความสุขข้างทาง",
             "vo": "เมื่อเราเดินในความเร็วที่พอดี <short pause> เราจะเริ่มเห็นความงดงามข้างทาง"},
            {"line1": "เห็นคนอื่นสำเร็จ", "highlight": "เราอาจใจร้อน", "line2": "จนเผลอวิ่งเหนื่อยเปล่า",
             "vo": "บางครั้งความสำเร็จของคนอื่น <short pause> ก็ทำให้เราเผลอวิ่งจนแทบหมดลมหายใจ"},
            {"line1": "แค่หายใจเข้าลึกๆ", "highlight": "กลับมาที่ตัวเอง", "line2": "เราไม่ได้แข่งกับใคร",
             "vo": "แต่แค่หายใจเข้าลึกๆ <short pause> แล้วจำไว้ว่า เราไม่ได้กำลังแข่งกับใคร"},
            {"line1": "ถึงเวลาก็", "highlight": "งดงามในแบบเรา", "line2": "เสมอ",
             "vo": "ถึงเวลาก็เบ่งบาน <short pause> ในแบบที่ไม่ต้องเหมือนใคร"}
        ]
    },
    "firststep": {
        "title": "stickman-first-step-power",
        "beats": [
            {"line1": "เรามักยืนลังเล", "highlight": "กลัวก้าวแรก", "line2": "จนไม่กล้าเริ่ม",
             "vo": "เรามักเผลอยืนลังเล <short pause> กลัวความไม่พร้อม กลัวความผิดพลาด จนไม่กล้าเริ่มก้าวแรก"},
            {"line1": "ยิ่งคิดวนไปมา", "highlight": "ความกลัวยิ่งขยาย", "line2": "จนตัวเราเล็กลง",
             "vo": "ยิ่งเราคิดวนเวียนอยู่ในหัว <short pause> ความกลัวยิ่งขยายใหญ่ จนตัวเราดูเล็กลงไปทุกที"},
            {"line1": "แต่ความจริงคือ", "highlight": "แค่ขยับเท้าก้าวเดียว", "line2": "เข็มเวลาก็พร้อมพาไป",
             "vo": "แต่ในความเป็นจริง <short pause> แค่กล้าขยับเท้าก้าวเดียว เข็มของเวลาก็พร้อมจะพาเราเคลื่อนไปข้างหน้า"},
            {"line1": "ก้าวแรกอาจสั่นไหว", "highlight": "และไม่สมบูรณ์แบบ", "line2": "อย่างที่วาดฝัน",
             "vo": "ก้าวแรกอาจยังสั่นไหว <short pause> และอาจไม่ได้สวยงามสมบูรณ์แบบ อย่างที่เราเคยวาดฝัน"},
            {"line1": "แต่ทุกการเดินทาง", "highlight": "ล้วนเริ่มต้นจาก", "line2": "ก้าวแรกเสมอ",
             "vo": "แต่ทุกการเดินทางที่ยิ่งใหญ่ <short pause> ล้วนเริ่มต้นจากการยอมก้าวเท้าก้าวแรกเสมอ"},
            {"line1": "กล้าที่จะเริ่มก้าว", "highlight": "แล้วทิศทางข้างหน้า", "line2": "จะชัดเจนขึ้นเอง",
             "vo": "จงกล้าที่จะเริ่มก้าว <short pause> แล้วทิศทางข้างหน้า จะค่อยๆ ปรากฏและชัดเจนขึ้นเอง"}
        ]
    },
    "rest": {
        "title": "stickman-rest-is-progress",
        "beats": [
            {"line1": "ในโลกที่บอกให้ขยัน", "highlight": "เรามักรู้สึกผิด", "line2": "เวลาที่หยุดพัก",
             "vo": "ในโลกที่หมุนไวและเร่งเร้า <short pause> เรามักเผลอรู้สึกผิด ทุกครั้งที่ปล่อยให้ตัวเองได้นั่งพัก"},
            {"line1": "ฝืนทำงานข้ามวันข้ามคืน", "highlight": "จนร่างกายส่งสัญญาณ", "line2": "เตือนไม่ไหว",
             "vo": "เราก้มหน้าทำงานจนร่างพัง <short pause> เพราะกลัวว่าจะกลายเป็นคนขี้เกียจ หรือถูกทิ้งไว้ข้างหลัง"},
            {"line1": "แต่ไม่มีใคร", "highlight": "วิ่งสปริ้นท์ได้ตลอดเวลา", "line2": "โดยไม่ล้มลง",
             "vo": "แต่ไม่มีใครสามารถวิ่งสุดกำลังได้ตลอดทั้งชีวิต <short pause> โดยที่หัวใจไม่แตกสลาย"},
            {"line1": "การฝืนไปต่อตอนหมดแรง", "highlight": "มีแต่จะทำให้", "line2": "ผลงานแย่ลง",
             "vo": "การฝืนก้าวต่อในวันที่หมดพลัง <short pause> มีแต่จะทำให้เราตัดสินใจผิดพลาด และสูญเสียความสุข"},
            {"line1": "อนุญาตให้ตัวเอง", "highlight": "ได้นั่งพักลงเฉยๆ", "line2": "โดยไม่ต้องรู้สึกผิด",
             "vo": "จงกล้าที่จะหยุด <short pause> อนุญาตให้ตัวเองได้ทอดสายตา ดื่มด่ำกับความเงียบสงบ"},
            {"line1": "เพราะการหยุดพัก", "highlight": "ไม่ใช่การถอยหลัง", "line2": "แต่คือการเติมพลังเพื่อก้าวต่อ",
             "vo": "เพราะการพักผ่อน ไม่ใช่การยอมแพ้ <short pause> แต่คือส่วนหนึ่งที่สำคัญที่สุดของการเดินทาง"}
        ]
    },
    "consistency": {
        "title": "stickman-consistency-power",
        "beats": [
            {"line1": "เรามักคิดว่า", "highlight": "ต้องก้าวกระโดด", "line2": "ถึงจะประสบความสำเร็จ",
             "vo": "เรามักเผลอคิดว่า <short pause> ต้องวิ่งให้เร็วที่สุด หรือก้าวกระโดดครั้งใหญ่ ถึงจะไปถึงความสำเร็จ"},
            {"line1": "แต่การวิ่งสุดแรง", "highlight": "มักทำให้เรา", "line2": "หมดลมหายใจกลางทาง",
             "vo": "แต่การวิ่งเต็มแรงในวันเดียว <short pause> มักทำให้เราหมดพลัง และล้มเลิกไปกลางทาง"},
            {"line1": "ดูเข็มนาฬิกา", "highlight": "มันไม่เคยวิ่ง", "line2": "แต่มันไม่เคยหยุดเดิน",
             "vo": "ลองดูเข็มนาฬิกา <short pause> มันไม่เคยวิ่งกระหืดกระหอบ แต่มันไม่เคยหยุดก้าวแม้แต่วินาทีเดียว"},
            {"line1": "บางวันอาจเหนื่อยล้า", "highlight": "จนก้าวได้ช้า", "line2": "และสับสนในทิศทาง",
             "vo": "บางวันที่เราเหนื่อยล้า <short pause> อาจรู้สึกเหมือนตัวเองก้าวช้า และตามใครไม่ทัน"},
            {"line1": "แค่ก้าวต่อวันละนิด", "highlight": "สะสมพลังเงียบๆ", "line2": "ในแบบของเรา",
             "vo": "แต่ขอแค่ไม่หยุดก้าว <short pause> สะสมระยะทางวันละนิด แม้เป็นเพียงก้าวเล็กๆ ก็ตาม"},
            {"line1": "สุดท้ายความสม่ำเสมอ", "highlight": "จะพาเราไปไกล", "line2": "เกินกว่าที่คิดไว้เสมอ",
             "vo": "เพราะสุดท้ายแล้ว <short pause> ความสม่ำเสมอ จะพาเราไปถึงจุดหมายที่ยิ่งใหญ่เสมอ"}
        ]
    },
    "slow": {
        "title": "stickman-slowing-down-life",
        "beats": [
            {"line1": "เราเร่งรีบจนชินชา", "highlight": "จนลืมมองสิ่งรอบตัว", "line2": "ว่าสวยงามแค่ไหน",
             "vo": "เราเร่งรีบตามโลกจนเหนื่อยล้า <short pause> จนลืมมองไปว่า สิ่งรอบตัวสวยงามแค่ไหน"},
            {"line1": "แต่เมื่อเรากล้าก้าวช้าลง", "highlight": "โลกจะเริ่มเปิดเผย", "line2": "ความสุขที่ซ่อนอยู่",
             "vo": "แต่เมื่อเรากล้าก้าวให้ช้าลง <short pause> โลกจะเริ่มเปิดเผย ความสุขเล็กๆ ที่ซ่อนอยู่ข้างทาง"},
            {"line1": "จังหวะชีวิตที่พอดี", "highlight": "จะพาเราไปได้ไกล", "line2": "กว่าการเร่งรีบเสมอ",
             "vo": "จังหวะชีวิตที่พอดี <short pause> จะพาเราไปได้ไกลและมั่นคง กว่าการเร่งรีบเสมอ"},
            {"line1": "เสียงรอบข้างอาจบอกให้รีบ", "highlight": "จนเราเผลอใจร้อน", "line2": "แล้วทำตัวเองหล่นหาย",
             "vo": "บางครั้ง โลกอาจบอกให้เราต้องรีบ <short pause> จนเราเผลอใจร้อน และสะดุดล้มลง"},
            {"line1": "แค่หยุดหายใจเข้าลึกๆ", "highlight": "กลับมาก้าวในจังหวะ", "line2": "ของหัวใจเราเอง",
             "vo": "แต่เพียงแค่หยุดหายใจเข้าลึกๆ <short pause> แล้วกลับมาก้าวในจังหวะ ของหัวใจเราเอง"},
            {"line1": "เพราะชีวิตไม่ใช่การแข่งวิ่ง", "highlight": "การช้าลงบ้าง", "line2": "คือความสุขที่แท้จริง",
             "vo": "เพราะชีวิตไม่ใช่การแข่งวิ่ง <short pause> การช้าลงบ้าง คือของขวัญและความสุขที่แท้จริง"}
        ]
    },
    "work": {
        "title": "stickman-busy-vs-progress",
        "beats": [
            {"line1": "เรามัวแต่วิ่งดันงานทั้งวัน", "highlight": "จนคิดว่าความยุ่ง", "line2": "คือความสำเร็จ",
             "vo": "เรามัวแต่วิ่งดันงานทั้งวัน <short pause> จนเผลอคิดไปว่า ยิ่งยุ่ง ยิ่งเหนื่อย แปลว่ายิ่งก้าวหน้า"},
            {"line1": "แต่คนที่ไปได้ไกล", "highlight": "คือคนที่กล้าหยุดพัก", "line2": "เพื่อทบทวนทิศทาง",
             "vo": "แต่คนที่ไปได้ไกลที่สุด <short pause> คือคนที่กล้าหยุดพัก ถอยออกมามองทิศทางที่แท้จริง"},
            {"line1": "เมื่อมองเห็นภาพใหญ่", "highlight": "งานจะไหลลื่น", "line2": "ไปตามจังหวะที่ควรเป็น",
             "vo": "เมื่อมองเห็นภาพใหญ่ <short pause> งานจะเริ่มไหลลื่นไปข้างหน้า โดยไม่ต้องใช้แรงฝืน"},
            {"line1": "บางวันอาจงานล้นมือ", "highlight": "จนเผลอวิ่งวนลูป", "line2": "และเหนื่อยล้าอีกครั้ง",
             "vo": "บางวันภาระอาจถาโถม <short pause> จนเราเผลอกลับไปวิ่งตามโลกจนแทบหมดลมหายใจ"},
            {"line1": "แต่แค่ดึงสติกลับมา", "highlight": "เลือกสิ่งที่สำคัญจริง", "line2": "แล้วเริ่มใหม่อย่างมั่นใจ",
             "vo": "แต่แค่ดึงสติกลับมา <short pause> ตัดสิ่งที่ไม่จำเป็นออก แล้วเลือกทำสิ่งที่สำคัญจริง"},
            {"line1": "เพราะความสำเร็จ", "highlight": "ไม่ใช่การหมดแรง", "line2": "แต่คือการมีพลังในทุกวัน",
             "vo": "เพราะความสำเร็จที่แท้จริง <short pause> ไม่ใช่การวิ่งจนหมดแรง แต่คือการยังมีรอยยิ้มได้ในทุกวัน"}
        ]
    }
}


def get_audio_duration(file_path: str) -> float:
    cmd = [
        "ffprobe", "-v", "error",
        "-show_entries", "format=duration",
        "-of", "default=noprint_wrappers=1:nokey=1",
        file_path
    ]
    res = subprocess.run(cmd, capture_output=True, text=True, check=True)
    return float(res.stdout.strip())


def synthesize_riko_tts(beats: list, output_wav: str, voice: str = DEFAULT_VOICE, style: str = DEFAULT_STYLE) -> bool:
    """Synthesize full 6-beat narration using Gemini 3.8 Flash TTS (`en-us-riko`)."""
    from google import genai

    full_transcript = " ... <short pause> ".join(b["vo"] for b in beats)
    client = genai.Client(http_options={"api_version": "v1beta"})

    for model_name in ["gemini-3.8-flash-tts", "gemini-3.8-flash-lite-tts"]:
        try:
            print(f"🎙️ [Gemini TTS] Synthesizing with model='{model_name}', voice='{voice}'...")
            interaction = client.interactions.create(
                model=model_name,
                input=[{
                    "type": "user_input",
                    "content": [{
                        "type": "text",
                        "text": full_transcript,
                        "annotations": [{
                            "type": "speech_metadata",
                            "style": style
                        }]
                    }]
                }],
                response_format={"type": "audio", "mime_type": "audio/wav"},
                generation_config={
                    "speech_config": [{"voice": voice}]
                }
            )
            if interaction.output_audio and interaction.output_audio.data:
                wav_bytes = base64.b64decode(interaction.output_audio.data)
                with open(output_wav, "wb") as f:
                    f.write(wav_bytes)
                print(f"✅ [Gemini TTS] Saved Riko narration ({len(wav_bytes):,} bytes) -> {output_wav}")
                return True
        except Exception as e:
            print(f"⚠️ [Gemini TTS] {model_name} warning: {e}")

    return False


async def synthesize_fallback_storyteller(beats: list, output_wav: str, is_female: bool = False):
    """Fallback using edge-tts with either deep baritone (male) or warm soothing (female) mastering."""
    import edge_tts
    clean_lines = [b["vo"].replace("<short pause>", "... ") for b in beats]
    full_text = " ... ".join(clean_lines)
    tmp_mp3 = output_wav + ".tmp.mp3"
    voice_name = "th-TH-PremwadeeNeural" if is_female else "th-TH-NiwatNeural"
    pitch = "+0Hz" if is_female else "-6Hz"
    rate = "-3%" if is_female else "-5%"
    print(f"🎙️ [Fallback TTS] Generating narration via edge-tts ({voice_name})...")
    comm = edge_tts.Communicate(text=full_text, voice=voice_name, rate=rate, pitch=pitch)
    await comm.save(tmp_mp3)
    eq_filter = (
        "highpass=f=90,equalizer=f=300:t=q:w=1.0:g=1.5,equalizer=f=4000:t=q:w=1.2:g=2.2"
        if is_female else
        "highpass=f=75,equalizer=f=150:t=q:w=1.0:g=3.0,equalizer=f=3200:t=q:w=1.2:g=2.0"
    )
    subprocess.run([
        "ffmpeg", "-y", "-i", tmp_mp3,
        "-af", eq_filter,
        "-ar", "24000", "-ac", "1", output_wav
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if os.path.exists(tmp_mp3):
        os.remove(tmp_mp3)
    print(f"✅ [Fallback TTS] Saved -> {output_wav}")


def compute_beat_timings(beats: list, total_duration: float) -> list:
    """Compute proportional start/end timestamps for the 6 beats based on spoken text length."""
    weights = []
    for b in beats:
        clean_vo = b.get("vo", f"{b['line1']} {b['highlight']} {b['line2']}").replace("<short pause>", "")
        weights.append(max(len(clean_vo), 12))
    total_w = sum(weights)
    timed_beats = []
    cur_t = 0.0
    for idx, (b, w) in enumerate(zip(beats, weights)):
        dur = (w / total_w) * total_duration
        end_t = total_duration if idx == len(beats) - 1 else round(cur_t + dur, 2)
        timed_beats.append({
            "start": round(cur_t, 2),
            "end": end_t,
            "line1": b["line1"],
            "highlight": b["highlight"],
            "line2": b["line2"]
        })
        cur_t = end_t
    return timed_beats


def build_render_html(timed_beats: list, total_duration: float, brand_text: str) -> str:
    """Generate the self-contained 1080x1920 HTML5 Canvas studio page for headless frame capture."""
    b_ends = [b["end"] for b in timed_beats]
    beats_json = json.dumps(timed_beats, ensure_ascii=False)
    b_ends_json = json.dumps(b_ends)

    return f"""<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Prompt:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * {{ margin: 0; padding: 0; box-sizing: border-box; }}
    body {{ background: #000; overflow: hidden; }}
    canvas {{ width: 1080px; height: 1920px; display: block; }}
  </style>
</head>
<body>
  <canvas id="mainCanvas" width="1080" height="1920"></canvas>
  <script>
    const canvas = document.getElementById('mainCanvas');
    const ctx = canvas.getContext('2d');
    const WIDTH = 1080, HEIGHT = 1920;
    const TOTAL_DURATION = {total_duration:.4f};
    const CX = WIDTH / 2;
    const CY = HEIGHT / 2 + 100;
    const CLOCK_RADIUS = 380;
    const HAND_LENGTH = 340;
    const BRAND_TEXT = {json.dumps(brand_text, ensure_ascii=False)};
    const scriptBeats = {beats_json};
    const beatEnds = {b_ends_json};

    function hexToRgb(hex) {{
      const bigint = parseInt(hex.replace('#', ''), 16);
      return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
    }}
    function lerpColor(c1, c2, factor) {{
      const rgb1 = hexToRgb(c1), rgb2 = hexToRgb(c2);
      const r = Math.round(rgb1[0] + (rgb2[0] - rgb1[0]) * factor);
      const g = Math.round(rgb1[1] + (rgb2[1] - rgb1[1]) * factor);
      const b = Math.round(rgb1[2] + (rgb2[2] - rgb1[2]) * factor);
      return `rgb(${{r}},${{g}},${{b}})`;
    }}

    function getSceneState(t) {{
      let beatIndex = 6;
      for (let i = 0; i < beatEnds.length; i++) {{
        if (t < beatEnds[i]) {{
          beatIndex = i + 1;
          break;
        }}
      }}
      const START_OFFSET = (10 * Math.PI) / 180;
      const angle = START_OFFSET + (t / TOTAL_DURATION) * (Math.PI * 2);

      const t1 = beatEnds[0], t2 = beatEnds[1], t3 = beatEnds[2], t4 = beatEnds[3];
      let bgTop = "#17261E", bgBottom = "#0E1813", textColor = "#F1F5F9", highlightColor = "#4ADE80";

      if (t >= t1 && t < t2) {{
        const factor = Math.min(1, (t - t1) / 1.4);
        bgTop = lerpColor("#17261E", "#F4F2EA", factor);
        bgBottom = lerpColor("#0E1813", "#C5D6C8", factor);
        textColor = lerpColor("#F1F5F9", "#1E293B", factor);
        highlightColor = lerpColor("#4ADE80", "#15803D", factor);
      }} else if (t >= t2 && t < t3) {{
        bgTop = "#F4F2EA"; bgBottom = "#C5D6C8"; textColor = "#1E293B"; highlightColor = "#15803D";
      }} else if (t >= t3 && t < t4) {{
        const factor = Math.min(1, (t - t3) / 1.0);
        bgTop = lerpColor("#F4F2EA", "#25392E", factor);
        bgBottom = lerpColor("#C5D6C8", "#17261E", factor);
        textColor = lerpColor("#1E293B", "#F1F5F9", factor);
        highlightColor = lerpColor("#15803D", "#4ADE80", factor);
      }} else if (t >= t4) {{
        const factor = Math.min(1, (t - t4) / 1.4);
        bgTop = lerpColor("#25392E", "#F7F5EE", factor);
        bgBottom = lerpColor("#17261E", "#E2D4BA", factor);
        textColor = lerpColor("#F1F5F9", "#1E293B", factor);
        highlightColor = lerpColor("#4ADE80", "#166534", factor);
      }}
      return {{ beatIndex, angle, bgTop, bgBottom, textColor, highlightColor }};
    }}

    function solveTwoBoneIK(rootX, rootY, targetX, targetY, L1, L2, bendDir) {{
      const dx = targetX - rootX, dy = targetY - rootY;
      const rawDist = Math.hypot(dx, dy) || 0.001;
      const d = Math.max(Math.abs(L1 - L2) + 2, Math.min(L1 + L2 - 0.5, rawDist));
      const ux = dx / rawDist, uy = dy / rawDist;
      const px = -uy * bendDir, py = ux * bendDir;
      const cosAlpha = Math.max(-1, Math.min(1, (L1 * L1 + d * d - L2 * L2) / (2 * L1 * d)));
      const sinAlpha = Math.sqrt(Math.max(0, 1 - cosAlpha * cosAlpha));
      return {{
        midX: rootX + ux * (L1 * cosAlpha) + px * (L1 * sinAlpha),
        midY: rootY + uy * (L1 * cosAlpha) + py * (L1 * sinAlpha),
        endX: rootX + ux * d,
        endY: rootY + uy * d
      }};
    }}

    function lerpPoint(p1, p2, alpha) {{
      return {{ x: p1.x + (p2.x - p1.x) * alpha, y: p1.y + (p2.y - p1.y) * alpha }};
    }}

    function computePoseForBeat(beatIdx, t, angle) {{
      const HEAD_R = 22, NECK_LEN = 12;
      const radialX = Math.sin(angle), radialY = -Math.cos(angle);
      const handPt = (frac) => ({{ x: radialX * (HAND_LENGTH * frac), y: radialY * (HAND_LENGTH * frac) }});

      if (beatIdx === 1) {{
        const hc = handPt(0.54);
        const jx = Math.sin(t * 42) * 1.8, jy = Math.cos(t * 42) * 1.8;
        const handFront = {{ x: handPt(0.56).x + 6, y: handPt(0.56).y + 2 }};
        const handBack  = {{ x: handPt(0.50).x + 6, y: handPt(0.50).y + 8 }};
        const shoulder  = {{ x: hc.x + 64 + jx, y: hc.y + 6 + jy }};
        const hip       = {{ x: shoulder.x + 32, y: shoulder.y + 58 }};
        const spineCtrl = {{ x: (hip.x + shoulder.x) / 2 + 8, y: (hip.y + shoulder.y) / 2 - 6 }};
        const head      = {{ x: shoulder.x - 0.18 * (NECK_LEN + HEAD_R), y: shoulder.y - 0.98 * (NECK_LEN + HEAD_R) }};
        const slip = Math.sin(t * 28) * 2.5;
        const footFront = {{ x: hip.x - 28, y: hip.y + 74 }};
        const footBack  = {{ x: hip.x + 36 + slip, y: hip.y + 76 }};
        return {{ hip, shoulder, spineCtrl, head, handFront, handBack, footFront, footBack, elbowBend: -1, kneeBend: 1, showRimTrack: true }};
      }}
      if (beatIdx === 2) {{
        const seat = handPt(0.55);
        const breath = Math.sin(t * 2.6) * 2.5, swing = Math.sin(t * 2.2) * 11;
        const hip       = {{ x: seat.x - 24, y: seat.y - 6 }};
        const shoulder  = {{ x: hip.x - 8,   y: hip.y - 66 + breath }};
        const spineCtrl = {{ x: hip.x - 10,  y: hip.y - 33 + breath * 0.5 }};
        const head      = {{ x: shoulder.x + 0.10 * (NECK_LEN + HEAD_R), y: shoulder.y - 0.99 * (NECK_LEN + HEAD_R) }};
        const handBack  = {{ x: hip.x - 18, y: hip.y + 4 }};
        const handFront = {{ x: seat.x + 8, y: seat.y - 4 }};
        const footFront = {{ x: seat.x + 24 + swing, y: seat.y + 58 }};
        const footBack  = {{ x: seat.x + 12 - swing, y: seat.y + 56 }};
        return {{ hip, shoulder, spineCtrl, head, handFront, handBack, footFront, footBack, elbowBend: 1, kneeBend: -1, showRimTrack: false }};
      }}
      if (beatIdx === 3) {{
        const grip = handPt(0.42);
        const swing = Math.sin(t * 3.0) * 14, legLag = Math.sin(t * 3.0 - 0.65) * 20;
        const handBack  = {{ x: grip.x - 4, y: grip.y - 4 }};
        const handFront = {{ x: grip.x + 4, y: grip.y + 4 }};
        const shoulder  = {{ x: grip.x + 36 + swing * 0.4, y: grip.y + 56 }};
        const hip       = {{ x: shoulder.x + swing * 0.8,  y: shoulder.y + 64 }};
        const spineCtrl = {{ x: (hip.x + shoulder.x) / 2 - swing * 0.15, y: (hip.y + shoulder.y) / 2 }};
        const head      = {{ x: shoulder.x + 14, y: shoulder.y - (NECK_LEN + HEAD_R) + 2 }};
        const footFront = {{ x: hip.x + legLag + 10, y: hip.y + 74 }};
        const footBack  = {{ x: hip.x + legLag * 0.75 - 8, y: hip.y + 72 }};
        return {{ hip, shoulder, spineCtrl, head, handFront, handBack, footFront, footBack, elbowBend: -1, kneeBend: -1, showRimTrack: false }};
      }}
      if (beatIdx === 4) {{
        const hc = handPt(0.54);
        const jx = Math.sin(t * 42) * 1.8, jy = Math.cos(t * 42) * 1.8;
        const handFront = {{ x: handPt(0.56).x + 6, y: handPt(0.56).y + 4 }};
        const handBack  = {{ x: handPt(0.50).x + 6, y: handPt(0.50).y + 10 }};
        const shoulder  = {{ x: hc.x + 64 + jx, y: hc.y + 14 + jy }};
        const hip       = {{ x: shoulder.x + 32, y: shoulder.y + 58 }};
        const spineCtrl = {{ x: (hip.x + shoulder.x) / 2 + 8, y: (hip.y + shoulder.y) / 2 - 6 }};
        const head      = {{ x: shoulder.x - 0.18 * (NECK_LEN + HEAD_R), y: shoulder.y - 0.98 * (NECK_LEN + HEAD_R) }};
        const slip = Math.sin(t * 28) * 2.5;
        const footFront = {{ x: hip.x - 28, y: hip.y + 74 }};
        const footBack  = {{ x: hip.x + 36 + slip, y: hip.y + 76 }};
        return {{ hip, shoulder, spineCtrl, head, handFront, handBack, footFront, footBack, elbowBend: -1, kneeBend: 1, showRimTrack: true }};
      }}
      if (beatIdx === 5) {{
        const stepHigh = handPt(0.42), stepLow = handPt(0.72), bob = Math.sin(t * 3.2) * 2.5;
        const footFront = {{ x: stepHigh.x, y: stepHigh.y - 4 }};
        const footBack  = {{ x: stepLow.x,  y: stepLow.y - 4 }};
        const midX = (footFront.x + footBack.x) / 2, midY = (footFront.y + footBack.y) / 2;
        const hip       = {{ x: midX - 8,  y: midY - 64 + bob }};
        const shoulder  = {{ x: hip.x + 12, y: hip.y - 62 + bob }};
        const spineCtrl = {{ x: hip.x + 4,  y: hip.y - 31 + bob }};
        const head      = {{ x: shoulder.x + 0.22 * (NECK_LEN + HEAD_R), y: shoulder.y - 0.97 * (NECK_LEN + HEAD_R) }};
        const handFront = {{ x: shoulder.x + 34, y: shoulder.y + 16 }};
        const handBack  = {{ x: shoulder.x - 24, y: shoulder.y + 34 }};
        return {{ hip, shoulder, spineCtrl, head, handFront, handBack, footFront, footBack, elbowBend: 1, kneeBend: -1, showRimTrack: false }};
      }}
      const seat = handPt(0.48);
      const breath = Math.sin(t * 2.6) * 2.5, swing = Math.sin(t * 2.2) * 10;
      const hip       = {{ x: seat.x + 28, y: seat.y - 4 }};
      const shoulder  = {{ x: hip.x + 8,   y: hip.y - 66 + breath }};
      const spineCtrl = {{ x: hip.x + 10,  y: hip.y - 33 + breath * 0.5 }};
      const head      = {{ x: shoulder.x - 0.10 * (NECK_LEN + HEAD_R), y: shoulder.y - 0.99 * (NECK_LEN + HEAD_R) }};
      const handBack  = {{ x: hip.x + 18, y: hip.y + 4 }};
      const handFront = {{ x: seat.x - 6, y: seat.y - 4 }};
      const footFront = {{ x: seat.x - 22 + swing, y: seat.y + 58 }};
      const footBack  = {{ x: seat.x - 10 - swing, y: seat.y + 56 }};
      return {{ hip, shoulder, spineCtrl, head, handFront, handBack, footFront, footBack, elbowBend: -1, kneeBend: 1, showRimTrack: false }};
    }}

    function getBlendedPose(t, angle, beatIndex) {{
      const boundaries = [
        {{ time: beatEnds[0], from: 1, to: 2 }},
        {{ time: beatEnds[1], from: 2, to: 3 }},
        {{ time: beatEnds[2], from: 3, to: 4 }},
        {{ time: beatEnds[3], from: 4, to: 5 }},
        {{ time: beatEnds[4], from: 5, to: 6 }}
      ];
      const TRANS_WINDOW = 0.45;
      for (const b of boundaries) {{
        if (Math.abs(t - b.time) < TRANS_WINDOW) {{
          const rawAlpha = (t - (b.time - TRANS_WINDOW)) / (TRANS_WINDOW * 2);
          const alpha = rawAlpha * rawAlpha * (3 - 2 * rawAlpha);
          const pA = computePoseForBeat(b.from, t, angle);
          const pB = computePoseForBeat(b.to, t, angle);
          return {{
            hip:       lerpPoint(pA.hip, pB.hip, alpha),
            shoulder:  lerpPoint(pA.shoulder, pB.shoulder, alpha),
            spineCtrl: lerpPoint(pA.spineCtrl, pB.spineCtrl, alpha),
            head:      lerpPoint(pA.head, pB.head, alpha),
            handFront: lerpPoint(pA.handFront, pB.handFront, alpha),
            handBack:  lerpPoint(pA.handBack, pB.handBack, alpha),
            footFront: lerpPoint(pA.footFront, pB.footFront, alpha),
            footBack:  lerpPoint(pA.footBack, pB.footBack, alpha),
            elbowBend: alpha < 0.5 ? pA.elbowBend : pB.elbowBend,
            kneeBend:  alpha < 0.5 ? pA.kneeBend  : pB.kneeBend,
            showRimTrack: alpha < 0.5 ? pA.showRimTrack : pB.showRimTrack
          }};
        }}
      }}
      return computePoseForBeat(beatIndex, t, angle);
    }}

    function drawStickman(ctx, state, t) {{
      ctx.save();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      const isDarkBeat = (state.beatIndex === 1 || state.beatIndex === 4);
      const charColor = isDarkBeat ? "#F8FAFC" : "#0F172A";
      const backLimbColor = isDarkBeat ? "rgba(248, 250, 252, 0.55)" : "rgba(15, 23, 42, 0.50)";
      const pose = getBlendedPose(t, state.angle, state.beatIndex);
      const UPPER_ARM = 38, LOWER_ARM = 36, THIGH = 48, SHIN = 48, HEAD_R = 22;

      const armBackIK  = solveTwoBoneIK(pose.shoulder.x, pose.shoulder.y, pose.handBack.x,  pose.handBack.y,  UPPER_ARM, LOWER_ARM, pose.elbowBend);
      const armFrontIK = solveTwoBoneIK(pose.shoulder.x, pose.shoulder.y, pose.handFront.x, pose.handFront.y, UPPER_ARM, LOWER_ARM, pose.elbowBend);
      const legBackIK  = solveTwoBoneIK(pose.hip.x,      pose.hip.y,      pose.footBack.x,  pose.footBack.y,  THIGH,     SHIN,      pose.kneeBend);
      const legFrontIK = solveTwoBoneIK(pose.hip.x,      pose.hip.y,      pose.footFront.x, pose.footFront.y, THIGH,     SHIN,      pose.kneeBend);

      if (pose.showRimTrack) {{
        ctx.save();
        ctx.beginPath();
        const footMinX = Math.min(legBackIK.endX, legFrontIK.endX) - 24;
        const footMaxX = Math.max(legBackIK.endX, legFrontIK.endX) + 24;
        const groundY  = Math.max(legBackIK.endY, legFrontIK.endY) + 4;
        ctx.moveTo(footMinX, groundY);
        ctx.lineTo(footMaxX, groundY);
        ctx.lineWidth = 5;
        ctx.strokeStyle = isDarkBeat ? "rgba(255, 255, 255, 0.35)" : "rgba(15, 23, 42, 0.3)";
        ctx.stroke();
        ctx.restore();
      }}

      ctx.lineWidth = 7.5;
      ctx.strokeStyle = backLimbColor;
      ctx.beginPath();
      ctx.moveTo(pose.hip.x, pose.hip.y);
      ctx.lineTo(legBackIK.midX, legBackIK.midY);
      ctx.lineTo(legBackIK.endX, legBackIK.endY);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(pose.shoulder.x, pose.shoulder.y);
      ctx.lineTo(armBackIK.midX, armBackIK.midY);
      ctx.lineTo(armBackIK.endX, armBackIK.endY);
      ctx.stroke();

      ctx.lineWidth = 8.5;
      ctx.strokeStyle = charColor;
      ctx.beginPath();
      ctx.moveTo(pose.hip.x, pose.hip.y);
      ctx.quadraticCurveTo(pose.spineCtrl.x, pose.spineCtrl.y, pose.shoulder.x, pose.shoulder.y);
      ctx.stroke();

      const neckDx = pose.head.x - pose.shoulder.x, neckDy = pose.head.y - pose.shoulder.y;
      const neckDist = Math.hypot(neckDx, neckDy) || 1;
      ctx.beginPath();
      ctx.moveTo(pose.shoulder.x, pose.shoulder.y);
      ctx.lineTo(pose.head.x - (neckDx / neckDist) * HEAD_R, pose.head.y - (neckDy / neckDist) * HEAD_R);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(pose.head.x, pose.head.y, HEAD_R, 0, Math.PI * 2);
      ctx.fillStyle = state.bgTop;
      ctx.fill();
      ctx.lineWidth = 8;
      ctx.strokeStyle = charColor;
      ctx.stroke();

      ctx.lineWidth = 8;
      ctx.strokeStyle = charColor;
      ctx.beginPath();
      ctx.moveTo(pose.hip.x, pose.hip.y);
      ctx.lineTo(legFrontIK.midX, legFrontIK.midY);
      ctx.lineTo(legFrontIK.endX, legFrontIK.endY);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(pose.shoulder.x, pose.shoulder.y);
      ctx.lineTo(armFrontIK.midX, armFrontIK.midY);
      ctx.lineTo(armFrontIK.endX, armFrontIK.endY);
      ctx.stroke();

      ctx.fillStyle = charColor;
      [armFrontIK, legFrontIK].forEach(ik => {{
        ctx.beginPath();
        ctx.arc(ik.endX, ik.endY, 4.5, 0, Math.PI * 2);
        ctx.fill();
      }});
      ctx.restore();
    }}

    function drawSubtitles(ctx, t, state) {{
      const seg = scriptBeats.find(s => t >= s.start && t < s.end) || scriptBeats[scriptBeats.length - 1];
      if (!seg) return;
      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const posY = 320;
      ctx.font = "600 52px 'Prompt', sans-serif";
      ctx.fillStyle = state.textColor;
      ctx.fillText(seg.line1, WIDTH / 2, posY);

      if (seg.highlight) {{
        ctx.font = "700 68px 'Prompt', sans-serif";
        const textW = ctx.measureText(seg.highlight).width;
        const pillY = posY + 90;
        ctx.fillStyle = (state.beatIndex === 1 || state.beatIndex === 4) ? "rgba(74, 222, 128, 0.15)" : "rgba(22, 101, 52, 0.15)";
        ctx.beginPath();
        ctx.roundRect(WIDTH / 2 - textW / 2 - 30, pillY - 45, textW + 60, 90, 24);
        ctx.fill();
        ctx.fillStyle = state.highlightColor;
        ctx.fillText(seg.highlight, WIDTH / 2, pillY);
      }}
      if (seg.line2) {{
        ctx.font = "400 44px 'Prompt', sans-serif";
        ctx.fillStyle = state.textColor;
        ctx.fillText(seg.line2, WIDTH / 2, posY + 180);
      }}
      ctx.restore();
    }}

    function drawWatermark(ctx, state) {{
      if (!BRAND_TEXT) return;
      ctx.save();
      const centerX = WIDTH / 2, centerY = 115;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "500 26px 'Prompt', sans-serif";
      const textW = ctx.measureText(BRAND_TEXT).width;
      ctx.globalAlpha = 0.42;
      ctx.fillStyle = state.textColor;
      ctx.strokeStyle = state.textColor;
      ctx.lineWidth = 1.8;
      ctx.lineCap = "round";
      ctx.fillText(BRAND_TEXT, centerX, centerY);
      const gap = 16, lineLen = 38;
      ctx.beginPath();
      ctx.moveTo(centerX - textW / 2 - gap - lineLen, centerY);
      ctx.lineTo(centerX - textW / 2 - gap, centerY);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(centerX + textW / 2 + gap, centerY);
      ctx.lineTo(centerX + textW / 2 + gap + lineLen, centerY);
      ctx.stroke();
      ctx.restore();
    }}

    function renderFrame(t) {{
      const state = getSceneState(t);
      const grad = ctx.createLinearGradient(0, 0, 0, HEIGHT);
      grad.addColorStop(0, state.bgTop);
      grad.addColorStop(1, state.bgBottom);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      ctx.save();
      ctx.translate(CX, CY);
      ctx.beginPath();
      ctx.arc(0, 0, CLOCK_RADIUS, 0, Math.PI * 2);
      ctx.lineWidth = 14;
      ctx.strokeStyle = (state.beatIndex === 1 || state.beatIndex === 4) ? "rgba(255, 255, 255, 0.4)" : "rgba(30, 41, 59, 0.4)";
      ctx.stroke();

      for (let i = 0; i < 12; i++) {{
        const tickAngle = (i / 12) * Math.PI * 2;
        const x1 = Math.sin(tickAngle) * (CLOCK_RADIUS - 10);
        const y1 = -Math.cos(tickAngle) * (CLOCK_RADIUS - 10);
        const x2 = Math.sin(tickAngle) * (CLOCK_RADIUS - (i % 3 === 0 ? 35 : 20));
        const y2 = -Math.cos(tickAngle) * (CLOCK_RADIUS - (i % 3 === 0 ? 35 : 20));
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineWidth = (i % 3 === 0) ? 6 : 3;
        ctx.strokeStyle = (state.beatIndex === 1 || state.beatIndex === 4) ? "rgba(255, 255, 255, 0.6)" : "rgba(30, 41, 59, 0.6)";
        ctx.stroke();
      }}

      ctx.beginPath();
      ctx.arc(0, 0, 16, 0, Math.PI * 2);
      ctx.fillStyle = (state.beatIndex === 1 || state.beatIndex === 4) ? "#E2E8F0" : "#1E293B";
      ctx.fill();

      const handX = Math.sin(state.angle) * HAND_LENGTH;
      const handY = -Math.cos(state.angle) * HAND_LENGTH;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(handX, handY);
      ctx.lineWidth = 10;
      ctx.lineCap = "round";
      ctx.strokeStyle = (state.beatIndex === 1 || state.beatIndex === 4) ? "#38BDF8" : "#0284C7";
      ctx.stroke();

      const normalAngle = state.angle - Math.PI / 2;
      const tipBaseX = Math.sin(state.angle) * (HAND_LENGTH - 35);
      const tipBaseY = -Math.cos(state.angle) * (HAND_LENGTH - 35);
      const tipW = 16;
      ctx.beginPath();
      ctx.moveTo(handX, handY);
      ctx.lineTo(tipBaseX + Math.cos(normalAngle) * tipW, tipBaseY + Math.sin(normalAngle) * tipW);
      ctx.lineTo(tipBaseX - Math.cos(normalAngle) * tipW, tipBaseY - Math.sin(normalAngle) * tipW);
      ctx.closePath();
      ctx.fillStyle = ctx.strokeStyle;
      ctx.fill();

      drawStickman(ctx, state, t);
      ctx.restore();

      drawSubtitles(ctx, t, state);
      drawWatermark(ctx, state);
    }}
    window.renderFrame = renderFrame;
  </script>
</body>
</html>"""


async def render_pipeline(
    beats: list,
    output_mp4: str,
    audio_path: str = None,
    voice: str = DEFAULT_VOICE,
    style: str = DEFAULT_STYLE,
    brand_text: str = DEFAULT_BRAND,
    fps: int = 30
):
    work_dir = tempfile.mkdtemp(prefix="stickman_clock_")
    try:
        is_female = voice.lower() in ["aoede", "en-us-aoede", "kore", "female", "premwadee"]
        if is_female and style == DEFAULT_STYLE:
            style = "Soft, warm, calm, soothing, and reflective storytelling with gentle pacing."

        raw_voice_wav = audio_path
        if not raw_voice_wav or not os.path.exists(raw_voice_wav):
            raw_voice_wav = os.path.join(work_dir, "voice_track.wav")
            ok = synthesize_riko_tts(beats, raw_voice_wav, voice=voice, style=style)
            if not ok:
                await synthesize_fallback_storyteller(beats, raw_voice_wav, is_female=is_female)

        voice_dur = get_audio_duration(raw_voice_wav)
        total_duration = round(voice_dur + 0.6, 2)
        total_frames = int(total_duration * fps)

        timed_beats = compute_beat_timings(beats, total_duration)
        print(f"⏱️  Synchronized 6 Beats to Audio Duration ({total_duration:.2f}s / {total_frames} frames)")

        # Master voice + Fmaj7 Ambient Lo-Fi Pad
        mastered_wav = os.path.join(work_dir, "mastered_mix.wav")
        pad_expr = "0.05*sin(2*PI*174.61*t)+0.04*sin(2*PI*220.0*t)+0.04*sin(2*PI*261.63*t)+0.03*sin(2*PI*329.63*t)"
        audio_filter = (
            f"[0:a]highpass=f=80,equalizer=f=3200:t=q:w=1.2:g=2.2,apad=pad_dur=0.6,atrim=0:{total_duration}[voice];"
            f"aevalsrc='{pad_expr}':d={total_duration}:s=24000,lowpass=f=450,volume=0.18[bgm];"
            f"[voice][bgm]amix=inputs=2:duration=first:dropout_transition=2[aout]"
        )
        subprocess.run([
            "ffmpeg", "-y", "-i", raw_voice_wav,
            "-filter_complex", audio_filter,
            "-map", "[aout]", "-c:a", "pcm_s16le", mastered_wav
        ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

        # Build HTML & launch Headless Chrome CDP
        html_path = os.path.join(work_dir, "studio_render.html")
        with open(html_path, "w", encoding="utf-8") as f:
            f.write(build_render_html(timed_beats, total_duration, brand_text))

        port = 9228
        chrome_proc = subprocess.Popen([
            CHROME_PATH, "--headless=new", f"--remote-debugging-port={port}", "--disable-gpu", "about:blank"
        ])
        await asyncio.sleep(1.2)

        try:
            with urllib.request.urlopen(f"http://127.0.0.1:{port}/json") as resp:
                tabs = json.loads(resp.read().decode())
            ws_url = tabs[0]["webSocketDebuggerUrl"]

            os.makedirs(os.path.dirname(os.path.abspath(output_mp4)), exist_ok=True)
            ffmpeg_proc = subprocess.Popen([
                "ffmpeg", "-y",
                "-f", "image2pipe", "-vcodec", "mjpeg", "-r", str(fps), "-i", "-",
                "-i", mastered_wav,
                "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p",
                "-c:a", "aac", "-b:a", "256k", "-movflags", "+faststart", "-shortest",
                output_mp4
            ], stdin=subprocess.PIPE, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

            async with websockets.connect(ws_url, max_size=100_000_000) as ws:
                file_url = f"file:///{html_path.replace(os.sep, '/')}"
                await ws.send(json.dumps({"id": 1, "method": "Page.navigate", "params": {"url": file_url}}))
                await asyncio.sleep(1.4)
                await ws.send(json.dumps({"id": 2, "method": "Runtime.evaluate", "params": {"expression": "document.fonts.ready"}}))
                await ws.recv()

                t_start = time.time()
                for f_idx in range(total_frames):
                    sec = f_idx / fps
                    code = f"renderFrame({sec:.4f}); mainCanvas.toDataURL('image/jpeg', 0.88).substring(23);"
                    msg_id = 1000 + f_idx
                    await ws.send(json.dumps({"id": msg_id, "method": "Runtime.evaluate", "params": {"expression": code}}))
                    while True:
                        data = json.loads(await ws.recv())
                        if data.get("id") == msg_id:
                            val = data["result"]["result"]["value"]
                            ffmpeg_proc.stdin.write(base64.b64decode(val))
                            break
                    if f_idx % 60 == 0 or f_idx == total_frames - 1:
                        elapsed = max(time.time() - t_start, 0.01)
                        speed = (f_idx + 1) / elapsed
                        print(f"🎬 Rendering {f_idx+1}/{total_frames} ({(f_idx+1)/total_frames*100:.1f}%) @ {speed:.1f} fps", end="\r")

                ffmpeg_proc.stdin.close()
                ffmpeg_proc.wait()
                print(f"\n✨ Final 9:16 Video Exported -> {output_mp4}")
        finally:
            chrome_proc.terminate()
    finally:
        shutil.rmtree(work_dir, ignore_errors=True)


def main():
    parser = argparse.ArgumentParser(description="Automated Stickman vs. Clock 9:16 Video Generator (Riko TTS + MP4)")
    parser.add_argument("--preset", choices=list(PRESETS.keys()), default="work", help="Built-in story preset")
    parser.add_argument("--script", type=str, help="Path to custom 6-beat JSON file")
    parser.add_argument("--audio", type=str, help="Optional pre-recorded WAV/MP3 voiceover file")
    parser.add_argument("--voice", type=str, default=DEFAULT_VOICE, help="Gemini TTS voice ID (default: en-us-riko)")
    parser.add_argument("--style", type=str, default=DEFAULT_STYLE, help="Gemini TTS speech_metadata.style")
    parser.add_argument("--brand", type=str, default=DEFAULT_BRAND, help="Top-center watermark text (default: © AT)")
    parser.add_argument("--output", type=str, help="Output MP4 file path")
    args = parser.parse_args()

    if args.script and os.path.exists(args.script):
        with open(args.script, "r", encoding="utf-8") as f:
            payload = json.load(f)
            beats = payload["beats"] if isinstance(payload, dict) else payload
            title = payload.get("title", "stickman-custom") if isinstance(payload, dict) else "stickman-custom"
    else:
        preset_data = PRESETS[args.preset]
        beats = preset_data["beats"]
        title = preset_data["title"]

    downloads_dir = os.path.join(os.path.expanduser("~"), "Downloads")
    out_path = args.output or os.path.join(downloads_dir, f"{title}-1080x1920.mp4")

    asyncio.run(render_pipeline(
        beats=beats,
        output_mp4=out_path,
        audio_path=args.audio,
        voice=args.voice,
        style=args.style,
        brand_text=args.brand
    ))


if __name__ == "__main__":
    main()
