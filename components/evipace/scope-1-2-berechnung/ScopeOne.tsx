import { Factory, Flame, Fuel, Snowflake } from "lucide-react";
import { Band, Card, CardGrid, Head, Items, Prose } from "../service-landing/Blocks";

const groups = [
  {
    icon: Flame,
    title: "Stationäre Verbrennung",
    items: [
      "Erdgas",
      "Heizöl",
      "Flüssiggas",
      "andere Brennstoffe für Heizung",
      "Brennstoffe für industrielle Anlagen oder Prozesse"
    ]
  },
  {
    icon: Fuel,
    title: "Fuhrpark und mobile Quellen",
    items: [
      "Diesel",
      "Benzin",
      "andere Kraftstoffe",
      "eigene oder kontrollierte Fahrzeuge",
      "bestimmte betriebliche Maschinen"
    ]
  },
  {
    icon: Factory,
    title: "Prozessemissionen",
    body: "Bei manchen Produktionsprozessen entstehen Treibhausgasemissionen direkt durch die jeweilige Tätigkeit. Ob solche Emissionen für Ihr Unternehmen relevant sind, muss separat geprüft werden."
  },
  {
    icon: Snowflake,
    title: "Kältemittel",
    items: [
      "Wartungsprotokolle",
      "Nachfüllmengen",
      "Anlagenübersichten",
      "Dokumentationen zu eingesetzten Kältemitteln"
    ]
  }
];

export function ScopeOne() {
  return (
    <Band>
      <Head eyebrow="Scope 1" title="Direkte Emissionen aus Quellen Ihres Unternehmens">
        <p>
          Scope 1 umfasst direkte Treibhausgasemissionen aus Quellen, die
          Ihrem Unternehmen gehören oder von ihm kontrolliert werden.
        </p>
        <p>
          Welche Quellen relevant sind, hängt vom jeweiligen Unternehmen ab.
        </p>
      </Head>
      <CardGrid>
        {groups.map((group) => (
          <Card icon={group.icon} key={group.title} title={group.title}>
            {group.body ? <p>{group.body}</p> : null}
            {group.items ? <Items items={group.items} /> : null}
          </Card>
        ))}
      </CardGrid>
      <Prose>
        <p>
          Scope 1 besteht deshalb nicht einfach aus „Gas plus Firmenwagen“.
          Die tatsächlichen Emissionsquellen müssen für das konkrete
          Unternehmen identifiziert werden.
        </p>
      </Prose>
    </Band>
  );
}
