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
    "Senior architect. Building for the web since browsers were the hard part — not models.",
  summary: `Over the past decade, I've built for the web across the full spectrum — large marketplaces like Myntra, B2B SaaS, and the founding teams of early-stage D2C startups. Quietly obsessed with craft, performance, and the long game of shipping.

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
        "A multi-tenant headless storefront platform for Shopify brands — page building, merchandising, experiments, and personalization on one surface. I co-build it as a founding-team engineer leading UI across web and app.",
      highlights: [
        "Founding engineer on a multi-tenant headless storefront platform for Shopify brands — visual page building, a merchandising DSL, A/B experiments, and personalization on one surface.",
        "Lead UI engineering across web (Remix) and app (Capacitor), both rendering through a single shared pipeline.",
        "Enabled brand teams to ship layouts, experiments, and personalization live — with no engineering in the loop.",
      ],
      href: "#",
      badges: ["Founding Team"],
      location: "Bengaluru, India",
      title: "Senior Architect",
      logoUrl: "/logos/tectonic.png",
      start: "Jul 23",
      end: undefined,
      description:
        "Founding-team engineer co-building Tectonic's storefront platform from scratch — a multi-tenant headless storefront platform for Shopify brands. Tectonic owns everything a shopper sees and a brand team configures — visual page building, merchandising rules through a small scripting language, A/B experiments, and personalization, all on one surface. Web runs on Remix, the app on Capacitor JS, both rendering through the same pipeline. Brand teams iterate live — layouts, experiments, and personalization ship without engineering in the loop. Leading UI engineering across web and app.",
    },
    {
      company: "Virgio",
      blurb:
        "An early-stage fashion D2C. I led UI engineering from day one and built the app and web from the ground up.",
      highlights: [
        "Led UI engineering from day one; built the app and web from scratch on React Native and React Native Web.",
        "Architected an almost fully server-driven UI; launched in two months and crossed 100k+ installs.",
        "Led architecture and end-to-end delivery with a team of 3–5.",
      ],
      href: "#",
      badges: [],
      location: "Bengaluru, India",
      title: "Technical Lead",
      logoUrl: "/logos/virgio.png",
      start: "Mar 22",
      end: "Jul 23",
      description:
        "Led UI engineering at Virgio from day one. Built the app and web from scratch using React Native and React Native Web. Almost all screens and layouts were server-driven. Launched in two months, crossed 100k+ installs. Led architecture and end-to-end development with a team of 3–5.",
    },
    {
      company: "Myntra",
      blurb:
        "India's largest fashion marketplace. I led frontend for its in-house AI trend-prediction and market-intelligence platforms, and owned Spectrum, the internal React framework powering SCM tooling.",
      highlights: [
        "Led frontend for Vorta.ai, Myntra's AI fashion-trend platform, and grew it into the Market Intelligence Platform opened to external brands.",
        "Owned Spectrum — Myntra's React framework and CLI for internal apps — adopted by every SCM team for vendor portals, annotation tools, and dashboards.",
        "Promoted to Technical Lead; hired and ramped engineers, and drove adoption through internal talks on React and performance.",
      ],
      href: "https://www.myntra.com",
      badges: [],
      location: "Bengaluru, India",
      title: "Technical Lead",
      logoUrl: "https://www.google.com/s2/favicons?domain=myntra.com&sz=128",
      start: "Feb 19",
      end: "Mar 22",
      description:
        "Led frontend for Vorta.ai, Myntra's in-house AI platform for fashion trend prediction. Designers and buyers used it to spot trends — colors, silhouettes, aesthetics — and turn them into product decisions. Continued to lead the frontend as Vorta evolved into the Market Intelligence Platform — opening up to brands with insights on pricing, promotions, revenues, sale trends, etc.\n\nIn parallel, owned Spectrum — Myntra's in-house React-based framework for internal apps. The Spectrum CLI scaffolded a fully-wired app with Myntra's UI kit, internal libs, and conventions, plus a Node proxy server (Spectrum Server); teams dropped in business-logic screens and shipped. Every Myntra SCM team — inbound and outbound — built their tools on it: data-annotation tools, vendor portals, SCM dashboards.\n\nEarned the Technical Lead title along the way. Helped build the team — interviewing, hiring, and ramping new engineers. Drove Spectrum adoption with internal talks on React, web development, and performance optimization.",
    },
    {
      company: "Greytip",
      blurb:
        "Greytip offers HR and payroll software through its greytHR suite. I revamped its Employee Self Service (ESS) portal — the employee-facing app for payslips, leave, and attendance — and built its Employee Onboarding module from scratch.",
      highlights: [
        "Ran internal Angular + TypeScript training sessions; earned the Rising Star award.",
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
            "Built a multi-step wizard from scratch that collected new-hire data through schema-driven forms.",
          ],
        },
      ],
      href: "https://www.greytip.com/",
      badges: [],
      location: "Bengaluru, India",
      title: "Web Developer",
      logoUrl: "https://www.google.com/s2/favicons?domain=greytip.com&sz=128",
      start: "Jan 17",
      end: "Jan 19",
      description:
        "Rewrote the employee self-service portal from scratch — onboarding, leaves, attendance, payslips, a company feed, and a document manager. Solo on the frontend, owning the modules end-to-end. Built a server-driven UI framework — new screens landed as server config instead of handwritten components. Started an internal Angular + TypeScript training track for the team, and picked up the Rising Star award along the way.",
    },
    {
      company: "Eventifier",
      blurb:
        "At Eventifier, I worked on a social-media aggregation platform — a real-time “livewall” that pulled, curated, and embedded user-generated content from Twitter, Facebook, Instagram, and Google+.",
      highlights: [
        "Built the livewall UI, moderation controls, and embeddable widgets that surfaced real-time social content across sites.",
      ],
      href: "#",
      badges: [],
      location: "Bengaluru, India",
      title: "Front End Developer",
      logoUrl: "/logos/eventifier.png",
      start: "Oct 16",
      end: "Jan 17",
      description:
        "Brief stop at Eventifier, an SPA for moderating and embedding social-media livewalls (Twitter, Facebook, Instagram, Google+). Wrote frontend features, refactors, and Mocha test specs before the company wound down.",
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
      href: "#",
      badges: [],
      location: "Jaipur, India",
      title: "Software Engineer",
      logoUrl: "/logos/in-time-tec.png",
      start: "Jul 14",
      end: "Oct 16",
      description:
        "Built the frontend for Cartos, a managed-print SaaS where fleet designers uploaded floor maps and plotted enterprise printers onto an HTML5 Canvas. Owned the architecture on a MEAN-stack SPA — the Canvas/Konva UI layer, the service layer to the API, and a Karma + Jasmine unit-test setup.",
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
      image: "",
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
