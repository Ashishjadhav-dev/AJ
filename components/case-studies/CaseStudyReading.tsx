"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export type ReadingSection = { id: string; title: string };

export function ReadingProgress({ value }: { value: number }) {
  return (
    <progress
      className="cs-reading-progress"
      aria-label="Article reading progress"
      max={100}
      value={value}
    />
  );
}

export function CaseStudyTableOfContents({
  sections,
  active,
}: {
  sections: ReadingSection[];
  active: string;
}) {
  const details = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1000px)");
    const update = () => {
      if (details.current) details.current.open = desktop.matches;
    };
    update();
    desktop.addEventListener("change", update);
    return () => desktop.removeEventListener("change", update);
  }, []);

  return (
    <details className="cs-toc" ref={details}>
      <summary>On this page</summary>
      <nav aria-label="On this page">
        <ol>
          {sections.map(({ id, title }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={active === id ? "location" : undefined}
              >
                {title}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </details>
  );
}

export function CaseStudyReading({
  sections,
  children,
}: {
  sections: ReadingSection[];
  children: ReactNode;
}) {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(sections[0]?.id ?? "");
  const article = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = article.current;
    if (!content) return;
    const headings = sections.flatMap(({ id }) => {
      const section = document.getElementById(id);
      return section ? [section] : [];
    });
    let frame = 0;
    const measure = () => {
      frame = 0;
      const { top, bottom } = content.getBoundingClientRect();
      const offset =
        parseFloat(
          getComputedStyle(document.documentElement).scrollPaddingBlockStart,
        ) || 0;
      const range = Math.max(1, bottom - top - innerHeight + offset);
      const completion = Math.round(
        Math.min(1, Math.max(0, (offset - top) / range)) * 100,
      );
      setProgress(completion);
      let current = sections[0]?.id ?? "";
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top > offset + 12) break;
        current = heading.id;
      }
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(content);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [sections]);

  return (
    <div className="cs-reading">
      <ReadingProgress value={progress} />
      <aside className="cs-reading-sidebar">
        <CaseStudyTableOfContents sections={sections} active={active} />
      </aside>
      <div className="cs-reading-body" ref={article}>
        {children}
      </div>
    </div>
  );
}
