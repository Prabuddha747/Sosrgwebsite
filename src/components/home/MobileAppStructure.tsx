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

export const MobileAppStructure = () => (
  <section className="py-24 px-6 max-w-[1600px] mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div className="order-2 lg:order-1 relative">
        <div className="absolute inset-0 bg-gold/5 rounded-full blur-[100px]" />
        <div className="relative mx-auto w-[280px] h-[580px] bg-black rounded-[3rem] border-8 border-white/10 p-4 shadow-2xl flex flex-col overflow-hidden">
          {/* Mobile Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-white/10 rounded-b-xl z-20" />
          
          {/* Mobile App UI Mockup */}
          <div className="flex-1 bg-cinematic-gray rounded-2xl overflow-hidden relative flex flex-col">
            <div className="p-4 bg-black/50 backdrop-blur-md sticky top-0 z-10 border-b border-white/5 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-crimson rounded flex items-center justify-center">
                  <span className="text-[10px] font-bold italic">S</span>
                </div>
                <span className="text-xs font-bold gold-text">SosrG</span>
              </div>
              <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center">
                <User size={12} />
              </div>
            </div>
            
            <div className="p-4 space-y-4 overflow-y-auto no-scrollbar flex-1 pb-20">
              <div className="bg-gold/10 border border-gold/20 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Zap size={14} className="text-gold" />
                  <span className="text-[10px] font-bold text-gold uppercase tracking-widest">AI Match Alert</span>
                </div>
                <div className="text-xs font-bold mb-1">Lead Role - Netflix Thriller</div>
                <div className="text-[10px] text-white/60 mb-2">94% Match • ₹5L Budget</div>
                <button className="w-full bg-gold text-black py-1.5 rounded text-[10px] font-bold uppercase tracking-widest">Quick Apply</button>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Video size={14} className="text-blue-400" />
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Pending Audition</span>
                </div>
                <div className="text-xs font-bold mb-1">Dharma Productions</div>
                <div className="text-[10px] text-white/60 mb-2">Due in 24 hours</div>
                <button className="w-full bg-white/10 text-white py-1.5 rounded text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-1">
                  <Video size={10} /> Record Now
                </button>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-2">
                  <PenTool size={14} className="text-emerald-400" />
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Contract Ready</span>
                </div>
                <div className="text-xs font-bold mb-1">Standard Actor Agreement</div>
                <button className="w-full bg-emerald-500 text-black py-1.5 rounded text-[10px] font-bold uppercase tracking-widest">E-Sign Document</button>
              </div>
            </div>

            {/* Mobile Bottom Nav */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md border-t border-white/10 p-4 flex justify-between items-center">
              <LayoutDashboard size={18} className="text-gold" />
              <Search size={18} className="text-white/40" />
              <div className="w-10 h-10 bg-crimson rounded-full flex items-center justify-center -mt-8 border-4 border-cinematic-gray">
                <Video size={16} className="text-white" />
              </div>
              <MessageSquare size={18} className="text-white/40 relative">
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-crimson rounded-full" />
              </MessageSquare>
              <User size={18} className="text-white/40" />
            </div>
          </div>
        </div>
      </div>

      <div className="order-1 lg:order-2 space-y-8">
        <div>
          <h2 className="text-4xl font-serif italic mb-4">Mobile App <span className="gold-text">Structure</span></h2>
          <p className="text-white/60 leading-relaxed max-w-lg">
            Designed for fast, real-time industry interaction. Carry your casting studio, legal vault, and network in your pocket.
          </p>
        </div>

        <div className="space-y-6">
          {[
            { title: 'Instant Audition Recording', desc: 'Record and submit self-tapes directly from your phone with built-in teleprompter and AI lighting enhancement.', icon: Video, color: 'text-blue-400' },
            { title: 'Quick Apply Casting', desc: 'One-tap applications using your pre-verified AI portfolio and showreel.', icon: Zap, color: 'text-gold' },
            { title: 'Push Notifications', desc: 'Real-time alerts for audition callbacks, message requests, and escrow payment releases.', icon: AlertCircle, color: 'text-crimson' },
            { title: 'Digital Contract Signing', desc: 'Review and e-sign legally binding agreements and NDAs on the go.', icon: PenTool, color: 'text-emerald-400' },
            { title: 'AI Match Alerts', desc: 'Get instantly notified when a new project perfectly matches your biometric and skill profile.', icon: Cpu, color: 'text-purple-400' },
          ].map((feature, i) => (
            <div key={i} className="flex gap-4">
              <div className={cn("mt-1", feature.color)}>
                <feature.icon size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">{feature.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4 pt-4">
          <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors">
            <Globe size={18} /> App Store
          </button>
          <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors">
            <Globe size={18} /> Google Play
          </button>
        </div>
      </div>
    </div>
  </section>
);
