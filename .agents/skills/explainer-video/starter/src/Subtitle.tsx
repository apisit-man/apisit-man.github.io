import React from "react";
import { interpolate } from "remotion";
import { C, FONT } from "./theme";

/** Shows the line sentence by sentence, each for a share of the beat proportional to its length.
 *  The spans are also the anchors for in-beat camera moves and effects: a new voice take moves
 *  every word, so key the offsets to the span starts, not to literal frames. */
export function spans(line: string, voiceFrames: number): { text: string; start: number; end: number }[] {
  const parts = line.split(/(?<=[.!?])\s+/).filter(Boolean);
  const total = parts.reduce((n, p) => n + p.length, 0) || 1;
  let acc = 0;
  return parts.map((p) => {
    const start = (acc / total) * voiceFrames;
    acc += p.length;
    return { text: p, start, end: (acc / total) * voiceFrames };
  });
}

export const Subtitle: React.FC<{ line: string; speaker: string; local: number; voiceFrames: number }> = ({
  line, speaker, local, voiceFrames,
}) => {
  const ss = spans(line, voiceFrames);
  if (ss.length === 0) return null;
  let i = 0;
  ss.forEach((sp, n) => { if (local >= sp.start) i = n; });
  const s = ss[i];
  const enter = interpolate(local - s.start, [0, 6], [0, 1], { extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 42, display: "flex", justifyContent: "center" }}>
      <div
        style={{
          maxWidth: 1560, padding: "16px 34px", borderRadius: 26, background: "rgba(10,8,25,0.62)",
          border: `2px solid ${speaker === "narrator" ? "rgba(245,236,215,0.18)" : "rgba(232,185,74,0.45)"}`,
          fontFamily: FONT, fontWeight: 700, fontSize: 54, lineHeight: 1.2,
          color: speaker === "narrator" ? C.cream : C.mustard, textAlign: "center",
          opacity: enter, transform: `translateY(${(1 - enter) * 18}px)`,
        }}
      >
        {s.text}
      </div>
    </div>
  );
};
