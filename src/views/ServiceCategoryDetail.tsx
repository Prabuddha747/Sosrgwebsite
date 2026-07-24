"use client";

import React from 'react';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from '@/lib/router-compat';
import { 
  Theater, Film, BookOpen, Music as MusicIcon, 
  Users, Palette, Hammer, ArrowLeft, ArrowRight,
  Shield, Zap, Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

const ECOSYSTEM_DATA: Record<string, any> = {
  "theatre-live-arts": {
    title: "Theatre & Live Arts",
    slug: "theatre-live-arts",
    icon: Theater,
    description: "The stage is a sanctuary for transformation. We connect playwrights, directors, and performers to create legendary live experiences.",
    groups: [
      { name: "Creative Leadership", roles: ["Artistic Director", "Playwright", "Theatre Director", "Dramaturg"] },
      { name: "Production & Technical Team", roles: ["Executive Producer", "Stage Manager", "Set Designer", "Lighting Designer", "Costume Designer", "Sound Designer"] },
      { name: "Performers & Artists", roles: ["Lead Actor/Actress", "Supporting Actor/Actress", "Chorus Member", "Puppeteer", "Dancer"] },
      { name: "Support Roles", roles: ["Props Manager", "Makeup Artist", "Wardrobe Assistant", "Light & Sound Operator", "Production Assistant"] }
    ]
  },
  "cinema-tv-production": {
    title: "Cinema & TV Production",
    slug: "cinema-tv-production",
    icon: Film,
    description: "Architecting the future of visual storytelling. A comprehensive network for independent filmmakers and production houses.",
    groups: [
      { name: "Leadership & Creative Heads", roles: ["Producer", "Executive Producer", "Director", "Screenwriter", "Cinematographer (DOP)", "Showrunner"] },
      { name: "Department Heads", roles: ["Production Designer", "Editor", "Sound Designer", "VFX Supervisor"] },
      { name: "Actors & Performers", roles: ["Lead Actor/Actress", "Supporting Actor/Actress", "Background Actor"] },
      { name: "Technical & Support Crew", roles: ["Assistant Director", "Camera Operator", "Focus Puller", "Gaffer", "Best Boy (Lighting)", "Boom Operator", "Art Director", "Makeup Artist", "Costume Designer", "Stunt Coordinator", "Production Assistant"] },
      { name: "Post-Production", roles: ["Film Editor", "Colorist", "Foley Artist", "Sound Mixer"] }
    ]
  },
  "literature-publishing": {
    title: "Literature & Publishing",
    slug: "literature-publishing",
    icon: BookOpen,
    description: "Manifesting the written word into legacy. Connecting authors with the elite editing and publishing infrastructure.",
    groups: [
      { name: "Creative Roles", roles: ["Novelist", "Poet", "Essayist", "Biographer", "Translator", "Screenwriter"] },
      { name: "Publishing & Editing", roles: ["Editor-in-Chief", "Literary Agent", "Book Editor", "Proofreader", "Copyeditor"] },
      { name: "Support Roles", roles: ["Illustrator (for books, comics)", "Typesetter", "Printing Technician"] }
    ]
  },
  "music-sound": {
    title: "Music & Sound",
    slug: "music-sound",
    icon: MusicIcon,
    description: "Your voice, amplified like a brand. Precision orchestration for musicians, composers, and sound engineers.",
    groups: [
      { name: "Creative Leadership", roles: ["Music Director/Composer", "Lyricist", "Playback Singer"] },
      { name: "Performers", roles: ["Lead Singer", "Instrumentalist", "Backup Singer"] },
      { name: "Production & Technical Crew", roles: ["Music Producer", "Recording Engineer", "Mixing Engineer", "Mastering Engineer"] },
      { name: "Support Roles", roles: ["Concert Organizer", "Instrument Technician", "Sound Technician"] }
    ]
  },
  "dance-choreography": {
    title: "Dance & Choreography",
    slug: "dance-choreography",
    icon: Users,
    description: "The geometry of movement. Strategic career architecture for dancers and visionary choreographers.",
    groups: [
      { name: "Creative Leadership", roles: ["Choreographer", "Artistic Director"] },
      { name: "Performers", roles: ["Principal Dancer", "Solo Dancer", "Group Dancer"] },
      { name: "Support & Technical Crew", roles: ["Dance Teacher/Trainer", "Rehearsal Director", "Costume Designer"] }
    ]
  },
  "fine-arts-design": {
    title: "Fine Arts & Design",
    slug: "fine-arts-design",
    icon: Palette,
    description: "A prestigious portal for the visual avant-garde. From digital manifestations to traditional galleries.",
    groups: [
      { name: "Creative Roles", roles: ["Curator", "Fine Artist (Painter, Sculptor)", "Digital Artist", "Photographer", "VFX / Animator", "Architecture College", "Design Institute"] },
      { name: "Support Roles", roles: ["Art Teacher", "Art Critic", "Gallery Manager", "Art Tools Mfrs.", "Colorist", "Set Designer"] }
    ]
  },
  "handicrafts-artisan": {
    title: "Handicrafts & Artisan",
    slug: "handicrafts-artisan",
    icon: Hammer,
    description: "Preserving the soul of tradition. Scale your craftsmanship through our global commerce ecosystem.",
    groups: [
      { name: "Creative Roles", roles: ["Master Craftsman", "Designer (Handicrafts, Textiles, etc.)"] },
      { name: "Artisans", roles: ["Potter", "Weaver", "Carpenter", "Blacksmith"] },
      { name: "Support & Marketing", roles: ["Craft Trader", "Craft Fair Organizer"] }
    ]
  }
};

const ServiceCategoryDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const data = slug ? ECOSYSTEM_DATA[slug] : null;
  const cinematicTransition: any = { duration: 0.8, ease: [] as any };

  if (!data) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center bg-transparent px-[5%] text-center">
          <h1 className="text-3xl md:text-6xl font-bold text-white mb-8 premium-serif italic">Category Not Found.</h1>
          <button onClick={() => navigate('/services')} className="px-16 py-6 bg-[#5490B4] text-[#1A1A1A] text-[10px] font-black uppercase tracking-[0.5em] hover:bg-[#5490B4]/90 transition-all duration-700 font-sans">
            RETURN TO SERVICES
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-transparent min-h-screen pb-40 text-[#F5F5F5] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-[#5490B4]/5 blur-[200px] rounded-full" />
        </div>

        {/* --- Header Section --- */}
        <section className="pt-60 pb-32 relative overflow-hidden z-10">
          <div className="layout-container relative z-10">
            <button 
              onClick={() => navigate('/services')}
              className="mb-20 flex items-center gap-4 text-white/40 hover:text-[#5490B4] transition-colors group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
              <span className="text-[10px] font-bold uppercase tracking-[0.6em]">BACK TO SERVICES</span>
            </button>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={cinematicTransition}
              className="max-w-4xl"
            >
              <div className="flex items-center gap-8 mb-12">
                <div className="w-20 h-20 bg-white/5 border border-white/10 text-white rounded-2xl flex items-center justify-center shadow-2xl">
                  <data.icon size={36} className="text-[#5490B4]" />
                </div>
                <span className="text-[#5490B4] text-[11px] font-bold uppercase tracking-[0.6em]">ECOSYSTEM SECTOR</span>
              </div>
              <h1 className="text-[clamp(3rem,8vw,7rem)] font-bold text-white tracking-tighter leading-[0.85] mb-12 premium-serif font-sans">
                {data.title}<span className="text-[#5490B4] italic font-light">.</span>
              </h1>
              <p className="text-2xl text-white/60 font-light leading-relaxed italic max-w-3xl">
                {data.description}
              </p>
            </motion.div>
          </div>
        </section>

        {/* --- Roles Grid --- */}
        <section className="py-24 relative z-10">
          <div className="layout-container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-16">
              {data.groups.map((group: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 p-6 md:p-16 border border-white/10 rounded-2xl group hover:border-[#5490B4]/50 transition-all duration-700 shadow-sm backdrop-blur-md"
                >
                  <div className="flex items-center justify-between mb-12 border-b border-white/10 pb-8">
                    <h3 className="text-3xl font-bold text-white premium-serif">{group.name}</h3>
                    <Shield size={20} className="text-[#5490B4] opacity-20 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {group.roles.map((role: string, k: number) => (
                      <div key={k} className="flex items-center gap-4 group/item">
                        <div className="w-1.5 h-1.5 bg-[#5490B4]/30 rounded-full group-hover/item:scale-150 group-hover/item:bg-[#5490B4] transition-all" />
                        <span className="text-[11px] font-bold text-white/50 uppercase tracking-[0.2em] group-hover/item:text-white transition-colors">
                          {role}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Call to Action --- */}
        <section className="py-32 relative z-10">
          <div className="layout-container">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-24 text-center relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-[#5490B4] opacity-30" />
              <Sparkles className="mx-auto text-[#5490B4] mb-10" size={48} />
              <h2 className="text-3xl md:text-6xl font-bold text-white tracking-tighter mb-10 premium-serif">
                Join the <span className="text-[#5490B4] italic font-light font-sans">Ecosystem.</span>
              </h2>
              <p className="text-xl text-white/60 italic font-light mb-16 max-w-2xl mx-auto">
                Are you a professional in this field? Register today to connect with elite production houses and creators.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                <button 
                  onClick={() => navigate('/bihar-creators-registration')}
                  className="px-16 py-8 bg-[#5490B4] text-[#1A1A1A] text-[11px] font-black uppercase tracking-[0.5em] hover:bg-white hover:text-[#1A1A1A] transition-all duration-700 shadow-2xl shadow-[#5490B4]/10 flex items-center group font-sans"
                >
                  Apply Now <ArrowRight size={18} className="ml-4 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ServiceCategoryDetail;
