import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Layers3 } from "lucide-react";
import { projects, type Project } from "@/data/projects";

export function ProjectScreenshot({
  screenshot,
}: {
  screenshot: NonNullable<Project["screenshot"]>;
}) {
  return (
    <figure className="project-screenshot">
      <Image
        src={screenshot.src}
        alt={screenshot.alt}
        width={screenshot.width}
        height={screenshot.height}
        sizes="(max-width: 760px) 100vw, 800px"
      />
      <figcaption>{screenshot.caption}</figcaption>
    </figure>
  );
}

export function Projects({ heading = "h3" }: { heading?: "h2" | "h3" }) {
  const Heading = heading;
  return (
    <div className="project-list">
      {projects.map((project) => (
        <article className="project-feature" key={project.slug}>
          <div className="project-feature-copy">
            <p className="site-meta">{project.status}</p>
            <Heading>{project.name}</Heading>
            <p className="project-subtitle">{project.subtitle}</p>
            <p>{project.description}</p>
            <ul className="site-tags" aria-label="Project technologies">
              {project.stack.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
            <div className="site-actions">
              <Link
                className="site-button site-button-primary"
                href={`/projects/${project.slug}`}
              >
                Explore project<span className="sr-only"> {project.name}</span>
              </Link>
              <a className="site-link" href={project.liveUrl}>
                Live application <ArrowUpRight size={15} aria-hidden />
              </a>
            </div>
          </div>
          <div className="project-feature-visual">
            {project.screenshot ? (
              <ProjectScreenshot screenshot={project.screenshot} />
            ) : (
              <figure className="project-flow-summary">
                <figcaption>
                  <Layers3 size={17} aria-hidden /> Growth workspace
                </figcaption>
                <ol>
                  <li>
                    <strong>Discover</strong>
                    <span>Companies and public signals</span>
                  </li>
                  <li>
                    <strong>Qualify</strong>
                    <span>Shortlist, stage and research</span>
                  </li>
                  <li>
                    <strong>Track</strong>
                    <span>Workspace opportunity pipeline</span>
                  </li>
                </ol>
              </figure>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
