// Words and pictures from the Sovereign Cove events brochure.
export type Block = { kicker: string; title: string; line: string; image: string; alt: string };

// "?v" changes whenever the photo files are re-exported, so browsers fetch the new ones.
const img = (name: string) => `/images/b-${name}.jpg?v=2`;

export const cove: Block = {
  kicker: "The Estate",
  title: "A cove of your own",
  line: "A private estate in the Upper Florida Keys, yours for the duration of the event.",
  image: img("cove"),
  alt: "Crescent of white sand and turquoise water framed by trees, with thatched cabanas along the shore",
};
export const arrival: Block = {
  kicker: "Arrival",
  title: "Seventeen minutes from Miami",
  line: "By helicopter from Miami International to the estate’s own landing pad, or by boat, seaplane, or car.",
  image: img("helipad"),
  alt: "Private helicopter beneath the arrival portico, with the water beyond",
};
export const landingNight: Block = {
  kicker: "Arrival",
  title: "Lit for late arrivals",
  line: "The landing pad after dark.",
  image: img("landing-night"),
  alt: "Landing pad on the dock, lit at dusk",
};
export const seaplane: Block = {
  kicker: "Arrival",
  title: "Or by seaplane",
  line: "Straight onto the water, steps from the dock.",
  image: img("seaplane"),
  alt: "Seaplane resting on calm water",
};
export const approach: Block = {
  kicker: "Arrival",
  title: "On approach",
  line: "The cove, seen from the air on the way in.",
  image: img("approach"),
  alt: "The cove from the air, with three jet skis crossing the water",
};
export const gardenDinner: Block = {
  kicker: "The Gardens",
  title: "Dinner in the gardens",
  line: "Seated dinners beneath the canopy, with the water in view.",
  image: img("garden-dinner"),
  alt: "Round tables set for dinner on the lawn beneath the trees, with the water in view",
};
export const gardenPaths: Block = {
  kicker: "The Gardens",
  title: "Along the paths",
  line: "Receptions that move through the botanical gardens.",
  image: img("garden-paths"),
  alt: "Dinner tables set beside a winding garden path",
};
export const oldTrees: Block = {
  kicker: "The Gardens",
  title: "Under the old trees",
  line: "Long tables or round, for a dozen guests or a few hundred.",
  image: img("old-trees"),
  alt: "Many round tables set beneath old trees on the lawn",
};
export const outOnTheWater: Block = {
  kicker: "The Cove",
  title: "Out on the water",
  line: "Jet skis, paddleboards, and tenders for your guests.",
  image: img("jetski"),
  alt: "Jet ski at the edge of the beach in the cove",
};
export const onTheWater: Block = {
  kicker: "The Cove",
  title: "On the water",
  line: "Tenders, jet skis, and seaplanes in a cove kept for your guests.",
  image: img("on-the-water"),
  alt: "Three jet skis crossing the turquoise cove, seen from the air",
};
export const houses: Block = {
  kicker: "The Houses",
  title: "Two houses on the water",
  line: "For the guests who stay.",
  image: img("houses"),
  alt: "Two white houses on the shoreline among palms",
};
export const boathouse: Block = {
  kicker: "The Boathouse",
  title: "Rooms that open onto the dock",
  line: "Living and dining rooms with the water on three sides.",
  image: img("boathouse"),
  alt: "Living and dining rooms opening onto the dock and the water",
};
export const privateDining: Block = {
  kicker: "The Guest House",
  title: "Private dining",
  line: "For a board dinner or a family table.",
  image: img("private-dining"),
  alt: "Dining room and kitchen looking out to the lawn and pool",
};
export const suite: Block = {
  kicker: "The Guest House",
  title: "Stay the night",
  line: "Guest suites in the boathouse and guest house.",
  image: img("suite"),
  alt: "Guest suite with glass doors opening to the sea",
};
export const falls: Block = {
  kicker: "The Guest House",
  title: "A shower under the falls",
  line: "Stone, water, and the gardens outside.",
  image: img("falls"),
  alt: "Stone waterfall shower with the gardens beyond",
};
export const cigarBar: Block = {
  kicker: "Evening",
  title: "After dinner",
  line: "The cigar bar, open as late as the evening runs.",
  image: img("cigar-bar"),
  alt: "Open-air cigar bar beneath a timber pergola in the evening",
};
export const firepit = {
  title: "Until the last guest leaves.",
  image: img("firepit"),
  alt: "Fire pit ringed by wooden chairs on the lawn at night",
};
