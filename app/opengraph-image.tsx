import { ImageResponse } from "next/og";
import { profile } from "@/data/portfolio";

export const alt = "Ashish S. Jadhav, Frontend Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 90px",
        background: "#0c131b",
        color: "#edf3f5",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          color: "#76d9b4",
          fontSize: 30,
          marginBottom: 48,
        }}
      >
        AJ.
      </div>
      <div style={{ display: "flex", color: "#76d9b4", fontSize: 28 }}>
        {profile.role}
      </div>
      <div style={{ display: "flex", fontSize: 90, marginTop: 12 }}>
        {profile.name}
      </div>
      <div
        style={{
          display: "flex",
          color: "#a5b7c2",
          fontSize: 31,
          marginTop: 22,
        }}
      >
        React · Next.js · TypeScript · SaaS architecture
      </div>
    </div>,
    size,
  );
}
