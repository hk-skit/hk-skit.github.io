# Website Revamp: hiteshkumar.dev → Astro + Starfolio

**Status:** Ready for planning — all open items resolved
**Date:** 2026-05-27
**Owner:** Hitesh Kumar
**Repo:** `hk-skit/hk-skit.github.io` (branch: `hk-skit/chennai`)

---

## 1. Context

`hiteshkumar.dev` currently runs on a 2019-era stack: webpack 4 + vanilla JS + SCSS, served as a single `index.html` via GitHub Pages with a `CNAME` pointing at the apex domain. The page renders one screen — a bio, social icons, a parallax portrait, and a footer. There is no router, no resume page, no theme toggle, and no easy path to add new pages without touching webpack config.

We're migrating to **Astro 6** using the [webrating/starfolio](https://github.com/webrating/starfolio) template — a React 19 + Tailwind v4 + shadcn/ui template where the entire portfolio is driven by a single typed data file (`src/data/resume.tsx`).

This is a **Day-1 minimal cut**: get the new stack live with parity-or-better on what exists today, plus a `/resume` placeholder. Everything else (real resume, projects, blog crossposts, photos) lands in follow-up passes.

## 2. Goals

- Modern, maintainable stack with a clear extension path.
- Single source of truth for portfolio content (one typed data file).
- Preserve the domain `hiteshkumar.dev` and existing SEO/OG metadata.
- Add a `/resume` route (WIP placeholder today; real resume + PDF later).
- Surface the personal blog (`smellycode.com`) without hosting it here.

## 3. Non-goals (Day-1)

- Hosting blog posts on this site (we link out to `smellycode.com`).
- Real resume content or PDF generation.
- Projects, hackathons, photos, contact sections.
- Design system / brand work beyond template defaults + light personalization.
- Migrating the existing parallax "plax" effect.

## 4. Locked scope decisions

- **Template:** `webrating/starfolio` (Astro 6 + React 19 + Tailwind v4 + shadcn/ui).
- **Domain:** Keep `hiteshkumar.dev` apex.
- **Routes:** `/` (home) and `/resume` (WIP placeholder). No `/blog`.
- **Bottom-dock navbar items:** Home, Resume, link out to `smellycode.com` (opens in new tab).
- **Social icons in navbar:** Drop YouTube. Keep LinkedIn, GitHub, X/Twitter; Medium and Stack Overflow TBD during navbar/social cleanup.
- **Blog feature from Starfolio:** Strip entirely — route, MDX content, `BlogList`, `src/components/mdx/`, and related deps (`@astrojs/mdx`, `react-markdown`, `rehype-pretty-code`, `remark-gfm`, `shiki`).
- **Sections we don't want yet:** photos, hackathons, projects, contact — set `enabled: false` in `DATA.sections` rather than deleting the components, so they're one flag away when needed.

## 5. Open items (to discuss, one at a time)

These are the decisions that shape the rest of the work. We'll walk through them sequentially and update this section in place as each is resolved.

| # | Item | Status |
|---|---|---|
| 1 | Deployment target — GitHub Pages (static) vs Cloudflare Pages | ✅ GitHub Pages (static) |
| 2 | Package manager — pnpm vs npm | ✅ pnpm |
| 3 | Node version | ✅ `engines.node >= 22.12.0` (Starfolio default, no pin) |
| 4 | Day-1 sections on the homepage | ✅ Hero + About (port current bio); others disabled until content exists |
| 5 | Bio — port verbatim, light refresh, or rewrite | ✅ Pure verbatim port; iterate post-launch |
| 6 | Avatar image — reuse current portrait or new | ✅ Reuse `me.jpg` |
| 7 | Theme & colors — Starfolio default vs custom shadcn theme | ✅ Use Starfolio defaults; theme work deferred |
| 8 | Resume PDF approach (deferred; capture intent) | ✅ Decide later; don't constrain Day-1 |

## 6. Constraints & current-state findings

- Current repo serves directly from `master` (GitHub Pages from root); `dist/` is committed.
- `CNAME` file in repo root contains `hiteshkumar.dev`.
- No CI workflow exists yet (`.github/` is empty).
- Starfolio defaults to `output: 'server'` + `@astrojs/cloudflare` adapter. For GitHub Pages we'd switch to `output: 'static'` and drop the adapter.
- Starfolio requires Node `>=22.12.0` and ships a `pnpm-lock.yaml`.

## 7. Success criteria

**Primary (must work):**
- `pnpm install && pnpm dev` boots the site locally, hot-reload works.
- `pnpm build` succeeds; `pnpm preview` serves the built output cleanly.
- `/` renders the new homepage (Hero + About) with no console errors.
- `/resume` renders a WIP placeholder.
- Navbar shows Home + Resume + Blog (external); clicking Blog opens `smellycode.com` in a new tab.
- YouTube no longer appears in navbar socials.
- Theme toggle works (light/dark).

**Stretch (nice-to-have):**
- SEO metadata (title, description, OG, Twitter card, Google site verification) carried over.
- Lighthouse parity-or-better with current site.

