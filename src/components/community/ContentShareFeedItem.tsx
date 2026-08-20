import { Youtube } from 'lucide-react';
import type { ContentShare } from '../../services/community';

function humanizeProfileType(profileType: string): string {
  return profileType
    .split('_')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
}

// Content Sharing feed item. sm: and up — video + caption side by side at a
// matched fixed width, laid out in a 2-column grid. Below sm — each stacks
// full-width (video on top), so a phone gets one big video per screen and
// scrolls down for the caption and the next clip, instead of squeezing both
// into a narrow row.
export const ContentShareFeedItem = ({ share }: { share: ContentShare }) => (
  <div className="flex flex-col sm:flex-row items-stretch">
    <div className="w-full sm:w-64 shrink-0">
      <div className="relative aspect-[9/16] overflow-hidden bg-black border border-white/10 rounded-t-2xl sm:rounded-t-none sm:rounded-l-2xl">
        <iframe
          src={`https://www.youtube.com/embed/${share.youtubeVideoId}`}
          title={share.caption ?? 'Shared clip'}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </div>

    <div className="glass-panel w-full sm:w-64 shrink-0 p-4 flex flex-col gap-2 rounded-t-none! rounded-b-2xl! sm:rounded-b-none! sm:rounded-r-2xl!">
      <div>
        <p className="font-bold text-sm">{share.authorDisplayName}</p>
        <p className="text-[10px] text-white/50 uppercase tracking-widest mt-0.5">
          {humanizeProfileType(share.authorProfileType)}
        </p>
      </div>

      <span className="self-start flex items-center gap-1 bg-gold/10 text-gold px-2 py-0.5 rounded-full text-[9px] uppercase tracking-widest font-bold">
        <Youtube size={10} /> {share.industry}
      </span>

      {share.caption && <p className="text-xs text-white/80 leading-relaxed line-clamp-4">{share.caption}</p>}
    </div>
  </div>
);
