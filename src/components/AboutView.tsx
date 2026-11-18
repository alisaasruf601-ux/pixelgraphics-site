"use client";
/** About page. All text and the photo come from content/about.json (editable at /admin). */
import { PageHero, SectionHeading, Button } from "./ui";
import { Reveal } from "./Reveal";
import { Icon, type IconKey } from "./Icon";
import { Ribbon } from "./Ribbon";
import { FinalCTA } from "./sections";
import { LogoMark } from "./Logo";
import { useLive, tf } from "./LiveContent";

export function AboutView() {
  const { about: a } = useLive();
  const sec = (o: object) => ({ kicker: tf(o, "kicker"), title: tf(o, "title"), accent: tf(o, "accent"), intro: tf(o, "intro") });
  return (
    <>
      <PageHero kicker={a.hero.kicker} title={a.hero.title} accent={a.hero.accent} intro={a.hero.intro} />

      <section className="py-20 sm:py-28">
        <div className="container-site grid items-center gap-14 lg:grid-cols-[1.15fr_1fr]">
          <Reveal>
            <p className="kicker mb-5" data-tina-field={tf(a.intro, "kicker")}>{a.intro.kicker}</p>
            <h2 className="mb-10 text-cloud [--fs:1.9rem] sm:[--fs:2.8rem] lg:[--fs:2.5rem] xl:[--fs:2.9rem] sm:whitespace-nowrap" style={{ fontSize: "calc(var(--fs) * var(--heading-scale, 1))" }}>
              {a.intro.headline.map((l, i) => (
                <span key={i} data-tina-field={tf(l)} className={`block ${l.accent ? "text-teal" : ""}`}>{l.text}</span>
              ))}
            </h2>
            <div className="space-y-5 text-lg leading-relaxed text-ink-200">
              {a.intro.paragraphs.map((p, i) => <p key={i} data-tina-field={tf(a.intro, "paragraphs", i)}>{p}</p>)}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative aspect-[5/4] overflow-hidden rounded-panel bg-teal" data-tina-field={tf(a.intro, "photo")}>
              {a.intro.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={a.intro.photo} alt="Pixel Graphics" className="absolute inset-0 h-full w-full object-cover" />
              ) : (
                <>
                  <Ribbon width={700} height={430} className="absolute -left-10 top-10 w-[115%]" />
                  <div className="absolute bottom-6 right-6 grid h-28 w-28 place-items-center rounded-3xl bg-ink p-5 shadow-lift"><LogoMark className="w-full" /></div>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-white/5 bg-ink-900 py-20 sm:py-28">
        <div className="container-site grid gap-6 lg:grid-cols-3">
          {a.cards.map((c, i) => (
            <Reveal key={i} delay={i * 0.1} className="h-full">
              <article className={`flex h-full flex-col rounded-panel p-8 sm:p-10 ${i === 1 ? "bg-deep-700" : "card-dark"}`}>
                <p className={`kicker mb-6 ${i === 1 ? "!text-cloud before:!bg-cloud" : ""}`} data-tina-field={tf(c, "kicker")}>{c.kicker}</p>
                <h2 className="text-3xl text-cloud lg:min-h-[2lh]" data-tina-field={tf(c, "title")}>{c.title}</h2>
                <p className={`mt-5 leading-relaxed ${i === 1 ? "text-teal-100" : "text-ink-300"}`} data-tina-field={tf(c, "text")}>{c.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-site">
          <Reveal><SectionHeading kicker={a.values.kicker} title={a.values.title} accent={a.values.accent} intro={a.values.intro} fields={sec(a.values)} /></Reveal>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {a.values.items.map((v, i) => (
              <li key={i}><Reveal delay={(i % 3) * 0.08} className="h-full">
                <div className="group h-full rounded-card border border-white/[0.07] bg-ink-800/60 p-7 transition hover:border-teal/40">
                  <span data-tina-field={tf(v, "icon")} className="grid h-14 w-14 place-items-center rounded-2xl bg-teal/10 text-cloud transition group-hover:bg-teal group-hover:text-ink"><Icon name={v.icon as IconKey} className="h-8 w-8" accent /></span>
                  <h3 className="mt-6 text-xl text-cloud sm:min-h-[2lh]" data-tina-field={tf(v, "title")}>{v.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-300" data-tina-field={tf(v, "text")}>{v.text}</p>
                </div>
              </Reveal></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-teal py-20 text-ink sm:py-28">
        <div className="container-site">
          <Reveal><SectionHeading dark kicker={a.why.kicker} title={a.why.title} accent={a.why.accent} fields={sec(a.why)} /></Reveal>
          <ol className="grid gap-x-10 gap-y-12 md:grid-cols-2">
            {a.why.items.map((w, i) => (
              <li key={i} className="border-t-2 border-ink pt-6"><Reveal delay={i * 0.06}>
                <span className="font-display text-5xl text-deep-800">0{i + 1}</span>
                <h3 className="mt-3 text-2xl" data-tina-field={tf(w, "title")}>{w.title}</h3>
                <p className="mt-3 text-lg leading-relaxed text-ink/80" data-tina-field={tf(w, "text")}>{w.text}</p>
              </Reveal></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-site">
          <Reveal><SectionHeading kicker={a.remote.kicker} title={a.remote.title} accent={a.remote.accent} intro={a.remote.intro} fields={sec(a.remote)} /></Reveal>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {a.remote.items.map((r, i) => (
              <li key={i}><Reveal delay={i * 0.08} className="h-full"><div className="h-full rounded-card border border-white/[0.07] bg-ink-800/60 p-7">
                <span data-tina-field={tf(r, "icon")}><Icon name={r.icon as IconKey} className="h-10 w-10 text-cloud" /></span>
                <h3 className="mt-5 text-lg text-cloud lg:min-h-[1lh] lg:whitespace-nowrap" data-tina-field={tf(r, "title")}>{r.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-300" data-tina-field={tf(r, "text")}>{r.text}</p>
              </div></Reveal></li>
            ))}
          </ul>
          <div className="mt-12"><Button href="/process" variant="outline" arrow field={tf(a.remote, "button")}>{a.remote.button}</Button></div>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
