import { createFileRoute } from "@tanstack/react-router";
import { EventPage } from "../components/EventPage";
import { headFor } from "../lib/seo";
const image = "/images/events-weddings.jpg";

export const Route = createFileRoute("/events/weddings")({
  head: headFor("/events/weddings"),
  component: Weddings,
});

function Weddings() {
  return (
    <EventPage
      kicker="Weddings"
      title="Weddings at The Sovereign Cove"
      heroTagline="A private estate, held for one family, one occasion."
      overview="A ceremony composed quietly on the shore — the estate given over, in full, to a single celebration."
      detail="From arrival to farewell, our residence and grounds are reserved exclusively for your party. Every ceremony is arranged in close consultation with our concierge, tailored to the couple, and attended by a discreet team who prepare the estate as though it were your own."
      image={image}
      imageAlt="Candlelit oceanfront wedding reception at dusk beneath palms at The Sovereign Cove"
    />
  );
}
