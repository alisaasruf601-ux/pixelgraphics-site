import type { Metadata, Viewport } from "next";
import { MotionProvider } from "@/components/MotionProvider";
import { LogoIntro } from "@/components/LogoIntro";
import { INTRO_SCRIPT } from "@/lib/intro-script";
import { theme } from "@/config/content";
import { googleFontsHref } from "@/config/fonts";
import { themeVars } from "@/config/theme";
import { LiveContentProvider } from "@/components/LiveContent";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import "@fontsource/archivo-black/400.css";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "../globals.css";
import { notFound } from "next/navigation";
import { locales, isLocale, localeTags, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { getContent } from "@/i18n/content";
import { I18nProvider } from "@/i18n/I18nProvider";
import { alternatesFor } from "@/i18n/seo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { DevConfigNotice } from "@/components/DevConfigNotice";
import { site } from "@/config/site";

export const dynamicParams = false;
export function generateStaticParams() { return locales.map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: l } = await params;
  const lang = (isLocale(l) ? l : "en") as Locale;
  const t = getDictionary(lang);
  return {
    metadataBase: new URL(site.url),
    title: { default: `${site.name} | ${t.brand.tagline}`, template: `%s | ${site.name}` },
    description: t.meta.description,
    openGraph: { type: "website", siteName: site.name, title: `${site.name} | ${t.brand.positioning} ${t.brand.positioningAccent}`, description: t.meta.description, locale: localeTags[lang].og },
    twitter: { card: "summary_large_image" },
    alternates: alternatesFor(lang, "/"),
  };
}
export const viewport: Viewport = { themeColor: "#222026", colorScheme: "dark" };

const orgJsonLd = (description: string) => ({
  "@context": "https://schema.org", "@type": "ProfessionalService", name: site.name, description, url: site.url,
  slogan: site.tagline, areaServed: ["NL", "SR", "BR", "Worldwide"],
  ...(site.contact.email ? { email: site.contact.email } : {}),
});

const fontsHref = googleFontsHref([theme.headingFont, theme.bodyFont]);
const { "font-size": rootFontSize, ...cssVars } = themeVars(theme);
const fontVars = { ...cssVars, fontSize: rootFontSize } as React.CSSProperties;

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang: l } = await params;
  if (!isLocale(l)) notFound();
  const lang = l as Locale;
  const t = getDictionary(lang);
  const content = getContent(lang);
  return (
    <html lang={localeTags[lang].html} suppressHydrationWarning style={fontVars}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: INTRO_SCRIPT }} />
        {fontsHref && <><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" /><link rel="stylesheet" href={fontsHref} /></>}
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd(t.meta.description)) }} />
        <I18nProvider lang={lang} t={t}>
          <LogoIntro />
          <Header />
          <main id="main"><MotionProvider><LiveContentProvider lang={lang} content={content}>{children}</LiveContentProvider></MotionProvider></main>
          <Footer lang={lang} />
          <WhatsAppButton />
          <CookieConsent />
          <DevConfigNotice />
        </I18nProvider>
      </body>
    </html>
  );
}
