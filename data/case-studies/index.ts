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

export function toCard({
  slug,
  title,
  subtitle,
  summary,
  category,
  filter,
  technologies,
  minutes,
  outcome,
}: CaseStudy) {
  return {
    slug,
    title,
    subtitle,
    summary,
    category,
    filter,
    technologies,
    minutes,
    outcome,
  };
}

export type CardContent = ReturnType<typeof toCard>;

export const highlights: Metric[] = [
  {
    value: "20+",
    label: "Documented engineering contributions",
    scope: "Individual work",
    context: "Across frontend implementations and regressions.",
  },
  {
    value: "1 million",
    label: "Synthetic CSV records benchmarked",
    scope: "Local benchmark",
    context: "Largest dataset in the chunk-size comparison.",
  },
  {
    value: "75%",
    label: "Fewer CSV file reads",
    scope: "Local benchmark",
    context: "40 reads to 10 at 200,000 synthetic records.",
  },
  {
    value: "685",
    label: "Automated frontend tests",
    scope: "Shared application",
    context: "Repository suite inventory.",
  },
];
