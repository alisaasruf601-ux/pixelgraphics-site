import { PageHero } from "@/components/ui";
import { Calculator } from "@/components/Calculator";
import { hourly } from "@/config/pricing";
import { money } from "@/lib/format";
import { pageI18n, pageMetadata } from "@/i18n/server";
import { fmt } from "@/i18n/config";

export const generateMetadata = pageMetadata("calculator", "/calculator");

export default async function CalculatorPage(props: { params: Promise<{ lang: string }> }) {
  const { t } = await pageI18n(props);
  const c = t.calcPage;
  return (
    <>
      <PageHero kicker={c.kicker} title={c.title} accent={c.accent} intro={fmt(c.intro, { rate: money(hourly.rate), min: hourly.minHours })} />
      <section className="pb-32 pt-12 sm:pt-16 lg:pb-28">
        <div className="container-site"><Calculator /></div>
      </section>
    </>
  );
}
