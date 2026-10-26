import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check, Clock3, Link as LinkIcon, MapPin } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ArticleCard } from "../components/ArticleCard";
import { ArticleGallery } from "../components/ArticleGallery";
import {
  articles,
  formatArticleDate,
  getArticle,
  readingMinutes,
  type Article,
} from "../lib/articles";
import { articleHead } from "../lib/article-seo";
import { absoluteUrl, SITE } from "../lib/site";

export const Route = createFileRoute("/news/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return article;
  },
  head: ({ loaderData }) =>
    loaderData
      ? articleHead(loaderData)
      : {
          meta: [
            { title: "Story not found | CPM Int’l" },
            { name: "robots", content: "noindex, follow" },
          ],
        },
  component: ArticlePage,
  notFoundComponent: StoryNotFound,
});

function StoryNotFound() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-2xl px-6 py-28 text-center">
        <p className="text-xs uppercase tracking-widest text-primary">News &amp; Events</p>
        <h1 className="mt-5 font-serif text-4xl">Story not found</h1>
        <p className="mt-4 text-muted-foreground">
          This story may have moved or is not yet published.
        </p>
        <Link
          to="/news"
          className="mt-8 inline-flex min-h-11 items-center bg-primary px-6 text-sm font-medium text-primary-foreground"
        >
          Explore all stories
        </Link>
      </main>
      <Footer />
    </>
  );
}

function ArticlePage() {
  const article = Route.useLoaderData();
  return <ArticleContent key={article.slug} article={article} />;
}

