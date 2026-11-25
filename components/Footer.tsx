import Link from "next/link";
import { profile } from "@/data/portfolio";

export function Footer({
  caseStudies,
  engineeringPdf,
}: {
  caseStudies: boolean;
  engineeringPdf?: string;
}) {
  return (
    <footer className="site-footer">
      <div className="site-wrap site-footer-inner">
        <div>
          <Link href="/" className="footer-name">
            {profile.name}
          </Link>
          <p>{profile.role}</p>
        </div>
        <nav aria-label="Footer navigation">
          <a href={profile.linkedin}>LinkedIn</a>
          <a href={profile.github}>GitHub</a>
          <a href={`mailto:${profile.email}`}>Email</a>
          <Link href="/resume">Resume</Link>
          {caseStudies && <Link href="/case-studies">Case Studies</Link>}
          {engineeringPdf && (
            <a href={engineeringPdf} download>
              Engineering portfolio PDF
            </a>
          )}
        </nav>
        <small>
          © {new Date().getUTCFullYear()} {profile.name}
        </small>
      </div>
    </footer>
  );
}
