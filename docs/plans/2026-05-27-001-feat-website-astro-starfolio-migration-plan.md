---
title: "feat: Migrate hiteshkumar.dev to Astro + Starfolio (Day-1)"
type: feat
status: active
created: 2026-05-27
origin: docs/brainstorms/website-revamp-astro-starfolio-requirements.md
---

# feat: Migrate hiteshkumar.dev to Astro + Starfolio (Day-1)

## Summary

Replace the existing webpack 4 / vanilla JS single-page site with the Astro 6 + Starfolio template. Day-1 scope is intentionally minimal: a homepage with Hero + About (bio ported verbatim from the existing site), a WIP `/resume` placeholder, and a bottom-dock navbar with Home, Resume, and an external link to `smellycode.com`. YouTube is removed from the socials; Medium is also dropped (Stack Overflow stays). Deployment is GitHub Pages, static output, via the `gh-pages` branch using `peaceiris/actions-gh-pages`. Per-PR previews are out of scope (see decision log in origin).

## Problem Frame

The current site (`hiteshkumar.dev`) runs on a 2019-era webpack 4 + vanilla JS + SCSS stack with no router, no resume page, and no easy way to add new pages or sections. Maintenance is friction-heavy and the visual design is dated. We're rebasing onto Astro 6 + Starfolio so future content (real resume + PDF, work history, projects) can be added by editing a single typed data file rather than re-wiring webpack.

This plan covers only the Day-1 cut — get the new stack live with parity on what exists today, plus a `/resume` placeholder. All section-level content beyond About (Work, Education, Skills, Projects, Hackathons, Photos, Contact) stays present in code but disabled via `DATA.sections.<key>.enabled = false` for follow-up passes.

(see origin: `docs/brainstorms/website-revamp-astro-starfolio-requirements.md`)

---

## Requirements

Carried forward from origin Success Criteria (§7):

**Primary (must work):**
- R1. `pnpm install && pnpm dev` boots the site locally with hot reload working.
- R2. `pnpm build` succeeds; `pnpm preview` serves the built output cleanly with no console errors.
- R3. `/` renders the new homepage showing Hero + About; bio content is the verbatim port from current `index.html`.
- R4. `/resume` renders a "work in progress" placeholder.
- R5. Bottom-dock navbar shows: Home, Resume, Blog. Clicking Blog opens `https://smellycode.com` in a new tab.
- R6. YouTube is absent from navbar socials.
- R7. Light/dark theme toggle works in the dock.

**Stretch (nice-to-have, do not block ship):**
- R8. SEO metadata is carried over: page title, OG title/description/image, Twitter card, Google site verification token.
- R9. Lighthouse scores meet or exceed current site on Performance / Accessibility / SEO.

**Explicitly out of scope (do not pursue):**
- Per-PR preview URLs — investigated; dropped per origin decision log.
- DNS / downtime concerns — origin confirms live site can break during the migration.

---

## Key Technical Decisions

All decisions carry over from origin §10 unless noted. Plan-time additions are marked `(plan)`.

- **Deployment: GitHub Pages, `output: 'static'`, `gh-pages` branch source.** Repo Pages setting must be updated manually post-merge from "Deploy from a branch: master / root" to "Deploy from a branch: gh-pages / root".
- **Package manager: pnpm.** Use Starfolio's shipped `pnpm-lock.yaml`. Old `package-lock.json` is deleted.
- **Node version: Starfolio's `engines.node >=22.12.0` floor**, no `.nvmrc` pin. CI uses `actions/setup-node@v4` with `node-version: 22`.
- **Sections enabled Day-1:** `about` only. All others (`work`, `education`, `skills`, `projects`, `hackathons`, `photos`, `contact`) `enabled: false`.
- **Bio content:** verbatim port from `index.html` bio paragraphs into `DATA.summary` as markdown. One mechanical fix: the runtime JS year-counter (`#total_experience`) becomes a build-time computation in `resume.tsx` (e.g. `${new Date().getFullYear() - 2014}+ years`).
- **Avatar:** reuse current `me.jpg` (copy from `app/assets/images/me.jpg` to `public/me.jpg`).
- **Theme:** Starfolio defaults; no `CONFIG.theme.*` changes.
- **Resume PDF strategy: defer.** Day-1 `/resume` is a placeholder only. Do not populate Work/Education arrays in `resume.tsx` for the sake of a future PDF.
- **(plan) Old webpack code: delete outright.** Git history preserves the prior implementation; keeping a `legacy/` directory in-tree adds clutter for negligible benefit.
- **(plan) Socials retained Day-1: LinkedIn, GitHub, X (Twitter), Stack Overflow.** YouTube and Medium are dropped now.
- **(plan) Vendoring approach: `pnpm dlx degit webrating/starfolio temp`** then move template files into repo root, rather than git submodule. We're modifying Starfolio (removing blog, statifying); a submodule provides no value.
- **(plan) Resume page uses Astro's `Layout.astro`** directly (not the React `HomePage` component). Simple static markup; no React island needed.

