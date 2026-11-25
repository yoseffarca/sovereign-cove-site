import { Link } from "@tanstack/react-router";
import type { Block } from "../content/brochure";
import { firepit } from "../content/brochure";
import { CONCIERGE_EMAIL } from "../content/site";

/** Full-bleed photo with its words set over the lower left. */
export function Feature({ block, title, line }: { block: Block; title?: string; line?: string }) {
  return (
    <section className="feature">
      <img src={block.image} alt={block.alt} loading="lazy" />
      <div className="shade" />
      <div className="txt in-view">
        <p className="kicker">{block.kicker}</p>
        <h2>{title ?? block.title}</h2>
        <p className="line">{line ?? block.line}</p>
      </div>
    </section>
  );
}

/** Photo beside its words, in the proportions of the original Discover page. */
export function Split({ block, reverse }: { block: Block; reverse?: boolean }) {
  return (
    <section className="splits">
      <article className={`split natural ${reverse ? "rev" : ""}`}>
        <div className="pic in-view">
          <img src={block.image} alt={block.alt} loading="lazy" />
        </div>
        <div className="copy in-view">
          <p className="kicker">{block.kicker}</p>
          <h2>{block.title}</h2>
          <div className="rule" />
          <p>{block.line}</p>
        </div>
      </article>
    </section>
  );
}

/** Wide photo with a caption row beneath. */
export function Wide({ block, kicker }: { block: Block; kicker?: string }) {
  return (
    <figure className="wide in-view">
      <div className="pic">
        <img src={block.image} alt={block.alt} loading="lazy" />
      </div>
      <figcaption>
        <div>
          <p className="kicker">{kicker ?? block.kicker}</p>
          <h3>{block.title}</h3>
        </div>
        <p className="line">{block.line}</p>
      </figcaption>
    </figure>
  );
}

/** Two portrait photos side by side. */
export function Pair({ blocks }: { blocks: [Block, Block] }) {
  return (
    <section className="pair">
      {blocks.map((b) => (
        <figure key={b.title} className="in-view">
          <div className="pic">
            <img src={b.image} alt={b.alt} loading="lazy" />
          </div>
          <figcaption>
            <p className="kicker">{b.kicker}</p>
            <h3>{b.title}</h3>
            <p className="line">{b.line}</p>
          </figcaption>
        </figure>
      ))}
    </section>
  );
}

export function Concierge() {
  return (
    <p className="concierge in-view">
      Or contact the concierge at <a href={`mailto:${CONCIERGE_EMAIL}`}>{CONCIERGE_EMAIL}</a>
    </p>
  );
}

/** The fire-pit close shared by Home and The Estate. */
export function FirepitClosing() {
  return (
    <section className="closing">
      <img src={firepit.image} alt={firepit.alt} loading="lazy" />
      <div className="shade" />
      <div className="wrap">
        <h2 className="in-view">{firepit.title}</h2>
        <Link to="/availability" className="btn light in-view">
          Check Availability
        </Link>
        <Concierge />
      </div>
    </section>
  );
}
