"use client";
/**
 * LIVE CONTENT — supplies the editable content (content/*.json) to the website.
 * On the public site it simply returns the saved content. Inside the TinaCMS visual editor
 * (/admin) every change is sent here live, and `tf()` links page elements to their fields
 * so clicking an element on the page opens it in the editor.
 */
import { createContext, useContext, useEffect, useMemo, type ReactNode } from "react";
import { useTina, tinaField } from "tinacms/dist/react";
import homeJson from "../../content/home.json";
import servicesJson from "../../content/services.json";
import pricingJson from "../../content/pricing.json";
import themeJson from "../../content/theme.json";
import aboutJson from "../../content/about.json";
import type { Locale } from "@/i18n/config";
import { contentPath, type PageContent } from "@/i18n/content";
import { HOME_QUERY, SERVICES_QUERY, PRICING_QUERY, THEME_QUERY, ABOUT_QUERY } from "@/lib/tina-queries";
import { themeVars, type ThemeData } from "@/config/theme";
import { googleFontsHref } from "@/config/fonts";

type Home = typeof homeJson;
type Services = typeof servicesJson;
type Pricing = typeof pricingJson;
type About = typeof aboutJson;

type Live = { home: Home; services: Services; pricing: Pricing; theme: ThemeData; about: About };
const Ctx = createContext<Live>({ home: homeJson, services: servicesJson, pricing: pricingJson, theme: themeJson, about: aboutJson });

const THEME = { query: THEME_QUERY, variables: { relativePath: "theme.json" }, data: { theme: themeJson as ThemeData } };

/** Content of the current language. In the /admin editor each language is its own document (e.g. nl/home.json). */
export function LiveContentProvider({ children, lang, content }: { children: ReactNode; lang: Locale; content: PageContent }) {
  // Stable references: useTina re-initialises whenever `data`/`variables` change identity.
  const q = useMemo(() => ({
    home: { query: HOME_QUERY, variables: { relativePath: contentPath(lang, "home") }, data: { home: content.home } },
    services: { query: SERVICES_QUERY, variables: { relativePath: contentPath(lang, "services") }, data: { services: content.services } },
    pricing: { query: PRICING_QUERY, variables: { relativePath: contentPath(lang, "pricing") }, data: { pricing: content.pricing } },
    about: { query: ABOUT_QUERY, variables: { relativePath: contentPath(lang, "about") }, data: { about: content.about } },
  }), [lang, content]);
  const h = useTina(q.home);
  const s = useTina(q.services);
  const p = useTina(q.pricing);
  const t = useTina(THEME);
  const ab = useTina(q.about);
  const theme = t.data.theme;

  // Apply font / size / colour choices live (only differs from the saved theme while editing).
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(themeVars(theme)).forEach(([k, v]) => root.style.setProperty(k, v));
    const href = googleFontsHref([theme.headingFont, theme.bodyFont]);
    let link = document.getElementById("pg-live-fonts") as HTMLLinkElement | null;
    if (href) {
      if (!link) { link = document.createElement("link"); link.id = "pg-live-fonts"; link.rel = "stylesheet"; document.head.appendChild(link); }
      if (link.href !== href) link.href = href;
    }
  }, [theme]);

  const value = useMemo(() => ({ home: h.data.home, services: s.data.services, pricing: p.data.pricing, theme, about: ab.data.about }), [h.data, s.data, p.data, theme, ab.data]);
  return (
    <Ctx.Provider value={value}>
      {children}
    </Ctx.Provider>
  );
}

export const useLive = () => useContext(Ctx);

/** True only when the page is shown inside the TinaCMS visual editor (/admin on the same site). */
export function inVisualEditor() {
  if (typeof window === "undefined" || window.self === window.top) return false;
  try { return window.top!.location.pathname.startsWith("/admin"); } catch { return false; }
}

/** Link an element to its editor field: <h1 data-tina-field={tf(obj, "title")}>. Empty outside the editor. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const tf = (obj: any, field?: string, index?: number): string | undefined => {
  if (!obj || typeof obj !== "object") return undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (tinaField as any)(obj, field, index) || undefined;
};
