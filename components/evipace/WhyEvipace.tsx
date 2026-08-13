import { evipaceImages } from "@/lib/evipace-images";
import { ImageSlot } from "./ImageSlot";
import { Reveal } from "./Reveal";

const values = [
  {
    title: "Faster execution",
    body: "Structured workflows reduce repetitive ESG administration."
  },
  {
    title: "Done for you",
    body: "We help complete the actual work - not just provide another software platform."
  },
  {
    title: "Reviewed before delivery",
    body: "Client deliverables are checked before they are returned to you."
  },
  {
    title: "Built for suppliers",
    body: "Designed around the ESG requests manufacturing companies receive from their customers."
  }
];

type WhyEvipaceProps = {
  imageAvailable: boolean;
};

export function WhyEvipace({ imageAvailable }: WhyEvipaceProps) {
  return (
    <section className="section-padding bg-[var(--paper)]" id="why-evipace">
      <div className="site-shell">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.46fr] lg:items-end">
          <Reveal className="max-w-4xl">
            <p className="eyebrow">Why Evipace</p>
            <h2 className="heading-md font-display mt-6">
              ESG without building an ESG department.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <ImageSlot
              {...evipaceImages.founder}
              className="min-h-[24rem] rounded-[1rem]"
              renderActualImage={imageAvailable}
            />
          </Reveal>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden border border-[rgba(21,21,21,0.11)] bg-[rgba(21,21,21,0.11)] lg:grid-cols-4">
          {values.map((value, index) => (
            <Reveal
              className="group min-h-[22rem] bg-[var(--paper)] p-6 transition hover:bg-white sm:p-8"
              delay={index * 0.05}
              key={value.title}
            >
              <span className="font-display text-6xl leading-none text-[rgba(21,21,21,0.16)] transition group-hover:text-orange">
                0{index + 1}
              </span>
              <h3 className="mt-16 text-2xl font-bold text-ink">
                {value.title}
              </h3>
              <p className="mt-4 leading-7 text-muted">{value.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
