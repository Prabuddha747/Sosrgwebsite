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
import { ArtMartContent } from '../components/marketplace/ArtMartContent';

export const Marketplace = () => {
  const [activeTab, setActiveTab] = useState<'assets' | 'gigs' | 'collaborations' | 'licensing' | 'art-mart'>('art-mart');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div className="pt-32 px-6 w-full max-w-[1600px] mx-auto min-h-screen pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">The <span className="gold-text">Marketplace</span></h1>
          <p className="text-white/50 mb-2">Where creative work gets bought, sold, and made — across all 7 Core Creative Sectors.</p>
          <p className="text-white/40 text-sm max-w-2xl">
            A real marketplace for assets, gigs, collaborations, and IP licensing — backed by actual
            postings and secure payment handling. What's below previews the experience; live listings
            are on their way.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <button 
            onClick={() => setShowFilterModal(true)}
            className="bg-white/5 border border-white/10 px-6 py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
          >
            <Filter size={16} /> Filters
          </button>
          <button
            onClick={() => showToast('Posting a project? That happens in the SosrG app — download it to get listed.')}
            className="bg-gold text-black px-6 py-2 rounded-xl text-sm font-bold w-full sm:w-auto hover:bg-white transition-colors"
          >
            Post a Project
          </button>
        </div>
      </div>

      <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 overflow-x-auto no-scrollbar mb-8">
        {[
          { id: 'art-mart', label: 'Art Mart', icon: ShoppingBag },
          { id: 'assets', label: 'Assets & IPs', icon: Store },
          { id: 'gigs', label: 'Gigs & Freelance', icon: Briefcase },
          { id: 'collaborations', label: 'Collaborations', icon: Users },
          { id: 'licensing', label: 'Licensing', icon: FileCheck },
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

      <AnimatePresence mode="wait">
        {activeTab === 'art-mart' && (
          <motion.div
            key="art-mart"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <ArtMartContent />
          </motion.div>
        )}

        {activeTab === 'assets' && (
          <motion.div key="assets" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <div className="flex items-center gap-2 mb-2">
              <Store size={24} className="text-gold" />
              <h2 className="text-3xl font-bold">Assets & IPs — Visit Our App</h2>
            </div>
            <p className="text-white/60 max-w-3xl mb-6">Scripts, scores, footage, and other creative assets and IP, listed for sale with real postings and secure payment handling.</p>
          </motion.div>
        )}

        {activeTab === 'gigs' && (
          <motion.div key="gigs" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <div className="flex items-center gap-2 mb-2">
              <Briefcase size={24} className="text-gold" />
              <h2 className="text-3xl font-bold">Gigs & Freelance — Visit Our App</h2>
            </div>
            <p className="text-white/60 max-w-3xl mb-6">Short-term and freelance creative work, posted and applied to directly through SosrG.</p>
          </motion.div>
        )}

        {activeTab === 'collaborations' && (
          <motion.div key="collaborations" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <div className="flex items-center gap-2 mb-2">
              <Users size={24} className="text-gold" />
              <h2 className="text-3xl font-bold">Collaborations — Visit Our App</h2>
            </div>
            <p className="text-white/60 max-w-3xl mb-6">Open calls for co-creators, collaborators, and creative partners looking to team up on a project.</p>
          </motion.div>
        )}

        {activeTab === 'licensing' && (
          <motion.div key="licensing" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck size={24} className="text-gold" />
              <h2 className="text-3xl font-bold">Licensing — Visit Our App</h2>
            </div>
            <p className="text-white/60 max-w-3xl mb-6">Buy and sell intellectual property rights with Smart Contracts — automated royalty splits and legal documentation included.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 right-8 bg-emerald-500 text-white px-6 py-3 rounded-xl shadow-2xl z-50 flex items-center gap-3 font-bold"
          >
            <CheckCircle2 size={20} />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter Modal */}
      <AnimatePresence>
        {showFilterModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowFilterModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-cinematic-gray border border-white/10 rounded-2xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Advanced Filters</h2>
                <button onClick={() => setShowFilterModal(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="text-xs text-white/40 block mb-3 uppercase tracking-widest">Price Range</label>
                  <div className="flex gap-4">
                    <input type="number" placeholder="Min ₹" className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-gold" />
                    <input type="number" placeholder="Max ₹" className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-gold" />
                  </div>
                </div>
                
                <div>
                  <label className="text-xs text-white/40 block mb-3 uppercase tracking-widest">Status</label>
                  <div className="flex flex-wrap gap-2">
                    {['Available', 'Bidding', 'Active', 'Closed'].map(status => (
                      <button key={status} className="px-4 py-2 rounded-full border border-white/20 text-sm hover:border-gold hover:text-gold transition-colors">
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="text-xs text-white/40 block mb-3 uppercase tracking-widest">Sort By</label>
                  <select className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-gold">
                    <option>Newest First</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Most Popular</option>
                  </select>
                </div>
                
                <div className="flex gap-4 pt-4">
                  <button onClick={() => setShowFilterModal(false)} className="flex-1 py-3 border border-white/20 rounded-xl font-bold hover:bg-white/5 transition-colors">
                    Clear
                  </button>
                  <button onClick={() => { setShowFilterModal(false); showToast('Filters applied!'); }} className="flex-1 py-3 bg-gold text-black rounded-xl font-bold hover:bg-white transition-colors">
                    Apply Filters
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

// --- Ecosystem Components ---
