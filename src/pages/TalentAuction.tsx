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

export const TalentAuction = () => {
  const [activeTab, setActiveTab] = useState<'browse' | 'create' | 'analytics' | 'contracts' | 'upcoming' | 'wallet'>('browse');
  const [showAIPredictor, setShowAIPredictor] = useState(false);
  const [selectedSector, setSelectedSector] = useState('All Sectors');

  const SECTORS = ['All Sectors', 'Acting', 'Direction', 'Writing', 'Cinematography', 'Editing', 'Music', 'Art & Design'];

  const AUCTIONS = [
    { id: 1, title: 'Lead Role: "The Last Monsoon"', artist: 'Rajesh K.', sector: 'Acting', currentBid: '₹1,20,000', buyNow: '₹3,00,000', endsIn: '2h 15m', image: 'https://picsum.photos/seed/actor-auction/400/300' },
    { id: 2, title: 'Original Screenplay: "Cyber City"', artist: 'Meera V.', sector: 'Writing', currentBid: '₹45,000', buyNow: '₹1,50,000', endsIn: '4h 30m', image: 'https://picsum.photos/seed/script-auction/400/300' },
    { id: 3, title: 'Exclusive Music Score Rights', artist: 'Amit S.', sector: 'Music', currentBid: '₹2,50,000', buyNow: '₹5,00,000', endsIn: '12h 05m', image: 'https://picsum.photos/seed/music-auction/400/300' },
    { id: 4, title: 'Cinematography for Short Film', artist: 'Vikram D.', sector: 'Cinematography', currentBid: '₹80,000', buyNow: '₹1,20,000', endsIn: '1d 4h', image: 'https://picsum.photos/seed/camera-auction/400/300' },
  ];

  const filteredAuctions = selectedSector === 'All Sectors' ? AUCTIONS : AUCTIONS.filter(a => a.sector === selectedSector);

  return (
    <div className="pt-32 px-6 max-w-7xl mx-auto min-h-screen pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif italic mb-2">Talent <span className="vibrant-text-3">Auction</span></h1>
          <p className="text-white/50">Bid on top talent across the 7 Core Creative Sectors.</p>
        </div>
        <div className="flex flex-col items-start md:items-end gap-4 w-full md:w-auto">
          <button 
            onClick={() => setShowAIPredictor(true)}
            className="flex items-center gap-2 bg-crimson/10 text-crimson border border-crimson/30 px-4 py-2 rounded-xl text-xs font-bold hover:bg-crimson hover:text-white transition-all w-full md:w-auto justify-center md:justify-start"
          >
            <Cpu size={14} /> AI Value Predictor
          </button>
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 overflow-x-auto no-scrollbar w-full md:w-auto">
            {[
              { id: 'browse', label: 'Browse & Bid', icon: Gavel },
              { id: 'upcoming', label: 'Upcoming', icon: Clock },
              { id: 'create', label: 'Create Auction', icon: Plus },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
              { id: 'contracts', label: 'Contracts & Calendar', icon: FileText },
              { id: 'wallet', label: 'My Wallet', icon: Wallet },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap",
                  activeTab === tab.id ? "bg-gold text-black" : "text-white/60 hover:text-white"
                )}
              >
                <tab.icon size={16} /> {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showAIPredictor && (
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
              className="bg-cinematic-gray border border-white/10 w-full max-w-lg rounded-3xl p-8 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Cpu className="text-gold" /> AI Value Predictor
                </h2>
                <button onClick={() => setShowAIPredictor(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="text-xs text-white/40 block mb-2">Creative Sector</label>
                  <select className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-gold">
                    {SECTORS.filter(s => s !== 'All Sectors').map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-white/40 block mb-2">Description / Metadata</label>
                  <textarea 
                    placeholder="Enter details for AI valuation (e.g., past experience, project scope)..."
                    className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-sm h-32 resize-none focus:outline-none focus:border-gold"
                  />
                </div>
                <button className="w-full bg-gold text-black py-4 rounded-xl font-bold uppercase tracking-widest hover:scale-[1.02] transition-transform">
                  Predict Market Value
                </button>
                <div className="p-4 bg-white/5 rounded-xl border border-white/5 text-center">
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Estimated Value Range</p>
                  <div className="text-2xl font-bold text-emerald-400">₹ 45,000 - ₹ 60,000</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {activeTab === 'browse' && (
          <motion.div
            key="browse"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Sector Filters */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4 border-b border-white/5">
              {SECTORS.map((sector) => (
                <button
                  key={sector}
                  onClick={() => setSelectedSector(sector)}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors",
                    selectedSector === sector ? "bg-white text-black" : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                  )}
                >
                  {sector}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAuctions.map((auction) => (
                <div key={auction.id} className="glass-panel group overflow-hidden flex flex-col">
                  <div className="h-48 relative shrink-0">
                    <img src={auction.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={auction.title} referrerPolicy="no-referrer" />
                    <div className="absolute top-4 right-4 bg-crimson px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> Live
                    </div>
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest">
                      {auction.sector}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold mb-1">{auction.title}</h3>
                    <p className="text-xs text-white/40 mb-4">By {auction.artist}</p>
                    <div className="flex justify-between items-end mb-6">
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Current Bid</div>
                        <div className="text-xl font-mono font-bold text-gold">{auction.currentBid}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Ends In</div>
                        <div className="text-sm font-bold text-crimson">{auction.endsIn}</div>
                      </div>
                    </div>
                    <div className="mt-auto space-y-3">
                      <div className="flex gap-2">
                        <input type="text" placeholder="Enter amount" className="flex-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gold" />
                        <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-xs font-bold transition-colors">Manual Bid</button>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 bg-gold/10 text-gold border border-gold/20 py-2 rounded-lg text-xs font-bold hover:bg-gold hover:text-black transition-colors flex items-center justify-center gap-2">
                          <Zap size={14} /> Auto Bid
                        </button>
                        <button className="flex-1 bg-white text-black py-2 rounded-lg text-xs font-bold hover:bg-gray-200 transition-colors">
                          Buy Now ({auction.buyNow})
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'create' && (
          <motion.div
            key="create"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl mx-auto glass-panel-purple p-8"
          >
            <h2 className="text-2xl font-bold mb-6">Create New Auction</h2>
            <form className="space-y-6">
              <div>
                <label className="text-xs text-white/40 block mb-2 uppercase tracking-widest">Creative Sector</label>
                <select className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-gold">
                  {SECTORS.filter(s => s !== 'All Sectors').map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-white/40 block mb-2 uppercase tracking-widest">Auction Title</label>
                <input type="text" placeholder="e.g., Lead Role in Indie Feature" className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-gold" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-xs text-white/40 block mb-2 uppercase tracking-widest">Minimum Bid (₹)</label>
                  <input type="number" placeholder="50000" className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-gold" />
                </div>
                <div>
                  <label className="text-xs text-white/40 block mb-2 uppercase tracking-widest">Buy-Now Price (₹)</label>
                  <input type="number" placeholder="150000" className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-gold" />
                </div>
              </div>
              <div>
                <label className="text-xs text-white/40 block mb-2 uppercase tracking-widest">Duration</label>
                <select className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-gold">
                  <option>24 Hours</option>
                  <option>3 Days</option>
                  <option>7 Days</option>
                </select>
              </div>
              <button type="button" className="w-full bg-gold text-black py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-white transition-colors">
                Launch Auction
              </button>
            </form>
          </motion.div>
        )}

        {activeTab === 'analytics' && (
          <motion.div
            key="analytics"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-panel p-6 border-gold/20 bg-gradient-to-br from-gold/5 to-transparent">
                <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Total Auction Revenue</div>
                <div className="text-4xl font-bold text-gold mb-2">₹12,45,000</div>
                <div className="text-xs text-emerald-400 flex items-center gap-1"><TrendingUp size={12} /> +15% this month</div>
              </div>
              <div className="glass-panel p-6">
                <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Active Auctions</div>
                <div className="text-4xl font-bold mb-2">3</div>
                <div className="text-xs text-white/40">Across 2 sectors</div>
              </div>
              <div className="glass-panel p-6">
                <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Average Bid Increase</div>
                <div className="text-4xl font-bold mb-2">24%</div>
                <div className="text-xs text-white/40">Above minimum bid</div>
              </div>
            </div>

            <div className="glass-panel-orange p-8">
              <div className="flex items-center gap-2 mb-6">
                <Trophy size={20} className="text-gold" />
                <h3 className="text-xl font-bold">Weekly Leaderboard</h3>
              </div>
              <div className="space-y-4">
                {[
                  { rank: 1, name: 'Rajesh K.', sector: 'Acting', revenue: '₹4,50,000', trend: 'up' },
                  { rank: 2, name: 'Amit S.', sector: 'Music', revenue: '₹3,20,000', trend: 'up' },
                  { rank: 3, name: 'Meera V.', sector: 'Writing', revenue: '₹2,80,000', trend: 'down' },
                ].map((user) => (
                  <div key={user.rank} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm",
                        user.rank === 1 ? "bg-gold text-black" : "bg-white/10 text-white"
                      )}>
                        #{user.rank}
                      </div>
                      <div>
                        <div className="font-bold">{user.name}</div>
                        <div className="text-xs text-white/40">{user.sector}</div>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-4">
                      <div className="font-bold font-mono">{user.revenue}</div>
                      {user.trend === 'up' ? <TrendingUp size={16} className="text-emerald-400" /> : <ArrowDownRight size={16} className="text-crimson" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'contracts' && (
          <motion.div
            key="contracts"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Digital Contracts */}
            <div className="glass-panel-blue p-8">
              <div className="flex items-center gap-2 mb-6">
                <FileText size={20} className="text-blue-400" />
                <h3 className="text-xl font-bold">Digital Contracts</h3>
              </div>
              <p className="text-sm text-white/60 mb-6">Auto-generated agreements for won auctions.</p>
              <div className="space-y-4">
                {[
                  { title: 'Lead Role: "The Silent Valley"', date: 'Oct 15, 2023', status: 'Signed' },
                  { title: 'Cinematography: "Urban Ad"', date: 'Oct 10, 2023', status: 'Pending Signature' },
                ].map((contract, i) => (
                  <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/10 flex justify-between items-center">
                    <div>
                      <div className="font-bold text-sm mb-1">{contract.title}</div>
                      <div className="text-[10px] text-white/40 uppercase tracking-widest">{contract.date}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={cn(
                        "text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded",
                        contract.status === 'Signed' ? "bg-emerald-500/20 text-emerald-400" : "bg-gold/20 text-gold"
                      )}>
                        {contract.status}
                      </span>
                      <button className="text-white/40 hover:text-white"><ChevronRight size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Calendar & Reviews */}
            <div className="space-y-8">
              <div className="glass-panel-green p-8">
                <div className="flex items-center gap-2 mb-6">
                  <Calendar size={20} className="text-gold" />
                  <h3 className="text-xl font-bold">Calendar Integration</h3>
                </div>
                <p className="text-sm text-white/60 mb-4">Bookings from won auctions are automatically added to your schedule.</p>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-start gap-4">
                  <div className="w-12 h-12 rounded bg-gold/20 flex flex-col items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold uppercase text-gold">Oct</span>
                    <span className="text-lg font-bold text-gold">24</span>
                  </div>
                  <div>
                    <div className="font-bold text-sm mb-1">Shoot: "The Silent Valley"</div>
                    <div className="text-xs text-white/40">Mumbai Studio • 9:00 AM - 6:00 PM</div>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-8">
                <div className="flex items-center gap-2 mb-6">
                  <Star size={20} className="text-gold" />
                  <h3 className="text-xl font-bold">Ratings & Reviews</h3>
                </div>
                <p className="text-sm text-white/60 mb-4">Mutual ratings impact future auction visibility and trust scores.</p>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-bold text-sm">Review from Studio X</div>
                    <div className="flex text-gold"><Star size={12} className="fill-gold" /><Star size={12} className="fill-gold" /><Star size={12} className="fill-gold" /><Star size={12} className="fill-gold" /><Star size={12} className="fill-gold" /></div>
                  </div>
                  <p className="text-xs text-white/60 italic">"Exceptional talent, highly professional on set. Looking forward to working together again."</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        {activeTab === 'upcoming' && (
          <motion.div
            key="upcoming"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass-panel p-12 text-center"
          >
            <Clock size={48} className="mx-auto mb-6 text-white/20" />
            <h2 className="text-2xl font-bold mb-2">Upcoming Auctions</h2>
            <p className="text-white/40">New talent and creative assets are being verified. Stay tuned.</p>
          </motion.div>
        )}

        {activeTab === 'wallet' && (
          <motion.div
            key="wallet"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <div className="lg:col-span-1 glass-panel p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gold/20 rounded-2xl flex items-center justify-center">
                  <Wallet className="text-gold" size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">₹45,200</h3>
                  <p className="text-xs text-white/40">Available Balance</p>
                </div>
              </div>
              <div className="space-y-4">
                <button className="w-full bg-gold text-black py-4 rounded-xl font-bold text-sm">Add Funds</button>
                <button className="w-full bg-white/5 border border-white/10 py-4 rounded-xl font-bold text-sm">Withdraw</button>
              </div>
            </div>
            <div className="lg:col-span-2 glass-panel p-8">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Trophy size={20} className="text-gold" /> Rewards & Gamification</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                  <div className="text-3xl font-bold text-gold mb-1">1,240</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/40">SosrG Coins</div>
                  <p className="text-[10px] text-emerald-400 mt-2">Convert to ₹124 Voucher</p>
                </div>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                  <div className="text-3xl font-bold text-crimson mb-1">#12</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/40">Weekly Leaderboard</div>
                  <p className="text-[10px] text-white/40 mt-2">Top 10 get 500 Coins</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
