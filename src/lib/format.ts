import { currency } from "@/config/pricing";
const whole = new Intl.NumberFormat(currency.locale, { maximumFractionDigits: 0 });
const cents = new Intl.NumberFormat(currency.locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
/** US$200 for whole amounts, US$3.50 when there are cents. */
export const money = (n: number) => {
  const v = Math.round(n * 100) / 100;
  return `${currency.symbol}${Number.isInteger(v) ? whole.format(v) : cents.format(v)}`;
};
