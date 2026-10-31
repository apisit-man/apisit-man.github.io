"""
Modular Slide Builder implementing the Modern Academic & Framework Slide Theme
Inspired by "slid theme.pptx" (AI Literacy / IPST Competency Framework)
Widescreen 16:9 (13.333" x 7.5"), Geometric Sans Typography, Multi-color Cards
"""

import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

# -------------------------------------------------------------
# PALETTE DEFINITION (Modern Academic Palette)
# -------------------------------------------------------------
COLOR_NAVY = RGBColor(22, 33, 62)          # #16213E Primary Deep Midnight
COLOR_NAVY_DARK = RGBColor(11, 19, 43)     # #0B132B Cover Dark Base
COLOR_COBALT = RGBColor(22, 64, 201)       # #1640C9 Electric Royal / Kicker
COLOR_SKY = RGBColor(46, 107, 255)         # #2E6BFF Vibrant Royal Blue
COLOR_SKY_LIGHT = RGBColor(159, 192, 255)  # #9FC0FF Subtitle on Dark
COLOR_AMBER = RGBColor(245, 166, 35)       # #F5A623 Accent Star / Gold
COLOR_AMBER_DARK = RGBColor(224, 133, 15)  # #E0850F Ochre divider
COLOR_TEAL = RGBColor(23, 122, 111)        # #177A6F Science Teal
COLOR_PURPLE = RGBColor(91, 63, 133)       # #5B3F85 Strategic Violet

# Surfaces & Borders
CARD_COOL_BG = RGBColor(246, 248, 252)     # #F6F8FC Soft cool card
CARD_COOL_BORDER = RGBColor(225, 232, 247) # #E1E8F7
CARD_WARM_BG = RGBColor(248, 227, 196)     # #F8E3C4 Soft warm amber card
CARD_WARM_BORDER = RGBColor(240, 221, 176) # #F0DDB0
CARD_WHITE = RGBColor(255, 255, 255)

# Text & Muted
TEXT_PRIMARY = RGBColor(22, 33, 62)        # #16213E
TEXT_MUTED = RGBColor(92, 107, 138)        # #5C6B8A
TEXT_WHITE = RGBColor(255, 255, 255)

FONT_FAMILY = "Google Sans" # System fallback: IBM Plex Sans Thai or Leelawadee UI

def create_presentation():
    """สร้าง Presentation ขนาด 16:9 มาตรฐาน"""
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    return prs

def set_flat_style(shape, fill_rgb=None, line_rgb=None, line_width_pt=1):
    """กำหนดสีพื้นและเส้นขอบแบบเรียบแบนตามมาตรฐาน UI สมัยใหม่"""
    if fill_rgb:
        shape.fill.solid()
        shape.fill.fore_color.rgb = fill_rgb
    else:
        shape.fill.background()
        
    if line_rgb:
        shape.line.color.rgb = line_rgb
        shape.line.width = Pt(line_width_pt)
    else:
        shape.line.fill.background()

