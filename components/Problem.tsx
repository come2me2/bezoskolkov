import { Armchair, Baby, BedDouble, Laptop } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { SitePhoto } from "@/components/SitePhoto";
import { Container, Eyebrow, Lead, Section, SectionTitle } from "@/components/ui/section";
import { BRAND_PHRASE } from "@/lib/constants";
import { PHOTOS } from "@/lib/photos";

const zones = [
  { icon: BedDouble, label: "Кровать" },
  { icon: Armchair, label: "Диван" },
  { icon: Laptop, label: "Рабочее место" },
  { icon: Baby, label: "Детская зона" },
];

export function Problem() {
  return (
    <Section id="problem">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <Eyebrow>Проблема</Eyebrow>
            <SectionTitle>При взрыве опасно не только разбитое окно</SectionTitle>
            <Lead>
              Взрывная волна и другие сильные воздействия могут привести к разрушению стекла. В этот
              момент опасность представляет не только повреждённое окно, но и осколки, которые могут
              разлететься внутрь помещения.
            </Lead>
            <p className="mt-4 max-w-2xl text-lg text-bone">Особенно опасно, если рядом находятся люди.</p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {zones.map((zone) => (
                <div key={zone.label} className="rounded-2xl bg-surface p-4 hairline">
                  <zone.icon className="h-5 w-5 text-cta" aria-hidden />
                  <p className="mt-3 text-sm font-medium text-bone">{zone.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal>
            <SitePhoto
              photo={PHOTOS.applyBack}
              className="aspect-[3/4] min-h-[420px] w-full"
              sizes="(min-width: 1024px) 42vw, 100vw"
              caption
            />
          </Reveal>
        </div>
        <Reveal className="mt-12 max-w-3xl">
          <p className="font-display text-2xl leading-snug text-bone md:text-3xl">
            Мы не можем контролировать происходящее снаружи.
            <br />
            Но можем заранее уменьшить риск от разлёта осколков внутри.
          </p>
          <p className="mt-6 text-mute">
            {BRAND_PHRASE.line1} {BRAND_PHRASE.line2}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
