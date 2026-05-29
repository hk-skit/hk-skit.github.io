import BlurFade from "@/components/magicui/blur-fade";
import { DATA } from "@/data/resume";

const BLUR_FADE_DELAY = 0.04;

// Desktop: 3-col masonry. Outer cols all square, middle col alternates portrait/landscape.
const colAspectsDesktop = [
  ["aspect-square", "aspect-square", "aspect-square", "aspect-square"],
  ["aspect-[3/4]", "aspect-[4/3]", "aspect-[3/4]", "aspect-[4/3]"],
  ["aspect-square", "aspect-square", "aspect-square", "aspect-square"],
];

// Mobile: 2-col masonry. Alternate portrait + square within each col for staggered look.
const colAspectsMobile = [
  ["aspect-[3/4]", "aspect-square", "aspect-[3/4]", "aspect-square", "aspect-[3/4]", "aspect-square"],
  ["aspect-square", "aspect-[3/4]", "aspect-square", "aspect-[3/4]", "aspect-square"],
];

type Photo = { src: string; alt: string };

function BookTile({ photo, aspect }: { photo: Photo; aspect: string }) {
  return (
    <div className={`relative w-full overflow-hidden rounded-xl ${aspect}`}>
      <img
        src={photo.src}
        alt=""
        aria-hidden="true"
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl select-none"
      />
      <img
        src={photo.src}
        alt={photo.alt}
        draggable={false}
        className="relative w-full h-full object-contain select-none"
      />
    </div>
  );
}

export default function PhotosSection() {
  const photos = DATA.photos;

  // Mobile: 2 column-stacks
  const mobileCols = [
    photos.filter((_, i) => i % 2 === 0),
    photos.filter((_, i) => i % 2 === 1),
  ];

  // Desktop: 3 column-stacks
  const desktopCols = [
    photos.filter((_, i) => i % 3 === 0),
    photos.filter((_, i) => i % 3 === 1),
    photos.filter((_, i) => i % 3 === 2),
  ];

  return (
    <section id="photos">
      <div className="flex min-h-0 flex-col gap-y-4">
        <div className="flex items-center w-full">
          <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
          <div className="border bg-primary z-10 rounded-xl px-4 py-1">
            <span className="text-background text-sm font-medium">{DATA.sections.photos.label}</span>
          </div>
          <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
        </div>
        <div className="flex flex-col gap-y-3 items-center justify-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">{DATA.sections.photos.heading}</h2>
        </div>

        {/* Mobile: 2-col masonry */}
        <div className="grid grid-cols-2 gap-2 items-start sm:hidden">
          {mobileCols.map((col, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-2">
              {col.map((photo, idx) => (
                <BlurFade key={photo.src} delay={BLUR_FADE_DELAY * 14 + (colIdx * col.length + idx) * 0.05}>
                  <BookTile photo={photo} aspect={colAspectsMobile[colIdx][idx] ?? "aspect-square"} />
                </BlurFade>
              ))}
            </div>
          ))}
        </div>

        {/* Desktop: 3-col masonry */}
        <div className="hidden sm:grid grid-cols-3 gap-2 items-start">
          {desktopCols.map((col, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-2">
              {col.map((photo, idx) => (
                <BlurFade key={photo.src} delay={BLUR_FADE_DELAY * 14 + (colIdx * col.length + idx) * 0.05}>
                  <BookTile photo={photo} aspect={colAspectsDesktop[colIdx][idx] ?? "aspect-square"} />
                </BlurFade>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
