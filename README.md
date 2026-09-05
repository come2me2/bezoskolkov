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
5. Задайте Яндекс SMTP в переменных окружения (см. ниже).

Если на сайте «старая» версия: откройте уникальный URL свежего деплоя (не только production alias) и сделайте hard refresh (Cmd+Shift+R).

## Заявки на почту (Яндекс SMTP)

На ONREZA Gmail SMTP часто недоступен (таймаут 504). Используйте **Яндекс Почту** как отправителя; заявки могут приходить на Gmail в `LEAD_TO`.

1. Создайте или возьмите ящик на [mail.yandex.ru](https://mail.yandex.ru).
2. Включите доступ почтовых клиентов: настройки почты → «Почтовые программы» → IMAP.
3. Создайте [пароль приложения](https://id.yandex.ru/security/app-passwords) для «Почта».
4. В ONREZA (и локально в `.env.local`) задайте:

```bash
SMTP_HOST=smtp.yandex.ru
SMTP_PORT=465
SMTP_USER=ваш@yandex.ru
SMTP_PASS=пароль_приложения
SMTP_FROM="БезОсколков <ваш@yandex.ru>"
LEAD_TO=belieokna2009@gmail.com,sir.kalinin@gmail.com
```

5. Redeploy после сохранения переменных.

Локально:

```bash
cp .env.example .env.local
# подставьте свой @yandex.ru и пароль приложения
```

Опционально можно добавить `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID` — тогда заявка уйдёт и в Telegram.
