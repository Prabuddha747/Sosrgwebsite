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

export const SosrGAcademy = () => {
  const [activeTab, setActiveTab] = useState<'learning-paths' | 'scholarships' | 'progress'>('learning-paths');

  return (
    <div className="pt-32 px-6 w-full max-w-[1600px] mx-auto min-h-screen pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">SosrG <span className="gold-text">Academy</span></h1>
          <p className="text-white/50 mb-2">Learn what actually moves your career forward — AI-driven paths, scholarships, and progress tracking across all 7 Core Creative Sectors.</p>
          <p className="text-white/40 text-sm max-w-2xl">
            Real courses, AI-evaluated scholarship eligibility, and milestone tracking tied to your
            actual activity — what you see below is a preview of the layout, not live courses yet.
          </p>
        </div>
        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 overflow-x-auto no-scrollbar w-full md:w-auto">
          {[
            { id: 'learning-paths', label: 'AI Learning Paths', icon: BookOpen },
            { id: 'scholarships', label: 'SosrG Scholarships', icon: GraduationCap },
            { id: 'progress', label: 'Progress Tracking', icon: TrendingUp },
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
        {activeTab === 'learning-paths' && (
          <motion.div
            key="learning-paths"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="relative glass-panel p-8 bg-gradient-to-br from-blue-500/10 to-transparent border-blue-500/20">
              <ComingSoonTag />
              <div className="flex items-center gap-2 mb-4">
                <Cpu size={24} className="text-blue-400" />
                <h2 className="text-2xl font-bold">AI Recommended Courses</h2>
              </div>
              <p className="text-sm text-white/60 mb-6">
                No course catalogue or AI recommendation engine exists yet — this is a preview of the
                layout, not real course data.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="bg-black/40 rounded-xl overflow-hidden border border-white/10">
                    <ScaffoldRow className="aspect-video rounded-none border-none" />
                    <div className="p-4 space-y-2">
                      <ScaffoldRow className="h-4 w-3/4" />
                      <ScaffoldRow className="h-3 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {['Acting', 'Direction', 'Writing', 'Music', 'Dance', 'Art & Design', 'Crafts'].map((sector, i) => (
                <div key={i} className="relative glass-panel p-6 flex flex-col items-center justify-center text-center">
                  <ComingSoonTag />
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                    <BookOpen size={20} className="text-gold" />
                  </div>
                  <h4 className="font-bold mb-1">{sector}</h4>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">Explore Courses</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'scholarships' && (
          <motion.div
            key="scholarships"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="relative glass-panel p-8 text-center overflow-hidden">
              <ComingSoonTag />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-gold to-emerald-400" />
              <GraduationCap size={48} className="mx-auto mb-6 text-emerald-400" />
              <h2 className="text-3xl font-bold mb-4">SosrG Scholarships</h2>
              <p className="text-white/60 max-w-2xl mx-auto mb-8">
                The plan is for an AI model to evaluate your portfolio, engagement, and talent rating to
                automatically assess scholarship eligibility for premium courses and mentorship programs
                — no such evaluation exists yet.
              </p>

              <div className="inline-block bg-white/5 border border-white/10 rounded-2xl p-6 text-left mb-8 w-full max-w-md">
                <div className="space-y-3">
                  {['Portfolio Score', 'Platform Engagement', 'Green ID Verification'].map((label) => (
                    <div key={label} className="flex justify-between items-center text-sm">
                      <span className="text-white/40">{label}:</span>
                      <ScaffoldRow className="h-4 w-16" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                {[0, 1].map((i) => (
                  <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-3">
                    <ScaffoldRow className="h-5 w-2/3" />
                    <ScaffoldRow className="h-4 w-full" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'progress' && (
          <motion.div
            key="progress"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <div className="lg:col-span-2 space-y-6">
              <div className="relative glass-panel p-8">
                <ComingSoonTag />
                <h2 className="text-2xl font-bold mb-6">Learning Milestones</h2>
                <div className="space-y-4">
                  {[0, 1, 2].map((i) => (
                    <ScaffoldRow key={i} className="h-20" />
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1 space-y-6">
              <div className="relative glass-panel p-6 text-center">
                <ComingSoonTag />
                <ScaffoldRow className="w-24 h-24 rounded-full mx-auto mb-4" />
                <h3 className="font-bold mb-1">Overall Progress</h3>
                <p className="text-xs text-white/40">You are on track to complete your current learning path.</p>
              </div>

              <div className="relative glass-panel p-6">
                <ComingSoonTag />
                <h3 className="font-bold mb-4 flex items-center gap-2"><Award size={16} className="text-gold" /> Earned Certificates</h3>
                <ScaffoldRow className="h-14" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
