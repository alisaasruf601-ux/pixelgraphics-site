import Link from "next/link";
import { Logo } from "./Logo";
import { Newsletter } from "./Newsletter";
import { nav, site, socialLinks, whatsappLink, whatsappDisplay, bookingHref } from "@/config/site";
import { Icon } from "./Icon";
import { WhatsAppGlyph } from "./WhatsAppButton";
import { departments } from "@/config/services";

const footerServices = departments.map((d) => ({ label: d.shortTitle, href: `/services#${d.slug}` }));
const legal = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Service Agreement", href: "/service-agreement" },
];

export function Footer() {
  const wa = whatsappLink();
  return (
    <footer className="border-t border-white/5 bg-ink-950 pt-20 sm:pt-24">
      <div className="container-site">
        <div className="grid gap-12 border-b border-white/10 pb-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.4fr] [&>*]:min-w-0">
          <div>
            <Logo size={44} />
            <p className="mt-6 font-display text-xl uppercase text-cloud">Creative Without <span className="text-teal">Borders.</span></p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-300">A fully remote creative studio based in Suriname, working with brands around the world.</p>
          </div>
          <FooterCol title="Quick links" links={nav.map((n) => ({ label: n.label, href: n.href }))} />
          <FooterCol title="Services" links={footerServices} />
          <FooterCol title="Legal" links={legal} />
          <div>
            <h2 className="mb-5 font-sans text-xs font-semibold normal-case tracking-[0.2em] text-teal">CONTACT</h2>
            <ul className="space-y-3 text-[15px] text-ink-200">
              <li className="flex items-center gap-2.5"><Icon name="globe" className="h-5 w-5 shrink-0" />Global · remote-first studio</li>
              {site.contact.email && <li><a className="flex items-center gap-2.5 hover:text-teal" href={`mailto:${site.contact.email}`}><Icon name="mail" className="h-5 w-5 shrink-0" /><span className="min-w-0">{site.contact.email.split("@")[0]}@<wbr />{site.contact.email.split("@")[1]}</span></a></li>}
              {wa && <li><a className="flex items-center gap-2.5 hover:text-teal" href={wa} target="_blank" rel="noopener noreferrer"><WhatsAppGlyph className="h-5 w-5 shrink-0 text-[#25D366]" />{whatsappDisplay()}</a></li>}
              <li><a className="hover:text-teal" href={bookingHref}>Book an online meeting</a></li>
              <li><Link className="hover:text-teal" href="/contact">Contact form</Link></li>
            </ul>
            {socialLinks.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Social media">
                {socialLinks.map((s) => <li key={s.key}><a href={s.url} target="_blank" rel="noopener noreferrer" className="chip !py-2">{s.label}</a></li>)}
              </ul>
            )}
            <h2 className="mb-3 mt-8 font-sans text-xs font-semibold normal-case tracking-[0.2em] text-teal">NEWSLETTER</h2>
            <Newsletter />
          </div>
        </div>
        <div className="flex flex-col gap-3 py-8 text-sm text-ink-400 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>{site.tagline}</p>
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
