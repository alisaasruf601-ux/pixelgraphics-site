import Link from "next/link";
import type { ReactNode } from "react";

type BtnVariant = "primary" | "dark" | "outline" | "outline-dark";
const variantClass: Record<BtnVariant, string> = { primary: "btn-primary", dark: "btn-dark", outline: "btn-outline", "outline-dark": "btn-outline-dark" };
export function Button({ href, children, variant = "primary", arrow = false, className = "", external = false, field }:
  { href: string; children: ReactNode; variant?: BtnVariant; arrow?: boolean; className?: string; external?: boolean; field?: string }) {
  const cls = `btn ${variantClass[variant]} ${className}`;
  const inner = <>{children}{arrow && <span className="btn-arrow" aria-hidden="true">→</span>}</>;
  if (external || href.startsWith("http")) return <a href={href} className={cls} target="_blank" rel="noopener noreferrer" data-tina-field={field}>{inner}</a>;
  return <Link href={href} className={cls} data-tina-field={field}>{inner}</Link>;
}

export function Kicker({ children, dark = false, className = "", field }: { children: ReactNode; dark?: boolean; className?: string; field?: string }) {
  return <p data-tina-field={field} className={`kicker ${dark ? "kicker-dark" : ""} ${className}`}>{children}</p>;
}

/** Two-tone brand headline: first part in base colour, `accent` in teal. */
export function SectionHeading({ kicker, title, accent, intro, align = "split", as: Tag = "h2", dark = false, fields = {} }:
  { kicker?: string; title: string; accent?: string; intro?: ReactNode; align?: "split" | "left" | "center"; as?: "h1" | "h2"; dark?: boolean;
    /** Visual-editor links (data-tina-field values) for kicker, title, accent and intro. */
    fields?: { kicker?: string; title?: string; accent?: string; intro?: string } }) {
  const heading = (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : ""}>
      {kicker && <Kicker dark={dark} field={fields.kicker} className={`mb-5 ${align === "center" ? "justify-center" : ""}`}>{kicker}</Kicker>}
      <Tag className={`text-balance [--fs:2.6rem] sm:[--fs:3.75rem] lg:[--fs:4.5rem] ${dark ? "text-ink" : "text-cloud"}`} style={{ fontSize: "calc(var(--fs) * var(--heading-scale, 1))" }}>
        <span data-tina-field={fields.title}>{title}</span>{accent && <> <span data-tina-field={fields.accent} className={dark ? "text-deep-800" : "text-teal"}>{accent}</span></>}
      </Tag>
    </div>
  );
  if (align === "split" && intro) return (
    <div className="mb-12 grid gap-6 lg:mb-16 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-16">
      {heading}<div data-tina-field={fields.intro} className={`text-base leading-relaxed sm:text-lg ${dark ? "text-ink" : "text-ink-300"}`}>{intro}</div>
    </div>
  );
  return <div className="mb-12 lg:mb-16">{heading}{intro && <div data-tina-field={fields.intro} className={`mt-6 max-w-2xl text-base leading-relaxed sm:text-lg ${align === "center" ? "mx-auto text-center" : ""} ${dark ? "text-ink" : "text-ink-300"}`}>{intro}</div>}</div>;
}

export function PageHero({ kicker, title, accent, intro, children }: { kicker: string; title: string; accent?: string; intro?: ReactNode; children?: ReactNode }) {
  return (
    <section className="pattern-bg relative overflow-hidden border-b border-white/5 pb-20 pt-36 sm:pb-24 sm:pt-44">
      <div className="glow-teal pointer-events-none absolute -right-40 -top-40 h-[640px] w-[640px]" aria-hidden="true" />
      <div className="container-site relative">
        <Kicker className="mb-6">{kicker}</Kicker>
        <h1 className="text-balance text-5xl sm:text-7xl lg:text-[6.5rem]">{title}{accent && <> <span className="text-teal">{accent}</span></>}</h1>
        {intro && <div className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-ink-200 sm:text-xl">{intro}</div>}
        {children}
      </div>
    </section>
  );
}
