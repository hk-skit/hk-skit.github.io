import { DATA } from "@/data/resume";

// Serializes the structured resume DATA into a single Markdown document.
//
// This is the source of truth for the /resume.md static endpoint. Because it
// derives from the same DATA the HTML resume renders from, the two never drift.
// The output is deliberately "clean Markdown": YAML front-matter carrying the
// machine-readable contact/identity fields, followed by prose-friendly headings
// that mirror the visible resume. That shape serves both a human reading the raw
// file and an LLM the human pastes it into.

// YAML scalars are double-quoted and escaped so values with commas, colons, or
// quotes (e.g. "Bengaluru, India") stay valid.
const yamlValue = (value: string): string =>
  `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;

// Skills groups are either a flat `items` list or `lines` (clusters). Both
// collapse to one comma-separated list for the Markdown; the clustering only
// carries visual meaning on the page.
const skillItems = (group: (typeof DATA.skills)[number]): string[] =>
  "lines" in group ? group.lines.flatMap((line) => [...line]) : [...group.items];

export function buildResumeMarkdown(): string {
  const { resume, contact, work, skills, education, sections } = DATA;
  const social = contact.social;
  const presentLabel = sections.work.presentLabel;

  const lines: string[] = [];

  // --- Front-matter: machine-readable identity + contact ---
  lines.push("---");
  lines.push(`name: ${yamlValue(DATA.name)}`);
  lines.push(`title: ${yamlValue(resume.headline)}`);
  lines.push(`location: ${yamlValue(DATA.location)}`);
  lines.push(`website: ${yamlValue(DATA.url)}`);
  lines.push(`email: ${yamlValue(contact.email)}`);
  lines.push(`phone: ${yamlValue(contact.tel)}`);
  lines.push(`github: ${yamlValue(social.GitHub.url)}`);
  lines.push(`linkedin: ${yamlValue(social.LinkedIn.url)}`);
  lines.push(`stackoverflow: ${yamlValue(social.StackOverflow.url)}`);
  lines.push(`blog: ${yamlValue(social.Blog.url)}`);
  lines.push("---");
  lines.push("");

  // --- Heading ---
  lines.push(`# ${DATA.name}`);
  lines.push("");
  lines.push(`${resume.headline} · ${DATA.location}`);
  lines.push("");

  // --- Summary --- (points already carry inline [label](url) Markdown links)
  lines.push("## Summary");
  lines.push("");
  for (const point of resume.summary) lines.push(`- ${point}`);
  lines.push("");

  // --- Experience ---
  lines.push("## Experience");
  lines.push("");
  for (const job of work) {
    lines.push(`### ${job.title} · ${job.company}`);
    lines.push("");
    lines.push(`${job.start} – ${job.end ?? presentLabel}`);
    lines.push("");
    if (job.blurb) {
      lines.push(job.blurb);
      lines.push("");
    }
    if (job.highlights && job.highlights.length > 0) {
      for (const h of job.highlights) lines.push(`- ${h}`);
      lines.push("");
    }
    if ("subsections" in job) {
      for (const sub of job.subsections) {
        lines.push(`#### ${sub.label}`);
        lines.push("");
        if ("blurb" in sub && sub.blurb) {
          lines.push(sub.blurb);
          lines.push("");
        }
        if (sub.highlights && sub.highlights.length > 0) {
          for (const h of sub.highlights) lines.push(`- ${h}`);
          lines.push("");
        }
      }
    }
  }

  // --- Skills ---
  lines.push("## Skills");
  lines.push("");
  for (const group of skills) {
    lines.push(`- **${group.label}:** ${skillItems(group).join(", ")}`);
  }
  lines.push("");

  // --- Education ---
  lines.push("## Education");
  lines.push("");
  for (const e of education) {
    lines.push(`- **${e.degree} ${e.field}** — ${e.school}`);
    lines.push(`  ${e.start}–${e.end} · ${e.location}`);
  }
  lines.push("");

  // --- Links ---
  lines.push("## Links");
  lines.push("");
  lines.push(`- Website: ${DATA.url}`);
  lines.push(`- Blog: ${social.Blog.url}`);
  lines.push(`- GitHub: ${social.GitHub.url}`);
  lines.push(`- LinkedIn: ${social.LinkedIn.url}`);
  lines.push(`- Stack Overflow: ${social.StackOverflow.url}`);

  // Single trailing newline.
  return lines.join("\n") + "\n";
}
