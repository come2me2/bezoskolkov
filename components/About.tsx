import { Reveal } from "@/components/Reveal";
import { Container, Eyebrow, Lead, Section, SectionTitle } from "@/components/ui/section";
import { BRAND_NAME, BRAND_PHRASE, CITY, REGION } from "@/lib/constants";

export function About() {
  return (
    <Section id="about">
      <Container className="max-w-3xl">
        <Reveal>
          <Eyebrow>О компании</Eyebrow>
          <SectionTitle>{BRAND_NAME}</SectionTitle>
          <Lead>
            {BRAND_NAME} устанавливает защитную противоосколочную плёнку на окна и стеклянные
            конструкции в {CITY} и {REGION}.
          </Lead>
          <p className="mt-6 text-lg leading-relaxed text-bone">
            {BRAND_PHRASE.line1}
            <br />
            {BRAND_PHRASE.line2}
          </p>
          <p className="mt-6 text-mute">
            Мы не продаём «броню от дронов». Мы решаем конкретную задачу: удерживать фрагменты
            повреждённого стекла и снижать риск их разлёта внутрь помещения.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
