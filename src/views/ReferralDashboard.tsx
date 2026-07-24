"use client";

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Users, Trophy, Copy, Check, Share2, Sparkles, Zap } from 'lucide-react';
import { showSuccess } from '@/utils/toast';
import { cn } from '@/lib/utils';

const ReferralDashboard = () => {
  const { profile } = useAuth();
  const [copied, setCopied] = useState(false);
  const cinematicTransition: any = { duration: 0.8, ease: [] as any };

  const referralsCount = profile?.referralsCount || 0;
  const coins = profile?.coins || 0;
  const nextMilestone = 10 - (referralsCount % 10);
  const progressPercent = (referralsCount % 10) * 10;

  const referralCode = profile?.referralCode || "CODE123";
  const referralLink = `${typeof window !== 'undefined' ? window.location.origin : ''}/signup?ref=${referralCode}`;

  const copyToClipboard = (text: string, type: 'code' | 'link') => {
    navigator.clipboard.writeText(text);
    if (type === 'code') setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    showSuccess(`${type === 'code' ? 'Code' : 'Link'} transmitted to clipboard`);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'SosrG Studios Sanctuary',
          text: 'Join the elite guild of creators at SosrG Studios.',
          url: referralLink,
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      copyToClipboard(referralLink, 'link');
    }
  };

  return (
    <Layout>
      <section className="pt-40 md:pt-56 pb-40 min-h-screen">
        <div className="layout-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={cinematicTransition}
          >
            <div className="text-center mb-24">
              <span className="text-[#5490B4] text-[10px] font-black uppercase tracking-[0.6em] mb-12 block">THE VAULT PROTOCOL</span>
              <h1 className="text-3xl md:text-8xl font-bold text-white tracking-tighter leading-none font-serif italic">
                Referral <span className="text-[#5490B4] not-italic font-sans">Portal.</span>
              </h1>
              <p className="text-xl text-white/40 font-light italic max-w-2xl mx-auto leading-relaxed mt-12">
                Expand the SosrG sanctuary. Every successful initiation enriches your vault and strengthens the guild's collective vision.
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
              {[
                { label: "Total Initiations", value: referralsCount, icon: Users, color: "text-white" },
                { label: "Vault Balance", value: coins, icon: Trophy, color: "text-[#5490B4]" },
                { label: "Bonus Progress", value: `${referralsCount % 10}/10`, icon: Zap, color: "text-white/40" },
              ].map((stat, i) => (
                <div key={i} className="liquid-glass rounded-3xl p-10 md:p-16 border border-white/10 flex flex-col items-center text-center group hover:border-[#5490B4] transition-all duration-700">
                  <stat.icon size={24} className={cn("mb-10", stat.color)} />
                  <p className="text-[9px] text-white/40 uppercase font-black tracking-[0.4em] mb-4">{stat.label}</p>
                  <h3 className={cn("text-3xl md:text-6xl font-black tracking-tighter font-serif italic", stat.color)}>{stat.value}</h3>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Share Card */}
              <div className="p-12 md:p-20 liquid-glass rounded-3xl border border-white/10 relative overflow-hidden flex flex-col">
                <h2 className="text-4xl font-bold text-white mb-10 font-serif italic tracking-tight">EXPAND THE <span className="text-[#5490B4] not-italic font-sans">CIRCLE.</span></h2>
                <p className="text-white/60 font-light italic mb-16 leading-relaxed">
                  Every 10th initiation awards a divine <span className="text-[#5490B4] font-bold">500 SOSRG Coin Bonus</span>. Your next milestone is only {nextMilestone} souls away.
                </p>

                <div className="space-y-12 mt-auto">
                  <div className="space-y-4">
                    <label className="text-[9px] uppercase tracking-[0.4em] font-black text-white/40 ml-6">Your Divine Code</label>
                    <div className="flex items-center gap-4 p-4 pl-8 liquid-glass rounded-full border border-white/10">
                      <code className="flex-1 text-center font-black tracking-[0.5em] text-white text-3xl uppercase">{referralCode}</code>
                      <button onClick={() => copyToClipboard(referralCode, 'code')} className="p-6 rounded-full bg-[#5490B4] text-white hover:bg-white hover:text-black transition-all">
                        {copied ? <Check size={24} /> : <Copy size={24} />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[9px] uppercase tracking-[0.4em] font-black text-white/40 ml-6">Invitation Link</label>
                    <div className="flex gap-4 p-2 pl-6 liquid-glass rounded-full border border-white/10 items-center">
                      <div className="flex-1 truncate text-white/40 text-sm italic">
                        {referralLink}
                      </div>
                      <button onClick={handleShare} className="bg-[#5490B4] text-white p-5 rounded-full hover:bg-white hover:text-black transition-all">
                        <Share2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Card */}
              <div className="p-12 md:p-20 liquid-glass rounded-3xl border border-white/10 relative overflow-hidden flex flex-col justify-center items-center text-center">
                <div className="space-y-12">
                  <div className="relative inline-block">
                    <Sparkles className="absolute -top-12 -right-12 text-[#5490B4]/40 animate-pulse" size={60} />
                    <div className="w-64 h-64 rounded-full border border-white/10 flex items-center justify-center relative liquid-glass shadow-xl">
                      <svg className="w-full h-full -rotate-90">
                        <circle
                          cx="128"
                          cy="128"
                          r="120"
                          fill="transparent"
                          stroke="rgba(255,255,255,0.05)"
                          strokeWidth="8"
                        />
                        <motion.circle
                          cx="128"
                          cy="128"
                          r="120"
                          fill="transparent"
                          stroke="#5490B4"
                          strokeWidth="8"
                          strokeDasharray={753}
                          initial={{ strokeDashoffset: 753 }}
                          animate={{ strokeDashoffset: 753 - (753 * progressPercent) / 100 }}
                          transition={{ duration: 2, ease: "easeOut" }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl md:text-7xl font-black text-white font-serif italic leading-none">{(referralsCount % 10)}</span>
                        <span className="text-[10px] text-white/40 uppercase font-black tracking-[0.3em]">PROGRESS</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-3xl font-bold text-white tracking-tight font-serif italic">NEXT MILESTONE: {Math.ceil((referralsCount + 1) / 10) * 10}</h3>
                    <p className="text-base text-white/40 font-light italic max-w-sm mx-auto">
                      Initiate {nextMilestone} more creators to unlock the 500 coin divine bonus.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default ReferralDashboard;
