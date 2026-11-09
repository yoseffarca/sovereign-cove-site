import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";
import { useReveal } from "../hooks/use-reveal";
import { media } from "../lib/media";
import { headFor } from "../lib/seo";

export const Route = createFileRoute("/queries")({
  head: headFor("/queries"),
  component: Queries,
});

function Queries() {
  useReveal();

  return (
    <main className="bg-background text-foreground">
      <SiteNav />

      <section className="relative min-h-screen flex items-center justify-center text-white px-6">
        <img
          src={media.queriesFiller}
          alt="Tranquil cove detail at The Sovereign Cove"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative max-w-2xl mx-auto text-center">
          <p className="reveal-up text-[11px] md:text-xs tracking-[0.5em] uppercase opacity-90 mb-8">
            — Private Inquiries —
          </p>
          <h1 className="reveal-up delay-200 font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.05] mb-10">Inquiries</h1>
          <p className="reveal-up delay-400 text-sm md:text-base font-light leading-relaxed opacity-90 mb-12">
            For all private requests, availability, and event considerations, please contact our concierge directly.
          </p>
          <a
            href="mailto:info@sovereigncove.com"
            className="reveal-up delay-600 inline-block font-serif text-xl md:text-2xl lg:text-3xl text-white hover:text-white/80 transition-colors border-b border-white/40 hover:border-white/70 pb-2"
          >
            info@sovereigncove.com
          </a>
        </div>
      </section>

      <SiteFooter className="bg-background" />
    </main>
  );
}
