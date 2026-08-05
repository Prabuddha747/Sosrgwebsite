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
import { cn } from './lib/utils';
import { analyzeScript } from './services/geminiService';

// --- Types ---
type Section = 'home' | 'talent' | 'ai-tools' | 'casting' | 'auction' | 'marketplace' | 'ecosystem' | 'events' | 'profile' | 'creator-profile' | 'business-profile' | 'admin' | 'sosrg-7e' | 'academy' | 'community';
type ProfileType = 'artist' | 'buyer' | 'business' | 'casting_director';
type ExperienceLevel = 'fresher' | 'intermediate' | 'expert';

// --- Mock Data ---
const TALENT_CATEGORIES = [
  { id: 'theatre', name: 'Indian Theatre', desc: 'Connects theatre actors, directors, playwrights, and stage technicians.', icon: Theater, color: 'text-crimson', image: 'https://picsum.photos/seed/kathakali-theatre/800/600' },
  { id: 'cinema', name: 'Cinema', desc: 'Film professionals including actors, producers, cinematographers, and editors.', icon: Film, color: 'text-gold', image: 'https://picsum.photos/seed/bollywood-set/800/600' },
  { id: 'literature', name: 'Literature & Scriptwriting', desc: 'Story writers, screenwriters, dialogue writers, lyricists, adaptation experts.', icon: PenTool, color: 'text-blue-400', image: 'https://picsum.photos/seed/indian-writing/800/600' },
  { id: 'music', name: 'Music', desc: 'Singers, composers, music producers, sound engineers.', icon: Music, color: 'text-purple-400', image: 'https://picsum.photos/seed/sitar-music/800/600' },
  { id: 'dance', name: 'Dance', desc: 'Dancers, choreographers, background performers, movement directors.', icon: Star, color: 'text-emerald-400', image: 'https://picsum.photos/seed/odissi-dance/800/600' },
  { id: 'art', name: 'Art & Design', desc: 'Art directors, set designers, graphic artists, concept designers.', icon: Star, color: 'text-orange-400', image: 'https://picsum.photos/seed/madhubani-art/800/600' },
  { id: 'crafts', name: 'Craft & Traditional Arts', desc: 'Folk artists, artisans, costume craftsmen, property creators.', icon: Star, color: 'text-amber-600', image: 'https://picsum.photos/seed/indian-pottery/800/600' },
];

const FEATURED_TALENT = [
  { id: 1, name: 'SiDdhaRtha SosrG', role: 'Method Product Manager', location: 'Mumbai', rating: 4.9, image: 'https://picsum.photos/seed/indian-actor-portrait/400/500', isPremium: true, isVerified: true },
  { id: 2, name: 'Sanya Iyer', role: 'Classical Dancer', location: 'Chennai', rating: 4.8, image: 'https://picsum.photos/seed/bharatanatyam-dancer/400/500', isPremium: true, isVerified: true },
  { id: 3, name: 'Vikram Singh', role: 'Software Engineer', location: 'Delhi', rating: 5.0, image: 'https://picsum.photos/seed/indian-filmmaker/400/500', isPremium: true, isVerified: true },
  { id: 4, name: 'Priya Das', role: 'Playback Singer', location: 'Kolkata', rating: 4.7, image: 'https://picsum.photos/seed/indian-classical-singer/400/500', isPremium: true, isVerified: true },
];

// --- Components ---

