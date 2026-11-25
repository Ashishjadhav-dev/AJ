"use client";

import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Projects } from "@/components/Projects";
import { scrollToSection } from "@/lib/navigation";
import Link from "next/link";
import { PortfolioNavigation } from "@/components/PortfolioNavigation";
import {
  profile,
  experience,
  skillGroups,
  articles,
  heroWords,
  stats,
  about,
} from "@/data/portfolio";
import { useEffect, useState, type ReactNode } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { ArrowRight, Code2, Send, Terminal, Zap } from "lucide-react";

export default function Portfolio({
  featured,
  caseStudies = false,
}: {
  featured?: ReactNode;
  caseStudies?: boolean;
}) {
  const reducedMotion = useReducedMotion();
  const [years, setYears] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 24,
    mass: 0.3,
  });

  useEffect(() => {
    setYears(
      (
        Math.floor(
          ((Date.now() - Date.parse(profile.careerStart)) / 86400000 / 365.25) *
            10,
        ) / 10
      ).toFixed(1),
    );
  }, []);

  const [heroWord, setHeroWord] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    const id = window.setInterval(
      () => setHeroWord((value) => (value + 1) % heroWords.length),
      2400,
    );
    return () => window.clearInterval(id);
  }, [reducedMotion]);

  return (
    <main className="site-shell">
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="grid-overlay" />

      <PortfolioNavigation caseStudies={caseStudies} />

      <section id="home" className="hero section" tabIndex={-1}>
        <div className="hero-copy">
          <motion.div
            className="eyebrow"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Terminal size={15} /> {"// frontend engineer"}
          </motion.div>
          <motion.h1
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28 }}
          >
            <span className="code-muted">const ashish = &#123;</span>
            <br />
            <span className="indent">turnIdeasInto(</span>
            <br />
            <span className="hero-highlight indent-lg">
              “{heroWords[heroWord]}”
            </span>
            <span className="cursor">|</span>
            <br />
            <span className="indent">);</span>
            <br />
            <span className="code-muted">&#125;;</span>
          </motion.h1>
          <motion.p
            className="hero-description"
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Building scalable, high-performance web applications with React,
            Next.js and TypeScript — with a focus on architecture, workflow
            systems, real-time UX and product quality.
          </motion.p>
          <motion.div
            className="hero-actions"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.58 }}
          >
            <button
              className="primary-btn"
              onClick={() => scrollToSection("Projects")}
            >
              View my work <ArrowRight size={17} />
            </button>
            <button
              className="secondary-btn"
              onClick={() => scrollToSection("Contact")}
            >
              Let&apos;s connect <Send size={16} />
            </button>
          </motion.div>
          <div className="stats-grid">
            {[
              { value: years ? `${years}+` : "—", label: "Years Experience" },
              ...stats,
            ].map(({ value, label }) => {
              return (
                <div key={label} className="stat">
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <motion.div
          className="hero-visual panel"
          initial={false}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ delay: 0.42, duration: 0.8 }}
        >
          <div className="editor-tabs">
            <span className="active-tab">portfolio.tsx</span>
            <span>+</span>
          </div>
          <div className="editor-body">
            <div className="line">
              <span>01</span>
              <code>
                <b>import</b> Developer <b>from</b> <i>&quot;@/ashish&quot;</i>;
              </code>
            </div>
            <div className="line">
              <span>02</span>
              <code />
            </div>
            <div className="line">
              <span>03</span>
              <code>
                <b>const</b> developer = &#123;
              </code>
            </div>
            <div className="line">
              <span>04</span>
              <code>
                &nbsp;&nbsp;name: <i>&quot;{profile.name}&quot;</i>,
              </code>
            </div>
            <div className="line">
              <span>05</span>
              <code>
                &nbsp;&nbsp;role: <i>&quot;{profile.role}&quot;</i>,
              </code>
            </div>
            <div className="line">
              <span>06</span>
              <code>
                &nbsp;&nbsp;focus: [<i>&quot;Architecture&quot;</i>,{" "}
                <i>&quot;Performance&quot;</i>],
              </code>
            </div>
            <div className="line">
              <span>07</span>
              <code>
                &nbsp;&nbsp;builds: <i>&quot;Complex SaaS&quot;</i>,
              </code>
            </div>
            <div className="line">
              <span>08</span>
              <code>&#125;;</code>
            </div>
            <div className="line">
              <span>09</span>
              <code />
            </div>
            <div className="line">
              <span>10</span>
              <code>
                <em>{"// currently building things that scale"}</em>
              </code>
            </div>
          </div>
          <div className="terminal-panel">
            <div>
              <span className="terminal-symbol">$</span> npm run dev
            </div>
            <div className="terminal-success">✓ Ready on localhost:3000</div>
          </div>
          <motion.div
            className="floating-badge badge-one"
            animate={reducedMotion ? {} : { y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 3.5 }}
          >
            <Code2 size={16} /> React
          </motion.div>
          <motion.div
            className="floating-badge badge-two"
            animate={reducedMotion ? {} : { y: [0, 9, 0] }}
            transition={{ repeat: Infinity, duration: 4.2 }}
          >
            <Zap size={16} /> Performance
          </motion.div>
        </motion.div>
      </section>

      <section id="about" className="section section-grid">
        <div>
          <div className="eyebrow">
            <Code2 size={15} /> {"// about.me"}
          </div>
          <h2>More than just code.</h2>
          <p className="section-copy">{about.description}</p>
          <div className="pill-row">
            {about.interests.map((item) => (
              <span key={item} className="pill">
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="about-card panel">
          <div className="avatar-shell">
            <div className="avatar-monogram">AJ</div>
          </div>
          <div className="about-code">
            <span>const</span> currentlyExploring = [<br />
            {about.exploring.map((item) => (
              <span className="exploring-item" key={item}>
                &nbsp;&nbsp;&quot;{item}&quot;,
                <br />
              </span>
            ))}
            ];
          </div>
        </div>
      </section>

      <Projects />
      {featured}

      <section id="experience" className="section section-grid experience-grid">
        <div>
          <div className="eyebrow">
            <Terminal size={15} /> {"// experience"}
          </div>
          <h2>git log --career</h2>
          <p className="section-copy">
            Career progression visualized as commits, not a generic timeline.
          </p>
        </div>
        <div className="git-log">
          {experience.map((item, index) => (
            <motion.div
              className="commit"
              key={item.date}
              initial={false}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: index * 0.08 }}
            >
              <div className="commit-dot" />
              <div className="commit-body">
                <span className="commit-date">{item.date}</span>
                <h3>{item.role}</h3>
                <strong>{item.company}</strong>
                {item.bullets.map((bullet) => (
                  <p key={bullet}>
                    + {bullet}
                    {caseStudies && index === 0 && (
                      <>
                        {" "}
                        <Link
                          className="text-link"
                          href={
                            bullet.startsWith("Owned")
                              ? "/case-studies/multi-tenant-caching"
                              : "/case-studies/ai-content-editors"
                          }
                        >
                          {bullet.startsWith("Owned")
                            ? "Data architecture"
                            : "AI editor integration"}
                        </Link>
                      </>
                    )}
                  </p>
                ))}
                {caseStudies && index === 0 && (
                  <Link
                    className="text-link experience-case-link"
                    href="/case-studies"
                  >
                    Explore Engineering Contributions
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="eyebrow">
          <Code2 size={15} /> {"// skills"}
        </div>
        <h2>npm list --depth=0</h2>
        <div className="skills-grid">
          {skillGroups.map((group, i) => (
            <div className="skill-panel panel" key={i}>
              {group.map((skill) => (
                <motion.span key={skill} whileHover={{ scale: 1.05, x: 4 }}>
                  {skill}
                  <small> installed ✓</small>
                </motion.span>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section id="blog" className="section">
        <div className="section-heading-row">
          <div>
            <div className="eyebrow">{"// dev-notes"}</div>
            <h2>Sharing what I learn.</h2>
          </div>
          <span className="section-command">$ cat ./writing</span>
        </div>
        <div className="article-grid">
          {articles.map((article, index) => (
            <motion.article
              className="article-card panel"
              key={article.title}
              whileHover={{ y: -5 }}
            >
              <span>0{index + 1}.md</span>
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              {article.url ? (
                <a
                  className="text-link"
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read article <ArrowRight size={15} />
                </a>
              ) : (
                <span className="draft-label">Planned article</span>
              )}
            </motion.article>
          ))}
        </div>
      </section>

      <Contact caseStudies={caseStudies} />

      <Footer />
    </main>
  );
}
