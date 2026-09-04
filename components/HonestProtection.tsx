import { Check, X } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { SitePhoto } from "@/components/SitePhoto";
import { Container, Eyebrow, Section, SectionTitle } from "@/components/ui/section";
import { TRUST_HELPS, TRUST_NOT } from "@/lib/constants";
import { PHOTOS } from "@/lib/photos";

export function HonestProtection() {
  return (
    <Section id="honest" className="bg-surface/50">
      <Container>
        <div className="grid items-end gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <Eyebrow>Честно о защите</Eyebrow>
            <SectionTitle>Честно: от чего защищает плёнка</SectionTitle>
          </Reveal>
          <Reveal>
            <SitePhoto
              photo={PHOTOS.toolsClose}
              className="aspect-[4/5] min-h-[280px] w-full lg:aspect-[5/4]"
              sizes="(min-width: 1024px) 40vw, 100vw"
              caption
            />
          </Reveal>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <Reveal>
            <article className="h-full rounded-3xl bg-ink p-7 hairline">
              <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-ok">
                <Check className="h-4 w-4" aria-hidden /> Помогает
              </p>
              <ul className="mt-6 space-y-3 text-bone">
                {TRUST_HELPS.map((item) => (
                  <li key={item} className="flex gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-ok" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
          <Reveal delay={0.08}>
            <article className="h-full rounded-3xl bg-ink p-7 hairline">
              <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-danger">
                <X className="h-4 w-4" aria-hidden /> Не является
              </p>
              <ul className="mt-6 space-y-3 text-mute">
                {TRUST_NOT.map((item) => (
                  <li key={item} className="flex gap-3">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-danger" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
        <p className="mt-10 font-display text-2xl leading-snug text-bone md:text-3xl">
          Без громких обещаний.
          <br />
          Только конкретная задача: удержать осколки.
        </p>
      </Container>
    </Section>
  );
}
