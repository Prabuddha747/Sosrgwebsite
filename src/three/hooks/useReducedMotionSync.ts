"use client";
import { useEffect } from "react";
import { useSceneStore } from "../store";

// Syncs prefers-reduced-motion into the shared store once, at the layout
// level — every world reads store.reducedMotion rather than each
// standing up its own matchMedia listener.
export function useReducedMotionSync() {
  const setReducedMotion = useSceneStore((s) => s.setReducedMotion);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [setReducedMotion]);
}
