import { Marquee } from '../ui/marquee';

// Real collaborations, supplied directly by the SosrG team — no fabricated
// or placeholder names. Split into two rows for the marquee; order within
// each row doesn't matter since it just scrolls.
const COLLABORATIONS = [
  { name: 'Vande Krsna Foundation', type: 'Educational Course', industry: 'Literature' },
  { name: 'Redesign Your Destiny', type: 'Book', industry: 'Literature' },
  { name: 'Saptak Cultural Society, Rohtak', type: 'NGO', industry: 'Theatre' },
  { name: 'Haryana Institute of Performing Arts, Rohtak', type: 'NGO', industry: 'Theatre' },
  { name: 'Abhinav Toli', type: 'NGO', industry: 'Literature / Theatre / Music / Dance / Art / Craft' },
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

const MID = Math.ceil(COLLABORATIONS.length / 2);
const ROW_1 = COLLABORATIONS.slice(0, MID);
const ROW_2 = COLLABORATIONS.slice(MID);

const CollabCard = ({ name, type, industry }: { name: string; type: string; industry: string }) => (
  <div className="w-64 sm:w-72 shrink-0 rounded-2xl border border-white/10 bg-cinematic-gray px-5 py-4">
    <p className="font-bold text-white/90 leading-snug">{name}</p>
    <p className="text-white/40 text-xs mt-1">{type}</p>
    <p className="text-gold/70 text-[11px] mt-2 uppercase tracking-wider">{industry}</p>
  </div>
);

export const BrandDeals = () => (
  <section className="py-16 sm:py-24 px-6 max-w-[1600px] mx-auto border-t border-white/10">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        Backed by <span className="gold-text">brands who believe in creators</span>
      </h2>
      <p className="text-white/50 text-sm mt-3 max-w-xl mx-auto">
        Organizations, studios, and brands SosrG has collaborated with.
      </p>
    </div>

    <div className="space-y-4">
      <Marquee pauseOnHover>
        {ROW_1.map((c) => (
          <CollabCard key={c.name} {...c} />
        ))}
      </Marquee>
      <Marquee pauseOnHover reverse>
        {ROW_2.map((c) => (
          <CollabCard key={c.name} {...c} />
        ))}
      </Marquee>
    </div>
  </section>
);
