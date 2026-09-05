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

function smtpConfigured() {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS,
  );
}

function leadRecipients() {
  const fromEnv = process.env.LEAD_TO?.split(/[,;\s]+/).map((s) => s.trim()).filter(Boolean);
  if (fromEnv?.length) return fromEnv;
  return [...LEAD_INBOXES];
}

export async function sendLeadEmail(payload: LeadMailPayload) {
  if (!smtpConfigured()) {
    throw new Error("smtp_not_configured");
  }

  const port = Number(process.env.SMTP_PORT || 587);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const from =
    process.env.SMTP_FROM ||
    `"${BRAND_NAME}" <${process.env.SMTP_USER}>`;

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
