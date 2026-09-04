import { Reveal } from "@/components/Reveal";
import { SitePhoto } from "@/components/SitePhoto";
import { Button } from "@/components/ui/button";
import { Container, Eyebrow, Section, SectionTitle } from "@/components/ui/section";
import { CTA, PROCESS_STEPS } from "@/lib/constants";
import { PHOTOS } from "@/lib/photos";
import { padStep } from "@/lib/utils";

const processPhotos = [PHOTOS.tools, PHOTOS.applyCorner, PHOTOS.squeegee, PHOTOS.interior];

export function Process() {
  return (
    <Section id="process">
      <Container>
        <Reveal>
          <Eyebrow>Процесс</Eyebrow>
          <SectionTitle>От фотографии до защищённого окна</SectionTitle>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {processPhotos.map((photo) => (
            <SitePhoto
              key={photo.id}
              photo={photo}
              className="aspect-[3/4] min-h-[220px]"
              sizes="(min-width: 1024px) 22vw, 50vw"
              caption
            />
          ))}
        </div>
        <ol className="mt-12 grid gap-0 md:grid-cols-2">
          {PROCESS_STEPS.map((step, i) => (
            <li
              key={step.title}
              className="relative flex gap-4 border-l border-line py-5 pl-6 md:even:flex-row-reverse md:even:border-l-0 md:even:border-r md:even:pl-0 md:even:pr-6"
            >
              <span className="font-display text-sm font-semibold tracking-[0.18em] text-cta">
                {padStep(i)}
              </span>
              <p className="text-lg text-bone">{step.title}</p>
            </li>
          ))}
        </ol>
        <Button asChild className="mt-10">
          <a href="#lead">{CTA.startWithPhoto}</a>
        </Button>
      </Container>
    </Section>
  );
}
