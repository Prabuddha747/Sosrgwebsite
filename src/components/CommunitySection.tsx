"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const photos = [
  { src: '/community/workshop.png', label: 'Workshop', caption: 'Breaking down a character — observation, emotion, movement, voice.' },
  { src: '/community/on-set.png', label: 'On Set', caption: 'Lights up, cameras rolling — a scene comes together.' },
  { src: '/community/audition.png', label: 'Audition', caption: 'Number 27, waiting for her name to be called.' },
  { src: '/community/backstage.png', label: 'Backstage', caption: 'Minutes to curtain — costumes, lines, last checks.' },
  { src: '/community/rehearsal.png', label: 'Rehearsal', caption: 'Barefoot, mid-scene, fully in it.' },
  { src: '/community/open-mic.png', label: 'Open Mic', caption: 'One mic, one voice, a room that showed up for it.' },
];

const CommunitySection = () => {
  return (
    <section className="relative bg-[#090B10] py-32 md:py-40 px-6">
      <div className="max-w-2xl mx-auto text-center mb-16">
        <p className="text-[#B9914A] text-xs tracking-widest uppercase mb-4">Community</p>
        <h2 className="text-3xl md:text-5xl text-[#F5F4F2] tracking-tight">
          Before the spotlight, there's the room.
        </h2>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((p, i) => (
          <motion.div
            key={p.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            className="group relative aspect-[4/5] rounded-2xl overflow-hidden border border-[#B9914A]/15"
          >
            <Image
              src={p.src}
              alt={p.caption}
              fill
              sizes="(min-width: 768px) 33vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090B10] via-[#090B10]/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-[#B9914A] text-[10px] tracking-widest uppercase mb-1">{p.label}</p>
              <p className="text-[#F5F4F2]/80 text-xs leading-snug">{p.caption}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CommunitySection;
