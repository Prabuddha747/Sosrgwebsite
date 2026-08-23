import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import logo from '../../assets/logo.png';
import creatorImage from '../../assets/creator.png';
import businessImage from '../../assets/business.png';

const SIDES = [
  {
    key: 'artist',
    heading: "I'M A CREATOR",
    tagline: 'I want to create, learn, connect and grow.',
    bullets: ['Showcase your talent', 'Find opportunities', 'Connect with people', 'Grow your journey'],
    cta: 'Explore as a Creator',
    image: creatorImage,
  },
  {
    key: 'studio',
    heading: "I'M A BUSINESS",
    tagline: 'I want to discover talent, build teams and bring creative projects to life.',
    bullets: ['Discover verified talent', 'Post casting calls', 'Manage projects', 'Build your team'],
    cta: 'Explore as a Business ',
    image: businessImage,
  },
];

export const TwoSidesEcosystem = () => (
  <section className="relative py-16 sm:py-24 px-6 max-w-400 mx-auto">
    <div className="text-center mb-16">
      <p className="text-xs font-bold uppercase tracking-widest text-gold mb-3">Two Sides of the Ecosystem</p>
    </div>

    <div className="relative grid md:grid-cols-2 gap-1 rounded-2xl overflow-hidden">
      <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-20 h-20 rounded-full bg-[#140F0A] border border-gold/40 items-center justify-center overflow-hidden">
        <img src={logo} alt="SosrG" className="w-12 h-12 object-contain" />
      </div>

      {SIDES.map((side, i) => (
        <motion.div
          key={side.key}
          initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="relative min-h-120 flex items-end"
        >
          <img src={side.image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
          {/* Stronger, self-contained scrim (not the shared .photo-scrim-b)
              — these two photos have large bright regions (windows, a light
              dashboard mockup) sitting right behind the text block, which
              the standard scrim wasn't dark enough to guarantee contrast
              against in either theme. */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/20" />
          <div className="relative p-8 md:p-10">
            <h3 className="photo-accent text-2xl font-bold mb-3">{side.heading}</h3>
            <p className="photo-text-muted mb-6 max-w-sm">{side.tagline}</p>
            <ul className="space-y-2 mb-8">
              {side.bullets.map((b) => (
                <li key={b} className="photo-text-muted flex items-center gap-2 text-sm">
                  <Check size={14} className="photo-accent shrink-0" /> {b}
                </li>
              ))}
            </ul>
            <Link
              to={`/signup?intent=${side.key}`}
              className="inline-block bg-gold text-black px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform"
            >
              {side.cta}
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);
