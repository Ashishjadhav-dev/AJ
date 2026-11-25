import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { caseStudiesEnabled } from "@/lib/case-study-release";

export default function CaseStudiesLayout({
  children,
}: {
  children: ReactNode;
}) {
  if (!caseStudiesEnabled) notFound();
  return (
    <main className="cs cs-wrap cs-main" id="main-content" tabIndex={-1}>
      {children}
    </main>
  );
}
