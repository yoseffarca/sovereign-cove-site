import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";
import { useReveal } from "../hooks/use-reveal";

type EventPageProps = {
  kicker: string;
  title: string;
  heroTagline: string;
  overview: string;
  detail?: string;
  image: string;
  imageAlt: string;
};

export function EventPage({ kicker, title, heroTagline, overview, detail, image, imageAlt }: EventPageProps) {
  useReveal();
  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  return (
    <main className="bg-background text-foreground">
      <SiteNav />

      <section className="relative h-[85vh] min-h-[520px] w-full overflow-hidden bg-deep">
        <img src={image} alt={imageAlt} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <p className="reveal-fade delay-200 text-[11px] tracking-[0.5em] uppercase mb-6 opacity-90">{kicker}</p>
          <h1 className="reveal-up delay-300 font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.05] max-w-4xl">
            {title}
          </h1>
          <p className="reveal-up delay-500 mt-8 max-w-2xl text-base md:text-lg font-light leading-relaxed text-white/85">
            {heroTagline}
          </p>
        </div>
      </section>

      <section className="relative px-6 py-32 md:py-40">
        <div className="mx-auto max-w-3xl text-center">
          <p className="in-view text-[11px] tracking-[0.45em] uppercase text-muted-foreground mb-10">
            — An Occasion Considered —
          </p>
          <h2
            className="in-view font-serif text-3xl md:text-5xl leading-[1.25] text-deep"
            style={{ transitionDelay: "120ms" }}
          >
            {overview}
          </h2>
          {detail && (
            <p
              className="in-view mt-10 text-lg md:text-xl font-light leading-relaxed text-muted-foreground"
              style={{ transitionDelay: "240ms" }}
            >
              {detail}
            </p>
          )}
          <div className="in-view mt-16" style={{ transitionDelay: "360ms" }}>
            <Link
              to="/queries"
              className="inline-flex items-center gap-3 text-[11px] tracking-[0.4em] uppercase text-primary cursor-pointer group"
            >
              <span className="nav-link">Inquire Now</span>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
