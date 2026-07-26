"use client";

import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { useParams, Link, useNavigate } from '@/lib/router-compat';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Share2, ArrowLeft } from 'lucide-react';
import { showSuccess } from '@/utils/toast';
import { getEvent, EventListing } from '@/lib/db';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<EventListing | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getEvent(id)
      .then(setEvent)
      .catch((error) => console.error('Error fetching event:', error))
      .finally(() => setLoading(false));
  }, [id]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showSuccess('Link copied to clipboard!');
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-transparent">
          <div className="w-16 h-16 border-2 border-[#B9914A]/10 border-t-[#B9914A] rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  if (!event) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center bg-transparent px-[5%] text-center">
          <h1 className="text-3xl md:text-6xl font-bold text-white mb-8 italic">Event Not Found.</h1>
          <p className="text-xl text-white/60 mb-12 italic font-light">This event has closed or never existed.</p>
          <button onClick={() => navigate('/event')} className="px-16 py-6 bg-[#B9914A] text-[#090B10] text-[10px] font-black uppercase tracking-[0.5em] hover:bg-[#B9914A]/90 transition-all duration-700">
            BACK TO EVENTS
          </button>
        </div>
      </Layout>
    );
  }

  const registrationIsLink = event.registrationInfo?.startsWith('http');

  return (
    <Layout>
      <section className="pt-40 md:pt-56 pb-40 bg-transparent min-h-screen text-[#F5F5F5] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#B9914A]/5 rounded-full blur-[180px] opacity-20" />
        </div>

        <div className="layout-container relative z-10 px-6 sm:px-8 lg:px-0">
          <Link to="/event" className="inline-flex items-center gap-4 text-white/40 font-bold text-[10px] uppercase tracking-[0.4em] mb-16 hover:text-[#B9914A] transition-colors">
            <ArrowLeft size={16} /> BACK TO EVENTS
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-32">
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <span className="text-[#B9914A] text-xs uppercase tracking-widest mb-4 block">{event.eventType}</span>
                <h1 className="text-[2rem] leading-[1.1] sm:text-4xl md:text-5xl lg:text-6xl text-white font-black mb-8 md:mb-16 tracking-tighter break-words">
                  {event.title}
                </h1>

                {event.image && (
                  <div className="aspect-video overflow-hidden mb-16 border border-white/10 rounded-xl">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="border-l-4 border-[#B9914A] pl-6 md:pl-10">
                  <p className="text-white/60 leading-relaxed text-base md:text-xl font-light">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="sticky top-32 space-y-8"
              >
                <div className="p-8 md:p-10 bg-white/5 border border-white/10 rounded-2xl">
                  <h3 className="text-xs font-black mb-8 uppercase tracking-widest border-b border-white/10 pb-4 text-white">Particulars</h3>
                  <div className="space-y-8">
                    <div className="flex items-center gap-6">
                      <div className="w-11 h-11 bg-white/5 border border-[#B9914A]/20 text-[#B9914A] rounded-xl flex items-center justify-center shrink-0">
                        <Calendar size={18} />
                      </div>
                      <div>
                        <p className="text-[9px] text-white/40 uppercase font-bold tracking-[0.2em] mb-1">Date</p>
                        <p className="text-base font-bold text-white">
                          {new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="w-11 h-11 bg-white/5 border border-[#B9914A]/20 text-[#B9914A] rounded-xl flex items-center justify-center shrink-0">
                        <MapPin size={18} />
                      </div>
                      <div>
                        <p className="text-[9px] text-white/40 uppercase font-bold tracking-[0.2em] mb-1">Location</p>
                        <p className="text-base font-bold text-white">{event.location}</p>
                      </div>
                    </div>
                  </div>

                  {event.registrationInfo && (
                    registrationIsLink ? (
                      <a
                        href={event.registrationInfo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full mt-10 text-center bg-[#B9914A] text-[#090B10] py-5 text-[11px] font-black uppercase tracking-[0.4em] hover:bg-[#F5F4F2] transition-all"
                      >
                        Register
                      </a>
                    ) : (
                      <div className="mt-10 p-5 bg-white/5 border border-white/10 rounded-xl">
                        <p className="text-[9px] text-white/40 uppercase font-bold tracking-[0.2em] mb-2">How to register</p>
                        <p className="text-sm text-white/70">{event.registrationInfo}</p>
                      </div>
                    )
                  )}

                  <button
                    onClick={handleShare}
                    className="w-full mt-4 py-5 border border-[#B9914A] text-[#B9914A] text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#B9914A] hover:text-[#090B10] transition-all"
                  >
                    <Share2 size={16} /> SHARE
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