def add_standard_header(slide, kicker, title, subtitle=None, logo_path=None):
    """ใส่ Header มาตรฐานของธีม: Kicker, Title, Subtitle, Status, Logo"""
    # 1. Kicker (ป้ายหมวดหมู่บนซ้าย)
    kb = slide.shapes.add_textbox(Inches(0.60), Inches(0.42), Inches(10.0), Inches(0.32))
    tf_k = kb.text_frame
    tf_k.margin_left = tf_k.margin_top = tf_k.margin_right = tf_k.margin_bottom = 0
    p_k = tf_k.paragraphs[0]
    p_k.text = kicker
    p_k.font.name = FONT_FAMILY
    p_k.font.size = Pt(11.5)
    p_k.font.bold = True
    p_k.font.color.rgb = COLOR_COBALT
    
    # 2. Main Title (หัวข้อสไลด์)
    tb = slide.shapes.add_textbox(Inches(0.60), Inches(0.72), Inches(11.5), Inches(0.85))
    tf_t = tb.text_frame
    tf_t.margin_left = tf_t.margin_top = tf_t.margin_right = tf_t.margin_bottom = 0
    p_t = tf_t.paragraphs[0]
    p_t.text = title
    p_t.font.name = FONT_FAMILY
    p_t.font.size = Pt(30)
    p_t.font.bold = True
    p_t.font.color.rgb = COLOR_NAVY
    
    # 3. Subtitle (ถ้ามี)
    if subtitle:
        sb = slide.shapes.add_textbox(Inches(0.60), Inches(1.52), Inches(12.1), Inches(0.40))
        tf_s = sb.text_frame
        tf_s.margin_left = tf_s.margin_top = tf_s.margin_right = tf_s.margin_bottom = 0
        p_s = tf_s.paragraphs[0]
        p_s.text = subtitle
        p_s.font.name = FONT_FAMILY
        p_s.font.size = Pt(15)
        p_s.font.color.rgb = TEXT_MUTED

    # 4. Logo (ถ้ามี)
    if logo_path and os.path.exists(logo_path):
        slide.shapes.add_picture(logo_path, Inches(11.53), Inches(0.40), height=Inches(0.45))

    # 5. Footer Watermark & Status (ล่างซ้าย)
    fb = slide.shapes.add_textbox(Inches(0.60), Inches(7.05), Inches(6.0), Inches(0.30))
    tf_f = fb.text_frame
    tf_f.margin_left = tf_f.margin_top = tf_f.margin_right = tf_f.margin_bottom = 0
    p_f = tf_f.paragraphs[0]
    p_f.text = "เอกสารฉบับร่างเพื่อการพิจารณา"
    p_f.font.name = FONT_FAMILY
    p_f.font.size = Pt(9)
    p_f.font.color.rgb = TEXT_MUTED

    # 6. Slide Number (ล่างขวา)
    pb = slide.shapes.add_textbox(Inches(12.20), Inches(6.93), Inches(1.0), Inches(0.40))
    tf_p = pb.text_frame
    p_p = tf_p.paragraphs[0]
    p_p.text = "‹#›"
    p_p.alignment = PP_ALIGN.RIGHT
    p_p.font.name = FONT_FAMILY
    p_p.font.size = Pt(10)
    p_p.font.color.rgb = TEXT_MUTED

def add_cover_slide(prs, title, subtitle_en, bottom_status, logo_path=None):
    """สร้างหน้าปกโทนเข้มภูมิฐาน (Dark Navy Cover)"""
    blank = prs.slide_layouts[6]
    slide = prs.slides.add_slide(blank)
    
    # พื้นหลังเต็มจอ
    bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
    set_flat_style(bg, fill_rgb=COLOR_NAVY_DARK)
    
    # โลโก้
    if logo_path and os.path.exists(logo_path):
        slide.shapes.add_picture(logo_path, Inches(0.80), Inches(0.61), height=Inches(0.95))
        
    # หัวข้อภาษาไทย
    tb = slide.shapes.add_textbox(Inches(0.80), Inches(2.17), Inches(12.0), Inches(1.8))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = title
    p.font.name = FONT_FAMILY
    p.font.size = Pt(38)
    p.font.bold = True
    p.font.color.rgb = TEXT_WHITE
    
    # หัวข้อภาษาอังกฤษ / Subtitle
    sb = slide.shapes.add_textbox(Inches(0.80), Inches(4.68), Inches(11.0), Inches(0.6))
    tf_s = sb.text_frame
    p_s = tf_s.paragraphs[0]
    p_s.text = subtitle_en
    p_s.font.name = FONT_FAMILY
    p_s.font.size = Pt(21)
    p_s.font.color.rgb = COLOR_SKY_LIGHT
    
    # แถบกำกับล่างสุด
    bar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, Inches(6.40), Inches(13.333), Inches(0.65))
    set_flat_style(bar, fill_rgb=COLOR_NAVY)
    tf_b = bar.text_frame
    tf_b.vertical_anchor = MSO_ANCHOR.MIDDLE
    p_b = tf_b.paragraphs[0]
    p_b.text = bottom_status
    p_b.font.name = FONT_FAMILY
    p_b.font.size = Pt(16)
    p_b.font.color.rgb = TEXT_WHITE
    p_b.alignment = PP_ALIGN.CENTER
    return slide

