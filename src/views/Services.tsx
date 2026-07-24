"use client";

import React from 'react';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { Link } from '@/lib/router-compat';
import { 
  Camera, Film, Mic, Building2, Brain, 
  TrendingUp, Scissors, Compass, Globe, 
  Sparkles, Zap, ArrowRight, CheckCircle2,
  Theater, BookOpen, Music as MusicIcon, Palette, Hammer, Users
} from 'lucide-react';

const Services = () => {
  const cinematicTransition: any = { duration: 0.8, ease: [] as any };

  const guildEcosystem = [
    { title: "THEATRE & LIVE ARTS", slug: "theatre-live-arts", icon: Theater, image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800", desc: "Creative Leadership, Production, Performers & Support." },
    { title: "CINEMA & TV PRODUCTION", slug: "cinema-tv-production", icon: Film, image: "https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?auto=format&fit=crop&q=80&w=800", desc: "Leadership, Technical Crew, Post-Production & Heads." },
    { title: "LITERATURE & PUBLISHING", slug: "literature-publishing", icon: BookOpen, image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800", desc: "Authors, Editors, Literary Agents & Publishers." },
    { title: "MUSIC & SOUND", slug: "music-sound", icon: MusicIcon, image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800", desc: "Music Direction, Recording, Mixing & Orchestration." },
    { title: "DANCE & CHOREOGRAPHY", slug: "dance-choreography", icon: Users, image: "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?auto=format&fit=crop&q=80&w=800", desc: "Principal Dancers, Choreography & Technical Training." },
    { title: "FINE ARTS & DESIGN", slug: "fine-arts-design", icon: Palette, image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800", desc: "Curators, Digital Artists & Professional Institutions." },
    { title: "HANDICRAFTS & ARTISAN", slug: "handicrafts-artisan", icon: Hammer, image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&q=80&w=800", desc: "Master Craftsmen, Artisans & Marketing." }
  ];

  const marketingServices = [
    {
      icon: Camera,
      title: "PHOTOGRAPHY SERVICES",
      headline: "Turn Moments into Marketable Visual Assets",
      sub: "High-end photography crafted to elevate your personal brand, products, and storytelling.",
      offer: ["Model & Portfolio Shoots", "Product Photography", "E-commerce Catalog Shoots", "Lifestyle & Brand Shoots"],
      cta: "Book Your Shoot Today"
    },
    {
      icon: Film,
      title: "VIDEO PRODUCTION",
      headline: "Content That Captures Attention & Converts",
      sub: "From viral reels to cinematic commercials — we produce content built for performance.",
      offer: ["Reels & Short-form Content", "YouTube Video Production", "Brand Commercials", "Ad Films"],
      cta: "Start Your Video Project"
    },
    {
      icon: Mic,
      title: "PODCAST STUDIO",
      headline: "Your Voice. Amplified Like a Brand.",
      sub: "A premium podcasting environment designed for creators, founders, and storytellers.",
      offer: ["Multi-Camera Recording", "Studio-Grade Audio Setup", "Branded Set Design", "Full Editing Support"],
      cta: "Book Your Podcast Slot"
    }
  ];

  return (
    <Layout>
      <div className="bg-transparent pb-20">
        
        {/* --- HERO SECTION --- */}
        <section className="pt-40 md:pt-60 pb-24 md:pb-40 relative overflow-hidden">
          <div className="layout-container relative z-10 text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={cinematicTransition}
              className="max-w-4xl mx-auto"
            >
              <span className="inline-block text-[#5490B4] text-[9px] md:text-[10px] font-black uppercase tracking-[0.6em] mb-8 md:mb-10">
                SOSRG STUDIOS — SERVICES
              </span>
              <h1 className="text-[clamp(2.5rem,8vw,7rem)] md:text-[clamp(3.5rem,10vw,8.5rem)] font-bold text-white tracking-tighter leading-[0.9] mb-10 md:mb-12 font-serif italic">
                Create<span className="text-[#5490B4] not-italic font-sans">.</span> <br />
                Shoot<span className="text-[#5490B4] not-italic font-sans">.</span> <br />
                Scale<span className="text-[#5490B4] not-italic font-sans">.</span>
              </h1>
              <p className="text-lg md:text-2xl text-white/60 font-light leading-relaxed max-w-2xl mx-auto mb-12 md:mb-16 px-4">
                A next-generation creative ecosystem where ideas turn into high-performing content, brands, and influence.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
                <button className="w-full sm:w-auto px-10 md:px-12 py-5 md:py-6 liquid-glass text-white border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white hover:text-black hover:border-white transition-all duration-700 flex items-center justify-center group">
                  Book Your Shoot <ArrowRight size={16} className="ml-4 group-hover:translate-x-2 transition-transform" />
                </button>
                <button className="w-full sm:w-auto px-10 md:px-12 py-5 md:py-6 bg-transparent text-white/40 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.4em] hover:border-[#5490B4] hover:text-[#5490B4] transition-all duration-700">
                  Get Free Consultation
                </button>
              </div>
            </motion.div>
          </div>
          
          <div className="absolute top-0 right-0 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-[#5490B4]/10 blur-[100px] md:blur-[150px] -z-10 rounded-full" />
        </section>

        {/* --- GUILD ECOSYSTEM (TILES) --- */}
        <section className="py-24 md:py-40 border-y border-white/10">
          <div className="layout-container px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-20 border-b border-white/10 pb-10">
              <div className="space-y-4">
                <span className="text-[#5490B4] text-[10px] font-black uppercase tracking-[0.6em] block">GUILD ECOSYSTEM</span>
                <h2 className="text-3xl md:text-7xl font-bold text-white tracking-tighter leading-none font-serif italic">
                  The <span className="text-[#5490B4] not-italic font-sans">Registry.</span>
                </h2>
              </div>
              <p className="text-base md:text-lg text-white/40 font-light max-w-sm">
                Discover specialized creative roles within our sanctuary. Select a domain to manifest details.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {guildEcosystem.map((cat, i) => (
                <Link
                  key={i}
                  to={`/services/${cat.slug}`}
                  className="liquid-glass rounded-3xl p-6 md:p-8 border border-white/10 hover:border-[#5490B4]/50 hover:bg-white/5 transition-all duration-700 group relative overflow-hidden flex flex-col min-h-[350px]"
                >
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-[#5490B4] opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Top Section: Icon next to Text */}
                  <div className="flex items-start gap-4 mb-6 shrink-0">
                    <div className="w-12 h-12 md:w-14 md:h-14 liquid-glass rounded-full border border-white/10 text-white/40 flex items-center justify-center group-hover:bg-[#5490B4] group-hover:text-white group-hover:border-[#5490B4] transition-all duration-700 shrink-0">
                      <cat.icon size={20} />
                    </div>
                    <div className="space-y-1.5 pt-1 md:pt-2">
                      <h3 className="text-sm md:text-lg font-bold text-white group-hover:text-[#5490B4] transition-colors duration-500 font-serif italic leading-tight">{cat.title}</h3>
                      <p className="text-[10px] md:text-xs text-white/40 group-hover:text-white/60 transition-colors leading-relaxed line-clamp-2">{cat.desc}</p>
                    </div>
                  </div>

                  {/* Image Container */}
                  <div className="w-full flex-grow rounded-2xl overflow-hidden relative border border-white/10 mt-auto min-h-[120px]">
                    <img src={cat.image} alt={cat.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100" />
                  </div>

                  {/* Explore Link */}
                  <div className="flex items-center gap-3 text-[#5490B4] opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 hidden md:flex pt-5 shrink-0">
                    <span className="text-[9px] font-black uppercase tracking-widest">Explore Domain</span>
                    <ArrowRight size={14} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* --- MARKETING SERVICES --- */}
        <section className="py-24 md:py-40">
          <div className="layout-container px-4">
            <div className="text-center mb-20 md:mb-32">
              <span className="text-[#5490B4] text-[10px] font-black uppercase tracking-[0.6em] mb-6 block">PRODUCTION PACKAGES</span>
              <h2 className="text-3xl md:text-7xl font-bold text-white tracking-tighter leading-none font-serif italic">
                Accelerated <span className="text-[#5490B4] not-italic font-sans">Growth.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {marketingServices.map((section, i) => (
                <div key={i} className="liquid-glass rounded-3xl p-8 md:p-12 border border-white/10 group hover:border-[#5490B4]/30 hover:bg-white/5 transition-all duration-700 flex flex-col justify-between min-h-fit lg:min-h-[600px]">
                  <div className="space-y-10 md:space-y-12">
                    <div className="w-14 h-14 md:w-16 md:h-16 liquid-glass rounded-full border border-white/10 flex items-center justify-center text-white/60 group-hover:text-white group-hover:border-[#5490B4] group-hover:bg-[#5490B4] transition-all duration-700">
                      <section.icon size={22} />
                    </div>
                    
                    <div className="space-y-4 md:space-y-6">
                      <span className="text-[9px] text-[#5490B4] font-black uppercase tracking-[0.5em] block">{section.title}</span>
                      <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tighter leading-tight font-serif italic">{section.headline}</h3>
                      <p className="text-white/60 text-sm md:text-base font-light leading-relaxed">{section.sub}</p>
                    </div>

                    <div className="space-y-6 md:space-y-8">
                      <p className="text-[8px] text-white/40 font-black uppercase tracking-[0.4em]">WHAT WE OFFER</p>
                      <ul className="grid grid-cols-1 gap-3 md:gap-4">
                        {section.offer.map((item, j) => (
                          <li key={j} className="text-[10px] md:text-xs text-white/80 font-bold uppercase tracking-widest flex items-center gap-3 md:gap-4">
                            <span className="w-1.5 h-1.5 bg-[#5490B4] rounded-full shrink-0" /> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-12 md:pt-16 mt-auto">
                    <button className="w-full py-5 md:py-6 liquid-glass rounded-full border border-white/10 text-white text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] hover:bg-[#5490B4] hover:border-[#5490B4] transition-all duration-500 shadow-xl">
                      {section.cta}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- SPECIAL OFFER HERO BLOCK --- */}
        <section className="pb-24 md:pb-40">
          <div className="layout-container px-4">
            <div className="liquid-glass border border-white/10 rounded-3xl p-8 md:p-20 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center gap-12 md:gap-16">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-[#5490B4] opacity-30" />
              <div className="lg:w-1/2 space-y-8 md:space-y-10">
                <div className="flex items-center gap-4 text-[#5490B4]">
                  <Zap size={24} fill="currentColor" />
                  <span className="text-[10px] font-black uppercase tracking-[0.5em]">SPECIAL OFFER</span>
                </div>
                <h2 className="text-3xl md:text-7xl font-bold text-white tracking-tighter leading-none font-serif italic">
                  1 Day<span className="text-[#5490B4] not-italic font-sans">.</span> <br />
                  4 Shoots<span className="text-[#5490B4] not-italic font-sans">.</span>
                </h2>
                <p className="text-lg md:text-xl text-white/60 font-light leading-relaxed">
                  Maximum Content. Minimum Time. A high-performance content package designed for creators and brands.
                </p>
                <button className="w-full sm:w-auto px-10 py-5 md:py-6 bg-[#5490B4] rounded-full text-white text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all duration-700">
                  Book Now — Limited Slots
                </button>
              </div>
              <div className="lg:w-1/2 w-full grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {[
                  { label: "What’s Included", items: ["4 Shoot Setups", "Photo + Video", "Reels + Brand Shots", "Basic Editing"] },
                  { label: "Who It’s For", items: ["Influencers", "Personal Brands", "Small Businesses", "Startups"] }
                ].map((box, i) => (
                  <div key={i} className="p-6 md:p-8 bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-[9px] text-[#5490B4] font-black uppercase tracking-[0.3em] mb-6">{box.label}</p>
                    <ul className="space-y-3">
                      {box.items.map((item, j) => (
                        <li key={j} className="flex items-center gap-3 text-[10px] md:text-xs text-white/80 font-bold uppercase tracking-widest">
                          <CheckCircle2 size={12} className="text-[#5490B4] shrink-0" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
};

export default Services;