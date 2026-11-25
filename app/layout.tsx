import { profile } from "@/data/portfolio";
import { Providers } from "@/components/Providers";
import { PortfolioNavigation } from "@/components/PortfolioNavigation";
import { Footer } from "@/components/Footer";
import { siteMetadata } from "@/lib/site-seo";
import { caseStudiesEnabled } from "@/lib/case-study-release";
import { getPortfolioPdf } from "@/lib/engineering-portfolio-pdf";
import "./globals.css";

export const metadata = siteMetadata(
  `${profile.name} — ${profile.role}`,
  profile.summary,
  "/",
);

const themeScript = `(() => {
  let theme;
  try { theme = localStorage.getItem("portfolio-theme"); } catch {}
  document.documentElement.dataset.theme = theme === "light" || theme === "dark"
    ? theme : matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
})();`;

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const engineeringPdf = caseStudiesEnabled
    ? await getPortfolioPdf()
    : undefined;
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Providers>
          <PortfolioNavigation
            caseStudies={caseStudiesEnabled}
            resume={profile.resume}
          />
          {children}
          <Footer
            caseStudies={caseStudiesEnabled}
            engineeringPdf={engineeringPdf?.href}
          />
        </Providers>
      </body>
    </html>
  );
}
