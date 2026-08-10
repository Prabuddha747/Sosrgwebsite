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
import { HoverEffect } from '../ui/hover-effect';

const MODELS = [
  {
    title: 'Subscription Memberships',
    desc: 'Tiered access for talent and recruiters with advanced AI features and unlimited applications.',
    hooks: ['Tiered Access', 'Unlimited Applications'],
    icon: Trophy,
    accent: 'gold',
  },
  {
    title: 'Commission per Hiring',
    desc: 'A small percentage fee on successful casting and project completion via our secure escrow.',
    hooks: ['Escrow-secured', 'Success-based Fee'],
    icon: Wallet,
    accent: 'emerald',
  },
  {
    title: 'Featured Talent Listings',
    desc: 'Premium placement for talent profiles and casting calls to maximize visibility.',
    hooks: ['Premium Placement', 'Casting Call Boost'],
    icon: Star,
    accent: 'blue',
  },
  {
    title: 'Studio Advertisement',
    desc: 'Targeted ad placements for production houses, acting schools, and equipment vendors.',
    hooks: ['Targeted Placement', 'Vendor Reach'],
    icon: Video,
    accent: 'purple',
  },
  {
    title: 'Legal Documentation Fees',
    desc: 'Pay-per-use or bundled pricing for AI-generated contracts, NDAs, and IP timestamping.',
    hooks: ['Pay-per-use', 'IP Timestamped'],
    icon: FileText,
    accent: 'crimson',
  },
  {
    title: 'Verification Charges',
    desc: 'One-time fee for KYC, background checks, and professional skill verification.',
    hooks: ['One-time Fee', 'KYC + Skill Check'],
    icon: ShieldCheck,
    accent: 'emerald',
  },
];

const ACCENT_RING: Record<string, string> = {
  emerald: 'from-emerald-500/40 via-emerald-500/0 to-emerald-500/40 text-emerald-400',
  gold: 'from-gold/50 via-gold/0 to-gold/50 text-gold',
  blue: 'from-blue-500/40 via-blue-500/0 to-blue-500/40 text-blue-400',
  purple: 'from-purple-500/40 via-purple-500/0 to-purple-500/40 text-purple-400',
  crimson: 'from-crimson/50 via-crimson/0 to-crimson/50 text-crimson',
};

export const MonetizationModel = () => (
  <section className="py-24 px-6 max-w-[1600px] mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-serif italic mb-4">Monetization <span className="gold-text">Model</span></h2>
      <p className="text-white/40 max-w-2xl mx-auto">Transparent, value-driven revenue streams designed to support the creative ecosystem.</p>
    </div>

    <HoverEffect className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {MODELS.map((model, i) => (
        <div key={i} className="relative glass-panel p-8 h-full group hover:-translate-y-1 transition-transform duration-300">
          <ComingSoonTag />
          <div className={cn("w-14 h-14 rounded-full p-[1.5px] bg-gradient-to-br mb-6", ACCENT_RING[model.accent])}>
            <div className="w-full h-full rounded-full bg-cinematic-black flex items-center justify-center">
              <model.icon size={22} className={ACCENT_RING[model.accent].split(' ').pop()} />
            </div>
          </div>
          <h3 className="text-xl font-bold mb-3">{model.title}</h3>
          <p className="text-sm text-white/60 leading-relaxed mb-6">{model.desc}</p>
          <div className="flex flex-wrap gap-2">
            {model.hooks.map((hook) => (
              <span key={hook} className="text-[10px] bg-white/5 border border-white/10 text-white/50 px-2 py-1 rounded-full">{hook}</span>
            ))}
          </div>
        </div>
      ))}
    </HoverEffect>
  </section>
);
