"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/lib/router-compat';
import Navbar from '@/components/Navbar';

const beats = [
  'Every society remembers its leaders.',
  'But every society is shaped by its artists.',
  'Bihar has millions of artists.',
  'Most remain unseen.',
];

// The cinematic sequence now lives in PageCinematicBackdrop, driven by the
// whole page's scroll — Hero no longer owns its own video, mask, or pin.
// It's a normal section like every other, revealing its content the same
// way ArtistJourneySection/AboutSection do.
const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-transparent">
      {/* Text-safe darkening — the shared backdrop shows through everywhere
          except directly behind the headline/CTA column. */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#090B10]/85 via-[#090B10]/40 to-[#090B10]/15 -z-[5]" />

      <Navbar />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-12 text-center">
        <div className="flex flex-col items-center gap-3 mb-8">
          {beats.map((line, i) => (
            <motion.p
              key={line}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="text-[#F5F4F2]/70 text-sm sm:text-base tracking-[0.15em] uppercase max-w-2xl px-4"
            >
              {line}
            </motion.p>
          ))}
        </div>

        <motion.img
          src="/sosrg.webp"
          alt="SosrG"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="h-12 md:h-16 w-auto object-contain mb-10"
        />

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.65 }}
          className="text-4xl md:text-7xl lg:text-8xl text-[#F5F4F2] tracking-tighter leading-[0.95] mb-12 max-w-4xl mx-auto"
        >
          Artists aren't created.
          <br />
          They're finally <span style={{ fontFamily: "'Cormorant Garamond', serif" }} className="italic text-[#B9914A]">seen</span>.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.85 }}
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
      </div>
    </section>
  );
};

export default HeroSection;
