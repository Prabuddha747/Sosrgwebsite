"use client";
import { useEffect, useState } from "react";

// Shared prefers-reduced-motion check for the docs3 homepage sections —
// every scroll-pinned/video section reads this instead of standing up
// its own matchMedia listener (docs3/calude2.md engineering standards).
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  return reduced;
}
