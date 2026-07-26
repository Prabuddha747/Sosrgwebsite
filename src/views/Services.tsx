"use client";

import React from 'react';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { Link } from '@/lib/router-compat';
import {
  ArrowRight, Theater, BookOpen, Music as MusicIcon, Palette, Hammer, Users, Film,
} from 'lucide-react';

const Services = () => {
  const cinematicTransition: any = { duration: 0.8, ease: [] as any };

  // Slugs match ECOSYSTEM_DATA in ServiceCategoryDetail.tsx — kept in sync,
  // not duplicated data, just the same keys.
  const domains = [
    { title: 'Theatre & Live Arts', slug: 'theatre-live-arts', icon: Theater, desc: 'Directors, performers, stage crew.' },
    { title: 'Cinema & TV Production', slug: 'cinema-tv-production', icon: Film, desc: 'Producers, crew, post-production.' },
    { title: 'Literature & Publishing', slug: 'literature-publishing', icon: BookOpen, desc: 'Authors, editors, literary agents.' },
    { title: 'Music & Sound', slug: 'music-sound', icon: MusicIcon, desc: 'Direction, recording, mixing.' },
    { title: 'Dance & Choreography', slug: 'dance-choreography', icon: Users, desc: 'Principal dancers, choreographers.' },
    { title: 'Fine Arts & Design', slug: 'fine-arts-design', icon: Palette, desc: 'Curators, digital artists.' },
    { title: 'Handicrafts & Artisan', slug: 'handicrafts-artisan', icon: Hammer, desc: 'Master craftsmen, artisans.' },
  ];

  return (
    <Layout>
      <div className="bg-transparent pb-20">
        {/* Hero */}
        <section className="pt-40 md:pt-56 pb-24 relative overflow-hidden">
          <div className="layout-container relative z-10 text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={cinematicTransition}
              className="max-w-3xl mx-auto"
            >
              <span className="inline-block text-[#B9914A] text-[10px] font-black uppercase tracking-[0.6em] mb-8">
                THE REGISTRY
              </span>
              <h1 className="text-[clamp(2.5rem,7vw,6rem)] font-bold text-white tracking-tighter leading-[0.95] mb-8">
                Every discipline.{' '}
                <span className="text-[#B9914A] italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>One home.</span>
              </h1>
              <p className="text-lg md:text-xl text-white/50 font-light leading-relaxed max-w-xl mx-auto">
                Theatre, cinema, music, dance, fine arts, craft — every creative discipline in Bihar,
                one address.
              </p>
            </motion.div>
          </div>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#B9914A]/5 blur-[150px] -z-10 rounded-full" />
        </section>

        {/* Domain directory */}
        <section className="py-24 md:py-32 border-y border-white/10">
          <div className="layout-container px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16 border-b border-white/10 pb-10">
              <h2 className="text-3xl md:text-6xl font-bold text-white tracking-tighter leading-none">
                The <span className="text-[#B9914A]">Domains.</span>
              </h2>
              <p className="text-base text-white/40 font-light max-w-sm">
                Select a discipline to see who's already here.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {domains.map((cat, i) => (
                <motion.div
                  key={cat.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                >
                  <Link
                    to={`/services/${cat.slug}`}
                    className="block bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-[#B9914A]/50 hover:bg-white/[0.07] transition-all duration-500 group h-full min-h-[220px] flex flex-col"
                  >
                    <div className="w-12 h-12 rounded-full border border-white/10 text-white/40 flex items-center justify-center group-hover:bg-[#B9914A] group-hover:text-[#090B10] group-hover:border-[#B9914A] transition-all duration-500 mb-6">
                      <cat.icon size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#B9914A] transition-colors mb-2">{cat.title}</h3>
                    <p className="text-xs text-white/40 leading-relaxed mb-6">{cat.desc}</p>
                    <div className="mt-auto flex items-center gap-2 text-[#B9914A] opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                      <span className="text-[9px] font-black uppercase tracking-widest">Explore</span>
                      <ArrowRight size={12} />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing */}
        <section className="py-24 md:py-32">
          <div className="layout-container px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={cinematicTransition}
              className="max-w-xl mx-auto"
            >
              <p className="text-lg text-white/50 mb-10">
                Don't see your discipline listed? The registry grows with every artist who joins it.
              </p>
              <Link
                to="/signup"
                className="inline-flex items-center gap-3 bg-[#B9914A] text-[#090B10] px-10 py-5 rounded-full text-sm font-medium hover:bg-[#F5F4F2] transition-colors"
              >
                Join the Registry <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Services;
