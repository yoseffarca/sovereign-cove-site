import { useEffect, useRef, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";
import { useReveal } from "../hooks/use-reveal";
import { media } from "../lib/media";
import { headFor } from "../lib/seo";
import { gatherings, mitzvahs, weddings } from "../content/events";
import { approach, arrival, cigarBar, gardenDinner, houses, onTheWater } from "../content/brochure";
import { FirepitClosing } from "../components/Blocks";

export const Route = createFileRoute("/")({
  head: headFor("/"),
  component: Home,
});

// Event types lead the page. Their full copy lives on the Events page.
const layers = [
  { side: "left", title: "Weddings", line: "The entire estate, yours alone.", copy: weddings },
  { side: "right", title: "Bar & Bat Mitzvahs", line: mitzvahs.lead, copy: mitzvahs },
  { side: "left", title: "Private Gatherings", line: gatherings.lead, copy: gatherings },
] as const;

// The Cove card uses the tall photo of the same scene, so the whole cove,
// the three jet skis and the wing fit the upright frame without being cut.
const coveCard = { ...onTheWater, image: approach.image, alt: approach.alt };
const chapters = [arrival, gardenDinner, coveCard, houses, cigarBar];

function Home() {
  useReveal();
  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  const videoRef = useRef<HTMLVideoElement>(null);
  const userMuted = useRef(false);
  const [muted, setMuted] = useState(true);

  // Sound is on by default. Browsers refuse sound before a visitor's first
  // click, tap or key press, so the video starts silent if refused and the
  // sound comes on at that first interaction, unless they muted it themselves.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.play()
      .then(() => setMuted(false))
      .catch(() => {
        v.muted = true;
        setMuted(true);
        v.play().catch(() => {});
      });

    const firstTouch = (e: Event) => {
      off();
      if (e.target instanceof Element && e.target.closest(".mute")) return;
      if (!userMuted.current && v.muted) {
        v.muted = false;
        setMuted(false);
      }
    };
    const off = () => {
      document.removeEventListener("pointerdown", firstTouch, true);
      document.removeEventListener("keydown", firstTouch, true);
    };
    document.addEventListener("pointerdown", firstTouch, true);
    document.addEventListener("keydown", firstTouch, true);
    return off;
  }, []);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    userMuted.current = v.muted;
    setMuted(v.muted);
    if (!v.muted) v.play().catch(() => {});
  };

  return (
    <main className="bg-background text-foreground">
      <SiteNav />

      <section className="hero full">
        <video ref={videoRef} autoPlay muted loop playsInline poster={media.heroBeach}>
          <source src={media.homeVideo} type="video/mp4" />
        </video>
        <div className="shade" />
        <div className="inner">
          <p className="kicker">Weddings · Bar &amp; Bat Mitzvahs · Private Events</p>
          <h1>The Sovereign Cove</h1>
          <p className="tag">A private estate in the Upper Florida Keys, yours for the duration of the event.</p>
          <div className="cta ctas">
            <Link to="/events" className="btn light">
              Explore Events
            </Link>
            <Link to="/availability" className="btn light">
              Check Availability
            </Link>
          </div>
        </div>
        <button type="button" className="mute" onClick={toggleMute} aria-label={muted ? "Unmute video" : "Mute video"}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            {muted ? (
              <>
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </>
            ) : (
              <>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </>
            )}
          </svg>
        </button>
      </section>

      <section className="statement">
        <div className="wrap">
          <p className="kicker in-view">— Events —</p>
          <h2 className="in-view">One family. One occasion. The entire estate.</h2>
          <p className="sub in-view">
            Weddings, Bar and Bat Mitzvahs, milestone celebrations, and private gatherings in the Upper Florida Keys.
          </p>
        </div>
      </section>

      <section>
        {layers.map((l) => (
          <div key={l.title} className={`layer ${l.side}`}>
            <img src={l.copy.image} alt={l.copy.alt} />
            <div className="shade" />
            <div className="panel">
              <p className="kicker">Events</p>
              <h3>{l.title}</h3>
              <div className="rule" />
              <p className="lead">{l.line}</p>
              <Link to="/events" className="text-link">
                <span className="nav-link">Explore</span>
              </Link>
            </div>
          </div>
        ))}
      </section>

      <section className="statement cover">
        <div className="wrap">
          <p className="kicker in-view">— The Estate —</p>
          <h2 className="in-view">A cove of your own.</h2>
          <p className="sub in-view">
            From the first arrival to the last guest, the whole of the estate is given to your event.
          </p>
        </div>
      </section>

      <section className="chapters-wrap">
        <div className="chapters">
          {chapters.map((c) => (
            <Link key={c.title} to="/estate" className="chapter in-view">
              <div className="pic">
                <img src={c.image} alt={c.alt} loading="lazy" />
              </div>
              <p className="kicker">{c.kicker}</p>
              <h3>{c.title}</h3>
              <p className="line">{c.line}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="facts">
        <div className="row">
          <div className="in-view">
            <b>15</b>
            <span>Private acres</span>
          </div>
          <div className="in-view">
            <b>2</b>
            <span>Private beaches</span>
          </div>
          <div className="in-view">
            <b>17</b>
            <span>
              Minutes from Miami
              <br />
              by helicopter
            </span>
          </div>
          <div className="in-view">
            <b>1</b>
            <span>
              Celebration
              <br />
              at a time
            </span>
          </div>
        </div>
      </section>

      <FirepitClosing />

      <SiteFooter />
    </main>
  );
}
