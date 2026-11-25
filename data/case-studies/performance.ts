import { flow, type CaseStudy } from "./schema";

export const csv: CaseStudy = {
  id: "csv",
  slug: "csv-performance",
  title: "Large-Scale CSV Processing",
  subtitle: "Fewer file reads in a browser-based contact import",
  summary:
    "I tuned the chunk size of a shared contact import parser, strengthened recovery for quote errors, and improved the presigned upload flow. The local comparison surfaced a trade-off between throughput, sampled heap use, and how often the browser could schedule other work.",
  seoDescription:
    "A frontend engineering case study on Papa Parse chunking, contact validation, presigned uploads, and local benchmarks up to one million synthetic records.",
  outcome: "75% fewer file reads at 200,000 synthetic records",
  category: "Performance & Scalability",
  filter: "performance",
  technologies: ["Papa Parse", "FileReader", "TypeScript", "Presigned uploads"],
  minutes: 6,
  featured: "primary",
  order: 1,
  contributions: [
    "Increased the read chunk from 256 KiB to 1 MiB and compared the resulting throughput and scheduling costs.",
    "Improved handling and retry behavior for CSV quoting errors.",
    "Improved presigned upload integration, progress feedback, and failure handling.",
    "The original chunked parser and the bounded-preview regression were shared team work.",
  ],
  metrics: [
    {
      value: "40 → 10",
      label: "File reads",
      scope: "Local benchmark",
      context: "200,000 synthetic records, a 75% reduction.",
    },
    {
      value: "14.3%",
      label: "Lower median processing time",
      scope: "Local benchmark",
      context: "200,000 synthetic records, from 213.3 to 182.9 ms.",
    },
    {
      value: "33.1%",
      label: "Lower median processing time",
      scope: "Local benchmark",
      context: "Approximately, at one million synthetic records.",
    },
  ],
  benchmark: [
    [1000, 12.3, 10.4],
    [10000, 24.8, 26.9],
    [50000, 96.5, 77.2],
    [100000, 150.5, 153.4],
    [200000, 213.3, 182.9],
    [500000, 551.0, 485.2],
    [1000000, 1217.8, 815.0],
  ],
  sections: [
    {
      id: "problem",
      title: "Business problem and technical constraints",
      paragraphs: [
        "Large contact imports need early validation and a useful preview before a user commits to uploading a file. Holding every parsed record would make preview memory grow with the import. Reading small slices reduces the amount of work in each callback, but it also increases FileReader calls and event-loop scheduling overhead.",
        "The browser owns file reading, parsing, and feedback. Upload authorization and the subsequent import are separate steps, so parsing, uploading, and downstream processing have different failure modes.",
      ],
    },
    {
      id: "architecture",
      title: "CSV processing architecture",
      diagrams: [
        flow(
          "From file selection to upload",
          "Parsing and validation happen incrementally. Only a few rows are kept for preview.",
          [
            ["File selection", "Read local CSV slices"],
            ["Papa Parse", "Parse chunks and diagnose quoting errors"],
            [
              "Contact validation",
              "Accumulate counts and bound preview retention",
            ],
            [
              "Presigned upload",
              "Upload the file and report progress or failure",
            ],
          ],
        ),
      ],
    },
    {
      id: "implementation",
      title: "Chunk sizing, validation and recovery",
      paragraphs: [
        "The change raised Papa Parse’s read chunk from 256 KiB to 1 MiB. Larger slices reduced the number of FileReader completions and the amount of scheduling between reads. The parser still validated contacts as chunks arrived and retained only a bounded preview.",
        "Quote-related failures followed a retry path so recoverable parsing errors could be handled before upload. A retry needs fresh parsing state so counts and preview rows from the failed pass do not mix with the new attempt.",
        "The upload flow obtains a presigned destination and uses upload progress to report transmission separately from parsing. A read, validation, or upload failure needs its own state so users can tell which operation to retry.",
      ],
      tradeoffs: [
        {
          decision: "Read 1 MiB per chunk",
          cost: "Fewer reads and lower large-file medians, with more transient memory and longer uninterrupted work.",
        },
        {
          decision: "Keep a bounded preview",
          cost: "Predictable preview retention. Users see a sample, so validation counts must cover the full file.",
        },
      ],
    },
    {
      id: "benchmarks",
      title: "Local benchmarks and methodology",
      paragraphs: [
        "The comparison used synthetic CSV files from 1,000 to one million records and compared median processing time for 256 KiB and 1 MiB reads at each size. File reads were counted separately. Sampled heap increase and median longest timer gap describe memory use and event-loop scheduling in the local harness.",
        "At one million records, reads fell from 202 to 51 and median processing time went from 1,217.8 ms to 815.0 ms. The 10,000- and 100,000-record samples had slightly higher optimized medians.",
      ],
      demo: "csv",
    },
    {
      id: "memory",
      title: "Memory and event-loop trade-offs",
      table: {
        caption: "Local measurements at one million synthetic records",
        columns: ["Measure", "256 KiB", "1 MiB"],
        rows: [
          ["File reads", "202", "51"],
          ["Sampled heap increase", "29.4 MiB", "148.8 MiB"],
          ["Longest median timer gap", "15.5 ms", "32.8 ms"],
        ],
      },
      paragraphs: [
        "The larger chunk traded fewer read cycles for higher sampled heap and longer timer gaps. Bounded preview retention and temporary allocations are separate costs. The memory view in the benchmark selector shows how large the latter can be at scale.",
      ],
    },
    {
      id: "verification",
      title: "Regression coverage and measurement limits",
      paragraphs: [
        "The shared regression validated 50,001 synthetic contacts while retaining only three preview rows. This checks validation coverage and preview retention together.",
        "The timings are local synthetic processing measurements. They exclude upload and server-side import time. Browser, hardware, CSV row width and quoting patterns can change the result. Sampled heap is an observed increase during the run, and timer gaps are a proxy for scheduling pressure. The supplied benchmark does not establish field performance.",
      ],
    },
    {
      id: "lessons",
      title: "Engineering lessons and future work",
      paragraphs: [
        "Choose a chunk size using throughput, memory, and interaction responsiveness together. A proposed next experiment would move parsing and validation into a Web Worker, then compare main-thread gaps and transfer overhead with explicit cancellation and bounded progress updates.",
      ],
    },
  ],
  related: ["frontend-performance", "testing-quality"],
};

