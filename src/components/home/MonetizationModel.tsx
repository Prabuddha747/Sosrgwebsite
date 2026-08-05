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

export const MonetizationModel = () => (
  <section className="py-24 px-6 max-w-7xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-serif italic mb-4">Monetization <span className="gold-text">Model</span></h2>
      <p className="text-white/40 max-w-2xl mx-auto">Transparent, value-driven revenue streams designed to support the creative ecosystem.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        { 
          title: 'Subscription Memberships', 
          desc: 'Tiered access for talent and recruiters with advanced AI features and unlimited applications.', 
          icon: Trophy,
          color: 'text-gold',
          bg: 'bg-gold/10',
          border: 'border-gold/20'
        },
        { 
          title: 'Commission per Hiring', 
          desc: 'A small percentage fee on successful casting and project completion via our secure escrow.', 
          icon: Wallet,
          color: 'text-emerald-400',
          bg: 'bg-emerald-500/10',
          border: 'border-emerald-500/20'
        },
        { 
          title: 'Featured Talent Listings', 
          desc: 'Premium placement for talent profiles and casting calls to maximize visibility.', 
          icon: Star,
          color: 'text-blue-400',
          bg: 'bg-blue-500/10',
          border: 'border-blue-500/20'
        },
        { 
          title: 'Studio Advertisement', 
          desc: 'Targeted ad placements for production houses, acting schools, and equipment vendors.', 
          icon: Video,
          color: 'text-purple-400',
          bg: 'bg-purple-500/10',
          border: 'border-purple-500/20'
        },
        { 
          title: 'Legal Documentation Fees', 
          desc: 'Pay-per-use or bundled pricing for AI-generated contracts, NDAs, and IP timestamping.', 
          icon: FileText,
          color: 'text-crimson',
          bg: 'bg-crimson/10',
          border: 'border-crimson/20'
        },
        { 
          title: 'Verification Charges', 
          desc: 'One-time fee for KYC, background checks, and professional skill verification.', 
          icon: ShieldCheck,
          color: 'text-emerald-400',
          bg: 'bg-emerald-500/10',
          border: 'border-emerald-500/20'
        }
      ].map((model, i) => (
        <div key={i} className={cn("p-8 rounded-2xl border transition-all hover:-translate-y-2 group", model.bg, model.border)}>
          <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-black/40", model.color)}>
            <model.icon size={24} />
          </div>
          <h3 className="text-xl font-bold mb-3">{model.title}</h3>
          <p className="text-sm text-white/60 leading-relaxed">{model.desc}</p>
        </div>
      ))}
    </div>
  </section>
);
