import type { Diagram, Table } from "@/data/case-studies/schema";

export function CaseStudyArchitectureDiagram({
  diagram,
}: {
  diagram: Diagram;
}) {
  return (
    <figure className="cs-diagram">
      <figcaption>
        <strong>{diagram.title}</strong>
        <p>{diagram.description}</p>
      </figcaption>
      <ol>
        {diagram.steps.map(({ label, detail }) => (
          <li key={label}>
            <div>
              <strong>{label}</strong>
              <span>{detail}</span>
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}

export function CaseStudyBenchmarkChart({
  title,
  caption,
  previous,
  optimized,
  unit,
  name = "Median processing time",
  digits = 1,
}: {
  title: string;
  caption: string;
  previous: number;
  optimized: number;
  unit: string;
  name?: string;
  digits?: number;
}) {
  const max = Math.max(previous, optimized);
  const entries = [
    { label: "256 KiB", value: previous },
    { label: "1 MiB", value: optimized },
  ];
  return (
    <figure className="cs-chart">
      <figcaption>
        <strong>{title}</strong>
        <p>
          {caption} · {name}
        </p>
      </figcaption>
      <div className="cs-chart-bars">
        {entries.map(({ label, value }) => (
          <div key={label} className="cs-chart-row">
            <span>{label}</span>
            <div className="cs-bar-track" aria-hidden>
              <span style={{ width: `${(value / max) * 100}%` }} />
            </div>
            <strong>
              {value.toLocaleString("en-US", {
                minimumFractionDigits: digits,
                maximumFractionDigits: digits,
              })}{" "}
              {unit}
            </strong>
          </div>
        ))}
      </div>
    </figure>
  );
}

export function CaseStudyTable({ table }: { table: Table }) {
  return (
    <div
      className="cs-table-scroll"
      role="region"
      aria-label={table.caption}
      tabIndex={0}
    >
      <table className="cs-table">
        <caption>{table.caption}</caption>
        <thead>
          <tr>
            {table.columns.map((column) => (
              <th key={column} scope="col">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map(([first, ...cells]) => (
            <tr key={first}>
              <th scope="row">{first}</th>
              {cells.map((cell, index) => (
                <td key={index}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function CaseStudyCodeExample({
  label,
  code,
}: {
  label: string;
  code: string;
}) {
  return (
    <figure className="cs-code">
      <figcaption>{label}</figcaption>
      <pre tabIndex={0} aria-label={label}>
        <code>{code}</code>
      </pre>
    </figure>
  );
}

export function CaseStudyTradeoffs({
  entries,
}: {
  entries: { decision: string; cost: string }[];
}) {
  return (
    <dl className="cs-tradeoffs">
      {entries.map(({ decision, cost }) => (
        <div key={decision}>
          <dt>{decision}</dt>
          <dd>{cost}</dd>
        </div>
      ))}
    </dl>
  );
}
