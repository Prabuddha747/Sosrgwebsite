"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// The one scroll source of truth: Lenis drives smoothing, GSAP
// ScrollTrigger reads Lenis's scroll events, and every world's camera
// path is a ScrollTrigger against its own scroll-track element — never a
// second, competing scroll system. Disabled under reduced-motion, where
// native (unsmoothed, un-hijacked) scroll is the correct accessible
// fallback.
export function useLenisScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [enabled]);
}
