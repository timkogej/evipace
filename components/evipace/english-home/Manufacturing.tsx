import { evipaceImages } from "@/lib/evipace-images";
import { manufacturingFunctions } from "./content";
import { HomeImage } from "./HomeImage";

export function Manufacturing({
  imageAvailable
}: {
  imageAvailable: boolean;
}) {
  return (
    <section
      className="relative isolate overflow-hidden bg-dark text-white scroll-mt-20"
      id="manufacturing"
    >
      <HomeImage
        asset={evipaceImages.industrialBreak}
        available={imageAvailable}
        className="inset-0 z-0 rounded-none border-0"
        imageClassName="object-[63%_50%]"
        position="absolute"
      />
      <div className="absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(21,21,21,0.94)_0%,rgba(21,21,21,0.76)_48%,rgba(21,21,21,0.48)_100%)]" />

      <div className="site-shell relative z-10 grid min-h-[48rem] gap-12 py-20 sm:py-28 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
        <div>
          <p className="eyebrow">Built for companies that make things</p>
          <h2 className="font-display mt-6 max-w-[13ch] text-4xl leading-[0.98] text-white sm:text-5xl lg:text-6xl">
            ESG looks different inside a manufacturing company.
          </h2>
          <p className="mt-7 max-w-xl text-lg leading-8 text-white/72">
            A manufacturing supplier does not operate from one sustainability
            database. Its ESG information is distributed across the business.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden border border-white/16 bg-white/16 sm:grid-cols-2">
          {manufacturingFunctions.map((item) => (
            <div className="bg-black/45 p-5 backdrop-blur-sm sm:p-6" key={item.title}>
              <h3 className="text-base font-bold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/68">{item.body}</p>
            </div>
          ))}
          <div className="bg-orange p-5 sm:col-span-2 sm:p-6">
            <p className="font-display text-3xl leading-none text-white sm:text-4xl">
              We work with that reality. Not against it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
