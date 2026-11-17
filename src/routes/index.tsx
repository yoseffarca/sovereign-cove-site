import { useEffect, useRef, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";
import { useReveal } from "../hooks/use-reveal";
import { media } from "../lib/media";
import { headFor } from "../lib/seo";
import { gatherings, mitzvahs, weddings, type Occasion } from "../content/events";

export const Route = createFileRoute("/")({
  head: headFor("/"),
  component: Home,
});

const layers: { side: "left" | "right"; title: string; occasion: Occasion; copy: typeof weddings }[] = [
  { side: "left", title: "Weddings", occasion: "Wedding", copy: weddings },
  { side: "right", title: "Bar & Bat Mitzvahs", occasion: "Bar or Bat Mitzvah", copy: mitzvahs },
  { side: "left", title: "Private Gatherings", occasion: "Corporate or private gathering", copy: gatherings },
];

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
          <p className="kicker">Tavernier · Florida Keys</p>
          <h1>The Sovereign Cove</h1>
          <p className="tag">A private estate for one celebration at a time.</p>
          <Link to="/availability" className="btn light cta">
            Check Availability
          </Link>
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
          <p className="kicker in-view">— One Occasion, Entirely Yours —</p>
          <h2 className="in-view">
            Fifteen private acres on the water in the Florida Keys, given over entirely to your family and your guests.
          </h2>
          <p className="sub in-view">
            Weddings, Bar and Bat Mitzvahs, and milestone celebrations. Never shared, never repeated.
          </p>
          <div className="cta in-view">
            <Link to="/events" className="text-link">
              <span className="nav-link">Explore Events</span>
            </Link>
          </div>
        </div>
      </section>

      <section>
        {layers.map((l) => (
          <div key={l.title} className={`layer ${l.side}`}>
            <img src={l.copy.image} alt={l.copy.alt} />
            <div className="shade" />
            <div className="panel">
              <h3>{l.title}</h3>
              <div className="rule" />
              <p className="lead">{l.copy.lead}</p>
              <p className="body">{l.copy.body}</p>
              <Link to="/availability" search={{ occasion: l.occasion }} className="text-link">
                <span className="nav-link">Check Availability</span>
              </Link>
            </div>
          </div>
        ))}
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

      <section className="closing">
        <img src={media.heroBeach} alt="The beach at The Sovereign Cove" loading="lazy" />
        <div className="shade" />
        <div className="wrap">
          <p className="kicker in-view">— The Estate —</p>
          <h2 className="in-view">Seventeen minutes from Miami. A world away on arrival.</h2>
          <Link to="/estate" className="btn light in-view">
            Discover the Estate
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
