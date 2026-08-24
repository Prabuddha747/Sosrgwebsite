import React from 'react';
import { cn } from '../../lib/utils';

// Matches schema.md §3 account_status enum exactly (yellow/green/blue/red).
export type AccountTier = 'yellow' | 'green' | 'blue' | 'red';
export type StatusKind = 'pending' | 'active' | 'rejected' | 'success' | 'error' | 'info';
export type BadgeVariant = `tier-${AccountTier}` | StatusKind;

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant: BadgeVariant;
}

const defaultLabel: Record<BadgeVariant, string> = {
  'tier-yellow': 'Yellow',
  'tier-green': 'Green',
  'tier-blue': 'Blue',
  'tier-red': 'Red',
  pending: 'Pending',
  active: 'Active',
  rejected: 'Rejected',
  success: 'Success',
  error: 'Error',
  info: 'Info',
};

// Soft pill: colored text/border on a low-opacity fill of the same color,
// so many badges in a list (e.g. an applicant table) don't read as a wall
// of solid color blocks. Text color is checked against the cream-100 page
// background, same measurement discipline as redesign.md §1's own table.
// Exported so Avatar's account-tier ring can reuse the exact same tier
// colors rather than redefining them (redesign.md §6: "Avatar ... reuses
// Badge tokens").
export const tierColorVar: Record<AccountTier, string> = {
  yellow: 'var(--color-tier-yellow)',
  green: 'var(--color-success)',
  blue: 'var(--color-tier-blue)',
  red: 'var(--color-danger)',
};

const colorVar: Record<BadgeVariant, string> = {
  'tier-yellow': tierColorVar.yellow,
  'tier-green': tierColorVar.green,
  'tier-blue': tierColorVar.blue,
  'tier-red': tierColorVar.red,
  pending: 'var(--color-text-muted)',
  active: 'var(--color-success)',
  rejected: 'var(--color-danger)',
  success: 'var(--color-success)',
  error: 'var(--color-danger)',
  info: 'var(--color-tier-blue)',
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant, className, children, ...props }, ref) => {
    const color = colorVar[variant];
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full px-3 py-1',
          'font-body text-SosrG-xs font-medium border',
          className,
        )}
        style={{ color, borderColor: color, backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)` }}
        {...props}
      >
        {children ?? defaultLabel[variant]}
      </span>
    );
  },
);
Badge.displayName = 'Badge';
