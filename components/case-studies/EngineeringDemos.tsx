"use client";

import { useState } from "react";
import { Dialog } from "@/components/Dialog";
import type { Section } from "@/data/case-studies/schema";
import { CaseStudyTable } from "./CaseStudyFigures";

function Workflow() {
  const [branch, setBranch] = useState<"yes" | "no">("yes");
  return (
    <>
      <div className="cs-demo-path" aria-label="Illustrative workflow">
        <div>
          Trigger <strong>Contact subscribed</strong>
        </div>
        <div>
          Condition <strong>Consent recorded?</strong>
        </div>
        <div
          className="cs-demo-branches"
          role="group"
          aria-label="Choose a branch"
        >
          <button
            className="cs-button"
            aria-pressed={branch === "yes"}
            onClick={() => setBranch("yes")}
          >
            Yes
          </button>
          <button
            className="cs-button"
            aria-pressed={branch === "no"}
            onClick={() => setBranch("no")}
          >
            No
          </button>
        </div>
        <div aria-live="polite">
          Selected path{" "}
          <strong>
            {branch === "yes"
              ? "Wait one day, then send welcome email"
              : "End workflow without sending"}
          </strong>
        </div>
      </div>
    </>
  );
}

function Segmentation() {
  const [operator, setOperator] = useState("OR");
  const [days, setDays] = useState("30");
  const dayCount = Number(days);
  const valid = Number.isInteger(dayCount) && dayCount >= 1 && dayCount <= 365;
  return (
    <fieldset className="cs-rule">
      <legend>All contacts must match (AND)</legend>
      <p>Email exists</p>
      <fieldset className="cs-rule">
        <legend>Nested group</legend>
        <div className="cs-demo-controls">
          <label>
            Combine conditions
            <select
              value={operator}
              onChange={(event) => setOperator(event.target.value)}
            >
              <option>OR</option>
              <option>AND</option>
            </select>
          </label>
          <label>
            Days since last open
            <input
              type="number"
              min={1}
              max={365}
              value={days}
              onChange={(event) => setDays(event.target.value)}
            />
          </label>
        </div>
        <p>Shopify orders &gt; 2</p>
      </fieldset>
      <p className="cs-demo-result" role="status">
        {valid
          ? `Email exists AND (last email opened within ${dayCount} days ${operator} Shopify orders > 2)`
          : "Enter a whole number from 1 to 365 for days since last open."}
      </p>
    </fieldset>
  );
}

function Cache() {
  const [account, setAccount] = useState("same");
  const [result, setResult] = useState("");
  return (
    <>
      <div className="cs-demo-controls">
        <label>
          Account scope for the two consumers
          <select
            value={account}
            onChange={(event) => {
              setAccount(event.target.value);
              setResult("");
            }}
          >
            <option value="same">Same account</option>
            <option value="different">Different accounts</option>
          </select>
        </label>
        <button
          className="cs-button"
          onClick={() => {
            const scopes = new Set([
              "account-a",
              account === "same" ? "account-a" : "account-b",
            ]);
            setResult(
              `Two consumers produce ${scopes.size} list ${scopes.size === 1 ? "request" : "requests"} and ${scopes.size} counters ${scopes.size === 1 ? "request" : "requests"}.`,
            );
          }}
        >
          Run simulation
        </button>
      </div>
      <p className="cs-demo-result" role="status">
        {result || "The simulation starts with an empty cache."}
      </p>
    </>
  );
}

const events = [
  ["EV-106", "Welcome", "Delivered"],
  ["EV-105", "Receipt", "Deferred"],
  ["EV-104", "Password reset", "Delivered"],
  ["EV-103", "Receipt", "Bounced"],
  ["EV-102", "Welcome", "Delivered"],
  ["EV-101", "Invoice", "Delivered"],
];

function Events() {
  const [status, setStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const cursor = history.at(-1);
  const filtered = events.filter(
    ([, event, state]) =>
      (status === "All" || state === status) &&
      event.toLowerCase().includes(search.trim().toLowerCase()),
  );
  const index = cursor ? filtered.findIndex(([id]) => id === cursor) + 1 : 0;
  const rows = filtered.slice(index, index + 2);
  const next =
    index + rows.length < filtered.length ? rows.at(-1)?.[0] : undefined;
  return (
    <>
      <div className="cs-demo-controls">
        <label>
          Event name
          <input
            type="search"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setHistory([]);
            }}
          />
        </label>
        <label>
          Delivery status
          <select
            value={status}
            onChange={(event) => {
              setStatus(event.target.value);
              setHistory([]);
            }}
          >
            <option>All</option>
            <option>Delivered</option>
            <option>Deferred</option>
            <option>Bounced</option>
          </select>
        </label>
      </div>
      {rows.length ? (
        <CaseStudyTable
          table={{
            caption: "Synthetic event page",
            columns: ["Event ID", "Event", "Status"],
            rows,
          }}
        />
      ) : (
        <p>No events match these filters.</p>
      )}
      <div className="cs-demo-controls">
        <button
          className="cs-button"
          disabled={!history.length}
          onClick={() => setHistory((previous) => previous.slice(0, -1))}
        >
          Previous page
        </button>
        <button
          className="cs-button"
          disabled={!next}
          onClick={() => {
            if (next) setHistory((previous) => [...previous, next]);
          }}
        >
          Next page
        </button>
      </div>
      <p className="cs-demo-result" role="status">
        Current cursor: {cursor ?? "start"}
        {next && ` · Next cursor: ${next}`}
      </p>
    </>
  );
}

