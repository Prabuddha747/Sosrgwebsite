import React from 'react';
import { cn } from '../../lib/utils';
import { Button, type ButtonProps } from './Button';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  message: string;
  cta?: {
    label: string;
    onClick: () => void;
    variant?: ButtonProps['variant'];
  };
}

export const EmptyState = ({ icon: Icon, message, cta, className, ...props }: EmptyStateProps) => (
  <div
    className={cn('flex flex-col items-center justify-center gap-4 text-center py-16 px-6', className)}
    {...props}
  >
    <Icon className="w-12 h-12 text-text-muted" aria-hidden="true" />
    <p className="text-text-muted font-body text-sosrg-base max-w-sm">{message}</p>
    {cta && (
      <Button variant={cta.variant ?? 'secondary'} onClick={cta.onClick}>
        {cta.label}
      </Button>
    )}
  </div>
);
