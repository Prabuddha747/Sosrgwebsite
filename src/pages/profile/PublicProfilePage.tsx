import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserX, ShieldOff, BellOff } from 'lucide-react';
import { profilesService } from '../../services/profiles';
import type { MyProfile } from '../../services/profiles';
import { Skeleton, EmptyState, Button, useToast } from '../../design-system';
import { ApiError } from '../../services/httpClient';
import { useAuth } from '../../contexts/AuthContext';
import { ProfileDetailCard } from './ProfileDetailCard';

export const PublicProfilePage = () => {
  const { username } = useParams<{ username: string }>();
  const [profile, setProfile] = useState<MyProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { profile: myProfile } = useAuth();
  const { show } = useToast();
  const [blocked, setBlocked] = useState(false);
  const [muted, setMuted] = useState(false);
  const [blockBusy, setBlockBusy] = useState(false);
  const [muteBusy, setMuteBusy] = useState(false);

  useEffect(() => {
    if (!username) return;
    setLoading(true);
    profilesService
      .getPublicProfile(username)
      .then(setProfile)
      .finally(() => setLoading(false));
  }, [username]);

  const handleToggleBlock = async () => {
    if (!profile) return;
    setBlockBusy(true);
    try {
      if (blocked) {
        await profilesService.unblockProfile(profile.id);
        setBlocked(false);
        show('Unblocked.', 'success');
      } else {
        await profilesService.blockProfile(profile.id);
        setBlocked(true);
        show('Blocked.', 'success');
      }
    } catch (err) {
      show(err instanceof ApiError ? err.message : 'Could not update block status.', 'error');
    } finally {
      setBlockBusy(false);
    }
  };

  const handleToggleMute = async () => {
    if (!profile) return;
    setMuteBusy(true);
    try {
      if (muted) {
        await profilesService.unmuteProfile(profile.id);
        setMuted(false);
        show('Unmuted.', 'success');
      } else {
        await profilesService.muteProfile(profile.id);
        setMuted(true);
        show('Muted.', 'success');
      }
    } catch (err) {
      show(err instanceof ApiError ? err.message : 'Could not update mute status.', 'error');
    } finally {
      setMuteBusy(false);
    }
  };

  if (loading) {
    return (
      <div className="SosrG-container pt-36 pb-16 flex justify-center">
        <div className="w-full max-w-2xl">
          <Skeleton shape="card" />
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="SosrG-container pt-36 pb-16">
        <EmptyState icon={UserX} message={`No profile found for @${username}.`} />
      </div>
    );
  }

  const isOwnProfile = myProfile?.id === profile.id;

  return (
    <div className="SosrG-container pt-36 pb-16 flex flex-col items-center gap-4">
      <ProfileDetailCard profile={profile} />
      {myProfile && !isOwnProfile && (
        <div className="w-full max-w-2xl flex gap-3 justify-end">
          <Button variant="ghost" onClick={handleToggleMute} disabled={muteBusy}>
            <BellOff size={16} className="mr-2" /> {muted ? 'Unmute' : 'Mute'}
          </Button>
          <Button variant="destructive" onClick={handleToggleBlock} disabled={blockBusy}>
            <ShieldOff size={16} className="mr-2" /> {blocked ? 'Unblock' : 'Block'}
          </Button>
        </div>
      )}
    </div>
  );
};
