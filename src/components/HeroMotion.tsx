"use client";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useIntroPlaying } from "@/lib/intro";

/** Staggered headline reveal: each line slides up from a mask. */
export function MaskLines({ lines, fields = [] }: { lines: { text: string; accent?: boolean }[]; fields?: (string | undefined)[] }) {
  const wait = useIntroPlaying();
  return (
    <>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-1" data-tina-field={fields[i]}>
          <motion.span className={`block ${l.accent ? "text-teal" : ""}`}
            initial={{ y: "105%" }} animate={wait ? { y: "105%" } : { y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.2, 0.8, 0.2, 1] }}>{l.text}</motion.span>
        </span>
      ))}
    </>
  );
}

export function FadeIn({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const wait = useIntroPlaying();
  return <motion.div className={className} initial={{ opacity: 0, y: 24 }} animate={wait ? { opacity: 0, y: 24 } : { opacity: 1, y: 0 }} transition={{ duration: 0.8, delay, ease: [0.2, 0.8, 0.2, 1] }}>{children}</motion.div>;
}

/** Hero artwork: diagonal wipe-in + gentle parallax on scroll. */
export function HeroArt({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 80]);
  return (
    <motion.div ref={ref} style={{ y }} className="relative"
      initial={reduce ? false : { clipPath: "polygon(110% -10%, 110% -10%, 110% 110%, 110% 110%)", opacity: 0.4 }}
      animate={{ clipPath: "polygon(-10% -10%, 110% -10%, 110% 110%, -10% 110%)", opacity: 1 }}
      transition={{ duration: 1.1, delay: 0.3, ease: [0.7, 0, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}
