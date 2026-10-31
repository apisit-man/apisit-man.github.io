# -*- coding: utf-8 -*-
"""
Helper Template Script for ipst-academic-doc-theme
Generates a formal Thai academic Word (.docx) document and exports to PDF.
"""

import os
import sys
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import parse_xml
from docx.oxml.ns import qn, nsdecls

FONT_NAME = "TH SarabunPSK"
COLOR_PRIMARY_HEX = "003366"      # IPST Deep Royal Blue
COLOR_TEAL_HEX = "00838F"         # Vibrant Teal
COLOR_LIGHT_BG_HEX = "F1F5F9"     # Slate light gray
COLOR_DARK_HEX = "0F172A"         # Deep Slate Navy
COLOR_BORDER_HEX = "CBD5E1"       # Light gray border

COLOR_PRIMARY = RGBColor(0, 51, 102)
COLOR_TEAL = RGBColor(0, 131, 143)
COLOR_DARK = RGBColor(15, 23, 42)
COLOR_GRAY = RGBColor(71, 85, 105)

def apply_academic_font(run, font_name=FONT_NAME, size_pt=16, bold=False, italic=False, color_rgb=COLOR_DARK):
    run.font.name = font_name
    run.font.size = Pt(size_pt)
    run.font.bold = bold
    run.font.italic = italic
    if color_rgb:
        run.font.color.rgb = color_rgb
    
    rPr = run._r.get_or_add_rPr()
    rFonts = rPr.find(qn('w:rFonts'))
    if rFonts is None:
        xml = f'<w:rFonts {nsdecls("w")} w:ascii="{font_name}" w:hAnsi="{font_name}" w:cs="{font_name}"/>'
        rPr.append(parse_xml(xml))
    else:
        rFonts.set(qn('w:ascii'), font_name)
        rFonts.set(qn('w:hAnsi'), font_name)
        rFonts.set(qn('w:cs'), font_name)

def set_cell_margins(cell, top=140, bottom=140, left=180, right=180):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = parse_xml(
        f'<w:tcMar {nsdecls("w")}>'
        f'  <w:top w:w="{top}" w:type="dxa"/>'
        f'  <w:bottom w:w="{bottom}" w:type="dxa"/>'
        f'  <w:left w:w="{left}" w:type="dxa"/>'
        f'  <w:right w:w="{right}" w:type="dxa"/>'
        f'</w:tcMar>'
    )
    tcPr.append(tcMar)

def set_cell_background(cell, hex_color):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{hex_color}"/>')
    tcPr.append(shd)

def set_table_borders(table, hex_color=COLOR_BORDER_HEX):
    tblPr = table._tbl.tblPr
    borders = parse_xml(
        f'<w:tblBorders {nsdecls("w")}>'
        f'  <w:top w:val="single" w:sz="6" w:space="0" w:color="{hex_color}"/>'
        f'  <w:bottom w:val="single" w:sz="8" w:space="0" w:color="{hex_color}"/>'
        f'  <w:insideH w:val="single" w:sz="4" w:space="0" w:color="{hex_color}"/>'
        f'  <w:insideV w:val="none"/>'
        f'  <w:left w:val="none"/>'
        f'  <w:right w:val="none"/>'
        f'</w:tblBorders>'
    )
    tblPr.append(borders)

def add_heading_1(doc, text):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(14)
    p.paragraph_format.space_after = Pt(4)
    p.paragraph_format.keep_with_next = True
    run = p.add_run(text)
    apply_academic_font(run, size_pt=18, bold=True, color_rgb=COLOR_PRIMARY)
    return p

def add_heading_2(doc, text):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(10)
    p.paragraph_format.space_after = Pt(2)
    p.paragraph_format.keep_with_next = True
    run = p.add_run(text)
    apply_academic_font(run, size_pt=16.5, bold=True, color_rgb=COLOR_TEAL)
    return p

def add_body_paragraph(doc, text, indent=True, space_after=4):
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(space_after)
    p.paragraph_format.line_spacing = 1.15
    if indent:
        p.paragraph_format.first_line_indent = Inches(0.5)
    run = p.add_run(text)
    apply_academic_font(run, size_pt=16, bold=False, color_rgb=COLOR_DARK)
    return p

def add_callout_box(doc, title, text, bg_hex=COLOR_LIGHT_BG_HEX, border_hex=COLOR_PRIMARY_HEX):
    table = doc.add_table(rows=1, cols=1)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False
    table.columns[0].width = Inches(6.8)
    
    cell = table.cell(0, 0)
    set_cell_margins(cell, top=160, bottom=160, left=240, right=200)
    set_cell_background(cell, bg_hex)
    
    tcPr = cell._tc.get_or_add_tcPr()
    borders = parse_xml(
        f'<w:tcBorders {nsdecls("w")}>'
        f'  <w:left w:val="single" w:sz="24" w:space="0" w:color="{border_hex}"/>'
        f'  <w:top w:val="none"/>'
        f'  <w:bottom w:val="none"/>'
        f'  <w:right w:val="none"/>'
        f'</w:tcBorders>'
    )
    tcPr.append(borders)
    
    p = cell.paragraphs[0]
    p.paragraph_format.space_after = Pt(2)
    r_t = p.add_run(title + "\n")
    apply_academic_font(r_t, size_pt=16, bold=True, color_rgb=COLOR_PRIMARY)
    
    r_b = p.add_run(text)
    apply_academic_font(r_b, size_pt=15, bold=False, color_rgb=COLOR_DARK)
    
    p_after = doc.add_paragraph()
    p_after.paragraph_format.space_after = Pt(4)

print("IPST Academic Document Helper Module Loaded Successfully.")
