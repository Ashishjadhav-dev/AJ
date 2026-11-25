import type { MetadataRoute } from "next";
import { portfolioSiteUrl } from "@/lib/case-study-release";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", portfolioSiteUrl).href,
  };
}
