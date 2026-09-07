import { Reveal } from "@/components/Reveal";
import { SitePhoto } from "@/components/SitePhoto";
import { Container, Eyebrow, Lead, Section, SectionTitle } from "@/components/ui/section";
import { BRAND_ACCENT, DRONE_CARDS } from "@/lib/constants";
import { PHOTOS } from "@/lib/photos";
import { padStep } from "@/lib/utils";

export function DroneProtection() {
  return (
    <Section id="uav" className="bg-surface/50">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <Eyebrow>Взрывы и атаки БПЛА</Eyebrow>
            <SectionTitle>Защита от осколков при взрывной волне</SectionTitle>
            <Lead>
              При атаке БПЛА повреждение окон может произойти вследствие взрывной волны, ударного
              воздействия и других факторов. Если стекло разрушается, фрагменты могут попасть внутрь
              помещения.
            </Lead>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-mute md:text-lg">
              Защитная плёнка предназначена для удержания фрагментов повреждённого стекла и снижения
              их разлёта.
            </p>
          </Reveal>
          <Reveal>
            <SitePhoto
              photo={PHOTOS.applyProfile}
              className="aspect-[4/3] min-h-[280px] w-full"
              sizes="(min-width: 1024px) 50vw, 100vw"
              caption
            />
          </Reveal>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {DRONE_CARDS.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.06}>
              <article className="h-full rounded-2xl bg-ink p-6 hairline">
                <p className="text-xs font-semibold tracking-[0.2em] text-cta">{padStep(i)}</p>
                <h3 className="mt-4 font-display text-xl font-semibold uppercase tracking-wide text-bone">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-mute">{card.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p className="max-w-xl text-sm text-mute">
            Важно: плёнка не предназначена для защиты от прямого попадания БПЛА.
          </p>
          <p className="font-display text-2xl leading-tight text-bone md:text-right">
            {BRAND_ACCENT.line1}
            <br />
            <span className="text-cta">{BRAND_ACCENT.line2}</span>
          </p>
        </div>
      </Container>
    </Section>
  );
}
