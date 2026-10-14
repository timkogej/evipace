import {
  Building2,
  Factory,
  Thermometer,
  Zap
} from "lucide-react";
import { Band, Card, CardGrid, Formula, Head, Prose } from "../service-landing/Blocks";

const sources = [
  { icon: Zap, label: "Strom" },
  { icon: Thermometer, label: "Fernwärme" },
  { icon: Building2, label: "Fernkälte" },
  { icon: Factory, label: "extern erzeugter Dampf" }
];

export function ScopeTwo() {
  return (
    <Band tone="tinted">
      <Head eyebrow="Scope 2" title="Emissionen aus eingekaufter Energie">
        <p>
          Scope 2 umfasst indirekte Treibhausgasemissionen, die mit
          eingekaufter oder bezogener Energie zusammenhängen.
        </p>
        <p>
          Für viele Produktionsunternehmen ist eingekaufter Strom die
          wichtigste Scope-2-Quelle.
        </p>
        <p>Je nach Betrieb können zusätzlich weitere Quellen relevant sein.</p>
      </Head>
      <CardGrid>
        {sources.map((source) => (
          <Card icon={source.icon} key={source.label} title={source.label} />
        ))}
      </CardGrid>
      <Prose>
        <Formula
          label="Beispielhafte Logik"
          parts={[
            { title: "Stromverbrauch", value: "245.000 kWh" },
            { op: "→" },
            { title: "Emissionsgrundlage", value: "geeigneter Faktor" },
            { op: "→" },
            { title: "Ergebnis", value: "tCO₂e" }
          ]}
        />
        <p>
          Aus einer Stromrechnung wird erst dann eine belastbare
          Scope-2-Zahl, wenn Verbrauch, Zeitraum, Bilanzgrenze und
          Emissionsfaktor sauber zusammengeführt werden.
        </p>
      </Prose>
    </Band>
  );
}
