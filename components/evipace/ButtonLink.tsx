import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "dark" | "light";
  className?: string;
};

const variants = {
  primary:
    "bg-[#c25000] text-white border-[#c25000] hover:bg-[#b44d00] hover:border-[#b44d00]",
  secondary:
    "bg-transparent text-ink border-[rgba(21,21,21,0.2)] hover:border-orange hover:text-orange",
  dark: "bg-ink text-white border-ink hover:bg-orange hover:border-orange",
  light:
    "bg-white text-ink border-white hover:bg-orange hover:border-orange hover:text-white"
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = ""
}: ButtonLinkProps) {
  return (
    <a
      className={`cta-button inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border px-5 py-3 text-sm font-bold transition duration-200 ${variants[variant]} ${className}`}
      href={href}
    >
      <span>{children}</span>
      <span aria-hidden="true" className="cta-arrow-clip">
        <ArrowRight className="cta-arrow h-4 w-4" />
      </span>
    </a>
  );
}
