import { motion } from 'motion/react';

// Real collaborations, supplied directly by the SosrG team — no fabricated
// or placeholder names. Grouped by industry so it reads like an actual
// partner roster rather than a marketing logo strip.
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
  { name: 'HKI Media', type: 'Film Production House', industry: 'Cinema' },
  { name: 'Parikrama Pictures Production', type: 'Film Production House', industry: 'Cinema' },
  { name: 'Zee Music', type: 'Music Channel', industry: 'Music' },
  { name: 'Tanishka Dance Academy', type: 'Performing Studio', industry: 'Dance' },
  { name: 'Pantene', type: 'Beauty & Haircare Brand', industry: 'Art / Design' },
  { name: 'John & Jacob', type: 'Fashion / Lifestyle Brand', industry: 'Art / Design' },
  { name: 'Lenskart', type: 'Eyewear / Fashion-Tech Brand', industry: 'Art / Design' },
  { name: 'Real Juice', type: 'FMCG / Beverage Brand', industry: 'Art / Design' },
  { name: 'Dabur', type: 'FMCG / Consumer Wellness Brand', industry: 'Art / Design' },
  { name: 'Kelvin Oakmont Services', type: 'Event Brand', industry: 'Art / Design' },
  { name: 'NeoLife', type: 'Medicated Product Company', industry: 'Art / Design' },
  { name: 'Krutik', type: 'Painting Company', industry: 'Art / Design' },
  { name: 'SVRN Wellness', type: 'Wellness / Lifestyle Brand', industry: 'Art / Design' },
  { name: 'Fixsy India', type: 'Consumer / Service Brand', industry: 'Art / Design' },
];

// Preserves the order above (roughly grouped already) while collapsing into
// { industry -> entries[] } — an entry whose industry spans several tags
// (e.g. "Literature / Theatre / ...") is filed under its first tag only, so
// nothing appears twice.
const GROUPS = COLLABORATIONS.reduce<{ industry: string; entries: typeof COLLABORATIONS }[]>((groups, item) => {
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
