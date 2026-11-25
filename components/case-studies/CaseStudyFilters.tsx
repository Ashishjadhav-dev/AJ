"use client";

import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { categories, type Category } from "@/data/case-studies/schema";
import type { CardContent } from "@/data/case-studies";
import { CaseStudyGrid } from "./CaseStudyCard";

type Filters = { query: string; category: Category | "" };
const emptyFilters: Filters = { query: "", category: "" };

function readFilters(): Filters {
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");
  return {
    query: (params.get("q") ?? "").slice(0, 100),
    category:
      category && Object.hasOwn(categories, category)
        ? (category as Category)
        : "",
  };
}

export function CaseStudyFilters({ studies }: { studies: CardContent[] }) {
  const [filters, setFilters] = useState(emptyFilters);
  const search = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const sync = () => setFilters(readFilters());
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  const update = ({ query, category }: Filters) => {
    setFilters({ query, category });
    const url = new URL(window.location.href);
    if (query.trim()) url.searchParams.set("q", query.trim());
    else url.searchParams.delete("q");
    if (category) url.searchParams.set("category", category);
    else url.searchParams.delete("category");
    window.history.replaceState(null, "", url);
  };

  const clear = () => {
    update(emptyFilters);
    search.current?.focus({ preventScroll: true });
  };

  const terms = filters.query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const matches = studies.filter((study) => {
    const searchable = [
      study.title,
      study.summary,
      study.subtitle,
      ...study.technologies,
    ]
      .join(" ")
      .toLowerCase();
    return (
      (!filters.category || study.filter === filters.category) &&
      terms.every((term) => searchable.includes(term))
    );
  });

  return (
    <>
      <div className="cs-filter" role="search" aria-label="Filter case studies">
        <div className="cs-search-line">
          <label className="cs-search">
            <Search size={18} aria-hidden />
            <span className="sr-only">Search case studies</span>
            <input
              ref={search}
              maxLength={100}
              type="search"
              aria-controls="case-study-results"
              placeholder="Search case studies…"
              value={filters.query}
              onChange={(event) =>
                update({ ...filters, query: event.target.value })
              }
            />
          </label>
          <button
            className="cs-text-link"
            type="button"
            disabled={!filters.query && !filters.category}
            onClick={clear}
          >
            Clear filters
          </button>
        </div>
        <div
          className="cs-filter-categories"
          role="group"
          aria-label="Filter by category"
        >
          <button
            type="button"
            aria-pressed={!filters.category}
            aria-controls="case-study-results"
            onClick={() => update({ ...filters, category: "" })}
          >
            All
          </button>
          {(Object.entries(categories) as [Category, string][]).map(
            ([category, label]) => (
              <button
                type="button"
                key={category}
                aria-pressed={filters.category === category}
                aria-controls="case-study-results"
                onClick={() => update({ ...filters, category })}
              >
                {label}
              </button>
            ),
          )}
        </div>
      </div>
      <p className="cs-result-count" role="status" aria-atomic="true">
        {matches.length} {matches.length === 1 ? "case study" : "case studies"}
        <span className="sr-only">
          {filters.category && ` in ${categories[filters.category]}`}
          {filters.query.trim() && ` matching “${filters.query.trim()}”`}
        </span>
      </p>
      <div id="case-study-results">
        {matches.length ? (
          <CaseStudyGrid studies={matches} />
        ) : (
          <div className="cs-empty">
            <h3>No matching case studies</h3>
            <p>
              Try a different title or technology, or choose another category.
            </p>
            <button className="cs-button" type="button" onClick={clear}>
              Show all case studies
            </button>
          </div>
        )}
      </div>
    </>
  );
}
