"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const milestones = [
  { year: '2012', label: 'Sainik School', note: 'One question: can art change society?' },
  { year: '', label: 'NID', note: 'National Institute of Design' },
  { year: '', label: 'NIFT', note: 'National Institute of Fashion Technology' },
  { year: '', label: 'Film School', note: 'Learning the craft' },
  { year: '', label: 'Theatre', note: '100+ theatre groups built' },
  { year: '', label: '380+ Productions', note: 'Across stage and screen' },
  { year: '', label: 'Guinness World Record', note: 'A record for the discipline' },
  { year: 'Today', label: 'SosrG', note: 'Building it for every artist in Bihar' },
];

const FounderTimelineSection = () => {
  return (
    <section className="relative bg-[#090B10]/75 py-32 md:py-40 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center mb-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative aspect-square w-full max-w-sm mx-auto md:mx-0 rounded-3xl overflow-hidden border border-[#B9914A]/25"
        >
          <Image
            src="/founder/siddhartha.png"
            alt="Siddhartha, Founder & CEO of SosrG"
            fill
            sizes="(min-width: 768px) 40vw, 80vw"
            className="object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center md:text-left"
        >
          <p className="text-[#B9914A] text-xs tracking-widest uppercase mb-4">Founder Story</p>
          <h2 className="text-3xl md:text-5xl text-[#F5F4F2] tracking-tight mb-6">
            This wasn't built overnight. It was built over 14 years.
          </h2>
          <p className="text-[#F5F4F2]/50 text-base leading-relaxed max-w-md mx-auto md:mx-0">
            Siddhartha, Founder &amp; CEO — from a classroom in Sainik School to a Guinness World
            Record, before SosrG ever existed as a platform.
          </p>
        </motion.div>
      </div>

      <div className="max-w-xl mx-auto relative">
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[#B9914A]/20" />
        <div className="space-y-12">
          {milestones.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              className="relative pl-10"
            >
              <span className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full bg-[#B9914A] ring-4 ring-[#090B10]" />
              <div className="flex items-baseline gap-3 flex-wrap">
                {m.year && (
                  <span className="text-[#B9914A] text-xs tracking-widest uppercase">{m.year}</span>
                )}
                <span className="text-[#F5F4F2] text-xl md:text-2xl tracking-tight">{m.label}</span>
              </div>
              <p className="text-[#F5F4F2]/40 text-sm mt-1">{m.note}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FounderTimelineSection;
