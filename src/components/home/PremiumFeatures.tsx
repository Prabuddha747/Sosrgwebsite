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
import { cn } from '../../lib/utils';
import { ComingSoonTag } from '../ScaffoldUI';

const FEATURES = [
  {
    kicker: '01 · Discoverability',
    title: 'Profile Boost',
    desc: 'Get prioritized in AI search results and casting recommendations.',
    hooks: ['AI Search Priority', 'Casting Match Weight'],
    icon: TrendingUp,
    accent: 'emerald',
  },
  {
    kicker: '02 · Visibility',
    title: 'Featured Placement',
    desc: 'Spotlight positioning on the homepage and sector-specific hubs.',
    hooks: ['Homepage Spotlight', 'Sector Hub Pinning'],
    icon: Star,
    accent: 'gold',
  },
  {
    kicker: '03 · Standing',
    title: 'AI Brand Score',
    desc: 'Real-time metrics on market demand, profile strength, and skill gaps.',
    hooks: ['Demand Index', 'Skill-Gap Flags'],
    icon: Award,
    accent: 'blue',
  },
  {
    kicker: '04 · Insight',
    title: 'Analytics Dashboard',
    desc: 'Track profile views, recruiter interest, and audition conversion rates.',
    hooks: ['View Tracking', 'Conversion Rate'],
    icon: BarChart3,
    accent: 'purple',
  },
];

const ACCENT_RING: Record<string, string> = {
  emerald: 'from-emerald-500/40 via-emerald-500/0 to-emerald-500/40 text-emerald-400',
  gold: 'from-gold/50 via-gold/0 to-gold/50 text-gold',
  blue: 'from-blue-500/40 via-blue-500/0 to-blue-500/40 text-blue-400',
  purple: 'from-purple-500/40 via-purple-500/0 to-purple-500/40 text-purple-400',
};

export const PremiumFeatures = () => (
  <section className="py-24 px-6 max-w-[1600px] mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-serif italic mb-4">Premium <span className="gold-text">Features</span></h2>
      <p className="text-white/40 max-w-2xl mx-auto">Elevate your creative career with advanced tools and increased visibility.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {FEATURES.map((feature, i) => (
        <div key={i} className="relative glass-panel p-8 group hover:-translate-y-1 transition-transform duration-300">
          <ComingSoonTag />
          <div className={cn("w-14 h-14 rounded-full p-[1.5px] bg-gradient-to-br mb-6", ACCENT_RING[feature.accent])}>
            <div className="w-full h-full rounded-full bg-cinematic-black flex items-center justify-center">
              <feature.icon size={22} className={ACCENT_RING[feature.accent].split(' ').pop()} />
            </div>
          </div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold mb-2">{feature.kicker}</div>
          <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
          <p className="text-sm text-white/60 leading-relaxed mb-6">{feature.desc}</p>
          <div className="flex flex-wrap gap-2">
            {feature.hooks.map((hook) => (
              <span key={hook} className="text-[10px] bg-white/5 border border-white/10 text-white/50 px-2 py-1 rounded-full">{hook}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);
