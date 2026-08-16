"use client";

import React from 'react';
import Layout from '@/components/Layout';
import { Link } from '@/lib/router-compat';

const SECTIONS: { title: string; body: React.ReactNode }[] = [
  {
    title: '1. Information We Collect',
    body: (
      <ul className="space-y-3 list-disc list-inside">
        <li><span className="text-white font-medium">Account &amp; Identity Information:</span> Name, username, email address, phone number, date of birth, and password (stored securely as cryptographic hashes).</li>
        <li><span className="text-white font-medium">Profile &amp; Talent Portfolio Data:</span> Profile photos, showreel videos, audio samples, bio, professional skills, and union memberships.</li>
        <li><span className="text-white font-medium">Location Information:</span> Approximate location based on PIN code / district / state for regional casting discovery.</li>
        <li><span className="text-white font-medium">Documents:</span> Identity verification (KYC) documents submitted for verified badge reviews.</li>
        <li><span className="text-white font-medium">Communications:</span> Messages and inquiries exchanged within the platform.</li>
        <li><span className="text-white font-medium">Technical &amp; Diagnostics:</span> Device identifiers (session tokens), IP hashes, error logs, and performance metrics.</li>
      </ul>
    ),
  },
  {
    title: '2. How We Use Your Information',
    body: (
      <ul className="space-y-3 list-disc list-inside">
        <li>Provide, maintain, and personalize talent matching and casting discovery.</li>
        <li>Facilitate communication between artists, casting directors, and organizations.</li>
        <li>Verify user identity and prevent fraud or account abuse.</li>
        <li>Send important service notifications, security alerts, and support messages.</li>
      </ul>
    ),
  },
  {
    title: '3. Data Sharing & Third Parties',
    body: (
      <ul className="space-y-3 list-disc list-inside">
        <li><span className="text-white font-medium">Public Profile:</span> Information you publish on your public portfolio (display name, photos, videos, skills) is visible to other registered users.</li>
        <li><span className="text-white font-medium">No Data Brokerage:</span> We do not sell, rent, or trade your personal information to third-party advertisers.</li>
        <li><span className="text-white font-medium">Service Providers:</span> We use secure cloud infrastructure (Google Cloud Platform) to store data and media securely.</li>
      </ul>
    ),
  },
  {
    title: '4. Data Security & Retention',
    body: (
      <ul className="space-y-3 list-disc list-inside">
        <li>All data is encrypted in transit using industry-standard HTTPS / TLS encryption.</li>
        <li>We retain your personal data for as long as your account remains active.</li>
      </ul>
    ),
  },
  {
    title: '5. Account & Data Deletion',
    body: (
      <div className="space-y-4">
        <p>Users have the right to request deletion of their account and personal data at any time:</p>
        <ul className="space-y-3 list-disc list-inside">
          <li><span className="text-white font-medium">In-App:</span> Go to Profile → Security &amp; Settings → Delete Account.</li>
          <li>
            <span className="text-white font-medium">Web Form:</span> Visit{' '}
            <Link to="/account-deletion" className="text-[#B9914A] hover:underline">
              our account deletion page
            </Link>{' '}
            to submit an online deletion request.
          </li>
        </ul>
        <p>Upon request, all personal profile data, media files, and activity logs are permanently removed within 30 days.</p>
      </div>
    ),
  },
  {
    title: '6. Contact Us',
    body: (
      <p>
        If you have questions regarding this Privacy Policy, please contact us at{' '}
        <a href="mailto:digitalsosrg@gmail.com" className="text-[#B9914A] hover:underline">digitalsosrg@gmail.com</a>.
      </p>
    ),
  },
];

const PrivacyPolicy = () => {
  return (
    <Layout>
      <section className="pt-56 pb-40 bg-transparent min-h-screen relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#B9914A]/5 rounded-full blur-[180px] opacity-20" />
        </div>

        <div className="layout-container relative z-10 max-w-3xl mx-auto">
          <span className="text-[#B9914A] text-[10px] font-bold uppercase tracking-[0.6em] mb-8 block">SosrG Talent Platform</span>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none mb-6 font-sans">
            PRIVACY POLICY
          </h1>
          <p className="text-sm text-white/40 mb-16 uppercase tracking-[0.3em]">Last updated: August 15, 2026</p>

          <div className="space-y-12">
            {SECTIONS.map((section) => (
              <div
                key={section.title}
                className="p-6 md:p-10 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md"
              >
                <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-white mb-6">{section.title}</h2>
                <div className="space-y-4 text-white/70 font-light leading-relaxed">{section.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPolicy;
