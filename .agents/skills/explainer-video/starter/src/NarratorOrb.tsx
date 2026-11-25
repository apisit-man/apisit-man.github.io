import React from "react";
import { C } from "./theme";
import { sine } from "./motion";

/** The off-screen narrator, drawn as a ring of bars that follows the voice. */
export const NarratorOrb: React.FC<{ env: number; frame: number; active: boolean }> = ({ env, frame, active }) => {
  const N = 32;
  const e = active ? env : 0;
  return (
    <svg width={190} height={190} viewBox="-95 -95 190 190" style={{ position: "absolute", left: 80, top: 50, opacity: active ? 1 : 0.28 }}>
      <circle r={44 + e * 8} fill="rgba(232,185,74,0.16)" />
      <circle r={30 + e * 5} fill={C.mustard} />
      {Array.from({ length: N }).map((_, i) => {
        const a = (i / N) * Math.PI * 2;
        const h = 6 + e * 26 * (0.55 + 0.45 * Math.abs(sine(frame + i * 3, 0.5 + (i % 5) * 0.07, i)));
        return (
          <rect key={i} x={-2.5} y={-(52 + h)} width={5} height={h} rx={2.5} fill={C.cream}
            transform={`rotate(${(a * 180) / Math.PI})`} opacity={0.9} />
        );
      })}
    </svg>
  );
};
