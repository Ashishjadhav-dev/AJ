import Link from "next/link";
import { certifications, education, experience } from "@/data/portfolio";
import { kasploContributions } from "@/data/case-studies/employment";
import { getCaseStudy } from "@/data/case-studies";

export function ExperienceTimeline({
  withCaseStudies = false,
}: {
  withCaseStudies?: boolean;
}) {
  return (
    <div className="experience-timeline">
      {experience.map(({ company, roles }, companyIndex) => (
        <div key={company} className="experience-employer">
          <h3>{company}</h3>
          <ol className="experience-roles">
            {roles.map(({ title, period, contributions }, roleIndex) => {
              const expanded =
                withCaseStudies && companyIndex === 0 && roleIndex === 0;
              const entries = expanded
                ? [...contributions.slice(0, 1), ...kasploContributions]
                : contributions;
              return (
                <li key={period} className="experience-role">
                  <div className="experience-role-title">
                    <h4>{title}</h4>
                    <p>{period}</p>
                  </div>
                  <ul className="experience-bullets">
                    {entries.map(({ text, study }) => (
                      <li key={text}>
                        {text}
                        {study && (
                          <Link
                            className="site-link experience-study"
                            href={`/case-studies/${study}`}
                          >
                            Read case study
                            <span className="sr-only">
                              {" "}
                              on {getCaseStudy(study)?.title}
                            </span>
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ol>
        </div>
      ))}
    </div>
  );
}

export function EducationTimeline() {
  return (
    <div className="education-timeline">
      <section aria-labelledby="education-heading">
        <h3 id="education-heading">Education</h3>
        <ul>
          {education.map(({ name, institution, period }) => (
            <li key={name}>
              <strong>{name}</strong>
              <p>{institution}</p>
              <span>{period}</span>
            </li>
          ))}
        </ul>
      </section>
      <section aria-labelledby="certifications-heading">
        <h3 id="certifications-heading">Certifications</h3>
        <ul>
          {certifications.map(({ name, issuer }) => (
            <li key={name}>
              <strong>{name}</strong>
              <p>{issuer}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
