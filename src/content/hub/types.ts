// Topic-cluster content model. Every entry belongs to a cluster (pillar page)
// and links back to the booking flow, to sibling entries and to the blog.

export type ClusterKey =
  | "alojamiento"
  | "turismo"
  | "gastronomia"
  | "empresas"
  | "eventos"
  | "deportes"
  | "educacion"
  | "servicios-en-marcos-juarez"
  | "rutas"
  | "servicios";

export type HubBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "table"; caption?: string; headers: string[]; rows: string[][] };

export interface HubFaq {
  q: string;
  a: string;
}

/** Location data used by company / venue pages (map + distances from the apart). */
export interface HubPlace {
  address: string;
  /** Free-text query used by the Google Maps embed. */
  mapQuery: string;
  distanceKm: string;
  driveMinutes: string;
  walkMinutes: string;
  /** Only fill in when verified from a public source; rendered conditionally. */
  lat?: number;
  lng?: number;
  /** Schema.org openingHours strings, e.g. "Mo-Fr 08:00-13:00". Verified data only. */
  hours?: string[];
  phone?: string;
  /** Schema.org type used for the Place JSON-LD. */
  placeType?:
    | "LocalBusiness"
    | "Restaurant"
    | "CafeOrCoffeeShop"
    | "BarOrPub"
    | "Hospital"
    | "Pharmacy"
    | "BankOrCreditUnion"
    | "GasStation"
    | "SportsActivityLocation"
    | "School"
    | "CollegeOrUniversity"
    | "Museum"
    | "Park"
    | "GovernmentOffice"
    | "Place";
}

export interface HubEntry {
  cluster: ClusterKey;
  slug: string;
  /** SEO <title> without the brand suffix. */
  title: string;
  h1: string;
  description: string;
  keywords: string;
  image: string;
  updatedAt: string; // ISO date
  /** 40-55 word direct answer: featured snippets, voice search and AI Overviews. */
  snippet: string;
  body: HubBlock[];
  faqs: HubFaq[];
  place?: HubPlace;
  /** "cluster/slug" references to related entries. */
  related?: string[];
  /** Blog slugs to cross-link. */
  relatedPosts?: string[];
}

export interface ClusterConfig {
  key: ClusterKey;
  slug: string;
  name: string;
  title: string;
  description: string;
  keywords: string;
  intro: string;
  snippet: string;
}

export const SITE = "https://esmeraldaapart.com.ar";
export const WA = "https://wa.me/5493472433334";
