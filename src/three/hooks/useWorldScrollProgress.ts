"use client";
import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSceneStore } from "../store";

gsap.registerPlugin(ScrollTrigger);

// Each world's camera path is a slice of scroll driven by its own
// ScrollTrigger against its own DOM scroll-track element (Core
// Experience Engine §2) — reads through the same Lenis-fed ScrollTrigger
// set up by useLenisScroll, not a second scroll system.
export function useWorldScrollProgress(trackRef: RefObject<HTMLElement | null>) {
  const setWorldProgress = useSceneStore((s) => s.setWorldProgress);

  useEffect(() => {
    if (!trackRef.current) return;
    const st = ScrollTrigger.create({
      trigger: trackRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => setWorldProgress(self.progress),
    });
    return () => st.kill();
  }, [trackRef, setWorldProgress]);
}
