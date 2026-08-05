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

export const PremiumFeatures = () => (
  <section className="py-24 px-6 max-w-7xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-serif italic mb-4">Premium <span className="gold-text">Features</span></h2>
      <p className="text-white/40 max-w-2xl mx-auto">Elevate your creative career with advanced tools and increased visibility.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {[
        { 
          title: 'Profile Boost', 
          desc: 'Get prioritized in AI search results and casting recommendations.', 
          icon: TrendingUp,
          color: 'text-emerald-400',
          bg: 'bg-emerald-500/10',
          border: 'border-emerald-500/20'
        },
        { 
          title: 'Featured Placement', 
          desc: 'Spotlight positioning on the homepage and sector-specific hubs.', 
          icon: Star,
          color: 'text-gold',
          bg: 'bg-gold/10',
          border: 'border-gold/20'
        },
        { 
          title: 'AI Brand Score', 
          desc: 'Real-time metrics on market demand, profile strength, and skill gaps.', 
          icon: Award,
          color: 'text-blue-400',
          bg: 'bg-blue-500/10',
          border: 'border-blue-500/20'
        },
        { 
          title: 'Analytics Dashboard', 
          desc: 'Track profile views, recruiter interest, and audition conversion rates.', 
          icon: BarChart3,
          color: 'text-purple-400',
          bg: 'bg-purple-500/10',
          border: 'border-purple-500/20'
        }
      ].map((feature, i) => (
        <div key={i} className={cn("p-8 rounded-2xl border transition-all hover:-translate-y-2 group", feature.bg, feature.border)}>
          <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-black/40", feature.color)}>
            <feature.icon size={24} />
          </div>
          <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
          <p className="text-sm text-white/60 leading-relaxed mb-6">{feature.desc}</p>
          <button className={cn("text-xs font-bold uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all", feature.color)}>
            Learn More <ChevronRight size={14} />
          </button>
        </div>
      ))}
    </div>
  </section>
);
