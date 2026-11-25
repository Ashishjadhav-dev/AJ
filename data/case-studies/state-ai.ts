import { flow, type CaseStudy } from "./schema";

export const caching: CaseStudy = {
  id: "caching",
  slug: "multi-tenant-caching",
  title: "Multi-Tenant Frontend Data Architecture",
  subtitle: "Scope cached responses to the identity that owns them",
  summary:
    "I worked on account-scoped API queries and cache behavior. TanStack Query owns remote data, Redux Toolkit owns durable client workflow state, and React Context carries ambient values where appropriate.",
  seoDescription:
    "Account- and user-scoped query keys, deduplication, cancellation and invalidation with TanStack Query, Redux Toolkit and React Context.",
  outcome:
    "Two equivalent consumers shared one list request and one counters request in a mocked test",
  category: "State Management",
  filter: "state",
  technologies: [
    "TanStack Query",
    "Redux Toolkit",
    "React Context",
    "TypeScript",
  ],
  featured: "home",
  order: 5,
  contributions: [
    "My work focused on frontend cache ownership and API integration, account-scoped campaign queries, and regression coverage for equivalent query consumers.",
  ],
  sections: [
    {
      id: "problem",
      title: "Business problem and technical constraints",
      paragraphs: [
        "Campaign views combine list pages, counters, search and mutations. The same feature can operate under several accounts, and a user can switch accounts while requests are in flight. State that belongs to one account must stay associated with that account in the browser.",
      ],
    },
    {
      id: "architecture",
      title: "State ownership and query lifecycle",
      diagrams: [
        flow(
          "State ownership",
          "Use state tools according to who owns the value and how long it lives.",
          [
            ["React Context", "Ambient identity and configuration"],
            ["Redux Toolkit", "Client workflow state and shared UI decisions"],
            [
              "TanStack Query",
              "Remote records, status, freshness, and invalidation",
            ],
          ],
        ),
        flow(
          "Query lifecycle",
          "Query identity includes the values that change the response.",
          [
            [
              "Normalize inputs",
              "Account, user when needed, filters, and page",
            ],
            ["Resolve query key", "Share equivalent in-flight work"],
            ["Render", "Use data and status for the current scope"],
            ["Mutate", "Invalidate affected entries in that scope"],
          ],
        ),
      ],
      demo: "cache",
      example: {
        label: "Synthetic account-scoped query keys",
        code: JSON.stringify(
          [
            ["campaigns", "acct_demo", "list", { page: 2, search: "welcome" }],
            ["campaigns", "acct_demo", "counters"],
            ["preferences", "acct_demo", "user_demo"],
          ],
          null,
          2,
        ),
      },
    },
    {
      id: "implementation",
      title: "Pagination, account switches and mutation handling",
      paragraphs: [
        "Search debouncing reduces key churn while a visitor types. Page and filter values still belong in the key once applied. Previous-page data can smooth pagination within the same scope, but it should clear when the current account or user changes.",
        "Forward cancellation to the request layer where supported. Key isolation and a current-scope check prevent a late response for the old account from replacing the active list. Mutations should invalidate or update the list and counters using the original mutation scope, even if account selection changed while the write ran.",
        "Equivalent consumers share the same normalized key. The list and counters are distinct resources with different keys. API integration keeps both request shape and response handling close to that resource contract.",
      ],
      tradeoffs: [
        {
          decision: "Scope keys by the response’s owning identity",
          cost: "Prevents accidental cache reuse across different views. Additional variants increase cache size and require deliberate expiry.",
        },
        {
          decision: "Invalidate scoped queries after writes",
          cost: "Reconciles with server data. It can trigger a refresh for mounted consumers.",
        },
      ],
    },
    {
      id: "verification",
      title: "Mocked verification and limits",
      paragraphs: [
        "A mocked regression verified that two equivalent campaign query consumers share one list request and one counters request. This establishes behavior for the tested keys and harness.",
        "Scope boundaries in frontend caching govern presentation and reuse. Tenant isolation and access control are enforced by backend authorization. The test does not measure production traffic or request latency.",
      ],
    },
    {
      id: "lessons",
      title: "Engineering lessons and future work",
      paragraphs: [
        "Model query keys as contracts. A future extension would test rapid account switches with deliberately late responses and check cache eviction for long-lived sessions.",
      ],
    },
  ],
  related: [
    "frontend-performance",
    "transactional-live-feed",
    "testing-quality",
  ],
};

