"""
IPST Presentation Slides Generator Script (Reusable Utility)
Generate modern, professional, academic presentations in IPST (สสวท.) style.
Supports:
- Cover & Closing Slides with Logo Card, Title, Subtitle, and Key Highlights
- 2, 3, and 4 Column Content Cards with Color Accent Caps, Subheadings, and Bold-Lead Bullets
- 2x3 (6-Step Grid) Layout (3.64" x 2.25") per IPST Official Geometry
- Automatic Bundled IPST Logo Resolution (assets/Logo_IPST_transparent.png)
- Structured Speaker Notes with Duration Tracking
"""

import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

# IPST Official Color Palette
IPST_NAVY = RGBColor(0, 51, 102)            # #003366 Deep Royal Blue
IPST_DEEP = RGBColor(7, 30, 61)             # #071E3D Midnight Navy
IPST_CYAN = RGBColor(0, 153, 218)           # #0099DA Tech Cyan
IPST_CYAN_LIGHT = RGBColor(240, 249, 255)   # #F0F9FF Light Cyan Background
IPST_CYAN_BORDER = RGBColor(186, 230, 253)  # #BAE6FD
IPST_ORANGE = RGBColor(242, 101, 34)        # #F26522 Vibrant Orange
IPST_GREEN = RGBColor(16, 185, 129)         # #10B981 Science Green
IPST_GOLD = RGBColor(245, 158, 11)          # #F59E0B Academic Gold

BG_LIGHT = RGBColor(248, 250, 252)          # #F8FAFC Clean Slate Background
CARD_BG = RGBColor(255, 255, 255)           # #FFFFFF Pure White
CARD_BORDER = RGBColor(226, 232, 240)       # #E2E8F0 Subtle Border
TEXT_DARK = RGBColor(30, 41, 59)            # #1E293B Slate Dark
TEXT_SUB = RGBColor(71, 85, 105)            # #475569 Slate Mid
TEXT_MUTED = RGBColor(148, 163, 184)        # #94A3B8 Slate Muted
TEXT_WHITE = RGBColor(255, 255, 255)

ACCENT_MAP = {
    "navy": IPST_NAVY,
    "cyan": IPST_CYAN,
    "orange": IPST_ORANGE,
    "green": IPST_GREEN,
    "gold": IPST_GOLD,
}

FONT_FAMILY = "Leelawadee UI"


def set_flat_shape(shape, fill_color, border_color=None, border_width=1):
    shape.fill.solid()
    shape.fill.fore_color.rgb = fill_color
    if border_color:
        shape.line.color.rgb = border_color
        shape.line.width = Pt(border_width)
    else:
        shape.line.fill.background()


def add_bold_lead_bullet(tf, bold_prefix, normal_text, font_size=14, prefix_color=IPST_NAVY, text_color=TEXT_DARK, space_after=8):
    p = tf.add_paragraph()
    p.space_after = Pt(space_after)
    p.line_spacing = 1.25

    r1 = p.add_run()
    r1.text = bold_prefix + " "
    r1.font.name = FONT_FAMILY
    r1.font.size = Pt(font_size)
    r1.font.bold = True
    r1.font.color.rgb = prefix_color

    r2 = p.add_run()
    r2.text = normal_text
    r2.font.name = FONT_FAMILY
    r2.font.size = Pt(font_size)
    r2.font.bold = False
    r2.font.color.rgb = text_color


def create_ipst_header(slide, section_name, slide_num, total_slides, logo_path=None):
    # Category Tag Badge (12pt Bold)
    tag = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(0.32), Inches(5.4), Inches(0.42))
    set_flat_shape(tag, IPST_CYAN_LIGHT, IPST_CYAN_BORDER, 1)
    tf = tag.text_frame
    tf.vertical_anchor = MSO_ANCHOR.MIDDLE
    tf.margin_left = Inches(0.18)
    p = tf.paragraphs[0]
    p.text = section_name
    p.font.name = FONT_FAMILY
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = IPST_NAVY

    # Slide Counter & Duration Pill
    num_box = slide.shapes.add_textbox(Inches(9.2), Inches(0.35), Inches(2.4), Inches(0.4))
    p_n = num_box.text_frame.paragraphs[0]
    p_n.text = f"สไลด์ {slide_num} จาก {total_slides}"
    p_n.font.name = FONT_FAMILY
    p_n.font.size = Pt(11.5)
    p_n.font.color.rgb = TEXT_SUB
    p_n.alignment = PP_ALIGN.RIGHT

    # Top-Right Compact IPST Logo
    if logo_path and os.path.exists(logo_path):
        slide.shapes.add_picture(logo_path, Inches(11.9), Inches(0.20), height=Inches(0.66))


def get_default_logo_path():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    skill_logo = os.path.join(os.path.dirname(script_dir), "assets", "Logo_IPST_transparent.png")
    if os.path.exists(skill_logo):
        return skill_logo
    cwd_logo = os.path.join(os.getcwd(), "Logo_IPST_transparent.png")
    return cwd_logo if os.path.exists(cwd_logo) else None


def resolve_accent(color_val):
    if isinstance(color_val, RGBColor):
        return color_val
    return ACCENT_MAP.get(str(color_val).lower(), IPST_NAVY)


