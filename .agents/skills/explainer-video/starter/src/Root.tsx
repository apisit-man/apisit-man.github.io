import React from "react";
import { Composition } from "remotion";
import { Body, layout } from "./Body";
import { Full, framedTotal } from "./Frame";
import { FPS } from "./motion";
import storyboard from "../storyboard.json";

import type { Storyboard } from "./types";

/** The sample holds the first beats, so a check render costs seconds, not minutes. */
const SAMPLE = (storyboard as Storyboard).beats.slice(0, 4).map((b) => b.id);

export const Root: React.FC = () => (
  <>
    {/* Full = the video with its frame: opening card, corner logo, closing slide */}
    <Composition id="Full" component={Full} width={1920} height={1080} fps={FPS}
      durationInFrames={framedTotal()} />
    {/* Body = the same video without the frame, for the audio check and quick iterations */}
    <Composition id="Body" component={Body} width={1920} height={1080} fps={FPS}
      durationInFrames={layout().total} defaultProps={{ ids: undefined }} />
    {SAMPLE.length > 0 && (
      <Composition id="Sample" component={Body} width={1920} height={1080} fps={FPS}
        durationInFrames={layout(SAMPLE).total} defaultProps={{ ids: SAMPLE }} />
    )}
  </>
);
