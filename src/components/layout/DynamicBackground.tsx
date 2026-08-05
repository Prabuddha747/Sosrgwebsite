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
import { BACKGROUNDS } from '../../data/mockData';

export const DynamicBackground = ({ activeSection }: { activeSection: Section }) => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${BACKGROUNDS[activeSection]})` }}
          />
          {/* Overlays to ensure text readability and cinematic feel */}
          <div className="absolute inset-0 bg-gradient-to-b from-cinematic-black/60 via-cinematic-black/75 to-cinematic-black/95 dark:from-cinematic-black/70 dark:via-cinematic-black/85 dark:to-cinematic-black/98" />
          
          {/* Colorful Blobs with animations */}
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              x: [0, 80, 0],
              y: [0, -50, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_15%_50%,rgba(236,72,153,0.5),transparent_50%)] mix-blend-screen dark:mix-blend-color-dodge" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.4, 1],
              x: [0, -60, 0],
              y: [0, 60, 0]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_85%_30%,rgba(168,85,247,0.5),transparent_50%)] mix-blend-screen dark:mix-blend-color-dodge" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.5, 1],
              x: [0, 50, 0],
              y: [0, 70, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(59,130,246,0.5),transparent_55%)] mix-blend-screen dark:mix-blend-color-dodge" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              x: [0, -70, 0],
              y: [0, -40, 0]
            }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_70%_10%,rgba(234,179,8,0.4),transparent_45%)] mix-blend-screen dark:mix-blend-color-dodge" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.4, 1],
              x: [0, 40, 0],
              y: [0, -60, 0]
            }}
            transition={{ duration: 17, repeat: Infinity, ease: "easeInOut", delay: 4 }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(16,185,129,0.4),transparent_50%)] mix-blend-screen dark:mix-blend-color-dodge" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.5, 1],
              x: [0, 40, 0],
              y: [0, -20, 0]
            }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 4 }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(16,185,129,0.3),transparent_45%)] mix-blend-screen dark:mix-blend-normal" 
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
