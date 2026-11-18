"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** Fade + slide up when scrolled into view (brand motion: 700ms, cubic-bezier(.2,.8,.2,1)). */
export function Reveal({ children, delay = 0, y = 40, className = "" }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.8, 0.2, 1] }}>
      {children}
    </motion.div>
  );
}
