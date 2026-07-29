"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useSceneStore, type PerformanceTier } from "../store";

const SAMPLE_WINDOW = 60;

// Samples rolling frame delta inside the canvas; steps the shared tier
// down (never back up mid-session — a step-up would just thrash) when
// sustained fps drops. Consumers (PostFX, ParticleField) read
// performanceTier and reduce their own cost — this hook only measures.
export function usePerformanceTier() {
  const deltas = useRef<number[]>([]);
  const tierRef = useRef<PerformanceTier>("high");
  const setPerformanceTier = useSceneStore((s) => s.setPerformanceTier);

  useFrame((_, delta) => {
    const arr = deltas.current;
    arr.push(delta);
    if (arr.length < SAMPLE_WINDOW) return;

    const avgFps = 1 / (arr.reduce((a, b) => a + b, 0) / arr.length);
    arr.length = 0;

    let next = tierRef.current;
    if (tierRef.current === "high" && avgFps < 45) next = "medium";
    else if (tierRef.current === "medium" && avgFps < 30) next = "low";

    if (next !== tierRef.current) {
      tierRef.current = next;
      setPerformanceTier(next);
    }
  });
}
