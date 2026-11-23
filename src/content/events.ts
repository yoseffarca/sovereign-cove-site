// Copy for the event types, shared by the Home and Events pages.
export const occasions = [
  "Wedding",
  "Bar or Bat Mitzvah",
  "Milestone celebration",
  "Corporate or private gathering",
] as const;

export type Occasion = (typeof occasions)[number];

export const weddings = {
  lead: "A ceremony composed quietly on the shore — the estate given over, in full, to a single celebration.",
  body: "From arrival to farewell, our residence and grounds are reserved exclusively for your party. Every ceremony is arranged in close consultation with our concierge, tailored to the couple, and attended by a discreet team who prepare the estate as though it were your own.",
  image: "/images/events-weddings-2.jpg",
  alt: "Flower-covered wedding arch on the beach at sunset beside a candlelit table beneath palms",
};

export const mitzvahs = {
  lead: "A milestone your family will speak of for generations.",
  body: "A weekend composed around one child and the people who love them: the ceremony by the water, the celebration under the palms, and the days between spent on the beaches and the open sea.",
  image: "/images/events-family-2.jpg",
  alt: "Long candlelit dinner table on the beach at dusk beneath palms and string lights",
};

export const gatherings = {
  lead: "Held in full for a single party.",
  body: "For leadership retreats and private convenings. Arrive by helicopter from Miami in seventeen minutes, meet in the gardens and pavilions, and close the day on the water. Our resident staff manage catering, logistics, and hospitality throughout.",
  image: "/images/events-corporate.jpg",
  alt: "Open-air oceanfront pavilion arranged for a private gathering at dusk",
};
