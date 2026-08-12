import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Film,
  Theater,
  PenTool,
  Music,
  Search,
  Cpu,
  ShieldCheck,
  FileText,
  LayoutDashboard,
  Star,
  ChevronRight,
  Play,
  Mic,
  Video,
  Menu,
  Smartphone,
  X,
  Zap,
  Lock,
  Globe,
  Award,
  TrendingUp,
  Briefcase,
  Gavel,
  ShoppingBag,
  Wallet,
  MessageSquare,
  Trophy,
  Clock,
  Check,
  Upload,
  Settings,
  ArrowUpRight,
  ArrowDownRight,
  Scale,
  FileCheck,
  CheckCircle,
  CheckCircle2,
  AlertCircle,
  Users,
  Calendar,
  MapPin,
  BarChart3,
  PieChart,
  Building2,
  GraduationCap,
  Heart,
  Handshake,
  Calculator,
  Ticket,
  Palette,
  BookOpen,
  Store,
  Network,
  Instagram,
  Youtube,
  ExternalLink,
  Plus,
  Share2,
  Filter,
  UserPlus,
  Home,
  UserCheck,
  MessageCircle,
  HeartHandshake,
  Newspaper,
  MoreHorizontal,
  ShoppingCart,
  Moon,
  Sun,
  Languages,
  ArrowUp,
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import { cn } from '../lib/utils';
import type { Section } from '../types';
import { castingService } from '../services/casting';
import type { CastingCall, CastingCallApplicationSummary, CastingApplicationSettableStatus } from '../services/casting';
import { ApiError } from '../services/httpClient';
import { useToast } from '../design-system';
import { useAuth } from '../contexts/AuthContext';
import { portfoliosService } from '../services/portfolios';
import type { PortfolioItemDetail } from '../services/portfolios';
import { getAssetContentUrl } from '../services/media';
import { jobsService } from '../services/jobs';
import type { JobPost } from '../services/jobs';
import { ScaffoldRow, ComingSoonTag } from '../components/ScaffoldUI';

// Formats the live API's minor-unit budget range into display text, used
// for both casting calls and job posts (same budget field shape).
function formatCastingBudget(call: { compensationType: string; budgetMinMinor: number | null; budgetMaxMinor: number | null; currency: string }): string {
  if (call.compensationType === 'unpaid') return 'Unpaid';
  if (call.budgetMinMinor == null || call.budgetMaxMinor == null) {
    return call.compensationType === 'negotiable' ? 'Negotiable' : 'Compensation TBD';
  }
  const fmt = (minor: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: call.currency, maximumFractionDigits: 0 }).format(minor / 100);
  return `${fmt(call.budgetMinMinor)} – ${fmt(call.budgetMaxMinor)}`;
}

