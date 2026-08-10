import type { Section } from '../types';

// Bridges the old activeSection-driven child components (Hero, TalentGrid,
// SmartAssistant, DynamicBackground — none of which were touched by the
// routing migration) to real URLs, so their existing
// `setActiveSection(s: Section)` callback props keep working unchanged.
export const sectionPath: Record<Section, string> = {
  home: '/',
  talent: '/talent',
  'ai-tools': '/ai-tools',
  casting: '/casting',
  auction: '/auction',
  marketplace: '/marketplace',
  ecosystem: '/ecosystem',
  events: '/events',
  profile: '/profile',
  // Both used to point at /signup — a leftover from before the routing
  // migration that sent a logged-in user clicking "Profile" in the navbar
  // to a sign-up form instead of their own profile. MyProfilePage already
  // detects artist vs. business from the real account (profileType), so
  // both submenu items resolve to the same route.
  'creator-profile': '/profile',
  'business-profile': '/profile',
  admin: '/admin',
  'sosrg-7e': '/sosrg-7e',
  academy: '/academy',
  community: '/community',
};

const pathToSectionEntries = Object.entries(sectionPath) as [Section, string][];

export function pathToSection(pathname: string): Section {
  const match = pathToSectionEntries.find(([, path]) => path !== '/' && pathname.startsWith(path));
  return match ? match[0] : 'home';
}
