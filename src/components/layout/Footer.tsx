import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  Facebook,
  Linkedin,
  Mail,
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
import logo from '../../assets/logo.jpg';

export const Footer = () => (
  <footer className="bg-cinematic-black/80 backdrop-blur-xl border-t border-white/10 py-16 px-6">
    <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-2">
        <div className="flex items-center gap-2 mb-6">
          <img src={logo} alt="SosrG Logo" className="w-8 h-8 rounded object-cover" />
          <span className="text-xl font-bold tracking-tighter gold-text">SosrG</span>
        </div>
        <p className="text-white/40 max-w-md mb-8">
          The unified ecosystem for Cinema, Theatre, and Cultural Arts. Empowering the next generation of creative professionals with AI and trust.
        </p>
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'WhatsApp', Icon: MessageCircle, href: 'https://wa.me/message/A36K3OVFIWT2B1' },
            { label: 'Instagram', Icon: Instagram, href: 'https://www.instagram.com/sosrgstudios/' },
            { label: 'Facebook', Icon: Facebook, href: 'https://www.facebook.com/SosrGGroup/' },
            { label: 'YouTube', Icon: Youtube, href: 'https://www.youtube.com/@sosrgstudios' },
            { label: 'LinkedIn', Icon: Linkedin, href: 'https://in.linkedin.com/company/sosrgstudios' },
            { label: 'Email', Icon: Mail, href: 'mailto:sosrgstudios@gmail.com' },
          ].map(({ label, Icon, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={label}
              title={label}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 text-white/50 hover:text-gold hover:border-gold/40 transition-colors"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-white/60">Platform</h4>
        <ul className="space-y-4 text-sm text-white/40">
          <li><a href="#" className="hover:text-gold">Talent Marketplace</a></li>
          <li><a href="#" className="hover:text-gold">AI Script Breakdown</a></li>
          <li><a href="#" className="hover:text-gold">Audition Evaluator</a></li>
          <li><a href="#" className="hover:text-gold">Legal & Contracts</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-white/60">Company</h4>
        <ul className="space-y-4 text-sm text-white/40">
          <li><a href="#" className="hover:text-gold">About Us</a></li>
          <li><a href="#" className="hover:text-gold">Safety Policy</a></li>
          <li><a href="#" className="hover:text-gold">Premium Plans</a></li>
          <li><a href="#" className="hover:text-gold">Contact Support</a></li>
          <li>
            <a href="https://www.sosrgstudios.com/" target="_blank" rel="noopener noreferrer" className="hover:text-gold inline-flex items-center gap-1">
              Studios Website <ExternalLink size={12} />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/sosrgcasting" target="_blank" rel="noopener noreferrer" className="hover:text-gold inline-flex items-center gap-1">
              SosrG Casting <ExternalLink size={12} />
            </a>
          </li>
          <li><a href="mailto:sosrgstudios@gmail.com" className="hover:text-gold">sosrgstudios@gmail.com</a></li>
        </ul>
      </div>
    </div>
    <div className="max-w-[1600px] mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/20">
      <p>© 2026 SosrG Creative Industry Platform. All rights reserved.</p>
      <div className="flex gap-8">
        <Link to="/privacy-policy">Privacy Policy</Link>
        <a href="#">Terms of Service</a>
        <a href="#">Cookie Policy</a>
      </div>
    </div>
  </footer>
);
