import type { Metadata } from "next";
import { isLocale, type Locale } from "./config";
import { getDictionary } from "./index";
import type { Dict } from "./dictionaries/en";
import { alternatesFor } from "./seo";

type Params = { params: Promise<{ lang: string }> };

/** Language + texts for a server page. */
export async function pageI18n({ params }: Params): Promise<{ lang: Locale; t: Dict }> {
  const { lang: l } = await params;
  const lang: Locale = isLocale(l) ? l : "en";
  return { lang, t: getDictionary(lang) };
}

/** generateMetadata for a page: title/description from dictionary `pages.<key>`, plus hreflang links. */
export function pageMetadata(key: keyof Dict["pages"], path: string) {
  return async (p: Params): Promise<Metadata> => {
    const { lang, t } = await pageI18n(p);
    const m = t.pages[key];
    return { title: m.title, description: m.description, alternates: alternatesFor(lang, path) };
  };
}
