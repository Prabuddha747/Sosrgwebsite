import type { Section } from '../types';
import { Hero } from '../components/home/Hero';
import { Manifesto } from '../components/home/Manifesto';
import { OriginStory } from '../components/home/OriginStory';
import { CollaborationNetwork } from '../components/home/CollaborationNetwork';
import { SevenWorlds } from '../components/home/SevenWorlds';
import { FeaturedProfessionals } from '../components/home/FeaturedProfessionals';
import { Testimonials } from '../components/home/Testimonials';
import { BrandDeals } from '../components/home/BrandDeals';
import { WhatSosrgGives } from '../components/home/WhatSosrgGives';
import { TwoSidesEcosystem } from '../components/home/TwoSidesEcosystem';
import { CommunityOpportunitiesPreview } from '../components/home/CommunityOpportunitiesPreview';
import { TrustFoundation } from '../components/home/TrustFoundation';
import { FinalGoal } from '../components/home/FinalGoal';
import { FinalCTA } from '../components/home/FinalCTA';

// Each section below already carries its own py-* vertical rhythm, so this
// wrapper adds no spacing of its own — an outer space-y-* here would just
// stack on top of every section's padding and double the gaps.
export const HomePage = ({ setActiveSection, language }: { setActiveSection: (s: Section) => void, language: string }) => (
  <div>
    <Hero setActiveSection={setActiveSection} language={language} />
    <Manifesto language={language} />
    <OriginStory language={language} />
    <CollaborationNetwork language={language} />
    <SevenWorlds setActiveSection={setActiveSection} language={language} />
    <FeaturedProfessionals setActiveSection={setActiveSection} language={language} />
    <WhatSosrgGives language={language} />
    <TwoSidesEcosystem language={language} />
    <CommunityOpportunitiesPreview language={language} />
    <Testimonials language={language} />
    <BrandDeals language={language} />
    <TrustFoundation language={language} />
    <FinalGoal language={language} />
    <FinalCTA language={language} />
  </div>
);
