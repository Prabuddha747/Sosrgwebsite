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
import { AppLoader } from './components/layout/AppLoader';
import { BiharDocumentaryRegistration } from './pages/BiharDocumentaryRegistration';
import { AccountDeletionRequest } from './pages/AccountDeletionRequest';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { useAuth } from './contexts/AuthContext';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { ProfileSetupPage } from './pages/profile/ProfileSetupPage';
import { MyProfilePage } from './pages/profile/MyProfilePage';
import { PublicProfilePage } from './pages/profile/PublicProfilePage';
import { SharedPortfolioPage } from './pages/profile/SharedPortfolioPage';

export default function App() {
  // Dark is the default theme (explicit product decision, overriding the
  // earlier redesign.md cream-default) — a flat warm near-black
  // (index.css), not the old navy + photo/gradient backdrop
  // (DynamicBackground, removed). Cream/light stays available via the
  // toggle. Body's own background is the page background in both themes;
  // no separate backdrop layer is needed.
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
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

  // Signup/Login/Setup are one focused, full-bleed flow — each page carries
  // its own logo-as-home-link (AuthShell / ProfileSetupPage), so the site
  // navbar + footer would only compete with it, per explicit feedback.
  const hideChrome = ['/signup', '/login', '/profile/setup'].includes(location.pathname);

  if (authLoading) {
    return <AppLoader />;
  }

  return (
    <div className="min-h-dvh flex flex-col selection:bg-gold selection:text-black">
      <WelcomeToast />
      {!hideChrome && (
        <Navbar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          theme={theme}
          setTheme={setTheme}
          language={language}
          setLanguage={setLanguage}
        />
      )}
      <FloatingActions />

      <main className="flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<HomePage setActiveSection={setActiveSection} language={language} />} />
          <Route path="/casting" element={<CastingEcosystem />} />
          <Route path="/ecosystem" element={<RequireProfile><EcosystemHub /></RequireProfile>} />
          <Route path="/events" element={<EventManagement />} />
          <Route path="/community" element={<RequireProfile><CommunityHub /></RequireProfile>} />

          <Route path="/bihar-untold" element={<BiharDocumentaryRegistration />} />
          <Route path="/account-deletion" element={<AccountDeletionRequest />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile/setup" element={<RequireAuth><ProfileSetupPage /></RequireAuth>} />
          <Route path="/profile" element={<RequireAuth><MyProfilePage /></RequireAuth>} />
          <Route path="/profile/:username" element={<PublicProfilePage />} />
          <Route path="/shared/portfolio/:token" element={<SharedPortfolioPage />} />

          {/*
            Outside the locked v1 route scope (PROGRESS.md decision log #5)
            or not yet backed by a live API. Per an explicit, later user
            decision, these keep their full existing content (so the feature
            set stays visible/demoable) instead of being replaced by an
            empty state. Admin additionally stays behind RequireAuth: that's
            a baseline access-control default (architecture.md §8 flagged
            "reachable by anyone" as a real risk), not a visibility choice.
          */}
          <Route path="/admin" element={<RequireAuth><AdminPage /></RequireAuth>} />
          <Route path="/talent" element={<RequireProfile><SmartSearchAndDiscovery /></RequireProfile>} />
          <Route path="/ai-tools" element={<AISuite />} />
          <Route path="/auction" element={<TalentAuction />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/academy" element={<SosrGAcademy />} />
          <Route path="/sosrg-7e" element={<Sosrg7EPage />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <SmartAssistant />
      {!hideChrome && <Footer />}
    </div>
  );
}
