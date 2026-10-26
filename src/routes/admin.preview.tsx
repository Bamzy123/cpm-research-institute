import { createFileRoute, notFound } from "@tanstack/react-router";
import { AdminPreview } from "../components/admin/AdminPreview";
import { validatePreviewSearch } from "../components/admin/preview-data";

export const Route = createFileRoute("/admin/preview")({
  validateSearch: validatePreviewSearch,
  beforeLoad: () => {
    // The design workspace has no authentication and must not be publicly deployed.
    if (!import.meta.env.DEV) throw notFound();
  },
  head: () => ({
    meta: [
      { title: "Admin design preview | CPM Int’l" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: PreviewPage,
});

function PreviewPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  return <AdminPreview search={search} navigate={(next) => void navigate({ search: next })} />;
}
