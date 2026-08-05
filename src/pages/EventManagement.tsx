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

export const EventManagement = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const EVENTS = [
    { id: 1, title: 'Mumbai Film Festival', date: '2026-03-15', type: 'Festival', location: 'Juhu, Mumbai', price: '₹2,500' },
    { id: 2, title: 'Method Acting Workshop', date: '2026-03-20', type: 'Workshop', location: 'SosrG StudioS, Delhi', price: '₹1,200' },
    { id: 3, title: 'Classical Dance Showcase', date: '2026-03-25', type: 'Performance', location: 'Chennai Auditorium', price: '₹800' },
  ];

  return (
    <div className="pt-32 px-6 max-w-7xl mx-auto min-h-screen pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif italic mb-2">Event <span className="vibrant-text-2">Calendar</span></h1>
          <p className="text-white/50">Book workshops, festivals, and performances across India.</p>
        </div>
        <button className="bg-gold text-black px-8 py-3 rounded-xl font-bold uppercase tracking-widest hover:scale-105 transition-transform w-full md:w-auto">
          Host an Event
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-panel p-8">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold">March 2026</h3>
              <div className="flex gap-2">
                <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"><ChevronRight className="rotate-180" size={20} /></button>
                <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"><ChevronRight size={20} /></button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-[8px] sm:text-[10px] uppercase tracking-widest text-white/40 font-bold py-2">{day}</div>
              ))}
              {[...Array(31)].map((_, i) => {
                const day = i + 1;
                const hasEvent = EVENTS.some(e => e.date === `2026-03-${day.toString().padStart(2, '0')}`);
                return (
                  <div 
                    key={i} 
                    className={cn(
                      "aspect-square flex flex-col items-center justify-center rounded-xl border transition-all cursor-pointer relative group",
                      day === 15 ? "bg-gold text-black border-gold" : "bg-white/5 border-white/5 hover:border-gold/30"
                    )}
                  >
                    <span className="text-xs sm:text-sm font-bold">{day}</span>
                    {hasEvent && (
                      <div className={cn("w-1 h-1 rounded-full mt-1", day === 15 ? "bg-black" : "bg-gold")} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">Upcoming Events</h3>
            {EVENTS.map((event) => (
              <div key={event.id} className="glass-panel p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:border-gold/30 transition-all group">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex flex-col items-center justify-center border border-white/10 group-hover:border-gold/30 transition-colors">
                    <span className="text-gold font-bold text-xl">{event.date.split('-')[2]}</span>
                    <span className="text-[10px] uppercase tracking-widest text-white/40">Mar</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-gold font-bold mb-1 block">{event.type}</span>
                    <h4 className="text-xl font-bold mb-1">{event.title}</h4>
                    <p className="text-xs text-white/40 flex items-center gap-1"><MapPin size={12} /> {event.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 w-full md:w-auto">
                  <div className="text-right flex-1 md:flex-none">
                    <div className="font-bold text-lg">{event.price}</div>
                    <p className="text-[10px] uppercase tracking-widest text-white/40">Starting from</p>
                  </div>
                  <button className="bg-white/10 hover:bg-gold hover:text-black px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="glass-panel p-8 bg-gradient-to-br from-blue-500/10 to-transparent">
            <h3 className="font-bold mb-6 flex items-center gap-2"><Star size={18} className="text-blue-400" /> Featured Event</h3>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6">
              <img src="https://picsum.photos/seed/filmfest/600/450" className="w-full h-full object-cover" alt="Featured" />
            </div>
            <h4 className="text-xl font-bold mb-2">National Art Exhibition 2026</h4>
            <p className="text-xs text-white/40 mb-6">Experience the finest contemporary Indian art. Over 500 artists participating from across the country.</p>
            <button className="w-full bg-blue-500 text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:scale-[1.02] transition-transform">
              Get Tickets
            </button>
          </div>

          <div className="glass-panel p-8">
            <h3 className="font-bold mb-6 flex items-center gap-2"><TrendingUp size={18} className="text-gold" /> Event Insights</h3>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/60">Total Bookings</span>
                <span className="font-bold">12,450</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/60">Active Venues</span>
                <span className="font-bold">85</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/60">Revenue Growth</span>
                <span className="font-bold text-emerald-400">+15%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
