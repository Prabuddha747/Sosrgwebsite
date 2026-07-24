"use client";

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useNavigate } from '@/lib/router-compat';
import { Mail, Lock, ArrowRight, Chrome, Shield } from 'lucide-react';
import { showError } from '@/utils/toast';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

const Login = () => {
  const { user, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const cinematicTransition: any = { duration: 0.8, ease: [] as any };

  React.useEffect(() => {
    if (user) {
      navigate('/profile');
    }
  }, [user, navigate]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/profile');
    } catch (error: any) {
      console.error("Login Error Details:", error);
      let message = error.message;
      if (error.code === 'auth/user-not-found') message = "The guild has no record of this identity.";
      if (error.code === 'auth/wrong-password') message = "The secret protocol does not match.";
      if (error.code === 'auth/invalid-credential') message = "Invalid credentials. Please verify your identity.";
      showError(message);
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
        
        <div className="max-w-xl w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={cinematicTransition}
            className="bg-white/5 border border-white/10 p-8 md:p-24 rounded-2xl backdrop-blur-md shadow-2xl relative"
          >
            <div className="absolute top-0 left-0 w-full h-[1px] bg-[#5490B4] opacity-30" />
            
            <div className="text-center mb-12 md:mb-16">
              <span className="text-[#5490B4] text-[9px] md:text-[10px] font-bold uppercase tracking-[0.5em] md:tracking-[0.6em] mb-6 md:mb-8 block italic">MEMBER ACCESS</span>
              <h2 className="text-3xl md:text-7xl font-bold text-white tracking-tighter leading-none premium-serif">
                Entry<span className="text-[#5490B4] italic font-light">.</span>
              </h2>
            </div>

            <div className="space-y-10 md:space-y-12">
              <button 
                type="button"
                onClick={async () => {
                  setLoading(true);
                  try {
                    const result = await loginWithGoogle();
                    if (result?.user) navigate('/profile');
                  } finally {
                    setLoading(false);
                  }
                }}
                disabled={loading}
                className="w-full py-5 md:py-6 bg-white/5 border border-white/10 flex items-center justify-center gap-4 text-white/70 hover:text-[#5490B4] hover:border-[#5490B4]/50 transition-all uppercase tracking-[0.4em] text-[9px] md:text-[10px] font-bold shadow-sm"
              >
                <Chrome size={18} className="text-[#5490B4]" /> {loading ? 'Processing...' : 'Google Identity'}
              </button>

              <div className="flex items-center gap-6 md:gap-8 px-4">
                <div className="h-[1px] flex-1 bg-white/10" />
                <span className="text-[8px] md:text-[9px] font-bold text-white/40 uppercase tracking-[0.4em]">OR CREDENTIALS</span>
                <div className="h-[1px] flex-1 bg-white/10" />
              </div>

              <form onSubmit={handleEmailLogin} className="space-y-8 md:space-y-10">
                <div className="space-y-4">
                  <label className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 ml-6 italic">Digital Address</label>
                  <div className="relative">
                    <input 
                      required
                      name="email"
                      type="email" 
                      placeholder="YOUR@EMAIL.COM"
                      className="w-full form-input-premium py-5 md:py-6 px-12 md:px-16 text-[#F5F5F5] font-light shadow-sm text-sm"
                    />
                    <Mail size={16} className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-white/40" />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 ml-6 italic">Secret Protocol</label>
                  <div className="relative">
                    <input 
                      required
                      name="password"
                      type="password" 
                      placeholder="••••••••"
                      className="w-full form-input-premium py-5 md:py-6 px-12 md:px-16 text-[#F5F5F5] font-light shadow-sm text-sm"
                    />
                    <Lock size={16} className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-white/40" />
                  </div>
                </div>
                <button 
                  disabled={loading}
                  className="w-full bg-[#5490B4] text-[#1A1A1A] py-6 md:py-8 text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] hover:bg-[#5490B4]/90 transition-all duration-500 shadow-xl shadow-black/10 flex items-center justify-center gap-4 font-sans"
                >
                  {loading ? "Decrypting..." : (
                    <>
                      Gain Access <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>
            </div>

            <div className="mt-12 md:mt-16 text-center">
              <p className="text-white/60 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] italic">
                Not yet a member? <Link to="/signup" className="text-[#5490B4] hover:underline underline-offset-4 ml-2">Initiate Access</Link>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Login;
