# Ashish’s engineering portfolio

A Next.js portfolio for Ashish S. Jadhav, Frontend Software Engineer. It uses server-rendered content and small interactive components for theme controls, navigation, contact drafts and case-study demos.

## Run locally

Use Node.js 22 or newer and the pnpm version pinned in `package.json`.

```sh
pnpm install --frozen-lockfile
ENGINEERING_CASE_STUDIES_PUBLIC=true pnpm dev
```

Open http://localhost:3000. The case-study flag is opt-in at build time. It controls public article pages, featured content, detailed role contributions, navigation, PDF delivery and sitemap entries. Set it on a public deployment after confirming release approval for the content and assets. Set `PORTFOLIO_SITE_URL` when changing the canonical domain.

## Checks

```sh
pnpm typecheck
pnpm lint
ENGINEERING_CASE_STUDIES_PUBLIC=true pnpm build
ENGINEERING_CASE_STUDIES_PUBLIC=true pnpm test:e2e
```

Production builds enforce TypeScript and ESLint. ESLint also fails on warnings.

The Playwright suite uses Google Chrome and a local production server on port 3100. It runs axe on every enabled page in both themes and covers the Chromium accessibility tree, keyboard shortcuts, forced colors, and focus restoration. Run a second build and the release-gate tests without the flag to verify the private default. Browser checks complement a manual screen reader review.

## Content and downloads

- `data/portfolio.ts` holds the public profile, resume-aligned career history, skills, education, credentials and writing.
- `data/projects.ts` documents verified independent projects and their links. Project pages are generated from this collection.
- `data/case-studies/` contains technical articles, diagrams, benchmark evidence, methodology, scope and optional downloads. Reading estimates use the published article text at 200 words per minute.
- The resume is the supplied `Ashish_Jadhav_SDE.pdf`, served byte-for-byte from `public/documents/ashish-jadhav-resume.pdf`. The former PDF URL redirects to this file. The online resume links to the collection when the release flag is enabled.
- Add an approved engineering portfolio PDF at `documents/engineering-portfolio.pdf` before building. The server exposes it only through the gated route. The existing PDF actions describe availability when the file is absent.

The website uses the verified assessment claims for public copy. The supplied resume export preserves its original claims. The editable source for this specific export is needed to revise its claims and embed an Engineering Case Studies hyperlink.

## Interaction details

The shared header includes desktop and mobile navigation, a theme switcher and command palette. Use Cmd/Ctrl+K to search destinations. The contact form validates inputs and creates a draft in the visitor’s email app. Visitors can also email directly.
