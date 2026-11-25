import type { Contribution } from "@/data/portfolio";

export const kasploContributions: Contribution[] = [
  {
    text: "Contributed to migrating visual email authoring to GrapesJS and Monaco, including HTML and AMP previews, form controls and delivery transformations.",
    study: "email-editor",
  },
  {
    text: "Tuned browser CSV read chunks and improved quote-error recovery and upload handling. The local 200,000-row comparison reduced reads from 40 to 10.",
    study: "csv-performance",
  },
  {
    text: "Worked on validation and hydration for nested audience rules and added round-trip regression coverage.",
    study: "audience-segmentation",
  },
  {
    text: "Worked on account-scoped campaign queries and verified request sharing for equivalent consumers in a mocked regression.",
    study: "multi-tenant-caching",
  },
  {
    text: "Contributed configurable automation nodes and forms within a shared graph-based workflow builder.",
    study: "automation-builder",
  },
  {
    text: "Contributed to HTTP event browsing, cursor history, CSV export and webhook interfaces for transactional email.",
    study: "transactional-live-feed",
  },
  {
    text: "Integrated AI generation controls, draft insertion and channel-specific previews into SMS and WhatsApp editing flows.",
    study: "ai-content-editors",
  },
  {
    text: "Worked on route loading, API timing and build-time checks used to investigate frontend performance regressions.",
    study: "frontend-performance",
  },
  {
    text: "Added targeted regression checks for saved rules, request deduplication and keyboard interaction in the shared frontend suite.",
    study: "testing-quality",
  },
  {
    text: "Contributed reusable frontend interfaces and tested command palette and sidebar search keyboard behavior.",
    study: "design-system",
  },
];
