import { createFileRoute } from "@tanstack/react-router";
import { EventPage } from "../components/EventPage";
import { headFor } from "../lib/seo";
const image = "/images/events-corporate.jpg";

export const Route = createFileRoute("/events/corporate")({
  head: headFor("/events/corporate"),
  component: Corporate,
});

function Corporate() {
  return (
    <EventPage
      kicker="Corporate Events"
      title="Corporate Gatherings"
      heroTagline="An estate held in reserve for private convenings and executive retreats."
      overview="From corporate retreats to Bar and Bat Mitzvahs, Sovereign Cove is a world apart from the usual venue. A private helipad, open water, ICON-5, and a captain — 17 minutes from Miami by air, and a million miles from ordinary."
      image={image}
      imageAlt="Open-air oceanfront pavilion arranged for a private corporate gathering at dusk"
    />
  );
}
