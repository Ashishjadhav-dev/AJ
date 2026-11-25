"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Command, Download, Menu, Moon, Sun, X } from "lucide-react";
import { Dialog } from "@/components/Dialog";
import { useTheme } from "@/components/Providers";

const homeSections = [
  "home",
  "experience",
  "projects",
  "skills",
  "about",
  "contact",
];

export function PortfolioNavigation({
  caseStudies,
  resume,
}: {
  caseStudies: boolean;
  resume: string;
}) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [query, setQuery] = useState("");
  const [activeSection, setActiveSection] = useState("home");
  const [open, setOpen] = useState<"menu" | "palette" | null>(null);

  useEffect(() => {
    if (pathname !== "/") return;
    const sections = homeSections.flatMap((id) => {
      const section = document.getElementById(id);
      return section ? [section] : [];
    });
    let frame = 0;
    const update = () => {
      frame = 0;
      const boundary = Math.max(140, window.innerHeight * 0.28);
      const current = sections
        .filter((section) => section.getBoundingClientRect().top <= boundary)
        .at(-1);
      setActiveSection(current?.id ?? "home");
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === "k" &&
        !document.querySelector(
          "dialog[open]:not(.command-palette):not(.mobile-dialog)",
        )
      ) {
        event.preventDefault();
        setQuery("");
        setOpen((value) => (value === "palette" ? null : "palette"));
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const links = [
    { label: "Home", key: "home", href: pathname === "/" ? "#home" : "/" },
    { label: "Experience", key: "experience", href: "/#experience" },
    ...(caseStudies
      ? [{ label: "Case Studies", key: "case-studies", href: "/case-studies" }]
      : []),
    { label: "Projects", key: "projects", href: "/projects" },
    { label: "Skills", key: "skills", href: "/#skills" },
    { label: "About", key: "about", href: "/#about" },
    { label: "Contact", key: "contact", href: "/#contact" },
  ].map(
    (link) =>
      ({
        ...link,
        current:
          pathname === "/"
            ? activeSection === link.key
              ? "location"
              : undefined
            : link.href.startsWith("/") &&
                link.href.length > 1 &&
                (pathname === link.href || pathname.startsWith(`${link.href}/`))
              ? "location"
              : undefined,
      }) as const,
  );
  const matches = [
    ...links,
    { label: "Resume", key: "resume", href: "/resume", current: undefined },
  ].filter(({ label }) =>
    label.toLowerCase().includes(query.trim().toLowerCase()),
  );
  const close = () => {
    setOpen(null);
    setQuery("");
  };

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <div className="site-wrap site-header-inner">
          <Link className="brand" href="/" aria-label="Ashish S. Jadhav, home">
            AJ<span aria-hidden>.</span>
          </Link>
          <nav className="desktop-nav" aria-label="Primary navigation">
            {links.map(({ label, href, current }) => (
              <Link key={href} href={href} aria-current={current}>
                {label}
              </Link>
            ))}
          </nav>
          <div className="nav-actions">
            <button
              className="icon-btn palette-opener"
              type="button"
              onClick={() => setOpen("palette")}
              aria-label="Open command palette"
              aria-haspopup="dialog"
            >
              <Command size={16} aria-hidden />
            </button>
            <button
              className="icon-btn"
              type="button"
              onClick={toggleTheme}
              aria-label="Dark theme"
              aria-pressed={theme === undefined ? undefined : theme === "dark"}
            >
              <Sun className="theme-icon-sun" size={17} aria-hidden />
              <Moon className="theme-icon-moon" size={17} aria-hidden />
            </button>
            <a
              className="site-button nav-resume"
              href={resume}
              download
              aria-label="Download Resume"
            >
              <Download size={15} aria-hidden /> Resume
            </a>
            <button
              className="icon-btn mobile-only"
              type="button"
              onClick={() => setOpen("menu")}
              aria-label="Open menu"
              aria-haspopup="dialog"
              aria-expanded={open === "menu"}
            >
              <Menu size={19} aria-hidden />
            </button>
          </div>
        </div>
      </header>
      <Dialog
        open={open === "menu"}
        onClose={close}
        label="Navigation"
        className="mobile-dialog"
      >
        <div className="mobile-menu-head">
          <strong>Navigation</strong>
          <button
            className="icon-btn"
            onClick={close}
            aria-label="Close navigation"
          >
            <X size={18} aria-hidden />
          </button>
        </div>
        <nav className="dialog-nav" aria-label="Mobile navigation">
          {links.map(({ label, href, current }) => (
            <Link key={href} href={href} aria-current={current} onClick={close}>
              {label}
            </Link>
          ))}
          <Link href="/resume" onClick={close}>
            View resume
          </Link>
        </nav>
      </Dialog>
      <Dialog
        open={open === "palette"}
        onClose={close}
        label="Quick navigation"
        className="command-palette"
      >
        <div className="palette-search">
          <Command size={16} aria-hidden />
          <input
            autoFocus
            aria-label="Search sections"
            placeholder="Search sections…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button
            className="icon-btn"
            onClick={close}
            aria-label="Close command palette"
          >
            <X size={16} aria-hidden />
          </button>
        </div>
        <div className="dialog-nav">
          {matches.map(({ label, href, current }) => (
            <Link key={href} href={href} aria-current={current} onClick={close}>
              {label}
            </Link>
          ))}
        </div>
        {!matches.length && (
          <p className="empty-state" role="status">
            No sections found. Try “projects” or “contact”.
          </p>
        )}
      </Dialog>
    </>
  );
}
