"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./Logo";
import { Icon } from "./Icon";
import { nav, bookingHref, site, socialLinks } from "@/config/site";
import { Ribbon } from "./Ribbon";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const ext = bookingHref.startsWith("http");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" && open) { setOpen(false); toggleRef.current?.focus(); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || open ? "border-b border-white/5 bg-ink/85 backdrop-blur-xl" : "bg-transparent"}`}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-teal focus:px-4 focus:py-2 focus:text-ink">Skip to content</a>
      <div className={`container-site flex items-center justify-between transition-all duration-300 ${scrolled ? "h-[72px]" : "h-[88px]"}`}>
        <Link href="/" aria-label="Pixel Graphics — home" className="shrink-0"><span data-site-logo className="flex"><Logo size={scrolled ? 34 : 40} /></span></Link>
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8 xl:gap-10">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} aria-current={isActive(n.href) ? "page" : undefined}
                  className={`relative py-2 text-[15px] font-medium transition-colors hover:text-teal ${isActive(n.href) ? "text-cloud" : "text-ink-200"}`}>
                  {n.label}
                  {isActive(n.href) && <motion.span layoutId="nav-underline" className="absolute inset-x-0 -bottom-1 h-[3px] rounded-full bg-teal" />}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <a href={bookingHref} {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="btn btn-primary hidden !py-3 sm:inline-flex">Book a Meeting<span className="btn-arrow" aria-hidden="true">→</span></a>
          <button ref={toggleRef} type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-12 w-12 place-items-center rounded-full bg-teal text-ink transition hover:bg-teal-300 lg:hidden">
            <Icon name={open ? "close" : "menu"} className="h-5 w-5" />
          </button>
        </div>
      </div>

    </header>
      <AnimatePresence>
        {open && (
          <motion.div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu"
            initial={{ clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" }}
            animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            exit={{ clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" }}
            transition={{ duration: 0.5, ease: [0.7, 0, 0.3, 1] }}
            className="fixed inset-0 z-40 overflow-y-auto bg-ink pt-[72px] lg:hidden">
            <nav aria-label="Mobile" className="container-site relative z-10 pt-8">
              <ul>
                {nav.map((n, i) => (
                  <motion.li key={n.href} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.05 }}>
                    <Link href={n.href} aria-current={isActive(n.href) ? "page" : undefined}
                      className={`flex items-center justify-between border-b border-white/10 py-4 font-display text-[2rem] uppercase ${isActive(n.href) ? "text-teal" : "text-cloud"}`}>
                      {n.label}{isActive(n.href) && <span aria-hidden="true" className="text-xl">→</span>}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <a href={bookingHref} {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="btn btn-primary mt-8 w-full justify-between">
                Book a Meeting<span className="btn-arrow" aria-hidden="true">→</span></a>
              <div className="mt-8 pb-40 text-sm text-ink-300">
                <p className="kicker mb-3 !text-[11px]">Creative Without Borders</p>
                {site.contact.email && <a className="block text-base text-cloud" href={`mailto:${site.contact.email}`}>{site.contact.email}</a>}
                {socialLinks.length > 0 && <div className="mt-4 flex flex-wrap gap-2">{socialLinks.map((s) => <a key={s.key} href={s.url} target="_blank" rel="noopener noreferrer" className="chip">{s.label}</a>)}</div>}
              </div>
            </nav>
            <Ribbon width={420} height={210} cols={3} rows={1} className="pointer-events-none fixed -right-10 bottom-0 z-0 w-[380px] opacity-40" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
