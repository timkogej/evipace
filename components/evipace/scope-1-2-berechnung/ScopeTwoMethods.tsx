import { MapPinned, ShoppingCart } from "lucide-react";
import { Band, Card, CardGrid, Head, Prose } from "../service-landing/Blocks";

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
    <Band>
      <Head
        eyebrow="Scope-2-Methode"
        lead="Bei Scope 2 können unterschiedliche Berechnungsperspektiven relevant sein."
        title="Location-based oder market-based? Die Methode muss zum Anwendungsfall passen."
      />
      <CardGrid columns={2}>
        {methods.map((method) => (
          <Card icon={method.icon} key={method.title} title={method.title}>
            <p>{method.body}</p>
          </Card>
        ))}
      </CardGrid>
      <Prose>
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
      </Prose>
    </Band>
  );
}
