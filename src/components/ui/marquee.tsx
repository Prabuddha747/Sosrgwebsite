import type { ComponentProps } from 'react';
import { cn } from '../../lib/utils';

interface MarqueeProps extends ComponentProps<'div'> {
  /** Runs the track top-to-bottom instead of left-to-right. */
  vertical?: boolean;
  /** Reverses the scroll direction. */
  reverse?: boolean;
  /** Freezes the track while the pointer is over it. */
  pauseOnHover?: boolean;
  /** How many copies of the track to render for a seamless loop. */
  repeat?: number;
}

export const Marquee = ({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) => (
  <div
    {...props}
    className={cn(
      'group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]',
      vertical ? 'flex-col' : 'flex-row',
      className,
    )}
  >
    {Array.from({ length: repeat }).map((_, i) => (
      <div
        key={i}
        className={cn('flex shrink-0 justify-around [gap:var(--gap)]', {
          'animate-marquee flex-row': !vertical,
          'animate-marquee-vertical flex-col': vertical,
          'group-hover:[animation-play-state:paused]': pauseOnHover,
          '[animation-direction:reverse]': reverse,
        })}
      >
        {children}
      </div>
    ))}
  </div>
);
