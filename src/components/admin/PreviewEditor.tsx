import { useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  ArrowUpRight,
  Check,
  Eye,
  Image as ImageIcon,
  Plus,
  Save,
  Send,
  Trash2,
} from "lucide-react";
import { articleSchema, type Article } from "../../lib/article-schema";
import { SITE } from "../../lib/site";
import { formatArticleDate } from "../../lib/articles";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "../ui/sheet";
import {
  articles,
  previewMedia,
  publicationPayload,
  slugify,
  type PreviewDraft,
} from "./preview-data";

type Props = {
  draft: PreviewDraft;
  update: (draft: PreviewDraft) => void;
  save: (draft: PreviewDraft, submit?: boolean) => void;
  back: () => void;
};
export function PreviewEditor({ draft, update, save, back }: Props) {
  const [tab, setTab] = useState<"content" | "details" | "seo" | "preview">("content");
  const [errors, setErrors] = useState<string[]>([]);
  const [notice, setNotice] = useState("");
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [imageSearch, setImageSearch] = useState("");
  const [reviewNote, setReviewNote] = useState(draft.note || "");
  const article = draft.article;
  const payload = publicationPayload(article);
  const patch = (values: Partial<Article>) => {
    update({ ...draft, article: { ...article, ...values }, dirty: true, status: "draft" });
    setNotice("");
    setErrors([]);
  };
  const savePreview = () => {
    save(draft);
    setNotice("Saved in this preview tab. Refreshing will reset the workspace.");
  };
  const submit = () => {
    const result = articleSchema.safeParse(payload);
    const problems = result.success
      ? []
      : result.error.issues.map((issue) => `${issue.path.join(" ")}: ${issue.message}`);
    if (articles.some((item) => item.slug === payload.slug && item.slug !== draft.sourceSlug))
      problems.push("This URL already belongs to another published article.");
    if (payload.kind === "event" && !payload.event?.location.trim())
      problems.push("Add the event location before submitting an event report.");
    if (problems.length) {
      setErrors(problems);
      return;
    }
    save({ ...draft, article: payload }, true);
  };
  const updateBlock = (index: number, value: Article["body"][number]) =>
    patch({ body: article.body.map((block, position) => (position === index ? value : block)) });
  const moveBlock = (index: number, direction: number) => {
    const body = [...article.body];
    [body[index], body[index + direction]] = [body[index + direction], body[index]];
    patch({ body });
  };
  const readyChecks = [
    { label: "Title and summary", ready: Boolean(article.title.trim() && article.summary.trim()) },
    { label: "Author attribution", ready: Boolean(article.author.name.trim()) },
    {
      label: "Article content",
      ready: article.body.some((block) =>
        block.type === "list" ? block.items.some((item) => item.trim()) : block.text.trim(),
      ),
    },
    { label: "Image description", ready: !article.image || Boolean(article.image.alt.trim()) },
  ];
  return (
    <>
      <button className="ap-text-button ap-back" onClick={back}>
        <ArrowLeft size={15} aria-hidden /> All articles
      </button>
      <div className="ap-editor-header">
        <div>
          <p className="ap-eyebrow">{draft.sourceSlug ? "Proposed revision" : "New story"}</p>
          <h1>{draft.sourceSlug ? "Edit article" : "New article"}</h1>
          <p className="ap-editor-save-status" role="status">
            {draft.dirty
              ? "Unsaved preview changes"
              : draft.status === "review"
                ? "Submitted to the preview review queue"
                : "Saved in this tab"}
          </p>
        </div>
        <div className="ap-editor-actions">
          <button
            className="ap-button ap-button-outline"
            onClick={() => setTab(tab === "preview" ? "content" : "preview")}
          >
            <Eye size={16} aria-hidden />
            {tab === "preview" ? "Back to editing" : "Preview"}
          </button>
          <button className="ap-button" onClick={savePreview}>
            <Save size={16} aria-hidden /> Save preview
          </button>
        </div>
      </div>
      {draft.sourceSlug && (
        <div className="ap-revision-note">
          <p>The published version stays unchanged while you work on this revision.</p>
          <a href={`/news/${draft.sourceSlug}`} target="_blank" rel="noreferrer">
            View live article <ArrowUpRight size={14} aria-hidden />
          </a>
        </div>
      )}
      {notice && (
        <p className="ap-save-notice" role="status">
          <Check size={17} aria-hidden />
          {notice}
        </p>
      )}
      {errors.length > 0 && (
        <div className="ap-errors" role="alert">
          <strong>Check these details before submitting</strong>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="ap-editor-grid">
        <section className="ap-editor-paper">
          <div className="ap-editor-tabs" role="group" aria-label="Editor sections">
            {(["content", "details", "seo", "preview"] as const).map((item) => (
              <button key={item} aria-pressed={tab === item} onClick={() => setTab(item)}>
                {
                  {
                    content: "Content",
                    details: "Article details",
                    seo: "Search & sharing",
                    preview: "Preview",
                  }[item]
                }
              </button>
            ))}
          </div>
          <div className="ap-editor-fields">
            {tab === "content" && (
              <>
                <label className="ap-field">
                  Article title
                  <input
                    className="ap-headline-input"
                    value={article.title}
                    onChange={(event) => patch({ title: event.target.value })}
                    placeholder="Give your story a clear title"
                  />
                </label>
                <label className="ap-field">
                  Summary
                  <textarea
                    value={article.summary}
                    onChange={(event) => patch({ summary: event.target.value })}
                    rows={3}
                    placeholder="Introduce the story in a few sentences."
                  />
                  <small>
                    Appears on article cards and provides the default search description.
                  </small>
                </label>
                <div className="ap-field">
                  <span>Article body</span>
                  <small>Add and arrange paragraphs, headings, quotations and lists.</small>
                </div>
                <div className="ap-block-list">
                  {article.body.map((block, index) => (
                    <div className="ap-body-block" key={index}>
                      <div className="ap-block-toolbar">
                        <label>
                          <span className="sr-only">Block {index + 1} type</span>
                          <select
                            aria-label={`Block ${index + 1} type`}
                            value={block.type}
                            onChange={(event) => {
                              const type = event.target.value as Article["body"][number]["type"];
                              const text =
                                block.type === "list" ? block.items.join("\n") : block.text;
                              updateBlock(
                                index,
                                type === "list"
                                  ? { type, items: text.split("\n") }
                                  : { type, text },
                              );
                            }}
                          >
                            <option value="paragraph">Paragraph</option>
                            <option value="heading">Section heading</option>
                            <option value="quote">Quotation</option>
                            <option value="list">List</option>
                          </select>
                        </label>
                        <span className="ap-block-actions">
                          <button
                            className="ap-icon-button"
                            onClick={() => moveBlock(index, -1)}
                            disabled={index === 0}
                            aria-label={`Move block ${index + 1} up`}
                          >
                            <ArrowUp size={15} />
                          </button>
                          <button
                            className="ap-icon-button"
                            onClick={() => moveBlock(index, 1)}
                            disabled={index === article.body.length - 1}
                            aria-label={`Move block ${index + 1} down`}
                          >
                            <ArrowDown size={15} />
                          </button>
                          <button
                            className="ap-icon-button"
                            onClick={() =>
                              patch({
                                body: article.body.filter((_, position) => position !== index),
                              })
                            }
                            disabled={article.body.length === 1}
                            aria-label={`Remove block ${index + 1}`}
                          >
                            <Trash2 size={15} />
                          </button>
                        </span>
                      </div>
                      <label>
                        <span className="sr-only">Block {index + 1} text</span>
                        <textarea
                          value={block.type === "list" ? block.items.join("\n") : block.text}
                          rows={block.type === "heading" ? 2 : 5}
                          placeholder={
                            block.type === "list"
                              ? "One list item per line"
                              : "Write your story here…"
                          }
                          onChange={(event) =>
                            updateBlock(
                              index,
                              block.type === "list"
                                ? { ...block, items: event.target.value.split("\n") }
                                : { ...block, text: event.target.value },
                            )
                          }
                        />
                      </label>
                    </div>
                  ))}
                </div>
                <button
                  className="ap-text-button ap-add-block"
                  onClick={() =>
                    patch({ body: [...article.body, { type: "paragraph", text: "" }] })
                  }
                >
                  <Plus size={16} aria-hidden /> Add content block
                </button>
              </>
            )}
            {tab === "details" && (
              <>
                <h2>Article details</h2>
                <p className="ap-help">Describe the story and credit the people behind it.</p>
                <div className="ap-field-pair">
                  <label className="ap-field">
                    Article type
                    <select
                      aria-label="Article type"
                      value={article.kind}
                      onChange={(event) => {
                        const kind = event.target.value as Article["kind"];
                        patch({
                          kind,
                          event: kind === "event" ? article.event || { location: "" } : undefined,
                        });
                      }}
                    >
                      <option value="news">News</option>
                      <option value="event">Event report</option>
                    </select>
                  </label>
                  <label className="ap-field">
                    Topic
                    <select
                      aria-label="Topic"
                      value={article.topic}
                      onChange={(event) => patch({ topic: event.target.value })}
                    >
                      {[
                        ...new Set([
                          "Research",
                          "Partnerships",
                          "Publication",
                          "Innovation",
                          "Training",
                          article.topic,
                        ]),
                      ].map((topic) => (
                        <option key={topic}>{topic}</option>
                      ))}
                    </select>
                  </label>
                </div>
                <label className="ap-field">
                  Author name
                  <input
                    value={article.author.name}
                    onChange={(event) =>
                      patch({ author: { ...article.author, name: event.target.value } })
                    }
                  />
                </label>
                <div className="ap-field-pair">
                  <label className="ap-field">
                    Author type
                    <select
                      aria-label="Author type"
                      value={article.author.type}
                      onChange={(event) =>
                        patch({
                          author: {
                            ...article.author,
                            type: event.target.value as "Person" | "Organization",
                          },
                        })
                      }
                    >
                      <option value="Organization">Institute / organisation</option>
                      <option value="Person">Named author</option>
                    </select>
                  </label>
                  <label className="ap-field">
                    Publication date
                    <input
                      type="date"
                      value={article.date || ""}
                      onChange={(event) => patch({ date: event.target.value || undefined })}
                    />
                    <small>Leave unknown historical dates empty.</small>
                  </label>
                </div>
                {article.kind === "event" && (
                  <div className="ap-event-fields">
                    <h3>Event information</h3>
                    <label className="ap-field">
                      Event location
                      <input
                        value={article.event?.location || ""}
                        onChange={(event) =>
                          patch({ event: { ...article.event, location: event.target.value } })
                        }
                      />
                    </label>
                    <label className="ap-field">
                      Event date
                      <input
                        type="date"
                        value={article.event?.date || ""}
                        onChange={(event) =>
                          patch({
                            event: {
                              location: article.event?.location || "",
                              ...article.event,
                              date: event.target.value || undefined,
                            },
                          })
                        }
                      />
                    </label>
                  </div>
                )}
                <div className="ap-field">
                  <span>Cover photograph</span>
                  {article.image && isSafeImage(article.image.src) && (
                    <img
                      className="ap-editor-cover"
                      src={article.image.src}
                      alt={article.image.alt}
                    />
                  )}
                  <div className="ap-inline-actions">
                    <button
                      className="ap-button ap-button-outline"
                      onClick={() => setLibraryOpen(true)}
                    >
                      <ImageIcon size={16} aria-hidden /> Choose existing image
                    </button>
                    {article.image && (
                      <button
                        className="ap-text-button"
                        onClick={() => patch({ image: undefined })}
                      >
                        Remove cover
                      </button>
                    )}
                  </div>
                  <small>New image uploads will be available after storage is connected.</small>
                </div>
                {article.image && (
                  <>
                    <label className="ap-field">
                      Image description
                      <input
                        value={article.image.alt}
                        onChange={(event) =>
                          patch({ image: { ...article.image!, alt: event.target.value } })
                        }
                      />
                      <small>
                        Describe what the photograph shows for readers using assistive technology.
                      </small>
                    </label>
                    <label className="ap-field">
                      Caption
                      <input
                        value={article.image.caption || ""}
                        onChange={(event) =>
                          patch({
                            image: { ...article.image!, caption: event.target.value || undefined },
                          })
                        }
                      />
                    </label>
                  </>
                )}
                {article.gallery.length > 0 && (
                  <div className="ap-existing-gallery">
                    <h3>Existing gallery</h3>
                    <p>{article.gallery.length} photographs are retained with this article.</p>
                    <div>
                      {article.gallery.slice(0, 6).map((item, index) => (
                        <img
                          key={`${item.src}-${index}`}
                          src={item.src}
                          alt={item.alt}
                          loading="lazy"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
            {tab === "seo" && (
              <>
                <h2>Search & sharing</h2>
                <p className="ap-help">
                  Prepare how the article is described in search results and shared links.
                </p>
                <label className="ap-field">
                  Article URL
                  <input
                    value={article.slug}
                    placeholder={slugify(article.title) || "your-article-title"}
                    onChange={(event) => patch({ slug: event.target.value })}
                  />
                  <small>
                    {SITE.url}/news/{payload.slug || "your-article-title"}
                  </small>
                </label>
                <label className="ap-field">
                  SEO title
                  <input
                    value={article.seo.title}
                    placeholder={`${article.title || "Article title"} | CPM Int’l`}
                    onChange={(event) =>
                      patch({ seo: { ...article.seo, title: event.target.value } })
                    }
                  />
                  <small>
                    Uses the article title when left blank. Current preview:{" "}
                    {payload.seo.title.length} characters.
                  </small>
                </label>
                <label className="ap-field">
                  SEO description
                  <textarea
                    rows={4}
                    value={article.seo.description}
                    placeholder={article.summary || "A concise description of this article."}
                    onChange={(event) =>
                      patch({ seo: { ...article.seo, description: event.target.value } })
                    }
                  />
                  <small>
                    Uses the summary when left blank. Current preview:{" "}
                    {payload.seo.description.length} characters.
                  </small>
                </label>
                <div className="ap-search-preview">
                  <p className="ap-eyebrow">Search preview</p>
                  <span>
                    {SITE.url}/news/{payload.slug || "article-title"}
                  </span>
                  <h3>{payload.seo.title}</h3>
                  <p>{payload.seo.description || "The article summary will appear here."}</p>
                </div>
                <p className="ap-help">
                  This is an illustration of your metadata. Search engines may choose a different
                  title or description.
                </p>
                <div className="ap-social-preview">
                  <p className="ap-eyebrow">Shared link preview</p>
                  {article.image && isSafeImage(article.image.src) && (
                    <img src={article.image.src} alt={article.image.alt} />
                  )}
                  <div>
                    <small>CPM INT’L RESEARCH INSTITUTE</small>
                    <h3>{article.title || "Article title"}</h3>
                    <p>{payload.seo.description || "Your article summary"}</p>
                  </div>
                </div>
              </>
            )}
            {tab === "preview" && (
              <article className="ap-story-preview">
                <p className="ap-eyebrow">
                  {article.kind === "event" ? "Event report" : "News"} · {article.topic}
                </p>
                <h2>{article.title || "Your article title"}</h2>
                <p className="ap-story-summary">
                  {article.summary || "Your summary appears here."}
                </p>
                <div className="ap-story-byline">
                  {article.author.name || "Author name"}
                  {article.date && <span>{formatArticleDate(article.date)}</span>}
                </div>
                {article.image && isSafeImage(article.image.src) && (
                  <figure>
                    <img src={article.image.src} alt={article.image.alt} />
                    {article.image.caption && <figcaption>{article.image.caption}</figcaption>}
                  </figure>
                )}
                {article.body.map((block, index) =>
                  block.type === "heading" ? (
                    <h3 key={index}>{block.text}</h3>
                  ) : block.type === "quote" ? (
                    <blockquote key={index}>{block.text}</blockquote>
                  ) : block.type === "list" ? (
                    <ul key={index}>
                      {block.items.map((item, position) => (
                        <li key={position}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p key={index}>{block.text || "Your article text appears here."}</p>
                  ),
                )}
                {article.gallery.length > 0 && (
                  <p className="ap-help">
                    The published article also includes its {article.gallery.length}-image gallery.
                  </p>
                )}
              </article>
            )}
          </div>
        </section>
        <aside className="ap-editor-aside">
          <section className="ap-panel ap-publish-panel">
            <p className="ap-eyebrow">Publication</p>
            <h2>
              {draft.status === "review"
                ? "Awaiting review"
                : draft.status === "changes"
                  ? "Changes requested"
                  : "Draft in progress"}
            </h2>
            <p>
              {draft.status === "review"
                ? "Review this saved version. Any content edit will return it to draft."
                : "Finish the story, preview the page and send it for an editorial check."}
            </p>
            <ul className="ap-checklist">
              {readyChecks.map((item) => (
                <li key={item.label} className={item.ready ? "ap-check-ready" : ""}>
                  <span>{item.ready ? <Check size={13} aria-hidden /> : null}</span>
                  {item.label}
                </li>
              ))}
            </ul>
            {draft.status === "review" ? (
              <>
                <label className="ap-field">
                  Review note
                  <textarea
                    rows={4}
                    value={reviewNote}
                    onChange={(event) => setReviewNote(event.target.value)}
                    placeholder="Explain any changes the article needs."
                  />
                </label>
                <button
                  className="ap-button ap-button-outline"
                  disabled={!reviewNote.trim()}
                  onClick={() => {
                    update({ ...draft, status: "changes", note: reviewNote.trim(), dirty: false });
                    setNotice("Returned for changes in this preview. No notification was sent.");
                  }}
                >
                  Request changes
                </button>
                <button
                  className="ap-button"
                  disabled
                  title="Publishing requires a connected backend and authorized account"
                >
                  Publish article
                </button>
                <small>Publishing is disabled in the design preview.</small>
              </>
            ) : (
              <>
                <button className="ap-button" onClick={submit}>
                  <Send size={15} aria-hidden /> Submit for review
                </button>
                <small>Adds the draft to this preview’s review queue.</small>
              </>
            )}
            {draft.note && (
              <div className="ap-review-note">
                <strong>Review feedback</strong>
                <p>{draft.note}</p>
              </div>
            )}
          </section>
          <div className="ap-editor-tip">
            <h3>A useful final check</h3>
            <p>
              Confirm names, dates, research claims and photograph credits before sending an article
              for review.
            </p>
          </div>
        </aside>
      </div>
      <Sheet open={libraryOpen} onOpenChange={setLibraryOpen}>
        <SheetContent className="admin-preview ap-media-details sm:max-w-xl overflow-y-auto">
          <SheetTitle>Choose a cover image</SheetTitle>
          <SheetDescription>
            Select an existing public photograph from the article library.
          </SheetDescription>
          <label className="ap-field">
            Search photographs
            <input value={imageSearch} onChange={(event) => setImageSearch(event.target.value)} />
          </label>
          <div className="ap-cover-picker">
            {previewMedia
              .filter((item) =>
                `${item.alt} ${item.usedBy.join(" ")}`
                  .toLowerCase()
                  .includes(imageSearch.toLowerCase()),
              )
              .map((item) => (
                <button
                  key={item.src}
                  onClick={() => {
                    patch({ image: { src: item.src, alt: item.alt, caption: item.caption } });
                    setLibraryOpen(false);
                  }}
                >
                  <img src={item.src} alt={item.alt} loading="lazy" />
                  <span>{item.alt}</span>
                </button>
              ))}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

function isSafeImage(src: string) {
  return /^https:\/\//.test(src) || /^\/(?!\/)/.test(src);
}