---

## Output Structure

After all units are applied, the repo root should look approximately like:

```text
.
├── .github/
│   └── workflows/
│       └── deploy.yml             # New: master → build → gh-pages branch
├── .gitignore                     # Updated: add Astro/pnpm entries
├── astro.config.mjs               # Modified: static output, no Cloudflare adapter, no MDX
├── components.json                # From Starfolio
├── package.json                   # From Starfolio (minus dropped deps)
├── pnpm-lock.yaml                 # From Starfolio (regenerated after dep changes)
├── public/
│   ├── CNAME                      # Carried from old root
│   ├── favicon.png                # Carried from old root
│   ├── open-graph.jpg             # Carried from old root
│   └── me.jpg                     # Carried from app/assets/images/
├── src/
│   ├── components/                # From Starfolio (blog parts removed)
│   ├── data/
│   │   ├── config.ts              # Modified: site URL + twitter handle
│   │   └── resume.tsx             # Rewritten: HK content, sections gated
│   ├── layouts/
│   │   └── Layout.astro           # From Starfolio
│   ├── lib/                       # From Starfolio (remark-code-meta.ts removed)
│   ├── pages/
│   │   ├── 404.astro              # From Starfolio
│   │   ├── index.astro            # From Starfolio
│   │   └── resume.astro           # New: WIP placeholder
│   └── styles/                    # From Starfolio
├── tsconfig.json                  # From Starfolio
└── README.md                      # Updated: how to dev / build / deploy
```

Removed entirely:
- `app/`, `config/`, `dist/`, `.babelrc`, `postcss.config.js`, old `package.json`, `package-lock.json` (deleted in U1)
- `src/pages/blog/`, `src/content/`, `src/content.config.ts`, `src/components/BlogList.tsx`, `src/components/mdx/`, `src/mdx-components.tsx`, `src/lib/remark-code-meta.ts`, `wrangler.jsonc` (deleted in U3/U4)

---

## Scope Boundaries

**In scope (Day-1):**
- Bootstrap Astro + Starfolio at repo root, static output, GH Pages via gh-pages branch.
- Hero + About homepage only; bio ported verbatim.
- `/resume` WIP placeholder page.
- Navbar update: add Resume + external Blog link; remove YouTube + Medium.
- GH Actions deploy workflow.

**Deferred to Follow-Up Work (planned but not Day-1):**
- Bio rewrite / staleness fixes (Myntra/Greytip references, voice flip, current stack).
- Enabling and populating Work, Education, Skills sections.
- Real resume content and PDF strategy.
- Decision on whether to drop Stack Overflow social.
- Custom theme / brand colors.
- Avatar re-crop or replacement if current `me.jpg` looks bad at small avatar size.

**Out of scope (not planned):**
- Per-PR preview URLs — investigated, dropped (see origin decision log).
- Hosting on Cloudflare/Vercel/Netlify — keeping GitHub Pages.
- Blog on this site — `smellycode.com` is linked externally.
- Migrating the parallax ("plax") effect from the old site.
- DNS work — apex domain stays as-is.

---

## Implementation Units

### U1. Strip the old webpack site to a clean slate

**Goal:** Remove the legacy webpack/vanilla project, preserving only the assets we need to carry forward. Result is an effectively empty repo at root (plus `docs/`, `.context/`, `.git`, `.gitignore`).

**Requirements:** Prerequisite for R1–R7.

**Dependencies:** None.

