import { Pencil, Trash2, Youtube } from 'lucide-react';
import type { ContentShare } from '../../services/community';

// Reel/Shorts-format card (9:16, embedded player). 'feed' layout (default)
// gives the caption its own padded block below the video, Quora/Instagram-
// post style — never overlaid on the media. 'grid' layout drops the caption
// entirely (thumbnail only, industry badge + edit/delete controls stay),
// matching Instagram's own profile grid, for the profile's My Shared Videos tab.
export const ContentShareCard = ({
  share,
  editable = false,
  onEdit,
  onDelete,
  deleting = false,
  layout = 'feed',
}: {
  share: ContentShare;
  editable?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  deleting?: boolean;
  layout?: 'feed' | 'grid';
}) => (
  <div className="rounded-2xl overflow-hidden bg-black border border-white/10 group glass-panel">
    <div className="relative aspect-[9/16] bg-black">
      <iframe
        src={`https://www.youtube.com/embed/${share.youtubeVideoId}`}
        title={share.caption ?? 'Shared clip'}
        className="absolute inset-0 h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 p-3 flex items-start justify-between bg-gradient-to-b from-black/70 to-transparent">
        <span className="flex items-center gap-1 bg-gold/90 text-black px-2 py-1 rounded-full text-[9px] uppercase tracking-widest font-bold">
          <Youtube size={11} /> {share.industry}
        </span>
        {editable && (
          <div className="pointer-events-auto flex items-center gap-1.5">
            <button
              onClick={onEdit}
              aria-label="Edit clip"
              className="bg-black/60 hover:bg-black/80 text-white rounded-full p-1.5 transition-colors"
            >
              <Pencil size={13} />
            </button>
            <button
              onClick={onDelete}
              disabled={deleting}
              aria-label="Delete clip"
              className="bg-black/60 hover:bg-red-500/80 text-white rounded-full p-1.5 transition-colors disabled:opacity-50"
            >
              <Trash2 size={13} />
            </button>
          </div>
        )}
      </div>
    </div>
    {layout === 'feed' && share.caption && (
      <div className="p-4 bg-cinematic-gray/60">
        <p className="text-sm text-white/90 leading-relaxed">{share.caption}</p>
      </div>
    )}
  </div>
);
