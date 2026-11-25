import Link from "next/link";
import {
  Blocks,
  Cpu,
  Database,
  Gauge,
  GitBranch,
  ListFilter,
  ListOrdered,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { CardContent } from "@/data/case-studies";

const icons = {
  "csv-performance": Database,
  "email-editor": Mail,
  "automation-builder": GitBranch,
  "audience-segmentation": ListFilter,
  "multi-tenant-caching": Blocks,
  "transactional-live-feed": ListOrdered,
  "ai-content-editors": Sparkles,
  "frontend-performance": Gauge,
  "testing-quality": ShieldCheck,
  "design-system": Cpu,
} as const;

export function TechnologyTags({ technologies }: { technologies: string[] }) {
  return (
    <ul className="cs-tags" aria-label="Technologies">
      {technologies.map((technology) => (
        <li key={technology}>{technology}</li>
      ))}
    </ul>
  );
}

export function CaseStudyCard({ study }: { study: CardContent }) {
  const Icon = icons[study.slug as keyof typeof icons] ?? Blocks;
  return (
    <article className="cs-card">
      <div className="cs-card-kicker">
        <Icon size={17} aria-hidden />
        <span>{study.category}</span>
      </div>
      <h3>
        <Link href={`/case-studies/${study.slug}`} className="cs-card-link">
          {study.title}
          <span className="sr-only">, read case study</span>
        </Link>
      </h3>
      <p className="cs-card-summary">{study.summary}</p>
      <p className="cs-card-outcome">{study.outcome}</p>
      <TechnologyTags technologies={study.technologies.slice(0, 4)} />
      <div className="cs-card-footer">
        <span>{study.minutes} min read</span>
        <span aria-hidden="true">Read case study</span>
      </div>
    </article>
  );
}

export function CaseStudyGrid({ studies }: { studies: CardContent[] }) {
  return (
    <div className="cs-grid">
      {studies.map((study) => (
        <CaseStudyCard key={study.slug} study={study} />
      ))}
    </div>
  );
}
