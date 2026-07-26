"use client";

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import StudioGate from '@/components/StudioGate';
import { motion } from 'framer-motion';
import { useNavigate } from '@/lib/router-compat';
import { useAuth } from '@/contexts/AuthContext';
import { showError, showSuccess } from '@/utils/toast';
import { createCastingCall } from '@/lib/db';
import { ArrowRight } from 'lucide-react';

const inputClass = "w-full form-input-premium py-4 px-6 text-[#F5F5F5] font-light shadow-sm text-sm";
const labelClass = "text-[9px] font-bold uppercase tracking-[0.4em] text-white/40 ml-2 italic block mb-3";

const CreateCastingCall = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const cinematicTransition: any = { duration: 0.8, ease: [] as any };

  const submitForm = async (form: HTMLFormElement, status: 'draft' | 'live') => {
    if (!user) return;
    const formData = new FormData(form);
    const project = formData.get('project') as string;
    const role = formData.get('role') as string;
    const creativeDomain = (formData.get('creativeDomain') as string).split(',').map(s => s.trim()).filter(Boolean);
    const experienceLevel = formData.get('experienceLevel') as string;
    const location = formData.get('location') as string;
    const compensation = formData.get('compensation') as string;
    const timeline = formData.get('timeline') as string;
    const requiredSkills = (formData.get('requiredSkills') as string).split(',').map(s => s.trim()).filter(Boolean);
    const applicationRequirements = formData.get('applicationRequirements') as string;

    if (!project || !role || !location) {
      showError('Project, role, and location are required.');
      return;
    }

    setSubmitting(true);
    try {
      const id = await createCastingCall({
        studioUid: user.uid,
        project,
        role,
        creativeDomain,
        experienceLevel,
        location,
        compensation,
        timeline,
        requiredSkills,
        applicationRequirements,
        status,
      });
      showSuccess(status === 'live' ? 'Casting call published.' : 'Draft saved.');
      navigate(`/casting/${id}`);
    } catch (error: any) {
      showError(error.message || 'Could not save casting call.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <StudioGate backTo="/casting" backLabel="Back to Casting Calls">
      <Layout>
        <section className="min-h-screen pt-32 pb-40 bg-transparent px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={cinematicTransition}
            >
              <p className="text-[#B9914A] text-xs uppercase tracking-widest mb-4 text-center">New Creative Opportunity</p>
              <h1 className="text-3xl md:text-6xl font-bold text-white tracking-tighter mb-16 text-center">
                Launch a <span className="text-[#B9914A] italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Casting Call.</span>
              </h1>

              <form
                onSubmit={(e) => { e.preventDefault(); submitForm(e.currentTarget, 'live'); }}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-16 space-y-10"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className={labelClass}>Project</label>
                    <input required name="project" type="text" placeholder="Neo-Noir Thriller" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Role</label>
                    <input required name="role" type="text" placeholder="Lead Actor" className={inputClass} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className={labelClass}>Creative Domain (comma separated)</label>
                    <input name="creativeDomain" type="text" placeholder="Acting, Direction" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Experience Level</label>
                    <input name="experienceLevel" type="text" placeholder="3-5 years" className={inputClass} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className={labelClass}>Location</label>
                    <input required name="location" type="text" placeholder="Patna, Bihar" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Compensation</label>
                    <input name="compensation" type="text" placeholder="₹40,000 / project" className={inputClass} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className={labelClass}>Timeline</label>
                    <input name="timeline" type="text" placeholder="Shoots in March 2026" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Required Skills (comma separated)</label>
                    <input name="requiredSkills" type="text" placeholder="Hindi diction, Stage combat" className={inputClass} />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Application Requirements</label>
                  <textarea
                    name="applicationRequirements"
                    rows={4}
                    placeholder="What should applicants send — showreel, portfolio, availability?"
                    className={inputClass}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    type="button"
                    disabled={submitting}
                    onClick={(e) => submitForm(e.currentTarget.form!, 'draft')}
                    className="flex-1 py-5 border border-white/10 text-white/60 hover:text-[#B9914A] hover:border-[#B9914A]/50 transition-all uppercase tracking-[0.3em] text-[10px] font-bold rounded-lg disabled:opacity-50"
                  >
                    Save Draft
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 py-5 bg-[#B9914A] text-[#090B10] uppercase tracking-[0.3em] text-[10px] font-black rounded-lg hover:bg-[#F5F4F2] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {submitting ? 'Publishing...' : (<>Publish <ArrowRight size={16} /></>)}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </section>
      </Layout>
    </StudioGate>
  );
};

export default CreateCastingCall;
