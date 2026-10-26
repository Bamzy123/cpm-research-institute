import { articles } from "../../lib/articles";
import type { Article } from "../../lib/article-schema";
import { SITE } from "../../lib/site";

export const previewViews = [
  "overview",
  "articles",
  "editor",
  "review",
  "media",
  "team",
  "activity",
  "settings",
  "login",
] as const;
export type PreviewView = (typeof previewViews)[number];
export type PreviewSearch = { view?: PreviewView; article?: string };
export type PreviewDraft = {
  id: string;
  article: Article;
  sourceSlug?: string;
  status: "draft" | "review" | "changes";
  dirty: boolean;
  savedAt?: string;
  note?: string;
};
export type PreviewActivity = { id: string; title: string; detail: string; time: string };

export function validatePreviewSearch(value: Record<string, unknown>): PreviewSearch {
  return {
    view: previewViews.includes(value.view as PreviewView)
      ? (value.view as PreviewView)
      : "overview",
    article: typeof value.article === "string" ? value.article.slice(0, 150) : undefined,
  };
}

export function slugify(title: string) {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function newPreviewDraft(source?: Article): PreviewDraft {
  return {
    id: `preview-${crypto.randomUUID()}`,
    sourceSlug: source?.slug,
    article: source
      ? structuredClone(source)
      : {
          title: "",
          slug: "",
          summary: "",
          kind: "news",
          topic: "Research",
          author: { name: SITE.name, type: "Organization" },
          body: [{ type: "paragraph", text: "" }],
          gallery: [],
          details: [],
          featured: false,
          seo: { title: "", description: "" },
        },
    status: "draft",
    dirty: true,
  };
}

export function publicationPayload(article: Article): Article {
  return {
    ...article,
    title: article.title.trim(),
    summary: article.summary.trim(),
    slug: article.slug.trim() || slugify(article.title),
    seo: {
      title: article.seo.title.trim() || `${article.title.trim()} | CPM Int’l`,
      description: article.seo.description.trim() || article.summary.trim(),
    },
  };
}

const mediaByPath = new Map<
  string,
  { src: string; alt: string; caption?: string; usedBy: string[] }
>();
for (const article of articles) {
  for (const item of [article.image, ...article.gallery].filter(
    (value): value is NonNullable<Article["image"]> => Boolean(value),
  )) {
    const existing = mediaByPath.get(item.src);
    if (existing) {
      if (!existing.usedBy.includes(article.title)) existing.usedBy.push(article.title);
    } else mediaByPath.set(item.src, { ...item, usedBy: [article.title] });
  }
}
export const previewMedia = [...mediaByPath.values()];
export { articles };
