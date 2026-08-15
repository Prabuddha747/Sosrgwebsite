"use client";

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';

// ponytail: hardcoded API host, promote to NEXT_PUBLIC_SOSRG_API_URL if a
// staging/prod split is ever needed. No such env var exists elsewhere in
// this repo today.
const API_URL = 'https://sosrg-api-292824095440.asia-south1.run.app/v1/auth/account-deletion/request';

const AccountDeletion = () => {
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const cinematicTransition: any = { duration: 0.8, ease: [] as any };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, reason }),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      setSubmitted(true);
      showSuccess("Deletion request received. We'll process it within 30 days.");
    } catch (err) {
      showError('Could not submit your request. Please try again or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <section className="pt-56 pb-40 bg-transparent min-h-screen relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#B9914A]/5 rounded-full blur-[180px] opacity-20" />
        </div>

        <div className="layout-container relative z-10 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={cinematicTransition}
          >
            <span className="text-[#B9914A] text-[10px] font-bold uppercase tracking-[0.6em] mb-8 block">SosrG Talent Platform</span>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none mb-10 font-sans">
              DELETE YOUR ACCOUNT
            </h1>
            <p className="text-lg text-white/60 mb-16 leading-relaxed font-light max-w-xl">
              Submit your registered email below and our team will permanently delete your SosrG Talent Platform account and associated data.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...cinematicTransition, delay: 0.1 }}
            className="p-6 md:p-10 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md mb-16"
          >
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-white mb-6">How it works</h2>
            <ol className="space-y-3 text-white/70 font-light list-decimal list-inside">
              <li>Enter the email address associated with your SosrG account below.</li>
              <li>Optionally tell us why you're leaving — this helps us improve.</li>
              <li>Submit the request. We verify ownership and delete the account within 30 days.</li>
              <li>You'll receive a confirmation email once deletion is complete.</li>
            </ol>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...cinematicTransition, delay: 0.15 }}
            className="p-6 md:p-10 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md mb-16"
          >
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-white mb-6">Data handling notice</h2>
            <div className="space-y-4 text-white/70 font-light">
              <p>
                <span className="text-white font-medium">What is deleted:</span> your profile data, uploaded media (photos, videos, reels), and activity records (applications, messages, casting history).
              </p>
              <p>
                <span className="text-white font-medium">What is retained:</span> payment and transaction records, which we keep as required for accounting and tax compliance.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...cinematicTransition, delay: 0.2 }}
            className="p-6 md:p-16 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md"
          >
            {submitted ? (
              <div className="text-center py-8">
                <Trash2 className="mx-auto mb-6 text-[#B9914A]" size={32} />
                <p className="text-xl text-white font-medium mb-2">Request received.</p>
                <p className="text-white/60 font-light">We'll process your deletion within 30 days and confirm by email.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 ml-4">Registered Email</label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="form-input-premium"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 ml-4">Reason (optional)</label>
                  <textarea
                    rows={4}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Tell us why you're leaving..."
                    className="form-input-premium resize-none h-32"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 bg-[#B9914A] text-[#1A1A1A] font-bold uppercase tracking-[0.3em] text-xs disabled:opacity-50 transition-opacity"
                >
                  {isSubmitting ? 'Submitting…' : 'Submit Deletion Request'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default AccountDeletion;
