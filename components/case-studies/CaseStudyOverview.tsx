import Link from "next/link";
import { Download } from "lucide-react";
import { caseStudies, toCard } from "@/data/case-studies";
import type { Metric } from "@/data/case-studies/schema";
import { profile } from "@/data/portfolio";
import { CaseStudyGrid, TechnologyTags } from "./CaseStudyCard";
import { CaseStudyBenchmarkChart } from "./CaseStudyFigures";
import "@/app/case-studies/case-studies.css";

export function CaseStudyBreadcrumb({ current }: { current?: string }) {
  return (
    <nav className="cs-breadcrumb" aria-label="Breadcrumb">
      <ol>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <span aria-hidden>/</span>
          {current ? (
            <Link href="/case-studies">Case Studies</Link>
          ) : (
            <span aria-current="page">Case Studies</span>
          )}
        </li>
        {current && (
          <li>
            <span aria-hidden>/</span>
            <span aria-current="page">{current}</span>
          </li>
        )}
      </ol>
    </nav>
  );
}

export function PortfolioDownload({
  file,
  label = "Download engineering portfolio",
}: {
  file?: { href: string; size?: string };
  label?: string;
}) {
  if (!file) {
    return (
      <div className="cs-download">
        <button className="cs-button" disabled>
          <Download size={16} aria-hidden />
          {label}
        </button>
        <span>PDF currently unavailable</span>
      </div>
    );
  }

  return (
    <div className="cs-download">
      <a className="cs-button" href={file.href} download>
        <Download size={16} aria-hidden />
        {label}
        {file.size && ` (${file.size})`}
      </a>
      <a
        className="cs-text-link"
        href={file.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        Open PDF in new tab
      </a>
    </div>
  );
}

export function CaseStudyHero({
  file,
}: {
  file?: { href: string; size?: string };
}) {
  return (
    <header className="cs-hero">
      <p className="cs-eyebrow">Engineering portfolio</p>
      <h1>Engineering Case Studies</h1>
      <p className="cs-deck">
        A closer look at the complex frontend systems, architectural decisions,
        performance optimizations and product engineering challenges I have
        worked on.
      </p>
      <div className="cs-actions">
        <a className="cs-button cs-button-primary" href="#collection">
          Explore case studies
        </a>
        <PortfolioDownload file={file} />
      </div>
    </header>
  );
}

export function CaseStudyMetric({ metric }: { metric: Metric }) {
  return (
    <div className="cs-metric">
      <dt>{metric.label}</dt>
      <dd className="cs-metric-value">{metric.value}</dd>
      <dd className="cs-metric-context">
        <span>{metric.scope}</span>
        {metric.context}
      </dd>
    </div>
  );
}

export function FeaturedCaseStudy() {
  const study = caseStudies.find((item) => item.featured === "primary")!;
  const [records, previous, optimized] = study.benchmark!.at(-1)!;
  return (
    <section className="cs-feature" aria-labelledby="featured-study">
      <div className="cs-feature-copy">
        <p className="cs-eyebrow">Featured case study</p>
        <p className="cs-meta">
          {study.category} · {study.minutes} min read
        </p>
        <h2 id="featured-study">{study.title}</h2>
        <p className="cs-feature-description">
          A chunked contact import that validates every row and retains a
          bounded preview. My work covered chunk sizing, quote-error recovery,
          and upload handling.
        </p>
        <TechnologyTags technologies={study.technologies} />
        <Link
          className="cs-button cs-button-primary"
          href={`/case-studies/${study.slug}`}
        >
          Read case study<span className="sr-only"> on {study.title}</span>
        </Link>
      </div>
      <div className="cs-feature-visual">
        <CaseStudyBenchmarkChart
          title="Local benchmark"
          caption={`${records.toLocaleString("en-US")} synthetic records`}
          previous={previous}
          optimized={optimized}
          unit="ms"
        />
        <p className="cs-feature-takeaway">
          <strong>33.1% lower median</strong>
          <span>Processing only, at one million records.</span>
        </p>
      </div>
    </section>
  );
}

export function FeaturedCaseStudies() {
  return (
    <section
      className="section cs-home cs"
      aria-labelledby="featured-engineering"
    >
      <div className="cs-section-heading">
        <h2 id="featured-engineering">Featured Engineering Case Studies</h2>
        <Link className="cs-text-link" href="/case-studies">
          View All Case Studies
        </Link>
      </div>
      <CaseStudyGrid
        studies={caseStudies.filter(({ featured }) => featured).map(toCard)}
      />
    </section>
  );
}

export function CaseStudyFooter() {
  return (
    <footer className="cs-wrap cs-footer">
      <Link href="/">{profile.name}</Link>
      <nav aria-label="Footer navigation">
        <Link href="/#projects">Projects</Link>
        <Link href="/#contact">Contact</Link>
      </nav>
    </footer>
  );
}
