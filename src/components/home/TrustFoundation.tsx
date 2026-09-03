import { motion } from 'motion/react';
import { ShieldCheck, FileText, Handshake, Award } from 'lucide-react';
import { tr } from '../../lib/i18n';

const PILLARS_EN = [
  { title: 'Verified People', desc: "Know who you're working with.", icon: ShieldCheck },
  { title: 'Clear Agreements', desc: "Know what you've agreed to.", icon: FileText },
  { title: 'Safe Collaboration', desc: 'Protect both sides of a project.', icon: Handshake },
  { title: 'Credit & Ownership', desc: 'Respect the people behind the work.', icon: Award },
];

const PILLARS_HI = [
  { title: 'सत्यापित लोग', desc: 'जानें कि आप किसके साथ काम कर रहे हैं।', icon: ShieldCheck },
  { title: 'स्पष्ट समझौते', desc: 'जानें कि आपने किस बात पर सहमति दी है।', icon: FileText },
  { title: 'सुरक्षित सहयोग', desc: 'प्रोजेक्ट के दोनों पक्षों की सुरक्षा करें।', icon: Handshake },
  { title: 'श्रेय और स्वामित्व', desc: 'काम के पीछे के लोगों का सम्मान करें।', icon: Award },
];

export const TrustFoundation = ({ language }: { language: string }) => {
  const PILLARS = language === 'hi' ? PILLARS_HI : PILLARS_EN;
  return (
  <section className="py-12 sm:py-20 px-6 max-w-[1920px] mx-auto border-t border-white/10">
    <div className="grid md:grid-cols-[280px_1fr] gap-10 items-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7 }}
        className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight"
      >
        {tr(language, 'Because creative work ', 'क्योंकि क्रिएटिव काम ')}<span className="gold-text">{tr(language, 'deserves respect', 'सम्मान का हकदार है')}</span>.
      </motion.h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {PILLARS.map(({ title, desc, icon: Icon }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="text-center sm:text-left"
          >
            <Icon size={22} className="text-gold mb-3 mx-auto sm:mx-0" />
            <div className="font-bold text-sm uppercase tracking-wide mb-1">{title}</div>
            <p className="text-xs text-white/50 leading-relaxed">{desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
  );
};
