import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, FileText, Mic, Palette, CheckCircle2 } from 'lucide-react';
import { ComingSoonTag } from '../ScaffoldUI';
import backstageImage from '../../assets/community/backstage.png';
import openMicImage from '../../assets/community/open-mic.png';
import rehearsalImage from '../../assets/community/rehearsal.png';
import workshopImage from '../../assets/community/workshop.png';
import { tr } from '../../lib/i18n';

// Content restored verbatim from the deleted CollaborationNetwork.tsx (all
// four programs' full description/bullets/CTA/"how it works" panel — not a
// condensed summary). Presentation is deliberately the Seven Worlds
// section's image/nav-list/detail-panel structure (same glass-panel grid,
// same selectable-list interaction), reused at explicit request rather than
// the marquee carousel the first pass used. None of the four programs have
// a live API behind them — same as the original — so the whole panel stays
// marked Coming Soon rather than implying otherwise.
const PROGRAMS_EN = [
  {
    id: 'theatre',
    title: 'Theatre to Cinema Bridge',
    icon: User,
    accent: 'text-gold',
    image: backstageImage,
    desc: 'A dedicated pathway helping seasoned stage actors transition seamlessly into film and OTT roles. Our AI translates theatre experience into cinematic casting metrics.',
    bullets: [
      'AI translation of stage credits to screen equivalents',
      'Exclusive casting calls for classically trained actors',
      'Workshops on camera acting techniques',
      'Direct producer networking events',
    ],
    cta: 'Explore Bridge Program',
    howTitle: 'How the Bridge Works',
    howDesc: "Your stage credits — productions, run length, training lineage — get read against a cinematic casting rubric, so a casting director searching for screen experience can still find you on theatre experience alone.",
    tags: ['AI Credit Translation', 'Classical Training Recognized', 'Camera Technique Workshops', 'Direct Producer Access'],
  },
  {
    id: 'literature',
    title: 'Literature to Screen Marketplace',
    icon: FileText,
    accent: 'text-blue-400',
    image: openMicImage,
    desc: 'A secure marketplace where screenwriters, novelists, and playwrights can pitch their intellectual property directly to verified producers and studios.',
    bullets: [
      'Secure IP timestamping before pitching',
      'Direct messaging with verified producers',
      'AI-assisted pitch deck generation',
      'Standardized option agreements',
    ],
    cta: 'Enter Marketplace',
    howTitle: 'How the Marketplace Works',
    howDesc: "Your script or manuscript gets a timestamped IP record the moment you upload it, before it's ever shown to a producer — so pitching stays provable, not just polite.",
    tags: ['IP Timestamped', 'Verified Producers Only', 'AI Pitch Assist', 'Standard Option Terms'],
  },
  {
    id: 'music',
    title: 'Music Collaboration Hub',
    icon: Mic,
    accent: 'text-purple-400',
    image: rehearsalImage,
    desc: 'Connect lyricists, singers, composers, and sound engineers in real-time. Share stems, co-write lyrics, and manage split sheets automatically.',
    bullets: [
      'Real-time audio collaboration rooms',
      'Automated royalty split sheet generation',
      'Find session musicians by instrument and genre',
      'Direct integration with film post-production',
    ],
    cta: 'Start Collaborating',
    howTitle: 'How the Hub Works',
    howDesc: 'Open a room for a track, invite collaborators by role, and everyone works from the same stems and lyric doc — with royalty splits generated from who actually contributed, not negotiated after the fact.',
    tags: ['Real-time Rooms', 'Auto Split Sheets', 'Genre-matched Search', 'Post-production Ready'],
  },
  {
    id: 'art',
    title: 'Art & Craft Vendor Directory',
    icon: Palette,
    accent: 'text-emerald-400',
    image: workshopImage,
    desc: 'A verified directory connecting production designers, art directors, and costume designers directly to specialized suppliers, artisans, and rental houses.',
    bullets: [
      'Verified vendor ratings and reviews',
      'Direct RFQ (Request for Quote) system',
      'Escrow payments for large orders',
      'Location-based supplier search',
    ],
    cta: 'Browse Directory',
    howTitle: 'How the Directory Works',
    howDesc: 'Search verified prop houses, costume suppliers, and rental studios by category and location, send a request for quote, and settle through escrow instead of a phone-and-invoice chase.',
    tags: ['Verified Vendors', 'RFQ System', 'Escrow Protected', 'Location Search'],
  },
];