export const CastingEcosystem = () => {
  // Casting Calls is the only tab with real listings behind it, so it's
  // the landing view now instead of the decorative Home tab — arriving at
  // /casting (from the hero CTA, navbar, anywhere) drops straight into
  // real data rather than a preview screen you then have to click through.
  const [view, setView] = useState<'home' | 'calls' | 'studio' | 'dashboard' | 'builder' | 'matchmaking' | 'crew' | 'applications' | 'network' | 'forum' | 'workshops' | 'mentorship' | 'events' | 'volunteer' | 'grants' | 'post-job' | 'post-casting-call'>('calls');
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
  const [builderMode, setBuilderMode] = useState<'ai' | 'manual'>('ai');
  const [crewMode, setCrewMode] = useState<'jobs' | 'professionals'>('jobs');
  const [forumMode, setForumMode] = useState<'messages' | 'community'>('community');
  const [crewSector, setCrewSector] = useState('All Sectors');
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedCall, setSelectedCall] = useState<any>(null);
  const [coverNote, setCoverNote] = useState('');
  const [applying, setApplying] = useState(false);
  const { show } = useToast();
  const { user, profile: authProfile } = useAuth();
  // Real account setting (profileType), read-only here — creating jobs/
  // casting calls and switching to a Business profile both moved to the
  // admin panel, so this page no longer offers a way to change it, only to
  // reflect it (e.g. "Manage Calls" vs "Casting Calls", AI Smart Match vs
  // Talent Search copy).
  const BUSINESS_LIKE_TYPES = ['business', 'casting_director', 'industry_professional', 'arts_organisation'];
  const isRecruiter = !!authProfile && BUSINESS_LIKE_TYPES.includes(authProfile.profileType);

  // Apply modal — real portfolio items to attach (mediaAssetIds), replacing
  // the old hardcoded "Main Headshot"/"Full Body Shot" checkboxes that
  // weren't backed by any real selection. Fetched fresh each time the modal
  // opens rather than reusing `myPortfolios` above, since that one's scoped
  // to the separate "My Profile" tab and may never have loaded.
  const [applyPortfolioItems, setApplyPortfolioItems] = useState<PortfolioItemDetail[] | null>(null);
  const [selectedMediaAssetIds, setSelectedMediaAssetIds] = useState<string[]>([]);
  useEffect(() => {
    if (!showApplicationModal || !user) return;
    let cancelled = false;
    setApplyPortfolioItems(null);
    setSelectedMediaAssetIds([]);
    portfoliosService
      .listMyPortfolios()
      .then((list) => {
        const primaryId = list[0]?.id;
        if (!primaryId) return { items: [] } as { items: PortfolioItemDetail[] };
        return portfoliosService.getPortfolioById(primaryId);
      })
      .then((detail) => {
        if (cancelled) return;
        const mediaItems = detail.items.filter((item) => item.mediaAssetId);
        setApplyPortfolioItems(mediaItems);
        setSelectedMediaAssetIds(mediaItems.map((item) => item.mediaAssetId!));
      })
      .catch(() => {
        if (!cancelled) setApplyPortfolioItems([]);
      });
    return () => {
      cancelled = true;
    };
  }, [showApplicationModal, user]);

  const toggleMediaAssetSelected = (assetId: string) => {
    setSelectedMediaAssetIds((prev) =>
      prev.includes(assetId) ? prev.filter((id) => id !== assetId) : [...prev, assetId],
    );
  };
  const navigate = useNavigate();
  const location = useLocation();

  // Everything except Home and the live Casting Calls listing requires an
  // account — send a logged-out visitor to create a profile instead of
  // switching to a tab that's meaningless without one.
  const PUBLIC_TABS = new Set(['home', 'calls']);
  const handleTabClick = (tabId: string) => {
    if (!PUBLIC_TABS.has(tabId) && !user) {
      navigate('/signup', { state: { from: location } });
      return;
    }
    setView(tabId as any);
  };

  // Applying is a real, auth-required action (unlike the rest of this page,
  // which isn't behind RequireAuth) — send a logged-out user to /login
  // instead of opening a modal they can't submit, so it fails visibly and
  // predictably rather than as a raw "Not signed in." error toast.
  const openApplicationModal = (call: any) => {
    if (!user) {
      navigate('/login', { state: { from: location } });
      return;
    }
    setSelectedCall(call);
    setShowApplicationModal(true);
  };

  // Live casting calls — "Casting Calls" and "Hiring Crew" are the only two
  // tabs on this page wired to a real, live API; every other tab is an
  // honest "Visit Our App" placeholder.
  const [liveCalls, setLiveCalls] = useState<CastingCall[]>([]);
  const [liveLoading, setLiveLoading] = useState(true);
  const [liveError, setLiveError] = useState<string | null>(null);
  const [castingCallsRefreshKey, setCastingCallsRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLiveLoading(true);
    setLiveError(null);
    castingService
      .listCastingCalls({ limit: 20 })
      .then((result) => {
        if (!cancelled) setLiveCalls(result.items);
      })
      .catch((err) => {
        if (!cancelled) setLiveError(err instanceof ApiError ? err.message : 'Could not load casting calls.');
      })
      .finally(() => {
        if (!cancelled) setLiveLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [castingCallsRefreshKey]);

  // Applicants tab (recruiter-side review) — GET /v1/casting-calls/{id}/applications
  // is scoped per casting call, so this reuses liveCalls (already fetched
  // above) filtered to ones this profile created, rather than a dedicated
  // "my calls" endpoint (none exists — see doc/API_ENDPOINT_MAP.md).
  const myCastingCalls = liveCalls.filter((c) => c.createdBy === authProfile?.id);
  const [reviewingCallId, setReviewingCallId] = useState<string | null>(null);
  const [callApplications, setCallApplications] = useState<CastingCallApplicationSummary[] | null>(null);
  const [callApplicationsLoading, setCallApplicationsLoading] = useState(false);
  const [callApplicationsError, setCallApplicationsError] = useState<string | null>(null);
  const [updatingApplicationId, setUpdatingApplicationId] = useState<string | null>(null);

  useEffect(() => {
    if (!reviewingCallId) return;
    let cancelled = false;
    setCallApplicationsLoading(true);
    setCallApplicationsError(null);
    castingService
      .listApplicationsForCall(reviewingCallId)
      .then((items) => {
        if (!cancelled) setCallApplications(items);
      })
      .catch((err) => {
        if (!cancelled) setCallApplicationsError(err instanceof ApiError ? err.message : 'Could not load applications.');
      })
      .finally(() => {
        if (!cancelled) setCallApplicationsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [reviewingCallId]);

  const handleUpdateApplicationStatus = async (applicationId: string, status: CastingApplicationSettableStatus) => {
    setUpdatingApplicationId(applicationId);
    try {
      await castingService.updateApplicationStatus(applicationId, status);
      setCallApplications((prev) => prev?.map((a) => (a.id === applicationId ? { ...a, status } : a)) ?? prev);
      show(`Marked as ${status}.`, 'success');
    } catch (err) {
      show(err instanceof ApiError ? err.message : 'Could not update application status.', 'error');
    } finally {
      setUpdatingApplicationId(null);
    }
  };

  // Live job posts — Hiring Crew tab's "Find Jobs" mode. Same real API as
  // Casting Calls (GET/POST /v1/job-posts), just a different resource.
  const [liveJobs, setLiveJobs] = useState<JobPost[]>([]);
  const [liveJobsLoading, setLiveJobsLoading] = useState(true);
  const [liveJobsError, setLiveJobsError] = useState<string | null>(null);
  // Bumped after a successful "Post a Role" so the list effect below
  // refetches and the newly-posted role shows up without a manual reload.
  const [jobPostsRefreshKey, setJobPostsRefreshKey] = useState(0);

  useEffect(() => {
    if (view !== 'crew' || crewMode !== 'jobs') return;
    let cancelled = false;
    setLiveJobsLoading(true);
    setLiveJobsError(null);
    jobsService
      .listJobPosts({ limit: 20 })
      .then((result) => {
        if (!cancelled) setLiveJobs(result.items);
      })
      .catch((err) => {
        if (!cancelled) setLiveJobsError(err instanceof ApiError ? err.message : 'Could not load job postings.');
      })
      .finally(() => {
        if (!cancelled) setLiveJobsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [view, crewMode, jobPostsRefreshKey]);

  // Not currently called — Apply for Role now gates on app install rather
  // than submitting from web (explicit product decision). Left in place,
  // real and POST-verified, since re-enabling the web submit path later is
  // a one-line change (swap the modal body back in) rather than a rebuild.
  const handleSubmitApplication = async () => {
    if (!selectedCall) return;
    setApplying(true);
    try {
      const mediaAssetIds = selectedMediaAssetIds.length > 0 ? selectedMediaAssetIds : undefined;
      if (selectedCall.__type === 'job') {
        await jobsService.applyToJobPost(selectedCall.id, { coverNote: coverNote || undefined, mediaAssetIds });
      } else {
        await castingService.applyToCastingCall(selectedCall.id, { coverNote: coverNote || undefined, mediaAssetIds });
      }
      show('Application submitted.', 'success');
      setShowApplicationModal(false);
      setCoverNote('');
      setSelectedMediaAssetIds([]);
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        setShowApplicationModal(false);
        show('Your session expired — please sign in again.', 'error');
        navigate('/login', { state: { from: location } });
        return;
      }
      show(err instanceof ApiError ? err.message : 'Could not submit application.', 'error');
    } finally {
      setApplying(false);
    }
  };

  const [formData, setFormData] = useState({
    title: '',
    house: '',
    type: 'Feature Film',
    description: '',
    location: 'Mumbai',
    budget: '',
    deadline: '',
    timeline: '',
    ndaRequired: false,
    roles: [{ id: 1, name: '', age: '', gender: 'Any', description: '' }]
  });

  const handleAutoDetectRoles = () => {
    // Simulate AI auto-detecting roles based on description
    if (formData.description.length > 20) {
      setFormData(prev => ({
        ...prev,
        roles: [
          { id: Date.now(), name: 'Lead Protagonist', age: '25-35', gender: 'Any', description: 'Strong emotional range required.' },
          { id: Date.now() + 1, name: 'Supporting Antagonist', age: '40-50', gender: 'Male', description: 'Intimidating presence.' }
        ]
      }));
    }
  };

  const addRole = () => {
    setFormData({
      ...formData,
      roles: [...formData.roles, { id: Date.now(), name: '', age: '', gender: 'Any', description: '' }]
    });
  };

  const removeRole = (id: number) => {
    if (formData.roles.length > 1) {
      setFormData({
        ...formData,
        roles: formData.roles.filter(r => r.id !== id)
      });
    }
  };

  return (
    <div className="pt-32 px-6 w-full max-w-[1600px] mx-auto min-h-screen pb-24">
      {/* Application Modal */}
      <AnimatePresence>
        {showApplicationModal && selectedCall && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-cinematic-gray border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-5 sm:p-8 shadow-2xl no-scrollbar"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Apply for Role</h2>
                  <p className="text-gold font-bold uppercase tracking-widest text-sm">{selectedCall.title}</p>
                </div>
                <button onClick={() => setShowApplicationModal(false)} className="text-white/40 hover:text-white p-2">
                  <X size={24} />
                </button>
              </div>

              <div className="bg-white/5 p-4 rounded-xl border border-white/10 mb-6">
                <h3 className="font-bold mb-2 text-sm">Role Details</h3>
                <p className="text-xs text-white/60 mb-2">{selectedCall.description}</p>
                <div className="grid grid-cols-2 gap-2 text-xs text-white/60">
                  <div className="flex items-center gap-2"><MapPin size={14} className="text-blue-400" /> {selectedCall.location}</div>
                  <div className="flex items-center gap-2"><Wallet size={14} className="text-emerald-400" /> {selectedCall.payment}</div>
                </div>
              </div>

              <div className="text-center py-8">
                <Smartphone size={40} className="mx-auto mb-4 text-gold" />
                <h3 className="text-xl font-bold mb-2">Apply from the SosrG App</h3>
                <p className="text-sm text-white/60 max-w-sm mx-auto mb-8">
                  Submitting an application — with portfolio attachments and audition video uploads — is available in the SosrG mobile app. Please install our app to apply.
                </p>
                <button
                  onClick={() => setShowApplicationModal(false)}
                  className="bg-gold text-black px-8 py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-yellow-500 transition-colors"
                >
                  Got it
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Advanced Filter Modal */}
      <AnimatePresence>
        {showAdvancedFilter && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-cinematic-gray border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl p-5 sm:p-8 shadow-2xl no-scrollbar"
            >
              <div className="flex justify-between items-center mb-8 sticky top-0 bg-cinematic-gray py-2 z-10">
                <div>
                  <h2 className="text-3xl font-bold flex items-center gap-3">
                    <Search className="text-crimson" /> Advanced AI Talent Filter
                  </h2>
                  <p className="text-white/40 text-sm">Precision matching across 50,000+ verified professionals.</p>
                </div>
                <button 
                  onClick={() => setShowAdvancedFilter(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Visual & AI Recognition */}
                <div className="space-y-8">
                  <section>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gold mb-4">AI Visual Recognition</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                        <label className="text-xs text-white/60 block mb-2">Face Similarity (Reference Photo)</label>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center border border-dashed border-white/20">
                            <Video size={16} className="text-white/20" />
                          </div>
                          <button className="text-xs bg-white/10 px-3 py-2 rounded-lg hover:bg-white/20 transition-colors">Upload Reference</button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-white/60 block mb-2">Screen Presence %</label>
                          <input type="range" className="w-full accent-crimson" />
                        </div>
                        <div>
                          <label className="text-xs text-white/60 block mb-2">Age Range</label>
                          <div className="flex gap-2">
                            <input type="text" placeholder="18" className="w-full bg-black/30 border border-white/10 rounded p-1 text-xs" />
                            <input type="text" placeholder="35" className="w-full bg-black/30 border border-white/10 rounded p-1 text-xs" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gold mb-4">Creative Sector Expertise</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {['Cinema Acting', 'Theatre Performance', 'Voiceover/Narration', 'Classical Music', 'Contemporary Dance', 'Set/Prop Design', 'Artisan Crafts'].map(style => (
                        <label key={style} className="flex items-center gap-2 p-3 bg-white/5 rounded-xl border border-white/5 cursor-pointer hover:border-crimson/30 transition-all">
                          <input type="checkbox" className="accent-crimson" />
                          <span className="text-xs">{style}</span>
                        </label>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gold mb-4">Voice & Audio</h3>
                    <div className="space-y-4">
                      <select className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-xs">
                        <option>Voice Tone: All</option>
                        <option>Bass / Baritone</option>
                        <option>Tenor</option>
                        <option>Soprano / Mezzo</option>
                      </select>
                      <div className="flex flex-wrap gap-2">
                        {['Bhojpuri Accent', 'Tamil Accent', 'British English', 'US English', 'Bengali Accent'].map(a => (
                          <span key={a} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] cursor-pointer hover:bg-crimson/20 transition-colors">{a}</span>
                        ))}
                      </div>
                    </div>
                  </section>
                </div>

                {/* Skills & Background */}
                <div className="space-y-8">
                  <section>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gold mb-4">Specialized Skills</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {['Classical Dance', 'Instrumental Music', 'Scriptwriting', 'Cinematography', 'Sound Engineering', 'Costume Design'].map(skill => (
                        <label key={skill} className="flex items-center gap-2 p-3 bg-white/5 rounded-xl border border-white/5 cursor-pointer hover:border-crimson/30 transition-all">
                          <input type="checkbox" className="accent-crimson" />
                          <span className="text-xs">{skill}</span>
                        </label>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gold mb-4">Industry Credentials</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                        <span className="text-xs">Live Performance Experience Priority</span>
                        <button className="w-10 h-5 bg-crimson rounded-full relative">
                          <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
                        </button>
                      </div>
                      <select className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-xs">
                        <option>Institute: Any</option>
                        <option>NSD (National School of Drama)</option>
                        <option>FTII Pune</option>
                        <option>NID (National Institute of Design)</option>
                        <option>KM Music Conservatory</option>
                        <option>SosrG Academy</option>
                      </select>
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                        <span className="text-xs">Union/Guild Member</span>
                        <input type="checkbox" className="accent-crimson" />
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gold mb-4">Availability & Logistics</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] text-white/40 block mb-1">Min Rate (₹)</label>
                          <input type="text" placeholder="10k" className="w-full bg-black/30 border border-white/10 rounded p-2 text-xs" />
                        </div>
                        <div>
                          <label className="text-[10px] text-white/40 block mb-1">Max Rate (₹)</label>
                          <input type="text" placeholder="5L" className="w-full bg-black/30 border border-white/10 rounded p-2 text-xs" />
                        </div>
                      </div>
                      <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center gap-3">
                        <Briefcase size={16} className="text-white/40" />
                        <span className="text-xs">Available for Immediate Shoot</span>
                        <input type="checkbox" className="ml-auto accent-crimson" />
                      </div>
                    </div>
                  </section>
                </div>
              </div>

              <div className="mt-12 flex gap-4 sticky bottom-0 bg-cinematic-gray py-4 border-t border-white/5">
                <button 
                  onClick={() => setShowAdvancedFilter(false)}
                  className="flex-1 bg-crimson text-white py-4 rounded-2xl font-bold uppercase tracking-widest hover:scale-[1.02] transition-transform shadow-lg shadow-crimson/20"
                >
                  Apply AI Filters
                </button>
                <button className="px-8 bg-white/5 border border-white/10 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">
                  Reset
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mb-12 space-y-8">
        {/* Page intro — replaces a decorative stock-photo banner that had no
            real connection to casting and just confused what this page was
            for. This explains the page and is upfront about which tabs
            below are real vs. still being built. */}
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Casting <span className="gold-text">& Hiring</span></h1>
          <p className="text-white/70 text-lg mb-3">
            Real casting calls, real applications, and a profile built to get you seen by the people
            doing the hiring — with crew hiring, audition tools, and industry networking on the way.
          </p>
          <p className="text-white/50 text-base">
            Casting Calls is live now, pulling real listings you can apply to today. Hiring Crew, AI
            Matchmaking, Audition Studio, Network, Forum, Workshops, and more are still being built —
            take a look at what's coming.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={() => navigate(user ? '/profile' : '/signup', user ? undefined : { state: { from: location } })}
              className="bg-gold text-black px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-yellow-500 transition-colors"
            >
              {user ? 'Go to My Profile' : 'Join as Talent'}
            </button>
            <button onClick={() => setView('calls')} className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">Browse Casting Calls</button>
          </div>
          {!user && (
            <p className="text-white/40 text-sm mt-4">
              Already have an account?{' '}
              <button onClick={() => navigate('/login', { state: { from: location } })} className="text-gold hover:underline font-bold">
                Log in
              </button>
            </p>
          )}
        </div>

        <div className="flex flex-col items-start gap-4 w-full">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-1 bg-white/5 p-1 rounded-xl border border-white/10 w-full">
            {[
              // Real, API-backed tabs first — Casting Calls and Hiring Crew
              // are the only two with live data behind them.
              { id: 'calls', label: isRecruiter ? 'Manage Calls' : 'Casting Calls', icon: Briefcase },
              { id: 'crew', label: 'Hiring Crew', icon: Users },
              { id: 'post-job', label: 'Create Job Post', icon: Plus },
              { id: 'post-casting-call', label: 'Create Casting Call', icon: Plus },
              // { id: 'home', label: 'Home', icon: Home },
              // { id: 'matchmaking', label: 'AI Matchmaking', icon: Cpu },
              // { id: 'studio', label: 'Audition Studio', icon: Video },
              { id: 'network', label: 'Network', icon: Globe },
              { id: 'forum', label: 'Forum', icon: MessageCircle },
              // { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'workshops', label: 'Workshops', icon: BookOpen },
              { id: 'mentorship', label: 'Mentorship', icon: GraduationCap },
              // { id: 'events', label: 'Events', icon: Calendar },
              // { id: 'volunteer', label: 'Volunteer', icon: HeartHandshake },
              // { id: 'grants', label: 'Grants', icon: Award },
              // ...(isRecruiter ? [{ id: 'builder', label: 'AI Builder', icon: Zap }, { id: 'applications', label: 'Applications', icon: UserPlus }] : []),
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  if (tab.id === 'post-job') {
                    setView('post-job');
                    return;
                  }
                  if (tab.id === 'post-casting-call') {
                    setView('post-casting-call');
                    return;
                  }
                  handleTabClick(tab.id);
                }}
                className={cn(
                  "flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap",
                  view === tab.id ? "bg-gold text-black" : "text-white/60 hover:text-white"
                )}
              >
                <tab.icon size={16} /> <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {view === 'builder' && isRecruiter && (
          <motion.div
            key="builder"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2"><Zap className="text-gold" size={20} /> AI Casting Call Builder</h2>
              <p className="text-white/60 text-sm max-w-2xl">An AI-assisted way to draft a casting call — role requirements, budget, and description — instead of filling in every field by hand.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="relative glass-panel p-6">
                  <ComingSoonTag />
                  <ScaffoldRow className="h-32" />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {view === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-16"
          >
            {/* Trending & Featured — no live "trending"/"featured" API;
                the real live listing is the Casting Calls tab. */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <div className="flex justify-between items-end mb-8">
                  <h2 className="text-3xl font-bold flex items-center gap-3"><TrendingUp className="text-crimson" /> Trending Calls — Visit Our App</h2>
                  <button onClick={() => setView('calls')} className="text-gold text-sm font-bold uppercase tracking-widest hover:text-white transition-colors">View All</button>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-8">
                  <h2 className="text-3xl font-bold flex items-center gap-3"><Star className="text-gold" /> Featured Talent — Visit Our App</h2>
                  <button onClick={() => navigate('/talent')} className="text-gold text-sm font-bold uppercase tracking-widest hover:text-white transition-colors">View Directory</button>
                </div>
              </div>
            </div>

            {/* News & Events */}
            <div>
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3"><Calendar className="text-blue-400" /> Industry Events & News — Visit Our App</h2>
            </div>
          </motion.div>
        )}

        {/* Create Casting Call — its own tab/section, not folded into Manage
            Calls, so clicking the tab doesn't silently jump to a different
            section. POST /v1/casting-calls then submit-review. */}
        {view === 'post-casting-call' && (
          <motion.div key="post-casting-call" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <div className="flex items-center gap-2 mb-2">
              <Plus size={24} className="text-gold" />
              <h2 className="text-3xl font-bold">Create Casting Call — Visit Our App</h2>
            </div>
            <p className="text-white/60 max-w-3xl mb-6">Posting a new casting call directly from this page, going live immediately on Casting Calls.</p>
          </motion.div>
        )}

        {view === 'calls' && (
          <motion.div
            key="calls"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-400 flex items-center gap-2">
                  <ShieldCheck size={14} /> Live from SosrG
                </span>
              </div>

              {liveLoading && (
                <>
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="glass-panel h-40 animate-pulse" />
                  ))}
                </>
              )}

              {!liveLoading && liveError && (
                <div className="glass-panel p-8 text-center text-sm text-white/60">{liveError}</div>
              )}

              {!liveLoading && !liveError && liveCalls.length === 0 && (
                <div className="glass-panel p-8 text-center text-sm text-white/60">No open casting calls right now — check back soon.</div>
              )}

              {!liveLoading && !liveError && liveCalls.map((call) => (
                <div key={call.id} className="glass-panel overflow-hidden group hover:border-gold/30 transition-all">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="text-gold text-[10px] uppercase tracking-widest font-bold mb-1 block">{call.industry}</span>
                        <h3 className="text-2xl font-bold">{call.title}</h3>
                        <p className="text-white/50 text-base capitalize">{call.workMode} · {call.engagementType}</p>
                      </div>
                      <div className="text-right">
                        <div className="bg-crimson px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest">{call.status}</div>
                      </div>
                    </div>

                    <div className="mb-4 text-base text-white/80">
                      <p className="mb-2">{call.description}</p>
                      <div className="grid grid-cols-2 gap-2 text-base text-white/60">
                        <div className="flex items-center gap-2"><MapPin size={14} className="text-blue-400" /> PIN {call.pincode}</div>
                        <div className="flex items-center gap-2"><Wallet size={14} className="text-emerald-400" /> {formatCastingBudget(call)}</div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-base text-white/60 border-t border-white/5 pt-4">
                      <span className="flex items-center gap-2">
                        <Clock size={14} /> Apply by {new Date(call.applicationDeadline).toLocaleDateString()}
                      </span>
                      <button
                        onClick={() =>
                          openApplicationModal({
                            ...call,
                            location: `PIN ${call.pincode}`,
                            payment: formatCastingBudget(call),
                            __isLive: true,
                          })
                        }
                        className="bg-gold/10 text-gold hover:bg-gold hover:text-black px-4 py-2 rounded-lg font-bold transition-colors w-full sm:w-auto shrink-0"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-6">
              <div className="relative glass-panel p-6">
                <ComingSoonTag />
                <h3 className="font-bold mb-6 flex items-center gap-2">
                  {isRecruiter ? <Search size={18} className="text-crimson" /> : <Zap size={18} className="text-gold" />}
                  {isRecruiter ? 'Talent Search' : 'AI Smart Match'}
                </h3>
                <p className="text-base text-white/50 mb-6">
                  {isRecruiter
                    ? 'Search and filter the talent directory by sector, skill, and availability.'
                    : 'Roles matched to your actual profile and skills, ranked by fit.'}
                </p>
                <button disabled className="w-full border border-white/10 py-3 rounded-xl font-bold text-sm text-white/30 cursor-not-allowed">
                  {isRecruiter ? 'Advanced Talent Filter' : 'View AI Recommendations'}
                </button>
              </div>
              {/* <div className="relative glass-panel p-6">
                <ComingSoonTag />
                <h3 className="font-bold mb-6 flex items-center gap-2"><Award size={18} className="text-crimson" /> {isRecruiter ? 'Top Applicants' : 'Premium Casting'}</h3>
                <div className="space-y-3">
                  {[0, 1].map((i) => (
                    <ScaffoldRow key={i} className="h-12" />
                  ))}
                </div>
              </div> */}
            </div>
          </motion.div>
        )}

        {/* Post a Role — its own tab/section, not folded into Hiring Crew,
            so clicking the tab doesn't silently jump to a different section.
            POST /v1/job-posts then submit-review. Requires a Business-type
            profile server-side (verified live: a casting_director profile
            gets 403 PROFILE_NOT_ELIGIBLE). */}
        {view === 'post-job' && (
          <motion.div key="post-job" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <div className="flex items-center gap-2 mb-2">
              <Plus size={24} className="text-gold" />
              <h2 className="text-3xl font-bold">Post a Role — Visit Our App</h2>
            </div>
            <p className="text-white/60 max-w-3xl mb-6">Posting a new job role directly from this page, going live immediately for everyone browsing Find Jobs.</p>
          </motion.div>
        )}

        {view === 'crew' && (
          <motion.div
            key="crew"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2"><Users className="text-gold" size={20} /> Hiring Crew</h2>
                <p className="text-white/60 text-sm max-w-2xl">
                  Crew roles — camera, sound, editing, production — separate from on-camera casting calls.
                  Find Jobs is real; browsing crew professionals by specialty isn't built yet.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 w-fit">
                  {(['jobs', 'professionals'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setCrewMode(mode)}
                      className={cn(
                        "px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all",
                        crewMode === mode ? "bg-gold text-black" : "text-white/40 hover:text-white"
                      )}
                    >
                      {mode === 'jobs' ? 'Find Jobs' : 'Find Professionals'}
                    </button>
                  ))}
                </div>
                {isRecruiter && (
                  <button
                    onClick={() => setView('post-job')}
                    className="flex items-center gap-2 bg-gold text-black px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-yellow-500 transition-colors shrink-0"
                  >
                    <Plus size={14} /> Post a Role
                  </button>
                )}
              </div>
            </div>

            {crewMode === 'jobs' ? (
              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-400 flex items-center gap-2">
                  <ShieldCheck size={14} /> Live from SosrG
                </span>

                {liveJobsLoading && (
                  <>
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="glass-panel h-32 animate-pulse" />
                    ))}
                  </>
                )}

                {!liveJobsLoading && liveJobsError && (
                  <div className="glass-panel p-8 text-center text-sm text-white/60">{liveJobsError}</div>
                )}

                {!liveJobsLoading && !liveJobsError && liveJobs.length === 0 && (
                  <div className="glass-panel p-8 text-center text-sm text-white/60">No open crew roles right now — check back soon.</div>
                )}

                {!liveJobsLoading && !liveJobsError && liveJobs.map((job) => (
                  <div key={job.id} className="glass-panel p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="text-gold text-[10px] uppercase tracking-widest font-bold mb-1 block">{job.industry} · {job.employmentType.replace('_', ' ')}</span>
                        <h3 className="text-xl font-bold">{job.title}</h3>
                        <p className="text-white/50 text-base capitalize">{job.workMode} · {job.numberOfOpenings} opening{job.numberOfOpenings === 1 ? '' : 's'}</p>
                      </div>
                      <div className="bg-crimson px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest">{job.status}</div>
                    </div>
                    <p className="text-base text-white/80 mb-4 line-clamp-2">{job.description}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-base text-white/60 border-t border-white/5 pt-4">
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                        {job.pincode && <span className="flex items-center gap-2"><MapPin size={14} className="text-blue-400" /> PIN {job.pincode}</span>}
                        <span className="flex items-center gap-2"><Wallet size={14} className="text-emerald-400" /> {formatCastingBudget(job)}</span>
                        <span className="flex items-center gap-2"><Clock size={14} /> Apply by {new Date(job.applicationDeadline).toLocaleDateString()}</span>
                      </div>
                      <button
                        onClick={() =>
                          openApplicationModal({
                            ...job,
                            location: job.pincode ? `PIN ${job.pincode}` : job.workMode,
                            payment: formatCastingBudget(job),
                            __isLive: true,
                            __type: 'job',
                          })
                        }
                        className="bg-gold/10 text-gold hover:bg-gold hover:text-black px-4 py-2 rounded-lg font-bold transition-colors w-full sm:w-auto shrink-0"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="relative glass-panel p-6">
                    <ComingSoonTag />
                    <ScaffoldRow className="h-32" />
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {view === 'network' && (
          <motion.div key="network" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <div className="flex items-center gap-2 mb-2">
              <Globe size={24} className="text-gold" />
              <h2 className="text-3xl font-bold">Network — Visit Our App</h2>
            </div>
            <p className="text-white/60 max-w-3xl mb-6">A directory to connect directly with other casting-industry professionals — casting directors, crew, and fellow talent — beyond the general Community page.</p>
          </motion.div>
        )}

        {view === 'forum' && (
          <motion.div key="forum" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <div className="flex items-center gap-2 mb-2">
              <MessageCircle size={24} className="text-gold" />
              <h2 className="text-3xl font-bold">Forum — Visit Our App</h2>
            </div>
            <p className="text-white/60 max-w-3xl mb-6">Sector-specific discussion boards and direct messaging for casting and industry topics, separate from the general Community page.</p>
          </motion.div>
        )}

        {view === 'matchmaking' && (
          <motion.div
            key="matchmaking"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2"><Cpu className="text-gold" size={20} /> AI Matchmaking — Visit Our App</h2>
              <p className="text-white/60 text-sm max-w-2xl">Automatic matching between your profile and open roles, ranked by fit, so relevant casting calls surface without manual searching.</p>
            </div>
          </motion.div>
        )}

        {view === 'studio' && (
          <motion.div
            key="studio"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2"><Video className="text-gold" size={20} /> Audition Studio — Visit Our App</h2>
              <p className="text-white/60 text-sm max-w-2xl">Record and submit self-tape auditions directly on the platform, with take management, so casting directors can review submissions in one place.</p>
            </div>
          </motion.div>
        )}

        {view === 'applications' && isRecruiter && (
          <motion.div
            key="applications"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                  <UserPlus className="text-gold" size={20} /> Applicants
                  <span className="text-[9px] uppercase tracking-widest font-bold text-emerald-400">Live from SosrG</span>
                </h2>
                <p className="text-white/60 text-sm max-w-2xl">Review, shortlist, and manage everyone who applied to your posted casting calls.</p>
              </div>
              {reviewingCallId && (
                <button
                  onClick={() => { setReviewingCallId(null); setCallApplications(null); }}
                  className="text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white flex items-center gap-1"
                >
                  <ChevronRight size={14} className="rotate-180" /> Back to my calls
                </button>
              )}
            </div>

            {!reviewingCallId && (
              liveLoading ? (
                <div className="space-y-4">{[0, 1, 2].map((i) => <ScaffoldRow key={i} className="h-20" />)}</div>
              ) : myCastingCalls.length === 0 ? (
                <p className="text-sm text-white/30 italic">
                  You haven't posted a casting call yet — post one from "Manage Calls" to start reviewing applicants.
                </p>
              ) : (
                <div className="space-y-3">
                  {myCastingCalls.map((call) => (
                    <button
                      key={call.id}
                      onClick={() => setReviewingCallId(call.id)}
                      className="w-full flex items-center justify-between gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-gold/40 transition-colors text-left"
                    >
                      <div>
                        <div className="font-bold">{call.title}</div>
                        <div className="text-xs text-white/40">{call.industry} · {call.status}</div>
                      </div>
                      <ChevronRight size={18} className="text-white/30 shrink-0" />
                    </button>
                  ))}
                </div>
              )
            )}

            {reviewingCallId && (
              <>
                {callApplicationsLoading && (
                  <div className="space-y-4">{[0, 1, 2].map((i) => <ScaffoldRow key={i} className="h-24" />)}</div>
                )}
                {!callApplicationsLoading && callApplicationsError && (
                  <div className="flex items-center gap-2 text-xs text-white/40 bg-white/5 border border-white/10 rounded-xl p-3">
                    <AlertCircle size={14} className="text-white/30 shrink-0" /> {callApplicationsError}
                  </div>
                )}
                {!callApplicationsLoading && !callApplicationsError && (callApplications?.length ?? 0) === 0 && (
                  <p className="text-sm text-white/30 italic">No applications yet for this casting call.</p>
                )}
                {!callApplicationsLoading && (callApplications?.length ?? 0) > 0 && (
                  <div className="space-y-3">
                    {callApplications!.map((app) => {
                      const isTerminal = app.status === 'selected' || app.status === 'rejected';
                      return (
                        <div key={app.id} className="p-4 bg-white/5 rounded-xl border border-white/10">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <div>
                              <div className="font-bold">{app.applicant?.displayName ?? 'Applicant'}</div>
                              {app.applicant?.headline && <div className="text-xs text-white/40">{app.applicant.headline}</div>}
                              <div className="text-xs text-white/30 flex items-center gap-1.5 mt-1">
                                <Clock size={12} /> Applied {new Date(app.appliedAt).toLocaleDateString()}
                              </div>
                            </div>
                            <span className={cn(
                              'text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shrink-0',
                              app.status === 'selected' ? 'bg-emerald-500/15 text-emerald-400'
                              : app.status === 'shortlisted' ? 'bg-gold/15 text-gold'
                              : app.status === 'rejected' ? 'bg-red-500/15 text-red-400'
                              : 'bg-blue-500/15 text-blue-400',
                            )}>
                              {app.status.replace('_', ' ')}
                            </span>
                          </div>
                          {app.coverNote && <p className="text-sm text-white/60 mb-3">{app.coverNote}</p>}
                          {!isTerminal && (
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleUpdateApplicationStatus(app.id, 'shortlisted')}
                                disabled={updatingApplicationId === app.id}
                                className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest bg-gold/10 text-gold px-3 py-2 rounded-lg hover:bg-gold/20 transition-colors disabled:opacity-50"
                              >
                                <Star size={12} /> Shortlist
                              </button>
                              <button
                                onClick={() => handleUpdateApplicationStatus(app.id, 'selected')}
                                disabled={updatingApplicationId === app.id}
                                className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-400 px-3 py-2 rounded-lg hover:bg-emerald-500/20 transition-colors disabled:opacity-50"
                              >
                                <CheckCircle2 size={12} /> Select
                              </button>
                              <button
                                onClick={() => handleUpdateApplicationStatus(app.id, 'rejected')}
                                disabled={updatingApplicationId === app.id}
                                className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest bg-white/5 text-white/50 px-3 py-2 rounded-lg hover:bg-red-500/10 hover:text-red-400 transition-colors disabled:opacity-50"
                              >
                                <X size={12} /> Reject
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </motion.div>
        )}

        {view === 'workshops' && (
          <motion.div key="workshops" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <div className="flex items-center gap-2 mb-2">
              <BookOpen size={24} className="text-gold" />
              <h2 className="text-3xl font-bold">Workshops — Visit Our App</h2>
            </div>
            <p className="text-white/60 max-w-3xl mb-6">Skill-building workshops and masterclasses run by industry professionals, with registration and scheduling.</p>
          </motion.div>
        )}

        {view === 'mentorship' && (
          <motion.div key="mentorship" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap size={24} className="text-gold" />
              <h2 className="text-3xl font-bold">Mentorship — Visit Our App</h2>
            </div>
            <p className="text-white/60 max-w-3xl mb-6">Structured mentorship pairing with experienced industry professionals for career guidance.</p>
          </motion.div>
        )}

        {view === 'events' && (
          <motion.div
            key="events"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2"><Calendar className="text-gold" size={20} /> Events — Visit Our App</h2>
              <p className="text-white/60 text-sm max-w-2xl">Industry events, festivals, and networking meetups relevant to casting and hiring, with RSVP and calendar sync.</p>
            </div>
          </motion.div>
        )}

        {view === 'volunteer' && (
          <motion.div
            key="volunteer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2"><HeartHandshake className="text-gold" size={20} /> Volunteer — Visit Our App</h2>
              <p className="text-white/60 text-sm max-w-2xl">Volunteer opportunities on productions and community projects, for people building experience or credits.</p>
            </div>
          </motion.div>
        )}

        {view === 'grants' && (
          <motion.div
            key="grants"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2"><Award className="text-gold" size={20} /> Grants</h2>
              <p className="text-white/60 text-sm max-w-2xl">Funding and grant opportunities for independent productions and artists, with application tracking.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="relative glass-panel p-6">
                  <ComingSoonTag />
                  <ScaffoldRow className="h-32" />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {view === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2"><LayoutDashboard className="text-gold" size={20} /> Dashboard — Visit Our App</h2>
              <p className="text-white/60 text-sm max-w-2xl">An overview of your posted casting calls, applicants, and hiring activity in one place.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
