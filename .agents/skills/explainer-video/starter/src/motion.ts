export const FPS = 30;
export const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
export const sine = (frame: number, periodS: number, phase = 0) =>
  Math.sin((frame / FPS / periodS) * 2 * Math.PI + phase);
export const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

/** One-pole smoother: fast attack, slower release, so the mouth does not strobe on raw loudness. */
export function smoothEnv(env: number[], attack = 0.55, release = 0.22): number[] {
  const out: number[] = [];
  let y = 0;
  for (const x of env) {
    y += (x - y) * (x > y ? attack : release);
    out.push(y);
  }
  return out;
}

export type Mouth = "closed" | "open" | "wide";

/** Loudness -> mouth state with a minimum hold of 3 frames per state (no flicker). */
export function mouthStates(env: number[]): Mouth[] {
  const sm = smoothEnv(env);
  const out: Mouth[] = [];
  let cur: Mouth = "closed";
  let hold = 3;
  for (const v of sm) {
    const target: Mouth = v < 0.14 ? "closed" : v < 0.42 ? "open" : "wide";
    if (target !== cur && hold >= 3) {
      cur = target;
      hold = 0;
    } else {
      hold++;
    }
    out.push(cur);
  }
  return out;
}

const BLINK_GAPS_S = [2.4, 3.6, 3.0, 4.2, 3.3, 3.9, 2.8, 4.4];
/** Frame numbers where a blink starts (deterministic, irregular spacing). */
export const BLINK_STARTS: number[] = (() => {
  const out: number[] = [];
  let t = 1.1;
  for (let i = 0; i < 80; i++) {
    out.push(Math.round(t * FPS));
    t += BLINK_GAPS_S[i % BLINK_GAPS_S.length];
  }
  return out;
})();
export const isBlinking = (frame: number) => BLINK_STARTS.some((s) => frame >= s && frame < s + 4);

/** Clamp a camera move so a parallax layer that must fill the frame never uncovers its edge.
 *  depth < 1 moves the layer less than the camera, so the zoom must stay above 1 / (1 - depth)
 *  times the pan. Call this for every layer that reaches the frame edge. */
export function coverCam(zoom: number, panX: number, depth: number, width = 1920): [number, number] {
  const layerZoom = 1 + (zoom - 1) * depth;
  const maxPan = Math.max(0, (layerZoom - 1) * width * 0.5);
  return [zoom, clamp(panX, -maxPan, maxPan)];
}
