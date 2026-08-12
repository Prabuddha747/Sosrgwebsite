import { motion } from 'motion/react';
import { ShieldCheck, FileText, Handshake, Award } from 'lucide-react';

const PILLARS = [
  { title: 'Verified People', desc: "Know who you're working with.", icon: ShieldCheck },
  { title: 'Clear Agreements', desc: "Know what you've agreed to.", icon: FileText },
  { title: 'Safe Collaboration', desc: 'Protect both sides of a project.', icon: Handshake },
  { title: 'Credit & Ownership', desc: 'Respect the people behind the work.', icon: Award },
];

export const TrustFoundation = () => (
  <section className="py-12 sm:py-20 px-6 max-w-[1600px] mx-auto border-t border-white/10">
    <div className="grid md:grid-cols-[280px_1fr] gap-10 items-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7 }}
        className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight"
      >
        Because creative work <span className="gold-text">deserves respect</span>.
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
