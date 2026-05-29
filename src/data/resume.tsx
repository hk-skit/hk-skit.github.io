import { Icons } from "@/components/icons";

export const DATA = {
  name: "Hitesh Kumar",
  initials: "HK",
  url: "https://hiteshkumar.dev",
  location: "",
  locationLink: "",
  description:
    "Senior architect. Building for the web since browsers were the hard part — not models.",
  summary: `Over the past decade, I've built for the web across the full spectrum — large marketplaces like Myntra, B2B SaaS, and the founding teams of early-stage D2C startups. Quietly obsessed with craft, performance, and the long game of shipping.

Off the keyboard, I'm raising a toddler, picking up the ukulele, walking most mornings, and travelling whenever I can — preferably hills and beaches. I binge documentaries, and occasionally ramble at [smellycode](https://smellycode.com).`,
  avatarUrl: "/avatar.jpg",
  ogImage: "/open-graph.jpg",
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
    { src: "/books/aahil.jpg", alt: "Aahil — Rahgir" },
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
    tel: "",
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
        url: "https://stackoverflow.com/users/2879146/hitesh-kumar",
        icon: Icons.stackoverflow,
        navbar: true,
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
      href: "https://www.greytip.com/",
      badges: [],
      location: "Bengaluru, India",
      title: "Frontend Developer",
      logoUrl: "https://www.google.com/s2/favicons?domain=greytip.com&sz=128",
      start: "Jan 17",
      end: "Jan 19",
      description:
        "Rewrote the employee self-service portal from scratch — onboarding, leaves, attendance, payslips, a company feed, and a document manager. Solo on the frontend, owning the modules end-to-end. Built a server-driven UI framework — new screens landed as server config instead of handwritten components. Started an internal Angular + TypeScript training track for the team, and picked up the Rising Star award along the way.",
    },
    {
      company: "Eventifier",
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
      href: "#",
      badges: [],
      location: "Jaipur, India",
      title: "Software Developer",
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
