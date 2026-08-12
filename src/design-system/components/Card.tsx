import React from 'react';
import { cn } from '../../lib/utils';

export type CardVariant = 'elevation-1' | 'elevation-2' | 'flat';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  /** Renders as a focusable, hoverable interactive surface (button-like) instead of a static container. */
  interactive?: boolean;
}

// "flat" exists specifically so a card nested inside an already-elevated
// container never stacks two neumorphic shadows (redesign.md §6) — that
// double-shadow look is a named mistake to avoid, not a missing variant.
const variantClasses: Record<CardVariant, string> = {
  'elevation-1': 'shadow-elevation-1',
  'elevation-2': 'shadow-elevation-2',
  flat: 'shadow-none',
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'elevation-1', interactive = false, className, children, tabIndex, ...props }, ref) => (
    <div
      ref={ref}
      tabIndex={interactive ? (tabIndex ?? 0) : tabIndex}
      className={cn(
        'sosrg-texture bg-cream-50 border-2 border-cream-200 rounded-xl p-[1.5em] text-text-primary',
        'transition-shadow duration-200',
        variantClasses[variant],
        interactive && 'sosrg-focus-ring cursor-pointer hover:shadow-elevation-2',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
);
Card.displayName = 'Card';
