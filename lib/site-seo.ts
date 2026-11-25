import type { Metadata } from "next";
import { profile } from "@/data/portfolio";
import { portfolioSiteUrl } from "./case-study-release";

export function siteMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const url = new URL(path, portfolioSiteUrl);
  const image = {
    url: new URL("/opengraph-image", portfolioSiteUrl),
    width: 1200,
    height: 630,
    alt: `${profile.name}, ${profile.role}`,
  };
  return {
    metadataBase: new URL(portfolioSiteUrl),
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", title, description, url, images: [image] },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export function breadcrumbData(entries: { title: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: entries.map(({ title, href }, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: title,
      item: new URL(href, portfolioSiteUrl).href,
    })),
  };
}
