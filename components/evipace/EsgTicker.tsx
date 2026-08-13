const tickerItems = [
  "EcoVadis",
  "IntegrityNext",
  "VSME",
  "Scope 1",
  "Scope 2",
  "Supplier questionnaires",
  "Customer ESG requests",
  "Policies",
  "Carbon data",
  "Evidence",
  "Excel questionnaires"
];

export function EsgTicker() {
  const repeated = [...tickerItems, ...tickerItems];

  return (
    <section
      aria-label="ESG request types"
      className="marquee overflow-hidden border-y border-[rgba(21,21,21,0.11)] bg-white py-5"
    >
      <div className="marquee-track">
        {repeated.map((item, index) => (
          <div
            className="flex items-center gap-6 px-6 text-sm font-bold uppercase tracking-[0.16em] text-[rgba(21,21,21,0.64)]"
            key={`${item}-${index}`}
          >
            <span>{item}</span>
            <span className="h-px w-10 bg-[rgba(254,112,1,0.8)]" />
          </div>
        ))}
      </div>
    </section>
  );
}
