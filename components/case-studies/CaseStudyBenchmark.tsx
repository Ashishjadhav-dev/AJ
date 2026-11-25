"use client";

import { useState } from "react";
import type { CaseStudy } from "@/data/case-studies/schema";
import { CaseStudyBenchmarkChart, CaseStudyTable } from "./CaseStudyFigures";

type Dataset = NonNullable<CaseStudy["benchmark"]>;
type Measure = "time" | "heap" | "timer";

export function CaseStudyBenchmark({ data }: { data: Dataset }) {
  const [index, setIndex] = useState(data.length - 1);
  const [measure, setMeasure] = useState<Measure>("time");
  const [records, baseline, optimized] = data[index];
  const values = {
    time: {
      previous: baseline,
      optimized,
      unit: "ms",
      name: "Median processing time",
    },
    heap: {
      previous: 29.4,
      optimized: 148.8,
      unit: "MiB",
      name: "Sampled heap increase",
    },
    timer: {
      previous: 15.5,
      optimized: 32.8,
      unit: "ms",
      name: "Longest median timer gap",
    },
  };
  const count = (value: number) => value.toLocaleString("en-US");
  const milliseconds = (value: number) =>
    value.toLocaleString("en-US", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }) + " ms";
  return (
    <>
      <div className="cs-demo cs-benchmark">
        <div className="cs-demo-controls">
          <label>
            Dataset size
            <select
              value={index}
              onChange={(event) => {
                setIndex(Number(event.target.value));
                setMeasure("time");
              }}
            >
              {data.map(([size], position) => (
                <option key={size} value={position}>
                  {count(size)} records
                </option>
              ))}
            </select>
          </label>
          <label>
            Measurement
            <select
              value={measure}
              onChange={(event) => setMeasure(event.target.value as Measure)}
            >
              <option value="time">Processing time</option>
              <option value="heap" disabled={records !== 1_000_000}>
                Sampled heap increase (1M only)
              </option>
              <option value="timer" disabled={records !== 1_000_000}>
                Median timer gap (1M only)
              </option>
            </select>
          </label>
        </div>
        <div aria-live="polite">
          <CaseStudyBenchmarkChart
            title="Before and after"
            caption={`${count(records)} synthetic records`}
            {...values[measure]}
          />
        </div>
      </div>
      <CaseStudyTable
        table={{
          caption: "Local CSV benchmark using synthetic records",
          columns: ["Records", "Previous median", "Optimized median"],
          rows: data.map(([rows, previous, after]) => [
            count(rows),
            milliseconds(previous),
            milliseconds(after),
          ]),
        }}
      />
    </>
  );
}
