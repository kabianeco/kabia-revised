/**
 * The intro's easing.
 *
 * This module used to carry the whole almond timeline — the transition
 * windows, the piecewise tracks, and the two stage presets that the WebGL
 * sculpture and the DOM copy layers were choreographed against. The
 * sculpture is gone and the intro is now staged on looping footage, so all
 * that remains of it is the ramp the copy layers still ease on.
 */

export function clamp01(x: number) {
  return x < 0 ? 0 : x > 1 ? 1 : x;
}

export function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}
