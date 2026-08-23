import { motion } from 'motion/react';
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
      <p className="font-bold mb-10">Bring it to SosrG.</p>

      <p className="photo-text-muted text-sm italic">Everyone starts somewhere.</p>
    </motion.div>
  </section>
);
