import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  Briefcase,
  Gavel,
  ShoppingBag,
  Wallet,
  MessageSquare,
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
  ChevronDown,
  UserX
} from 'lucide-react';
import { cn } from '../lib/utils';
import type { Section, ProfileType, ExperienceLevel } from '../types';
import { useToast } from '../design-system';
import { useAuth } from '../contexts/AuthContext';
import { profilesService } from '../services/profiles';
import type { ContactVisibility, PortfolioVisibility, BlockedProfile, MutedProfile, KycDocument, KycDocumentType, Profession } from '../services/profiles';
import { authService } from '../services/auth';
import type { AuthSession } from '../services/auth';
import { mediaService, getAssetContentUrl } from '../services/media';
import { messagingService } from '../services/messaging';
import type { Conversation, Message } from '../services/messaging';
import { portfoliosService } from '../services/portfolios';
import type { Portfolio, PortfolioDetail } from '../services/portfolios';
import { castingService } from '../services/casting';
import type { Audition, AuditionType, MyCastingApplication } from '../services/casting';
import { jobsService } from '../services/jobs';
import type { MyJobApplication } from '../services/jobs';
import { ApiError } from '../services/httpClient';
import { communityService } from '../services/community';
import type { ContentShare } from '../services/community';
import { ContentShareCard } from '../components/community/ContentShareCard';
import { ContentShareComposer } from '../components/community/ContentShareComposer';
import { ContentShareEditPanel } from '../components/community/ContentShareEditPanel';
import { ScaffoldRow, ComingSoonTag } from '../components/ScaffoldUI';
import { HoverGlowPanel } from '../components/ui/hover-effect';
import { PasswordInput } from '../components/common/PasswordInput';
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

// Inline-edit counterpart to ProfileField — same micro-label-over-value
// layout as the read view, so editing a field doesn't switch into a
// separate "form" look, it just makes the same value box typeable.
const EditableField = ({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  maxLength?: number;
}) => (
  <div>
    <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">{label}</div>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      maxLength={maxLength}
      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 font-bold text-sm text-white outline-none focus:border-gold focus:bg-black/30 transition-colors placeholder:font-normal placeholder:text-white/30"
    />
  </div>
);

