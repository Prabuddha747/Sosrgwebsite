import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Marquee } from '../ui/marquee';
import { tr } from '../../lib/i18n';

// Real Google Business reviews for SosrG Studios, copied verbatim (typos and
// all — "Sasarg", "sosrg" lowercase, etc. — since editing someone else's
// quote would misrepresent it). No photo is invented for any reviewer —
// AvatarFallback shows their initial instead, same "don't fabricate a
// person's likeness" rule FeaturedProfessionals.tsx follows for talent
// cards. Google doesn't expose a per-review star count via the page this
// was copied from, so none is shown here rather than guessing one.
interface Testimonial {
  name: string;
  meta: string;
  text: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Dance with Jatin',
    meta: '1 review · 8 photos',
    text: 'My experience at SosrG Studio was very good. It provides a professional and comfortable environment for dancers and actors. The studio has great space and facilities, which help artists practice, learn, and improve their skills effectively.',
  },
  {
    name: 'Atul Singh',
    meta: 'Local Guide · 19 reviews',
    text: 'I recently visited SOSRG Studios to watch a play, and I really loved the space. It has a great creative vibe and is perfect for podcasts, theatre performances, and auditions.',
  },
  {
    name: 'Anil Kumar Saini',
    meta: '2 reviews · 4 photos',
    text: 'Good experience with all the features provided in the App for the Actors and models and other artist/creators. You must try once to get registered and get the multiple opportunity in the field of Indian Theatre, Cinema, Literary, Music, Dance, Art & Crafts.',
  },
  {
    name: 'Himanshu Bhiwani',
    meta: '2 reviews',
    text: 'Good experience with all the features provided in the app for dancer, singer and actress as well other artists and creaters.',
  },
  {
    name: 'Vijay Khanna',
    meta: '1 review',
    text: 'It was great working with Sasarg Studio, the team management there is very good, it is a good place for a dancer.',
  },
  {
    name: 'Tanishka Arts',
    meta: '2 reviews · 1 photo',
    text: 'Very nice experience with SosrG StudioS, good quality, good facilities and good place for a starting actors.',
  },
  {
    name: 'Arvind Singh',
    meta: '4 reviews',
    text: 'Just finished a project with them...the work went quite smooth...all the best sosrg.',
  },
  {
    name: 'Rohan Dance',
    meta: '1 review',
    text: "I'm very excited to share my experience as a professional dance partner with SosrG Academy. Will suggest you to visit once.",
  },
  {
    name: 'Yogander Singh',
    meta: '4 reviews',
    text: 'I am impressed with the enthusiasm and the dedication of this young team. I am sure that in the times to come they will turn Rohtak into a vibrant cultural hub.',
  },
  {
    name: 'Salik',
    meta: '3 reviews',
    text: 'Best one stop solution production house we have been too. Recommended!',
  },
  {
    name: 'Prakriti Bidlan',
    meta: 'Local Guide · 3 reviews',
    text: "This is the production house you don't want to miss, and will fall in love more towards the cinema.",
  },
  {
    name: 'A R Photographers',
    meta: 'Local Guide · 17 reviews · 7 photos',
    text: 'Superb talented Director and excellent team for all cinematic projects.',
  },
  {
    name: 'Nisha Dalal',
    meta: '1 review',
    text: 'Good Services with all the features provided by SosrG.',
  },
  {
    name: 'Santosh Learning Centre',
    meta: '3 reviews · 3 photos',
    text: 'Good place with good management and artistic environment.',
  },
  {
    name: 'Shubham Singla',
    meta: 'Local Guide · 66 reviews · 47 photos',
    text: "It's well-built. Rohtak is the only place where all these things are available. The studio is good.",
  },
];

const FIRST_ROW = TESTIMONIALS.slice(0, 8);
const SECOND_ROW = TESTIMONIALS.slice(7);

const TestimonialCard = ({ name, meta, text }: Testimonial) => (
  <div className="w-72 sm:w-80 shrink-0 rounded-2xl border border-white/10 bg-cinematic-gray p-5 shadow-[8px_8px_20px_rgba(8,5,2,0.4)]">
    <Quote size={18} className="text-gold/60 mb-3" />
    <p className="text-sm text-white/70 leading-relaxed line-clamp-5">{text}</p>
    <div className="flex items-center gap-3 mt-5 pt-4 border-t border-white/10">
      <Avatar className="size-9">
        <AvatarFallback className="bg-gold/15 text-gold font-bold text-sm">{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="min-w-0">
        <p className="font-medium text-sm leading-tight truncate">{name}</p>
        <p className="text-white/40 text-xs truncate">{meta}</p>
      </div>
    </div>
  </div>
);

// Note: the review quotes themselves stay English-only regardless of
// `language` — they're real Google Business reviews copied verbatim (see
// comment above), and machine-translating someone's actual words would
// misrepresent what they wrote. Only this section's own heading/subtext
// is translated.
export const Testimonials = ({ language }: { language: string }) => (
  <section className="py-10 sm:py-24 px-6 max-w-[1600px] mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7 }}
      className="text-center mb-12"
    >
      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        {tr(language, 'Nice things ', 'लोग हमारे बारे में ')}<span className="gold-text">{tr(language, 'people say', 'अच्छी बातें कहते हैं')}</span>
      </h2>
      <p className="text-white/50 text-sm mt-3 max-w-xl mx-auto">
        {tr(language, "Real reviews from SosrG Studios' Google Business page.", 'SosrG Studios के Google Business पेज से असली रिव्यू।')}
      </p>
    </motion.div>

    <div className="relative -mx-6 px-6 space-y-4 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
      <Marquee pauseOnHover className="[--duration:50s]">
        {FIRST_ROW.map((t) => (
          <TestimonialCard key={t.name} {...t} />
        ))}
      </Marquee>
      <Marquee pauseOnHover reverse className="[--duration:55s]">
        {SECOND_ROW.map((t) => (
          <TestimonialCard key={t.name} {...t} />
        ))}
      </Marquee>
    </div>
  </section>
);
