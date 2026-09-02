import { Icons } from "@/components/icons";

// Career started July 2014; compute years-of-experience at build time so the
// resume summary never goes stale.
const CAREER_START_YEAR = 2014;
const YEARS_EXPERIENCE = new Date().getFullYear() - CAREER_START_YEAR;

export const DATA = {
  name: "Hitesh Kumar",
  initials: "HK",
  url: "https://hiteshkumar.dev",
  location: "Bengaluru, India",
  locationLink: "",
  description:
    "Senior architect. Building for web and mobile since browsers were the hard part — not models.",
  summary: `Over the past decade, I've built for web and mobile across the full spectrum — large marketplaces like Myntra, B2B SaaS, and the founding teams of early-stage D2C startups. I'm quietly obsessed with craft, performance, and the long game of shipping.

Off the keyboard, I'm raising a toddler, picking up the ukulele, walking most mornings, and travelling whenever I can — preferably hills and beaches. I binge documentaries, and occasionally ramble at [smellycode](https://smellycode.com).`,
  avatarUrl: "/avatar.jpg",
  ogImage: "/open-graph.jpg",
  resume: {
    headline: "Senior Architect",
    summary: [
      `Senior Architect — ${YEARS_EXPERIENCE}+ years of experience across marketplace (Myntra), B2B SaaS, and D2C, with founding-team roles.`,
      "Build and lead engineering teams while staying hands-on — from hiring and mentoring to owning delivery and the engineering practices behind it.",
      "Seasoned in building products, frameworks, libraries, and developer tools of all scales.",
      "Work at the frontier of AI-assisted development and build the agent skills, commands, and tooling underneath.",
      "Teach and speak on UI engineering — from internal tech talks to public webinars.",
    ],
  },
  education: [
    {
      school: "Swami Keshvanand Institute of Technology (SKIT)",
      degree: "B.Tech",
      field: "Information Technology",
      start: "2010",
      end: "2014",
      location: "Jaipur, India",
    },
  ],
  skills: [
    {
      label: "Languages",
      items: ["JavaScript", "TypeScript", "JSX", "HTML5", "CSS", "Liquid", "MDX"],
    },
    {
      label: "Frameworks & Libraries",
      // Grouped into logical clusters; each inner array renders on its own line.
      lines: [
        ["React", "React Native", "React Native Web", "Expo", "NativeBase", "gluestack-ui"],
        ["Remix", "Astro", "Gatsby", "Qwik"],
        ["Angular", "NgRx", "RxJS"],
        ["Redux", "Zustand", "React Query"],
        ["Radix UI", "Tailwind CSS", "Framer Motion"],
        ["Capacitor (Ionic)", "PWA"],
        ["Konva", "Highcharts"],
        ["Shopify — Themes", "Apps", "Hydrogen"],
      ],
    },
    {
      label: "Backend & Infra",
      items: [
        "Node.js",
        "Bun",
        "Express.js",
        "Hono",
        "GraphQL",
        "MongoDB",
        "Firebase",
        "Cloudflare",
        "Vercel",
        "Docker",
        "Fly.io",
      ],
    },
    {
      label: "Testing & Tools",
      items: [
        "Jest",
        "Mocha",
        "Jasmine",
        "Karma",
        "Playwright",
        "Puppeteer",
        "Storybook",
        "Vite",
        "Webpack",
        "npm",
        "pnpm",
        "Yarn",
        "Git",
      ],
    },
    {
      label: "Leadership",
      items: [
        "Hiring & interview design",
        "Coaching & performance management",
        "Delivery ownership",
      ],
    },
  ],
  sections: {
    about: { order: 1, enabled: true, heading: "About" },
    work: { order: 2, enabled: true, heading: "Work Experience", presentLabel: "Present" },
    projects: {
      order: 3, enabled: true,
      label: "Writing",
      heading: "From the blog",
    },
    photos: {
      order: 4, enabled: true,
      label: "Books",
      heading: "On my bookshelf",
    },
    contact: {
      order: 5, enabled: true,
      label: "Contact",
      heading: "Get in touch",
      text: "Got a question, a project idea, or a good book to recommend? [Say hi](mailto:hk.skit@gmail.com). Spam not invited.",
    },
  },
  photos: [
    { src: "/books/thinking-fast-and-slow.jpg", alt: "Thinking, Fast and Slow — Daniel Kahneman" },
    { src: "/books/obstacle-is-the-way.jpg", alt: "The Obstacle Is the Way — Ryan Holiday" },
    { src: "/books/tuesdays-with-morrie.jpg", alt: "Tuesdays with Morrie — Mitch Albom" },
    { src: "/books/bad-therapy.jpg", alt: "Bad Therapy — Abigail Shrier" },
    { src: "/books/sapiens.jpg", alt: "Sapiens — Yuval Noah Harari" },
    { src: "/books/psychology-of-money.jpg", alt: "The Psychology of Money — Morgan Housel" },
    { src: "/books/mans-search-for-meaning.jpg", alt: "Man's Search for Meaning — Viktor Frankl" },
    { src: "/books/saint-surfer-ceo.jpg", alt: "The Saint, the Surfer, and the CEO — Robin Sharma" },
    { src: "/books/who-will-cry-when-you-die.jpg", alt: "Who Will Cry When You Die? — Robin Sharma" },
    { src: "/books/awaken-the-giant-within.jpg", alt: "Awaken the Giant Within — Tony Robbins" },
    { src: "/books/seven-habits.jpg", alt: "The Seven Habits of Highly Effective People — Stephen R. Covey" },
  ],
  contact: {
    email: "hk.skit@gmail.com",
    tel: "+91 9660675398",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/hk-skit",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/smellycode/",
        icon: Icons.linkedin,
        navbar: true,
      },
      X: {
        name: "X",
        url: "https://twitter.com/_smellycode",
        icon: Icons.x,
        navbar: true,
      },
      StackOverflow: {
        name: "Stack Overflow",
        url: "https://stackoverflow.com/users/2879146",
        icon: Icons.stackoverflow,
        navbar: true,
      },
      Blog: {
        name: "Blog",
        url: "https://smellycode.com",
        icon: Icons.blog,
        navbar: false,
      },
      email: {
        name: "Send Email",
        url: "mailto:hk.skit@gmail.com",
        icon: Icons.email,
        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Tectonic",
      blurb:
        "Tectonic platformizes growth for D2C Shopify brands. As a founding engineer, I led UI across web and app — from the first in-house framework to the Shopify-native pivot.",
      highlights: [
        "Established the foundation for UI engineering — design, standards, and patterns — and stayed in the code, shipping alongside the team.",
        "Architected and shipped the platform's first version solo — a schema-driven system of primitives that composed storefronts across web and a mobile app — validating the model and landing the first paying brands (The Label Life, Includ, Ohsogo).",
        "Helped grow the platform to $1M ARR — lifting conversion 30–50% on nearly every storefront it onboarded.",
        "Drove store onboarding as the platform grew into a self-serve builder — shipping flagship storefronts hands-on for brands like Frido, Bombae, and Vaaree, among a dozen-plus D2C names.",
        "Extended the foundation to create mobile apps for each store — on Capacitor, reusing the web codebase — and authored the native integration plugins (Shopify Checkout Kit, Klaviyo) available on npm.",
        "Set the technical hiring bar — from take-home to live rounds — and mentored 10–20 interns and juniors, several to promotion.",
      ],
      subsections: [
        {
          label: "Spectrum",
          blurb:
            "Spectrum was the pivot back into Shopify — Tectonic's growth platform for D2C brands, consolidating 30+ storefront apps into one system with experimentation, personalization, and playbooks. I led its UI and migrated existing stores onto it.",
          highlights: [
            "Built Spectrum's Studio — a visual builder with A/B testing and personalization baked in, letting merchants tailor the storefront to different customer cohorts.",
            "Developed the Spectrum Shopify app — one install that wires the platform into a merchant's store, unlocking the theme and data everything else runs on.",
            "Improved GTmetrix grades from E–F to A–B — replacing third-party app bloat with Shopify-native Spectrum sections, blocks, and snippets rendered server-side.",
            "Introduced AI-assisted development across the team — Claude skills, commands, and hooks that encode and enforce Spectrum's theme and performance standards, so the team ships safely with AI.",
          ],
        },
      ],
      title: "Senior Architect",
      logoUrl: "/logos/tectonic.png",
      start: "Jul 23",
      end: "May 26",
    },
    {
      company: "Virgio",
      blurb:
        "Virgio is a D2C fashion label. As a founding-team engineer, I led the UI engineering charter from day one for both app and web.",
      highlights: [
        "Owned the architecture, technical direction, and quality bar — leading a team of 3–5 and driving delivery end to end.",
        "Built a universal frontend — one codebase across native and web, with ~80–90% of the code shared.",
        "Built the page service and rendering engine — screens rendered on the fly from a backend schema, shipping content, layout, and flows live with no app release.",
        "Launched in two months and crossed 100k+ installs, staying solid at scale — 99% crash-free rate with near-zero ANRs.",
        "Ensured the app stayed fast and fluid even on low-end devices, media-heavy screens and all — through performance optimizations across rendering, caching, and data fetching.",
        "Hired and grew the UI team — turning junior engineers into independent owners of end-to-end delivery.",
      ],
      title: "Technical Lead",
      logoUrl: "/logos/virgio.png",
      start: "Mar 22",
      end: "Jul 23",
    },
    {
      company: "Myntra",
      blurb:
        "At Myntra, I joined the Vorta team as an SDE-2 and grew into a Technical Lead. I led the frontend for the Market Intelligence Platform (fka Vorta.ai) and re-engineered Spectrum — the internal React framework behind most of Myntra's in-house tools.",
      highlights: [
        "Led frontend hiring and mentored engineers on the team.",
        "Drove engineering-wide talks on React, web development, and performance.",
        "Raised the frontend performance bar across Myntra's internal apps through Spectrum CLI.",
      ],
      subsections: [
        {
          label: "Market Intelligence Platform",
          highlights: [
            "Architected and built the frontend from scratch — shipped in a month with a two-engineer team.",
            "Built the server-driven UI — dashboards, charts, and competitor views all rendered from backend-supplied config, personalized per seller.",
            "Kept dashboards responsive at scale — dozens of Highcharts widgets over large per-seller datasets.",
          ],
        },
        {
          label: "Spectrum",
          highlights: [
            "Re-engineered the CLI — every generated app shipped 70–80% smaller with performance baked in (lazy loading, resource hinting, etc.), and version upgrades went from manual to automated.",
            "30+ in-house tools ran on it — nearly every internal app at Myntra.",
          ],
        },
      ],
      title: "Technical Lead",
      logoUrl: "https://www.google.com/s2/favicons?domain=myntra.com&sz=128",
      start: "Feb 19",
      end: "Mar 22",
    },
    {
      company: "Greytip",
      blurb:
        "Greytip offers HR and payroll software through its greytHR suite. I revamped its Employee Self Service (ESS) portal — the employee-facing app for payslips, leave, and attendance — and built its Employee Onboarding module from scratch.",
      highlights: [
        "Conducted internal Angular and TypeScript training sessions.",
        "Earned the Rising Star award.",
      ],
      subsections: [
        {
          label: "Employee Self Service (ESS)",
          highlights: [
            "Built a JSON-driven UI framework from scratch that became the portal's rendering backbone.",
            "Built the portal's UI kit — reusable components, services, and pipes — on an SCSS styling foundation.",
            "Introduced and implemented app-wide state management with NgRx/Redux.",
          ],
        },
        {
          label: "Employee Onboarding",
          highlights: [
            "Built a store-driven, multi-step wizard from scratch to collect new-hire data.",
            "Enhanced a JSON-Schema forms framework to render onboarding's metadata-driven reactive forms.",
          ],
        },
      ],
      title: "Web Developer",
      logoUrl: "https://www.google.com/s2/favicons?domain=greytip.com&sz=128",
      start: "Jan 17",
      end: "Jan 19",
    },
    {
      company: "Eventifier",
      blurb:
        "At Eventifier, I worked on a social-media aggregation platform — a real-time “livewall” that pulled, curated, and embedded user-generated content from Twitter, Facebook, Instagram, and Google+.",
      highlights: [
        "Built the livewall UI, moderation controls, and embeddable widgets that surfaced real-time social content across sites.",
      ],
      title: "Front End Developer",
      logoUrl: "/logos/eventifier.png",
      start: "Oct 16",
      end: "Jan 17",
    },
    {
      company: "In Time Tec",
      blurb:
        "I contributed to building Cartos — a managed-print-solution (MPS) tool where fleet designers plot and visualize enterprise printer fleets.",
      highlights: [
        "Architected and developed the entire frontend from scratch.",
        "Built the interactive HTML5 Canvas editor (Konva) on a MEAN-stack SPA — designers dropped printers onto floor plans to lay out and visualize enterprise fleets.",
        "Root-caused performance bottlenecks and kept the canvas responsive with the massive fleets of enterprises like HP and Xerox.",
        "Established the frontend's unit-testing foundation with Karma and Jasmine.",
        "Ran internal talks on JavaScript and AngularJS to level up the team.",
      ],
      title: "Software Engineer",
      logoUrl: "/logos/in-time-tec.png",
      start: "Jul 14",
      end: "Oct 16",
    },
  ],
  projects: [
    {
      title: "CSRF in Action",
      href: "https://smellycode.com/csrf-in-action/",
      dates: "Jun 10, 2019",
      description:
        "How cross-site request forgery exploits authenticated sessions, and the defenses that actually hold up.",
      image: "/articles/csrf-in-action.jpg",
    },
    {
      title: "React starter kit for Chrome Extensions with Live Reloading",
      href: "https://smellycode.com/chrome-extension-live-reloading-with-react/",
      dates: "May 7, 2019",
      description:
        "A React starter for Chrome extensions, with live reloading wired in without tanking dev performance.",
      image: "/articles/chrome-extension-live-reloading-with-react.jpg",
    },
    {
      title: "JavaScript and Bit-hacks",
      href: "https://smellycode.com/js-bithacks/",
      dates: "May 1, 2020",
      description:
        "A tour of bitwise operators in JavaScript, with practical tricks for when bits beat arithmetic.",
      image: "/articles/js-bithacks.jpg",
    },
    {
      title: "Building an Accordion with React Hooks",
      href: "https://smellycode.com/accordion-in-reactjs/",
      dates: "Feb 26, 2020",
      description:
        "A reusable, controlled accordion component — no library, just hooks and a few lines of logic.",
      image: "/articles/accordion-in-reactjs.jpg",
    },
  ],
} as const;
