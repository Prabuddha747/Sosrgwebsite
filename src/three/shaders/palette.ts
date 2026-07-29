// Mixes two colors by t — every world's core-to-edge color logic uses
// this instead of inline mix() math scattered per-shader.
export const paletteGLSL = /* glsl */ `
vec3 paletteMix(vec3 core, vec3 edge, float t) {
  return mix(core, edge, clamp(t, 0.0, 1.0));
}
`;
