"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Container, Eyebrow, Section, SectionTitle } from "@/components/ui/section";
import { analytics } from "@/lib/analytics";
import { FAQ_ITEMS } from "@/lib/constants";

export function FAQ() {
  return (
    <Section id="faq">
      <Container className="max-w-3xl">
        <Eyebrow>FAQ</Eyebrow>
        <SectionTitle>Ответы на частые вопросы</SectionTitle>
        <Accordion
          type="single"
          collapsible
          className="mt-10"
          onValueChange={(value) => {
            if (value) analytics.track("faq_open", { id: value });
          }}
        >
          {FAQ_ITEMS.map((item, i) => (
            <AccordionItem key={item.question} value={`faq-${i}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </Section>
  );
}
