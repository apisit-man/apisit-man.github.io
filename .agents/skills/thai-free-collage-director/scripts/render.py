#!/usr/bin/env python3
"""Offline, keyframe-driven Thai paper-collage video generator. MIT licensed."""
from __future__ import annotations
import argparse, json, math, os, random, shutil, subprocess, sys, tempfile, textwrap, unicodedata
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter
try:
    import numpy as np
except ImportError:
    np = None

PALETTES = [
  {'bg':'#F5E8CF','dark':'#183C48','accent':'#FF7147','secondary':'#8CCFC0','paper':'#FFFDF7'},
  {'bg':'#D9ECE8','dark':'#173B4D','accent':'#F5B34C','secondary':'#F5A5A4','paper':'#FFFFF6'},
  {'bg':'#F1E1EB','dark':'#293A4B','accent':'#E98A57','secondary':'#B5C8E2','paper':'#FFF9F2'},
  {'bg':'#E5EBFA','dark':'#203756','accent':'#F19E55','secondary':'#9ED6B8','paper':'#FFFDF5'},
  {'bg':'#F9E4C9','dark':'#253A36','accent':'#6CA9A0','secondary':'#ECA0A1','paper':'#FFFCF5'},
]

def require_executable(name):
    if not shutil.which(name):
        raise RuntimeError(f"Missing {name}: install FFmpeg with ffmpeg and ffprobe on PATH")

def hexrgb(color):
    c=color.lstrip('#')
    return tuple(int(c[i:i+2],16) for i in (0,2,4))

def rgba(h, alpha=255): return (*hexrgb(h),alpha)

def font_path(explicit=None):
    if explicit:
        if not Path(explicit).exists(): raise RuntimeError('Thai font file not found: '+explicit)
        return explicit
    possibles=[]
    if sys.platform.startswith('win'):
        root=os.environ.get('WINDIR',r'C:\Windows')
        possibles += [str(Path(root)/'Fonts'/'tahomabd.ttf'),str(Path(root)/'Fonts'/'leelawui.ttf'),str(Path(root)/'Fonts'/'tahoma.ttf')]
    elif sys.platform=='darwin':
        possibles += ['/System/Library/Fonts/Supplemental/Thonburi.ttc','/System/Library/Fonts/Thonburi.ttc']
    else:
        for family in ['Noto Sans Thai:style=Bold','Noto Sans Thai','Noto Looped Thai']:
            try:
                path=subprocess.check_output(['fc-match','-f','%{file}',family],text=True).strip()
                if path: possibles.append(path)
            except (OSError,subprocess.CalledProcessError): pass
    return next((p for p in possibles if Path(p).exists()), None)

def latin_font_path():
    if sys.platform.startswith('win'):
        root=os.environ.get('WINDIR',r'C:\Windows')
        a=[str(Path(root)/'Fonts'/'arialbd.ttf'),str(Path(root)/'Fonts'/'tahomabd.ttf')]
    elif sys.platform=='darwin':
        a=['/System/Library/Fonts/Supplemental/Arial Bold.ttf']
    else:
        try:
            a=[subprocess.check_output(['fc-match','-f','%{file}','Noto Sans:style=Bold'],text=True).strip()]
        except Exception:a=[]
    return next((x for x in a if Path(x).exists()),None)

def _split_mixed_runs(text):
    chunks=[]
    for ch in str(text):
        thai='\u0e00' <= ch <= '\u0e7f'
        if chunks and chunks[-1][0]==thai:chunks[-1]=(thai,chunks[-1][1]+ch)
        else:chunks.append((thai,ch))
    return chunks

def measure_mixed(draw, text, thai_font):
    latinpath=latin_font_path()
    latin=load_font(latinpath,thai_font.size) if latinpath else thai_font
    w=0.0
    for is_thai,run in _split_mixed_runs(text):
        f=thai_font if is_thai else latin
        w+=draw.textlength(run,font=f)
    return w

def draw_mixed(draw,xy,text,thai_font,fill):
    """Keep shaping Thai in runs while aligning Latin/digits cleanly on baseline."""
    latinpath=latin_font_path()
    latin=load_font(latinpath,thai_font.size) if latinpath else thai_font
    asc_t,_=thai_font.getmetrics()
    asc_l,_=latin.getmetrics()
    x,y=xy
    for is_thai,run in _split_mixed_runs(text):
        f=thai_font if is_thai else latin
        dy=0 if is_thai else (asc_t-asc_l)
        draw.text((x,y+dy),run,font=f,fill=fill)
        x+=draw.textlength(run,font=f)

def load_font(path, size):
    if not path:
        raise RuntimeError('No Thai-capable font found. Install Noto Sans Thai or pass --font C:/Windows/Fonts/tahoma.ttf')
    try:
        from PIL import features
        engine = ImageFont.Layout.RAQM if features.check('raqm') else ImageFont.Layout.BASIC
        return ImageFont.truetype(str(path), max(9, int(size)), layout_engine=engine)
    except Exception:
        return ImageFont.truetype(str(path), max(9, int(size)))

def clusters(s):
    # Do not split Thai combining marks from the preceding base character.
    out=[]
    for ch in s:
        if not out or (unicodedata.combining(ch)==0 and unicodedata.category(ch) not in ('Mn','Me')):
            out.append(ch)
        else: out[-1]+=ch
    return out

