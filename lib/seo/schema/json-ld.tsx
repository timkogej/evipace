type SchemaNode = Record<string, unknown>;

/**
 * Renders one <script type="application/ld+json"> containing all schema
 * nodes for the page as a single @graph, rather than scattering multiple
 * separate JSON-LD scripts across the page. `data` is always
 * server-generated from our own typed builders (never user input), so
 * dangerouslySetInnerHTML here carries no injection risk.
 */
export function JsonLd({ graph }: { graph: SchemaNode[] }) {
  const payload = {
    "@context": "https://schema.org",
    "@graph": graph
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