// Hindi mirrors PROGRAMS_EN by array index (id/icon/accent/image stay
// identical — only the copy fields are translated), so selection logic
// keeps working off ids from the English source of truth.
const PROGRAMS_HI = [
  {
    title: 'थिएटर से सिनेमा ब्रिज',
    desc: 'अनुभवी स्टेज एक्टर्स को फिल्म और OTT भूमिकाओं में सहजता से बदलाव करने में मदद करने वाला एक समर्पित रास्ता। हमारा AI थिएटर के अनुभव को सिनेमैटिक कास्टिंग मेट्रिक्स में बदलता है।',
    bullets: [
      'स्टेज क्रेडिट्स का स्क्रीन के बराबर AI अनुवाद',
      'क्लासिकल ट्रेनिंग प्राप्त अभिनेताओं के लिए एक्सक्लूसिव कास्टिंग कॉल्स',
      'कैमरा एक्टिंग तकनीकों पर वर्कशॉप',
      'सीधे प्रोड्यूसर नेटवर्किंग इवेंट्स',
    ],
    cta: 'ब्रिज प्रोग्राम एक्सप्लोर करें',
    howTitle: 'ब्रिज कैसे काम करता है',
    howDesc: 'आपके स्टेज क्रेडिट्स — प्रोडक्शन, रन लेंथ, ट्रेनिंग लीनिएज — को एक सिनेमैटिक कास्टिंग रूब्रिक के आधार पर परखा जाता है, ताकि स्क्रीन अनुभव खोज रहा कास्टिंग डायरेक्टर सिर्फ थिएटर अनुभव के आधार पर भी आपको ढूंढ सके।',
    tags: ['AI क्रेडिट अनुवाद', 'क्लासिकल ट्रेनिंग मान्य', 'कैमरा तकनीक वर्कशॉप', 'सीधी प्रोड्यूसर पहुंच'],
  },
  {
    title: 'साहित्य से स्क्रीन मार्केटप्लेस',
    desc: 'एक सुरक्षित मार्केटप्लेस जहाँ स्क्रीनराइटर्स, उपन्यासकार और नाटककार अपनी बौद्धिक संपदा सीधे सत्यापित प्रोड्यूसर्स और स्टूडियोज़ के सामने पेश कर सकते हैं।',
    bullets: [
      'पिच करने से पहले सुरक्षित IP टाइमस्टैम्पिंग',
      'सत्यापित प्रोड्यूसर्स के साथ सीधी मैसेजिंग',
      'AI-सहायता प्राप्त पिच डेक जनरेशन',
      'मानकीकृत ऑप्शन एग्रीमेंट्स',
    ],
    cta: 'मार्केटप्लेस में प्रवेश करें',
    howTitle: 'मार्केटप्लेस कैसे काम करता है',
    howDesc: 'आपकी स्क्रिप्ट या पांडुलिपि को अपलोड करते ही, प्रोड्यूसर को दिखाए जाने से पहले ही एक टाइमस्टैम्प्ड IP रिकॉर्ड मिल जाता है — ताकि पिचिंग सिर्फ भरोसे पर नहीं, साबित करने लायक बनी रहे।',
    tags: ['IP टाइमस्टैम्प्ड', 'केवल सत्यापित प्रोड्यूसर्स', 'AI पिच सहायता', 'मानक ऑप्शन शर्तें'],
  },
  {
    title: 'संगीत सहयोग हब',
    desc: 'गीतकारों, गायकों, संगीतकारों और साउंड इंजीनियरों को रियल-टाइम में जोड़ें। स्टेम्स शेयर करें, साथ में गीत लिखें, और स्प्लिट शीट्स को अपने आप मैनेज करें।',
    bullets: [
      'रियल-टाइम ऑडियो कोलैबोरेशन रूम्स',
      'ऑटोमेटेड रॉयल्टी स्प्लिट शीट जनरेशन',
      'इंस्ट्रूमेंट और जॉनर के आधार पर सेशन म्यूज़िशियन खोजें',
      'फिल्म पोस्ट-प्रोडक्शन के साथ सीधा इंटीग्रेशन',
    ],
    cta: 'सहयोग शुरू करें',
    howTitle: 'हब कैसे काम करता है',
    howDesc: 'किसी ट्रैक के लिए एक रूम खोलें, भूमिका के अनुसार सहयोगियों को आमंत्रित करें, और सभी एक ही स्टेम्स और लिरिक डॉक पर काम करें — रॉयल्टी स्प्लिट्स इस आधार पर बनते हैं कि किसने वास्तव में योगदान दिया, बाद में बातचीत करने पर नहीं।',
    tags: ['रियल-टाइम रूम्स', 'ऑटो स्प्लिट शीट्स', 'जॉनर-मैच्ड सर्च', 'पोस्ट-प्रोडक्शन रेडी'],
  },
  {
    title: 'कला और शिल्प वेंडर डायरेक्टरी',
    desc: 'प्रोडक्शन डिज़ाइनरों, आर्ट डायरेक्टर्स और कॉस्ट्यूम डिज़ाइनरों को सीधे विशेष सप्लायर्स, कारीगरों और रेंटल हाउसों से जोड़ने वाली एक सत्यापित डायरेक्टरी।',
    bullets: [
      'सत्यापित वेंडर रेटिंग्स और रिव्यू',
      'सीधा RFQ (रिक्वेस्ट फॉर क्वोट) सिस्टम',
      'बड़े ऑर्डर्स के लिए एस्क्रो पेमेंट्स',
      'लोकेशन-आधारित सप्लायर सर्च',
    ],
    cta: 'डायरेक्टरी ब्राउज़ करें',
    howTitle: 'डायरेक्टरी कैसे काम करती है',
    howDesc: 'श्रेणी और लोकेशन के अनुसार सत्यापित प्रॉप हाउस, कॉस्ट्यूम सप्लायर और रेंटल स्टूडियो खोजें, कोटेशन का अनुरोध भेजें, और फोन-और-इनवॉइस की भागदौड़ की बजाय एस्क्रो के ज़रिए भुगतान करें।',
    tags: ['सत्यापित वेंडर्स', 'RFQ सिस्टम', 'एस्क्रो सुरक्षित', 'लोकेशन सर्च'],
  },
];

