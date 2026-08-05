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
import type { Section } from '../types';
import { FEATURED_TALENT } from '../data/mockData';

export const CastingEcosystem = () => {
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
