"use client";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { useSceneStore } from "./store";

// Shared postprocessing — selective-feeling bloom (Apple-reveal-film
// reference) + a light vignette. First rung of the performance
// step-down ladder: disabled entirely on the "low" tier, reduced on
// "medium" (Core Experience Engine §9).
export function PostFX() {
  const performanceTier = useSceneStore((s) => s.performanceTier);

  if (performanceTier === "low") return null;

  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={performanceTier === "medium" ? 0.5 : 0.85}
        luminanceThreshold={0.15}
        luminanceSmoothing={0.4}
        mipmapBlur
      />
      <Vignette eskil={false} offset={0.25} darkness={0.65} />
    </EffectComposer>
  );
}