def create_ipst_deck(slides_data, output_path, logo_path=None):
    if logo_path is None:
        logo_path = get_default_logo_path()

    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]
    total_slides = len(slides_data)

    for idx, item in enumerate(slides_data):
        slide = prs.slides.add_slide(blank_layout)
        is_cover = item.get("is_cover", False)
        is_closing = item.get("is_closing", False)

        if is_cover or is_closing:
            bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
            set_flat_shape(bg, IPST_DEEP if is_closing else IPST_NAVY, None)

            top_line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(0.14))
            set_flat_shape(top_line, IPST_CYAN, None)

            # Top-Left Rounded White Logo Card + Institution Identity
            if logo_path and os.path.exists(logo_path):
                logo_card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.0), Inches(0.65), Inches(1.6), Inches(1.6))
                set_flat_shape(logo_card, CARD_BG, None)
                slide.shapes.add_picture(logo_path, Inches(1.1), Inches(0.73), width=Inches(1.4), height=Inches(1.44))

            org_tb = slide.shapes.add_textbox(Inches(2.85), Inches(0.75), Inches(9.5), Inches(1.4))
            org_tf = org_tb.text_frame
            org_tf.word_wrap = True
            p_org1 = org_tf.paragraphs[0]
            p_org1.text = item.get("kicker", "สถาบันส่งเสริมการสอนวิทยาศาสตร์และเทคโนโลยี (สสวท.)")
            p_org1.font.name = FONT_FAMILY
            p_org1.font.size = Pt(18)
            p_org1.font.bold = True
            p_org1.font.color.rgb = IPST_GOLD

            p_org2 = org_tf.add_paragraph()
            p_org2.text = item.get("kicker_en", "The Institute for the Promotion of Teaching Science and Technology (IPST)")
            p_org2.font.name = FONT_FAMILY
            p_org2.font.size = Pt(13.5)
            p_org2.font.color.rgb = TEXT_WHITE
            p_org2.space_before = Pt(4)

            # Cover / Closing Title & Subtitle
            tb = slide.shapes.add_textbox(Inches(1.0), Inches(2.55), Inches(11.3), Inches(2.2))
            tf = tb.text_frame
            tf.word_wrap = True
            p1 = tf.paragraphs[0]
            p1.text = item.get("title", "")
            p1.font.name = FONT_FAMILY
            p1.font.size = Pt(38)
            p1.font.bold = True
            p1.font.color.rgb = TEXT_WHITE
            p1.space_after = Pt(10)

            if item.get("subtitle"):
                p2 = tf.add_paragraph()
                p2.text = item.get("subtitle", "")
                p2.font.name = FONT_FAMILY
                p2.font.size = Pt(19)
                p2.font.bold = True
                p2.font.color.rgb = IPST_CYAN

            # Optional Cover / Closing Highlight Box
            highlights = item.get("highlights", [])
            if highlights:
                h_card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.0), Inches(4.85), Inches(11.33), Inches(2.05))
                set_flat_shape(h_card, IPST_DEEP if not is_closing else IPST_NAVY, IPST_CYAN, 1.5)

                h_tb = slide.shapes.add_textbox(Inches(1.35), Inches(5.02), Inches(10.6), Inches(1.75))
                h_tf = h_tb.text_frame
                h_tf.word_wrap = True
                h_tf.margin_left = h_tf.margin_top = h_tf.margin_right = h_tf.margin_bottom = 0

                hp0 = h_tf.paragraphs[0]
                hp0.text = item.get("highlights_title", "สาระสำคัญของการนำเสนอ (Key Briefing Overview):")
                hp0.font.name = FONT_FAMILY
                hp0.font.size = Pt(14.5)
                hp0.font.bold = True
                hp0.font.color.rgb = IPST_GOLD
                hp0.space_after = Pt(6)

                for b_prefix, b_text in highlights:
                    add_bold_lead_bullet(
                        h_tf,
                        b_prefix,
                        b_text,
                        font_size=14,
                        prefix_color=IPST_CYAN,
                        text_color=TEXT_WHITE,
                        space_after=5,
                    )
        else:
            bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
            set_flat_shape(bg, BG_LIGHT, None)

            create_ipst_header(slide, item.get("section", "สสวท. Academic Presentation"), idx + 1, total_slides, logo_path)

            tb = slide.shapes.add_textbox(Inches(0.8), Inches(0.85), Inches(11.73), Inches(1.15))
            tf = tb.text_frame
            tf.word_wrap = True
            tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0

            p1 = tf.paragraphs[0]
            p1.text = item.get("title", "")
            p1.font.name = FONT_FAMILY
            p1.font.size = Pt(28)
            p1.font.bold = True
            p1.font.color.rgb = IPST_NAVY
            p1.space_after = Pt(4)

            p2 = tf.add_paragraph()
            p2.text = item.get("subtitle", "")
            p2.font.name = FONT_FAMILY
            p2.font.size = Pt(15.5)
            p2.font.color.rgb = IPST_CYAN

            # Layout Type A: 2, 3, or 4 Column Cards
            cards = item.get("cards", [])
            if cards:
                n_cols = len(cards)
                gap_val = 0.35 if n_cols <= 3 else 0.28
                gap = Inches(gap_val)
                card_w = Inches((11.733 - gap_val * (n_cols - 1)) / n_cols)
                card_h = Inches(4.8)
                card_y = Inches(2.15)

                for c_idx, card_data in enumerate(cards):
                    accent_rgb = resolve_accent(card_data.get("accent", "navy"))
                    card_x = Inches(0.8) + c_idx * (card_w + gap)

                    c_shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, card_x, card_y, card_w, card_h)
                    set_flat_shape(c_shape, CARD_BG, CARD_BORDER, 1)

                    # Top Colored Accent Strip on Card
                    top_strip = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, card_x, card_y, card_w, Inches(0.10))
                    set_flat_shape(top_strip, accent_rgb, None)

                    pad_x = Inches(0.32 if n_cols <= 3 else 0.24)
                    c_tb = slide.shapes.add_textbox(card_x + pad_x, card_y + Inches(0.26), card_w - (pad_x * 2), card_h - Inches(0.45))
                    c_tf = c_tb.text_frame
                    c_tf.word_wrap = True
                    c_tf.margin_left = c_tf.margin_top = c_tf.margin_right = c_tf.margin_bottom = 0

                    cp_title = c_tf.paragraphs[0]
                    cp_title.text = card_data.get("heading", "")
                    cp_title.font.name = FONT_FAMILY
                    cp_title.font.size = Pt(17 if n_cols <= 3 else 16)
                    cp_title.font.bold = True
                    cp_title.font.color.rgb = accent_rgb
                    cp_title.space_after = Pt(2 if card_data.get("sub") else 10)

                    if card_data.get("sub"):
                        cp_sub = c_tf.add_paragraph()
                        cp_sub.text = card_data["sub"]
                        cp_sub.font.name = FONT_FAMILY
                        cp_sub.font.size = Pt(12)
                        cp_sub.font.italic = True
                        cp_sub.font.color.rgb = TEXT_SUB
                        cp_sub.space_after = Pt(10)

                    body_pt = 14 if n_cols <= 3 else 13.5
                    for b_prefix, b_text in card_data.get("bullets", []):
                        add_bold_lead_bullet(
                            c_tf,
                            b_prefix,
                            b_text,
                            font_size=body_pt,
                            prefix_color=accent_rgb,
                            text_color=TEXT_DARK,
                            space_after=8,
                        )

            # Layout Type B: 2 Rows x 3 Columns (6-Step Grid)
            grid_6 = item.get("grid_6", [])
            if grid_6:
                g_w = Inches(3.68)
                g_h = Inches(2.25)
                gap_x = Inches(0.34)
                gap_y = Inches(0.28)
                start_y = Inches(2.15)

                for g_idx, g_data in enumerate(grid_6[:6]):
                    row = g_idx // 3
                    col = g_idx % 3
                    gx = Inches(0.8) + col * (g_w + gap_x)
                    gy = start_y + row * (g_h + gap_y)
                    accent_rgb = resolve_accent(g_data.get("accent", "navy"))

                    g_shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, gx, gy, g_w, g_h)
                    set_flat_shape(g_shape, CARD_BG, CARD_BORDER, 1)

                    top_strip = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, gx, gy, g_w, Inches(0.08))
                    set_flat_shape(top_strip, accent_rgb, None)

                    g_tb = slide.shapes.add_textbox(gx + Inches(0.3), gy + Inches(0.2), g_w - Inches(0.6), g_h - Inches(0.35))
                    g_tf = g_tb.text_frame
                    g_tf.word_wrap = True
                    g_tf.margin_left = g_tf.margin_top = g_tf.margin_right = g_tf.margin_bottom = 0

                    gp_title = g_tf.paragraphs[0]
                    gp_title.text = g_data.get("heading", "")
                    gp_title.font.name = FONT_FAMILY
                    gp_title.font.size = Pt(16)
                    gp_title.font.bold = True
                    gp_title.font.color.rgb = accent_rgb
                    gp_title.space_after = Pt(6)

                    for b_prefix, b_text in g_data.get("bullets", []):
                        add_bold_lead_bullet(
                            g_tf,
                            b_prefix,
                            b_text,
                            font_size=13.5,
                            prefix_color=IPST_NAVY,
                            text_color=TEXT_DARK,
                            space_after=5,
                        )

        if "notes" in item:
            notes_slide = slide.notes_slide
            tf = notes_slide.notes_text_frame
            tf.text = f"[เวลาบรรยายโดยประมาณ]: {item.get('duration', '2 นาที')}\n\n[Speaker Notes / บทพูดวิทยากร]:\n{item['notes']}"

    prs.save(output_path)
    return output_path


