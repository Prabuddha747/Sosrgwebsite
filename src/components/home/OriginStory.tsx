import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'motion/react';
import { Quote, Users, Handshake, Megaphone, Globe } from 'lucide-react';
import founderPhoto from '../../assets/home/founder-siddhartha.png';
import theatreImage from '../../assets/home/journey-theatre.png';
import filmSchoolImage from '../../assets/home/journey-film-school.png';
import productionsImage from '../../assets/home/journey-productions.png';
import { tr } from '../../lib/i18n';

const STATS_EN = [
  { icon: Users, value: '50K+', label: 'Artists & Creators' },
  { icon: Handshake, value: '500+', label: 'Collaboration Partners' },
  { icon: Megaphone, value: '1000+', label: 'Opportunities Created' },
  { icon: Globe, value: '25+', label: 'Countries Connected' },
];

const STATS_HI = [
  { icon: Users, value: '50K+', label: 'कलाकार और क्रिएटर्स' },
  { icon: Handshake, value: '500+', label: 'सहयोग साझेदार' },
  { icon: Megaphone, value: '1000+', label: 'बनाए गए अवसर' },
  { icon: Globe, value: '25+', label: 'जुड़े हुए देश' },
];

const CARDS_EN = [
  {
    n: '01',
    label: 'Theatre',
    tagline: '100+ theatre groups built',
    image: theatreImage,
    stats: [
      { value: '10,000+', label: 'Theatre Artists' },
      { value: '500+', label: 'Shows & Festivals Curated' },
      { value: '100+', label: 'Cities & Towns Impacted' },
    ],
    caption: 'Building confidence. Telling stories. Creating change. Theatre with purpose, across every corner.',
  },
  {
    n: '02',
    label: 'Film School',
    tagline: 'Learning the craft',
    image: filmSchoolImage,
    stats: [
      { value: '2000+', label: 'Students Trained' },
      { value: '50+', label: 'Workshops & Masterclasses' },
      { value: '', label: 'Mentorship From Industry Professionals' },
    ],
    caption: 'Nurturing the next generation of storytellers with skills, knowledge and real-world exposure.',
  },
  {
    n: '03',
    label: '380+ Productions',
    tagline: 'Across stage and screen',
    image: productionsImage,
    stats: [
      { value: '380+', label: 'Productions Delivered' },
      { value: '', label: 'Millions Of Audience Reached' },
      { value: '', label: 'Stories That Inspire, Voices That Last' },
    ],
    caption: 'From powerful performances to impactful films, we bring ideas to life that leave a lasting mark.',
  },
];

const CARDS_HI = [
  {
    n: '01',
    label: 'रंगमंच',
    tagline: '100+ थिएटर ग्रुप्स बनाए',
    image: theatreImage,
    stats: [
      { value: '10,000+', label: 'थिएटर कलाकार' },
      { value: '500+', label: 'क्यूरेट किए गए शो और फेस्टिवल' },
      { value: '100+', label: 'प्रभावित शहर और कस्बे' },
    ],
    caption: 'आत्मविश्वास बनाना। कहानियां कहना। बदलाव लाना। हर कोने में उद्देश्यपूर्ण रंगमंच।',
  },
  {
    n: '02',
    label: 'फिल्म स्कूल',
    tagline: 'हुनर सीखना',
    image: filmSchoolImage,
    stats: [
      { value: '2000+', label: 'प्रशिक्षित छात्र' },
      { value: '50+', label: 'वर्कशॉप और मास्टरक्लास' },
      { value: '', label: 'इंडस्ट्री प्रोफेशनल्स से मेंटरशिप' },
    ],
    caption: 'अगली पीढ़ी के कहानीकारों को हुनर, ज्ञान और असली दुनिया के अनुभव से तैयार करना।',
  },
  {
    n: '03',
    label: '380+ प्रोडक्शन्स',
    tagline: 'मंच और स्क्रीन दोनों पर',
    image: productionsImage,
    stats: [
      { value: '380+', label: 'पूरे किए गए प्रोडक्शन्स' },
      { value: '', label: 'लाखों दर्शकों तक पहुंच' },
      { value: '', label: 'प्रेरित करने वाली कहानियां, अमिट आवाज़ें' },
    ],
    caption: 'शक्तिशाली प्रदर्शनों से लेकर प्रभावशाली फिल्मों तक, हम ऐसे विचारों को जीवंत करते हैं जो एक स्थायी छाप छोड़ते हैं।',
  },
];

