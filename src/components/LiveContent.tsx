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
import { HOME_QUERY, SERVICES_QUERY, PRICING_QUERY, THEME_QUERY } from "@/lib/tina-queries";
import { themeVars, type ThemeData } from "@/config/theme";
import { googleFontsHref } from "@/config/fonts";

type Home = typeof homeJson;
type Services = typeof servicesJson;
type Pricing = typeof pricingJson;

type Live = { home: Home; services: Services; pricing: Pricing; theme: ThemeData };
const Ctx = createContext<Live>({ home: homeJson, services: servicesJson, pricing: pricingJson, theme: themeJson });

// Stable references: useTina re-initialises whenever `data`/`variables` change identity.
const HOME = { query: HOME_QUERY, variables: { relativePath: "home.json" }, data: { home: homeJson } };
const SERVICES = { query: SERVICES_QUERY, variables: { relativePath: "services.json" }, data: { services: servicesJson } };
const PRICING = { query: PRICING_QUERY, variables: { relativePath: "pricing.json" }, data: { pricing: pricingJson } };
const THEME = { query: THEME_QUERY, variables: { relativePath: "theme.json" }, data: { theme: themeJson as ThemeData } };

export function LiveContentProvider({ children }: { children: ReactNode }) {
  const h = useTina(HOME);
  const s = useTina(SERVICES);
  const p = useTina(PRICING);
  const t = useTina(THEME);
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

  const value = useMemo(() => ({ home: h.data.home, services: s.data.services, pricing: p.data.pricing, theme }), [h.data, s.data, p.data, theme]);
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
