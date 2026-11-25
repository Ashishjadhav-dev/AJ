import { flow, type CaseStudy } from "./schema";

export const segmentation: CaseStudy = {
  id: "segmentation",
  slug: "audience-segmentation",
  title: "Advanced Audience Segmentation",
  subtitle: "Round-trip a nested rule without losing its meaning",
  summary:
    "I contributed to nested condition handling, payload validation, saved-rule hydration, and regression coverage for an audience builder with contact, behavioral, and Shopify conditions.",
  seoDescription:
    "Nested AND/OR audience segmentation with typed operators, a 50-group builder limit, payload normalization, and saved-rule hydration regressions.",
  outcome: "Regression coverage for saved nested rules and payload round-trips",
  category: "Complex Product Engineering",
  filter: "product",
  technologies: ["React", "TypeScript", "Dynamic forms", "Vitest"],
  minutes: 5,
  order: 4,
  contributions: [
    "I worked on payload validation, nested condition handling, and hydration of saved rules, including serialized conditions. I added regression coverage for representative round-trip and hydration failures.",
  ],
  sections: [
    {
      id: "problem",
      title: "Business problem and technical constraints",
      paragraphs: [
        "Campaign authors need to combine contact attributes, engagement behavior, and Shopify activity without writing queries. A rule can use a fixed date, a relative window, a typed value, or an operator that requires no value. Changing a field can make the previous operator and value invalid.",
        "Saved rules must reopen with the same meaning. Nested groups, older stringified conditions and operators without operands are the important cases where a superficially valid form can change the audience.",
      ],
    },
    {
      id: "architecture",
      title: "Rule tree and transformation boundaries",
      diagrams: [
        flow(
          "UI to request payload",
          "Each group applies a Boolean operator to its children.",
          [
            ["Rule tree", "Nested AND and OR groups with condition leaves"],
            ["Validate", "Check type, operator, operand and group count"],
            ["Serialize", "Emit a normalized rule payload"],
          ],
        ),
        flow(
          "Saved rule hydration",
          "Normalize supported stored formats before populating editor controls.",
          [
            ["Stored rule", "Read the object or parse a stringified condition"],
            ["Normalize", "Reconstruct nested groups and type-specific values"],
            ["Hydrate", "Restore field, operator and operand controls"],
          ],
        ),
      ],
      demo: "segmentation",
      example: {
        label: "Illustrative rule payload",
        code: JSON.stringify(
          {
            operator: "AND",
            children: [
              { field: "email", operator: "exists" },
              {
                operator: "OR",
                children: [
                  { field: "last_open", operator: "within_days", value: 30 },
                  {
                    field: "shopify_orders",
                    operator: "greater_than",
                    value: 2,
                  },
                ],
              },
            ],
          },
          null,
          2,
        ),
      },
    },
    {
      id: "implementation",
      title: "Operators, values and payload validation",
      paragraphs: [
        "Field definitions determine compatible operators and whether a control should accept text, numbers, a date, or a relative-date amount. A value-less operator omits its operand. Field or operator changes need to discard stale values that no longer match.",
        "Validate each condition alongside its parent group. Count nested groups toward the 50-group builder limit and separate an incomplete group being edited from a rule that can be submitted. Invalid stored input requires a recoverable error state.",
      ],
      tradeoffs: [
        {
          decision: "Keep editable rules as a tree",
          cost: "Nesting maps directly to Boolean semantics. Editing, validation and serialization must consistently traverse the same structure.",
        },
        {
          decision: "Normalize supported legacy formats during hydration",
          cost: "Older rules remain editable. Malformed strings need explicit error handling.",
        },
      ],
    },
    {
      id: "verification",
      title: "Round-trip regression coverage",
      paragraphs: [
        "Representative regressions exercise nested AND/OR groups, stringified conditions, relative dates, and value-less operators. The useful assertion is semantic equivalence after save and reload, including omission of incompatible operands.",
        "The 50-group limit bounds this builder. It does not establish the performance of underlying audience queries or coverage of every historic rule format.",
      ],
    },
    {
      id: "lessons",
      title: "Engineering lessons and future work",
      paragraphs: [
        "Use one field and operator contract across controls, validation, and payload construction. A future improvement would add generated round-trip fixtures for valid rule trees and explicit migrations for older formats.",
      ],
    },
  ],
  related: ["automation-builder", "testing-quality"],
};

