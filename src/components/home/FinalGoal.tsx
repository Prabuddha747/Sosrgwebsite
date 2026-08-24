import { motion } from 'motion/react';
import { Search, Award, Handshake, GraduationCap } from 'lucide-react';
import opportunitiesImage from '../../assets/community/opportunities.png';
import portfolioImage from '../../assets/community/portfolio.png';
import collaborateImage from '../../assets/community/collaborate.png';
import communityImage from '../../assets/community/community.png';
import { tr } from '../../lib/i18n';

// New section built from pasted copy (not on the reference boards) at
// explicit request, styled after the boards' "Artist Journey" treatment
// (photo cards + connecting line + icon badges) — that visual language was
// freed up once Artist Journey's own content moved to Collaboration &
// Network Layer, so it's reused here rather than invented from scratch.
// Real SosrG Studios photos (same community/ set used elsewhere), not
// generic stock — one per card, matching the card's own subject.
const GOALS_EN = [
  {
    n: '01',
    label: 'Opportunities',
    desc: 'Find casting calls, auditions, and freelance gigs tailored to your unique profile and skills.',
    icon: Search,
    image: opportunitiesImage,
  },
  {
    n: '02',
    label: 'Portfolio',
    desc: 'Showcase your portfolio, earn verified Green IDs, and level up from fresher to expert.',
    icon: Award,
    image: portfolioImage,
  },
  {
    n: '03',
    label: 'Collaborate',
    desc: 'Connect with directors, producers, and fellow artists to bring creative visions to life.',
    icon: Handshake,
    image: collaborateImage,
  },
  {
    n: '04',
    label: 'Community',
    desc: 'Learn through the Academy, attend industry events, and thrive in a supportive community.',
    icon: GraduationCap,
    image: communityImage,
  },
];

const GOALS_HI = [
  { n: '01', label: 'अवसर', desc: 'आपकी प्रोफाइल और स्किल्स के हिसाब से कास्टिंग कॉल्स, ऑडिशन और फ्रीलांस काम खोजें।', icon: Search, image: opportunitiesImage },
  { n: '02', label: 'पोर्टफोलियो', desc: 'अपना पोर्टफोलियो दिखाएं, वेरिफाइड ग्रीन आईडी कमाएं, और फ्रेशर से एक्सपर्ट तक आगे बढ़ें।', icon: Award, image: portfolioImage },
  { n: '03', label: 'सहयोग', desc: 'निर्देशकों, प्रोड्यूसर्स और साथी कलाकारों से जुड़ें और क्रिएटिव विज़न को जीवंत करें।', icon: Handshake, image: collaborateImage },
  { n: '04', label: 'समुदाय', desc: 'अकादमी के ज़रिए सीखें, इंडस्ट्री इवेंट्स में शामिल हों, और एक सहयोगी समुदाय में आगे बढ़ें।', icon: GraduationCap, image: communityImage },
];

export const FinalGoal = ({ language }: { language: string }) => {
  const GOALS = language === 'hi' ? GOALS_HI : GOALS_EN;
  return (
  <section className="py-16 sm:py-24 px-6 max-w-[1600px] mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7 }}
      className="text-center mb-20"
    >
      <p className="text-xs font-bold uppercase tracking-widest text-gold mb-3">{tr(language, 'The Final Goal', 'अंतिम लक्ष्य')}</p>
      <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">{tr(language, 'A Complete Digital Ecosystem', 'एक संपूर्ण डिजिटल इकोसिस्टम')}</h2>
      <p className="text-white/50 max-w-2xl mx-auto leading-relaxed">
        {tr(
          language,
          'Empowering the Indian entertainment industry by helping actors, models, and creative professionals discover opportunities, build careers, collaborate on projects, and grow within the arts community.',
          'अभिनेताओं, मॉडल्स और क्रिएटिव प्रोफेशनल्स को अवसर खोजने, करियर बनाने, प्रोजेक्ट्स पर सहयोग करने, और कला समुदाय में आगे बढ़ने में मदद करके भारतीय मनोरंजन उद्योग को सशक्त बनाना।'
        )}
      </p>
    </motion.div>

    <div className="relative">
      <div className="hidden lg:block absolute left-0 right-0 bottom-0 h-px bg-gold/30" aria-hidden="true" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {GOALS.map((g, i) => (
          <motion.div
            key={g.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative"
          >
            <div className="group relative h-80 rounded-2xl overflow-hidden glass-panel">
              <img
                src={g.image}
                alt=""
                aria-hidden="true"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 photo-scrim-b" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="photo-accent text-xs font-bold tracking-widest mb-1">{g.n}</div>
                <div className="photo-text text-lg font-bold mb-2">{g.label}</div>
                <p className="photo-text-muted text-sm leading-relaxed">{g.desc}</p>
              </div>
            </div>
            <div className="hidden lg:flex absolute -bottom-7 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-cinematic-black border border-gold/40 items-center justify-center z-10">
              <g.icon size={20} className="text-gold" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
  );
};
