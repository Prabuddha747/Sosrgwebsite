import { motion } from 'motion/react';
import { Building2, Camera, Clapperboard, Music2, Palette, Sparkles, Star, Zap } from 'lucide-react';

// Placeholder marks only — no real company names or logos, since none have
// been provided yet. Swap MARKS for real partner logos (image or wordmark)
// the moment they're available; don't let this row imply a real
// partnership in the meantime.
const MARKS = [Building2, Camera, Clapperboard, Music2, Palette, Sparkles, Star, Zap];

export const BrandDeals = () => (
  <section className="py-16 sm:py-24 px-6 max-w-[1600px] mx-auto border-t border-white/10">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7 }}
      className="text-center mb-12"
    >
      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        Backed by <span className="gold-text">brands who believe in creators</span>
      </h2>
      <p className="text-white/50 text-sm mt-3 max-w-xl mx-auto">
        Placeholder marks — real partner logos go here once confirmed.
      </p>
    </motion.div>

    <div className="grid grid-cols-4 sm:grid-cols-8 gap-4 sm:gap-6">
      {MARKS.map((Icon, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: i * 0.05 }}
          className="aspect-square rounded-2xl border border-white/10 bg-cinematic-gray flex items-center justify-center"
        >
          <Icon size={22} className="text-white/40" />
        </motion.div>
      ))}
    </div>
  </section>
);
