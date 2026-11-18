import { PageHero, SectionHeading, Button } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { Icon, type IconKey } from "@/components/Icon";
import { FinalCTA } from "@/components/sections";
import { bookingHref } from "@/config/site";
import { localizeHref } from "@/i18n/config";
import { pageI18n, pageMetadata } from "@/i18n/server";

export const generateMetadata = pageMetadata("process", "/process");

const journeyIcons: IconKey[] = ["chat", "doc", "calendar", "calc", "shield", "pen", "eye", "check", "handshake"];
const journeyLinks: (string | undefined)[] = ["/contact", "/brief", bookingHref];
const remoteIcons: IconKey[] = ["calendar", "doc", "clock", "chat"];

export default async function ProcessPage(props: { params: Promise<{ lang: string }> }) {
  const { lang, t } = await pageI18n(props);
  const p = t.process;
  return (
    <>
      <PageHero kicker={p.kicker} title={p.title} accent={p.accent} intro={p.intro} />

      <section className="py-20 sm:py-28" aria-labelledby="journey-h">
        <div className="container-site">
          <h2 id="journey-h" className="sr-only">{p.journeyTitle}</h2>
          <ol className="relative mx-auto max-w-4xl">
            <div className="absolute bottom-0 left-[27px] top-0 w-px bg-gradient-to-b from-teal via-deep to-teal/0 sm:left-1/2" aria-hidden="true" />
            {p.steps.map((s, i) => {
              const right = i % 2 === 1;
              const href = journeyLinks[i];
              return (
                <li key={i} className="relative pb-12 last:pb-0 sm:grid sm:grid-cols-2 sm:gap-16">
                  <div className="absolute left-0 top-0 z-10 grid h-14 w-14 place-items-center rounded-2xl border border-teal/40 bg-ink-800 text-cloud shadow-glow sm:left-1/2 sm:-translate-x-1/2">
                    <Icon name={journeyIcons[i]} className="h-7 w-7" />
                  </div>
                  <Reveal className={`pl-20 sm:pl-0 ${right ? "sm:col-start-2 sm:pl-12" : "sm:pr-12 sm:text-right"}`}>
                    <p className="font-display text-sm text-teal">{p.step} {String(i + 1).padStart(2, "0")}</p>
                    <h3 className="mt-2 text-2xl text-cloud sm:text-3xl">{s.title}</h3>
                    <p className="mt-3 leading-relaxed text-ink-300">{s.text}</p>
                    <p className={`mt-4 inline-flex items-start gap-2 rounded-xl bg-teal/[0.08] px-4 py-2.5 text-left text-sm text-ink-200 ${right ? "" : "sm:flex-row-reverse sm:text-right"}`}>
                      <span className="font-semibold text-teal">{p.you}</span>{s.you}
                    </p>
                    {href && s.link && <p className="mt-3"><a href={localizeHref(href, lang)} className="text-sm font-semibold text-teal hover:underline">{s.link} →</a></p>}
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="border-y border-white/5 bg-ink-900 py-20 sm:py-28">
        <div className="container-site">
          <Reveal><SectionHeading kicker={p.remoteKicker} title={p.remoteTitle} accent={p.remoteAccent} intro={p.remoteIntro} /></Reveal>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {p.remote.map((r, i) => (
              <li key={i}><Reveal delay={i * 0.08} className="h-full"><div className="h-full rounded-card border border-white/[0.07] bg-ink-800/60 p-7">
                <Icon name={remoteIcons[i]} className="h-10 w-10 text-cloud" /><h3 className="mt-5 text-lg text-cloud">{r.title}</h3><p className="mt-2 text-[15px] leading-relaxed text-ink-300">{r.text}</p>
              </div></Reveal></li>
            ))}
          </ul>
          <div className="mt-12 flex flex-col gap-3 sm:flex-row"><Button href="/brief" arrow>{p.briefBtn}</Button><Button href="/calculator" variant="outline">{p.calcBtn}</Button></div>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
