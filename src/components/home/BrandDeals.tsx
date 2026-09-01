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
import { tr } from '../../lib/i18n';

// Real collaborations, supplied directly by the SosrG team — no fabricated
// or placeholder names/logos. Only entries with a `logo` file on hand
// render; the rest stay here unrendered until a logo is provided.
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

export const BrandDeals = ({ language }: { language: string }) => (
  <section className="py-10 sm:py-24 px-6 max-w-[1600px] mx-auto border-t border-white/10">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7 }}
      className="text-center mb-14"
    >
      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        {tr(language, 'Backed by ', 'ऐसे ब्रांड्स का समर्थन जो ')}<span className="gold-text">{tr(language, 'brands who believe in creators', 'क्रिएटर्स में भरोसा रखते हैं')}</span>
      </h2>
      <p className="text-white/50 text-sm mt-3 max-w-xl mx-auto">
        {tr(language, 'Organizations, studios, and brands SosrG has collaborated with.', 'संगठन, स्टूडियो और ब्रांड्स जिनके साथ SosrG ने सहयोग किया है।')}
      </p>
    </motion.div>

    {/* Logo wall — only entries with a real, provided logo file. Sits on a
        light chip since most of these marks are drawn for a white
        background and would vanish against the dark theme otherwise. */}
    <div className="flex flex-wrap items-center justify-center gap-3">
      {WITH_LOGO.map((c, i) => (
        <motion.div
          key={c.name}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4, delay: i * 0.04 }}
          className="h-14 sm:h-16 rounded-lg bg-[#ffffff] px-3 flex items-center"
        >
          <img src={c.logo} alt={c.name} className="h-full max-h-9 sm:max-h-10 w-auto max-w-[9rem] object-contain" />
        </motion.div>
      ))}
    </div>
  </section>
);
