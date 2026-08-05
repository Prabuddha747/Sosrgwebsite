import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { Section } from './types';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { DynamicBackground } from './components/layout/DynamicBackground';
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
import { ProfileSystem } from './pages/ProfileSystem';
import { AdminPage } from './pages/AdminPage';
import { Sosrg7EPage } from './pages/Sosrg7EPage';

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, [theme]);

  return (
    <div className="min-h-screen selection:bg-gold selection:text-black">
      <WelcomeToast />
      <DynamicBackground activeSection={activeSection} />
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} theme={theme} setTheme={setTheme} language={language} setLanguage={setLanguage} />
      <FloatingActions />

      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            exit={{ opacity: 0, filter: 'blur(10px)', y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {activeSection === 'home' && (
              <HomePage setActiveSection={setActiveSection} language={language} />
            )}

        {activeSection === 'talent' && (
          <SmartSearchAndDiscovery />
        )}

        {activeSection === 'ai-tools' && (
          <AISuite />
        )}

        {activeSection === 'casting' && (
          <CastingEcosystem />
        )}

        {activeSection === 'auction' && (
          <TalentAuction />
        )}

        {activeSection === 'marketplace' && (
          <Marketplace />
        )}

        {activeSection === 'ecosystem' && (
          <EcosystemHub />
        )}

        {activeSection === 'events' && (
          <EventManagement />
        )}

        {activeSection === 'community' && (
          <CommunityHub />
        )}

        {activeSection === 'academy' && (
          <SosrGAcademy />
        )}

        {activeSection === 'profile' && (
          <ProfileSystem />
        )}

        {activeSection === 'creator-profile' && (
          <ProfileSystem initialType="artist" />
        )}

        {activeSection === 'business-profile' && (
          <ProfileSystem initialType="business" />
        )}

        {activeSection === 'admin' && (
          <AdminPage />
        )}

        {activeSection === 'sosrg-7e' && (
          <Sosrg7EPage />
        )}
          </motion.div>
        </AnimatePresence>
      </main>

      <SmartAssistant setActiveSection={setActiveSection} />
      <Footer />
    </div>
  );
}
