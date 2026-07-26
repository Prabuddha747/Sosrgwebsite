"use client";

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Known durations of the processed clips in /public/hero.
const LIGHT_DURATION = 10.16;

// The camera clip is real gear b-roll with two on-screen-text hotspots —
// an LCD info panel (~1.2-3s: "Blackmagic", "TIMECODE", "LOCK") and a
// CONTRAST/PEAKING dial closeup (~15.7-17.2s) — confirmed via frame
// extraction at 0.5s resolution. Both sit right at the clip's edges, so
// scrubbing only this inner window keeps the warm tally-light + lens/bokeh
// footage (which is what actually reads as ambience) and never reaches
// either hotspot. No blur needed — full sharpness stays.
const CAMERA_CLEAN_START = 3.2;
const CAMERA_CLEAN_END = 15.3;
const CAMERA_CLEAN_DURATION = CAMERA_CLEAN_END - CAMERA_CLEAN_START;

// Boosted brightness/contrast — the original grade read too dark once
// layered behind semi-opaque sections and a vignette.
const GRADE_FILTER = 'saturate(0.9) contrast(1.15) sepia(0.16) hue-rotate(-8deg) brightness(1.12)';

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const rampIn = (p: number, start: number, end: number) => clamp01((p - start) / (end - start));

// Maps a scroll-progress zone to a smooth forward/backward/forward... pass
// through a clip, so the same short footage genuinely gets seen many times
// across a long page instead of being stretched thin over one slow linear
// creep. Each pass boundary meets the next at the same currentTime, so
// there's no jump, restart, or hard loop — just a continuous reversal,
// exactly like scrubbing a timeline back and forth by hand.
const pingPongTime = (p: number, zoneStart: number, zoneEnd: number, passes: number, duration: number) => {
  const zoneP = clamp01((p - zoneStart) / (zoneEnd - zoneStart));
  const raw = zoneP * passes;
  const index = Math.min(passes - 1, Math.floor(raw));
  const frac = raw - index;
  const forward = index % 2 === 0;
  return (forward ? frac : 1 - frac) * duration;
};

const PageCinematicBackdrop = () => {
  const lightVideoRef = useRef<HTMLVideoElement>(null);
  const cameraVideoRef = useRef<HTMLVideoElement>(null);
  const cameraLayerRef = useRef<HTMLDivElement>(null);
  const lightSweepRef = useRef<HTMLDivElement>(null);

  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReducedMotion(prefersReduced);
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const applyProgress = (p: number) => {
        const light = lightVideoRef.current;
        const camera = cameraVideoRef.current;

        // Light: ping-pongs across the Hero's own span — 3 one-way passes,
        // ending on its fullest bloom (an odd pass count always ends a
        // zone on the clip's final frame, not its dark opening frame).
        if (light && Number.isFinite(light.duration)) {
          light.currentTime = pingPongTime(p, 0, 0.3, 3, LIGHT_DURATION);
        }
        // Camera: ping-pongs across nearly the whole rest of the page — 5
        // one-way passes, so its footage is genuinely revisited across
        // every middle section, not just crept through once and left
        // static. Also ends on its final (odd count), most-detailed frame
        // right at the Footer — the brief's "final composition" beat.
        if (camera && Number.isFinite(camera.duration)) {
          camera.currentTime = CAMERA_CLEAN_START + pingPongTime(p, 0.1, 1, 5, CAMERA_CLEAN_DURATION);
        }

        // Feathered handoff: camera revealed growing from the light's own
        // flare position.
        if (cameraLayerRef.current) {
          const maskP = rampIn(p, 0.05, 0.15);
          const inner = maskP * 60;
          const outer = 15 + maskP * 120;
          const gradient = `radial-gradient(circle at 32% 30%, black 0%, black ${inner}%, transparent ${outer}%)`;
          cameraLayerRef.current.style.maskImage = gradient;
          cameraLayerRef.current.style.setProperty('-webkit-mask-image', gradient);
          cameraLayerRef.current.style.opacity = String(rampIn(p, 0.04, 0.12));
        }

        // Light recedes once the camera takes over, but stays visible
        // enough to keep contributing — not dropped almost to nothing.
        if (light) light.style.opacity = String(1 - rampIn(p, 0.1, 0.25) * 0.5);

        // Synthetic warm sweep: peaks during the Hero handoff and again at
        // the very end as the "light gently settles" close, but keeps a
        // steady low floor the whole way through — the gold gradient is a
        // constant presence across every section, not just an intro/outro
        // flourish, so the page doesn't go flat and grey in the middle.
        if (lightSweepRef.current) {
          const introSweep = rampIn(p, 0, 0.1) * (1 - rampIn(p, 0.15, 0.3));
          const outroSweep = rampIn(p, 0.85, 1);
          const floor = 0.35;
          lightSweepRef.current.style.opacity = String(Math.max(introSweep, outroSweep, floor) * 0.7);
        }
      };

      const proxy = { p: 0 };
      ScrollTrigger.create({
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        onUpdate: (self) => {
          proxy.p = self.progress;
          applyProgress(self.progress);
        },
      });

      const resync = () => applyProgress(proxy.p);
      lightVideoRef.current?.addEventListener('loadedmetadata', resync);
      cameraVideoRef.current?.addEventListener('loadedmetadata', resync);

      applyProgress(0);

      requestAnimationFrame(() => requestAnimationFrame(() => ScrollTrigger.refresh()));
    });

    return () => ctx.revert();
  }, []);

  if (reducedMotion) {
    return (
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: "url('/hero/backdrop.jpg')" }}
      />
    );
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <video
        ref={lightVideoRef}
        muted
        playsInline
        preload="auto"
        style={{ filter: GRADE_FILTER }}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/hero/light.webm" type="video/webm" />
        <source src="/hero/light.mp4" type="video/mp4" />
      </video>

      <div
        ref={lightSweepRef}
        className="absolute inset-0"
        style={{
          opacity: 0,
          background: 'radial-gradient(ellipse 60% 50% at 15% 20%, rgba(185,145,74,0.4), transparent 65%)',
          mixBlendMode: 'screen',
        }}
      />

      <div ref={cameraLayerRef} className="absolute inset-0" style={{ opacity: 0 }}>
        <video
          ref={cameraVideoRef}
          muted
          playsInline
          preload="auto"
          style={{ filter: GRADE_FILTER }}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero/camera.webm" type="video/webm" />
          <source src="/hero/camera.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Global overlay — unifies both layers, never changes */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 55%, rgba(9,11,16,0.35) 100%)' }}
      />
    </div>
  );
};

export default PageCinematicBackdrop;
