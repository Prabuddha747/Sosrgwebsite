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
import type { ProfileType, ExperienceLevel } from '../../types';

export const ProfileSetupFlow = ({ onComplete }: { onComplete: (data: any) => void }) => {
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
