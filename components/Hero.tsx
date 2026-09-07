"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { analytics } from "@/lib/analytics";
import { CITY, CTA, MICROCOPY, REGION } from "@/lib/constants";

export function Hero() {
  return (
    <section id="top" className="relative isolate min-h-[min(92vh,820px)] overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/bullet_proof_glass.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center -scale-x-100"
        />
        <div className="hero-vignette absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/92 via-ink/72 to-ink/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/45" />
      </div>

      <Container className="relative">
        <motion.div
          className="max-w-2xl"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-cta">
            Защитная плёнка · {CITY} и {REGION}
          </p>
          <h1 className="font-display text-[2.15rem] font-semibold leading-[1.08] tracking-tight text-bone sm:text-5xl md:text-6xl">
            Защита окон
            <br />
            от{" "}
            <span className="relative inline-block text-cta">
              осколков
              <span className="absolute inset-x-0 -bottom-1 h-px bg-cta/50" />
            </span>{" "}
            при
            <br />
            взрывной волне
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-mute md:text-lg">
            Защитная плёнка удерживает фрагменты повреждённого стекла в раме и помогает
            снизить риск их разлёта в помещение.
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-mute/80">
            {MICROCOPY.disclaimerUav}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a
                href="#lead"
                onClick={() => analytics.track("hero_cta_click", { source: "hero_primary" })}
              >
                {CTA.primaryArrow}
              </a>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <a href="#before-after">{CTA.howItWorks}</a>
            </Button>
          </div>
          <ul className="mt-6 flex flex-col gap-2 text-sm text-mute sm:flex-row sm:flex-wrap sm:gap-x-6">
            <li>{MICROCOPY.calcByPhoto}</li>
            <li>{MICROCOPY.fixedPrice}</li>
            <li>
              {CITY} и {REGION}
            </li>
          </ul>
        </motion.div>
      </Container>
    </section>
  );
}
