import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";
import { useReveal } from "../hooks/use-reveal";
import { media } from "../lib/media";
import { headFor } from "../lib/seo";
import { Feature, FirepitClosing, Pair, Split, Wide } from "../components/Blocks";
import * as b from "../content/brochure";

export const Route = createFileRoute("/estate")({
  head: headFor("/estate"),
  component: Estate,
});

// Wording carried over word for word from the original Discover page.
const pillars = [
  {
    title: "Luxury",
    body: "Infinity pools that meet the horizon, a private helipad reserved for arrivals, and expansive outdoor pavilions held in trust for our guests alone — every surface composed for those who expect nothing less.",
    image: media.discoverLuxury,
    alt: "Tropical grotto with cascading waterfall, lush ferns, and a koi pond beneath a stone archway",
  },
  {
    title: "Security",
    body: "The estate is held behind quiet, considered protections — a controlled approach, discreet surveillance, and a perimeter watched without intrusion. Privacy here is absolute, and never spoken of.",
    image: media.discoverSecurity,
    alt: "Tranquil private beach with turquoise water, palm trees, and lounge chairs overlooking a distant island",
  },
  {
    title: "Service",
    body: "A resident concierge is kept on hand at every hour, attending only to your party. From the resident chef to private passages arranged on a moment's notice, each request is met before it is voiced.",
    image: media.discoverService,
    alt: "Lush garden pavilion with outdoor wellness setup, yoga mats, and exercise equipment under a wooden pergola",
  },
];

// Site photos that are not part of the brochure sequence.
const gallery = [
  { image: media.aboutLocation, alt: "Oceanfront putting green framed by palms overlooking the turquoise sea at The Sovereign Cove" },
  { image: media.aboutExclusivity, alt: "Private helicopter arriving at The Sovereign Cove's beachfront estate" },
  { image: media.discoverHero, alt: "Two turquoise Adirondack chairs facing the calm Florida Keys ocean" },
  { image: media.aboutExperience, alt: "Aerial view of the turquoise cove and surrounding mangroves from above" },
];

function Estate() {
  useReveal();
  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  return (
    <main className="bg-background text-foreground">
      <SiteNav />

      <section className="hero tall">
        <img src={b.aerial.image} alt={b.aerial.alt} />
        <div className="shade" />
        <div className="inner">
          <h1>The Estate</h1>
        </div>
      </section>

      <section className="statement flush">
        <div className="wrap">
          <p className="sub first in-view">
            The Sovereign Cove is held in reserve — for guests known, considered, and welcomed by name. Luxury that feels
            inherited, security that goes unseen, service that arrives before the thought.
          </p>
        </div>
      </section>

      <section className="splits">
        {pillars.map((p, i) => (
          <article key={p.title} className={`split ${i % 2 === 1 ? "rev" : ""}`}>
            <div className="pic in-view">
              <img src={p.image} alt={p.alt} loading="lazy" />
            </div>
            <div className="copy in-view">
              <h2>{p.title}</h2>
              <div className="rule" />
              <p>{p.body}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="quote">
        <p className="kicker in-view">— The Sovereign Cove —</p>
        <p className="q in-view">
          "Excellence is not an act. It is a habit — woven into every sunrise, every silence, every stay."
        </p>
      </section>

      <div className="story">
        <Feature block={b.cove} />
        <Split block={b.arrival} />
        <Split block={b.landingNight} reverse />
        <Pair blocks={[b.seaplane, b.approach]} />
        <Feature block={b.gardenDinner} />
        <Split block={b.gardenPaths} />
        <Feature block={b.oldTrees} />
        <Split block={b.outOnTheWater} reverse />
        <Feature block={b.onTheWater} />
        <Split block={b.houses} />
        <Wide block={b.boathouse} />
        <Wide block={b.privateDining} />
        <Wide block={b.suite} />
        <Split block={b.falls} reverse />
        <Split block={b.cigarBar} />
      </div>

      <section className="gallery">
        {gallery.map((g) => (
          <div key={g.image} className="in-view">
            <img src={g.image} alt={g.alt} loading="lazy" />
          </div>
        ))}
      </section>

      <FirepitClosing />

      <SiteFooter />
    </main>
  );
}