**Files (to delete):**
- `app/` (entire directory — but first save `app/assets/images/me.jpg` to a temp location like `.context/preserved/me.jpg` for U5)
- `config/`
- `dist/`
- `.babelrc`
- `postcss.config.js`
- `package.json`
- `package-lock.json`
- `index.html` (root)

**Files (to preserve at root):**
- `CNAME` — leave at root for now; U5 will move it to `public/`.
- `favicon.png` — leave at root; U5 will move it to `public/`.
- `open-graph.jpg` — leave at root; U5 will move it to `public/`.
- `README.md` — leave; U9 will rewrite.
- `.gitignore` — leave; U2 will overwrite.
- `docs/` — preserve.
- `.context/` — preserve.

**Approach:** Single deletion commit. Before deleting `app/`, copy `app/assets/images/me.jpg` into `.context/preserved/me.jpg` so U5 can reach it after `app/` is gone. Do NOT move `CNAME`, `favicon.png`, or `open-graph.jpg` yet — wait until `public/` exists in U2.

**Patterns to follow:** N/A — clean-slate deletion.

**Test scenarios:** none — pure deletion, no behavior. Verification is structural (see below).

**Verification:**
- `app/`, `config/`, `dist/`, `.babelrc`, `postcss.config.js`, `package.json`, `package-lock.json`, `index.html` are absent.
- `.context/preserved/me.jpg` exists and is non-zero bytes.
- `CNAME`, `favicon.png`, `open-graph.jpg`, `README.md`, `docs/`, `.context/` are present at root.
- `git status` shows only deletions and one new file (`.context/preserved/me.jpg`).

---

### U2. Scaffold Starfolio template at repo root

**Goal:** Bring Starfolio's files into the repo root as the new project skeleton. After this unit, `pnpm install && pnpm dev` should boot the unmodified template (still configured for Cloudflare; we statify in U3).

**Requirements:** Prerequisite for R1–R7.

**Dependencies:** U1.

**Files (to create — from Starfolio):**
- `astro.config.mjs`
- `components.json`
- `package.json`
- `pnpm-lock.yaml`
- `tsconfig.json`
- `wrangler.jsonc` (will be deleted in U3)
- `.gitignore` (overwrites the one from old repo)
- `public/` (including Starfolio's `starfolio-preview.png` etc. — we'll prune in U5)
- `src/` (entire tree: `components/`, `content/`, `content.config.ts`, `data/`, `layouts/`, `lib/`, `middleware.ts`, `mdx-components.tsx`, `pages/`, `styles/`)
- `LICENSE` (overwrites if any)

