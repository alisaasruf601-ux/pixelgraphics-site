# Pixel Graphics — design system

Source: *Pixel Graphics Mini Brand Guide v1.0 (2026)*. Tokens live in `tailwind.config.ts` and `src/app/globals.css`.

## Colour
| Token | Hex | Use |
|---|---|---|
| `ink` (Charcoal Black) | #222026 | Main background, text on teal |
| `cloud` (Cloud White) | #F7F8F8 | Main text on dark |
| `teal` (Aqua Teal) | #69C9CA | Accents, primary buttons, highlight words |
| `deep` (Deep Teal) | #299A94 | Secondary accents, decorative numbers |
| `deep-700` / `deep-800` | #1c6e69 / #175a56 | Accessibility shades of Deep Teal: panels with small white text, second headline tone on Aqua Teal |
| `ink-950…200` | — | Tinted neutral ramp for surfaces, borders and muted text |

Accessibility rules (WCAG AA, verified with axe on every page):
- Text on Aqua Teal is Charcoal. The brand’s white-on-teal headline tone fails contrast (1.8:1), so the second tone on teal is `deep-800` (4.1:1).
- Small white text never sits on pure Deep Teal (3.2:1); use `deep-700` (5.7:1).
- Muted text is `ink-300`/`ink-400` (≥ 5:1 on dark surfaces).

## Type
- Headings: **Archivo Black**, uppercase, tight leading (0.95–1), two-tone (base + teal accent), often ending with a period.
- Body/UI: **Poppins** 300–700. Body ≥ 16px.
- Kicker: Poppins 600, 13px, 0.2em tracking, teal, with a 56px teal line before it.

## Shape & surfaces
Rounded cards (22px) and panels (30px), subtle 1px white/7% borders, soft long shadows, teal glow on emphasis.

## Pattern
Diagonal ribbon zigzag from the PX “X” (`Ribbon.tsx`, charcoal→teal gradient) and a subtle dark diagonal tile (`public/brand/pattern-dark.svg`) for hero backgrounds.

## Icons
Line icons, rounded joins, stroke 3.4 on a 64 grid, with a solid Aqua Teal accent shape (`Icon.tsx`).

## Motion
- Section reveal: fade + 40px slide, 700ms, `cubic-bezier(.2,.8,.2,1)`, once.
- Hero: headline lines slide up from a mask (120ms stagger); artwork diagonal wipe, then gentle parallax.
- Cards: lift on hover; buttons: arrow nudges 4px.
- Mobile menu & calculator steps: diagonal wipe / slide.
- All motion respects `prefers-reduced-motion`.
