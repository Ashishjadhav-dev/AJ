import { caseStudiesEnabled } from "@/lib/case-study-release";
import { readPortfolioPdf } from "@/lib/engineering-portfolio-pdf";

export const dynamic = "force-static";

export async function GET() {
  const bytes = caseStudiesEnabled ? await readPortfolioPdf() : undefined;
  if (!bytes?.length)
    return new Response("Portfolio PDF unavailable", { status: 404 });
  return new Response(bytes, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="engineering-portfolio.pdf"',
      "Content-Length": String(bytes.length),
    },
  });
}
