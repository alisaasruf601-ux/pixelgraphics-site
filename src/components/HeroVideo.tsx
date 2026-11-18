"use client";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/** Muted looping homepage video with an accessible pause/play control. */
export function HeroVideo({ src, poster, className = "", controlClassName = "" }: { src: string; poster?: string; className?: string; controlClassName?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (reduce) { v.pause(); return; }
    v.play().catch(() => setPlaying(false));
  }, [reduce]);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {}); else v.pause();
  };

  return (
    <>
      <video ref={ref} className={className} src={src} poster={poster || undefined} muted loop playsInline preload="metadata"
        aria-hidden="true" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
      <button type="button" onClick={toggle} aria-label={playing ? "Pause background video" : "Play background video"}
        className={`absolute z-20 grid h-10 w-10 place-items-center rounded-full bg-ink/70 text-cloud ring-1 ring-white/20 backdrop-blur transition hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal ${controlClassName}`}>
        {playing ? (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.9l10.4-6.5a1 1 0 0 0 0-1.7L9.5 4.6A1 1 0 0 0 8 5.5z" /></svg>
        )}
      </button>
    </>
  );
}
