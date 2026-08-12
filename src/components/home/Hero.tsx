import { motion } from 'motion/react';
import { ChevronRight, Users, Video } from 'lucide-react';
import type { Section } from '../../types';

// Homepage redesign (reference boards, Aug 2026): headline copy is lifted
// verbatim from the reference — see sibling section components for the same
// rule. Per explicit direction, the photo is a full-bleed section
// background (not the split/boxed layout the reference boards actually
// show), and the three CTAs are the pre-redesign ones (Join as Talent /
// Casting Calls / Bihar Untold), restored with their original routing
// rather than the reference's "I'm an Artist" / "I'm a Studio" pair.
// Photo + overlaid text use the fixed .photo-scrim/.photo-text utilities
// (see index.css) so the vignette and text stay legible in both themes —
// full-bleed photography doesn't participate in the light/dark repaint the
// way page chrome does (see the other full-bleed sections for the same
// pattern).
export const Hero = ({ setActiveSection }: { setActiveSection: (s: Section) => void }) => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    <img
      src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2400&auto=format&fit=crop"
      alt="An artist looking out at a stage bathed in light"
      className="absolute inset-0 h-full w-full object-cover"
    />
    <div className="absolute inset-0 bg-[rgba(20,15,10,0.5)]" />
    <div className="absolute inset-0 photo-scrim-b" />

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="photo-text relative z-10 text-center px-6 max-w-4xl pt-24"
    >
      <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 leading-[1.05]">
        Every <span className="photo-accent">Artist</span> Starts Somewhere.
      </h1>
      <p className="text-xl md:text-2xl font-semibold photo-text-muted mb-5">
        SOSRG is here to help you <span className="photo-accent">Go Further</span>.
      </p>
      <p className="photo-text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
        A creative ecosystem for artists, creators and people who believe they have something worth sharing.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={() => setActiveSection('profile')}
          className="w-full sm:w-auto bg-gold text-black px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform flex items-center justify-center gap-2"
        >
          Join as Talent <ChevronRight size={18} />
        </button>
        <button
          onClick={() => setActiveSection('casting')}
          className="photo-text w-full sm:w-auto bg-[rgba(247,243,232,0.08)] backdrop-blur-md border border-[rgba(247,243,232,0.3)] px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-[rgba(247,243,232,0.15)] transition-colors flex items-center justify-center gap-2"
        >
          <Users size={18} /> Casting Calls
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
