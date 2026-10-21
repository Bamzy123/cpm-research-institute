import { articles, type Article, type NewsSearch } from "./articles";
import { absoluteUrl, SITE } from "./site";

export function articleHead(article: Article) {
  const url = absoluteUrl(`/news/${article.slug}`);
  const image = article.image ? absoluteUrl(article.image.src) : undefined;
  return {
    meta: [
      { title: article.seo.title },
      { name: "description", content: article.seo.description },
      { name: "author", content: article.author.name },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:type", content: "article" },
      { property: "og:title", content: article.title },
      { property: "og:description", content: article.seo.description },
      { property: "og:url", content: url },
      { name: "twitter:card", content: image ? "summary_large_image" : "summary" },
      { name: "twitter:title", content: article.title },
      { name: "twitter:description", content: article.seo.description },
      { property: "article:section", content: article.topic },
      ...(article.date ? [{ property: "article:published_time", content: article.date }] : []),
      ...(article.updatedAt ? [{ property: "article:modified_time", content: article.updatedAt }] : []),
      ...(image ? [
        { property: "og:image", content: image },
        { property: "og:image:alt", content: article.image!.alt },
        { name: "twitter:image", content: image },
        { name: "twitter:image:alt", content: article.image!.alt },
      ] : []),
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [{
        "@type": "NewsArticle",
        "@id": `${url}#article`,
        headline: article.title,
        description: article.seo.description,
        url,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        ...(image ? { image: [image] } : {}),
        ...(article.date ? { datePublished: article.date } : {}),
        ...(article.updatedAt ? { dateModified: article.updatedAt } : {}),
        author: { "@type": article.author.type, name: article.author.name, ...(article.author.url ? { url: absoluteUrl(article.author.url) } : {}) },
        publisher: { "@id": `${SITE.url}/#organization` },
        articleSection: article.topic,
        inLanguage: "en",
      }, {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "News & Events", item: absoluteUrl("/news") },
          { "@type": "ListItem", position: 3, name: article.title, item: url },
        ],
      }],
    }).replace(/</g, "\\u003c") }],
  };
}

export function archiveHead(search: NewsSearch) {
  const filtered = Boolean(search.type || search.q || search.topic);
  const url = absoluteUrl(`/news${!filtered && search.page ? `?page=${search.page}` : ""}`);
  const title = `News & Events${search.page ? ` — Page ${search.page}` : ""} | CPM Int’l Research Institute`;
  const description = "Research news, scientific visits and institutional updates from CPM Int'l Research Institute for Climate Health in Ibadan, Nigeria.";
  return {
    meta: [
      { title }, { name: "description", content: description },
      { name: "robots", content: filtered ? "noindex, follow" : "index, follow" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

const xmlEscape = (value: string) => value.replace(/[<>&"']/g, (character) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;" })[character]!);
export function buildSitemap() {
  const staticPaths = ["/", "/about", "/chip", "/news", "/leadership", "/resources", "/fellowships", "/donate"];
  const entries = [
    ...staticPaths.map((path) => `<url><loc>${xmlEscape(absoluteUrl(path))}</loc></url>`),
    ...articles.map((article) => `<url><loc>${xmlEscape(absoluteUrl(`/news/${article.slug}`))}</loc>${article.updatedAt || article.date ? `<lastmod>${article.updatedAt || article.date}</lastmod>` : ""}</url>`),
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries.join("\n")}</urlset>`;
}
