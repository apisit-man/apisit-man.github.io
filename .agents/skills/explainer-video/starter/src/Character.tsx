import React, { useMemo } from "react";
import { Img, staticFile, interpolate, spring, useVideoConfig } from "remotion";
import { clamp, easeInOut, isBlinking, Mouth, sine } from "./motion";

/** A drawn character: one body per pose, one head per mouth state, all on the same 1024 px canvas.
 *  Files: public/characters/<name>/body-<pose>.png and head-<closed|open|wide|blink>.png.
 *  The head is a separate layer, so a mouth swap never moves the body and the face cannot drift. */
type Props = {
  name: string;
  pose: string;
  prevPose: string;
  /** frame inside the beat (pose crossfade + settle) */
  local: number;
  /** frame on the whole timeline (idle motion never restarts at a cut) */
  global: number;
  mouth: Mouth;
  /** extra head motion in px for a nod, 0 = none */
  nod?: number;
  x: number; // centre of the feet on screen
  y?: number; // feet line on screen
  canvas?: number; // display size of the 1024 px drawing
  feetY?: number; // the feet line inside the 1024 px drawing
};

const HEADS = ["closed", "open", "wide", "blink"] as const;

export const Character: React.FC<Props> = ({
  name, pose, prevPose, local, global, mouth, nod = 0, x, y = 912, canvas = 880, feetY = 912,
}) => {
  const { fps } = useVideoConfig();
  const K = canvas / 1024;
  const feet = feetY * K;
  const t = clamp(local / 8, 0, 1);
  const fade = easeInOut(t);
  const changed = pose !== prevPose;
  // anticipation -> settle: a small squash when the pose changes, then spring back
  const pop = changed ? spring({ frame: local, fps, config: { damping: 8, stiffness: 140 } }) : 0;
  const squash = changed ? interpolate(local, [0, 4, 9], [0, 0.03, 0], { extrapolateRight: "clamp" }) : 0;
  const popScale = 1 + (changed ? (pop - 1) * 0.035 : 0);

  // independent idle layers: breath, sway, head bob and tilt, each with its own period and phase
  const breath = 1 + 0.006 * sine(global, 3.1);
  const sway = 0.5 * sine(global, 4.3, 1.1);
  const bobY = 3 * sine(global, 2.3, 0.4) + (nod ? nod * Math.abs(sine(local, 0.9)) : 0);
  const tilt = clamp(1.2 * sine(global, 3.7, 2.0) + (mouth === "wide" ? 0.7 : mouth === "open" ? 0.3 : 0), -2.5, 2.5);

  const headFace = isBlinking(global) && mouth === "closed" ? "blink" : mouth;
  const bodyStyle: React.CSSProperties = { position: "absolute", left: 0, top: 0, width: canvas, height: canvas };
  const headSrc = useMemo(() => HEADS.map((h) => staticFile(`characters/${name}/head-${h}.png`)), [name]);

  return (
    <div
      style={{
        position: "absolute", left: x - canvas / 2, top: y - feet, width: canvas, height: canvas,
        transformOrigin: `50% ${feet}px`,
        transform: `rotate(${sway}deg) scale(${popScale * (1 - squash)}, ${breath * popScale * (1 + squash * 0.5)})`,
      }}
    >
      {/* soft contact shadow, drawn in code so it follows the figure (the drawn one is cut away) */}
      <div
        style={{
          position: "absolute", left: canvas * 0.28, top: feet - 18, width: canvas * 0.44, height: 36,
          borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,0,0,0.45), rgba(0,0,0,0) 70%)",
        }}
      />
      {changed && t < 1 && (
        <Img src={staticFile(`characters/${name}/body-${prevPose}.png`)} style={bodyStyle} />
      )}
      <Img src={staticFile(`characters/${name}/body-${pose}.png`)}
        style={{ ...bodyStyle, opacity: !changed || t >= 1 ? 1 : fade }} />
      <div style={{ ...bodyStyle, transformOrigin: `${512 * K}px ${530 * K}px`, transform: `translateY(${bobY}px) rotate(${tilt}deg)` }}>
        {HEADS.map((h, i) => (
          <Img key={h} src={headSrc[i]} style={{ ...bodyStyle, opacity: h === headFace ? 1 : 0 }} />
        ))}
      </div>
    </div>
  );
};