// Counts up from 0 to the number embedded in `value` (e.g. "50K+",
// "10,000+", "380+") once it scrolls into view, then snaps to the exact
// source string so formatting (commas, K/+ suffix) always matches what
// was authored rather than whatever the animation's own rounding produced.
const Counter = ({ value }: { value: string }) => {
  const match = value.match(/^([\d,]+)(.*)$/);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [display, setDisplay] = useState(match ? `0${match[2]}` : value);

  useEffect(() => {
    if (!isInView || !match) return;
    const target = parseInt(match[1].replace(/,/g, ''), 10);
    const suffix = match[2];
    const controls = animate(0, target, {
      duration: 1.4,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(`${Math.round(v)}${suffix}`),
      onComplete: () => setDisplay(value),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  return <span ref={ref}>{match ? display : value}</span>;
};

export const OriginStory = ({ language }: { language: string }) => {
  const STATS = language === 'hi' ? STATS_HI : STATS_EN;
  const CARDS = language === 'hi' ? CARDS_HI : CARDS_EN;
  return (
  <section className="py-10 sm:py-24 px-6 max-w-[1600px] mx-auto">
    <div className="flex items-center gap-4 mb-10">
      <span className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gold shrink-0">
        {tr(language, 'About SosrG', 'SosrG के बारे में')}
      </span>
      <span className="h-px flex-1 max-w-24 bg-gold/40" />
    </div>

    <div className="grid lg:grid-cols-[1fr_420px] gap-10 lg:gap-16 items-stretch mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
          {tr(language, "This Wasn't Built Overnight.", 'यह एक रात में नहीं बना।')}
        </h2>
        <p className="text-white/60 text-base md:text-lg mb-8 leading-relaxed">
          {tr(
            language,
            'It was built over 14 years. From a classroom in Sainik School to a Guinness World Record, before SosrG ever existed as a platform.',
            'यह 14 सालों में बना है। सैनिक स्कूल की एक क्लासरूम से लेकर गिनीज़ वर्ल्ड रिकॉर्ड तक — SosrG के एक प्लेटफॉर्म के रूप में अस्तित्व में आने से पहले।'
          )}
        </p>
        <h3 className="text-2xl md:text-3xl font-bold text-gold mb-3">
          {tr(language, 'It Started With A Journey.', 'यह एक सफ़र से शुरू हुआ।')}
        </h3>
        <p className="text-white/60 text-base md:text-lg leading-relaxed">
          {tr(
            language,
            'Before SosrG became an ecosystem, it was a journey through the arts. What started with one creative journey is growing into a space for every kind of artist.',
            'SosrG एक इकोसिस्टम बनने से पहले, कला की दुनिया का एक सफ़र था। जो एक क्रिएटिव सफ़र से शुरू हुआ, वह अब हर तरह के कलाकार के लिए एक जगह बनता जा रहा है।'
          )}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="relative overflow-hidden aspect-[4/5] lg:aspect-auto lg:h-full min-h-[420px]"
      >
        <img src={founderPhoto} alt="Siddhartha, Founder & CEO of SosrG" className="h-full w-full object-cover" />
      </motion.div>
    </div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7 }}
      className="grid md:grid-cols-[1fr_auto] gap-8 md:gap-12 items-center mb-16"
    >
      <div className="flex items-start gap-4">
        <Quote size={28} className="text-gold shrink-0 mt-1" />
        <div>
          <p className="text-xl md:text-2xl font-bold text-gold mb-2 leading-snug">
            {tr(language, 'What if art could spark change?', 'क्या हो अगर कला बदलाव ला सके?')}
          </p>
          <p className="text-white/60 text-base leading-relaxed max-w-md">
            {tr(
              language,
              'At SosrG, we believe it can. We empower artists, amplify stories, build communities and create opportunities that go beyond the stage.',
              'SosrG में, हम मानते हैं कि यह हो सकता है। हम कलाकारों को सशक्त बनाते हैं, कहानियों को बुलंद करते हैं, समुदाय बनाते हैं और मंच से परे अवसर तैयार करते हैं।'
            )}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-6">
        {STATS.map(({ icon: Icon, value, label }) => (
          <div key={label} className="flex items-center gap-2.5">
            <Icon size={22} className="text-gold shrink-0" />
            <div>
              <div className="font-extrabold text-2xl leading-none"><Counter value={value} /></div>
              <div className="text-white/40 text-xs leading-snug mt-1 max-w-[8rem]">{label}</div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>

    {/* Inline, not boxed — image with its own rounding, stats/caption flow
        directly on the page background below it (no card border/bg). */}
    <div className="grid md:grid-cols-3 gap-8">
      {CARDS.map((c, i) => (
        <motion.div
          key={c.n}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
        >
          <div className="relative h-56 rounded-xl overflow-hidden">
            <img src={c.image} alt="" aria-hidden="true" className="h-full w-full object-cover object-top" />
            <div className="absolute inset-0 photo-scrim-b" />
            <div className="photo-text absolute bottom-4 left-4 right-4">
              <div className="text-gold text-sm font-bold mb-1">{c.n}</div>
              <div className="text-2xl font-bold mb-1">{c.label}</div>
              <div className="photo-text-muted text-base">{c.tagline}</div>
            </div>
          </div>
          <div className="pt-5">
            <div className="grid grid-cols-3 gap-2 mb-4 text-center">
              {c.stats.map((s) => (
                <div key={s.label}>
                  {s.value && <div className="text-gold font-bold text-base"><Counter value={s.value} /></div>}
                  <div className="text-white/40 text-xs leading-snug mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
            <p className="text-white/50 text-sm leading-relaxed">{c.caption}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
  );
};
