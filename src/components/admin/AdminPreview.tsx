import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  FileText,
  History,
  Image as ImageIcon,
  LayoutDashboard,
  ListChecks,
  LockKeyhole,
  Menu,
  Plus,
  Search,
  Settings2,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "../ui/sheet";
import { SITE } from "../../lib/site";
import { formatArticleDate } from "../../lib/articles";
import type { Article } from "../../lib/article-schema";
import {
  articles,
  newPreviewDraft,
  previewMedia,
  type PreviewActivity,
  type PreviewDraft,
  type PreviewSearch,
  type PreviewView,
} from "./preview-data";
import { PreviewEditor } from "./PreviewEditor";
import "./admin-preview.css";

const navigation = [
  { view: "overview", label: "Overview", icon: LayoutDashboard },
  { view: "articles", label: "Articles", icon: FileText },
  { view: "review", label: "Review queue", icon: ListChecks },
  { view: "media", label: "Media library", icon: ImageIcon },
  { view: "team", label: "Team & access", icon: Users },
  { view: "activity", label: "Activity", icon: History },
  { view: "settings", label: "Settings", icon: Settings2 },
] as const;

type Props = { search: PreviewSearch; navigate: (search: PreviewSearch) => void };
export function AdminPreview({ search, navigate }: Props) {
  const [drafts, setDrafts] = useState<PreviewDraft[]>([]);
  const [activity, setActivity] = useState<PreviewActivity[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const view = search.view ?? "overview";
  const draft = drafts.find((item) => item.id === search.article);
  const reviews = drafts.filter((item) => item.status === "review");
  useEffect(() => {
    if (!drafts.length) return;
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [drafts.length]);
  const go = (next: PreviewView) => {
    setMenuOpen(false);
    navigate({ view: next });
  };
  const log = (title: string, detail: string) =>
    setActivity((items) => [
      { id: crypto.randomUUID(), title, detail, time: new Date().toISOString() },
      ...items,
    ]);
  const startDraft = (article?: Article) => {
    const existing = article && drafts.find((item) => item.sourceSlug === article.slug);
    const next = existing || newPreviewDraft(article);
    if (!existing) {
      setDrafts((items) => [next, ...items]);
      log(article ? "Revision started" : "Draft created", article?.title || "Untitled article");
    }
    navigate({ view: "editor", article: next.id });
  };
  const changeDraft = (next: PreviewDraft) =>
    setDrafts((items) => items.map((item) => (item.id === next.id ? next : item)));
  const saveDraft = (next: PreviewDraft, submit = false) => {
    const saved = {
      ...next,
      dirty: false,
      savedAt: new Date().toISOString(),
      status: submit ? ("review" as const) : ("draft" as const),
    };
    changeDraft(saved);
    log(
      submit ? "Added to preview review queue" : "Draft saved in this tab",
      next.article.title || "Untitled article",
    );
    if (submit) go("review");
  };
  const nav = (
    <nav aria-label="Admin navigation">
      <p className="ap-nav-label">Workspace</p>
      {navigation.map(({ view: item, label, icon: Icon }) => (
        <button
          key={item}
          type="button"
          onClick={() => go(item)}
          aria-current={
            view === item || (view === "editor" && item === "articles") ? "page" : undefined
          }
        >
          <Icon size={18} strokeWidth={1.6} aria-hidden />
          <span>{label}</span>
          {item === "review" && reviews.length > 0 && (
            <span className="ap-nav-count">{reviews.length}</span>
          )}
        </button>
      ))}
    </nav>
  );

  return (
    <div className="admin-preview">
      <a className="ap-skip" href="#admin-main">
        Skip to content
      </a>
      <aside className="ap-sidebar">
        <a href="/" className="ap-logo" aria-label="CPM Int’l website">
          <img
            src="/logo_8-removebg-preview.png"
            alt="CPM Int’l Research Institute"
            width="180"
            height="52"
          />
        </a>
        {nav}
        <div className="ap-sidebar-bottom">
          <p className="ap-nav-label">Editorial workspace</p>
          <p>
            CPM Int’l
            <br />
            <span>Research Institute for Climate Health</span>
          </p>
          <button type="button" onClick={() => go("login")}>
            <LockKeyhole size={16} aria-hidden /> Preview sign-in{" "}
            <ArrowUpRight size={14} aria-hidden />
          </button>
        </div>
      </aside>
      <div className="ap-workspace">
        <header className="ap-topbar">
          <div className="ap-topbar-path">
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className="ap-icon-button ap-menu"
                  aria-label="Open admin menu"
                >
                  <Menu size={20} />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="admin-preview ap-mobile-nav">
                <SheetTitle className="font-serif text-2xl">CPM Int’l</SheetTitle>
                <SheetDescription>Editorial workspace navigation</SheetDescription>
                {nav}
              </SheetContent>
            </Sheet>
            <span>Editorial workspace</span>
            <ChevronRight size={13} aria-hidden />
            <strong>
              {view === "editor"
                ? "Edit article"
                : view === "login"
                  ? "Staff sign-in"
                  : navigation.find((item) => item.view === view)?.label}
            </strong>
          </div>
          <a href="/" target="_blank" rel="noreferrer" className="ap-website">
            View website <ArrowUpRight size={15} aria-hidden />
          </a>
        </header>
        <div className="ap-preview-notice">
          <span>Design preview</span>
          <p>
            Explore the admin layout. Draft changes stay in this tab and reset on refresh.
            Publishing is not connected.
          </p>
        </div>
        <main
          id="admin-main"
          className={`ap-main ${view === "editor" ? "ap-main-editor" : ""}`}
          tabIndex={-1}
        >
          {view === "overview" && (
            <>
              <PageTitle
                eyebrow="Editorial desk"
                title="A home for your stories."
                description="Manage the research news, collaborations and events you share with the world."
                action={
                  <button className="ap-button" onClick={() => startDraft()}>
                    <Plus size={17} aria-hidden /> New article
                  </button>
                }
              />
              <div className="ap-stats">
                {[
                  {
                    label: "Published articles",
                    value: articles.length,
                    detail: "In the current website collection",
                    view: "articles",
                  },
                  {
                    label: "Drafts in this preview",
                    value: drafts.filter((item) => item.status !== "review").length,
                    detail: "Work in progress",
                    view: "articles",
                  },
                  {
                    label: "Awaiting review",
                    value: reviews.length,
                    detail: "Ready for an editorial check",
                    view: "review",
                  },
                  {
                    label: "Event reports",
                    value: articles.filter((item) => item.kind === "event").length,
                    detail: "Part of your published collection",
                    view: "articles",
                  },
                ].map((stat) => (
                  <button
                    className="ap-stat"
                    key={stat.label}
                    onClick={() => go(stat.view as PreviewView)}
                  >
                    <span>{stat.label}</span>
                    <strong>{stat.value.toString().padStart(2, "0")}</strong>
                    <small>{stat.detail}</small>
                  </button>
                ))}
              </div>
              <div className="ap-overview-grid">
                <section className="ap-panel">
                  <div className="ap-section-top">
                    <div>
                      <p className="ap-eyebrow">On the website</p>
                      <h2>Recent articles</h2>
                    </div>
                    <button className="ap-text-button" onClick={() => go("articles")}>
                      View all <ArrowRight size={16} aria-hidden />
                    </button>
                  </div>
                  <div className="ap-recent-list">
                    {articles.slice(0, 4).map((article) => (
                      <button
                        className="ap-recent-row"
                        key={article.slug}
                        onClick={() => startDraft(article)}
                      >
                        <ArticleThumb article={article} />
                        <span>
                          <small>
                            {article.topic} <span aria-hidden>·</span>{" "}
                            {formatArticleDate(article.date)}
                          </small>
                          <strong>{article.title}</strong>
                          <span className="ap-byline">{article.author.name}</span>
                        </span>
                        <ArrowUpRight size={17} aria-hidden />
                      </button>
                    ))}
                  </div>
                </section>
                <aside className="ap-flow-panel">
                  <p className="ap-eyebrow">The editorial process</p>
                  <h2>
                    Good work,
                    <br />
                    thoughtfully published.
                  </h2>
                  <ol>
                    {[
                      {
                        title: "Prepare the story",
                        text: "Write, add photographs and check the article details.",
                      },
                      {
                        title: "Review together",
                        text: "Preview the page and resolve editorial feedback.",
                      },
                      {
                        title: "Publish with confidence",
                        text: "Release the approved version with its search information.",
                      },
                    ].map((step, index) => (
                      <li key={step.title}>
                        <span>{index + 1}</span>
                        <div>
                          <h3>{step.title}</h3>
                          <p>{step.text}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                  <button className="ap-text-button" onClick={() => go("team")}>
                    How access works <ArrowRight size={16} aria-hidden />
                  </button>
                </aside>
              </div>
              <section className="ap-bottom-note">
                <ShieldCheck size={22} aria-hidden />
                <div>
                  <h2>Your live articles stay intact.</h2>
                  <p>
                    Opening a published article here creates a preview revision. Your website
                    changes only when the real publishing service is connected and an authorized
                    publisher releases an update.
                  </p>
                </div>
              </section>
            </>
          )}
          {view === "articles" && (
            <ArticleList
              drafts={drafts}
              startDraft={startDraft}
              edit={(id) => navigate({ view: "editor", article: id })}
            />
          )}
          {view === "editor" &&
            (draft ? (
              <PreviewEditor
                key={draft.id}
                draft={draft}
                update={changeDraft}
                save={saveDraft}
                back={() => go("articles")}
              />
            ) : (
              <EmptyState
                icon={FileText}
                title="Choose an article to work on"
                description="Open a published story as a preview revision, or start a new draft."
                action={
                  <button className="ap-button" onClick={() => go("articles")}>
                    Browse articles <ArrowRight size={16} aria-hidden />
                  </button>
                }
              />
            ))}
          {view === "review" && (
            <>
              <PageTitle
                eyebrow="Editorial review"
                title="Ready for a second look."
                description="Review the proposed article before it reaches the website."
              />
              {reviews.length ? (
                <div className="ap-review-list">
                  {reviews.map((item) => (
                    <section key={item.id} className="ap-panel ap-review-card">
                      <div>
                        <StatusBadge status="review" />
                        <h2>{item.article.title}</h2>
                        <p>{item.article.summary}</p>
                        <small>
                          {item.article.author.name} · {item.article.topic}
                        </small>
                      </div>
                      <div className="ap-review-actions">
                        <button
                          className="ap-button"
                          onClick={() => navigate({ view: "editor", article: item.id })}
                        >
                          Review article <ArrowRight size={16} aria-hidden />
                        </button>
                        <p>
                          Publishing will require a connected backend and an authorized account.
                        </p>
                      </div>
                    </section>
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={ListChecks}
                  title="The review queue is clear"
                  description="Create a preview draft, complete its details and submit it for review to explore this workflow."
                  action={
                    <button className="ap-button" onClick={() => startDraft()}>
                      Create a draft <Plus size={16} aria-hidden />
                    </button>
                  }
                />
              )}
              <div className="ap-info-line">
                <LockKeyhole size={18} aria-hidden />
                <p>
                  Only the Owner or a designated Publisher will be able to approve and publish.
                  Contributors prepare and submit their assigned work.
                </p>
              </div>
            </>
          )}
          {view === "media" && <MediaLibrary />}
          {view === "team" && <TeamAccess />}
          {view === "activity" && (
            <>
              <PageTitle
                eyebrow="Editorial record"
                title="Activity"
                description="Actions taken during this preview session. The production admin will keep a permanent, attributed record."
              />
              {activity.length ? (
                <div className="ap-panel ap-activity-list">
                  {activity.map((item) => (
                    <div key={item.id}>
                      <History size={18} aria-hidden />
                      <div>
                        <strong>{item.title}</strong>
                        <p>{item.detail}</p>
                      </div>
                      <time dateTime={item.time}>
                        {new Intl.DateTimeFormat("en-GB", {
                          hour: "2-digit",
                          minute: "2-digit",
                          timeZone: "Africa/Lagos",
                        }).format(new Date(item.time))}
                      </time>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={History}
                  title="No preview activity yet"
                  description="Actions such as creating a draft and submitting it for review will appear here."
                />
              )}
            </>
          )}
          {view === "settings" && <WorkspaceSettings />}
          {view === "login" && <LoginPreview />}
        </main>
        <footer className="ap-footer">
          <span>CPM Int’l · Editorial workspace</span>
          <span>Interface preview · Africa/Lagos</span>
        </footer>
      </div>
    </div>
  );
}

export function PageTitle({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="ap-page-title">
      <div>
        <p className="ap-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="ap-description">{description}</p>
      </div>
      {action && <div className="ap-title-action">{action}</div>}
    </div>
  );
}
export function StatusBadge({ status }: { status: PreviewDraft["status"] | "published" }) {
  return (
    <span className={`ap-status ap-status-${status}`}>
      <span aria-hidden />
      {
        {
          draft: "Draft",
          review: "In review",
          changes: "Changes requested",
          published: "Published",
        }[status]
      }
    </span>
  );
}
function ArticleThumb({ article }: { article: Article }) {
  return article.image ? (
    <img className="ap-article-thumb" src={article.image.src} alt="" loading="lazy" />
  ) : (
    <span className="ap-article-thumb ap-thumb-empty">
      <FileText size={22} strokeWidth={1.5} aria-hidden />
    </span>
  );
}
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: typeof FileText;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <section className="ap-empty">
      <Icon size={30} strokeWidth={1.3} aria-hidden />
      <h2>{title}</h2>
      <p>{description}</p>
      {action}
    </section>
  );
}

function ArticleList({
  drafts,
  startDraft,
  edit,
}: {
  drafts: PreviewDraft[];
  startDraft: (article?: Article) => void;
  edit: (id: string) => void;
}) {
  const [tab, setTab] = useState("all");
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState("all");
  const rows = [
    ...drafts.map((draft) => ({
      id: draft.id,
      article: draft.article,
      status: draft.status,
      draft: true,
    })),
    ...articles.map((article) => ({
      id: article.slug,
      article,
      status: "published" as const,
      draft: false,
    })),
  ];
  const filtered = rows.filter(
    (row) =>
      (tab === "all" ||
        (tab === "draft" ? ["draft", "changes"].includes(row.status) : row.status === tab)) &&
      (kind === "all" || row.article.kind === kind) &&
      `${row.article.title} ${row.article.author.name} ${row.article.topic}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <>
      <PageTitle
        eyebrow="News & events"
        title="Articles"
        description="Keep every story, draft and proposed update in one place."
        action={
          <button className="ap-button" onClick={() => startDraft()}>
            <Plus size={17} aria-hidden /> New article
          </button>
        }
      />
      <div className="ap-list-controls">
        <div className="ap-filter-tabs" role="group" aria-label="Article status">
          {[
            { id: "all", label: "All articles" },
            { id: "published", label: "Published" },
            { id: "draft", label: "Drafts" },
            { id: "review", label: "In review" },
          ].map((item) => (
            <button key={item.id} aria-pressed={tab === item.id} onClick={() => setTab(item.id)}>
              {item.label}
              <span>
                {
                  rows.filter(
                    (row) =>
                      item.id === "all" ||
                      (item.id === "draft"
                        ? ["draft", "changes"].includes(row.status)
                        : row.status === item.id),
                  ).length
                }
              </span>
            </button>
          ))}
        </div>
        <div className="ap-search-row">
          <label className="ap-search">
            <Search size={17} aria-hidden />
            <span className="sr-only">Search articles</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by title, author or topic"
            />
          </label>
          <label>
            <span className="sr-only">Article type</span>
            <select
              aria-label="Article type"
              value={kind}
              onChange={(event) => setKind(event.target.value)}
            >
              <option value="all">All types</option>
              <option value="news">News</option>
              <option value="event">Event reports</option>
            </select>
          </label>
        </div>
      </div>
      <div className="ap-article-table">
        <div className="ap-table-labels" aria-hidden>
          <span>Article</span>
          <span>Status</span>
          <span>Published</span>
          <span />
        </div>
        {filtered.map((row) => (
          <div className="ap-table-row" key={row.id}>
            <button
              className="ap-article-title"
              onClick={() => (row.draft ? edit(row.id) : startDraft(row.article))}
            >
              <ArticleThumb article={row.article} />
              <span>
                <small>
                  {row.article.kind === "event" ? "Event report" : "News"} · {row.article.topic}
                </small>
                <strong>{row.article.title || "Untitled article"}</strong>
                <span className="ap-byline">{row.article.author.name}</span>
              </span>
            </button>
            <StatusBadge status={row.status} />
            <span className="ap-row-date">
              {row.draft ? "Preview draft" : formatArticleDate(row.article.date)}
            </span>
            <button
              className="ap-icon-button"
              aria-label={`${row.draft ? "Edit draft" : "Create revision"}: ${row.article.title || "Untitled article"}`}
              onClick={() => (row.draft ? edit(row.id) : startDraft(row.article))}
            >
              <ArrowUpRight size={18} aria-hidden />
            </button>
          </div>
        ))}
      </div>
      {!filtered.length && (
        <EmptyState
          icon={Search}
          title="No matching articles"
          description="Try a different search or reset the filters."
          action={
            <button
              className="ap-button ap-button-outline"
              onClick={() => {
                setQuery("");
                setKind("all");
                setTab("all");
              }}
            >
              Reset filters
            </button>
          }
        />
      )}
      <p className="ap-results-count">
        {filtered.length} {filtered.length === 1 ? "article" : "articles"} shown. Published articles
        are read from the current website collection.
      </p>
    </>
  );
}

function MediaLibrary() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<(typeof previewMedia)[number] | null>(null);
  const media = previewMedia.filter((item) =>
    `${item.alt} ${item.caption || ""} ${item.usedBy.join(" ")}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  return (
    <>
      <PageTitle
        eyebrow="Photographs & galleries"
        title="Media library"
        description="Find the images already used across your published articles."
        action={
          <button className="ap-button" disabled title="Uploads require connected storage">
            <Plus size={17} aria-hidden /> Upload images
          </button>
        }
      />
      <div className="ap-media-toolbar">
        <label className="ap-search">
          <Search size={17} aria-hidden />
          <span className="sr-only">Search images</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search images or article titles"
          />
        </label>
        <p>{media.length} images</p>
      </div>
      <div className="ap-media-grid">
        {media.map((item) => (
          <button key={item.src} className="ap-media-card" onClick={() => setSelected(item)}>
            <img src={item.src} alt={item.alt} loading="lazy" />
            <span>
              <strong>{item.alt}</strong>
              <small>
                Used in {item.usedBy.length} {item.usedBy.length === 1 ? "article" : "articles"}
              </small>
            </span>
          </button>
        ))}
      </div>
      {!media.length && (
        <EmptyState
          icon={ImageIcon}
          title="No images found"
          description="Try searching by the article title or photograph description."
        />
      )}
      <Sheet
        open={Boolean(selected)}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <SheetContent className="admin-preview ap-media-details sm:max-w-lg overflow-y-auto">
          <SheetTitle>Image details</SheetTitle>
          <SheetDescription>Existing published photograph</SheetDescription>
          {selected && (
            <>
              <img src={selected.src} alt={selected.alt} />
              <dl>
                <dt>Alternative text</dt>
                <dd>{selected.alt}</dd>
                {selected.caption && (
                  <>
                    <dt>Caption</dt>
                    <dd>{selected.caption}</dd>
                  </>
                )}
                <dt>Used in</dt>
                <dd>
                  {selected.usedBy.map((title) => (
                    <p key={title}>{title}</p>
                  ))}
                </dd>
              </dl>
            </>
          )}
        </SheetContent>
      </Sheet>
      <p className="ap-results-count">
        The library currently shows existing public images. New uploads will be enabled when shared
        storage is connected.
      </p>
    </>
  );
}

function TeamAccess() {
  return (
    <>
      <PageTitle
        eyebrow="People & permissions"
        title="Team & access"
        description="A clear responsibility for every person in the publishing process."
        action={
          <button
            className="ap-button"
            disabled
            title="Invitations require connected authentication"
          >
            <Plus size={17} aria-hidden /> Invite a colleague
          </button>
        }
      />
      <div className="ap-roles">
        {[
          {
            name: "Owner",
            icon: ShieldCheck,
            text: "Responsible for the institute’s workspace.",
            permissions: [
              "Manage staff and account access",
              "Review and publish every article",
              "Manage publisher settings",
            ],
          },
          {
            name: "Publisher",
            icon: CheckCircle2,
            text: "Entrusted with the final editorial decision.",
            permissions: [
              "Review submissions and request changes",
              "Publish and update articles",
              "Manage the published collection",
            ],
          },
          {
            name: "Contributor",
            icon: BookOpen,
            text: "Focused on preparing accurate, useful stories.",
            permissions: [
              "Write own or assigned articles",
              "Prepare photographs and article details",
              "Submit work for editorial review",
            ],
          },
        ].map(({ name, icon: Icon, text, permissions }) => (
          <section key={name} className="ap-panel ap-role-card">
            <Icon size={26} strokeWidth={1.4} aria-hidden />
            <h2>{name}</h2>
            <p>{text}</p>
            <ul>
              {permissions.map((permission) => (
                <li key={permission}>
                  <Check size={15} aria-hidden />
                  {permission}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <EmptyState
        icon={Users}
        title="Staff accounts will appear here"
        description="Start with the institute owner, then invite contributors. Authentication and two-factor setup are part of the backend connection stage."
      />
    </>
  );
}
function WorkspaceSettings() {
  return (
    <>
      <PageTitle
        eyebrow="Publishing defaults"
        title="Workspace settings"
        description="The shared details that keep your articles consistent."
      />
      <div className="ap-settings-grid">
        <section className="ap-panel ap-settings-card">
          <h2>Publisher identity</h2>
          <dl>
            <dt>Institute</dt>
            <dd>{SITE.name}</dd>
            <dt>Website</dt>
            <dd>{SITE.url}</dd>
            <dt>Headquarters</dt>
            <dd>{SITE.address}</dd>
            <dt>Editorial timezone</dt>
            <dd>Africa/Lagos</dd>
          </dl>
          <p className="ap-help">These details are read from the current website configuration.</p>
        </section>
        <section className="ap-panel ap-settings-card">
          <h2>Editorial workflow</h2>
          <dl>
            <dt>Starting arrangement</dt>
            <dd>Owner approves publication. Contributors prepare drafts.</dd>
            <dt>Live article updates</dt>
            <dd>Published content stays live while a new revision is reviewed.</dd>
            <dt>New staff accounts</dt>
            <dd>Invitation only</dd>
            <dt>Search information</dt>
            <dd>Article metadata and the sitemap update on publication.</dd>
          </dl>
        </section>
      </div>
    </>
  );
}
function LoginPreview() {
  return (
    <div className="ap-login">
      <p className="ap-eyebrow">CPM Int’l editorial workspace</p>
      <h1>Welcome back.</h1>
      <p>Sign in to prepare, review and publish institute news.</p>
      <form onSubmit={(event) => event.preventDefault()}>
        <label>
          Email address
          <input type="email" autoComplete="off" placeholder="Your institute email" disabled />
        </label>
        <label>
          Password
          <input type="password" autoComplete="off" placeholder="Your password" disabled />
        </label>
        <button className="ap-button" type="submit" disabled>
          Sign in <ArrowRight size={16} aria-hidden />
        </button>
      </form>
      <p className="ap-login-note">
        <LockKeyhole size={18} aria-hidden />
        This is the sign-in layout. Accounts and password recovery will be enabled when
        authentication is connected.
      </p>
    </div>
  );
}
