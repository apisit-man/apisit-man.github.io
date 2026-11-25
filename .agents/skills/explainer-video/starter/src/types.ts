/** The storyboard fields the renderer reads. scripts/regen-voices.py writes the timings. */
export type Beat = {
  id: string;
  speaker: string;
  line: string;
  tag?: string;
  scene?: string;
  shot?: string;
  camera?: string;
  frames: number;
  start_frame?: number;
  voice_s?: number;
};

export type Storyboard = {
  gap_s: number;
  voices: Record<string, { voice_id: string }>;
  beats: Beat[];
};