export const frontendPerformance: CaseStudy = {
  id: "route-performance",
  slug: "frontend-performance",
  title: "Frontend Performance & Observability",
  subtitle: "Control route cost and make regressions easier to investigate",
  summary:
    "Route-level code splitting and deferred specialist views reduce the amount of code needed up front. Build budgets and browser instrumentation provide different ways to spot regressions and decide what to investigate.",
  seoDescription:
    "Next.js App Router performance engineering with dynamic imports, strict bundle budgets, API timing, Web Vitals, and Lighthouse CI.",
  outcome:
    "Local production build, strict bundle budgets, and strict TypeScript checks passed",
  category: "Performance Engineering",
  filter: "performance",
  technologies: [
    "Next.js App Router",
    "TypeScript",
    "Lighthouse CI",
    "Web Vitals",
  ],
  minutes: 5,
  order: 8,
  contributions: [
    "My focus was on frontend loading boundaries and the instrumentation and build checks used to investigate regressions. The results below apply to a local application build.",
  ],
  sections: [
    {
      id: "problem",
      title: "Business problem and technical constraints",
      paragraphs: [
        "Editors and charting modules can dominate route cost when loaded before they are needed. Build output reveals oversized chunks, while interaction and network timings explain why a particular visit feels slow. The checks belong at different points in the delivery process.",
      ],
    },
    {
      id: "architecture",
      title: "Route loading and build verification",
      diagrams: [
        flow(
          "Route-loading architecture",
          "Keep the route shell available while specialist views load at their own boundary.",
          [
            ["App Router", "Split entry points by route"],
            ["Route shell", "Render navigation and essential state"],
            ["Dynamic import", "Defer editors and charts until needed"],
          ],
        ),
        flow(
          "Bundle optimization flow",
          "Use the production artifact to locate what grew.",
          [
            ["Production build", "Inspect route and shared chunks"],
            ["Bundle analysis", "Find oversized modules and import paths"],
            ["Strict budget", "Gate configured sizes before release"],
          ],
        ),
      ],
    },
    {
      id: "implementation",
      title: "Instrumentation and operating decisions",
      paragraphs: [
        "Instrument API duration and duplicate-request patterns so a slow response can be investigated alongside browser rendering cost. Look for needless parallel requests before collapsing all network time into a single average.",
        "LCP measures when the largest visible content paints, FCP marks the first content paint, CLS tracks unexpected layout shifts, INP tracks responsiveness across interactions, and TTFB captures time to first byte. Lighthouse CI gives repeatable lab checks. Browser Web Vitals instrumentation can capture metrics under actual interactions where collection is configured.",
      ],
      diagrams: [
        flow(
          "Performance monitoring lifecycle",
          "Combine timing signals with the route and scenario that produced them.",
          [
            ["Browser signals", "Collect render, interaction and API timings"],
            ["Group", "Compare like routes and request signatures"],
            ["Investigate", "Confirm with repeatable browser traces"],
          ],
        ),
      ],
      tradeoffs: [
        {
          decision: "Defer heavy views",
          cost: "Less work on entry and an extra fetch when a specialist view opens. Stable loading placeholders protect layout.",
        },
        {
          decision: "Enforce bundle budgets",
          cost: "Catches configured size regressions. Browser execution, layout, and API latency require separate measurement.",
        },
      ],
    },
    {
      id: "verification",
      title: "Verified results and measurement limits",
      paragraphs: [
        "A production-mode Next.js build, strict bundle budget checks, and strict TypeScript compilation passed locally. These checks establish that the tested artifact meets the configured constraints. No percentage improvement in rendering or page-load time was verified.",
        "Compare fixed routes, device and network presets, cold and warm caches, and repeated samples. Lab timings and field distributions answer different questions. Aggregate duplicated calls without collecting sensitive parameters.",
      ],
    },
    {
      id: "lessons",
      title: "Engineering lessons and future work",
      paragraphs: [
        "Link each alert to an owner, a route and a reproducible scenario. A future improvement would compare route-level field percentiles with lab baselines and require an explanation for budget changes.",
      ],
    },
  ],
  related: ["csv-performance", "multi-tenant-caching", "testing-quality"],
};
