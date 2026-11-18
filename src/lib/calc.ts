import { hourly } from "@/config/pricing";

/** Hourly graphic design estimate. Used in the browser and re-calculated on the server. */
export function priceHours(hoursInput: number, rush: boolean) {
  const hours = Math.min(hourly.maxHours, Math.max(hourly.minHours, Math.round(hoursInput || hourly.minHours)));
  const subtotal = round2(hours * hourly.rate);
  const rushCost = rush ? round2(subtotal * hourly.rushSurcharge) : 0;
  return { hours, rate: hourly.rate, subtotal, rushCost, total: round2(subtotal + rushCost) };
}

const round2 = (n: number) => Math.round(n * 100) / 100;
