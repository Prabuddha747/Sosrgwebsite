"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SparkleField from '@/components/SparkleField';

const negations = ["This isn't a studio.", "This isn't a startup.", "This isn't a production house."];

const IdentitySection = () => {
  const ref = useRef<HTMLDivElement>(null);
  // Scroll-linked, like the Problem section: each line resolves as the
  // reader scrolls, finishing as the block reaches screen-center.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  // Explicit calls (not a .map loop) to keep hook order stable across renders.
  const negationOpacity = [
    useTransform(scrollYProgress, [0.1, 0.25], [0, 1]),
    useTransform(scrollYProgress, [0.25, 0.4], [0, 1]),
    useTransform(scrollYProgress, [0.4, 0.55], [0, 1]),
  ];
  const headlineOpacity = useTransform(scrollYProgress, [0.65, 1], [0, 1]);
  const headlineY = useTransform(scrollYProgress, [0.65, 1], [24, 0]);

  return (
    <section
      ref={ref}
      className="relative bg-[#090B10]/60 min-h-[120vh] flex flex-col items-center justify-center px-6 text-center py-32"
    >
      {/* Sparkles only arrive with the climax line — a beat, not decoration */}
      <SparkleField opacity={headlineOpacity} />

      <div className="space-y-4 mb-16">
        {negations.map((line, i) => (
          <motion.p
            key={line}
            style={{ opacity: negationOpacity[i] }}
            className="text-[#F5F4F2]/40 text-xl md:text-3xl tracking-tight"
          >
            {line}
          </motion.p>
        ))}
      </div>

      <motion.h2
        style={{ opacity: headlineOpacity, y: headlineY }}
        className="text-5xl md:text-8xl lg:text-9xl text-[#F5F4F2] tracking-tighter leading-[0.95]"
      >
        This is <span className="text-[#B9914A]">Bihar's</span>
        <br />
        Creative Identity.
      </motion.h2>
    </section>
  );
};

export default IdentitySection;
