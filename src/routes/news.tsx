import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import type { EventId } from "../lib/event-data";
import { getPublishedManagedNewsPosts } from "../lib/news-store";

import { ArrowLeft, Calendar, User, Tag, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/news")({
  component: NewsPage,
  head: () => ({
    meta: [
      { title: "News & Updates | CPM Int'l Research Institute" },
      {
        name: "description",
        content:
          "Latest research updates, news, and announcements from CPM Int'l Research Institute for Climate Health.",
      },
    ],
  }),
});

type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  eventId?: EventId;
  featured?: boolean;
  imageUrls?: string[];
  fullArticle?: boolean;
};

const newsItems: NewsItem[] = [
  {
    id: "institutional-visit-oauthc-october-2026",
    title: "Institutional Visit | 9th October 2026",
    excerpt:
      "CPM International Research Institute for Climate Health, Ibadan, hosted Professor Komolafe, former Deputy CMAC of OAUTHC, on a delegated visit from the CMD, OAUTHC, on Friday, 9th October 2026.",
    content:
      "The visit marks a valuable step towards strengthening institutional relations, research collaboration and shared commitment to scientific innovation and public health advancement.\n\nCPM Int’l — Advancing Research, Transforming Health.",
    date: "2026-10-09",
    author: "CPM Int'l Research Institute",
    category: "Partnership",
    featured: true,
    imageUrls: [
      "/prof.jpeg",
      "/prof1.jpeg",
      "/prof2.jpeg",
      "/prof3.jpeg",
      "/prof4.jpeg",
      "/prof5.jpeg",
    ],
  },
  {
    id: "oauthc-oau-cpm-climate-health-collaboration-cambridge-tanzania",
    title:
      "OAUTHC-OAU-CPM Climate-Health Collaboration Takes Nigerian Research to Cambridge and Tanzania",
    excerpt:
      "OAUTHC leadership under Professor John Akintunde Okeniyi advances clinical research, scientific mentorship and international engagement.",
    content: `ILE-IFE, NIGERIA | October 2026

The collaboration between the Obafemi Awolowo University Teaching Hospitals Complex (OAUTHC), Obafemi Awolowo University (OAU), and CPM International Research Institute for Climate Health is gaining international visibility through emerging research opportunities for Mrs Adeola Victoria Anisere, an OAUTHC staff member, PhD student at OAU, and CPM International Research Institute’s focal person for the Osun State Climate Health Surveillance Pilot.

Mrs Anisere will present her research work at Epigenomics of Common Diseases 2026, scheduled for 4–6 November 2026 at the Wellcome Genome Campus, Hinxton, Cambridge, United Kingdom. Her accepted research, titled “From Environmental Exposure to Host Vulnerability: Establishing a Climate Health Intelligence Platform for Epigenomic Research in Nigeria,” explores a framework for investigating environmental exposures, host vulnerability and climate-sensitive health outcomes.

This milestone highlights the potential of Nigerian hospital-based research to contribute to international scientific discussions while addressing locally relevant public-health challenges.

Under the leadership of Professor John Akintunde Okeniyi, Chief Medical Director of OAUTHC, the Teaching Hospitals Complex provides an important clinical platform for collaborative research connecting patient care, surveillance and public-health innovation. The Osun State pilot, undertaken in collaboration with OAU and CPM International Research Institute for Climate Health, seeks to strengthen research on climate-sensitive respiratory and infectious disease risks.

Mrs Anisere is pursuing her PhD under the scientific supervision of Professor Joseph Omololu-Aso, Professor of Infectious Disease & Climate Change Intervention, Clinical Microbiology & Immunology at OAU and Director-General/CEO of CPM International Research Institute for Climate Health Ltd/Gte.

Professor Omololu-Aso’s research and institutional development initiatives focus on climate-sensitive infectious diseases, pathogenomics, antimicrobial resistance (AMR), One Health innovation and AI-enabled public-health surveillance. His mentorship reflects a commitment to developing emerging Nigerian researchers while building sustainable platforms for scientific collaboration and public-health impact.

Mrs Anisere is also expected to participate in the Hospital Partnerships Alliance (HPA) Global Forum in Moshi, Tanzania, from 8–11 November 2026, under the applicable HPA/GIZ-supported arrangements. This separate engagement offers further opportunities for professional exchange and collaboration on climate change and health.

The UK and Tanzania engagements underscore the value of connecting clinical research, postgraduate training and international partnerships. They also highlight the potential of the OAU–OAUTHC–CPM collaboration to strengthen Nigeria’s capacity for climate-health intelligence, infectious disease surveillance and evidence-informed public-health action.

CPM International Research Institute for Climate Health commends Professor Okeniyi’s institutional leadership, Professor Omololu-Aso’s scientific mentorship, and Mrs Anisere’s contribution to this developing research initiative.

About the collaboration:

The Osun State Climate Health Surveillance Pilot brings together OAU, OAUTHC and CPM International Research Institute for Climate Health to advance clinical surveillance and research on climate-sensitive health outcomes.

The initiative is strengthened by CPM’s signed Memorandum of Understanding with the Nigerian Meteorological Agency (NiMet), establishing a formal basis for institutional collaboration. Engagement with the Nigeria Centre for Disease Control and Prevention (NCDC), alongside federal-level support initiatives involving the Ministries responsible for Health, Environment and Education, forms part of the wider national framework for coordinated climate-health research and surveillance. CPM’s international collaboration with Philipps University Marburg, Germany, formalised through an MoU, further strengthens its research partnership network.

Media enquiries: CPM International Research Institute for Climate Health Ltd/Gte
Website: https://www.cpmintlresearchinstitute.org/
Email: info@cpm-institute.org
Headquarters: 7 Grand-mart Hub, Akobo Ojuirin, Ibadan, Oyo State, Nigeria.`,
    date: "2026-10-01",
    author: "CPM Int'l Research Institute",
    category: "Research",
    featured: true,
    fullArticle: true,
  },
  {
    id: "acegid-delegation",
    title:
      "ACEGID Hosts Delegation from CPM Int'l Institute, OAUTHC and OAU for Scientific Engagement on Pathogenomics and Climate-Health Innovation",
    excerpt:
      "Redeemer’s University showcases world-class genomics infrastructure to emerging national climate-health and infectious disease consortium.",
    content:
      "The African Centre of Excellence for Genomics of Infectious Diseases (ACEGID), Redeemer’s University, Ede, hosted a scientific delegation led by Prof. Joseph Omololu-Aso alongside OAU and OAUTHC leadership to advance molecular diagnostics, pathogen genomics, AMR, and One Health surveillance.",
    date: "2026-07-22",
    author: "CPM Int'l Scientific Delegation",
    category: "Events",
    eventId: "acegid",
    featured: true,
  },
  {
    id: "hpa-bmz-germany",
    title:
      "Global Kick-off Dialogue on Climate Change & Health with Hospital Partnerships Alliance (HPA–BMZ), Germany",
    excerpt:
      "CPM Int'l Research Institute presents AI-enabled CP-Nexus framework for early disease threat prediction at high-level international forum.",
    content:
      "Participating in the Global Kick-off Dialogue organized by HPA, BMZ, and GIZ Germany, CPM Int'l Research Institute presented its vision for AI-driven climate-health intelligence and low- and middle-income country (LMIC) health system resilience.",
    date: "2026-07-07",
    author: "Global Engagement Team",
    category: "Events",
    eventId: "hpa-bmz",
    featured: true,
  },
  {
    id: "olubadan-audience",
    title:
      "Olubadan of Ibadanland Receives CPM Int'l Institute Delegation, Expresses Support for Climate-Health Innovation",
    excerpt:
      "Historic palace engagement strengthens vision for climate-sensitive disease research, pathogenomics, AMR, and One Health in Ibadanland.",
    content:
      "His Imperial Majesty Oba Rashidi Adewolu Akanmu Ladoja granted an official audience to Prof. Joseph Omololu-Aso and Are Aago Rear Admiral Ibikunle Akintola (Rtd.), endorsing plans for an innovation and research hub.",
    date: "2026-04-13",
    author: "Director-General Office",
    category: "Events",
    eventId: "olubadan",
    featured: false,
  },
  {
    id: "oka-land-courtesy-visit",
    title:
      "CPM International Research Institute Pays Climate-Health Courtesy Visit to the Olubaka of Oka Land",
    excerpt:
      "Traditional leadership engagement advances dialogue on climate change, community health resilience, and climate-health action in Oka Land and beyond.",
    content:
      "Professor J. Omololu-Aso, Director-General/CEO of CPM International Research Institute for Climate Health, paid a courtesy visit to His Royal Highness Oba Dr. Yusuf Adebori Adeleye, the Olubaka of Oka Land, on 15 August 2026.",
    date: "2026-08-15",
    author: "Director-General Office",
    category: "Events",
    eventId: "oka-land",
    featured: false,
  },
  {
    id: "1",
    title: "CPM Int'l Launches Climate–Pathogen Nexus Framework for Advanced Disease Surveillance",
    excerpt:
      "The institute introduces its flagship scientific innovation, integrating climate science with pathogen genomics for predictive public health intelligence.",
    content:
      "The CPM Int'l Research Institute for Climate Health has officially launched the Climate–Pathogen Nexus (CP-Nexus) framework, a groundbreaking scientific innovation that integrates climate science, pathogen biology, genomics, and artificial intelligence. This framework represents a major step toward advancing climate health intelligence across Africa and globally.",
    date: "2026-07-18",
    author: "Prof. Omololu J Aso",
    category: "Research",
    featured: false,
  },
  {
    id: "4",
    title: "CHIP™ Platform Development Reaches Milestone—Beta Release Coming Q3 2026",
    excerpt:
      "Climate Health Intelligence Platform nears completion with advanced AI capabilities for real-time surveillance.",
    content:
      "The CHIP™ (Climate Health Intelligence Platform) development team has announced a major milestone. The AI-enabled Climate Health Digital Twin is now entering final integration testing, with a beta release expected in Q3 2026. The platform will integrate climate data, disease surveillance, laboratory intelligence, and genomic data in real time.",
    date: "2026-07-05",
    author: "Technology Team",
    category: "Innovation",
    featured: false,
  },
  {
    id: "5",
    title: "CPM Int'l Hosts Regional Training Workshop on Genomic Surveillance",
    excerpt:
      "Over 50 scientists and public health professionals participate in capacity-building initiative.",
    content:
      "CPM Int'l successfully conducted a week-long training workshop on pathogenomics and genomic surveillance for researchers and public health professionals across West Africa. The workshop covered molecular epidemiology, sequencing technologies, and data interpretation for outbreak response.",
    date: "2026-06-28",
    author: "Education Team",
    category: "Training",
    featured: false,
  },
];