def add_3card_highlight_slide(prs, kicker, title, subtitle, cards_data, is_warm=True, logo_path=None):
    """สร้างสไลด์ 3 การ์ดไฮไลต์พร้อมป้ายดาว ★ และเส้นคั่น (Slide 11 Archetype)"""
    blank = prs.slide_layouts[6]
    slide = prs.slides.add_slide(blank)
    add_standard_header(slide, kicker, title, subtitle, logo_path)
    
    lefts = [Inches(0.60), Inches(4.70), Inches(8.80)]
    w = Inches(3.90)
    h = Inches(4.52)
    top = Inches(2.30)
    
    card_bg = CARD_WARM_BG if is_warm else CARD_COOL_BG
    card_border = CARD_WARM_BORDER if is_warm else CARD_COOL_BORDER
    
    for i, c in enumerate(cards_data[:3]):
        cx = lefts[i]
        # การ์ด
        card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, cx, top, w, h)
        set_flat_style(card, fill_rgb=card_bg, line_rgb=card_border, line_width_pt=1)
        
        # วงกลมไอคอน
        circle = slide.shapes.add_shape(MSO_SHAPE.OVAL, cx + Inches(0.30), top + Inches(0.30), Inches(0.65), Inches(0.65))
        circle_color = COLOR_AMBER if is_warm else COLOR_SKY
        set_flat_style(circle, fill_rgb=circle_color)
        
        # ดาวขวาบน ★
        star = slide.shapes.add_textbox(cx + Inches(3.20), top + Inches(0.12), Inches(0.50), Inches(0.50))
        p_star = star.text_frame.paragraphs[0]
        p_star.text = "★"
        p_star.font.size = Pt(20)
        p_star.font.color.rgb = COLOR_AMBER
        
        # รหัสข้อ (Thai numeral เช่น ๑.๖)
        num_tb = slide.shapes.add_textbox(cx + Inches(0.30), top + Inches(1.10), Inches(1.50), Inches(0.35))
        p_num = num_tb.text_frame.paragraphs[0]
        p_num.text = c.get("code", f"๑.{i+1}")
        p_num.font.name = FONT_FAMILY
        p_num.font.size = Pt(19)
        p_num.font.bold = True
        p_num.font.color.rgb = COLOR_COBALT
        
        # หัวข้อการ์ด
        th_tb = slide.shapes.add_textbox(cx + Inches(0.30), top + Inches(1.45), Inches(3.30), Inches(0.95))
        th_tf = th_tb.text_frame
        th_tf.word_wrap = True
        p_th = th_tf.paragraphs[0]
        p_th.text = c.get("title", "")
        p_th.font.name = FONT_FAMILY
        p_th.font.size = Pt(18)
        p_th.font.bold = True
        p_th.font.color.rgb = COLOR_NAVY
        
        # เส้นคั่นแนวนอน
        line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, cx + Inches(0.30), top + Inches(2.50), Inches(3.30), Pt(1.5))
        set_flat_style(line, fill_rgb=COLOR_AMBER_DARK if is_warm else COLOR_COBALT)
        
        # เนื้อหาบรรยาย
        desc_tb = slide.shapes.add_textbox(cx + Inches(0.30), top + Inches(2.65), Inches(3.30), Inches(1.60))
        desc_tf = desc_tb.text_frame
        desc_tf.word_wrap = True
        p_desc = desc_tf.paragraphs[0]
        p_desc.text = c.get("desc", "")
        p_desc.font.name = FONT_FAMILY
        p_desc.font.size = Pt(14.5)
        p_desc.font.color.rgb = TEXT_PRIMARY
        
    return slide

