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
  mailtoHref,
  NAV,
  OGRN,
  PHONE,
  telegramHref,
  telHref,
  WHATSAPP,
  TELEGRAM,
  whatsappHref,
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
                  {PHONE}
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
            <p>
              Telegram:{" "}
              {isPlaceholderContact(TELEGRAM) ? (
                TELEGRAM
              ) : (
                <a
                  href={telegramHref()}
                  className="text-bone"
                  onClick={() => analytics.track("telegram_click")}
                >
                  {TELEGRAM}
                </a>
              )}
            </p>
            <p>
              WhatsApp:{" "}
              {isPlaceholderContact(WHATSAPP) ? (
                WHATSAPP
              ) : (
                <a
                  href={whatsappHref()}
                  className="text-bone"
                  onClick={() => analytics.track("whatsapp_click")}
                >
                  {WHATSAPP}
                </a>
              )}
            </p>
            <p className="pt-4 text-xs">ИНН: {INN}</p>
            <p className="text-xs">ОГРН: {OGRN}</p>
          </div>
        </div>
        <p className="mt-12 max-w-3xl text-xs leading-relaxed text-mute/80">
          Плёнка не предназначена для защиты от прямого попадания БПЛА и не делает стекло
          неразбиваемым. Она предназначена для удержания фрагментов повреждённого стекла и снижения
          риска их разлёта.
        </p>
      </Container>
    </footer>
  );
}
