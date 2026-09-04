import { PhotoLeadForm } from "@/components/LeadForm";
import { Reveal } from "@/components/Reveal";
import { Container, Eyebrow, Lead, Section, SectionTitle } from "@/components/ui/section";
import { CALCULATION_MINUTES } from "@/lib/constants";

export function Price() {
  return (
    <Section id="price" className="bg-surface/40">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <Eyebrow>Стоимость</Eyebrow>
            <SectionTitle>Узнайте стоимость защиты ваших окон за {CALCULATION_MINUTES} минут</SectionTitle>
            <Lead>
              Не знаете размеры? Не проблема.
              <br />
              <br />
              Просто отправьте фотографии окон — мы оценим объект и подготовим предварительный расчёт.
            </Lead>
          </Reveal>
          <PhotoLeadForm />
        </div>
      </Container>
    </Section>
  );
}