**Investigated and dropped:**
- Per-PR preview URLs. GitHub Pages has no native PR preview support; the community action `rossjrw/pr-preview-action` works but requires non-trivial Astro `base` config plumbing because Starfolio's components use hard-coded absolute hrefs. Decision: rely on `pnpm dev` for local iteration; revisit only if hosting moves off GH Pages.

**Explicitly not blocking:**
- Downtime during cutover — we can break the live site mid-migration; not a concern.

## 8. Risks & tradeoffs

- **Bundle size regression.** Today's site ships a small webpack bundle. Starfolio uses `client:only="react"` on the home page, so the entire homepage hydrates client-side. `motion`, `next-themes`, and shadcn primitives add real JS weight. Acceptable for Day-1; future pass could convert sections to native `.astro` files.
- **Stack jump.** Going from webpack 4 / vanilla JS straight to Astro 6 / React 19 / Tailwind v4 is a big leap. Worth knowing what each piece is doing so future edits aren't mysterious.
- **Hosting migration risk** (if Cloudflare). DNS cutover for the apex domain needs care to avoid downtime — TTL planning, verify Cloudflare Pages picks up the cert, etc.
- **Template drift.** Starfolio is actively developed. We'll be on a fork-in-spirit (we vendor it, modify it). Upstream changes won't auto-flow.

## 9. Approach (Day-1 sequencing)

Detailed step ordering is for `/ce-plan`; this is the shape:

1. **Branch & archive.** Branch off `master`. Move existing webpack code into `legacy/` (or delete — git history preserves it). Keep `CNAME`, `favicon.png`, `open-graph.jpg`, `me.jpg` accessible.
2. **Drop in Starfolio.** Scaffold at repo root from `webrating/starfolio` (e.g. `pnpm dlx degit webrating/starfolio temp && merge`).
3. **Statify for GitHub Pages.** Edit `astro.config.mjs`: `output: 'static'`, remove `@astrojs/cloudflare` import + adapter line. Drop deps: `@astrojs/cloudflare`, `wrangler`. Delete `wrangler.jsonc`.
4. **Strip blog feature.** Remove `src/pages/blog/`, `src/content/blog/`, `src/content.config.ts`, `src/components/BlogList.tsx`, `src/components/mdx/`, `src/mdx-components.tsx`, `src/lib/remark-code-meta.ts`. Remove `@astrojs/mdx` integration + plugin config from `astro.config.mjs`. Drop deps: `@astrojs/mdx`, `react-markdown`, `rehype-pretty-code`, `remark-gfm`, `shiki`.
5. **Configure site.** Edit `src/data/config.ts`: set `site.url = "https://hiteshkumar.dev"`, `site.twitterHandle = "@_smellycode"`. SEO + theme keep defaults.
6. **Port content into `resume.tsx`.**
   - `DATA.name`: "Hitesh Kumar" (or "hitesh.kumar" — match current site title).
   - `DATA.initials`: "HK".
   - `DATA.url`: `"https://hiteshkumar.dev"`.
   - `DATA.location` / `locationLink`: TBD (current site doesn't show one — leave a placeholder or remove if Starfolio doesn't require it).
   - `DATA.description`: existing OG description string (with emoji).
   - `DATA.summary`: verbatim bio paragraphs as markdown, with year-counter replaced by `${new Date().getFullYear() - 2014}+ years` inline.
   - `DATA.avatarUrl`: `"/me.jpg"`.
   - `DATA.sections`: only `about: { enabled: true }`. All others `enabled: false`.
   - `DATA.navbar`: `[ { href: "/", icon: House, label: "Home" }, { href: "/resume", icon: FileText, label: "Resume" }, { href: "https://smellycode.com", icon: BookOpen, label: "Blog" } ]`. (Existing `navbar.tsx` auto-handles external links via `href.startsWith("http")` — no component change needed.)
   - `DATA.contact.social`: remove Youtube entry. Keep LinkedIn + GitHub + X. Decide on Medium + Stack Overflow during the cleanup (carry them over for now — easy to remove).
7. **Resume WIP page.** Create `src/pages/resume.astro` using `Layout.astro`. Renders centered card with "Resume — work in progress" and a return-home link.
8. **Carry assets.** Copy to `public/`: `CNAME` (apex domain), `favicon.png`, `open-graph.jpg`, `me.jpg`.
9. **CI workflow.** Add `.github/workflows/deploy.yml`: `actions/checkout@v4` → `pnpm/action-setup` → `actions/setup-node@v4` with `node-version: 22` → `pnpm install --frozen-lockfile` → `pnpm build` → `peaceiris/actions-gh-pages` (publish `./dist` to `gh-pages` branch). Switch repo Pages source to `gh-pages` branch in settings.
10. **Smoke test.** `pnpm install && pnpm build && pnpm preview`. Verify `/`, `/resume`, navbar (blog link opens new tab), theme toggle, OG tags, favicon, console clean.
11. **Ship.** Merge PR; GH Actions runs; verify live at `hiteshkumar.dev` (force-refresh DNS not needed since CNAME unchanged).

