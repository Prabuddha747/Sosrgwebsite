import React, { useState, useEffect } from 'react';
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
import type { Section, ProfileType, ExperienceLevel } from '../types';
import { ProfileSetupFlow } from '../components/profile/ProfileSetupFlow';
import { useToast } from '../design-system';
import { useAuth } from '../contexts/AuthContext';
import { profilesService } from '../services/profiles';
import type { ContactVisibility, PortfolioVisibility } from '../services/profiles';
import { authService } from '../services/auth';
import type { AuthSession } from '../services/auth';
import { messagingService } from '../services/messaging';
import type { Conversation } from '../services/messaging';
import { portfoliosService } from '../services/portfolios';
import type { Portfolio } from '../services/portfolios';
import { ApiError } from '../services/httpClient';
import { ScaffoldRow, ComingSoonTag } from '../components/ScaffoldUI';
import { HoverGlowPanel } from '../components/ui/hover-effect';
import { BiharDocumentaryRegistration } from './BiharDocumentaryRegistration';

// Small honest placeholder for header fields this dashboard's mock data
// invents (platform ID, rating, industry tags, Green ID) but the live
// profile API doesn't return — used wherever realProfile has no value for a
// field the old mock always filled in. Takes a specific description instead
// of a bare "Missing info" so it reads like the Profile Details tab's hints.
const MissingInfo = ({ text = 'Not set yet' }: { text?: string }) => (
  <span className="bg-white/5 border border-white/10 border-dashed px-2 py-1 rounded text-[10px] text-white/40 italic">
    {text}
  </span>
);

export interface ProfileSystemRealData {
  displayName: string;
  profileType: string;
  district?: string;
  state?: string;
}

// A labeled profile field that shows the real value when present, or — when
// empty — a short description of what the field is for instead of leaving
// blank space. Used throughout Profile Details wherever real API data now
// backs a field the old mock always filled in.
const ProfileField = ({ label, value, hint }: { label: string; value?: string | null; hint: string }) => (
  <div>
    <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">{label}</div>
    {value ? <div className="font-bold">{value}</div> : <p className="text-xs text-white/30 italic">{hint}</p>}
  </div>
);

