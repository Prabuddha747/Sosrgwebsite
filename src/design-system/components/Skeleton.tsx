import React from 'react';
import { cn } from '../../lib/utils';

export type SkeletonShape = 'card' | 'avatar' | 'text';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  shape: SkeletonShape;
}

// Custom shimmer, not React Bits (redesign.md §5): a skeleton needs to match
// the elevation-1 surface tone of the real content it's standing in for
// exactly, which a generic library shimmer wouldn't guarantee.
const shapeClasses: Record<SkeletonShape, string> = {
  card: 'rounded-2xl shadow-elevation-1 h-40 w-full',
  avatar: 'rounded-full h-12 w-12',
  text: 'rounded h-4 w-full',
};

export const Skeleton = ({ shape, className, ...props }: SkeletonProps) => (
  <div
    aria-hidden="true"
    className={cn(
      'relative overflow-hidden bg-cream-200',
      'motion-safe:before:absolute motion-safe:before:inset-0',
      'motion-safe:before:bg-[linear-gradient(90deg,transparent,var(--color-cream-50),transparent)]',
      'motion-safe:before:bg-[length:200%_100%]',
      'motion-safe:before:animate-[SosrG-shine_1.6s_ease-in-out_infinite]',
      shapeClasses[shape],
      className,
    )}
    {...props}
  />
);
