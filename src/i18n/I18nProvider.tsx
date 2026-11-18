"use client";
import { createContext, useContext, type ReactNode } from "react";
import type { Locale } from "./config";
import { localizeHref } from "./config";
import type { Dict } from "./dictionaries/en";

const Ctx = createContext<{ lang: Locale; t: Dict } | null>(null);

export function I18nProvider({ lang, t, children }: { lang: Locale; t: Dict; children: ReactNode }) {
  return <Ctx.Provider value={{ lang, t }}>{children}</Ctx.Provider>;
}

/** Current language, its texts (t) and a helper to localise internal links. */
export function useI18n() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useI18n must be used inside I18nProvider");
  return { ...c, href: (h: string) => localizeHref(h, c.lang) };
}
