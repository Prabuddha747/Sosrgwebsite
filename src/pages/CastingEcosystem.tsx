import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Film,
  Theater,
  PenTool,
  Music,
  User,
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
  History,
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
  Image,
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
import type { CastingCall } from '../services/casting';
import { ApiError } from '../services/httpClient';
import { useToast } from '../design-system';
import { useAuth } from '../contexts/AuthContext';
import { profilesService } from '../services/profiles';
import { portfoliosService } from '../services/portfolios';
import type { Portfolio } from '../services/portfolios';
import { jobsService } from '../services/jobs';
import type { JobPost, JobWorkMode, JobCompensationType } from '../services/jobs';
import { ScaffoldRow, ComingSoonTag } from '../components/ScaffoldUI';
import { TALENT_CATEGORIES } from '../data/mockData';

const MIN_PASSWORD_LENGTH = 12;

// Real budget/status fields don't exist on the old CASTING_CALLS mock shape
// below — this formats the live API's minor-unit budget range into display
// text, used for both casting calls and job posts (same budget field shape).
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
  const [view, setView] = useState<'home' | 'register' | 'profile' | 'calls' | 'studio' | 'dashboard' | 'builder' | 'matchmaking' | 'crew' | 'applications' | 'network' | 'forum' | 'workshops' | 'mentorship' | 'events' | 'volunteer' | 'grants'>('calls');
  const [isRecruiter, setIsRecruiter] = useState(false);
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
  const [builderMode, setBuilderMode] = useState<'ai' | 'manual'>('ai');
  const [crewMode, setCrewMode] = useState<'jobs' | 'professionals'>('jobs');
  const [showJobPostModal, setShowJobPostModal] = useState(false);
  const [postingJob, setPostingJob] = useState(false);
  const [jobPostForm, setJobPostForm] = useState({
    title: '',
    industry: '',
    employmentType: 'full_time',
    workMode: 'onsite' as JobWorkMode,
    description: '',
    responsibilities: '',
    requirements: '',
    pincode: '',
    compensationType: 'paid' as JobCompensationType,
    budgetMin: '',
    budgetMax: '',
    numberOfOpenings: '1',
    applicationDeadline: '',
  });
  const [forumMode, setForumMode] = useState<'messages' | 'community'>('community');
  const [crewSector, setCrewSector] = useState('All Sectors');
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedCall, setSelectedCall] = useState<any>(null);
  const [coverNote, setCoverNote] = useState('');
  const [applying, setApplying] = useState(false);
  const { show } = useToast();
  const { user, profile: authProfile, register, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [switchingRole, setSwitchingRole] = useState(false);

  // Artist/Business is a real account setting, not just a local view
  // toggle — PATCH /v1/profiles/me/role actually switches the profile
  // (verified live, works from any starting profileType). Logged-out
  // visitors just get the local UI toggle since there's no profile to
  // switch yet.
  const handleRoleSwitch = async (nextIsRecruiter: boolean, silent = false) => {
    if (nextIsRecruiter === isRecruiter) return;
    setIsRecruiter(nextIsRecruiter);
    if (!user || !authProfile) return;
    setSwitchingRole(true);
    try {
      await profilesService.switchProfileRole({
        profileType: nextIsRecruiter ? 'industry_professional' : 'artist',
        professionId: authProfile.professions?.[0]?.id,
      });
      await refreshProfile();
      // The Create Job Post tab switches to Business as a side effect of
      // getting you to the form — no popup there, same as Bihar Untold's
      // tab click just opening its section without an announcement. The
      // explicit Artist/Business toggle still confirms the switch.
      if (!silent) {
        show(nextIsRecruiter ? 'Switched to Business — you can now post jobs and casting calls.' : 'Switched to Artist.', 'success');
      }
    } catch (err) {
      setIsRecruiter(!nextIsRecruiter);
      show(err instanceof ApiError ? err.message : 'Could not switch role.', 'error');
    } finally {
      setSwitchingRole(false);
    }
  };
  const location = useLocation();

  // Real registration form state (Register tab) — mirrors SignupPage's
  // logic exactly rather than the old local-only fake form.
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerError, setRegisterError] = useState<string>();
  const [registering, setRegistering] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (registerPassword.length < MIN_PASSWORD_LENGTH) {
      setRegisterError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
      return;
    }
    setRegisterError(undefined);
    setRegistering(true);
    try {
      await register(registerEmail, registerPassword);
      navigate('/profile/setup');
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Something went wrong. Please try again.';
      setRegisterError(message);
      show(message, 'error');
    } finally {
      setRegistering(false);
    }
  };

  // My Profile tab — real portfolio read (same live API as ProfileSystem's
  // Media Gallery); upload isn't built yet so stays a toast, same as there.
  const [myPortfolios, setMyPortfolios] = useState<Portfolio[] | null>(null);
  useEffect(() => {
    if (view !== 'profile' || !user) return;
    let cancelled = false;
    portfoliosService.listMyPortfolios().then((items) => {
      if (!cancelled) setMyPortfolios(items);
    }).catch(() => {
      if (!cancelled) setMyPortfolios([]);
    });
    return () => {
      cancelled = true;
    };
  }, [view, user]);

  // Everything except Home, Register, and the live Casting Calls listing
  // requires an account — send a logged-out visitor to create a profile
  // instead of switching to a tab that's meaningless without one.
  const PUBLIC_TABS = new Set(['home', 'register', 'calls']);
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

  // Live casting calls — the "Casting Calls" tab below is the only part of
  // this page wired to the real API; every other tab still uses the fake
  // CASTING_CALLS array further down (Home preview, AI Matchmaking).
  const [liveCalls, setLiveCalls] = useState<CastingCall[]>([]);
  const [liveLoading, setLiveLoading] = useState(true);
  const [liveError, setLiveError] = useState<string | null>(null);

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
  }, []);

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

  const handleCreateJobPost = async () => {
    if (!user) {
      setShowJobPostModal(false);
      navigate('/login', { state: { from: location } });
      return;
    }
    const f = jobPostForm;
    if (!f.title || !f.industry || !f.description || !f.applicationDeadline) {
      show('Title, industry, description, and application deadline are required.', 'error');
      return;
    }
    setPostingJob(true);
    try {
      const created = await jobsService.createJobPost({
        title: f.title,
        industry: f.industry,
        employmentType: f.employmentType,
        workMode: f.workMode,
        description: f.description,
        applicationDeadline: new Date(f.applicationDeadline).toISOString(),
        responsibilities: f.responsibilities || undefined,
        requirements: f.requirements || undefined,
        pincode: f.pincode || undefined,
        compensationType: f.compensationType,
        budgetMinMinor: f.budgetMin ? Math.round(Number(f.budgetMin) * 100) : undefined,
        budgetMaxMinor: f.budgetMax ? Math.round(Number(f.budgetMax) * 100) : undefined,
        numberOfOpenings: f.numberOfOpenings ? Number(f.numberOfOpenings) : undefined,
      });
      await jobsService.submitJobPostForReview(created.id);
      show('Role posted and live.', 'success');
      setShowJobPostModal(false);
      setJobPostForm({
        title: '', industry: '', employmentType: 'full_time', workMode: 'onsite', description: '',
        responsibilities: '', requirements: '', pincode: '', compensationType: 'paid',
        budgetMin: '', budgetMax: '', numberOfOpenings: '1', applicationDeadline: '',
      });
      setJobPostsRefreshKey((k) => k + 1);
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        setShowJobPostModal(false);
        show('Your session expired — please sign in again.', 'error');
        navigate('/login', { state: { from: location } });
        return;
      }
      if (err instanceof ApiError && err.code === 'PROFILE_NOT_ELIGIBLE') {
        show('Your account type can\'t post jobs — this requires a Business profile.', 'error');
        return;
      }
      show(err instanceof ApiError ? err.message : 'Could not post the role.', 'error');
    } finally {
      setPostingJob(false);
    }
  };

  const handleSubmitApplication = async () => {
    if (!selectedCall) return;
    if (!selectedCall.__isLive) {
      // Old decorative flow, unchanged — Matchmaking's "Apply Now" reuses
      // this same modal against fake data with no live endpoint behind it.
      alert('Application submitted successfully!');
      setShowApplicationModal(false);
      return;
    }
    setApplying(true);
    try {
      if (selectedCall.__type === 'job') {
        await jobsService.applyToJobPost(selectedCall.id, { coverNote: coverNote || undefined });
      } else {
        await castingService.applyToCastingCall(selectedCall.id, { coverNote: coverNote || undefined });
      }
      show('Application submitted.', 'success');
      setShowApplicationModal(false);
      setCoverNote('');
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

  const CASTING_CALLS = [
    { id: 1, title: 'Epic Period Drama', house: 'Dharma Productions', roles: 5, type: 'Cinema', status: 'Active', image: 'https://picsum.photos/seed/bollywood-set/800/400', fitScore: 94, budgetMatch: 'High', description: 'Looking for lead and supporting actors for a big-budget historical epic set in the 18th century.', requirements: ['Fluent in Hindi and Urdu', 'Horse riding skills preferred', 'Age 25-40'], location: 'Mumbai & Rajasthan', payment: '₹50,000 - ₹2,00,000 per day', auditionDetails: 'In-person auditions starting next week. Please submit a 2-minute dramatic monologue.' },
    { id: 2, title: 'Broadway Style Musical', house: 'National Theatre', roles: 12, type: 'Theatre', status: 'Urgent', image: 'https://picsum.photos/seed/theatre-stage/800/400', fitScore: 88, budgetMatch: 'Medium', description: 'Casting singers and dancers for a modern adaptation of a classic musical.', requirements: ['Strong vocal range (Tenor/Soprano)', 'Trained in Jazz or Contemporary dance'], location: 'New Delhi', payment: '₹1,00,000 for the entire run', auditionDetails: 'Video submissions required for the first round. Include one song and one dance routine.' },
    { id: 3, title: 'Classical Dance Documentary', house: 'National Film Board', roles: 2, type: 'Dance', status: 'Active', image: 'https://picsum.photos/seed/odissi-dance/800/400', fitScore: 75, budgetMatch: 'Low', description: 'Seeking trained Odissi dancers for a documentary exploring the roots of Indian classical dance.', requirements: ['Minimum 5 years of formal training in Odissi', 'Expressive face and strong rhythm'], location: 'Bhubaneswar', payment: '₹20,000 per day', auditionDetails: 'Submit a 5-minute performance video showcasing different mudras and expressions.' },
    { id: 4, title: 'Audiobook Narration', house: 'Penguin Audio', roles: 1, type: 'Literature', status: 'Active', image: 'https://picsum.photos/seed/audiobook/800/400', fitScore: 91, budgetMatch: 'High', description: 'Looking for a voice actor to narrate a bestselling fantasy novel.', requirements: ['Clear diction and ability to do multiple character voices', 'Home studio setup preferred'], location: 'Remote', payment: '₹5,000 per finished hour', auditionDetails: 'Submit a 3-minute voice reel demonstrating different character voices.' },
    { id: 5, title: 'Lead Vocalist for Indie Band', house: 'SoundWave Records', roles: 1, type: 'Music', status: 'Urgent', image: 'https://picsum.photos/seed/indie-band/800/400', fitScore: 85, budgetMatch: 'Medium', description: 'An established indie rock band is looking for a new lead vocalist to join them for an upcoming tour and album recording.', requirements: ['Strong stage presence', 'Ability to write lyrics is a plus', 'Age 20-35'], location: 'Bengaluru', payment: 'Profit sharing + Tour allowance', auditionDetails: 'Live auditions at SoundWave Studios this weekend. Prepare two original songs.' },
    { id: 6, title: 'Handloom Fashion Show Models', house: 'Crafts Council', roles: 10, type: 'Crafts', status: 'Active', image: 'https://picsum.photos/seed/handloom/800/400', fitScore: 78, budgetMatch: 'Low', description: 'Casting models for a fashion show highlighting traditional Indian handloom textiles and artisanal crafts.', requirements: ['Height: 5\'8" and above (Female), 6\'0" and above (Male)', 'Comfortable walking in traditional attire'], location: 'Hyderabad', payment: '₹15,000 per show', auditionDetails: 'Walk-in auditions on Friday. Please bring your portfolio.' },
  ];

  return (
    <div className="pt-32 px-6 max-w-[1600px] mx-auto min-h-screen pb-24">
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

              <div className="space-y-6">
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <h3 className="font-bold mb-2 text-sm">Role Details</h3>
                  <p className="text-xs text-white/60 mb-2">{selectedCall.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs text-white/60">
                    <div className="flex items-center gap-2"><MapPin size={14} className="text-blue-400" /> {selectedCall.location}</div>
                    <div className="flex items-center gap-2"><Wallet size={14} className="text-emerald-400" /> {selectedCall.payment}</div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-white/60 block mb-2">Select Portfolio Items to Include</label>
                  {selectedCall.__isLive && (
                    <p className="text-[11px] text-white/40 mb-3">
                      Coming soon — the Media/Portfolios API is live, but attaching portfolio items to an application isn't wired up here yet. Your cover note below is still submitted for real.
                    </p>
                  )}
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 transition-colors">
                      <input type="checkbox" className="accent-gold" defaultChecked />
                      <span className="text-sm font-bold">Main Headshot</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 transition-colors">
                      <input type="checkbox" className="accent-gold" defaultChecked />
                      <span className="text-sm font-bold">Full Body Shot</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 transition-colors">
                      <input type="checkbox" className="accent-gold" defaultChecked />
                      <span className="text-sm font-bold">Dramatic Monologue Reel</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 transition-colors">
                      <input type="checkbox" className="accent-gold" />
                      <span className="text-sm font-bold">Dance Reel</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-white/60 block mb-2">Upload Specific Audition Video (Optional)</label>
                  <div className="border border-dashed border-white/20 rounded-xl p-8 text-center bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                    <Upload size={24} className="mx-auto mb-2 text-white/40" />
                    <p className="text-sm font-bold mb-1">Click to upload or drag and drop</p>
                    <p className="text-xs text-white/40">MP4, MOV up to 500MB</p>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-white/60 block mb-2">Cover Letter / Note</label>
                  <textarea
                    className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-gold min-h-[100px]"
                    placeholder="Briefly explain why you are a great fit for this role..."
                    value={coverNote}
                    onChange={(e) => setCoverNote(e.target.value)}
                  ></textarea>
                </div>

                <div className="flex gap-4 pt-4">
                  <button onClick={() => setShowApplicationModal(false)} className="flex-1 py-4 bg-white/5 hover:bg-white/10 rounded-xl font-bold uppercase tracking-widest text-sm transition-colors">
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitApplication}
                    disabled={applying}
                    className="flex-1 py-4 bg-gold text-black hover:bg-yellow-500 rounded-xl font-bold uppercase tracking-widest text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {applying ? 'Submitting…' : 'Submit Application'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Post a Role Modal — POST /v1/job-posts then POST .../submit-review.
          Requires a Business-type profile server-side (verified live: a
          casting_director profile gets 403 PROFILE_NOT_ELIGIBLE). */}
      <AnimatePresence>
        {showJobPostModal && (
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
                  <h2 className="text-3xl font-bold mb-2">Post a Role</h2>
                  <p className="text-white/60 text-sm">Goes live immediately after posting — real listing, visible to everyone browsing Find Jobs.</p>
                </div>
                <button onClick={() => setShowJobPostModal(false)} className="text-white/40 hover:text-white p-2">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-white/60 block mb-2">Role Title *</label>
                    <input
                      type="text"
                      value={jobPostForm.title}
                      onChange={(e) => setJobPostForm((f) => ({ ...f, title: e.target.value }))}
                      placeholder="e.g. Senior Cinematographer"
                      className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-white/60 block mb-2">Industry *</label>
                    <select
                      value={jobPostForm.industry}
                      onChange={(e) => setJobPostForm((f) => ({ ...f, industry: e.target.value }))}
                      className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-gold"
                    >
                      <option value="">Select industry</option>
                      {TALENT_CATEGORIES.map((cat) => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-white/60 block mb-2">Employment Type *</label>
                    <select
                      value={jobPostForm.employmentType}
                      onChange={(e) => setJobPostForm((f) => ({ ...f, employmentType: e.target.value }))}
                      className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-gold"
                    >
                      <option value="full_time">Full-time</option>
                      <option value="part_time">Part-time</option>
                      <option value="contract">Contract</option>
                      <option value="freelance">Freelance</option>
                      <option value="internship">Internship</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-white/60 block mb-2">Work Mode *</label>
                    <select
                      value={jobPostForm.workMode}
                      onChange={(e) => setJobPostForm((f) => ({ ...f, workMode: e.target.value as JobWorkMode }))}
                      className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-gold"
                    >
                      <option value="onsite">On-site</option>
                      <option value="hybrid">Hybrid</option>
                      <option value="remote">Remote</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-white/60 block mb-2">Description *</label>
                  <textarea
                    value={jobPostForm.description}
                    onChange={(e) => setJobPostForm((f) => ({ ...f, description: e.target.value }))}
                    placeholder="What's this role, and what's the project?"
                    className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-gold min-h-[80px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-white/60 block mb-2">Responsibilities</label>
                    <textarea
                      value={jobPostForm.responsibilities}
                      onChange={(e) => setJobPostForm((f) => ({ ...f, responsibilities: e.target.value }))}
                      className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-gold min-h-[70px]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-white/60 block mb-2">Requirements</label>
                    <textarea
                      value={jobPostForm.requirements}
                      onChange={(e) => setJobPostForm((f) => ({ ...f, requirements: e.target.value }))}
                      className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-gold min-h-[70px]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-white/60 block mb-2">PIN Code</label>
                    <input
                      type="text"
                      value={jobPostForm.pincode}
                      onChange={(e) => setJobPostForm((f) => ({ ...f, pincode: e.target.value }))}
                      className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-white/60 block mb-2">Openings</label>
                    <input
                      type="number"
                      min={1}
                      value={jobPostForm.numberOfOpenings}
                      onChange={(e) => setJobPostForm((f) => ({ ...f, numberOfOpenings: e.target.value }))}
                      className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-gold"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/60 block mb-2">Application Deadline *</label>
                    <input
                      type="date"
                      value={jobPostForm.applicationDeadline}
                      onChange={(e) => setJobPostForm((f) => ({ ...f, applicationDeadline: e.target.value }))}
                      className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-white/60 block mb-2">Compensation</label>
                  <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 w-fit mb-3">
                    {(['paid', 'unpaid', 'negotiable'] as JobCompensationType[]).map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setJobPostForm((f) => ({ ...f, compensationType: c }))}
                        className={cn(
                          "px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all capitalize",
                          jobPostForm.compensationType === c ? "bg-gold text-black" : "text-white/40 hover:text-white"
                        )}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                  {jobPostForm.compensationType === 'paid' && (
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="number"
                        placeholder="Min (₹)"
                        value={jobPostForm.budgetMin}
                        onChange={(e) => setJobPostForm((f) => ({ ...f, budgetMin: e.target.value }))}
                        className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-gold"
                      />
                      <input
                        type="number"
                        placeholder="Max (₹)"
                        value={jobPostForm.budgetMax}
                        onChange={(e) => setJobPostForm((f) => ({ ...f, budgetMax: e.target.value }))}
                        className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-gold"
                      />
                    </div>
                  )}
                </div>

                <div className="flex gap-4 pt-2">
                  <button onClick={() => setShowJobPostModal(false)} className="flex-1 py-4 bg-white/5 hover:bg-white/10 rounded-xl font-bold uppercase tracking-widest text-sm transition-colors">
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateJobPost}
                    disabled={postingJob}
                    className="flex-1 py-4 bg-gold text-black hover:bg-yellow-500 rounded-xl font-bold uppercase tracking-widest text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {postingJob ? 'Posting…' : 'Post Role'}
                  </button>
                </div>
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
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-serif italic mb-4">Casting <span className="vibrant-text-2">& Hiring</span></h1>
          <p className="text-white/70 mb-2">
            Open casting calls, applying to them, and building the profile casting directors see —
            plus, eventually, crew hiring, audition tools, and industry networking, all in one hub.
          </p>
          <p className="text-white/40 text-sm">
            Casting Calls is real and pulls live listings. Most of the other tabs below (Hiring Crew,
            AI Matchmaking, Audition Studio, Network, Forum, Workshops, and more) are still under
            development — look around and see what's coming.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button onClick={() => setView('register')} className="bg-gold text-black px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-yellow-500 transition-colors">Join as Talent</button>
            <button onClick={() => setView('calls')} className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">Browse Casting Calls</button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 w-full">
          {/* Artist/Business — a real account switch (PATCH /v1/profiles/me/role),
              styled like the Creator/Business pill toggle on the Profile page
              instead of the old slider. "Recruiter" is gone — profileType
              'business'/'industry_professional' is what the backend actually
              checks, so the label now matches the concept it controls. */}
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
            {([false, true] as const).map((recruiterValue) => (
              <button
                key={String(recruiterValue)}
                onClick={() => handleRoleSwitch(recruiterValue)}
                disabled={switchingRole}
                className={cn(
                  "px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all disabled:opacity-50",
                  isRecruiter === recruiterValue ? "bg-gold text-black" : "text-white/40 hover:text-white"
                )}
              >
                {recruiterValue ? 'Business' : 'Artist'}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-1 bg-white/5 p-1 rounded-xl border border-white/10 w-full">
            {[
              // Real, API-backed tabs first — Casting Calls and Hiring Crew
              // are the only two with live data behind them.
              { id: 'calls', label: isRecruiter ? 'Manage Calls' : 'Casting Calls', icon: Briefcase },
              { id: 'crew', label: 'Hiring Crew', icon: Users },
              { id: 'post-job', label: 'Create Job Post', icon: Plus },
              { id: 'home', label: 'Home', icon: Home },
              { id: 'register', label: 'Register', icon: UserPlus },
              { id: 'profile', label: 'My Profile', icon: User },
              { id: 'matchmaking', label: 'AI Matchmaking', icon: Cpu },
              { id: 'studio', label: 'Audition Studio', icon: Video },
              { id: 'network', label: 'Network', icon: Globe },
              { id: 'forum', label: 'Forum', icon: MessageCircle },
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'workshops', label: 'Workshops', icon: BookOpen },
              { id: 'mentorship', label: 'Mentorship', icon: GraduationCap },
              { id: 'events', label: 'Events', icon: Calendar },
              { id: 'volunteer', label: 'Volunteer', icon: HeartHandshake },
              { id: 'grants', label: 'Grants', icon: Award },
              ...(isRecruiter ? [{ id: 'builder', label: 'AI Builder', icon: Zap }, { id: 'applications', label: 'Applications', icon: UserPlus }] : []),
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  if (tab.id === 'post-job') {
                    if (!user) {
                      navigate('/signup', { state: { from: location } });
                      return;
                    }
                    if (!isRecruiter) handleRoleSwitch(true, true);
                    setCrewMode('jobs');
                    setView('crew');
                    setShowJobPostModal(true);
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
            {/* Trending & Featured — CASTING_CALLS/FEATURED_TALENT below are
                decorative mock arrays with no live "trending"/"featured"
                API; the real live listing is the Casting Calls tab. */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <div className="flex justify-between items-end mb-8">
                  <h2 className="text-3xl font-bold flex items-center gap-3"><TrendingUp className="text-crimson" /> Trending Calls</h2>
                  <button onClick={() => setView('calls')} className="text-gold text-sm font-bold uppercase tracking-widest hover:text-white transition-colors">View All</button>
                </div>
                <div className="space-y-4">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="relative glass-panel p-4">
                      <ComingSoonTag />
                      <ScaffoldRow className="h-20" />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-8">
                  <h2 className="text-3xl font-bold flex items-center gap-3"><Star className="text-gold" /> Featured Talent</h2>
                  <button onClick={() => navigate('/talent')} className="text-gold text-sm font-bold uppercase tracking-widest hover:text-white transition-colors">View Directory</button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="relative glass-panel p-4">
                      <ComingSoonTag />
                      <ScaffoldRow className="w-16 h-16 rounded-full mx-auto mb-3" />
                      <ScaffoldRow className="h-4" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* News & Events */}
            <div>
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3"><Calendar className="text-blue-400" /> Industry Events & News</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="relative glass-panel p-4">
                    <ComingSoonTag />
                    <ScaffoldRow className="h-40 mb-4" />
                    <ScaffoldRow className="h-4" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {view === 'register' && (
          <motion.div
            key="register"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-md mx-auto"
          >
            {user ? (
              <div className="glass-panel-blue p-8 md:p-12 text-center">
                <ShieldCheck className="mx-auto mb-4 text-gold" size={32} />
                <h2 className="text-2xl font-bold mb-2">You're already registered</h2>
                <p className="text-white/60 text-sm mb-6">Head to My Profile to see and edit your details.</p>
                <button
                  onClick={() => setView('profile')}
                  className="bg-gold text-black px-6 py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-yellow-500 transition-colors"
                >
                  Go to My Profile
                </button>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="glass-panel-blue p-8 md:p-12">
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold mb-4">Join the Ecosystem</h2>
                  <p className="text-white/60">Create your account, then set up the profile casting directors and crew see.</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-white/60 block mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-gold"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-white/60 block mb-2">Password</label>
                    <input
                      type="password"
                      required
                      minLength={MIN_PASSWORD_LENGTH}
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-gold"
                      placeholder={`At least ${MIN_PASSWORD_LENGTH} characters`}
                    />
                  </div>

                  {registerError && <p className="text-crimson text-sm">{registerError}</p>}

                  <button
                    type="submit"
                    disabled={registering}
                    className="w-full bg-gold text-black py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-yellow-500 transition-colors mt-8 disabled:opacity-50"
                  >
                    {registering ? 'Creating account…' : 'Create Account'}
                  </button>

                  <p className="text-center text-xs text-white/40 mt-4">
                    Already have an account?{' '}
                    <button type="button" onClick={() => navigate('/login', { state: { from: location } })} className="text-gold hover:underline">
                      Log in
                    </button>
                    . By registering, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        )}

        {view === 'profile' && (
          <motion.div
            key="profile"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Same real profile data as My Profile → Profile Details /
                Actor-Model on the main profile page (useAuth's profile) —
                not a second, separately-maintained fake profile. */}
            <div className="glass-panel-pink p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-gold/20 to-crimson/20"></div>
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-end mt-12">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full border-4 border-black bg-white/10 flex items-center justify-center text-3xl font-bold text-white/40">
                    {authProfile?.displayName?.charAt(0)?.toUpperCase() ?? '?'}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-3xl font-bold mb-1">{authProfile?.displayName ?? 'Your name'}</h2>
                      <p className="text-gold font-bold uppercase tracking-widest text-sm mb-2">
                        {authProfile?.professions?.[0]?.name ?? authProfile?.profileType ?? 'Profession not set'}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-white/60">
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {[authProfile?.district, authProfile?.state].filter(Boolean).join(', ') || 'Location not set'}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => navigate('/profile')} className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-bold transition-colors">Edit Profile</button>
                      <button onClick={() => show('Sharing a public portfolio link is coming soon.', 'info')} className="bg-white/5 border border-white/10 text-white/40 px-4 py-2 rounded-lg text-sm font-bold cursor-not-allowed">Share Portfolio</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="space-y-8">
                <div className="relative glass-panel p-6">
                  <button onClick={() => navigate('/profile')} className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-widest text-gold hover:underline">Edit</button>
                  <h3 className="font-bold mb-4 flex items-center gap-2"><User size={18} className="text-gold" /> About Me</h3>
                  {authProfile?.bio ? (
                    <p className="text-sm text-white/60 leading-relaxed">{authProfile.bio}</p>
                  ) : (
                    <p className="text-sm text-white/30 italic">No bio yet — add one from Edit Profile.</p>
                  )}
                </div>

                <div className="relative glass-panel p-6">
                  <button onClick={() => navigate('/profile')} className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-widest text-gold hover:underline">Edit</button>
                  <h3 className="font-bold mb-4 flex items-center gap-2"><Briefcase size={18} className="text-blue-400" /> Skills & Attributes</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2">Languages</h4>
                      {authProfile?.languages?.length ? (
                        <div className="flex flex-wrap gap-2">
                          {authProfile.languages.map(lang => (
                            <span key={lang.code} className="bg-white/5 px-3 py-1 rounded-full text-xs border border-white/10">{lang.name}</span>
                          ))}
                        </div>
                      ) : <p className="text-xs text-white/30 italic">None added yet.</p>}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2">Skills</h4>
                      {authProfile?.skills?.length ? (
                        <div className="flex flex-wrap gap-2">
                          {authProfile.skills.map(skill => (
                            <span key={skill.id} className="bg-white/5 px-3 py-1 rounded-full text-xs border border-white/10">{skill.name}</span>
                          ))}
                        </div>
                      ) : <p className="text-xs text-white/30 italic">None added yet.</p>}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2">Physical Attributes</h4>
                      <ul className="text-sm text-white/60 space-y-1">
                        <li>Height: {authProfile?.details?.heightCm ? `${authProfile.details.heightCm} cm` : 'xx'}</li>
                        <li>Weight: {authProfile?.details?.weightKg ? `${authProfile.details.weightKg} kg` : 'xx'}</li>
                        <li>Eye Color: {authProfile?.details?.eyeColor ?? 'xx'}</li>
                        <li>Hair: {authProfile?.details?.hairColor ?? 'xx'}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-8">
                {/* Media Gallery — real, live portfolios API (same one My
                    Profile → Profile Details uses); upload isn't built yet,
                    so that stays a toast rather than a fake success state. */}
                <div className="relative glass-panel p-6">
                  <span className="absolute top-4 right-4 text-[9px] uppercase tracking-widest font-bold text-emerald-400">Live from SosrG</span>
                  <h3 className="font-bold mb-4 flex items-center gap-2"><Image size={18} className="text-emerald-400" /> Media Gallery</h3>
                  {myPortfolios === null && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                      {[0, 1, 2].map((i) => (
                        <ScaffoldRow key={i} className="aspect-square" />
                      ))}
                    </div>
                  )}
                  {myPortfolios?.length === 0 && (
                    <p className="text-sm text-white/30 italic mb-4">No portfolio yet — this is where your photos, reels, and showreels will show up.</p>
                  )}
                  {myPortfolios && myPortfolios.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      {myPortfolios.map((p) => (
                        <div key={p.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                          <span className="text-sm font-medium">{p.title}</span>
                          <span className="text-[9px] uppercase tracking-widest text-white/40">{p.visibility}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <button
                    onClick={() => show("Uploading media here is coming soon — this can't be edited yet.", 'info')}
                    className="w-full border border-dashed border-white/20 flex items-center justify-center gap-2 text-white/40 hover:text-white hover:border-white/40 transition-colors rounded-xl h-16 text-xs font-bold"
                  >
                    <Upload size={16} /> Upload your media
                  </button>
                </div>

                <div className="relative glass-panel p-6">
                  <ComingSoonTag />
                  <h3 className="font-bold mb-2 flex items-center gap-2"><History size={18} className="text-purple-400" /> Experience & Projects</h3>
                  <p className="text-xs text-white/60 mb-6">
                    A real, structured work history — past roles, projects, and years — pulled from your
                    actual bookings instead of typed in freehand.
                  </p>
                  <div className="space-y-4">
                    {[0, 1, 2].map((i) => (
                      <ScaffoldRow key={i} className="h-16" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
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
                        <p className="text-white/40 text-sm capitalize">{call.workMode} · {call.engagementType}</p>
                      </div>
                      <div className="text-right">
                        <div className="bg-crimson px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest">{call.status}</div>
                      </div>
                    </div>

                    <div className="mb-4 text-sm text-white/80">
                      <p className="mb-2">{call.description}</p>
                      <div className="grid grid-cols-2 gap-2 text-xs text-white/60">
                        <div className="flex items-center gap-2"><MapPin size={14} className="text-blue-400" /> PIN {call.pincode}</div>
                        <div className="flex items-center gap-2"><Wallet size={14} className="text-emerald-400" /> {formatCastingBudget(call)}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-white/60 border-t border-white/5 pt-4">
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
                        className="bg-gold/10 text-gold hover:bg-gold hover:text-black px-4 py-2 rounded-lg font-bold transition-colors"
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
                <p className="text-sm text-white/40 mb-6">
                  {isRecruiter
                    ? 'Search and filter the talent directory by sector, skill, and availability.'
                    : 'Roles matched to your actual profile and skills, ranked by fit.'}
                </p>
                <button disabled className="w-full border border-white/10 py-3 rounded-xl font-bold text-sm text-white/30 cursor-not-allowed">
                  {isRecruiter ? 'Advanced Talent Filter' : 'View AI Recommendations'}
                </button>
              </div>
              <div className="relative glass-panel p-6">
                <ComingSoonTag />
                <h3 className="font-bold mb-6 flex items-center gap-2"><Award size={18} className="text-crimson" /> {isRecruiter ? 'Top Applicants' : 'Premium Casting'}</h3>
                <div className="space-y-3">
                  {[0, 1].map((i) => (
                    <ScaffoldRow key={i} className="h-12" />
                  ))}
                </div>
              </div>
            </div>
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
                    onClick={() => setShowJobPostModal(true)}
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
                        <p className="text-white/40 text-sm capitalize">{job.workMode} · {job.numberOfOpenings} opening{job.numberOfOpenings === 1 ? '' : 's'}</p>
                      </div>
                      <div className="bg-crimson px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest">{job.status}</div>
                    </div>
                    <p className="text-sm text-white/80 mb-4 line-clamp-2">{job.description}</p>
                    <div className="flex items-center justify-between text-xs text-white/60 border-t border-white/5 pt-4">
                      <div className="flex items-center gap-4">
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
                        className="bg-gold/10 text-gold hover:bg-gold hover:text-black px-4 py-2 rounded-lg font-bold transition-colors"
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
          <motion.div
            key="network"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2"><Globe className="text-gold" size={20} /> Network</h2>
              <p className="text-white/60 text-sm max-w-2xl">A directory to connect directly with other casting-industry professionals — casting directors, crew, and fellow talent — beyond the general Community page.</p>
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

        {view === 'forum' && (
          <motion.div
            key="forum"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2"><MessageCircle className="text-gold" size={20} /> Forum</h2>
              <p className="text-white/60 text-sm max-w-2xl">Sector-specific discussion boards and direct messaging for casting and industry topics, separate from the general Community page.</p>
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

        {view === 'matchmaking' && (
          <motion.div
            key="matchmaking"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2"><Cpu className="text-gold" size={20} /> AI Matchmaking</h2>
              <p className="text-white/60 text-sm max-w-2xl">Automatic matching between your profile and open roles, ranked by fit, so relevant casting calls surface without manual searching.</p>
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

        {view === 'studio' && (
          <motion.div
            key="studio"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2"><Video className="text-gold" size={20} /> Audition Studio</h2>
              <p className="text-white/60 text-sm max-w-2xl">Record and submit self-tape auditions directly on the platform, with take management, so casting directors can review submissions in one place.</p>
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

        {view === 'applications' && isRecruiter && (
          <motion.div
            key="applications"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2"><UserPlus className="text-gold" size={20} /> Applicants</h2>
              <p className="text-white/60 text-sm max-w-2xl">A dashboard to review, shortlist, and manage everyone who applied to your posted casting calls.</p>
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

        {view === 'workshops' && (
          <motion.div
            key="workshops"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2"><BookOpen className="text-gold" size={20} /> Workshops</h2>
              <p className="text-white/60 text-sm max-w-2xl">Skill-building workshops and masterclasses run by industry professionals, with registration and scheduling.</p>
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

        {view === 'mentorship' && (
          <motion.div
            key="mentorship"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2"><GraduationCap className="text-gold" size={20} /> Mentorship</h2>
              <p className="text-white/60 text-sm max-w-2xl">Structured mentorship pairing with experienced industry professionals for career guidance.</p>
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

        {view === 'events' && (
          <motion.div
            key="events"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2"><Calendar className="text-gold" size={20} /> Events</h2>
              <p className="text-white/60 text-sm max-w-2xl">Industry events, festivals, and networking meetups relevant to casting and hiring, with RSVP and calendar sync.</p>
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

        {view === 'volunteer' && (
          <motion.div
            key="volunteer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2"><HeartHandshake className="text-gold" size={20} /> Volunteer</h2>
              <p className="text-white/60 text-sm max-w-2xl">Volunteer opportunities on productions and community projects, for people building experience or credits.</p>
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
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2"><LayoutDashboard className="text-gold" size={20} /> Dashboard</h2>
              <p className="text-white/60 text-sm max-w-2xl">An overview of your posted casting calls, applicants, and hiring activity in one place.</p>
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
      </AnimatePresence>
    </div>
  );
};
