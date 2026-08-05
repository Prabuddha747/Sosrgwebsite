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
import type { Section, ProfileType, ExperienceLevel } from '../types';
import { ProfileSetupFlow } from '../components/profile/ProfileSetupFlow';

export const ProfileSystem = ({ initialType = 'artist' }: { initialType?: ProfileType }) => {
  const [isSettingUp, setIsSettingUp] = useState(false);
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

  const [activeTab, setActiveTab] = useState('wallet');

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
    <div className="pt-32 px-6 max-w-7xl mx-auto min-h-screen pb-24">
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
                  <h1 className="text-3xl font-bold">{profile.name}</h1>
                  <ShieldCheck className="text-blue-400" size={20} />
                </div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-3">
                  <span className="text-gold font-mono text-sm bg-gold/10 px-2 py-1 rounded">{profile.sosrgId}</span>
                  <span className="text-white/20">•</span>
                  <span className="text-white/80 text-sm font-medium">{profile.profession}</span>
                  <span className="text-white/20">•</span>
                  <span className="text-gold text-xs font-bold uppercase tracking-wider">{profile.industry}</span>
                  {profile.secondaryIndustry && (
                    <>
                      <span className="text-white/20">•</span>
                      <span className="text-white/40 text-xs font-bold uppercase tracking-wider">{profile.secondaryIndustry}</span>
                    </>
                  )}
                </div>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                  <span className="bg-white/5 border border-white/10 px-2 py-1 rounded text-[10px] text-white/60">{profile.location}</span>
                  <span className="bg-gold/10 border border-gold/20 px-2 py-1 rounded text-[10px] text-gold font-bold flex items-center gap-1">
                    <Star size={10} className="fill-gold" /> 4.8 Rating
                  </span>
                  {profile.hasGreenId && (
                    <span className="bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                      <ShieldCheck size={10} /> Green ID Active
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <button 
                onClick={() => setIsSettingUp(true)}
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
              <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                {(['fresher', 'intermediate', 'expert'] as ExperienceLevel[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setProfile({ ...profile, level: l })}
                    className={cn(
                      "px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all",
                      profile.level === l ? "bg-crimson text-white" : "text-white/40 hover:text-white"
                    )}
                  >
                    {l[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {Object.entries(currentStats).map(([key, value]) => (
              <div key={key} className="glass-panel p-6 text-center group hover:border-gold/30 transition-all">
                <div className="text-2xl font-bold text-gold mb-1">{value}</div>
                <div className="text-[10px] uppercase tracking-widest text-white/40 group-hover:text-white/60 transition-colors">{key}</div>
              </div>
            ))}
          </div>

          {/* Dashboard Tabs */}
          <div className="flex overflow-x-auto no-scrollbar gap-4 mb-8 border-b border-white/5 pb-4">
            {[
              { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
              { id: 'discovery', label: 'Smart Discovery', icon: Search },
              { id: 'profile-details', label: 'Profile Details', icon: User },
              { id: 'wallet', label: 'Wallet Overview', icon: Wallet },
              { id: 'finances', label: 'Finances', icon: Wallet },
              { id: 'bookings', label: 'Booking History', icon: Calendar },
              { id: 'network', label: 'My Network', icon: Users },
              { id: 'counselling', label: 'Counselling', icon: HeartHandshake },
              { id: 'management', label: 'Management', icon: Briefcase },
              { id: 'notifications', label: 'Notifications', icon: MessageSquare },
              { id: 'membership', label: 'Membership', icon: Star },
              { id: 'reviews', label: 'Reviews', icon: Star },
              { id: 'services', label: 'Services & Gigs', icon: Briefcase },
              { id: 'privacy', label: 'Privacy & Security', icon: ShieldCheck },
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

                {/* Trending Section */}
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <TrendingUp className="text-gold" size={24} />
                    <h2 className="text-2xl font-bold">Trending Now</h2>
                    <span className="bg-gold/10 text-gold text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded ml-2">AI Curated</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { name: 'Priya Sharma', role: 'Method Actor', rating: 4.9, views: '12k', image: 'https://picsum.photos/seed/priya/400/400', verified: true },
                      { name: 'Rahul Verma', role: 'Cinematographer', rating: 4.8, views: '8.5k', image: 'https://picsum.photos/seed/rahul/400/400', verified: true },
                      { name: 'Aditi Desai', role: 'Screenwriter', rating: 4.7, views: '6.2k', image: 'https://picsum.photos/seed/aditi/400/400', verified: false },
                      { name: 'Vikram Singh', role: 'Director', rating: 4.9, views: '15k', image: 'https://picsum.photos/seed/vikram/400/400', verified: true },
                    ].map((talent, i) => (
                      <div key={i} className="glass-panel p-4 group cursor-pointer hover:border-gold/30 transition-colors">
                        <div className="aspect-square rounded-xl overflow-hidden mb-4 relative">
                          <img src={talent.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={talent.name} referrerPolicy="no-referrer" />
                          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1">
                            <TrendingUp size={10} className="text-gold" /> {talent.views}
                          </div>
                        </div>
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-bold flex items-center gap-1">
                            {talent.name}
                            {talent.verified && <ShieldCheck size={14} className="text-emerald-400" />}
                          </h3>
                          <div className="flex items-center gap-1 text-xs font-bold text-gold">
                            <Star size={10} className="fill-gold" /> {talent.rating}
                          </div>
                        </div>
                        <p className="text-xs text-white/40">{talent.role}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Personalised Suggestions */}
                <div className="glass-panel p-8 bg-gradient-to-br from-blue-500/5 to-transparent border-blue-500/20">
                  <div className="flex items-center gap-2 mb-6">
                    <Zap className="text-blue-400" size={24} />
                    <h2 className="text-2xl font-bold">Suggested For You</h2>
                    <span className="text-xs text-white/40 ml-2">Based on your recent activity</span>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors cursor-pointer">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <Briefcase size={20} className="text-blue-400" />
                          </div>
                          <div>
                            <h4 className="font-bold">Feature Film Casting</h4>
                            <p className="text-xs text-white/40">Looking for Method Actors</p>
                          </div>
                        </div>
                        <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">98% Match</span>
                      </div>
                      <p className="text-sm text-white/60 mb-4">A major production house is looking for actors with your specific skill set for an upcoming thriller.</p>
                      <button className="text-xs font-bold uppercase tracking-widest text-blue-400 hover:text-blue-300 flex items-center gap-1">
                        View Details <ChevronRight size={14} />
                      </button>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors cursor-pointer">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                            <User size={20} className="text-gold" />
                          </div>
                          <div>
                            <h4 className="font-bold">Collaborator Suggestion</h4>
                            <p className="text-xs text-white/40">Cinematographer</p>
                          </div>
                        </div>
                        <span className="bg-gold/20 text-gold text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">High Synergy</span>
                      </div>
                      <p className="text-sm text-white/60 mb-4">You frequently work on projects similar to Rahul Verma's portfolio. Connecting could lead to great collaborations.</p>
                      <button className="text-xs font-bold uppercase tracking-widest text-gold hover:text-yellow-400 flex items-center gap-1">
                        Connect <ChevronRight size={14} />
                      </button>
                    </div>
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
                    {/* Basic Info */}
                    <div className="glass-panel-pink p-8">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold">Basic Information</h3>
                        <button className="text-xs text-gold hover:underline flex items-center gap-1"><Settings size={14} /> Edit</button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Full Name</div>
                          <div className="font-bold">{profile.name}</div>
                        </div>
                        <div>
                          <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Gender</div>
                          <div className="font-bold">{profile.gender}</div>
                        </div>
                        <div>
                          <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Profession</div>
                          <div className="font-bold">{profile.profession}</div>
                        </div>
                        <div>
                          <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Location</div>
                          <div className="font-bold">{profile.location}</div>
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Bio</div>
                        <p className="text-sm text-white/80 leading-relaxed">{profile.bio}</p>
                      </div>
                      <div className="mt-6">
                        <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Skill Tags</div>
                        <div className="flex flex-wrap gap-2">
                          {profile.skills.map((skill, i) => (
                            <span key={i} className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-xs font-medium">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Conditional Advanced Module */}
                    {profile.type === 'artist' && (
                      <div className="glass-panel-purple p-8">
                        <div className="flex justify-between items-center mb-6">
                          <h3 className="text-xl font-bold flex items-center gap-2"><Star size={20} className="text-gold" /> Actor/Model Advanced Module</h3>
                          <button className="text-xs text-gold hover:underline">Edit Module</button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                            <h4 className="text-sm font-bold text-white/60 uppercase tracking-widest mb-4 border-b border-white/10 pb-2">Physical Attributes</h4>
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span className="text-white/40 text-sm">Height</span>
                                <span className="font-bold text-sm">{profile.physicalAttributes.height}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white/40 text-sm">Weight</span>
                                <span className="font-bold text-sm">{profile.physicalAttributes.weight}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white/40 text-sm">Eye Color</span>
                                <span className="font-bold text-sm">{profile.physicalAttributes.eyeColor}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white/40 text-sm">Hair Color</span>
                                <span className="font-bold text-sm">{profile.physicalAttributes.hairColor}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-6">
                            <div>
                              <h4 className="text-sm font-bold text-white/60 uppercase tracking-widest mb-3 border-b border-white/10 pb-2">Experience Categories</h4>
                              <div className="flex flex-wrap gap-2">
                                {profile.experienceCategories.map((cat, i) => (
                                  <span key={i} className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                                    {cat}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-white/60 uppercase tracking-widest mb-3 border-b border-white/10 pb-2">Comfort Declaration</h4>
                              <div className="flex flex-wrap gap-2">
                                {profile.comfortDeclaration.map((dec, i) => (
                                  <span key={i} className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                                    {dec}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-white/60 uppercase tracking-widest mb-3 border-b border-white/10 pb-2">Availability</h4>
                              <span className="bg-gold/10 text-gold border border-gold/20 px-3 py-1 rounded-full text-xs font-bold">
                                {profile.availability}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
                          <div className="text-sm text-white/60">Generate a casting-ready digital resume instantly.</div>
                          <button className="bg-gold text-black px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors flex items-center gap-2">
                            <FileText size={14} /> Generate Resume
                          </button>
                        </div>
                      </div>
                    )}

                    {profile.type === 'business' && (
                      <div className="glass-panel-blue p-8">
                        <div className="flex justify-between items-center mb-6">
                          <h3 className="text-xl font-bold flex items-center gap-2"><Briefcase size={20} className="text-gold" /> Business Profile</h3>
                          {profile.hasGreenId && (
                            <div className="bg-emerald-500/20 text-emerald-500 px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                              <ShieldCheck size={14} /> Verified Business
                            </div>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                          <div>
                            <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Legal Status</div>
                            <div className="font-bold">{profile.companyInfo.legalStatus}</div>
                          </div>
                          <div>
                            <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Business Role</div>
                            <div className="font-bold">{profile.companyInfo.businessRole}</div>
                          </div>
                          <div className="md:col-span-2">
                            <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Registered Address</div>
                            <div className="font-bold">{profile.companyInfo.address}</div>
                          </div>
                          <div className="md:col-span-2">
                            <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Website</div>
                            <a href={`https://${profile.companyInfo.website}`} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-400 hover:underline flex items-center gap-1">
                              {profile.companyInfo.website} <ExternalLink size={12} />
                            </a>
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
                          <button className="w-full bg-gold text-black py-3 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-white transition-colors">
                            Generate Presentation
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-8">
                    {/* Media Uploads */}
                    <div className="glass-panel p-6">
                      <h3 className="font-bold mb-4 flex items-center gap-2"><Image size={16} className="text-gold" /> Media Gallery</h3>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="aspect-square bg-white/5 rounded-xl border border-white/10 flex flex-col items-center justify-center text-white/40 hover:text-gold hover:border-gold/50 transition-colors cursor-pointer">
                          <Image size={24} className="mb-2" />
                          <span className="text-[10px] uppercase tracking-widest font-bold">Photos</span>
                        </div>
                        <div className="aspect-square bg-white/5 rounded-xl border border-white/10 flex flex-col items-center justify-center text-white/40 hover:text-gold hover:border-gold/50 transition-colors cursor-pointer">
                          <Video size={24} className="mb-2" />
                          <span className="text-[10px] uppercase tracking-widest font-bold">Videos</span>
                        </div>
                        <div className="aspect-square bg-white/5 rounded-xl border border-white/10 flex flex-col items-center justify-center text-white/40 hover:text-gold hover:border-gold/50 transition-colors cursor-pointer">
                          <Mic size={24} className="mb-2" />
                          <span className="text-[10px] uppercase tracking-widest font-bold">Audio</span>
                        </div>
                        <div className="aspect-square bg-white/5 rounded-xl border border-white/10 flex flex-col items-center justify-center text-white/40 hover:text-gold hover:border-gold/50 transition-colors cursor-pointer">
                          <FileText size={24} className="mb-2" />
                          <span className="text-[10px] uppercase tracking-widest font-bold">Docs</span>
                        </div>
                      </div>
                      <button className="w-full bg-white/5 border border-white/10 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                        <Upload size={14} /> Upload New
                      </button>
                    </div>

                    {/* Social Links */}
                    <div className="glass-panel p-6">
                      <h3 className="font-bold mb-4 flex items-center gap-2"><Globe size={16} className="text-gold" /> Social Links</h3>
                      <div className="space-y-3">
                        <a href={`https://instagram.com/${profile.socialLinks.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10 hover:border-white/30 transition-colors group">
                          <div className="flex items-center gap-3">
                            <Instagram size={18} className="text-pink-500" />
                            <span className="text-sm font-medium">{profile.socialLinks.instagram}</span>
                          </div>
                          <ExternalLink size={14} className="text-white/20 group-hover:text-white/60" />
                        </a>
                        <a href={`https://youtube.com/c/${profile.socialLinks.youtube.replace(' ', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10 hover:border-white/30 transition-colors group">
                          <div className="flex items-center gap-3">
                            <Youtube size={18} className="text-red-500" />
                            <span className="text-sm font-medium">{profile.socialLinks.youtube}</span>
                          </div>
                          <ExternalLink size={14} className="text-white/20 group-hover:text-white/60" />
                        </a>
                        <a href={`https://${profile.socialLinks.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10 hover:border-white/30 transition-colors group">
                          <div className="flex items-center gap-3">
                            <Globe size={18} className="text-blue-400" />
                            <span className="text-sm font-medium">{profile.socialLinks.website}</span>
                          </div>
                          <ExternalLink size={14} className="text-white/20 group-hover:text-white/60" />
                        </a>
                      </div>
                      <button className="w-full mt-4 bg-white/5 border border-white/10 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                        <Plus size={14} /> Add Link
                      </button>
                    </div>
                  </div>
                </div>
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
                  <div className="glass-panel p-6 bg-gradient-to-br from-gold/10 to-transparent border-gold/20">
                    <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Total Balance</div>
                    <div className="text-4xl font-bold text-gold mb-4">₹2,45,000</div>
                    <div className="flex gap-2 mb-4">
                      <button className="flex-1 bg-gold text-black py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors">Withdraw</button>
                      <button className="flex-1 bg-white/5 border border-white/10 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">Add Funds</button>
                    </div>
                    <div className="text-[10px] text-white/60 bg-black/20 p-2 rounded border border-white/5">
                      <span className="text-gold font-bold">Withdrawal Policy:</span> Minimum ₹2500 weekly withdrawal on every Sunday at 11:34 PM.
                    </div>
                  </div>

                  {/* Pending Clearance */}
                  <div className="glass-panel p-6">
                    <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Pending Clearance</div>
                    <div className="text-3xl font-bold mb-2">₹45,000</div>
                    <p className="text-xs text-white/40">From 2 active projects. Expected clearance in 5-7 days.</p>
                  </div>

                  {/* SosrG Coins */}
                  <div className="glass-panel p-6 border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-transparent">
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-[10px] uppercase tracking-widest text-white/40">SosrG Coins</div>
                      <Award size={16} className="text-emerald-400" />
                    </div>
                    <div className="text-3xl font-bold mb-2 text-emerald-400">4,500 <span className="text-sm">Coins</span></div>
                    <p className="text-xs text-white/60 mb-3">Earn via referrals, votes, and platform engagement (Available for Users & CP Admins).</p>
                    <button className="w-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-emerald-500/30 transition-colors">
                      Redeem Coins
                    </button>
                  </div>

                  {/* Tokens */}
                  <div className="glass-panel p-6 border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-transparent">
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-[10px] uppercase tracking-widest text-white/40">Auction Tokens</div>
                      <Ticket size={16} className="text-blue-400" />
                    </div>
                    <div className="text-3xl font-bold mb-2 text-blue-400">1,250 <span className="text-sm">SGT</span></div>
                    <p className="text-xs text-white/60 mb-3">Exclusive tokens used for bidding in premium talent auctions and exclusive events.</p>
                    <button className="w-full bg-blue-500/20 text-blue-400 border border-blue-500/30 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-blue-500/30 transition-colors">
                      Buy Tokens
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Transaction History */}
                  <div className="lg:col-span-2 glass-panel p-8">
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
                      {[
                        { type: 'Earnings', desc: 'Milestone 2: "The Silent Valley"', amount: '+₹25,000', date: 'Today, 2:30 PM', status: 'Completed', color: 'text-emerald-400' },
                        { type: 'Withdrawal', desc: 'Bank Transfer to ****4567', amount: '-₹50,000', date: 'Yesterday', status: 'Processing', color: 'text-white' },
                        { type: 'Token Reward', desc: 'Profile Verification Bonus', amount: '+500 SGT', date: 'Oct 12, 2023', status: 'Completed', color: 'text-blue-400' },
                        { type: 'Coin Reward', desc: 'Referral Bonus (Rahul V.)', amount: '+200 Coins', date: 'Oct 11, 2023', status: 'Completed', color: 'text-emerald-400' },
                        { type: 'Earnings', desc: 'Advance: "Urban Lifestyle Ad"', amount: '+₹15,000', date: 'Oct 10, 2023', status: 'Completed', color: 'text-emerald-400' },
                      ].map((tx, i) => (
                        <div key={i} className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5">
                          <div className="flex items-center gap-4">
                            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center bg-white/5", tx.color)}>
                              {tx.type === 'Withdrawal' ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
                            </div>
                            <div>
                              <div className="font-bold text-sm">{tx.desc}</div>
                              <div className="text-xs text-white/40">{tx.date}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={cn("font-bold", tx.color)}>{tx.amount}</div>
                            <div className="text-[10px] uppercase tracking-widest text-white/40">{tx.status}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="space-y-6">
                    <div className="glass-panel p-6">
                      <h3 className="font-bold mb-4 flex items-center gap-2"><ShieldCheck size={18} className="text-gold" /> Secure Payment</h3>
                      <p className="text-xs text-white/60 mb-6">Powered by Razorpay. Add funds securely using your preferred payment method.</p>
                      
                      <div className="space-y-3">
                        <button className="w-full flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:border-gold/50 transition-colors group">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-blue-500/20 flex items-center justify-center">
                              <span className="font-bold text-blue-400 text-xs">UPI</span>
                            </div>
                            <span className="text-sm font-bold">Pay via UPI</span>
                          </div>
                          <ChevronRight size={16} className="text-white/20 group-hover:text-gold" />
                        </button>
                        
                        <button className="w-full flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:border-gold/50 transition-colors group">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-purple-500/20 flex items-center justify-center">
                              <span className="font-bold text-purple-400 text-xs">CC</span>
                            </div>
                            <span className="text-sm font-bold">Credit / Debit Card</span>
                          </div>
                          <ChevronRight size={16} className="text-white/20 group-hover:text-gold" />
                        </button>
                        
                        <button className="w-full flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:border-gold/50 transition-colors group">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-emerald-500/20 flex items-center justify-center">
                              <span className="font-bold text-emerald-400 text-xs">NB</span>
                            </div>
                            <span className="text-sm font-bold">Net Banking</span>
                          </div>
                          <ChevronRight size={16} className="text-white/20 group-hover:text-gold" />
                        </button>
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
                className="space-y-8"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Booking History</h2>
                  <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                    <button className="px-4 py-2 bg-white/10 rounded-lg text-xs font-bold uppercase tracking-widest">Current</button>
                    <button className="px-4 py-2 text-white/40 hover:text-white rounded-lg text-xs font-bold uppercase tracking-widest">Past</button>
                    <button className="px-4 py-2 text-white/40 hover:text-white rounded-lg text-xs font-bold uppercase tracking-widest">Auctions</button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { title: 'The Silent Valley', role: 'Lead Actor', date: 'Oct 15 - Nov 30', status: 'In Progress', type: 'Direct Booking', amount: '₹1,50,000' },
                    { title: 'Urban Lifestyle Ad', role: 'Model', date: 'Nov 5', status: 'Upcoming', type: 'Auction Won', amount: '₹45,000' },
                  ].map((booking, i) => (
                    <div key={i} className="glass-panel p-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 bg-gold text-black px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-bl-lg">
                        {booking.status}
                      </div>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold mb-1">{booking.title}</h3>
                          <div className="text-sm text-white/60">{booking.role}</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                          <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Schedule</div>
                          <div className="text-sm font-medium flex items-center gap-1"><Calendar size={14} className="text-gold" /> {booking.date}</div>
                        </div>
                        <div>
                          <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Booking Type</div>
                          <div className="text-sm font-medium flex items-center gap-1"><Gavel size={14} className="text-blue-400" /> {booking.type}</div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t border-white/10">
                        <div className="font-bold text-lg">{booking.amount}</div>
                        <button className="text-xs text-gold hover:underline font-bold uppercase tracking-widest">View Details</button>
                      </div>
                    </div>
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
                className="glass-panel-pink p-8"
              >
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold">Notifications</h2>
                  <button className="text-xs text-white/40 hover:text-white">Mark all as read</button>
                </div>
                
                <div className="space-y-4">
                  {[
                    { title: 'New Audition Match', desc: 'You have a 95% match for "Cyberpunk City" feature film.', time: '10 mins ago', type: 'alert', read: false },
                    { title: 'Bid Accepted', desc: 'Your bid of ₹45,000 for "Urban Lifestyle Ad" was accepted!', time: '2 hours ago', type: 'success', read: false },
                    { title: 'System Update', desc: 'Platform maintenance scheduled for Oct 20, 2:00 AM IST.', time: '1 day ago', type: 'system', read: true },
                    { title: 'Profile Verification', desc: 'Congratulations! Your Green ID verification is complete.', time: '3 days ago', type: 'success', read: true },
                    { title: 'Message from Casting Director', desc: '"Can you send a quick self-tape for the cafe scene?"', time: '4 days ago', type: 'message', read: true },
                  ].map((notif, i) => (
                    <div key={i} className={cn(
                      "p-4 rounded-xl border transition-colors flex gap-4",
                      notif.read ? "bg-white/5 border-white/5" : "bg-gold/5 border-gold/20"
                    )}>
                      <div className="mt-1">
                        {notif.type === 'alert' && <Zap size={20} className="text-gold" />}
                        {notif.type === 'success' && <CheckCircle size={20} className="text-emerald-400" />}
                        {notif.type === 'system' && <Settings size={20} className="text-blue-400" />}
                        {notif.type === 'message' && <MessageSquare size={20} className="text-white" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <div className={cn("font-bold text-sm", !notif.read && "text-gold")}>{notif.title}</div>
                          <div className="text-[10px] text-white/40">{notif.time}</div>
                        </div>
                        <div className="text-sm text-white/60">{notif.desc}</div>
                      </div>
                      {!notif.read && (
                        <div className="w-2 h-2 rounded-full bg-gold mt-2"></div>
                      )}
                    </div>
                  ))}
                </div>
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { name: 'Basic', price: 'Free', features: ['Basic Profile', 'Standard Casting Access', 'Community Forum'], current: true },
                    { name: 'Pro', price: '₹999/mo', features: ['Featured Profile', 'Priority Casting Access', '1 Free Workshop/mo', 'Advanced Analytics'], current: false },
                    { name: 'Elite', price: '₹2499/mo', features: ['Verified Badge', 'Direct Messaging to Directors', 'Unlimited Workshops', 'Legal Support'], current: false }
                  ].map((plan, i) => (
                    <div key={i} className={cn("glass-panel p-8 relative", plan.name === 'Pro' ? "border-gold/50 shadow-[0_0_30px_rgba(255,215,0,0.1)]" : "")}>
                      {plan.name === 'Pro' && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Most Popular</div>}
                      <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                      <div className="text-3xl font-serif italic text-gold mb-6">{plan.price}</div>
                      <ul className="space-y-4 mb-8">
                        {plan.features.map((feature, j) => (
                          <li key={j} className="flex items-center gap-3 text-sm text-white/80">
                            <CheckCircle2 size={16} className="text-emerald-400 shrink-0" /> {feature}
                          </li>
                        ))}
                      </ul>
                      <button className={cn("w-full py-3 rounded-xl font-bold uppercase tracking-widest transition-all", plan.current ? "bg-white/10 text-white/50 cursor-default" : plan.name === 'Pro' ? "bg-gold text-black hover:scale-105" : "bg-white/5 border border-white/10 hover:bg-white/10")}>
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
                className="space-y-8"
              >
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold">Ratings & Reviews</h2>
                  <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl">
                    <Star className="fill-gold text-gold" size={20} />
                    <span className="text-xl font-bold">4.8</span>
                    <span className="text-white/40 text-sm">(124 Reviews)</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { author: 'Rajesh Kumar', role: 'Director', rating: 5, date: '2 days ago', text: 'Arjun is a phenomenal actor. His dedication to the method is unparalleled. Highly recommended for intense dramatic roles.' },
                    { author: 'Priya Singh', role: 'Casting Director', rating: 4, date: '1 week ago', text: 'Great audition tape. Very professional and took direction well during the callback.' },
                    { author: 'Amit Patel', role: 'Producer', rating: 5, date: '1 month ago', text: 'Delivered lines perfectly on the first take. Saved us a lot of time on set.' },
                    { author: 'Sneha Reddy', role: 'Workshop Attendee', rating: 5, date: '2 months ago', text: 'The scriptwriting workshop was incredibly insightful. Learned so much about character arcs.' }
                  ].map((review, i) => (
                    <div key={i} className="glass-panel p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-white/10 overflow-hidden">
                            <img src={`https://picsum.photos/seed/rev${i}/100/100`} alt={review.author} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </div>
                          <div>
                            <h4 className="font-bold text-sm">{review.author}</h4>
                            <p className="text-[10px] text-white/40">{review.role}</p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, j) => (
                            <Star key={j} size={14} className={j < review.rating ? "fill-gold text-gold" : "text-white/20"} />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-white/80 italic">"{review.text}"</p>
                      <p className="text-[10px] text-white/40 mt-4 text-right">{review.date}</p>
                    </div>
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
                  {/* Profile Visibility */}
                  <div className="glass-panel p-6 space-y-6">
                    <h3 className="text-lg font-bold border-b border-white/10 pb-4">Profile Visibility</h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-bold text-sm">Public Profile</h4>
                          <p className="text-xs text-white/50">Allow anyone to view your basic profile.</p>
                        </div>
                        <div className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
                          <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-bold text-sm">Show Contact Info</h4>
                          <p className="text-xs text-white/50">Only visible to verified casting directors.</p>
                        </div>
                        <div className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
                          <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-bold text-sm">Portfolio Visibility</h4>
                          <p className="text-xs text-white/50">Control who can see your media assets.</p>
                        </div>
                        <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-sm text-white focus:outline-none focus:border-gold">
                          <option>Everyone</option>
                          <option>Connections Only</option>
                          <option>Private</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Account Security */}
                  <div className="glass-panel p-6 space-y-6">
                    <h3 className="text-lg font-bold border-b border-white/10 pb-4">Account Security</h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-bold text-sm">Two-Factor Authentication (2FA)</h4>
                          <p className="text-xs text-white/50">Add an extra layer of security to your account.</p>
                        </div>
                        <button className="bg-white/10 border border-white/20 px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-white/20 transition-colors">Enable</button>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-bold text-sm">Active Sessions</h4>
                          <p className="text-xs text-white/50">Manage devices logged into your account.</p>
                        </div>
                        <button className="text-xs text-gold hover:underline">View All</button>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-bold text-sm">Green ID Verification</h4>
                          <p className="text-xs text-emerald-400">Verified on Mar 1, 2026</p>
                        </div>
                        <CheckCircle2 className="text-emerald-400" size={20} />
                      </div>
                    </div>
                  </div>

                  {/* Data & Transactions */}
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
                      <button className="text-xs text-white/40 hover:text-white transition-colors">Download My Data</button>
                      <button className="text-xs text-crimson hover:text-red-400 transition-colors">Delete Account</button>
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
                <div className="lg:col-span-2 space-y-8">
                  <div className="glass-panel-orange p-8">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold">Recent Activity</h3>
                      <button className="text-xs text-gold hover:underline">View All</button>
                    </div>
                    <div className="space-y-6">
                      {[
                        { title: 'New Contract Signed', desc: 'Feature Film "The Silent Valley"', time: '2h ago', icon: ShieldCheck, color: 'text-emerald-400' },
                        { title: 'Payment Received', desc: 'Milestone 2 for Ad Campaign', time: '5h ago', icon: Wallet, color: 'text-gold' },
                        { title: 'New Connection', desc: 'Vikram Singh (Cinematographer)', time: '1d ago', icon: User, color: 'text-blue-400' },
                      ].map((item, i) => (
                        <div key={i} className="flex gap-4 items-start">
                          <div className={cn("mt-1", item.color)}>
                            <item.icon size={18} />
                          </div>
                          <div>
                            <div className="font-bold text-sm">{item.title}</div>
                            <div className="text-xs text-white/40">{item.desc}</div>
                            <div className="text-[10px] text-white/20 mt-1">{item.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="glass-panel-green p-8">
                    <h3 className="text-xl font-bold mb-6">Growth Tracking</h3>
                    <div className="h-48 flex items-end gap-2 px-4">
                      {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                        <div key={i} className="flex-1 bg-white/5 rounded-t-lg relative group">
                          <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            className={cn(
                              "absolute bottom-0 left-0 right-0 rounded-t-lg transition-all",
                              i === 5 ? "bg-gold" : "bg-white/10 group-hover:bg-white/20"
                            )}
                          />
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono">
                            {h}%
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-4 px-4 text-[10px] text-white/20 uppercase tracking-widest">
                      <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="glass-panel p-6 bg-gradient-to-br from-gold/10 to-transparent border-gold/20">
                    <div className="flex items-center gap-2 mb-4 text-gold">
                      <Zap size={18} />
                      <h3 className="font-bold">Smart AI Tip</h3>
                    </div>
                    <p className="text-sm text-white/80 leading-relaxed mb-4">
                      {profile.level === 'fresher' 
                        ? "Your portfolio views are up 20%. Adding a voice reel could increase your match rate by 35%."
                        : profile.level === 'intermediate'
                        ? "Market trends show a high demand for 'Naturalistic' acting in OTT series. Update your tags."
                        : "Your industry influence score is in the top 1%. Consider mentoring to unlock 'Legend' status."}
                    </p>
                    <button className="w-full bg-gold text-black py-2 rounded-lg text-xs font-bold uppercase tracking-widest">
                      Take Action
                    </button>
                  </div>

                  <div className="glass-panel p-6">
                    <h3 className="font-bold mb-4 flex items-center gap-2"><Trophy size={16} className="text-gold" /> Achievements</h3>
                    <div className="space-y-4">
                      {[
                        { name: 'Fast Learner', progress: 100, icon: Zap },
                        { name: 'Networker', progress: 65, icon: Globe },
                        { name: 'Top Earner', progress: 30, icon: Wallet },
                      ].map((ach) => (
                        <div key={ach.name}>
                          <div className="flex justify-between text-[10px] mb-1 uppercase tracking-widest">
                            <span>{ach.name}</span>
                            <span>{ach.progress}%</span>
                          </div>
                          <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                            <div className="bg-gold h-full" style={{ width: `${ach.progress}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'projects' && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold">{profile.type === 'artist' ? 'My Projects' : 'Active Productions'}</h3>
                  <button className="bg-gold text-black px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors">
                    {profile.type === 'artist' ? 'Browse More' : 'Post New'}
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { title: 'The Silent Valley', role: 'Lead Actor', status: 'In Production', progress: 65, budget: '₹12L' },
                    { title: 'Urban Beats Ad', role: 'Voice Over', status: 'Post-Production', progress: 90, budget: '₹45K' },
                    { title: 'Stage Play: Hamlet', role: 'Director', status: 'Rehearsals', progress: 30, budget: '₹2.5L' },
                  ].map((project, i) => (
                    <div key={i} className="glass-panel p-6 hover:border-gold/50 transition-all group">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-bold group-hover:text-gold transition-colors">{project.title}</h4>
                          <p className="text-xs text-white/40">{project.role}</p>
                        </div>
                        <span className="text-[10px] bg-gold/10 text-gold px-2 py-1 rounded-full uppercase font-bold">
                          {project.budget}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-[10px] uppercase tracking-widest">
                          <span className="text-white/40">{project.status}</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                          <div className="bg-gold h-full" style={{ width: `${project.progress}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
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
                    { label: 'Total Earnings', value: '₹18,45,000', change: '+12%', icon: Wallet },
                    { label: 'Pending Payments', value: '₹2,30,000', change: '-5%', icon: Clock },
                    { label: 'Active Contracts', value: '14', change: '+2', icon: ShieldCheck },
                  ].map((stat, i) => (
                    <div key={i} className="glass-panel p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-white/5 rounded-xl">
                          <stat.icon className="text-gold" size={24} />
                        </div>
                        <span className={cn("text-xs font-bold", stat.change.startsWith('+') ? "text-emerald-400" : "text-crimson")}>
                          {stat.change}
                        </span>
                      </div>
                      <div className="text-2xl font-bold mb-1">{stat.value}</div>
                      <div className="text-xs text-white/40 uppercase tracking-widest">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <div className="glass-panel-blue p-8">
                  <h3 className="text-xl font-bold mb-6">Transaction History</h3>
                  <div className="space-y-4">
                    {[
                      { name: 'Studio Rental', date: 'Oct 24, 2023', amount: '-₹15,000', status: 'Completed' },
                      { name: 'Ad Campaign Payout', date: 'Oct 22, 2023', amount: '+₹85,000', status: 'Completed' },
                      { name: 'Equipment Insurance', date: 'Oct 20, 2023', amount: '-₹4,200', status: 'Processing' },
                    ].map((tx, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-all">
                        <div className="flex items-center gap-4">
                          <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", tx.amount.startsWith('+') ? "bg-emerald-400/10 text-emerald-400" : "bg-crimson/10 text-crimson")}>
                            {tx.amount.startsWith('+') ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
                          </div>
                          <div>
                            <div className="font-bold text-sm">{tx.name}</div>
                            <div className="text-[10px] text-white/40 uppercase tracking-widest">{tx.date}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={cn("font-bold text-sm", tx.amount.startsWith('+') ? "text-emerald-400" : "text-white")}>{tx.amount}</div>
                          <div className="text-[10px] text-white/20 uppercase tracking-widest">{tx.status}</div>
                        </div>
                      </div>
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
                  <div className="flex gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={14} />
                      <input 
                        type="text" 
                        placeholder="Search connections..." 
                        className="bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-xs focus:outline-none focus:border-gold/50 w-64"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { name: 'Aarav Sharma', role: 'Director', industry: 'Cinema', level: 'Expert', img: 'https://i.pravatar.cc/150?u=1' },
                    { name: 'Ishani Gupta', role: 'Writer', industry: 'Literature', level: 'Intermediate', img: 'https://i.pravatar.cc/150?u=2' },
                    { name: 'Rohan Verma', role: 'Musician', industry: 'Music', level: 'Expert', img: 'https://i.pravatar.cc/150?u=3' },
                    { name: 'Meera Kapur', role: 'Dancer', industry: 'Dance', level: 'Fresher', img: 'https://i.pravatar.cc/150?u=4' },
                    { name: 'Kabir Singh', role: 'Actor', industry: 'Theatre', level: 'Expert', img: 'https://i.pravatar.cc/150?u=5' },
                    { name: 'Sanya Malhotra', role: 'Designer', industry: 'Art', level: 'Intermediate', img: 'https://i.pravatar.cc/150?u=6' },
                  ].map((person, i) => (
                    <div key={i} className="glass-panel p-6 text-center hover:border-gold/50 transition-all group">
                      <div className="relative w-20 h-20 mx-auto mb-4">
                        <img src={person.img} alt={person.name} className="w-full h-full rounded-full object-cover border-2 border-white/10 group-hover:border-gold transition-colors" />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gold rounded-full flex items-center justify-center border-2 border-black">
                          <ShieldCheck size={12} className="text-black" />
                        </div>
                      </div>
                      <h4 className="font-bold text-sm mb-1">{person.name}</h4>
                      <p className="text-[10px] text-white/40 uppercase tracking-widest mb-4">{person.role} • {person.industry}</p>
                      <button className="w-full py-2 bg-white/5 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-gold hover:text-black transition-all">
                        Message
                      </button>
                    </div>
                  ))}
                </div>
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
                <div className="glass-panel-green p-12 text-center bg-gradient-to-br from-gold/10 to-transparent">
                  <GraduationCap className="mx-auto mb-8 text-gold" size={60} />
                  <h2 className="text-3xl font-bold mb-4">AI Career Counselling</h2>
                  <p className="text-white/40 max-w-2xl mx-auto mb-10">
                    Personalized career roadmaps for the Indian Art industries. Powered by real-time market data and industry trends.
                  </p>
                  <div className="max-w-3xl mx-auto space-y-6">
                    <div className="bg-black/30 border border-white/10 rounded-2xl p-8 text-left">
                      <h4 className="font-bold mb-4 flex items-center gap-2 text-gold"><Zap size={18} /> Career Roadmap AI</h4>
                      <p className="text-sm text-white/80 mb-6">"Based on your current profile as an {profile.level} {profile.profession}, you are on a strong trajectory. To reach the next level, we recommend focusing on {profile.industry === 'Cinema' ? 'OTT Web Series' : 'International Theatre Festivals'} in the next quarter to maximize visibility."</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                          <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Market Demand</div>
                          <div className="text-lg font-bold text-emerald-400">High</div>
                        </div>
                        <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                          <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Skill Gap</div>
                          <div className="text-lg font-bold text-gold">{profile.type === 'artist' ? 'Action Stunts' : 'Digital Marketing'}</div>
                        </div>
                        <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                          <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Est. Growth</div>
                          <div className="text-lg font-bold text-blue-400">+25% YoY</div>
                        </div>
                      </div>
                    </div>
                    <button className="w-full bg-gold text-black py-4 rounded-xl font-bold uppercase tracking-widest hover:scale-[1.02] transition-transform">
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
                    <div className="glass-panel-pink p-8">
                      <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                          <Settings className="text-gold" /> Active Task Tracking
                        </h3>
                        <div className="flex gap-2">
                          <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full font-bold uppercase tracking-widest">4 Active</span>
                          <span className="text-[10px] bg-crimson/10 text-crimson px-2 py-1 rounded-full font-bold uppercase tracking-widest">2 Overdue</span>
                        </div>
                      </div>
                      <div className="space-y-4">
                        {[
                          { task: 'Dubbing for Episode 4', project: 'Urban Beats Ad', deadline: 'Today, 6 PM', status: 'overdue', priority: 'High' },
                          { task: 'Script Review: Scene 12-15', project: 'The Silent Valley', deadline: 'Tomorrow', status: 'pending', priority: 'Medium' },
                          { task: 'Costume Fitting', project: 'Stage Play: Hamlet', deadline: 'Oct 30', status: 'pending', priority: 'Low' },
                        ].map((task, i) => (
                          <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 group hover:border-gold/30 transition-all">
                            <div className="flex items-center gap-4">
                              <div className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center",
                                task.status === 'overdue' ? "bg-crimson/10 text-crimson" : "bg-white/10 text-white/40"
                              )}>
                                {task.status === 'overdue' ? <AlertCircle size={18} /> : <Clock size={18} />}
                              </div>
                              <div>
                                <div className="font-bold text-sm group-hover:text-gold transition-colors">{task.task}</div>
                                <div className="text-[10px] text-white/40 uppercase tracking-widest">{task.project} • {task.deadline}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className={cn(
                                "text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest",
                                task.priority === 'High' ? "text-crimson" : task.priority === 'Medium' ? "text-gold" : "text-blue-400"
                              )}>
                                {task.priority} Priority
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="glass-panel-purple p-8">
                      <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                        <Lock className="text-gold" /> Payment Milestone Lock
                      </h3>
                      <div className="space-y-6">
                        {[
                          { milestone: 'Pre-production Advance', amount: '₹2,50,000', status: 'Released', date: 'Oct 15' },
                          { milestone: 'Dubbing Completion', amount: '₹1,20,000', status: 'Locked', date: 'Pending Task' },
                          { milestone: 'Final Delivery', amount: '₹3,00,000', status: 'Locked', date: 'Project End' },
                        ].map((m, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className={cn(
                                "w-12 h-12 rounded-xl flex items-center justify-center border",
                                m.status === 'Released' ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-white/5 border-white/10 text-white/20"
                              )}>
                                {m.status === 'Released' ? <CheckCircle size={20} /> : <Lock size={20} />}
                              </div>
                              <div>
                                <div className="font-bold text-sm">{m.milestone}</div>
                                <div className="text-[10px] text-white/40 uppercase tracking-widest">{m.status} • {m.date}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-gold">{m.amount}</div>
                              <button className="text-[10px] text-white/20 hover:text-white uppercase tracking-widest underline">Details</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="glass-panel p-6 bg-gradient-to-br from-crimson/10 to-transparent border-crimson/20">
                      <div className="flex items-center gap-2 mb-4 text-crimson">
                        <AlertCircle size={18} />
                        <h3 className="font-bold">Deadline Alerts</h3>
                      </div>
                      <div className="space-y-4">
                        <div className="p-4 bg-black/30 rounded-xl border border-crimson/20">
                          <p className="text-xs text-white/80 mb-2">Dubbing for "Urban Beats Ad" is overdue by 2 hours.</p>
                          <button className="w-full bg-crimson text-white py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest">
                            Resolve Now
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="glass-panel p-6">
                      <h3 className="font-bold mb-4 flex items-center gap-2"><TrendingUp size={16} className="text-gold" /> Productivity AI</h3>
                      <div className="text-center py-4">
                        <div className="text-4xl font-bold text-gold mb-2">88%</div>
                        <p className="text-[10px] text-white/40 uppercase tracking-widest">Efficiency Score</p>
                        <div className="mt-6 space-y-2">
                          <div className="flex justify-between text-[10px] uppercase tracking-widest">
                            <span>Tasks Completed</span>
                            <span>24/28</span>
                          </div>
                          <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                            <div className="bg-gold h-full" style={{ width: '85%' }} />
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
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold">Portfolio Manager</h3>
                  <button className="bg-gold text-black px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors flex items-center gap-2">
                    <Plus size={14} /> Add Media
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="glass-panel p-4 group cursor-pointer">
                      <div className="aspect-video bg-black/50 rounded-lg mb-4 overflow-hidden relative">
                        <img src={`https://picsum.photos/seed/portfolio${i}/400/300`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Portfolio item" referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Play className="text-white" size={32} />
                        </div>
                      </div>
                      <h4 className="font-bold mb-1">Showreel 202{i}</h4>
                      <p className="text-xs text-white/40">Added 2 months ago</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'auditions' && (
              <motion.div
                key="auditions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold">Auditions Applied</h3>
                <div className="glass-panel p-6">
                  <div className="space-y-4">
                    {[
                      { role: 'Lead Actor', project: 'Neon Dreams', status: 'Shortlisted', date: 'Oct 15, 2026' },
                      { role: 'Supporting Cast', project: 'The Last Symphony', status: 'Pending', date: 'Oct 10, 2026' },
                      { role: 'Voice Over', project: 'Galactic Wars', status: 'Rejected', date: 'Sep 28, 2026' }
                    ].map((audition, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                        <div>
                          <h4 className="font-bold">{audition.role}</h4>
                          <p className="text-sm text-white/60">{audition.project} • Applied {audition.date}</p>
                        </div>
                        <span className={cn(
                          "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest",
                          audition.status === 'Shortlisted' ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" :
                          audition.status === 'Pending' ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" :
                          "bg-red-500/20 text-red-400 border border-red-500/30"
                        )}>
                          {audition.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'availability' && (
              <motion.div
                key="availability"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold">Availability Calendar</h3>
                <div className="glass-panel p-8 text-center">
                  <Calendar className="mx-auto text-gold mb-4" size={48} />
                  <h4 className="text-xl font-bold mb-2">Manage Your Schedule</h4>
                  <p className="text-white/60 mb-6 max-w-md mx-auto">Keep your availability up to date so casting directors and clients know when you're free to work.</p>
                  <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-bold transition-colors">
                    Sync with Google Calendar
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'ai-insights' && (
              <motion.div
                key="ai-insights"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Zap className="text-gold" size={28} />
                  <h3 className="text-2xl font-bold">AI Match Suggestions</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="glass-panel p-6 border-gold/30">
                    <h4 className="font-bold text-gold mb-4">Recommended Roles</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="text-emerald-400 mt-1" />
                        <span className="text-sm">Your profile strongly matches "Intense Antagonist" roles in upcoming thrillers.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="text-emerald-400 mt-1" />
                        <span className="text-sm">Consider adding more "Voice Over" samples to increase match rate by 40%.</span>
                      </li>
                    </ul>
                  </div>
                  <div className="glass-panel p-6">
                    <h4 className="font-bold mb-4">Skill Gap Analysis</h4>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Action Choreography</span>
                          <span className="text-gold">Suggested</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-gold w-1/3" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Dialect: British</span>
                          <span className="text-gold">High Demand</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-gold w-1/4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'casting' && (
              <motion.div
                key="casting"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold">Casting Panel</h3>
                  <button className="bg-gold text-black px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors">
                    Create Call
                  </button>
                </div>
                <div className="glass-panel p-6">
                  <div className="text-center py-12">
                    <Users className="mx-auto text-white/20 mb-4" size={48} />
                    <h4 className="text-xl font-bold mb-2">No Active Casting Calls</h4>
                    <p className="text-white/60">Create a casting call to start receiving auditions from verified talent.</p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'budget' && (
              <motion.div
                key="budget"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold">Budget Manager</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="glass-panel p-6">
                    <div className="text-white/60 text-sm mb-2">Total Allocated</div>
                    <div className="text-3xl font-bold text-gold">₹45.5L</div>
                  </div>
                  <div className="glass-panel p-6">
                    <div className="text-white/60 text-sm mb-2">Spent</div>
                    <div className="text-3xl font-bold text-emerald-400">₹12.2L</div>
                  </div>
                  <div className="glass-panel p-6">
                    <div className="text-white/60 text-sm mb-2">Remaining</div>
                    <div className="text-3xl font-bold text-blue-400">₹33.3L</div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'workflow' && (
              <motion.div
                key="workflow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold">Workflow Tracker</h3>
                <div className="glass-panel p-6">
                  <div className="space-y-6">
                    {['Pre-Production', 'Production', 'Post-Production', 'Distribution'].map((stage, i) => (
                      <div key={stage} className="flex items-center gap-4">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm",
                          i === 0 ? "bg-emerald-500 text-white" : i === 1 ? "bg-gold text-black" : "bg-white/10 text-white/40"
                        )}>
                          {i + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className={cn("font-bold", i > 1 && "text-white/40")}>{stage}</h4>
                          <div className="h-2 mt-2 bg-white/5 rounded-full overflow-hidden">
                            <div className={cn("h-full", i === 0 ? "bg-emerald-500 w-full" : i === 1 ? "bg-gold w-1/2" : "w-0")} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'legal' && (
              <motion.div
                key="legal"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="glass-panel-orange p-12 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-gold to-blue-500" />
                  <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-8 gold-glow">
                    <ShieldCheck size={40} className="text-blue-400" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4">AI Legal Protection</h2>
                  <p className="text-white/40 max-w-2xl mx-auto mb-10">
                    Smart automated legal tools to protect your intellectual property and ensure fair contracts.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { title: 'Auto NDA Generator', desc: 'Instant non-disclosure agreements for collaborations.', icon: FileText },
                      { title: 'Contract Draft AI', desc: 'Generate industry-standard contracts in seconds.', icon: Scale },
                      { title: 'Copyright Timestamp', desc: 'Secure blockchain-based proof of creation.', icon: History },
                    ].map((tool, i) => (
                      <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-blue-500/50 transition-all cursor-pointer group">
                        <tool.icon className="mx-auto mb-4 text-blue-400 group-hover:scale-110 transition-transform" size={32} />
                        <h3 className="font-bold mb-2">{tool.title}</h3>
                        <p className="text-xs text-white/40">{tool.desc}</p>
                        <button className="mt-4 text-[10px] font-bold text-blue-400 uppercase tracking-widest group-hover:underline">Launch Tool</button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="glass-panel p-8">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <History size={20} className="text-gold" /> Recent IP Timestamps
                    </h3>
                    <div className="space-y-4">
                      {[
                        { name: 'Script: The Silent Valley (v2)', date: 'Oct 26, 2023', hash: '0x7f...3a21' },
                        { name: 'Musical Score: Urban Beats', date: 'Oct 22, 2023', hash: '0x4c...9b88' },
                      ].map((ip, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                          <div>
                            <div className="font-bold text-sm">{ip.name}</div>
                            <div className="text-[10px] text-white/40 uppercase tracking-widest">{ip.date}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-[10px] font-mono text-gold">{ip.hash}</div>
                            <div className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold">Verified</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="glass-panel p-8">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <FileCheck size={20} className="text-gold" /> Active Contracts
                    </h3>
                    <div className="space-y-4">
                      {[
                        { project: 'The Silent Valley', party: 'Dharma Productions', status: 'Signed' },
                        { project: 'Urban Beats Ad', party: 'Brand Agency', status: 'Pending Review' },
                      ].map((c, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                          <div>
                            <div className="font-bold text-sm">{c.project}</div>
                            <div className="text-[10px] text-white/40 uppercase tracking-widest">{c.party}</div>
                          </div>
                          <span className={cn(
                            "text-[10px] font-bold px-3 py-1 rounded-full",
                            c.status === 'Signed' ? "bg-emerald-500/10 text-emerald-400" : "bg-gold/10 text-gold"
                          )}>
                            {c.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
};
