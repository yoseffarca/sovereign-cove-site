import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";
import { useReveal } from "../hooks/use-reveal";
import { media } from "../lib/media";
import { headFor } from "../lib/seo";

export const Route = createFileRoute("/discover")({
  head: headFor("/discover"),
  component: Discover,
});

const pillars = [
  {
    kicker: "I · Luxury",
    title: "Luxury",
    body: "Infinity pools that meet the horizon, a private helipad reserved for arrivals, and expansive outdoor pavilions held in trust for our guests alone — every surface composed for those who expect nothing less.",
    image: media.discoverLuxury,
    alt: "Tropical grotto with cascading waterfall, lush ferns, and a koi pond beneath a stone archway",
  },
  {
    kicker: "II · Security",
    title: "Security",
    body: "The estate is held behind quiet, considered protections — a controlled approach, discreet surveillance, and a perimeter watched without intrusion. Privacy here is absolute, and never spoken of.",
    image: media.discoverSecurity,
    alt: "Tranquil private beach with turquoise water, palm trees, and lounge chairs overlooking a distant island",
  },
  {
    kicker: "III · Service",
    title: "Service",
    body: "A resident concierge is kept on hand at every hour, attending only to your party. From the resident chef to private passages arranged on a moment's notice, each request is met before it is voiced.",
    image: media.discoverService,
    alt: "Lush garden pavilion with outdoor wellness setup, yoga mats, and exercise equipment under a wooden pergola",
  },
];

function Discover() {
  useReveal();
  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  return (
    <main className="bg-background text-foreground">
      <SiteNav />

      <section className="relative h-[80vh] min-h-[500px] w-full overflow-hidden">
        <img
          src={media.discoverHero}
          alt="Two turquoise Adirondack chairs facing the calm Florida Keys ocean at The Sovereign Cove"
          className="absolute inset-0 h-full w-full object-cover brightness-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
        <div className="relative z-10 flex h-full items-center justify-center px-6 pt-16">
          <h1 className="font-serif text-white text-6xl md:text-8xl lg:text-9xl tracking-[0.02em] text-center drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
            Discover
          </h1>
        </div>
      </section>

      <section className="relative pt-20 pb-20 md:pt-28 md:pb-28 px-6 bg-background">
        <div className="mx-auto max-w-4xl text-center">
          <p className="reveal-up delay-400 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed text-muted-foreground">
            The Sovereign Cove is held in reserve — for guests known, considered, and welcomed by name. Luxury that feels
            inherited, security that goes unseen, service that arrives before the thought.
          </p>
        </div>
      </section>

      <section className="px-6 pb-32">
        <div className="mx-auto max-w-[1400px] space-y-32 md:space-y-48">
          {pillars.map((p, i) => {
            const reverse = i % 2 === 1;
            return (
              <article
                key={p.kicker}
                className={`grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center ${reverse ? "md:[direction:rtl]" : ""}`}
              >
                <div className={`md:col-span-7 in-view ${reverse ? "md:[direction:ltr]" : ""}`}>
                  <div className="relative overflow-hidden group">
                    <img
                      src={p.image}
                      alt={p.alt}
                      loading="lazy"
                      className="w-full h-[60vh] md:h-[78vh] object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent pointer-events-none" />
                  </div>
                </div>
                <div
                  className={`md:col-span-5 in-view ${reverse ? "md:[direction:ltr]" : ""}`}
                  style={{ transitionDelay: "200ms" }}
                >
                  <h2 className="font-serif text-3xl md:text-5xl leading-[1.15] text-deep mb-8">{p.title}</h2>
                  <div className="h-px w-16 bg-primary/40 mb-8" />
                  <p className="text-base md:text-lg font-light leading-[1.85] text-muted-foreground">{p.body}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-t border-border/60 px-6 py-32 text-center">
        <p className="in-view text-[11px] tracking-[0.45em] uppercase text-muted-foreground mb-8">
          — The Sovereign Cove —
        </p>
        <p
          className="in-view font-serif text-2xl md:text-4xl italic leading-[1.4] max-w-3xl mx-auto text-deep"
          style={{ transitionDelay: "120ms" }}
        >
          "Excellence is not an act. It is a habit — woven into every sunrise, every silence, every stay."
        </p>
      </section>

      <SiteFooter />
    </main>
  );
}
