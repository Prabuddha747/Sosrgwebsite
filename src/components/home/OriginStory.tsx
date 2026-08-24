import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import onSetImage from '../../assets/community/on-set.png';
import backstageImage from '../../assets/community/backstage.png';
import portfolioImage from '../../assets/community/portfolio.png';
import rehearsalImage from '../../assets/community/rehearsal.png';
import workshopImage from '../../assets/community/workshop.png';
import SosrGMark from '../../assets/sosrg-mark.jpeg';
import { tr } from '../../lib/i18n';

// Reference board (section 3): a single horizontal row — five real photo
// milestones plus the SosrG mark as the sixth, final node — not a two-row
// photo grid. Real SosrG Studios photos (same set TALENT_CATEGORIES draws
// from), reused here rather than fetching new stock.
const MILESTONES_EN = [
  { label: 'Theatre', desc: 'A passion for performing and storytelling.', image: onSetImage },
  { label: 'Filmmaking', desc: 'Bringing stories to life on screen.', image: backstageImage },
  { label: 'Writing', desc: 'Crafting words that move hearts.', image: portfolioImage },
  { label: 'Direction', desc: 'Leading visions and creative teams.', image: rehearsalImage },
  { label: 'Community', desc: 'Building a circle of artists and dreamers.', image: workshopImage },
];

const MILESTONES_HI = [
  { label: 'रंगमंच', desc: 'अभिनय और कहानी कहने का जुनून।', image: onSetImage },
  { label: 'फिल्म निर्माण', desc: 'पर्दे पर कहानियों को जीवंत करना।', image: backstageImage },
  { label: 'लेखन', desc: 'दिल छू लेने वाले शब्द गढ़ना।', image: portfolioImage },
  { label: 'निर्देशन', desc: 'विज़न और क्रिएटिव टीमों का नेतृत्व।', image: rehearsalImage },
  { label: 'समुदाय', desc: 'कलाकारों और सपने देखने वालों का एक घेरा बनाना।', image: workshopImage },
];

// Line + dot share one top edge (this wrapper's own top), so they can't
// drift out of alignment with each other the way two separately-offset
// absolute elements could.
const TimelineNode = ({ label, desc }: { label: string; desc: string }) => (
  <>
    <div className="relative pt-3 mb-3">
      <div className="absolute top-0 left-0 right-0 border-t border-gold/30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gold ring-4 ring-cinematic-black" />
    </div>
    <div className="font-bold text-sm text-gold">{label}</div>
    <p className="text-xs text-white/50 mt-1 leading-snug">{desc}</p>
  </>
);

export const OriginStory = ({ language }: { language: string }) => {
  const MILESTONES = language === 'hi' ? MILESTONES_HI : MILESTONES_EN;
  return (
  <section className="py-16 sm:py-24 px-6 max-w-[1600px] mx-auto">
    <div className="grid lg:grid-cols-[minmax(0,420px)_1fr] gap-16 items-start">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
          {tr(language, 'It Started With A Journey.', 'यह एक सफ़र से शुरू हुआ।')}
        </h2>
        <p className="text-white/60 mb-4 leading-relaxed">
          {tr(language, 'Before SosrG became an ecosystem, it was a journey through the arts.', 'SosrG एक इकोसिस्टम बनने से पहले, कला की दुनिया का एक सफ़र था।')}
        </p>
        <p className="text-white/60 mb-8 leading-relaxed">
          {tr(language, 'What started with one creative journey is growing into a space for every kind of artist.', 'जो एक क्रिएटिव सफ़र से शुरू हुआ, वह अब हर तरह के कलाकार के लिए एक जगह बनता जा रहा है।')}
        </p>
        {/* <button className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest border-b border-gold text-gold pb-1 hover:gap-3 transition-all">
          Our Full Story <ArrowRight size={16} />
        </button> */}
      </motion.div>

      <div className="min-w-0">
        {/* <div className="text-xs font-bold uppercase tracking-widest text-gold mb-8">2012</div> */}
        <div className="overflow-x-auto no-scrollbar">
          <div className="flex items-start gap-6 min-w-[900px]">
            {MILESTONES.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex-1 min-w-0"
              >
                <div className="relative h-64 rounded-xl overflow-hidden">
                  <img src={m.image} alt="" aria-hidden="true" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 photo-scrim-b opacity-70" />
                </div>
                <TimelineNode label={m.label} desc={m.desc} />
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: MILESTONES.length * 0.08 }}
              className="flex-1 min-w-0"
            >
              <div className="relative h-64 rounded-xl overflow-hidden">
                <img src={SosrGMark} alt="SosrG" className="h-full w-full object-cover" />
              </div>
              <TimelineNode label="SosrG" desc={tr(language, 'A platform where every artist belongs.', 'एक ऐसा मंच जहाँ हर कलाकार का अपना स्थान है।')} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};
