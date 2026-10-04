import Image from "next/image";

const imagePath = "/images/evipace/methodology";

type Locale = "en" | "de";
type FeatureKind = "process" | "emissions";

const evidenceDescription: Record<Locale, string> = {
  en: "Colleagues comparing figures and supporting documents at a desk",
  de: "Zwei Personen vergleichen Zahlen und Nachweise an einem Schreibtisch"
};

export function MethodologyHeroImage() {
  return (
    <div aria-hidden="true" className="methodology-hero-media">
      <picture>
        <source
          media="(max-width: 767px)"
          srcSet={`${imagePath}/hero-mobile.webp?v=2`}
        />
        <Image
          alt=""
          className="object-cover object-center"
          fill
          priority
          sizes="100vw"
          src={`${imagePath}/hero-desktop.webp?v=2`}
          unoptimized
        />
      </picture>
    </div>
  );
}

export function MethodologySectionImage({ kind }: { kind: FeatureKind }) {
  return (
    <div
      aria-hidden="true"
      className={`methodology-feature-media methodology-feature-media--${kind}`}
    >
      <Image
        alt=""
        className="object-cover"
        fill
        sizes="100vw"
        src={`${imagePath}/${kind}.webp?v=2`}
        unoptimized
      />
    </div>
  );
}

export function MethodologyEvidenceImage({ locale }: { locale: Locale }) {
  return (
    <figure className="methodology-evidence-photo">
      <Image
        alt={evidenceDescription[locale]}
        className="object-cover"
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        src={`${imagePath}/evidence.webp?v=2`}
        unoptimized
      />
    </figure>
  );
}
