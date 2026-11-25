import { flow, type Diagram } from "@/data/case-studies/schema";

export type Project = {
  slug: string;
  name: string;
  subtitle: string;
  status: string;
  description: string;
  stack: string[];
  liveUrl: string;
  sourceUrl?: string;
  screenshot?: {
    src: string;
    alt: string;
    width: number;
    height: number;
    caption: string;
  };
  diagrams: Diagram[];
  sections: {
    id: string;
    title: string;
    paragraphs?: string[];
    items?: string[];
  }[];
};

export const projects: Project[] = [
  {
    slug: "detectgrowth",
    name: "DetectGrowth",
    subtitle: "B2B Growth Intelligence Platform",
    status: "Independent project · In development",
    description:
      "A full-stack workspace for discovering companies, monitoring business signals, organizing research, and moving qualified prospects into an opportunity pipeline.",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Go",
      "PostgreSQL",
    ],
    liveUrl: "https://detectgrowth.vercel.app/applications",
    sourceUrl: "https://github.com/Ashishjadhav-dev/detectgrowth",
    screenshot: {
      src: "/images/detectgrowth-demo.jpg",
      width: 1280,
      height: 820,
      alt: "DetectGrowth lead discovery with location and category filters, example business results, and a lead detail panel.",
      caption:
        "DetectGrowth lead discovery in a local demo workspace with fictional records.",
    },
    diagrams: [
      flow(
        "Workspace data flow",
        "The Next.js application owns the workspace session and routes requests to the configured data store.",
        [
          ["Feature views", "Search, shortlist, pipeline and account settings"],
          [
            "REST handlers",
            "Validate input and resolve the session’s workspace",
          ],
          ["Persistence", "Store scoped records using the configured adapter"],
        ],
      ),
      flow(
        "Public signal ingestion",
        "The optional Go service and worker are deployed separately when used.",
        [
          ["Source adapter", "Resolve public listings and signal data"],
          ["Normalize", "Identify records and remove duplicate inputs"],
          ["Store", "Persist in PostgreSQL for workspace research"],
        ],
      ),
    ],
    sections: [
      {
        id: "product",
        title: "Problem and audience",
        paragraphs: [
          "B2B researchers and growth teams often have to assemble company records, signals, notes and next steps across several tools. I built DetectGrowth as a workspace where discovery and evaluation can feed an opportunity without re-entering the same information.",
          "The application also has a career workspace. The engineering walkthrough here focuses on its growth and workspace architecture. The supplied live link opens Applications, from which the product’s workspace navigation is available.",
        ],
      },
      {
        id: "functionality",
        title: "Implemented workflows",
        items: [
          "Discover public business listings, filter by location and category, and review the source for each result. An example mode offers fictional records.",
          "Save prospects, add notes, move leads through stages, and export supported shortlist records to CSV.",
          "Track companies, signals, lists and opportunities across authenticated workspace views. Review records and update pipeline stages from responsive interfaces.",
        ],
      },
      {
        id: "architecture",
        title: "Frontend, API and persistence",
        paragraphs: [
          "The App Router organizes routes around product features. Feature components share UI primitives and service helpers so the visual shell and forms can evolve independently of the account and data boundaries.",
          "The browser uses same-origin Next.js REST handlers for account and workspace workflows. Local filters and interaction state stay close to the feature. Server records persist through a configurable data adapter. The optional Go API and worker provide separate service and ingestion paths with PostgreSQL and Redis available in the backend stack.",
        ],
      },
      {
        id: "sessions",
        title: "Authentication and workspace boundaries",
        paragraphs: [
          "Account registration and sign-in produce a server-validated session. Protected workspace requests resolve their account context from that session and scope reusable read and write operations accordingly.",
          "Account recovery and session revocation are implemented. The public demo uses example data and browser-local shortlist state. Workspace membership roles, invitations and billing are outside the current implementation.",
        ],
      },
      {
        id: "decisions",
        title: "Engineering decisions and challenges",
        paragraphs: [
          "A stable REST contract makes it possible to switch storage adapters without changing the product views. A local filesystem adapter supports development. Deployments with multiple instances need a shared persistence layer and explicit concurrency validation.",
          "Public discovery sources can be slow, incomplete or unavailable. The UI distinguishes a limited set of live results from fictional examples, retains source attribution and keeps the shortlist available when discovery fails.",
        ],
      },
      {
        id: "quality",
        title: "Testing and deployment",
        paragraphs: [
          "The project contains automated API coverage for authentication, workspace records and lead workflows. Browser scenarios cover registration, protected pages, responsive behavior, lead capture and shortlist persistence.",
          "The supplied live URL is hosted on Vercel. The frontend can use PostgreSQL-based storage where configured. The optional Go API and worker have separate container and deployment configuration in the public repository.",
        ],
      },
      {
        id: "roadmap",
        title: "Current limits and roadmap",
        paragraphs: [
          "Provider availability and listing quality affect live discovery. Historical comparisons need a long-running dataset. Demo persistence is intentionally limited to its browser context.",
          "Planned work includes shared-adapter concurrency checks, workspace invitations and roles, and server-side scheduling for alerts. Project evidence here describes implementation and test coverage, without claims about customer adoption or commercial results.",
        ],
      },
    ],
  },
];
