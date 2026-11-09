import { useEffect, useRef, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";
import { useReveal } from "../hooks/use-reveal";
import { media } from "../lib/media";
import { headFor } from "../lib/seo";

export const Route = createFileRoute("/")({
  head: headFor("/"),
  component: Home,
});

function Home() {
  useReveal();
  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    const next = !v.muted;
    v.muted = next;
    if (!next) v.play().catch(() => {});
    setMuted(next);
  };

  return (
    <main className="bg-background text-foreground">
      <SiteNav />

      <section className="relative h-[100svh] w-full overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover brightness-125"
        >
          <source src={media.homeVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 flex h-full flex-col items-center justify-end pb-24 md:pb-32 px-6 text-center text-white">
          <p className="reveal-fade delay-400 text-[11px] tracking-[0.5em] uppercase mb-6 opacity-90">
            Tavernier · Florida Keys
          </p>
          <h1 className="reveal-up delay-600 font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.05] max-w-4xl mt-8">
            The Sovereign Cove
          </h1>
          <div className="reveal-fade delay-1000 absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.4em] uppercase opacity-70">
            <span className="block h-6 md:h-10 w-px bg-white/60 mx-auto mb-3 animate-pulse" />
            Scroll
          </div>
        </div>

        <button
          onClick={toggleMute}
          className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-black/30 text-white/90 hover:bg-black/50 hover:text-white transition-colors backdrop-blur-sm"
          aria-label={muted ? "Unmute" : "Mute"}
          type="button"
        >
          {muted ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          )}
        </button>
      </section>

      <section className="relative px-6 py-32 md:py-48">
        <div className="mx-auto max-w-3xl text-center">
          <p className="in-view text-[11px] tracking-[0.45em] uppercase text-muted-foreground mb-10">
            — An Invitation —
          </p>
          <h2
            className="in-view font-serif text-3xl md:text-5xl leading-[1.35] text-deep"
            style={{ transitionDelay: "120ms" }}
          >
            A private beachfront sanctuary in the Florida Keys, reserved for the discerning few.
          </h2>
          <p
            className="in-view mt-10 text-lg md:text-xl font-light leading-relaxed text-muted-foreground"
            style={{ transitionDelay: "240ms" }}
          >
            Access is extended quietly, never offered openly.
          </p>
          <Link
            to="/about"
            className="in-view mt-16 inline-flex items-center gap-3 text-[11px] tracking-[0.4em] uppercase text-primary cursor-pointer group"
            style={{ transitionDelay: "360ms" }}
          >
            <span className="nav-link">Request Access</span>
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