const EditableTextarea = ({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) => (
  <div>
    <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">{label}</div>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/90 leading-relaxed outline-none focus:border-gold focus:bg-black/30 transition-colors placeholder:text-white/30 placeholder:italic resize-none"
    />
  </div>
);

// Collapsible sub-section for the Privacy & Security tab — it was about to
// grow four new blocks (blocked/muted, KYC, password, danger zone) on top
// of the two always-open panels above, so these stay collapsed until opened
// rather than turning the tab into a wall of forms.
const AccordionSection = ({
  title,
  icon: Icon,
  isOpen,
  onToggle,
  danger,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  isOpen: boolean;
  onToggle: () => void;
  danger?: boolean;
  children: React.ReactNode;
}) => (
  <div className={cn('glass-panel overflow-hidden', danger && 'border border-crimson/30')}>
    <button
      type="button"
      onClick={onToggle}
      className="w-full flex items-center justify-between p-6 text-left"
    >
      <h3 className={cn('text-lg font-bold flex items-center gap-2', danger && 'text-crimson')}>
        <Icon size={18} className={danger ? 'text-crimson' : 'text-gold'} /> {title}
      </h3>
      <ChevronDown size={18} className={cn('text-white/40 transition-transform', isOpen && 'rotate-180')} />
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="overflow-hidden"
        >
          <div className="px-6 pb-6 space-y-4">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
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
  const { show } = useToast();
  const { profile: authProfile, refreshProfile } = useAuth();
  const navigate = useNavigate();

  // The Actor/Model Advanced Module (physical attributes, playing age, etc.)
  // only makes sense for that profession — initialType only distinguishes
  // artist vs. business (see MyProfilePage), not which profession within
  // "artist", so it's checked separately here against the real profession
  // data instead of assuming every creator account is an actor/model.
  const isActorOrModel = authProfile?.professions?.some((p) => /actor|model/i.test(p.name)) ?? false;

  // Privacy & Security tab — wired to the real Profiles/Auth APIs. Current
  // values are seeded from GET /v1/profiles/me's nested `.privacy` (see
  // doc/API_REQUIREMENTS.md §2.4a for the correction: an earlier version of
  // this comment wrongly claimed no GET existed for these). 2FA and data
  // export genuinely have no live endpoint (§2.4d); account deletion does
  // (POST /v1/auth/account-deletion) and is wired below in the Danger Zone.
  const [isDiscoverable, setIsDiscoverable] = useState(authProfile?.isDiscoverable ?? true);
  const [privacy, setPrivacy] = useState<{ contactVisibility: ContactVisibility; portfolioVisibility: PortfolioVisibility }>({
    contactVisibility: authProfile?.privacy?.contactVisibility ?? 'private',
    portfolioVisibility: authProfile?.privacy?.portfolioVisibility ?? 'public',
  });
  const [savingPrivacyField, setSavingPrivacyField] = useState<string | null>(null);
  const [sessions, setSessions] = useState<AuthSession[] | null>(null);
  const [sessionsLoading, setSessionsLoading] = useState(false);
  const [showSessions, setShowSessions] = useState(false);

  // New Privacy & Security sub-sections — each collapsed by default, only
  // fetches its data the first time it's opened (same lazy pattern as
  // Sessions above).
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [blockedList, setBlockedList] = useState<BlockedProfile[] | null>(null);
  const [mutedList, setMutedList] = useState<MutedProfile[] | null>(null);
  const [blockedMutedLoading, setBlockedMutedLoading] = useState(false);
  const [kycDocs, setKycDocs] = useState<KycDocument[] | null>(null);
  const [kycLoading, setKycLoading] = useState(false);
  const [kycUploadType, setKycUploadType] = useState<KycDocumentType>('id_proof');
  const [kycUploading, setKycUploading] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ current: '', next: '' });
  const [changingPassword, setChangingPassword] = useState(false);
  const [loggingOutAll, setLoggingOutAll] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [deletingAccount, setDeletingAccount] = useState(false);

  const toggleSection = (section: string) => {
    const next = openSection === section ? null : section;
    setOpenSection(next);
    if (next === 'blocked-muted' && !blockedList) {
      setBlockedMutedLoading(true);
      Promise.all([profilesService.listBlocked(), profilesService.listMuted()])
        .then(([blocked, muted]) => {
          setBlockedList(blocked);
          setMutedList(muted);
        })
        .catch((err) => show(err instanceof ApiError ? err.message : 'Could not load blocked/muted profiles.', 'error'))
        .finally(() => setBlockedMutedLoading(false));
    }
    if (next === 'kyc' && !kycDocs) {
      setKycLoading(true);
      profilesService
        .listKycDocuments()
        .then(setKycDocs)
        .catch((err) => show(err instanceof ApiError ? err.message : 'Could not load documents.', 'error'))
        .finally(() => setKycLoading(false));
    }
  };

  const handleUnblock = async (profileId: string) => {
    try {
      await profilesService.unblockProfile(profileId);
      setBlockedList((prev) => prev?.filter((p) => p.id !== profileId) ?? null);
      show('Unblocked.', 'success');
    } catch (err) {
      show(err instanceof ApiError ? err.message : 'Could not unblock.', 'error');
    }
  };

  const handleUnmute = async (profileId: string) => {
    try {
      await profilesService.unmuteProfile(profileId);
      setMutedList((prev) => prev?.filter((p) => p.id !== profileId) ?? null);
      show('Unmuted.', 'success');
    } catch (err) {
      show(err instanceof ApiError ? err.message : 'Could not unmute.', 'error');
    }
  };

  const handleKycUpload = async (file: File) => {
    setKycUploading(true);
    try {
      const uploaded = await mediaService.uploadFile(file, 'kyc_document', 'document');
      const doc = await profilesService.submitKycDocument(kycUploadType, uploaded.storageObjectId);
      setKycDocs((prev) => [...(prev ?? []), doc]);
      show('Document submitted for verification.', 'success');
    } catch (err) {
      show(err instanceof ApiError ? err.message : 'Could not upload document.', 'error');
    } finally {
      setKycUploading(false);
    }
  };

  const handleDeleteKycDocument = async (documentId: string) => {
    try {
      await profilesService.deleteKycDocument(documentId);
      setKycDocs((prev) => prev?.filter((d) => d.id !== documentId) ?? null);
      show('Document removed.', 'success');
    } catch (err) {
      show(err instanceof ApiError ? err.message : 'Could not remove document.', 'error');
    }
  };

  const handleChangePassword = async () => {
    if (passwordForm.next.length < 12) {
      show('New password must be at least 12 characters.', 'error');
      return;
    }
    setChangingPassword(true);
    try {
      await authService.changePassword(passwordForm.current, passwordForm.next);
      setPasswordForm({ current: '', next: '' });
      show('Password changed.', 'success');
    } catch (err) {
      show(err instanceof ApiError ? err.message : 'Could not change password.', 'error');
    } finally {
      setChangingPassword(false);
    }
  };

  const handleLogoutAllDevices = async () => {
    setLoggingOutAll(true);
    try {
      await authService.logoutAllDevices();
      show('Logged out of every device — you\'ll need to sign in again here too.', 'success');
      onLogout?.();
    } catch (err) {
      show(err instanceof ApiError ? err.message : 'Could not log out other devices.', 'error');
      setLoggingOutAll(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      show('Enter your password to confirm.', 'error');
      return;
    }
    setDeletingAccount(true);
    try {
      await authService.deleteAccount(deletePassword);
      show('Account deleted.', 'success');
      onLogout?.();
    } catch (err) {
      show(err instanceof ApiError ? err.message : 'Could not delete account.', 'error');
      setDeletingAccount(false);
    }
  };

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
      show('My Clips visibility updated.', 'success');
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
  const [basicForm, setBasicForm] = useState({ displayName: '', headline: '', bio: '', pincode: '', websiteUrl: '', dateOfBirth: '', genderIdentity: '' });
  const [savingBasic, setSavingBasic] = useState(false);

  const openBasicEdit = () => {
    if (!authProfile) return;
    setBasicForm({
      displayName: authProfile.displayName ?? '',
      headline: authProfile.headline ?? '',
      bio: authProfile.bio ?? '',
      pincode: authProfile.pincode ?? '',
      websiteUrl: authProfile.websiteUrl ?? '',
      dateOfBirth: authProfile.dateOfBirth ? authProfile.dateOfBirth.slice(0, 10) : '',
      genderIdentity: authProfile.genderIdentity ?? '',
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
        dateOfBirth: basicForm.dateOfBirth || null,
        genderIdentity: basicForm.genderIdentity || null,
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

  // Second profession / "other interest" — PUT /v1/profiles/me/professions,
  // curl-verified live: takes the full professionIds list plus which one is
  // primary. The primary profession (set at signup) is kept as-is; this
  // just adds a second entry from the same catalogue GET /v1/professions
  // already uses at signup.
  const [professionCatalogue, setProfessionCatalogue] = useState<Profession[]>([]);
  const [editingSecondProfession, setEditingSecondProfession] = useState(false);
  const [secondProfessionId, setSecondProfessionId] = useState('');
  const [savingSecondProfession, setSavingSecondProfession] = useState(false);

  const openSecondProfessionEdit = () => {
    if (professionCatalogue.length === 0) {
      profilesService.getProfessions().then(setProfessionCatalogue).catch(() => setProfessionCatalogue([]));
    }
    setSecondProfessionId(String(authProfile?.professions?.[1]?.id ?? ''));
    setEditingSecondProfession(true);
  };

  const handleSaveSecondProfession = async () => {
    const primaryId = authProfile?.professions?.[0]?.id;
    if (!primaryId || !secondProfessionId) return;
    setSavingSecondProfession(true);
    try {
      await profilesService.updateProfessions({
        professionIds: [primaryId, Number(secondProfessionId)],
        primaryProfessionId: primaryId,
      });
      await refreshProfile();
      show('Second profession added.', 'success');
      setEditingSecondProfession(false);
    } catch (err) {
      show(err instanceof ApiError ? err.message : 'Could not save second profession.', 'error');
    } finally {
      setSavingSecondProfession(false);
    }
  };

  // Business Profile panel's own scoped edit — each panel edits only its
  // own displayed content, not the whole Basic Information form. websiteUrl
  // is a real PATCH /v1/profiles/me field, same one Basic Information's
  // edit form writes to; this just gives Business Profile its own inline
  // control instead of routing through that unrelated form.
  const [editingWebsite, setEditingWebsite] = useState(false);
  const [websiteForm, setWebsiteForm] = useState('');
  const [savingWebsite, setSavingWebsite] = useState(false);

  const openWebsiteEdit = () => {
    setWebsiteForm(authProfile?.websiteUrl ?? '');
    setEditingWebsite(true);
  };

  const handleSaveWebsite = async () => {
    setSavingWebsite(true);
    try {
      await profilesService.updateProfile({ websiteUrl: websiteForm || null });
      await refreshProfile();
      show('Website updated.', 'success');
      setEditingWebsite(false);
    } catch (err) {
      show(err instanceof ApiError ? err.message : 'Could not save website.', 'error');
    } finally {
      setSavingWebsite(false);
    }
  };

  // Avatar photo — profileImageAssetId is a real UpdateProfileDto field
  // that had no upload UI anywhere; reuses the same reserve-upload/PATCH
  // pattern as the KYC document uploader above.
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const handleAvatarUpload = async (file: File) => {
    setUploadingAvatar(true);
    try {
      const uploaded = await mediaService.uploadFile(file, 'profile_photo', 'image');
      await profilesService.updateProfile({ profileImageAssetId: uploaded.assetId });
      await refreshProfile();
      show('Profile photo updated.', 'success');
    } catch (err) {
      show(err instanceof ApiError ? err.message : 'Could not upload photo.', 'error');
    } finally {
      setUploadingAvatar(false);
    }
  };

  const [editingDetails, setEditingDetails] = useState(false);
  const [detailsForm, setDetailsForm] = useState({
    heightCm: '', weightKg: '', eyeColor: '', hairColor: '', yearsExperience: '',
    chestCm: '', waistCm: '', hipsCm: '', shoeSize: '', skinTone: '',
    playingAgeMin: '', playingAgeMax: '', travelReady: false, passportAvailable: false,
  });
  const [savingDetails, setSavingDetails] = useState(false);

  const openDetailsEdit = () => {
    if (!authProfile) return;
    const d = authProfile.details;
    setDetailsForm({
      heightCm: d.heightCm != null ? String(d.heightCm) : '',
      weightKg: d.weightKg != null ? String(d.weightKg) : '',
      eyeColor: d.eyeColor ?? '',
      hairColor: d.hairColor ?? '',
      yearsExperience: authProfile.yearsExperience != null ? String(authProfile.yearsExperience) : '',
      chestCm: d.chestCm != null ? String(d.chestCm) : '',
      waistCm: d.waistCm != null ? String(d.waistCm) : '',
      hipsCm: d.hipsCm != null ? String(d.hipsCm) : '',
      shoeSize: d.shoeSize ?? '',
      skinTone: d.skinTone ?? '',
      playingAgeMin: d.playingAgeMin != null ? String(d.playingAgeMin) : '',
      playingAgeMax: d.playingAgeMax != null ? String(d.playingAgeMax) : '',
      travelReady: d.travelReady ?? false,
      passportAvailable: d.passportAvailable ?? false,
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
        chestCm: detailsForm.chestCm ? Number(detailsForm.chestCm) : undefined,
        waistCm: detailsForm.waistCm ? Number(detailsForm.waistCm) : undefined,
        hipsCm: detailsForm.hipsCm ? Number(detailsForm.hipsCm) : undefined,
        shoeSize: detailsForm.shoeSize || undefined,
        skinTone: detailsForm.skinTone || undefined,
        playingAgeMin: detailsForm.playingAgeMin ? Number(detailsForm.playingAgeMin) : undefined,
        playingAgeMax: detailsForm.playingAgeMax ? Number(detailsForm.playingAgeMax) : undefined,
        travelReady: detailsForm.travelReady,
        passportAvailable: detailsForm.passportAvailable,
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

  // Message thread — GET/POST .../messages and POST .../read, all real.
  // Starting a brand-new conversation isn't wired anywhere in this app: it
  // requires the two profiles to already be "connected" (403 without it,
  // curl-verified), and there's no connections/follow endpoint in the API
  // to satisfy that — so only conversations that already exist can be
  // opened here.
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [threadMessages, setThreadMessages] = useState<Message[] | null>(null);
  const [threadLoading, setThreadLoading] = useState(false);
  const [messageDraft, setMessageDraft] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);

  const handleOpenConversation = (conv: Conversation) => {
    setActiveConversation(conv);
    setThreadMessages(null);
    setThreadLoading(true);
    messagingService
      .getMessages(conv.id, { limit: 50 })
      .then((result) => setThreadMessages(result.items))
      .catch((err) => show(err instanceof ApiError ? err.message : 'Could not load messages.', 'error'))
      .finally(() => setThreadLoading(false));
    messagingService.markConversationRead(conv.id).catch(() => {});
  };

  const handleSendMessage = async () => {
    if (!activeConversation || !messageDraft.trim()) return;
    setSendingMessage(true);
    try {
      const sent = await messagingService.sendMessage(activeConversation.id, { body: messageDraft.trim() });
      setThreadMessages((prev) => [...(prev ?? []), sent]);
      setMessageDraft('');
    } catch (err) {
      show(err instanceof ApiError ? err.message : 'Could not send message.', 'error');
    } finally {
      setSendingMessage(false);
    }
  };

  // Media Gallery — Portfolios + Media upload flow, both real, verified
  // live end to end (reserve upload -> PUT content -> create portfolio if
  // none exists yet -> attach as an item).
  const [portfolios, setPortfolios] = useState<Portfolio[] | null>(null);
  const [portfoliosLoading, setPortfoliosLoading] = useState(true);
  const [portfoliosRefreshKey, setPortfoliosRefreshKey] = useState(0);
  const [mediaUploading, setMediaUploading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setPortfoliosLoading(true);
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
  }, [portfoliosRefreshKey]);

  // GET /v1/portfolios/{id} — curl-verified live this session — is the only
  // endpoint that returns each item's mediaAssetId/assetType, so the actual
  // photo/video can be rendered (not just the portfolio's title, which is
  // all listMyPortfolios gives). Fetched separately once the primary
  // portfolio's id is known.
  const [portfolioDetail, setPortfolioDetail] = useState<PortfolioDetail | null>(null);
  const [portfolioDetailLoading, setPortfolioDetailLoading] = useState(false);
  const primaryPortfolioId = portfolios?.[0]?.id;

  useEffect(() => {
    if (!primaryPortfolioId) {
      setPortfolioDetail(null);
      return;
    }
    let cancelled = false;
    setPortfolioDetailLoading(true);
    portfoliosService
      .getPortfolioById(primaryPortfolioId)
      .then((result) => {
        if (!cancelled) setPortfolioDetail(result);
      })
      .catch(() => {
        if (!cancelled) setPortfolioDetail(null);
      })
      .finally(() => {
        if (!cancelled) setPortfolioDetailLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [primaryPortfolioId, portfoliosRefreshKey]);

  const [deletingItemId, setDeletingItemId] = useState<string | null>(null);
  const handleDeleteMediaItem = async (itemId: string) => {
    if (!primaryPortfolioId) return;
    setDeletingItemId(itemId);
    try {
      await portfoliosService.removePortfolioItem(primaryPortfolioId, itemId);
      show('Removed.', 'success');
      setPortfoliosRefreshKey((k) => k + 1);
    } catch (err) {
      show(err instanceof ApiError ? err.message : 'Could not remove item.', 'error');
    } finally {
      setDeletingItemId(null);
    }
  };

  const [sharingPortfolio, setSharingPortfolio] = useState(false);
  const handleSharePortfolio = async () => {
    if (!primaryPortfolioId) return;
    setSharingPortfolio(true);
    try {
      const link = await portfoliosService.createShareLink(primaryPortfolioId);
      const url = `${window.location.origin}/shared/portfolio/${link.shareToken}`;
      await navigator.clipboard.writeText(url);
      show('Share link copied to clipboard.', 'success');
    } catch (err) {
      show(err instanceof ApiError ? err.message : 'Could not create a share link.', 'error');
    } finally {
      setSharingPortfolio(false);
    }
  };

  const handleUploadMedia = async (file: File) => {
    setMediaUploading(true);
    try {
      const assetType = file.type.startsWith('video') ? 'video' : file.type.startsWith('audio') ? 'audio' : 'image';
      const uploaded = await mediaService.uploadFile(file, 'portfolio_item', assetType);

      let portfolioId = portfolios?.[0]?.id;
      if (!portfolioId) {
        const created = await portfoliosService.createPortfolio({ title: `${realProfile?.displayName ?? 'My'} Portfolio`, visibility: 'public' });
        portfolioId = created.id;
      }

      await portfoliosService.addPortfolioItem(portfolioId, {
        itemType: 'media',
        mediaAssetId: uploaded.assetId,
        caption: file.name,
      });
      show('Uploaded.', 'success');
      setPortfoliosRefreshKey((k) => k + 1);
    } catch (err) {
      show(err instanceof ApiError ? err.message : 'Could not upload.', 'error');
    } finally {
      setMediaUploading(false);
    }
  };
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

  // My Applications — combines GET /v1/job-applications/me (curl-verified
  // live) and GET /v1/casting-applications/me (implemented per the
  // published DTO, but 500s server-side on this account — see
  // MyCastingApplication's doc comment). Fetched lazily on first visiting
  // the tab, tracked separately so a casting-side failure doesn't blank out
  // job applications that did load.
  type UnifiedApplication = { id: string; kind: 'casting' | 'job'; title: string; status: string; appliedAt: string };
  const [jobApplications, setJobApplications] = useState<MyJobApplication[] | null>(null);
  const [jobApplicationsError, setJobApplicationsError] = useState<string | null>(null);
  const [castingApplications, setCastingApplications] = useState<MyCastingApplication[] | null>(null);
  const [castingApplicationsError, setCastingApplicationsError] = useState<string | null>(null);
  const [applicationsLoading, setApplicationsLoading] = useState(false);
  const [applicationsLoaded, setApplicationsLoaded] = useState(false);
  const [applicationFilter, setApplicationFilter] = useState<'all' | 'active' | 'shortlisted' | 'selected' | 'rejected' | 'withdrawn'>('all');
  const [withdrawingAppId, setWithdrawingAppId] = useState<string | null>(null);

  useEffect(() => {
    if (activeTab !== 'auditions' || applicationsLoaded) return;
    setApplicationsLoading(true);
    setApplicationsLoaded(true);
    Promise.allSettled([jobsService.listMyJobApplications(), castingService.listMyCastingApplications()]).then(
      ([jobResult, castingResult]) => {
        if (jobResult.status === 'fulfilled') setJobApplications(jobResult.value);
        else setJobApplicationsError(jobResult.reason instanceof ApiError ? jobResult.reason.message : 'Could not load job applications.');

        if (castingResult.status === 'fulfilled') setCastingApplications(castingResult.value);
        else setCastingApplicationsError(castingResult.reason instanceof ApiError ? castingResult.reason.message : 'Could not load casting applications.');

        setApplicationsLoading(false);
      },
    );
  }, [activeTab, applicationsLoaded]);

  // My Shared Videos — the content-sharing feature's own posts, filtered
  // client-side from the community feed (no "my shares" endpoint exists
  // yet server-side, see services/community/apiCommunityService.ts).
  const [myShares, setMyShares] = useState<ContentShare[] | null>(null);
  const [mySharesLoading, setMySharesLoading] = useState(true);
  const [mySharesLoaded, setMySharesLoaded] = useState(false);
  const [mySharesError, setMySharesError] = useState<string>();

  useEffect(() => {
    if (activeTab !== 'my-shared-videos' || mySharesLoaded || !authProfile) return;
    setMySharesLoading(true);
    setMySharesLoaded(true);
    communityService
      .getMyShares(authProfile.id)
      .then(setMyShares)
      .catch((err) => setMySharesError(err instanceof ApiError ? err.message : 'Could not load your shared clips.'))
      .finally(() => setMySharesLoading(false));
  }, [activeTab, mySharesLoaded, authProfile]);

  const [editingShareId, setEditingShareId] = useState<string | null>(null);
  const [deletingShareId, setDeletingShareId] = useState<string | null>(null);

  const handleDeleteShare = async (share: ContentShare) => {
    setDeletingShareId(share.id);
    try {
      await communityService.deleteContentShare(share.id);
      setMyShares((prev) => prev?.filter((s) => s.id !== share.id) ?? null);
      show('Clip deleted.', 'success');
    } catch (err) {
      show(err instanceof ApiError ? err.message : 'Could not delete this clip.', 'error');
    } finally {
      setDeletingShareId(null);
    }
  };

  const unifiedApplications: UnifiedApplication[] = [
    ...(jobApplications ?? []).map((a): UnifiedApplication => ({ id: a.id, kind: 'job', title: a.jobTitle, status: a.status, appliedAt: a.appliedAt })),
    ...(castingApplications ?? []).map((a): UnifiedApplication => ({ id: a.id, kind: 'casting', title: a.castingCallTitle ?? 'Casting Call', status: a.status, appliedAt: a.appliedAt })),
  ].sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime());

  const isTerminalOrPending = (status: string) =>
    ['submitted', 'viewed', 'audition_requested'].includes(status) ? 'active' : status.includes('withdraw') ? 'withdrawn' : status;

  const filteredApplications = unifiedApplications.filter((a) => applicationFilter === 'all' || isTerminalOrPending(a.status) === applicationFilter);

  const handleWithdrawApplication = async (app: UnifiedApplication) => {
    setWithdrawingAppId(app.id);
    try {
      if (app.kind === 'job') {
        await jobsService.withdrawJobApplication(app.id);
        setJobApplications((prev) => prev?.map((a) => (a.id === app.id ? { ...a, status: 'withdrawn' } : a)) ?? prev);
      } else {
        await castingService.withdrawCastingApplication(app.id);
        setCastingApplications((prev) => prev?.map((a) => (a.id === app.id ? { ...a, status: 'withdrawn' } : a)) ?? prev);
      }
      show('Application withdrawn.', 'success');
    } catch (err) {
      show(err instanceof ApiError ? err.message : 'Could not withdraw application.', 'error');
    } finally {
      setWithdrawingAppId(null);
    }
  };

  // Request Audition + Submit Self-Tape — casting-applications only (jobs
  // have no audition concept in this API). There's no GET /v1/auditions
  // endpoint (confirmed absent from the live spec), so the audition
  // returned by requestAudition is only known for the rest of this session
  // — leaving and coming back before submitting a self-tape means starting
  // the request over, a real limitation until the backend adds a way to
  // read auditions back.
  const [auditionFormAppId, setAuditionFormAppId] = useState<string | null>(null);
  const [auditionType, setAuditionType] = useState<AuditionType>('self_tape');
  const [auditionInstructions, setAuditionInstructions] = useState('');
  const [requestingAuditionAppId, setRequestingAuditionAppId] = useState<string | null>(null);
  const [applicationAuditions, setApplicationAuditions] = useState<Record<string, Audition>>({});
  const [submittingSelfTapeAppId, setSubmittingSelfTapeAppId] = useState<string | null>(null);

  const handleRequestAudition = async (applicationId: string) => {
    setRequestingAuditionAppId(applicationId);
    try {
      const audition = await castingService.requestAudition(applicationId, {
        auditionType,
        instructions: auditionInstructions || undefined,
      });
      setApplicationAuditions((prev) => ({ ...prev, [applicationId]: audition }));
      setCastingApplications((prev) => prev?.map((a) => (a.id === applicationId ? { ...a, status: 'audition_requested' } : a)) ?? prev);
      setAuditionFormAppId(null);
      setAuditionInstructions('');
      show('Audition requested.', 'success');
    } catch (err) {
      show(err instanceof ApiError ? err.message : 'Could not request an audition.', 'error');
    } finally {
      setRequestingAuditionAppId(null);
    }
  };

  const handleSubmitSelfTape = async (applicationId: string, file: File) => {
    const audition = applicationAuditions[applicationId];
    if (!audition) return;
    setSubmittingSelfTapeAppId(applicationId);
    try {
      const uploaded = await mediaService.uploadFile(file, 'audition_self_tape', 'video');
      await castingService.submitSelfTape(audition.id, { submissionAssetId: uploaded.assetId });
      show('Self-tape submitted.', 'success');
    } catch (err) {
      show(err instanceof ApiError ? err.message : 'Could not submit self-tape.', 'error');
    } finally {
      setSubmittingSelfTapeAppId(null);
    }
  };

  return (
    <div className="pt-32 px-6 w-full max-w-400 mx-auto min-h-screen pb-24">
          {/* Profile Header & Controls */}
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start mb-12 gap-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-2xl border-2 border-gold p-1 overflow-hidden">
                  <img
                    src={
                      authProfile?.profileImagePath
                        ?? (profile.type === 'artist' ? "https://picsum.photos/seed/creator/200/200" : "https://picsum.photos/seed/business/200/200")
                    }
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
                {authProfile && (
                  <label className={cn(
                    "absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gold text-black flex items-center justify-center cursor-pointer shadow-lg hover:bg-gold/80 transition-colors",
                    uploadingAvatar && "opacity-50 pointer-events-none"
                  )}>
                    <Upload size={12} />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => { const f = e.target.files?.[0]; if (f) handleAvatarUpload(f); e.target.value = ''; }}
                    />
                  </label>
                )}
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
                      <Star size={10} className="fill-gold" /> Rating — Visit Our App
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
              {!realProfile && (
                <button
                  onClick={() => navigate('/profile/setup')}
                  className="flex items-center justify-center gap-2 px-6 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
                >
                  <Settings size={14} /> Complete Profile
                </button>
              )}
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

          {/* Dashboard Tabs — real API-backed tabs first (Profile Details,
              My Network, Privacy & Security), then Bihar Untold, then every
              tab still waiting on a live endpoint. */}
          <div className="flex overflow-x-auto no-scrollbar gap-4 mb-8 border-b border-white/5 pb-4">
            {[
              { id: 'profile-details', label: 'Profile Details', icon: User },
              { id: 'auditions', label: 'My Applications', icon: Mic },
              { id: 'network', label: 'My Network', icon: Users },
              { id: 'privacy', label: 'Privacy & Security', icon: ShieldCheck },
              // { id: 'bihar-untold', label: 'Bihar Untold', icon: Film },
              // { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
              // { id: 'discovery', label: 'Smart Discovery', icon: Search },
              { id: 'wallet', label: 'Wallet Overview', icon: Wallet },
              { id: 'finances', label: 'Finances', icon: Wallet },
              { id: 'bookings', label: 'Booking History', icon: Calendar },
              { id: 'counselling', label: 'Counselling', icon: HeartHandshake },
              { id: 'management', label: 'Management', icon: Briefcase },
              { id: 'notifications', label: 'Notifications', icon: MessageSquare },
              { id: 'membership', label: 'Membership', icon: Star },
              { id: 'reviews', label: 'Reviews', icon: Star },
              { id: 'services', label: 'Services & Gigs', icon: Briefcase },
              { id: 'portfolio', label: 'My Clips', icon: User },
              { id: 'my-shared-videos', label: 'My Shared Clips', icon: Youtube },
              ...(profile.type === 'artist' ? [
                // { id: 'availability', label: 'Availability Calendar', icon: Calendar },
                // { id: 'ai-insights', label: 'AI Match Suggestions', icon: Zap },
              ] : [
                { id: 'projects', label: 'Post New Project', icon: Briefcase },
                { id: 'casting', label: 'Casting Panel', icon: Users },
                { id: 'budget', label: 'Budget Manager', icon: Calculator },
                // { id: 'workflow', label: 'Workflow Tracker', icon: Settings },
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
              <motion.div key="discovery" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <div className="flex items-center gap-2 mb-2">
              <Search size={24} className="text-gold" />
              <h2 className="text-3xl font-bold">Smart Discovery — Visit Our App</h2>
            </div>
            <p className="text-white/60 max-w-3xl mb-6">Smart Discovery is meant to surface trending talent and personalized casting/collaboration suggestions based on your profile and activity, with real search and filters instead of a static demo.</p>
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
                        {!editingBasic && (
                          <button onClick={openBasicEdit} className="text-xs text-gold hover:underline flex items-center gap-1">
                            <Settings size={14} /> Edit
                          </button>
                        )}
                      </div>

                      {!editingBasic ? (
                        <>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <ProfileField label="Full Name" value={authProfile?.displayName ?? profile.name} hint="Your public display name." />
                            <ProfileField label="Gender" value={authProfile?.genderIdentity} hint="Not set — your self-described gender identity." />
                            <ProfileField label="Date of Birth" value={authProfile?.dateOfBirth?.slice(0, 10)} hint="Not set — helps match you to age-appropriate roles." />
                            <ProfileField
                              label="Location"
                              value={authProfile ? [authProfile.district, authProfile.state].filter(Boolean).join(', ') || undefined : profile.location}
                              hint="No location set — helps nearby casting calls find you."
                            />
                            <ProfileField
                              label="Headline"
                              value={authProfile?.headline}
                              hint="No headline yet — a one-line summary shown at the top of your public profile."
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
                          {authProfile && (
                            <div className="mt-6">
                              <div className="flex items-center justify-between mb-2">
                                <div className="text-[10px] uppercase tracking-widest text-white/40">Second Profession / Other Interest</div>
                                {!editingSecondProfession && authProfile.professions?.[0] && (
                                  <button onClick={openSecondProfessionEdit} className="text-[10px] text-gold hover:underline uppercase tracking-widest">
                                    {authProfile.professions?.[1] ? 'Change' : 'Add'}
                                  </button>
                                )}
                              </div>
                              {editingSecondProfession ? (
                                <div className="flex items-center gap-2">
                                  <select
                                    value={secondProfessionId}
                                    onChange={(e) => setSecondProfessionId(e.target.value)}
                                    className="flex-1 bg-black/30 border border-white/10 rounded-lg p-2 text-sm focus:outline-none focus:border-gold"
                                  >
                                    <option value="">Select a profession…</option>
                                    {professionCatalogue
                                      .filter((p) => p.id !== authProfile.professions?.[0]?.id)
                                      .map((p) => (
                                        <option key={p.id} value={p.id}>{p.industry} — {p.name}</option>
                                      ))}
                                  </select>
                                  <button
                                    onClick={handleSaveSecondProfession}
                                    disabled={savingSecondProfession || !secondProfessionId}
                                    className="bg-gold text-black px-3 py-2 rounded-lg text-xs font-bold disabled:opacity-50"
                                  >
                                    {savingSecondProfession ? 'Saving…' : 'Save'}
                                  </button>
                                  <button onClick={() => setEditingSecondProfession(false)} className="text-white/40 hover:text-white text-xs px-2">
                                    Cancel
                                  </button>
                                </div>
                              ) : authProfile.professions?.[1] ? (
                                <div className="font-bold">{authProfile.professions[1].name}</div>
                              ) : authProfile.professions?.[0] ? (
                                <p className="text-xs text-white/30 italic">No second profession yet — add another interest, e.g. a musician who also acts.</p>
                              ) : (
                                <p className="text-xs text-white/30 italic">Add a primary profession first from your profile before adding a second one.</p>
                              )}
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <EditableField
                              label="Display Name"
                              value={basicForm.displayName}
                              onChange={(v) => setBasicForm((f) => ({ ...f, displayName: v }))}
                            />
                            <EditableField
                              label="Headline"
                              value={basicForm.headline}
                              onChange={(v) => setBasicForm((f) => ({ ...f, headline: v }))}
                              placeholder="e.g. Lead Actor & Voice Artist"
                            />
                          </div>
                          <EditableTextarea
                            label="Bio"
                            value={basicForm.bio}
                            onChange={(v) => setBasicForm((f) => ({ ...f, bio: v }))}
                          />
                          <div className="grid grid-cols-2 gap-4">
                            <EditableField
                              label="Pincode"
                              value={basicForm.pincode}
                              onChange={(v) => setBasicForm((f) => ({ ...f, pincode: v }))}
                              maxLength={6}
                            />
                            <EditableField
                              label="Website"
                              value={basicForm.websiteUrl}
                              onChange={(v) => setBasicForm((f) => ({ ...f, websiteUrl: v }))}
                              placeholder="https://…"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <EditableField
                              label="Date of Birth"
                              type="date"
                              value={basicForm.dateOfBirth}
                              onChange={(v) => setBasicForm((f) => ({ ...f, dateOfBirth: v }))}
                            />
                            <EditableField
                              label="Gender"
                              value={basicForm.genderIdentity}
                              onChange={(v) => setBasicForm((f) => ({ ...f, genderIdentity: v }))}
                              placeholder="e.g. Female, Male, Non-binary"
                            />
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
                      )}
                    </HoverGlowPanel>

                    {/* Conditional Advanced Module — actor/model professions only, see isActorOrModel above */}
                    {profile.type === 'artist' && isActorOrModel && (
                      <HoverGlowPanel className="glass-panel-purple p-8">
                        <div className="flex justify-between items-center mb-6">
                          <h3 className="text-xl font-bold flex items-center gap-2"><Star size={20} className="text-gold" /> Actor/Model Advanced Module</h3>
                          {!editingDetails && (
                            <button onClick={openDetailsEdit} className="text-xs text-gold hover:underline">
                              Edit Module
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                            {/* Real fields (PATCH /v1/profiles/me/details) — "xx" is the
                                unfilled-value placeholder for a real field with no data yet,
                                not a fake number. */}
                            <h4 className="text-sm font-bold text-white/60 uppercase tracking-widest mb-4 border-b border-white/10 pb-2">Physical Attributes</h4>
                            {!editingDetails ? (
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
                                <div className="flex justify-between">
                                  <span className="text-white/40 text-sm">Chest</span>
                                  <span className="font-bold text-sm">{authProfile?.details.chestCm != null ? `${authProfile.details.chestCm} cm` : 'xx'}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-white/40 text-sm">Waist</span>
                                  <span className="font-bold text-sm">{authProfile?.details.waistCm != null ? `${authProfile.details.waistCm} cm` : 'xx'}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-white/40 text-sm">Hips</span>
                                  <span className="font-bold text-sm">{authProfile?.details.hipsCm != null ? `${authProfile.details.hipsCm} cm` : 'xx'}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-white/40 text-sm">Shoe Size</span>
                                  <span className="font-bold text-sm">{authProfile?.details.shoeSize ?? 'xx'}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-white/40 text-sm">Skin Tone</span>
                                  <span className="font-bold text-sm">{authProfile?.details.skinTone ?? 'xx'}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-white/40 text-sm">Playing Age Range</span>
                                  <span className="font-bold text-sm">
                                    {authProfile?.details.playingAgeMin != null && authProfile?.details.playingAgeMax != null
                                      ? `${authProfile.details.playingAgeMin}–${authProfile.details.playingAgeMax}`
                                      : 'xx'}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-white/40 text-sm">Travel Ready</span>
                                  <span className="font-bold text-sm">{authProfile?.details.travelReady ? 'Yes' : 'No'}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-white/40 text-sm">Passport Available</span>
                                  <span className="font-bold text-sm">{authProfile?.details.passportAvailable ? 'Yes' : 'No'}</span>
                                </div>
                              </div>
                            ) : (
                              <div className="space-y-3">
                                <div className="grid grid-cols-2 gap-3">
                                  <EditableField
                                    label="Height (cm)"
                                    type="number"
                                    value={detailsForm.heightCm}
                                    onChange={(v) => setDetailsForm((f) => ({ ...f, heightCm: v }))}
                                  />
                                  <EditableField
                                    label="Weight (kg)"
                                    type="number"
                                    value={detailsForm.weightKg}
                                    onChange={(v) => setDetailsForm((f) => ({ ...f, weightKg: v }))}
                                  />
                                  <EditableField
                                    label="Eye Color"
                                    value={detailsForm.eyeColor}
                                    onChange={(v) => setDetailsForm((f) => ({ ...f, eyeColor: v }))}
                                  />
                                  <EditableField
                                    label="Hair Color"
                                    value={detailsForm.hairColor}
                                    onChange={(v) => setDetailsForm((f) => ({ ...f, hairColor: v }))}
                                  />
                                  <EditableField
                                    label="Chest (cm)"
                                    type="number"
                                    value={detailsForm.chestCm}
                                    onChange={(v) => setDetailsForm((f) => ({ ...f, chestCm: v }))}
                                  />
                                  <EditableField
                                    label="Waist (cm)"
                                    type="number"
                                    value={detailsForm.waistCm}
                                    onChange={(v) => setDetailsForm((f) => ({ ...f, waistCm: v }))}
                                  />
                                  <EditableField
                                    label="Hips (cm)"
                                    type="number"
                                    value={detailsForm.hipsCm}
                                    onChange={(v) => setDetailsForm((f) => ({ ...f, hipsCm: v }))}
                                  />
                                  <EditableField
                                    label="Shoe Size"
                                    value={detailsForm.shoeSize}
                                    onChange={(v) => setDetailsForm((f) => ({ ...f, shoeSize: v }))}
                                  />
                                  <EditableField
                                    label="Skin Tone"
                                    value={detailsForm.skinTone}
                                    onChange={(v) => setDetailsForm((f) => ({ ...f, skinTone: v }))}
                                  />
                                  <EditableField
                                    label="Playing Age Min"
                                    type="number"
                                    value={detailsForm.playingAgeMin}
                                    onChange={(v) => setDetailsForm((f) => ({ ...f, playingAgeMin: v }))}
                                  />
                                  <EditableField
                                    label="Playing Age Max"
                                    type="number"
                                    value={detailsForm.playingAgeMax}
                                    onChange={(v) => setDetailsForm((f) => ({ ...f, playingAgeMax: v }))}
                                  />
                                </div>
                                <div className="flex gap-6 pt-1">
                                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                                    <input
                                      type="checkbox"
                                      checked={detailsForm.travelReady}
                                      onChange={(e) => setDetailsForm((f) => ({ ...f, travelReady: e.target.checked }))}
                                      className="accent-gold"
                                    />
                                    Travel Ready
                                  </label>
                                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                                    <input
                                      type="checkbox"
                                      checked={detailsForm.passportAvailable}
                                      onChange={(e) => setDetailsForm((f) => ({ ...f, passportAvailable: e.target.checked }))}
                                      className="accent-gold"
                                    />
                                    Passport Available
                                  </label>
                                </div>
                                <EditableField
                                  label="Years of Experience"
                                  type="number"
                                  value={detailsForm.yearsExperience}
                                  onChange={(v) => setDetailsForm((f) => ({ ...f, yearsExperience: v }))}
                                />
                                <div className="flex gap-3 pt-2">
                                  <button onClick={() => setEditingDetails(false)} className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded-lg font-bold uppercase tracking-widest text-xs transition-colors">
                                    Cancel
                                  </button>
                                  <button
                                    onClick={handleSaveDetails}
                                    disabled={savingDetails}
                                    className="flex-1 py-2 bg-gold text-black hover:bg-white rounded-lg font-bold uppercase tracking-widest text-xs transition-colors disabled:opacity-50"
                                  >
                                    {savingDetails ? 'Saving…' : 'Save'}
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
                          <div className="text-sm text-white/60">Generate a casting-ready digital resume instantly.</div>
                          <button
                            onClick={() => show('Resume generation is Visit Our App.', 'info')}
                            className="bg-gold text-black px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors flex items-center gap-2"
                          >
                            <FileText size={14} /> Generate Resume
                          </button>
                        </div>
                      </HoverGlowPanel>
                    )}

                    {profile.type === 'business' && (
                      <HoverGlowPanel className="glass-panel-blue p-8">
                        <div className="flex justify-between items-center mb-6">
                          <h3 className="text-xl font-bold flex items-center gap-2"><Briefcase size={20} className="text-gold" /> Business Profile</h3>
                          {!editingWebsite && (
                            <button onClick={openWebsiteEdit} className="text-xs text-gold hover:underline flex items-center gap-1">
                              <Settings size={14} /> Edit
                            </button>
                          )}
                        </div>

                        {/* Legal status / business role / registered address don't
                            exist anywhere in OwnProfileResponseDto — no
                            business-specific fields in the real schema at all, only
                            the generic fields every account type shares. websiteUrl
                            is the one real field here (same as Social Links above),
                            so it's the only one shown — with its own scoped edit
                            control rather than opening the unrelated Basic
                            Information form. */}
                        {editingWebsite ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="url"
                              value={websiteForm}
                              onChange={(e) => setWebsiteForm(e.target.value)}
                              placeholder="https://…"
                              className="flex-1 bg-black/30 border border-white/10 rounded-lg p-2 text-sm focus:outline-none focus:border-gold"
                            />
                            <button
                              onClick={handleSaveWebsite}
                              disabled={savingWebsite}
                              className="bg-gold text-black px-3 py-2 rounded-lg text-xs font-bold disabled:opacity-50"
                            >
                              {savingWebsite ? 'Saving…' : 'Save'}
                            </button>
                            <button onClick={() => setEditingWebsite(false)} className="text-white/40 hover:text-white text-xs px-2">
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div>
                            <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Website</div>
                            {authProfile?.websiteUrl ? (
                              <a href={authProfile.websiteUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-400 hover:underline flex items-center gap-1">
                                {authProfile.websiteUrl} <ExternalLink size={12} />
                              </a>
                            ) : (
                              <span className="font-bold text-sm">xx</span>
                            )}
                          </div>
                        )}
                      </HoverGlowPanel>
                    )}
                  </div>

                  <div className="space-y-8">
                    {/* Portfolio preview — Portfolios is a real, live API
                        (GET /v1/portfolios/{id} for the primary portfolio's
                        items, curl-verified this session), so this plays the
                        actual uploaded photo/video, not just the portfolio's
                        title. Same data as the Portfolio tab (delete/share
                        live there); this is a quick-glance + quick-upload
                        preview so the two don't duplicate full management UI. */}
                    <HoverGlowPanel className="glass-panel p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold flex items-center gap-2"><Image size={16} className="text-gold" /> My Clips</h3>
                        <div className="flex items-center gap-3">
                          <span className="text-[9px] uppercase tracking-widest font-bold text-emerald-400">Live from SosrG</span>
                          <button onClick={() => setActiveTab('portfolio')} className="text-[9px] uppercase tracking-widest font-bold text-gold hover:underline">
                            Manage →
                          </button>
                        </div>
                      </div>

                      {(portfoliosLoading || portfolioDetailLoading) && (
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          {[0, 1, 2, 3].map((i) => (
                            <ScaffoldRow key={i} className="aspect-[9/16]" />
                          ))}
                        </div>
                      )}

                      {!portfoliosLoading && !portfolioDetailLoading && (portfolios?.length ?? 0) === 0 && (
                        <p className="text-xs text-white/30 italic mb-4">No clips yet — this is where your photos, reels, and work samples will show up.</p>
                      )}

                      {!portfoliosLoading && !portfolioDetailLoading && (portfolios?.length ?? 0) > 0 && (portfolioDetail?.items.length ?? 0) === 0 && (
                        <p className="text-xs text-white/30 italic mb-4">No clips yet — upload a photo or reel below.</p>
                      )}

                      {!portfolioDetailLoading && (portfolioDetail?.items.length ?? 0) > 0 && (
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          {portfolioDetail!.items.map((item) => (
                            <div key={item.id} className="relative aspect-[9/16] rounded-xl overflow-hidden bg-cinematic-gray border border-white/10">
                              {item.mediaAssetId && item.assetType === 'video' && (
                                <video
                                  controls
                                  preload="metadata"
                                  src={getAssetContentUrl(item.mediaAssetId)}
                                  className="h-full w-full object-cover"
                                />
                              )}
                              {item.mediaAssetId && item.assetType === 'image' && (
                                <img
                                  src={getAssetContentUrl(item.mediaAssetId)}
                                  alt={item.caption ?? item.title}
                                  className="h-full w-full object-cover"
                                />
                              )}
                              {item.mediaAssetId && item.assetType !== 'video' && item.assetType !== 'image' && (
                                <div className="h-full w-full flex flex-col items-center justify-center gap-2 p-3 text-center">
                                  <Image size={20} className="text-white/30" />
                                  <span className="text-[10px] text-white/40 line-clamp-2">{item.caption ?? item.title}</span>
                                </div>
                              )}
                              {!item.mediaAssetId && (
                                <div className="h-full w-full flex items-center justify-center p-3 text-center">
                                  <span className="text-[10px] text-white/40 line-clamp-3">{item.itemTitle || item.caption || item.title}</span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      <label className={cn(
                        "w-full bg-white/5 border border-white/10 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center justify-center gap-2 cursor-pointer",
                        mediaUploading && "opacity-50 pointer-events-none"
                      )}>
                        <Upload size={14} /> {mediaUploading ? 'Uploading…' : 'Upload New'}
                        <input
                          type="file"
                          accept="image/*,video/*,audio/*"
                          className="hidden"
                          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUploadMedia(f); e.target.value = ''; }}
                        />
                      </label>
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
                          <span className="absolute top-2 right-2 bg-gold text-black px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest">Visit Our App</span>
                          <div className="flex items-center gap-3">
                            <Instagram size={18} className="text-pink-500" />
                            <ScaffoldRow className="h-4 w-28" />
                          </div>
                        </div>
                        <div className="relative flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
                          <span className="absolute top-2 right-2 bg-gold text-black px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest">Visit Our App</span>
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
              <motion.div key="wallet" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <div className="flex items-center gap-2 mb-2">
              <Wallet size={24} className="text-gold" />
              <h2 className="text-3xl font-bold">Wallet Overview — Visit Our App</h2>
            </div>
            <p className="text-white/60 max-w-3xl mb-6">A real balance, pending clearance, SosrG Coins, and auction tokens tied to your actual earnings and activity, plus real transaction history and secure Razorpay payment methods — not the static totals shown here today.</p>
              </motion.div>
            )}

            {activeTab === 'bookings' && (
              <motion.div key="bookings" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <div className="flex items-center gap-2 mb-2">
              <Calendar size={24} className="text-gold" />
              <h2 className="text-3xl font-bold">Booking History — Visit Our App</h2>
            </div>
            <p className="text-white/60 max-w-3xl mb-6">Confirmed direct bookings and won auctions as a single timeline — current, past, and auction-sourced work, each with schedule, payment, and status in one place, instead of scattered across casting applications and messages.</p>
              </motion.div>
            )}

            {activeTab === 'notifications' && (
              <motion.div key="notifications" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <div className="flex items-center gap-2 mb-2">
                  <Zap size={24} className="text-gold" />
                  <h2 className="text-3xl font-bold">Notifications — Visit Our App</h2>
                </div>
                <p className="text-white/60 max-w-3xl mb-6">Real-time alerts for new applications, bookings, messages, and auction activity — pushed the moment they happen, not a static inbox.</p>
              </motion.div>
            )}

            {activeTab === 'membership' && (
              <motion.div key="membership" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <div className="flex items-center gap-2 mb-2">
              <Star size={24} className="text-gold" />
              <h2 className="text-3xl font-bold">Membership & Subscription — Visit Our App</h2>
            </div>
            <p className="text-white/60 max-w-3xl mb-6">Unlock premium benefits, priority casting, and exclusive workshops with a real Basic/Pro/Elite plan tied to your account.</p>
              </motion.div>
            )}

            {activeTab === 'reviews' && (
              <motion.div key="reviews" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <div className="flex items-center gap-2 mb-2">
              <Star size={24} className="text-gold" />
              <h2 className="text-3xl font-bold">Ratings & Reviews — Visit Our App</h2>
            </div>
            <p className="text-white/60 max-w-3xl mb-6">Verified feedback from people you've worked with — casting directors, collaborators, clients — building a track record tied to real completed work rather than self-reported claims.</p>
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

                <div className="flex items-center gap-2 mb-2">
              <ShoppingCart size={24} className="text-gold" />
              <h2 className="text-3xl font-bold">Services & Gigs — Visit Our App</h2>
            </div>
            <p className="text-white/60 max-w-3xl mb-6">This is where creators will list paid, bookable offerings — coaching sessions, script reviews, voice-over gigs, workshops — priced and sold directly through SosrG, with payment held in escrow until delivery is confirmed. It turns a profile from a portfolio into a storefront.</p>
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
                          <h4 className="font-bold text-sm">My Clips Visibility</h4>
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
                        <span className="bg-gold text-black px-2 py-1 rounded text-[9px] font-bold uppercase tracking-widest">Visit Our App</span>
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-3 bg-white/5 border border-white/10 rounded-lg p-5">
                        <div className="p-3 bg-white/5 rounded-lg w-fit">
                          <Lock size={20} className="text-gold" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm mb-1">End-to-End Encryption</h4>
                          <p className="text-xs text-white/60">All your direct messages and contract negotiations are encrypted and secure.</p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3 bg-white/5 border border-white/10 rounded-lg p-5">
                        <div className="p-3 bg-white/5 rounded-lg w-fit">
                          <ShieldCheck size={20} className="text-emerald-400" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm mb-1">Secure Escrow Payments</h4>
                          <p className="text-xs text-white/60">Funds are held safely in escrow until services are delivered and approved.</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex justify-end gap-4">
                      <button disabled className="text-xs text-white/20 cursor-not-allowed" title="Visit Our App — no data-export endpoint yet">Download My Data</button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                  <AccordionSection
                    title="Blocked & Muted"
                    icon={UserX}
                    isOpen={openSection === 'blocked-muted'}
                    onToggle={() => toggleSection('blocked-muted')}
                  >
                    {blockedMutedLoading && [0, 1].map((i) => <ScaffoldRow key={i} className="h-12" />)}
                    {!blockedMutedLoading && (
                      <>
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-2">Blocked ({blockedList?.length ?? 0})</h4>
                          {!blockedList?.length && <p className="text-xs text-white/30 italic">No one blocked.</p>}
                          <div className="space-y-2">
                            {blockedList?.map((p) => (
                              <div key={p.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                                <span className="text-sm font-bold">{p.displayName} <span className="text-white/40 font-normal">@{p.username}</span></span>
                                <button onClick={() => handleUnblock(p.id)} className="text-[10px] text-gold hover:underline uppercase tracking-widest">Unblock</button>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-2">Muted ({mutedList?.length ?? 0})</h4>
                          {!mutedList?.length && <p className="text-xs text-white/30 italic">No one muted.</p>}
                          <div className="space-y-2">
                            {mutedList?.map((p) => (
                              <div key={p.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                                <span className="text-sm font-bold">{p.displayName} <span className="text-white/40 font-normal">@{p.username}</span></span>
                                <button onClick={() => handleUnmute(p.id)} className="text-[10px] text-gold hover:underline uppercase tracking-widest">Unmute</button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </AccordionSection>

                  <AccordionSection
                    title="Verification (KYC)"
                    icon={ShieldCheck}
                    isOpen={openSection === 'kyc'}
                    onToggle={() => toggleSection('kyc')}
                  >
                    {kycLoading && <ScaffoldRow className="h-12" />}
                    {!kycLoading && (
                      <>
                        <div className="space-y-2">
                          {kycDocs?.length ? kycDocs.map((doc) => (
                            <div key={doc.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                              <span className="text-sm font-bold capitalize">{doc.documentType.replace('_', ' ')}</span>
                              <button onClick={() => handleDeleteKycDocument(doc.id)} className="text-[10px] text-crimson hover:underline uppercase tracking-widest">Remove</button>
                            </div>
                          )) : <p className="text-xs text-white/30 italic mb-2">No documents submitted yet.</p>}
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                          <select
                            value={kycUploadType}
                            onChange={(e) => setKycUploadType(e.target.value as KycDocumentType)}
                            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gold"
                          >
                            <option value="id_proof">ID Proof</option>
                            <option value="address_proof">Address Proof</option>
                            <option value="organisation_proof">Organisation Proof</option>
                            <option value="portfolio_sample">Portfolio Sample</option>
                          </select>
                          <label className={cn(
                            "flex-1 text-center bg-gold/10 text-gold border border-gold/20 py-2 rounded-lg text-xs font-bold uppercase tracking-widest cursor-pointer hover:bg-gold/20 transition-colors",
                            kycUploading && "opacity-50 pointer-events-none"
                          )}>
                            {kycUploading ? 'Uploading…' : 'Upload Document'}
                            <input
                              type="file"
                              accept="image/*,.pdf"
                              className="hidden"
                              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleKycUpload(f); e.target.value = ''; }}
                            />
                          </label>
                        </div>
                      </>
                    )}
                  </AccordionSection>

                  <AccordionSection
                    title="Change Password"
                    icon={Lock}
                    isOpen={openSection === 'password'}
                    onToggle={() => toggleSection('password')}
                  >
                    <PasswordInput
                      placeholder="Current password"
                      value={passwordForm.current}
                      onChange={(e) => setPasswordForm((f) => ({ ...f, current: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gold"
                    />
                    <PasswordInput
                      placeholder="New password (min 12 characters)"
                      value={passwordForm.next}
                      onChange={(e) => setPasswordForm((f) => ({ ...f, next: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gold"
                    />
                    <button
                      onClick={handleChangePassword}
                      disabled={changingPassword}
                      className="bg-gold text-black px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50"
                    >
                      {changingPassword ? 'Saving…' : 'Save New Password'}
                    </button>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-sm">Log Out Everywhere</h4>
                        <p className="text-xs text-white/50">Ends every session on every device, including this one.</p>
                      </div>
                      <button
                        onClick={handleLogoutAllDevices}
                        disabled={loggingOutAll}
                        className="text-xs text-crimson hover:underline uppercase tracking-widest disabled:opacity-50"
                      >
                        {loggingOutAll ? 'Logging out…' : 'Log Out All Devices'}
                      </button>
                    </div>
                  </AccordionSection>

                  <AccordionSection
                    title="Danger Zone"
                    icon={AlertCircle}
                    danger
                    isOpen={openSection === 'danger'}
                    onToggle={() => toggleSection('danger')}
                  >
                    <p className="text-sm text-white/60">Deleting your account is permanent and can't be undone.</p>
                    {!showDeleteAccount ? (
                      <button
                        onClick={() => setShowDeleteAccount(true)}
                        className="bg-crimson/10 text-crimson border border-crimson/30 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-crimson hover:text-white transition-colors"
                      >
                        Delete My Account
                      </button>
                    ) : (
                      <div className="space-y-3 p-4 bg-crimson/5 border border-crimson/20 rounded-xl">
                        <p className="text-xs font-bold text-crimson">Enter your password to confirm — this can't be undone.</p>
                        <PasswordInput
                          placeholder="Password"
                          value={deletePassword}
                          onChange={(e) => setDeletePassword(e.target.value)}
                          className="w-full bg-white/5 border border-crimson/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-crimson"
                          iconClassName="text-crimson/60 hover:text-crimson"
                        />
                        <div className="flex gap-3">
                          <button
                            onClick={() => { setShowDeleteAccount(false); setDeletePassword(''); }}
                            className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleDeleteAccount}
                            disabled={deletingAccount}
                            className="flex-1 py-2 bg-crimson text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-crimson/80 transition-colors disabled:opacity-50"
                          >
                            {deletingAccount ? 'Deleting…' : 'Confirm Delete'}
                          </button>
                        </div>
                      </div>
                    )}
                  </AccordionSection>
                </div>
              </motion.div>
            )}

            {activeTab === 'dashboard' && (
              <motion.div key="dashboard" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <div className="flex items-center gap-2 mb-2">
              <LayoutDashboard size={24} className="text-gold" />
              <h2 className="text-3xl font-bold">Overview — Visit Our App</h2>
            </div>
            <p className="text-white/60 max-w-3xl mb-6">A real activity feed, growth tracking, AI-driven tips, and achievements pulled from your actual profile and bookings — no activity, analytics, or achievements API exists yet, so this stays honest rather than showing invented numbers.</p>
              </motion.div>
            )}

            {activeTab === 'projects' && (
              <motion.div key="projects" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="flex items-center gap-2 mb-2">
              <Briefcase size={24} className="text-gold" />
              <h2 className="text-3xl font-bold">{profile.type === 'artist' ? 'My Projects' : 'Active Productions'} — Visit Our App on PlayStore</h2>
            </div>
            <p className="text-white/60 max-w-3xl mb-6">{profile.type === 'artist' ? 'A real list of the projects you\'re currently working on, pulled from confirmed bookings and accepted applications, with status and progress tracked automatically.' : 'A real production dashboard for everything you\'re currently running, with status and progress tracked automatically instead of managed by hand.'}</p>
              </motion.div>
            )}

            {activeTab === 'finances' && (
              <motion.div key="finances" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center gap-2 mb-2">
              <Wallet size={24} className="text-gold" />
              <h2 className="text-3xl font-bold">Finances — Visit Our App</h2>
            </div>
            <p className="text-white/60 max-w-3xl mb-6">Real total earnings, pending payments, and active contracts, plus a real transaction history — tied to your actual bookings and payments instead of a static summary.</p>
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
                            onClick={() => handleOpenConversation(conv)}
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
              <motion.div key="counselling" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <div className="flex items-center gap-2 mb-2">
              <GraduationCap size={24} className="text-gold" />
              <h2 className="text-3xl font-bold">AI Career Counselling — Visit Our App</h2>
            </div>
            <p className="text-white/60 max-w-3xl mb-6">Personalized career roadmaps for the Indian Art industries, powered by real-time market data and industry trends.</p>
              </motion.div>
            )}

            {activeTab === 'management' && (
              <motion.div key="management" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center gap-2 mb-2">
              <Briefcase size={24} className="text-gold" />
              <h2 className="text-3xl font-bold">Management — Visit Our App</h2>
            </div>
            <p className="text-white/60 max-w-3xl mb-6">Real active task tracking, payment milestone locks, deadline alerts, and a productivity score, all tied to your actual projects instead of a static demo.</p>
              </motion.div>
            )}

            {activeTab === 'portfolio' && (
              <motion.div
                key="portfolio"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative space-y-6"
              >
                <div className="flex flex-wrap justify-between items-center gap-3">
                  <div>
                    <h3 className="text-2xl font-bold flex items-center gap-2">
                      My Clips
                      <span className="text-[9px] uppercase tracking-widest font-bold text-emerald-400">Live from SosrG</span>
                    </h3>
                    <p className="text-white/40 text-sm mt-1">
                      Your real photos and reels — the same preview shown on Profile Details, with delete and share here.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSharePortfolio}
                      disabled={!primaryPortfolioId || sharingPortfolio}
                      className="bg-white/5 border border-white/10 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      <Share2 size={14} /> {sharingPortfolio ? 'Creating link…' : 'Share My Clips'}
                    </button>
                    <label className={cn(
                      "bg-gold text-black px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors flex items-center gap-2 cursor-pointer",
                      mediaUploading && "opacity-50 pointer-events-none"
                    )}>
                      <Plus size={14} /> {mediaUploading ? 'Uploading…' : 'Add Media'}
                      <input
                        type="file"
                        accept="image/*,video/*,audio/*"
                        className="hidden"
                        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUploadMedia(f); e.target.value = ''; }}
                      />
                    </label>
                  </div>
                </div>

                {(portfoliosLoading || portfolioDetailLoading) && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[0, 1, 2].map((i) => (
                      <ScaffoldRow key={i} className="aspect-video" />
                    ))}
                  </div>
                )}

                {!portfoliosLoading && !portfolioDetailLoading && (portfolios?.length ?? 0) === 0 && (
                  <p className="text-sm text-white/30 italic">No clips yet — click "Add Media" to upload your first photo or reel.</p>
                )}

                {!portfolioDetailLoading && (portfolioDetail?.items.length ?? 0) === 0 && (portfolios?.length ?? 0) > 0 && (
                  <p className="text-sm text-white/30 italic">No clips yet — click "Add Media" to upload your first photo or reel.</p>
                )}

                {!portfolioDetailLoading && (portfolioDetail?.items.length ?? 0) > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {portfolioDetail!.items.map((item) => (
                      <div key={item.id} className="relative aspect-video rounded-xl overflow-hidden bg-cinematic-gray border border-white/10 group">
                        <button
                          onClick={() => handleDeleteMediaItem(item.id)}
                          disabled={deletingItemId === item.id}
                          aria-label="Remove from My Clips"
                          className="absolute top-2 right-2 z-10 bg-black/60 hover:bg-red-500/80 text-white rounded-full p-1.5 transition-colors disabled:opacity-50"
                        >
                          <X size={14} />
                        </button>
                        {item.mediaAssetId && item.assetType === 'video' && (
                          <video controls preload="metadata" src={getAssetContentUrl(item.mediaAssetId)} className="h-full w-full object-cover" />
                        )}
                        {item.mediaAssetId && item.assetType === 'image' && (
                          <img src={getAssetContentUrl(item.mediaAssetId)} alt={item.caption ?? item.title} className="h-full w-full object-cover" />
                        )}
                        {item.mediaAssetId && item.assetType !== 'video' && item.assetType !== 'image' && (
                          <div className="h-full w-full flex flex-col items-center justify-center gap-2 p-3 text-center">
                            <Image size={20} className="text-white/30" />
                            <span className="text-[10px] text-white/40 line-clamp-2">{item.caption ?? item.title}</span>
                          </div>
                        )}
                        {!item.mediaAssetId && (
                          <div className="h-full w-full flex items-center justify-center p-3 text-center">
                            <span className="text-[10px] text-white/40 line-clamp-3">{item.itemTitle || item.caption || item.title}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'my-shared-videos' && (
              <motion.div
                key="my-shared-videos"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative space-y-6"
              >
                <div className="flex flex-wrap justify-between items-center gap-3">
                  <div>
                    <h3 className="text-2xl font-bold flex items-center gap-2">
                      My Shared Clips
                      <span className="text-[9px] uppercase tracking-widest font-bold text-emerald-400">Live from SosrG</span>
                    </h3>
                    <p className="text-white/40 text-sm mt-1">
                      YouTube clips you've posted to Community Content Sharing — same cards, your own feed.
                    </p>
                  </div>
                  <ContentShareComposer onCreated={(share) => setMyShares((prev) => [share, ...(prev ?? [])])} />
                </div>

                {editingShareId && myShares?.find((s) => s.id === editingShareId) && (
                  <ContentShareEditPanel
                    share={myShares.find((s) => s.id === editingShareId)!}
                    onCancel={() => setEditingShareId(null)}
                    onSaved={(updated) => {
                      setMyShares((prev) => prev?.map((s) => (s.id === updated.id ? updated : s)) ?? null);
                      setEditingShareId(null);
                    }}
                  />
                )}

                {mySharesLoading && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {[0, 1, 2, 3].map((i) => (
                      <div key={i} className="aspect-[9/16] rounded-2xl bg-white/5 animate-pulse" />
                    ))}
                  </div>
                )}

                {!mySharesLoading && mySharesError && (
                  <p className="text-sm text-red-400">{mySharesError}</p>
                )}

                {!mySharesLoading && !mySharesError && (myShares?.length ?? 0) === 0 && (
                  <p className="text-sm text-white/30 italic">No clips shared yet — click "Create Clip" to post your first YouTube link.</p>
                )}

                {!mySharesLoading && !mySharesError && (myShares?.length ?? 0) > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {myShares!.map((share) => (
                      <ContentShareCard
                        key={share.id}
                        share={share}
                        layout="grid"
                        editable
                        onEdit={() => setEditingShareId(share.id)}
                        onDelete={() => handleDeleteShare(share)}
                        deleting={deletingShareId === share.id}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'auditions' && (
              <motion.div key="auditions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    My Applications
                    <span className="text-[9px] uppercase tracking-widest font-bold text-emerald-400">Live from SosrG</span>
                  </h2>
                </div>
                <p className="text-white/40 text-sm max-w-2xl">
                  Every casting call and job you've applied to, and where it stands — pulled directly from
                  your real applications instead of you having to check each listing individually.
                </p>

                <div className="flex flex-wrap gap-2">
                  {(['all', 'active', 'shortlisted', 'selected', 'rejected', 'withdrawn'] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setApplicationFilter(f)}
                      className={cn(
                        'px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-colors',
                        applicationFilter === f ? 'bg-gold text-black' : 'bg-white/5 text-white/50 hover:text-white/80',
                      )}
                    >
                      {f}
                    </button>
                  ))}
                </div>

                {applicationsLoading && (
                  <div className="space-y-4">
                    {[0, 1, 2, 3].map((i) => (
                      <ScaffoldRow key={i} className="h-20" />
                    ))}
                  </div>
                )}

                {!applicationsLoading && castingApplicationsError && (
                  <div className="flex items-center gap-2 text-xs text-white/40 bg-white/5 border border-white/10 rounded-xl p-3">
                    <AlertCircle size={14} className="text-white/30 shrink-0" />
                    Casting applications couldn't be loaded right now ({castingApplicationsError}) — job applications below are unaffected.
                  </div>
                )}

                {!applicationsLoading && jobApplicationsError && (
                  <div className="flex items-center gap-2 text-xs text-white/40 bg-white/5 border border-white/10 rounded-xl p-3">
                    <AlertCircle size={14} className="text-white/30 shrink-0" />
                    Job applications couldn't be loaded right now ({jobApplicationsError}).
                  </div>
                )}

                {!applicationsLoading && filteredApplications.length === 0 && !castingApplicationsError && !jobApplicationsError && (
                  <div className="flex flex-col items-start gap-3">
                    <p className="text-sm text-white/30 italic">
                      {applicationFilter === 'all' ? "You haven't applied to anything yet." : `No applications with status "${applicationFilter}".`}
                    </p>
                    <Link
                      to="/casting"
                      className="text-xs font-bold uppercase tracking-widest text-gold hover:text-gold/80 transition-colors"
                    >
                      Explore more →
                    </Link>
                  </div>
                )}

                {!applicationsLoading && filteredApplications.length > 0 && (
                  <div className="space-y-3">
                    {filteredApplications.map((app) => {
                      const bucket = isTerminalOrPending(app.status);
                      const pillClass =
                        bucket === 'selected' ? 'bg-emerald-500/15 text-emerald-400'
                        : bucket === 'shortlisted' ? 'bg-gold/15 text-gold'
                        : bucket === 'rejected' ? 'bg-red-500/15 text-red-400'
                        : bucket === 'withdrawn' ? 'bg-white/10 text-white/40'
                        : 'bg-blue-500/15 text-blue-400';
                      const canWithdraw = bucket !== 'withdrawn' && bucket !== 'rejected' && bucket !== 'selected';
                      const canRequestAudition = app.kind === 'casting' && app.status !== 'audition_requested' && bucket !== 'withdrawn' && bucket !== 'rejected' && bucket !== 'selected';
                      const audition = applicationAuditions[app.id];
                      const showSelfTape = app.kind === 'casting' && (audition || app.status === 'audition_requested');
                      return (
                        <div key={`${app.kind}-${app.id}`} className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-3">
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3 min-w-0">
                              {app.kind === 'casting' ? <Mic size={18} className="text-gold shrink-0" /> : <Briefcase size={18} className="text-gold shrink-0" />}
                              <div className="min-w-0">
                                <div className="font-medium truncate">{app.title}</div>
                                <div className="text-xs text-white/40 flex items-center gap-1.5">
                                  <Clock size={12} /> Applied {new Date(app.appliedAt).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                              <span className={cn('text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full', pillClass)}>
                                {bucket.replace('_', ' ')}
                              </span>
                              {canRequestAudition && (
                                <button
                                  onClick={() => setAuditionFormAppId(auditionFormAppId === app.id ? null : app.id)}
                                  className="text-xs font-bold uppercase tracking-widest text-gold hover:underline"
                                >
                                  Request Audition
                                </button>
                              )}
                              {canWithdraw && (
                                <button
                                  onClick={() => handleWithdrawApplication(app)}
                                  disabled={withdrawingAppId === app.id}
                                  className="text-xs font-bold uppercase tracking-widest text-white/40 hover:text-red-400 transition-colors disabled:opacity-50"
                                >
                                  {withdrawingAppId === app.id ? 'Withdrawing…' : 'Withdraw'}
                                </button>
                              )}
                            </div>
                          </div>

                          {auditionFormAppId === app.id && (
                            <div className="bg-black/20 rounded-lg p-3 space-y-2 border border-white/10">
                              <div className="flex gap-3">
                                {(['self_tape', 'video_call', 'in_person'] as const).map((t) => (
                                  <label key={t} className="flex items-center gap-1.5 text-xs cursor-pointer">
                                    <input type="radio" name={`audition-type-${app.id}`} checked={auditionType === t} onChange={() => setAuditionType(t)} className="accent-gold" />
                                    {t.replace('_', ' ')}
                                  </label>
                                ))}
                              </div>
                              <textarea
                                value={auditionInstructions}
                                onChange={(e) => setAuditionInstructions(e.target.value)}
                                placeholder="Optional note to the casting director (availability, preferred slot, etc.)"
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-xs outline-none focus:border-gold min-h-[60px]"
                              />
                              <button
                                onClick={() => handleRequestAudition(app.id)}
                                disabled={requestingAuditionAppId === app.id}
                                className="bg-gold text-black px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50"
                              >
                                {requestingAuditionAppId === app.id ? 'Requesting…' : 'Send Request'}
                              </button>
                            </div>
                          )}

                          {showSelfTape && (
                            <div className="bg-black/20 rounded-lg p-3 border border-white/10">
                              <label className={cn(
                                "text-xs font-bold uppercase tracking-widest text-gold flex items-center gap-2 cursor-pointer",
                                (submittingSelfTapeAppId === app.id || !audition) && "opacity-50 pointer-events-none",
                              )}>
                                <Upload size={14} />
                                {submittingSelfTapeAppId === app.id ? 'Uploading…' : audition ? 'Submit Self-Tape' : 'Audition requested — self-tape upload available once confirmed'}
                                <input
                                  type="file"
                                  accept="video/*"
                                  className="hidden"
                                  onChange={(e) => { const f = e.target.files?.[0]; if (f) handleSubmitSelfTape(app.id, f); e.target.value = ''; }}
                                />
                              </label>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'availability' && (
              <motion.div key="availability" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center gap-2 mb-2">
              <Calendar size={24} className="text-gold" />
              <h2 className="text-3xl font-bold">Availability Calendar — Visit Our App</h2>
            </div>
            <p className="text-white/60 max-w-3xl mb-6">A real calendar of when you're free to work, kept in sync with your booked jobs, so casting directors and clients can see your availability before reaching out instead of guessing or asking directly.</p>
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
              <motion.div key="casting" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center gap-2 mb-2">
              <Users size={24} className="text-gold" />
              <h2 className="text-3xl font-bold">Casting Panel — Visit Our App</h2>
            </div>
            <p className="text-white/60 max-w-3xl mb-6">Create and manage casting calls directly from your business profile, and track real applicants against each open role, instead of using the general Casting page alone.</p>
              </motion.div>
            )}

            {activeTab === 'budget' && (
              <motion.div key="budget" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center gap-2 mb-2">
              <Calculator size={24} className="text-gold" />
              <h2 className="text-3xl font-bold">Budget Manager — Visit Our App</h2>
            </div>
            <p className="text-white/60 max-w-3xl mb-6">Real allocated/spent/remaining tracking per production, tied to actual bookings and payments instead of a static summary.</p>
              </motion.div>
            )}

            {activeTab === 'workflow' && (
              <motion.div key="workflow" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center gap-2 mb-2">
              <Settings size={24} className="text-gold" />
              <h2 className="text-3xl font-bold">Workflow Tracker — Visit Our App</h2>
            </div>
            <p className="text-white/60 max-w-3xl mb-6">A real pre-production → production → post-production → distribution pipeline view per project, reflecting actual milestones instead of a fixed demo stage.</p>
              </motion.div>
            )}

            {activeTab === 'legal' && (
              <motion.div key="legal" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center gap-2 mb-2">
              <ShieldCheck size={24} className="text-gold" />
              <h2 className="text-3xl font-bold">Contracts Vault — Visit Our App</h2>
            </div>
            <p className="text-white/60 max-w-3xl mb-6">NDA/contract generation, IP timestamping, and your active contracts — real legal documents tied to your real bookings, not fabricated claims.</p>
              </motion.div>
            )}
          </AnimatePresence>

      {/* Message thread — GET/POST /v1/conversations/{id}/messages, real.
          Inline corner panel (mirrors the WhatsApp button's fixed bottom
          corner treatment) instead of a full-screen modal, per explicit
          direction: this shouldn't block the rest of the page. */}
      <AnimatePresence>
        {activeConversation && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 left-6 z-[60] w-[22rem] max-w-[calc(100vw-3rem)] h-[28rem] max-h-[calc(100vh-3rem)] bg-cinematic-gray border border-white/10 flex flex-col rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h3 className="font-bold text-sm">{activeConversation.participants?.[0]?.displayName ?? 'SosrG member'}</h3>
              <button onClick={() => setActiveConversation(null)} className="text-white/40 hover:text-white p-1">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {threadLoading && [0, 1, 2].map((i) => <ScaffoldRow key={i} className="h-10 w-2/3" />)}
              {!threadLoading && threadMessages?.length === 0 && (
                <p className="text-xs text-white/30 italic text-center mt-8">No messages yet — say hello.</p>
              )}
              {!threadLoading && threadMessages?.map((m) => (
                <div key={m.id} className="bg-white/5 border border-white/10 rounded-xl p-3 max-w-[80%]">
                  <p className="text-sm">{m.body}</p>
                  <p className="text-[10px] text-white/30 mt-1">{new Date(m.createdAt).toLocaleTimeString()}</p>
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-white/10 flex gap-2">
              <input
                type="text"
                value={messageDraft}
                onChange={(e) => setMessageDraft(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !sendingMessage) handleSendMessage(); }}
                placeholder="Write a message…"
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-gold"
              />
              <button
                onClick={handleSendMessage}
                disabled={sendingMessage || !messageDraft.trim()}
                className="bg-gold text-black px-4 rounded-xl font-bold text-sm hover:bg-yellow-500 transition-colors disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
