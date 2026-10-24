import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { getLegacyEvent } from "../lib/articles";
export const Route = createFileRoute("/events/$eventId")({
  beforeLoad: ({ params }) => {
    const article = getLegacyEvent(params.eventId);
    if (!article) throw notFound();
    throw redirect({
      to: "/news/$slug",
      params: { slug: article.slug },
      statusCode: 301,
    });
  },
  head: () => ({ meta: [{ name: "robots", content: "noindex, follow" }] }),
});
