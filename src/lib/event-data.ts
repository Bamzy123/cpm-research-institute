export type EventId = "cpm" | "acegid" | "olubadan" | "oka-land" | "hpa-bmz";

export type EventRecord = {
  id: EventId;
  anchor: `event-${EventId}`;
  label: string;
  title: string;
  date?: string;
  location: string;
  category: string;
  summary: string;
  featured?: boolean;
};

export const eventRecords: EventRecord[] = [
  {
    id: "cpm",
    anchor: "event-cpm",
    label: "CPM Strategic Sessions",
    title:
      "CPM International Research Institute Executive Strategic Sessions, Field Surveillance & Multidisciplinary Consortium Workshops",
    location: "CPM Research Hubs & Field Sites, Nigeria",
    category: "Strategic Sessions & Field Operations",
    summary:
      "Institutional planning, One Health field preparedness, genomics integration and regional stakeholder engagement.",
    featured: true,
  },
  {
    id: "acegid",
    anchor: "event-acegid",
    label: "ACEGID Facility Tour",
    title: "ACEGID Hosts Delegation from CPM International Research Institute, OAUTHC and OAU",
    date: "22 July 2026",
    location: "Redeemer's University, Ede, Nigeria",
    category: "Facility Tour & Scientific Engagement",
    summary:
      "A scientific delegation explored genomics infrastructure, molecular diagnostics, pathogen surveillance and One Health innovation.",
    featured: true,
  },
  {
    id: "olubadan",
    anchor: "event-olubadan",
    label: "Olubadan Audience",
    title: "Olubadan of Ibadanland Receives CPM International Research Institute Delegation",
    date: "13 April 2026",
    location: "Palace of the Olubadan of Ibadanland",
    category: "Royal Audience & Stakeholder Engagement",
    summary:
      "A traditional leadership engagement focused on climate-health innovation, research capacity and community impact.",
  },
  {
    id: "oka-land",
    anchor: "event-oka-land",
    label: "Oka Land Courtesy Visit",
    title:
      "CPM International Research Institute for Climate Health Pays Courtesy Visit to the Olubaka of Oka Land",
    date: "15 August 2026",
    location: "Oka Land",
    category: "Climate-Health Courtesy Visit",
    summary:
      "Traditional leadership dialogue on climate change, community health resilience and locally grounded climate-health action.",
  },
  {
    id: "hpa-bmz",
    anchor: "event-hpa-bmz",
    label: "Global Dialogue",
    title: "Global Kick-off Dialogue on Climate Change and Health with HPA-BMZ, Germany",
    date: "7 July 2026",
    location: "Virtual Forum, Germany",
    category: "Global International Dialogue",
    summary:
      "An international forum on AI-enabled climate-health intelligence and resilient health systems in low- and middle-income countries.",
  },
];

export const eventRecordById = Object.fromEntries(
  eventRecords.map((event) => [event.id, event]),
) as Record<EventId, EventRecord>;
