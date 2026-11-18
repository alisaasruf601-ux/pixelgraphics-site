import { PageHero } from "./ui";

/** One block of a legal page: a heading, a paragraph or a bullet list. */
export type LegalBlock = { h?: string; p?: string; ul?: string[] };

export function LegalPage({ title, accent, kicker, note, blocks }: { title: string; accent: string; kicker: string; note: string; blocks: LegalBlock[] }) {
  return (
    <>
      <PageHero kicker={kicker} title={title} accent={accent} />
      <section className="py-16 sm:py-20">
        <div className="container-site max-w-3xl">
          <p role="note" className="mb-10 rounded-xl border border-amber-300/40 bg-amber-300/10 px-5 py-4 text-sm text-amber-100">{note}</p>
          <div className="prose-pg">
            {blocks.map((b, i) => b.h ? <h2 key={i}>{b.h}</h2> : b.ul ? <ul key={i}>{b.ul.map((li, j) => <li key={j}>{li}</li>)}</ul> : <p key={i}>{b.p}</p>)}
          </div>
        </div>
      </section>
    </>
  );
}
