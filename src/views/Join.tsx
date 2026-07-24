"use client";

import React from 'react';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { Users, Sparkles, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from '@/lib/router-compat';

const Join = () => {
  const navigate = useNavigate();
  const cinematicTransition = { duration: 1.2, ease: [] as any };

  const benefits = [
    { icon: Sparkles, title: "Global Showcase", desc: "Project your vision to a curated audience of industry connoisseurs." },
    { icon: Zap, title: "Elite Trajectory", desc: "Bespoke access to exclusive auditions and high-profile creative roles." },
    { icon: Users, title: "The Guild", desc: "Integrate with an elite network of 10,000+ master creators." },
    { icon: ShieldCheck, title: "Verified Identity", desc: "Build professional prestige with a certified creator portfolio." },
  ];

  return (
    <Layout>
      <section className="pt-56 pb-40 bg-[#080808] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[180px] opacity-20" />
        </div>

        <div className="max-w-[1400px] mx-auto px-[5%] relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={cinematicTransition}
          >
            <span className="inline-block text-gold text-[10px] font-bold uppercase tracking-[0.5em] mb-12">
              The Community
            </span>
            <h1 className="text-[clamp(2.5rem,8vw,5.5rem)] font-serif italic font-light text-[#f5f5f5] mb-16 leading-tight">
              Join the <br />
              <span className="text-gold not-italic font-bold">Creator Guild</span>
            </h1>
            <p className="text-[clamp(1.1rem,2vw,1.4rem)] text-silver/60 max-w-2xl mx-auto italic font-light leading-relaxed mb-32">
              Become part of India's most prestigious talent network. Manifest your artistic passion into a professional legacy.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-40">
              {benefits.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...cinematicTransition, delay: i * 0.1 }}
                  className="p-12 rounded-2xl glass-card group hover:border-gold/40 transition-all duration-700"
                >
                  <div className="w-14 h-14 bg-white/5 border border-gold/10 text-gold rounded-none flex items-center justify-center mx-auto mb-10 group-hover:bg-gold group-hover:text-black transition-all duration-500">
                    <item.icon size={20} />
                  </div>
                  <h3 className="text-2xl font-serif italic mb-6 text-white leading-none">{item.title}</h3>
                  <p className="text-sm text-silver/50 font-light leading-relaxed italic">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="max-w-xl mx-auto p-6 md:p-24 rounded-2xl glass border border-gold/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gold/20" />
              <h2 className="text-[clamp(1.8rem,3vw,3rem)] font-serif italic mb-16 text-[#f5f5f5]">The Entrance</h2>
              <div className="space-y-8">
                <button 
                  onClick={() => navigate('/signup')}
                  className="w-full btn-gold !py-8 !text-[11px] flex items-center justify-center gap-4"
                >
                  Create Account <ArrowRight size={18} />
                </button>
                <div className="flex items-center gap-8 py-4">
                  <div className="h-[1px] flex-1 bg-white/5" />
                  <span className="text-[9px] font-bold text-silver/30 uppercase tracking-[0.4em]">already a member?</span>
                  <div className="h-[1px] flex-1 bg-white/5" />
                </div>
                <button 
                  onClick={() => navigate('/login')}
                  className="w-full py-6 bg-transparent border border-silver/20 text-silver/60 rounded-none font-bold flex items-center justify-center gap-4 hover:border-gold hover:text-white transition-all uppercase tracking-[0.4em] text-[9px]"
                >
                  Sign In to Sanctuary
                </button>
              </div>
              <p className="mt-12 text-[9px] text-silver/20 uppercase tracking-[0.4em] font-light">
                By entering, you accept our <span className="text-gold">Terms of Engagement</span>.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Join;