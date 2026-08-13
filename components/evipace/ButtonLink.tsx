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
    "bg-orange text-white border-orange hover:bg-[#e96500] hover:border-[#e96500]",
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
      className={`group inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border px-5 py-3 text-sm font-bold transition duration-200 hover:-translate-y-0.5 ${variants[variant]} ${className}`}
      href={href}
    >
      <span>{children}</span>
      <ArrowRight
        aria-hidden="true"
        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
      />
    </a>
  );
}
