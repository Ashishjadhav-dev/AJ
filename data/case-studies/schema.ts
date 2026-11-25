export const categories = {
  architecture: "Architecture",
  performance: "Performance",
  product: "Product Engineering",
  state: "State Management",
  ai: "AI Integration",
  testing: "Testing & Quality",
  accessibility: "Accessibility & Design Systems",
} as const;

export type Category = keyof typeof categories;

export type Metric = {
  value: string;
  unit: string;
  method: string;
  verification:
    "local-benchmark" | "repository-inventory" | "documented" | "resume";
  release: "case-studies" | "public";
  label: string;
  scope: string;
  context: string;
};

export type Diagram = {
  title: string;
  description: string;
  steps: { label: string; detail: string }[];
};

export type Table = { caption: string; columns: string[]; rows: string[][] };

export type Section = {
  id: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  diagrams?: Diagram[];
  table?: Table;
  example?: { label: string; code: string };
  tradeoffs?: { decision: string; cost: string }[];
  demo?:
    | "csv"
    | "workflow"
    | "segmentation"
    | "cache"
    | "events"
    | "message"
    | "palette";
};

export type CaseStudy = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  seoDescription: string;
  outcome: string;
  category: string;
  filter: Category;
  technologies: string[];
  featured?: "primary" | "home";
  order: number;
  contributions: string[];
  metrics?: Metric[];
  benchmark?: readonly (readonly [
    records: number,
    previous: number,
    optimized: number,
  ])[];
  sections: Section[];
  related: string[];
  pdfUrl?: string;
};

export function flow(
  title: string,
  description: string,
  steps: [string, string][],
): Diagram {
  return {
    title,
    description,
    steps: steps.map(([label, detail]) => ({ label, detail })),
  };
}
