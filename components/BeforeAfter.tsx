import { Reveal } from "@/components/Reveal";
import { WindowVisual } from "@/components/WindowVisual";
import { Container, Eyebrow, Section, SectionTitle } from "@/components/ui/section";

export function BeforeAfter() {
  return (
    <Section id="before-after" className="bg-surface/40">
      <Container>
        <Reveal>
          <Eyebrow>Наглядно</Eyebrow>
          <SectionTitle>
            Стекло может треснуть.
            <br />
            Разница — в осколках.
          </SectionTitle>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-mute md:text-lg">
            Нажмите на каждое окно: сначала взрыв, затем результат. С плёнкой фрагменты остаются в
            раме. Без плёнки — разлетаются.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2 md:gap-6">
          <Reveal>
            <WindowVisual
              mode="held"
              label="С защитной плёнкой"
              caption="После удара стекло трескается, но осколки удерживаются в раме."
            />
          </Reveal>
          <Reveal delay={0.08}>
            <WindowVisual
              mode="shattered"
              label="Без защитной плёнки"
              caption="После удара осколки разлетаются внутрь помещения."
            />
          </Reveal>
        </div>

        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-mute">
          Плёнка не делает стекло неразбиваемым. Её задача — удерживать фрагменты после разрушения
          стекла.
        </p>
      </Container>
    </Section>
  );
}
