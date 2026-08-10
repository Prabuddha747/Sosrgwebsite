import { Card, Avatar, Badge } from '../../design-system';
import type { MyProfile } from '../../services/profiles';

// profile.tier is a real field, but it's a subscription plan
// (free/premium/professional) — not the Yellow/Green/Blue/Red account-trust
// tier the design-system's Badge/Avatar tier props model. That trust-tier
// system has no backing field anywhere in the real API (confirmed in
// doc/schema.md §0); an earlier version of this component silently
// compared profile.tier against it and always failed, so the badge never
// rendered. Shown as plain text below instead of forcing it into that
// component's tier-color styling.
const PLAN_LABEL: Record<MyProfile['tier'], string> = {
  free: 'Free',
  premium: 'Premium',
  professional: 'Professional',
};

export const ProfileDetailCard = ({ profile }: { profile: MyProfile }) => (
  <Card className="w-full max-w-2xl">
    <div className="flex items-center gap-4 mb-6">
      <Avatar
        src={profile.profileImagePath ?? undefined}
        alt={profile.displayName}
        fallback={profile.displayName.slice(0, 2).toUpperCase()}
        size="lg"
      />
      <div>
        <h1 className="font-display text-sosrg-2xl text-text-primary">{profile.displayName}</h1>
        <p className="text-sosrg-sm text-text-muted">@{profile.username}</p>
      </div>
      {profile.tier !== 'free' && (
        <Badge variant="info" className="ml-auto">
          {PLAN_LABEL[profile.tier]}
        </Badge>
      )}
    </div>

    {profile.headline && <p className="text-sosrg-base text-text-primary mb-2">{profile.headline}</p>}
    {profile.bio && <p className="text-sosrg-sm text-text-muted mb-4">{profile.bio}</p>}

    <dl className="grid grid-cols-2 gap-4 text-sosrg-sm">
      <div>
        <dt className="text-text-muted">Type</dt>
        <dd className="text-text-primary capitalize">{profile.profileType.replace('_', ' ')}</dd>
      </div>
      <div>
        <dt className="text-text-muted">Plan</dt>
        <dd className="text-text-primary">{PLAN_LABEL[profile.tier]}</dd>
      </div>
      {profile.yearsExperience != null && (
        <div>
          <dt className="text-text-muted">Experience</dt>
          <dd className="text-text-primary">{profile.yearsExperience} years</dd>
        </div>
      )}
      {profile.district && (
        <div>
          <dt className="text-text-muted">Location</dt>
          <dd className="text-text-primary">{[profile.district, profile.state].filter(Boolean).join(', ')}</dd>
        </div>
      )}
      {profile.websiteUrl && (
        <div>
          <dt className="text-text-muted">Website</dt>
          <dd className="text-text-primary truncate">{profile.websiteUrl}</dd>
        </div>
      )}
    </dl>
  </Card>
);
