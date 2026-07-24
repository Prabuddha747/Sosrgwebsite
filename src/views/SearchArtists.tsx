"use client";

import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Mail, X, ChevronDown, MapPin, ArrowRight, Shield } from 'lucide-react';
import { useNavigate, Link } from '@/lib/router-compat';
import { collection, query, getDocs, where, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { cn } from '@/lib/utils';
import { UserProfile } from '@/contexts/AuthContext';
import ChromaGrid from '@/components/ChromaGrid';

const SearchArtists = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeDistrict, setActiveDistrict] = useState('All Districts');
  const [artists, setArtists] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDistrictOpen, setIsDistrictOpen] = useState(false);
  const navigate = useNavigate();
  const cinematicTransition: any = { duration: 0.8, ease: [] as any };

  const filters = [
    'All', 'Artist', 'Videographer', 'Photographer', 'Editor', 
    'Director', 'Producer', 'Dancer', 'Musician', 'Actor', 'Model'
  ];

  const districts = [
    'All Districts', 'Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Purnia', 
    'Darbhanga', 'Bihar Sharif', 'Arrah', 'Begusarai', 'Katihar', 'Munger'
  ];

  useEffect(() => {
    const fetchArtists = async () => {
      setLoading(true);
      try {
        const profilesRef = collection(db, 'profiles');
        let q = query(profilesRef, limit(40));
        
        if (activeFilter !== 'All') {
          q = query(profilesRef, where('skills', 'array-contains', activeFilter), limit(40));
        }

        const querySnapshot = await getDocs(q);
        const results = querySnapshot.docs.map(doc => doc.data() as UserProfile);
        setArtists(results);
      } catch (error) {
        console.error("Error fetching artists:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, [activeFilter]);

  const filteredArtists = artists.filter(artist => {
    const matchesSearch = 
      artist.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artist.skills?.some((s: string) => s.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesDistrict = activeDistrict === 'All Districts' || artist.district === activeDistrict;
    
    return matchesSearch && matchesDistrict;
  });

  const chromaItems = filteredArtists.map(artist => ({
    id: artist.uid,
    image: artist.photoURL || undefined,
    title: artist.displayName || 'Unnamed Creator',
    subtitle: artist.skills && artist.skills.length > 0 
      ? artist.skills[0] 
      : 'Ecosystem Creative',
    handle: artist.district ? `${artist.district.toUpperCase()} SANCTUARY` : 'BIHAR SANCTUARY',
    borderColor: '#5490B4',
    gradient: 'linear-gradient(145deg, rgba(184, 160, 137, 0.03), rgba(18, 22, 31, 0.95))',
    skills: artist.skills,
    isAdmin: artist.isAdmin
  }));

  return (
    <Layout>
      <section className="pt-24 md:pt-40 pb-40 min-h-screen">
        <div className="layout-container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={cinematicTransition}
          >
            {/* Header */}
            <div className="mb-20 md:mb-24 border-b border-white/10 pb-12">
              <span className="text-[10px] font-black uppercase tracking-[0.6em] mb-4 block text-[#5490B4] italic">
                DIRECTORY / REGISTRY
              </span>
              <h1 className="text-3xl md:text-8xl font-black mb-12 tracking-tighter text-white leading-none font-serif italic">
                Creators<span className="text-[#5490B4] not-italic font-sans">.</span>
              </h1>
              
              <div className="flex flex-col lg:flex-row gap-8 items-end justify-between">
                <div className="w-full lg:max-w-xl relative group">
                  <input 
                    type="text" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search the sanctuary..." 
                    className="w-full liquid-glass rounded-full py-5 md:py-6 px-12 md:px-16 border border-white/10 focus:outline-none focus:border-[#5490B4] transition-all text-white text-base md:text-lg placeholder:text-white/20 font-light italic"
                  />
                  <Search className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-white/20 group-hover:text-[#5490B4] transition-colors" size={18} />
                </div>

                <div className="flex flex-wrap gap-4 w-full lg:w-auto">
                  <button 
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="flex-1 lg:flex-none liquid-glass rounded-full px-6 md:px-8 py-4 border border-white/10 flex items-center justify-between gap-4 text-[9px] font-black uppercase tracking-widest hover:border-[#5490B4] hover:text-[#5490B4] transition-all"
                  >
                    DISCIPLINE <ChevronDown size={14} className="text-[#5490B4]" />
                  </button>
                  <button 
                    onClick={() => setIsDistrictOpen(!isDistrictOpen)}
                    className="flex-1 lg:flex-none liquid-glass rounded-full px-6 md:px-8 py-4 border border-white/10 flex items-center justify-between gap-4 text-[9px] font-black uppercase tracking-widest hover:border-[#5490B4] hover:text-[#5490B4] transition-all"
                  >
                    LOCATION <ChevronDown size={14} className="text-[#5490B4]" />
                  </button>
                </div>
              </div>
            </div>

            {/* Grid */}
            <div className="relative overflow-hidden">
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="rounded-3xl p-12 border border-white/5 min-h-[520px] animate-pulse bg-white/5" />
                  ))}
                </div>
              ) : (
                <ChromaGrid 
                  items={chromaItems}
                  radius={350}
                  onCardClick={(item) => navigate(`/artists/${item.id}`)}
                />
              )}
            </div>

            {!loading && filteredArtists.length === 0 && (
              <div className="py-40 text-center border border-dashed border-white/10 rounded-3xl mt-12">
                 <Search size={48} className="mx-auto text-white/20 mb-8" />
                 <p className="text-xl font-bold italic text-white/40 font-serif uppercase tracking-widest">No matching creators found in the registry.</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Filter Modals */}
      <AnimatePresence>
        {(isFilterOpen || isDistrictOpen) && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setIsFilterOpen(false); setIsDistrictOpen(false); }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-transparent z-[70] p-12 md:p-16 shadow-2xl border-l border-white/10 flex flex-col"
            >
              <div className="flex items-center justify-between mb-16">
                <h2 className="text-4xl font-bold text-white font-serif italic tracking-tighter">
                  {isFilterOpen ? 'Disciplines.' : 'Locations.'}
                </h2>
                <button onClick={() => { setIsFilterOpen(false); setIsDistrictOpen(false); }} className="p-2 hover:rotate-90 transition-transform text-white/40 hover:text-white">
                  <X size={24} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto space-y-2 pr-4 custom-scrollbar">
                {(isFilterOpen ? filters : districts).map(item => (
                  <button
                    key={item}
                    onClick={() => {
                      if (isFilterOpen) setActiveFilter(item);
                      else setActiveDistrict(item);
                      setIsFilterOpen(false);
                      setIsDistrictOpen(false);
                    }}
                    className={cn(
                      "w-full text-left py-6 px-4 text-2xl font-bold font-serif italic border-b border-white/5 hover:bg-white/5 transition-all flex justify-between items-center group rounded-xl",
                      (isFilterOpen ? activeFilter : activeDistrict) === item ? "text-[#5490B4] bg-white/5" : "text-white/40 hover:text-white"
                    )}
                  >
                    <span>{item}</span>
                    <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0" />
                  </button>
                ))}
              </div>

              <div className="mt-12 text-[9px] font-black uppercase tracking-[0.5em] text-white/20 italic">
                Refining the Sanctuary Discovery.
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default SearchArtists;