export const ProfileSystem = ({
  initialType = 'artist',
  realProfile,
  onLogout,
}: {
  initialType?: ProfileType;
  /** When provided, the header uses this instead of the dashboard's own mock name/type — everything else in this component is still the Phase 2/3 mock. */
  realProfile?: ProfileSystemRealData;
  /** When provided, renders a real Log Out control in the header instead of the mock experience-level switcher — see that switcher's removal note below. */
  onLogout?: () => void;
}) => {
  const [isSettingUp, setIsSettingUp] = useState(false);
  const { show } = useToast();
  const { profile: authProfile, refreshProfile } = useAuth();

  // Privacy & Security tab — wired to the real Profiles/Auth APIs. Current
  // values are seeded from GET /v1/profiles/me's nested `.privacy` (see
  // doc/API_REQUIREMENTS.md §2.4a for the correction: an earlier version of
  // this comment wrongly claimed no GET existed for these). 2FA, data
  // export, and account deletion genuinely have no live endpoint (§2.4d).
  const [isDiscoverable, setIsDiscoverable] = useState(authProfile?.isDiscoverable ?? true);
  const [privacy, setPrivacy] = useState<{ contactVisibility: ContactVisibility; portfolioVisibility: PortfolioVisibility }>({
    contactVisibility: authProfile?.privacy?.contactVisibility ?? 'private',
    portfolioVisibility: authProfile?.privacy?.portfolioVisibility ?? 'public',
  });
  const [savingPrivacyField, setSavingPrivacyField] = useState<string | null>(null);
  const [sessions, setSessions] = useState<AuthSession[] | null>(null);
  const [sessionsLoading, setSessionsLoading] = useState(false);
  const [showSessions, setShowSessions] = useState(false);

  const handleTogglePublicProfile = async () => {
    const next = !isDiscoverable;
    setIsDiscoverable(next);
    setSavingPrivacyField('discoverable');
    try {
      await profilesService.updateProfile({ isDiscoverable: next });
      show(next ? 'Profile is now public.' : 'Profile is now private.', 'success');
    } catch (err) {
      setIsDiscoverable(!next);
      show(err instanceof ApiError ? err.message : 'Could not update profile visibility.', 'error');
    } finally {
      setSavingPrivacyField(null);
    }
  };

  const handleContactVisibilityChange = async (value: ContactVisibility) => {
    const prev = privacy.contactVisibility;
    setPrivacy((p) => ({ ...p, contactVisibility: value }));
    setSavingPrivacyField('contactVisibility');
    try {
      await profilesService.updatePrivacySettings({ contactVisibility: value });
      show('Contact visibility updated.', 'success');
    } catch (err) {
      setPrivacy((p) => ({ ...p, contactVisibility: prev }));
      show(err instanceof ApiError ? err.message : 'Could not update contact visibility.', 'error');
    } finally {
      setSavingPrivacyField(null);
    }
  };

  const handlePortfolioVisibilityChange = async (value: PortfolioVisibility) => {
    const prev = privacy.portfolioVisibility;
    setPrivacy((p) => ({ ...p, portfolioVisibility: value }));
    setSavingPrivacyField('portfolioVisibility');
    try {
      await profilesService.updatePrivacySettings({ portfolioVisibility: value });
      show('Portfolio visibility updated.', 'success');
    } catch (err) {
      setPrivacy((p) => ({ ...p, portfolioVisibility: prev }));
      show(err instanceof ApiError ? err.message : 'Could not update portfolio visibility.', 'error');
    } finally {
      setSavingPrivacyField(null);
    }
  };

  const handleViewSessions = async () => {
    setShowSessions((v) => !v);
    if (sessions) return;
    setSessionsLoading(true);
    try {
      setSessions(await authService.listSessions());
    } catch (err) {
      show(err instanceof ApiError ? err.message : 'Could not load sessions.', 'error');
      setShowSessions(false);
    } finally {
      setSessionsLoading(false);
    }
  };

  const handleRevokeSession = async (sessionId: string) => {
    try {
      await authService.revokeSession(sessionId);
      setSessions((prev) => prev?.filter((s) => s.sessionId !== sessionId) ?? null);
      show('Session revoked.', 'success');
    } catch (err) {
      show(err instanceof ApiError ? err.message : 'Could not revoke session.', 'error');
    }
  };

  // Real Edit Profile — PATCH /v1/profiles/me and /v1/profiles/me/details
  // are both real, live endpoints (updateProfile/updateProfileDetails,
  // already built for the Privacy tab's isDiscoverable toggle). These two
  // forms are the only "Edit" buttons in this component that now do
  // anything real; Media Gallery's upload and Social Links' "Add Link"
  // still show an under-development toast — those need the Media API
  // wired in, a bigger piece of work than a field edit.
  const [editingBasic, setEditingBasic] = useState(false);
  const [basicForm, setBasicForm] = useState({ displayName: '', headline: '', bio: '', pincode: '', websiteUrl: '' });
  const [savingBasic, setSavingBasic] = useState(false);

  const openBasicEdit = () => {
    if (!authProfile) return;
    setBasicForm({
      displayName: authProfile.displayName ?? '',
      headline: authProfile.headline ?? '',
      bio: authProfile.bio ?? '',
      pincode: authProfile.pincode ?? '',
      websiteUrl: authProfile.websiteUrl ?? '',
    });
    setEditingBasic(true);
  };

  const handleSaveBasic = async () => {
    setSavingBasic(true);
    try {
      await profilesService.updateProfile({
        displayName: basicForm.displayName,
        headline: basicForm.headline || null,
        bio: basicForm.bio || null,
        pincode: basicForm.pincode || null,
        websiteUrl: basicForm.websiteUrl || null,
      });
      await refreshProfile();
      show('Profile updated.', 'success');
      setEditingBasic(false);
    } catch (err) {
      show(err instanceof ApiError ? err.message : 'Could not save profile.', 'error');
    } finally {
      setSavingBasic(false);
    }
  };

  const [editingDetails, setEditingDetails] = useState(false);
  const [detailsForm, setDetailsForm] = useState({ heightCm: '', weightKg: '', eyeColor: '', hairColor: '', yearsExperience: '' });
  const [savingDetails, setSavingDetails] = useState(false);

  const openDetailsEdit = () => {
    if (!authProfile) return;
    setDetailsForm({
      heightCm: authProfile.details.heightCm != null ? String(authProfile.details.heightCm) : '',
      weightKg: authProfile.details.weightKg != null ? String(authProfile.details.weightKg) : '',
      eyeColor: authProfile.details.eyeColor ?? '',
      hairColor: authProfile.details.hairColor ?? '',
      yearsExperience: authProfile.yearsExperience != null ? String(authProfile.yearsExperience) : '',
    });
    setEditingDetails(true);
  };

  const handleSaveDetails = async () => {
    setSavingDetails(true);
    try {
      await profilesService.updateProfileDetails({
        heightCm: detailsForm.heightCm ? Number(detailsForm.heightCm) : undefined,
        weightKg: detailsForm.weightKg ? Number(detailsForm.weightKg) : undefined,
        eyeColor: detailsForm.eyeColor || undefined,
        hairColor: detailsForm.hairColor || undefined,
      });
      if (detailsForm.yearsExperience) {
        await profilesService.updateProfile({ yearsExperience: Number(detailsForm.yearsExperience) });
      }
      await refreshProfile();
      show('Details updated.', 'success');
      setEditingDetails(false);
    } catch (err) {
      show(err instanceof ApiError ? err.message : 'Could not save details.', 'error');
    } finally {
      setSavingDetails(false);
    }
  };

  // My Network — wired to the real Messaging API (GET /v1/conversations).
  // "Network" here means "people you actually have a real conversation
  // with," replacing the old fake connection cards (Aarav Sharma, Ishani
  // Gupta, etc. — accounts that were never real). No dedicated
  // connections/network endpoint exists separately from messaging.
  const [conversations, setConversations] = useState<Conversation[] | null>(null);
  const [conversationsLoading, setConversationsLoading] = useState(true);
  const [conversationsError, setConversationsError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    messagingService
      .listConversations({ limit: 20 })
      .then((result) => {
        if (!cancelled) setConversations(result.items);
      })
      .catch((err) => {
        if (!cancelled) setConversationsError(err instanceof ApiError ? err.message : 'Could not load your network.');
      })
      .finally(() => {
        if (!cancelled) setConversationsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Media Gallery — Portfolios is a real, live API (unlike Comfort
  // Declaration/Availability below, which don't exist at all). Read-only:
  // this app doesn't build the upload/create flow yet.
  const [portfolios, setPortfolios] = useState<Portfolio[] | null>(null);
  const [portfoliosLoading, setPortfoliosLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    portfoliosService
      .listMyPortfolios()
      .then((result) => {
        if (!cancelled) setPortfolios(result);
      })
      .catch(() => {
        if (!cancelled) setPortfolios([]);
      })
      .finally(() => {
        if (!cancelled) setPortfoliosLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);
  const [profile, setProfile] = useState({
    type: initialType,
    industry: 'Cinema',
    secondaryIndustry: 'Theatre',
    profession: initialType === 'artist' ? 'Method Actor & Scriptwriter' : 'Production House',
    level: 'intermediate' as ExperienceLevel,
    name: initialType === 'artist' ? 'SiDdhaRtha SosrG' : 'SosrG Productions',
    location: 'Mumbai, India',
    hasGreenId: true,
    sosrgId: 'SOSRG-A1B2C3D4E',
    gender: 'Male',
    bio: initialType === 'artist' ? 'Passionate method actor with 5 years of experience in regional cinema.' : 'Leading production house specializing in regional cinema.',
    skills: ['Method Acting', 'Voice Over', 'Scriptwriting', 'Improv'],
    socialLinks: {
      instagram: '@arjun.mehta',
      youtube: 'SiDdhaRtha SosrG Official',
      website: 'arjunmehta.com'
    },
    physicalAttributes: {
      height: '5\'10"',
      weight: '75kg',
      eyeColor: 'Brown',
      hairColor: 'Black'
    },
    experienceCategories: ['Feature Films', 'Short Films', 'Commercials'],
    comfortDeclaration: ['Action', 'Drama', 'Romance'],
    availability: 'Full-time',
    companyInfo: {
      legalStatus: 'Private Limited',
      address: 'Andheri West, Mumbai',
      website: 'sosrgproductions.com',
      businessRole: 'Production House'
    }
  });

  useEffect(() => {
    setProfile(prev => ({
      ...prev,
      type: initialType,
      name: initialType === 'artist' ? 'SiDdhaRtha SosrG' : 'SosrG Productions',
      profession: initialType === 'artist' ? 'Method Actor & Scriptwriter' : 'Production House',
      bio: initialType === 'artist' ? 'Passionate method actor with 5 years of experience in regional cinema.' : 'Leading production house specializing in regional cinema.',
    }));
  }, [initialType]);

  // Profile Details is the first tab with real API data behind it — lands
  // there instead of the old default (Wallet Overview, which is entirely
  // scaffolded) so the first thing shown is real.
  const [activeTab, setActiveTab] = useState('profile-details');

  const stats = {
    artist: {
      fresher: { projects: 4, rating: 4.2, views: '1.2k', earnings: '₹15k' },
      intermediate: { projects: 12, rating: 4.8, views: '15k', earnings: '₹2.4L' },
      expert: { projects: 45, rating: 5.0, views: '250k', earnings: '₹18L' },
    },
    buyer: {
      fresher: { projects: 2, rating: 4.0, views: '500', earnings: '₹50k Spent' },
      intermediate: { projects: 10, rating: 4.5, views: '5k', earnings: '₹5L Spent' },
      expert: { projects: 30, rating: 4.9, views: '50k', earnings: '₹20L Spent' },
    },
    business: {
      fresher: { clients: 2, team: 3, revenue: '₹5L', rating: 4.0 },
      intermediate: { clients: 15, team: 12, revenue: '₹45L', rating: 4.6 },
      expert: { clients: 80, team: 50, revenue: '₹3.2Cr', rating: 4.9 },
    },
    casting_director: {
      fresher: { projects: 3, rating: 4.1, views: '2k', earnings: '10 Talents Cast' },
      intermediate: { projects: 15, rating: 4.7, views: '20k', earnings: '150 Talents Cast' },
      expert: { projects: 60, rating: 4.9, views: '500k', earnings: '1000+ Talents Cast' },
    }
  };

  const currentStats = stats[profile.type][profile.level] || stats.artist.intermediate;

  return (
    <div className="pt-32 px-6 max-w-[1600px] mx-auto min-h-screen pb-24">
      {isSettingUp ? (
        <ProfileSetupFlow onComplete={(data) => {
          setProfile({
            ...profile,
            type: data.type,
            industry: data.industry,
            secondaryIndustry: data.secondaryIndustry,
            profession: data.profession,
            level: data.level,
            name: data.type === 'artist' ? 'SiDdhaRtha SosrG' : data.type === 'buyer' ? 'John Doe' : data.type === 'casting_director' ? 'Sarah Smith' : 'SosrG Productions',
            hasGreenId: data.hasGreenId,
            sosrgId: data.sosrgId || profile.sosrgId
          });
          setIsSettingUp(false);
        }} />
      ) : (
        <>
          {/* Profile Header & Controls */}
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start mb-12 gap-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-2xl border-2 border-gold p-1 overflow-hidden">
                  <img 
                    src={profile.type === 'artist' ? "https://picsum.photos/seed/creator/200/200" : "https://picsum.photos/seed/business/200/200"} 
                    className="w-full h-full object-cover rounded-xl" 
                    alt="Profile" 
                    referrerPolicy="no-referrer" 
                  />
                </div>
                <div className={cn(
                  "absolute -bottom-2 -right-2 px-2 py-1 rounded text-[8px] font-bold uppercase tracking-widest shadow-lg",
                  profile.level === 'expert' ? "bg-gold text-black" : profile.level === 'intermediate' ? "bg-blue-500 text-white" : "bg-emerald-500 text-white"
                )}>
                  {profile.level}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-3 mb-1">
                  <h1 className="text-3xl font-bold">{realProfile?.displayName ?? profile.name}</h1>
                  <ShieldCheck className="text-blue-400" size={20} />
                </div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-3">
                  {realProfile ? (
                    authProfile?.username ? (
                      <span className="text-gold font-mono text-sm bg-gold/10 px-2 py-1 rounded">@{authProfile.username}</span>
                    ) : <MissingInfo text="No username set" />
                  ) : (
                    <span className="text-gold font-mono text-sm bg-gold/10 px-2 py-1 rounded">{profile.sosrgId}</span>
                  )}
                  <span className="text-white/20">•</span>
                  {realProfile ? (
                    <span className="text-white/80 text-sm font-medium capitalize">{realProfile.profileType.replace('_', ' ')}</span>
                  ) : (
                    <span className="text-white/80 text-sm font-medium">{profile.profession}</span>
                  )}
                  {!realProfile && (
                    <>
                      <span className="text-white/20">•</span>
                      <span className="text-gold text-xs font-bold uppercase tracking-wider">{profile.industry}</span>
                      {profile.secondaryIndustry && (
                        <>
                          <span className="text-white/20">•</span>
                          <span className="text-white/40 text-xs font-bold uppercase tracking-wider">{profile.secondaryIndustry}</span>
                        </>
                      )}
                    </>
                  )}
                </div>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                  {realProfile ? (
                    realProfile.district || realProfile.state ? (
                      <span className="bg-white/5 border border-white/10 px-2 py-1 rounded text-[10px] text-white/60">
                        {[realProfile.district, realProfile.state].filter(Boolean).join(', ')}
                      </span>
                    ) : <MissingInfo text="No location set" />
                  ) : (
                    <span className="bg-white/5 border border-white/10 px-2 py-1 rounded text-[10px] text-white/60">{profile.location}</span>
                  )}
                  {realProfile ? (
                    // Ratings & Reviews has no live API yet (see that tab) —
                    // this is the same gap, not a field the user forgot to fill in.
                    <span className="bg-gold/10 border border-gold/20 px-2 py-1 rounded text-[10px] text-gold font-bold flex items-center gap-1">
                      <Star size={10} className="fill-gold" /> Rating — Coming soon
                    </span>
                  ) : (
                    <span className="bg-gold/10 border border-gold/20 px-2 py-1 rounded text-[10px] text-gold font-bold flex items-center gap-1">
                      <Star size={10} className="fill-gold" /> 4.8 Rating
                    </span>
                  )}
                  {realProfile ? (
                    authProfile?.kycStatus === 'verified' ? (
                      <span className="bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                        <ShieldCheck size={10} /> KYC Verified
                      </span>
                    ) : (
                      <MissingInfo text={authProfile?.kycStatus ? `KYC: ${authProfile.kycStatus}` : 'KYC not started'} />
                    )
                  ) : profile.hasGreenId && (
                    <span className="bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                      <ShieldCheck size={10} /> Green ID Active
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <button
                onClick={() => {
                  if (realProfile) {
                    openBasicEdit();
                  } else {
                    setIsSettingUp(true);
                  }
                }}
                className="flex items-center justify-center gap-2 px-6 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
              >
                <Settings size={14} /> Edit Profile
              </button>
              <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                {(['artist', 'business'] as ProfileType[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setProfile({ ...profile, type: t })}
                    className={cn(
                      "px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all",
                      profile.type === t ? "bg-gold text-black" : "text-white/40 hover:text-white"
                    )}
                  >
                    {t === 'artist' ? 'Creator' : 'Business'}
                  </button>
                ))}
              </div>
              {/*
                The old Fresher/Intermediate/Expert switcher used to live
                here, letting a user set their own experience-tier — removed
                from user-facing UI per explicit direction: tier should be
                something SosrG staff assess and set, not self-declared.
                doc/API_REQUIREMENTS.md now asks for this as an admin-only
                field. `profile.level` still exists internally (drives the
                stat-tile mock data below) — it just isn't user-editable here anymore.
              */}
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-all"
                >
                  Log Out
                </button>
              )}
            </div>
          </div>

          {/* Stats Grid — labels are real category names, values are still
              mock (no stats/analytics API exists), so only the number
              scaffolds, not the label. */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {Object.keys(currentStats).map((key) => (
              <div key={key} className="relative glass-panel p-6 text-center group hover:border-gold/30 transition-all">
                <ComingSoonTag />
                <ScaffoldRow className="h-8 w-16 mx-auto mb-2" />
                <div className="text-[10px] uppercase tracking-widest text-white/40 group-hover:text-white/60 transition-colors">{key}</div>
              </div>
            ))}
          </div>

          {/* Dashboard Tabs — real API-backed tabs first (Profile Details,
              My Network, Privacy & Security), then Bihar Untold, then every
              tab still waiting on a live endpoint. */}
          <div className="flex overflow-x-auto no-scrollbar gap-4 mb-8 border-b border-white/5 pb-4">
            {[
              { id: 'profile-details', label: 'Profile Details', icon: User },
              { id: 'network', label: 'My Network', icon: Users },
              { id: 'privacy', label: 'Privacy & Security', icon: ShieldCheck },
              { id: 'bihar-untold', label: 'Bihar Untold', icon: Film },
              { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
              { id: 'discovery', label: 'Smart Discovery', icon: Search },
              { id: 'wallet', label: 'Wallet Overview', icon: Wallet },
              { id: 'finances', label: 'Finances', icon: Wallet },
              { id: 'bookings', label: 'Booking History', icon: Calendar },
              { id: 'counselling', label: 'Counselling', icon: HeartHandshake },
              { id: 'management', label: 'Management', icon: Briefcase },
              { id: 'notifications', label: 'Notifications', icon: MessageSquare },
              { id: 'membership', label: 'Membership', icon: Star },
              { id: 'reviews', label: 'Reviews', icon: Star },
              { id: 'services', label: 'Services & Gigs', icon: Briefcase },
              ...(profile.type === 'artist' ? [
                { id: 'portfolio', label: 'Portfolio Manager', icon: User },
                { id: 'auditions', label: 'Auditions Applied', icon: Mic },
                { id: 'availability', label: 'Availability Calendar', icon: Calendar },
                { id: 'ai-insights', label: 'AI Match Suggestions', icon: Zap },
              ] : [
                { id: 'projects', label: 'Post New Project', icon: Briefcase },
                { id: 'casting', label: 'Casting Panel', icon: Users },
                { id: 'budget', label: 'Budget Manager', icon: Calculator },
                { id: 'workflow', label: 'Workflow Tracker', icon: Settings },
              ]),
              { id: 'legal', label: 'Contracts Vault', icon: ShieldCheck },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all",
                  activeTab === tab.id ? "bg-white/10 text-gold border border-gold/20" : "text-white/40 hover:text-white"
                )}
              >
                <tab.icon size={16} /> {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'discovery' && (
              <motion.div
                key="discovery"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Search & Filters */}
                <div className="glass-panel p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
                      <input 
                        type="text" 
                        placeholder="Search by skill, name, or keywords..." 
                        className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-gold/50 transition-colors"
                      />
                    </div>
                    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
                      <select className="bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold/50">
                        <option>All Skills</option>
                        <option>Acting</option>
                        <option>Direction</option>
                        <option>Cinematography</option>
                      </select>
                      <select className="bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold/50">
                        <option>Any Rating</option>
                        <option>4.5 & Above</option>
                        <option>4.0 & Above</option>
                      </select>
                      <select className="bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold/50">
                        <option>Any Location</option>
                        <option>Mumbai</option>
                        <option>Delhi</option>
                        <option>Remote</option>
                      </select>
                      <button className="flex items-center gap-2 bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm whitespace-nowrap hover:bg-white/5 transition-colors">
                        <ShieldCheck size={16} className="text-emerald-400" /> Verified Only
                      </button>
                    </div>
                  </div>
                </div>

                {/* Brief box — this whole tab has no live search/discovery API
                    behind it yet, so it's honestly described up front rather
                    than presented as working search results. */}
                <div className="glass-panel p-6 bg-gradient-to-br from-blue-500/5 to-transparent border-blue-500/20">
                  <h3 className="font-bold mb-2 flex items-center gap-2"><Search size={16} className="text-blue-400" /> About Smart Discovery</h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    Smart Discovery is meant to surface trending talent and personalized casting/collaboration
                    suggestions based on your profile and activity. There's no discovery/search or
                    recommendations API live yet, so the filters above are real controls with nothing behind
                    them, and the sections below are shown as loading placeholders rather than fabricated
                    results.
                  </p>
                </div>

                {/* Trending Section */}
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <TrendingUp className="text-gold" size={24} />
                    <h2 className="text-2xl font-bold">Trending Now</h2>
                    <span className="bg-gold text-black text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded ml-2">Coming Soon</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[0, 1, 2, 3].map((i) => (
                      <ScaffoldRow key={i} className="h-56" />
                    ))}
                  </div>
                </div>

                {/* Personalised Suggestions */}
                <div className="glass-panel p-8 bg-gradient-to-br from-blue-500/5 to-transparent border-blue-500/20">
                  <div className="flex items-center gap-2 mb-6">
                    <Zap className="text-blue-400" size={24} />
                    <h2 className="text-2xl font-bold">Suggested For You</h2>
                    <span className="bg-gold text-black text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded ml-2">Coming Soon</span>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <ScaffoldRow className="h-40" />
                    <ScaffoldRow className="h-40" />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'profile-details' && (
              <motion.div
                key="profile-details"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-8">
                    {/* Basic Info — wired to the real profile (GET /v1/profiles/me);
                        each field shows a real value or, when unfilled, a short
                        description of what it's for instead of blank space. */}
                    <HoverGlowPanel className="glass-panel-pink p-8">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold">Basic Information</h3>
                        <button onClick={openBasicEdit} className="text-xs text-gold hover:underline flex items-center gap-1">
                          <Settings size={14} /> Edit
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <ProfileField label="Full Name" value={authProfile?.displayName ?? profile.name} hint="Your public display name." />
                        <ProfileField label="Gender" value={authProfile?.genderIdentity} hint="Not set — your self-described gender identity." />
                        <ProfileField
                          label="Profession"
                          value={authProfile?.professions?.[0]?.name}
                          hint="No profession added yet — this is what casting directors see you're skilled at."
                        />
                        <ProfileField
                          label="Location"
                          value={authProfile ? [authProfile.district, authProfile.state].filter(Boolean).join(', ') || undefined : profile.location}
                          hint="No location set — helps nearby casting calls find you."
                        />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Bio</div>
                        {authProfile?.bio ? (
                          <p className="text-sm text-white/80 leading-relaxed">{authProfile.bio}</p>
                        ) : (
                          <p className="text-xs text-white/30 italic">
                            {authProfile ? "No bio yet — a short introduction is the first thing people read on your profile." : profile.bio}
                          </p>
                        )}
                      </div>
                      <div className="mt-6">
                        <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Skill Tags</div>
                        {authProfile ? (
                          authProfile.skills.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {authProfile.skills.map((skill) => (
                                <span key={skill.id} className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-xs font-medium">
                                  {skill.name}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <p className="text-xs text-white/30 italic">No skills added yet — skills help you show up in casting searches.</p>
                          )
                        ) : (
                          <div className="flex flex-wrap gap-2">
                            {profile.skills.map((skill, i) => (
                              <span key={i} className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-xs font-medium">
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </HoverGlowPanel>

                    {/* Conditional Advanced Module */}
                    {profile.type === 'artist' && (
                      <HoverGlowPanel className="glass-panel-purple p-8">
                        <div className="flex justify-between items-center mb-6">
                          <h3 className="text-xl font-bold flex items-center gap-2"><Star size={20} className="text-gold" /> Actor/Model Advanced Module</h3>
                          <button onClick={openDetailsEdit} className="text-xs text-gold hover:underline">
                            Edit Module
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                            {/* Real fields (PATCH /v1/profiles/me/details) — "xx" is the
                                unfilled-value placeholder for a real field with no data yet,
                                not a fake number. */}
                            <h4 className="text-sm font-bold text-white/60 uppercase tracking-widest mb-4 border-b border-white/10 pb-2">Physical Attributes</h4>
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span className="text-white/40 text-sm">Height</span>
                                <span className="font-bold text-sm">{authProfile?.details.heightCm != null ? `${authProfile.details.heightCm} cm` : 'xx'}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white/40 text-sm">Weight</span>
                                <span className="font-bold text-sm">{authProfile?.details.weightKg != null ? `${authProfile.details.weightKg} kg` : 'xx'}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white/40 text-sm">Eye Color</span>
                                <span className="font-bold text-sm">{authProfile?.details.eyeColor ?? 'xx'}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white/40 text-sm">Hair Color</span>
                                <span className="font-bold text-sm">{authProfile?.details.hairColor ?? 'xx'}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white/40 text-sm">Experience</span>
                                <span className="font-bold text-sm">{authProfile?.yearsExperience != null ? `${authProfile.yearsExperience} yrs` : 'xx'}</span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-6">
                            {/* None of the three below exist in the profile API yet — no
                                experience-category, comfort-declaration, or availability
                                field anywhere in ProfileDetailsResponseDto. Scaffolded
                                rather than shown as real, empty, or editable — flagged in
                                doc/API_REQUIREMENTS.md §2.4b. */}
                            <div>
                              <h4 className="text-sm font-bold text-white/60 uppercase tracking-widest mb-3 border-b border-white/10 pb-2 flex items-center justify-between">
                                Experience Categories
                                <span className="bg-gold text-black px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest">Coming Soon</span>
                              </h4>
                              <div className="flex gap-2">
                                <ScaffoldRow className="h-6 w-24" />
                                <ScaffoldRow className="h-6 w-20" />
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-white/60 uppercase tracking-widest mb-3 border-b border-white/10 pb-2 flex items-center justify-between">
                                Comfort Declaration
                                <span className="bg-gold text-black px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest">Coming Soon</span>
                              </h4>
                              <div className="flex gap-2">
                                <ScaffoldRow className="h-6 w-20" />
                                <ScaffoldRow className="h-6 w-16" />
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-white/60 uppercase tracking-widest mb-3 border-b border-white/10 pb-2 flex items-center justify-between">
                                Availability
                                <span className="bg-gold text-black px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest">Coming Soon</span>
                              </h4>
                              <ScaffoldRow className="h-6 w-28" />
                            </div>
                          </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
                          <div className="text-sm text-white/60">Generate a casting-ready digital resume instantly.</div>
                          <button
                            onClick={() => show('Resume generation is coming soon.', 'info')}
                            className="bg-gold text-black px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors flex items-center gap-2"
                          >
                            <FileText size={14} /> Generate Resume
                          </button>
                        </div>
                      </HoverGlowPanel>
                    )}

                    {profile.type === 'business' && (
                      <HoverGlowPanel className="relative glass-panel-blue p-8">
                        <ComingSoonTag />
                        <div className="flex justify-between items-center mb-6">
                          <h3 className="text-xl font-bold flex items-center gap-2"><Briefcase size={20} className="text-gold" /> Business Profile</h3>
                        </div>

                        {/* None of legalStatus/businessRole/address exist anywhere in
                            OwnProfileResponseDto — there are no business-specific
                            fields in the real schema at all, only the generic
                            profile fields every account type shares. websiteUrl is
                            the one real field here, same as Social Links above. */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                          <div>
                            <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Legal Status</div>
                            <ScaffoldRow className="h-5 w-24" />
                          </div>
                          <div>
                            <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Business Role</div>
                            <ScaffoldRow className="h-5 w-32" />
                          </div>
                          <div className="md:col-span-2">
                            <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Registered Address</div>
                            <ScaffoldRow className="h-5 w-48" />
                          </div>
                          <div className="md:col-span-2">
                            <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Website</div>
                            {authProfile?.websiteUrl ? (
                              <a href={authProfile.websiteUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-400 hover:underline flex items-center gap-1">
                                {authProfile.websiteUrl} <ExternalLink size={12} />
                              </a>
                            ) : (
                              <p className="text-xs text-white/30 italic">No website added yet.</p>
                            )}
                          </div>
                        </div>

                        <div className="p-6 bg-gradient-to-br from-gold/10 to-transparent border border-gold/20 rounded-2xl">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center">
                              <Zap size={20} className="text-gold" />
                            </div>
                            <div>
                              <h4 className="font-bold text-gold">AI Branding Resume</h4>
                              <p className="text-xs text-white/60">Generate a company presentation for partnerships.</p>
                            </div>
                          </div>
                          <button
                            onClick={() => show('Presentation generation is coming soon.', 'info')}
                            className="w-full bg-gold text-black py-3 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-white transition-colors"
                          >
                            Generate Presentation
                          </button>
                        </div>
                      </HoverGlowPanel>
                    )}
                  </div>

                  <div className="space-y-8">
                    {/* Media Gallery — Portfolios is a real, live API
                        (GET /v1/portfolios), so this shows real portfolios
                        when they exist. Upload/create isn't built in this
                        app yet, so that action stays a toast, not fake. */}
                    <HoverGlowPanel className="glass-panel p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold flex items-center gap-2"><Image size={16} className="text-gold" /> Media Gallery</h3>
                        <span className="text-[9px] uppercase tracking-widest font-bold text-emerald-400">Live from SosrG</span>
                      </div>

                      {portfoliosLoading && (
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          {[0, 1, 2, 3].map((i) => (
                            <ScaffoldRow key={i} className="aspect-square" />
                          ))}
                        </div>
                      )}

                      {!portfoliosLoading && (portfolios?.length ?? 0) === 0 && (
                        <p className="text-xs text-white/30 italic mb-4">No portfolio yet — this is where your photos, reels, and work samples will show up.</p>
                      )}

                      {!portfoliosLoading && (portfolios?.length ?? 0) > 0 && (
                        <div className="space-y-2 mb-4">
                          {portfolios!.map((p) => (
                            <div key={p.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
                              <span className="text-sm font-medium">{p.title}</span>
                              <span className="text-[9px] uppercase tracking-widest text-white/40">{p.visibility}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <button
                        onClick={() => show("This can't be edited yet — this feature is under development.", 'info')}
                        className="w-full bg-white/5 border border-white/10 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                      >
                        <Upload size={14} /> Upload New
                      </button>
                    </HoverGlowPanel>

                    {/* Social Links — the profile API only has one generic
                        websiteUrl field, no per-platform handles, so only
                        that one is real (§2.4c). */}
                    <HoverGlowPanel className="glass-panel p-6">
                      <h3 className="font-bold mb-4 flex items-center gap-2"><Globe size={16} className="text-gold" /> Social Links</h3>
                      <div className="space-y-3">
                        {authProfile?.websiteUrl ? (
                          <a href={authProfile.websiteUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10 hover:border-white/30 transition-colors group">
                            <div className="flex items-center gap-3">
                              <Globe size={18} className="text-blue-400" />
                              <span className="text-sm font-medium">{authProfile.websiteUrl}</span>
                            </div>
                            <ExternalLink size={14} className="text-white/20 group-hover:text-white/60" />
                          </a>
                        ) : (
                          <p className="text-xs text-white/30 italic">No website added yet.</p>
                        )}
                        <div className="relative flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
                          <span className="absolute top-2 right-2 bg-gold text-black px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest">Coming Soon</span>
                          <div className="flex items-center gap-3">
                            <Instagram size={18} className="text-pink-500" />
                            <ScaffoldRow className="h-4 w-28" />
                          </div>
                        </div>
                        <div className="relative flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
                          <span className="absolute top-2 right-2 bg-gold text-black px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest">Coming Soon</span>
                          <div className="flex items-center gap-3">
                            <Youtube size={18} className="text-red-500" />
                            <ScaffoldRow className="h-4 w-28" />
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => show("This can't be edited yet — this feature is under development.", 'info')}
                        className="w-full mt-4 bg-white/5 border border-white/10 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                      >
                        <Plus size={14} /> Add Link
                      </button>
                    </HoverGlowPanel>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'bihar-untold' && (
              <motion.div key="bihar-untold" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <BiharDocumentaryRegistration standalone={false} />
              </motion.div>
            )}

            {activeTab === 'wallet' && (
              <motion.div
                key="wallet"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Total Balance & Withdrawal */}
                  <div className="relative glass-panel p-6 bg-gradient-to-br from-gold/10 to-transparent border-gold/20">
                    <ComingSoonTag />
                    <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Total Balance</div>
                    <div className="text-4xl font-bold text-gold mb-4">xxxx</div>
                    <div className="flex gap-2 mb-4">
                      <button className="flex-1 bg-gold text-black py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors">Withdraw</button>
                      <button className="flex-1 bg-white/5 border border-white/10 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">Add Funds</button>
                    </div>
                    <div className="text-[10px] text-white/60 bg-black/20 p-2 rounded border border-white/5">
                      <span className="text-gold font-bold">Withdrawal Policy:</span> Minimum ₹2500 weekly withdrawal on every Sunday at 11:34 PM.
                    </div>
                  </div>

                  {/* Pending Clearance */}
                  <div className="relative glass-panel p-6">
                    <ComingSoonTag />
                    <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Pending Clearance</div>
                    <div className="text-3xl font-bold mb-2">xxxx</div>
                    <p className="text-xs text-white/40">From 2 active projects. Expected clearance in 5-7 days.</p>
                  </div>

                  {/* SosrG Coins */}
                  <div className="relative glass-panel p-6 border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-transparent">
                    <ComingSoonTag />
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-[10px] uppercase tracking-widest text-white/40">SosrG Coins</div>
                      <Award size={16} className="text-emerald-400" />
                    </div>
                    <div className="text-3xl font-bold mb-2 text-emerald-400">xxxx <span className="text-sm">Coins</span></div>
                    <p className="text-xs text-white/60 mb-3">Earn via referrals, votes, and platform engagement (Available for Users & CP Admins).</p>
                    <button className="w-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-emerald-500/30 transition-colors">
                      Redeem Coins
                    </button>
                  </div>

                  {/* Tokens */}
                  <div className="relative glass-panel p-6 border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-transparent">
                    <ComingSoonTag />
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-[10px] uppercase tracking-widest text-white/40">Auction Tokens</div>
                      <Ticket size={16} className="text-blue-400" />
                    </div>
                    <div className="text-3xl font-bold mb-2 text-blue-400">xxxx <span className="text-sm">SGT</span></div>
                    <p className="text-xs text-white/60 mb-3">Exclusive tokens used for bidding in premium talent auctions and exclusive events.</p>
                    <button className="w-full bg-blue-500/20 text-blue-400 border border-blue-500/30 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-blue-500/30 transition-colors">
                      Buy Tokens
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Transaction History */}
                  <div className="relative lg:col-span-2 glass-panel p-8">
                    <ComingSoonTag />
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold">Transaction History</h3>
                      <div className="flex gap-2">
                        <button className="px-3 py-1 bg-white/10 rounded text-xs font-bold">Today</button>
                        <button className="px-3 py-1 bg-white/5 rounded text-xs font-bold text-white/40 hover:text-white">Weekly</button>
                        <button className="px-3 py-1 bg-white/5 rounded text-xs font-bold text-white/40 hover:text-white">Monthly</button>
                        <button className="px-3 py-1 bg-white/5 rounded text-xs font-bold text-white/40 hover:text-white">All Time</button>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <ScaffoldRow key={i} className="h-16" />
                      ))}
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="space-y-6">
                    <div className="relative glass-panel p-6">
                      <ComingSoonTag />
                      <h3 className="font-bold mb-4 flex items-center gap-2"><ShieldCheck size={18} className="text-gold" /> Secure Payment</h3>
                      <p className="text-xs text-white/60 mb-6">Powered by Razorpay. Add funds securely using your preferred payment method.</p>

                      <div className="space-y-3">
                        {[0, 1, 2].map((i) => (
                          <ScaffoldRow key={i} className="h-14" />
                        ))}
                      </div>

                      <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-white/40 uppercase tracking-widest">
                        <Lock size={12} /> 100% Secure Transactions
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'bookings' && (
              <motion.div
                key="bookings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="relative space-y-6"
              >
                <ComingSoonTag />
                <h2 className="text-2xl font-bold">Booking History</h2>
                <p className="text-white/40 text-sm max-w-2xl">
                  This is where confirmed direct bookings and won auctions will show up as a single
                  timeline — current, past, and auction-sourced work, each with schedule, payment, and
                  status in one place, instead of scattered across casting applications and messages.
                </p>
                <div className="space-y-4">
                  {[0, 1, 2, 3].map((i) => (
                    <ScaffoldRow key={i} className="h-20" />
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'notifications' && (
              <motion.div
                key="notifications"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="glass-panel-pink p-8 text-center py-16"
              >
                <Zap className="mx-auto mb-4 text-white/20" size={40} />
                <h2 className="text-xl font-bold mb-2">Notifications</h2>
                <p className="text-white/40 text-sm max-w-sm mx-auto">This feature is under development — real notifications aren't wired up yet.</p>
              </motion.div>
            )}

            {activeTab === 'membership' && (
              <motion.div
                key="membership"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-serif italic mb-4">Membership & <span className="gold-text">Subscription</span></h2>
                  <p className="text-white/60">Unlock premium benefits, priority casting, and exclusive workshops.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                  {[
                    { name: 'Basic', price: "", current: true },
                    { name: 'Pro', price: '', current: false },
                    { name: 'Elite', price: '', current: false },
                  ].map((plan, i) => (
                    <div
                      key={i}
                      className={cn(
                        'relative flex flex-col h-full glass-panel p-8',
                        plan.name === 'Pro' ? 'border-gold/50 shadow-[0_0_30px_rgba(255,215,0,0.1)]' : '',
                      )}
                    >
                      <ComingSoonTag />
                      {plan.name === 'Pro' && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Most Popular</div>}
                      <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                      <div className="text-3xl font-serif italic text-gold mb-6">{plan.price}</div>
                      <div className="flex-1 space-y-3 mb-8">
                        {[0, 1, 2].map((j) => (
                          <ScaffoldRow key={j} className="h-6" />
                        ))}
                      </div>
                      <button
                        onClick={() => show('Membership plans are coming soon.', 'info')}
                        className={cn(
                          'mt-auto w-full py-3 rounded-xl font-bold uppercase tracking-widest transition-all',
                          plan.current ? 'bg-white/10 text-white/50 cursor-default' : plan.name === 'Pro' ? 'bg-gold text-black hover:scale-105' : 'bg-white/5 border border-white/10 hover:bg-white/10',
                        )}
                      >
                        {plan.current ? 'Current Plan' : 'Upgrade'}
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'reviews' && (
              <motion.div
                key="reviews"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="relative space-y-8"
              >
                <ComingSoonTag />
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold">Ratings & Reviews</h2>
                  <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl">
                    <Star className="fill-gold text-gold" size={20} />
                    <span className="text-xl font-bold">xx</span>
                    <span className="text-white/40 text-sm">(xx Reviews)</span>
                  </div>
                </div>
                <p className="text-white/40 text-sm -mt-4 max-w-2xl">
                  Ratings & Reviews is meant to show verified feedback from people you've worked with —
                  casting directors, collaborators, clients — building a track record tied to real completed
                  work rather than self-reported claims. <span className="text-white/60 font-medium">Coming soon</span>
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[0, 1, 2, 3].map((i) => (
                    <ScaffoldRow key={i} className="h-32" />
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'services' && (
              <motion.div
                key="services"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/*
                  Previous mock content commented out rather than deleted, per
                  this session's standing rule (see PROGRESS.md decision #8):
                  hardcoded service listings, sales counts, and a fake escrow
                  balance — none backed by a real endpoint. Restore this block
                  once Services/Gigs has a live API to wire it to.

                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Monetisation & Paid Services</h2>
                    <p className="text-white/60 text-sm">Offer your skills as paid services or workshops.</p>
                  </div>
                  <button className="bg-gold text-black px-6 py-2 rounded-xl font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-2">
                    <Plus size={16} /> Add Service
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { title: '1-on-1 Acting Coaching', price: '₹2000/hr', type: 'Consultation', sales: 24, rating: 4.9 },
                    { title: 'Script Review & Feedback', price: '₹5000', type: 'Service', sales: 12, rating: 4.7 },
                    { title: 'Voice Over Recording (Up to 5 mins)', price: '₹3000', type: 'Gig', sales: 45, rating: 5.0 }
                  ].map((service, i) => (
                    <div key={i} className="glass-panel p-6 group hover:border-gold/30 transition-all cursor-pointer">
                      <div className="flex justify-between items-start mb-4">
                        <span className="bg-white/10 px-2 py-1 rounded text-[10px] uppercase tracking-widest">{service.type}</span>
                        <button className="text-white/40 hover:text-white"><MoreHorizontal size={16} /></button>
                      </div>
                      <h3 className="font-bold text-lg mb-2 group-hover:text-gold transition-colors">{service.title}</h3>
                      <div className="text-xl font-serif italic text-gold mb-4">{service.price}</div>
                      <div className="flex justify-between items-center text-xs text-white/60 pt-4 border-t border-white/10">
                        <span className="flex items-center gap-1"><ShoppingCart size={14} /> {service.sales} Sales</span>
                        <span className="flex items-center gap-1 text-emerald-400"><Star size={14} className="fill-emerald-400" /> {service.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="glass-panel p-8 mt-12 bg-gradient-to-br from-gold/10 to-transparent border-gold/20">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-gold">Secure Payments by SosrG</h3>
                      <p className="text-sm text-white/80">All transactions are secured and held in escrow until service delivery is confirmed.</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold">₹45,000</div>
                        <div className="text-[10px] uppercase tracking-widest text-white/40">Available Balance</div>
                      </div>
                      <button className="bg-white/10 border border-white/20 px-6 py-2 rounded-xl text-sm font-bold hover:bg-white/20 transition-colors">Withdraw</button>
                    </div>
                  </div>
                </div>
                */}

                <div className="glass-panel p-12 text-center max-w-2xl mx-auto bg-gradient-to-br from-gold/10 to-transparent border-gold/20">
                  <ShoppingCart className="mx-auto mb-6 text-gold" size={40} />
                  <h2 className="text-2xl font-bold mb-4">Services & Gigs — Coming Soon</h2>
                  <p className="text-sm text-white/60 leading-relaxed">
                    This is where creators will list paid, bookable offerings — coaching sessions, script
                    reviews, voice-over gigs, workshops — priced and sold directly through SosrG, with
                    payment held in escrow until delivery is confirmed. It turns a profile from a portfolio
                    into a storefront.
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === 'privacy' && (
              <motion.div
                key="privacy"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Privacy & Security Controls</h2>
                    <p className="text-white/60 text-sm">Manage who can see your information and secure your account.</p>
                  </div>
                  <ShieldCheck className="text-emerald-400" size={32} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Profile Visibility — wired to PATCH /v1/profiles/me and
                      /v1/profiles/me/privacy, both real, verified live. */}
                  <div className="glass-panel p-6 space-y-6">
                    <h3 className="text-lg font-bold border-b border-white/10 pb-4">Profile Visibility</h3>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-bold text-sm">Public Profile</h4>
                          <p className="text-xs text-white/50">Allow anyone to view your basic profile.</p>
                        </div>
                        <button
                          type="button"
                          onClick={handleTogglePublicProfile}
                          disabled={savingPrivacyField === 'discoverable'}
                          aria-pressed={isDiscoverable}
                          className={cn(
                            "w-12 h-6 rounded-full relative transition-colors disabled:opacity-50",
                            isDiscoverable ? "bg-emerald-500" : "bg-white/10",
                          )}
                        >
                          <div className={cn("absolute top-1 w-4 h-4 bg-white rounded-full transition-all", isDiscoverable ? "right-1" : "left-1")}></div>
                        </button>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-bold text-sm">Show Contact Info</h4>
                          <p className="text-xs text-white/50">Who can see your contact details.</p>
                        </div>
                        <select
                          value={privacy.contactVisibility}
                          onChange={(e) => handleContactVisibilityChange(e.target.value as ContactVisibility)}
                          disabled={savingPrivacyField === 'contactVisibility'}
                          className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-sm text-white focus:outline-none focus:border-gold disabled:opacity-50"
                        >
                          <option value="public">Everyone</option>
                          <option value="connections">Connections Only</option>
                          <option value="private">Private</option>
                        </select>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-bold text-sm">Portfolio Visibility</h4>
                          <p className="text-xs text-white/50">Control who can see your media assets.</p>
                        </div>
                        <select
                          value={privacy.portfolioVisibility}
                          onChange={(e) => handlePortfolioVisibilityChange(e.target.value as PortfolioVisibility)}
                          disabled={savingPrivacyField === 'portfolioVisibility'}
                          className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-sm text-white focus:outline-none focus:border-gold disabled:opacity-50"
                        >
                          <option value="public">Everyone</option>
                          <option value="connections">Connections Only</option>
                          <option value="private">Private</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Account Security — Active Sessions is real (GET/POST
                      /v1/auth/sessions); 2FA has no live endpoint. */}
                  <div className="relative glass-panel p-6 space-y-6">
                    <h3 className="text-lg font-bold border-b border-white/10 pb-4">Account Security</h3>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-bold text-sm">Two-Factor Authentication (2FA)</h4>
                          <p className="text-xs text-white/50">Add an extra layer of security to your account.</p>
                        </div>
                        <span className="bg-gold text-black px-2 py-1 rounded text-[9px] font-bold uppercase tracking-widest">Coming Soon</span>
                      </div>

                      <div>
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-bold text-sm">Active Sessions</h4>
                            <p className="text-xs text-white/50">Manage devices logged into your account.</p>
                          </div>
                          <button onClick={handleViewSessions} className="text-xs text-gold hover:underline">
                            {showSessions ? 'Hide' : 'View All'}
                          </button>
                        </div>
                        {showSessions && (
                          <div className="mt-4 space-y-2">
                            {sessionsLoading && [0, 1].map((i) => <ScaffoldRow key={i} className="h-14" />)}
                            {!sessionsLoading && sessions?.map((s) => (
                              <div key={s.sessionId} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                                <div>
                                  <div className="text-xs font-bold flex items-center gap-2">
                                    {s.deviceLabel || 'Unknown device'}
                                    {s.isCurrent && <span className="text-emerald-400 text-[9px] uppercase tracking-widest">This device</span>}
                                  </div>
                                  <div className="text-[10px] text-white/40">Signed in {new Date(s.createdAt).toLocaleDateString()}</div>
                                </div>
                                {!s.isCurrent && (
                                  <button onClick={() => handleRevokeSession(s.sessionId)} className="text-[10px] text-crimson hover:underline uppercase tracking-widest">
                                    Revoke
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-bold text-sm">Green ID Verification</h4>
                          <p className="text-xs text-white/50">Account-tier trust status.</p>
                        </div>
                        {authProfile?.kycStatus === 'verified' ? (
                          <span className="bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded text-[10px] text-emerald-400 font-bold">Verified</span>
                        ) : (
                          <MissingInfo text={authProfile?.kycStatus ? `KYC: ${authProfile.kycStatus}` : 'KYC not started'} />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Data & Transactions — no live endpoint for either
                      action below; both added to doc/API_REQUIREMENTS.md. */}
                  <div className="glass-panel p-6 lg:col-span-2 space-y-6">
                    <h3 className="text-lg font-bold border-b border-white/10 pb-4">Data & Transactions</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex gap-4 items-start">
                        <div className="p-3 bg-white/5 rounded-xl shrink-0">
                          <Lock size={20} className="text-gold" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm mb-1">End-to-End Encryption</h4>
                          <p className="text-xs text-white/60">All your direct messages and contract negotiations are encrypted and secure.</p>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start">
                        <div className="p-3 bg-white/5 rounded-xl shrink-0">
                          <ShieldCheck size={20} className="text-emerald-400" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm mb-1">Secure Escrow Payments</h4>
                          <p className="text-xs text-white/60">Funds are held safely in escrow until services are delivered and approved.</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex justify-end gap-4">
                      <button disabled className="text-xs text-white/20 cursor-not-allowed" title="Coming soon — no data-export endpoint yet">Download My Data</button>
                      <button disabled className="text-xs text-white/20 cursor-not-allowed" title="Coming soon — no account-deletion endpoint yet">Delete Account</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                {/* No activity feed, analytics, or achievements API exists yet
                    — this used to show invented contracts/connections/scores
                    as if real. Scaffolded like every other no-live-data
                    section instead. */}
                <div className="lg:col-span-2 space-y-8">
                  <div className="relative glass-panel-orange p-8">
                    <ComingSoonTag />
                    <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
                    <div className="space-y-4">
                      {[0, 1, 2].map((i) => (
                        <div key={i} className="flex gap-4 items-start">
                          <ScaffoldRow className="h-8 w-8 rounded-full shrink-0" />
                          <div className="flex-1 space-y-2">
                            <ScaffoldRow className="h-4 w-2/3" />
                            <ScaffoldRow className="h-3 w-1/3" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="relative glass-panel-green p-8">
                    <ComingSoonTag />
                    <h3 className="text-xl font-bold mb-6">Growth Tracking</h3>
                    <ScaffoldRow className="h-48" />
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="relative glass-panel p-6 bg-gradient-to-br from-gold/10 to-transparent border-gold/20">
                    <ComingSoonTag />
                    <div className="flex items-center gap-2 mb-4 text-gold">
                      <Zap size={18} />
                      <h3 className="font-bold">Smart AI Tip</h3>
                    </div>
                    <ScaffoldRow className="h-4 w-full mb-2" />
                    <ScaffoldRow className="h-4 w-3/4" />
                  </div>

                  <div className="relative glass-panel p-6">
                    <ComingSoonTag />
                    <h3 className="font-bold mb-4 flex items-center gap-2"><Trophy size={16} className="text-gold" /> Achievements</h3>
                    <div className="space-y-4">
                      {[0, 1, 2].map((i) => (
                        <div key={i}>
                          <ScaffoldRow className="h-3 w-24 mb-2" />
                          <ScaffoldRow className="h-1 w-full" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'projects' && (
              <motion.div key="projects" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="glass-panel p-12 text-center max-w-2xl mx-auto bg-gradient-to-br from-gold/10 to-transparent border-gold/20">
                  <Briefcase className="mx-auto mb-6 text-gold" size={40} />
                  <h2 className="text-2xl font-bold mb-4">{profile.type === 'artist' ? 'My Projects' : 'Active Productions'} — Coming Soon</h2>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {profile.type === 'artist'
                      ? 'A real list of the projects you\'re currently working on, pulled from confirmed bookings and accepted applications, with status and progress tracked automatically.'
                      : 'A real production dashboard for everything you\'re currently running, with status and progress tracked automatically instead of managed by hand.'}
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === 'finances' && (
              <motion.div
                key="finances"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: 'Total Earnings', icon: Wallet },
                    { label: 'Pending Payments', icon: Clock },
                    { label: 'Active Contracts', icon: ShieldCheck },
                  ].map((stat, i) => (
                    <div key={i} className="relative glass-panel p-6">
                      <ComingSoonTag />
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-white/5 rounded-xl">
                          <stat.icon className="text-gold" size={24} />
                        </div>
                      </div>
                      <div className="text-2xl font-bold mb-1">xxx</div>
                      <div className="text-xs text-white/40 uppercase tracking-widest">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <div className="relative glass-panel-blue p-8">
                  <ComingSoonTag />
                  <h3 className="text-xl font-bold mb-6">Transaction History</h3>
                  <div className="space-y-4">
                    {[0, 1, 2].map((i) => (
                      <ScaffoldRow key={i} className="h-16" />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'network' && (
              <motion.div
                key="network"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold">My Network</h3>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-400 flex items-center gap-2">
                    <ShieldCheck size={14} /> Live from SosrG
                  </span>
                </div>

                {conversationsLoading && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[0, 1, 2, 3].map((i) => (
                      <ScaffoldRow key={i} className="h-48" />
                    ))}
                  </div>
                )}

                {!conversationsLoading && conversationsError && (
                  <div className="glass-panel p-8 text-center text-sm text-white/60">{conversationsError}</div>
                )}

                {!conversationsLoading && !conversationsError && (conversations?.length ?? 0) === 0 && (
                  <div className="glass-panel p-12 text-center">
                    <Users className="mx-auto mb-4 text-white/20" size={40} />
                    <h4 className="font-bold mb-2">No connections yet</h4>
                    <p className="text-white/40 text-sm max-w-sm mx-auto">
                      Your network is built from real conversations — message someone through a casting call or job posting to start one.
                    </p>
                  </div>
                )}

                {!conversationsLoading && !conversationsError && (conversations?.length ?? 0) > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {conversations!.map((conv) => {
                      const other = conv.participants?.[0];
                      return (
                        <div key={conv.id} className="glass-panel p-6 text-center hover:border-gold/50 transition-all group">
                          <div className="relative w-20 h-20 mx-auto mb-4">
                            {other?.profileImagePath ? (
                              <img src={other.profileImagePath} alt={other.displayName ?? 'SosrG member'} className="w-full h-full rounded-full object-cover border-2 border-white/10 group-hover:border-gold transition-colors" />
                            ) : (
                              <div className="w-full h-full rounded-full bg-white/10 border-2 border-white/10 flex items-center justify-center text-lg font-bold">
                                {(other?.displayName ?? '?').slice(0, 2).toUpperCase()}
                              </div>
                            )}
                          </div>
                          <h4 className="font-bold text-sm mb-1">{other?.displayName ?? 'SosrG member'}</h4>
                          {other?.username && <p className="text-[10px] text-white/40 uppercase tracking-widest mb-4">@{other.username}</p>}
                          <button
                            onClick={() => show('Opening a full conversation isn\'t wired up here yet.', 'info')}
                            className="w-full py-2 bg-white/5 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-gold hover:text-black transition-all"
                          >
                            Message
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'counselling' && (
              <motion.div
                key="counselling"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="relative glass-panel-green p-12 text-center bg-gradient-to-br from-gold/10 to-transparent">
                  <ComingSoonTag />
                  <GraduationCap className="mx-auto mb-8 text-gold" size={60} />
                  <h2 className="text-3xl font-bold mb-4">AI Career Counselling</h2>
                  <p className="text-white/40 max-w-2xl mx-auto mb-10">
                    Personalized career roadmaps for the Indian Art industries. Powered by real-time market data and industry trends.
                  </p>
                  <div className="max-w-3xl mx-auto space-y-6">
                    <div className="bg-black/30 border border-white/10 rounded-2xl p-8 text-left">
                      <h4 className="font-bold mb-4 flex items-center gap-2 text-gold"><Zap size={18} /> Career Roadmap AI</h4>
                      <ScaffoldRow className="h-16 mb-6" />
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <ScaffoldRow className="h-16" />
                        <ScaffoldRow className="h-16" />
                        <ScaffoldRow className="h-16" />
                      </div>
                    </div>
                    <button
                      onClick={() => show('Career reports are coming soon.', 'info')}
                      className="w-full bg-gold text-black py-4 rounded-xl font-bold uppercase tracking-widest hover:scale-[1.02] transition-transform"
                    >
                      Generate Full Career Report
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'management' && (
              <motion.div
                key="management"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-8">
                    <div className="relative glass-panel-pink p-8">
                      <ComingSoonTag />
                      <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                          <Settings className="text-gold" /> Active Task Tracking
                        </h3>
                        <div className="flex gap-2">
                          <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full font-bold uppercase tracking-widest">xxxxx Active</span>
                          <span className="text-[10px] bg-crimson/10 text-crimson px-2 py-1 rounded-full font-bold uppercase tracking-widest">xxxxx Overdue</span>
                        </div>
                      </div>
                      <div className="space-y-4">
                        {[0, 1, 2].map((i) => (
                          <ScaffoldRow key={i} className="h-16" />
                        ))}
                      </div>
                    </div>

                    <div className="relative glass-panel-purple p-8">
                      <ComingSoonTag />
                      <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                        <Lock className="text-gold" /> Payment Milestone Lock
                      </h3>
                      <div className="space-y-6">
                        {[0, 1, 2].map((i) => (
                          <ScaffoldRow key={i} className="h-14" />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="relative glass-panel p-6 bg-gradient-to-br from-crimson/10 to-transparent border-crimson/20">
                      <ComingSoonTag />
                      <div className="flex items-center gap-2 mb-4 text-crimson">
                        <AlertCircle size={18} />
                        <h3 className="font-bold">Deadline Alerts</h3>
                      </div>
                      <div className="space-y-4">
                        <ScaffoldRow className="h-20" />
                      </div>
                    </div>

                    <div className="relative glass-panel p-6">
                      <ComingSoonTag />
                      <h3 className="font-bold mb-4 flex items-center gap-2"><TrendingUp size={16} className="text-gold" /> Productivity AI</h3>
                      <div className="text-center py-4">
                        <div className="text-4xl font-bold text-gold mb-2">xxxxx</div>
                        <p className="text-[10px] text-white/40 uppercase tracking-widest">Efficiency Score</p>
                        <div className="mt-6 space-y-2">
                          <div className="flex justify-between text-[10px] uppercase tracking-widest">
                            <span>Tasks Completed</span>
                            <span>xxxxx</span>
                          </div>
                          <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                            <div className="bg-gold h-full" style={{ width: '0%' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'portfolio' && (
              <motion.div
                key="portfolio"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative space-y-6"
              >
                <ComingSoonTag />
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold">Portfolio Manager</h3>
                  <button
                    onClick={() => show('Uploading and organising media here is coming soon — use Media Gallery in Profile Details for now.', 'info')}
                    className="bg-gold text-black px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors flex items-center gap-2"
                  >
                    <Plus size={14} /> Add Media
                  </button>
                </div>
                <p className="text-white/40 text-sm max-w-2xl">
                  A dedicated space to organise showreels, headshots, and clips into collections — with
                  reordering, cover selection, and per-item visibility — instead of the flat list Media
                  Gallery shows today.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[0, 1, 2].map((i) => (
                    <ScaffoldRow key={i} className="aspect-video" />
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'auditions' && (
              <motion.div key="auditions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative space-y-6">
                <ComingSoonTag />
                <h2 className="text-2xl font-bold">Auditions Applied</h2>
                <p className="text-white/40 text-sm max-w-2xl">
                  A single tracked list of every audition you've applied to — role, project, and where it
                  stands (pending, shortlisted, rejected) — pulled directly from your real casting
                  applications instead of you having to check each casting call individually.
                </p>
                <div className="space-y-4">
                  {[0, 1, 2, 3].map((i) => (
                    <ScaffoldRow key={i} className="h-20" />
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'availability' && (
              <motion.div key="availability" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative space-y-6">
                <ComingSoonTag />
                <h2 className="text-2xl font-bold">Availability Calendar</h2>
                <p className="text-white/40 text-sm max-w-2xl">
                  A real calendar of when you're free to work, kept in sync with your booked jobs, so
                  casting directors and clients can see your availability before reaching out instead of
                  guessing or asking directly.
                </p>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 35 }).map((_, i) => (
                    <ScaffoldRow key={i} className="aspect-square" />
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'ai-insights' && (
              <motion.div key="ai-insights" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative space-y-6">
                <ComingSoonTag />
                <h2 className="text-2xl font-bold">AI Match Suggestions</h2>
                <p className="text-white/40 text-sm max-w-2xl">
                  Roles and collaborations matched to your actual profile and skills, plus a skill-gap
                  analysis showing what to add to appear in more searches — real recommendations from a
                  real matching model, not a static demo.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[0, 1, 2, 3].map((i) => (
                    <ScaffoldRow key={i} className="h-24" />
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'casting' && (
              <motion.div key="casting" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative space-y-6">
                <ComingSoonTag />
                <h2 className="text-2xl font-bold">Casting Panel</h2>
                <p className="text-white/40 text-sm max-w-2xl">
                  Where you'll create and manage casting calls directly from your business profile, and
                  track real applicants against each open role, instead of using the general Casting page alone.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[0, 1, 2].map((i) => (
                    <ScaffoldRow key={i} className="h-32" />
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'budget' && (
              <motion.div key="budget" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative space-y-6">
                <ComingSoonTag />
                <h2 className="text-2xl font-bold">Budget Manager</h2>
                <p className="text-white/40 text-sm max-w-2xl">
                  Real allocated/spent/remaining tracking per production, tied to actual bookings and
                  payments instead of a static summary.
                </p>
                <div className="space-y-4">
                  {[0, 1, 2, 3].map((i) => (
                    <ScaffoldRow key={i} className="h-16" />
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'workflow' && (
              <motion.div key="workflow" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative space-y-6">
                <ComingSoonTag />
                <h2 className="text-2xl font-bold">Workflow Tracker</h2>
                <p className="text-white/40 text-sm max-w-2xl">
                  A real pre-production → production → post-production → distribution pipeline view per
                  project, reflecting actual milestones instead of a fixed demo stage.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[0, 1, 2, 3].map((i) => (
                    <ScaffoldRow key={i} className="h-28" />
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'legal' && (
              <motion.div key="legal" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative space-y-6">
                <ComingSoonTag />
                <h2 className="text-2xl font-bold">Contracts Vault</h2>
                <p className="text-white/40 text-sm max-w-2xl">
                  Where NDA/contract generation, IP timestamping, and your active contracts will live —
                  real legal documents tied to your real bookings, not the AI-generated blockchain-badge
                  claims the old build made without anything behind them.
                </p>
                <div className="space-y-4">
                  {[0, 1, 2, 3].map((i) => (
                    <ScaffoldRow key={i} className="h-16" />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {/* Real Edit Profile forms — PATCH /v1/profiles/me and
          /v1/profiles/me/details, both live. Styled to match this page's
          existing dark modal (CastingEcosystem's Apply modal uses the same
          pattern) rather than the cream design-system Modal, which would
          look out of place on this still-dark page. */}
      <AnimatePresence>
        {editingBasic && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
            onMouseDown={(e) => { if (e.target === e.currentTarget) setEditingBasic(false); }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-cinematic-gray border border-white/10 w-full max-w-lg rounded-3xl p-8 shadow-2xl"
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold">Edit Profile</h2>
                <button onClick={() => setEditingBasic(false)} className="text-white/40 hover:text-white p-2"><X size={20} /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-white/60 block mb-2">Display Name</label>
                  <input
                    value={basicForm.displayName}
                    onChange={(e) => setBasicForm((f) => ({ ...f, displayName: e.target.value }))}
                    className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-white/60 block mb-2">Headline</label>
                  <input
                    value={basicForm.headline}
                    onChange={(e) => setBasicForm((f) => ({ ...f, headline: e.target.value }))}
                    placeholder="e.g. Lead Actor & Voice Artist"
                    className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-white/60 block mb-2">Bio</label>
                  <textarea
                    value={basicForm.bio}
                    onChange={(e) => setBasicForm((f) => ({ ...f, bio: e.target.value }))}
                    rows={4}
                    className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-gold"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-white/60 block mb-2">Pincode</label>
                    <input
                      value={basicForm.pincode}
                      onChange={(e) => setBasicForm((f) => ({ ...f, pincode: e.target.value }))}
                      maxLength={6}
                      className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-white/60 block mb-2">Website</label>
                    <input
                      value={basicForm.websiteUrl}
                      onChange={(e) => setBasicForm((f) => ({ ...f, websiteUrl: e.target.value }))}
                      placeholder="https://…"
                      className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-gold"
                    />
                  </div>
                </div>
                <div className="flex gap-4 pt-2">
                  <button onClick={() => setEditingBasic(false)} className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-xl font-bold uppercase tracking-widest text-sm transition-colors">
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveBasic}
                    disabled={savingBasic}
                    className="flex-1 py-3 bg-gold text-black hover:bg-white rounded-xl font-bold uppercase tracking-widest text-sm transition-colors disabled:opacity-50"
                  >
                    {savingBasic ? 'Saving…' : 'Save'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {editingDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
            onMouseDown={(e) => { if (e.target === e.currentTarget) setEditingDetails(false); }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-cinematic-gray border border-white/10 w-full max-w-lg rounded-3xl p-8 shadow-2xl"
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold">Edit Physical Attributes</h2>
                <button onClick={() => setEditingDetails(false)} className="text-white/40 hover:text-white p-2"><X size={20} /></button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-white/60 block mb-2">Height (cm)</label>
                    <input
                      type="number"
                      value={detailsForm.heightCm}
                      onChange={(e) => setDetailsForm((f) => ({ ...f, heightCm: e.target.value }))}
                      className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-white/60 block mb-2">Weight (kg)</label>
                    <input
                      type="number"
                      value={detailsForm.weightKg}
                      onChange={(e) => setDetailsForm((f) => ({ ...f, weightKg: e.target.value }))}
                      className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-white/60 block mb-2">Eye Color</label>
                    <input
                      value={detailsForm.eyeColor}
                      onChange={(e) => setDetailsForm((f) => ({ ...f, eyeColor: e.target.value }))}
                      className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-white/60 block mb-2">Hair Color</label>
                    <input
                      value={detailsForm.hairColor}
                      onChange={(e) => setDetailsForm((f) => ({ ...f, hairColor: e.target.value }))}
                      className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-gold"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-white/60 block mb-2">Years of Experience</label>
                  <input
                    type="number"
                    value={detailsForm.yearsExperience}
                    onChange={(e) => setDetailsForm((f) => ({ ...f, yearsExperience: e.target.value }))}
                    className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-gold"
                  />
                </div>
                <p className="text-[10px] text-white/30">
                  Experience Categories, Comfort Declaration, and Availability aren't editable here yet — those fields don't exist in the profile API at all (see doc/API_REQUIREMENTS.md).
                </p>
                <div className="flex gap-4 pt-2">
                  <button onClick={() => setEditingDetails(false)} className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-xl font-bold uppercase tracking-widest text-sm transition-colors">
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveDetails}
                    disabled={savingDetails}
                    className="flex-1 py-3 bg-gold text-black hover:bg-white rounded-xl font-bold uppercase tracking-widest text-sm transition-colors disabled:opacity-50"
                  >
                    {savingDetails ? 'Saving…' : 'Save'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
