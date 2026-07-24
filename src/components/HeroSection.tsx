"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/lib/router-compat';
import Navbar from '@/components/Navbar';
import MediaPlaceholder from '@/components/MediaPlaceholder';

const beats = [
  'Every society remembers its leaders.',
  'But every society is shaped by its artists.',
  'Bihar has millions of artists.',
  'Most remain unseen.',
];

const beatDuration = 0.9;
const beatGap = 0.5;
const logoDelay = beats.length * (beatDuration + beatGap) + 0.3;
const headlineDelay = logoDelay + 0.9;
const ctaDelay = headlineDelay + 0.8;
const introEndMs = (ctaDelay + 0.8) * 1000;

const HeroSection = () => {
  const [locked, setLocked] = useState(true);
  const [skipAnimation, setSkipAnimation] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setSkipAnimation(true);
      setLocked(false);
      return;
    }

    // The page's actual scrolling element is <html>, not <body> — both need
    // overflow:hidden or the lock is a no-op (body alone doesn't block scroll).
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    const release = () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      setLocked(false);
    };
    const timer = setTimeout(release, introEndMs);

    // Safety valve: Escape always gets a visitor out, even mid-sequence.
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') release();
    };
    window.addEventListener('keydown', onKey);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, []);

  const delay = (d: number) => (skipAnimation ? 0 : d);

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#090B10]">
      <div className="absolute inset-0 z-0">
        <MediaPlaceholder
          purpose="Hero background — establishes tone before any text"
          framing="wide"
          aspectRatio="16/9"
          durationSec={12}
          shot="Dark Bihar landscape, morning fog, single spotlight, an artist walking toward the light. Slow parallax, no cuts, film grain."
          className="!aspect-auto h-full !rounded-none border-0 opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090B10] via-[#090B10]/60 to-[#090B10]/20" />
      </div>

      <Navbar />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-12 text-center">
        <div className="min-h-[3.5rem] flex items-center justify-center mb-8">
          {beats.map((line, i) => (
            <motion.p
              key={line}
              initial={{ opacity: 0 }}
              animate={{ opacity: skipAnimation ? 0 : [0, 1, 1, 0] }}
              transition={{
                duration: beatDuration + beatGap,
                times: [0, 0.25, 0.75, 1],
                delay: delay(i * (beatDuration + beatGap)),
              }}
              className="absolute text-[#F5F4F2]/70 text-sm sm:text-base tracking-[0.15em] uppercase max-w-2xl px-4"
            >
              {line}
            </motion.p>
          ))}
        </div>

        <motion.img
          src="/sosrg.webp"
          alt="SosrG"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: skipAnimation ? 0 : 1, delay: delay(logoDelay) }}
          className="h-12 md:h-16 w-auto object-contain mb-10"
        />

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: skipAnimation ? 0 : 1, delay: delay(headlineDelay) }}
          className="text-4xl md:text-7xl lg:text-8xl text-[#F5F4F2] tracking-tighter leading-[0.95] mb-12 max-w-4xl mx-auto"
        >
          Artists aren't <span style={{ fontFamily: "'Cormorant Garamond', serif" }} className="italic text-[#B9914A]">created</span>.
          <br />
          They are recognised.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: skipAnimation ? 0 : 0.8, delay: delay(ctaDelay) }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <Link
            to="/join"
            className="bg-[#B9914A] rounded-full pl-8 pr-6 py-3 text-[#090B10] text-sm font-medium flex items-center gap-2 hover:bg-[#F5F4F2] transition-colors"
          >
            Join the Movement
            <ArrowRight size={18} />
          </Link>
          <a
            href="#ecosystem"
            className="text-[#F5F4F2]/60 text-sm tracking-wide hover:text-[#F5F4F2] transition-colors underline underline-offset-4 decoration-[#F5F4F2]/20"
          >
            Explore the Ecosystem
          </a>
        </motion.div>

        {locked && (
          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#F5F4F2]/30 animate-pulse" />
        )}
      </div>
    </section>
  );
};

export default HeroSection;
