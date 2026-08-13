import { evipaceImages } from "@/lib/evipace-images";
import { ImageSlot } from "./ImageSlot";

type IndustrialBreakProps = {
  imageAvailable: boolean;
};

export function IndustrialBreak({ imageAvailable }: IndustrialBreakProps) {
  return (
    <section className="relative min-h-[70vh] overflow-hidden bg-dark text-white">
      <ImageSlot
        {...evipaceImages.industrialBreak}
        className="!absolute inset-0 z-0 rounded-none border-0"
        renderActualImage={imageAvailable}
      />
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(90deg, rgba(21,21,21,0.78) 0%, rgba(21,21,21,0.44) 52%, rgba(21,21,21,0.18) 100%)"
        }}
      />
      <div className="site-shell relative z-10 flex min-h-[70vh] items-end pb-14 pt-24">
        <div className="max-w-3xl">
          <p className="eyebrow">Industrial precision</p>
          <h2 className="font-display mt-6 text-[clamp(3rem,7vw,6.8rem)] leading-[0.9] text-white">
            Built for companies that make things.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/74">
            Manufacturing ESG should work like manufacturing itself: structured,
            efficient and precise.
          </p>
        </div>
      </div>
    </section>
  );
}
