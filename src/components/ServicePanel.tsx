"use client";
/**
 * Service detail view. The clicked card's image flies straight into place (shared
 * layout animation, `layoutId`), while the panel fades in around it — no sliding in
 * from the side. Closing sends the image back to its card.
 * Desktop: centred two-column view. Mobile: full-screen view.
 */
import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Department } from "@/config/services";
import { DeptVisual } from "./DeptVisual";
import { Button } from "./ui";
import { site } from "@/config/site";
import { useLive, tf } from "./LiveContent";

export type ShowcaseItem = { slug: string; title: string; number: string; image?: string | null; dept: Department; src?: object };

export const imageLayoutId = (slug: string) => `service-image-${slug}`;

/** The service image — the same element is used on the card and in the panel so it can fly between them. */
export function ServiceImage({ item, large = false, field }: { item: ShowcaseItem; large?: boolean; field?: string }) {
  return (
    <motion.span layoutId={imageLayoutId(item.slug)} data-tina-field={field} className="relative block aspect-[16/11] w-full overflow-hidden"
      transition={{ type: "spring", stiffness: 210, damping: 30 }}>
      {item.image
        // eslint-disable-next-line @next/next/no-img-element
        ? <img src={item.image} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
        : <DeptVisual icon={item.dept.icon} large={large} className="h-full w-full" />}
    </motion.span>
  );
}

export function ServicePanel({ item, onClose }: { item: ShowcaseItem | null; onClose: () => void }) {
  const { home } = useLive();
  const deviceReduce = useReducedMotion();
  const reduce = site.respectReducedMotion && deviceReduce;
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Esc to close, focus trap, scroll lock while open.
  useEffect(() => {
    if (!item) return;
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    const t = setTimeout(() => closeRef.current?.focus({ preventScroll: true }), 30);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); onClose(); return; }
      if (e.key !== "Tab" || !panelRef.current) return;
      const f = panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => { clearTimeout(t); document.removeEventListener("keydown", onKey); html.style.overflow = prevOverflow; };
  }, [item, onClose]);

  const fade = (delay = 0) => ({
    initial: { opacity: 0, y: reduce ? 0 : 16 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.45, delay: reduce ? 0 : delay, ease: [0.2, 0.8, 0.2, 1] } },
    exit: { opacity: 0, transition: { duration: 0.15 } },
  });

  return (
    <AnimatePresence>
      {item && (
        <div key="service-panel" className="fixed inset-0 z-[60] flex items-stretch justify-center md:items-center md:p-6">
          <motion.div className="absolute inset-0 bg-ink/80 backdrop-blur-md" onClick={onClose} aria-hidden="true"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} />

          <div ref={panelRef} role="dialog" aria-modal="true" aria-labelledby="service-panel-title"
            className="relative flex max-h-full w-full flex-col md:max-h-[88vh] md:max-w-[1080px]">
            {/* Panel surface fades in around the flying image */}
            <motion.div className="absolute inset-0 bg-ink-900 md:rounded-[28px] md:border md:border-white/10 md:shadow-2xl" aria-hidden="true"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.2, delay: 0.1 } }} transition={{ duration: 0.3 }} />

            <div className="relative grid min-h-0 flex-1 overflow-y-auto overscroll-contain md:grid-cols-[1fr_1.05fr] md:overflow-hidden">
              {/* Image column */}
              <div className="relative md:p-6 md:pr-0">
                <div className="overflow-hidden md:sticky md:top-0 md:rounded-[22px]">
                  <ServiceImage item={item} large />
                </div>
                <motion.button {...fade(0.15)} ref={closeRef} type="button" onClick={onClose} aria-label="Close service details"
                  className="absolute right-4 top-[max(16px,env(safe-area-inset-top))] grid h-11 w-11 place-items-center rounded-full bg-ink/80 text-cloud ring-1 ring-white/15 backdrop-blur transition hover:bg-teal hover:text-ink md:left-10 md:right-auto md:top-10">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
                </motion.button>
              </div>

              {/* Text column */}
              <div className="min-h-0 px-5 pb-10 pt-7 sm:px-10 md:overflow-y-auto md:py-10">
                <motion.p {...fade(0.12)} className="text-xs font-semibold tracking-[0.2em] text-teal">SERVICE {item.number}</motion.p>
                <motion.h2 {...fade(0.16)} id="service-panel-title" data-tina-field={tf(item.src, "title")} className="mt-3 text-balance text-[2rem] text-cloud sm:text-[2.6rem]">{item.title}</motion.h2>
                <motion.p {...fade(0.2)} data-tina-field={tf(item.dept, "intro")} className="mt-5 text-[15px] leading-relaxed text-ink-200 sm:text-base">{item.dept.intro}</motion.p>

                <motion.div {...fade(0.26)}>
                  <h3 className="mt-9 text-sm tracking-[0.12em] text-cloud">Services included</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {item.dept.services.map((s, i) => (
                      <li key={i} data-tina-field={tf(item.dept, "services", i)} className="rounded-full border border-white/10 bg-ink-800 px-3.5 py-1.5 text-[13px] text-ink-200">{s}</li>
                    ))}
                  </ul>
                </motion.div>

                {item.dept.deliverables?.length > 0 && (
                <motion.div {...fade(0.32)}>
                  <h3 className="mt-9 text-sm tracking-[0.12em] text-cloud">What you receive</h3>
                  <ul className="mt-4 space-y-3">
                    {item.dept.deliverables.map((d, i) => (
                      <li key={i} data-tina-field={tf(item.dept, "deliverables", i)} className="flex gap-3 text-[15px] leading-snug text-ink-200">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-teal text-[11px] font-bold text-ink" aria-hidden="true">✓</span>{d}
                      </li>
                    ))}
                  </ul>
                  
                </motion.div>
                )}

                <motion.div {...fade(0.38)} className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <Button href={`/contact?service=${encodeURIComponent(item.dept.shortTitle)}`} arrow field={tf(home.services, "cardButton")}>{home.services.cardButton}</Button>
                  <Button href={`/services#${item.slug}`} variant="outline">Full service details</Button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