## 11. Post-launch backlog (deferred)

Not Day-1, but parked here so it isn't lost:

- Rewrite bio voice / refresh stale role + stack mentions (item 5 follow-up).
- Real resume content + PDF strategy decision (item 8).
- Enable + populate sections: Work, Education, Skills (next obvious additions).
- Consider converting React sections to native `.astro` files for smaller bundle.
- Decide on Medium + Stack Overflow socials.
- Consider a custom shadcn theme once content is settled.
- Wire `STRATEGY.md` / `AGENTS.md` for the new stack if useful for future agent runs.

## 10. Decision log

- **2026-05-27 — Deployment: GitHub Pages (static), `gh-pages` branch source.** Stay on Pages; static output. Cascading consequences:
  - `astro.config.mjs`: set `output: 'static'`, remove `import cloudflare from '@astrojs/cloudflare'` and the adapter line.
  - Drop deps: `@astrojs/cloudflare`, `wrangler`; delete `wrangler.jsonc`.
  - CI: `.github/workflows/deploy.yml` builds Astro and deploys via `peaceiris/actions-gh-pages` (publishes `./dist` to `gh-pages` branch root on `master` push).
  - Configure GitHub Pages source → `gh-pages` branch in repo settings (not "GitHub Actions"). Chosen over the `actions/deploy-pages` flow specifically to enable PR previews — see stretch goal below.
  - Copy `CNAME` (contents: `hiteshkumar.dev`) into `public/` so Astro emits it on every build.
  - Migration path preserved: if we ever need SSR, swap adapter + change `output` + move DNS in one PR.
  - **PR previews: dropped (2026-05-27).** Research showed GH Pages has no native support, and `rossjrw/pr-preview-action` would require Astro `base` plumbing through Starfolio's hard-coded internal hrefs. Not worth the wiring; `pnpm dev` covers local iteration.
  - **No downtime concern.** User confirmed live site can break mid-migration; we don't need a careful cutover.
- **2026-05-27 — Package manager: pnpm.** Keep Starfolio's shipped lockfile; CI uses `pnpm/action-setup`. Delete the old `package-lock.json` once we cut over.
- **2026-05-27 — Node version: Starfolio default (`engines.node >=22.12.0`).** No `.nvmrc` pin. CI: `actions/setup-node@v4` with `node-version: 22` (or higher). Local Node 24.16.0 satisfies the floor.
- **2026-05-27 — Day-1 sections: Hero + About only; port current bio content.** Other Starfolio sections (Work, Education, Skills, Projects, Hackathons, Photos, Contact) stay `enabled: false` in `DATA.sections` until we have real content for each. Rationale: ship the parity cut first, then curate section-by-section in follow-ups.
  - Source content: bio paragraphs from current `index.html` (lines 1, the `<section class="about">` body) — port into `DATA.summary` as markdown. The current site's dynamic "years of experience" JS (`#total_experience`) needs to be replaced — either compute at build-time in `resume.tsx`, hardcode the year, or write it as plain prose (e.g. "10+ years").
  - Hero pulls `DATA.name`, `DATA.description`, `DATA.avatarUrl` — those need values regardless.
- **2026-05-27 — Bio: pure verbatim port.** Port the bio paragraphs from current `index.html` into `DATA.summary` as-is. Iterate on staleness (role, stack, awards, voice) in a follow-up pass.
  - Unavoidable mechanical fix: replace the runtime JS year-counter (`#total_experience`) with a build-time computation in `resume.tsx` (e.g. `${new Date().getFullYear() - 2014}+ years`). Not a content change — the original intent of "current year minus career-start year" is preserved.
  - `DATA.description` (hero subtitle) needs a one-liner — for the verbatim port, reuse the existing OG description: "An enthusiastic software engineer 👨🏻‍💻. Big fan of JavaScript and Coldplay 👨🏻‍🎤. Can be crazy around pizza 🍕 and dark chocolates 🍫."
- **2026-05-27 — Avatar: reuse current `me.jpg`.** Copy `app/assets/images/me.jpg` to `public/me.jpg`; set `DATA.avatarUrl = "/me.jpg"`. Rendered as a small circular avatar (~96–128px). Crop may need a tweak depending on framing; treat as a follow-up if it looks bad. `DATA.initials = "HK"` as fallback.
- **2026-05-27 — Theme & colors: Starfolio defaults.** No changes to `CONFIG.theme.light` / `.dark`. Neutral grayscale palette, light + dark mode toggle in dock. Aligns with current site's monochrome look. Custom theming deferred indefinitely.
- **2026-05-27 — Resume PDF: decide later.** Day-1 ships `/resume` as a WIP placeholder. No commitment to PDF strategy yet. Implication: don't pre-populate Work/Education arrays in `resume.tsx` for the sake of future PDF generation; structure choice is preserved for whenever we revisit.

---

_This document will be updated in place as the brainstorm progresses._
