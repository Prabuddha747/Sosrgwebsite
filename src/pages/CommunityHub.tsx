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
import { ApiError } from '../services/httpClient';
import { communityService, CONTENT_SHARE_INDUSTRIES } from '../services/community';
import type { ContentShare, ContentShareIndustry } from '../services/community';
import { ContentShareFeedItem } from '../components/community/ContentShareFeedItem';
import { ContentShareComposer } from '../components/community/ContentShareComposer';

export const CommunityHub = () => {
  const [activeTab, setActiveTab] = useState<'sharing' | 'forum' | 'news'>('sharing');

  const [industryFilter, setIndustryFilter] = useState<ContentShareIndustry | 'All'>('All');
  const [feed, setFeed] = useState<ContentShare[] | null>(null);
  const [feedLoading, setFeedLoading] = useState(true);
  const [feedError, setFeedError] = useState<string>();

  useEffect(() => {
    if (activeTab !== 'sharing') return;
    let cancelled = false;
    setFeedLoading(true);
    setFeedError(undefined);
    communityService
      .getFeed(industryFilter === 'All' ? {} : { industry: industryFilter })
      .then((items) => {
        if (!cancelled) setFeed(items);
      })
      .catch((err) => {
        if (!cancelled) setFeedError(err instanceof ApiError ? err.message : 'Could not load the feed.');
      })
      .finally(() => {
        if (!cancelled) setFeedLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [activeTab, industryFilter]);

  return (
    <div className="pt-32 px-6 w-full max-w-[1600px] mx-auto min-h-screen pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">Creative <span className="gold-text">Community</span></h1>
          <p className="text-white/50">Where the 7 Core Creative Sectors connect, share work, and stay in the loop — together.</p>
        </div>
        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 overflow-x-auto no-scrollbar w-full md:w-auto">
          {[
            { id: 'sharing', label: 'Content Sharing', icon: Share2 },
            { id: 'forum', label: 'Forum', icon: MessageCircle },
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
        {activeTab === 'sharing' && (
          <motion.div
            key="sharing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
              <div className="flex items-center gap-2">
                <Share2 size={24} className="text-gold" />
                <h2 className="text-3xl font-bold">Content Sharing</h2>
              </div>
              <ContentShareComposer
                onCreated={(share) => setFeed((prev) => [share, ...(prev ?? [])])}
              />
            </div>
            <p className="text-white/60 max-w-3xl mb-6">
              Paste a YouTube link and it shows up here for the whole community to scroll through —
              tag it with your industry, or browse everyone's together.
            </p>

            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
              {(['All', ...CONTENT_SHARE_INDUSTRIES] as const).map((ind) => (
                <button
                  key={ind}
                  onClick={() => setIndustryFilter(ind)}
                  className={cn(
                    'px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors border',
                    industryFilter === ind
                      ? 'bg-gold border-gold text-black'
                      : 'bg-white/5 border-white/10 text-white/60 hover:text-white',
                  )}
                >
                  {ind}
                </button>
              ))}
            </div>

            {feedLoading && (
              <div className="max-w-sm mx-auto aspect-[9/16] rounded-2xl bg-white/5 animate-pulse" />
            )}

            {!feedLoading && feedError && (
              <div className="glass-panel p-8 text-center text-sm text-white/60">{feedError}</div>
            )}

            {!feedLoading && !feedError && (feed?.length ?? 0) === 0 && (
              <div className="glass-panel p-8 text-center text-sm text-white/60">
                Nothing shared {industryFilter === 'All' ? 'yet' : `in ${industryFilter} yet`} — be the first to post a clip.
              </div>
            )}

            {!feedLoading && !feedError && feed && feed.length > 0 && (
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {feed.map((share) => (
                    <ContentShareFeedItem key={share.id} share={share} />
                  ))}
                </div>

                <div className="flex flex-col items-center gap-3 py-10 text-center">
                  <CheckCircle2 size={28} className="text-gold" />
                  <p className="font-bold">You're all caught up</p>
                  <p className="text-sm text-white/40 max-w-xs">
                    That's every clip {industryFilter === 'All' ? '' : `in ${industryFilter} `}for now — come back later for new updates.
                  </p>
                  <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="flex items-center gap-2 mt-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-bold uppercase tracking-widest transition-colors"
                  >
                    <ArrowUp size={14} /> Back to top
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'forum' && (
          <motion.div
            key="forum"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2 mb-2">
              <MessageCircle size={24} className="text-gold" />
              <h2 className="text-3xl font-bold">Forum — Visit Our App</h2>
            </div>
            <p className="text-white/60 max-w-3xl mb-6">
              An open public feed for the whole community — post a short update or question, and
              anyone can reply, the way a public timeline works. Not the same as Content Sharing's
              longer posts above: this is for quick, open discussion.
            </p>
          </motion.div>
        )}

        {activeTab === 'news' && (
          <motion.div
            key="news"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2 mb-2">
              <Newspaper size={24} className="text-gold" />
              <h2 className="text-3xl font-bold">Industry News — Visit Our App</h2>
            </div>
            <p className="text-white/60 max-w-3xl mb-6">
              Curated news, announcements, and trending topics from across Bihar's creative
              industry — casting updates, festival announcements, grants, and policy changes — with
              a newsletter you can subscribe to so it lands straight in your inbox.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Dynamic Background ---
