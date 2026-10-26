import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ResearchOverview } from "../components/home/ResearchOverview";
import { ChipConcept } from "../components/home/ChipConcept";
import { articles, formatArticleDate } from "../lib/articles";
import { SITE, absoluteUrl } from "../lib/site";
import officePhoto from "../assets/header.jpeg?url";
import fieldPhoto from "../assets/citadel.jpeg?url";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "CPM Int'l Research Institute for Climate Health | Ibadan, Nigeria" },
      {
        name: "description",
        content:
          "CPM Int'l Research Institute for Climate Health is a research institute in Ibadan, Nigeria. Explore our climate-health research, CHIP platform and scientific collaborations.",
      },
      { property: "og:title", content: "CPM Int'l Research Institute for Climate Health" },
      {
        property: "og:description",
        content:
          "Transforming Climate Intelligence into Health Security. Discover CPM Int'l research, public health innovation and scientific partnerships.",
      },
      { property: "og:url", content: absoluteUrl("/") },
      { name: "twitter:title", content: "CPM Int'l Research Institute for Climate Health" },
      {
        name: "twitter:description",
        content:
          "Transforming Climate Intelligence into Health Security through research, innovation and collaboration.",
      },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/") }],
  }),
});

const latestStories = articles.filter((article) => article.date).slice(0, 3);
const [leadStory, ...otherStories] = latestStories;
const collaborationStory = "acegid-scientific-visit-pathogen-genomics";

