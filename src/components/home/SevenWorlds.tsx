import { motion } from 'motion/react';
import type { Section } from '../../types';
import { SectorShowcase } from '../ui/sector-showcase';
import { tr } from '../../lib/i18n';

// Presentation is the existing marquee card scroll (src/components/ui/
// sector-showcase.tsx) at explicit request, replacing the tab/list/detail-
// panel interaction the reference boards originally showed for this
// section — same scrolling animation already used for Collaboration &
// Network Layer, reused here rather than reinvented.
// SectorShowcase's own card copy (TALENT_CATEGORIES) is shared with other
// pages (the talent grid) and isn't translated here — only this section's
// own heading is, to keep this pass scoped to the home page.
export const SevenWorlds = ({ setActiveSection, language }: { setActiveSection: (s: Section) => void, language: string }) => (
  <section className="py-16 sm:py-24 px-6 max-w-[1600px] mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7 }}
      className="text-center mb-16"
    >
      <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
        {tr(language, 'Seven Worlds Of Craft, ', 'क्राफ्ट की सात दुनियाएं, ')}<span className="gold-text">{tr(language, 'One Home To Belong To', 'अपनेपन का एक घर')}</span>.
      </h2>
      <p className="text-white/40 max-w-xl mx-auto">{tr(language, "Find the one that's yours.", 'वो दुनिया खोजें जो आपकी अपनी है।')}</p>
    </motion.div>

    <SectorShowcase onSelect={() => setActiveSection('talent')} />
  </section>
);
