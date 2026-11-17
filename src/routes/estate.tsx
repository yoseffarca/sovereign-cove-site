import { useEffect } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";
import { useReveal } from "../hooks/use-reveal";
import { media } from "../lib/media";
import { headFor } from "../lib/seo";

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

const gallery = [
  { image: media.aboutHero, alt: "Private helicopter resting on the helipad with the turquoise waters of the Florida Keys beyond" },
  { image: media.aboutLocation, alt: "Oceanfront putting green framed by palms overlooking the turquoise sea at The Sovereign Cove" },
  { image: media.aboutExperience, alt: "Aerial view of the turquoise cove and surrounding mangroves from above" },
  { image: media.aboutExclusivity, alt: "Private helicopter arriving at The Sovereign Cove's beachfront estate" },
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
        <img
          src={media.discoverHero}
          alt="Two turquoise Adirondack chairs facing the calm Florida Keys ocean at The Sovereign Cove"
          className="brightness-125"
        />
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

      <section className="gallery">
        {gallery.map((g) => (
          <div key={g.image} className="in-view">
            <img src={g.image} alt={g.alt} loading="lazy" />
          </div>
        ))}
      </section>

      <section className="closing plain">
        <div className="wrap">
          <Link to="/availability" className="btn solid in-view">
            Check Availability
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
