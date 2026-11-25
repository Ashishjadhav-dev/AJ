import type { Metadata } from "next";
import { portfolioSiteUrl } from "@/lib/case-study-release";
import { profile } from "@/data/portfolio";

export function caseStudyMetadata(
  title: string,
  description: string,
  slug?: string,
): Metadata {
  const path = slug ? `/case-studies/${slug}` : "/case-studies";
  const url = new URL(path, portfolioSiteUrl);
  const fullTitle = `${title} — ${profile.name}`;
  const images = [
    {
      url: new URL("/case-studies/social-preview", portfolioSiteUrl),
      width: 1200,
      height: 630,
      alt: "Engineering Case Studies by Ashish S Jadhav",
    },
  ];

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      images,
      type: slug ? "article" : "website",
      ...(slug ? { authors: [portfolioSiteUrl] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images,
    },
  };
}

export function engineeringBreadcrumb(title?: string, slug?: string) {
  const entries = [
    { name: "Home", url: "/" },
    { name: "Case Studies", url: "/case-studies" },
  ];
  if (title && slug)
    entries.push({ name: title, url: `/case-studies/${slug}` });
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: entries.map(({ name, url }, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: new URL(url, portfolioSiteUrl).href,
    })),
  };
}

export function safeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
