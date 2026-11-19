#!/usr/bin/env python3
"""Generate a quiet original instrumental loop locally. No samples or licenses."""
import argparse, math, struct, wave
from pathlib import Path

def make_music(path,seconds,sr=22050):
    path=Path(path);path.parent.mkdir(parents=True,exist_ok=True)
    # Original, short pentatonic phrase; slow harmonic bed (not a copyrighted tune).
    freqs=[196.00,246.94,293.66,392.00,329.63,246.94,220.00,293.66]
    samples=int(float(seconds)*sr)
    with wave.open(str(path),'wb') as w:
        w.setnchannels(1);w.setsampwidth(2);w.setframerate(sr)
        buf=bytearray()
        for i in range(samples):
            t=i/sr
            chord_index=int(t//4)%4
            root=[146.83,174.61,196,164.81][chord_index]
            tone=(0.42*math.sin(2*math.pi*root*t)+.20*math.sin(2*math.pi*root*1.5*t)+.12*math.sin(2*math.pi*root*2*t))
            beatpos=t%1.75
            pluck=math.exp(-4*beatpos)*math.sin(2*math.pi*freqs[int(t//1.75)%8]*t)
            intro=min(1,t/.7);outro=min(1,(seconds-t)/.8)
            amp=.14*max(0,min(intro,outro))*(.64*tone+.36*pluck)
            buf.extend(struct.pack('<h',max(-32767,min(32767,int(amp*32767)))))
            if len(buf)>65536:w.writeframesraw(buf);buf.clear()
        if buf:w.writeframesraw(buf)
    return path

if __name__=='__main__':
    a=argparse.ArgumentParser();a.add_argument('--out',required=True);a.add_argument('--seconds',type=float,required=True);args=a.parse_args()
    print(make_music(args.out,args.seconds))
