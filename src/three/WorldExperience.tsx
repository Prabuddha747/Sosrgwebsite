"use client";
import { PersistentCanvas } from "./PersistentCanvas";
import { PrologueWorld } from "./worlds/PrologueWorld";
import { AudioControl } from "./audio/AudioControl";
import { useReducedMotionSync } from "./hooks/useReducedMotionSync";
import { useLenisScroll } from "./hooks/useLenisScroll";
import { useSceneStore } from "./store";

// Mounted once by the (world) route group's layout. Only Prologue is
// registered so far — later worlds join here as their own docs2 process
// completes, per CLAUDE.md Section 8 ("one world at a time").
export function WorldExperience() {
  useReducedMotionSync();
  const reducedMotion = useSceneStore((s) => s.reducedMotion);
  useLenisScroll(!reducedMotion);

  return (
    <>
      <PersistentCanvas>
        <PrologueWorld />
      </PersistentCanvas>
      <AudioControl />
    </>
  );
}
