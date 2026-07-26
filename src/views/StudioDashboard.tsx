"use client";

import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import StudioGate from '@/components/StudioGate';
import { motion } from 'framer-motion';
import { Link } from '@/lib/router-compat';
import { useAuth } from '@/contexts/AuthContext';
import {
  getCastingCallsForStudio, getEventsForStudio, getApplicationsForStudio, getStudioProfile,
  CastingCall, EventListing, Application, StudioProfile,
} from '@/lib/db';
import { Plus, Users, Briefcase, Calendar, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const statusColor: Record<string, string> = {
  live: 'text-[#B9914A] border-[#B9914A]/30',
  draft: 'text-white/40 border-white/10',
  closed: 'text-white/30 border-white/10',
};

const StudioDashboardContent = () => {
  const { user } = useAuth();
  const [studioProfile, setStudioProfile] = useState<StudioProfile | null>(null);
  const [calls, setCalls] = useState<CastingCall[]>([]);
  const [events, setEvents] = useState<EventListing[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const cinematicTransition: any = { duration: 0.8, ease: [] as any };

  useEffect(() => {
    if (!user) return;
    Promise.all([
      getStudioProfile(user.uid),
      getCastingCallsForStudio(user.uid),
      getEventsForStudio(user.uid),
      getApplicationsForStudio(user.uid),
    ])
      .then(([s, c, e, a]) => {
        setStudioProfile(s);
        setCalls(c);
        setEvents(e);
        setApplications(a);
      })
      .catch((error) => console.error('Error loading studio dashboard:', error))
      .finally(() => setLoading(false));
  }, [user]);

  const applicantCount = (callId?: string) => applications.filter(a => a.castingCallId === callId).length;
  const liveCallCount = calls.filter(c => c.status === 'live').length;
  const liveEventCount = events.filter(e => e.status === 'live').length;

  return (
    <Layout>
      <section className="pt-32 md:pt-40 pb-40 min-h-screen">
        <div className="layout-container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={cinematicTransition}
            className="mb-16 border-b border-white/10 pb-10"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.6em] mb-4 block text-[#B9914A]">STUDIO DASHBOARD</span>
            <h1 className="text-3xl md:text-6xl font-bold text-white tracking-tighter mb-2">
              {studioProfile?.orgName ?? 'Your Studio'}
            </h1>
            <p className="text-white/40 text-sm">Everything you've posted, in one place.</p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-20">
            {[
              { label: 'Live Casting Calls', value: liveCallCount, icon: Briefcase },
              { label: 'Total Applicants', value: applications.length, icon: Users },
              { label: 'Live Events', value: liveEventCount, icon: Calendar },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 border border-white/10 rounded-2xl p-8 flex items-center gap-6">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-[#B9914A]/20 text-[#B9914A] flex items-center justify-center shrink-0">
                  <stat.icon size={20} />
                </div>
                <div>
                  <p className="text-3xl font-black text-white leading-none mb-1">{stat.value}</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Casting Calls */}
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Casting Calls</h2>
              <Link to="/casting/new" className="inline-flex items-center gap-2 text-[#B9914A] text-xs font-bold uppercase tracking-widest hover:text-[#F5F4F2] transition-colors">
                <Plus size={16} /> New Casting Call
              </Link>
            </div>

            {loading ? (
              <div className="h-32 rounded-2xl border border-white/5 bg-white/5 animate-pulse" />
            ) : calls.length === 0 ? (
              <div className="py-16 text-center border border-dashed border-white/10 rounded-2xl">
                <p className="text-white/40 uppercase tracking-widest text-sm font-bold">Nothing posted yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {calls.map((call) => (
                  <div key={call.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className={cn('text-[9px] uppercase tracking-widest font-bold border px-2 py-1 rounded-sm', statusColor[call.status])}>{call.status}</span>
                        <span className="text-white/40 text-xs">{applicantCount(call.id)} applicant{applicantCount(call.id) === 1 ? '' : 's'}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white">{call.role} — {call.project}</h3>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <Link to={`/casting/${call.id}`} className="text-xs text-white/50 hover:text-white uppercase tracking-widest font-bold">View</Link>
                      <Link
                        to={`/studio/casting/${call.id}/applicants`}
                        className="inline-flex items-center gap-2 bg-[#B9914A] text-[#090B10] px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#F5F4F2] transition-colors"
                      >
                        Applicants <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Events */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Events</h2>
              <Link to="/event/new" className="inline-flex items-center gap-2 text-[#B9914A] text-xs font-bold uppercase tracking-widest hover:text-[#F5F4F2] transition-colors">
                <Plus size={16} /> New Event
              </Link>
            </div>

            {loading ? (
              <div className="h-32 rounded-2xl border border-white/5 bg-white/5 animate-pulse" />
            ) : events.length === 0 ? (
              <div className="py-16 text-center border border-dashed border-white/10 rounded-2xl">
                <p className="text-white/40 uppercase tracking-widest text-sm font-bold">Nothing organized yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <span className={cn('text-[9px] uppercase tracking-widest font-bold border px-2 py-1 rounded-sm mb-1 inline-block', statusColor[event.status])}>{event.status}</span>
                      <h3 className="text-lg font-bold text-white">{event.title}</h3>
                    </div>
                    <Link to={`/event/${event.id}`} className="text-xs text-white/50 hover:text-white uppercase tracking-widest font-bold shrink-0">View</Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

const StudioDashboard = () => (
  <StudioGate backTo="/" backLabel="Back Home">
    <StudioDashboardContent />
  </StudioGate>
);

export default StudioDashboard;
