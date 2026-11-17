import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";
import { media } from "../lib/media";
import { headFor } from "../lib/seo";
import { occasions } from "../content/events";
import { sendAvailabilityRequest, type AvailabilityRequest } from "../lib/availability";
import { ADDRESS, CONCIERGE_EMAIL as EMAIL } from "../content/site";


export const Route = createFileRoute("/availability")({
  head: headFor("/availability"),
  validateSearch: (search: Record<string, unknown>): { occasion?: string } => {
    const o = search.occasion;
    return typeof o === "string" && (occasions as readonly string[]).includes(o) ? { occasion: o } : {};
  },
  component: Availability,
});

type Status = "idle" | "sending" | "sent" | "failed";
const required: (keyof AvailabilityRequest)[] = ["name", "email", "occasion", "dates"];

function Availability() {
  const { occasion } = Route.useSearch();
  const [v, setV] = useState<AvailabilityRequest>({
    name: "",
    email: "",
    phone: "",
    occasion: occasion ?? "",
    dates: "",
    guests: "",
    planner: "",
    notes: "",
  });
  const [bad, setBad] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>("idle");

  const set = (k: keyof AvailabilityRequest) => (e: { target: { value: string } }) =>
    setV((cur) => ({ ...cur, [k]: e.target.value }));
  const cls = (k: string) => (bad.includes(k) ? "bad" : undefined);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    const missing = required.filter((k) => !v[k].trim());
    if (v.email.trim() && !/^\S+@\S+\.\S+$/.test(v.email.trim())) missing.push("email");
    setBad(missing);
    if (missing.length) {
      document.getElementById(missing[0])?.focus();
      return;
    }
    setStatus("sending");
    try {
      await sendAvailabilityRequest(v);
      setStatus("sent");
      window.scrollTo(0, 0);
    } catch {
      setStatus("failed");
    }
  };

  return (
    <main className="bg-background text-foreground">
      <SiteNav />

      <section className="avail">
        <img src={media.queriesFiller} alt="Tranquil cove detail at The Sovereign Cove" />
        <div className="shade" />
        <div className="wrap">
          {status === "sent" ? (
            <div className="sent">
              <h2>Thank you.</h2>
              <p>Your request has been received. A member of our team will reply personally.</p>
            </div>
          ) : (
            <>
              <div className="head">
                <p className="kicker">— Your Date —</p>
                <h1>Check Availability</h1>
                <p className="intro">
                  We host a limited number of celebrations each year. Share your date and our team will reply personally.
                </p>
              </div>

              <form onSubmit={submit} noValidate>
                <div className="field">
                  <label htmlFor="name">Name</label>
                  <input id="name" className={cls("name")} value={v.name} onChange={set("name")} autoComplete="name" />
                </div>
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input id="email" type="email" className={cls("email")} value={v.email} onChange={set("email")} autoComplete="email" />
                </div>
                <div className="field">
                  <label htmlFor="phone">Telephone</label>
                  <input id="phone" type="tel" value={v.phone} onChange={set("phone")} autoComplete="tel" />
                </div>
                <div className="field">
                  <label htmlFor="occasion">Occasion</label>
                  <select id="occasion" className={cls("occasion")} value={v.occasion} onChange={set("occasion")}>
                    <option value="">Select</option>
                    {occasions.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="dates">Preferred date or dates</label>
                  <input id="dates" className={cls("dates")} value={v.dates} onChange={set("dates")} placeholder="A date, a month, or a season" />
                </div>
                <div className="field">
                  <label htmlFor="guests">Estimated guests</label>
                  <input id="guests" type="number" min={1} inputMode="numeric" value={v.guests} onChange={set("guests")} />
                </div>
                <div className="field wide">
                  <label htmlFor="planner">Planner or representative (optional)</label>
                  <input id="planner" value={v.planner} onChange={set("planner")} />
                </div>
                <div className="field wide">
                  <label htmlFor="notes">Tell us about your occasion</label>
                  <textarea id="notes" value={v.notes} onChange={set("notes")} />
                </div>
                {status === "failed" && (
                  <p className="error" role="alert">
                    We could not send your request just now. Please try again, or contact the concierge at{" "}
                    <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
                  </p>
                )}
                <div className="submit">
                  <button type="submit" className="btn light" disabled={status === "sending"}>
                    {status === "sending" ? "Sending" : "Check Availability"}
                  </button>
                </div>
                <p className="or">
                  Or contact the concierge at
                  <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                  <span className="addr">{ADDRESS}, USA</span>
                </p>
              </form>
            </>
          )}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
