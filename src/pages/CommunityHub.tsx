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

export const CommunityHub = () => {
  const [activeTab, setActiveTab] = useState<'directory' | 'sharing' | 'news'>('directory');

  return (
    <div className="pt-32 px-6 max-w-[1600px] mx-auto min-h-screen pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif italic mb-2">Creative <span className="vibrant-text-3">Community</span></h1>
          <p className="text-white/50">Connect, share, and stay updated with the 7 Core Creative Sectors.</p>
        </div>
        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 overflow-x-auto no-scrollbar w-full md:w-auto">
          {[
            { id: 'directory', label: 'Arts Directory', icon: Building2 },
            { id: 'sharing', label: 'Content Sharing', icon: Share2 },
            { id: 'news', label: 'Industry News', icon: Newspaper },
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

      <AnimatePresence mode="wait">
        {activeTab === 'directory' && (
          <motion.div
            key="directory"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
                <input 
                  type="text" 
                  placeholder="Search theatre groups, institutes, agencies..." 
                  className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-gold transition-colors"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {['All', 'Theatre Groups', 'Film Institutes', 'Art Galleries', 'Talent Agencies'].map(filter => (
                  <button key={filter} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold whitespace-nowrap hover:border-gold/50 transition-colors">
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* No live directory API yet (doc/API_REQUIREMENTS.md) — cards are
                shimmer placeholders rather than the invented org list this
                page used to show as if it were real. */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="relative glass-panel p-4">
                  <ComingSoonTag />
                  <ScaffoldRow className="aspect-video mb-4" />
                  <ScaffoldRow className="h-5 w-3/4 mb-2" />
                  <ScaffoldRow className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'sharing' && (
          <motion.div
            key="sharing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <div className="lg:col-span-2 space-y-6">
              {/* Post Creation */}
              <div className="glass-panel p-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 overflow-hidden shrink-0">
                    <img src="https://picsum.photos/seed/user/100/100" alt="User" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <textarea 
                      placeholder="Share your artwork, performance, or creative writing..." 
                      className="w-full bg-transparent border-none outline-none resize-none text-white placeholder:text-white/40 h-20"
                    />
                    <div className="flex justify-between items-center pt-4 border-t border-white/10">
                      <div className="flex gap-2">
                        <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-white"><Image size={18} /></button>
                        <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-white"><Video size={18} /></button>
                        <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-white"><Music size={18} /></button>
                        <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-white"><FileText size={18} /></button>
                      </div>
                      <button className="bg-gold text-black px-6 py-2 rounded-full font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform">
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feed — no live content-sharing API yet (doc/API_REQUIREMENTS.md) */}
              <div className="space-y-6">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="relative glass-panel p-6">
                    <ComingSoonTag />
                    <div className="flex gap-3 mb-4">
                      <ScaffoldRow className="w-10 h-10 rounded-full shrink-0" />
                      <div className="flex-1 space-y-2">
                        <ScaffoldRow className="h-4 w-1/3" />
                        <ScaffoldRow className="h-3 w-1/4" />
                      </div>
                    </div>
                    <ScaffoldRow className="h-16 mb-4" />
                    <div className="flex gap-6 pt-4 border-t border-white/10">
                      <button disabled className="flex items-center gap-2 text-white/30 cursor-not-allowed text-sm">
                        <Heart size={18} /> Like
                      </button>
                      <button disabled className="flex items-center gap-2 text-white/30 cursor-not-allowed text-sm">
                        <MessageCircle size={18} /> Comment
                      </button>
                      <button disabled className="flex items-center gap-2 text-white/30 cursor-not-allowed text-sm">
                        <Share2 size={18} /> Share
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="relative glass-panel p-6">
                <ComingSoonTag />
                <h3 className="font-bold mb-4 uppercase tracking-widest text-xs">Trending Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <ScaffoldRow key={i} className="h-6 w-20" />
                  ))}
                </div>
              </div>
              <div className="relative glass-panel p-6">
                <ComingSoonTag />
                <h3 className="font-bold mb-4 uppercase tracking-widest text-xs">Suggested Collaborators</h3>
                <div className="space-y-4">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="flex items-center justify-between gap-3">
                      <ScaffoldRow className="w-8 h-8 rounded-full shrink-0" />
                      <ScaffoldRow className="h-4 flex-1" />
                      <button disabled className="text-xs bg-white/10 border border-white/10 text-white/50 px-3 py-1 rounded-full cursor-not-allowed shrink-0">Connect</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'news' && (
          <motion.div
            key="news"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-4 gap-8"
          >
            {/* No live industry-news API yet (doc/API_REQUIREMENTS.md) */}
            <div className="lg:col-span-3 space-y-8">
              <div className="relative">
                <ComingSoonTag />
                <ScaffoldRow className="aspect-[21/9] rounded-2xl" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="relative glass-panel p-4 flex flex-col sm:flex-row gap-4">
                    <ComingSoonTag />
                    <ScaffoldRow className="w-full sm:w-1/3 aspect-video sm:aspect-square shrink-0" />
                    <div className="flex flex-col justify-center gap-2 flex-1">
                      <ScaffoldRow className="h-4 w-full" />
                      <ScaffoldRow className="h-3 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="relative glass-panel p-6">
                <ComingSoonTag />
                <h3 className="font-bold mb-4 uppercase tracking-widest text-xs">Trending Topics</h3>
                <div className="space-y-3">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <ScaffoldRow key={i} className="h-5" />
                  ))}
                </div>
              </div>

              <div className="relative glass-panel p-6 bg-gradient-to-br from-gold/10 to-transparent border-gold/20">
                <ComingSoonTag />
                <h3 className="font-bold mb-2 text-gold">Subscribe to Newsletter</h3>
                <p className="text-xs text-white/60 mb-4">Get the latest industry news and casting calls delivered to your inbox.</p>
                <div className="flex flex-col gap-2">
                  <input disabled type="email" placeholder="Your email address" className="bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/30 cursor-not-allowed" />
                  <button disabled className="bg-white/10 border border-white/10 text-white/50 rounded-lg px-3 py-2 text-sm font-bold uppercase tracking-widest cursor-not-allowed">Subscribe</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Dynamic Background ---
