import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { BookOpen, Briefcase, Building2, Camera, Check, ChevronLeft, Clapperboard, Film, Landmark, Loader2, Music, Palette, Scissors, Theater, Users, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { profilesService } from '../../services/profiles';
import type { ApiProfileType, Profession } from '../../services/profiles';
import { ApiError } from '../../services/httpClient';
import { Button, Input, Select, useToast } from '../../design-system';
import { SelectTile, SplitStepImage, StepIndicator, StepTransition } from '../../components/wizard/WizardKit';
import { cn } from '../../lib/utils';

import logo from '../../assets/logo.jpg';
import craftImage from '../../assets/community/craft.png';
import auditionImage from '../../assets/community/audition.png';
import backstageImage from '../../assets/community/backstage.png';
import workshopImage from '../../assets/community/workshop.png';
import openMicImage from '../../assets/community/open-mic.png';

type StepId = 'industry' | 'profession' | 'details' | 'review' | 'welcome';

// Fixed top-level industry categories — the 7 Core Creative Sectors. Values
// match the live GET /v1/professions industry strings for all 7 sectors
// (curl-verified live, 2026-08-23 — the catalogue was backfilled from its
// earlier 5-row/4-industry state; see doc/API_REQUIREMENTS.md §2.4h). The
// industryHasNoCatalogueProfessions gate below is still worth keeping even
// though every industry has entries today — it's what makes a future gap
// in the catalogue fail safe instead of dead-ending signup.
const INDUSTRIES: { value: string; label: string; icon: typeof Theater; description: string }[] = [
  { value: 'Literature', label: 'Literature', icon: BookOpen, description: 'Writing, poetry, publishing, storytelling' },
  { value: 'Theatre', label: 'Theatre', icon: Theater, description: 'Stage performance, theatre production, dramaturgy' },
  { value: 'Cinema', label: 'Cinema', icon: Film, description: 'Film, filmmaking, acting, production' },
  { value: 'Music', label: 'Music', icon: Music, description: 'Singing, instrumental performance, composition, production' },
  { value: 'Dance', label: 'Dance', icon: Users, description: 'Dance performance, choreography, movement' },
  { value: 'Art & Design', label: 'Art & Design', icon: Palette, description: 'Visual art, illustration, photography, graphic/product/fashion design' },
  { value: 'Craft', label: 'Craft', icon: Scissors, description: 'Handcraft, traditional arts, artisan work, material-based creation' },
];

// Curated per-industry profession picker — richer than the live catalogue
// (GET /v1/professions, ~27 rows across all 7 industries as of the
// 2026-08-23 backfill) so the picker reads as a real, complete list rather
// than whatever's been seeded so far. Selecting an item checks it against the live catalogue
// (case-insensitive, scoped to the chosen industry) at render time: a real
// match submits the real professionId; no match falls through to the
// existing free-text `headline` field so nothing fake is ever submitted as
// a profession ID. This list intentionally names a few items to match the
// live catalogue's exact wording (e.g. "Film Director", "Lead Actor /
// Actress", "Vocalist & Composer", "Stage Performer", "Creative Director")
// so those specific picks resolve to a real professionId today.
const CURATED_PROFESSIONS: Record<string, { category: string; items: string[] }[]> = {
  Theatre: [
    { category: 'Performance', items: ['Actor', 'Stage Performer', 'Comedian', 'Puppeteer', 'Dancer / Movement Performer'] },
    { category: 'Direction & Creation', items: ['Theatre Director', 'Playwright', 'Dramaturg', 'Choreographer', 'Movement Director'] },
    { category: 'Production & Technical', items: ['Producer', 'Stage Manager', 'Production Designer', 'Set Designer', 'Costume Designer', 'Lighting Designer', 'Sound Designer', 'Technical Director'] },
    { category: 'Other', items: ['Theatre Educator', 'Critic / Reviewer', 'Theatre Researcher', 'Casting Director'] },
  ],
  Cinema: [
    { category: 'Performance', items: ['Lead Actor / Actress', 'Supporting Actor', 'Child Artist', 'Voice Artist', 'Stunt Performer', 'Dancer', 'Model'] },
    { category: 'Direction & Writing', items: ['Film Director', 'Assistant Director', 'Screenwriter', 'Scriptwriter', 'Story Writer', 'Dialogue Writer'] },
    { category: 'Production', items: ['Producer', 'Executive Producer', 'Line Producer', 'Production Manager', 'Production Coordinator', 'Casting Director', 'Casting Associate'] },
    { category: 'Camera & Visual', items: ['Cinematographer / DOP', 'Camera Operator', 'Focus Puller', 'Gaffer', 'Lighting Technician'] },
    { category: 'Post-Production', items: ['Film Editor', 'Colorist', 'VFX Artist', 'VFX Supervisor', 'Motion Graphics Artist', 'Sound Designer', 'Foley Artist', 'Re-recording / Mixing Engineer'] },
    { category: 'Art Department', items: ['Production Designer', 'Art Director', 'Set Designer', 'Costume Designer', 'Makeup Artist', 'Hair Stylist', 'Prop Designer'] },
    { category: 'Other', items: ['Film Critic', 'Film Researcher', 'Film Educator', 'Film Festival Professional'] },
  ],
  Music: [
    { category: 'Performance', items: ['Singer / Vocalist', 'Vocalist & Composer', 'Instrumentalist', 'Musician', 'DJ', 'Live Performer', 'Session Musician'] },
    { category: 'Creation', items: ['Composer', 'Songwriter', 'Lyricist', 'Music Producer', 'Arranger', 'Beat Maker'] },
    { category: 'Technical', items: ['Sound Engineer', 'Recording Engineer', 'Mixing Engineer', 'Mastering Engineer', 'Live Sound Engineer'] },
    { category: 'Industry', items: ['Music Director', 'A&R Professional', 'Music Manager', 'Tour Manager', 'Music Publisher', 'Label Professional'] },
    { category: 'Other', items: ['Music Educator', 'Music Critic', 'Music Researcher'] },
  ],
  Dance: [
    { category: 'Performance', items: ['Dancer', 'Contemporary Dancer', 'Classical Dancer', 'Folk Dancer', 'Street / Hip-Hop Dancer'] },
    { category: 'Creation', items: ['Choreographer', 'Assistant Choreographer', 'Movement Director', 'Dance Director'] },
    { category: 'Teaching', items: ['Dance Teacher', 'Dance Instructor', 'Dance Coach', 'Dance Academy Professional'] },
    { category: 'Production', items: ['Dance Producer', 'Dance Company Professional', 'Stage / Performance Designer'] },
    { category: 'Other', items: ['Dance Researcher', 'Dance Critic', 'Dance Therapist / Movement Practitioner'] },
  ],
  'Art & Design': [
    { category: 'Visual Art', items: ['Painter', 'Illustrator', 'Sculptor', 'Printmaker', 'Digital Artist', 'Installation Artist', 'Mixed-Media Artist', 'Visual Artist'] },
    { category: 'Photography & Image', items: ['Photographer', 'Photojournalist', 'Commercial Photographer', 'Fashion Photographer'] },
    { category: 'Design', items: ['Graphic Designer', 'UI/UX Designer', 'Product Designer', 'Fashion Designer', 'Interior Designer', 'Industrial Designer', 'Motion Designer'] },
    { category: 'Creative Direction', items: ['Creative Director', 'Art Director', 'Visual Director', 'Brand Designer'] },
    { category: 'Other', items: ['Curator', 'Art Educator', 'Art Critic', 'Art Researcher', 'Gallery Professional'] },
  ],
  Literature: [
    { category: 'Writing', items: ['Author', 'Novelist', 'Short Story Writer', 'Poet', 'Essayist', 'Playwright', 'Screenwriter', 'Copywriter', 'Content Writer'] },
    { category: 'Language', items: ['Translator', 'Editor', 'Proofreader', 'Literary Translator'] },
    { category: 'Publishing', items: ['Publisher', 'Literary Agent', 'Publishing Professional', 'Book Editor'] },
    { category: 'Research & Criticism', items: ['Literary Critic', 'Literature Researcher', 'Academic / Scholar', 'Reviewer'] },
    { category: 'Other', items: ['Storyteller', 'Spoken Word Artist'] },
  ],
  Craft: [
    { category: 'Craft & Making', items: ['Artisan', 'Craftsperson', 'Handicraft Artist', 'Maker', 'Sculptor', 'Woodworker', 'Potter / Ceramic Artist', 'Metalworker', 'Leatherworker', 'Textile Artist'] },
    { category: 'Traditional & Cultural Craft', items: ['Folk Artist', 'Traditional Artisan', 'Heritage Craftsperson', 'Handloom Artisan', 'Embroidery Artist', 'Weaving Artist', 'Basketry / Natural Fibre Artisan'] },
    { category: 'Fashion & Wearable Craft', items: ['Jewellery Designer', 'Jewellery Maker', 'Textile Designer', 'Costume Craftsperson', 'Accessory Designer'] },
    { category: 'Design & Commercial', items: ['Craft Designer', 'Product Maker', 'Custom Maker', 'Props / Model Maker', 'Set / Scenic Craftsperson'] },
    { category: 'Business & Practice', items: ['Craft Entrepreneur', 'Craft Studio Owner', 'Craft Educator', 'Craft Workshop Facilitator', 'Craft Curator', 'Craft Researcher'] },
  ],
};

const TYPE_OPTIONS: { value: ApiProfileType; label: string; icon: typeof Theater; description: string }[] = [
  { value: 'artist', label: 'Artist', icon: Theater, description: 'Actor, dancer, singer, writer — any individual performer or creator' },
  { value: 'model', label: 'Model', icon: Camera, description: 'Print, fashion, or commercial modelling' },
  { value: 'business', label: 'Business / Studio', icon: Building2, description: 'Production house, studio, or brand' },
  { value: 'casting_director', label: 'Casting Director', icon: Clapperboard, description: 'Running auditions and casting calls' },
  { value: 'industry_professional', label: 'Industry Professional', icon: Briefcase, description: 'Crew, technician, or other industry role' },
  { value: 'arts_organisation', label: 'Arts Organisation', icon: Landmark, description: 'Theatre group, gallery, or arts institution' },
];

// The "I am" step used to ask account type on its own, showing the same 6
// cards regardless of industry — a Craft signup saw "Model"/"Casting
// Director" as if they were real options. Account type is now inferred
// directly from what's picked on the profession step instead: picking
// "Model" sets profileType='model', anything else individual sets 'artist'.
// Business/Studio, Casting Director, Industry Professional, and Arts
// Organisation don't fit any individual profession list at all — they're
// employer/organisation-side accounts, not creator professions (explicit
// product direction) — so they live behind the "I'm Hiring / an
// Organisation" toggle on that same step instead of a merged profession
// list.
const ORG_TYPE_OPTIONS = TYPE_OPTIONS.filter((t) => t.value !== 'artist' && t.value !== 'model');

// Only "Model" among the curated profession labels maps to a different
// profileType than the 'artist' default — everyone else picking an
// individual profession (Actor, Director, Artisan, Choreographer, ...) is
// an 'artist' account, matching that type's own "any individual performer
// or creator" description.
const CREATOR_PROFESSION_TYPE: Record<string, ApiProfileType> = { Model: 'model' };

// professionId is required by business rule (not the schema) for these two
// profile types, per the live API's confirmed behavior.
const PROFESSION_REQUIRED_TYPES: ApiProfileType[] = ['artist', 'model'];

// intent=artist / intent=studio comes from the homepage's "I'm an Artist" /
// "I'm a Studio" CTAs, carried through /signup as a query param — this just
// preselects the matching tile below, it never removes the others.
const INTENT_TO_TYPE: Record<string, ApiProfileType> = { artist: 'artist', studio: 'business' };

const GENDER_OPTIONS = [
  { value: '', label: 'Select…' },
  { value: 'female', label: 'Female' },
  { value: 'male', label: 'Male' },
  { value: 'non_binary', label: 'Non-binary' },
  { value: 'prefer_not_to_say', label: 'Prefer not to say' },
];

// Real photos already in the project (src/assets/community) — no new
// sourcing needed for this rebuild, these already cover every step
// thematically (on-set → "I am", audition → profession, backstage →
// details, workshop → review, open-mic → welcome/group).
const STEP_IMAGE: Record<StepId, string> = {
  industry: craftImage,
  profession: auditionImage,
  details: backstageImage,
  review: workshopImage,
  welcome: openMicImage,
};

const STEP_CAPTION: Record<StepId, string> = {
  industry: 'Every craft has a home here.',
  profession: 'Get discovered for what you do best.',
  details: 'A profile that opens doors.',
  review: 'Almost there.',
  welcome: "You're in.",
};

const STEP_LABEL: Record<Exclude<StepId, 'welcome'>, string> = {
  industry: 'Industry',
  profession: 'You',
  details: 'Details',
  review: 'Complete',
};

export const ProfileSetupPage = () => {
  const { createProfile, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const { show } = useToast();
  const [searchParams] = useSearchParams();

  const [professions, setProfessions] = useState<Profession[]>([]);
  const [professionsLoading, setProfessionsLoading] = useState(true);

  const intent = searchParams.get('intent');
  const initialProfileType = intent && INTENT_TO_TYPE[intent] ? INTENT_TO_TYPE[intent] : null;
  const [profileType, setProfileType] = useState<ApiProfileType | null>(initialProfileType);
  // Which half of the merged "You" step is showing — creator (profession
  // picker, the common case) or hiring/organisation (the 4 employer-side
  // account types). intent=studio starts on the hiring side to match.
  const [personaTab, setPersonaTab] = useState<'creator' | 'hiring'>(
    initialProfileType && initialProfileType !== 'artist' ? 'hiring' : 'creator',
  );
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [professionId, setProfessionId] = useState('');
  // Optional extra professions beyond the primary (e.g. a musician who also
  // acts) — same catalogue-backed idea as the single "Second Profession /
  // Other Interest" editor already on the profile page (ProfileSystem.tsx),
  // just offered up front and allowing more than one. Not industry-scoped:
  // the catalogue's own `industry` field on each entry is what lets these
  // cross into a different sector than the primary pick.
  const [secondProfessionIds, setSecondProfessionIds] = useState<string[]>([]);
  const [headline, setHeadline] = useState('');
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [pincode, setPincode] = useState('');
  const [genderIdentity, setGenderIdentity] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  const [currentStepId, setCurrentStepId] = useState<StepId>('industry');
  const [error, setError] = useState<string>();
  const [submitting, setSubmitting] = useState(false);

  // Debounced live username-availability check: GET /v1/profiles/{username}
  // returns null (404 PROFILE_NOT_FOUND) when it's free, a profile when
  // it's taken — no dedicated availability endpoint exists, this repurposes
  // the public-profile lookup already used by PublicProfilePage.
  const [usernameStatus, setUsernameStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle');

  useEffect(() => {
    profilesService
      .getProfessions()
      .then(setProfessions)
      .catch(() => setProfessions([]))
      .finally(() => setProfessionsLoading(false));
  }, []);

  useEffect(() => {
    if (!username || !/^[a-zA-Z0-9_]+$/.test(username)) {
      setUsernameStatus('idle');
      return;
    }
    setUsernameStatus('checking');
    const timeout = setTimeout(() => {
      profilesService
        .getPublicProfile(username)
        .then((profile) => setUsernameStatus(profile ? 'taken' : 'available'))
        .catch(() => setUsernameStatus('idle'));
    }, 500);
    return () => clearTimeout(timeout);
  }, [username]);

  const professionRequired = profileType != null && PROFESSION_REQUIRED_TYPES.includes(profileType);

  // Industry + the merged "You" step now apply to every signup — account
  // type no longer gates which steps show, it's an outcome of the "You"
  // step instead of a precondition for it.
  const stepOrder = useMemo<StepId[]>(() => ['industry', 'profession', 'details', 'review'], []);

  const switchToCreatorTab = () => {
    setPersonaTab('creator');
    if (profileType !== 'artist' && profileType !== 'model') setProfileType('artist');
  };
  const switchToHiringTab = () => {
    setPersonaTab('hiring');
    if (profileType === 'artist' || profileType === 'model') {
      setProfileType(null);
      setProfessionId('');
      setSecondProfessionIds([]);
      setHeadline('');
    }
  };

  const currentIndex = stepOrder.indexOf(currentStepId);
  const [direction, setDirection] = useState(1);
  const goNext = () => {
    const next = stepOrder[currentIndex + 1];
    if (next) {
      setDirection(1);
      setCurrentStepId(next);
    }
  };
  const goBack = () => {
    const prev = stepOrder[currentIndex - 1];
    if (prev) {
      setDirection(-1);
      setCurrentStepId(prev);
    }
  };

  const usernameValid = /^[a-zA-Z0-9_]+$/.test(username);
  const detailsValid =
    usernameValid &&
    usernameStatus !== 'taken' &&
    displayName.trim().length > 0 &&
    pincode.trim().length > 0 &&
    genderIdentity.trim().length > 0;

  const handleSubmit = async () => {
    if (!profileType) return;
    setError(undefined);
    setSubmitting(true);
    try {
      await createProfile({
        profileType,
        username,
        displayName,
        professionId: professionRequired && professionId ? Number(professionId) : undefined,
        pincode: pincode || undefined,
        headline: headline.trim() || undefined,
      });
      if (genderIdentity || dateOfBirth) {
        try {
          await profilesService.updateProfile({
            genderIdentity: genderIdentity || undefined,
            dateOfBirth: dateOfBirth || undefined,
          });
          await refreshProfile();
        } catch {
          // Profile itself was created fine — gender/DOB can still be added
          // from Profile → Basic Information if this follow-up call fails.
        }
      }
      if (secondProfessionIds.length > 0 && professionId) {
        try {
          await profilesService.updateProfessions({
            professionIds: [Number(professionId), ...secondProfessionIds.map(Number)],
            primaryProfessionId: Number(professionId),
          });
          await refreshProfile();
        } catch {
          // Profile itself was created fine — extra professions can still be
          // added from Profile → Basic Information if this follow-up call fails.
        }
      }
      setCurrentStepId('welcome');
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Something went wrong. Please try again.';
      setError(message);
      show(message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const selectedTypeOption = TYPE_OPTIONS.find((t) => t.value === profileType);
  const selectedProfession = professions.find((p) => String(p.id) === professionId);
  const secondSelectedProfessions = professions.filter((p) => secondProfessionIds.includes(String(p.id)));

  // Artist/model profiles require a real professionId server-side (verified
  // live: POST /v1/profiles 4xxs with "Artist and model profiles require a
  // primary profession ID" when it's missing). Every industry has catalogue
  // entries today (doc/API_REQUIREMENTS.md §2.4h), but an industry with zero
  // entries would otherwise let someone fill in the whole Creator form and
  // only find out it can't submit at the very end — this check surfaces
  // that up front instead, and keeps working if the catalogue ever regresses.
  const industryHasNoCatalogueProfessions =
    !professionsLoading && selectedIndustry !== '' && !professions.some((p) => p.industry === selectedIndustry);

  // When the just-picked industry has no real professions behind it, Creator
  // signup can't complete at all (see above) — so the moment that's known,
  // land the user straight on the tab that actually works for them instead
  // of letting them fill in a profession that dead-ends at submit. Only
  // fires one-way (creator -> hiring): the hiring/organisation tab never
  // becomes non-viable, so there's nothing to auto-switch back for.
  useEffect(() => {
    if (industryHasNoCatalogueProfessions && personaTab === 'creator') {
      switchToHiringTab();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [industryHasNoCatalogueProfessions]);

  // Image side alternates left/right per step instead of always sitting in
  // the same place — an intentional bit of rhythm across the flow rather
  // than a static split.
  const imageOnRight = currentIndex % 2 === 0;

  return (
    <div className="min-h-dvh flex flex-col md:flex-row relative">
      {/* Logo sits at the page's top-left corner regardless of which side the
          image/content are currently on, instead of traveling with the
          content column. Positioned relative to this outer container (not
          `fixed` to the viewport) so it scrolls away with the page instead
          of staying pinned over the step indicator on tall steps. Text
          color flips depending on what's actually under it (photo vs.
          cream). */}
      <Link
        to="/"
        className={cn(
          'sosrg-focus-ring absolute top-6 left-6 z-20 inline-flex items-center gap-2.5',
          !imageOnRight ? 'photo-text' : 'text-text-primary',
        )}
      >
        <img src={logo} alt="" className="w-11 h-11 rounded-lg object-cover" />
        <span className="font-auth-display text-sosrg-xl">SosrG</span>
      </Link>

      <SplitStepImage image={STEP_IMAGE[currentStepId]} caption={STEP_CAPTION[currentStepId]} imageOnRight={imageOnRight} stepKey={currentStepId} direction={direction} />

      <div className={cn('flex-1 md:w-1/2 flex flex-col justify-center px-6 py-10 sm:px-12 md:px-16', imageOnRight ? 'md:order-1' : 'md:order-2')}>
        <div className={cn('w-full mx-auto md:mx-0 mt-16 md:mt-0', currentStepId === 'profession' ? 'max-w-3xl' : 'max-w-lg')}>
          {currentStepId !== 'welcome' && (
            <StepIndicator steps={stepOrder.map((s) => STEP_LABEL[s as Exclude<StepId, 'welcome'>])} currentIndex={currentIndex} />
          )}

          <StepTransition stepKey={currentStepId} direction={direction}>
            {currentStepId === 'industry' && (
              <div>
                <h1 className="font-auth-display text-sosrg-3xl text-text-primary mb-2">Choose your industry</h1>
                <p className="font-body text-sosrg-base text-text-muted mb-8">Select the Core Creative Sector you work in.</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {INDUSTRIES.map((ind) => (
                    <SelectTile
                      key={ind.value}
                      selected={selectedIndustry === ind.value}
                      onClick={() => { setSelectedIndustry(ind.value); setProfessionId(''); setSecondProfessionIds([]); goNext(); }}
                    >
                      <ind.icon size={22} className={selectedIndustry === ind.value ? 'text-gold-700' : 'text-text-muted'} />
                      <div className="font-body font-semibold text-sosrg-sm text-text-primary mt-2">{ind.label}</div>
                      <div className="font-body text-sosrg-xs text-text-muted mt-0.5">{ind.description}</div>
                    </SelectTile>
                  ))}
                </div>
              </div>
            )}

            {currentStepId === 'profession' && (
              <div>
                <button onClick={goBack} className="sosrg-focus-ring flex items-center gap-1 text-sosrg-sm text-text-muted hover:text-text-primary mb-4">
                  <ChevronLeft size={16} /> Back
                </button>

                <div className="flex gap-2 mb-3">
                  <button
                    type="button"
                    disabled={industryHasNoCatalogueProfessions}
                    onClick={switchToCreatorTab}
                    title={industryHasNoCatalogueProfessions ? `Creator signup for ${selectedIndustry} isn't available yet` : undefined}
                    className={cn(
                      'sosrg-focus-ring px-4 py-2 rounded-full text-sosrg-sm font-body font-semibold border transition-colors',
                      industryHasNoCatalogueProfessions
                        ? 'bg-cream-100 border-cream-200 text-text-muted opacity-50 cursor-not-allowed'
                        : personaTab === 'creator'
                          ? 'bg-gold-500 border-gold-500 text-cream-50'
                          : 'bg-cream-50 border-cream-200 text-text-primary hover:border-gold-500',
                    )}
                  >
                    I'm a Creator
                  </button>
                  <button
                    type="button"
                    onClick={switchToHiringTab}
                    className={cn(
                      'sosrg-focus-ring px-4 py-2 rounded-full text-sosrg-sm font-body font-semibold border transition-colors',
                      personaTab === 'hiring'
                        ? 'bg-gold-500 border-gold-500 text-cream-50'
                        : 'bg-cream-50 border-cream-200 text-text-primary hover:border-gold-500',
                    )}
                  >
                    I'm Hiring / an Organisation
                  </button>
                </div>

                {industryHasNoCatalogueProfessions && (
                  <p className="font-body text-sosrg-xs text-text-muted mb-6">
                    Creator signup for <span className="font-semibold text-text-primary">{selectedIndustry}</span> is
                    coming soon — we're still building out its profession list. You're all set to continue as a{' '}
                    <span className="font-semibold text-text-primary">Business/Studio or organisation</span> in{' '}
                    {selectedIndustry} right now, and you'll be able to switch to a Creator profile the moment it's ready.
                  </p>
                )}

                {!industryHasNoCatalogueProfessions && intent && INTENT_TO_TYPE[intent] && (
                  <p className="font-body text-sosrg-xs text-text-muted mb-6 -mt-3">
                    {intent === 'artist'
                      ? "You came in through Join as a Creator, so that's picked for you below. "
                      : "You came in through I'm Hiring, so that's picked for you below. "}
                    {personaTab === 'creator' ? 'Hiring instead?' : 'Creating instead?'}{' '}
                    <button type="button" onClick={personaTab === 'creator' ? switchToHiringTab : switchToCreatorTab} className="sosrg-focus-ring text-gold-700 underline underline-offset-2 hover:text-gold-500">
                      switch to {personaTab === 'creator' ? "I'm Hiring" : "I'm a Creator"}
                    </button>{' '}
                    any time, no need to start over.
                  </p>
                )}

                {personaTab === 'creator' ? (
                  <>
                    <h1 className="font-auth-display text-sosrg-3xl text-text-primary mb-2">Select your profession</h1>
                    <p className="font-body text-sosrg-base text-text-muted mb-8">Select your primary profession in {selectedIndustry}.</p>

                    <p className="font-body text-sosrg-xs text-text-muted mb-4 -mt-4">
                      Tap a profession to set it as primary, tap others to add them too — double-tap an added one to make it your primary instead.
                    </p>

                    {professionsLoading ? (
                      <p className="font-body text-sosrg-base text-text-muted">Loading professions…</p>
                    ) : (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6 max-h-[420px] overflow-y-auto pr-2">
                        {(CURATED_PROFESSIONS[selectedIndustry] ?? []).map((group) => (
                          <div key={group.category}>
                            <div className="font-body text-sosrg-xs uppercase tracking-widest text-gold-700 mb-2">{group.category}</div>
                            <div className="flex flex-wrap gap-2">
                              {group.items.map((item) => {
                                const match = professions.find(
                                  (p) => p.industry === selectedIndustry && p.name.toLowerCase() === item.toLowerCase(),
                                );
                                const matchId = match ? String(match.id) : undefined;
                                const isPrimary = matchId ? professionId === matchId : headline === item;
                                const isSecondary = matchId ? secondProfessionIds.includes(matchId) : false;
                                return (
                                  <button
                                    key={item}
                                    type="button"
                                    onClick={() => {
                                      if (!match) {
                                        // No live catalogue entry — this curated label can't
                                        // take part in the primary/secondary set (no numeric
                                        // id to submit). If nothing is picked yet it becomes the
                                        // free-text headline primary; if a real primary is
                                        // already set, leave everything alone instead of
                                        // wiping out picks that were actually valid — most
                                        // curated labels per industry have no live match today,
                                        // so this used to nuke the whole selection on a single
                                        // stray click.
                                        if (professionId) return;
                                        setSecondProfessionIds([]);
                                        setHeadline(item);
                                        setProfileType(CREATOR_PROFESSION_TYPE[item] ?? 'artist');
                                        return;
                                      }
                                      // Already primary or already a secondary — leave it as-is on
                                      // a single click; double-click is what promotes a secondary,
                                      // so a plain click here must stay a no-op.
                                      if (matchId === professionId || secondProfessionIds.includes(matchId)) return;
                                      if (!professionId) {
                                        setProfessionId(matchId);
                                        setHeadline('');
                                        setProfileType(CREATOR_PROFESSION_TYPE[item] ?? 'artist');
                                      } else {
                                        setSecondProfessionIds((ids) => [...ids, matchId]);
                                      }
                                    }}
                                    onDoubleClick={() => {
                                      if (!match || !secondProfessionIds.includes(matchId)) return;
                                      // Promote this secondary pick to primary; the old primary
                                      // joins the rest as a secondary pick instead of being dropped.
                                      setSecondProfessionIds((ids) => [...ids.filter((id) => id !== matchId), professionId].filter(Boolean));
                                      setProfessionId(matchId);
                                      setProfileType(CREATOR_PROFESSION_TYPE[match.name] ?? 'artist');
                                    }}
                                    className={cn(
                                      'sosrg-focus-ring px-4 py-2 rounded-full text-sosrg-sm font-body transition-colors',
                                      isPrimary
                                        ? 'border-2 border-gold-500 bg-gold-500 text-cream-50 font-semibold'
                                        : isSecondary
                                          ? 'border-2 border-gold-500 bg-transparent text-gold-700 font-semibold'
                                          : 'border border-cream-200 bg-cream-50 text-text-primary hover:border-gold-500',
                                    )}
                                  >
                                    {item}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="mt-6">
                      <Input
                        label="Not seeing your exact profession? Tell us in a few words"
                        placeholder="e.g. Puppeteer, Sound Designer for regional theatre"
                        value={headline}
                        onChange={(e) => { setHeadline(e.target.value); setProfessionId(''); setSecondProfessionIds([]); setProfileType('artist'); }}
                      />
                    </div>

                    <div className="flex justify-end mt-8">
                      <Button variant={professionId || headline ? 'primary' : 'ghost'} onClick={goNext}>
                        {professionId || headline ? 'Continue' : 'Skip for now'}
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <h1 className="font-auth-display text-sosrg-3xl text-text-primary mb-2">What kind of organisation are you?</h1>
                    <p className="font-body text-sosrg-base text-text-muted mb-8">This becomes your account type — separate from any individual profession.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {ORG_TYPE_OPTIONS.map((opt) => (
                        <SelectTile key={opt.value} selected={profileType === opt.value} onClick={() => setProfileType(opt.value)}>
                          <opt.icon size={22} className={profileType === opt.value ? 'text-gold-700' : 'text-text-muted'} />
                          <div className="font-body font-semibold text-sosrg-sm text-text-primary mt-2">{opt.label}</div>
                          <div className="font-body text-sosrg-xs text-text-muted mt-0.5">{opt.description}</div>
                        </SelectTile>
                      ))}
                    </div>
                    <div className="flex justify-end mt-8">
                      <Button onClick={goNext} disabled={!profileType || profileType === 'artist' || profileType === 'model'}>
                        Continue
                      </Button>
                    </div>
                  </>
                )}
              </div>
            )}

            {currentStepId === 'details' && (
              <div>
                <button onClick={goBack} className="sosrg-focus-ring flex items-center gap-1 text-sosrg-sm text-text-muted hover:text-text-primary mb-4">
                  <ChevronLeft size={16} /> Back
                </button>
                <h1 className="font-auth-display text-sosrg-3xl text-text-primary mb-2">Let's complete your profile</h1>
                <p className="font-body text-sosrg-base text-text-muted mb-8">These details help others find and connect with you.</p>
                <div className="flex flex-col gap-4">
                  <Input label="Display name" required value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                  <Input
                    label="Username"
                    required
                    prefix="@"
                    pattern="[a-zA-Z0-9_]+"
                    placeholder="SosrG"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    error={
                      username.startsWith('@')
                        ? "No need to type @ — it's already there for you."
                        : username && !usernameValid
                          ? 'Letters, numbers, and underscores only.'
                          : usernameStatus === 'taken'
                            ? 'That username is already taken.'
                            : undefined
                    }
                    suffix={
                      usernameStatus === 'checking' ? (
                        <Loader2 size={16} className="animate-spin text-text-muted" />
                      ) : usernameStatus === 'available' ? (
                        <Check size={16} className="text-success" />
                      ) : usernameStatus === 'taken' ? (
                        <X size={16} className="text-danger" />
                      ) : undefined
                    }
                  />
                  <Select label="Gender" required options={GENDER_OPTIONS} value={genderIdentity} onChange={(e) => setGenderIdentity(e.target.value)} />
                  <Input label="Pincode" required value={pincode} onChange={(e) => setPincode(e.target.value)} />
                  <Input label="Date of birth (optional)" type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
                </div>
                <div className="flex justify-end mt-8">
                  <Button onClick={goNext} disabled={!detailsValid}>
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {currentStepId === 'review' && profileType && (
              <div>
                <button onClick={goBack} className="sosrg-focus-ring flex items-center gap-1 text-sosrg-sm text-text-muted hover:text-text-primary mb-4">
                  <ChevronLeft size={16} /> Back
                </button>
                <h1 className="font-auth-display text-sosrg-3xl text-text-primary mb-2">Review your profile</h1>
                <p className="font-body text-sosrg-base text-text-muted mb-8">You can always update these later from your profile.</p>

                <div className="rounded-xl bg-cream-100 border border-cream-200 p-[1em] flex flex-col gap-3">
                  {selectedTypeOption && (
                    <div className="flex items-center gap-3">
                      <selectedTypeOption.icon size={20} className="text-gold-700" />
                      <div>
                        <div className="font-body text-sosrg-xs text-text-muted">I am</div>
                        <div className="font-body font-semibold text-sosrg-sm text-text-primary">{selectedTypeOption.label}</div>
                      </div>
                    </div>
                  )}
                  {selectedProfession && (
                    <div>
                      <div className="font-body text-sosrg-xs text-text-muted">Profession</div>
                      <div className="font-body font-semibold text-sosrg-sm text-text-primary">{selectedProfession.name}</div>
                    </div>
                  )}
                  {secondSelectedProfessions.length > 0 && (
                    <div>
                      <div className="font-body text-sosrg-xs text-text-muted">
                        {secondSelectedProfessions.length === 1 ? 'Also' : 'Also professions'}
                      </div>
                      <div className="font-body font-semibold text-sosrg-sm text-text-primary">
                        {secondSelectedProfessions.map((p) => `${p.industry} — ${p.name}`).join(', ')}
                      </div>
                    </div>
                  )}
                  <div>
                    <div className="font-body text-sosrg-xs text-text-muted">Username</div>
                    <div className="font-body font-semibold text-sosrg-sm text-text-primary">@{username}</div>
                  </div>
                  <div>
                    <div className="font-body text-sosrg-xs text-text-muted">Display name</div>
                    <div className="font-body font-semibold text-sosrg-sm text-text-primary">{displayName}</div>
                  </div>
                  {pincode && (
                    <div>
                      <div className="font-body text-sosrg-xs text-text-muted">Pincode</div>
                      <div className="font-body font-semibold text-sosrg-sm text-text-primary">{pincode}</div>
                    </div>
                  )}
                </div>

                {error && (
                  <p role="alert" className="font-body text-sosrg-xs text-danger mt-4">
                    {error}
                  </p>
                )}

                <div className="flex justify-end mt-8">
                  <Button onClick={handleSubmit} disabled={submitting}>
                    {submitting ? 'Creating your profile…' : 'Create profile'}
                  </Button>
                </div>
              </div>
            )}

            {currentStepId === 'welcome' && (
              <div>
                <div className="w-16 h-16 rounded-full bg-gold-500/20 flex items-center justify-center mb-6">
                  <Check size={28} className="text-gold-700" />
                </div>
                <h1 className="font-auth-display text-sosrg-3xl text-text-primary mb-2">Welcome to SosrG!</h1>
                <p className="font-body text-sosrg-base text-text-muted mb-8">
                  Your profile is ready. You're now part of a creative community that's here to help you grow.
                </p>
                <Button onClick={() => navigate('/profile', { replace: true })}>
                  Go to Dashboard
                </Button>
              </div>
            )}
          </StepTransition>
        </div>
      </div>
    </div>
  );
};