**Approach:**
- Run `pnpm dlx degit webrating/starfolio temp-starfolio` to clone the template into a temp directory.
- Move all template files into repo root, preserving `docs/`, `.context/`, `.git`, `.gitignore` (where overwrites are intentional — Starfolio's `.gitignore` is better than ours), and the carried-forward assets (`CNAME`, `favicon.png`, `open-graph.jpg` at root, plus `.context/preserved/me.jpg`).
- Remove `temp-starfolio/`.
- Do NOT install yet — U3 changes deps first to avoid re-installing.

**Patterns to follow:** Starfolio's repo layout as-is (`https://github.com/webrating/starfolio`).

**Test scenarios:** none — vendoring step, no behavior change.

**Verification:**
- `astro.config.mjs`, `package.json`, `pnpm-lock.yaml`, `tsconfig.json` exist at root.
- `src/pages/index.astro`, `src/data/resume.tsx`, `src/data/config.ts`, `src/components/HomePage.tsx`, `src/components/navbar.tsx` all exist.
- Old project's `CNAME`, `favicon.png`, `open-graph.jpg`, `README.md` still at root.
- `.context/preserved/me.jpg` still present.

---

### U3. Statify for GitHub Pages

**Goal:** Switch Astro from server-output (Cloudflare adapter) to static-output. Drop Cloudflare-specific files and deps.

**Requirements:** R1, R2 (build must produce static `dist/`); supports later CI in U7.

**Dependencies:** U2.

**Files (to modify):**
- `astro.config.mjs` — change `output: 'server'` → `output: 'static'`; remove `import cloudflare from '@astrojs/cloudflare';` and the `adapter: cloudflare(),` line.
- `package.json` — remove dependencies: `@astrojs/cloudflare`, `wrangler`. Remove the `"generate-types": "wrangler types"` script.

**Files (to delete):**
- `wrangler.jsonc`

**Approach:**
- The `astro.config.mjs` keeps everything else (React, MDX integration, sitemap, Tailwind, rehype-pretty-code, remark plugins) — MDX/blog stripping is in U4 to keep diffs focused.
- After editing, run `pnpm install` to regenerate `pnpm-lock.yaml` reflecting the removed deps.

**Patterns to follow:** Astro static-site config — minimal, no adapter. Reference: `https://docs.astro.build/en/guides/deploy/github/`.

**Test scenarios:** none directly — verification is build success.

**Verification:**
- `pnpm install` succeeds.
- `pnpm build` produces a `dist/` directory with `index.html`, `404.html`, etc.
- `pnpm preview` serves `dist/` cleanly on `http://localhost:4321`.
- `wrangler.jsonc` is absent.
- `@astrojs/cloudflare` and `wrangler` are absent from `package.json` and `pnpm-lock.yaml`.

---

### U4. Strip the blog feature

**Goal:** Remove Starfolio's blog route, MDX content config, blog-specific components, and MDX-related dependencies.

**Requirements:** Supports R3 (homepage-only Day-1 scope) by reducing surface area.

**Dependencies:** U3 (build must still succeed after removal).

**Files (to delete):**
- `src/pages/blog/` (entire directory)
- `src/content/` (entire directory — contains `blog/` subtree)
- `src/content.config.ts`
- `src/components/BlogList.tsx`
- `src/components/mdx/` (entire directory)
- `src/mdx-components.tsx`
- `src/lib/remark-code-meta.ts`

**Files (to modify):**
- `astro.config.mjs` — remove the `mdx()` integration, the `remarkPlugins` + `rehypePlugins` config blocks for both `mdx()` and the top-level `markdown:` field, the `prettyCodeOptions` constant, and the imports for `mdx`, `remarkGfm`, `rehypePrettyCode`, `remarkCodeMeta`.
- `package.json` — remove dependencies: `@astrojs/mdx`, `react-markdown`, `rehype-pretty-code`, `remark-gfm`, `shiki`, `@tailwindcss/typography` (only used by blog prose styles — verify before removing; safe to keep if uncertain), `@fontsource-variable/geist-mono` (mono font only used by blog code blocks).
- `src/data/resume.tsx` — remove the `Library` icon import from `lucide-react` if it's only used by the blog nav entry (U5 will rewrite this file anyway; this can be a no-op for now).

**Approach:**
- Delete files first, then edit `astro.config.mjs`, then run `pnpm install` to regenerate the lockfile.
- If `@tailwindcss/typography` is imported anywhere outside the blog (e.g. in `src/styles/global.css`), leave it in — small risk of dead dep is OK; build breakage is not.
- If TypeScript complains about missing references in `HomePage.tsx` or `navbar.tsx`, defer those fixes to U5 (where we rewrite `resume.tsx`).

**Patterns to follow:** N/A — pure deletion.

**Test scenarios:** none directly — verification is build success.

**Verification:**
- `pnpm build` succeeds with no MDX-related errors.
- `dist/` contains no `blog/` subdirectory.
- Visiting `http://localhost:4321/blog` after `pnpm preview` returns a 404 (or routes to `404.astro`).
- `react-markdown`, `@astrojs/mdx`, `rehype-pretty-code`, `remark-gfm`, `shiki` are absent from `package.json`.

---

### U5. Configure site, port content, carry over assets

**Goal:** Replace Starfolio's demo content with Hitesh's content. Configure site URL + socials. Port bio verbatim. Wire avatar. Disable all sections except About. Update navbar. Move carried-forward assets into `public/`.

**Requirements:** R3, R5, R6, R7 (homepage content + navbar shape), R8 (SEO carry-over).

**Dependencies:** U4.

**Files (to modify):**
- `src/data/config.ts`:
  - `site.url`: `"https://hiteshkumar.dev"`
  - `site.locale`: `"en_US"` (unchanged)
  - `site.twitterHandle`: `"@_smellycode"`
  - Leave `seo`, `typography`, `blog`, `theme` at Starfolio defaults. (`blog.postsPerPage` becomes unused after U4 but the field is harmless.)

- `src/data/resume.tsx`:
  - `DATA.name`: `"Hitesh Kumar"`
  - `DATA.initials`: `"HK"`
  - `DATA.url`: `"https://hiteshkumar.dev"`
  - `DATA.location` / `DATA.locationLink`: blank string or omit if the type allows; Starfolio's templates don't require it to be populated. (If TypeScript complains, set to `""` and `""`.)
  - `DATA.description`: `"An enthusiastic software engineer 👨🏻‍💻. Big fan of JavaScript and Coldplay 👨🏻‍🎤. Can be crazy around pizza 🍕 and dark chocolates 🍫."`
  - `DATA.summary`: verbatim bio paragraphs from old `index.html` `<section class="about">`, converted to markdown. Replace the `#total_experience` placeholder with an inline expression evaluated at build time. The text begins: `Hitesh is a passionate software engineer 👨🏻‍💻 with **${new Date().getFullYear() - 2014}+ years** of experience...`. Drop the standalone `smellycode.com` callout paragraph since it's redundant with the new external nav link.
  - `DATA.avatarUrl`: `"/me.jpg"`
  - `DATA.ogImage`: `"/open-graph.jpg"`
  - `DATA.sections`: set `about.enabled: true`. Set `work.enabled: false`, `education.enabled: false`, `skills.enabled: false`, `projects.enabled: false`, `hackathons.enabled: false`, `photos.enabled: false`, `contact.enabled: false`.
  - `DATA.navbar`: `[ { href: "/", icon: House, label: "Home" }, { href: "/resume", icon: FileText, label: "Resume" }, { href: "https://smellycode.com", icon: BookOpen, label: "Blog" } ]`. Update imports from `lucide-react` accordingly (`House`, `FileText`, `BookOpen`).
  - `DATA.contact.email`: `"hk.skit@gmail.com"`
  - `DATA.contact.tel`: omit or leave blank.
  - `DATA.contact.social`:
    - Keep: `GitHub` (`https://github.com/hk-skit`), `LinkedIn` (`https://www.linkedin.com/in/smellycode/`), `X` (`https://twitter.com/_smellycode`), `StackOverflow` (`https://stackoverflow.com/users/2879146/hitesh-kumar`), `email` (mailto).
    - Remove: `Youtube`, `Medium`.
  - Remove from `DATA`: `work`, `education`, `projects`, `hackathons`, `skills`, `photos` arrays — or set them to empty arrays `[]` if the type requires them. (Their `enabled: false` flags prevent rendering, but trimming the data keeps the file smaller and avoids referencing demo project images.)
  - Remove now-unused imports from `src/components/ui/svgs/*` (Astro, ReactLight, Typescript, Nodejs, Python, Golang, Postgresql, Docker, Kubernetes, NextjsIconDark).
  - Verify `src/components/icons.tsx` still has a `stackoverflow` icon — if not, either add one (SVG inline) or fall back to `Icons.globe`. Check by reading `src/components/icons.tsx` after U2.

- `src/components/icons.tsx` — if Stack Overflow icon is missing, add one (small SVG, MIT/CC0 source from simple-icons or hand-rolled). If too tedious, drop Stack Overflow social entirely and revisit in follow-up.

**Files (to move/create — assets into `public/`):**
- Move root `CNAME` → `public/CNAME`
- Move root `favicon.png` → `public/favicon.png`
- Move root `open-graph.jpg` → `public/open-graph.jpg`
- Move `.context/preserved/me.jpg` → `public/me.jpg` (then optionally delete `.context/preserved/`)

**Files (to delete from `public/`):**
- Any Starfolio demo assets that conflict or are now orphaned: `starfolio-preview.png`, `picofme.png`, `og_image.png`, `example-website.webp`, `example-website.png`, the `photos/` directory, `og_image_template.png`, etc. — basically anything in `public/` that the new `resume.tsx` no longer references. Use `git status` to identify after the dust settles.

**Approach:**
- Treat this unit as one logical commit even though it touches multiple files — they all serve the same goal (replace template content with real content).
- Verify navbar external-link behavior works without code changes: Starfolio's `navbar.tsx` checks `item.href.startsWith("http")` and applies `target="_blank" rel="noopener noreferrer"` automatically — confirmed by reading the file during research.
- The `smellycode.com` link uses `BookOpen` icon (subjective; `Library` or `ExternalLink` are also reasonable — pick one).

**Patterns to follow:** Starfolio's `DATA` shape in `src/data/resume.tsx` (the demo file we're replacing). Match its structure: object with named keys, typed `as const`, sections gated by `enabled` flags.

