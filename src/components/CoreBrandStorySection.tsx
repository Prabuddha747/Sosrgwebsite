"use client";

import { useEffect, useRef, useState } from 'react';
import { Drama, Clapperboard, BookOpen, Music, PersonStanding, Palette, Hammer } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useScrollScrubVideo } from '@/hooks/useScrollScrubVideo';
import { NeumorphicCard } from '@/components/ui/neumorphic-card';

// docs3/design3.md "Core Brand Story" — the exact copy from design3.md §1,
// split into 6 beats rather than paraphrased.
const LINES = [
  'An artist is not just a profile.',
  'A filmmaker is not just a director.',
  'A craftsperson is not just a vendor.',
  'Every great film, performance, story, song, design, and creation is built by many talents working together.',
  'SosrG connects them.',
  'Recognises them. Empowers them.',
];

const DISCIPLINES = [
  { name: 'Theatre', Icon: Drama },
  { name: 'Cinema', Icon: Clapperboard },
  { name: 'Literature', Icon: BookOpen },
  { name: 'Music', Icon: Music },
  { name: 'Dance', Icon: PersonStanding },
  { name: 'Art & Design', Icon: Palette },
  { name: 'Craft', Icon: Hammer },
] as const;

// Lines occupy the first 55% of the pinned scroll range, cards fill the rest
// — "reveal one line at a time" then "stagger in after the text settles"
// (design3.md's Core Brand Story spec), both scrubbed off the same
// scroll progress the video is synced to.
const LINES_END = 0.55;
const CARDS_START = 0.55;

const CoreBrandStorySection = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lineRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reducedMotion = useReducedMotion();
  const [videoNear, setVideoNear] = useState(false);

  // Only start fetching this section's clip once it's within a viewport
  // of scroll position (design3.md §6 performance budget).
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVideoNear(true);
          io.disconnect();
        }
      },
      { rootMargin: '100% 0px' }
    );
    io.observe(track);
    return () => io.disconnect();
  }, []);

  const applyProgress = (progress: number) => {
    const lineSlice = LINES_END / LINES.length;
    lineRefs.current.forEach((el, i) => {
      if (!el) return;
      const start = i * lineSlice;
      const t = Math.min(1, Math.max(0, (progress - start) / lineSlice));
      el.style.opacity = String(t);
      el.style.transform = `translateY(${(1 - t) * 14}px)`;
    });

    const cardSlice = ((1 - CARDS_START) / DISCIPLINES.length) * 1.6;
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const start = CARDS_START + i * cardSlice * 0.55;
      const t = Math.min(1, Math.max(0, (progress - start) / cardSlice));
      if (t >= 1) {
        // Opacity stays inline forever (an "opacity-0" class is still on
        // this element for the pre-JS flash guard, and inline always beats
        // it). Only transform is released to CSS once settled, so the
        // hover:-translate-y-1 class can actually move the element — an
        // inline transform of any value would otherwise permanently
        // outrank it regardless of :hover.
        el.style.opacity = '1';
        el.style.transform = '';
      } else {
        el.style.opacity = String(t);
        el.style.transform = `scale(${0.85 + t * 0.15}) translateY(${(1 - t) * 20}px)`;
      }
    });
  };

  useScrollScrubVideo({
    trackRef,
    pinRef,
    videoRef,
    reducedMotion,
    onProgress: applyProgress,
  });

  useEffect(() => {
    if (!reducedMotion) return;
    lineRefs.current.forEach((el) => {
      if (!el) return;
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    cardRefs.current.forEach((el) => {
      if (!el) return;
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }, [reducedMotion]);

  return (
    <section className="relative bg-stage-black">
      <div ref={trackRef} style={{ height: reducedMotion ? 'auto' : '350vh' }}>
        <div
          ref={pinRef}
          className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-24 overflow-hidden"
        >
          {!reducedMotion && (
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover opacity-40"
              src={videoNear ? '/videos/walking-into-light.mp4' : undefined}
              poster="/videos/walking-into-light-poster.jpg"
              muted
              playsInline
              preload={videoNear ? 'auto' : 'none'}
              onError={(e) => {
                (e.currentTarget as HTMLVideoElement).style.display = 'none';
              }}
            />
          )}
          {reducedMotion && (
            <img
              src="/videos/walking-into-light-poster.jpg"
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-40"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-stage-black via-stage-black/70 to-stage-black/40 pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-display font-light text-3xl md:text-5xl text-ivory mb-10">
              From Individual Talent to Collective Creation.
            </h2>
            <div className="flex flex-col gap-3">
              {LINES.map((line, i) => (
                <p
                  key={line}
                  ref={(el) => {
                    lineRefs.current[i] = el;
                  }}
                  className={`text-ivory/80 text-base sm:text-lg leading-relaxed ${reducedMotion ? '' : 'opacity-0'}`}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>

          <div className="relative z-10 columns-2 sm:columns-3 lg:columns-4 gap-4 max-w-5xl w-full">
            {DISCIPLINES.map(({ name, Icon }, i) => (
              <NeumorphicCard
                key={name}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className={`mb-4 break-inside-avoid p-6 flex flex-col items-center gap-3 text-center transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[8px_8px_20px_rgba(0,0,0,0.6),-6px_-6px_16px_rgba(201,162,39,0.15)] ${reducedMotion ? '' : 'opacity-0'}`}
              >
                <Icon className="text-antique-gold" size={28} strokeWidth={1.5} />
                <span className="text-ivory font-display text-lg">{name}</span>
              </NeumorphicCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreBrandStorySection;
