import { flow, type CaseStudy } from "./schema";

export const emailEditor: CaseStudy = {
  id: "email",
  slug: "email-editor",
  title: "Visual HTML & AMP Email Editor",
  subtitle: "Three representations of the same message",
  summary:
    "A shared editor combined drag-and-drop authoring and a source editor with HTML and AMP delivery workflows. My contributions focused on the editor migration, reusable authoring controls, preview behavior, and transformation between representations.",
  seoDescription:
    "A GrapesJS and Monaco email editor architecture covering project state, responsive previews, AMP forms, HTML fallback, and delivery serialization.",
  outcome:
    "Separated editable state, responsive preview, and delivery serialization",
  category: "Frontend Architecture",
  filter: "architecture",
  technologies: ["GrapesJS", "Monaco", "HTML email", "AMP for Email"],
  minutes: 5,
  featured: "home",
  order: 2,
  contributions: [
    "Contributed to migration from a third-party editor and to the GrapesJS and Monaco authoring integration.",
    "Worked on reusable editor controls, HTML and AMP transformation paths, and form configuration and preview behaviors.",
  ],
  sections: [
    {
      id: "problem",
      title: "Business problem and technical constraints",
      paragraphs: [
        "A message author needs to move between drag-and-drop composition, source editing, and desktop or mobile preview. Interactive AMP forms add field configuration and delivery constraints. Recipients who use the HTML version still need a fallback that communicates the same essential content.",
        "The editing canvas needs richer state than a recipient’s email. Sending editor metadata would couple delivery to the editor version, while saving only delivery markup would discard information needed to reopen a draft.",
      ],
    },
    {
      id: "architecture",
      title: "Editor architecture and content lifecycle",
      diagrams: [
        flow(
          "Editor surfaces",
          "Both editing modes work through the project representation.",
          [
            ["GrapesJS", "Visual drag-and-drop and block settings"],
            ["Project model", "Editable blocks, configuration, and history"],
            [
              "Monaco",
              "Source editing through explicit import and export boundaries",
            ],
          ],
        ),
        flow(
          "Authoring to delivery",
          "Preview and delivery each transform project state for a different audience.",
          [
            ["Author and save", "Keep editable project data"],
            ["Preview", "Render desktop or mobile markup for inspection"],
            ["Validate", "Check required fields and serialization inputs"],
            ["Serialize", "Produce HTML fallback and configured AMP output"],
          ],
        ),
      ],
      table: {
        caption: "HTML and AMP authoring targets",
        columns: ["Concern", "HTML", "AMP"],
        rows: [
          [
            "Interaction",
            "Links and fallback content",
            "Interactive form fields",
          ],
          [
            "Preview",
            "Desktop and mobile layouts",
            "Interactive preview where supported",
          ],
          [
            "Delivery",
            "HTML variant and fallbacks",
            "Separate AMP markup and form configuration",
          ],
        ],
      },
    },
    {
      id: "implementation",
      title: "Blocks, forms and lifecycle management",
      paragraphs: [
        "Reusable blocks expose configuration for custom fields and merge tags, media-library assets, and Shopify products. Form controls retain field configuration so preview behavior and delivery serialization can use the same underlying values.",
        "Undo and redo operate on authoring operations. Source changes need a clear import boundary so partial edits or generated output do not pollute history. The editor lifecycle also needs cleanup for listeners and instances when a template changes or the route unmounts.",
        "Validation belongs at transformation boundaries. Check form configuration before serialization, preserve placeholders through export and import, and keep desktop and mobile viewport state outside the delivery model.",
      ],
      tradeoffs: [
        {
          decision: "Persist the editor project separately",
          cost: "Reopening a draft preserves editability. Migration must handle changes to project schema and block definitions.",
        },
        {
          decision: "Generate HTML fallback alongside AMP",
          cost: "Recipients have a usable alternate representation. Both outputs need serialization and rendering checks.",
        },
      ],
    },
    {
      id: "verification",
      title: "Validation and compatibility limits",
      paragraphs: [
        "Representative checks cover required form fields, merge-tag preservation, HTML fallback generation, responsive preview switching and reopening serialized content. Missing media and malformed source need recoverable feedback before an export is accepted.",
        "Preview behavior and targeted serialization checks cover specific paths. Full AMP validation, email-client compatibility across providers and licensing savings were outside the verified scope.",
      ],
    },
    {
      id: "lessons",
      title: "Engineering lessons and future work",
      paragraphs: [
        "Make every transformation boundary explicit. A proposed improvement would use versioned fixtures for legacy editor imports and exercise generated HTML and AMP in a documented client matrix.",
      ],
    },
  ],
  related: ["ai-content-editors", "testing-quality"],
};

