"use client";

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/lib/router-compat';
import Navbar from '@/components/Navbar';
import { CurtainText } from '@/components/motion/CurtainText';
import { useReducedMotion } from '@/hooks/useReducedMotion';

// docs3/design3.md Hero (pre-Section-1) + Section 1's copy layered on top
// of it, per design3.md's own instruction: reuse this clip's visual and
// carry Section 1's headline/CTA rather than commissioning a 9-cut montage.
// Plays once, slowed, no loop, autoplays on load — the one exception to
// "every video is scroll-scrubbed" in this codebase.
const PLAYBACK_RATE = 0.45;

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();
  const [videoError, setVideoError] = useState(false);
  const [textStarted, setTextStarted] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setTextStarted(true);
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    // Hold scroll until the once-through play finishes — the visitor
    // watches it, they don't scroll past it. Locked on both html and body:
    // Lenis (mounted site-wide from Index.tsx) drives window scroll, and
    // body-only overflow:hidden doesn't reliably block that in every browser.
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const release = () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };

    video.playbackRate = PLAYBACK_RATE;
    const playPromise = video.play();
    if (playPromise) playPromise.catch(() => setVideoError(true));

    const onEnded = () => release();
    video.addEventListener('ended', onEnded);
    const startTimer = setTimeout(() => setTextStarted(true), 200);

    return () => {
      video.removeEventListener('ended', onEnded);
      clearTimeout(startTimer);
      release();
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (videoError) {
      document.body.style.overflow = '';
      setTextStarted(true);
    }
  }, [videoError]);

  const showVideo = !reducedMotion && !videoError;

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-stage-black">
      {showVideo ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src="/hero/swirling-light.mp4"
          poster="/hero/swirling-light-poster.jpg"
          muted
          playsInline
          preload="auto"
          onError={() => setVideoError(true)}
        />
      ) : (
        <img
          src="/hero/swirling-light-poster.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* Text-safe darkening over the clip */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-stage-black via-stage-black/55 to-stage-black/20" />

      <Navbar />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-12 text-center">
        <p
          className={`text-brass-muted text-sm sm:text-base tracking-[0.25em] uppercase mb-6 transition-opacity duration-700 ${
            textStarted ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Every discipline. One creative ecosystem.
        </p>

        <h1 className="font-display font-light text-4xl md:text-7xl lg:text-8xl text-ivory tracking-tight leading-[1.05] mb-12 max-w-4xl mx-auto">
          <CurtainText
            text="Every Creation Begins With a Creator"
            delay={0.3}
            disabled={!textStarted}
          />
        </h1>

        <div
          className={`flex flex-col sm:flex-row items-center gap-6 transition-opacity duration-700 ${
            textStarted ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '900ms' }}
        >
          <Link
            to="/join"
            className="group bg-antique-gold rounded-full pl-8 pr-6 py-3 text-stage-black text-sm font-medium flex items-center gap-2 transition-all duration-300 hover:shadow-[0_0_28px_rgba(201,162,39,0.45)] hover:-translate-y-0.5"
          >
            Join the Movement
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <a
            href="#ecosystem"
            className="text-ivory/60 text-sm tracking-wide hover:text-ivory transition-colors underline underline-offset-4 decoration-ivory/20"
          >
            Explore the Ecosystem
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
