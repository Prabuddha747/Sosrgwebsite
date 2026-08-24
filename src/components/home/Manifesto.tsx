import { motion } from 'motion/react';
import { Flag, GraduationCap, Users, Eye, TrendingUp } from 'lucide-react';
import manifestoImage from '../../assets/mainfesto.png';

const BELIEFS = [
  { text: 'It needs a place to begin.', icon: Flag },
  { text: 'A place to learn.', icon: GraduationCap },
  { text: 'A place to meet people.', icon: Users },
  { text: 'A place to be seen.', icon: Eye },
  { text: 'A place to grow.', icon: TrendingUp },
];

export const Manifesto = () => (
  <section className="relative py-16 sm:py-24 px-6 max-w-[1600px] mx-auto overflow-hidden">
    <div className="manifesto-art absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none" aria-hidden="true">
      <img
        src={manifestoImage}
        alt=""
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-cinematic-black via-cinematic-black/60 to-transparent" />
    </div>

    <div className="relative grid md:grid-cols-2 gap-12 items-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight"
      >
        We Believe Art Needs <span className="gold-text">More Than A Stage</span>.
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="space-y-5"
      >
        {BELIEFS.map(({ text, icon: Icon }) => (
          <div key={text} className="flex items-center gap-4">
            <Icon size={20} className="text-gold shrink-0" />
            <span className="text-white/70 text-lg">{text}</span>
          </div>
        ))}
        <p className="pt-4 text-lg font-medium">
          That's why <span className="gold-text">SosrG</span> exists.
        </p>
      </motion.div>
    </div>
  </section>
);
