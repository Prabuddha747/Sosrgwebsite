import { useEffect, useMemo, useState } from 'react';
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
import { SplitStepImage, StepIndicator, StepTransition } from '../components/wizard/WizardKit';
import { ApiError } from '../services/httpClient';
import { biharUntoldService } from '../services/biharUntold';
import type { BiharUntoldOptions, BiharUntoldPortfolioFile, ExperienceRange } from '../services/biharUntold';

import heroBg from '../assets/bihar/hero-bg.png';
import personalBg from '../assets/bihar/personal-bg.png';
import artformsBg from '../assets/bihar/artforms-bg.png';
import experienceBg from '../assets/bihar/experience-bg.png';
import creationsBg from '../assets/bihar/creations-bg.png';
import engagement1Bg from '../assets/bihar/engagement1-bg.png';
import engagement2Bg from '../assets/bihar/engagement2-bg.png';

// Letters, spaces, and the handful of punctuation marks real names use
// (apostrophe, hyphen, period) — no digits or other special characters.
const NAME_PATTERN = /^[A-Za-z][A-Za-z .'-]{1,59}$/;
const isValidName = (v: string) => NAME_PATTERN.test(v.trim());

// Strips a leading +91/91 country code (but only when it's actually a
// country code, not the first two digits of a bare 10-digit number like
// 9155512548 — a plain "91" prefix is only stripped at 12 digits) and any
// spaces/dashes, so "+91 98765 43210" and "9876543210" both validate the
// same way; Indian mobile numbers start 6-9.
const normalizePhone = (v: string) => {
  const digits = v.trim().replace(/[\s-]/g, '');
  if (digits.startsWith('+91')) return digits.slice(3);
  if (digits.length === 12 && digits.startsWith('91')) return digits.slice(2);
  return digits;
};
const isValidPhone = (v: string) => /^[6-9]\d{9}$/.test(normalizePhone(v));

const isValidAadhaar = (v: string) => /^\d{12}$/.test(v.trim().replace(/\s/g, ''));

// Per-step full-bleed card backgrounds. Real cropped assets (heroBg) are
// reused where they fit; the rest are verified-live, generically-themed
// Unsplash photos (no specific-place claims — nothing here pretends to be a
// real Bihar location besides heroBg itself, which came from the user's own
// reference sheet).
const STEP_IMAGE: Record<StepId, string> = {
  welcome: heroBg,
  personal: personalBg,
  artforms: artformsBg,
  experience: experienceBg,
  creations: creationsBg,
  engagement1: engagement1Bg,
  engagement2: engagement2Bg,
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

// Art forms come from GET /v1/bihar-untold/options (fetched at mount, see
// `options` state below) rather than a hardcoded list — the backend
// validates saveArtForms() against exactly that catalog and 400s
// (VALIDATION_FAILED) on anything else (curl-verified live), so any art
// form not in the live catalog has to go through the free-text
// `otherArtForm` field instead of being offered as a tile.

// These two preference lists and the years-of-experience buckets ARE
// validated against fixed backend ids too, but the ids are stable slugs for
// this campaign's own fixed catalog (curl-verified against GET /options) —
// paired positionally with the existing display copy rather than
// hardcoding ids in the JSX.
const ENGAGEMENT_WAYS = [
  { label: 'For online sales (E-commerce, Website, Digital Marketing)', id: 'online_sales' },
  { label: 'To conduct live workshops and training (Offline/Online)', id: 'workshops_training' },
  { label: 'To participate in art exhibitions, workshops, cultural events and fairs', id: 'exhibitions_events_fairs' },
  { label: 'To perform in art tourism and cultural events', id: 'art_tourism_events' },
  { label: 'For assistance in branding and digital marketing', id: 'branding_digital_marketing' },
];

const ASSISTANCE_NEEDS = [
  { label: 'A beautiful Documentary on your art or institution/business', id: 'documentary' },
  { label: 'Financial Support for your art or art business setup', id: 'financial_support' },
  { label: 'Marketing & Promotion', id: 'marketing_promotion' },
  { label: 'Art Workshop/Training & Upskilling', id: 'training_upskilling' },
  { label: 'Access to the right market and buyers for art', id: 'market_buyer_access' },
  { label: 'Legal & Licensing Support like Copyright/trademark', id: 'legal_licensing' },
];

// Well-known Bihar art forms not in the live backend catalog (see the
// GET /options comment above) — offered as tiles too, but since the
// backend 400s on any artForms id it doesn't recognize, picking one of
// these writes its name into the free-text otherArtForm field instead.
const EXTRA_ART_FORMS = [
  'Glass Painting & Embroidery',
  'Fabric Art & Designing',
  'Metal Art',
  'Bhojpuri Sohrai Painting',
  'Wooden Toy Making',
  'Conch Shell Art',
  'Leaf Painting',
  'Folk Dance',
  'Classical Dance',
  'Folk Singing',
  'Classical Singing',
  'Art of Playing Musical Instruments',
  'Theatre & Drama',
  'Story & Screenplay Writing',
  'Nautanki & Bahurupiya Art',
  'Pandavani Singing',
  'Chaupat Dance',
  'Launda Naach',
  'Bhagait Singing',
  'Photography',
  'Film Making',
  'Documentary Film Making',
  'Video Editing & Post Production',
  'VFX & Motion Graphics',
  'Animation & Graphic Designing',
  'Music Video Production',
  'Folk Tales & Story Writing',
  'Folk Songs & Bhajan Writing',
  'Drama & Script Writing',
  'Ghazal & Shayari Writing',
  'Handwritten Manuscript Art',
  'Vidyapati Poetry Tradition',
  'Bundel Art',
  'Sujni Embroidery & Zari Work',
  'Tussar Silk & Bhagalpuri Silk',
  'Iron & Brass Art',
  'Clay Pottery',
];

const YEARS_OPTIONS: { label: string; id: ExperienceRange }[] = [
  { label: '1 to 2 years', id: '1_to_2' },
  { label: '3 to 5 years', id: '3_to_5' },
  { label: '6 to 10 years', id: '6_to_10' },
  { label: 'More than 10 years', id: 'more_than_10' },
];

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
  portfolioFiles: BiharUntoldPortfolioFile[];
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
  hasCertification: '', hasAwards: '', portfolioFiles: [], engagementWays: [], assistanceNeeds: [],
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

  // Draft submission created on leaving the "personal" step (createSubmission
  // needs those fields). Every later step PATCHes this same draft, identified
  // by id + the editToken sent back as X-Submission-Token.
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [editToken, setEditToken] = useState<string | null>(null);
  const [stepSaving, setStepSaving] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);

  const [options, setOptions] = useState<BiharUntoldOptions | null>(null);
  useEffect(() => {
    let cancelled = false;
    biharUntoldService
      .getOptions()
      .then((opts) => { if (!cancelled) setOptions(opts); })
      .catch((err) => {
        if (cancelled) return;
        show(err instanceof ApiError ? err.message : 'Could not load the art-form catalogue.', 'error');
      });
    return () => { cancelled = true; };
  }, [show]);

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

  const artFormOptions = options?.artForms ?? [];
  const filteredArtForms = useMemo(
    () => artFormOptions.filter((a) => a.name.toLowerCase().includes(artSearch.toLowerCase())),
    [artFormOptions, artSearch],
  );
  const filteredExtraArtForms = useMemo(
    () => EXTRA_ART_FORMS.filter((name) => name.toLowerCase().includes(artSearch.toLowerCase())),
    [artSearch],
  );

  // EXTRA_ART_FORMS tiles piggyback on the same free-text otherArtForm
  // field rather than their own state — selected ones are just names
  // present in its comma-separated value, so manual typing there and
  // tile-toggling stay in sync automatically.
  const otherArtFormTokens = useMemo(
    () => form.otherArtForm.split(',').map((s) => s.trim()).filter(Boolean),
    [form.otherArtForm],
  );
  const toggleExtraArtForm = (name: string) => {
    set(
      'otherArtForm',
      otherArtFormTokens.includes(name)
        ? otherArtFormTokens.filter((t) => t !== name).join(', ')
        : [...otherArtFormTokens, name].join(', '),
    );
  };

  const todayStr = new Date().toISOString().slice(0, 10);
  const personalValid =
    !!form.email &&
    isValidName(form.fullName) &&
    !!form.dob &&
    form.dob <= todayStr &&
    !!form.gender &&
    isValidPhone(form.mobile) &&
    isValidAadhaar(form.aadhaar) &&
    isValidName(form.guardianName) &&
    isValidPhone(form.guardianContact) &&
    !!form.district;

  const apiErrorMessage = (err: unknown, fallback: string) => (err instanceof ApiError ? err.message : fallback);

  // One save-then-advance handler per step, so a failed PATCH keeps the user
  // on the step (with a toast) instead of silently losing that step's data.
  const runStep = async (action: () => Promise<unknown>, fallbackMessage: string) => {
    setStepSaving(true);
    try {
      await action();
      goNext();
    } catch (err) {
      show(apiErrorMessage(err, fallbackMessage), 'error');
    } finally {
      setStepSaving(false);
    }
  };

  const submitPersonal = () =>
    runStep(async () => {
      const ref = await biharUntoldService.createSubmission({
        email: form.email.trim(),
        fullName: form.fullName.trim(),
        dateOfBirth: form.dob,
        gender: form.gender,
        mobileNumber: normalizePhone(form.mobile),
        aadhaarNumber: form.aadhaar.trim().replace(/\s/g, ''),
        parentName: form.guardianName.trim(),
        parentContactNumber: normalizePhone(form.guardianContact),
        district: form.district,
      });
      setSubmissionId(ref.id);
      setEditToken(ref.editToken);
    }, 'Could not save your details. Please try again.');

  const submitArtForms = () =>
    runStep(
      () => biharUntoldService.saveArtForms(submissionId!, editToken!, form.artForms, form.otherArtForm || undefined),
      'Could not save your art forms. Please try again.',
    );

  const submitExperience = () =>
    runStep(
      () =>
        biharUntoldService.saveExperience(submissionId!, editToken!, {
          experienceRange: (YEARS_OPTIONS.find((y) => y.label === form.yearsInvolved)?.id ?? '1_to_2') as ExperienceRange,
          formalTraining: form.formalTraining === 'yes',
          earnsLivelihood: form.earnsLivelihood === 'yes',
          hasCertification: form.hasCertification === 'yes',
          hasRecognition: form.hasAwards === 'yes',
        }),
      'Could not save your experience. Please try again.',
    );

  const submitCreations = () =>
    runStep(
      () => biharUntoldService.saveCreations(submissionId!, editToken!),
      'Could not save your portfolio. Please try again.',
    );

  const submitEngagement = () =>
    runStep(
      () =>
        biharUntoldService.saveEngagement(submissionId!, editToken!, {
          engagementPreferences: form.engagementWays,
          assistancePreferences: form.assistanceNeeds,
        }),
      'Could not save your engagement preferences. Please try again.',
    );

  const submitVisions = () =>
    runStep(
      () =>
        biharUntoldService.saveVisions(submissionId!, editToken!, {
          interestedInSelling: form.interestedInSelling || 'maybe',
          promotionIdeas: form.promotionSuggestion || undefined,
          suggestions: form.otherComments || undefined,
          wantsToJoin: form.wantsToJoinCampaign || 'maybe',
        }),
      'Could not save your answers. Please try again.',
    );

  const handleSubmit = async () => {
    if (!submissionId || !editToken) return;
    setStepSaving(true);
    try {
      await biharUntoldService.submit(submissionId, editToken);
      show("You're in! We'll be in touch about the Bihar Untold documentary.", 'success');
      setSubmitted(true);
    } catch (err) {
      show(apiErrorMessage(err, 'Could not submit your registration. Please try again.'), 'error');
    } finally {
      setStepSaving(false);
    }
  };

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0 || !submissionId || !editToken) return;
    setUploadingFile(true);
    try {
      for (const file of Array.from(files)) {
        const uploaded = await biharUntoldService.uploadPortfolioFile(submissionId, editToken, file);
        setForm((f) => ({ ...f, portfolioFiles: [...f.portfolioFiles, uploaded] }));
      }
    } catch (err) {
      show(apiErrorMessage(err, 'Could not upload that file.'), 'error');
    } finally {
      setUploadingFile(false);
    }
  };

  const stepContent = (
    <>
      {currentStepId === 'welcome' && (
        <>
          <div className="mb-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/15 border border-gold-500/40 text-sosrg-xs font-bold uppercase tracking-widest text-gold-700">
            <CheckCircle2 size={14} /> Registration is open
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
            <Input
              label="Full Name"
              required
              value={form.fullName}
              onChange={(e) => set('fullName', e.target.value)}
              error={form.fullName && !isValidName(form.fullName) ? 'Letters and spaces only — no numbers or special characters.' : undefined}
            />
            <Input
              label="Date of Birth"
              type="date"
              required
              max={todayStr}
              value={form.dob}
              onChange={(e) => set('dob', e.target.value)}
              error={form.dob && form.dob > todayStr ? "Date of birth can't be in the future." : undefined}
            />
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
            <Input
              label="Mobile Number"
              type="tel"
              required
              value={form.mobile}
              onChange={(e) => set('mobile', e.target.value)}
              placeholder="+91"
              error={form.mobile && !isValidPhone(form.mobile) ? '10-digit Indian mobile number (with or without +91).' : undefined}
            />
            <Input
              label="Aadhaar Number"
              required
              value={form.aadhaar}
              onChange={(e) => set('aadhaar', e.target.value)}
              error={form.aadhaar && !isValidAadhaar(form.aadhaar) ? 'Aadhaar number must be exactly 12 digits.' : undefined}
            />
            <Input
              label="Father / Mother's Name"
              required
              value={form.guardianName}
              onChange={(e) => set('guardianName', e.target.value)}
              error={form.guardianName && !isValidName(form.guardianName) ? 'Letters and spaces only — no numbers or special characters.' : undefined}
            />
            <Input
              label="Parents Contact Number"
              type="tel"
              required
              value={form.guardianContact}
              onChange={(e) => set('guardianContact', e.target.value)}
              error={form.guardianContact && !isValidPhone(form.guardianContact) ? '10-digit Indian mobile number (with or without +91).' : undefined}
            />
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
            <Button onClick={submitPersonal} disabled={stepSaving || !personalValid}>
              {stepSaving ? 'Saving…' : 'Continue'}
            </Button>
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

          {!options && (
            <p className="font-body text-sosrg-sm text-text-muted italic mb-4">Loading art forms…</p>
          )}

          {/* Text-only pills, same primary/secondary vocabulary as the signup
              wizard's profession picker (ProfileSetupPage.tsx) — no per-item
              photo, since there's no real image for most of these forms
              anyway (see the removed CATEGORY_IMAGE comment history). */}
          {/* Fixed height (not just a cap) so filtering down to a handful of
              matches — or zero — doesn't collapse this box and yank
              everything below it up the page; it scrolls internally instead
              of resizing with the result count. */}
          <div className="min-h-[24rem] max-h-[24rem] flex flex-wrap content-start gap-2 overflow-y-auto pr-1 mb-4">
            {filteredArtForms.map((art) => {
              const selected = form.artForms.includes(art.id);
              return (
                <button
                  key={art.id}
                  type="button"
                  onClick={() => toggleInArray('artForms', art.id)}
                  className={cn(
                    'sosrg-focus-ring px-4 py-2 rounded-full text-sosrg-sm font-body border transition-colors',
                    selected
                      ? 'bg-gold-500 border-gold-500 text-cream-50 font-semibold'
                      : 'bg-cream-50 border-cream-200 text-text-primary hover:border-gold-500',
                  )}
                >
                  {art.name}
                </button>
              );
            })}
            {filteredExtraArtForms.map((name) => {
              const selected = otherArtFormTokens.includes(name);
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => toggleExtraArtForm(name)}
                  className={cn(
                    'sosrg-focus-ring px-4 py-2 rounded-full text-sosrg-sm font-body border transition-colors',
                    selected
                      ? 'bg-gold-500 border-gold-500 text-cream-50 font-semibold'
                      : 'bg-cream-50 border-cream-200 text-text-primary hover:border-gold-500',
                  )}
                >
                  {name}
                </button>
              );
            })}
            {options && filteredArtForms.length === 0 && filteredExtraArtForms.length === 0 && (
              <p className="w-full font-body text-sosrg-base text-text-muted italic py-4 text-center">No art forms match "{artSearch}".</p>
            )}
          </div>

          <Input
            label="Other (please specify)"
            value={form.otherArtForm}
            onChange={(e) => set('otherArtForm', e.target.value)}
            placeholder="Not listed above? Name your art form, craft, or discipline…"
          />

          <div className="flex justify-end mt-8">
            <Button onClick={submitArtForms} disabled={stepSaving || (form.artForms.length === 0 && !form.otherArtForm)}>
              {stepSaving ? 'Saving…' : 'Continue'}
            </Button>
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
                    key={opt.id}
                    type="button"
                    onClick={() => set('yearsInvolved', opt.label)}
                    className={cn(
                      'px-4 py-[0.6em] rounded-lg text-sosrg-xs font-bold uppercase tracking-widest border-2 transition-colors',
                      form.yearsInvolved === opt.label
                        ? 'bg-gold-500 text-text-primary border-gold-500'
                        : 'bg-cream-100 text-text-muted border-cream-200 hover:border-gold-500/50',
                    )}
                  >
                    {opt.label}
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
            <Button onClick={submitExperience} disabled={stepSaving || !form.yearsInvolved}>
              {stepSaving ? 'Saving…' : 'Continue'}
            </Button>
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

          <label
            className={cn(
              'sosrg-focus-ring flex flex-col items-center justify-center gap-2 border-2 border-dashed border-cream-200 rounded-xl py-8 transition-colors mb-4 bg-cream-100',
              uploadingFile || !submissionId ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:border-gold-500',
            )}
          >
            <Send size={22} className="text-gold-700 rotate-90" />
            <span className="font-body text-sosrg-base text-text-primary font-semibold">
              {uploadingFile ? 'Uploading…' : 'Upload images / videos / documents'}
            </span>
            <span className="font-body text-sosrg-xs text-text-muted">JPG, PNG, MP4 or PDF (Max 25MB each)</span>
            <input
              type="file"
              multiple
              accept="image/*,video/*,.pdf"
              className="hidden"
              disabled={uploadingFile || !submissionId}
              onChange={(e) => { void handleFileUpload(e.target.files); e.target.value = ''; }}
            />
          </label>

          {form.portfolioFiles.length > 0 && (
            <ul className="mb-4 space-y-1">
              {form.portfolioFiles.map((f) => (
                <li key={f.id} className="font-body text-sosrg-xs text-text-muted flex items-center gap-2">
                  <Check size={12} className="text-gold-700" /> {f.filename}
                </li>
              ))}
            </ul>
          )}

          {form.portfolioFiles.length === 0 && (
            <p className="font-body text-sosrg-xs text-text-muted italic mb-4">Upload at least one sample to continue.</p>
          )}

          <div className="flex justify-end mt-8">
            <Button onClick={submitCreations} disabled={stepSaving || uploadingFile || form.portfolioFiles.length === 0}>
              {stepSaving ? 'Saving…' : 'Continue'}
            </Button>
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
                  <label key={way.id} className="flex items-center gap-3 p-[0.75em] bg-cream-100 border border-cream-200 rounded-xl cursor-pointer hover:border-gold-500/50 transition-colors">
                    <input type="checkbox" className="accent-gold-500 w-4 h-4" checked={form.engagementWays.includes(way.id)} onChange={() => toggleInArray('engagementWays', way.id)} />
                    <span className="font-body text-sosrg-base text-text-primary">{way.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <FieldLabel>Do you need any special assistance in the field of art?</FieldLabel>
              <div className="space-y-2">
                {ASSISTANCE_NEEDS.map((need) => (
                  <label key={need.id} className="flex items-center gap-3 p-[0.75em] bg-cream-100 border border-cream-200 rounded-xl cursor-pointer hover:border-gold-500/50 transition-colors">
                    <input type="checkbox" className="accent-gold-500 w-4 h-4" checked={form.assistanceNeeds.includes(need.id)} onChange={() => toggleInArray('assistanceNeeds', need.id)} />
                    <span className="font-body text-sosrg-base text-text-primary">{need.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-8">
            <Button onClick={submitEngagement} disabled={stepSaving}>
              {stepSaving ? 'Saving…' : 'Continue'}
            </Button>
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
            <Button onClick={submitVisions} disabled={stepSaving}>
              {stepSaving ? 'Saving…' : 'Continue'}
            </Button>
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
            <div><div className="font-body text-sosrg-sm text-text-muted">Art Form</div><div className="font-body font-semibold text-sosrg-base text-text-primary">{artFormOptions.filter((a) => form.artForms.includes(a.id)).map((a) => a.name).join(', ') || form.otherArtForm || '—'}</div></div>
            <div><div className="font-body text-sosrg-sm text-text-muted">Experience</div><div className="font-body font-semibold text-sosrg-base text-text-primary">{form.yearsInvolved || '—'}</div></div>
            <div><div className="font-body text-sosrg-sm text-text-muted">District</div><div className="font-body font-semibold text-sosrg-base text-text-primary">{form.district || '—'}</div></div>
            <div><div className="font-body text-sosrg-sm text-text-muted">Portfolio</div><div className="font-body font-semibold text-sosrg-base text-text-primary">{form.portfolioFiles.length > 0 ? `${form.portfolioFiles.length} file(s) uploaded` : '—'}</div></div>
          </Card>

          <p className="font-body text-sosrg-sm text-text-muted mb-6 max-w-xl">
            By submitting this form, you agree to our Terms & Conditions and allow us to use the provided information for this initiative.
          </p>

          {submitted ? (
            <div className="flex items-center gap-2 py-4 font-body text-sosrg-base text-text-muted max-w-xl">
              <CheckCircle2 size={16} className="text-gold-700 shrink-0" /> Thank you — your registration is in. We'll be in touch.
            </div>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={stepSaving || !submissionId}
              className="w-full max-w-xl flex items-center justify-center gap-2"
            >
              <Send size={16} /> {stepSaving ? 'Submitting…' : 'Submit the Form'}
            </Button>
          )}
        </>
      )}
    </>
  );

  const registrationSection = (
    <section id="bihar-registration" className={cn('flex flex-col md:flex-row', standalone ? 'flex-1' : 'min-h-[640px]')}>
      {currentStepId === 'welcome' ? (
        // Welcome-only: heroBg stays the full image column (same treatment
        // as SplitStepImage's non-animated markup), with the intro video
        // floating over it as its own portrait (9:16, matching the source
        // Short) card rather than replacing or squeezing the photo.
        <div className={cn('relative h-56 md:h-auto md:flex-1 overflow-hidden', imageOnRight ? 'md:order-2' : 'md:order-1')}>
          <img
            src={STEP_IMAGE.welcome}
            alt=""
            aria-hidden="true"
            className={cn('absolute inset-0 h-full w-full object-cover', imageOnRight ? 'split-image-mask-right-tight' : 'split-image-mask-left-tight')}
          />
          <div className="absolute inset-0 bg-scrim md:bg-black/10" />
          <div className={cn('hidden md:block absolute inset-0 pointer-events-none', imageOnRight ? 'split-image-overlay-right-tight' : 'split-image-overlay-left-tight')} />
          <p className="absolute bottom-4 left-4 md:bottom-8 md:left-8 font-auth-display italic photo-text text-sosrg-lg">{STEP_CAPTION.welcome}</p>
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <div className="relative w-52 sm:w-64 md:w-72 aspect-9/16 rounded-xl overflow-hidden shadow-elevation-2 ring-1 ring-white/15">
              <iframe
                src="https://www.youtube.com/embed/iBYrEWOTBJo?rel=0"
                title="Bihar Untold — Introduction"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      ) : (
        <SplitStepImage image={STEP_IMAGE[currentStepId]} caption={STEP_CAPTION[currentStepId]} imageOnRight={imageOnRight} stepKey={currentStepId} direction={direction} wide />
      )}
      <div className={cn('flex flex-col justify-start px-6 py-10 sm:px-12 md:px-16', imageOnRight ? 'md:order-1' : 'md:order-2')}>
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
    <div className="min-h-screen flex flex-col">
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
