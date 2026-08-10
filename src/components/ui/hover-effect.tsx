import { useId, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { cn } from '../../lib/utils';

// Same glow, for a single standalone panel (not part of a repeating grid —
// e.g. Profile Details' Basic Information / Media Gallery cards, which are
// each a one-off, differently-sized block rather than array-mapped
// siblings). No shared layoutId needed since there's nothing for the glow
// to slide between; it just fades in on its own card.
export function HoverGlowPanel({
  children,
  className,
  glowClassName,
}: {
  children: ReactNode;
  className?: string;
  glowClassName?: string;
}) {
  return (
    <div className={cn('group relative overflow-hidden', className)}>
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-br from-gold/10 via-gold/0 to-transparent',
          glowClassName,
        )}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// Aceternity-style "card hover effect": a soft glow slides between grid
// cells to whichever one is hovered, sharing a single layoutId so the
// motion is a slide rather than a fade-in-place. Adapted as a generic grid
// wrapper (rather than baking in card markup) so it drops into any existing
// card-grid section without needing to duplicate each section's own card
// content/styling — just wrap the grid's children in it.
export function HoverEffect({
  children,
  className,
  glowClassName,
}: {
  children: ReactNode[];
  className?: string;
  glowClassName?: string;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  // Scoped per instance — without this, hovering a card in one HoverEffect
  // grid and then another on the same page would animate the glow flying
  // across the whole page between them (shared layoutId = shared motion).
  const instanceId = useId();

  return (
    <div className={cn('grid', className)}>
      {children.map((child, idx) => (
        <div
          key={idx}
          className="relative"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                layoutId={`hover-effect-glow-${instanceId}`}
                className={cn(
                  'absolute -inset-2 z-0 block rounded-3xl bg-gradient-to-br from-gold/20 via-gold/5 to-transparent',
                  glowClassName,
                )}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.1 } }}
              />
            )}
          </AnimatePresence>
          <div className="relative z-10 h-full">{child}</div>
        </div>
      ))}
    </div>
  );
}
