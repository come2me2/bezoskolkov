"use client";

import Image from "next/image";

import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/section";
import { analytics } from "@/lib/analytics";
import { CTA, MICROCOPY } from "@/lib/constants";
import { PHOTOS } from "@/lib/photos";

export function FinalCTA() {
  return (
    <Section id="final" className="relative overflow-hidden px-0 py-0 md:py-0">
      <div className="relative min-h-[520px]">
        <Image
          src={PHOTOS.interior.src}
          alt={PHOTOS.interior.alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/72" />
        <Container className="relative flex min-h-[520px] items-center py-20 text-center">
          <Reveal className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-bone md:text-5xl">
              Осколки — главная опасность разбитого окна
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-mute md:text-lg">
              Защитная плёнка помогает удерживать фрагменты повреждённого стекла и снижать риск их
              разлёта в помещение при взрывах и повреждении окон.
            </p>
            <p className="mt-6 font-display text-2xl text-bone">Не ждите, пока защита понадобится.</p>
            <Button asChild size="lg" className="mt-8">
              <a
                href="#lead"
                onClick={() => analytics.track("hero_cta_click", { source: "final" })}
              >
                {CTA.primaryArrow}
              </a>
            </Button>
            <p className="mt-4 text-xs text-mute">{MICROCOPY.disclaimerShort}</p>
          </Reveal>
        </Container>
      </div>
    </Section>
  );
}
