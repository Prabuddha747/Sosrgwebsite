// Soft radial-edge helper — every particle/glow shader mixes this in for
// falloff instead of a hard-edged circle.
export const falloffGLSL = /* glsl */ `
float softFalloff(float dist, float radius, float softness) {
  return 1.0 - smoothstep(radius - softness, radius, dist);
}
`;
