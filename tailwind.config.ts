import type { Config } from "tailwindcss";
// Brand tokens from the Pixel Graphics Mini Brand Guide v1.0 — see DESIGN.md
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#222026", 950: "#17161a", 900: "#1c1b20", 800: "#2a2830", 700: "#35333b", 600: "#4a4850", 400: "#9d9ca3", 300: "#a5a5ab", 200: "#cfd0d3" },
        cloud: "#F7F8F8",
        teal: { DEFAULT: "rgb(var(--teal-rgb, 105 201 202) / <alpha-value>)", 300: "#8dd6d7", 200: "#b0e3e3", 100: "#d2efef" },
        deep: { DEFAULT: "#299A94", 700: "#1c6e69", 800: "#175a56" },
      },
      fontFamily: {
        display: ["var(--font-display)", '"Archivo Black"', "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "Poppins", "system-ui", "sans-serif"],
      },
      borderRadius: { card: "22px", panel: "30px" },
      boxShadow: { lift: "0 40px 80px -20px rgba(0,0,0,.55)", glow: "0 0 0 1px rgba(105,201,202,.25), 0 20px 60px -10px rgba(41,154,148,.35)" },
      maxWidth: { site: "1280px" },
    },
  },
  plugins: [],
} satisfies Config;
