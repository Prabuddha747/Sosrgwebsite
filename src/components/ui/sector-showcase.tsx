import { ChevronRight } from 'lucide-react';
import { Avatar, AvatarFallback } from './avatar';
import { Button } from './button';
import { Marquee } from './marquee';
import { TALENT_CATEGORIES } from '../../data/mockData';

// Adapted from the "testimonials-13" marquee pattern: the top slot carries
// the sector's icon + name, the paragraph carries the sector's real brief
// (TALENT_CATEGORIES[].desc — no invented copy), and the bottom panel shows
// the sector's real photo full-width instead of the original's company logo.
export const SectorShowcase = ({ onSelect }: { onSelect?: (id: string) => void }) => (
  <div className="mask-x-from-80% space-y-px overflow-hidden rounded-2xl border border-white/10 bg-white/5">
    <Marquee className="py-0 [--duration:55s] [--gap:0px]" pauseOnHover>
      <SectorList onSelect={onSelect} />
    </Marquee>
  </div>
);

const SectorList = ({ onSelect }: { onSelect?: (id: string) => void }) =>
  TALENT_CATEGORIES.map((cat) => (
    <div className="-mx-1 flex w-full max-w-sm flex-col odd:flex-col-reverse" key={cat.id}>
      <div className="rounded-xl border border-white/10 bg-cinematic-gray shadow-[8px_8px_20px_rgba(8,5,2,0.4)]">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="size-10 flex items-center justify-center bg-white/10">
                <AvatarFallback className="bg-transparent">
                  <cat.icon size={18} className={cat.color} />
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium leading-tight">{cat.name}</p>
                <p className="mt-0.5 text-white/50 text-xs">Ecosystem Hub</p>
              </div>
            </div>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onSelect?.(cat.id)}
              aria-label={`Explore ${cat.name}`}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <p className="mt-5 text-[15px] text-white/70">{cat.desc}</p>
        </div>
      </div>

      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={cat.image}
          alt={cat.name}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cinematic-black/70 via-transparent to-transparent" />
      </div>
    </div>
  ));