export const aiEditors: CaseStudy = {
  id: "channel-editors",
  slug: "ai-content-editors",
  title: "AI-Powered Multichannel Editors",
  subtitle: "Generate content inside a channel-aware editing workflow",
  summary:
    "Shared editor controls connect SMS and WhatsApp authoring to a generation API while preserving channel-specific formatting, variables, and previews.",
  seoDescription:
    "AI API integration for SMS and WhatsApp editors with generation controls, selection-aware insertion, sanitization, previews, and channel constraints.",
  outcome:
    "Shared generation controls with channel-specific insertion and previews",
  category: "AI Integration",
  filter: "ai",
  technologies: ["React", "TypeScript", "AI API", "SMS & WhatsApp"],
  order: 7,
  contributions: [
    "I contributed to SMS and WhatsApp frontend generation workflows, shared editor controls, and integration of campaign AI deliverability summaries. My work was API integration and editor behavior. Model training, inference infrastructure, and agent development were outside its scope.",
  ],
  sections: [
    {
      id: "problem",
      title: "Business problem and technical constraints",
      paragraphs: [
        "Campaign authors should be able to generate a draft without leaving the editing context. A response can arrive after a user moves the selection or edits the draft. Returned text also has to respect placeholders and the destination channel’s formatting constraints.",
      ],
    },
    {
      id: "architecture",
      title: "Shared editor and generation lifecycle",
      diagrams: [
        flow(
          "Generation lifecycle",
          "The API produces a draft that the editor validates and prepares for insertion.",
          [
            ["Generation controls", "Collect prompt, tone and language"],
            ["Request state", "Validate input and show progress or error"],
            ["Normalize output", "Sanitize text and preserve variables"],
            [
              "Channel adapter",
              "Insert at the saved selection and refresh the preview",
            ],
          ],
        ),
      ],
      demo: "message",
    },
    {
      id: "implementation",
      title: "Selection, formatting and channel limits",
      paragraphs: [
        "Validate the prompt and capture insertion context before generation. Normalize generated text through the channel’s sanitization and formatting paths. Keep dynamic variables recognizable and make insertion an editor operation so the author can review or undo it.",
        "SMS counting needs to consider encoding. Standard single-part thresholds are 160 GSM-7 septets or 70 Unicode code units. Concatenated messages typically allow 153 or 67 units per part, respectively. GSM extension characters consume two septets, and characters outside the basic multilingual plane can use two UTF-16 units.",
        "WhatsApp previews render structured media and carousel content in addition to text. Campaign AI deliverability summaries surface an API response for review and have their own loading and error state.",
      ],
      tradeoffs: [
        {
          decision: "Keep shared request controls and channel adapters",
          cost: "Avoids duplicating prompt UI. Each adapter must enforce different validation and preview rules.",
        },
        {
          decision: "Capture an insertion selection",
          cost: "Keeps the author’s intended location. A changed document may invalidate the saved range.",
        },
      ],
    },
    {
      id: "verification",
      title: "Validation scenarios and measurement limits",
      paragraphs: [
        "Representative checks cover empty inputs, an API failure, stale selections, generated placeholders, encoding thresholds and media preview fallbacks. The synthetic preview demonstrates formatting and counting. It makes no model request and offers no measurement of model quality or deliverability.",
      ],
    },
    {
      id: "lessons",
      title: "Engineering lessons and future work",
      paragraphs: [
        "Treat generated text as untrusted input subject to review and normal editor constraints. Proposed improvements include canceling obsolete requests and discarding stale results using request and document-version checks.",
      ],
    },
  ],
  related: ["email-editor", "design-system"],
};
