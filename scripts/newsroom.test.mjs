import test from "node:test";
import assert from "node:assert/strict";
import {
  readFileSync,
  existsSync,
  mkdtempSync,
  writeFileSync,
  unlinkSync,
  rmdirSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { articleSchema } from "../src/lib/article-schema.ts";
import { SITE, organizationSchema, getInstituteLocationReply } from "../src/lib/site.ts";

const collection = new URL("../src/content/articles.json", import.meta.url);
const articles = JSON.parse(readFileSync(collection, "utf8"));

test("published articles have valid content and distinct, stable URLs", () => {
  articles.forEach((article) => articleSchema.parse(article));
  assert.equal(new Set(articles.map((article) => article.slug)).size, articles.length);
  assert.ok(articles.filter((article) => article.featured).length <= 1);
});

test("the migrated event URLs and photographic archives remain available", () => {
  const events = new Map(
    articles
      .filter((article) => article.legacyEventId)
      .map((article) => [article.legacyEventId, article]),
  );
  for (const [id, count] of [
    ["cpm", 59],
    ["acegid", 26],
    ["olubadan", 0],
    ["oka-land", 1],
    ["hpa-bmz", 0],
  ]) {
    assert.ok(events.has(id), `Missing legacy event: ${id}`);
    assert.ok(events.get(id).gallery.length >= count, `Missing photos: ${id}`);
  }
  assert.ok(
    articles.find((article) => article.slug === "climate-health-research-cambridge-tanzania").body
      .length >= 14,
  );
});

test("every local article image resolves to an existing public asset", () => {
  for (const article of articles) {
    for (const image of [article.image, ...article.gallery].filter(Boolean)) {
      if (image.src.startsWith("/")) {
        const file = new URL(`../public${encodeURI(image.src)}`, import.meta.url);
        assert.ok(existsSync(file), `Missing image: ${image.src}`);
      }
    }
  }
});

test("invalid URL slugs, impossible dates, unsafe images and missing alt text are rejected", () => {
  const article = articles[0];
  for (const change of [
    { slug: "Invalid URL" },
    { date: "2026-02-30" },
    { image: { src: "javascript:alert(1)", alt: "Description" } },
    { image: { src: "/photo.jpg", alt: "" } },
    { body: [] },
  ])
    assert.equal(articleSchema.safeParse({ ...article, ...change }).success, false);
});

test("the institute address and location answers consistently identify Ibadan", () => {
  assert.equal(organizationSchema.address.addressLocality, "Ibadan");
  assert.equal(organizationSchema.address.addressRegion, "Oyo State");
  for (const query of [
    "Where is CPM located?",
    "Is CPM hosted at OAU in Ile-Ife?",
    "What is your address?",
    "Ibadan",
  ]) {
    assert.ok(getInstituteLocationReply(query)?.includes(SITE.address));
  }
  assert.equal(
    getInstituteLocationReply("Tell me about the Osun State Surveillance Pilot"),
    undefined,
  );
});

test("event location questions retain their event-specific answers", () => {
  assert.equal(getInstituteLocationReply("Where was the ACEGID visit held?"), undefined);
});

test("importing a duplicate URL fails without changing published articles", () => {
  const before = readFileSync(collection, "utf8");
  const directory = mkdtempSync(join(tmpdir(), "cpm-article-test-"));
  const file = join(directory, "duplicate.json");
  try {
    writeFileSync(file, JSON.stringify(articles[0]));
    const result = spawnSync(
      process.execPath,
      [
        "--experimental-strip-types",
        fileURLToPath(new URL("./import-article.mjs", import.meta.url)),
        file,
      ],
      { encoding: "utf8" },
    );
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /already exists/);
    assert.equal(readFileSync(collection, "utf8"), before);
  } finally {
    if (existsSync(file)) unlinkSync(file);
    rmdirSync(directory);
  }
});
