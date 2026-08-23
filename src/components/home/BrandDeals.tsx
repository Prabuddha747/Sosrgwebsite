import { motion } from 'motion/react';
import hkiMedia from '../../assets/brands/hki-media.png';
import zeeMusic from '../../assets/brands/zee-music.png';
import tanishkaDanceAcademy from '../../assets/brands/tanishka-dance-academy.png';
import pantene from '../../assets/brands/pantene.png';
import johnJacobs from '../../assets/brands/john-jacobs.png';
import lenskart from '../../assets/brands/lenskart.png';
import real from '../../assets/brands/real.png';
import dabur from '../../assets/brands/dabur.png';
import kelvinOakmont from '../../assets/brands/kelvin-oakmont.png';
import neolife from '../../assets/brands/neolife.png';
import krutik from '../../assets/brands/krutik.png';
import svrnWellness from '../../assets/brands/svrn-wellness.png';
import fixsy from '../../assets/brands/fixsy.png';

// Real collaborations, supplied directly by the SosrG team — no fabricated
// or placeholder names/logos. Entries with a `logo` render in the logo
// wall; everything else (no logo file on hand yet) falls into the plain
// credits list below it, grouped by industry.
const COLLABORATIONS = [
  { name: 'Vande Krsna Foundation', type: 'Educational Course', industry: 'Literature' },
  { name: 'Redesign Your Destiny', type: 'Book', industry: 'Literature' },
  { name: 'Abhinav Toli', type: 'NGO', industry: 'Literature / Theatre / Music / Dance / Art / Craft' },
  { name: 'Saptak Cultural Society, Rohtak', type: 'NGO', industry: 'Theatre' },
  { name: 'Haryana Institute of Performing Arts, Rohtak', type: 'NGO', industry: 'Theatre' },
  { name: 'Stage', type: 'OTT Platform', industry: 'Cinema' },
  { name: 'Chaupal', type: 'OTT Platform', industry: 'Cinema' },
  { name: 'Infinity Creators', type: 'Film Production House', industry: 'Cinema' },
  { name: 'Anna Film Factory', type: 'Film Production House', industry: 'Cinema' },
  { name: 'Geetu Pari Films', type: 'Film Production House', industry: 'Cinema' },
  { name: 'RD Films', type: 'Film Production House', industry: 'Cinema' },
  { name: 'PWOI Films', type: 'Film Production House', industry: 'Cinema' },
  { name: 'Chirag Bhasin Productions', type: 'Film Production House', industry: 'Cinema' },
  { name: 'Akshunya Motion Picture', type: 'Film Production House', industry: 'Cinema' },
  { name: 'Chanajor', type: 'Film Production House', industry: 'Cinema' },
  { name: 'KK Music & Films Production', type: 'Film Production House', industry: 'Cinema' },
  { name: 'HKI Media', type: 'Film Production House', industry: 'Cinema', logo: hkiMedia },
  { name: 'Parikrama Pictures Production', type: 'Film Production House', industry: 'Cinema' },
  { name: 'Zee Music', type: 'Music Channel', industry: 'Music', logo: zeeMusic },
  { name: 'Tanishka Dance Academy', type: 'Performing Studio', industry: 'Dance', logo: tanishkaDanceAcademy },
  { name: 'Pantene', type: 'Beauty & Haircare Brand', industry: 'Art / Design', logo: pantene },
  { name: 'John & Jacob', type: 'Fashion / Lifestyle Brand', industry: 'Art / Design', logo: johnJacobs },
  { name: 'Lenskart', type: 'Eyewear / Fashion-Tech Brand', industry: 'Art / Design', logo: lenskart },
  { name: 'Real Juice', type: 'FMCG / Beverage Brand', industry: 'Art / Design', logo: real },
  { name: 'Dabur', type: 'FMCG / Consumer Wellness Brand', industry: 'Art / Design', logo: dabur },
  { name: 'Kelvin Oakmont Services', type: 'Event Brand', industry: 'Art / Design', logo: kelvinOakmont },
  { name: 'NeoLife', type: 'Medicated Product Company', industry: 'Art / Design', logo: neolife },
  { name: 'Krutik', type: 'Painting Company', industry: 'Art / Design', logo: krutik },
  { name: 'SVRN Wellness', type: 'Wellness / Lifestyle Brand', industry: 'Art / Design', logo: svrnWellness },
  { name: 'Fixsy India', type: 'Consumer / Service Brand', industry: 'Art / Design', logo: fixsy },
];

const WITH_LOGO = COLLABORATIONS.filter((c) => c.logo);
const WITHOUT_LOGO = COLLABORATIONS.filter((c) => !c.logo);

// Preserves the order above (roughly grouped already) while collapsing into
// { industry -> entries[] } — an entry whose industry spans several tags
// (e.g. "Literature / Theatre / ...") is filed under its first tag only, so
// nothing appears twice.
const GROUPS = WITHOUT_LOGO.reduce<{ industry: string; entries: typeof WITHOUT_LOGO }[]>((groups, item) => {
  const key = item.industry.split('/')[0].trim();
  const group = groups.find((g) => g.industry === key);
  if (group) group.entries.push(item);
  else groups.push({ industry: key, entries: [item] });
  return groups;
}, []);

export const BrandDeals = () => (
  <section className="py-16 sm:py-24 px-6 max-w-[1600px] mx-auto border-t border-white/10">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7 }}
      className="text-center mb-14"
    >
      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        Backed by <span className="gold-text">brands who believe in creators</span>
      </h2>
      <p className="text-white/50 text-sm mt-3 max-w-xl mx-auto">
        Organizations, studios, and brands SosrG has collaborated with.
      </p>
    </motion.div>

    {/* Logo wall — only entries with a real, provided logo file. Sits on a
        light chip since most of these marks are drawn for a white
        background and would vanish against the dark theme otherwise. */}
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-16">
      {WITH_LOGO.map((c, i) => (
        <motion.div
          key={c.name}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4, delay: i * 0.04 }}
          className="h-24 sm:h-28 rounded-xl bg-white p-4 flex items-center justify-center"
        >
          <img src={c.logo} alt={c.name} className="max-h-full max-w-full object-contain" />
        </motion.div>
      ))}
    </div>

    <div className="max-w-4xl mx-auto space-y-12">
      {GROUPS.map((group) => (
        <div key={group.industry}>
          <span className="block text-gold text-xs font-bold uppercase tracking-[0.3em] mb-5">
            {group.industry}
          </span>
          <div className="grid sm:grid-cols-2 gap-x-10">
            {group.entries.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
                className="group flex items-baseline justify-between gap-4 py-3 border-b border-white/10 hover:border-gold/40 transition-colors"
              >
                <span className="font-auth-display text-lg text-white/85 group-hover:text-gold transition-colors">
                  {c.name}
                </span>
                <span className="shrink-0 text-white/30 text-xs italic">{c.type}</span>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);
