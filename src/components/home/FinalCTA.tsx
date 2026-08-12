import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import ctaImage from '../../assets/community/CTA.png';

export const FinalCTA = () => (
  <section className="relative py-16 sm:py-32 px-6 overflow-hidden">
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <img
        src={ctaImage}
        alt=""
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 photo-scrim-b" />
    </div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7 }}
      className="photo-text relative z-10 text-center max-w-2xl mx-auto"
    >
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
        Your art doesn't have to stay an idea.
      </h2>
      <p className="photo-text-muted mb-2">Bring what you know.</p>
      <p className="photo-text-muted mb-2">Bring what you're learning.</p>
      <p className="photo-text-muted mb-2">Bring what you're dreaming about.</p>
      <p className="font-bold mb-10">Bring it to SOSRG.</p>

      {/* <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          to="/signup?intent=artist"
          className="w-full sm:w-auto bg-gold text-black px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform"
        >
          Join as an Artist
        </Link>
        <Link
          to="/signup?intent=studio"
          className="photo-text w-full sm:w-auto bg-[rgba(247,243,232,0.08)] backdrop-blur-md border border-[rgba(247,243,232,0.3)] px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-[rgba(247,243,232,0.15)] transition-colors"
        >
          Join as a Studio
        </Link>
      </div> */}
      <p className="photo-text-muted mt-8 text-sm italic">Everyone starts somewhere.</p>
    </motion.div>
  </section>
);