function HomePage() {
  return (
    <div className="cpm-home min-h-screen bg-background text-foreground">
      <a
        href="#main-content"
        className="sr-only z-[100] bg-primary px-5 py-3 text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <section
          id="top"
          aria-labelledby="home-heading"
          className="mx-auto grid max-w-[1320px] items-center gap-10 px-6 pb-16 pt-10 sm:gap-12 sm:pb-20 sm:pt-16 lg:grid-cols-[1.08fr_1fr] lg:gap-12 lg:px-10 lg:pb-24 lg:pt-20"
        >
          <div>
            <p className="home-eyebrow">Climate health research</p>
            <h1
              id="home-heading"
              className="mt-6 font-serif text-[44px] leading-[1.06] tracking-[-0.04em] sm:text-6xl lg:text-[58px] xl:text-[64px]"
            >
              Transforming
              <br className="hidden sm:block" /> Climate Intelligence
              <br className="hidden sm:block" /> into{" "}
              <em className="font-normal text-primary">Health Security</em>
            </h1>
            <p className="mt-7 max-w-[520px] text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              CPM Int'l Research Institute for Climate Health advances scientific discovery,
              innovation, and evidence-based solutions at the intersection of climate change,
              infectious diseases, artificial intelligence, and One Health.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
              <a
                href="#research"
                id="cta-explore-research"
                className="inline-flex min-h-12 items-center justify-between gap-6 bg-primary px-5 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Explore our research <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <Link to="/about" className="home-text-link">
                Meet the institute <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
          <figure className="min-w-0 lg:pl-3">
            <div className="relative aspect-[6/5] overflow-hidden bg-secondary lg:aspect-[1/1]">
              <img
                src={officePhoto}
                alt="The CPM Int’l office and reception area"
                width={924}
                height={612}
                fetchPriority="high"
                className="h-full w-full object-cover object-[48%_center]"
              />
              <div className="absolute bottom-0 left-0 h-1.5 w-20 bg-gold" aria-hidden />
            </div>
            <figcaption className="flex items-start justify-between gap-5 border-b border-border py-4 text-xs leading-5 text-muted-foreground">
              <span>
                Collaborative research.
                <br />A shared commitment to public health.
              </span>
              <span className="pt-0.5 font-medium uppercase tracking-[0.12em] text-primary">
                CPM Int’l
              </span>
            </figcaption>
          </figure>
        </section>

        <ResearchOverview />
        <ChipConcept />

        <section id="surveillance-pilot" aria-labelledby="field-heading" className="scroll-mt-24">
          <div className="mx-auto grid max-w-[1320px] items-center gap-10 px-6 py-16 sm:py-20 lg:grid-cols-[1.15fr_1fr] lg:gap-20 lg:px-10 lg:py-24">
            <figure>
              <img
                src={fieldPhoto}
                alt="Professor Joseph Omololu-Aso with the climate surveillance pilot team"
                width={1080}
                height={810}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />
              <figcaption className="mt-3 text-xs leading-5 text-muted-foreground">
                The people behind the research: CPM Int’l’s climate surveillance pilot team.
              </figcaption>
            </figure>
            <div>
              <p className="home-eyebrow">Research in practice</p>
              <h2 id="field-heading" className="home-heading mt-5">
                In the field.
                <br />
                Closer to the answers.
              </h2>
              <p className="mt-6 text-base leading-7 text-muted-foreground">
                Our climate-health surveillance work connects field observations, laboratory
                diagnostics and environmental monitoring to understand disease risks in the
                communities they affect.
              </p>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                Through the Osun State Climate-Health Surveillance Pilot, we work with OAU and
                OAUTHC to strengthen the evidence for public health decisions.
              </p>
              <Link
                to="/news/$slug"
                params={{ slug: "strategic-sessions-climate-health-field-surveillance" }}
                className="home-text-link mt-7"
              >
                Inside our field programme <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </section>

        <section
          id="partnerships"
          aria-labelledby="partnership-heading"
          className="scroll-mt-24 border-y border-border bg-[#eeeee5]"
        >
          <div className="mx-auto max-w-[1320px] px-6 py-12 lg:px-10 lg:py-14">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="home-eyebrow">Working together</p>
                <h2
                  id="partnership-heading"
                  className="mt-4 font-serif text-3xl leading-tight tracking-tight sm:text-4xl"
                >
                  Science thrives through collaboration.
                </h2>
              </div>
              <Link
                to="/news/$slug"
                params={{ slug: collaborationStory }}
                className="home-text-link shrink-0"
              >
                Our scientific exchange <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <div className="mt-9 grid gap-7 border-t border-border pt-8 sm:grid-cols-3 sm:gap-8">
              {[
                { name: "OAU", full: "Obafemi Awolowo University" },
                { name: "OAUTHC", full: "Obafemi Awolowo University Teaching Hospitals Complex" },
                {
                  name: "ACEGID",
                  full: "African Centre of Excellence for Genomics of Infectious Diseases, Redeemer’s University",
                },
              ].map((partner) => (
                <div
                  key={partner.name}
                  className="sm:border-l sm:border-border sm:pl-8 sm:first:border-l-0 sm:first:pl-0"
                >
                  <p className="font-serif text-3xl tracking-tight text-primary">{partner.name}</p>
                  <p className="mt-2 max-w-xs text-xs leading-5 text-muted-foreground">
                    {partner.full}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {leadStory && (
          <section id="news" aria-labelledby="news-heading" className="scroll-mt-24">
            <div className="mx-auto max-w-[1320px] px-6 py-16 sm:py-20 lg:px-10 lg:py-24">
              <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
                <div>
                  <p className="home-eyebrow">News &amp; events</p>
                  <h2 id="news-heading" className="home-heading mt-4">
                    The latest from CPM Int’l.
                  </h2>
                </div>
                <Link to="/news" className="home-text-link">
                  View all stories <ArrowUpRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
              <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
                <article className="min-w-0">
                  {leadStory.image && (
                    <Link
                      to="/news/$slug"
                      params={{ slug: leadStory.slug }}
                      aria-label={`Read: ${leadStory.title}`}
                      tabIndex={-1}
                      className="group block overflow-hidden bg-secondary"
                    >
                      <img
                        src={leadStory.image.src}
                        alt={leadStory.image.alt}
                        width={800}
                        height={500}
                        loading="lazy"
                        decoding="async"
                        className="aspect-[16/10] w-full object-cover object-[center_15%] transition-transform duration-500 motion-safe:group-hover:scale-[1.02]"
                      />
                    </Link>
                  )}
                  <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs">
                    <span className="font-semibold uppercase tracking-[0.12em] text-primary">
                      {leadStory.topic}
                    </span>
                    <time dateTime={leadStory.date} className="text-muted-foreground">
                      {formatArticleDate(leadStory.date)}
                    </time>
                  </div>
                  <h3 className="mt-3 max-w-xl font-serif text-3xl leading-[1.18] tracking-tight">
                    <Link
                      to="/news/$slug"
                      params={{ slug: leadStory.slug }}
                      className="hover:text-primary hover:underline decoration-1 underline-offset-4"
                    >
                      {leadStory.title}
                    </Link>
                  </h3>
                  <Link
                    to="/news/$slug"
                    params={{ slug: leadStory.slug }}
                    className="home-text-link mt-5"
                    aria-label={`Read story: ${leadStory.title}`}
                  >
                    Read the story <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </Link>
                </article>
                <div className="flex flex-col border-t border-foreground/70">
                  {otherStories.map((article) => (
                    <article
                      key={article.slug}
                      className="flex-1 border-b border-border py-7 first:pt-6"
                    >
                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs">
                        <span className="font-semibold uppercase tracking-[0.12em] text-primary">
                          {article.kind === "event" ? "Event report" : article.topic}
                        </span>
                        <time dateTime={article.date} className="text-muted-foreground">
                          {formatArticleDate(article.date)}
                        </time>
                      </div>
                      <h3 className="mt-4 font-serif text-2xl leading-[1.22] tracking-tight sm:text-[28px]">
                        <Link
                          to="/news/$slug"
                          params={{ slug: article.slug }}
                          className="hover:text-primary hover:underline decoration-1 underline-offset-4"
                        >
                          {article.title}
                        </Link>
                      </h3>
                      <p className="mt-4 line-clamp-2 text-sm leading-6 text-muted-foreground">
                        {article.summary}
                      </p>
                      <Link
                        to="/news/$slug"
                        params={{ slug: article.slug }}
                        className="mt-4 inline-flex min-h-11 items-center gap-3 text-sm font-medium text-primary"
                        aria-label={`Read story: ${article.title}`}
                      >
                        Read the story <ArrowUpRight className="h-4 w-4" aria-hidden />
                      </Link>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        <section
          id="join"
          aria-labelledby="join-heading"
          className="scroll-mt-24 border-t border-border bg-[#e8ecdf]"
        >
          <div className="mx-auto max-w-[1320px] px-6 py-16 lg:px-10 lg:py-20">
            <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
              <div>
                <p className="home-eyebrow">Be part of the work</p>
                <h2 id="join-heading" className="home-heading mt-5">
                  The next chapter
                  <br />
                  starts with a conversation.
                </h2>
              </div>
              <div id="contact" className="scroll-mt-28 lg:pt-10">
                <p className="max-w-md text-base leading-7 text-muted-foreground">
                  A research question. A shared ambition. An opportunity to make a difference. We
                  welcome conversations with researchers, institutions and partners.
                </p>
                <a href={`mailto:${SITE.email}`} className="home-text-link mt-5 break-all">
                  Get in touch <ArrowUpRight className="h-4 w-4" aria-hidden />
                </a>
                <p className="mt-2 text-sm text-muted-foreground">
                  <a href={`mailto:${SITE.email}`} className="underline-offset-4 hover:underline">
                    {SITE.email}
                  </a>
                </p>
              </div>
            </div>
            <div className="mt-12 grid border-y border-primary/25 md:grid-cols-3">
              <Link
                to="/fellowships"
                id="btn-fellowship"
                className="group flex items-center justify-between gap-4 border-b border-primary/25 py-6 transition-colors hover:bg-primary/5 md:border-b-0 md:border-r md:pr-6"
              >
                <span>
                  <span className="block text-xs text-muted-foreground">Grow your expertise</span>
                  <span className="mt-1 block font-serif text-2xl">Fellowships &amp; training</span>
                </span>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-primary" aria-hidden />
              </Link>
              <Link
                to="/leadership"
                className="group flex items-center justify-between gap-4 border-b border-primary/25 py-6 transition-colors hover:bg-primary/5 md:border-b-0 md:border-r md:px-6"
              >
                <span>
                  <span className="block text-xs text-muted-foreground">Meet the people</span>
                  <span className="mt-1 block font-serif text-2xl">Our scientific leadership</span>
                </span>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-primary" aria-hidden />
              </Link>
              <Link
                to="/donate"
                id="btn-support"
                className="group flex items-center justify-between gap-4 py-6 transition-colors hover:bg-primary/5 md:pl-6"
              >
                <span>
                  <span className="block text-xs text-muted-foreground">
                    Make research possible
                  </span>
                  <span className="mt-1 block font-serif text-2xl">Support our work</span>
                </span>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-primary" aria-hidden />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