def add_timeline_roadmap_slide(prs, kicker, title, phase1_steps, phase2_data=None, logo_path=None):
    """สร้างสไลด์ Roadmap / Timeline 2 ระยะ (Slide 18 Archetype)"""
    blank = prs.slide_layouts[6]
    slide = prs.slides.add_slide(blank)
    add_standard_header(slide, kicker, title, logo_path=logo_path)
    
    # 1. แถบ Phase I
    bar1 = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.62), Inches(1.68), Inches(12.20), Inches(0.32))
    set_flat_style(bar1, fill_rgb=COLOR_COBALT)
    p_b1 = bar1.text_frame.paragraphs[0]
    p_b1.text = "Phase I: การพัฒนาและยกร่างกรอบสมรรถนะ"
    p_b1.font.name = FONT_FAMILY
    p_b1.font.size = Pt(13)
    p_b1.font.bold = True
    p_b1.font.color.rgb = TEXT_WHITE
    p_b1.alignment = PP_ALIGN.CENTER
    
    # 2. การ์ดขั้นตอน
    lefts = [Inches(0.65), Inches(3.19), Inches(5.67), Inches(8.14), Inches(10.67)]
    card_w = Inches(2.00)
    card_h = Inches(3.17)
    card_top = Inches(2.16)
    
    for i, step in enumerate(phase1_steps[:5]):
        sx = lefts[i]
        # การ์ด
        card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, sx, card_top, card_w, card_h)
        set_flat_style(card, fill_rgb=CARD_COOL_BG, line_rgb=CARD_COOL_BORDER, line_width_pt=1)
        
        # วงกลมไอคอน
        circle = slide.shapes.add_shape(MSO_SHAPE.OVAL, sx + Inches(0.15), card_top + Inches(0.15), Inches(0.60), Inches(0.60))
        set_flat_style(circle, fill_rgb=COLOR_SKY)
        
        # ตัวเลขในวงกลม
        p_c = circle.text_frame.paragraphs[0]
        p_c.text = str(i+1)
        p_c.font.name = FONT_FAMILY
        p_c.font.size = Pt(14)
        p_c.font.bold = True
        p_c.font.color.rgb = TEXT_WHITE
        p_c.alignment = PP_ALIGN.CENTER
        
        # ชื่องาน
        tb = slide.shapes.add_textbox(sx + Inches(0.10), card_top + Inches(1.05), Inches(1.80), Inches(1.30))
        tf = tb.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = step.get("title", "")
        p.font.name = FONT_FAMILY
        p.font.size = Pt(15)
        p.font.bold = True
        p.font.color.rgb = COLOR_COBALT
        
        # วันที่กำกับ
        db = slide.shapes.add_textbox(sx + Inches(0.10), card_top + Inches(2.55), Inches(1.80), Inches(0.40))
        p_d = db.text_frame.paragraphs[0]
        p_d.text = step.get("date", "")
        p_d.font.name = FONT_FAMILY
        p_d.font.size = Pt(14)
        p_d.font.color.rgb = TEXT_MUTED

    # 3. แถบ Phase II (ถ้ามี)
    if phase2_data:
        bar2 = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(8.14), Inches(5.65), Inches(4.53), Inches(0.32))
        set_flat_style(bar2, fill_rgb=COLOR_PURPLE)
        p_b2 = bar2.text_frame.paragraphs[0]
        p_b2.text = "Phase II: การขับเคลื่อนและติดตามผล"
        p_b2.font.name = FONT_FAMILY
        p_b2.font.size = Pt(13)
        p_b2.font.bold = True
        p_b2.font.color.rgb = TEXT_WHITE
        p_b2.alignment = PP_ALIGN.CENTER
        
        p2_box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(8.14), Inches(6.05), Inches(4.53), Inches(0.80))
        set_flat_style(p2_box, fill_rgb=CARD_COOL_BG, line_rgb=CARD_COOL_BORDER)
        p2_tf = p2_box.text_frame
        p_p2 = p2_tf.paragraphs[0]
        p_p2.text = phase2_data.get("desc", "ระยะการขับเคลื่อนเชิงนโยบายและติดตามผลการนำไปใช้ในสถานศึกษา")
        p_p2.font.name = FONT_FAMILY
        p_p2.font.size = Pt(13.5)
        p_p2.font.color.rgb = COLOR_PURPLE
        
    return slide

