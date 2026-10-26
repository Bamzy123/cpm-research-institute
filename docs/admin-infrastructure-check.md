CPM Int'l admin: infrastructure check and first preview

Checked 26 October 2026. This records observed configuration, rather than assuming that local build defaults describe production.

| Check | Result | Consequence |
| --- | --- | --- |
| Existing application | React, TanStack Start, Nitro and the Lovable Vite configuration | Keep the existing application and article renderer |
| Git integration | Repository is connected to Lovable | Preserve pushed history and the existing deployment workflow |
| Public domain | `https://www.cpmintlresearchinstitute.org/` returned HTTP 200 and a `Server: Vercel` response header | The public entry point is served through Vercel; this alone does not establish the precise runtime configuration |
| Public HTML | Contains the current homepage content and a built application entry script | The configured domain is serving the institute website |
| Local build | Lovable configuration defaults Nitro to Cloudflare | Verify the actual hosting project's build/runtime before changing deployment settings or selecting runtime-specific integrations |
| Database/authentication configuration | No Supabase dependency, environment variable names or local environment files found for a backend | Staff accounts and durable publishing cannot be verified from this checkout yet |
| Connected backend tool | No Supabase or Lovable connection currently available | Supabase connection was offered; it has not been confirmed connected |
| Existing content | 10 articles, 92 gallery entries, 5 legacy event redirect mappings | Retain these as the migration baseline |
| Current draft storage | Browser local storage under the existing editor's key | Keep existing drafts intact until authenticated import is implemented |
| CSRF support | Installed TanStack Start exposes `createCsrfMiddleware`; `src/start.ts` currently configures only error middleware | Explicitly configure and test mutation protection when authenticated server operations are added |
| Local preview | Existing server at `http://127.0.0.1:4173/` responds successfully | Reuse this server for design review |
| Built preview command | `vite preview` tries to import `dist/server/server.js`, but this build emits `.output/server/index.mjs` | Resolve the preview/deployment adapter mismatch when confirming the production host; do not interpret this command's 500 responses as an application-route failure |

No secret values were printed or copied during this inspection. No backend project, account, external invitation or production deployment was created.

The first admin preview is at `/admin/preview` in development. It contains the dashboard, searchable article list, structured draft editor, search/social preview, review queue, existing-image library, team role definitions, activity display, publisher settings and sign-in layout. Published content comes from the existing public collection. Draft changes and review activity live only in the current browser tab. They reset on refresh, with an unload warning while preview drafts exist. The existing `/admin/posts` editor and its stored drafts are preserved.

The route rejects production access using a development-only guard. This is a design workspace, not an authentication implementation. No credential form submits, no invitation is sent, no image is uploaded and no article is published. Those operations remain disabled until a backend and authorization layer are connected. The public chatbot is hidden on admin routes so it does not obstruct editorial work.

The user's “Okay. go.” authorizes proceeding with the recommended first milestone: infrastructure inspection and admin layouts. Owner-led publication and contributor drafts are the working defaults. A dedicated Publisher role remains available in the planned permission model.

The next integration needs an institute-owned Supabase connection or access to a suitable existing managed backend. Once connected, inspect projects and use an isolated development/staging environment before production writes. Confirm the actual deployment runtime, configure callback URLs and server secrets, and verify invitation/reset email delivery. Do not ask for passwords or privileged keys in chat.

The next implementation replaces the preview state with durable drafts and a server-enforced membership model. Authenticated preview, exact-revision review, storage policies and publication transactions must pass their checks before a production admin route is enabled. The complete design and rollout sequence remains in [the publishing and admin plan](publishing-admin-plan.md).

Verification completed: TypeScript checking, the production build and all seven existing content tests passed. Browser checks covered eight admin views at 1440, 390 and 320 pixel widths, plus the editor on mobile, without document overflow or runtime errors. Interaction checks covered article filtering, revision creation, save feedback, validation, review submission, requested changes, content-block ordering, event details, image selection and SEO previews. Public article output and the existing local-storage draft key remained unchanged.

The generated production server handler was invoked directly in Node with a minimal runtime context. After normalizing its search-parameter redirect, `/admin/preview` and the editor preview returned 404. The homepage, newsroom and existing `/admin/posts` returned 200. This verifies the compiled route guard and server rendering; it is not a deployment test on the actual Vercel or Cloudflare account. The development preview remains running for review.
