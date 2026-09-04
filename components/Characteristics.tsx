"use client";

import { useState } from "react";
import { FileText } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { SitePhoto } from "@/components/SitePhoto";
import { Button } from "@/components/ui/button";
import { Container, Eyebrow, Section, SectionTitle } from "@/components/ui/section";
import {
  CTA,
  DOCUMENTS,
  FILM_CLASS,
  FILM_THICKNESS,
  FILM_TRANSPARENCY,
  FILM_WARRANTY,
  INSTALLATION_WARRANTY,
  MICROCOPY,
  UV_PROTECTION,
} from "@/lib/constants";
import { documentHref, documentStatusLabel, hasAnyDocuments } from "@/lib/documents";
import { PHOTOS } from "@/lib/photos";

const cards = [
  { value: FILM_THICKNESS, label: "Толщина плёнки" },
  { value: FILM_CLASS, label: "Заявленный класс защиты" },
  { value: UV_PROTECTION, label: "Заявленная защита от УФ" },
  { value: FILM_TRANSPARENCY, label: "Прозрачность" },
  { value: FILM_WARRANTY, label: "Гарантия на материал" },
  { value: INSTALLATION_WARRANTY, label: "Гарантия на монтаж" },
];

export function Characteristics() {
  const [open, setOpen] = useState(false);

  return (
    <Section id="characteristics">
      <Container>
        <div className="grid items-end gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <Eyebrow>Характеристики</Eyebrow>
            <SectionTitle>Характеристики защитной плёнки</SectionTitle>
          </Reveal>
          <Reveal>
            <SitePhoto
              photo={PHOTOS.interior}
              className="aspect-[4/5] min-h-[240px] w-full lg:aspect-[5/4]"
              sizes="(min-width: 1024px) 36vw, 100vw"
              caption
            />
          </Reveal>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {cards.map((card, i) => (
            <Reveal key={card.label} delay={i * 0.04}>
              <article className="rounded-2xl bg-surface p-5 hairline md:p-6">
                <p className="font-display text-2xl font-semibold text-bone md:text-3xl">{card.value}</p>
                <p className="mt-2 text-sm text-mute">{card.label}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-xs text-mute/80">{MICROCOPY.specsNote}</p>
        <Button type="button" variant="secondary" className="mt-8" onClick={() => setOpen((v) => !v)}>
          {CTA.showDocuments}
        </Button>
        {open ? (
          <div className="mt-6 rounded-2xl bg-surface p-6 hairline" role="region" aria-label="Документы">
            {hasAnyDocuments() ? null : (
              <p className="mb-5 text-sm text-mute">{MICROCOPY.docsPending}</p>
            )}
            <ul className="space-y-4">
              {DOCUMENTS.map((doc) => {
                const href = documentHref(doc);
                return (
                  <li key={doc.id} className="flex items-start gap-3">
                    <FileText className="mt-0.5 h-4 w-4 text-cta" aria-hidden />
                    <div>
                      <p className="font-medium text-bone">{doc.title}</p>
                      <p className="text-sm text-mute">{doc.description}</p>
                      {href ? (
                        <a className="mt-1 inline-block text-sm text-cta" href={href}>
                          Открыть документ
                        </a>
                      ) : (
                        <p className="mt-1 text-sm text-mute">{documentStatusLabel(doc)}</p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
