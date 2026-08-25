import { ButtonLink } from "../ButtonLink";
import { Reveal } from "../Reveal";

const SEND_REQUEST_HREF = "/de/send-request";

export function LandingFinalCTA() {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--soft-orange)] py-[clamp(4rem,8vw,7rem)]">
      <div className="site-shell relative z-10 max-w-3xl">
        <Reveal>
          <p className="eyebrow">Nächster Schritt</p>
          <h2 className="font-display mt-6 text-[clamp(2.6rem,6vw,4.5rem)] leading-[0.95]">
            Eine ESG-Anfrage vom Kunden im Posteingang?
            <br />
            <span className="text-orange">Senden Sie sie uns.</span>
          </h2>
          <p className="mt-7 max-w-xl text-xl leading-8 text-[rgba(21,21,21,0.68)]">
            Sie müssen nicht zuerst selbst herausfinden, welche Daten,
            Dokumente und Nachweise benötigt werden.
          </p>
          <p className="mt-4 max-w-xl text-xl leading-8 text-[rgba(21,21,21,0.68)]">
            Schicken Sie uns die Anfrage Ihres Kunden. Wir strukturieren die
            Anforderungen und zeigen Ihnen, wie der nächste Schritt aussieht.
          </p>
          <div className="mt-9">
            <ButtonLink href={SEND_REQUEST_HREF}>
              ESG-Anfrage senden
            </ButtonLink>
          </div>
          <p className="mt-6 text-sm font-semibold text-[rgba(21,21,21,0.6)]">
            E-Mail-Anforderung · Excel · PDF · Word · weitere Dokumente
          </p>
        </Reveal>
      </div>
    </section>
  );
}
