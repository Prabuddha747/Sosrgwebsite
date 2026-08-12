import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Briefcase, Building2, Camera, Check, ChevronLeft, Clapperboard, Landmark, Theater } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { profilesService } from '../../services/profiles';
import type { ApiProfileType, Profession } from '../../services/profiles';
import { ApiError } from '../../services/httpClient';
import { Button, Input, Textarea, useToast } from '../../design-system';
import { SelectTile, SplitStepImage, StepIndicator, StepTransition } from '../../components/wizard/WizardKit';
import { cn } from '../../lib/utils';

import logo from '../../assets/logo.jpg';
import onSetImage from '../../assets/community/on-set.png';
import auditionImage from '../../assets/community/audition.png';
import backstageImage from '../../assets/community/backstage.png';
import workshopImage from '../../assets/community/workshop.png';
import openMicImage from '../../assets/community/open-mic.png';

type StepId = 'type' | 'profession' | 'details' | 'review' | 'welcome';

const TYPE_OPTIONS: { value: ApiProfileType; label: string; icon: typeof Theater; description: string }[] = [
  { value: 'artist', label: 'Artist', icon: Theater, description: 'Actor, dancer, singer, writer — any individual performer or creator' },
  { value: 'model', label: 'Model', icon: Camera, description: 'Print, fashion, or commercial modelling' },
  { value: 'business', label: 'Business / Studio', icon: Building2, description: 'Production house, studio, or brand' },
  { value: 'casting_director', label: 'Casting Director', icon: Clapperboard, description: 'Running auditions and casting calls' },
  { value: 'industry_professional', label: 'Industry Professional', icon: Briefcase, description: 'Crew, technician, or other industry role' },
  { value: 'arts_organisation', label: 'Arts Organisation', icon: Landmark, description: 'Theatre group, gallery, or arts institution' },
];

// professionId is required by business rule (not the schema) for these two
// profile types, per the live API's confirmed behavior.
const PROFESSION_REQUIRED_TYPES: ApiProfileType[] = ['artist', 'model'];

// intent=artist / intent=studio comes from the homepage's "I'm an Artist" /
// "I'm a Studio" CTAs, carried through /signup as a query param — this just
// preselects the matching tile below, it never removes the others.
const INTENT_TO_TYPE: Record<string, ApiProfileType> = { artist: 'artist', studio: 'business' };

// Real photos already in the project (src/assets/community) — no new
// sourcing needed for this rebuild, these already cover every step
// thematically (on-set → "I am", audition → profession, backstage →
// details, workshop → review, open-mic → welcome/group).
const STEP_IMAGE: Record<StepId, string> = {
  type: onSetImage,
  profession: auditionImage,
  details: backstageImage,
  review: workshopImage,
  welcome: openMicImage,
};

const STEP_CAPTION: Record<StepId, string> = {
  type: 'Where every artist belongs.',
  profession: 'Get discovered for what you do best.',
  details: 'A profile that opens doors.',
  review: 'Almost there.',
  welcome: "You're in.",
};

