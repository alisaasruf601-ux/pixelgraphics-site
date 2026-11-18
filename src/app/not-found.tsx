import { Button } from "@/components/ui";
export default function NotFound() {
  return (
    <section className="pattern-bg grid min-h-[80vh] place-items-center px-5 pt-28 text-center">
      <div>
        <p className="kicker mb-6 justify-center">Error 404</p>
        <h1 className="text-6xl sm:text-8xl">Page <span className="text-teal">not found.</span></h1>
        <p className="mx-auto mt-6 max-w-md text-lg text-ink-200">The page you’re looking for doesn’t exist or has moved.</p>
        <div className="mt-10 flex justify-center gap-3"><Button href="/" arrow>Back to home</Button><Button href="/contact" variant="outline">Contact us</Button></div>
      </div>
    </section>
  );
}
