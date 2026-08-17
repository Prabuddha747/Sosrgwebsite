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
import cameraImg from '../../assets/marketplace/camera.webp';
import studioLightImg from '../../assets/marketplace/studio-light.webp';
import shotgunMicImg from '../../assets/marketplace/shotgun-mic.webp';
import sketchbookImg from '../../assets/marketplace/sketchbook-pencils.webp';
import canvasImg from '../../assets/marketplace/canvas-painting.webp';
import drawingTabletImg from '../../assets/marketplace/drawing-tablet.webp';
import ghungrooImg from '../../assets/marketplace/ghungroo.webp';

// Mock catalogue — no live Art Mart listings API exists yet
// (doc/API_REQUIREMENTS.md), so these are illustrative sample images, not
// real inventory. "Buy Now" is intentionally a "visit our app" toast rather
// than a checkout flow — there's no live product/payment backend behind it.
export const ArtMartContent = () => {
  const [activeTab, setActiveTab] = useState<'browse' | 'sell' | 'custom-orders' | 'wishlist'>('browse');
  const [category, setCategory] = useState('All Items');
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const CATEGORIES = ['All Items', 'Cinema', 'Theatre', 'Literature', 'Music', 'Dance', 'Art & Design', 'Crafts'];

  const PRODUCTS = [
    { id: 1, name: 'Mirrorless Cinema Camera', type: 'Cinema', description: 'Full-frame body with a fast prime lens, ready for cinema-grade shoots.', image: cameraImg },
    { id: 2, name: 'Studio Softbox Light', type: 'Theatre', description: 'Umbrella softbox on an adjustable stand for even, diffused set lighting.', image: studioLightImg },
    { id: 3, name: 'Handcrafted Kathak Ghungroo', type: 'Dance', description: 'Traditional brass ghungroo strand, hand-strung for classical dance practice.', image: ghungrooImg },
    { id: 4, name: 'Shotgun Mic with Desk Stand', type: 'Music', description: 'Directional shotgun microphone with foam windscreen, for clean dialogue and voiceover.', image: shotgunMicImg },
    { id: 5, name: 'Framed Oil Painting on Canvas', type: 'Art & Design', description: 'Original textured oil painting, framed and easel-ready for display.', image: canvasImg },
    { id: 6, name: 'Graphics Drawing Tablet', type: 'Art & Design', description: 'Pen display tablet for digital illustration and concept art work.', image: drawingTabletImg },
    { id: 7, name: 'Sketchbook & Pencil Set', type: 'Art & Design', description: 'Spiral sketchbook with a graded set of graphite pencils and blending stumps.', image: sketchbookImg },
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
              {/* <div className="relative glass-panel p-6">
                <ComingSoonTag />
                <h3 className="font-bold mb-4 uppercase tracking-widest text-xs">AI Recommendations</h3>
                <p className="text-[10px] text-white/40 mb-4">Based on your profile, you might need:</p>
                <ScaffoldRow className="h-14" />
              </div> */}
            </div>
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold mb-2">Browse</h2>
    
              {filteredProducts.length === 0 && (
                <div className="glass-panel p-8 text-center text-sm text-white/60">Nothing listed in {category} yet — check back soon.</div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="relative glass-panel overflow-hidden flex flex-col h-full">
                    <div className="h-56 shrink-0 bg-white">
                      <img src={product.image} alt={product.name} className="h-full w-full object-contain" />
                    </div>
                    <div className="p-4 flex flex-col flex-1 gap-2">
                      <span className="text-[9px] uppercase tracking-widest font-bold text-gold">{product.type}</span>
                      <h4 className="font-bold text-sm leading-snug">{product.name}</h4>
                      <p className="text-xs text-white/50 flex-1">{product.description}</p>
                      <button
                        onClick={() => showToast('Please visit our app to know more about this product.')}
                        className="mt-2 flex items-center justify-center gap-2 bg-gold/10 text-gold hover:bg-gold hover:text-black px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors"
                      >
                        <ShoppingCart size={14} /> Buy Now
                      </button>
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
          <motion.div key="wishlist" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <div className="flex items-center gap-2 mb-2">
              <Heart size={24} className="text-gold" />
              <h2 className="text-3xl font-bold">Wishlist & Referrals — Visit Our App</h2>
            </div>
            <p className="text-white/60 max-w-3xl mb-6">Save listings to a wishlist, and share product links with your network — when someone buys through your link, you both get a discount.</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 right-8 bg-emerald-500 text-white px-6 py-3 rounded-xl shadow-2xl z-50 flex items-center gap-3 font-bold"
          >
            <CheckCircle size={20} />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
