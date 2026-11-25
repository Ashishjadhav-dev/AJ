import Portfolio from "@/components/Portfolio";
import { FeaturedCaseStudies } from "@/components/case-studies/CaseStudyOverview";
import { caseStudiesEnabled } from "@/lib/case-study-release";

export default function Home() {
  return (
    <Portfolio
      caseStudies={caseStudiesEnabled}
      featured={caseStudiesEnabled ? <FeaturedCaseStudies /> : undefined}
    />
  );
}
