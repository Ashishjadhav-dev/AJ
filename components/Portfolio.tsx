import Link from "next/link";
import {
  ArrowUpRight,
  Braces,
  Database,
  Download,
  Github,
  Linkedin,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { profile, skills, about, publishedArticles } from "@/data/portfolio";
import { highlights } from "@/data/case-studies";
import type { Metric } from "@/data/case-studies/schema";
import { caseStudiesEnabled } from "@/lib/case-study-release";
import {
  CaseStudyMetric,
  FeaturedCaseStudies,
} from "@/components/case-studies/CaseStudyOverview";
import { PersonJsonLd } from "@/components/JsonLd";
import { Contact } from "@/components/Contact";
import { Projects } from "@/components/Projects";
import {
  EducationTimeline,
  ExperienceTimeline,
} from "@/components/ProfessionalHistory";
import "@/app/portfolio.css";

const coreMetrics: Metric[] = [
  {
    value: "3+",
    unit: "years",
    label: "Years in industry",
    scope: "Professional experience",
    context: "Software engineering roles and internships since 2023.",
    method: "Resume employment chronology",
    verification: "resume",
    release: "public",
  },
  {
    value: "4",
    unit: "roles",
    label: "Engineering roles",
    scope: "Career progression",
    context: "From software engineering internships to software engineer.",
    method: "Count of roles listed on the latest resume",
    verification: "resume",
    release: "public",
  },
  {
    value: "1",
    unit: "project",
    label: "Independent SaaS project",
    scope: "Independent development",
    context: "DetectGrowth, from frontend workflows through persistence.",
    method: "Inspected application source and public repository",
    verification: "documented",
    release: "public",
  },
];

const architecture = [
  { label: "Interface", value: "React · Next.js · TypeScript", Icon: Braces },
  {
    label: "Data & state",
    value: "REST · TanStack Query · Redux Toolkit",
    Icon: Database,
  },
  {
    label: "Quality",
    value: "Accessibility · Testing · Performance",
    Icon: ShieldCheck,
  },
];

function ProfessionalHero() {
  return (
    <section id="home" className="site-wrap professional-hero">
      <div>
        <p className="site-kicker">{profile.role}</p>
        <h1>{profile.name}</h1>
        <p className="hero-headline">{profile.headline}</p>
        <p className="hero-summary">{profile.summary}</p>
        <div className="site-actions">
          <Link
            className="site-button site-button-primary"
            href={caseStudiesEnabled ? "/case-studies" : "#experience"}
          >
            {caseStudiesEnabled
              ? "Explore Engineering Case Studies"
              : "Explore Engineering Experience"}
          </Link>
          <a className="site-button" href={profile.resume} download>
            <Download size={17} aria-hidden />
            Download Resume
          </a>
        </div>
        <div
          className="hero-socials"
          aria-label="Professional links"
          role="group"
        >
          <a href={profile.linkedin}>
            <Linkedin size={16} aria-hidden /> LinkedIn
          </a>
          <a href={profile.github}>
            <Github size={16} aria-hidden /> GitHub
          </a>
          <a href={`mailto:${profile.email}`}>
            <Mail size={16} aria-hidden /> Email
          </a>
        </div>
      </div>
      <aside
        className="hero-architecture"
        aria-labelledby="hero-architecture-heading"
      >
        <h2 id="hero-architecture-heading">
          <span aria-hidden>{"//"}</span> Frontend architecture
        </h2>
        <dl>
          {architecture.map(({ label, value, Icon }) => (
            <div key={label} className="hero-layer">
              <dt>
                <Icon size={18} aria-hidden />
                {label}
              </dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </aside>
    </section>
  );
}

function EngineeringHighlights() {
  const shown = caseStudiesEnabled
    ? [
        coreMetrics[0],
        ...highlights.filter(
          ({ verification }) => verification !== "documented",
        ),
      ]
    : coreMetrics;
  return (
    <section
      className="cs site-wrap portfolio-highlights"
      aria-labelledby="portfolio-highlights"
    >
      <h2 className="site-kicker" id="portfolio-highlights">
        Engineering highlights
      </h2>
      <dl className="cs-metrics">
        {shown.map((metric) => (
          <CaseStudyMetric key={metric.label} metric={metric} />
        ))}
      </dl>
    </section>
  );
}

export default function Portfolio() {
  return (
    <main id="main-content" className="portfolio-main" tabIndex={-1}>
      <PersonJsonLd />
      <ProfessionalHero />
      <EngineeringHighlights />
      {caseStudiesEnabled && <FeaturedCaseStudies />}
      <section
        id="experience"
        className="site-wrap site-section experience-section"
        aria-labelledby="experience-heading"
      >
        <div className="section-intro">
          <h2 id="experience-heading">Professional experience</h2>
          <p>
            Frontend product work across multichannel SaaS, internal tools and
            database-backed applications.
          </p>
        </div>
        <ExperienceTimeline withCaseStudies={caseStudiesEnabled} />
      </section>
      <section
        id="projects"
        className="site-wrap site-section"
        aria-labelledby="projects-heading"
      >
        <div className="section-intro section-intro-link">
          <div>
            <h2 id="projects-heading">Independent projects</h2>
            <p>Products I’m building outside my professional work.</p>
          </div>
          <Link href="/projects" className="site-link">
            View all projects
          </Link>
        </div>
        <Projects />
      </section>
      <section
        id="skills"
        className="site-wrap site-section"
        aria-labelledby="skills-heading"
      >
        <div className="section-intro">
          <h2 id="skills-heading">Technical expertise</h2>
        </div>
        <div className="skills-editorial">
          {skills.map(({ title, items }) => (
            <section key={title}>
              <h3>{title}</h3>
              <ul className="site-tags">
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>
      <section
        id="about"
        className="site-wrap site-section about-editorial"
        aria-labelledby="about-heading"
      >
        <div>
          <div className="section-intro">
            <h2 id="about-heading">About</h2>
          </div>
          <div className="site-prose">
            {about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <EducationTimeline />
      </section>
      {publishedArticles.length > 0 && (
        <section
          className="site-wrap site-section"
          aria-labelledby="writing-heading"
        >
          <div className="section-intro">
            <h2 id="writing-heading">Writing</h2>
          </div>
          <div className="writing-editorial">
            {publishedArticles.map(({ title, description, url }) => (
              <article key={url}>
                <h3>
                  <a className="site-link" href={url}>
                    {title} <ArrowUpRight size={14} aria-hidden />
                  </a>
                </h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>
      )}
      <Contact />
    </main>
  );
}
