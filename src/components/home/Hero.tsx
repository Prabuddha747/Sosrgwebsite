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
import type { Section } from '../../types';

export const Hero = ({ setActiveSection, language }: { setActiveSection: (s: Section) => void, language: string }) => {
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
