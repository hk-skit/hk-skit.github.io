---
date: 2026-08-18
topic: resume-page-pdf
---

# Resume Page + PDF (`/resume`)

## Summary

Add a standalone `/resume` route that renders Hitesh's resume as a monochrome,
sidebar-forward document (tinted sidebar with photo, dense right column), driven
by the existing `DATA` config extended with a professional summary, skills,
education, and per-role blurbs + bullets. A
"Print / Download PDF" button hands off to the browser's Save-as-PDF, formatted
by a dedicated print layer. Delivered in four phases within one PR — data model,
page & layout, print/PDF, then content last.

## Problem Frame

The Astro + Starfolio migration shipped `/` but deferred `/resume` to "real
resume + PDF later" — and the WIP placeholder was never landed, so the route
doesn't exist today. The site's content lives in one typed config (`DATA` in
`src/data/resume.tsx`), but it's tuned for the homepage story: the `summary` is
casual and personal, the `work` entries are long narrative prose rather than
scannable bullets, and there is no `education` or `skills` data anywhere. A
resume needs a different shape and voice than the portfolio page it shares a
source with.

## Key Decisions

- **Extend `DATA` additively, don't fork it.** New resume fields live on the
  existing `DATA` object so career facts have one source and can't drift; a
  separate `resume-content.ts` was rejected for exactly that drift risk. The
  homepage keeps reading its own fields and ignores the additions.
- **Sidebar-forward document with photo.** A tinted left sidebar (monochrome
  light-gray, not color) carries the avatar, identity, labeled contact,
  proficiencies, education, and social; the wider right column carries the
  Profile Snapshot and Experience (a short context blurb + bullets per role).
  Information-dense, using real estate well. Still standalone (no dock/grid) and
  light-only. (Revised from the initial clean no-photo two-column direction.)
- **Print-to-PDF now, build-time PDF later.** The button calls `window.print()`
  against a print stylesheet — real, single-source, zero infra on static
  hosting. A true one-click build-time PDF is parked as a later enhancement.
- **Phone is print-only.** It renders in the PDF (for handing out) but never on
  the crawlable web page.
- **Current `DATA` is the fact source; start lean.** The old resume supplies
  education and achievement-bullet material only; its stale dates/roles are not
  carried over. Length runs naturally — recent roles detailed, older concise.

## Requirements

**Data model**

- R1. Extend `DATA` in `src/data/resume.tsx` additively with `resume { headline,
  summary }`, `education[]`, a flat `skills: string[]`, and an optional
  `highlights: string[]` plus a short `blurb: string` on each `work` entry.
- R2. `resume.summary` is a professional summary distinct from the casual
  `DATA.summary`; the homepage continues to use `DATA.summary` and does not
  render the new fields.
- R3. Each `education[]` entry carries school, degree, field, start, end, and
  location.

**Page & layout**

- R4. A new static, prerendered `/resume` Astro route, consistent with how
  `index.astro` prerenders.
- R5. Sidebar-forward, information-dense layout: a tinted (monochrome
  light-gray) left sidebar with avatar, name, headline, labeled contact,
  proficiencies, education, and social; a wider right column with Profile
  Snapshot and Experience (a short context blurb + bullets per role).
  Monochrome, matching the site.
- R6. Rendered as a standalone document — no FlickeringGrid header, no navbar
  dock — in a container wider than the homepage's `max-w-2xl`, with a "Print /
  Download PDF" action and a "← back to hiteshkumar.dev" link.
- R7. The two columns collapse to a single column on small screens.
- R8. The on-screen page renders light-only for now (no dark mode).

**Print / PDF**

- R9. The print action triggers `window.print()`; a dedicated `@media print`
  stylesheet formats the output.
- R10. The print layer targets A4, forces light, strips the print button and
  back-link, and avoids splitting a single role across a page break.
- R11. The phone number renders only in the print layer; the web contact block
  shows email, website, city, LinkedIn, and GitHub.

**Content**

- R12. Career facts (company, title, dates, location) come from current
  `DATA.work`; the old resume is used only for education and as source material
  for achievement bullets.
- R13. Experience renders as achievement bullets (`highlights`): recent roles
  detailed, older roles concise, natural overall length.
- R14. Contact values: email `hk.skit@gmail.com`, website `hiteshkumar.dev`,
  city "Bengaluru, India", LinkedIn, GitHub — plus phone in the print layer per
  R11.

### Content source map

| Resume section | Source |
|---|---|
| Headline | New `resume.headline` (proposed: "Senior Architect · Frontend & UI Engineering") |
| Summary | New `resume.summary`, synthesized from current `DATA` prose |
| Skills | New `skills[]`, from current stack + old-resume proficiencies, modernized |
| Education | New `education[]`: B.Tech, Information Technology — SKIT, Jaipur · 2010–2014 |
| Experience | `DATA.work` facts + new per-role `highlights[]` distilled from prose / old-resume bullets |
| Contact | `DATA.name`, `DATA.contact`, `DATA.contact.social` + city + print-only phone |

Actual copy is drafted and reviewed in the content phase (last), not composed here.

## Scope Boundaries

Deferred for later (not in this cut):

- Optional sections — Writing / Selected Articles, Awards & Recognition,
  Certifications, Speaking / Talks. Base sections first.
- Build-time one-click PDF (headless render in CI) — enhancement on top of R9.
- Discoverability — a dock nav entry or a homepage link to `/resume`. Reachable
  by direct URL for now; a link gets placed later.
- Dark mode on the resume page.

Rejected:

- Committed static PDF in `public/` — drifts from the live page, goes stale.
- Client-side PDF rasterization (jsPDF / html2canvas) — heavy, non-selectable
  text, separate render path.

## Dependencies / Assumptions

- Static GitHub Pages hosting means there is no request-time server to render a
  PDF; generation is client-side (print) now, build-time later. (Verified
  against `astro.config`/CNAME setup.)
- Education is taken from the user's old-resume image: B.Tech, Information
  Technology — SKIT, Jaipur, 2010–2014. Institution full name and any
  GPA/honours to confirm.
- `hk.skit@gmail.com` is the intended public contact email (matches the site and
  the old resume).
- Current `DATA.work` is the accurate, up-to-date record of roles and dates.

## Outstanding Questions

Nothing blocks planning or building the structure (phases 1–3); the open items
are content-phase confirmations, resolved when we draft copy last.

Resolve during the content phase:

- Confirm the education institution's full/expanded name (SKIT) and whether to
  spell it out; confirm no GPA/honours line is wanted.
- Confirm the headline wording ("Senior Architect · Frontend & UI Engineering"
  or a preferred alternative).

Deferred to planning:

- Exact print pagination tuning and whether to expose an A4/Letter toggle.
- The concrete container width for the two-column document.
