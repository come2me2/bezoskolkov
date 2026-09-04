import { Reveal } from "@/components/Reveal";
import { Container, Eyebrow, Section, SectionTitle } from "@/components/ui/section";
import { OBJECTIONS } from "@/lib/constants";

export function Objections() {
  return (
    <Section id="objections" className="bg-surface/40">
      <Container>
        <Reveal>
          <Eyebrow>Перед монтажом</Eyebrow>
          <SectionTitle>Всё, что обычно хочется узнать перед монтажом</SectionTitle>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {OBJECTIONS.map((item, i) => (
            <Reveal key={item.question} delay={i * 0.03}>
              <article className="h-full rounded-2xl bg-ink p-6 hairline">
                <h3 className="font-display text-xl font-semibold text-bone">{item.question}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mute">{item.answer}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
