import { PageHero } from "@/components/ui";
import { BookingForm } from "@/components/BookingForm";
import { Icon } from "@/components/Icon";
import { pageI18n, pageMetadata } from "@/i18n/server";

export const generateMetadata = pageMetadata("book", "/book");
const icons = ["clock", "remote", "check"] as const;

export default async function BookPage(props: { params: Promise<{ lang: string }> }) {
  const { t } = await pageI18n(props);
  const b = t.bookPage;
  return (
    <>
      <PageHero kicker={b.kicker} title={b.title} accent={b.accent} intro={b.intro} />
      <section className="py-16 sm:py-24">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <ul className="space-y-6">
            {b.points.map((x, i) => (
              <li key={i} className="flex gap-4"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-teal/10 text-cloud"><Icon name={icons[i]} className="h-7 w-7" /></span>
                <span><span className="block font-display text-lg uppercase text-cloud">{x.t}</span><span className="text-ink-300">{x.d}</span></span></li>
            ))}
          </ul>
          <div className="rounded-panel border border-white/[0.07] bg-ink-800/50 p-6 sm:p-10"><BookingForm /></div>
        </div>
      </section>
    </>
  );
}
