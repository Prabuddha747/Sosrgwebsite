import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../design-system';
import { cn } from '../../lib/utils';
import logo from '../../assets/logo.png';

// Same split layout as ProfileSetupPage's wizard steps (half-page real
// photo + content directly on the page, not a small card floating over a
// full-bleed backdrop) — kept consistent across the whole
// Signup → Login → Setup flow rather than two different visual languages.
export const AuthShell = ({
  image,
  caption,
  imageSide = 'right',
  children,
}: {
  image: string;
  caption: string;
  imageSide?: 'left' | 'right';
  children: ReactNode;
}) => {
  const imageOnRight = imageSide === 'right';

  return (
    <div className="min-h-dvh flex flex-col md:flex-row">
      <Link
        to="/"
        className={cn(
          'sosrg-focus-ring fixed top-6 left-6 z-20 inline-flex items-center gap-2.5',
          !imageOnRight ? 'photo-text' : 'text-text-primary',
        )}
      >
        <img src={logo} alt="" className="w-11 h-11 rounded-lg object-cover" />
        <span className="font-auth-display text-sosrg-xl">SosrG</span>
      </Link>

      <div className={cn('relative h-56 md:h-auto md:w-1/2 overflow-hidden', imageOnRight ? 'md:order-2' : 'md:order-1')}>
        <img
          src={image}
          alt=""
          aria-hidden="true"
          className={cn('absolute inset-0 h-full w-full object-cover', imageOnRight ? 'split-image-mask-right' : 'split-image-mask-left')}
        />
        <div className="absolute inset-0 bg-scrim md:bg-black/10" />
        {/* Edge dissolve only makes sense once the image is actually beside
            a content column at md: — hidden below that, same reasoning as
            ProfileSetupPage's SplitStepImage. */}
        <div className={cn('hidden md:block absolute inset-0 pointer-events-none', imageOnRight ? 'split-image-overlay-right' : 'split-image-overlay-left')} />
        <p className="absolute bottom-4 left-4 md:bottom-8 md:left-8 font-auth-display italic photo-text text-sosrg-lg">{caption}</p>
      </div>

      <div className={cn('flex-1 md:w-1/2 flex flex-col justify-center px-6 py-10 sm:px-12 md:px-16', imageOnRight ? 'md:order-1' : 'md:order-2')}>
        <div className="w-full max-w-xl mx-auto md:mx-0 mt-16 md:mt-0">
          <Card variant="elevation-2" className="w-full p-[2em] sm:p-[2.75em]">
            {children}
          </Card>
        </div>
      </div>
    </div>
  );
};
