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
            EcoVadis-Anfrage erhalten?
            <br />
            <span className="text-orange">
              Zeigen Sie uns, womit Sie arbeiten.
            </span>
          </h2>
          <p className="mt-7 max-w-xl text-xl leading-8 text-[rgba(21,21,21,0.68)]">
            Senden Sie uns Ihren aktuellen Fragebogen, vorhandene Nachweise
            oder Ihre bisherige Scorecard.
          </p>
          <p className="mt-4 max-w-xl text-xl leading-8 text-[rgba(21,21,21,0.68)]">
            Wir prüfen, wie Ihre Vorbereitung strukturiert werden kann, welche
            Informationen bereits vorhanden sind und wo noch offene Punkte
            bestehen.
          </p>
          <div className="mt-9">
            <ButtonLink href={SEND_REQUEST_HREF}>
              EcoVadis-Anfrage senden
            </ButtonLink>
          </div>
          <p className="mt-6 text-sm font-semibold text-[rgba(21,21,21,0.6)]">
            Fragebogen · Scorecard · Richtlinien · Zertifikate · weitere
            Nachweise
          </p>
        </Reveal>
      </div>
    </section>
  );
}
