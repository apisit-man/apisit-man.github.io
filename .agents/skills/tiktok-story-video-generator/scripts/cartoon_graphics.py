"""
Cartoon Graphic & Comic Subtitle Overlay Engine.
Generates 1080x1920 transparent PNG overlays with:
- Rounded Bubbly Comic Speech Cards with soft drop shadows
- High-contrast colored Speaker & Topic Badges
- Comic emotion stickers (sweat drops, stress marks, stars, sparkle bursts)
- Safe-zone aligned Thai typography (Leelawadee UI / Tahoma)
"""

import os
from PIL import Image, ImageDraw, ImageFont

CANVAS_W = 1080
CANVAS_H = 1920

# Badge Styles
BADGE_PALETTES = {
    "bobby": {"bg": (2, 132, 199), "text": (255, 255, 255), "label": "บ๊อบบี้ (Bobby)"},
    "marsh": {"bg": (13, 148, 136), "text": (255, 255, 255), "label": "คุณมาร์ช (Mr. Marsh)"},
    "tip": {"bg": (217, 119, 6), "text": (255, 255, 255), "label": "เคล็ดลับเปลี่ยนชีวิต"},
    "alert": {"bg": (225, 29, 72), "text": (255, 255, 255), "label": "ข้อผิดพลาดที่พบบ่อย"},
    "focus": {"bg": (16, 185, 129), "text": (255, 255, 255), "label": "โฟกัสงานสำคัญ"}
}

def get_font(size):
    """Load high-legibility Thai font on Windows."""
    candidates = [
        r"C:\Windows\Fonts\LeelawUI.ttf",
        r"C:\Windows\Fonts\leelawdb.ttf",
        r"C:\Windows\Fonts\tahomabd.ttf",
        r"C:\Windows\Fonts\tahoma.ttf",
        r"C:\Windows\Fonts\THSarabunNew.ttf"
    ]
    for p in candidates:
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()

def draw_comic_bubble(draw, text, badge_key="bobby", custom_badge_label=None, y_pos=1380):
    """Draw a vibrant cartoon comic speech bubble with a top badge and shadow."""
    font_badge = get_font(30)
    font_main = get_font(42)

    bubble_w = 940
    bubble_h = 190
    bx = (CANVAS_W - bubble_w) // 2
    by = y_pos

    # 1. 3D Cartoon Drop Shadow (+6px, +8px)
    draw.rounded_rectangle([bx + 6, by + 8, bx + bubble_w + 6, by + bubble_h + 8], radius=30, fill=(0, 0, 0, 60))

    # 2. Main Bubbly Card Surface (Pure White/Warm Cream with 4px dark border)
    draw.rounded_rectangle([bx, by, bx + bubble_w, by + bubble_h], radius=30, fill=(255, 254, 250, 245), outline=(30, 41, 59, 255), width=4)

    # 3. Speaker / Topic Capsule Badge
    badge_info = BADGE_PALETTES.get(badge_key, BADGE_PALETTES["bobby"])
    badge_label = custom_badge_label or badge_info["label"]
    badge_bg = badge_info["bg"]
    
    badge_w = 340
    badge_h = 54
    badge_x = bx + 45
    badge_y = by - 27

    # Badge Shadow + Fill
    draw.rounded_rectangle([badge_x + 4, badge_y + 4, badge_x + badge_w + 4, badge_y + badge_h + 4], radius=16, fill=(0, 0, 0, 45))
    draw.rounded_rectangle([badge_x, badge_y, badge_x + badge_w, badge_y + badge_h], radius=16, fill=badge_bg, outline=(30, 41, 59, 255), width=3)
    
    # Badge Text
    draw.text((badge_x + 25, badge_y + 8), badge_label, font=font_badge, fill=badge_info["text"])

    # 4. Dialogue Text (Centered in bubble with pleasant line spacing)
    # Wrap text if long
    max_chars = 34
    if len(text) > max_chars:
        mid = len(text) // 2
        split_pos = text.rfind(" ", 0, mid + 8)
        if split_pos == -1:
            split_pos = mid
        line1 = text[:split_pos].strip()
        line2 = text[split_pos:].strip()
        draw.text((bx + 55, by + 55), line1, font=font_main, fill=(15, 23, 42))
        draw.text((bx + 55, by + 110), line2, font=font_main, fill=(15, 23, 42))
    else:
        draw.text((bx + 55, by + 80), text, font=font_main, fill=(15, 23, 42))

def draw_comic_accents(draw, scene_id):
    """Draw comic decorative sticker accents depending on scene emotion."""
    # Top corner header badge (TikTok top safe zone y=300)
    font_top = get_font(32)
    top_badge_box = [60, 280, 450, 345]
    draw.rounded_rectangle([top_badge_box[0] + 4, top_badge_box[1] + 4, top_badge_box[2] + 4, top_badge_box[3] + 4], radius=18, fill=(0, 0, 0, 50))
    draw.rounded_rectangle(top_badge_box, radius=18, fill=(255, 255, 255, 235), outline=(30, 41, 59), width=3)
    draw.text((top_badge_box[0] + 25, top_badge_box[1] + 12), f"EPISODE • SCENE {scene_id}", font=font_top, fill=(30, 41, 59))

    # Sparkle Stars in positive scenes
    if scene_id in [4, 5, 6]:
        star_points = [(920, 320), (980, 420), (120, 1260), (960, 1300)]
        for sx, sy in star_points:
            draw.ellipse([sx - 12, sy - 12, sx + 12, sy + 12], fill=(254, 240, 138, 240))
            draw.ellipse([sx - 5, sy - 5, sx + 5, sy + 5], fill=(255, 255, 255, 255))

def create_cartoon_overlay(scene, output_png):
    """Generate a high-DPI transparent PNG overlay for a scene."""
    img = Image.new("RGBA", (CANVAS_W, CANVAS_H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img, "RGBA")

    caption = scene.get("caption", "")
    scene_id = scene.get("id", 1)
    
    # Choose badge style based on cut narrative function
    badge_map = {
        1: ("alert", "⚠️ อาการของคนทำงาน"),
        2: ("alert", "🏃 วิ่งวุ่นทั้งวัน"),
        3: ("bobby", "😅 สภาพตอนเช็คงาน"),
        4: ("marsh", "💡 คุณมาร์ชเตือนสติ"),
        5: ("focus", "🎯 กฎ 30 นาทีแรก"),
        6: ("tip", "❤️ ชนะใจตัวเอง")
    }
    b_key, b_label = badge_map.get(scene_id, ("bobby", "บ๊อบบี้"))

    # Render Comic Speech Bubble
    draw_comic_bubble(draw, caption, badge_key=b_key, custom_badge_label=b_label)

    # Render Decorative Comic Accents
    draw_comic_accents(draw, scene_id)

    img.save(output_png, "PNG")
    return output_png
