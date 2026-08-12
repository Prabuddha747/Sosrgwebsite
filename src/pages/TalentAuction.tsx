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
import { ScaffoldRow, ComingSoonTag } from '../components/ScaffoldUI';

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
    <div className="pt-32 px-6 w-full max-w-[1600px] mx-auto min-h-screen pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">Talent <span className="gold-text">Auction</span></h1>
          <p className="text-white/50 mb-2">Bid on top talent across all 7 Core Creative Sectors — and win the right people for your project.</p>
          <p className="text-white/40 text-sm max-w-2xl">
            Real-time bidding on talent and creative rights, with live auction state, verified wallets,
            and binding contracts on close — what you see below is a preview of the layout, not a live
            auction yet.
          </p>
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
                <button disabled className="w-full bg-white/10 border border-white/10 text-white/50 py-4 rounded-xl font-bold uppercase tracking-widest cursor-not-allowed">
                  Predict Market Value — Coming Soon
                </button>
                <div className="p-4 bg-white/5 rounded-xl border border-white/5 text-center">
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Estimated Value Range</p>
                  <ScaffoldRow className="h-8 w-40 mx-auto" />
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

            {/* No live auction API yet (doc/API_REQUIREMENTS.md) — cards are
                shimmer placeholders rather than the invented listings this
                page used to show as if they were real, active auctions. */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAuctions.map((auction) => (
                <div key={auction.id} className="relative glass-panel overflow-hidden flex flex-col">
                  <ComingSoonTag />
                  <ScaffoldRow className="h-48" />
                  <div className="p-6 flex flex-col flex-1 gap-3">
                    <ScaffoldRow className="h-5 w-3/4" />
                    <ScaffoldRow className="h-3 w-1/3" />
                    <div className="mt-auto space-y-3">
                      <button disabled className="w-full bg-white/10 border border-white/10 text-white/50 py-2 rounded-lg text-xs font-bold cursor-not-allowed">Bidding not open yet</button>
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
          >
            <div className="flex items-center gap-2 mb-2">
              <Plus size={24} className="text-gold" />
              <h2 className="text-3xl font-bold">Create Auction — Visit Our App</h2>
            </div>
            <p className="text-white/60 max-w-3xl mb-6">List talent, rights, or creative assets for competitive bidding, with reserve pricing, buy-now offers, and AI-suggested valuations pulled from real market data.</p>
          </motion.div>
        )}

        {activeTab === 'analytics' && (
          <motion.div
            key="analytics"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={24} className="text-gold" />
              <h2 className="text-3xl font-bold">Analytics — Visit Our App</h2>
            </div>
            <p className="text-white/60 max-w-3xl mb-6">Real-time revenue, active auction counts, and bid velocity — plus a live weekly leaderboard ranking top sellers and buyers by actual closed deals.</p>
          </motion.div>
        )}

        {activeTab === 'contracts' && (
          <motion.div
            key="contracts"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <FileText size={24} className="text-gold" />
              <h2 className="text-3xl font-bold">Contracts & Calendar — Visit Our App</h2>
            </div>
            <p className="text-white/60 max-w-3xl mb-6">Auto-generated agreements the moment an auction closes, synced straight to your production calendar, with mutual ratings that carry real weight on future auction visibility.</p>
          </motion.div>
        )}
        {activeTab === 'upcoming' && (
          <motion.div
            key="upcoming"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Clock size={24} className="text-gold" />
              <h2 className="text-3xl font-bold">Upcoming Auctions — Visit Our App</h2>
            </div>
            <p className="text-white/60 max-w-3xl mb-6">A real pipeline of verified upcoming auctions — talent, scripts, scores, and rights — so you can plan bids before they go live, not just watch a countdown.</p>
          </motion.div>
        )}

        {activeTab === 'wallet' && (
          <motion.div
            key="wallet"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Wallet size={24} className="text-gold" />
              <h2 className="text-3xl font-bold">My Wallet — Visit Our App</h2>
            </div>
            <p className="text-white/60 max-w-3xl mb-6">A verified wallet for bidding, buy-now purchases, and payouts — plus SosrG Coins and leaderboard rewards tied to real auction activity, not a demo balance.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
