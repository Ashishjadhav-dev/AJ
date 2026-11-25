import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbData } from "@/lib/site-seo";

export function PageBreadcrumb({
  entries,
}: {
  entries: { title: string; href: string }[];
}) {
  return (
    <>
      <JsonLd data={breadcrumbData(entries)} />
      <nav className="site-breadcrumb" aria-label="Breadcrumb">
        <ol>
          {entries.map(({ title, href }, index) => (
            <li key={href}>
              {index > 0 && <span aria-hidden>/</span>}
              {index === entries.length - 1 ? (
                <span aria-current="page">{title}</span>
              ) : (
                <Link href={href}>{title}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
