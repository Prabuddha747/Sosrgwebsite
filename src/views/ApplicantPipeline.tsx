"use client";

import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import StudioGate from '@/components/StudioGate';
import { motion } from 'framer-motion';
import { useParams, useNavigate, Link } from '@/lib/router-compat';
import { collection, query, where, onSnapshot, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { getCastingCall, updateApplicationStatus, CastingCall, Application, ApplicationStatus } from '@/lib/db';
import { UserProfile } from '@/contexts/AuthContext';
import { MessageSquare, ArrowLeft, User } from 'lucide-react';
import { cn } from '@/lib/utils';

type EnrichedApplication = Application & { talent?: UserProfile };

const COLUMNS: { status: ApplicationStatus; label: string }[] = [
  { status: 'applied', label: 'Applied' },
  { status: 'shortlisted', label: 'Shortlisted' },
  { status: 'invited', label: 'Invited' },
  { status: 'hired', label: 'Hired' },
  { status: 'rejected', label: 'Rejected' },
];

const ApplicantCard = ({ app }: { app: EnrichedApplication }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3"
  >
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center shrink-0">
        {app.talent?.photoURL ? (
          <img src={app.talent.photoURL} alt="" className="w-full h-full object-cover" />
        ) : (
          <User size={16} className="text-white/30" />
        )}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-bold text-white truncate">{app.talent?.displayName || 'Unknown Talent'}</p>
        <p className="text-[10px] text-white/40 truncate">{app.talent?.creativeDomains?.[0] || app.talent?.skills?.[0] || ''}</p>
      </div>
    </div>

    <div className="flex flex-wrap gap-1.5">
      {COLUMNS.map((col) => (
        <button
          key={col.status}
          onClick={() => updateApplicationStatus(app.id!, col.status)}
          className={cn(
            'text-[8px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border transition-all',
            app.status === col.status
              ? 'bg-[#B9914A] text-[#090B10] border-[#B9914A]'
              : 'border-white/10 text-white/40 hover:border-[#B9914A]/50 hover:text-[#B9914A]'
          )}
        >
          {col.label}
        </button>
      ))}
    </div>

    <Link
      to={`/chat/${app.talentUid}`}
      className="flex items-center gap-2 text-[10px] text-white/50 hover:text-[#B9914A] uppercase tracking-widest font-bold transition-colors"
    >
      <MessageSquare size={12} /> Message
    </Link>
  </motion.div>
);

const ApplicantPipelineContent = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [call, setCall] = useState<CastingCall | null>(null);
  const [applications, setApplications] = useState<EnrichedApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [notAuthorized, setNotAuthorized] = useState(false);

  useEffect(() => {
    if (!id || !user) return;
    getCastingCall(id).then((data) => {
      if (!data || data.studioUid !== user.uid) {
        setNotAuthorized(true);
        setLoading(false);
        return;
      }
      setCall(data);
    });
  }, [id, user]);

  useEffect(() => {
    if (!id || !call) return;

    const talentCache = new Map<string, UserProfile>();

    // Firestore requires a query's own where-clauses to structurally satisfy
    // the security rule (which checks studioUid) — filtering by castingCallId
    // alone isn't provably safe to Firestore even though every real match
    // would pass, so it rejects the whole query. Adding studioUid here is
    // what makes the rule's ownership check verifiable at query time.
    const q = query(
      collection(db, 'applications'),
      where('castingCallId', '==', id),
      where('studioUid', '==', user!.uid),
    );
    const unsubscribe = onSnapshot(q, async (snap) => {
      const raw = snap.docs.map(d => ({ id: d.id, ...d.data() }) as Application);

      const enriched = await Promise.all(raw.map(async (app) => {
        if (!talentCache.has(app.talentUid)) {
          const snap = await getDoc(doc(db, 'profiles', app.talentUid));
          if (snap.exists()) talentCache.set(app.talentUid, snap.data() as UserProfile);
        }
        return { ...app, talent: talentCache.get(app.talentUid) };
      }));

      setApplications(enriched);
      setLoading(false);
    }, (error) => {
      console.error('Error syncing applications:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [id, call]);

  if (notAuthorized) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center bg-transparent px-[5%] text-center">
          <h1 className="text-3xl md:text-6xl font-bold text-white mb-8 italic">Not Your Casting Call.</h1>
          <button onClick={() => navigate('/studio/dashboard')} className="px-16 py-6 bg-[#B9914A] text-[#090B10] text-[10px] font-black uppercase tracking-[0.5em] hover:bg-[#B9914A]/90 transition-all duration-700">
            BACK TO DASHBOARD
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="pt-32 md:pt-40 pb-40 min-h-screen">
        <div className="layout-container px-4">
          <Link to="/studio/dashboard" className="inline-flex items-center gap-3 text-white/40 hover:text-[#B9914A] transition-colors text-[10px] font-bold uppercase tracking-[0.4em] mb-10">
            <ArrowLeft size={14} /> Dashboard
          </Link>

          <div className="mb-12">
            <span className="text-[10px] font-black uppercase tracking-[0.6em] mb-3 block text-[#B9914A]">APPLICANT PIPELINE</span>
            <h1 className="text-2xl md:text-4xl font-bold text-white tracking-tight">
              {loading ? 'Loading...' : `${call?.role} — ${call?.project}`}
            </h1>
          </div>

          {loading ? (
            <div className="h-64 rounded-2xl border border-white/5 bg-white/5 animate-pulse" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {COLUMNS.map((col) => {
                const columnApps = applications.filter(a => a.status === col.status);
                return (
                  <div key={col.status} className="space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <h3 className="text-xs font-black uppercase tracking-widest text-white/60">{col.label}</h3>
                      <span className="text-[10px] text-white/30 font-bold">{columnApps.length}</span>
                    </div>
                    <div className="space-y-3 min-h-[80px]">
                      {columnApps.map((app) => (
                        <ApplicantCard key={app.id} app={app} />
                      ))}
                      {columnApps.length === 0 && (
                        <div className="text-center py-6 border border-dashed border-white/5 rounded-xl">
                          <p className="text-[10px] text-white/20 uppercase tracking-widest">Empty</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

const ApplicantPipeline = () => (
  <StudioGate backTo="/studio/dashboard" backLabel="Back to Dashboard">
    <ApplicantPipelineContent />
  </StudioGate>
);

export default ApplicantPipeline;
