/**
 * Font choices offered in the editor. Archivo Black + Poppins are the brand fonts (self-hosted);
 * any other choice is loaded from Google Fonts.
 */
export const HEADING_FONTS = ["Archivo Black", "Montserrat", "Anton", "Bebas Neue", "Space Grotesk", "Syne", "Poppins"] as const;
export const BODY_FONTS = ["Poppins", "Inter", "DM Sans", "Manrope", "Montserrat", "Nunito Sans"] as const;
const BUILT_IN = ["Archivo Black", "Poppins"];
/** Google Fonts weights to load per family. */
const WEIGHTS: Record<string, string> = {
  "Montserrat": "wght@400;500;600;700;800;900", "Anton": "", "Bebas Neue": "", "Space Grotesk": "wght@400;500;600;700",
  "Syne": "wght@600;700;800", "Inter": "wght@300;400;500;600;700", "DM Sans": "wght@300;400;500;600;700",
  "Manrope": "wght@300;400;500;600;700", "Nunito Sans": "wght@300;400;600;700",
};
export function googleFontsHref(families: string[]) {
  const need = [...new Set(families.filter((f) => f && !BUILT_IN.includes(f)))];
  if (!need.length) return "";
  const q = need.map((f) => `family=${f.replace(/ /g, "+")}${WEIGHTS[f] ? ":" + WEIGHTS[f] : ""}`).join("&");
  return `https://fonts.googleapis.com/css2?${q}&display=swap`;
}
