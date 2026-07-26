"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { useAuth, PENDING_WORKSPACE_KEY, PENDING_STUDIO_KEY, Workspace } from '@/contexts/AuthContext';
import { Link, useNavigate, useSearchParams } from '@/lib/router-compat';
import { User, Mail, Lock, ArrowRight, Chrome, Gift, Sparkles, Building2 } from 'lucide-react';
import { showError, showSuccess } from '@/utils/toast';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { cn } from '@/lib/utils';
import type { StudioProfile } from '@/lib/db';

const ORG_TYPES: StudioProfile['orgType'][] = [
  'production_house', 'theatre', 'agency', 'brand', 'studio', 'casting_director', 'other',
];

const SignupInner = () => {
  const { user, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const searchParams = useSearchParams();
  const [referralCode, setReferralCode] = useState(searchParams?.get('ref') || '');
  const [loading, setLoading] = useState(false);
  const [workspace, setWorkspace] = useState<Workspace>('talent');
  const [orgName, setOrgName] = useState('');
  const [orgType, setOrgType] = useState<StudioProfile['orgType']>('production_house');
  const cinematicTransition: any = { duration: 0.8, ease: [] as any };

  useEffect(() => {
    if (user) {
      navigate('/profile');
    }
  }, [user, navigate]);

  // AuthContext creates the profile doc inside onAuthStateChanged, outside
  // this component's control — so the workspace pick is stashed here and
  // read back there, rather than passed as a prop that has nowhere to go.
  const stashWorkspacePick = () => {
    sessionStorage.setItem(PENDING_WORKSPACE_KEY, workspace);
    if (workspace === 'studio') {
      sessionStorage.setItem(PENDING_STUDIO_KEY, JSON.stringify({ orgName, orgType }));
    } else {
      sessionStorage.removeItem(PENDING_STUDIO_KEY);
    }
  };

  const isStudioIncomplete = workspace === 'studio' && !orgName.trim();

  const handleGoogleSignup = async () => {
    if (isStudioIncomplete) {
      showError('Add your organisation name first.');
      return;
    }
    setLoading(true);
    try {
      stashWorkspacePick();
      const result = await loginWithGoogle();
      if (result?.user && referralCode) {
        const { processReferral } = await import('@/lib/db');
        await processReferral(referralCode, result.user.uid);
      }
      if (result?.user) navigate('/profile');
    } catch (error: any) {
      showError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isStudioIncomplete) {
      showError('Add your organisation name first.');
      return;
    }
    const formData = new FormData(e.target as HTMLFormElement);
    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const refCode = formData.get('referral') as string;

    setLoading(true);
    try {
      stashWorkspacePick();
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: fullName });

      if (refCode || referralCode) {
        const { processReferral } = await import('@/lib/db');
        await processReferral(refCode || referralCode, user.uid);
      }

      showSuccess("Account created successfully. Welcome to the Guild.");
      navigate('/profile');
    } catch (error: any) {
      showError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="min-h-screen pt-40 md:pt-48 pb-20 flex items-center justify-center bg-transparent px-4 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#B9914A]/5 rounded-full blur-[180px] opacity-20" />
        </div>
        
        <div className="max-w-3xl w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={cinematicTransition}
            className="bg-white/5 border border-white/10 p-8 md:p-24 rounded-2xl backdrop-blur-md shadow-2xl relative"
          >
            <div className="absolute top-0 left-0 w-full h-[1px] bg-[#B9914A] opacity-30" />
            
            <div className="text-center mb-12 md:mb-16">
              <span className="text-[#B9914A] text-[9px] md:text-[10px] font-bold uppercase tracking-[0.5em] md:tracking-[0.6em] mb-6 md:mb-8 block italic">NEW INITIATION</span>
              <h2 className="text-3xl md:text-7xl font-bold text-white tracking-tighter leading-none premium-serif">
                Create<span className="text-[#B9914A] italic font-light">.</span>
              </h2>
            </div>

            <div className="space-y-10 md:space-y-12">
              <div className="space-y-6">
                <label className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 ml-2 italic block text-center">
                  What brings you here?
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setWorkspace('talent')}
                    className={cn(
                      "py-5 md:py-6 flex flex-col items-center gap-2 border rounded-xl transition-all uppercase tracking-[0.2em] text-[10px] font-bold",
                      workspace === 'talent'
                        ? "bg-[#B9914A]/15 border-[#B9914A] text-[#B9914A]"
                        : "bg-white/5 border-white/10 text-white/50 hover:border-white/30"
                    )}
                  >
                    <Sparkles size={18} /> Talent
                  </button>
                  <button
                    type="button"
                    onClick={() => setWorkspace('studio')}
                    className={cn(
                      "py-5 md:py-6 flex flex-col items-center gap-2 border rounded-xl transition-all uppercase tracking-[0.2em] text-[10px] font-bold",
                      workspace === 'studio'
                        ? "bg-[#B9914A]/15 border-[#B9914A] text-[#B9914A]"
                        : "bg-white/5 border-white/10 text-white/50 hover:border-white/30"
                    )}
                  >
                    <Building2 size={18} /> Studio
                  </button>
                </div>

                {workspace === 'studio' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <input
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      type="text"
                      placeholder="ORGANISATION NAME"
                      className="w-full form-input-premium py-4 px-6 text-[#F5F5F5] font-light shadow-sm text-sm"
                    />
                    <select
                      value={orgType}
                      onChange={(e) => setOrgType(e.target.value as StudioProfile['orgType'])}
                      className="w-full form-input-premium py-4 px-6 text-[#F5F5F5] font-light shadow-sm text-sm"
                    >
                      {ORG_TYPES.map((type) => (
                        <option key={type} value={type} className="bg-[#1A1A1A]">
                          {type.replace(/_/g, ' ')}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <button
                onClick={handleGoogleSignup}
                disabled={loading || isStudioIncomplete}
                className="w-full py-5 md:py-6 bg-white/5 border border-white/10 flex items-center justify-center gap-4 text-white/70 hover:text-[#B9914A] hover:border-[#B9914A]/50 transition-all uppercase tracking-[0.4em] text-[9px] md:text-[10px] font-bold shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Chrome size={18} className="text-[#B9914A]" /> Continue with Google
              </button>

              <div className="flex items-center gap-6 md:gap-8 px-4">
                <div className="h-[1px] flex-1 bg-white/10" />
                <span className="text-[8px] md:text-[9px] font-bold text-white/40 uppercase tracking-[0.4em]">OR TRADITIONAL</span>
                <div className="h-[1px] flex-1 bg-white/10" />
              </div>

              <form onSubmit={handleSignup} className="space-y-8 md:space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                  <div className="space-y-4">
                    <label className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 ml-6 italic">Full Name</label>
                    <div className="relative">
                      <input 
                        required
                        name="fullName"
                        type="text" 
                        placeholder="LEGAL NAME"
                        className="w-full form-input-premium py-5 md:py-6 px-12 md:px-14 text-[#F5F5F5] font-light shadow-sm text-sm"
                      />
                      <User size={16} className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-white/40" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 ml-6 italic">Digital Address</label>
                    <div className="relative">
                      <input 
                        required
                        name="email"
                        type="email" 
                        placeholder="YOUR@EMAIL.COM"
                        className="w-full form-input-premium py-5 md:py-6 px-12 md:px-14 text-[#F5F5F5] font-light shadow-sm text-sm"
                      />
                      <Mail size={16} className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-white/40" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                  <div className="space-y-4">
                    <label className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 ml-6 italic">Secret Protocol</label>
                    <div className="relative">
                      <input 
                        required
                        name="password"
                        type="password" 
                        placeholder="••••••••"
                        className="w-full form-input-premium py-5 md:py-6 px-12 md:px-14 text-[#F5F5F5] font-light shadow-sm text-sm"
                      />
                      <Lock size={16} className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-white/40" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 ml-6 italic">Referral Code</label>
                    <div className="relative">
                      <input 
                        name="referral"
                        type="text" 
                        value={referralCode}
                        onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                        placeholder="OPTIONAL"
                        className="w-full form-input-premium py-5 md:py-6 px-12 md:px-14 text-[#F5F5F5] font-light shadow-sm text-sm"
                      />
                      <Gift size={16} className={cn("absolute left-4 md:left-6 top-1/2 -translate-y-1/2", referralCode ? "text-[#B9914A]" : "text-white/40")} />
                    </div>
                  </div>
                </div>

                <button
                  disabled={loading || isStudioIncomplete}
                  className="w-full bg-[#B9914A] text-[#1A1A1A] py-6 md:py-8 text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] hover:bg-[#B9914A]/90 transition-all duration-500 shadow-xl shadow-black/10 flex items-center justify-center gap-4 font-sans disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {loading ? "Initializing..." : (
                    <>
                      Begin Journey <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>
            </div>

            <div className="mt-12 md:mt-16 text-center">
              <p className="text-white/60 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] italic">
                Already a member? <Link to="/login" className="text-[#B9914A] hover:underline underline-offset-4 ml-2">Gain Entry</Link>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

const Signup = () => (
  <Suspense fallback={null}>
    <SignupInner />
  </Suspense>
);

export default Signup;
