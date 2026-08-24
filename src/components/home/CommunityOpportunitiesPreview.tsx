import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, AlertCircle, Sparkles } from 'lucide-react';
import { castingService, type CastingCall } from '../../services/casting';
import { jobsService, type JobPost } from '../../services/jobs';
import { ApiError } from '../../services/httpClient';
import { ScaffoldRow } from '../ScaffoldUI';
import onSetImage from '../../assets/community/on-set.png';
import backstageImage from '../../assets/community/backstage.png';
import openMicImage from '../../assets/community/open-mic.png';
import rehearsalImage from '../../assets/community/rehearsal.png';
import auditionImage from '../../assets/community/audition.png';
import workshopImage from '../../assets/community/workshop.png';
import { tr } from '../../lib/i18n';

// Real listings' `industry` field is free text (no fixed enum — see
// src/services/casting/types.ts), and there's no per-listing photo in the
// API. Rather than inventing a "photo of the applicant" that doesn't exist,
// this maps the real industry string to the same real SosrG Studios photo
// used for that sector elsewhere (TALENT_CATEGORIES) — honest about what
// the image represents (the sector, not the listing).
function industryImage(industry: string): string {
  const key = industry.toLowerCase();
  if (key.includes('theatre')) return onSetImage;
  if (key.includes('music')) return rehearsalImage;
  if (key.includes('dance')) return auditionImage;
  if (key.includes('literat') || key.includes('writ') || key.includes('script')) return openMicImage;
  if (key.includes('art') || key.includes('design') || key.includes('craft')) return workshopImage;
  return backstageImage;
}

type Tab = 'casting' | 'projects' | 'workshops' | 'collaborations';

const TABS_EN: { id: Tab; label: string }[] = [
  { id: 'casting', label: 'Casting Calls' },
  { id: 'projects', label: 'Projects' },
  { id: 'workshops', label: 'Workshops' },
  { id: 'collaborations', label: 'Collaborations' },
];

const TABS_HI: { id: Tab; label: string }[] = [
  { id: 'casting', label: 'कास्टिंग कॉल्स' },
  { id: 'projects', label: 'प्रोजेक्ट्स' },
  { id: 'workshops', label: 'वर्कशॉप' },
  { id: 'collaborations', label: 'सहयोग' },
];

// Reused from CastingEcosystem.tsx's formatCastingBudget — same minor-unit
// budget shape on both CastingCall and JobPost.
function formatBudget(item: { compensationType: string; budgetMinMinor: number | null; budgetMaxMinor: number | null; currency: string }, language: string): string {
  if (item.compensationType === 'unpaid') return tr(language, 'Unpaid', 'अवैतनिक');
  if (item.budgetMinMinor == null || item.budgetMaxMinor == null) {
    return item.compensationType === 'negotiable' ? tr(language, 'Negotiable', 'बातचीत योग्य') : tr(language, 'Compensation TBD', 'पारिश्रमिक तय नहीं');
  }
  const fmt = (minor: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: item.currency, maximumFractionDigits: 0 }).format(minor / 100);
  return `${fmt(item.budgetMinMinor)} – ${fmt(item.budgetMaxMinor)}`;
}

function daysLeftLabel(deadline: string, language: string): string {
  const days = Math.ceil((new Date(deadline).getTime() - Date.now()) / 86_400_000);
  if (days <= 0) return tr(language, 'Closing soon', 'जल्द बंद हो रहा है');
  return tr(language, `${days} day${days === 1 ? '' : 's'} left`, `${days} दिन शेष`);
}

interface PreviewCard {
  id: string;
  title: string;
  industry: string;
  location: string;
  budget: string;
  deadline: string;
}

const castingToCard = (c: CastingCall, language: string): PreviewCard => ({
  id: c.id,
  title: c.title,
  industry: c.industry,
  location: c.pincode || c.workMode,
  budget: formatBudget(c, language),
  deadline: c.applicationDeadline,
});

const jobToCard = (j: JobPost, language: string): PreviewCard => ({
  id: j.id,
  title: j.title,
  industry: j.industry,
  location: j.pincode || j.workMode,
  budget: formatBudget(j, language),
  deadline: j.applicationDeadline,
});

