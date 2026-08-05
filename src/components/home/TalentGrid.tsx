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
import type { Section } from '../../types';
import { TALENT_CATEGORIES, FEATURED_TALENT } from '../../data/mockData';

export const TalentGrid = ({ setActiveSection }: { setActiveSection: (s: Section) => void }) => (
  <section className="py-24 px-6 max-w-7xl mx-auto">
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-24">
      {TALENT_CATEGORIES.map((cat, i) => (
        <motion.div
          key={cat.id}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.05 }}
          viewport={{ once: true }}
          onClick={() => setActiveSection('talent')}
          className={cn(
            "group relative h-80 overflow-hidden rounded-3xl cursor-pointer",
            i === 0 || i === 3 ? "md:col-span-2 lg:col-span-2 xl:col-span-2" : ""
          )}
        >
          <img 
            src={cat.image} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            alt={cat.name}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-2 mb-2">
              <cat.icon size={18} className={cat.color} />
              <span className="text-xs font-bold uppercase tracking-widest text-white/60">Ecosystem Hub</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">{cat.name}</h3>
            <p className="text-sm text-white/70 line-clamp-2">{cat.desc}</p>
          </div>
          <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
              <ChevronRight size={20} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>

    <div className="mb-12">
      <h3 className="text-2xl font-serif italic mb-8 flex items-center gap-3">
        <TrendingUp className="text-gold" /> Featured Professionals
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {FEATURED_TALENT.map((talent, i) => (
          <motion.div
            key={talent.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="group relative"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-2xl mb-4 relative border border-white/10 group-hover:border-gold/50 transition-colors">
              <img 
                src={talent.image} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                alt={talent.name}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cinematic-black via-transparent to-transparent opacity-60" />
              
              {/* Premium Badge */}
              {talent.isPremium && (
                <div className="absolute top-4 left-4 bg-gold/90 backdrop-blur-md px-2 py-1 rounded text-black flex items-center gap-1 shadow-lg">
                  <Star size={10} className="fill-black" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Premium</span>
                </div>
              )}

              {/* Rating Badge */}
              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-2 py-1 rounded flex items-center gap-1 border border-white/10">
                <Star size={12} className="text-gold fill-gold" />
                <span className="text-xs font-bold">{talent.rating}</span>
              </div>

              <button className="absolute bottom-4 left-4 right-4 bg-gold text-black py-3 rounded-xl font-bold text-sm opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-xl">
                View Portfolio
              </button>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl font-bold">{talent.name}</h3>
              {talent.isVerified && <ShieldCheck size={16} className="text-blue-400" />}
            </div>
            <div className="flex items-center justify-between text-white/50 text-sm">
              <span className="text-gold/80 font-medium">{talent.role}</span>
              <span className="flex items-center gap-1"><Globe size={12} /> {talent.location}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
