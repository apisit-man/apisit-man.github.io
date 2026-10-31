import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE

def create_presentation():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]
    
    # Asset Paths
    cwd = os.getcwd()
    logo_path = os.path.join(cwd, 'Logo_IPST_transparent.png')
    output_filename = 'สไลด์ตัวอย่าง_Creative_Workshop_สสวท_5หน้า_v4_Professional.pptx'
    
    # =========================================================================
    # EYE-COMFORT & PROFESSIONAL ACADEMIC DESIGN SYSTEM
    # =========================================================================
    # Eye-comfort background: Soft matte blue-slate (no screen glare)
    CANVAS_MATTE   = RGBColor(220, 228, 236)  # #DCE4EC (Eye-comfort soothing matte slate)
    
    # Core Accent Colors (Vibrant, academic, solid)
    TEAL_VIBRANT   = RGBColor(0, 131, 143)    # #00838F (Workshop Teal)
    COBALT_BLUE    = RGBColor(29, 78, 216)    # #1D4ED8 (Electric Cobalt)
    AMBER_VIVID    = RGBColor(217, 119, 6)    # #D97706 (Warm Amber / Marigold)
    VIOLET_ACCENT  = RGBColor(124, 58, 237)   # #7C3AED (Creative Violet)
    
    # High-contrast Text Colors
    DARK_NAVY      = RGBColor(15, 23, 42)     # #0F172A (Deep Slate Navy - crisp readable text)
    DARK_SLATE     = RGBColor(51, 65, 85)     # #334155 (Slate 700 - clear subtitles)
    
    WHITE          = RGBColor(255, 255, 255)
    CARD_BG_TINT   = RGBColor(248, 250, 252)  # #F8FAFC (Clean soft white card surface)
    
    FONT_NAME = 'Noto Sans Thai'
    
    def apply_eye_comfort_bg(slide):
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
        bg.fill.solid()
        bg.fill.fore_color.rgb = CANVAS_MATTE
        bg.line.fill.background()
        return bg

    def add_ipst_logo(slide, top=Inches(0.42), right=Inches(0.8), height=Inches(0.85)):
        if os.path.exists(logo_path):
            width = Inches(height.inches * 0.89)
            left = Inches(13.333) - right - width
            return slide.shapes.add_picture(logo_path, left, top, width=width, height=height)
        return None

    def add_header(slide, kicker_text, title_text, subtitle_text):
        # Kicker Pill Badge
        badge = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(0.40), Inches(3.4), Inches(0.44))
        badge.fill.solid()
        badge.fill.fore_color.rgb = TEAL_VIBRANT
        badge.line.fill.background()
        
        btf = badge.text_frame
        btf.word_wrap = False
        btf.margin_left = btf.margin_top = btf.margin_right = btf.margin_bottom = 0
        bp = btf.paragraphs[0]
        bp.alignment = PP_ALIGN.CENTER
        bp.text = kicker_text.upper()
        bp.font.name = FONT_NAME
        bp.font.size = Pt(14.5)
        bp.font.bold = True
        bp.font.color.rgb = WHITE
        
        # Header Text Box (Upscaled Font Sizes)
        header_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.90), Inches(10.6), Inches(1.35))
        tf = header_box.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
        
        # Slide Title: 38 pt Bold
        p_title = tf.paragraphs[0]
        p_title.text = title_text
        p_title.font.name = FONT_NAME
        p_title.font.size = Pt(38)
        p_title.font.bold = True
        p_title.font.color.rgb = DARK_NAVY
        p_title.space_after = Pt(4)
        
        # Subtitle: 21 pt
        p_sub = tf.add_paragraph()
        p_sub.text = subtitle_text
        p_sub.font.name = FONT_NAME
        p_sub.font.size = Pt(21)
        p_sub.font.color.rgb = DARK_SLATE
        
        # IPST Logo top right
        add_ipst_logo(slide)

    # =========================================================================
    # SLIDE 1: COVER (หน้าปก สง่างาม เป็นวิชาการ ไม่มีภาพการ์ตูน)
    # =========================================================================
    s1 = prs.slides.add_slide(blank_layout)
    apply_eye_comfort_bg(s1)
    
    # Left decorative bar
    v_bar = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(0.65), Inches(0.18), Inches(3.95))
    v_bar.fill.solid()
    v_bar.fill.fore_color.rgb = TEAL_VIBRANT
    v_bar.line.fill.background()
    
    # Prominent IPST Logo top right on cover
    if os.path.exists(logo_path):
        s1.shapes.add_picture(logo_path, Inches(11.2), Inches(0.6), width=Inches(1.25), height=Inches(1.4))
    
    # Title box (Full width breathing room)
    c_box = s1.shapes.add_textbox(Inches(1.2), Inches(0.65), Inches(9.8), Inches(3.95))
    ctf = c_box.text_frame
    ctf.word_wrap = True
    ctf.margin_left = ctf.margin_top = ctf.margin_right = ctf.margin_bottom = 0
    
    # Kicker
    cp = ctf.paragraphs[0]
    cp.text = "★ สถาบันส่งเสริมการสอนวิทยาศาสตร์และเทคโนโลยี (สสวท.) | WORKSHOP"
    cp.font.name = FONT_NAME
    cp.font.size = Pt(16.5)
    cp.font.bold = True
    cp.font.color.rgb = TEAL_VIBRANT
    cp.space_after = Pt(12)
    
    # Giant Dual-Color Title: 52 pt Bold
    cp = ctf.add_paragraph()
    r1 = cp.add_run()
    r1.text = "จุดประกายความคิดสร้างสรรค์ "
    r1.font.name = FONT_NAME
    r1.font.size = Pt(52)
    r1.font.bold = True
    r1.font.color.rgb = DARK_NAVY
    
    r2 = cp.add_run()
    r2.text = "\nสู่นวัตกรรมในชั้นเรียน"
    r2.font.name = FONT_NAME
    r2.font.size = Pt(52)
    r2.font.bold = True
    r2.font.color.rgb = TEAL_VIBRANT
    cp.space_after = Pt(14)
    
    # Subtitle: 23 pt
    cp = ctf.add_paragraph()
    cp.text = "เปลี่ยนบทบาทผู้เรียนจาก 'ผู้บริโภค' สู่ 'ผู้สร้างสรรค์' ด้วยการเรียนรู้เชิงรุก (Active Learning)"
    cp.font.name = FONT_NAME
    cp.font.size = Pt(23)
    cp.font.color.rgb = DARK_SLATE
    
    # Bottom 3 Action Pillars with Solid Color Caps & 18pt Body
    c_w = Inches(3.7)
    c_h = Inches(2.2)
    c_y = Inches(4.85)
    gap = Inches(0.31)
    
    cover_pillars = [
        (
            TEAL_VIBRANT,
            "01 // GOAL & MINDSET",
            "เป้าหมายสำคัญ",
            "สร้างพื้นที่ปลอดภัยทางความคิด ปลูกฝัง Growth Mindset ให้กล้าคิด ทดลอง และแก้ปัญหาจริงรอบตัว"
        ),
        (
            COBALT_BLUE,
            "02 // TARGET AUDIENCE",
            "กลุ่มเป้าหมาย",
            "สำหรับครูผู้สอนแกนนำกลุ่มสาระวิทยาศาสตร์ คณิตศาสตร์ และเทคโนโลยี ทุกระดับชั้นทั่วประเทศ"
        ),
        (
            AMBER_VIVID,
            "03 // FORMAT & DURATION",
            "รูปแบบเวิร์กช็อป",
            "กิจกรรมระดมสมองและลงมือปฏิบัติ 90 นาที ผ่านเครื่องมือวิเคราะห์และออกแบบนวัตกรรมการศึกษาจริง"
        )
    ]
    
    for i, (col, tag, title, desc) in enumerate(cover_pillars):
        cx = Inches(0.8) + i * (c_w + gap)
        
        # Base Card
        card = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, cx, c_y, c_w, c_h)
        card.fill.solid()
        card.fill.fore_color.rgb = WHITE
        card.line.color.rgb = col
        card.line.width = Pt(2.5)
        
        # Header Color Cap
        hbar = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, cx, c_y, c_w, Inches(0.55))
        hbar.fill.solid()
        hbar.fill.fore_color.rgb = col
        hbar.line.fill.background()
        
        htf = hbar.text_frame
        htf.word_wrap = False
        htf.margin_left = Inches(0.2)
        htf.margin_top = Inches(0.12)
        hp = htf.paragraphs[0]
        hp.text = tag
        hp.font.name = FONT_NAME
        hp.font.size = Pt(14.5)
        hp.font.bold = True
        hp.font.color.rgb = WHITE
        
        # Content box inside card
        in_box = s1.shapes.add_textbox(cx + Inches(0.25), c_y + Inches(0.65), c_w - Inches(0.5), c_h - Inches(0.75))
        itf = in_box.text_frame
        itf.word_wrap = True
        itf.margin_left = itf.margin_top = itf.margin_right = itf.margin_bottom = 0
        
        ip = itf.paragraphs[0]
        ip.text = title
        ip.font.name = FONT_NAME
        ip.font.size = Pt(23)
        ip.font.bold = True
        ip.font.color.rgb = DARK_NAVY
        ip.space_after = Pt(4)
        
        ip = itf.add_paragraph()
        ip.text = desc
        ip.font.name = FONT_NAME
        ip.font.size = Pt(18)
        ip.font.color.rgb = DARK_SLATE

    # =========================================================================
    # SLIDE 2: 3-PILLAR JOURNEY (19pt Body Font & Clear Contrast)
    # =========================================================================
    s2 = prs.slides.add_slide(blank_layout)
    apply_eye_comfort_bg(s2)
    add_header(s2, "Workshop at a Glance", "กระบวนการ 3 ขั้นตอนเปลี่ยนไอเดียสู่ห้องเรียนจริง", "ก้าวข้ามจากการเรียนรู้แบบเดิม สู่กระบวนการบ่มเพาะนักคิดและนวัตกรน้อยในชั้นเรียน")
    
    p_w = Inches(3.7)
    p_h = Inches(4.75)
    p_y = Inches(2.3)
    
    pillars_v4 = [
        (
            TEAL_VIBRANT,
            "01 // EXPLORE",
            "สำรวจโจทย์จริง",
            "เริ่มต้นจากความอยากรู้อยากเห็น ค้นหาปัญหาที่แท้จริงในบริบทใกล้ตัว โดยไม่ด่วนสรุปคำตอบ",
            [
                "สังเกตสภาพแวดล้อมจริงรอบตัว",
                "ตั้งคำถามปลายเปิด 'ทำไม' และ 'ถ้าหาก'",
                "รับฟังมุมมองผู้เรียนอย่างลึกซึ้ง"
            ]
        ),
        (
            COBALT_BLUE,
            "02 // COLLABORATE",
            "เชื่อมโยงความคิด",
            "เปิดพื้นที่ระดมพลังสมอง ผสมผสานมุมมองที่หลากหลาย บูรณาการข้ามศาสตร์วิทย์-คณิต-เทคโนโลยี",
            [
                "ผสมผสานไอเดียที่ไม่น่าจะเข้ากันได้",
                "ต่อยอดความคิดสร้างสรรค์จากเพื่อนในทีม",
                "มองเห็นความเป็นไปได้ใหม่นอกกรอบเดิม"
            ]
        ),
        (
            AMBER_VIVID,
            "03 // ACT & REFINE",
            "ลงมือสร้างคุณค่า",
            "เปลี่ยนแนวคิดบนกระดาษให้กลายเป็นชิ้นงานต้นแบบ (Prototype) ที่จับต้องได้และทดลองใช้ในชีวิตจริง",
            [
                "สร้างชิ้นงานต้นแบบอย่างง่ายและรวดเร็ว",
                "กล้าทดลองและเรียนรู้จากข้อผิดพลาด",
                "วัดผลลัพธ์เชิงประจักษ์และปรับปรุงต่อเนื่อง"
            ]
        )
    ]
    
    for i, (col, tag, title, desc, points) in enumerate(pillars_v4):
        px = Inches(0.8) + i * (p_w + Inches(0.31))
        
        # Base Card
        card = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, px, p_y, p_w, p_h)
        card.fill.solid()
        card.fill.fore_color.rgb = WHITE
        card.line.color.rgb = col
        card.line.width = Pt(2.5)
        
        # Header Cap
        h_strip = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, px, p_y, p_w, Inches(0.6))
        h_strip.fill.solid()
        h_strip.fill.fore_color.rgb = col
        h_strip.line.fill.background()
        
        stf = h_strip.text_frame
        stf.word_wrap = False
        stf.margin_left = Inches(0.2)
        stf.margin_top = Inches(0.12)
        sp = stf.paragraphs[0]
        sp.text = tag
        sp.font.name = FONT_NAME
        sp.font.size = Pt(15.5)
        sp.font.bold = True
        sp.font.color.rgb = WHITE
        
        # Pillar Text
        tb = s2.shapes.add_textbox(px + Inches(0.25), p_y + Inches(0.72), p_w - Inches(0.5), p_h - Inches(0.82))
        ptf = tb.text_frame
        ptf.word_wrap = True
        ptf.margin_left = ptf.margin_top = ptf.margin_right = ptf.margin_bottom = 0
        
        # Title (28pt)
        tp = ptf.paragraphs[0]
        tp.text = title
        tp.font.name = FONT_NAME
        tp.font.size = Pt(28)
        tp.font.bold = True
        tp.font.color.rgb = DARK_NAVY
        tp.space_after = Pt(8)
        
        # Desc (19pt)
        tp = ptf.add_paragraph()
        tp.text = desc
        tp.font.name = FONT_NAME
        tp.font.size = Pt(19)
        tp.font.color.rgb = DARK_SLATE
        tp.space_after = Pt(14)
        
        # Key Practices Header (19pt bold)
        tp = ptf.add_paragraph()
        tp.text = "★ แนวทางปฏิบัติสำคัญ:"
        tp.font.name = FONT_NAME
        tp.font.size = Pt(19)
        tp.font.bold = True
        tp.font.color.rgb = col
        tp.space_after = Pt(6)
        
        # Bullet points (Large 19pt)
        for pt in points:
            tp = ptf.add_paragraph()
            tp.text = f"•  {pt}"
            tp.font.name = FONT_NAME
            tp.font.size = Pt(19)
            tp.font.color.rgb = DARK_NAVY
            tp.space_after = Pt(5)

    # =========================================================================
    # SLIDE 3: SPLIT COMPARISON (ความสมดุลเชิงวิชาการ 100% ไม่มีภาพการ์ตูน)
    # =========================================================================
    s3 = prs.slides.add_slide(blank_layout)
    apply_eye_comfort_bg(s3)
    add_header(s3, "Core Perspective", "Creativity vs. Innovation แตกต่างกันอย่างไร?", "สะพานเชื่อมระหว่างจินตนาการทางความคิด สู่ดอกผลของการลงมือสร้างคุณค่าจริง")
    
    # Left Side: 2 Big Contrast Blocks (Width 6.7)
    l_x = Inches(0.8)
    l_w = Inches(6.7)
    l_h_card = Inches(2.26)
    l_gap = Inches(0.22)
    
    # Card 1: Creativity
    c_card = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, l_x, Inches(2.3), l_w, l_h_card)
    c_card.fill.solid()
    c_card.fill.fore_color.rgb = WHITE
    c_card.line.color.rgb = TEAL_VIBRANT
    c_card.line.width = Pt(2.5)
    
    c_bar = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, l_x, Inches(2.3), l_w, Inches(0.55))
    c_bar.fill.solid()
    c_bar.fill.fore_color.rgb = TEAL_VIBRANT
    c_bar.line.fill.background()
    cp = c_bar.text_frame.paragraphs[0]
    cp.text = "CREATIVITY // ความคิดสร้างสรรค์"
    cp.font.name = FONT_NAME
    cp.font.size = Pt(15.5)
    cp.font.bold = True
    cp.font.color.rgb = WHITE
    c_bar.text_frame.margin_left = Inches(0.25)
    
    ctb = s3.shapes.add_textbox(l_x + Inches(0.25), Inches(2.95), l_w - Inches(0.5), Inches(1.5))
    ctf = ctb.text_frame
    ctf.word_wrap = True
    ctf.margin_left = ctf.margin_top = ctf.margin_right = ctf.margin_bottom = 0
    
    p = ctf.paragraphs[0]
    p.text = "\"Thinking up new things\" — การคิดค้นและจินตนาการสิ่งใหม่"
    p.font.name = FONT_NAME
    p.font.size = Pt(19.5)
    p.font.bold = True
    p.font.color.rgb = DARK_NAVY
    p.space_after = Pt(4)
    
    p = ctf.add_paragraph()
    p.text = "• มุ่งเน้น: การตั้งคำถาม การมองเห็นความเป็นไปได้ และจินตนาการ\n• เปรียบเสมือน: 'เมล็ดพันธุ์' (Seed) แห่งแรงบันดาลใจในสมอง"
    p.font.name = FONT_NAME
    p.font.size = Pt(18.5)
    p.font.color.rgb = DARK_SLATE

    # Card 2: Innovation
    i_y = Inches(2.3) + l_h_card + l_gap
    i_card = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, l_x, i_y, l_w, l_h_card)
    i_card.fill.solid()
    i_card.fill.fore_color.rgb = WHITE
    i_card.line.color.rgb = AMBER_VIVID
    i_card.line.width = Pt(2.5)
    
    i_bar = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, l_x, i_y, l_w, Inches(0.55))
    i_bar.fill.solid()
    i_bar.fill.fore_color.rgb = AMBER_VIVID
    i_bar.line.fill.background()
    ip = i_bar.text_frame.paragraphs[0]
    ip.text = "INNOVATION // นวัตกรรม"
    ip.font.name = FONT_NAME
    ip.font.size = Pt(15.5)
    ip.font.bold = True
    ip.font.color.rgb = WHITE
    i_bar.text_frame.margin_left = Inches(0.25)
    
    itb = s3.shapes.add_textbox(l_x + Inches(0.25), i_y + Inches(0.65), l_w - Inches(0.5), Inches(1.5))
    itf = itb.text_frame
    itf.word_wrap = True
    itf.margin_left = itf.margin_top = itf.margin_right = itf.margin_bottom = 0
    
    p = itf.paragraphs[0]
    p.text = "\"Doing new things\" — การลงมือสร้างสรรค์และก่อเกิดคุณค่าจริง"
    p.font.name = FONT_NAME
    p.font.size = Pt(19.5)
    p.font.bold = True
    p.font.color.rgb = DARK_NAVY
    p.space_after = Pt(4)
    
    p = itf.add_paragraph()
    p.text = "• มุ่งเน้น: การลงมือสร้างจริง สร้างคุณค่า (Value) และแก้ปัญหาจริง\n• เปรียบเสมือน: 'ดอกผล' (Fruit) ที่เก็บเกี่ยวและนำไปใช้ประโยชน์ได้"
    p.font.name = FONT_NAME
    p.font.size = Pt(18.5)
    p.font.color.rgb = DARK_SLATE

    # Right Side: 3 Full Structured Action Cards (Professional Academic Design)
    r_x = Inches(7.8)
    r_w = Inches(4.73)
    r_card_h = Inches(1.48)
    r_gap = Inches(0.15)
    
    questions_v4 = [
        (
            TEAL_VIBRANT,
            "01 // WHAT IS HAPPENING?",
            "โจทย์และความท้าทายจริงคืออะไร?",
            "สำรวจสภาพปัญหาและปรากฏการณ์จริงในห้องเรียน โดยไม่ด่วนตัดสิน"
        ),
        (
            COBALT_BLUE,
            "02 // WHY DOES IT MATTER?",
            "ทำไมปัญหานี้จึงมีความหมาย?",
            "ค้นหาคุณค่า ผลกระทบ และความสำคัญของการแก้ปัญหาต่อชีวิตผู้เรียน"
        ),
        (
            AMBER_VIVID,
            "03 // WHAT NEEDS TO CHANGE?",
            "อะไรคือสิ่งใหม่ที่ต้องลงมือทำ?",
            "เปลี่ยนจากเพียงแค่คิดริเริ่ม สู่การออกแบบนวัตกรรมที่ทำได้จริง"
        )
    ]
    
    for i, (q_col, q_tag, q_title, q_desc) in enumerate(questions_v4):
        qy = Inches(2.3) + i * (r_card_h + r_gap)
        
        q_card = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, r_x, qy, r_w, r_card_h)
        q_card.fill.solid()
        q_card.fill.fore_color.rgb = WHITE
        q_card.line.color.rgb = q_col
        q_card.line.width = Pt(2.0)
        
        qtb = s3.shapes.add_textbox(r_x + Inches(0.25), qy + Inches(0.12), r_w - Inches(0.5), r_card_h - Inches(0.2))
        qtf = qtb.text_frame
        qtf.word_wrap = True
        qtf.margin_left = qtf.margin_top = qtf.margin_right = qtf.margin_bottom = 0
        
        qp = qtf.paragraphs[0]
        qp.text = q_tag
        qp.font.name = FONT_NAME
        qp.font.size = Pt(13.5)
        qp.font.bold = True
        qp.font.color.rgb = q_col
        
        qp = qtf.add_paragraph()
        qp.text = q_title
        qp.font.name = FONT_NAME
        qp.font.size = Pt(20)
        qp.font.bold = True
        qp.font.color.rgb = DARK_NAVY
        
        qp = qtf.add_paragraph()
        qp.text = q_desc
        qp.font.name = FONT_NAME
        qp.font.size = Pt(17)
        qp.font.color.rgb = DARK_SLATE

    # =========================================================================
    # SLIDE 4: 2x2 MATRIX (Guilford's 4 Dimensions with 19pt Body Text)
    # =========================================================================
    s4 = prs.slides.add_slide(blank_layout)
    apply_eye_comfort_bg(s4)
    add_header(s4, "Framework & Matrix", "4 มิติความคิดสร้างสรรค์ที่วัดผลได้จริงในชั้นเรียน", "กรอบสมรรถนะตามหลักจิตวิทยาการศึกษา (Guilford's Dimensions of Creativity)")
    
    m_w = Inches(5.7)
    m_h = Inches(2.3)
    row1_y = Inches(2.3)
    row2_y = Inches(4.75)
    col1_x = Inches(0.8)
    col2_x = Inches(6.83)
    
    matrix_v4 = [
        (
            col1_x, row1_y,
            TEAL_VIBRANT,
            "01",
            "ความคิดริเริ่ม (Originality)",
            "คิดแปลกใหม่ แตกต่าง ไม่ลอกเลียนแบบใคร กล้าเสนอแนวทางที่ไม่มีใครนึกถึง เพื่อเปิดความเป็นไปได้ใหม่",
            "ในห้องเรียน: ให้คะแนนพิเศษกับไอเดียที่แปลกใหม่และไม่ซ้ำใคร"
        ),
        (
            col2_x, row1_y,
            COBALT_BLUE,
            "02",
            "ความคิดคล่องแคล่ว (Fluency)",
            "สร้างสรรค์ไอเดียจำนวนมากในเวลาจำกัด เน้นปริมาณก่อนเพื่อเปิดทางเลือกให้มากที่สุด",
            "ในห้องเรียน: ตั้งโจทย์เขียนวิธีแก้ปัญหาให้ได้มากที่สุดใน 2 นาที"
        ),
        (
            col1_x, row2_y,
            AMBER_VIVID,
            "03",
            "ความคิดยืดหยุ่น (Flexibility)",
            "คิดข้ามหมวดหมู่ มองปัญหาหลายมิติ และเชื่อมโยงศาสตร์ที่ดูไม่เกี่ยวข้องกันเข้าด้วยกัน",
            "ในห้องเรียน: ฝึกเปลี่ยนมุมมอง เช่น ถ้าใช้วัสดุจากธรรมชาติจะทำอย่างไร"
        ),
        (
            col2_x, row2_y,
            VIOLET_ACCENT,
            "04",
            "ความคิดละเอียดลออ (Elaboration)",
            "ลงรายละเอียดอย่างประณีต ต่อยอดไอเดียให้กลายเป็นพิมพ์เขียวและขั้นตอนที่สามารถลงมือทำได้จริง",
            "ในห้องเรียน: ช่วยเด็กเขียนผังขั้นตอน ระบุวัสดุ และกำหนดเวลาทดลอง"
        )
    ]
    
    for x, y, col, num, title, desc, action in matrix_v4:
        # Base Card
        m_card = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, y, m_w, m_h)
        m_card.fill.solid()
        m_card.fill.fore_color.rgb = WHITE
        m_card.line.color.rgb = col
        m_card.line.width = Pt(2.5)
        
        # Color Badge (Number)
        nb = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x + Inches(0.25), y + Inches(0.2), Inches(0.7), Inches(0.5))
        nb.fill.solid()
        nb.fill.fore_color.rgb = col
        nb.line.fill.background()
        np = nb.text_frame.paragraphs[0]
        np.alignment = PP_ALIGN.CENTER
        np.text = num
        np.font.name = FONT_NAME
        np.font.size = Pt(18)
        np.font.bold = True
        np.font.color.rgb = WHITE
        
        # Title beside badge (25pt)
        ttb = s4.shapes.add_textbox(x + Inches(1.1), y + Inches(0.16), m_w - Inches(1.25), Inches(0.55))
        ttf = ttb.text_frame
        ttf.word_wrap = True
        ttf.margin_left = ttf.margin_top = ttf.margin_right = ttf.margin_bottom = 0
        tp = ttf.paragraphs[0]
        tp.text = title
        tp.font.name = FONT_NAME
        tp.font.size = Pt(25)
        tp.font.bold = True
        tp.font.color.rgb = DARK_NAVY
        
        # Content body (19pt)
        mtb = s4.shapes.add_textbox(x + Inches(0.25), y + Inches(0.78), m_w - Inches(0.5), m_h - Inches(0.85))
        mtf = mtb.text_frame
        mtf.word_wrap = True
        mtf.margin_left = mtf.margin_top = mtf.margin_right = mtf.margin_bottom = 0
        
        mp = mtf.paragraphs[0]
        mp.text = desc
        mp.font.name = FONT_NAME
        mp.font.size = Pt(19)
        mp.font.color.rgb = DARK_SLATE
        mp.space_after = Pt(6)
        
        mp = mtf.add_paragraph()
        mp.text = f"★ {action}"
        mp.font.name = FONT_NAME
        mp.font.size = Pt(18)
        mp.font.bold = True
        mp.font.color.rgb = col

    # =========================================================================
    # SLIDE 5: TAKEAWAY & ACTION (Clean, Bold, 19pt font, Full Balance)
    # =========================================================================
    s5 = prs.slides.add_slide(blank_layout)
    apply_eye_comfort_bg(s5)
    add_header(s5, "Takeaway & Action", "บทสรุปสู่การลงมือปฏิบัติในห้องเรียนของคุณ", "เปลี่ยนแรงบันดาลใจจากการอบรม ให้กลายเป็นการลงมือทำจริง (From Idea to Action)")
    
    t_w = Inches(3.7)
    t_h = Inches(4.0)
    t_y = Inches(2.3)
    
    takeaways_v4 = [
        (
            TEAL_VIBRANT,
            "STEP 01 // INSIGHT",
            "ONE INSIGHT\n(1 มุมมองใหม่)",
            "สิ่งที่ค้นพบและเปลี่ยนวิธีคิดของท่านเกี่ยวกับการส่งเสริมความคิดสร้างสรรค์ในชั้นเรียน",
            "[ บันทึกมุมมองใหม่ที่ประทับใจที่สุด ]"
        ),
        (
            COBALT_BLUE,
            "STEP 02 // IDEA",
            "ONE IDEA\n(1 ไอเดียสร้างสรรค์)",
            "หนึ่งกิจกรรมหรือโจทย์โครงงานที่อยากนำไปทดลองจัดให้ผู้เรียนในภาคเรียนนี้",
            "[ บันทึกกิจกรรมหรือโจทย์โครงงาน ]"
        ),
        (
            AMBER_VIVID,
            "STEP 03 // ACTION",
            "ONE ACTION\n(1 ก้าวแรกที่เริ่มทำ)",
            "สิ่งแรกที่เป็นรูปธรรมที่จะลงมือทำจริงในสัปดาห์หน้าเพื่อเปิดพื้นที่ปลอดภัยทางความคิด",
            "[ ระบุวัน เวลา และก้าวแรกใน 7 วัน ]"
        )
    ]
    
    for i, (col, tag, title, desc, prompt) in enumerate(takeaways_v4):
        tx = Inches(0.8) + i * (t_w + Inches(0.31))
        
        # Base Card
        t_card = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, tx, t_y, t_w, t_h)
        t_card.fill.solid()
        t_card.fill.fore_color.rgb = WHITE
        t_card.line.color.rgb = col
        t_card.line.width = Pt(2.5)
        
        # Top Color Banner
        t_bar = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, tx, t_y, t_w, Inches(0.55))
        t_bar.fill.solid()
        t_bar.fill.fore_color.rgb = col
        t_bar.line.fill.background()
        tp = t_bar.text_frame.paragraphs[0]
        tp.text = tag
        tp.font.name = FONT_NAME
        tp.font.size = Pt(14.5)
        tp.font.bold = True
        tp.font.color.rgb = WHITE
        t_bar.text_frame.margin_left = Inches(0.2)
        
        # Card Body Box (Large 19pt font)
        ttb = s5.shapes.add_textbox(tx + Inches(0.25), t_y + Inches(0.68), t_w - Inches(0.5), t_h - Inches(0.8))
        ttf = ttb.text_frame
        ttf.word_wrap = True
        ttf.margin_left = ttf.margin_top = ttf.margin_right = ttf.margin_bottom = 0
        
        tp = ttf.paragraphs[0]
        tp.text = title
        tp.font.name = FONT_NAME
        tp.font.size = Pt(25)
        tp.font.bold = True
        tp.font.color.rgb = DARK_NAVY
        tp.space_after = Pt(8)
        
        tp = ttf.add_paragraph()
        tp.text = desc
        tp.font.name = FONT_NAME
        tp.font.size = Pt(19)
        tp.font.color.rgb = DARK_SLATE
        tp.space_after = Pt(14)
        
        # Prompt Fill-in Box
        p_box = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, tx + Inches(0.2), t_y + Inches(2.9), t_w - Inches(0.4), Inches(0.92))
        p_box.fill.solid()
        p_box.fill.fore_color.rgb = CARD_BG_TINT
        p_box.line.color.rgb = col
        p_box.line.width = Pt(1.5)
        
        ptf = p_box.text_frame
        ptf.word_wrap = True
        ptf.margin_left = ptf.margin_right = Inches(0.2)
        ptf.margin_top = Inches(0.18)
        pp = ptf.paragraphs[0]
        pp.text = prompt
        pp.font.name = FONT_NAME
        pp.font.size = Pt(17.5)
        pp.font.bold = True
        pp.font.color.rgb = col

    # Bottom Bold Navy Banner
    banner = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(6.5), Inches(11.733), Inches(0.62))
    banner.fill.solid()
    banner.fill.fore_color.rgb = DARK_NAVY
    banner.line.fill.background()
    
    btf = banner.text_frame
    btf.word_wrap = True
    btf.margin_left = btf.margin_right = Inches(0.3)
    btf.margin_top = Inches(0.12)
    bp = btf.paragraphs[0]
    bp.alignment = PP_ALIGN.CENTER
    bp.text = "★ สถาบันส่งเสริมการสอนวิทยาศาสตร์และเทคโนโลยี (สสวท.) ขอขอบคุณครูทุกท่านผู้เป็นพลังขับเคลื่อนนวัตกรรมการศึกษาไทย"
    bp.font.name = FONT_NAME
    bp.font.size = Pt(17)
    bp.font.bold = True
    bp.font.color.rgb = WHITE

    # Save presentation
    output_path = os.path.join(cwd, output_filename)
    prs.save(output_path)
    print(f"Presentation saved successfully to: {output_path}")

if __name__ == '__main__':
    create_presentation()
