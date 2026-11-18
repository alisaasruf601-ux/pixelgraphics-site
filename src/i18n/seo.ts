import { locales, localizeHref, type Locale } from "./config";

/** canonical + hreflang links for a page path like "/about". */
export function alternatesFor(lang: Locale, path: string) {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l === "pt" ? "pt-BR" : l] = localizeHref(path, l);
  languages["x-default"] = path;
  return { canonical: localizeHref(path, lang), languages };
}
