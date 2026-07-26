"use client";

import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import NewsletterPopup from './NewsletterPopup';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { ChevronUp, Mail } from 'lucide-react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { markAllNotificationsRead } from '@/lib/db';
import { useNavigate } from '@/lib/router-compat';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { scrollYProgress } = useScroll();
  const [showBackToTop, setShowBackToTop] = React.useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [hasUnread, setHasUnread] = useState(false);
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Live unread badge for the floating Inbox button — blinks the moment a
  // new notification (new application, referral reward, etc.) lands.
  useEffect(() => {
    if (!user) {
      setHasUnread(false);
      return;
    }
    const q = query(collection(db, 'notifications'), where('userId', '==', user.uid), where('read', '==', false));
    const unsubscribe = onSnapshot(q, (snap) => setHasUnread(!snap.empty));
    return () => unsubscribe();
  }, [user]);

  const handleOpenInbox = () => {
    if (user) markAllNotificationsRead(user.uid).catch((error) => console.error('Error marking notifications read:', error));
    navigate('/inbox');
  };

  return (
    <div className="min-h-screen bg-transparent text-white font-sans overflow-x-hidden relative">
      {/* Premium Minimalist Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-transparent">
        {/* Subtle Bronze Drifts */}
        <div className="absolute top-[10%] right-[-5%] w-[40%] h-[40%] bg-[#B9914A]/5 rounded-full blur-[160px]" />
        <div className="absolute bottom-[10%] left-[-5%] w-[30%] h-[30%] bg-white/5 rounded-full blur-[140px]" />
      </div>

      {/* Subtle Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[99] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
      
      {/* Minimalist Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#B9914A] z-[100] origin-left"
        style={{ scaleX }}
      />
      
      <Navbar />
      <main className="relative z-10 pt-24 pb-12">
        {children}
      </main>
      <Footer />
      <NewsletterPopup />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-4 md:bottom-8 md:right-8 z-[60] flex flex-col gap-4 items-center">
        {/* Back to Top */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-12 h-12 liquid-glass flex items-center justify-center text-[#B9914A] rounded-full shadow-2xl hover:bg-white hover:text-black transition-all group border border-[#B9914A]/20"
            >
              <ChevronUp size={20} className="group-hover:scale-125 transition-transform" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Inbox Button — same Mail icon as the Navbar, live-blinking on unread */}
        <button
          onClick={handleOpenInbox}
          className="relative w-14 h-14 bg-[#B9914A] hover:bg-[#F5F4F2] flex items-center justify-center text-[#090B10] rounded-full shadow-[0_0_20px_rgba(185,145,74,0.4)] hover:shadow-[0_0_30px_rgba(185,145,74,0.6)] hover:-translate-y-1 transition-all duration-300"
          title="Open Inbox"
        >
          <Mail className="w-6 h-6" />
          {hasUnread && (
            <span className="absolute top-1 right-1 w-3 h-3 rounded-full bg-red-500 border-2 border-[#090B10] animate-pulse" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Layout;