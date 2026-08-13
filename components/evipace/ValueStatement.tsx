import { evipaceImages } from "@/lib/evipace-images";
import { ImageSlot } from "./ImageSlot";
import { Reveal } from "./Reveal";

type ValueStatementProps = {
  imageAvailable: boolean;
};

export function ValueStatement({ imageAvailable }: ValueStatementProps) {
  return (
    <section className="section-padding bg-[var(--warm)]">
      <div className="site-shell grid items-end gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <p className="eyebrow">Immediate clarity</p>
          <h2 className="font-display mt-6 max-w-[16ch] text-[clamp(2.5rem,5.4vw,5.45rem)] leading-[0.94]">
            Your customer
            <br />
            asked for{" "}
            <span className="text-orange">ESG data.</span>
            <br />
            You do not need another software platform.
            <br />
            You need it <span className="text-orange">done.</span>
          </h2>
        </Reveal>

        <Reveal className="grid gap-7" delay={0.12}>
          <p className="body-lg">
            Evipace turns your existing invoices, spreadsheets, policies and
            company data into the ESG deliverables your customers are asking
            for.
          </p>
          <ImageSlot
            {...evipaceImages.customerData}
            className="aspect-[1.24/1] rounded-2xl"
            renderActualImage={imageAvailable}
          />
        </Reveal>
      </div>
    </section>
  );
}
