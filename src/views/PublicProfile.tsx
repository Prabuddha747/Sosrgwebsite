"use client";

import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from '@/lib/router-compat';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { UserProfile } from '@/contexts/AuthContext';
import { 
  User, Briefcase, MapPin, 
  MessageSquare, Share2, Sparkles, 
  ArrowLeft, ExternalLink
} from 'lucide-react';

const PublicProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const cinematicTransition: any = { duration: 0.8, ease: [] as any };

  useEffect(() => {
    const fetchProfile = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, 'profiles', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data() as UserProfile);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-transparent">
          <div className="w-16 h-16 border-2 border-[#B9914A]/10 border-t-[#B9914A] rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  if (!profile) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center bg-transparent px-[5%] text-center">
          <h1 className="text-3xl md:text-6xl font-bold text-white mb-8 premium-serif italic">Soul Not Found.</h1>
          <p className="text-xl text-white/60 mb-12 italic font-light">The creator you seek has not yet entered the sanctuary.</p>
          <button onClick={() => navigate('/artists')} className="px-16 py-6 bg-[#B9914A] text-[#1A1A1A] text-[10px] font-black uppercase tracking-[0.5em] hover:bg-[#B9914A]/90 transition-all duration-700 font-sans">
            RETURN TO REGISTRY
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="pt-48 pb-40 bg-transparent min-h-screen relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#B9914A]/5 rounded-full blur-[180px] opacity-20" />
        </div>
        
        <div className="layout-container relative z-10 text-[#F5F5F5]">
          <button 
            onClick={() => navigate(-1)}
            className="mb-16 flex items-center gap-4 text-white/40 hover:text-[#B9914A] transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
            <span className="text-[10px] font-bold uppercase tracking-[0.6em]">BACK TO REGISTRY</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-20 lg:gap-32 items-start">
            {/* Left Column: Profile Card */}
            <div className="lg:col-span-4 space-y-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={cinematicTransition}
                className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center shadow-2xl relative overflow-hidden group backdrop-blur-md"
              >
                <div className="absolute top-0 left-0 w-full h-[1px] bg-[#B9914A] opacity-30" />
                <div className="w-full aspect-square border border-white/10 rounded-xl overflow-hidden mb-12 shadow-lg">
                  {profile.photoURL ? (
                    <img src={profile.photoURL} alt={profile.displayName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-white/5 flex items-center justify-center text-white/20 animate-pulse">
                      <User size={80} />
                    </div>
                  )}
                </div>
                <h1 className="text-4xl font-bold text-white mb-4 premium-serif">{profile.displayName}</h1>
                <p className="text-[10px] text-[#B9914A] font-bold uppercase tracking-[0.5em] mb-12">VERIFIED CREATOR</p>
                
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                  {profile.links && profile.links.length > 0 ? (
                    profile.links.map((link, i) => (
                      <a 
                        key={i} 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 min-w-[120px] bg-white/5 border border-white/10 rounded-xl px-4 py-4 flex items-center justify-between group/link hover:border-[#B9914A]/50 transition-all duration-500"
                      >
                        <span className="text-[10px] text-white/60 uppercase font-bold tracking-widest truncate group-hover/link:text-[#B9914A]">{link.label || 'Link'}</span>
                        <ExternalLink size={12} className="text-white/20 group-hover/link:text-[#B9914A]" />
                      </a>
                    ))
                  ) : (
                    <div className="w-full py-8 border border-dashed border-white/10 rounded-xl">
                      <p className="text-[8px] text-white/30 uppercase tracking-[0.3em] font-bold">No digital connections manifest</p>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <button 
                    onClick={() => navigate(`/chat/${id}`)}
                    className="w-full py-6 bg-[#B9914A] text-[#1A1A1A] text-[10px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-4 hover:bg-[#B9914A]/90 transition-all duration-500 shadow-xl shadow-black/10 font-sans"
                  >
                    INITIATE CHANNEL <MessageSquare size={16} />
                  </button>
                  <button className="w-full py-6 border border-white/10 text-[10px] font-bold uppercase tracking-[0.4em] text-white/50 hover:text-[#B9914A] hover:border-[#B9914A]/55 rounded-none transition-all font-sans">
                    SHARE PROFILE <Share2 size={16} className="inline ml-2 animate-bounce-slow" />
                  </button>
                </div>
              </motion.div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center backdrop-blur-md">
                <p className="text-[10px] text-white/40 uppercase font-bold tracking-[0.4em] mb-4">VAULT STATUS</p>
                <p className="text-4xl font-black text-white tracking-tighter">
                  {profile.coins || 0} <span className="text-[#B9914A] text-xs uppercase font-black tracking-widest ml-2">SOSRG</span>
                </p>
              </div>
            </div>

            {/* Right Column: Content */}
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...cinematicTransition, delay: 0.2 }}
                className="space-y-24"
              >
                <div className="space-y-10">
                  <div className="flex items-center gap-6 text-[#B9914A]">
                    <Sparkles size={20} />
                    <span className="text-[10px] font-bold uppercase tracking-[0.6em]">THE MANIFESTO</span>
                  </div>
                  <p className="text-[clamp(1.5rem,3vw,2.5rem)] font-light italic text-white/80 leading-relaxed max-w-4xl premium-serif">
                    "{profile.bio || "This creator has yet to manifest their manifesto within the sanctuary. Their vision remains a mystery of the guild."}"
                  </p>
                </div>

                <div className="h-[1px] bg-white/10" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                  <div className="space-y-8">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40">GUILD EXPERTISE</h3>
                    <div className="flex flex-wrap gap-4">
                      {profile.skills?.map(skill => (
                        <span key={skill} className="px-8 py-3 bg-white/5 border border-white/10 rounded-lg text-[#B9914A] text-[10px] font-bold uppercase tracking-[0.2em] italic hover:border-[#B9914A] transition-all shadow-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-8">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40">PRESENCE</h3>
                    <div className="flex items-center gap-6 p-8 bg-white/5 border border-white/10 rounded-xl">
                      <MapPin size={18} className="text-[#B9914A]" />
                      <span className="text-white/60 font-bold uppercase tracking-widest text-xs">Bihar Creators Guild</span>
                    </div>
                  </div>
                </div>

                <div className="mt-40 pt-40 border-t border-white/10">
                  <div className="flex items-center justify-between mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter premium-serif">Project <span className="text-[#B9914A] italic font-light">Archives.</span></h2>
                    <span className="text-[10px] text-white/30 uppercase font-bold tracking-[0.4em]">SYNCHRONIZING...</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {[1, 2].map(i => (
                      <div key={i} className="aspect-video bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center justify-center group cursor-pointer overflow-hidden shadow-sm hover:shadow-2xl hover:border-[#B9914A]/50 transition-all duration-700 backdrop-blur-md">
                        <div className="text-center group-hover:scale-110 transition-transform duration-700">
                          <Briefcase size={32} className="text-white/10 mx-auto mb-6" />
                          <p className="text-[10px] text-white/30 uppercase font-bold tracking-[0.5em]">CLASSIFIED PROJECT</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PublicProfile;
