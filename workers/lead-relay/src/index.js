/**
 * Cloudflare Worker: принимает заявку с сайта и шлёт в Telegram.
 * Деплой: см. README рядом или Cloudflare Dashboard → Workers → Create → Edit code.
 */

function clean(value) {
  return String(value ?? "")
    .trim()
    .replace(/^['"]|['"]$/g, "");
}

function chatIds(env) {
  return clean(env.TELEGRAM_CHAT_ID)
    .split(/[,;]+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((id) => (/^-?\d+$/.test(id) ? Number(id) : id));
}

function leadText(fields) {
  return [
    "Новая заявка с сайта БезОсколков",
    "",
    `Имя: ${fields.name || "—"}`,
    `Телефон: ${fields.phone}`,
    `Окон: ${fields.windows || "—"}`,
    `Связь: ${fields.channel || "—"}`,
    `Форма: ${fields.variant || "—"}`,
    `Фото: ${fields.photoCount}`,
    `Время: ${fields.receivedAt || new Date().toISOString()}`,
  ].join("\n");
}

async function sendTelegramMessage(token, chatId, text) {
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      disable_web_page_preview: true,
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`sendMessage ${res.status}: ${body.slice(0, 200)}`);
  }
}

async function sendTelegramDocument(token, chatId, file, filename) {
  const form = new FormData();
  form.set("chat_id", String(chatId));
  form.set("document", file, filename);
  const res = await fetch(`https://api.telegram.org/bot${token}/sendDocument`, {
    method: "POST",
    body: form,
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`sendDocument ${res.status}: ${body.slice(0, 200)}`);
  }
}

export default {
  async fetch(request, env) {
    if (request.method === "GET") {
      return Response.json({
        ok: true,
        service: "bezoskolkov-lead-relay",
      });
    }

    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    const secret = (request.headers.get("x-webhook-secret") || "").trim();
    const expected = String(env.WEBHOOK_SECRET || env.LEAD_WEBHOOK_SECRET || "").trim();
    if (!expected) {
      return Response.json({ ok: false, error: "secret_not_configured" }, { status: 503 });
    }
    if (secret !== expected) {
      return Response.json(
        {
          ok: false,
          error: "unauthorized",
          gotLen: secret.length,
          expectedLen: expected.length,
        },
        { status: 401 },
      );
    }

    const token = clean(env.TELEGRAM_BOT_TOKEN);
    const ids = chatIds(env);
    if (!token || !ids.length) {
      return Response.json({ ok: false, error: "telegram_not_configured" }, { status: 503 });
    }

    try {
      const form = await request.formData();
      const fields = {
        name: String(form.get("name") ?? ""),
        phone: String(form.get("phone") ?? ""),
        windows: String(form.get("windows") ?? ""),
        channel: String(form.get("channel") ?? ""),
        variant: String(form.get("variant") ?? ""),
        receivedAt: String(form.get("receivedAt") ?? ""),
        photoCount: 0,
      };

      if (!fields.phone.replace(/\D/g, "").length) {
        return Response.json({ ok: false, error: "phone_required" }, { status: 400 });
      }

      const photos = [];
      for (const [key, value] of form.entries()) {
        if (key !== "photos") continue;
        if (typeof value === "object" && value && typeof value.arrayBuffer === "function") {
          photos.push(value);
        }
      }
      fields.photoCount = photos.length;

      const text = leadText(fields);
      let delivered = 0;
      const errors = [];

      await Promise.all(
        ids.map(async (chatId) => {
          try {
            await sendTelegramMessage(token, chatId, text);
            for (const [index, photo] of photos.slice(0, 8).entries()) {
              const filename =
                "name" in photo && typeof photo.name === "string" && photo.name
                  ? photo.name
                  : `photo-${index + 1}.jpg`;
              await sendTelegramDocument(token, chatId, photo, filename);
            }
            delivered += 1;
          } catch (error) {
            errors.push(`${chatId}:${error instanceof Error ? error.message : String(error)}`);
          }
        }),
      );

      if (!delivered) {
        return Response.json(
          { ok: false, error: "telegram_failed", detail: errors.slice(0, 3) },
          { status: 502 },
        );
      }

      return Response.json({ ok: true, delivered, chats: ids.length });
    } catch (error) {
      return Response.json(
        {
          ok: false,
          error: "relay_failed",
          detail: error instanceof Error ? error.message : String(error),
        },
        { status: 500 },
      );
    }
  },
};
