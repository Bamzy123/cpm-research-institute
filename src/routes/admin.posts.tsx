import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Check, Download, Eye, FileText, Pencil, Plus, Save, Send, Trash2, X } from "lucide-react";
import { getManagedNewsPosts, saveManagedNewsPosts, type ManagedNewsPost } from "../lib/news-store";
import { articleSchema } from "../lib/article-schema";
import { absoluteUrl } from "../lib/site";

export const Route = createFileRoute("/admin/posts")({
  component: AdminPostsPage,
  head: () => ({
    meta: [{ title: "Article Drafts | CPM Int'l Research Institute" }, { name: "robots", content: "noindex, nofollow" }],
  }),
});

const categories = ["Research", "Partnerships", "Publication", "Innovation", "Training"];
const slugify = (title: string) => title.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

type PostForm = Omit<ManagedNewsPost, "id" | "updatedAt">;

const emptyForm: PostForm = {
  title: "",
  excerpt: "",
  content: "",
  date: new Date().toISOString().slice(0, 10),
  author: "",
  category: "Research",
  featured: false,
  status: "draft",
  slug: "",
  kind: "news",
  seoTitle: "",
  seoDescription: "",
  imageUrl: "",
  imageAlt: "",
  eventLocation: "",
  eventDate: "",
  authorType: "Organization",
};

