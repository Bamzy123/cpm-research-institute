import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { articleSchema } from "../src/lib/article-schema.ts";

const file = process.argv[2];
if (!file || file.startsWith("--"))
  throw new Error("Usage: npm run articles:import -- path/to/article.json [--replace]");
const destination = new URL("../src/content/articles.json", import.meta.url);
const existing = JSON.parse(await readFile(destination, "utf8"));
const article = articleSchema.parse(JSON.parse(await readFile(resolve(file), "utf8")));
const index = existing.findIndex((entry) => entry.slug === article.slug);
if (index !== -1 && !process.argv.includes("--replace"))
  throw new Error(
    `The URL /news/${article.slug} already exists. Use --replace only when intentionally updating that article.`,
  );
if (index !== -1) existing[index] = article;
else existing.push(article);
existing.forEach((entry) => articleSchema.parse(entry));
if (existing.filter((entry) => entry.featured).length > 1)
  throw new Error(
    "There is already a featured story. Unselect Feature in the new draft, or update the previous featured story first.",
  );
await writeFile(destination, JSON.stringify(existing, null, 2) + "\n");
console.log(
  `Prepared /news/${article.slug}. Review the changes, run the checks and deploy the website to publish it.`,
);
