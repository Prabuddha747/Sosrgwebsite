"use client";

import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { useNavigate } from '@/lib/router-compat';
import { useAuth } from '@/contexts/AuthContext';
import { showError, showSuccess } from '@/utils/toast';
import { StudioProfile } from '@/lib/db';

// Shared by every Studio-only screen (create casting call, create event,
// studio dashboard, applicant pipeline) — handles the auth-loading spinner,
// the login redirect, and the "Become a Studio" self-upgrade form for an
// account that's on Talent only. One gate, not four copies of it.
const StudioGate = ({ children, backTo, backLabel }: { children: React.ReactNode; backTo: string; backLabel: string }) => {
  const { user, profile, loading: authLoading, addWorkspace } = useAuth();
  const navigate = useNavigate();
  const [becomingStudio, setBecomingStudio] = useState(false);
  const [orgName, setOrgName] = useState('');

  useEffect(() => {
    if (authLoading) return;
    if (!user) navigate('/login');
  }, [user, authLoading, navigate]);

  const handleBecomeStudio = async () => {
    if (!orgName.trim()) {
      showError('Add your organisation name first.');
      return;
    }
    setBecomingStudio(true);
    try {
      await addWorkspace('studio', { orgName, orgType: 'other' as StudioProfile['orgType'] });
      showSuccess('Studio workspace added.');
    } catch (error: any) {
      showError(error.message || 'Could not add Studio workspace.');
    } finally {
      setBecomingStudio(false);
    }
  };

  if (authLoading || !user) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-transparent">
          <div className="w-16 h-16 border-2 border-[#B9914A]/10 border-t-[#B9914A] rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  if (profile?.activeWorkspace !== 'studio') {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center bg-transparent px-[5%] text-center">
          <h1 className="text-3xl md:text-6xl font-bold text-white mb-8 italic">Studio Workspace Required.</h1>
          <p className="text-xl text-white/60 mb-12 italic font-light max-w-xl">
            This screen is for a Studio workspace. Add one to your account below, or switch
            in the navbar if you already have both.
          </p>
          <div className="w-full max-w-sm space-y-4 mb-8">
            <input
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              type="text"
              placeholder="ORGANISATION NAME"
              className="w-full form-input-premium py-4 px-6 text-[#F5F5F5] font-light shadow-sm text-sm text-center"
            />
            <button
              onClick={handleBecomeStudio}
              disabled={becomingStudio}
              className="w-full px-16 py-5 bg-[#B9914A] text-[#090B10] text-[10px] font-black uppercase tracking-[0.5em] hover:bg-[#F5F4F2] transition-all duration-700 disabled:opacity-50"
            >
              {becomingStudio ? 'Adding...' : 'Become a Studio'}
            </button>
          </div>
          <button onClick={() => navigate(backTo)} className="text-white/40 hover:text-[#B9914A] text-[10px] uppercase tracking-[0.4em] font-bold transition-all">
            {backLabel}
          </button>
        </div>
      </Layout>
    );
  }

  return <>{children}</>;
};

export default StudioGate;
