import { MapPinned, ShoppingCart } from "lucide-react";
import { Reveal } from "../Reveal";

const methods = [
  {
    icon: MapPinned,
    title: "Location-based",
    body: "Die location-based Methode bildet die durchschnittliche Emissionsintensität des Stromsystems beziehungsweise Netzes ab, aus dem Energie bezogen wird. Sie betrachtet damit vor allem den geografischen beziehungsweise netzbezogenen Strommix."
  },
  {
    icon: ShoppingCart,
    title: "Market-based",
    body: "Die market-based Methode berücksichtigt - soweit die methodischen Voraussetzungen erfüllt sind - Informationen über die konkrete Energiebeschaffung und geeignete vertragliche Instrumente. Das kann beispielsweise bei bestimmten Stromprodukten oder Beschaffungsmodellen relevant sein."
  }
];

export function ScopeTwoMethods() {
  return (
    <section className="section-padding bg-[var(--warm)]">
      <div className="site-shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Scope-2-Methode</p>
          <h2 className="heading-md font-display mt-6 max-w-[20ch]">
            Location-based oder market-based? Die Methode muss zum
            Anwendungsfall passen.
          </h2>
          <p className="body-lg mt-7">
            Bei Scope 2 können unterschiedliche Berechnungsperspektiven
            relevant sein.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {methods.map((method, index) => (
            <Reveal
              className="rounded-[1.25rem] border border-[rgba(21,21,21,0.11)] bg-white p-7 shadow-lift"
              delay={index * 0.06}
              key={method.title}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--soft-orange)] text-orange">
                <method.icon aria-hidden="true" className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-ink">
                {method.title}
              </h3>
              <p className="mt-4 leading-7 text-muted">{method.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 max-w-3xl space-y-5 text-lg leading-8 text-muted" delay={0.12}>
          <p>
            Nicht jeder Anwendungsfall verlangt dieselbe Darstellung. Für
            bestimmte Berichtsanforderungen kann eine location-based Berechnung
            ausreichen oder ausdrücklich vorgesehen sein. In anderen Fällen
            kann zusätzlich eine market-based Betrachtung relevant sein.
          </p>
          <p>
            Wir legen deshalb nicht einfach eine Methode pauschal fest, sondern
            richten die Berechnung am vorgesehenen Verwendungszweck aus.
          </p>
          <p>
            Für VSME beziehungsweise den aktuellen freiwilligen europäischen
            Berichtsrahmen ist insbesondere die location-based
            Scope-2-Betrachtung relevant.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