export const liveFeed: CaseStudy = {
  id: "events",
  slug: "transactional-live-feed",
  title: "Transactional Email Live Feed",
  subtitle: "Navigating operational event data with HTTP cursors",
  summary:
    "A transactional email interface retrieves event pages over HTTP and coordinates cursor history, filtering, CSV export, and permission-aware account workflows.",
  seoDescription:
    "Transactional event visualization with HTTP cursor pagination, filter resets, CSV export, webhook interfaces, and permission-aware actions.",
  outcome:
    "Reset cursor history with filter changes and preserved previous-page traversal",
  category: "Product Engineering",
  filter: "product",
  technologies: ["React", "TypeScript", "HTTP", "Cursor pagination"],
  minutes: 4,
  order: 6,
  contributions: [
    "My frontend contributions covered transactional event and account workflows, including event filtering, paging and export, as well as related webhook management interfaces.",
  ],
  sections: [
    {
      id: "problem",
      title: "Business problem and technical constraints",
      paragraphs: [
        "Transactional account operators need to find delivery events, assess their status, and review the filtered data. Incoming events can change the result set while users page through it. Account workflows and webhook management add actions with different permissions.",
      ],
    },
    {
      id: "architecture",
      title: "HTTP retrieval and cursor history",
      diagrams: [
        flow(
          "Request and response lifecycle",
          "Request parameters define a result set. The response cursor advances within that set.",
          [
            ["Account and filters", "Status, search and current cursor"],
            ["HTTP request", "Fetch one event page"],
            ["Event table", "Render rows, loading, empty, or error"],
            ["Cursor history", "Store visited cursors for backward navigation"],
          ],
        ),
      ],
      demo: "events",
    },
    {
      id: "implementation",
      title: "Filters, export and permissions",
      paragraphs: [
        "Next uses the cursor returned for the current query. Previous restores the appropriate cursor from local history. Changing account, search, or filters resets the cursor and its history because old cursors belong to the previous result set.",
        "Initial loading, a filtered empty response, and a network error require distinct table states. Preserve the applied filters on retry. CSV export should make its current filter scope clear so the visitor understands which events it refers to.",
        "Account and webhook operations belong alongside the feed but have their own permission and validation states. Hiding an unavailable action improves the interface. Authorization decisions belong to the service.",
      ],
      tradeoffs: [
        {
          decision: "Use cursor-based paging",
          cost: "Works with a changing event stream and avoids arbitrary offset scans. Direct jumps to page numbers are unavailable and Previous needs history.",
        },
        {
          decision: "Retrieve event pages over HTTP",
          cost: "Explicit request boundaries simplify state handling. Freshness depends on when a new request is made.",
        },
      ],
    },
    {
      id: "verification",
      title: "Validation and measurement limits",
      paragraphs: [
        "Representative scenarios cover returning from a later page, searching from that page, empty results, a failed fetch and retry, and permission-aware controls. The synthetic demo illustrates the request state transitions. Event volume, freshness intervals, and export latency were not measured here.",
      ],
    },
    {
      id: "lessons",
      title: "Engineering lessons and future work",
      paragraphs: [
        "Treat the cursor as part of a particular query identity. A future improvement would make refresh behavior explicit when new events arrive and test how the interface recovers from expired cursors.",
      ],
    },
  ],
  related: ["multi-tenant-caching", "audience-segmentation"],
};
