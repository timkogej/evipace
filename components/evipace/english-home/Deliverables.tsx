import { DeliveryDossier } from "../home-sections/DeliveryDossier";
import { deliverables } from "./content";
import { SectionHeading } from "./SectionHeading";

export function Deliverables() {
  return (
    <section className="section-padding bg-[var(--paper)]" id="deliverables">
      <div className="site-shell grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
        <div>
          <SectionHeading
            eyebrow="Deliverables"
            heading="Not just advice about what you should do."
          />
          <p className="mt-7 max-w-xl text-lg leading-8 text-muted">
            Depending on the request, the output may include the following.
          </p>
          <p className="mt-8 border-l-2 border-orange pl-5 text-lg font-semibold leading-8 text-ink">
            The exact deliverable follows the actual request.
          </p>
        </div>

        <DeliveryDossier items={deliverables} />
      </div>
    </section>
  );
}
