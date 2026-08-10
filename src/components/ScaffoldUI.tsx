import { cn } from '../lib/utils';

// Shimmer placeholder standing in for a real list/card item until there's a
// live endpoint to fetch it from — reuses the shimmer keyframe defined in
// tokens.css (`sosrg-shine`). Shared across pages so decorative-mock-data
// content converts to the same honest loading look everywhere.
export const ScaffoldRow = ({ className }: { className?: string }) => (
  <div
    aria-hidden="true"
    className={cn(
      'relative overflow-hidden rounded-xl bg-white/5 border border-white/5',
      'before:absolute before:inset-0 before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)]',
      'before:bg-[length:200%_100%] motion-safe:before:animate-[sosrg-shine_1.6s_ease-in-out_infinite]',
      className,
    )}
  />
);

// Corner tag for a card whose content is entirely mock data with no real
// endpoint behind it yet — pair with a `relative` wrapper on the card.
export const ComingSoonTag = () => (
  <span className="absolute top-3 right-3 z-10 bg-gold text-black px-2 py-1 rounded text-[9px] font-bold uppercase tracking-widest shadow-lg">
    Coming Soon
  </span>
);
