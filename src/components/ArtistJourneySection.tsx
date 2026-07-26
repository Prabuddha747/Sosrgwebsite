"use client";

import React from 'react';
import { motion } from 'framer-motion';

const steps = ['Portfolio', 'Recognition', 'Networking', 'Audition', 'Project', 'Income', 'Career', 'Global Stage'];

const ArtistJourneySection = () => {
  return (
    <section className="relative bg-[#090B10]/68 py-32 md:py-40 px-6 overflow-hidden">
      <div className="max-w-2xl mx-auto text-center mb-20">
        <p className="text-[#B9914A] text-xs tracking-widest uppercase mb-4">Artist Journey</p>
        <h2 className="text-3xl md:text-5xl text-[#F5F4F2] tracking-tight">
          Not what we offer. What happens to you.
        </h2>
      </div>

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-2">
        {steps.map((step, i) => (
          <React.Fragment key={step}>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="flex flex-col items-center text-center gap-2 shrink-0"
            >
              <span className="w-8 h-8 rounded-full border border-[#B9914A]/40 text-[#B9914A] text-xs flex items-center justify-center">
                {i + 1}
              </span>
              <span className="text-[#F5F4F2] text-sm tracking-wide whitespace-nowrap">{step}</span>
            </motion.div>
            {i < steps.length - 1 && (
              <div className="hidden md:block flex-1 h-px bg-[#B9914A]/15 min-w-6" />
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default ArtistJourneySection;
