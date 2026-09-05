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
5. Проверьте SMTP-переменные в настройках проекта (см. выше).

Если на сайте «старая» версия: откройте уникальный URL свежего деплоя (не только production alias) и сделайте hard refresh (Cmd+Shift+R).

## Заявки на почту

Форма шлёт письма сразу на две почты:

- `belieokna2009@gmail.com`
- `sir.kalinin@gmail.com`

Нужны SMTP-переменные (локально в `.env.local`, на ONREZA — в настройках проекта):

```bash
cp .env.example .env.local
```

Для Gmail:

1. Включите двухфакторную аутентификацию.
2. Создайте [пароль приложения](https://myaccount.google.com/apppasswords).
3. Укажите его в `SMTP_PASS`, в `SMTP_USER` — ящик отправителя (обычно `belieokna2009@gmail.com`).
