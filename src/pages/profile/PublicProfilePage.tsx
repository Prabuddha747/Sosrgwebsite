import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserX } from 'lucide-react';
import { profilesService } from '../../services/profiles';
import type { MyProfile } from '../../services/profiles';
import { Skeleton, EmptyState } from '../../design-system';
import { ProfileDetailCard } from './ProfileDetailCard';

export const PublicProfilePage = () => {
  const { username } = useParams<{ username: string }>();
  const [profile, setProfile] = useState<MyProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) return;
    setLoading(true);
    profilesService
      .getPublicProfile(username)
      .then(setProfile)
      .finally(() => setLoading(false));
  }, [username]);

  if (loading) {
    return (
      <div className="sosrg-container pt-36 pb-16 flex justify-center">
        <div className="w-full max-w-2xl">
          <Skeleton shape="card" />
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="sosrg-container pt-36 pb-16">
        <EmptyState icon={UserX} message={`No profile found for @${username}.`} />
      </div>
    );
  }

  return (
    <div className="sosrg-container pt-36 pb-16 flex justify-center">
      <ProfileDetailCard profile={profile} />
    </div>
  );
};
