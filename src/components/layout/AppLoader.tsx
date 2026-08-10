import { motion } from 'motion/react';
import logo from '../../assets/logo-loader.jpg';

// Shown while AuthContext resolves the initial session check (GET /v1/me +
// GET /v1/profiles/me) — previously that state existed but nothing ever
// rendered from it, so the app just sat blank for a beat on a slow network.
export const AppLoader = () => (
  <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-cinematic-black">
    <motion.img
      src={logo}
      alt="SosrG"
      className="w-20 h-20 rounded-2xl object-cover"
      animate={{ opacity: [0.5, 1, 0.5], scale: [0.96, 1, 0.96] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
    />
    <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/40">SosrG</span>
  </div>
);
