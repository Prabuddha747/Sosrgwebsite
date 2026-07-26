"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Sparkles, Shield, ArrowRight } from 'lucide-react';
import { addSubscriber } from '@/lib/db';
import { showSuccess, showError } from '@/utils/toast';

const NewsletterPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const hasSubscribed = localStorage.getItem('sosrg_subscribed');
    const hasClosed = localStorage.getItem('sosrg_popup_closed');
    
    if (!hasSubscribed && !hasClosed) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('sosrg_popup_closed', 'true');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      await addSubscriber({
        email,
        source: 'popup',
      });
      showSuccess("Welcome to the inner circle. ✨");
      localStorage.setItem('sosrg_subscribed', 'true');
      setIsVisible(false);
    } catch (error: any) {
      console.error("Newsletter Popup Error:", error);
      if (error.message === "ALREADY_SUBSCRIBED") {
        showSuccess("You are already within the sanctuary.");
        setTimeout(() => setIsVisible(false), 2000);
      } else {
        showError("The connection failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 overflow-y-auto">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-[#0B0F13]/80 backdrop-blur-md cursor-pointer"
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            className="relative w-full max-w-[500px] liquid-glass p-8 md:p-16 shadow-2xl border border-white/10 z-[101] my-auto rounded-3xl overflow-hidden"
          >
            {/* Top accent line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-[#B9914A] opacity-50" />

            {/* Close Button */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
              className="absolute top-4 right-4 md:top-6 md:right-6 p-2 md:p-3 text-white/40 hover:text-white hover:bg-white/10 rounded-full transition-all z-[102] group"
              aria-label="Close Invitation"
            >
              <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
            </button>

            <div className="text-center mt-4">
              <div className="w-14 h-14 md:w-16 md:h-16 liquid-glass rounded-full border border-white/10 flex items-center justify-center mx-auto mb-8 md:mb-10 shadow-lg relative">
                <div className="absolute inset-0 bg-[#B9914A]/10 rounded-full blur-md" />
                <Mail className="text-[#B9914A] w-5 h-5 md:w-6 md:h-6 relative z-10" />
              </div>

              <div className="flex justify-center mb-6 md:mb-8">
                <span className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 bg-transparent border border-white/10 rounded-full text-[#B9914A] text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] shadow-sm">
                  <Sparkles size={10} className="animate-pulse" />
                  Exclusive Invitation
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 md:mb-8 leading-none tracking-tighter font-serif italic">
                Curated <br className="hidden md:block" />
                <span className="text-[#B9914A] not-italic font-sans">Artistic Growth.</span>
              </h2>
              
              <p className="text-white/60 mb-8 md:mb-12 max-w-[300px] md:max-w-[340px] mx-auto font-light leading-relaxed text-sm md:text-base">
                Join our elite circle of creators and receive premier opportunities directly in your sanctuary.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER EMAIL ADDRESS"
                  className="w-full bg-transparent border border-white/10 rounded-full py-4 md:py-6 px-6 md:px-10 focus:outline-none focus:border-[#B9914A] focus:bg-white/5 transition-all placeholder:text-white/20 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-white shadow-inner"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 md:py-6 liquid-glass rounded-full border border-white/10 text-white text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] shadow-xl hover:bg-[#B9914A] hover:border-[#B9914A] transition-all duration-700 disabled:opacity-30 flex items-center justify-center gap-4 group"
                >
                  {isSubmitting ? "SYNCHRONIZING..." : (
                    <>SECURE ACCESS <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" /></>
                  )}
                </button>
              </form>

              <div className="mt-8 md:mt-10 flex items-center justify-center gap-3 md:gap-4 text-[8px] md:text-[9px] text-white/20 uppercase font-black tracking-[0.4em]">
                <Shield size={10} className="text-[#B9914A] opacity-50" />
                EXCLUSIVITY GUARANTEED.
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default NewsletterPopup;
