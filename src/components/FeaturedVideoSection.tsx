"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const YOUTUBE_ID = 'G6zblqA8uXk';

const FeaturedVideoSection = () => {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="bg-[#090B10]/68 py-24 md:py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#B9914A] text-xs tracking-widest uppercase mb-4">Founder</p>
          <h2 className="text-3xl md:text-5xl text-[#F5F4F2] tracking-tight">
            One person, fourteen years, one question.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden aspect-video w-full border border-[#B9914A]/15"
          >
            {playing ? (
              <iframe
                src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1`}
                title="SosrG Founder Story"
                allow="accelerate-compute; autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="absolute inset-0 w-full h-full group"
                aria-label="Play founder story video"
              >
                <img
                  src={`https://img.youtube.com/vi/${YOUTUBE_ID}/maxresdefault.jpg`}
                  alt="SosrG founder story video thumbnail"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#B9914A] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play size={22} className="text-[#090B10] ml-1" fill="currentColor" />
                  </div>
                </div>
              </button>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border border-[#B9914A]/25 shrink-0">
                <Image src="/founder/siddhartha.png" alt="Siddhartha, Founder & CEO of SosrG" fill className="object-cover" />
              </div>
              <div>
                <p className="text-[#F5F4F2] text-base">Siddhartha</p>
                <p className="text-[#B9914A] text-xs tracking-widest uppercase">Founder & CEO, SosrG</p>
              </div>
            </div>
            <p className="text-[#F5F4F2]/60 text-sm md:text-base leading-relaxed">
              Before SosrG was a platform, it was one person asking whether art could change
              society — then spending fourteen years building the theatre groups and productions
              to answer it. This is that story, in his own words.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVideoSection;
