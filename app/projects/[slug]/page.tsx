import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/portfolio";
import { projects } from "@/data/projects";
import { siteMetadata } from "@/lib/site-seo";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { CaseStudyArchitectureDiagram } from "@/components/case-studies/CaseStudyFigures";
import { CaseStudyReading } from "@/components/case-studies/CaseStudyReading";
import { ProjectScreenshot } from "@/components/Projects";
import "@/app/case-studies/case-studies.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return project
    ? siteMetadata(
        `${project.name} — ${profile.name}`,
        project.description,
        `/projects/${slug}`,
      )
    : {};
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  return (
    <main id="main-content" tabIndex={-1} className="site-wrap standard-page">
      <PageBreadcrumb
        entries={[
          { title: "Home", href: "/" },
          { title: "Projects", href: "/projects" },
          { title: project.name, href: `/projects/${slug}` },
        ]}
      />
      <article className="cs project-article">
        <header className="page-heading">
          <p className="site-kicker">{project.status}</p>
          <h1>{project.name}</h1>
          <p className="project-detail-subtitle">{project.subtitle}</p>
          <p>{project.description}</p>
          <div className="site-actions">
            <a
              className="site-button site-button-primary"
              href={project.liveUrl}
            >
              Live application <ArrowUpRight size={16} aria-hidden />
            </a>
            {project.sourceUrl && (
              <a className="site-button" href={project.sourceUrl}>
                Public repository <ArrowUpRight size={16} aria-hidden />
              </a>
            )}
          </div>
          <ul className="site-tags" aria-label="Project technologies">
            {project.stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </header>
        <CaseStudyReading
          sections={project.sections.map(({ id, title }) => ({ id, title }))}
        >
          {project.screenshot && (
            <ProjectScreenshot screenshot={project.screenshot} />
          )}
          {project.sections.map(({ id, title, paragraphs, items }) => (
            <section className="cs-article-section" id={id} key={id}>
              <h2>{title}</h2>
              {paragraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {items && (
                <ul>
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {id === "architecture" &&
                project.diagrams.map((diagram) => (
                  <CaseStudyArchitectureDiagram
                    key={diagram.title}
                    diagram={diagram}
                  />
                ))}
            </section>
          ))}
        </CaseStudyReading>
      </article>
    </main>
  );
}
