import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { Calculator } from "@/components/Calculator";
import { hourly } from "@/config/pricing";
import { money } from "@/lib/format";

export const metadata: Metadata = {
  title: "Graphic Design Hourly Calculator",
  description: "Calculate the price of your graphic design project by the hour. Other services are quoted personally.",
  alternates: { canonical: "/calculator" },
};

export default function CalculatorPage() {
  return (
    <>
      <PageHero kicker="Hourly calculator" title="Graphic design," accent="by the hour."
        intro={`Flyers, posts, brochures and more for ${money(hourly.rate)} per hour (minimum ${hourly.minHours} hours). Choose your hours and see the price instantly.`} />
      <section className="pb-32 pt-12 sm:pt-16 lg:pb-28">
        <div className="container-site"><Calculator /></div>
      </section>
    </>
  );
}
