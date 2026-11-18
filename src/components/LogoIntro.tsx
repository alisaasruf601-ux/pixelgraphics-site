"use client";
/**
 * LOGO INTRO — built on the official logo artwork (./logoArt.ts), one sharp vector SVG.
 *
 *  1. A teal pixel falls, lands on the baseline and bounces.
 *  2. The pixel grows into the lower stem of the P, then the rest of the P is revealed.
 *  3. The back X stroke slides in under the P, the front stroke slashes across, the fold
 *     shadow settles in and a light sheen crosses the symbol.
 *  4. The symbol moves left and the divider "|" draws itself in place.
 *  5. PIXEL / GRAPHICS slide out from behind the divider.
 *  6. The logo glides into the header while the intro screen slides up and the website rises with it.
 *
 * The logo's shapes, colours and proportions are never changed — parts are only revealed and moved.
 * Any click, tap, key or scroll skips it. Plays per the `logoIntro` setting in src/config/site.ts.
 */
import { useEffect, useId, useRef, useState } from "react";
import { motion, useAnimate } from "framer-motion";
import { useI18n } from "@/i18n/I18nProvider";
import { finishIntro, introWillPlay, revealHeaderLogo } from "@/lib/intro";
import {
  LOGO_COLORS as C, LOCKUP_BOX as LB, SYMBOL_BOX as SB, P_PATH, X_BACK_PATH, X_FRONT_PATH, X_SHADOW, DIVIDER, PIXEL_PATHS, GRAPHICS_PATHS,
} from "./logoArt";

const E = [0.7, 0, 0.3, 1] as const;     // brand in-out
const OUT = [0.2, 0.8, 0.2, 1] as const; // brand out

/* Geometry (artboard units, from the official artwork) */
const BASE = 451.27, CAP = LB.y, STEM_X = 77, STEM_W = 60.76, STEM_CX = STEM_X + STEM_W / 2;
/** Lower stem of the P (below the slot that runs through the P) — the pixel grows into exactly this block. */
const STEM_LOW_TOP = 350.88;
const PX_SIZE = 24;
const CLIP_X = DIVIDER.x + DIVIDER.width / 2 + 1;       // words slide out from behind the divider
const SYMBOL_CENTER = SB.x + SB.w / 2 - LB.x;            // symbol centre, from the lockup's left edge

/* Timeline (seconds) */
const T = { pixel: 0.2, pixelDur: 1.15, bowl: 1.3, xBack: 1.5, xFront: 1.7, shadow: 1.95, sheen: 2.1, shift: 2.35, divider: 2.75, words: 3.05, exit: 4.2 };

