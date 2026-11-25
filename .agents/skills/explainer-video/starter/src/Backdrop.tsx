import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { sine } from "./motion";
import { C } from "./theme";

/** A drawn backdrop, or the neutral gradient when the project has none yet.
 *  It moves at half the speed of the foreground: parallax. The file must cover the frame at
 *  every zoom and pan, so it is rendered oversized and clamped with coverCam (motion.ts). */
export const Backdrop: React.FC<{ frame: number; zoom: number; panX: number; image?: string }> = ({
  frame, zoom, panX, image,
}) => {
  const z = 1 + (zoom - 1) * 0.5;
  const beam = (phase: number, left: string) => ({
    position: "absolute" as const, top: -200, left, width: 520, height: 1500,
    background: "linear-gradient(180deg, rgba(232,185,74,0.16), rgba(232,185,74,0))",
    transform: `skewX(-18deg) translateX(${40 * sine(frame, 9, phase)}px)`, filter: "blur(30px)",
  });
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: C.ink }}>
      <AbsoluteFill style={{ transform: `scale(${z}) translateX(${panX * 0.5}px)` }}>
        {image ? (
          <Img src={staticFile(image)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <>
            <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 35%, #2d2760 0%, #17142e 58%, #0d0b1c 100%)" }} />
            <div style={beam(0, "12%")} />
            <div style={beam(2.1, "62%")} />
            <div style={{ position: "absolute", left: -200, right: -200, bottom: -260, height: 560, borderRadius: "50%",
              background: "radial-gradient(ellipse at 50% 0%, rgba(63,179,166,0.22), rgba(63,179,166,0) 68%)" }} />
          </>
        )}
      </AbsoluteFill>
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)" }} />
    </AbsoluteFill>
  );
};
