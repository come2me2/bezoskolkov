"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { analytics } from "@/lib/analytics";
import {
  BRAND_NAME,
  CTA,
  NAV,
  PHONE_DISPLAY,
  telHref,
} from "@/lib/constants";
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
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-5 md:h-[4.25rem] md:gap-4 md:px-8">
        <Link href="#top" className="shrink-0" aria-label={`${BRAND_NAME} — на главную`}>
          <Image
            src="/images/logo-wordmark.png"
            alt={BRAND_NAME}
            width={989}
            height={168}
            priority
            className="h-8 w-auto max-w-[min(48vw,200px)] object-contain object-left bg-transparent sm:h-9 sm:max-w-[220px] lg:max-w-[200px] xl:h-10 xl:max-w-[240px]"
          />
        </Link>

        <nav
          className="hidden min-w-0 flex-1 items-center justify-center gap-3 xl:gap-5 lg:flex"
          aria-label="Основная навигация"
        >
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-[13px] text-mute transition-colors hover:text-bone xl:text-sm"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
          <a
            href={telHref()}
            className="hidden whitespace-nowrap text-sm font-semibold text-bone transition-colors hover:text-cta lg:inline"
            onClick={() => analytics.track("phone_click")}
          >
            {PHONE_DISPLAY}
          </a>
          <ThemeToggle />
          <Button asChild size="sm" className="hidden whitespace-nowrap sm:inline-flex">
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
          <div className="mt-6 space-y-2 border-t border-line pt-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-mute">Контакты</p>
            <a
              href={telHref()}
              className="block text-lg font-semibold text-bone"
              onClick={() => {
                analytics.track("phone_click");
                setOpen(false);
              }}
            >
              {PHONE_DISPLAY}
            </a>
          </div>
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
