export const profile = {
  name: "Ashish S. Jadhav",
  role: "Frontend Software Engineer",
  headline: "Building complex, scalable and reliable frontend systems.",
  summary:
    "Frontend Software Engineer with 3+ years of industry experience, including internships, specializing in React, Next.js, TypeScript, SaaS architecture, complex product engineering and performance optimization.",
  location: "Bengaluru, India",
  email: "ashishbox13@gmail.com",
  github: "https://github.com/Ashishjadhav-dev",
  linkedin: "https://www.linkedin.com/in/ashish-s-jadhav/",
  resume: "/documents/ashish-jadhav-resume.pdf",
  specialization: ["React", "Next.js", "TypeScript"],
};

export type Contribution = { text: string; study?: string };
type Role = {
  title: string;
  period: string;
  contributions: Contribution[];
};

export const experience: { company: string; roles: Role[] }[] = [
  {
    company: "Kasplo Private Limited",
    roles: [
      {
        title: "Software Engineer",
        period: "February 2025 – Present",
        contributions: [
          {
            text: "Contribute to frontend architecture and delivery across multichannel SaaS products, including routing, shared state and REST integrations.",
          },
          {
            text: "Work on visual authoring, audience workflows, frontend performance and automated regression coverage.",
          },
        ],
      },
      {
        title: "Junior Software Engineer",
        period: "June 2024 – January 2025",
        contributions: [
          {
            text: "Built internal React administration interfaces with dashboards, REST integrations and access controls for operational workflows.",
          },
          {
            text: "Contributed reusable frontend components and supported Go service development.",
          },
        ],
      },
      {
        title: "Software Engineering Intern",
        period: "December 2023 – May 2024",
        contributions: [
          {
            text: "Developed React dashboards, dynamic forms and API integrations for campaign and automation workflows.",
          },
        ],
      },
    ],
  },
  {
    company: "Parinitha Technologies",
    roles: [
      {
        title: "Software Engineering Intern",
        period: "July 2023 – November 2023",
        contributions: [
          {
            text: "Delivered database-backed features with React, PHP and Java and worked on query and index optimization with MongoDB and MySQL.",
          },
        ],
      },
    ],
  },
];

export const skills = [
  {
    title: "Core frontend engineering",
    items: ["JavaScript", "TypeScript", "React", "Next.js", "HTML", "CSS"],
  },
  {
    title: "Frontend architecture & state",
    items: [
      "Component architecture",
      "Redux Toolkit",
      "TanStack Query",
      "React Context",
      "REST APIs",
      "Account-scoped UI state",
    ],
  },
  {
    title: "Complex product engineering",
    items: [
      "GrapesJS",
      "Monaco Editor",
      "XYFlow",
      "Dagre",
      "Papa Parse",
      "HTML & AMP",
      "Dynamic forms",
      "Visual workflows",
    ],
  },
  {
    title: "Performance engineering",
    items: [
      "Code splitting",
      "Lazy loading",
      "Caching",
      "Request deduplication",
      "Bundle analysis",
      "Core Web Vitals",
      "Lighthouse",
    ],
  },
  {
    title: "Testing & engineering quality",
    items: [
      "Vitest",
      "React Testing Library",
      "jsdom",
      "axe-core",
      "ESLint",
      "GitHub Actions",
      "CI/CD",
    ],
  },
  {
    title: "UI/UX engineering",
    items: [
      "Tailwind CSS",
      "Material UI",
      "Design systems",
      "Responsive design",
      "Keyboard accessibility",
      "Semantic tokens",
    ],
  },
  {
    title: "Additional backend knowledge",
    items: ["Go", "Node.js", "PostgreSQL", "MySQL", "Redis", "AWS"],
  },
];

export const about = [
  "I build and maintain frontend systems where product rules, UI state and data boundaries meet. My day-to-day work at Kasplo spans multichannel marketing and transactional email products, with a focus on how people author, validate and manage complex workflows.",
  "I’m building DetectGrowth independently to work across the full product lifecycle, from interaction design and frontend architecture to persistence, deployment and operational trade-offs.",
  "I’m also pursuing an MBA at Karnataka State Open University to develop my understanding of product and business decisions alongside engineering.",
];

export const education = [
  {
    name: "Master of Business Administration (MBA)",
    institution: "Karnataka State Open University (KSOU), Mysuru",
    period: "Currently pursuing",
  },
  {
    name: "Bachelor of Computer Applications (BCA)",
    institution: "Jain University, Bengaluru",
    period: "2020–2023",
  },
];

export const certifications = [
  { name: "Fundamentals of System Design", issuer: "LinkedIn Learning" },
  { name: "Full Stack Mastery", issuer: "Verzeo" },
  { name: "Leadership Skills and Communication", issuer: "Coursera" },
];

export type PublishedArticle = {
  title: string;
  description: string;
  url: string;
};
export const publishedArticles: PublishedArticle[] = [];
