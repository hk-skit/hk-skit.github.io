/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DATA } from "@/data/resume";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Timeline,
  TimelineItem,
  TimelineConnectItem,
} from "@/components/timeline";

function LogoImage({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return (
      <div className="size-10 bg-card overflow-hidden p-1 border rounded-full shadow ring-2 ring-border flex-none" />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="size-10 bg-card overflow-hidden p-1 border rounded-full shadow ring-2 ring-border object-contain flex-none"
      onError={() => setImageError(true)}
    />
  );
}

export default function WorkSection() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <Timeline className="px-0">
        {DATA.work.map((work, idx) => {
          const itemValue = `${work.company}-${work.title}-${idx}`;
          return (
            <TimelineItem
              key={itemValue}
              className="w-full flex items-start gap-x-3"
            >
              <TimelineConnectItem className="flex items-start justify-center">
                <LogoImage src={work.logoUrl} alt={work.company} />
              </TimelineConnectItem>
              <AccordionItem
                value={itemValue}
                className="flex-1 min-w-0 border-b-0"
              >
                <AccordionTrigger className="hover:no-underline p-0 cursor-pointer transition-colors rounded-none group/row [&>svg]:hidden">
                  <div className="flex items-center gap-x-3 justify-between w-full text-left">
                    <div className="flex-1 min-w-0 gap-0.5 flex flex-col">
                      <div className="font-semibold leading-none flex items-center gap-2">
                        {work.company}
                        <span className="relative inline-flex items-center w-3.5 h-3.5">
                          <ChevronRight
                            className={cn(
                              "absolute h-3.5 w-3.5 shrink-0 text-muted-foreground stroke-2 transition-all duration-300 ease-out",
                              "translate-x-0 opacity-0",
                              "group-hover/row:translate-x-1 group-hover/row:opacity-100",
                              "group-data-[state=open]/row:opacity-0 group-data-[state=open]/row:translate-x-0"
                            )}
                          />
                          <ChevronDown
                            className={cn(
                              "absolute h-3.5 w-3.5 shrink-0 text-muted-foreground stroke-2 transition-all duration-200",
                              "opacity-0 rotate-0",
                              "group-data-[state=open]/row:opacity-100 group-data-[state=open]/row:rotate-180"
                            )}
                          />
                        </span>
                      </div>
                      <div className="font-sans text-sm text-muted-foreground">
                        {work.title}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs tabular-nums text-muted-foreground text-right flex-none">
                      <span>
                        {work.start} - {work.end ?? DATA.sections.work.presentLabel}
                      </span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-0 pt-3 text-xs sm:text-sm text-muted-foreground">
                  <div className="flex flex-col gap-3">
                    {work.blurb && <p>{work.blurb}</p>}
                    {work.highlights && work.highlights.length > 0 && (
                      <ul className="list-disc pl-4 flex flex-col gap-1.5 marker:text-muted-foreground/50">
                        {work.highlights.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    )}
                    {"subsections" in work &&
                      work.subsections.map((sub) => (
                        <div key={sub.label} className="flex flex-col gap-1.5">
                          <h4 className="font-medium text-foreground/80">
                            {sub.label}
                          </h4>
                          {"blurb" in sub && sub.blurb && <p>{sub.blurb}</p>}
                          {sub.highlights && sub.highlights.length > 0 && (
                            <ul className="list-disc pl-4 flex flex-col gap-1.5 marker:text-muted-foreground/50">
                              {sub.highlights.map((h, i) => (
                                <li key={i}>{h}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </TimelineItem>
          );
        })}
      </Timeline>
    </Accordion>
  );
}
