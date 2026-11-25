import { ImageResponse } from "next/og";
import { caseStudiesEnabled } from "@/lib/case-study-release";

export const dynamic = "force-static";

export function GET() {
  if (!caseStudiesEnabled) return new Response("Not found", { status: 404 });
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: "#02090f",
        color: "#eaf6f5",
        padding: "0 90px",
      }}
    >
      <div
        style={{
          width: "100%",
          height: 2,
          background: "#52f2a3",
          display: "flex",
          marginBottom: 54,
        }}
      />
      <div
        style={{
          color: "#52f2a3",
          fontSize: 28,
          display: "flex",
          letterSpacing: 2,
        }}
      >
        ASHISH S JADHAV
      </div>
      <div style={{ display: "flex", fontSize: 76, marginTop: 24 }}>
        Engineering Case Studies
      </div>
      <div
        style={{
          display: "flex",
          color: "#87a0ad",
          fontSize: 33,
          marginTop: 22,
        }}
      >
        Frontend architecture, performance and product engineering
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
