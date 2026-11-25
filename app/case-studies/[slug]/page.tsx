import { notFound } from "next/navigation";
import { CaseStudyArticle } from "@/components/case-studies/CaseStudyArticle";
import { CaseStudyBreadcrumb } from "@/components/case-studies/CaseStudyOverview";
import { caseStudies, getCaseStudy } from "@/data/case-studies";
import { profile } from "@/data/portfolio";
import { caseStudiesEnabled, portfolioSiteUrl } from "@/lib/case-study-release";
import {
  caseStudyMetadata,
  engineeringBreadcrumb,
  safeJsonLd,
} from "@/lib/case-study-seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudiesEnabled ? caseStudies.map(({ slug }) => ({ slug })) : [];
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const study = caseStudiesEnabled ? getCaseStudy(slug) : undefined;
  if (!study) return { robots: { index: false, follow: false } };
  return caseStudyMetadata(study.title, study.seoDescription, slug);
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = caseStudiesEnabled ? getCaseStudy(slug) : undefined;
  if (!study) notFound();
  const article = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: study.title,
    description: study.seoDescription,
    mainEntityOfPage: new URL(`/case-studies/${slug}`, portfolioSiteUrl).href,
    image: new URL("/case-studies/social-preview", portfolioSiteUrl).href,
    author: { "@type": "Person", name: profile.name, url: portfolioSiteUrl },
    inLanguage: "en",
    about: study.technologies,
    timeRequired: `PT${study.minutes}M`,
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd([
            engineeringBreadcrumb(study.title, slug),
            article,
          ]),
        }}
      />
      <CaseStudyBreadcrumb current={study.title} />
      <CaseStudyArticle key={slug} study={study} />
    </>
  );
}
