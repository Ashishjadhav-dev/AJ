import { notFound } from "next/navigation";
import { CaseStudyFilters } from "@/components/case-studies/CaseStudyFilters";
import {
  CaseStudyBreadcrumb,
  CaseStudyHero,
  CaseStudyMetric,
  FeaturedCaseStudy,
} from "@/components/case-studies/CaseStudyOverview";
import { caseStudies, highlights, toCard } from "@/data/case-studies";
import { caseStudiesEnabled } from "@/lib/case-study-release";
import {
  caseStudyMetadata,
  engineeringBreadcrumb,
  safeJsonLd,
} from "@/lib/case-study-seo";
import { getPortfolioPdf } from "@/lib/engineering-portfolio-pdf";

export function generateMetadata() {
  if (!caseStudiesEnabled) return { robots: { index: false, follow: false } };
  return caseStudyMetadata(
    "Engineering Case Studies",
    "Explore ten professional frontend engineering case studies by Ashish S Jadhav, covering architecture, performance, and product engineering.",
  );
}

export default async function CaseStudiesPage() {
  if (!caseStudiesEnabled) notFound();
  const file = await getPortfolioPdf();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(engineeringBreadcrumb()),
        }}
      />
      <CaseStudyBreadcrumb />
      <CaseStudyHero file={file} />
      <section
        className="cs-highlights"
        aria-labelledby="engineering-highlights"
      >
        <h2 className="cs-eyebrow" id="engineering-highlights">
          Engineering highlights
        </h2>
        <dl className="cs-metrics">
          {highlights.map((metric) => (
            <CaseStudyMetric key={metric.label} metric={metric} />
          ))}
        </dl>
      </section>
      <FeaturedCaseStudy />
      <section
        id="collection"
        className="cs-collection"
        aria-labelledby="browse-studies"
      >
        <h2 id="browse-studies">All case studies</h2>
        <CaseStudyFilters studies={caseStudies.map(toCard)} />
      </section>
    </>
  );
}
