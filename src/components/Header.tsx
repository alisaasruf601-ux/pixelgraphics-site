"use client";
import Link from "./LocalLink";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/i18n/I18nProvider";
import { locales, localeNames, localizeHref, splitLocale, type Locale } from "@/i18n/config";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./Logo";
import { Icon } from "./Icon";
import { nav, bookingHref, site, socialLinks } from "@/config/site";
import { Ribbon } from "./Ribbon";

export function Header() {
  const { t, lang, href: loc } = useI18n();
  const fullPath = usePathname();
  const pathname = splitLocale(fullPath).rest;
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
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-teal focus:px-4 focus:py-2 focus:text-ink">{t.header.skip}</a>
      <div className={`container-site flex items-center justify-between transition-all duration-300 ${scrolled ? "h-[72px]" : "h-[88px]"}`}>
        <Link href="/" aria-label={t.header.homeAria} className="shrink-0"><span data-site-logo className="flex"><Logo size={scrolled ? 34 : 40} /></span></Link>
        <nav aria-label={t.header.main} className="hidden lg:block">
          <ul className="flex items-center gap-8 xl:gap-10">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} aria-current={isActive(n.href) ? "page" : undefined}
                  className={`relative py-2 text-[15px] font-medium transition-colors hover:text-teal ${isActive(n.href) ? "text-cloud" : "text-ink-200"}`}>
                  {t.nav[n.key]}
                  {isActive(n.href) && <motion.span layoutId="nav-underline" className="absolute inset-x-0 -bottom-1 h-[3px] rounded-full bg-teal" />}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <LanguageSwitcher lang={lang} path={pathname} label={t.header.language} />
          <a href={ext ? bookingHref : loc(bookingHref)} {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="btn btn-primary hidden !py-3 sm:inline-flex">{t.header.book}<span className="btn-arrow" aria-hidden="true">→</span></a>
          <button ref={toggleRef} type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="mobile-menu"
            aria-label={open ? t.header.closeMenu : t.header.openMenu}
            className="grid h-12 w-12 place-items-center rounded-full bg-teal text-ink transition hover:bg-teal-300 lg:hidden">
            <Icon name={open ? "close" : "menu"} className="h-5 w-5" />
          </button>
        </div>
      </div>

    </header>
      <AnimatePresence>
        {open && (
          <motion.div id="mobile-menu" role="dialog" aria-modal="true" aria-label={t.header.menu}
            initial={{ clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" }}
            animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            exit={{ clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" }}
            transition={{ duration: 0.5, ease: [0.7, 0, 0.3, 1] }}
            className="fixed inset-0 z-40 overflow-y-auto bg-ink pt-[72px] lg:hidden">
            <nav aria-label={t.header.mobile} className="container-site relative z-10 pt-8">
              <ul>
                {nav.map((n, i) => (
                  <motion.li key={n.href} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.05 }}>
                    <Link href={n.href} aria-current={isActive(n.href) ? "page" : undefined}
                      className={`flex items-center justify-between border-b border-white/10 py-3 font-display text-[1.4rem] uppercase sm:py-4 sm:text-[2rem] ${isActive(n.href) ? "text-teal" : "text-cloud"}`}>
                      {t.nav[n.key]}{isActive(n.href) && <span aria-hidden="true" className="text-xl">→</span>}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <a href={ext ? bookingHref : loc(bookingHref)} {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="btn btn-primary mt-8 w-full justify-between">
                {t.header.book}<span className="btn-arrow" aria-hidden="true">→</span></a>
              <div className="mt-8 pb-40 text-sm text-ink-300">
                <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label={t.header.language}>
                  {locales.map((l) => (
                    <NextLink key={l} href={localizeHref(pathname, l)} hrefLang={l} lang={l} onClick={() => rememberLocale(l)} aria-current={l === lang ? "true" : undefined}
                      className={`chip !px-3.5 ${l === lang ? "chip-on" : ""}`}>{localeNames[l]}</NextLink>
                  ))}
                </div>
                <p className="kicker mb-3 !text-[11px]">{t.brand.positioning} {t.brand.positioningAccent}</p>
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

function rememberLocale(l: Locale) {
  try { document.cookie = `NEXT_LOCALE=${l}; path=/; max-age=31536000; samesite=lax`; } catch { /* ignore */ }
}

/** Desktop language menu: shows the current language code, opens a small list. */
function LanguageSwitcher({ lang, path, label }: { lang: Locale; path: string; label: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close); document.addEventListener("keydown", close);
    return () => { document.removeEventListener("mousedown", close); document.removeEventListener("keydown", close); };
  }, [open]);
  return (
    <div ref={ref} className="relative hidden lg:block">
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-haspopup="true" aria-label={`${label}: ${localeNames[lang]}`}
        className="flex h-11 items-center gap-1.5 rounded-full border border-white/15 px-3.5 text-sm font-semibold uppercase text-cloud transition hover:border-teal/60">
        <Icon name="globe" className="h-4 w-4" />{lang}
        <svg viewBox="0 0 12 12" className={`h-3 w-3 transition ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M2.5 4.5 6 8l3.5-3.5" /></svg>
      </button>
      {open && (
        <ul className="absolute right-0 top-full mt-2 min-w-[170px] overflow-hidden rounded-2xl border border-white/10 bg-ink-900 py-1.5 shadow-2xl">
          {locales.map((l) => (
            <li key={l}>
              <NextLink href={localizeHref(path, l)} hrefLang={l} lang={l} onClick={() => { rememberLocale(l); setOpen(false); }} aria-current={l === lang ? "true" : undefined}
                className={`flex items-center justify-between gap-4 px-4 py-2.5 text-sm transition hover:bg-white/5 ${l === lang ? "text-teal" : "text-ink-200"}`}>
                {localeNames[l]}<span className="text-xs uppercase opacity-60">{l}</span>
              </NextLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