const categories = [
  "All",
  "Events",
  "Research",
  "Partnership",
  "Publication",
  "Innovation",
  "Training",
];

function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [managedNews, setManagedNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    setManagedNews(getPublishedManagedNewsPosts());
  }, []);

  const filteredNews = [...managedNews, ...newsItems].filter((item) => {
    const categoryMatch = selectedCategory === "All" || item.category === selectedCategory;
    const searchMatch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const featuredNews = filteredNews.filter((item) => item.featured);
  const regularNews = filteredNews.filter((item) => !item.featured);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* ── Hero Section ────────────────────────────────────────────── */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28">
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary-foreground/70">
              News & Updates
            </p>
            <h1 className="mt-4 font-serif text-5xl leading-[1.1] tracking-tight lg:text-6xl">
              Latest from CPM Int'l Institute
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-primary-foreground/85">
              Stay informed about our latest research breakthroughs, partnerships, and updates from
              the International Research Institute for Climate Health.
            </p>
          </div>
        </div>
      </section>

      {/* ── Search & Filter ────────────────────────────────────────── */}
      <section className="border-b border-border/40 bg-background">
        <div className="mx-auto max-w-[1400px] px-6 py-12 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Search */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-3">Search news</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by title or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border border-input rounded-lg px-4 py-3 bg-background text-sm focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full border border-input rounded-lg px-4 py-3 bg-background text-sm focus:border-primary focus:outline-none"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured News ───────────────────────────────────────────── */}
      {featuredNews.length > 0 && (
        <section className="border-b border-border/40 bg-background">
          <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10 lg:py-24">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary mb-8">
              Featured
            </p>
            <div className="grid gap-8 md:grid-cols-2">
              {featuredNews.map((item) => (
                <article
                  key={item.id}
                  className="group border border-border p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-md hover:shadow-primary/5"
                >
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="inline-flex items-center gap-1 border border-primary/30 rounded-full px-3 py-1 text-xs font-medium text-primary bg-primary/5">
                      <Tag className="h-3 w-3" aria-hidden />
                      {item.category}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" aria-hidden />
                      {new Date(item.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl leading-tight text-foreground mb-3 group-hover:text-primary transition">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground mb-5">
                    {item.excerpt}
                  </p>
                  {item.imageUrls && item.imageUrls.length > 0 && (
                    <div className="mb-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {item.imageUrls.map((imageUrl, imageIndex) => (
                        <img
                          key={imageUrl}
                          src={imageUrl}
                          alt={`${item.title} photo ${imageIndex + 1}`}
                          className="aspect-[4/3] w-full object-cover"
                          loading="lazy"
                        />
                      ))}
                    </div>
                  )}
                  {item.fullArticle && (
                    <div className="mb-5 border-y border-border/30 py-5 text-sm leading-relaxed text-foreground/80">
                      {item.content.split("\n\n").map((paragraph, paragraphIndex) => (
                        <p
                          key={`${item.id}-paragraph-${paragraphIndex}`}
                          className="mb-4 last:mb-0 whitespace-pre-line"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-4 border-t border-border/20">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <User className="h-3 w-3" aria-hidden />
                      {item.author}
                    </span>
                    <Link
                      to={item.eventId ? "/events/$eventId" : "/news"}
                      params={item.eventId ? { eventId: item.eventId } : undefined}
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all"
                    >
                      Read full article <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── All News Items ──────────────────────────────────────────── */}
      <section className="bg-background">
        <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10 lg:py-24">
          {regularNews.length === 0 && featuredNews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No news items found matching your search.</p>
            </div>
          ) : (
            <>
              {featuredNews.length > 0 && (
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary mb-8">
                  All Updates
                </p>
              )}
              <div className="space-y-6">
                {regularNews.map((item) => (
                  <article
                    key={item.id}
                    className="group border-b border-border/20 pb-6 last:border-b-0 transition-all duration-300 hover:pl-2"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-primary bg-primary/10 rounded px-2 py-1">
                            {item.category}
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" aria-hidden />
                            {new Date(item.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <h3 className="font-serif text-lg leading-snug text-foreground mb-2 group-hover:text-primary transition">
                          {item.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-muted-foreground mb-4">
                          {item.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" aria-hidden />
                            {item.author}
                          </span>
                          <Link
                            to={item.eventId ? "/events/$eventId" : "/news"}
                            params={item.eventId ? { eventId: item.eventId } : undefined}
                            className="inline-flex items-center gap-1 text-primary hover:gap-2 transition-all font-medium"
                          >
                            Read full article <ArrowRight className="h-3 w-3" aria-hidden />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── CTA Section ─────────────────────────────────────────────── */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10 lg:py-24 text-center">
          <h2 className="font-serif text-3xl leading-tight mb-4">Stay Updated</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Have questions about our research or want to collaborate? Contact us or visit our
            resources page for more information.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 bg-primary-foreground px-6 py-3 text-sm font-medium text-primary hover:bg-primary-foreground/90 transition"
            >
              Get in Touch <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <Link
              to="/resources"
              className="inline-flex items-center gap-2 border border-primary-foreground/40 px-6 py-3 text-sm font-medium text-primary-foreground hover:border-primary-foreground/60 transition"
            >
              View Resources
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <Footer />
    </div>
  );
}
