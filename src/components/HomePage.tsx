import React from "react";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";
import Markdown from "react-markdown";
import ContactSection from "@/components/section/contact-section";
import PhotosSection from "@/components/section/photos-section";
import ProjectsSection from "@/components/section/projects-section";
import WorkSection from "@/components/section/work-section";

const BLUR_FADE_DELAY = 0.04;

const sectionComponents: Record<string, React.ReactNode> = {
  about: (
    <section id="about">
      <div className="flex min-h-0 flex-col gap-y-4">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="text-xl font-bold">{DATA.sections.about.heading}</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <div className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
            <Markdown>{DATA.summary}</Markdown>
          </div>
        </BlurFade>
      </div>
    </section>
  ),
  work: (
    <section id="work">
      <div className="flex min-h-0 flex-col gap-y-6">
        <BlurFade delay={BLUR_FADE_DELAY * 5}>
          <h2 className="text-xl font-bold">{DATA.sections.work.heading}</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 6}>
          <WorkSection />
        </BlurFade>
      </div>
    </section>
  ),
  projects: (
    <section id="projects">
      <BlurFade delay={BLUR_FADE_DELAY * 11}>
        <ProjectsSection />
      </BlurFade>
    </section>
  ),
  photos: <PhotosSection />,
  contact: (
    <section id="contact">
      <BlurFade delay={BLUR_FADE_DELAY * 16}>
        <ContactSection />
      </BlurFade>
    </section>
  ),
};

export default function HomePage() {
  const orderedSections = Object.entries(DATA.sections)
    .filter(([, s]) => s.enabled)
    .sort(([, a], [, b]) => a.order - b.order)
    .map(([key]) => key);

  return (
    <main className="min-h-dvh flex flex-col gap-14 relative">
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-2 gap-y-6 flex flex-col md:flex-row justify-between">
            <div className="gap-2 flex flex-col order-2 md:order-1">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-semibold tracking-tighter sm:text-4xl lg:text-5xl"
                yOffset={8}
                text={`Hi, I'm ${DATA.name.split(" ")[0]}`}
              />
              <BlurFadeText
                className="text-muted-foreground max-w-[600px] md:text-lg lg:text-xl"
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />
            </div>
            <BlurFade delay={BLUR_FADE_DELAY} className="order-1 md:order-2">
              <Avatar className="size-24 md:size-32 border rounded-full shadow-lg ring-4 ring-muted">
                <AvatarImage
                  alt={DATA.name}
                  src={DATA.avatarUrl}
                  className="object-cover object-[35%_center]"
                />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>
      {orderedSections.map((key) => (
        <React.Fragment key={key}>
          {sectionComponents[key]}
        </React.Fragment>
      ))}
    </main>
  );
}
