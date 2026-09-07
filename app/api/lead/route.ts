import { NextResponse } from "next/server";

import {
  deliverLead,
  deliveryConfigured,
  probeTelegramApi,
  smtpConfigured,
  telegramConfigured,
} from "@/lib/mail";

export const runtime = "nodejs";

const MAX_PHOTOS = 8;
const MAX_PHOTO_BYTES = 8 * 1024 * 1024;

function isUpload(value: FormDataEntryValue): value is File {
  // Duck-type: avoid `instanceof File` (can fail across runtimes).
  return (
    typeof value === "object" &&
    value !== null &&
    typeof value.arrayBuffer === "function" &&
    typeof value.size === "number" &&
    value.size > 0
  );
}

/** Diagnostics for delivery channels (no secrets). */
export async function GET() {
  const telegramApi = telegramConfigured() ? await probeTelegramApi() : null;
  return NextResponse.json({
    telegram: telegramConfigured(),
    telegramApi,
    smtp: smtpConfigured(),
    smtpAllowed: process.env.LEAD_TRY_SMTP === "true",
    delivery: deliveryConfigured(),
  });
}

export async function POST(request: Request) {
  try {
    if (!deliveryConfigured()) {
      console.error("[lead] no delivery channel configured (SMTP / Telegram)");
      return NextResponse.json(
        { ok: false, error: "smtp_not_configured" },
        { status: 503 },
      );
    }

    const form = await request.formData();
    const phone = String(form.get("phone") ?? "").trim();
    const name = String(form.get("name") ?? "").trim();
    const windows = String(form.get("windows") ?? "").trim();
    const channel = String(form.get("channel") ?? "").trim();
    const variant = String(form.get("variant") ?? "").trim();
    const privacyAccepted = String(form.get("privacyAccepted") ?? "") === "true";
    const consentAccepted = String(form.get("consentAccepted") ?? "") === "true";
    const rawPhotos = form.getAll("photos");

    if (!phone.replace(/\D/g, "").length) {
      return NextResponse.json({ ok: false, error: "phone_required" }, { status: 400 });
    }

    if (!privacyAccepted || !consentAccepted) {
      return NextResponse.json({ ok: false, error: "consent_required" }, { status: 400 });
    }

    const photos: Array<{ filename: string; content: Buffer; contentType: string }> = [];
    for (const [index, item] of rawPhotos.entries()) {
      if (!isUpload(item)) continue;
      if (photos.length >= MAX_PHOTOS) break;
      if (item.size > MAX_PHOTO_BYTES) {
        return NextResponse.json({ ok: false, error: "photo_too_large" }, { status: 400 });
      }
      const buffer = Buffer.from(await item.arrayBuffer());
      photos.push({
        filename: item.name || `photo-${index + 1}.jpg`,
        content: buffer,
        contentType: item.type || "application/octet-stream",
      });
    }

    const receivedAt = new Date().toISOString();
    console.info("[lead]", {
      name,
      phone,
      windows,
      channel,
      variant,
      photos: photos.length,
      receivedAt,
    });

    await deliverLead({
      name,
      phone,
      windows,
      channel,
      variant,
      receivedAt,
      photos,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "lead_failed";
    console.error("[lead] failed", error);

    if (message === "delivery_not_configured" || message === "smtp_not_configured") {
      return NextResponse.json(
        { ok: false, error: "smtp_not_configured" },
        { status: 503 },
      );
    }

    if (message === "telegram_required" || message === "telegram_failed" || message === "telegram_timeout") {
      return NextResponse.json(
        { ok: false, error: message },
        { status: 503 },
      );
    }

    if (
      message.includes("Invalid login") ||
      message.includes("EAUTH") ||
      message.includes("BadCredentials") ||
      message === "smtp_auth_failed"
    ) {
      return NextResponse.json({ ok: false, error: "smtp_auth_failed" }, { status: 502 });
    }

    if (message === "delivery_timeout") {
      return NextResponse.json({ ok: false, error: "delivery_timeout" }, { status: 504 });
    }

    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 500 });
  }
}
