import { Theater, Film, PenTool, Music, Star } from 'lucide-react';
import type { Section } from '../types';
import onSetImage from '../assets/community/on-set.png';
import backstageImage from '../assets/community/backstage.png';
import openMicImage from '../assets/community/open-mic.png';
import rehearsalImage from '../assets/community/rehearsal.png';
import auditionImage from '../assets/community/audition.png';
import workshopImage from '../assets/community/workshop.png';

// Real SosrG Studios photos, replacing the old randomly-seeded picsum stock
// photos. Craft & Traditional Arts was dropped entirely rather than left on
// a placeholder — none of the real photos fit it.
export const TALENT_CATEGORIES = [
  { id: 'theatre', name: 'Indian Theatre', desc: 'Connects theatre actors, directors, playwrights, and stage technicians.', icon: Theater, color: 'text-crimson', image: onSetImage },
  { id: 'cinema', name: 'Cinema', desc: 'Film professionals including actors, producers, cinematographers, and editors.', icon: Film, color: 'text-gold', image: backstageImage },
  { id: 'literature', name: 'Literature & Scriptwriting', desc: 'Story writers, screenwriters, dialogue writers, lyricists, adaptation experts.', icon: PenTool, color: 'text-blue-400', image: openMicImage },
  { id: 'music', name: 'Music', desc: 'Singers, composers, music producers, sound engineers.', icon: Music, color: 'text-purple-400', image: rehearsalImage },
  { id: 'dance', name: 'Dance', desc: 'Dancers, choreographers, background performers, movement directors.', icon: Star, color: 'text-emerald-400', image: auditionImage },
  { id: 'art', name: 'Art & Design', desc: 'Art directors, set designers, graphic artists, concept designers.', icon: Star, color: 'text-orange-400', image: workshopImage },
];

export const FEATURED_TALENT = [
  { id: 1, name: 'SiDdhaRtha SosrG', role: 'Method Product Manager', location: 'Mumbai', rating: 4.9, image: 'https://picsum.photos/seed/indian-actor-portrait/400/500', isPremium: true, isVerified: true },
  { id: 2, name: 'Sanya Iyer', role: 'Classical Dancer', location: 'Chennai', rating: 4.8, image: 'https://picsum.photos/seed/bharatanatyam-dancer/400/500', isPremium: true, isVerified: true },
  { id: 3, name: 'Vikram Singh', role: 'Software Engineer', location: 'Delhi', rating: 5.0, image: 'https://picsum.photos/seed/indian-filmmaker/400/500', isPremium: true, isVerified: true },
  { id: 4, name: 'Priya Das', role: 'Playback Singer', location: 'Kolkata', rating: 4.7, image: 'https://picsum.photos/seed/indian-classical-singer/400/500', isPremium: true, isVerified: true },
];

export const BACKGROUNDS: Record<Section, string> = {
  'home': 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop',
  'talent': 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2000&auto=format&fit=crop',
  'ai-tools': 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=2000&auto=format&fit=crop',
  'casting': 'https://images.unsplash.com/photo-1540039155732-684735035727?q=80&w=2000&auto=format&fit=crop',
  'auction': 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2000&auto=format&fit=crop',
  'marketplace': 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2000&auto=format&fit=crop',
  'ecosystem': 'https://images.unsplash.com/photo-1565118531796-763e5082d113?q=80&w=2000&auto=format&fit=crop',
  'events': 'https://images.unsplash.com/photo-1540039155732-684735035727?q=80&w=2000&auto=format&fit=crop',
  'academy': 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=2000&auto=format&fit=crop',
  'profile': 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=2000&auto=format&fit=crop',
  'creator-profile': 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=2000&auto=format&fit=crop',
  'business-profile': 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=2000&auto=format&fit=crop',
  'admin': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop',
  'sosrg-7e': 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop',
  'community': 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2000&auto=format&fit=crop',
  'bihar-documentary': 'https://images.unsplash.com/photo-1540039155732-684735035727?q=80&w=2000&auto=format&fit=crop',
};
