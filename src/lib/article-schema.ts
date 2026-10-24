import { z } from "zod";

const safeUrl = z
  .string()
  .refine(
    (value) => /^https:\/\//.test(value) || /^\/(?!\/)/.test(value),
    "Use a site path or an HTTPS URL.",
  );
const date = z.string().date();
export const articleSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1),
  summary: z.string().min(1),
  kind: z.enum(["news", "event"]),
  topic: z.string().min(1),
  date: date.optional(),
  updatedAt: date.optional(),
  author: z.object({
    name: z.string().min(1),
    type: z.enum(["Person", "Organization"]),
    url: safeUrl.optional(),
  }),
  image: z
    .object({
      src: safeUrl,
      alt: z.string().min(1),
      caption: z.string().optional(),
    })
    .optional(),
  gallery: z
    .array(
      z.object({
        src: safeUrl,
        alt: z.string().min(1),
        caption: z.string().optional(),
      }),
    )
    .default([]),
  event: z
    .object({
      location: z.string().min(1),
      date: date.optional(),
      registrationUrl: safeUrl.optional(),
    })
    .optional(),
  legacyEventId: z.string().optional(),
  details: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
  featured: z.boolean().default(false),
  body: z
    .array(
      z.discriminatedUnion("type", [
        z.object({ type: z.literal("paragraph"), text: z.string().min(1) }),
        z.object({ type: z.literal("heading"), text: z.string().min(1) }),
        z.object({ type: z.literal("quote"), text: z.string().min(1) }),
        z.object({
          type: z.literal("list"),
          items: z.array(z.string().min(1)).min(1),
        }),
      ]),
    )
    .min(1),
  seo: z.object({ title: z.string().min(1), description: z.string().min(1) }),
});

export type Article = z.infer<typeof articleSchema>;
export type ArticleImage = NonNullable<Article["image"]>;
