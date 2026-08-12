import { motion } from 'motion/react';
import { Search, UserCircle, BookOpen, Users, ShieldCheck, Target, Sparkles } from 'lucide-react';
import { HoverEffect } from '../ui/hover-effect';

const BENEFITS = [
  { title: 'Find Opportunities', desc: 'Casting calls, auditions, projects, freelance work and collaborations.', icon: Search },
  { title: 'Build Your Presence', desc: 'Portfolio, profile, showreel and digital visibility.', icon: UserCircle },
  { title: 'Learn & Improve', desc: 'Workshops, academy content, mentorship and industry knowledge.', icon: BookOpen },
  { title: 'Meet Your People', desc: 'Artists, directors, producers, studios, writers and collaborators.', icon: Users },
  { title: 'Protect Your Work', desc: 'Contracts, agreements, verification and safer collaboration.', icon: ShieldCheck },
  { title: 'Get Discovered', desc: 'Relevant opportunities and connections based on your craft.', icon: Target },
];

export const WhatSosrgGives = () => (
  <section className="py-16 sm:py-24 px-6 max-w-[1600px] mx-auto">
    <div className="grid lg:grid-cols-[420px_1fr] gap-16 items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
          A little help can <span className="gold-text">change a creative journey</span>.
        </h2>
        <div className="flex items-center gap-2 text-xs text-white/40 uppercase tracking-widest">
          <Sparkles size={14} className="text-gold" />
          Powered by intelligent matching and human trust.
        </div>
      </motion.div>

      <HoverEffect className="sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden">
        {BENEFITS.map(({ title, desc, icon: Icon }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="bg-cinematic-black p-8 h-full min-h-[176px] flex flex-col"
          >
            <Icon size={22} className="text-gold mb-4" />
            <div className="font-bold text-sm uppercase tracking-wide mb-2">{title}</div>
            <p className="text-sm text-white/50 leading-relaxed">{desc}</p>
          </motion.div>
        ))}
      </HoverEffect>
    </div>
  </section>
);
