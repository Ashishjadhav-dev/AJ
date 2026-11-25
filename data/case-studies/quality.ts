import { flow, type CaseStudy } from "./schema";

export const testing: CaseStudy = {
  id: "testing",
  slug: "testing-quality",
  title: "Automated Testing & Engineering Quality",
  subtitle: "Protect boundaries that ordinary happy-path checks miss",
  summary:
    "Targeted regressions in a shared frontend suite cover saved-rule hydration, request sharing, editor serialization, and keyboard interactions alongside static and build-time checks.",
  seoDescription:
    "Frontend quality engineering with Vitest, React Testing Library, axe-core, strict TypeScript, and bundle-size gates in GitHub Actions.",
  outcome:
    "34 attributable commits touched tests in a shared suite of 685 tests",
  category: "Engineering Quality",
  filter: "testing",
  technologies: [
    "Vitest",
    "React Testing Library",
    "axe-core",
    "GitHub Actions",
  ],
  order: 9,
  contributions: [
    "I contributed regression coverage for segmentation hydration and request deduplication, and directly contributed command palette and sidebar keyboard interaction tests. The test suite and its infrastructure were shared.",
  ],
  sections: [
    {
      id: "problem",
      title: "Business problem and technical constraints",
      paragraphs: [
        "Frontend errors often appear between systems: a saved object reopens with different meaning, two consumers duplicate requests, or a keyboard user cannot leave a dialog. Broad totals can conceal missing checks at these boundaries.",
      ],
    },
    {
      id: "architecture",
      title: "Test architecture and CI verification",
      diagrams: [
        flow(
          "Test layers",
          "Use the smallest layer that can faithfully reproduce the behavior.",
          [
            ["Vitest unit tests", "Pure normalization and serialization"],
            [
              "React Testing Library",
              "Exercise observable component behavior in jsdom",
            ],
            [
              "axe-core and V8",
              "Target accessibility rules and inspect coverage gaps",
            ],
          ],
        ),
        flow(
          "CI pipeline",
          "Run checks at the stage where their evidence is meaningful.",
          [
            ["Static checks", "Strict TypeScript and ESLint"],
            ["Automated tests", "Unit, component and regression checks"],
            [
              "Production artifact",
              "Build and check configured bundle-size budgets",
            ],
          ],
        ),
      ],
    },
    {
      id: "implementation",
      title: "Representative regressions and coverage strategy",
      bullets: [
        "Hydrate a saved rule with nested conditions and compare semantics after serialization.",
        "Mount equivalent campaign consumers and count mock list and counters requests independently.",
        "Exercise editor serialization with representative content, configuration, and fallback cases.",
        "Open keyboard-driven controls, move focus, dismiss them, and check focus restoration.",
      ],
      paragraphs: [
        "GitHub Actions provides the CI environment for verification. V8 coverage helps identify unexercised code, while component tests assert behavior through accessible queries and realistic input. Keep fixtures synthetic and narrowly scoped to the failure.",
      ],
    },
    {
      id: "verification",
      title: "Repository evidence and scope",
      table: {
        caption: "Shared suite totals and individual contribution history",
        columns: ["Measure", "Count", "Scope"],
        rows: [
          ["Automated tests", "685", "Shared frontend test suite"],
          ["Discovered test files", "152", "Shared repository inventory"],
          ["Commits touching tests", "34", "Personally attributable commits"],
          [
            "Historical test-file addition paths",
            "51",
            "Historical paths, not a count of current files",
          ],
        ],
      },
      paragraphs: [
        "These counts describe discovery and contribution history. They do not establish that the complete suite passed or that every discovered test was personally authored. jsdom and automated accessibility rules cover targeted behavior, with browser and assistive technology checks needed for additional coverage.",
      ],
      tradeoffs: [
        {
          decision: "Prefer targeted behavioral regressions",
          cost: "Pinpoints boundary failures with a small fixture. Full browser behavior needs separate tests.",
        },
        {
          decision: "Gate bundle sizes in CI",
          cost: "Makes growth explicit. Passing a size budget says little about runtime behavior on its own.",
        },
      ],
    },
    {
      id: "lessons",
      title: "Engineering lessons and future work",
      paragraphs: [
        "Add tests for a failure mode with a clear expected outcome. Future work could group coverage by critical user journey and add browser-level checks for editor and focus behavior that require layout.",
      ],
    },
  ],
  related: ["audience-segmentation", "multi-tenant-caching", "design-system"],
};

