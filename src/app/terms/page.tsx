import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
export const metadata: Metadata = { title: "Terms & Conditions", alternates: { canonical: "/terms" } };
export default function Page() {
  return (
    <LegalPage title="Terms &" accent="Conditions">
      <p>These terms apply to the use of this website and to quotations issued by Pixel Graphics.</p>
      <h2>Website content</h2>
      <p>All content on this website is provided for general information. Prices shown on the website and in the price calculator are indicative and are not binding offers.</p>
      <h2>Quotations</h2>
      <p>A quotation is only binding once confirmed in writing by both parties. [Add validity period of quotations.]</p>
      <h2>Intellectual property</h2>
      <p>[Describe when ownership of final designs transfers to the client, e.g. after full payment, and what rights Pixel Graphics keeps for portfolio use.]</p>
      <h2>Liability</h2>
      <p>[Add limitation of liability clause.]</p>
      <h2>Governing law</h2>
      <p>[Add governing law and jurisdiction.]</p>
    </LegalPage>
  );
}
