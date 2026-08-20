import { Youtube } from 'lucide-react';
import type { ContentShare } from '../../services/community';

function humanizeProfileType(profileType: string): string {
  return profileType
    .split('_')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
}

// One tile of the Content Sharing grid — Instagram Explore-style dense
// grid, but each tile carries its own caption card (name, profession,
// industry, caption) seamlessly joined below the video, not a separate
// side panel.
export const ContentShareFeedItem = ({ share }: { share: ContentShare }) => (
  <div className="flex flex-col items-stretch">
    <div className="relative aspect-[9/16] overflow-hidden bg-black border border-white/10 rounded-t-2xl">
      <iframe
        src={`https://www.youtube.com/embed/${share.youtubeVideoId}`}
        title={share.caption ?? 'Shared clip'}
        className="absolute inset-0 h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>

    <div className="glass-panel h-32 p-3 flex flex-col gap-1.5 rounded-t-none! rounded-b-2xl!">
      <div>
        <p className="font-bold text-xs truncate">{share.authorDisplayName}</p>
        <p className="text-[9px] text-white/50 uppercase tracking-widest mt-0.5">
          {humanizeProfileType(share.authorProfileType)}
        </p>
      </div>

      <span className="self-start flex items-center gap-1 bg-gold/10 text-gold px-2 py-0.5 rounded-full text-[8px] uppercase tracking-widest font-bold">
        <Youtube size={9} /> {share.industry}
      </span>

      <p className="text-[11px] text-white/80 leading-relaxed line-clamp-2">{share.caption}</p>
    </div>
  </div>
);
