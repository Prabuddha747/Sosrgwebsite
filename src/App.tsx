import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import type { Section } from './types';
import { sectionPath, pathToSection } from './lib/sectionRoutes';
import { RequireAuth } from './components/routing/RequireAuth';
import { RequireProfile } from './components/routing/RequireProfile';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { FloatingActions } from './components/layout/FloatingActions';
import { WelcomeToast } from './components/layout/WelcomeToast';
import { SmartAssistant } from './components/layout/SmartAssistant';
import { HomePage } from './pages/HomePage';
import { SmartSearchAndDiscovery } from './pages/SmartSearchAndDiscovery';
import { AISuite } from './pages/AISuite';
import { CastingEcosystem } from './pages/CastingEcosystem';
import { TalentAuction } from './pages/TalentAuction';
import { Marketplace } from './pages/Marketplace';
import { EcosystemHub } from './pages/EcosystemHub';
import { EventManagement } from './pages/EventManagement';
import { CommunityHub } from './pages/CommunityHub';
import { SosrGAcademy } from './pages/SosrGAcademy';
import { AdminPage } from './pages/AdminPage';
import { Sosrg7EPage } from './pages/Sosrg7EPage';
import { ComingSoonBanner } from './components/ComingSoonBanner';
import { AppLoader } from './components/layout/AppLoader';
import { BiharDocumentaryRegistration } from './pages/BiharDocumentaryRegistration';
import { useAuth } from './contexts/AuthContext';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { ProfileSetupPage } from './pages/profile/ProfileSetupPage';
import { MyProfilePage } from './pages/profile/MyProfilePage';
import { PublicProfilePage } from './pages/profile/PublicProfilePage';

export default function App() {
  // Cream/gold is the default theme now (redesign.md) — dark mode stays
  // available, but it's a flat warm near-black (index.css), not the old
  // navy + photo/gradient backdrop (DynamicBackground, removed). Body's own
  // background is the page background in both themes; no separate backdrop
  // layer is needed.
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const [language, setLanguage] = useState('en');
  const location = useLocation();
  const navigate = useNavigate();
  const { loading: authLoading } = useAuth();

  useEffect(() => {
    document.body.classList.toggle('light-mode', theme === 'light');
  }, [theme]);

  // Old activeSection-driven children (Hero, TalentGrid, SmartAssistant)
  // still take a `setActiveSection(s: Section)` callback prop — this maps
  // that onto real navigation without having to rewrite those components.
  const setActiveSection = (s: Section) => navigate(sectionPath[s]);
  const activeSection = pathToSection(location.pathname);

  if (authLoading) {
    return <AppLoader />;
  }

  return (
    <div className="min-h-screen selection:bg-gold selection:text-black">
      <WelcomeToast />
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        theme={theme}
        setTheme={setTheme}
        language={language}
        setLanguage={setLanguage}
      />
      <FloatingActions />

      <main>
        <Routes>
          <Route path="/" element={<HomePage setActiveSection={setActiveSection} language={language} />} />
          {/*
            In the locked v1 scope (real URL, real nav entry) but not yet
            wired to the live API — same honest banner treatment as the
            out-of-scope pages below, removed page-by-page as each one is
            actually connected (Casting is next, see Task 4).
          */}
          <Route
            path="/casting"
            element={
              <>
                <ComingSoonBanner message="The Casting Calls tab is now live data — every other tab on this page (Live Audition Studio, Forum, Workshops, and the rest) is still a preview." />
                <CastingEcosystem />
              </>
            }
          />
          <Route
            path="/ecosystem"
            element={
              <RequireProfile>
                <ComingSoonBanner message="The Connecting Partner ecosystem isn't wired to a live API yet — what you see below is a preview." />
                <EcosystemHub />
              </RequireProfile>
            }
          />
          <Route
            path="/events"
            element={
              <>
                <ComingSoonBanner message="Events isn't wired to a live API yet — what you see below is a preview." />
                <EventManagement />
              </>
            }
          />
          <Route
            path="/community"
            element={
              <RequireProfile>
                <ComingSoonBanner message="Community isn't wired to a live API yet — what you see below is a preview." />
                <CommunityHub />
              </RequireProfile>
            }
          />

          <Route path="/bihar-untold" element={<BiharDocumentaryRegistration />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile/setup" element={<RequireAuth><ProfileSetupPage /></RequireAuth>} />
          <Route path="/profile" element={<RequireAuth><MyProfilePage /></RequireAuth>} />
          <Route path="/profile/:username" element={<PublicProfilePage />} />

          {/*
            Outside the locked v1 route scope (PROGRESS.md decision log #5)
            or not yet backed by a live API. Per an explicit, later user
            decision, these keep their full existing content (so the feature
            set stays visible/demoable) instead of being replaced by an
            empty state — a ComingSoonBanner up top marks them honestly
            instead. Admin additionally stays behind RequireAuth: that's a
            baseline access-control default (architecture.md §8 flagged
            "reachable by anyone" as a real risk), not a visibility choice.
          */}
          <Route
            path="/admin"
            element={
              <RequireAuth>
                <ComingSoonBanner label="Coming soon" message="Admin tooling isn't wired to a live API yet — every action below is a preview, not a working control." />
                <AdminPage />
              </RequireAuth>
            }
          />
          <Route
            path="/talent"
            element={
              <RequireProfile>
                <ComingSoonBanner />
                <SmartSearchAndDiscovery />
              </RequireProfile>
            }
          />
          <Route
            path="/ai-tools"
            element={
              <>
                <ComingSoonBanner />
                <AISuite />
              </>
            }
          />
          <Route
            path="/auction"
            element={
              <>
                <ComingSoonBanner />
                <TalentAuction />
              </>
            }
          />
          <Route
            path="/marketplace"
            element={
              <>
                <ComingSoonBanner />
                <Marketplace />
              </>
            }
          />
          <Route
            path="/academy"
            element={
              <>
                <ComingSoonBanner />
                <SosrGAcademy />
              </>
            }
          />
          <Route
            path="/sosrg-7e"
            element={
              <>
                <ComingSoonBanner />
                <Sosrg7EPage />
              </>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <SmartAssistant setActiveSection={setActiveSection} />
      <Footer />
    </div>
  );
}
