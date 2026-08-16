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

export const CommunityHub = () => {
  const [activeTab, setActiveTab] = useState<'sharing' | 'forum' | 'news'>('sharing');

  return (
    <div className="pt-32 px-6 w-full max-w-[1600px] mx-auto min-h-screen pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">Creative <span className="gold-text">Community</span></h1>
          <p className="text-white/50">Where the 7 Core Creative Sectors connect, share work, and stay in the loop — together.</p>
        </div>
        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 overflow-x-auto no-scrollbar w-full md:w-auto">
          {[
            { id: 'sharing', label: 'Content Sharing', icon: Share2 },
            { id: 'forum', label: 'Forum', icon: MessageCircle },
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
        {activeTab === 'sharing' && (
          <motion.div
            key="sharing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2 mb-2">
              <Share2 size={24} className="text-gold" />
              <h2 className="text-3xl font-bold">Content Sharing — Visit Our App</h2>
            </div>
            <p className="text-white/60 max-w-3xl mb-6">
              One shared space for every kind of creative work — post a clip, photo, or piece of
              writing with a short description, and the community can discover, like, and comment
              on it. Theatre groups, institutes, and agencies will show up here too going forward,
              folded into this single feed instead of a separate directory.
            </p>
          </motion.div>
        )}

        {activeTab === 'forum' && (
          <motion.div
            key="forum"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2 mb-2">
              <MessageCircle size={24} className="text-gold" />
              <h2 className="text-3xl font-bold">Forum — Visit Our App</h2>
            </div>
            <p className="text-white/60 max-w-3xl mb-6">
              An open public feed for the whole community — post a short update or question, and
              anyone can reply, the way a public timeline works. Not the same as Content Sharing's
              longer posts above: this is for quick, open discussion.
            </p>
          </motion.div>
        )}

        {activeTab === 'news' && (
          <motion.div
            key="news"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2 mb-2">
              <Newspaper size={24} className="text-gold" />
              <h2 className="text-3xl font-bold">Industry News — Visit Our App</h2>
            </div>
            <p className="text-white/60 max-w-3xl mb-6">
              Curated news, announcements, and trending topics from across Bihar's creative
              industry — casting updates, festival announcements, grants, and policy changes — with
              a newsletter you can subscribe to so it lands straight in your inbox.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Dynamic Background ---
