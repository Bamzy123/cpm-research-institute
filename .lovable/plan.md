## Plan: CPM Institute homepage — content, fixes, and new sections

### 1. Meta & favicon
- `src/routes/__root.tsx`: title already correct in code, but confirm it renders as "CPM International Research Institute for Climate Health"; refine meta description to the institutional line. Add a simple SVG favicon at `public/favicon.svg` (a green "C" mark on cream) and reference it from root `head().links`; remove default `public/favicon.ico`.

### 2. Design tokens
- `src/styles.css`: tighten palette to spec — background `#F6F5F0` (cream), near-black ink, single deep institutional green accent. Load Source Serif 4 + Inter via `<link>` in `__root.tsx` (replace Fraunces). Add `motion-safe` fade-up + count-up helpers; respect `prefers-reduced-motion`.

### 3. "Why CPM?" rewrite (editorial, mpg.de style)
- `src/routes/index.tsx`: replace boxed 4-col card grid with a **hairline-divided two-column list** (14 rows, each row: number `01`–`14` + line icon + title + body + optional "Flagship" pill on CP-Nexus which becomes item #1). This fixes the ragged final row AND the clipped card AND removes the "boxed cards" feel. Reorder strengths list so CP-Nexus is first and marked Flagship; use the exact copy provided.

### 4. Stats band ("CPM at a Glance")
- 5 stats per spec (14 / 1 / 1 / 1 / Global). Deep-green band, count-up on scroll (numeric stats only; "Global" static). Closing tagline "Research · Innovation · Education · Policy · Impact".

### 5. New sections (in this order after Why CPM?)
- **Leadership** — 3 placeholder cards (Director + 2 leads): photo placeholder square, name, title, credentials, 1–2 sentence bio. Editorial, no shadows.
- **Partners** — horizontal strip of 6 monochrome placeholder logo tiles under "In Collaboration With".
- **About / Affiliation + Contact** — two-column: left "Hosted at Obafemi Awolowo University, Nigeria" + address/email/phone placeholders; right a simple contact form (Name, Email, Institution, Message) with proper labels and focus states. Form is presentational (no backend) — submit shows an inline "Thank you" state.

### 6. Navigation
- Update top-nav links to real anchors: Institute (#about), Research (#why), Leadership (#leadership), Partners (#partners), Contact (#contact). Add mobile hamburger (details/summary based, no new deps) that reveals the nav below ~768px.

### 7. Accessibility & responsive
- Focus-visible ring on all links/buttons/inputs using the accent green.
- Verify at 375px: single-column strengths list, stacked hero, nav collapses.
- All icons `aria-hidden`, form inputs have `<label>`.

### Out of scope (deferred, per "nice-to-have")
- Language toggle and PDF download — skip this pass.
- Chat assistant already exists; leave untouched.

### Files touched
- `src/routes/__root.tsx` (fonts, favicon, meta polish)
- `src/routes/index.tsx` (full rewrite of homepage sections)
- `src/styles.css` (palette + motion utilities)
- `public/favicon.svg` (new), `public/favicon.ico` (deleted)
