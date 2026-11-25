import type { MetadataRoute } from "next";
import { caseStudies } from "@/data/case-studies";
import { projects } from "@/data/projects";
import { caseStudiesEnabled, portfolioSiteUrl } from "@/lib/case-study-release";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/projects",
    "/resume",
    ...projects.map(({ slug }) => `/projects/${slug}`),
  ];
  if (caseStudiesEnabled)
    paths.push(
      "/case-studies",
      ...caseStudies.map(({ slug }) => `/case-studies/${slug}`),
    );
  return paths.map((path) => ({ url: new URL(path, portfolioSiteUrl).href }));
}
