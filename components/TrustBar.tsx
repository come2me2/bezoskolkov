import { Container } from "@/components/ui/section";
import {
  FILM_CLASS,
  FILM_THICKNESS,
  FILM_WARRANTY,
  MICROCOPY,
  UV_PROTECTION,
} from "@/lib/constants";

const items = [
  { label: "толщина плёнки", value: FILM_THICKNESS },
  { label: "заявленный класс", value: FILM_CLASS },
  { label: "заявленная защита от УФ", value: UV_PROTECTION },
  { label: "гарантия на материал", value: FILM_WARRANTY },
];

export function TrustBar() {
  return (
    <section aria-label="Ключевые характеристики" className="border-y border-line bg-surface/80">
      <Container className="py-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {items.map((item) => (
            <div key={item.label}>
              <p className="font-display text-2xl font-semibold text-bone md:text-3xl">{item.value}</p>
              <p className="mt-2 text-sm text-mute">{item.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-xs leading-relaxed text-mute/80">{MICROCOPY.specsNote}</p>
      </Container>
    </section>
  );
}
