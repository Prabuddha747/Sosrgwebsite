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
import { analyzeScript } from '../services/geminiService';

export const AISuite = () => {
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
