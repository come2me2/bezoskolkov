import { Camera, Clock3, ShieldCheck, Sparkles } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { SitePhoto } from "@/components/SitePhoto";
import { Container, Eyebrow, Section, SectionTitle } from "@/components/ui/section";
import { FREE_VISIT_FROM_WINDOWS, GUARANTEE_CARDS } from "@/lib/constants";
import { PHOTOS } from "@/lib/photos";

const icons = [Camera, ShieldCheck, Sparkles, Clock3];

export function Guarantee() {
  return (
    <Section id="guarantee">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <SitePhoto
              photo={PHOTOS.portrait}
              className="aspect-[3/4] min-h-[420px] w-full"
              sizes="(min-width: 1024px) 38vw, 100vw"
              caption
            />
          </Reveal>
          <div>
            <Reveal>
              <Eyebrow>Почему нам доверяют</Eyebrow>
              <SectionTitle>Без скрытых доплат</SectionTitle>
            </Reveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {GUARANTEE_CARDS.map((card, i) => {
                const Icon = icons[i];
                return (
                  <Reveal key={card.title} delay={i * 0.05}>
                    <article className="h-full rounded-2xl bg-surface p-6 hairline">
                      <Icon className="h-5 w-5 text-cta" aria-hidden />
                      <h3 className="mt-4 font-display text-lg font-semibold uppercase tracking-wide text-bone">
                        {card.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-mute">{card.text}</p>
                    </article>
                  </Reveal>
                );
              })}
            </div>
            <p className="mt-6 rounded-2xl bg-elevated px-5 py-4 text-bone hairline">
              При заказе от {FREE_VISIT_FROM_WINDOWS} окон — выезд мастера бесплатно.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
