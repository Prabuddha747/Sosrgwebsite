import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
import type { Section } from '../../types';
import logo from '../../assets/logo.jpg';
import {
  MotionNavigationMenu,
  MotionNavigationMenuContent,
  MotionNavigationMenuItem,
  MotionNavigationMenuList,
  MotionNavigationMenuTrigger,
} from '../ui/motion-navigation-menu';
import { HighlightItem } from '../ui/highlight';

export const Navbar = ({ activeSection, setActiveSection, theme, setTheme, language, setLanguage }: { activeSection: Section, setActiveSection: (s: Section) => void, theme: 'dark' | 'light', setTheme: (t: 'dark' | 'light') => void, language: string, setLanguage: (l: string) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  // Transparent-over-photo only makes sense on the homepage, where a
  // full-bleed dark hero sits directly under the fixed nav at scrollY 0.
  // Every other route (Bihar, Casting, Community, etc.) has plain page
  // background up top instead, so light nav-transparent text there was
  // unreadable — force solid everywhere else.
  const hasFullBleedHero = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t = {
    en: {
      network: "Network", talent: "Talent", community: "Community", ecosystem: "Ecosystem",
      business: "Business", casting: "Casting/Hiring", marketplace: "Marketplace", auction: "Auction",
      discover: "Discover", events: "Events", academy: "Academy", sosrg: "SosrG 7E",
      profile: "Profile", creatorProfile: "Creator Profile", businessProfile: "Business Profile",
      joinPremium: "Join Premium", admin: "Admin"
    },
    hi: {
      network: "नेटवर्क", talent: "प्रतिभा", community: "समुदाय", ecosystem: "पारिस्थितिकी तंत्र",
      business: "व्यापार", casting: "कास्टिंग/हायरिंग", marketplace: "बाज़ार", auction: "नीलामी",
      discover: "खोजें", events: "आयोजन", academy: "अकादमी", sosrg: "SosrG 7E",
      profile: "प्रोफ़ाइल", creatorProfile: "क्रिएटर प्रोफ़ाइल", businessProfile: "बिजनेस प्रोफ़ाइल",
      joinPremium: "प्रीमियम से जुड़ें", admin: "व्यवस्थापक"
    },
    mr: {
      network: "नेटवर्क", talent: "प्रतिभा", community: "समुदाय", ecosystem: "इकोसिस्टम",
      business: "व्यवसाय", casting: "कास्टिंग/हायरिंग", marketplace: "मार्केटप्लेस", auction: "लिलाव",
      discover: "शोधा", events: "इव्हेंट्स", academy: "अकादमी", sosrg: "SosrG 7E",
      profile: "प्रोफाइल", creatorProfile: "क्रिएटर प्रोफाइल", businessProfile: "बिझनेस प्रोफाइल",
      joinPremium: "प्रीमियम जॉईन करा", admin: "अॅडमिन"
    },
    ta: {
      network: "நெட்வொர்க்", talent: "திறமை", community: "சமூகம்", ecosystem: "சுற்றுச்சூழல்",
      business: "வணிகம்", casting: "காஸ்டிங்/நியமனம்", marketplace: "சந்தை", auction: "ஏலம்",
      discover: "கண்டுபிடி", events: "நிகழ்வுகள்", academy: "அகாடமி", sosrg: "SosrG 7E",
      profile: "சுயவிவரம்", creatorProfile: "படைப்பாளர் சுயவிவரம்", businessProfile: "வணிக சுயவிவரம்",
      joinPremium: "பிரீமியத்தில் சேரவும்", admin: "நிர்வாகி"
    },
    te: {
      network: "నెట్‌వర్క్", talent: "ప్రతిభ", community: "సంఘం", ecosystem: "పర్యావరణ వ్యవస్థ",
      business: "వ్యాపారం", casting: "కాస్టింగ్/నియామకం", marketplace: "మార్కెట్ ప్లేస్", auction: "వేలం",
      discover: "కనుగొనండి", events: "ఈవెంట్‌లు", academy: "అకాడమీ", sosrg: "SosrG 7E",
      profile: "ప్రొఫైల్", creatorProfile: "క్రియేటర్ ప్రొఫైల్", businessProfile: "వ్యాపార ప్రొఫైల్",
      joinPremium: "ప్రీమియంలో చేరండి", admin: "అడ్మిన్"
    },
    bn: {
      network: "নেটওয়ার্ক", talent: "প্রতিভা", community: "সম্প্রদায়", ecosystem: "ইকোসিস্টেম",
      business: "ব্যবসা", casting: "কাস্টিং/নিয়োগ", marketplace: "মার্কেটপ্লেস", auction: "নিলাম",
      discover: "আবিষ্কার করুন", events: "ইভেন্ট", academy: "একাডেমি", sosrg: "SosrG 7E",
      profile: "প্রোফাইল", creatorProfile: "ক্রিয়েটর প্রোফাইল", businessProfile: "বিজনেস প্রোফাইল",
      joinPremium: "প্রিমিয়ামে যোগ দিন", admin: "অ্যাডমিন"
    }
  }[language as 'en' | 'hi' | 'mr' | 'ta' | 'te' | 'bn'] || {
    network: "Network", talent: "Talent", community: "Community", ecosystem: "Ecosystem",
    business: "Business", casting: "Casting/Hiring", marketplace: "Marketplace", auction: "Auction",
    discover: "Discover", events: "Events", academy: "Academy", sosrg: "SosrG 7E",
    profile: "Profile", creatorProfile: "Creator Profile", businessProfile: "Business Profile",
    joinPremium: "Join Premium", admin: "Admin"
  };

  const navGroups = [
    {
      label: t.network,
      items: [
        { id: 'talent', label: t.talent, icon: Users },
        { id: 'community', label: t.community, icon: Globe },
        { id: 'ecosystem', label: t.ecosystem, icon: Network },
      ]
    },
    {
      label: t.business,
      items: [
        { id: 'casting', label: t.casting, icon: Video },
        { id: 'marketplace', label: t.marketplace, icon: Store },
        { id: 'auction', label: t.auction, icon: Gavel },
      ]
    },
    {
      label: t.discover,
      items: [
        { id: 'events', label: t.events, icon: Calendar },
        { id: 'academy', label: t.academy, icon: BookOpen },
        { id: 'sosrg-7e', label: t.sosrg, icon: Star },
      ]
    }
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 sm:px-6 py-3 sm:py-4",
      isScrolled || isMenuOpen || !hasFullBleedHero
        ? "nav-solid bg-cinematic-black border-b border-white/15 shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
        : "bg-transparent nav-transparent"
    )}>
      <div className="max-w-[1600px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer z-50" onClick={() => { setActiveSection('home'); setIsMenuOpen(false); }}>
          <img
            src={logo}
            alt="SosrG Logo"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-cover"
          />
          <span className="text-xl sm:text-2xl font-bold tracking-tight gold-text">SosrG</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          <MotionNavigationMenu viewportClassName="min-w-48">
            <MotionNavigationMenuList>
              {navGroups.map((group) => (
                <MotionNavigationMenuItem key={group.label} value={group.label}>
                  <MotionNavigationMenuTrigger className="text-white/60 tracking-widest uppercase">
                    {group.label}
                  </MotionNavigationMenuTrigger>
                  <MotionNavigationMenuContent>
                    <div className="flex flex-col gap-1 w-48">
                      {group.items.map((item) => (
                        <HighlightItem key={item.id}>
                          <button
                            onClick={() => setActiveSection(item.id as Section)}
                            className={cn(
                              "text-left px-3 py-2 text-sm font-medium tracking-wide transition-colors flex items-center gap-3 rounded-sm",
                              activeSection === item.id ? "text-gold" : "text-white/80"
                            )}
                          >
                            <item.icon size={16} className={activeSection === item.id ? "text-gold" : "text-white/40"} />
                            {item.label}
                          </button>
                        </HighlightItem>
                      ))}
                    </div>
                  </MotionNavigationMenuContent>
                </MotionNavigationMenuItem>
              ))}
            </MotionNavigationMenuList>
          </MotionNavigationMenu>

          <button
            onClick={() => setActiveSection('bihar-documentary')}
            className={cn(
              "text-sm font-medium tracking-widest uppercase transition-colors hover:text-gold flex items-center gap-1",
              activeSection === 'bihar-documentary' ? "text-gold" : "text-white/60"
            )}
          >
            <Film size={14} className="mb-[2px]" /> BHub
          </button>

          <button
            onClick={() => setActiveSection('profile')}
            className={cn(
              "text-sm font-medium tracking-widest uppercase transition-colors hover:text-gold flex items-center gap-1",
              activeSection === 'profile' ? "text-gold" : "text-white/60"
            )}
          >
            <User size={14} className="mb-[2px]" /> {t.profile}
          </button>

          <div className="flex items-center gap-2 border-l border-white/20 pl-6 ml-2">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/80 hover:text-gold"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <div className="relative group">
              <button className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/80 hover:text-gold flex items-center gap-1">
                <Languages size={18} />
                <span className="text-xs font-bold uppercase">{language}</span>
              </button>
              <div className="absolute right-0 top-full mt-2 bg-cinematic-black border border-white/10 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all overflow-hidden min-w-[120px]">
                {['en', 'hi', 'mr', 'ta', 'te', 'bn'].map(lang => (
                  <button 
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={cn(
                      "w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition-colors uppercase",
                      language === lang ? "text-gold font-bold" : "text-white/80"
                    )}
                  >
                    {lang === 'en' ? 'English' : lang === 'hi' ? 'हिंदी' : lang === 'mr' ? 'मराठी' : lang === 'ta' ? 'தமிழ்' : lang === 'te' ? 'తెలుగు' : 'বাংলা'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button 
            onClick={() => setActiveSection('profile')}
            className="bg-gold text-black px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wider hover:scale-105 transition-transform ml-2"
          >
            {t.joinPremium}
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-white p-2 z-50" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-cinematic-black/95 backdrop-blur-xl border-b border-white/10 overflow-hidden lg:hidden shadow-2xl"
          >
            <div className="flex flex-col p-6 gap-4 max-h-[80vh] overflow-y-auto custom-scrollbar">
              {navGroups.map((group) => (
                <div key={group.label} className="mb-2">
                  <div className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2 px-2">{group.label}</div>
                  <div className="flex flex-col gap-1">
                    {group.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => { setActiveSection(item.id as Section); setIsMenuOpen(false); }}
                        className={cn(
                          "text-left text-base font-medium py-2 px-3 rounded-lg flex items-center gap-3 transition-colors",
                          activeSection === item.id ? "text-gold bg-white/5" : "text-white/70 hover:bg-white/5"
                        )}
                      >
                        <item.icon size={18} className={activeSection === item.id ? "text-gold" : "text-white/40"} />
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <div className="mb-2">
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => { setActiveSection('bihar-documentary'); setIsMenuOpen(false); }}
                    className={cn(
                      "text-left text-base font-medium py-2 px-3 rounded-lg flex items-center gap-3 transition-colors",
                      activeSection === 'bihar-documentary' ? "text-gold bg-white/5" : "text-white/70 hover:bg-white/5"
                    )}
                  >
                    <Film size={18} className={activeSection === 'bihar-documentary' ? "text-gold" : "text-white/40"} />
                    BHub
                  </button>
                </div>
              </div>

              <div className="mb-2">
                <div className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2 px-2">{t.profile}</div>
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => { setActiveSection('profile'); setIsMenuOpen(false); }}
                    className={cn(
                      "text-left text-base font-medium py-2 px-3 rounded-lg flex items-center gap-3 transition-colors",
                      activeSection === 'profile' ? "text-gold bg-white/5" : "text-white/70 hover:bg-white/5"
                    )}
                  >
                    <User size={18} className={activeSection === 'profile' ? "text-gold" : "text-white/40"} />
                    {t.profile}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between py-4 border-b border-white/5">
                <span className="text-white/60 font-medium">Theme</span>
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors text-white"
                >
                  {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>

              <div className="py-2 border-b border-white/5">
                <span className="text-white/60 font-medium block mb-3">Language</span>
                <div className="flex flex-wrap gap-2">
                  {['en', 'hi', 'mr', 'ta', 'te', 'bn'].map(lang => (
                    <button 
                      key={lang}
                      onClick={() => { setLanguage(lang); setIsMenuOpen(false); }}
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-bold uppercase transition-colors border",
                        language === lang ? "bg-gold text-black border-gold" : "bg-transparent text-white/60 border-white/20 hover:border-white/40"
                      )}
                    >
                      {lang === 'en' ? 'EN' : lang === 'hi' ? 'HI' : lang === 'mr' ? 'MR' : lang === 'ta' ? 'TA' : lang === 'te' ? 'TE' : 'BN'}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => { setActiveSection('profile'); setIsMenuOpen(false); }}
                className="bg-gold text-black mt-4 px-6 py-4 rounded-xl font-bold text-sm uppercase tracking-wider text-center flex items-center justify-center gap-2"
              >
                <Star size={16} /> Join Premium
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
