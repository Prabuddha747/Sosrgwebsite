import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Skeleton } from '../../design-system';

// Like RequireAuth, but for pages that are pointless without an account at
// all (Network group: Talent/Community/Ecosystem) — sends a logged-out
// visitor straight to creating a profile rather than to a login form they
// have nothing to log into yet.
export const RequireProfile = ({ children }: { children: React.ReactNode }) => {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="SosrG-container py-16 flex flex-col gap-4">
        <Skeleton shape="card" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signup" state={{ from: location }} replace />;
  }

  if (!profile) {
    return <Navigate to="/profile/setup" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
