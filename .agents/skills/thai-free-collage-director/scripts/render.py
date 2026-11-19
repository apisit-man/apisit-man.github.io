#!/usr/bin/env python3
"""Offline, keyframe-driven Thai paper-collage video generator. MIT licensed."""
from __future__ import annotations
import argparse, json, math, os, shutil, subprocess, sys, tempfile, textwrap, unicodedata
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

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

def draw_mixed(draw,xy,text,thai_font,fill):
    """Keep shaping Thai in runs while using a Latin font for English/numbers."""
    latinpath=latin_font_path()
    latin=load_font(latinpath,thai_font.size) if latinpath else thai_font
    chunks=[]
    for ch in str(text):
        thai='\u0e00' <= ch <= '\u0e7f'
        if chunks and chunks[-1][0]==thai:chunks[-1]=(thai,chunks[-1][1]+ch)
        else:chunks.append((thai,ch))
    x,y=xy
    for is_thai,run in chunks:
        f=thai_font if is_thai else latin
        draw.text((x,y),run,font=f,fill=fill)
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

def draw_torn_card(w,h,pal,accent=False):
    im=Image.new('RGBA',(w+18,h+18),(0,0,0,0))
    dd=ImageDraw.Draw(im)
    p=[(8,12),(w//4,8),(w//2,10),(3*w//4,7),(w+3,13),(w+8,h//3),(w+4,2*h//3),(w+4,h+3),(3*w//4,h+7),(w//2,h+4),(w//4,h+7),(7,h+3),(5,2*h//3),(7,h//3)]
    dd.polygon(p,fill=rgba(pal['paper']))
    dd.line(p+[p[0]],fill=rgba('#DECFBB'),width=3,joint='curve')
    return im

def ease(t):
    t=max(0,min(1,t)); return 1-(1-t)**3

def paste_animated(dst,asset,cx,cy,scale=1,rotation=0,opacity=1):
    if scale<=0:return
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
    cardw=int(w*.90); headh=int(h*.205);capw=int(w*.88);caph=int(h*.167)
    base=Image.new('RGBA',(w,h),rgba(pal['bg']));d=ImageDraw.Draw(base)
    # Scattered halftones and original flat-paper shapes
    d.polygon([(0,int(h*.24)),(w,int(h*.15)),(w,int(h*.40)),(0,int(h*.49))],fill=rgba(pal['secondary'],135))
    d.polygon([(0,int(h*.73)),(w,int(h*.58)),(w,int(h*.87)),(0,int(h*.94))],fill=rgba(pal['accent'],50))
    for gx in range(18,w,27):
        for gy in range(int(h*.30),int(h*.62),27):
            if ((gx//27+gy//27)%3)<2:d.ellipse((gx,gy,gx+3,gy+3),fill=rgba(pal['dark'],36))
    d.ellipse((int(w*.63),int(h*.32),int(w*1.13),int(h*.63)),outline=rgba(pal['dark'],110),width=max(2,int(4*r)))
    d.line([(0,int(h*.73)),(w,int(h*.60))],fill=rgba(pal['dark'],100),width=max(2,int(3*r)))
    # paper headline/caption separate for motion
    headline=Image.new('RGBA',(cardw+24,headh+24),(0,0,0,0));hd=ImageDraw.Draw(headline)
    hd.rounded_rectangle((12,15,cardw+13,headh+17),radius=6,fill=(31,38,39,60))
    paper=draw_torn_card(cardw,headh,pal);headline.alpha_composite(paper,(4,0));hd=ImageDraw.Draw(headline)
    hfont,lines=fit_lines(hd,shot.get('headline',''),fp,cardw-44,3,initial=int(42*r),minimum=int(23*r))
    lh=int(hfont.size*1.42);top=max(7,(headh-len(lines)*lh)//2)
    for li,line in enumerate(lines):
        draw_mixed(hd,(30,top+li*lh),line,hfont,rgba(pal['dark']))
    caption=Image.new('RGBA',(capw+24,caph+24),(0,0,0,0));cd=ImageDraw.Draw(caption)
    cd.rounded_rectangle((12,13,capw+14,caph+19),radius=7,fill=(31,38,39,54))
    cap_paper=draw_torn_card(capw,caph,pal)
    caption.alpha_composite(cap_paper,(4,0));cd=ImageDraw.Draw(caption)
    cfont,clines=fit_lines(cd,shot.get('caption',''),fp,capw-44,4,initial=int(29*r),minimum=int(19*r))
    lineh=int(cfont.size*1.32); y=max(8,(caph-len(clines)*lineh)//2)
    for c in clines:draw_mixed(cd,(27,y),c,cfont,rgba(pal['dark']));y+=lineh
    art=shot.get('_resolved_art')
    if art:
        img=Image.open(art).convert('RGBA')
        # Letterbox transparent, preserve original aspect ratio.
        img.thumbnail((500,500),Image.Resampling.LANCZOS)
        main=Image.new('RGBA',(520,520),(0,0,0,0))
        main.alpha_composite(img,((520-img.width)//2,(520-img.height)//2))
    else:
        main=emblem(shot.get('motif','question'),pal)
    # Card shadow layer and sticker shadow, softened
    shadow=Image.new('RGBA',main.size,(0,0,0,0));shadow.putalpha(main.getchannel('A'))
    shadow=shadow.filter(ImageFilter.GaussianBlur(12))
    shadow_rgb=Image.new('RGBA',main.size,(0,0,0,0));shadow_rgb.paste((20,28,27,75),(0,0,*main.size),shadow.getchannel('A'))
    return {'pal':pal,'base':base,'heading':headline,'caption':caption,'main':main,'shadow':shadow_rgb}

def render_scene(cache, progress,w,h,shot_index,total,shot_start,shot_length):
    im=cache['base'].copy(); d=ImageDraw.Draw(im)
    r=w/540
    eased=ease(progress)
    # diagonal decorative strips gently move
    pan=int(math.sin(progress*3.2+shot_index)*15*r)
    d.polygon([(int(w*.04)+pan,int(h*.63)),(int(w*.28)+pan,int(h*.60)),(int(w*.30)+pan,int(h*.65)),(int(w*.06)+pan,int(h*.68))],fill=rgba(cache['pal']['accent'],195))
    d.polygon(star_points(int(w*.16),int(h*.52),int(w*.054),int(w*.025),5,progress*.25),fill=rgba(cache['pal']['accent']),outline=rgba(cache['pal']['dark']))
    d.polygon(star_points(int(w*.86),int(h*.40),int(w*.041),int(w*.019),5),fill=rgba('#FFFDF6'),outline=rgba(cache['pal']['dark']))
    # Sticker entrance: elastic-ish zoom, slow idle bob and tilt
    enter=ease(min(1,progress*7))
    bob=math.sin(progress*math.tau*1.8)*10*r
    x=w*.51+math.sin(progress*math.pi*1.3+shot_index)*14*r
    y=h*.475+bob+(1-enter)*180*r
    s=(w/680)*(0.80+0.10*enter+0.025*math.sin(progress*math.pi))
    paste_animated(im,cache['shadow'],x+11*r,y+16*r,scale=s*1.04,rotation=math.sin(progress*5)*2,opacity=.7)
    paste_animated(im,cache['main'],x,y,scale=s,rotation=math.sin(progress*math.tau)*2.5,opacity=1)
    # Headline slides down, caption slides upward
    hc=cache['heading']; cc=cache['caption']
    hy=h*.16-(1-enter)*h*.15
    paste_animated(im,hc,w*.51,hy,scale=1,rotation=-1.8+math.sin(progress*3)*.8)
    cy=h*.765+(1-enter)*h*.12
    paste_animated(im,cc,w*.5,cy,scale=1,rotation=1.2-math.sin(progress*2)*.6)
    # Tape details / progress / subtle brand header
    d=ImageDraw.Draw(im)
    pw=int(w*.81); left=(w-pw)//2
    d.rounded_rectangle((left,int(h*.045),left+pw,int(h*.051)),radius=4,fill=rgba(cache['pal']['dark'],50))
    fillw=max(2,int(pw*(shot_index+progress)/total))
    d.rounded_rectangle((left,int(h*.045),left+fillw,int(h*.051)),radius=4,fill=rgba(cache['pal']['accent']))
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
    ap.add_argument('--preview',action='store_true',help='Fast preview at 540px width, 12fps')
    args=ap.parse_args()
    if args.preview:args.width=540;args.fps=12
    if args.width<240 or args.width>2160:ap.error('width must be 240..2160')
    if args.fps<1 or args.fps>60:ap.error('fps must be 1..60')
    require_executable('ffmpeg');require_executable('ffprobe')
    storypath=Path(args.storyboard)
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
