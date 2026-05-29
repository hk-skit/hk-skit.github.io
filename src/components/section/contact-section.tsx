import Markdown from "react-markdown";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { DATA } from "@/data/resume";

export default function ContactSection() {
  return (
    <div className="border rounded-xl p-6 sm:p-10 relative">
      <div className="absolute -top-4 border bg-primary z-10 rounded-xl px-4 py-1 left-1/2 -translate-x-1/2">
        <span className="text-background text-sm font-medium">{DATA.sections.contact.label}</span>
      </div>
      <div className="absolute inset-0 top-0 left-0 right-0 h-1/2 rounded-xl overflow-hidden">
        <FlickeringGrid
          className="h-full w-full"
          squareSize={2}
          gridGap={2}
          style={{
            maskImage: "linear-gradient(to bottom, black, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
          }}
        />
      </div>
      <div className="relative flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          {DATA.sections.contact.heading}
        </h2>
        <div className="mx-auto max-w-lg text-muted-foreground text-balance">
          <Markdown
            components={{
              p: ({ children }) => <p>{children}</p>,
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="font-medium text-foreground underline underline-offset-4 hover:text-primary transition-colors"
                >
                  {children}
                </a>
              ),
            }}
          >
            {DATA.sections.contact.text}
          </Markdown>
        </div>
      </div>
    </div>
  );
}
