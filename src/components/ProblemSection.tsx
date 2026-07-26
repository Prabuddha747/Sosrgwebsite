"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import MediaPlaceholder from '@/components/MediaPlaceholder';

const artists = ['Theatre Artist', 'Poet', 'Filmmaker', 'Dancer', 'Folk Musician', 'Painter'];
const voids = ['Empty Opportunities', 'Empty Stages', 'No Network', 'No Identity'];

// Line endpoints in a 0-100 viewBox: each artist (left, y-spread) converges to center-right.
const CENTER = { x: 100, y: 50 };
const startPoints = artists.map((_, i) => ({
  x: 0,
  y: 10 + i * (80 / (artists.length - 1)),
}));

const ProblemSection = () => {
  // Scoped to just the diagram + convergence line, not the whole (much taller)
  // section — so the reveal finishes as THIS block reaches screen-center,
  // not whenever the user happens to reach the bottom of the section.
  const diagramRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: diagramRef,
    offset: ['start end', 'center center'],
  });

  const draw = useTransform(scrollYProgress, [0.2, 0.9], [0, 1]);
  const convergeOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);

  return (
    <section className="relative bg-[#090B10]/68 py-32 md:py-48 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 mb-16">
          <div className="space-y-6">
            <p className="text-[#B9914A] text-xs tracking-widest uppercase mb-4">Talent</p>
            {artists.map((a, i) => (
              <motion.p
                key={a}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="text-[#F5F4F2] text-xl md:text-2xl tracking-tight"
              >
                {a}
              </motion.p>
            ))}
          </div>

          <div className="space-y-6 md:text-right">
            <p className="text-[#F5F4F2]/30 text-xs tracking-widest uppercase mb-4">Reality</p>
            {voids.map((v, i) => (
              <motion.p
                key={v}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="text-[#F5F4F2]/40 text-xl md:text-2xl tracking-tight"
              >
                {v}
              </motion.p>
            ))}
          </div>
        </div>

        {/* Scroll-linked convergence lines — completes as this block centers on screen */}
        <div ref={diagramRef}>
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="w-full h-64 md:h-80"
          >
            {startPoints.map((p, i) => (
              <motion.line
                key={i}
                x1={p.x}
                y1={p.y}
                x2={CENTER.x}
                y2={CENTER.y}
                stroke="#B9914A"
                strokeWidth={0.3}
                strokeOpacity={0.5}
                pathLength={draw}
              />
            ))}
          </svg>

          <motion.p
            style={{ opacity: convergeOpacity }}
            className="text-center text-[#F5F4F2] text-3xl md:text-5xl tracking-tight mt-8"
          >
            Everything converges. <span className="text-[#B9914A]">SosrG.</span>
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-24">
          {artists.map((a) => (
            <MediaPlaceholder
              key={a}
              purpose={`${a} — isolated portrait`}
              framing="portrait"
              aspectRatio="3/4"
              shot={`Real portrait of a ${a.toLowerCase()}, isolated against dark negative space, no interaction with other subjects.`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
