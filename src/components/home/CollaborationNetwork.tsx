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

export const CollaborationNetwork = () => {
  const [activeTab, setActiveTab] = useState<'theatre' | 'literature' | 'music' | 'art'>('theatre');

  const tabs = [
    { id: 'theatre', label: 'Freelance to Full-time Bridge', icon: User },
    { id: 'literature', label: 'Literature to Screen', icon: FileText },
    { id: 'music', label: 'Music Collaboration Hub', icon: Mic },
    { id: 'art', label: 'Art & Craft Vendor Directory', icon: Palette },
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
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
              <button className="mt-8 bg-gold text-black px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:scale-[1.02] transition-transform">
                Explore Bridge Program
              </button>
            </div>
            <div className="glass-panel-orange p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                  <img src="https://i.pravatar.cc/150?u=theatre1" className="w-16 h-16 rounded-full object-cover" alt="Actor" />
                  <div>
                    <h4 className="font-bold">Rajesh Sharma</h4>
                    <p className="text-xs text-white/40">15 Years Stage Experience</p>
                    <div className="mt-2 text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded inline-block">Transitioned to Lead Role in OTT Series</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                  <img src="https://i.pravatar.cc/150?u=theatre2" className="w-16 h-16 rounded-full object-cover" alt="Actor" />
                  <div>
                    <h4 className="font-bold">Meera Desai</h4>
                    <p className="text-xs text-white/40">NSD Graduate</p>
                    <div className="mt-2 text-[10px] bg-gold/20 text-gold px-2 py-1 rounded inline-block">Currently Auditioning for Feature Film</div>
                  </div>
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
            <div className="glass-panel p-8 relative overflow-hidden order-2 lg:order-1">
              <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
              <div className="relative z-10 space-y-4">
                {[
                  { title: 'The Silent Valley', genre: 'Thriller', status: 'Optioned', author: 'Vikram Sethi' },
                  { title: 'Monsoon Echoes', genre: 'Romance', status: 'Pitching', author: 'Anjali Rao' },
                  { title: 'Cyber City 2050', genre: 'Sci-Fi', status: 'In Review', author: 'Karan Patel' }
                ].map((script, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:border-blue-500/50 transition-colors cursor-pointer">
                    <div>
                      <h4 className="font-bold text-sm">{script.title}</h4>
                      <p className="text-[10px] text-white/40 uppercase tracking-widest">{script.genre} • By {script.author}</p>
                    </div>
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded",
                      script.status === 'Optioned' ? "bg-emerald-500/20 text-emerald-400" : 
                      script.status === 'Pitching' ? "bg-gold/20 text-gold" : "bg-blue-500/20 text-blue-400"
                    )}>
                      {script.status}
                    </span>
                  </div>
                ))}
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
              <button className="mt-8 bg-blue-500 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:scale-[1.02] transition-transform">
                Enter Marketplace
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
              <button className="mt-8 bg-purple-500 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:scale-[1.02] transition-transform">
                Start Collaborating
              </button>
            </div>
            <div className="glass-panel-purple p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
              <div className="relative z-10 space-y-6">
                <div className="p-6 bg-black/40 rounded-2xl border border-white/10">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h4 className="font-bold">Project: Urban Beats Anthem</h4>
                      <p className="text-xs text-white/40">Looking for: Female Vocalist (R&B)</p>
                    </div>
                    <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                      <Mic className="text-purple-400" size={20} />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/60">Composer: Amit Trivedi</span>
                      <span className="text-emerald-400">Joined</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/60">Lyricist: Kausar Munir</span>
                      <span className="text-emerald-400">Joined</span>
                    </div>
                    <div className="flex items-center justify-between text-xs p-2 bg-white/5 rounded border border-dashed border-white/20">
                      <span className="text-white/40">Vocalist: Open Role</span>
                      <button className="text-purple-400 font-bold hover:underline">Apply</button>
                    </div>
                  </div>
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
            <div className="glass-panel p-8 relative overflow-hidden order-2 lg:order-1">
              <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl" />
              <div className="relative z-10 grid grid-cols-2 gap-4">
                {[
                  { name: 'Vintage Props Co.', category: 'Properties', rating: 4.9 },
                  { name: 'Loom & Thread', category: 'Costumes', rating: 4.8 },
                  { name: 'Lumina Lighting', category: 'Equipment', rating: 5.0 },
                  { name: 'SetCraft Studios', category: 'Set Construction', rating: 4.7 }
                ].map((vendor, i) => (
                  <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/10 text-center hover:border-emerald-500/50 transition-colors cursor-pointer">
                    <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Palette className="text-emerald-400" size={20} />
                    </div>
                    <h4 className="font-bold text-xs mb-1 truncate">{vendor.name}</h4>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest mb-2">{vendor.category}</p>
                    <div className="flex items-center justify-center gap-1 text-[10px] text-gold font-bold">
                      <Star size={10} className="fill-gold" /> {vendor.rating}
                    </div>
                  </div>
                ))}
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
              <button className="mt-8 bg-emerald-500 text-black px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:scale-[1.02] transition-transform">
                Browse Directory
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
