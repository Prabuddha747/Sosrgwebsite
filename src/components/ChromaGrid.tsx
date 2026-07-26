"use client";

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, BadgeCheck } from 'lucide-react';
import './ChromaGrid.css';

export interface ChromaItem {
  id?: string;
  image?: string;
  title?: string;
  subtitle?: string;
  handle?: string;
  borderColor?: string;
  gradient?: string;
  url?: string;
  skills?: string[];
  isAdmin?: boolean;
  verified?: boolean;
  rawItem?: any;
}

interface ChromaGridProps {
  items: ChromaItem[];
  className?: string;
  radius?: number;
  columns?: number;
  rows?: number;
  damping?: number;
  fadeOut?: number;
  ease?: string;
  onCardClick?: (item: ChromaItem) => void;
}

export const ChromaGrid = ({
  items,
  className = '',
  radius = 300,
  columns = 3,
  rows = 2,
  damping = 0.45,
  fadeOut = 0.6,
  ease = 'power3.out',
  onCardClick
}: ChromaGridProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const setX = useRef<((value: number) => void) | null>(null);
  const setY = useRef<((value: number) => void) | null>(null);
  const pos = useRef({ x: 0, y: 0 });

  const demo: ChromaItem[] = [
    {
      image: 'https://i.pravatar.cc/300?img=8',
      title: 'Alex Rivera',
      subtitle: 'Full Stack Developer',
      handle: 'PATNA SANCTUARY',
      borderColor: '#B9914A',
      gradient: 'linear-gradient(145deg, rgba(184, 160, 137, 0.1), #12161f)',
      url: 'https://github.com/'
    },
    {
      image: 'https://i.pravatar.cc/300?img=11',
      title: 'Jordan Chen',
      subtitle: 'DevOps Engineer',
      handle: 'GAYA SANCTUARY',
      borderColor: '#B9914A',
      gradient: 'linear-gradient(210deg, rgba(184, 160, 137, 0.1), #12161f)',
      url: 'https://linkedin.com/in/'
    },
    {
      image: 'https://i.pravatar.cc/300?img=3',
      title: 'Morgan Blake',
      subtitle: 'UI/UX Designer',
      handle: 'BHAGALPUR SANCTUARY',
      borderColor: '#B9914A',
      gradient: 'linear-gradient(165deg, rgba(184, 160, 137, 0.1), #12161f)',
      url: 'https://dribbble.com/'
    }
  ];

  const data = items?.length ? items : demo;

  // Calculate dynamic rows/cols based on data size if not explicitly set
  const finalCols = columns || Math.min(3, data.length);
  const finalRows = rows || Math.ceil(data.length / finalCols);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    
    // GSAP Quick Setters for CSS Variables
    setX.current = gsap.quickSetter(el, '--x', 'px') as (value: number) => void;
    setY.current = gsap.quickSetter(el, '--y', 'px') as (value: number) => void;
    
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    
    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  const moveTo = (x: number, y: number) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true
    });
  };

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!rootRef.current) return;
    const r = rootRef.current.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    
    if (fadeRef.current) {
      gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
    }
  };

  const handleLeave = () => {
    if (fadeRef.current) {
      gsap.to(fadeRef.current, {
        opacity: 1,
        duration: fadeOut,
        overwrite: true
      });
    }
  };

  const handleCardClick = (item: ChromaItem) => {
    if (onCardClick) {
      onCardClick(item);
    } else if (item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCardMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={rootRef}
      className={`chroma-grid ${className}`}
      style={{
        '--r': `${radius}px`,
        '--cols': finalCols,
        '--rows': finalRows
      } as React.CSSProperties}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {data.map((c, i) => (
        <article
          key={i}
          className="chroma-card group/card"
          onMouseMove={handleCardMove}
          onClick={() => handleCardClick(c)}
          style={{
            '--card-border': c.borderColor || '#B9914A',
            '--card-gradient': c.gradient || 'linear-gradient(145deg, rgba(184, 160, 137, 0.05), #12161f)',
            cursor: 'pointer'
          } as React.CSSProperties}
        >
          <div className="absolute top-0 left-0 w-full h-[1px] bg-[#B9914A] opacity-0 group-hover/card:opacity-100 transition-opacity z-10" />

          <div className="chroma-img-wrapper relative">
            {c.image ? (
              <img
                src={c.image}
                alt={c.title}
                loading="lazy"
                className="w-full h-full object-cover rounded-full grayscale group-hover/card:grayscale-0 transition-all duration-1000"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/20 font-black text-4xl italic">
                {(c.title || 'C').charAt(0)}
              </div>
            )}
            {c.verified && (
              <div className="absolute bottom-1 right-1 bg-[#090B10] rounded-full p-0.5" title="Verified">
                <BadgeCheck size={18} className="text-[#B9914A]" fill="currentColor" stroke="#090B10" />
              </div>
            )}
          </div>

          <footer className="chroma-info flex flex-col gap-3 relative z-10 mt-auto">
            <div className="space-y-1">
              {c.handle && (
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#B9914A]/70 italic block">
                  {c.handle}
                </span>
              )}
              <h3 className="name text-2xl font-bold text-white group-hover/card:text-[#B9914A] transition-colors leading-none font-sans italic truncate flex items-center gap-2">
                {c.title}
              </h3>
            </div>
            
            <p className="role text-xs text-white/50 tracking-wider font-light line-clamp-1 italic">
              {c.subtitle}
            </p>

            {c.skills && c.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                {c.skills.slice(0, 3).map((skill) => (
                  <span key={skill} className="text-[8px] font-bold uppercase tracking-widest px-2.5 py-1 bg-white/5 rounded-full border border-white/10 text-white/60 group-hover/card:text-white transition-all italic">
                    {skill}
                  </span>
                ))}
              </div>
            )}

            <div className="pt-4 mt-2">
              <div className="w-full py-3.5 bg-white text-[#1A1A1A] rounded-full text-[9px] font-black uppercase tracking-[0.4em] group-hover/card:bg-[#B9914A] group-hover/card:text-white transition-all duration-500 shadow-xl flex items-center justify-center font-sans">
                VIEW PORTFOLIO <ArrowRight size={12} className="ml-3 group-hover/card:translate-x-1.5 transition-transform" />
              </div>
            </div>
          </footer>
        </article>
      ))}
      <div className="chroma-overlay" />
      <div ref={fadeRef} className="chroma-fade" />
    </div>
  );
};

export default ChromaGrid;
