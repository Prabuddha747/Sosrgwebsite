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

export const SosrGAcademy = () => {
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
