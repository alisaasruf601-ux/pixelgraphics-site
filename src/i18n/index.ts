import type { Locale } from "./config";
import en, { type Dict } from "./dictionaries/en";
import nl from "./dictionaries/nl";
import pt from "./dictionaries/pt";
import es from "./dictionaries/es";
import de from "./dictionaries/de";

const dicts: Record<Locale, Dict> = { en, nl, pt, es, de };
export const getDictionary = (lang: Locale): Dict => dicts[lang] ?? en;
export * from "./config";
