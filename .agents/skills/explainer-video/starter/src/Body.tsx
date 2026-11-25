import React from "react";
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import rawStoryboard from "../storyboard.json";
import envelopes from "./envelopes.json";
import { Backdrop } from "./Backdrop";
import { Character } from "./Character";
import { NarratorOrb } from "./NarratorOrb";
import { Subtitle } from "./Subtitle";
import { C } from "./theme";
import { FPS, easeInOut, mouthStates } from "./motion";
import type { Beat, Storyboard } from "./types";

const storyboard = rawStoryboard as Storyboard;
const GAP = Math.round(storyboard.gap_s * FPS);

/** Per beat: how the scene is staged. This is the file you edit for a new video.
 *  character = a folder in public/characters; omit it for a schematic cut (SVG shapes only).
 *  cam = [zoom from, zoom to, pan from, pan to] in px. backdrop = a file in public/. */
export type Cfg = {
  character?: string;
  pose?: string;
  x?: number;
  cam: [number, number, number, number];
  backdrop?: string;
  nod?: number;
  speakers?: string[]; // the speakers who are on screen and talk; default: the character
};
const DEFAULT: Cfg = { cam: [1.0, 1.05, 0, 0] };
const CFG: Record<string, Cfg> = {
  // b01: { character: "guide", pose: "rest", x: 520, cam: [1.0, 1.07, 0, -24], backdrop: "backgrounds/studio.png" },
};
const cfgOf = (id: string): Cfg => CFG[id] ?? DEFAULT;

type Slot = { beat: Beat; start: number; frames: number; prevPose: string };

/** Lay the chosen beats out one after another (the full video, or a sample of it). */
export function layout(ids?: string[]): { slots: Slot[]; total: number } {
  const beats = storyboard.beats.filter((b) => !ids || ids.includes(b.id));
  const slots: Slot[] = [];
  let t = 0;
  beats.forEach((beat, i) => {
    const frames = beat.frames + GAP;
    slots.push({
      beat, start: t, frames,
      prevPose: i === 0 ? (cfgOf(beat.id).pose ?? "rest") : (cfgOf(beats[i - 1].id).pose ?? "rest"),
    });
    t += frames;
  });
  return { slots, total: Math.max(t, 1) };
}

const BeatScene: React.FC<{ slot: Slot }> = ({ slot }) => {
  const local = useCurrentFrame();
  const { beat, start, frames, prevPose } = slot;
  const cfg = cfgOf(beat.id);
  const global = start + local;
  const env = (envelopes as Record<string, number[]>)[beat.id] ?? [];
  const states = React.useMemo(() => mouthStates(env.length ? env : [0]), [beat.id]);
  const f = Math.min(local, Math.max(0, env.length - 1));
  const speaking = local < beat.frames;
  const onScreen = (cfg.speakers ?? [cfg.character]).includes(beat.speaker);
  const k = easeInOut(Math.min(1, local / frames));
  const zoom = cfg.cam[0] + (cfg.cam[1] - cfg.cam[0]) * k;
  const pan = cfg.cam[2] + (cfg.cam[3] - cfg.cam[2]) * k;
  const fadeIn = interpolate(local, [0, 5], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ opacity: fadeIn }}>
      <Backdrop frame={global} zoom={zoom} panX={pan} image={cfg.backdrop} />
      <AbsoluteFill style={{ transform: `scale(${zoom}) translateX(${pan}px)`, transformOrigin: "50% 62%" }}>
        {cfg.character && (
          <Character name={cfg.character} pose={cfg.pose ?? "rest"} prevPose={prevPose}
            local={local} global={global} mouth={onScreen && speaking ? states[f] : "closed"}
            nod={cfg.nod} x={cfg.x ?? 960} />
        )}
        {!cfg.character && <NarratorOrb env={env[f] ?? 0} frame={global} active={speaking} />}
      </AbsoluteFill>
      <Subtitle line={beat.line} speaker={beat.speaker} local={local} voiceFrames={beat.frames} />
      <Audio src={staticFile(`voice-norm/${beat.id}.wav`)} />
    </AbsoluteFill>
  );
};

/** Music level per frame: low while anyone speaks, higher in the gaps, faded in and out.
 *  check-audio.py rule B caps the bed under the voice; if it fails in the gaps, lower HIGH. */
function musicVolume(slots: Slot[], total: number): (f: number) => number {
  const speech = slots.map((s) => [s.start, s.start + s.beat.frames] as const);
  const LOW = 0.12, HIGH = 0.22, RAMP = 9;
  return (f) => {
    let duck = 0;
    for (const [a, b] of speech) {
      duck = Math.max(duck, interpolate(f, [a - RAMP, a, b, b + RAMP], [0, 1, 1, 0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
    }
    const fade = Math.min(interpolate(f, [0, 30], [0, 1], { extrapolateRight: "clamp" }),
      interpolate(f, [total - 75, total], [1, 0], { extrapolateLeft: "clamp" }));
    return (HIGH + (LOW - HIGH) * duck) * fade;
  };
}

/** Sound effects per beat. `at` = fraction of the beat's voice length, `f` = absolute frame.
 *  Files: public/sfx, levelled to -30 dBFS active RMS by gen-sfx-set.py, so vol 0.35 puts an
 *  effect about 12 dB under speech. Give a short, sharp effect about twice that volume. */
type Cue = { file: string; at?: number; f?: number; vol: number };
const SFX: Record<string, Cue[]> = {
  // b01: [{ file: "whoosh_in", f: 2, vol: 0.35 }, { file: "tick", at: 0.6, vol: 0.7 }],
};

export const Body: React.FC<{ ids?: string[] }> = ({ ids }) => {
  const { slots, total } = layout(ids);
  const vol = React.useMemo(() => musicVolume(slots, total), [ids]);
  const hasMusic = storyboard.beats.length > 0;
  return (
    <AbsoluteFill style={{ background: C.ink }}>
      {hasMusic && <Audio src={staticFile("music.mp3")} volume={vol} />}
      {slots.map((s) => (
        <Sequence key={s.beat.id} from={s.start} durationInFrames={s.frames} layout="none">
          <Sequence from={0} durationInFrames={s.frames} name={s.beat.id}>
            <BeatScene slot={s} />
          </Sequence>
          {(SFX[s.beat.id] ?? []).map((c, k) => (
            <Sequence key={k} from={c.f ?? Math.round((c.at ?? 0) * s.beat.frames)} layout="none" name={`sfx ${c.file}`}>
              <Audio src={staticFile(`sfx/${c.file}.wav`)} volume={c.vol} />
            </Sequence>
          ))}
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
