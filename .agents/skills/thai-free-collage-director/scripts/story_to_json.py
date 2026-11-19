#!/usr/bin/env python3
"""Deterministic one-paragraph importer; Antigravity should refine storyboards semantically."""
import argparse,json,re
from pathlib import Path
MOTIFS=['student','question','robot','bulb','book','plant','school','earth']

def parts_from_text(text):
    p=[x.strip(' \t\r\n-•') for x in re.split(r'[\r\n]+|(?<=[.!?。])\s*|\s*[;；]\s*',text) if x.strip()]
    if len(p)==1 and ' จากนั้น' in p[0]:p=[x.strip() for x in p[0].split(' จากนั้น') if x.strip()]
    if len(p)==1 and ' ต่อมา' in p[0]:p=[x.strip() for x in p[0].split(' ต่อมา') if x.strip()]
    return p[:12]

def build(text,duration,title=''):
    parts=parts_from_text(text)
    n=len(parts)
    shots=[]
    for i,p in enumerate(parts):
        # Titles should be set by the AI agent; avoid inventing plot details.
        headline=(title if i==0 and title else (p if len(p)<38 else f'ฉากที่ {i+1}'))
        shots.append({'duration':round(float(duration)/n,3),'headline':headline,'caption':p,'motif':MOTIFS[i%len(MOTIFS)]})
    return {'version':1,'title':title or 'เรื่องสั้นของฉัน','language':'th','aspect_ratio':'9:16','fps':24,'shots':shots}

def main():
    ap=argparse.ArgumentParser()
    g=ap.add_mutually_exclusive_group(required=True);g.add_argument('--text');g.add_argument('--file')
    ap.add_argument('--title',default='');ap.add_argument('--duration',type=float,default=30);ap.add_argument('--out',default='storyboard.json')
    a=ap.parse_args()
    text=a.text if a.text else Path(a.file).read_text(encoding='utf-8-sig')
    if not text.strip():ap.error('empty story')
    if a.duration<5:ap.error('duration must be >=5 seconds')
    obj=build(text,a.duration,a.title)
    Path(a.out).parent.mkdir(parents=True,exist_ok=True)
    Path(a.out).write_text(json.dumps(obj,ensure_ascii=False,indent=2),encoding='utf-8')
    print(f'Created {a.out} with {len(obj["shots"])} shots. Review/edit before full render.')
if __name__=='__main__':main()
