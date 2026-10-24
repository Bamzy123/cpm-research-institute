import { z } from "zod";
import content from "../content/articles.json";
import { articleSchema, type Article } from "./article-schema";
export { articleSchema, type Article, type ArticleImage } from "./article-schema";

export const articles: Article[] = z
  .array(articleSchema)
  .parse(content)
  .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? "") || a.title.localeCompare(b.title));
if (new Set(articles.map((article) => article.slug)).size !== articles.length) {
  throw new Error("Every article must have a unique slug.");
}

export const getArticle = (slug: string) => articles.find((article) => article.slug === slug);
export const getLegacyEvent = (id: string) =>
  articles.find((article) => article.legacyEventId === id);
export const formatArticleDate = (value?: string) =>
  value
    ? new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      }).format(new Date(`${value}T12:00:00Z`))
    : "Programme archive";
export const readingMinutes = (article: Article) =>
  Math.max(
    1,
    Math.ceil(
      article.body
        .map((block) => (block.type === "list" ? block.items.join(" ") : block.text))
        .join(" ")
        .split(/\s+/).length / 220,
    ),
  );

export type NewsSearch = {
  type?: "news" | "events";
  q?: string;
  topic?: string;
  page?: number;
};
export function validateNewsSearch(search: Record<string, unknown>): NewsSearch {
  const type = search.type === "news" || search.type === "events" ? search.type : undefined;
  const q = typeof search.q === "string" ? search.q.trim().slice(0, 150) || undefined : undefined;
  const topic =
    typeof search.topic === "string" && articles.some((article) => article.topic === search.topic)
      ? search.topic
      : undefined;
  const parsedPage = Number(search.page);
  const page =
    Number.isSafeInteger(parsedPage) && parsedPage > 1 ? Math.min(parsedPage, 10000) : undefined;
  return { type, q, topic, page };
}

export function getArchive(search: NewsSearch) {
  const hasFilter = Boolean(search.type || search.q || search.topic);
  const featured = !hasFilter ? articles.find((article) => article.featured) : undefined;
  const matches = articles.filter((article) => {
    const text =
      `${article.title} ${article.summary} ${article.topic} ${article.author.name}`.toLocaleLowerCase();
    return (
      (!search.type || article.kind === (search.type === "events" ? "event" : "news")) &&
      (!search.topic || article.topic === search.topic) &&
      (!search.q || text.includes(search.q.toLocaleLowerCase()))
    );
  });
  const grid = matches.filter((article) => article.slug !== featured?.slug);
  const pages = Math.max(1, Math.ceil(grid.length / 6));
  const page = Math.min(search.page ?? 1, pages);
  return {
    featured: page === 1 ? featured : undefined,
    items: grid.slice((page - 1) * 6, page * 6),
    total: matches.length,
    pages,
    page,
    hasFilter,
  };
}
