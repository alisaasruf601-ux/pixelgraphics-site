"use client";
/**
 * HOMEPAGE SERVICE SHOWCASE
 *
 * Six individual service cards live in a normal grid (their final, accessible layout).
 * On load they are lifted with transforms into a tilted stack inside the hero
 * (#service-stack-anchor). Scrolling interpolates each card from that stack back to its
 * own grid slot — moving down, scaling up and straightening — so the stack "deals" itself
 * into the services layout. Clicking a card opens the service detail panel.
 *
 * Only transform/opacity are animated (GPU-friendly). With prefers-reduced-motion the
 * cards simply stay in the grid and the hero shows the static illustration instead.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "./LocalLink";
import { useI18n } from "@/i18n/I18nProvider";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { type Department } from "@/config/services";
import { ServicePanel, ServiceImage } from "./ServicePanel";
import { SectionHeading } from "./ui";
import { site } from "@/config/site";
import { useLive, tf, inVisualEditor } from "./LiveContent";

export const STACK_ANCHOR_ID = "service-stack-anchor";

/** Stack layout inside the hero anchor: centre offset (fraction of anchor size) + tilt. Index 0 is on top. */
const fan = [
  { x: -0.04, y: -0.02, r: -4 },
  { x: 0.18, y: -0.18, r: 9 },
  { x: -0.17, y: -0.16, r: -10 },
  { x: 0.2, y: 0.15, r: 6 },
  { x: -0.14, y: 0.18, r: 8 },
  { x: 0.05, y: 0.04, r: -13 },
];

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

type Geo = { dx: number; dy: number; r: number; s: number }[];

