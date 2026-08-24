import React, { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/utils';

export type SettledHeadingTrigger = 'scroll' | 'hover';

export interface SettledHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3';
  /** scroll: reveals once via IntersectionObserver and stays revealed.
   *  hover: toggles with hover/focus, for card titles acting as links. */
  trigger?: SettledHeadingTrigger;
}

// The platform's one repeatable typographic motion idea (redesign.md §3/§5):
// Fraunces' own wght/opsz axes transition from a lighter resting state to
// full weight/optical-size, rather than a generic fade or gradient sweep.
export const SettledHeading = ({ as: Tag = 'h2', trigger = 'scroll', className, children, ...props }: SettledHeadingProps) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const [visible, setVisible] = useState(trigger === 'hover' ? false : false);

  useEffect(() => {
    if (trigger !== 'scroll') return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // reveals once, per redesign.md §5 — not re-triggered on scroll back up
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [trigger]);

  const hoverHandlers =
    trigger === 'hover'
      ? {
          onMouseEnter: () => setVisible(true),
          onMouseLeave: () => setVisible(false),
          onFocus: () => setVisible(true),
          onBlur: () => setVisible(false),
        }
      : {};

  return (
    <Tag
      ref={ref}
      className={cn('SosrG-heading-settle font-display', visible && 'is-visible', className)}
      {...hoverHandlers}
      {...props}
    >
      {children}
    </Tag>
  );
};
