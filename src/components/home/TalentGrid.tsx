import React, { useState, useEffect } from 'react';
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
import type { Section } from '../../types';
import { TALENT_CATEGORIES } from '../../data/mockData';
import { SectorShowcase } from '../ui/sector-showcase';
import { RoleCarousel, type RoleCard } from '../ui/role-carousel';

// Placeholder slots for real member profiles — photos and bios get uploaded
// per-person later, so these stay scaffolded (shimmer, not stock photos)
// rather than showing invented names/descriptions as if they were real.
const FEATURED_ROLE_CATEGORIES: RoleCard[] = [
  { id: 'performers', tag: 'Cinema · Theatre' },
  { id: 'directors', tag: 'Cinema' },
  { id: 'music', tag: 'Music' },
  { id: 'choreo', tag: 'Dance' },
  { id: 'writers', tag: 'Literature' },
  { id: 'design', tag: 'Art & Design' },
];

export const TalentGrid = ({ setActiveSection }: { setActiveSection: (s: Section) => void }) => (
  <section className="py-24 px-6 max-w-[1600px] mx-auto">
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
      <div>
        <h2 className="text-3xl md:text-4xl font-serif italic mb-2">7 Core Creative <span className="vibrant-text-1">Sectors</span></h2>
        <p className="text-white/50 text-sm md:text-base">The SosrG Identity Layer. Each sector opens a dedicated ecosystem hub with role-based listings and opportunities.</p>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
        <button 
          onClick={() => setActiveSection('talent')}
          className="flex items-center gap-2 px-6 py-2 rounded-full bg-gold/20 border border-gold/50 text-gold hover:bg-gold hover:text-black transition-all whitespace-nowrap font-bold text-sm shrink-0"
        >
          <Zap size={16} /> AI Smart Match
        </button>
        {TALENT_CATEGORIES.map((cat) => (
          <button 
            key={cat.id} 
            onClick={() => setActiveSection('talent')}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-gold/50 transition-colors whitespace-nowrap shrink-0"
          >
            <cat.icon size={16} className={cat.color} />
            <span className="text-sm font-medium">{cat.name}</span>
          </button>
        ))}
      </div>
    </div>

    {/* Category Visual Showcase */}
    <div className="mb-24">
      <SectorShowcase onSelect={() => setActiveSection('talent')} />
    </div>

    <div className="mb-12">
      <div className="flex items-center justify-between gap-4 mb-4">
        <h3 className="text-2xl font-serif italic flex items-center gap-3">
          <TrendingUp className="text-gold" /> Featured Professionals
        </h3>
        <span className="bg-gold text-black px-2 py-1 rounded text-[9px] font-bold uppercase tracking-widest shadow-lg shrink-0">
          Coming Soon
        </span>
      </div>
      <p className="text-white/50 text-sm mb-8 max-w-2xl">
        There's no live "featured talent" directory yet — these are the role categories the platform is
        built around, not real member profiles.
      </p>
      <RoleCarousel items={FEATURED_ROLE_CATEGORIES} scaffold />
    </div>
  </section>
);