export const automation: CaseStudy = {
  id: "automation",
  slug: "automation-builder",
  title: "Automation Workflow Builder",
  subtitle: "From editable workflow graph to publishable configuration",
  summary:
    "A shared visual builder models automation as nodes and edges, with graph layout, dynamic configuration forms, and separate draft and publish steps.",
  seoDescription:
    "A shared XYFlow workflow builder with Dagre, Redux graph state, configurable triggers, branching, serialization, and publish validation.",
  outcome: "Separated graph editing, configuration, and publish validation",
  category: "Frontend System Design",
  filter: "architecture",
  technologies: ["XYFlow", "Dagre", "Redux Toolkit", "TypeScript"],
  minutes: 5,
  order: 3,
  contributions: [
    "My contributions included configurable automation nodes and dynamic forms within the shared workflow builder. The graph, renderer registry and trigger inventory describe the application’s shared implementation.",
  ],
  sections: [
    {
      id: "problem",
      title: "Business problem and technical constraints",
      paragraphs: [
        "Workflow authors need to see how contacts move through triggers, delays, and actions. They also need to edit incomplete workflows safely. Canvas position, form data, branching semantics, and the published workflow have different lifecycles.",
      ],
    },
    {
      id: "architecture",
      title: "Graph state and layout",
      diagrams: [
        flow(
          "Shared graph architecture",
          "Topology and configuration feed the canvas and the workflow serializer.",
          [
            ["Redux graph state", "Nodes, edges, and node settings"],
            ["Dagre", "Derive layout from graph topology"],
            ["XYFlow", "Render registered node types and handle interactions"],
            ["Serializer", "Read graph settings for draft or publish"],
          ],
        ),
      ],
      demo: "workflow",
    },
    {
      id: "implementation",
      title: "Node configuration and publishing",
      paragraphs: [
        "A trigger form changes with the selected trigger. For a delay, the form needs a duration or time rule and its timezone context. Re-entry settings belong to the workflow configuration. Node analytics can be displayed alongside a node while remaining separate from the editable configuration.",
        "Node insertion updates the graph by creating a node and reconnecting the intended path. Conditional edges carry Yes and No labels so topology and branch semantics stay aligned when a node is inserted or rearranged. Serialization preserves those semantics with node configuration.",
        "Drafts can contain incomplete forms. Publishing should check required fields and graph invariants, including a missing trigger, disconnected nodes, or incomplete branches. Invalid edits should direct the author to the specific node.",
      ],
      diagrams: [
        flow(
          "Draft to publish",
          "Keep in-progress edits available while checking the publishable graph.",
          [
            ["Edit graph", "Configure trigger, paths, and actions"],
            ["Save draft", "Persist incomplete work"],
            ["Validate", "Check graph and required settings"],
            ["Publish", "Serialize the validated workflow"],
          ],
        ),
      ],
      tradeoffs: [
        {
          decision: "Derive graph positions with Dagre",
          cost: "Provides readable branches. Frequent global layout can be expensive and move a node while it is being edited.",
        },
        {
          decision: "Keep node forms configuration-driven",
          cost: "Reuses controls across node types. Node-specific domain rules still need explicit validation.",
        },
      ],
    },
    {
      id: "verification",
      title: "Application inventory and validation",
      table: {
        caption: "Separate dimensions of the shared application inventory",
        columns: ["Dimension", "Count", "What it describes"],
        rows: [
          ["Node constants", "28", "Declared node identifiers"],
          ["Renderer registrations", "21", "Registry entries"],
          [
            "Distinct renderer values",
            "19",
            "Unique renderer implementations in the registry",
          ],
          ["Distinct numeric trigger IDs", "26", "All identified numeric IDs"],
          ["Distinct active trigger IDs", "16", "Active subset"],
        ],
      },
      paragraphs: [
        "A renderer can serve more than one registered entry. Trigger IDs describe a different layer of the system. The counts describe structure and do not measure graph throughput or the number of user-facing features. Representative checks cover Yes/No insertion, required configuration and invalid publish attempts.",
      ],
    },
    {
      id: "lessons",
      title: "Engineering lessons and future work",
      paragraphs: [
        "Keep graph semantics independent of coordinates. For larger graphs, profile Dagre layout and per-node rendering separately. Future work could restrict relayout to topology changes and measure selective subscriptions on synthetic large graphs.",
      ],
    },
  ],
  related: ["audience-segmentation", "multi-tenant-caching"],
};