**Test scenarios:**
- Visiting `/` shows the new bio (Hitesh Kumar, not Alex Mercer).
- Hero shows name "Hitesh Kumar" and the avatar from `/me.jpg`.
- Below Hero, the About section renders the bio paragraphs as markdown.
- No other section (Work, Education, Skills, etc.) renders below About.
- The dock at the bottom shows three nav icons: Home, Resume, Blog.
- Clicking Blog opens `https://smellycode.com` in a new tab (`target="_blank"`).
- No YouTube or Medium icon in the social area of the dock.
- LinkedIn, GitHub, X, Stack Overflow icons all visible in the dock and link to correct URLs.
- Theme toggle (sun/moon) flips light/dark mode.
- Build does not error on missing image references.

**Verification:**
- `pnpm dev` boots; visit `http://localhost:4321/` and confirm the above scenarios manually.
- `pnpm build && pnpm preview` produces the same result from the static build.
- `dist/` contains `me.jpg`, `favicon.png`, `open-graph.jpg`, `CNAME` at the root of the built output.
- `<head>` of `dist/index.html` includes title containing "Hitesh", OG image referencing `/open-graph.jpg`, Twitter handle `@_smellycode`.

---

### U6. Add `/resume` WIP placeholder page

**Goal:** Create a static `/resume` route that renders a "Work in progress" card. Day-1 only; real resume content + PDF strategy come later.