def add_4domain_pillar_slide(prs, kicker, title, domains_data, logo_path=None):
    """สร้างสไลด์ 4 เสาหลักแยกตามสีธีม (Slide 8 Archetype)"""
    blank = prs.slide_layouts[6]
    slide = prs.slides.add_slide(blank)
    add_standard_header(slide, kicker, title, logo_path=logo_path)
    
    # กำหนดชุดสีประจำ 4 โดเมน
    domain_colors = [
        {"bg": RGBColor(31, 78, 121),  "circle": RGBColor(61, 124, 184), "tag_bg": RGBColor(201, 218, 248), "tag_txt": RGBColor(26, 80, 145)},
        {"bg": RGBColor(23, 122, 111), "circle": RGBColor(118, 165, 175), "tag_bg": RGBColor(208, 224, 227), "tag_txt": RGBColor(23, 122, 111)},
        {"bg": RGBColor(180, 95, 6),   "circle": RGBColor(224, 133, 15),  "tag_bg": RGBColor(255, 242, 204), "tag_txt": RGBColor(208, 141, 11)},
        {"bg": RGBColor(112, 48, 160), "circle": RGBColor(156, 94, 201),  "tag_bg": RGBColor(217, 210, 233), "tag_txt": RGBColor(91, 63, 133)}
    ]
    
    lefts = [Inches(0.55), Inches(3.66), Inches(6.77), Inches(9.88)]
    card_w = Inches(2.96)
    card_h = Inches(4.90)
    card_top = Inches(1.71)
    
    for i, d in enumerate(domains_data[:4]):
        dx = lefts[i]
        cset = domain_colors[i]
        
        # เสาหลักพื้นหลังเข้ม
        pillar = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, dx, card_top, card_w, card_h)
        set_flat_style(pillar, fill_rgb=cset["bg"])
        
        # วงกลมไอคอนบน
        circle = slide.shapes.add_shape(MSO_SHAPE.OVAL, dx + Inches(0.22), card_top + Inches(0.17), Inches(0.52), Inches(0.52))
        set_flat_style(circle, fill_rgb=cset["circle"])
        
        # ตัวเลขไทยในวงกลม
        p_c = circle.text_frame.paragraphs[0]
        p_c.text = d.get("num", str(i+1))
        p_c.font.name = FONT_FAMILY
        p_c.font.size = Pt(14)
        p_c.font.bold = True
        p_c.font.color.rgb = TEXT_WHITE
        p_c.alignment = PP_ALIGN.CENTER
        
        # หัวข้อภาษาไทย
        tb_th = slide.shapes.add_textbox(dx + Inches(0.22), card_top + Inches(0.71), Inches(2.52), Inches(0.78))
        tf_th = tb_th.text_frame
        tf_th.word_wrap = True
        p_th = tf_th.paragraphs[0]
        p_th.text = d.get("title_th", "")
        p_th.font.name = FONT_FAMILY
        p_th.font.size = Pt(17)
        p_th.font.bold = True
        p_th.font.color.rgb = TEXT_WHITE
        
        # ชื่อภาษาอังกฤษ (วงเล็บ)
        tb_en = slide.shapes.add_textbox(dx + Inches(0.22), card_top + Inches(1.61), Inches(2.52), Inches(0.25))
        p_en = tb_en.text_frame.paragraphs[0]
        p_en.text = f"({d.get('title_en', '')})"
        p_en.font.name = FONT_FAMILY
        p_en.font.size = Pt(10.5)
        p_en.font.italic = True
        p_en.font.color.rgb = COLOR_SKY_LIGHT
        
        # เส้นแบ่งในเสา
        line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, dx + Inches(0.22), card_top + Inches(1.90), Inches(2.52), Pt(1))
        set_flat_style(line, fill_rgb=cset["circle"])
        
        # คำอธิบาย / นิยาม
        tb_desc = slide.shapes.add_textbox(dx + Inches(0.22), card_top + Inches(2.05), Inches(2.54), Inches(2.15))
        tf_desc = tb_desc.text_frame
        tf_desc.word_wrap = True
        p_desc = tf_desc.paragraphs[0]
        p_desc.text = d.get("desc", "")
        p_desc.font.name = FONT_FAMILY
        p_desc.font.size = Pt(12.5)
        p_desc.font.color.rgb = TEXT_WHITE
        
        # ป้ายสรุปท้ายการ์ด (เช่น 6 สมรรถนะ)
        pill = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, dx + Inches(0.80), card_top + Inches(4.38), Inches(1.36), Inches(0.32))
        set_flat_style(pill, fill_rgb=cset["tag_bg"])
        p_pill = pill.text_frame.paragraphs[0]
        p_pill.text = d.get("count_tag", "6 สมรรถนะ")
        p_pill.font.name = FONT_FAMILY
        p_pill.font.size = Pt(12)
        p_pill.font.bold = True
        p_pill.font.color.rgb = cset["tag_txt"]
        p_pill.alignment = PP_ALIGN.CENTER
        
    return slide

