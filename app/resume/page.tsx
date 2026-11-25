import Link from "next/link";
import { Download, ExternalLink } from "lucide-react";
import { profile, skills } from "@/data/portfolio";
import { projects } from "@/data/projects";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import {
  EducationTimeline,
  ExperienceTimeline,
} from "@/components/ProfessionalHistory";
import { PortfolioDownload } from "@/components/case-studies/CaseStudyOverview";
import { siteMetadata } from "@/lib/site-seo";
import { caseStudiesEnabled } from "@/lib/case-study-release";
import { getPortfolioPdf } from "@/lib/engineering-portfolio-pdf";
import "@/app/portfolio.css";

export const metadata = siteMetadata(
  `Resume — ${profile.name}`,
  "Download the resume of Ashish S. Jadhav, Frontend Software Engineer, and review his professional experience, technical skills and education.",
  "/resume",
);

export default async function ResumePage() {
  const pdf = caseStudiesEnabled ? await getPortfolioPdf() : undefined;
  const project = projects[0];
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="site-wrap standard-page resume-page"
    >
      <div className="screen-only">
        <PageBreadcrumb
          entries={[
            { title: "Home", href: "/" },
            { title: "Resume", href: "/resume" },
          ]}
        />
      </div>
      <header className="page-heading resume-heading">
        <p className="site-kicker screen-only">Resume</p>
        <h1>{profile.name}</h1>
        <p className="project-detail-subtitle">{profile.role}</p>
        <p>{profile.summary}</p>
        <div className="site-actions screen-only">
          <a
            className="site-button site-button-primary"
            href={profile.resume}
            download
          >
            <Download size={17} aria-hidden />
            Download Resume
          </a>
          <a
            className="site-button"
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink size={16} aria-hidden />
            Open PDF in new tab
          </a>
        </div>
        <address className="resume-contact">
          <span>{profile.location}</span>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <a href={profile.linkedin}>LinkedIn</a>
          <a href={profile.github}>GitHub</a>
          <Link href="/">Portfolio</Link>
          {caseStudiesEnabled && (
            <Link href="/case-studies">Engineering Case Studies</Link>
          )}
        </address>
      </header>
      <div className="resume-body">
        <section className="resume-section">
          <h2>Professional experience</h2>
          <ExperienceTimeline />
        </section>
        <section className="resume-section resume-project">
          <h2>Independent project</h2>
          <h3>
            {project.name} · {project.subtitle}
          </h3>
          <p>{project.description}</p>
          <p>{project.stack.join(" · ")}</p>
          <p>
            <a className="site-link" href={project.liveUrl}>
              Live application
            </a>{" "}
            <Link
              className="site-link screen-only"
              href={`/projects/${project.slug}`}
            >
              Project details
            </Link>
          </p>
        </section>
        <section className="resume-section resume-skills">
          <h2>Technical expertise</h2>
          <dl>
            {skills.map(({ title, items }) => (
              <div key={title}>
                <dt>{title}</dt>
                <dd>{items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </section>
        <section className="resume-section">
          <h2>Education & certifications</h2>
          <EducationTimeline />
        </section>
      </div>
      {caseStudiesEnabled && (
        <section className="resume-section screen-only cs">
          <h2>Engineering portfolio</h2>
          <div className="site-actions">
            <Link className="site-link" href="/case-studies">
              Explore Engineering Case Studies
            </Link>
            <PortfolioDownload file={pdf} />
          </div>
        </section>
      )}
    </main>
  );
}
