import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
export const metadata: Metadata = { title: "Privacy Policy", alternates: { canonical: "/privacy" } };
export default function Page() {
  return (
    <LegalPage title="Privacy" accent="Policy">
      <p>This policy explains how Pixel Graphics collects and uses personal data through this website.</p>
      <h2>What we collect</h2>
      <ul><li>Details you enter in our forms: name, business name, email, country, phone/WhatsApp number (optional), project information and budget.</li><li>Your project selection when you send an estimate from the price calculator.</li><li>Analytics data (Google Analytics, Meta Pixel) — only if you accept analytics cookies.</li></ul>
      <h2>Why we use it</h2>
      <p>To reply to your inquiry, prepare proposals, schedule meetings, deliver our services and — if you subscribe — send our newsletter. The legal basis is your consent and/or taking steps at your request before entering into a contract.</p>
      <h2>How long we keep it</h2>
      <p>[Add retention periods, e.g. inquiries without follow-up are deleted after 12 months.]</p>
      <h2>Who we share it with</h2>
      <p>[List processors, e.g. email provider, hosting provider, meeting tools.] We never sell your data.</p>
      <h2>Your rights</h2>
      <p>You can ask to access, correct or delete your data, withdraw consent, or object to processing. Under the GDPR you may also lodge a complaint with your data protection authority (in the Netherlands: Autoriteit Persoonsgegevens).</p>
      <h2>Cookies</h2>
      <p>We only set analytics cookies after you click “Accept”. Your choice is stored in your browser’s local storage.</p>
      <h2>Contact</h2>
      <p>[Add the business name, registration details and contact email for privacy questions.]</p>
    </LegalPage>
  );
}
