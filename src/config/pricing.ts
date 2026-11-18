/**
 * PRICING CONFIGURATION — the ONLY place prices and package details live.
 *
 * - Monthly packages (Starter / Growth / Premium)
 * - The hourly rate for graphic design (used by the calculator)
 * Everything else is quoted personally through the project brief.
 * Change a number here and it updates everywhere on the site.
 */

import data from "../../content/pricing.json";

export const currency = { code: "USD", symbol: "US$", locale: "en-US" } as const;

/* ------------------------------------------------------------------ */
/* Monthly packages                                                    */
/* ------------------------------------------------------------------ */

export interface Package {
  id: string;
  name: string;
  priceFrom: number;
  period: "month";
  recommended?: boolean;
  bestFor: string;
  included: string[];
  deliverables: string[];
  revisions: string;
  duration: string;
  extras: string[];
  limitations: string[];
}

export const packages: Package[] = data.packages as Package[];

export const packageTerms: string[] = data.packageTerms;

/* ------------------------------------------------------------------ */
/* Hourly calculator (graphic design only)                             */
/* ------------------------------------------------------------------ */

/**
 * The calculator on /calculator. Only graphic design is priced by the hour;
 * every other service is quoted personally via the project brief (/brief).
 */
/** Normalises the hourly settings from a pricing.json (any language). */
export const toHourly = (h: typeof data.hourly) => ({
  ...h,
  rate: Number(h.rate),
  minHours: Number(h.minHours),
  maxHours: Number(h.maxHours),
  rushSurcharge: Number(h.rushSurcharge),
  quickPicks: (h.quickPicks as (number | string)[]).map(Number).filter((n) => n > 0),
});

export const hourly = {
  ...data.hourly,
  rate: Number(data.hourly.rate),
  minHours: Number(data.hourly.minHours),
  maxHours: Number(data.hourly.maxHours),
  rushSurcharge: Number(data.hourly.rushSurcharge),
  quickPicks: (data.hourly.quickPicks as (number | string)[]).map(Number).filter((n) => n > 0),
};