function ArticleContent({ article }: { article: Article }) {
  const [shareStatus, setShareStatus] = useState<"idle" | "copied" | "manual">("idle");
  const url = absoluteUrl(`/news/${article.slug}`);
  const related = articles
    .filter((item) => item.slug !== article.slug)
    .sort((a, b) => Number(b.topic === article.topic) - Number(a.topic === article.topic))
    .slice(0, 3);
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setShareStatus("copied");
    } catch {
      setShareStatus("manual");
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main id="main-content" className="mx-auto max-w-[1240px] px-6 pb-20 lg:px-10">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 pt-8 text-xs text-muted-foreground"
        >
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <span aria-hidden>/</span>
          <Link to="/news" className="hover:text-primary">
            News &amp; Events
          </Link>
          <span aria-hidden>/</span>
          <span aria-current="page" className="max-w-[65ch] truncate text-foreground">
            {article.title}
          </span>
        </nav>
        <article>
          <header className="mx-auto max-w-4xl pb-9 pt-10 sm:pt-14">
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              <Link
                to="/news"
                search={{ type: article.kind === "event" ? "events" : "news" }}
                className="underline-offset-4 hover:underline"
              >
                {article.kind === "event" ? "Event report" : "Institute news"}
              </Link>
              <span className="h-1 w-1 rounded-full bg-gold" aria-hidden />
              <Link
                to="/news"
                search={{ topic: article.topic }}
                className="underline-offset-4 hover:underline"
              >
                {article.topic}
              </Link>
            </div>
            <h1 className="mt-5 text-balance font-serif text-4xl leading-[1.1] tracking-tight sm:text-5xl lg:text-[58px]">
              {article.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
              {article.summary}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-border pt-5 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">
                By{" "}
                {article.author.url ? (
                  <a
                    href={article.author.url}
                    className="underline decoration-border underline-offset-4"
                  >
                    {article.author.name}
                  </a>
                ) : (
                  article.author.name
                )}
              </span>
              {article.date && (
                <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
              )}
              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="h-3.5 w-3.5" aria-hidden />
                {readingMinutes(article)} min read
              </span>
              {article.updatedAt && (
                <span>
                  Updated{" "}
                  <time dateTime={article.updatedAt}>{formatArticleDate(article.updatedAt)}</time>
                </span>
              )}
            </div>
          </header>
          {article.image && (
            <figure className="mx-auto mb-12 max-w-4xl">
              <div className="flex justify-center bg-secondary/60">
                <img
                  src={article.image.src}
                  alt={article.image.alt}
                  width={1200}
                  height={800}
                  fetchPriority="high"
                  className="max-h-[620px] w-auto max-w-full object-contain"
                />
              </div>
              <figcaption className="border-b border-border py-3 text-xs leading-5 text-muted-foreground">
                {article.image.caption || article.image.alt}
              </figcaption>
            </figure>
          )}
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[minmax(0,1fr)_250px] lg:gap-16">
            <div className="min-w-0">
              {article.event && (
                <div className="mb-8 border-l-2 border-primary bg-secondary/40 p-5 text-sm">
                  <p className="font-semibold text-primary">
                    {article.event.date
                      ? `Event held on ${formatArticleDate(article.event.date)}`
                      : "Research programme & field operations"}
                  </p>
                  <p className="mt-2 flex items-start gap-2 leading-6 text-muted-foreground">
                    <MapPin className="mt-1 h-4 w-4 shrink-0" aria-hidden />
                    {article.event.location}
                  </p>
                  {article.event.registrationUrl && (
                    <a
                      href={article.event.registrationUrl}
                      className="mt-3 inline-flex font-semibold text-primary underline"
                    >
                      Event details &amp; registration
                    </a>
                  )}
                </div>
              )}
              <div className="space-y-6 text-base leading-8 text-foreground/90 sm:text-lg sm:leading-8">
                {article.body.map((block, index) =>
                  block.type === "heading" ? (
                    <h2
                      key={index}
                      className="pt-5 font-serif text-2xl leading-tight text-foreground sm:text-3xl"
                    >
                      {block.text}
                    </h2>
                  ) : block.type === "quote" ? (
                    <blockquote
                      key={index}
                      className="border-l-2 border-primary bg-secondary/40 px-6 py-5 font-serif text-xl leading-8 text-primary"
                    >
                      {block.text}
                    </blockquote>
                  ) : block.type === "list" ? (
                    <ul key={index} className="list-disc space-y-2 pl-6 marker:text-primary">
                      {block.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p key={index} className="whitespace-pre-line [overflow-wrap:anywhere]">
                      {block.text}
                    </p>
                  ),
                )}
              </div>
              <div className="mt-12">
                <ArticleGallery images={article.gallery} />
              </div>
            </div>
            <aside
              className="space-y-8 border-t border-border pt-8 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0"
              aria-label="Article information"
            >
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  Share this story
                </h2>
                <button
                  onClick={copyLink}
                  className="mt-4 inline-flex min-h-11 items-center gap-2 border border-border px-4 py-2 text-sm hover:border-primary"
                >
                  {shareStatus === "copied" ? (
                    <Check className="h-4 w-4" aria-hidden />
                  ) : (
                    <LinkIcon className="h-4 w-4" aria-hidden />
                  )}
                  {shareStatus === "copied" ? "Link copied" : "Copy article link"}
                </button>
                <p role="status" className="sr-only">
                  {shareStatus === "copied" ? "Article link copied to clipboard" : ""}
                </p>
                {shareStatus === "manual" && (
                  <label className="mt-3 block text-xs text-muted-foreground">
                    Copy this link
                    <input
                      readOnly
                      value={url}
                      onFocus={(event) => event.target.select()}
                      className="mt-2 w-full border border-border bg-background p-2"
                    />
                  </label>
                )}
              </div>
              {article.details.length > 0 && (
                <div>
                  <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                    At a glance
                  </h2>
                  <dl className="mt-5 space-y-5">
                    {article.details.map((detail) => (
                      <div key={detail.label}>
                        <dt className="text-xs text-muted-foreground">{detail.label}</dt>
                        <dd className="mt-1 text-sm leading-6">{detail.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
              <div className="border-t border-border pt-6">
                <p className="font-serif text-xl">About the institute</p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  CPM Int'l is a research institute based in Ibadan, Oyo State,
                  Nigeria.
                </p>
                <Link
                  to="/about"
                  className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4"
                >
                  Meet CPM Int’l
                </Link>
              </div>
              <div className="border-t border-border pt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  Media enquiries
                </p>
                <a
                  href={`mailto:${SITE.email}`}
                  className="mt-3 inline-block break-all text-sm text-muted-foreground underline underline-offset-4"
                >
                  {SITE.email}
                </a>
              </div>
            </aside>
          </div>
        </article>
        <section className="mt-16 border-t border-border pt-10" aria-labelledby="related-heading">
          <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
            <h2 id="related-heading" className="font-serif text-3xl">
              More from the institute
            </h2>
            <Link
              to="/news"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              All news &amp; events
            </Link>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ArticleCard key={item.slug} article={item} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
