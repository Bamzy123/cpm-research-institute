import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Check, Eye, FileText, Pencil, Plus, Save, Send, Trash2, X } from "lucide-react";
import { getManagedNewsPosts, saveManagedNewsPosts, type ManagedNewsPost } from "../lib/news-store";

export const Route = createFileRoute("/admin/posts")({
  component: AdminPostsPage,
  head: () => ({
    meta: [{ title: "Post Manager | CPM Int'l Research Institute" }],
  }),
});

const categories = ["Events", "Research", "Partnership", "Publication", "Innovation", "Training"];

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
    setForm(postForm);
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
    setNotice(status === "published" ? "Post published to the News page." : "Draft saved.");
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
            <h1 className="mt-2 font-serif text-3xl leading-tight">Post manager</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/news"
              className="hidden items-center gap-2 border border-border bg-background px-4 py-2 text-sm font-medium transition hover:border-primary sm:inline-flex"
            >
              <Eye className="h-4 w-4" aria-hidden />
              View News
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

      <main className="mx-auto grid max-w-[1400px] gap-8 px-6 py-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-10 lg:py-12">
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
                Create a post, save it as a draft while it is being reviewed, or publish it directly
                to the public News page.
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
                        {post.status === "published" ? "Published" : "Draft"}
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
                  placeholder="Write the full update here..."
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
                <label className="block text-sm font-medium">
                  Category
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
                Feature this post near the top of News
              </label>
            </div>

            {notice && (
              <p className="mt-5 border border-primary/30 bg-primary/5 px-3 py-2 text-sm text-primary">
                {notice}
              </p>
            )}

            <div className="mt-6 flex flex-wrap gap-2 border-t border-border pt-5">
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
                Publish
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
          Back to public News
        </Link>
        <span className="ml-2">
          Browser storage prototype; connect this boundary to authenticated server storage before
          production use.
        </span>
      </footer>
    </div>
  );
}
