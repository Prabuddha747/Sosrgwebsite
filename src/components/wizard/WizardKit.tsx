import type { ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

// Shared chrome for the site's multi-step flows (Profile Setup, Bihar
// Untold registration) — one step-indicator and one selectable-tile
// pattern, so a third wizard doesn't reinvent either.

export const SelectTile = ({
  selected,
  onClick,
  children,
  className,
}: {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
  className?: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={selected}
    className={cn(
      'sosrg-texture sosrg-focus-ring text-left rounded-xl p-[1em] bg-cream-50 border-2 transition-all duration-200',
      selected ? 'border-gold-500 shadow-elevation-2' : 'border-transparent shadow-elevation-1 hover:shadow-elevation-2',
      className,
    )}
  >
    {children}
  </button>
);

export const StepIndicator = ({ steps, currentIndex }: { steps: string[]; currentIndex: number }) => (
  // Narrower embed contexts (e.g. the ProfileSystem "Bihar Untold" tab,
  // where this sits in a half-width column inside a max-w-5xl wrapper)
  // don't have room for all 8 steps' shrink-0 labels — rather than
  // overlapping the adjacent image, this scrolls horizontally instead.
  <div className="flex items-center gap-0 mb-8 overflow-x-auto pb-1">
    {steps.map((label, i) => (
      <div key={label} className={cn('flex items-center', i < steps.length - 1 && 'flex-1')}>
        <div className="flex flex-col items-center gap-1.5 shrink-0">
          <div
            className={cn(
              'w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-sosrg-xs font-bold font-body transition-shadow duration-200',
              i < currentIndex
                ? 'bg-gold-500 text-text-primary shadow-elevation-1'
                : i === currentIndex
                  ? 'bg-cream-50 text-gold-700 shadow-elevation-2 ring-2 ring-gold-500'
                  : 'bg-cream-100 text-text-muted shadow-elevation-pressed',
            )}
          >
            {i < currentIndex ? <Check size={14} /> : i + 1}
          </div>
          <span className={cn('hidden sm:block text-sosrg-xs font-body whitespace-nowrap', i === currentIndex ? 'text-text-primary font-semibold' : 'text-text-muted')}>
            {label}
          </span>
        </div>
        {i < steps.length - 1 && (
          <div className={cn('h-0.5 flex-1 mx-2 rounded-full transition-colors', i < currentIndex ? 'bg-gold-500' : 'bg-cream-200')} />
        )}
      </div>
    ))}
  </div>
);

// Slide+fade between wizard steps — new content enters from the direction
// of travel (right on Continue, left on Back) and the outgoing step exits
// the opposite way, rather than just cutting between them. `direction`
// is 1 going forward, -1 going back; `stepKey` (the step id) is what
// AnimatePresence keys on to detect a change. Degrades to a plain
// cross-fade under prefers-reduced-motion (redesign.md §5's rule: every
// animated component needs a static-equivalent fallback).
const stepVariants = {
  enter: (direction: number) => ({ x: direction >= 0 ? 48 : -48, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction >= 0 ? -48 : 48, opacity: 0 }),
};

export const StepTransition = ({
  stepKey,
  direction,
  children,
}: {
  stepKey: string;
  direction: number;
  children: ReactNode;
}) => {
  const reduceMotion = useReducedMotion();
  return (
    <AnimatePresence mode="wait" custom={direction} initial={false}>
      <motion.div
        key={stepKey}
        custom={direction}
        variants={stepVariants}
        initial={reduceMotion ? 'center' : 'enter'}
        animate="center"
        exit={reduceMotion ? 'center' : 'exit'}
        transition={{ duration: reduceMotion ? 0 : 0.32, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// The half-page image side used by every split-layout wizard (Profile
// Setup, Bihar Untold). Slides + fades in the direction of travel, and its
// inner edge (the one touching the content column) dissolves into the
// established warm scrim tone over a wide, gentle zone — never a hard cut,
// never fades to flat white/cream.
export const SplitStepImage = ({
  image,
  caption,
  imageOnRight,
  stepKey,
  direction,
}: {
  image: string;
  caption: string;
  imageOnRight: boolean;
  stepKey: string;
  direction: number;
}) => (
  <div className={cn('relative h-56 md:h-auto md:w-1/2 overflow-hidden', imageOnRight ? 'md:order-2' : 'md:order-1')}>
    <AnimatePresence custom={direction} initial={false}>
      <motion.img
        key={stepKey}
        src={image}
        alt=""
        aria-hidden="true"
        custom={direction}
        initial={{ opacity: 0, x: direction >= 0 ? '15%' : '-15%' }}
        animate={{ opacity: 1, x: '0%' }}
        exit={{ opacity: 0, x: direction >= 0 ? '-15%' : '15%' }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className={cn('absolute inset-0 h-full w-full object-cover', imageOnRight ? 'split-image-mask-right' : 'split-image-mask-left')}
      />
    </AnimatePresence>
    <div className="absolute inset-0 bg-scrim md:bg-black/10" />
    {/* Edge dissolve is a half-page-split effect — only makes sense once
        the image actually sits beside a content column at md:, so it's
        hidden entirely below that rather than showing a fade with nothing
        for it to dissolve into. */}
    <div className={cn('hidden md:block absolute inset-0 pointer-events-none', imageOnRight ? 'split-image-overlay-right' : 'split-image-overlay-left')} />
    <p className="absolute bottom-4 left-4 md:bottom-8 md:left-8 font-auth-display italic photo-text text-sosrg-lg">{caption}</p>
  </div>
);
