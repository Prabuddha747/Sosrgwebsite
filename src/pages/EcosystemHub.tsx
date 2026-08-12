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

export const EcosystemHub = () => {
  const [activeView, setActiveView] = useState<'hierarchy' | 'revenue' | 'franchise' | 'monitoring' | 'counselling' | 'grading' | 'event-builder' | 'franchise-structure'>('hierarchy');
  
  const CP_LEVELS = [
    { 
      id: 'pcp', 
      name: 'Pin-Code Connecting Partner', 
      level: 'LEVEL 1', 
      icon: MapPin, 
      color: 'text-crimson',
      eligibility: ['Purchase SosrG Membership', 'Activate Green ID', '10 Actor/Model Profiles', '10 Business Profiles', '20 Creator Profiles'],
      duties: ['Connect Artists & Vendors', 'Manage Pin Code Data', 'Art Mart Store In-Charge', 'Local Event Creation'],
      revenue: ['Referral Coins', 'Referral Currency', 'Event Revenue %', 'Recognition Badge'],
      duration: 'Minimum 1 Year'
    },
    { 
      id: 'dcp', 
      name: 'District Connecting Partner', 
      level: 'LEVEL 2', 
      icon: Building2, 
      color: 'text-emerald-400',
      eligibility: ['1000 Talented Users via own + PCP network'],
      duties: ['Career Counseling', 'District Events', 'Connect Travel Agents', 'Monitor PCP Data', 'Implement Grading System'],
      revenue: ['Referral Income', 'Event Revenue %', 'District Performance Bonus'],
      duration: '3 Years'
    },
    { 
      id: 'scp', 
      name: 'State Connecting Partner', 
      level: 'LEVEL 3', 
      icon: Globe, 
      color: 'text-blue-400',
      eligibility: ['10,000 Users via DCP network', '100 Events under guidance'],
      duties: ['Guide DCPs', 'Monitor State System', 'Strategic Programs', 'High-level Career Guidance'],
      revenue: ['State-level Revenue Share', 'Event Commission', 'Platform Share'],
      duration: '5 Years'
    },
    { 
      id: 'zcp', 
      name: 'Zonal Connecting Partner', 
      level: 'LEVEL 4', 
      icon: Users, 
      color: 'text-purple-400',
      eligibility: ['Same as SCP'],
      duties: ['Monitor Multiple States', 'Coordinate with Super Admin', 'Regional Implementation'],
      revenue: ['Zonal Incentives', 'Cross-State Event %', 'High-tier Referral %'],
      duration: '5 Years'
    },
    { 
      id: 'sp', 
      name: 'SosrG Partner (Expert Personality)', 
      level: 'LEVEL 5', 
      icon: Star, 
      color: 'text-gold',
      eligibility: ['15 Years as CP', 'Clean Character Record'],
      duties: ['Live Mentorship', 'Video Content on Art Issues', 'Promotion of Indian Art & Culture', 'Guide CPs'],
      revenue: ['Premium Visibility', 'Honorary Recognition', 'Event Invitations'],
      duration: '6 Years'
    },
  ];

  const [selectedCP, setSelectedCP] = useState<typeof CP_LEVELS[0] | null>(null);

  const REFERRAL_STATS = [
    { label: 'Total Referrals', value: '1,240', trend: '+12%', icon: Users },
    { label: 'Referral Coins', value: '45,200', trend: '+15%', icon: Zap },
    { label: 'Referral Currency', value: '₹4.2L', trend: '+8%', icon: Wallet },
    { label: 'Active Partners', value: '85', trend: '+5%', icon: Handshake },
  ];

  return (
    <div className="pt-32 px-6 w-full max-w-400 mx-auto min-h-screen pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">SosrG <span className="gold-text">Ecosystem</span></h1>
          <p className="text-white/50">The infrastructure behind SosrG — AI-supported, multi-level, and built to grow with every Connecting Partner in it.</p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 overflow-x-auto no-scrollbar w-full md:w-auto">
            {[
              { id: 'hierarchy', label: 'CP Hierarchy', icon: Users },
              { id: 'franchise-structure', label: 'Franchise Structure', icon: Network },
              { id: 'revenue', label: 'Revenue Engine', icon: Wallet },
              { id: 'franchise', label: 'Academy Franchise', icon: Building2 },
              // { id: 'monitoring', label: 'AI Monitoring', icon: BarChart3 },
              // { id: 'counselling', label: 'AI Counselling', icon: GraduationCap },
              // { id: 'grading', label: 'AI Grading', icon: Star },
              // { id: 'event-builder', label: 'AI Event Builder', icon: Calendar },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id as any)}
                className={cn(
                  "flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap",
                  activeView === tab.id ? "bg-gold text-black" : "text-white/60 hover:text-white"
                )}
              >
                <tab.icon size={16} /> {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeView === 'franchise-structure' && (
          <motion.div
            key="franchise-structure"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2 mb-2">
              <Network size={24} className="text-gold" />
              <h2 className="text-3xl font-bold">Franchise Structure — Visit Our App</h2>
            </div>
            <p className="text-white/60 max-w-3xl mb-6">A multi-tiered franchise model for regional leaders and Connecting Partners, with performance tracking at every level.</p>
          </motion.div>
        )}

        {activeView === 'hierarchy' && (
          <motion.div
            key="hierarchy"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {CP_LEVELS.map((cp, i) => (
                <button 
                  key={cp.id} 
                  onClick={() => setSelectedCP(cp)}
                  className={cn(
                    "glass-panel p-6 text-center relative group transition-all",
                    selectedCP?.id === cp.id ? "border-gold shadow-lg shadow-gold/10" : "hover:border-gold/30"
                  )}
                >
                  <div className={cn("w-12 h-12 mx-auto mb-4 rounded-xl bg-white/5 flex items-center justify-center", cp.color)}>
                    <cp.icon size={24} />
                  </div>
                  <h3 className="font-bold text-sm mb-1">{cp.name}</h3>
                  <p className="text-[10px] uppercase tracking-widest text-white/40">{cp.level}</p>
                  {i < CP_LEVELS.length - 1 && (
                    <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-white/20">
                      <ChevronRight size={20} />
                    </div>
                  )}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {selectedCP && (
                <motion.div
                  key={selectedCP.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="glass-panel p-8 border-gold/20 bg-gold/5">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                      <div className="flex-1 space-y-6">
                        <div className="flex items-center gap-4">
                          <div className={cn("p-3 rounded-2xl bg-white/5", selectedCP.color)}>
                            <selectedCP.icon size={32} />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold">{selectedCP.name}</h3>
                            <p className="text-xs text-white/40 uppercase tracking-widest">{selectedCP.level} • {selectedCP.duration}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                          <div>
                            <h4 className="text-[10px] uppercase tracking-widest text-gold font-bold mb-4">Eligibility</h4>
                            <ul className="space-y-2">
                              {selectedCP.eligibility.map((e, idx) => (
                                <li key={idx} className="text-xs text-white/60 flex items-start gap-2">
                                  <div className="w-1 h-1 rounded-full bg-gold mt-1.5" /> {e}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-[10px] uppercase tracking-widest text-gold font-bold mb-4">Duties</h4>
                            <ul className="space-y-2">
                              {selectedCP.duties.map((d, idx) => (
                                <li key={idx} className="text-xs text-white/60 flex items-start gap-2">
                                  <div className="w-1 h-1 rounded-full bg-gold mt-1.5" /> {d}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-[10px] uppercase tracking-widest text-gold font-bold mb-4">Revenue</h4>
                            <ul className="space-y-2">
                              {selectedCP.revenue.map((r, idx) => (
                                <li key={idx} className="text-xs text-white/60 flex items-start gap-2">
                                  <div className="w-1 h-1 rounded-full bg-gold mt-1.5" /> {r}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={() => setSelectedCP(null)}
                        className="text-white/20 hover:text-white transition-colors"
                      >
                        <X size={24} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="glass-panel p-8">
              <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                <MapPin className="text-gold" /> Location-Based Artist Connection
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-black/30 rounded-2xl border border-white/10 h-[400px] relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20 bg-[url('https://picsum.photos/seed/india-map/1200/800')] bg-cover bg-center" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Globe className="text-gold/20 mx-auto mb-4" size={80} />
                      <p className="text-white/40 text-sm">Interactive India Artist Map</p>
                      <p className="text-[10px] uppercase tracking-widest text-gold mt-2 animate-pulse">Scanning 28 States & 8 UTs...</p>
                    </div>
                  </div>
                  {/* Mock Pins */}
                  <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-gold rounded-full crimson-glow animate-ping" />
                  <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-crimson rounded-full gold-glow animate-ping" />
                  <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-blue-500 rounded-full blue-glow animate-ping" />
                </div>
                <div className="space-y-4">
                  <h4 className="font-bold text-sm uppercase tracking-widest text-white/60">Nearby Artists</h4>
                  {[
                    { name: 'Rahul V.', role: 'Actor', dist: '2.4 km', status: 'Available' },
                    { name: 'Sneha K.', role: 'Dancer', dist: '5.1 km', status: 'In Project' },
                    { name: 'Amit S.', role: 'Director', dist: '8.9 km', status: 'Available' },
                    { name: 'Priya M.', role: 'Writer', dist: '12.4 km', status: 'Available' },
                  ].map((artist, i) => (
                    <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5 flex justify-between items-center">
                      <div>
                        <div className="font-bold text-sm">{artist.name}</div>
                        <div className="text-[10px] text-white/40 uppercase tracking-widest">{artist.role} • {artist.dist}</div>
                      </div>
                      <span className={cn("text-[8px] font-bold px-2 py-1 rounded uppercase tracking-widest", artist.status === 'Available' ? "bg-emerald-500/10 text-emerald-400" : "bg-white/10 text-white/40")}>
                        {artist.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeView === 'revenue' && (
          <motion.div
            key="revenue"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2 mb-2">
              <Wallet size={24} className="text-gold" />
              <h2 className="text-3xl font-bold">Revenue Engine — Visit Our App</h2>
            </div>
            <p className="text-white/60 max-w-3xl mb-6">Real-time revenue tracking and payout breakdowns across the franchise network — commission splits, regional performance, and settlement status.</p>
          </motion.div>
        )}

        {activeView === 'franchise' && (
          <motion.div
            key="franchise"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2 mb-2">
              <Building2 size={24} className="text-gold" />
              <h2 className="text-3xl font-bold">Academy Franchise — Visit Our App</h2>
            </div>
            <p className="text-white/60 max-w-3xl mb-6">A franchise pathway for running a local SosrG Academy — training programs, enrollment, and revenue share for franchise partners.</p>
          </motion.div>
        )}

        {activeView === 'monitoring' && (
          <motion.div
            key="monitoring"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 size={24} className="text-gold" />
              <h2 className="text-3xl font-bold">AI Monitoring — Visit Our App</h2>
            </div>
            <p className="text-white/60 max-w-3xl mb-6">Automated monitoring of franchise and platform activity — flags anomalies, tracks regional performance, and surfaces issues before they need manual review.</p>
          </motion.div>
        )}

        {activeView === 'counselling' && (
          <motion.div
            key="counselling"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap size={24} className="text-gold" />
              <h2 className="text-3xl font-bold">AI Counselling — Visit Our App</h2>
            </div>
            <p className="text-white/60 max-w-3xl mb-6">AI-assisted career guidance for artists and professionals — personalized recommendations based on your actual profile and activity, not a generic script.</p>
          </motion.div>
        )}

        {activeView === 'grading' && (
          <motion.div
            key="grading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2 mb-2">
              <Star size={24} className="text-gold" />
              <h2 className="text-3xl font-bold">AI Grading — Visit Our App</h2>
            </div>
            <p className="text-white/60 max-w-3xl mb-6">An automated skill/experience grading system feeding into account trust levels — assessed from real activity and verified work, not self-declared.</p>
          </motion.div>
        )}

        {activeView === 'event-builder' && (
          <motion.div
            key="event-builder"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="glass-panel p-8">
              <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                <Calendar className="text-gold" /> AI Event Builder — Visit Our App
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-gold/30 transition-all cursor-pointer group">
                  <FileText className="text-gold mb-4 group-hover:scale-110 transition-transform" size={32} />
                  <h4 className="font-bold text-sm mb-2">Template Generator</h4>
                  <p className="text-xs text-white/40">AI-generated schedules and requirements for any event type.</p>
                </div>
                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-blue-400/30 transition-all cursor-pointer group">
                  <Calculator className="text-blue-400 mb-4 group-hover:scale-110 transition-transform" size={32} />
                  <h4 className="font-bold text-sm mb-2">Budget Calculator</h4>
                  <p className="text-xs text-white/40">Predictive cost analysis based on location and scale.</p>
                </div>
                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-emerald-400/30 transition-all cursor-pointer group">
                  <Ticket className="text-emerald-400 mb-4 group-hover:scale-110 transition-transform" size={32} />
                  <h4 className="font-bold text-sm mb-2">Ticketing Integration</h4>
                  <p className="text-xs text-white/40">Automated pricing tiers and revenue tracking.</p>
                </div>
                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-purple-400/30 transition-all cursor-pointer group">
                  <Users className="text-purple-400 mb-4 group-hover:scale-110 transition-transform" size={32} />
                  <h4 className="font-bold text-sm mb-2">Volunteer Assignment</h4>
                  <p className="text-xs text-white/40">Smart matching of local PCPs to event roles.</p>
                </div>
              </div>
              <div className="p-8 bg-black/30 border border-white/10 rounded-3xl text-center">
                <h4 className="text-2xl font-bold mb-4">Start Building Your Next Event</h4>
                <p className="text-white/40 mb-8 max-w-xl mx-auto">Describe your event idea, and our AI will generate a complete blueprint including budget, schedule, and required personnel.</p>
                <div className="flex flex-col sm:flex-row max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-3xl sm:rounded-full p-2 focus-within:border-gold/50 transition-colors gap-2 sm:gap-0">
                  <input type="text" placeholder="e.g., A 3-day theatre festival in Mumbai..." className="flex-1 bg-transparent border-none outline-none px-4 sm:px-6 py-3 sm:py-0 text-sm" />
                  <button className="bg-gold text-black px-8 py-3 rounded-full font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform w-full sm:w-auto">Generate</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
