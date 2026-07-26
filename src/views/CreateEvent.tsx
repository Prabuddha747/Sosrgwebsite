"use client";

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import StudioGate from '@/components/StudioGate';
import { motion } from 'framer-motion';
import { useNavigate } from '@/lib/router-compat';
import { useAuth } from '@/contexts/AuthContext';
import { showError, showSuccess } from '@/utils/toast';
import { createEvent } from '@/lib/db';
import { ArrowRight } from 'lucide-react';

const inputClass = "w-full form-input-premium py-4 px-6 text-[#F5F5F5] font-light shadow-sm text-sm";
const labelClass = "text-[9px] font-bold uppercase tracking-[0.4em] text-white/40 ml-2 italic block mb-3";

const CreateEvent = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const cinematicTransition: any = { duration: 0.8, ease: [] as any };

  const submitForm = async (form: HTMLFormElement, status: 'draft' | 'live') => {
    if (!user) return;
    const formData = new FormData(form);
    const title = formData.get('title') as string;
    const eventType = formData.get('eventType') as string;
    const date = formData.get('date') as string;
    const location = formData.get('location') as string;
    const description = formData.get('description') as string;
    const registrationInfo = formData.get('registrationInfo') as string;

    if (!title || !date || !location) {
      showError('Title, date, and location are required.');
      return;
    }

    setSubmitting(true);
    try {
      const id = await createEvent({
        studioUid: user.uid,
        title,
        eventType: eventType || 'Event',
        date,
        location,
        description,
        registrationInfo,
        status,
      });
      showSuccess(status === 'live' ? 'Event published.' : 'Draft saved.');
      navigate(`/event/${id}`);
    } catch (error: any) {
      showError(error.message || 'Could not save event.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <StudioGate backTo="/event" backLabel="Back to Events">
      <Layout>
        <section className="min-h-screen pt-32 pb-40 bg-transparent px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={cinematicTransition}
            >
              <p className="text-[#B9914A] text-xs uppercase tracking-widest mb-4 text-center">New Gathering</p>
              <h1 className="text-3xl md:text-6xl font-bold text-white tracking-tighter mb-16 text-center">
                Organize an <span className="text-[#B9914A] italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Event.</span>
              </h1>

              <form
                onSubmit={(e) => { e.preventDefault(); submitForm(e.currentTarget, 'live'); }}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-16 space-y-10"
              >
                <div>
                  <label className={labelClass}>Title</label>
                  <input required name="title" type="text" placeholder="The Bihar Creators Documentary" className={inputClass} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className={labelClass}>Event Type</label>
                    <input name="eventType" type="text" placeholder="Film Production, Festival, Workshop..." className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Date</label>
                    <input required name="date" type="date" className={inputClass} />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Location</label>
                  <input required name="location" type="text" placeholder="Patna, Bihar" className={inputClass} />
                </div>

                <div>
                  <label className={labelClass}>Description</label>
                  <textarea name="description" rows={4} placeholder="What is this event about?" className={inputClass} />
                </div>

                <div>
                  <label className={labelClass}>Registration Info</label>
                  <input name="registrationInfo" type="text" placeholder="A registration link, email, or instructions" className={inputClass} />
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

export default CreateEvent;
