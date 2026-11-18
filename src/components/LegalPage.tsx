import type { ReactNode } from "react";
import { PageHero } from "./ui";

export function LegalPage({ title, accent, children }: { title: string; accent: string; children: ReactNode }) {
  return (
    <>
      <PageHero kicker="Legal" title={title} accent={accent} />
      <section className="py-16 sm:py-20">
        <div className="container-site max-w-3xl">
          <p role="note" className="mb-10 rounded-xl border border-amber-300/40 bg-amber-300/10 px-5 py-4 text-sm text-amber-100">
            Draft template — have this text reviewed by a legal professional and completed with your business details before launch.
          </p>
          <div className="prose-pg">{children}</div>
        </div>
      </section>
    </>
  );
}
