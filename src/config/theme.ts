/** Theme choices (fonts, sizes, accent colour) offered in the editor, and how they map to CSS. */
export const ACCENT_COLORS: Record<string, string> = {
  "Aqua Teal": "105 201 202",   // #69C9CA (brand primary)
  "Deep Teal": "41 154 148",    // #299A94 (brand)
  "Cloud White": "247 248 248", // #F7F8F8 (brand)
};
export const HEADING_SIZES: Record<string, number> = { Smaller: 0.88, Default: 1, Larger: 1.12 };
/** Bold weight used for headings with each heading font. */
export const HEADING_WEIGHTS: Record<string, number> = {
  "Archivo Black": 400, "Anton": 400, "Bebas Neue": 400, "Montserrat": 800, "Syne": 800, "Space Grotesk": 700, "Poppins": 700,
};
export const TEXT_SIZES: Record<string, string> = { Smaller: "93.75%", Default: "100%", Larger: "106.25%" };

export type ThemeData = { headingFont: string; bodyFont: string; accentColor?: string; headingSize?: string; textSize?: string };

export function themeVars(t: ThemeData): Record<string, string> {
  return {
    "--font-display": `"${t.headingFont}"`,
    "--font-body": `"${t.bodyFont}"`,
    "--display-weight": String(HEADING_WEIGHTS[t.headingFont] ?? 700),
    "--teal-rgb": ACCENT_COLORS[t.accentColor ?? ""] ?? ACCENT_COLORS["Aqua Teal"],
    "--heading-scale": String(HEADING_SIZES[t.headingSize ?? ""] ?? 1),
    "font-size": TEXT_SIZES[t.textSize ?? ""] ?? "100%",
  };
}