export const designSystem: CaseStudy = {
  id: "design-system",
  slug: "design-system",
  title: "Design Systems & Accessibility",
  subtitle: "Define reusable UI contracts for appearance and interaction",
  summary:
    "A shared component system uses semantic theme tokens and reusable controls. My direct contributions include keyboard interaction tests for the command palette and sidebar search.",
  seoDescription:
    "Semantic tokens, shared React components, Tailwind CSS, Material UI, and targeted keyboard accessibility for a command palette and sidebar search.",
  outcome: "Eight targeted accessibility tests passed",
  category: "UI/UX Engineering",
  filter: "accessibility",
  technologies: ["Tailwind CSS", "Material UI", "React", "axe-core"],
  order: 10,
  contributions: [
    "I contributed to reusable frontend interfaces and directly contributed command palette and sidebar keyboard interaction tests. The component inventory reflects shared repository work.",
  ],
  sections: [
    {
      id: "problem",
      title: "Business problem and technical constraints",
      paragraphs: [
        "Enterprise workflows reuse dense tables, filters, actions and dialogs across screen sizes and themes. A consistent interaction contract matters as much as matching visual styles. Shared controls need predictable keyboard operation even as layouts adapt.",
      ],
    },
    {
      id: "architecture",
      title: "Token hierarchy and component architecture",
      diagrams: [
        flow(
          "Design token hierarchy",
          "Theme decisions propagate through semantic roles.",
          [
            ["Primitive values", "Palette, spacing, and type scale"],
            ["Semantic roles", "Surface, text, border, and focus"],
            ["Component styles", "Apply roles across theme and state"],
          ],
        ),
        flow(
          "Component composition",
          "Product screens compose shared controls and behaviors.",
          [
            ["UI primitives", "Buttons, inputs, dialogs and dropdowns"],
            [
              "Composed controls",
              "Tables, pagination, skeletons and shared icons",
            ],
            [
              "Product features",
              "Consistent responsive and accessible behaviors",
            ],
          ],
        ),
      ],
      demo: "palette",
    },
    {
      id: "implementation",
      title: "Keyboard interaction and layout",
      paragraphs: [
        "Tailwind CSS utilities and Material UI controls share semantic roles where practical. The shared icon sprite lets controls reuse shapes while accessible names come from visible labels or explicit names for icon-only buttons.",
        "Reusable table, pagination, dialog and dropdown patterns carry consistent focus and loading behavior. Skeletons reserve space and should avoid becoming keyboard stops. Responsive layouts preserve DOM reading order and keep essential controls reachable.",
        "The command palette should focus its search field on open and return focus to its launcher on dismissal. Sidebar search needs keyboard-reachable results with meaningful names. Native controls and correct ARIA semantics communicate role and state, including expanded panels and current navigation.",
      ],
      bullets: [
        "Tab and Shift+Tab move between available controls.",
        "Enter activates the focused result. Escape closes a dialog and restores focus.",
      ],
      tradeoffs: [
        {
          decision: "Share semantic roles across component systems",
          cost: "Keeps themes coherent. Material UI and Tailwind overrides need a clear precedence.",
        },
        {
          decision: "Use native interactive elements where possible",
          cost: "Reduces custom keyboard handling. Composite controls still need explicit focus and state design.",
        },
      ],
    },
    {
      id: "verification",
      title: "Targeted accessibility verification and limits",
      paragraphs: [
        "The repository inventory identified 122 JSX-bearing definitions in shared component directories. Eight targeted accessibility tests passed. The inventory measures definitions, including implementation-level components, and is separate from test results.",
        "WCAG 2.2 AA principles guide focus visibility, contrast, keyboard use and target sizing. The targeted tests do not establish complete conformance or a verified Storybook inventory.",
      ],
    },
    {
      id: "lessons",
      title: "Engineering lessons and future work",
      paragraphs: [
        "Document interaction semantics with styling tokens. Future work could add assistive technology walkthroughs and visual checks for token use across light and dark modes.",
      ],
    },
  ],
  related: ["testing-quality", "email-editor"],
};
