import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import {
  Award,
  Camera,
  Check,
  CheckCircle2,
  ChevronLeft,
  Film,
  Landmark,
  Megaphone,
  ScrollText,
  Search,
  Send,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Button, Card, Input, Textarea, useToast } from '../design-system';
import { SelectTile, SplitStepImage, StepIndicator, StepTransition } from '../components/wizard/WizardKit';

import heroBg from '../assets/bihar/hero-bg.png';

// No real photo exists per named art form (64 of them) — using one
// representative, verified-live Unsplash photo per broad category instead
// of inventing a specific depiction for each. Same convention already used
// elsewhere on the site (e.g. TALENT_CATEGORIES) for category imagery.
const CATEGORY_IMAGE: Record<string, string> = {
  'Art & Design': 'https://images.unsplash.com/photo-1461344577544-4e5dc9487184?q=80&w=400&auto=format&fit=crop',
  Craft: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=400&auto=format&fit=crop',
  Dance: 'https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=400&auto=format&fit=crop',
  Music: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=400&auto=format&fit=crop',
  Theatre: 'https://images.unsplash.com/photo-1503095396549-807759245b35?q=80&w=400&auto=format&fit=crop',
  Literature: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=400&auto=format&fit=crop',
  Cinema: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=400&auto=format&fit=crop',
};

// Per-step full-bleed card backgrounds. Real cropped assets (heroBg) are
// reused where they fit; the rest are verified-live, generically-themed
// Unsplash photos (no specific-place claims — nothing here pretends to be a
// real Bihar location besides heroBg itself, which came from the user's own
// reference sheet).
const STEP_IMAGE: Record<StepId, string> = {
  welcome: heroBg,
  personal: 'https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?q=80&w=1200&auto=format&fit=crop',
  artforms: 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=1200&auto=format&fit=crop',
  experience: 'https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=1200&auto=format&fit=crop',
  creations: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=1200&auto=format&fit=crop',
  engagement1: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1200&auto=format&fit=crop',
  engagement2: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1200&auto=format&fit=crop',
  review: heroBg,
};

const STEP_CAPTION: Record<StepId, string> = {
  welcome: "Where Bihar's stories begin.",
  personal: "Let's get to know you.",
  artforms: 'Your craft, your calling.',
  experience: 'Every journey has a story.',
  creations: 'Show us what you make.',
  engagement1: 'How we work together.',
  engagement2: 'Your voice, your vision.',
  review: 'Almost there.',
};

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
  { name: 'Madhubani Painting', industry: 'Art & Design' },
  { name: 'Sikki Art', industry: 'Art & Design' },
  { name: 'Tikuli Art', industry: 'Art & Design' },
  { name: 'Patachitra/Patwa Art', industry: 'Art & Design' },
  { name: 'Papier-mâché Handicraft', industry: 'Craft' },
  { name: 'Bamboo Art & Products', industry: 'Craft' },
  { name: 'Stone & Wood Sculpture', industry: 'Craft' },
  { name: 'Terracotta & Pottery Art', industry: 'Craft' },
  { name: 'Glass Painting & Embroidery', industry: 'Art & Design' },
  { name: 'Fabric Art & Designing', industry: 'Craft' },
  { name: 'Metal Art', industry: 'Craft' },
  { name: 'Bhojpuri Sohrai Painting', industry: 'Art & Design' },
  { name: 'Wooden Toy Making', industry: 'Craft' },
  { name: 'Conch Shell Art', industry: 'Craft' },
  { name: 'Leaf Painting', industry: 'Art & Design' },
  { name: 'Folk Dance', industry: 'Dance' },
  { name: 'Classical Dance', industry: 'Dance' },
  { name: 'Folk Singing', industry: 'Music' },
  { name: 'Classical Singing', industry: 'Music' },
  { name: 'Art of Playing Musical Instruments', industry: 'Music' },
  { name: 'Theatre & Drama', industry: 'Theatre' },
  { name: 'Story & Screenplay Writing', industry: 'Literature' },
  { name: 'Nautanki & Bahurupiya Art', industry: 'Theatre' },
  { name: 'Pandavani Singing', industry: 'Music' },
  { name: 'Chaupat Dance', industry: 'Dance' },
  { name: 'Launda Naach', industry: 'Dance' },
  { name: 'Bhagait Singing', industry: 'Music' },
  { name: 'Photography', industry: 'Cinema' },
  { name: 'Film Making', industry: 'Cinema' },
  { name: 'Documentary Film Making', industry: 'Cinema' },
  { name: 'Video Editing & Post Production', industry: 'Cinema' },
  { name: 'VFX & Motion Graphics', industry: 'Cinema' },
  { name: 'Animation & Graphic Designing', industry: 'Art & Design' },
  { name: 'Music Video Production', industry: 'Cinema' },
  { name: 'Folk Tales & Story Writing', industry: 'Literature' },
  { name: 'Folk Songs & Bhajan Writing', industry: 'Literature' },
  { name: 'Drama & Script Writing', industry: 'Literature' },
  { name: 'Ghazal & Shayari Writing', industry: 'Literature' },
  { name: 'Handwritten Manuscript Art', industry: 'Literature' },
  { name: 'Vidyapati Poetry Tradition', industry: 'Literature' },
  { name: 'Bundel Art', industry: 'Craft' },
  { name: 'Sujni Embroidery & Zari Work', industry: 'Craft' },
  { name: 'Tussar Silk & Bhagalpuri Silk', industry: 'Craft' },
  { name: 'Iron & Brass Art', industry: 'Craft' },
  { name: 'Clay Pottery', industry: 'Craft' },
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
  portfolioFiles: string[];
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
  hasCertification: '', hasAwards: '', portfolioFiles: [], portfolioStatus: '', engagementWays: [], assistanceNeeds: [],
  interestedInSelling: '', promotionSuggestion: '', otherComments: '', wantsToJoinCampaign: '',
};

