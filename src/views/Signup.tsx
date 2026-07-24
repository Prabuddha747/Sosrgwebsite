"use client";

import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useNavigate, useSearchParams } from '@/lib/router-compat';
import { User, Mail, Lock, ArrowRight, Chrome, Gift } from 'lucide-react';
import { showError, showSuccess } from '@/utils/toast';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { cn } from '@/lib/utils';

const Signup = () => {
  const { user, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const searchParams = useSearchParams();
  const [referralCode, setReferralCode] = useState(searchParams?.get('ref') || '');
  const [loading, setLoading] = useState(false);
  const cinematicTransition: any = { duration: 0.8, ease: [] as any };

  useEffect(() => {
    if (user) {
      navigate('/profile');
    }
  }, [user, navigate]);

  const handleGoogleSignup = async () => {
    setLoading(true);
    try {
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
    const formData = new FormData(e.target as HTMLFormElement);
    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const refCode = formData.get('referral') as string;

    setLoading(true);
    try {
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
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#5490B4]/5 rounded-full blur-[180px] opacity-20" />
        </div>
        
        <div className="max-w-3xl w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={cinematicTransition}
            className="bg-white/5 border border-white/10 p-8 md:p-24 rounded-2xl backdrop-blur-md shadow-2xl relative"
          >
            <div className="absolute top-0 left-0 w-full h-[1px] bg-[#5490B4] opacity-30" />
            
            <div className="text-center mb-12 md:mb-16">
              <span className="text-[#5490B4] text-[9px] md:text-[10px] font-bold uppercase tracking-[0.5em] md:tracking-[0.6em] mb-6 md:mb-8 block italic">NEW INITIATION</span>
              <h2 className="text-3xl md:text-7xl font-bold text-white tracking-tighter leading-none premium-serif">
                Create<span className="text-[#5490B4] italic font-light">.</span>
              </h2>
            </div>

            <div className="space-y-10 md:space-y-12">
              <button 
                onClick={handleGoogleSignup}
                disabled={loading}
                className="w-full py-5 md:py-6 bg-white/5 border border-white/10 flex items-center justify-center gap-4 text-white/70 hover:text-[#5490B4] hover:border-[#5490B4]/50 transition-all uppercase tracking-[0.4em] text-[9px] md:text-[10px] font-bold shadow-sm"
              >
                <Chrome size={18} className="text-[#5490B4]" /> Continue with Google
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
                      <Gift size={16} className={cn("absolute left-4 md:left-6 top-1/2 -translate-y-1/2", referralCode ? "text-[#5490B4]" : "text-white/40")} />
                    </div>
                  </div>
                </div>

                <button 
                  disabled={loading}
                  className="w-full bg-[#5490B4] text-[#1A1A1A] py-6 md:py-8 text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] hover:bg-[#5490B4]/90 transition-all duration-500 shadow-xl shadow-black/10 flex items-center justify-center gap-4 font-sans"
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
                Already a member? <Link to="/login" className="text-[#5490B4] hover:underline underline-offset-4 ml-2">Gain Entry</Link>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Signup;
