"use client";
import { Button, SectionHeading } from "@/components/ui";
import { HeroVisual } from "@/components/HeroVisual";
import { MaskLines, FadeIn } from "@/components/HeroMotion";
import { Icon } from "@/components/Icon";
import { CalculatorBanner, ProcessPreview, PricingPreview, FinalCTA } from "@/components/sections";
import { Reveal } from "@/components/Reveal";
import { HeroVideo } from "@/components/HeroVideo";
import { site } from "@/config/site";
import { useLive, tf } from "@/components/LiveContent";
import { ServiceShowcase, STACK_ANCHOR_ID } from "@/components/ServiceShowcase";
import Link from "@/components/LocalLink";
import { useI18n } from "@/i18n/I18nProvider";

export default function Home() {
  const video = site.heroVideo;
  const bgVideo = Boolean(video.src);
  const { home } = useLive();
  const { t } = useI18n();
  // Longer headline lines (other languages, or edited text) get a slightly smaller size so the first screen still fits.
  const longest = Math.max(...home.hero.headline.map((l) => l.text.length));
  const fit = Math.max(0.68, Math.min(1, 11 / longest)).toFixed(3);
  const sec = (o: object) => ({ kicker: tf(o, "kicker"), title: tf(o, "title"), accent: tf(o, "accent"), intro: tf(o, "intro") });
  return (
    <>
      <section className="pattern-bg relative flex min-h-[100svh] items-center overflow-hidden pb-14 pt-28 sm:pt-32 lg:pb-16 lg:pt-28">
        {bgVideo && (
          <div className="absolute inset-0">
            <HeroVideo src={video.src} poster={video.poster} className="h-full w-full object-cover" controlClassName="bottom-6 right-6" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/40" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" aria-hidden="true" />
          </div>
        )}
        <div className="glow-teal pointer-events-none absolute -right-60 top-0 h-[900px] w-[900px]" aria-hidden="true" />
        <div className="container-site relative grid w-full items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
          <div>
            <FadeIn><p className="kicker mb-5 sm:mb-6" data-tina-field={tf(home.hero, "kicker")}>{home.hero.kicker}</p></FadeIn>
            {/* Headline scales with the screen width AND height, so headline, text and buttons always fit on the first screen */}
            <h1 className="leading-[0.95]" style={{ fontSize: `calc(clamp(2.5rem, min(6vw, 10.2svh), 5.5rem) * var(--heading-scale, 1) * ${fit})` }}>
              <MaskLines lines={home.hero.headline} fields={home.hero.headline.map((l) => tf(l))} />
            </h1>
            <FadeIn delay={0.6}>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-200 sm:text-lg" data-tina-field={tf(home.hero, "intro")}>{home.hero.intro}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href={home.hero.primaryButton.link} arrow field={tf(home.hero.primaryButton)}>{home.hero.primaryButton.label}</Button>
                <Button href={home.hero.secondaryButton.link} variant="outline" field={tf(home.hero.secondaryButton)}>{home.hero.secondaryButton.label}</Button>
              </div>
              <p className="mt-6 flex items-center gap-3 text-sm text-ink-300">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-teal/10 text-teal"><Icon name="globe" className="h-5 w-5" /></span>
                <span data-tina-field={tf(home.hero, "markets")}>{home.hero.markets}</span>
              </p>
            </FadeIn>
          </div>
          {/* The six service cards are stacked here on load, then fly into the services grid on scroll (see ServiceShowcase). */}
          <div className="relative">
            <div id={STACK_ANCHOR_ID} className={`relative mx-auto aspect-[8/7] ${site.respectReducedMotion ? "motion-reduce:hidden" : ""}`} style={{ width: "min(100%, 560px, calc(64svh * 8 / 7))" }} aria-hidden="true" />
            {site.respectReducedMotion && <div className="hidden overflow-hidden rounded-[34px] shadow-lift ring-1 ring-white/10 motion-reduce:block"><HeroVisual className="h-auto w-full" /></div>}
          </div>
        </div>
      </section>

      <section id="what-we-do" className="relative py-20 sm:py-28" aria-label={t.nav.services}>
        <div className="container-site"><ServiceShowcase /></div>
      </section>

      <section className="pb-20 sm:pb-28"><div className="container-site"><CalculatorBanner /></div></section>

      <section className="border-y border-white/5 bg-ink-900 py-20 sm:py-28">
        <div className="container-site">
          <Reveal><SectionHeading kicker={home.process.kicker} title={home.process.title} accent={home.process.accent} intro={home.process.intro} fields={sec(home.process)} /></Reveal>
          <ProcessPreview />
          <div className="mt-14"><Button href="/process" variant="outline" arrow field={tf(home.process, "button")}>{home.process.button}</Button></div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-site">
          <Reveal><SectionHeading kicker={home.pricing.kicker} title={home.pricing.title} accent={home.pricing.accent} intro={home.pricing.intro} fields={sec(home.pricing)} /></Reveal>
          <PricingPreview />
          <p className="mt-10 text-center text-sm text-ink-400"><span data-tina-field={tf(home.pricing, "note")}>{home.pricing.note}</span> <Link href="/pricing" className="text-teal underline underline-offset-4">{t.home.fullDetails}</Link></p>
        </div>
      </section>

      <FinalCTA title={home.finalCta.title} accent={home.finalCta.accent} text={home.finalCta.text} fields={{ title: tf(home.finalCta, "title"), accent: tf(home.finalCta, "accent"), text: tf(home.finalCta, "text"), primary: tf(home.finalCta, "primaryButton"), secondary: tf(home.finalCta, "secondaryButton") }} />
    </>
  );
}
