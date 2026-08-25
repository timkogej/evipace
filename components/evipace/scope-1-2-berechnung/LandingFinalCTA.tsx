import { ButtonLink } from "../ButtonLink";
import { Reveal } from "../Reveal";

const SEND_REQUEST_HREF = "/de/send-request";

export function LandingFinalCTA() {
  return (
    <section className="section-padding bg-ink text-white">
      <div className="site-shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-white/60">Nächster Schritt</p>
          <h2 className="heading-md font-display mt-6 max-w-[20ch] text-white">
            Ihre Verbrauchsdaten sind da. Machen wir daraus belastbare
            Scope-1- und Scope-2-Werte.
          </h2>
          <p className="body-lg mt-7 text-white/72">
            Senden Sie uns Ihre vorhandenen Energie-, Brennstoff- und
            Verbrauchsdaten. Wir strukturieren die Quellen, bereiten die
            Berechnung vor und dokumentieren nachvollziehbar, wie Ihre
            Treibhausgasemissionen entstanden sind.
          </p>
          <div className="mt-9">
            <ButtonLink href={SEND_REQUEST_HREF} variant="light">
              Scope-1-&-2-Berechnung anfragen
            </ButtonLink>
          </div>
          <p className="mt-7 text-sm font-semibold text-white/60">
            Strom · Erdgas · Brennstoffe · Fuhrpark · Kältemittel · Fernwärme
          </p>
        </Reveal>
      </div>
    </section>
  );
}
