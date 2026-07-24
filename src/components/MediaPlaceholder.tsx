import React from 'react';

type Framing = 'wide' | 'portrait' | 'close-up' | 'drone' | 'bts';

interface MediaPlaceholderProps {
  purpose: string;
  framing: Framing;
  aspectRatio: string;
  durationSec?: number;
  shot: string;
  className?: string;
}

/**
 * Swappable slot for real photography/video. Renders only the shot brief
 * until a real `src` pipeline replaces it — never falls back to AI/stock
 * imagery. Search "MediaPlaceholder" to find every slot awaiting footage.
 */
const MediaPlaceholder: React.FC<MediaPlaceholderProps> = ({
  purpose,
  framing,
  aspectRatio,
  durationSec,
  shot,
  className = '',
}) => {
  return (
    <div
      style={{ aspectRatio }}
      className={`relative w-full overflow-hidden rounded-2xl border border-dashed border-[#B9914A]/30 bg-[#11151B] flex flex-col items-center justify-center text-center p-6 gap-3 ${className}`}
    >
      <span className="uppercase tracking-[0.2em] text-[10px] text-[#B9914A]">
        {framing}
        {durationSec ? ` · ${durationSec}s` : ' · still'}
      </span>
      <p className="text-[#F5F4F2]/80 text-xs md:text-sm leading-relaxed max-w-sm">{shot}</p>
      <span className="text-[#F5F4F2]/30 text-[10px] uppercase tracking-widest">{purpose}</span>
    </div>
  );
};

export default MediaPlaceholder;
