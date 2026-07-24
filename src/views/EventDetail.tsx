"use client";

import React from 'react';
import Layout from '@/components/Layout';
import { useParams, Link, useNavigate } from '@/lib/router-compat';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Share2, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const eventsData: Record<string, any> = {
    "bihar-creators-documentary": {
      title: "BIHAR CREATORS DOCUMENTARY INITIATIVE",
      date: "APRIL 26, 2026",
      location: "ACROSS BIHAR STATE",
      image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1200",
      description: "A landmark project by SosrG Studios aimed at uncovering and celebrating the rich, often overlooked artistic heritage of Bihar. From traditional folk arts to modern cinematic expressions, this initiative will document the journeys of creators from every corner of the state.",
      highlights: [
        "Documenting 100+ local creators",
        "Showcasing Madhubani and Manjusha art forms",
        "Interviews with veteran theatre artists",
        "Digital archiving of regional music",
        "Platform for young filmmakers to showcase Bihar's stories"
      ],
      organizer: "SosrG Studios & Bihar Cultural Wing"
    }
  };

  const event = eventsData[id || ""] || eventsData["bihar-creators-documentary"];

  const handleRegister = () => {
    if (id === "bihar-creators-documentary" || !id) {
      navigate("/bihar-creators-registration");
    } else {
      showSuccess("Interest registered! Our team will contact you soon.");
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showSuccess("Link copied to clipboard!");
  };

  return (
    <Layout>
      <section className="pt-56 pb-40 bg-transparent min-h-screen text-[#F5F5F5] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#5490B4]/5 rounded-full blur-[180px] opacity-20" />
        </div>
        
        <div className="layout-container relative z-10 px-6 sm:px-8 lg:px-0">
          <Link to="/event" className="inline-flex items-center gap-4 text-white/40 font-bold text-[10px] uppercase tracking-[0.4em] mb-16 hover:text-[#5490B4] transition-colors">
            <ArrowLeft size={16} /> BACK TO COLLECTION
          </Link>
 
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-32">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-[2rem] leading-[1.1] sm:text-4xl md:text-5xl lg:text-7xl text-white font-black mb-8 md:mb-16 tracking-tighter font-sans break-words hyphens-auto">
                  {event.title}
                </h1>
                
                <div className="aspect-video overflow-hidden mb-20 border border-white/10 rounded-xl">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
                </div>
 
                <div className="space-y-20">
                  <div className="border-l-4 md:border-l-8 border-[#5490B4] pl-5 md:pl-12">
                    <h2 className="text-lg sm:text-xl md:text-3xl text-white font-black mb-4 md:mb-8 tracking-tight font-sans">THE INITIATIVE</h2>
                    <p className="text-white/60 leading-relaxed text-sm sm:text-base md:text-xl lg:text-2xl font-light italic">
                      {event.description}
                    </p>
                  </div>
                  
                  <div className="bg-white/5 p-6 sm:p-8 md:p-12 lg:p-20 border border-white/10 rounded-2xl backdrop-blur-md">
                    <h3 className="text-lg md:text-2xl text-white font-black mb-6 md:mb-12 tracking-tight uppercase font-sans">Key Highlights</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10">
                      {event.highlights.map((item: string, i: number) => (
                        <div key={i} className="flex items-start gap-4 md:gap-6 group">
                          <CheckCircle2 className="text-[#5490B4]/40 group-hover:text-[#5490B4] mt-0.5 md:mt-1 shrink-0 transition-colors" size={18} />
                          <span className="text-xs sm:text-sm md:text-base font-light text-white/50 group-hover:text-white transition-colors leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
 
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="sticky top-40 space-y-12"
              >
                <div className="p-8 md:p-12 lg:p-16 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md shadow-2xl relative overflow-hidden">
                  <h3 className="text-xs md:text-sm font-black mb-8 md:mb-12 uppercase tracking-widest border-b border-white/10 pb-4 md:pb-6 text-white font-sans">Particulars</h3>
                  <div className="space-y-12">
                    <div className="flex items-center gap-8">
                      <div className="w-12 h-12 bg-white/5 border border-[#5490B4]/20 text-[#5490B4] rounded-xl flex items-center justify-center">
                        <Calendar size={20} />
                      </div>
                      <div>
                        <p className="text-[9px] text-white/40 uppercase font-bold tracking-[0.2em] mb-1">Date</p>
                        <p className="text-lg font-bold text-white">{event.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="w-12 h-12 bg-white/5 border border-[#5490B4]/20 text-[#5490B4] rounded-xl flex items-center justify-center">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <p className="text-[9px] text-white/40 uppercase font-bold tracking-[0.2em] mb-1">Location</p>
                        <p className="text-lg font-bold text-white">{event.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="w-12 h-12 bg-white/5 border border-[#5490B4]/20 text-[#5490B4] rounded-xl flex items-center justify-center">
                        <Users size={20} />
                      </div>
                      <div>
                        <p className="text-[9px] text-white/40 uppercase font-bold tracking-[0.2em] mb-1">Organizer</p>
                        <p className="text-lg font-bold text-white">{event.organizer}</p>
                      </div>
                    </div>
                  </div>
 
                  <button 
                    onClick={handleRegister}
                    className="w-full mt-20 bg-[#5490B4] text-[#1A1A1A] py-6 text-[11px] font-black uppercase tracking-[0.5em] hover:bg-[#5490B4]/90 transition-all font-sans"
                  >
                    APPLY NOW
                  </button>
                  
                  <button 
                    onClick={handleShare}
                    className="w-full mt-6 py-6 border border-[#5490B4] text-[#5490B4] text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-[#5490B4] hover:text-[#1A1A1A] transition-all font-sans"
                  >
                    <Share2 size={16} /> SHARE
                  </button>
                </div>
 
                <div className="p-12 bg-white/5 border border-white/10 rounded-xl">
                  <h4 className="text-xs font-black mb-6 uppercase tracking-widest text-white font-sans">Participation</h4>
                  <p className="text-sm text-white/60 font-light mb-10 italic">
                    For creators seeking feature positioning in our upcoming initiatives.
                  </p>
                  <button className="text-[#5490B4] font-bold text-[9px] uppercase tracking-[0.3em] flex items-center gap-4 hover:tracking-[0.4em] hover:text-white transition-all font-sans">
                    CONTACT LIAISON <ArrowLeft size={14} className="rotate-180" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default EventDetail;