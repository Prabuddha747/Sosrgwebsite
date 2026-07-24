"use client";

import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { User, Gift, Save, ArrowRight, Plus, Trash2, ExternalLink, Check, Shield } from 'lucide-react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { showSuccess, showError } from '@/utils/toast';
import { cn } from '@/lib/utils';
import { Link } from '@/lib/router-compat';

const PRESET_AVATARS = [
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&h=400&fit=crop"
];

const Profile = () => {
  const { user, profile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const cinematicTransition: any = { duration: 0.8, ease: [] as any };
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    skills: [] as string[],
    bio: '',
    links: [] as { label: string, url: string }[],
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        fullName: profile.displayName || '',
        mobile: profile.mobile || '',
        skills: profile.skills || [],
        bio: profile.bio || '',
        links: profile.links || [],
      });
    }
  }, [profile]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    try {
      await updateDoc(doc(db, 'profiles', user.uid), {
        ...formData,
        updatedAt: new Date(),
      });
      showSuccess("Sanctuary updated successfully");
      setIsEditing(false);
    } catch (error: any) {
      showError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarSelect = async (url: string) => {
    if (!user) return;
    try {
      await updateDoc(doc(db, 'profiles', user.uid), {
        photoURL: url,
      });
      showSuccess("Portrait essence updated");
    } catch (error: any) {
      showError(error.message);
    }
  };

  const skillOptions = [
    "Artist", "Videographer", "Photographer", "Editor", 
    "Director", "Producer", "Dancer", "Musician", "Actor", "Model"
  ];

  const addLink = () => {
    if (formData.links.length < 5) {
      setFormData(prev => ({
        ...prev,
        links: [...prev.links, { label: '', url: '' }]
      }));
    }
  };

  const removeLink = (index: number) => {
    setFormData(prev => ({
      ...prev,
      links: prev.links.filter((_, i) => i !== index)
    }));
  };

  const updateLink = (index: number, field: 'label' | 'url', value: string) => {
    setFormData(prev => ({
      ...prev,
      links: prev.links.map((link, i) => i === index ? { ...link, [field]: value } : link)
    }));
  };

  const toggleSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  return (
    <Layout>
      <section className="pt-40 md:pt-56 pb-24 md:pb-40 min-h-screen">
        <div className="layout-container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={cinematicTransition}
          >
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
              {/* Left Column: Portrait & Vault */}
              <div className="w-full lg:w-1/3 space-y-8">
                <div className="liquid-glass rounded-3xl border border-white/10 p-8 md:p-12 text-center shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-[#5490B4] opacity-30" />
                  <div className="w-40 h-40 md:w-48 md:h-48 mx-auto mb-10 md:mb-12 rounded-full border-2 border-white/10 overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-[2s] shadow-lg">
                    {profile?.photoURL ? (
                      <img src={profile.photoURL} alt="Portrait" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full liquid-glass flex items-center justify-center text-white/20">
                        <User size={64} />
                      </div>
                    )}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-serif italic tracking-wide leading-none truncate">{profile?.displayName}</h2>
                  <p className="text-[9px] text-white/40 uppercase font-black tracking-[0.4em] mb-10 md:mb-12 italic">REGISTERED CREATOR</p>
                  
                  <div className="py-8 px-6 md:px-12 liquid-glass rounded-2xl border border-white/10 flex flex-col items-center mb-10 md:mb-12 relative">
                    <span className="text-[9px] text-[#5490B4] uppercase font-black tracking-[0.4em] mb-3">VAULT BALANCE</span>
                    <span className="text-4xl md:text-5xl font-black text-white tracking-tighter font-serif italic">
                      {profile?.coins || 0} <span className="text-[#5490B4] not-italic text-[10px] uppercase tracking-widest font-black ml-2 font-sans">COINS</span>
                    </span>
                  </div>

                  <div className="space-y-8 text-left pt-10 border-t border-white/10">
                    <p className="text-[9px] text-white/40 uppercase font-black tracking-[0.4em] mb-6 italic">IDENTITY PORTRAIT</p>
                    <div className="grid grid-cols-3 gap-3 md:gap-4">
                      {PRESET_AVATARS.map((url, i) => (
                        <button 
                          key={i}
                          onClick={() => handleAvatarSelect(url)}
                          className={cn(
                            "aspect-square border transition-all duration-700 relative group overflow-hidden rounded-xl",
                            profile?.photoURL === url ? "border-[#5490B4] shadow-[0_0_15px_rgba(184,160,137,0.3)]" : "border-white/10 hover:border-[#5490B4]/50"
                          )}
                        >
                          <img src={url} alt={`Avatar ${i}`} className="w-full h-full object-cover grayscale group-hover:grayscale-0" />
                          {profile?.photoURL === url && (
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <div className="bg-[#5490B4] p-1.5 rounded-full shadow-lg">
                                <Check size={14} className="text-white" />
                              </div>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="liquid-glass rounded-3xl border border-white/10 p-8 md:p-12">
                  <div className="flex items-center gap-6 mb-10">
                    <div className="w-12 h-12 rounded-full liquid-glass border border-white/10 flex items-center justify-center text-white shadow-lg">
                      <Gift size={20} />
                    </div>
                    <h3 className="text-3xl font-bold text-white font-serif italic tracking-tight">The Hub.</h3>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <Link to="/referral" className="flex items-center justify-between p-6 liquid-glass rounded-2xl border border-white/10 hover:border-[#5490B4] transition-all group shadow-sm">
                      <span className="text-[9px] text-white/60 uppercase tracking-[0.2em] font-black group-hover:text-[#5490B4]">Referral Portal</span>
                      <ArrowRight size={14} className="text-white/20 group-hover:text-[#5490B4] group-hover:translate-x-2 transition-all" />
                    </Link>
                    <Link to="/inbox" className="flex items-center justify-between p-6 liquid-glass rounded-2xl border border-white/10 hover:border-[#5490B4] transition-all group shadow-sm">
                      <span className="text-[9px] text-white/60 uppercase tracking-[0.2em] font-black group-hover:text-[#5490B4]">Digital Inbox</span>
                      <ArrowRight size={14} className="text-white/20 group-hover:text-[#5490B4] group-hover:translate-x-2 transition-all" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right Column: Identity Manifesto */}
              <div className="flex-1 w-full space-y-12">
                {!isEditing ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="liquid-glass rounded-3xl border border-white/10 p-8 md:p-20 shadow-2xl relative"
                  >
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-[#5490B4] opacity-30" />
                    <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-12 mb-16 md:mb-24">
                      <div className="space-y-4">
                        <span className="text-[#5490B4] text-[10px] font-black uppercase tracking-[0.6em] block italic">THE MANIFESTO</span>
                        <h2 className="text-3xl md:text-7xl font-bold text-white tracking-tighter font-serif leading-none italic">
                          Sanctuary<span className="text-[#5490B4] not-italic font-sans">.</span>
                        </h2>
                      </div>
                      <div className="flex flex-wrap gap-4 w-full xl:w-auto">
                        <Link to={`/artists/${user?.uid}`} className="flex-1 xl:flex-none text-center px-8 py-4 rounded-full border border-white/10 text-white/60 text-[9px] font-black uppercase tracking-widest hover:border-[#5490B4] hover:text-[#5490B4] transition-all">
                          Public View
                        </Link>
                        <button
                          onClick={() => setIsEditing(true)}
                          className="flex-1 xl:flex-none px-10 py-4 rounded-full border border-white/10 text-white text-[9px] font-black uppercase tracking-widest hover:bg-[#5490B4] hover:border-[#5490B4] transition-all shadow-xl shadow-black/10"
                        >
                          Edit Profile
                        </button>
                      </div>
                    </div>

                    <div className="space-y-16">
                      <div className="space-y-8">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 italic">The Creative Essence</h3>
                        <p className="text-2xl md:text-4xl font-light italic text-white/80 leading-relaxed font-serif">
                          "{profile?.bio || "No manifesto manifest yet. Enter the edit protocol to define your creative essence."}"
                        </p>
                      </div>

                      <div className="h-[1px] bg-white/10" />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                        <div className="space-y-8">
                          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 italic">Digital Connections</h3>
                          <div className="space-y-4">
                            {profile?.links && profile.links.length > 0 ? (
                              profile.links.map((link, i) => (
                                <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-6 liquid-glass rounded-2xl border border-white/10 hover:border-[#5490B4] transition-all group shadow-sm">
                                  <span className="text-[10px] text-white/60 uppercase font-black tracking-widest group-hover:text-[#5490B4]">{link.label}</span>
                                  <ExternalLink size={12} className="text-white/20 group-hover:text-[#5490B4]" />
                                </a>
                              ))
                            ) : (
                              <p className="text-sm italic text-white/20">No connections established...</p>
                            )}
                          </div>
                        </div>
                        <div className="space-y-8">
                          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 italic">Guild Disciplines</h3>
                          <div className="flex flex-wrap gap-3">
                            {profile?.skills && profile.skills.length > 0 ? (
                              profile.skills.map(skill => (
                                <span key={skill} className="px-6 md:px-8 py-3 liquid-glass rounded-full border border-white/10 text-white/80 text-[9px] md:text-[10px] font-black uppercase tracking-widest italic hover:border-[#5490B4] transition-all shadow-sm">
                                  {skill}
                                </span>
                              ))
                            ) : (
                              <p className="text-sm italic text-white/20">No disciplines claimed...</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleUpdateProfile} className="liquid-glass rounded-3xl border border-white/10 p-8 md:p-20 shadow-2xl relative space-y-16">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-[#5490B4] opacity-30" />
                    <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-12 border-b border-white/10 pb-12">
                      <div className="space-y-4">
                        <span className="text-[#5490B4] text-[10px] font-black uppercase tracking-[0.6em] block italic">IDENTITY PROTOCOL</span>
                        <h2 className="text-3xl md:text-7xl font-bold text-white tracking-tighter font-serif leading-none italic">
                          Reclaim<span className="text-[#5490B4] not-italic font-sans">.</span>
                        </h2>
                      </div>
                      <div className="flex flex-wrap gap-4 w-full xl:w-auto">
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="flex-1 xl:flex-none px-8 py-4 text-[10px] text-white/40 uppercase font-black tracking-widest hover:text-white transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={loading}
                          className="flex-1 xl:flex-none px-10 py-5 rounded-full border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-[#5490B4] hover:border-[#5490B4] transition-all shadow-xl flex items-center justify-center gap-4"
                        >
                          <Save size={18} /> {loading ? "Updating..." : "Update Vault"}
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                      <div className="space-y-4">
                        <label className="text-[9px] uppercase tracking-[0.4em] font-black text-white/40 ml-6">Legal Name</label>
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                          className="w-full liquid-glass rounded-full py-5 md:py-6 px-8 md:px-10 border border-white/10 focus:outline-none focus:border-[#5490B4] transition-all text-white font-light shadow-sm bg-transparent"
                          placeholder="Your Name"
                        />
                      </div>

                      <div className="space-y-4">
                        <label className="text-[9px] uppercase tracking-[0.4em] font-black text-white/40 ml-6">Digital Access</label>
                        <input
                          type="email"
                          value={user?.email || ''}
                          className="w-full liquid-glass rounded-full py-5 md:py-6 px-8 md:px-10 border border-white/10 text-white/20 font-light cursor-not-allowed italic"
                          disabled
                        />
                      </div>

                      <div className="space-y-4">
                        <label className="text-[9px] uppercase tracking-[0.4em] font-black text-white/40 ml-6">Communication Link</label>
                        <input
                          type="text"
                          value={formData.mobile}
                          onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
                          className="w-full liquid-glass rounded-full py-5 md:py-6 px-8 md:px-10 border border-white/10 focus:outline-none focus:border-[#5490B4] transition-all text-white font-light shadow-sm bg-transparent"
                          placeholder="+91 00000 00000"
                        />
                      </div>

                      <div className="space-y-4">
                        <label className="text-[9px] uppercase tracking-[0.4em] font-black text-white/40 ml-6">Creator Manifesto</label>
                        <textarea
                          value={formData.bio}
                          onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                          className="w-full liquid-glass rounded-3xl py-5 md:py-6 px-8 md:px-10 border border-white/10 focus:outline-none focus:border-[#5490B4] transition-all text-white font-light h-40 md:h-48 resize-none italic shadow-sm bg-transparent"
                          placeholder="Define your artistic essence..."
                        />
                      </div>
                    </div>

                    <div className="space-y-10">
                      <label className="text-[9px] uppercase tracking-[0.4em] font-black text-white/40 ml-6">Professional Guilds</label>
                      <div className="flex flex-wrap gap-3 md:gap-4">
                        {skillOptions.map(skill => (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => toggleSkill(skill)}
                            className={cn(
                              "px-6 md:px-10 py-3 md:py-4 rounded-full text-[9px] font-black uppercase tracking-[0.3em] transition-all border shadow-sm",
                              formData.skills.includes(skill)
                                ? "bg-[#5490B4] text-white border-[#5490B4]"
                                : "liquid-glass text-white/40 border-white/10 hover:border-[#5490B4] hover:text-[#5490B4]"
                            )}
                          >
                            {skill}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-10 pt-10 border-t border-white/10">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                        <label className="text-[9px] uppercase tracking-[0.4em] font-black text-white/40 ml-6">Digital Connections (Max 5)</label>
                        {formData.links.length < 5 && (
                          <button
                            type="button"
                            onClick={addLink}
                            className="text-[9px] text-[#5490B4] uppercase font-black tracking-widest flex items-center gap-2 hover:gap-3 transition-all italic"
                          >
                            <Plus size={14} /> Establish Connection
                          </button>
                        )}
                      </div>
                      
                      <div className="space-y-6">
                        {formData.links.map((link, index) => (
                          <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-center">
                            <div className="md:col-span-4">
                              <input
                                type="text"
                                value={link.label}
                                onChange={(e) => updateLink(index, 'label', e.target.value)}
                                className="w-full liquid-glass rounded-full py-4 px-6 border border-white/10 focus:border-[#5490B4] outline-none text-[10px] font-black uppercase tracking-widest shadow-sm bg-transparent text-white"
                                placeholder="PLATFORM"
                              />
                            </div>
                            <div className="md:col-span-7">
                              <input
                                type="url"
                                value={link.url}
                                onChange={(e) => updateLink(index, 'url', e.target.value)}
                                className="w-full liquid-glass rounded-full py-4 px-6 border border-white/10 focus:border-[#5490B4] outline-none text-[10px] italic shadow-sm bg-transparent text-white"
                                placeholder="HTTPS://..."
                              />
                            </div>
                            <div className="md:col-span-1 flex justify-center">
                              <button
                                type="button"
                                onClick={() => removeLink(index)}
                                className="text-red-500/40 hover:text-red-500 transition-colors p-2"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Profile;
