import { Link } from "@tanstack/react-router";
import { ArrowUpRight, BookOpen, CalendarDays } from "lucide-react";
import { formatArticleDate, type Article } from "../lib/articles";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group flex h-full min-w-0 flex-col border-b border-border pb-7">
      <Link
        to="/news/$slug"
        params={{ slug: article.slug }}
        aria-label={`Read: ${article.title}`}
        tabIndex={-1}
        className="block overflow-hidden bg-secondary"
      >
        {article.image ? (
          <img
            src={article.image.src}
            alt={article.image.alt}
            loading="lazy"
            decoding="async"
            width={640}
            height={420}
            className="aspect-[16/10] w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
          />
        ) : (
          <div className="relative flex aspect-[16/10] flex-col justify-between overflow-hidden bg-primary p-7 text-primary-foreground">
            <div
              className="absolute -right-10 -top-10 h-48 w-48 rounded-full border border-white/15"
              aria-hidden
            />
            <div
              className="absolute -bottom-20 right-4 h-56 w-56 rounded-full border border-white/15"
              aria-hidden
            />
            {article.kind === "event" ? (
              <CalendarDays className="h-7 w-7 opacity-70" aria-hidden />
            ) : (
              <BookOpen className="h-7 w-7 opacity-70" aria-hidden />
            )}
            <div className="relative">
              <p className="text-xs uppercase tracking-[0.2em] text-primary-foreground/70">
                From the institute
              </p>
              <p className="mt-2 font-serif text-3xl">{article.topic}</p>
            </div>
          </div>
        )}
      </Link>
      <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs">
        <span className="font-semibold uppercase tracking-[0.12em] text-primary">
          {article.kind === "event" ? "Event report" : article.topic}
        </span>
        <span className="text-muted-foreground">
          {article.date ? (
            <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
          ) : (
            formatArticleDate()
          )}
        </span>
      </div>
      <h3 className="mt-3 font-serif text-2xl leading-[1.2] tracking-tight">
        <Link
          to="/news/$slug"
          params={{ slug: article.slug }}
          className="hover:text-primary hover:underline decoration-1 underline-offset-4"
        >
          {article.title}
        </Link>
      </h3>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{article.summary}</p>
      <Link
        to="/news/$slug"
        params={{ slug: article.slug }}
        className="mt-auto flex items-center gap-2 pt-5 text-sm font-semibold text-primary"
        aria-label={`Read story: ${article.title}`}
      >
        Read story <ArrowUpRight className="h-4 w-4" aria-hidden />
      </Link>
    </article>
  );
}
