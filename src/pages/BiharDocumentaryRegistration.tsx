import { useState } from 'react';
import { Megaphone, Film, Landmark, ScrollText, CheckCircle2, Send } from 'lucide-react';
import { cn } from '../lib/utils';
import { useToast } from '../design-system';

// Real district list (Bihar's 38 districts) — not invented.
const BIHAR_DISTRICTS = [
  'Araria', 'Arwal', 'Aurangabad', 'Banka', 'Begusarai', 'Bhagalpur', 'Bhojpur', 'Buxar',
  'Darbhanga', 'East Champaran (Motihari)', 'Gaya', 'Gopalganj', 'Jamui', 'Jehanabad',
  'Kaimur (Bhabua)', 'Katihar', 'Khagaria', 'Kishanganj', 'Lakhisarai', 'Madhepura',
  'Madhubani', 'Munger', 'Muzaffarpur', 'Nalanda', 'Nawada', 'Patna', 'Purnia', 'Rohtas',
  'Saharsa', 'Samastipur', 'Saran', 'Sheikhpura', 'Sheohar', 'Sitamarhi', 'Siwan',
  'Supaul', 'Vaishali', 'West Champaran (Bettiah)',
];

// Art forms as given for this campaign — kept verbatim rather than
// paraphrased, since these are specific named traditions/crafts.
const ART_FORMS = [
  { name: 'Madhubani Painting', desc: 'World famous painting of Mithila region.' },
  { name: 'Sikki Art', desc: 'Artifacts made from dry grass (Sikki).' },
  { name: 'Tikuli Art', desc: 'Colorful painting on glass.' },
  { name: 'Patachitra/Patwa Art', desc: 'Traditional painting on cloth.' },
  { name: 'Papier-mâché Handicraft', desc: 'Handicrafts made from paper.' },
  { name: 'Bamboo Art & Products', desc: 'Household and decorative items made of bamboo.' },
  { name: 'Stone & Wood Sculpture', desc: 'Especially famous in Gaya and Patna regions.' },
  { name: 'Terracotta & Pottery Art', desc: 'Traditional sculptures and pots made of clay.' },
  { name: 'Glass Painting & Embroidery', desc: 'Traditional glass painting.' },
  { name: 'Fabric Art & Designing', desc: 'Traditional artworks done on clothes.' },
  { name: 'Metal Art', desc: 'Bronze, brass, copper sculptures and utensils.' },
  { name: 'Bhojpuri Sohrai Painting', desc: 'Traditional painting made on walls.' },
  { name: 'Wooden Toy Making', desc: 'Traditional handicraft art.' },
  { name: 'Conch Shell Art', desc: 'Carving art on conch shells.' },
  { name: 'Leaf Painting', desc: 'Artworks made on banana and palm leaves.' },
  { name: 'Folk Dance', desc: 'Jhijhiya, Jat-Jatin, Chhau, Sama-Chakeva, Bhikhari Thakur Dance.' },
  { name: 'Classical Dance', desc: 'Kathak, Bharatanatyam, Odissi.' },
  { name: 'Folk Singing', desc: 'Traditional songs of Bhojpuri, Maithili, Magahi, Angika, Bajjika.' },
  { name: 'Classical Singing', desc: 'Hindustani Classical Music, Dhrupad, Thumri.' },
  { name: 'Art of Playing Musical Instruments', desc: 'Sarangi, Flute, Tabla, Dholak.' },
  { name: 'Theatre & Drama', desc: 'Playwriting, Acting, Direction.' },
  { name: 'Story & Screenplay Writing', desc: '' },
  { name: 'Nautanki & Bahurupiya Art', desc: 'Traditional folk drama.' },
  { name: 'Pandavani Singing', desc: 'Singing of songs related to Mahabharata.' },
  { name: 'Chaupat Dance', desc: 'Traditional dance style of Bihar.' },
  { name: 'Launda Naach', desc: 'Traditional folk dance performed by men.' },
  { name: 'Bhagait Singing', desc: 'Special style of religious and traditional songs.' },
  { name: 'Photography', desc: '' },
  { name: 'Film Making', desc: '' },
  { name: 'Documentary Film Making', desc: '' },
  { name: 'Video Editing & Post Production', desc: '' },
  { name: 'VFX & Motion Graphics', desc: '' },
  { name: 'Animation & Graphic Designing', desc: '' },
  { name: 'Music Video Production', desc: '' },
  { name: 'Folk Tales & Story Writing', desc: '' },
  { name: 'Folk Songs & Bhajan Writing', desc: '' },
  { name: 'Drama & Script Writing', desc: '' },
  { name: 'Ghazal & Shayari Writing', desc: '' },
  { name: 'Handwritten Manuscript Art', desc: '' },
  { name: 'Vidyapati Poetry Tradition', desc: '' },
  { name: 'Bundel Art', desc: 'Carving done on wood and stone.' },
  { name: 'Sujni Embroidery & Zari Work', desc: 'Traditional embroidery style of Bihar.' },
  { name: 'Tussar Silk & Bhagalpuri Silk', desc: 'Famous textile industries of Bihar.' },
  { name: 'Iron & Brass Art', desc: 'Traditional products made of iron and brass.' },
  { name: 'Clay Pottery', desc: 'Art of clay pots and sculptures.' },
];

