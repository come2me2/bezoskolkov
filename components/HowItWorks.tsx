"use client";

import { motion, useReducedMotion } from "framer-motion";

import { Reveal } from "@/components/Reveal";
import { SitePhoto } from "@/components/SitePhoto";
import { Button } from "@/components/ui/button";
import { Container, Eyebrow, Section, SectionTitle } from "@/components/ui/section";
import { CTA, HOW_IT_WORKS } from "@/lib/constants";
import { PHOTOS } from "@/lib/photos";
import { padStep } from "@/lib/utils";

export function HowItWorks() {
  const reduce = useReducedMotion();

  return (
    <Section id="how-it-works">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>Принцип работы</Eyebrow>
            <SectionTitle>Как работает защитная плёнка</SectionTitle>
            <p className="mt-6 font-display text-2xl leading-snug text-bone md:text-3xl">
              Главная задача плёнки — не сделать стекло неразбиваемым, а удержать его фрагменты после
              разрушения.
            </p>
          </Reveal>
          <Reveal>
            <SitePhoto
              photo={PHOTOS.applyCorner}
              className="aspect-[3/4] max-h-[560px] min-h-[360px] w-full"
              sizes="(min-width: 1024px) 42vw, 100vw"
              caption
            />
          </Reveal>
        </div>
        <ol className="mt-12 grid gap-4 md:grid-cols-4">
          {HOW_IT_WORKS.map((step, i) => (
            <motion.li
              key={step.title}
              className="rounded-2xl bg-surface p-6 hairline"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <p className="text-xs font-semibold tracking-[0.2em] text-cta">{padStep(i)}</p>
              <h3 className="mt-4 font-display text-xl font-semibold uppercase text-bone">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-mute">{step.text}</p>
            </motion.li>
          ))}
        </ol>
        <Button asChild variant="secondary" className="mt-8">
          <a href="#lead">{CTA.sendPhoto}</a>
        </Button>
      </Container>
    </Section>
  );
}
