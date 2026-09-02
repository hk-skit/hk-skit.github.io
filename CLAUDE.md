# Project notes

Personal portfolio for hiteshkumar.dev — Astro (static output) + Starfolio,
deployed to GitHub Pages. Content is driven from `src/data/`.

## Resume PDF is a hand-generated artifact

`public/resume.pdf` is the canonical resume download. Hitesh owns exactly what
visitors get, so it is **generated manually** — never auto-generate, edit, or
overwrite it.

- The `/resume` page (`src/pages/resume.astro`) renders the resume from
  `src/data/resume.tsx`. Its "Download PDF" toolbar button just opens
  `/resume.pdf` (a plain link, mirroring the `/resume.md` link — no
  `window.print()`).
- Hitesh regenerates the PDF himself by opening `/resume` locally and printing
  to PDF (that is what the `@media print` rules in `src/styles/resume.css` are
  for — keep them intact), then drops the new file in as `public/resume.pdf`.

### Drift rule (do this every session)

Whenever the resume content changes — any edit to the resume-relevant fields of
`src/data/resume.tsx` (name, headline, summary, work/experience, skills,
education, contact) or to the print layout in `src/styles/resume.css` — the
committed `public/resume.pdf` is now stale.

**Flag it to Hitesh explicitly**: remind him that `public/resume.pdf` must be
manually regenerated (open `/resume`, print to PDF, replace the file). Do not
attempt to regenerate it yourself.
