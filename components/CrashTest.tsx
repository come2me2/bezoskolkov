"use client";

import { useRef } from "react";

import { Reveal } from "@/components/Reveal";
import { Container, Eyebrow, Section, SectionTitle } from "@/components/ui/section";
import { analytics } from "@/lib/analytics";

const VIDEO_SRC = "/videos/crash-test.mp4";

export function CrashTest() {
  const tracked = useRef(false);

  const onPlay = () => {
    if (tracked.current) return;
    tracked.current = true;
    analytics.track("crash_test_play");
  };

  return (
    <Section id="crash-test">
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-[1fr_minmax(240px,320px)] md:gap-12 lg:grid-cols-[1.1fr_minmax(260px,360px)]">
          <Reveal>
            <Eyebrow>Испытание</Eyebrow>
            <SectionTitle>Посмотрите, как плёнка ведёт себя при разрушении стекла</SectionTitle>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-mute md:text-lg">
              Реальное видео испытания. Плёнка не делает стекло неразбиваемым — она удерживает
              фрагменты после разрушения.
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="mx-auto w-full max-w-[320px] overflow-hidden rounded-3xl bg-ink hairline md:mx-0 md:max-w-none">
              <video
                className="aspect-[9/16] w-full bg-ink object-cover"
                controls
                playsInline
                preload="metadata"
                src={VIDEO_SRC}
                onPlay={onPlay}
              >
                Ваш браузер не поддерживает воспроизведение видео.
              </video>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
