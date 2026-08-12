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

export const EventManagement = () => {
  return (
    <div className="pt-32 px-6 w-full max-w-[1600px] mx-auto min-h-screen pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">Event <span className="gold-text">Calendar</span></h1>
          <p className="text-white/50">Workshops, festivals, and live performances across India — find what's next and be there for it.</p>
        </div>
        <button disabled className="bg-white/10 border border-white/10 text-white/50 px-8 py-3 rounded-xl font-bold uppercase tracking-widest cursor-not-allowed w-full md:w-auto">
          Host an Event — Coming Soon
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="relative glass-panel p-8">
            <ComingSoonTag />
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold">Calendar</h3>
              <div className="flex gap-2">
                <button disabled className="p-2 bg-white/5 rounded-lg text-white/20 cursor-not-allowed"><ChevronRight className="rotate-180" size={20} /></button>
                <button disabled className="p-2 bg-white/5 rounded-lg text-white/20 cursor-not-allowed"><ChevronRight size={20} /></button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-[8px] sm:text-[10px] uppercase tracking-widest text-white/40 font-bold py-2">{day}</div>
              ))}
              {Array.from({ length: 35 }).map((_, i) => (
                <ScaffoldRow key={i} className="aspect-square" />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-2">Upcoming Events</h3>
            <p className="text-white/40 text-sm mb-4 max-w-2xl">
              Real event listings you can browse and book — with dates, venues, and pricing pulled from
              actual organisers, not a static demo calendar.
            </p>
            <div className="space-y-4">
              {[0, 1, 2].map((i) => (
                <div key={i} className="relative glass-panel p-6">
                  <ComingSoonTag />
                  <ScaffoldRow className="h-16" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="relative glass-panel p-8 bg-gradient-to-br from-blue-500/10 to-transparent">
            <ComingSoonTag />
            <h3 className="font-bold mb-6 flex items-center gap-2"><Star size={18} className="text-blue-400" /> Featured Event</h3>
            <ScaffoldRow className="aspect-[4/3] mb-6" />
            <ScaffoldRow className="h-5 w-2/3 mb-2" />
            <ScaffoldRow className="h-4" />
          </div>

          <div className="relative glass-panel p-8">
            <ComingSoonTag />
            <h3 className="font-bold mb-6 flex items-center gap-2"><TrendingUp size={18} className="text-gold" /> Event Insights</h3>
            <div className="space-y-4">
              {['Total Bookings', 'Active Venues', 'Revenue Growth'].map((label) => (
                <div key={label} className="flex justify-between items-center">
                  <span className="text-xs text-white/60">{label}</span>
                  <ScaffoldRow className="h-5 w-16" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
