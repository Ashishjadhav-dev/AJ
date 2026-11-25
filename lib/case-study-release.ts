// Server entry points only. Set at build time after public-release approval.
export const caseStudiesEnabled =
  process.env.ENGINEERING_CASE_STUDIES_PUBLIC === "true";

export const portfolioSiteUrl =
  process.env.PORTFOLIO_SITE_URL || "https://aj-rho.vercel.app";
