import nodemailer from "nodemailer";

import { BRAND_NAME, LEAD_INBOXES } from "@/lib/constants";

export type LeadMailPayload = {
  name: string;
  phone: string;
  windows: string;
  channel: string;
  variant: string;
  receivedAt: string;
  photos: Array<{
    filename: string;
    content: Buffer;
    contentType: string;
  }>;
};

function channelLabel(channel: string) {
  if (channel === "phone") return "Телефон";
  if (channel === "max") return "MAX";
  return channel || "не указан";
}

export function cleanEnv(value: string | undefined) {
  if (!value) return "";
  return value.trim().replace(/^['"]|['"]$/g, "");
}

function smtpConfig() {
  const host = cleanEnv(process.env.SMTP_HOST);
  const user = cleanEnv(process.env.SMTP_USER);
  const pass = cleanEnv(process.env.SMTP_PASS).replace(/\s+/g, "");
  const port = Number(cleanEnv(process.env.SMTP_PORT) || "587");
  const from =
    cleanEnv(process.env.SMTP_FROM) ||
    (user ? `"${BRAND_NAME}" <${user}>` : "");

  return { host, user, pass, port, from };
}

export function smtpConfigured() {
  const { host, user, pass } = smtpConfig();
  return Boolean(host && user && pass);
}

export function telegramConfigured() {
  return Boolean(
    cleanEnv(process.env.TELEGRAM_BOT_TOKEN) &&
      cleanEnv(process.env.TELEGRAM_CHAT_ID),
  );
}

export function deliveryConfigured() {
  return smtpConfigured() || telegramConfigured();
}

function leadRecipients() {
  const fromEnv = cleanEnv(process.env.LEAD_TO)
    .split(/[,;]+/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (fromEnv.length) return fromEnv;
  return [...LEAD_INBOXES];
}

function leadText(payload: LeadMailPayload) {
  return [
    `Новая заявка с сайта ${BRAND_NAME}`,
    "",
    `Имя: ${payload.name || "—"}`,
    `Телефон: ${payload.phone}`,
    `Окон: ${payload.windows || "—"}`,
    `Связь: ${channelLabel(payload.channel)}`,
    `Форма: ${payload.variant || "—"}`,
    `Фото: ${payload.photos.length}`,
    `Время: ${payload.receivedAt}`,
  ].join("\n");
}

export async function sendLeadEmail(payload: LeadMailPayload) {
  const { host, user, pass, port, from } = smtpConfig();

  if (!host || !user || !pass) {
    throw new Error("smtp_not_configured");
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    // Gmail SMTP from RU hosts often hangs — fail fast instead of proxy 504.
    connectionTimeout: 12_000,
    greetingTimeout: 12_000,
    socketTimeout: 20_000,
  });

  const subject = `Заявка ${BRAND_NAME}: ${payload.phone}${
    payload.windows ? `, окон: ${payload.windows}` : ""
  }`;

  const text = leadText(payload);

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#12151a">
      <h2 style="margin:0 0 12px">Новая заявка — ${BRAND_NAME}</h2>
      <p style="margin:0 0 8px"><strong>Имя:</strong> ${escapeHtml(payload.name || "—")}</p>
      <p style="margin:0 0 8px"><strong>Телефон:</strong> ${escapeHtml(payload.phone)}</p>
      <p style="margin:0 0 8px"><strong>Окон:</strong> ${escapeHtml(payload.windows || "—")}</p>
      <p style="margin:0 0 8px"><strong>Как связаться:</strong> ${escapeHtml(channelLabel(payload.channel))}</p>
      <p style="margin:0 0 8px"><strong>Форма:</strong> ${escapeHtml(payload.variant || "—")}</p>
      <p style="margin:0 0 8px"><strong>Фото:</strong> ${payload.photos.length}</p>
      <p style="margin:0"><strong>Время:</strong> ${escapeHtml(payload.receivedAt)}</p>
    </div>
  `;

  await transporter.sendMail({
    from,
    to: leadRecipients().join(", "),
    subject,
    text,
    html,
    attachments: payload.photos.map((photo) => ({
      filename: photo.filename,
      content: photo.content,
      contentType: photo.contentType,
    })),
  });
}

export async function sendLeadTelegram(payload: LeadMailPayload) {
  const token = cleanEnv(process.env.TELEGRAM_BOT_TOKEN);
  const chatId = cleanEnv(process.env.TELEGRAM_CHAT_ID);
  if (!token || !chatId) {
    throw new Error("telegram_not_configured");
  }

  const text = leadText(payload);
  const msgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      disable_web_page_preview: true,
    }),
    signal: AbortSignal.timeout(15_000),
  });

  if (!msgRes.ok) {
    const body = await msgRes.text().catch(() => "");
    console.error("[lead] telegram message failed", msgRes.status, body.slice(0, 300));
    throw new Error("telegram_failed");
  }

  for (const photo of payload.photos.slice(0, 8)) {
    const form = new FormData();
    form.set("chat_id", chatId);
    form.set(
      "document",
      new Blob([new Uint8Array(photo.content)], {
        type: photo.contentType || "application/octet-stream",
      }),
      photo.filename,
    );
    const docRes = await fetch(`https://api.telegram.org/bot${token}/sendDocument`, {
      method: "POST",
      body: form,
      signal: AbortSignal.timeout(30_000),
    });
    if (!docRes.ok) {
      const body = await docRes.text().catch(() => "");
      console.error("[lead] telegram document failed", docRes.status, body.slice(0, 300));
      throw new Error("telegram_failed");
    }
  }
}

/** Deliver via Telegram and/or SMTP. Succeeds if at least one configured channel works. */
export async function deliverLead(payload: LeadMailPayload) {
  const tasks: Array<{ channel: "email" | "telegram"; run: () => Promise<void> }> = [];

  if (telegramConfigured()) {
    tasks.push({ channel: "telegram", run: () => sendLeadTelegram(payload) });
  }
  if (smtpConfigured()) {
    tasks.push({ channel: "email", run: () => sendLeadEmail(payload) });
  }

  if (!tasks.length) {
    throw new Error("delivery_not_configured");
  }

  const results = await Promise.allSettled(tasks.map((t) => t.run()));
  const delivered: Array<"email" | "telegram"> = [];
  const errors: string[] = [];

  results.forEach((result, index) => {
    const channel = tasks[index].channel;
    if (result.status === "fulfilled") {
      delivered.push(channel);
    } else {
      const message =
        result.reason instanceof Error ? result.reason.message : String(result.reason);
      errors.push(`${channel}:${message}`);
      console.error(`[lead] ${channel} failed`, result.reason);
    }
  });

  if (!delivered.length) {
    const joined = errors.join("; ");
    if (joined.includes("Invalid login") || joined.includes("EAUTH")) {
      throw new Error("smtp_auth_failed");
    }
    if (joined.includes("timeout") || joined.includes("ETIMEDOUT") || joined.includes("Timeout")) {
      throw new Error("delivery_timeout");
    }
    throw new Error("send_failed");
  }

  console.info("[lead] delivered via", delivered.join(", "));
  return delivered;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