def wrap_text(draw, text, font, max_width, max_lines=3):
    if not text:return ['']
    measure=lambda v:draw.textbbox((0,0),v,font=font,stroke_width=0)[2]
    words=str(text).strip().split(' ')
    lines=[];current=''
    for word in words:
        if not word:continue
        nextline=(current+' '+word).strip() if current else word
        if measure(nextline)<=max_width:
            current=nextline
            continue
        if current:lines.append(current);current=''
        if measure(word)<=max_width:
            current=word;continue
        # Oversized no-space Thai word: split in safe grapheme clusters.
        candidate=''
        for token in clusters(word):
            if candidate and measure(candidate+token)>max_width:
                lines.append(candidate);candidate=token
            else:candidate+=token
        current=candidate
    if current:lines.append(current)
    # Avoid one- or two-character orphan lines when the previous line contains
    # a large unspaced Thai phrase: move a balanced suffix into the last line.
    if len(lines)>1 and len(clusters(lines[-1]))<4:
        prev=clusters(lines[-2]);last=lines[-1]
        for take in range(max(1,len(prev)//3),1,-1):
            a=''.join(prev[:-take]).rstrip();b=(''.join(prev[-take:])+' '+last).strip()
            if a and measure(a)<=max_width and measure(b)<=max_width:
                lines[-2]=a;lines[-1]=b;break
    return lines

def fit_lines(draw,text, fontpath, maxwidth, maxlines, initial, minimum):
    size=initial
    while size>=minimum:
        f=load_font(fontpath,size)
        lines=wrap_text(draw,text,f,maxwidth,maxlines)
        if len(lines)<=maxlines:return f,lines
        size-=2
    f=load_font(fontpath,minimum)
    return f,wrap_text(draw,text,f,maxwidth,maxlines)

def stroke_line(d,xy,fill,width):d.line(xy,fill=fill,width=max(1,int(width)),joint='curve')

def star_points(cx,cy,outer,inner,count=5,rot=-math.pi/2):
    return [(int(cx+((outer if i%2==0 else inner)*math.cos(rot+math.pi*i/count))),int(cy+((outer if i%2==0 else inner)*math.sin(rot+math.pi*i/count)))) for i in range(count*2)]

def emblem(kind,pal):
    """Original vector cartoon cutouts, generated locally; no external art assets."""
    S=520
    im=Image.new('RGBA',(S,S),(0,0,0,0)); d=ImageDraw.Draw(im)
    dark=rgba(pal['dark']); accent=rgba(pal['accent']); secondary=rgba(pal['secondary']); white=(255,254,247,255)
    ink=max(8,int(S*.018))
    kind=kind.lower().strip()
    if kind in ('robot','ai','chatbot'):
        stroke_line(d,[(260,72),(260,102)],dark,11); d.ellipse((246,56,274,84),fill=accent,outline=dark,width=7)
        d.rounded_rectangle((110,115,411,365),radius=68,fill=white,outline=dark,width=ink)
        d.rounded_rectangle((135,155,385,303),radius=43,fill=secondary,outline=dark,width=5)
        for x in [206,314]:d.ellipse((x-27,200,x+27,254),fill=dark);d.ellipse((x-12,204,x+1,216),fill=white)
        d.arc((212,227,313,290),0,180,fill=accent,width=9)
        d.rounded_rectangle((155,370,365,460),radius=26,fill=accent,outline=dark,width=ink)
        stroke_line(d,[(154,395),(93,371),(79,293)],dark,14);stroke_line(d,[(365,395),(425,370),(439,303)],dark,14)
        for x in [93,425]:d.ellipse((x-23,270,x+23,315),fill=white,outline=dark,width=7)
    elif kind in ('student','kid','person','teacher'):
        d.ellipse((144,80,376,311),fill=(246,197,144,255),outline=dark,width=ink)
        d.pieslice((140,55,381,225),180,360,fill=dark)
        for x in (216,307):d.ellipse((x-10,190,x+10,219),fill=dark)
        d.arc((217,206,306,264),0,180,fill=dark,width=7)
        d.rounded_rectangle((129,313,391,486),radius=73,fill=secondary if kind=='teacher' else accent,outline=dark,width=ink)
        stroke_line(d,[(151,365),(84,407),(64,368)],dark,14);stroke_line(d,[(366,365),(426,314),(462,352)],dark,14)
        for x,y in [(64,368),(462,352)]:d.ellipse((x-15,y-15,x+15,y+15),fill=(246,197,144,255),outline=dark,width=5)
        if kind=='teacher':d.rectangle((264,352,331,390),fill=white,outline=dark,width=5)
    elif kind in ('book','learning','read'):
        d.polygon([(54,154),(248,177),(261,422),(58,392)],fill=secondary)
        d.polygon([(466,154),(272,177),(260,422),(462,392)],fill=white)
        stroke_line(d,[(52,152),(246,174),(260,418),(271,175),(465,151),(463,391),(261,421),(57,392),(52,152)],dark,12)
        for y in (237,278,319):
            stroke_line(d,[(94,y),(209,y+14)],dark,5);stroke_line(d,[(312,y+14),(424,y)],dark,5)
        d.polygon(star_points(261,110,69,28,5),fill=accent,outline=dark,width=6)
    elif kind in ('bulb','idea','light'):
        d.ellipse((135,80,385,346),fill=rgba('#FFE38B'),outline=dark,width=12)
        d.polygon([(212,316),(307,316),(294,398),(224,398)],fill=white,outline=dark)
        for y in (380,402,421):stroke_line(d,[(213,y),(308,y)],dark,11)
        stroke_line(d,[(239,341),(219,271),(260,239),(299,271),(279,341)],dark,7)
        for x1,y1,x2,y2 in [(260,25,260,62),(77,98,111,125),(443,98,409,125),(76,281,118,279),(444,281,402,279)]:stroke_line(d,[(x1,y1),(x2,y2)],accent,13)
    elif kind in ('school','classroom'):
        d.polygon([(69,198),(261,62),(451,198)],fill=accent,outline=dark,width=11)
        d.rectangle((93,199,425,455),fill=white,outline=dark,width=12)
        d.rectangle((225,327,298,456),fill=secondary,outline=dark,width=7)
        for x in (133,331):
            for y in (235,323):d.rectangle((x,y,x+54,y+54),fill=secondary,outline=dark,width=6)
        d.ellipse((244,145,278,178),fill=white,outline=dark,width=5)
    elif kind in ('phone','screen','technology'):
        d.rounded_rectangle((149,38,371,485),radius=45,fill=dark)
        d.rounded_rectangle((167,82,353,424),radius=21,fill=white)
        d.rounded_rectangle((187,134,334,308),radius=38,fill=secondary)
        d.ellipse((218,171,250,202),fill=dark);d.ellipse((274,171,306,202),fill=dark)
        d.arc((227,201,296,265),0,180,fill=dark,width=9)
        d.ellipse((246,446,274,473),fill=white)
        d.ellipse((251,49,269,66),fill=white)
    elif kind in ('plant','nature','tree','green'):
        d.polygon([(172,322),(347,322),(324,468),(198,468)],fill=accent,outline=dark)
        stroke_line(d,[(259,336),(259,156)],dark,14)
        d.ellipse((163,158,257,265),fill=secondary,outline=dark,width=10)
        d.ellipse((257,130,365,243),fill=secondary,outline=dark,width=10)
        d.ellipse((217,68,311,178),fill=secondary,outline=dark,width=10)
        stroke_line(d,[(211,242),(259,290),(329,205)],dark,7)
        d.polygon(star_points(111,124,33,15),fill=accent)
    elif kind in ('earth','world','globe'):
        d.ellipse((62,62,459,459),fill=secondary,outline=dark,width=13)
        d.polygon([(96,156),(150,113),(221,145),(243,198),(213,268),(169,255),(139,316),(95,276)],fill=accent)
        d.polygon([(305,128),(379,124),(430,179),(405,229),(357,211),(330,291),(276,263)],fill=accent)
        d.polygon([(236,332),(318,299),(375,363),(333,443),(265,432)],fill=accent)
        d.arc((113,73,418,445),-78,84,fill=dark,width=6)
    elif kind in ('recycle','trash','waste'):
        d.rounded_rectangle((145,168,383,450),radius=27,fill=secondary,outline=dark,width=12)
        d.rounded_rectangle((117,141,410,184),radius=11,fill=dark)
        d.rectangle((208,111,317,146),fill=dark)
        for x in (213,260,306):stroke_line(d,[(x,231),(x,385)],dark,9)
        d.polygon(star_points(368,107,55,22,5),fill=accent,outline=dark,width=5)
    elif kind in ('heart','care'):
        d.polygon([(260,423),(98,264),(96,179),(148,128),(218,140),(260,188),(298,140),(373,126),(422,188),(404,270)],fill=accent,outline=dark,width=14)
        d.polygon(star_points(378,115,35,16),fill=secondary)
    else:
        # Generic inquiry/comparison motif
        d.ellipse((110,91,412,397),fill=secondary,outline=dark,width=14)
        d.arc((198,157,310,259),205,22,fill=dark,width=18)
        d.ellipse((252,315,284,349),fill=dark)
        d.polygon(star_points(425,123,45,17),fill=accent,outline=dark,width=6)
    return im

def draw_torn_card(w,h,pal,seed=0):
    rng=random.Random(seed+w*7+h*13)
    pad=16
    im=Image.new('RGBA',(w+pad*2,h+pad*2),(0,0,0,0))
    dd=ImageDraw.Draw(im)
    step=max(20,w//20)
    pts=[]
    for x in range(pad,pad+w,step):
        pts.append((x,pad+rng.randint(-4,4)))
    pts.append((pad+w,pad+rng.randint(-3,3)))
    for y in range(pad+step,pad+h,step):
        pts.append((pad+w+rng.randint(-4,4),y))
    pts.append((pad+w+rng.randint(-3,3),pad+h+rng.randint(-3,3)))
    for x in range(pad+w-step,pad,-step):
        pts.append((x,pad+h+rng.randint(-4,4)))
    pts.append((pad+rng.randint(-3,3),pad+h+rng.randint(-3,3)))
    for y in range(pad+h-step,pad,-step):
        pts.append((pad+rng.randint(-4,4),y))
    # Soft multi-layer drop shadow
    sh=Image.new('RGBA',im.size,(0,0,0,0))
    sd=ImageDraw.Draw(sh)
    sd.polygon([(px+4,py+7) for px,py in pts],fill=(18,24,28,72))
    sh=sh.filter(ImageFilter.GaussianBlur(max(4,int(w*0.01))))
    im.alpha_composite(sh)
    dd=ImageDraw.Draw(im)
    dd.polygon(pts,fill=rgba(pal['paper']))
    dd.line(pts+[pts[0]],fill=rgba('#DDD0BD'),width=max(2,int(w*0.003)),joint='curve')
    return im

def draw_washi_tape(tw,th,color_hex,alpha=175):
    im=Image.new('RGBA',(tw+8,th+8),(0,0,0,0))
    d=ImageDraw.Draw(im)
    c=rgba(color_hex,alpha)
    pts=[(4,4),(tw+4,5),(tw+1,th//2+4),(tw+4,th+4),(4,th+3),(7,th//2+4)]
    d.polygon(pts,fill=c)
    # subtle highlight stripe across tape
    d.line([(6,th//3+4),(tw+1,th//3+4)],fill=(255,255,255,55),width=max(1,th//6))
    return im

def draw_badge_pill(text,fp,pal,r):
    if not text or not str(text).strip():return None
    txt=str(text).strip()
    tmp=Image.new('RGBA',(10,10))
    td=ImageDraw.Draw(tmp)
    f=load_font(fp,int(25*r))
    tw=measure_mixed(td,txt,f)
    bbox=td.textbbox((0,0),txt,font=f)
    th_vis=bbox[3]-bbox[1]
    pw=int(tw+52*r)
    ph=int(max(58*r,th_vis+26*r))
    pad=int(14*r)
    im=Image.new('RGBA',(pw+pad*2,ph+pad*2),(0,0,0,0))
    # Shadow
    sh=Image.new('RGBA',im.size,(0,0,0,0))
    sd=ImageDraw.Draw(sh)
    sd.rounded_rectangle((pad+3*r,pad+5*r,pad+pw+3*r,pad+ph+5*r),radius=ph//2,fill=(15,20,25,90))
    sh=sh.filter(ImageFilter.GaussianBlur(max(3,int(5*r))))
    im.alpha_composite(sh)
    d=ImageDraw.Draw(im)
    d.rounded_rectangle((pad,pad,pad+pw,pad+ph),radius=ph//2,fill=rgba(pal['accent']),outline=rgba(pal['dark']),width=max(2,int(3*r)))
    # Inner highlight
    d.rounded_rectangle((pad+3*r,pad+3*r,pad+pw-3*r,pad+ph//2),radius=ph//3,fill=(255,255,255,40))
    ty=pad+(ph-th_vis)//2-bbox[1]
    ar,ag,ab=hexrgb(pal['accent'])
    lum=(0.299*ar+0.587*ag+0.114*ab)/255.0
    txt_color=rgba(pal['dark']) if lum>0.62 else (255,255,255,255)
    if lum<=0.62:
        draw_mixed(d,(pad+26*r+1*r,ty+1.5*r),txt,f,(15,20,25,110))
    draw_mixed(d,(pad+26*r,ty),txt,f,txt_color)
    return im

def make_paper_texture(w,h,pal,idx):
    """Build tactile cardstock background with organic layered paper strata and subtle grain."""
    base=Image.new('RGBA',(w,h),rgba(pal['bg']))
    # Layer 1: Angled secondary paper stratum with soft drop shadow
    layer1=Image.new('RGBA',(w,h),(0,0,0,0))
    d1=ImageDraw.Draw(layer1)
    y_top=int(h*(0.20 + (idx%2)*0.03))
    y_bot=int(h*(0.56 + (idx%2)*0.02))
    poly1=[(0,y_top),(w,y_top-int(h*0.07)),(w,y_bot-int(h*0.06)),(0,y_bot)]
    sh1=Image.new('RGBA',(w,h),(0,0,0,0))
    ImageDraw.Draw(sh1).polygon([(px,py+int(h*0.008)) for px,py in poly1],fill=(20,28,32,45))
    sh1=sh1.filter(ImageFilter.GaussianBlur(max(6,int(w*0.015))))
    base.alpha_composite(sh1)
    d1.polygon(poly1,fill=rgba(pal['secondary'],130))
    base.alpha_composite(layer1)

    # Layer 2: Bottom warm craft band
    layer2=Image.new('RGBA',(w,h),(0,0,0,0))
    poly2=[(0,int(h*0.70)),(w,int(h*0.61)),(w,int(h*0.92)),(0,int(h*0.96))]
    sh2=Image.new('RGBA',(w,h),(0,0,0,0))
    ImageDraw.Draw(sh2).polygon([(px,py-int(h*0.006)) for px,py in poly2],fill=(20,28,32,35))
    sh2=sh2.filter(ImageFilter.GaussianBlur(max(6,int(w*0.012))))
    base.alpha_composite(sh2)
    ImageDraw.Draw(layer2).polygon(poly2,fill=rgba(pal['accent'],48))
    base.alpha_composite(layer2)

    # Subtle editorial halftone matrix in upper-right/lower-left accents
    d=ImageDraw.Draw(base)
    step=max(18,int(w*0.042))
    dot_r=max(1,int(w*0.003))
    for gx in range(int(w*0.05),int(w*0.95),step):
        for gy in range(int(h*0.25),int(h*0.68),step):
            if ((gx//step+gy//step)%2)==0:
                d.ellipse((gx,gy,gx+dot_r,gy+dot_r),fill=rgba(pal['dark'],24))

    # Add authentic paper fiber grain via numpy if available
    if np is not None:
        arr=np.array(base,dtype=np.int16)
        rng=np.random.default_rng(seed=idx+42)
        noise=rng.integers(-5,6,size=(h,w,1),dtype=np.int16)
        arr[:,:,:3]=np.clip(arr[:,:,:3]+noise,0,255)
        # Soft corner vignette for editorial depth
        yy,xx=np.mgrid[0:h,0:w]
        dist=np.sqrt(((xx-w/2)/(w*0.65))**2+((yy-h/2)/(h*0.65))**2)
        vig=np.clip(1.0-0.14*(dist**2),0.82,1.0)[:,:,None]
        arr[:,:,:3]=np.clip(arr[:,:,:3].astype(np.float32)*vig,0,255).astype(np.int16)
        base=Image.fromarray(arr.astype(np.uint8),mode='RGBA')
    return base

def ease(t):
    t=max(0.0,min(1.0,t)); return 1.0-(1.0-t)**3

def ease_out_back(t):
    t=max(0.0,min(1.0,t))
    c1=1.45
    c3=c1+1.0
    return 1.0+c3*(t-1.0)**3+c1*(t-1.0)**2

def paste_animated(dst,asset,cx,cy,scale=1,rotation=0,opacity=1):
    if scale<=0 or asset is None:return
    tw=max(1,int(asset.width*scale));th=max(1,int(asset.height*scale))
    z=asset.resize((tw,th),Image.Resampling.BICUBIC)
    if rotation:z=z.rotate(rotation,Image.Resampling.BICUBIC,expand=True)
    if opacity <1:
        a=z.getchannel('A').point(lambda v:int(v*max(0,min(1,opacity))))
        z.putalpha(a)
    dst.alpha_composite(z,(int(cx-z.width/2),int(cy-z.height/2)))

def make_static_scene(shot, idx,w,h,fp):
    pal=PALETTES[idx%len(PALETTES)].copy(); pal.update(shot.get('palette') or {})
    r=w/540
    # Pre-render 1.06x base texture for smooth zero-artifact Ken Burns zoom
    bw,bh=int(w*1.06),int(h*1.06)
    base=make_paper_texture(bw,bh,pal,idx)

    # Headline Card (Centered Editorial Typography + Washi Tape)
    cardw=int(w*.88); headh=int(h*.165)
    headline=Image.new('RGBA',(cardw+44,headh+48),(0,0,0,0))
    paper=draw_torn_card(cardw,headh,pal,seed=idx*11+1)
    headline.alpha_composite(paper,(6,12))
    hd=ImageDraw.Draw(headline)
    hfont,lines=fit_lines(hd,shot.get('headline',''),fp,cardw-48*r,2,initial=int(40*r),minimum=int(24*r))
    lh=int(hfont.size*1.36);top=12+16+(headh-len(lines)*lh)//2
    for li,line in enumerate(lines):
        lw=measure_mixed(hd,line,hfont)
        lx=6+16+(cardw-lw)//2
        draw_mixed(hd,(lx,top+li*lh),line,hfont,rgba(pal['dark']))
    tape1=draw_washi_tape(int(70*r),int(22*r),pal['accent'],alpha=175).rotate(14,expand=True,resample=Image.Resampling.BICUBIC)
    tape2=draw_washi_tape(int(64*r),int(20*r),pal['secondary'],alpha=185).rotate(-16,expand=True,resample=Image.Resampling.BICUBIC)
    headline.alpha_composite(tape1,(int(18*r),0))
    headline.alpha_composite(tape2,(cardw-int(42*r),int(2*r)))

    # Caption Card (Centered/Balanced + Top Tape)
    capw=int(w*.88); caph=int(h*.165)
    caption=Image.new('RGBA',(capw+44,caph+48),(0,0,0,0))
    cap_paper=draw_torn_card(capw,caph,pal,seed=idx*17+3)
    caption.alpha_composite(cap_paper,(6,12))
    cd=ImageDraw.Draw(caption)
    cfont,clines=fit_lines(cd,shot.get('caption',''),fp,capw-52*r,4,initial=int(27*r),minimum=int(18*r))
    lineh=int(cfont.size*1.32); y=12+16+max(4,(caph-len(clines)*lineh)//2)
    for c in clines:
        cw=measure_mixed(cd,c,cfont)
        cx=6+16+(capw-cw)//2
        draw_mixed(cd,(cx,y),c,cfont,rgba(pal['dark']))
        y+=lineh
    tape_cap=draw_washi_tape(int(88*r),int(20*r),pal['accent'],alpha=165).rotate(-2,expand=True,resample=Image.Resampling.BICUBIC)
    caption.alpha_composite(tape_cap,((capw+44-tape_cap.width)//2,int(2*r)))

    # Badge Stat Pill (Optional)
    badge=draw_badge_pill(shot.get('badge',''),fp,pal,r)

    # High-Resolution Subject Cutout (Avoid 500px downscale bottleneck!)
    art=shot.get('_resolved_art')
    target_box=int(w*0.80)
    if art:
        img=Image.open(art).convert('RGBA')
        img.thumbnail((target_box,target_box),Image.Resampling.LANCZOS)
        pad=int(24*r)
        main=Image.new('RGBA',(img.width+pad*2,img.height+pad*2),(0,0,0,0))
        main.alpha_composite(img,(pad,pad))
    else:
        emb=emblem(shot.get('motif','question'),pal)
        emb=emb.resize((target_box,target_box),Image.Resampling.LANCZOS)
        main=emb

    # Soft directional drop shadow matching native subject resolution
    shadow=Image.new('RGBA',main.size,(0,0,0,0));shadow.putalpha(main.getchannel('A'))
    shadow=shadow.filter(ImageFilter.GaussianBlur(max(8,int(14*r))))
    shadow_rgb=Image.new('RGBA',main.size,(0,0,0,0))
    shadow_rgb.paste((15,22,28,92),(0,0,*main.size),shadow.getchannel('A'))
    return {'pal':pal,'base':base,'heading':headline,'caption':caption,'badge':badge,'main':main,'shadow':shadow_rgb}

def render_scene(cache, progress,w,h,shot_index,total,shot_start,shot_length):
    r=w/540
    # Layer 1: Ken Burns subtle zoom crop from 1.06x base texture
    base=cache['base']
    bw,bh=base.size
    zoom=1.0+0.045*progress
    crop_w=int(bw/zoom)
    crop_h=int(bh/zoom)
    drift_x=int(math.sin(progress*math.pi+shot_index)*((bw-crop_w)*0.25))
    x0=max(0,min(bw-crop_w,(bw-crop_w)//2+drift_x))
    y0=max(0,min(bh-crop_h,(bh-crop_h)//2))
    im=base.crop((x0,y0,x0+crop_w,y0+crop_h)).resize((w,h),Image.Resampling.BILINEAR)

    d=ImageDraw.Draw(im)
    # Layer 2: Parallax floating geometric accents
    pan=int(math.sin(progress*2.4+shot_index)*18*r)
    d.polygon([(int(w*.04)+pan,int(h*.61)),(int(w*.26)+pan,int(h*.585)),(int(w*.28)+pan,int(h*.625)),(int(w*.06)+pan,int(h*.65))],fill=rgba(cache['pal']['accent'],185))
    d.polygon(star_points(int(w*.13)-pan//2,int(h*.50),int(w*.042),int(w*.019),5,progress*0.5),fill=rgba(cache['pal']['accent']),outline=rgba(cache['pal']['dark']))
    d.polygon(star_points(int(w*.88)+pan//2,int(h*.36),int(w*.035),int(w*.016),5,-progress*0.4),fill=rgba('#FFFDF6'),outline=rgba(cache['pal']['dark']))

    # Layer 3: Hero 3D Papercraft Cutout with Spring Bounce + Breathing Hover
    enter_spring=ease_out_back(min(1.0,progress*4.0))
    enter_card=ease(min(1.0,progress*5.2))
    bob=math.sin(progress*math.tau*1.2)*8*r
    cx=w*0.50+math.sin(progress*math.pi*1.1+shot_index)*8*r
    cy=h*0.495+bob+(1.0-enter_spring)*110*r
    sub_scale=(0.86+0.14*enter_spring)*(1.0+0.014*math.sin(progress*math.tau*0.8))
    tilt=math.sin(progress*math.tau*0.9)*1.3

    # Dynamic elevation shadow (synchronized opacity with hero cutout)
    sub_opacity=max(0.25,min(1.0,progress*9.0))
    sh_off_x=10*r+bob*0.25
    sh_off_y=16*r+bob*0.45
    sh_opacity=max(0.45,min(0.85,0.72-bob*0.008))*sub_opacity
    paste_animated(im,cache['shadow'],cx+sh_off_x,cy+sh_off_y,scale=sub_scale*1.02,rotation=tilt,opacity=sh_opacity)
    paste_animated(im,cache['main'],cx,cy,scale=sub_scale,rotation=tilt,opacity=sub_opacity)

    # Layer 4: Floating Data Badge Pill (Staggered pop-in)
    if cache['badge'] is not None:
        b_prog=max(0.0,min(1.0,(progress-0.05)*4.5))
        b_spring=ease_out_back(b_prog)
        if b_prog>0:
            paste_animated(im,cache['badge'],w*0.50,h*0.275+(1.0-b_spring)*24*r,scale=0.75+0.25*b_spring,rotation=-2.0,opacity=min(1.0,b_prog*2.5))

    # Layer 5: Crisp Steady Editorial Headline & Caption Cards
    hy=h*0.148-(1.0-enter_card)*h*0.12
    paste_animated(im,cache['heading'],w*0.50,hy,scale=1.0,rotation=-0.8)
    cy_card=h*0.815+(1.0-enter_card)*h*0.10
    paste_animated(im,cache['caption'],w*0.50,cy_card,scale=1.0,rotation=0.5)

    # Top progress indicator inside safe zone
    d=ImageDraw.Draw(im)
    pw=int(w*0.82); left=(w-pw)//2
    py1,py2=int(h*0.042),int(h*0.048)
    d.rounded_rectangle((left,py1,left+pw,py2),radius=max(3,int(4*r)),fill=rgba(cache['pal']['dark'],45))
    fillw=max(int(8*r),int(pw*(shot_index+progress)/total))
    d.rounded_rectangle((left,py1,left+fillw,py2),radius=max(3,int(4*r)),fill=rgba(cache['pal']['accent']))
    return im.convert('RGB')

def fmt_srt_time(seconds):
    ms=round(seconds*1000); hh,ms=divmod(ms,3600000);mm,ms=divmod(ms,60000);ss,ms=divmod(ms,1000)
    return f'{hh:02d}:{mm:02d}:{ss:02d},{ms:03d}'

def inspect_story(story):
    if not isinstance(story,dict):raise ValueError('storyboard JSON must be object')
    shots=story.get('shots')
    if not isinstance(shots,list) or not shots:raise ValueError('Expected nonempty shots array')
    if len(shots)>40:raise ValueError('Too many shots (max 40)')
    for n,s in enumerate(shots):
        if not isinstance(s,dict):raise ValueError(f'shot {n+1} is not an object')
        if not isinstance(s.get('duration'),(float,int)) or not (1<=s['duration']<=180):raise ValueError(f'shot {n+1}: duration must be 1..180 seconds')
        if not str(s.get('headline','')).strip():raise ValueError(f'shot {n+1}: headline required')
        if not str(s.get('caption','')).strip():raise ValueError(f'shot {n+1}: caption required')
        for k in ['headline','caption']:
            if len(s[k])>450: raise ValueError(f'shot {n+1}: {k} too long')
    return shots

def audio_mux(video,audio,music,out,duration):
    inputs=['-i',str(video)]
    if audio:inputs+=['-i',str(audio)]
    if music:inputs+=['-i',str(music)]
    filters=[]
    if audio and music:
        filters += [f'[1:a]apad,atrim=0:{duration:.3f},volume=1.0[v]',
                    f'[2:a]apad,atrim=0:{duration:.3f},volume=0.24[m]',
                    '[v][m]amix=inputs=2:duration=longest:normalize=0[a]']
    elif audio:filters += [f'[1:a]apad,atrim=0:{duration:.3f}[a]']
    else:filters += [f'[1:a]apad,atrim=0:{duration:.3f},volume=0.50[a]']
    cmd=['ffmpeg','-hide_banner','-loglevel','error','-y',*inputs,'-filter_complex',';'.join(filters),'-map','0:v:0','-map','[a]','-c:v','copy','-c:a','aac','-b:a','160k','-movflags','+faststart','-t',f'{duration:.3f}',str(out)]
    subprocess.run(cmd,check=True)

def main():
    ap=argparse.ArgumentParser(description='Render offline Thai paper-collage MP4 without paid APIs.')
    ap.add_argument('--storyboard',required=True)
    ap.add_argument('--output',default='out/short.mp4')
    ap.add_argument('--width',type=int,default=1080)
    ap.add_argument('--fps',type=int,default=24)
    ap.add_argument('--font',default=None,help='Path to a locally installed Thai font (not bundled)')
    ap.add_argument('--style',default=None,help='Optional style-profile JSON with palettes')
    ap.add_argument('--audio',help='Optional local narration recording MP3/WAV/M4A')
    ap.add_argument('--tts',choices=['auto','gemini','edge'],default=None,help='Auto-generate Thai narration using Google AI Studio Gemini TTS or Edge TTS')
    ap.add_argument('--voice',default='Puck',help='Voice for TTS (Puck, Aoede, Zephyr, Kore, Fenrir, th-TH-NiwatNeural, etc.)')
    ap.add_argument('--tts-style',default=None,help='Style or emotional delivery for Google AI Studio TTS (e.g. exciting, thrilling, dramatic)')
    ap.add_argument('--sync-duration',action='store_true',default=True,help='Sync visual shot duration to voiceover speech length (default: True)')
    ap.add_argument('--no-sync-duration',dest='sync_duration',action='store_false',help='Do not sync shot duration to voiceover')
    ap.add_argument('--music',help='Path to audio music, or auto for original locally synthesized underscore')
    ap.add_argument('--art',choices=['auto','none'],default=None,help='Auto-generate bespoke 3D papercraft transparent cutouts for shots missing art')
    ap.add_argument('--sticker-border',action='store_true',help='Add a white paper die-cut border around generated cutouts')
    ap.add_argument('--preview',action='store_true',help='Fast preview at 540px width, 12fps')
    args=ap.parse_args()
    if args.preview:args.width=540;args.fps=12
    if args.width<240 or args.width>2160:ap.error('width must be 240..2160')
    if args.fps<1 or args.fps>60:ap.error('fps must be 1..60')
    require_executable('ffmpeg');require_executable('ffprobe')
    storypath=Path(args.storyboard)
    if args.art=='auto':
        try:
            from generate_scene_art import generate_storyboard_art
        except ImportError:
            sys.path.insert(0, str(Path(__file__).parent))
            from generate_scene_art import generate_storyboard_art
        generate_storyboard_art(storypath, sticker_border=args.sticker_border)
    story=json.loads(storypath.read_text(encoding='utf-8-sig'))
    shots=inspect_story(story)
    for shot in shots:
        if shot.get('art'):
            ar=(storypath.parent/shot['art']).resolve()
            if not ar.is_file():raise FileNotFoundError(f'Custom art not found: {ar}')
            if ar.suffix.lower() not in {'.png','.webp','.jpg','.jpeg'}:
                raise ValueError(f'Custom art must be PNG/WEBP/JPG: {ar}')
            shot['_resolved_art']=str(ar)
    if args.style:
        global PALETTES
        profile=json.loads(Path(args.style).read_text(encoding='utf-8-sig'))
        pal=profile.get('palettes')
        if not isinstance(pal,list) or not pal:raise ValueError('Style needs non-empty palettes array')
        required={'bg','dark','accent','secondary','paper'}
        for i,p in enumerate(pal):
            if not required.issubset(p):raise ValueError(f'Style palette {i} missing {required-set(p)}')
            for key in required:hexrgb(p[key])
        PALETTES=pal
    out=Path(args.output);out.parent.mkdir(parents=True,exist_ok=True)
    w=args.width;h=w*16//9;fp=font_path(args.font)
    print('Thai font:',fp or 'NOT FOUND')
    if not fp:raise RuntimeError('Install Noto Sans Thai or use --font')

    if args.tts and not args.audio:
        try:
            from generate_tts import generate_storyboard_narration
        except ImportError:
            sys.path.insert(0, str(Path(__file__).parent))
            from generate_tts import generate_storyboard_narration
        tts_wav = out.with_name(out.stem + '-narration.wav')
        prefer_gemini = (args.tts != 'edge')
        print(f"🎙️ Auto-synthesizing Thai narration with Google AI Studio / {args.tts} TTS (voice: '{args.voice}')...")
        narr_file, shots = generate_storyboard_narration(
            shots, tts_wav, voice=args.voice, prefer_gemini=prefer_gemini, sync_duration=args.sync_duration, style=args.tts_style
        )
        args.audio = str(narr_file)

    segments=[];f=0
    for s in shots:
        n=max(1,round(float(s['duration'])*args.fps));segments.append((s,f,n));f+=n
    duration=f/args.fps
    scene_cache=[make_static_scene(s,i,w,h,fp) for i,(s,_,_) in enumerate(segments)]
    temp=out.parent/(out.stem+'.tmpvideo.mp4')
    cmd=['ffmpeg','-hide_banner','-loglevel','error','-y','-f','rawvideo','-pix_fmt','rgb24','-s',f'{w}x{h}','-r',str(args.fps),'-i','pipe:0','-an','-c:v','libx264','-preset','veryfast','-crf','20','-pix_fmt','yuv420p','-movflags','+faststart',str(temp)]
    proc=subprocess.Popen(cmd,stdin=subprocess.PIPE)
    frames=[];current=0
    try:
        for i,(shot,start,n) in enumerate(segments):
            for t in range(n):
                progress=t/max(1,n)
                frame=render_scene(scene_cache[i],progress,w,h,i,len(segments),start,n)
                if t<max(1,int(.22*args.fps)) and i>0:
                    # crossfade of previous tail into incoming shot
                    fade=min(1,t/max(1,int(.22*args.fps)))
                    prev=render_scene(scene_cache[i-1],1,w,h,i-1,len(segments),0,n)
                    frame=Image.blend(prev,frame,fade)
                if len(frames)<8 and (t==0 or t==n//2):frames.append(frame.resize((270,480)))
                proc.stdin.write(frame.tobytes())
                current+=1
                if current%max(1,(args.fps*5))==0:print(f'Rendered {current}/{f} frames',flush=True)
    except (BrokenPipeError,Exception):
        proc.kill();raise
    finally:
        try:proc.stdin.close()
        except Exception:pass
    rc=proc.wait()
    if rc!=0:raise RuntimeError(f'ffmpeg failed, exit {rc}')
    musicfile=None
    if args.music=='auto':
        from make_music import make_music
        musicfile=make_music(out.with_name(out.stem+'-original-bgm.wav'),duration)
    elif args.music:
        musicfile=Path(args.music)
        if not musicfile.is_file():raise FileNotFoundError(args.music)
    if args.audio and not Path(args.audio).is_file():raise FileNotFoundError(args.audio)
    if args.audio or musicfile:
        audio_mux(temp,args.audio,musicfile,out,duration)
        temp.unlink(missing_ok=True)
    else:temp.replace(out)
    # Captions for later recording / editor import
    srt=[]
    for i,(shot,start,n) in enumerate(segments,1):
        srt += [str(i),f'{fmt_srt_time(start/args.fps)} --> {fmt_srt_time((start+n)/args.fps)}',str(shot['caption']).strip(),'']
    out.with_suffix('.srt').write_text('\n'.join(srt),encoding='utf-8-sig')
    if frames:
        canvas=Image.new('RGB',(270*min(4,len(frames)),480*math.ceil(len(frames)/4)),(255,255,255))
        for j,im in enumerate(frames):canvas.paste(im,((j%4)*270,(j//4)*480))
        canvas.save(out.with_name(out.stem+'-contact-sheet.jpg'),quality=86)
    probe=subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration:stream=codec_name,width,height,r_frame_rate','-of','json',str(out)],text=True)
    meta=json.loads(probe)
    out.with_suffix('.qa.json').write_text(json.dumps({'output':str(out),'expected_duration':duration,'actual':meta,'audio_mode':'narration' if args.audio else ('music-only' if musicfile else 'none')},ensure_ascii=False,indent=2),encoding='utf-8')
    print('OK:',out,'duration=',round(duration,2),'fps=',args.fps,'resolution=',f'{w}x{h}','narration=',bool(args.audio),'music=',bool(musicfile))

if __name__=='__main__':main()
