import React from 'react';
import { cn } from '../../lib/utils';
import { tierColorVar, type AccountTier } from './Badge';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt: string;
  /** Initials shown when no image is available or the image fails to load. */
  fallback: string;
  tier?: AccountTier;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses: Record<NonNullable<AvatarProps['size']>, string> = {
  sm: 'w-8 h-8 text-SosrG-xs',
  md: 'w-12 h-12 text-SosrG-sm',
  lg: 'w-16 h-16 text-SosrG-lg',
};

export const Avatar = ({ src, alt, fallback, tier, size = 'md', className, ...props }: AvatarProps) => {
  const [imgFailed, setImgFailed] = React.useState(false);
  const ringColor = tier ? tierColorVar[tier] : undefined;

  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center shrink-0 rounded-full',
        'bg-cream-200 text-text-primary font-body font-medium overflow-hidden',
        sizeClasses[size],
        className,
      )}
      style={ringColor ? { boxShadow: `0 0 0 2px var(--color-cream-50), 0 0 0 4px ${ringColor}` } : undefined}
      {...props}
    >
      {src && !imgFailed ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" onError={() => setImgFailed(true)} />
      ) : (
        <span aria-hidden={!!alt}>{fallback}</span>
      )}
      {!src && <span className="sr-only">{alt}</span>}
    </div>
  );
};
