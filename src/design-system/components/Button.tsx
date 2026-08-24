import React from 'react';
import { cn } from '../../lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  // Gold fill + a reduced-motion-safe shine sweep — reserved for the single
  // most important action per screen (redesign.md §5), not every button.
  primary: cn(
    'bg-gold-500 text-text-primary font-semibold',
    'bg-[linear-gradient(110deg,var(--color-gold-500)_35%,var(--color-gold-300)_50%,var(--color-gold-500)_65%)] bg-[length:250%_100%]',
    'motion-safe:hover:animate-SosrG-shine motion-safe:focus-visible:animate-SosrG-shine',
    'hover:shadow-elevation-2 active:shadow-elevation-pressed',
  ),
  secondary: cn(
    'bg-cream-50 text-text-primary shadow-elevation-1',
    'hover:shadow-elevation-2 active:shadow-elevation-pressed',
  ),
  ghost: cn(
    'bg-transparent text-gold-700',
    'hover:bg-cream-200/60 active:shadow-elevation-pressed',
  ),
  // text-primary-on-danger measures 2.97:1 on the v3 (darker) danger red —
  // fails AA. Pure white measures 5.98:1 and clears it comfortably; used
  // only here, not as a general text-primary replacement.
  destructive: cn(
    'bg-danger text-white font-semibold',
    'hover:shadow-elevation-2 active:shadow-elevation-pressed',
  ),
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', className, disabled, children, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled}
      className={cn(
        'SosrG-focus-ring inline-flex items-center justify-center gap-2',
        'min-h-12 min-w-12 px-[1.5em] rounded-xl',
        'font-body text-SosrG-base transition-shadow duration-200',
        'disabled:shadow-none disabled:opacity-45 disabled:cursor-not-allowed',
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  ),
);
Button.displayName = 'Button';
