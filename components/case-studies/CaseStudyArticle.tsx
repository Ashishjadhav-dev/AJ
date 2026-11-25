import Link from "next/link";
import { caseStudies, getCaseStudy, toCard } from "@/data/case-studies";
import type { CaseStudy } from "@/data/case-studies/schema";
import { CaseStudyGrid, TechnologyTags } from "./CaseStudyCard";
import {
  CaseStudyArchitectureDiagram,
  CaseStudyCodeExample,
  CaseStudyTable,
  CaseStudyTradeoffs,
} from "./CaseStudyFigures";
import { CaseStudyMetric, PortfolioDownload } from "./CaseStudyOverview";
import { CaseStudyReading } from "./CaseStudyReading";
import { CaseStudyBenchmark } from "./CaseStudyBenchmark";
import { CaseStudyDemo } from "./CaseStudyDemo";

export function CaseStudyContributionSummary({
  contributions,
}: {
  contributions: string[];
}) {
  return (
    <section id="contributions" className="cs-article-section">
      <h2>My responsibilities</h2>
      <ul>
        {contributions.map((contribution) => (
          <li key={contribution}>{contribution}</li>
        ))}
      </ul>
    </section>
  );
}

export function RelatedCaseStudies({ slugs }: { slugs: string[] }) {
  const related = slugs.flatMap((slug) => {
    const study = getCaseStudy(slug);
    return study ? [toCard(study)] : [];
  });
  return (
    <section
      id="related"
      className="cs-related"
      aria-labelledby="related-heading"
    >
      <h2 id="related-heading">Related case studies</h2>
      <CaseStudyGrid studies={related} />
    </section>
  );
}

function ArticleNavigation({ slug }: { slug: string }) {
  const index = caseStudies.findIndex((study) => study.slug === slug);
  const previous = caseStudies[index - 1];
  const next = caseStudies[index + 1];
  return (
    <nav className="cs-article-nav" aria-label="Case study navigation">
      {previous && (
        <Link href={`/case-studies/${previous.slug}`}>
          <span>Previous case study</span>
          {previous.title}
        </Link>
      )}
      {next && (
        <Link className="cs-article-next" href={`/case-studies/${next.slug}`}>
          <span>Next case study</span>
          {next.title}
        </Link>
      )}
    </nav>
  );
}

export function CaseStudyArticle({ study }: { study: CaseStudy }) {
  const sections = [
    { id: "outcomes", title: "Key engineering outcomes" },
    ...study.sections.slice(0, 1),
    { id: "contributions", title: "My responsibilities" },
    ...study.sections.slice(1),
    { id: "related", title: "Related case studies" },
  ];
  return (
    <article className="cs-article">
      <header className="cs-article-header">
        <p className="cs-eyebrow">
          {study.category}
          <span aria-hidden> · </span>
          <span className="cs-meta">{study.minutes} min read</span>
        </p>
        <h1>{study.title}</h1>
        <p className="cs-subtitle">{study.subtitle}</p>
        <p className="cs-deck">{study.summary}</p>
        {study.pdfUrl && (
          <PortfolioDownload
            file={{ href: study.pdfUrl }}
            label="Download case study PDF"
          />
        )}
      </header>

      <CaseStudyReading
        sections={sections.map(({ id, title }) => ({ id, title }))}
      >
        <section className="cs-outcomes" id="outcomes">
          <h2>Key engineering outcomes</h2>
          <p>{study.outcome}</p>
          {study.metrics && (
            <dl className="cs-metrics">
              {study.metrics.map((metric) => (
                <CaseStudyMetric
                  key={metric.label + metric.value}
                  metric={metric}
                />
              ))}
            </dl>
          )}
          <h3>Technology stack</h3>
          <TechnologyTags technologies={study.technologies} />
        </section>
        {study.sections.map((section, index) => (
          <div key={section.id}>
            {index === 1 && (
              <CaseStudyContributionSummary
                contributions={study.contributions}
              />
            )}
            <section className="cs-article-section" id={section.id}>
              <h2>{section.title}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets && (
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
              {section.diagrams?.map((diagram) => (
                <CaseStudyArchitectureDiagram
                  key={diagram.title}
                  diagram={diagram}
                />
              ))}
              {section.example && <CaseStudyCodeExample {...section.example} />}
              {section.tradeoffs && (
                <CaseStudyTradeoffs entries={section.tradeoffs} />
              )}
              {section.table && <CaseStudyTable table={section.table} />}
              {section.demo === "csv" && study.benchmark && (
                <CaseStudyBenchmark data={study.benchmark} />
              )}
              {section.demo && section.demo !== "csv" && (
                <CaseStudyDemo kind={section.demo} />
              )}
            </section>
          </div>
        ))}
        <RelatedCaseStudies slugs={study.related} />
        <ArticleNavigation slug={study.slug} />
      </CaseStudyReading>
    </article>
  );
}
