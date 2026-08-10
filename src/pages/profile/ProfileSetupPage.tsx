import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { profilesService } from '../../services/profiles';
import type { ApiProfileType, Profession } from '../../services/profiles';
import { ApiError } from '../../services/httpClient';
import { Button, Card, Input, Select, useToast } from '../../design-system';

const PROFILE_TYPE_OPTIONS: { value: ApiProfileType; label: string }[] = [
  { value: 'artist', label: 'Artist' },
  { value: 'model', label: 'Model' },
  { value: 'business', label: 'Business' },
  { value: 'casting_director', label: 'Casting Director' },
  { value: 'industry_professional', label: 'Industry Professional' },
  { value: 'arts_organisation', label: 'Arts Organisation' },
];

// professionId is required by business rule (not the schema) for these two
// profile types, per the live API's confirmed behavior.
const PROFESSION_REQUIRED_TYPES: ApiProfileType[] = ['artist', 'model'];

export const ProfileSetupPage = () => {
  const { createProfile } = useAuth();
  const navigate = useNavigate();
  const { show } = useToast();

  const [professions, setProfessions] = useState<Profession[]>([]);
  const [profileType, setProfileType] = useState<ApiProfileType>('artist');
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [professionId, setProfessionId] = useState('');
  const [pincode, setPincode] = useState('');
  const [error, setError] = useState<string>();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    profilesService.getProfessions().then(setProfessions).catch(() => setProfessions([]));
  }, []);

  const professionRequired = PROFESSION_REQUIRED_TYPES.includes(profileType);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
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
      navigate('/profile', { replace: true });
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Something went wrong. Please try again.';
      setError(message);
      show(message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="sosrg-container pt-36 pb-16 flex justify-center">
      <Card className="w-full max-w-md">
        <h1 className="font-display text-sosrg-2xl text-text-primary mb-2">Set up your profile</h1>
        <p className="text-sosrg-sm text-text-muted mb-6">
          One more step — this is what other people on SosrG will see.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Select
            label="I am a…"
            options={PROFILE_TYPE_OPTIONS}
            value={profileType}
            onChange={(e) => setProfileType(e.target.value as ApiProfileType)}
          />
          <Input
            label="Username"
            required
            pattern="[a-zA-Z0-9_]+"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            label="Display name"
            required
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          {professionRequired && (
            <Select
              label="Profession"
              required
              options={[{ value: '', label: 'Select a profession' }, ...professions.map((p) => ({ value: String(p.id), label: p.name }))]}
              value={professionId}
              onChange={(e) => setProfessionId(e.target.value)}
            />
          )}
          <Input
            label="Pincode (optional)"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            error={error}
          />
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Saving…' : 'Finish setup'}
          </Button>
        </form>
      </Card>
    </div>
  );
};
