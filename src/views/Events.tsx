"use client";

import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowRight, Plus, Search } from 'lucide-react';
import { Link, useNavigate } from '@/lib/router-compat';
import { useAuth } from '@/contexts/AuthContext';
import { getLiveEvents, EventListing } from '@/lib/db';

const Events = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const [events, setEvents] = useState<EventListing[]>([]);
  const [loading, setLoading] = useState(true);
  const cinematicTransition: any = { duration: 0.8, ease: [] as any };

  useEffect(() => {
    getLiveEvents()
      .then(setEvents)
      .catch((error) => console.error('Error fetching events:', error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      {/* Header */}
      <section className="pt-40 md:pt-56 pb-24 bg-transparent border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#B9914A]/5 rounded-full blur-[150px]" />
        </div>
        <div className="layout-container text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={cinematicTransition}
          >
            <span className="inline-block text-[#B9914A] text-[10px] font-bold uppercase tracking-[0.6em] mb-8">
              EVENTS
            </span>
            <h1 className="text-[clamp(2.5rem,7vw,5.5rem)] font-bold text-white mb-8 leading-none">
              Where the ecosystem <span className="text-[#B9914A] italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>gathers.</span>
            </h1>
            <p className="text-lg text-white/50 max-w-xl mx-auto font-light leading-relaxed mb-10">
              Festivals, screenings, productions — real gatherings, not a placeholder calendar.
            </p>
            {profile?.activeWorkspace === 'studio' && (
              <Link
                to="/event/new"
                className="inline-flex items-center gap-2 bg-[#B9914A] text-[#090B10] px-6 py-3 rounded-full text-sm font-medium hover:bg-[#F5F4F2] transition-colors"
              >
                <Plus size={18} /> Organize an Event
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-24 md:py-32 bg-transparent">
        <div className="layout-container">
          {loading ? (
            <div className="space-y-10 max-w-4xl mx-auto">
              {[1, 2].map((i) => (
                <div key={i} className="h-64 rounded-2xl border border-white/5 bg-white/5 animate-pulse" />
              ))}
            </div>
          ) : events.length === 0 ? (
            <div className="max-w-xl mx-auto py-24 text-center border border-dashed border-white/10 rounded-2xl">
              <Search size={40} className="mx-auto text-white/20 mb-6" />
              <p className="text-white/40 uppercase tracking-widest text-sm font-bold">
                No live events right now — check back soon.
              </p>
            </div>
          ) : (
            <div className="space-y-24">
              {events.map((event, i) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.05 }}
                  className="group flex flex-col lg:flex-row items-center gap-10 md:gap-16 cursor-pointer"
                  onClick={() => navigate(`/event/${event.id}`)}
                >
                  <div className="w-full lg:w-1/2 relative aspect-[16/10] overflow-hidden border border-white/10 rounded-xl bg-white/5">
                    {event.image ? (
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1.5s]"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/10">
                        <Calendar size={48} />
                      </div>
                    )}
                    <div className="absolute top-6 right-6 bg-[#090B10]/90 border border-white/10 px-5 py-2 rounded-sm">
                      <span className="text-[9px] text-[#B9914A] font-black uppercase tracking-widest">{event.eventType}</span>
                    </div>
                  </div>

                  <div className="w-full lg:w-1/2 space-y-8">
                    <div className="space-y-3">
                      <div className="flex items-center gap-6 text-[9px] font-bold uppercase tracking-[0.3em]">
                        <span className="flex items-center gap-2 text-white/60"><Calendar size={12} className="text-[#B9914A]" /> {new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        <span className="flex items-center gap-2 text-white/60"><MapPin size={12} className="text-[#B9914A]" /> {event.location}</span>
                      </div>
                      <h2 className="text-2xl md:text-4xl text-white font-bold leading-tight">
                        {event.title}
                      </h2>
                    </div>

                    <p className="text-base text-white/50 font-light leading-relaxed max-w-lg line-clamp-3">
                      {event.description}
                    </p>

                    <Link
                      to={`/event/${event.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-3 bg-[#B9914A] text-[#090B10] px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#F5F4F2] transition-colors"
                    >
                      View Details <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Events;