export const CollaborationNetwork = ({ language }: { language: string }) => {
  const PROGRAMS = PROGRAMS_EN.map((p, i) => (language === 'hi' ? { ...p, ...PROGRAMS_HI[i] } : p));
  const [selectedId, setSelectedId] = useState(PROGRAMS[0].id);
  const selected = PROGRAMS.find((p) => p.id === selectedId) ?? PROGRAMS[0];

  return (
    <section className="py-10 sm:py-24 px-6 max-w-[1600px] mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          {tr(language, 'Collaboration & ', 'सहयोग और ')}<span className="gold-text">{tr(language, 'Network Layer', 'नेटवर्क लेयर')}</span>
        </h2>
        <p className="text-white/40 max-w-xl mx-auto">
          {tr(language, 'Cross-pollinating talent across the 7 core creative sectors.', '7 प्रमुख क्रिएटिव क्षेत्रों में प्रतिभा का आदान-प्रदान।')}
        </p>
      </div>

      <div className="relative grid lg:grid-cols-[1fr_300px_1fr] gap-8 glass-panel p-4 md:p-6">
        <ComingSoonTag />

        <div className="relative h-72 lg:h-[420px] rounded-xl overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={selected.id}
              src={selected.image}
              alt=""
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 photo-scrim-b" />
        </div>

        <nav className="flex flex-col justify-center gap-1">
          {PROGRAMS.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedId(p.id)}
              aria-current={p.id === selectedId}
              className={`flex items-center gap-2 text-left px-4 py-3 rounded-lg text-sm font-bold transition-colors ${
                p.id === selectedId
                  ? 'bg-gold/10 text-gold border-l-2 border-gold'
                  : 'text-white/50 border-l-2 border-transparent hover:text-white/80'
              }`}
            >
              <p.icon size={16} className="shrink-0" /> {p.title}
            </button>
          ))}
        </nav>

        {/* No fixed max-height/scroll here — a nested scroll region inside a
            page that's already scrolling is a real mobile UX problem (two
            competing scroll gestures, and content silently clipped below
            the fold with no visible affordance that more exists). Panel
            just grows to fit whichever program's content is selected. */}
        <div className="py-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-white/60 leading-relaxed mb-5">{selected.desc}</p>
              <ul className="space-y-3 mb-6">
                {selected.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-white/80">
                    <CheckCircle2 size={16} className={`${selected.accent} shrink-0 mt-0.5`} /> {b}
                  </li>
                ))}
              </ul>
              <button
                disabled
                className="w-full sm:w-auto bg-white/10 border border-white/10 text-white/50 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest cursor-not-allowed"
              >
                {selected.cta} — {tr(language, 'Coming Soon', 'जल्द आ रहा है')}
              </button>

              <div className="mt-8 pt-6 border-t border-white/10">
                <h4 className="font-bold text-sm mb-2">{selected.howTitle}</h4>
                <p className="text-xs text-white/50 leading-relaxed mb-4">{selected.howDesc}</p>
                <div className="flex flex-wrap gap-2">
                  {selected.tags.map((tag) => (
                    <span key={tag} className="text-[10px] bg-white/5 border border-white/10 text-white/60 px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