const ENGAGEMENT_WAYS = [
  'For online sales (E-commerce, Website, Digital Marketing)',
  'To conduct live workshops and training (Offline/Online)',
  'To participate in art exhibitions, workshops, cultural events and fairs',
  'To perform in art tourism and cultural events',
  'For assistance in branding and digital marketing',
];

const ASSISTANCE_NEEDS = [
  'A beautiful Documentary on your art or institution/business',
  'Financial Support for your art or art business setup',
  'Marketing & Promotion',
  'Art Workshop/Training & Upskilling',
  'Access to the right market and buyers for art',
  'Legal & Licensing Support like Copyright/trademark',
];

const YEARS_OPTIONS = ['1 to 2 years', '3 to 5 years', '6 to 10 years', 'More than 10 years'];

type YesNo = 'yes' | 'no';
type YesNoMaybe = 'yes' | 'no' | 'maybe';

interface FormState {
  email: string;
  fullName: string;
  dob: string;
  gender: string;
  mobile: string;
  aadhaar: string;
  guardianName: string;
  guardianContact: string;
  district: string;
  artForms: string[];
  otherArtForm: string;
  yearsInvolved: string;
  formalTraining: YesNo | '';
  earnsLivelihood: YesNo | '';
  hasCertification: YesNo | '';
  hasAwards: YesNo | '';
  portfolioStatus: 'sent' | 'not_yet' | '';
  engagementWays: string[];
  assistanceNeeds: string[];
  interestedInSelling: YesNoMaybe | '';
  promotionSuggestion: string;
  otherComments: string;
  wantsToJoinCampaign: YesNoMaybe | '';
}

const INITIAL_FORM: FormState = {
  email: '', fullName: '', dob: '', gender: '', mobile: '', aadhaar: '', guardianName: '', guardianContact: '',
  district: '', artForms: [], otherArtForm: '', yearsInvolved: '', formalTraining: '', earnsLivelihood: '',
  hasCertification: '', hasAwards: '', portfolioStatus: '', engagementWays: [], assistanceNeeds: [],
  interestedInSelling: '', promotionSuggestion: '', otherComments: '', wantsToJoinCampaign: '',
};

const REQUIRED_FIELDS: (keyof FormState)[] = [
  'email', 'fullName', 'dob', 'gender', 'mobile', 'aadhaar', 'guardianName', 'guardianContact', 'district',
  'yearsInvolved', 'formalTraining', 'earnsLivelihood', 'hasCertification', 'hasAwards',
  'interestedInSelling', 'promotionSuggestion', 'otherComments', 'wantsToJoinCampaign',
];

