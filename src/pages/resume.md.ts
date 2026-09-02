import type { APIRoute } from "astro";
import { buildResumeMarkdown } from "@/lib/resumeMarkdown";

// Static Markdown rendering of the resume, emitted to /resume.md at build time.
// Derived from the same DATA as /resume, so it can never drift from the page.
export const prerender = true;

export const GET: APIRoute = () =>
  new Response(buildResumeMarkdown(), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
