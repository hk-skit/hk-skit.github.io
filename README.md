# hk-skit.github.io

Personal website at [hiteshkumar.dev](https://hiteshkumar.dev). Built with Astro 6 on top of the [Starfolio](https://github.com/webrating/starfolio) template.

## Prerequisites

- Node.js `>= 22.12.0`
- [pnpm](https://pnpm.io) (Corepack: `corepack enable`)

## Local development

```sh
pnpm install
pnpm dev      # http://localhost:4321 with hot reload
pnpm build    # static build into ./dist
pnpm preview  # serve ./dist locally
```

## Editing content

- Bio, navbar, and socials live in [`src/data/resume.tsx`](src/data/resume.tsx).
- Site URL, Twitter handle, SEO defaults, and theme tokens live in [`src/data/config.ts`](src/data/config.ts).
- Layout + `<head>` meta in [`src/layouts/Layout.astro`](src/layouts/Layout.astro).

Sections beyond About (Work, Education, Skills, Projects, Hackathons, Photos, Contact) are present in code but disabled via `DATA.sections.<key>.enabled = false`. Flip the flag and populate the corresponding data array to bring a section online.

## Deployment

Pushes to `master` trigger [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds and publishes `dist/` to the `gh-pages` branch using [`peaceiris/actions-gh-pages`](https://github.com/peaceiris/actions-gh-pages).

**One-time setup (post-merge):** in repo settings, set Pages source to "Deploy from a branch: `gh-pages` / `(root)`". The workflow writes `CNAME=hiteshkumar.dev` into the published branch on every deploy.

## Context

- Brainstorm: [`docs/brainstorms/website-revamp-astro-starfolio-requirements.md`](docs/brainstorms/website-revamp-astro-starfolio-requirements.md)
- Migration plan: [`docs/plans/2026-05-27-001-feat-website-astro-starfolio-migration-plan.md`](docs/plans/2026-05-27-001-feat-website-astro-starfolio-migration-plan.md)
