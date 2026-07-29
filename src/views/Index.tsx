"use client";
import React from 'react';
import AboutSection from '@/components/AboutSection';
import FeaturedVideoSection from '@/components/FeaturedVideoSection';
import PhilosophySection from '@/components/PhilosophySection';
import StatsSection from '@/components/StatsSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import CoreBrandStorySection from '@/components/CoreBrandStorySection';
import ProblemSection from '@/components/ProblemSection';
import FounderTimelineSection from '@/components/FounderTimelineSection';
import IdentitySection from '@/components/IdentitySection';
import EcosystemSection from '@/components/EcosystemSection';
import ArtistJourneySection from '@/components/ArtistJourneySection';
import CommunitySection from '@/components/CommunitySection';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useLenisScroll } from '@/three/hooks/useLenisScroll';

// docs2's Three.js "worlds" background (WorldExperience/PersistentCanvas)
// has been retired in favor of the docs3 plan: a GSAP + Lenis,
// scroll-scrubbed-video, dark-neumorphism homepage (see docs3/design3.md).
// Sections below are being rebuilt one at a time against that spec,
// starting with HeroSection + CoreBrandStorySection. useLenisScroll is
// pre-existing (built for docs2) but is generic Lenis+GSAP wiring with no
// three.js dependency, so it's reused here rather than reimplemented.
const Index = () => {
  const reducedMotion = useReducedMotion();
  useLenisScroll(!reducedMotion);

  return (
    <div className="bg-stage-black min-h-screen text-ivory font-sans overflow-x-hidden relative">
      <HeroSection />
      <CoreBrandStorySection />
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
