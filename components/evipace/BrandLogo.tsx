import Image from "next/image";
import { evipaceImages } from "@/lib/evipace-images";

type BrandLogoProps = {
  variant?: "nav" | "footer";
  priority?: boolean;
  className?: string;
};

const sizes = {
  nav: "(max-width: 760px) 140px, 175px",
  footer: "(max-width: 760px) 190px, 240px"
};

export function BrandLogo({
  variant = "nav",
  priority = false,
  className = ""
}: BrandLogoProps) {
  return (
    <span className={`brand-logo brand-logo--${variant} ${className}`}>
      <Image
        alt="Evipace"
        className="brand-logo__image"
        height={1024}
        priority={priority}
        sizes={sizes[variant]}
        src={evipaceImages.brand.logo}
        width={1536}
      />
    </span>
  );
}
