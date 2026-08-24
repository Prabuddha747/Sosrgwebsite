import { motion } from 'motion/react';
import { TrendingUp } from 'lucide-react';
import type { Section } from '../../types';
import { RoleCarousel, type RoleCard } from '../ui/role-carousel';
import { tr } from '../../lib/i18n';

// Restored from the deleted TalentGrid.tsx (pre-redesign) at explicit
// request — the reference boards don't include this section, but the
// "featured professionals" concept was a deliberate part of the product,
// not a placeholder to drop. Kept the same honesty rule the old component
// used: there's no live featured-talent directory yet, so this stays a
// scaffolded role-category carousel (ComingSoonTag + shimmer) rather than
// inventing names/photos — see mockData.ts's FEATURED_TALENT comment for
// why that array specifically was never wired up here.
const FEATURED_ROLE_CATEGORIES: RoleCard[] = [
  { id: 'performers', tag: 'Cinema · Theatre' },
  { id: 'directors', tag: 'Cinema' },
  { id: 'music', tag: 'Music' },
  { id: 'choreo', tag: 'Dance' },
  { id: 'writers', tag: 'Literature' },
  { id: 'design', tag: 'Art & Design' },
];

export const FeaturedProfessionals = ({ setActiveSection, language }: { setActiveSection: (s: Section) => void, language: string }) => (
  <section className="py-16 sm:py-24 px-6 max-w-[1600px] mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7 }}
      className="flex items-center justify-between gap-4 mb-4"
    >
      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight flex items-center gap-3">
        <TrendingUp className="text-gold" /> {tr(language, 'Featured Professionals', 'फीचर्ड प्रोफेशनल्स')}
      </h2>
      <button
        onClick={() => setActiveSection('talent')}
        className="hidden sm:block text-xs font-bold uppercase tracking-widest text-gold hover:underline shrink-0"
      >
        {tr(language, 'Browse Talent', 'टैलेंट देखें')}
      </button>
    </motion.div>
    <p className="text-white/50 text-sm mb-8 max-w-2xl">
      {tr(language, "There's no live featured-talent directory yet — these are the role categories the platform is built around, not real member profiles.", 'अभी कोई लाइव फीचर्ड-टैलेंट डायरेक्टरी नहीं है — ये वो रोल कैटेगरीज़ हैं जिन पर प्लेटफ़ॉर्म बना है, असली मेंबर प्रोफाइल नहीं।')}
    </p>
    <RoleCarousel items={FEATURED_ROLE_CATEGORIES} scaffold />
  </section>
);
