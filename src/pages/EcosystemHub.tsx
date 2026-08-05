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
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  
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
    <div className="pt-32 px-6 max-w-7xl mx-auto min-h-screen pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif italic mb-2">SosrG <span className="vibrant-text-1">Ecosystem</span></h1>
          <p className="text-white/50">Premium AI-supported multi-level creative infrastructure.</p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <button 
            onClick={() => setIsSuperAdmin(!isSuperAdmin)}
            className={cn(
              "flex items-center justify-center md:justify-start gap-2 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border",
              isSuperAdmin ? "bg-crimson text-white border-crimson shadow-lg shadow-crimson/20" : "bg-white/5 text-white/40 border-white/10"
            )}
          >
            <ShieldCheck size={14} /> {isSuperAdmin ? 'Super Admin Active' : 'Switch to Super Admin'}
          </button>
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 overflow-x-auto no-scrollbar w-full md:w-auto">
            {[
              { id: 'hierarchy', label: 'CP Hierarchy', icon: Users },
              { id: 'franchise-structure', label: 'Franchise Structure', icon: Network },
              { id: 'revenue', label: 'Revenue Engine', icon: Wallet },
              { id: 'franchise', label: 'Academy Franchise', icon: Building2 },
              { id: 'monitoring', label: 'AI Monitoring', icon: BarChart3 },
              { id: 'counselling', label: 'AI Counselling', icon: GraduationCap },
              { id: 'grading', label: 'AI Grading', icon: Star },
              { id: 'event-builder', label: 'AI Event Builder', icon: Calendar },
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
            className="space-y-8"
          >
            <div className="flex items-center gap-2 mb-6">
              <Network size={24} className="text-gold" />
              <h2 className="text-3xl font-bold">Franchise Structure</h2>
            </div>
            <p className="text-white/60 max-w-3xl mb-8">
              A robust, multi-tiered franchise model designed to empower local leaders, scale operations nationally, and provide expert mentorship at every level. Each role features integrated performance tracking and AI-driven scoring to ensure quality and growth.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { 
                  id: 'pcp', 
                  title: 'PCP', 
                  subtitle: 'Pin-Code Connecting Partner',
                  desc: 'Local-level connector managing events and user queries.', 
                  icon: MapPin, 
                  color: 'text-crimson', 
                  bg: 'bg-crimson/10',
                  border: 'border-crimson/20',
                  score: 92,
                  metrics: ['Events Managed', 'User Queries Resolved']
                },
                { 
                  id: 'dcp', 
                  title: 'DCP', 
                  subtitle: 'District Connecting Partner',
                  desc: 'District-level mentor and event coordinator.', 
                  icon: Building2, 
                  color: 'text-emerald-400', 
                  bg: 'bg-emerald-500/10',
                  border: 'border-emerald-500/20',
                  score: 88,
                  metrics: ['District Events', 'Mentorship Sessions']
                },
                { 
                  id: 'scp', 
                  title: 'SCP', 
                  subtitle: 'State Connecting Partner',
                  desc: 'State-level strategic planner and revenue manager.', 
                  icon: Globe, 
                  color: 'text-blue-400', 
                  bg: 'bg-blue-500/10',
                  border: 'border-blue-500/20',
                  score: 95,
                  metrics: ['State Revenue', 'Strategic Plans Executed']
                },
                { 
                  id: 'zcp', 
                  title: 'ZCP', 
                  subtitle: 'Zonal Connecting Partner',
                  desc: 'National coordination and artist promotion.', 
                  icon: Users, 
                  color: 'text-purple-400', 
                  bg: 'bg-purple-500/10',
                  border: 'border-purple-500/20',
                  score: 91,
                  metrics: ['Artists Promoted', 'National Campaigns']
                },
                { 
                  id: 'ep', 
                  title: 'EP', 
                  subtitle: 'Expert Personality',
                  desc: 'Expert mentor conducting live sessions.', 
                  icon: Star, 
                  color: 'text-gold', 
                  bg: 'bg-gold/10',
                  border: 'border-gold/20',
                  score: 98,
                  metrics: ['Live Sessions', 'Mentee Success Rate']
                },
              ].map((role) => (
                <div key={role.id} className={cn("glass-panel p-6 border transition-all hover:-translate-y-1", role.border)}>
                  <div className="flex justify-between items-start mb-4">
                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", role.bg)}>
                      <role.icon className={role.color} size={24} />
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">AI Score</div>
                      <div className={cn("text-xl font-bold flex items-center gap-1", role.color)}>
                        <TrendingUp size={14} /> {role.score}/100
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-1">{role.title}</h3>
                  <div className={cn("text-xs font-bold uppercase tracking-widest mb-3", role.color)}>{role.subtitle}</div>
                  <p className="text-sm text-white/60 mb-6 h-10">{role.desc}</p>
                  
                  <div className="space-y-3">
                    <div className="text-[10px] uppercase tracking-widest text-white/40">Performance Tracking</div>
                    {role.metrics.map((metric, i) => (
                      <div key={i} className="flex justify-between items-center text-xs p-2 bg-white/5 rounded-lg">
                        <span className="text-white/80">{metric}</span>
                        <div className="w-16 h-1.5 bg-black/50 rounded-full overflow-hidden">
                          <div className={cn("h-full rounded-full", role.bg.replace('/10', ''))} style={{ width: `${70 + Math.random() * 30}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
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
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {REFERRAL_STATS.map((stat, i) => (
                <div key={i} className="glass-panel p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-gold/10 rounded-lg text-gold">
                      <stat.icon size={20} />
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400">{stat.trend}</span>
                  </div>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/40">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="glass-panel p-8">
              <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                <Zap className="text-gold" /> Transparent Revenue Automation
              </h3>
              <div className="space-y-6">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h4 className="font-bold">AI Referral Engine</h4>
                      <p className="text-xs text-white/40">Hierarchical tracking, auto-calculated revenue, and fake ID prevention.</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center gap-1"><ShieldCheck size={12}/> Fake ID Guard Active</span>
                      <button className="bg-gold text-black px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest">Withdraw Funds</button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {[
                      { from: 'SiDdhaRtha SosrG', project: 'Urban Beats Ad', commission: '₹12,400', status: 'Settled', date: 'Oct 28' },
                      { from: 'Sanya Iyer', project: 'Classical Fusion', commission: '₹8,500', status: 'Pending', date: 'Oct 25' },
                      { from: 'Vikram Singh', project: 'The Silent Valley', commission: '₹25,000', status: 'Settled', date: 'Oct 20' },
                    ].map((tx, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-white/5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gold">
                            <ArrowUpRight size={18} />
                          </div>
                          <div>
                            <div className="font-bold text-sm">{tx.from}</div>
                            <div className="text-[10px] text-white/40 uppercase tracking-widest">{tx.project} • {tx.date}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-emerald-400">{tx.commission}</div>
                          <div className={cn("text-[8px] font-bold uppercase tracking-widest", tx.status === 'Settled' ? "text-emerald-400" : "text-gold")}>{tx.status}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeView === 'franchise' && (
          <motion.div
            key="franchise"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="glass-panel p-12 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-crimson via-gold to-crimson" />
              <div className="w-20 h-20 bg-crimson/20 rounded-full flex items-center justify-center mx-auto mb-8 gold-glow">
                <Building2 size={40} className="text-crimson" />
              </div>
              <h2 className="text-3xl font-bold mb-4">SosrG Academy Franchise Module</h2>
              <p className="text-white/40 max-w-2xl mx-auto mb-10">
                Join our nationwide network of creative hubs. Standardized infrastructure for the next generation of Indian artists.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left">
                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                  <h4 className="text-gold font-bold text-sm uppercase tracking-widest mb-4 flex items-center gap-2"><Star size={16}/> Franchise Rights</h4>
                  <ul className="space-y-3 text-sm text-white/60">
                    <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5" /> Use SosrG Brand Logo</li>
                    <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5" /> Free Membership (1 Year)</li>
                    <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5" /> Casting Call Access</li>
                    <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5" /> Faculty Hiring Support</li>
                  </ul>
                </div>
                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                  <h4 className="text-blue-400 font-bold text-sm uppercase tracking-widest mb-4 flex items-center gap-2"><Building2 size={16}/> Physical Setup</h4>
                  <ul className="space-y-3 text-sm text-white/60">
                    <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5" /> 1 Office Room</li>
                    <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5" /> 2 Washrooms (Male/Female)</li>
                    <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5" /> 4 Classrooms: Dance Hall, Music Room, Acting Class, Art/Craft Class</li>
                  </ul>
                </div>
                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                  <h4 className="text-emerald-400 font-bold text-sm uppercase tracking-widest mb-4 flex items-center gap-2"><Briefcase size={16}/> Support Materials</h4>
                  <ul className="space-y-3 text-sm text-white/60">
                    <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5" /> Office Kit</li>
                    <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5" /> Training Kit</li>
                    <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5" /> Student Kit</li>
                  </ul>
                </div>
              </div>

              <div className="p-8 bg-black/30 border border-white/10 rounded-3xl text-left mb-8">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Cpu className="text-crimson"/> AI Academy Management</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                    <BarChart3 className="text-gold mb-3" size={20} />
                    <h5 className="font-bold text-sm mb-1">Track Performance</h5>
                    <p className="text-[10px] text-white/40">Real-time academy quality rating.</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                    <Users className="text-blue-400 mb-3" size={20} />
                    <h5 className="font-bold text-sm mb-1">Student Enrollments</h5>
                    <p className="text-[10px] text-white/40">Automated batch & fee monitoring.</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                    <Calendar className="text-emerald-400 mb-3" size={20} />
                    <h5 className="font-bold text-sm mb-1">Event Reports</h5>
                    <p className="text-[10px] text-white/40">Generate participation analytics.</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                    <Video className="text-crimson mb-3" size={20} />
                    <h5 className="font-bold text-sm mb-1">Casting Connect</h5>
                    <p className="text-[10px] text-white/40">Direct pipeline for top students.</p>
                  </div>
                </div>
              </div>

              <button className="bg-crimson text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform">Apply for Academy Franchise</button>
            </div>
          </motion.div>
        )}

        {activeView === 'monitoring' && (
          <motion.div
            key="monitoring"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="glass-panel p-8">
                  <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                    <BarChart3 className="text-gold" /> AI Monitoring Dashboard
                  </h3>
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                      <div className="text-xs text-white/40 uppercase tracking-widest mb-2">Platform Integrity</div>
                      <div className="text-3xl font-bold text-emerald-400">99.8%</div>
                      <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: '99.8%' }} />
                      </div>
                    </div>
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                      <div className="text-xs text-white/40 uppercase tracking-widest mb-2">Active CP Nodes</div>
                      <div className="text-3xl font-bold text-gold">452</div>
                      <div className="mt-4 flex gap-1">
                        {['PCP', 'DCP', 'SCP', 'ZCP', 'SP'].map(lvl => (
                          <div key={lvl} className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-gold/50" style={{ width: '70%' }} />
                          </div>
                        ))}
                      </div>
                      <div className="mt-2 flex justify-between text-[8px] text-white/20 uppercase tracking-widest">
                        <span>PCP</span><span>DCP</span><span>SCP</span><span>ZCP</span><span>SP</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-bold text-sm uppercase tracking-widest text-white/60">System Alerts</h4>
                    {[
                      { msg: 'DCP Mumbai: High traffic detected in Casting module.', time: '2 mins ago', type: 'info' },
                      { msg: 'SCP Karnataka: New franchise application pending review.', time: '15 mins ago', type: 'warning' },
                      { msg: 'System: Weekly revenue automation completed successfully.', time: '1 hour ago', type: 'success' },
                    ].map((alert, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          alert.type === 'info' ? "bg-blue-500" : alert.type === 'warning' ? "bg-gold" : "bg-emerald-500"
                        )} />
                        <div className="flex-1">
                          <p className="text-xs text-white/80">{alert.msg}</p>
                          <p className="text-[10px] text-white/20 uppercase tracking-widest mt-1">{alert.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {isSuperAdmin && (
                    <div className="mt-8 pt-8 border-t border-white/5">
                      <h4 className="font-bold text-sm uppercase tracking-widest text-crimson mb-6 flex items-center gap-2">
                        <ShieldCheck size={16} /> Super Admin Controls
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-crimson/5 border border-crimson/20 rounded-xl">
                          <div className="text-[10px] text-crimson font-bold uppercase tracking-widest mb-1">Total Revenue (India)</div>
                          <div className="text-xl font-bold">₹12.4 Cr</div>
                        </div>
                        <div className="p-4 bg-crimson/5 border border-crimson/20 rounded-xl">
                          <div className="text-[10px] text-crimson font-bold uppercase tracking-widest mb-1">Total Artist Base</div>
                          <div className="text-xl font-bold">1.2M</div>
                        </div>
                        <div className="p-4 bg-crimson/5 border border-crimson/20 rounded-xl">
                          <div className="text-[10px] text-crimson font-bold uppercase tracking-widest mb-1">Franchise Growth</div>
                          <div className="text-xl font-bold">+42%</div>
                        </div>
                      </div>
                      <div className="mt-6 flex gap-4">
                        <button className="flex-1 bg-crimson text-white py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest">Global System Reset</button>
                        <button className="flex-1 bg-white/5 border border-white/10 text-white py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest">Audit Logs</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-8">
                <div className="glass-panel p-8">
                  <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                    <PieChart className="text-gold" /> Gender Representation System
                  </h3>
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                        { level: 'State (SCP)', male: 28, female: 28, other: 28, total: 84 },
                        { level: 'District (DCP)', male: 766, female: 766, other: 766, total: 2298 },
                        { level: 'Pin Code (PCP)', male: 19000, female: 19000, other: 19000, total: 57000 },
                      ].map((lvl, i) => (
                        <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/10">
                          <div className="text-[10px] uppercase tracking-widest text-white/40 mb-3">{lvl.level}</div>
                          <div className="flex items-center gap-1 h-2 mb-3">
                            <div className="flex-1 bg-blue-500 rounded-full" />
                            <div className="flex-1 bg-crimson rounded-full" />
                            <div className="flex-1 bg-purple-500 rounded-full" />
                          </div>
                          <div className="flex justify-between text-[10px] font-bold">
                            <span className="text-blue-400">M: {lvl.male}</span>
                            <span className="text-crimson">F: {lvl.female}</span>
                            <span className="text-purple-400">O: {lvl.other}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-6 bg-black/30 rounded-2xl border border-white/10">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-bold text-sm uppercase tracking-widest text-emerald-400">AI Balance Tracker</h4>
                        <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded">Perfectly Balanced</span>
                      </div>
                      <p className="text-xs text-white/60 italic mb-4">"AI is currently maintaining a 1:1:1 ratio across all levels. Over-allocation prevention is active for 42 districts."</p>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: '100%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeView === 'counselling' && (
          <motion.div
            key="counselling"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="glass-panel p-12 text-center bg-gradient-to-br from-gold/10 to-transparent">
              <GraduationCap className="mx-auto mb-8 text-gold" size={60} />
              <h2 className="text-3xl font-bold mb-4">AI Career Counselling</h2>
              <p className="text-white/40 max-w-2xl mx-auto mb-10">
                Personalized career roadmaps for the Indian Art industries. Powered by real-time market data and industry trends.
              </p>
              <div className="max-w-4xl mx-auto space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-black/30 border border-white/10 rounded-2xl p-6 text-left">
                    <h4 className="font-bold mb-4 flex items-center gap-2 text-gold"><Zap size={18} /> Skill-Based Suggestions</h4>
                    <p className="text-sm text-white/60 mb-4">"Based on your profile as an Intermediate Method Actor, you are 3 projects away from the 'Expert' tier. We recommend focusing on Action Stunts to bridge your current skill gap."</p>
                    <div className="flex gap-2">
                      <span className="bg-white/5 px-2 py-1 rounded text-[10px] text-white/40 border border-white/10">Action Stunts</span>
                      <span className="bg-white/5 px-2 py-1 rounded text-[10px] text-white/40 border border-white/10">Voice Modulation</span>
                    </div>
                  </div>
                  <div className="bg-black/30 border border-white/10 rounded-2xl p-6 text-left">
                    <h4 className="font-bold mb-4 flex items-center gap-2 text-blue-400"><Briefcase size={18} /> Industry Recommendations</h4>
                    <p className="text-sm text-white/60 mb-4">"The OTT Web Series market is experiencing a +25% YoY growth. Your profile matches 84% of current casting requirements in this sector."</p>
                    <div className="flex gap-2">
                      <span className="bg-blue-500/10 px-2 py-1 rounded text-[10px] text-blue-400 border border-blue-500/20">OTT Platforms</span>
                      <span className="bg-blue-500/10 px-2 py-1 rounded text-[10px] text-blue-400 border border-blue-500/20">Indie Cinema</span>
                    </div>
                  </div>
                  <div className="bg-black/30 border border-white/10 rounded-2xl p-6 text-left">
                    <h4 className="font-bold mb-4 flex items-center gap-2 text-emerald-400"><GraduationCap size={18} /> Training Suggestions</h4>
                    <p className="text-sm text-white/60 mb-4">"Enroll in the 'Advanced Combat for Screen' workshop at your nearest SosrG Academy (Mumbai DCP) to improve your action stunt rating."</p>
                    <button className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest border border-emerald-400/30 px-4 py-2 rounded-lg hover:bg-emerald-400 hover:text-black transition-all">View Workshops</button>
                  </div>
                  <div className="bg-black/30 border border-white/10 rounded-2xl p-6 text-left">
                    <h4 className="font-bold mb-4 flex items-center gap-2 text-purple-400"><Video size={18} /> Portfolio Improvement</h4>
                    <p className="text-sm text-white/60 mb-4">"Your showreel lacks emotional range scenes. Adding a 60-second dramatic monologue will increase your AI match rate by 18%."</p>
                    <button className="text-[10px] font-bold text-purple-400 uppercase tracking-widest border border-purple-400/30 px-4 py-2 rounded-lg hover:bg-purple-400 hover:text-white transition-all">Upload New Reel</button>
                  </div>
                </div>
                <button className="w-full bg-gold text-black py-4 rounded-xl font-bold uppercase tracking-widest hover:scale-[1.02] transition-transform">
                  Generate Full Career Report
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {activeView === 'grading' && (
          <motion.div
            key="grading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="glass-panel p-8">
              <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                <Star className="text-gold" /> AI Grading & Rating System
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h4 className="font-bold text-sm uppercase tracking-widest text-white/60">Artist Performance Grading</h4>
                  <div className="space-y-4">
                    {[
                      { grade: 'A+', label: 'Elite Professional', count: '120', color: 'text-gold' },
                      { grade: 'A', label: 'Top Tier', count: '450', color: 'text-blue-400' },
                      { grade: 'B+', label: 'Rising Star', count: '1,200', color: 'text-emerald-400' },
                      { grade: 'B', label: 'Standard', count: '3,500', color: 'text-white/40' },
                    ].map((g, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                        <div className="flex items-center gap-4">
                          <div className={cn("text-2xl font-bold w-12", g.color)}>{g.grade}</div>
                          <div>
                            <div className="font-bold text-sm">{g.label}</div>
                            <div className="text-[10px] text-white/40 uppercase tracking-widest">AI Verified</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{g.count}</div>
                          <div className="text-[8px] uppercase tracking-widest text-white/20">Artists</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-6">
                  <h4 className="font-bold text-sm uppercase tracking-widest text-white/60">Ecosystem Ratings</h4>
                  <div className="p-6 bg-black/30 rounded-2xl border border-white/10 space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-white/80">Event Rating</span>
                        <span className="text-sm font-bold text-emerald-400">4.8/5.0</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: '96%' }} />
                      </div>
                      <p className="text-[10px] text-white/40 mt-1">Based on attendee feedback & AI analysis.</p>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-white/80">CP Performance Rating</span>
                        <span className="text-sm font-bold text-blue-400">92%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: '92%' }} />
                      </div>
                      <p className="text-[10px] text-white/40 mt-1">Based on active nodes & dispute resolution.</p>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-white/80">Academy Quality Rating</span>
                        <span className="text-sm font-bold text-gold">A+</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-gold" style={{ width: '98%' }} />
                      </div>
                      <p className="text-[10px] text-white/40 mt-1">Based on student placement & infrastructure.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                <Calendar className="text-gold" /> AI Event Builder
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
