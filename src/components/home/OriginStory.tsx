import { motion } from 'motion/react';
import founderPhoto from '../../assets/home/founder-siddhartha.png';
import { tr } from '../../lib/i18n';

// Founder journey, supplied directly by the SosrG team (real timeline, not
// invented) — replaces the earlier generic Theatre/Filmmaking/Writing/
// Direction/Community photo row, which read as disconnected craft
// categories rather than an actual origin story. No per-era photo exists
// for these (Sainik School, NID, etc.), so this timeline is text/dot only
// — the one real photo available (the founder's own) anchors the intro
// block above it instead of being stretched across eight eras it doesn't
// depict.
const JOURNEY_EN = [
  { year: '2012', label: 'Sainik School', desc: 'One question: can art change society?' },
  { year: '', label: 'NID', desc: 'National Institute of Design' },
  { year: '', label: 'NIFT', desc: 'National Institute of Fashion Technology' },
  { year: '', label: 'Film School', desc: 'Learning the craft' },
  { year: '', label: 'Theatre', desc: '100+ theatre groups built' },
  { year: '', label: '380+ Productions', desc: 'Across stage and screen' },
  { year: '', label: 'Guinness World Record', desc: 'A record for the discipline' },
  { year: 'Today', label: 'SosrG', desc: 'Building it for every artist in Bihar' },
];

const JOURNEY_HI = [
  { year: '2012', label: 'सैनिक स्कूल', desc: 'एक सवाल: क्या कला समाज को बदल सकती है?' },
  { year: '', label: 'NID', desc: 'नेशनल इंस्टिट्यूट ऑफ़ डिज़ाइन' },
  { year: '', label: 'NIFT', desc: 'नेशनल इंस्टिट्यूट ऑफ़ फैशन टेक्नोलॉजी' },
  { year: '', label: 'फिल्म स्कूल', desc: 'हुनर सीखना' },
  { year: '', label: 'रंगमंच', desc: '100+ थिएटर ग्रुप्स बनाए' },
  { year: '', label: '380+ प्रोडक्शन्स', desc: 'मंच और स्क्रीन दोनों पर' },
  { year: '', label: 'गिनीज़ वर्ल्ड रिकॉर्ड', desc: 'अनुशासन के लिए एक रिकॉर्ड' },
  { year: 'आज', label: 'SosrG', desc: 'बिहार के हर कलाकार के लिए इसे बना रहे हैं' },
];

// Line + dot share one top edge (this wrapper's own top), so they can't
// drift out of alignment with each other the way two separately-offset
// absolute elements could.
const TimelineNode = ({ year, label, desc }: { year: string; label: string; desc: string }) => (
  <>
    <div className="relative pt-3 mb-3">
      <div className="absolute top-0 left-0 right-0 border-t border-gold/30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gold ring-4 ring-cinematic-black" />
    </div>
    {year && <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">{year}</div>}
    <div className="font-bold text-sm text-gold">{label}</div>
    <p className="text-xs text-white/50 mt-1 leading-snug">{desc}</p>
  </>
);

export const OriginStory = ({ language }: { language: string }) => {
  const JOURNEY = language === 'hi' ? JOURNEY_HI : JOURNEY_EN;
  return (
  <section className="py-16 sm:py-24 px-6 max-w-[1600px] mx-auto">
    <p className="text-xs font-bold uppercase tracking-widest text-gold mb-6">
      {tr(language, 'About SosrG', 'SosrG के बारे में')}
    </p>

    <div className="grid lg:grid-cols-[minmax(0,300px)_1fr] gap-10 lg:gap-16 items-start mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7 }}
      >
        <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
          <img src={founderPhoto} alt="Siddhartha, Founder & CEO of SosrG" className="h-full w-full object-cover" />
        </div>
        <div className="mt-4">
          <div className="font-bold text-lg">{tr(language, 'Siddhartha', 'सिद्धार्थ')}</div>
          <div className="text-xs text-gold uppercase tracking-widest font-bold mt-1">
            {tr(language, 'Founder & CEO, SosrG', 'फाउंडर एवं सीईओ, SosrG')}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
          {tr(language, "This Wasn't Built Overnight.", 'यह एक रात में नहीं बना।')}
        </h2>
        <p className="text-white/60 mb-4 leading-relaxed">
          {tr(language, 'It was built over 14 years.', 'यह 14 सालों में बना है।')}
        </p>
        <p className="text-white/60 mb-4 leading-relaxed">
          {tr(
            language,
            'From a classroom in Sainik School to a Guinness World Record, before SosrG ever existed as a platform.',
            'सैनिक स्कूल की एक क्लासरूम से लेकर गिनीज़ वर्ल्ड रिकॉर्ड तक — SosrG के एक प्लेटफॉर्म के रूप में अस्तित्व में आने से पहले।'
          )}
        </p>
        <p className="text-white/60 leading-relaxed">
          {tr(
            language,
            'What started with one creative journey is growing into a space for every kind of artist.',
            'जो एक क्रिएटिव सफ़र से शुरू हुआ, वह अब हर तरह के कलाकार के लिए एक जगह बनता जा रहा है।'
          )}
        </p>
      </motion.div>
    </div>

    <div className="overflow-x-auto no-scrollbar">
      <div className="flex items-start gap-6 min-w-[1100px]">
        {JOURNEY.map((j, i) => (
          <motion.div
            key={j.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="flex-1 min-w-0"
          >
            <TimelineNode year={j.year} label={j.label} desc={j.desc} />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
  );
};