def add_6grid_goals_slide(prs, kicker, title, subtitle, goals_data, logo_path=None):
    """สร้างสไลด์ 6 เป้าหมาย/หลักการ (2 แถว x 3 คอลัมน์)"""
    blank = prs.slide_layouts[6]
    slide = prs.slides.add_slide(blank)
    add_standard_header(slide, kicker, title, subtitle, logo_path=logo_path)
    
    col_coords = [Inches(0.60), Inches(4.70), Inches(8.80)]
    row_coords = [Inches(2.20), Inches(4.50)]
    card_w = Inches(3.90)
    card_h = Inches(2.05)
    
    thai_nums = ["๑", "๒", "๓", "๔", "๕", "๖"]
    
    for i, g in enumerate(goals_data[:6]):
        r = i // 3
        c = i % 3
        gx = col_coords[c]
        gy = row_coords[r]
        
        # การ์ด
        card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, gx, gy, card_w, card_h)
        set_flat_style(card, fill_rgb=CARD_COOL_BG, line_rgb=CARD_COOL_BORDER, line_width_pt=1)
        
        # วงกลมตัวเลขไทย
        circle = slide.shapes.add_shape(MSO_SHAPE.OVAL, gx + Inches(0.25), gy + Inches(0.25), Inches(0.55), Inches(0.55))
        set_flat_style(circle, fill_rgb=COLOR_COBALT)
        p_c = circle.text_frame.paragraphs[0]
        p_c.text = thai_nums[i]
        p_c.font.name = FONT_FAMILY
        p_c.font.size = Pt(15)
        p_c.font.bold = True
        p_c.font.color.rgb = TEXT_WHITE
        p_c.alignment = PP_ALIGN.CENTER
        
        # ข้อความเป้าหมาย
        tb = slide.shapes.add_textbox(gx + Inches(0.95), gy + Inches(0.20), Inches(2.75), Inches(1.65))
        tf = tb.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = g.get("title", "")
        p.font.name = FONT_FAMILY
        p.font.size = Pt(15)
        p.font.bold = True
        p.font.color.rgb = COLOR_NAVY
        
        if "desc" in g and g["desc"]:
            p2 = tf.add_paragraph()
            p2.space_before = Pt(4)
            p2.text = g["desc"]
            p2.font.name = FONT_FAMILY
            p2.font.size = Pt(13)
            p2.font.color.rgb = TEXT_MUTED
            
    return slide

