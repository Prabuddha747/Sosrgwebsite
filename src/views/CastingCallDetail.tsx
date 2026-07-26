"use client";

import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from '@/lib/router-compat';
import { useAuth } from '@/contexts/AuthContext';
import { showError, showSuccess } from '@/utils/toast';
import { getCastingCall, applyCastingCall, hasAppliedToCall, CastingCall } from '@/lib/db';
import { ArrowLeft, MapPin, Clock, Wallet, Sparkles, CheckCircle2 } from 'lucide-react';

const CastingCallDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const [call, setCall] = useState<CastingCall | null>(null);
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState(false);
  const [applying, setApplying] = useState(false);
  const cinematicTransition: any = { duration: 0.8, ease: [] as any };

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const data = await getCastingCall(id);
        setCall(data);
        if (data && user) {
          setApplied(await hasAppliedToCall(id, user.uid));
        }
      } catch (error) {
        console.error('Error fetching casting call:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, user]);

  // Talent can only apply to calls that share at least one creative domain
  // with their own profile — a literal tag match, not a fuzzy score.
  const talentTags = (profile?.creativeDomains?.length ? profile.creativeDomains : profile?.skills) || [];
  const callTags = call?.creativeDomain || [];
  const tagsMatch = talentTags.some(t => callTags.some(c => c.trim().toLowerCase() === t.trim().toLowerCase()));

  const handleApply = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!call?.id) return;
    setApplying(true);
    try {
      await applyCastingCall(call.id, user.uid, call.studioUid, `${call.role} — ${call.project}`);
      setApplied(true);
      showSuccess('Application sent.');
    } catch (error: any) {
      showError(error.message || 'Could not submit application.');
    } finally {
      setApplying(false);
    }
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

  if (!call) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center bg-transparent px-[5%] text-center">
          <h1 className="text-3xl md:text-6xl font-bold text-white mb-8 premium-serif italic">Call Not Found.</h1>
          <p className="text-xl text-white/60 mb-12 italic font-light">This casting call has closed or never existed.</p>
          <button onClick={() => navigate('/casting')} className="px-16 py-6 bg-[#B9914A] text-[#090B10] text-[10px] font-black uppercase tracking-[0.5em] hover:bg-[#B9914A]/90 transition-all duration-700 font-sans">
            BACK TO CASTING CALLS
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="pt-16 pb-40 bg-transparent min-h-screen relative overflow-hidden">
        <div className="layout-container relative z-10 text-[#F5F5F5]">
          <button
            onClick={() => navigate(-1)}
            className="mb-16 flex items-center gap-4 text-white/40 hover:text-[#B9914A] transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
            <span className="text-[10px] font-bold uppercase tracking-[0.6em]">BACK</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-20 lg:gap-32 items-start">
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={cinematicTransition}
              >
                <p className="text-[#B9914A] text-xs uppercase tracking-widest mb-4">
                  {call.creativeDomain?.join(' · ') || 'Creative Opportunity'}
                </p>
                <h1 className="text-3xl md:text-6xl font-bold text-white tracking-tighter mb-6 premium-serif">
                  {call.role}
                </h1>
                <p className="text-white/60 text-lg mb-12">{call.project}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 border-y border-white/10 py-8">
                  <div className="flex flex-col gap-2">
                    <MapPin size={16} className="text-[#B9914A]" />
                    <span className="text-white/80 text-sm">{call.location}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Wallet size={16} className="text-[#B9914A]" />
                    <span className="text-white/80 text-sm">{call.compensation}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Clock size={16} className="text-[#B9914A]" />
                    <span className="text-white/80 text-sm">{call.timeline}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Sparkles size={16} className="text-[#B9914A]" />
                    <span className="text-white/80 text-sm">{call.experienceLevel}</span>
                  </div>
                </div>

                {call.applicationRequirements && (
                  <div className="mb-16">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 mb-6">Application Requirements</h3>
                    <p className="text-white/70 leading-relaxed">{call.applicationRequirements}</p>
                  </div>
                )}

                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 mb-6">Skills</h3>
                  <div className="flex flex-wrap gap-4">
                    {call.requiredSkills?.map((skill) => (
                      <span key={skill} className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg text-[#B9914A] text-[10px] font-bold uppercase tracking-[0.2em]">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...cinematicTransition, delay: 0.15 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-10 shadow-2xl sticky top-32"
              >
                <p className="text-[10px] text-white/40 uppercase font-bold tracking-[0.4em] mb-8">Ready to apply?</p>
                <button
                  onClick={handleApply}
                  disabled={applying || applied || profile?.activeWorkspace === 'studio' || (!!user && !tagsMatch)}
                  className="w-full py-6 bg-[#B9914A] text-[#090B10] text-[10px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-3 hover:bg-[#F5F4F2] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed font-sans"
                >
                  {applied ? (
                    <>Applied <CheckCircle2 size={16} /></>
                  ) : applying ? 'Submitting...' : !user ? 'Log In to Apply' : 'Apply Now'}
                </button>
                {profile?.activeWorkspace === 'studio' && (
                  <p className="mt-4 text-white/30 text-[9px] uppercase tracking-widest text-center">Switch to Talent workspace to apply</p>
                )}
                {user && profile?.activeWorkspace !== 'studio' && !applied && !tagsMatch && (
                  <p className="mt-4 text-white/30 text-[9px] uppercase tracking-widest text-center">
                    Add {callTags[0] || 'a matching domain'} to your profile to apply
                  </p>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CastingCallDetail;
