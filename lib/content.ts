export const site = {
  // Replace with your own name, or the name of your studio.
  name: "Your Name",
  // Replace with the address clients should write to.
  email: "hello@yourname.com",
  location: "Copenhagen, Denmark",
  availability: "Working across Northern Europe and beyond",
  // Replace with your own handle, or delete the link in the contact section.
  instagram: "@yourname",
  disciplines: "Portrait · Landscape · Documentary",
}

export type NavItem = {
  label: string
  href: string
  /** Dropped from the header on narrow screens, where four links do not fit. */
  hideOnMobile?: boolean
}

export const navigation: NavItem[] = [
  { label: "Introduction", href: "#introduction", hideOnMobile: true },
  { label: "Work", href: "#work" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
]

export type Photo = {
  id: string
  /** Placeholder source. Swap for `/photos/<your-file>.jpg` and drop the file in /public. */
  src: string
  /** Describe the photograph itself once you replace it. */
  alt: string
  title: string
  meta: string
}

const frame = (seed: string) => `https://picsum.photos/seed/${seed}/1200/1500`

export const hero = {
  src: "https://picsum.photos/seed/harbour-at-dawn/2400/1350",
  alt: "A wide, empty shoreline at first light, the water almost still.",
  caption: "Harbour at dawn — Lofoten, 2024",
}

export const photos: Photo[] = [
  {
    id: "still-water",
    src: frame("still-water"),
    alt: "Reflections on a windless lake at dusk.",
    title: "Still Water",
    meta: "Lofoten, 2024",
  },
  {
    id: "mira",
    src: frame("mira-portrait"),
    alt: "A portrait of a woman standing in soft window light.",
    title: "Mira",
    meta: "Portrait, 2023",
  },
  {
    id: "the-long-field",
    src: frame("the-long-field"),
    alt: "A wide field of dry grass under a low, clouded sky.",
    title: "The Long Field",
    meta: "Jutland, 2024",
  },
  {
    id: "kitchen-table",
    src: frame("kitchen-table-sunday"),
    alt: "Hands resting on a kitchen table beside a half-empty cup.",
    title: "Kitchen Table",
    meta: "Sunday, 2023",
  },
  {
    id: "northbound",
    src: frame("northbound-bergen"),
    alt: "A ferry crossing grey water toward a line of hills.",
    title: "Northbound",
    meta: "Bergen, 2022",
  },
  {
    id: "hands",
    src: frame("hands-studio"),
    alt: "Close study of two pairs of hands meeting.",
    title: "Hands",
    meta: "Studio, 2024",
  },
  {
    id: "rain-on-glass",
    src: frame("rain-on-glass-kyoto"),
    alt: "Rain running down a window, a garden blurred behind it.",
    title: "Rain on Glass",
    meta: "Kyoto, 2023",
  },
  {
    id: "sisters",
    src: frame("sisters-alesund"),
    alt: "Two sisters standing shoulder to shoulder against a pale wall.",
    title: "Sisters",
    meta: "Ålesund, 2022",
  },
  {
    id: "last-light",
    src: frame("last-light-dolomites"),
    alt: "The last band of light along a ridge of mountains.",
    title: "Last Light",
    meta: "Dolomites, 2024",
  },
]

export const services = [
  {
    title: "Portraits",
    description:
      "People, at home or in a place that means something to them. Available light, and no direction beyond a quiet conversation.",
  },
  {
    title: "Landscape",
    description:
      "Coastlines, fields and mountains, photographed slowly and printed large enough to live with.",
  },
  {
    title: "Documentary",
    description:
      "Longer stories — a family, a workshop, a season of work — followed over days rather than hours.",
  },
]

export type Tier = {
  name: string
  price: string
  summary: string
  includes: string[]
}

// Replace these amounts and inclusions with your own.
export const pricing: Tier[] = [
  {
    name: "Portrait session",
    price: "from $450",
    summary: "Ninety minutes in one location, for one person or a small group.",
    includes: [
      "Up to 90 minutes on location",
      "25 edited images",
      "Private online gallery",
      "Print-ready files on request",
    ],
  },
  {
    name: "Half day",
    price: "from $1,200",
    summary:
      "Half a day for couples, families, or a small editorial commission.",
    includes: [
      "Up to four hours",
      "Two locations",
      "60 edited images",
      "Licence for personal or editorial use",
    ],
  },
  {
    name: "Full day",
    price: "from $2,400",
    summary:
      "A whole day, for a wedding, a campaign, or a story that needs time.",
    includes: [
      "Up to eight hours",
      "As many locations as the day allows",
      "120 or more edited images",
      "Commercial usage licence",
      "A set of fine-art prints",
    ],
  },
]

export const pricingNotes = [
  "Prices are a starting point and depend on location and scope.",
  "Travel beyond 50 km is billed at cost.",
  "A 30% deposit reserves the date; the balance is due two weeks before the shoot.",
]