export function LogoIntro() {
  const { t } = useI18n();
  const [show, setShow] = useState(false);
  const [go, setGo] = useState(false);
  const [S, setS] = useState(96); // rendered lockup height in px
  const [scope, animate] = useAnimate();
  const flyRef = useRef<HTMLDivElement>(null);
  const leaving = useRef(false);
  const uid = useId().replace(/:/g, "");

  useEffect(() => {
    if (!introWillPlay()) { revealHeaderLogo(); return; }
    window.scrollTo(0, 0);
    const w = window.innerWidth;
    const video = (window as Window & { __pgIntroVideo?: { size?: number } }).__pgIntroVideo; // used only to render showcase videos
    setS(video?.size ?? (w < 480 ? Math.max(40, Math.round((w - 64) / 6.05)) : w < 1024 ? 72 : 92));
    setShow(true);
    const t = setTimeout(() => setGo(true), 120);
    return () => clearTimeout(t);
  }, []);

  const end = (played = false) => {
    revealHeaderLogo();
    setShow(false);
    if (played) window.dispatchEvent(new Event("pg-intro-done"));
  };

  const exit = async (fast = false) => {
    if (leaving.current) return;
    leaving.current = true;
    finishIntro();
    if (fast) {
      await animate(scope.current, { opacity: 0 }, { duration: 0.35 });
      return end();
    }
    // One continuous move: the logo glides into its place in the header while the intro
    // screen slides up like a curtain and the website rises with it. All three run as Web
    // Animations on transform only, so the browser's compositor plays them smoothly even while
    // the page below starts its own animations.
    const D = 1500, easing = "cubic-bezier(0.45, 0, 0.15, 1)";
    const target = document.querySelector<SVGElement>("[data-site-logo] svg");
    const el = flyRef.current;
    const bg = (scope.current as HTMLElement | null)?.querySelector("[data-intro-bg]") as HTMLElement | null;
    const runs: Promise<unknown>[] = [];
    if (target && el) {
      const a = el.getBoundingClientRect(), b = target.getBoundingClientRect();
      const k = b.height / a.height;
      runs.push(el.animate(
        [{ transform: "translate3d(0,0,0) scale(1)" }, { transform: `translate3d(${b.left - a.left}px, ${b.top - a.top}px, 0) scale(${k})` }],
        { duration: D, easing, fill: "forwards" },
      ).finished);
    }
    if (bg) runs.push(bg.animate([{ transform: "translate3d(0,0,0)" }, { transform: "translate3d(0,-100%,0)" }], { duration: D, easing, fill: "forwards" }).finished);
    document.getElementById("main")?.animate([{ transform: "translate3d(0,80px,0)" }, { transform: "translate3d(0,0,0)" }], { duration: D, easing });
    document.querySelector("header")?.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 500, delay: D * 0.5, easing: "ease-out", fill: "backwards" });
    await Promise.all(runs).catch(() => {});
    end(true);
  };

  useEffect(() => {
    if (!go) return;
    if ((window as Window & { __pgIntroVideo?: { hold?: boolean } }).__pgIntroVideo?.hold) return; // video render: hold the final logo
    const t = setTimeout(() => exit(false), T.exit * 1000);
    const skip = () => exit(true);
    window.addEventListener("keydown", skip);
    window.addEventListener("wheel", skip, { passive: true });
    window.addEventListener("touchmove", skip, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("wheel", skip);
      window.removeEventListener("touchmove", skip);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [go]);

  if (!show) return null;

  const k = S / LB.h;                       // px per artboard unit
  const W = LB.w * k;                       // lockup width in px
  const shift = W / 2 - SYMBOL_CENTER * k;  // px offset that centres the symbol on screen
  const id = (n: string) => `${n}${uid}`;
  const tPixel = (f: number) => T.pixel + f * T.pixelDur;

  return (
    <div ref={scope} className="fixed inset-0 z-[100] cursor-pointer" aria-hidden="true" onPointerDown={() => exit(true)}>
      <div data-intro-bg className="absolute inset-0 bg-ink will-change-transform">
        <div className="pattern-bg absolute inset-0 opacity-20" />
        <div className="absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2">
          <motion.div className="glow-teal h-full w-full" initial={{ opacity: 0, scale: 0.6 }} animate={go ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 1.8, ease: OUT }} />
        </div>
      </div>

      <div className="absolute inset-0 grid place-items-center">
        <motion.div ref={flyRef} className="origin-top-left will-change-transform" style={{ width: W, height: S }}>
          <motion.svg viewBox={`${LB.x} ${LB.y} ${LB.w} ${LB.h}`} width={W} height={S} style={{ overflow: "visible", display: "block" }}
            initial={{ x: shift }} animate={go ? { x: [shift, shift, 0] } : { x: shift }}
            transition={go ? { duration: T.shift + 0.75, times: [0, T.shift / (T.shift + 0.75), 1], ease: E } : { duration: 0 }}>
            <defs>
              <mask id={id("bowl")} maskUnits="userSpaceOnUse" x={SB.x - 20} y={SB.y - 20} width={SB.w + 40} height={SB.h + 40}>
                <motion.circle cx={137.76} cy={331} fill="#fff" initial={{ r: 0 }} animate={go ? { r: 150 } : {}} transition={{ duration: 0.45, delay: T.bowl, ease: E }} />
              </mask>
              <mask id={id("xb")} maskUnits="userSpaceOnUse" x={SB.x - 40} y={SB.y - 40} width={SB.w + 80} height={SB.h + 80}>
                <motion.line x1={345} y1={238} x2={150} y2={482} stroke="#fff" strokeWidth={130} initial={{ pathLength: 0 }} animate={go ? { pathLength: 1 } : {}} transition={{ duration: 0.36, delay: T.xBack, ease: OUT }} />
              </mask>
              <mask id={id("xf")} maskUnits="userSpaceOnUse" x={SB.x - 40} y={SB.y - 40} width={SB.w + 80} height={SB.h + 80}>
                <motion.line x1={215} y1={278} x2={345} y2={482} stroke="#fff" strokeWidth={120} initial={{ pathLength: 0 }} animate={go ? { pathLength: 1 } : {}} transition={{ duration: 0.32, delay: T.xFront, ease: OUT }} />
              </mask>
              <mask id={id("sym")} maskUnits="userSpaceOnUse" x={SB.x} y={SB.y} width={SB.w} height={SB.h}>
                <path d={X_BACK_PATH} fill="#fff" /><path d={X_FRONT_PATH} fill="#fff" /><path d={P_PATH} fill="#fff" />
              </mask>
              <clipPath id={id("words")}><rect x={CLIP_X} y={LB.y - 20} width={LB.x + LB.w - CLIP_X + 40} height={LB.h + 40} /></clipPath>
              <linearGradient id={id("sheen")} x1="0" x2="1">
                <stop offset="0" stopColor="#fff" stopOpacity="0" /><stop offset=".5" stopColor="#fff" stopOpacity=".5" /><stop offset="1" stopColor="#fff" stopOpacity="0" />
              </linearGradient>
            </defs>


            {/* 3. X strokes + fold shadow */}
            <path d={X_BACK_PATH} fill={C.white} mask={`url(#${id("xb")})`} />
            <motion.image x={X_SHADOW.x} y={X_SHADOW.y} width={X_SHADOW.w} height={X_SHADOW.h} href={X_SHADOW.href} style={{ mixBlendMode: "multiply" }}
              initial={{ opacity: 0 }} animate={go ? { opacity: X_SHADOW.opacity } : {}} transition={{ duration: 0.35, delay: T.shadow }} />
            <path d={X_FRONT_PATH} fill={C.white} mask={`url(#${id("xf")})`} />

            {/* 1–2. The pixel: falls, bounces, then becomes the P stem */}
            <motion.rect fill={C.teal}
              initial={{ x: STEM_CX - PX_SIZE / 2, y: CAP - 300, width: PX_SIZE, height: PX_SIZE, rx: 3, opacity: 0 }}
              animate={go ? {
                opacity: 1,
                x: [STEM_CX - PX_SIZE / 2, STEM_CX - PX_SIZE / 2, STEM_CX - PX_SIZE / 2, STEM_CX - PX_SIZE / 2, STEM_X],
                y: [CAP - 300, BASE - PX_SIZE, BASE - PX_SIZE - 34, BASE - PX_SIZE, STEM_LOW_TOP],
                width: [PX_SIZE, PX_SIZE, PX_SIZE, PX_SIZE, STEM_W],
                height: [PX_SIZE, PX_SIZE, PX_SIZE, PX_SIZE, BASE - STEM_LOW_TOP],
                rx: [3, 3, 3, 3, 0],
              } : {}}
              transition={{ duration: T.pixelDur, delay: T.pixel, times: [0, 0.38, 0.5, 0.62, 1], ease: ["easeIn", "easeOut", "easeIn", E], opacity: { duration: 0.1, delay: T.pixel } }} />
            <path d={P_PATH} fill={C.teal} mask={`url(#${id("bowl")})`} />

            {/* 3. Sheen across the finished symbol */}
            <g mask={`url(#${id("sym")})`}>
              <motion.rect y={LB.y - 10} width={90} height={LB.h + 20} fill={`url(#${id("sheen")})`}
                initial={{ x: SB.x - 120 }} animate={go ? { x: SB.x + SB.w + 40 } : {}} transition={{ duration: 0.7, delay: T.sheen, ease: "easeInOut" }} />
            </g>

            {/* 4. Divider draws itself in place (from the centre out) */}
            <motion.rect x={DIVIDER.x - DIVIDER.width / 2} y={DIVIDER.y1} width={DIVIDER.width} height={DIVIDER.y2 - DIVIDER.y1} fill={C.white}
              initial={{ scaleY: 0 }} animate={go ? { scaleY: 1 } : {}} transition={{ delay: T.divider, duration: 0.45, ease: E }} />

            {/* 5. Wordmark slides out from behind the divider */}
            <g clipPath={`url(#${id("words")})`}>
              <motion.g initial={{ x: -(LB.x + LB.w - CLIP_X) * 0.62 - 20 }} animate={go ? { x: 0 } : {}} transition={{ duration: 0.65, delay: T.words, ease: OUT }}>
                {PIXEL_PATHS.map((d, i) => <path key={i} d={d} fill={C.white} />)}
              </motion.g>
              <motion.g initial={{ x: -(LB.x + LB.w - CLIP_X) - 20 }} animate={go ? { x: 0 } : {}} transition={{ duration: 0.7, delay: T.words + 0.1, ease: OUT }}>
                {GRAPHICS_PATHS.map((d, i) => <path key={i} d={d} fill={C.teal} />)}
              </motion.g>
            </g>
          </motion.svg>
        </motion.div>
      </div>

      <button type="button" tabIndex={-1} onClick={() => exit(true)}
        className="absolute bottom-[max(24px,env(safe-area-inset-bottom))] right-6 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold tracking-[0.15em] text-ink-300 transition hover:border-teal hover:text-teal">
        {t.intro.skip}
      </button>
    </div>
  );
}
