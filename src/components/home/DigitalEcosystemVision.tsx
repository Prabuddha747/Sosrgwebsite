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

export const DigitalEcosystemVision = () => (
  <section className="py-24 px-6 max-w-[1600px] mx-auto relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-crimson/5 rounded-3xl -z-10" />
    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-crimson/20 to-transparent" />
    
    <div className="text-center mb-16 relative z-10">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-gold mb-6">
        <Globe size={14} /> The Final Goal
      </div>
      <h2 className="text-4xl md:text-5xl font-serif italic mb-6">
        A Complete Digital <span className="gold-text">Ecosystem</span>
      </h2>
      <p className="text-white/60 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
        Empowering the Indian entertainment industry by helping actors, models, and creative professionals discover opportunities, build careers, collaborate on projects, and grow within the arts community.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
      {[
        { 
          icon: Search, 
          title: 'Discover Opportunities', 
          desc: 'Find casting calls, auditions, and freelance gigs tailored to your unique profile and skills.',
          color: 'text-blue-400',
          bg: 'bg-blue-400/10',
          border: 'border-blue-400/20'
        },
        { 
          icon: Award, 
          title: 'Build Careers', 
          desc: 'Showcase your portfolio, earn verified Green IDs, and level up from fresher to expert.',
          color: 'text-gold',
          bg: 'bg-gold/10',
          border: 'border-gold/20'
        },
        { 
          icon: Users, 
          title: 'Collaborate', 
          desc: 'Connect with directors, producers, and fellow artists to bring creative visions to life.',
          color: 'text-emerald-400',
          bg: 'bg-emerald-500/10',
          border: 'border-emerald-500/20'
        },
        { 
          icon: GraduationCap, 
          title: 'Grow Together', 
          desc: 'Learn through the Academy, attend industry events, and thrive in a supportive community.',
          color: 'text-crimson',
          bg: 'bg-crimson/10',
          border: 'border-crimson/20'
        }
      ].map((feature, i) => (
        <div key={i} className={cn("glass-panel-purple p-8 text-center group hover:-translate-y-2 transition-transform duration-300", feature.border)}>
          <div className={cn("w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110", feature.bg)}>
            <feature.icon size={32} className={feature.color} />
          </div>
          <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
          <p className="text-sm text-white/60 leading-relaxed">{feature.desc}</p>
        </div>
      ))}
    </div>
  </section>
);
