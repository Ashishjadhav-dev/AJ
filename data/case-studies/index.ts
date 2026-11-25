import { automation, emailEditor } from "./architecture";
import { csv, frontendPerformance } from "./performance";
import { liveFeed, segmentation } from "./product";
import { designSystem, testing } from "./quality";
import { aiEditors, caching } from "./state-ai";
import type { CaseStudy, Metric } from "./schema";

export const caseStudies = [
  csv,
  emailEditor,
  automation,
  segmentation,
  caching,
  liveFeed,
  aiEditors,
  frontendPerformance,
  testing,
  designSystem,
].sort((a, b) => a.order - b.order);

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}

export function readingMinutes(study: CaseStudy) {
  const prose = [
    study.title,
    study.subtitle,
    study.summary,
    study.outcome,
    ...study.contributions,
    ...study.sections.flatMap(
      ({ title, paragraphs, bullets, diagrams, table, example, tradeoffs }) => [
        title,
        ...(paragraphs ?? []),
        ...(bullets ?? []),
        ...(diagrams ?? []).flatMap(({ title, description, steps }) => [
          title,
          description,
          ...steps.flatMap(({ label, detail }) => [label, detail]),
        ]),
        ...(table
          ? [table.caption, ...table.columns, ...table.rows.flat()]
          : []),
        ...(example ? [example.label, example.code] : []),
        ...(tradeoffs ?? []).flatMap(({ decision, cost }) => [decision, cost]),
      ],
    ),
  ].join(" ");
  const words =
    prose.match(/[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu)?.length ?? 0;
  return Math.max(1, Math.ceil(words / 200));
}

export function toCard(study: CaseStudy) {
  const {
    slug,
    title,
    subtitle,
    summary,
    category,
    filter,
    technologies,
    outcome,
  } = study;
  return {
    slug,
    title,
    subtitle,
    summary,
    category,
    filter,
    technologies,
    minutes: readingMinutes(study),
    outcome,
  };
}

export const featuredContext = {
  "csv-performance": {
    problem:
      "Validate large contact files in the browser while retaining a bounded preview.",
    contribution:
      "I tuned chunk sizing and improved quote-error recovery and upload handling.",
  },
  "email-editor": {
    problem:
      "Support editable HTML and AMP content across visual authoring, previews and delivery.",
    contribution:
      "I contributed to the editor migration, reusable controls and markup transformations.",
  },
  "multi-tenant-caching": {
    problem:
      "Keep campaign requests and cached results scoped to their owning account.",
    contribution:
      "I worked on account-scoped queries, cache ownership and request-deduplication coverage.",
  },
} as const;

export type CardContent = ReturnType<typeof toCard>;

export const highlights: Metric[] = [
  {
    value: "20+",
    unit: "contributions",
    method: "Reviewed individual contribution inventory",
    verification: "documented",
    release: "case-studies",
    label: "Documented engineering contributions",
    scope: "Individual work",
    context: "Across frontend implementations and regressions.",
  },
  {
    value: "1 million",
    unit: "records",
    method: "Controlled local CSV processing comparison",
    verification: "local-benchmark",
    release: "case-studies",
    label: "Synthetic CSV records benchmarked",
    scope: "Local benchmark",
    context: "Largest dataset in the chunk-size comparison.",
  },
  {
    value: "75%",
    unit: "percent",
    method: "40 to 10 FileReader calls on a 200,000-record synthetic file",
    verification: "local-benchmark",
    release: "case-studies",
    label: "Fewer CSV file reads",
    scope: "Local benchmark",
    context: "40 reads to 10 at 200,000 synthetic records.",
  },
  {
    value: "685",
    unit: "tests",
    method: "Shared suite discovery inventory",
    verification: "repository-inventory",
    release: "case-studies",
    label: "Automated frontend tests",
    scope: "Shared application",
    context: "Repository suite inventory.",
  },
];