const gsm =
  "@£$¥èéùìòÇ\nØø\rÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ !\"#¤%&'()*+,-./0123456789:;<=>?¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿abcdefghijklmnopqrstuvwxyzäöñüà";
const extensions = "\f^{}\\[~]|€";

function Message() {
  const [channel, setChannel] = useState("SMS");
  const [carousel, setCarousel] = useState(false);
  const [text, setText] = useState(
    "Hi {{first_name}}, your welcome offer is ready.",
  );
  const unicode = Array.from(text).some(
    (character) => !gsm.includes(character) && !extensions.includes(character),
  );
  const units = unicode
    ? text.length
    : Array.from(text).reduce(
        (count, character) => count + (extensions.includes(character) ? 2 : 1),
        0,
      );
  const limit = unicode ? 70 : 160;
  const parts =
    units === 0
      ? 0
      : units <= limit
        ? 1
        : Math.ceil(units / (unicode ? 67 : 153));
  return (
    <>
      <div className="cs-demo-controls">
        <label>
          Channel
          <select
            value={channel}
            onChange={(event) => setChannel(event.target.value)}
          >
            <option>SMS</option>
            <option>WhatsApp</option>
          </select>
        </label>
        {channel === "WhatsApp" && (
          <label className="cs-demo-check">
            <input
              type="checkbox"
              checked={carousel}
              onChange={(event) => setCarousel(event.target.checked)}
            />{" "}
            Show sample carousel
          </label>
        )}
      </div>
      <label className="cs-demo-label">
        Draft text
        <textarea
          value={text}
          rows={3}
          maxLength={600}
          onChange={(event) => setText(event.target.value)}
        />
      </label>
      <div className="cs-message-preview">
        <strong>{channel} preview</strong>
        <p>
          {text.replaceAll("{{first_name}}", "Sam") ||
            "Your message will appear here."}
        </p>
        {channel === "WhatsApp" && carousel && (
          <ul className="cs-preview-carousel">
            <li>Sample media · Welcome offer</li>
            <li>Sample media · Member benefits</li>
          </ul>
        )}
      </div>
      {channel === "SMS" && (
        <p className="cs-demo-result" role="status">
          Draft estimate: {unicode ? "Unicode" : "GSM-7"} · {units} units ·{" "}
          {parts} {parts === 1 ? "part" : "parts"}. Personalization can change
          the delivered length.
        </p>
      )}
    </>
  );
}

const commands = [
  "Search navigation",
  "Open account settings",
  "View campaign list",
];

function Palette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selection, setSelection] = useState("");
  const matches = commands.filter((command) =>
    command.toLowerCase().includes(query.trim().toLowerCase()),
  );
  return (
    <>
      <button
        className="cs-button"
        onClick={() => {
          setQuery("");
          setOpen(true);
        }}
      >
        Open demo command palette
      </button>
      <p className="cs-demo-result" role="status">
        {selection ||
          "Use Tab to reach a result, Enter to choose it, or Escape to close."}
      </p>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        label="Demo command palette"
        className="cs cs-palette"
      >
        <div className="cs-demo-controls">
          <label>
            Search demo commands
            <input
              autoFocus
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <button className="cs-button" onClick={() => setOpen(false)}>
            Close
          </button>
        </div>
        <div className="cs-palette-list">
          {matches.map((command) => (
            <button
              className="cs-button"
              key={command}
              onClick={() => {
                setSelection(`Selected: ${command}`);
                setOpen(false);
              }}
            >
              {command}
            </button>
          ))}
        </div>
        {!matches.length && <p role="status">No commands found.</p>}
      </Dialog>
    </>
  );
}

const demos = {
  workflow: Workflow,
  segmentation: Segmentation,
  cache: Cache,
  events: Events,
  message: Message,
  palette: Palette,
};

export default function EngineeringDemos({
  kind,
}: {
  kind: Exclude<NonNullable<Section["demo"]>, "csv">;
}) {
  const Demo = demos[kind];
  return <Demo />;
}
