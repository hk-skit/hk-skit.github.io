import { Icons } from "@/components/icons";
import { House, FileText, BookOpen } from "lucide-react";

export const DATA = {
  name: "Hitesh Kumar",
  initials: "HK",
  url: "https://hiteshkumar.dev",
  location: "",
  locationLink: "",
  description:
    "An enthusiastic software engineer 👨🏻‍💻. Big fan of JavaScript and Coldplay 👨🏻‍🎤. Can be crazy around pizza 🍕 and dark chocolates 🍫.",
  summary: `Hitesh is a passionate software engineer 👨🏻‍💻 with **${new Date().getFullYear() - 2014}+ years** of experience. He tinkers with the web 🌎 for a living.

An engineer wears many hats in his career. Hitesh is not an exception. He has also worn many hats. His latest is that of a **Technical Lead** at [Myntra](https://www.myntra.com) 🤠.

Hitesh is a big fan of **JavaScript** and likes everything that revolves around it. Currently, he is working with **React** and **NodeJs**, but he has plenty of experience with **Angular(Js)**, **TypeScript** and many other cutting-edge web technologies including **HTML5**, **CSS3**, and **Canvas** 🎨.

Jargons like high-performant, robust, user-friendly, responsive, cross-browser compatible, etc. are thrown around when people talk about web applications. Hitesh is hooked onto creating these.

He has developed, designed and architected many small & large, simple & complex web applications from scratch. He has also single-handedly written a few UI frameworks to solve domain/organization specific problems.

[Greytip](https://www.greytip.com/) rewarded Hitesh with **A Rising Star Award** 🏆 for going the extra mile and delivering high-quality work on time.

When Hitesh is tired of breaking and building things, he watches TV shows. He also likes to read novels and always carries a book in his bag.

In his own words, he is a simple soul tangled up in the convoluted world of web.

Don't forget to [say hi! 👋🏻](mailto:hk.skit@gmail.com).

PS: Hitesh likes to talk about himself in third person. 🙂`,
  avatarUrl: "/me.jpg",
  ogImage: "/open-graph.jpg",
  sections: {
    about: { order: 1, enabled: true, heading: "About" },
    work: { order: 2, enabled: false, heading: "Work Experience", presentLabel: "Present" },
    education: { order: 3, enabled: false, heading: "Education" },
    skills: { order: 4, enabled: false, heading: "Skills" },
    projects: {
      order: 5, enabled: false,
      label: "Projects",
      heading: "Projects",
      text: "",
    },
    hackathons: {
      order: 7, enabled: false,
      label: "Hackathons",
      heading: "Hackathons",
      text: "",
    },
    photos: {
      order: 6, enabled: false,
      heading: "Photos",
    },
    contact: {
      order: 8, enabled: false,
      label: "Contact",
      heading: "Get in Touch",
      text: "",
    },
  },
  photos: [],
  skills: [],
  navbar: [
    { href: "/", icon: House, label: "Home" },
    { href: "/resume", icon: FileText, label: "Resume" },
    { href: "https://smellycode.com", icon: BookOpen, label: "Blog" },
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

  work: [],
  education: [],
  projects: [],
  hackathons: [],
} as const;
