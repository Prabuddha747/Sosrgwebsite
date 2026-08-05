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
    'bg-gold-500 text-navy-950 font-semibold',
    'bg-[linear-gradient(110deg,var(--color-gold-500)_35%,var(--color-gold-300)_50%,var(--color-gold-500)_65%)] bg-[length:250%_100%]',
    'motion-safe:hover:animate-sosrg-shine motion-safe:focus-visible:animate-sosrg-shine',
    'hover:shadow-elevation-2 active:shadow-elevation-pressed',
  ),
  secondary: cn(
    'bg-navy-800 text-text-primary shadow-elevation-1',
    'hover:shadow-elevation-2 active:shadow-elevation-pressed',
  ),
  ghost: cn(
    'bg-transparent text-gold-500',
    'hover:bg-navy-800/40 active:shadow-elevation-pressed',
  ),
  // text-primary-on-danger measures 4.42:1 — just under AA's 4.5:1 for
  // normal text (verified by hand using the same relative-luminance method
  // redesign.md §1 used for its own table, which never measured this
  // direction). Pure white measures 4.90:1 and clears it; used only here,
  // not as a general text-primary replacement.
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
        'sosrg-focus-ring inline-flex items-center justify-center gap-2',
        'min-h-12 min-w-12 px-6 rounded-xl',
        'font-body text-sosrg-base transition-shadow duration-200',
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
