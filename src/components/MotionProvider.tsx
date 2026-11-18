"use client";
import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { site } from "@/config/site";

/** Honours the visitor's "reduce motion" setting for every Framer Motion animation (transforms are skipped, fades kept). */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion={site.respectReducedMotion ? "user" : "never"}>{children}</MotionConfig>;
}
