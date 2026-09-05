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

function cleanEnv(value: string | undefined) {
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

function leadRecipients() {
  const fromEnv = cleanEnv(process.env.LEAD_TO)
    .split(/[,;]+/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (fromEnv.length) return fromEnv;
  return [...LEAD_INBOXES];
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
  });

  const subject = `Заявка ${BRAND_NAME}: ${payload.phone}${
    payload.windows ? `, окон: ${payload.windows}` : ""
  }`;

  const text = [
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

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