def build_introduce_ipst_15min_deck(output_path="IPST_15Min_Official_Introduction.pptx"):
    slides_data = [
        # Slide 1: Cover (1.5 mins)
        {
            "is_cover": True,
            "kicker": "สถาบันส่งเสริมการสอนวิทยาศาสตร์และเทคโนโลยี (สสวท.) | กระทรวงศึกษาธิการ",
            "kicker_en": "The Institute for the Promotion of Teaching Science and Technology (IPST)",
            "title": "รู้จัก สสวท.: องค์กรหลักขับเคลื่อนการศึกษา\nวิทยาศาสตร์ คณิตศาสตร์ และเทคโนโลยีของประเทศไทย",
            "subtitle": "ยกระดับสมรรถนะเยาวชนไทย สร้างฐานกำลังคนด้านวิทยาศาสตร์และนวัตกรรมสู่อนาคต (บรรยาย 15 นาที)",
            "highlights_title": "โครงสร้างการนำเสนอ 15 นาที (Executive Briefing Agenda):",
            "highlights": [
                ("• ช่วงที่ 1 (นาทีที่ 0–5):", "ประวัติการก่อตั้ง วิสัยทัศน์ พันธกิจ และ 4 เสาหลักภารกิจระดับชาติของ สสวท."),
                ("• ช่วงที่ 2 (นาทีที่ 5–11):", "การพัฒนาหลักสูตร สื่อดิจิทัล โครงการพัฒนาอัจฉริยภาพ (พสวท.) และโอลิมปิกวิชาการ"),
                ("• ช่วงที่ 3 (นาทีที่ 11–15):", "การวิจัยประเมินผลระดับนานาชาติ (PISA/TIMSS) และทิศทางก้าวต่อไปในยุค AI"),
            ],
            "duration": "1.5 นาที",
            "notes": (
                "สวัสดีทุกท่านครับ/ค่ะ วันนี้เราจะพาท่านทำความรู้จักกับ สถาบันส่งเสริมการสอนวิทยาศาสตร์และเทคโนโลยี หรือ สสวท. (IPST) "
                "ภายในเวลา 15 นาที โดยครอบคลุมตั้งแต่บทบาทพันธกิจหลัก การพัฒนาหลักสูตรและครู การสร้างนักวิทยาศาสตร์รุ่นใหม่ "
                "ไปจนถึงการขับเคลื่อนการศึกษาไทยในยุคปัญญาประดิษฐ์ (AI)"
            ),
        },
        # Slide 2: Vision, Mission & Identity (2 mins)
        {
            "section": "ส่วนที่ 1: รู้จักองค์กร | วิสัยทัศน์ พันธกิจ และจุดยืนเชิงยุทธศาสตร์",
            "title": "กว่า 5 ทศวรรษแห่งการวางรากฐานวิทยาศาสตร์และเทคโนโลยีไทย",
            "subtitle": "หน่วยงานในกำกับของกระทรวงศึกษาธิการ จัดตั้งขึ้นตั้งแต่ พ.ศ. 2515 เพื่อปฏิรูปการเรียนรู้ SMT ของประเทศ",
            "cards": [
                {
                    "heading": "1. วิสัยทัศน์องค์กร (Vision)",
                    "sub": "National Leadership in SMT Education",
                    "accent": "navy",
                    "bullets": [
                        ("• องค์กรหลักระดับชาติ:", "เป็นผู้นำในการยกระดับคุณภาพการเรียนรู้วิทยาศาสตร์ คณิตศาสตร์ และเทคโนโลยีสู่มาตรฐานสากล"),
                        ("• พลเมืองยุคดิจิทัล:", "มุ่งสร้างเยาวชนไทยให้คิดเป็นระบบ แก้ปัญหาด้วยเหตุผล และพร้อมสร้างสรรค์นวัตกรรม"),
                        ("• ขับเคลื่อนเศรษฐกิจฐานความรู้:", "สร้างรากฐานกำลังคนคุณภาพสูงเพื่อเพิ่มขีดความสามารถในการแข่งขันของประเทศ"),
                    ],
                },
                {
                    "heading": "2. พันธกิจสำคัญ (Core Mandates)",
                    "sub": "Statutory Responsibilities",
                    "accent": "cyan",
                    "bullets": [
                        ("• วิจัยและพัฒนาหลักสูตร:", "กำหนดมาตรฐานการเรียนรู้ หนังสือเรียน และสื่อการสอนตั้งแต่ระดับปฐมวัยถึงมัธยมศึกษาตอนปลาย"),
                        ("• ยกระดับวิชาชีพครู:", "พัฒนาสมรรถนะครูและบุคลากรทางการศึกษาทั่วประเทศให้จัดการเรียนรู้เชิงรุกได้จริง"),
                        ("• บ่มเพาะผู้มีความสามารถพิเศษ:", "บริหารทุน พสวท. และคัดเลือกผู้แทนประเทศไทยเข้าแข่งขันโอลิมปิกวิชาการนานาชาติ"),
                    ],
                },
                {
                    "heading": "3. ค่านิยมและวัฒนธรรม (Core Values)",
                    "sub": "Agile, Evidence-Based & Collaborative",
                    "accent": "orange",
                    "bullets": [
                        ("• ยึดหลักฐานเชิงประจักษ์:", "ขับเคลื่อนนโยบายและปรับปรุงสื่อการเรียนรู้จากข้อมูลวิจัยและผลประเมินระดับชาติ/นานาชาติ"),
                        ("• เปิดกว้างสร้างเครือข่าย:", "ทำงานร่วมกับมหาวิทยาลัย โรงเรียน และองค์กรชั้นนำทั้งในและต่างประเทศ"),
                        ("• ทันต่อการเปลี่ยนแปลง:", "ก้าวทันคลื่นเทคโนโลยีอุบัติใหม่ เช่น AI, Data Science และความยั่งยืน"),
                    ],
                },
            ],
            "duration": "2 นาที",
            "notes": (
                "สสวท. ก่อตั้งขึ้นเมื่อปี พ.ศ. 2515 ในฐานะรัฐวิสาหกิจ/หน่วยงานในกำกับของกระทรวงศึกษาธิการ "
                "หัวใจสำคัญของ สสวท. คือการเป็นต้นน้ำทางวิชาการ ตั้งแต่การเขียนมาตรฐานหลักสูตร หนังสือเรียน "
                "ไปจนถึงการพัฒนาครูและการดูแลเด็กผู้มีความสามารถพิเศษด้านวิทย์-คณิต"
            ),
        },
        # Slide 3: 4 Core Pillars (2 mins)
        {
            "section": "ส่วนที่ 1: รู้จักองค์กร | 4 เสาหลักภารกิจระดับประเทศ",
            "title": "4 ภารกิจหลักในการขับเคลื่อนระบบนิเวศการศึกษา SMT",
            "subtitle": "เชื่อมโยงตั้งแต่ต้นน้ำ (หลักสูตรและสื่อ) กลางน้ำ (ครูและชั้นเรียน) สู่ปลายน้ำ (สมรรถนะผู้เรียนและการวิจัย)",
            "cards": [
                {
                    "heading": "เสาหลักที่ 1: หลักสูตรและสื่อ",
                    "sub": "Curriculum & Learning Media",
                    "accent": "navy",
                    "bullets": [
                        ("• มาตรฐานหลักสูตรแกนกลาง:", "พัฒนาตัวชี้วัดและสาระการเรียนรู้วิทย์ คณิต และเทคโนโลยี"),
                        ("• หนังสือเรียนและคู่มือครู:", "ผลิตสื่อมาตรฐานและแพลตฟอร์มการเรียนรู้ดิจิทัลสำหรับทุกช่วงชั้น"),
                    ],
                },
                {
                    "heading": "เสาหลักที่ 2: พัฒนาครูและผู้นำ",
                    "sub": "Teacher Professional Development",
                    "accent": "cyan",
                    "bullets": [
                        ("• อบรมครูแกนนำทั่วประเทศ:", "ยกระดับทักษะการจัดการเรียนรู้เชิงรุกและการสืบเสาะหาความรู้"),
                        ("• เครือข่ายวิชาการและ PLC:", "สร้างชุมชนการเรียนรู้ทางวิชาชีพร่วมกับศูนย์พี่เลี้ยงและมหาวิทยาลัย"),
                    ],
                },
                {
                    "heading": "เสาหลักที่ 3: อัจฉริยภาพและทุน",
                    "sub": "Gifted & Talented Development",
                    "accent": "green",
                    "bullets": [
                        ("• โครงการ พสวท. (DPST):", "สร้างนักวิจัยและนักวิทยาศาสตร์ระดับแนวหน้าเพื่อพัฒนาประเทศ"),
                        ("• โอลิมปิกวิชาการระดับโลก:", "คัดเลือกและอบรมผู้แทนไทยเข้าแข่งขันเวทีนานาชาติ 5 สาขาวิชา"),
                    ],
                },
                {
                    "heading": "เสาหลักที่ 4: วิจัยและประเมินสากล",
                    "sub": "Research & Global Assessment",
                    "accent": "orange",
                    "bullets": [
                        ("• ศูนย์แห่งชาติ PISA & TIMSS:", "ดำเนินการประเมินสมรรถนะนักเรียนร่วมกับ OECD และ IEA"),
                        ("• ข้อเสนอแนะเชิงนโยบาย:", "วิเคราะห์ข้อมูลเชิงลึกเพื่อชี้เป้าการลดความเหลื่อมล้ำทางการศึกษา"),
                    ],
                },
            ],
            "duration": "2 นาที",
            "notes": (
                "เพื่อให้เห็นภาพรวมอย่างชัดเจน งานของ สสวท. แบ่งออกเป็น 4 เสาหลักที่หนุนเสริมกัน "
                "คือ 1) การทำหลักสูตรและสื่อ 2) การพัฒนาครู 3) การดูแลผู้มีความสามารถพิเศษและโอลิมปิกวิชาการ "
                "และ 4) การเป็นศูนย์วิจัยและประเมินผลนานาชาติอย่าง PISA และ TIMSS"
            ),
        },
        # Slide 4: Curriculum, Digital Platforms & STEM/AI (2 mins)
        {
            "section": "ส่วนที่ 2: นวัตกรรมการเรียนรู้ | หลักสูตร สื่อดิจิทัล และเทคโนโลยีสมัยใหม่",
            "title": "การพัฒนาหลักสูตรฐานสมรรถนะและสื่อดิจิทัลยุคใหม่",
            "subtitle": "มุ่งเน้นการเรียนรู้ผ่านการสืบเสาะ (Inquiry) การแก้ปัญหาเชิงบูรณาการ (STEM) และวิทยาการคำนวณ",
            "cards": [
                {
                    "heading": "1. หลักสูตรและหนังสือเรียนมาตรฐาน",
                    "sub": "Competency-Based SMT Curriculum",
                    "accent": "navy",
                    "bullets": [
                        ("• เน้นกระบวนการคิดวิเคราะห์:", "ลดการท่องจำ มุ่งเน้นการสร้างคำอธิบายทางวิทยาศาสตร์จากหลักฐานจริง"),
                        ("• วิทยาการคำนวณ (Computing Science):", "ปูพื้นฐานการคิดเชิงคำนวณ การเขียนโปรแกรม และการรู้เท่าทันดิจิทัลตั้งแต่ระดับประถมศึกษา"),
                        ("• การออกแบบและเทคโนโลยี:", "ฝึกกระบวนการคิดเชิงออกแบบ (Design Thinking) เพื่อแก้ปัญหาในชีวิตจริง"),
                    ],
                },
                {
                    "heading": "2. แพลตฟอร์มการเรียนรู้ดิจิทัล",
                    "sub": "Project 14 & Interactive Simulations",
                    "accent": "cyan",
                    "bullets": [
                        ("• โครงการ Project 14:", "คลังวิดีโอการสอนออนไลน์ฟรีครอบคลุมเนื้อหาตามหลักสูตร ช่วยลดความเหลื่อมล้ำในการเข้าถึงความรู้"),
                        ("• ห้องปฏิบัติการเสมือนและเกม:", "พัฒนาสื่อ Interactive Simulation, AR/3D และเกมการศึกษาที่ช่วยให้เข้าใจแนวคิดนามธรรมได้ง่ายขึ้น"),
                        ("• คลังความรู้ SciMath:", "แหล่งรวมบทความวิชาการ แผนการจัดการเรียนรู้ และสื่อเสริมสำหรับครูและนักเรียน"),
                    ],
                },
                {
                    "heading": "3. สะเต็มศึกษาและ AI Literacy",
                    "sub": "STEM Education & Future Skills",
                    "accent": "green",
                    "bullets": [
                        ("• บูรณาการข้ามศาสตร์ (STEM):", "เชื่อมโยงวิทยาศาสตร์ คณิตศาสตร์ และเทคโนโลยีเข้ากับบริบทอาชีพและสิ่งแวดล้อมท้องถิ่น"),
                        ("• ความฉลาดรู้ด้าน AI (AI Literacy):", "พัฒนาแนวทางการใช้ AI เพื่อการเรียนรู้และสร้างภูมิคุ้มกันการคิดวิพากษ์อย่างมีจริยธรรม"),
                        ("• นิตยสารและสื่อเผยแพร่ สสวท.:", "เผยแพร่บทความวิจัยและนวัตกรรมการสอนสู่สาธารณะอย่างต่อเนื่อง"),
                    ],
                },
            ],
            "duration": "2 นาที",
            "notes": (
                "ในด้านหลักสูตรและสื่อ สสวท. เป็นผู้ริเริ่มการนำวิชาวิทยาการคำนวณ (Computing Science) และการออกแบบและเทคโนโลยี "
                "เข้ามาในหลักสูตรแกนกลาง พร้อมทั้งพัฒนาแพลตฟอร์มดิจิทัลอย่าง Project 14 และคลังความรู้ SciMath "
                "รวมถึงการผลักดันกรอบสมรรถนะ AI Literacy สำหรับครูและนักเรียนไทย"
            ),
        },
        # Slide 5: 6-Step Classroom Quality Ecosystem (2 mins)
        {
            "section": "ส่วนที่ 2: นวัตกรรมการเรียนรู้ | วงจรขับเคลื่อนคุณภาพสู่ห้องเรียน",
            "title": "วงจร 6 มิติการยกระดับคุณภาพการจัดการเรียนรู้ของ สสวท.",
            "subtitle": "การทำงานเชิงระบบครบวงจรตั้งแต่การออกแบบมาตรฐานจนถึงการวิจัยติดตามผลในชั้นเรียนจริง",
            "grid_6": [
                {
                    "heading": "ขั้นที่ 1: มาตรฐานและหลักสูตร",
                    "accent": "navy",
                    "bullets": [
                        ("• กำหนดกรอบสมรรถนะ:", "วิเคราะห์แนวโน้มโลกเพื่อออกแบบตัวชี้วัดที่ทันสมัย"),
                        ("• เชื่อมโยงทุกช่วงชั้น:", "วางลำดับพัฒนาการเรียนรู้ตั้งแต่ปฐมวัยถึงมัธยมปลาย"),
                    ],
                },
                {
                    "heading": "ขั้นที่ 2: สื่อและชุดกิจกรรมการทดลอง",
                    "accent": "cyan",
                    "bullets": [
                        ("• สื่อสิ่งพิมพ์และดิจิทัล:", "หนังสือเรียน คู่มือครู และซอฟต์แวร์จำลองเชิงโต้ตอบ"),
                        ("• อุปกรณ์ปฏิบัติการ:", "ออกแบบชุดทดลองที่ปลอดภัยและประยุกต์ใช้วัสดุท้องถิ่นได้"),
                    ],
                },
                {
                    "heading": "ขั้นที่ 3: การอบรมและพัฒนาครู",
                    "accent": "green",
                    "bullets": [
                        ("• หลักสูตรอบรมเชิงปฏิบัติการ:", "เน้นให้ครูได้ลงมือทดลองและออกแบบกิจกรรมการเรียนรู้จริง"),
                        ("• ระบบอบรมออนไลน์:", "ขยายผลสู่ครูทั่วประเทศผ่านระบบ Teacher PD ออนไลน์"),
                    ],
                },
                {
                    "heading": "ขั้นที่ 4: ชุมชนวิชาชีพและศูนย์พี่เลี้ยง",
                    "accent": "orange",
                    "bullets": [
                        ("• เครือข่ายครูแกนนำ:", "สร้างวิทยากรแกนนำและโรงเรียนศูนย์ขยายผลในทุกภูมิภาค"),
                        ("• การนิเทศและโค้ชชิ่ง:", "ส่งเสริมการเปิดชั้นเรียน (Lesson Study) และ PLC"),
                    ],
                },
                {
                    "heading": "ขั้นที่ 5: การวัดและประเมินเพื่อพัฒนา",
                    "accent": "gold",
                    "bullets": [
                        ("• เน้น Formative Assessment:", "วินิจฉัยความเข้าใจคลาดเคลื่อนของผู้เรียนระหว่างเรียน"),
                        ("• ข้อสอบวัดสมรรถนะขั้นสูง:", "พัฒนาเครื่องมือวัดการคิดวิเคราะห์และการแก้ปัญหา"),
                    ],
                },
                {
                    "heading": "ขั้นที่ 6: วิจัยและสะท้อนผลเชิงนโยบาย",
                    "accent": "navy",
                    "bullets": [
                        ("• วิจัยชั้นเรียนและระบบ:", "ศึกษาผลการใช้หลักสูตรเพื่อนำกลับมาปรับปรุงรอบใหม่"),
                        ("• เทียบเคียงมาตรฐานสากล:", "เชื่อมโยงผลวิจัยสู่ข้อเสนอแนะระดับกระทรวงและประเทศ"),
                    ],
                },
            ],
            "duration": "2 นาที",
            "notes": (
                "สไลด์นี้แสดงให้เห็นว่า สสวท. ไม่ได้ทำเพียงส่วนใดส่วนหนึ่ง แต่ทำงานเป็นวงจร 6 ขั้นตอนที่ครบสมบูรณ์ "
                "ตั้งแต่การวางหลักสูตร สร้างสื่อ อบรมครู สร้างเครือข่าย PLC พัฒนาเครื่องมือวัดผล และทำวิจัยเพื่อนำกลับมาปรับปรุงหลักสูตรในรอบถัดไป"
            ),
        },
        # Slide 6: Gifted Education (DPST) & International Science Olympiads (2 mins)
        {
            "section": "ส่วนที่ 3: การสร้างกำลังคนคุณภาพสูง | พสวท. และโอลิมปิกวิชาการ",
            "title": "การบ่มเพาะผู้มีความสามารถพิเศษและตัวแทนประเทศไทยระดับโลก",
            "subtitle": "สร้างนักวิจัยชั้นนำและสร้างชื่อเสียงให้ประเทศไทยในเวทีการแข่งขันโอลิมปิกวิชาการนานาชาติ",
            "cards": [
                {
                    "heading": "1. โครงการ พสวท. (DPST Scholarship Program)",
                    "sub": "Development and Promotion of Science and Technology Talents",
                    "accent": "navy",
                    "bullets": [
                        ("• ทุนการศึกษาต่อเนื่องครบวงจร:", "คัดเลือกเยาวชนผู้มีศักยภาพสูงตั้งแต่ระดับมัธยมศึกษาตอนปลาย ถึงระดับปริญญาเอกทั้งในและต่างประเทศ"),
                        ("• ค่ายบ่มเพาะทักษะวิจัยเข้มข้น:", "ฝึกฝนการทำงานวิจัยร่วมกับนักวิทยาศาสตร์ชั้นนำ ปลูกฝังจริยธรรมวิชาการและจิตวิญญาณนักวิจัย"),
                        ("• กำลังคนหลักของประเทศ:", "บัณฑิต พสวท. กว่าหลายพันคนปฏิบัติงานเป็นอาจารย์มหาวิทยาลัย นักวิจัยแห่งชาติ และผู้นำนวัตกรรมทั่วประเทศ"),
                    ],
                },
                {
                    "heading": "2. โครงการโอลิมปิกวิชาการนานาชาติ (International Olympiads)",
                    "sub": "IMO, IPhO, IChO, IBO, IOI — Thailand National Representatives",
                    "accent": "gold",
                    "bullets": [
                        ("• คัดเลือกและอบรมเข้มข้น 5 สาขา:", "คณิตศาสตร์ (IMO), ฟิสิกส์ (IPhO), เคมี (IChO), ชีววิทยา (IBO) และคอมพิวเตอร์ (IOI) ร่วมกับ สอวน."),
                        ("• ผลงานระดับแนวหน้าของโลก:", "ผู้แทนประเทศไทยคว้าเหรียญรางวัลระดับโลกอย่างต่อเนื่อง สร้างแรงบันดาลใจให้เยาวชนรุ่นใหม่"),
                        ("• ยกระดับมาตรฐานวิชาการในประเทศ:", "องค์ความรู้และโจทย์ระดับโอลิมปิกถูกนำมาต่อยอดเป็นค่ายวิชาการและสื่อเสริมศักยภาพแก่โรงเรียนทั่วไทย"),
                    ],
                },
            ],
            "duration": "2 นาที",
            "notes": (
                "อีกหนึ่งภารกิจที่ประชาชนรู้จัก สสวท. เป็นอย่างดี คือการดูแลผู้มีความสามารถพิเศษผ่านโครงการ พสวท. "
                "ซึ่งสร้างนักวิทยาศาสตร์และนักวิจัยระดับปริญญาเอกกลับมาพัฒนาประเทศจำนวนมาก "
                "รวมถึงการคัดเลือกและจัดส่งผู้แทนประเทศไทยไปแข่งขันโอลิมปิกวิชาการนานาชาติทั้ง 5 สาขา"
            ),
        },
        # Slide 7: International Assessment (PISA/TIMSS) & Future Direction (2 mins)
        {
            "section": "ส่วนที่ 4: มาตรฐานสากลและอนาคต | PISA, TIMSS และก้าวต่อไปของ สสวท.",
            "title": "การประเมินระดับนานาชาติและทิศทางสู่อนาคตยุค AI",
            "subtitle": "ใช้ข้อมูลเชิงประจักษ์ระดับสากลขับเคลื่อนการลดความเหลื่อมล้ำและยกระดับสมรรถนะผู้เรียนไทย",
            "cards": [
                {
                    "heading": "1. ศูนย์แห่งชาติ PISA และ TIMSS",
                    "sub": "Global Benchmarking (OECD & IEA)",
                    "accent": "navy",
                    "bullets": [
                        ("• ประเมินสมรรถนะความฉลาดรู้:", "วิเคราะห์ความสามารถในการนำความรู้วิทย์-คณิต-การอ่านไปแก้ปัญหาในชีวิตจริง"),
                        ("• พัฒนาเครื่องมือสอบคอมพิวเตอร์:", "ส่งเสริมการฝึกทักษะการทำข้อสอบบนระบบดิจิทัล (Computer-Based Assessment)"),
                    ],
                },
                {
                    "heading": "2. เครือข่ายความร่วมมือระดับประเทศ",
                    "sub": "Nationwide Partnership Ecosystem",
                    "accent": "cyan",
                    "bullets": [
                        ("• ผนึกกำลังทุกสังกัด:", "ทำงานร่วมกับ สพฐ. อว. มหาวิทยาลัยราชภัฏ และโรงเรียนทุกสังกัดทั่วประเทศ"),
                        ("• ลดช่องว่างทางการศึกษา:", "สนับสนุนสื่อและชุดกิจกรรมการเรียนรู้แก่โรงเรียนในพื้นที่ห่างไกล"),
                    ],
                },
                {
                    "heading": "3. ก้าวต่อไป: การศึกษาไทยในยุค AI",
                    "sub": "Future-Ready SMT Education",
                    "accent": "orange",
                    "bullets": [
                        ("• AI & Personalized Learning:", "ประยุกต์ใช้ปัญญาประดิษฐ์ช่วยวินิจฉัยและแนะนำการเรียนรู้รายบุคคล"),
                        ("• สมรรถนะเพื่อความยั่งยืน:", "เตรียมเยาวชนรับมือการเปลี่ยนแปลงสภาพภูมิอากาศและโจทย์โลกยุคใหม่"),
                    ],
                },
            ],
            "duration": "2 นาที",
            "notes": (
                "ในมิติสากล สสวท. ทำหน้าที่เป็นศูนย์แห่งชาติในการประเมิน PISA และ TIMSS "
                "ซึ่งช่วยให้ประเทศไทยมีข้อมูลเปรียบเทียบระดับนานาชาติ และในก้าวต่อไป สสวท. กำลังมุ่งเน้นการใช้ AI "
                "เพื่อสนับสนุนการเรียนรู้รายบุคคล (Personalized Learning) และการสร้างสมรรถนะเพื่อความยั่งยืน"
            ),
        },
        # Slide 8: Closing & Q&A (1.5 mins)
        {
            "is_closing": True,
            "kicker": "สถาบันส่งเสริมการสอนวิทยาศาสตร์และเทคโนโลยี (สสวท.)",
            "kicker_en": "924 ถนนสุขุมวิท แขวงพระโขนง เขตคลองเตย กรุงเทพมหานคร 10110 | www.ipst.ac.th",
            "title": "ร่วมขับเคลื่อนอนาคตการศึกษาไทย\nด้วยวิทยาศาสตร์ คณิตศาสตร์ และเทคโนโลยี",
            "subtitle": "ขอขอบคุณทุกท่าน | เปิดเวทีซักถามและแลกเปลี่ยนความคิดเห็น (Q&A Session)",
            "highlights_title": "ช่องทางติดต่อและแหล่งเรียนรู้หลักของ สสวท. (Official Channels):",
            "highlights": [
                ("• เว็บไซต์หลัก สสวท.:", "https://www.ipst.ac.th — ข่าวสาร ประกาศทุน พสวท. และโครงการอบรมครูทั่วประเทศ"),
                ("• แพลตฟอร์มการเรียนรู้ดิจิทัล:", "Project 14 (proj14.ipst.ac.th) และคลังความรู้ SciMath (scimath.org)"),
                ("• นิตยสารและสื่อวิชาการ สสวท.:", "https://emagazine.ipst.ac.th — บทความวิชาการและนวัตกรรมการจัดการเรียนรู้"),
            ],
            "duration": "1.5 นาที",
            "notes": (
                "ทั้งหมดนี้คือภาพรวมภารกิจของ สสวท. ในการวางรากฐานและขับเคลื่อนการศึกษาวิทยาศาสตร์ คณิตศาสตร์ และเทคโนโลยีของประเทศไทย "
                "ทุกท่านสามารถติดตามสื่อดิจิทัล หลักสูตรอบรม และคลังความรู้ได้ที่ www.ipst.ac.th, Project 14 และ SciMath "
                "ขอขอบคุณทุกท่านและยินดีรับฟังคำถามหรือข้อแลกเปลี่ยนครับ/ค่ะ"
            ),
        },
    ]
    return create_ipst_deck(slides_data, output_path)


if __name__ == "__main__":
    out = build_introduce_ipst_15min_deck("IPST_15Min_Official_Introduction.pptx")
    print(f"Saved 15-minute IPST introduction deck to: {os.path.abspath(out)}")
