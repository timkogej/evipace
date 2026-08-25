type SectionHeadingProps = {
  eyebrow: string;
  heading: string;
  className?: string;
  dark?: boolean;
};

export function SectionHeading({
  eyebrow,
  heading,
  className = "",
  dark = false
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <p className="eyebrow">{eyebrow}</p>
      <h2
        className={`font-display mt-6 text-4xl leading-[0.98] sm:text-5xl lg:text-6xl ${dark ? "text-white" : "text-ink"}`}
      >
        {heading}
      </h2>
    </div>
  );
}