type StepId = 'welcome' | 'personal' | 'artforms' | 'experience' | 'creations' | 'engagement1' | 'engagement2' | 'review';

const STEPS: StepId[] = ['welcome', 'personal', 'artforms', 'experience', 'creations', 'engagement1', 'engagement2', 'review'];

const STEP_LABEL: Record<StepId, string> = {
  welcome: 'Welcome',
  personal: 'Particulars',
  artforms: 'Art Form',
  experience: 'Experience',
  creations: 'Creations',
  engagement1: 'Engagement',
  engagement2: 'Visions',
  review: 'Review',
};

const YesNoButtons = ({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
}) => (
  <div className="flex gap-2 flex-wrap">
    {options.map((opt) => (
      <button
        key={opt}
        type="button"
        onClick={() => onChange(opt.toLowerCase())}
        className={cn(
          'px-5 py-[0.6em] rounded-lg text-sosrg-xs font-bold uppercase tracking-widest border-2 transition-colors',
          value === opt.toLowerCase()
            ? 'bg-gold-500 text-text-primary border-gold-500'
            : 'bg-cream-100 text-text-muted border-cream-200 hover:border-gold-500/50',
        )}
      >
        {opt}
      </button>
    ))}
  </div>
);

const FieldLabel = ({ children }: { children: ReactNode }) => (
  <label className="font-body text-sosrg-sm text-text-muted block mb-2">{children}</label>
);

const BackLink = ({ onClick }: { onClick: () => void }) => (
  <button onClick={onClick} className="sosrg-focus-ring flex items-center gap-1 text-sosrg-sm text-text-muted hover:text-text-primary mb-4">
    <ChevronLeft size={16} /> Back
  </button>
);

