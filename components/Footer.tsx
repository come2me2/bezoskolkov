"use client";

import Link from "next/link";

import { Container } from "@/components/ui/section";
import { analytics } from "@/lib/analytics";
import {
  BRAND_NAME,
  BRAND_TAGLINE,
  CITY_SHORT,
  EMAIL,
  INN,
  LEGAL_NAME,
  mailtoHref,
  NAV,
  OGRN,
  PHONE,
  PHONE_DISPLAY,
  telHref,
  isPlaceholderContact,
} from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-line pb-28 pt-16 md:pb-16">
      <Container>
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-display text-xl font-semibold text-bone">{BRAND_NAME}</p>
            <p className="mt-1 text-sm text-mute">{BRAND_TAGLINE}</p>
            <p className="mt-4 text-sm text-mute">{CITY_SHORT}</p>
          </div>
          <nav className="grid grid-cols-2 gap-3 text-sm" aria-label="Навигация в подвале">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className="text-mute hover:text-bone">
                {item.label}
              </Link>
            ))}
            <Link href="/privacy" className="text-mute hover:text-bone">
              Политика конфиденциальности
            </Link>
            <Link href="/consent" className="text-mute hover:text-bone">
              Согласие на обработку данных
            </Link>
          </nav>
          <div className="space-y-2 text-sm text-mute">
            <p>
              Телефон:{" "}
              {isPlaceholderContact(PHONE) ? (
                PHONE
              ) : (
                <a
                  href={telHref()}
                  className="text-bone"
                  onClick={() => analytics.track("phone_click")}
                >
                  {PHONE_DISPLAY}
                </a>
              )}
            </p>
            <p>
              Email:{" "}
              {isPlaceholderContact(EMAIL) ? (
                EMAIL
              ) : (
                <a href={mailtoHref()} className="text-bone">
                  {EMAIL}
                </a>
              )}
            </p>
            <p className="pt-4 text-xs text-bone">{LEGAL_NAME}</p>
            <p className="text-xs">ИНН: {INN}</p>
            <p className="text-xs">ОГРНИП: {OGRN}</p>
          </div>
        </div>
        <p className="mt-12 max-w-3xl text-xs leading-relaxed text-mute/80">
          Плёнка не предназначена для защиты от прямого попадания БПЛА и не делает стекло
          неразбиваемым. Она предназначена для удержания фрагментов повреждённого стекла и снижения
          риска их разлёта.
        </p>
        <p className="mt-4 text-xs text-mute/80">
          <Link href="/privacy" className="underline-offset-2 hover:text-bone hover:underline">
            Политика конфиденциальности
          </Link>
          {" · "}
          <Link href="/consent" className="underline-offset-2 hover:text-bone hover:underline">
            Согласие на обработку персональных данных
          </Link>
        </p>
      </Container>
    </footer>
  );
}
