// Layered-noise vertex displacement — the shared "living geometry"
// primitive. Three inputs, composited: a constant ambient pulse (so
// nothing is ever static, even with zero interaction), an audio-reactive
// pulse (driven by the AudioManager's AnalyserNode), and a transition
// pulse gated by a crack/seam mask (directed displacement for a world's
// entry/exit moment — e.g. Prologue's seed cracking open).
//
// Depends on `snoise` (noise.ts) being included in the same shader.
export const morphGLSL = /* glsl */ `
float morphDisplacement(
  vec3 position,
  float time,
  float ambientPulse,
  float audioPulse,
  float transitionProgress,
  float crackMask
) {
  float n = snoise(position * 2.0 + time * 0.15);
  float baseAmp = 0.04 + ambientPulse * 0.02 + audioPulse * 0.05;
  float crackAmp = crackMask * transitionProgress * 0.4;
  return n * (baseAmp + crackAmp);
}
`;
