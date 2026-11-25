import { safeJsonLd } from "@/lib/case-study-seo";
import { portfolioSiteUrl } from "@/lib/case-study-release";
import { profile } from "@/data/portfolio";

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(data) }}
    />
  );
}

export function PersonJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Person",
        name: profile.name,
        url: portfolioSiteUrl,
        jobTitle: profile.role,
        description: profile.summary,
        sameAs: [profile.github, profile.linkedin],
        knowsAbout: [
          ...profile.specialization,
          "Frontend architecture",
          "SaaS product engineering",
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bengaluru",
          addressCountry: "IN",
        },
      }}
    />
  );
}
