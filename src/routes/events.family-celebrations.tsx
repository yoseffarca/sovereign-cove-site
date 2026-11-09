import { createFileRoute } from "@tanstack/react-router";
import { EventPage } from "../components/EventPage";
import { headFor } from "../lib/seo";
const image = "/images/events-family.jpg";

export const Route = createFileRoute("/events/family-celebrations")({
  head: headFor("/events/family-celebrations"),
  component: FamilyCelebrations,
});

function FamilyCelebrations() {
  return (
    <EventPage
      kicker="Family Celebrations"
      title="Family Celebrations"
      heroTagline="Bar and Bat Mitzvahs, anniversaries, and milestones — observed in confidence."
      overview="From corporate retreats to Bar and Bat Mitzvahs, Sovereign Cove is a world apart from the usual venue. A private helipad, open water, ICON-5, and a captain — 17 minutes from Miami by air, and a million miles from ordinary."
      image={image}
      imageAlt="Long candlelit family dinner table beneath palms at sunset by the ocean"
    />
  );
}
