"use client";

import { useMemo, useState } from "react";

import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Container, Eyebrow, Lead, Section, SectionTitle } from "@/components/ui/section";
import { analytics } from "@/lib/analytics";
import { estimate } from "@/lib/calculator";
import { CTA, OBJECT_TYPES, type ObjectTypeId } from "@/lib/constants";

export function Calculator() {
  const [started, setStarted] = useState(false);
  const [windows, setWindows] = useState(3);
  const [widthCm, setWidthCm] = useState(140);
  const [heightCm, setHeightCm] = useState(140);
  const [objectType, setObjectType] = useState<ObjectTypeId>("apartment");

  const result = useMemo(
    () => estimate({ windows, widthCm, heightCm, objectType }),
    [windows, widthCm, heightCm, objectType],
  );

  const markStart = () => {
    if (!started) {
      setStarted(true);
      analytics.track("calculator_start");
    }
  };

  return (
    <Section id="calculator">
      <Container>
        <Reveal>
          <Eyebrow>Калькулятор</Eyebrow>
          <SectionTitle>Оцените площадь остекления</SectionTitle>
          <Lead>
            Параметры помогают понять масштаб объекта. Для точной стоимости нужен фотографический
            расчёт.
          </Lead>
        </Reveal>
        <div className="mt-10 grid gap-8 rounded-3xl bg-surface p-6 hairline md:grid-cols-[1.1fr_0.9fr] md:p-8">
          <div className="space-y-5" onFocus={markStart}>
            <div>
              <Label htmlFor="calc-windows">Количество окон</Label>
              <Input
                id="calc-windows"
                type="number"
                min={1}
                max={99}
                value={windows}
                onChange={(e) => setWindows(Math.max(1, Number(e.target.value) || 1))}
                className="mt-2"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="calc-width">Примерная ширина, см</Label>
                <Input
                  id="calc-width"
                  type="number"
                  min={40}
                  value={widthCm}
                  onChange={(e) => setWidthCm(Math.max(40, Number(e.target.value) || 40))}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="calc-height">Примерная высота, см</Label>
                <Input
                  id="calc-height"
                  type="number"
                  min={40}
                  value={heightCm}
                  onChange={(e) => setHeightCm(Math.max(40, Number(e.target.value) || 40))}
                  className="mt-2"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="calc-type">Тип объекта</Label>
              <select
                id="calc-type"
                value={objectType}
                onChange={(e) => setObjectType(e.target.value as ObjectTypeId)}
                className="mt-2 flex h-12 w-full rounded-xl bg-elevated px-4 text-sm text-bone hairline"
              >
                {OBJECT_TYPES.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col justify-between rounded-2xl bg-ink p-6 hairline">
            <div>
              <p className="text-sm text-mute">Ориентировочная площадь</p>
              <p className="mt-2 font-display text-4xl font-semibold text-bone">{result.areaSqm} м²</p>
              {result.status === "needs_photo" ? (
                <p className="mt-4 text-mute">{result.message}</p>
              ) : (
                <p className="mt-4 text-bone">
                  Оценка: {result.amount.toLocaleString("ru-RU")} ₽
                </p>
              )}
            </div>
            <Button asChild className="mt-8">
              <a
                href="#lead"
                onClick={() => analytics.track("calculator_complete", { areaSqm: result.areaSqm })}
              >
                {CTA.sendPhotoArrow}
              </a>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
