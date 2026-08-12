import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, FileText, Mic, Palette, CheckCircle2 } from 'lucide-react';
import { ComingSoonTag } from '../ScaffoldUI';
import backstageImage from '../../assets/community/backstage.png';
import openMicImage from '../../assets/community/open-mic.png';
import rehearsalImage from '../../assets/community/rehearsal.png';
import workshopImage from '../../assets/community/workshop.png';

// Content restored verbatim from the deleted CollaborationNetwork.tsx (all
// four programs' full description/bullets/CTA/"how it works" panel — not a
// condensed summary). Presentation is deliberately the Seven Worlds
// section's image/nav-list/detail-panel structure (same glass-panel grid,
// same selectable-list interaction), reused at explicit request rather than
// the marquee carousel the first pass used. None of the four programs have
// a live API behind them — same as the original — so the whole panel stays
// marked Coming Soon rather than implying otherwise.
const PROGRAMS = [
  {
    id: 'theatre',
    title: 'Theatre to Cinema Bridge',
    icon: User,
    accent: 'text-gold',
    image: backstageImage,
    desc: 'A dedicated pathway helping seasoned stage actors transition seamlessly into film and OTT roles. Our AI translates theatre experience into cinematic casting metrics.',
    bullets: [
      'AI translation of stage credits to screen equivalents',
      'Exclusive casting calls for classically trained actors',
      'Workshops on camera acting techniques',
      'Direct producer networking events',
    ],
    cta: 'Explore Bridge Program',
    howTitle: 'How the Bridge Works',
    howDesc: "Your stage credits — productions, run length, training lineage — get read against a cinematic casting rubric, so a casting director searching for screen experience can still find you on theatre experience alone.",
    tags: ['AI Credit Translation', 'Classical Training Recognized', 'Camera Technique Workshops', 'Direct Producer Access'],
  },
  {
    id: 'literature',
    title: 'Literature to Screen Marketplace',
    icon: FileText,
    accent: 'text-blue-400',
    image: openMicImage,
    desc: 'A secure marketplace where screenwriters, novelists, and playwrights can pitch their intellectual property directly to verified producers and studios.',
    bullets: [
      'Secure IP timestamping before pitching',
      'Direct messaging with verified producers',
      'AI-assisted pitch deck generation',
      'Standardized option agreements',
    ],
    cta: 'Enter Marketplace',
    howTitle: 'How the Marketplace Works',
    howDesc: "Your script or manuscript gets a timestamped IP record the moment you upload it, before it's ever shown to a producer — so pitching stays provable, not just polite.",
    tags: ['IP Timestamped', 'Verified Producers Only', 'AI Pitch Assist', 'Standard Option Terms'],
  },
  {
    id: 'music',
    title: 'Music Collaboration Hub',
    icon: Mic,
    accent: 'text-purple-400',
    image: rehearsalImage,
    desc: 'Connect lyricists, singers, composers, and sound engineers in real-time. Share stems, co-write lyrics, and manage split sheets automatically.',
    bullets: [
      'Real-time audio collaboration rooms',
      'Automated royalty split sheet generation',
      'Find session musicians by instrument and genre',
      'Direct integration with film post-production',
    ],
    cta: 'Start Collaborating',
    howTitle: 'How the Hub Works',
    howDesc: 'Open a room for a track, invite collaborators by role, and everyone works from the same stems and lyric doc — with royalty splits generated from who actually contributed, not negotiated after the fact.',
    tags: ['Real-time Rooms', 'Auto Split Sheets', 'Genre-matched Search', 'Post-production Ready'],
  },
  {
    id: 'art',
    title: 'Art & Craft Vendor Directory',
    icon: Palette,
    accent: 'text-emerald-400',
    image: workshopImage,
    desc: 'A verified directory connecting production designers, art directors, and costume designers directly to specialized suppliers, artisans, and rental houses.',
    bullets: [
      'Verified vendor ratings and reviews',
      'Direct RFQ (Request for Quote) system',
      'Escrow payments for large orders',
      'Location-based supplier search',
    ],
    cta: 'Browse Directory',
    howTitle: 'How the Directory Works',
    howDesc: 'Search verified prop houses, costume suppliers, and rental studios by category and location, send a request for quote, and settle through escrow instead of a phone-and-invoice chase.',
    tags: ['Verified Vendors', 'RFQ System', 'Escrow Protected', 'Location Search'],
  },
];

export const CollaborationNetwork = () => {
  const [selectedId, setSelectedId] = useState(PROGRAMS[0].id);
  const selected = PROGRAMS.find((p) => p.id === selectedId) ?? PROGRAMS[0];

  return (
    <section className="py-16 sm:py-24 px-6 max-w-[1600px] mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Collaboration & <span className="gold-text">Network Layer</span>
        </h2>
        <p className="text-white/40 max-w-xl mx-auto">
          Cross-pollinating talent across the 7 core creative sectors.
        </p>
      </div>

      <div className="relative grid lg:grid-cols-[1fr_300px_1fr] gap-8 glass-panel p-4 md:p-6">
        <ComingSoonTag />

        <div className="relative h-72 lg:h-[420px] rounded-xl overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={selected.id}
              src={selected.image}
              alt=""
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 photo-scrim-b" />
        </div>

        <nav className="flex flex-col justify-center gap-1">
          {PROGRAMS.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedId(p.id)}
              aria-current={p.id === selectedId}
              className={`flex items-center gap-2 text-left px-4 py-3 rounded-lg text-sm font-bold transition-colors ${
                p.id === selectedId
                  ? 'bg-gold/10 text-gold border-l-2 border-gold'
                  : 'text-white/50 border-l-2 border-transparent hover:text-white/80'
              }`}
            >
              <p.icon size={16} className="shrink-0" /> {p.title}
            </button>
          ))}
        </nav>

        {/* No fixed max-height/scroll here — a nested scroll region inside a
            page that's already scrolling is a real mobile UX problem (two
            competing scroll gestures, and content silently clipped below
            the fold with no visible affordance that more exists). Panel
            just grows to fit whichever program's content is selected. */}
        <div className="py-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-white/60 leading-relaxed mb-5">{selected.desc}</p>
              <ul className="space-y-3 mb-6">
                {selected.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-white/80">
                    <CheckCircle2 size={16} className={`${selected.accent} shrink-0 mt-0.5`} /> {b}
                  </li>
                ))}
              </ul>
              <button
                disabled
                className="w-full sm:w-auto bg-white/10 border border-white/10 text-white/50 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest cursor-not-allowed"
              >
                {selected.cta} — Coming Soon
              </button>

              <div className="mt-8 pt-6 border-t border-white/10">
                <h4 className="font-bold text-sm mb-2">{selected.howTitle}</h4>
                <p className="text-xs text-white/50 leading-relaxed mb-4">{selected.howDesc}</p>
                <div className="flex flex-wrap gap-2">
                  {selected.tags.map((tag) => (
                    <span key={tag} className="text-[10px] bg-white/5 border border-white/10 text-white/60 px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
