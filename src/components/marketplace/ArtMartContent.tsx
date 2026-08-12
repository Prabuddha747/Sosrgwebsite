import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Film,
  Theater,
  PenTool,
  Music,
  User,
  Search,
  ShieldCheck,
  FileText,
  LayoutDashboard,
  Star,
  ChevronRight,
  Play,
  Mic,
  Video,
  Menu,
  Zap,
  Lock,
  Globe,
  Award,
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
import { ScaffoldRow, ComingSoonTag } from '../ScaffoldUI';

export const ArtMartContent = () => {
  const [activeTab, setActiveTab] = useState<'browse' | 'sell' | 'custom-orders' | 'wishlist'>('browse');
  const [category, setCategory] = useState('All Items');

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
              <div className="relative glass-panel p-6">
                <ComingSoonTag />
                <h3 className="font-bold mb-4 uppercase tracking-widest text-xs">AI Recommendations</h3>
                <p className="text-[10px] text-white/40 mb-4">Based on your profile, you might need:</p>
                <ScaffoldRow className="h-14" />
              </div>
            </div>
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold mb-6">Browse — Visit Our App</h2>
              {/* No live Art Mart listings API yet (doc/API_REQUIREMENTS.md)
                  — cards are shimmer placeholders rather than the invented
                  product catalogue this page used to show as if it were real. */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="relative glass-panel overflow-hidden flex flex-col">
                    <ComingSoonTag />
                    <ScaffoldRow className="aspect-square" />
                    <div className="p-4 flex flex-col flex-1 gap-2">
                      <ScaffoldRow className="h-4 w-2/3" />
                      <ScaffoldRow className="h-3 w-1/3" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'sell' && (
          <motion.div key="sell" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <div className="flex items-center gap-2 mb-2">
              <Plus size={24} className="text-gold" />
              <h2 className="text-3xl font-bold">List Product or Artwork — Visit Our App</h2>
            </div>
            <p className="text-white/60 max-w-3xl mb-6">List a product or artwork for sale, with AI pricing suggestions based on real market demand and recent sales in your category.</p>
          </motion.div>
        )}

        {activeTab === 'custom-orders' && (
          <motion.div key="custom-orders" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <div className="flex items-center gap-2 mb-2">
              <Briefcase size={24} className="text-gold" />
              <h2 className="text-3xl font-bold">Custom Orders & Commissions — Visit Our App</h2>
            </div>
            <p className="text-white/60 max-w-3xl mb-6">Manage your custom artwork commissions, with secure payments — 30% advance and milestone-based releases.</p>
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
            <div className="relative lg:col-span-2 glass-panel p-8">
              <ComingSoonTag />
              <div className="flex items-center gap-2 mb-6">
                <Heart size={20} className="text-crimson" />
                <h2 className="text-3xl font-bold">My Wishlist</h2>
              </div>
              {/* <div className="space-y-4">
                {[0, 1].map((i) => (
                  <ScaffoldRow key={i} className="h-20" />
                ))}
              </div> */}
            </div>

            <div className="relative lg:col-span-1 glass-panel p-8 border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-transparent">
              <ComingSoonTag />
              <div className="flex items-center gap-2 mb-6">
                <Share2 size={20} className="text-blue-400" />
                <h2 className="text-2xl font-bold">Refer & Earn</h2>
              </div>
              <p className="text-sm text-white/60 mb-6">Share product links with your network. When someone buys through your link, you both get a discount!</p>

              <div className="space-y-2">
                <div className="text-xs font-bold mb-2">Your Referral Stats</div>
                {['Links Shared', 'Successful Purchases', 'Discounts Earned'].map((label) => (
                  <div key={label} className="flex justify-between items-center text-sm p-2 bg-white/5 rounded">
                    <span className="text-white/60">{label}</span>
                    {/* <ScaffoldRow className="h-4 w-10" /> */}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
