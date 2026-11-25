import React from "react";
import { AbsoluteFill, Img, Series, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Body, layout } from "./Body";
import { C, FONT } from "./theme";

/** The frame (SKILL.md, step 5): an opening title card, the body untouched in the middle, a
 *  closing slide, and a corner logo over the body. The body is not retimed: the cards only add
 *  silence at the start and the end. Give check-audio.py --offset OPEN / 30 on the final video.
 *
 *  Brand: put the logo into public/brand/logo.png (and logo-white.png for the corner bug) and
 *  take the colours from the profile's brand.css. Without a logo the cards show type only. */
const B = {
  surface: C.cream,
  ink: C.navy,
  inkSoft: "#3E3450",
  muted: "#65697F",
  accent: C.mustard,
  ground: C.ink,
};

export const OPEN = 90; // 3 s
export const CLOSE = 120; // 4 s
const FADE = 12;

/** Project text. Move this into in/brief.md or the brand profile for a real video. */
export const TITLE = "Your explainer title";
export const TAGLINE = "One line that says what the viewer learns.";
export const CLAIM = "The claim or the call to action.";
export const URL = "example.com";
const LOGO: string | null = null; // "brand/logo.png" when the project has one
const BUG: string | null = null; // "brand/logo-white.png"

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const rise = (f: number, from: number) => interpolate(f, [from, from + 16], [0, 1], clamp);

const Logo: React.FC<{ style?: React.CSSProperties }> = ({ style }) =>
  LOGO ? <Img src={staticFile(LOGO)} style={{ height: 82, ...style }} /> : null;

const OpenCard: React.FC = () => {
  const f = useCurrentFrame();
  const out = interpolate(f, [OPEN - FADE, OPEN], [1, 0], clamp);
  const [head, rule, line] = [rise(f, 8), rise(f, 18), rise(f, 24)];
  return (
    <AbsoluteFill style={{ background: B.ground }}>
      <AbsoluteFill style={{ background: B.surface, opacity: out, overflow: "hidden" }}>
        <Logo style={{ position: "absolute", top: 102, left: 125 }} />
        <div style={{ position: "absolute", left: 125, right: 125, top: 540, transform: "translateY(-50%)" }}>
          <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 112, lineHeight: 1.05, letterSpacing: "-0.015em",
            color: B.ink, maxWidth: "18ch", opacity: head, transform: `translateY(${(1 - head) * 24}px)` }}>
            {TITLE}
          </div>
          <div style={{ width: 118 * rule, height: 10, borderRadius: 6, background: B.accent, margin: "59px 0 51px" }} />
          <div style={{ fontFamily: FONT, fontSize: 41, color: B.inkSoft, opacity: line }}>{TAGLINE}</div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const CloseCard: React.FC = () => {
  const f = useCurrentFrame();
  const inn = interpolate(f, [0, FADE], [0, 1], clamp);
  const [claim, rule, url] = [rise(f, 8), rise(f, 18), rise(f, 26)];
  return (
    <AbsoluteFill style={{ background: B.ground }}>
      <AbsoluteFill style={{ background: B.surface, opacity: inn, overflow: "hidden" }}>
        <Logo style={{ position: "absolute", top: 110, left: "50%", transform: "translateX(-50%)" }} />
        <div style={{ position: "absolute", left: 125, right: 125, top: 520, transform: "translateY(-50%)", textAlign: "center" }}>
          <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 92, letterSpacing: "-0.015em", color: B.ink,
            opacity: claim, transform: `translateY(${(1 - claim) * 20}px)` }}>
            {CLAIM}
          </div>
          <div style={{ width: 118 * rule, height: 10, borderRadius: 6, background: B.accent, margin: "47px auto" }} />
          <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 44, color: B.muted, opacity: url }}>{URL}</div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** Corner logo over the body. Bottom right, above the subtitle band, faded in and out. */
const Bug: React.FC<{ len: number }> = ({ len }) => {
  const f = useCurrentFrame();
  // the fade needs 10 + 20 in + 20 out + 10 frames; a shorter body (an empty storyboard) shows no logo
  if (!BUG || len <= 60) return null;
  const o = interpolate(f, [10, 30, len - 30, len - 10], [0, 1, 1, 0], clamp);
  return (
    <div style={{ position: "absolute", right: 40, bottom: 230, padding: "10px 16px", borderRadius: 12,
      background: "rgba(10,8,25,0.55)", opacity: 0.9 * o, lineHeight: 0 }}>
      <Img src={staticFile(BUG)} style={{ height: 34 }} />
    </div>
  );
};

export const framedTotal = (): number => OPEN + layout().total + CLOSE;

/** The full video: the body, unchanged and not retimed, between the two cards. */
export const Full: React.FC = () => {
  const body = layout().total;
  return (
    <AbsoluteFill style={{ background: B.ground }}>
      <Series>
        <Series.Sequence durationInFrames={OPEN} name="open card">
          <OpenCard />
        </Series.Sequence>
        <Series.Sequence durationInFrames={body} name="body">
          <Body />
          <Bug len={body} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={CLOSE} name="closing slide">
          <CloseCard />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
