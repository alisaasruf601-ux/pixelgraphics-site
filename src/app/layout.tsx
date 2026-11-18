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
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { DevConfigNotice } from "@/components/DevConfigNotice";
import { site } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: { type: "website", siteName: site.name, title: `${site.name} | ${site.positioning}`, description: site.description, locale: "en_US" },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};
export const viewport: Viewport = { themeColor: "#222026", colorScheme: "dark" };

const orgJsonLd = {
  "@context": "https://schema.org", "@type": "ProfessionalService", name: site.name, description: site.description, url: site.url,
  slogan: site.tagline, areaServed: ["NL", "SR", "BR", "Worldwide"],
  ...(site.contact.email ? { email: site.contact.email } : {}),
};

const fontsHref = googleFontsHref([theme.headingFont, theme.bodyFont]);
const { "font-size": rootFontSize, ...cssVars } = themeVars(theme);
const fontVars = { ...cssVars, fontSize: rootFontSize } as React.CSSProperties;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning style={fontVars}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: INTRO_SCRIPT }} />
        {fontsHref && <><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" /><link rel="stylesheet" href={fontsHref} /></>}
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <LogoIntro />
        <Header />
        <main id="main"><MotionProvider><LiveContentProvider>{children}</LiveContentProvider></MotionProvider></main>
        <Footer />
        <WhatsAppButton />
        <CookieConsent />
        <DevConfigNotice />
      </body>
    </html>
  );
}
