import { BrandLogo } from "./BrandLogo";

const columns = [
  {
    title: "Services",
    links: ["ESG questionnaires", "VSME reporting", "Scope 1 & 2", "ESG policies"]
  },
  {
    title: "Company",
    links: ["About", "Contact", "Resources"]
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Imprint"]
  }
];

export function Footer() {
  return (
    <footer
      className="border-t border-[rgba(21,21,21,0.1)] bg-[var(--warm)] pb-8 pt-16 text-ink"
      id="about"
    >
      <div className="site-shell">
        <div className="grid gap-12 border-b border-[rgba(21,21,21,0.12)] pb-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <a
              aria-label="Evipace — Home"
              className="inline-flex"
              href="#top"
            >
              <BrandLogo variant="footer" />
            </a>
            <p className="mt-5 text-lg font-semibold text-[rgba(21,21,21,0.66)]">
              ESG, done faster.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.title}>
                <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-orange">
                  {column.title}
                </h2>
                <ul className="mt-5 grid gap-3">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        className="text-sm font-semibold text-[rgba(21,21,21,0.62)] transition hover:text-ink"
                        href="#top"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5 pt-7 text-sm font-semibold text-[rgba(21,21,21,0.48)] sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; Evipace</p>
          <div className="flex gap-4" aria-label="Language placeholders">
            <a href="#top">EN</a>
            <a href="#top">DE</a>
            <a href="#top">SL</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