export const BiharDocumentaryRegistration = ({ standalone = true }: { standalone?: boolean }) => {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [currentStepId, setCurrentStepId] = useState<StepId>('welcome');
  const [artSearch, setArtSearch] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { show } = useToast();

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((f) => ({ ...f, [key]: value }));

  const toggleInArray = (key: 'artForms' | 'engagementWays' | 'assistanceNeeds', value: string) => {
    setForm((f) => {
      const current = f[key];
      return { ...f, [key]: current.includes(value) ? current.filter((v) => v !== value) : [...current, value] };
    });
  };

  const currentIndex = STEPS.indexOf(currentStepId);
  const [direction, setDirection] = useState(1);
  const goNext = () => {
    const next = STEPS[currentIndex + 1];
    if (next) {
      setDirection(1);
      setCurrentStepId(next);
    }
  };
  const goBack = () => {
    const prev = STEPS[currentIndex - 1];
    if (prev) {
      setDirection(-1);
      setCurrentStepId(prev);
    }
  };

  // Image alternates sides per step, same rhythm as ProfileSetupPage.
  const imageOnRight = currentIndex % 2 === 0;

  const filteredArtForms = useMemo(
    () => ART_FORMS.filter((a) => a.name.toLowerCase().includes(artSearch.toLowerCase())),
    [artSearch],
  );

  // No live endpoint for this campaign yet — everything above is real and
  // fillable (a locked/inert preview made people fill out nothing at all),
  // but the actual submit stays honest rather than pretending to send this
  // anywhere: no data leaves the browser.
  const handleSubmit = () => {
    show("Registration isn't open yet — this campaign hasn't launched. We'll announce when applications open.", 'info');
    setSubmitted(true);
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    set('portfolioFiles', [...form.portfolioFiles, ...Array.from(files).map((f) => f.name)]);
  };

  const stepContent = (
    <>
      {currentStepId === 'welcome' && (
        <>
          <div className="mb-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/15 border border-gold-500/40 text-sosrg-xs font-bold uppercase tracking-widest text-gold-700">
            <CheckCircle2 size={14} /> Registration isn't open yet — you can fill this out, submissions aren't collected yet
          </div>
          <h1 className="font-auth-display text-sosrg-3xl text-text-primary mt-4 mb-2">
            Bihar <span className="text-gold-700">Untold</span>
          </h1>
          <p className="text-gold-700 font-bold text-sosrg-xs uppercase tracking-widest mb-4 flex items-center gap-2">
            <Megaphone size={16} /> Invitation for Documentary to Bihar Creators
          </p>
          <p className="font-body text-sosrg-base text-text-muted leading-relaxed mb-6 max-w-2xl">
            If you are a Creator, Artist, Artisan associated with Bihar's Theatre, Cinema, Literary, Music, Dance, Art,
            & Craft Industry, or if you run a Group, Institute, Training Centre, Academy, NGO, or any Startup/Business,
            and you feel that your unique contribution or art business deserves to reach international film festivals
            through a 15–30 or 45–60 minute documentary, then join our filmmaking team!
          </p>

          <Card variant="flat" className="p-[1em] rounded-lg bg-cream-100 mb-6 max-w-2xl">
            <h3 className="font-body font-bold text-sosrg-base mb-3 flex items-center gap-2">
              <Film size={16} className="text-gold-700" /> What we will do
            </h3>
            <ul className="space-y-1.5 text-sosrg-base text-text-muted list-disc list-inside">
              <li>Conduct deep R&D on your art or institution with your help</li>
              <li>Handle the journey from scripting to the screen</li>
              <li>Provide information and guidance on state and central government assistance and facilities</li>
              <li>Make every possible effort to promote your work nationally and internationally</li>
            </ul>
          </Card>

          <p className="font-body text-sosrg-sm text-text-muted italic mb-6">
            To participate: please read the Terms & Conditions before filling out the form.
          </p>

          <div className="flex justify-end">
            <Button onClick={goNext}>Start Registration</Button>
          </div>
        </>
      )}

      {currentStepId === 'personal' && (
        <>
          <BackLink onClick={goBack} />
          <h1 className="font-auth-display text-sosrg-2xl text-text-primary mb-1 flex items-center gap-2">
            <Landmark size={22} className="text-gold-700" /> Personal Particulars
          </h1>
          <p className="font-body text-sosrg-base text-text-muted mb-6">Let's begin with some basic details.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Email" type="email" required value={form.email} onChange={(e) => set('email', e.target.value)} />
            <Input label="Full Name" required value={form.fullName} onChange={(e) => set('fullName', e.target.value)} />
            <Input label="Date of Birth" type="date" required value={form.dob} onChange={(e) => set('dob', e.target.value)} />
            <div>
              <FieldLabel>Gender</FieldLabel>
              <select
                value={form.gender}
                onChange={(e) => set('gender', e.target.value)}
                className="sosrg-focus-ring w-full min-h-12 rounded-xl px-[1em] py-[0.5em] bg-cream-50 font-body text-sosrg-base text-text-primary border border-cream-200 focus:border-gold-500"
              >
                <option value="">Select Gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
                <option value="prefer_not_to_say">Prefer not to say</option>
              </select>
            </div>
            <Input label="Mobile Number" type="tel" required value={form.mobile} onChange={(e) => set('mobile', e.target.value)} placeholder="+91" />
            <Input label="Aadhaar Number" required value={form.aadhaar} onChange={(e) => set('aadhaar', e.target.value)} />
            <Input label="Father / Mother's Name" required value={form.guardianName} onChange={(e) => set('guardianName', e.target.value)} />
            <Input label="Parents Contact Number" type="tel" required value={form.guardianContact} onChange={(e) => set('guardianContact', e.target.value)} />
            <div className="md:col-span-2">
              <FieldLabel>District</FieldLabel>
              <select
                value={form.district}
                onChange={(e) => set('district', e.target.value)}
                className="sosrg-focus-ring w-full min-h-12 rounded-xl px-[1em] py-[0.5em] bg-cream-50 font-body text-sosrg-base text-text-primary border border-cream-200 focus:border-gold-500"
              >
                <option value="">-- Select District --</option>
                {BIHAR_DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>
          <div className="flex justify-end mt-8">
            <Button onClick={goNext} disabled={!form.email || !form.fullName || !form.district}>Continue</Button>
          </div>
        </>
      )}

      {currentStepId === 'artforms' && (
        <>
          <BackLink onClick={goBack} />
          <h1 className="font-auth-display text-sosrg-2xl text-text-primary mb-1 flex items-center gap-2">
            <ScrollText size={22} className="text-gold-700" /> Which art form are you skilled in?
          </h1>
          <p className="font-body text-sosrg-base text-text-muted mb-4">Select one or more art forms that best represent you.</p>

          <div className="relative mb-4">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              value={artSearch}
              onChange={(e) => setArtSearch(e.target.value)}
              placeholder="Search art form…"
              className="sosrg-focus-ring w-full min-h-12 rounded-xl pl-10 pr-[1em] py-[0.5em] bg-cream-50 font-body text-sosrg-base text-text-primary border border-cream-200 focus:border-gold-500"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[24rem] overflow-y-auto pr-1 mb-4">
            {filteredArtForms.map((art) => (
              <SelectTile
                key={art.name}
                selected={form.artForms.includes(art.name)}
                onClick={() => toggleInArray('artForms', art.name)}
                className="p-0 overflow-hidden"
              >
                <div className="relative">
                  <img src={CATEGORY_IMAGE[art.industry]} alt="" aria-hidden="true" className="w-full h-20 object-cover" />
                  {form.artForms.includes(art.name) && (
                    <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-gold-500 flex items-center justify-center">
                      <Check size={12} className="text-text-primary" />
                    </div>
                  )}
                </div>
                <div className="p-[0.75em]">
                  <div className="font-body text-[10px] uppercase tracking-widest text-gold-700">{art.industry}</div>
                  <div className="font-body font-semibold text-sosrg-xs text-text-primary mt-0.5 leading-tight">{art.name}</div>
                </div>
              </SelectTile>
            ))}
            {filteredArtForms.length === 0 && (
              <p className="col-span-full font-body text-sosrg-base text-text-muted italic py-4 text-center">No art forms match "{artSearch}".</p>
            )}
          </div>

          <Input label="Other (please specify)" value={form.otherArtForm} onChange={(e) => set('otherArtForm', e.target.value)} placeholder="Specify other artistic dimensions…" />

          <div className="flex justify-end mt-8">
            <Button onClick={goNext} disabled={form.artForms.length === 0 && !form.otherArtForm}>Continue</Button>
          </div>
        </>
      )}

      {currentStepId === 'experience' && (
        <>
          <BackLink onClick={goBack} />
          <h1 className="font-auth-display text-sosrg-2xl text-text-primary mb-1 flex items-center gap-2">
            <Award size={22} className="text-gold-700" /> Artistic Experience
          </h1>
          <p className="font-body text-sosrg-base text-text-muted mb-6">Help us understand your journey.</p>

          <div className="space-y-6 max-w-xl">
            <div>
              <FieldLabel>How many years have you been involved in this art?</FieldLabel>
              <div className="flex flex-wrap gap-2">
                {YEARS_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => set('yearsInvolved', opt)}
                    className={cn(
                      'px-4 py-[0.6em] rounded-lg text-sosrg-xs font-bold uppercase tracking-widest border-2 transition-colors',
                      form.yearsInvolved === opt
                        ? 'bg-gold-500 text-text-primary border-gold-500'
                        : 'bg-cream-100 text-text-muted border-cream-200 hover:border-gold-500/50',
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <FieldLabel>Have you taken any formal training in this art?</FieldLabel>
              <YesNoButtons value={form.formalTraining} onChange={(v) => set('formalTraining', v as YesNo)} options={['Yes', 'No']} />
            </div>
            <div>
              <FieldLabel>Are you able to earn a livelihood from this art?</FieldLabel>
              <YesNoButtons value={form.earnsLivelihood} onChange={(v) => set('earnsLivelihood', v as YesNo)} options={['Yes', 'No']} />
            </div>
            <div>
              <FieldLabel>Do you have any certification/degree?</FieldLabel>
              <YesNoButtons value={form.hasCertification} onChange={(v) => set('hasCertification', v as YesNo)} options={['Yes', 'No']} />
            </div>
            <div>
              <FieldLabel>Have you received any government/private awards/recognition?</FieldLabel>
              <YesNoButtons value={form.hasAwards} onChange={(v) => set('hasAwards', v as YesNo)} options={['Yes', 'No']} />
            </div>
          </div>
          <div className="flex justify-end mt-8">
            <Button onClick={goNext} disabled={!form.yearsInvolved}>Continue</Button>
          </div>
        </>
      )}

      {currentStepId === 'creations' && (
        <>
          <BackLink onClick={goBack} />
          <h1 className="font-auth-display text-sosrg-2xl text-text-primary mb-1 flex items-center gap-2">
            <Camera size={22} className="text-gold-700" /> Share some samples of your creations
          </h1>
          <p className="font-body text-sosrg-base text-text-muted mb-6">Showcase your work with us.</p>

          <label className="sosrg-focus-ring flex flex-col items-center justify-center gap-2 border-2 border-dashed border-cream-200 rounded-xl py-8 cursor-pointer hover:border-gold-500 transition-colors mb-4 bg-cream-100">
            <Send size={22} className="text-gold-700 rotate-90" />
            <span className="font-body text-sosrg-base text-text-primary font-semibold">Upload images / videos / documents</span>
            <span className="font-body text-sosrg-xs text-text-muted">JPG, PNG, MP4 or PDF (Max 25MB each)</span>
            <input type="file" multiple accept="image/*,video/*,.pdf" className="hidden" onChange={(e) => handleFileUpload(e.target.files)} />
          </label>

          {form.portfolioFiles.length > 0 && (
            <ul className="mb-4 space-y-1">
              {form.portfolioFiles.map((name, i) => (
                <li key={`${name}-${i}`} className="font-body text-sosrg-xs text-text-muted flex items-center gap-2">
                  <Check size={12} className="text-gold-700" /> {name}
                </li>
              ))}
            </ul>
          )}

          <Card variant="flat" className="p-[1em] rounded-lg bg-cream-100 max-w-xl">
            <p className="font-body text-sosrg-base text-text-muted mb-3">
              WhatsApp Portfolio: <span className="text-gold-700 font-bold">+91 70799 17079</span>
            </p>
            <div className="flex gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => set('portfolioStatus', 'sent')}
                className={cn(
                  'px-4 py-[0.6em] rounded-lg text-sosrg-xs font-bold uppercase tracking-widest border-2 transition-colors',
                  form.portfolioStatus === 'sent' ? 'bg-gold-500 text-text-primary border-gold-500' : 'bg-cream-50 text-text-muted border-cream-200',
                )}
              >
                Sent on WhatsApp
              </button>
              <button
                type="button"
                onClick={() => set('portfolioStatus', 'not_yet')}
                className={cn(
                  'px-4 py-[0.6em] rounded-lg text-sosrg-xs font-bold uppercase tracking-widest border-2 transition-colors',
                  form.portfolioStatus === 'not_yet' ? 'bg-gold-500 text-text-primary border-gold-500' : 'bg-cream-50 text-text-muted border-cream-200',
                )}
              >
                Don't have yet
              </button>
            </div>
          </Card>

          <div className="flex justify-end mt-8">
            <Button onClick={goNext}>Continue</Button>
          </div>
        </>
      )}

      {currentStepId === 'engagement1' && (
        <>
          <BackLink onClick={goBack} />
          <h1 className="font-auth-display text-sosrg-2xl text-text-primary mb-1 flex items-center gap-2">
            <Landmark size={22} className="text-gold-700" /> Engagement Philosophy
          </h1>
          <p className="font-body text-sosrg-base text-text-muted mb-6">How would you like to work with us?</p>

          <div className="space-y-6 max-w-2xl">
            <div>
              <FieldLabel>In what ways would you like to work with us?</FieldLabel>
              <div className="space-y-2">
                {ENGAGEMENT_WAYS.map((way) => (
                  <label key={way} className="flex items-center gap-3 p-[0.75em] bg-cream-100 border border-cream-200 rounded-xl cursor-pointer hover:border-gold-500/50 transition-colors">
                    <input type="checkbox" className="accent-gold-500 w-4 h-4" checked={form.engagementWays.includes(way)} onChange={() => toggleInArray('engagementWays', way)} />
                    <span className="font-body text-sosrg-base text-text-primary">{way}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <FieldLabel>Do you need any special assistance in the field of art?</FieldLabel>
              <div className="space-y-2">
                {ASSISTANCE_NEEDS.map((need) => (
                  <label key={need} className="flex items-center gap-3 p-[0.75em] bg-cream-100 border border-cream-200 rounded-xl cursor-pointer hover:border-gold-500/50 transition-colors">
                    <input type="checkbox" className="accent-gold-500 w-4 h-4" checked={form.assistanceNeeds.includes(need)} onChange={() => toggleInArray('assistanceNeeds', need)} />
                    <span className="font-body text-sosrg-base text-text-primary">{need}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-8">
            <Button onClick={goNext}>Continue</Button>
          </div>
        </>
      )}

      {currentStepId === 'engagement2' && (
        <>
          <BackLink onClick={goBack} />
          <h1 className="font-auth-display text-sosrg-2xl text-text-primary mb-1 flex items-center gap-2">
            <ScrollText size={22} className="text-gold-700" /> Visions & Insights
          </h1>
          <p className="font-body text-sosrg-base text-text-muted mb-6">Are you interested in displaying and selling your art through our organization?</p>
          <YesNoButtons value={form.interestedInSelling} onChange={(v) => set('interestedInSelling', v as YesNoMaybe)} options={['Yes', 'No', 'Maybe']} />

          <div className="space-y-6 max-w-xl mt-6">
            <Textarea label="In your opinion, what should be done to promote Bihar's art?" value={form.promotionSuggestion} onChange={(e) => set('promotionSuggestion', e.target.value)} placeholder="Your contribution to the artistic tapestry…" />
            <Textarea label="Any other suggestions or comments?" value={form.otherComments} onChange={(e) => set('otherComments', e.target.value)} placeholder="Final reflections…" />
            <div>
              <FieldLabel>Would you like to actively join us in this campaign to take Bihar's art and culture forward?</FieldLabel>
              <YesNoButtons value={form.wantsToJoinCampaign} onChange={(v) => set('wantsToJoinCampaign', v as YesNoMaybe)} options={['Yes', 'No', 'Maybe']} />
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <Button onClick={goNext}>Continue</Button>
          </div>
        </>
      )}

      {currentStepId === 'review' && (
        <>
          <BackLink onClick={goBack} />
          <h1 className="font-auth-display text-sosrg-2xl text-text-primary mb-1">Review & Submit</h1>
          <p className="font-body text-sosrg-base text-text-muted mb-6">Almost there! Review your details before submitting.</p>

          <Card variant="flat" className="p-[1em] rounded-lg bg-cream-100 flex flex-col gap-3 mb-6 max-w-xl">
            <div><div className="font-body text-sosrg-sm text-text-muted">Name</div><div className="font-body font-semibold text-sosrg-base text-text-primary">{form.fullName || '—'}</div></div>
            <div><div className="font-body text-sosrg-sm text-text-muted">Email</div><div className="font-body font-semibold text-sosrg-base text-text-primary">{form.email || '—'}</div></div>
            <div><div className="font-body text-sosrg-sm text-text-muted">Art Form</div><div className="font-body font-semibold text-sosrg-base text-text-primary">{form.artForms.join(', ') || form.otherArtForm || '—'}</div></div>
            <div><div className="font-body text-sosrg-sm text-text-muted">Experience</div><div className="font-body font-semibold text-sosrg-base text-text-primary">{form.yearsInvolved || '—'}</div></div>
            <div><div className="font-body text-sosrg-sm text-text-muted">District</div><div className="font-body font-semibold text-sosrg-base text-text-primary">{form.district || '—'}</div></div>
            <div><div className="font-body text-sosrg-sm text-text-muted">Portfolio</div><div className="font-body font-semibold text-sosrg-base text-text-primary">{form.portfolioFiles.length > 0 ? `${form.portfolioFiles.length} file(s) uploaded` : form.portfolioStatus === 'sent' ? 'Sent on WhatsApp' : '—'}</div></div>
          </Card>

          <p className="font-body text-sosrg-sm text-text-muted mb-6 max-w-xl">
            By submitting this form, you agree to our Terms & Conditions and allow us to use the provided information for this initiative.
          </p>

          {submitted ? (
            <div className="flex items-center gap-2 py-4 font-body text-sosrg-base text-text-muted max-w-xl">
              <CheckCircle2 size={16} className="text-gold-700 shrink-0" /> Registration isn't open yet — check back soon, or watch this page for the announcement.
            </div>
          ) : (
            <Button onClick={handleSubmit} className="w-full max-w-xl flex items-center justify-center gap-2">
              <Send size={16} /> Submit the Form
            </Button>
          )}
        </>
      )}
    </>
  );

  const registrationSection = (
    <section id="bihar-registration" className={cn('flex flex-col md:flex-row', standalone ? 'flex-1' : 'min-h-[640px]')}>
      <SplitStepImage image={STEP_IMAGE[currentStepId]} caption={STEP_CAPTION[currentStepId]} imageOnRight={imageOnRight} stepKey={currentStepId} direction={direction} />
      <div className={cn('flex-1 md:w-1/2 flex flex-col justify-start px-6 py-10 sm:px-12 md:px-16', imageOnRight ? 'md:order-1' : 'md:order-2')}>
        <div className="w-full max-w-xl mx-auto md:mx-0">
          <StepIndicator steps={STEPS.map((s) => STEP_LABEL[s])} currentIndex={currentIndex} />
          <StepTransition stepKey={currentStepId} direction={direction}>
            {stepContent}
          </StepTransition>
        </div>
      </div>
    </section>
  );

  if (!standalone) {
    return <div className="py-8 max-w-5xl mx-auto">{registrationSection}</div>;
  }

  return (
    <div className="min-h-screen flex-col">
      <div className="max-w-6xl mx-auto px-4 w-full shrink-0">
        {/* Intro — sits directly under the fixed navbar, no Hero banner above it */}
        <section className="py-8">
        </section>
      </div>

      {/* Full-width, not boxed into the centered container above, and
          flex-1 so it stretches edge-to-edge down to the footer with no
          gap — the step cards get the whole rest of the page. */}
      <div className="flex-1 flex flex-col">{registrationSection}</div>
    </div>
  );
};
