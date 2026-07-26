import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const PhilosophySection = () => {
  return (
    <section className="bg-[#090B10]/68 py-28 md:py-40 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl text-[#F5F4F2] tracking-tight mb-16 md:mb-24"
        >
          Talent exists. <span style={{ fontFamily: "'Cormorant Garamond', serif" }} className="italic text-[#B9914A]">Recognition</span> doesn't.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden aspect-[4/3] w-full border border-[#B9914A]/15"
          >
            <Image
              src="/philosophy/portfolio-review.png"
              alt="A SosrG casting director reviewing a verified artist's portfolio"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-8 md:gap-12"
          >
            <div>
              <p className="text-[#B9914A] text-xs tracking-widest uppercase mb-4">For Artists</p>
              <p className="text-[#F5F4F2]/70 text-base md:text-lg leading-relaxed">
                Thousands of artists across Bihar have the skill but not the identity — no portfolio, no network, no one looking. SosrG gives every artist a real, verified place to be found.
              </p>
            </div>

            <div className="w-full h-px bg-[#B9914A]/15" />

            <div>
              <p className="text-[#B9914A] text-xs tracking-widest uppercase mb-4">For Production</p>
              <p className="text-[#F5F4F2]/70 text-base md:text-lg leading-relaxed">
                Fourteen years of building theatre groups and productions taught us what casting directors actually need: not more applicants, but verified ones. SosrG is that filter.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
