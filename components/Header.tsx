"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { BRAND_NAME, CITY_SHORT, CTA, NAV } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-transparent transition-colors",
        scrolled || open ? "glass border-line" : "bg-ink/40 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 md:h-[4.25rem] md:px-8">
        <Link href="#top" className="shrink-0" aria-label={`${BRAND_NAME} — на главную`}>
          <Image
            src="/images/logo-wordmark.png"
            alt={BRAND_NAME}
            width={989}
            height={168}
            priority
            className="h-8 w-auto max-w-[min(58vw,240px)] object-contain object-left bg-transparent sm:h-9 sm:max-w-[280px] md:h-10 md:max-w-[320px]"
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Основная навигация">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-mute transition-colors hover:text-bone"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <span className="hidden text-xs text-mute md:inline">{CITY_SHORT}</span>
          <ThemeToggle />
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <a href="#lead">{CTA.calculate}</a>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden /> : <Menu aria-hidden />}
            <span className="sr-only">{open ? "Закрыть меню" : "Открыть меню"}</span>
          </Button>
        </div>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-line bg-ink px-5 py-6 lg:hidden">
          <nav className="flex flex-col gap-4" aria-label="Мобильная навигация">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-lg text-bone"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <Button asChild className="mt-6 w-full">
            <a href="#lead" onClick={() => setOpen(false)}>
              {CTA.calculate}
            </a>
          </Button>
        </div>
      ) : null}
    </header>
  );
}
