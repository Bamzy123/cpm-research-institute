# News & Events publishing

`articles.json` is the published article collection. It is rendered on the server, so the article body, metadata and structured data are available to visitors and crawlers on the first request. There is one URL per story: `/news/<slug>`.

The existing `/admin/posts` editor remains a device-local drafting tool. It preserves previous browser drafts, includes SEO/image fields, previews a search result, and exports a validated article JSON file. It does not provide authenticated server publishing. A shared online CMS would require durable storage and authentication.

To publish a new draft (Node 22.18+):

1. Complete the draft, select News or Event report, and enter the author, date and image alt text.
2. Set the stable URL, SEO title and description. Separate body paragraphs with blank lines; use `## Heading` for sections.
3. Export the article, then run `npm run articles:import -- path/to/article.json` in this checkout. For an intentional update to an existing URL, append `--replace`.
4. Review the imported content, run `npm run test:content`, `npx tsc --noEmit` and `npm run build`, then deploy through the project's existing Lovable/Git workflow.

Alternatively, edit `articles.json` directly. `src/lib/article-schema.ts` validates it. Optional structured body blocks support headings, paragraphs, lists and quotations. Galleries retain image paths, alt text and captions. Only one article should be featured. Do not invent missing dates, author credentials or photographs. Set `updatedAt` only for a substantive article update. Historical event reports use `NewsArticle` structured data; an actual future registration page should use separately verified Event details.

Each published article automatically receives a canonical URL, title/description, Open Graph and Twitter metadata, NewsArticle and BreadcrumbList JSON-LD, related links and sitemap inclusion. Pages without a relevant photograph use text cards and do not claim an unrelated social image. Filter/search URLs are noindex; unfiltered archive pagination is indexable. Unknown article slugs return HTTP 404. Old `/events/<id>` links permanently redirect to the corresponding article; old event fragments are handled in the browser.

Institute identity and the public domain are in `src/lib/site.ts`. CPM is based at **7, Grand-mart Hub, Opposite Omololu Hospital, Akobo Ojuirin, Ibadan, Oyo State, Nigeria**. OAU/OAUTHC references describe research collaboration and individual academic affiliations, not hosting or headquarters.

After deployment, submit `/sitemap.xml` in Google Search Console and request indexing for the homepage, About page and updated articles. Google controls recrawling, snippets and AI summaries; these changes prepare the site but cannot force an immediate update or guarantee rankings.

References: [Google Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article), [canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls), [request recrawling](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl).
