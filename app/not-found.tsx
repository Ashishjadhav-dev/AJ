import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" tabIndex={-1} className="site-wrap standard-page">
      <div className="page-heading">
        <p className="site-kicker">404</p>
        <h1>Page not found.</h1>
        <p>This address may have changed.</p>
        <Link className="site-button site-button-primary" href="/">
          Back to portfolio
        </Link>
      </div>
    </main>
  );
}
