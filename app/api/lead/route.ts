import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const form = await request.formData();
  const phone = String(form.get("phone") ?? "");
  const photos = form.getAll("photos");

  if (!phone.replace(/\D/g, "").length) {
    return NextResponse.json({ ok: false, error: "phone_required" }, { status: 400 });
  }

  const payload = {
    name: String(form.get("name") ?? ""),
    phone,
    windows: String(form.get("windows") ?? ""),
    channel: String(form.get("channel") ?? ""),
    variant: String(form.get("variant") ?? ""),
    photos: photos.length,
    receivedAt: new Date().toISOString(),
  };

  console.info("[lead]", payload);

  return NextResponse.json({ ok: true });
}
