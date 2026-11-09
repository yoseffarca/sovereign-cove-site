import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";
import { useReveal } from "../hooks/use-reveal";
import { media } from "../lib/media";
import { headFor } from "../lib/seo";

export const Route = createFileRoute("/about")({
  head: headFor("/about"),
  component: About,
});

const sections = [
  {
    kicker: "I · Location",
    title: "Location",
    body: "Sovereign Cove sits on 15 private acres in the Upper Florida Keys — 17 minutes from downtown Miami by helicopter, 75 minutes by car. Two private beaches, a secluded natural cove, botanical and Zen gardens, and a full residential staff. There is nothing else like it in South Florida.",
    image: media.aboutLocation,
    alt: "Oceanfront putting green framed by palms overlooking the turquoise sea at The Sovereign Cove",
  },
  {
    kicker: "II · Experience",
    title: "The Experience",
    body: "Icon 5 aircraft available on-call with co-piloting. On-call captain for deep sea fishing, private cruising, and water sports. Guided jet ski excursions on property. Complimentary helicopter transfers to the area's finest golf courses departing directly from the private helipad.",
    image: media.aboutExperience,
    alt: "Aerial view of the turquoise cove and surrounding mangroves from above",
  },
  {
    kicker: "III · Estate",
    title: "Estate",
    body: "Private helipad with direct helicopter access from downtown Miami. Two fully private beaches with no shared shoreline. Botanical and Zen gardens designed for focus and clarity. Full residential staff managing all catering, logistics, and hospitality throughout every engagement.",
    image: media.aboutExclusivity,
    alt: "Private helicopter arriving at The Sovereign Cove's beachfront estate",
  },
];

function About() {
  useReveal();
  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  return (
    <main className="bg-background text-foreground">
      <SiteNav />

      <section className="relative h-[55vh] min-h-[360px] w-full overflow-hidden bg-deep">
        <img
          src={media.aboutHero}
          alt="Private helicopter resting on the helipad with the turquoise waters of the Florida Keys beyond"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </section>

      <section className="px-6 pt-12 md:pt-16 pb-8 text-center bg-background">
        <div className="mx-auto max-w-5xl">
          <p className="reveal-up text-[11px] tracking-[0.45em] uppercase text-foreground/60 mb-6">
            — About The Sovereign Cove —
          </p>
          <h1 className="reveal-up font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.05] text-foreground">About Us</h1>
          <p className="reveal-up mt-6 text-base md:text-lg font-light text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            A private retreat hidden in the Florida Keys — opened only to those we welcome.
          </p>
        </div>
      </section>

      <section className="px-6 pt-20 md:pt-24 pb-32">
        <div className="mx-auto max-w-[1400px] space-y-32 md:space-y-48">
          {sections.map((s, i) => {
            const reverse = i % 2 === 1;
            return (
              <article
                key={s.kicker}
                className={`grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center ${reverse ? "md:[direction:rtl]" : ""}`}
              >
                <div className={`md:col-span-7 in-view ${reverse ? "md:[direction:ltr]" : ""}`}>
                  <div className="relative overflow-hidden group">
                    <img
                      src={s.image}
                      alt={s.alt}
                      loading="lazy"
                      className={`w-full h-[60vh] md:h-[78vh] object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04] ${s.title === "Estate" ? "scale-[0.85]" : ""}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent pointer-events-none" />
                  </div>
                </div>
                <div
                  className={`md:col-span-5 in-view ${reverse ? "md:[direction:ltr]" : ""}`}
                  style={{ transitionDelay: "200ms" }}
                >
                  <h2 className="font-serif text-3xl md:text-5xl leading-[1.15] text-deep mb-8">{s.title}</h2>
                  <div className="h-px w-16 bg-primary/40 mb-8" />
                  <p className="text-base md:text-lg font-light leading-[1.85] text-muted-foreground">{s.body}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-t border-border/60 px-6 py-32 text-center">
        <p className="in-view text-[11px] tracking-[0.45em] uppercase text-muted-foreground mb-8">
          — Tavernier · Florida —
        </p>
        <p
          className="in-view font-serif text-2xl md:text-4xl italic leading-[1.4] max-w-3xl mx-auto text-deep"
          style={{ transitionDelay: "120ms" }}
        >
          "Some places are visited. Others are remembered. The Cove is felt."
        </p>
      </section>

      <SiteFooter />
    </main>
  );
}
