import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ProfileSystem } from '../ProfileSystem';
import type { ProfileType } from '../../types';

// Only the type/artist-vs-business split matters to ProfileSystem's mock
// data branches — the API's 6 profile types collapse onto that same binary.
const BUSINESS_LIKE_TYPES = ['business', 'casting_director', 'industry_professional', 'arts_organisation'];

export const MyProfilePage = () => {
  const { profile, logout } = useAuth();
  const navigate = useNavigate();

  if (!profile) {
    return <Navigate to="/profile/setup" replace />;
  }

  const handleLogout = async () => {
    await logout();
    navigate('/', { replace: true });
  };

  const dashboardType: ProfileType = BUSINESS_LIKE_TYPES.includes(profile.profileType) ? 'business' : 'artist';

  return (
    <ProfileSystem
      initialType={dashboardType}
      onLogout={handleLogout}
      realProfile={{
        displayName: profile.displayName,
        profileType: profile.profileType,
        district: profile.district,
        state: profile.state,
      }}
    />
  );
};
