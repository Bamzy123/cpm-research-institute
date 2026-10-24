export const SITE = {
  name: "CPM Int'l Research Institute for Climate Health",
  shortName: "CPM Int'l",
  url: "https://www.cpmintlresearchinstitute.org",
  city: "Ibadan",
  region: "Oyo State",
  country: "Nigeria",
  street: "7, Grand-mart Hub, Opposite Omololu Hospital, Akobo Ojuirin",
  address:
    "7, Grand-mart Hub, Opposite Omololu Hospital, Akobo Ojuirin, Ibadan, Oyo State, Nigeria",
  email: "info@cpm-institute.org",
  phone: "+234 803 377 0933",
} as const;

export const absoluteUrl = (path: string) => new URL(path, SITE.url).href;

export function getInstituteLocationReply(query: string): string | undefined {
  const text = query.toLowerCase();
  const locationQuestion =
    /\b(where|location|located|address|headquarters|headquartered|based|hosted|contact|email)\b/.test(
      text,
    );
  const otherSubject =
    /\b(visit|palace|olubadan|olubaka|acegid|redeemer|pilot|surveillance|director|collaboration)\b/.test(
      text,
    );
  const generalPlaceQuestion = /\b(ibadan|ile[- ]ife|oau|oauthc)\b/.test(text) && !otherSubject;
  if ((locationQuestion && !otherSubject) || generalPlaceQuestion) {
    return `CPM Int'l Research Institute for Climate Health is an independent institute headquartered at ${SITE.address}. OAU and OAUTHC are research collaborators, rather than the institute's host or headquarters. Contact us at ${SITE.email} or ${SITE.phone}.`;
  }
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ResearchOrganization",
  "@id": `${SITE.url}/#organization`,
  name: SITE.name,
  url: SITE.url,
  logo: absoluteUrl("/logo_8-removebg-preview.png"),
  description:
    "An independent multidisciplinary research institute based in Ibadan, Oyo State, Nigeria, advancing climate-health research, infectious disease science and public health innovation.",
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.street,
    addressLocality: SITE.city,
    addressRegion: SITE.region,
    addressCountry: "NG",
  },
  email: SITE.email,
  telephone: SITE.phone,
};
