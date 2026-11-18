/**
 * Pixel Graphics logo — drawn from the official artwork in ./logoArt.ts (never redrawn).
 * Approved versions only: horizontal lockup, PX symbol, PX on teal tile (see brand guide).
 */
import {
  LOGO_COLORS as C, LOCKUP_BOX as LB, SYMBOL_BOX as SB, P_PATH, X_BACK_PATH, X_FRONT_PATH, X_SHADOW, DIVIDER, PIXEL_PATHS, GRAPHICS_PATHS,
} from "./logoArt";

type Tone = "dark" | "light" | "teal";

/** Colours per approved background. dark = on charcoal, light = on white, teal = on teal tile. */
function palette(tone: Tone) {
  if (tone === "light") return { p: C.teal, x: C.charcoal, pixel: C.charcoal, graphics: C.teal, divider: C.charcoal };
  if (tone === "teal") return { p: C.white, x: C.charcoal, pixel: C.charcoal, graphics: C.white, divider: C.charcoal };
  return { p: C.teal, x: C.white, pixel: C.white, graphics: C.teal, divider: C.white };
}

/** The PX symbol as SVG children in artboard units (use inside an <svg> or <g>). */
export function PXGlyph({ tone = "dark" }: { tone?: Tone }) {
  const c = palette(tone);
  return (
    <>
      <path d={X_BACK_PATH} fill={c.x} />
      <image x={X_SHADOW.x} y={X_SHADOW.y} width={X_SHADOW.w} height={X_SHADOW.h} opacity={X_SHADOW.opacity} href={X_SHADOW.href} style={{ mixBlendMode: "multiply" }} />
      <path d={X_FRONT_PATH} fill={c.x} />
      <path d={P_PATH} fill={c.p} />
    </>
  );
}

/** PX symbol placed in a 162 × 100 box (legacy illustration coordinates). */
export function PXGlyphBox({ tone = "dark" }: { tone?: Tone }) {
  const k = 100 / SB.h;
  return <g transform={`translate(${(162 - SB.w * k) / 2} 0) scale(${k}) translate(${-SB.x} ${-SB.y})`}><PXGlyph tone={tone} /></g>;
}

export function LogoMark({ className = "", tone = "dark" }: { className?: string; tone?: Tone }) {
  return (
    <svg viewBox={`${SB.x} ${SB.y} ${SB.w} ${SB.h}`} className={className} aria-hidden="true" focusable="false">
      <PXGlyph tone={tone} />
    </svg>
  );
}

/** Horizontal lockup: PX | PIXEL / GRAPHICS. `size` = height in px. */
export function Logo({ size = 40, tone = "dark" }: { size?: number; tone?: Tone }) {
  const c = palette(tone);
  return (
    <span className="inline-flex" style={{ height: size }}>
      <svg viewBox={`${LB.x} ${LB.y} ${LB.w} ${LB.h}`} style={{ height: size, width: (size * LB.w) / LB.h }} aria-hidden="true" focusable="false">
        <PXGlyph tone={tone} />
        <line x1={DIVIDER.x} y1={DIVIDER.y1} x2={DIVIDER.x} y2={DIVIDER.y2} stroke={c.divider} strokeWidth={DIVIDER.width} />
        {PIXEL_PATHS.map((d, i) => <path key={i} d={d} fill={c.pixel} />)}
        {GRAPHICS_PATHS.map((d, i) => <path key={i} d={d} fill={c.graphics} />)}
      </svg>
      <span className="sr-only">Pixel Graphics</span>
    </span>
  );
}