function AdminPostsPage() {
  const [posts, setPosts] = useState<ManagedNewsPost[]>([]);
  const [form, setForm] = useState<PostForm>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showEditor, setShowEditor] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    setPosts(getManagedNewsPosts());
  }, []);

  const updateForm = <Key extends keyof PostForm>(key: Key, value: PostForm[Key]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const beginNewPost = () => {
    setEditingId(null);
    setForm({ ...emptyForm, date: new Date().toISOString().slice(0, 10) });
    setShowEditor(true);
    setShowPreview(false);
    setNotice("");
  };

  const editPost = (post: ManagedNewsPost) => {
    const { id: _id, updatedAt: _updatedAt, ...postForm } = post;
    setEditingId(post.id);
    setForm({ ...emptyForm, ...postForm, kind: postForm.kind ?? (postForm.category === "Events" ? "event" : "news"), category: postForm.category === "Events" || postForm.category === "Partnership" ? "Partnerships" : postForm.category });
    setShowEditor(true);
    setShowPreview(false);
    setNotice("");
  };

  const persistPost = (status: PostForm["status"]) => {
    if (!form.title.trim() || !form.excerpt.trim() || !form.content.trim() || !form.author.trim()) {
      setNotice("Add a title, summary, article body, and author before saving.");
      return;
    }

    const post: ManagedNewsPost = {
      ...form,
      status,
      id:
        editingId ??
        `${Date.now()}-${form.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")}`,
      updatedAt: new Date().toISOString(),
    };
    const nextPosts = editingId
      ? posts.map((existingPost) => (existingPost.id === editingId ? post : existingPost))
      : [post, ...posts];

    setPosts(nextPosts);
    saveManagedNewsPosts(nextPosts);
    setEditingId(post.id);
    setForm({ ...post });
    setNotice(status === "published" ? "Marked ready in this browser. Export the article for publication on the website." : "Draft saved in this browser.");
  };

  const exportArticle = () => {
    const kind = form.kind ?? "news";
    const result = articleSchema.safeParse({
      slug: form.slug?.trim() || slugify(form.title), title: form.title.trim(), summary: form.excerpt.trim(),
      kind, topic: form.category, date: form.date, author: { name: form.author.trim(), type: form.authorType ?? "Organization" }, featured: form.featured,
      ...(form.imageUrl?.trim() ? { image: { src: form.imageUrl.trim(), alt: form.imageAlt?.trim() || "" } } : {}),
      ...(kind === "event" ? { event: { date: form.eventDate || form.date, location: form.eventLocation?.trim() || "" } } : {}),
      body: form.content.trim().split(/\n\s*\n/).filter(Boolean).map((text) => text.startsWith("## ") ? { type: "heading", text: text.slice(3).trim() } : { type: "paragraph", text: text.trim() }),
      seo: { title: form.seoTitle?.trim() || `${form.title.trim()} | CPM Int’l`, description: form.seoDescription?.trim() || form.excerpt.trim() },
    });
    if (!result.success) { setNotice(result.error.issues.map((issue) => `${issue.path.join(" ")}: ${issue.message}`).join(" · ")); return; }
    const url = URL.createObjectURL(new Blob([JSON.stringify(result.data, null, 2) + "\n"], { type: "application/json" }));
    const link = document.createElement("a"); link.href = url; link.download = `${result.data.slug}.json`; link.click(); URL.revokeObjectURL(url);
    setNotice("Article exported with its SEO information. Send this file to your website publisher; exporting does not make it public.");
  };

  const deletePost = (postId: string) => {
    const nextPosts = posts.filter((post) => post.id !== postId);
    setPosts(nextPosts);
    saveManagedNewsPosts(nextPosts);
    if (editingId === postId) beginNewPost();
    setNotice("Post deleted.");
  };

  return (
    <div className="min-h-screen bg-muted/20 text-foreground">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-6 py-5 lg:px-10">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              CPM Int'l content
            </p>
            <h1 className="mt-2 font-serif text-3xl leading-tight">Article drafts</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/news"
              className="hidden items-center gap-2 border border-border bg-background px-4 py-2 text-sm font-medium transition hover:border-primary sm:inline-flex"
            >
              <Eye className="h-4 w-4" aria-hidden />
              View News &amp; Events
            </Link>
            <button
              type="button"
              onClick={beginNewPost}
              className="inline-flex items-center gap-2 bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
            >
              <Plus className="h-4 w-4" aria-hidden />
              New post
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1400px] px-6 pt-6 lg:px-10"><p className="border border-primary/20 bg-primary/5 px-5 py-4 text-sm leading-6">Drafts are saved on this device. Export a finished article and send it to your website publisher to make it available to visitors and search engines.</p></div>
      <main className="mx-auto grid max-w-[1400px] gap-8 px-6 py-8 lg:grid-cols-[minmax(250px,1fr)_minmax(0,2fr)] lg:px-10 lg:py-12">
        <section>
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Workspace</p>
              <h2 className="mt-2 font-serif text-2xl">Your posts</h2>
            </div>
            <span className="text-sm text-muted-foreground">
              {posts.length} {posts.length === 1 ? "post" : "posts"}
            </span>
          </div>

          {posts.length === 0 ? (
            <div className="border border-dashed border-border bg-background px-6 py-16 text-center">
              <FileText className="mx-auto h-8 w-8 text-primary" aria-hidden />
              <h3 className="mt-4 font-serif text-xl">Start your newsroom</h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                Write a story, prepare its search information, and export it for publication.
              </p>
              <button
                type="button"
                onClick={beginNewPost}
                className="mt-6 inline-flex items-center gap-2 bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
              >
                <Plus className="h-4 w-4" aria-hidden />
                Create first post
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="flex flex-col gap-4 border border-border bg-background p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
                      <span
                        className={`px-2 py-1 font-medium ${post.status === "published" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}
                      >
                        {post.status === "published" ? "Ready for publication" : "Draft"}
                      </span>
                      <span className="text-muted-foreground">{post.category}</span>
                    </div>
                    <h3 className="truncate font-serif text-xl">{post.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Updated{" "}
                      {new Date(post.updatedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      onClick={() => editPost(post)}
                      className="inline-flex items-center gap-2 border border-border px-3 py-2 text-sm font-medium transition hover:border-primary"
                      aria-label={`Edit ${post.title}`}
                    >
                      <Pencil className="h-3.5 w-3.5" aria-hidden />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => deletePost(post.id)}
                      className="inline-flex h-9 w-9 items-center justify-center border border-border text-muted-foreground transition hover:border-destructive hover:text-destructive"
                      aria-label={`Delete ${post.title}`}
                    >
                      <Trash2 className="h-4 w-4" aria-hidden />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {showEditor && (
          <section className="border border-border bg-background p-6 lg:p-7">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-primary">
                  {editingId ? "Edit post" : "Create post"}
                </p>
                <h2 className="mt-2 font-serif text-2xl">
                  {editingId ? "Refine your story" : "Tell the next story"}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setShowEditor(false)}
                className="inline-flex h-8 w-8 items-center justify-center border border-border text-muted-foreground hover:text-foreground"
                aria-label="Close editor"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>

            <div className="space-y-5">
              <label className="block text-sm font-medium">Story type<select value={form.kind ?? "news"} onChange={(event) => updateForm("kind", event.target.value as "news" | "event")} className="mt-2 w-full border border-input bg-background px-3 py-2.5 text-sm"><option value="news">News</option><option value="event">Event report</option></select></label>
              <label className="block text-sm font-medium">
                Title
                <input
                  value={form.title}
                  onChange={(event) => updateForm("title", event.target.value)}
                  placeholder="A clear, memorable headline"
                  className="mt-2 w-full border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                />
              </label>
              <label className="block text-sm font-medium">
                Summary
                <textarea
                  value={form.excerpt}
                  onChange={(event) => updateForm("excerpt", event.target.value)}
                  placeholder="One or two sentences for the News page"
                  rows={3}
                  className="mt-2 w-full resize-y border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                />
              </label>
              <label className="block text-sm font-medium">
                Article body
                <textarea
                  value={form.content}
                  onChange={(event) => updateForm("content", event.target.value)}
                  placeholder="Write the full update here. Separate paragraphs with a blank line. Start a section heading with ##."
                  rows={8}
                  className="mt-2 w-full resize-y border border-input bg-background px-3 py-2.5 text-sm leading-relaxed outline-none focus:border-primary"
                />
              </label>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
                <label className="block text-sm font-medium">
                  Author
                  <input
                    value={form.author}
                    onChange={(event) => updateForm("author", event.target.value)}
                    placeholder="Team or person"
                    className="mt-2 w-full border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                  />
                </label>
                <label className="block text-sm font-medium">Author type<select value={form.authorType ?? "Organization"} onChange={(event) => updateForm("authorType", event.target.value as "Person" | "Organization")} className="mt-2 w-full border border-input bg-background px-3 py-2.5 text-sm"><option value="Organization">Institute or team</option><option value="Person">Individual author</option></select></label>
                <label className="block text-sm font-medium">
                  Topic
                  <select
                    value={form.category}
                    onChange={(event) => updateForm("category", event.target.value)}
                    className="mt-2 w-full border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                  >
                    {categories.map((category) => (
                      <option key={category}>{category}</option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm font-medium">
                  Publish date
                  <input
                    type="date"
                    value={form.date}
                    onChange={(event) => updateForm("date", event.target.value)}
                    className="mt-2 w-full border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                  />
                </label>
              </div>
              <label className="flex items-center gap-3 text-sm font-medium">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(event) => updateForm("featured", event.target.checked)}
                  className="h-4 w-4 accent-primary"
                />
                Feature this story in News &amp; Events
              </label>
              {form.kind === "event" && <div className="grid gap-5 sm:grid-cols-2"><label className="block text-sm font-medium">Event location<input value={form.eventLocation ?? ""} onChange={(event) => updateForm("eventLocation", event.target.value)} className="mt-2 w-full border border-input bg-background px-3 py-2.5 text-sm" /></label><label className="block text-sm font-medium">Event date<input type="date" value={form.eventDate ?? ""} onChange={(event) => updateForm("eventDate", event.target.value)} className="mt-2 w-full border border-input bg-background px-3 py-2.5 text-sm" /></label></div>}
              <fieldset className="space-y-5 border-t border-border pt-5"><legend className="px-2 font-serif text-xl">Article image</legend><label className="block text-sm font-medium">Image URL or website path<input value={form.imageUrl ?? ""} onChange={(event) => updateForm("imageUrl", event.target.value)} placeholder="/research-visit.jpg" className="mt-2 w-full border border-input bg-background px-3 py-2.5 text-sm" /></label><label className="block text-sm font-medium">Image description (alt text)<input value={form.imageAlt ?? ""} onChange={(event) => updateForm("imageAlt", event.target.value)} placeholder="Describe the people or activity shown" className="mt-2 w-full border border-input bg-background px-3 py-2.5 text-sm" /></label></fieldset>
              <fieldset className="space-y-5 border-t border-border pt-5"><legend className="px-2 font-serif text-xl">Search engine information</legend>
                <label className="block text-sm font-medium">Article URL<input value={form.slug ?? ""} onChange={(event) => updateForm("slug", event.target.value)} placeholder={slugify(form.title) || "descriptive-article-name"} className="mt-2 w-full border border-input bg-background px-3 py-2.5 text-sm" /><span className="mt-1 block text-xs font-normal text-muted-foreground">Use lowercase words separated by hyphens. Keep this address stable after publication.</span></label>
                <label className="block text-sm font-medium">SEO title<input value={form.seoTitle ?? ""} onChange={(event) => updateForm("seoTitle", event.target.value)} placeholder={`${form.title || "Article title"} | CPM Int’l`} className="mt-2 w-full border border-input bg-background px-3 py-2.5 text-sm" /><span className="mt-1 block text-xs font-normal text-muted-foreground">{(form.seoTitle || `${form.title} | CPM Int’l`).length} characters. Keep it clear and specific.</span></label>
                <label className="block text-sm font-medium">Search description<textarea value={form.seoDescription ?? ""} onChange={(event) => updateForm("seoDescription", event.target.value)} placeholder={form.excerpt || "A concise summary of this article"} rows={3} className="mt-2 w-full border border-input bg-background px-3 py-2.5 text-sm" /><span className="mt-1 block text-xs font-normal text-muted-foreground">{(form.seoDescription || form.excerpt).length} characters. Used for search and social previews.</span></label>
                <div className="border border-border bg-card p-4"><p className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">Search preview</p><p className="break-all text-xs text-muted-foreground">{absoluteUrl(`/news/${form.slug || slugify(form.title) || "article-name"}`)}</p><p className="mt-2 text-lg text-primary">{form.seoTitle || `${form.title || "Article title"} | CPM Int’l`}</p><p className="mt-1 text-sm leading-6 text-muted-foreground">{form.seoDescription || form.excerpt || "Your article description will appear here."}</p></div>
              </fieldset>
            </div>

            {notice && (
              <p role="status" className="mt-5 border border-primary/30 bg-primary/5 px-3 py-2 text-sm text-primary">
                {notice}
              </p>
            )}

            <div className="mt-6 flex flex-wrap gap-2 border-t border-border pt-5">
              <button type="button" onClick={exportArticle} className="inline-flex min-h-11 items-center gap-2 bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"><Download className="h-4 w-4" aria-hidden />Export article</button>
              <button
                type="button"
                onClick={() => persistPost("draft")}
                className="inline-flex items-center gap-2 border border-border px-3 py-2 text-sm font-medium transition hover:border-primary"
              >
                <Save className="h-4 w-4" aria-hidden />
                Save draft
              </button>
              <button
                type="button"
                onClick={() => persistPost("published")}
                className="inline-flex items-center gap-2 bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
              >
                <Send className="h-4 w-4" aria-hidden />
                Mark ready
              </button>
              <button
                type="button"
                onClick={() => setShowPreview((current) => !current)}
                className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-primary hover:bg-primary/5"
              >
                <Eye className="h-4 w-4" aria-hidden />
                {showPreview ? "Hide preview" : "Preview"}
              </button>
            </div>

            {showPreview && (
              <div className="mt-6 border-t border-border pt-6">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Preview</p>
                <h3 className="mt-3 font-serif text-2xl leading-tight">
                  {form.title || "Untitled post"}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {form.excerpt || "Your summary will appear here."}
                </p>
                <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
                  <Check className="h-3.5 w-3.5 text-primary" aria-hidden />
                  {form.category} · {form.author || "Author"}
                </div>
                <p className="mt-5 whitespace-pre-wrap text-sm leading-relaxed">
                  {form.content || "Your article body will appear here."}
                </p>
              </div>
            )}
          </section>
        )}
      </main>

      <footer className="mx-auto flex max-w-[1400px] items-center gap-2 px-6 pb-10 text-xs text-muted-foreground lg:px-10">
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
        <Link to="/news" className="hover:text-primary">
          Back to News &amp; Events
        </Link>
        <span className="ml-2">
          Drafts stay on this device until exported for publication.
        </span>
      </footer>
    </div>
  );
}
