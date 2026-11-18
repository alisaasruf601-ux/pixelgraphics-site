import { PageHero } from "@/components/ui";
import { BriefForm } from "@/components/BriefForm";
import { pageI18n, pageMetadata } from "@/i18n/server";

export const generateMetadata = pageMetadata("brief", "/brief");

export default async function BriefPage(props: { params: Promise<{ lang: string }> }) {
  const { t } = await pageI18n(props);
  const b = t.briefPage;
  return (
    <>
      <PageHero kicker={b.kicker} title={b.title} accent={b.accent} intro={b.intro} />
      <section className="py-16 sm:py-24">
        <div className="container-site max-w-4xl">
          <div className="rounded-panel border border-white/[0.07] bg-ink-800/50 p-6 sm:p-10"><BriefForm /></div>
        </div>
      </section>
    </>
  );
}
