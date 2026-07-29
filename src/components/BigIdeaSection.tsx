"use client";

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useScrollScrubVideo } from '@/hooks/useScrollScrubVideo';

// docs3/design3.md Section 3 — "No Creation Happens Alone". The video is
// mood/background only; the actual content is this radial node graph,
// built as an SVG overlay driven by the same scroll progress the video is
// scrubbed against (Flow can't generate 15 labeled, precisely-positioned
// UI nodes reliably — design3.md says as much).
const ROLES = [
  'Writer', 'Director', 'Actor', 'DOP', 'Editor', 'Musician',
  'Sound Engineer', 'Makeup', 'Costume', 'Set Designer', 'Craftsperson',
  'Designer', 'Producer', 'Distributor', 'Promoter',
] as const;

const RADIUS_X = 40;
const RADIUS_Y = 34;

// Rounded to 2dp: Math.cos/Math.sin aren't guaranteed bit-identical between
// Node (SSR) and the browser (hydration), and the raw float would trip a
// hydration mismatch on these SVG coordinates otherwise.
const round2 = (n: number) => Math.round(n * 100) / 100;

const NODE_POSITIONS = ROLES.map((role, i) => {
  const angle = (i / ROLES.length) * Math.PI * 2 - Math.PI / 2;
  return {
    role,
    x: round2(50 + Math.cos(angle) * RADIUS_X),
    y: round2(50 + Math.sin(angle) * RADIUS_Y),
  };
});

// Nodes fill the middle of the pinned scroll range; the closing statement
// takes the last stretch, after the network has fully formed.
const NODES_START = 0.05;
const NODES_END = 0.82;
const CLOSE_START = 0.84;

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

const BigIdeaSection = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);
  const closeRef = useRef<HTMLParagraphElement>(null);
  const reducedMotion = useReducedMotion();
  const [videoNear, setVideoNear] = useState(false);

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
    const slice = (NODES_END - NODES_START) / ROLES.length;
    NODE_POSITIONS.forEach((_, i) => {
      const start = NODES_START + i * slice;
      const t = clamp01((progress - start) / slice);
      const node = nodeRefs.current[i];
      if (node) {
        if (t >= 1) {
          // Opacity stays inline forever (an "opacity-0" class is still on
          // this element for the pre-JS flash guard, and inline always
          // beats it — clearing it here would just snap back to hidden).
          // Only transform is released so hover:scale-110 can take over.
          node.style.opacity = '1';
          node.style.transform = '';
        } else {
          node.style.opacity = String(t);
          node.style.transform = `scale(${0.5 + t * 0.5})`;
        }
      }
      const line = lineRefs.current[i];
      if (line) line.style.strokeDashoffset = String(1 - t);
    });

    const closeT = clamp01((progress - CLOSE_START) / (1 - CLOSE_START));
    if (closeRef.current) {
      closeRef.current.style.opacity = String(closeT);
      closeRef.current.style.transform = `translateY(${(1 - closeT) * 16}px)`;
    }
  };

  useScrollScrubVideo({
    trackRef,
    pinRef,
    videoRef,
    reducedMotion,
    onProgress: applyProgress,
  });

  return (
    <section className="relative bg-stage-black">
      <div ref={trackRef} style={{ height: reducedMotion ? 'auto' : '400vh' }}>
        <div
          ref={pinRef}
          className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 py-24 overflow-hidden"
        >
          {!reducedMotion && (
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover opacity-40"
              src={videoNear ? '/videos/fingertips-violin.mp4' : undefined}
              poster="/videos/fingertips-violin-poster.jpg"
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
              src="/videos/fingertips-violin-poster.jpg"
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-40"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-stage-black via-stage-black/60 to-stage-black/50 pointer-events-none" />

          <div className="relative z-10 w-full max-w-4xl aspect-square scale-75 sm:scale-90 lg:scale-100">
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {NODE_POSITIONS.map(({ role, x, y }, i) => (
                <line
                  key={role}
                  ref={(el) => {
                    lineRefs.current[i] = el;
                  }}
                  x1={50}
                  y1={50}
                  x2={x}
                  y2={y}
                  stroke="#C9A227"
                  strokeWidth={0.15}
                  strokeOpacity={0.5}
                  pathLength={1}
                  strokeDasharray={1}
                  strokeDashoffset={reducedMotion ? 0 : 1}
                />
              ))}
            </svg>

            {NODE_POSITIONS.map(({ role, x, y }, i) => (
              <div
                key={role}
                className="absolute"
                style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
              >
                <div
                  ref={(el) => {
                    nodeRefs.current[i] = el;
                  }}
                  className={`rounded-full border border-antique-gold/30 bg-card-black px-3 py-1.5 text-xs sm:text-sm text-ivory whitespace-nowrap transition-transform duration-300 hover:scale-110 hover:border-antique-gold ${
                    reducedMotion ? '' : 'opacity-0'
                  }`}
                >
                  {role}
                </div>
              </div>
            ))}
          </div>

          <p
            ref={closeRef}
            className={`absolute bottom-16 sm:bottom-20 left-0 right-0 text-center px-4 font-display font-light text-2xl sm:text-4xl text-ivory ${
              reducedMotion ? '' : 'opacity-0'
            }`}
          >
            From One Creator to an Entire Creative Ecosystem.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BigIdeaSection;