const STEP_LABEL: Record<Exclude<StepId, 'welcome'>, string> = {
  type: 'I am',
  profession: 'Profession',
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
  const [profileType, setProfileType] = useState<ApiProfileType | null>(
    intent && INTENT_TO_TYPE[intent] ? INTENT_TO_TYPE[intent] : null,
  );
  const [professionId, setProfessionId] = useState('');
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [pincode, setPincode] = useState('');
  const [bio, setBio] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  const [currentStepId, setCurrentStepId] = useState<StepId>('type');
  const [error, setError] = useState<string>();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    profilesService
      .getProfessions()
      .then(setProfessions)
      .catch(() => setProfessions([]))
      .finally(() => setProfessionsLoading(false));
  }, []);

  const professionRequired = profileType != null && PROFESSION_REQUIRED_TYPES.includes(profileType);

  const stepOrder = useMemo<StepId[]>(
    () => (professionRequired ? ['type', 'profession', 'details', 'review'] : ['type', 'details', 'review']),
    [professionRequired],
  );

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
  const detailsValid = usernameValid && displayName.trim().length > 0;

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
      });
      if (bio || dateOfBirth) {
        try {
          await profilesService.updateProfile({ bio: bio || undefined, dateOfBirth: dateOfBirth || undefined });
          await refreshProfile();
        } catch {
          // Profile itself was created fine — bio/DOB can still be added
          // from Profile → Basic Information if this follow-up call fails.
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

  // Image side alternates left/right per step instead of always sitting in
  // the same place — an intentional bit of rhythm across the flow rather
  // than a static split.
  const imageOnRight = currentIndex % 2 === 0;

  return (
    <div className="min-h-dvh flex flex-col md:flex-row">
      {/* Logo stays fixed at the page's top-left corner regardless of which
          side the image/content are currently on, instead of traveling with
          the content column. Text color flips depending on what's actually
          under it (photo vs. cream). */}
      <Link
        to="/"
        className={cn(
          'sosrg-focus-ring fixed top-6 left-6 z-20 inline-flex items-center gap-2.5',
          !imageOnRight ? 'photo-text' : 'text-text-primary',
        )}
      >
        <img src={logo} alt="" className="w-11 h-11 rounded-lg object-cover" />
        <span className="font-auth-display text-sosrg-xl">SosrG</span>
      </Link>

      <SplitStepImage image={STEP_IMAGE[currentStepId]} caption={STEP_CAPTION[currentStepId]} imageOnRight={imageOnRight} stepKey={currentStepId} direction={direction} />

      <div className={cn('flex-1 md:w-1/2 flex flex-col justify-center px-6 py-10 sm:px-12 md:px-16', imageOnRight ? 'md:order-1' : 'md:order-2')}>
        <div className="w-full max-w-lg mx-auto md:mx-0 mt-16 md:mt-0">
          {currentStepId !== 'welcome' && (
            <StepIndicator steps={stepOrder.map((s) => STEP_LABEL[s as Exclude<StepId, 'welcome'>])} currentIndex={currentIndex} />
          )}

          <StepTransition stepKey={currentStepId} direction={direction}>
            {currentStepId === 'type' && (
              <div>
                <h1 className="font-auth-display text-sosrg-3xl text-text-primary mb-2">I am…</h1>
                <p className="font-body text-sosrg-base text-text-muted mb-8">Select the option that describes you best.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {TYPE_OPTIONS.map((opt) => (
                    <SelectTile key={opt.value} selected={profileType === opt.value} onClick={() => setProfileType(opt.value)}>
                      <opt.icon size={22} className={profileType === opt.value ? 'text-gold-700' : 'text-text-muted'} />
                      <div className="font-body font-semibold text-sosrg-sm text-text-primary mt-2">{opt.label}</div>
                      <div className="font-body text-sosrg-xs text-text-muted mt-0.5">{opt.description}</div>
                    </SelectTile>
                  ))}
                </div>
                <div className="flex justify-end mt-8">
                  <Button onClick={goNext} disabled={!profileType}>
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {currentStepId === 'profession' && (
              <div>
                <button onClick={goBack} className="sosrg-focus-ring flex items-center gap-1 text-sosrg-sm text-text-muted hover:text-text-primary mb-4">
                  <ChevronLeft size={16} /> Back
                </button>
                <h1 className="font-auth-display text-sosrg-3xl text-text-primary mb-2">Choose your profession</h1>
                <p className="font-body text-sosrg-base text-text-muted mb-8">Select the role that fits you most.</p>

                {professionsLoading ? (
                  <p className="font-body text-sosrg-base text-text-muted">Loading professions…</p>
                ) : professions.length === 0 ? (
                  <p className="font-body text-sosrg-base text-text-muted italic">
                    No professions are listed yet — you can skip this and add one later from your profile.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {professions.map((p) => (
                      <SelectTile key={p.id} selected={professionId === String(p.id)} onClick={() => { setProfessionId(String(p.id)); goNext(); }}>
                        <div className="font-body text-sosrg-xs uppercase tracking-widest text-gold-700">{p.industry}</div>
                        <div className="font-body font-semibold text-sosrg-sm text-text-primary mt-0.5">{p.name}</div>
                      </SelectTile>
                    ))}
                  </div>
                )}

                <div className="flex justify-end mt-8">
                  <Button variant="ghost" onClick={goNext}>
                    Skip for now
                  </Button>
                </div>
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
                  <Input
                    label="Username"
                    required
                    pattern="[a-zA-Z0-9_]+"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    error={username && !usernameValid ? 'Letters, numbers, and underscores only.' : undefined}
                  />
                  <Input label="Display name" required value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                  <Input label="Pincode (optional)" value={pincode} onChange={(e) => setPincode(e.target.value)} />
                  <Textarea label="Bio (optional)" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell us about yourself, your journey, and what you love to do…" />
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
