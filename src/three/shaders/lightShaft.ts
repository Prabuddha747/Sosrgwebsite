// Cheap stand-in for volumetric light — a noise-animated opacity mask on
// a billboarded plane, not a raymarched fog volume (deliberate budget
// tradeoff, see Prologue's Visual Bible "Environment" section for the
// ceiling/upgrade path). Depends on `snoise` (noise.ts) being included
// in the same shader.
export const lightShaftGLSL = /* glsl */ `
float lightShaftOpacity(vec2 uv, float time, float seed) {
  float vertical = smoothstep(1.0, 0.0, uv.y);
  float n = snoise(vec3(uv.x * 3.0, uv.y * 0.5 - time * 0.05, seed)) * 0.5 + 0.5;
  return vertical * n;
}
`;
