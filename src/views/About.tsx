"use client";

import React from 'react';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { 
  Target, Eye, Rocket, Heart, CheckCircle2
} from 'lucide-react';

const About = () => {
  const cinematicTransition: any = { duration: 0.8, ease: [] as any };
  
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: cinematicTransition
  };

  return (
    <Layout>
      {/* Studio Header */}
      <section className="relative min-h-[80vh] flex items-center justify-center border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=2000" 
            alt="Artistic Heritage" 
            className="w-full h-full object-cover grayscale opacity-10"
          />
        </div>
        <div className="max-w-[1200px] mx-auto px-[5%] text-center relative z-20">
          <motion.span 
            initial={{ opacity: 0, letterSpacing: "0.6em" }}
            animate={{ opacity: 1, letterSpacing: "0.4em" }}
            transition={{ ...cinematicTransition, duration: 1 }}
            className="inline-block text-[#5490B4] text-[10px] font-black uppercase mb-12 tracking-[0.5em]"
          >
            THE ARTISTIC LEGACY
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...cinematicTransition, delay: 0.2 }}
            className="text-4xl md:text-9xl font-bold text-white tracking-tighter leading-none mb-16 font-serif italic"
          >
            Manifesto<span className="text-[#5490B4] not-italic font-sans">.</span>
          </motion.h1>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: [] as any }}
            className="w-48 h-[1px] bg-[#5490B4] mx-auto"
          />
        </div>
      </section>

      {/* The Essence Section */}
      <section className="py-40">
        <div className="max-w-[1200px] mx-auto px-[5%]">
          <motion.div {...fadeIn} className="liquid-glass p-8 md:p-32 rounded-3xl border border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 md:p-24 opacity-[0.05] group-hover:scale-110 transition-transform duration-[3s]">
              <Target size={400} className="text-white" />
            </div>
            <div className="max-w-4xl mx-auto space-y-16">
              <h2 className="text-3xl md:text-5xl font-black leading-tight text-white tracking-tight font-serif italic">
                The Essence Of <br />
                <span className="text-[#5490B4]">SosrG Studios.</span>
              </h2>
              <div className="w-24 h-[1px] bg-white/20" />
              <p className="text-xl text-white/60 font-light leading-relaxed">
                Fostering the rich tapestry of Indian art and culture, SosrG is dedicated to building the most prestigious community of Visual & Performing Creators. Spanning Indian Theatre, Cinema, Literature, and Fine Arts, we have established a definitive "Platform to Perform"—a bridge designed to transcend traditional struggles. We empower individuals with opportunities ranging from elite engagements to full-time creative roles, providing unparalleled support within their respective artistic domains.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Creative Manifesto Grid */}
      <section className="py-40 border-y border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-baseline justify-between mb-32 border-b border-white/10 pb-12">
            <h2 className="text-3xl md:text-6xl font-black text-white tracking-tighter font-serif italic">
              Principles.
            </h2>
            <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.5em]">THE VISION OF THE GUILD</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Connect Indian creators globally at a single portal.",
              "Single-point access to Theatre, Cinema, and Fine Arts.",
              "OTT platform for creative independent filmmakers.",
              "Digital portfolios for photography and performance art.",
              "Real-time update on elite auditions and galleries.",
              "Connecting personalities opportunity for all Indians.",
              "Monetize artistic work through our ArtMart portal.",
              "Utilize 130+ services as seeker or provider.",
              "Create bespoke ads for your talent and business.",
              "Organize and volunteer for exclusive art festivals.",
              "Professional Actor and Model profile management.",
              "Bridge the connection with high-end industry.",
              "Global network with experienced master creators."
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="flex items-start gap-6 p-8 liquid-glass rounded-2xl border border-white/5 group hover:border-[#5490B4]/30 hover:bg-white/5 transition-all duration-500"
              >
                <div className="w-6 h-6 border border-white/20 rounded-full flex items-center justify-center shrink-0 mt-1 group-hover:border-[#5490B4] transition-colors">
                  <CheckCircle2 className="text-white/40 group-hover:text-[#5490B4]" size={12} />
                </div>
                <span className="text-sm font-light text-white/60 group-hover:text-white transition-colors leading-relaxed">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission - Dual Panels */}
      <section className="py-40">
        <div className="max-w-[1200px] mx-auto px-[5%] grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div {...fadeIn} className="p-6 md:p-16 liquid-glass rounded-3xl border border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 md:p-16 opacity-[0.03] group-hover:scale-125 transition-transform duration-[4s]">
              <Eye size={160} className="text-white" />
            </div>
            <h2 className="text-4xl font-black mb-16 text-white tracking-tight uppercase font-serif italic">The Vision</h2>
            <ul className="space-y-8 text-lg font-light text-white/60">
              {["Create India's most active talent platform", "Nurture passion into global profession", "Generate ample creative employment", "Empower connecting partners"].map((text, i) => (
                <li key={i} className="flex items-center gap-6">
                  <div className="w-1.5 h-1.5 bg-[#5490B4] rounded-full" />
                  {text}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div {...fadeIn} className="p-6 md:p-16 liquid-glass rounded-3xl border border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 md:p-16 opacity-[0.03] group-hover:scale-125 transition-transform duration-[4s]">
              <Rocket size={160} className="text-white" />
            </div>
            <h2 className="text-4xl font-black mb-16 text-white tracking-tight uppercase font-serif italic">The Mission</h2>
            <ul className="space-y-8 text-lg font-light text-white/60">
              {["Largest community of Indian creators", "Global promotion of handicraft industries", "Connecting art institutions nationwide", "Established proprietary OTT and studios"].map((text, i) => (
                <li key={i} className="flex items-center gap-6">
                  <div className="w-1.5 h-1.5 bg-[#5490B4] rounded-full" />
                  {text}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Foundation */}
      <section className="py-40 relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-[5%] text-center relative z-10">
          <motion.div {...fadeIn}>
            <Heart size={48} className="mx-auto mb-16 text-[#5490B4]" />
            <h2 className="text-3xl md:text-6xl font-black text-white tracking-tighter mb-16 font-serif italic">
              Foundation.
            </h2>
            <p className="text-xl text-white/60 font-light mb-24 max-w-3xl mx-auto leading-relaxed">
              Our philanthropic mission dedicated to empowering creators from all dimensions of life, from folk heritage to diverse artistic identities.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "Folk Heritage",
                "Specially Abled",
                "Artistic Orphans",
                "Senior Creators",
                "Financial Grants",
                "Diverse Identities",
                "Art Guilds"
              ].map((item, i) => (
                <span key={i} className="px-8 py-4 liquid-glass rounded-full border border-white/10 text-[10px] font-black text-white/60 uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all duration-700 cursor-default">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;