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

export const ArtMartContent = () => {
  const [activeTab, setActiveTab] = useState<'browse' | 'sell' | 'custom-orders' | 'wishlist'>('browse');
  const [category, setCategory] = useState('All Items');
  const [showAIPricing, setShowAIPricing] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const CATEGORIES = ['All Items', 'Cinema', 'Theatre', 'Literature', 'Music', 'Dance', 'Art & Design', 'Crafts'];

  const PRODUCTS = [
    { id: 1, name: 'MacBook Pro M3 Max', type: 'Cinema', condition: 'New', price: '₹3,50,000', image: 'https://picsum.photos/seed/camera-mart/400/400', isDigital: false },
    { id: 2, name: 'Ergonomic Office Chair', type: 'Theatre', condition: 'Used', price: '₹8,500', image: 'https://picsum.photos/seed/light-mart/400/400', isDigital: false },
    { id: 3, name: 'Handcrafted Kathak Ghungroo', type: 'Dance', condition: 'New', price: '₹2,200', image: 'https://picsum.photos/seed/dance-mart/400/400', isDigital: false },
    { id: 4, name: 'Professional Boom Mic Set', type: 'Music', condition: 'Used', price: '₹15,000', image: 'https://picsum.photos/seed/mic-mart/400/400', isDigital: false },
    { id: 5, name: 'Abstract Oil Painting "Monsoon"', type: 'Art & Design', condition: 'New', price: '₹45,000', image: 'https://picsum.photos/seed/painting-mart/400/400', isDigital: false },
    { id: 6, name: 'Sci-Fi Concept Art Bundle', type: 'Art & Design', condition: 'Digital', price: '₹12,000', image: 'https://picsum.photos/seed/digital-mart/400/400', isDigital: true },
  ];

  const filteredProducts = category === 'All Items' ? PRODUCTS : PRODUCTS.filter(p => p.type === category);

  return (
    <div className="space-y-8">
      <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 overflow-x-auto no-scrollbar w-full">
        {[
          { id: 'browse', label: 'Browse', icon: ShoppingBag },
          { id: 'sell', label: 'Sell Item', icon: Plus },
          { id: 'custom-orders', label: 'Custom Orders', icon: Briefcase },
          { id: 'wishlist', label: 'Wishlist & Referrals', icon: Heart },
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

      <AnimatePresence mode="wait">
        {activeTab === 'browse' && (
          <motion.div
            key="browse"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-4 gap-8"
          >
            <div className="lg:col-span-1 space-y-8">
              <div className="glass-panel p-6">
                <h3 className="font-bold mb-4 uppercase tracking-widest text-xs">Categories</h3>
                <div className="space-y-2">
                  {CATEGORIES.map(cat => (
                    <button 
                      key={cat} 
                      onClick={() => setCategory(cat)}
                      className={cn(
                        "w-full text-left px-4 py-2 rounded-lg text-sm transition-all",
                        category === cat ? "bg-white/10 text-white font-bold" : "text-white/60 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div className="glass-panel p-6">
                <h3 className="font-bold mb-4 uppercase tracking-widest text-xs">AI Recommendations</h3>
                <p className="text-[10px] text-white/40 mb-4">Based on your Cinematographer profile, you might need:</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 bg-white/5 rounded-lg">
                    <div className="w-10 h-10 bg-white/10 rounded" />
                    <div>
                      <div className="text-[10px] font-bold">ND Filter Set</div>
                      <div className="text-[8px] text-emerald-400">₹4,500</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="glass-panel group overflow-hidden flex flex-col">
                    <div className="aspect-square relative shrink-0">
                      <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={product.name} referrerPolicy="no-referrer" />
                      <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md px-2 py-1 rounded text-[8px] font-bold uppercase tracking-widest">{product.condition}</div>
                      <button 
                        onClick={() => showToast('Added to wishlist!')}
                        className="absolute top-3 left-3 p-2 bg-black/50 backdrop-blur-md rounded-full text-white/60 hover:text-crimson hover:bg-white/10 transition-colors"
                      >
                        <Heart size={14} />
                      </button>
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <div className="text-[8px] uppercase tracking-widest text-gold mb-1">{product.type}</div>
                      <h3 className="font-bold text-sm mb-2">{product.name}</h3>
                      <div className="mt-auto flex items-center justify-between">
                        <span className="font-mono text-white font-bold">{product.price}</span>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => showToast('Share link copied! Share to get referral discount.')}
                            className="p-2 bg-white/5 rounded-lg hover:bg-blue-500 hover:text-white transition-all" title="Share for Referral Discount"
                          >
                            <Share2 size={14} />
                          </button>
                          <button 
                            onClick={() => showToast('Added to cart!')}
                            className="p-2 bg-white/5 rounded-lg hover:bg-gold hover:text-black transition-all"
                          >
                            <ShoppingBag size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'sell' && (
          <motion.div
            key="sell"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-3xl mx-auto glass-panel-blue p-8"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">List Product or Artwork</h2>
              <button 
                onClick={() => setShowAIPricing(!showAIPricing)}
                className="flex items-center gap-2 bg-blue-500/10 text-blue-400 border border-blue-500/30 px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-500/20 transition-colors"
              >
                <Cpu size={14} /> AI Pricing Suggestion
              </button>
            </div>

            <AnimatePresence>
              {showAIPricing && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-8 overflow-hidden"
                >
                  <div className="p-6 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                    <h4 className="font-bold text-blue-400 mb-2 flex items-center gap-2"><TrendingUp size={16} /> AI Market Analysis</h4>
                    <p className="text-xs text-white/60 mb-4">Based on current market demand and recent sales in your selected category.</p>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-black/30 p-4 rounded-lg text-center">
                        <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Suggested Price</div>
                        <div className="text-xl font-bold text-emerald-400">₹45,000</div>
                      </div>
                      <div className="bg-black/30 p-4 rounded-lg text-center">
                        <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Demand Level</div>
                        <div className="text-xl font-bold text-gold">High</div>
                      </div>
                      <div className="bg-black/30 p-4 rounded-lg text-center">
                        <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Est. Time to Sell</div>
                        <div className="text-xl font-bold text-blue-400">3-5 Days</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs text-white/40 block mb-2 uppercase tracking-widest">Product Type</label>
                  <select className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-gold">
                    {CATEGORIES.filter(c => c !== 'All Items').map(cat => (
                      <option key={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-white/40 block mb-2 uppercase tracking-widest">Product Name</label>
                  <input type="text" placeholder="e.g., Abstract Oil Painting" className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-gold" />
                </div>
              </div>
              <div>
                <label className="text-xs text-white/40 block mb-2 uppercase tracking-widest">Description</label>
                <textarea placeholder="Describe your item..." className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-sm h-32 resize-none focus:outline-none focus:border-gold" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs text-white/40 block mb-2 uppercase tracking-widest">Price (₹)</label>
                  <input type="number" placeholder="45000" className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-gold" />
                </div>
                <div>
                  <label className="text-xs text-white/40 block mb-2 uppercase tracking-widest">Upload Images/Files</label>
                  <div className="w-full bg-black/30 border border-white/10 border-dashed rounded-xl p-3 text-sm text-center text-white/40 cursor-pointer hover:bg-white/5 transition-colors">
                    Click to upload
                  </div>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => showToast('Product listed successfully!')}
                className="w-full bg-gold text-black py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-white transition-colors"
              >
                List Product
              </button>
            </form>
          </motion.div>
        )}

        {activeTab === 'custom-orders' && (
          <motion.div
            key="custom-orders"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="glass-panel p-8">
              <div className="flex items-center gap-2 mb-6">
                <Briefcase size={20} className="text-gold" />
                <h2 className="text-2xl font-bold">Custom Orders & Commissions</h2>
              </div>
              <p className="text-sm text-white/60 mb-8">Manage your custom artwork commissions. Secure payments with 30% advance and milestone-based releases.</p>
              
              <div className="space-y-6">
                {[
                  { id: 'CO-1024', title: 'Custom Portrait Painting', client: 'Rahul V.', total: '₹50,000', advance: '₹15,000 (Paid)', status: 'In Progress', progress: 45 },
                  { id: 'CO-1025', title: 'Digital Logo Design', client: 'Studio X', total: '₹20,000', advance: '₹6,000 (Pending)', status: 'Awaiting Advance', progress: 0 },
                ].map((order) => (
                  <div key={order.id} className="p-6 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-mono text-white/40 bg-black/30 px-2 py-1 rounded">{order.id}</span>
                          <span className={cn(
                            "text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded",
                            order.status === 'In Progress' ? "bg-blue-500/20 text-blue-400" : "bg-gold/20 text-gold"
                          )}>
                            {order.status}
                          </span>
                        </div>
                        <h3 className="font-bold text-lg">{order.title}</h3>
                        <p className="text-xs text-white/40">Client: {order.client}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-white/60">Total: <span className="font-bold text-white">{order.total}</span></div>
                        <div className="text-xs text-emerald-400">Advance: {order.advance}</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/40">
                        <span>Milestone Progress</span>
                        <span>{order.progress}%</span>
                      </div>
                      <div className="w-full bg-black/50 rounded-full h-2 overflow-hidden">
                        <div className="bg-gold h-full rounded-full" style={{ width: `${order.progress}%` }} />
                      </div>
                    </div>
                    
                    <div className="mt-6 flex gap-2">
                      <button 
                        onClick={() => showToast('Milestone updated!')}
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold transition-colors"
                      >
                        View Milestones
                      </button>
                      <button 
                        onClick={() => showToast('Message sent to client!')}
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold transition-colors"
                      >
                        Message Client
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'wishlist' && (
          <motion.div
            key="wishlist"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <div className="lg:col-span-2 glass-panel p-8">
              <div className="flex items-center gap-2 mb-6">
                <Heart size={20} className="text-crimson" />
                <h2 className="text-2xl font-bold">My Wishlist</h2>
              </div>
              <div className="space-y-4">
                {[PRODUCTS[0], PRODUCTS[4]].map((product) => (
                  <div key={product.id} className="flex gap-4 p-4 bg-white/5 rounded-xl border border-white/10 items-center">
                    <img src={product.image} className="w-20 h-20 rounded-lg object-cover" alt={product.name} referrerPolicy="no-referrer" />
                    <div className="flex-1">
                      <div className="text-[10px] uppercase tracking-widest text-gold mb-1">{product.type}</div>
                      <h3 className="font-bold text-sm mb-1">{product.name}</h3>
                      <div className="font-mono text-white font-bold text-sm">{product.price}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button 
                        onClick={() => showToast('Added to cart!')}
                        className="p-2 bg-gold text-black rounded-lg hover:bg-white transition-all text-xs font-bold flex items-center justify-center gap-2"
                      >
                        <ShoppingBag size={14} /> Buy
                      </button>
                      <button 
                        onClick={() => showToast('Removed from wishlist')}
                        className="p-2 bg-white/5 rounded-lg hover:bg-crimson hover:text-white transition-all text-xs font-bold flex items-center justify-center gap-2"
                      >
                        <X size={14} /> Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-1 glass-panel p-8 border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-transparent">
              <div className="flex items-center gap-2 mb-6">
                <Share2 size={20} className="text-blue-400" />
                <h2 className="text-xl font-bold">Refer & Earn</h2>
              </div>
              <p className="text-sm text-white/60 mb-6">Share product links with your network. When someone buys through your link, you both get a discount!</p>
              
              <div className="bg-black/30 p-4 rounded-xl border border-white/5 mb-6 text-center">
                <div className="text-3xl font-bold text-blue-400 mb-1">5%</div>
                <div className="text-[10px] uppercase tracking-widest text-white/40">Discount on next purchase</div>
              </div>
              
              <div className="space-y-2">
                <div className="text-xs font-bold mb-2">Your Referral Stats</div>
                <div className="flex justify-between text-sm p-2 bg-white/5 rounded">
                  <span className="text-white/60">Links Shared</span>
                  <span className="font-bold">12</span>
                </div>
                <div className="flex justify-between text-sm p-2 bg-white/5 rounded">
                  <span className="text-white/60">Successful Purchases</span>
                  <span className="font-bold text-emerald-400">3</span>
                </div>
                <div className="flex justify-between text-sm p-2 bg-white/5 rounded">
                  <span className="text-white/60">Discounts Earned</span>
                  <span className="font-bold text-gold">₹4,500</span>
                </div>
              </div>
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
    </div>
  );
};
