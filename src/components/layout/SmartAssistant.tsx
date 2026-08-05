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

export const SmartAssistant = ({ setActiveSection }: { setActiveSection: (s: Section) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-20 right-0 w-80 glass-panel p-6 shadow-2xl border-gold/30"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center">
                <Cpu className="text-gold" size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm">SosrG Smart AI</h4>
                <p className="text-[10px] text-white/40">How can I help you today?</p>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Find a Casting Call', section: 'casting' },
                { label: 'Analyze my Script', section: 'ai-tools' },
                { label: 'Check Live Auctions', section: 'auction' },
                { label: 'Update my Profile', section: 'profile' },
              ].map((opt, i) => (
                <button
                  key={i}
                  onClick={() => { setActiveSection(opt.section as Section); setIsOpen(false); }}
                  className="w-full text-left p-3 bg-white/5 rounded-xl text-xs hover:bg-gold hover:text-black transition-all border border-white/5"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500",
          isOpen ? "bg-crimson rotate-90" : "bg-gold gold-glow hover:scale-110"
        )}
      >
        {isOpen ? <X className="text-white" /> : <Cpu className="text-black" size={32} />}
      </button>
    </div>
  );
};
