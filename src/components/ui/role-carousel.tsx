import { cn } from '../../lib/utils';
import { ScaffoldRow, ComingSoonTag } from '../ScaffoldUI';

export interface RoleCard {
  id: string;
  /** Category hint shown on the card even while scaffolded (e.g. "Cinema") — not a fabricated person's info. */
  tag?: string;
  title?: string;
  description?: string;
  image?: string;
}

// Big cards on native scroll-snap, styled with the same gold/cinematic-gray
// vocabulary as the rest of the (still dark-themed) home page.
export function RoleCarousel({
  items,
  className,
  scaffold = false,
}: {
  items: RoleCard[];
  className?: string;
  /** True until real per-person photos + bios are uploaded — renders shimmer placeholders instead of item.image/title/description. */
  scaffold?: boolean;
}) {
  return (
    <div className={cn('relative', className)}>
      <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory no-scrollbar scroll-smooth">
        {items.map((item) =>
          scaffold ? (
            <div
              key={item.id}
              data-role-card
              className="relative shrink-0 w-64 sm:w-72 aspect-[4/5] snap-start overflow-hidden rounded-2xl border border-white/10 bg-cinematic-gray p-4"
            >
              <ComingSoonTag />
              {item.tag && (
                <span className="absolute top-4 left-4 z-10 bg-gold text-black px-2 py-1 rounded text-[9px] font-bold uppercase tracking-widest">
                  {item.tag}
                </span>
              )}
              <ScaffoldRow className="h-full w-full" />
              <div className="absolute bottom-4 left-4 right-4 space-y-2">
                <ScaffoldRow className="h-5 w-2/3" />
                <ScaffoldRow className="h-4 w-full" />
                <ScaffoldRow className="h-4 w-4/5" />
              </div>
            </div>
          ) : (
            <div
              key={item.id}
              data-role-card
              className="relative shrink-0 w-64 sm:w-72 aspect-[4/5] snap-start overflow-hidden rounded-2xl border border-white/10 bg-cinematic-gray"
            >
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cinematic-black/95 via-cinematic-black/40 to-transparent" />
              {item.tag && (
                <span className="absolute top-4 left-4 bg-gold text-black px-2 py-1 rounded text-[9px] font-bold uppercase tracking-widest">
                  {item.tag}
                </span>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h4 className="text-lg font-bold mb-1">{item.title}</h4>
                <p className="text-sm text-white/70 line-clamp-2">{item.description}</p>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
