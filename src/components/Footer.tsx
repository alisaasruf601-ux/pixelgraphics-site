import Link from "./LocalLink";
import type { Locale } from "@/i18n/config";
import { localizeHref } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { getContent } from "@/i18n/content";
import type { Department } from "@/config/services";
import { Logo } from "./Logo";
import { Newsletter } from "./Newsletter";
import { nav, site, socialLinks, whatsappLink, whatsappDisplay, bookingHref } from "@/config/site";
import { Icon } from "./Icon";
import { WhatsAppGlyph } from "./WhatsAppButton";
export function Footer({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);
  const departments = getContent(lang).services.departments as Department[];
  const footerServices = departments.map((d) => ({ label: d.shortTitle, href: `/services#${d.slug}` }));
  const legal = [
    { label: t.footer.privacy, href: "/privacy" },
    { label: t.footer.terms, href: "/terms" },
    { label: t.footer.agreement, href: "/service-agreement" },
  ];
  const wa = whatsappLink(t.whatsapp.message);
  return (
    <footer className="border-t border-white/5 bg-ink-950 pt-20 sm:pt-24">
      <div className="container-site">
        <div className="grid gap-12 border-b border-white/10 pb-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[1.3fr_0.8fr_1.1fr_0.9fr_1.75fr] [&>*]:min-w-0">
          <div>
            <Logo size={44} />
            <p className="mt-6 font-display text-xl uppercase text-cloud">{t.brand.positioning} <span className="text-teal">{t.brand.positioningAccent}</span></p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-300">{t.footer.about}</p>
          </div>
          <FooterCol title={t.footer.quickLinks} links={nav.map((n) => ({ label: t.nav[n.key], href: n.href }))} />
          <FooterCol title={t.footer.services} links={footerServices} />
          <FooterCol title={t.footer.legal} links={legal} />
          <div>
            <h2 className="mb-5 font-sans text-xs font-semibold normal-case tracking-[0.2em] text-teal">{t.footer.contact.toUpperCase()}</h2>
            <ul className="space-y-3 text-[15px] text-ink-200">
              <li className="flex items-center gap-2.5"><Icon name="globe" className="h-5 w-5 shrink-0" />{t.footer.global}</li>
              {site.contact.email && <li><a className="flex items-center gap-2.5 hover:text-teal" href={`mailto:${site.contact.email}`}><Icon name="mail" className="h-5 w-5 shrink-0" /><span className="whitespace-nowrap lg:text-sm xl:text-[clamp(0.8rem,1.05vw,1rem)]">{site.contact.email}</span></a></li>}
              {wa && <li><a className="flex items-center gap-2.5 hover:text-teal" href={wa} target="_blank" rel="noopener noreferrer"><WhatsAppGlyph className="h-5 w-5 shrink-0 text-[#25D366]" />{whatsappDisplay()}</a></li>}
              <li><a className="hover:text-teal" href={localizeHref(bookingHref, lang)}>{t.footer.bookOnline}</a></li>
              <li><Link className="hover:text-teal" href="/contact">{t.footer.contactForm}</Link></li>
            </ul>
            {socialLinks.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-2" aria-label={t.footer.social}>
                {socialLinks.map((s) => <li key={s.key}><a href={s.url} target="_blank" rel="noopener noreferrer" className="chip !py-2">{s.label}</a></li>)}
              </ul>
            )}
            <h2 className="mb-3 mt-8 font-sans text-xs font-semibold normal-case tracking-[0.2em] text-teal">{t.footer.newsletter.toUpperCase()}</h2>
            <Newsletter />
          </div>
        </div>
        <div className="flex flex-col gap-3 py-8 text-sm text-ink-400 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. {t.footer.rights}</p>
          <p>{t.brand.tagline}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="mb-5 font-sans text-xs font-semibold normal-case tracking-[0.2em] text-teal">{title.toUpperCase()}</h2>
      <ul className="space-y-3 text-[15px]">
        {links.map((l) => <li key={l.href}><Link href={l.href} className="text-ink-200 transition hover:text-teal">{l.label}</Link></li>)}
      </ul>
    </div>
  );
}
