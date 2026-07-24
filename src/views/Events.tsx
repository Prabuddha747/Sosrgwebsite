"use client";

import React, { useMemo } from 'react';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Ticket, ArrowRight, Sparkles } from 'lucide-react';
import { Link, useNavigate } from '@/lib/router-compat';

const Events = () => {
  const navigate = useNavigate();
  const cinematicTransition: any = { duration: 0.8, ease: [] as any };

  const upcomingEvents = useMemo(() => [
    {
      id: "bihar-creators-documentary",
      title: "THE BIHAR CREATORS DOCUMENTARY",
      date: "MAY 2026",
      location: "PATNA / DIGITAL GLOBAL",
      type: "FILM PRODUCTION",
      desc: "An elite cinematic exploration of Bihar's most influential and promising creative visionaries.",
      image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=1000",
      link: "/event/bihar-creators-documentary"
    }
  ], []);

  return (
    <Layout>
      {/* Studio Header */}
      <section className="pt-56 pb-40 bg-transparent border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#5490B4]/5 rounded-full blur-[180px] opacity-20" />
        </div>
        <div className="layout-container text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={cinematicTransition}
          >
            <span className="inline-block text-[#5490B4] text-[10px] font-bold uppercase tracking-[0.6em] mb-8">
              PROTOCOL / ASSEMBLIES
            </span>
            <h1 className="text-[clamp(2.5rem,8vw,5.5rem)] font-serif font-bold text-white mb-16 leading-none">
              Elite <span className="text-[#5490B4] italic font-light">Creative</span> <br />
              Engagements.
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
              Curating the most prestigious festivals and production initiatives for the artistic community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-40 bg-transparent">
        <div className="layout-container">
          <div className="space-y-40">
            {upcomingEvents.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="group flex flex-col lg:flex-row items-center gap-8 md:gap-20 lg:gap-32 cursor-pointer"
                onClick={() => navigate(event.link)}
              >
                {/* Visual Canvas */}
                <div className="w-full lg:w-1/2 relative aspect-[16/10] overflow-hidden border border-white/10 rounded-xl">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2s]"
                  />
                  <div className="absolute top-8 right-8 bg-[#12161f] border border-white/10 px-6 py-2">
                    <span className="text-[9px] text-[#5490B4] font-black uppercase tracking-widest">{event.type}</span>
                  </div>
                </div>

                {/* Content Panel */}
                <div className="w-full lg:w-1/2 space-y-10">
                  <div className="space-y-4">
                    <div className="flex items-center gap-8 text-[#5490B4]/60 text-[9px] font-bold uppercase tracking-[0.3em]">
                      <span className="flex items-center gap-2 text-white/60"><Calendar size={12} className="text-[#5490B4]" /> {event.date}</span>
                      <span className="flex items-center gap-2 text-white/60"><MapPin size={12} className="text-[#5490B4]" /> {event.location}</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl text-white font-black leading-none group-hover:tracking-wider transition-all duration-700 font-sans">
                      {event.title}
                    </h2>
                  </div>
                  
                  <p className="text-lg text-white/60 font-light leading-relaxed max-w-xl">
                    {event.desc}
                  </p>

                  <div className="flex items-center gap-12 pt-10">
                    <button 
                      onClick={(e) => { e.stopPropagation(); navigate(event.link); }}
                      className="px-12 py-5 bg-[#5490B4] text-[#1A1A1A] text-[10px] font-black uppercase tracking-[0.4em] hover:bg-[#5490B4]/90 transition-all font-sans"
                    >
                      REGISTER
                    </button>
                    <Link to={event.link} onClick={(e) => e.stopPropagation()} className="text-white/40 hover:text-[#5490B4] text-[10px] uppercase tracking-[0.4em] font-bold transition-all flex items-center gap-4">
                      PROTOCOL <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Section */}
      <section className="py-60 bg-white/5 border-t border-white/10 backdrop-blur-md">
        <div className="layout-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={cinematicTransition}
            className="max-w-4xl mx-auto"
          >
            <div className="w-16 h-16 border border-white/10 flex items-center justify-center mx-auto mb-16 rounded-xl">
              <Sparkles size={24} className="text-[#5490B4]" />
            </div>
            <h2 className="text-3xl md:text-6xl font-bold mb-12 tracking-tight text-white font-sans">
              ORCHESTRATE THE <span className="text-[#5490B4] italic font-light">FUTURE.</span>
            </h2>
            <p className="text-xl text-white/60 font-light max-w-2xl mx-auto mb-20">
              Apply to join the guild as an organizer or volunteer for our upcoming grand festivals.
            </p>
            <button className="px-16 py-6 border border-[#5490B4] text-[#5490B4] text-[11px] font-bold uppercase tracking-[0.4em] hover:bg-[#5490B4] hover:text-[#1A1A1A] transition-all font-sans">
              JOIN THE COMMITTEE
            </button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Events;