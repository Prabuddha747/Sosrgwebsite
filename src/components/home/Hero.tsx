import { motion } from 'motion/react';
import { ChevronRight, Users, Video } from 'lucide-react';
import type { Section } from '../../types';
import heroCollage from '../../assets/home/hero-collage.png';
import { tr } from '../../lib/i18n';

// Homepage redesign (reference boards, Aug 2026): headline copy is lifted
// verbatim from the reference — see sibling section components for the same
// rule. The three CTAs are the pre-redesign ones (Join as Talent / Casting
// Calls / Bihar Untold), restored with their original routing rather than
// the reference's "I'm an Artist" / "I'm a Studio" pair.
// Photo is still a full-bleed background, but the text block is now
// left-aligned over a left-weighted gradient (trial per Aug 2026 request)
// instead of centered, so the collage's right half stays visible — matches
// the reference boards' left-text/right-image balance without splitting
// the image into its own column.
// Photo + overlaid text use the fixed .photo-scrim/.photo-text utilities
// (see index.css) so the vignette and text stay legible in both themes —
// full-bleed photography doesn't participate in the light/dark repaint the
// way page chrome does (see the other full-bleed sections for the same
// pattern).
export const Hero = ({ setActiveSection, language }: { setActiveSection: (s: Section) => void, language: string }) => (
  <section className="relative min-h-screen flex items-end overflow-hidden">
    <img
      src={heroCollage}
      alt="A collage of SosrG creators — dance, film, music, writing, and painting"
      className="absolute inset-0 h-full w-full object-cover"
    />
    {/* Left-weighted gradient (not the old centered scrim) so the text
        block reads clearly against the busiest part of the collage while
        the artwork on the right stays visible, matching the reference
        layout's left-text/right-image balance. */}
    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/10" />
    <div className="absolute inset-0 photo-scrim-b" />
    {/* Fades into the actual page background (--color-cinematic-black,
        redefined cream in light mode) rather than a fixed dark rgba, so
        there's no hard seam where the hero meets the next section in
        light mode. */}
    <div
      className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
      style={{ background: 'linear-gradient(to top, var(--color-cinematic-black) 0%, transparent 100%)' }}
    />

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="photo-text relative z-10 text-left px-6 sm:px-12 md:px-16 max-w-xl pb-16 sm:pb-20"
    >
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.05]">
        {language === 'hi' ? (
          <>हर <span className="photo-accent">कलाकार</span> की शुरुआत कहीं न कहीं से होती है।</>
        ) : (
          <>Every <span className="photo-accent">Artist</span>{' '}
          <span className="whitespace-nowrap">Starts Somewhere.</span></>
        )}
      </h1>
      <p className="text-xl md:text-2xl font-semibold photo-text-muted mb-5">
        {language === 'hi' ? (
          <>SosrG आपको <span className="photo-accent">आगे बढ़ने</span> में मदद करता है।</>
        ) : (
          <>SosrG is here to help you <span className="photo-accent">Go Further</span>.</>
        )}
      </p>
      <p className="photo-text-muted max-w-md mb-10 leading-relaxed">
        {tr(language, 'A creative ecosystem for artists, creators and people who believe they have something worth sharing.', 'कलाकारों, क्रिएटर्स और उन लोगों के लिए एक क्रिएटिव इकोसिस्टम जो मानते हैं कि उनके पास साझा करने लायक कुछ खास है।')}
      </p>
      <div className="flex flex-col sm:flex-row items-start gap-4">
        <button
          onClick={() => setActiveSection('profile')}
          className="w-full sm:w-auto bg-gold text-black px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform flex items-center justify-center gap-2"
        >
          {tr(language, 'Join as Talent', 'टैलेंट के रूप में जुड़ें')} <ChevronRight size={18} />
        </button>
        <button
          onClick={() => setActiveSection('casting')}
          className="photo-text w-full sm:w-auto bg-[rgba(247,243,232,0.08)] backdrop-blur-md border border-[rgba(247,243,232,0.3)] px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-[rgba(247,243,232,0.15)] transition-colors flex items-center justify-center gap-2"
        >
          <Users size={18} /> {tr(language, 'Casting Calls', 'कास्टिंग कॉल्स')}
        </button>
        {/* <button
          onClick={() => setActiveSection('bihar-documentary')}
          className="photo-text w-full sm:w-auto bg-[rgba(247,243,232,0.08)] backdrop-blur-md border border-[rgba(247,243,232,0.3)] px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-[rgba(247,243,232,0.15)] transition-colors flex items-center justify-center gap-2"
        >
          <Video size={18} /> Bihar Untold
        </button> */}
      </div>
    </motion.div>
  </section>
);
