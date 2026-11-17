import { useEffect } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";
import { useReveal } from "../hooks/use-reveal";
import { headFor } from "../lib/seo";
import { gatherings, mitzvahs, weddings, type Occasion } from "../content/events";
import { Concierge, Feature, Wide } from "../components/Blocks";
import { gardenDinner, oldTrees, privateDining, suite } from "../content/brochure";

export const Route = createFileRoute("/events")({
  head: headFor("/events"),
  component: Events,
});

function Check({ occasion }: { occasion: Occasion }) {
  return (
    <div className="cta">
      <Link to="/availability" search={{ occasion }} className="text-link">
        <span className="nav-link">Check Availability</span>
      </Link>
    </div>
  );
}

function Events() {
  useReveal();
  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  return (
    <main className="bg-background text-foreground">
      <SiteNav />

      <section className="hero tall">
        <img src={oldTrees.image} alt={oldTrees.alt} />
        <div className="shade" />
        <div className="inner">
          <p className="kicker">Events</p>
          <h1>Celebrations at The Sovereign Cove</h1>
          <p className="tag">One family. One occasion. The entire estate.</p>
        </div>
      </section>

      <section className="statement flush">
        <div className="wrap">
          <p className="kicker in-view">— An Occasion Considered —</p>
          <h2 className="in-view">Fifteen private acres on the water, given over to a single celebration or gathering.</h2>
          <p className="sub in-view">No second event is ever on the calendar, and nothing about the estate is shared.</p>
        </div>
      </section>

      <section className="splits">
        <article className="split">
          <div className="pic in-view">
            <img src={weddings.image} alt={weddings.alt} loading="lazy" />
          </div>
          <div className="copy in-view">
            <p className="kicker">Weddings</p>
            <h2>The entire estate, yours alone.</h2>
            <div className="rule" />
            <p>{weddings.lead}</p>
            <p>{weddings.body}</p>
            <Check occasion="Wedding" />
          </div>
        </article>
        <article className="split rev">
          <div className="pic in-view">
            <img src={mitzvahs.image} alt={mitzvahs.alt} loading="lazy" />
          </div>
          <div className="copy in-view">
            <p className="kicker">Bar &amp; Bat Mitzvahs</p>
            <h2>{mitzvahs.lead}</h2>
            <div className="rule" />
            <p>{mitzvahs.body}</p>
            <Check occasion="Bar or Bat Mitzvah" />
          </div>
        </article>
      </section>

      <Feature block={gardenDinner} title={oldTrees.line} line={gardenDinner.line} />

      <section className="band">
        <div className="wrap">
          <p className="kicker in-view">Milestone Celebrations</p>
          <h2 className="in-view">Privately, completely, and one at a time.</h2>
          <p className="text in-view">
            Anniversaries, significant birthdays, and family gatherings are hosted on the same terms as every celebration
            here.
          </p>
        </div>
      </section>

      <section className="splits">
        <article className="split">
          <div className="pic in-view">
            <img src={gatherings.image} alt={gatherings.alt} loading="lazy" />
          </div>
          <div className="copy in-view">
            <p className="kicker">Corporate &amp; Private Gatherings</p>
            <h2>{gatherings.lead}</h2>
            <div className="rule" />
            <p>{gatherings.body}</p>
            <Check occasion="Corporate or private gathering" />
          </div>
        </article>
      </section>

      <div className="story tight">
        <Wide block={privateDining} />
        <Wide block={suite} kicker="The Houses" />
      </div>

      <section className="closing plain">
        <div className="wrap">
          <p className="kicker in-view">— Your Date —</p>
          <h2 className="in-view">We host a limited number of celebrations each year.</h2>
          <Link to="/availability" className="btn solid in-view">
            Check Availability
          </Link>
          <Concierge />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