export function ServiceShowcase() {
  const { home, services } = useLive();
  const { t } = useI18n();
  const showcase = services.showcase;
  const departments = services.departments as Department[];
  const items = showcase
    .map((s) => ({ ...s, src: s as object, dept: departments.find((d) => d.slug === s.slug) }))
    .filter((s): s is typeof s & { dept: Department } => Boolean(s.dept))
    .map((s, i) => ({ ...s, number: String(i + 1).padStart(2, "0") }));
  const others = departments.filter((d) => !showcase.some((s) => s.slug === d.slug));

  const rootRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLUListElement>(null);
  const slotRefs = useRef<(HTMLLIElement | null)[]>([]);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const geo = useRef<Geo>([]);
  const end = useRef(1);
  const active = useRef(false);
  const [open, setOpen] = useState<number | null>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);

  /* ---------- scroll-linked stack → grid ----------
   * Phase 1 (first PIN of the distance): the stack stays in view and travels down with the page.
   * Phase 2: each card moves on its own into its grid slot, straightening and scaling up.
   * Where supported, this runs as a CSS scroll-driven animation on the compositor (perfectly
   * smooth, independent of JavaScript); otherwise it is updated in the scroll event. */
  const STAGGER = 0.03;
  /** Pin window in scroll px: the stack scrolls normally until its centre reaches the middle of
   *  the screen, stays there while the page scrolls on, then the cards fan into the grid. */
  const pin = useRef({ start: 0, end: 0 });
  const transformAt = useCallback((g: Geo[number], i: number, p: number, n: number) => {
    const s = p * end.current;                                   // scroll position
    const span = Math.max(1, end.current - pin.current.end);
    const t = clamp((s - pin.current.end - i * STAGGER * span) / (span * (1 - (n - 1) * STAGGER)));
    const e = easeInOut(t);
    const follow = Math.max(0, s - pin.current.start);           // keeps the stack in view while pinned
    const x = g.dx * (1 - e);
    const y = (g.dy + follow) * (1 - e);
    const r = g.r * (1 - e);
    const sc = g.s + (1 - g.s) * e;
    return t >= 1 ? "none" : `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotate(${r.toFixed(2)}deg) scale(${sc.toFixed(4)})`;
  }, []);

  const timeline = useRef(false);
  const styleEl = useRef<HTMLStyleElement | null>(null);

  const update = useCallback(() => {
    if (!active.current || timeline.current) return;
    const cards = cardRefs.current;
    const p = clamp(window.scrollY / end.current);
    cards.forEach((el, i) => {
      const g = geo.current[i];
      if (!el || !g) return;
      const tf = transformAt(g, i, p, cards.length);
      el.style.transform = tf === "none" ? "" : tf;
    });
  }, [transformAt]);

  const measure = useCallback(() => {
    const anchor = document.getElementById(STACK_ANCHOR_ID);
    const reduce = site.respectReducedMotion && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cards = cardRefs.current;
    const clear = () => cards.forEach((el) => {
      if (!el) return;
      el.style.transform = ""; el.style.zIndex = ""; el.style.animation = "";
      el.style.removeProperty("animation-timeline"); el.style.removeProperty("animation-range");
    });
    if (!anchor || reduce || !gridRef.current || anchor.offsetWidth === 0) {
      active.current = false;
      clear();
      return;
    }
    clear(); // measure untransformed slots
    const sy = window.scrollY;
    const a = anchor.getBoundingClientRect();
    const ax = a.left + a.width / 2, ay = a.top + sy + a.height / 2;
    geo.current = slotRefs.current.map((slot, i) => {
      if (!slot) return { dx: 0, dy: 0, r: 0, s: 1 };
      const b = slot.getBoundingClientRect();
      const f = fan[i % fan.length];
      const target = a.width * (a.width < 520 ? 0.58 : 0.52);
      return {
        dx: ax + f.x * a.width - (b.left + b.width / 2),
        dy: ay + f.y * a.height - (b.top + sy + b.height / 2),
        r: f.r,
        s: target / b.width,
      };
    });
    const vh = window.innerHeight;
    const gridTop = gridRef.current.getBoundingClientRect().top + sy;
    end.current = Math.max(240, gridTop - vh * 0.2);
    const stackCenter = ay;                                        // document y of the stack centre
    const pinStart = Math.max(0, stackCenter - vh / 2);
    const pinEnd = Math.min(pinStart + vh * 0.3, end.current - Math.min(end.current * 0.5, 420));
    pin.current = { start: pinStart, end: Math.max(pinStart, pinEnd) };
    active.current = true;
    const n = cards.length;
    cards.forEach((el, i) => { if (el) el.style.zIndex = String(20 + n - i); });

    timeline.current = typeof CSS !== "undefined" && !!CSS.supports?.("animation-timeline", "scroll()");
    if (timeline.current) {
      // Bake each card's path into keyframes sampled along the scroll distance.
      const STEPS = 48;
      let css = "";
      cards.forEach((el, i) => {
        const g = geo.current[i];
        if (!el || !g) return;
        let kf = "";
        for (let k = 0; k <= STEPS; k++) {
          const p = k / STEPS;
          kf += `${((p * 100)).toFixed(3)}%{transform:${transformAt(g, i, p, n)}}`;
        }
        css += `@keyframes pg-card-${i}{${kf}}`;
      });
      if (!styleEl.current) { styleEl.current = document.createElement("style"); document.head.appendChild(styleEl.current); }
      styleEl.current.textContent = css;
      cards.forEach((el, i) => {
        if (!el) return;
        el.style.animation = `pg-card-${i} linear both`;
        el.style.setProperty("animation-timeline", "scroll(root block)");
        el.style.setProperty("animation-range", `0px ${Math.round(end.current)}px`);
      });
    } else {
      update();
    }
  }, [update, transformAt]);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => update(); // update in the scroll event itself so cards never lag a frame behind
    const onResize = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(measure); };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    mq.addEventListener?.("change", onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(document.body);
    document.fonts?.ready.then(onResize).catch(() => {});
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      mq.removeEventListener?.("change", onResize);
      ro.disconnect();
      styleEl.current?.remove(); styleEl.current = null;
    };
  }, [measure, update]);

  /* ---------- cursor-following "View service" label (mouse only) ---------- */
  const mx = useMotionValue(-200), my = useMotionValue(-200);
  const sx = useSpring(mx, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 500, damping: 40, mass: 0.4 });
  const [hover, setHover] = useState(false);
  const onPointerMove = (e: React.PointerEvent) => { if (e.pointerType === "mouse") { mx.set(e.clientX); my.set(e.clientY); } };
  const onPointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    mx.jump(e.clientX); my.jump(e.clientY); sx.jump(e.clientX); sy.jump(e.clientY);
    setHover(true);
  };

  const openPanel = (i: number, el: HTMLButtonElement) => { lastTrigger.current = el; setHover(false); setOpen(i); };
  const closePanel = () => { setOpen(null); requestAnimationFrame(() => lastTrigger.current?.focus({ preventScroll: true })); };

  return (
    <div ref={rootRef} className="service-showcase">
      <SectionHeading kicker={home.services.kicker} title={home.services.title} accent={home.services.accent}
        intro={home.services.intro}
        fields={{ kicker: tf(home.services, "kicker"), title: tf(home.services, "title"), accent: tf(home.services, "accent"), intro: tf(home.services, "intro") }} />

      <ul ref={gridRef} className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
        {items.map((it, i) => (
          <li key={it.slug} ref={(el) => { slotRefs.current[i] = el; }} className="flex min-w-0">
            <button
              ref={(el) => { cardRefs.current[i] = el; }}
              type="button"
              onClick={(e) => {
                // In the visual editor, clicking a linked title/photo/text edits it instead of opening the window.
                const inEditor = inVisualEditor();
                if (inEditor && (e.target as HTMLElement).closest("[data-tina-field]")) return;
                openPanel(i, e.currentTarget);
              }}
              onPointerEnter={onPointerEnter}
              onPointerMove={onPointerMove}
              onPointerLeave={() => setHover(false)}
              aria-haspopup="dialog"
              aria-label={`${it.title}: ${t.showcase.view}`}
              className="showcase-card group relative flex w-full origin-center text-left will-change-transform focus-visible:outline-offset-4 lg:cursor-none"
            >
              <span className="showcase-inner flex w-full">
                <span className="flex w-full flex-col overflow-hidden rounded-[22px] border border-white/10 bg-ink-800 shadow-[0_30px_60px_-25px_rgba(0,0,0,.75)] transition-[border-color,box-shadow] duration-500 group-hover:border-teal/50 group-hover:shadow-glow sm:rounded-[28px]"
                  >
                  <ServiceImage item={it} field={tf(it.src, "image")} />
                  <span className="flex flex-1 items-end justify-between gap-3 p-5 sm:p-6">
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold tracking-[0.18em] text-teal">{it.number}</span>
                      <span data-tina-field={tf(it.src, "title")} className="mt-1.5 block min-h-[2.1em] font-display text-xl uppercase leading-[1.05] text-cloud lg:text-[1.35rem]">{it.title}</span>
                      <span data-tina-field={tf(it.dept, "summary")} className="mt-2 line-clamp-3 min-h-[3lh] text-sm leading-relaxed text-ink-300">{it.dept.summary}</span>
                    </span>
                    <span aria-hidden="true" className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/15 text-lg text-cloud transition duration-300 group-hover:rotate-90 group-hover:border-teal group-hover:bg-teal group-hover:text-ink">+</span>
                  </span>
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {others.length > 0 && (
        <p className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-3 text-sm text-ink-300 sm:mt-12">
          <span>{t.showcase.also}</span>
          {others.map((d) => (
            <Link key={d.slug} href={`/services#${d.slug}`} className="chip">{d.shortTitle} <span aria-hidden="true">→</span></Link>
          ))}
          <Link href="/services" className="font-semibold text-teal underline underline-offset-4">{t.cards.all}</Link>
        </p>
      )}

      {/* Cursor label */}
      <motion.div aria-hidden="true" style={{ x: sx, y: sy }} className="pointer-events-none fixed left-0 top-0 z-40 hidden lg:block">
        <div className="-translate-x-1/2 -translate-y-1/2">
        <AnimatePresence>
          {hover && (
            <motion.span initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.4, opacity: 0 }}
              transition={{ type: "spring", stiffness: 420, damping: 28 }}
              className="flex items-center gap-2 whitespace-nowrap rounded-full bg-teal px-4 py-2.5 text-sm font-semibold text-ink shadow-[0_10px_30px_-8px_rgba(105,201,202,.7)]">
              <span className="text-base leading-none">+</span> {t.showcase.view}
            </motion.span>
          )}
        </AnimatePresence>
        </div>
      </motion.div>

      <ServicePanel item={open === null ? null : items[open]} onClose={closePanel} />
    </div>
  );
}
