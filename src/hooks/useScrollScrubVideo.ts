"use client";
import { useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UseScrollScrubVideoOptions {
  /** Tall element defining the scroll distance for this section. */
  trackRef: RefObject<HTMLElement | null>;
  /** The element that gets pinned (usually the h-screen visual layer). */
  pinRef: RefObject<HTMLElement | null>;
  videoRef: RefObject<HTMLVideoElement | null>;
  reducedMotion: boolean;
  onProgress?: (progress: number) => void;
}

// Shared "pinned video + progress-driven overlay" scaffold (docs3/calude2.md
// engineering standards) — every scroll-scrubbed section syncs its clip's
// currentTime to scroll progress this same way instead of hand-rolling it.
export function useScrollScrubVideo({
  trackRef,
  pinRef,
  videoRef,
  reducedMotion,
  onProgress,
}: UseScrollScrubVideoOptions) {
  const onProgressRef = useRef(onProgress);
  onProgressRef.current = onProgress;

  useEffect(() => {
    if (reducedMotion) return;
    const track = trackRef.current;
    const pin = pinRef.current;
    const video = videoRef.current;
    if (!track || !pin || !video) return;

    const st = ScrollTrigger.create({
      trigger: track,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      pin,
      onUpdate: (self) => {
        onProgressRef.current?.(self.progress);
        if (video.duration) video.currentTime = self.progress * video.duration;
      },
    });

    return () => st.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);
}
