"use client";

import React from 'react';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { Link } from '@/lib/router-compat';
import { ArrowRight } from 'lucide-react';

const About = () => {
  const cinematicTransition: any = { duration: 0.8, ease: [] as any };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: cinematicTransition,
  };

  // Restated from docs/BRAND_MANIFESTO.md's own refrain, not invented copy.
  const principles = [
    { title: 'Recognition, not resumes.', desc: 'A portfolio speaks louder than a CV. That’s what gets seen here.' },
    { title: 'Bihar first, not Bihar only.', desc: 'The registry starts where the talent already is, not where the industry already looks.' },
    { title: 'Real work, not stock photography.', desc: 'Every profile is a real artist. No filler, no placeholder faces.' },
    { title: 'A registry, not a marketplace.', desc: 'SosrG connects people to opportunities. It doesn’t take a cut of anyone’s craft.' },
    { title: 'Craft over hustle.', desc: 'The site rewards the work, not the loudest self-promotion.' },
    { title: 'Verified, not just visible.', desc: 'Trust is built one confirmed profile at a time, not by volume.' },
  ];

  return (
    <Layout>
      {/* Header */}
      <section className="relative min-h-[60vh] flex items-center justify-center border-b border-white/10">
        <div className="max-w-[1100px] mx-auto px-[5%] text-center relative z-20">
          <motion.span
            initial={{ opacity: 0, letterSpacing: '0.6em' }}
            animate={{ opacity: 1, letterSpacing: '0.4em' }}
            transition={{ ...cinematicTransition, duration: 1 }}
            className="inline-block text-[#B9914A] text-[10px] font-black uppercase mb-12 tracking-[0.5em]"
          >
            THE MANIFESTO
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...cinematicTransition, delay: 0.2 }}
            className="text-4xl md:text-8xl font-bold text-white tracking-tighter leading-none mb-16"
          >
            Manifesto<span className="text-[#B9914A]">.</span>
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="w-32 h-[1px] bg-[#B9914A] mx-auto"
          />
        </div>
      </section>

      {/* The Essence */}
      <section className="py-32 md:py-40">
        <div className="max-w-[900px] mx-auto px-[5%]">
          <motion.div {...fadeIn} className="space-y-8 text-center">
            <p className="text-2xl md:text-4xl text-white/40 leading-tight">
              This isn't a production house.
              <br />
              This isn't a casting website.
              <br />
              This isn't a startup.
            </p>
            <p className="text-2xl md:text-4xl text-white leading-tight">
              SosrG exists to build <span className="text-[#B9914A] italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>India's most connected creative ecosystem</span> — starting from Bihar.
            </p>
            <p className="text-lg text-white/50 max-w-xl mx-auto pt-6">
              Every page on this site answers one question: why should an artist believe SosrG can change their future?
              If a page can't answer that, it doesn't belong here.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-32 md:py-40 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-baseline justify-between mb-20 border-b border-white/10 pb-10">
            <h2 className="text-3xl md:text-6xl font-black text-white tracking-tighter">
              Principles.
            </h2>
            <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.5em]">WHAT WE WON'T COMPROMISE ON</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {principles.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-8 bg-white/5 border border-white/10 rounded-2xl hover:border-[#B9914A]/40 transition-all duration-500"
              >
                <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-32 md:py-40">
        <div className="max-w-6xl mx-auto px-[5%] grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div {...fadeIn} className="p-8 md:p-14 bg-white/5 border border-white/10 rounded-2xl">
            <h2 className="text-2xl md:text-3xl font-black mb-10 text-white tracking-tight uppercase">The Vision</h2>
            <ul className="space-y-6 text-base font-light text-white/60">
              {[
                'Bihar’s creative talent, recognised, not overlooked.',
                'One registry connecting artists and the studios looking for them.',
                'A career path that doesn’t require leaving home first.',
              ].map((text) => (
                <li key={text} className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 bg-[#B9914A] rounded-full mt-2.5 shrink-0" />
                  {text}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div {...fadeIn} className="p-8 md:p-14 bg-white/5 border border-white/10 rounded-2xl">
            <h2 className="text-2xl md:text-3xl font-black mb-10 text-white tracking-tight uppercase">The Mission</h2>
            <ul className="space-y-6 text-base font-light text-white/60">
              {[
                'Build the registry, one verified artist at a time.',
                'Bring real casting calls and studios onto the same platform.',
                'Make recognition something you can find, not just hope for.',
              ].map((text) => (
                <li key={text} className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 bg-[#B9914A] rounded-full mt-2.5 shrink-0" />
                  {text}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Closing */}
      <section className="py-32 md:py-40 border-t border-white/10">
        <div className="max-w-[800px] mx-auto px-[5%] text-center">
          <motion.div {...fadeIn}>
            <h2 className="text-3xl md:text-6xl font-black text-white tracking-tighter mb-10">
              This is Bihar's <span className="text-[#B9914A] italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>creative identity.</span>
            </h2>
            <p className="text-lg text-white/50 mb-12 max-w-xl mx-auto">
              If you're an artist, join the registry. If you're a studio, come find who you're looking for.
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center gap-3 bg-[#B9914A] text-[#090B10] px-10 py-5 rounded-full text-sm font-medium hover:bg-[#F5F4F2] transition-colors"
            >
              Join the Movement <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
