import { SitePhoto } from "@/components/SitePhoto";
import { Container } from "@/components/ui/section";
import { PHOTOS } from "@/lib/photos";

export function PhotoBreak() {
  return (
    <section aria-label="Кадры реального монтажа" className="py-4 md:py-6">
      <Container>
        <div className="grid gap-3 md:grid-cols-12 md:items-stretch md:gap-4">
          <SitePhoto
            photo={PHOTOS.applyWide}
            className="aspect-[4/3] min-h-[260px] md:col-span-7 md:aspect-auto md:min-h-[480px]"
            sizes="(min-width: 768px) 58vw, 100vw"
            caption
          />
          <SitePhoto
            photo={PHOTOS.tools}
            className="aspect-[3/4] min-h-[320px] md:col-span-5 md:aspect-auto md:min-h-[480px]"
            sizes="(min-width: 768px) 38vw, 100vw"
            caption
          />
        </div>
        <p className="mt-4 text-center text-xs text-mute">
          Реальные кадры монтажа. Это не стоковые изображения и не постановка испытания.
        </p>
      </Container>
    </section>
  );
}
