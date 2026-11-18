import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
export const metadata: Metadata = { title: "Service Agreement", alternates: { canonical: "/service-agreement" } };
export default function Page() {
  return (
    <LegalPage title="Service" accent="Agreement">
      <p>This outlines the standard agreement for projects and monthly packages. Each project receives its own written proposal and agreement.</p>
      <h2>Scope</h2>
      <p>The deliverables, number of revision rounds and timeline are defined in the accepted proposal. Additional work is quoted separately before it starts.</p>
      <h2>Payment</h2>
      <p>[Add payment terms, e.g. deposit before start, balance before delivery of final files; monthly packages invoiced in advance.]</p>
      <h2>Feedback and revisions</h2>
      <p>The client provides consolidated feedback per round. Revision rounds not used within [X] days may expire.</p>
      <h2>Monthly packages</h2>
      <p>[Add minimum term, notice period and how unused deliverables are handled.] Advertising budgets (ad spend) are always paid by the client directly to the platform.</p>
      <h2>Delivery and approval</h2>
      <p>Final files are delivered after written approval and full payment, in the formats agreed in the proposal.</p>
      <h2>Cancellation</h2>
      <p>[Add cancellation terms and fees for work already performed.]</p>
    </LegalPage>
  );
}
