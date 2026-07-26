"use client";

import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ChevronDown, MapPin, ArrowRight, Plus, Wallet, Clock } from 'lucide-react';
import { useNavigate, Link, useSearchParams } from '@/lib/router-compat';
import { collection, query, getDocs, where, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { cn } from '@/lib/utils';
import { useAuth, UserProfile } from '@/contexts/AuthContext';
import { getLiveCastingCalls, CastingCall } from '@/lib/db';
import ChromaGrid from '@/components/ChromaGrid';

type Tab = 'casting' | 'artists';

// "Callback" — a numbered, sequential reveal (MOTION_LANGUAGE_GUIDE.md §3),
// echoing an audition room calling names in order rather than a generic fade.
const CastingCallCard = ({ call, index }: { call: CastingCall; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.5, delay: index * 0.08 }}
    className="relative"
  >
    <span
      aria-hidden
      className="absolute -top-6 -left-2 text-6xl font-black text-[#B9914A]/10 select-none pointer-events-none"
      style={{ fontFamily: "'Cormorant Garamond', serif" }}
    >
      {String(index + 1).padStart(2, '0')}
    </span>
    <Link
      to={`/casting/${call.id}`}
      className="relative block liquid-glass p-6 rounded-2xl border border-white/10 hover:border-[#B9914A]/50 transition-all cursor-pointer group h-full"
    >
      <div className="flex justify-between items-start mb-4">
        <span className="text-xs uppercase tracking-widest text-[#B9914A]">
          {call.creativeDomain?.[0] || 'Creative Opportunity'}
        </span>
        {call.promotion?.featured && (
          <span className="text-[10px] uppercase tracking-wider text-[#090B10] bg-[#B9914A] px-2 py-1 rounded-sm font-bold">Featured</span>
        )}
      </div>
      <h3 className="text-xl text-white font-medium mb-2 group-hover:text-[#B9914A] transition-colors">
        {call.role} — {call.project}
      </h3>
      <p className="text-sm text-white/50 mb-6 line-clamp-2">
        {call.applicationRequirements || `${call.experienceLevel} level, based in ${call.location}.`}
      </p>
      <div className="flex flex-wrap gap-4 text-white/50 text-xs mb-6">
        <span className="flex items-center gap-1.5"><MapPin size={12} className="text-[#B9914A]" />{call.location}</span>
        <span className="flex items-center gap-1.5"><Wallet size={12} className="text-[#B9914A]" />{call.compensation}</span>
        <span className="flex items-center gap-1.5"><Clock size={12} className="text-[#B9914A]" />{call.timeline}</span>
      </div>
      <div className="w-full py-3 bg-white/5 group-hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-all text-white text-center">
        View Details
      </div>
    </Link>
  </motion.div>
);

const CastingTab = () => {
  const { profile } = useAuth();
  const [calls, setCalls] = useState<CastingCall[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLiveCastingCalls()
      .then(setCalls)
      .catch((error) => console.error('Error fetching casting calls:', error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {profile?.activeWorkspace === 'studio' && (
        <div className="flex justify-end mb-8">
          <Link
            to="/casting/new"
            className="inline-flex items-center gap-2 bg-[#B9914A] text-[#090B10] px-6 py-3 rounded-full text-sm font-medium hover:bg-[#F5F4F2] transition-colors"
          >
            <Plus size={18} /> Post a Casting Call
          </Link>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-2xl border border-white/5 h-64 animate-pulse bg-white/5" />
          ))}
        </div>
      ) : calls.length === 0 ? (
        <div className="py-24 text-center border border-dashed border-white/10 rounded-2xl">
          <Search size={40} className="mx-auto text-white/20 mb-6" />
          <p className="text-white/40 uppercase tracking-widest text-sm font-bold">
            No live casting calls right now — check back soon.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
          {calls.map((call, i) => (
            <CastingCallCard key={call.id} call={call} index={i} />
          ))}
        </div>
      )}
    </div>
  );
};

const ArtistsTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeDistrict, setActiveDistrict] = useState('All Districts');
  const [artists, setArtists] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDistrictOpen, setIsDistrictOpen] = useState(false);
  const navigate = useNavigate();

  const filters = [
    'All', 'Artist', 'Videographer', 'Photographer', 'Editor',
    'Director', 'Producer', 'Dancer', 'Musician', 'Actor', 'Model',
  ];

  const districts = [
    'All Districts', 'Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Purnia',
    'Darbhanga', 'Bihar Sharif', 'Arrah', 'Begusarai', 'Katihar', 'Munger',
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
        console.error('Error fetching artists:', error);
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
    subtitle: artist.creativeDomains?.[0] || artist.skills?.[0] || 'Ecosystem Creative',
    handle: artist.district ? `${artist.district.toUpperCase()} SANCTUARY` : 'BIHAR SANCTUARY',
    borderColor: '#B9914A',
    gradient: 'linear-gradient(145deg, rgba(185, 145, 74, 0.05), rgba(18, 22, 31, 0.95))',
    skills: artist.creativeDomains || artist.skills,
    verified: artist.verified,
  }));

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-6 items-end justify-between mb-12">
        <div className="w-full lg:max-w-xl relative group">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search the registry..."
            className="w-full liquid-glass rounded-full py-4 px-12 border border-white/10 focus:outline-none focus:border-[#B9914A] transition-all text-white placeholder:text-white/20"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-hover:text-[#B9914A] transition-colors" size={16} />
        </div>

        <div className="flex flex-wrap gap-3 w-full lg:w-auto">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex-1 lg:flex-none liquid-glass rounded-full px-5 py-3 border border-white/10 flex items-center justify-between gap-3 text-[9px] font-black uppercase tracking-widest hover:border-[#B9914A] hover:text-[#B9914A] transition-all"
          >
            DISCIPLINE <ChevronDown size={12} className="text-[#B9914A]" />
          </button>
          <button
            onClick={() => setIsDistrictOpen(!isDistrictOpen)}
            className="flex-1 lg:flex-none liquid-glass rounded-full px-5 py-3 border border-white/10 flex items-center justify-between gap-3 text-[9px] font-black uppercase tracking-widest hover:border-[#B9914A] hover:text-[#B9914A] transition-all"
          >
            LOCATION <ChevronDown size={12} className="text-[#B9914A]" />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-3xl p-12 border border-white/5 min-h-[420px] animate-pulse bg-white/5" />
          ))}
        </div>
      ) : (
        <ChromaGrid items={chromaItems} radius={350} onCardClick={(item) => navigate(`/artists/${item.id}`)} />
      )}

      {!loading && filteredArtists.length === 0 && (
        <div className="py-24 text-center border border-dashed border-white/10 rounded-3xl mt-8">
          <Search size={40} className="mx-auto text-white/20 mb-6" />
          <p className="text-white/40 font-bold uppercase tracking-widest">No matching creators found in the registry.</p>
        </div>
      )}

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
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#090B10] z-[70] p-10 md:p-14 shadow-2xl border-l border-white/10 flex flex-col"
            >
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-3xl font-bold text-white tracking-tighter">
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
                      'w-full text-left py-5 px-4 text-xl font-bold border-b border-white/5 hover:bg-white/5 transition-all flex justify-between items-center group rounded-xl',
                      (isFilterOpen ? activeFilter : activeDistrict) === item ? 'text-[#B9914A] bg-white/5' : 'text-white/40 hover:text-white'
                    )}
                  >
                    <span>{item}</span>
                    <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0" />
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const Explore = () => {
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<Tab>(searchParams?.get('tab') === 'artists' ? 'artists' : 'casting');
  const cinematicTransition: any = { duration: 0.8, ease: [] as any };

  return (
    <Layout>
      <section className="pt-24 md:pt-32 pb-40 min-h-screen bg-transparent">
        <div className="layout-container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={cinematicTransition}
            className="mb-16 border-b border-white/10 pb-12"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.6em] mb-4 block text-[#B9914A] italic">
              EXPLORE
            </span>
            <h1 className="text-3xl md:text-7xl font-black mb-8 tracking-tighter text-white leading-none">
              Casting calls. Creators.{' '}
              <span className="text-[#B9914A] italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>One room.</span>
            </h1>
            <p className="text-white/50 text-lg max-w-2xl mb-12">
              The registry where opportunities and artists finally share the same space —
              no more checking two separate directories.
            </p>

            <div className="inline-flex bg-white/5 border border-white/10 rounded-full p-1">
              <button
                onClick={() => setTab('casting')}
                className={cn(
                  'px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all',
                  tab === 'casting' ? 'bg-[#B9914A] text-[#090B10]' : 'text-white/50 hover:text-white'
                )}
              >
                Casting Calls
              </button>
              <button
                onClick={() => setTab('artists')}
                className={cn(
                  'px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all',
                  tab === 'artists' ? 'bg-[#B9914A] text-[#090B10]' : 'text-white/50 hover:text-white'
                )}
              >
                Discover Artists
              </button>
            </div>
          </motion.div>

        {tab === 'casting' ? <CastingTab /> : <ArtistsTab />}
        </div>
      </section>
    </Layout>
  );
};

export default Explore;
