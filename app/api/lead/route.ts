import { NextResponse } from "next/server";

import { sendLeadEmail } from "@/lib/mail";

export const runtime = "nodejs";

const MAX_PHOTOS = 8;
const MAX_PHOTO_BYTES = 8 * 1024 * 1024;

export async function POST(request: Request) {
  try {
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
      if (!(item instanceof File) || item.size === 0) continue;
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
    const payload = {
      name,
      phone,
      windows,
      channel,
      variant,
      photos: photos.length,
      receivedAt,
    };

    console.info("[lead]", payload);

    await sendLeadEmail({
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

    if (message === "smtp_not_configured") {
      return NextResponse.json(
        { ok: false, error: "smtp_not_configured" },
        { status: 503 },
      );
    }

    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 500 });
  }
}