export const CommunityOpportunitiesPreview = ({ language }: { language: string }) => {
  const TABS = language === 'hi' ? TABS_HI : TABS_EN;
  const [tab, setTab] = useState<Tab>('casting');
  const [castingCards, setCastingCards] = useState<PreviewCard[] | null>(null);
  const [projectCards, setProjectCards] = useState<PreviewCard[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    castingService
      .listCastingCalls({ limit: 4 })
      .then((res) => !cancelled && setCastingCards(res.items.map((c) => castingToCard(c, language))))
      .catch((err) => !cancelled && setError(err instanceof ApiError ? err.message : tr(language, 'Could not load casting calls.', 'कास्टिंग कॉल्स लोड नहीं हो सकीं।')));
    jobsService
      .listJobPosts({ limit: 4 })
      .then((res) => !cancelled && setProjectCards(res.items.map((j) => jobToCard(j, language))))
      .catch((err) => !cancelled && setError(err instanceof ApiError ? err.message : tr(language, 'Could not load projects.', 'प्रोजेक्ट्स लोड नहीं हो सके।')));
    return () => {
      cancelled = true;
    };
  }, [language]);

  const activeCards = tab === 'casting' ? castingCards : tab === 'projects' ? projectCards : [];
  const isLive = tab === 'casting' || tab === 'projects';

  return (
    <section className="py-16 sm:py-24 px-6 max-w-[1600px] mx-auto">
      <div className="grid lg:grid-cols-[420px_1fr] gap-16 items-start mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
            {tr(language, 'Your next opportunity ', 'आपका अगला अवसर ')}<span className="gold-text">{tr(language, 'might be a person', 'शायद एक इंसान हो')}</span>.
          </h2>
          <p className="text-white/50 text-sm leading-relaxed">
            {tr(
              language,
              "A director you haven't met. A writer looking for a composer. A dancer looking for a stage. A filmmaker looking for an actor. A studio looking for a collaborator. SosrG brings creative people closer together.",
              'एक निर्देशक जिससे आप अभी तक नहीं मिले। एक लेखक जो संगीतकार ढूंढ रहा है। एक डांसर जो मंच ढूंढ रहा है। एक फिल्ममेकर जो एक्टर ढूंढ रहा है। एक स्टूडियो जो सहयोगी ढूंढ रहा है। SosrG क्रिएटिव लोगों को एक-दूसरे के करीब लाता है।'
            )}
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-colors ${
                  tab === t.id ? 'bg-gold text-black' : 'bg-white/5 text-white/50 hover:text-white/80'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <Link to="/casting" className="text-xs font-bold uppercase tracking-widest text-gold hover:underline">
            {tr(language, 'View All', 'सभी देखें')}
          </Link>
        </div>
      </div>

      {!isLive ? (
        <div className="glass-panel py-16 px-6 text-center flex flex-col items-center gap-3">
          <Sparkles size={24} className="text-gold/60" />
          <p className="font-bold">{tr(language, `${TABS.find((t) => t.id === tab)?.label} is coming soon.`, `${TABS.find((t) => t.id === tab)?.label} जल्द आ रहा है।`)}</p>
          <p className="text-white/40 text-sm max-w-sm">
            {tr(language, "We're building this out — check back soon, or explore Casting Calls and Projects in the meantime.", 'हम इसे बना रहे हैं — जल्द वापस देखें, या तब तक कास्टिंग कॉल्स और प्रोजेक्ट्स एक्सप्लोर करें।')}
          </p>
        </div>
      ) : error ? (
        <div className="glass-panel py-16 px-6 text-center text-white/40 flex flex-col items-center gap-3">
          <AlertCircle size={24} className="text-white/30" />
          {error}
        </div>
      ) : activeCards === null ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <ScaffoldRow key={i} className="h-72" />
          ))}
        </div>
      ) : activeCards.length === 0 ? (
        <div className="glass-panel py-16 px-6 text-center text-white/40">
          {tr(language, `No ${TABS.find((t) => t.id === tab)?.label.toLowerCase()} open right now — check back soon.`, `अभी कोई ${TABS.find((t) => t.id === tab)?.label} खुला नहीं है — जल्द वापस देखें।`)}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeCards.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="glass-panel overflow-hidden flex flex-col transition-transform hover:-translate-y-1"
            >
              <div className="relative h-32">
                <img src={industryImage(card.industry)} alt="" aria-hidden="true" className="h-full w-full object-cover" />
                <div className="absolute inset-0 photo-scrim-b opacity-60" />
                <div className="photo-text absolute bottom-2 left-3 text-[10px] font-bold uppercase tracking-widest">
                  {card.industry}
                </div>
              </div>
              <div className="p-4 flex flex-col justify-between flex-1">
                <div className="font-bold text-sm leading-snug mb-3">{card.title}</div>
                <div className="space-y-1 text-xs text-white/40">
                  <div className="flex items-center gap-1.5"><MapPin size={12} /> {card.location}</div>
                  <div>{card.budget}</div>
                  <div className="flex items-center gap-1.5"><Clock size={12} /> {daysLeftLabel(card.deadline, language)}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};
