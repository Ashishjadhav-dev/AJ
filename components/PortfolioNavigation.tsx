"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Command, Menu, Moon, Sun, X } from "lucide-react";
import { Dialog } from "@/components/Dialog";
import { useTheme } from "@/components/Providers";
import { navItems, profile } from "@/data/portfolio";

export function PortfolioNavigation({
  caseStudies,
  insideCaseStudies = false,
}: {
  caseStudies: boolean;
  insideCaseStudies?: boolean;
}) {
  const { theme, changeTheme } = useTheme();
  const [query, setQuery] = useState("");
  const [activeSection, setActiveSection] = useState("home");
  const [open, setOpen] = useState<"menu" | "palette" | null>(null);

  useEffect(() => {
    if (insideCaseStudies) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-15% 0px -65% 0px" },
    );
    for (const item of navItems) {
      const section = document.getElementById(item.toLowerCase());
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, [insideCaseStudies]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setQuery("");
        setOpen((value) => (value === "palette" ? null : "palette"));
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const labels = caseStudies
    ? [
        "Home",
        "About",
        "Experience",
        "Projects",
        "Case Studies",
        "Blog",
        "Contact",
      ]
    : navItems;
  const links = labels.map((label) => {
    const key = label.toLowerCase();
    const isCaseStudies = label === "Case Studies";
    const href = isCaseStudies
      ? "/case-studies"
      : `${insideCaseStudies ? "/" : ""}#${key}`;
    const current = insideCaseStudies
      ? isCaseStudies
        ? "location"
        : undefined
      : key === activeSection
        ? "location"
        : undefined;
    return { label, key, href, current } as const;
  });
  const matches = links.filter(({ key }) =>
    key.includes(query.trim().toLowerCase()),
  );
  const close = () => {
    setOpen(null);
    setQuery("");
  };

  return (
    <>
      <a
        className="skip-link"
        href={insideCaseStudies ? "#main-content" : "#home"}
      >
        Skip to content
      </a>
      <header className="nav-wrap">
        <div className="nav panel">
          <Link
            className="brand"
            href={insideCaseStudies ? "/" : "#home"}
            aria-label="Go home"
          >
            AJ
          </Link>
          <nav className="desktop-nav" aria-label="Primary navigation">
            {links.map(({ label, href, current }, index) => (
              <Link key={href} href={href} aria-current={current}>
                <span aria-hidden="true">0{index + 1}.</span> {label}
              </Link>
            ))}
          </nav>
          <div className="nav-actions">
            <Link
              className="availability"
              href={insideCaseStudies ? "/#contact" : "#contact"}
            >
              <span className="status-dot" />{" "}
              {profile.available ? "Available" : "Let’s connect"}
            </Link>
            <button
              className="icon-btn"
              onClick={() => setOpen("palette")}
              aria-label="Open command palette"
            >
              <Command size={17} />
            </button>
            <button
              className="icon-btn"
              onClick={() => changeTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <button
              className="icon-btn mobile-only"
              onClick={() => setOpen("menu")}
              aria-label="Open menu"
              aria-haspopup="dialog"
              aria-expanded={open === "menu"}
            >
              <Menu size={18} />
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
          <span className="brand">AJ</span>
          <button
            className="icon-btn"
            onClick={close}
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        </div>
        <nav className="dialog-nav" aria-label="Mobile navigation">
          {links.map(({ label, href, current }) => (
            <Link key={href} href={href} aria-current={current} onClick={close}>
              {label}
            </Link>
          ))}
        </nav>
      </Dialog>
      <Dialog
        open={open === "palette"}
        onClose={close}
        label="Quick navigation"
        className="command-palette"
      >
        <div className="palette-search">
          <Command size={16} />
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
            <X size={16} />
          </button>
        </div>
        <div className="dialog-nav">
          {matches.map(({ key, href, current }) => (
            <Link key={href} href={href} aria-current={current} onClick={close}>
              /{key} <ArrowRight size={14} />
            </Link>
          ))}
        </div>
        {matches.length === 0 && (
          <p className="empty-state" role="status">
            No sections found. Try “projects” or “contact”.
          </p>
        )}
      </Dialog>
    </>
  );
}
