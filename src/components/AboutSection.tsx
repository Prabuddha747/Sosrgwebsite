"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="bg-[#090B10]/68 pt-32 md:pt-44 pb-10 md:pb-14 px-6 overflow-hidden relative"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(185,145,74,0.05)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-[#B9914A] text-sm tracking-widest uppercase mb-6"
        >
          Society Of Self Recognising Grace
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl text-[#F5F4F2] leading-[1.1] tracking-tight"
        >
          <span style={{ fontFamily: "'Cormorant Garamond', serif" }} className="italic text-[#F5F4F2]/60">Empowering</span> the next generation of
          <br className="hidden md:block" />
          <span style={{ fontFamily: "'Cormorant Garamond', serif" }} className="italic text-[#B9914A]">artists that</span> create, perform, and inspire.
        </motion.h2>
      </div>
    </section>
  );
};

export default AboutSection;
