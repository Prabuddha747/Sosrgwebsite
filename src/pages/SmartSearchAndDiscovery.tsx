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

export const SmartSearchAndDiscovery = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSector, setActiveSector] = useState('All');
  const [activeTab, setActiveTab] = useState<'individuals' | 'agencies'>('individuals');
  
  const SECTORS = ['All', 'Cinema', 'Theatre', 'Literature', 'Music', 'Dance', 'Art & Design', 'Crafts'];

  const [filters, setFilters] = useState({
    role: '',
    experience: '',
    location: '',
    verified: false,
    available: false
  });

  const TALENT_DATA = [
    { id: 1, name: 'Aisha Sharma', sector: 'Cinema', role: 'Lead Actor', rating: 4.9, location: 'Mumbai', verified: true, available: true, rate: '₹5,000/hr', image: 'https://picsum.photos/seed/aisha/400/400', trending: 'Top 1% this week', portfolio: ['Feature Film X', 'Indie Short Y'] },
    { id: 2, name: 'Vikram Singh', sector: 'Cinema', role: 'Cinematographer', rating: 4.8, location: 'Delhi', verified: true, available: false, rate: '₹8,000/hr', image: 'https://picsum.photos/seed/vikram/400/400', trending: '3 active auctions', portfolio: ['Award Winning Ad', 'Docu-Series'] },
    { id: 3, name: 'Neha Gupta', sector: 'Literature', role: 'Screenwriter', rating: 4.7, location: 'Bangalore', verified: false, available: true, rate: '₹3,000/hr', image: 'https://picsum.photos/seed/neha/400/400', trending: 'Script picked by Studio X', portfolio: ['Thriller Script', 'Rom-Com Pitch'] },
    { id: 4, name: 'Rahul Dev', sector: 'Music', role: 'Music Producer', rating: 4.9, location: 'Chennai', verified: true, available: true, rate: '₹10,000/track', image: 'https://picsum.photos/seed/rahul/400/400', trending: 'Chart Topper', portfolio: ['Indie Pop Album', 'BGM Score'] },
    { id: 5, name: 'Priya Patel', sector: 'Dance', role: 'Choreographer', rating: 4.8, location: 'Mumbai', verified: true, available: true, rate: '₹4,000/hr', image: 'https://picsum.photos/seed/priya/400/400', trending: 'Viral Routine', portfolio: ['Music Video Z', 'Stage Show'] },
    { id: 6, name: 'Kabir Khan', sector: 'Theatre', role: 'Stage Director', rating: 4.6, location: 'Kolkata', verified: true, available: false, rate: '₹50,000/play', image: 'https://picsum.photos/seed/kabir/400/400', trending: 'Sold Out Shows', portfolio: ['Modern Adaptation', 'Classic Play'] },
    { id: 7, name: 'Ananya Rao', sector: 'Art & Design', role: 'Set Designer', rating: 4.9, location: 'Hyderabad', verified: true, available: true, rate: '₹15,000/day', image: 'https://picsum.photos/seed/ananya/400/400', trending: 'Award Winner', portfolio: ['Period Drama Set', 'Sci-Fi Stage'] },
    { id: 8, name: 'Arjun Das', sector: 'Crafts', role: 'Costume Artisan', rating: 4.7, location: 'Jaipur', verified: false, available: true, rate: '₹2,000/piece', image: 'https://picsum.photos/seed/arjun/400/400', trending: 'Heritage Crafts', portfolio: ['Historical Costumes', 'Handloom Collection'] },
  ];

  const filteredTalent = TALENT_DATA.filter(t => 
    (activeSector === 'All' || t.sector === activeSector) &&
    (searchQuery === '' || t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.role.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (!filters.verified || t.verified) &&
    (!filters.available || t.available)
  );

  return (
    <div className="pt-32 pb-32 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h1 className="text-5xl font-serif italic mb-4">Talent <span className="vibrant-text-1">Directory</span></h1>
          <p className="text-white/60">Discover, hire, and collaborate with top professionals across the 7 Core Creative Sectors.</p>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
          <input 
            type="text" 
            placeholder="Search by name, role, or skill..." 
            className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-gold transition-colors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 overflow-x-auto no-scrollbar mb-8 w-fit">
        {[
          { id: 'individuals', label: 'Individuals', icon: User },
          { id: 'agencies', label: 'Agencies & Groups', icon: Users },
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

      <div className="flex gap-2 overflow-x-auto no-scrollbar mb-8 pb-2">
        {SECTORS.map(sector => (
          <button 
            key={sector}
            onClick={() => setActiveSector(sector)}
            className={cn(
              "px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border",
              activeSector === sector ? "bg-white text-black border-white" : "bg-transparent text-white/60 border-white/10 hover:border-white/30"
            )}
          >
            {sector}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-panel p-6">
            <div className="flex items-center gap-2 mb-6">
              <Filter size={18} className="text-gold" />
              <h3 className="font-bold uppercase tracking-widest text-sm">Advanced Filters</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="text-xs text-white/40 block mb-2 uppercase tracking-widest">Role</label>
                <select 
                  className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-gold"
                  value={filters.role}
                  onChange={(e) => setFilters({...filters, role: e.target.value})}
                >
                  <option value="">All Roles</option>
                  <option value="actor">Actor</option>
                  <option value="director">Director</option>
                  <option value="writer">Writer</option>
                  <option value="cinematographer">Cinematographer</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-white/40 block mb-2 uppercase tracking-widest">Location</label>
                <select 
                  className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-gold"
                  value={filters.location}
                  onChange={(e) => setFilters({...filters, location: e.target.value})}
                >
                  <option value="">Any Location</option>
                  <option value="mumbai">Mumbai</option>
                  <option value="delhi">Delhi</option>
                  <option value="bangalore">Bangalore</option>
                  <option value="chennai">Chennai</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={cn(
                    "w-5 h-5 rounded border flex items-center justify-center transition-colors",
                    filters.verified ? "bg-emerald-500 border-emerald-500" : "border-white/20 group-hover:border-white/40"
                  )}>
                    {filters.verified && <Check size={14} className="text-white" />}
                  </div>
                  <span className="text-sm font-medium">Green ID Verified Only</span>
                  <input 
                    type="checkbox" 
                    className="hidden"
                    checked={filters.verified}
                    onChange={(e) => setFilters({...filters, verified: e.target.checked})}
                  />
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={cn(
                    "w-5 h-5 rounded border flex items-center justify-center transition-colors",
                    filters.available ? "bg-blue-500 border-blue-500" : "border-white/20 group-hover:border-white/40"
                  )}>
                    {filters.available && <Check size={14} className="text-white" />}
                  </div>
                  <span className="text-sm font-medium">Available for Hire</span>
                  <input 
                    type="checkbox" 
                    className="hidden"
                    checked={filters.available}
                    onChange={(e) => setFilters({...filters, available: e.target.checked})}
                  />
                </label>
              </div>

              <button className="w-full bg-white/5 border border-white/10 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSector + activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {filteredTalent.map((artist) => (
                <div key={artist.id} className="glass-panel p-4 group cursor-pointer hover:border-gold/30 transition-colors flex flex-col h-full">
                  <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-4 shrink-0">
                    <img src={artist.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={artist.name} referrerPolicy="no-referrer" />
                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                      <Star size={12} className="text-gold fill-gold" /> {artist.rating}
                    </div>
                    <div className="absolute top-2 left-2">
                      <span className={cn(
                        "text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border",
                        artist.available ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-black/60 text-white/60 border-white/10 backdrop-blur-md"
                      )}>
                        {artist.available ? 'Available' : 'Busy'}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4">
                      <div className="text-gold text-[10px] font-bold uppercase tracking-widest mb-1 flex items-center gap-1">
                        <TrendingUp size={10} /> {artist.trending}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-lg">{artist.name}</h3>
                        {artist.verified && <ShieldCheck size={16} className="text-emerald-400" />}
                      </div>
                    </div>
                    
                    <div className="text-sm text-white/80 mb-1">{artist.role}</div>
                    
                    <div className="flex items-center justify-between text-xs text-white/40 mb-4">
                      <span className="flex items-center gap-1"><MapPin size={12} /> {artist.location}</span>
                      <span className="font-mono text-emerald-400 font-bold">{artist.rate}</span>
                    </div>

                    <div className="space-y-2 mb-4 flex-1">
                      <div className="text-[10px] uppercase tracking-widest text-white/40">Recent Work</div>
                      <div className="flex flex-wrap gap-2">
                        {artist.portfolio.map((work, i) => (
                          <span key={i} className="text-xs bg-white/5 border border-white/10 px-2 py-1 rounded text-white/80">{work}</span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 mt-auto">
                      <button className="flex-1 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold transition-colors">
                        View Profile
                      </button>
                      <button className="flex-1 py-2 bg-gold text-black hover:bg-white rounded-lg text-xs font-bold transition-colors">
                        Hire Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {filteredTalent.length === 0 && (
                <div className="col-span-1 md:col-span-2 xl:col-span-3 text-center py-12 text-white/40">
                  No talent found matching your criteria.
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
