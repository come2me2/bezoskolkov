import Image from "next/image";

import { Reveal } from "@/components/Reveal";
import { Container, Eyebrow, Section, SectionTitle } from "@/components/ui/section";
import { INSTALL_GALLERY } from "@/lib/photos";

export function Portfolio() {
  return (
    <Section id="portfolio">
      <Container>
        <Reveal>
          <Eyebrow>Монтаж</Eyebrow>
          <SectionTitle>Как выглядит установка на объекте</SectionTitle>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-mute md:text-lg">
            Пока это фотографии процесса монтажа. Снимки готовых объектов появятся здесь после
            загрузки оригиналов — чужие работы и стоковые кадры мы не подставляем.
          </p>
        </Reveal>
        <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {INSTALL_GALLERY.map((photo) => (
            <figure
              key={photo.id}
              className="mb-4 break-inside-avoid overflow-hidden rounded-2xl bg-elevated hairline"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="h-auto w-full"
              />
              <figcaption className="px-4 py-3 text-sm text-mute">{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </Section>
  );
}