const inputClass = "w-full bg-black/30 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-gold transition-colors";
const labelClass = "text-xs font-bold uppercase tracking-widest text-white/60 block mb-2";
const YesNoButtons = ({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: readonly string[] }) => (
  <div className="flex gap-2">
    {options.map((opt) => (
      <button
        key={opt}
        type="button"
        onClick={() => onChange(opt.toLowerCase())}
        className={cn(
          "px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-widest border transition-colors",
          value === opt.toLowerCase() ? "bg-gold text-black border-gold" : "bg-white/5 text-white/60 border-white/10 hover:border-white/30"
        )}
      >
        {opt}
      </button>
    ))}
  </div>
);

const SectionHeading = ({ icon: Icon, title }: { icon: typeof Megaphone; title: string }) => (
  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 pt-4">
    <Icon className="text-gold" size={22} /> {title}
  </h2>
);

export const BiharDocumentaryRegistration = ({ standalone = true }: { standalone?: boolean }) => {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const { show } = useToast();

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((f) => ({ ...f, [key]: value }));

  const toggleInArray = (key: 'artForms' | 'engagementWays' | 'assistanceNeeds', value: string) => {
    setForm((f) => {
      const current = f[key];
      return { ...f, [key]: current.includes(value) ? current.filter((v) => v !== value) : [...current, value] };
    });
  };

  // No live endpoint for this campaign yet — the whole form is locked to a
  // read-only preview rather than letting people fill it in and then find
  // out on submit that nothing happened with their data.
  const handleSubmit = () => {
    show("Registration isn't open yet — this campaign hasn't launched. We'll announce when applications open.", 'info');
  };

  return (
    <div className={standalone ? "pt-32 px-6 max-w-4xl mx-auto min-h-screen pb-24" : "max-w-4xl mx-auto"}>
      <div className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-xs font-bold uppercase tracking-widest text-gold">
        <CheckCircle2 size={14} /> Registration isn't open yet — preview only, fields are locked
      </div>

      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-serif italic mb-4">
          Bihar <span className="gold-text">Untold</span>
        </h1>
        <p className="text-gold font-bold text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
          <Megaphone size={16} /> Invitation for Documentary to Bihar Creators
        </p>
        <p className="text-white/70 leading-relaxed mb-6">
          If you are a Creator, Artist, Artisan associated with Bihar's Theatre, Cinema, Literary, Music, Dance, Art,
          & Craft Industry, or if you run a Group, Institute, Training Centre, Academy, NGO, or any Startup/Business,
          and you feel that your unique contribution or art business deserves to reach international film festivals
          through a 15–30 or 45–60 minute documentary, then join our filmmaking team!
        </p>

        <div className="glass-panel p-6 mb-6">
          <h3 className="font-bold mb-4 flex items-center gap-2"><Film size={18} className="text-gold" /> What we will do</h3>
          <ul className="space-y-2 text-sm text-white/70">
            <li>Conduct deep R&D on your art or institution with your help</li>
            <li>Handle the journey from scripting to the screen</li>
            <li>Provide information and guidance on state and central government assistance and facilities</li>
            <li>Make every possible effort to promote your work nationally and internationally</li>
          </ul>
        </div>

        <p className="text-xs text-white/40 italic">To participate: please read the Terms & Conditions before filling out the form.</p>
      </div>

      {/* Every field below is inert (pointer-events-none) — this is what the
          form will look like once registration opens, not something you can
          fill in today. */}
      <div className="space-y-10 pointer-events-none select-none opacity-60" aria-disabled="true" inert>
        {/* Personal Particulars */}
        <section>
          <SectionHeading icon={Landmark} title="Personal Particulars" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Email *</label>
              <input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="Email" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Full Name *</label>
              <input type="text" value={form.fullName} onChange={(e) => set('fullName', e.target.value)} placeholder="Identity" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Date of Birth *</label>
              <input type="date" value={form.dob} onChange={(e) => set('dob', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Gender *</label>
              <select value={form.gender} onChange={(e) => set('gender', e.target.value)} className={inputClass}>
                <option value="">Select Gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
                <option value="prefer_not_to_say">Prefer not to say</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Mobile Number *</label>
              <div className="flex gap-2">
                <span className="bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm text-white/60">+91</span>
                <input type="tel" value={form.mobile} onChange={(e) => set('mobile', e.target.value)} placeholder="Mobile Number" className={inputClass} />
              </div>
            </div>
            <div>
              <label className={labelClass}>Aadhaar Number *</label>
              <input type="text" value={form.aadhaar} onChange={(e) => set('aadhaar', e.target.value)} placeholder="Verification ID" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Father/Mother's Name *</label>
              <input type="text" value={form.guardianName} onChange={(e) => set('guardianName', e.target.value)} placeholder="Guardian" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Parents Contact Number *</label>
              <input type="tel" value={form.guardianContact} onChange={(e) => set('guardianContact', e.target.value)} placeholder="Contact" className={inputClass} />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>District Name *</label>
              <select value={form.district} onChange={(e) => set('district', e.target.value)} className={inputClass}>
                <option value="">-- Select District --</option>
                {BIHAR_DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>
        </section>

        {/* Art Form */}
        <section>
          <SectionHeading icon={ScrollText} title="Which art form are you skilled in?" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-2 mb-4 glass-panel p-4">
            {ART_FORMS.map((art) => (
              <label key={art.name} className="flex items-start gap-3 p-3 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 transition-colors">
                <input
                  type="checkbox"
                  className="accent-gold mt-0.5"
                  checked={form.artForms.includes(art.name)}
                  onChange={() => toggleInArray('artForms', art.name)}
                />
                <span>
                  <span className="text-sm font-bold block">{art.name}</span>
                  {art.desc && <span className="text-xs text-white/40">{art.desc}</span>}
                </span>
              </label>
            ))}
          </div>
          <div>
            <label className={labelClass}>Other</label>
            <input
              type="text"
              value={form.otherArtForm}
              onChange={(e) => set('otherArtForm', e.target.value)}
              placeholder="Specify other artistic dimensions..."
              className={inputClass}
            />
          </div>
        </section>

        {/* Artistic Experience */}
        <section>
          <SectionHeading icon={ScrollText} title="Artistic Experience" />
          <div className="space-y-6">
            <div>
              <label className={labelClass}>How many years have you been involved in this art? *</label>
              <div className="flex flex-wrap gap-2">
                {YEARS_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => set('yearsInvolved', opt)}
                    className={cn(
                      "px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest border transition-colors",
                      form.yearsInvolved === opt ? "bg-gold text-black border-gold" : "bg-white/5 text-white/60 border-white/10 hover:border-white/30"
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className={labelClass}>Have you taken any formal training in this art? *</label>
              <YesNoButtons value={form.formalTraining} onChange={(v) => set('formalTraining', v as YesNo)} options={['Yes', 'No']} />
            </div>
            <div>
              <label className={labelClass}>Are you able to earn a livelihood from this art? *</label>
              <YesNoButtons value={form.earnsLivelihood} onChange={(v) => set('earnsLivelihood', v as YesNo)} options={['Yes', 'No']} />
            </div>
            <div>
              <label className={labelClass}>Do you have any certification/degree? *</label>
              <YesNoButtons value={form.hasCertification} onChange={(v) => set('hasCertification', v as YesNo)} options={['Yes', 'No']} />
            </div>
            <div>
              <label className={labelClass}>Have you received any government/private awards/recognition? *</label>
              <YesNoButtons value={form.hasAwards} onChange={(v) => set('hasAwards', v as YesNo)} options={['Yes', 'No']} />
            </div>
          </div>
        </section>

        {/* Portfolio */}
        <section>
          <SectionHeading icon={Film} title="Share some samples of your creations" />
          <div className="glass-panel p-6">
            <p className="text-sm text-white/60 mb-4">
              WhatsApp Portfolio: <span className="text-gold font-bold">+91 70799 17079</span>
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => set('portfolioStatus', 'sent')}
                className={cn(
                  "px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-widest border transition-colors",
                  form.portfolioStatus === 'sent' ? "bg-gold text-black border-gold" : "bg-white/5 text-white/60 border-white/10 hover:border-white/30"
                )}
              >
                Sent on WhatsApp
              </button>
              <button
                type="button"
                onClick={() => set('portfolioStatus', 'not_yet')}
                className={cn(
                  "px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-widest border transition-colors",
                  form.portfolioStatus === 'not_yet' ? "bg-gold text-black border-gold" : "bg-white/5 text-white/60 border-white/10 hover:border-white/30"
                )}
              >
                Don't have yet
              </button>
            </div>
          </div>
        </section>

        {/* Engagement Philosophy */}
        <section>
          <SectionHeading icon={Landmark} title="Engagement Philosophy" />
          <div className="space-y-6">
            <div>
              <label className={labelClass}>In what ways would you like to work with us? *</label>
              <div className="space-y-2">
                {ENGAGEMENT_WAYS.map((way) => (
                  <label key={way} className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 transition-colors">
                    <input type="checkbox" className="accent-gold" checked={form.engagementWays.includes(way)} onChange={() => toggleInArray('engagementWays', way)} />
                    <span className="text-sm">{way}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className={labelClass}>Do you need any special assistance in the field of art? *</label>
              <div className="space-y-2">
                {ASSISTANCE_NEEDS.map((need) => (
                  <label key={need} className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 transition-colors">
                    <input type="checkbox" className="accent-gold" checked={form.assistanceNeeds.includes(need)} onChange={() => toggleInArray('assistanceNeeds', need)} />
                    <span className="text-sm">{need}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className={labelClass}>Are you interested in displaying and selling your art through our organization? *</label>
              <YesNoButtons value={form.interestedInSelling} onChange={(v) => set('interestedInSelling', v as YesNoMaybe)} options={['Yes', 'No', 'Maybe']} />
            </div>
          </div>
        </section>

        {/* Visions & Insights */}
        <section>
          <SectionHeading icon={ScrollText} title="Visions & Insights" />
          <div className="space-y-6">
            <div>
              <label className={labelClass}>In your opinion, what should be done to promote Bihar's art? *</label>
              <textarea
                value={form.promotionSuggestion}
                onChange={(e) => set('promotionSuggestion', e.target.value)}
                placeholder="Your contribution to the artistic tapestry..."
                className={cn(inputClass, "min-h-[100px]")}
              />
            </div>
            <div>
              <label className={labelClass}>Any other suggestions or comments? *</label>
              <textarea
                value={form.otherComments}
                onChange={(e) => set('otherComments', e.target.value)}
                placeholder="Final reflections..."
                className={cn(inputClass, "min-h-[100px]")}
              />
            </div>
            <div>
              <label className={labelClass}>Would you like to actively join us in this campaign to take Bihar's art and culture forward? *</label>
              <YesNoButtons value={form.wantsToJoinCampaign} onChange={(v) => set('wantsToJoinCampaign', v as YesNoMaybe)} options={['Yes', 'No', 'Maybe']} />
            </div>
          </div>
        </section>
      </div>

      <div className="pt-4">
        <button
          onClick={handleSubmit}
          className="w-full bg-white/10 text-white/60 py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-white/15 transition-colors flex items-center justify-center gap-2 cursor-not-allowed"
        >
          <Send size={16} /> Registration Not Open Yet
        </button>
        <p className="text-xs text-white/40 text-center mt-3">
          This campaign hasn't launched — check back soon, or watch this page for the announcement.
        </p>
      </div>
    </div>
  );
};
