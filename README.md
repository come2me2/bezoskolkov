# БезОсколков

Лендинг защитной противоосколочной плёнки для окон (Москва и МО).

## Стек

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS 4
- Framer Motion

## Локальный запуск

```bash
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Сборка

```bash
npm run build
npm start
```

Конфиг использует `output: "standalone"` для деплоя на [ONREZA](https://onreza.ru/frameworks/nextjs.html).

## Деплой на ONREZA

1. Залейте репозиторий на GitHub.
2. В [ONREZA](https://onreza.ru) подключите GitHub и выберите этот репозиторий.
3. В проекте должен быть `onreza.toml` (entry: `.next/standalone/server.js`).
4. После пуша в `main` дождитесь нового деплоя или нажмите **Redeploy** на последнем коммите.
5. Задайте доставку заявок (см. ниже). На ONREZA надёжнее **Telegram**, чем Gmail SMTP.

Если на сайте «старая» версия: откройте уникальный URL свежего деплоя (не только production alias) и сделайте hard refresh (Cmd+Shift+R).

## Заявки (почта / Telegram)

Форма доставляет заявку через **Telegram** и/или **SMTP**. Достаточно одного рабочего канала.

На ONREZA (серверы в РФ) исходящий SMTP к `smtp.gmail.com` часто **зависает до 504** — переменные могут быть верными, но соединение не устанавливается. Для продакшена задайте Telegram:

1. Создайте бота у [@BotFather](https://t.me/BotFather) → `TELEGRAM_BOT_TOKEN`
2. Напишите боту `/start`, узнайте свой `chat_id` (например через [@userinfobot](https://t.me/userinfobot)) → `TELEGRAM_CHAT_ID`
3. Пропишите обе переменные в ONREZA и сделайте Redeploy

Опционально SMTP (локально с Gmail обычно работает; в РФ можно `smtp.yandex.ru:465`):

```bash
cp .env.example .env.local
```

Почта по умолчанию: `belieokna2009@gmail.com`, `sir.kalinin@gmail.com` (`LEAD_TO`).