**Requirements:** R4.

**Dependencies:** U5 (uses the same Layout and styling system).

**Files (to create):**
- `src/pages/resume.astro`

**Approach:**
- Use Astro's frontmatter to opt into prerendering: `export const prerender = true;`.
- Import `Layout` from `src/layouts/Layout.astro` and use it as the page shell.
- Page body: a centered card with heading "Resume" and subtitle "Work in progress — check back soon." Optionally include a link back to `/`. Use Tailwind utilities for layout (e.g. `flex min-h-dvh items-center justify-center p-8`).
- Do NOT mount the React `HomePage` component or the navbar dock here — actually, the dock SHOULD be present on this page for consistency. Verify by reading `src/layouts/Layout.astro` whether it includes `<NavbarIsland client:only="react" />`; if not, add it here too.
- No client-side JS needed for the page content itself.

**Patterns to follow:**
- `src/pages/index.astro` for Layout usage.
- `src/layouts/Layout.astro` for what the layout wrapper provides (SEO meta, theme, dock).

**Test scenarios:**
- Visiting `/resume` renders the page with "Work in progress" copy.
- Page has the same dock at the bottom (Home / Resume / Blog + socials).
- Clicking Home icon in the dock navigates to `/`.
- Page is statically generated — appears in `dist/resume/index.html` after `pnpm build`.
- No console errors in browser dev tools.
- Theme toggle works on `/resume` page (the dock's mode toggle is shared via the React island).

**Verification:**
- `pnpm build` produces `dist/resume/index.html` (or `dist/resume.html`, depending on Astro's `trailingSlash` setting).
- Visiting `http://localhost:4321/resume` in `pnpm preview` shows the WIP page.
- Navigating between `/` and `/resume` via the dock works in both directions.

---

### U7. CI workflow — build and deploy to `gh-pages` branch

**Goal:** Automate build + deploy on every push to `master`. Repo Pages source must be set to `gh-pages` branch (manual one-time setting change in repo settings, called out in U9 README).

**Requirements:** Operational requirement supporting R1–R7 reaching the live URL.

**Dependencies:** U3 (build must work), U5 (assets in place so deploy produces a usable site).

**Files (to create):**
- `.github/workflows/deploy.yml`

**Approach:**
- Workflow triggers: `push` to `master`, plus `workflow_dispatch` for manual runs.
- Permissions: `contents: write` (needed for `peaceiris/actions-gh-pages` to push to `gh-pages` branch).
- Concurrency: group by workflow + ref so multiple pushes don't race.
- Steps, in order:
  1. `actions/checkout@v4` (no extra options needed).
  2. `pnpm/action-setup@v4` — pin a stable pnpm major (e.g. `version: 9`).
  3. `actions/setup-node@v4` with `node-version: 22` and `cache: 'pnpm'`.
  4. `pnpm install --frozen-lockfile`.
  5. `pnpm build`.
  6. `peaceiris/actions-gh-pages@v4` with `github_token: ${{ secrets.GITHUB_TOKEN }}`, `publish_dir: ./dist`, `publish_branch: gh-pages`, `cname: hiteshkumar.dev` (forces CNAME on each deploy in case it gets stripped).
- Do NOT use `actions/deploy-pages` — that requires Pages source = "GitHub Actions", which is incompatible with our chosen branch-source strategy.

**Patterns to follow:**
- `peaceiris/actions-gh-pages` README (`https://github.com/peaceiris/actions-gh-pages`) — canonical recipe for branch-based deploys.
- Astro's own GitHub Pages guide for static sites: `https://docs.astro.build/en/guides/deploy/github/`.

**Test scenarios:**
- Workflow YAML is valid (lints clean; can be checked locally with `act` or just visually).
- Pushing to a branch other than master does NOT trigger the deploy job.
- After first successful run, the repo has a `gh-pages` branch with `dist/` contents at its root and a `CNAME` file containing `hiteshkumar.dev`.
- Subsequent runs update `gh-pages` (force-push or commit; `peaceiris` defaults to force-with-lease semantics).

**Verification:**
- After merging the PR to `master`, the workflow runs and completes green within ~3-5 min.
- `gh-pages` branch exists and contains `index.html`, `resume/index.html`, `me.jpg`, `CNAME`, `favicon.png`, `open-graph.jpg` at the branch root.
- After repo Pages setting is flipped to "Deploy from a branch: gh-pages / (root)" (manual; documented in U9), the live site at `hiteshkumar.dev` serves the new build.

---

### U8. Update `.gitignore` and finalize tooling

**Goal:** Adjust `.gitignore` for the new stack; remove stale entries; ensure the new build artifacts (`dist/`, `.astro/`, `node_modules/`) are ignored.

**Requirements:** Supports R1, R2 (clean dev experience).

**Dependencies:** U2 (Starfolio brings its own `.gitignore`; review and merge).

**Files (to modify):**
- `.gitignore` — ensure entries for:
  - `node_modules/`
  - `dist/`
  - `.astro/`
  - `.DS_Store`
  - `.env`, `.env.local`, `.env.*.local`
  - `.idea/`, `.vscode/` (unless intentionally tracked — old project ignored these)
  - `.cache/`
  - `.context/` (Conductor workspace; already gitignored — preserve)
- Remove `.context/preserved/` after U5 has consumed `me.jpg` (or `git rm` if it was committed).

**Approach:**
- Starfolio's shipped `.gitignore` is likely a superset of what we need; start from that and add anything missing from the old project's list.
- The `.context/` rule should remain — it's the Conductor workspace's gitignored collab area.

**Patterns to follow:** Standard Astro `.gitignore` (https://github.com/withastro/astro/blob/main/.gitignore).

**Test scenarios:** none — config-only.

**Verification:**
- `git status` after `pnpm install && pnpm build` shows no untracked `node_modules/` or `dist/`.
- `.context/` is not tracked.

---

### U9. Rewrite README with the new dev/build/deploy flow

**Goal:** Replace the old one-line README with instructions sufficient for a future-you (or another agent) to run dev, build, and understand the deploy flow.

**Requirements:** Operational; supports long-term maintainability. Not strictly Day-1-blocking but cheap to include.

**Dependencies:** U7 (deploy flow exists and can be documented).

**Files (to modify):**
- `README.md`

**Approach:** Short README — under one page. Cover:
- One-sentence description: "Hitesh Kumar's personal site. Astro 6 + Starfolio."
- Prerequisites: Node 22+, pnpm.
- Commands: `pnpm install`, `pnpm dev` (local), `pnpm build`, `pnpm preview`.
- Deploy: pushes to `master` trigger `.github/workflows/deploy.yml`, which builds and publishes `dist/` to the `gh-pages` branch. Repo Pages setting must be "Deploy from a branch: gh-pages / (root)" (one-time manual config in repo settings).
- Editing content: bio + sections live in `src/data/resume.tsx`; site config in `src/data/config.ts`.
- Link to the brainstorm doc and this plan for context.

**Test scenarios:** none — documentation.

**Verification:** README renders cleanly on GitHub; instructions, if followed, get someone from `git clone` to a running local dev server in under 2 minutes.

---

## System-Wide Impact

- **Public URL behavior:** `hiteshkumar.dev/` content fully changes (intentional). Existing inbound links land on the new homepage. `hiteshkumar.dev/resume` becomes a real (WIP) page where it was previously a 404.
- **Repo deploy mechanism:** flips from "Pages serves `master` root" to "Pages serves `gh-pages` branch root via Actions deploy." One-time manual settings change required in repo settings post-merge.
- **Git history:** large deletion + large addition. Considered "rewrite-ish" commits; reviewers should expect a big diff.
- **Bundle size:** browser payload grows materially (React + Tailwind + shadcn primitives + `motion` hydrating the homepage). Acceptable for Day-1; revisit if Lighthouse scores tank.
- **CNAME continuity:** `CNAME` file moves from repo root → `public/CNAME` → emitted at `dist/CNAME` → published at `gh-pages` branch root. GitHub Pages reads it from there. DNS unchanged.

---

## Risks and Mitigations

- **Risk: `pnpm install` fails after we strip MDX deps.** Mitigation: install incrementally — U3 changes deps first, U4 changes more. If a transitive resolution breaks, narrow to which removed dep is needed by something else (e.g., `@tailwindcss/typography` may be imported in `global.css`). Add it back if so; cost is one harmless dep.
- **Risk: Starfolio's `HomePage.tsx` references icons / images we removed from `resume.tsx`.** Mitigation: read `src/components/HomePage.tsx` after U4 to see what fields it expects; ensure `resume.tsx` retains the schema even if values are empty arrays / disabled sections. TypeScript will catch most of this.
- **Risk: Stack Overflow icon doesn't exist in `src/components/icons.tsx`.** Mitigation: confirmed need at U5; either add an inline SVG icon or drop Stack Overflow social entirely (low cost — original site had it but it's not critical Day-1).
- **Risk: `me.jpg` looks bad cropped to a small circular avatar.** Mitigation: accept Day-1; treat as deferred polish.
- **Risk: GH Pages settings cannot be flipped automatically.** Mitigation: U9 README explicitly calls out this manual step; user does it once post-merge.
- **Risk: Force-push to `gh-pages` from CI clobbers something.** Mitigation: `gh-pages` is fully owned by CI; nothing else writes to it.

---

## Notes for the Implementer

- **Pipeline mode-safe:** This plan is intended to be executed with `/ce-work` and should not require additional product decisions. All resolved decisions are documented above and in the origin doc's decision log.
- **Do not pre-write code for U5's bio port** — the exact markdown formatting of the bio paragraphs should be done with the original `index.html` open as reference, not from memory.
- **Sanity-check after each unit:** `pnpm build` after U2, U3, U4, U5, U6 to catch breakage early. The build is the primary correctness signal for this plan.
- **Live site rollover:** Origin confirms no downtime concerns — feel free to merge to `master` and let CI take it over the moment U7 lands. Repo Pages source flip (manual) is the only step that must happen post-merge.

---

## Decision Log

- **2026-05-27 (plan):** Old webpack code will be **deleted**, not archived to `legacy/`. Git history preserves it.
- **2026-05-27 (plan):** Medium dropped from socials (alongside YouTube). Stack Overflow stays for Day-1; revisit later.
- **2026-05-27 (plan):** PR previews **dropped entirely** after research. GH Pages has no native support; community workaround would require Astro `base` plumbing through Starfolio's hard-coded internal hrefs. Not worth the wiring for a personal site. (`pnpm dev` covers local iteration.)
- All other decisions: see origin §10.
