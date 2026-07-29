"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

interface CurtainTextProps {
  text: string;
  className?: string;
  delay?: number;
  onComplete?: () => void;
  /** Reduced-motion: render the words statically, skip the reveal. */
  disabled?: boolean;
}

// Word-by-word "curtain" reveal: each word rises out of its own mask while
// growing to full size — used for headline moments that need weight
// (docs3/design3.md Hero + emotional-centerpiece beats), not a generic
// fade-up.
export function CurtainText({ text, className, delay = 0, onComplete, disabled }: CurtainTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (disabled || !containerRef.current) {
      onComplete?.();
      return;
    }
    const words = containerRef.current.querySelectorAll<HTMLElement>("[data-word]");
    const tl = gsap.timeline({ delay, onComplete });
    tl.fromTo(
      words,
      { yPercent: 115, scale: 0.82, opacity: 0 },
      {
        yPercent: 0,
        scale: 1,
        opacity: 1,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.09,
      }
    );
    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled]);

  const words = text.split(" ");

  return (
    <span ref={containerRef} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.1em] -mb-[0.1em]">
          <span data-word className="inline-block will-change-transform">
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </span>
  );
}
