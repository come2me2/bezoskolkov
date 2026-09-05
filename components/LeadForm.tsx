"use client";

import { Camera, Check, Upload } from "lucide-react";
import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { analytics } from "@/lib/analytics";
import {
  CONTACT_CHANNELS,
  CTA,
  MICROCOPY,
  type ContactChannelId,
} from "@/lib/constants";
import { cn, formatPhoneInput, isValidPhone } from "@/lib/utils";

const WINDOW_COUNTS = ["1", "2", "3", "4", "5+"] as const;

export function PhotoLeadForm({
  id = "lead",
  variant = "full",
}: {
  id?: string;
  variant?: "full" | "simple";
}) {
  const [windows, setWindows] = useState("3");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [channel, setChannel] = useState<ContactChannelId>("phone");
  const [files, setFiles] = useState<File[]>([]);
  const [drag, setDrag] = useState(false);
  const [started, setStarted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const start = () => {
    if (!started) {
      setStarted(true);
      analytics.track("lead_form_start", { variant });
    }
  };

  const onFiles = (list: FileList | null) => {
    if (!list?.length) return;
    analytics.track("photo_upload_start");
    const next = [...files, ...Array.from(list)].slice(0, 8);
    setFiles(next);
    analytics.track("photo_upload_complete", { count: next.length });
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isValidPhone(phone)) {
      setError("Укажите номер телефона полностью.");
      return;
    }
    if (!privacyAccepted || !consentAccepted) {
      setError("Отметьте согласие с политикой и обработкой персональных данных.");
      return;
    }
    setError("");
    setStatus("sending");
    try {
      const body = new FormData();
      body.set("name", name);
      body.set("phone", phone);
      body.set("windows", windows);
      body.set("channel", channel);
      body.set("variant", variant);
      body.set("privacyAccepted", "true");
      body.set("consentAccepted", "true");
      files.forEach((file) => body.append("photos", file));
      const res = await fetch("/api/lead", { method: "POST", body });
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      if (!res.ok) {
        if (data?.error === "smtp_not_configured") {
          throw new Error("smtp");
        }
        if (data?.error === "consent_required") {
          throw new Error("consent");
        }
        throw new Error("fail");
      }
      analytics.track("lead_submit", { windows, channel, photos: files.length, variant });
      setStatus("done");
    } catch (err) {
      setStatus("error");
      const message =
        err instanceof Error && err.message === "smtp"
          ? "Почта ещё не настроена на сервере. Позвоните нам или напишите на e-mail."
          : err instanceof Error && err.message === "consent"
            ? "Отметьте согласие с политикой и обработкой персональных данных."
            : "Не удалось отправить. Позвоните нам или попробуйте ещё раз.";
      setError(message);
    }
  };

  if (status === "done") {
    return (
      <div id={id} className="scroll-mt-28 rounded-3xl bg-surface p-8 hairline">
        <p className="flex items-center gap-2 font-display text-2xl text-bone">
          <Check className="h-6 w-6 text-ok" aria-hidden /> {MICROCOPY.photoReceived}
        </p>
        <p className="mt-3 text-mute">{MICROCOPY.afterLead}</p>
        <p className="mt-2 text-sm text-ok">{MICROCOPY.leadSent}</p>
      </div>
    );
  }

  return (
    <form
      id={id}
      onSubmit={submit}
      onFocus={start}
      className="scroll-mt-28 rounded-3xl bg-surface p-6 hairline md:p-8"
    >
      {variant === "full" ? (
        <>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cta">Шаг 1</p>
          <fieldset className="mt-3">
            <legend className="text-lg font-medium text-bone">Сколько окон нужно защитить?</legend>
            <div className="mt-4 grid grid-cols-5 gap-2">
              {WINDOW_COUNTS.map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => setWindows(count)}
                  className={cn(
                    "h-12 rounded-xl text-sm font-semibold hairline",
                    windows === count ? "bg-cta text-cta-ink" : "bg-elevated text-bone",
                  )}
                >
                  {count}
                </button>
              ))}
            </div>
          </fieldset>

          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-cta">Шаг 2</p>
          <div className="mt-3">
            <p className="text-lg font-medium text-bone">Загрузите фотографии</p>
            <p className="mt-1 text-sm text-mute">Можно загрузить несколько фото.</p>
            <button
              type="button"
              onDragOver={(e) => {
                e.preventDefault();
                setDrag(true);
              }}
              onDragLeave={() => setDrag(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDrag(false);
                onFiles(e.dataTransfer.files);
              }}
              onClick={() => inputRef.current?.click()}
              className={cn(
                "mt-4 flex min-h-36 w-full flex-col items-center justify-center rounded-2xl border border-dashed px-4 py-8 text-center transition-colors",
                drag ? "border-cta bg-cta/10" : "border-line bg-elevated",
              )}
            >
              <Upload className="h-6 w-6 text-cta" aria-hidden />
              <span className="mt-3 text-sm text-bone">Перетащите файлы или нажмите, чтобы выбрать</span>
              <span className="mt-2 inline-flex items-center gap-1 text-xs text-mute">
                <Camera className="h-3.5 w-3.5" aria-hidden /> Можно сразу сфотографировать окно
              </span>
            </button>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              capture="environment"
              multiple
              className="sr-only"
              onChange={(e) => onFiles(e.target.files)}
            />
            {files.length ? (
              <p className="mt-3 text-sm text-ok">
                {MICROCOPY.photoUploaded} {files.length} шт.
              </p>
            ) : null}
          </div>

          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-cta">Шаг 3</p>
          <div className="mt-3">
            <Label htmlFor={`${id}-phone`}>Ваш номер телефона</Label>
            <Input
              id={`${id}-phone`}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              value={phone}
              onChange={(e) => setPhone(formatPhoneInput(e.target.value))}
              placeholder="+7 ("
              className="mt-2"
            />
          </div>

          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-cta">Шаг 4</p>
          <fieldset className="mt-3">
            <legend className="text-lg font-medium text-bone">Как с вами связаться?</legend>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {CONTACT_CHANNELS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setChannel(item.id)}
                  className={cn(
                    "h-12 rounded-xl text-sm font-medium hairline",
                    channel === item.id ? "bg-cta text-cta-ink" : "bg-elevated text-bone",
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </fieldset>
        </>
      ) : (
        <div className="space-y-4">
          <div>
            <Label htmlFor={`${id}-name`}>Имя</Label>
            <Input
              id={`${id}-name`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2"
              autoComplete="name"
            />
          </div>
          <div>
            <Label htmlFor={`${id}-phone-simple`}>Телефон</Label>
            <Input
              id={`${id}-phone-simple`}
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(formatPhoneInput(e.target.value))}
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor={`${id}-windows`}>Количество окон</Label>
            <Input
              id={`${id}-windows`}
              value={windows}
              onChange={(e) => setWindows(e.target.value)}
              className="mt-2"
            />
          </div>
          <div>
            <Label>Фото</Label>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-elevated text-sm hairline"
            >
              <Camera className="h-4 w-4 text-cta" aria-hidden />
              {files.length ? MICROCOPY.photoUploaded : "Сфотографировать или прикрепить"}
            </button>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              capture="environment"
              multiple
              className="sr-only"
              onChange={(e) => onFiles(e.target.files)}
            />
          </div>
        </div>
      )}

      <div className="mt-6 space-y-3">
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-snug text-mute">
          <input
            type="checkbox"
            checked={privacyAccepted}
            onChange={(e) => setPrivacyAccepted(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-line accent-cta"
            required
          />
          <span>
            Я соглашаюсь с{" "}
            <Link href="/privacy" target="_blank" className="text-bone underline-offset-2 hover:underline">
              Политикой конфиденциальности
            </Link>
          </span>
        </label>
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-snug text-mute">
          <input
            type="checkbox"
            checked={consentAccepted}
            onChange={(e) => setConsentAccepted(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-line accent-cta"
            required
          />
          <span>
            Я даю{" "}
            <Link href="/consent" target="_blank" className="text-bone underline-offset-2 hover:underline">
              согласие на обработку персональных данных
            </Link>
          </span>
        </label>
      </div>

      {error ? <p className="mt-4 text-sm text-danger">{error}</p> : null}

      <Button
        type="submit"
        size="lg"
        className="mt-8 w-full"
        disabled={status === "sending" || !privacyAccepted || !consentAccepted}
      >
        {variant === "full" ? CTA.getEstimateArrow : CTA.getEstimate}
      </Button>
      <p className="mt-3 text-center text-xs text-mute">{MICROCOPY.response}</p>
      {variant === "full" ? (
        <p className="mt-2 text-center text-xs text-mute">{MICROCOPY.preliminary}</p>
      ) : null}
    </form>
  );
}

export function LeadForm() {
  return (
    <section id="lead-simple" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-cta">Заявка</p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-bone md:text-5xl">
              Рассчитаем стоимость по фото
            </h2>
            <p className="mt-5 max-w-xl text-mute">
              Имя, телефон, количество окон и фото — этого достаточно, чтобы подготовить
              предварительный расчёт.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-mute">
              <li>{MICROCOPY.noPaidMeasure}</li>
              <li>{MICROCOPY.priceBeforeInstall}</li>
              <li>{MICROCOPY.city}</li>
            </ul>
          </div>
          <PhotoLeadForm id="lead-compact" variant="simple" />
        </div>
      </div>
    </section>
  );
}
