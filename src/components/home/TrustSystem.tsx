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

export const TrustSystem = () => (
  <section className="py-24 px-6 max-w-7xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-serif italic mb-4">Integrity & <span className="gold-text">Security</span></h2>
      <p className="text-white/40 max-w-2xl mx-auto">AI-supported features to avoid glitches and chaos in the film/art industry.</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
      <div className="glass-panel-green p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <ShieldCheck size={120} className="text-emerald-500" />
        </div>
        <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
          <ShieldCheck className="text-emerald-500" /> AI Rating System
        </h3>
        <div className="space-y-6">
          {[
            { label: 'Verified Reviews Only', desc: 'Ratings are only accepted from users with confirmed project completions.', icon: CheckCircle },
            { label: 'Project Completion Score', desc: 'Automated tracking of milestone delivery and deadline adherence.', icon: TrendingUp },
            { label: 'Professional Behaviour Rating', desc: 'AI-analyzed communication and collaboration feedback.', icon: MessageSquare },
          ].map((item, i) => (
            <div key={i} className="flex gap-4">
              <div className="mt-1 text-gold"><item.icon size={20} /></div>
              <div>
                <div className="font-bold">{item.label}</div>
                <p className="text-sm text-white/40">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-panel-blue p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Scale size={120} className="text-blue-500" />
        </div>
        <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
          <Scale className="text-blue-500" /> AI Legal Protection
        </h3>
        <div className="space-y-6">
          {[
            { label: 'Auto NDA Generation', desc: 'Smart NDAs are automatically triggered and signed before collaboration.', icon: FileText },
            { label: 'Auto Contract Draft', desc: 'Legally binding contracts generated based on project scope and budget.', icon: PenTool },
            { label: 'Copyright Timestamp', desc: 'Blockchain-based proof of creation for every creative asset uploaded.', icon: History },
          ].map((item, i) => (
            <div key={i} className="flex gap-4">
              <div className="mt-1 text-gold"><item.icon size={20} /></div>
              <div>
                <div className="font-bold">{item.label}</div>
                <p className="text-sm text-white/40">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
      <div className="text-center p-8 glass-panel">
        <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldCheck className="text-emerald-400" size={32} />
        </div>
        <h3 className="text-xl font-bold mb-4">Verified Professionals</h3>
        <p className="text-white/40 text-sm">Government ID KYC and skill-based verification for every artist and recruiter.</p>
      </div>
      <div className="text-center p-8 glass-panel">
        <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="text-blue-400" size={32} />
        </div>
        <h3 className="text-xl font-bold mb-4">Escrow Protection</h3>
        <p className="text-white/40 text-sm">Milestone-based payments ensuring safety for both talent and production houses.</p>
      </div>
      <div className="text-center p-8 glass-panel">
        <div className="w-16 h-16 bg-crimson/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <TrendingUp className="text-crimson" size={32} />
        </div>
        <h3 className="text-xl font-bold mb-4">IP & Copyright</h3>
        <p className="text-white/40 text-sm">Blockchain-based script timestamping and digital watermarking for all creative assets.</p>
      </div>
    </div>
  </section>
);
