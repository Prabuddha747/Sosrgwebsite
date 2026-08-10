import type { Section } from '../types';
import { Hero } from '../components/home/Hero';
import { DigitalEcosystemVision } from '../components/home/DigitalEcosystemVision';
import { TalentGrid } from '../components/home/TalentGrid';
import { CollaborationNetwork } from '../components/home/CollaborationNetwork';
import { PremiumFeatures } from '../components/home/PremiumFeatures';
import { TrustSystem } from '../components/home/TrustSystem';
import { MobileAppStructure } from '../components/home/MobileAppStructure';
import { MonetizationModel } from '../components/home/MonetizationModel';

export const HomePage = ({ setActiveSection, language }: { setActiveSection: (s: Section) => void, language: string }) => (
  <div className="space-y-32 pb-32">
    <Hero setActiveSection={setActiveSection} language={language} />
    <DigitalEcosystemVision />
    <TalentGrid setActiveSection={setActiveSection} />
    <CollaborationNetwork />
    <PremiumFeatures />
    <TrustSystem />
    <MobileAppStructure />
    <MonetizationModel />
  </div>
);
