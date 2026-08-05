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
import { ArtMartContent } from '../components/marketplace/ArtMartContent';

export const Marketplace = () => {
  const [activeTab, setActiveTab] = useState<'assets' | 'gigs' | 'collaborations' | 'licensing' | 'art-mart'>('art-mart');
  const [selectedSector, setSelectedSector] = useState('All');
  const [showPostModal, setShowPostModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const SECTORS = ['All', 'Cinema', 'Theatre', 'Literature', 'Music', 'Dance', 'Art & Design', 'Crafts'];

  const ORIGINAL_ITEMS = [
    { title: 'Feature Film Script', type: 'Literature', price: '₹5,00,000', status: 'Available', desc: 'A high-quality asset ready for production and distribution.' },
    { title: 'Background Score for Thriller', type: 'Music', price: '₹1,20,000', status: 'Bidding', desc: 'A high-quality asset ready for production and distribution.' },
    { title: 'Theatre Production Rights', type: 'Theatre', price: '₹80,000', status: 'Available', desc: 'A high-quality asset ready for production and distribution.' },
    { title: 'Costume Design for Period Drama', type: 'Art & Design', price: '₹2,50,000', status: 'Active', desc: 'A high-quality asset ready for production and distribution.' },
  ];

  const filteredItems = selectedSector === 'All' ? ORIGINAL_ITEMS : ORIGINAL_ITEMS.filter(item => item.type === selectedSector);

  return (
    <div className="pt-32 px-6 max-w-7xl mx-auto min-h-screen pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif italic mb-2">The <span className="vibrant-text-4">Marketplace</span></h1>
          <p className="text-white/50">Buy, sell, and collaborate across the 7 Core Creative Sectors.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <button 
            onClick={() => setShowFilterModal(true)}
            className="bg-white/5 border border-white/10 px-6 py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
          >
            <Filter size={16} /> Filters
          </button>
          <button 
            onClick={() => setShowPostModal(true)}
            className="bg-gold text-black px-6 py-2 rounded-xl text-sm font-bold w-full sm:w-auto hover:bg-white transition-colors"
          >
            Post a Project
          </button>
        </div>
      </div>

      <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 overflow-x-auto no-scrollbar mb-8">
        {[
          { id: 'art-mart', label: 'Art Mart', icon: ShoppingBag },
          { id: 'assets', label: 'Assets & IPs', icon: Store },
          { id: 'gigs', label: 'Gigs & Freelance', icon: Briefcase },
          { id: 'collaborations', label: 'Collaborations', icon: Users },
          { id: 'licensing', label: 'Licensing', icon: FileCheck },
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

      {activeTab !== 'art-mart' && (
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-8 pb-2">
          {SECTORS.map(sector => (
            <button 
              key={sector}
              onClick={() => setSelectedSector(sector)}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border",
                selectedSector === sector ? "bg-white text-black border-white" : "bg-transparent text-white/60 border-white/10 hover:border-white/30"
              )}
            >
              {sector}
            </button>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {activeTab === 'art-mart' && (
          <motion.div
            key="art-mart"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <ArtMartContent />
          </motion.div>
        )}

        {activeTab === 'assets' && (
          <motion.div
            key="assets"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {filteredItems.map((item, i) => (
              <div 
                key={i} 
                onClick={() => setSelectedItem(item)}
                className="glass-panel p-8 flex justify-between items-start group hover:border-gold/30 transition-colors cursor-pointer"
              >
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-gold mb-2 block">{item.type}</span>
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-white/40 text-sm mb-4">{item.desc}</p>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-emerald-400 font-bold">{item.price}</span>
                    <span className={cn(
                      "text-xs px-2 py-1 rounded font-bold uppercase tracking-widest",
                      item.status === 'Available' ? "bg-emerald-500/20 text-emerald-400" : 
                      item.status === 'Bidding' ? "bg-blue-500/20 text-blue-400" : "bg-gold/20 text-gold"
                    )}>{item.status}</span>
                  </div>
                </div>
                <button className="p-3 rounded-full bg-white/5 group-hover:bg-gold group-hover:text-black transition-colors shrink-0">
                  <ChevronRight size={20} />
                </button>
              </div>
            ))}
            {filteredItems.length === 0 && (
              <div className="col-span-1 md:col-span-2 text-center py-12 text-white/40">
                No assets found for this sector.
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'gigs' && (
          <motion.div
            key="gigs"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {[
              { title: 'Lead Actor for Indie Feature', sector: 'Cinema', budget: '₹50,000 - ₹1,00,000', deadline: '15 Oct 2025', applicants: 45 },
              { title: 'Choreographer for Music Video', sector: 'Dance', budget: '₹30,000', deadline: '20 Oct 2025', applicants: 12 },
              { title: 'Set Designer for Stage Play', sector: 'Theatre', budget: '₹75,000', deadline: '05 Nov 2025', applicants: 8 },
            ].filter(item => selectedSector === 'All' || item.sector === selectedSector).map((gig, i) => (
              <div key={i} className="glass-panel p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:border-white/30 transition-colors cursor-pointer">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] uppercase tracking-widest text-blue-400 bg-blue-500/10 px-2 py-1 rounded">{gig.sector}</span>
                    <span className="text-[10px] text-white/40 flex items-center gap-1"><Clock size={12} /> Ends {gig.deadline}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{gig.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-white/60">
                    <span className="flex items-center gap-1"><Wallet size={14} /> {gig.budget}</span>
                    <span className="flex items-center gap-1"><Users size={14} /> {gig.applicants} Applicants</span>
                  </div>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); showToast('Application submitted successfully!'); }}
                  className="w-full md:w-auto px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold transition-colors"
                >
                  Apply Now
                </button>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'collaborations' && (
          <motion.div
            key="collaborations"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { title: 'Sci-Fi Short Film', lookingFor: ['VFX Artist', 'Sound Designer'], sector: 'Cinema', type: 'Revenue Share' },
              { title: 'Experimental Dance Video', lookingFor: ['Cinematographer', 'Editor'], sector: 'Dance', type: 'Passion Project' },
              { title: 'Folk Music Fusion Album', lookingFor: ['Flutist', 'Percussionist'], sector: 'Music', type: 'Equal Split' },
            ].filter(item => selectedSector === 'All' || item.sector === selectedSector).map((collab, i) => (
              <div key={i} className="glass-panel p-6 flex flex-col h-full hover:-translate-y-1 transition-transform cursor-pointer">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">{collab.sector}</span>
                  <span className="text-[10px] font-bold text-white/60 bg-white/10 px-2 py-1 rounded">{collab.type}</span>
                </div>
                <h3 className="text-lg font-bold mb-4 flex-1">{collab.title}</h3>
                <div className="space-y-2 mb-6">
                  <div className="text-[10px] uppercase tracking-widest text-white/40">Looking For:</div>
                  <div className="flex flex-wrap gap-2">
                    {collab.lookingFor.map((role, j) => (
                      <span key={j} className="text-xs bg-black/50 px-2 py-1 rounded text-white/80">{role}</span>
                    ))}
                  </div>
                </div>
                <button 
                  onClick={() => showToast('Connection request sent!')}
                  className="w-full py-2 border border-white/20 hover:bg-white hover:text-black rounded-lg text-xs font-bold transition-colors"
                >
                  Connect
                </button>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'licensing' && (
          <motion.div
            key="licensing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="glass-panel p-6 bg-gradient-to-r from-gold/10 to-transparent border-gold/20 mb-8">
              <div className="flex items-center gap-3 mb-2">
                <ShieldCheck size={24} className="text-gold" />
                <h2 className="text-xl font-bold">Secure IP Licensing</h2>
              </div>
              <p className="text-sm text-white/60">Buy and sell intellectual property rights with Smart Contracts. Automated royalty splits and legal documentation included.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: 'Remake Rights: "The Last Train"', type: 'Literature', price: '₹15,00,000', terms: 'Exclusive, 5 Years', royalty: '5% Box Office' },
                { title: 'Sync License: "Monsoon Melody"', type: 'Music', price: '₹50,000', terms: 'Non-Exclusive, Perpetual', royalty: 'None' },
              ].filter(item => selectedSector === 'All' || item.type === selectedSector).map((license, i) => (
                <div key={i} className="glass-panel p-6 hover:border-gold/30 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] uppercase tracking-widest text-gold">{license.type}</span>
                    <span className="font-mono text-emerald-400 font-bold">{license.price}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4">{license.title}</h3>
                  <div className="space-y-2 mb-6 bg-black/30 p-4 rounded-lg">
                    <div className="flex justify-between text-xs">
                      <span className="text-white/40">Terms</span>
                      <span className="font-bold">{license.terms}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-white/40">Royalty</span>
                      <span className="font-bold">{license.royalty}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => showToast('License acquisition initiated. Redirecting to Smart Contract...')}
                    className="w-full py-3 bg-gold text-black rounded-xl text-sm font-bold hover:bg-white transition-colors"
                  >
                    Acquire License
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 right-8 bg-emerald-500 text-white px-6 py-3 rounded-xl shadow-2xl z-50 flex items-center gap-3 font-bold"
          >
            <CheckCircle2 size={20} />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Post Project Modal */}
      <AnimatePresence>
        {showPostModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowPostModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-cinematic-gray border border-white/10 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Post a Project / Listing</h2>
                <button onClick={() => setShowPostModal(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setShowPostModal(false); showToast('Listing created successfully!'); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs text-white/40 block mb-2 uppercase tracking-widest">Listing Type</label>
                    <select className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-gold">
                      <option>Asset & IP</option>
                      <option>Gig / Freelance Job</option>
                      <option>Collaboration Request</option>
                      <option>Licensing Offer</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-white/40 block mb-2 uppercase tracking-widest">Sector</label>
                    <select className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-gold">
                      {SECTORS.filter(s => s !== 'All').map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="text-xs text-white/40 block mb-2 uppercase tracking-widest">Title</label>
                  <input required type="text" placeholder="e.g., Feature Film Script" className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-gold" />
                </div>
                
                <div>
                  <label className="text-xs text-white/40 block mb-2 uppercase tracking-widest">Description</label>
                  <textarea required placeholder="Describe your listing in detail..." className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-sm h-32 resize-none focus:outline-none focus:border-gold" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs text-white/40 block mb-2 uppercase tracking-widest">Budget / Price (₹)</label>
                    <input type="text" placeholder="e.g., 50,000" className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-gold" />
                  </div>
                  <div>
                    <label className="text-xs text-white/40 block mb-2 uppercase tracking-widest">Deadline / Expiry</label>
                    <input type="date" className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-gold" />
                  </div>
                </div>
                
                <button type="submit" className="w-full bg-gold text-black py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-white transition-colors mt-4">
                  Publish Listing
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter Modal */}
      <AnimatePresence>
        {showFilterModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowFilterModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-cinematic-gray border border-white/10 rounded-2xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Advanced Filters</h2>
                <button onClick={() => setShowFilterModal(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="text-xs text-white/40 block mb-3 uppercase tracking-widest">Price Range</label>
                  <div className="flex gap-4">
                    <input type="number" placeholder="Min ₹" className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-gold" />
                    <input type="number" placeholder="Max ₹" className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-gold" />
                  </div>
                </div>
                
                <div>
                  <label className="text-xs text-white/40 block mb-3 uppercase tracking-widest">Status</label>
                  <div className="flex flex-wrap gap-2">
                    {['Available', 'Bidding', 'Active', 'Closed'].map(status => (
                      <button key={status} className="px-4 py-2 rounded-full border border-white/20 text-sm hover:border-gold hover:text-gold transition-colors">
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="text-xs text-white/40 block mb-3 uppercase tracking-widest">Sort By</label>
                  <select className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-gold">
                    <option>Newest First</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Most Popular</option>
                  </select>
                </div>
                
                <div className="flex gap-4 pt-4">
                  <button onClick={() => setShowFilterModal(false)} className="flex-1 py-3 border border-white/20 rounded-xl font-bold hover:bg-white/5 transition-colors">
                    Clear
                  </button>
                  <button onClick={() => { setShowFilterModal(false); showToast('Filters applied!'); }} className="flex-1 py-3 bg-gold text-black rounded-xl font-bold hover:bg-white transition-colors">
                    Apply Filters
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Item Details Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-cinematic-gray border border-white/10 rounded-2xl p-8 max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-gold mb-2 block">{selectedItem.type}</span>
                  <h2 className="text-3xl font-bold mb-2">{selectedItem.title}</h2>
                  <span className={cn(
                    "text-xs px-2 py-1 rounded font-bold uppercase tracking-widest inline-block",
                    selectedItem.status === 'Available' ? "bg-emerald-500/20 text-emerald-400" : 
                    selectedItem.status === 'Bidding' ? "bg-blue-500/20 text-blue-400" : "bg-gold/20 text-gold"
                  )}>{selectedItem.status}</span>
                </div>
                <button onClick={() => setSelectedItem(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <div className="bg-black/30 p-6 rounded-xl mb-6 border border-white/5">
                <p className="text-white/80 leading-relaxed mb-6">{selectedItem.desc}</p>
                <div className="flex items-center justify-between border-t border-white/10 pt-6">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Asking Price</div>
                    <div className="font-mono text-2xl text-emerald-400 font-bold">{selectedItem.price}</div>
                  </div>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => { showToast('Added to wishlist!'); setSelectedItem(null); }}
                      className="p-3 rounded-xl border border-white/20 hover:bg-white/10 transition-colors"
                    >
                      <Heart size={20} />
                    </button>
                    <button 
                      onClick={() => { showToast('Purchase initiated!'); setSelectedItem(null); }}
                      className="px-8 py-3 bg-gold text-black rounded-xl font-bold hover:bg-white transition-colors"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button className="flex-1 py-3 border border-white/20 rounded-xl text-sm font-bold hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
                  <MessageCircle size={16} /> Contact Seller
                </button>
                <button className="flex-1 py-3 border border-white/20 rounded-xl text-sm font-bold hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
                  <Share2 size={16} /> Share Listing
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Ecosystem Components ---
