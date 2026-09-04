"use client";

import { Building2, Store, PanelsTopLeft, UtensilsCrossed, Wine, Warehouse } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { SitePhoto } from "@/components/SitePhoto";
import { Button } from "@/components/ui/button";
import { Container, Eyebrow, Lead, Section, SectionTitle } from "@/components/ui/section";
import { analytics } from "@/lib/analytics";
import { BUSINESS_BENEFITS, BUSINESS_CARDS, CTA } from "@/lib/constants";
import { PHOTOS } from "@/lib/photos";

const icons = [Building2, Store, PanelsTopLeft, UtensilsCrossed, Wine, Warehouse];

export function Business() {
  return (
    <Section id="business" className="bg-surface/50">
      <Container>
        <Reveal>
          <Eyebrow>Для бизнеса</Eyebrow>
          <SectionTitle>Защищаем стекло в коммерческих объектах</SectionTitle>
          <Lead>
            Для бизнеса повреждение витрин и окон — это не только риск для людей, но и потенциальный
            простой, ущерб имуществу и расходы на восстановление.
          </Lead>
        </Reveal>
        <Reveal className="mt-10">
          <SitePhoto
            photo={PHOTOS.applyWide}
            className="aspect-[16/8] min-h-[240px] w-full"
            sizes="100vw"
            caption
          />
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {BUSINESS_CARDS.map((card, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={card.title} delay={i * 0.04}>
                <article className="rounded-2xl bg-ink p-5 hairline">
                  <Icon className="h-5 w-5 text-cta" aria-hidden />
                  <h3 className="mt-4 font-medium text-bone">{card.title}</h3>
                </article>
              </Reveal>
            );
          })}
        </div>
        <ul className="mt-10 grid gap-3 md:grid-cols-2">
          {BUSINESS_BENEFITS.map((item) => (
            <li key={item} className="text-mute">
              — {item}
            </li>
          ))}
        </ul>
        <Button asChild className="mt-10">
          <a
            href="#lead"
            onClick={() => analytics.track("business_cta_click")}
          >
            {CTA.businessArrow}
          </a>
        </Button>
      </Container>
    </Section>
  );
}
