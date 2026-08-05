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

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'verification' | 'fraud' | 'revenue' | 'moderation' | 'legal' | 'users' | 'casting' | 'analytics' | 'settings'>('analytics');

  const tabs = [
    { id: 'analytics', label: 'Analytics & Reports', icon: BarChart3 },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'casting', label: 'Casting Moderation', icon: Video },
    { id: 'verification', label: 'User Verification', icon: ShieldCheck },
    { id: 'fraud', label: 'Fraud Monitoring', icon: AlertCircle },
    { id: 'revenue', label: 'Revenue & Commission', icon: Wallet },
    { id: 'moderation', label: 'Content Moderation', icon: FileCheck },
    { id: 'legal', label: 'Legal Escalation', icon: Gavel },
    { id: 'settings', label: 'Platform Settings', icon: Settings },
  ];

  return (
    <div className="pt-32 px-6 max-w-7xl mx-auto min-h-screen pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <Lock className="text-crimson" /> Admin Control Panel
          </h2>
          <p className="text-white/40 text-sm mt-2">Internal moderation and security management hub.</p>
        </div>
        <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-widest text-white/40">System Status</div>
            <div className="text-emerald-400 font-bold text-sm flex items-center gap-1 justify-end">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" /> All Systems Operational
            </div>
          </div>
        </div>
      </div>

      <div className="flex overflow-x-auto no-scrollbar gap-4 mb-8 border-b border-white/5 pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all",
              activeTab === tab.id ? "bg-crimson/10 text-crimson border border-crimson/30" : "text-white/40 hover:text-white"
            )}
          >
            <tab.icon size={16} /> {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'analytics' && (
          <motion.div
            key="analytics"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Total Users', value: '124.5k', change: '+12%', color: 'text-emerald-400' },
                { label: 'Active Casting Calls', value: '3,420', change: '+5%', color: 'text-gold' },
                { label: 'Monthly Revenue', value: '₹4.2Cr', change: '+18%', color: 'text-emerald-400' },
                { label: 'Pending Verifications', value: '142', change: '-2%', color: 'text-crimson' },
              ].map((stat, i) => (
                <div key={i} className="glass-panel p-6">
                  <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">{stat.label}</div>
                  <div className="flex items-end justify-between">
                    <div className="text-3xl font-bold">{stat.value}</div>
                    <div className={cn("text-xs font-bold", stat.color)}>{stat.change}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="glass-panel p-6">
                <h3 className="font-bold mb-6">User Growth by Sector</h3>
                <div className="space-y-4">
                  {[
                    { sector: 'Cinema', percentage: 45 },
                    { sector: 'Theatre', percentage: 25 },
                    { sector: 'Music', percentage: 15 },
                    { sector: 'Literature', percentage: 10 },
                    { sector: 'Others', percentage: 5 },
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs mb-1">
                        <span>{item.sector}</span>
                        <span className="text-gold">{item.percentage}%</span>
                      </div>
                      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-gold rounded-full" style={{ width: `${item.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass-panel p-6">
                <h3 className="font-bold mb-6">Recent Platform Activity</h3>
                <div className="space-y-4">
                  {[
                    { action: 'New Casting Call Posted', user: 'Dharma Productions', time: '10 mins ago' },
                    { action: 'User Verified (Green ID)', user: 'SiDdhaRtha SosrG', time: '25 mins ago' },
                    { action: 'High-Value Transaction', user: '₹5,00,000 Escrow', time: '1 hour ago' },
                    { action: 'Fraud Alert Triggered', user: 'Suspicious IP Login', time: '2 hours ago' },
                  ].map((activity, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                      <div>
                        <div className="font-bold text-sm">{activity.action}</div>
                        <div className="text-xs text-white/50">{activity.user}</div>
                      </div>
                      <div className="text-[10px] text-white/40">{activity.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'users' && (
          <motion.div
            key="users"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center mb-6">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
                <input 
                  type="text" 
                  placeholder="Search users by name, email, or ID..." 
                  className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-gold"
                />
              </div>
              <button className="bg-white/10 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-white/20">
                <Filter size={16} /> Filter
              </button>
            </div>

            <div className="glass-panel overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-xs uppercase tracking-widest text-white/40">
                    <th className="p-4">User</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Joined</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'SiDdhaRtha SosrG', email: 'arjun@example.com', role: 'Artist', status: 'Active', joined: 'Oct 2025', verified: true },
                    { name: 'Priya Singh', email: 'priya@example.com', role: 'Casting Director', status: 'Suspended', joined: 'Nov 2025', verified: false },
                    { name: 'Rohan Desai', email: 'rohan@example.com', role: 'Producer', status: 'Active', joined: 'Jan 2026', verified: true },
                  ].map((user, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-white/10 overflow-hidden">
                            <img src={`https://picsum.photos/seed/user${i}/100/100`} alt={user.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </div>
                          <div>
                            <div className="font-bold text-sm flex items-center gap-1">
                              {user.name} {user.verified && <ShieldCheck size={12} className="text-emerald-400" />}
                            </div>
                            <div className="text-xs text-white/50">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm">{user.role}</td>
                      <td className="p-4">
                        <span className={cn("px-2 py-1 rounded text-[10px] uppercase tracking-widest", user.status === 'Active' ? "bg-emerald-500/20 text-emerald-400" : "bg-crimson/20 text-crimson")}>
                          {user.status}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-white/60">{user.joined}</td>
                      <td className="p-4 text-right">
                        <button className="text-white/40 hover:text-white"><MoreHorizontal size={18} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === 'casting' && (
          <motion.div
            key="casting"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="glass-panel p-6 border-gold/20">
                <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Pending Review</div>
                <div className="text-3xl font-bold text-gold">24</div>
              </div>
              <div className="glass-panel p-6 border-emerald-500/20">
                <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Approved Today</div>
                <div className="text-3xl font-bold text-emerald-400">156</div>
              </div>
              <div className="glass-panel p-6 border-crimson/20">
                <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Flagged Content</div>
                <div className="text-3xl font-bold text-crimson">8</div>
              </div>
            </div>

            <div className="glass-panel p-6">
              <h3 className="font-bold mb-6">Moderation Queue</h3>
              <div className="space-y-4">
                {[
                  { title: 'Lead Actor for Indie Film', company: 'Neon Dreams Productions', flags: ['Unusually high budget', 'Missing contact details'] },
                  { title: 'Background Dancers Needed', company: 'Rhythm Studios', flags: ['Reported by 3 users'] },
                ].map((call, i) => (
                  <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-bold text-lg">{call.title}</h4>
                        <p className="text-sm text-white/60">{call.company}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-4 py-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg text-xs font-bold hover:bg-emerald-500 hover:text-white transition-colors">Approve</button>
                        <button className="px-4 py-1.5 bg-crimson/20 text-crimson rounded-lg text-xs font-bold hover:bg-crimson hover:text-white transition-colors">Reject</button>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {call.flags.map((flag, j) => (
                        <span key={j} className="bg-crimson/10 text-crimson px-2 py-1 rounded text-[10px] uppercase tracking-widest flex items-center gap-1">
                          <AlertCircle size={10} /> {flag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'settings' && (
          <motion.div
            key="settings"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="glass-panel p-6">
              <h3 className="text-lg font-bold border-b border-white/10 pb-4 mb-6">Platform Configuration</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-sm">Maintenance Mode</h4>
                    <p className="text-xs text-white/50">Temporarily disable access to the platform for updates.</p>
                  </div>
                  <div className="w-12 h-6 bg-white/10 rounded-full relative cursor-pointer">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white/50 rounded-full"></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-sm">New User Registration</h4>
                    <p className="text-xs text-white/50">Allow new users to sign up for the platform.</p>
                  </div>
                  <div className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-sm">Automated Green ID Verification</h4>
                    <p className="text-xs text-white/50">Use AI to automatically verify user documents.</p>
                  </div>
                  <div className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-panel p-6">
              <h3 className="text-lg font-bold border-b border-white/10 pb-4 mb-6">Commission Rates</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs text-white/60 mb-2">Standard Escrow Fee</label>
                  <input type="text" value="5%" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gold" readOnly />
                </div>
                <div>
                  <label className="block text-xs text-white/60 mb-2">Premium Member Escrow Fee</label>
                  <input type="text" value="2.5%" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gold" readOnly />
                </div>
                <div>
                  <label className="block text-xs text-white/60 mb-2">Auction Transaction Fee</label>
                  <input type="text" value="10%" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gold" readOnly />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button className="bg-gold text-black px-6 py-2 rounded-lg text-sm font-bold uppercase tracking-widest hover:bg-white transition-colors">Save Changes</button>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'verification' && (
          <motion.div
            key="verification"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="glass-panel p-6 border-emerald-500/20">
                <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Pending Approvals</div>
                <div className="text-3xl font-bold text-emerald-400">142</div>
              </div>
              <div className="glass-panel p-6 border-gold/20">
                <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">AI Confidence &gt; 90%</div>
                <div className="text-3xl font-bold text-gold">89</div>
              </div>
              <div className="glass-panel p-6 border-crimson/20">
                <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Manual Review Required</div>
                <div className="text-3xl font-bold text-crimson">53</div>
              </div>
            </div>

            <div className="glass-panel p-6">
              <h3 className="font-bold mb-6">Approval Queue</h3>
              <div className="space-y-4">
                {[
                  { name: 'Rahul Sharma', type: 'Actor', doc: 'Aadhar Card', aiScore: 98, status: 'High Confidence' },
                  { name: 'Priya Patel', type: 'Director', doc: 'Passport', aiScore: 95, status: 'High Confidence' },
                  { name: 'Amit Singh', type: 'Producer', doc: 'Company PAN', aiScore: 45, status: 'Needs Review' },
                ].map((user, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                        <User size={18} className="text-white/40" />
                      </div>
                      <div>
                        <div className="font-bold text-sm">{user.name}</div>
                        <div className="text-[10px] text-white/40 uppercase tracking-widest">{user.type} • {user.doc}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right hidden sm:block">
                        <div className={cn("text-sm font-bold", user.aiScore > 90 ? "text-emerald-400" : "text-crimson")}>{user.aiScore}%</div>
                        <div className="text-[10px] text-white/40 uppercase tracking-widest">AI Match</div>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500 hover:text-white transition-colors">
                          <Check size={16} />
                        </button>
                        <button className="p-2 bg-crimson/20 text-crimson rounded-lg hover:bg-crimson hover:text-white transition-colors">
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'fraud' && (
          <motion.div
            key="fraud"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="glass-panel p-8 bg-gradient-to-br from-crimson/10 to-transparent border-crimson/20">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-crimson">
                <AlertCircle /> Active Alerts
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-black/40 rounded-xl border border-crimson/30 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-sm mb-1">Suspicious Casting Call Detected</div>
                    <div className="text-xs text-white/60">"Global Netflix Audition" - Flagged for requesting upfront fees.</div>
                  </div>
                  <button className="bg-crimson text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest">Take Down</button>
                </div>
                <div className="p-4 bg-black/40 rounded-xl border border-gold/30 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-sm mb-1">Multiple Account Creation Spike</div>
                    <div className="text-xs text-white/60">IP Address 192.168.1.x created 15 accounts in 10 minutes.</div>
                  </div>
                  <button className="bg-gold text-black px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest">Investigate</button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-panel p-6">
                <h3 className="font-bold mb-4 text-sm">AI Fraud Detection Metrics</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Fake Profiles Blocked', value: '1,245', trend: '+12%' },
                    { label: 'Scam Projects Removed', value: '84', trend: '-5%' },
                    { label: 'Plagiarized Scripts Flagged', value: '32', trend: '+2%' },
                  ].map((metric, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                      <span className="text-xs text-white/60">{metric.label}</span>
                      <div className="text-right">
                        <div className="font-bold">{metric.value}</div>
                        <div className={cn("text-[10px]", metric.trend.startsWith('+') ? "text-crimson" : "text-emerald-400")}>{metric.trend}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass-panel p-6 flex items-center justify-center">
                <div className="text-center">
                  <ShieldCheck size={48} className="text-emerald-500 mx-auto mb-4 opacity-50" />
                  <p className="text-sm text-white/40">Real-time monitoring active across 50,000+ profiles and 1,200+ active projects.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'revenue' && (
          <motion.div
            key="revenue"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Total Platform Volume', value: '₹4.2Cr', change: '+15%', icon: Wallet },
                { label: 'Escrow Holdings', value: '₹1.8Cr', change: '+5%', icon: Lock },
                { label: 'Commission Earned', value: '₹21L', change: '+12%', icon: TrendingUp },
                { label: 'Premium Subs', value: '₹8.5L', change: '+22%', icon: Star },
              ].map((stat, i) => (
                <div key={i} className="glass-panel p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-white/5 rounded-lg">
                      <stat.icon className="text-gold" size={18} />
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400">{stat.change}</span>
                  </div>
                  <div className="text-xl font-bold mb-1">{stat.value}</div>
                  <div className="text-[10px] text-white/40 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="glass-panel p-6">
              <h3 className="font-bold mb-6">Recent Escrow Releases</h3>
              <div className="space-y-3">
                {[
                  { project: 'The Silent Valley', amount: '₹5,00,000', fee: '₹25,000', status: 'Completed' },
                  { project: 'Urban Beats Ad', amount: '₹1,50,000', fee: '₹7,500', status: 'Processing' },
                  { project: 'Stage Play: Hamlet', amount: '₹80,000', fee: '₹4,000', status: 'Completed' },
                ].map((tx, i) => (
                  <div key={i} className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5">
                    <div>
                      <div className="font-bold text-sm">{tx.project}</div>
                      <div className="text-[10px] text-white/40 uppercase tracking-widest">Escrow Payout</div>
                    </div>
                    <div className="text-right flex gap-8">
                      <div>
                        <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Volume</div>
                        <div className="font-bold text-sm">{tx.amount}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Our Fee (5%)</div>
                        <div className="font-bold text-sm text-gold">{tx.fee}</div>
                      </div>
                      <div className="w-20 text-right">
                        <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Status</div>
                        <div className={cn("text-xs font-bold", tx.status === 'Completed' ? "text-emerald-400" : "text-blue-400")}>{tx.status}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'moderation' && (
          <motion.div
            key="moderation"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <div className="glass-panel p-6">
              <h3 className="font-bold mb-6 flex items-center gap-2"><FileCheck className="text-blue-400" /> Content Flagged by AI</h3>
              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-crimson bg-crimson/10 px-2 py-1 rounded">Inappropriate Image</span>
                    <span className="text-[10px] text-white/40">2 mins ago</span>
                  </div>
                  <p className="text-sm text-white/80 mb-4">Profile picture uploaded by User #8842 violates community guidelines (NSFW content detected).</p>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-crimson text-white py-2 rounded-lg text-xs font-bold uppercase tracking-widest">Remove & Warn</button>
                    <button className="flex-1 bg-white/10 text-white py-2 rounded-lg text-xs font-bold uppercase tracking-widest">Ignore</button>
                  </div>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-gold bg-gold/10 px-2 py-1 rounded">Spam Text</span>
                    <span className="text-[10px] text-white/40">15 mins ago</span>
                  </div>
                  <p className="text-sm text-white/80 mb-4">Project description contains excessive links and promotional material unrelated to casting.</p>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-crimson text-white py-2 rounded-lg text-xs font-bold uppercase tracking-widest">Remove & Warn</button>
                    <button className="flex-1 bg-white/10 text-white py-2 rounded-lg text-xs font-bold uppercase tracking-widest">Ignore</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="glass-panel p-6">
              <h3 className="font-bold mb-6 flex items-center gap-2"><MessageSquare className="text-purple-400" /> User Reports</h3>
              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold">Reported by: SiDdhaRtha SosrG</span>
                    <span className="text-[10px] text-white/40">1 hr ago</span>
                  </div>
                  <p className="text-sm text-white/80 mb-4">"This recruiter asked for a 'registration fee' outside of the platform escrow."</p>
                  <button className="w-full bg-blue-500 text-white py-2 rounded-lg text-xs font-bold uppercase tracking-widest">Review Chat Logs</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'legal' && (
          <motion.div
            key="legal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="glass-panel p-8 bg-gradient-to-br from-blue-500/10 to-transparent border-blue-500/20">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2 text-blue-400">
                  <Gavel /> Legal Escalations
                </h3>
                <span className="bg-crimson text-white px-3 py-1 rounded-full text-xs font-bold">2 Urgent</span>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-black/40 rounded-xl border border-crimson/30">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-bold text-sm mb-1">Copyright Dispute: Script "Monsoon Echoes"</div>
                      <div className="text-xs text-white/60">Two users claiming ownership. Both have uploaded similar drafts.</div>
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-crimson font-bold">High Priority</span>
                  </div>
                  <div className="mt-4 flex gap-4 text-xs">
                    <button className="text-blue-400 hover:underline">View Blockchain Timestamps</button>
                    <button className="text-blue-400 hover:underline">Assign Legal Counsel</button>
                  </div>
                </div>
                <div className="p-4 bg-black/40 rounded-xl border border-gold/30">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-bold text-sm mb-1">Contract Breach: Non-Payment</div>
                      <div className="text-xs text-white/60">Production house failed to release milestone 2 payment after delivery.</div>
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-gold font-bold">Medium Priority</span>
                  </div>
                  <div className="mt-4 flex gap-4 text-xs">
                    <button className="text-blue-400 hover:underline">Review Escrow Terms</button>
                    <button className="text-blue-400 hover:underline">Initiate Arbitration</button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
