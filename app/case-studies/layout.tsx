import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { PortfolioNavigation } from "@/components/PortfolioNavigation";
import { CaseStudyFooter } from "@/components/case-studies/CaseStudyOverview";
import { caseStudiesEnabled } from "@/lib/case-study-release";

export default function CaseStudiesLayout({
  children,
}: {
  children: ReactNode;
}) {
  if (!caseStudiesEnabled) notFound();
  return (
    <div className="cs cs-site">
      <PortfolioNavigation caseStudies insideCaseStudies />
      <main className="cs-wrap" id="main-content" tabIndex={-1}>
        {children}
      </main>
      <CaseStudyFooter />
    </div>
  );
}
