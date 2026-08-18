"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { ButtonLink } from "./ButtonLink";

const navItems = [
  { label: "Services", href: "#services" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Why Evipace", href: "#why-evipace" },
  { label: "Resources", href: "#resources" },
  { label: "About", href: "#about" }
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 44);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`evipace-navbar fixed inset-x-0 top-0 z-50 transition duration-300 ${
        scrolled || open
          ? "border-b border-[rgba(21,21,21,0.08)] bg-[rgba(250,249,246,0.86)] shadow-[0_18px_60px_rgba(21,21,21,0.06)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary navigation"
        className="evipace-navbar__nav site-shell flex h-20 items-center justify-between gap-7 min-[640px]:h-[5.5rem]"
      >
        <a
          aria-label="Evipace — Home"
          className="inline-flex h-16 shrink-0 items-center pr-5 lg:pr-10"
          href="#top"
        >
          <BrandLogo priority />
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <a
              className="text-sm font-semibold text-[rgba(21,21,21,0.68)] transition hover:text-ink"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            className="text-sm font-semibold text-[rgba(21,21,21,0.62)] transition hover:text-ink"
            href="#login"
          >
            Log in
          </a>
          <ButtonLink className="min-h-11 px-4 py-2.5" href="#book-call">
            Book a call
          </ButtonLink>
        </div>

        <button
          aria-expanded={open}
          aria-label={open ? "Close navigation" : "Open navigation"}
          className="mobile-menu-button fixed top-[1.125rem] z-[60] inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(21,21,21,0.14)] bg-white/70 text-ink shadow-[0_10px_30px_rgba(21,21,21,0.08)] backdrop-blur min-[640px]:top-[1.375rem] lg:hidden"
          onClick={() => setOpen((current) => !current)}
          type="button"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-[rgba(21,21,21,0.08)] bg-[rgba(250,249,246,0.96)] px-[var(--section-x)] pb-6 pt-2 backdrop-blur-xl lg:hidden">
          <div className="mx-auto flex max-w-[1360px] flex-col gap-1">
            {navItems.map((item) => (
              <a
                className="rounded-xl px-2 py-3 text-lg font-semibold text-ink"
                href={item.href}
                key={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="mt-3 flex flex-col gap-3">
              <a
                className="rounded-lg border border-[rgba(21,21,21,0.14)] px-5 py-3 text-center text-sm font-bold"
                href="#login"
                onClick={() => setOpen(false)}
              >
                Log in
              </a>
              <ButtonLink href="#book-call">Book a call</ButtonLink>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
