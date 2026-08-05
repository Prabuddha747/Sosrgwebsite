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

export const CommunityHub = () => {
  const [activeTab, setActiveTab] = useState<'directory' | 'sharing' | 'news'>('directory');

  return (
    <div className="pt-32 px-6 max-w-7xl mx-auto min-h-screen pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif italic mb-2">Creative <span className="vibrant-text-3">Community</span></h1>
          <p className="text-white/50">Connect, share, and stay updated with the 7 Core Creative Sectors.</p>
        </div>
        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 overflow-x-auto no-scrollbar w-full md:w-auto">
          {[
            { id: 'directory', label: 'Arts Directory', icon: Building2 },
            { id: 'sharing', label: 'Content Sharing', icon: Share2 },
            { id: 'news', label: 'Industry News', icon: Newspaper },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap",
                activeTab === tab.id ? "bg-gold text-black" : "text-white/60 hover:text-white"
              )}
            >
              <tab.icon size={16} /> {tab.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'directory' && (
          <motion.div
            key="directory"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
                <input 
                  type="text" 
                  placeholder="Search theatre groups, institutes, agencies..." 
                  className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-gold transition-colors"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {['All', 'Theatre Groups', 'Film Institutes', 'Art Galleries', 'Talent Agencies'].map(filter => (
                  <button key={filter} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold whitespace-nowrap hover:border-gold/50 transition-colors">
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'National School of Drama', type: 'Film Institute', location: 'New Delhi', image: 'https://picsum.photos/seed/nsd/400/300' },
                { name: 'Prithvi Theatre', type: 'Theatre Group', location: 'Mumbai', image: 'https://picsum.photos/seed/prithvi/400/300' },
                { name: 'Jehangir Art Gallery', type: 'Art Gallery', location: 'Mumbai', image: 'https://picsum.photos/seed/jehangir/400/300' },
                { name: 'Kwan Talent Management', type: 'Talent Agency', location: 'Mumbai', image: 'https://picsum.photos/seed/kwan/400/300' },
                { name: 'Satyajit Ray Film & TV Institute', type: 'Film Institute', location: 'Kolkata', image: 'https://picsum.photos/seed/srfti/400/300' },
                { name: 'Ranga Shankara', type: 'Theatre Group', location: 'Bengaluru', image: 'https://picsum.photos/seed/ranga/400/300' },
              ].map((org, i) => (
                <div key={i} className="glass-panel p-4 group cursor-pointer hover:border-gold/30 transition-all">
                  <div className="aspect-video rounded-xl overflow-hidden mb-4 relative">
                    <img src={org.image} alt={org.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest border border-white/10">
                      {org.type}
                    </div>
                  </div>
                  <h3 className="font-bold text-lg mb-1 group-hover:text-gold transition-colors">{org.name}</h3>
                  <p className="text-white/50 text-sm flex items-center gap-1"><MapPin size={14} /> {org.location}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'sharing' && (
          <motion.div
            key="sharing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <div className="lg:col-span-2 space-y-6">
              {/* Post Creation */}
              <div className="glass-panel p-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 overflow-hidden shrink-0">
                    <img src="https://picsum.photos/seed/user/100/100" alt="User" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <textarea 
                      placeholder="Share your artwork, performance, or creative writing..." 
                      className="w-full bg-transparent border-none outline-none resize-none text-white placeholder:text-white/40 h-20"
                    />
                    <div className="flex justify-between items-center pt-4 border-t border-white/10">
                      <div className="flex gap-2">
                        <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-white"><Image size={18} /></button>
                        <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-white"><Video size={18} /></button>
                        <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-white"><Music size={18} /></button>
                        <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-white"><FileText size={18} /></button>
                      </div>
                      <button className="bg-gold text-black px-6 py-2 rounded-full font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform">
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feed */}
              <div className="space-y-6">
                {[
                  { user: 'Maya Sharma', role: 'Contemporary Dancer', time: '2h ago', content: 'Just finished choreographing this new piece exploring the concept of time. Would love some feedback from the community!', type: 'video', media: 'https://picsum.photos/seed/dance-video/800/450', likes: 245, comments: 32 },
                  { user: 'Kabir Khan', role: 'Screenwriter', time: '5h ago', content: 'Snippet from my latest sci-fi script "Neon Horizons". Looking for a concept artist to collaborate on character designs.', type: 'text', media: null, likes: 128, comments: 45 },
                  { user: 'Aisha Patel', role: 'Concept Artist', time: '1d ago', content: 'Cyberpunk Mumbai - Environment Design. Created using Blender and Photoshop.', type: 'image', media: 'https://picsum.photos/seed/cyberpunk/800/600', likes: 892, comments: 112 },
                ].map((post, i) => (
                  <div key={i} className="glass-panel p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/10 overflow-hidden shrink-0">
                          <img src={`https://picsum.photos/seed/user${i}/100/100`} alt={post.user} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm">{post.user}</h4>
                          <p className="text-[10px] uppercase tracking-widest text-white/40">{post.role} • {post.time}</p>
                        </div>
                      </div>
                      <button className="text-white/40 hover:text-white"><MoreHorizontal size={20} /></button>
                    </div>
                    <p className="text-sm text-white/80 mb-4">{post.content}</p>
                    {post.media && (
                      <div className="rounded-xl overflow-hidden mb-4 border border-white/10">
                        <img src={post.media} alt="Post media" className="w-full h-auto object-cover" referrerPolicy="no-referrer" />
                      </div>
                    )}
                    <div className="flex gap-6 pt-4 border-t border-white/10">
                      <button className="flex items-center gap-2 text-white/60 hover:text-gold transition-colors text-sm">
                        <Heart size={18} /> {post.likes}
                      </button>
                      <button className="flex items-center gap-2 text-white/60 hover:text-blue-400 transition-colors text-sm">
                        <MessageCircle size={18} /> {post.comments}
                      </button>
                      <button className="flex items-center gap-2 text-white/60 hover:text-emerald-400 transition-colors text-sm">
                        <Share2 size={18} /> Share
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="glass-panel p-6">
                <h3 className="font-bold mb-4 uppercase tracking-widest text-xs">Trending Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {['#MonologueChallenge', '#IndieFilm', '#ConceptArt', '#TheatreLife', '#Screenwriting', '#VoiceActing'].map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gold hover:bg-white/10 cursor-pointer transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="glass-panel p-6">
                <h3 className="font-bold mb-4 uppercase tracking-widest text-xs">Suggested Collaborators</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Rohan D.', role: 'Cinematographer' },
                    { name: 'Meera S.', role: 'Sound Designer' },
                    { name: 'Vikram B.', role: 'VFX Artist' },
                  ].map((user, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/10 overflow-hidden">
                          <img src={`https://picsum.photos/seed/collab${i}/100/100`} alt={user.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs">{user.name}</h4>
                          <p className="text-[10px] text-white/40">{user.role}</p>
                        </div>
                      </div>
                      <button className="text-xs bg-white/10 px-3 py-1 rounded-full hover:bg-gold hover:text-black transition-colors">Connect</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'news' && (
          <motion.div
            key="news"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-4 gap-8"
          >
            <div className="lg:col-span-3 space-y-8">
              {/* Featured News */}
              <div className="relative aspect-[21/9] rounded-2xl overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />
                <img src="https://picsum.photos/seed/news-hero/1200/600" alt="News Hero" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                <div className="absolute bottom-0 left-0 right-0 p-8 z-20 bg-gradient-to-t from-black via-black/80 to-transparent">
                  <span className="bg-crimson text-white px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest mb-4 inline-block">Exclusive Interview</span>
                  <h2 className="text-3xl md:text-4xl font-serif italic mb-2 group-hover:text-gold transition-colors">"The Evolution of Method Acting in Modern Indian Cinema"</h2>
                  <p className="text-white/80 text-sm md:text-base max-w-2xl">A deep dive with veteran actor Naseeruddin Shah on how preparation techniques have shifted in the OTT era.</p>
                </div>
              </div>

              {/* News Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: 'New Film City Announced in Uttar Pradesh', category: 'Industry Update', time: '2 hours ago', image: 'https://picsum.photos/seed/filmcity/600/400' },
                  { title: 'Top 10 Casting Directors to Follow in 2026', category: 'Casting News', time: '5 hours ago', image: 'https://picsum.photos/seed/castingdir/600/400' },
                  { title: 'How AI is Changing Script Analysis', category: 'Creative Insights', time: '1 day ago', image: 'https://picsum.photos/seed/aiscript/600/400' },
                  { title: 'National Theatre Festival Dates Released', category: 'Events', time: '1 day ago', image: 'https://picsum.photos/seed/theatrefest/600/400' },
                ].map((news, i) => (
                  <div key={i} className="glass-panel p-4 flex flex-col sm:flex-row gap-4 group cursor-pointer hover:border-gold/30 transition-all">
                    <div className="w-full sm:w-1/3 aspect-video sm:aspect-square rounded-lg overflow-hidden shrink-0">
                      <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="text-[10px] uppercase tracking-widest text-gold mb-1">{news.category}</span>
                      <h3 className="font-bold text-sm mb-2 group-hover:text-white transition-colors line-clamp-2">{news.title}</h3>
                      <p className="text-[10px] text-white/40">{news.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="glass-panel p-6">
                <h3 className="font-bold mb-4 uppercase tracking-widest text-xs">Trending Topics</h3>
                <div className="space-y-3">
                  {['#Oscars2026', 'Regional Cinema Boom', 'Virtual Production', 'Indie Music Festivals', 'Web Series Casting'].map((topic, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-white/60 hover:text-gold cursor-pointer transition-colors">
                      <span className="text-white/20 font-mono text-xs">0{i + 1}</span>
                      {topic}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="glass-panel p-6 bg-gradient-to-br from-gold/10 to-transparent border-gold/20">
                <h3 className="font-bold mb-2 text-gold">Subscribe to Newsletter</h3>
                <p className="text-xs text-white/60 mb-4">Get the latest industry news and casting calls delivered to your inbox.</p>
                <div className="flex flex-col gap-2">
                  <input type="email" placeholder="Your email address" className="bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gold" />
                  <button className="bg-gold text-black rounded-lg px-3 py-2 text-sm font-bold uppercase tracking-widest hover:bg-white transition-colors">Subscribe</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Dynamic Background ---
