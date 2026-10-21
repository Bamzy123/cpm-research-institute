import { createFileRoute, redirect } from "@tanstack/react-router";
import { getLegacyEvent } from "../lib/articles";
export const Route = createFileRoute("/events/")({
  beforeLoad: ({ location }) => {
    const article = getLegacyEvent(location.hash.replace(/^#?event-/, ""));
    if (article) throw redirect({ to: "/news/$slug", params: { slug: article.slug }, statusCode: 301 });
    throw redirect({ to: "/news", search: { type: "events" }, statusCode: 301 });
  },
});
