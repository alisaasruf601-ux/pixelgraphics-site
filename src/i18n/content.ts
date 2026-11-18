/** Editable page content (content/*.json, edited at /admin) per language. English = content/*.json, others = content/<lang>/*.json. */
import type { Locale } from "./config";
import enHome from "../../content/home.json";
import enServices from "../../content/services.json";
import enPricing from "../../content/pricing.json";
import enAbout from "../../content/about.json";
import nlHome from "../../content/nl/home.json";
import nlServices from "../../content/nl/services.json";
import nlPricing from "../../content/nl/pricing.json";
import nlAbout from "../../content/nl/about.json";
import ptHome from "../../content/pt/home.json";
import ptServices from "../../content/pt/services.json";
import ptPricing from "../../content/pt/pricing.json";
import ptAbout from "../../content/pt/about.json";
import esHome from "../../content/es/home.json";
import esServices from "../../content/es/services.json";
import esPricing from "../../content/es/pricing.json";
import esAbout from "../../content/es/about.json";
import deHome from "../../content/de/home.json";
import deServices from "../../content/de/services.json";
import dePricing from "../../content/de/pricing.json";
import deAbout from "../../content/de/about.json";

export type PageContent = { home: typeof enHome; services: typeof enServices; pricing: typeof enPricing; about: typeof enAbout };

const all: Record<Locale, PageContent> = {
  en: { home: enHome, services: enServices, pricing: enPricing, about: enAbout },
  nl: { home: nlHome, services: nlServices, pricing: nlPricing, about: nlAbout } as PageContent,
  pt: { home: ptHome, services: ptServices, pricing: ptPricing, about: ptAbout } as PageContent,
  es: { home: esHome, services: esServices, pricing: esPricing, about: esAbout } as PageContent,
  de: { home: deHome, services: deServices, pricing: dePricing, about: deAbout } as PageContent,
};

/**
 * Prices, package ids and photos are shared by all languages: they always come from the English
 * files, so you only change them once (in the English version at /admin).
 */
function shared(c: PageContent): PageContent {
  const en = all.en;
  const h = en.pricing.hourly;
  return {
    ...c,
    pricing: {
      ...c.pricing,
      hourly: { ...c.pricing.hourly, rate: h.rate, minHours: h.minHours, maxHours: h.maxHours, rushSurcharge: h.rushSurcharge, quickPicks: h.quickPicks },
      packages: c.pricing.packages.map((p, i) => {
        const e = en.pricing.packages[i];
        return e ? { ...p, id: e.id, priceFrom: e.priceFrom, recommended: e.recommended } : p;
      }),
    },
    services: {
      ...c.services,
      showcase: c.services.showcase.map((sc) => {
        const e = en.services.showcase.find((x) => x.slug === sc.slug) as { image?: string } | undefined;
        return e?.image ? { ...sc, image: e.image } : sc;
      }),
    },
    about: { ...c.about, intro: { ...c.about.intro, photo: en.about.intro.photo } },
  };
}

const cache: Partial<Record<Locale, PageContent>> = {};
export const getContent = (lang: Locale): PageContent =>
  lang === "en" ? all.en : (cache[lang] ??= shared(all[lang] ?? all.en));
/** File path used by the /admin editor for this language, e.g. "nl/home.json". */
export const contentPath = (lang: Locale, file: "home" | "services" | "pricing" | "about") => (lang === "en" ? `${file}.json` : `${lang}/${file}.json`);
