import { createFileRoute, Link, redirect, useLocation } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Search } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ArticleCard } from "../components/ArticleCard";
import {
  articles,
  formatArticleDate,
  getArchive,
  getLegacyEvent,
  validateNewsSearch,
} from "../lib/articles";
import { archiveHead } from "../lib/article-seo";

export const Route = createFileRoute("/news/")({
  validateSearch: validateNewsSearch,
  beforeLoad: ({ search, location }) => {
    const legacy = getLegacyEvent(location.hash.replace(/^#?event-/, ""));
    if (legacy)
      throw redirect({
        to: "/news/$slug",
        params: { slug: legacy.slug },
        replace: true,
      });
    const archive = getArchive(search);
    if (search.page && search.page !== archive.page)
      throw redirect({
        to: "/news",
        search: {
          ...search,
          page: archive.page > 1 ? archive.page : undefined,
        },
        replace: true,
      });
  },
  head: ({ match }) => archiveHead(match.search),
  component: Newsroom,
});

function Newsroom() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const hash = useLocation({ select: (location) => location.hash });
  const [query, setQuery] = useState(search.q ?? "");
  useEffect(() => {
    setQuery(search.q ?? "");
  }, [search.q]);
  // URL fragments are absent from the server request, including after a 301.
  useEffect(() => {
    const legacy = getLegacyEvent(hash.replace(/^#?event-/, ""));
    if (legacy)
      void navigate({
        to: "/news/$slug",
        params: { slug: legacy.slug },
        replace: true,
      });
  }, [hash, navigate]);
  const { featured, items, total, pages, page, hasFilter } = getArchive(search);
  const topics = [...new Set(articles.map((article) => article.topic))].sort();
  function onSearch(event: FormEvent) {
    event.preventDefault();
    void navigate({
      search: { ...search, q: query.trim() || undefined, page: undefined },
    });
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main id="main-content" className="mx-auto max-w-[1320px] px-6 pb-20 lg:px-10">
        <header className="border-b border-border pb-9 pt-12 sm:pb-12 sm:pt-16">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            From the institute
          </p>
          <div className="mt-4 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <h1 className="font-serif text-5xl leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              News &amp; Events<span className="text-gold">.</span>
            </h1>
            <p className="max-w-md text-base leading-7 text-muted-foreground">
              Discoveries, conversations and collaborations.
              <br className="hidden sm:block" /> Follow the people and ideas shaping our work.
            </p>
          </div>
        </header>

        {featured && (
          <section
            className="my-10 grid overflow-hidden bg-primary text-primary-foreground md:grid-cols-2"
            aria-labelledby="featured-title"
          >
            <Link
              to="/news/$slug"
              params={{ slug: featured.slug }}
              aria-label={`Read: ${featured.title}`}
              tabIndex={-1}
              className="relative block min-h-72 overflow-hidden"
            >
              {featured.image && (
                <img
                  src={featured.image.src}
                  alt={featured.image.alt}
                  width={810}
                  height={1080}
                  fetchPriority="high"
                  className="aspect-[4/3] h-full max-h-[540px] w-full object-cover object-[center_30%]"
                />
              )}
              <span className="absolute left-5 top-5 bg-background px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
                Featured story
              </span>
            </Link>
            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
              <div className="flex flex-wrap gap-x-3 gap-y-2 text-xs text-primary-foreground/75">
                <span className="font-semibold uppercase tracking-widest text-gold">
                  {featured.topic}
                </span>
                <span aria-hidden>·</span>
                <time dateTime={featured.date}>{formatArticleDate(featured.date)}</time>
              </div>
              <h2
                id="featured-title"
                className="mt-5 font-serif text-3xl leading-[1.12] tracking-tight sm:text-4xl lg:text-[42px]"
              >
                <Link
                  to="/news/$slug"
                  params={{ slug: featured.slug }}
                  className="hover:underline decoration-1 underline-offset-4"
                >
                  {featured.title}
                </Link>
              </h2>
              <p className="mt-5 text-base leading-7 text-primary-foreground/80">
                {featured.summary}
              </p>
              <Link
                to="/news/$slug"
                params={{ slug: featured.slug }}
                className="mt-8 inline-flex w-fit items-center gap-3 border-b border-primary-foreground/40 pb-2 text-sm font-semibold"
              >
                Read the story <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </section>
        )}

        <section id="stories" className="scroll-mt-24 pt-8" aria-labelledby="stories-heading">
          <div className="flex flex-col gap-6 border-b border-border pb-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 id="stories-heading" className="font-serif text-3xl">
                {hasFilter ? "Explore the archive" : "Latest stories"}
              </h2>
              <nav aria-label="Filter stories by type" className="mt-5 flex gap-2">
                {(
                  [
                    { label: "All", value: undefined },
                    { label: "News", value: "news" },
                    { label: "Events", value: "events" },
                  ] as const
                ).map((tab) => (
                  <Link
                    key={tab.label}
                    to="/news"
                    search={{ ...search, type: tab.value, page: undefined }}
                    aria-current={search.type === tab.value ? "page" : undefined}
                    className={`min-h-11 px-5 py-3 text-sm font-medium transition-colors ${search.type === tab.value ? "bg-primary text-primary-foreground" : "bg-secondary/60 text-foreground hover:bg-secondary"}`}
                  >
                    {tab.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <label className="sr-only" htmlFor="topic-filter">
                Filter by topic
              </label>
              <select
                id="topic-filter"
                value={search.topic ?? ""}
                onChange={(event) =>
                  void navigate({
                    search: {
                      ...search,
                      topic: event.target.value || undefined,
                      page: undefined,
                    },
                  })
                }
                className="min-h-11 border border-input bg-background px-3 text-sm"
              >
                <option value="">All topics</option>
                {topics.map((topic) => (
                  <option key={topic}>{topic}</option>
                ))}
              </select>
              <form onSubmit={onSearch} className="flex min-w-0 border border-input bg-background">
                <label htmlFor="story-search" className="sr-only">
                  Search news and events
                </label>
                <input
                  id="story-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search stories…"
                  className="min-h-11 min-w-0 flex-1 bg-transparent px-3 text-sm outline-none focus-visible:outline-offset-[-2px] sm:w-44"
                />
                <button
                  aria-label="Search stories"
                  className="flex w-11 shrink-0 items-center justify-center text-primary hover:bg-secondary"
                >
                  <Search className="h-4 w-4" aria-hidden />
                </button>
              </form>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 py-5 text-sm text-muted-foreground">
            <p role="status">
              {total} {total === 1 ? "story" : "stories"}
              {search.q ? ` matching “${search.q}”` : " in the archive"}
            </p>
            {hasFilter && (
              <Link
                to="/news"
                search={{}}
                className="font-medium text-primary underline underline-offset-4"
              >
                Clear filters
              </Link>
            )}
          </div>
          {items.length ? (
            <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-border py-16 text-center">
              <h3 className="font-serif text-2xl">No stories found</h3>
              <p className="mt-3 text-muted-foreground">
                Try another keyword or explore the full archive.
              </p>
              <Link
                to="/news"
                search={{}}
                className="mt-6 inline-flex min-h-11 items-center bg-primary px-5 text-sm font-medium text-primary-foreground"
              >
                View all stories
              </Link>
            </div>
          )}
          {pages > 1 && (
            <nav
              aria-label="Archive pagination"
              className="mt-12 flex flex-wrap items-center justify-center gap-3"
            >
              {page > 1 && (
                <Link
                  to="/news"
                  search={{
                    ...search,
                    page: page - 1 > 1 ? page - 1 : undefined,
                  }}
                  hash="stories"
                  rel="prev"
                  className="flex min-h-11 items-center gap-2 px-3 text-sm"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden />
                  Previous
                </Link>
              )}
              {Array.from({ length: pages }, (_, index) => index + 1).map((number) => (
                <Link
                  key={number}
                  to="/news"
                  search={{
                    ...search,
                    page: number > 1 ? number : undefined,
                  }}
                  hash="stories"
                  aria-label={`Page ${number}`}
                  aria-current={number === page ? "page" : undefined}
                  className={`flex h-11 w-11 items-center justify-center border text-sm ${number === page ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"}`}
                >
                  {number}
                </Link>
              ))}
              {page < pages && (
                <Link
                  to="/news"
                  search={{ ...search, page: page + 1 }}
                  hash="stories"
                  rel="next"
                  className="flex min-h-11 items-center gap-2 px-3 text-sm"
                >
                  Next
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              )}
            </nav>
          )}
        </section>
        <aside className="mt-16 flex flex-col justify-between gap-5 border-y border-border py-8 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-serif text-2xl">Looking for our published research?</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Explore publications, reports and resources from the institute.
            </p>
          </div>
          <Link
            to="/resources"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary"
          >
            Visit the library
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </aside>
      </main>
      <Footer />
    </div>
  );
}
