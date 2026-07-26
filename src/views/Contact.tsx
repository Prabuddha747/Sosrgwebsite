"use client";

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Globe } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const cinematicTransition: any = { duration: 0.8, ease: [] as any };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      showSuccess("Message transmitted successfully. We will engage shortly.");
      setIsSubmitting(false);
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <Layout>
      <section className="pt-56 pb-40 bg-transparent min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#B9914A]/5 rounded-full blur-[180px] opacity-20" />
        </div>
        
        <div className="layout-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-32 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={cinematicTransition}
            >
              <span className="text-[#B9914A] text-[10px] font-bold uppercase tracking-[0.6em] mb-8 block">CORRESPONDENCE</span>
              <h1 className="text-4xl md:text-8xl font-black text-white tracking-tighter leading-none mb-16 font-sans">
                CONNECT.
              </h1>
              <p className="text-xl text-white/60 mb-20 leading-relaxed font-light italic max-w-lg">
                Whether you have a refined inquiry or a visionary collaboration in mind, our curators are prepared to engage with you.
              </p>

              <div className="space-y-12">
                {[
                  { icon: Phone, label: "WhatsApp", value: "Message on WhatsApp", href: "https://wa.me/message/A36K3OVFIWT2B1" },
                  { icon: Mail, label: "Digital", value: "sosrgstudios@gmail.com", href: "mailto:sosrgstudios@gmail.com" },
                  { icon: MapPin, label: "Presence", value: "View on Map", href: "https://maps.app.goo.gl/zPzrpdtZ1dArQjUE7" },
                  { icon: Globe, label: "LinkedIn", value: "SosrG StudioS", href: "https://www.linkedin.com/company/sosrgstudios/" },
                  { icon: Globe, label: "Instagram", value: "SosrG StudioS", href: "https://www.instagram.com/sosrgstudios" },
                  { icon: Globe, label: "Instagram", value: "SosrG StudioS Rohtak", href: "https://www.instagram.com/sosrgstudios_rohtak" },
                  { icon: Globe, label: "Instagram", value: "SosrG CastinG", href: "https://www.instagram.com/sosrgcasting" },
                  { icon: Globe, label: "Facebook", value: "SosrG StudioS", href: "https://www.facebook.com/sosrgstudios" },
                  { icon: Globe, label: "Facebook", value: "SosrG StudioS Rohtak", href: "https://www.facebook.com/sosrgstudios_rohtak" },
                ].map((item, i) => (
                  <a key={i} href={item.href} target="_blank" rel="noreferrer" className="flex items-center gap-6 md:gap-10 group cursor-pointer">
                    <div className="w-12 h-12 shrink-0 bg-white/5 border border-[#B9914A]/20 text-[#B9914A] flex items-center justify-center transition-all duration-300 group-hover:bg-[#B9914A] group-hover:text-[#1A1A1A] group-hover:scale-110">
                      <item.icon size={18} />
                    </div>
                    <div>
                      <p className="text-[9px] text-[#B9914A]/50 uppercase font-bold tracking-[0.4em] mb-2">{item.label}</p>
                      <p className="text-lg md:text-xl font-bold text-white leading-none group-hover:text-[#B9914A] transition-colors">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...cinematicTransition, delay: 0.2 }}
              className="p-6 md:p-16 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md"
            >
              <form onSubmit={handleSubmit} className="space-y-12">
                <div className="space-y-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 ml-4">Identification</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Your Full Name"
                      className="form-input-premium"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 ml-4">Digital Address</label>
                    <input 
                      required
                      type="email" 
                      placeholder="your@email.com"
                      className="form-input-premium"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 ml-4">Nature of Inquiry</label>
                    <div className="relative group">
                      <select className="form-input-premium appearance-none cursor-pointer">
                        <option className="bg-[#12161f] text-[#F5F5F5]">General Correspondence</option>
                        <option className="bg-[#12161f] text-[#F5F5F5]">Service Consultation</option>
                        <option className="bg-[#12161f] text-[#F5F5F5]">Strategic Partnership</option>
                        <option className="bg-[#12161f] text-[#F5F5F5]">Creator Acquisition</option>
                      </select>
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-white/20">
                        <Send size={14} className="rotate-90" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 ml-4">The Brief</label>
                    <textarea 
                      required
                      rows={5}
                      placeholder="Manifest your creative vision..."
                      className="form-input-premium resize-none h-40"
                    />
                  </div>
                </div>
                <button 
                  disabled={isSubmitting}
                  className="w-full bg-[#B9914A] text-[#1A1A1A] !py-8 !text-[11px] font-black uppercase tracking-[0.5em] flex items-center justify-center gap-6 hover:bg-[#B9914A]/90 transition-all font-sans"
                >
                  {isSubmitting ? "TRANSMITTING..." : (
                    <>
                      TRANSMIT <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;