const Navbar = ({ activeSection, setActiveSection, theme, setTheme, language, setLanguage }: { activeSection: Section, setActiveSection: (s: Section) => void, theme: 'dark' | 'light', setTheme: (t: 'dark' | 'light') => void, language: string, setLanguage: (l: string) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    },
    {
      label: t.profile,
      items: [
        { id: 'creator-profile', label: t.creatorProfile, icon: User },
        { id: 'business-profile', label: t.businessProfile, icon: Briefcase },
      ]
    }
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 sm:px-6 py-3 sm:py-4",
      isScrolled || isMenuOpen ? "bg-cinematic-black/95 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer z-50" onClick={() => { setActiveSection('home'); setIsMenuOpen(false); }}>
          <img 
            src="https://picsum.photos/seed/sosrg-logo/100/100" 
            alt="SosrG Logo" 
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-cover"
            referrerPolicy="no-referrer"
          />
          <span className="text-xl sm:text-2xl font-bold tracking-tight gold-text">SosrG</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          {navGroups.map((group) => (
            <div key={group.label} className="relative group">
              <button className="text-sm font-medium tracking-widest uppercase transition-colors text-white/60 hover:text-gold flex items-center gap-1 py-2">
                {group.label}
                <ChevronDown size={14} className="opacity-50 group-hover:opacity-100 transition-opacity" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-cinematic-black/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all overflow-hidden flex flex-col py-2">
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id as Section)}
                    className={cn(
                      "text-left px-4 py-2 text-sm font-medium tracking-wide transition-colors flex items-center gap-3 hover:bg-white/10",
                      activeSection === item.id ? "text-gold bg-white/5" : "text-white/80"
                    )}
                  >
                    <item.icon size={16} className={activeSection === item.id ? "text-gold" : "text-white/40"} />
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <button
            onClick={() => setActiveSection('admin')}
            className={cn(
              "text-sm font-medium tracking-widest uppercase transition-colors hover:text-gold flex items-center gap-1",
              activeSection === 'admin' ? "text-gold" : "text-white/60"
            )}
          >
            <Lock size={14} className="mb-[2px]" /> {t.admin}
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
                <div className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2 px-2">System</div>
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => { setActiveSection('admin'); setIsMenuOpen(false); }}
                    className={cn(
                      "text-left text-base font-medium py-2 px-3 rounded-lg flex items-center gap-3 transition-colors",
                      activeSection === 'admin' ? "text-gold bg-white/5" : "text-white/70 hover:bg-white/5"
                    )}
                  >
                    <Lock size={18} className={activeSection === 'admin' ? "text-gold" : "text-white/40"} />
                    Admin
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

const Hero = ({ setActiveSection, language }: { setActiveSection: (s: Section) => void, language: string }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMessage, setSearchMessage] = useState('');

  const t = {
    en: {
      badge: "Next-Gen Creative Ecosystem • AI-Powered Talent Matching • Blockchain IP Protection",
      searchPlaceholder: "Search Profile, nearest CP, artist, art tools, equipment...",
      searchBtn: "Search",
      title1: "One Unified Ecosystem for",
      titleHighlight: "Tech, Business & Professional Services.",
      subtitle: "The premium AI-driven national-level creative infrastructure empowering artists, writers, and creators to bridge grassroots talent with global entertainment markets.",
      joinTalent: "Join as Talent",
      hireTalent: "Hire Talent",
      exploreProjects: "Explore Projects",
      stat1: "Verified Artists",
      stat2: "AI Matches",
      stat3: "Projects Funded",
      stat4: "Regional Hubs"
    },
    hi: {
      badge: "नेक्स्ट-जेन क्रिएटिव इकोसिस्टम • एआई-पावर्ड टैलेंट मैचिंग • ब्लॉकचेन आईपी प्रोटेक्शन",
      searchPlaceholder: "प्रोफ़ाइल, निकटतम सीपी, कलाकार, कला उपकरण, उपकरण खोजें...",
      searchBtn: "खोजें",
      title1: "के लिए एक एकीकृत पारिस्थितिकी तंत्र",
      titleHighlight: "तकनीक, व्यवसाय और व्यावसायिक सेवाएँ।",
      subtitle: "प्रीमियम एआई-संचालित राष्ट्रीय स्तर का रचनात्मक बुनियादी ढांचा जो कलाकारों, लेखकों और रचनाकारों को वैश्विक मनोरंजन बाजारों के साथ जमीनी स्तर की प्रतिभा को जोड़ने के लिए सशक्त बनाता है।",
      joinTalent: "टैलेंट के रूप में जुड़ें",
      hireTalent: "टैलेंट हायर करें",
      exploreProjects: "प्रोजेक्ट एक्सप्लोर करें",
      stat1: "सत्यापित कलाकार",
      stat2: "एआई मैच",
      stat3: "वित्त पोषित परियोजनाएं",
      stat4: "क्षेत्रीय हब"
    },
    mr: {
      badge: "नेक्स्ट-जेन क्रिएटिव इकोसिस्टम • एआय-पॉवर्ड टॅलेंट मॅचिंग • ब्लॉकचेन आयपी प्रोटेक्शन",
      searchPlaceholder: "प्रोफाइल, जवळचा सीपी, कलाकार, कला साधने, उपकरणे शोधा...",
      searchBtn: "शोधा",
      title1: "साठी एक एकीकृत इकोसिस्टम",
      titleHighlight: "तंत्रज्ञान, व्यवसाय आणि व्यावसायिक सेवा.",
      subtitle: "प्रीमियम एआय-चालित राष्ट्रीय स्तरावरील रचनात्मक पायाभूत सुविधा जे कलाकार, लेखक आणि निर्मात्यांना जागतिक मनोरंजन बाजारांशी जोडण्यासाठी सक्षम करते.",
      joinTalent: "टॅलेंट म्हणून सामील व्हा",
      hireTalent: "टॅलेंट हायर करा",
      exploreProjects: "प्रोजेक्ट एक्सप्लोर करा",
      stat1: "सत्यापित कलाकार",
      stat2: "एआय मॅचेस",
      stat3: "निधी प्राप्त प्रकल्प",
      stat4: "प्रादेशिक हब"
    },
    ta: {
      badge: "அடுத்த தலைமுறை படைப்பு சுற்றுச்சூழல் • AI-இயங்கும் திறமை பொருத்தம் • பிளாக்செயின் IP பாதுகாப்பு",
      searchPlaceholder: "சுயவிவரம், அருகிலுள்ள CP, கலைஞர், கலை கருவிகள், உபகரணங்கள் தேடு...",
      searchBtn: "தேடு",
      title1: "ஒரு ஒருங்கிணைந்த சுற்றுச்சூழல்",
      titleHighlight: "தொழில்நுட்பம், வணிகம் மற்றும் தொழில்முறை சேவைகள்.",
      subtitle: "கலைஞர்கள், எழுத்தாளர்கள் மற்றும் படைப்பாளர்களை உலகளாவிய பொழுதுபோக்கு சந்தைகளுடன் இணைக்க அதிகாரமளிக்கும் பிரீமியம் AI-உந்துதல் தேசிய அளவிலான படைப்பு உள்கட்டமைப்பு.",
      joinTalent: "திறமையாக சேரவும்",
      hireTalent: "திறமையை நியமிக்கவும்",
      exploreProjects: "திட்டங்களை ஆராயுங்கள்",
      stat1: "சரிபார்க்கப்பட்ட கலைஞர்கள்",
      stat2: "AI பொருத்தங்கள்",
      stat3: "நிதியளிக்கப்பட்ட திட்டங்கள்",
      stat4: "பிராந்திய மையங்கள்"
    },
    te: {
      badge: "నెక్స్ట్-జెన్ క్రియేటివ్ ఎకోసిస్టమ్ • AI-పవర్డ్ టాలెంట్ మ్యాచింగ్ • బ్లాక్‌చెయిన్ IP ప్రొటెక్షన్",
      searchPlaceholder: "ప్రొఫైల్, సమీప CP, కళాకారుడు, కళా సాధనాలు, పరికరాలు శోధించండి...",
      searchBtn: "శోధించండి",
      title1: "కోసం ఒక ఏకీకృత పర్యావరణ వ్యవస్థ",
      titleHighlight: "టెక్, వ్యాపారం & వృత్తిపరమైన సేవలు.",
      subtitle: "కళాకారులు, రచయితలు మరియు సృష్టికర్తలను ప్రపంచ వినోద మార్కెట్‌లతో అనుసంధానించడానికి శక్తివంతం చేసే ప్రీమియం AI-ఆధారిత జాతీయ స్థాయి సృజనాత్మక మౌలిక సదుపాయాలు.",
      joinTalent: "టాలెంట్‌గా చేరండి",
      hireTalent: "టాలెంట్‌ను నియమించుకోండి",
      exploreProjects: "ప్రాజెక్ట్‌లను అన్వేషించండి",
      stat1: "ధృవీకరించబడిన కళాకారులు",
      stat2: "AI మ్యాచ్‌లు",
      stat3: "నిధులు పొందిన ప్రాజెక్ట్‌లు",
      stat4: "ప్రాంతీయ కేంద్రాలు"
    },
    bn: {
      badge: "নেক্সট-জেন ক্রিয়েটিভ ইকোসিস্টেম • এআই-পাওয়ার্ড ট্যালেন্ট ম্যাচিং • ব্লকচেইন আইপি প্রোটেকশন",
      searchPlaceholder: "প্রোফাইল, নিকটতম সিপি, শিল্পী, শিল্প সরঞ্জাম, সরঞ্জাম অনুসন্ধান করুন...",
      searchBtn: "অনুসন্ধান",
      title1: "এর জন্য একটি একীভূত ইকোসিস্টেম",
      titleHighlight: "প্রযুক্তি, ব্যবসা এবং পেশাদার পরিষেবা।",
      subtitle: "প্রিমিয়াম এআই-চালিত জাতীয় স্তরের সৃজনশীল পরিকাঠামো যা শিল্পী, লেখক এবং নির্মাতাদের বিশ্বব্যাপী বিনোদন বাজারের সাথে যুক্ত করতে ক্ষমতায়ন করে।",
      joinTalent: "ট্যালেন্ট হিসেবে যোগ দিন",
      hireTalent: "ট্যালেন্ট নিয়োগ করুন",
      exploreProjects: "প্রকল্প অন্বেষণ করুন",
      stat1: "যাচাইকৃত শিল্পী",
      stat2: "এআই ম্যাচ",
      stat3: "অর্থায়িত প্রকল্প",
      stat4: "আঞ্চলিক হাব"
    }
  }[language as 'en' | 'hi' | 'mr' | 'ta' | 'te' | 'bn'] || {
    badge: "Next-Gen Creative Ecosystem • AI-Powered Talent Matching • Blockchain IP Protection",
    searchPlaceholder: "Search Profile, nearest CP, artist, art tools, equipment...",
    searchBtn: "Search",
    title1: "One Unified Ecosystem for",
    titleHighlight: "Tech, Business & Professional Services.",
    subtitle: "The premium AI-driven national-level creative infrastructure empowering artists, writers, and creators to bridge grassroots talent with global entertainment markets.",
    joinTalent: "Join as Talent",
    hireTalent: "Hire Talent",
    exploreProjects: "Explore Projects",
    stat1: "Verified Artists",
    stat2: "AI Matches",
    stat3: "Projects Funded",
    stat4: "Regional Hubs"
  };

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    const query = searchQuery.toLowerCase().trim();
    if (!query) return;

    // Expanded keywords to match almost anything on the site
    const routes = [
      { section: 'talent', keywords: ['talent', 'artist', 'actor', 'model', 'creator', 'professional', 'filter', 'casting', 'hire', 'recruit', 'profile', 'director', 'writer', 'dancer', 'singer', 'musician', 'portfolio', 'showreel', 'cinema', 'theatre', 'music', 'dance', 'art', 'crafts', 'literature'] },
      { section: 'ecosystem', keywords: ['ecosystem', 'cp', 'partner', 'pcp', 'dcp', 'scp', 'zcp', 'sp', 'franchise', 'revenue', 'grading', 'counselling', 'equipment', 'tools', 'locations', 'assets', 'props', 'costumes', 'vendor', 'business', 'academy', 'pin code', 'district', 'state', 'zonal', 'expert', 'coin', 'currency', 'commission', 'bonus', 'studio', 'hub', 'monitoring', 'dashboard', 'gender', 'ratio', 'balance', 'male', 'female', 'other'] },
      { section: 'events', keywords: ['event', 'calendar', 'festival', 'workshop', 'booking', 'showcase', 'host', 'ticket', 'mumbai', 'delhi', 'chennai', 'auditorium', 'performance'] },
      { section: 'profile', keywords: ['dashboard', 'green id', 'portfolio', 'account', 'setup', 'verification', 'verify', 'upload', 'experience', 'fresher', 'intermediate', 'expert', 'industry', 'profession', 'service'] },
      { section: 'ai-tools', keywords: ['ai', 'script', 'interview', 'evaluate', 'analyze', 'tool', 'generator', 'writer', 'feedback', 'emotion', 'delivery', 'pacing', 'score', 'breakdown', 'character', 'plot', 'dialogue'] }
    ];

    let foundSection: Section | null = null;
    
    // Split query into words for partial matching
    const queryWords = query.split(/\s+/);

    for (const route of routes) {
      // Check if any query word matches any keyword (or vice versa for partial matches)
      const isMatch = route.keywords.some(kw => 
        queryWords.some(qw => kw.includes(qw) || qw.includes(kw))
      );
      
      if (isMatch) {
        foundSection = route.section as Section;
        break;
      }
    }

    if (foundSection) {
      setActiveSection(foundSection);
      setSearchMessage('');
      setSearchQuery('');
    } else {
      setSearchMessage(`No results found for "${searchQuery}". Please try another term.`);
      setTimeout(() => setSearchMessage(''), 3000);
    }
  };

  return (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-20">
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-b from-cinematic-black/60 via-cinematic-black/20 to-cinematic-black" />
      <div className="absolute inset-0 cinematic-gradient" />
    </div>

    <div className="relative z-10 text-center px-6 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-crimson/20 border border-crimson/50 text-crimson text-[10px] font-bold uppercase tracking-[0.3em] overflow-hidden whitespace-nowrap">
            <motion.div
              animate={{ x: [0, -100, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="flex gap-8"
            >
              <span>{t.badge.split(' • ')[0]}</span>
              <span>•</span>
              <span>{t.badge.split(' • ')[1]}</span>
              <span>•</span>
              <span>{t.badge.split(' • ')[2]}</span>
            </motion.div>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="max-w-4xl mx-auto mb-12 relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-gold/20 via-crimson/20 to-gold/20 rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
          <form onSubmit={handleSearch} className="relative flex items-center bg-black/50 backdrop-blur-xl border border-white/20 rounded-full p-2 pl-4 sm:pl-6 pr-2 shadow-2xl focus-within:border-gold/50 transition-colors">
            <Search className="text-white/40 group-focus-within:text-gold transition-colors shrink-0 hidden sm:block" size={24} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full bg-transparent border-none outline-none text-white placeholder:text-white/30 px-2 sm:px-4 py-3 text-xs sm:text-sm md:text-base truncate"
            />
            <button type="submit" className="bg-gold text-black px-6 py-3 rounded-full font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform shrink-0 hidden sm:block">
              {t.searchBtn}
            </button>
            <button type="submit" className="bg-gold text-black p-3 rounded-full hover:scale-105 transition-transform shrink-0 sm:hidden">
              <Search size={16} />
            </button>
          </form>
          <AnimatePresence>
            {searchMessage && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-4 bg-black/80 backdrop-blur-md border border-crimson/50 text-white p-3 rounded-xl text-sm"
              >
                {searchMessage}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif italic mb-6 md:mb-8 leading-[1.1]">
          {t.title1} <span className="gold-text">{t.titleHighlight}</span>
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-white/60 font-light max-w-3xl mx-auto mb-10 leading-relaxed">
          {t.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <button 
            onClick={() => setActiveSection('profile')}
            className="w-full sm:w-auto bg-gold text-black px-8 py-4 rounded-full font-bold text-sm sm:text-base uppercase tracking-widest hover:scale-105 transition-transform flex items-center justify-center gap-2"
          >
            {t.joinTalent} <ChevronRight size={18} />
          </button>
          <button 
            onClick={() => setActiveSection('talent')}
            className="w-full sm:w-auto bg-white/5 backdrop-blur-md border border-white/20 px-8 py-4 rounded-full font-bold text-sm sm:text-base uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
          >
            <Users size={18} /> {t.hireTalent}
          </button>
          <button 
            onClick={() => setActiveSection('casting')}
            className="w-full sm:w-auto bg-white/5 backdrop-blur-md border border-white/20 px-8 py-4 rounded-full font-bold text-sm sm:text-base uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
          >
            <Video size={18} /> {t.exploreProjects}
          </button>
        </div>
      </motion.div>
    </div>

    {/* Floating Stats */}
    <div className="absolute bottom-10 left-0 right-0 hidden lg:flex justify-center gap-20">
      {[
        { label: t.stat1, value: '50K+' },
        { label: t.stat2, value: '1.2M' },
        { label: t.stat3, value: '800+' },
        { label: t.stat4, value: '24' },
      ].map((stat, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 + i * 0.1 }}
          className="text-center"
        >
          <div className="text-3xl font-bold gold-text">{stat.value}</div>
          <div className="text-xs uppercase tracking-widest text-white/40">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  </section>
  );
};

const DigitalEcosystemVision = () => (
  <section className="py-24 px-6 max-w-7xl mx-auto relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-crimson/5 rounded-3xl -z-10" />
    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-crimson/20 to-transparent" />
    
    <div className="text-center mb-16 relative z-10">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-gold mb-6">
        <Globe size={14} /> The Final Goal
      </div>
      <h2 className="text-4xl md:text-5xl font-serif italic mb-6">
        A Complete Digital <span className="gold-text">Ecosystem</span>
      </h2>
      <p className="text-white/60 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
        Empowering the Indian entertainment industry by helping actors, models, and creative professionals discover opportunities, build careers, collaborate on projects, and grow within the arts community.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
      {[
        { 
          icon: Search, 
          title: 'Discover Opportunities', 
          desc: 'Find casting calls, auditions, and freelance gigs tailored to your unique profile and skills.',
          color: 'text-blue-400',
          bg: 'bg-blue-400/10',
          border: 'border-blue-400/20'
        },
        { 
          icon: Award, 
          title: 'Build Careers', 
          desc: 'Showcase your portfolio, earn verified Green IDs, and level up from fresher to expert.',
          color: 'text-gold',
          bg: 'bg-gold/10',
          border: 'border-gold/20'
        },
        { 
          icon: Users, 
          title: 'Collaborate', 
          desc: 'Connect with directors, producers, and fellow artists to bring creative visions to life.',
          color: 'text-emerald-400',
          bg: 'bg-emerald-500/10',
          border: 'border-emerald-500/20'
        },
        { 
          icon: GraduationCap, 
          title: 'Grow Together', 
          desc: 'Learn through the Academy, attend industry events, and thrive in a supportive community.',
          color: 'text-crimson',
          bg: 'bg-crimson/10',
          border: 'border-crimson/20'
        }
      ].map((feature, i) => (
        <div key={i} className={cn("glass-panel-purple p-8 text-center group hover:-translate-y-2 transition-transform duration-300", feature.border)}>
          <div className={cn("w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110", feature.bg)}>
            <feature.icon size={32} className={feature.color} />
          </div>
          <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
          <p className="text-sm text-white/60 leading-relaxed">{feature.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

const TalentGrid = ({ setActiveSection }: { setActiveSection: (s: Section) => void }) => (
  <section className="py-24 px-6 max-w-7xl mx-auto">
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
      <div>
        <h2 className="text-3xl md:text-4xl font-serif italic mb-2">7 Core Creative <span className="vibrant-text-1">Sectors</span></h2>
        <p className="text-white/50 text-sm md:text-base">The SosrG Identity Layer. Each sector opens a dedicated ecosystem hub with role-based listings and opportunities.</p>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
        <button 
          onClick={() => setActiveSection('talent')}
          className="flex items-center gap-2 px-6 py-2 rounded-full bg-gold/20 border border-gold/50 text-gold hover:bg-gold hover:text-black transition-all whitespace-nowrap font-bold text-sm shrink-0"
        >
          <Zap size={16} /> AI Smart Match
        </button>
        {TALENT_CATEGORIES.map((cat) => (
          <button 
            key={cat.id} 
            onClick={() => setActiveSection('talent')}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-gold/50 transition-colors whitespace-nowrap shrink-0"
          >
            <cat.icon size={16} className={cat.color} />
            <span className="text-sm font-medium">{cat.name}</span>
          </button>
        ))}
      </div>
    </div>

    {/* Category Visual Showcase */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-24">
      {TALENT_CATEGORIES.map((cat, i) => (
        <motion.div
          key={cat.id}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.05 }}
          viewport={{ once: true }}
          onClick={() => setActiveSection('talent')}
          className={cn(
            "group relative h-80 overflow-hidden rounded-3xl cursor-pointer",
            i === 0 || i === 3 ? "md:col-span-2 lg:col-span-2 xl:col-span-2" : ""
          )}
        >
          <img 
            src={cat.image} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            alt={cat.name}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-2 mb-2">
              <cat.icon size={18} className={cat.color} />
              <span className="text-xs font-bold uppercase tracking-widest text-white/60">Ecosystem Hub</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">{cat.name}</h3>
            <p className="text-sm text-white/70 line-clamp-2">{cat.desc}</p>
          </div>
          <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
              <ChevronRight size={20} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>

    <div className="mb-12">
      <h3 className="text-2xl font-serif italic mb-8 flex items-center gap-3">
        <TrendingUp className="text-gold" /> Featured Professionals
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {FEATURED_TALENT.map((talent, i) => (
          <motion.div
            key={talent.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="group relative"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-2xl mb-4 relative border border-white/10 group-hover:border-gold/50 transition-colors">
              <img 
                src={talent.image} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                alt={talent.name}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cinematic-black via-transparent to-transparent opacity-60" />
              
              {/* Premium Badge */}
              {talent.isPremium && (
                <div className="absolute top-4 left-4 bg-gold/90 backdrop-blur-md px-2 py-1 rounded text-black flex items-center gap-1 shadow-lg">
                  <Star size={10} className="fill-black" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Premium</span>
                </div>
              )}

              {/* Rating Badge */}
              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-2 py-1 rounded flex items-center gap-1 border border-white/10">
                <Star size={12} className="text-gold fill-gold" />
                <span className="text-xs font-bold">{talent.rating}</span>
              </div>

              <button className="absolute bottom-4 left-4 right-4 bg-gold text-black py-3 rounded-xl font-bold text-sm opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-xl">
                View Portfolio
              </button>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl font-bold">{talent.name}</h3>
              {talent.isVerified && <ShieldCheck size={16} className="text-blue-400" />}
            </div>
            <div className="flex items-center justify-between text-white/50 text-sm">
              <span className="text-gold/80 font-medium">{talent.role}</span>
              <span className="flex items-center gap-1"><Globe size={12} /> {talent.location}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const CastingEcosystem = () => {
  const [view, setView] = useState<'home' | 'register' | 'profile' | 'calls' | 'studio' | 'dashboard' | 'builder' | 'matchmaking' | 'crew' | 'applications' | 'network' | 'forum' | 'workshops' | 'mentorship' | 'events' | 'volunteer' | 'grants'>('home');
  const [isRecruiter, setIsRecruiter] = useState(false);
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
  const [builderMode, setBuilderMode] = useState<'ai' | 'manual'>('ai');
  const [crewMode, setCrewMode] = useState<'jobs' | 'professionals'>('professionals');
  const [forumMode, setForumMode] = useState<'messages' | 'community'>('community');
  const [crewSector, setCrewSector] = useState('All Sectors');
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedCall, setSelectedCall] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    house: '',
    type: 'Feature Film',
    description: '',
    location: 'Mumbai',
    budget: '',
    deadline: '',
    timeline: '',
    ndaRequired: false,
    roles: [{ id: 1, name: '', age: '', gender: 'Any', description: '' }]
  });

  const handleAutoDetectRoles = () => {
    // Simulate AI auto-detecting roles based on description
    if (formData.description.length > 20) {
      setFormData(prev => ({
        ...prev,
        roles: [
          { id: Date.now(), name: 'Lead Protagonist', age: '25-35', gender: 'Any', description: 'Strong emotional range required.' },
          { id: Date.now() + 1, name: 'Supporting Antagonist', age: '40-50', gender: 'Male', description: 'Intimidating presence.' }
        ]
      }));
    }
  };

  const addRole = () => {
    setFormData({
      ...formData,
      roles: [...formData.roles, { id: Date.now(), name: '', age: '', gender: 'Any', description: '' }]
    });
  };

  const removeRole = (id: number) => {
    if (formData.roles.length > 1) {
      setFormData({
        ...formData,
        roles: formData.roles.filter(r => r.id !== id)
      });
    }
  };

  const CASTING_CALLS = [
    { id: 1, title: 'Epic Period Drama', house: 'Dharma Productions', roles: 5, type: 'Cinema', status: 'Active', image: 'https://picsum.photos/seed/bollywood-set/800/400', fitScore: 94, budgetMatch: 'High', description: 'Looking for lead and supporting actors for a big-budget historical epic set in the 18th century.', requirements: ['Fluent in Hindi and Urdu', 'Horse riding skills preferred', 'Age 25-40'], location: 'Mumbai & Rajasthan', payment: '₹50,000 - ₹2,00,000 per day', auditionDetails: 'In-person auditions starting next week. Please submit a 2-minute dramatic monologue.' },
    { id: 2, title: 'Broadway Style Musical', house: 'National Theatre', roles: 12, type: 'Theatre', status: 'Urgent', image: 'https://picsum.photos/seed/theatre-stage/800/400', fitScore: 88, budgetMatch: 'Medium', description: 'Casting singers and dancers for a modern adaptation of a classic musical.', requirements: ['Strong vocal range (Tenor/Soprano)', 'Trained in Jazz or Contemporary dance'], location: 'New Delhi', payment: '₹1,00,000 for the entire run', auditionDetails: 'Video submissions required for the first round. Include one song and one dance routine.' },
    { id: 3, title: 'Classical Dance Documentary', house: 'National Film Board', roles: 2, type: 'Dance', status: 'Active', image: 'https://picsum.photos/seed/odissi-dance/800/400', fitScore: 75, budgetMatch: 'Low', description: 'Seeking trained Odissi dancers for a documentary exploring the roots of Indian classical dance.', requirements: ['Minimum 5 years of formal training in Odissi', 'Expressive face and strong rhythm'], location: 'Bhubaneswar', payment: '₹20,000 per day', auditionDetails: 'Submit a 5-minute performance video showcasing different mudras and expressions.' },
    { id: 4, title: 'Audiobook Narration', house: 'Penguin Audio', roles: 1, type: 'Literature', status: 'Active', image: 'https://picsum.photos/seed/audiobook/800/400', fitScore: 91, budgetMatch: 'High', description: 'Looking for a voice actor to narrate a bestselling fantasy novel.', requirements: ['Clear diction and ability to do multiple character voices', 'Home studio setup preferred'], location: 'Remote', payment: '₹5,000 per finished hour', auditionDetails: 'Submit a 3-minute voice reel demonstrating different character voices.' },
    { id: 5, title: 'Lead Vocalist for Indie Band', house: 'SoundWave Records', roles: 1, type: 'Music', status: 'Urgent', image: 'https://picsum.photos/seed/indie-band/800/400', fitScore: 85, budgetMatch: 'Medium', description: 'An established indie rock band is looking for a new lead vocalist to join them for an upcoming tour and album recording.', requirements: ['Strong stage presence', 'Ability to write lyrics is a plus', 'Age 20-35'], location: 'Bengaluru', payment: 'Profit sharing + Tour allowance', auditionDetails: 'Live auditions at SoundWave Studios this weekend. Prepare two original songs.' },
    { id: 6, title: 'Handloom Fashion Show Models', house: 'Crafts Council', roles: 10, type: 'Crafts', status: 'Active', image: 'https://picsum.photos/seed/handloom/800/400', fitScore: 78, budgetMatch: 'Low', description: 'Casting models for a fashion show highlighting traditional Indian handloom textiles and artisanal crafts.', requirements: ['Height: 5\'8" and above (Female), 6\'0" and above (Male)', 'Comfortable walking in traditional attire'], location: 'Hyderabad', payment: '₹15,000 per show', auditionDetails: 'Walk-in auditions on Friday. Please bring your portfolio.' },
  ];

  return (
    <div className="pt-32 px-6 max-w-7xl mx-auto min-h-screen pb-24">
      {/* Application Modal */}
      <AnimatePresence>
        {showApplicationModal && selectedCall && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-cinematic-gray border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-8 shadow-2xl no-scrollbar"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Apply for Role</h2>
                  <p className="text-gold font-bold uppercase tracking-widest text-sm">{selectedCall.title}</p>
                </div>
                <button onClick={() => setShowApplicationModal(false)} className="text-white/40 hover:text-white p-2">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <h3 className="font-bold mb-2 text-sm">Role Details</h3>
                  <p className="text-xs text-white/60 mb-2">{selectedCall.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs text-white/60">
                    <div className="flex items-center gap-2"><MapPin size={14} className="text-blue-400" /> {selectedCall.location}</div>
                    <div className="flex items-center gap-2"><Wallet size={14} className="text-emerald-400" /> {selectedCall.payment}</div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-white/60 block mb-2">Select Portfolio Items to Include</label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 transition-colors">
                      <input type="checkbox" className="accent-gold" defaultChecked />
                      <span className="text-sm font-bold">Main Headshot</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 transition-colors">
                      <input type="checkbox" className="accent-gold" defaultChecked />
                      <span className="text-sm font-bold">Full Body Shot</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 transition-colors">
                      <input type="checkbox" className="accent-gold" defaultChecked />
                      <span className="text-sm font-bold">Dramatic Monologue Reel</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 transition-colors">
                      <input type="checkbox" className="accent-gold" />
                      <span className="text-sm font-bold">Dance Reel</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-white/60 block mb-2">Upload Specific Audition Video (Optional)</label>
                  <div className="border border-dashed border-white/20 rounded-xl p-8 text-center bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                    <Upload size={24} className="mx-auto mb-2 text-white/40" />
                    <p className="text-sm font-bold mb-1">Click to upload or drag and drop</p>
                    <p className="text-xs text-white/40">MP4, MOV up to 500MB</p>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-white/60 block mb-2">Cover Letter / Note</label>
                  <textarea 
                    className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-gold min-h-[100px]"
                    placeholder="Briefly explain why you are a great fit for this role..."
                  ></textarea>
                </div>

                <div className="flex gap-4 pt-4">
                  <button onClick={() => setShowApplicationModal(false)} className="flex-1 py-4 bg-white/5 hover:bg-white/10 rounded-xl font-bold uppercase tracking-widest text-sm transition-colors">
                    Cancel
                  </button>
                  <button onClick={() => {
                    alert('Application submitted successfully!');
                    setShowApplicationModal(false);
                  }} className="flex-1 py-4 bg-gold text-black hover:bg-yellow-500 rounded-xl font-bold uppercase tracking-widest text-sm transition-colors">
                    Submit Application
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Advanced Filter Modal */}
      <AnimatePresence>
        {showAdvancedFilter && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-cinematic-gray border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl p-8 shadow-2xl no-scrollbar"
            >
              <div className="flex justify-between items-center mb-8 sticky top-0 bg-cinematic-gray py-2 z-10">
                <div>
                  <h2 className="text-3xl font-bold flex items-center gap-3">
                    <Search className="text-crimson" /> Advanced AI Talent Filter
                  </h2>
                  <p className="text-white/40 text-sm">Precision matching across 50,000+ verified professionals.</p>
                </div>
                <button 
                  onClick={() => setShowAdvancedFilter(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Visual & AI Recognition */}
                <div className="space-y-8">
                  <section>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gold mb-4">AI Visual Recognition</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                        <label className="text-xs text-white/60 block mb-2">Face Similarity (Reference Photo)</label>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center border border-dashed border-white/20">
                            <Video size={16} className="text-white/20" />
                          </div>
                          <button className="text-xs bg-white/10 px-3 py-2 rounded-lg hover:bg-white/20 transition-colors">Upload Reference</button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-white/60 block mb-2">Screen Presence %</label>
                          <input type="range" className="w-full accent-crimson" />
                        </div>
                        <div>
                          <label className="text-xs text-white/60 block mb-2">Age Range</label>
                          <div className="flex gap-2">
                            <input type="text" placeholder="18" className="w-full bg-black/30 border border-white/10 rounded p-1 text-xs" />
                            <input type="text" placeholder="35" className="w-full bg-black/30 border border-white/10 rounded p-1 text-xs" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gold mb-4">Creative Sector Expertise</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {['Cinema Acting', 'Theatre Performance', 'Voiceover/Narration', 'Classical Music', 'Contemporary Dance', 'Set/Prop Design', 'Artisan Crafts'].map(style => (
                        <label key={style} className="flex items-center gap-2 p-3 bg-white/5 rounded-xl border border-white/5 cursor-pointer hover:border-crimson/30 transition-all">
                          <input type="checkbox" className="accent-crimson" />
                          <span className="text-xs">{style}</span>
                        </label>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gold mb-4">Voice & Audio</h3>
                    <div className="space-y-4">
                      <select className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-xs">
                        <option>Voice Tone: All</option>
                        <option>Bass / Baritone</option>
                        <option>Tenor</option>
                        <option>Soprano / Mezzo</option>
                      </select>
                      <div className="flex flex-wrap gap-2">
                        {['Bhojpuri Accent', 'Tamil Accent', 'British English', 'US English', 'Bengali Accent'].map(a => (
                          <span key={a} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] cursor-pointer hover:bg-crimson/20 transition-colors">{a}</span>
                        ))}
                      </div>
                    </div>
                  </section>
                </div>

                {/* Skills & Background */}
                <div className="space-y-8">
                  <section>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gold mb-4">Specialized Skills</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {['Classical Dance', 'Instrumental Music', 'Scriptwriting', 'Cinematography', 'Sound Engineering', 'Costume Design'].map(skill => (
                        <label key={skill} className="flex items-center gap-2 p-3 bg-white/5 rounded-xl border border-white/5 cursor-pointer hover:border-crimson/30 transition-all">
                          <input type="checkbox" className="accent-crimson" />
                          <span className="text-xs">{skill}</span>
                        </label>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gold mb-4">Industry Credentials</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                        <span className="text-xs">Live Performance Experience Priority</span>
                        <button className="w-10 h-5 bg-crimson rounded-full relative">
                          <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
                        </button>
                      </div>
                      <select className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-xs">
                        <option>Institute: Any</option>
                        <option>NSD (National School of Drama)</option>
                        <option>FTII Pune</option>
                        <option>NID (National Institute of Design)</option>
                        <option>KM Music Conservatory</option>
                        <option>SosrG Academy</option>
                      </select>
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                        <span className="text-xs">Union/Guild Member</span>
                        <input type="checkbox" className="accent-crimson" />
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gold mb-4">Availability & Logistics</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] text-white/40 block mb-1">Min Rate (₹)</label>
                          <input type="text" placeholder="10k" className="w-full bg-black/30 border border-white/10 rounded p-2 text-xs" />
                        </div>
                        <div>
                          <label className="text-[10px] text-white/40 block mb-1">Max Rate (₹)</label>
                          <input type="text" placeholder="5L" className="w-full bg-black/30 border border-white/10 rounded p-2 text-xs" />
                        </div>
                      </div>
                      <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center gap-3">
                        <Briefcase size={16} className="text-white/40" />
                        <span className="text-xs">Available for Immediate Shoot</span>
                        <input type="checkbox" className="ml-auto accent-crimson" />
                      </div>
                    </div>
                  </section>
                </div>
              </div>

              <div className="mt-12 flex gap-4 sticky bottom-0 bg-cinematic-gray py-4 border-t border-white/5">
                <button 
                  onClick={() => setShowAdvancedFilter(false)}
                  className="flex-1 bg-crimson text-white py-4 rounded-2xl font-bold uppercase tracking-widest hover:scale-[1.02] transition-transform shadow-lg shadow-crimson/20"
                >
                  Apply AI Filters
                </button>
                <button className="px-8 bg-white/5 border border-white/10 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">
                  Reset
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mb-12 space-y-8">
        {/* Hero Section */}
        <div className="relative h-[40vh] rounded-3xl overflow-hidden flex items-center justify-center text-center">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <img src="https://picsum.photos/seed/casting-hero/1920/1080" alt="Casting Hero" className="absolute inset-0 w-full h-full object-cover" referrerPolicy="no-referrer" />
          <div className="relative z-20 max-w-3xl px-6">
            <h1 className="text-5xl md:text-7xl font-serif italic mb-6">The Future of <span className="vibrant-text-2">Casting</span></h1>
            <p className="text-xl text-white/80 mb-8">Advanced AI-powered audition and casting management.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => setView('register')} className="bg-gold text-black px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-yellow-500 transition-colors">Join as Talent</button>
              <button onClick={() => setView('builder')} className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-white/20 transition-colors">Post a Project</button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 w-full">
          <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
            <span className={cn("text-xs font-bold uppercase tracking-widest", isRecruiter ? "text-white/40" : "text-gold")}>Artist</span>
            <button 
              onClick={() => setIsRecruiter(!isRecruiter)}
              className="w-10 h-5 bg-white/10 rounded-full relative transition-colors"
            >
              <div className={cn(
                "absolute top-1 w-3 h-3 rounded-full transition-all",
                isRecruiter ? "right-1 bg-crimson" : "left-1 bg-gold"
              )} />
            </button>
            <span className={cn("text-xs font-bold uppercase tracking-widest", isRecruiter ? "text-crimson" : "text-white/40")}>Recruiter</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-1 bg-white/5 p-1 rounded-xl border border-white/10 w-full">
            {[
              { id: 'home', label: 'Home', icon: Home },
              { id: 'register', label: 'Register', icon: UserPlus },
              { id: 'profile', label: 'My Profile', icon: User },
              { id: 'calls', label: isRecruiter ? 'Manage Calls' : 'Casting Calls', icon: Briefcase },
              { id: 'crew', label: 'Hiring Crew', icon: Users },
              { id: 'matchmaking', label: 'AI Matchmaking', icon: Cpu },
              { id: 'studio', label: 'Audition Studio', icon: Video },
              { id: 'network', label: 'Network', icon: Globe },
              { id: 'forum', label: 'Forum', icon: MessageCircle },
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'workshops', label: 'Workshops', icon: BookOpen },
              { id: 'mentorship', label: 'Mentorship', icon: GraduationCap },
              { id: 'events', label: 'Events', icon: Calendar },
              { id: 'volunteer', label: 'Volunteer', icon: HeartHandshake },
              { id: 'grants', label: 'Grants', icon: Award },
              ...(isRecruiter ? [{ id: 'builder', label: 'AI Builder', icon: Zap }, { id: 'applications', label: 'Applications', icon: UserPlus }] : []),
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setView(tab.id as any)}
                className={cn(
                  "flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap",
                  view === tab.id ? (isRecruiter ? "bg-crimson text-white" : "bg-gold text-black") : "text-white/60 hover:text-white"
                )}
              >
                <tab.icon size={16} /> <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {view === 'builder' && isRecruiter && (
          <motion.div
            key="builder"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass-panel p-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-crimson/20 rounded-xl flex items-center justify-center">
                  <Zap className="text-crimson" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Casting Call Builder</h2>
                  <p className="text-xs text-white/40">Create and manage your professional casting calls.</p>
                </div>
              </div>
              <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                <button 
                  onClick={() => setBuilderMode('ai')}
                  className={cn("px-4 py-2 rounded-lg text-xs font-bold transition-all", builderMode === 'ai' ? "bg-crimson text-white" : "text-white/40")}
                >
                  AI Assisted
                </button>
                <button 
                  onClick={() => setBuilderMode('manual')}
                  className={cn("px-4 py-2 rounded-lg text-xs font-bold transition-all", builderMode === 'manual' ? "bg-crimson text-white" : "text-white/40")}
                >
                  Detailed Form
                </button>
              </div>
            </div>
            
            {builderMode === 'ai' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-white/60 block mb-2">Project Classification (Sector)</label>
                    <select className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-sm">
                      <option>Cinema (Feature Film / Web Series)</option>
                      <option>Theatre (Stage Play / Musical)</option>
                      <option>Literature (Audiobook / Voiceover)</option>
                      <option>Music (Music Video / Album)</option>
                      <option>Dance (Stage Show / Choreography)</option>
                      <option>Art & Design (Exhibition / Modeling)</option>
                      <option>Crafts (Fashion Show / Artisan Showcase)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-white/60 block mb-2">Upload Screenplay (Optional)</label>
                    <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-crimson/50 transition-colors cursor-pointer">
                      <FileText className="mx-auto mb-2 text-white/20" />
                      <p className="text-xs text-white/40">Drag & drop script for AI role auto-generation</p>
                    </div>
                  </div>
                  <button className="w-full bg-crimson text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:scale-[1.02] transition-transform">
                    Generate Roles with AI
                  </button>
                </div>
                
                <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                  <h3 className="font-bold mb-4 flex items-center gap-2 text-crimson"><Award size={16} /> AI Suggestions</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-black/20 rounded-xl border border-white/5">
                      <div className="font-bold text-sm mb-1">Lead Protagonist (Male)</div>
                      <p className="text-[10px] text-white/40 mb-2">Age: 25-30 • Intense, Method Acting • Fluent in Hindi/Marathi</p>
                      <div className="flex gap-2">
                        <span className="bg-white/5 px-2 py-1 rounded text-[8px]">Action</span>
                        <span className="bg-white/5 px-2 py-1 rounded text-[8px]">Emotional Range</span>
                      </div>
                    </div>
                    <div className="p-4 bg-black/20 rounded-xl border border-white/5">
                      <div className="font-bold text-sm mb-1">Supporting Antagonist (Female)</div>
                      <p className="text-[10px] text-white/40 mb-2">Age: 35-45 • Sophisticated, Cold • Fluent in English/Hindi</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-white/60 block mb-2">Project Title</label>
                      <input 
                        type="text" 
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        placeholder="e.g. The Silent Valley"
                        className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-sm focus:border-crimson/50 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-white/60 block mb-2">Production House / Agency</label>
                      <input 
                        type="text" 
                        value={formData.house}
                        onChange={(e) => setFormData({...formData, house: e.target.value})}
                        placeholder="e.g. Dharma Productions"
                        className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-sm focus:border-crimson/50 outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-white/60 block mb-2">Project Sector</label>
                        <select 
                          value={formData.type}
                          onChange={(e) => setFormData({...formData, type: e.target.value})}
                          className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-sm outline-none"
                        >
                          <option>Cinema</option>
                          <option>Theatre</option>
                          <option>Literature</option>
                          <option>Music</option>
                          <option>Dance</option>
                          <option>Art & Design</option>
                          <option>Crafts</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-white/60 block mb-2">Location</label>
                        <input 
                          type="text" 
                          value={formData.location}
                          onChange={(e) => setFormData({...formData, location: e.target.value})}
                          placeholder="e.g. Mumbai"
                          className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-sm focus:border-crimson/50 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-white/60 block mb-2">Project Description</label>
                      <textarea 
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        placeholder="Briefly describe the project and its vision..."
                        className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-sm h-[130px] resize-none focus:border-crimson/50 outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-white/60 block mb-2">Budget Range</label>
                        <input 
                          type="text" 
                          value={formData.budget}
                          onChange={(e) => setFormData({...formData, budget: e.target.value})}
                          placeholder="e.g. ₹50k - ₹1L"
                          className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-sm focus:border-crimson/50 outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-white/60 block mb-2">Production Timeline</label>
                        <input 
                          type="text" 
                          value={formData.timeline}
                          onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                          placeholder="e.g. 30 Days Shoot"
                          className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-sm focus:border-crimson/50 outline-none"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-white/60 block mb-2">Application Deadline</label>
                        <input 
                          type="date" 
                          value={formData.deadline}
                          onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                          className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-sm outline-none"
                        />
                      </div>
                      <div className="flex items-center mt-6">
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <div className={cn(
                            "w-6 h-6 rounded border flex items-center justify-center transition-colors",
                            formData.ndaRequired ? "bg-crimson border-crimson" : "border-white/20 group-hover:border-white/50"
                          )}>
                            {formData.ndaRequired && <CheckCircle2 size={14} className="text-white" />}
                          </div>
                          <input 
                            type="checkbox" 
                            className="hidden"
                            checked={formData.ndaRequired}
                            onChange={(e) => setFormData({...formData, ndaRequired: e.target.checked})}
                          />
                          <span className="text-sm text-white/80 group-hover:text-white transition-colors">Require NDA for Script Access</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h3 className="text-lg font-bold">Roles & Requirements</h3>
                    <div className="flex gap-2">
                      <button 
                        onClick={handleAutoDetectRoles}
                        className="text-xs bg-gold/10 text-gold border border-gold/30 px-4 py-2 rounded-lg font-bold hover:bg-gold hover:text-black transition-all flex items-center gap-2"
                      >
                        <Zap size={14} /> AI Auto-Detect Roles
                      </button>
                      <button 
                        onClick={addRole}
                        className="text-xs bg-crimson/20 text-crimson border border-crimson/30 px-4 py-2 rounded-lg font-bold hover:bg-crimson hover:text-white transition-all"
                      >
                        + Add Role
                      </button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {formData.roles.map((role, index) => (
                      <div key={role.id} className="p-6 bg-white/5 rounded-2xl border border-white/5 space-y-4 relative group">
                        {formData.roles.length > 1 && (
                          <button 
                            onClick={() => removeRole(role.id)}
                            className="absolute top-4 right-4 text-white/20 hover:text-crimson transition-colors"
                          >
                            <X size={16} />
                          </button>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 block mb-1">Role Name</label>
                            <input 
                              type="text" 
                              value={role.name}
                              onChange={(e) => {
                                const newRoles = [...formData.roles];
                                newRoles[index].name = e.target.value;
                                setFormData({...formData, roles: newRoles});
                              }}
                              placeholder="e.g. Lead Protagonist"
                              className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-xs outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 block mb-1">Age Range</label>
                            <input 
                              type="text" 
                              value={role.age}
                              onChange={(e) => {
                                const newRoles = [...formData.roles];
                                newRoles[index].age = e.target.value;
                                setFormData({...formData, roles: newRoles});
                              }}
                              placeholder="e.g. 25-30"
                              className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-xs outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 block mb-1">Gender Preference</label>
                            <select 
                              value={role.gender}
                              onChange={(e) => {
                                const newRoles = [...formData.roles];
                                newRoles[index].gender = e.target.value;
                                setFormData({...formData, roles: newRoles});
                              }}
                              className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-xs outline-none"
                            >
                              <option>Male</option>
                              <option>Female</option>
                              <option>Non-Binary</option>
                              <option>Any</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 block mb-1">Role Description & Skills</label>
                          <textarea 
                            value={role.description}
                            onChange={(e) => {
                              const newRoles = [...formData.roles];
                              newRoles[index].description = e.target.value;
                              setFormData({...formData, roles: newRoles});
                            }}
                            placeholder="Describe the character and specific skills required (e.g. Martial Arts, Singing)..."
                            className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-xs h-20 resize-none outline-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex justify-end gap-4">
                  <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
                    Save Draft
                  </button>
                  <button className="px-12 py-4 bg-crimson text-white rounded-xl font-bold uppercase tracking-widest hover:scale-[1.02] transition-transform shadow-lg shadow-crimson/20">
                    Publish Casting Call
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {view === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-16"
          >
            {/* Trending & Featured */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <div className="flex justify-between items-end mb-8">
                  <h2 className="text-3xl font-bold flex items-center gap-3"><TrendingUp className="text-crimson" /> Trending Calls</h2>
                  <button onClick={() => setView('calls')} className="text-gold text-sm font-bold uppercase tracking-widest hover:text-white transition-colors">View All</button>
                </div>
                <div className="space-y-4">
                  {CASTING_CALLS.slice(0, 3).map(call => (
                    <div key={call.id} className="glass-panel p-4 flex gap-4 items-center group cursor-pointer hover:border-gold/30 transition-all">
                      <img src={call.image} alt={call.title} className="w-20 h-20 rounded-lg object-cover" referrerPolicy="no-referrer" />
                      <div className="flex-1">
                        <h3 className="font-bold group-hover:text-gold transition-colors">{call.title}</h3>
                        <p className="text-xs text-white/60">{call.house} • {call.type}</p>
                      </div>
                      <div className="text-right">
                        <span className="bg-crimson/20 text-crimson px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest">{call.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-8">
                  <h2 className="text-3xl font-bold flex items-center gap-3"><Star className="text-gold" /> Featured Talent</h2>
                  <button className="text-gold text-sm font-bold uppercase tracking-widest hover:text-white transition-colors">View Directory</button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {FEATURED_TALENT.slice(0, 4).map(talent => (
                    <div key={talent.id} className="glass-panel p-4 text-center group cursor-pointer hover:border-gold/30 transition-all">
                      <img src={talent.image} alt={talent.name} className="w-16 h-16 rounded-full mx-auto mb-3 object-cover border-2 border-transparent group-hover:border-gold transition-all" referrerPolicy="no-referrer" />
                      <h3 className="font-bold text-sm">{talent.name}</h3>
                      <p className="text-[10px] text-white/60">{talent.role}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* News & Events */}
            <div>
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3"><Calendar className="text-blue-400" /> Industry Events & News</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: 'Masterclass: Method Acting', date: 'Oct 25', type: 'Workshop', image: 'https://picsum.photos/seed/workshop/400/300' },
                  { title: 'National Film Awards 2026', date: 'Nov 12', type: 'Event', image: 'https://picsum.photos/seed/awards/400/300' },
                  { title: 'New Union Guidelines Released', date: 'Today', type: 'News', image: 'https://picsum.photos/seed/news/400/300' }
                ].map((item, i) => (
                  <div key={i} className="glass-panel overflow-hidden group cursor-pointer">
                    <div className="h-40 relative overflow-hidden">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                      <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest border border-white/10">{item.type}</div>
                    </div>
                    <div className="p-4">
                      <span className="text-gold text-[10px] font-bold uppercase tracking-widest mb-1 block">{item.date}</span>
                      <h3 className="font-bold text-sm group-hover:text-gold transition-colors">{item.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {view === 'register' && (
          <motion.div
            key="register"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-2xl mx-auto"
          >
            <div className="glass-panel-blue p-8 md:p-12">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-4">Join the Ecosystem</h2>
                <p className="text-white/60">Create your professional profile to access casting calls, networking, and AI tools.</p>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center gap-2 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                    <span className="text-sm font-bold">Google</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                    <img src="https://www.svgrepo.com/show/448234/linkedin.svg" className="w-5 h-5" alt="LinkedIn" />
                    <span className="text-sm font-bold">LinkedIn</span>
                  </button>
                </div>

                <div className="flex items-center gap-4 py-4">
                  <div className="flex-1 h-px bg-white/10"></div>
                  <span className="text-xs text-white/40 uppercase tracking-widest font-bold">Or register with email</span>
                  <div className="flex-1 h-px bg-white/10"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-white/60 block mb-2">Full Name</label>
                    <input type="text" className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-gold" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-white/60 block mb-2">Email Address</label>
                    <input type="email" className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-gold" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-white/60 block mb-2">Mobile Number (OTP)</label>
                    <input type="tel" className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-gold" placeholder="+91 98765 43210" />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-white/60 block mb-2">Location</label>
                    <input type="text" className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-gold" placeholder="Mumbai, India" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/60 block mb-2">Primary Profession</label>
                    <select className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-gold">
                      <option>Actor / Model</option>
                      <option>Director / Filmmaker</option>
                      <option>Writer / Screenplay</option>
                      <option>Musician / Singer</option>
                      <option>Dancer / Choreographer</option>
                      <option>Crew / Technician</option>
                      <option>Casting Director / Producer</option>
                    </select>
                  </div>
                </div>

                <button 
                  onClick={() => setView('dashboard')}
                  className="w-full bg-gold text-black py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-yellow-500 transition-colors mt-8"
                >
                  Create Account
                </button>
                
                <p className="text-center text-xs text-white/40 mt-4">
                  By registering, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {view === 'profile' && (
          <motion.div
            key="profile"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Profile Header */}
            <div className="glass-panel-pink p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-gold/20 to-crimson/20"></div>
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-end mt-12">
                <div className="relative">
                  <img src="https://picsum.photos/seed/actor-profile/200/200" alt="Profile" className="w-32 h-32 rounded-full border-4 border-black object-cover" referrerPolicy="no-referrer" />
                  <button className="absolute bottom-0 right-0 bg-gold text-black p-2 rounded-full hover:bg-yellow-500 transition-colors">
                    <Upload size={16} />
                  </button>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-3xl font-bold mb-1">Aarav Sharma</h2>
                      <p className="text-gold font-bold uppercase tracking-widest text-sm mb-2">Actor • Model</p>
                      <div className="flex items-center gap-4 text-sm text-white/60">
                        <span className="flex items-center gap-1"><MapPin size={14} /> Mumbai, India</span>
                        <span className="flex items-center gap-1"><Star size={14} className="text-yellow-500" /> Top 5% Talent</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-bold transition-colors">Edit Profile</button>
                      <button className="bg-gold text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-yellow-500 transition-colors">Share Portfolio</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Details */}
              <div className="space-y-8">
                <div className="glass-panel p-6">
                  <h3 className="font-bold mb-4 flex items-center gap-2"><User size={18} className="text-gold" /> About Me</h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    Passionate actor with 5 years of experience in regional cinema and theatre. Trained in Method Acting and classical dance. Looking for challenging roles in feature films and web series.
                  </p>
                </div>

                <div className="glass-panel p-6">
                  <h3 className="font-bold mb-4 flex items-center gap-2"><Briefcase size={18} className="text-blue-400" /> Skills & Attributes</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2">Languages</h4>
                      <div className="flex flex-wrap gap-2">
                        {['Hindi', 'English', 'Marathi'].map(lang => (
                          <span key={lang} className="bg-white/5 px-3 py-1 rounded-full text-xs border border-white/10">{lang}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2">Special Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {['Horse Riding', 'Martial Arts', 'Contemporary Dance'].map(skill => (
                          <span key={skill} className="bg-white/5 px-3 py-1 rounded-full text-xs border border-white/10">{skill}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2">Physical Attributes</h4>
                      <ul className="text-sm text-white/60 space-y-1">
                        <li>Height: 5'11"</li>
                        <li>Weight: 75 kg</li>
                        <li>Eye Color: Brown</li>
                        <li>Hair: Black, Short</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Portfolio */}
              <div className="lg:col-span-2 space-y-8">
                <div className="glass-panel p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold flex items-center gap-2"><Video size={18} className="text-crimson" /> Audition Videos & Monologues</h3>
                    <button className="text-gold text-xs font-bold uppercase tracking-widest hover:text-white transition-colors flex items-center gap-1">
                      <Plus size={14} /> Add Video
                    </button>
                  </div>
                  <p className="text-xs text-white/60 mb-4">Organize and showcase your best acting demonstrations, monologues, and showreels for casting directors.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative rounded-xl overflow-hidden group cursor-pointer border border-white/10">
                      <img src="https://picsum.photos/seed/reel1/600/400" alt="Demo Reel" className="w-full h-40 object-cover opacity-70 group-hover:opacity-100 transition-opacity" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black/50 p-3 rounded-full backdrop-blur-sm group-hover:scale-110 transition-transform">
                          <Play size={24} className="text-white" />
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black to-transparent">
                        <span className="text-xs font-bold block">Dramatic Monologue (2025)</span>
                        <span className="text-[10px] text-white/60">2 mins • Hindi</span>
                      </div>
                    </div>
                    <div className="relative rounded-xl overflow-hidden group cursor-pointer border border-white/10">
                      <img src="https://picsum.photos/seed/reel2/600/400" alt="Intro Video" className="w-full h-40 object-cover opacity-70 group-hover:opacity-100 transition-opacity" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black/50 p-3 rounded-full backdrop-blur-sm group-hover:scale-110 transition-transform">
                          <Play size={24} className="text-white" />
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black to-transparent">
                        <span className="text-xs font-bold block">Self Introduction</span>
                        <span className="text-[10px] text-white/60">1 min • English</span>
                      </div>
                    </div>
                    <div className="relative rounded-xl overflow-hidden group cursor-pointer border border-white/10">
                      <img src="https://picsum.photos/seed/reel3/600/400" alt="Action Sequence" className="w-full h-40 object-cover opacity-70 group-hover:opacity-100 transition-opacity" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black/50 p-3 rounded-full backdrop-blur-sm group-hover:scale-110 transition-transform">
                          <Play size={24} className="text-white" />
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black to-transparent">
                        <span className="text-xs font-bold block">Action Sequence Demo</span>
                        <span className="text-[10px] text-white/60">3 mins • Martial Arts</span>
                      </div>
                    </div>
                    <div className="rounded-xl border border-dashed border-white/20 flex flex-col items-center justify-center text-white/40 hover:text-white hover:border-white/40 transition-colors cursor-pointer bg-white/5 h-40">
                      <Upload size={24} className="mb-2" />
                      <span className="text-xs font-bold">Upload New Video</span>
                    </div>
                  </div>
                </div>

                <div className="glass-panel p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold flex items-center gap-2"><Image size={18} className="text-emerald-400" /> Portfolio Gallery</h3>
                    <button className="text-gold text-xs font-bold uppercase tracking-widest hover:text-white transition-colors flex items-center gap-1">
                      <Plus size={14} /> Add Photos
                    </button>
                  </div>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                      <div key={i} className="aspect-square rounded-lg overflow-hidden border border-white/10 group cursor-pointer">
                        <img src={`https://picsum.photos/seed/portfolio${i}/300/300`} alt={`Portfolio ${i}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                      </div>
                    ))}
                    <div className="aspect-square rounded-lg border border-dashed border-white/20 flex flex-col items-center justify-center text-white/40 hover:text-white hover:border-white/40 transition-colors cursor-pointer bg-white/5">
                      <Upload size={24} className="mb-2" />
                      <span className="text-xs font-bold">Upload</span>
                    </div>
                  </div>
                </div>
                
                <div className="glass-panel p-6">
                  <h3 className="font-bold mb-6 flex items-center gap-2"><History size={18} className="text-purple-400" /> Experience & Projects</h3>
                  <div className="space-y-6">
                    {[
                      { title: 'The Silent Echo', role: 'Supporting Actor', year: '2025', type: 'Feature Film' },
                      { title: 'City Lights', role: 'Lead Model', year: '2024', type: 'Ad Campaign' },
                      { title: 'Hamlet', role: 'Laertes', year: '2023', type: 'Theatre Production' }
                    ].map((exp, i) => (
                      <div key={i} className="flex gap-4 items-start relative">
                        {i !== 2 && <div className="absolute left-[11px] top-8 bottom-[-24px] w-px bg-white/10"></div>}
                        <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0 z-10 mt-1">
                          <div className="w-2 h-2 rounded-full bg-gold"></div>
                        </div>
                        <div>
                          <h4 className="font-bold">{exp.title}</h4>
                          <p className="text-sm text-gold mb-1">{exp.role}</p>
                          <p className="text-xs text-white/40">{exp.type} • {exp.year}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {view === 'calls' && (
          <motion.div
            key="calls"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <div className="lg:col-span-2 space-y-6">
              {CASTING_CALLS.map((call) => (
                <div key={call.id} className="glass-panel overflow-hidden group hover:border-gold/30 transition-all">
                  <div className="h-48 relative">
                    <img src={call.image} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" alt={call.title} referrerPolicy="no-referrer" />
                    <div className="absolute top-4 right-4 bg-crimson px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest">{call.status}</div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="text-gold text-[10px] uppercase tracking-widest font-bold mb-1 block">{call.type}</span>
                        <h3 className="text-2xl font-bold">{call.title}</h3>
                        <p className="text-white/40 text-sm">{call.house}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] font-bold text-emerald-400 mb-1">{call.fitScore}% AI Fit</div>
                        <div className={cn(
                          "text-[8px] uppercase tracking-widest px-2 py-0.5 rounded",
                          call.budgetMatch === 'High' ? "bg-emerald-500/10 text-emerald-400" : "bg-gold/10 text-gold"
                        )}>
                          Budget: {call.budgetMatch} Match
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-4 text-sm text-white/80">
                      <p className="mb-2">{call.description}</p>
                      <div className="bg-white/5 p-3 rounded-lg border border-white/10 mb-2">
                        <h4 className="text-xs font-bold text-gold mb-1">Requirements:</h4>
                        <ul className="list-disc list-inside text-xs text-white/60">
                          {call.requirements.map((req, idx) => (
                            <li key={idx}>{req}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs text-white/60">
                        <div className="flex items-center gap-2"><MapPin size={14} className="text-blue-400" /> {call.location}</div>
                        <div className="flex items-center gap-2"><Wallet size={14} className="text-emerald-400" /> {call.payment}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-white/60 border-t border-white/5 pt-4">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-2"><User size={14} /> {call.roles} Roles Open</span>
                        <span className="flex items-center gap-2"><ShieldCheck size={14} className="text-blue-400" /> Verified</span>
                      </div>
                      <button 
                        onClick={() => {
                          setSelectedCall(call);
                          setShowApplicationModal(true);
                        }}
                        className="bg-gold/10 text-gold hover:bg-gold hover:text-black px-4 py-2 rounded-lg font-bold transition-colors"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-6">
              <div className="glass-panel p-6">
                <h3 className="font-bold mb-6 flex items-center gap-2">
                  {isRecruiter ? <Search size={18} className="text-crimson" /> : <Zap size={18} className="text-gold" />}
                  {isRecruiter ? 'Talent Search' : 'AI Smart Match'}
                </h3>
                <p className="text-sm text-white/40 mb-6">
                  {isRecruiter 
                    ? 'Search through our verified database of 50,000+ creative professionals.' 
                    : 'Our AI has found 12 roles matching your profile with over 85% compatibility.'}
                </p>
                <button 
                  onClick={() => isRecruiter ? setShowAdvancedFilter(true) : null}
                  className={cn(
                    "w-full border py-3 rounded-xl font-bold text-sm transition-all",
                    isRecruiter ? "bg-crimson/10 text-crimson border-crimson/30 hover:bg-crimson hover:text-white" : "bg-gold/10 text-gold border-gold/30 hover:bg-gold hover:text-black"
                  )}
                >
                  {isRecruiter ? 'Advanced Talent Filter' : 'View AI Recommendations'}
                </button>
              </div>
              <div className="glass-panel p-6">
                <h3 className="font-bold mb-6 flex items-center gap-2"><Award size={18} className="text-crimson" /> {isRecruiter ? 'Top Applicants' : 'Premium Casting'}</h3>
                <ul className="space-y-4">
                  {[
                    { title: isRecruiter ? 'Vikram Singh' : 'Lead Role - Netflix Original', match: '94%' },
                    { title: isRecruiter ? 'Sanya Iyer' : 'Parallel Lead - Ad Campaign', match: '88%' },
                  ].map((item, i) => (
                    <li key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                      <span className="text-xs font-medium">{item.title}</span>
                      <span className="text-[10px] font-bold text-emerald-400">{item.match} Match</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {view === 'crew' && (
          <motion.div
            key="crew"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  <Users className="text-gold" /> Crew Hiring Hub
                </h2>
                <p className="text-white/40 text-sm">Find and hire specialized crew across all 7 Core Creative Sectors.</p>
              </div>
              <div className="flex gap-4 w-full md:w-auto">
                <div className="bg-black/50 p-1 rounded-xl border border-white/10 flex">
                  <button 
                    onClick={() => setCrewMode('professionals')}
                    className={cn(
                      "px-6 py-2 rounded-lg text-sm font-bold transition-all",
                      crewMode === 'professionals' ? "bg-white/10 text-white" : "text-white/40 hover:text-white"
                    )}
                  >
                    Hire Professionals
                  </button>
                  <button 
                    onClick={() => setCrewMode('jobs')}
                    className={cn(
                      "px-6 py-2 rounded-lg text-sm font-bold transition-all",
                      crewMode === 'jobs' ? "bg-white/10 text-white" : "text-white/40 hover:text-white"
                    )}
                  >
                    Find Jobs
                  </button>
                </div>
                {crewMode === 'jobs' && (
                  <button className="bg-gold text-black px-6 py-2 rounded-xl text-sm font-bold hover:bg-white transition-colors">
                    Post Crew Requirement
                  </button>
                )}
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto no-scrollbar mb-8 pb-2">
              {['All Sectors', 'Cinema', 'Theatre', 'Literature', 'Music', 'Dance', 'Art & Design', 'Crafts'].map(sector => (
                <button 
                  key={sector}
                  onClick={() => setCrewSector(sector)}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border",
                    crewSector === sector ? "bg-white text-black border-white" : "bg-transparent text-white/60 border-white/10 hover:border-white/30 hover:text-white"
                  )}
                >
                  {sector}
                </button>
              ))}
            </div>

            {crewMode === 'jobs' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { role: 'Cinematographer', sector: 'Cinema', project: 'Indie Feature Film', duration: '45 Days', location: 'Mumbai', budget: '₹2L - ₹5L', urgent: true },
                  { role: 'Stage Manager', sector: 'Theatre', project: 'Broadway Style Musical', duration: '3 Months', location: 'Delhi', budget: '₹1L - ₹2L', urgent: false },
                  { role: 'Sound Engineer', sector: 'Music', project: 'Studio Album Recording', duration: '15 Days', location: 'Chennai', budget: '₹50k - ₹80k', urgent: true },
                  { role: 'Set Designer', sector: 'Art & Design', project: 'Period Drama Series', duration: '6 Months', location: 'Hyderabad', budget: '₹5L+', urgent: false },
                  { role: 'Costume Designer', sector: 'Crafts', project: 'Historical Documentary', duration: '2 Months', location: 'Jaipur', budget: '₹1.5L', urgent: false },
                  { role: 'Lighting Technician', sector: 'Dance', project: 'Contemporary Dance Show', duration: '1 Week', location: 'Bangalore', budget: '₹30k', urgent: true },
                  { role: 'Script Editor', sector: 'Literature', project: 'Sci-Fi Novel Adaptation', duration: '1 Month', location: 'Remote', budget: '₹40k', urgent: false },
                ].filter(job => crewSector === 'All Sectors' || job.sector === crewSector).map((job, i) => (
                  <div key={i} className="glass-panel p-6 group hover:border-gold/30 transition-all flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="text-gold text-[10px] uppercase tracking-widest font-bold mb-1 block">{job.sector}</span>
                        <h3 className="text-xl font-bold">{job.role}</h3>
                        <p className="text-white/60 text-sm">{job.project}</p>
                      </div>
                      {job.urgent && (
                        <span className="bg-crimson/20 text-crimson px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest">Urgent</span>
                      )}
                    </div>
                    
                    <div className="space-y-2 mb-6 flex-1">
                      <div className="flex items-center gap-2 text-xs text-white/40">
                        <Clock size={14} /> {job.duration}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-white/40">
                        <MapPin size={14} /> {job.location}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-white/40">
                        <Wallet size={14} /> {job.budget}
                      </div>
                    </div>

                    <div className="flex gap-2 mt-auto">
                      <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-bold transition-colors">
                        View Details
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedCall({
                            title: job.role,
                            description: `Project: ${job.project} | Duration: ${job.duration}`,
                            location: job.location,
                            payment: job.budget
                          });
                          setShowApplicationModal(true);
                        }}
                        className="flex-1 py-2 bg-gold/10 text-gold hover:bg-gold hover:text-black rounded-lg text-xs font-bold transition-colors"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: 'Rahul Desai', role: 'Cinematographer', sector: 'Cinema', experience: '8 Years', location: 'Mumbai', rate: '₹15k/day', image: 'https://picsum.photos/seed/cinematographer/200/200', projects: 24 },
                  { name: 'Ananya Patel', role: 'Makeup Artist', sector: 'Cinema', experience: '5 Years', location: 'Delhi', rate: '₹8k/day', image: 'https://picsum.photos/seed/makeup/200/200', projects: 45 },
                  { name: 'Karan Singh', role: 'Sound Engineer', sector: 'Music', experience: '12 Years', location: 'Chennai', rate: '₹20k/day', image: 'https://picsum.photos/seed/soundeng/200/200', projects: 110 },
                  { name: 'Meera Reddy', role: 'Set Designer', sector: 'Art & Design', experience: '6 Years', location: 'Hyderabad', rate: '₹12k/day', image: 'https://picsum.photos/seed/setdesign/200/200', projects: 18 },
                  { name: 'Vikram Bose', role: 'Video Editor', sector: 'Cinema', experience: '10 Years', location: 'Kolkata', rate: '₹10k/day', image: 'https://picsum.photos/seed/editor/200/200', projects: 60 },
                  { name: 'Sneha Rao', role: 'Costume Designer', sector: 'Theatre', experience: '7 Years', location: 'Bangalore', rate: '₹9k/day', image: 'https://picsum.photos/seed/costume/200/200', projects: 32 },
                ].filter(prof => crewSector === 'All Sectors' || prof.sector === crewSector).map((prof, i) => (
                  <div key={i} className="glass-panel p-6 group hover:border-gold/30 transition-all flex flex-col h-full">
                    <div className="flex items-start gap-4 mb-4">
                      <img src={prof.image} alt={prof.name} className="w-16 h-16 rounded-full object-cover border-2 border-white/10" referrerPolicy="no-referrer" />
                      <div>
                        <h3 className="text-lg font-bold">{prof.name}</h3>
                        <span className="text-gold text-[10px] uppercase tracking-widest font-bold block">{prof.role}</span>
                        <p className="text-white/40 text-xs mt-1">{prof.location}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6 flex-1">
                      <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                        <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Experience</div>
                        <div className="font-bold text-sm">{prof.experience}</div>
                      </div>
                      <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                        <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Projects</div>
                        <div className="font-bold text-sm">{prof.projects}+</div>
                      </div>
                      <div className="bg-white/5 p-3 rounded-xl border border-white/5 col-span-2">
                        <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Day Rate</div>
                        <div className="font-bold text-sm text-emerald-400">{prof.rate}</div>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-auto">
                      <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-bold transition-colors">
                        View Portfolio
                      </button>
                      <button className="flex-1 py-2 bg-gold/10 text-gold hover:bg-gold hover:text-black rounded-lg text-xs font-bold transition-colors">
                        Hire Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {view === 'network' && (
          <motion.div
            key="network"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  <Globe className="text-gold" /> Industry Network
                </h2>
                <p className="text-white/40 text-sm">Connect with casting directors, producers, and fellow artists.</p>
              </div>
              <div className="flex gap-4 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search professionals..." 
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:border-gold transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-6">
                <h3 className="font-bold text-lg mb-4">Suggested Connections</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { name: 'Karan Johar', role: 'Producer / Director', company: 'Dharma Productions', image: 'https://picsum.photos/seed/karan/200/200', mutual: 12 },
                    { name: 'Mukesh Chhabra', role: 'Casting Director', company: 'MCCC', image: 'https://picsum.photos/seed/mukesh/200/200', mutual: 45 },
                    { name: 'Zoya Akhtar', role: 'Director / Writer', company: 'Tiger Baby', image: 'https://picsum.photos/seed/zoya/200/200', mutual: 8 },
                    { name: 'Avinash Gowariker', role: 'Celebrity Photographer', company: 'Freelance', image: 'https://picsum.photos/seed/avinash/200/200', mutual: 23 },
                  ].map((person, i) => (
                    <div key={i} className="glass-panel p-4 flex items-center gap-4 hover:border-gold/30 transition-all">
                      <img src={person.image} alt={person.name} className="w-16 h-16 rounded-full object-cover border-2 border-white/10" referrerPolicy="no-referrer" />
                      <div className="flex-1">
                        <h4 className="font-bold text-sm">{person.name}</h4>
                        <p className="text-[10px] text-gold uppercase tracking-widest font-bold">{person.role}</p>
                        <p className="text-xs text-white/40">{person.company}</p>
                        <p className="text-[10px] text-white/30 mt-1">{person.mutual} mutual connections</p>
                      </div>
                      <button className="p-2 bg-white/5 hover:bg-gold hover:text-black rounded-full transition-colors">
                        <UserPlus size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                <h3 className="font-bold text-lg mb-4 mt-8">Recent Industry Updates</h3>
                <div className="space-y-4">
                  {[
                    { author: 'Mukesh Chhabra', time: '2 hours ago', content: 'Looking for fresh faces for an upcoming web series. Age group 18-25. Drop your profiles below!', likes: 245, comments: 89 },
                    { author: 'Dharma Productions', time: '5 hours ago', content: 'We are thrilled to announce our next big project. Stay tuned for casting updates!', likes: 1205, comments: 340 },
                  ].map((post, i) => (
                    <div key={i} className="glass-panel p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center font-bold text-gold">
                          {post.author.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm">{post.author}</h4>
                          <p className="text-[10px] text-white/40">{post.time}</p>
                        </div>
                      </div>
                      <p className="text-sm text-white/80 mb-4">{post.content}</p>
                      <div className="flex gap-4 text-xs text-white/40">
                        <button className="flex items-center gap-1 hover:text-gold transition-colors"><Star size={14} /> {post.likes}</button>
                        <button className="flex items-center gap-1 hover:text-gold transition-colors"><MessageSquare size={14} /> {post.comments}</button>
                        <button className="flex items-center gap-1 hover:text-gold transition-colors"><Share2 size={14} /> Share</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="glass-panel p-6">
                  <h3 className="font-bold mb-4 flex items-center gap-2"><UserCheck size={18} className="text-gold" /> Your Network</h3>
                  <div className="flex justify-between items-center mb-4 p-3 bg-white/5 rounded-xl">
                    <span className="text-sm font-bold">Connections</span>
                    <span className="text-gold font-bold">342</span>
                  </div>
                  <div className="flex justify-between items-center mb-4 p-3 bg-white/5 rounded-xl">
                    <span className="text-sm font-bold">Following</span>
                    <span className="text-gold font-bold">128</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                    <span className="text-sm font-bold">Profile Views</span>
                    <span className="text-emerald-400 font-bold">+45 this week</span>
                  </div>
                </div>

                <div className="glass-panel p-6">
                  <h3 className="font-bold mb-4 flex items-center gap-2"><Users size={18} className="text-blue-400" /> Groups & Communities</h3>
                  <ul className="space-y-3">
                    {['Mumbai Actors Guild', 'Indie Filmmakers India', 'Voice Over Artists Hub'].map((group, i) => (
                      <li key={i} className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors">
                        <span className="text-sm">{group}</span>
                        <span className="text-[10px] text-white/40 bg-white/10 px-2 py-1 rounded">Join</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {view === 'forum' && (
          <motion.div
            key="forum"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="h-[calc(100vh-12rem)]"
          >
            <div className="glass-panel-green h-full flex overflow-hidden">
              {/* Sidebar */}
              <div className="w-1/3 border-r border-white/10 flex flex-col">
                <div className="p-4 border-b border-white/10">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <MessageCircle className="text-gold" /> Forum & Messages
                  </h2>
                  <div className="flex bg-black/50 p-1 rounded-xl border border-white/10 mb-4">
                    <button 
                      onClick={() => setForumMode('community')}
                      className={cn(
                        "flex-1 py-1.5 rounded-lg text-xs font-bold transition-all",
                        forumMode === 'community' ? "bg-white/10 text-white" : "text-white/40 hover:text-white"
                      )}
                    >
                      Community
                    </button>
                    <button 
                      onClick={() => setForumMode('messages')}
                      className={cn(
                        "flex-1 py-1.5 rounded-lg text-xs font-bold transition-all",
                        forumMode === 'messages' ? "bg-white/10 text-white" : "text-white/40 hover:text-white"
                      )}
                    >
                      Messages
                    </button>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={14} />
                    <input 
                      type="text" 
                      placeholder={forumMode === 'community' ? "Search forums..." : "Search messages..."}
                      className="w-full bg-black/30 border border-white/10 rounded-lg py-2 pl-9 pr-4 text-xs outline-none focus:border-gold transition-colors"
                    />
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto no-scrollbar">
                  {forumMode === 'messages' ? (
                    [
                      { name: 'Casting Team - Epic Drama', msg: 'We loved your audition tape! Can you...', time: '10:30 AM', unread: 2, active: true },
                      { name: 'Rajesh Kumar (Director)', msg: 'Let\'s discuss the script changes tomorrow.', time: 'Yesterday', unread: 0, active: false },
                      { name: 'Neha Sharma (Co-star)', msg: 'Are we still rehearsing at 5?', time: 'Tue', unread: 0, active: false },
                      { name: 'MCCC Support', msg: 'Your profile has been verified.', time: 'Mon', unread: 0, active: false },
                    ].map((chat, i) => (
                      <div key={i} className={cn(
                        "p-4 border-b border-white/5 cursor-pointer transition-colors flex items-start gap-3",
                        chat.active ? "bg-white/10" : "hover:bg-white/5"
                      )}>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/20 to-crimson/20 flex items-center justify-center flex-shrink-0">
                          <span className="font-bold text-sm">{chat.name.charAt(0)}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-baseline mb-1">
                            <h4 className="font-bold text-sm truncate">{chat.name}</h4>
                            <span className="text-[10px] text-white/40 flex-shrink-0">{chat.time}</span>
                          </div>
                          <p className="text-xs text-white/60 truncate">{chat.msg}</p>
                        </div>
                        {chat.unread > 0 && (
                          <div className="w-5 h-5 bg-gold text-black rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                            {chat.unread}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    [
                      { name: 'Film Acting', desc: 'Discuss techniques, auditions, and film industry trends.', active: true },
                      { name: 'Theatre & Stage', desc: 'Connect with stage actors, directors, and crew.', active: false },
                      { name: 'Modelling & Fashion', desc: 'Share portfolio tips, agency reviews, and casting calls.', active: false },
                      { name: 'Dance & Choreography', desc: 'Discuss styles, workshops, and performance opportunities.', active: false },
                      { name: 'Music & Voice', desc: 'Connect with singers, composers, and voice actors.', active: false },
                      { name: 'Creative Arts & Crew', desc: 'For cinematographers, editors, designers, and technical crew.', active: false },
                    ].map((forum, i) => (
                      <div key={i} className={cn(
                        "p-4 border-b border-white/5 cursor-pointer transition-colors",
                        forum.active ? "bg-white/10 border-l-2 border-l-gold" : "hover:bg-white/5"
                      )}>
                        <h4 className="font-bold text-sm mb-1">{forum.name}</h4>
                        <p className="text-xs text-white/60">{forum.desc}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Main Area */}
              <div className="w-2/3 flex flex-col bg-black/20">
                {forumMode === 'messages' ? (
                  <>
                    <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/20 to-crimson/20 flex items-center justify-center">
                          <span className="font-bold text-sm">C</span>
                        </div>
                        <div>
                          <h3 className="font-bold">Casting Team - Epic Drama</h3>
                          <p className="text-[10px] text-emerald-400 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> Online</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 text-white/40 hover:text-white transition-colors"><Video size={18} /></button>
                        <button className="p-2 text-white/40 hover:text-white transition-colors"><Star size={18} /></button>
                      </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
                      <div className="flex justify-center">
                        <span className="text-[10px] text-white/40 bg-white/5 px-3 py-1 rounded-full">Today</span>
                      </div>
                      <div className="flex gap-3 max-w-[80%]">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold/20 to-crimson/20 flex items-center justify-center flex-shrink-0 mt-auto">
                          <span className="font-bold text-xs">C</span>
                        </div>
                        <div className="bg-white/10 p-3 rounded-2xl rounded-bl-none">
                          <p className="text-sm">Hi Aarav! We reviewed your application for the Lead Role.</p>
                          <span className="text-[10px] text-white/40 mt-1 block">10:25 AM</span>
                        </div>
                      </div>
                      <div className="flex gap-3 max-w-[80%]">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold/20 to-crimson/20 flex items-center justify-center flex-shrink-0 mt-auto opacity-0">
                          <span className="font-bold text-xs">C</span>
                        </div>
                        <div className="bg-white/10 p-3 rounded-2xl rounded-bl-none">
                          <p className="text-sm">We loved your audition tape! Can you join a quick video call tomorrow at 2 PM for a script reading?</p>
                          <span className="text-[10px] text-white/40 mt-1 block">10:30 AM</span>
                        </div>
                      </div>
                      <div className="flex gap-3 max-w-[80%] ml-auto justify-end">
                        <div className="bg-gold/20 text-white p-3 rounded-2xl rounded-br-none border border-gold/30">
                          <p className="text-sm">Hello! Thank you so much. Yes, 2 PM tomorrow works perfectly for me.</p>
                          <span className="text-[10px] text-white/60 mt-1 block text-right">10:35 AM</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border-t border-white/10 bg-white/5">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-white/40 hover:text-gold transition-colors"><Plus size={20} /></button>
                        <input 
                          type="text" 
                          placeholder="Type a message..." 
                          className="flex-1 bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-sm outline-none focus:border-gold transition-colors"
                        />
                        <button className="p-3 bg-gold text-black rounded-xl hover:bg-yellow-500 transition-colors">
                          <Play size={16} className="ml-1" />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                      <div>
                        <h3 className="font-bold text-lg">Film Acting Forum</h3>
                        <p className="text-xs text-white/60">Discuss techniques, auditions, and film industry trends.</p>
                      </div>
                      <button className="bg-gold text-black px-4 py-2 rounded-lg text-xs font-bold hover:bg-white transition-colors">
                        New Topic
                      </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
                      {[
                        { title: 'Tips for self-tape auditions?', author: 'Riya S.', replies: 14, views: 120, time: '2h ago' },
                        { title: 'Best acting workshops in Mumbai right now', author: 'Vikram M.', replies: 32, views: 450, time: '5h ago' },
                        { title: 'How to handle rejection after a final callback', author: 'Ananya P.', replies: 56, views: 890, time: '1d ago' },
                        { title: 'Understanding the Meisner technique - My experience', author: 'Kabir D.', replies: 8, views: 112, time: '2d ago' },
                        { title: 'What do casting directors really look for in a headshot?', author: 'Sneha R.', replies: 45, views: 670, time: '3d ago' },
                      ].map((topic, i) => (
                        <div key={i} className="bg-white/5 p-4 rounded-xl hover:bg-white/10 transition-colors cursor-pointer border border-white/5 hover:border-gold/30">
                          <h4 className="font-bold mb-2 text-sm">{topic.title}</h4>
                          <div className="flex items-center justify-between text-xs text-white/40">
                            <div className="flex items-center gap-2">
                              <span className="text-gold">{topic.author}</span>
                              <span>•</span>
                              <span>{topic.time}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1"><MessageCircle size={12} /> {topic.replies}</span>
                              <span className="flex items-center gap-1"><User size={12} /> {topic.views}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {view === 'matchmaking' && (
          <motion.div
            key="matchmaking"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-8"
          >
            <div className="glass-panel p-12 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold via-crimson to-gold" />
              <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-8 gold-glow">
                <Cpu size={40} className="text-gold" />
              </div>
              <h2 className="text-3xl font-bold mb-4">AI Casting Matchmaking</h2>
              <p className="text-white/40 max-w-2xl mx-auto mb-10">
                Our neural engine analyzes your portfolio, performance style, and budget requirements to find the perfect roles.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: 'Talent Fit Scoring', desc: '94% match for "Epic Period Drama" based on portfolio and creative style.', icon: User },
                  { title: 'Crew Compatibility', desc: 'High synergy match with Project Manager Rajesh K. based on previous collaboration patterns.', icon: Globe },
                  { title: 'Budget-Based Suggestion', desc: 'These roles match your current market value and experience level.', icon: Wallet },
                ].map((card, i) => (
                  <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-gold/50 transition-all cursor-pointer group">
                    <card.icon className="mx-auto mb-4 text-gold group-hover:scale-110 transition-transform" size={32} />
                    <h3 className="font-bold mb-2 text-sm">{card.title}</h3>
                    <p className="text-[10px] text-white/40 leading-relaxed">{card.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass-panel-purple p-8">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Star size={20} className="text-gold" /> {isRecruiter ? 'Top Talent Matches for Your Roles' : 'Top Matches for You'}</h3>
                <div className="space-y-4">
                  {isRecruiter ? (
                    FEATURED_TALENT.map((talent) => (
                      <div key={talent.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-gold/30 transition-all">
                        <div className="flex items-center gap-4">
                          <img src={talent.image} className="w-12 h-12 rounded-lg object-cover" alt={talent.name} />
                          <div>
                            <div className="font-bold text-sm">{talent.name}</div>
                            <div className="text-[10px] text-white/40 uppercase tracking-widest">{talent.role}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-emerald-400">9{Math.floor(Math.random() * 9)}% Match</div>
                          <button className="text-[10px] text-gold hover:underline uppercase tracking-widest font-bold">Shortlist</button>
                        </div>
                      </div>
                    ))
                  ) : (
                    CASTING_CALLS.filter(c => c.fitScore > 80).map((call) => (
                      <div key={call.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-gold/30 transition-all">
                        <div className="flex items-center gap-4">
                          <img src={call.image} className="w-12 h-12 rounded-lg object-cover" alt={call.title} />
                          <div>
                            <div className="font-bold text-sm">{call.title}</div>
                            <div className="text-[10px] text-white/40 uppercase tracking-widest">{call.house}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-emerald-400">{call.fitScore}% Match</div>
                          <button 
                            onClick={() => {
                              setSelectedCall(call);
                              setShowApplicationModal(true);
                            }}
                            className="text-[10px] text-gold hover:underline uppercase tracking-widest font-bold"
                          >
                            Apply Now
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className="glass-panel-orange p-8">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Briefcase size={20} className="text-gold" /> {isRecruiter ? 'Casting Insights AI' : 'Career Path AI'}</h3>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/5 text-center">
                  <p className="text-sm text-white/80 mb-4 italic">
                    {isRecruiter 
                      ? '"Based on your recent casting calls, there is a high demand for classical dancers in your region. Consider expanding your search parameters to find hidden talent."'
                      : '"Based on your 94% fit for period dramas, we suggest focusing on \'Classical\' and \'Theatrical\' tags to reach Expert level faster in your creative sector."'}
                  </p>
                  <button className="bg-gold text-black px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest">
                    {isRecruiter ? 'View Insights' : 'View Roadmap'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {view === 'studio' && (
          <motion.div
            key="studio"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  <Video className="text-crimson" /> Live Audition Studio
                </h2>
                <p className="text-white/40 text-sm">Secure, encrypted video audition room with real-time AI analysis.</p>
              </div>
              <div className="flex gap-4 w-full md:w-auto">
                <button className="flex-1 md:flex-none bg-white/5 border border-white/10 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-white/10 transition-colors">
                  Self-Tape Mode
                </button>
                <button className="flex-1 md:flex-none bg-crimson text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-red-600 transition-colors">
                  Join Live Session
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 glass-panel p-4 relative min-h-[500px] flex flex-col justify-center items-center overflow-hidden">
                <div className="absolute inset-0 bg-black/50 z-0"></div>
                <div className="absolute top-4 right-4 z-10 flex gap-2">
                  <span className="bg-crimson px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest animate-pulse flex items-center gap-2">
                    <span className="w-2 h-2 bg-white rounded-full"></span> Live
                  </span>
                  <span className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10">
                    00:14:32
                  </span>
                </div>
                
                {/* Mock Video Feed */}
                <div className="relative z-10 w-full max-w-lg aspect-video bg-black/80 border border-white/10 rounded-xl overflow-hidden shadow-2xl flex items-center justify-center">
                  <img src="https://picsum.photos/seed/audition-feed/800/450" alt="Audition Feed" className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" />
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4">
                    <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors">
                      <Mic size={20} />
                    </button>
                    <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors">
                      <Video size={20} />
                    </button>
                    <button className="w-12 h-12 rounded-full bg-crimson flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg shadow-crimson/20">
                      <X size={20} />
                    </button>
                  </div>
                </div>

                {/* AI Teleprompter Overlay */}
                <div className="absolute bottom-8 left-8 right-8 z-10 bg-black/60 backdrop-blur-md border border-white/10 p-4 rounded-xl text-center">
                  <p className="text-lg font-serif italic text-white/80">
                    "I've been waiting for this moment my entire life. You think you can just walk in here and take it?"
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="glass-panel p-6">
                  <h3 className="font-bold mb-4 flex items-center gap-2"><Cpu size={16} className="text-gold" /> Real-Time AI Analysis</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white/60">Emotional Resonance</span>
                        <span className="text-gold font-bold">88%</span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-1.5">
                        <div className="bg-gold h-1.5 rounded-full" style={{ width: '88%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white/60">Voice Clarity & Pitch</span>
                        <span className="text-emerald-400 font-bold">92%</span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-1.5">
                        <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white/60">Micro-expression Match</span>
                        <span className="text-blue-400 font-bold">75%</span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-1.5">
                        <div className="bg-blue-400 h-1.5 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass-panel p-6">
                  <h3 className="font-bold mb-4 flex items-center gap-2"><Users size={16} className="text-gold" /> Panel Chat</h3>
                  <div className="space-y-4 mb-4 h-48 overflow-y-auto no-scrollbar">
                    <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                      <span className="text-[10px] text-gold font-bold uppercase tracking-widest block mb-1">Director</span>
                      <p className="text-xs text-white/80">Great intensity. Can we try one more take with a bit more vulnerability?</p>
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                      <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest block mb-1">Casting Agent</span>
                      <p className="text-xs text-white/80">Agreed. The voice modulation is spot on though.</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <input type="text" placeholder="Type a message..." className="flex-1 bg-black/30 border border-white/10 rounded-xl px-4 py-2 text-xs outline-none focus:border-gold" />
                    <button className="bg-gold text-black px-4 py-2 rounded-xl text-xs font-bold">Send</button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {view === 'applications' && isRecruiter && (
          <motion.div
            key="applications"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  <UserPlus className="text-gold" /> Applicant Tracking
                </h2>
                <p className="text-white/40 text-sm mt-2">Review, shortlist, and contact talent for your casting calls.</p>
              </div>
              <div className="flex gap-4">
                <select className="bg-white/5 border border-white/10 text-white px-4 py-2 rounded-xl text-sm outline-none focus:border-gold">
                  <option value="all">All Casting Calls</option>
                  <option value="1">Lead Role - Epic Period Drama</option>
                  <option value="2">Supporting Actors - Sci-Fi Series</option>
                </select>
                <select className="bg-white/5 border border-white/10 text-white px-4 py-2 rounded-xl text-sm outline-none focus:border-gold">
                  <option value="all">All Statuses</option>
                  <option value="new">New</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {[
                { id: 1, name: 'Aarav Sharma', role: 'Lead Role - Epic Period Drama', match: 94, status: 'New', image: 'https://picsum.photos/seed/actor-profile/200/200', date: '2 hours ago' },
                { id: 2, name: 'Sanya Iyer', role: 'Supporting Actors - Sci-Fi Series', match: 88, status: 'Shortlisted', image: 'https://picsum.photos/seed/bharatanatyam-dancer/200/200', date: '1 day ago' },
                { id: 3, name: 'Vikram Singh', role: 'Lead Role - Epic Period Drama', match: 75, status: 'New', image: 'https://picsum.photos/seed/indian-filmmaker/200/200', date: '2 days ago' },
              ].map((applicant) => (
                <div key={applicant.id} className="glass-panel p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-gold/30 transition-all">
                  <div className="flex items-center gap-6 w-full md:w-auto">
                    <img src={applicant.image} alt={applicant.name} className="w-16 h-16 rounded-full object-cover border-2 border-white/10" referrerPolicy="no-referrer" />
                    <div>
                      <h3 className="text-lg font-bold">{applicant.name}</h3>
                      <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Applied for: {applicant.role}</p>
                      <p className="text-[10px] text-white/30">{applicant.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                    <div className="text-center">
                      <div className="text-xl font-bold text-emerald-400">{applicant.match}%</div>
                      <div className="text-[10px] text-white/40 uppercase tracking-widest">AI Match</div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <button className="bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-lg text-xs font-bold transition-colors">
                        View Profile
                      </button>
                      <button className="bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-lg text-xs font-bold transition-colors">
                        Message
                      </button>
                      {applicant.status === 'New' ? (
                        <button className="bg-gold text-black hover:bg-yellow-500 px-4 py-2 rounded-lg text-xs font-bold transition-colors">
                          Shortlist
                        </button>
                      ) : (
                        <span className="px-4 py-2 rounded-lg text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          {applicant.status}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {view === 'workshops' && (
          <motion.div
            key="workshops"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  <BookOpen className="text-gold" /> Workshops & Training
                </h2>
                <p className="text-white/40 text-sm">Discover classes and courses across the 7 Core Creative Sectors.</p>
              </div>
              <div className="flex gap-4 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search workshops..." 
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:border-gold transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Method Acting Masterclass', instructor: 'Naseeruddin Shah', date: 'Oct 15 - Oct 20', sector: 'Film Acting', price: '₹15,000', image: 'https://picsum.photos/seed/acting/400/200' },
                { title: 'Fashion Photography Workshop', instructor: 'Dabboo Ratnani', date: 'Nov 5', sector: 'Photography', price: '₹8,000', image: 'https://picsum.photos/seed/photo/400/200' },
                { title: 'Voice Modulation for Animation', instructor: 'Sonal Kaushal', date: 'Oct 25', sector: 'Voice Acting', price: '₹5,000', image: 'https://picsum.photos/seed/voice/400/200' },
                { title: 'Contemporary Dance Intensive', instructor: 'Terence Lewis', date: 'Nov 10 - Nov 15', sector: 'Dance', price: '₹12,000', image: 'https://picsum.photos/seed/dance/400/200' },
                { title: 'Screenwriting Fundamentals', instructor: 'Juhi Chaturvedi', date: 'Dec 1 - Dec 5', sector: 'Writing', price: '₹10,000', image: 'https://picsum.photos/seed/write/400/200' },
                { title: 'Advanced Makeup Techniques', instructor: 'Mickey Contractor', date: 'Nov 20', sector: 'Makeup', price: '₹20,000', image: 'https://picsum.photos/seed/makeup/400/200' },
              ].map((workshop, i) => (
                <div key={i} className="glass-panel overflow-hidden group hover:border-gold/30 transition-all">
                  <div className="relative h-40">
                    <img src={workshop.image} alt={workshop.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-gold">
                      {workshop.sector}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-2">{workshop.title}</h3>
                    <p className="text-sm text-white/60 mb-4 flex items-center gap-2"><User size={14} /> {workshop.instructor}</p>
                    <div className="flex justify-between items-center text-xs text-white/40 mb-6">
                      <span className="flex items-center gap-1"><Calendar size={12} /> {workshop.date}</span>
                      <span className="font-bold text-emerald-400">{workshop.price}</span>
                    </div>
                    <button className="w-full bg-white/5 hover:bg-gold hover:text-black py-2 rounded-lg font-bold text-sm transition-colors">
                      Register Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {view === 'mentorship' && (
          <motion.div
            key="mentorship"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  <GraduationCap className="text-gold" /> Career Counselling & Mentorship
                </h2>
                <p className="text-white/40 text-sm">Book 1-on-1 guidance sessions with industry veterans.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {[
                  { name: 'Anupam Kher', role: 'Veteran Actor', expertise: ['Acting Techniques', 'Career Strategy', 'Audition Prep'], rating: 4.9, reviews: 124, price: '₹5,000/hr', image: 'https://picsum.photos/seed/anupam/200/200' },
                  { name: 'Farah Khan', role: 'Director / Choreographer', expertise: ['Choreography', 'Directing', 'Industry Networking'], rating: 4.8, reviews: 89, price: '₹7,500/hr', image: 'https://picsum.photos/seed/farah/200/200' },
                  { name: 'Manish Malhotra', role: 'Fashion Designer', expertise: ['Styling', 'Portfolio Building', 'Brand Image'], rating: 4.9, reviews: 210, price: '₹10,000/hr', image: 'https://picsum.photos/seed/manish/200/200' },
                ].map((mentor, i) => (
                  <div key={i} className="glass-panel p-6 flex flex-col sm:flex-row gap-6 hover:border-gold/30 transition-all">
                    <img src={mentor.image} alt={mentor.name} className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl object-cover border border-white/10" referrerPolicy="no-referrer" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-bold">{mentor.name}</h3>
                          <p className="text-gold text-sm font-bold uppercase tracking-widest">{mentor.role}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-gold font-bold">
                            <Star size={14} className="fill-gold" /> {mentor.rating}
                          </div>
                          <p className="text-[10px] text-white/40">{mentor.reviews} reviews</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {mentor.expertise.map((exp, j) => (
                          <span key={j} className="bg-white/5 px-2 py-1 rounded text-[10px] text-white/60">{exp}</span>
                        ))}
                      </div>
                      <div className="flex justify-between items-center mt-auto">
                        <span className="font-bold text-emerald-400">{mentor.price}</span>
                        <button className="bg-gold text-black px-6 py-2 rounded-lg font-bold text-sm hover:bg-white transition-colors">
                          Book Session
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                <div className="glass-panel p-6">
                  <h3 className="font-bold mb-4">How it works</h3>
                  <ul className="space-y-4 text-sm text-white/60">
                    <li className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-gold/20 text-gold flex items-center justify-center font-bold flex-shrink-0">1</div>
                      <p>Browse through our curated list of industry experts.</p>
                    </li>
                    <li className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-gold/20 text-gold flex items-center justify-center font-bold flex-shrink-0">2</div>
                      <p>Select a mentor and book a time slot that works for you.</p>
                    </li>
                    <li className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-gold/20 text-gold flex items-center justify-center font-bold flex-shrink-0">3</div>
                      <p>Join the 1-on-1 video call and get personalized guidance.</p>
                    </li>
                  </ul>
                </div>
                
                <div className="glass-panel p-6 bg-gradient-to-br from-gold/10 to-transparent border-gold/20">
                  <h3 className="font-bold text-gold mb-2">Need help choosing?</h3>
                  <p className="text-xs text-white/60 mb-4">Let our AI match you with the perfect mentor based on your career goals.</p>
                  <button className="w-full bg-white/10 hover:bg-white/20 py-2 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2">
                    <Cpu size={16} /> AI Mentor Match
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {view === 'events' && (
          <motion.div
            key="events"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  <Calendar className="text-gold" /> Event & Festival Listings
                </h2>
                <p className="text-white/40 text-sm">Discover and register for film festivals, art fairs, and industry conferences.</p>
              </div>
              <div className="flex gap-4 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search events..." 
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:border-gold transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Mumbai International Film Festival', date: 'Dec 10 - Dec 15, 2026', location: 'Mumbai, India', type: 'Film Festival', image: 'https://picsum.photos/seed/miff/400/200' },
                { title: 'Global Art Fair 2026', date: 'Jan 5 - Jan 8, 2027', location: 'New Delhi, India', type: 'Art Exhibition', image: 'https://picsum.photos/seed/artfair/400/200' },
                { title: 'National Theatre Symposium', date: 'Nov 20 - Nov 22, 2026', location: 'Bengaluru, India', type: 'Conference', image: 'https://picsum.photos/seed/theatre/400/200' },
                { title: 'Indie Music Showcase', date: 'Oct 30, 2026', location: 'Pune, India', type: 'Music Event', image: 'https://picsum.photos/seed/music/400/200' },
                { title: 'Creative Writers Retreat', date: 'Feb 12 - Feb 15, 2027', location: 'Goa, India', type: 'Workshop', image: 'https://picsum.photos/seed/writers/400/200' },
                { title: 'Fashion Week Auditions', date: 'Nov 10, 2026', location: 'Mumbai, India', type: 'Audition', image: 'https://picsum.photos/seed/fashion/400/200' },
              ].map((event, i) => (
                <div key={i} className="glass-panel overflow-hidden group hover:border-gold/30 transition-all">
                  <div className="relative h-40">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-gold">
                      {event.type}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-2">{event.title}</h3>
                    <div className="space-y-2 mb-6">
                      <p className="text-sm text-white/60 flex items-center gap-2"><Calendar size={14} /> {event.date}</p>
                      <p className="text-sm text-white/60 flex items-center gap-2"><Globe size={14} /> {event.location}</p>
                    </div>
                    <button className="w-full bg-white/5 hover:bg-gold hover:text-black py-2 rounded-lg font-bold text-sm transition-colors">
                      View Details & Register
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {view === 'volunteer' && (
          <motion.div
            key="volunteer"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  <HeartHandshake className="text-gold" /> Volunteer Opportunities
                </h2>
                <p className="text-white/40 text-sm">Gain experience and build your network by volunteering at cultural events.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[
                { title: 'Stage Manager Assistant', event: 'National Theatre Symposium', duration: '3 Days', role: 'Backstage', reqs: 'Basic understanding of stage cues.' },
                { title: 'Artist Liaison', event: 'Global Art Fair 2026', duration: '4 Days', role: 'Hospitality', reqs: 'Excellent communication skills.' },
                { title: 'Usher & Guest Relations', event: 'Mumbai International Film Festival', duration: '6 Days', role: 'Front of House', reqs: 'Friendly demeanor, ability to manage crowds.' },
                { title: 'Social Media Coordinator', event: 'Indie Music Showcase', duration: '1 Day', role: 'Digital', reqs: 'Experience with Instagram and Twitter.' },
              ].map((opp, i) => (
                <div key={i} className="glass-panel p-6 hover:border-gold/30 transition-all flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{opp.title}</h3>
                      <p className="text-gold text-sm font-bold uppercase tracking-widest">{opp.event}</p>
                    </div>
                    <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-bold">{opp.role}</span>
                  </div>
                  <p className="text-sm text-white/60 mb-4 flex-1"><strong>Requirements:</strong> {opp.reqs}</p>
                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/10">
                    <span className="text-sm text-white/40 flex items-center gap-1"><Clock size={14} /> {opp.duration}</span>
                    <button className="bg-white/10 hover:bg-gold hover:text-black px-6 py-2 rounded-lg font-bold text-sm transition-colors">
                      Apply to Volunteer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {view === 'grants' && (
          <motion.div
            key="grants"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  <Award className="text-gold" /> Grants & Scholarships
                </h2>
                <p className="text-white/40 text-sm">Explore funding opportunities for artists and creative professionals.</p>
              </div>
              <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                <button className="px-4 py-2 bg-white/10 rounded-lg text-xs font-bold transition-all">All</button>
                <button className="px-4 py-2 text-white/40 hover:text-white rounded-lg text-xs font-bold transition-all">Grants</button>
                <button className="px-4 py-2 text-white/40 hover:text-white rounded-lg text-xs font-bold transition-all">Scholarships</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: 'Emerging Filmmaker Grant', org: 'CineArts Foundation', amount: '₹5,00,000', deadline: 'Nov 30, 2026', type: 'Grant', sector: 'Film', desc: 'Funding for short film production by first-time directors.' },
                { title: 'Performing Arts Scholarship', org: 'National Arts Council', amount: '₹2,00,000', deadline: 'Dec 15, 2026', type: 'Scholarship', sector: 'Theatre/Dance', desc: 'Annual scholarship for students pursuing a degree in performing arts.' },
                { title: 'Digital Art Innovation Fund', org: 'TechArt Initiative', amount: '₹3,50,000', deadline: 'Oct 25, 2026', type: 'Grant', sector: 'Digital Arts', desc: 'Support for projects combining traditional art with new technologies.' },
                { title: 'Writers Residency Fellowship', org: 'Literary Guild', amount: 'Fully Funded', deadline: 'Jan 10, 2027', type: 'Fellowship', sector: 'Writing', desc: 'A 3-month fully funded residency program for aspiring novelists.' },
              ].map((grant, i) => (
                <div key={i} className="glass-panel p-6 hover:border-gold/30 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{grant.title}</h3>
                      <p className="text-sm text-white/60">{grant.org}</p>
                    </div>
                    <div className="text-right">
                      <span className="block font-bold text-emerald-400">{grant.amount}</span>
                      <span className="text-[10px] text-white/40 uppercase tracking-widest">{grant.type}</span>
                    </div>
                  </div>
                  <p className="text-sm text-white/80 mb-6">{grant.desc}</p>
                  <div className="flex justify-between items-center pt-4 border-t border-white/10">
                    <span className="text-xs text-crimson font-bold flex items-center gap-1">
                      <Clock size={12} /> Deadline: {grant.deadline}
                    </span>
                    <button className="bg-gold text-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-white transition-colors">
                      View Application
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {view === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-4 gap-8"
          >
            <div className="lg:col-span-1 space-y-6">
              <div className="glass-panel p-6 text-center">
                <div className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-gold p-1">
                  <img src="https://picsum.photos/seed/actor-dash/200/200" className="w-full h-full rounded-full object-cover" alt="Profile" referrerPolicy="no-referrer" />
                </div>
                <h3 className="font-bold">SiDdhaRtha SosrG</h3>
                <p className="text-xs text-white/40 mb-4">Method Actor • Mumbai</p>
                <div className="flex justify-center gap-2">
                  <span className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded text-[10px] font-bold">Verified</span>
                  <span className="bg-gold/10 text-gold px-2 py-1 rounded text-[10px] font-bold">Pro</span>
                </div>
              </div>
              <div className="glass-panel p-6">
                <h4 className="text-[10px] uppercase tracking-widest text-white/40 mb-4">Application Stats</h4>
                <div className="space-y-4">
                  {[
                    { label: 'Applied', count: 24, color: 'bg-blue-500' },
                    { label: 'Shortlisted', count: 8, color: 'bg-gold' },
                    { label: 'Callbacks', count: 3, color: 'bg-purple-500' },
                    { label: 'Selected', count: 1, color: 'bg-emerald-500' },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span>{stat.label}</span>
                        <span className="font-bold">{stat.count}</span>
                      </div>
                      <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                        <div className={cn("h-full", stat.color)} style={{ width: `${(stat.count / 24) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:col-span-3 space-y-8">
              <div className="glass-panel-green p-8">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><TrendingUp size={20} className="text-gold" /> Performance Analytics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                    <div className="text-3xl font-bold text-gold mb-1">88%</div>
                    <div className="text-[10px] uppercase tracking-widest text-white/40">Avg. Suitability</div>
                  </div>
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                    <div className="text-3xl font-bold text-emerald-400 mb-1">92%</div>
                    <div className="text-[10px] uppercase tracking-widest text-white/40">Voice Clarity</div>
                  </div>
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                    <div className="text-3xl font-bold text-blue-400 mb-1">75%</div>
                    <div className="text-[10px] uppercase tracking-widest text-white/40">Callback Rate</div>
                  </div>
                </div>
              </div>
              <div className="glass-panel-pink p-8">
                <h3 className="text-xl font-bold mb-6">Recent Applications</h3>
                <div className="space-y-4">
                  {[
                    { title: 'The Silent Valley', role: 'Lead Antagonist', date: '2 days ago', status: 'Shortlisted' },
                    { title: 'Mumbai Nights', role: 'Supporting Actor', date: '5 days ago', status: 'Applied' },
                    { title: 'Classical Fusion', role: 'Lead Dancer', date: '1 week ago', status: 'Callback' },
                  ].map((app, i) => (
                    <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5 flex justify-between items-center">
                      <div>
                        <div className="font-bold">{app.title}</div>
                        <div className="text-xs text-white/40">{app.role} • {app.date}</div>
                      </div>
                      <span className={cn(
                        "text-[10px] font-bold px-3 py-1 rounded-full",
                        app.status === 'Shortlisted' ? "bg-gold/10 text-gold" : 
                        app.status === 'Callback' ? "bg-purple-500/10 text-purple-400" : "bg-white/10 text-white/60"
                      )}>
                        {app.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TalentAuction = () => {
  const [activeTab, setActiveTab] = useState<'browse' | 'create' | 'analytics' | 'contracts' | 'upcoming' | 'wallet'>('browse');
  const [showAIPredictor, setShowAIPredictor] = useState(false);
  const [selectedSector, setSelectedSector] = useState('All Sectors');

  const SECTORS = ['All Sectors', 'Acting', 'Direction', 'Writing', 'Cinematography', 'Editing', 'Music', 'Art & Design'];

  const AUCTIONS = [
    { id: 1, title: 'Lead Role: "The Last Monsoon"', artist: 'Rajesh K.', sector: 'Acting', currentBid: '₹1,20,000', buyNow: '₹3,00,000', endsIn: '2h 15m', image: 'https://picsum.photos/seed/actor-auction/400/300' },
    { id: 2, title: 'Original Screenplay: "Cyber City"', artist: 'Meera V.', sector: 'Writing', currentBid: '₹45,000', buyNow: '₹1,50,000', endsIn: '4h 30m', image: 'https://picsum.photos/seed/script-auction/400/300' },
    { id: 3, title: 'Exclusive Music Score Rights', artist: 'Amit S.', sector: 'Music', currentBid: '₹2,50,000', buyNow: '₹5,00,000', endsIn: '12h 05m', image: 'https://picsum.photos/seed/music-auction/400/300' },
    { id: 4, title: 'Cinematography for Short Film', artist: 'Vikram D.', sector: 'Cinematography', currentBid: '₹80,000', buyNow: '₹1,20,000', endsIn: '1d 4h', image: 'https://picsum.photos/seed/camera-auction/400/300' },
  ];

  const filteredAuctions = selectedSector === 'All Sectors' ? AUCTIONS : AUCTIONS.filter(a => a.sector === selectedSector);

  return (
    <div className="pt-32 px-6 max-w-7xl mx-auto min-h-screen pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif italic mb-2">Talent <span className="vibrant-text-3">Auction</span></h1>
          <p className="text-white/50">Bid on top talent across the 7 Core Creative Sectors.</p>
        </div>
        <div className="flex flex-col items-start md:items-end gap-4 w-full md:w-auto">
          <button 
            onClick={() => setShowAIPredictor(true)}
            className="flex items-center gap-2 bg-crimson/10 text-crimson border border-crimson/30 px-4 py-2 rounded-xl text-xs font-bold hover:bg-crimson hover:text-white transition-all w-full md:w-auto justify-center md:justify-start"
          >
            <Cpu size={14} /> AI Value Predictor
          </button>
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 overflow-x-auto no-scrollbar w-full md:w-auto">
            {[
              { id: 'browse', label: 'Browse & Bid', icon: Gavel },
              { id: 'upcoming', label: 'Upcoming', icon: Clock },
              { id: 'create', label: 'Create Auction', icon: Plus },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
              { id: 'contracts', label: 'Contracts & Calendar', icon: FileText },
              { id: 'wallet', label: 'My Wallet', icon: Wallet },
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
      </div>

      <AnimatePresence>
        {showAIPredictor && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-cinematic-gray border border-white/10 w-full max-w-lg rounded-3xl p-8 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Cpu className="text-gold" /> AI Value Predictor
                </h2>
                <button onClick={() => setShowAIPredictor(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="text-xs text-white/40 block mb-2">Creative Sector</label>
                  <select className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-gold">
                    {SECTORS.filter(s => s !== 'All Sectors').map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-white/40 block mb-2">Description / Metadata</label>
                  <textarea 
                    placeholder="Enter details for AI valuation (e.g., past experience, project scope)..."
                    className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-sm h-32 resize-none focus:outline-none focus:border-gold"
                  />
                </div>
                <button className="w-full bg-gold text-black py-4 rounded-xl font-bold uppercase tracking-widest hover:scale-[1.02] transition-transform">
                  Predict Market Value
                </button>
                <div className="p-4 bg-white/5 rounded-xl border border-white/5 text-center">
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Estimated Value Range</p>
                  <div className="text-2xl font-bold text-emerald-400">₹ 45,000 - ₹ 60,000</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {activeTab === 'browse' && (
          <motion.div
            key="browse"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Sector Filters */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4 border-b border-white/5">
              {SECTORS.map((sector) => (
                <button
                  key={sector}
                  onClick={() => setSelectedSector(sector)}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors",
                    selectedSector === sector ? "bg-white text-black" : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                  )}
                >
                  {sector}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAuctions.map((auction) => (
                <div key={auction.id} className="glass-panel group overflow-hidden flex flex-col">
                  <div className="h-48 relative shrink-0">
                    <img src={auction.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={auction.title} referrerPolicy="no-referrer" />
                    <div className="absolute top-4 right-4 bg-crimson px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> Live
                    </div>
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest">
                      {auction.sector}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold mb-1">{auction.title}</h3>
                    <p className="text-xs text-white/40 mb-4">By {auction.artist}</p>
                    <div className="flex justify-between items-end mb-6">
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Current Bid</div>
                        <div className="text-xl font-mono font-bold text-gold">{auction.currentBid}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Ends In</div>
                        <div className="text-sm font-bold text-crimson">{auction.endsIn}</div>
                      </div>
                    </div>
                    <div className="mt-auto space-y-3">
                      <div className="flex gap-2">
                        <input type="text" placeholder="Enter amount" className="flex-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gold" />
                        <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-xs font-bold transition-colors">Manual Bid</button>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 bg-gold/10 text-gold border border-gold/20 py-2 rounded-lg text-xs font-bold hover:bg-gold hover:text-black transition-colors flex items-center justify-center gap-2">
                          <Zap size={14} /> Auto Bid
                        </button>
                        <button className="flex-1 bg-white text-black py-2 rounded-lg text-xs font-bold hover:bg-gray-200 transition-colors">
                          Buy Now ({auction.buyNow})
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'create' && (
          <motion.div
            key="create"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl mx-auto glass-panel-purple p-8"
          >
            <h2 className="text-2xl font-bold mb-6">Create New Auction</h2>
            <form className="space-y-6">
              <div>
                <label className="text-xs text-white/40 block mb-2 uppercase tracking-widest">Creative Sector</label>
                <select className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-gold">
                  {SECTORS.filter(s => s !== 'All Sectors').map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-white/40 block mb-2 uppercase tracking-widest">Auction Title</label>
                <input type="text" placeholder="e.g., Lead Role in Indie Feature" className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-gold" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-xs text-white/40 block mb-2 uppercase tracking-widest">Minimum Bid (₹)</label>
                  <input type="number" placeholder="50000" className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-gold" />
                </div>
                <div>
                  <label className="text-xs text-white/40 block mb-2 uppercase tracking-widest">Buy-Now Price (₹)</label>
                  <input type="number" placeholder="150000" className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-gold" />
                </div>
              </div>
              <div>
                <label className="text-xs text-white/40 block mb-2 uppercase tracking-widest">Duration</label>
                <select className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-gold">
                  <option>24 Hours</option>
                  <option>3 Days</option>
                  <option>7 Days</option>
                </select>
              </div>
              <button type="button" className="w-full bg-gold text-black py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-white transition-colors">
                Launch Auction
              </button>
            </form>
          </motion.div>
        )}

        {activeTab === 'analytics' && (
          <motion.div
            key="analytics"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-panel p-6 border-gold/20 bg-gradient-to-br from-gold/5 to-transparent">
                <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Total Auction Revenue</div>
                <div className="text-4xl font-bold text-gold mb-2">₹12,45,000</div>
                <div className="text-xs text-emerald-400 flex items-center gap-1"><TrendingUp size={12} /> +15% this month</div>
              </div>
              <div className="glass-panel p-6">
                <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Active Auctions</div>
                <div className="text-4xl font-bold mb-2">3</div>
                <div className="text-xs text-white/40">Across 2 sectors</div>
              </div>
              <div className="glass-panel p-6">
                <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Average Bid Increase</div>
                <div className="text-4xl font-bold mb-2">24%</div>
                <div className="text-xs text-white/40">Above minimum bid</div>
              </div>
            </div>

            <div className="glass-panel-orange p-8">
              <div className="flex items-center gap-2 mb-6">
                <Trophy size={20} className="text-gold" />
                <h3 className="text-xl font-bold">Weekly Leaderboard</h3>
              </div>
              <div className="space-y-4">
                {[
                  { rank: 1, name: 'Rajesh K.', sector: 'Acting', revenue: '₹4,50,000', trend: 'up' },
                  { rank: 2, name: 'Amit S.', sector: 'Music', revenue: '₹3,20,000', trend: 'up' },
                  { rank: 3, name: 'Meera V.', sector: 'Writing', revenue: '₹2,80,000', trend: 'down' },
                ].map((user) => (
                  <div key={user.rank} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm",
                        user.rank === 1 ? "bg-gold text-black" : "bg-white/10 text-white"
                      )}>
                        #{user.rank}
                      </div>
                      <div>
                        <div className="font-bold">{user.name}</div>
                        <div className="text-xs text-white/40">{user.sector}</div>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-4">
                      <div className="font-bold font-mono">{user.revenue}</div>
                      {user.trend === 'up' ? <TrendingUp size={16} className="text-emerald-400" /> : <ArrowDownRight size={16} className="text-crimson" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'contracts' && (
          <motion.div
            key="contracts"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Digital Contracts */}
            <div className="glass-panel-blue p-8">
              <div className="flex items-center gap-2 mb-6">
                <FileText size={20} className="text-blue-400" />
                <h3 className="text-xl font-bold">Digital Contracts</h3>
              </div>
              <p className="text-sm text-white/60 mb-6">Auto-generated agreements for won auctions.</p>
              <div className="space-y-4">
                {[
                  { title: 'Lead Role: "The Silent Valley"', date: 'Oct 15, 2023', status: 'Signed' },
                  { title: 'Cinematography: "Urban Ad"', date: 'Oct 10, 2023', status: 'Pending Signature' },
                ].map((contract, i) => (
                  <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/10 flex justify-between items-center">
                    <div>
                      <div className="font-bold text-sm mb-1">{contract.title}</div>
                      <div className="text-[10px] text-white/40 uppercase tracking-widest">{contract.date}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={cn(
                        "text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded",
                        contract.status === 'Signed' ? "bg-emerald-500/20 text-emerald-400" : "bg-gold/20 text-gold"
                      )}>
                        {contract.status}
                      </span>
                      <button className="text-white/40 hover:text-white"><ChevronRight size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Calendar & Reviews */}
            <div className="space-y-8">
              <div className="glass-panel-green p-8">
                <div className="flex items-center gap-2 mb-6">
                  <Calendar size={20} className="text-gold" />
                  <h3 className="text-xl font-bold">Calendar Integration</h3>
                </div>
                <p className="text-sm text-white/60 mb-4">Bookings from won auctions are automatically added to your schedule.</p>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-start gap-4">
                  <div className="w-12 h-12 rounded bg-gold/20 flex flex-col items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold uppercase text-gold">Oct</span>
                    <span className="text-lg font-bold text-gold">24</span>
                  </div>
                  <div>
                    <div className="font-bold text-sm mb-1">Shoot: "The Silent Valley"</div>
                    <div className="text-xs text-white/40">Mumbai Studio • 9:00 AM - 6:00 PM</div>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-8">
                <div className="flex items-center gap-2 mb-6">
                  <Star size={20} className="text-gold" />
                  <h3 className="text-xl font-bold">Ratings & Reviews</h3>
                </div>
                <p className="text-sm text-white/60 mb-4">Mutual ratings impact future auction visibility and trust scores.</p>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-bold text-sm">Review from Studio X</div>
                    <div className="flex text-gold"><Star size={12} className="fill-gold" /><Star size={12} className="fill-gold" /><Star size={12} className="fill-gold" /><Star size={12} className="fill-gold" /><Star size={12} className="fill-gold" /></div>
                  </div>
                  <p className="text-xs text-white/60 italic">"Exceptional talent, highly professional on set. Looking forward to working together again."</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        {activeTab === 'upcoming' && (
          <motion.div
            key="upcoming"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass-panel p-12 text-center"
          >
            <Clock size={48} className="mx-auto mb-6 text-white/20" />
            <h2 className="text-2xl font-bold mb-2">Upcoming Auctions</h2>
            <p className="text-white/40">New talent and creative assets are being verified. Stay tuned.</p>
          </motion.div>
        )}

        {activeTab === 'wallet' && (
          <motion.div
            key="wallet"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <div className="lg:col-span-1 glass-panel p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gold/20 rounded-2xl flex items-center justify-center">
                  <Wallet className="text-gold" size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">₹45,200</h3>
                  <p className="text-xs text-white/40">Available Balance</p>
                </div>
              </div>
              <div className="space-y-4">
                <button className="w-full bg-gold text-black py-4 rounded-xl font-bold text-sm">Add Funds</button>
                <button className="w-full bg-white/5 border border-white/10 py-4 rounded-xl font-bold text-sm">Withdraw</button>
              </div>
            </div>
            <div className="lg:col-span-2 glass-panel p-8">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Trophy size={20} className="text-gold" /> Rewards & Gamification</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                  <div className="text-3xl font-bold text-gold mb-1">1,240</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/40">SosrG Coins</div>
                  <p className="text-[10px] text-emerald-400 mt-2">Convert to ₹124 Voucher</p>
                </div>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                  <div className="text-3xl font-bold text-crimson mb-1">#12</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/40">Weekly Leaderboard</div>
                  <p className="text-[10px] text-white/40 mt-2">Top 10 get 500 Coins</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ArtMartContent = () => {
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

const ProfileSetupFlow = ({ onComplete }: { onComplete: (data: any) => void }) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    phone: '',
    otp: '',
    kycDocument: null as File | null,
    type: 'artist' as ProfileType,
    industry: '',
    secondaryIndustry: '',
    profession: '',
    services: [] as string[],
    portfolio: null as File | null,
    sosrgId: '',
  });
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStep, setVerificationStep] = useState(0);

  const verificationSteps = [
    { label: 'Portfolio Scanning', icon: Search },
    { label: 'Voice & Face Matching', icon: User },
    { label: 'Experience Tagging', icon: Zap },
    { label: 'Industry Standard Benchmarking', icon: TrendingUp },
    { label: 'Green ID Activation', icon: ShieldCheck },
  ];

  const industries = [
    { id: 'Theatre', name: 'Theatre', icon: Theater },
    { id: 'Cinema', name: 'Cinema', icon: Film },
    { id: 'Literature', name: 'Literature', icon: PenTool },
    { id: 'Music', name: 'Music', icon: Music },
    { id: 'Dance', name: 'Dance', icon: Zap }, // Using Zap as a placeholder for Dance
    { id: 'Art', name: 'Art', icon: ShoppingBag }, // Using ShoppingBag as a placeholder for Art
    { id: 'Crafts', name: 'Crafts', icon: Briefcase }, // Using Briefcase as a placeholder for Crafts
  ];
  
  const creatorProfessions: Record<string, string[]> = {
    'Theatre': [
      'Theatre Actor', 'Theatre Director', 'Play Director', 'Nukkad Natak Trainer',
      'Light Operator', 'Music Operator', 'Makeup Artist (Stage)', 'Set Designer (Stage)',
      'Costume Designer', 'Anchor / Host', 'Stage Performer', 'Comedian',
      'Mimicry Artist', 'Storyteller'
    ],
    'Cinema': [
      'Film Actor', 'Method Actor', 'Voice Actor', 'Background Actor', 'Character Actor',
      'Film Director', 'Assistant Director', 'Associate Director', 'Creative Director',
      'AD Filmmaker', 'Documentary Filmmaker', 'Experimental Filmmaker', 'Film Producer',
      'Line Producer', 'Executive Producer', 'Production Manager', 'Director of Photography (DOP)',
      'Cinematographer', 'Assistant Cinematographer', 'Videographer', 'Film Editor',
      'Assistant Editor', 'Sound Engineer', 'Sound Designer', 'Sound Recordist',
      'Makeup Artist', 'Set Designer', 'Costume Designer'
    ],
    'Literature': [
      'Story Writer', 'Script Writer', 'Poet / Shayar', 'Content Writer', 'News Writer',
      'Copywriter', 'Proofreader', 'Editor', 'Chief Editor', 'Journalist', 'Reporter', 'Correspondent'
    ],
    'Music': [
      'Singer', 'Vocal Artist', 'Music Composer', 'Music Director', 'Musician',
      'Instrumentalist', 'Instrument Trainer', 'Music Trainer', 'Radio Jockey (RJ)',
      'Disc Jockey (DJ)', 'Music Producer'
    ],
    'Dance': [
      'Dancer', 'Dance Trainer', 'Choreographer', 'Folk Dancer', 'Stage Performer'
    ],
    'Art': [
      'Painter', 'Doodle Artist', 'Digital Artist', 'Cartoonist', 'Pencil Sketch Artist',
      'Portrait Artist', 'Mural Artist', 'Calligrapher', 'Rangoli Artist', 'Mehandi Artist',
      'Tattoo Artist', 'Printmaker', 'Glass Artist', 'Fibre Artist', '2D-3D Animator',
      'Graphic Designer', 'Logo Maker', 'Mascot Maker', 'Thumbnail Poster Maker',
      'Artist Portfolio Maker', 'Photographer (All Categories)'
    ],
    'Crafts': [
      'Clay Modelling Artist', 'Wooden Craftsman', 'Paper Craft Artist', 'Sculptor',
      'Kabadi Se Jugadi Artist', 'Art Tools Manufacturer'
    ],
  };

  const businessProfessions: Record<string, string[]> = {
    'Theatre': [
      'Theatre Group', 'Acting School', 'Performing Arts Auditorium', 'Theatre Production House',
      'Stage Equipment Provider', 'Costume Store', 'Properties Store'
    ],
    'Cinema': [
      'Film Production House', 'Casting Company', 'Video Shooting/Editing Company',
      'VFX Studio', 'Animation Studio', 'Foley Studio', 'Film School',
      'Shooting Location Provider', 'Equipment Rental Company'
    ],
    'Literature': [
      'Publishing House', 'Literary Library', 'Print Media House', 'News Agency',
      'Digital Media Agency', 'Radio Channel', 'TV Channel'
    ],
    'Music': [
      'Music Production House', 'Music Studio', 'Music Academy', 'Orchestra',
      'Music Band', 'Music Club', 'Radio Channel'
    ],
    'Dance': [
      'Dance Studio', 'Dance Academy', 'Event Dance Company', 'Cultural Performance Group'
    ],
    'Art': [
      'Art Gallery', 'Art Museum', 'Art & Craft Studio', 'Print Design Studio',
      'Design Institute', 'Photo Studio', 'Photography Club', 'Gaming Studio',
      'Software Agency', 'Web Design Agency'
    ],
    'Crafts': [
      'Art & Craft Academy', 'Craft Store', 'Material Supply Store', 'Handicraft Export Company',
      'Craft Training Centre'
    ],
  };

  const serviceCategories = [
    {
      name: 'Education Services',
      items: ['Acting Training', 'Camera Handling', 'Editing Tools Training', 'Dance Training', 'Singing Practice', 'Instrument Playing', 'Craft Making', 'Designing']
    },
    {
      name: 'Entertainment Services',
      items: ['Feature Film', 'Web Series', 'Short Film', 'Ad Film', 'Music Album', 'Documentary', 'Showreel Creation', 'Pre-Wedding Shoot', 'Podcast', 'Dance Video']
    },
    {
      name: 'Event Services',
      items: ['Audition', 'Workshop', 'Fashion Show', 'Film Festival', 'Award Show', 'Musical Concert', 'Exhibition']
    },
    {
      name: 'Brand Promotion Services',
      items: ['Logo Design', 'Website Development', 'App Development', 'Social Media Handling', 'Portfolio Creation', 'Posters & Brochure', 'Animated Ads']
    }
  ];

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleVerify = async () => {
    setIsVerifying(true);
    
    // Simulate detailed AI Verification steps
    for (let i = 0; i < verificationSteps.length; i++) {
      setVerificationStep(i);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
    
    // Assign a level based on some "logic" (random for now but could be based on portfolio)
    const levels: ExperienceLevel[] = ['fresher', 'intermediate', 'expert'];
    const assignedLevel = levels[Math.floor(Math.random() * levels.length)];
    
    // Generate unique SosrG ID
    const sosrgId = `SOSRG-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    setIsVerifying(false);
    onComplete({ ...data, level: assignedLevel, hasGreenId: true, sosrgId });
  };

  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="mb-12">
        <div className="flex justify-between mb-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
            <div 
              key={s} 
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all border-2",
                step === s ? "bg-gold text-black border-gold" : step > s ? "bg-emerald-500 text-white border-emerald-500" : "bg-white/5 text-white/40 border-white/10"
              )}
            >
              {step > s ? <Check size={18} /> : s}
            </div>
          ))}
        </div>
        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gold" 
            initial={{ width: 0 }}
            animate={{ width: `${(step / 8) * 100}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">OTP Login</h2>
              <p className="text-white/40">Enter your mobile number to get started.</p>
            </div>
            <div className="space-y-4 max-w-sm mx-auto">
              <div>
                <label className="text-sm text-white/60 mb-2 block">Mobile Number</label>
                <input 
                  type="tel" 
                  value={data.phone}
                  onChange={(e) => setData({ ...data, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-gold"
                />
              </div>
              {data.phone.length >= 10 && (
                <div>
                  <label className="text-sm text-white/60 mb-2 block">Enter OTP</label>
                  <input 
                    type="text" 
                    value={data.otp}
                    onChange={(e) => setData({ ...data, otp: e.target.value })}
                    placeholder="123456"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-gold tracking-[0.5em] text-center font-mono"
                  />
                </div>
              )}
            </div>
            <div className="flex justify-end items-center pt-8 max-w-sm mx-auto">
              <button 
                onClick={nextStep} 
                disabled={data.otp.length < 6}
                className="bg-gold text-black px-8 py-3 rounded-xl font-bold disabled:opacity-50 w-full"
              >
                Verify & Continue
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">Mandatory KYC</h2>
              <p className="text-white/40">Upload a government-issued ID for verification.</p>
            </div>
            <div className="border-2 border-dashed border-white/10 rounded-3xl p-12 text-center hover:border-gold/50 transition-colors cursor-pointer group max-w-md mx-auto">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 transition-colors">
                <ShieldCheck className="text-white/40 group-hover:text-gold" size={24} />
              </div>
              <p className="font-bold mb-1">Upload Aadhar / PAN / Passport</p>
              <p className="text-xs text-white/20">PDF, JPG, PNG (Max 5MB)</p>
              <input type="file" className="hidden" onChange={(e) => {
                if (e.target.files?.[0]) {
                  setData({ ...data, kycDocument: e.target.files[0] });
                }
              }} id="kyc-upload" />
              <label htmlFor="kyc-upload" className="absolute inset-0 cursor-pointer" />
              {data.kycDocument && (
                <div className="mt-4 text-emerald-400 text-sm flex items-center justify-center gap-2">
                  <CheckCircle size={16} /> Document uploaded successfully
                </div>
              )}
            </div>
            <div className="flex justify-between items-center pt-8 max-w-md mx-auto">
              <button onClick={prevStep} className="text-white/40 hover:text-white text-sm">Back</button>
              <button 
                onClick={nextStep} 
                disabled={!data.kycDocument}
                className="bg-gold text-black px-8 py-3 rounded-xl font-bold disabled:opacity-50"
              >
                Continue
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">Choose Profile Type</h2>
              <p className="text-white/40">Select your role in the SosrG ecosystem.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { id: 'artist', label: 'Artist', icon: User, desc: 'Individual creators, actors, writers, etc.' },
                { id: 'buyer', label: 'Buyer', icon: ShoppingBag, desc: 'Looking to hire talent or buy assets.' },
                { id: 'business', label: 'Business/Brand', icon: Briefcase, desc: 'Production houses, agencies, studios.' },
                { id: 'casting_director', label: 'Casting Director', icon: Video, desc: 'Casting professionals and scouts.' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => { setData({ ...data, type: t.id as ProfileType }); nextStep(); }}
                  className={cn(
                    "p-8 rounded-3xl border-2 text-left transition-all group",
                    data.type === t.id ? "bg-gold/10 border-gold shadow-[0_0_30px_rgba(212,175,55,0.1)]" : "bg-white/5 border-white/10 hover:border-white/30"
                  )}
                >
                  <t.icon size={32} className={cn("mb-4", data.type === t.id ? "text-gold" : "text-white/40")} />
                  <h3 className="text-xl font-bold mb-2">{t.label}</h3>
                  <p className="text-sm text-white/40">{t.desc}</p>
                </button>
              ))}
            </div>
            <div className="flex justify-between items-center pt-8">
              <button onClick={prevStep} className="text-white/40 hover:text-white text-sm">Back</button>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">Select Industries</h2>
              <p className="text-white/40">Select your Primary Industry (required) and an optional Secondary Industry.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {industries.map((ind) => (
                <button
                  key={ind.id}
                  onClick={() => {
                    if (!data.industry) {
                      setData({ ...data, industry: ind.id });
                    } else if (data.industry === ind.id) {
                      setData({ ...data, industry: '', secondaryIndustry: '' });
                    } else if (data.secondaryIndustry === ind.id) {
                      setData({ ...data, secondaryIndustry: '' });
                    } else {
                      setData({ ...data, secondaryIndustry: ind.id });
                    }
                  }}
                  className={cn(
                    "p-6 rounded-2xl border transition-all text-center flex flex-col items-center gap-2",
                    data.industry === ind.id ? "bg-gold text-black border-gold" : 
                    data.secondaryIndustry === ind.id ? "bg-gold/20 border-gold/50 text-gold" :
                    "bg-white/5 border-white/10 hover:border-white/30"
                  )}
                >
                  <ind.icon size={24} />
                  <span className="font-bold text-sm">{ind.name}</span>
                  {data.industry === ind.id && <span className="text-[8px] uppercase font-bold">Primary</span>}
                  {data.secondaryIndustry === ind.id && <span className="text-[8px] uppercase font-bold">Secondary</span>}
                </button>
              ))}
            </div>
            <div className="flex justify-between items-center pt-8">
              <button onClick={prevStep} className="text-white/40 hover:text-white text-sm">Back</button>
              <button 
                onClick={nextStep} 
                disabled={!data.industry}
                className="bg-gold text-black px-8 py-3 rounded-xl font-bold disabled:opacity-50"
              >
                Continue
              </button>
            </div>
          </motion.div>
        )}

        {step === 5 && (
          <motion.div
            key="step5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">Select Profession</h2>
              <p className="text-white/40">What is your specific role in {data.industry}?</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2 no-scrollbar">
              {(data.type === 'artist' ? creatorProfessions[data.industry] : businessProfessions[data.industry] || ['General Professional']).map((prof) => (
                <button
                  key={prof}
                  onClick={() => { setData({ ...data, profession: prof }); nextStep(); }}
                  className={cn(
                    "p-6 rounded-2xl border transition-all text-left flex justify-between items-center group",
                    data.profession === prof ? "bg-gold text-black border-gold" : "bg-white/5 border-white/10 hover:border-white/30"
                  )}
                >
                  <span className="font-bold text-sm">{prof}</span>
                  <ChevronRight size={18} className={data.profession === prof ? "text-black" : "text-white/20 group-hover:text-white"} />
                </button>
              ))}
            </div>
            <button onClick={prevStep} className="text-white/40 hover:text-white text-sm">Back</button>
          </motion.div>
        )}

        {step === 6 && (
          <motion.div
            key="step6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">Select Services</h2>
              <p className="text-white/40">Select the services you offer across different categories.</p>
            </div>
            <div className="space-y-8 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
              {serviceCategories.map((category) => (
                <div key={category.name} className="space-y-4">
                  <h3 className="text-sm font-bold text-gold uppercase tracking-widest flex items-center gap-2">
                    <Star size={14} /> {category.name}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {category.items.map((svc) => (
                      <button
                        key={svc}
                        onClick={() => {
                          const newServices = data.services.includes(svc) 
                            ? data.services.filter(s => s !== svc)
                            : [...data.services, svc];
                          setData({ ...data, services: newServices });
                        }}
                        className={cn(
                          "p-3 rounded-xl border transition-all text-left flex justify-between items-center text-xs",
                          data.services.includes(svc) ? "bg-gold/20 border-gold text-gold" : "bg-white/5 border-white/10 hover:border-white/30"
                        )}
                      >
                        <span className="font-medium">{svc}</span>
                        {data.services.includes(svc) && <Check size={14} />}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center pt-8">
              <button onClick={prevStep} className="text-white/40 hover:text-white text-sm">Back</button>
              <button 
                onClick={nextStep} 
                disabled={data.services.length === 0}
                className="bg-gold text-black px-8 py-3 rounded-xl font-bold disabled:opacity-50"
              >
                Continue
              </button>
            </div>
          </motion.div>
        )}

        {step === 7 && (
          <motion.div
            key="step7"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">Upload Work Samples</h2>
              <p className="text-white/40">Showcase your best work to get verified.</p>
            </div>
            <div className="border-2 border-dashed border-white/10 rounded-3xl p-12 text-center hover:border-gold/50 transition-colors cursor-pointer group">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 transition-colors">
                <Upload className="text-white/40 group-hover:text-gold" size={24} />
              </div>
              <p className="font-bold mb-1">Click or drag to upload</p>
              <p className="text-xs text-white/20">PDF, JPG, PNG or MP4 (Max 50MB)</p>
              <input type="file" className="hidden" onChange={(e) => {
                if (e.target.files?.[0]) {
                  setData({ ...data, portfolio: e.target.files[0] });
                  nextStep();
                }
              }} id="portfolio-upload" />
              <label htmlFor="portfolio-upload" className="absolute inset-0 cursor-pointer" />
            </div>
            <button onClick={prevStep} className="text-white/40 hover:text-white text-sm">Back</button>
          </motion.div>
        )}

        {step === 8 && (
          <motion.div
            key="step8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8 text-center"
          >
            {!isVerifying ? (
              <>
                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShieldCheck className="text-emerald-500" size={40} />
                </div>
                <h2 className="text-3xl font-bold mb-2">AI Verification</h2>
                <p className="text-white/40 mb-8">Our smart engine will analyze your portfolio to verify your skills and assign your experience level.</p>
                <button 
                  onClick={handleVerify}
                  className="w-full bg-gold text-black py-4 rounded-xl font-bold uppercase tracking-widest gold-glow"
                >
                  Start Verification
                </button>
              </>
            ) : (
              <div className="py-12">
                <div className="relative w-24 h-24 mx-auto mb-12">
                  <div className="absolute inset-0 border-4 border-gold/20 rounded-full" />
                  <motion.div 
                    className="absolute inset-0 border-4 border-gold border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <Cpu className="absolute inset-0 m-auto text-gold" size={32} />
                </div>
                
                <div className="space-y-6 max-w-sm mx-auto">
                  {verificationSteps.map((vStep, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ 
                        opacity: idx <= verificationStep ? 1 : 0.3,
                        x: 0,
                        color: idx === verificationStep ? '#D4AF37' : idx < verificationStep ? '#10b981' : '#ffffff'
                      }}
                      className="flex items-center gap-4 text-left"
                    >
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center border",
                        idx < verificationStep ? "bg-emerald-500/20 border-emerald-500" : 
                        idx === verificationStep ? "bg-gold/20 border-gold animate-pulse" : "bg-white/5 border-white/10"
                      )}>
                        {idx < verificationStep ? <CheckCircle size={14} /> : <vStep.icon size={14} />}
                      </div>
                      <div>
                        <div className="text-sm font-bold">{vStep.label}</div>
                        {idx === verificationStep && (
                          <div className="text-[10px] opacity-60 uppercase tracking-widest">Processing...</div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProfileSystem = ({ initialType = 'artist' }: { initialType?: ProfileType }) => {
  const [isSettingUp, setIsSettingUp] = useState(false);
  const [profile, setProfile] = useState({
    type: initialType,
    industry: 'Cinema',
    secondaryIndustry: 'Theatre',
    profession: initialType === 'artist' ? 'Method Actor & Scriptwriter' : 'Production House',
    level: 'intermediate' as ExperienceLevel,
    name: initialType === 'artist' ? 'SiDdhaRtha SosrG' : 'SosrG Productions',
    location: 'Mumbai, India',
    hasGreenId: true,
    sosrgId: 'SOSRG-A1B2C3D4E',
    gender: 'Male',
    bio: initialType === 'artist' ? 'Passionate method actor with 5 years of experience in regional cinema.' : 'Leading production house specializing in regional cinema.',
    skills: ['Method Acting', 'Voice Over', 'Scriptwriting', 'Improv'],
    socialLinks: {
      instagram: '@arjun.mehta',
      youtube: 'SiDdhaRtha SosrG Official',
      website: 'arjunmehta.com'
    },
    physicalAttributes: {
      height: '5\'10"',
      weight: '75kg',
      eyeColor: 'Brown',
      hairColor: 'Black'
    },
    experienceCategories: ['Feature Films', 'Short Films', 'Commercials'],
    comfortDeclaration: ['Action', 'Drama', 'Romance'],
    availability: 'Full-time',
    companyInfo: {
      legalStatus: 'Private Limited',
      address: 'Andheri West, Mumbai',
      website: 'sosrgproductions.com',
      businessRole: 'Production House'
    }
  });

  useEffect(() => {
    setProfile(prev => ({
      ...prev,
      type: initialType,
      name: initialType === 'artist' ? 'SiDdhaRtha SosrG' : 'SosrG Productions',
      profession: initialType === 'artist' ? 'Method Actor & Scriptwriter' : 'Production House',
      bio: initialType === 'artist' ? 'Passionate method actor with 5 years of experience in regional cinema.' : 'Leading production house specializing in regional cinema.',
    }));
  }, [initialType]);

  const [activeTab, setActiveTab] = useState('wallet');

  const stats = {
    artist: {
      fresher: { projects: 4, rating: 4.2, views: '1.2k', earnings: '₹15k' },
      intermediate: { projects: 12, rating: 4.8, views: '15k', earnings: '₹2.4L' },
      expert: { projects: 45, rating: 5.0, views: '250k', earnings: '₹18L' },
    },
    buyer: {
      fresher: { projects: 2, rating: 4.0, views: '500', earnings: '₹50k Spent' },
      intermediate: { projects: 10, rating: 4.5, views: '5k', earnings: '₹5L Spent' },
      expert: { projects: 30, rating: 4.9, views: '50k', earnings: '₹20L Spent' },
    },
    business: {
      fresher: { clients: 2, team: 3, revenue: '₹5L', rating: 4.0 },
      intermediate: { clients: 15, team: 12, revenue: '₹45L', rating: 4.6 },
      expert: { clients: 80, team: 50, revenue: '₹3.2Cr', rating: 4.9 },
    },
    casting_director: {
      fresher: { projects: 3, rating: 4.1, views: '2k', earnings: '10 Talents Cast' },
      intermediate: { projects: 15, rating: 4.7, views: '20k', earnings: '150 Talents Cast' },
      expert: { projects: 60, rating: 4.9, views: '500k', earnings: '1000+ Talents Cast' },
    }
  };

  const currentStats = stats[profile.type][profile.level] || stats.artist.intermediate;

  return (
    <div className="pt-32 px-6 max-w-7xl mx-auto min-h-screen pb-24">
      {isSettingUp ? (
        <ProfileSetupFlow onComplete={(data) => {
          setProfile({
            ...profile,
            type: data.type,
            industry: data.industry,
            secondaryIndustry: data.secondaryIndustry,
            profession: data.profession,
            level: data.level,
            name: data.type === 'artist' ? 'SiDdhaRtha SosrG' : data.type === 'buyer' ? 'John Doe' : data.type === 'casting_director' ? 'Sarah Smith' : 'SosrG Productions',
            hasGreenId: data.hasGreenId,
            sosrgId: data.sosrgId || profile.sosrgId
          });
          setIsSettingUp(false);
        }} />
      ) : (
        <>
          {/* Profile Header & Controls */}
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start mb-12 gap-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-2xl border-2 border-gold p-1 overflow-hidden">
                  <img 
                    src={profile.type === 'artist' ? "https://picsum.photos/seed/creator/200/200" : "https://picsum.photos/seed/business/200/200"} 
                    className="w-full h-full object-cover rounded-xl" 
                    alt="Profile" 
                    referrerPolicy="no-referrer" 
                  />
                </div>
                <div className={cn(
                  "absolute -bottom-2 -right-2 px-2 py-1 rounded text-[8px] font-bold uppercase tracking-widest shadow-lg",
                  profile.level === 'expert' ? "bg-gold text-black" : profile.level === 'intermediate' ? "bg-blue-500 text-white" : "bg-emerald-500 text-white"
                )}>
                  {profile.level}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-3 mb-1">
                  <h1 className="text-3xl font-bold">{profile.name}</h1>
                  <ShieldCheck className="text-blue-400" size={20} />
                </div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-3">
                  <span className="text-gold font-mono text-sm bg-gold/10 px-2 py-1 rounded">{profile.sosrgId}</span>
                  <span className="text-white/20">•</span>
                  <span className="text-white/80 text-sm font-medium">{profile.profession}</span>
                  <span className="text-white/20">•</span>
                  <span className="text-gold text-xs font-bold uppercase tracking-wider">{profile.industry}</span>
                  {profile.secondaryIndustry && (
                    <>
                      <span className="text-white/20">•</span>
                      <span className="text-white/40 text-xs font-bold uppercase tracking-wider">{profile.secondaryIndustry}</span>
                    </>
                  )}
                </div>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                  <span className="bg-white/5 border border-white/10 px-2 py-1 rounded text-[10px] text-white/60">{profile.location}</span>
                  <span className="bg-gold/10 border border-gold/20 px-2 py-1 rounded text-[10px] text-gold font-bold flex items-center gap-1">
                    <Star size={10} className="fill-gold" /> 4.8 Rating
                  </span>
                  {profile.hasGreenId && (
                    <span className="bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                      <ShieldCheck size={10} /> Green ID Active
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <button 
                onClick={() => setIsSettingUp(true)}
                className="flex items-center justify-center gap-2 px-6 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
              >
                <Settings size={14} /> Edit Profile
              </button>
              <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                {(['artist', 'business'] as ProfileType[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setProfile({ ...profile, type: t })}
                    className={cn(
                      "px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all",
                      profile.type === t ? "bg-gold text-black" : "text-white/40 hover:text-white"
                    )}
                  >
                    {t === 'artist' ? 'Creator' : 'Business'}
                  </button>
                ))}
              </div>
              <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                {(['fresher', 'intermediate', 'expert'] as ExperienceLevel[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setProfile({ ...profile, level: l })}
                    className={cn(
                      "px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all",
                      profile.level === l ? "bg-crimson text-white" : "text-white/40 hover:text-white"
                    )}
                  >
                    {l[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {Object.entries(currentStats).map(([key, value]) => (
              <div key={key} className="glass-panel p-6 text-center group hover:border-gold/30 transition-all">
                <div className="text-2xl font-bold text-gold mb-1">{value}</div>
                <div className="text-[10px] uppercase tracking-widest text-white/40 group-hover:text-white/60 transition-colors">{key}</div>
              </div>
            ))}
          </div>

          {/* Dashboard Tabs */}
          <div className="flex overflow-x-auto no-scrollbar gap-4 mb-8 border-b border-white/5 pb-4">
            {[
              { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
              { id: 'discovery', label: 'Smart Discovery', icon: Search },
              { id: 'profile-details', label: 'Profile Details', icon: User },
              { id: 'wallet', label: 'Wallet Overview', icon: Wallet },
              { id: 'finances', label: 'Finances', icon: Wallet },
              { id: 'bookings', label: 'Booking History', icon: Calendar },
              { id: 'network', label: 'My Network', icon: Users },
              { id: 'counselling', label: 'Counselling', icon: HeartHandshake },
              { id: 'management', label: 'Management', icon: Briefcase },
              { id: 'notifications', label: 'Notifications', icon: MessageSquare },
              { id: 'membership', label: 'Membership', icon: Star },
              { id: 'reviews', label: 'Reviews', icon: Star },
              { id: 'services', label: 'Services & Gigs', icon: Briefcase },
              { id: 'privacy', label: 'Privacy & Security', icon: ShieldCheck },
              ...(profile.type === 'artist' ? [
                { id: 'portfolio', label: 'Portfolio Manager', icon: User },
                { id: 'auditions', label: 'Auditions Applied', icon: Mic },
                { id: 'availability', label: 'Availability Calendar', icon: Calendar },
                { id: 'ai-insights', label: 'AI Match Suggestions', icon: Zap },
              ] : [
                { id: 'projects', label: 'Post New Project', icon: Briefcase },
                { id: 'casting', label: 'Casting Panel', icon: Users },
                { id: 'budget', label: 'Budget Manager', icon: Calculator },
                { id: 'workflow', label: 'Workflow Tracker', icon: Settings },
              ]),
              { id: 'legal', label: 'Contracts Vault', icon: ShieldCheck },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all",
                  activeTab === tab.id ? "bg-white/10 text-gold border border-gold/20" : "text-white/40 hover:text-white"
                )}
              >
                <tab.icon size={16} /> {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'discovery' && (
              <motion.div
                key="discovery"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Search & Filters */}
                <div className="glass-panel p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
                      <input 
                        type="text" 
                        placeholder="Search by skill, name, or keywords..." 
                        className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-gold/50 transition-colors"
                      />
                    </div>
                    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
                      <select className="bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold/50">
                        <option>All Skills</option>
                        <option>Acting</option>
                        <option>Direction</option>
                        <option>Cinematography</option>
                      </select>
                      <select className="bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold/50">
                        <option>Any Rating</option>
                        <option>4.5 & Above</option>
                        <option>4.0 & Above</option>
                      </select>
                      <select className="bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold/50">
                        <option>Any Location</option>
                        <option>Mumbai</option>
                        <option>Delhi</option>
                        <option>Remote</option>
                      </select>
                      <button className="flex items-center gap-2 bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm whitespace-nowrap hover:bg-white/5 transition-colors">
                        <ShieldCheck size={16} className="text-emerald-400" /> Verified Only
                      </button>
                    </div>
                  </div>
                </div>

                {/* Trending Section */}
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <TrendingUp className="text-gold" size={24} />
                    <h2 className="text-2xl font-bold">Trending Now</h2>
                    <span className="bg-gold/10 text-gold text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded ml-2">AI Curated</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { name: 'Priya Sharma', role: 'Method Actor', rating: 4.9, views: '12k', image: 'https://picsum.photos/seed/priya/400/400', verified: true },
                      { name: 'Rahul Verma', role: 'Cinematographer', rating: 4.8, views: '8.5k', image: 'https://picsum.photos/seed/rahul/400/400', verified: true },
                      { name: 'Aditi Desai', role: 'Screenwriter', rating: 4.7, views: '6.2k', image: 'https://picsum.photos/seed/aditi/400/400', verified: false },
                      { name: 'Vikram Singh', role: 'Director', rating: 4.9, views: '15k', image: 'https://picsum.photos/seed/vikram/400/400', verified: true },
                    ].map((talent, i) => (
                      <div key={i} className="glass-panel p-4 group cursor-pointer hover:border-gold/30 transition-colors">
                        <div className="aspect-square rounded-xl overflow-hidden mb-4 relative">
                          <img src={talent.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={talent.name} referrerPolicy="no-referrer" />
                          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1">
                            <TrendingUp size={10} className="text-gold" /> {talent.views}
                          </div>
                        </div>
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-bold flex items-center gap-1">
                            {talent.name}
                            {talent.verified && <ShieldCheck size={14} className="text-emerald-400" />}
                          </h3>
                          <div className="flex items-center gap-1 text-xs font-bold text-gold">
                            <Star size={10} className="fill-gold" /> {talent.rating}
                          </div>
                        </div>
                        <p className="text-xs text-white/40">{talent.role}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Personalised Suggestions */}
                <div className="glass-panel p-8 bg-gradient-to-br from-blue-500/5 to-transparent border-blue-500/20">
                  <div className="flex items-center gap-2 mb-6">
                    <Zap className="text-blue-400" size={24} />
                    <h2 className="text-2xl font-bold">Suggested For You</h2>
                    <span className="text-xs text-white/40 ml-2">Based on your recent activity</span>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors cursor-pointer">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <Briefcase size={20} className="text-blue-400" />
                          </div>
                          <div>
                            <h4 className="font-bold">Feature Film Casting</h4>
                            <p className="text-xs text-white/40">Looking for Method Actors</p>
                          </div>
                        </div>
                        <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">98% Match</span>
                      </div>
                      <p className="text-sm text-white/60 mb-4">A major production house is looking for actors with your specific skill set for an upcoming thriller.</p>
                      <button className="text-xs font-bold uppercase tracking-widest text-blue-400 hover:text-blue-300 flex items-center gap-1">
                        View Details <ChevronRight size={14} />
                      </button>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors cursor-pointer">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                            <User size={20} className="text-gold" />
                          </div>
                          <div>
                            <h4 className="font-bold">Collaborator Suggestion</h4>
                            <p className="text-xs text-white/40">Cinematographer</p>
                          </div>
                        </div>
                        <span className="bg-gold/20 text-gold text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">High Synergy</span>
                      </div>
                      <p className="text-sm text-white/60 mb-4">You frequently work on projects similar to Rahul Verma's portfolio. Connecting could lead to great collaborations.</p>
                      <button className="text-xs font-bold uppercase tracking-widest text-gold hover:text-yellow-400 flex items-center gap-1">
                        Connect <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'profile-details' && (
              <motion.div
                key="profile-details"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-8">
                    {/* Basic Info */}
                    <div className="glass-panel-pink p-8">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold">Basic Information</h3>
                        <button className="text-xs text-gold hover:underline flex items-center gap-1"><Settings size={14} /> Edit</button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Full Name</div>
                          <div className="font-bold">{profile.name}</div>
                        </div>
                        <div>
                          <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Gender</div>
                          <div className="font-bold">{profile.gender}</div>
                        </div>
                        <div>
                          <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Profession</div>
                          <div className="font-bold">{profile.profession}</div>
                        </div>
                        <div>
                          <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Location</div>
                          <div className="font-bold">{profile.location}</div>
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Bio</div>
                        <p className="text-sm text-white/80 leading-relaxed">{profile.bio}</p>
                      </div>
                      <div className="mt-6">
                        <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Skill Tags</div>
                        <div className="flex flex-wrap gap-2">
                          {profile.skills.map((skill, i) => (
                            <span key={i} className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-xs font-medium">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Conditional Advanced Module */}
                    {profile.type === 'artist' && (
                      <div className="glass-panel-purple p-8">
                        <div className="flex justify-between items-center mb-6">
                          <h3 className="text-xl font-bold flex items-center gap-2"><Star size={20} className="text-gold" /> Actor/Model Advanced Module</h3>
                          <button className="text-xs text-gold hover:underline">Edit Module</button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                            <h4 className="text-sm font-bold text-white/60 uppercase tracking-widest mb-4 border-b border-white/10 pb-2">Physical Attributes</h4>
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span className="text-white/40 text-sm">Height</span>
                                <span className="font-bold text-sm">{profile.physicalAttributes.height}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white/40 text-sm">Weight</span>
                                <span className="font-bold text-sm">{profile.physicalAttributes.weight}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white/40 text-sm">Eye Color</span>
                                <span className="font-bold text-sm">{profile.physicalAttributes.eyeColor}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white/40 text-sm">Hair Color</span>
                                <span className="font-bold text-sm">{profile.physicalAttributes.hairColor}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-6">
                            <div>
                              <h4 className="text-sm font-bold text-white/60 uppercase tracking-widest mb-3 border-b border-white/10 pb-2">Experience Categories</h4>
                              <div className="flex flex-wrap gap-2">
                                {profile.experienceCategories.map((cat, i) => (
                                  <span key={i} className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                                    {cat}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-white/60 uppercase tracking-widest mb-3 border-b border-white/10 pb-2">Comfort Declaration</h4>
                              <div className="flex flex-wrap gap-2">
                                {profile.comfortDeclaration.map((dec, i) => (
                                  <span key={i} className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                                    {dec}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-white/60 uppercase tracking-widest mb-3 border-b border-white/10 pb-2">Availability</h4>
                              <span className="bg-gold/10 text-gold border border-gold/20 px-3 py-1 rounded-full text-xs font-bold">
                                {profile.availability}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
                          <div className="text-sm text-white/60">Generate a casting-ready digital resume instantly.</div>
                          <button className="bg-gold text-black px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors flex items-center gap-2">
                            <FileText size={14} /> Generate Resume
                          </button>
                        </div>
                      </div>
                    )}

                    {profile.type === 'business' && (
                      <div className="glass-panel-blue p-8">
                        <div className="flex justify-between items-center mb-6">
                          <h3 className="text-xl font-bold flex items-center gap-2"><Briefcase size={20} className="text-gold" /> Business Profile</h3>
                          {profile.hasGreenId && (
                            <div className="bg-emerald-500/20 text-emerald-500 px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                              <ShieldCheck size={14} /> Verified Business
                            </div>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                          <div>
                            <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Legal Status</div>
                            <div className="font-bold">{profile.companyInfo.legalStatus}</div>
                          </div>
                          <div>
                            <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Business Role</div>
                            <div className="font-bold">{profile.companyInfo.businessRole}</div>
                          </div>
                          <div className="md:col-span-2">
                            <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Registered Address</div>
                            <div className="font-bold">{profile.companyInfo.address}</div>
                          </div>
                          <div className="md:col-span-2">
                            <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Website</div>
                            <a href={`https://${profile.companyInfo.website}`} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-400 hover:underline flex items-center gap-1">
                              {profile.companyInfo.website} <ExternalLink size={12} />
                            </a>
                          </div>
                        </div>

                        <div className="p-6 bg-gradient-to-br from-gold/10 to-transparent border border-gold/20 rounded-2xl">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center">
                              <Zap size={20} className="text-gold" />
                            </div>
                            <div>
                              <h4 className="font-bold text-gold">AI Branding Resume</h4>
                              <p className="text-xs text-white/60">Generate a company presentation for partnerships.</p>
                            </div>
                          </div>
                          <button className="w-full bg-gold text-black py-3 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-white transition-colors">
                            Generate Presentation
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-8">
                    {/* Media Uploads */}
                    <div className="glass-panel p-6">
                      <h3 className="font-bold mb-4 flex items-center gap-2"><Image size={16} className="text-gold" /> Media Gallery</h3>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="aspect-square bg-white/5 rounded-xl border border-white/10 flex flex-col items-center justify-center text-white/40 hover:text-gold hover:border-gold/50 transition-colors cursor-pointer">
                          <Image size={24} className="mb-2" />
                          <span className="text-[10px] uppercase tracking-widest font-bold">Photos</span>
                        </div>
                        <div className="aspect-square bg-white/5 rounded-xl border border-white/10 flex flex-col items-center justify-center text-white/40 hover:text-gold hover:border-gold/50 transition-colors cursor-pointer">
                          <Video size={24} className="mb-2" />
                          <span className="text-[10px] uppercase tracking-widest font-bold">Videos</span>
                        </div>
                        <div className="aspect-square bg-white/5 rounded-xl border border-white/10 flex flex-col items-center justify-center text-white/40 hover:text-gold hover:border-gold/50 transition-colors cursor-pointer">
                          <Mic size={24} className="mb-2" />
                          <span className="text-[10px] uppercase tracking-widest font-bold">Audio</span>
                        </div>
                        <div className="aspect-square bg-white/5 rounded-xl border border-white/10 flex flex-col items-center justify-center text-white/40 hover:text-gold hover:border-gold/50 transition-colors cursor-pointer">
                          <FileText size={24} className="mb-2" />
                          <span className="text-[10px] uppercase tracking-widest font-bold">Docs</span>
                        </div>
                      </div>
                      <button className="w-full bg-white/5 border border-white/10 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                        <Upload size={14} /> Upload New
                      </button>
                    </div>

                    {/* Social Links */}
                    <div className="glass-panel p-6">
                      <h3 className="font-bold mb-4 flex items-center gap-2"><Globe size={16} className="text-gold" /> Social Links</h3>
                      <div className="space-y-3">
                        <a href={`https://instagram.com/${profile.socialLinks.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10 hover:border-white/30 transition-colors group">
                          <div className="flex items-center gap-3">
                            <Instagram size={18} className="text-pink-500" />
                            <span className="text-sm font-medium">{profile.socialLinks.instagram}</span>
                          </div>
                          <ExternalLink size={14} className="text-white/20 group-hover:text-white/60" />
                        </a>
                        <a href={`https://youtube.com/c/${profile.socialLinks.youtube.replace(' ', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10 hover:border-white/30 transition-colors group">
                          <div className="flex items-center gap-3">
                            <Youtube size={18} className="text-red-500" />
                            <span className="text-sm font-medium">{profile.socialLinks.youtube}</span>
                          </div>
                          <ExternalLink size={14} className="text-white/20 group-hover:text-white/60" />
                        </a>
                        <a href={`https://${profile.socialLinks.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10 hover:border-white/30 transition-colors group">
                          <div className="flex items-center gap-3">
                            <Globe size={18} className="text-blue-400" />
                            <span className="text-sm font-medium">{profile.socialLinks.website}</span>
                          </div>
                          <ExternalLink size={14} className="text-white/20 group-hover:text-white/60" />
                        </a>
                      </div>
                      <button className="w-full mt-4 bg-white/5 border border-white/10 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                        <Plus size={14} /> Add Link
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'wallet' && (
              <motion.div
                key="wallet"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Total Balance & Withdrawal */}
                  <div className="glass-panel p-6 bg-gradient-to-br from-gold/10 to-transparent border-gold/20">
                    <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Total Balance</div>
                    <div className="text-4xl font-bold text-gold mb-4">₹2,45,000</div>
                    <div className="flex gap-2 mb-4">
                      <button className="flex-1 bg-gold text-black py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors">Withdraw</button>
                      <button className="flex-1 bg-white/5 border border-white/10 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">Add Funds</button>
                    </div>
                    <div className="text-[10px] text-white/60 bg-black/20 p-2 rounded border border-white/5">
                      <span className="text-gold font-bold">Withdrawal Policy:</span> Minimum ₹2500 weekly withdrawal on every Sunday at 11:34 PM.
                    </div>
                  </div>

                  {/* Pending Clearance */}
                  <div className="glass-panel p-6">
                    <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Pending Clearance</div>
                    <div className="text-3xl font-bold mb-2">₹45,000</div>
                    <p className="text-xs text-white/40">From 2 active projects. Expected clearance in 5-7 days.</p>
                  </div>

                  {/* SosrG Coins */}
                  <div className="glass-panel p-6 border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-transparent">
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-[10px] uppercase tracking-widest text-white/40">SosrG Coins</div>
                      <Award size={16} className="text-emerald-400" />
                    </div>
                    <div className="text-3xl font-bold mb-2 text-emerald-400">4,500 <span className="text-sm">Coins</span></div>
                    <p className="text-xs text-white/60 mb-3">Earn via referrals, votes, and platform engagement (Available for Users & CP Admins).</p>
                    <button className="w-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-emerald-500/30 transition-colors">
                      Redeem Coins
                    </button>
                  </div>

                  {/* Tokens */}
                  <div className="glass-panel p-6 border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-transparent">
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-[10px] uppercase tracking-widest text-white/40">Auction Tokens</div>
                      <Ticket size={16} className="text-blue-400" />
                    </div>
                    <div className="text-3xl font-bold mb-2 text-blue-400">1,250 <span className="text-sm">SGT</span></div>
                    <p className="text-xs text-white/60 mb-3">Exclusive tokens used for bidding in premium talent auctions and exclusive events.</p>
                    <button className="w-full bg-blue-500/20 text-blue-400 border border-blue-500/30 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-blue-500/30 transition-colors">
                      Buy Tokens
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Transaction History */}
                  <div className="lg:col-span-2 glass-panel p-8">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold">Transaction History</h3>
                      <div className="flex gap-2">
                        <button className="px-3 py-1 bg-white/10 rounded text-xs font-bold">Today</button>
                        <button className="px-3 py-1 bg-white/5 rounded text-xs font-bold text-white/40 hover:text-white">Weekly</button>
                        <button className="px-3 py-1 bg-white/5 rounded text-xs font-bold text-white/40 hover:text-white">Monthly</button>
                        <button className="px-3 py-1 bg-white/5 rounded text-xs font-bold text-white/40 hover:text-white">All Time</button>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {[
                        { type: 'Earnings', desc: 'Milestone 2: "The Silent Valley"', amount: '+₹25,000', date: 'Today, 2:30 PM', status: 'Completed', color: 'text-emerald-400' },
                        { type: 'Withdrawal', desc: 'Bank Transfer to ****4567', amount: '-₹50,000', date: 'Yesterday', status: 'Processing', color: 'text-white' },
                        { type: 'Token Reward', desc: 'Profile Verification Bonus', amount: '+500 SGT', date: 'Oct 12, 2023', status: 'Completed', color: 'text-blue-400' },
                        { type: 'Coin Reward', desc: 'Referral Bonus (Rahul V.)', amount: '+200 Coins', date: 'Oct 11, 2023', status: 'Completed', color: 'text-emerald-400' },
                        { type: 'Earnings', desc: 'Advance: "Urban Lifestyle Ad"', amount: '+₹15,000', date: 'Oct 10, 2023', status: 'Completed', color: 'text-emerald-400' },
                      ].map((tx, i) => (
                        <div key={i} className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5">
                          <div className="flex items-center gap-4">
                            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center bg-white/5", tx.color)}>
                              {tx.type === 'Withdrawal' ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
                            </div>
                            <div>
                              <div className="font-bold text-sm">{tx.desc}</div>
                              <div className="text-xs text-white/40">{tx.date}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={cn("font-bold", tx.color)}>{tx.amount}</div>
                            <div className="text-[10px] uppercase tracking-widest text-white/40">{tx.status}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="space-y-6">
                    <div className="glass-panel p-6">
                      <h3 className="font-bold mb-4 flex items-center gap-2"><ShieldCheck size={18} className="text-gold" /> Secure Payment</h3>
                      <p className="text-xs text-white/60 mb-6">Powered by Razorpay. Add funds securely using your preferred payment method.</p>
                      
                      <div className="space-y-3">
                        <button className="w-full flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:border-gold/50 transition-colors group">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-blue-500/20 flex items-center justify-center">
                              <span className="font-bold text-blue-400 text-xs">UPI</span>
                            </div>
                            <span className="text-sm font-bold">Pay via UPI</span>
                          </div>
                          <ChevronRight size={16} className="text-white/20 group-hover:text-gold" />
                        </button>
                        
                        <button className="w-full flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:border-gold/50 transition-colors group">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-purple-500/20 flex items-center justify-center">
                              <span className="font-bold text-purple-400 text-xs">CC</span>
                            </div>
                            <span className="text-sm font-bold">Credit / Debit Card</span>
                          </div>
                          <ChevronRight size={16} className="text-white/20 group-hover:text-gold" />
                        </button>
                        
                        <button className="w-full flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:border-gold/50 transition-colors group">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-emerald-500/20 flex items-center justify-center">
                              <span className="font-bold text-emerald-400 text-xs">NB</span>
                            </div>
                            <span className="text-sm font-bold">Net Banking</span>
                          </div>
                          <ChevronRight size={16} className="text-white/20 group-hover:text-gold" />
                        </button>
                      </div>
                      
                      <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-white/40 uppercase tracking-widest">
                        <Lock size={12} /> 100% Secure Transactions
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'bookings' && (
              <motion.div
                key="bookings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Booking History</h2>
                  <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                    <button className="px-4 py-2 bg-white/10 rounded-lg text-xs font-bold uppercase tracking-widest">Current</button>
                    <button className="px-4 py-2 text-white/40 hover:text-white rounded-lg text-xs font-bold uppercase tracking-widest">Past</button>
                    <button className="px-4 py-2 text-white/40 hover:text-white rounded-lg text-xs font-bold uppercase tracking-widest">Auctions</button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { title: 'The Silent Valley', role: 'Lead Actor', date: 'Oct 15 - Nov 30', status: 'In Progress', type: 'Direct Booking', amount: '₹1,50,000' },
                    { title: 'Urban Lifestyle Ad', role: 'Model', date: 'Nov 5', status: 'Upcoming', type: 'Auction Won', amount: '₹45,000' },
                  ].map((booking, i) => (
                    <div key={i} className="glass-panel p-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 bg-gold text-black px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-bl-lg">
                        {booking.status}
                      </div>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold mb-1">{booking.title}</h3>
                          <div className="text-sm text-white/60">{booking.role}</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                          <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Schedule</div>
                          <div className="text-sm font-medium flex items-center gap-1"><Calendar size={14} className="text-gold" /> {booking.date}</div>
                        </div>
                        <div>
                          <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Booking Type</div>
                          <div className="text-sm font-medium flex items-center gap-1"><Gavel size={14} className="text-blue-400" /> {booking.type}</div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t border-white/10">
                        <div className="font-bold text-lg">{booking.amount}</div>
                        <button className="text-xs text-gold hover:underline font-bold uppercase tracking-widest">View Details</button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'notifications' && (
              <motion.div
                key="notifications"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="glass-panel-pink p-8"
              >
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold">Notifications</h2>
                  <button className="text-xs text-white/40 hover:text-white">Mark all as read</button>
                </div>
                
                <div className="space-y-4">
                  {[
                    { title: 'New Audition Match', desc: 'You have a 95% match for "Cyberpunk City" feature film.', time: '10 mins ago', type: 'alert', read: false },
                    { title: 'Bid Accepted', desc: 'Your bid of ₹45,000 for "Urban Lifestyle Ad" was accepted!', time: '2 hours ago', type: 'success', read: false },
                    { title: 'System Update', desc: 'Platform maintenance scheduled for Oct 20, 2:00 AM IST.', time: '1 day ago', type: 'system', read: true },
                    { title: 'Profile Verification', desc: 'Congratulations! Your Green ID verification is complete.', time: '3 days ago', type: 'success', read: true },
                    { title: 'Message from Casting Director', desc: '"Can you send a quick self-tape for the cafe scene?"', time: '4 days ago', type: 'message', read: true },
                  ].map((notif, i) => (
                    <div key={i} className={cn(
                      "p-4 rounded-xl border transition-colors flex gap-4",
                      notif.read ? "bg-white/5 border-white/5" : "bg-gold/5 border-gold/20"
                    )}>
                      <div className="mt-1">
                        {notif.type === 'alert' && <Zap size={20} className="text-gold" />}
                        {notif.type === 'success' && <CheckCircle size={20} className="text-emerald-400" />}
                        {notif.type === 'system' && <Settings size={20} className="text-blue-400" />}
                        {notif.type === 'message' && <MessageSquare size={20} className="text-white" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <div className={cn("font-bold text-sm", !notif.read && "text-gold")}>{notif.title}</div>
                          <div className="text-[10px] text-white/40">{notif.time}</div>
                        </div>
                        <div className="text-sm text-white/60">{notif.desc}</div>
                      </div>
                      {!notif.read && (
                        <div className="w-2 h-2 rounded-full bg-gold mt-2"></div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'membership' && (
              <motion.div
                key="membership"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-serif italic mb-4">Membership & <span className="gold-text">Subscription</span></h2>
                  <p className="text-white/60">Unlock premium benefits, priority casting, and exclusive workshops.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { name: 'Basic', price: 'Free', features: ['Basic Profile', 'Standard Casting Access', 'Community Forum'], current: true },
                    { name: 'Pro', price: '₹999/mo', features: ['Featured Profile', 'Priority Casting Access', '1 Free Workshop/mo', 'Advanced Analytics'], current: false },
                    { name: 'Elite', price: '₹2499/mo', features: ['Verified Badge', 'Direct Messaging to Directors', 'Unlimited Workshops', 'Legal Support'], current: false }
                  ].map((plan, i) => (
                    <div key={i} className={cn("glass-panel p-8 relative", plan.name === 'Pro' ? "border-gold/50 shadow-[0_0_30px_rgba(255,215,0,0.1)]" : "")}>
                      {plan.name === 'Pro' && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Most Popular</div>}
                      <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                      <div className="text-3xl font-serif italic text-gold mb-6">{plan.price}</div>
                      <ul className="space-y-4 mb-8">
                        {plan.features.map((feature, j) => (
                          <li key={j} className="flex items-center gap-3 text-sm text-white/80">
                            <CheckCircle2 size={16} className="text-emerald-400 shrink-0" /> {feature}
                          </li>
                        ))}
                      </ul>
                      <button className={cn("w-full py-3 rounded-xl font-bold uppercase tracking-widest transition-all", plan.current ? "bg-white/10 text-white/50 cursor-default" : plan.name === 'Pro' ? "bg-gold text-black hover:scale-105" : "bg-white/5 border border-white/10 hover:bg-white/10")}>
                        {plan.current ? 'Current Plan' : 'Upgrade'}
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'reviews' && (
              <motion.div
                key="reviews"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold">Ratings & Reviews</h2>
                  <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl">
                    <Star className="fill-gold text-gold" size={20} />
                    <span className="text-xl font-bold">4.8</span>
                    <span className="text-white/40 text-sm">(124 Reviews)</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { author: 'Rajesh Kumar', role: 'Director', rating: 5, date: '2 days ago', text: 'Arjun is a phenomenal actor. His dedication to the method is unparalleled. Highly recommended for intense dramatic roles.' },
                    { author: 'Priya Singh', role: 'Casting Director', rating: 4, date: '1 week ago', text: 'Great audition tape. Very professional and took direction well during the callback.' },
                    { author: 'Amit Patel', role: 'Producer', rating: 5, date: '1 month ago', text: 'Delivered lines perfectly on the first take. Saved us a lot of time on set.' },
                    { author: 'Sneha Reddy', role: 'Workshop Attendee', rating: 5, date: '2 months ago', text: 'The scriptwriting workshop was incredibly insightful. Learned so much about character arcs.' }
                  ].map((review, i) => (
                    <div key={i} className="glass-panel p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-white/10 overflow-hidden">
                            <img src={`https://picsum.photos/seed/rev${i}/100/100`} alt={review.author} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </div>
                          <div>
                            <h4 className="font-bold text-sm">{review.author}</h4>
                            <p className="text-[10px] text-white/40">{review.role}</p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, j) => (
                            <Star key={j} size={14} className={j < review.rating ? "fill-gold text-gold" : "text-white/20"} />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-white/80 italic">"{review.text}"</p>
                      <p className="text-[10px] text-white/40 mt-4 text-right">{review.date}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'services' && (
              <motion.div
                key="services"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Monetisation & Paid Services</h2>
                    <p className="text-white/60 text-sm">Offer your skills as paid services or workshops.</p>
                  </div>
                  <button className="bg-gold text-black px-6 py-2 rounded-xl font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-2">
                    <Plus size={16} /> Add Service
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { title: '1-on-1 Acting Coaching', price: '₹2000/hr', type: 'Consultation', sales: 24, rating: 4.9 },
                    { title: 'Script Review & Feedback', price: '₹5000', type: 'Service', sales: 12, rating: 4.7 },
                    { title: 'Voice Over Recording (Up to 5 mins)', price: '₹3000', type: 'Gig', sales: 45, rating: 5.0 }
                  ].map((service, i) => (
                    <div key={i} className="glass-panel p-6 group hover:border-gold/30 transition-all cursor-pointer">
                      <div className="flex justify-between items-start mb-4">
                        <span className="bg-white/10 px-2 py-1 rounded text-[10px] uppercase tracking-widest">{service.type}</span>
                        <button className="text-white/40 hover:text-white"><MoreHorizontal size={16} /></button>
                      </div>
                      <h3 className="font-bold text-lg mb-2 group-hover:text-gold transition-colors">{service.title}</h3>
                      <div className="text-xl font-serif italic text-gold mb-4">{service.price}</div>
                      <div className="flex justify-between items-center text-xs text-white/60 pt-4 border-t border-white/10">
                        <span className="flex items-center gap-1"><ShoppingCart size={14} /> {service.sales} Sales</span>
                        <span className="flex items-center gap-1 text-emerald-400"><Star size={14} className="fill-emerald-400" /> {service.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="glass-panel p-8 mt-12 bg-gradient-to-br from-gold/10 to-transparent border-gold/20">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-gold">Secure Payments by SosrG</h3>
                      <p className="text-sm text-white/80">All transactions are secured and held in escrow until service delivery is confirmed.</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold">₹45,000</div>
                        <div className="text-[10px] uppercase tracking-widest text-white/40">Available Balance</div>
                      </div>
                      <button className="bg-white/10 border border-white/20 px-6 py-2 rounded-xl text-sm font-bold hover:bg-white/20 transition-colors">Withdraw</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'privacy' && (
              <motion.div
                key="privacy"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Privacy & Security Controls</h2>
                    <p className="text-white/60 text-sm">Manage who can see your information and secure your account.</p>
                  </div>
                  <ShieldCheck className="text-emerald-400" size={32} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Profile Visibility */}
                  <div className="glass-panel p-6 space-y-6">
                    <h3 className="text-lg font-bold border-b border-white/10 pb-4">Profile Visibility</h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-bold text-sm">Public Profile</h4>
                          <p className="text-xs text-white/50">Allow anyone to view your basic profile.</p>
                        </div>
                        <div className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
                          <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-bold text-sm">Show Contact Info</h4>
                          <p className="text-xs text-white/50">Only visible to verified casting directors.</p>
                        </div>
                        <div className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
                          <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-bold text-sm">Portfolio Visibility</h4>
                          <p className="text-xs text-white/50">Control who can see your media assets.</p>
                        </div>
                        <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-sm text-white focus:outline-none focus:border-gold">
                          <option>Everyone</option>
                          <option>Connections Only</option>
                          <option>Private</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Account Security */}
                  <div className="glass-panel p-6 space-y-6">
                    <h3 className="text-lg font-bold border-b border-white/10 pb-4">Account Security</h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-bold text-sm">Two-Factor Authentication (2FA)</h4>
                          <p className="text-xs text-white/50">Add an extra layer of security to your account.</p>
                        </div>
                        <button className="bg-white/10 border border-white/20 px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-white/20 transition-colors">Enable</button>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-bold text-sm">Active Sessions</h4>
                          <p className="text-xs text-white/50">Manage devices logged into your account.</p>
                        </div>
                        <button className="text-xs text-gold hover:underline">View All</button>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-bold text-sm">Green ID Verification</h4>
                          <p className="text-xs text-emerald-400">Verified on Mar 1, 2026</p>
                        </div>
                        <CheckCircle2 className="text-emerald-400" size={20} />
                      </div>
                    </div>
                  </div>

                  {/* Data & Transactions */}
                  <div className="glass-panel p-6 lg:col-span-2 space-y-6">
                    <h3 className="text-lg font-bold border-b border-white/10 pb-4">Data & Transactions</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex gap-4 items-start">
                        <div className="p-3 bg-white/5 rounded-xl shrink-0">
                          <Lock size={20} className="text-gold" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm mb-1">End-to-End Encryption</h4>
                          <p className="text-xs text-white/60">All your direct messages and contract negotiations are encrypted and secure.</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4 items-start">
                        <div className="p-3 bg-white/5 rounded-xl shrink-0">
                          <ShieldCheck size={20} className="text-emerald-400" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm mb-1">Secure Escrow Payments</h4>
                          <p className="text-xs text-white/60">Funds are held safely in escrow until services are delivered and approved.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-white/10 flex justify-end gap-4">
                      <button className="text-xs text-white/40 hover:text-white transition-colors">Download My Data</button>
                      <button className="text-xs text-crimson hover:text-red-400 transition-colors">Delete Account</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                <div className="lg:col-span-2 space-y-8">
                  <div className="glass-panel-orange p-8">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold">Recent Activity</h3>
                      <button className="text-xs text-gold hover:underline">View All</button>
                    </div>
                    <div className="space-y-6">
                      {[
                        { title: 'New Contract Signed', desc: 'Feature Film "The Silent Valley"', time: '2h ago', icon: ShieldCheck, color: 'text-emerald-400' },
                        { title: 'Payment Received', desc: 'Milestone 2 for Ad Campaign', time: '5h ago', icon: Wallet, color: 'text-gold' },
                        { title: 'New Connection', desc: 'Vikram Singh (Cinematographer)', time: '1d ago', icon: User, color: 'text-blue-400' },
                      ].map((item, i) => (
                        <div key={i} className="flex gap-4 items-start">
                          <div className={cn("mt-1", item.color)}>
                            <item.icon size={18} />
                          </div>
                          <div>
                            <div className="font-bold text-sm">{item.title}</div>
                            <div className="text-xs text-white/40">{item.desc}</div>
                            <div className="text-[10px] text-white/20 mt-1">{item.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="glass-panel-green p-8">
                    <h3 className="text-xl font-bold mb-6">Growth Tracking</h3>
                    <div className="h-48 flex items-end gap-2 px-4">
                      {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                        <div key={i} className="flex-1 bg-white/5 rounded-t-lg relative group">
                          <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            className={cn(
                              "absolute bottom-0 left-0 right-0 rounded-t-lg transition-all",
                              i === 5 ? "bg-gold" : "bg-white/10 group-hover:bg-white/20"
                            )}
                          />
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono">
                            {h}%
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-4 px-4 text-[10px] text-white/20 uppercase tracking-widest">
                      <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="glass-panel p-6 bg-gradient-to-br from-gold/10 to-transparent border-gold/20">
                    <div className="flex items-center gap-2 mb-4 text-gold">
                      <Zap size={18} />
                      <h3 className="font-bold">Smart AI Tip</h3>
                    </div>
                    <p className="text-sm text-white/80 leading-relaxed mb-4">
                      {profile.level === 'fresher' 
                        ? "Your portfolio views are up 20%. Adding a voice reel could increase your match rate by 35%."
                        : profile.level === 'intermediate'
                        ? "Market trends show a high demand for 'Naturalistic' acting in OTT series. Update your tags."
                        : "Your industry influence score is in the top 1%. Consider mentoring to unlock 'Legend' status."}
                    </p>
                    <button className="w-full bg-gold text-black py-2 rounded-lg text-xs font-bold uppercase tracking-widest">
                      Take Action
                    </button>
                  </div>

                  <div className="glass-panel p-6">
                    <h3 className="font-bold mb-4 flex items-center gap-2"><Trophy size={16} className="text-gold" /> Achievements</h3>
                    <div className="space-y-4">
                      {[
                        { name: 'Fast Learner', progress: 100, icon: Zap },
                        { name: 'Networker', progress: 65, icon: Globe },
                        { name: 'Top Earner', progress: 30, icon: Wallet },
                      ].map((ach) => (
                        <div key={ach.name}>
                          <div className="flex justify-between text-[10px] mb-1 uppercase tracking-widest">
                            <span>{ach.name}</span>
                            <span>{ach.progress}%</span>
                          </div>
                          <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                            <div className="bg-gold h-full" style={{ width: `${ach.progress}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'projects' && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold">{profile.type === 'artist' ? 'My Projects' : 'Active Productions'}</h3>
                  <button className="bg-gold text-black px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors">
                    {profile.type === 'artist' ? 'Browse More' : 'Post New'}
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { title: 'The Silent Valley', role: 'Lead Actor', status: 'In Production', progress: 65, budget: '₹12L' },
                    { title: 'Urban Beats Ad', role: 'Voice Over', status: 'Post-Production', progress: 90, budget: '₹45K' },
                    { title: 'Stage Play: Hamlet', role: 'Director', status: 'Rehearsals', progress: 30, budget: '₹2.5L' },
                  ].map((project, i) => (
                    <div key={i} className="glass-panel p-6 hover:border-gold/50 transition-all group">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-bold group-hover:text-gold transition-colors">{project.title}</h4>
                          <p className="text-xs text-white/40">{project.role}</p>
                        </div>
                        <span className="text-[10px] bg-gold/10 text-gold px-2 py-1 rounded-full uppercase font-bold">
                          {project.budget}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-[10px] uppercase tracking-widest">
                          <span className="text-white/40">{project.status}</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                          <div className="bg-gold h-full" style={{ width: `${project.progress}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'finances' && (
              <motion.div
                key="finances"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: 'Total Earnings', value: '₹18,45,000', change: '+12%', icon: Wallet },
                    { label: 'Pending Payments', value: '₹2,30,000', change: '-5%', icon: Clock },
                    { label: 'Active Contracts', value: '14', change: '+2', icon: ShieldCheck },
                  ].map((stat, i) => (
                    <div key={i} className="glass-panel p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-white/5 rounded-xl">
                          <stat.icon className="text-gold" size={24} />
                        </div>
                        <span className={cn("text-xs font-bold", stat.change.startsWith('+') ? "text-emerald-400" : "text-crimson")}>
                          {stat.change}
                        </span>
                      </div>
                      <div className="text-2xl font-bold mb-1">{stat.value}</div>
                      <div className="text-xs text-white/40 uppercase tracking-widest">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <div className="glass-panel-blue p-8">
                  <h3 className="text-xl font-bold mb-6">Transaction History</h3>
                  <div className="space-y-4">
                    {[
                      { name: 'Studio Rental', date: 'Oct 24, 2023', amount: '-₹15,000', status: 'Completed' },
                      { name: 'Ad Campaign Payout', date: 'Oct 22, 2023', amount: '+₹85,000', status: 'Completed' },
                      { name: 'Equipment Insurance', date: 'Oct 20, 2023', amount: '-₹4,200', status: 'Processing' },
                    ].map((tx, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-all">
                        <div className="flex items-center gap-4">
                          <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", tx.amount.startsWith('+') ? "bg-emerald-400/10 text-emerald-400" : "bg-crimson/10 text-crimson")}>
                            {tx.amount.startsWith('+') ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
                          </div>
                          <div>
                            <div className="font-bold text-sm">{tx.name}</div>
                            <div className="text-[10px] text-white/40 uppercase tracking-widest">{tx.date}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={cn("font-bold text-sm", tx.amount.startsWith('+') ? "text-emerald-400" : "text-white")}>{tx.amount}</div>
                          <div className="text-[10px] text-white/20 uppercase tracking-widest">{tx.status}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'network' && (
              <motion.div
                key="network"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold">My Network</h3>
                  <div className="flex gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={14} />
                      <input 
                        type="text" 
                        placeholder="Search connections..." 
                        className="bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-xs focus:outline-none focus:border-gold/50 w-64"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { name: 'Aarav Sharma', role: 'Director', industry: 'Cinema', level: 'Expert', img: 'https://i.pravatar.cc/150?u=1' },
                    { name: 'Ishani Gupta', role: 'Writer', industry: 'Literature', level: 'Intermediate', img: 'https://i.pravatar.cc/150?u=2' },
                    { name: 'Rohan Verma', role: 'Musician', industry: 'Music', level: 'Expert', img: 'https://i.pravatar.cc/150?u=3' },
                    { name: 'Meera Kapur', role: 'Dancer', industry: 'Dance', level: 'Fresher', img: 'https://i.pravatar.cc/150?u=4' },
                    { name: 'Kabir Singh', role: 'Actor', industry: 'Theatre', level: 'Expert', img: 'https://i.pravatar.cc/150?u=5' },
                    { name: 'Sanya Malhotra', role: 'Designer', industry: 'Art', level: 'Intermediate', img: 'https://i.pravatar.cc/150?u=6' },
                  ].map((person, i) => (
                    <div key={i} className="glass-panel p-6 text-center hover:border-gold/50 transition-all group">
                      <div className="relative w-20 h-20 mx-auto mb-4">
                        <img src={person.img} alt={person.name} className="w-full h-full rounded-full object-cover border-2 border-white/10 group-hover:border-gold transition-colors" />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gold rounded-full flex items-center justify-center border-2 border-black">
                          <ShieldCheck size={12} className="text-black" />
                        </div>
                      </div>
                      <h4 className="font-bold text-sm mb-1">{person.name}</h4>
                      <p className="text-[10px] text-white/40 uppercase tracking-widest mb-4">{person.role} • {person.industry}</p>
                      <button className="w-full py-2 bg-white/5 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-gold hover:text-black transition-all">
                        Message
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'counselling' && (
              <motion.div
                key="counselling"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="glass-panel-green p-12 text-center bg-gradient-to-br from-gold/10 to-transparent">
                  <GraduationCap className="mx-auto mb-8 text-gold" size={60} />
                  <h2 className="text-3xl font-bold mb-4">AI Career Counselling</h2>
                  <p className="text-white/40 max-w-2xl mx-auto mb-10">
                    Personalized career roadmaps for the Indian Art industries. Powered by real-time market data and industry trends.
                  </p>
                  <div className="max-w-3xl mx-auto space-y-6">
                    <div className="bg-black/30 border border-white/10 rounded-2xl p-8 text-left">
                      <h4 className="font-bold mb-4 flex items-center gap-2 text-gold"><Zap size={18} /> Career Roadmap AI</h4>
                      <p className="text-sm text-white/80 mb-6">"Based on your current profile as an {profile.level} {profile.profession}, you are on a strong trajectory. To reach the next level, we recommend focusing on {profile.industry === 'Cinema' ? 'OTT Web Series' : 'International Theatre Festivals'} in the next quarter to maximize visibility."</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                          <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Market Demand</div>
                          <div className="text-lg font-bold text-emerald-400">High</div>
                        </div>
                        <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                          <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Skill Gap</div>
                          <div className="text-lg font-bold text-gold">{profile.type === 'artist' ? 'Action Stunts' : 'Digital Marketing'}</div>
                        </div>
                        <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                          <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Est. Growth</div>
                          <div className="text-lg font-bold text-blue-400">+25% YoY</div>
                        </div>
                      </div>
                    </div>
                    <button className="w-full bg-gold text-black py-4 rounded-xl font-bold uppercase tracking-widest hover:scale-[1.02] transition-transform">
                      Generate Full Career Report
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'management' && (
              <motion.div
                key="management"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-8">
                    <div className="glass-panel-pink p-8">
                      <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                          <Settings className="text-gold" /> Active Task Tracking
                        </h3>
                        <div className="flex gap-2">
                          <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full font-bold uppercase tracking-widest">4 Active</span>
                          <span className="text-[10px] bg-crimson/10 text-crimson px-2 py-1 rounded-full font-bold uppercase tracking-widest">2 Overdue</span>
                        </div>
                      </div>
                      <div className="space-y-4">
                        {[
                          { task: 'Dubbing for Episode 4', project: 'Urban Beats Ad', deadline: 'Today, 6 PM', status: 'overdue', priority: 'High' },
                          { task: 'Script Review: Scene 12-15', project: 'The Silent Valley', deadline: 'Tomorrow', status: 'pending', priority: 'Medium' },
                          { task: 'Costume Fitting', project: 'Stage Play: Hamlet', deadline: 'Oct 30', status: 'pending', priority: 'Low' },
                        ].map((task, i) => (
                          <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 group hover:border-gold/30 transition-all">
                            <div className="flex items-center gap-4">
                              <div className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center",
                                task.status === 'overdue' ? "bg-crimson/10 text-crimson" : "bg-white/10 text-white/40"
                              )}>
                                {task.status === 'overdue' ? <AlertCircle size={18} /> : <Clock size={18} />}
                              </div>
                              <div>
                                <div className="font-bold text-sm group-hover:text-gold transition-colors">{task.task}</div>
                                <div className="text-[10px] text-white/40 uppercase tracking-widest">{task.project} • {task.deadline}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className={cn(
                                "text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest",
                                task.priority === 'High' ? "text-crimson" : task.priority === 'Medium' ? "text-gold" : "text-blue-400"
                              )}>
                                {task.priority} Priority
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="glass-panel-purple p-8">
                      <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                        <Lock className="text-gold" /> Payment Milestone Lock
                      </h3>
                      <div className="space-y-6">
                        {[
                          { milestone: 'Pre-production Advance', amount: '₹2,50,000', status: 'Released', date: 'Oct 15' },
                          { milestone: 'Dubbing Completion', amount: '₹1,20,000', status: 'Locked', date: 'Pending Task' },
                          { milestone: 'Final Delivery', amount: '₹3,00,000', status: 'Locked', date: 'Project End' },
                        ].map((m, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className={cn(
                                "w-12 h-12 rounded-xl flex items-center justify-center border",
                                m.status === 'Released' ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-white/5 border-white/10 text-white/20"
                              )}>
                                {m.status === 'Released' ? <CheckCircle size={20} /> : <Lock size={20} />}
                              </div>
                              <div>
                                <div className="font-bold text-sm">{m.milestone}</div>
                                <div className="text-[10px] text-white/40 uppercase tracking-widest">{m.status} • {m.date}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-gold">{m.amount}</div>
                              <button className="text-[10px] text-white/20 hover:text-white uppercase tracking-widest underline">Details</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="glass-panel p-6 bg-gradient-to-br from-crimson/10 to-transparent border-crimson/20">
                      <div className="flex items-center gap-2 mb-4 text-crimson">
                        <AlertCircle size={18} />
                        <h3 className="font-bold">Deadline Alerts</h3>
                      </div>
                      <div className="space-y-4">
                        <div className="p-4 bg-black/30 rounded-xl border border-crimson/20">
                          <p className="text-xs text-white/80 mb-2">Dubbing for "Urban Beats Ad" is overdue by 2 hours.</p>
                          <button className="w-full bg-crimson text-white py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest">
                            Resolve Now
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="glass-panel p-6">
                      <h3 className="font-bold mb-4 flex items-center gap-2"><TrendingUp size={16} className="text-gold" /> Productivity AI</h3>
                      <div className="text-center py-4">
                        <div className="text-4xl font-bold text-gold mb-2">88%</div>
                        <p className="text-[10px] text-white/40 uppercase tracking-widest">Efficiency Score</p>
                        <div className="mt-6 space-y-2">
                          <div className="flex justify-between text-[10px] uppercase tracking-widest">
                            <span>Tasks Completed</span>
                            <span>24/28</span>
                          </div>
                          <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                            <div className="bg-gold h-full" style={{ width: '85%' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'portfolio' && (
              <motion.div
                key="portfolio"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold">Portfolio Manager</h3>
                  <button className="bg-gold text-black px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors flex items-center gap-2">
                    <Plus size={14} /> Add Media
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="glass-panel p-4 group cursor-pointer">
                      <div className="aspect-video bg-black/50 rounded-lg mb-4 overflow-hidden relative">
                        <img src={`https://picsum.photos/seed/portfolio${i}/400/300`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Portfolio item" referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Play className="text-white" size={32} />
                        </div>
                      </div>
                      <h4 className="font-bold mb-1">Showreel 202{i}</h4>
                      <p className="text-xs text-white/40">Added 2 months ago</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'auditions' && (
              <motion.div
                key="auditions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold">Auditions Applied</h3>
                <div className="glass-panel p-6">
                  <div className="space-y-4">
                    {[
                      { role: 'Lead Actor', project: 'Neon Dreams', status: 'Shortlisted', date: 'Oct 15, 2026' },
                      { role: 'Supporting Cast', project: 'The Last Symphony', status: 'Pending', date: 'Oct 10, 2026' },
                      { role: 'Voice Over', project: 'Galactic Wars', status: 'Rejected', date: 'Sep 28, 2026' }
                    ].map((audition, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                        <div>
                          <h4 className="font-bold">{audition.role}</h4>
                          <p className="text-sm text-white/60">{audition.project} • Applied {audition.date}</p>
                        </div>
                        <span className={cn(
                          "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest",
                          audition.status === 'Shortlisted' ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" :
                          audition.status === 'Pending' ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" :
                          "bg-red-500/20 text-red-400 border border-red-500/30"
                        )}>
                          {audition.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'availability' && (
              <motion.div
                key="availability"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold">Availability Calendar</h3>
                <div className="glass-panel p-8 text-center">
                  <Calendar className="mx-auto text-gold mb-4" size={48} />
                  <h4 className="text-xl font-bold mb-2">Manage Your Schedule</h4>
                  <p className="text-white/60 mb-6 max-w-md mx-auto">Keep your availability up to date so casting directors and clients know when you're free to work.</p>
                  <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-bold transition-colors">
                    Sync with Google Calendar
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'ai-insights' && (
              <motion.div
                key="ai-insights"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Zap className="text-gold" size={28} />
                  <h3 className="text-2xl font-bold">AI Match Suggestions</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="glass-panel p-6 border-gold/30">
                    <h4 className="font-bold text-gold mb-4">Recommended Roles</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="text-emerald-400 mt-1" />
                        <span className="text-sm">Your profile strongly matches "Intense Antagonist" roles in upcoming thrillers.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="text-emerald-400 mt-1" />
                        <span className="text-sm">Consider adding more "Voice Over" samples to increase match rate by 40%.</span>
                      </li>
                    </ul>
                  </div>
                  <div className="glass-panel p-6">
                    <h4 className="font-bold mb-4">Skill Gap Analysis</h4>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Action Choreography</span>
                          <span className="text-gold">Suggested</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-gold w-1/3" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Dialect: British</span>
                          <span className="text-gold">High Demand</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-gold w-1/4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'casting' && (
              <motion.div
                key="casting"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold">Casting Panel</h3>
                  <button className="bg-gold text-black px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors">
                    Create Call
                  </button>
                </div>
                <div className="glass-panel p-6">
                  <div className="text-center py-12">
                    <Users className="mx-auto text-white/20 mb-4" size={48} />
                    <h4 className="text-xl font-bold mb-2">No Active Casting Calls</h4>
                    <p className="text-white/60">Create a casting call to start receiving auditions from verified talent.</p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'budget' && (
              <motion.div
                key="budget"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold">Budget Manager</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="glass-panel p-6">
                    <div className="text-white/60 text-sm mb-2">Total Allocated</div>
                    <div className="text-3xl font-bold text-gold">₹45.5L</div>
                  </div>
                  <div className="glass-panel p-6">
                    <div className="text-white/60 text-sm mb-2">Spent</div>
                    <div className="text-3xl font-bold text-emerald-400">₹12.2L</div>
                  </div>
                  <div className="glass-panel p-6">
                    <div className="text-white/60 text-sm mb-2">Remaining</div>
                    <div className="text-3xl font-bold text-blue-400">₹33.3L</div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'workflow' && (
              <motion.div
                key="workflow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold">Workflow Tracker</h3>
                <div className="glass-panel p-6">
                  <div className="space-y-6">
                    {['Pre-Production', 'Production', 'Post-Production', 'Distribution'].map((stage, i) => (
                      <div key={stage} className="flex items-center gap-4">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm",
                          i === 0 ? "bg-emerald-500 text-white" : i === 1 ? "bg-gold text-black" : "bg-white/10 text-white/40"
                        )}>
                          {i + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className={cn("font-bold", i > 1 && "text-white/40")}>{stage}</h4>
                          <div className="h-2 mt-2 bg-white/5 rounded-full overflow-hidden">
                            <div className={cn("h-full", i === 0 ? "bg-emerald-500 w-full" : i === 1 ? "bg-gold w-1/2" : "w-0")} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'legal' && (
              <motion.div
                key="legal"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="glass-panel-orange p-12 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-gold to-blue-500" />
                  <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-8 gold-glow">
                    <ShieldCheck size={40} className="text-blue-400" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4">AI Legal Protection</h2>
                  <p className="text-white/40 max-w-2xl mx-auto mb-10">
                    Smart automated legal tools to protect your intellectual property and ensure fair contracts.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { title: 'Auto NDA Generator', desc: 'Instant non-disclosure agreements for collaborations.', icon: FileText },
                      { title: 'Contract Draft AI', desc: 'Generate industry-standard contracts in seconds.', icon: Scale },
                      { title: 'Copyright Timestamp', desc: 'Secure blockchain-based proof of creation.', icon: History },
                    ].map((tool, i) => (
                      <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-blue-500/50 transition-all cursor-pointer group">
                        <tool.icon className="mx-auto mb-4 text-blue-400 group-hover:scale-110 transition-transform" size={32} />
                        <h3 className="font-bold mb-2">{tool.title}</h3>
                        <p className="text-xs text-white/40">{tool.desc}</p>
                        <button className="mt-4 text-[10px] font-bold text-blue-400 uppercase tracking-widest group-hover:underline">Launch Tool</button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="glass-panel p-8">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <History size={20} className="text-gold" /> Recent IP Timestamps
                    </h3>
                    <div className="space-y-4">
                      {[
                        { name: 'Script: The Silent Valley (v2)', date: 'Oct 26, 2023', hash: '0x7f...3a21' },
                        { name: 'Musical Score: Urban Beats', date: 'Oct 22, 2023', hash: '0x4c...9b88' },
                      ].map((ip, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                          <div>
                            <div className="font-bold text-sm">{ip.name}</div>
                            <div className="text-[10px] text-white/40 uppercase tracking-widest">{ip.date}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-[10px] font-mono text-gold">{ip.hash}</div>
                            <div className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold">Verified</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="glass-panel p-8">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <FileCheck size={20} className="text-gold" /> Active Contracts
                    </h3>
                    <div className="space-y-4">
                      {[
                        { project: 'The Silent Valley', party: 'Dharma Productions', status: 'Signed' },
                        { project: 'Urban Beats Ad', party: 'Brand Agency', status: 'Pending Review' },
                      ].map((c, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                          <div>
                            <div className="font-bold text-sm">{c.project}</div>
                            <div className="text-[10px] text-white/40 uppercase tracking-widest">{c.party}</div>
                          </div>
                          <span className={cn(
                            "text-[10px] font-bold px-3 py-1 rounded-full",
                            c.status === 'Signed' ? "bg-emerald-500/10 text-emerald-400" : "bg-gold/10 text-gold"
                          )}>
                            {c.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
};
const SosrGAcademy = () => {
  const [activeTab, setActiveTab] = useState<'learning-paths' | 'scholarships' | 'progress'>('learning-paths');

  return (
    <div className="pt-32 px-6 max-w-7xl mx-auto min-h-screen pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif italic mb-2">SosrG <span className="vibrant-text-4">Academy</span></h1>
          <p className="text-white/50">AI-driven learning paths, scholarships, and progress tracking for the 7 Core Creative Sectors.</p>
        </div>
        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 overflow-x-auto no-scrollbar w-full md:w-auto">
          {[
            { id: 'learning-paths', label: 'AI Learning Paths', icon: BookOpen },
            { id: 'scholarships', label: 'SosrG Scholarships', icon: GraduationCap },
            { id: 'progress', label: 'Progress Tracking', icon: TrendingUp },
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
        {activeTab === 'learning-paths' && (
          <motion.div
            key="learning-paths"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="glass-panel p-8 bg-gradient-to-br from-blue-500/10 to-transparent border-blue-500/20">
              <div className="flex items-center gap-2 mb-4">
                <Cpu size={24} className="text-blue-400" />
                <h2 className="text-2xl font-bold">AI Recommended Courses</h2>
              </div>
              <p className="text-sm text-white/60 mb-6">Based on your profile as a <span className="text-white font-bold">Cinematographer</span> and your recent activity, our AI suggests these professional courses to elevate your skills.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: 'Advanced Lighting Techniques', level: 'Expert', duration: '4 Weeks', rating: 4.9, students: 1240, image: 'https://picsum.photos/seed/lighting/400/300' },
                  { title: 'Color Grading Masterclass', level: 'Intermediate', duration: '6 Weeks', rating: 4.8, students: 850, image: 'https://picsum.photos/seed/color/400/300' },
                  { title: 'Drone Cinematography 101', level: 'Beginner', duration: '2 Weeks', rating: 4.7, students: 2100, image: 'https://picsum.photos/seed/drone/400/300' },
                ].map((course, i) => (
                  <div key={i} className="bg-black/40 rounded-xl overflow-hidden border border-white/10 group cursor-pointer hover:border-blue-400/50 transition-colors">
                    <div className="aspect-video relative">
                      <img src={course.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={course.title} referrerPolicy="no-referrer" />
                      <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest">{course.level}</div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold mb-2">{course.title}</h3>
                      <div className="flex justify-between items-center text-xs text-white/40 mb-4">
                        <span className="flex items-center gap-1"><Clock size={12} /> {course.duration}</span>
                        <span className="flex items-center gap-1"><Users size={12} /> {course.students}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1 text-gold text-xs font-bold">
                          <Star size={12} className="fill-gold" /> {course.rating}
                        </div>
                        <button className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1">
                          Enroll Now <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {['Acting', 'Direction', 'Writing', 'Music', 'Dance', 'Art & Design', 'Crafts'].map((sector, i) => (
                <div key={i} className="glass-panel p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/5 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                    <BookOpen size={20} className="text-gold" />
                  </div>
                  <h4 className="font-bold mb-1">{sector}</h4>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">Explore Courses</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'scholarships' && (
          <motion.div
            key="scholarships"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="glass-panel p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-gold to-emerald-400" />
              <GraduationCap size={48} className="mx-auto mb-6 text-emerald-400" />
              <h2 className="text-3xl font-bold mb-4">SosrG Scholarships</h2>
              <p className="text-white/60 max-w-2xl mx-auto mb-8">
                Our AI evaluates your portfolio, engagement, and talent rating to automatically approve scholarships for premium courses and mentorship programs.
              </p>
              
              <div className="inline-block bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 text-left mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
                    <ShieldCheck size={24} className="text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-emerald-400">AI Eligibility Status: Approved</h3>
                    <p className="text-xs text-white/60">You are eligible for up to 50% scholarship on Advanced Courses.</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/40">Portfolio Score:</span>
                    <span className="font-bold">92/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">Platform Engagement:</span>
                    <span className="font-bold">High</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">Green ID Verification:</span>
                    <span className="font-bold text-emerald-400">Verified</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                {[
                  { title: 'Emerging Talent Grant', amount: '100% Funded', desc: 'Full scholarship for the 6-month intensive acting workshop.', status: 'Apply Now' },
                  { title: 'Technical Arts Support', amount: '50% Funded', desc: 'Partial scholarship for cinematography and editing masterclasses.', status: 'Pre-Approved' },
                ].map((grant, i) => (
                  <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-xl">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-lg">{grant.title}</h4>
                      <span className={cn(
                        "text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded",
                        grant.status === 'Pre-Approved' ? "bg-emerald-500/20 text-emerald-400" : "bg-gold/20 text-gold"
                      )}>{grant.status}</span>
                    </div>
                    <div className="text-xl font-bold text-white mb-2">{grant.amount}</div>
                    <p className="text-sm text-white/60 mb-4">{grant.desc}</p>
                    <button className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold transition-colors">View Details</button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'progress' && (
          <motion.div
            key="progress"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <div className="lg:col-span-2 space-y-6">
              <div className="glass-panel p-8">
                <h2 className="text-2xl font-bold mb-6">Learning Milestones</h2>
                <div className="space-y-6">
                  {[
                    { title: 'Introduction to Cinematography', progress: 100, status: 'Completed', date: 'Oct 12, 2025' },
                    { title: 'Advanced Lighting Techniques', progress: 65, status: 'In Progress', date: 'Current' },
                    { title: 'Color Grading Masterclass', progress: 0, status: 'Not Started', date: 'Upcoming' },
                  ].map((course, i) => (
                    <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-bold">{course.title}</h4>
                          <p className="text-xs text-white/40">{course.date}</p>
                        </div>
                        <span className={cn(
                          "text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded",
                          course.status === 'Completed' ? "bg-emerald-500/20 text-emerald-400" : 
                          course.status === 'In Progress' ? "bg-blue-500/20 text-blue-400" : "bg-white/10 text-white/40"
                        )}>{course.status}</span>
                      </div>
                      <div className="mt-4 space-y-1">
                        <div className="flex justify-between text-[10px] text-white/40">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden">
                          <div 
                            className={cn("h-full rounded-full", course.progress === 100 ? "bg-emerald-400" : "bg-blue-400")} 
                            style={{ width: `${course.progress}%` }} 
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1 space-y-6">
              <div className="glass-panel p-6 text-center">
                <div className="w-24 h-24 mx-auto relative mb-4">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path
                      className="text-white/10"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    />
                    <path
                      className="text-gold"
                      strokeDasharray="65, 100"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-2xl font-bold">65%</span>
                  </div>
                </div>
                <h3 className="font-bold mb-1">Overall Progress</h3>
                <p className="text-xs text-white/40">You are on track to complete your current learning path.</p>
              </div>

              <div className="glass-panel p-6">
                <h3 className="font-bold mb-4 flex items-center gap-2"><Award size={16} className="text-gold" /> Earned Certificates</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
                    <FileCheck size={20} className="text-emerald-400" />
                    <div>
                      <div className="text-xs font-bold">Intro to Cinematography</div>
                      <div className="text-[10px] text-white/40">Issued: Oct 12, 2025</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SmartAssistant = ({ setActiveSection }: { setActiveSection: (s: Section) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-20 right-0 w-80 glass-panel p-6 shadow-2xl border-gold/30"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center">
                <Cpu className="text-gold" size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm">SosrG Smart AI</h4>
                <p className="text-[10px] text-white/40">How can I help you today?</p>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Find a Casting Call', section: 'casting' },
                { label: 'Analyze my Script', section: 'ai-tools' },
                { label: 'Check Live Auctions', section: 'auction' },
                { label: 'Update my Profile', section: 'profile' },
              ].map((opt, i) => (
                <button
                  key={i}
                  onClick={() => { setActiveSection(opt.section as Section); setIsOpen(false); }}
                  className="w-full text-left p-3 bg-white/5 rounded-xl text-xs hover:bg-gold hover:text-black transition-all border border-white/5"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500",
          isOpen ? "bg-crimson rotate-90" : "bg-gold gold-glow hover:scale-110"
        )}
      >
        {isOpen ? <X className="text-white" /> : <Cpu className="text-black" size={32} />}
      </button>
    </div>
  );
};

const SmartSearchAndDiscovery = () => {
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

const AISuite = () => {
  const [activeTool, setActiveTool] = useState<'matching' | 'script' | 'legal'>('matching');
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      if (activeTool === 'script') {
        const data = await analyzeScript(inputText);
        setResult(data);
      } else if (activeTool === 'matching') {
        // Mock matching result
        setTimeout(() => {
          setResult({
            matchScore: 94,
            skillsMatched: ['Method Acting', 'Hindi', 'Marathi', 'Stage Combat'],
            faceAnalysis: 'High resemblance to character profile',
            voiceAnalysis: 'Baritone, matches emotional tone',
            experienceScore: '9.2/10',
            recommendation: 'Highly Recommended for Lead Role'
          });
          setLoading(false);
        }, 1500);
        return;
      } else if (activeTool === 'legal') {
        // Mock legal result
        setTimeout(() => {
          setResult({
            type: 'Standard Actor Agreement & NDA',
            clauses: ['IP Rights', 'Payment Terms', 'Non-Disclosure'],
            timestamp: '0x7f8b...3a21 (Blockchain Verified)',
            status: 'Ready for E-Signature & Secure Vault Storage'
          });
          setLoading(false);
        }, 1500);
        return;
      }
    } catch (e) {
      console.error(e);
    } finally {
      if (activeTool === 'script') {
        setLoading(false);
      }
    }
  };

  return (
    <section className="py-24 px-6 bg-cinematic-gray/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif italic mb-4">AI <span className="vibrant-text-2">Modules</span></h2>
          <p className="text-white/50 max-w-2xl mx-auto">Demonstrating the intelligent backbone of the platform to build trust in automation and fairness.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Tool Selector */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {[
              { id: 'matching', name: 'AI Casting Engine', icon: Zap, desc: 'Matches talent using face recognition, voice analysis, skill indexing, and experience scoring.' },
              { id: 'script', name: 'AI Script Analyser', icon: FileText, desc: 'Auto-generates character count, location needs, prop lists, department requirements, and estimated budget.' },
              { id: 'legal', name: 'AI Legal Layer', icon: ShieldCheck, desc: 'Auto-generates contracts, NDAs, copyright timestamping, and stores documents securely.' },
            ].map((tool) => (
              <button
                key={tool.id}
                onClick={() => { setActiveTool(tool.id as any); setResult(null); setInputText(''); }}
                className={cn(
                  "p-4 md:p-6 rounded-2xl text-left transition-all border",
                  activeTool === tool.id 
                    ? "bg-gold/10 border-gold/50 crimson-glow" 
                    : "bg-white/5 border-white/10 hover:border-white/20"
                )}
              >
                <div className="flex items-center gap-3 mb-2">
                  <tool.icon size={20} className={activeTool === tool.id ? "text-gold" : "text-white/40"} />
                  <span className={cn("font-bold text-sm md:text-base", activeTool === tool.id ? "text-gold" : "text-white")}>{tool.name}</span>
                </div>
                <p className="text-xs text-white/40 hidden sm:block leading-relaxed">{tool.desc}</p>
              </button>
            ))}
          </div>

          {/* Tool Workspace */}
          <div className="lg:col-span-8 glass-panel p-6 md:p-8 min-h-[400px] md:min-h-[500px] flex flex-col">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <h3 className="text-lg md:text-xl font-bold flex items-center gap-2">
                <Cpu size={20} className="text-gold" /> 
                {activeTool === 'script' ? 'Script Analyser' : 
                 activeTool === 'matching' ? 'Casting Engine' : 
                 'Legal Layer'}
              </h3>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => {
                    if (activeTool === 'script') setInputText("INT. MUMBAI APARTMENT - NIGHT\n\nARJUN (30s) stares at the rain. He holds a crumpled letter.\n\nARJUN\nIt wasn't supposed to end like this.\n\nHe drops the letter. It lands in a puddle of spilled chai.");
                    else if (activeTool === 'matching') setInputText("Looking for a method actor, age 25-35, fluent in Hindi and Marathi, for a lead role in a gritty crime drama. Must have theatre experience. Uploading reference face and voice samples...");
                    else if (activeTool === 'legal') setInputText("Lead Actor Agreement between SosrG Productions and SiDdhaRtha SosrG. 30 days shoot in Mumbai. ₹5,00,000 compensation. Include standard NDA.");
                  }}
                  className="text-[10px] uppercase tracking-widest text-gold hover:text-white transition-colors flex items-center gap-1"
                >
                  <Zap size={12} /> Smart Suggest
                </button>
                {loading && <div className="animate-spin rounded-full h-5 w-5 border-2 border-gold border-t-transparent" />}
              </div>
            </div>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                activeTool === 'script' 
                  ? "Paste your screenplay scene here..." 
                  : activeTool === 'matching' 
                    ? "Enter casting requirements and upload reference media..."
                    : "Enter deal terms and parties for contract generation..."
              }
              className="flex-1 bg-black/30 border border-white/10 rounded-xl p-4 text-white/80 focus:outline-none focus:border-gold/50 mb-6 resize-none font-mono text-xs md:text-sm min-h-[150px]"
            />

            <button
              onClick={handleAnalyze}
              disabled={loading || !inputText}
              className="w-full bg-gold text-black py-3 md:py-4 rounded-xl font-bold uppercase tracking-widest hover:scale-[1.02] transition-transform disabled:opacity-50 text-sm md:text-base"
            >
              Run AI Analysis
            </button>

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 md:mt-8 p-4 md:p-6 bg-white/5 rounded-xl border border-white/10"
              >
                <h4 className="text-gold font-bold mb-4 flex items-center gap-2 text-sm md:text-base">
                  <Award size={16} /> Analysis Report
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 text-xs md:text-sm">
                  {activeTool === 'script' && (
                    <>
                      <div>
                        <span className="text-white/40 block mb-1">Characters</span>
                        <div className="flex flex-wrap gap-2">
                          {result.characters?.map((c: any, i: number) => (
                            <span key={i} className="bg-white/10 px-2 py-1 rounded text-[10px] md:text-xs">{c.name} ({c.ageRange})</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-white/40 block mb-1">Budget Category</span>
                        <span className="text-emerald-400 font-bold">{result.budget}</span>
                      </div>
                    </>
                  )}
                  {activeTool === 'matching' && (
                    <>
                      <div className="col-span-1 sm:col-span-2">
                        <span className="text-white/40 block mb-1">Match Score</span>
                        <div className="flex items-center gap-4">
                          <div className="flex-1 bg-white/10 h-2 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${result.matchScore}%` }}
                              transition={{ duration: 1, ease: "easeOut" }}
                              className="bg-gold h-full" 
                            />
                          </div>
                          <span className="text-gold font-bold text-lg">{result.matchScore}%</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-white/40 block mb-1">Skills Matched</span>
                        <div className="flex flex-wrap gap-1">
                          {result.skillsMatched.map((skill: string, i: number) => (
                            <span key={i} className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded text-[10px]">{skill}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-white/40 block mb-1">Experience Score</span>
                        <span className="text-blue-400 font-bold">{result.experienceScore}</span>
                      </div>
                      <div className="col-span-1 sm:col-span-2">
                        <span className="text-white/40 block mb-1">Biometric Analysis</span>
                        <div className="text-white/80 flex flex-col gap-1">
                          <span><span className="text-gold">Face:</span> {result.faceAnalysis}</span>
                          <span><span className="text-gold">Voice:</span> {result.voiceAnalysis}</span>
                        </div>
                      </div>
                      <div className="col-span-1 sm:col-span-2">
                        <span className="text-white/40 block mb-1">Recommendation</span>
                        <span className="text-gold font-bold">{result.recommendation}</span>
                      </div>
                    </>
                  )}
                  {activeTool === 'legal' && (
                    <>
                      <div>
                        <span className="text-white/40 block mb-1">Document Type</span>
                        <span className="text-white font-bold">{result.type}</span>
                      </div>
                      <div>
                        <span className="text-white/40 block mb-1">Status</span>
                        <span className="text-emerald-400 font-bold flex items-center gap-1"><ShieldCheck size={14} /> {result.status}</span>
                      </div>
                      <div className="col-span-1 sm:col-span-2">
                        <span className="text-white/40 block mb-1">Copyright Timestamp</span>
                        <span className="text-gold font-mono">{result.timestamp}</span>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const CollaborationNetwork = () => {
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

const PremiumFeatures = () => (
  <section className="py-24 px-6 max-w-7xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-serif italic mb-4">Premium <span className="gold-text">Features</span></h2>
      <p className="text-white/40 max-w-2xl mx-auto">Elevate your creative career with advanced tools and increased visibility.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {[
        { 
          title: 'Profile Boost', 
          desc: 'Get prioritized in AI search results and casting recommendations.', 
          icon: TrendingUp,
          color: 'text-emerald-400',
          bg: 'bg-emerald-500/10',
          border: 'border-emerald-500/20'
        },
        { 
          title: 'Featured Placement', 
          desc: 'Spotlight positioning on the homepage and sector-specific hubs.', 
          icon: Star,
          color: 'text-gold',
          bg: 'bg-gold/10',
          border: 'border-gold/20'
        },
        { 
          title: 'AI Brand Score', 
          desc: 'Real-time metrics on market demand, profile strength, and skill gaps.', 
          icon: Award,
          color: 'text-blue-400',
          bg: 'bg-blue-500/10',
          border: 'border-blue-500/20'
        },
        { 
          title: 'Analytics Dashboard', 
          desc: 'Track profile views, recruiter interest, and audition conversion rates.', 
          icon: BarChart3,
          color: 'text-purple-400',
          bg: 'bg-purple-500/10',
          border: 'border-purple-500/20'
        }
      ].map((feature, i) => (
        <div key={i} className={cn("p-8 rounded-2xl border transition-all hover:-translate-y-2 group", feature.bg, feature.border)}>
          <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-black/40", feature.color)}>
            <feature.icon size={24} />
          </div>
          <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
          <p className="text-sm text-white/60 leading-relaxed mb-6">{feature.desc}</p>
          <button className={cn("text-xs font-bold uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all", feature.color)}>
            Learn More <ChevronRight size={14} />
          </button>
        </div>
      ))}
    </div>
  </section>
);

const TrustSystem = () => (
  <section className="py-24 px-6 max-w-7xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-serif italic mb-4">Integrity & <span className="gold-text">Security</span></h2>
      <p className="text-white/40 max-w-2xl mx-auto">AI-supported features to avoid glitches and chaos in the film/art industry.</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
      <div className="glass-panel-green p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <ShieldCheck size={120} className="text-emerald-500" />
        </div>
        <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
          <ShieldCheck className="text-emerald-500" /> AI Rating System
        </h3>
        <div className="space-y-6">
          {[
            { label: 'Verified Reviews Only', desc: 'Ratings are only accepted from users with confirmed project completions.', icon: CheckCircle },
            { label: 'Project Completion Score', desc: 'Automated tracking of milestone delivery and deadline adherence.', icon: TrendingUp },
            { label: 'Professional Behaviour Rating', desc: 'AI-analyzed communication and collaboration feedback.', icon: MessageSquare },
          ].map((item, i) => (
            <div key={i} className="flex gap-4">
              <div className="mt-1 text-gold"><item.icon size={20} /></div>
              <div>
                <div className="font-bold">{item.label}</div>
                <p className="text-sm text-white/40">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-panel-blue p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Scale size={120} className="text-blue-500" />
        </div>
        <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
          <Scale className="text-blue-500" /> AI Legal Protection
        </h3>
        <div className="space-y-6">
          {[
            { label: 'Auto NDA Generation', desc: 'Smart NDAs are automatically triggered and signed before collaboration.', icon: FileText },
            { label: 'Auto Contract Draft', desc: 'Legally binding contracts generated based on project scope and budget.', icon: PenTool },
            { label: 'Copyright Timestamp', desc: 'Blockchain-based proof of creation for every creative asset uploaded.', icon: History },
          ].map((item, i) => (
            <div key={i} className="flex gap-4">
              <div className="mt-1 text-gold"><item.icon size={20} /></div>
              <div>
                <div className="font-bold">{item.label}</div>
                <p className="text-sm text-white/40">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
      <div className="text-center p-8 glass-panel">
        <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldCheck className="text-emerald-400" size={32} />
        </div>
        <h3 className="text-xl font-bold mb-4">Verified Professionals</h3>
        <p className="text-white/40 text-sm">Government ID KYC and skill-based verification for every artist and recruiter.</p>
      </div>
      <div className="text-center p-8 glass-panel">
        <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="text-blue-400" size={32} />
        </div>
        <h3 className="text-xl font-bold mb-4">Escrow Protection</h3>
        <p className="text-white/40 text-sm">Milestone-based payments ensuring safety for both talent and production houses.</p>
      </div>
      <div className="text-center p-8 glass-panel">
        <div className="w-16 h-16 bg-crimson/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <TrendingUp className="text-crimson" size={32} />
        </div>
        <h3 className="text-xl font-bold mb-4">IP & Copyright</h3>
        <p className="text-white/40 text-sm">Blockchain-based script timestamping and digital watermarking for all creative assets.</p>
      </div>
    </div>
  </section>
);

const MobileAppStructure = () => (
  <section className="py-24 px-6 max-w-7xl mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div className="order-2 lg:order-1 relative">
        <div className="absolute inset-0 bg-gold/5 rounded-full blur-[100px]" />
        <div className="relative mx-auto w-[280px] h-[580px] bg-black rounded-[3rem] border-8 border-white/10 p-4 shadow-2xl flex flex-col overflow-hidden">
          {/* Mobile Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-white/10 rounded-b-xl z-20" />
          
          {/* Mobile App UI Mockup */}
          <div className="flex-1 bg-cinematic-gray rounded-2xl overflow-hidden relative flex flex-col">
            <div className="p-4 bg-black/50 backdrop-blur-md sticky top-0 z-10 border-b border-white/5 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-crimson rounded flex items-center justify-center">
                  <span className="text-[10px] font-bold italic">S</span>
                </div>
                <span className="text-xs font-bold gold-text">SosrG</span>
              </div>
              <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center">
                <User size={12} />
              </div>
            </div>
            
            <div className="p-4 space-y-4 overflow-y-auto no-scrollbar flex-1 pb-20">
              <div className="bg-gold/10 border border-gold/20 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Zap size={14} className="text-gold" />
                  <span className="text-[10px] font-bold text-gold uppercase tracking-widest">AI Match Alert</span>
                </div>
                <div className="text-xs font-bold mb-1">Lead Role - Netflix Thriller</div>
                <div className="text-[10px] text-white/60 mb-2">94% Match • ₹5L Budget</div>
                <button className="w-full bg-gold text-black py-1.5 rounded text-[10px] font-bold uppercase tracking-widest">Quick Apply</button>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Video size={14} className="text-blue-400" />
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Pending Audition</span>
                </div>
                <div className="text-xs font-bold mb-1">Dharma Productions</div>
                <div className="text-[10px] text-white/60 mb-2">Due in 24 hours</div>
                <button className="w-full bg-white/10 text-white py-1.5 rounded text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-1">
                  <Video size={10} /> Record Now
                </button>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-2">
                  <PenTool size={14} className="text-emerald-400" />
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Contract Ready</span>
                </div>
                <div className="text-xs font-bold mb-1">Standard Actor Agreement</div>
                <button className="w-full bg-emerald-500 text-black py-1.5 rounded text-[10px] font-bold uppercase tracking-widest">E-Sign Document</button>
              </div>
            </div>

            {/* Mobile Bottom Nav */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md border-t border-white/10 p-4 flex justify-between items-center">
              <LayoutDashboard size={18} className="text-gold" />
              <Search size={18} className="text-white/40" />
              <div className="w-10 h-10 bg-crimson rounded-full flex items-center justify-center -mt-8 border-4 border-cinematic-gray">
                <Video size={16} className="text-white" />
              </div>
              <MessageSquare size={18} className="text-white/40 relative">
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-crimson rounded-full" />
              </MessageSquare>
              <User size={18} className="text-white/40" />
            </div>
          </div>
        </div>
      </div>

      <div className="order-1 lg:order-2 space-y-8">
        <div>
          <h2 className="text-4xl font-serif italic mb-4">Mobile App <span className="gold-text">Structure</span></h2>
          <p className="text-white/60 leading-relaxed max-w-lg">
            Designed for fast, real-time industry interaction. Carry your casting studio, legal vault, and network in your pocket.
          </p>
        </div>

        <div className="space-y-6">
          {[
            { title: 'Instant Audition Recording', desc: 'Record and submit self-tapes directly from your phone with built-in teleprompter and AI lighting enhancement.', icon: Video, color: 'text-blue-400' },
            { title: 'Quick Apply Casting', desc: 'One-tap applications using your pre-verified AI portfolio and showreel.', icon: Zap, color: 'text-gold' },
            { title: 'Push Notifications', desc: 'Real-time alerts for audition callbacks, message requests, and escrow payment releases.', icon: AlertCircle, color: 'text-crimson' },
            { title: 'Digital Contract Signing', desc: 'Review and e-sign legally binding agreements and NDAs on the go.', icon: PenTool, color: 'text-emerald-400' },
            { title: 'AI Match Alerts', desc: 'Get instantly notified when a new project perfectly matches your biometric and skill profile.', icon: Cpu, color: 'text-purple-400' },
          ].map((feature, i) => (
            <div key={i} className="flex gap-4">
              <div className={cn("mt-1", feature.color)}>
                <feature.icon size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">{feature.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4 pt-4">
          <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors">
            <Globe size={18} /> App Store
          </button>
          <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors">
            <Globe size={18} /> Google Play
          </button>
        </div>
      </div>
    </div>
  </section>
);

const MonetizationModel = () => (
  <section className="py-24 px-6 max-w-7xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-serif italic mb-4">Monetization <span className="gold-text">Model</span></h2>
      <p className="text-white/40 max-w-2xl mx-auto">Transparent, value-driven revenue streams designed to support the creative ecosystem.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        { 
          title: 'Subscription Memberships', 
          desc: 'Tiered access for talent and recruiters with advanced AI features and unlimited applications.', 
          icon: Trophy,
          color: 'text-gold',
          bg: 'bg-gold/10',
          border: 'border-gold/20'
        },
        { 
          title: 'Commission per Hiring', 
          desc: 'A small percentage fee on successful casting and project completion via our secure escrow.', 
          icon: Wallet,
          color: 'text-emerald-400',
          bg: 'bg-emerald-500/10',
          border: 'border-emerald-500/20'
        },
        { 
          title: 'Featured Talent Listings', 
          desc: 'Premium placement for talent profiles and casting calls to maximize visibility.', 
          icon: Star,
          color: 'text-blue-400',
          bg: 'bg-blue-500/10',
          border: 'border-blue-500/20'
        },
        { 
          title: 'Studio Advertisement', 
          desc: 'Targeted ad placements for production houses, acting schools, and equipment vendors.', 
          icon: Video,
          color: 'text-purple-400',
          bg: 'bg-purple-500/10',
          border: 'border-purple-500/20'
        },
        { 
          title: 'Legal Documentation Fees', 
          desc: 'Pay-per-use or bundled pricing for AI-generated contracts, NDAs, and IP timestamping.', 
          icon: FileText,
          color: 'text-crimson',
          bg: 'bg-crimson/10',
          border: 'border-crimson/20'
        },
        { 
          title: 'Verification Charges', 
          desc: 'One-time fee for KYC, background checks, and professional skill verification.', 
          icon: ShieldCheck,
          color: 'text-emerald-400',
          bg: 'bg-emerald-500/10',
          border: 'border-emerald-500/20'
        }
      ].map((model, i) => (
        <div key={i} className={cn("p-8 rounded-2xl border transition-all hover:-translate-y-2 group", model.bg, model.border)}>
          <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-black/40", model.color)}>
            <model.icon size={24} />
          </div>
          <h3 className="text-xl font-bold mb-3">{model.title}</h3>
          <p className="text-sm text-white/60 leading-relaxed">{model.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-cinematic-black/80 backdrop-blur-xl border-t border-white/10 py-16 px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-2">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-crimson rounded flex items-center justify-center">
            <span className="text-lg font-bold italic">S</span>
          </div>
          <span className="text-xl font-bold tracking-tighter gold-text">SosrG</span>
        </div>
        <p className="text-white/40 max-w-md mb-8">
          The unified ecosystem for Cinema, Theatre, and Cultural Arts. Empowering the next generation of creative professionals with AI and trust.
        </p>
        <div className="flex gap-4">
          {['Twitter', 'Instagram', 'LinkedIn', 'YouTube'].map(s => (
            <a key={s} href="#" className="text-white/40 hover:text-gold transition-colors text-sm">{s}</a>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-white/60">Platform</h4>
        <ul className="space-y-4 text-sm text-white/40">
          <li><a href="#" className="hover:text-gold">Talent Marketplace</a></li>
          <li><a href="#" className="hover:text-gold">AI Script Breakdown</a></li>
          <li><a href="#" className="hover:text-gold">Audition Evaluator</a></li>
          <li><a href="#" className="hover:text-gold">Legal & Contracts</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-white/60">Company</h4>
        <ul className="space-y-4 text-sm text-white/40">
          <li><a href="#" className="hover:text-gold">About Us</a></li>
          <li><a href="#" className="hover:text-gold">Safety Policy</a></li>
          <li><a href="#" className="hover:text-gold">Premium Plans</a></li>
          <li><a href="#" className="hover:text-gold">Contact Support</a></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/20">
      <p>© 2026 SosrG Creative Industry Platform. All rights reserved.</p>
      <div className="flex gap-8">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Cookie Policy</a>
      </div>
    </div>
  </footer>
);

const Marketplace = () => {
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

const EcosystemHub = () => {
  const [activeView, setActiveView] = useState<'hierarchy' | 'revenue' | 'franchise' | 'monitoring' | 'counselling' | 'grading' | 'event-builder' | 'franchise-structure'>('hierarchy');
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  
  const CP_LEVELS = [
    { 
      id: 'pcp', 
      name: 'Pin-Code Connecting Partner', 
      level: 'LEVEL 1', 
      icon: MapPin, 
      color: 'text-crimson',
      eligibility: ['Purchase SosrG Membership', 'Activate Green ID', '10 Actor/Model Profiles', '10 Business Profiles', '20 Creator Profiles'],
      duties: ['Connect Artists & Vendors', 'Manage Pin Code Data', 'Art Mart Store In-Charge', 'Local Event Creation'],
      revenue: ['Referral Coins', 'Referral Currency', 'Event Revenue %', 'Recognition Badge'],
      duration: 'Minimum 1 Year'
    },
    { 
      id: 'dcp', 
      name: 'District Connecting Partner', 
      level: 'LEVEL 2', 
      icon: Building2, 
      color: 'text-emerald-400',
      eligibility: ['1000 Talented Users via own + PCP network'],
      duties: ['Career Counseling', 'District Events', 'Connect Travel Agents', 'Monitor PCP Data', 'Implement Grading System'],
      revenue: ['Referral Income', 'Event Revenue %', 'District Performance Bonus'],
      duration: '3 Years'
    },
    { 
      id: 'scp', 
      name: 'State Connecting Partner', 
      level: 'LEVEL 3', 
      icon: Globe, 
      color: 'text-blue-400',
      eligibility: ['10,000 Users via DCP network', '100 Events under guidance'],
      duties: ['Guide DCPs', 'Monitor State System', 'Strategic Programs', 'High-level Career Guidance'],
      revenue: ['State-level Revenue Share', 'Event Commission', 'Platform Share'],
      duration: '5 Years'
    },
    { 
      id: 'zcp', 
      name: 'Zonal Connecting Partner', 
      level: 'LEVEL 4', 
      icon: Users, 
      color: 'text-purple-400',
      eligibility: ['Same as SCP'],
      duties: ['Monitor Multiple States', 'Coordinate with Super Admin', 'Regional Implementation'],
      revenue: ['Zonal Incentives', 'Cross-State Event %', 'High-tier Referral %'],
      duration: '5 Years'
    },
    { 
      id: 'sp', 
      name: 'SosrG Partner (Expert Personality)', 
      level: 'LEVEL 5', 
      icon: Star, 
      color: 'text-gold',
      eligibility: ['15 Years as CP', 'Clean Character Record'],
      duties: ['Live Mentorship', 'Video Content on Art Issues', 'Promotion of Indian Art & Culture', 'Guide CPs'],
      revenue: ['Premium Visibility', 'Honorary Recognition', 'Event Invitations'],
      duration: '6 Years'
    },
  ];

  const [selectedCP, setSelectedCP] = useState<typeof CP_LEVELS[0] | null>(null);

  const REFERRAL_STATS = [
    { label: 'Total Referrals', value: '1,240', trend: '+12%', icon: Users },
    { label: 'Referral Coins', value: '45,200', trend: '+15%', icon: Zap },
    { label: 'Referral Currency', value: '₹4.2L', trend: '+8%', icon: Wallet },
    { label: 'Active Partners', value: '85', trend: '+5%', icon: Handshake },
  ];

  return (
    <div className="pt-32 px-6 max-w-7xl mx-auto min-h-screen pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif italic mb-2">SosrG <span className="vibrant-text-1">Ecosystem</span></h1>
          <p className="text-white/50">Premium AI-supported multi-level creative infrastructure.</p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <button 
            onClick={() => setIsSuperAdmin(!isSuperAdmin)}
            className={cn(
              "flex items-center justify-center md:justify-start gap-2 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border",
              isSuperAdmin ? "bg-crimson text-white border-crimson shadow-lg shadow-crimson/20" : "bg-white/5 text-white/40 border-white/10"
            )}
          >
            <ShieldCheck size={14} /> {isSuperAdmin ? 'Super Admin Active' : 'Switch to Super Admin'}
          </button>
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 overflow-x-auto no-scrollbar w-full md:w-auto">
            {[
              { id: 'hierarchy', label: 'CP Hierarchy', icon: Users },
              { id: 'franchise-structure', label: 'Franchise Structure', icon: Network },
              { id: 'revenue', label: 'Revenue Engine', icon: Wallet },
              { id: 'franchise', label: 'Academy Franchise', icon: Building2 },
              { id: 'monitoring', label: 'AI Monitoring', icon: BarChart3 },
              { id: 'counselling', label: 'AI Counselling', icon: GraduationCap },
              { id: 'grading', label: 'AI Grading', icon: Star },
              { id: 'event-builder', label: 'AI Event Builder', icon: Calendar },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id as any)}
                className={cn(
                  "flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap",
                  activeView === tab.id ? "bg-gold text-black" : "text-white/60 hover:text-white"
                )}
              >
                <tab.icon size={16} /> {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeView === 'franchise-structure' && (
          <motion.div
            key="franchise-structure"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-2 mb-6">
              <Network size={24} className="text-gold" />
              <h2 className="text-3xl font-bold">Franchise Structure</h2>
            </div>
            <p className="text-white/60 max-w-3xl mb-8">
              A robust, multi-tiered franchise model designed to empower local leaders, scale operations nationally, and provide expert mentorship at every level. Each role features integrated performance tracking and AI-driven scoring to ensure quality and growth.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { 
                  id: 'pcp', 
                  title: 'PCP', 
                  subtitle: 'Pin-Code Connecting Partner',
                  desc: 'Local-level connector managing events and user queries.', 
                  icon: MapPin, 
                  color: 'text-crimson', 
                  bg: 'bg-crimson/10',
                  border: 'border-crimson/20',
                  score: 92,
                  metrics: ['Events Managed', 'User Queries Resolved']
                },
                { 
                  id: 'dcp', 
                  title: 'DCP', 
                  subtitle: 'District Connecting Partner',
                  desc: 'District-level mentor and event coordinator.', 
                  icon: Building2, 
                  color: 'text-emerald-400', 
                  bg: 'bg-emerald-500/10',
                  border: 'border-emerald-500/20',
                  score: 88,
                  metrics: ['District Events', 'Mentorship Sessions']
                },
                { 
                  id: 'scp', 
                  title: 'SCP', 
                  subtitle: 'State Connecting Partner',
                  desc: 'State-level strategic planner and revenue manager.', 
                  icon: Globe, 
                  color: 'text-blue-400', 
                  bg: 'bg-blue-500/10',
                  border: 'border-blue-500/20',
                  score: 95,
                  metrics: ['State Revenue', 'Strategic Plans Executed']
                },
                { 
                  id: 'zcp', 
                  title: 'ZCP', 
                  subtitle: 'Zonal Connecting Partner',
                  desc: 'National coordination and artist promotion.', 
                  icon: Users, 
                  color: 'text-purple-400', 
                  bg: 'bg-purple-500/10',
                  border: 'border-purple-500/20',
                  score: 91,
                  metrics: ['Artists Promoted', 'National Campaigns']
                },
                { 
                  id: 'ep', 
                  title: 'EP', 
                  subtitle: 'Expert Personality',
                  desc: 'Expert mentor conducting live sessions.', 
                  icon: Star, 
                  color: 'text-gold', 
                  bg: 'bg-gold/10',
                  border: 'border-gold/20',
                  score: 98,
                  metrics: ['Live Sessions', 'Mentee Success Rate']
                },
              ].map((role) => (
                <div key={role.id} className={cn("glass-panel p-6 border transition-all hover:-translate-y-1", role.border)}>
                  <div className="flex justify-between items-start mb-4">
                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", role.bg)}>
                      <role.icon className={role.color} size={24} />
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">AI Score</div>
                      <div className={cn("text-xl font-bold flex items-center gap-1", role.color)}>
                        <TrendingUp size={14} /> {role.score}/100
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-1">{role.title}</h3>
                  <div className={cn("text-xs font-bold uppercase tracking-widest mb-3", role.color)}>{role.subtitle}</div>
                  <p className="text-sm text-white/60 mb-6 h-10">{role.desc}</p>
                  
                  <div className="space-y-3">
                    <div className="text-[10px] uppercase tracking-widest text-white/40">Performance Tracking</div>
                    {role.metrics.map((metric, i) => (
                      <div key={i} className="flex justify-between items-center text-xs p-2 bg-white/5 rounded-lg">
                        <span className="text-white/80">{metric}</span>
                        <div className="w-16 h-1.5 bg-black/50 rounded-full overflow-hidden">
                          <div className={cn("h-full rounded-full", role.bg.replace('/10', ''))} style={{ width: `${70 + Math.random() * 30}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeView === 'hierarchy' && (
          <motion.div
            key="hierarchy"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {CP_LEVELS.map((cp, i) => (
                <button 
                  key={cp.id} 
                  onClick={() => setSelectedCP(cp)}
                  className={cn(
                    "glass-panel p-6 text-center relative group transition-all",
                    selectedCP?.id === cp.id ? "border-gold shadow-lg shadow-gold/10" : "hover:border-gold/30"
                  )}
                >
                  <div className={cn("w-12 h-12 mx-auto mb-4 rounded-xl bg-white/5 flex items-center justify-center", cp.color)}>
                    <cp.icon size={24} />
                  </div>
                  <h3 className="font-bold text-sm mb-1">{cp.name}</h3>
                  <p className="text-[10px] uppercase tracking-widest text-white/40">{cp.level}</p>
                  {i < CP_LEVELS.length - 1 && (
                    <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-white/20">
                      <ChevronRight size={20} />
                    </div>
                  )}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {selectedCP && (
                <motion.div
                  key={selectedCP.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="glass-panel p-8 border-gold/20 bg-gold/5">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                      <div className="flex-1 space-y-6">
                        <div className="flex items-center gap-4">
                          <div className={cn("p-3 rounded-2xl bg-white/5", selectedCP.color)}>
                            <selectedCP.icon size={32} />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold">{selectedCP.name}</h3>
                            <p className="text-xs text-white/40 uppercase tracking-widest">{selectedCP.level} • {selectedCP.duration}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                          <div>
                            <h4 className="text-[10px] uppercase tracking-widest text-gold font-bold mb-4">Eligibility</h4>
                            <ul className="space-y-2">
                              {selectedCP.eligibility.map((e, idx) => (
                                <li key={idx} className="text-xs text-white/60 flex items-start gap-2">
                                  <div className="w-1 h-1 rounded-full bg-gold mt-1.5" /> {e}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-[10px] uppercase tracking-widest text-gold font-bold mb-4">Duties</h4>
                            <ul className="space-y-2">
                              {selectedCP.duties.map((d, idx) => (
                                <li key={idx} className="text-xs text-white/60 flex items-start gap-2">
                                  <div className="w-1 h-1 rounded-full bg-gold mt-1.5" /> {d}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-[10px] uppercase tracking-widest text-gold font-bold mb-4">Revenue</h4>
                            <ul className="space-y-2">
                              {selectedCP.revenue.map((r, idx) => (
                                <li key={idx} className="text-xs text-white/60 flex items-start gap-2">
                                  <div className="w-1 h-1 rounded-full bg-gold mt-1.5" /> {r}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={() => setSelectedCP(null)}
                        className="text-white/20 hover:text-white transition-colors"
                      >
                        <X size={24} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="glass-panel p-8">
              <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                <MapPin className="text-gold" /> Location-Based Artist Connection
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-black/30 rounded-2xl border border-white/10 h-[400px] relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20 bg-[url('https://picsum.photos/seed/india-map/1200/800')] bg-cover bg-center" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Globe className="text-gold/20 mx-auto mb-4" size={80} />
                      <p className="text-white/40 text-sm">Interactive India Artist Map</p>
                      <p className="text-[10px] uppercase tracking-widest text-gold mt-2 animate-pulse">Scanning 28 States & 8 UTs...</p>
                    </div>
                  </div>
                  {/* Mock Pins */}
                  <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-gold rounded-full crimson-glow animate-ping" />
                  <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-crimson rounded-full gold-glow animate-ping" />
                  <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-blue-500 rounded-full blue-glow animate-ping" />
                </div>
                <div className="space-y-4">
                  <h4 className="font-bold text-sm uppercase tracking-widest text-white/60">Nearby Artists</h4>
                  {[
                    { name: 'Rahul V.', role: 'Actor', dist: '2.4 km', status: 'Available' },
                    { name: 'Sneha K.', role: 'Dancer', dist: '5.1 km', status: 'In Project' },
                    { name: 'Amit S.', role: 'Director', dist: '8.9 km', status: 'Available' },
                    { name: 'Priya M.', role: 'Writer', dist: '12.4 km', status: 'Available' },
                  ].map((artist, i) => (
                    <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5 flex justify-between items-center">
                      <div>
                        <div className="font-bold text-sm">{artist.name}</div>
                        <div className="text-[10px] text-white/40 uppercase tracking-widest">{artist.role} • {artist.dist}</div>
                      </div>
                      <span className={cn("text-[8px] font-bold px-2 py-1 rounded uppercase tracking-widest", artist.status === 'Available' ? "bg-emerald-500/10 text-emerald-400" : "bg-white/10 text-white/40")}>
                        {artist.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeView === 'revenue' && (
          <motion.div
            key="revenue"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {REFERRAL_STATS.map((stat, i) => (
                <div key={i} className="glass-panel p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-gold/10 rounded-lg text-gold">
                      <stat.icon size={20} />
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400">{stat.trend}</span>
                  </div>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/40">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="glass-panel p-8">
              <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                <Zap className="text-gold" /> Transparent Revenue Automation
              </h3>
              <div className="space-y-6">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h4 className="font-bold">AI Referral Engine</h4>
                      <p className="text-xs text-white/40">Hierarchical tracking, auto-calculated revenue, and fake ID prevention.</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center gap-1"><ShieldCheck size={12}/> Fake ID Guard Active</span>
                      <button className="bg-gold text-black px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest">Withdraw Funds</button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {[
                      { from: 'SiDdhaRtha SosrG', project: 'Urban Beats Ad', commission: '₹12,400', status: 'Settled', date: 'Oct 28' },
                      { from: 'Sanya Iyer', project: 'Classical Fusion', commission: '₹8,500', status: 'Pending', date: 'Oct 25' },
                      { from: 'Vikram Singh', project: 'The Silent Valley', commission: '₹25,000', status: 'Settled', date: 'Oct 20' },
                    ].map((tx, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-white/5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gold">
                            <ArrowUpRight size={18} />
                          </div>
                          <div>
                            <div className="font-bold text-sm">{tx.from}</div>
                            <div className="text-[10px] text-white/40 uppercase tracking-widest">{tx.project} • {tx.date}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-emerald-400">{tx.commission}</div>
                          <div className={cn("text-[8px] font-bold uppercase tracking-widest", tx.status === 'Settled' ? "text-emerald-400" : "text-gold")}>{tx.status}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeView === 'franchise' && (
          <motion.div
            key="franchise"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="glass-panel p-12 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-crimson via-gold to-crimson" />
              <div className="w-20 h-20 bg-crimson/20 rounded-full flex items-center justify-center mx-auto mb-8 gold-glow">
                <Building2 size={40} className="text-crimson" />
              </div>
              <h2 className="text-3xl font-bold mb-4">SosrG Academy Franchise Module</h2>
              <p className="text-white/40 max-w-2xl mx-auto mb-10">
                Join our nationwide network of creative hubs. Standardized infrastructure for the next generation of Indian artists.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left">
                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                  <h4 className="text-gold font-bold text-sm uppercase tracking-widest mb-4 flex items-center gap-2"><Star size={16}/> Franchise Rights</h4>
                  <ul className="space-y-3 text-sm text-white/60">
                    <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5" /> Use SosrG Brand Logo</li>
                    <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5" /> Free Membership (1 Year)</li>
                    <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5" /> Casting Call Access</li>
                    <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5" /> Faculty Hiring Support</li>
                  </ul>
                </div>
                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                  <h4 className="text-blue-400 font-bold text-sm uppercase tracking-widest mb-4 flex items-center gap-2"><Building2 size={16}/> Physical Setup</h4>
                  <ul className="space-y-3 text-sm text-white/60">
                    <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5" /> 1 Office Room</li>
                    <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5" /> 2 Washrooms (Male/Female)</li>
                    <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5" /> 4 Classrooms: Dance Hall, Music Room, Acting Class, Art/Craft Class</li>
                  </ul>
                </div>
                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                  <h4 className="text-emerald-400 font-bold text-sm uppercase tracking-widest mb-4 flex items-center gap-2"><Briefcase size={16}/> Support Materials</h4>
                  <ul className="space-y-3 text-sm text-white/60">
                    <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5" /> Office Kit</li>
                    <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5" /> Training Kit</li>
                    <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5" /> Student Kit</li>
                  </ul>
                </div>
              </div>

              <div className="p-8 bg-black/30 border border-white/10 rounded-3xl text-left mb-8">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Cpu className="text-crimson"/> AI Academy Management</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                    <BarChart3 className="text-gold mb-3" size={20} />
                    <h5 className="font-bold text-sm mb-1">Track Performance</h5>
                    <p className="text-[10px] text-white/40">Real-time academy quality rating.</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                    <Users className="text-blue-400 mb-3" size={20} />
                    <h5 className="font-bold text-sm mb-1">Student Enrollments</h5>
                    <p className="text-[10px] text-white/40">Automated batch & fee monitoring.</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                    <Calendar className="text-emerald-400 mb-3" size={20} />
                    <h5 className="font-bold text-sm mb-1">Event Reports</h5>
                    <p className="text-[10px] text-white/40">Generate participation analytics.</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                    <Video className="text-crimson mb-3" size={20} />
                    <h5 className="font-bold text-sm mb-1">Casting Connect</h5>
                    <p className="text-[10px] text-white/40">Direct pipeline for top students.</p>
                  </div>
                </div>
              </div>

              <button className="bg-crimson text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform">Apply for Academy Franchise</button>
            </div>
          </motion.div>
        )}

        {activeView === 'monitoring' && (
          <motion.div
            key="monitoring"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="glass-panel p-8">
                  <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                    <BarChart3 className="text-gold" /> AI Monitoring Dashboard
                  </h3>
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                      <div className="text-xs text-white/40 uppercase tracking-widest mb-2">Platform Integrity</div>
                      <div className="text-3xl font-bold text-emerald-400">99.8%</div>
                      <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: '99.8%' }} />
                      </div>
                    </div>
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                      <div className="text-xs text-white/40 uppercase tracking-widest mb-2">Active CP Nodes</div>
                      <div className="text-3xl font-bold text-gold">452</div>
                      <div className="mt-4 flex gap-1">
                        {['PCP', 'DCP', 'SCP', 'ZCP', 'SP'].map(lvl => (
                          <div key={lvl} className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-gold/50" style={{ width: '70%' }} />
                          </div>
                        ))}
                      </div>
                      <div className="mt-2 flex justify-between text-[8px] text-white/20 uppercase tracking-widest">
                        <span>PCP</span><span>DCP</span><span>SCP</span><span>ZCP</span><span>SP</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-bold text-sm uppercase tracking-widest text-white/60">System Alerts</h4>
                    {[
                      { msg: 'DCP Mumbai: High traffic detected in Casting module.', time: '2 mins ago', type: 'info' },
                      { msg: 'SCP Karnataka: New franchise application pending review.', time: '15 mins ago', type: 'warning' },
                      { msg: 'System: Weekly revenue automation completed successfully.', time: '1 hour ago', type: 'success' },
                    ].map((alert, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          alert.type === 'info' ? "bg-blue-500" : alert.type === 'warning' ? "bg-gold" : "bg-emerald-500"
                        )} />
                        <div className="flex-1">
                          <p className="text-xs text-white/80">{alert.msg}</p>
                          <p className="text-[10px] text-white/20 uppercase tracking-widest mt-1">{alert.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {isSuperAdmin && (
                    <div className="mt-8 pt-8 border-t border-white/5">
                      <h4 className="font-bold text-sm uppercase tracking-widest text-crimson mb-6 flex items-center gap-2">
                        <ShieldCheck size={16} /> Super Admin Controls
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-crimson/5 border border-crimson/20 rounded-xl">
                          <div className="text-[10px] text-crimson font-bold uppercase tracking-widest mb-1">Total Revenue (India)</div>
                          <div className="text-xl font-bold">₹12.4 Cr</div>
                        </div>
                        <div className="p-4 bg-crimson/5 border border-crimson/20 rounded-xl">
                          <div className="text-[10px] text-crimson font-bold uppercase tracking-widest mb-1">Total Artist Base</div>
                          <div className="text-xl font-bold">1.2M</div>
                        </div>
                        <div className="p-4 bg-crimson/5 border border-crimson/20 rounded-xl">
                          <div className="text-[10px] text-crimson font-bold uppercase tracking-widest mb-1">Franchise Growth</div>
                          <div className="text-xl font-bold">+42%</div>
                        </div>
                      </div>
                      <div className="mt-6 flex gap-4">
                        <button className="flex-1 bg-crimson text-white py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest">Global System Reset</button>
                        <button className="flex-1 bg-white/5 border border-white/10 text-white py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest">Audit Logs</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-8">
                <div className="glass-panel p-8">
                  <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                    <PieChart className="text-gold" /> Gender Representation System
                  </h3>
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                        { level: 'State (SCP)', male: 28, female: 28, other: 28, total: 84 },
                        { level: 'District (DCP)', male: 766, female: 766, other: 766, total: 2298 },
                        { level: 'Pin Code (PCP)', male: 19000, female: 19000, other: 19000, total: 57000 },
                      ].map((lvl, i) => (
                        <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/10">
                          <div className="text-[10px] uppercase tracking-widest text-white/40 mb-3">{lvl.level}</div>
                          <div className="flex items-center gap-1 h-2 mb-3">
                            <div className="flex-1 bg-blue-500 rounded-full" />
                            <div className="flex-1 bg-crimson rounded-full" />
                            <div className="flex-1 bg-purple-500 rounded-full" />
                          </div>
                          <div className="flex justify-between text-[10px] font-bold">
                            <span className="text-blue-400">M: {lvl.male}</span>
                            <span className="text-crimson">F: {lvl.female}</span>
                            <span className="text-purple-400">O: {lvl.other}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-6 bg-black/30 rounded-2xl border border-white/10">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-bold text-sm uppercase tracking-widest text-emerald-400">AI Balance Tracker</h4>
                        <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded">Perfectly Balanced</span>
                      </div>
                      <p className="text-xs text-white/60 italic mb-4">"AI is currently maintaining a 1:1:1 ratio across all levels. Over-allocation prevention is active for 42 districts."</p>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: '100%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeView === 'counselling' && (
          <motion.div
            key="counselling"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="glass-panel p-12 text-center bg-gradient-to-br from-gold/10 to-transparent">
              <GraduationCap className="mx-auto mb-8 text-gold" size={60} />
              <h2 className="text-3xl font-bold mb-4">AI Career Counselling</h2>
              <p className="text-white/40 max-w-2xl mx-auto mb-10">
                Personalized career roadmaps for the Indian Art industries. Powered by real-time market data and industry trends.
              </p>
              <div className="max-w-4xl mx-auto space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-black/30 border border-white/10 rounded-2xl p-6 text-left">
                    <h4 className="font-bold mb-4 flex items-center gap-2 text-gold"><Zap size={18} /> Skill-Based Suggestions</h4>
                    <p className="text-sm text-white/60 mb-4">"Based on your profile as an Intermediate Method Actor, you are 3 projects away from the 'Expert' tier. We recommend focusing on Action Stunts to bridge your current skill gap."</p>
                    <div className="flex gap-2">
                      <span className="bg-white/5 px-2 py-1 rounded text-[10px] text-white/40 border border-white/10">Action Stunts</span>
                      <span className="bg-white/5 px-2 py-1 rounded text-[10px] text-white/40 border border-white/10">Voice Modulation</span>
                    </div>
                  </div>
                  <div className="bg-black/30 border border-white/10 rounded-2xl p-6 text-left">
                    <h4 className="font-bold mb-4 flex items-center gap-2 text-blue-400"><Briefcase size={18} /> Industry Recommendations</h4>
                    <p className="text-sm text-white/60 mb-4">"The OTT Web Series market is experiencing a +25% YoY growth. Your profile matches 84% of current casting requirements in this sector."</p>
                    <div className="flex gap-2">
                      <span className="bg-blue-500/10 px-2 py-1 rounded text-[10px] text-blue-400 border border-blue-500/20">OTT Platforms</span>
                      <span className="bg-blue-500/10 px-2 py-1 rounded text-[10px] text-blue-400 border border-blue-500/20">Indie Cinema</span>
                    </div>
                  </div>
                  <div className="bg-black/30 border border-white/10 rounded-2xl p-6 text-left">
                    <h4 className="font-bold mb-4 flex items-center gap-2 text-emerald-400"><GraduationCap size={18} /> Training Suggestions</h4>
                    <p className="text-sm text-white/60 mb-4">"Enroll in the 'Advanced Combat for Screen' workshop at your nearest SosrG Academy (Mumbai DCP) to improve your action stunt rating."</p>
                    <button className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest border border-emerald-400/30 px-4 py-2 rounded-lg hover:bg-emerald-400 hover:text-black transition-all">View Workshops</button>
                  </div>
                  <div className="bg-black/30 border border-white/10 rounded-2xl p-6 text-left">
                    <h4 className="font-bold mb-4 flex items-center gap-2 text-purple-400"><Video size={18} /> Portfolio Improvement</h4>
                    <p className="text-sm text-white/60 mb-4">"Your showreel lacks emotional range scenes. Adding a 60-second dramatic monologue will increase your AI match rate by 18%."</p>
                    <button className="text-[10px] font-bold text-purple-400 uppercase tracking-widest border border-purple-400/30 px-4 py-2 rounded-lg hover:bg-purple-400 hover:text-white transition-all">Upload New Reel</button>
                  </div>
                </div>
                <button className="w-full bg-gold text-black py-4 rounded-xl font-bold uppercase tracking-widest hover:scale-[1.02] transition-transform">
                  Generate Full Career Report
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {activeView === 'grading' && (
          <motion.div
            key="grading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="glass-panel p-8">
              <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                <Star className="text-gold" /> AI Grading & Rating System
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h4 className="font-bold text-sm uppercase tracking-widest text-white/60">Artist Performance Grading</h4>
                  <div className="space-y-4">
                    {[
                      { grade: 'A+', label: 'Elite Professional', count: '120', color: 'text-gold' },
                      { grade: 'A', label: 'Top Tier', count: '450', color: 'text-blue-400' },
                      { grade: 'B+', label: 'Rising Star', count: '1,200', color: 'text-emerald-400' },
                      { grade: 'B', label: 'Standard', count: '3,500', color: 'text-white/40' },
                    ].map((g, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                        <div className="flex items-center gap-4">
                          <div className={cn("text-2xl font-bold w-12", g.color)}>{g.grade}</div>
                          <div>
                            <div className="font-bold text-sm">{g.label}</div>
                            <div className="text-[10px] text-white/40 uppercase tracking-widest">AI Verified</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{g.count}</div>
                          <div className="text-[8px] uppercase tracking-widest text-white/20">Artists</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-6">
                  <h4 className="font-bold text-sm uppercase tracking-widest text-white/60">Ecosystem Ratings</h4>
                  <div className="p-6 bg-black/30 rounded-2xl border border-white/10 space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-white/80">Event Rating</span>
                        <span className="text-sm font-bold text-emerald-400">4.8/5.0</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: '96%' }} />
                      </div>
                      <p className="text-[10px] text-white/40 mt-1">Based on attendee feedback & AI analysis.</p>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-white/80">CP Performance Rating</span>
                        <span className="text-sm font-bold text-blue-400">92%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: '92%' }} />
                      </div>
                      <p className="text-[10px] text-white/40 mt-1">Based on active nodes & dispute resolution.</p>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-white/80">Academy Quality Rating</span>
                        <span className="text-sm font-bold text-gold">A+</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-gold" style={{ width: '98%' }} />
                      </div>
                      <p className="text-[10px] text-white/40 mt-1">Based on student placement & infrastructure.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeView === 'event-builder' && (
          <motion.div
            key="event-builder"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="glass-panel p-8">
              <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                <Calendar className="text-gold" /> AI Event Builder
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-gold/30 transition-all cursor-pointer group">
                  <FileText className="text-gold mb-4 group-hover:scale-110 transition-transform" size={32} />
                  <h4 className="font-bold text-sm mb-2">Template Generator</h4>
                  <p className="text-xs text-white/40">AI-generated schedules and requirements for any event type.</p>
                </div>
                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-blue-400/30 transition-all cursor-pointer group">
                  <Calculator className="text-blue-400 mb-4 group-hover:scale-110 transition-transform" size={32} />
                  <h4 className="font-bold text-sm mb-2">Budget Calculator</h4>
                  <p className="text-xs text-white/40">Predictive cost analysis based on location and scale.</p>
                </div>
                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-emerald-400/30 transition-all cursor-pointer group">
                  <Ticket className="text-emerald-400 mb-4 group-hover:scale-110 transition-transform" size={32} />
                  <h4 className="font-bold text-sm mb-2">Ticketing Integration</h4>
                  <p className="text-xs text-white/40">Automated pricing tiers and revenue tracking.</p>
                </div>
                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-purple-400/30 transition-all cursor-pointer group">
                  <Users className="text-purple-400 mb-4 group-hover:scale-110 transition-transform" size={32} />
                  <h4 className="font-bold text-sm mb-2">Volunteer Assignment</h4>
                  <p className="text-xs text-white/40">Smart matching of local PCPs to event roles.</p>
                </div>
              </div>
              <div className="p-8 bg-black/30 border border-white/10 rounded-3xl text-center">
                <h4 className="text-2xl font-bold mb-4">Start Building Your Next Event</h4>
                <p className="text-white/40 mb-8 max-w-xl mx-auto">Describe your event idea, and our AI will generate a complete blueprint including budget, schedule, and required personnel.</p>
                <div className="flex flex-col sm:flex-row max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-3xl sm:rounded-full p-2 focus-within:border-gold/50 transition-colors gap-2 sm:gap-0">
                  <input type="text" placeholder="e.g., A 3-day theatre festival in Mumbai..." className="flex-1 bg-transparent border-none outline-none px-4 sm:px-6 py-3 sm:py-0 text-sm" />
                  <button className="bg-gold text-black px-8 py-3 rounded-full font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform w-full sm:w-auto">Generate</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const EventManagement = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const EVENTS = [
    { id: 1, title: 'Mumbai Film Festival', date: '2026-03-15', type: 'Festival', location: 'Juhu, Mumbai', price: '₹2,500' },
    { id: 2, title: 'Method Acting Workshop', date: '2026-03-20', type: 'Workshop', location: 'SosrG StudioS, Delhi', price: '₹1,200' },
    { id: 3, title: 'Classical Dance Showcase', date: '2026-03-25', type: 'Performance', location: 'Chennai Auditorium', price: '₹800' },
  ];

  return (
    <div className="pt-32 px-6 max-w-7xl mx-auto min-h-screen pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif italic mb-2">Event <span className="vibrant-text-2">Calendar</span></h1>
          <p className="text-white/50">Book workshops, festivals, and performances across India.</p>
        </div>
        <button className="bg-gold text-black px-8 py-3 rounded-xl font-bold uppercase tracking-widest hover:scale-105 transition-transform w-full md:w-auto">
          Host an Event
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-panel p-8">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold">March 2026</h3>
              <div className="flex gap-2">
                <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"><ChevronRight className="rotate-180" size={20} /></button>
                <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"><ChevronRight size={20} /></button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-[8px] sm:text-[10px] uppercase tracking-widest text-white/40 font-bold py-2">{day}</div>
              ))}
              {[...Array(31)].map((_, i) => {
                const day = i + 1;
                const hasEvent = EVENTS.some(e => e.date === `2026-03-${day.toString().padStart(2, '0')}`);
                return (
                  <div 
                    key={i} 
                    className={cn(
                      "aspect-square flex flex-col items-center justify-center rounded-xl border transition-all cursor-pointer relative group",
                      day === 15 ? "bg-gold text-black border-gold" : "bg-white/5 border-white/5 hover:border-gold/30"
                    )}
                  >
                    <span className="text-xs sm:text-sm font-bold">{day}</span>
                    {hasEvent && (
                      <div className={cn("w-1 h-1 rounded-full mt-1", day === 15 ? "bg-black" : "bg-gold")} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">Upcoming Events</h3>
            {EVENTS.map((event) => (
              <div key={event.id} className="glass-panel p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:border-gold/30 transition-all group">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex flex-col items-center justify-center border border-white/10 group-hover:border-gold/30 transition-colors">
                    <span className="text-gold font-bold text-xl">{event.date.split('-')[2]}</span>
                    <span className="text-[10px] uppercase tracking-widest text-white/40">Mar</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-gold font-bold mb-1 block">{event.type}</span>
                    <h4 className="text-xl font-bold mb-1">{event.title}</h4>
                    <p className="text-xs text-white/40 flex items-center gap-1"><MapPin size={12} /> {event.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 w-full md:w-auto">
                  <div className="text-right flex-1 md:flex-none">
                    <div className="font-bold text-lg">{event.price}</div>
                    <p className="text-[10px] uppercase tracking-widest text-white/40">Starting from</p>
                  </div>
                  <button className="bg-white/10 hover:bg-gold hover:text-black px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="glass-panel p-8 bg-gradient-to-br from-blue-500/10 to-transparent">
            <h3 className="font-bold mb-6 flex items-center gap-2"><Star size={18} className="text-blue-400" /> Featured Event</h3>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6">
              <img src="https://picsum.photos/seed/filmfest/600/450" className="w-full h-full object-cover" alt="Featured" />
            </div>
            <h4 className="text-xl font-bold mb-2">National Art Exhibition 2026</h4>
            <p className="text-xs text-white/40 mb-6">Experience the finest contemporary Indian art. Over 500 artists participating from across the country.</p>
            <button className="w-full bg-blue-500 text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:scale-[1.02] transition-transform">
              Get Tickets
            </button>
          </div>

          <div className="glass-panel p-8">
            <h3 className="font-bold mb-6 flex items-center gap-2"><TrendingUp size={18} className="text-gold" /> Event Insights</h3>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/60">Total Bookings</span>
                <span className="font-bold">12,450</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/60">Active Venues</span>
                <span className="font-bold">85</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/60">Revenue Growth</span>
                <span className="font-bold text-emerald-400">+15%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'verification' | 'fraud' | 'revenue' | 'moderation' | 'legal' | 'users' | 'casting' | 'analytics' | 'settings'>('analytics');

  const tabs = [
    { id: 'analytics', label: 'Analytics & Reports', icon: BarChart3 },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'casting', label: 'Casting Moderation', icon: Video },
    { id: 'verification', label: 'User Verification', icon: ShieldCheck },
    { id: 'fraud', label: 'Fraud Monitoring', icon: AlertCircle },
    { id: 'revenue', label: 'Revenue & Commission', icon: Wallet },
    { id: 'moderation', label: 'Content Moderation', icon: FileCheck },
    { id: 'legal', label: 'Legal Escalation', icon: Gavel },
    { id: 'settings', label: 'Platform Settings', icon: Settings },
  ];

  return (
    <div className="pt-32 px-6 max-w-7xl mx-auto min-h-screen pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <Lock className="text-crimson" /> Admin Control Panel
          </h2>
          <p className="text-white/40 text-sm mt-2">Internal moderation and security management hub.</p>
        </div>
        <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-widest text-white/40">System Status</div>
            <div className="text-emerald-400 font-bold text-sm flex items-center gap-1 justify-end">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" /> All Systems Operational
            </div>
          </div>
        </div>
      </div>

      <div className="flex overflow-x-auto no-scrollbar gap-4 mb-8 border-b border-white/5 pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all",
              activeTab === tab.id ? "bg-crimson/10 text-crimson border border-crimson/30" : "text-white/40 hover:text-white"
            )}
          >
            <tab.icon size={16} /> {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'analytics' && (
          <motion.div
            key="analytics"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Total Users', value: '124.5k', change: '+12%', color: 'text-emerald-400' },
                { label: 'Active Casting Calls', value: '3,420', change: '+5%', color: 'text-gold' },
                { label: 'Monthly Revenue', value: '₹4.2Cr', change: '+18%', color: 'text-emerald-400' },
                { label: 'Pending Verifications', value: '142', change: '-2%', color: 'text-crimson' },
              ].map((stat, i) => (
                <div key={i} className="glass-panel p-6">
                  <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">{stat.label}</div>
                  <div className="flex items-end justify-between">
                    <div className="text-3xl font-bold">{stat.value}</div>
                    <div className={cn("text-xs font-bold", stat.color)}>{stat.change}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="glass-panel p-6">
                <h3 className="font-bold mb-6">User Growth by Sector</h3>
                <div className="space-y-4">
                  {[
                    { sector: 'Cinema', percentage: 45 },
                    { sector: 'Theatre', percentage: 25 },
                    { sector: 'Music', percentage: 15 },
                    { sector: 'Literature', percentage: 10 },
                    { sector: 'Others', percentage: 5 },
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs mb-1">
                        <span>{item.sector}</span>
                        <span className="text-gold">{item.percentage}%</span>
                      </div>
                      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-gold rounded-full" style={{ width: `${item.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass-panel p-6">
                <h3 className="font-bold mb-6">Recent Platform Activity</h3>
                <div className="space-y-4">
                  {[
                    { action: 'New Casting Call Posted', user: 'Dharma Productions', time: '10 mins ago' },
                    { action: 'User Verified (Green ID)', user: 'SiDdhaRtha SosrG', time: '25 mins ago' },
                    { action: 'High-Value Transaction', user: '₹5,00,000 Escrow', time: '1 hour ago' },
                    { action: 'Fraud Alert Triggered', user: 'Suspicious IP Login', time: '2 hours ago' },
                  ].map((activity, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                      <div>
                        <div className="font-bold text-sm">{activity.action}</div>
                        <div className="text-xs text-white/50">{activity.user}</div>
                      </div>
                      <div className="text-[10px] text-white/40">{activity.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'users' && (
          <motion.div
            key="users"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center mb-6">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
                <input 
                  type="text" 
                  placeholder="Search users by name, email, or ID..." 
                  className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-gold"
                />
              </div>
              <button className="bg-white/10 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-white/20">
                <Filter size={16} /> Filter
              </button>
            </div>

            <div className="glass-panel overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-xs uppercase tracking-widest text-white/40">
                    <th className="p-4">User</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Joined</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'SiDdhaRtha SosrG', email: 'arjun@example.com', role: 'Artist', status: 'Active', joined: 'Oct 2025', verified: true },
                    { name: 'Priya Singh', email: 'priya@example.com', role: 'Casting Director', status: 'Suspended', joined: 'Nov 2025', verified: false },
                    { name: 'Rohan Desai', email: 'rohan@example.com', role: 'Producer', status: 'Active', joined: 'Jan 2026', verified: true },
                  ].map((user, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-white/10 overflow-hidden">
                            <img src={`https://picsum.photos/seed/user${i}/100/100`} alt={user.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </div>
                          <div>
                            <div className="font-bold text-sm flex items-center gap-1">
                              {user.name} {user.verified && <ShieldCheck size={12} className="text-emerald-400" />}
                            </div>
                            <div className="text-xs text-white/50">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm">{user.role}</td>
                      <td className="p-4">
                        <span className={cn("px-2 py-1 rounded text-[10px] uppercase tracking-widest", user.status === 'Active' ? "bg-emerald-500/20 text-emerald-400" : "bg-crimson/20 text-crimson")}>
                          {user.status}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-white/60">{user.joined}</td>
                      <td className="p-4 text-right">
                        <button className="text-white/40 hover:text-white"><MoreHorizontal size={18} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === 'casting' && (
          <motion.div
            key="casting"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="glass-panel p-6 border-gold/20">
                <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Pending Review</div>
                <div className="text-3xl font-bold text-gold">24</div>
              </div>
              <div className="glass-panel p-6 border-emerald-500/20">
                <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Approved Today</div>
                <div className="text-3xl font-bold text-emerald-400">156</div>
              </div>
              <div className="glass-panel p-6 border-crimson/20">
                <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Flagged Content</div>
                <div className="text-3xl font-bold text-crimson">8</div>
              </div>
            </div>

            <div className="glass-panel p-6">
              <h3 className="font-bold mb-6">Moderation Queue</h3>
              <div className="space-y-4">
                {[
                  { title: 'Lead Actor for Indie Film', company: 'Neon Dreams Productions', flags: ['Unusually high budget', 'Missing contact details'] },
                  { title: 'Background Dancers Needed', company: 'Rhythm Studios', flags: ['Reported by 3 users'] },
                ].map((call, i) => (
                  <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-bold text-lg">{call.title}</h4>
                        <p className="text-sm text-white/60">{call.company}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-4 py-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg text-xs font-bold hover:bg-emerald-500 hover:text-white transition-colors">Approve</button>
                        <button className="px-4 py-1.5 bg-crimson/20 text-crimson rounded-lg text-xs font-bold hover:bg-crimson hover:text-white transition-colors">Reject</button>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {call.flags.map((flag, j) => (
                        <span key={j} className="bg-crimson/10 text-crimson px-2 py-1 rounded text-[10px] uppercase tracking-widest flex items-center gap-1">
                          <AlertCircle size={10} /> {flag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'settings' && (
          <motion.div
            key="settings"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="glass-panel p-6">
              <h3 className="text-lg font-bold border-b border-white/10 pb-4 mb-6">Platform Configuration</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-sm">Maintenance Mode</h4>
                    <p className="text-xs text-white/50">Temporarily disable access to the platform for updates.</p>
                  </div>
                  <div className="w-12 h-6 bg-white/10 rounded-full relative cursor-pointer">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white/50 rounded-full"></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-sm">New User Registration</h4>
                    <p className="text-xs text-white/50">Allow new users to sign up for the platform.</p>
                  </div>
                  <div className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-sm">Automated Green ID Verification</h4>
                    <p className="text-xs text-white/50">Use AI to automatically verify user documents.</p>
                  </div>
                  <div className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-panel p-6">
              <h3 className="text-lg font-bold border-b border-white/10 pb-4 mb-6">Commission Rates</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs text-white/60 mb-2">Standard Escrow Fee</label>
                  <input type="text" value="5%" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gold" readOnly />
                </div>
                <div>
                  <label className="block text-xs text-white/60 mb-2">Premium Member Escrow Fee</label>
                  <input type="text" value="2.5%" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gold" readOnly />
                </div>
                <div>
                  <label className="block text-xs text-white/60 mb-2">Auction Transaction Fee</label>
                  <input type="text" value="10%" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gold" readOnly />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button className="bg-gold text-black px-6 py-2 rounded-lg text-sm font-bold uppercase tracking-widest hover:bg-white transition-colors">Save Changes</button>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'verification' && (
          <motion.div
            key="verification"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="glass-panel p-6 border-emerald-500/20">
                <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Pending Approvals</div>
                <div className="text-3xl font-bold text-emerald-400">142</div>
              </div>
              <div className="glass-panel p-6 border-gold/20">
                <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">AI Confidence &gt; 90%</div>
                <div className="text-3xl font-bold text-gold">89</div>
              </div>
              <div className="glass-panel p-6 border-crimson/20">
                <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Manual Review Required</div>
                <div className="text-3xl font-bold text-crimson">53</div>
              </div>
            </div>

            <div className="glass-panel p-6">
              <h3 className="font-bold mb-6">Approval Queue</h3>
              <div className="space-y-4">
                {[
                  { name: 'Rahul Sharma', type: 'Actor', doc: 'Aadhar Card', aiScore: 98, status: 'High Confidence' },
                  { name: 'Priya Patel', type: 'Director', doc: 'Passport', aiScore: 95, status: 'High Confidence' },
                  { name: 'Amit Singh', type: 'Producer', doc: 'Company PAN', aiScore: 45, status: 'Needs Review' },
                ].map((user, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                        <User size={18} className="text-white/40" />
                      </div>
                      <div>
                        <div className="font-bold text-sm">{user.name}</div>
                        <div className="text-[10px] text-white/40 uppercase tracking-widest">{user.type} • {user.doc}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right hidden sm:block">
                        <div className={cn("text-sm font-bold", user.aiScore > 90 ? "text-emerald-400" : "text-crimson")}>{user.aiScore}%</div>
                        <div className="text-[10px] text-white/40 uppercase tracking-widest">AI Match</div>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500 hover:text-white transition-colors">
                          <Check size={16} />
                        </button>
                        <button className="p-2 bg-crimson/20 text-crimson rounded-lg hover:bg-crimson hover:text-white transition-colors">
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'fraud' && (
          <motion.div
            key="fraud"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="glass-panel p-8 bg-gradient-to-br from-crimson/10 to-transparent border-crimson/20">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-crimson">
                <AlertCircle /> Active Alerts
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-black/40 rounded-xl border border-crimson/30 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-sm mb-1">Suspicious Casting Call Detected</div>
                    <div className="text-xs text-white/60">"Global Netflix Audition" - Flagged for requesting upfront fees.</div>
                  </div>
                  <button className="bg-crimson text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest">Take Down</button>
                </div>
                <div className="p-4 bg-black/40 rounded-xl border border-gold/30 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-sm mb-1">Multiple Account Creation Spike</div>
                    <div className="text-xs text-white/60">IP Address 192.168.1.x created 15 accounts in 10 minutes.</div>
                  </div>
                  <button className="bg-gold text-black px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest">Investigate</button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-panel p-6">
                <h3 className="font-bold mb-4 text-sm">AI Fraud Detection Metrics</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Fake Profiles Blocked', value: '1,245', trend: '+12%' },
                    { label: 'Scam Projects Removed', value: '84', trend: '-5%' },
                    { label: 'Plagiarized Scripts Flagged', value: '32', trend: '+2%' },
                  ].map((metric, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                      <span className="text-xs text-white/60">{metric.label}</span>
                      <div className="text-right">
                        <div className="font-bold">{metric.value}</div>
                        <div className={cn("text-[10px]", metric.trend.startsWith('+') ? "text-crimson" : "text-emerald-400")}>{metric.trend}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass-panel p-6 flex items-center justify-center">
                <div className="text-center">
                  <ShieldCheck size={48} className="text-emerald-500 mx-auto mb-4 opacity-50" />
                  <p className="text-sm text-white/40">Real-time monitoring active across 50,000+ profiles and 1,200+ active projects.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'revenue' && (
          <motion.div
            key="revenue"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Total Platform Volume', value: '₹4.2Cr', change: '+15%', icon: Wallet },
                { label: 'Escrow Holdings', value: '₹1.8Cr', change: '+5%', icon: Lock },
                { label: 'Commission Earned', value: '₹21L', change: '+12%', icon: TrendingUp },
                { label: 'Premium Subs', value: '₹8.5L', change: '+22%', icon: Star },
              ].map((stat, i) => (
                <div key={i} className="glass-panel p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-white/5 rounded-lg">
                      <stat.icon className="text-gold" size={18} />
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400">{stat.change}</span>
                  </div>
                  <div className="text-xl font-bold mb-1">{stat.value}</div>
                  <div className="text-[10px] text-white/40 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="glass-panel p-6">
              <h3 className="font-bold mb-6">Recent Escrow Releases</h3>
              <div className="space-y-3">
                {[
                  { project: 'The Silent Valley', amount: '₹5,00,000', fee: '₹25,000', status: 'Completed' },
                  { project: 'Urban Beats Ad', amount: '₹1,50,000', fee: '₹7,500', status: 'Processing' },
                  { project: 'Stage Play: Hamlet', amount: '₹80,000', fee: '₹4,000', status: 'Completed' },
                ].map((tx, i) => (
                  <div key={i} className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5">
                    <div>
                      <div className="font-bold text-sm">{tx.project}</div>
                      <div className="text-[10px] text-white/40 uppercase tracking-widest">Escrow Payout</div>
                    </div>
                    <div className="text-right flex gap-8">
                      <div>
                        <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Volume</div>
                        <div className="font-bold text-sm">{tx.amount}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Our Fee (5%)</div>
                        <div className="font-bold text-sm text-gold">{tx.fee}</div>
                      </div>
                      <div className="w-20 text-right">
                        <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Status</div>
                        <div className={cn("text-xs font-bold", tx.status === 'Completed' ? "text-emerald-400" : "text-blue-400")}>{tx.status}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'moderation' && (
          <motion.div
            key="moderation"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <div className="glass-panel p-6">
              <h3 className="font-bold mb-6 flex items-center gap-2"><FileCheck className="text-blue-400" /> Content Flagged by AI</h3>
              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-crimson bg-crimson/10 px-2 py-1 rounded">Inappropriate Image</span>
                    <span className="text-[10px] text-white/40">2 mins ago</span>
                  </div>
                  <p className="text-sm text-white/80 mb-4">Profile picture uploaded by User #8842 violates community guidelines (NSFW content detected).</p>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-crimson text-white py-2 rounded-lg text-xs font-bold uppercase tracking-widest">Remove & Warn</button>
                    <button className="flex-1 bg-white/10 text-white py-2 rounded-lg text-xs font-bold uppercase tracking-widest">Ignore</button>
                  </div>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-gold bg-gold/10 px-2 py-1 rounded">Spam Text</span>
                    <span className="text-[10px] text-white/40">15 mins ago</span>
                  </div>
                  <p className="text-sm text-white/80 mb-4">Project description contains excessive links and promotional material unrelated to casting.</p>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-crimson text-white py-2 rounded-lg text-xs font-bold uppercase tracking-widest">Remove & Warn</button>
                    <button className="flex-1 bg-white/10 text-white py-2 rounded-lg text-xs font-bold uppercase tracking-widest">Ignore</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="glass-panel p-6">
              <h3 className="font-bold mb-6 flex items-center gap-2"><MessageSquare className="text-purple-400" /> User Reports</h3>
              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold">Reported by: SiDdhaRtha SosrG</span>
                    <span className="text-[10px] text-white/40">1 hr ago</span>
                  </div>
                  <p className="text-sm text-white/80 mb-4">"This recruiter asked for a 'registration fee' outside of the platform escrow."</p>
                  <button className="w-full bg-blue-500 text-white py-2 rounded-lg text-xs font-bold uppercase tracking-widest">Review Chat Logs</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'legal' && (
          <motion.div
            key="legal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="glass-panel p-8 bg-gradient-to-br from-blue-500/10 to-transparent border-blue-500/20">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2 text-blue-400">
                  <Gavel /> Legal Escalations
                </h3>
                <span className="bg-crimson text-white px-3 py-1 rounded-full text-xs font-bold">2 Urgent</span>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-black/40 rounded-xl border border-crimson/30">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-bold text-sm mb-1">Copyright Dispute: Script "Monsoon Echoes"</div>
                      <div className="text-xs text-white/60">Two users claiming ownership. Both have uploaded similar drafts.</div>
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-crimson font-bold">High Priority</span>
                  </div>
                  <div className="mt-4 flex gap-4 text-xs">
                    <button className="text-blue-400 hover:underline">View Blockchain Timestamps</button>
                    <button className="text-blue-400 hover:underline">Assign Legal Counsel</button>
                  </div>
                </div>
                <div className="p-4 bg-black/40 rounded-xl border border-gold/30">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-bold text-sm mb-1">Contract Breach: Non-Payment</div>
                      <div className="text-xs text-white/60">Production house failed to release milestone 2 payment after delivery.</div>
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-gold font-bold">Medium Priority</span>
                  </div>
                  <div className="mt-4 flex gap-4 text-xs">
                    <button className="text-blue-400 hover:underline">Review Escrow Terms</button>
                    <button className="text-blue-400 hover:underline">Initiate Arbitration</button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CommunityHub = () => {
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
const BACKGROUNDS: Record<Section, string> = {
  'home': 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop',
  'talent': 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2000&auto=format&fit=crop',
  'ai-tools': 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=2000&auto=format&fit=crop',
  'casting': 'https://images.unsplash.com/photo-1540039155732-684735035727?q=80&w=2000&auto=format&fit=crop',
  'auction': 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2000&auto=format&fit=crop',
  'marketplace': 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2000&auto=format&fit=crop',
  'ecosystem': 'https://images.unsplash.com/photo-1565118531796-763e5082d113?q=80&w=2000&auto=format&fit=crop',
  'events': 'https://images.unsplash.com/photo-1540039155732-684735035727?q=80&w=2000&auto=format&fit=crop',
  'academy': 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=2000&auto=format&fit=crop',
  'profile': 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=2000&auto=format&fit=crop',
  'creator-profile': 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=2000&auto=format&fit=crop',
  'business-profile': 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=2000&auto=format&fit=crop',
  'admin': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop',
  'sosrg-7e': 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop',
  'community': 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2000&auto=format&fit=crop',
};

const DynamicBackground = ({ activeSection }: { activeSection: Section }) => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${BACKGROUNDS[activeSection]})` }}
          />
          {/* Overlays to ensure text readability and cinematic feel */}
          <div className="absolute inset-0 bg-gradient-to-b from-cinematic-black/60 via-cinematic-black/75 to-cinematic-black/95 dark:from-cinematic-black/70 dark:via-cinematic-black/85 dark:to-cinematic-black/98" />
          
          {/* Colorful Blobs with animations */}
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              x: [0, 80, 0],
              y: [0, -50, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_15%_50%,rgba(236,72,153,0.5),transparent_50%)] mix-blend-screen dark:mix-blend-color-dodge" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.4, 1],
              x: [0, -60, 0],
              y: [0, 60, 0]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_85%_30%,rgba(168,85,247,0.5),transparent_50%)] mix-blend-screen dark:mix-blend-color-dodge" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.5, 1],
              x: [0, 50, 0],
              y: [0, 70, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(59,130,246,0.5),transparent_55%)] mix-blend-screen dark:mix-blend-color-dodge" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              x: [0, -70, 0],
              y: [0, -40, 0]
            }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_70%_10%,rgba(234,179,8,0.4),transparent_45%)] mix-blend-screen dark:mix-blend-color-dodge" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.4, 1],
              x: [0, 40, 0],
              y: [0, -60, 0]
            }}
            transition={{ duration: 17, repeat: Infinity, ease: "easeInOut", delay: 4 }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(16,185,129,0.4),transparent_50%)] mix-blend-screen dark:mix-blend-color-dodge" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.5, 1],
              x: [0, 40, 0],
              y: [0, -20, 0]
            }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 4 }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(16,185,129,0.3),transparent_45%)] mix-blend-screen dark:mix-blend-normal" 
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const FloatingActions = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4 items-end">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <button 
              onClick={scrollToTop}
              className="p-3 bg-cinematic-gray/80 backdrop-blur-md border border-white/10 rounded-full text-white/80 hover:text-gold hover:border-gold/50 transition-all shadow-lg"
              title="Back to Top"
            >
              <ArrowUp size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="absolute bottom-16 right-0 w-80 bg-cinematic-black border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-4 bg-gradient-to-r from-gold/20 to-transparent border-b border-white/10 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <h3 className="font-bold text-gold">SosrG Assistant</h3>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="text-white/60 hover:text-white">
                  <X size={16} />
                </button>
              </div>
              <div className="p-4 h-64 overflow-y-auto flex flex-col gap-3 text-sm custom-scrollbar">
                <div className="bg-white/5 border border-white/10 p-3 rounded-xl rounded-tl-none self-start max-w-[85%] text-white/80 leading-relaxed">
                  Hello! Welcome to SosrG. How can I assist you today? Whether you're looking for talent, casting, or marketplace items, I'm here to help.
                </div>
              </div>
              <div className="p-3 border-t border-white/10 flex gap-2 bg-black/20">
                <input 
                  type="text" 
                  placeholder="Type your message..." 
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gold/50 transition-colors"
                />
                <button className="p-2 bg-gold text-black rounded-lg hover:bg-white transition-colors flex items-center justify-center">
                  <Play size={16} className="ml-1" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="p-4 bg-gold text-black rounded-full hover:bg-white transition-all shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)] flex items-center justify-center"
          title="Help & Support"
        >
          {isChatOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </button>
      </div>
    </div>
  );
};

const WelcomeToast = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-emerald-500/90 backdrop-blur-md text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 font-bold text-sm"
        >
          <CheckCircle2 size={18} />
          Welcome to SosrG - The Ultimate Platform for Creative Professionals!
          <button onClick={() => setIsVisible(false)} className="ml-2 hover:text-black transition-colors">
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Main App ---

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, [theme]);

  return (
    <div className="min-h-screen selection:bg-gold selection:text-black">
      <WelcomeToast />
      <DynamicBackground activeSection={activeSection} />
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} theme={theme} setTheme={setTheme} language={language} setLanguage={setLanguage} />
      <FloatingActions />
      
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            exit={{ opacity: 0, filter: 'blur(10px)', y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {activeSection === 'home' && (
              <div className="space-y-32 pb-32">
                <Hero setActiveSection={setActiveSection} language={language} />
                <DigitalEcosystemVision />
                <TalentGrid setActiveSection={setActiveSection} />
                <AISuite />
                <CollaborationNetwork />
                <PremiumFeatures />
                <TrustSystem />
                <MobileAppStructure />
                <MonetizationModel />
              </div>
            )}

        {activeSection === 'talent' && (
          <SmartSearchAndDiscovery />
        )}

        {activeSection === 'ai-tools' && (
          <AISuite />
        )}

        {activeSection === 'casting' && (
          <CastingEcosystem />
        )}

        {activeSection === 'auction' && (
          <TalentAuction />
        )}

        {activeSection === 'marketplace' && (
          <Marketplace />
        )}

        {activeSection === 'ecosystem' && (
          <EcosystemHub />
        )}

        {activeSection === 'events' && (
          <EventManagement />
        )}

        {activeSection === 'community' && (
          <CommunityHub />
        )}

        {activeSection === 'academy' && (
          <SosrGAcademy />
        )}

        {activeSection === 'profile' && (
          <ProfileSystem />
        )}

        {activeSection === 'creator-profile' && (
          <ProfileSystem initialType="artist" />
        )}

        {activeSection === 'business-profile' && (
          <ProfileSystem initialType="business" />
        )}

        {activeSection === 'admin' && (
          <div className="pt-32 pb-32 px-6 max-w-7xl mx-auto min-h-screen space-y-12">
            <h1 className="text-5xl font-serif italic mb-12"><span className="gold-text">Admin</span> Dashboard</h1>
            <AdminDashboard />
          </div>
        )}

        {activeSection === 'sosrg-7e' && (
          <div className="pt-32 pb-32 px-6 max-w-7xl mx-auto min-h-screen space-y-24">
            {/* Education */}
            <div>
              <h1 className="text-5xl font-serif italic mb-12"><span className="gold-text">Education</span> (Learning)</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass-panel p-8">
                  <h3 className="text-2xl font-bold mb-4">Training Programs</h3>
                  <p className="text-white/70">Structured skill-based courses in Dance, Music, Acting, Writing and other art forms for beginner to advanced levels.</p>
                </div>
                <div className="glass-panel p-8">
                  <h3 className="text-2xl font-bold mb-4">Workshops & Webinars</h3>
                  <p className="text-white/70">Live and recorded sessions conducted by experts for real-time interactive learning.</p>
                </div>
                <div className="glass-panel p-8">
                  <h3 className="text-2xl font-bold mb-4">Certification & Mentorship</h3>
                  <p className="text-white/70">AI-verified certificates and guided mentorship programs through Expert Personalities.</p>
                </div>
                <div className="glass-panel p-8">
                  <h3 className="text-2xl font-bold mb-4">SosrG Academy Franchise</h3>
                  <p className="text-white/70">State-Capital & District Franchise partnerships to expand offline learning reach.</p>
                </div>
              </div>
            </div>

            {/* Entertainment */}
            <div>
              <h1 className="text-5xl font-serif italic mb-12"><span className="gold-text">Entertainment</span> (Performance)</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="glass-panel p-8">
                  <h3 className="text-2xl font-bold mb-4">Theatre & Short Films</h3>
                  <p className="text-white/70">A platform to host and promote independent theatre and short cinematic productions.</p>
                </div>
                <div className="glass-panel p-8">
                  <h3 className="text-2xl font-bold mb-4">Web Series & Musical Nights</h3>
                  <p className="text-white/70">Original digital entertainment content through SosrG Stream.</p>
                </div>
                <div className="glass-panel p-8">
                  <h3 className="text-2xl font-bold mb-4">Digital Stage</h3>
                  <p className="text-white/70">Online performance space integrated with OTT & YouTube distribution.</p>
                </div>
              </div>
            </div>

            {/* Events */}
            <div>
              <h1 className="text-5xl font-serif italic mb-12"><span className="gold-text">Events</span> (Organise & Participate)</h1>
              <p className="text-white/70 mb-8">Comprehensive event management and participation platform.</p>
            </div>

            {/* E-Commerce */}
            <div>
              <h1 className="text-5xl font-serif italic mb-12"><span className="gold-text">E-Commerce</span> (Services)</h1>
              <p className="text-white/70 mb-8">Art Mart and Talent Auction services.</p>
            </div>

            {/* E-Branding */}
            <div>
              <h1 className="text-5xl font-serif italic mb-12"><span className="gold-text">E-Branding</span> (Digital Identity)</h1>
              <p className="text-white/70 mb-8">Digital portfolio and profile system.</p>
            </div>

            {/* Explore */}
            <div>
              <h1 className="text-5xl font-serif italic mb-12"><span className="gold-text">Explore</span> (Travel)</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="glass-panel p-8">
                  <h3 className="text-2xl font-bold mb-4">Artist Exchange Tours</h3>
                  <p className="text-white/70">Interstate and international creative (Performing & Visual Arts) exchange programs.</p>
                </div>
                <div className="glass-panel p-8">
                  <h3 className="text-2xl font-bold mb-4">Heritage Trips</h3>
                  <p className="text-white/70">Art & culture-focused tours across India.</p>
                </div>
                <div className="glass-panel p-8">
                  <h3 className="text-2xl font-bold mb-4">Travel Partnerships</h3>
                  <p className="text-white/70">Collaborations with travel agencies for artist mobility.</p>
                </div>
              </div>
            </div>

            {/* E-Care */}
            <div>
              <h1 className="text-5xl font-serif italic mb-12"><span className="gold-text">E-Care</span> (Foundation)</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass-panel p-8">
                  <h3 className="text-2xl font-bold mb-4">Artist Welfare Programs</h3>
                  <p className="text-white/70">Raise Emergency funds and financial assistance for artists/art community with donation facility.</p>
                </div>
                <div className="glass-panel p-8">
                  <h3 className="text-2xl font-bold mb-4">Artist Mental Health Sessions</h3>
                  <p className="text-white/70">Support sessions for emotional and psychological well-being.</p>
                </div>
                <div className="glass-panel p-8">
                  <h3 className="text-2xl font-bold mb-4">Career Counseling</h3>
                  <p className="text-white/70">Art & entertainment Career Counseling with Experts enrolled on website.</p>
                </div>
                <div className="glass-panel p-8">
                  <h3 className="text-2xl font-bold mb-4">Cultural Trust Initiatives</h3>
                  <p className="text-white/70">Support for women, senior, child artists and special categories.</p>
                </div>
              </div>
            </div>
          </div>
        )}
          </motion.div>
        </AnimatePresence>
      </main>

      <SmartAssistant setActiveSection={setActiveSection} />
      <Footer />
    </div>
  );
}
