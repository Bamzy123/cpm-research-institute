import { createFileRoute } from "@tanstack/react-router";
import { SITE } from "../lib/site";
export const Route = createFileRoute("/robots.txt")({
  server: { handlers: { GET: () => new Response(`User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE.url}/sitemap.xml\n`, { headers: { "Content-Type": "text/plain; charset=utf-8" } }) } },
});
