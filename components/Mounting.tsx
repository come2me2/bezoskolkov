"use client";

import { motion, useReducedMotion } from "framer-motion";

import { Reveal } from "@/components/Reveal";
import { SitePhoto } from "@/components/SitePhoto";
import { Container, Eyebrow, Lead, Section, SectionTitle } from "@/components/ui/section";
import { PHOTOS } from "@/lib/photos";

export function Mounting() {
  const reduce = useReducedMotion();

  return (
    <Section id="mounting" className="bg-surface/50">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <Reveal>
            <Eyebrow>Монтаж</Eyebrow>
            <SectionTitle>Плёнка устанавливается не только на стекло</SectionTitle>
            <Lead>
              Если конструкция окна позволяет, край плёнки можно завести под штапик.
            </Lead>
            <p className="mt-5 text-mute">
              Так край плёнки остаётся скрытым, а фиксация становится более аккуратной.
            </p>
            <p className="mt-6 text-sm text-mute">
              Возможность монтажа под штапик определяется конструкцией конкретного окна.
            </p>
          </Reveal>
          <Reveal>
            <SitePhoto
              photo={PHOTOS.squeegee}
              className="aspect-[3/4] min-h-[380px] w-full"
              sizes="(min-width: 1024px) 44vw, 100vw"
              caption
            />
          </Reveal>
        </div>
        <Reveal className="mt-8">
          <div className="rounded-3xl bg-ink p-6 hairline md:p-8">
            <svg viewBox="0 0 420 260" className="h-auto w-full" role="img" aria-label="Схема монтажа плёнки под штапик: рама, стекло, плёнка, штапик">
              <rect x="24" y="28" width="56" height="204" rx="4" fill="#2a3340" />
              <text x="52" y="248" textAnchor="middle" fill="var(--color-mute)" fontSize="11">
                РАМА
              </text>
              <rect x="80" y="48" width="18" height="164" fill="#7d9bb8" />
              <text x="89" y="248" textAnchor="middle" fill="var(--color-mute)" fontSize="11">
                СТЕКЛО
              </text>
              <motion.rect
                x="80"
                y="52"
                width="6"
                height="156"
                fill="var(--color-cta)"
                initial={reduce ? false : { x: 120, opacity: 0.2 }}
                whileInView={{ x: 80, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              />
              <text x="160" y="40" fill="var(--color-cta)" fontSize="12">
                ПЛЁНКА
              </text>
              <motion.rect
                x="68"
                y="40"
                width="28"
                height="180"
                rx="2"
                fill="#c9c4b8"
                initial={reduce ? false : { x: 200, opacity: 0.15 }}
                whileInView={{ x: 68, opacity: 0.92 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              />
              <text x="200" y="248" fill="var(--color-mute)" fontSize="11">
                ШТАПИК
              </text>
              <path d="M120 88 H210" stroke="var(--color-cta)" strokeWidth="1" markerEnd="url(#arrow)" />
              <defs>
                <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0 0 L6 3 L0 6 Z" fill="var(--color-cta)" />
                </marker>
              </defs>
              <text x="220" y="92" fill="var(--color-bone)" fontSize="12">
                край заводится под штапик
              </text>
            </svg>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
