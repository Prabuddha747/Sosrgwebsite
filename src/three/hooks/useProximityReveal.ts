"use client";
import { useEffect, useRef, useState } from "react";

interface ProximityRevealOptions {
  radius?: number;
  dwellMs?: number;
  onReveal?: () => void;
  onHide?: () => void;
}

// Attention, not clicks, is the currency (Creative Direction Doc §5):
// dwell time near a target reveals it. World-agnostic — every world
// passes its own target/content into this same hook rather than
// reinventing hover-reveal logic.
export function useProximityReveal(
  targetNDC: { x: number; y: number } | null,
  pointerNDC: { x: number; y: number },
  { radius = 0.35, dwellMs = 250, onReveal, onHide }: ProximityRevealOptions = {}
) {
  const [revealed, setRevealed] = useState(false);
  const dwellStart = useRef<number | null>(null);

  useEffect(() => {
    if (!targetNDC) return;
    const dist = Math.hypot(pointerNDC.x - targetNDC.x, pointerNDC.y - targetNDC.y);
    const near = dist <= radius;

    if (near) {
      if (dwellStart.current === null) dwellStart.current = performance.now();
      const elapsed = performance.now() - dwellStart.current;
      if (elapsed >= dwellMs && !revealed) {
        setRevealed(true);
        onReveal?.();
      }
    } else {
      dwellStart.current = null;
      if (revealed) {
        setRevealed(false);
        onHide?.();
      }
    }
  }, [pointerNDC.x, pointerNDC.y, targetNDC, radius, dwellMs, revealed, onReveal, onHide]);

  return revealed;
}
