import { LegalPage } from "@/components/LegalPage";
import { pageI18n, pageMetadata } from "@/i18n/server";

export const generateMetadata = pageMetadata("terms", "/terms");

export default async function Page(props: { params: Promise<{ lang: string }> }) {
  const { t } = await pageI18n(props);
  const d = t.legal.terms;
  return <LegalPage kicker={t.legal.kicker} note={t.legal.note} title={d.title} accent={d.accent} blocks={d.blocks} />;
}
