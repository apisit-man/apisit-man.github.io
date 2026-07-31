export function rand(min, max) { return Math.random() * (max - min) + min; }

export function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function dist(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }
export function lerp(a, b, t) { return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t }; }
export function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

export function orientation(a, b, c) {
  const v = (b.y - a.y) * (c.x - b.x) - (b.x - a.x) * (c.y - b.y);
  if (Math.abs(v) < 1e-7) return 0;
  return v > 0 ? 1 : 2;
}

export function onSegment(a, b, c) {
  return b.x <= Math.max(a.x, c.x) + 1e-7 && b.x >= Math.min(a.x, c.x) - 1e-7 &&
         b.y <= Math.max(a.y, c.y) + 1e-7 && b.y >= Math.min(a.y, c.y) - 1e-7;
}

export function segmentsIntersect(p1, q1, p2, q2) {
  const o1 = orientation(p1, q1, p2);
  const o2 = orientation(p1, q1, q2);
  const o3 = orientation(p2, q2, p1);
  const o4 = orientation(p2, q2, q1);
  if (o1 !== o2 && o3 !== o4) return true;
  if (o1 === 0 && onSegment(p1, p2, q1)) return true;
  if (o2 === 0 && onSegment(p1, q2, q1)) return true;
  if (o3 === 0 && onSegment(p2, p1, q2)) return true;
  if (o4 === 0 && onSegment(p2, q1, q2)) return true;
  return false;
}

export function pointToSegmentDistance(p, a, b) {
  const abx = b.x - a.x, aby = b.y - a.y;
  const len2 = abx * abx + aby * aby;
  if (len2 === 0) return dist(p, a);
  const t = clamp(((p.x - a.x) * abx + (p.y - a.y) * aby) / len2, 0, 1);
  return dist(p, { x: a.x + t * abx, y: a.y + t * aby });
}

// AABB check before segment intersection to improve performance
function boundingBoxIntersect(a1, a2, b1, b2) {
  return Math.min(a1.x, a2.x) <= Math.max(b1.x, b2.x) &&
         Math.max(a1.x, a2.x) >= Math.min(b1.x, b2.x) &&
         Math.min(a1.y, a2.y) <= Math.max(b1.y, b2.y) &&
         Math.max(a1.y, a2.y) >= Math.min(b1.y, b2.y);
}

export function segmentDistance(a, b, c, d) {
  if (boundingBoxIntersect(a, b, c, d) && segmentsIntersect(a, b, c, d)) return 0;
  return Math.min(
    pointToSegmentDistance(a, c, d),
    pointToSegmentDistance(b, c, d),
    pointToSegmentDistance(c, a, b),
    pointToSegmentDistance(d, a, b)
  );
}

export function polylineToPath(points) {
  if (!points.length) return "";
  return `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)} ` +
    points.slice(1).map(p => `L ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
}

export function simplifyPoints(points, minStep = 9) {
  if (points.length < 3) return points;
  const out = [points[0]];
  for (let i = 1; i < points.length - 1; i++) {
    if (dist(points[i], out[out.length - 1]) >= minStep) out.push(points[i]);
  }
  out.push(points[points.length - 1]);
  return out;
}
