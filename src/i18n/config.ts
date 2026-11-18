/** LANGUAGES. English is the default and lives at the root (/about); others get a prefix (/nl/about). */
export const locales = ["en", "nl", "pt", "es", "de"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English", nl: "Nederlands", pt: "Português", es: "Español", de: "Deutsch",
};
/** Used for <html lang> and Open Graph. */
export const localeTags: Record<Locale, { html: string; og: string }> = {
  en: { html: "en", og: "en_US" }, nl: { html: "nl", og: "nl_NL" }, pt: { html: "pt-BR", og: "pt_BR" },
  es: { html: "es", og: "es_ES" }, de: { html: "de", og: "de_DE" },
};

export const isLocale = (s: string | undefined | null): s is Locale => !!s && (locales as readonly string[]).includes(s);

const UNLOCALIZED = /^\/(api|admin|uploads|brand|video|showcase|_next)(\/|$)/;

/** "/about" → "/nl/about" (English stays "/about"). External links, anchors and files are returned unchanged. */
export function localizeHref(href: string, lang: Locale): string {
  if (!href || !href.startsWith("/") || href.startsWith("//") || UNLOCALIZED.test(href) || /\.[a-z0-9]{2,5}($|\?|#)/i.test(href.split(/[?#]/)[0])) return href;
  const { rest } = splitLocale(href);
  if (lang === defaultLocale) return rest;
  return rest === "/" ? `/${lang}` : rest.startsWith("/?") || rest.startsWith("/#") ? `/${lang}${rest.slice(1)}` : `/${lang}${rest}`;
}

/** "/nl/about" → { lang: "nl", rest: "/about" }; "/about" → { lang: "en", rest: "/about" }. */
export function splitLocale(path: string): { lang: Locale; rest: string } {
  const m = path.match(/^\/([a-z]{2})(?=\/|$|\?|#)(.*)$/);
  if (m && isLocale(m[1])) return { lang: m[1], rest: m[2] && !m[2].startsWith("?") && !m[2].startsWith("#") ? m[2] : "/" + (m[2] || "") };
  return { lang: defaultLocale, rest: path || "/" };
}

/** Fills a text template: fmt("{n} hours", { n: 8 }) → "8 hours". */
export const fmt = (tpl: string, vars: Record<string, string | number>) => tpl.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
