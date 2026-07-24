import React from 'react';
import AboutSection from '@/components/AboutSection';
import FeaturedVideoSection from '@/components/FeaturedVideoSection';
import PhilosophySection from '@/components/PhilosophySection';
import StatsSection from '@/components/StatsSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import ProblemSection from '@/components/ProblemSection';
import FounderTimelineSection from '@/components/FounderTimelineSection';
import IdentitySection from '@/components/IdentitySection';
import EcosystemSection from '@/components/EcosystemSection';
import ArtistJourneySection from '@/components/ArtistJourneySection';
import CommunitySection from '@/components/CommunitySection';

const Index = () => {
  return (
    <div className="bg-transparent min-h-screen text-white font-sans overflow-x-hidden relative">
      <HeroSection />
      <ProblemSection />
      <IdentitySection />
      <EcosystemSection />
      <ArtistJourneySection />
      <StatsSection />

      <AboutSection />
      <FeaturedVideoSection />
      <PhilosophySection />
      <FounderTimelineSection />
      <CommunitySection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Index;
