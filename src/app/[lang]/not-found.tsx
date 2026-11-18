"use client";
import { Button } from "@/components/ui";
import { useI18n } from "@/i18n/I18nProvider";

export default function NotFound() {
  const { t } = useI18n();
  const n = t.notFound;
  return (
    <section className="pattern-bg grid min-h-[80vh] place-items-center px-5 pt-28 text-center">
      <div>
        <p className="kicker mb-6 justify-center">{n.kicker}</p>
        <h1 className="text-6xl sm:text-8xl">{n.title} <span className="text-teal">{n.accent}</span></h1>
        <p className="mx-auto mt-6 max-w-md text-lg text-ink-200">{n.text}</p>
        <div className="mt-10 flex justify-center gap-3"><Button href="/" arrow>{n.home}</Button><Button href="/contact" variant="outline">{n.contact}</Button></div>
      </div>
    </section>
  );
}
