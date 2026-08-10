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
import { ScaffoldRow } from '../ScaffoldUI';

export const Hero = ({ setActiveSection, language }: { setActiveSection: (s: Section) => void, language: string }) => {
  const t = {
    en: {
      title1: "One Unified Ecosystem for",
      titleHighlight: "Tech, Business & Professional Services.",
      subtitle: "The premium AI-driven national-level creative infrastructure empowering artists, writers, and creators to bridge grassroots talent with global entertainment markets.",
      joinTalent: "Join as Talent",
      hireTalent: "Casting Calls",
      exploreProjects: "Bihar Untold",
      stat1: "Verified Artists",
      stat2: "AI Matches",
      stat3: "Projects Funded",
      stat4: "Regional Hubs"
    },
    hi: {
      title1: "के लिए एक एकीकृत पारिस्थितिकी तंत्र",
      titleHighlight: "तकनीक, व्यवसाय और व्यावसायिक सेवाएँ।",
      subtitle: "प्रीमियम एआई-संचालित राष्ट्रीय स्तर का रचनात्मक बुनियादी ढांचा जो कलाकारों, लेखकों और रचनाकारों को वैश्विक मनोरंजन बाजारों के साथ जमीनी स्तर की प्रतिभा को जोड़ने के लिए सशक्त बनाता है।",
      joinTalent: "टैलेंट के रूप में जुड़ें",
      hireTalent: "कास्टिंग कॉल्स",
      exploreProjects: "Bihar Untold",
      stat1: "सत्यापित कलाकार",
      stat2: "एआई मैच",
      stat3: "वित्त पोषित परियोजनाएं",
      stat4: "क्षेत्रीय हब"
    },
    mr: {
      title1: "साठी एक एकीकृत इकोसिस्टम",
      titleHighlight: "तंत्रज्ञान, व्यवसाय आणि व्यावसायिक सेवा.",
      subtitle: "प्रीमियम एआय-चालित राष्ट्रीय स्तरावरील रचनात्मक पायाभूत सुविधा जे कलाकार, लेखक आणि निर्मात्यांना जागतिक मनोरंजन बाजारांशी जोडण्यासाठी सक्षम करते.",
      joinTalent: "टॅलेंट म्हणून सामील व्हा",
      hireTalent: "कास्टिंग कॉल्स",
      exploreProjects: "Bihar Untold",
      stat1: "सत्यापित कलाकार",
      stat2: "एआय मॅचेस",
      stat3: "निधी प्राप्त प्रकल्प",
      stat4: "प्रादेशिक हब"
    },
    ta: {
      title1: "ஒரு ஒருங்கிணைந்த சுற்றுச்சூழல்",
      titleHighlight: "தொழில்நுட்பம், வணிகம் மற்றும் தொழில்முறை சேவைகள்.",
      subtitle: "கலைஞர்கள், எழுத்தாளர்கள் மற்றும் படைப்பாளர்களை உலகளாவிய பொழுதுபோக்கு சந்தைகளுடன் இணைக்க அதிகாரமளிக்கும் பிரீமியம் AI-உந்துதல் தேசிய அளவிலான படைப்பு உள்கட்டமைப்பு.",
      joinTalent: "திறமையாக சேரவும்",
      hireTalent: "காஸ்டிங் கால்ஸ்",
      exploreProjects: "Bihar Untold",
      stat1: "சரிபார்க்கப்பட்ட கலைஞர்கள்",
      stat2: "AI பொருத்தங்கள்",
      stat3: "நிதியளிக்கப்பட்ட திட்டங்கள்",
      stat4: "பிராந்திய மையங்கள்"
    },
    te: {
      title1: "కోసం ఒక ఏకీకృత పర్యావరణ వ్యవస్థ",
      titleHighlight: "టెక్, వ్యాపారం & వృత్తిపరమైన సేవలు.",
      subtitle: "కళాకారులు, రచయితలు మరియు సృష్టికర్తలను ప్రపంచ వినోద మార్కెట్‌లతో అనుసంధానించడానికి శక్తివంతం చేసే ప్రీమియం AI-ఆధారిత జాతీయ స్థాయి సృజనాత్మక మౌలిక సదుపాయాలు.",
      joinTalent: "టాలెంట్‌గా చేరండి",
      hireTalent: "కాస్టింగ్ కాల్స్",
      exploreProjects: "Bihar Untold",
      stat1: "ధృవీకరించబడిన కళాకారులు",
      stat2: "AI మ్యాచ్‌లు",
      stat3: "నిధులు పొందిన ప్రాజెక్ట్‌లు",
      stat4: "ప్రాంతీయ కేంద్రాలు"
    },
    bn: {
      title1: "এর জন্য একটি একীভূত ইকোসিস্টেম",
      titleHighlight: "প্রযুক্তি, ব্যবসা এবং পেশাদার পরিষেবা।",
      subtitle: "প্রিমিয়াম এআই-চালিত জাতীয় স্তরের সৃজনশীল পরিকাঠামো যা শিল্পী, লেখক এবং নির্মাতাদের বিশ্বব্যাপী বিনোদন বাজারের সাথে যুক্ত করতে ক্ষমতায়ন করে।",
      joinTalent: "ট্যালেন্ট হিসেবে যোগ দিন",
      hireTalent: "কাস্টিং কলস",
      exploreProjects: "Bihar Untold",
      stat1: "যাচাইকৃত শিল্পী",
      stat2: "এআই ম্যাচ",
      stat3: "অর্থায়িত প্রকল্প",
      stat4: "আঞ্চলিক হাব"
    }
  }[language as 'en' | 'hi' | 'mr' | 'ta' | 'te' | 'bn'] || {
    title1: "One Unified Ecosystem for",
    titleHighlight: "Tech, Business & Professional Services.",
    subtitle: "The premium AI-driven national-level creative infrastructure empowering artists, writers, and creators to bridge grassroots talent with global entertainment markets.",
    joinTalent: "Join as Talent",
    hireTalent: "Casting Calls",
    exploreProjects: "Bihar Untold",
    stat1: "Verified Artists",
    stat2: "AI Matches",
    stat3: "Projects Funded",
    stat4: "Regional Hubs"
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
            onClick={() => setActiveSection('casting')}
            className="w-full sm:w-auto bg-white/5 backdrop-blur-md border border-white/20 px-8 py-4 rounded-full font-bold text-sm sm:text-base uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
          >
            <Users size={18} /> {t.hireTalent}
          </button>
          <button
            onClick={() => setActiveSection('bihar-documentary')}
            className="w-full sm:w-auto bg-white/5 backdrop-blur-md border border-white/20 px-8 py-4 rounded-full font-bold text-sm sm:text-base uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
          >
            <Video size={18} /> {t.exploreProjects}
          </button>
        </div>
      </motion.div>
    </div>

    {/* Floating Stats — no live analytics API yet, so the numbers scaffold
        rather than showing invented totals as if real (labels stay, they're
        real category names). */}
    <div className="absolute bottom-10 left-0 right-0 hidden lg:flex justify-center gap-20">
      {[t.stat1, t.stat2, t.stat3, t.stat4].map((label, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 + i * 0.1 }}
          className="text-center"
        >
          <ScaffoldRow className="h-8 w-16 mx-auto mb-2" />
          <div className="text-xs uppercase tracking-widest text-white/40">{label}</div>
        </motion.div>
      ))}
    </div>
  </section>
  );
};
