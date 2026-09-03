import { motion } from 'motion/react';
import { Search, UserCircle, BookOpen, Users, ShieldCheck, Target, Sparkles } from 'lucide-react';
import { HoverEffect } from '../ui/hover-effect';
import { tr } from '../../lib/i18n';

const BENEFITS_EN = [
  { title: 'Find Opportunities', desc: 'Casting calls, auditions, projects, freelance work and collaborations.', icon: Search },
  { title: 'Build Your Presence', desc: 'Portfolio, profile, showreel and digital visibility.', icon: UserCircle },
  { title: 'Learn & Improve', desc: 'Workshops, academy content, mentorship and industry knowledge.', icon: BookOpen },
  { title: 'Meet Your People', desc: 'Artists, directors, producers, studios, writers and collaborators.', icon: Users },
  { title: 'Protect Your Work', desc: 'Contracts, agreements, verification and safer collaboration.', icon: ShieldCheck },
  { title: 'Get Discovered', desc: 'Relevant opportunities and connections based on your craft.', icon: Target },
];

const BENEFITS_HI = [
  { title: 'अवसर खोजें', desc: 'कास्टिंग कॉल्स, ऑडिशन, प्रोजेक्ट्स, फ्रीलांस काम और सहयोग।', icon: Search },
  { title: 'अपनी पहचान बनाएं', desc: 'पोर्टफोलियो, प्रोफाइल, शोरील और डिजिटल विज़िबिलिटी।', icon: UserCircle },
  { title: 'सीखें और बेहतर बनें', desc: 'वर्कशॉप, अकादमी कंटेंट, मेंटरशिप और इंडस्ट्री की जानकारी।', icon: BookOpen },
  { title: 'अपने लोगों से मिलें', desc: 'कलाकार, निर्देशक, प्रोड्यूसर, स्टूडियो, लेखक और सहयोगी।', icon: Users },
  { title: 'अपने काम को सुरक्षित रखें', desc: 'कॉन्ट्रैक्ट्स, एग्रीमेंट्स, वेरिफिकेशन और सुरक्षित सहयोग।', icon: ShieldCheck },
  { title: 'डिस्कवर हों', desc: 'आपके हुनर के आधार पर प्रासंगिक अवसर और संपर्क।', icon: Target },
];

export const WhatSosrgGives = ({ language }: { language: string }) => {
  const BENEFITS = language === 'hi' ? BENEFITS_HI : BENEFITS_EN;
  return (
  <section className="py-10 sm:py-24 px-6 max-w-[1920px] mx-auto">
    <div className="grid lg:grid-cols-[420px_1fr] gap-16 items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
          {tr(language, 'A little help can ', 'थोड़ी सी मदद ')}<span className="gold-text">{tr(language, 'change a creative journey', 'एक क्रिएटिव सफ़र बदल सकती है')}</span>.
        </h2>
        <div className="flex items-center gap-2 text-xs text-white/40 uppercase tracking-widest">
          <Sparkles size={14} className="text-gold" />
          {tr(language, 'Powered by intelligent matching and human trust.', 'इंटेलिजेंट मैचिंग और इंसानी भरोसे पर आधारित।')}
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
};
