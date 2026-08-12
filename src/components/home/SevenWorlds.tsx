import { motion } from 'motion/react';
import type { Section } from '../../types';
import { SectorShowcase } from '../ui/sector-showcase';

// Presentation is the existing marquee card scroll (src/components/ui/
// sector-showcase.tsx) at explicit request, replacing the tab/list/detail-
// panel interaction the reference boards originally showed for this
// section — same scrolling animation already used for Collaboration &
// Network Layer, reused here rather than reinvented.
export const SevenWorlds = ({ setActiveSection }: { setActiveSection: (s: Section) => void }) => (
  <section className="py-16 sm:py-24 px-6 max-w-[1600px] mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7 }}
      className="text-center mb-16"
    >
      <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
        Seven Worlds Of Craft, <span className="gold-text">One Home To Belong To</span>.
      </h2>
      <p className="text-white/40 max-w-xl mx-auto">Find the one that's yours.</p>
    </motion.div>

    <SectorShowcase onSelect={() => setActiveSection('talent')} />
  </section>
);
