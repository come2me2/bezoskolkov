# Cloudflare Worker: реле заявок → Telegram

Обход блокировки `api.telegram.org` на ONREZA: сайт шлёт заявку на Worker, Worker — в Telegram.

## Быстрый деплой через Dashboard (без CLI)

1. Зайдите на [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Create Worker**.
2. Имя: `bezoskolkov-lead-relay` → Deploy.
3. **Edit code** → удалите шаблон, вставьте код из `src/index.js` (весь файл) → **Deploy**.
4. **Settings → Variables** → добавьте secrets:
   - `WEBHOOK_SECRET` = общий секрет с ONREZA (см. ниже)
   - `TELEGRAM_BOT_TOKEN` = токен бота
   - `TELEGRAM_CHAT_ID` = `2515644,190282238`
5. Скопируйте URL вида `https://bezoskolkov-lead-relay.<subdomain>.workers.dev`

## Деплой через CLI

```bash
cd workers/lead-relay
npx wrangler login
npx wrangler secret put WEBHOOK_SECRET
npx wrangler secret put TELEGRAM_BOT_TOKEN
npx wrangler secret put TELEGRAM_CHAT_ID
npx wrangler deploy
```

## Переменные на ONREZA

```
LEAD_WEBHOOK_URL=https://bezoskolkov-lead-relay.<subdomain>.workers.dev
LEAD_WEBHOOK_SECRET=<тот же WEBHOOK_SECRET>
```

Telegram-токен на ONREZA больше не обязателен (его хранит Worker).
