import { Projects } from "@/components/Projects";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { siteMetadata } from "@/lib/site-seo";
import { profile } from "@/data/portfolio";

export const metadata = siteMetadata(
  `Independent Projects — ${profile.name}`,
  "Independent software projects by Ashish S. Jadhav, including the DetectGrowth B2B growth intelligence platform.",
  "/projects",
);

export default function ProjectsPage() {
  return (
    <main id="main-content" tabIndex={-1} className="site-wrap standard-page">
      <PageBreadcrumb
        entries={[
          { title: "Home", href: "/" },
          { title: "Projects", href: "/projects" },
        ]}
      />
      <header className="page-heading">
        <h1>Independent projects</h1>
        <p>
          Products I’m building outside my professional work, with details on
          implementation, testing and trade-offs.
        </p>
      </header>
      <Projects heading="h2" />
    </main>
  );
}
