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
import { ComingSoonTag } from '../ScaffoldUI';

export const CollaborationNetwork = () => {
  const [activeTab, setActiveTab] = useState<'theatre' | 'literature' | 'music' | 'art'>('theatre');

  const tabs = [
    { id: 'theatre', label: 'Freelance to Full-time Bridge', icon: User },
    { id: 'literature', label: 'Literature to Screen', icon: FileText },
    { id: 'music', label: 'Music Collaboration Hub', icon: Mic },
    { id: 'art', label: 'Art & Craft Vendor Directory', icon: Palette },
  ];

  return (
    <section className="py-24 px-6 max-w-[1600px] mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-serif italic mb-4">Collaboration & <span className="vibrant-text-3">Network Layer</span></h2>
        <p className="text-white/40 max-w-2xl mx-auto">Cross-pollinating talent across the 7 core creative sectors.</p>
      </div>

      <div className="flex overflow-x-auto no-scrollbar gap-4 mb-12 justify-start md:justify-center border-b border-white/5 pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all",
              activeTab === tab.id ? "bg-gold/10 text-gold border border-gold/30" : "text-white/40 hover:text-white"
            )}
          >
            <tab.icon size={18} /> {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'theatre' && (
          <motion.div
            key="theatre"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div className="space-y-6">
              <h3 className="text-3xl font-bold mb-4">Theatre to Cinema Bridge</h3>
              <p className="text-white/60 leading-relaxed">
                A dedicated pathway helping seasoned stage actors transition seamlessly into film and OTT roles. Our AI translates theatre experience into cinematic casting metrics.
              </p>
              <ul className="space-y-4">
                {[
                  'AI translation of stage credits to screen equivalents',
                  'Exclusive casting calls for classically trained actors',
                  'Workshops on camera acting techniques',
                  'Direct producer networking events'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-white/80">
                    <CheckCircle2 size={16} className="text-gold" /> {item}
                  </li>
                ))}
              </ul>
              <button disabled className="mt-8 bg-white/10 border border-white/10 text-white/50 px-8 py-4 rounded-xl font-bold uppercase tracking-widest cursor-not-allowed">
                Explore Bridge Program — Coming Soon
              </button>
            </div>
            <div className="relative glass-panel-orange p-8 overflow-hidden">
              <ComingSoonTag />
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
              <div className="relative z-10 space-y-4">
                <h4 className="font-bold text-lg">How the Bridge Works</h4>
                <p className="text-sm text-white/60 leading-relaxed">
                  Your stage credits — productions, run length, training lineage — get read against a
                  cinematic casting rubric, so a casting director searching for screen experience can
                  still find you on theatre experience alone.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['AI Credit Translation', 'Classical Training Recognized', 'Camera Technique Workshops', 'Direct Producer Access'].map((tag) => (
                    <span key={tag} className="text-[10px] bg-white/5 border border-white/10 text-white/60 px-2 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'literature' && (
          <motion.div
            key="literature"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div className="relative glass-panel p-8 overflow-hidden order-2 lg:order-1">
              <ComingSoonTag />
              <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
              <div className="relative z-10 space-y-4">
                <h4 className="font-bold text-lg">How the Marketplace Works</h4>
                <p className="text-sm text-white/60 leading-relaxed">
                  Your script or manuscript gets a timestamped IP record the moment you upload it, before
                  it's ever shown to a producer — so pitching stays provable, not just polite.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['IP Timestamped', 'Verified Producers Only', 'AI Pitch Assist', 'Standard Option Terms'].map((tag) => (
                    <span key={tag} className="text-[10px] bg-white/5 border border-white/10 text-white/60 px-2 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <h3 className="text-3xl font-bold mb-4">Literature to Screen Marketplace</h3>
              <p className="text-white/60 leading-relaxed">
                A secure marketplace where screenwriters, novelists, and playwrights can pitch their intellectual property directly to verified producers and studios.
              </p>
              <ul className="space-y-4">
                {[
                  'Secure IP timestamping before pitching',
                  'Direct messaging with verified producers',
                  'AI-assisted pitch deck generation',
                  'Standardized option agreements'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-white/80">
                    <CheckCircle2 size={16} className="text-blue-400" /> {item}
                  </li>
                ))}
              </ul>
              <button disabled className="mt-8 bg-white/10 border border-white/10 text-white/50 px-8 py-4 rounded-xl font-bold uppercase tracking-widest cursor-not-allowed">
                Enter Marketplace — Coming Soon
              </button>
            </div>
          </motion.div>
        )}

        {activeTab === 'music' && (
          <motion.div
            key="music"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div className="space-y-6">
              <h3 className="text-3xl font-bold mb-4">Music Collaboration Hub</h3>
              <p className="text-white/60 leading-relaxed">
                Connect lyricists, singers, composers, and sound engineers in real-time. Share stems, co-write lyrics, and manage split sheets automatically.
              </p>
              <ul className="space-y-4">
                {[
                  'Real-time audio collaboration rooms',
                  'Automated royalty split sheet generation',
                  'Find session musicians by instrument and genre',
                  'Direct integration with film post-production'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-white/80">
                    <CheckCircle2 size={16} className="text-purple-400" /> {item}
                  </li>
                ))}
              </ul>
              <button disabled className="mt-8 bg-white/10 border border-white/10 text-white/50 px-8 py-4 rounded-xl font-bold uppercase tracking-widest cursor-not-allowed">
                Start Collaborating — Coming Soon
              </button>
            </div>
            <div className="relative glass-panel-purple p-8 overflow-hidden">
              <ComingSoonTag />
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
              <div className="relative z-10 space-y-4">
                <h4 className="font-bold text-lg">How the Hub Works</h4>
                <p className="text-sm text-white/60 leading-relaxed">
                  Open a room for a track, invite collaborators by role, and everyone works from the same
                  stems and lyric doc — with royalty splits generated from who actually contributed, not
                  negotiated after the fact.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Real-time Rooms', 'Auto Split Sheets', 'Genre-matched Search', 'Post-production Ready'].map((tag) => (
                    <span key={tag} className="text-[10px] bg-white/5 border border-white/10 text-white/60 px-2 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'art' && (
          <motion.div
            key="art"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div className="relative glass-panel p-8 overflow-hidden order-2 lg:order-1">
              <ComingSoonTag />
              <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl" />
              <div className="relative z-10 space-y-4">
                <h4 className="font-bold text-lg">How the Directory Works</h4>
                <p className="text-sm text-white/60 leading-relaxed">
                  Search verified prop houses, costume suppliers, and rental studios by category and
                  location, send a request for quote, and settle through escrow instead of a phone-and-
                  invoice chase.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Verified Vendors', 'RFQ System', 'Escrow Protected', 'Location Search'].map((tag) => (
                    <span key={tag} className="text-[10px] bg-white/5 border border-white/10 text-white/60 px-2 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <h3 className="text-3xl font-bold mb-4">Art & Craft Vendor Directory</h3>
              <p className="text-white/60 leading-relaxed">
                A verified directory connecting production designers, art directors, and costume designers directly to specialized suppliers, artisans, and rental houses.
              </p>
              <ul className="space-y-4">
                {[
                  'Verified vendor ratings and reviews',
                  'Direct RFQ (Request for Quote) system',
                  'Escrow payments for large orders',
                  'Location-based supplier search'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-white/80">
                    <CheckCircle2 size={16} className="text-emerald-400" /> {item}
                  </li>
                ))}
              </ul>
              <button disabled className="mt-8 bg-white/10 border border-white/10 text-white/50 px-8 py-4 rounded-xl font-bold uppercase tracking-widest cursor-not-allowed">
                Browse Directory — Coming Soon
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
