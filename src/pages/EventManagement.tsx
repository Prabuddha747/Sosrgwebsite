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

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const EventManagement = () => {
  const [monthOffset, setMonthOffset] = useState(0);
  const today = new Date();
  const viewDate = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthLabel = viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const isCurrentMonth = year === today.getFullYear() && month === today.getMonth();

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
          <div className="glass-panel p-8">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold">{monthLabel}</h3>
              <div className="flex gap-2">
                <button onClick={() => setMonthOffset((o) => o - 1)} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-colors"><ChevronRight className="rotate-180" size={20} /></button>
                <button onClick={() => setMonthOffset((o) => o + 1)} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-colors"><ChevronRight size={20} /></button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-4">
              {WEEKDAY_LABELS.map(day => (
                <div key={day} className="text-center text-[8px] sm:text-[10px] uppercase tracking-widest text-white/40 font-bold py-2">{day}</div>
              ))}
              {Array.from({ length: firstWeekday }).map((_, i) => (
                <div key={`blank-${i}`} />
              ))}
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
                <div
                  key={day}
                  className={cn(
                    "aspect-square flex items-center justify-center rounded-lg text-xs sm:text-sm",
                    isCurrentMonth && day === today.getDate()
                      ? "bg-gold text-black font-bold"
                      : "bg-white/5 text-white/60"
                  )}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2"><Calendar size={20} className="text-gold" /> Upcoming Events — Visit Our App</h3>
            <p className="text-white/40 text-sm max-w-2xl">
              Real event listings you can browse and book — with dates, venues, and pricing pulled from
              actual organisers, not a static demo calendar.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="font-bold mb-2 flex items-center gap-2"><Star size={18} className="text-gold" /> Featured Event — Visit Our App</h3>
            <p className="text-white/40 text-sm">A spotlighted event pulled from real bookings and organiser activity, not a curated demo pick.</p>
          </div>

          <div>
            <h3 className="font-bold mb-2 flex items-center gap-2"><TrendingUp size={18} className="text-gold" /> Event Insights — Visit Our App</h3>
            <p className="text-white/40 text-sm">Total bookings, active venues, and revenue growth, tracked from real event activity.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
