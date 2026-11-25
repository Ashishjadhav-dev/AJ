"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import type { Section } from "@/data/case-studies/schema";

const EngineeringDemo = dynamic(() => import("./EngineeringDemos"), {
  loading: () => <p role="status">Loading demonstration…</p>,
});
const labels = {
  workflow: "Explore a branching workflow",
  segmentation: "Edit a nested condition tree",
  cache: "Simulate request deduplication",
  events: "Browse synthetic transactional events",
  message: "Preview SMS and WhatsApp content",
  palette: "Try keyboard navigation in a command palette",
} as const;

export function CaseStudyDemo({
  kind,
}: {
  kind: Exclude<NonNullable<Section["demo"]>, "csv">;
}) {
  const [open, setOpen] = useState(false);
  return (
    <details
      className="cs-demo cs-demo-disclosure"
      onToggle={(event) => {
        if (event.currentTarget.open) setOpen(true);
      }}
    >
      <summary>
        <span>{labels[kind]}</span>
        <span>Illustrative demo</span>
      </summary>
      {open && (
        <div className="cs-demo-body">
          <EngineeringDemo kind={kind} />
        </div>
      )}
    </details>
  );
}
